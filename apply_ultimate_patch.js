const fs = require('fs');

function applyUltimatePatch() {
    let gpw = fs.readFileSync('generate_pupil_workbooks.js', 'utf8');

    // 1. Replace processTaskTextWithTariff
    const oldFunc = `const processTaskTextWithTariff = (text) => {
    if (!text) return "";
    if (text.toLowerCase().includes('assessment') || /\\(?\\b\\d+\\s*marks?\\b\\)?/i.test(text)) {
        let marks = 8;
        let match = text.match(/\\(?\\[?\\b(\\d+)\\s*marks?\\b\\]?\\)?/i);
        if (match) {
            marks = parseInt(match[1]);
            // text = text.replace(match[0], '').trim();
        } else {
            if (text.toLowerCase().includes("narrative account")) marks = 8;
            else if (text.toLowerCase().includes("explain why")) marks = 12;
            else if (text.toLowerCase().includes("16 marks")) marks = 16;
        }
        let time = Math.round(marks * 1.25);
        if (marks === 4) time = 5;
        if (marks === 8) time = 10;
        if (marks === 12) time = 15;
        if (marks === 16) time = 20;
        
        return text + \` <span style="display: inline-block; background-color: #f1f5f9; border: 1px solid #cbd5e1; color: #334155; font-size: 10pt; padding: 2px 8px; border-radius: 12px; font-weight: normal; vertical-align: middle; margin-left: 10px;">[\${marks} marks &bull; \${time} mins]</span>\`;
    }
    return text;
};`;

    const newFunc = `const processTaskTextWithTariff = (text) => {
    if (!text) return { cleanText: "", badgeHtml: "" };
    
    let isExam = text.toLowerCase().includes('assessment') || /\\b\\d+\\s*marks?\\b/i.test(text);
    if (isExam) {
        let marks = 8;
        let time = 10;
        let spag = 0;
        
        let match = text.match(/\\(?\\s*\\b(\\d+)\\s*marks?(?:\\s*\\+\\s*(\\d+)\\s*marks?\\s*for\\s*SPaG)?\\s*\\)?/i);
        if (match) {
            marks = parseInt(match[1]);
            if (match[2]) {
                spag = parseInt(match[2]);
            }
        } else {
            if (text.toLowerCase().includes("narrative account")) marks = 8;
            else if (text.toLowerCase().includes("explain why")) marks = 12;
            else if (text.toLowerCase().includes("16 marks")) marks = 16;
        }

        if (marks === 4) time = 5;
        else if (marks === 8) time = 10;
        else if (marks === 12) time = 15;
        else if (marks === 16) time = 20;
        
        let totalMarks = marks + spag;
        
        let cleanText = text;
        if (match) {
            cleanText = text.replace(match[0], '').trim();
        }

        return {
            cleanText: formatText(cleanText),
            badgeHtml: \`<div style="margin-top: 5px; margin-bottom: 15px;"><span style="display: inline-block; background-color: #f1f5f9; border: 1px solid #cbd5e1; color: #334155; font-size: 10pt; padding: 2px 8px; border-radius: 12px; font-weight: normal; vertical-align: middle;">[\${totalMarks} marks &bull; \${time} mins]</span></div>\`
        };
    }
    
    return {
        cleanText: formatText(text),
        badgeHtml: ""
    };
};`;

    if (gpw.includes(oldFunc)) {
        gpw = gpw.split(oldFunc).join(newFunc);
        console.log("Patched processTaskTextWithTariff");
    } else {
        console.log("Failed to find processTaskTextWithTariff");
    }

    // 2. Regex SPaG fix in checkAndAdd
    gpw = gpw.split('/\\(\\d+\\s*marks?\\)/i.test').join('/\\(\\d+\\s*marks/i.test');

    // 3. cloze blanks
    gpw = gpw.split(".replace(/_{3,}/g, '??????')").join(".replace(/_{3,}/g, '<span style=\"border-bottom: 1px solid black;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>')");
    gpw = gpw.split(".replace(/_{3,}/g, '—{6}')").join(".replace(/_{3,}/g, '<span style=\"border-bottom: 1px solid black;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>')");

    // 4. Content Leak
    const oldFilter = `if (task.text && !task.type) {`;
    const newFilter = `if (task.text && !task.type && !task.caption && !task.name) {`;
    if (gpw.includes(oldFilter)) gpw = gpw.split(oldFilter).join(newFilter);

    const oldFilter2 = `if (t.text && !t.type) {`;
    const newFilter2 = `if (t.text && !t.type && !t.caption && !t.name) {`;
    if (gpw.includes(oldFilter2)) gpw = gpw.split(oldFilter2).join(newFilter2);

    // 5. Replace all usages of processTaskTextWithTariff() in HTML templates
    // First, let's fix the explicit ones we know about in allExamTasksHtml and exam_practice
    
    const regex = /html \+= `(.*?\$\{processTaskTextWithTariff\((.*?)\)\}.*?)`;/g;
    gpw = gpw.replace(regex, (match, templateStr, expr) => {
        let parts = templateStr.split('${processTaskTextWithTariff(' + expr + ')}');
        if (parts.length === 2) {
            return `let _t = processTaskTextWithTariff(${expr});\nhtml += \`${parts[0]}\${_t.cleanText}${parts[1]}\`;\nif (_t.badgeHtml) html += _t.badgeHtml;`;
        }
        return match;
    });

    const regex2 = /allExamTasksHtml \+= `(.*?\$\{processTaskTextWithTariff\((.*?)\)\}.*?)`;/g;
    gpw = gpw.replace(regex2, (match, templateStr, expr) => {
        let parts = templateStr.split('${processTaskTextWithTariff(' + expr + ')}');
        if (parts.length === 2) {
            return `let _t2 = processTaskTextWithTariff(${expr});\nallExamTasksHtml += \`${parts[0]}\${_t2.cleanText}${parts[1]}\`;\nif (_t2.badgeHtml) allExamTasksHtml += _t2.badgeHtml;`;
        }
        return match;
    });
    
    // allExamTasksHtml missing extended (the static one)
    const oldAllExamExtended = `          if (lesson.extended && lesson.extended.question) {\n            allExamTasksHtml += \`<div style="margin-bottom: 10px;"><strong>Q. \${formatText(lesson.extended.question)}</strong></div>\`;\n          }`;
    const newAllExamExtended = `          if (lesson.extended && lesson.extended.question) {
            let _tInfo = processTaskTextWithTariff(lesson.extended.question);
            allExamTasksHtml += \`<div style="margin-top: 10px;"><strong>\${lesson.extended.examQNum ? "Exam Q" + lesson.extended.examQNum : "Q" + (lesson.extended.qNum || "")}. \${_tInfo.cleanText}</strong></div>\`;
            if (_tInfo.badgeHtml) allExamTasksHtml += _tInfo.badgeHtml;
          }`;
    if (gpw.includes(oldAllExamExtended)) gpw = gpw.split(oldAllExamExtended).join(newAllExamExtended);

    // allExamTasksHtml exam_practice missing badges
    const oldAllExamPractice = `                allExamTasksHtml += \`<div style="margin-top: 10px;"><strong>\${index + 1}. \${formatText(ep.question)}\${marksStr}</strong></div>\`;`;
    const newAllExamPractice = `                let _tInfo2 = processTaskTextWithTariff(ep.question);
                allExamTasksHtml += \`<div style="margin-top: 10px;"><strong>\${index + 1}. \${_tInfo2.cleanText}</strong></div>\`;
                if (_tInfo2.badgeHtml) allExamTasksHtml += _tInfo2.badgeHtml;`;
    if (gpw.includes(oldAllExamPractice)) gpw = gpw.split(oldAllExamPractice).join(newAllExamPractice);

    // lesson.extended regular loop (static formatText)
    const oldExtended = `html += \`<div style="margin-top: 15px;"><strong>\${lesson.extended.examQNum ? "Exam Q" + lesson.extended.examQNum + ". " : lesson.extended.qNum ? "Q" + lesson.extended.qNum + ". " : ""}\${formatText(lesson.extended.question)}</strong></div>\`;`;
    const newExtended = `let _extInfo = processTaskTextWithTariff(lesson.extended.question);
          html += \`<div style="margin-top: 15px;"><strong>\${lesson.extended.examQNum ? "Exam Q" + lesson.extended.examQNum + ". " : lesson.extended.qNum ? "Q" + lesson.extended.qNum + ". " : ""}\${_extInfo.cleanText}</strong></div>\`;
          if (_extInfo.badgeHtml) {
              html += _extInfo.badgeHtml;
          }`;
    if (gpw.includes(oldExtended)) gpw = gpw.split(oldExtended).join(newExtended);

    // Finally, one more static formatText in exam_practice
    const oldEpStatic = `let questionHtml = \`<div style="\${pbBefore} margin-bottom: 10px; padding-left: 15px; border-left: 4px solid #3b82f6;"><strong>\${ep.examQNum ? "Exam Q" + ep.examQNum : "Q" + (index + 1)}. \${formatText(rawQText)}\${marksStr}</strong></div>\`;`;
    const newEpStatic = `let _tInfo3 = processTaskTextWithTariff(rawQText);
            let questionHtml = \`<div style="\${pbBefore} margin-bottom: 10px; padding-left: 15px; border-left: 4px solid #3b82f6;"><strong>\${ep.examQNum ? "Exam Q" + ep.examQNum : "Q" + (index + 1)}. \${_tInfo3.cleanText}</strong></div>\`;
            if (_tInfo3.badgeHtml) {
                questionHtml += _tInfo3.badgeHtml.replace('<div style="margin-top: 5px; margin-bottom: 15px;">', '<div style="margin-top: 5px; margin-bottom: 15px; margin-left: 15px;">');
            } else if (ep.marks) {
                // ... fallback handled by existing code
            }`;
    if (gpw.includes(oldEpStatic)) {
        // Just replace the declaration
        gpw = gpw.split(oldEpStatic).join(newEpStatic);
    }
    // Also remove the else if (ep.marks) conflict if it existed, actually let's just use string replace carefully
    // Wait, let's just do a manual replace for exam_practice loop.
    const oldEpLoop = `            let questionHtml = \`<div style="\${pbBefore} margin-bottom: 10px; padding-left: 15px; border-left: 4px solid #3b82f6;"><strong>\${ep.examQNum ? "Exam Q" + ep.examQNum : "Q" + (index + 1)}. \${formatText(rawQText)}\${marksStr}</strong></div>\`;
            if (ep.marks) {`;
    const newEpLoop = `            let _tInfo3 = processTaskTextWithTariff(rawQText);
            let questionHtml = \`<div style="\${pbBefore} margin-bottom: 10px; padding-left: 15px; border-left: 4px solid #3b82f6;"><strong>\${ep.examQNum ? "Exam Q" + ep.examQNum : "Q" + (index + 1)}. \${_tInfo3.cleanText}</strong></div>\`;
            if (_tInfo3.badgeHtml) {
                questionHtml += _tInfo3.badgeHtml.replace('<div style="margin-top: 5px; margin-bottom: 15px;">', '<div style="margin-top: 5px; margin-bottom: 15px; margin-left: 15px;">');
            } else if (ep.marks) {`;
    if (gpw.includes(oldEpLoop)) gpw = gpw.split(oldEpLoop).join(newEpLoop);


    fs.writeFileSync('generate_pupil_workbooks.js', gpw, 'utf8');
    console.log("Patched generate_pupil_workbooks.js entirely");

    // 6. generate_workbooks.js and generate_textbooks.js cloze blanks
    const wbs = ['generate_workbooks.js', 'generate_textbooks.js'];
    wbs.forEach(wb => {
        if (!fs.existsSync(wb)) return;
        let content = fs.readFileSync(wb, 'utf8');
        content = content.split(".replace(/_{3,}/g, '??????')").join(".replace(/_{3,}/g, '<span style=\"border-bottom: 1px solid black;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>')");
        content = content.split(".replace(/_{3,}/g, '—{6}')").join(".replace(/_{3,}/g, '<span style=\"border-bottom: 1px solid black;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>')");
        fs.writeFileSync(wb, content, 'utf8');
        console.log("Patched cloze in " + wb);
    });

    // 7. Remove "examQNum": 7 from data.js
    const dataFile = 'public/units/edexcel_medicine/data.js';
    let dataContent = fs.readFileSync(dataFile, 'utf8');
    const wrongQ = '"question": "\'In the years c1250-c1500, the physician was the most important person providing care and treatment.\' How far do you agree? Explain your answer. (16 marks + 4 marks for SPaG)",\n        "examQNum": 7';
    const correctQ = '"question": "\'In the years c1250-c1500, the physician was the most important person providing care and treatment.\' How far do you agree? Explain your answer. (16 marks + 4 marks for SPaG)"';
    if (dataContent.includes(wrongQ)) {
        dataContent = dataContent.split(wrongQ).join(correctQ);
        fs.writeFileSync(dataFile, dataContent, 'utf8');
        console.log("Reverted examQNum: 7 in data.js");
    }

    // 8. Update export_pdfs.js to use _FINAL_V3.pdf
    const exportFile = 'export_pdfs.js';
    let exportContent = fs.readFileSync(exportFile, 'utf8');
    exportContent = exportContent.split('_FINAL_V2.pdf').join('_FINAL_V3.pdf');
    exportContent = exportContent.split('_FINAL.pdf').join('_FINAL_V3.pdf');
    fs.writeFileSync(exportFile, exportContent, 'utf8');
    console.log("Patched export_pdfs.js suffix");
}

applyUltimatePatch();
