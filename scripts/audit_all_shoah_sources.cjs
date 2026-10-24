const fs = require('fs');
const path = require('path');

async function checkSources() {
  const root = path.resolve(__dirname, '..');

  // 1. Check units/the_shoah/data.js
  const dataJsPath = path.join(root, 'units/the_shoah/data.js');
  const fileUrl = 'file:///' + dataJsPath.replace(/\\/g, '/');
  const mod = await import(fileUrl);
  const dataJs = mod.default || mod.the_shoah || Object.values(mod)[0];

  // 2. Check public/data/the_shoah.json
  const dataJsonPath = path.join(root, 'public/data/the_shoah.json');
  const rawJson = JSON.parse(fs.readFileSync(dataJsonPath, 'utf8'));
  const dataJson = rawJson.data || rawJson;

  function analyzeUnit(sourceName, unit) {
    console.log(`\n************************************************`);
    console.log(`ANALYSIS FOR: ${sourceName}`);
    console.log(`************************************************`);

    unit.lessons.forEach((l, lIdx) => {
      console.log(`\nLesson ${lIdx + 1} (${l.id}): ${l.title}`);

      // Narrative blocks
      (l.narrative_blocks || []).forEach((b, bIdx) => {
        const s = b.source;
        if (s) {
          const img = s.image || s.src || s.url;
          console.log(
            `  Block ${bIdx + 1} Source: [Letter ${s.letter || '?'}] [Type: ${s.type || 'text'}]`,
          );
          console.log(`    Title:   ${s.title}`);
          console.log(`    Image:   ${img || '(none)'}`);
          if (img) {
            const diskPath = path.join(root, 'public', img.replace(/^\//, ''));
            const exists = fs.existsSync(diskPath);
            console.log(`    Exists:  ${exists}`);
          }
        }
      });

      // Lesson level sources
      (l.sources || []).forEach((s, sIdx) => {
        const img = s.image || s.src || s.url;
        console.log(
          `  Lesson Source ${sIdx + 1}: [Letter ${s.letter || '?'}] [Type: ${s.type || 'text'}]`,
        );
        console.log(`    Title:   ${s.title}`);
        console.log(`    Image:   ${img || '(none)'}`);
        if (img) {
          const diskPath = path.join(root, 'public', img.replace(/^\//, ''));
          const exists = fs.existsSync(diskPath);
          console.log(`    Exists:  ${exists}`);
        }
      });
    });
  }

  analyzeUnit('units/the_shoah/data.js', dataJs);
  analyzeUnit('public/data/the_shoah.json', dataJson);
}

checkSources().catch(console.error);
