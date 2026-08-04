const fs = require('fs');
let c = fs.readFileSync('generate_weimar_mocks_api.mjs', 'utf8');
c = c.replace(/style="/g, 'style=\\\\"');
c = c.replace(/color: /g, 'color: ');
fs.writeFileSync('generate_weimar_mocks_api.mjs', c);
