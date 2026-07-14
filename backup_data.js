const fs = require('fs');
const path = require('path');

const backupBaseDir = path.join(__dirname, 'temp_backups');
if (!fs.existsSync(backupBaseDir)) {
    fs.mkdirSync(backupBaseDir);
}

// Generate timestamp: YYYY-MM-DD_HH-MM-SS
const now = new Date();
const timestamp = now.toISOString().replace(/T/, '_').replace(/:/g, '-').split('.')[0];
const currentBackupDir = path.join(backupBaseDir, `backup_${timestamp}`);

fs.mkdirSync(currentBackupDir);

const unitsDir = './';
const getDirectories = source =>
  fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && !dirent.name.startsWith('.') && !dirent.name.includes('node_modules'))
    .map(dirent => dirent.name);

const units = getDirectories(unitsDir).filter(dir => fs.existsSync(path.join(unitsDir, dir, 'data.js')));

let backedUpCount = 0;

units.forEach(unit => {
    const dataPath = path.join(unitsDir, unit, 'data.js');
    const destPath = path.join(currentBackupDir, `${unit}_data.js`);
    fs.copyFileSync(dataPath, destPath);
    backedUpCount++;
});

console.log(`✅ Successfully backed up ${backedUpCount} data.js files to ${currentBackupDir}`);
