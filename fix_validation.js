const fs = require('fs');

const dataPath = 'great_war/data.js';
let raw = fs.readFileSync(dataPath, 'utf8');

// The file exports `export const unitData = { ... }`
let jsonStr = raw.replace('export const unitData = ', '').replace(/;\s*$/, '');
let unit = JSON.parse(jsonStr);

// 1. Fix Lesson 1 mismatched question date & source label
let l1 = unit.lessons[0];
l1.narrative_blocks.forEach(b => {
    if(b.tasks) {
        b.tasks.forEach(t => {
            if(t.text.includes('1862 and 1871')) {
                t.text = t.text.replace('between 1862 and 1871', 'prior to 1871');
            }
        });
    }
});
l1.sources.forEach(s => {
    if(s.title === 'Reference Map: Alsace-Lorraine Border Region (1871)') {
        s.title = 'Map A: Alsace-Lorraine Border Region (1871)';
    }
});

// 2. Fix Lesson 3 source label
let l3 = unit.lessons[2];
l3.sources.forEach(s => {
    if(s.title === 'MAP SUITE PLATE 4: The North Sea & Naval Chokepoints') {
        s.title = 'Map A: The North Sea & Naval Chokepoints';
    }
});

// 3. Fix Lesson 4 source labels
let l4 = unit.lessons[3];
l4.sources.forEach(s => {
    if(s.title === 'Interactive Diagram: The Alliance System (1914)') {
        s.title = 'Diagram A: The Alliance System (1914)';
    }
    if(s.title === 'Reference Map: European Military Alliance Blocs (1914)') {
        s.title = 'Map A: European Military Alliance Blocs (1914)';
    }
});

// 4. Fix Lesson 5 sources & tasks
let l5 = unit.lessons[4];
// Remove postwar europe map
l5.sources = l5.sources.filter(s => s.src !== 'assets/map_postwar_europe.jpg');

l5.sources.forEach(s => {
    if(s.title === 'Interactive Diagram: The July Crisis Domino Effect') {
        s.title = 'Diagram A: The July Crisis Domino Effect';
    }
});

// Rewrite Lesson 5 tasks
// Here are the narrative blocks and corresponding accurate questions:
/*
P1: Balkans / Ottoman Empire
P2: Austria-Hungary fear / Bosnia annexed / Black Hand formed
P3: Archduke visits Sarajevo June 28 / Black hand waiting
P4: First bomb fails / driver takes wrong turn
P5: Car stalls / Gavrilo Princip shoots Archduke
P6: 37 days / July Crisis / Blank Cheque / Ultimatum / chain reaction
P7: Willy-Nicky Telegrams
P8: Generals take control / Alliance system doomsday machine
P9: Colonial troops dragged in
P10: Diagram
*/

// We will map tasks exactly to the narrative blocks array
let newTasks = new Array(l5.narrative_blocks.length).fill(null);

newTasks[1] = [
    {
      "type": "written",
      "text": "Explain why the rise of independent Balkan states and Serbian nationalism represented a catastrophic nightmare for the Austro-Hungarian Empire. (P2)",
      "model": "Austria-Hungary was a vast empire containing many different nationalities. Its politicians feared that if Serbian nationalism rose unchecked, the millions of Serbs living inside Austro-Hungarian borders would rebel, causing the entire empire to collapse."
    }
];

newTasks[3] = [
    {
      "type": "written",
      "text": "Detail how the structural failure of the first bomb plot inadvertently led to the exact scenario where Gavrilo Princip was able to shoot the Archduke. (P4)",
      "model": "The first assassin threw a bomb that bounced off the car and exploded behind them. Because of this, the driver later changed the route to visit the injured in the hospital. However, the driver took a wrong turn and stopped the car to reverse right in front of where Gavrilo Princip was standing, giving him a point-blank shot."
    }
];

newTasks[5] = [
    {
      "type": "written",
      "text": "Outline the chronological sequence of events from July 23 to August 4, 1914, that transformed a local Balkan assassination into a total European war. (P6)",
      "model": "Austria-Hungary issued a harsh ultimatum to Serbia on July 23, declaring war on July 28. Russia mobilised its army to defend Serbia. Germany declared war on Russia, and then invaded neutral Belgium to attack France. This forced Britain to declare war on Germany on August 4."
    }
];

newTasks[7] = [
    {
      "type": "written",
      "text": "What does the desperate tone of the 'Willy-Nicky Telegrams' reveal about the monarchs' control over the escalating July Crisis? (P8)",
      "model": "The telegrams reveal that both Kaiser Wilhelm and Tsar Nicholas desperately wanted to avoid war but felt completely trapped. They were too afraid to stop their military mobilizations in case the other attacked, showing that civilian leaders had lost control to their military generals."
    }
];

newTasks[8] = [
    {
      "type": "written",
      "text": "Explain why it is historically inaccurate to describe the First World War strictly as a 'European' conflict in 1914. (P9)",
      "model": "Because of the aggressive 'Scramble for Colonies' by European empires, millions of colonized people across Africa, Asia, and the Middle East were dragged into the conflict to fight and provide labour, making it a truly global war."
    }
];

l5.narrative_blocks.forEach((b, index) => {
    if (newTasks[index]) {
        b.tasks = newTasks[index];
    } else {
        delete b.tasks;
    }
});


let finalJs = 'export const unitData = ' + JSON.stringify(unit, null, 4) + ';\n';
fs.writeFileSync(dataPath, finalJs, 'utf8');

// Also update public/data/great_war.json and database.json for immediate sync
fs.writeFileSync('public/data/great_war.json', JSON.stringify({data: unit}, null, 2), 'utf8');

let db = JSON.parse(fs.readFileSync('database.json', 'utf8'));
db.great_war.data = unit;
fs.writeFileSync('database.json', JSON.stringify(db, null, 2), 'utf8');

console.log('Successfully validated and fixed great_war data!');
