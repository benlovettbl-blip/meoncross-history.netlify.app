const https = require('https');

const queries = [
  { topic: 'Suez', query: 'The+1956+Suez+Crisis+History+Matters+youtube' },
  { topic: 'SixDayWar', query: 'Six+Day+War+Simple+History+youtube' },
  { topic: 'YomKippur', query: 'Yom+Kippur+War+documentary+youtube' },
  { topic: 'Intifada', query: 'First+Intifada+explained+youtube' }
];

function searchGoogle(q) {
  return new Promise((resolve) => {
    const url = `https://www.google.com/search?q=${q.query}`;
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Safari/537.36'
      }
    };
    https.get(url, options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        // Find all youtube watch links
        const regex = /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/g;
        const matches = [];
        let match;
        while ((match = regex.exec(data)) !== null) {
          matches.push(match[1]);
        }
        
        // Also check youtu.be format
        const regexBe = /youtu\.be\/([a-zA-Z0-9_-]{11})/g;
        while ((match = regexBe.exec(data)) !== null) {
          matches.push(match[1]);
        }
        
        const uniqueMatches = [...new Set(matches)];
        console.log(`Topic [${q.topic}] -> found ${uniqueMatches.length} video IDs:`, uniqueMatches);
        resolve({ topic: q.topic, ids: uniqueMatches });
      });
    }).on('error', (err) => {
      console.log(`Error searching for [${q.topic}]: ${err.message}`);
      resolve({ topic: q.topic, ids: [] });
    });
  });
}

async function run() {
  console.log("Searching Google for YouTube video IDs...");
  for (const q of queries) {
    await searchGoogle(q);
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

run();
