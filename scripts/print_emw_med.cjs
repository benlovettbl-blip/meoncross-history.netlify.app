const fs = require('fs');
const db = JSON.parse(fs.readFileSync('public/database.json', 'utf8'));

['early_modern_world', 'edexcel_medicine'].forEach(unitId => {
  console.log(`\n=================== UNIT: ${unitId} ===================`);
  const data = db[unitId].data || db[unitId];
  data.lessons.forEach((l, lIdx) => {
    const rawSources = (l.sources && Array.isArray(l.sources) && l.sources.length > 0)
      ? l.sources
      : (l.narrative_blocks || []).map(nb => nb.source).filter(s => s && (s.image || s.src || s.image_url));

    if (rawSources && rawSources.length > 0) {
      rawSources.forEach((s, sIdx) => {
        const letter = s.letter || String.fromCharCode(65 + sIdx);
        const img = s.image || s.src || s.image_url || s.source;
        console.log(`  Lesson ${lIdx + 1} (${l.title}) [${letter}]: "${s.title}" -> ${img}`);
      });
    }
  });
});
