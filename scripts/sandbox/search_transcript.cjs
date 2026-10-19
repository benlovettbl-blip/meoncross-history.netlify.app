const fs = require('fs');
const readline = require('readline');

async function searchTranscript() {
  const filePath =
    'C:/Users/fives/.gemini/antigravity-ide/brain/9c54f6a7-31a4-4f9a-a543-dfbdde13fbae/.system_generated/logs/transcript.jsonl';
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  let idx = 0;
  for await (const line of rl) {
    if (line.includes('"USER_INPUT"')) {
      if (idx >= 29 && idx <= 34) {
        console.log(`\n=================== USER MSG ${idx} ===================`);
        const data = JSON.parse(line);
        console.log(data.content);
      }
      idx++;
    } else if (line.includes('"PLANNER_RESPONSE"')) {
      if (idx > 29 && idx <= 34) {
        // print a summary of planner response
        const data = JSON.parse(line);
        console.log(`\n--- AGENT RESPONSE for turn ${idx - 1} ---`);
        console.log((data.content || '').slice(0, 300));
      }
    }
  }
}

searchTranscript();
