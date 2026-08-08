const fs = require('fs');
const path = require('path');

const unitsDir = path.join(__dirname, 'public/units');
const unitDirs = fs.readdirSync(unitsDir).filter(f => fs.statSync(path.join(unitsDir, f)).isDirectory());

for (const dir of unitDirs) {
    const dataPath = path.join(unitsDir, dir, 'data.js');
    if (!fs.existsSync(dataPath)) continue;
    let raw = fs.readFileSync(dataPath, 'utf8');
    const match = raw.match(/export const unitData = ([\s\S]+)/);
    if (!match) continue;
    let dataStr = match[1];
    if (dataStr.endsWith(';')) dataStr = dataStr.slice(0, -1);
    if (dataStr.endsWith(';\n')) dataStr = dataStr.slice(0, -2);
    
    let data;
    try { data = eval('(' + dataStr + ')'); } catch(e) { continue; }
    if (!data.lessons) continue;
    
    data.lessons.forEach((lesson, lIdx) => {
        if (!lesson.narrative_blocks) return;
        
        console.log(`\n--- Unit: ${dir}, Lesson ${lIdx+1} ---`);
        lesson.narrative_blocks.forEach((block, bIdx) => {
            if (block.source_letter) {
                console.log(`Block ${bIdx+1}: Image is Source ${block.source_letter}`);
            }
            if (block.tasks) {
                block.tasks.forEach(t => {
                    if (t.question && t.question.includes('Source')) {
                        const m = /Source\s+([A-Z])/.exec(t.question);
                        if (m) console.log(`  Task asks about Source ${m[1]}`);
                    }
                });
            }
        });
    });
}
