const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '..', 'questions.js');
const questionsContent = fs.readFileSync(questionsFile, 'utf8');

// Load questions by simulating environment
const sandbox = {
  window: {},
  exports: {}
};
const runInSandbox = (code) => {
  const f = new Function('exports', 'window', code);
  f(sandbox.exports, sandbox.window);
};

runInSandbox(questionsContent);
const quizData = sandbox.window.QUIZ_DATA || sandbox.exports.QUIZ_DATA;

let output = '';
quizData.forEach(topic => {
  output += `=========================================\n`;
  output += `${topic.title}\n`;
  output += `=========================================\n\n`;
  topic.subtopics.forEach(subtopic => {
    output += `-----------------------------------------\n`;
    output += `${subtopic.title}\n`;
    output += `-----------------------------------------\n`;
    output += `STANDARD QUESTIONS:\n`;
    subtopic.standard.forEach((q, idx) => {
      output += `${idx + 1}. [${q.id}] ${q.question}\n   Answer: ${q.answer}\n   Explanation: ${q.explanation}\n`;
    });
    output += `\nDEPTH QUESTIONS:\n`;
    subtopic.depth.forEach((q, idx) => {
      output += `${idx + 1}. [${q.id}] ${q.question}\n   Answer: ${q.answer}\n   Explanation: ${q.explanation}\n`;
    });
    output += `\n`;
  });
});

fs.writeFileSync(path.join(__dirname, 'extracted_questions.txt'), output, 'utf8');
console.log('Successfully extracted questions to scratch/extracted_questions.txt');
