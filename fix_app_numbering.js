const fs = require('fs');

function patchFile(filename, replacements) {
    if (!fs.existsSync(filename)) return;
    let code = fs.readFileSync(filename, 'utf8');
    let original = code;
    
    replacements.forEach(rep => {
        if (rep.target instanceof RegExp) {
            code = code.replace(rep.target, rep.replacement);
        } else if (code.includes(rep.target)) {
            code = code.replace(rep.target, rep.replacement);
        } else {
            console.log(`Warning: Target not found in ${filename}:`, rep.target.toString().substring(0, 50));
        }
    });

    if (code !== original) {
        fs.writeFileSync(filename, code);
        console.log(`Patched ${filename}`);
    } else {
        console.log(`No changes made to ${filename}`);
    }
}

// 1. Fix "Lesson 0"
const lessonNumberTarget = /lessonPrefix = \`Lesson \$\{parts\[1\]\}\`;/g;
const lessonNumberReplacement = `lessonPrefix = \`Lesson \$\{parseInt(parts[1]) + 1\}\`;`;

const lessonNumberSubTarget = /lessonPrefix = \`Lesson \$\{parts\.slice\(1\)\.join\('\.'\)\}\`;/g;
const lessonNumberSubReplacement = `lessonPrefix = \`Lesson \$\{parseInt(parts[1]) + 1\}.\$\{parts.slice(2).join('.')\}\`;`;

// 2. Strip "Task X:"
const qCardFuncTarget = /function addQuestionCard\(qNum, qText, modelAnswer, options = \{\}\) \{/;
const qCardFuncReplacement = `function addQuestionCard(qNum, qText, modelAnswer, options = {}) {
      if (qText && typeof qText === 'string') {
          qText = qText.replace(/^(Task|Question)\\s*\\d+:\\s*/i, '');
      }
`;

patchFile('src/core_app.js', [
    { target: lessonNumberTarget, replacement: lessonNumberReplacement },
    { target: lessonNumberSubTarget, replacement: lessonNumberSubReplacement },
    { target: qCardFuncTarget, replacement: qCardFuncReplacement }
]);

patchFile('original_core_app.js', [
    { target: lessonNumberTarget, replacement: lessonNumberReplacement },
    { target: lessonNumberSubTarget, replacement: lessonNumberSubReplacement },
    { target: qCardFuncTarget, replacement: qCardFuncReplacement }
]);

patchFile('live_app.js', [
    { target: lessonNumberTarget, replacement: lessonNumberReplacement },
    { target: lessonNumberSubTarget, replacement: lessonNumberSubReplacement }
]);

patchFile('fetched_app.js', [
    { target: lessonNumberTarget, replacement: lessonNumberReplacement },
    { target: lessonNumberSubTarget, replacement: lessonNumberSubReplacement }
]);

