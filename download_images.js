const fs = require('fs');
const https = require('https');

async function getThumbnail(filename) {
  const url = 'https://en.wikipedia.org/w/api.php?action=query&titles=' + encodeURIComponent(filename) + '&prop=pageimages&format=json&pithumbsize=500';
  const res = await fetch(url, {
    headers: { 'User-Agent': 'MeoncrossHistory/1.0 (contact@example.com)' }
  });
  const data = await res.json();
  if (data.error) {
    console.error('API Error:', data.error);
    return null;
  }
  const pages = data.query.pages;
  const pageId = Object.keys(pages)[0];
  if (pages[pageId].thumbnail) {
    return pages[pageId].thumbnail.source;
  }
  return null;
}

const files = {
  'zheng_he.jpg': 'File:Zhenghe-sailing-chart.gif',
  'armada_portrait.jpg': 'File:Elizabeth I (Armada Portrait).jpg',
  'secoton.jpg': 'File:North carolina algonkin-dorf.jpg',
  'gunpowder.jpg': 'File:The Gunpowder Plot Conspirators, 1605 from NPG.jpg',
  'james_i.jpg': 'File:Paul van Somer - King James I of England - WGA21637.jpg',
  'royal_exchange.jpg': 'File:Byrsa Londinensis vulgo the Royal Exchange (Royal Exchange, London) MET DP823174.jpg',
  'brookes.jpg': 'File:Slaveshipposter.jpg',
  'cape_coast.jpg': 'File:Cape coast castle.jpg',
  'industry_idleness.jpg': 'File:William_Hogarth_-_Industry_and_Idleness,_Plate_1;_The_Fellow_\'Prentices_at_their_Looms.png'
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
  if (!fs.existsSync('public/images')) {
    fs.mkdirSync('public/images', { recursive: true });
  }
  for (const [localName, wikiName] of Object.entries(files)) {
    try {
      console.log('Fetching URL for:', wikiName);
      const thumbUrl = await getThumbnail(wikiName);
      if (thumbUrl) {
        console.log('Downloading:', thumbUrl);
        await downloadImage(thumbUrl, 'public/images/' + localName);
        console.log('Successfully saved', localName);
      } else {
        console.log('Thumbnail not found for:', wikiName);
      }
      // Wait to avoid rate limits
      await new Promise(r => setTimeout(r, 1000));
    } catch (e) {
      console.error('Error for', localName, e.message);
    }
  }
}
run();
