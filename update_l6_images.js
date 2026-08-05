const fs = require('fs');

const dataPath = 'great_war_part2/data.js';
let content = fs.readFileSync(dataPath, 'utf-8');
const jsonStart = content.indexOf('{');
const jsonEnd = content.lastIndexOf('}');
const jsonStr = content.slice(jsonStart, jsonEnd + 1);

let unitData = JSON.parse(jsonStr);

let l6 = unitData.lessons.find(l => l.id === 'lesson_6');
if (l6) {
    if (l6.narrative_blocks[0]) {
        l6.narrative_blocks[0].image = "/images/stubbington_memorial_1.jpg";
        l6.narrative_blocks[0].image_alt = "The wooden Stubbington War Memorial on the village green";
    }
    if (l6.narrative_blocks[1]) {
        l6.narrative_blocks[1].image = "/images/stubbington_memorial_2.jpg";
        l6.narrative_blocks[1].image_alt = "The First World War memorial plaque inside Holy Rood Church, Stubbington";
    }
    if (l6.narrative_blocks[2]) {
        l6.narrative_blocks[2].image = "/images/gw_thiepval.jpg";
        l6.narrative_blocks[2].image_alt = "The Thiepval Memorial to the Missing of the Somme";
    }
}

const updatedJsonStr = JSON.stringify(unitData, null, 2);
const newContent = content.slice(0, jsonStart) + updatedJsonStr + "\n";
fs.writeFileSync(dataPath, newContent);

console.log('Successfully added Stubbington memorial images to Lesson 6!');
