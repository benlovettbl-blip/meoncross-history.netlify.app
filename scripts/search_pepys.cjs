const https = require('https');

async function searchWikiFiles(query) {
  const url = 'https://commons.wikimedia.org/w/api.php?action=query&list=search&srnamespace=6&srsearch=' + encodeURIComponent(query) + '&utf8=&format=json';
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'HistoryHubBot/1.0 (educational research)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

(async () => {
  const res = await searchWikiFiles('Pepys diary manuscript');
  console.log('Pepys results:', res.query.search.map(s => s.title));
})();
