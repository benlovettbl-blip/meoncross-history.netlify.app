const https = require('https');

function searchYouTube(query) {
  return new Promise((resolve) => {
    const encoded = encodeURIComponent(query);
    const options = {
      hostname: 'www.youtube.com',
      path: '/results?search_query=' + encoded,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9'
      }
    };
    https.get(options, (res) => {
      let html = '';
      res.on('data', chunk => html += chunk);
      res.on('end', () => {
        const matches = [];
        const regex = /"videoId":"([a-zA-Z0-9_-]{11})".*?"title":\{"runs":\[\{"text":"(.*?)"\}/g;
        let m;
        while ((m = regex.exec(html)) !== null && matches.length < 5) {
          matches.push({ id: m[1], title: m[2] });
        }
        resolve(matches);
      });
    }).on('error', () => resolve([]));
  });
}

function checkOembed(id) {
  return new Promise((resolve) => {
    const url = 'https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=' + id + '&format=json';
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const parsed = JSON.parse(data);
            resolve({ id, valid: true, title: parsed.title, author: parsed.author_name });
          } catch(e) {
            resolve({ id, valid: false });
          }
        } else {
          resolve({ id, valid: false });
        }
      });
    }).on('error', () => resolve({ id, valid: false }));
  });
}

async function run() {
  const queries = [
    'WW1 Medicine on the Western Front BBC Bitesize',
    'Trench Foot Thomas Splint WW1 Medicine',
    'The Birth of the NHS 1948 BBC',
    '1917 movie official trailer'
  ];
  for (const q of queries) {
    const hits = await searchYouTube(q);
    console.log('\nQuery: ' + q);
    for (const h of hits) {
      const v = await checkOembed(h.id);
      if (v.valid) {
        console.log(`  ✅ ${v.id}: ${v.title} (${v.author})`);
      } else {
        console.log(`  ❌ ${h.id}`);
      }
    }
  }
}
run();
