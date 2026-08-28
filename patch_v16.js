const fs = require('fs');

let tb = fs.readFileSync('generate_textbooks.js', 'utf8');
let wb = fs.readFileSync('generate_pupil_workbooks.js', 'utf8');

// 1. Isolate and Annihilate Australia's Numbering
// We replace the exact instances of Q${...}
const replaceQ = (str) => {
    // Replace standard Q${task.qNum}
    str = str.replace(/Q\$\{([a-zA-Z0-9_\.]+)\}/g, "\\${currentUnitId === 'australia' ? '&#8226;' : 'Q' + $1}");
    
    // Replace Q${task.qNum || ""}
    str = str.replace(/Q\$\{([a-zA-Z0-9_\.]+)\s*\|\|\s*""\}/g, "\\${currentUnitId === 'australia' ? '&#8226;' : 'Q' + ($1 || '')}");
    
    // Replace Q${task.qNum || (tIdx + 1)}
    str = str.replace(/Q\$\{([a-zA-Z0-9_\.]+)\s*\|\|\s*\([^\)]+\)\}/g, "\\${currentUnitId === 'australia' ? '&#8226;' : 'Q' + ($1 || '')}");
    
    // Replace Q${source.qNum ? source.qNum + '.' : ''}
    str = str.replace(/Q\$\{([^:]+)\s*\?\s*([^:]+)\s*:\s*''\}/g, "\\${currentUnitId === 'australia' ? ($1 ? '&#8226; ' : '') : ($1 ? 'Q' + $2 : '')}");
    return str;
};

tb = replaceQ(tb);
wb = replaceQ(wb);

// 2. Restore the Workbook Loop
// Revert the flatQuestions logic in workbook back to normal tasks loop for Australia.
// Actually, earlier in V14, wait, V13 did NOT have `flatQuestions` logic?
// Wait, the user said "Your previous flatQuestions logic broke the workbook and deleted the tasks."
// Look at `generate_pupil_workbooks.js` around line 1914:
// `flatQuestions.forEach(q => html += q.html);`
// Ah, `flatQuestions` IS in V13! 
// Let's replace the `flatQuestions` logic with a standard loop for tasks.
// Wait, where is `flatQuestions` defined in `generate_pupil_workbooks.js`?
const flatQuestionsBlock = wb.substring(
    wb.indexOf('let flatQuestions = [];'),
    wb.indexOf('flatQuestions.forEach(q => html += q.html);') + 43
);

// If the user just wants tasks to render sequentially, maybe I can just delete `flatQuestions.sort(...)`?
// Let's just do:
wb = wb.replace(
    /flatQuestions\.sort\(\(a,b\) => a\.qNum - b\.qNum\);/g,
    `if (currentUnitId !== 'australia') { flatQuestions.sort((a,b) => a.qNum - b.qNum); }`
);


// 3. Hardcode the Cover
// Replace the broken cover HTML in generate_pupil_workbooks.js with exactly this literal string: <p>Scholar: [____________________] Class: [________]</p>
const scholarClassSpanRegex = /<strong>Scholar:<\/strong> <span[^>]*><\/span>\\s*<strong>Class:<\/strong> <span[^>]*><\/span>/g;
wb = wb.replace(scholarClassSpanRegex, '<p>Scholar: [____________________] Class: [________]</p>');

const studentDetailsRegex = /<div class="student-details"[\s\S]*?<\/div>\s*<\/div>/g;
wb = wb.replace(studentDetailsRegex, '<p>Scholar: [____________________] Class: [________]</p>');

// And the one at line 417
wb = wb.replace(
    /<div style="text-align: center; font-size: 14pt; margin-top: 15px;"><strong>Scholar:<\/strong> \[__________\] &nbsp;&nbsp;&nbsp;&nbsp; <strong>Class:<\/strong> \[____\]<\/div>/g,
    '<div style="text-align: center; font-size: 14pt; margin-top: 15px;"><p>Scholar: [____________________] Class: [________]</p></div>'
);
wb = wb.replace(
    /<p>Scholar: \.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\. Class: \.\.\.\.\.\.\.\.\.<\/p>/g,
    '<p>Scholar: [____________________] Class: [________]</p>'
);


// 4. Remove Ghost Heading: Ensure the 'Active Tasks' heading does not render if there are no standard questions (like at the end of Lesson 5).
tb = tb.replace(
    /if \(lesson\.tasks\) \{([\s\S]*?)<h3 style="margin-top: 10px; border-bottom: 1px solid #ccc; padding-bottom: 5px; page-break-after: avoid; break-after: avoid;">Active Tasks<\/h3>/g,
    `if (lesson.tasks && lesson.tasks.length > 0) {$1<h3 style="margin-top: 10px; border-bottom: 1px solid #ccc; padding-bottom: 5px; page-break-after: avoid; break-after: avoid;">Active Tasks</h3>`
);


fs.writeFileSync('generate_textbooks.js', tb, 'utf8');
fs.writeFileSync('generate_pupil_workbooks.js', wb, 'utf8');
console.log('V16 patch applied cleanly.');
