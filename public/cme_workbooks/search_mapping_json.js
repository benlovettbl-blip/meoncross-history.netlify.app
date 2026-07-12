const fs = require('fs');
const path = require('path');

const root = 'C:\\Users\\fives\\.gemini\\antigravity\\scratch';

function searchForMappings(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'dist') {
        searchForMappings(fullPath);
      }
    } else {
      if (file.toLowerCase().includes('mapping') || file.toLowerCase().includes('youtube')) {
        console.log(`Found mapping/youtube file: ${fullPath}`);
      }
    }
  }
}

searchForMappings(root);
