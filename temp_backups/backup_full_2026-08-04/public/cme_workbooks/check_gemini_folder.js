const fs = require('fs');
const path = require('path');

const dir = 'C:\\Users\\fives\\.gemini';

if (fs.existsSync(dir)) {
  const files = fs.readdirSync(dir);
  console.log(`Files in ${dir}:`);
  files.forEach(file => {
    try {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      console.log(` - ${file} (${stat.isDirectory() ? 'DIR' : stat.size + ' bytes'})`);
    } catch (e) {
      console.log(` - ${file} (Error: ${e.message})`);
    }
  });
} else {
  console.log("Directory does not exist.");
}
