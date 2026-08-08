const fs = require('fs');
let content = fs.readFileSync('generate_workbooks.js', 'utf8');

// Fix Active Tasks task box to allow page breaks inside
content = content.replace(
  '        let qText = task.question || task.text || \'\';\n        html += `<div class="task-box">`;',
  '        let qText = task.question || task.text || \'\';\n        html += `<div class="task-box" style="page-break-inside: auto;">`;'
);

fs.writeFileSync('generate_workbooks.js', content, 'utf8');
console.log('Fixed Active Tasks page breaks');
