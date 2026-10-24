const https = require('https');
const fs = require('fs');
const path = require('path');

const USER_AGENT =
  'TheHistoryRevisionHubEducation/1.0 (https://the-history-revision-hub.org; educational-bot@the-history-revision-hub.org) Node.js/24.16.0';

function downloadFile(fileUrl, destPath) {
  return new Promise((resolve, reject) => {
    https
      .get(fileUrl, { headers: { 'User-Agent': USER_AGENT } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return downloadFile(res.headers.location, destPath).then(resolve).catch(reject);
        }
        if (res.statusCode !== 200) {
          return reject(new Error('HTTP Status ' + res.statusCode + ' for ' + fileUrl));
        }
        const stream = fs.createWriteStream(destPath);
        res.pipe(stream);
        stream.on('finish', () => stream.close(resolve));
        stream.on('error', reject);
      })
      .on('error', reject);
  });
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const stagingDir = path.join(
  __dirname,
  '..',
  'public',
  'units',
  'usa',
  'assets',
  'sources',
  'staging',
);
if (!fs.existsSync(stagingDir)) {
  fs.mkdirSync(stagingDir, { recursive: true });
}

// Map of replacements to download
const downloads = [
  {
    name: 'greensboro-sit-in-counter.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/d/dc/Greensboro_Four.jpg',
  },
  {
    name: 'selma-troopers-bridge.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Bloody_Sunday-officers_await_demonstrators.jpeg',
  },
  {
    name: 'detroit-riot-guard-1967.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Sekai-1967-October-3.jpg',
  },
  {
    name: 'ngo-dinh-diem-parade.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Ngo_Dinh_Diem_at_Washington_-_ARC_542189.jpg',
  },
  {
    name: 'buddhist-protests-1963.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/38/Th%C3%ADch_Qu%E1%BA%A3ng_%C4%90%E1%BB%A9c_self-immolation.jpg',
  },
  {
    name: 'uss-maddox.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/USS_Maddox_%28DD-731%29_underway_at_sea%2C_circa_the_early_1960s_%28NH_97900%29.jpg',
  },
  {
    name: 'huey-helicopter-vietnam.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/UH-1D_helicopters_in_Vietnam_1966.jpg',
  },
  {
    name: 'general-westmoreland.jpg',
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e2/General_William_Westmoreland_and_President_Lyndon_B._Johnson_in_the_Oval_Office_-_NARA_-_192557.tif/lossy-page1-1920px-General_William_Westmoreland_and_President_Lyndon_B._Johnson_in_the_Oval_Office_-_NARA_-_192557.tif.jpg',
  },
];

(async () => {
  console.log('Downloading high-priority verified replacements into staging...');
  for (const item of downloads) {
    const dest = path.join(stagingDir, item.name);
    try {
      console.log(`Downloading ${item.name} ...`);
      await delay(1200);
      await downloadFile(item.url, dest);
      const stat = fs.statSync(dest);
      console.log(` ✔ Saved ${item.name} (${(stat.size / 1024).toFixed(1)} KB)`);
    } catch (e) {
      console.error(` ✖ Failed ${item.name}: ${e.message}`);
    }
  }
})();
