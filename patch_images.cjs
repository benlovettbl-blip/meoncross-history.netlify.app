const fs = require('fs');
let content = fs.readFileSync('weimar_nazi_germany/data.js', 'utf8');

// 1. Remove my duplicate Wilhelm II entry entirely so it falls back to the biographies array
content = content.replace(/\{\s*"name":\s*"Kaiser Wilhelm II",\s*"role":\s*"Emperor of Germany",\s*"bio":\s*"The last German Emperor[\s\S]*?"image":\s*"https[^}]+\},/g, '');

// 2. Change Scheidemann's image to the local one that exists
content = content.replace(/("name":\s*"Philipp Scheidemann"[\s\S]*?"image":\s*)"https:[^"]+"/g, '$1"/images/weimar_individuals/philipp_scheidemann.jpg"');

fs.writeFileSync('weimar_nazi_germany/data.js', content, 'utf8');
console.log('Fixed data.js.');
