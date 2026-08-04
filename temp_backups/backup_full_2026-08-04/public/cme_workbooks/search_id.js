const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'index.html');
const lines = fs.readFileSync(filePath, 'utf8').split('\n');

lines.forEach((line, idx) => {
  if (line.includes('id="view-exam-skills"') || line.includes('id="view-past-papers"')) {
    console.log(`Line ${idx + 1}: ${line.trim()}`);
  }
});
