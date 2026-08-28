const fs = require('fs');

// Fix 1: generate_pupil_workbooks.js (Remove duplicate Scholar/Class fields)
let pup = fs.readFileSync('generate_pupil_workbooks.js', 'utf8');

// Replace lines 416-418 to remove unit condition
pup = pup.replace(
    /if \(unitId === 'early_modern_world'\) \{\r?\n\s*heroHtml \+= \`<div style="text-align: center; font-size: 14pt; margin-top: 15px;"><strong>Scholar:<\/strong> \[__________\] &nbsp;&nbsp;&nbsp;&nbsp; <strong>Class:<\/strong> \[____\]<\/div>\`;\r?\n\s*\}/,
    'heroHtml += `<div style="text-align: center; font-size: 14pt; margin-top: 15px; color: #1e293b;"><strong>Scholar:</strong> [__________] &nbsp;&nbsp;&nbsp;&nbsp; <strong>Class:</strong> [____]</div>`;'
);
// Remove lines 441-443
pup = pup.replace(
    /<strong>Scholar:<\/strong> <span style="display: inline-block; width: 200px; border-bottom: 1px solid #94a3b8; margin-right: 20px;"><\/span>\r?\n\s*<strong>Class:<\/strong> <span style="display: inline-block; width: 80px; border-bottom: 1px solid #94a3b8;"><\/span>/,
    ''
);

// Fix 2 & 3: Pupil Workbooks source analysis Qs and Assessment Rendering
pup = pup.replace(
    /Q\$\{source\.qNum \? source\.qNum \+ "\." : ""\}/g,
    '${source.qNum ? "Q" + source.qNum + ". " : ""}'
);
pup = pup.replace(
    /Q\$\{block\.source\.qNum \? block\.source\.qNum \+ "\. " : ""\}/g,
    '${block.source.qNum ? "Q" + block.source.qNum + ". " : ""}'
);

// For Pupil Workbooks Narrative blocks Assessment rendering
pup = pup.replace(
    /if \(finalRenderedText\.trim\(\) !== ""\) \{\r?\n\s*\/\/ Narrative text removed for Pupil Workbook\r?\n\s*\}/,
    `if (finalRenderedText.trim() !== "") {
              if (block.theme_heading && block.theme_heading.toLowerCase().includes('assessment')) {
                _nbHtml += \`<div class="task-box" style="margin-bottom: 20px;">\`;
                _nbHtml += \`<h3 style="color: #1e3a8a; margin-top: 0;">\${block.theme_heading}</h3>\`;
                _nbHtml += \`<div style="font-weight: 600; margin-bottom: 15px;">\${finalRenderedText}</div>\`;
                _nbHtml += \`<div style="min-height: 200px;">\`;
                const lineCount = 18;
                for (let i = 0; i < lineCount; i++) {
                  _nbHtml += \`<div class="task-lines-large"></div>\`;
                }
                _nbHtml += \`</div></div>\`;
              }
            }`
);

fs.writeFileSync('generate_pupil_workbooks.js', pup, 'utf8');


// Fix 4: generate_textbooks.js source numbering & empty Active Tasks
let txt = fs.readFileSync('generate_textbooks.js', 'utf8');
txt = txt.replace(
    /Q\$\{block\.source\.qNum \? block\.source\.qNum \+ '\.' : ''\}/g,
    '${block.source.qNum ? "Q" + block.source.qNum + ". " : ""}'
);
txt = txt.replace(
    /Q\$\{source\.qNum \? source\.qNum \+ '\.' : ''\}/g,
    '${source.qNum ? "Q" + source.qNum + ". " : ""}'
);
txt = txt.replace(
    /if \(lesson\.tasks\) \{/,
    'if (lesson.tasks && lesson.tasks.length > 0) {'
);

fs.writeFileSync('generate_textbooks.js', txt, 'utf8');
console.log('Done!');
