const fs = require('fs');

// 1. great_war/data.js
let rawData = fs.readFileSync('great_war/data.js', 'utf8');
const dataPrefix = "export const unitData = ";
let jsonStr = rawData.replace(dataPrefix, '').replace(/;\s*$/, '');
let unit = JSON.parse(jsonStr);

if (unit.quizPack) {
    unit.quizPack.forEach((q, i) => {
        if (!q.id) {
            q.id = `gw_q${i + 1}`;
        }
    });
}
fs.writeFileSync('great_war/data.js', dataPrefix + JSON.stringify(unit, null, 4) + ';\n');

// 2. database.json
let db = JSON.parse(fs.readFileSync('database.json', 'utf8'));
if (db.great_war.data.quizPack) {
    db.great_war.data.quizPack.forEach((q, i) => {
        if (!q.id) {
            q.id = `gw_q${i + 1}`;
        }
    });
}
fs.writeFileSync('database.json', JSON.stringify(db, null, 2));

// 3. public/data/great_war.json
let pub = JSON.parse(fs.readFileSync('public/data/great_war.json', 'utf8'));
if (pub.data && pub.data.quizPack) {
    pub.data.quizPack.forEach((q, i) => {
        if (!q.id) {
            q.id = `gw_q${i + 1}`;
        }
    });
}
fs.writeFileSync('public/data/great_war.json', JSON.stringify(pub, null, 2));

console.log('Successfully injected unique IDs into all Great War quiz questions!');
