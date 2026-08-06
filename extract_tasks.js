const fs = require('fs');
const content = fs.readFileSync('early_modern_world/data.js', 'utf8');
const prefix = 'export const unitData = ';
const jsonStr = content.replace(prefix, '').trim().replace(/;$/, '');
const unit = eval('(' + jsonStr + ')');

let results = [];
unit.lessons.forEach(l => {
  if (l.sources) {
    l.sources.forEach(s => {
      if (s.image_caption && s.tasks) {
        results.push({caption: s.image_caption, tasks: s.tasks});
      }
    });
  }
  if(l.narrative_blocks) {
    l.narrative_blocks.forEach(b => {
      if(b.image_caption && b.tasks) {
        results.push({caption: b.image_caption, tasks: b.tasks});
      }
    });
  }
});
console.log(JSON.stringify(results, null, 2));
