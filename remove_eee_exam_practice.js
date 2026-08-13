const fs = require('fs');

let file = 'eee/data.js';
let content = fs.readFileSync(file, 'utf8');
let dbText = content.replace('export const unitData = ', '').trim();
if (dbText.endsWith(';')) dbText = dbText.slice(0, -1);
let db = eval('(' + dbText + ')');

db.lessons.forEach((l) => {
    delete l.exam_practice;
});

let newContent = 'export const unitData = ' + JSON.stringify(db, null, 4) + ';\n';
fs.writeFileSync(file, newContent);
console.log("Successfully removed all exam_practice from eee/data.js");
