const fs = require('fs');
let tb = fs.readFileSync('generate_textbooks.js', 'utf8');

tb = tb.replace(
  '${unitData.cover_image ? `<div style="margin-bottom: 20px;"><img src="../../${unitData.cover_image.replace(/^\\//, \'\')}"',
  '${(period.image || unitData.cover_image) ? `<div style="margin-bottom: 20px;"><img src="../../${(period.image || unitData.cover_image).replace(/^\\//, \'\')}"'
);

tb = tb.replace(
  '.task-box { background-color: #f0fdf4; border: 1px solid #bbf7d0; padding: 10px; border-radius: 8px; margin-top: 10px; margin-bottom: 10px; width: 100%; page-break-inside: auto; box-sizing: border-box; }',
  '.task-box { background-color: #f0fdf4; border: 1px solid #bbf7d0; padding: 10px; border-radius: 8px; margin-top: 10px; margin-bottom: 10px; width: 100%; page-break-inside: avoid; box-sizing: border-box; }'
);

tb = tb.replace(
  'let pbBefore = isLong ? "page-break-before: always; margin-top: 30px;" : "margin-top: 15px;";',
  'let pbBefore = isLong ? "page-break-before: always; margin-top: 30px;" : "margin-top: 15px; page-break-inside: avoid;";'
);

tb = tb.replace(
  "lesson.tasks = originalTasks.filter(t => t.type !== 'gcse_exam_practice' && t.type !== 'exam_practice');",
  "lesson.tasks = originalTasks.filter(t => t.type !== 'gcse_exam_practice' && t.type !== 'exam_practice' && t.type !== 'drawing' && t.type !== 'draw');"
);

tb = tb.replace(
  '<strong>${"Exam Q" + (index + 1)}. ${_tInfo3.cleanText}</strong>',
  '<strong>${"Q" + (globalQNum++)}. ${_tInfo3.cleanText}</strong>'
);

fs.writeFileSync('generate_textbooks.js', tb);

let wb = fs.readFileSync('generate_pupil_workbooks.js', 'utf8');
wb = wb.replace(
  '<strong>${"Exam Q" + (index + 1)}. ${_tInfo3.cleanText}</strong>',
  '<strong>${"Q" + (globalQNum++)}. ${_tInfo3.cleanText}</strong>'
);
fs.writeFileSync('generate_pupil_workbooks.js', wb);

console.log('Patched JS generators!');
