const fs = require('fs');
const vm = require('vm');
const path = require('path');

let raw =
  fs
    .readFileSync(path.join(__dirname, '../units/eee/data.js'), 'utf8')
    .replace(/export\s+const\s+unitData\s*=/g, 'const unitData =')
    .replace(/export\s+default\s+unitData;?/g, '')
    .replace(/export\s*\{[^}]*\};?/g, '') + '; unitData;';

const data = vm.runInNewContext(raw);

data.lessons.forEach((l, i) => {
  console.log(`Enquiry ${i + 1}: ${l.title} (${l.id})`);
  let totWc = 0;
  l.narrative_blocks.forEach((b, j) => {
    const textOnly = (b.text || '').replace(/<[^>]*>/g, ' ');
    const wc = textOnly.split(/\s+/).filter(Boolean).length;
    totWc += wc;
    console.log(`   Block ${j + 1} [${wc} words]: ${b.title || b.theme_heading}`);
  });
  console.log(`   TOTAL: ${totWc} words\n`);
});
