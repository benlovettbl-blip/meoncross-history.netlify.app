const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'public', 'units', 'ks2_ww2', 'worksheets');
let p = 2; // page 1 is cover
for (let i = 1; i <= 10; i++) {
  const num = i < 10 ? '0' + i : '' + i;
  const f = fs.readdirSync(dir).find((x) => x.startsWith('lesson_' + num) && x.endsWith('.html'));
  const h = fs.readFileSync(path.join(dir, f), 'utf8');
  const sheets = h.split('<div class="worksheet-page');
  const count = sheets.length - 1;
  for (let s = 1; s <= count; s++) {
    console.log(`Page ${p} of 26 -> Lesson ${i} (${f}), Sheet ${s}`);
    if (p === 22) {
      console.log(`\n=== CONTENT OF PAGE 22 ===\n`);
      const sheetContent = sheets[s];
      // Find all img tags or source references
      const imgMatches = sheetContent.match(/<img[^>]+>/g) || [];
      console.log('Images found on Page 22:');
      imgMatches.forEach((img) => console.log('  ', img.substring(0, 150)));
      // Find Source titles
      const srcMatches = sheetContent.match(/Source [A-Z][^<]*/g) || [];
      console.log('Sources found on Page 22:', srcMatches);
      // Let's print out the text of sheetContent
      console.log('\nFirst 1000 chars of Page 22:');
      console.log(sheetContent.substring(0, 1000));
    }
    p++;
  }
}
