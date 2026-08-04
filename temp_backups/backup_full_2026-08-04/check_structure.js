const fs = require('fs');
let content = fs.readFileSync('edexcel_medicine/data.js', 'utf8');
content = content.replace(/import .*?;/g, '');
content = content.replace(/export default /g, '');
content = content.trim();
if (content.endsWith(';')) content = content.slice(0, -1);
let mock_exams = [];
let unit = eval('(' + content + ')');
let missingObj = 0;
let missingQ = 0;
for(let l of unit.lessons) {
    if(!l.teacher_notes || !l.teacher_notes.objectives || l.teacher_notes.objectives.length === 0) {
        missingObj++;
    } else {
        for(let obj of l.teacher_notes.objectives) {
             if(!obj.question) missingQ++;
        }
    }
}
console.log('Lessons missing objectives:', missingObj);
console.log('Objectives missing questions:', missingQ);
