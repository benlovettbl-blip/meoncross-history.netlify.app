const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, 'public', 'images');
const files = fs.readdirSync(imgDir);

files.forEach(file => {
  if (file.includes('.org&utm_campaign')) {
    const oldPath = path.join(imgDir, file);
    const newFile = file.split('.org&')[0] + '.jpg';
    const newPath = path.join(imgDir, newFile);
    fs.renameSync(oldPath, newPath);
    console.log(`Renamed ${file} to ${newFile}`);
  }
});

async function fixDataFile() {
  const dataFile = path.join(__dirname, 'early_modern_world', 'data.js');
  let content = fs.readFileSync(dataFile, 'utf8');
  content = content.replace(/\.org&utm_campaign[^"']+/g, '.jpg');
  fs.writeFileSync(dataFile, content);
  console.log("Updated data.js with new .jpg paths.");
}
fixDataFile();
