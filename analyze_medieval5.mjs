import { unitData } from './units/edexcel_medicine/data.js';

let medievalLessons = unitData.lessons.filter(
  (l) => l.id.startsWith('lesson_1_') || l.prefix === 'KT1',
);

let allQuestions = [];
let examQuestions = [];

medievalLessons.forEach((l) => {
  let title = l.title;

  // check guided reading questions
  if (l.guided_reading && l.guided_reading.questions) {
    l.guided_reading.questions.forEach((q) =>
      allQuestions.push(`[${title}] (Guided Reading): ${q.question || q.text || q}`),
    );
  }

  // check narrative blocks questions
  if (l.narrative_blocks) {
    l.narrative_blocks.forEach((nb, i) => {
      if (nb.questions) {
        nb.questions.forEach((q) =>
          allQuestions.push(`[${title}] (Narrative Block ${i}): ${q.question || q.text || q}`),
        );
      }
    });
  }

  // check exam_practice
  if (l.exam_practice) {
    if (Array.isArray(l.exam_practice)) {
      l.exam_practice.forEach((ep) => {
        examQuestions.push(`[${title}] (Exam Practice): ${ep.question || ep.text || ep}`);
      });
    } else if (l.exam_practice.question || l.exam_practice.text) {
      examQuestions.push(
        `[${title}] (Exam Practice): ${l.exam_practice.question || l.exam_practice.text}`,
      );
    } else if (l.exam_practice.questions) {
      l.exam_practice.questions.forEach((ep) =>
        examQuestions.push(`[${title}] (Exam Practice): ${ep.question || ep.text || ep}`),
      );
    }
  }

  // check gcse_task
  if (l.gcse_task) {
    if (l.gcse_task.question || l.gcse_task.text) {
      examQuestions.push(`[${title}] (GCSE Task): ${l.gcse_task.question || l.gcse_task.text}`);
    } else if (l.gcse_task.questions) {
      l.gcse_task.questions.forEach((q) =>
        examQuestions.push(`[${title}] (GCSE Task): ${q.question || q.text || q}`),
      );
    }
  }
});

console.log(`Total regular questions: ${allQuestions.length}`);
allQuestions.forEach((q) => console.log(q));

console.log(`\nTotal exam/GCSE questions: ${examQuestions.length}`);
let seen = new Set();
let duplicates = [];
examQuestions.forEach((q) => {
  console.log(q);
  // strip the title part to check for exact text duplicates
  let rawText = q.split('): ')[1];
  if (seen.has(rawText)) {
    duplicates.push(q);
  }
  seen.add(rawText);
});

console.log(`\nDuplicates found: ${duplicates.length}`);
duplicates.forEach((d) => console.log(d));
