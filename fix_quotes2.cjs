const fs = require('fs');
let data = fs.readFileSync('units/medieval_england/data.js', 'utf8');

data = data.replace(/src="\/images\/harold_godwinson.jpg"/g, 'src=\\"/images/harold_godwinson.jpg\\"');
data = data.replace(/src="\/images\/william_the_conqueror.jpg"/g, 'src=\\"/images/william_the_conqueror.jpg\\"');
data = data.replace(/src="\/images\/harald_hardrada.png"/g, 'src=\\"/images/harald_hardrada.png\\"');

fs.writeFileSync('units/medieval_england/data.js', data);
console.log('Fixed quotes in data.js properly');
