const fs = require('fs');

const dataPath = 'great_war/data.js';
let raw = fs.readFileSync(dataPath, 'utf8');

let jsonStr = raw.replace('export const unitData = ', '').replace(/;\s*$/, '');
let unit = JSON.parse(jsonStr);

// The GCSE task is in Lesson 0
let gcseTask = unit.lessons[0].gcse_task;

// Prepend "Adapted from" to the provenance titles if not already there
if (!gcseTask.sources[0].title.startsWith('Source A: Adapted from')) {
    gcseTask.sources[0].title = gcseTask.sources[0].title.replace('Source A: Extract from', 'Source A: Adapted from');
}
if (!gcseTask.sources[1].title.startsWith('Source B: Adapted from')) {
    gcseTask.sources[1].title = gcseTask.sources[1].title.replace('Source B: Extract from', 'Source B: Adapted from');
}

let finalJs = 'export const unitData = ' + JSON.stringify(unit, null, 4) + ';\n';
fs.writeFileSync(dataPath, finalJs, 'utf8');

// Also update public/data/great_war.json and database.json for immediate sync
fs.writeFileSync('public/data/great_war.json', JSON.stringify({data: unit}, null, 2), 'utf8');

let db = JSON.parse(fs.readFileSync('database.json', 'utf8'));
db.great_war.data = unit;
fs.writeFileSync('database.json', JSON.stringify(db, null, 2), 'utf8');

console.log('Successfully updated provenances to say "Adapted from"!');
