const https = require('https');
const fs = require('fs');
const path = require('path');

const targetUrl = 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Nuremberg_laws_Racial_Chart.jpg';
const destPath = path.resolve('public/images/nuremberg_laws_chart_1935.jpg');
const backupPath = path.resolve('public/images/nuremberg_laws_text_page.jpg');

// First save the previous Reichsgesetzblatt page as nuremberg_laws_text_page.jpg if not exists
if (fs.existsSync(destPath) && !fs.existsSync(backupPath)) {
  fs.copyFileSync(destPath, backupPath);
  console.log('Backed up text page to nuremberg_laws_text_page.jpg');
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, { headers: { 'User-Agent': 'HistoryRevisionHub/1.0 (educational research; contact@the-history-revision-hub.netlify.app)' } }, response => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return download(response.headers.location, dest).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        return reject(new Error(`Failed to download: status ${response.statusCode}`));
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve());
      });
    }).on('error', err => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

download(targetUrl, destPath).then(() => {
  const stat = fs.statSync(destPath);
  console.log(`Successfully downloaded authentic Nuremberg Laws racial chart to ${destPath} (${stat.size} bytes)`);
}).catch(err => {
  console.error('Error downloading:', err);
  process.exit(1);
});
