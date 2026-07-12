const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'generate_worksheets.js');
let code = fs.readFileSync(targetPath, 'utf8');

// 1. Update assignQuestionNumbers to process narrative block tasks
const oldAssignFn = `  function assignQuestionNumbers(lesson) {
    let q = 1;
    if (lesson.primary_source && lesson.primary_source.question) lesson.primary_source.qNum = q++;
    if (lesson.do_now) {
      if (lesson.do_now.type === "timeline" && lesson.do_now.prediction_question) lesson.do_now.qNum = q++;
      else if (lesson.do_now.type === "questions") lesson.do_now.items.forEach(item => item.qNum = q++);
    }
    if (lesson.tasks) lesson.tasks.forEach(task => task.qNum = q++);
    if (lesson.extended && lesson.extended.question) lesson.extended.qNum = q++;
  }`;

const newAssignFn = `  function assignQuestionNumbers(lesson) {
    let q = 1;
    if (lesson.primary_source && lesson.primary_source.question) lesson.primary_source.qNum = q++;
    if (lesson.do_now) {
      if (lesson.do_now.type === "timeline" && lesson.do_now.prediction_question) lesson.do_now.qNum = q++;
      else if (lesson.do_now.type === "questions") lesson.do_now.items.forEach(item => item.qNum = q++);
    }
    if (lesson.tasks) lesson.tasks.forEach(task => task.qNum = q++);
    if (lesson.narrative_blocks) {
      lesson.narrative_blocks.forEach(block => {
        if (block.tasks) {
          block.tasks.forEach(task => { task.qNum = q++; });
        }
      });
    }
    if (lesson.extended && lesson.extended.question) lesson.extended.qNum = q++;
  }`;

code = code.replace(oldAssignFn, newAssignFn);

// 2. Remove "Knowledge Check" header from narrative block tasks
const oldKnowledgeCheck = `html += \`<div class="task-box" style="margin-top: 15px;">\`;
        html += \`<h3 style="margin-top: 0; font-size: 14pt;">Knowledge Check</h3>\`;`;

const newKnowledgeCheck = `html += \`<div class="task-box" style="margin-top: 15px;">\`;`;

code = code.replace(oldKnowledgeCheck, newKnowledgeCheck);

fs.writeFileSync(targetPath, code, 'utf8');
console.log('Successfully patched generate_worksheets.js');
