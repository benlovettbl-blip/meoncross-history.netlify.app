const fs = require('fs');

const file = 'generate_pupil_workbooks.js';
let content = fs.readFileSync(file, 'utf8');

const regex1 = /function checkAndAdd\(obj, force = false\) {[\s\S]*?obj\.examQNum = globalExamQNum\+\+;\s*\}/;

const replacement = `function checkAndAdd(obj, force = false) {
      if (!obj) return;
      let qText = obj.question || obj.text || obj.topic || obj.stretch_question;
      if (force || obj.marks || (qText && /\\b\\d+\\s*marks/i.test(qText))) {
        if (!obj.examQNum) {
            obj.examQNum = globalExamQNum++;
        }
      }
    }`;

content = content.replace(regex1, replacement);
fs.writeFileSync(file, content, 'utf8');
console.log("Patched checkAndAdd reliably via Node regex");
