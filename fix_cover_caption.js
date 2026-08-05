const fs = require('fs');

const dataPath = 'great_war_part2/data.js';
let content = fs.readFileSync(dataPath, 'utf-8');
const jsonStart = content.indexOf('{');
const jsonEnd = content.lastIndexOf('}');
const jsonStr = content.slice(jsonStart, jsonEnd + 1);

const unitData = JSON.parse(jsonStr);

// Fix Cover Caption
unitData.cover_caption = "The cover image displays two powerful historical sources that bookend the First World War: on the left, an illustration of the assassination of Archduke Franz Ferdinand in Sarajevo (the spark that ignited the conflict in 1914), and on the right, the official Treaty of Versailles document (the controversial peace settlement signed in 1919).";

const updatedJsonStr = JSON.stringify(unitData, null, 2);
const newContent = content.slice(0, jsonStart) + updatedJsonStr + "\n";
fs.writeFileSync(dataPath, newContent);

console.log('Successfully applied cover caption fix to great_war_part2/data.js');
