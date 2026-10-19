const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT_DIR = path.resolve(__dirname, '..', '..');
const dataPath = path.join(ROOT_DIR, 'units', 'cme_new', 'data.js');

let raw = fs.readFileSync(dataPath, 'utf8');
raw =
  raw
    .replace(/export\s+const\s+unitData\s*=/g, 'const unitData =')
    .replace(/export\s+default\s+unitData;?/g, '')
    .replace(/export\s*\{[^}]*\};?/g, '') + '; unitData;';

const unitData = vm.runInNewContext(raw);

unitData.lessons.forEach((l, i) => {
  const blocks = (l.narrative_blocks || []).filter((b) => b.text && b.text.trim());
  console.log(`\n=== Enquiry ${i + 1} (${blocks.length} blocks) ===`);
  blocks.forEach((b, bi) => {
    let rawTitle = b.theme_heading || b.title || '';
    rawTitle = rawTitle.replace(/^\d+\.\s*/, '').trim();
    let date = b.period || '';
    const dateMatch = rawTitle.match(/\(([^)]+)\)$/);
    if (dateMatch && !date) {
      date = dateMatch[1];
      rawTitle = rawTitle.replace(/\s*\([^)]+\)$/, '').trim();
    }
    console.log(`  [${i + 1}.${bi + 1}] date: "${date}" | title: "${rawTitle}"`);
  });
});
