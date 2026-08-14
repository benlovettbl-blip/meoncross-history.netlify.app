const fs = require('fs');
const path = require('path');

async function downloadImage(url, dest) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'LovettHistoryHub/1.0 (lovett@example.com)'
    }
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buffer = await res.arrayBuffer();
  fs.writeFileSync(dest, Buffer.from(buffer));
}

async function fetchMap() {
  try {
    // Imperial_Federation is the article
    const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=Imperial_Federation&prop=pageimages&format=json&pithumbsize=1500`;
    const res = await fetch(apiUrl, { headers: { 'User-Agent': 'LovettHistoryHub/1.0' }});
    const response = await res.json();
    const pages = response.query.pages;
    const pageId = Object.keys(pages)[0];

    if (pageId !== '-1' && pages[pageId].thumbnail) {
      const imageUrl = pages[pageId].thumbnail.source;
      const filename = "imperial_federation_map.jpg";
      const dest = path.join(__dirname, 'public', 'images', filename);
      console.log(`Downloading high-res map from ${imageUrl}...`);
      await downloadImage(imageUrl, dest);

      // Now update data.js
      const dataFile = 'industrialisation_and_empire/data.js';
      let dataText = fs.readFileSync(dataFile, 'utf8');
      dataText = dataText.replace(/"cover_image": ".*?"/, `"cover_image": "/images/${filename}"`);
      fs.writeFileSync(dataFile, dataText);
      console.log("Updated data.js with new cover_image!");
    } else {
      console.log("Could not find thumbnail for Imperial Federation.");
    }
  } catch(e) {
    console.error(e);
  }
}

fetchMap();
