const fs = require('fs');

const path = 'water_and_sanitation/data.js';
let content = fs.readFileSync(path, 'utf8');

// Fix truncated titles
content = content.replace(/"title": "Lesson 1: Prehistoric and Roman Sanitati..."/g, '"title": "Lesson 1: Prehistoric and Roman Sanitation"');
content = content.replace(/"title": "Lesson 2: Medieval Sanitation and The Ch..."/g, '"title": "Lesson 2: Medieval Sanitation and The Church"');
content = content.replace(/"title": "Lesson 3: Early Modern Filth and Cesspit..."/g, '"title": "Lesson 3: Early Modern Filth and Cesspits"');
content = content.replace(/"title": "Lesson 4: The Industrial Revolution and ..."/g, '"title": "Lesson 4: The Industrial Revolution and Cholera"');
content = content.replace(/"title": "Lesson 5: The Great Stink and Modern Sew..."/g, '"title": "Lesson 5: The Great Stink and Modern Sewers"');

fs.writeFileSync(path, content);
console.log('Fixed titles in data.js');
