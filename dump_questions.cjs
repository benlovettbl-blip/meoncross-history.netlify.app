const fs = require('fs');
const content = fs.readFileSync('units/water_and_sanitation/data.js', 'utf8');
const match = content.match(/export default ([\s\S]+);/);
const unitData = eval('(' + match[1] + ')');
let out = [];
unitData.lessons.forEach((l, i) => {
  const walk = (tasks) => {
    if(!tasks) return;
    tasks.forEach(t => {
      if(t.type === 'activity' || t.type === 'discussion' || t.type === 'timeline') return;
      if(t.options && t.correct_index === undefined && !t.answer) out.push(`L${i+1}: Multiple choice without answer: ${t.question}`);
      const q = t.question || t.task || t.text;
      if(q && typeof q === 'string') {
        if(!t.answer || t.answer.trim() === '' || t.answer.toLowerCase().includes('placeholder')) {
          out.push(`L${i+1} Q: ${q}`);
        }
      }
    });
  }
  walk(l.tasks);
  if(l.narrative_blocks) l.narrative_blocks.forEach(b => walk(b.tasks));
  if(l.gcse_task && l.gcse_task.tasks) walk(l.gcse_task.tasks);
});
console.log(JSON.stringify(out, null, 2));
