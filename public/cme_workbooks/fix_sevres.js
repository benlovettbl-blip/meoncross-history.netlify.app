const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../questions.js');
let content = fs.readFileSync(filePath, 'utf8');

// Replace all corrupted instances of S├¿vres with Sèvres
const replaced = content.replace(/S├¿vres/g, 'Sèvres');

if (content !== replaced) {
  fs.writeFileSync(filePath, replaced, 'utf8');
  console.log('Successfully replaced corrupted Sèvres instances in questions.js');
} else {
  console.log('No corrupted Sèvres instances found in questions.js');
}
