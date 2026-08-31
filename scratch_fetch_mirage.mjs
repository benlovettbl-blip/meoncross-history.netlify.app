import fs from 'fs';
import path from 'path';

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

async function fetchMirage() {
  const imagesDir = path.join(process.cwd(), 'public', 'images');
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  const searchName = 'Dassault Mirage III'; // Mirage III Israel, Operation Focus
  const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(searchName)}&prop=pageimages&format=json&pithumbsize=500`;
  
  const options = {
    headers: { 'User-Agent': 'LovettHistoryHub/1.0' }
  };
  
  const res = await fetch(apiUrl, options);
  const response = await res.json();

  const pages = response.query.pages;
  const pageId = Object.keys(pages)[0];

  if (pageId !== '-1' && pages[pageId].thumbnail) {
    const imageUrl = pages[pageId].thumbnail.source;
    const dest = path.join(imagesDir, 'operation_focus_mirage.jpg');

    console.log(`Downloading image from ${imageUrl}...`);
    await downloadImage(imageUrl, dest);
    console.log("Successfully downloaded Mirage image.");
  } else {
    console.log("No Wikipedia image found for " + searchName);
    // fallback URL if Wikipedia API doesn't find one
    const fallbackUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mirage_IIICJ_759_IAF_Museum_Hatzerim_170114.jpg/500px-Mirage_IIICJ_759_IAF_Museum_Hatzerim_170114.jpg';
    const dest = path.join(imagesDir, 'operation_focus_mirage.jpg');
    console.log(`Downloading fallback image from ${fallbackUrl}...`);
    await downloadImage(fallbackUrl, dest);
    console.log("Successfully downloaded fallback Mirage image.");
  }
}

fetchMirage().catch(console.error);
