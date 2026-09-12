const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const srcDir = path.join(__dirname, '..', 'public', 'images', 'Henry Cort');
const destDir = path.join(__dirname, '..', 'public', 'images', 'funtley');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const fileMap = {
  'IMG_20260822_132729.jpg': 'funtley_watercolour_iron_mills_1784.jpg',
  'IMG_20260822_131956.jpg': 'funtley_weir_waterwheel_brickwork.jpg',
  'IMG_20260822_131948.jpg': 'funtley_mill_race_channel.jpg',
  'IMG_20260822_131942.jpg': 'funtley_river_meon_chalk_stream.jpg',
  'IMG_20260822_132118.jpg': 'funtley_iron_slag_sample.jpg',
  'IMG_20260822_132342.jpg': 'funtley_hampshire_slag_wall.jpg',
  'IMG_20260822_132346.jpg': 'funtley_slag_wall_and_owner.jpg',
  'IMG_20260822_132514.jpg': 'fontley_house_jellicoe_residence.jpg',
  'IMG_20260822_132636.jpg': 'fareham_tallboy_chimney_pots.jpg',
  'IMG_20260822_132010.jpg': 'funtley_metallurgy_society_plaque.jpg',
  'IMG_20260905_171200.jpg': 'fareham_millennium_cort_plaque.jpg',
  'IMG_20260822_132821.jpg': 'henry_cort_peter_singer_book.jpg',
};

async function processImages() {
  console.log('Processing Funtley images...');
  for (const [srcName, destName] of Object.entries(fileMap)) {
    const srcPath = path.join(srcDir, srcName);
    const destPath = path.join(destDir, destName);
    if (!fs.existsSync(srcPath)) {
      console.warn(`Source file missing: ${srcPath}`);
      continue;
    }
    await sharp(srcPath)
      .resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 85, progressive: true })
      .toFile(destPath);
    console.log(
      `Optimized: ${srcName} -> ${destName} (${(fs.statSync(destPath).size / 1024).toFixed(1)} KB)`,
    );
  }

  // Copy video
  const srcVid = path.join(srcDir, 'VID_20260822_132213.mp4');
  const destVid = path.join(destDir, 'funtley_weir_hydraulic_flow.mp4');
  if (fs.existsSync(srcVid) && !fs.existsSync(destVid)) {
    fs.copyFileSync(srcVid, destVid);
    console.log(`Copied video: VID_20260822_132213.mp4 -> funtley_weir_hydraulic_flow.mp4`);
  }
  console.log('Funtley image processing complete!');
}

processImages().catch((err) => {
  console.error(err);
  process.exit(1);
});
