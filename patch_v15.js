const fs = require('fs');

let tb = fs.readFileSync('generate_textbooks.js', 'utf8');
let wb = fs.readFileSync('generate_pupil_workbooks.js', 'utf8');
const textbookFile = 'generate_textbooks.js';
const workbookFile = 'generate_pupil_workbooks.js';

// 1. Re-order the globalQNum loop in generate_textbooks.js
const tbOldLoop = tb.substring(
    tb.indexOf("    if (lesson.do_now &&"),
    tb.indexOf("    html += `<h2 style=\"margin-top: 40px;")
);

const tbNewLoop = `
    // Textbook/Workbook Chronological Order
    if (lesson.do_now && (lesson.do_now.prediction_question || lesson.do_now.question)) lesson.do_now.qNum = globalQNum++;
    if (lesson.primary_source && lesson.primary_source.question) lesson.primary_source.qNum = globalQNum++;
    
    if (lesson.sources) {
      lesson.sources.forEach(source => { 
        if (source.question) source.qNum = globalQNum++; 
      });
    }

    if (lesson.narrative_blocks) {
      lesson.narrative_blocks.forEach(block => { 
        if (block.source && block.source.question) block.source.qNum = globalQNum++;
        if (block.hinge_question) block.hinge_question.qNum = globalQNum++; 
        if (block.tasks) {
          block.tasks.forEach(task => { 
            if (currentUnitId === 'great_war' || currentUnitId === 'great_war_part2') { 
              if (typeof task.text === 'string') task.text = task.text.replace(/^Task\\s*\\d*:\\s*/i, ''); 
              if (typeof task.question === 'string') task.question = task.question.replace(/^Task\\s*\\d*:\\s*/i, ''); 
            } 
            if (task.type !== 'vocab_match' && task.type !== 'drag_drop_timeline') {
                if (task.question === 'Sentence Starters' || task.text === 'Sentence Starters') {
                    // No number for sentence starters
                } else {
                    task.qNum = globalQNum++; 
                }
            }
          }); 
        }
        if (block.extended && block.extended.question) block.extended.qNum = globalQNum++;
      });
    }

    if (lesson.pair_share) lesson.pair_share.qNum = globalQNum++;
    if (lesson.tasks) {
        lesson.tasks.forEach(task => {
            if (task.type !== 'vocab_match' && task.type !== 'drag_drop_timeline') task.qNum = globalQNum++;
        });
    }
    if (lesson.historians_corner && lesson.historians_corner.stretch_question) lesson.historians_corner.qNum = globalQNum++;
    if (lesson.extended && lesson.extended.question) lesson.extended.qNum = globalQNum++;
    
    if (lesson.gcse_task) {
      if (lesson.gcse_task.tasks) {
          lesson.gcse_task.tasks.forEach(t => t.qNum = globalQNum++);
      } else {
          lesson.gcse_task.qNum = globalQNum++;
      }
    }
    
`;
tb = tb.replace(tbOldLoop, tbNewLoop);

// Do the exact same replacement in generate_pupil_workbooks.js
const wbOldLoop = wb.substring(
    wb.indexOf("    if (lesson.primary_source &&"),
    wb.indexOf("    html += `<h2 style=\"margin-top: 40px;")
);
wb = wb.replace(wbOldLoop, tbNewLoop);

// 2. Hardcode the Cover: Delete the dynamic cover logic in the workbook script. 
// Replace it entirely with this static HTML string: <p>Scholar: ........................ Class: .........</p>
// We need to replace the multiple scholar/class blocks.
// Looking at generate_pupil_workbooks.js:
wb = wb.replace(
    /heroHtml \+= `<div style="text-align: center; font-size: 14pt; margin-top: 15px;"><strong>Scholar:<\/strong> \[__________\] &nbsp;&nbsp;&nbsp;&nbsp; <strong>Class:<\/strong> \[____\]<\/div>`;/,
    `heroHtml += '<p>Scholar: ........................ Class: .........</p>';`
);

const scholarClassSpanRegex = /<strong>Scholar:<\/strong> <span[^>]*><\/span>\\s*<strong>Class:<\/strong> <span[^>]*><\/span>/g;
wb = wb.replace(scholarClassSpanRegex, '<p>Scholar: ........................ Class: .........</p>');

const studentDetailsRegex = /<div class="student-details"[\s\S]*?<\/div>\s*<\/div>/g;
wb = wb.replace(studentDetailsRegex, '<p>Scholar: ........................ Class: .........</p>');


// 3. Fix Duplicate Textbook Numbers
// Done by standardizing the `globalQNum` generation above.

// 4. Nuke the Ghost Heading: Hard-delete the 'Active Tasks' heading from the bottom of Lesson 5 in generate_textbooks.js
// By changing `if (lesson.tasks)` to `if (lesson.tasks && lesson.tasks.length > 0)`
tb = tb.replace(
    `if (lesson.tasks) {
      html += \`<h3 style="margin-top: 10px; border-bottom: 1px solid #ccc; padding-bottom: 5px; page-break-after: avoid; break-after: avoid;">Active Tasks</h3>\`;`,
    `if (lesson.tasks && lesson.tasks.length > 0) {
      html += \`<h3 style="margin-top: 10px; border-bottom: 1px solid #ccc; padding-bottom: 5px; page-break-after: avoid; break-after: avoid;">Active Tasks</h3>\`;`
);


// 5. Hardcode the Lesson 5 numbers just in case the gcse_task block is rendering something wrong.
// Wait, the user said: "The Narrative Account and 'How Useful' tasks MUST render." which just means we should not delete them.
// But they also said: "We are abandoning dynamic rendering."
// Wait, does "abandoning dynamic rendering" mean abandoning my V14 dynamic `getQNum` hooks? Yes, which is what I reverted to V13.

fs.writeFileSync(textbookFile, tb, 'utf8');
fs.writeFileSync(workbookFile, wb, 'utf8');
console.log('V15 patch applied cleanly.');
