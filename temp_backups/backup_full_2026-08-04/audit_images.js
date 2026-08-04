const fs = require('fs');
const path = require('path');

const unitsDir = './';

const getDirectories = source =>
  fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && !dirent.name.startsWith('.') && !dirent.name.includes('node_modules'))
    .map(dirent => dirent.name);

const units = getDirectories(unitsDir).filter(dir => fs.existsSync(path.join(unitsDir, dir, 'data.js')));

let badFiles = [];

units.forEach(unit => {
    try {
        const dataPath = path.join(unitsDir, unit, 'data.js');
        const content = fs.readFileSync(dataPath, 'utf8');
        
        // Find all "assets/..." references in the unit data. Skip trailing slashes/quotes.
        const matches = content.match(/assets\/[^"'\s\\]+/g) || [];
        const uniqueMatches = [...new Set(matches)];
        
        uniqueMatches.forEach(file => {
            const filePath = path.join(unitsDir, unit, file);
            if (!fs.existsSync(filePath)) {
                badFiles.push({ unit, file, reason: 'File does not exist' });
            } else {
                const stats = fs.statSync(filePath);
                
                // Allow SVGs to be smaller, but flag small images/audio
                if (!file.endsWith('.svg') && stats.size < 10000) {
                    badFiles.push({ unit, file, size: stats.size, reason: 'File suspiciously small (<10KB), potential corruption' });
                }
            }
        });
    } catch(e) {
        console.error(`Error checking unit ${unit}:`, e);
    }
});

console.log("=== Source Asset Audit Report ===");
if (badFiles.length === 0) {
    console.log("✅ All assets are present and appear valid.");
} else {
    console.log(`❌ Found ${badFiles.length} issues with assets:\n`);
    badFiles.forEach(issue => {
        console.log(`[${issue.unit.toUpperCase()}] ${issue.file}`);
        console.log(`   -> Issue: ${issue.reason}${issue.size ? ` (Size: ${issue.size} bytes)` : ''}\n`);
    });
}
