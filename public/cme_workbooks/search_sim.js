const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      if (f !== 'node_modules' && f !== '.git' && f !== '.netlify' && f !== 'dist') {
        walkDir(dirPath, callback);
      }
    } else {
      callback(dirPath);
    }
  });
}

walkDir('.', (filePath) => {
  if (filePath.endsWith('.js') || filePath.endsWith('.txt') || filePath.endsWith('.html')) {
    const content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('initMeSimGame')) {
      console.log(`Found initMeSimGame in: ${filePath}`);
    }
  }
});
