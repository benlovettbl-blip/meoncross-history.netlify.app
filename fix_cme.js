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

async function fetchWikipediaImage(search, destPath) {
    const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(search)}&prop=pageimages&format=json&pithumbsize=800`;
    const res = await fetch(apiUrl, { headers: { 'User-Agent': 'LovettHistoryHub/1.0' } });
    const data = await res.json();
    const pages = data.query.pages;
    const pageId = Object.keys(pages)[0];
    
    if (pageId !== '-1' && pages[pageId].thumbnail) {
        const imageUrl = pages[pageId].thumbnail.source;
        console.log(`Found image for ${search}: ${imageUrl}`);
        await downloadImage(imageUrl, destPath);
        return true;
    }
    console.log(`No image found for ${search}`);
    return false;
}

async function fixCme() {
    const imagesDir = path.join(__dirname, 'public', 'images');
    const dataPath = path.join(__dirname, 'public', 'units', 'cme_new', 'data.js');
    let content = fs.readFileSync(dataPath, 'utf8');
    
    console.log('Fetching broken hotlinks via API...');
    await fetchWikipediaImage('Western Wall', path.join(imagesDir, 'paratroopers_western_wall.jpg'));
    await fetchWikipediaImage('Fouga CM.170 Magister', path.join(imagesDir, 'fouga_magister_iaf.jpg'));
    
    content = content.replace(
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Paratroopers_at_Western_Wall.jpg/500px-Paratroopers_at_Western_Wall.jpg',
        '/images/paratroopers_western_wall.jpg'
    );
    content = content.replace(
        'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Fouga_Magister_IAF_in_flight.jpg/500px-Fouga_Magister_IAF_in_flight.jpg',
        '/images/fouga_magister_iaf.jpg'
    );
    console.log('Replaced broken hotlinks in data.js');
    
    console.log('Fetching cover image for Camp David Accords...');
    if (await fetchWikipediaImage('Camp David Accords', path.join(imagesDir, 'cme_cover.jpg'))) {
        // Update cover_image in data.js
        content = content.replace(
            /"cover_image"\s*:\s*".*?",/,
            `"cover_image": "/images/cme_cover.jpg",`
        );
        // Add cover caption
        content = content.replace(
            /("title"\s*:\s*"Conflict in the Middle East.*?"),/,
            `$1,\n  "cover_caption": "Camp David Accords",`
        );
        console.log('Injected cover image into data.js');
    }
    
    fs.writeFileSync(dataPath, content);
    console.log('Done!');
}

fixCme();
