import fs from 'fs';

const gcseUnits = ['edexcel_medicine', 'cme_new', 'eee', 'weimar_nazi_germany'];
const allDirs = fs.readdirSync('.', { withFileTypes: true }).filter(d => d.isDirectory() && fs.existsSync(d.name + '/data.js')).map(d => d.name);
const ks3Units = allDirs.filter(u => !gcseUnits.includes(u));

let warnings = [];

ks3Units.forEach(unit => {
    let content = fs.readFileSync(unit + '/data.js', 'utf8');
    let jsonStr = content.replace('export const unitData =', '').trim().replace(/;$/, '');
    let data;
    try { data = JSON.parse(jsonStr); } catch (e) { return; }

    data.lessons.forEach((lesson, lIdx) => {
        if (!lesson.narrative_blocks) return;

        lesson.narrative_blocks.forEach((block, bIdx) => {
            const loc = `[${unit}] Lesson ${lIdx+1} Block ${bIdx}`;
            
            if (block.tasks) {
                block.tasks.forEach((t, tIdx) => {
                    const taskText = t.q || t.question || t.text || '';
                    
                    // 1. Check for Interpretations
                    const interpMatches = taskText.match(/Interpretation \d/g);
                    if (interpMatches) {
                        interpMatches.forEach(interp => {
                            let found = false;
                            lesson.narrative_blocks.forEach(b => {
                                const bText = (b.title || '') + ' ' + (b.text || '') + ' ' + (b.image_alt || '');
                                if (bText.includes(interp)) found = true;
                            });
                            if (!found) warnings.push(`${loc} Task ${tIdx}: Asks for '${interp}' but it is missing from the lesson.`);
                        });
                    }

                    // 2. Check for vague references like 'the cartoon above', 'the photograph' without a Source label
                    const lowerTask = taskText.toLowerCase();
                    if ((lowerTask.includes('study the cartoon') || lowerTask.includes('study the photograph') || lowerTask.includes('study the image') || lowerTask.includes('study the source')) && !taskText.match(/Source [A-Z]/)) {
                        warnings.push(`${loc} Task ${tIdx}: Vague reference '${taskText.substring(0, 30)}...' without explicitly naming 'Source X'.`);
                    }
                });
            }
        });
    });
});

console.log('--- Advanced Audit Results ---');
if (warnings.length === 0) console.log('All clear!');
else warnings.forEach(w => console.log(w));
