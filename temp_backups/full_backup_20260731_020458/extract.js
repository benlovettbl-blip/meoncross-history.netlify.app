const fs = require('fs');

async function extract() {
  const m = await import('./public/units/cme_new/data.js');
  let out = '';
  m.unitData.periods.forEach((p, i) => {
    out += `Period ${i}: ${p.name}\n`;
    p.lessons.forEach((l, j) => {
      out += `  Lesson ${j}: ${l.title} (tasks: ${l.tasks ? l.tasks.length : 0})\n`;
    });
  });
  fs.writeFileSync('cme_lessons_list.txt', out);
}
extract();
