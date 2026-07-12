const https = require('https');

const candidates = [
  // Suez
  { id: 'xICnObSHU0M', desc: 'Suez: History Matters' },
  { id: 's5R-P_YhVbA', desc: 'Suez: Old Unpacked' },
  // Six-Day War
  { id: 'kYv_3eN9i48', desc: 'Six-Day War: Unpacked candidate' },
  { id: '1oKcZnd9SqA', desc: 'Six-Day War: Kings and Generals' },
  { id: 'n74s5-9lS38', desc: 'Six-Day War: Old Unpacked' },
  // Yom Kippur
  { id: '82-lmGuTl_I', desc: 'Yom Kippur: Kings and Generals' },
  { id: 'nN4M6k531e4', desc: 'Yom Kippur: Old Unpacked' },
  // Camp David
  { id: 'mbc9ElB5vfQ', desc: 'Camp David: History Channel' },
  { id: 'QxqHStC9hMI', desc: 'Camp David: Old KKL-JNF' },
  // First Intifada
  { id: 'sW1m_rQ0e_U', desc: 'First Intifada: Unpacked candidate' },
  { id: 'kYJdJ-X0kLo', desc: 'First Intifada: Old Unpacked' },
  // Oslo
  { id: 'TDHYHuGFnao', desc: 'Oslo: Unpacked Rabin' },
  { id: 'N1TXC9eQcJ4', desc: 'Oslo: Old Unpacked Hamas' }
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
  console.log("Checking candidate video status...");
  for (const cand of candidates) {
    await test(cand);
    await new Promise(r => setTimeout(r, 200));
  }
}

run();
