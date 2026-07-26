const fs = require('fs');
const file = 'public/units/cme_new/biographies.json';
let data = fs.readFileSync(file, 'utf8');
data = data.replace(/"assets\//g, '"/units/cme_new/assets/');
fs.writeFileSync(file, data);
console.log('Fixed biographies.json');
