const fs = require('fs');
const path = './medieval_england/data.js';

let content = fs.readFileSync(path, 'utf8');

// Match the JSON object inside the data.js file
const prefixMatch = content.match(/export const unitData = (\{[\s\S]+\});?/);
if (!prefixMatch) {
    console.error("Could not find the JSON object in data.js");
    process.exit(1);
}

let data;
try {
    data = JSON.parse(prefixMatch[1]);
} catch (e) {
    console.error("Failed to parse JSON:", e);
    process.exit(1);
}

// Find Lesson 2
const lesson2 = data.lessons.find(l => l.title.includes('Lesson 2: Castles, Terror'));
if (!lesson2) {
    console.error("Could not find Lesson 2");
    process.exit(1);
}

// Find the Timeline section
const timelineBlock = lesson2.narrative_blocks.find(b => b.title.includes('Timeline: Securing Norman Control'));
if (!timelineBlock) {
    console.error("Could not find Timeline section");
    process.exit(1);
}

// Add the flashcards array
timelineBlock.flashcards = [
    {
        term: "1066",
        definition: "William crowned King. The great castle-building programme begins."
    },
    {
        term: "1069-1070",
        definition: "The Harrying of the North crushes northern resistance through starvation and destruction."
    },
    {
        term: "1071",
        definition: "The last major Anglo-Saxon resistance is defeated at Ely."
    },
    {
        term: "1085-1086",
        definition: "The Domesday Survey is ordered and completed, recording every taxable asset in England."
    },
    {
        term: "1087",
        definition: "William the Conqueror dies."
    }
];

// Write it back
const newContent = content.replace(prefixMatch[1], JSON.stringify(data, null, 2));
fs.writeFileSync(path, newContent, 'utf8');
console.log("Successfully added flashcards to Lesson 2.");
