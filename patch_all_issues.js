const fs = require('fs');

// 1. Remove text from data.js
let dataJsPath = 'early_modern_world/data.js';
let dataStr = fs.readFileSync(dataJsPath, 'utf8');
dataStr = dataStr.replace(/"text":\s*"Let's review the connection between religion, exploration, and rivalry.",?/g, '');
fs.writeFileSync(dataJsPath, dataStr, 'utf8');

// 2. Patch generate_workbooks.js
let genWorkbooksPath = 'generate_workbooks.js';
let gwStr = fs.readFileSync(genWorkbooksPath, 'utf8');

// A. Title Page size and phrase
gwStr = gwStr.replace(
    /<h1 style="margin: 0 !important; font-size: 36pt; color: white; padding: 0;">\$\{periodTitle\}<\/h1>/g,
    '<h1 style="margin: 0 !important; font-size: 24pt; color: white; padding: 0;">${periodTitle}</h1>'
);

gwStr = gwStr.replace(
    /<p style="font-size:16pt; margin: 10px 0 0 0; font-family: 'Outfit', sans-serif; color: #cbd5e1;">Student Workbook<\/p>/g,
    `<p style="font-size:14pt; margin: 10px 0 0 0; font-family: 'Outfit', sans-serif; color: #cbd5e1;"><strong>Assessment Question:</strong> \${unitData.enquiry || 'Student Workbook'}</p>`
);

// B. Print CSS for background colors
// Look for @media print { * {
gwStr = gwStr.replace(
    /@media print \{ \* \{ /g,
    '@media print { body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; } * { '
);

// C. Lesson Heading Numbering
gwStr = gwStr.replace(
    /html \+= \`<h2 style="margin-bottom: 10px; page-break-before: always;">\$\{formatText\(lesson\.title\)\}<\/h2>\`;/g,
    'html += `<h2 style="margin-bottom: 10px; page-break-before: always;">L${lessonIndex + 1}: ${formatText(lesson.title)}</h2>`;'
);

// D. Lesson Reflection Question Numbering
// Fix Q${tIdx + 1} to use task.qNum
gwStr = gwStr.replace(
    /Q\$\{tIdx \+ 1\}\./g,
    'Q${task.qNum || (tIdx + 1)}.'
);

// E. Strip <details> for Side Quests and style heading
gwStr = gwStr.replace(
    /finalRenderedText = finalRenderedText\.replace\(\/<details\/gi, '<details open="true"'\);/g,
    `finalRenderedText = finalRenderedText.replace(/<details[^>]*>/gi, '<div class="side-quest-box" style="page-break-inside: avoid; border: 2px solid #8b5cf6; border-radius: 8px; padding: 15px; margin: 15px 0; background: #f5f3ff; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">');
        finalRenderedText = finalRenderedText.replace(/<\\/details>/gi, '</div>');
        finalRenderedText = finalRenderedText.replace(/<summary[^>]*>(.*?)<\\/summary>/gi, '<h3 style="color: #6d28d9; margin-top: 0; font-size: 14pt; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px dashed #c4b5fd; padding-bottom: 8px; display: flex; align-items: center; gap: 10px;">$1</h3>');`
);


fs.writeFileSync(genWorkbooksPath, gwStr, 'utf8');
console.log('Successfully patched files!');
