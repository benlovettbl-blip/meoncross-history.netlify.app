const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, 'water_replacements_manifest.json'), 'utf8'));

manifest.forEach(item => {
  const dest = path.join(__dirname, '..', 'public', 'images', item.localFile);
  console.log(`Downloading ${item.localFile}...`);
  // Remove url params if needed or pass full url
  const cleanUrl = item.url.split('?')[0];
  const cmd = `curl -s -L -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" "${cleanUrl}" -o "${dest}"`;
  try {
    execSync(cmd, { stdio: 'inherit' });
    const sz = fs.statSync(dest).size;
    console.log(`✅ Saved ${item.localFile} (${sz} bytes)`);
  } catch (err) {
    console.error(`❌ Failed to download ${item.localFile}:`, err.message);
  }
});
