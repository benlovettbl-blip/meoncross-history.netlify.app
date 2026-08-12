const fs = require('fs');
let code = fs.readFileSync('great_war/data.js', 'utf8');

code = code.replace(
  '"src": "assets/map_africa_1914.png"',
  '"src": "/assets/great_war_map_lesson2.png"'
);

code = code.replace(
  'Study the intertwined hands and figures in this map',
  'Study the intertwined hands and figures in this cartoon'
);

fs.writeFileSync('great_war/data.js', code);
console.log("Fixed secondary issues in data.js");
