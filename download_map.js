const https = require('https');
const fs = require('fs');

const url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Deutsches_Reich_%281871-1918%29-en.png/1280px-Deutsches_Reich_%281871-1918%29-en.png';
const file = fs.createWriteStream('./public/images/german_empire_1871.png');

const options = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
    'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
    'Referer': 'https://commons.wikimedia.org/'
  }
};

https.get(url, options, res => {
  if (res.statusCode !== 200) {
    console.error(`Failed to download image. Status code: ${res.statusCode}`);
    res.resume(); // consume response data to free up memory
    return;
  }
  res.pipe(file);
  file.on('finish', () => {
    file.close();
    console.log('Image downloaded successfully!');
  });
}).on('error', err => {
  console.error(`Error downloading image: ${err.message}`);
});
