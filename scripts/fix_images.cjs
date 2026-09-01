const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../early_modern_world/data.js');
let content = fs.readFileSync(dataPath, 'utf8');

const jsonStr = content.substring(content.indexOf('{'), content.lastIndexOf('}') + 1);
let data;
try {
  data = JSON.parse(jsonStr);
} catch(e) {
  data = eval(`(${jsonStr})`);
}

const lesson1 = data.lessons.find(l => l.id === 'lesson_1');

if (lesson1) {
  // Move Catalan Atlas from Block 4 to Block 5
  if (lesson1.narrative_blocks[4].images && lesson1.narrative_blocks[4].images.length > 0) {
    const catalanImage = lesson1.narrative_blocks[4].images[0];
    // Copy its properties to Block 5
    lesson1.narrative_blocks[5].image = catalanImage.image || catalanImage.src;
    lesson1.narrative_blocks[5].image_alt = catalanImage.image_alt || catalanImage.alt;
    lesson1.narrative_blocks[5].image_context = catalanImage.image_context;
    lesson1.narrative_blocks[5].image_caption = catalanImage.image_caption || catalanImage.caption;
    
    // Completely remove 'images' array from Block 4
    delete lesson1.narrative_blocks[4].images;
  }
}

const newContent = `export const unitData = ${JSON.stringify(data, null, 2)};\n`;
fs.writeFileSync(dataPath, newContent, 'utf8');
console.log('Successfully fixed Benin Bronze visibility by moving Catalan Atlas image to Block 5.');
