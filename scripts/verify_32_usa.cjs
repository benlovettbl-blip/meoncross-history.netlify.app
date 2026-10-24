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

const list = [
  // L1
  'rYynBR7heVQ',
  'SYiI7j6GW68',
  // L2
  'auATIIhUXVU',
  'jRYK4RWyUAo',
  // L3
  'mggfF3gwYAE',
  '_omQ841ZAWg',
  // L4
  'AZYuNA8yZ1U',
  'S64zRnnn4Po',
  // L5
  '1zBY6gkpbTg',
  'F624q1jBd0Y',
  // L6
  'TLberHUJgHY',
  'Vd6D64Ai49I',
  // L7
  '6UBOl5Yq-ms',
  '8woU9Rq0cPI',
  // L8
  '6dlmBco7zsc',
  'OX33xb8kbpA',
  // L9
  '44cnzhzcYjs',
  '028fwjzsAOc',
  // L10
  'crALHjTiXbk',
  'gMhx8R7IL8M',
  // L11
  'huRWshoW7T8',
  'XsLE6EtrvhM',
  // L12
  'JUzTdiaiHhQ',
  'n4fzowrmYh8',
  // L13
  'ydo1TLuOHiY',
  '9Pwro3vCUdU',
  // L14
  'Hqz0i83Jqxg',
  'CYjxP7un91U',
  // L15
  'gWVObXZzLH0',
  'R5p2tE5oR_M',
  // L16
  'XMLZamqVifg',
  'zAq6MrYgLr0',
];

async function main() {
  for (let i = 0; i < list.length; i++) {
    const id = list[i];
    const lesson = Math.floor(i / 2) + 1;
    const v = await verifyOembed(id);
    if (v.valid) {
      const dur = await fetchDuration(id);
      console.log(`L${lesson} [${id}] ${dur} | "${v.title}" (${v.author})`);
    } else {
      console.log(`L${lesson} [${id}] INVALID! Status: ${v.status}`);
    }
  }
}

main().catch(console.error);
