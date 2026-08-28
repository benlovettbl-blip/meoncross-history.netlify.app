const fs = require('fs');

const textbookFile = 'generate_textbooks.js';
const workbookFile = 'generate_pupil_workbooks.js';

let tb = fs.readFileSync(textbookFile, 'utf8');
let wb = fs.readFileSync(workbookFile, 'utf8');

// 1. Remove the old globalQNum loops that we added previously
const tbOldLoop = tb.substring(tb.indexOf('    // Textbook/Workbook Chronological Order'), tb.indexOf('if (lesson.gcse_task) {', tb.indexOf('    // Textbook/Workbook Chronological Order')) + 185);
tb = tb.replace(tbOldLoop, '');
tb = tb.replace('let globalQNum = 1;', 'let renderQNum = 1;');

const wbOldLoop = wb.substring(wb.indexOf('    // Textbook/Workbook Chronological Order'), wb.indexOf('if (lesson.gcse_task) {', wb.indexOf('    // Textbook/Workbook Chronological Order')) + 185);
wb = wb.replace(wbOldLoop, '');
wb = wb.replace('let globalQNum = 1;', 'let renderQNum = 1;');

// 2. Fix the Cover (PDF Compiler Bug)
wb = wb.replace(
    /Scholar: \[____________________\] Class: \[________\]/,
    'Scholar: ......................... Class: ..........'
);

// 3. We will dynamically replace `qNum` usages with a getter-like approach OR inline assignment.
// Actually, since we removed the `globalQNum` assignments, all `.qNum` properties will be undefined!
// Let's create a helper function at the top of the periodLessons loop:
const helperFunc = `
    let renderQNum = 1;
    // Helper to get or assign qNum dynamically as it renders
    const getQNum = (obj) => {
        if (!obj) return '';
        if (obj.question && obj.question.includes('Sentence Starters')) return '';
        if (obj.text && obj.text.includes('Sentence Starters')) return '';
        if (!obj.qNum) obj.qNum = renderQNum++;
        return obj.qNum;
    };
`;

tb = tb.replace('let renderQNum = 1;', helperFunc);
wb = wb.replace('let renderQNum = 1;', helperFunc);

// Now, replace every instance of `foo.qNum` with `getQNum(foo)` when it's being interpolated!
// Textbook replacements:
tb = tb.replace(/lesson\.primary_source\.qNum/g, 'getQNum(lesson.primary_source)');
tb = tb.replace(/source\.qNum/g, 'getQNum(source)');
tb = tb.replace(/block\.source\.qNum/g, 'getQNum(block.source)');
tb = tb.replace(/block\.hinge_question\.qNum/g, 'getQNum(block.hinge_question)');
tb = tb.replace(/task\.qNum/g, 'getQNum(task)');
tb = tb.replace(/lesson\.pair_share\.qNum/g, 'getQNum(lesson.pair_share)');
tb = tb.replace(/lesson\.historians_corner\.qNum/g, 'getQNum(lesson.historians_corner)');
tb = tb.replace(/lesson\.extended\.qNum/g, 'getQNum(lesson.extended)');
tb = tb.replace(/lesson\.gcse_task\.qNum/g, 'getQNum(lesson.gcse_task)');
tb = tb.replace(/lesson\.do_now\.qNum/g, 'getQNum(lesson.do_now)');

// Workbook replacements:
wb = wb.replace(/lesson\.primary_source\.qNum/g, 'getQNum(lesson.primary_source)');
wb = wb.replace(/source\.qNum/g, 'getQNum(source)');
wb = wb.replace(/block\.source\.qNum/g, 'getQNum(block.source)');
wb = wb.replace(/block\.hinge_question\.qNum/g, 'getQNum(block.hinge_question)');
wb = wb.replace(/task\.qNum/g, 'getQNum(task)');
wb = wb.replace(/lesson\.pair_share\.qNum/g, 'getQNum(lesson.pair_share)');
wb = wb.replace(/lesson\.historians_corner\.qNum/g, 'getQNum(lesson.historians_corner)');
wb = wb.replace(/lesson\.extended\.qNum/g, 'getQNum(lesson.extended)');
wb = wb.replace(/lesson\.gcse_task\.qNum/g, 'getQNum(lesson.gcse_task)');
wb = wb.replace(/lesson\.do_now\.qNum/g, 'getQNum(lesson.do_now)');

// 4. Hardcode Lesson 5 Numbers for Assessment
// In generate_textbooks.js
tb = tb.replace(
    'let finalRenderedText = formatText(textToRender);',
    `let finalRenderedText = formatText(textToRender);
        if (finalRenderedText.includes('Write a narrative account analyzing')) {
             finalRenderedText = finalRenderedText.replace('Write a narrative account analyzing', '<strong>Q' + renderQNum++ + '.</strong> Write a narrative account analyzing');
        }
        if (finalRenderedText.includes('How useful are Sources A and B for an enquiry')) {
             finalRenderedText = finalRenderedText.replace('How useful are Sources A and B for an enquiry', '<strong>Q' + renderQNum++ + '.</strong> How useful are Sources A and B for an enquiry');
        }`
);

// In generate_pupil_workbooks.js
wb = wb.replace(
    'let finalRenderedText = formatText(textToRender);',
    `let finalRenderedText = formatText(textToRender);
        if (finalRenderedText.includes('Write a narrative account analyzing')) {
             finalRenderedText = finalRenderedText.replace('Write a narrative account analyzing', '<strong>Q' + renderQNum++ + '.</strong> Write a narrative account analyzing');
        }
        if (finalRenderedText.includes('How useful are Sources A and B for an enquiry')) {
             finalRenderedText = finalRenderedText.replace('How useful are Sources A and B for an enquiry', '<strong>Q' + renderQNum++ + '.</strong> How useful are Sources A and B for an enquiry');
        }`
);

// Clean up _firstQNum which causes ReferenceErrors if we don't define it
wb = wb.replace(/let _firstQNum = 9999;/g, '');
wb = wb.replace(/if \(block\.extended\.qNum && block\.extended\.qNum < _firstQNum\) _firstQNum = block\.extended\.qNum;/g, '');
wb = wb.replace(/if \(block\.hinge_question\.qNum && block\.hinge_question\.qNum < _firstQNum\) _firstQNum = block\.hinge_question\.qNum;/g, '');

fs.writeFileSync(textbookFile, tb, 'utf8');
fs.writeFileSync(workbookFile, wb, 'utf8');
console.log('V14 patch applied successfully.');
