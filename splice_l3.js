const fs = require('fs');

const txt = fs.readFileSync('early_modern_world/data.js', 'utf8');
const startIdx = txt.indexOf('{');
const endIdx = txt.lastIndexOf('}') + 1;
const jsonStr = txt.substring(startIdx, endIdx);

const data = eval('(' + jsonStr + ')');
const l3Fixed = JSON.parse(fs.readFileSync('l3_fixed.json', 'utf8'));

data.lessons[3] = l3Fixed;

const newJsonStr = JSON.stringify(data, null, 2);
const newTxt = txt.substring(0, startIdx) + newJsonStr + txt.substring(endIdx);

fs.writeFileSync('early_modern_world/data.js', newTxt);
console.log('Successfully spliced fixed Lesson 3 into data.js');
