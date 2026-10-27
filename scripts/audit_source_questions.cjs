const fs = require('fs');
const path = require('path');

const unitsDir = path.join(__dirname, '..', 'units');
const unitFolders = fs.readdirSync(unitsDir);

console.log('Unit Name'.padEnd(32) + ' | Sources | How Useful | Rotated Qs | Model Answers');
console.log('-'.repeat(80));

unitFolders.forEach(u => {
  const p = path.join(unitsDir, u, 'data.js');
  if (fs.existsSync(p)) {
    const content = fs.readFileSync(p, 'utf8');
    const sourcesCount = (content.match(/"caption":/g) || []).length;
    const howUsefulCount = (content.match(/"how_useful_question":/g) || []).length;
    const rotatedQCount = (content.match(/"question_badge":/g) || []).length;
    const modelAnsCount = (content.match(/"model_answer":/g) || []).length;
    if (sourcesCount > 0) {
      console.log(
        u.padEnd(32) + ' | ' +
        String(sourcesCount).padStart(7) + ' | ' +
        String(howUsefulCount).padStart(10) + ' | ' +
        String(rotatedQCount).padStart(10) + ' | ' +
        String(modelAnsCount).padStart(13)
      );
    }
  }
});
