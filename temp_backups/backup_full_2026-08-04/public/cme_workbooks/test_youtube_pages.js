const https = require('https');

const videoIds = [
  '2yBolHdMejM', // subtopic_1_1 (works)
  'wjysy7ONisA', // subtopic_1_2 (works)
  's5R-P_YhVbA', // subtopic_1_3 (failed oembed)
  'n74s5-9lS38', // subtopic_2_1 (failed oembed)
  'D3K9VJ6dhNQ', // subtopic_2_2 (works)
  'nN4M6k531e4', // subtopic_2_3 (failed oembed)
  'QxqHStC9hMI', // subtopic_3_1 (works)
  'kYJdJ-X0kLo', // subtopic_3_2 (failed oembed)
  'N1TXC9eQcJ4'  // subtopic_3_3 (works)
];

function checkPage(id) {
  return new Promise((resolve) => {
    const url = `https://www.youtube.com/watch?v=${id}`;
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } }, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        const isUnavailable = data.includes('Video unavailable') || data.includes('has been removed') || data.includes('is private');
        const titleMatch = data.match(/<title>([^<]+)<\/title>/);
        const title = titleMatch ? titleMatch[1].replace(' - YouTube', '') : 'Unknown';
        
        console.log(`ID ${id} -> Status: ${res.statusCode}, Title: "${title}", Unavailable check: ${isUnavailable}`);
        resolve();
      });
    }).on('error', (err) => {
      console.log(`ID ${id} -> Error: ${err.message}`);
      resolve();
    });
  });
}

async function run() {
  console.log("Checking YouTube pages...");
  for (const id of videoIds) {
    await checkPage(id);
    await new Promise(resolve => setTimeout(resolve, 500));
  }
}

run();
