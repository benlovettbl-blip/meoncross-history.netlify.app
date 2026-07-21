const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../edexcel_medicine/data.js');
let dataContent = fs.readFileSync(dataPath, 'utf8');
const jsonContent = dataContent.replace('export const unitData = ', '').trim().replace(/;$/, '');
let unitData = JSON.parse(jsonContent);

['lesson_2_3', 'lesson_3_2', 'lesson_3_3'].forEach(id => {
    let l = unitData.lessons.find(l => l.id === id);
    console.log(`\n--- ${id} ---`);
    l.narrative_blocks.forEach((b, i) => {
        console.log(`Block ${i}: ${b.text.substring(0, 50)}...`);
    });
});
