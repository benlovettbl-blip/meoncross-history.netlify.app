const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../edexcel_medicine/data.js');
let dataContent = fs.readFileSync(dataPath, 'utf8');
const jsonContent = dataContent.replace('export const unitData = ', '').trim().replace(/;$/, '');
let unitData = JSON.parse(jsonContent);

let totalLessons = unitData.lessons.length;
let totalObjectives = 0;
let lessonsNeedingHinges = 0;

unitData.lessons.forEach(l => {
    let hasHinge = false;
    if (l.narrative_blocks) {
        l.narrative_blocks.forEach(b => {
            if (b.hinge_question) hasHinge = true;
        });
    }
    if (!hasHinge) {
        lessonsNeedingHinges++;
        if (l.teacher_notes && l.teacher_notes.objectives) {
            totalObjectives += l.teacher_notes.objectives.length;
        }
    }
});

console.log(`Total Lessons: ${totalLessons}`);
console.log(`Lessons needing hinges: ${lessonsNeedingHinges}`);
console.log(`Total objectives in those lessons: ${totalObjectives}`);
