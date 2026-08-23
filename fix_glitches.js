const fs = require('fs');

// Fix industrialisation_and_empire
let indFile = 'public/units/industrialisation_and_empire/data.js';
let indData = fs.readFileSync(indFile, 'utf8');
indData = indData.replace(/,\s*"tasks": \[\]/g, '');
fs.writeFileSync(indFile, indData);

// Fix cold_war
let cwFile = 'public/units/cold_war/data.js';
let cwData = fs.readFileSync(cwFile, 'utf8');
// We need to remove the suspicious fragment blocks entirely.
// A suspicious fragment looks like:
// {
//   "title": "",
//   "text": "Placeholder content for...",
//   "tasks": []
// },
// Since they are empty, I will remove blocks where text starts with "Placeholder content for"
let cwObjStr = cwData.replace(/^export const unitData = /, '').replace(/;?\s*$/, '');
let cwObj = JSON.parse(cwObjStr);
cwObj.lessons.forEach(l => {
    if (l.narrative_blocks) {
        l.narrative_blocks = l.narrative_blocks.filter(b => !b.text || !b.text.startsWith('Placeholder content for'));
    }
});
fs.writeFileSync(cwFile, 'export const unitData = ' + JSON.stringify(cwObj, null, 2) + ';\n');

// Fix the_shoah
let shoahFile = 'public/units/the_shoah/data.js';
let shoahData = fs.readFileSync(shoahFile, 'utf8');
let shoahObjStr = shoahData.replace(/^export const unitData = /, '').replace(/;?\s*$/, '');
let shoahObj = JSON.parse(shoahObjStr);
shoahObj.lessons.forEach(l => {
    if (l.narrative_blocks) {
        l.narrative_blocks = l.narrative_blocks.filter(b => !b.text || !b.text.startsWith('Placeholder content for'));
    }
});
fs.writeFileSync(shoahFile, 'export const unitData = ' + JSON.stringify(shoahObj, null, 2) + ';\n');

console.log('Fixed glitches!');
