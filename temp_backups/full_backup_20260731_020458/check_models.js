const fs = require('fs');
const units = ['change_1450_1750', 'edexcel_medicine', 'eee', 'great_war', 'great_war_part2', 'water_and_sanitation'];
let count = 0;
units.forEach(u => {
  try {
    const text = fs.readFileSync(u + '/data.js', 'utf8');
    let jsonStr = text.replace(/^export default /, '').trim();
    if (jsonStr.endsWith(';')) jsonStr = jsonStr.slice(0, -1);
    let data = JSON.parse(jsonStr);
    data.lessons.forEach(l => {
      if (l.extended && l.extended.model && !l.extended.model.includes('<strong>')) {
        console.log(u, l.id, 'UNFORMATTED EXTENDED MODEL');
        count++;
      }
      if (l.gcse_task && l.gcse_task.model && !l.gcse_task.model.includes('<strong>')) {
        console.log(u, l.id, 'UNFORMATTED GCSE TASK MODEL');
        count++;
      }
    });
  } catch(e) {}
});
console.log('TOTAL:', count);
