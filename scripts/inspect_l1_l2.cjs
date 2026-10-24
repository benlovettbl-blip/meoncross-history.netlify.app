const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT_DIR = path.resolve(__dirname, '..');
const dataPath = path.join(ROOT_DIR, 'units', 'cme_new', 'data.js');

let raw = fs.readFileSync(dataPath, 'utf8');
raw =
  raw
    .replace(/export\s+const\s+unitData\s*=/g, 'const unitData =')
    .replace(/export\s+default\s+unitData;?/g, '')
    .replace(/export\s*\{[^}]*\};?/g, '') + '; unitData;';

const unitData = vm.runInNewContext(raw);

const l1 = unitData.lessons[0];
const l2 = unitData.lessons[1];

console.log('--- LESSON 1 BLOCKS ---');
(l1.narrative_blocks || []).forEach((b, i) => {
  if (b.text && b.text.trim()) {
    console.log(`[L1.${i + 1}] ${b.title || b.theme_heading}:`);
    console.log(b.text.trim());
    console.log('---');
  }
});

console.log('\n--- LESSON 2 BLOCKS ---');
(l2.narrative_blocks || []).forEach((b, i) => {
  if (b.text && b.text.trim()) {
    console.log(`[L2.${i + 1}] ${b.title || b.theme_heading}:`);
    console.log(b.text.trim());
    console.log('---');
  }
});
