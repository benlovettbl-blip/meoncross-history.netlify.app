const path = require('path');
const fs = require('fs');

async function checkLessons() {
  const dataPath = path.resolve('units/edexcel_medicine/data.js');
  const fileUrl = 'file:///' + dataPath.replace(/\\/g, '/');
  const module = await import(fileUrl);
  const unitData = module.default || module.unitData;

  console.log('Total lessons:', unitData.lessons.length);
  unitData.lessons.forEach((l, i) => {
    const hasGcseTask = !!l.gcse_task;
    const taskCount = l.gcse_task && l.gcse_task.tasks ? l.gcse_task.tasks.length : 0;
    const taskTypes =
      l.gcse_task && l.gcse_task.tasks
        ? l.gcse_task.tasks.map((t) => t.tariff || t.type).join(', ')
        : 'none';
    console.log(`L${i + 1} [${l.id}] ${l.title.padEnd(45)} | tasks: ${taskCount} | ${taskTypes}`);
  });
}

checkLessons().catch(console.error);
