const fs = require('fs');
const path = './public/units/early_modern_world/data.js';

let code = fs.readFileSync(path, 'utf8');

// Replace export statement so we can require it
code = code.replace(/export const unitData\s*=\s*/, 'module.exports = ');
fs.writeFileSync('temp_data.js', code);

const data = require('./temp_data');

let counts = { reflection: 0, hinge: 0, timeline: 0, spectrum: 0 };

data.lessons.forEach(l => {
  if (l.narrative_blocks) {
    l.narrative_blocks.forEach(b => {
      if (b.hinge_question) { 
        counts.hinge++; 
        delete b.hinge_question;
      }
      if (b.tasks) {
        b.tasks = b.tasks.filter(t => {
          if (t.type === 'drag_drop_timeline') { counts.timeline++; return false; }
          if (t.type === 'spectrum_mapper') { counts.spectrum++; return false; }
          if ((t.title && t.title.toLowerCase().includes('reflection')) || (t.text && t.text.toLowerCase().includes('reflection'))) { counts.reflection++; return false; }
          return true;
        });
      }
    });
  }
  if (l.tasks) {
    l.tasks = l.tasks.filter(t => {
      if (t.type === 'drag_drop_timeline') { counts.timeline++; return false; }
      if (t.type === 'spectrum_mapper') { counts.spectrum++; return false; }
      if ((t.title && t.title.toLowerCase().includes('reflection')) || (t.text && t.text.toLowerCase().includes('reflection'))) { counts.reflection++; return false; }
      return true;
    });
  }
});

// Write it back as an ES module
const newCode = 'export const unitData = ' + JSON.stringify(data, null, 2) + ';\n';
fs.writeFileSync(path, newCode);

console.log('Stripping complete. Removed:', counts);
