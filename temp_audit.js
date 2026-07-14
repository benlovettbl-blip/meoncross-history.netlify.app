const fs = require('fs');
const path = require('path');

const unitsDir = './'; // check all unit folders

const getDirectories = source =>
  fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && !dirent.name.startsWith('.') && !dirent.name.includes('node_modules'))
    .map(dirent => dirent.name);

const units = getDirectories(unitsDir).filter(dir => fs.existsSync(path.join(unitsDir, dir, 'data.js')));

let badImages = [];

units.forEach(unit => {
    try {
        const dataPath = path.join(unitsDir, unit, 'data.js');
        const content = fs.readFileSync(dataPath, 'utf8');
        // Simple regex to find all "assets/..." strings
        const matches = content.match(/assets\/[^"'\s]+/g) || [];
        const uniqueMatches = [...new Set(matches)];
        
        uniqueMatches.forEach(img => {
            const imgPath = path.join(unitsDir, unit, img);
            if (!fs.existsSync(imgPath)) {
                badImages.push({unit, img, reason: 'File does not exist'});
            } else {
                const stats = fs.statSync(imgPath);
                if (stats.size < 10000) { // < 10KB
                    badImages.push({unit, img, size: stats.size, reason: 'File suspiciously small (<10KB)'});
                }
            }
        });
    } catch(e) {
        // ignore
    }
});

console.log("Audit Results:", JSON.stringify(badImages, null, 2));
