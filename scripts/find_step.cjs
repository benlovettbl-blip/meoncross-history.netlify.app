const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('C:/Users/fives/.gemini/antigravity-ide/brain/efc3adb5-b930-4aa0-8eff-b383b1c606ab/.system_generated/logs/transcript.jsonl'),
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  if (line.includes('"step_index":1364') || line.includes('"step_index":1365') || line.includes('"step_index":1366') || line.includes('"step_index":1367')) {
    console.log('--- MATCH ---');
    console.log(line);
  }
});
