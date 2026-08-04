const fs = require('fs');

let code = fs.readFileSync('src/core_app.js', 'utf8');

// Replace Main Activity phase-title string
code = code.replace(/<div class="phase-title" style="border-bottom: none; margin-bottom: 0; padding-bottom: 0;">\$\{lesson\.tasks_title \|\| 'Main Activity'\}<\/div>/g, '');

// Also remove the bottom border on the container
code = code.replace(/justify-content: space-between; align-items: center; border-bottom: 2px solid #e2e8f0; margin-bottom: 20px; padding-bottom: 10px;/g, 'justify-content: flex-end; align-items: center; margin-bottom: 20px;');

fs.writeFileSync('src/core_app.js', code, 'utf8');
console.log('Main Activity heading removed.');
