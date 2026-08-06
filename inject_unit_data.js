const fs = require('fs');
const path = require('path');

const biosPath = path.join(__dirname, 'early_modern_world', 'biographies.json');
const dataPath = path.join(__dirname, 'early_modern_world', 'data.js');

const biographies = JSON.parse(fs.readFileSync(biosPath, 'utf8'));
let dataContent = fs.readFileSync(dataPath, 'utf8');

// 1. Generate "Who Am I?" Quiz
const validPeople = biographies.filter(p => p.bio || p.significance);
const quizQuestions = validPeople.map(person => {
  const bio = person.bio || person.significance;
  const questionText = `Who am I? ${bio}`;
  
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
    options: options,
    answer: answerIndex
  };
});

// 2. Generate Flashcards for each lesson
const flashcardsByLesson = {};
biographies.forEach(person => {
    if (!person.group || !person.bio) return;
    // Extract lesson number or exact title
    let lessonMatch = person.group.match(/Lesson \d+/);
    let lessonKey = lessonMatch ? lessonMatch[0] : person.group;
    if (!flashcardsByLesson[lessonKey]) {
        flashcardsByLesson[lessonKey] = [];
    }
    flashcardsByLesson[lessonKey].push({
        term: person.name,
        definition: person.bio
    });
});

// 3. Define Unit Timeline
const timelineEvents = [
    { year: "1453", title: "Fall of Constantinople", description: "The Ottoman Empire captured Constantinople, effectively ending the Byzantine Empire and blocking the main European trade route to Asia.", icon: "fa-solid fa-city" },
    { year: "1492", title: "Columbus's First Voyage", description: "Christopher Columbus reached the Americas, initiating widespread European exploration and colonization of the New World.", icon: "fa-solid fa-ship" },
    { year: "1494", title: "Treaty of Tordesillas", description: "Spain and Portugal divided the newly discovered lands outside Europe between themselves.", icon: "fa-solid fa-file-signature" },
    { year: "1517", title: "The Protestant Reformation Begins", description: "Martin Luther published his Ninety-five Theses, fracturing Christianity in Europe.", icon: "fa-solid fa-church" },
    { year: "1534", title: "Act of Supremacy", description: "King Henry VIII broke away from the Catholic Church, making himself head of the Church of England.", icon: "fa-solid fa-crown" },
    { year: "1585", title: "Roanoke Colony Founded", description: "Sir Walter Raleigh organized the first, ultimately unsuccessful, English settlement in North America.", icon: "fa-solid fa-anchor" },
    { year: "1588", title: "Defeat of the Spanish Armada", description: "England repelled a massive invasion fleet sent by Catholic Spain.", icon: "fa-solid fa-water" },
    { year: "1607", title: "Jamestown Founded", description: "The first permanent English settlement in the Americas was established in Virginia.", icon: "fa-solid fa-campground" },
    { year: "1615", title: "Roe's Embassy to India", description: "Sir Thomas Roe arrived at the Mughal Court to secure trading rights for the East India Company.", icon: "fa-solid fa-handshake" },
    { year: "1642", title: "English Civil War Begins", description: "Conflict erupted between King Charles I and Parliament over religious and political authority.", icon: "fa-solid fa-swords" },
    { year: "1649", title: "Execution of Charles I", description: "King Charles I was executed, and England briefly became a republic led by Oliver Cromwell.", icon: "fa-solid fa-gavel" },
    { year: "1660", title: "The Restoration", description: "The monarchy was restored under King Charles II after the collapse of the Protectorate.", icon: "fa-solid fa-chess-king" },
    { year: "1720s", title: "First Maroon War Begins", description: "Enslaved Africans in Jamaica who had escaped into the mountains fought a prolonged guerrilla war against the British.", icon: "fa-solid fa-mountain" },
    { year: "1750", title: "Britain on the Eve of Industrialization", description: "London became a booming metropolis marked by extreme wealth, widespread poverty, and global trade connections.", icon: "fa-solid fa-industry" }
];

// INJECTION LOGIC

// Inject Timeline at the root of unitData (before "lessons": [)
if (!dataContent.includes('"timeline":')) {
    const timelineStr = `"timeline": ${JSON.stringify(timelineEvents, null, 4)},\n    "lessons": [`;
    dataContent = dataContent.replace(/"lessons"\s*:\s*\[/, timelineStr);
}

// Write the modified data back (we'll use a simpler script for the flashcards and quiz to avoid regex issues on huge files)
fs.writeFileSync(dataPath, dataContent);

fs.writeFileSync('temp_quiz.json', JSON.stringify(quizQuestions, null, 2));
fs.writeFileSync('temp_flashcards.json', JSON.stringify(flashcardsByLesson, null, 2));

console.log("Timeline injected. Quiz and flashcards saved to temp JSON files for manual injection or regex.");
