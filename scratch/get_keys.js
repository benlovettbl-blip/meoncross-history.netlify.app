const fs = require('fs');
const data = JSON.parse(fs.readFileSync('c:/Projects/meoncross-history.netlify.app/database.json', 'utf8'));
console.log(Object.keys(data));
