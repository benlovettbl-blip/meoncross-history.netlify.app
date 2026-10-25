const fs = require('fs');

function inspect(unitId) {
  const filePath = `units/${unitId}/data.js`;
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }
  const content = fs.readFileSync(filePath, 'utf8');
  const fakeWindow = {};
  const cleaned = content.replace(/export\s+default\s+[^;]+;?/g, '').replace(/export\s*\{[^}]*\};?/g, '');
  const fn = new Function('window', cleaned + '; return typeof unitData !== "undefined" ? unitData : (window.unitData || Object.values(window)[0]);');
  const data = fn(fakeWindow);

  console.log(`\n========================================`);
  console.log(`Unit: ${unitId}`);
  console.log(`Title: ${data.title}`);
  console.log(`Lessons count: ${data.lessons ? data.lessons.length : 0}`);

  (data.lessons || []).forEach((l, i) => {
    console.log(`\n--- Lesson ${i + 1}: ${l.title} ---`);
    console.log(`card_image: ${l.card_image}`);
    console.log(`sources array length: ${l.sources ? l.sources.length : 0}`);
    if (l.sources) {
      l.sources.forEach((s, sIdx) => {
        console.log(`  Source ${sIdx + 1} (${s.letter || 'no-letter'}): "${s.title}" -> ${s.image}`);
      });
    }
    if (l.narrative_blocks) {
      l.narrative_blocks.forEach((nb, nbIdx) => {
        if (nb.source) {
          console.log(`  NB ${nbIdx + 1} source: "${nb.source.title}" -> ${nb.source.image}`);
        }
      });
    }
  });
}

const target = process.argv[2] || 'medieval_england';
inspect(target);
