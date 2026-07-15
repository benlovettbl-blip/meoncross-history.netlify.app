const fs = require('fs');

const publicPath = './public/data/water_and_sanitation.json';
const srcPath = 'water_and_sanitation/data.js';

let jsonData = JSON.parse(fs.readFileSync(publicPath, 'utf8'));

// Handle {"data": {...}} wrapper if it exists
let unitData = jsonData.data ? jsonData.data : jsonData;

// Fix titles
if (unitData.lessons) {
    unitData.lessons.forEach(lesson => {
        if (lesson.id === 'lesson_1') lesson.title = 'Lesson 1: Prehistoric and Roman Sanitation';
        if (lesson.id === 'lesson_2') lesson.title = 'Lesson 2: Medieval Sanitation and The Church';
        if (lesson.id === 'lesson_3') lesson.title = 'Lesson 3: Early Modern Filth and Cesspits';
        if (lesson.id === 'lesson_4') lesson.title = 'Lesson 4: The Industrial Revolution and Cholera';
        if (lesson.id === 'lesson_5') lesson.title = 'Lesson 5: The Great Stink and Modern Sewers';
    });
}

// Write back to public/data (with wrapper if it had one)
if (jsonData.data) {
    jsonData.data = unitData;
} else {
    jsonData = unitData;
}
fs.writeFileSync(publicPath, JSON.stringify(jsonData, null, 2));

// Write to src/data.js WITHOUT wrapper
const jsContent = `export const unitData = ${JSON.stringify(unitData, null, 4)};`;
fs.writeFileSync(srcPath, jsContent);

console.log('Fixed wrapper issues and synced.');
