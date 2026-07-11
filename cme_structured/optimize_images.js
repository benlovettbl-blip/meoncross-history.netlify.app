const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const targetDirs = [
  path.join(__dirname, 'public', 'assets'),
  path.join(__dirname, 'public', 'assets', 'scenes')
];

async function optimizeImages() {
  for (const dir of targetDirs) {
    if (!fs.existsSync(dir)) continue;

    const files = fs.readdirSync(dir);
    for (const file of files) {
      if (!file.match(/\.(png|jpg|jpeg)$/i)) continue;

      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      // Only optimize if file is larger than 100KB
      if (stat.size > 100 * 1024) {
        console.log(`Optimizing: ${file} (${Math.round(stat.size / 1024)}KB)`);
        
        const tempPath = filePath + '.tmp';
        
        try {
          if (file.toLowerCase().endsWith('.png')) {
            await sharp(filePath)
              .png({ quality: 80, compressionLevel: 9 })
              .toFile(tempPath);
          } else {
            await sharp(filePath)
              .jpeg({ quality: 80, mozjpeg: true })
              .toFile(tempPath);
          }

          // Replace original with optimized
          fs.renameSync(tempPath, filePath);
          const newStat = fs.statSync(filePath);
          console.log(`  -> New size: ${Math.round(newStat.size / 1024)}KB`);
        } catch (error) {
          console.error(`Error optimizing ${file}:`, error);
          if (fs.existsSync(tempPath)) {
            fs.unlinkSync(tempPath);
          }
        }
      }
    }
  }
}

optimizeImages().then(() => console.log("Done optimization."));
