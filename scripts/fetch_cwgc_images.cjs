const https = require('https');
const fs = require('fs');
const path = require('path');

function fetchWikiThumbnail(title, destFilename) {
  return new Promise((resolve, reject) => {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=600`;
    https
      .get(
        url,
        { headers: { 'User-Agent': 'MeoncrossHistoryApp/1.0 (ben@meoncross.school)' } },
        (res) => {
          let data = '';
          res.on('data', (chunk) => (data += chunk));
          res.on('end', () => {
            try {
              const json = JSON.parse(data);
              const pages = json.query.pages;
              const pageId = Object.keys(pages)[0];
              const page = pages[pageId];
              if (!page.thumbnail || !page.thumbnail.source) {
                console.error('No thumbnail found for:', title);
                return resolve(null);
              }
              const thumbUrl = page.thumbnail.source;
              console.log(`Found image for ${title}:`, thumbUrl);

              const destPath = path.join(__dirname, '../public/images', destFilename);
              const file = fs.createWriteStream(destPath);
              https
                .get(
                  thumbUrl,
                  { headers: { 'User-Agent': 'MeoncrossHistoryApp/1.0 (ben@meoncross.school)' } },
                  (imgRes) => {
                    if (imgRes.statusCode === 200) {
                      imgRes.pipe(file);
                      file.on('finish', () => {
                        file.close(() => {
                          console.log(
                            `✅ Saved ${destFilename} (${fs.statSync(destPath).size} bytes)`,
                          );
                          resolve(destPath);
                        });
                      });
                    } else {
                      console.error('Failed to download image:', imgRes.statusCode);
                      resolve(null);
                    }
                  },
                )
                .on('error', reject);
            } catch (err) {
              reject(err);
            }
          });
        },
      )
      .on('error', reject);
  });
}

(async () => {
  await fetchWikiThumbnail('Fabian_Ware', 'fabian_ware.jpg');
  await fetchWikiThumbnail('Edwin_Lutyens', 'edwin_lutyens.jpg');
})();
