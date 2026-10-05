const path = require('path');
const fs = require('fs');

async function run() {
  const dataPath = path.resolve('units/edexcel_medicine/data.js');
  const fileUrl = 'file:///' + dataPath.replace(/\\/g, '/');
  const module = await import(fileUrl);
  const unitData = module.default || module.unitData;

  if (!unitData || !unitData.lessons) {
    console.log('No lessons found');
    return;
  }

  console.log(`Found ${unitData.lessons.length} lessons in edexcel_medicine\n`);
  let out = [];

  unitData.lessons.forEach((l, idx) => {
    if (l.gcse_task && l.gcse_task.tasks) {
      l.gcse_task.tasks.forEach((t, tIdx) => {
        out.push({
          lessonIdx: idx + 1,
          lessonId: l.id,
          lessonTitle: l.title,
          taskIdx: tIdx + 1,
          tariff: t.tariff || t.type,
          question: t.text,
          model: t.model || '',
        });
      });
    }
  });

  console.log(`Total GCSE tasks found: ${out.length}\n`);

  // Save summary to a JSON file for analysis
  fs.writeFileSync('scripts/sandbox/all_gcse_tasks.json', JSON.stringify(out, null, 2), 'utf8');

  // Let's print out the 4-mark and other questions with overly long / complex models
  out.forEach((item) => {
    console.log(`\n======================================================`);
    console.log(`[Lesson ${item.lessonIdx}: ${item.lessonTitle}]`);
    console.log(`Task ${item.taskIdx} (${item.tariff})`);
    console.log(`Q: ${item.question}`);
    console.log(
      `Model length: ${item.model.length} chars | ~${item.model.split(/\s+/).length} words`,
    );
    console.log(`Model Answer:\n${item.model}\n`);
  });
}

run().catch(console.error);
