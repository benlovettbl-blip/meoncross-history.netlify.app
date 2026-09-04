import { unitData } from './units/edexcel_medicine/data.js';

let medievalTopic = unitData.topics ? unitData.topics.find((t) => t.id === 'medieval') : null;
if (!medievalTopic) {
  // maybe it's not structured with topics array?
  console.log('No medieval topic found. Keys:', Object.keys(unitData));
} else {
  console.log(`Medieval Topic Title: ${medievalTopic.title}`);
  console.log(`Number of lessons: ${medievalTopic.lessons.length}`);

  let totalQuestions = 0;
  let examQuestions = [];

  medievalTopic.lessons.forEach((lesson, i) => {
    let lQuestions = 0;
    let lExamQs = 0;

    if (lesson.sections) {
      lesson.sections.forEach((sec) => {
        if (sec.type === 'questions' && sec.questions) {
          lQuestions += sec.questions.length;
          totalQuestions += sec.questions.length;
        }
        if (sec.type === 'exam_practice' || (sec.exam_practice && sec.exam_practice.questions)) {
          let qs = sec.exam_practice ? sec.exam_practice.questions : sec.questions;
          if (qs) {
            qs.forEach((q) => {
              examQuestions.push({ lesson: i + 1, text: q.question || q.text });
            });
          }
        }
      });
    }

    if (lesson.exam_question) {
      examQuestions.push({
        lesson: i + 1,
        text: lesson.exam_question.question || lesson.exam_question.text,
      });
    }

    if (lesson.questions) {
      lQuestions += lesson.questions.length;
      totalQuestions += lesson.questions.length;
    }
  });

  console.log(`Total lesson questions: ${totalQuestions}`);
  console.log(`Total exam questions found: ${examQuestions.length}`);
  examQuestions.forEach((eq) => console.log(`- L${eq.lesson}: ${eq.text}`));

  // check duplicates
  let seen = new Set();
  let duplicates = [];
  examQuestions.forEach((eq) => {
    if (seen.has(eq.text)) duplicates.push(eq.text);
    seen.add(eq.text);
  });
  console.log(`Duplicates found: ${duplicates.length}`);
  duplicates.forEach((d) => console.log(`  - ${d}`));
}
