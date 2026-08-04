const fs = require('fs');
const path = require('path');

const root = 'C:\\Users\\fives\\.gemini\\antigravity\\scratch\\edexcelgcsehistorycme.netlify.app';

function searchDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (file === 'node_modules' || file === '.git' || file === '.netlify' || file === 'dist') {
      continue;
    }
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      searchDir(fullPath);
    } else if (stat.isFile()) {
      if (file.endsWith('.js') || file.endsWith('.html') || file.endsWith('.json')) {
        const content = fs.readFileSync(fullPath, 'utf8');
        if (content.includes('1955–') || content.includes('1955-') || content.includes('Increased tension') || content.includes('Increased Tension') || content.includes('ÔÇô')) {
          console.log(`Found match in: ${fullPath}`);
          const lines = content.split('\n');
          lines.forEach((line, idx) => {
            if (line.includes('1955–') || line.includes('1955-') || line.includes('Increased tension') || line.includes('Increased Tension') || line.includes('ÔÇô')) {
              console.log(`  Line ${idx + 1}: ${line.trim().substring(0, 150)}`);
            }
          });
        }
      }
    }
  }
}

searchDir(root);
