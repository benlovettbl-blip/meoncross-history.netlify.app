const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  try {
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
  } catch (e) {}
}

walkDir('.', (filePath) => {
  if (filePath.endsWith('.js') || filePath.endsWith('.txt') || filePath.endsWith('.md') || filePath.endsWith('.json') || filePath.endsWith('.html')) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      if (content.includes('meSimulationDatabase')) {
        console.log(`Found in workspace file: ${filePath} (length: ${content.length})`);
      }
    } catch (e) {}
  }
});
