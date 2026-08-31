const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'great_war_part2', 'data.js');
const data = require(targetPath);
let modified = false;

// Helper to remove matching tasks
function filterTasks(block) {
    if (block && block.tasks) {
        const originalLength = block.tasks.length;
        block.tasks = block.tasks.filter(t => {
            const isHighTariff = (t.text && (t.text.includes('[16 marks]') || t.text.includes('[12 marks]'))) || 
                                 (t.question && (t.question.includes('[16 marks]') || t.question.includes('[12 marks]')));
            return !isHighTariff;
        });
        if (block.tasks.length !== originalLength) modified = true;
    }
}

// 1. Delete High-Tariff Essays (Lessons 1-6)
// 5. Reposition Pair & Share Tasks
for (let i = 0; i < 6; i++) { // Lessons 0-5 (which are 1-6)
    const lesson = data.lessons[i];
    
    // Prune tasks
    if (lesson.narrative_blocks) lesson.narrative_blocks.forEach(filterTasks);
    filterTasks(lesson);
    if (lesson.extended) filterTasks(lesson.extended);
    if (lesson.consolidation) filterTasks(lesson.consolidation);
    
    // Reposition pair & share
    if (lesson.pair_share) {
        // If the lesson structure is an array, we could move it, but the data schema is an object
        // wait, the JSON structure stores `pair_share` as a property.
        // It's the rendering script that determines the order.
        // But if the user means moving it inside the data structure, how can I do that?
        // Let's look at `generate_pupil_workbooks.js` or `renderLesson.js`.
        // Usually, `data.js` keys order doesn't matter for JSON, but maybe it matters for `Object.keys()`?
        // Let's create a new object to re-order the keys.
        const newLesson = {};
        for (let key in lesson) {
            if (key === 'consolidation' && lesson.pair_share) {
                newLesson.pair_share = lesson.pair_share;
            }
            if (key !== 'pair_share') {
                newLesson[key] = lesson[key];
            }
        }
        data.lessons[i] = newLesson;
        modified = true;
    }
}

// 2. Clean Ghost Sources (Lessons 1 & 2)
function cleanGhostSource(obj) {
    if (!obj || typeof obj !== 'object') return;
    if (obj.text) {
        const orig = obj.text;
        // Strip out "Source [Letter]:" specifically for the ones mentioned
        obj.text = obj.text.replace(/(<br><br>|<strong>|^)\s*Source\s+[A-Z]\s*:\s*/g, '$1');
        if (orig !== obj.text) modified = true;
    }
    for (let k in obj) {
        if (typeof obj[k] === 'object') cleanGhostSource(obj[k]);
    }
}

cleanGhostSource(data.lessons[0]); // Lesson 1
cleanGhostSource(data.lessons[1]); // Lesson 2

// 4. Fix Image Mismatches (Lessons 5 & 6)
// Lesson 5 (index 4), 1940 Class weeping child
data.lessons[4].narrative_blocks.forEach(b => {
    if (b.image_caption && b.image_caption.includes('1940 Class')) {
        b.image = '/images/gw_weeping_child.jpg';
        modified = true;
    }
});

// Lesson 6 (index 5), Dead Man's Penny
data.lessons[5].narrative_blocks.forEach(b => {
    if (b.image_caption && b.image_caption.includes('Dead Man\'s Penny')) {
        b.image = '/images/gw_dead_mans_penny.jpg';
        modified = true;
    }
});

if (modified) {
    const fileContent = `module.exports = ${JSON.stringify(data, null, 2)};\n`;
    fs.writeFileSync(targetPath, fileContent, 'utf8');
    console.log('Successfully applied final patch to data.js');
} else {
    console.log('No modifications needed.');
}
