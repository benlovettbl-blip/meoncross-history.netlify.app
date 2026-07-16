const fs = require('fs');
const data = require('./water_and_sanitation/data.js').unitData;
let out = '';
data.lessons.forEach((l, i) => {
  out += '\n--- LESSON ' + (i+1) + ': ' + l.title + ' ---\n';
  l.narrative_blocks.forEach((b, j) => {
    if(b.tasks) {
      b.tasks.forEach(t => {
        out += 'text: ' + JSON.stringify(t.text) + '\n';
        out += 'model: ' + JSON.stringify(t.model) + '\n';
        out += 'starter: ' + JSON.stringify(t.starter) + '\n\n';
      });
    }
  });
});
fs.writeFileSync('C:/Users/fives/.gemini/antigravity-ide/brain/631472b6-51a5-44e0-b757-a736730fde70/scratch/tasks.txt', out);
console.log('Saved to tasks.txt');
