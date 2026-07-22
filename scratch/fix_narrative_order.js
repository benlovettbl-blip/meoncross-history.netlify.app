const fs = require('fs');
const path = require('path');

const units = [
  'edexcel_medicine',
  'change_1450_1750',
  'water_and_sanitation',
  'great_war',
  'great_war_part2'
];

const timestamp = Date.now();
const backupDir = path.join(__dirname, '..', 'temp_backups');
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir);
}

units.forEach(unit => {
  const filePath = path.join(__dirname, '..', unit, 'data.js');
  if (fs.existsSync(filePath)) {
    console.log(`Processing ${unit}...`);
    
    // 1. Create Backup
    const backupPath = path.join(backupDir, `${unit}_data_${timestamp}.js`);
    fs.copyFileSync(filePath, backupPath);
    console.log(`  Created backup: ${backupPath}`);
    
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const startIndex = fileContent.indexOf('{');
    const endIndex = fileContent.lastIndexOf('}');
    
    if (startIndex === -1 || endIndex === -1) {
       console.log(`  Could not find JSON bounds in ${unit}`);
       return;
    }
    
    const prefix = fileContent.substring(0, startIndex);
    const suffix = fileContent.substring(endIndex + 1);
    const jsonStr = fileContent.substring(startIndex, endIndex + 1);
    
    let data;
    try {
      // It's technically JS object notation, not strict JSON. Keys might not be quoted.
      // But in this codebase, it looks like valid JSON most of the time, OR we can eval it.
      data = eval('(' + jsonStr + ')');
    } catch(e) {
      console.error(`  Failed to eval JSON in ${unit}`, e);
      return;
    }
    
    if (!data || !data.lessons) {
       console.log(`  No lessons found in ${unit}.`);
       return;
    }
    
    // 3. Modify data
    let modified = false;
    data.lessons.forEach(lesson => {
      if (lesson.extended && lesson.extended.title && lesson.extended.paragraphs) {
        if (!lesson.narrative_blocks) {
           lesson.narrative_blocks = [];
        }
        
        // Create new narrative block
        const introBlock = {
          text: `**${lesson.extended.title}**\n\n${lesson.extended.paragraphs.join('\n\n')}`
        };
        
        // Unshift to the beginning
        lesson.narrative_blocks.unshift(introBlock);
        
        // Clean up extended
        delete lesson.extended.title;
        delete lesson.extended.paragraphs;
        
        // If extended is now empty, delete it completely
        if (Object.keys(lesson.extended).length === 0) {
          delete lesson.extended;
        }
        
        modified = true;
      }
    });
    
    // 4. Save
    if (modified) {
      // JSON.stringify will properly quote everything and format it safely
      const newJsonStr = JSON.stringify(data, null, 2);
      const newContent = prefix + newJsonStr + suffix;
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`  Saved updated ${unit}/data.js`);
    } else {
      console.log(`  No modifications needed for ${unit}.`);
    }
  } else {
    console.log(`File not found: ${filePath}`);
  }
});
console.log('Done!');
