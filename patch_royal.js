const fs = require('fs');

let f = fs.readFileSync('public/units/early_modern_world/data.js', 'utf8');
f = f.replace(/"image":\s*"\/images\/royal_exchange\.jpg"/, '"image": "/images/royal_exchange_courtyard.jpg"');
fs.writeFileSync('public/units/early_modern_world/data.js', f);
fs.writeFileSync('early_modern_world/data.js', f);
console.log("Updated royal exchange image.");
