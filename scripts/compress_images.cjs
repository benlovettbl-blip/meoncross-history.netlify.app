const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { PATHS } = require('./config.cjs');
const sharp = require('sharp');

const imagesDir = PATHS.IMAGES;
const cachePath = path.join(imagesDir, '.image_cache.json');

let cache = {};
if (fs.existsSync(cachePath)) {
    try {
        cache = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
    } catch (e) {
        cache = {};
    }
}

(async () => {
    let compressedCount = 0;
    const files = fs.readdirSync(imagesDir);
    for (const file of files) {
        if (!file.match(/\.(jpg|jpeg|png)$/i)) continue;
        
        const filePath = path.join(imagesDir, file);
        const stats = fs.statSync(filePath);
        
        // Skip small files (under 100KB)
        if (stats.size < 100 * 1024) continue;
        
        if (cache[file] === stats.mtimeMs) {
            continue; // Already compressed and unchanged
        }
        
        console.log(`Compressing ${file} (${Math.round(stats.size/1024)}KB)...`);
        
        try {
            const tmpPath = filePath + '.tmp';
            if (file.match(/\.png$/i)) {
                await sharp(filePath).png({ quality: 80, compressionLevel: 8 }).toFile(tmpPath);
            } else {
                await sharp(filePath).jpeg({ quality: 80, mozjpeg: true }).toFile(tmpPath);
            }
            
            fs.renameSync(tmpPath, filePath);
            const newStats = fs.statSync(filePath);
            cache[file] = newStats.mtimeMs;
            compressedCount++;
            console.log(` -> Reduced to ${Math.round(newStats.size/1024)}KB`);
        } catch (err) {
            console.error(`Failed to compress ${file}:`, err.message);
        }
    }
    
    if (compressedCount > 0) {
        try {
            fs.writeFileSync(cachePath, JSON.stringify(cache, null, 2));
        } catch (err) {
            console.warn(`⚠️ Warning: Failed to write image cache to ${cachePath}`, err.message);
        }
        console.log(`Successfully compressed ${compressedCount} images.`);
    } else {
        console.log('All images are already optimized.');
    }
})();
