const fs = require('fs');

const unitPath = 'great_war_part2/data.js';
let dataStr = fs.readFileSync(unitPath, 'utf8');

dataStr = dataStr.replace(/"Occupation"/g, '\\"Occupation\\"');
dataStr = dataStr.replace(/"visible"/g, '\\"visible\\"');

fs.writeFileSync(unitPath, dataStr, 'utf8');
console.log("Fixed quotes in great_war_part2/data.js");
