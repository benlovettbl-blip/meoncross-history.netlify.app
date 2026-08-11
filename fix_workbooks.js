const fs = require('fs');
const path = require('path');

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Fix checkAndAdd logic
    let newCheckAndAdd = `        function checkAndAdd(obj) {
            if (!obj) return;
            let qText = obj.question || obj.text || obj.topic || obj.stretch_question;
            if (qText && /\\(\\d+\\s*marks?\\)/i.test(qText)) {
                obj.examQNum = globalExamQNum++;
                l.allExamQs.push(obj);
            }
        }
        if (l.primary_source) checkAndAdd(l.primary_source);
        if (l.sources) l.sources.forEach(s => checkAndAdd(s));
        if (l.tasks) l.tasks.forEach(t => checkAndAdd(t));
        if (l.historians_corner) checkAndAdd(l.historians_corner);
        if (l.narrative_blocks) l.narrative_blocks.forEach(b => {
            if (b.tasks) b.tasks.forEach(t => checkAndAdd(t));
            if (b.hinge_question) checkAndAdd(b.hinge_question);
            if (b.extended) checkAndAdd(b.extended);
        });
        if (l.extended) checkAndAdd(l.extended);
        if (l.gcse_task) {
            checkAndAdd(l.gcse_task);
            if (l.gcse_task.tasks) l.gcse_task.tasks.forEach(t => checkAndAdd(t));
        }
        if (l.pair_share) checkAndAdd(l.pair_share);
        
        let epArray = l.exam_practice;
        if (l.exam_practice && !Array.isArray(l.exam_practice) && l.exam_practice.questions) {
            epArray = l.exam_practice.questions;
        }
        if (epArray && Array.isArray(epArray)) {
            epArray.forEach(ep => checkAndAdd(ep));
        }`;

    content = content.replace(/function checkAndAdd[\s\S]*?epArray\.forEach\(ep => checkAndAdd\(ep, 'question'\)\);\s*\}/, newCheckAndAdd);


    // 2. Fix the qText finding in exam practice: let qText = ep.question.toLowerCase();
    content = content.replace(/let qText = ep\.question\.toLowerCase\(\);/g, "let rawQ = ep.question || ep.text || ''; let qText = rawQ.toLowerCase();");
    
    content = content.replace(/let lines = 8;\s*if \(qText\.includes\("16 marks"\)\) lines = 30;\s*else if \(qText\.includes\("12 marks"\) \|\| qText\.includes\("Explain why"\)\) lines = 20;/g, 
        `let lines = 8;
            if (qText.includes("16 marks")) lines = 44;
            else if (qText.includes("12 marks") || qText.includes("explain why")) lines = 22;`);

    content = content.replace(/const renderQuestionItem = \(item\) => {[\s\S]*?let questionHtml = `<div style="margin-top: 15px; margin-bottom: 10px; padding-left: 15px; border-left: 4px solid #3b82f6;"><strong>\$\{index \+ 1\}\. \$\{formatText\(ep\.question\)\}\$\{marksStr\}<\/strong><\/div>`;/, 
    `const renderQuestionItem = (item) => {
            let ep = item.ep;
            let index = item.index;
            let rawQText = ep.question || ep.text || '';
            let marksStr = ep.marks ? \` (\${ep.marks} marks)\` : '';
            if (rawQText.includes('marks)')) marksStr = '';
            let isLong = rawQText.includes('12 marks') || rawQText.includes('16 marks');
            let pbBefore = isLong ? 'page-break-before: always; margin-top: 30px;' : 'margin-top: 15px;';
            let questionHtml = \`<div style="\${pbBefore} margin-bottom: 10px; padding-left: 15px; border-left: 4px solid #3b82f6;"><strong>\${ep.examQNum ? 'Exam Q'+ep.examQNum : 'Q'+(index+1)}. \${formatText(rawQText)}\${marksStr}</strong></div>\`;`);


    // Wrap in page-break-inside avoid if NOT long
    content = content.replace(/html \+= questionHtml \+ renderQuestionLines\(ep\.question\);/g,
        `let fullHtml = questionHtml + renderQuestionLines(rawQText);
            if (!isLong) {
                html += \`<div style="page-break-inside: avoid;">\${fullHtml}</div>\`;
            } else {
                html += fullHtml;
            }`);
            
    // Fix isSources check which used ep.question
    content = content.replace(/let isSources = ep\.question\.toLowerCase\(\)/g, "let isSources = rawQText.toLowerCase()");

    // 3. Fix Pair & Share Activity
    content = content.replace(/<div class="task-box" style="  ">/g, '<div class="task-box" style="page-break-inside: avoid;">');

    // 4. Update numbering in tracking grid
    content = content.replace(/let qText = ep\.question \|\| ep\.topic \|\| ep\.stretch_question;/g, "let qText = ep.question || ep.text || ep.topic || ep.stretch_question;");

    fs.writeFileSync(filePath, content, 'utf8');
}

processFile(path.join(__dirname, 'generate_workbooks.js'));
processFile(path.join(__dirname, 'generate_pupil_workbooks.js'));

console.log("Fixes applied.");
