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

// Mutate it
for (const subtopicId in LESSON_EXTENSIONS) {
  const questions = LESSON_EXTENSIONS[subtopicId].revisionQuestions;
  questions.forEach(q => {
    if (q.number >= 1 && q.number <= 3) {
      q.difficulty = "Easy";
    } else if (q.number >= 4 && q.number <= 7) {
      q.difficulty = "Medium";
    } else if (q.number >= 8 && q.number <= 10) {
      q.difficulty = "Difficult";
    }
  });
}

// Write it back as ES Module
const updatedContent = `export const LESSON_EXTENSIONS = ${JSON.stringify(LESSON_EXTENSIONS, null, 2)};\n`;
fs.writeFileSync(file, updatedContent, 'utf8');
console.log("Successfully remapped lesson_extensions.js!");
