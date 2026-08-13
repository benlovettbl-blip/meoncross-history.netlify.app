const fs = require('fs');

// 1. Fix data.js
let dataPath = 'industrialisation_and_empire/data.js';
let rawData = fs.readFileSync(dataPath, 'utf8');
let jsonStr = rawData.replace(/^export const unitData = /, '').trim();
if (jsonStr.endsWith(';')) jsonStr = jsonStr.slice(0, -1);
let data = JSON.parse(jsonStr);

let lesson = data.lessons[2]; // Lesson 3

// Restore Block 1 (Back-to-Backs)
lesson.narrative_blocks[1].text = "As thousands flocked to the new industrial towns for work, there was a massive housing shortage. Landlords wanted to build houses as cheaply and densely as possible to maximise profit, resulting in the infamous 'back-to-back' housing. These cheap brick terraces literally shared three walls with their neighbours. This design meant there were no back windows and zero cross-ventilation, trapping toxic smog from the factories inside the home. Furthermore, they lacked any indoor plumbing. Instead, entire streets were forced to share a single outdoor toilet (a 'privy') built over a deep hole called a cesspit. Because landlords rarely paid to empty them, these cesspits frequently overflowed, sending raw human waste flooding into the streets and seeping through the ground into the local drinking water pumps.";
lesson.narrative_blocks[1].level_4 = "Landlords wanted to make as much money as possible, so they built 'back-to-back' houses. These houses shared three walls, so there was no fresh air. Whole families squeezed into one room. There were no indoor toilets. Whole streets shared one outdoor toilet over a deep hole called a cesspit. Human waste often overflowed into the streets and leaked into the drinking water, making people very sick.";

// Update Block 2 (Sources)
lesson.narrative_blocks[2].text = `To understand this public health crisis, historians evaluate different types of authentic primary sources. 

Source B is an extract from an official 1842 government report by sanitary reformer Edwin Chadwick. He investigated the living conditions of the working classes across the country and concluded: 'The various forms of epidemic and other disease are caused, or aggravated, or propagated chiefly amongst the labouring classes by atmospheric impurities produced by decomposing animal and vegetable substances, by damp and filth, and close and overcrowded dwellings... The annual loss of life from filth and bad ventilation are greater than the loss from death or wounds in any wars in which the country has been engaged in modern times.' Crucially, Chadwick proved this with brutal statistics: a labourer in rural Rutland lived to 38 on average, whereas a labourer in industrial Manchester died at just 17.

Source C is a letter sent to The Times newspaper in 1849 by 54 working-class residents of a London slum (Church Lane, St Giles). They wrote: 'May we beg and beseech your protection and power. We are living in a wilderness, so far as the rest of London knows anything of us, or as the rich and great people care about. We live in muck and filth. We aint got no privies, no dust bins, no drains, no water-supplies, and no sewers in the whole place... The Stench of a Gully-hole is disgusting. We all of us suffer, and numbers are ill, and if the Cholera comes Lord help us... We are living like pigs, and it aint fair we should be so ill treated.'`;

lesson.narrative_blocks[2].level_4 = `Historians use different sources to learn about the past.

Source B is an 1842 government report by Edwin Chadwick. He wrote: 'Disease is caused amongst the labouring classes by damp and filth, and close and overcrowded dwellings... The annual loss of life from filth and bad ventilation is greater than the loss from death or wounds in any wars.' Chadwick proved this with shocking facts: a worker in the countryside lived to 38, but a factory worker in Manchester died at just 17.

Source C is a letter sent to a newspaper in 1849 by 54 poor slum workers. They wrote: 'We are living in a wilderness... We live in muck and filth. We aint got no privies, no drains, no water... The stench is disgusting. We all of us suffer... and if the Cholera comes Lord help us... We are living like pigs, and it aint fair.'`;

// Restore Block 3 Q4 Model Answer
lesson.narrative_blocks[3].tasks[0].model_answer = "The government maintained a laissez-faire policy because public health interventions were highly expensive, and they previously ignored scientific evidence like John Snow's discoveries. It took the 'Great Stink' to force change because the unbearable smell directly impacted the politicians inside the Houses of Parliament, making the crisis a personal discomfort they could no longer ignore.";

// Q5 Model answer is already fine in [4]
lesson.narrative_blocks[4].tasks[0].model_answer = `To a significant extent, the early phase of industrialisation made British towns unlivable due to rapid, unregulated expansion. 'Pessimist' historians correctly argue that the initial explosion of back-to-back housing and lack of sanitation turned towns into death traps, evidenced by Chadwick's devastating statistic that a Manchester labourer lived to just 17, compared to 38 in rural areas. However, 'Optimist' historians provide a vital counter-perspective: this unlivable crisis eventually forced the government to abandon 'laissez-faire' policies. The Great Stink compelled the construction of Bazalgette's sewers and the 1875 Public Health Act, meaning that while industrialisation initially poisoned the towns, it eventually generated the wealth and engineering necessary to make them modern and sanitary.`;

fs.writeFileSync(dataPath, 'export const unitData = ' + JSON.stringify(data, null, 2) + ';\n');
console.log('Fixed data.js structure');

// 2. Fix generate_textbooks.js reading log label
let tbPath = 'generate_textbooks.js';
let tbData = fs.readFileSync(tbPath, 'utf8');
tbData = tbData.replace(/Reading Log/gi, 'Textbook');
// Don't replace reading_log in variable names unless it's a visible string. The main issue is the user seeing "Reading Log" in the PDF.
fs.writeFileSync(tbPath, tbData);
console.log('Fixed generate_textbooks.js reading log references');

// 3. Fix generate_workbooks.js reading log label
let wbPath = 'generate_workbooks.js';
let wbData = fs.readFileSync(wbPath, 'utf8');
wbData = wbData.replace(/Reading Log/gi, 'Textbook');
fs.writeFileSync(wbPath, wbData);
console.log('Fixed generate_workbooks.js reading log references');
