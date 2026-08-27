const fs = require('fs');

function patchExamPractice() {
    const file = 'generate_pupil_workbooks.js';
    let content = fs.readFileSync(file, 'utf8');
    
    const oldCode = `let questionHtml = \`<div style="\${pbBefore} margin-bottom: 10px; padding-left: 15px; border-left: 4px solid #3b82f6;"><strong>\${ep.examQNum ? "Exam Q" + ep.examQNum : "Q" + (index + 1)}. \${formatText(rawQText)}</strong></div>\`;
            if (ep.marks) {
                let time = Math.round(ep.marks * 1.25);
                questionHtml += \`<div style="margin-top: 5px; margin-bottom: 15px; margin-left: 15px;"><span style="display: inline-block; background-color: #f1f5f9; border: 1px solid #cbd5e1; color: #334155; font-size: 10pt; padding: 2px 8px; border-radius: 12px; font-weight: normal; vertical-align: middle;">[\${ep.marks} marks &bull; \${time} mins]</span></div>\`;
            }`;

    const newCode = `let _tInfo = processTaskTextWithTariff(rawQText);
            let questionHtml = \`<div style="\${pbBefore} margin-bottom: 10px; padding-left: 15px; border-left: 4px solid #3b82f6;"><strong>\${ep.examQNum ? "Exam Q" + ep.examQNum : "Q" + (index + 1)}. \${_tInfo.cleanText}</strong></div>\`;
            if (_tInfo.badgeHtml) {
                // Add margin-left to align with the blue border
                questionHtml += _tInfo.badgeHtml.replace('<div style="margin-top: 5px; margin-bottom: 15px;">', '<div style="margin-top: 5px; margin-bottom: 15px; margin-left: 15px;">');
            } else if (ep.marks) {
                let time = Math.round(ep.marks * 1.25);
                questionHtml += \`<div style="margin-top: 5px; margin-bottom: 15px; margin-left: 15px;"><span style="display: inline-block; background-color: #f1f5f9; border: 1px solid #cbd5e1; color: #334155; font-size: 10pt; padding: 2px 8px; border-radius: 12px; font-weight: normal; vertical-align: middle;">[\${ep.marks} marks &bull; \${time} mins]</span></div>\`;
            }`;
            
    if (content.includes(oldCode)) {
        content = content.replace(oldCode, newCode);
        fs.writeFileSync(file, content, 'utf8');
        console.log("Patched exam_practice tariff logic!");
    } else {
        console.log("Could not find the target code in generate_pupil_workbooks.js.");
    }
}

patchExamPractice();
