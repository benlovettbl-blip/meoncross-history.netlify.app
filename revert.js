const fs = require('fs');
let wb = fs.readFileSync('generate_pupil_workbooks.js', 'utf8');

// 1. Remove the injected newLogic block
let startIdx = wb.indexOf('let isGCSE = unitId === "weimar_nazi_germany" || unitId === "cme_new";');
let elseIdx = wb.indexOf('} else {', startIdx);
let hasQuestionsIdx = wb.indexOf('const hasQuestions = lesson.sources.some((s) => s.question);', elseIdx);

if (startIdx !== -1 && hasQuestionsIdx !== -1) {
    let originalLogicStart = '      let isGCSE = unitId === "weimar_nazi_germany" || unitId === "cme_new";\n      if (lesson.sources && lesson.sources.length > 0 && !isGCSE) {\n        const hasQuestions = lesson.sources.some((s) => s.question);';
    wb = wb.substring(0, startIdx) + originalLogicStart + wb.substring(hasQuestionsIdx + 60);
    console.log('Removed newLogic block');
} else {
    console.log('Could not find newLogic block');
}

// 2. Remove } // end currentUnitId check
let endCheck = '    } // end currentUnitId check\n';
if (wb.includes(endCheck)) {
    wb = wb.replace(endCheck, '');
    console.log('Removed end check');
} else {
    let endCheck2 = '    } // end currentUnitId check';
    wb = wb.replace(endCheck2, '');
    console.log('Removed end check (no newline)');
}

// 3. Revert cover CSS
wb = wb.replace(/top: 60px;/g, 'top: 80px;');
wb = wb.replace(/font-size: 40px; color: white;/g, 'font-size: 48px; color: white;');
console.log('Reverted cover CSS');

// 4. Revert do_now check
wb = wb.replace("if (lesson.do_now && currentUnitId !== 'great_war') {", "if (lesson.do_now) {");
console.log('Reverted do_now check');

fs.writeFileSync('generate_pupil_workbooks_reverted.js', wb);
console.log('Saved to generate_pupil_workbooks_reverted.js');
