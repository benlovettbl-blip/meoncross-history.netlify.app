const fs = require('fs');
// read the actual exported data
const code = fs.readFileSync('public/units/cme_new/data.js', 'utf8');

// evaluate the object
let jsonStr = code.replace(/import .*?;\n/g, '').replace(/export const unitData = /g, '').trim();
if (jsonStr.endsWith(';')) jsonStr = jsonStr.slice(0, -1);
let unit = eval('(' + jsonStr + ')');

unit.lessons.forEach(l => {
    let qCount = 0;
    if (l.quiz) qCount += l.quiz.length;
    if (l.do_now && l.do_now.type === 'questions') qCount += l.do_now.items.length;
    console.log(l.title + ': ' + qCount + ' questions');
});
