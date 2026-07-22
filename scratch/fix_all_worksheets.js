const fs = require('fs');
const path = require('path');

const dirs = [
  'change_1450_1750',
  'change_1450_1750/great_war',
  'great_war',
  'great_war_part2',
  'edexcel_medicine',
  'water_and_sanitation'
];

dirs.forEach(d => {
  const file = path.join(__dirname, '../', d, 'generate_worksheets.js');
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');

    // Make sure we haven't already patched it
    if (!content.includes("html = html.replace(/\\*\\*(.*?)\\*\\*/g, '<strong>$1</strong>');")) {
      content = content.replace(
        /fs\.writeFileSync\(/g, 
        "html = html.replace(/\\*\\*(.*?)\\*\\*/g, '<strong>$1</strong>');\nfs.writeFileSync("
      );
      fs.writeFileSync(file, content);
      console.log('Patched', file);
    } else {
      console.log('Already patched', file);
    }
  }
});
