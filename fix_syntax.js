const fs = require('fs');
let code = fs.readFileSync('replace_script.js', 'utf8');
code = code.replace(/\\\\'s/g, "\\'s");
fs.writeFileSync('replace_script.js', code);
