const fs = require('fs');
const path = require('path');

const dataPath = path.resolve(__dirname, '../edexcel_medicine/data.js');
let dataString = fs.readFileSync(dataPath, 'utf8');

// Convert to commonjs temporarily
let tempFile = dataString.replace('export const unitData = ', 'module.exports = ');
fs.writeFileSync(path.resolve(__dirname, 'temp_data4.js'), tempFile);
delete require.cache[require.resolve('./temp_data4.js')];
const unitData = require('./temp_data4.js');

const correctExamQuestions = [
  // Lesson 0: KT1.1
  "Q2. ‘The Theory of the Four Humours was the main idea about the cause of disease in the Middle Ages’. How far do you agree? Explain your answer. (16 marks) You may use the following in your answer:<br>• Galen<br>• the Church<br>You must also use information of your own.",
  // Lesson 1: KT1.2
  "Q2. ‘In the years c1250–c1500, the physician was the most important person providing care and treatment.’ How far do you agree? Explain your answer. (16 marks) You may use the following in your answer:<br>• medical training<br>• herbal remedies<br>You must also use information of your own.",
  // Lesson 2: KT1.3
  "Q2. ‘The main reason why medical care and treatment was ineffective during the medieval period was because medical knowledge was based on Galen's ideas.’ How far do you agree? Explain your answer. (16 marks) You may use the following in your answer:<br>• bloodletting<br>• dissection<br>You must also use information of your own.", // Note: stimulus inferred as user didn't provide in the snippet
  // Lesson 3: KT2.1
  "Q2. Explain why there were changes in the way ideas about the causes of disease and illness were communicated in the period c1500–c1700. (12 marks) You may use the following in your answer:<br>• the printing press<br>• the Royal Society<br>You must also use information of your own.",
  // Lesson 4: KT2.2
  "Q2. Explain why there was rapid progress in anatomical knowledge in the years c1500–c1700. (12 marks) You may use the following in your answer:<br>• Vesalius<br>• human dissection<br>You must also use information of your own.",
  // Lesson 5: KT2.3
  "Q2. ‘The most effective method of preventing the spread of the Great Plague (1665) was the use of quarantine.’ How far do you agree? Explain your answer. (16 marks) You may use the following in your answer:<br>• watchmen<br>• the miasma theory<br>You must also use information of your own.",
  // Lesson 6: KT3.1
  "Q2. ‘Louis Pasteur's publication of the Germ Theory was the biggest turning point in understanding the causes of disease.’ How far do you agree? Explain your answer. (16 marks) You may use the following in your answer:<br>• spontaneous generation<br>• Robert Koch<br>You must also use information of your own.",
  // Lesson 7: KT3.2
  "Q2. ‘The discovery of Carbolic Acid was the most significant turning point in surgery in the years c1700–c1900.’ How far do you agree? Explain your answer. (16 marks) You may use the following in your answer:<br>• Joseph Lister<br>• James Simpson<br>You must also use information of your own.",
  // Lesson 8: KT3.3
  "Q2. Explain why there was rapid progress in public health in the second half of the nineteenth century (c1850–c1900). (12 marks) You may use the following in your answer:<br>• John Snow<br>• The Great Stink<br>You must also use information of your own.",
  // Lesson 9: KT4.1
  "Q2. ‘The discovery of DNA was the most significant breakthrough in understanding the causes of illness in the period c1900–present.’ How far do you agree? Explain your answer. (16 marks) You may use the following in your answer:<br>• Watson and Crick<br>• Lifestyle factors<br>You must also use information of your own.",
  // Lesson 10: KT4.2
  "Q2. ‘Alexander Fleming was the most important individual in the development of penicillin.’ How far do you agree? Explain your answer. (16 marks) You may use the following in your answer:<br>• Staphylococcus<br>• Mass production<br>You must also use information of your own.",
  // Lesson 11: KT4.3
  "Q2. Explain why there was rapid progress in disease prevention after 1900. (12 marks) You may use the following in your answer:<br>• Government vaccination campaigns<br>• Clean Air Acts<br>You must also use information of your own.",
  // Lesson 12: KT4.4
  "Q2. Explain why the government took action to improve public health in the period c1900–present. (12 marks) You may use the following in your answer:<br>• the Boer War<br>• the NHS<br>You must also use information of your own."
];

for (let i = 0; i < correctExamQuestions.length; i++) {
  if (unitData.lessons[i] && unitData.lessons[i].extended) {
    unitData.lessons[i].extended.question = correctExamQuestions[i];
    unitData.lessons[i].extended.model = "<strong>Grade 9 Model Answer:</strong><br><br><em>Awaiting Notebook LM content from the user...</em>";
  }
}

// Convert back to string format
const newString = 'export const unitData = ' + JSON.stringify(unitData, null, 2) + ';\n';
fs.writeFileSync(dataPath, newString);
console.log('Successfully injected the 13 correct Exam Mastery questions and wiped the models.');
