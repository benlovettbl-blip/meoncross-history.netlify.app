const fs = require('fs');

const logPath = 'C:\\Users\\fives\\.gemini\\antigravity\\brain\\6afc17fc-c4f8-4208-91bb-00957afe130a\\.system_generated\\logs\\transcript.jsonl';

try {
  const fileContent = fs.readFileSync(logPath, 'utf8');
  const lines = fileContent.split('\n');
  
  // We want to reconstruct lines of the file.
  // Let's gather all view_file outputs.
  const fileLines = {};
  
  for (const line of lines) {
    if (!line) continue;
    try {
      const step = JSON.parse(line);
      // Look for a tool call to view_file or its output
      // In JSONL, step can be a PLANNER_RESPONSE (tool_calls) or a tool output from SYSTEM
      if (step.type === 'VIEW_FILE' && step.status === 'DONE' && step.content) {
        // Parse step.content to extract prefixed lines
        const content = step.content;
        const lineRegex = /^(\d+):\s(.*)$/gm;
        let match;
        while ((match = lineRegex.exec(content)) !== null) {
          const lineNum = parseInt(match[1]);
          const lineVal = match[2];
          fileLines[lineNum] = lineVal;
        }
      }
    } catch (e) {
      // Ignore parse errors
    }
  }
  
  // Sort line numbers and output
  const sortedNums = Object.keys(fileLines).map(Number).sort((a, b) => a - b);
  console.log(`Extracted ${sortedNums.length} unique lines from transcript.`);
  
  if (sortedNums.length > 0) {
    let output = '';
    let lastNum = 0;
    for (const num of sortedNums) {
      if (num !== lastNum + 1 && lastNum !== 0) {
        output += `\n// --- GAP between ${lastNum} and ${num} ---\n\n`;
      }
      output += `${fileLines[num]}\n`;
      lastNum = num;
    }
    fs.writeFileSync('scratch/reconstructed_original_games.js', output);
    console.log('Wrote reconstructed code to scratch/reconstructed_original_games.js');
  }
} catch (err) {
  console.error('Error during reconstruction:', err.message);
}
