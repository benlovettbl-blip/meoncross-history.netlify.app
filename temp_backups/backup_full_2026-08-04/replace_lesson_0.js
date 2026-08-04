const fs = require('fs');
const updatedLesson = require('./updated_lesson_0.js');
const file = './great_war/data.js';

let content = fs.readFileSync(file, 'utf8');

// The file exports unitData. We will evaluate it as a script to get the object, update it, and then write it back.
// But it uses `export const unitData = {`. We can replace that with `const unitData = {`, eval it, update it, and stringify it back.

const scriptToEval = content.replace('export const unitData =', 'const unitData =') + '; module.exports = unitData;';
const tmpFile = './tmp_data.js';
fs.writeFileSync(tmpFile, scriptToEval);

const unitData = require(tmpFile);
const lessonIndex = unitData.lessons.findIndex(l => l.id === 'lesson_0');

if (lessonIndex !== -1) {
    unitData.lessons[lessonIndex] = updatedLesson;
    
    // Write back
    const newContent = 'export const unitData = ' + JSON.stringify(unitData, null, 10) + ';\n';
    fs.writeFileSync(file, newContent);
    console.log('Replaced lesson_0 successfully.');
} else {
    console.log('Could not find lesson_0.');
}

// Clean up
fs.unlinkSync(tmpFile);
