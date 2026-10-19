const fs = require('fs');
const path = require('path');
const wsDir = path.join('public', 'units', 'ks2_ww2', 'worksheets');

['02', '03', '04', '05'].forEach((num) => {
  const file = fs
    .readdirSync(wsDir)
    .find((f) => f.startsWith('lesson_' + num) && f.endsWith('.html'));
  const content = fs.readFileSync(path.join(wsDir, file), 'utf8');
  console.log('=== ' + file + ' ===');

  // Find where source b occurs
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    if (
      line.includes('SOURCE B') ||
      line.includes('source-b') ||
      line.includes('evidence-b') ||
      line.includes('Source B')
    ) {
      for (let j = Math.max(0, idx - 5); j <= Math.min(lines.length - 1, idx + 15); j++) {
        let l = lines[j];
        if (l.includes('data:image')) {
          l = l.replace(/src="data:image[^"]+"/, 'src="data:image...[TRUNCATED]"');
        }
        console.log(`  [${j + 1}] ${l}`);
      }
    }
  });
});
