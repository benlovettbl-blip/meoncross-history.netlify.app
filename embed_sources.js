const fs = require('fs');

let dataPath = 'industrialisation_and_empire/data.js';
let rawData = fs.readFileSync(dataPath, 'utf8');
let jsonStr = rawData.replace(/^export const unitData = /, '').trim();
if (jsonStr.endsWith(';')) jsonStr = jsonStr.slice(0, -1);
let data = JSON.parse(jsonStr);

let lesson = data.lessons.find(l => l.id === 'lesson_3');

// We have 4 sources currently in lesson.sources:
// [0] Visual Hook
// [1] Source A: Chadwick
// [2] Source B: Fareham
// [3] Source C: Times Letter

let visualHook = lesson.sources[0];
let sourceA = lesson.sources[1];
let sourceB = lesson.sources[2];
let sourceC = lesson.sources[3];

// Attach sources to narrative blocks
lesson.narrative_blocks[0].source = sourceB; // The Façade of Empire
lesson.narrative_blocks[1].source = sourceA; // The Official Investigation
lesson.narrative_blocks[2].source = sourceC; // The Raw Human Perspective

// Keep only the visual hook in lesson.sources
lesson.sources = [visualHook];

fs.writeFileSync(dataPath, 'export const unitData = ' + JSON.stringify(data, null, 2) + ';\n');
console.log('Successfully updated data.js to embed sources in narrative blocks!');
