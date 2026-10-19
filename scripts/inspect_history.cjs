const fs = require('fs');
const readline = require('readline');

const file =
  'C:\\Users\\fives\\.gemini\\antigravity-ide\\brain\\9c54f6a7-31a4-4f9a-a543-dfbdde13fbae\\.system_generated\\logs\\transcript_full.jsonl';
const rl = readline.createInterface({ input: fs.createReadStream(file) });

rl.on('line', (line) => {
  try {
    const obj = JSON.parse(line);
    if (obj.step_index >= 3950 && obj.step_index <= 4045) {
      console.log(`\n=== STEP ${obj.step_index} (${obj.type}) ===`);
      if (obj.content) {
        console.log(obj.content.substring(0, 500));
      }
      if (obj.tool_calls) {
        console.log('Tool calls:', JSON.stringify(obj.tool_calls).substring(0, 300));
      }
    }
  } catch (e) {}
});
