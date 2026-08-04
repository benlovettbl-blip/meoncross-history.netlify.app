const fs = require('fs');

const logPath = 'C:\\Users\\fives\\.gemini\\antigravity\\brain\\6afc17fc-c4f8-4208-91bb-00957afe130a\\.system_generated\\logs\\transcript.jsonl';

try {
  const fileContent = fs.readFileSync(logPath, 'utf8');
  const lines = fileContent.split('\n');
  
  for (const line of lines) {
    if (!line) continue;
    try {
      const step = JSON.parse(line);
      // Let's print the first VIEW_FILE step we find
      if (step.type === 'VIEW_FILE' || (step.content && step.content.includes('window.startMePath = startMePath;'))) {
        console.log('--- MATCHING STEP ---');
        console.log('Keys:', Object.keys(step));
        console.log('Type:', step.type);
        console.log('Status:', step.status);
        console.log('Tool calls:', JSON.stringify(step.tool_calls));
        console.log('Content preview:', step.content ? step.content.substring(0, 100) : 'none');
        // Let's stop after one match
        break;
      }
    } catch (e) {
      // Ignore
    }
  }
} catch (err) {
  console.error(err);
}
