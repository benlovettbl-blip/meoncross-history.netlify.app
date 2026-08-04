const fs = require('fs');
const path = require('path');
const vm = require('vm');

const databasePath = path.join(__dirname, 'data.js');
const outputPath = path.join(__dirname, 'scratch_questions_elizabethan.txt');

let fileContent = fs.readFileSync(databasePath, 'utf8');

// Replace top-level const/let with var so they attach to the sandbox global object
let modifiedContent = fileContent.replace(/\bconst\s+/g, 'var ').replace(/\blet\s+/g, 'var ');

const sandbox = { exports: {}, window: {} };
vm.createContext(sandbox);
vm.runInContext(modifiedContent, sandbox);
const quizData = sandbox.quizData;

if (!quizData) {
  console.error("quizData is still undefined. Sandbox keys:", Object.keys(sandbox));
  process.exit(1);
}

let outputLines = [];
let count = 0;

quizData.forEach(topic => {
  if (!topic.questions) return;
  topic.questions.forEach(q => {
    count++;
    outputLines.push(`${q.question}|${q.answer}`);
  });
});

fs.writeFileSync(outputPath, outputLines.join('\n'), 'utf8');
console.log(`Extracted ${count} questions to scratch_questions_elizabethan.txt`);
