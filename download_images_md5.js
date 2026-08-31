const fs = require('fs');
const https = require('https');
const crypto = require('crypto');

const files = {
  'zheng_he.gif': 'Zhenghe-sailing-chart.gif',
  'armada_portrait.jpg': 'Elizabeth_I_(Armada_Portrait).jpg',
  'secoton.jpg': 'North_carolina_algonkin-dorf.jpg',
  'gunpowder.jpg': 'The_Gunpowder_Plot_Conspirators,_1605_from_NPG.jpg',
  'james_i.jpg': 'Paul_van_Somer_-_King_James_I_of_England_-_WGA21637.jpg',
  'royal_exchange.jpg': 'Byrsa_Londinensis_vulgo_the_Royal_Exchange_(Royal_Exchange,_London)_MET_DP823174.jpg',
  'brookes.jpg': 'Slaveshipposter.jpg',
  'cape_coast.jpg': 'Cape_coast_castle.jpg',
  'industry_idleness.png': 'William_Hogarth_-_Industry_and_Idleness,_Plate_1;_The_Fellow_\'Prentices_at_their_Looms.png'
};

async function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'MeoncrossHistory/1.0 (contact@example.com)' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadImage(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${res.statusCode}`));
        return;
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', err => reject(err));
  });
}

async function run() {
  for (const [localName, wikiName] of Object.entries(files)) {
    try {
      // Calculate MD5 hash of filename
      const hash = crypto.createHash('md5').update(wikiName).digest('hex');
      const a = hash.substring(0, 1);
      const ab = hash.substring(0, 2);
      
      const encodedName = encodeURIComponent(wikiName).replace(/%20/g, '_').replace(/'/g, '%27');
      const thumbUrl = `https://upload.wikimedia.org/wikipedia/commons/thumb/${a}/${ab}/${encodedName}/500px-${encodedName}`;
      
      console.log('Downloading:', thumbUrl);
      await downloadImage(thumbUrl, 'public/images/' + localName);
      console.log('Successfully saved', localName);
    } catch (e) {
      console.error('Error for', localName, e.message);
    }
  }
}
run();
