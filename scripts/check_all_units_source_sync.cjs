const fs = require('fs');
const path = require('path');

const unitsDir = path.resolve(__dirname, '..', 'units');
const unitDirs = fs
  .readdirSync(unitsDir)
  .filter((f) => fs.statSync(path.join(unitsDir, f)).isDirectory());

unitDirs.forEach((u) => {
  const dataFile = path.join(unitsDir, u, 'data.js');
  if (!fs.existsSync(dataFile)) return;
  try {
    const raw = require(dataFile);
    const data = raw.default || raw;
    if (!data.lessons) return;

    let mismatches = 0;
    data.lessons.forEach((l) => {
      if (!l.narrative_blocks || !l.sources) return;
      l.narrative_blocks.forEach((b, i) => {
        if (b.sources && b.sources.length > 0 && l.sources[i]) {
          const bSrc = b.sources[0];
          const rSrc = l.sources[i];
          const bImg = bSrc.src || bSrc.image || bSrc.type || '';
          const rImg = rSrc.src || rSrc.image || rSrc.type || '';
          if (bSrc.title !== rSrc.title || bImg !== rImg) {
            mismatches++;
          }
        }
      });
    });
    if (mismatches > 0) {
      console.log(`Unit ${u}: ${mismatches} mismatches between block.sources and lesson.sources`);
    } else {
      console.log(`Unit ${u}: ✅ Perfect sync`);
    }
  } catch (e) {
    console.log(`Unit ${u}: Error reading - ${e.message}`);
  }
});
