const fs = require('fs');
const path = require('path');

const biosPath = path.join(__dirname, 'early_modern_world', 'biographies.json');
const dataPath = path.join(__dirname, 'early_modern_world', 'data.js');

const biographies = JSON.parse(fs.readFileSync(biosPath, 'utf8'));

// Filter people who have an image and aren't blank
const validPeople = biographies.filter(p => p.image && p.image.trim() !== '');

const quizQuestions = validPeople.map(person => {
  const questionText = `Who is this historical figure?`;
  
  const distractors = new Set();
  while(distractors.size < 3) {
    const randomPerson = validPeople[Math.floor(Math.random() * validPeople.length)];
    if (randomPerson.name !== person.name) {
      distractors.add(randomPerson.name);
    }
  }
  const options = [person.name, ...Array.from(distractors)];
  options.sort(() => Math.random() - 0.5);
  const answerIndex = options.indexOf(person.name);
  
  return {
    q: questionText,
    img: person.image,
    options: options,
    answer: answerIndex
  };
});

console.log(`Generated ${quizQuestions.length} portrait questions.`);

// We need to inject these questions into data.js
let dataContent = fs.readFileSync(dataPath, 'utf8');

// The safest way is to locate "id": "lesson_6", then locate its "quiz": [ array, and append.
const lesson6Index = dataContent.indexOf('"id": "lesson_6"');
if (lesson6Index !== -1) {
    // Find the end of the "quiz": [ array in lesson 6.
    const quizIndex = dataContent.indexOf('"quiz": [', lesson6Index);
    if (quizIndex !== -1) {
        // We will insert our quiz questions right after `"quiz": [`
        
        const newQuizItemsStr = JSON.stringify(quizQuestions, null, 16).trim().slice(1, -1); // strip the outer brackets
        
        const insertPos = quizIndex + '"quiz": ['.length;
        const before = dataContent.substring(0, insertPos);
        const after = dataContent.substring(insertPos);
        
        // Append comma if needed
        const newStr = '\n' + newQuizItemsStr + ',\n';
        
        fs.writeFileSync(dataPath, before + newStr + after);
        console.log("Injected portrait quiz successfully into Lesson 6.");
    } else {
        console.log("Could not find quiz array in lesson 6");
    }
} else {
    console.log("Could not find lesson_6");
}
