const fs = require('fs');

const content = fs.readFileSync('early_modern_world/data.js', 'utf8');
const match = content.match(/export const unitData = ([\s\S]+);/);

if (!match) {
    console.log("Failed to match unitData");
    process.exit(1);
}

const data = eval('(' + match[1] + ')');

const report = data.lessons.map((lesson, idx) => {
    let sources = [];
    let allTaskStrings = [];
    let tasksCount = 0;
    
    // Gather all task text
    (lesson.narrative_blocks || []).forEach(block => {
        if (block.tasks) {
            block.tasks.forEach(t => {
                tasksCount++;
                allTaskStrings.push((t.task || t.question || t.text || "").toLowerCase());
            });
        }
    });

    let sourcesWithoutTasks = [];

    (lesson.narrative_blocks || []).forEach(block => {
        if (block.source_letter || block.image) {
            const isSource = !!block.source_letter || block.title.toLowerCase().includes('source');
            if (isSource) {
                const letter = block.source_letter; // e.g. "D"
                let isReferenced = false;
                
                // 1. Has tasks directly?
                if (block.tasks && block.tasks.length > 0) {
                    isReferenced = true;
                }
                
                // 2. Is mentioned in any task string in the lesson?
                if (letter) {
                    const regex1 = new RegExp(`source\\s+${letter.toLowerCase()}\\b`);
                    const regex2 = new RegExp(`sources\\s+[a-z\\s,]*\\b${letter.toLowerCase()}\\b`);
                    const regex3 = new RegExp(`source\\s+[a-z\\s,]*\\b${letter.toLowerCase()}\\b`);
                    
                    if (allTaskStrings.some(str => regex1.test(str) || regex2.test(str) || regex3.test(str))) {
                        isReferenced = true;
                    }
                }

                if (!isReferenced) {
                    sourcesWithoutTasks.push(letter || block.title);
                }
            }
        }
    });

    return {
        lesson: idx + 1,
        title: lesson.title,
        sourcesNotReferenced: sourcesWithoutTasks
    };
});

fs.writeFileSync('scratch_analysis.json', JSON.stringify(report, null, 2));
console.log("Analysis written to scratch_analysis.json");
