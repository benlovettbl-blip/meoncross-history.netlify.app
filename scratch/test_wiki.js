const https = require('https');

const titles = [
  'Four_temperaments',
  'Bloodletting',
  'Black_Death',
  'Andreas_Vesalius',
  'William_Harvey',
  'Great_Plague_of_London',
  'Louis_Pasteur',
  'Joseph_Lister',
  '1854_Broad_Street_cholera_outbreak',
  'Rosalind_Franklin',
  'Alexander_Fleming',
  'Polio_vaccine',
  'National_Health_Service',
  'Trench_warfare',
  'Trench_foot',
  'Poison_gas_in_World_War_I',
  'Royal_Army_Medical_Corps',
  'Thomas_splint'
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
    console.log(`${res.title}: ${res.url ? 'OK' : 'MISSING'}`);
  }
}
main();
