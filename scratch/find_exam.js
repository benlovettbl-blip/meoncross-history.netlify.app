const fs = require('fs');
const path = require('path');

const filePath = path.join('c:/Projects/meoncross-history.netlify.app/cme_new/data.js');
let content = fs.readFileSync(filePath, 'utf8');
const jsonContent = content.replace('export const unitData = ', '').trim().replace(/;$/, '');
const unitData = JSON.parse(jsonContent);

let examQuestions = [];

unitData.lessons.forEach(lesson => {
    if (lesson.narrative_blocks) {
        lesson.narrative_blocks.forEach((block, blockIndex) => {
            if (block.tasks) {
                block.tasks.forEach(task => {
                    const qText = task.text || task.question || '';
                    if (qText.includes('marks)') || !qText.includes('(P')) {
                        // All tasks should have a (P[number]) in them if they are comprehension questions
                        // If they don't, they are probably exam questions
                        examQuestions.push({
                            lesson: lesson.id,
                            blockIndex: blockIndex,
                            task: qText
                        });
                    }
                });
            }
        });
    }
});

console.log(examQuestions);
