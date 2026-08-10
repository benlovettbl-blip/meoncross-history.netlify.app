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

let modifiedCount = 0;

data.lessons.forEach(lesson => {
  const newBlocks = [];
  
  if (lesson.narrative_blocks) {
    lesson.narrative_blocks.forEach(block => {
      // If a block has BOTH text and an image, we split it.
      // Exception: Side Quests. We shouldn't split side quests because they use a <details> summary wrapper in text.
      // Actually, if it's a side quest, it might be better left alone or carefully split.
      // Side quests usually have title "Side Quest: ...".
      const isSideQuest = block.title && block.title.includes('Side Quest');
      
      if (block.text && block.text.trim().length > 0 && block.image && !isSideQuest) {
        // Block A: The Context
        const contextBlock = {
          title: block.title,
          text: block.text
        };
        
        // Block B: The Source Analysis
        const sourceBlock = {
          title: block.source_letter ? `Analyzing Source ${block.source_letter}` : `Examining the Evidence`,
          image: block.image
        };
        
        if (block.image_alt) sourceBlock.image_alt = block.image_alt;
        if (block.caption) sourceBlock.caption = block.caption;
        if (block.source_letter) sourceBlock.source_letter = block.source_letter;
        if (block.tasks) sourceBlock.tasks = block.tasks;
        
        newBlocks.push(contextBlock);
        newBlocks.push(sourceBlock);
        modifiedCount++;
      } else {
        newBlocks.push(block);
      }
    });
    lesson.narrative_blocks = newBlocks;
  }
});

const newContent = `export const unitData = ${JSON.stringify(data, null, 2)};\n`;
fs.writeFileSync(dataPath, newContent, 'utf8');
console.log(`Successfully split ${modifiedCount} mixed blocks to fix sequencing.`);
