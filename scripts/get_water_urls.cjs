const https = require('https');
const fs = require('fs');
const path = require('path');

const targets = [
  {
    wikiTitle: 'File:Eadwine psalter - Waterworks in Canterbury.jpg',
    localFile: 'canterbury_waterworks_plan_1165.jpg'
  },
  {
    wikiTitle: 'File:Pepys diary shorthand.png',
    localFile: 'samuel_pepys_diary_manuscript_1660.png'
  },
  {
    wikiTitle: 'File:Bills of Mortality 1665.jpg',
    localFile: 'london_bill_of_mortality_1665.jpg'
  },
  {
    wikiTitle: 'File:A court for King Cholera Wellcome L0003001.jpg',
    localFile: 'court_for_king_cholera_1852.jpg'
  },
  {
    wikiTitle: 'File:Chadwick, Report...on...sanitary conditions... Wellcome L0008334.jpg',
    localFile: 'chadwick_sanitary_report_1842.jpg'
  },
  {
    wikiTitle: 'File:Father Thames introducing his offspring to the fair city of London.jpg',
    localFile: 'father_thames_punch_1858.jpg'
  }
];

async function getImageUrl(title) {
  const url = 'https://commons.wikimedia.org/w/api.php?action=query&titles=' + encodeURIComponent(title) + '&prop=imageinfo&iiprop=url|size|mime&format=json';
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'HistoryHubBot/1.0 (educational research)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const json = JSON.parse(data);
        const pages = json.query.pages;
        const pageId = Object.keys(pages)[0];
        if (pages[pageId].imageinfo && pages[pageId].imageinfo[0]) {
          resolve(pages[pageId].imageinfo[0]);
        } else {
          reject(new Error(`No imageinfo found for ${title}`));
        }
      });
    }).on('error', reject);
  });
}

(async () => {
  for (const t of targets) {
    try {
      const info = await getImageUrl(t.wikiTitle);
      console.log(`\nFound: ${t.localFile}`);
      console.log(`URL: ${info.url}`);
      console.log(`Dimensions: ${info.width}x${info.height}, Size: ${info.size} bytes`);
      t.url = info.url;
    } catch (err) {
      console.error(`Error fetching info for ${t.wikiTitle}:`, err.message);
    }
  }

  // Save manifest
  fs.writeFileSync(path.join(__dirname, 'water_replacements_manifest.json'), JSON.stringify(targets, null, 2), 'utf8');
  console.log('\nManifest saved to scripts/water_replacements_manifest.json');
})();
