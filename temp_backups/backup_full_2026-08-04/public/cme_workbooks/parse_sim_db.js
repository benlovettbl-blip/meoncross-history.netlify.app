const fs = require('fs');
const content = fs.readFileSync('app.js', 'utf8');

// We want to find the object that starts with "israeli_start:" and ends at the end of the database.
// Let's find the start of the object:
const startKey = 'israeli_start:';
const startIdx = content.indexOf(startKey);

if (startIdx !== -1) {
  // Let's trace braces to find the exact end of the object
  let braceCount = 1;
  let i = content.indexOf('{', startIdx);
  const startBraceIdx = i;
  i++;
  while (braceCount > 0 && i < content.length) {
    if (content[i] === '{') braceCount++;
    else if (content[i] === '}') braceCount--;
    i++;
  }
  const endBraceIdx = i;
  const objectStr = content.substring(startBraceIdx, endBraceIdx);
  
  // Let's format it. Since it's valid JS object literal, we can write it to a file as export const meSimulationDatabase = ...
  const formatted = "export const meSimulationDatabase = " + objectStr + ";";
  fs.writeFileSync('scratch/me_sim_db_restored.js', formatted);
  console.log("Successfully extracted and formatted database to scratch/me_sim_db_restored.js");
} else {
  console.log("Could not find start index");
}
