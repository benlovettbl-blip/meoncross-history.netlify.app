const fs = require('fs');
const path = require('path');

console.log('=== AUDITING ALL UNITS FOR SOURCE SRC VS IMAGE MISMATCHES ===\n');

const unitsDir = path.resolve(__dirname, '../units');
const unitDirs = fs
  .readdirSync(unitsDir)
  .filter((f) => fs.statSync(path.join(unitsDir, f)).isDirectory());

let totalMismatches = 0;
let unitsChecked = 0;

unitDirs.forEach((u) => {
  const dataPath = path.join(unitsDir, u, 'data.js');
  if (!fs.existsSync(dataPath)) return;

  try {
    const raw = require(dataPath);
    const data = raw.default || raw;
    if (!data.lessons || !Array.isArray(data.lessons)) return;

    unitsChecked++;
    let unitMismatches = 0;

    data.lessons.forEach((l, lIdx) => {
      // Check lesson.sources
      if (l.sources && Array.isArray(l.sources)) {
        l.sources.forEach((s, sIdx) => {
          if (s.src && s.image && s.src !== s.image) {
            totalMismatches++;
            unitMismatches++;
            console.log(`[${u}] Lesson ${l.id || lIdx + 1} Source ${s.letter || sIdx + 1}:`);
            console.log(`  Title: ${s.title}`);
            console.log(`  src:   ${s.src}`);
            console.log(`  image: ${s.image}`);
            console.log(`  desc:  ${s.desc || s.caption || ''}`);
            console.log('---');
          }
        });
      }

      // Check narrative_blocks sources
      if (l.narrative_blocks && Array.isArray(l.narrative_blocks)) {
        l.narrative_blocks.forEach((b, bIdx) => {
          if (b.sources && Array.isArray(b.sources)) {
            b.sources.forEach((s, sIdx) => {
              if (s.src && s.image && s.src !== s.image) {
                totalMismatches++;
                unitMismatches++;
                console.log(`[${u}] Lesson ${l.id || lIdx + 1} Block ${bIdx + 1} Source:`);
                console.log(`  Title: ${s.title}`);
                console.log(`  src:   ${s.src}`);
                console.log(`  image: ${s.image}`);
                console.log(`  desc:  ${s.desc || s.caption || ''}`);
                console.log('---');
              }
            });
          }
          if (b.source && b.source.src && b.source.image && b.source.src !== b.source.image) {
            totalMismatches++;
            unitMismatches++;
            console.log(`[${u}] Lesson ${l.id || lIdx + 1} Block ${bIdx + 1} b.source:`);
            console.log(`  Title: ${b.source.title}`);
            console.log(`  src:   ${b.source.src}`);
            console.log(`  image: ${b.source.image}`);
            console.log('---');
          }
        });
      }
    });

    console.log(
      `Unit [${u}]: ${data.lessons.length} lessons checked. Mismatches: ${unitMismatches}`,
    );
  } catch (e) {
    console.log(`Note: Could not check units/${u}/data.js: ${e.message}`);
  }
});

console.log(
  `\nChecked ${unitsChecked} units. Total mismatches found across units: ${totalMismatches}`,
);
