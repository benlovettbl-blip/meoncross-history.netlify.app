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

const starters = {
  "lesson_1": "One reason Europe might be considered on the periphery of global power in 1450 is...",
  "lesson_2": "The Protestant Reformation acted as a catalyst for global exploration because...",
  "lesson_3": "Initial encounters were often based on trade because... However, this transformed into imperial control when...",
  "lesson_4": "Some historians argue that the true revolution was the shift of power away from the King towards...",
  "lesson_4b": "Although Parliament claimed victory, the economic reality was that power shifted to...",
  "lesson_5": "The barbaric 'death camp' model of the sugar plantations challenges the idea of a 'civilized' Britain because...",
  "lesson_6": "The 'white savior' narrative is historically inaccurate because it ignores the actions of...",
  "lesson_7": "Of all the developments between 1450 and 1750, I believe the most profound impact was caused by... because..."
};

data.lessons.forEach(lesson => {
  if (lesson.narrative_blocks) {
    const reflectionBlock = lesson.narrative_blocks.find(b => b.title && b.title.toLowerCase().includes('lesson reflection'));
    if (reflectionBlock && reflectionBlock.tasks && reflectionBlock.tasks.length > 0) {
      if (starters[lesson.id]) {
        reflectionBlock.tasks[0].starter = starters[lesson.id];
      }
    }
  }
});

const newContent = `export const unitData = ${JSON.stringify(data, null, 2)};\n`;
fs.writeFileSync(dataPath, newContent, 'utf8');
console.log('Successfully added sentence starters to Lesson Reflection tasks.');
