import fs from 'fs';

const dataPath = '../great_war_part2/data.js';
let content = fs.readFileSync(dataPath, 'utf8');
let jsonStr = content.replace('export const unitData =', '').trim().replace(/;$/, '');
let data = JSON.parse(jsonStr);

let taskToUpdate = data.lessons[2].narrative_blocks[1].tasks[1];

taskToUpdate.question = "Q5. Study Source B and read the text on Racial Hierarchy. How does the impression given by the photograph contrast with the reality described in the text?";
delete taskToUpdate.text; // Ensure we only use 'question' to avoid conflicts

taskToUpdate.model_answer = `The Photograph's Impression: Shows soldiers posed in full uniform holding rifles, giving the visual impression of an active, respected, front-line combat unit.

The Reality in the Text: Most BWIR soldiers were stripped of combat roles and relegated to dangerous manual labor (e.g., digging trenches, carrying ammunition, burying the dead), alongside facing unequal pay, denied promotions, and segregated facilities.`;

fs.writeFileSync(dataPath, 'export const unitData = ' + JSON.stringify(data, null, 2) + ';\n');
console.log('Successfully updated Q5 in great_war_part2!');
