const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '..', 'questions.js');
const questionsContent = fs.readFileSync(questionsFile, 'utf8');

const sandbox = {
  window: {},
  exports: {}
};
const runInSandbox = (code) => {
  const codeToRun = code.replace('const QUIZ_DATA =', 'global.QUIZ_DATA =');
  const f = new Function('exports', 'window', codeToRun);
  f(sandbox.exports, sandbox.window);
};

runInSandbox(questionsContent);
const quizData = global.QUIZ_DATA;

let grandTotal = 0;
quizData.forEach(topic => {
  console.log(`=========================================`);
  console.log(`${topic.title}`);
  topic.subtopics.forEach(subtopic => {
    const easyCount = subtopic.easy ? subtopic.easy.length : 0;
    const mediumCount = subtopic.medium ? subtopic.medium.length : 0;
    const difficultCount = subtopic.difficult ? subtopic.difficult.length : 0;
    const subtopicTotal = easyCount + mediumCount + difficultCount;
    grandTotal += subtopicTotal;
    console.log(`  ${subtopic.id} (${subtopic.title}): Easy=${easyCount}, Medium=${mediumCount}, Difficult=${difficultCount} (Total=${subtopicTotal})`);
  });
});
console.log(`=========================================`);
console.log(`Grand Total Questions: ${grandTotal}`);
