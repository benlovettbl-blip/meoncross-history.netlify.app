const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../edexcel_medicine/data.js');
let dataContent = fs.readFileSync(dataPath, 'utf8');
const jsonContent = dataContent.replace('export const unitData = ', '').trim().replace(/;$/, '');
let unitData = JSON.parse(jsonContent);

const questionsPath = path.join(__dirname, 'new_hinge_questions.json');
let questions = JSON.parse(fs.readFileSync(questionsPath, 'utf8'));

let injectedCount = 0;

questions.forEach(q => {
    let lesson = unitData.lessons.find(l => l.id === q.lesson_id);
    if (lesson) {
        let blockIndex = Math.min(q.objective_index + 1, lesson.narrative_blocks.length - 1);
        
        // Find an empty block if possible, starting from blockIndex
        while(lesson.narrative_blocks[blockIndex].hinge_question && blockIndex < lesson.narrative_blocks.length - 1) {
            blockIndex++;
        }
        
        lesson.narrative_blocks[blockIndex].hinge_question = {
            text: q.text,
            options: q.options,
            correct_index: q.correct_index,
            explanation: q.explanation
        };
        injectedCount++;
    }
});

const jsContent = `export const unitData = ${JSON.stringify(unitData, null, 2)};\n`;
fs.writeFileSync(dataPath, jsContent);
console.log(`Successfully injected ${injectedCount} new interactive hinge questions into data.js.`);
