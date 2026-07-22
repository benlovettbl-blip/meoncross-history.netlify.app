const https = require('https');

const titles = [
  'Western_Front_(World_War_I)',
  'Battle_of_the_Somme',
  'First_Battle_of_Ypres',
  'Battle_of_Arras_(1917)',
  'Battle_of_Passchendaele',
  'Marie_Curie',
  'Blood_transfusion'
];

async function checkTitle(title) {
  return new Promise((resolve, reject) => {
    https.get(`https://en.wikipedia.org/w/api.php?action=query&titles=${title}&prop=pageimages&format=json&pithumbsize=500`, { headers: { 'User-Agent': 'MeoncrossHistoryApp/1.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          const pages = parsed.query.pages;
          const pageId = Object.keys(pages)[0];
          if (pageId === '-1') resolve({ title, url: null });
          else if (pages[pageId].thumbnail) resolve({ title, url: pages[pageId].thumbnail.source });
          else resolve({ title, url: null });
        } catch (e) {
          resolve({ title, url: null });
        }
      });
    }).on('error', reject);
  });
}

async function main() {
  for (const t of titles) {
    const res = await checkTitle(t);
    console.log(`${res.title}: ${res.url ? res.url : 'MISSING'}`);
  }
}
main();
