const fs = require('fs');
const https = require('https');

async function downloadTordesillasMap() {
  try {
    const searchUrl = 'https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=Treaty%20of%20Tordesillas%20map%20filetype:bitmap';
    const searchRes = await fetch(searchUrl);
    const searchData = await searchRes.json();
    
    // We'll just hardcode a known good map url
    const mapUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Spain_and_Portugal_Empires_map.svg/500px-Spain_and_Portugal_Empires_map.svg.png';
    const mapUrl2 = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Tordesillas.png/500px-Tordesillas.png';
    
    console.log('Downloading map...');
    const file = fs.createWriteStream('public/images/tordesillas_map.jpg');
    https.get(mapUrl2, function(response) {
      if(response.statusCode !== 200) {
        console.error('Failed to download: ', response.statusCode);
      }
      response.pipe(file);
      file.on('finish', function() {
        file.close();
        console.log('Successfully downloaded tordesillas_map.jpg!');
      });
    }).on('error', function(err) {
      console.error(err);
    });

  } catch (err) {
    console.error(err);
  }
}
downloadTordesillasMap();
