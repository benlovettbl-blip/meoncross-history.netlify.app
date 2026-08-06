const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const biosPath = path.join(__dirname, 'early_modern_world', 'biographies.json');
const targetDir = path.join(__dirname, 'public', 'images', 'individuals');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

let biographies = [];
if (fs.existsSync(biosPath)) {
  biographies = JSON.parse(fs.readFileSync(biosPath, 'utf8'));
}

async function fetchWikiImage(query) {
  try {
    const res = await fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(query)}&prop=pageimages&format=json&pithumbsize=500&redirects=1`, {
      headers: { 'User-Agent': 'MeoncrossHistoryApp/1.0 (school@meoncross.edu)' }
    });
    const parsed = await res.json();
    const pages = parsed.query.pages;
    const pageId = Object.keys(pages)[0];
    if (pageId !== "-1" && pages[pageId].thumbnail) {
      return pages[pageId].thumbnail.source;
    }
  } catch (e) {
    console.error("Error fetching URL for:", query, e);
  }
  return null;
}

async function run() {
  let updatedCount = 0;
  for (let person of biographies) {
    if (!person.image) {
      console.log(`Attempting to fetch image for: ${person.name}`);
      let searchName = person.name;
      // Adjust searches for better results if needed
      if (person.name === "King Charles I") searchName = "Charles I of England";
      if (person.name === "Queen Elizabeth I") searchName = "Elizabeth I";
      if (person.name === "King Philip II") searchName = "Philip II of Spain";
      if (person.name === "Martin Luther") searchName = "Martin Luther";
      if (person.name === "Sir Thomas Roe") searchName = "Thomas Roe";
      if (person.name === "Olaudah Equiano") searchName = "Olaudah Equiano";
      if (person.name === "Francis Drake") searchName = "Francis Drake";
      if (person.name === "Oliver Cromwell") searchName = "Oliver Cromwell";
      
      const imgUrl = await fetchWikiImage(searchName);
      if (imgUrl) {
        const cleanName = person.name.toLowerCase().replace(/[^a-z0-9]/g, '_').replace(/_+/g, '_').replace(/_$/, '');
        const ext = path.extname(new URL(imgUrl).pathname) || '.jpg';
        const filename = `${cleanName}${ext}`;
        const filepath = path.join(targetDir, filename);
        
        console.log(`Downloading ${imgUrl} to ${filename} via curl...`);
        try {
          execSync(`curl -sL -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" "${imgUrl}" -o "${filepath}"`);
          if (fs.existsSync(filepath) && fs.statSync(filepath).size > 1000) {
             person.image = `/images/individuals/${filename}`;
             updatedCount++;
             console.log(`Success: ${person.image}`);
          } else {
             console.log(`Download failed or file too small for ${person.name}`);
             if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
          }
        } catch (e) {
          console.error(`Curl error for ${person.name}:`, e.message);
        }
      } else {
        console.log(`No Wikipedia thumbnail found for ${searchName}`);
      }
      await new Promise(r => setTimeout(r, 500));
    }
  }
  
  if (updatedCount > 0) {
    fs.writeFileSync(biosPath, JSON.stringify(biographies, null, 2));
    console.log(`Updated ${updatedCount} profiles in biographies.json`);
  } else {
    console.log("No new images were updated.");
  }
}

run();
