const fs = require('fs');
const med = JSON.parse(fs.readFileSync('public/data/edexcel_medicine.json', 'utf8'));
const lessons = med.data.lessons;

console.log('Total lessons:', lessons.length);
lessons.forEach((l, idx) => {
  const gt = l.gcse_task;
  const ep = l.exam_practice;
  console.log(`L${idx + 1} (${l.id}): gcse_task=${!!gt}, exam_practice=${!!ep}`);
  if (gt) {
    const tasks = gt.tasks || gt.questions || [];
    console.log(`   title: "${gt.title}", tasksCount: ${tasks.length}`);
    tasks.forEach((t, tIdx) => {
      const model = t.model || t.exemplar || t.answer || t.model_answer;
      const hasModel = !!model;
      const modelLen = hasModel ? model.length : 0;
      console.log(
        `     T${tIdx + 1}: tariff="${t.tariff || t.type || ''}", hasModel=${hasModel} (${modelLen} chars)`,
      );
    });
  }
});
