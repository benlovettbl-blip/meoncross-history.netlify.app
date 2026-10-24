const fs = require('fs');
const readline = require('readline');

async function readUserInputs() {
  const fileStream = fs.createReadStream(
    'C:/Users/fives/.gemini/antigravity-ide/brain/6e3c76d8-c0a3-4cee-941a-122bef1ea684/.system_generated/logs/transcript.jsonl',
  );
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  for await (const line of rl) {
    if (line.includes('"type":"USER_INPUT"')) {
      try {
        const obj = JSON.parse(line);
        console.log('--- USER INPUT (step ' + obj.step_index + ') ---');
        console.log(obj.content);
      } catch (e) {}
    }
  }
}

readUserInputs().catch(console.error);
