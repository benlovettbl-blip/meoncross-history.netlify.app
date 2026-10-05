const path = require('path');
const fs = require('fs');

async function inspectTasks() {
  const dataPath = path.resolve('units/edexcel_medicine/data.js');
  const fileUrl = 'file:///' + dataPath.replace(/\\/g, '/');
  const module = await import(fileUrl);
  const unitData = module.default || module.unitData;

  console.log('Examining all tasks across all lessons:');
  unitData.lessons.forEach((l, i) => {
    if (l.gcse_task && l.gcse_task.tasks) {
      console.log(`\n========================================`);
      console.log(`LESSON ${i + 1}: ${l.title}`);
      l.gcse_task.tasks.forEach((t, ti) => {
        console.log(`-- Task ${ti + 1}: ${t.tariff || t.type}`);
        console.log(`Keys:`, Object.keys(t));
        if (t.text) console.log(`Question: ${t.text}`);
        if (t.question) console.log(`Question (prop): ${t.question}`);
        if (t.prompt) console.log(`Prompt: ${t.prompt}`);
        if (t.model) console.log(`Model:\n${t.model.substring(0, 200)}...`);
        if (t.model_answer)
          console.log(`Model answer (prop):\n${t.model_answer.substring(0, 200)}...`);
      });
    }
  });
}

inspectTasks().catch(console.error);
