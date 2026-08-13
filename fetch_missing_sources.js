const fs = require('fs');
const path = require('path');

const { execSync } = require('child_process');

async function downloadImage(url, dest) {
  try {
    const cmd = `curl.exe -s -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36" "${url}" -o "${dest}"`;
    execSync(cmd);
    
    // Check if the file is just an HTML error page
    const stats = fs.statSync(dest);
    if (stats.size < 1000) { // If it's less than 1KB, it's probably the HTML block page
      const content = fs.readFileSync(dest, 'utf8');
      if (content.includes('honor our robot policy') || content.includes('Request blocked')) {
        console.error(`  [X] Blocked by Wikimedia WAF (Robot Policy)`);
        fs.unlinkSync(dest); // Delete the bad file
        return false;
      }
    }
    return true;
  } catch (err) {
    console.error(`  [X] Failed to download using curl: ${err.message}`);
    return false;
  }
}

async function run() {
  const dbPath = path.join(__dirname, 'public', 'database.json');
  const imagesDir = path.join(__dirname, 'public', 'images');
  
  if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });
  
  const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  let missingImages = [];

  // Deep search for .jpg or .png references
  const extractImages = (obj, contextTitle) => {
    if (!obj) return;
    if (typeof obj === 'string') {
      if (obj.startsWith('/images/') && (obj.endsWith('.jpg') || obj.endsWith('.png'))) {
        missingImages.push({ src: obj, context: contextTitle });
      }
    } else if (Array.isArray(obj)) {
      obj.forEach(item => extractImages(item, contextTitle));
    } else if (typeof obj === 'object') {
      let title = obj.title || obj.name || contextTitle;
      Object.values(obj).forEach(val => extractImages(val, title));
    }
  };

  Object.values(db).forEach(unit => {
    extractImages(unit, unit.id);
  });

  // Deduplicate
  const uniqueMissing = [];
  const seen = new Set();
  for (const item of missingImages) {
    if (!seen.has(item.src)) {
      seen.add(item.src);
      uniqueMissing.push(item);
    }
  }

  console.log(`Found ${uniqueMissing.length} total image references.`);
  
  let downloadedCount = 0;
  
  for (const img of uniqueMissing) {
    const dest = path.join(__dirname, 'public', img.src);
    if (fs.existsSync(dest)) {
      // Already exists
      continue;
    }
    
    // Attempt to download from Wikipedia based on context/filename
    const basename = path.basename(img.src, path.extname(img.src));
    // E.g., "four_humours" -> "four humours"
    // Or if context is available, use context. E.g. "Source A: The Four Humours"
    let searchName = img.context ? img.context.replace(/Source [A-Z]:\s*/, '') : basename.replace(/_/g, ' ');
    if (searchName.length > 50) searchName = basename.replace(/_/g, ' '); // fallback if context is too long

    console.log(`Missing: ${img.src} | Searching Wikipedia for: "${searchName}"...`);
    
    let success = false;
    try {
      const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(searchName)}&prop=pageimages&format=json&pithumbsize=500`;
      await new Promise(r => setTimeout(r, 2500)); // Rate limiting (2.5 seconds)
      
      let res = await fetch(apiUrl, { headers: { 'User-Agent': 'LovettHistoryHub/2.0 (lovett@example.com)' } });
      let text = await res.text();
      if (!text.startsWith('{')) {
         console.log(`  [X] Wikipedia blocked request (HTML response). Waiting 5s...`);
         await new Promise(r => setTimeout(r, 5000));
         res = await fetch(apiUrl, { headers: { 'User-Agent': 'LovettHistoryHub/3.0 (test@example.com)' } });
         text = await res.text();
      }
      
      const data = JSON.parse(text);
      
      const pages = data?.query?.pages;
      if (!pages) continue;
      
      const pageId = Object.keys(pages)[0];
      if (pageId !== '-1' && pages[pageId].thumbnail) {
        const imageUrl = pages[pageId].thumbnail.source;
        console.log(`  -> Found thumbnail: ${imageUrl}`);
        success = await downloadImage(imageUrl, dest);
        if (success) downloadedCount++;
      } else {
        // Fallback: search using just the basename if context failed
        if (searchName !== basename.replace(/_/g, ' ')) {
          searchName = basename.replace(/_/g, ' ');
          console.log(`  -> Not found. Trying fallback search: "${searchName}"...`);
          const fbApiUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(searchName)}&prop=pageimages&format=json&pithumbsize=500`;
          await new Promise(r => setTimeout(r, 2500));
          
          let fbRes = await fetch(fbApiUrl, { headers: { 'User-Agent': 'LovettHistoryHub/2.0 (lovett@example.com)' } });
          let fbText = await fbRes.text();
          if (!fbText.startsWith('{')) {
             await new Promise(r => setTimeout(r, 5000));
             fbRes = await fetch(fbApiUrl, { headers: { 'User-Agent': 'LovettHistoryHub/3.0 (test@example.com)' } });
             fbText = await fbRes.text();
          }
          
          const fbData = JSON.parse(fbText);
          const fbPages = fbData?.query?.pages;
          const fbPageId = fbPages ? Object.keys(fbPages)[0] : '-1';
          
          if (fbPageId !== '-1' && fbPages[fbPageId].thumbnail) {
             const fbImageUrl = fbPages[fbPageId].thumbnail.source;
             console.log(`  -> Found fallback thumbnail: ${fbImageUrl}`);
             success = await downloadImage(fbImageUrl, dest);
             if (success) downloadedCount++;
          } else {
            console.log(`  [X] No Wikipedia image found.`);
          }
        } else {
          console.log(`  [X] No Wikipedia image found.`);
        }
      }
    } catch (err) {
      console.error(`  [X] Error searching Wikipedia: ${err.message}`);
    }
  }
  
  console.log(`Done! Successfully downloaded ${downloadedCount} new images.`);
}

run().catch(console.error);
