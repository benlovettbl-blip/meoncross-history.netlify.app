const fs = require('fs');
const path = require('path');

const artifactsDir = 'C:\\Users\\fives\\.gemini\\antigravity-ide\\brain\\8bd20f30-8e61-473c-9a08-339f878efc6a\\scratch';
const batch1 = JSON.parse(fs.readFileSync(path.join(artifactsDir, 'batch1_options.json'), 'utf8'));
const batch2 = JSON.parse(fs.readFileSync(path.join(artifactsDir, 'batch2_options.json'), 'utf8'));
const batch3 = JSON.parse(fs.readFileSync(path.join(artifactsDir, 'batch3_options.json'), 'utf8'));

const allOptions = { ...batch1, ...batch2, ...batch3 };

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

const dataFile = path.join(__dirname, 'weimar_nazi_germany', 'data.js');
const rawText = fs.readFileSync(dataFile, 'utf8');

const jsonStr = rawText.substring(rawText.indexOf('{'), rawText.lastIndexOf('}') + 1);
let db;
try {
  db = eval('(' + jsonStr + ')');
} catch (e) {
  console.error('Failed to parse data.js', e);
  process.exit(1);
}

let modifiedCount = 0;

db.lessons.forEach(l => {
  if (l.quiz) {
    l.quiz.forEach(q => {
      if (!q.options && allOptions[q.q]) {
        if (allOptions[q.q].length === 4) {
             q.options = shuffle([...allOptions[q.q]]);
             modifiedCount++;
        }
      }
    });
  }
});

console.log('Modified ' + modifiedCount + ' questions!');

const outputText = 'export const unitData = ' + JSON.stringify(db, null, 4) + ';\n';
fs.writeFileSync(dataFile, outputText, 'utf8');
console.log('Successfully wrote data.js');
