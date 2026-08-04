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
    if (data.step_index === 2168) {
      fs.writeFileSync('scratch/step_2168_raw.txt', data.content || JSON.stringify(data));
      console.log("Written step 2168 raw content to scratch/step_2168_raw.txt");
      rl.close();
    }
  } catch (err) {
  }
});
