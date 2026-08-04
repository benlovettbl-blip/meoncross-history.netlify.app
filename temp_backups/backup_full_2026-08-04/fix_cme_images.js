const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'public/units/cme_new/data.js');
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/"src":\s*"assets\//g, '"src": "/units/cme_new/assets/');
content = content.replace(/"src":\s*"\.\/assets\//g, '"src": "/units/cme_new/assets/');
content = content.replace(/src=\\"assets\//g, 'src=\\"/units/cme_new/assets/');
content = content.replace(/src=\\"\.\/assets\//g, 'src=\\"/units/cme_new/assets/');

fs.writeFileSync(file, content, 'utf8');
console.log('Fixed cme_new data.js image paths.');
