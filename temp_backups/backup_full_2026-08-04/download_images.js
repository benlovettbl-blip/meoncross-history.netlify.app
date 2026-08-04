const fs = require('fs');
const path = require('path');
const https = require('https');

const downloads = [
  { url: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Sir_Edwin_Chadwick._Photograph_by_John_%26_Chas._Watkins._Wellcome_V0026137.jpg', name: 'chadwick.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Joseph_Bazalgette_by_Lock_%26_Whitfield.jpg', name: 'bazalgette.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Sir_Hugh_Myddelton%2C_1st_Bt_by_Cornelius_Johnson.jpg', name: 'myddelton.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Workshop_of_Hans_Holbein_the_Younger_-_Portrait_of_Henry_VIII_-_Google_Art_Project.jpg', name: 'henry_viii.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Frederick_Bramwell.jpg', name: 'bramwell.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Pont_du_Gard_Oct_2007.jpg', name: 'frontinus.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Simon_Schama.jpg', name: 'schama.jpg' }
];

const downloadImage = (url, name) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(path.join(__dirname, 'public', 'images', name));
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, response => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', err => {
      reject(err);
    });
  });
};

(async () => {
  for (const item of downloads) {
    try {
      await downloadImage(item.url, item.name);
      console.log('Downloaded ' + item.name);
    } catch (e) {
      console.error('Failed ' + item.name, e);
    }
  }
  
  let dataJs = fs.readFileSync('water_and_sanitation/data.js', 'utf8');
  dataJs = dataJs.split('https://upload.wikimedia.org/wikipedia/commons/4/4b/Sir_Edwin_Chadwick._Photograph_by_John_%26_Chas._Watkins._Wellcome_V0026137.jpg').join('/images/chadwick.jpg');
  dataJs = dataJs.split('https://upload.wikimedia.org/wikipedia/commons/1/1a/Joseph_Bazalgette_by_Lock_%26_Whitfield.jpg').join('/images/bazalgette.jpg');
  dataJs = dataJs.split('https://upload.wikimedia.org/wikipedia/commons/2/25/Sir_Hugh_Myddelton%2C_1st_Bt_by_Cornelius_Johnson.jpg').join('/images/myddelton.jpg');
  dataJs = dataJs.split('https://upload.wikimedia.org/wikipedia/commons/0/07/Workshop_of_Hans_Holbein_the_Younger_-_Portrait_of_Henry_VIII_-_Google_Art_Project.jpg').join('/images/henry_viii.jpg');
  dataJs = dataJs.split('https://upload.wikimedia.org/wikipedia/commons/2/23/Frederick_Bramwell.jpg').join('/images/bramwell.jpg');
  dataJs = dataJs.split('https://upload.wikimedia.org/wikipedia/commons/4/4a/Pont_du_Gard_Oct_2007.jpg').join('/images/frontinus.jpg');
  dataJs = dataJs.split('https://upload.wikimedia.org/wikipedia/commons/2/23/Simon_Schama.jpg').join('/images/schama.jpg');
  dataJs = dataJs.split('"assets/john_snow.jpg"').join('"/assets/john_snow.jpg"');
  
  fs.writeFileSync('water_and_sanitation/data.js', dataJs);
  console.log('Updated water_and_sanitation/data.js');
})();
