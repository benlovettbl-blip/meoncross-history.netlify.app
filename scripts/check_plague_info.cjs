const https = require('https');

function getFileInfo(title) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=imageinfo&iiprop=url|mime|size|comment&format=json`;
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { 'User-Agent': 'HistoryRevisionHub/1.0 (educational research; contact@the-history-revision-hub.netlify.app)' } }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    });
    req.on('error', reject);
  });
}

async function run() {
  const info1 = await getFileInfo('File:Plague -buboes.jpg');
  console.log('Plague -buboes:', JSON.stringify(info1, null, 2));

  const info2 = await getFileInfo('File:Plague bubo.jpg');
  console.log('Plague bubo:', JSON.stringify(info2, null, 2));
}

run();
