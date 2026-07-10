const fs = require('fs');
const path = require('path');

const units = [
  'great_war',
  'great_war_part2',
  'norman_conquest',
  'water_and_sanitation',
  'change_1450_1750'
];

const basePath = 'c:\\Projects\\history-mega-app.netlify.app';

units.forEach(unit => {
  const filePath = path.join(basePath, unit, 'generate_worksheets.js');
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // The exact old string block
    const oldBlock = `  <div style="text-align: center; margin: 30px 0;">
    <img src="https://upload.wikimedia.org/wikipedia/commons/e/ea/Anton_von_Werner_-_Er%C3%B6ffnung_des_Reichstags_1888_%281893%29.jpg" style="max-width: 80%; border: 3px solid #1a237e; border-radius: 4px; box-shadow: 4px 4px 8px rgba(0,0,0,0.2);" alt="The Opening of the Reichstag">
    <div style="font-size: 10pt; font-style: italic; margin-top: 8px;">Anton von Werner, 'The Opening of the Reichstag' (1893)</div>
  </div>`;
    
    const newBlock = `  \${unitData.cover_image ? \`
  <div style="text-align: center; margin: 30px 0;">
    <img src="\${unitData.cover_image}" style="max-width: 80%; border: 3px solid #1a237e; border-radius: 4px; box-shadow: 4px 4px 8px rgba(0,0,0,0.2);" alt="Cover Image">
    \${unitData.cover_caption ? \`<div style="font-size: 10pt; font-style: italic; margin-top: 8px;">\${unitData.cover_caption}</div>\` : ''}
  </div>\` : ''}`;

    if (content.includes(oldBlock)) {
      content = content.replace(oldBlock, newBlock);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${filePath}`);
    } else {
      console.log(`Block not found in ${filePath}`);
    }
  } else {
    console.log(`File not found: ${filePath}`);
  }
});
