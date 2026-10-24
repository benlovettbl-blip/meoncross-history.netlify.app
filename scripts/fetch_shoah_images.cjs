const https = require('https');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const filesToFetch = [
  {
    title: 'File:German Jewish soldiers hold a Hanukkah celebration. Poland, 1916.jpg',
    target: path.join(ROOT, 'public/images/german_jewish_soldiers_hanukkah_1916.jpg'),
  },
  {
    title:
      'File:The fishing boat "Elisabeth" took part in the rescue of Danish Jews in 1943. Around 700 Jews fled trough Dragør harbour to neutral Sweden. - Flickr - Cederskjold Photo.jpg',
    target: path.join(ROOT, 'public/images/danish_rescue_boat_1943.jpg'),
  },
  {
    title: 'File:The Liberation of Bergen-belsen Concentration Camp, May 1945 BU5481.jpg',
    target: path.join(ROOT, 'public/images/bergen_belsen_liberation_british_1945.jpg'),
  },
  {
    title: 'File:Defendants in the dock at the Nuremberg Trials.jpg',
    target: path.join(ROOT, 'public/images/nuremberg_trial_defendants_dock_1945.jpg'),
  },
];

async function getImageUrl(fileTitle) {
  const url =
    'https://commons.wikimedia.org/w/api.php?action=query&titles=' +
    encodeURIComponent(fileTitle) +
    '&prop=imageinfo&iiprop=url&format=json';
  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        { headers: { 'User-Agent': 'HistoryRevisionHubBot/1.0 (educational resource compiler)' } },
        (res) => {
          let body = '';
          res.on('data', (chunk) => (body += chunk));
          res.on('end', () => {
            try {
              const json = JSON.parse(body);
              const pages = json.query.pages;
              const pageId = Object.keys(pages)[0];
              if (!pages[pageId].imageinfo || !pages[pageId].imageinfo[0]) {
                return reject(new Error('No imageinfo found in API response for ' + fileTitle));
              }
              const fileUrl = pages[pageId].imageinfo[0].url;
              resolve(fileUrl);
            } catch (e) {
              reject(e);
            }
          });
        },
      )
      .on('error', reject);
  });
}

function downloadFile(fileUrl, destPath) {
  return new Promise((resolve, reject) => {
    https
      .get(
        fileUrl,
        { headers: { 'User-Agent': 'HistoryRevisionHubBot/1.0 (educational resource compiler)' } },
        (res) => {
          if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
            return downloadFile(res.headers.location, destPath).then(resolve).catch(reject);
          }
          if (res.statusCode !== 200) {
            return reject(new Error('HTTP Status ' + res.statusCode));
          }
          const stream = fs.createWriteStream(destPath);
          res.pipe(stream);
          stream.on('finish', () => stream.close(resolve));
          stream.on('error', reject);
        },
      )
      .on('error', reject);
  });
}

(async () => {
  for (const item of filesToFetch) {
    try {
      console.log('Resolving URL for: ' + item.title);
      const url = await getImageUrl(item.title);
      console.log(' -> Found URL: ' + url);
      await downloadFile(url, item.target);
      const stats = fs.statSync(item.target);
      console.log(' ✅ Downloaded to: ' + item.target + ' (' + stats.size + ' bytes)');
    } catch (e) {
      console.error(' ❌ Error downloading ' + item.title + ':', e.message);
    }
  }
})();
