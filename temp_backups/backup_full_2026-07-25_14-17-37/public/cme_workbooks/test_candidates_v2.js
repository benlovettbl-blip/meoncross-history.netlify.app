const https = require('https');

const candidates = [
  { id: 'k-w4_g-l-3k', desc: 'First Intifada: Unpacked' },
  { id: 'F3P0t5s1d1c', desc: 'Six-Day War Part 1: Unpacked' },
  { id: '5V_dCq7uYxM', desc: 'Six-Day War Part 4: Unpacked' },
  { id: 'kYv9i4P31C0', desc: 'Six-Day War: Kings and Generals candidate' },
  { id: '5rT7J5q1y2s', desc: 'First Intifada candidate' }
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
  console.log("Checking candidate video status (Batch 2)...");
  for (const cand of candidates) {
    await test(cand);
    await new Promise(r => setTimeout(r, 200));
  }
}

run();
