const https = require('https');
const fs = require('fs');
const path = require('path');

const imagesToFetch = [
  {
    title: 'Sykes–Picot Agreement',
    fileName: 'cme_sykes_picot_1916_map.jpg',
  },
  {
    title: 'Battle of Jerusalem (1917)',
    fileName: 'cme_allenby_jerusalem_1917.jpg',
  },
  {
    title: 'Balfour Declaration',
    fileName: 'cme_balfour_declaration_1917.jpg',
  },
];

async function fetchWikiImage(wikiTitle, targetFileName) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(wikiTitle)}&prop=pageimages&format=json&pithumbsize=800`;

  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        { headers: { 'User-Agent': 'HistoryHubEducationalBot/1.0 (educational app)' } },
        (res) => {
          let data = '';
          res.on('data', (chunk) => (data += chunk));
          res.on('end', () => {
            try {
              const json = JSON.parse(data);
              const pages = json.query.pages;
              const pageId = Object.keys(pages)[0];
              const page = pages[pageId];
              if (!page.thumbnail || !page.thumbnail.source) {
                console.warn(`No thumbnail found for ${wikiTitle}`);
                return resolve(false);
              }
              const thumbUrl = page.thumbnail.source;
              console.log(`Found image for "${wikiTitle}": ${thumbUrl}`);

              const destPath = path.join(__dirname, '..', 'public', 'images', targetFileName);
              const file = fs.createWriteStream(destPath);
              https
                .get(
                  thumbUrl,
                  { headers: { 'User-Agent': 'HistoryHubEducationalBot/1.0 (educational app)' } },
                  (dlRes) => {
                    if (dlRes.statusCode !== 200) {
                      console.error(`Download failed: HTTP ${dlRes.statusCode}`);
                      return resolve(false);
                    }
                    dlRes.pipe(file);
                    file.on('finish', () => {
                      file.close();
                      console.log(`Saved to public/images/${targetFileName}`);
                      resolve(true);
                    });
                  },
                )
                .on('error', reject);
            } catch (e) {
              console.error(`Error parsing JSON for ${wikiTitle}:`, e);
              resolve(false);
            }
          });
        },
      )
      .on('error', reject);
  });
}

(async () => {
  for (const item of imagesToFetch) {
    await fetchWikiImage(item.title, item.fileName);
  }
})();
