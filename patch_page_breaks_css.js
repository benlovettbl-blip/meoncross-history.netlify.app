const fs = require('fs');

let content = fs.readFileSync('generate_workbooks.js', 'utf8');

// Replace CSS classes
content = content.replace(/\.task-box \{[^}]*page-break-inside: avoid;/g, match => match.replace('page-break-inside: avoid;', 'page-break-inside: auto;'));
content = content.replace(/\.do-now-box \{[^}]*page-break-inside: avoid;/g, match => match.replace('page-break-inside: avoid;', 'page-break-inside: auto;'));
content = content.replace(/\.source-container \{[^}]*page-break-inside: avoid;/g, match => match.replace('page-break-inside: avoid;', 'page-break-inside: auto;'));
content = content.replace(/\.narrative-block \{[^}]*page-break-inside: avoid;/g, match => match.replace('page-break-inside: avoid;', 'page-break-inside: auto;'));

// Global class rules
content = content.replace('.source-container { page-break-inside: avoid; }', '.source-container { page-break-inside: auto; }');
content = content.replace('.narrative-block { page-break-inside: avoid; }', '.narrative-block { page-break-inside: auto; }');
content = content.replace('.task-box { page-break-inside: avoid; }', '.task-box { page-break-inside: auto; }');

// side-quest-box inline style
content = content.replace('page-break-inside: avoid; border: 2px solid #8b5cf6', 'page-break-inside: auto; border: 2px solid #8b5cf6');

fs.writeFileSync('generate_workbooks.js', content, 'utf8');
console.log('Successfully patched generate_workbooks.js CSS page breaks');
