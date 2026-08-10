const fs = require('fs');

let wb = fs.readFileSync('generate_workbooks.js', 'utf8');

// The differences between generate_textbooks.js and generate_workbooks.js:
// 1. Output file is textbook.html and textbook.pdf
wb = wb.replace(/workbook\.html/g, 'textbook.html');
wb = wb.replace(/workbook\.pdf/g, 'textbook.pdf');
wb = wb.replace(/Processing workbooks for unit/g, 'Processing textbooks for unit');

// 2. No writing lines
wb = wb.replace(/<div class="task-lines"><\/div>/g, '');
wb = wb.replace(/<div class="task-lines-large"><\/div>/g, '');
wb = wb.replace(/<div class="draw-task">/g, '<div class="draw-task" style="display:none;">'); // hide draw tasks in textbook maybe? Wait, no, they just shouldn't have empty space.

// 3. We want SRC_MARKER added to the tasks in narrative blocks
wb = wb.replace(/Q\$\{task\.qNum\}: \$\{task\.text \|\| task\.question\}<\/div>/g, '<span style="color: #ffffff; font-size: 4px;">[[SRC_MARKER:L${lessonIndex}_Task_${bIdx}_${tIdx}]]</span>Q${task.qNum}: ${task.text || task.question}</div>');
wb = wb.replace(/<strong>Q\$\{task\.qNum\}\. \$\{task\.text \|\| task\.question\}<\/strong><\/p>/g, '<span style="color: #ffffff; font-size: 4px;">[[SRC_MARKER:L${lessonIndex}_Task_${bIdx}_${tIdx}]]</span><strong>Q${task.qNum}. ${task.text || task.question}</strong></p>');

// 4. We want SRC_MARKER for standard sources (Wait, this is already in generate_workbooks.js? Let's check. Yes, generate_workbooks.js DOES NOT have SRC_MARKER! Ah! generate_textbooks.js DOES!)
// In generate_workbooks.js: `<img src="`
// In generate_textbooks.js: `<span style="color: #ffffff; font-size: 4px;">[[SRC_MARKER:L${lessonIndex}_Source_${sIdx}]]</span>`
wb = wb.replace(/<div class="source-container" style="">/g, '<div class="source-container" style="">\n              <span style="color: #ffffff; font-size: 4px;">[[SRC_MARKER:L${lessonIndex}_Source_${sIdx}]]</span>');
wb = wb.replace(/<h2 style="font-size: 16pt; margin-bottom: 5px; color: #1e293b;">/g, '<h2 style="font-size: 16pt; margin-bottom: 5px; color: #1e293b;">\n        <span style="color: #ffffff; font-size: 4px;">[[SRC_MARKER:L${lessonIndex}_Start]]</span>');

fs.writeFileSync('generate_textbooks.js', wb, 'utf8');
console.log('Rebuilt generate_textbooks.js');
