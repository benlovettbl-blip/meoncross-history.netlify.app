const fs = require('fs');

const txt = fs.readFileSync('early_modern_world/data.js', 'utf8');
const startIdx = txt.indexOf('{');
const endIdx = txt.lastIndexOf('}') + 1;
const jsonStr = txt.substring(startIdx, endIdx);
const data = eval('(' + jsonStr + ')');

const challenges = [
  {
    lesson: 0,
    text: "How does the vast wealth of Ming China and the Mali Empire in 1450 challenge the traditional idea that Europe was the only 'modern' or advanced civilization?"
  },
  {
    lesson: 1,
    text: "To what extent did the defeat of the Spanish Armada and the rise of joint-stock privateers lay the foundation for a 'modern' global empire?"
  },
  {
    lesson: 2,
    text: "How did the creation of joint-stock companies (like the East India Company) make Britain financially 'modern', despite their brutal early struggles?"
  },
  {
    lesson: 3,
    text: "Did the execution of Charles I and the rise of Parliament make Britain's government truly 'modern', or just transfer power to wealthy merchants?"
  },
  {
    lesson: 4,
    text: "How did the Transatlantic Slave Trade expose the dark contradiction between Britain's 'modern' economic wealth and its brutal, un-modern social exploitation?"
  },
  {
    lesson: 5,
    text: "How did the continuous resistance of enslaved Africans prove that 'modernity' and freedom were not gifts given by Europeans, but rights fought for by the oppressed?"
  }
];

challenges.forEach(c => {
  const lesson = data.lessons[c.lesson];
  
  const block = {
    title: "Synoptic Challenge (Extension)",
    text: "This open-ended task is designed to prepare you for the final assessment in Lesson 6. Write a full paragraph answering the question below, using specific historical evidence from today's lesson.",
    extended: {
      question: c.text,
      scaffolding: [
        "Start with a clear argument answering the question directly.",
        "Provide specific historical evidence from today's lesson (names, dates, concepts).",
        "Explain how this evidence proves your point about 'modernity'."
      ]
    }
  };

  // Find index to insert
  const plenaryIndex = lesson.narrative_blocks.findIndex(b => b.title === 'Plenary Check');
  if (plenaryIndex !== -1) {
    // Insert before Plenary Check
    lesson.narrative_blocks.splice(plenaryIndex, 0, block);
  } else {
    // Insert at the end
    lesson.narrative_blocks.push(block);
  }
});

const newJsonStr = JSON.stringify(data, null, 2);
const newTxt = txt.substring(0, startIdx) + newJsonStr + txt.substring(endIdx);
fs.writeFileSync('early_modern_world/data.js', newTxt);
console.log('Successfully injected Synoptic Challenge blocks into Lessons 0-5!');
