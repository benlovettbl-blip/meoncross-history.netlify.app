import fs from 'fs';

let content = fs.readFileSync('src/lessons.js', 'utf8');

// Fix the syntax error from the previous script
content = content.replace(/\\n\\n  html \+= `/g, '\n\n  html += `');

fs.writeFileSync('src/lessons.js', content);
console.log("Syntax error fixed.");
