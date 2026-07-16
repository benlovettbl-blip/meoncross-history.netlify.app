const fs = require('fs');

const dataPath = 'great_war/data.js';
let raw = fs.readFileSync(dataPath, 'utf8');

let jsonStr = raw.replace('export const unitData = ', '').replace(/;\s*$/, '');
let unit = JSON.parse(jsonStr);

// The GCSE task is in Lesson 0
let gcseTask = unit.lessons[0].gcse_task;

// Replace Source A
gcseTask.sources[0] = {
    "type": "written",
    "text": "“We must never forget the humiliation of 1871. The German Empire was proclaimed in our own Palace of Versailles, tearing away the bleeding wounds of Alsace and Lorraine. They have stolen our iron and our factories, and forced us to pay a crushing ransom of 5 billion francs. Every French child must grow up with one single thought: to rebuild our army and take back what was stolen from the motherland.”",
    "title": "Source A: Extract from a French school textbook, published in Paris, 1885."
};

// Replace Source B
gcseTask.sources[1] = {
    "type": "written",
    "text": "“France will never forgive us for taking Alsace-Lorraine. The peace we have forced upon them has left a bitter resentment that will not fade. We must accept that a French war of revenge is a certainty in the future. Therefore, our entire diplomatic focus must be to ensure she never finds an ally to help her take it back. As long as France remains diplomatically isolated, particularly from Russia, Germany will remain secure.”",
    "title": "Source B: Extract from a private letter written by German Chancellor Otto von Bismarck to a fellow diplomat, 1872."
};

// Update model answer if needed to match the new sources
gcseTask.model = "Source A is highly useful because it shows the deep, emotional humiliation felt by the French people over the loss of Alsace-Lorraine and the 5 billion franc ransom. As a school textbook, its purpose is to indoctrinate the next generation for a war of revenge, proving that the hatred was deeply embedded in French culture. Source B is also extremely useful as it shows the German perspective. Bismarck openly acknowledges that taking Alsace-Lorraine has guaranteed a future 'war of revenge'. Together, they prove that the hatred was mutual and structural, shaping the future alliance system.";


let finalJs = 'export const unitData = ' + JSON.stringify(unit, null, 4) + ';\n';
fs.writeFileSync(dataPath, finalJs, 'utf8');

// Also update public/data/great_war.json and database.json for immediate sync
fs.writeFileSync('public/data/great_war.json', JSON.stringify({data: unit}, null, 2), 'utf8');

let db = JSON.parse(fs.readFileSync('database.json', 'utf8'));
db.great_war.data = unit;
fs.writeFileSync('database.json', JSON.stringify(db, null, 2), 'utf8');

console.log('Successfully updated Lesson 1 GCSE task sources!');
