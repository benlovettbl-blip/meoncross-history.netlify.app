const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'early_modern_world', 'data.js');
let dataContent = fs.readFileSync(dataPath, 'utf8');

const flashcards = JSON.parse(fs.readFileSync('temp_flashcards.json', 'utf8'));
const quiz = JSON.parse(fs.readFileSync('temp_quiz.json', 'utf8'));

// Inject Flashcards
for (const [lessonKey, cards] of Object.entries(flashcards)) {
    // Find the lesson title in dataContent
    const titleRegex = new RegExp(`("title"\\s*:\\s*"${lessonKey}.*?"\\s*,)`, 'i');
    const match = dataContent.match(titleRegex);
    if (match) {
        const flashcardsStr = `\n            "flashcards": ${JSON.stringify(cards, null, 16).trim()},`;
        dataContent = dataContent.replace(match[0], `${match[0]}${flashcardsStr}`);
    } else {
        console.log(`Could not find lesson: ${lessonKey}`);
    }
}

// Inject Quiz into Lesson 6
const lesson6Match = dataContent.match(/("title"\s*:\s*"Lesson 6:.*?"\s*,)/);
if (lesson6Match) {
    const quizStr = `\n            "quiz": ${JSON.stringify(quiz, null, 16).trim()},`;
    dataContent = dataContent.replace(lesson6Match[0], `${lesson6Match[0]}${quizStr}`);
} else {
    console.log("Could not find Lesson 6");
}

fs.writeFileSync(dataPath, dataContent);
console.log("Injected flashcards and quiz into data.js");
