const fs = require('fs');
const path = require('path');
const https = require('https');

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, { headers: { 'User-Agent': 'LovettHistoryHub/1.0' } }, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close(resolve);
        });
      } else {
        reject(new Error(`Failed to download, status code: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

async function fixRoses() {
  const imagesDir = path.join(__dirname, 'public', 'images');
  
  // Clean up broken files
  const badFiles = ['lancaster_rose.png', 'lancaster_rose.svg', 'york_rose.png', 'york_rose.svg'];
  for (const file of badFiles) {
    const p = path.join(imagesDir, file);
    if (fs.existsSync(p)) fs.unlinkSync(p);
  }

  // Fetch Red Rose
  console.log("Fetching Red Rose...");
  let res = await fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=Red_Rose_of_Lancaster&prop=pageimages&format=json&pithumbsize=500`, { headers: { 'User-Agent': 'LovettHistoryHub/1.0' } });
  let data = await res.json();
  let pages = data.query.pages;
  let pageId = Object.keys(pages)[0];
  if (pages[pageId].thumbnail) {
    await download(pages[pageId].thumbnail.source, path.join(imagesDir, 'lancaster_rose.png'));
    console.log("Saved lancaster_rose.png");
  }

  // Fetch White Rose
  console.log("Fetching White Rose...");
  res = await fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=White_Rose_of_York&prop=pageimages&format=json&pithumbsize=500`, { headers: { 'User-Agent': 'LovettHistoryHub/1.0' } });
  data = await res.json();
  pages = data.query.pages;
  pageId = Object.keys(pages)[0];
  if (pages[pageId].thumbnail) {
    await download(pages[pageId].thumbnail.source, path.join(imagesDir, 'york_rose.png'));
    console.log("Saved york_rose.png");
  }
}

fixRoses().catch(console.error);
