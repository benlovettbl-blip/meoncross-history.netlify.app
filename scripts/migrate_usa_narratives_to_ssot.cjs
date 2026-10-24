/**
 * scripts/migrate_usa_narratives_to_ssot.cjs
 *
 * Injects the rich 4-Act continuous narrative into units/usa/data.js and public/units/usa/data.js
 * establishing 100% Single Source of Truth (SSoT) parity across the web app and textbook.
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT_DIR = path.resolve(__dirname, '..');

// 1. Collect all 16 enquiry narratives
const allNarratives = [];
for (let kt = 1; kt <= 4; kt++) {
  const getKtData = require(`./usa_textbook_data_kt${kt}.cjs`);
  const d = getKtData({ getBase64Image: () => '' });
  for (let eq = 1; eq <= 4; eq++) {
    const eqNarrative = d.narratives['enquiry' + eq];
    if (!eqNarrative) {
      console.error(`Missing narrative for KT${kt} enquiry${eq}`);
      process.exit(1);
    }
    allNarratives.push(eqNarrative);
  }
}
console.log(`Successfully collected all ${allNarratives.length} enquiry narratives.`);

// 2. Read units/usa/data.js
const dataPath = path.join(ROOT_DIR, 'units', 'usa', 'data.js');
let raw = fs.readFileSync(dataPath, 'utf8');

// Strip module exports for VM parsing
raw =
  raw
    .replace(/export\s+const\s+unitData\s*=/g, 'const unitData =')
    .replace(/export\s+default\s+unitData;?/g, '')
    .replace(/export\s*\{[^}]*\};?/g, '') + '; unitData;';

const unitData = vm.runInNewContext(raw);

console.log(`Loaded unitData with ${unitData.lessons.length} lessons.`);

if (unitData.lessons.length !== 16) {
  console.error(`Expected 16 lessons, found: ${unitData.lessons.length}`);
  process.exit(1);
}

// 3. Update each lesson narrative_blocks with the 4 Acts
unitData.lessons.forEach((lesson, idx) => {
  const n = allNarratives[idx];
  const newBlocks = [
    {
      act: 1,
      title: n.act1.title.replace(/^Act\s*\d+:\s*/i, '').trim(),
      text: n.act1.text.trim(),
    },
    {
      act: 2,
      title: n.act2.title.replace(/^Act\s*\d+:\s*/i, '').trim(),
      text: n.act2.text.trim(),
    },
    {
      act: 3,
      title: n.act3.title.replace(/^Act\s*\d+:\s*/i, '').trim(),
      text: n.act3.text.trim(),
    },
    {
      act: 4,
      title: n.act4.title.replace(/^Act\s*\d+:\s*/i, '').trim(),
      text: n.act4.text.trim(),
    },
  ];
  lesson.narrative_blocks = newBlocks;
});

console.log('✅ Updated all 16 lessons with 4-Act narrative blocks.');

// 4. Serialize back to data.js with universal ESM + CJS exports
const newJs = `const unitData = ${JSON.stringify(unitData, null, 2)};
export default unitData;
export { unitData };
if (typeof module !== 'undefined' && module.exports) {
  module.exports = unitData;
}
`;

fs.writeFileSync(path.join(ROOT_DIR, 'units', 'usa', 'data.js'), newJs, 'utf8');
fs.writeFileSync(path.join(ROOT_DIR, 'public', 'units', 'usa', 'data.js'), newJs, 'utf8');
console.log('✅ Wrote updated units/usa/data.js and public/units/usa/data.js');

// 5. Update data/usa.json and public/data/usa.json
['data/usa.json', 'public/data/usa.json'].forEach((rel) => {
  const p = path.join(ROOT_DIR, rel);
  if (fs.existsSync(p)) {
    fs.writeFileSync(p, JSON.stringify(unitData, null, 2), 'utf8');
    console.log(`✅ Wrote updated JSON to: ${rel}`);
  }
});

console.log('🎉 SSoT Migration Complete!');
