const fs = require('fs');

const logPath = 'C:\\Users\\fives\\.gemini\\antigravity\\brain\\6afc17fc-c4f8-4208-91bb-00957afe130a\\.system_generated\\logs\\transcript.jsonl';

try {
  const fileContent = fs.readFileSync(logPath, 'utf8');
  const lines = fileContent.split('\n');
  
  const haifaLines = {};
  const jaffaLines = {};
  
  for (const line of lines) {
    if (!line) continue;
    try {
      const step = JSON.parse(line);
      if (step.type === 'VIEW_FILE' && step.status === 'DONE' && step.content && step.content.includes('games.js')) {
        const content = step.content;
        const lineRegex = /^(\d+):\s(.*)$/gm;
        let match;
        
        if (step.step_index < 4015) {
          // Haifa to Sinai version
          while ((match = lineRegex.exec(content)) !== null) {
            const lineNum = parseInt(match[1]);
            haifaLines[lineNum] = match[2];
          }
        } else {
          // Jaffa to Gaza version
          while ((match = lineRegex.exec(content)) !== null) {
            const lineNum = parseInt(match[1]);
            jaffaLines[lineNum] = match[2];
          }
        }
      }
    } catch (e) {
      // Ignore parse errors
    }
  }
  
  // Reconstruct Haifa
  const sortedHaifa = Object.keys(haifaLines).map(Number).sort((a, b) => a - b);
  console.log(`Haifa lines: ${sortedHaifa.length}`);
  let haifaCode = '';
  let missingHaifa = 0;
  for (let i = 1630; i <= 2382; i++) {
    if (haifaLines[i] !== undefined) {
      haifaCode += `${haifaLines[i]}\n`;
    } else {
      haifaCode += `// Missing line ${i}\n`;
      missingHaifa++;
    }
  }
  fs.writeFileSync('scratch/haifa_game_original.js', haifaCode);
  console.log(`Wrote Haifa to scratch/haifa_game_original.js, missing: ${missingHaifa}`);

  // Reconstruct Jaffa
  const sortedJaffa = Object.keys(jaffaLines).map(Number).sort((a, b) => a - b);
  console.log(`Jaffa lines: ${sortedJaffa.length}`);
  let jaffaCode = '';
  let missingJaffa = 0;
  for (let i = 1630; i <= 2382; i++) {
    if (jaffaLines[i] !== undefined) {
      jaffaCode += `${jaffaLines[i]}\n`;
    } else {
      jaffaCode += `// Missing line ${i}\n`;
      missingJaffa++;
    }
  }
  fs.writeFileSync('scratch/jaffa_games_backup.js', jaffaCode);
  console.log(`Wrote Jaffa backup to scratch/jaffa_games_backup.js, missing: ${missingJaffa}`);

} catch (err) {
  console.error(err);
}
