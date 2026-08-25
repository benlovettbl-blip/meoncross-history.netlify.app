const fs = require('fs');
let code = fs.readFileSync('src/core_app.js', 'utf8');

const regexToRemove = /    let globalQuestionNum = 1;\s*const formatQuestion = \(qText, prependNumber = true\) => \{\s*if \(\!qText\) return '';\s*let cleaned = qText\.replace.*?return formatBold\(cleaned\);\s*\};\s*/g;

code = code.replace(regexToRemove, '');
fs.writeFileSync('src/core_app.js', code);
console.log('done');
