const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../edexcel_medicine/data.js');
let dataContent = fs.readFileSync(dataPath, 'utf8');
const jsonContent = dataContent.replace('export const unitData = ', '').trim().replace(/;$/, '');
let unitData = JSON.parse(jsonContent);

let changesMade = 0;

const mapping = {
    'lesson_2_3': { 0: 1, 1: 3 },
    'lesson_3_2': { 0: 0, 1: 1, 2: 3 },
    'lesson_3_3': { 0: 2, 1: 4 }
};

['lesson_2_3', 'lesson_3_2', 'lesson_3_3'].forEach(id => {
    let l = unitData.lessons.find(l => l.id === id);
    if(l && l.teacher_notes && l.teacher_notes.objectives) {
        l.teacher_notes.objectives.forEach((obj, index) => {
            if (obj.question && typeof obj.question === 'object') {
                let blockIndex = mapping[id][index];
                if (blockIndex !== undefined && l.narrative_blocks[blockIndex]) {
                    l.narrative_blocks[blockIndex].hinge_question = obj.question;
                    delete obj.question;
                    changesMade++;
                }
            }
        });
    }
});

const jsContent = `export const unitData = ${JSON.stringify(unitData, null, 2)};\n`;
fs.writeFileSync(dataPath, jsContent);
console.log(`Moved ${changesMade} hinge questions.`);
