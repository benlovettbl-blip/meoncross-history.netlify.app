const fs = require('fs');
const vm = require('vm');
const path = require('path');

const p = path.resolve('units/cme_new/data.js');
let raw = fs.readFileSync(p, 'utf8');
raw =
  raw
    .replace(/export\s+const\s+unitData\s*=/g, 'const unitData =')
    .replace(/export\s+default\s+unitData;?/g, '')
    .replace(/export\s*\{[^}]*\};?/g, '') + '; unitData;';
const unitData = vm.runInNewContext(raw);

const tbHtml = fs.readFileSync('public/units/cme_new/textbook_UNIFIED.html', 'utf8');

function clean(str) {
  if (!str) return '';
  return str
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&ndash;/g, '–')
    .replace(/&mdash;/g, '—')
    .replace(/&bull;/g, '•')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\[\d+\.\d+\]/g, '')
    .replace(/\[Key Individual:\s*[^\]]+\]/gi, '')
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

const cleanedTb = clean(tbHtml);

console.log('=== COMPARING EACH LESSON NARRATIVE IN DATA.JS WITH TEXTBOOK ===\n');
let totalBlocks = 0;
let totalFound = 0;

unitData.lessons.forEach((l, lIdx) => {
  console.log(`Lesson [${lIdx}] ${l.id} - "${l.title}":`);
  const blocks = (l.narrative_blocks || []).filter((b) => b.text && b.text.trim());
  let foundCount = 0;
  let missingCount = 0;

  blocks.forEach((b, bIdx) => {
    totalBlocks++;
    const cleanedText = clean(b.text);
    const sentences = cleanedText.split(/(?<=[.!?])\s+/).filter((s) => s.length > 25);
    let matched = 0;
    sentences.forEach((s) => {
      const chunk = s.slice(0, 35);
      if (cleanedTb.includes(chunk)) {
        matched++;
      }
    });
    const pct = sentences.length > 0 ? Math.round((matched / sentences.length) * 100) : 0;
    if (pct >= 50) {
      foundCount++;
      totalFound++;
    } else {
      missingCount++;
      console.log(
        `  ❌ Block ${bIdx} "${b.theme_heading || b.title}": only ${pct}% matches (${matched}/${sentences.length} sentences found)`,
      );
    }
  });
  console.log(`  Result: ${foundCount}/${blocks.length} blocks aligned with textbook.\n`);
});

console.log(
  `TOTAL BLOCKS: ${totalFound} of ${totalBlocks} aligned (${Math.round((totalFound / totalBlocks) * 100)}%)`,
);
