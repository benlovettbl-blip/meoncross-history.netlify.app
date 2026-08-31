const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'great_war_part2', 'data.js'); // TARGETING SOURCE DIR

// Load data.js
const data = require(targetPath);

let modified = false;

data.lessons.forEach(lesson => {
    // 2. Prune Micro-Questions
    if (lesson.narrative_blocks && lesson.narrative_blocks.length > 0) {
        const firstBlock = lesson.narrative_blocks[0];
        if (firstBlock.tasks && firstBlock.tasks.length >= 3) {
            // Check if they are short answer recall questions
            const isAllShortAnswer = firstBlock.tasks.every(t => t.type === 'short_answer');
            if (isAllShortAnswer) {
                firstBlock.tasks = [{
                    type: "short_answer",
                    text: "Knowledge Retrieval: Complete the summary table using the information from the text.",
                    model_answer: "Student completes table based on reading."
                }];
                modified = true;
            }
        }
    }
    
    // 4. Consolidate Redundant Plenaries
    if (lesson.consolidation && lesson.extended) {
        delete lesson.consolidation;
        modified = true;
    }
    
    // 5. Fix Source Lettering
    let lessonStr = JSON.stringify(lesson);
    let currentSourceCode = 65; // 'A'
    
    // Find all instances of "Source [A-Z]"
    // The regex matches 'Source ' followed by a single uppercase letter
    const newLessonStr = lessonStr.replace(/Source\s+[A-Z]/g, (match) => {
        const replacement = `Source ${String.fromCharCode(currentSourceCode)}`;
        currentSourceCode++;
        return replacement;
    });
    
    if (lessonStr !== newLessonStr) {
        // Apply back to lesson object by replacing properties
        for (let key in lesson) { delete lesson[key]; }
        const parsed = JSON.parse(newLessonStr);
        Object.assign(lesson, parsed);
        modified = true;
    }
});

if (modified) {
    const fileContent = `module.exports = ${JSON.stringify(data, null, 2)};\n`;
    fs.writeFileSync(targetPath, fileContent, 'utf8');
    console.log('Successfully updated source data.js in ' + targetPath);
} else {
    console.log('No modifications needed.');
}
