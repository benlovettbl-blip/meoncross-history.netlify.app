const fs = require('fs');

const files = fs.readdirSync('.').filter(f => fs.statSync(f).isDirectory() && fs.existsSync(f + '/generate_worksheets.js'));

files.forEach(dir => {
    const p = dir + '/generate_worksheets.js';
    if (!fs.existsSync(p)) return;
    let code = fs.readFileSync(p, 'utf8');

    // 1. Fix tracker table missing exam_practice
    // We'll search for `l.gcse_task.tasks.forEach(t => addExamRow(t.text));\n    }` and inject if not present.
    if (!code.includes('if (l.exam_practice) {')) {
      code = code.replace(
        /l\.gcse_task\.tasks\.forEach\(t => addExamRow\(t\.text\)\);\s*}/g,
        `l.gcse_task.tasks.forEach(t => addExamRow(t.text));\n    }\n    if (l.exam_practice) {\n        l.exam_practice.forEach(ep => {\n            addExamRow(ep.question + (ep.marks ? \` (\${ep.marks} marks)\` : ''));\n        });\n    }`
      );
    }

    // 2. Adjust renderLines for 8 marks (14 -> 19) and add 2 marks
    if (!code.includes('text.includes("2 marks")')) {
      code = code.replace(
        /} else if \(text\.includes\("8 marks"\)\) \{\s*for\(let i=0; i<14; i\+\+\) \{ \/\/ ~half page/g,
        `} else if (text.includes("8 marks")) {\n            for(let i=0; i<19; i++) { // ~1/3 more space\n`
      );
      code = code.replace(
        /} else if \(text\.includes\("4 marks"\) \|\| text\.includes\("Explain one way"\)\) \{/g,
        `} else if (text.includes("2 marks")) {\n            for(let i=0; i<3; i++) {\n                html += \`<div class="task-lines-large"></div>\`;\n            }\n        } else if (text.includes("4 marks") || text.includes("Explain one way")) {`
      );
    }

    // 3. Add marks to exam_practice questions
    code = code.replace(
      /html \+= `<div style="margin-top: 15px;"><strong>Q\$\{ep\.qNum \|\| ''\}\. \$\{formatBold\(ep\.question\)\}<\/strong><\/div>`;/g,
      `let marksStr = ep.marks ? \` (\${ep.marks} marks)\` : '';
        if (ep.question.includes('marks)')) marksStr = '';
        html += \`<div style="margin-top: 15px;"><strong>Q\${ep.qNum || ''}. \${formatBold(ep.question)}\${marksStr}</strong></div>\`;`
    );

    fs.writeFileSync(p, code, 'utf8');
    console.log('Patched ' + p);
});
