const fs = require('fs');
const path = require('path');

const filePath = path.join('c:/Projects/meoncross-history.netlify.app/cme_new/data.js');
let content = fs.readFileSync(filePath, 'utf8');
const jsonContent = content.replace('export const unitData = ', '').trim().replace(/;$/, '');
const unitData = JSON.parse(jsonContent);

unitData.lessons.forEach(lesson => {
    console.log(`\n\n--- Lesson: ${lesson.title} ---`);
    if (lesson.narrative_blocks) {
        lesson.narrative_blocks.forEach((block, index) => {
            const blockText = block.text ? block.text.substring(0, 50).replace(/\n/g, ' ') : '[No Text / Media Block]';
            console.log(`\nBlock ${index + 1} text: ${blockText}...`);
            if (block.tasks && block.tasks.length > 0) {
                block.tasks.forEach(task => {
                    const qText = task.text || task.question || 'Unknown task format';
                    console.log(`  Task: ${qText}`);
                });
            } else {
                console.log(`  (No tasks)`);
            }
        });
    }
});
