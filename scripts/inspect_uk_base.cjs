const fs = require('fs');

const content = fs.readFileSync('public/units/ks2_ww2/assets/comparison/uk_base.svg', 'utf8');

// Find all elements with an id
const idRegex = /id="([^"]+)"/g;
let match;
const ids = [];
while ((match = idRegex.exec(content)) !== null) {
  ids.push(match[1]);
}

console.log('Total elements with IDs:', ids.length);
console.log('Sample IDs:', ids.slice(0, 40));
