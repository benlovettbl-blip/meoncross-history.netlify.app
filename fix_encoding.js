const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const unitsDir = path.join(__dirname, 'public', 'units');

// We want to fix the root unit directories FIRST so that extract_units.js doesn't overwrite our fixes!
const rootFolders = fs.readdirSync(rootDir).filter(f => {
  const stat = fs.statSync(path.join(rootDir, f));
  return stat.isDirectory() && fs.existsSync(path.join(rootDir, f, 'data.js')) && f !== 'public' && f !== 'node_modules' && !f.startsWith('.');
});

const publicFolders = fs.existsSync(unitsDir) ? fs.readdirSync(unitsDir).filter(f => {
  const stat = fs.statSync(path.join(unitsDir, f));
  return stat.isDirectory() && fs.existsSync(path.join(unitsDir, f, 'data.js'));
}) : [];

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

function fixFolder(folderPath) {
  const dataPath = path.join(folderPath, 'data.js');
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
      console.log(`Fixed encoding in ${dataPath}`);
      totalReplacements++;
    }
  }
}

// Fix root folders first
rootFolders.forEach(folder => {
  fixFolder(path.join(rootDir, folder));
});

// Fix public folders
publicFolders.forEach(folder => {
  fixFolder(path.join(unitsDir, folder));
});

console.log(`Complete. Fixed ${totalReplacements} data.js files.`);
