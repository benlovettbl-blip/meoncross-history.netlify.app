const fs = require('fs');
let content = fs.readFileSync('weimar_nazi_germany/data.js', 'utf8');

// Remove *Grade 9 Detail:* or (Grade 9 Focus) or Grade 9 Analysis (Public Reaction):
content = content.replace(/\*Grade 9 Detail:\*\s*/gi, '');
content = content.replace(/\(Grade 9 Focus\)/gi, '');
content = content.replace(/\*Grade 9 Analysis \(Public Reaction\):\*\s*/gi, '');

// Convert bullet asterisks to real bullet points
// e.g. \n* -> \n• 
content = content.replace(/\n\s*\*\s/g, '\n• ');

// Some might just have `* ` at the very start of a string, though unlikely, handled just in case
// content = content.replace(/^\s*\*\s/g, '• ');

fs.writeFileSync('weimar_nazi_germany/data.js', content, 'utf8');
console.log('Fixed data.js safely.');
