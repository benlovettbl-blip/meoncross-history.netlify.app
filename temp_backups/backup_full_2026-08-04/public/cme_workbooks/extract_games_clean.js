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
      if (step.type === 'VIEW_FILE' && step.status === 'DONE' && step.content && step.content.includes('games.js')) {
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
  
  const sortedNums = Object.keys(fileLines).map(Number).sort((a, b) => a - b);
  console.log(`Extracted ${sortedNums.length} unique lines for games.js`);
  
  let haifaCode = '';
  let missing = 0;
  for (let i = 1630; i <= 2382; i++) {
    if (fileLines[i] !== undefined) {
      haifaCode += `${fileLines[i]}\n`;
    } else {
      haifaCode += `// Missing line ${i}\n`;
      missing++;
    }
  }
  
  fs.writeFileSync('scratch/haifa_game_original.js', haifaCode);
  console.log(`Successfully wrote Haifa to Sinai original code to scratch/haifa_game_original.js. Missing lines: ${missing}`);
  
} catch (err) {
  console.error(err);
}
