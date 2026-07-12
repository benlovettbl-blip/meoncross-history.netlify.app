const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const ignoreDirs = ['node_modules', '.git', 'dist', '.netlify', 'android'];
const ignoreFiles = ['firefly_embed.html', 'questions_original.js', 'find_encoding_errors.js'];

// Corrupted character patterns to search for
const targets = [
  { term: 'ÔÇô', desc: 'broken en-dash (ÔÇô)' },
  { term: 'ÔÇÖ', desc: 'broken apostrophe (ÔÇÖ)' },
  { term: '├¿', desc: 'broken e-grave (├¿)' },
  { term: 'â€“', desc: 'UTF-8 decoded as ISO-8859-1 en-dash (â€“)' },
  { term: 'â€™', desc: 'UTF-8 decoded as ISO-8859-1 apostrophe (â€™)' }
];

function scanDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (ignoreDirs.includes(file)) continue;
      scanDir(fullPath);
    } else {
      if (ignoreFiles.includes(file)) continue;
      
      // Only scan text-like files
      const ext = path.extname(file).toLowerCase();
      if (!['.js', '.html', '.css', '.json', '.txt'].includes(ext)) continue;

      try {
        const content = fs.readFileSync(fullPath, 'utf8');
        targets.forEach(target => {
          if (content.includes(target.term)) {
            // Find line number and context
            const lines = content.split('\n');
            lines.forEach((line, idx) => {
              if (line.includes(target.term)) {
                console.log(`FOUND ${target.desc} in ${path.relative(rootDir, fullPath)} line ${idx + 1}:`);
                console.log(`  ${line.trim().substring(0, 120)}`);
              }
            });
          }
        });
      } catch (err) {
        console.error(`Error reading ${fullPath}:`, err.message);
      }
    }
  }
}

console.log('Scanning codebase for encoding corruptions...');
scanDir(rootDir);
console.log('Scan complete.');
