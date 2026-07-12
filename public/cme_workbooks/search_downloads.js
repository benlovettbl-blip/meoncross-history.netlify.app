const fs = require('fs');
const path = require('path');

const searchDirs = [
  'C:\\Users\\fives\\Downloads',
  'C:\\Users\\fives\\Desktop',
  'C:\\Users\\fives\\Documents'
];

searchDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    try {
      const files = fs.readdirSync(dir);
      files.forEach(file => {
        if (file.toLowerCase().includes('client_secret') || file.toLowerCase().includes('credentials') || file.toLowerCase().includes('youtube')) {
          const fullPath = path.join(dir, file);
          const stat = fs.statSync(fullPath);
          if (!stat.isDirectory()) {
            console.log(`FOUND IN ${path.basename(dir)}: ${file} (${stat.size} bytes)`);
          }
        }
      });
    } catch (e) {
      console.log(`Error reading ${dir}: ${e.message}`);
    }
  }
});
