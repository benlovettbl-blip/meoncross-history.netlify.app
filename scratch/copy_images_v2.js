const fs = require('fs');
const path = require('path');

const rootDir = 'C:\\Projects\\meoncross-history.netlify.app';
const oldDir = path.join(rootDir, 'cme', 'assets', 'sources');
const newDir = path.join(rootDir, 'cme_new', 'assets');

if (!fs.existsSync(newDir)) {
    fs.mkdirSync(newDir, { recursive: true });
}

const filesToCopy = {
    'un_partition_plan_1947.png': 'palestine_1947_map.png',
    '1949_armistice_map.png': 'palestine_1949_map.png',
    'six_day_war_map_1967.png': 'palestine_1967_map.png'
};

for (const [oldName, newName] of Object.entries(filesToCopy)) {
    const oldPath = path.join(oldDir, oldName);
    const newPath = path.join(newDir, newName);
    
    if (fs.existsSync(oldPath)) {
        fs.copyFileSync(oldPath, newPath);
        console.log(`Copied and renamed: ${oldName} -> ${newName}`);
    } else {
        console.log(`Could not find old file: ${oldPath}`);
    }
}
