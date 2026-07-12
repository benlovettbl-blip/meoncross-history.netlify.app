const fs = require('fs');

const logPath = 'C:\\Users\\fives\\.gemini\\antigravity\\brain\\6afc17fc-c4f8-4208-91bb-00957afe130a\\.system_generated\\logs\\transcript.jsonl';

try {
  const fileContent = fs.readFileSync(logPath, 'utf8');
  const lines = fileContent.split('\n');
  const fileLines = {};
  
  for (const line of lines) {
    if (!line) continue;
    try {
      const step = JSON.parse(line);
      if (step.type === 'VIEW_FILE' && step.status === 'DONE' && step.content) {
        // Only get lines if the file path is the original games.js
        if (step.tool_calls && step.tool_calls[0] && step.tool_calls[0].args && step.tool_calls[0].args.AbsolutePath && step.tool_calls[0].args.AbsolutePath.includes('games.js')) {
          const content = step.content;
          const lineRegex = /^(\d+):\s(.*)$/gm;
          let match;
          while ((match = lineRegex.exec(content)) !== null) {
            const lineNum = parseInt(match[1]);
            const lineVal = match[2];
            fileLines[lineNum] = lineVal;
          }
        }
      }
    } catch (e) {
      // Ignore parse errors
    }
  }
  
  const sortedNums = Object.keys(fileLines).map(Number).sort((a, b) => a - b);
  
  // Now, let's write the lines in the range of the Haifa to Sinai game.
  // The games.js original file had meEpicEngine from line 1639 (or 1635) to the end (line 2382).
  // Let's print out if we have these lines.
  let haifaCode = '';
  for (let i = 1630; i <= 2382; i++) {
    if (fileLines[i] !== undefined) {
      haifaCode += `${fileLines[i]}\n`;
    } else {
      haifaCode += `// Missing line ${i}\n`;
    }
  }
  
  fs.writeFileSync('scratch/haifa_game_original.js', haifaCode);
  console.log('Successfully wrote Haifa to Sinai original code to scratch/haifa_game_original.js');
  
} catch (err) {
  console.error(err);
}
