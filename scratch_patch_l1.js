const fs = require('fs');

let content = fs.readFileSync('early_modern_world/data.js', 'utf8');

content = content.replace('Account of  entering', 'Account of Sultan Mehmed II entering');
content = content.replace('— <strong></strong>, a Greek scholar', '— <strong>George Sphrantzes</strong>, a Greek scholar');

fs.writeFileSync('early_modern_world/data.js', content);
console.log('Patched Lesson 1 missing names!');
