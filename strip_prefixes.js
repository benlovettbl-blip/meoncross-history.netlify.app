const fs = require('fs');

const dataPath = 'great_war_part2/data.js';
let content = fs.readFileSync(dataPath, 'utf-8');
const jsonStart = content.indexOf('{');
const jsonEnd = content.lastIndexOf('}');
const jsonStr = content.slice(jsonStart, jsonEnd + 1);

let unitData = JSON.parse(jsonStr);

unitData.lessons.forEach(l => {
    if (l.title.match(/^Lesson \d+: /)) {
        l.title = l.title.replace(/^Lesson \d+: /, '');
    }
});

const updatedJsonStr = JSON.stringify(unitData, null, 2);
const newContent = content.slice(0, jsonStart) + updatedJsonStr + "\n";
fs.writeFileSync(dataPath, newContent);

console.log('Successfully stripped Lesson prefixes!');
