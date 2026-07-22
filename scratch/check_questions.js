const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../edexcel_medicine/data.js');
let dataContent = fs.readFileSync(dataPath, 'utf8');
const jsonContent = dataContent.replace('export const unitData = ', '').trim().replace(/;$/, '');
let unitData = JSON.parse(jsonContent);

let output = "";

unitData.lessons.forEach(lesson => {
    output += `\n========================================\n`;
    output += `LESSON: ${lesson.title}\n`;
    output += `========================================\n`;
    
    let accumulatedText = "";
    
    if (lesson.narrative_blocks) {
        lesson.narrative_blocks.forEach((block, idx) => {
            accumulatedText += block.text + "\n\n";
            if (block.tasks && block.tasks.length > 0) {
                output += `\n[Context available so far]:\n${accumulatedText}\n`;
                output += `[Questions in this block]:\n`;
                block.tasks.forEach(task => {
                    output += `  - Q${task.qNum}: ${task.question || task.text}\n`;
                });
                output += `----------------------------------------\n`;
            }
        });
    }
});

fs.writeFileSync(path.join(__dirname, 'question_check.txt'), output);
console.log("Wrote question check to scratch/question_check.txt");
