const fs = require('fs');
const path = require('path');

const filePath = path.join('c:', 'Projects', 'meoncross-history.netlify.app', 'generate_pupil_workbooks.js');
let code = fs.readFileSync(filePath, 'utf8');

// The string to append right before </h4>
const suffix = "${task.page ? ` [p. ${task.page}]` : ''}";

code = code.replace(/<h4 style="margin-top: 0; color: #b45309;">Drawing Task: Q\$\{task\.qNum \|\| ''\} \$\{task\.text \|\| task\.question\}<\/h4>/g, 
  `<h4 style="margin-top: 0; color: #b45309;">Drawing Task: Q\${task.qNum || ''} \${task.text || task.question}${suffix}</h4>`);

code = code.replace(/<h4 style="margin-top: 0; color: #b45309;">Drawing Task: Q\$\{task\.qNum \|\| \(tIdx \+ 1\)\} \$\{task\.text \|\| task\.question\}<\/h4>/g, 
  `<h4 style="margin-top: 0; color: #b45309;">Drawing Task: Q\${task.qNum || (tIdx + 1)} \${task.text || task.question}${suffix}</h4>`);

code = code.replace(/<h4 style="margin-top: 0; color: #065f46;">Think-Pair-Share: Q\$\{task\.qNum \|\| ''\} \$\{task\.text \|\| task\.question\}<\/h4>/g, 
  `<h4 style="margin-top: 0; color: #065f46;">Think-Pair-Share: Q\${task.qNum || ''} \${task.text || task.question}${suffix}</h4>`);

code = code.replace(/<h4 style="margin-top: 0; color: #065f46;">Think-Pair-Share: Q\$\{task\.qNum \|\| \(tIdx \+ 1\)\} \$\{task\.text \|\| task\.question\}<\/h4>/g, 
  `<h4 style="margin-top: 0; color: #065f46;">Think-Pair-Share: Q\${task.qNum || (tIdx + 1)} \${task.text || task.question}${suffix}</h4>`);

code = code.replace(/<h4 style="margin-top: 0;">Q\$\{task\.qNum \|\| ''\} \$\{task\.text\}<\/h4>/g, 
  `<h4 style="margin-top: 0;">Q\${task.qNum || ''} \${task.text}${suffix}</h4>`);

fs.writeFileSync(filePath, code, 'utf8');
console.log('Appended task.page to custom task renderers in generate_pupil_workbooks.js');
