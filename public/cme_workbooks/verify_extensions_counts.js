const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'src', 'lesson_extensions.js');

// Replace export with module.exports to import
const tempContent = fs.readFileSync(file, 'utf8').replace('export const LESSON_EXTENSIONS =', 'module.exports =');
const tempFile = path.join(__dirname, 'temp_verify_lesson_extensions.js');
fs.writeFileSync(tempFile, tempContent, 'utf8');

const LESSON_EXTENSIONS = require(tempFile);
fs.unlinkSync(tempFile);

const keyTopics = {
  "1": ["subtopic_1_1", "subtopic_1_2", "subtopic_1_3"],
  "2": ["subtopic_2_1", "subtopic_2_2", "subtopic_2_3"],
  "3": ["subtopic_3_1", "subtopic_3_2", "subtopic_3_3"]
};

for (const kt in keyTopics) {
  let easy = 0, medium = 0, difficult = 0;
  keyTopics[kt].forEach(subId => {
    const questions = LESSON_EXTENSIONS[subId].revisionQuestions;
    questions.forEach(q => {
      if (q.difficulty === 'Easy') easy++;
      else if (q.difficulty === 'Medium') medium++;
      else if (q.difficulty === 'Difficult') difficult++;
    });
  });
  console.log(`Key Topic ${kt}: Easy=${easy}, Medium=${medium}, Difficult=${difficult}`);
}
