const https = require('https');
const fs = require('fs');

const unit = JSON.parse(fs.readFileSync('data/weimar_nazi_germany.json', 'utf8'));

function checkId(id) {
  return new Promise((resolve) => {
    https.get('https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=' + id + '&format=json', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve({ id, status: res.statusCode, title: json.title, author: json.author_name });
        } catch (e) {
          resolve({ id, status: res.statusCode, title: null });
        }
      });
    }).on('error', () => resolve({ id, status: 500, title: null }));
  });
}

async function validateAll() {
  console.log('--- VALIDATING ALL WEIMAR YOUTUBE IDS ---');
  const results = [];
  for (let i = 0; i < unit.lessons.length; i++) {
    const l = unit.lessons[i];
    console.log(`\nLesson ${i + 1}: ${l.title}`);
    for (let v of l.video) {
      if (v.type === 'youtube') {
        const match = v.url.match(/v=([a-zA-Z0-9_-]+)/);
        if (match) {
          const res = await checkId(match[1]);
          console.log(`  [${res.status}] ${match[1]} -> ${res.title || 'INVALID / UNAVAILABLE'} (Target: ${v.title})`);
          results.push({ lesson: i + 1, ...res, targetTitle: v.title });
        }
      }
    }
  }

  const valid = results.filter(r => r.status === 200);
  const invalid = results.filter(r => r.status !== 200);
  console.log(`\nTOTAL: ${results.length} | VALID (200): ${valid.length} | INVALID (404/Err): ${invalid.length}`);
}

validateAll();
