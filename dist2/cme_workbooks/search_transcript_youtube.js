const fs = require('fs');
const readline = require('readline');

const logFile = 'C:\\Users\\fives\\.gemini\\antigravity\\brain\\8ca4f6c2-1478-4122-a2a0-e969d2315e83\\.system_generated\\logs\\transcript.jsonl';

const rl = readline.createInterface({
  input: fs.createReadStream(logFile),
  output: process.stdout,
  terminal: false
});

let lineNum = 0;
rl.on('line', (line) => {
  lineNum++;
  const lower = line.toLowerCase();
  if (lower.includes('youtube') || lower.includes('video') || lower.includes('channel') || lower.includes('playlist')) {
    try {
      const obj = JSON.parse(line);
      if (obj.source === 'USER_EXPLICIT' || obj.source === 'MODEL' || obj.type === 'USER_INPUT' || obj.type === 'PLANNER_RESPONSE') {
        console.log(`\n--- Line ${lineNum} [${obj.type || obj.source}] ---`);
        console.log(obj.content);
      } else {
        // Check if there is something interesting in tool calls
        if (obj.tool_calls) {
          console.log(`\n--- Line ${lineNum} [TOOL CALLS] ---`);
          console.log(JSON.stringify(obj.tool_calls).substring(0, 500));
        }
      }
    } catch (e) {
      console.log(`Line ${lineNum} (Invalid JSON): ${line.substring(0, 300)}...`);
    }
  }
});
