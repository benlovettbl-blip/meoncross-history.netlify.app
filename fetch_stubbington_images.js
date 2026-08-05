const fs = require('fs');
const path = require('path');

const searches = [
  { term: "File:Wooden war memorial in the centre of Stubbington - geograph.org.uk - 2073507.jpg", filename: "stubbington_memorial_1.jpg" },
  { term: "File:Holy Rood, Stubbington, war memorial (1914-19) - geograph.org.uk - 3404189.jpg", filename: "stubbington_memorial_2.jpg" }
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
      const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(searchObj.term)}&prop=imageinfo&iiprop=url&iiurlwidth=500&format=json`;
      
      const data = await fetchJSON(searchUrl);
      const pages = data.query?.pages;
      
      if (!pages || Object.keys(pages)[0] === "-1") {
          console.error(`❌ No image found for title: "${searchObj.term}"`);
          return false;
      }

      const pageWithThumb = Object.values(pages)[0];
      
      if (!pageWithThumb.imageinfo || !pageWithThumb.imageinfo[0].thumburl) {
          console.error(`❌ No image thumbnail found for title: "${searchObj.term}"`);
          return false;
      }

      const imageUrl = pageWithThumb.imageinfo[0].thumburl;
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
