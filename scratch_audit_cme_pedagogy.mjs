import fs from 'fs';

const data = fs.readFileSync('cme_new/data.js', 'utf8');
const jsonStr = data.substring(data.indexOf('{'), data.lastIndexOf('}') + 1);
const unit = JSON.parse(jsonStr);

let issues = [];

unit.lessons.forEach((lesson, index) => {
  const lNum = index + 1;
  // Check teacher notes
  if (!lesson.teacher_notes) {
    issues.push(`Lesson ${lNum} missing teacher_notes`);
  } else {
    if (!lesson.teacher_notes.primer) issues.push(`Lesson ${lNum} teacher_notes missing primer`);
    if (!lesson.teacher_notes.objectives || lesson.teacher_notes.objectives.length === 0) {
      issues.push(`Lesson ${lNum} teacher_notes missing objectives`);
    } else {
      lesson.teacher_notes.objectives.forEach((obj, oIdx) => {
         if (!obj.objective) issues.push(`Lesson ${lNum} objective ${oIdx+1} missing 'objective'`);
         if (!obj.primer) issues.push(`Lesson ${lNum} objective ${oIdx+1} missing 'primer'`);
         if (!obj.question) issues.push(`Lesson ${lNum} objective ${oIdx+1} missing 'question' (Hinge Question)`);
      });
    }
  }

  // Check do_nows (just count them)
  if (!lesson.do_now || (!lesson.do_now.questions && !lesson.do_now.events)) {
     issues.push(`Lesson ${lNum} missing do_now questions/events`);
  }

  // Check primary source model answer
  if (lesson.primary_source) {
    if (lesson.primary_source.question && !lesson.primary_source.model_answer && !lesson.primary_source.model && (!lesson.primary_source.tasks || !lesson.primary_source.tasks.some(t => t.model))) {
      issues.push(`Lesson ${lNum} primary_source has question but no model answer`);
    }
  }

  // Check GCSE tasks
  if (lesson.gcse_task) {
     if (lesson.gcse_task.tasks) {
       lesson.gcse_task.tasks.forEach((t, tIdx) => {
         if (!t.model && !t.model_answer) {
           issues.push(`Lesson ${lNum} gcse_task task ${tIdx+1} missing model answer`);
         }
       });
     }
  }

  // Check Extended questions
  if (lesson.extended && lesson.extended.question) {
     if (!lesson.extended.model && !lesson.extended.model_answer) {
        issues.push(`Lesson ${lNum} extended question missing model answer`);
     }
  }
});

console.log(issues.length ? issues.join('\n') : 'No major structural issues found.');
