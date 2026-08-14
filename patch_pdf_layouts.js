const fs = require('fs');

// 1. Fix generate_textbooks.js (remove page-break-before from h2)
let tb = fs.readFileSync('generate_textbooks.js', 'utf8');
tb = tb.replace(/page-break-before: always; page-break-after: auto;">L\$\{lessonIndex \+ 1\}/g, 'page-break-before: auto; page-break-after: auto;">L${lessonIndex + 1}');
// Also remove page-break-after: always from a4_maps in textbooks? The user didn't mention this, but it makes sense to not waste space. I'll leave it unless it causes issues.
fs.writeFileSync('generate_textbooks.js', tb, 'utf8');
console.log('Fixed generate_textbooks.js');

// 2. Fix generate_pupil_workbooks.js (make cover page fit)
let wb = fs.readFileSync('generate_pupil_workbooks.js', 'utf8');
// Reduce h1 margin
wb = wb.replace(/font-size: 42pt; margin-bottom: 20px;/g, 'font-size: 42pt; margin-bottom: 5px;');
// Reduce h2 margin
wb = wb.replace(/font-size: 20pt; margin-bottom: 40px;/g, 'font-size: 20pt; margin-bottom: 10px;');
// Reduce cover-page padding and min-height
wb = wb.replace(/padding: 40px; min-height: 90vh;/g, 'padding: 20px; min-height: auto;');
// Reduce margin above "Course Textbook & Textbook" box
wb = wb.replace(/margin-top: 15px; width: 100%; max-width: 700px; text-align: center; padding: 30px;/g, 'margin-top: 5px; width: 100%; max-width: 700px; text-align: center; padding: 15px;');
fs.writeFileSync('generate_pupil_workbooks.js', wb, 'utf8');
console.log('Fixed generate_pupil_workbooks.js');
