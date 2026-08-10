const fs = require('fs');
let code = fs.readFileSync('public/units/early_modern_world/data.js', 'utf8');
code = code.replace(/export const unitData\s*=\s*/, 'module.exports = ');
fs.writeFileSync('temp_data.js', code);
const data = require('./temp_data');

let sources = [];
data.lessons.forEach((lesson, lIdx) => {
  if (lesson.primary_source) sources.push('L' + (lIdx+1) + ' Primary Source: ' + lesson.primary_source.caption);
  if (lesson.starters) lesson.starters.forEach((s, sIdx) => sources.push('L' + (lIdx+1) + ' Starter ' + (sIdx+1) + ': ' + s.caption));
  if (lesson.narrative_blocks) {
    lesson.narrative_blocks.forEach((b, bIdx) => {
      if (b.image) sources.push('L' + (lIdx+1) + ' Block ' + (bIdx+1) + ': ' + (b.text ? b.text.substring(0, 50) + '...' : 'No text'));
    });
  }
});
console.log(sources.slice(0, 10).join('\n'));
