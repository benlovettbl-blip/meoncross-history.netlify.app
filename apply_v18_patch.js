const fs = require('fs');

// 1. Indestructible Cloze Blanks
const fixCloze = (file) => {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/__________/g, '[ . . . . . . . . ]');
    // Also replace in src/data_parser.js if it exists
    if (file === 'src/data_parser.js') {
        content = content.replace(/\/_{3,}\/g,\s*'__________'/g, "/_{3,}/g, '[ . . . . . . . . ]'");
        content = content.replace(/\/_{3,}\/g,\s*"__________"/g, "/_{3,}/g, '[ . . . . . . . . ]'");
    }
    fs.writeFileSync(file, content);
};

['generate_pupil_workbooks.js', 'generate_workbooks.js', 'generate_textbooks.js', 'src/data_parser.js'].forEach(f => {
    if (fs.existsSync(f)) {
        fixCloze(f);
    }
});

// 2. Medieval Exam Q3 & Q6 (edexcel_medicine)
let pwContent = fs.readFileSync('generate_pupil_workbooks.js', 'utf8');
// Fix isExam regex
pwContent = pwContent.replace(
    /let isExam = text\.toLowerCase\(\)\.includes\('assessment'\) \|\| \/\\b\\d\+\\s\*marks\?\\b\/i\.test\(text\);/g,
    "let isExam = text.toLowerCase().includes('assessment') || /\\b\\d+\\s*marks?\\b/i.test(text) || text.toLowerCase().includes('explain why');"
);
// Fix checkAndAdd regex
pwContent = pwContent.replace(
    /if \(force \|\| obj\.marks \|\| \(qText && \/\\b\\d\+\\s\*marks\/i\.test\(qText\)\)\) \{/g,
    "if (force || obj.marks || (qText && /\\b\\d+\\s*marks/i.test(qText)) || (qText && qText.toLowerCase().includes('explain why'))) {"
);

// 3. Early Modern Cleanup

// Inject Cover Student Inputs
const injectCover = (content) => {
    return content.replace(
        /let heroHtml = heroImgSrc \? `<img src="\$\{heroImgSrc\}" style="max-height: 45vh; max-width: 100%; object-fit: contain; margin: 0 auto; display: block;">` : '';\s*if \(unitId === 'edexcel_medicine'\) \{/g,
        `let heroHtml = heroImgSrc ? \`<img src="\${heroImgSrc}" style="max-height: 45vh; max-width: 100%; object-fit: contain; margin: 0 auto; display: block;">\` : '';
    if (unitId === 'early_modern_world') {
        heroHtml += \`<div style="text-align: center; font-size: 13pt; margin-top: 15px;"><strong>Scholar:</strong> [ . . . . . . . . . . . . . . . . ] &nbsp;&nbsp;&nbsp;&nbsp; <strong>Class:</strong> [ . . . . . . . ]</div>\`;
    }
    if (unitId === 'edexcel_medicine') {`
    );
};

pwContent = injectCover(pwContent);

// Inject Remove Redundant Consolidations & Fix Out-of-Order Questions
const injectTasksLogic = (content) => {
    let injected = `
    if (lesson.exam_practice || lesson.extended) {
        if (lesson.tasks) {
            lesson.tasks = lesson.tasks.filter(t => {
                let txt = t.question || t.text || t.instruction || '';
                return !txt.toLowerCase().includes('lesson consolidation');
            });
        }
    }
    if (lesson.tasks) {
        lesson.tasks.sort((a, b) => {
            let txtA = a.question || a.text || a.instruction || '';
            let txtB = b.question || b.text || b.instruction || '';
            let matchA = txtA.match(/^Q(\\d+)/i);
            let matchB = txtB.match(/^Q(\\d+)/i);
            if (matchA && matchB) {
                return parseInt(matchA[1]) - parseInt(matchB[1]);
            }
            return 0;
        });
    }
    if (lesson.questions) {
        lesson.questions.sort((a, b) => {
            let txtA = a.question || a.text || '';
            let txtB = b.question || b.text || '';
            let matchA = txtA.match(/^Q(\\d+)/i);
            let matchB = txtB.match(/^Q(\\d+)/i);
            if (matchA && matchB) {
                return parseInt(matchA[1]) - parseInt(matchB[1]);
            }
            return 0;
        });
    }
    `;
    
    // In generate_pupil_workbooks.js and generate_workbooks.js, it's `unitData.lessons.forEach((lesson, lIdx) => {`
    return content.replace(
        /unitData\.lessons\.forEach\(\(lesson,\s*lIdx\)\s*=>\s*\{/g,
        `unitData.lessons.forEach((lesson, lIdx) => {${injected}`
    );
};

pwContent = injectTasksLogic(pwContent);
fs.writeFileSync('generate_pupil_workbooks.js', pwContent);

let wbContent = fs.readFileSync('generate_workbooks.js', 'utf8');
wbContent = injectCover(wbContent);
wbContent = injectTasksLogic(wbContent);
fs.writeFileSync('generate_workbooks.js', wbContent);

let tbContent = fs.readFileSync('generate_textbooks.js', 'utf8');
tbContent = injectCover(tbContent);
tbContent = injectTasksLogic(tbContent);
fs.writeFileSync('generate_textbooks.js', tbContent);

// 4. Update export_pdfs.js
let expContent = fs.readFileSync('export_pdfs.js', 'utf8');
expContent = expContent.split('_FINAL_V4.pdf').join('_FINAL_V5.pdf');
fs.writeFileSync('export_pdfs.js', expContent);

console.log("V18 Patch applied!");
