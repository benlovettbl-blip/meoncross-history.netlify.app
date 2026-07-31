const fs = require('fs');

const dataFile = 'eee/data.js';
let content = fs.readFileSync(dataFile, 'utf8');

const keyIndividuals = fs.readFileSync('new_key_individuals.json', 'utf8');

// The file exports const unitData = { ... };
// Find the last occurrence of }
const lastBraceIndex = content.lastIndexOf('}');
if (lastBraceIndex !== -1) {
  // Check if key_individuals already exists
  if (content.includes('"key_individuals"')) {
    console.log("key_individuals already exists in data.js. Please remove it manually or update this script.");
  } else {
    // Inject the property
    const newContent = content.substring(0, lastBraceIndex) + ',\n  "key_individuals": ' + keyIndividuals + '\n' + content.substring(lastBraceIndex);
    fs.writeFileSync(dataFile, newContent);
    console.log('Successfully injected key_individuals into eee/data.js');
  }
} else {
  console.log("Could not find the closing brace.");
}
