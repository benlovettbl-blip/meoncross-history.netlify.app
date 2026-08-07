const fs = require('fs');
let c = fs.readFileSync('src/core_app.js', 'utf8');
c = c.replace(
  "const galleryData = encodeURIComponent(JSON.stringify(block.images.map(img => ({ src: getAssetUrl(img.src || img.image), alt: img.alt || img.image_alt || '' }))));",
  "const galleryData = encodeURIComponent(JSON.stringify(block.images.map(img => ({ src: getAssetUrl(img.src || img.image), alt: img.alt || img.image_alt || '' })))).replace(/'/g, \"%27\");"
);
fs.writeFileSync('src/core_app.js', c);
console.log('Fixed galleryData!');
