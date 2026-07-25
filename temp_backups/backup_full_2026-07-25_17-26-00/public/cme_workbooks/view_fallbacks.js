const fs = require('fs');
const path = require('path');

const fallbacks = require('./fallbacks_list.json');

let out = "";
fallbacks.forEach((q, idx) => {
  out += `ID: ${q.id} (Subtopic: ${q.subtopicId})\n`;
  out += `Q: ${q.question}\n`;
  out += `A: ${q.answer}\n`;
  out += `EXP: ${q.explanation}\n`;
  out += `--------------------------------------------------\n`;
});

fs.writeFileSync(path.join(__dirname, 'fallbacks_details.txt'), out);
console.log("Dumped details of all fallbacks to scratch/fallbacks_details.txt");
