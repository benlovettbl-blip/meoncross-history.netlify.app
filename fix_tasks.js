const fs = require('fs');

let content = fs.readFileSync('public/units/cme_new/data.js', 'utf8');

content = content.replace(/"tasks":\s*\[\s*"Drawing Task:\s*(.*?)"\s*\]/g, `"tasks": [\n        {\n          "type": "drawing",\n          "text": "$1"\n        }\n      ]`);

fs.writeFileSync('public/units/cme_new/data.js', content, 'utf8');
console.log('Fixed malformed drawing tasks in data.js');
