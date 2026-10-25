const fs = require('fs');

function loadUnitData(unitPath) {
  let code = fs.readFileSync(unitPath, 'utf8');
  code = code.replace(/export\s+default\s+[^;]+;?/g, '').replace(/export\s*\{[^}]*\};?/g, '');
  const fakeWindow = {};
  const fn = new Function('window', code + '; return typeof unitData !== "undefined" ? unitData : (window.unitData || Object.values(window)[0]);');
  return fn(fakeWindow);
}

const me = loadUnitData('./units/medieval_england/data.js');

console.log('=== MEDIEVAL ENGLAND (' + me.lessons.length + ' lessons) ===');
me.lessons.forEach(l => {
  const sources = (l.narrative_blocks || []).map(b => b.source).filter(Boolean);
  console.log(`\nLesson ${l.id || l.lesson_number}: ${l.title} (Found ${sources.length} sources)`);
  sources.forEach(s => {
    console.log(` - [${s.id || 'Source'}] "${s.title}" -> ${s.image_url || s.image || 'NO IMAGE'}`);
    console.log(`   Caption: ${s.caption || ''}`);
  });
});
