const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../units/cme_new/data.js');
let content = fs.readFileSync(dataFilePath, 'utf8');

console.log('Original data.js length:', content.length);

// 1. Fix missing names in narrative text
content = content.replace(/the Irgun \(led by \)/g, 'the Irgun (led by Menachem Begin)');
content = content.replace(
  /President , driven by strong domestic sympathy/g,
  'President Harry S. Truman, driven by strong domestic sympathy',
);
content = content.replace(
  /Why did President  authorise/g,
  'Why did President Harry S. Truman authorise',
);
content = content.replace(
  /British Prime Minister  viewed Nasser as a dangerous dictator/g,
  'British Prime Minister Anthony Eden viewed Nasser as a dangerous dictator',
);
content = content.replace(
  /Colonel  to power in Egypt/g,
  'Colonel Gamal Abdel Nasser to power in Egypt',
);

fs.writeFileSync(dataFilePath, content, 'utf8');
console.log('Fixed missing names in units/cme_new/data.js');
