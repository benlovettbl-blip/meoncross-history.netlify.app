const fs = require('fs');
const path = require('path');
const https = require('https');

async function downloadImage(url, dest) {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Accept': 'image/avif,image/webp,*/*'
      }
    });
    if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
    const buffer = await res.arrayBuffer();
    fs.writeFileSync(dest, Buffer.from(buffer));
  } catch (err) {
    throw new Error(`Failed to download image: ${err.message}`);
  }
}

async function fetchImages() {
  const file = 'early_modern_world/data.js';
  const m = await import('./early_modern_world/data.js');
  const data = m.unitData || m.default || Object.values(m)[0];

  const imagesDir = path.join(__dirname, 'public', 'images');
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  let updatedCount = 0;

  for (const person of data.key_individuals) {
    if (person.image) continue; // Skip if already has an image

    // Optional: strip titles like "Prof. ", "Dr. ", "Sir " for better Wikipedia searching
    let searchName = person.name.replace(/^(Prof\.|Dr\.|Sir|King|Queen|Emperor|Pope)\s+/i, '');
    
    // Hardcoded overrides for better matching
    if (searchName === 'Peter Frankopan') searchName = 'Peter Frankopan';
    if (searchName === 'Shashi Tharoor') searchName = 'Shashi Tharoor';

    try {
      const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(searchName)}&prop=pageimages&format=json&pithumbsize=500`;
      
      await new Promise(r => setTimeout(r, 2000)); // sleep 2 seconds BEFORE fetch to avoid rate limiting
      
      const options = {
        headers: { 'User-Agent': 'LovettHistoryHub/1.0 (lovett@example.com)' }
      };
      
      const res = await fetch(apiUrl, options);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const response = await res.json();

      const pages = response.query.pages;
      const pageId = Object.keys(pages)[0];

      if (pageId !== '-1' && pages[pageId].thumbnail) {
        const imageUrl = pages[pageId].thumbnail.source;
        const ext = path.extname(imageUrl).split('?')[0] || '.jpg';
        // Create safe filename
        const safeName = person.name.toLowerCase().replace(/[^a-z0-9]/g, '_');
        const filename = `${safeName}${ext}`;
        const dest = path.join(imagesDir, filename);

        console.log(`Downloading image for ${person.name}...`);
        await downloadImage(imageUrl, dest);
        
        person.image = `/images/${filename}`;
        updatedCount++;
      } else {
        console.log(`No Wikipedia image found for ${searchName}`);
      }
    } catch (err) {
      console.error(`Error fetching for ${person.name}:`, err.message);
    }
  }

  if (updatedCount > 0) {
    const output = `export const unitData = ${JSON.stringify(data, null, 2)};`;
    fs.writeFileSync(file, output);
    console.log(`Successfully fetched and downloaded ${updatedCount} images!`);
  } else {
    console.log("No new images were added.");
  }
}

fetchImages().catch(console.error);
