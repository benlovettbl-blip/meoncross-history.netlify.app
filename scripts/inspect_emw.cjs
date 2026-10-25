const fs = require('fs');
const db = JSON.parse(fs.readFileSync('./public/database.json', 'utf8'));
const emw = db.early_modern_world.data;

console.log('Total lessons:', emw.lessons.length);
emw.lessons.forEach((l, i) => {
  const sources = l.sources || (l.narrative_blocks || []).map(b => b.source).filter(Boolean);
  console.log(`L${i+1}: ${l.title} (Sources: ${sources.length})`);
  sources.forEach(s => console.log('  ', s.title, s.image || s.src));
});
