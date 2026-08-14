import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

async function patchGreatWar() {
    const unitPath = path.join(process.cwd(), 'great_war', 'data.js');
    
    let module;
    try {
        module = await import(`file:///${unitPath.replace(/\\/g, '/')}`);
    } catch (e) {
        console.error('Failed to load great_war data.js', e);
        return;
    }
    
    const data = JSON.parse(JSON.stringify(module.unitData)); // Deep copy to avoid reference issues
    let changes = 0;

    data.lessons.forEach((lesson, lIdx) => {
        if (!lesson.narrative_blocks) return;

        // 1. Remove orphaned fragment in Lesson 6 Block 0
        if (lIdx === 5 && lesson.narrative_blocks[0].text && lesson.narrative_blocks[0].text.includes('**The July Crisis: Inevitable')) {
            // Check if it's the exact one with no tasks
            if (!lesson.narrative_blocks[0].tasks || lesson.narrative_blocks[0].tasks.length === 0) {
                lesson.narrative_blocks.splice(0, 1);
                console.log(`✅ Removed orphaned fragment from Lesson 6`);
                changes++;
            }
        }

        lesson.narrative_blocks.forEach((block, bIdx) => {
            if (block.tasks) {
                block.tasks.forEach((task, tIdx) => {
                    // 2. Fix missing text in drag_drop_timeline
                    if (task.type === 'drag_drop_timeline' && !task.question && !task.q && !task.text) {
                        task.question = task.title || "Interactive Timeline Task";
                        console.log(`✅ Fixed missing task text in drag_drop_timeline (L${lIdx+1} B${bIdx})`);
                        changes++;
                    }

                    // 3. Standardise task types
                    if (task.type === 'written' || task.type === 'text') {
                        // If it has an image or source, it's source_analysis
                        if (block.image_url || (task.text && task.text.toLowerCase().includes('source'))) {
                            task.type = 'source_analysis';
                        } else {
                            task.type = 'comprehension';
                        }
                        
                        // Promote some major explanatory questions to extended_writing and inject IDEA
                        const textLower = (task.question || task.q || task.text || '').toLowerCase();
                        if (textLower.includes('assess') || textLower.includes('evaluate') || (textLower.includes('explain how the transformation of europe') && textLower.includes('dangerous change'))) {
                            task.type = 'extended_writing';
                            task.marks = 8;
                            
                            // Inject IDEA framework if not present
                            let propToUpdate = task.question ? 'question' : (task.q ? 'q' : 'text');
                            if (!task[propToUpdate].includes('IDEA framework')) {
                                task[propToUpdate] = task[propToUpdate] + ` <br><br><em>Use the <abbr title="Identify, Describe, Explain, Analyse">IDEA framework</abbr> to structure your response.</em>`;
                                console.log(`✅ Injected IDEA framework into task (L${lIdx+1} B${bIdx})`);
                            }
                        }
                        
                        console.log(`✅ Standardised task type to ${task.type} (L${lIdx+1} B${bIdx})`);
                        changes++;
                    }

                    // Fix missing q/question/text on standard tasks (though the auditor only found 1)
                    if (!task.question && !task.q && !task.text && task.type !== 'drag_drop_timeline') {
                        task.question = "Answer the question based on the text above.";
                        console.log(`✅ Added generic fallback question to task (L${lIdx+1} B${bIdx})`);
                        changes++;
                    }
                });
            }
        });
    });

    if (changes > 0) {
        fs.writeFileSync(unitPath, 'export const unitData = ' + JSON.stringify(data, null, 2) + ';\n');
        console.log(`\n🎉 Applied ${changes} patches to great_war/data.js`);
    } else {
        console.log('\n⚠️ No changes needed.');
    }
}

patchGreatWar();
