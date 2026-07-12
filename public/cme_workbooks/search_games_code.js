const fs = require('fs');
const code = fs.readFileSync('src/games.js', 'utf8');
const lines = code.split('\n');

function findMatches(keyword) {
  console.log(`=== Matches for "${keyword}" ===`);
  lines.forEach((line, idx) => {
    if (line.includes(keyword)) {
      console.log(`Line ${idx + 1}: ${line.trim()}`);
    }
  });
}

findMatches('transitionToRoom');
findMatches('transitionToJaffaRoom');
findMatches('jaffaEpicEngine');
