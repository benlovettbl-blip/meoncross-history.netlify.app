const fs = require('fs');

const code = fs.readFileSync('questions.js', 'utf8');
const sandbox = {
  window: {},
  console: console
};

// Evaluate questions.js
const vm = require('vm');
vm.createContext(sandbox);
vm.runInContext(code, sandbox);

const QUIZ_DATA = sandbox.window.QUIZ_DATA;
if (!QUIZ_DATA) {
  console.error("QUIZ_DATA not found on window!");
  process.exit(1);
}

let total = 0;
let accepted = 0;
let rejectedReason = {
  tooLongAnswer: 0,
  notEnoughShortDistractors: 0,
  missingFields: 0
};

const tooLongAnswersList = [];
const allValidItems = [];

QUIZ_DATA.forEach(topic => {
  if (!topic.subtopics) return;
  topic.subtopics.forEach(subtopic => {
    ['easy', 'medium', 'difficult'].forEach(diff => {
      if (subtopic[diff]) {
        subtopic[diff].forEach(q => {
          total++;
          if (!q.question || !q.answer || !q.distractors || q.distractors.length < 2) {
            rejectedReason.missingFields++;
            return;
          }
          if (q.answer.length > 25) {
            rejectedReason.tooLongAnswer++;
            tooLongAnswersList.push({ answer: q.answer, len: q.answer.length });
            return;
          }
          const shortDistractors = q.distractors.filter(d => d.length <= 25);
          if (shortDistractors.length < 2) {
            rejectedReason.notEnoughShortDistractors++;
            return;
          }
          accepted++;
          allValidItems.push({
            q: q.question,
            a: q.answer,
            distractors: shortDistractors.slice(0, 2)
          });
        });
      }
    });
  });
});

console.log(`Total questions in questions.js: ${total}`);
console.log(`Accepted for game: ${accepted}`);
console.log(`Rejected because answer > 25 chars: ${rejectedReason.tooLongAnswer}`);
console.log(`Rejected because not enough distractors <= 25 chars: ${rejectedReason.notEnoughShortDistractors}`);
console.log(`Rejected due to missing fields: ${rejectedReason.missingFields}`);
console.log('Sample of too long answers:');
console.log(JSON.stringify(tooLongAnswersList.slice(0, 10), null, 2));
console.log(`Total accepted items length: ${allValidItems.length}`);
