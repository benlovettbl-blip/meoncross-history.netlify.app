const fs = require('fs');

const logPath = 'C:\\Users\\fives\\.gemini\\antigravity\\brain\\6afc17fc-c4f8-4208-91bb-00957afe130a\\.system_generated\\logs\\transcript.jsonl';

try {
  const fileContent = fs.readFileSync(logPath, 'utf8');
  const lines = fileContent.split('\n');
  
  for (const line of lines) {
    if (!line) continue;
    try {
      const step = JSON.parse(line);
      if (step.step_index === 4009) {
        console.log('--- STEP 4009 ---');
        console.log('Type:', step.type);
        console.log('Content preview:', step.content ? step.content.substring(0, 500) : 'none');
        console.log('Content length:', step.content ? step.content.length : 0);
      }
    } catch (e) {
      // Ignore
    }
  }
} catch (err) {
  console.error(err);
}
