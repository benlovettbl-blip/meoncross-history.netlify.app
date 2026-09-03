const fs = require('fs');
const path = require('path');

const unitsDir = path.join(__dirname, 'units');
const unitFolders = fs.readdirSync(unitsDir).filter(f => fs.statSync(path.join(unitsDir, f)).isDirectory());

let changedFiles = 0;
for (const unit of unitFolders) {
  if (unit === 'trip_ypres') continue; // Already done

  const dataPath = path.join(unitsDir, unit, 'data.js');
  if (!fs.existsSync(dataPath)) continue;

  let content = fs.readFileSync(dataPath, 'utf8');
  let originalContent = content;

  // Regex to find "provenance_clue": "..." and replace **text** with <strong>text</strong> inside it
  content = content.replace(/"provenance_clue":\s*"([^"]+)"/g, (match, p1) => {
    // Replace **text** with <strong>text</strong>
    let updatedClue = p1.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    return `"provenance_clue": "${updatedClue}"`;
  });

  if (content !== originalContent) {
    fs.writeFileSync(dataPath, content);
    console.log(`Updated provenance clues in ${unit}/data.js`);
    changedFiles++;
  }
}
console.log(`Completed. Updated ${changedFiles} files.`);
