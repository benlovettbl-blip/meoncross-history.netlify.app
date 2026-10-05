const path = require('path');
const fs = require('fs');

async function inspectWF() {
  const dataPath = path.resolve('units/edexcel_medicine/data.js');
  const fileUrl = 'file:///' + dataPath.replace(/\\/g, '/');
  const module = await import(fileUrl);
  const unitData = module.default || module.unitData;

  for (let i = 20; i < 26; i++) {
    const l = unitData.lessons[i];
    console.log(`\n================================================================`);
    console.log(`LESSON ${i + 1}: ${l.title} (${l.id})`);
    if (l.gcse_task && l.gcse_task.tasks) {
      l.gcse_task.tasks.forEach((t, ti) => {
        console.log(`\n--- Task ${ti + 1}: ${t.tariff || t.type} ---`);
        console.log(`Stem: ${t.stem}`);
        console.log(`Model Answer:\n${t.model_answer || t.model}\n`);
      });
    }
  }
}

inspectWF().catch(console.error);
