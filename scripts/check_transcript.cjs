const fs = require('fs');
const readline = require('readline');

async function inspectAudioSteps() {
  const fileStream = fs.createReadStream(
    'C:\\Users\\fives\\.gemini\\antigravity-ide\\brain\\9c54f6a7-31a4-4f9a-a543-dfbdde13fbae\\.system_generated\\logs\\transcript_full.jsonl',
  );
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  const steps = [3713, 3719, 3748, 3756, 3774, 3838, 3840, 3915, 3958];

  for await (const line of rl) {
    for (const s of steps) {
      if (line.includes('"step_index":' + s + ',')) {
        try {
          const obj = JSON.parse(line);
          console.log(
            `\n=================== STEP ${obj.step_index} (${obj.source} / ${obj.type} / status:${obj.status}) ===================`,
          );
          console.log(obj.content);
        } catch (e) {}
      }
    }
  }
}
inspectAudioSteps();
