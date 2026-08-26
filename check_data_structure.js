const fs = require('fs');
let c = fs.readFileSync('public/units/great_war/data.js', 'utf8');

let l1 = c.substring(c.indexOf('lesson_1'), c.indexOf('lesson_2'));

console.log(l1.indexOf('historians_corner'));
console.log(l1.indexOf('pair_share'));

// Check if historians_corner is inside a narrative block
let blocksIdx = l1.indexOf('"narrative_blocks":');
let nextProp = l1.indexOf('"primary_source"', blocksIdx);
if (nextProp === -1) nextProp = l1.indexOf('"pair_share"', blocksIdx);
if (nextProp === -1) nextProp = l1.indexOf('"historians_corner"', blocksIdx);

console.log("Blocks end approx at", nextProp);
