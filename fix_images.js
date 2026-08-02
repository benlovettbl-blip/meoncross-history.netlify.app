const fs = require('fs');
let c = fs.readFileSync('water_and_sanitation/data.js', 'utf8');
c = c.replace(/"src":\s*""/g, '"src": "/assets/water_and_sanitation_seneca_letter.png"');
c = c.replace(/"(src|image)":\s*"water_local_([a-z_]+)\.jpg"/g, '"$1": "/assets/water_local_$2.jpg"');
fs.writeFileSync('water_and_sanitation/data.js', c);
console.log('Images fixed');
