const https = require('https');

function searchDDG(query) {
  return new Promise((resolve) => {
    const url = 'https://html.duckduckgo.com/html/?q=' + encodeURIComponent(query);
    https
      .get(
        url,
        {
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
          },
        },
        (res) => {
          let data = '';
          res.on('data', (chunk) => (data += chunk));
          res.on('end', () => {
            const regex = /(?:watch%3Fv%3D|watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/g;
            const matches = new Set();
            let m;
            while ((m = regex.exec(data)) !== null) {
              matches.add(m[1]);
            }
            resolve(Array.from(matches));
          });
        },
      )
      .on('error', () => resolve([]));
  });
}

async function verifyOembed(videoId) {
  return new Promise((resolve) => {
    https
      .get(
        `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`,
        (res) => {
          let data = '';
          res.on('data', (chunk) => (data += chunk));
          res.on('end', () => {
            if (res.statusCode === 200) {
              try {
                const j = JSON.parse(data);
                resolve({ valid: true, title: j.title, author: j.author_name });
              } catch (e) {
                resolve({ valid: false });
              }
            } else {
              resolve({ valid: false });
            }
          });
        },
      )
      .on('error', () => resolve({ valid: false }));
  });
}

async function main() {
  const ids = await searchDDG('site:youtube.com "Simple History" "Gulf of Tonkin"');
  console.log('Found IDs:', ids);
  for (const id of ids) {
    const v = await verifyOembed(id);
    if (v.valid) {
      console.log(`[${id}] "${v.title}" by ${v.author}`);
    }
  }
}

main().catch(console.error);
