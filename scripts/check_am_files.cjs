const https = require('https');
const fs = require('fs');

async function downloadAm(i) {
  return new Promise((resolve) => {
    const pageUrl = `https://commons.wikimedia.org/wiki/File:Respirator_(AM_1995.59.20-${i}).jpg`;
    https.get(
      pageUrl,
      { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } },
      (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          const m = data.match(
            /<div class=\"fullImageLink\"[^>]*><a[^>]*><img[^>]+src=\"([^\"]+)\"/,
          );
          if (m) {
            const thumbUrl = m[1].replace(/&amp;/g, '&');
            console.log(`[${i}] Thumb URL: ${thumbUrl}`);

            const file = fs.createWriteStream(`am_gasmask_${i}.jpg`);
            https
              .get(
                thumbUrl,
                { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } },
                (tRes) => {
                  tRes.pipe(file);
                  file.on('finish', () => {
                    file.close();
                    console.log(
                      `Saved am_gasmask_${i}.jpg (${fs.statSync('am_gasmask_' + i + '.jpg').size} bytes)`,
                    );
                    resolve();
                  });
                },
              )
              .on('error', (err) => {
                console.log(`[${i}] Thumb err: ${err.message}`);
                resolve();
              });
          } else {
            console.log(`[${i}] No img match in fullImageLink`);
            resolve();
          }
        });
      },
    );
  });
}

async function run() {
  for (let i = 1; i <= 8; i++) {
    await downloadAm(i);
  }
}
run();
