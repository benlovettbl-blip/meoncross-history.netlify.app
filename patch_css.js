const fs = require('fs');

const file = 'src/key_individuals.js';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  '.person-card {\n      background: transparent;\n      cursor: pointer;\n    }',
  '.person-card {\n      background: transparent;\n      cursor: pointer;\n      perspective: 1000px;\n      -webkit-perspective: 1000px;\n      min-height: 380px;\n    }'
);

fs.writeFileSync(file, content);
console.log("Patched key_individuals.js");
