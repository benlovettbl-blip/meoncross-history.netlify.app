import fs from 'fs';
import path from 'path';

const dirs = [
  'great_war', 'great_war_part2', 'norman_conquest', 'water_and_sanitation', 'change_1450_1750', 'cme', 'eee', 'usa'
];

dirs.forEach(dir => {
  const file = path.join(process.cwd(), dir, 'generate_worksheets.js');
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Instead of matching the whole replace block, let's just use string replace on the exact text.
    // Let's grab the exact text from great_war/generate_worksheets.js
    const oldText = `.replace(/\\(P(\\d+)\\)/g, '<a href="#para-$1" class="scaffold-link">(P$1)</a>')`;
    const newText = `.replace(/\\s*\\((P|Para\\s*)\\d+\\)/gi, '')`;
    
    // Do a global split and join to replace all instances
    content = content.split(oldText).join(newText);
    
    fs.writeFileSync(file, content);
    console.log('Updated ' + file);
  }
});
