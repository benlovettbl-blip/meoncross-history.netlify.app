const fs = require('fs');
const data = require('./early_modern_world/data.js').unitData;

data.lessons.forEach((lesson, lIdx) => {
    let contextStr = [];
    let hasDrawings = false;
    if(lesson.narrative_blocks) {
        lesson.narrative_blocks.forEach((block, bIdx) => {
            if (block.text) contextStr.push(`Block ${bIdx+1} Text: ${block.text}`);
            if(block.tasks) {
                block.tasks.forEach((task, tIdx) => {
                    if(task.type === 'drawing') {
                        hasDrawings = true;
                        console.log(`\n============================`);
                        console.log(`Lesson ${lIdx+1} "${lesson.title}"`);
                        console.log(`Task: ${task.text}`);
                        console.log(`\n--- Preceding Text ---`);
                        console.log(contextStr.join('\n\n'));
                    }
                });
            }
        });
    }
});
