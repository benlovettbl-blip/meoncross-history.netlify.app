const fs = require('fs');
const https = require('https');

let dataPath = 'industrialisation_and_empire/data.js';
let rawData = fs.readFileSync(dataPath, 'utf8');
let jsonStr = rawData.replace(/^export const unitData = /, '').trim();
if (jsonStr.endsWith(';')) jsonStr = jsonStr.slice(0, -1);
let data = JSON.parse(jsonStr);

let lesson4 = data.lessons.find(l => l.id === 'lesson_4');

if (lesson4 && lesson4.visual_hook) {
  // We need to fetch the image from Wikipedia
  const options = {
    hostname: 'en.wikipedia.org',
    path: '/w/api.php?action=query&titles=HMS_Warrior_(1860)&prop=pageimages&format=json&pithumbsize=500',
    headers: {
      'User-Agent': 'MeoncrossHistoryApp/1.0 (benlovett@example.com)'
    }
  };
  
  https.get(options, (res) => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
      let wikiData = JSON.parse(body);
      let pages = wikiData.query.pages;
      let pageId = Object.keys(pages)[0];
      let imageUrl = pages[pageId].thumbnail.source;
      
      console.log('Found image URL:', imageUrl);
      
      const file = fs.createWriteStream('public/images/hms_warrior.jpg');
      https.get(imageUrl, (response) => {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log('Image downloaded successfully.');
          
          lesson4.sources = [{
            title: lesson4.visual_hook.title,
            caption: lesson4.visual_hook.caption,
            src: "/images/hms_warrior.jpg"
          }];
          delete lesson4.visual_hook;
          
          fs.writeFileSync(dataPath, 'export const unitData = ' + JSON.stringify(data, null, 2) + ';\n');
          console.log('Updated data.js with correct source structure.');
        });
      });
    });
  }).on('error', (e) => {
    console.error(e);
  });
}
