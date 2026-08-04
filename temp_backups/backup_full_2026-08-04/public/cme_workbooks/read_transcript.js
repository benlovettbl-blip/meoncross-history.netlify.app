const fs = require('fs');

const logPath = 'C:\\Users\\fives\\.gemini\\antigravity\\brain\\9c2a7a4b-0418-4467-a7e3-99d8149df278\\.system_generated\\logs\\transcript.jsonl';
if (!fs.existsSync(logPath)) {
  console.error("Log file does not exist at:", logPath);
  process.exit(1);
}

const lines = fs.readFileSync(logPath, 'utf8').trim().split('\n');

lines.forEach((line, index) => {
  try {
    const obj = JSON.parse(line);
    if (obj.step_index >= 96 && obj.step_index <= 144) {
      console.log(`\n--- STEP ${obj.step_index} (${obj.source} / ${obj.type}) ---`);
      if (obj.content) {
        console.log(obj.content.substring(0, 500));
      }
      if (obj.tool_calls) {
        console.log(`Tool calls: ${obj.tool_calls.map(tc => tc.name).join(', ')}`);
      }
    }
  } catch (e) {
  }
});
