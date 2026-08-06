const fs = require('fs');
let content = fs.readFileSync('early_modern_world/data.js', 'utf8');
content = content.replace(/"cover_image": "\/images\/global_cover_collage.jpg"/, '"cover_image": "/images/global_mercator.jpg"');
fs.writeFileSync('early_modern_world/data.js', content, 'utf8');
console.log('Updated cover image');
