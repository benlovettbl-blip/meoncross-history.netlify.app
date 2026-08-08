const fs = require('fs');
const path = require('path');

const dataPath = path.join('c:\\Projects\\meoncross-history.netlify.app', 'early_modern_world', 'data.js');

let f = fs.readFileSync(dataPath, 'utf8');
let jsonStr = f.substring(f.indexOf('export const unitData = ') + 24);
jsonStr = jsonStr.substring(0, jsonStr.lastIndexOf(';') > -1 ? jsonStr.lastIndexOf(';') : jsonStr.length);
let unit;
try {
    unit = eval('(' + jsonStr + ')');
} catch(e) { 
    console.error("Error parsing JSON:", e);
    process.exit(1); 
}

let output = "# Unused Sources Analysis\n\n";
output += "| Lesson | Source Letter | Source Type | Description |\n";
output += "|---|---|---|---|\n";

let totalUnused = 0;

unit.lessons.forEach(lesson => {
    let allSources = [];
    let referencedSources = new Set();

    // Collect all sources
    if (lesson.narrative_blocks) {
        lesson.narrative_blocks.forEach(b => {
            // Check for source_letter in block
            if (b.source_letter) {
                let title = b.title || "Untitled Text Source";
                if (b.text && !b.title) {
                     let match = b.text.match(/Source [A-Z]:\s*(.*?)(<\/?p>|<br>|\n|$)/);
                     if (match) title = match[1];
                     else {
                         title = b.text.substring(0, 50).replace(/<[^>]*>/g, '') + "...";
                     }
                }
                allSources.push({ letter: b.source_letter, title: title, type: b.type || 'text' });
            }
            
            // Check images
            if (b.images) {
                b.images.forEach(i => {
                    if (i.source_letter) {
                        allSources.push({ letter: i.source_letter, title: i.caption || "Untitled Image", type: 'image' });
                    }
                });
            }
            
            // Collect referenced sources in text (e.g., "In Source A...")
            if (b.text) {
                let textRefs = [...b.text.matchAll(/Source ([A-Z])/g)];
                textRefs.forEach(m => referencedSources.add(m[1]));
            }
        });
    }

    // Check all tasks for source references
    if (lesson.narrative_blocks) {
        lesson.narrative_blocks.forEach(b => {
            if (b.tasks) {
                b.tasks.forEach(t => {
                    let text = (t.text || '') + ' ' + (t.question || '');
                    let matches = [...text.matchAll(/Source ([A-Z])/g)];
                    matches.forEach(m => referencedSources.add(m[1]));
                });
            }
        });
    }
    
    // Also check lesson.tasks (if any)
    if (lesson.tasks) {
        lesson.tasks.forEach(t => {
            let text = (t.text || '') + ' ' + (t.question || '');
            let matches = [...text.matchAll(/Source ([A-Z])/g)];
            matches.forEach(m => referencedSources.add(m[1]));
        });
    }

    // Check do_now
    if (lesson.do_now && lesson.do_now.items) {
        lesson.do_now.items.forEach(t => {
            let text = t.question || '';
            let matches = [...text.matchAll(/Source ([A-Z])/g)];
            matches.forEach(m => referencedSources.add(m[1]));
        });
    }

    // Filter unused
    let unused = allSources.filter(s => !referencedSources.has(s.letter));
    
    if (unused.length > 0) {
        unused.forEach(s => {
            totalUnused++;
            let cleanTitle = s.title.replace(/[\n\r\|]/g, ' ').trim();
            let lessonTitle = lesson.title.replace(/^Lesson\s*\d+:\s*/i, '').trim();
            output += `| ${lessonTitle} | Source ${s.letter} | ${s.type} | ${cleanTitle} |\n`;
        });
    }
});

fs.writeFileSync(path.join('c:\\Projects\\meoncross-history.netlify.app', 'unused_sources_report.md'), output);
console.log(`Found ${totalUnused} unused sources.`);
