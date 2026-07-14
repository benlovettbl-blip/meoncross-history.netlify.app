const fs = require('fs');
const path = require('path');

const unitsDir = './';

const getDirectories = source =>
  fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && !dirent.name.startsWith('.') && !dirent.name.includes('node_modules'))
    .map(dirent => dirent.name);

const units = getDirectories(unitsDir).filter(dir => fs.existsSync(path.join(unitsDir, dir, 'data.js')));

let flags = [];

// Helper to extract unique lowercase words (length > 4 to ignore stop words)
const extractKeywords = (text) => {
    if (!text) return [];
    const words = text.toLowerCase().replace(/[^a-z0-9]/g, ' ').split(/\s+/);
    return [...new Set(words.filter(w => w.length > 4))];
};

units.forEach(unit => {
    const dataPath = path.join(unitsDir, unit, 'data.js');
    try {
        let content = fs.readFileSync(dataPath, 'utf8');
        const jsonStart = content.indexOf('{');
        const unitData = eval('(' + content.substring(jsonStart, content.lastIndexOf('}') + 1) + ')');
        
        unitData.lessons.forEach((lesson, index) => {
            if (lesson.do_now && lesson.do_now.items) {
                
                // Get keywords from the current lesson's narrative
                let narrativeText = lesson.title + " ";
                if (lesson.narrative_blocks) {
                    narrativeText += lesson.narrative_blocks.map(b => b.title + " " + b.text).join(" ");
                } else if (lesson.narrative) {
                    narrativeText += lesson.narrative.join(" ");
                }
                const lessonKeywords = extractKeywords(narrativeText);
                
                lesson.do_now.items.forEach((item, itemIdx) => {
                    const qText = item.question + " " + item.answer;
                    const qKeywords = extractKeywords(qText);
                    
                    // Count how many question keywords appear in the current lesson's narrative
                    let overlapCount = 0;
                    let overlapWords = [];
                    qKeywords.forEach(kw => {
                        if (lessonKeywords.includes(kw)) {
                            overlapCount++;
                            overlapWords.push(kw);
                        }
                    });
                    
                    // If high overlap (e.g., > 2 significant keywords), flag it as potentially testing current lesson
                    if (overlapCount >= 2 && qKeywords.length > 0) {
                        const overlapRatio = overlapCount / qKeywords.length;
                        if (overlapRatio > 0.3) {
                            flags.push({
                                unit,
                                lesson: lesson.title,
                                question: item.question,
                                overlapWords
                            });
                        }
                    }
                });
            }
        });
    } catch(e) {
        // ignore errors for parsing
    }
});

console.log("=== Pedagogical Recall Audit ===");
if (flags.length === 0) {
    console.log("✅ All Do Now questions appear to strictly test prior knowledge!");
} else {
    console.log(`⚠️  Found ${flags.length} potential violations where Do Nows might test CURRENT lesson content:\n`);
    flags.forEach(f => {
        console.log(`[${f.unit}] ${f.lesson}`);
        console.log(`Q: ${f.question}`);
        console.log(`Overlap Keywords: ${f.overlapWords.join(', ')}\n`);
    });
}
