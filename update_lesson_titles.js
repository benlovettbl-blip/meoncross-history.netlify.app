const fs = require('fs');

const dataPath = 'great_war/data.js';
let raw = fs.readFileSync(dataPath, 'utf8');

let jsonStr = raw.replace('export const unitData = ', '').replace(/;\s*$/, '');
let unit = JSON.parse(jsonStr);

// Update lesson titles to enquiry questions
const newTitles = [
    "How did the Franco-Prussian War create a lasting legacy of hatred?",
    "To what extent did the 'Scramble for Africa' increase tension in Europe?",
    "Why did a battleship building contest destroy Anglo-German relations?",
    "Did the Alliance System protect Europe or guarantee a global war?",
    "Why did a single assassination in Sarajevo ignite a World War?"
];

unit.lessons.forEach((l, index) => {
    if(newTitles[index]) {
        l.title = newTitles[index];
    }
});

let finalJs = 'export const unitData = ' + JSON.stringify(unit, null, 4) + ';\n';
fs.writeFileSync(dataPath, finalJs, 'utf8');

// Also update public/data/great_war.json and database.json for immediate sync
fs.writeFileSync('public/data/great_war.json', JSON.stringify({data: unit}, null, 2), 'utf8');

let db = JSON.parse(fs.readFileSync('database.json', 'utf8'));
db.great_war.data = unit;
fs.writeFileSync('database.json', JSON.stringify(db, null, 2), 'utf8');

console.log('Successfully updated lesson titles to enquiry questions!');
