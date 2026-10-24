const https = require('https');

function verifyOembed(videoId) {
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
              resolve({ valid: false, status: res.statusCode });
            }
          });
        },
      )
      .on('error', () => resolve({ valid: false }));
  });
}

function fetchDuration(videoId) {
  return new Promise((resolve) => {
    https
      .get(
        `https://www.youtube.com/watch?v=${videoId}`,
        { headers: { 'User-Agent': 'Mozilla/5.0' } },
        (res) => {
          let data = '';
          res.on('data', (chunk) => (data += chunk));
          res.on('end', () => {
            const durMatch = data.match(/"approxDurationMs":"(\d+)"/);
            if (durMatch) {
              const sec = Math.round(parseInt(durMatch[1], 10) / 1000);
              const m = Math.floor(sec / 60);
              const s = sec % 60;
              resolve(`${m} mins ${s < 10 ? '0' : ''}${s} secs (${sec}s)`);
            } else {
              resolve('Unknown duration');
            }
          });
        },
      )
      .on('error', () => resolve('Unknown duration'));
  });
}

const testIds = [
  // L3 alternatives
  'ylOpide9dus', // Crash Course #35
  'mcbI1WADkt0', // Rosa Parks and the Bus Seat

  // L4 alternatives
  '2vxRVCj9Unc', // Civil Rights Act of 1957
  'hX48jX7P1uQ', // KKK Civil Rights

  // L15 alternatives
  'mfBTw2UejO0', // I'm Stuck Episode 37 Paris Peace Agreement
  'k3SfcSageUk', // NBCUniversal Fall of Saigon
  '9qMysvID8lQ', // PennLive Fall of Saigon

  // L16 alternatives
  '44sQV3x2FxE', // WarFronts Why US lost
  'OiqTffD5U2I', // Captivating History Why US went to war & got defeated
];

async function main() {
  for (const id of testIds) {
    const v = await verifyOembed(id);
    if (v.valid) {
      const dur = await fetchDuration(id);
      console.log(`[${id}] ${dur} | "${v.title}" (${v.author})`);
    } else {
      console.log(`[${id}] INVALID (status ${v.status})`);
    }
  }
}

main().catch(console.error);
