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

function cleanProse(text) {
  if (!text) return '';
  return text
    .replace(/<span\s+class=["']para-ref["']>[^<]*<\/span>\s*/gi, '')
    .replace(/<span\s+class=["']archival-meta-tag["']>[^<]*<\/span>\s*/gi, '')
    .replace(/\[\d+\.\d+\]\s*/g, '')
    .replace(/\[Key Individual:\s*([^\]]+)\]/gi, '$1')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

unitData.lessons.forEach((l, i) => {
  const blocks = (l.narrative_blocks || []).filter((b) => b.text && b.text.trim());
  console.log(`L${i + 1} (${blocks.length} blocks)`);
  blocks.forEach((b, bi) => {
    const cleaned = cleanProse(b.text);
    const matches = cleaned.match(/\[[^\]]+\]/g);
    if (matches) {
      console.log(`   L${i + 1} B${bi + 1} matches:`, matches);
    }
  });
});
