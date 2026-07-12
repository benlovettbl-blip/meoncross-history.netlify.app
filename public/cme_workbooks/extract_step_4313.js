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
    if (data.step_index === 4313 || data.step_index === 4325 || data.step_index === 4342) {
      console.log(`Step ${data.step_index}: content length = ${data.content ? data.content.length : 0}`);
      fs.writeFileSync(`scratch/step_${data.step_index}.txt`, JSON.stringify(data, null, 2));
    }
  } catch (err) {
  }
});
