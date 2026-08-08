const fs = require('fs');

let content = fs.readFileSync('generate_workbooks.js', 'utf8');

content = content.replace(
  'html += `<div style="page-break-inside: avoid; margin-top: 20px;">`;\n      html += `<h2 style="margin-top: 0;">GCSE Exam Practice</h2>`;',
  'html += `<div style="page-break-inside: auto; margin-top: 20px;">`;\n      html += `<h2 style="margin-top: 0;">GCSE Exam Practice</h2>`;'
);

content = content.replace(
  'html += `<div class="task-box" style="margin-bottom: 10px; border: 2px solid #1a237e; background: #eef2ff;">`;\n        html += `<h2 style="margin-top: 0; color: #1a237e; font-size: 14pt; border-bottom: none;">Exam Practice</h2>`;',
  'html += `<div class="task-box" style="margin-bottom: 10px; border: 2px solid #1a237e; background: #eef2ff; page-break-inside: auto;">`;\n        html += `<h2 style="margin-top: 0; color: #1a237e; font-size: 14pt; border-bottom: none;">Exam Practice</h2>`;'
);

fs.writeFileSync('generate_workbooks.js', content, 'utf8');
console.log('Patched the missed Exam Practice page breaks!');
