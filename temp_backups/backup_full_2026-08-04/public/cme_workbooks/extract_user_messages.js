const fs = require('fs');
const path = require('path');

const logPath = 'C:\\Users\\fives\\.gemini\\antigravity\\brain\\6afc17fc-c4f8-4208-91bb-00957afe130a\\.system_generated\\logs\\transcript.jsonl';

if (fs.existsSync(logPath)) {
  const content = fs.readFileSync(logPath, 'utf8');
  const lines = content.split('\n');
  const userMessages = [];
  for (const line of lines) {
    if (!line.trim()) continue;
    try {
      const obj = JSON.parse(line);
      if (obj.source === 'USER_EXPLICIT' && obj.type === 'USER_INPUT') {
        userMessages.push({
          step_index: obj.step_index,
          content: obj.content
        });
      }
    } catch (e) {
      // ignore parsing errors for truncated logs
    }
  }
  console.log(JSON.stringify(userMessages.slice(-15), null, 2));
} else {
  console.log('Log file not found at: ' + logPath);
}
