const fs = require('fs');
const path = require('path');

const units = [
  'great_war',
  'great_war_part2',
  'norman_conquest',
  'water_and_sanitation',
  'change_1450_1750'
];

units.forEach(unit => {
  const filePath = path.join(__dirname, unit, 'generate_worksheets.js');
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace the weird 5-question split logic with a uniform spacing
    const oldRegex = /if\s*\(index\s*<\s*5\)\s*\{\s*html\s*\+=\s*`<div class="task-lines"><\/div>`;\s*\}\s*else\s*\{\s*html\s*\+=\s*`<div class="task-lines-large"><\/div><div class="task-lines-large"><\/div><div class="task-lines-large"><\/div>`;\s*\}/g;
    
    if (oldRegex.test(content)) {
      content = content.replace(oldRegex, "html += `<div class=\"task-lines-large\"></div>`;");
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated Do Now spacing in ${unit}/generate_worksheets.js`);
    } else {
      console.log(`Regex not matched in ${unit}/generate_worksheets.js`);
    }
  }
});
