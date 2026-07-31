const fs = require('fs');
let data = fs.readFileSync('./public/units/cme_new/data.js', 'utf8');

data = data.replace(/How useful is this [a-z]+ for understanding/g, 'What does this source reveal about');

fs.writeFileSync('./public/units/cme_new/data.js', data, 'utf8');
console.log('Fixed hinge questions');
