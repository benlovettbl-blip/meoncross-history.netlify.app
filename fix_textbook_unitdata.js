const fs = require('fs');
let c = fs.readFileSync('generate_textbooks.js', 'utf8');

c = c.replace(/if \(unitData && unitData\.is_ks3\) \{/g, 'if (is_ks3) {');

fs.writeFileSync('generate_textbooks.js', c);
console.log('Fixed unitData reference in generate_textbooks.js');
