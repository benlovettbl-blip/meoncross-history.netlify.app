const fs = require('fs');
const path = require('path');

const dir = 'C:\\Users\\fives\\.gemini\\antigravity\\scratch\\gcse-elizabethan-revision';

if (fs.existsSync(dir)) {
  const files = fs.readdirSync(dir);
  console.log(`Files in ${dir}:`);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    console.log(` - ${file} (${stat.isDirectory() ? 'DIR' : stat.size + ' bytes'})`);
  });
} else {
  console.log("Directory does not exist.");
}
