import { unitData } from './units/edexcel_medicine/data.js';

let medievalLessons = unitData.lessons.filter(
  (l) => l.id.startsWith('lesson_1_') || l.prefix === 'KT1',
);

let allQuestions = [];
let examQuestions = [];

medievalLessons.forEach((l) => {
  let title = l.title;

  if (l.exam_practice) {
    if (Array.isArray(l.exam_practice)) {
      l.exam_practice.forEach((ep) =>
        examQuestions.push(`[${title}] (Exam Practice): ${ep.question || ep.text || ep}`),
      );
    } else {
      examQuestions.push(
        `[${title}] (Exam Practice): ${l.exam_practice.question || l.exam_practice.text}`,
      );
    }
  }

  if (l.extended && l.extended.question) {
    examQuestions.push(`[${title}] (Extended): ${l.extended.question}`);
  }
  if (l.gcse_task && l.gcse_task.question) {
    examQuestions.push(`[${title}] (GCSE Task): ${l.gcse_task.question}`);
  }
});

console.log(`\nTotal exam/GCSE questions: ${examQuestions.length}`);
examQuestions.forEach((q) => console.log(q));
