import { unitData } from './units/edexcel_medicine/data.js';

let totalLessons = unitData.lessons.length;
let lessonsWithoutGuidedReading = 0;
let examQuestions = [];

unitData.lessons.forEach((l) => {
  let title = l.title;

  // Check guided reading
  let hasGuidedReading = false;
  if (l.guided_reading && l.guided_reading.questions && l.guided_reading.questions.length > 0) {
    hasGuidedReading = true;
  }
  if (!hasGuidedReading) {
    lessonsWithoutGuidedReading++;
  }

  // Check exam questions
  if (l.exam_practice) {
    if (Array.isArray(l.exam_practice)) {
      l.exam_practice.forEach((ep) =>
        examQuestions.push(`[${title}] ${ep.question || ep.text || ep}`),
      );
    } else {
      examQuestions.push(`[${title}] ${l.exam_practice.question || l.exam_practice.text}`);
    }
  }

  if (l.extended && l.extended.question) {
    examQuestions.push(`[${title}] ${l.extended.question}`);
  }
  if (l.gcse_task && l.gcse_task.question) {
    examQuestions.push(`[${title}] ${l.gcse_task.question}`);
  }
});

console.log(`Total lessons: ${totalLessons}`);
console.log(`Lessons missing guided reading: ${lessonsWithoutGuidedReading}`);
console.log(`Total exam questions found: ${examQuestions.length}`);

let seen = new Set();
let duplicates = [];
examQuestions.forEach((q) => {
  let rawText = q.split('] ')[1];
  if (seen.has(rawText) && rawText) {
    duplicates.push(q);
  }
  if (rawText) seen.add(rawText);
});
console.log(`Duplicates found across whole unit: ${duplicates.length}`);
duplicates.forEach((d) => console.log(d));
