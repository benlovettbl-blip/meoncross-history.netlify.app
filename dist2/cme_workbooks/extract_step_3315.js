const fs = require('fs');
const readline = require('readline');

const logPath = 'C:\\Users\\fives\\.gemini\\antigravity\\brain\\6afc17fc-c4f8-4208-91bb-00957afe130a\\.system_generated\\logs\\transcript.jsonl';
const fileStream = fs.createReadStream(logPath);

const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  try {
    const data = JSON.parse(line);
    if (data.step_index === 3315) {
      console.log("Found step 3315!");
      // Write the content to scratch/extracted_step_3315.txt
      fs.writeFileSync('scratch/extracted_step_3315.txt', data.content || JSON.stringify(data));
      console.log("Written to scratch/extracted_step_3315.txt successfully.");
      rl.close();
    }
  } catch (err) {
    // ignore parse errors
  }
});
