const fs = require('fs');
const content = fs.readFileSync('edexcel_medicine/data.js', 'utf8');
const titles = content.match(/title:\s*['"][^'"]+['"]/g);
console.log(titles ? titles.slice(0, 30) : []);
