const fs = require('fs');
let data = fs.readFileSync('early_modern_world/data.js', 'utf8');
data = data.replace(/"src": "\/images\/early_mod_l5_banner.jpg"/g, '"src": "/images/brookes_ship.jpg"');
data = data.replace(/"image": "The horizontal fold-out cross-section diagram of the Slave Ship Brooks \(1788\)\."/g, '"image": "/images/brookes_ship.jpg"');
fs.writeFileSync('early_modern_world/data.js', data);
console.log('Fixed Brookes image paths!');
