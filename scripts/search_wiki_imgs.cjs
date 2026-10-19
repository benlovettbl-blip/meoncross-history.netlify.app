const fs = require('fs');

const content = fs.readFileSync(
  'C:/Users/fives/.gemini/antigravity-ide/brain/8bb45b3b-bf55-43ff-bef8-a0c9644ffce6/.system_generated/steps/1971/content.md',
  'utf8',
);
const regex = /File:([^\"]+?\.(?:jpg|png|tif))/gi;
let m;
const found = new Set();
while ((m = regex.exec(content)) !== null) {
  found.add(m[1]);
}
console.log('Found files:', Array.from(found));
