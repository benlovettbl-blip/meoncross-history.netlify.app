const fs = require('fs');
const content = fs.readFileSync('app.js', 'utf8');

const startKey = 'israeli_start:';
const keyIdx = content.indexOf(startKey);

if (keyIdx !== -1) {
  // Find the first '{' before keyIdx
  let startBraceIdx = -1;
  for (let j = keyIdx; j >= 0; j--) {
    if (content[j] === '{') {
      startBraceIdx = j;
      break;
    }
  }

  if (startBraceIdx !== -1) {
    let braceCount = 1;
    let i = startBraceIdx + 1;
    while (braceCount > 0 && i < content.length) {
      if (content[i] === '{') braceCount++;
      else if (content[i] === '}') braceCount--;
      i++;
    }
    const endBraceIdx = i;
    const objectStr = content.substring(startBraceIdx, endBraceIdx);
    
    const formatted = "export const meSimulationDatabase = " + objectStr + ";";
    fs.writeFileSync('scratch/me_sim_db_restored.js', formatted);
    console.log("Successfully extracted full database to scratch/me_sim_db_restored.js, length:", formatted.length);
  } else {
    console.log("Could not find start brace before key");
  }
} else {
  console.log("Could not find start index");
}
