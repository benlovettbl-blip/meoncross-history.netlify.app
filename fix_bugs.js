const fs = require('fs');

const path = 'src/core_app.js';
let code = fs.readFileSync(path, 'utf8');

// 1. Fix task.text.includes inside the template literal for gcse_task.tasks
code = code.replace(
  /\${task\.text\.includes\("12 marks"\) \|\| task\.text\.includes\("16 marks"\) \? "200px" : "100px"};/g,
  '${(task.text || task.question || "").includes("12 marks") || (task.text || task.question || "").includes("16 marks") ? "200px" : "100px"};'
);

// 2. Fix let qText = formatQuestion(task.text); to formatQuestion(task.text || task.question);
code = code.replace(/let qText = formatQuestion\(task\.text\);/g, 'let qText = formatQuestion(task.text || task.question);');

// 3. Fix formatQuestion(task.text) inside the gcse_task loop to formatQuestion(task.text || task.question)
code = code.replace(/\${formatQuestion\(task\.text\)}/g, '${formatQuestion(task.text || task.question)}');

// Write it back
fs.writeFileSync(path, code, 'utf8');
console.log('Fixed undefined task.text errors.');
