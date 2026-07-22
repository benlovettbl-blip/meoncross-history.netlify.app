const fs = require('fs');
const path = require('path');

const dataPath = path.resolve(__dirname, '../edexcel_medicine/data.js');
let fileContent = fs.readFileSync(dataPath, 'utf8');

const newModelsFile = path.join(__dirname, 'new_models.json');
const newModelsObj = JSON.parse(fs.readFileSync(newModelsFile, 'utf8'));
const newModels = Object.values(newModelsObj); // Array of 13 strings

const targetQuestions = [
  "Explain why there was so little progress in understanding the causes of disease during the Middle Ages. (12 marks)",
  "Explain why bleeding and purging were such common treatments in the Middle Ages. (12 marks)",
  "Explain why the Black Death spread so rapidly in 1348. (12 marks)",
  "Explain why the Renaissance was a period of rapid progress in anatomical knowledge. (12 marks)",
  "Explain why there was little change in medical treatments during the Renaissance, despite new anatomical discoveries. (12 marks)",
  "Explain why the government's response to the Great Plague of 1665 was more effective than its response to the Black Death. (12 marks)",
  "Explain why Louis Pasteur's Germ Theory was a major turning point in medicine. (12 marks)",
  "Explain why Joseph Lister's development of carbolic acid was so significant in the history of surgery. (12 marks)",
  "Explain why there was rapid progress in public health during the second half of the 19th century. (12 marks)",
  "Explain why the discovery of the structure of DNA was a significant breakthrough in understanding the causes of illness. (12 marks)",
  "Explain why there was rapid progress in the development of penicillin in the 1940s. (12 marks)",
  "Explain why the British government took a more active role in preventing disease after 1900. (12 marks)",
  "Explain why the creation of the National Health Service (NHS) in 1948 improved public health in Britain. (12 marks)"
];

const startIndex = fileContent.indexOf('{');
const endIndex = fileContent.lastIndexOf('}');

const prefix = fileContent.substring(0, startIndex);
const suffix = fileContent.substring(endIndex + 1);
const jsonStr = fileContent.substring(startIndex, endIndex + 1);

let data = eval('(' + jsonStr + ')');

for (let i = 0; i <= 12; i++) {
  if (data.lessons[i] && data.lessons[i].gcse_task && data.lessons[i].gcse_task.tasks) {
    let targetTask = data.lessons[i].gcse_task.tasks.find(t => t.text.includes("Explain why") || t.text.includes("12-mark"));
    if (!targetTask) {
       targetTask = data.lessons[i].gcse_task.tasks[0];
    }
    
    if (targetTask) {
      targetTask.text = targetQuestions[i];
      targetTask.model = newModels[i];
    }
  }
}

const newJsonStr = JSON.stringify(data, null, 2);
const newContent = prefix + newJsonStr + suffix;

fs.writeFileSync(dataPath, newContent, 'utf8');
console.log('Successfully injected REAL NotebookLM answers from new_models.json!');
