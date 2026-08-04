const fs = require('fs');
const https = require('https');

function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'MeoncrossHistoryApp/1.0 (test4@test.com)' } }, (res) => {
      if (res.statusCode !== 200 && res.statusCode !== 301 && res.statusCode !== 302) {
        return reject(new Error('Failed to fetch image: ' + res.statusCode));
      }
      if (res.statusCode === 301 || res.statusCode === 302) {
          return downloadImage(res.headers.location, dest).then(resolve).catch(reject);
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', reject);
  });
}

function fetchWikiImage(name) {
  return new Promise((resolve, reject) => {
    const url = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${encodeURIComponent(name)}`;
    https.get(url, { headers: { 'User-Agent': 'MeoncrossHistoryApp/1.0 (test4@test.com)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query.pages;
          const pageId = Object.keys(pages)[0];
          if (pageId === '-1' || !pages[pageId].original) {
            resolve(null);
          } else {
            resolve(pages[pageId].original.source);
          }
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function processUnit(unit) {
  const bioPath = `${unit}/biographies.json`;
  if (!fs.existsSync(bioPath)) return;
  const bios = JSON.parse(fs.readFileSync(bioPath, 'utf8'));
  let updated = false;

  for (const person of bios) {
    if (!person.image) {
      console.log(`Fetching image for ${person.name}...`);
      
      let searchName = person.name;
      if (searchName === 'Count Leopold Berchtold') searchName = 'Count Leopold Berchtold';
      if (searchName === 'Alfred von Schlieffen') searchName = 'Alfred von Schlieffen';
      if (searchName === 'Yasser Arafat') searchName = 'Yasser Arafat';
      
      const imgUrl = await fetchWikiImage(searchName);
      if (imgUrl) {
        const ext = imgUrl.split('.').pop().toLowerCase();
        const cleanName = person.name.toLowerCase().replace(/[^a-z0-9]/g, '_');
        const fileName = `${cleanName}.${ext}`;
        const dest = `${unit}/assets/${fileName}`;
        
        console.log(`Downloading ${imgUrl} to ${dest}...`);
        await downloadImage(imgUrl, dest);
        
        person.image = `assets/${fileName}`;
        updated = true;
      } else {
        console.log(`No image found for ${person.name}`);
      }
      
      await new Promise(r => setTimeout(r, 1000));
    }
  }

  if (updated) {
    fs.writeFileSync(bioPath, JSON.stringify(bios, null, 2));
    console.log(`Updated ${bioPath}`);
  }
}

async function main() {
  await processUnit('great_war');
  await processUnit('cme_new');
}

main().catch(console.error);
