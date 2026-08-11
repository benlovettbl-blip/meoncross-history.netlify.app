const fs = require('fs');
const path = require('path');

const unitsDir = path.join(__dirname, 'public', 'units');

if (!fs.existsSync(unitsDir)) {
    console.error('Units directory not found.');
    process.exit(1);
}

const unitFolders = fs.readdirSync(unitsDir).filter(f => fs.statSync(path.join(unitsDir, f)).isDirectory());

const replacements = {
  '\u00E2\u20AC\u02DC': "'", // left quote
  '\u00E2\u20AC\u2122': "'", // right quote
  '\u00E2\u20AC\u0153': '"', // left double quote
  '\u00E2\u20AC\u009D': '"', // right double quote
  '\u00E2\u20AC\u201C': '-', // en dash
  '\u00E2\u20AC\u201D': '-', // em dash
  '\u00E2\u20AC\u00A2': '•', // bullet
  '\u00E2\u20AC\u00A6': '…'  // ellipsis
};

let totalReplacements = 0;

unitFolders.forEach(folder => {
  const dataPath = path.join(unitsDir, folder, 'data.js');
  if (fs.existsSync(dataPath)) {
    let content = fs.readFileSync(dataPath, 'utf8');
    let changed = false;
    
    for (const [bad, good] of Object.entries(replacements)) {
      if (content.includes(bad)) {
        content = content.split(bad).join(good);
        changed = true;
      }
    }

    if (changed) {
      fs.writeFileSync(dataPath, content, 'utf8');
      console.log(`Fixed encoding in ${folder}/data.js`);
      totalReplacements++;
    }
  }
});

console.log(`Complete. Fixed ${totalReplacements} data.js files.`);
