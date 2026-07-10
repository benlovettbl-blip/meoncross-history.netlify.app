const fs = require('fs');
const path = require('path');
try {
  const content = fs.readFileSync(path.join(__dirname, 'consequence_dump.txt'), 'utf16le');
  fs.writeFileSync(path.join(__dirname, 'consequence_dump_utf8.txt'), content, 'utf8');
  console.log('Conversion successful. Length of content:', content.length);
} catch (e) {
  console.error('Error during conversion:', e);
}
