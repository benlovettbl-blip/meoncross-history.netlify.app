const fs = require('fs');

const content = fs.readFileSync('units/first_british_empire/data.js', 'utf8');
const fakeWindow = {};
const cleaned = content.replace(/export\s+default\s+[^;]+;?/g, '').replace(/export\s*\{[^}]*\};?/g, '');
const fn = new Function('window', cleaned + '; return typeof unitData !== "undefined" ? unitData : (window.unitData || Object.values(window)[0]);');
const data = fn(fakeWindow);

console.log('Unit title:', data.title);
console.log('Lessons count:', data.lessons.length);
data.lessons.forEach((l, idx) => {
  console.log(`\nLesson ${idx+1}: ${l.title}`);
  console.log('  card_image:', l.card_image);
  if (l.sources) {
    l.sources.forEach((s, sIdx) => {
      console.log(`  Source ${sIdx+1} (${s.title}): image=${s.image}`);
    });
  }
  if (l.narrative_blocks) {
    l.narrative_blocks.forEach((nb, nbIdx) => {
      if (nb.source) {
        console.log(`  NarrativeBlock ${nbIdx+1} source (${nb.source.title}): image=${nb.source.image}`);
      }
    });
  }
});
