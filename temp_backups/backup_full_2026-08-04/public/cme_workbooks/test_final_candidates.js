const https = require('https');

const finalCandidates = [
  { topic: 'subtopic_1_3', id: 'k-gQJ5vM-1Q', desc: 'Unpacked Suez' },
  { topic: 'subtopic_2_1', id: 'kY2H729B96c', desc: 'Unpacked Six Day War' },
  { topic: 'subtopic_2_3', id: 'kXoYn_79q80', desc: 'Unpacked Yom Kippur War' },
  { topic: 'subtopic_3_1', id: 'F01L8wL57iQ', desc: 'Unpacked Camp David' },
  { topic: 'subtopic_3_2', id: '1u3C4iV-b_E', desc: 'Unpacked First Intifada' },
  { topic: 'subtopic_3_3', id: 'TDHYHuGFnao', desc: 'Unpacked Oslo Accords' }
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
            console.log(`OK [${cand.topic}] [${cand.desc}]: ID=${cand.id} -> "${json.title}" by ${json.author_name}`);
          } catch (e) {
            console.log(`PARSE ERROR [${cand.topic}] [${cand.desc}]: ID=${cand.id}`);
          }
        } else {
          console.log(`FAILED [${cand.topic}] [${cand.desc}]: ID=${cand.id} (Status ${res.statusCode})`);
        }
        resolve();
      });
    }).on('error', (err) => {
      console.log(`ERROR [${cand.topic}] [${cand.desc}]: ID=${cand.id} (${err.message})`);
      resolve();
    });
  });
}

async function run() {
  console.log("Testing new final YouTube video candidates...");
  for (const cand of finalCandidates) {
    await checkCandidate(cand);
    await new Promise(resolve => setTimeout(resolve, 300));
  }
}

run();
