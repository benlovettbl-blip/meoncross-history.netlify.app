const https = require('https');
const fs = require('fs');
const path = require('path');

const filesToFetch = [
  { title: "File:PikiWiki Israel 38826 Ariel Sharon.jpg", filename: "sharon_yom_kippur.jpg" },
  { title: "File:6dayswar1.jpg", filename: "operation_focus_historic.jpg" }
];

async function fetchImageUrl(title) {
  return new Promise((resolve) => {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=imageinfo&iiprop=url&format=json`;
    https.get(url, { headers: { 'User-Agent': 'Bot/1.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query.pages;
          const pageId = Object.keys(pages)[0];
          if (pages[pageId] && pages[pageId].imageinfo && pages[pageId].imageinfo[0].url) {
            resolve(pages[pageId].imageinfo[0].url);
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
    https.get(url, { headers: { 'User-Agent': 'Bot/1.0' } }, (res) => {
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
  for (const item of filesToFetch) {
    const url = await fetchImageUrl(item.title);
    if (url) {
      console.log(`Downloading ${item.title} from ${url}`);
      await downloadImage(url, item.filename);
      console.log(`Saved as ${item.filename}`);
    } else {
      console.log(`Failed to find URL for ${item.title}`);
    }
  }
}

main();
