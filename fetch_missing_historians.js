const fs = require('fs');
const path = require('path');

const historiansMap = {
  "Kritovoulos of Imbros": "Kritoboulos of Imbros",
  "Dr. Geoffrey Parker": "Geoffrey Parker (historian)",
  "Sir John Seeley": "John Robert Seeley",
  "Prof. Christopher Hill": "Christopher Hill (historian)",
  "Reginald Coupland": "Reginald Coupland",
  "Prof. Roy Porter": "Roy Porter (medical historian)",
  "Prof. J.C.D. Clark": "J. C. D. Clark"
};

async function fetchMissing() {
  const imagesDir = path.join(__dirname, 'public', 'images');
  const dataFile = path.join(__dirname, 'early_modern_world', 'data.js');
  let content = fs.readFileSync(dataFile, 'utf8');

  for (const [name, wikiTitle] of Object.entries(historiansMap)) {
    console.log(`Fetching for ${name} using title ${wikiTitle}...`);
    const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(wikiTitle)}&prop=pageimages&format=json&pithumbsize=500`;
    
    await new Promise(r => setTimeout(r, 2000));
    
    try {
      const res = await fetch(apiUrl, { headers: { 'User-Agent': 'LovettHistoryHub/1.1 (lovett@example.com)' } });
      const data = await res.json();
      const pages = data.query.pages;
      const pageId = Object.keys(pages)[0];

      if (pageId !== '-1' && pages[pageId].thumbnail) {
        const imageUrl = pages[pageId].thumbnail.source;
        console.log(`Found image: ${imageUrl}`);
        
        const imgRes = await fetch(imageUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
        const buffer = await imgRes.arrayBuffer();
        
        const safeName = name.toLowerCase().replace(/[^a-z0-9]/g, '_');
        const filename = `${safeName}.jpg`;
        const dest = path.join(imagesDir, filename);
        
        fs.writeFileSync(dest, Buffer.from(buffer));
        console.log(`Saved as ${filename}`);
        
        // Update data.js
        // We need to inject "image": "/images/filename" into the object if it exists.
        // Or since it's already there maybe without image, we can just replace.
        // The safest way is to import it, update the object, and stringify.
      } else {
        console.log(`No image found on Wikipedia for ${wikiTitle}`);
      }
    } catch (err) {
      console.error(`Error for ${name}:`, err.message);
    }
  }
}
fetchMissing().catch(console.error);
