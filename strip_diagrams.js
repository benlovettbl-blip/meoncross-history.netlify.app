const fs = require('fs');
let code = fs.readFileSync('cme_new/data.js', 'utf8');
const regex = /,\s*"tasks":\s*\[\s*\{\s*"type":\s*"drawing",\s*"text":\s*"Create a diagram or map focusing on the spatial geography, physical structures, or key events relevant to this topic\."\s*\}\s*\]/g;
const newCode = code.replace(regex, '');
fs.writeFileSync('cme_new/data.js', newCode);
console.log('Replaced ' + (code.length - newCode.length) + ' bytes.');
