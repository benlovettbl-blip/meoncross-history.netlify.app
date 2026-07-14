const fs = require('fs');
const file = 'cme_new/timeline_data.js';
let content = fs.readFileSync(file, 'utf8');

// The file contains literal sequences of backslash followed by quote, which are typed as \\"
// Since the string is enclosed in double quotes, we need it to be \".
// In Javascript strings, \\" is written as '\\\\"' and \" is written as '\\"'.
content = content.split('\\\\"').join('\\"');

fs.writeFileSync(file, content, 'utf8');
console.log('Fixed timeline_data.js');
