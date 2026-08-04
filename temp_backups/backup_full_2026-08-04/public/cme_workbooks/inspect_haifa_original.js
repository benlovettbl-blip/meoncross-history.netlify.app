const fs = require('fs');

const logPath = 'C:\\Users\\fives\\.gemini\\antigravity\\brain\\6afc17fc-c4f8-4208-91bb-00957afe130a\\.system_generated\\logs\\transcript.jsonl';

try {
  const fileContent = fs.readFileSync(logPath, 'utf8');
  const lines = fileContent.split('\n');
  
  for (const line of lines) {
    if (!line) continue;
    try {
      const step = JSON.parse(line);
      if (step.type === 'VIEW_FILE' && step.status === 'DONE' && step.content && step.content.includes('games.js')) {
        if (step.step_index < 4015 && step.content.includes('2230:')) {
          console.log(`Step ${step.step_index} contains line 2230. Content slice around 2230:`);
          const idx = step.content.indexOf('2230:');
          console.log(step.content.substring(idx - 100, idx + 300));
        }
      }
    } catch (e) {
      // Ignore
    }
  }
} catch (err) {
  console.error(err);
}
