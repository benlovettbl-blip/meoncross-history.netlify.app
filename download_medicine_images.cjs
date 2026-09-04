const fs = require('fs');
const path = require('path');
const https = require('https');

const assetsDir = path.join(__dirname, 'public', 'units', 'edexcel_medicine', 'assets');
if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });

const queries = [
  { period: 'medieval', title: 'Humorism' },
  { period: 'renaissance', title: 'Andreas_Vesalius' },
  { period: '18th_19th', title: 'Edward_Jenner' },
  { period: 'modern', title: 'National_Health_Service' },
  { period: 'western_front', title: 'Royal_Army_Medical_Corps' },
];

const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${queries.map((q) => q.title).join('|')}&prop=pageimages&format=json&pithumbsize=500`;

const options = {
  headers: {
    'User-Agent': 'MeoncrossHistoryApp/1.0 (benlovett.bl@gmail.com)',
  },
};

https
  .get(url, options, (res) => {
    let body = '';
    res.on('data', (chunk) => (body += chunk));
    res.on('end', () => {
      const data = JSON.parse(body);
      const pages = data.query.pages;

      Object.values(pages).forEach((page) => {
        if (page.thumbnail) {
          const queryInfo = queries.find((q) => q.title.replace(/_/g, ' ') === page.title);
          if (queryInfo) {
            const imgUrl = page.thumbnail.source;
            const destPath = path.join(assetsDir, `authentic_${queryInfo.period}.jpg`);

            https.get(imgUrl, options, (imgRes) => {
              const fileStream = fs.createWriteStream(destPath);
              imgRes.pipe(fileStream);
              fileStream.on('finish', () => {
                fileStream.close();
                console.log(`Downloaded ${queryInfo.period} image from ${page.title}`);
              });
            });
          }
        } else {
          console.log(`No thumbnail for ${page.title}`);
        }
      });
    });
  })
  .on('error', console.error);
