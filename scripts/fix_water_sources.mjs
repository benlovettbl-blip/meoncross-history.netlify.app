import fs from 'fs';

let content = fs.readFileSync('water_and_sanitation/data.js', 'utf8');
let jsonStr = content.replace('export const unitData =', '').trim().replace(/;$/, '');
let data = eval('(' + jsonStr + ')');

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

data.lessons.forEach((lesson, lIdx) => {
    if (!lesson.narrative_blocks) return;
    let sourceIndex = 0;
    
    // 1. Identify where every source currently is in this lesson
    let blocksWithSources = [];
    lesson.narrative_blocks.forEach((block, bIdx) => {
        let hasSource = false;
        let oldLetter = null;
        if (block.image_alt && block.image_alt.match(/Source [A-Z]/)) {
            hasSource = true;
            oldLetter = block.image_alt.match(/Source ([A-Z])/)[1];
        } else if (block.source_letter) {
            hasSource = true;
            oldLetter = block.source_letter;
        } else if (block.caption && block.caption.match(/Source [A-Z]/)) {
            hasSource = true;
            oldLetter = block.caption.match(/Source ([A-Z])/)[1];
        }

        if (hasSource) {
            let newLetter = alphabet[sourceIndex];
            blocksWithSources.push({
                blockIdx: bIdx,
                oldLabel: `Source ${oldLetter}`,
                newLabel: `Source ${newLetter}`,
                oldLetter: oldLetter,
                newLetter: newLetter
            });
            sourceIndex++;
        }
    });

    if (blocksWithSources.length === 0) return;

    // We can't do blind string replacements across the whole lesson because 'Source B' might become 'Source C', and 'Source C' might become 'Source D', leading to chaining replacements.
    // Instead, we will replace them using temporary placeholders.
    let lessonStr = JSON.stringify(lesson, null, 2);

    blocksWithSources.forEach(mapping => {
        if (mapping.oldLetter !== mapping.newLetter) {
            let regex = new RegExp(`Source ${mapping.oldLetter}`, 'g');
            lessonStr = lessonStr.replace(regex, `@@TEMP_SOURCE_${mapping.newLetter}@@`);
            
            // Also replace just the letter if used in source_letter property
            // "source_letter": "D"
            let letterRegex = new RegExp(`"source_letter":\\s*"${mapping.oldLetter}"`, 'g');
            lessonStr = lessonStr.replace(letterRegex, `"source_letter": "@@TEMP_LETTER_${mapping.newLetter}@@"`);
        }
    });

    // Now restore placeholders to final values
    blocksWithSources.forEach(mapping => {
        if (mapping.oldLetter !== mapping.newLetter) {
            let regex = new RegExp(`@@TEMP_SOURCE_${mapping.newLetter}@@`, 'g');
            lessonStr = lessonStr.replace(regex, `Source ${mapping.newLetter}`);
            
            let letterRegex = new RegExp(`@@TEMP_LETTER_${mapping.newLetter}@@`, 'g');
            lessonStr = lessonStr.replace(letterRegex, mapping.newLetter);
        }
    });

    // We also need to fix any task questions/answers that mention the old letter.
    // The string replace above will have caught them inside the JSON stringified lesson!

    // Put the modified lesson back into data
    data.lessons[lIdx] = JSON.parse(lessonStr);
});

let finalStr = 'export const unitData = ' + JSON.stringify(data, null, 2) + ';';
fs.writeFileSync('water_and_sanitation/data.js', finalStr);
console.log('Successfully re-labeled all sources sequentially in water_and_sanitation!');
