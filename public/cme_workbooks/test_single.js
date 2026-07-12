const https = require('https');

const id = 'mbc9ElB5vfQ';
const url = `https://www.youtube.com/watch?v=${id}`;

https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } }, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log(`Length: ${data.length} bytes`);
    const titleMatch = data.match(/<title>([^<]+)<\/title>/);
    console.log(`Title: ${titleMatch ? titleMatch[1] : 'None'}`);
    console.log(`Contains 'unavailable': ${data.includes('Video unavailable')}`);
  });
});
