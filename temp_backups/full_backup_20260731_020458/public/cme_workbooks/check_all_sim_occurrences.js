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
    const text = JSON.stringify(data);
    if (text.includes('meSimulationDatabase')) {
      const isTruncated = text.includes('truncated') || text.includes('Truncated');
      console.log(`Step ${data.step_index}: type=${data.type}, source=${data.source}, length=${text.length}, hasTruncated=${isTruncated}`);
    }
  } catch (err) {
  }
});
