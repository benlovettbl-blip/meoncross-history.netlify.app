const fs = require('fs');
const path = require('path');

const dir = 'scratch';
const files = fs.readdirSync(dir);

files.forEach(file => {
  const filePath = path.join(dir, file);
  if (fs.statSync(filePath).isFile()) {
    const content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('DECK') && content.includes('initParserGame') && !content.includes('truncated')) {
      console.log(`Found complete candidate file: ${filePath} (length: ${content.length})`);
    }
  }
});
