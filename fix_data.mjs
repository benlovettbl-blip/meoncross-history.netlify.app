import fs from 'fs';
import path from 'path';

function fixData(unitDir) {
    const file = path.join(unitDir, 'data.js');
    const raw = fs.readFileSync(file, 'utf8');

    // Parse the JS object out of the string
    let jsonStr = raw.replace('export const unitData = ', '').replace(/;\s*$/, '');
    let data = JSON.parse(jsonStr);

    // Fix Do Nows
    data.lessons.forEach(lesson => {
        if (lesson.do_now && lesson.do_now.type === 'quiz') {
            lesson.do_now.type = 'questions';
            if (lesson.do_now.questions) {
                lesson.do_now.items = lesson.do_now.questions.map(q => ({
                    question: q.question,
                    answer: q.options ? q.options[q.answer] : "Answer not provided"
                }));
                delete lesson.do_now.questions;
            }
        }
    });

    // Fix Quiz position in Lesson 1 for early_modern_world
    if (unitDir === 'early_modern_world') {
        let l1 = data.lessons[0];
        if (l1 && l1.narrative_blocks) {
            let lastBlock = l1.narrative_blocks[3]; // The 4th block has the quiz
            if (lastBlock && lastBlock.tasks && lastBlock.tasks.length > 0) {
                let task = lastBlock.tasks[0];
                if (task.type === 'quiz') {
                    l1.quiz = task.questions;
                    lastBlock.tasks = [];
                }
            }
        }
    }

    // Write back to file
    const out = `export const unitData = ${JSON.stringify(data, null, 4)};\n`;
    fs.writeFileSync(file, out);
    console.log(`Successfully fixed ${unitDir}/data.js`);
}

fixData('early_modern_world');
fixData('industrialisation_and_empire');
