const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const biosPath = path.join(__dirname, 'early_modern_world', 'biographies.json');
const targetDir = path.join(__dirname, 'public', 'images', 'individuals');
let biographies = JSON.parse(fs.readFileSync(biosPath, 'utf8'));

async function fetchWikiImage(query) {
  try {
    const res = await fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(query)}&prop=pageimages&format=json&pithumbsize=500&redirects=1`, {
      headers: { 'User-Agent': 'MeoncrossHistoryApp/1.0' }
    });
    const parsed = await res.json();
    const pages = parsed.query.pages;
    const pageId = Object.keys(pages)[0];
    if (pageId !== "-1" && pages[pageId].thumbnail) {
      return pages[pageId].thumbnail.source;
    }
  } catch (e) {}
  return null;
}

const overrideSearch = {
  "Professor Peter Frankopan": "Peter Frankopan",
  "Dr. Geoffrey Parker": "Geoffrey Parker (historian)",
  "Shashi Tharoor": "Shashi Tharoor",
  "Professor Christopher Hill": "Christopher Hill (historian)",
  "Professor Eric Williams": "Eric Williams",
  "Professor Roy Porter": "Roy Porter",
  "Professor J.C.D. Clark": "J. C. D. Clark",
  "Kritovoulos of Imbros": "Kritoboulos of Imbros"
};

async function run() {
  for (let person of biographies) {
    if (overrideSearch[person.name] && (!person.image || person.image === "")) {
      console.log(`Fetching image for: ${person.name}`);
      const imgUrl = await fetchWikiImage(overrideSearch[person.name]);
      if (imgUrl) {
        const cleanName = person.name.toLowerCase().replace(/[^a-z0-9]/g, '_').replace(/_+/g, '_').replace(/_$/, '');
        const ext = path.extname(new URL(imgUrl).pathname) || '.jpg';
        const filename = `${cleanName}${ext}`;
        const filepath = path.join(targetDir, filename);
        
        try {
          execSync(`curl -sL -A "Mozilla/5.0" "${imgUrl}" -o "${filepath}"`);
          if (fs.existsSync(filepath) && fs.statSync(filepath).size > 2000) {
             person.image = `/images/individuals/${filename}`;
             console.log(`Success: ${person.image}`);
          }
        } catch (e) {}
      }
      await new Promise(r => setTimeout(r, 2000));
    }
  }
  fs.writeFileSync(biosPath, JSON.stringify(biographies, null, 2));
  console.log(`Updated biographies.json with historian images.`);
}

run();
