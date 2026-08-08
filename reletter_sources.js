const fs = require('fs');

let f = fs.readFileSync('early_modern_world/data.js', 'utf8');
let jsonStr = f.substring(f.indexOf('export const unitData = ') + 24);
let suffix = '';
if (jsonStr.lastIndexOf(';') > -1) {
    suffix = jsonStr.substring(jsonStr.lastIndexOf(';'));
    jsonStr = jsonStr.substring(0, jsonStr.lastIndexOf(';'));
}
let unit = JSON.parse(jsonStr);

unit.lessons.forEach((lesson, lIdx) => {
    let currentLetterCharCode = 65; // 'A'

    // First pass: Wipe out all existing source_letter from narrative_blocks (they shouldn't have them unless they ARE a source)
    lesson.narrative_blocks.forEach(b => {
        if (b.source_letter) delete b.source_letter;
    });

    // 1. If the lesson has a primary_source, letter it 'A'
    if (lesson.primary_source) {
        lesson.primary_source.source_letter = String.fromCharCode(currentLetterCharCode++);
        // also replace "Source X" in the text if it exists
        if (lesson.primary_source.text) {
             lesson.primary_source.text = lesson.primary_source.text.replace(/Source\s+[A-Z]/g, `Source ${lesson.primary_source.source_letter}`);
        }
    }

    // 2. Iterate through narrative blocks
    lesson.narrative_blocks.forEach(b => {
        // If it's an image block, letter the images
        if (b.images) {
            b.images.forEach(img => {
                let assigned = String.fromCharCode(currentLetterCharCode++);
                img.source_letter = assigned;
                if (img.image_caption) {
                    img.image_caption = img.image_caption.replace(/Source\s+[A-Z]/g, `Source ${assigned}`);
                }
            });
        }

        // If it has embedded Source text
        if (b.text && b.text.includes('<strong>Source')) {
            let replacedText = b.text.replace(/<strong>Source\s+[A-Z]/g, () => {
                let assigned = String.fromCharCode(currentLetterCharCode++);
                b.source_letter = assigned; // Assign it to the block so tasks can refer to it
                return `<strong>Source ${assigned}`;
            });
            b.text = replacedText;
        }

        // 3. Update Tasks based on what's in the CURRENT block
        if (b.tasks) {
            b.tasks.forEach(t => {
                if (t.text && /Source\s+[A-Z]/.test(t.text)) {
                    // If the task references a source, we try to map it to the source(s) in this block
                    let newLetter = null;
                    if (b.source_letter) {
                        newLetter = b.source_letter;
                    } else if (b.images && b.images.length === 1 && b.images[0].source_letter) {
                        newLetter = b.images[0].source_letter;
                    }
                    
                    if (newLetter) {
                        t.text = t.text.replace(/Source\s+[A-Z]/g, `Source ${newLetter}`);
                        if (t.model_answer) {
                            t.model_answer = t.model_answer.replace(/Source\s+[A-Z]/g, `Source ${newLetter}`);
                        }
                    } else {
                        console.warn(`WARNING: Task in Lesson ${lIdx} references a source but couldn't auto-resolve: "${t.text}"`);
                    }
                }
            });
        }
    });
});

let out = 'export const unitData = ' + JSON.stringify(unit, null, 2) + suffix;
fs.writeFileSync('early_modern_world/data.js', out, 'utf8');
console.log('Finished re-lettering early_modern_world sources.');
