const fs = require('fs');

const dataPath = 'great_war/data.js';
let raw = fs.readFileSync(dataPath, 'utf8');

// The file exports `export const unitData = { ... }`
let jsonStr = raw.replace('export const unitData = ', '').replace(/;\s*$/, '');
let unit = JSON.parse(jsonStr);

// Find assessments
let a3 = unit.assessments.find(a => a.id === 'source_utility');
let a4 = unit.assessments.find(a => a.id === 'interpretations');

// Update Source B to focus on assassination and alliance system, making it more accessible.
a3.sources[0] = {
    "id": "Source B",
    "text": "The terrible war was triggered by the brutal assassination of the Archduke in Sarajevo. However, the true cause was that Germany was surrounded by hostile enemies. The secret alliance system meant that when Russia began moving its vast army to defend Serbia, Germany was forced to defend itself. We did not want this war; we were forced into it by the aggressive alliances of our enemies.",
    "provenance": "Extract from the memoirs of the German Chancellor, Theobald von Bethmann Hollweg, published in 1919."
};

// Update Source C to focus on blaming Germany (Article 231 simplified)
a3.sources[1] = {
    "id": "Source C",
    "text": "The Allied Governments demand, and Germany accepts, full responsibility for causing all the terrible loss and damage of the war. This devastating war was forced upon the world solely by the aggression of Germany and her allies.",
    "provenance": "Extract from the Treaty of Versailles, Article 231 (The 'War Guilt Clause'), signed by the victorious Allies in June 1919."
};

// Update Interpretation 1 to match Source B (Assassination + Alliances)
a4.interpretations[0] = {
    "id": "Interpretation 1",
    "text": "No single nation can be entirely blamed for starting the First World War. The spark was the tragic assassination in Sarajevo, but the real problem was the rigid system of alliances. When the crisis erupted, leaders across all major powers blundered into a war they did not want, dragged along by secret treaties and the fear of being attacked first."
};

// Update Interpretation 2 to match Source C (Blaming Germany)
a4.interpretations[1] = {
    "id": "Interpretation 2",
    "text": "The outbreak of the First World War was entirely the fault of Germany's aggressive militarism. The German leadership deliberately encouraged Austria to attack Serbia, giving them a 'blank cheque' of support. Germany used the assassination in Sarajevo as a convenient excuse to launch a massive war and conquer Europe."
};

let finalJs = 'export const unitData = ' + JSON.stringify(unit, null, 4) + ';\n';
fs.writeFileSync(dataPath, finalJs, 'utf8');

// Also update public/data/great_war.json and database.json for immediate sync
fs.writeFileSync('public/data/great_war.json', JSON.stringify({data: unit}, null, 2), 'utf8');

let db = JSON.parse(fs.readFileSync('database.json', 'utf8'));
db.great_war.data = unit;
fs.writeFileSync('database.json', JSON.stringify(db, null, 2), 'utf8');

console.log('Successfully updated sources and interpretations for accessibility and matching!');
