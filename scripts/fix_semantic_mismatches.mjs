import fs from 'fs';

// Fix great_war_part2
const gwPath = 'great_war_part2/data.js';
let gwContent = fs.readFileSync(gwPath, 'utf8');
let gwData = JSON.parse(gwContent.replace('export const unitData =', '').trim().replace(/;$/, ''));
const gwL2B4 = gwData.lessons[1].narrative_blocks[4];
// Delete Task 0
gwL2B4.tasks.shift(); 
fs.writeFileSync(gwPath, 'export const unitData = ' + JSON.stringify(gwData, null, 2) + ';\n');
console.log('Fixed great_war_part2 Lesson 2 Task 0');

// Fix industrialisation_and_empire
const iePath = 'industrialisation_and_empire/data.js';
let ieContent = fs.readFileSync(iePath, 'utf8');
let ieData = JSON.parse(ieContent.replace('export const unitData =', '').trim().replace(/;$/, ''));
const ieL5B3 = ieData.lessons[4].narrative_blocks[3];
const ieL5B4 = ieData.lessons[4].narrative_blocks[4];

// Clean up Source A text in Block 3
ieL5B3.text = ieL5B3.text.replace(/<strong>Source A:<\/strong> /g, '');
ieL5B3.text += '<br><br><blockquote><strong>Source A: An extract from the Azamgarh Proclamation, issued by rebel leaders in 1857</strong><br><em>"It is evident that the British Government has disgraced and ruined us... I therefore appeal to all Hindus and Muslims to unite and join us in this holy war against the British."</em></blockquote>';

// Clean up Source B text in Block 4
ieL5B4.text = ieL5B4.text.replace(/<strong>Source B:<\/strong> /g, '');
ieL5B4.text += '<br><br><blockquote><strong>Source B: An extract from a private letter written by a young British officer, Lieutenant Charles Majendie, during the rebellion (1857)</strong><br><em>"We burned every village and hanged all the villagers who had treated us so badly... I wish I had the power of destroying them root and branch."</em></blockquote>';

fs.writeFileSync(iePath, 'export const unitData = ' + JSON.stringify(ieData, null, 2) + ';\n');
console.log('Fixed industrialisation_and_empire Lesson 5 blocks 3 and 4');
