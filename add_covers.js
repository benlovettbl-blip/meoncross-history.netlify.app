const fs = require('fs');
const path = require('path');
const https = require('https');

const unitsToUpdate = {
    'cold_war': {
        search: 'Berlin Wall',
        filename: 'cold_war_cover.jpg'
    },
    'edexcel_medicine': {
        search: 'Andreas Vesalius',
        filename: 'medicine_cover.jpg'
    },
    'post_war_britain': {
        search: 'Festival of Britain',
        filename: 'post_war_britain_cover.jpg'
    },
    'second_world_war': {
        search: 'The Blitz',
        filename: 'second_world_war_cover.jpg'
    },
    'the_shoah': {
        search: 'Auschwitz concentration camp',
        filename: 'shoah_cover.jpg'
    },
    'weimar_nazi_germany': {
        search: 'Reichstag building',
        filename: 'weimar_germany_cover.jpg'
    }
};

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

async function addCovers() {
  const imagesDir = path.join(__dirname, 'public', 'images');
  if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });

  for (const [unitId, info] of Object.entries(unitsToUpdate)) {
    const dataPath = path.join(__dirname, 'public', 'units', unitId, 'data.js');
    if (!fs.existsSync(dataPath)) {
        console.log(`Skipping ${unitId} - data.js not found`);
        continue;
    }

    try {
      const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(info.search)}&prop=pageimages&format=json&pithumbsize=800`;
      
      console.log(`Fetching info for ${unitId}: ${info.search}...`);
      await new Promise(r => setTimeout(r, 2000));
      
      const res = await fetch(apiUrl, { headers: { 'User-Agent': 'LovettHistoryHub/1.0' } });
      const data = await res.json();
      
      const pages = data.query.pages;
      const pageId = Object.keys(pages)[0];
      
      if (pageId !== '-1' && pages[pageId].thumbnail) {
        const imageUrl = pages[pageId].thumbnail.source;
        console.log(`Found image: ${imageUrl}`);
        
        const destPath = path.join(imagesDir, info.filename);
        await downloadImage(imageUrl, destPath);
        console.log(`Downloaded to ${info.filename}`);
        
        const relativePath = `/images/${info.filename}`;
        
        // Update data.js
        let content = fs.readFileSync(dataPath, 'utf8');
        if (!content.includes('cover_image')) {
            // Insert after title or type
            content = content.replace(/("title"\s*:\s*"[^"]+",)/, `$1\n  "cover_image": "${relativePath}",\n  "cover_caption": "${info.search}",`);
            fs.writeFileSync(dataPath, content);
            console.log(`Updated data.js for ${unitId}`);
        } else {
            console.log(`${unitId} already has cover_image property.`);
        }
      } else {
        console.log(`No image found for ${info.search}`);
      }
    } catch (e) {
      console.error(`Error processing ${unitId}: ${e.message}`);
    }
  }
  
  console.log('Finished updating covers.');
}

addCovers();
