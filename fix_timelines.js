const fs = require('fs');

const publicPath = './public/data/water_and_sanitation.json';
const srcPath = 'water_and_sanitation/data.js';

let jsonData = JSON.parse(fs.readFileSync(publicPath, 'utf8'));

// Handle {"data": {...}} wrapper if it exists
let unitData = jsonData.data ? jsonData.data : jsonData;

// Get Lesson 1 and Lesson 4
const lesson1 = unitData.lessons.find(l => l.id === 'lesson_1');
const lesson4 = unitData.lessons.find(l => l.id === 'lesson_4');

// The timeline currently in Lesson 1
const industrialTimeline = lesson1.do_now;

// Restore Lesson 1's questions
lesson1.do_now = {
  "type": "questions",
  "items": [
    {
      "question": "PAST TOPIC: What is a primary source?",
      "answer": "A piece of evidence created at the time of the event being studied (e.g., a diary, photograph, or artefact)."
    },
    {
      "question": "PAST TOPIC: What is a secondary source?",
      "answer": "A piece of evidence created after the event by someone who was not there (e.g., a modern history book)."
    },
    {
      "question": "PAST TOPIC: What does 'chronological order' mean?",
      "answer": "Arranging events in the order in which they happened in time, from earliest to most recent."
    },
    {
      "question": "PAST TOPIC: What century is the year 1854 in?",
      "answer": "The 19th Century."
    },
    {
      "question": "PAST TOPIC: What is the difference between BC and AD (or BCE and CE)?",
      "answer": "BC (Before Christ) refers to years before the birth of Jesus, while AD (Anno Domini) refers to years after. The numbers in BC count backwards, while AD count forwards."
    }
  ]
};

// Set Lesson 4's do_now to the timeline
lesson4.do_now = industrialTimeline;

// Write back to public/data (with wrapper if it had one)
if (jsonData.data) {
    jsonData.data = unitData;
} else {
    jsonData = unitData;
}
fs.writeFileSync(publicPath, JSON.stringify(jsonData, null, 2));

// Write to src/data.js WITHOUT wrapper
const jsContent = `export const unitData = ${JSON.stringify(unitData, null, 4)};`;
fs.writeFileSync(srcPath, jsContent);

console.log('Fixed timelines and synced data.js');
