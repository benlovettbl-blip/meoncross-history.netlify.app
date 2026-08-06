const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const biosPath = path.join(__dirname, 'early_modern_world', 'biographies.json');
const targetDir = path.join(__dirname, 'public', 'images', 'individuals');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

let biographies = JSON.parse(fs.readFileSync(biosPath, 'utf8'));

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

const overrideSearch = {
  "King Charles I": "Charles I of England",
  "Queen Elizabeth I": "Elizabeth I",
  "King Philip II": "Philip II of Spain",
  "Martin Luther": "Martin Luther",
  "Sir Thomas Roe": "Thomas Roe",
  "Olaudah Equiano": "Olaudah Equiano",
  "Francis Drake": "Francis Drake",
  "Oliver Cromwell": "Oliver Cromwell",
  "Chief Powhatan": "Powhatan",
  "Emperor Jahangir": "Jahangir",
  "John Hawkins": "John Hawkins (naval commander)",
  "King George II": "George II of Great Britain",
  "Thomas Thistlewood": "Thomas Thistlewood",
  "Martin Noell": "Martin Noell",
  "Mary, Queen of Scots": "Mary, Queen of Scots",
  "Niccolò Barbaro": "Niccolò Barbaro",
  "John Rolfe": "John Rolfe"
};

async function run() {
  let updatedCount = 0;
  for (let person of biographies) {
    let needsFetch = false;
    if (!person.image || person.image === "") {
        needsFetch = true;
    } else {
        const fullPath = path.join(__dirname, 'public', person.image);
        if (!fs.existsSync(fullPath) || fs.statSync(fullPath).size < 2000) {
            needsFetch = true;
        }
    }

    if (needsFetch) {
      console.log(`Attempting to fetch image for: ${person.name}`);
      let searchName = overrideSearch[person.name] || person.name;
      
      const imgUrl = await fetchWikiImage(searchName);
      if (imgUrl) {
        const cleanName = person.name.toLowerCase().replace(/[^a-z0-9]/g, '_').replace(/_+/g, '_').replace(/_$/, '');
        const ext = path.extname(new URL(imgUrl).pathname) || '.jpg';
        const filename = `${cleanName}${ext}`;
        const filepath = path.join(targetDir, filename);
        
        console.log(`Downloading ${imgUrl} to ${filename} via curl...`);
        try {
          execSync(`curl -sL -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" "${imgUrl}" -o "${filepath}"`);
          if (fs.existsSync(filepath) && fs.statSync(filepath).size > 2000) {
             person.image = `/images/individuals/${filename}`;
             updatedCount++;
             console.log(`Success: ${person.image}`);
          } else {
             console.log(`Download failed or file too small for ${person.name}`);
             if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
             person.image = "";
          }
        } catch (e) {
          console.error(`Curl error for ${person.name}:`, e.message);
          person.image = "";
        }
      } else {
        console.log(`No Wikipedia thumbnail found for ${searchName}`);
        person.image = "";
      }
      console.log("Waiting 3 seconds...");
      await new Promise(r => setTimeout(r, 3000));
    }
  }
  
  fs.writeFileSync(biosPath, JSON.stringify(biographies, null, 2));
  console.log(`Finished checking all profiles. Updated biographies.json`);
}

run();
