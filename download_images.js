const fs = require('fs');
const https = require('https');
const path = require('path');

const images = {
  'water_local_fishbourne.jpg': 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Fishbourne_Roman_Villa_The_cupid_on_a_Dolphin_mosaic.jpg',
  'water_local_titchfield.jpg': 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Titchfield_Abbey.jpg',
  'water_local_southsea.jpg': 'https://upload.wikimedia.org/wikipedia/commons/6/63/Cowdray_engraving-full-lowres.jpg',
  'water_local_eastney.jpg': 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Eastney_Beam_Engine_House_2.jpg',
  'water_local_cholera.jpg': 'https://upload.wikimedia.org/wikipedia/commons/b/b4/A_court_for_King_Cholera_Wellcome_L0003001.jpg'
};

const outputDir = path.join(__dirname, 'public', 'assets');

async function downloadImage(filename, url) {
  return new Promise((resolve, reject) => {
    const dest = path.join(outputDir, filename);
    const file = fs.createWriteStream(dest);

    https.get(url, { headers: { 'User-Agent': 'MeoncrossHistoryAppBuilder/1.0 (mrlovett@historyhub.example.com)' } }, (response) => {
      if (response.statusCode === 200 || response.statusCode === 302 || response.statusCode === 301) {
          // If redirect
          if ([301, 302].includes(response.statusCode)) {
              https.get(response.headers.location, { headers: { 'User-Agent': 'MeoncrossHistoryAppBuilder/1.0 (mrlovett@historyhub.example.com)' } }, (res2) => {
                  res2.pipe(file);
                  file.on('finish', () => { file.close(resolve); });
              }).on('error', reject);
          } else {
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
          }
      } else {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

async function run() {
  for (const [filename, url] of Object.entries(images)) {
    try {
      console.log(`Downloading ${filename}...`);
      await downloadImage(filename, url);
      console.log(`Successfully downloaded ${filename}`);
    } catch (e) {
      console.error(e);
    }
  }
}

run();
