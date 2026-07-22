const fs = require('fs');

const dataFile = 'edexcel_medicine/data.js';
let dataContent = fs.readFileSync(dataFile, 'utf8');

const qRegex1 = /"text":\s*"([^"]*12 marks[^"]*)",/g;
let c1 = 0;
while (qRegex1.exec(dataContent) !== null) c1++;

let qRegex2 = /"text":\s*"([^"]*12 marks[^"]*)",[\s\S]*?"model":\s*"([^"]+)"/g;
let c2 = 0;
while (qRegex2.exec(dataContent) !== null) c2++;

console.log("qRegex1 matched:", c1);
console.log("qRegex2 matched:", c2);
