const fs = require('fs');
const path = require('path');

const root = 'C:\\Users\\fives\\.gemini\\antigravity\\scratch';

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
      if (file.endsWith('.js') || file.endsWith('.html') || file.endsWith('.json') || file.endsWith('.md')) {
        try {
          const content = fs.readFileSync(fullPath, 'utf8');
          if (content.toLowerCase().includes('youtube')) {
            console.log(`Found in: ${fullPath}`);
            const lines = content.split('\n');
            lines.forEach((line, idx) => {
              if (line.toLowerCase().includes('youtube') && line.includes('watch?v=')) {
                console.log(`  Line ${idx + 1}: ${line.trim().substring(0, 150)}`);
              }
            });
          }
        } catch (e) {
          // Ignore read errors
        }
      }
    }
  }
}

searchDir(root);
