const https = require('https');
const qs = require('querystring');
const titles = [
  "File:Professor Alexander Fleming at work in his laboratory at St Mary's Hospital, London, during the Second World War. D17801.jpg",
  "File:Cigarette packet warning signs.jpg"
];
const url = 'https://commons.wikimedia.org/w/api.php?action=query&prop=imageinfo&iiprop=url&iiurlwidth=500&format=json&titles=' + qs.escape(titles.join('|'));
https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const pages = JSON.parse(data).query.pages;
    for(let id in pages) {
      if(pages[id].imageinfo) console.log(pages[id].title, pages[id].imageinfo[0].thumburl);
      else console.log(pages[id].title, 'NOT FOUND');
    }
  });
});
