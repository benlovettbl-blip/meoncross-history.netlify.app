const fs = require('fs');
const content = fs.readFileSync('./great_war/data.js', 'utf8');
const start = content.indexOf('do_now');
const end = content.indexOf('narrative_blocks');
console.log(content.substring(start, end));
