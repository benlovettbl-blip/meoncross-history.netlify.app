const fs = require('fs');

let content = fs.readFileSync('generate_workbooks.js', 'utf8');

// The logic in generate_workbooks.js is fine.
// I will just use the correct logic from it and paste it over the corrupted generate_textbooks.js!
// Actually, I'll just write a script that regex replaces the corrupted block in generate_textbooks.js with the good block.

let tb = fs.readFileSync('generate_textbooks.js', 'utf8');

// It's too corrupted to regex replace. Let's just find the whole block from "if (block.hinge_question) {" up to "if (lesson.narrative) {" and replace it.

let startIndex = tb.indexOf('          if (block.hinge_question) {');
let endIndex = tb.indexOf('    // Narrative\n    if (lesson.narrative) {');

let wb = fs.readFileSync('generate_workbooks.js', 'utf8');
let wbStart = wb.indexOf('          if (block.hinge_question) {');
let wbEnd = wb.indexOf('    // Extended Scholarship\n    if (lesson.extended && lesson.extended.paragraphs) {');
if (wbEnd === -1) wbEnd = wb.indexOf('    // Narrative\n    if (lesson.narrative) {');

let goodBlock = wb.substring(wbStart, wbEnd);

// In generate_textbooks.js, we don't want task lines (the empty divs).
// We'll replace `<div class="task-lines-large"></div>` with `` and `<div class="task-lines"></div>` with ``.
goodBlock = goodBlock.replace(/<div class="task-lines-large"><\/div>/g, '');
goodBlock = goodBlock.replace(/<div class="task-lines"><\/div>/g, '');
goodBlock = goodBlock.replace(/Q\$\{task\.qNum\}: \$\{task\.text \|\| task\.question\}<\/div>/g, '<span style="color: #ffffff; font-size: 4px;">[[SRC_MARKER:L${lessonIndex}_Task_${bIdx}_${tIdx}]]</span>Q${task.qNum}: ${task.text || task.question}</div>');
goodBlock = goodBlock.replace(/<strong>Q\$\{task\.qNum\}\. \$\{task\.text \|\| task\.question\}<\/strong><\/p>/g, '<span style="color: #ffffff; font-size: 4px;">[[SRC_MARKER:L${lessonIndex}_Task_${bIdx}_${tIdx}]]</span><strong>Q${task.qNum}. ${task.text || task.question}</strong></p>');

// Add the Extended Scholarship block back because it was inside the deleted area
let extScholarship = `
    // Extended Scholarship
    if (lesson.extended && lesson.extended.paragraphs) {
      html += \`<h3 style="margin-top: 40px; page-break-before: auto;">\${lesson.extended.title}</h3>\`;
      lesson.extended.paragraphs.forEach(para => {
        html += \`<p class="narrative-block" style="font-size: 12pt; color: #444;">\${formatText(para)}</p>\`;
      });
    }

`;

tb = tb.substring(0, startIndex) + goodBlock + extScholarship + tb.substring(endIndex);

fs.writeFileSync('generate_textbooks.js', tb, 'utf8');
console.log('Fixed generate_textbooks.js');
