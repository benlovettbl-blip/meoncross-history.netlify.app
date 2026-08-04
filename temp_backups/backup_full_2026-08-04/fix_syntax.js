const fs = require('fs');
let c = fs.readFileSync('generate_weimar_mocks_edexcel.mjs', 'utf8');
c = c.replace(/\\`/g, '`');
c = c.replace(/\\\${/g, '${');
c = c.replace(/\\\\n/g, '\\n');
fs.writeFileSync('generate_weimar_mocks_edexcel.mjs', c);
console.log('Fixed file properly');
