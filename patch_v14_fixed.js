const fs = require('fs');

const textbookFile = 'generate_textbooks.js';
const workbookFile = 'generate_pupil_workbooks.js';

let tb = fs.readFileSync(textbookFile, 'utf8');
let wb = fs.readFileSync(workbookFile, 'utf8');

// 1. Remove the old globalQNum loop
const tbOldLoop = tb.substring(
    tb.indexOf('    if (lesson.do_now && (lesson.do_now.prediction_question || lesson.do_now.question)) lesson.do_now.qNum = globalQNum++;'),
    tb.indexOf('    html += `<h2 style="margin-top: 40px')
);
tb = tb.replace(tbOldLoop, '');

const wbOldLoop = wb.substring(
    wb.indexOf('    if (lesson.primary_source && lesson.primary_source.question) lesson.primary_source.qNum = globalQNum++;'),
    wb.indexOf('    html += `<h2 style="margin-top: 40px')
);
wb = wb.replace(wbOldLoop, '');

const helperFunc = `
    let renderQNum = 1;
    const getQNum = (obj) => {
        if (!obj) return '';
        if (obj.question && obj.question.includes('Sentence Starters')) return '';
        if (obj.text && obj.text.includes('Sentence Starters')) return '';
        if (!obj.qNum) obj.qNum = renderQNum++;
        return obj.qNum;
    };
`;

tb = tb.replace('let globalQNum = 1;', helperFunc);
wb = wb.replace('let globalQNum = 1;', helperFunc);

// 2. Fix Cover String
wb = wb.replace(
    /Scholar: \[__________\] and Class: \[____\]/,
    'Scholar: ......................... Class: ..........'
);
wb = wb.replace(
    /Scholar: \[____________________\] Class: \[________\]/,
    'Scholar: ......................... Class: ..........'
);

// 3. Replace static `qNum` usages with dynamic `getQNum`
const replaceQNums = (content) => {
    let str = content;
    str = str.replace(/lesson\.primary_source\.qNum/g, 'getQNum(lesson.primary_source)');
    str = str.replace(/source\.qNum/g, 'getQNum(source)');
    str = str.replace(/block\.source\.qNum/g, 'getQNum(block.source)');
    str = str.replace(/block\.hinge_question\.qNum/g, 'getQNum(block.hinge_question)');
    str = str.replace(/task\.qNum/g, 'getQNum(task)');
    str = str.replace(/lesson\.pair_share\.qNum/g, 'getQNum(lesson.pair_share)');
    str = str.replace(/lesson\.historians_corner\.qNum/g, 'getQNum(lesson.historians_corner)');
    str = str.replace(/lesson\.extended\.qNum/g, 'getQNum(lesson.extended)');
    str = str.replace(/lesson\.gcse_task\.qNum/g, 'getQNum(lesson.gcse_task)');
    str = str.replace(/lesson\.do_now\.qNum/g, 'getQNum(lesson.do_now)');
    
    // Fix any previous patch artifacts if they exist
    str = str.replace(/block\.getQNum\(source\)/g, 'getQNum(block.source)');
    str = str.replace(/lesson\.gcse_getQNum\(task\)/g, 'getQNum(lesson.gcse_task)');
    
    return str;
};

tb = replaceQNums(tb);
wb = replaceQNums(wb);

// 4. Hardcode Lesson 5 Numbers
// Actually, since we know they are in `finalRenderedText`, let's just do that replacement right before html is appended in narrative blocks!
const l5Hook = `let finalRenderedText = formatText(textToRender);
        if (finalRenderedText.includes('Write a narrative account analyzing')) {
             finalRenderedText = finalRenderedText.replace('Write a narrative account analyzing', '<strong>Q' + renderQNum++ + '.</strong> Write a narrative account analyzing');
        }
        if (finalRenderedText.includes('How useful are Sources A and B for an enquiry')) {
             finalRenderedText = finalRenderedText.replace('How useful are Sources A and B for an enquiry', '<strong>Q' + renderQNum++ + '.</strong> How useful are Sources A and B for an enquiry');
        }`;

tb = tb.replace('let finalRenderedText = formatText(textToRender);', l5Hook);
wb = wb.replace('let finalRenderedText = formatText(textToRender);', l5Hook);

// Clean up _firstQNum
wb = wb.replace(/let _firstQNum = 9999;/g, '');
wb = wb.replace(/if \(block\.extended\.qNum && block\.extended\.qNum < _firstQNum\) _firstQNum = block\.extended\.qNum;/g, '');
wb = wb.replace(/if \(block\.hinge_question\.qNum && block\.hinge_question\.qNum < _firstQNum\) _firstQNum = block\.hinge_question\.qNum;/g, '');

fs.writeFileSync(textbookFile, tb, 'utf8');
fs.writeFileSync(workbookFile, wb, 'utf8');
console.log('V14 patch applied cleanly.');
