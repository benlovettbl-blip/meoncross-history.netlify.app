const fs = require('fs');
const file = 'public/units/cme_new/data.js';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/"id": "KT1",\s*"title": "KT1",\s*"image": "[^"]+"/g, '$&, "prefix": "KT1"');
content = content.replace(/"id": "KT2",\s*"title": "KT2",\s*"image": "[^"]+"/g, '$&, "prefix": "KT2"');
content = content.replace(/"id": "KT3",\s*"title": "KT3",\s*"image": "[^"]+"/g, '$&, "prefix": "KT3"');

fs.writeFileSync(file, content);
console.log('Replaced prefixes!');
