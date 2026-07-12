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
            console.log(`\nBlock ${index + 1} text: ${block.text.substring(0, 50)}...`);
            if (block.tasks && block.tasks.length > 0) {
                block.tasks.forEach(task => {
                    console.log(`  Task: ${task.text}`);
                });
            } else {
                console.log(`  (No tasks)`);
            }
        });
    }
});
