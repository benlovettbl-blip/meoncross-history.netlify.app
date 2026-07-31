const fs = require('fs');

const dataFile = 'eee/data.js';
let content = fs.readFileSync(dataFile, 'utf8');

const keyIndividuals = fs.readFileSync('new_key_individuals.json', 'utf8');

// If we previously injected it, chop it off so we can inject cleanly
const startIndex = content.indexOf(',\n  "key_individuals":');
if (startIndex !== -1) {
  content = content.substring(0, startIndex) + '\n};';
}

const lastBraceIndex = content.lastIndexOf('}');
if (lastBraceIndex !== -1) {
  const newContent = content.substring(0, lastBraceIndex) + ',\n  "key_individuals": ' + keyIndividuals + '\n' + content.substring(lastBraceIndex);
  fs.writeFileSync(dataFile, newContent);
  console.log('Successfully injected updated key_individuals into eee/data.js');
} else {
  console.log("Could not find the closing brace.");
}
