const fs = require('fs');

const unitPath = 'great_war_part2/data.js';
let dataStr = fs.readFileSync(unitPath, 'utf8');

dataStr = dataStr.replace(/href="([^"]+)"/g, "href='$1'");
dataStr = dataStr.replace(/target="([^"]+)"/g, "target='$1'");

fs.writeFileSync(unitPath, dataStr, 'utf8');
console.log("Fixed HTML quotes in great_war_part2/data.js");
