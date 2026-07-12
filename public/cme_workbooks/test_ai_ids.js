const https = require('https');

const candidates = [
  { id: 'R9K48jM6U18', desc: '1948 War' },
  { id: 'M5D-Y6Mh5Ww', desc: 'Suez Canal' }
];

function checkCandidate(cand) {
  return new Promise((resolve) => {
    const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${cand.id}&format=json`;
    
    https.get(oembedUrl, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const json = JSON.parse(data);
            console.log(`OK [${cand.desc}]: ID=${cand.id} -> "${json.title}" by ${json.author_name}`);
          } catch (e) {
            console.log(`PARSE ERROR [${cand.desc}]: ID=${cand.id}`);
          }
        } else {
          console.log(`FAILED [${cand.desc}]: ID=${cand.id} (Status ${res.statusCode})`);
        }
        resolve();
      });
    }).on('error', (err) => {
      console.log(`ERROR [${cand.desc}]: ID=${cand.id} (${err.message})`);
      resolve();
    });
  });
}

async function run() {
  console.log("Testing YouTube video candidates...");
  for (const cand of candidates) {
    await checkCandidate(cand);
    await new Promise(resolve => setTimeout(resolve, 300));
  }
}

run();
