const fs = require('fs');

let content = fs.readFileSync('early_modern_world/data.js', 'utf8');

// evaluate
let data;
eval('data = ' + content.replace('export default early_modern_world;', 'early_modern_world;').replace('const early_modern_world =', ''));

let issues = [];

data.lessons.forEach((lesson, i) => {
    let sourceIndex = 0;
    
    // Some do_now might have sources, but let's just focus on narrative blocks for now
    if (lesson.narrative_blocks) {
        lesson.narrative_blocks.forEach((block, bIndex) => {
            let isSource = block.type === 'source' || block.type === 'source_box' || block.image;
            if (isSource) {
                let letter = String.fromCharCode(65 + sourceIndex);
                sourceIndex++;
                
                // Check if title, image_caption, image_alt have hardcoded "Source X: "
                let title = block.title || '';
                let caption = block.image_caption || '';
                let alt = block.image_alt || '';
                
                if (title.match(/Source [A-Z]:/)) {
                    issues.push(`Lesson ${i+1} Block ${bIndex}: title has hardcoded source: ${title}`);
                }
                if (caption.match(/Source [A-Z]:/)) {
                    issues.push(`Lesson ${i+1} Block ${bIndex}: caption has hardcoded source: ${caption}`);
                }
                if (alt.match(/Source [A-Z]:/)) {
                    issues.push(`Lesson ${i+1} Block ${bIndex}: alt has hardcoded source: ${alt}`);
                }
                
                // Check if tasks match the letter
                if (block.tasks) {
                    block.tasks.forEach((task, tIndex) => {
                        let q = task.question || '';
                        let m = q.match(/Source ([A-Z])/);
                        if (m) {
                            if (m[1] !== letter) {
                                issues.push(`Lesson ${i+1} Block ${bIndex} Task ${tIndex}: question refers to Source ${m[1]} but block is Source ${letter}. Question: ${q}`);
                            }
                        }
                    });
                }
            } else {
                // If it's NOT a source block, it might still have tasks referring to sources.
                if (block.tasks) {
                    block.tasks.forEach((task, tIndex) => {
                        let q = task.question || '';
                        let m = q.match(/Source ([A-Z])/);
                        if (m) {
                            issues.push(`Lesson ${i+1} Block ${bIndex} Task ${tIndex}: non-source block refers to Source ${m[1]}. Question: ${q}`);
                        }
                    });
                }
            }
        });
    }
});

console.log('ISSUES FOUND:');
issues.forEach(iss => console.log(iss));
