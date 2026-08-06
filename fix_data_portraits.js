const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'early_modern_world', 'data.js');
let content = fs.readFileSync(dataPath, 'utf8');

// 1. Remove the malformed first quiz array from lesson_6
// It starts at "id": "lesson_6", \n "quiz": [
// and ends right before "title": "1750: London, Poverty, and the Ancien Régime",
const lesson6Start = content.indexOf('"id": "lesson_6",');
const titleStart = content.indexOf('"title": "1750: London, Poverty, and the Ancien Régime",', lesson6Start);

if (lesson6Start !== -1 && titleStart !== -1) {
    const chunkToRemove = content.substring(lesson6Start + '"id": "lesson_6",'.length, titleStart);
    // Remove the chunk
    content = content.substring(0, lesson6Start + '"id": "lesson_6",\n            '.length) + content.substring(titleStart);
    console.log('Removed malformed quiz array from lesson_6');
}

// 2. We can add a portrait quiz array directly into data.js at the very end of unitData.
const biosPath = path.join(__dirname, 'early_modern_world', 'biographies.json');
const biographies = JSON.parse(fs.readFileSync(biosPath, 'utf8'));
const validPeople = biographies.filter(p => p.image && p.image.trim() !== '');

const quizQuestions = validPeople.map(person => {
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
    q: "Who is this historical figure?",
    img: person.image,
    options: options,
    answer: answerIndex,
    source: "Key Individuals"
  };
});

// Remove any remaining portrait questions from all quizzes just in case
// using regex replace:
// Actually, it's safer to just let quiz_zone.js filter them if they exist, but if we add them as a separate property, quiz_zone can just read `unitData.portraits`.

// Inject unitData.portraits before the final closing brace of unitData
const lastBraceIndex = content.lastIndexOf('};');
if (lastBraceIndex !== -1) {
    const newPortraits = ',\n    "portraits": ' + JSON.stringify(quizQuestions, null, 4) + '\n';
    content = content.substring(0, lastBraceIndex) + newPortraits + content.substring(lastBraceIndex);
    fs.writeFileSync(dataPath, content);
    console.log('Added portraits to unitData');
} else {
    console.log('Could not find end of unitData');
}
