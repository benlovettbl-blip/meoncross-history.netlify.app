const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '..', 'questions.js');
const { QUIZ_DATA } = require(questionsFile);

QUIZ_DATA.forEach(topic => {
  console.log(`=========================================`);
  console.log(`${topic.title} (${topic.id})`);
  let topicEasy = 0, topicMedium = 0, topicDifficult = 0;
  
  topic.subtopics.forEach(subtopic => {
    const easyCount = subtopic.easy ? subtopic.easy.length : 0;
    const mediumCount = subtopic.medium ? subtopic.medium.length : 0;
    const difficultCount = subtopic.difficult ? subtopic.difficult.length : 0;
    
    console.log(`  ${subtopic.id}: easy=${easyCount}, medium=${mediumCount}, difficult=${difficultCount}`);
    topicEasy += easyCount;
    topicMedium += mediumCount;
    topicDifficult += difficultCount;
  });
  
  console.log(`  TOTAL for ${topic.id}: easy=${topicEasy}, medium=${topicMedium}, difficult=${topicDifficult}`);
});
