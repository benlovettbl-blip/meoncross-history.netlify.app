const fs = require('fs');
const path = require('path');

const specPath = path.join(
  __dirname,
  '..',
  'public',
  'data',
  'specifications',
  'paper2_p5_middle_east.json',
);
const spec = JSON.parse(fs.readFileSync(specPath, 'utf8'));

const htmlPath = path.join(__dirname, '..', 'public', 'units', 'cme_new', 'textbook_UNIFIED.html');
const html = fs.readFileSync(htmlPath, 'utf8');

const start = html.indexOf('id="page-2"');
const end = html.indexOf('id="page-3"');
const p2Html = html.substring(start, end);
const p2Text = p2Html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');

console.log('================================================================');
console.log('🔍 FORENSIC AUDIT: GCSE OPTION P5 SPECIFICATION vs PAGE 2');
console.log('================================================================\n');

let totalPoints = 0;
let missingPointsCount = 0;

spec.sections.forEach((sec) => {
  console.log(`\n================================================================`);
  console.log(`📌 ${sec.title.toUpperCase()}`);
  console.log(`================================================================`);
  sec.topics.forEach((top) => {
    console.log(`\n  Topic ${top.title}:`);
    top.points.forEach((pt, ptIdx) => {
      totalPoints++;
      const words = pt
        .replace(/[().,;:—–\-\/‘'’"“”]/g, ' ')
        .split(/\s+/)
        .map((w) => w.trim())
        .filter(
          (w) =>
            w.length > 2 &&
            ![
              'and',
              'the',
              'for',
              'with',
              'from',
              'this',
              'that',
              'into',
              'including',
              'between',
              'during',
              'their',
              'towards',
              'over',
              'its',
            ].includes(w.toLowerCase()),
        );

      const missingWords = words.filter(
        (w) => !new RegExp('\\b' + w + '\\b', 'i').test(p2Text.replace(/[‘'’"“”]/g, ' ')),
      );

      if (missingWords.length > 0) {
        missingPointsCount++;
        console.log(`    ❌ Bullet ${ptIdx + 1}: "${pt}"`);
        console.log(`       -> Missing specific terms: [${missingWords.join(', ')}]`);
      } else {
        console.log(`    ✅ Bullet ${ptIdx + 1}: "${pt}" (100% Verified)`);
      }
    });
  });
});

console.log('\n================================================================');
console.log(`📊 TOTAL AUDIT SUMMARY:`);
console.log(`   Official Spec Points: ${totalPoints}`);
console.log(
  `   Fully Verified Points: ${totalPoints - missingPointsCount} / ${totalPoints} (${Math.round(((totalPoints - missingPointsCount) / totalPoints) * 100)}%)`,
);
console.log(`   Points with Missing Wording: ${missingPointsCount} / ${totalPoints}`);
console.log('================================================================\n');
