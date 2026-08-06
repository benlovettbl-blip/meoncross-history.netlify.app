const fs = require('fs');
const https = require('https');
const path = require('path');

const FILE_PATH = 'early_modern_world/data.js';
const IMAGES_DIR = 'public/images';

const searches = [
  { term: "Catalan_Atlas", filename: "early_mod_l1_banner.jpg" },
  { term: "Spanish_Armada", filename: "early_mod_l2_banner.jpg" },
  { term: "Fort_St._George_(India)", filename: "early_mod_l3_banner.jpg" },
  { term: "House_of_Commons_of_Great_Britain", filename: "early_mod_l4_banner.jpg" },
  { term: "Brooks_(slave_ship)", filename: "early_mod_l5_banner.jpg" },
  { term: "London_Bridge", filename: "early_mod_l6_banner.jpg" }
];

async function fetchImage(term, filename) {
  return new Promise((resolve) => {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${term}&prop=pageimages&format=json&pithumbsize=800`;
    https.get(url, { headers: { 'User-Agent': 'Antigravity/1.0 (test@test.com)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query.pages;
          const pageId = Object.keys(pages)[0];
          if (pages[pageId].thumbnail && pages[pageId].thumbnail.source) {
            const imgUrl = pages[pageId].thumbnail.source;
            const filePath = path.join(IMAGES_DIR, filename);
            const file = fs.createWriteStream(filePath);
            https.get(imgUrl, { headers: { 'User-Agent': 'Antigravity/1.0' } }, (imgRes) => {
              imgRes.pipe(file);
              file.on('finish', () => {
                file.close();
                console.log(`Downloaded ${filename} from ${imgUrl}`);
                resolve(`/images/${filename}`);
              });
            }).on('error', (err) => {
              fs.unlink(filePath, () => {});
              console.error(`Error downloading ${filename}: ${err.message}`);
              resolve(null);
            });
          } else {
            console.log(`No thumbnail found for ${term}`);
            resolve(null);
          }
        } catch (e) {
          console.error(`Error parsing JSON for ${term}:`, e);
          resolve(null);
        }
      });
    }).on('error', (err) => {
      console.error(`Error requesting Wikipedia API for ${term}:`, err.message);
      resolve(null);
    });
  });
}

async function run() {
  let content = fs.readFileSync(FILE_PATH, 'utf8');
  const prefix = 'export const unitData = ';
  const jsonStr = content.replace(prefix, '').trim().replace(/;$/, '');
  let unit = eval('(' + jsonStr + ')');

  for (let i = 0; i < 6; i++) {
    const imgUrl = await fetchImage(searches[i].term, searches[i].filename);
    if (imgUrl && unit.lessons[i]) {
      unit.lessons[i].banner = imgUrl;
      if (unit.lessons[i].narrative_blocks && unit.lessons[i].narrative_blocks.length > 0) {
        if (unit.lessons[i].narrative_blocks[0].images) {
          unit.lessons[i].narrative_blocks[0].images[0].image = imgUrl;
        }
      }
    }
  }

  const updatedContent = prefix + JSON.stringify(unit, null, 2) + ';\n';
  fs.writeFileSync(FILE_PATH, updatedContent, 'utf8');
  console.log("Successfully patched data.js with actual image URLs.");
}

run();
