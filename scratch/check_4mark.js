const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../edexcel_medicine/data.js');
let dataContent = fs.readFileSync(dataPath, 'utf8');
const jsonContent = dataContent.replace('export const unitData = ', '').trim().replace(/;$/, '');
let unitData = JSON.parse(jsonContent);

let westernFrontLessons = unitData.lessons.filter(l => l.id.startsWith('lesson_5_'));
westernFrontLessons.forEach(l => {
    console.log(`Lesson: ${l.id}`);
    if (l.gcse_task && l.gcse_task.follow_up) {
        console.log(`  Follow Up Question: ${l.gcse_task.follow_up.question}`);
        console.log(`  Detail: ${l.gcse_task.follow_up.model_detail}`);
    } else {
        console.log(`  NO FOLLOW UP QUESTION FOUND.`);
    }
});
