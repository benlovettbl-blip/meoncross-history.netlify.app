import fs from 'fs';
import path from 'path';

async function patchGreatWarPart2() {
    const unitPath = path.join(process.cwd(), 'great_war_part2', 'data.js');
    
    let module;
    try {
        module = await import(`file:///${unitPath.replace(/\\/g, '/')}`);
    } catch (e) {
        console.error('Failed to load great_war_part2 data.js', e);
        return;
    }
    
    const data = JSON.parse(JSON.stringify(module.unitData)); // Deep copy
    let changes = 0;

    // 1. Remove cover_image property so it relies on the authentic hero_image instead
    if (data.cover_image) {
        delete data.cover_image;
        console.log(`✅ Removed AI/composite cover_image property.`);
        changes++;
    }
    if (data.cover_caption) {
        delete data.cover_caption;
        console.log(`✅ Removed cover_caption property.`);
        changes++;
    }

    // 2. Fix GCSE blocks, inject IDEA, and strip marks
    data.lessons.forEach((lesson, lIdx) => {
        // Teacher notes for Lesson 6
        if (lIdx === 5 && (!lesson.teacher_notes || !lesson.teacher_notes.primer)) {
            lesson.teacher_notes = {
                primer: "This lesson localizes the Great War by studying the Stubbington War Memorial. Students will analyze the names and the unique inclusion of a woman to understand the immense local human cost of the 'Lost Generation'.",
                objectives: [
                    {
                        objective: "Identify the purpose of a war memorial.",
                        primer: "Use the introduction to explain why communities needed a focal point for their grief when bodies were not repatriated.",
                        question: "Why was the Stubbington memorial built over the village pump?"
                    },
                    {
                        objective: "Analyze the impact of the war on a single village.",
                        primer: "Have students look at the sheer number of names compared to the population size.",
                        question: "What does the inclusion of a female name tell us about the changing nature of the war?"
                    }
                ]
            };
            console.log(`✅ Injected teacher_notes for Lesson 6.`);
            changes++;
        }

        if (lesson.exam_practice && lesson.exam_practice.questions) {
            if (!lesson.narrative_blocks) lesson.narrative_blocks = [];
            
            lesson.exam_practice.questions.forEach((q, qIdx) => {
                // Strip marks
                if (q.marks) {
                    if (q.marks >= 8) {
                        q.scaffolding = "Structure your answer using the IDEA framework:\n- **Identify:** State your main point clearly.\n- **Describe:** Give historical evidence and facts.\n- **Explain:** Show how the evidence supports your point.\n- **Analyse:** Link back to the question and assess its importance.";
                        console.log(`✅ Injected IDEA scaffolding into 8-mark+ task (L${lIdx+1})`);
                    }
                    delete q.marks;
                }
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
                            console.log(`✅ Stripped stray marks attribute from standard task in (L${lIdx+1})`);
                            changes++;
                        }
                    });
                }
            });
        }
    });

    if (changes > 0) {
        fs.writeFileSync(unitPath, 'export const unitData = ' + JSON.stringify(data, null, 2) + ';\n');
        console.log(`\n🎉 Applied ${changes} layout and pedagogical patches to great_war_part2/data.js`);
    } else {
        console.log('\n⚠️ No changes needed.');
    }
}

patchGreatWarPart2();
