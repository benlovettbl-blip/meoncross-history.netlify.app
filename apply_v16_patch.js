const fs = require('fs');

function patchAll() {
    const files = [
        'generate_pupil_workbooks.js',
        'generate_workbooks.js',
        'generate_textbooks.js',
        'src/data_parser.js'
    ];

    files.forEach(file => {
        if (!fs.existsSync(file)) return;
        let content = fs.readFileSync(file, 'utf8');
        let patched = false;

        // 1. Cloze blanks replace with border-bottom span
        if (content.includes(".replace(/_{3,}/g, '――――――')")) {
            content = content.replace(
                /\.replace\(\/_{3,}\/g,\s*'――――――'\)/g,
                ".replace(/_{3,}/g, '<span style=\"border-bottom: 1px solid black;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>')"
            );
            patched = true;
        }

        // 2. allExamTasksHtml missing badges (in generate_pupil_workbooks.js)
        if (file === 'generate_pupil_workbooks.js') {
            const oldSummaryLoop = `            if (epArray && epArray.length > 0) {
              epArray.forEach((ep, index) => {
                let marksStr = ep.marks ? \` (\${ep.marks} marks)\` : "";
                if (ep.question.includes("marks)")) marksStr = "";
                if (ep.question.toLowerCase().includes("explain why"))
                  marksStr = "";
                allExamTasksHtml += \`<div style="margin-top: 10px;"><strong>\${index + 1}. \${formatText(ep.question)}\${marksStr}</strong></div>\`;
              });
            }`;
            const newSummaryLoop = `            if (epArray && epArray.length > 0) {
              epArray.forEach((ep, index) => {
                let _tInfo = processTaskTextWithTariff(ep.question);
                allExamTasksHtml += \`<div style="margin-top: 10px;"><strong>\${index + 1}. \${_tInfo.cleanText}</strong></div>\`;
                if (_tInfo.badgeHtml) {
                    allExamTasksHtml += _tInfo.badgeHtml;
                }
              });
            }`;
            if (content.includes(oldSummaryLoop)) {
                content = content.replace(oldSummaryLoop, newSummaryLoop);
                patched = true;
            }

            // 3. lesson.extended missing badges
            const oldExtended = `html += \`<div style="margin-top: 15px;"><strong>\${lesson.extended.examQNum ? "Exam Q" + lesson.extended.examQNum + ". " : lesson.extended.qNum ? "Q" + lesson.extended.qNum + ". " : ""}\${formatText(lesson.extended.question)}</strong></div>\`;`;
            const newExtended = `let _extInfo = processTaskTextWithTariff(lesson.extended.question);
          html += \`<div style="margin-top: 15px;"><strong>\${lesson.extended.examQNum ? "Exam Q" + lesson.extended.examQNum + ". " : lesson.extended.qNum ? "Q" + lesson.extended.qNum + ". " : ""}\${_extInfo.cleanText}</strong></div>\`;
          if (_extInfo.badgeHtml) {
              html += _extInfo.badgeHtml;
          }`;
            if (content.includes(oldExtended)) {
                content = content.replace(oldExtended, newExtended);
                patched = true;
            }
        }

        if (patched) {
            fs.writeFileSync(file, content, 'utf8');
            console.log("Patched " + file);
        }
    });

    // 4. Fix data.js mislabeled Q7 in L2: Prevent and Treat Disease
    const dataFile = 'public/units/edexcel_medicine/data.js';
    if (fs.existsSync(dataFile)) {
        let dataContent = fs.readFileSync(dataFile, 'utf8');
        const oldQ = '"question": "\'In the years c1250-c1500, the physician was the most important person providing care and treatment.\' How far do you agree? Explain your answer. (16 marks + 4 marks for SPaG)"';
        const newQ = '"question": "\'In the years c1250-c1500, the physician was the most important person providing care and treatment.\' How far do you agree? Explain your answer. (16 marks + 4 marks for SPaG)",\n        "examQNum": 7';
        if (dataContent.includes(oldQ) && !dataContent.includes(newQ)) {
            dataContent = dataContent.replace(oldQ, newQ);
            fs.writeFileSync(dataFile, dataContent, 'utf8');
            console.log("Patched data.js mislabeled Q7");
        }
    }
}

patchAll();
