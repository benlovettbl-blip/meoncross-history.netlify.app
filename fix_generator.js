const fs = require('fs');
let code = fs.readFileSync('generate_workbooks.js', 'utf8');
code = code.replace(/\\`/g, '`');
code = code.replace(/\\\$/g, '$');
fs.writeFileSync('generate_workbooks.js', code, 'utf8');
console.log('Fixed syntax error in generate_workbooks.js');
