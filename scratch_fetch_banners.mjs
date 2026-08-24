import fs from 'fs';
import path from 'path';
import https from 'https';

const queries = [
  { era: 'medieval', query: 'Tacuinum Sanitatis' },
  { era: 'renaissance', query: 'De humani corporis fabrica' },
  { era: '18th_19th', query: 'John Snow cholera map' }, 
  { era: 'modern', query: 'National Health Service Act 1946' }, 
  { era: 'western_front', query: 'Gassed (painting)' }
];

const destDir = 'C:/Projects/meoncross-history.netlify.app/public/images';

async function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'MeoncrossHistoryApp/1.0 (ben@meoncross.edu)' } }, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${res.statusCode}`));
        return;
      }
      const file = fs.createWriteStream(destPath);
      res.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', reject);
  });
}

async function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'MeoncrossHistoryApp/1.0 (ben@meoncross.edu)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch(e) { reject(new Error('Invalid JSON: ' + data.substring(0, 50))); }
      });
    }).on('error', reject);
  });
}

async function run() {
  for (const q of queries) {
    console.log(`Searching for: ${q.query}`);
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(q.query)}&utf8=&format=json`;
    try {
      const searchData = await fetchJson(searchUrl);
      if (!searchData.query || !searchData.query.search.length) {
        console.log(`  Not found: ${q.query}`);
        continue;
      }
      const title = searchData.query.search[0].title;
      console.log(`  Found page: ${title}`);
      
      const imageQueryUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=1000`;
      const imgData = await fetchJson(imageQueryUrl);
      
      const pages = imgData.query.pages;
      const pageId = Object.keys(pages)[0];
      if (pageId !== '-1' && pages[pageId].thumbnail) {
        const sourceUrl = pages[pageId].thumbnail.source;
        console.log(`  Image URL: ${sourceUrl}`);
        
        const ext = path.extname(new URL(sourceUrl).pathname) || '.jpg';
        const filename = `banner_medicine_${q.era}${ext}`;
        const destPath = path.join(destDir, filename);
        
        await downloadImage(sourceUrl, destPath);
        console.log(`  Saved to: /images/${filename}`);
      } else {
        console.log(`  No image found for page: ${title}`);
      }
    } catch(e) {
      console.error(e.message);
    }
    // Sleep to avoid rate limits
    await new Promise(r => setTimeout(r, 1000));
  }
}
run();
