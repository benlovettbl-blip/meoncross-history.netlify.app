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
    .replace(/\[\d+\.\d+\]\s*/g, '')
    .replace(/\[Key Individual:\s*([^\]]+)\]/gi, '$1')
    .trim();
}

console.log('Total Lessons:', unitData.lessons.length);

unitData.lessons.forEach((l, idx) => {
  const blocks = (l.narrative_blocks || []).filter((b) => b.text && b.text.trim());
  console.log(`\n======================================================`);
  console.log(`LESSON ${idx + 1}: ${l.title}`);
  console.log(`Enquiry Question: ${l.enquiry || l.enquiry_question || ''}`);
  console.log(`Total Text Blocks: ${blocks.length}`);
  console.log(`======================================================`);

  blocks.forEach((b, bi) => {
    const title = b.theme_heading || b.title || `Section ${bi + 1}`;
    const cleaned = cleanProse(b.text);
    const words = cleaned.split(/\s+/).length;
    console.log(`  [Block ${bi + 1}] ${title} (${words} words)`);
    console.log(`     Sample: "${cleaned.slice(0, 110).replace(/\n/g, ' ')}..."`);
  });
});
