const fs = require('fs');

function loadUnitData(unitPath) {
  let code = fs.readFileSync(unitPath, 'utf8');
  code = code.replace(/import\s+[^;]+;?/g, '').replace(/export\s+const\s+/g, 'const ').replace(/export\s+default\s+[^;]+;?/g, '').replace(/export\s*\{[^}]*\};?/g, '');
  const fakeWindow = {};
  const fn = new Function('window', code + '; return typeof unitData !== "undefined" ? unitData : (window.unitData || Object.values(window)[0]);');
  return fn(fakeWindow);
}

const cme = loadUnitData('./units/cme_new/data.js');
console.log('--- CME L2 sources ---');
(cme.lessons[1].sources || []).forEach(s => console.log(s.letter || s.id, s.title, s.image));
console.log('--- CME L3 sources ---');
(cme.lessons[2].sources || []).forEach(s => console.log(s.letter || s.id, s.title, s.image));
