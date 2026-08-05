const fs = require('fs');
let content = fs.readFileSync('great_war_part2/data.js', 'utf-8');
content = content.replace(/"word"\s*:/g, '"term":');
content = content.replace(/"def"\s*:/g, '"definition":');

// Also fix lesson_3's do_now questions
const jsonStart = content.indexOf('{');
const jsonStr = content.substring(jsonStart, content.lastIndexOf('}') + 1);
let unitData = JSON.parse(jsonStr);

let l3 = unitData.lessons.find(l => l.id === 'lesson_3');
if (l3 && l3.do_now && l3.do_now.type === 'quiz' && l3.do_now.questions) {
  l3.do_now.type = 'mixed';
  l3.do_now.items = l3.do_now.questions.map(q => {
    let opts = q.options.map((opt, i) => `${String.fromCharCode(65+i)}) ${opt}`).join(', ');
    let ansIndex = q.answer;
    let ansOpt = q.options[ansIndex];
    return {
      question: `${q.question} (${opts})`,
      answer: `${ansOpt}. Explanation: ${q.explanation}`
    };
  });
  delete l3.do_now.questions;
}

let newContent = content.substring(0, jsonStart) + JSON.stringify(unitData, null, 2) + "\n";
fs.writeFileSync('great_war_part2/data.js', newContent);
console.log('Fixed data.js!');
