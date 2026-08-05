const fs = require('fs');
const path = require('path');

const searches = [
  { term: "WWI map alliances 1914", filename: "gw_alliance_map.jpg" },
  { term: "Gavrilo Princip arrested", filename: "gw_gavrilo_princip.jpg" },
  { term: "Battle of Passchendaele mud", filename: "gw_flooded_trench.jpg" },
  { term: "trench diagram WWI", filename: "gw_trench_diagram.jpg" },
  { term: "Indian troops western front WWI", filename: "gw_indian_army.jpg" },
  { term: "British West Indies Regiment WWI", filename: "gw_bwir.jpg" },
  { term: "Women of Britain say Go", filename: "gw_women_say_go.jpg" },
  { term: "Munitionettes WWI", filename: "gw_munitionettes.jpg" },
  { term: "Big Four Versailles", filename: "gw_big_three_versailles.jpg" },
  { term: "Treaty of Versailles cartoon", filename: "gw_versailles_cartoon.jpg" },
  { term: "Thiepval Memorial", filename: "gw_thiepval.jpg" },
  { term: "Memorial Plaque WWI", filename: "gw_death_plaque.jpg" }
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
      console.log(`Searching Wikimedia API for: "${searchObj.term}"...`);
      const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(searchObj.term)}&prop=pageimages&pithumbsize=500&format=json`;
      
      const data = await fetchJSON(searchUrl);
      const pages = data.query?.pages;
      
      if (!pages) {
          console.error(`❌ No images found for search term: "${searchObj.term}"`);
          return false;
      }

      const pageWithThumb = Object.values(pages)
          .filter(p => p.thumbnail)
          .sort((a, b) => (a.index || 99) - (b.index || 99))[0];
      
      if (!pageWithThumb) {
          console.error(`❌ No image thumbnails found for search term: "${searchObj.term}"`);
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
  console.log("Done fetching images.");
}

run();
