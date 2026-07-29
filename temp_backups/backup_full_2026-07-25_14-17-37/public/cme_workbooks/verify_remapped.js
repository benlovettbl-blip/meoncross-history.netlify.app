const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '..', 'questions.js');
const { QUIZ_DATA } = require(questionsFile);

let totalSubtopics = 0;
let errors = 0;

QUIZ_DATA.forEach(topic => {
  topic.subtopics.forEach(subtopic => {
    totalSubtopics++;
    const easyCount = subtopic.easy ? subtopic.easy.length : 0;
    const mediumCount = subtopic.medium ? subtopic.medium.length : 0;
    const difficultCount = subtopic.difficult ? subtopic.difficult.length : 0;

    console.log(`${subtopic.id}: easy=${easyCount}, medium=${mediumCount}, difficult=${difficultCount}`);

    if (easyCount !== 5 || mediumCount !== 5 || difficultCount !== 5) {
      console.error(`ERROR: ${subtopic.id} does not have 5-5-5 structure!`);
      errors++;
    }
  });
});

console.log(`Verification done. Total subtopics: ${totalSubtopics}, Errors: ${errors}`);
process.exit(errors > 0 ? 1 : 0);
