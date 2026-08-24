import fs from 'fs';
import path from 'path';
import https from 'https';

const downloads = [
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/The_Silent_Highwayman_-_Punch_cartoon.jpg/1280px-The_Silent_Highwayman_-_Punch_cartoon.jpg', name: 'banner_medicine_18th_19th.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Penicillin_pastille_production_by_the_photographic_agency_of_the_Ministry_of_Information.jpg/1280px-Penicillin_pastille_production_by_the_photographic_agency_of_the_Ministry_of_Information.jpg', name: 'banner_medicine_modern.jpg' }
];

const destDir = 'C:/Projects/meoncross-history.netlify.app/public/images';

async function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'MeoncrossHistoryApp/1.0' } }, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed: ${res.statusCode}`));
        return;
      }
      const file = fs.createWriteStream(destPath);
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', reject);
  });
}

async function run() {
  for (const d of downloads) {
    const destPath = path.join(destDir, d.name);
    await downloadImage(d.url, destPath);
    console.log(`Downloaded ${d.name}`);
  }
}
run();
