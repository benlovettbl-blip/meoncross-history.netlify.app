const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const scratchDir = path.join(__dirname, '..', 'scratch');
const targetDirs = [
  path.join(__dirname, '..', 'public', 'units', 'ks2_ww2', 'assets'),
  path.join(__dirname, '..', 'units', 'ks2_ww2', 'assets'),
  path.join(__dirname, '..', 'dist', 'units', 'ks2_ww2', 'assets'),
];

const filesToProcess = [
  've_day_children_table_1945.jpg',
  'tube_station_shelter_1940.jpg',
  'ration_book_coupons_1940.jpg',
  'land_army_poster_1941.jpg',
  'gas_mask_box_1939.jpg',
];

async function processImages() {
  console.log('🚀 Optimizing and deploying 5 authentic archival source images...');

  for (const f of filesToProcess) {
    const srcPath = path.join(scratchDir, f);
    if (!fs.existsSync(srcPath)) {
      throw new Error(`Missing source file: ${srcPath}`);
    }

    // Resize with sharp to max dimension 1600px with high quality (85)
    const buffer = await sharp(srcPath)
      .resize(1600, 1600, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 85, progressive: true })
      .toBuffer();

    console.log(
      `✅ Processed ${f}: ${buffer.length} bytes (from ${fs.statSync(srcPath).size} bytes)`,
    );

    // Write to all target asset directories
    for (const dir of targetDirs) {
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      const dest = path.join(dir, f);
      fs.writeFileSync(dest, buffer);
    }
  }

  console.log('✨ All 5 authentic archival images successfully deployed to assets directories!');
}

processImages().catch((err) => {
  console.error('❌ Error processing images:', err);
  process.exit(1);
});
