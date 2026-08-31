const fs = require('fs');

const dataFile = 'cme_new/data.js';
const txt = fs.readFileSync(dataFile, 'utf8');
const lowerTxt = txt.toLowerCase();

const keywords = [
  "bombing of the King David Hotel",
  "UN Resolution 181",
  "Law of Return",
  "US aid to Israel",
  "United Arab Republic",
  "UAR",
  "Cairo Conference",
  "raid on Samu",
  "Munich Olympics",
  "Black September",
  "PFLP airplane hijacks",
  "oil crisis",
  "Kissinger",
  "shuttle diplomacy",
  "Treaty of Washington",
  "invasion of Lebanon",
  "Gulf War",
  "end of the Cold War",
  "Palestinian National Authority",
  "Oslo II"
];

console.log("Checking for specific Edexcel syllabus terms in CME unit:\n");
keywords.forEach(kw => {
  const present = lowerTxt.includes(kw.toLowerCase());
  console.log(`- ${kw}: ${present ? 'FOUND' : 'MISSING'}`);
});
