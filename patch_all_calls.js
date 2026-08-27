const fs = require('fs');

let gpw = fs.readFileSync('generate_pupil_workbooks.js', 'utf8');

const regex = /html \+= `(.*?\$\{processTaskTextWithTariff\((.*?)\)\}.*?)`;/g;

gpw = gpw.replace(regex, (match, templateStr, expr) => {
    // templateStr is something like: <h4 ...>Q${...} ${processTaskTextWithTariff(task.text)}</h4>
    // We want to extract the part before processTaskTextWithTariff, and the part after.
    
    let parts = templateStr.split('${processTaskTextWithTariff(' + expr + ')}');
    if (parts.length === 2) {
        return `let _t = processTaskTextWithTariff(${expr});\nhtml += \`${parts[0]}\${_t.cleanText}${parts[1]}\`;\nif (_t.badgeHtml) html += _t.badgeHtml;`;
    }
    return match;
});

// There is one exception, line 930:
// html += `<p style="margin-top:10px;"><strong>Q${task.qNum}. ${processTaskTextWithTariff(task.text || task.question)}</strong></p>`;
// My regex handles this too!

// Let's also check line 1480:
// html += `<div style="${pbBefore}"><strong>${task.examQNum ? "Exam Q" + task.examQNum + ". " : task.qNum ? "Q" + task.qNum + ". " : ""}${processTaskTextWithTariff(task.text || task.question || task.instruction || task.title || '')}</strong></div>`;
// My regex handles this too!

fs.writeFileSync('generate_pupil_workbooks.js', gpw, 'utf8');
console.log("Patched all processTaskTextWithTariff calls!");
