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

console.log('Unit Title:', unitData.title);
console.log('Total Lessons in SSOT:', unitData.lessons.length);
console.log('----------------------------------------------------');

let totalBlocks = 0;
let totalWords = 0;

unitData.lessons.forEach((l, idx) => {
  const nb = l.narrative_blocks ? l.narrative_blocks.length : 0;
  totalBlocks += nb;
  let lessonWords = 0;
  if (l.narrative_blocks) {
    l.narrative_blocks.forEach((b) => {
      const words = (b.text || '').split(/\s+/).filter(Boolean).length;
      lessonWords += words;
    });
  }
  totalWords += lessonWords;
  console.log(`Lesson ${idx + 1} (${l.id}):`);
  console.log(`  Title: ${l.title}`);
  console.log(`  Narrative Blocks: ${nb} | Total Words: ${lessonWords}`);
  if (l.acts) {
    console.log(`  Acts present: ${Object.keys(l.acts).join(', ')}`);
  }
  if (l.narrative_blocks) {
    l.narrative_blocks.forEach((b, bIdx) => {
      const words = (b.text || '').split(/\s+/).filter(Boolean).length;
      const heading = b.theme_heading || b.title || `Block ${bIdx + 1}`;
      console.log(`    [${idx + 1}.${bIdx + 1}] ${heading} (${words} words)`);
    });
  }
  console.log('');
});

console.log('----------------------------------------------------');
console.log(
  `Summary: ${unitData.lessons.length} lessons, ${totalBlocks} narrative blocks, ${totalWords} total narrative words.`,
);
