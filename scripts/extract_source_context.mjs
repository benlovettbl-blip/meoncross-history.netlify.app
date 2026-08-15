import fs from 'fs';

const gcseUnits = ['edexcel_medicine', 'cme_new', 'eee', 'weimar_nazi_germany'];
const allDirs = fs.readdirSync('.', { withFileTypes: true }).filter(d => d.isDirectory() && fs.existsSync(d.name + '/data.js')).map(d => d.name);
const ks3Units = allDirs.filter(u => !gcseUnits.includes(u));

ks3Units.forEach(unit => {
    let content = fs.readFileSync(unit + '/data.js', 'utf8');
    let jsonStr = content.replace('export const unitData =', '').trim().replace(/;$/, '');
    let data;
    try { data = JSON.parse(jsonStr); } catch (e) { return; }

    data.lessons.forEach((lesson, lIdx) => {
        if (!lesson.narrative_blocks) return;

        let sourcesInLesson = {};
        
        // Find all sources
        lesson.narrative_blocks.forEach(b => {
            const bAlt = b.image_alt || '';
            const bTitle = b.title || '';
            const bText = b.text || '';
            
            // Look for "Source X:" or "Source X -" or "Source X " in text and alt
            const regex = /(Source [A-Z])[:\-]?\s*(.*?)(?:<br>|<strong>|$)/gi;
            let m;
            while ((m = regex.exec(bAlt)) !== null) {
                sourcesInLesson[m[1].toUpperCase()] = m[2];
            }
            while ((m = regex.exec(bText)) !== null) {
                sourcesInLesson[m[1].toUpperCase()] = m[2];
            }
            while ((m = regex.exec(bTitle)) !== null) {
                sourcesInLesson[m[1].toUpperCase()] = m[2];
            }
        });

        lesson.narrative_blocks.forEach((block, bIdx) => {
            if (block.tasks) {
                block.tasks.forEach((t, tIdx) => {
                    const taskText = t.q || t.question || t.text || '';
                    const match = taskText.match(/Source [A-Z]/g);
                    if (match) {
                        match.forEach(src => {
                            const upperSrc = src.toUpperCase();
                            console.log(`\n[${unit}] L${lIdx+1} B${bIdx} T${tIdx}`);
                            console.log(`TASK: ${taskText}`);
                            console.log(`${upperSrc} CONTENT: ${sourcesInLesson[upperSrc] || 'MISSING OR NOT PARSED CORRECTLY'}`);
                        });
                    }
                });
            }
        });
    });
});
