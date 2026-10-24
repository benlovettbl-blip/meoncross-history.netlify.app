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
    .replace(/\[Key Individual:\s*([^\]]+)\]/gi, '$1')
    .replace(/\s*\(\s*\)/g, '')
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

const cleanedTb = clean(tbHtml);

console.log('=== DETAILED BLOCK-BY-BLOCK AUDIT ===');
// Check all 63 blocks in unitData
unitData.lessons.forEach((l, lIdx) => {
  const blocks = (l.narrative_blocks || []).filter((b) => b.text && b.text.trim());
  blocks.forEach((b, bIdx) => {
    const cleanedText = clean(b.text);
    // test 40-character sliding windows
    let totalWindows = 0;
    let foundWindows = 0;
    const windowSize = 40;
    const step = 20;
    for (let i = 0; i <= cleanedText.length - windowSize; i += step) {
      totalWindows++;
      const sub = cleanedText.slice(i, i + windowSize);
      if (cleanedTb.includes(sub)) {
        foundWindows++;
      }
    }
    const ratio = totalWindows > 0 ? foundWindows / totalWindows : 1;
    if (ratio < 0.95) {
      console.log(
        `Mismatch in Lesson [${lIdx}] (${l.id}) Block [${bIdx}] "${b.theme_heading || b.title}": matched ${(ratio * 100).toFixed(1)}%`,
      );
    }
  });
});
console.log('Audit complete.');
