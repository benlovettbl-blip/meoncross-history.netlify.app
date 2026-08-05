import fs from 'fs';
import path from 'path';

const file = path.join('early_modern_world', 'data.js');
let raw = fs.readFileSync(file, 'utf8');

// Parse the JS object out of the string
let jsonStr = raw.replace('export const unitData = ', '').replace(/;\s*$/, '');
let data = JSON.parse(jsonStr);

// Fix image objects to strings
data.lessons.forEach(lesson => {
    if (lesson.narrative_blocks) {
        lesson.narrative_blocks.forEach(block => {
            if (block.image && typeof block.image === 'object') {
                block.image_alt = block.image.alt;
                block.image_caption = block.image.caption;
                block.image = block.image.url;
            }
        });
    }
});

// Write back to file
const out = `export const unitData = ${JSON.stringify(data, null, 4)};\n`;
fs.writeFileSync(file, out);
console.log("Successfully fixed images in early_modern_world/data.js");
