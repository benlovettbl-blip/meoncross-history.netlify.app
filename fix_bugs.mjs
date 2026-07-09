import fs from 'fs';
import path from 'path';

const dataPath = path.resolve('great_war_v2', 'data.js');
let dataContent = fs.readFileSync(dataPath, 'utf8');

const jsonContent = dataContent.replace('export const unitData = ', '').trim().replace(/;$/, '');
let unitData = JSON.parse(jsonContent);

// Fix Lesson 2 do_now items
unitData.lessons[1].do_now.items = [
  {
    "question": "1. Who was the first Emperor of the newly unified Germany?",
    "answer": "Kaiser Wilhelm I"
  },
  {
    "question": "2. Which Chancellor was dismissed by Kaiser Wilhelm II in 1890?",
    "answer": "Otto von Bismarck"
  },
  {
    "question": "3. Name the alliance formed between France and Russia.",
    "answer": "Franco-Russian Alliance"
  },
  {
    "question": "4. What do we call the competitive rush to claim territory in Africa?",
    "answer": "Scramble for Africa"
  },
  {
    "question": "5. Which African country did Kaiser Wilhelm II visit to challenge French control?",
    "answer": "Morocco"
  },
  {
    "question": "6. Explain why Kaiser Wilhelm II's 'Weltpolitik' policy threatened the British Empire.",
    "answer": "It challenged British naval dominance and made them feel threatened."
  },
  {
    "question": "7. Describe the impact of Wilhelm II letting the Reinsurance Treaty with Russia expire.",
    "answer": "It allowed France and Russia to form an alliance, enclosing Germany."
  },
  {
    "question": "8. How did the Moroccan Crises actually backfire on Germany and strengthen the Entente Cordiale?",
    "answer": "It proved Britain would stand by France against Germany."
  },
  {
    "question": "9. Why did Britain traditionally follow a policy of 'Splendid Isolation' before the 1900s?",
    "answer": "They focused on global empire rather than European alliances."
  },
  {
    "question": "10. Evaluate the role of Kaiser Wilhelm II's personality in destabilizing European diplomacy.",
    "answer": "His impulsive, aggressive nature created unnecessary crises and enemies."
  }
];

const newJsContent = `export const unitData = ${JSON.stringify(unitData, null, 2)};\n`;
fs.writeFileSync(dataPath, newJsContent);
console.log("Fixed data.js Lesson 2 do_now");

// Fix app.js sticky header title wrapping
const appPath = path.resolve('great_war_v2', 'app.js');
let appContent = fs.readFileSync(appPath, 'utf8');

// Replace the h4 style
appContent = appContent.replace(
  /white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 60%;/g,
  'line-height: 1.3;'
);

fs.writeFileSync(appPath, appContent);
console.log("Fixed app.js title wrapping");
