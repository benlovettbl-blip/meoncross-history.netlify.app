const fs = require('fs');

const dataPath = 'great_war/data.js';
let raw = fs.readFileSync(dataPath, 'utf8');

// Remove "PAST TOPIC: "
raw = raw.replace(/PAST TOPIC:\s*/g, '');

fs.writeFileSync(dataPath, raw, 'utf8');

// Update JSON files as well
let jsonStr = raw.replace('export const unitData = ', '').replace(/;\s*$/, '');
let unit = JSON.parse(jsonStr);

fs.writeFileSync('public/data/great_war.json', JSON.stringify({data: unit}, null, 2), 'utf8');

let db = JSON.parse(fs.readFileSync('database.json', 'utf8'));
db.great_war.data = unit;
fs.writeFileSync('database.json', JSON.stringify(db, null, 2), 'utf8');

console.log('Removed PAST TOPIC: successfully!');
