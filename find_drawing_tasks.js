const fs = require('fs');
const data = require('./early_modern_world/data.js').unitData;

let hasDrawings = false;
data.lessons.forEach((lesson, lIdx) => {
    if(lesson.narrative_blocks) {
        lesson.narrative_blocks.forEach((block, bIdx) => {
            if(block.tasks) {
                block.tasks.forEach((task, tIdx) => {
                    if(task.type === 'drawing') {
                        console.log(`Lesson ${lIdx+1} "${lesson.title}" - Block ${bIdx+1}`);
                        console.log(`Task: ${task.text}`);
                        let snippet = block.text ? block.text.substring(0, 200) : "NO TEXT IN THIS BLOCK";
                        console.log(`Block Text Snippet: ${snippet}...`);
                        console.log('---');
                        hasDrawings = true;
                    }
                });
            }
        });
    }
});
if(!hasDrawings) console.log("No drawing tasks found.");
