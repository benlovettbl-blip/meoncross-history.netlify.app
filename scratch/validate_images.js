const fs = require('fs');
const path = require('path');

const publicDir = 'c:/Projects/meoncross-history.netlify.app/public';
const dbPath = path.join(publicDir, 'database.json');

const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const imageExts = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
const allImages = new Set();

function extractImages(obj) {
    if (!obj) return;
    if (typeof obj === 'string') {
        const lower = obj.toLowerCase();
        if (imageExts.some(ext => lower.endsWith(ext) || lower.includes(ext + '?'))) {
            allImages.add(obj);
        }
    } else if (Array.isArray(obj)) {
        obj.forEach(extractImages);
    } else if (typeof obj === 'object') {
        Object.values(obj).forEach(extractImages);
    }
}

extractImages(data);

let broken = 0;
let valid = 0;

console.log(`Found ${allImages.size} unique image references in database.json. Validating...`);

Array.from(allImages).forEach(img => {
    // Some paths might be full URLs (http)
    if (img.startsWith('http')) {
        // Assume valid for local check
        valid++;
        return;
    }
    
    // Convert e.g. /assets/image.jpg to public/assets/image.jpg
    let localPath = img;
    if (localPath.startsWith('/')) {
        localPath = localPath.substring(1);
    }
    
    // Check if it exists in public
    const fullPath = path.join(publicDir, localPath);
    if (fs.existsSync(fullPath)) {
        valid++;
    } else {
        // sometimes assets are in the root assets folder instead of public
        const rootPath = path.join('c:/Projects/meoncross-history.netlify.app', localPath);
        const assetPath = path.join(publicDir, 'assets', path.basename(localPath));
        if (fs.existsSync(rootPath)) {
            valid++;
        } else if (fs.existsSync(assetPath)) {
            valid++;
        } else {
            // Recursive search in public
            const searchRes = require('child_process').spawnSync('powershell.exe', ['-Command', `Get-ChildItem -Path "${publicDir}" -Recurse -Filter "${path.basename(localPath)}" | Select-Object -First 1`], {encoding: 'utf8'});
            if (searchRes.stdout && searchRes.stdout.trim()) {
                valid++;
            } else {
                console.log(`[BROKEN LINK TRULY MISSING] ${img}`);
                broken++;
            }
        }
    }
});

console.log(`\nValidation Complete!`);
console.log(`Valid images: ${valid}`);
console.log(`Broken links: ${broken}`);
