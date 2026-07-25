const fs = require('fs');

const mergeContent = fs.readFileSync('scratch/merge_both_games.js', 'utf8');

// The Haifa code is inside a template literal starting with "const haifaCode = `\n" and ending with "\n`;"
const startMarker = 'const haifaCode = `';
const endMarker = '`;\r\n\r\n  // Write files';

const startIdx = mergeContent.indexOf(startMarker);
const endIdx = mergeContent.indexOf('`;\n\n  // Write files'); // check both line endings

let haifaText = "";
if (startIdx !== -1) {
  const actualStart = startIdx + startMarker.length;
  // Let's find the closing backtick
  let actualEnd = mergeContent.indexOf('`;', actualStart);
  haifaText = mergeContent.substring(actualStart, actualEnd);
  // Unescape backticks in the text
  haifaText = haifaText.replace(/\\`/g, '`').replace(/\\\$/g, '$');
  fs.writeFileSync('scratch/haifa_game_clean.js', haifaText);
  console.log("Successfully extracted Haifa game to scratch/haifa_game_clean.js");
} else {
  console.log("Could not find start marker");
}
