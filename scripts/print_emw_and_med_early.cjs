const fs = require('fs');
const db = JSON.parse(fs.readFileSync('public/database.json', 'utf8'));

console.log('=== EARLY MODERN WORLD ===');
const emw = db.early_modern_world.data || db.early_modern_world;
emw.lessons.forEach((l, idx) => {
  console.log(`Lesson ${idx + 1}: ${l.title}`);
  const rawSources = (l.sources && Array.isArray(l.sources) && l.sources.length > 0)
    ? l.sources
    : (l.narrative_blocks || []).map(nb => nb.source).filter(s => s && (s.image || s.src || s.image_url));
  rawSources.forEach((s, sIdx) => {
    const letter = s.letter || String.fromCharCode(65 + sIdx);
    const img = s.image || s.src || s.image_url || s.source;
    console.log(`  [${letter}] ${s.title} -> ${img}`);
  });
});

console.log('\n=== EDEXCEL MEDICINE (Lessons 1-10) ===');
const med = db.edexcel_medicine.data || db.edexcel_medicine;
med.lessons.slice(0, 10).forEach((l, idx) => {
  console.log(`Lesson ${idx + 1}: ${l.title}`);
  const rawSources = (l.sources && Array.isArray(l.sources) && l.sources.length > 0)
    ? l.sources
    : (l.narrative_blocks || []).map(nb => nb.source).filter(s => s && (s.image || s.src || s.image_url));
  rawSources.forEach((s, sIdx) => {
    const letter = s.letter || String.fromCharCode(65 + sIdx);
    const img = s.image || s.src || s.image_url || s.source;
    console.log(`  [${letter}] ${s.title} -> ${img}`);
  });
});
