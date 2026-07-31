const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'src', 'lesson_extensions.js');
let content = fs.readFileSync(file, 'utf8');

// Replace export with module.exports
const tempContent = content.replace('export const LESSON_EXTENSIONS =', 'module.exports =');
const tempFile = path.join(__dirname, 'temp_lesson_extensions.js');
fs.writeFileSync(tempFile, tempContent, 'utf8');

const LESSON_EXTENSIONS = require(tempFile);
fs.unlinkSync(tempFile);

// Mutate it to get exactly 10 Easy, 10 Medium, 10 Difficult per Key Topic
// Subtopic x.1: 3 Easy, 4 Medium, 3 Difficult
// Subtopic x.2: 4 Easy, 3 Medium, 3 Difficult
// Subtopic x.3: 3 Easy, 3 Medium, 4 Difficult

for (const subtopicId in LESSON_EXTENSIONS) {
  const questions = LESSON_EXTENSIONS[subtopicId].revisionQuestions;
  
  if (subtopicId.endsWith('_1')) {
    // 3 Easy (Q1-3), 4 Medium (Q4-7), 3 Difficult (Q8-10)
    questions.forEach(q => {
      if (q.number >= 1 && q.number <= 3) q.difficulty = "Easy";
      else if (q.number >= 4 && q.number <= 7) q.difficulty = "Medium";
      else if (q.number >= 8 && q.number <= 10) q.difficulty = "Difficult";
    });
  } else if (subtopicId.endsWith('_2')) {
    // 4 Easy (Q1-4), 3 Medium (Q5-7), 3 Difficult (Q8-10)
    questions.forEach(q => {
      if (q.number >= 1 && q.number <= 4) q.difficulty = "Easy";
      else if (q.number >= 5 && q.number <= 7) q.difficulty = "Medium";
      else if (q.number >= 8 && q.number <= 10) q.difficulty = "Difficult";
    });
  } else if (subtopicId.endsWith('_3')) {
    // 3 Easy (Q1-3), 3 Medium (Q4-6), 4 Difficult (Q7-10)
    questions.forEach(q => {
      if (q.number >= 1 && q.number <= 3) q.difficulty = "Easy";
      else if (q.number >= 4 && q.number <= 6) q.difficulty = "Medium";
      else if (q.number >= 7 && q.number <= 10) q.difficulty = "Difficult";
    });
  }
}

// Write it back as ES Module
const updatedContent = `export const LESSON_EXTENSIONS = ${JSON.stringify(LESSON_EXTENSIONS, null, 2)};\n`;
fs.writeFileSync(file, updatedContent, 'utf8');
console.log("Successfully remapped lesson_extensions.js to exactly 10 Easy, 10 Medium, and 10 Difficult per Key Topic!");
