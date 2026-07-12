const fs = require('fs');
const path = require('path');

const logPath = 'C:\\Users\\fives\\.gemini\\antigravity\\brain\\6afc17fc-c4f8-4208-91bb-00957afe130a\\.system_generated\\logs\\transcript.jsonl';

try {
  const fileContent = fs.readFileSync(logPath, 'utf8');
  const lines = fileContent.split('\n');
  
  // We want to find the first step containing view_file on src/games.js
  let found = [];
  for (const line of lines) {
    if (!line) continue;
    try {
      const step = JSON.parse(line);
      // Look for a tool call to view_file of src/games.js
      if (step.tool_calls) {
        for (const tc of step.tool_calls) {
          if (tc.name === 'view_file' && tc.args && tc.args.AbsolutePath && tc.args.AbsolutePath.includes('games.js')) {
            console.log(`Found tool call view_file in step ${step.step_index}, args:`, tc.args);
          }
        }
      }
      
      // Look for the response output that contains the file contents
      if (step.content && step.content.includes('window.startMePath = startMePath;')) {
        console.log(`Found content matching games.js at step ${step.step_index}`);
        found.push(step.content);
      }
    } catch (e) {
      // Ignore parse errors for incomplete lines
    }
  }
  
  if (found.length > 0) {
    fs.writeFileSync('scratch/extracted_games_content.txt', found.join('\n\n====================\n\n'));
    console.log('Successfully wrote extracted contents to scratch/extracted_games_content.txt');
  } else {
    console.log('Could not find matches in transcript.');
  }
} catch (err) {
  console.error('Error reading log:', err.message);
}
