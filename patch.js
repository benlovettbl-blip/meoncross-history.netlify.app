const fs = require('fs'); 
let code = fs.readFileSync('generate_pupil_workbooks.js', 'utf8'); 
code = code.replace(
  /_nbHtml \+\= \`\<\/div\>\`; \/\/ Close narrative-block div\s*\}\s*\}\);/m,
  '_nbHtml += `</div>`; // Close narrative-block div\n            html += _nbHtml;\n          }\n        });'
);
fs.writeFileSync('generate_pupil_workbooks.js', code); 
console.log(code.includes('html += _nbHtml;'));
