const fs = require('fs');
const path = require('path');

const file = path.join('early_modern_world', 'data.js');
const raw = fs.readFileSync(file, 'utf8');
const jsonStr = raw.replace('export const unitData = ', '').replace(/;\s*$/, '');
const data = JSON.parse(jsonStr);

const images = [];
data.lessons.forEach(lesson => {
    lesson.narrative_blocks.forEach(block => {
        if (block.image) {
            images.push(block.image);
        }
    });
});

console.log("Images used in early_modern_world:");
images.forEach(img => {
    const fullPath = path.join('public', img);
    if (fs.existsSync(fullPath)) {
        console.log(`✅ ${img} exists`);
    } else {
        console.log(`❌ ${img} DOES NOT EXIST!`);
    }
});
