const fs = require('fs');
const path = require('path');

const unitsDir = path.join(__dirname, 'public', 'units');

if (!fs.existsSync(unitsDir)) {
    console.error('Units directory not found.');
    process.exit(1);
}

const unitFolders = fs.readdirSync(unitsDir).filter(f => fs.statSync(path.join(unitsDir, f)).isDirectory());

const replacements = {
  'â€˜': "'",
  'â€™': "'",
  'â€œ': '"',
  'â€\u009d': '"', // â€ 
  'â€"': '"',
  'â€”': '—', // em dash
  'â€“': '–', // en dash
  'â€¢': '•', // bullet
  'â€¦': '…', // ellipsis
  'â€': '"',  // catch-all for broken right quote
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
