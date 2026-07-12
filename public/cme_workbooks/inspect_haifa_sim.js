const fs = require('fs');
const content = fs.readFileSync('scratch/haifa_game_original.js', 'utf8');

const simDbMatch = content.includes('meSimulationDatabase');
const initSimMatch = content.includes('initMeSimGame');

console.log(`meSimulationDatabase present: ${simDbMatch}`);
console.log(`initMeSimGame present: ${initSimMatch}`);

if (simDbMatch) {
  // Find where meSimulationDatabase starts and print the first 200 chars
  const startIdx = content.indexOf('meSimulationDatabase');
  console.log("Snippet:");
  console.log(content.substring(startIdx, startIdx + 300));
}
