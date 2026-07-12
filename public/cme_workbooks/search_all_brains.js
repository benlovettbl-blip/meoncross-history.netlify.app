const fs = require('fs');
const path = require('path');

const brainDir = 'C:\\Users\\fives\\.gemini\\antigravity\\brain';
const folders = fs.readdirSync(brainDir);

folders.forEach(folder => {
  const folderPath = path.join(brainDir, folder);
  if (fs.statSync(folderPath).isDirectory()) {
    // Search all md and txt files inside this folder (non-recursively)
    try {
      const files = fs.readdirSync(folderPath);
      files.forEach(file => {
        const filePath = path.join(folderPath, file);
        if (fs.statSync(filePath).isFile() && (file.endsWith('.md') || file.endsWith('.txt') || file.endsWith('.js'))) {
          const content = fs.readFileSync(filePath, 'utf8');
          if (content.includes('meSimulationDatabase') && !content.includes('truncated') && content.length > 5000) {
            console.log(`Found candidate in folder ${folder}: ${file} (length: ${content.length})`);
          }
        }
      });
    } catch (e) {
    }
  }
});
