const fs = require('fs');
const path = require('path');

const searchDirs = [
  'C:\\Users\\fives\\.gemini',
  process.env.TEMP,
  'C:\\Users\\fives\\AppData\\Local\\Temp',
];

const twoHoursAgo = Date.now() - 3 * 60 * 60 * 1000;
const results = [];

function scan(dir, depth = 0) {
  if (depth > 5) return;
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      try {
        if (entry.isDirectory()) {
          scan(fullPath, depth + 1);
        } else {
          const ext = path.extname(entry.name).toLowerCase();
          if (
            ['.wav', '.mp3', '.ogg', '.m4a', '.webm', '.aac', '.bin'].includes(ext) ||
            entry.name.includes('audio') ||
            entry.name.includes('voice')
          ) {
            const stat = fs.statSync(fullPath);
            if (stat.mtimeMs > twoHoursAgo) {
              results.push({ path: fullPath, size: stat.size, mtime: stat.mtime });
            }
          }
        }
      } catch (e) {}
    }
  } catch (e) {}
}

for (const d of searchDirs) {
  if (d) scan(d);
}

console.log(JSON.stringify(results, null, 2));
