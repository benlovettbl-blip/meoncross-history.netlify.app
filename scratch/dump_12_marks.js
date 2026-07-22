const fs = require('fs');

const file = 'edexcel_medicine/data.js';
const data = fs.readFileSync(file, 'utf8');
const results = [];

let regex = /"text":\s*"([^"]*12 marks[^"]*)",[\s\S]*?"model":\s*"([^"]+)"/g;
let match;
while ((match = regex.exec(data)) !== null) {
  const qText = match[1];
  const modelAns = match[2];
  const pCount = modelAns.split(/<br\s*\/?>|<p>|\\n/).filter(p => p.length > 20).length;
  if (pCount < 3) {
    results.push({ q: qText, model: modelAns });
  }
}

fs.writeFileSync('scratch/12_mark_questions.json', JSON.stringify(results, null, 2));
console.log('Saved to scratch/12_mark_questions.json');
