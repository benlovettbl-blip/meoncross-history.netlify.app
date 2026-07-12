const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'firefly_embed.html');
const content = fs.readFileSync(file, 'utf8');

// Find QUIZ_DATA in firefly_embed.html
const startIdx = content.indexOf('const QUIZ_DATA =');
if (startIdx !== -1) {
  console.log("Found QUIZ_DATA in firefly_embed.html!");
  // We can write a quick regex or extraction
  const snippet = content.substring(startIdx, startIdx + 2000);
  console.log("Snippet:", snippet);
} else {
  console.log("Could not find QUIZ_DATA in firefly_embed.html");
}
