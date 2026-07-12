const fs = require('fs');
const content = fs.readFileSync('scratch/reconstructed_original_games.js', 'utf8');

const occurrences = [];
const lines = content.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('israeli_start') || line.includes('SimulationDatabase') || line.includes('meSimulationDatabase')) {
    occurrences.push({ lineNum: idx + 1, content: line.trim() });
  }
});

console.log("Found occurrences:", occurrences);
