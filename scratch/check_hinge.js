const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../edexcel_medicine/data.js');
let dataContent = fs.readFileSync(dataPath, 'utf8');
const jsonContent = dataContent.replace('export const unitData = ', '').trim().replace(/;$/, '');
let unitData = JSON.parse(jsonContent);

let l11 = unitData.lessons.find(l => l.id === 'lesson_1_1');
console.log(JSON.stringify(l11.teacher_notes, null, 2));
