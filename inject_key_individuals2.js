const fs = require('fs');

const dataFile = 'eee/data.js';
let content = fs.readFileSync(dataFile, 'utf8');

const keyIndividuals = fs.readFileSync('new_key_individuals.json', 'utf8');

// The file exports const unitData = { ... };
// Find the last occurrence of }
const lastBraceIndex = content.lastIndexOf('}');
if (lastBraceIndex !== -1) {
  // Just inject it blindly at the end before the last closing brace
  const newContent = content.substring(0, lastBraceIndex) + ',\n  "key_individuals": ' + keyIndividuals + '\n' + content.substring(lastBraceIndex);
  fs.writeFileSync(dataFile, newContent);
  console.log('Successfully injected key_individuals into eee/data.js');
} else {
  console.log("Could not find the closing brace.");
}
