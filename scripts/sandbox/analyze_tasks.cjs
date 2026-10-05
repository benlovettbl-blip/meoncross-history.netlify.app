const tasks = require('./all_gcse_tasks.json');
console.log('Total tasks:', tasks.length);

tasks.forEach((t) => {
  const words = t.model.split(/\s+/).filter(Boolean).length;
  console.log(`L${t.lessonIdx} [${t.lessonId}] | ${t.tariff} | words: ${words} | Q: ${t.question}`);
});
