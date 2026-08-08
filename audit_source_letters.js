const fs = require('fs');
const path = require('path');

const unitsDir = path.join(__dirname, 'public/units');
const unitDirs = fs.readdirSync(unitsDir).filter(f => fs.statSync(path.join(unitsDir, f)).isDirectory());

let totalErrors = 0;

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
        const definedLetters = new Set();
        
        // Find explicit image sources
        if (lesson.narrative_blocks) {
            lesson.narrative_blocks.forEach(block => {
                if (block.source_letter) definedLetters.add(block.source_letter.toUpperCase());
            });
        }
        if (lesson.utility_starters && lesson.utility_starters.sources) {
            lesson.utility_starters.sources.forEach(src => {
                if (src.letter) definedLetters.add(src.letter.toUpperCase());
            });
        }
        
        // Find inline text sources (e.g. "<strong>Source B:")
        const findInlineSources = (obj) => {
            if (typeof obj === 'string') {
                const regex = /Source\s+([A-Z])\s*:/g;
                let m;
                while ((m = regex.exec(obj)) !== null) {
                    definedLetters.add(m[1].toUpperCase());
                }
            } else if (Array.isArray(obj)) {
                obj.forEach(item => findInlineSources(item));
            } else if (obj !== null && typeof obj === 'object') {
                for (let k in obj) {
                    if (['text', 'question', 'model_answer', 'explanation', 'image_context'].includes(k) || k === 'tasks' || k === 'narrative_blocks' || k === 'utility_starters') {
                        findInlineSources(obj[k]);
                    }
                }
            }
        };
        findInlineSources(lesson);
        
        // Now check for referenced sources
        const findReferences = (obj, pathStr) => {
            if (typeof obj === 'string') {
                // Check if they ask to "Study Source X" or just mention "Source X"
                const regex = /Source\s+([A-Z])\b(?!\s*:)/g; 
                let match;
                while ((match = regex.exec(obj)) !== null) {
                    const referencedLetter = match[1].toUpperCase();
                    if (!definedLetters.has(referencedLetter)) {
                        console.log(`[MISMATCH] Unit: ${dir} | Lesson ${lIdx + 1}`);
                        console.log(`  -> References 'Source ${referencedLetter}', but NO such source is defined in this lesson!`);
                        console.log(`  -> Path: ${pathStr}`);
                        console.log(`  -> Defined in lesson: ${Array.from(definedLetters).join(', ')}\n`);
                        totalErrors++;
                    }
                }
            } else if (Array.isArray(obj)) {
                obj.forEach((item, i) => findReferences(item, `${pathStr}[${i}]`));
            } else if (obj !== null && typeof obj === 'object') {
                for (let k in obj) {
                    if (['text', 'question', 'model_answer', 'explanation', 'image_context'].includes(k) || k === 'tasks' || k === 'narrative_blocks' || k === 'utility_starters') {
                        findReferences(obj[k], `${pathStr}.${k}`);
                    }
                }
            }
        };
        
        findReferences(lesson, 'lesson');
    });
}

if (totalErrors === 0) {
    console.log("\nNo critical source mismatches found!");
} else {
    console.log(`\nTotal Critical Errors Found: ${totalErrors}`);
}
