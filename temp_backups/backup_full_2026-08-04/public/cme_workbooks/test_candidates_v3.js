const https = require('https');

const candidates = [
  { id: 'ud42QqmzM7o', desc: 'Six-Day War: Unpacked' },
  { id: 'G6zftP9yJy8', desc: 'First Intifada: Unpacked' },
  { id: 'hHqJ6pgdE-c', desc: 'Six-Day War: Kings and Generals' }
];

function test(cand) {
  return new Promise((resolve) => {
    const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${cand.id}&format=json`;
    https.get(oembedUrl, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const json = JSON.parse(data);
            console.log(`[PASS] ${cand.id} (${cand.desc}) -> "${json.title}" by ${json.author_name}`);
          } catch (e) {
            console.log(`[ERR] ${cand.id} (${cand.desc}) -> Parse error: ${e.message}`);
          }
        } else {
          console.log(`[FAIL] ${cand.id} (${cand.desc}) -> Status ${res.statusCode}`);
        }
        resolve();
      });
    }).on('error', (err) => {
      console.log(`[ERR] ${cand.id} (${cand.desc}) -> Network error: ${err.message}`);
      resolve();
    });
  });
}

async function run() {
  console.log("Checking candidate video status (Batch 3)...");
  for (const cand of candidates) {
    await test(cand);
    await new Promise(r => setTimeout(r, 200));
  }
}

run();
