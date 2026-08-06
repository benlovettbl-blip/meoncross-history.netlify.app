const fs = require('fs');
let content = fs.readFileSync('early_modern_world/data.js', 'utf8');
content = content.replace(/"year":/g, '"date":');
fs.writeFileSync('early_modern_world/data.js', content);
