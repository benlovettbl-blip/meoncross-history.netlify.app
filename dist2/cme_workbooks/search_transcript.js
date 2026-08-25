const fs = require('fs');
const readline = require('readline');
const path = require('path');

const logFile = 'C:\\Users\\fives\\.gemini\\antigravity\\brain\\8ca4f6c2-1478-4122-a2a0-e969d2315e83\\.system_generated\\logs\\transcript.jsonl';

const rl = readline.createInterface({
  input: fs.createReadStream(logFile),
  output: process.stdout,
  terminal: false
});

let lineNum = 0;
rl.on('line', (line) => {
  lineNum++;
  if (line.toLowerCase().includes('10 easy') || line.toLowerCase().includes('10 medium') || line.toLowerCase().includes('10 diff') || line.toLowerCase().includes('5 easy') || line.toLowerCase().includes('5 medium') || line.toLowerCase().includes('5 diff')) {
    console.log(`Line ${lineNum}: ${line.substring(0, 300)}...`);
  }
});
