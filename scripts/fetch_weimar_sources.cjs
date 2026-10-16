const https = require('https');
const fs = require('fs');
const path = require('path');

const userAgent =
  'RevisionHubEducationalApp/2.0 (contact: admin@revisionhub.internal; educational research) Node.js';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWikiThumbnail(pageTitle) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(pageTitle)}&prop=pageimages&format=json&pithumbsize=600`;
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { 'User-Agent': userAgent } }, (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            if (data.startsWith('You are making too many requests')) {
              return reject(new Error('Rate limited by Wikimedia'));
            }
            const json = JSON.parse(data);
            const pages = json.query?.pages;
            if (!pages) return resolve(null);
            const firstKey = Object.keys(pages)[0];
            const page = pages[firstKey];
            if (page && page.thumbnail && page.thumbnail.source) {
              resolve({
                title: page.title,
                thumbnailUrl: page.thumbnail.source,
                width: page.thumbnail.width,
                height: page.thumbnail.height,
              });
            } else {
              resolve(null);
            }
          } catch (e) {
            reject(e);
          }
        });
      })
      .on('error', reject);
  });
}

async function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { 'User-Agent': userAgent } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return downloadFile(res.headers.location, destPath).then(resolve).catch(reject);
        }
        if (res.statusCode !== 200) {
          return reject(new Error(`Failed to download ${url}: status code ${res.statusCode}`));
        }
        const file = fs.createWriteStream(destPath);
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      })
      .on('error', reject);
  });
}

const targets = [
  { wikiTitle: 'League of Nations', filename: 'league_of_nations_geneva_1926.jpg' },
  {
    wikiTitle: '25-point program',
    filename: 'nazi_25_point_programme_1920.jpg',
    fallbackWiki: 'National Socialist Program',
  },
  { wikiTitle: 'Machtergreifung', filename: 'torchlight_parade_berlin_1933.jpg' },
  { wikiTitle: 'Reichskonkordat', filename: 'reichskonkordat_signing_1933.jpg' },
  { wikiTitle: 'Volksempfänger', filename: 'volksempfaenger_radio_1933.jpg' },
  { wikiTitle: '1936 Summer Olympics', filename: 'berlin_olympics_1936.jpg' },
  { wikiTitle: 'Hitler Youth', filename: 'hitler_youth_march_1930s.jpg' },
  { wikiTitle: 'Nazi boycott of Jewish businesses', filename: 'anti_jewish_boycott_1933.jpg' },
  { wikiTitle: 'Nuremberg Laws', filename: 'nuremberg_laws_chart_1935.jpg' },
  { wikiTitle: 'Strength Through Joy', filename: 'kdf_cruise_ship_1938.jpg' },
  { wikiTitle: 'Regnans in Excelsis', filename: 'regnans_in_excelsis_1570.jpg' },
  { wikiTitle: 'Book of Common Prayer', filename: 'book_of_common_prayer_1559.jpg' },
  { wikiTitle: 'Speech to the Troops at Tilbury', filename: 'elizabeth_tilbury_speech.jpg' },
];

async function run() {
  const imagesDir = path.resolve(__dirname, '../public/images');
  console.log('Fetching remaining thumbnails and downloading to:', imagesDir);

  for (const t of targets) {
    const dest = path.join(imagesDir, t.filename);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
      console.log(`[EXISTS] ${t.filename} (${fs.statSync(dest).size} bytes)`);
      continue;
    }

    try {
      await sleep(1800); // 1.8 second delay between requests
      let res = await fetchWikiThumbnail(t.wikiTitle);
      if (!res && t.fallbackWiki) {
        console.log(`[RETRY] Falling back to "${t.fallbackWiki}" for ${t.filename}`);
        await sleep(1800);
        res = await fetchWikiThumbnail(t.fallbackWiki);
      }
      if (res && res.thumbnailUrl) {
        console.log(`[DOWNLOADING] ${t.filename} from ${res.thumbnailUrl.substring(0, 80)}...`);
        await sleep(1000);
        await downloadFile(res.thumbnailUrl, dest);
        const sz = fs.statSync(dest).size;
        console.log(`[SUCCESS] Saved ${t.filename} (${sz} bytes)`);
      } else {
        console.warn(`[NOT FOUND] No thumbnail found for ${t.wikiTitle}`);
      }
    } catch (e) {
      console.error(`[ERROR] Failed ${t.filename}:`, e.message);
    }
  }
  console.log('Done downloading thumbnails!');
}

run();
