const fs = require('fs');
const path = require('path');

const filePath = 'c:/Projects/meoncross-history.netlify.app/cme_new/generate_worksheets.js';
let content = fs.readFileSync(filePath, 'utf8');

// Replace the stray string completely
content = content.replace("  </div>` : ''}", "");

fs.writeFileSync(filePath, content, 'utf8');
console.log("Removed stray syntax.");
