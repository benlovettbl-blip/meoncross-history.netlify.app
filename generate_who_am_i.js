const fs = require('fs');
const path = require('path');

const biosPath = path.join(__dirname, 'early_modern_world', 'biographies.json');
const dataPath = path.join(__dirname, 'early_modern_world', 'data.js');

if (!fs.existsSync(biosPath) || !fs.existsSync(dataPath)) {
  console.error("Missing biographies.json or data.js");
  process.exit(1);
}

const biographies = JSON.parse(fs.readFileSync(biosPath, 'utf8'));
let dataContent = fs.readFileSync(dataPath, 'utf8');

// Filter out people who don't have a bio or significance
const validPeople = biographies.filter(p => p.bio || p.significance);

const quizQuestions = validPeople.map(person => {
  const bio = person.bio || person.significance;
  const questionText = `Who am I? ${bio}`;
  
  // Pick 3 random distractor names
  const distractors = new Set();
  while(distractors.size < 3) {
    const randomPerson = validPeople[Math.floor(Math.random() * validPeople.length)];
    if (randomPerson.name !== person.name) {
      distractors.add(randomPerson.name);
    }
  }
  
  const options = [person.name, ...Array.from(distractors)];
  // Shuffle options
  options.sort(() => Math.random() - 0.5);
  const answerIndex = options.indexOf(person.name);
  
  return {
    q: questionText,
    options: options,
    answer: answerIndex
  };
});

// We want to inject this into Lesson 6.
// Let's find Lesson 6 in data.js. It's a JS file exporting a variable `unitData`.
// A safer way is to just generate the JSON array and instruct the user to paste it, or use regex.
// Since data.js is a module, regex is easiest if we find Lesson 6.
// Let's use standard node string manipulation to insert it into Lesson 6.

let match = dataContent.match(/title:\s*["']Lesson 6:.*?(?=\},\s*\{|\}\s*\])/s);
if (match) {
  let lesson6Str = match[0];
  // Check if it already has a quiz
  if (lesson6Str.includes('quiz: [')) {
    // Replace existing quiz? 
    // Or just append these questions to the existing quiz array?
    console.log("Lesson 6 already has a quiz. Manual injection recommended or regex required.");
  } else {
    const quizStr = `\n    quiz: ${JSON.stringify(quizQuestions, null, 6)},\n`;
    const newLesson6Str = lesson6Str.replace(/(title:\s*["']Lesson 6:.*?["'],)/, `$1${quizStr}`);
    dataContent = dataContent.replace(lesson6Str, newLesson6Str);
    fs.writeFileSync(dataPath, dataContent);
    console.log("Successfully injected Who Am I quiz into Lesson 6 in data.js");
  }
} else {
  console.log("Could not find Lesson 6 in data.js");
}
