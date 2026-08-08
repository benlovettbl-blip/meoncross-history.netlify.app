const fs = require('fs');
const filePath = 'early_modern_world/data.js';
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(
  '"id": "lesson_6",',
  '"id": "lesson_6",\n      "banner": "/images/brookes_ship.jpg",'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Replaced successfully');
