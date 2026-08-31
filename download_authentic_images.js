const https = require('https');
const fs = require('fs');
const path = require('path');

const filesToFetch = [
  { title: "File:Rabbi Goren at the Western Wall - June 1967.jpg", filename: "cme_wailing_wall_1967.jpg" },
  { title: "File:Nasser Smile.jpg", filename: "nasser_1958.jpg" },
  { title: "File:PikiWiki Israel 38826 Ariel Sharon.jpg", filename: "sharon_yom_kippur.jpg" },
  { title: "File:Fumee sur port-said P1120288.jpg", filename: "cme_port_said.jpg" }
];

const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

async function fetchThumbnailUrl(title) {
  return new Promise((resolve) => {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=imageinfo&iiprop=url&iiurlwidth=800&format=json`;
    https.get(url, { headers: { 'User-Agent': USER_AGENT } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query.pages;
          const pageId = Object.keys(pages)[0];
          if (pages[pageId] && pages[pageId].imageinfo && pages[pageId].imageinfo[0].thumburl) {
            resolve(pages[pageId].imageinfo[0].thumburl);
          } else {
            resolve(null);
          }
        } catch (e) {
          resolve(null);
        }
      });
    });
  });
}

async function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(__dirname, 'public', 'images', filename);
    const file = fs.createWriteStream(filePath);
    https.get(url, { headers: { 'User-Agent': USER_AGENT } }, (res) => {
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(filePath);
      });
    }).on('error', (err) => {
      fs.unlink(filePath, () => reject(err));
    });
  });
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  for (const item of filesToFetch) {
    console.log(`Finding URL for ${item.title}...`);
    const url = await fetchThumbnailUrl(item.title);
    if (url) {
      console.log(`Downloading from ${url}`);
      await downloadImage(url, item.filename);
      console.log(`Saved as ${item.filename}`);
      
      // verify it's not HTML
      const buf = fs.readFileSync(path.join(__dirname, 'public', 'images', item.filename));
      if (buf.toString().includes('<!DOCTYPE') || buf.toString().includes('<html')) {
          console.error(`ERROR: Downloaded file for ${item.filename} is HTML!`);
      } else {
          console.log(`Verified ${item.filename} is not HTML.`);
      }
    } else {
      console.log(`Failed to find URL for ${item.title}`);
    }
    await sleep(2000); // Prevent rate limiting
  }
}

main();
