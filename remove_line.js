const fs = require('fs');
const lines = fs.readFileSync('src/core_app.js', 'utf8').split('\n');
lines.splice(2617, 1); // 2618 is index 2617
fs.writeFileSync('src/core_app.js', lines.join('\n'));
