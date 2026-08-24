const fs = require('fs');

let content = fs.readFileSync('early_modern_world/data.js', 'utf8');
let data;
eval('data = ' + content.replace('export default early_modern_world;', 'early_modern_world;').replace('const early_modern_world =', ''));

let output = '';

data.lessons.forEach((lesson, i) => {
    output += `\n=== LESSON ${i+1}: ${lesson.title} ===\n`;
    let seenText = '';
    
    // Also include previous lessons' text for Do Nows
    let prevLessonsText = '';
    for(let p = 0; p < i; p++) {
        data.lessons[p].narrative_blocks?.forEach(b => {
            if (b.text) prevLessonsText += b.text + ' ';
        });
    }

    lesson.narrative_blocks?.forEach((block, bIndex) => {
        if (block.text) seenText += block.text + '\n';
        
        if (block.tasks) {
            block.tasks.forEach((task, tIndex) => {
                let isDoNow = bIndex === 0;
                let availableContext = isDoNow ? prevLessonsText : seenText;
                
                // For multiple choice
                if (task.questions) {
                    task.questions.forEach(q => {
                        output += `[Block ${bIndex}] Q: ${q.q}\n`;
                    });
                }
                // For other tasks
                if (task.question) {
                    output += `[Block ${bIndex}] Q: ${task.question}\n`;
                }
            });
        }
    });
});
fs.writeFileSync('scratch_eval.txt', output);
console.log('Saved to scratch_eval.txt');
