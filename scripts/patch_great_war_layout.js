import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

async function patchGreatWarLayout() {
    const unitPath = path.join(process.cwd(), 'great_war', 'data.js');
    
    let module;
    try {
        module = await import(`file:///${unitPath.replace(/\\/g, '/')}`);
    } catch (e) {
        console.error('Failed to load great_war data.js', e);
        return;
    }
    
    const data = JSON.parse(JSON.stringify(module.unitData)); // Deep copy
    let changes = 0;

    // 1. Fix Cover Image
    if (data.cover_image !== '/images/great_war_cover.jpg') {
        data.cover_image = '/images/great_war_cover.jpg';
        console.log(`✅ Updated cover image path`);
        changes++;
    }

    // 2. Remove KS3 marks and convert exam_practice to narrative blocks
    data.lessons.forEach((lesson, lIdx) => {
        // If there's an exam_practice, we convert it into a standard extended_writing task block
        if (lesson.exam_practice && lesson.exam_practice.questions) {
            if (!lesson.narrative_blocks) lesson.narrative_blocks = [];
            
            lesson.exam_practice.questions.forEach((q, qIdx) => {
                // Strip marks
                delete q.marks;
                q.type = 'extended_writing';
                
                // Add a narrative block to hold this task so it renders as a standard task
                lesson.narrative_blocks.push({
                    title: "Consolidation Task",
                    tasks: [q]
                });
                console.log(`✅ Converted exam_practice to standard extended_writing narrative block (L${lIdx+1})`);
                changes++;
            });
            // Delete the legacy exam_practice object
            delete lesson.exam_practice;
            console.log(`✅ Removed legacy exam_practice object (L${lIdx+1})`);
            changes++;
        }

        // Also just loop through standard tasks and remove explicitly large 'marks' just in case
        if (lesson.narrative_blocks) {
            lesson.narrative_blocks.forEach(nb => {
                if (nb.tasks) {
                    nb.tasks.forEach(t => {
                        if (t.marks) {
                            delete t.marks;
                            console.log(`✅ Stripped stray marks attribute from task in (L${lIdx+1})`);
                            changes++;
                        }
                    });
                }
            });
        }
    });

    if (changes > 0) {
        fs.writeFileSync(unitPath, 'export const unitData = ' + JSON.stringify(data, null, 2) + ';\n');
        console.log(`\n🎉 Applied ${changes} layout patches to great_war/data.js`);
    } else {
        console.log('\n⚠️ No changes needed.');
    }
}

patchGreatWarLayout();
