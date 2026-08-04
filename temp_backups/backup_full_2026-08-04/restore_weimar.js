const fs = require('fs');

const backupPath = './temp_backups/germany_data_1785449379420.js';
const currentPath = './weimar_nazi_germany/data.js';

let backupContent = fs.readFileSync(backupPath, 'utf8');
backupContent = backupContent.replace('export const unitData = ', '').replace(/;\s*$/, '');
const backupData = JSON.parse(backupContent);

let currentContent = fs.readFileSync(currentPath, 'utf8');
let currentJsonStr = currentContent.replace('export const unitData = ', '').replace(/;\s*$/, '');
const currentData = JSON.parse(currentJsonStr);

const targets = ['lesson_2_2', 'lesson_2_3', 'lesson_2_4', 'lesson_3_1'];

targets.forEach(id => {
  const sourceL = backupData.lessons.find(l => l.id === id);
  const targetL = currentData.lessons.find(l => l.id === id);
  
  if (sourceL && sourceL.narrative && targetL) {
    targetL.narrative_blocks = sourceL.narrative.map(b => {
      let block = { ...b };
      if (block.title) {
        block.heading = block.title;
        delete block.title;
      }
      if (block.paragraphs) {
        block.text = block.paragraphs.join('<br><br>');
        delete block.paragraphs;
      }
      return block;
    });
    console.log(`Restored ${id}`);
  } else {
    console.log(`Failed to restore ${id}`);
  }
});

fs.writeFileSync(currentPath, 'export const unitData = ' + JSON.stringify(currentData, null, 2) + ';\n');
console.log('Saved data.js');
