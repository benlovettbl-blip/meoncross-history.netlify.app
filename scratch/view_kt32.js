const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../edexcel_medicine/data.js');
let dataContent = fs.readFileSync(dataPath, 'utf8');
const jsonContent = dataContent.replace('export const unitData = ', '').trim().replace(/;$/, '');
let unitData = JSON.parse(jsonContent);

let l32 = unitData.lessons.find(l => l.id === 'lesson_3_2');
console.log("KT3.2 Blocks:");
l32.narrative_blocks.forEach((b, i) => {
    console.log(`Block ${i}:`);
    console.log(b.text.substring(0, 200));
    console.log("---");
});
