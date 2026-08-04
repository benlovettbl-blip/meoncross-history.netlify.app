const fs = require('fs');

const answers = JSON.parse(fs.readFileSync('answers.json', 'utf8'));
let content = fs.readFileSync('edexcel_medicine/mock_exams.js', 'utf8');

// We will use eval to parse the array, update it, and write it back
const module = {};
eval(content.replace('export const mock_exams =', 'module.exports ='));

const mocks = module.exports;

for (const mock of mocks) {
  if (answers[mock.id]) {
    const paperAnswers = answers[mock.id];
    
    // Find Q4 and Q5/Q6 in section_b
    if (mock.section_b && mock.section_b.questions) {
      for (const q of mock.section_b.questions) {
        if (q.num === '4' && paperAnswers.q4) {
          q.model_answer = paperAnswers.q4;
        }
        if (q.type === 'either_or') {
          if (q.q5 && q.q5.num === '5' && paperAnswers.q5) {
            q.q5.model_answer = paperAnswers.q5;
          }
          if (q.q6 && q.q6.num === '6' && paperAnswers.q6) {
            q.q6.model_answer = paperAnswers.q6;
          }
        }
      }
    }
  }
}

const newContent = 'export const mock_exams = ' + JSON.stringify(mocks, null, 2) + ';\n';
fs.writeFileSync('edexcel_medicine/mock_exams.js', newContent);
console.log('Successfully injected model answers into mock_exams.js');
