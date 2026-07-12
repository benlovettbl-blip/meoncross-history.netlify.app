const fs = require('fs');
const path = require('path');

const filePath = path.join('c:/Projects/meoncross-history.netlify.app/cme_new/data.js');
let content = fs.readFileSync(filePath, 'utf8');
const jsonContent = content.replace('export const unitData = ', '').trim().replace(/;$/, '');
let unitData = JSON.parse(jsonContent);

let movedCount = 0;

unitData.lessons.forEach(lesson => {
    if (lesson.narrative_blocks && lesson.narrative_blocks.length > 0) {
        const firstBlock = lesson.narrative_blocks[0];
        
        // Find tasks in the first block that are exam questions (contain "marks)")
        if (firstBlock.tasks && firstBlock.tasks.length > 0) {
            const examTasks = [];
            const otherTasks = [];
            
            firstBlock.tasks.forEach(task => {
                const qText = task.text || task.question || '';
                if (qText.includes('marks)')) {
                    examTasks.push(task);
                } else {
                    otherTasks.push(task);
                }
            });
            
            if (examTasks.length > 0) {
                // Update first block tasks to remove exam tasks
                firstBlock.tasks = otherTasks;
                
                // Find the last narrative block (skipping pure media blocks without text just to be safe, or just the very last block)
                const lastBlock = lesson.narrative_blocks[lesson.narrative_blocks.length - 1];
                if (!lastBlock.tasks) {
                    lastBlock.tasks = [];
                }
                // Append the exam tasks to the last block
                lastBlock.tasks = lastBlock.tasks.concat(examTasks);
                movedCount += examTasks.length;
                console.log(`Moved ${examTasks.length} exam question(s) to the end of ${lesson.id}`);
            }
        }
    }
});

if (movedCount > 0) {
    const output = `export const unitData = ${JSON.stringify(unitData, null, 2)};`;
    fs.writeFileSync(filePath, output, 'utf8');
    console.log(`Successfully fixed ${movedCount} exam questions by moving them to the end of their respective lessons!`);
} else {
    console.log("No exam questions found in block 0.");
}
