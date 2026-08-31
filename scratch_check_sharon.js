const https = require('https');

async function listImages(title) {
  return new Promise((resolve) => {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=images&format=json&imlimit=50`;
    https.get(url, { headers: { 'User-Agent': 'Bot/1.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query.pages;
          const pageId = Object.keys(pages)[0];
          if (pages[pageId] && pages[pageId].images) {
            resolve(pages[pageId].images.map(i => i.title));
          } else {
            resolve([]);
          }
        } catch (e) {
          resolve([]);
        }
      });
    });
  });
}

listImages("Ariel_Sharon").then(images => {
  console.log("Ariel Sharon images:");
  images.forEach(i => console.log(i));
});
