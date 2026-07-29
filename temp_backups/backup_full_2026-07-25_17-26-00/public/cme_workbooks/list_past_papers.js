const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '..', 'questions.js');
const questionsContent = fs.readFileSync(questionsFile, 'utf8');

const sandbox = {
  window: {},
  exports: {}
};
const runInSandbox = (code) => {
  const codeToRun = code.replace('const PAST_PAPERS_DATA =', 'global.PAST_PAPERS_DATA =');
  const f = new Function('exports', 'window', codeToRun);
  f(sandbox.exports, sandbox.window);
};

runInSandbox(questionsContent);
const pastPapersData = global.PAST_PAPERS_DATA;

if (!pastPapersData) {
  console.log("No PAST_PAPERS_DATA found.");
} else {
  pastPapersData.forEach(paper => {
    console.log(`=========================================`);
    console.log(`Paper: ${paper.title} (${paper.year})`);
    if (paper.q1) console.log(`  Q1: ${paper.q1.question || paper.q1.subQuestions.map(s => s.title).join(' / ')}`);
    if (paper.q2) console.log(`  Q2: ${paper.q2.question}`);
    if (paper.q3) {
      if (paper.q3.choices) {
        console.log(`  Q3 Choices:`);
        paper.q3.choices.forEach(c => console.log(`    - ${c.title}`));
      } else {
        console.log(`  Q3: ${paper.q3.question}`);
      }
    }
  });
}
