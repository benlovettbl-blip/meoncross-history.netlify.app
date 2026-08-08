const fs = require('fs');
const path = require('path');

async function processAiPortraits() {
  const sourceDir = 'C:\\Users\\fives\\.gemini\\antigravity-ide\\brain\\da21a9c4-d056-4566-b977-f2025ba36822';
  const targetDir = path.join(__dirname, 'public', 'images', 'individuals');
  
  const fileMap = {
    "Don Francisco de Zárate": "don_francisco_de_zarate",
    "Martin Noell": "martin_noell",
    "Gerrard Winstanley": "gerrard_winstanley",
    "Kritovoulos of Imbros": "kritovoulos_of_imbros",
    "Prof. Christopher Hill": "christopher_hill",
    "Dr. Geoffrey Parker": "geoffrey_parker",
    "Reginald Coupland": "reginald_coupland",
    "Prof. Roy Porter": "roy_porter",
    "Prof. J.C.D. Clark": "j_c_d_clark"
  };

  const filesInSource = fs.readdirSync(sourceDir);
  const matchedPaths = {};

  for (const [name, prefix] of Object.entries(fileMap)) {
    // Find the latest generated file matching the prefix
    const matches = filesInSource.filter(f => f.startsWith(prefix) && f.endsWith('.png'));
    if (matches.length > 0) {
      // Sort by timestamp (alphabetically works for unix timestamps in names)
      matches.sort();
      const latestMatch = matches[matches.length - 1];
      
      const sourcePath = path.join(sourceDir, latestMatch);
      const targetName = `${prefix}_ai.png`;
      const targetPath = path.join(targetDir, targetName);
      
      fs.copyFileSync(sourcePath, targetPath);
      matchedPaths[name] = `/images/individuals/${targetName}`;
      console.log(`Copied AI portrait for ${name} -> ${targetName}`);
    }
  }

  // Update data.js
  const dataFile = 'early_modern_world/data.js';
  const m = await import('./early_modern_world/data.js');
  const data = m.unitData || m.default || Object.values(m)[0];

  let updatedCount = 0;
  for (const person of data.key_individuals) {
    if (matchedPaths[person.name]) {
      person.image = matchedPaths[person.name];
      updatedCount++;
    }
  }

  if (updatedCount > 0) {
    const output = `export const unitData = ${JSON.stringify(data, null, 2)};`;
    fs.writeFileSync(dataFile, output);
    console.log(`Updated ${updatedCount} image links in data.js with AI portraits!`);
  }
}

processAiPortraits().catch(console.error);
