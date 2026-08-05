const fs = require('fs');

const dataPath = 'great_war_part2/data.js';
let content = fs.readFileSync(dataPath, 'utf-8');
const jsonStart = content.indexOf('{');
const jsonEnd = content.lastIndexOf('}');
const jsonStr = content.slice(jsonStart, jsonEnd + 1);

const unitData = JSON.parse(jsonStr);

const l2 = unitData.lessons.find(l => l.id === 'lesson_2');
if (l2) {
  l2.vocab = [
    {
      term: "Attrition",
      definition: "A military strategy aiming to win a war by wearing down the enemy to the point of collapse through continuous losses in men and materials."
    },
    {
      term: "Artillery",
      definition: "Large-caliber, heavy guns used in warfare on land, responsible for the vast majority of casualties during the First World War."
    },
    {
      term: "No Man's Land",
      definition: "The unoccupied, highly dangerous terrain between the front lines of two opposing armies, often filled with barbed wire and craters."
    },
    {
      term: "Trench Foot",
      definition: "A painful condition of the feet caused by prolonged exposure to cold water and mud, common in the flooded trenches of the Western Front."
    },
    {
      term: "Causation",
      definition: "The action of causing something; in history, it is the skill of identifying the underlying reasons why a specific event occurred."
    }
  ];
}

const updatedJsonStr = JSON.stringify(unitData, null, 2);
const newContent = content.slice(0, jsonStart) + updatedJsonStr + "\n";
fs.writeFileSync(dataPath, newContent);

console.log('Successfully added vocab to lesson_2 in great_war_part2/data.js');
