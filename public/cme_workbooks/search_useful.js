const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

function searchDir(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== '.netlify') {
        searchDir(filePath);
      }
    } else {
      const ext = path.extname(file).toLowerCase();
      // search all text-like files
      if (['.js', '.html', '.json', '.txt', '.md', '.css', '.ps1'].includes(ext)) {
        const content = fs.readFileSync(filePath, 'utf8');
        const lowerContent = content.toLowerCase();
        if (lowerContent.includes('useful')) {
          console.log(`Found 'useful' in: ${filePath}`);
          const lines = content.split('\n');
          lines.forEach((line, idx) => {
            if (line.toLowerCase().includes('useful')) {
              console.log(`  Line ${idx + 1}: ${line.trim().substring(0, 120)}`);
            }
          });
        }
      }
    }
  });
}

searchDir(rootDir);
