const fs = require('fs');

const filePath = 'c:/Projects/meoncross-history.netlify.app/cme_new/generate_worksheets.js';
let content = fs.readFileSync(filePath, 'utf8');

// Find the start and end of assignQuestionNumbers
const match = content.match(/function assignQuestionNumbers\(lesson\) \{[\s\S]*?\n  \}/);
if (match) {
  const newAssign = `function assignQuestionNumbers(lesson) {
    let q = 1;
    if (lesson.primary_source && lesson.primary_source.question) lesson.primary_source.qNum = q++;
    if (lesson.do_now) {
      if (lesson.do_now.type === "timeline" && lesson.do_now.prediction_question) lesson.do_now.qNum = q++;
      else if (lesson.do_now.type === "questions") lesson.do_now.items.forEach(item => item.qNum = q++);
    }
    if (lesson.tasks) lesson.tasks.forEach(task => task.qNum = q++);
    if (lesson.narrative_blocks) {
      lesson.narrative_blocks.forEach(block => {
        if (block.tasks) block.tasks.forEach(task => { task.qNum = q++; console.log("Numbered task:", task.text.substring(0, 30)); });
      });
    }
    if (lesson.extended && lesson.extended.question) lesson.extended.qNum = q++;
  }`;
  content = content.replace(match[0], newAssign);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log("Successfully patched assignQuestionNumbers using Regex.");
} else {
  console.log("Failed to find assignQuestionNumbers via Regex");
}
