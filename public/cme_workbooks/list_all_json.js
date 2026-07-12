const fs = require('fs');
const path = require('path');

const root = 'C:\\Users\\fives\\.gemini\\antigravity\\scratch';

function searchJson(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'dist') {
        searchJson(fullPath);
      }
    } else {
      if (file.endsWith('.json')) {
        console.log(`JSON file: ${fullPath} (${stat.size} bytes)`);
      }
    }
  }
}

searchJson(root);
