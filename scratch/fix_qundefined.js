const fs = require('fs');

const filePath = 'c:/Projects/meoncross-history.netlify.app/cme_new/generate_worksheets.js';
let content = fs.readFileSync(filePath, 'utf8');

const oldAssign = `    if (lesson.tasks) lesson.tasks.forEach(task => task.qNum = q++);
    if (lesson.extended && lesson.extended.question) lesson.extended.qNum = q++;
  }`;

const newAssign = `    if (lesson.tasks) lesson.tasks.forEach(task => task.qNum = q++);
    if (lesson.narrative_blocks) {
      lesson.narrative_blocks.forEach(block => {
        if (block.tasks) block.tasks.forEach(task => task.qNum = q++);
      });
    }
    if (lesson.extended && lesson.extended.question) lesson.extended.qNum = q++;
  }`;

content = content.replace(oldAssign, newAssign);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Patched assignQuestionNumbers in cme_new/generate_worksheets.js");
