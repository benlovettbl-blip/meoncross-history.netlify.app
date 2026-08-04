const https = require('https');
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('public/data/edexcel_medicine.json', 'utf8'));

async function checkUrl(url) {
  return new Promise(resolve => {
    https.get(url, { headers: { 'User-Agent': 'AntigravityIDE/1.0' } }, res => {
      resolve(res.statusCode);
    }).on('error', () => resolve(500));
  });
}

(async () => {
  for (let l of data.data.lessons) {
    if (l.starters) {
      for (let i = 0; i < l.starters.length; i++) {
        const s = l.starters[i];
        const status = await checkUrl(s.source);
        if (status !== 200) {
          console.log(`Broken: ${l.id} Source ${i} (${status}) - ${s.source}`);
        } else {
          console.log(`OK: ${l.id} Source ${i}`);
        }
      }
    }
  }
})();
