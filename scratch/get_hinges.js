const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../edexcel_medicine/data.js');
let dataContent = fs.readFileSync(dataPath, 'utf8');
const jsonContent = dataContent.replace('export const unitData = ', '').trim().replace(/;$/, '');
let unitData = JSON.parse(jsonContent);

['lesson_2_3', 'lesson_3_2', 'lesson_3_3'].forEach(id => {
    let l = unitData.lessons.find(l => l.id === id);
    console.log(`\n--- ${id} ---`);
    if(l.teacher_notes && l.teacher_notes.objectives) {
        l.teacher_notes.objectives.forEach(obj => {
            console.log(obj.question);
        });
    }
});
