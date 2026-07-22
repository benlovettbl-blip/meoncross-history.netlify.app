const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, '../edexcel_medicine/data.js');
let dataContent = fs.readFileSync(dataFile, 'utf8');

const newModelsFile = path.join(__dirname, 'new_models.json');
const newModelsObj = JSON.parse(fs.readFileSync(newModelsFile, 'utf8'));
const newModels = Object.values(newModelsObj); // Array of 13 strings

const targetQuestions = [
  "Explain why there was so little progress in understanding the causes of disease during the Middle Ages.",
  "Explain why bleeding and purging were such common treatments in the Middle Ages.",
  "Explain why the Black Death spread so rapidly in 1348.",
  "Explain why the Renaissance was a period of rapid progress in anatomical knowledge.",
  "Explain why there was little change in medical treatments during the Renaissance, despite new anatomical discoveries.",
  "Explain why the government's response to the Great Plague of 1665 was more effective than in 1348.",
  "Explain why Louis Pasteur's Germ Theory was a major turning point in medicine.",
  "Explain why Joseph Lister's development of carbolic acid was so significant.",
  "Explain why there was rapid progress in public health during the second half of the 19th century.",
  "Explain why the discovery of DNA was a significant breakthrough in understanding the causes of illness.",
  "Explain why there was rapid progress in the development of penicillin.",
  "Explain why the government took a more active role in preventing disease after 1900.",
  "Explain why the creation of the NHS in 1948 improved public health."
];

let matchCount = 0;
const replacements = [];

for (let i = 0; i < targetQuestions.length; i++) {
  const q = targetQuestions[i];
  const newModelStr = newModels[i];
  
  const searchStr = `"text": "${q}",`;
  let qIndex = dataContent.indexOf(searchStr);
  
  if (qIndex === -1) {
    console.log("Could not find question:", q);
    continue;
  }
  
  let modelIndex = dataContent.indexOf('"model":', qIndex);
  if (modelIndex === -1) {
    console.log("Could not find model for:", q);
    continue;
  }
  
  let stringStart = dataContent.indexOf('"', modelIndex + 8);
  if (stringStart === -1) continue;
  stringStart += 1; 
  
  let stringEnd = stringStart;
  while (stringEnd < dataContent.length) {
      if (dataContent[stringEnd] === '"' && dataContent[stringEnd - 1] !== '\\') {
          break;
      }
      stringEnd++;
  }
  
  let safeReplacement = newModelStr.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
  
  replacements.push({
      start: stringStart,
      end: stringEnd,
      newText: safeReplacement
  });
  matchCount++;
}

replacements.sort((a, b) => b.start - a.start);
for (const rep of replacements) {
    dataContent = dataContent.substring(0, rep.start) + rep.newText + dataContent.substring(rep.end);
}

fs.writeFileSync(dataFile, dataContent);
console.log(`Finished. Replaced ${matchCount} models.`);
