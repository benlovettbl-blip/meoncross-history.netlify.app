const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');
const files = ['views.js', 'lessons_data.js'];
const urls = new Set();

files.forEach(file => {
  const filePath = path.join(srcDir, file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    const regex = /https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/[a-zA-Z0-9_\/%\-\.\(\)]+/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
      urls.add(match[0]);
    }
  }
});

console.log(`Found ${urls.size} unique Wikimedia URLs:`);
Array.from(urls).sort().forEach(url => console.log(url));
