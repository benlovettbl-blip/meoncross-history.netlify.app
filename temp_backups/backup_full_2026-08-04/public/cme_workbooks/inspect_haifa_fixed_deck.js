const fs = require('fs');
const lines = fs.readFileSync('scratch/haifa_game_fixed.js', 'utf8').split('\n');

lines.forEach((line, idx) => {
  if (line.includes('DECK')) {
    console.log(`Line ${idx + 1}: ${line.trim()}`);
  }
});
