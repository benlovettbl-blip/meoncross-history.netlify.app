const fs = require('fs');
let f = fs.readFileSync('early_modern_world/data.js', 'utf8');
f = f.replace(/\/images\/royal_exchange\.jpg/g, '/images/royal_exchange_courtyard.jpg');
fs.writeFileSync('early_modern_world/data.js', f);
console.log('Fixed royal exchange images in early_modern_world/data.js');
