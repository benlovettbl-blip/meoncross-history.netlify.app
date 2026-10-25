const https = require('https');

function searchCommons(query) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=8&prop=imageinfo&iiprop=url|mime|size&format=json`;
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { 'User-Agent': 'HistoryRevisionHub/1.0 (educational research; contact@the-history-revision-hub.netlify.app)' } }, res => {
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
  const res1 = await searchCommons('plague victim buboes 1497');
  if (res1.query && res1.query.pages) {
    Object.values(res1.query.pages).forEach(p => console.log(p.title, p.imageinfo ? p.imageinfo[0].url : ''));
  }

  const res2 = await searchCommons('Brunschwig plague 1497');
  if (res2.query && res2.query.pages) {
    Object.values(res2.query.pages).forEach(p => console.log(p.title, p.imageinfo ? p.imageinfo[0].url : ''));
  }
}

run();
