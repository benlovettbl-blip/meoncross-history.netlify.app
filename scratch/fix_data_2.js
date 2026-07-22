const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../edexcel_medicine/data.js');
let dataContent = fs.readFileSync(dataPath, 'utf8');
const jsonContent = dataContent.replace('export const unitData = ', '').trim().replace(/;$/, '');
let unitData = JSON.parse(jsonContent);

let l23 = unitData.lessons.find(l => l.id === 'lesson_2_3');
console.log("KT2.3 All Tasks in order:");
l23.narrative_blocks.forEach((b, i) => b.tasks.forEach(t => console.log(`  - ${t.text}`)));

let l33 = unitData.lessons.find(l => l.id === 'lesson_3_3');
console.log("\nKT3.3 All Tasks in order:");
l33.narrative_blocks.forEach((b, i) => b.tasks.forEach(t => console.log(`  - ${t.text}`)));

let l32 = unitData.lessons.find(l => l.id === 'lesson_3_2');
console.log("\nKT3.2 All Tasks in order:");
l32.narrative_blocks.forEach((b, i) => b.tasks.forEach(t => console.log(`  - ${t.text}`)));
