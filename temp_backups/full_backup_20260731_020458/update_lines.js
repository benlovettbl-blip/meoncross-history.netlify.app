const fs = require('fs');
let content = fs.readFileSync('public/units/cme_new/mock_exams.js', 'utf8');
content = content.replace(/"marks": 4,\s*"lines": 4/g, '"marks": 4,\n        "lines": 12');
fs.writeFileSync('public/units/cme_new/mock_exams.js', content);
console.log('Updated mock_exams.js');
