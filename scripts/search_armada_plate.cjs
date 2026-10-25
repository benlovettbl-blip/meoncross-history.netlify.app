const https = require('https');

function searchCommons(query) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srlimit=5&format=json`;
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { 'User-Agent': 'HistoryRevisionHub/1.0 (educational research)' } }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on('error', reject);
  });
}

async function run() {
  const res1 = await searchCommons('Augustine Ryther Armada Gravelines');
  console.log('Ryther:', JSON.stringify(res1.query.search.map(s => s.title), null, 2));

  const res2 = await searchCommons('Hendrick Cornelisz Vroom Spanish Armada');
  console.log('Vroom:', JSON.stringify(res2.query.search.map(s => s.title), null, 2));
}

run();
