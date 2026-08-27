const fs = require('fs');
let file = 'generate_pupil_workbooks.js';
let c = fs.readFileSync(file, 'utf8');

c = c.replace(/\r\n/g, '\n');

let findStr = `       else {
        html += \`<div style="page-break-inside: auto; margin-top: 30px; border-top: 2px solid #e2e8f0; padding-top: 20px;">\`;
        html += \`<h2 style="margin-top: 0; color: #1e3a8a;"><i class="fa-solid fa-pen-nib"></i> Lesson Consolidation</h2>\`;`;

let replaceStr = `       else {
        let skipConsolidation = lesson.gcse_task || lesson.exam_practice || (lesson.extended && lesson.extended.question);
        if (!skipConsolidation) {
          html += \`<div style="page-break-inside: auto; margin-top: 30px; border-top: 2px solid #e2e8f0; padding-top: 20px;">\`;
          html += \`<h2 style="margin-top: 0; color: #1e3a8a;"><i class="fa-solid fa-pen-nib"></i> Lesson Consolidation</h2>\`;`;

if (c.includes(findStr)) {
  c = c.replace(findStr, replaceStr);

  let findEndStr = `        for (let i = 0; i < 15; i++) {
          html += \`<div class="task-lines-large"></div>\`;
        }
        html += \`</div>\`;`;
        
  let replaceEndStr = `        for (let i = 0; i < 15; i++) {
          html += \`<div class="task-lines-large"></div>\`;
        }
        html += \`</div>\`;
        }`;
        
  if (c.includes(findEndStr)) {
    c = c.replace(findEndStr, replaceEndStr);
    fs.writeFileSync(file, c);
    console.log("Successfully patched Lesson Consolidation logic.");
  } else {
    console.log("Could not find end block.");
  }
} else {
  console.log("Could not find start block.");
}
