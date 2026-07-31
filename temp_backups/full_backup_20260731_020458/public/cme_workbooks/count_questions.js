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
  const codeToRun = code.replace('const QUIZ_DATA =', 'global.QUIZ_DATA =');
  const f = new Function('exports', 'window', codeToRun);
  f(sandbox.exports, sandbox.window);
};

runInSandbox(questionsContent);
const quizData = global.QUIZ_DATA;

quizData.forEach(topic => {
  console.log(`=========================================`);
  console.log(`${topic.title}`);
  topic.subtopics.forEach(subtopic => {
    console.log(`  ${subtopic.title}: standard=${subtopic.standard.length}, depth=${subtopic.depth.length}`);
  });
});
