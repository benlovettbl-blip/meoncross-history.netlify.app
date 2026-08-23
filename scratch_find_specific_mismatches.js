const fs = require('fs');

let content = fs.readFileSync('early_modern_world/data.js', 'utf8');
let data;
eval('data = ' + content.replace('export default early_modern_world;', 'early_modern_world;').replace('const early_modern_world =', ''));

data.lessons.forEach((lesson, i) => {
    lesson.narrative_blocks?.forEach((block, bIndex) => {
        if (block.source_letter) {
            let letter = block.source_letter;
            
            // Check for hardcoded prefixes in captions
            if (block.image_caption && block.image_caption.match(/Source [A-Z]:/)) {
                console.log(`Lesson ${i+1} Block ${bIndex} caption has: ${block.image_caption}`);
            }
            if (block.image_alt && block.image_alt.match(/Source [A-Z]:/)) {
                console.log(`Lesson ${i+1} Block ${bIndex} alt has: ${block.image_alt}`);
            }
            if (block.title && block.title.match(/Source [A-Z]:/)) {
                console.log(`Lesson ${i+1} Block ${bIndex} title has: ${block.title}`);
            }
            
            // Check tasks inside the block
            block.tasks?.forEach((task, tIndex) => {
                if (task.question && task.question.match(/Source [A-Z]/)) {
                     let m = task.question.match(/Source ([A-Z])/);
                     if (m[1] !== letter) {
                         console.log(`Lesson ${i+1} Block ${bIndex} Task ${tIndex} MISMATCH: Question refers to Source ${m[1]}, but block is Source ${letter}. Q: ${task.question}`);
                     }
                }
            });
        }
    });
});
