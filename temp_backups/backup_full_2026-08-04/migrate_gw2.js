const fs = require('fs');
const filePath = './great_war_part2/data.js';

let content = fs.readFileSync(filePath, 'utf8');
const dataStr = content.replace('export const unitData = ', '').replace(/;\s*$/, '');
const data = JSON.parse(dataStr);

if (data.lessons) {
  let migratedCount = 0;
  data.lessons.forEach(l => {
    if (l.narrative && Array.isArray(l.narrative) && !l.narrative_blocks) {
      l.narrative_blocks = l.narrative.map(text => {
        if (typeof text === 'string') {
          return { text: text };
        } else if (text && text.text) {
          return text; 
        } else {
          return { text: '' };
        }
      });
      delete l.narrative;
      migratedCount++;
    }
  });
  
  if (migratedCount > 0) {
    fs.writeFileSync(filePath, 'export const unitData = ' + JSON.stringify(data, null, 2) + ';\n');
    console.log(`Successfully migrated ${migratedCount} lessons in great_war_part2 to use narrative_blocks.`);
  } else {
    console.log('No lessons needed migration or they already use narrative_blocks.');
  }
}
