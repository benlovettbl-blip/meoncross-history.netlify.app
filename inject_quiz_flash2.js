const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'early_modern_world', 'data.js');
let dataContent = fs.readFileSync(dataPath, 'utf8');

const flashcards = JSON.parse(fs.readFileSync('temp_flashcards.json', 'utf8'));
const quiz = JSON.parse(fs.readFileSync('temp_quiz.json', 'utf8'));

// Inject Flashcards
for (const [lessonKey, cards] of Object.entries(flashcards)) {
    // extract lesson number
    const lessonNumMatch = lessonKey.match(/Lesson (\d+)/i);
    if (lessonNumMatch) {
        const num = lessonNumMatch[1];
        const idStr = `"id": "lesson_${num}"`;
        if (dataContent.includes(idStr)) {
            // Find if there is already a flashcards array
            const nextPart = dataContent.substring(dataContent.indexOf(idStr));
            // Just insert it right after the ID
            const replacement = `${idStr},\n            "flashcards": ${JSON.stringify(cards, null, 16).trim()}`;
            dataContent = dataContent.replace(idStr, replacement);
            console.log(`Injected flashcards for lesson_${num}`);
        } else {
            console.log(`Could not find id: lesson_${num}`);
        }
    }
}

// Inject Quiz into Lesson 6
const lesson6Id = `"id": "lesson_6"`;
if (dataContent.includes(lesson6Id)) {
    const quizStr = `${lesson6Id},\n            "quiz": ${JSON.stringify(quiz, null, 16).trim()}`;
    dataContent = dataContent.replace(lesson6Id, quizStr);
    console.log("Injected quiz into lesson_6");
} else {
    console.log("Could not find lesson_6");
}

fs.writeFileSync(dataPath, dataContent);
