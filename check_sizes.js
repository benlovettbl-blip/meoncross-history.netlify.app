const fs = require('fs');
const path = require('path');

function getDirSize(dirPath) {
    let size = 0;
    try {
        const files = fs.readdirSync(dirPath);
        for (let i = 0; i < files.length; i++) {
            const filePath = path.join(dirPath, files[i]);
            const stats = fs.statSync(filePath);
            if (stats.isDirectory()) {
                size += getDirSize(filePath);
            } else {
                size += stats.size;
            }
        }
    } catch (e) {
        // Ignore errors for unreadable files
    }
    return size;
}

const rootDir = process.argv[2] || process.cwd();
const dirs = fs.readdirSync(rootDir);
const sizes = [];

for (const dir of dirs) {
    const fullPath = path.join(rootDir, dir);
    if (fs.statSync(fullPath).isDirectory()) {
        const sizeMB = getDirSize(fullPath) / (1024 * 1024);
        sizes.push({ name: dir, sizeMB: sizeMB });
    } else {
        sizes.push({ name: dir + ' (file)', sizeMB: fs.statSync(fullPath).size / (1024 * 1024) });
    }
}

sizes.sort((a, b) => b.sizeMB - a.sizeMB);
for (const s of sizes) {
    console.log(`${s.name}: ${s.sizeMB.toFixed(2)} MB`);
}
