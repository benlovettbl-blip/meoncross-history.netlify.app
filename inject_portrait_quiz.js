const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'early_modern_world', 'data.js');
let dataContent = fs.readFileSync(dataPath, 'utf8');

const portraitQuiz = JSON.parse(fs.readFileSync('temp_portrait_quiz.json', 'utf8'));

const lesson6Id = `"id": "lesson_6"`;
if (dataContent.includes(lesson6Id)) {
    // Find the existing quiz array inside Lesson 6
    const lesson6Start = dataContent.indexOf(lesson6Id);
    
    // We can just append the objects to the existing quiz array
    // Since we know we literally just injected "quiz": [...] there, we can do a regex replacement on it.
    
    // It's safer to just do a quick replace string
    const quizMatch = dataContent.substring(lesson6Start).match(/"quiz"\s*:\s*\[([\s\S]*?)\]/);
    if (quizMatch) {
        // Build the inner content of the new array items
        const newQuizItemsStr = JSON.stringify(portraitQuiz, null, 16).trim().slice(1, -1); // strip the outer brackets
        
        const oldInner = quizMatch[1];
        const combinedInner = oldInner.trim() === "" ? newQuizItemsStr : oldInner + ",\n" + newQuizItemsStr;
        
        const newQuizStr = `"quiz": [\n${combinedInner}\n            ]`;
        
        const before = dataContent.substring(0, lesson6Start);
        const after = dataContent.substring(lesson6Start).replace(quizMatch[0], newQuizStr);
        
        fs.writeFileSync(dataPath, before + after);
        console.log("Injected portrait quiz successfully.");
    } else {
        console.log("Could not find existing quiz array in Lesson 6");
    }
} else {
    console.log("Could not find lesson_6");
}
