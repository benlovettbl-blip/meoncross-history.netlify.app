const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const PUBLIC_ASSETS_DIR = path.join(ROOT_DIR, 'public', 'assets');

if (!fs.existsSync(PUBLIC_ASSETS_DIR)) {
  fs.mkdirSync(PUBLIC_ASSETS_DIR, { recursive: true });
}

// Find all unit directories (directories containing a data.js)
const units = fs.readdirSync(ROOT_DIR).filter(file => {
  const fullPath = path.join(ROOT_DIR, file);
  return fs.statSync(fullPath).isDirectory() && fs.existsSync(path.join(fullPath, 'data.js'));
});

units.forEach(unit => {
  console.log(`Processing unit: ${unit}`);
  const unitAssetsDir = path.join(ROOT_DIR, unit, 'assets');
  let assetMap = {}; // Maps old filename -> new path (e.g., "map.png" -> "/assets/great_war_map.png")

  // 1. Move assets
  if (fs.existsSync(unitAssetsDir)) {
    const assets = fs.readdirSync(unitAssetsDir);
    assets.forEach(asset => {
      const oldPath = path.join(unitAssetsDir, asset);
      if (fs.statSync(oldPath).isFile()) {
        // Prefix to avoid collisions
        const newFilename = `${unit}_${asset}`;
        const newPath = path.join(PUBLIC_ASSETS_DIR, newFilename);
        
        fs.copyFileSync(oldPath, newPath); // copy first, delete later if confident
        assetMap[asset] = `/assets/${newFilename}`;
      }
    });
    console.log(`  Copied ${assets.length} assets to public/assets/`);
  }

  // 2. Update data.js
  const dataJsPath = path.join(ROOT_DIR, unit, 'data.js');
  if (fs.existsSync(dataJsPath)) {
    let dataJs = fs.readFileSync(dataJsPath, 'utf8');
    
    // Replace "assets/filename.png" or similar.
    // Be careful to only replace what's in assetMap to avoid breaking external URLs
    Object.keys(assetMap).forEach(oldFile => {
      // Create a regex to match the exact string "assets/oldFile" or 'assets/oldFile'
      // Example: "assets/map.png" -> "/assets/great_war_map.png"
      const regex = new RegExp(`(["'])assets/${oldFile}\\1`, 'g');
      dataJs = dataJs.replace(regex, `$1${assetMap[oldFile]}$1`);

      // Also handle cases without quotes if any, or paths like ./assets/
      const regex2 = new RegExp(`(["'])\\.\\/assets/${oldFile}\\1`, 'g');
      dataJs = dataJs.replace(regex2, `$1${assetMap[oldFile]}$1`);
    });
    
    fs.writeFileSync(dataJsPath, dataJs, 'utf8');
    console.log(`  Updated data.js`);
  }

  // 3. Update index.html
  const indexHtmlPath = path.join(ROOT_DIR, unit, 'index.html');
  if (fs.existsSync(indexHtmlPath)) {
    let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
    Object.keys(assetMap).forEach(oldFile => {
      const regex = new RegExp(`(["'])assets/${oldFile}\\1`, 'g');
      indexHtml = indexHtml.replace(regex, `$1${assetMap[oldFile]}$1`);
      
      const regex2 = new RegExp(`(["'])\\.\\/assets/${oldFile}\\1`, 'g');
      indexHtml = indexHtml.replace(regex2, `$1${assetMap[oldFile]}$1`);
    });
    fs.writeFileSync(indexHtmlPath, indexHtml, 'utf8');
    console.log(`  Updated index.html`);
  }
});

console.log('Done moving assets and updating paths.');
