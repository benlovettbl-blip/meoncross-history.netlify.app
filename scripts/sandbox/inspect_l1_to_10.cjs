const path = require('path');
const fs = require('fs');

async function inspectL1to10() {
  const dataPath = path.resolve('units/edexcel_medicine/data.js');
  const fileUrl = 'file:///' + dataPath.replace(/\\/g, '/');
  const module = await import(fileUrl);
  const unitData = module.default || module.unitData;

  for (let i = 0; i < 10; i++) {
    const l = unitData.lessons[i];
    console.log(`\n================================================================`);
    console.log(`LESSON ${i + 1}: ${l.title} (${l.id})`);
    if (l.gcse_task && l.gcse_task.tasks) {
      l.gcse_task.tasks.forEach((t, ti) => {
        console.log(`\n--- [L${i + 1} Task ${ti + 1}] Tariff: ${t.tariff || t.type} ---`);
        console.log(`Question: ${t.text}`);
        if (t.stimulus) console.log(`Stimulus: ${JSON.stringify(t.stimulus)}`);
        console.log(`\nModel Answer:\n${t.model}\n`);
      });
    }
  }
}

inspectL1to10().catch(console.error);
