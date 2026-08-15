import fs from 'fs';

const unitId = process.argv[2];
if (!unitId) {
    console.error("Usage: node auto_source_fixer.mjs <unit_id>");
    process.exit(1);
}

const dataPath = `../${unitId}/data.js`;
if (!fs.existsSync(dataPath)) {
    console.error(`File not found: ${dataPath}`);
    process.exit(1);
}

let content = fs.readFileSync(dataPath, 'utf8');
let jsonStr = content.replace('export const unitData =', '').trim().replace(/;$/, '');
let data;
try {
    data = JSON.parse(jsonStr);
} catch (e) {
    console.error("Failed to parse JSON:", e);
    process.exit(1);
}

let orphans = [];
let totalLabeled = 0;

data.lessons.forEach((lesson, lIdx) => {
    let sourceCharCode = 65; // 'A'

    // First pass: find all images and re-label them
    lesson.narrative_blocks.forEach((block, bIdx) => {
        if (block.image) {
            const label = `Source ${String.fromCharCode(sourceCharCode)}`;
            
            // Clean existing labels (e.g., "Source A:", "Source B - ")
            let cleanAlt = (block.image_alt || '').replace(/^Source\s+[A-Z][\s:\-]*/i, '').trim();
            if (!cleanAlt) cleanAlt = "Visual source.";

            block.image_alt = `${label}: ${cleanAlt}`;
            block.image_caption = `${label}: ${cleanAlt}`;
            
            totalLabeled++;
            sourceCharCode++;
        }
    });

    // Second pass: check if every source is referenced in a task
    let sourceLettersUsed = sourceCharCode - 65;
    for (let i = 0; i < sourceLettersUsed; i++) {
        const letter = String.fromCharCode(65 + i);
        const labelRegex = new RegExp(`Source\\s+${letter}\\b`, 'i');
        
        let isReferenced = false;
        lesson.narrative_blocks.forEach(block => {
            if (block.tasks) {
                block.tasks.forEach(task => {
                    const taskText = task.text || task.question || '';
                    const taskAnswer = task.model_answer || '';
                    if (labelRegex.test(taskText) || labelRegex.test(taskAnswer)) {
                        isReferenced = true;
                    }
                });
            }
        });

        if (!isReferenced) {
            // Find the block that has this source
            let sourceBlockIdx = -1;
            let sourceAlt = "";
            let sourceContext = "";
            lesson.narrative_blocks.forEach((b, idx) => {
                if (b.image && (b.image_alt || '').includes(`Source ${letter}:`)) {
                    sourceBlockIdx = idx;
                    sourceAlt = b.image_alt;
                    if (idx > 0 && lesson.narrative_blocks[idx-1].text) {
                        sourceContext = lesson.narrative_blocks[idx-1].text.substring(0, 500);
                    }
                }
            });

            orphans.push({
                unitId,
                lessonIndex: lIdx,
                lessonTitle: lesson.title,
                blockIndex: sourceBlockIdx,
                sourceLabel: `Source ${letter}`,
                alt: sourceAlt,
                context: sourceContext
            });
        }
    }
});

fs.writeFileSync(dataPath, 'export const unitData = ' + JSON.stringify(data, null, 2) + ';\n');
console.log(`Successfully labeled ${totalLabeled} sources in ${unitId}.`);

if (orphans.length > 0) {
    fs.writeFileSync(`../orphans_${unitId}.json`, JSON.stringify(orphans, null, 2));
    console.log(`Found ${orphans.length} orphaned sources. Wrote to orphans_${unitId}.json`);
} else {
    console.log("No orphaned sources found!");
}
