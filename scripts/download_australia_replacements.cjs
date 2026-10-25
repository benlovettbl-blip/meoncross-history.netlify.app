const fs = require('fs');
const https = require('https');
const path = require('path');

const downloads = [
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Governor_Thomas_Davey_1816_proclamation_to_aborigines.jpg',
    target: path.join(__dirname, '..', 'public', 'images', 'governor_arthur_proclamation_board_1829.jpg')
  },
  {
    url: 'https://images.mhnsw.au/fotoweb/embed/2024/08/abf89e0645884c928ad3f23ea9f9b125.jpg',
    target: path.join(__dirname, '..', 'public', 'images', 'myall_creek_deposition_1838.jpg')
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Swearing_Allegiance_to_the_Southern_Cross%2C_1854%2C_Charles_A_Doudiet%2C_watercolour._Art_Gallery_of_Ballarat.jpg',
    target: path.join(__dirname, '..', 'public', 'images', 'doudiet_southern_cross_eureka_1854.jpg')
  }
];

function downloadFile(url, targetPath) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'HistoryHubBot/1.0 (educational research)' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, targetPath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed with HTTP ${res.statusCode} for ${url}`));
      }
      const fileStream = fs.createWriteStream(targetPath);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        const size = fs.statSync(targetPath).size;
        console.log(`Successfully downloaded ${path.basename(targetPath)} (${size} bytes)`);
        resolve(size);
      });
    }).on('error', reject);
  });
}

(async () => {
  for (const item of downloads) {
    try {
      console.log(`Downloading ${path.basename(item.target)} from ${item.url}...`);
      await downloadFile(item.url, item.target);
    } catch (err) {
      console.error(`Error downloading ${item.target}:`, err.message);
    }
  }
})();
