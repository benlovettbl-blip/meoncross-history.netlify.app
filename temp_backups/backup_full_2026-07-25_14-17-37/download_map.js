const https = require('https');
const fs = require('fs');

const url = 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Colonial_Africa_1914_map.png';
const dest = 'great_war/assets/map_africa_1914.png';

const options = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) MyBot/1.0 (contact@example.com)'
  }
};

https.get(url, options, (res) => {
  const file = fs.createWriteStream(dest);
  res.pipe(file);
  file.on('finish', () => {
    file.close();
    console.log('Download complete.');
  });
}).on('error', (err) => {
  console.error('Error downloading:', err.message);
});
