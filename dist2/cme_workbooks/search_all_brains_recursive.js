const fs = require('fs');
const path = require('path');

const brainDir = 'C:\\Users\\fives\\.gemini\\antigravity\\brain';

function walkDir(dir, callback) {
  try {
    fs.readdirSync(dir).forEach(f => {
      let dirPath = path.join(dir, f);
      let isDirectory = fs.statSync(dirPath).isDirectory();
      if (isDirectory) {
        walkDir(dirPath, callback);
      } else {
        callback(dirPath);
      }
    });
  } catch (e) {}
}

walkDir(brainDir, (filePath) => {
  if (filePath.endsWith('.js') || filePath.endsWith('.txt') || filePath.endsWith('.md') || filePath.endsWith('.jsonl') || filePath.endsWith('.json')) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      if (content.includes('meSimulationDatabase')) {
        console.log(`Found reference in: ${filePath} (length: ${content.length})`);
      }
    } catch (e) {}
  }
});
