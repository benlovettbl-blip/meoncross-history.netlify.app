const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const unitTitle = process.argv[2];
if (!unitTitle) {
  console.error('Please provide a unit title. Example: npm run create-unit "The Tudors"');
  process.exit(1);
}

// Convert "The Tudors" -> "the_tudors"
const unitId = unitTitle.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
const srcDir = 'great_war';
const destDir = unitId;

if (fs.existsSync(destDir)) {
  console.error(`Folder ${destDir} already exists. Aborting.`);
  process.exit(1);
}

function copyFolderSync(from, to) {
  if (!fs.existsSync(to)) fs.mkdirSync(to, { recursive: true });
  fs.readdirSync(from).forEach(element => {
    // Don't copy assets, we now use centralized assets
    if (element === 'assets' && from === srcDir) return;

    if (fs.lstatSync(path.join(from, element)).isFile()) {
      fs.copyFileSync(path.join(from, element), path.join(to, element));
    } else {
      copyFolderSync(path.join(from, element), path.join(to, element));
    }
  });
}

console.log(`Creating new unit: ${unitTitle} (${unitId})...`);
copyFolderSync(srcDir, destDir);

// Empty the lessons array in data.js
let dataJsPath = path.join(destDir, 'data.js');
if (fs.existsSync(dataJsPath)) {
  let dataJs = fs.readFileSync(dataJsPath, 'utf8');
  // Simple regex to clear the lessons array while keeping the export structure
  // This is a rough wipe; practically we just overwrite it with an empty template
  dataJs = `export const unitData = {
    title: "${unitTitle}",
    lessons: []
};`;
  fs.writeFileSync(dataJsPath, dataJs, 'utf8');
}

// Replace title in index.html
let indexHtmlPath = path.join(destDir, 'index.html');
if (fs.existsSync(indexHtmlPath)) {
  let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
  indexHtml = indexHtml.replace(/<title>.*?<\/title>/, `<title>${unitTitle}</title>`);
  fs.writeFileSync(indexHtmlPath, indexHtml, 'utf8');
}

console.log('Running npm run sync to integrate the new unit...');
try {
  execSync('npm run sync', { stdio: 'inherit' });
  console.log(`\nSuccess! Unit '${unitTitle}' has been created at /${destDir}/`);
} catch (err) {
  console.error('Failed to sync database:', err);
}
