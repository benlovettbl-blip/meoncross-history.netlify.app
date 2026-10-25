const fs = require('fs');

function loadUnitData(unitPath) {
  let code = fs.readFileSync(unitPath, 'utf8');
  code = code.replace(/export\s+default\s+[^;]+;?/g, '').replace(/export\s*\{[^}]*\};?/g, '');
  const fakeWindow = {};
  const fn = new Function('window', code + '; return typeof unitData !== "undefined" ? unitData : (window.unitData || Object.values(window)[0]);');
  return fn(fakeWindow);
}

const eee = loadUnitData('./units/eee/data.js');

console.log('=== EEE Lessons & Sources ===');
eee.lessons.forEach(l => {
  const sources = l.sources && l.sources.length ? l.sources : (l.narrative_blocks || []).map(b => b.source).filter(Boolean);
  sources.forEach(s => {
    if ((s.title || '').includes('Cadiz') || (s.title || '').includes('Gravelines') || (s.src || s.image || '').includes('gravelines') || (s.src || s.image || '').includes('cadiz')) {
      console.log(`Lesson ${l.id || l.lesson_number}: ${l.title}`);
      console.log(`  Source ID: ${s.id} | Letter: ${s.letter} | Title: "${s.title}"`);
      console.log(`  Path: ${s.src || s.image}`);
      console.log(`  Caption: ${s.caption}`);
    }
  });
});
