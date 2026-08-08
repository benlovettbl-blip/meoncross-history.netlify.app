const fs = require('fs');
const https = require('https');

const options = {
  headers: {
    'User-Agent': 'MeoncrossHistoryBot/1.0 (https://meoncross.example.com; admin@example.com)'
  }
};

const apiUrl = "https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=Claude%20de%20Jongh%20London%20Bridge&srnamespace=6&utf8=&format=json";

https.get(apiUrl, options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const json = JSON.parse(data);
    const firstResult = json.query.search[0].title;
    console.log("File title:", firstResult);
    
    const imgApiUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(firstResult)}&prop=imageinfo&iiprop=url&format=json`;
    https.get(imgApiUrl, options, (res2) => {
      let data2 = '';
      res2.on('data', chunk => data2 += chunk);
      res2.on('end', () => {
         const json2 = JSON.parse(data2);
         const pages = json2.query.pages;
         const url = Object.values(pages)[0].imageinfo[0].url;
         console.log("Image URL:", url);
         
         const file = fs.createWriteStream('public/images/early_mod_l6_banner.jpg');
         https.get(url, options, (res3) => {
            res3.pipe(file);
            file.on('finish', () => {
               file.close();
               console.log("Downloaded new London Bridge banner!");
            });
         });
      });
    });
  });
}).on('error', err => console.error(err));
