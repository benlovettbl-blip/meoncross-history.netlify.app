const fs = require('fs');
const path = require('path');
const vm = require('vm');

const dataPath = path.join(__dirname, '..', 'units', 'cme_new', 'data.js');
let raw =
  fs
    .readFileSync(dataPath, 'utf8')
    .replace(/export\s+const\s+unitData\s*=/g, 'const unitData =')
    .replace(/export\s+default\s+unitData;?/g, '')
    .replace(/export\s*\{[^}]*\};?/g, '') + '; unitData;';
const unitData = vm.runInNewContext(raw);

console.log('Unit title:', unitData.title);
console.log('Lessons count:', unitData.lessons.length);
unitData.lessons.forEach((l, idx) => {
  const blocks = l.narrative_blocks ? l.narrative_blocks.length : 0;
  const keys = Object.keys(l).filter(
    (k) =>
      k.includes('narrative') || k.includes('act') || k.includes('story') || k.includes('text'),
  );
  console.log(
    `Lesson ${idx + 1} (${l.id} - ${l.title}): narrative keys = ${keys.join(', ')}, blocks count = ${blocks}`,
  );
  if (l.narrative_blocks) {
    l.narrative_blocks.forEach((b, bIdx) => {
      console.log(
        `   Block ${bIdx + 1}: ${b.title || b.theme_heading} (${(b.text || '').length} chars)`,
      );
    });
  }
});
