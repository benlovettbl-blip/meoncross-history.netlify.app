const fs = require('fs');

function applyFinalPatches() {
    let gpw = fs.readFileSync('generate_pupil_workbooks.js', 'utf8');

    // 1. Regex SPaG fix
    gpw = gpw.split('/\\(\\d+\\s*marks?\\)/i.test').join('/\\(\\d+\\s*marks/i.test');

    // 2. cloze blanks
    gpw = gpw.split(".replace(/_{3,}/g, '??????')").join(".replace(/_{3,}/g, '<span style=\"border-bottom: 1px solid black;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>')");
    gpw = gpw.split(".replace(/_{3,}/g, '—{6}')").join(".replace(/_{3,}/g, '<span style=\"border-bottom: 1px solid black;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>')");

    // 3. allExamTasksHtml missing extended
    const oldAllExamExtended = `          if (lesson.extended && lesson.extended.question) {\n            allExamTasksHtml += \`<div style="margin-bottom: 10px;"><strong>Q. \${formatText(lesson.extended.question)}</strong></div>\`;\n          }`;
    const newAllExamExtended = `          if (lesson.extended && lesson.extended.question) {
            let _tInfo = processTaskTextWithTariff(lesson.extended.question);
            allExamTasksHtml += \`<div style="margin-top: 10px;"><strong>\${lesson.extended.examQNum ? "Exam Q" + lesson.extended.examQNum : "Q" + (lesson.extended.qNum || "")}. \${_tInfo.cleanText}</strong></div>\`;
            if (_tInfo.badgeHtml) allExamTasksHtml += _tInfo.badgeHtml;
          }`;
    if (gpw.includes(oldAllExamExtended)) {
        gpw = gpw.split(oldAllExamExtended).join(newAllExamExtended);
        console.log("Patched allExamTasksHtml extended");
    } else {
        console.log("Failed to patch allExamTasksHtml extended");
    }

    // 4. allExamTasksHtml exam_practice missing badges
    const oldAllExamPractice = `                allExamTasksHtml += \`<div style="margin-top: 10px;"><strong>\${index + 1}. \${formatText(ep.question)}\${marksStr}</strong></div>\`;`;
    const newAllExamPractice = `                let _tInfo = processTaskTextWithTariff(ep.question);
                allExamTasksHtml += \`<div style="margin-top: 10px;"><strong>\${index + 1}. \${_tInfo.cleanText}</strong></div>\`;
                if (_tInfo.badgeHtml) allExamTasksHtml += _tInfo.badgeHtml;`;
    if (gpw.includes(oldAllExamPractice)) {
        gpw = gpw.split(oldAllExamPractice).join(newAllExamPractice);
        console.log("Patched allExamTasksHtml exam_practice");
    }

    // 5. lesson.extended missing badge in regular loop
    const oldExtended = `html += \`<div style="margin-top: 15px;"><strong>\${lesson.extended.examQNum ? "Exam Q" + lesson.extended.examQNum + ". " : lesson.extended.qNum ? "Q" + lesson.extended.qNum + ". " : ""}\${formatText(lesson.extended.question)}</strong></div>\`;`;
    const newExtended = `let _extInfo = processTaskTextWithTariff(lesson.extended.question);
          html += \`<div style="margin-top: 15px;"><strong>\${lesson.extended.examQNum ? "Exam Q" + lesson.extended.examQNum + ". " : lesson.extended.qNum ? "Q" + lesson.extended.qNum + ". " : ""}\${_extInfo.cleanText}</strong></div>\`;
          if (_extInfo.badgeHtml) {
              html += _extInfo.badgeHtml;
          }`;
    if (gpw.includes(oldExtended)) {
        gpw = gpw.split(oldExtended).join(newExtended);
        console.log("Patched lesson.extended regular loop");
    }

    // 6. Filter out floating text (content leak) - Hippocrates / Galen
    const oldFilter = `if (task.text && !task.type) {`;
    const newFilter = `if (task.text && !task.type && !task.caption && !task.name) {`;
    if (gpw.includes(oldFilter)) {
        gpw = gpw.split(oldFilter).join(newFilter);
        console.log("Patched content leak 1");
    }

    const oldFilter2 = `if (t.text && !t.type) {`;
    const newFilter2 = `if (t.text && !t.type && !t.caption && !t.name) {`;
    if (gpw.includes(oldFilter2)) {
        gpw = gpw.split(oldFilter2).join(newFilter2);
        console.log("Patched content leak 2");
    }

    // 7. Fix lesson.gcse_task.tasks
    const oldGcse = `allExamTasksHtml += \`<div style="margin-top: 10px;"><strong>Q\${task.qNum ? task.qNum + "." : ""} \${processTaskTextWithTariff(task.text || task.question || task.instruction || task.title || '')}</strong></div>\`;`;
    const newGcse = `let _tInfo = processTaskTextWithTariff(task.text || task.question || task.instruction || task.title || '');
                allExamTasksHtml += \`<div style="margin-top: 10px;"><strong>Q\${task.qNum ? task.qNum + "." : ""} \${_tInfo.cleanText}</strong></div>\`;
                if (_tInfo.badgeHtml) allExamTasksHtml += _tInfo.badgeHtml;`;
    if (gpw.includes(oldGcse)) {
        gpw = gpw.split(oldGcse).join(newGcse);
        console.log("Patched allExamTasksHtml gcse_task");
    }

    fs.writeFileSync('generate_pupil_workbooks.js', gpw, 'utf8');
    console.log("Patched generate_pupil_workbooks.js entirely");

    // 8. generate_workbooks.js and generate_textbooks.js cloze blanks
    const wbs = ['generate_workbooks.js', 'generate_textbooks.js'];
    wbs.forEach(wb => {
        if (!fs.existsSync(wb)) return;
        let content = fs.readFileSync(wb, 'utf8');
        content = content.split(".replace(/_{3,}/g, '??????')").join(".replace(/_{3,}/g, '<span style=\"border-bottom: 1px solid black;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>')");
        content = content.split(".replace(/_{3,}/g, '—{6}')").join(".replace(/_{3,}/g, '<span style=\"border-bottom: 1px solid black;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>')");
        fs.writeFileSync(wb, content, 'utf8');
        console.log("Patched cloze in " + wb);
    });

    // 9. Remove "examQNum": 7 from data.js
    const dataFile = 'public/units/edexcel_medicine/data.js';
    let dataContent = fs.readFileSync(dataFile, 'utf8');
    const wrongQ = '"question": "\'In the years c1250-c1500, the physician was the most important person providing care and treatment.\' How far do you agree? Explain your answer. (16 marks + 4 marks for SPaG)",\n        "examQNum": 7';
    const correctQ = '"question": "\'In the years c1250-c1500, the physician was the most important person providing care and treatment.\' How far do you agree? Explain your answer. (16 marks + 4 marks for SPaG)"';
    if (dataContent.includes(wrongQ)) {
        dataContent = dataContent.split(wrongQ).join(correctQ);
        fs.writeFileSync(dataFile, dataContent, 'utf8');
        console.log("Reverted examQNum: 7 in data.js");
    }

    // 10. Update export_pdfs.js to use _FINAL_V3.pdf
    const exportFile = 'export_pdfs.js';
    let exportContent = fs.readFileSync(exportFile, 'utf8');
    exportContent = exportContent.split('_FINAL_V2.pdf').join('_FINAL_V3.pdf');
    exportContent = exportContent.split('_FINAL.pdf').join('_FINAL_V3.pdf');
    fs.writeFileSync(exportFile, exportContent, 'utf8');
    console.log("Patched export_pdfs.js suffix");
}

applyFinalPatches();
