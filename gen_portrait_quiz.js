const fs = require('fs');
const path = require('path');

const biosPath = path.join(__dirname, 'early_modern_world', 'biographies.json');
const dataPath = path.join(__dirname, 'early_modern_world', 'data.js');

const biographies = JSON.parse(fs.readFileSync(biosPath, 'utf8'));
let dataContent = fs.readFileSync(dataPath, 'utf8');

const validPeople = biographies.filter(p => p.image);
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

fs.writeFileSync('temp_portrait_quiz.json', JSON.stringify(quizQuestions, null, 2));

console.log("Saved to temp_portrait_quiz.json");
