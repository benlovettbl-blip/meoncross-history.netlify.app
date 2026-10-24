const fs = require('fs');
const path = require('path');
const { modularTopics } = require('./test_modular_spec_page2.cjs');

const specPath = path.join(
  __dirname,
  '..',
  'public',
  'data',
  'specifications',
  'paper2_p5_middle_east.json',
);
const spec = JSON.parse(fs.readFileSync(specPath, 'utf8'));

// Combine all 9 blurbs into a single text body
let fullModularText = '';
modularTopics.forEach((g) => {
  g.topics.forEach((t) => {
    fullModularText += ' ' + t.title + ' ' + t.blurb;
  });
});

console.log('================================================================');
console.log('🔍 FORENSIC AUDIT: GCSE OPTION P5 SPECIFICATION vs 9 MODULAR BLURBS');
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
        (w) => !new RegExp('\\b' + w + '\\b', 'i').test(fullModularText.replace(/[‘'’"“”]/g, ' ')),
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
