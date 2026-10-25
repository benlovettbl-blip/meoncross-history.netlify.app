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
  const queries = [
    { name: 'Canterbury waterworks', q: 'Canterbury waterworks plan Eadwine' },
    { name: 'King Cholera', q: 'Court for King Cholera Punch 1852' },
    { name: 'Chadwick report', q: 'Edwin Chadwick Report Sanitary Condition' },
    { name: 'Father Thames', q: 'Father Thames Introducing His Offspring Punch' },
    { name: 'Bill of mortality', q: 'London Bill of Mortality 1665' },
    { name: 'Pepys diary', q: 'Samuel Pepys diary manuscript shorthand' }
  ];

  for (const item of queries) {
    const res = await searchWikiFiles(item.q);
    console.log(`\nResults for ${item.name} (${item.q}):`);
    if (res.query && res.query.search) {
      res.query.search.slice(0, 4).forEach(s => console.log(' - ' + s.title));
    }
  }
})();
