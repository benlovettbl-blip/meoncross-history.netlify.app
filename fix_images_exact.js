const fs = require('fs');
const path = require('path');

const searches = [
  { term: "File:Map_Europe_alliances_1914-en.svg", filename: "gw_alliance_map.jpg" }
];

const destDir = path.join(__dirname, 'public', 'images');
const USER_AGENT = 'MeoncrossHistoryApp/1.0 (https://meoncross-history.netlify.app; contact@meoncross.school)';

async function fetchJSON(url) {
    const response = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
    if (!response.ok) throw new Error(`API returned ${response.status} ${response.statusText}`);
    return await response.json();
}

async function downloadImage(url, filepath) {
    const response = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
    if (!response.ok) {
        throw new Error(`Failed to download image: ${response.status} ${response.statusText}`);
    }
    const buffer = await response.arrayBuffer();
    fs.writeFileSync(filepath, Buffer.from(buffer));
}

async function searchAndDownload(searchObj) {
  try {
      console.log(`Searching Wikimedia API for exact title: "${searchObj.term}"...`);
      // Use titles= instead of generator=search
      const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(searchObj.term)}&prop=pageimages&pithumbsize=500&format=json`;
      
      const data = await fetchJSON(searchUrl);
      const pages = data.query?.pages;
      
      if (!pages || Object.keys(pages)[0] === "-1") {
          console.error(`❌ No image found for title: "${searchObj.term}"`);
          return false;
      }

      const pageWithThumb = Object.values(pages)[0];
      
      if (!pageWithThumb.thumbnail) {
          console.error(`❌ No image thumbnail found for title: "${searchObj.term}"`);
          return false;
      }

      const imageUrl = pageWithThumb.thumbnail.source;
      const outputPath = path.join(destDir, searchObj.filename);
      
      await downloadImage(imageUrl, outputPath);
      console.log(`✅ Downloaded: ${searchObj.filename}`);
      return true;
  } catch (err) {
      console.error(`❌ Error on ${searchObj.term}:`, err.message);
      return false;
  }
}

async function run() {
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
  for (const s of searches) {
    await searchAndDownload(s);
  }
  console.log("Done fetching exact images.");
}

run();
