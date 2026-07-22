const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../edexcel_medicine/data.js');
let dataContent = fs.readFileSync(dataPath, 'utf8');
const jsonContent = dataContent.replace('export const unitData = ', '').trim().replace(/;$/, '');
let unitData = JSON.parse(jsonContent);

let l = unitData.lessons.find(l => l.id === 'lesson_2_3');
console.log(typeof l.teacher_notes.objectives[1].question);
console.log(JSON.stringify(l.teacher_notes.objectives[1].question));
