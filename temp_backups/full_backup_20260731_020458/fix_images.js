const fs = require('fs');
const https = require('https');
const path = require('path');

const options = {
  headers: { 'User-Agent': 'MeoncrossHistoryApp/1.0 (contact@example.com)' }
};

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, options, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
         return download(response.headers.location, dest).then(resolve).catch(reject);
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', err => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function fix() {
  await download('https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Henry_Kissinger_official_portrait.jpg/500px-Henry_Kissinger_official_portrait.jpg', './public/units/cme_new/assets/henry_kissinger.jpg');
  await download('https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Theodor_Herzl.jpg/500px-Theodor_Herzl.jpg', './public/units/cme_new/assets/theodor_herzl.jpg');
  await download('https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Benjamin_Netanyahu_2018.jpg/500px-Benjamin_Netanyahu_2018.jpg', './public/units/cme_new/assets/benjamin_netanyahu.jpg');

  let biosFile = './public/units/cme_new/biographies.json';
  let bios = JSON.parse(fs.readFileSync(biosFile, 'utf8'));

  bios.forEach(b => {
    if (b.name === 'Henry Kissinger') b.image = '/units/cme_new/assets/henry_kissinger.jpg';
    if (b.name === 'Theodor Herzl') b.image = '/units/cme_new/assets/theodor_herzl.jpg';
    if (b.name === 'Benjamin Netanyahu') b.image = '/units/cme_new/assets/benjamin_netanyahu.jpg';
  });

  fs.writeFileSync(biosFile, JSON.stringify(bios, null, 2));
  console.log('Fixed images and JSON');
}

fix();
