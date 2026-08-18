const fs = require('fs');
const path = require('path');
const vm = require('vm');

const databasePath = path.join(__dirname, 'data.js');
const mappingPath = path.join(__dirname, 'scratch_distractors.json');

if (!fs.existsSync(mappingPath)) {
  console.error("Error: Mapping file not found at " + mappingPath);
  process.exit(1);
}

const mappings = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));
let fileContent = fs.readFileSync(databasePath, 'utf8');

// Parse
const sandbox = { exports: {}, window: {} };
vm.createContext(sandbox);
let modifiedContent = fileContent.replace(/\bconst\s+/g, 'var ').replace(/\blet\s+/g, 'var ');
vm.runInContext(modifiedContent, sandbox);
const quizData = sandbox.quizData;

if (!quizData) {
  console.error("Error: quizData is undefined in VM sandbox. Available keys:", Object.keys(sandbox));
  process.exit(1);
}

let updatedCount = 0;
quizData.forEach(topic => {
  if (!topic.questions) return;
  topic.questions.forEach(q => {
    if (mappings[q.question]) {
      q.distractors = mappings[q.question];
      updatedCount++;
    }
  });
});

console.log(`Updating ${updatedCount} questions in data.js...`);
const quizDataStartIdx = fileContent.indexOf('const quizData =');
const examDataStartIdx = fileContent.indexOf('const examData =');

if (quizDataStartIdx === -1 || examDataStartIdx === -1) {
  console.error("Error: Could not locate quizData or examData indices in data.js.");
  process.exit(1);
}

const firstPart = fileContent.substring(0, quizDataStartIdx);
const lastPart = fileContent.substring(examDataStartIdx);
const updatedContent = `${firstPart}const quizData = ${JSON.stringify(quizData, null, 2)};\n\n${lastPart}`;
fs.writeFileSync(databasePath, updatedContent, 'utf8');
console.log("Done.");
