const https = require('https');
const fs = require('fs');
const path = require('path');

const searches = [
  { term: "Map Europe alliances 1914", filename: "gw_alliance_map.jpg" },
  { term: "Gavrilo Princip arrested", filename: "gw_gavrilo_princip.jpg" },
  { term: "flooded trench passchendaele", filename: "gw_flooded_trench.jpg" },
  { term: "trench diagram WWI", filename: "gw_trench_diagram.jpg" },
  { term: "Indian troops western front", filename: "gw_indian_army.jpg" },
  { term: "British West Indies Regiment", filename: "gw_bwir.jpg" },
  { term: "Women of Britain say Go", filename: "gw_women_say_go.jpg" },
  { term: "Munitionettes WWI", filename: "gw_munitionettes.jpg" },
  { term: "Big Four Versailles", filename: "gw_big_three_versailles.jpg" },
  { term: "Treaty of Versailles cartoon", filename: "gw_versailles_cartoon.jpg" },
  { term: "Thiepval Memorial", filename: "gw_thiepval.jpg" },
  { term: "Memorial Plaque WWI", filename: "gw_death_plaque.jpg" }
];

const destDir = path.join(__dirname, 'public', 'images');
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36';

async function searchAndDownload(searchObj) {
  return new Promise((resolve, reject) => {
    const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(searchObj.term)}&gsrnamespace=6&prop=imageinfo&iiprop=url&iiurlwidth=500&format=json`;
    
    https.get(searchUrl, { headers: { 'User-Agent': USER_AGENT } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query?.pages;
          if (!pages) {
            console.log(`No results for ${searchObj.term}`);
            return resolve(false);
          }
          const firstPage = Object.values(pages)[0];
          let thumbUrl = firstPage.imageinfo[0].thumburl || firstPage.imageinfo[0].url;
          
          if (!thumbUrl) {
             console.log(`No thumburl for ${searchObj.term}`);
             return resolve(false);
          }
          
          downloadImage(thumbUrl, path.join(destDir, searchObj.filename)).then(resolve).catch(reject);
        } catch (e) {
          console.error(`Error parsing JSON for ${searchObj.term}: ${e.message}`);
          resolve(false);
        }
      });
    }).on('error', reject);
  });
}

function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': USER_AGENT } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadImage(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        console.error(`Failed to download ${url}: ${res.statusCode}`);
        return resolve(false);
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          console.log(`Downloaded: ${path.basename(dest)}`);
          resolve(true);
        });
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  for (const s of searches) {
    await searchAndDownload(s);
  }
  console.log("Done fetching images.");
}

run();
