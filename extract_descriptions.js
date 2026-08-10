const fs = require('fs');
let code = fs.readFileSync('public/units/early_modern_world/data.js', 'utf8');
code = code.replace(/export const unitData\s*=\s*/, 'module.exports = ');
fs.writeFileSync('temp_data.js', code);
const data = require('./temp_data');

let descriptions = [];
data.lessons.forEach((lesson, lIdx) => {
  if (lesson.narrative_blocks) {
    lesson.narrative_blocks.forEach((b, bIdx) => {
      if (b.image && b.text) {
        descriptions.push({
          lesson: lIdx,
          block: bIdx,
          text: b.text
        });
      }
    });
  }
});
fs.writeFileSync('descriptions.json', JSON.stringify(descriptions, null, 2));
console.log('Saved ' + descriptions.length + ' descriptions to descriptions.json');
