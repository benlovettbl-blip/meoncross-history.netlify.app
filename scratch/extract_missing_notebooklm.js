const fs = require('fs');
const path = require('path');

const dataFile = path.resolve(__dirname, '../edexcel_medicine/data.js');
let dataContent = fs.readFileSync(dataFile, 'utf8');

const startIndex = dataContent.indexOf('{');
const endIndex = dataContent.lastIndexOf('}');
const jsonStr = dataContent.substring(startIndex, endIndex + 1);

const data = eval('(' + jsonStr + ')');

const missingQuestions = [];

data.lessons.forEach(l => {
  if (l.extended && l.extended.question) {
    missingQuestions.push({
      lesson: l.title,
      type: 'extended (16-mark)',
      question: l.extended.question
    });
  }
  
  if (l.exam_practice) {
    l.exam_practice.forEach(ep => {
      missingQuestions.push({
        lesson: l.title,
        type: 'exam_practice',
        question: ep.question
      });
    });
  }
  
  if (l.gcse_task && l.gcse_task.tasks) {
    l.gcse_task.tasks.forEach(t => {
      // If it doesn't have "(12 marks)", it's probably not the NotebookLM injected one
      // Let's also check if it's not a 12-mark question
      if (!t.text.includes('(12 marks)')) {
        missingQuestions.push({
          lesson: l.title,
          type: 'gcse_task',
          question: t.text
        });
      }
    });
  }
});

console.log(JSON.stringify(missingQuestions, null, 2));
