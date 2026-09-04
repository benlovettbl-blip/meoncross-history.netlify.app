import { unitData } from './units/edexcel_medicine/data.js';

let medievalLessons = unitData.lessons.filter(
  (l) => l.id.startsWith('lesson_1_') || l.prefix === 'KT1',
);

console.log(`Found ${medievalLessons.length} medieval lessons.`);

let allLessonQuestions = [];
let allExamQuestions = [];

medievalLessons.forEach((lesson, i) => {
  let l_num = lesson.id;
  let questionsForLesson = 0;

  // Check for explicit "exam_practice" or sections of type "exam_practice" or sections containing questions
  if (lesson.sections) {
    lesson.sections.forEach((sec) => {
      if (sec.type === 'questions' && sec.questions) {
        questionsForLesson += sec.questions.length;
        sec.questions.forEach((q) =>
          allLessonQuestions.push({ lesson: l_num, text: q.text || q.question }),
        );
      }
      if (sec.type === 'exam_practice' && sec.questions) {
        sec.questions.forEach((q) =>
          allExamQuestions.push({ lesson: l_num, text: q.text || q.question }),
        );
      }
      if (sec.exam_practice && sec.exam_practice.questions) {
        sec.exam_practice.questions.forEach((q) =>
          allExamQuestions.push({ lesson: l_num, text: q.text || q.question }),
        );
      }
    });
  }

  // Check root level exam_question
  if (lesson.exam_question) {
    let text = lesson.exam_question.text || lesson.exam_question.question;
    if (text) allExamQuestions.push({ lesson: l_num, text });
  }

  // Check root level questions
  if (lesson.questions) {
    questionsForLesson += lesson.questions.length;
    lesson.questions.forEach((q) =>
      allLessonQuestions.push({ lesson: l_num, text: q.text || q.question }),
    );
  }

  console.log(`${l_num} - "${lesson.title}": ${questionsForLesson} lesson questions`);
});

console.log(`\nTotal standard lesson questions across Medieval: ${allLessonQuestions.length}`);

console.log(`\nExam Questions Found: ${allExamQuestions.length}`);
let seen = new Set();
let duplicates = [];
allExamQuestions.forEach((eq) => {
  console.log(`[${eq.lesson}] ${eq.text}`);
  if (seen.has(eq.text)) duplicates.push(eq.text);
  seen.add(eq.text);
});

console.log(`\nDuplicates found: ${duplicates.length}`);
duplicates.forEach((d) => console.log(`  - ${d}`));
