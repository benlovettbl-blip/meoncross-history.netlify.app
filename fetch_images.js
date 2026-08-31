const https = require('https');
const fs = require('fs');
const path = require('path');

const imagesToFetch = [
  { title: "Golda_Meir", filename: "golda_meir.jpg" },
  { title: "Yitzhak_Shamir", filename: "yitzhak_shamir.jpg" },
  { title: "Hussein_of_Jordan", filename: "king_hussein.jpg" },
  { title: "Oslo_Accords", filename: "oslo_handshake.jpg" }
];

async function fetchThumbnailUrl(title) {
  return new Promise((resolve, reject) => {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=500`;
    https.get(url, { headers: { 'User-Agent': 'AntigravityBot/1.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query.pages;
          const pageId = Object.keys(pages)[0];
          if (pages[pageId] && pages[pageId].thumbnail) {
            resolve(pages[pageId].thumbnail.source);
          } else {
            resolve(null);
          }
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(__dirname, 'public', 'images', filename);
    const file = fs.createWriteStream(filePath);
    https.get(url, { headers: { 'User-Agent': 'AntigravityBot/1.0' } }, (res) => {
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: ${res.statusCode}`));
      }
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

async function main() {
  for (const item of imagesToFetch) {
    try {
      console.log(`Fetching thumbnail for ${item.title}...`);
      const url = await fetchThumbnailUrl(item.title);
      if (url) {
        console.log(`Downloading ${url}...`);
        await downloadImage(url, item.filename);
        console.log(`Saved ${item.filename}`);
      } else {
        console.log(`No thumbnail found for ${item.title}`);
      }
    } catch (e) {
      console.error(`Error processing ${item.title}:`, e);
    }
  }
}

main();
