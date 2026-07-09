const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'great_war_v2', 'generate_worksheets.js');
let code = fs.readFileSync(filePath, 'utf8');

// Now create generate_answer_key.js
let answerKeyCode = code;
answerKeyCode = answerKeyCode.replace('<title>${unitData.title} - Printable Workbook</title>', '<title>${unitData.title} - Teacher Answer Key</title>');
answerKeyCode = answerKeyCode.replace('Student Workbook</p>', 'Teacher Answer Key</p>');

// Replace do_now questions lines with answer
answerKeyCode = answerKeyCode.replace(
  /html \+= `<div class="task-lines"><\/div>`;/g,
  'html += `<div class="task-lines" style="color:red; font-weight:bold; padding-top: 5px;">${item.answer}</div>`;'
);
answerKeyCode = answerKeyCode.replace(
  /html \+= `<div class="task-lines-large"><\/div><div class="task-lines-large"><\/div><div class="task-lines-large"><\/div>`;/g,
  'html += `<div class="task-lines-large" style="color:red; font-weight:bold; padding-top: 5px;">${item.answer}</div>`;'
);

// Replace written tasks lines with answer
// Wait, the written tasks have: html += `<div class="task-lines"></div><div class="task-lines"></div><div class="task-lines"></div>`;
// That was replaced above! I need to be more careful.

// Let's rewrite generate_answer_key.js cleanly.
answerKeyCode = code;
answerKeyCode = answerKeyCode.replace('<title>${unitData.title} - Printable Workbook</title>', '<title>${unitData.title} - Teacher Answer Key</title>');
answerKeyCode = answerKeyCode.replace('Student Workbook</p>', 'Teacher Answer Key</p>');

// 1. Do Now items (index < 5)
answerKeyCode = answerKeyCode.replace(
  /if \(index < 5\) \{\s*html \+= `<div class="task-lines"><\/div>`;\s*\} else \{\s*html \+= `<div class="task-lines-large"><\/div><div class="task-lines-large"><\/div><div class="task-lines-large"><\/div>`;\s*\}/g,
  `html += \`<div style="color:red; font-weight:bold; padding: 10px; background: #fff0f0; border: 1px dashed red; margin-top: 5px;">\${item.answer}</div>\`;`
);

// 2. Written Tasks
answerKeyCode = answerKeyCode.replace(
  /html \+= `<div class="task-lines"><\/div><div class="task-lines"><\/div><div class="task-lines"><\/div>`;/g,
  `html += \`<div style="color:red; font-weight:bold; padding: 10px; background: #fff0f0; border: 1px dashed red;">\${task.model}</div>\`;`
);

// 3. Extended Reading
answerKeyCode = answerKeyCode.replace(
  /html \+= `<div class="task-lines-large"><\/div><div class="task-lines-large"><\/div><div class="task-lines-large"><\/div><div class="task-lines-large"><\/div>`;/g,
  `html += \`<div style="color:red; font-weight:bold; padding: 10px; background: #fff0f0; border: 1px dashed red; margin-top: 10px;">\${lesson.extended.model}</div>\`;`
);

// 4. GCSE Task
answerKeyCode = answerKeyCode.replace(
  /for\(let i=0; i<10; i\+\+\) \{\s*html \+= `<div class="task-lines-large"><\/div>`;\s*\}/g,
  `html += \`<div style="color:red; font-weight:bold; padding: 15px; background: #fff0f0; border: 2px dashed red; min-height: 200px; margin-top: 15px;">\${lesson.gcse_task.model}</div>\`;`
);

answerKeyCode = answerKeyCode.replace(/workbook\.html/g, 'answer_key.html');

fs.writeFileSync(path.join(__dirname, 'great_war_v2', 'generate_answer_key.js'), answerKeyCode);
console.log("Created generate_answer_key.js");
