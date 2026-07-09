const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'great_war', 'data.js');
let dataContent = fs.readFileSync(dataPath, 'utf8');

const jsonContent = dataContent.replace('export const unitData = ', '').trim().replace(/;$/, '');
let unitData = JSON.parse(jsonContent);

const tpsData = [
  {
    "prompt": "Of the three penalties forced upon France in the 1871 treaty (loss of land, 5 billion franc fine, German occupation), which do you think caused the most bitter resentment, and why?",
    "think": "Jot down your choice and one strong reason to support it.",
    "pair": "Take turns explaining your choice. If you disagree, try to convince your partner!",
    "share": "Be ready to report your partner's best point to the class."
  },
  {
    "prompt": "If you were a British politician in 1897, would you view Kaiser Wilhelm's 'Place in the Sun' speech as a direct threat, or just a young leader showing off? Why?",
    "think": "Jot down your view and one piece of evidence.",
    "pair": "Discuss your views. Did your partner point out anything you missed?",
    "share": "Be ready to share whether your partner changed your mind."
  },
  {
    "prompt": "Who do you think was more to blame for the naval arms race: Germany for building a fleet they didn't strictly need, or Britain for refusing to share control of the seas?",
    "think": "Decide who is more to blame and write down your main reason.",
    "pair": "Debate your choice with your partner. Try to find a weakness in their argument.",
    "share": "Be ready to summarize the strongest argument you heard."
  },
  {
    "prompt": "Imagine you are an ordinary Serbian citizen in 1908. Why would Austria-Hungary's aggressive takeover of Bosnia make you feel personally threatened?",
    "think": "Write down how you would feel and why.",
    "pair": "Share your perspective with your partner.",
    "share": "Be prepared to share an interesting insight from your discussion."
  },
  {
    "prompt": "Look at the timeline of the July Crisis. At which exact moment do you think a world war became completely unstoppable? Was it the assassination, the blank cheque, or the mobilisations?",
    "think": "Pick the specific turning point and write down why you chose it.",
    "pair": "Compare your turning points. Do you agree on when the 'point of no return' was?",
    "share": "Be ready to defend your group's chosen turning point to the class."
  },
  {
    "prompt": "Do you think it is ever fair to punish an entire country's civilian population (with crushing fines and loss of land) for the decisions made by their unelected military leaders?",
    "think": "Write down a clear 'Yes' or 'No' and your primary reason.",
    "pair": "Discuss your ethical stance with your partner.",
    "share": "Be ready to share how this connects to the Treaty of Versailles."
  }
];

unitData.lessons.forEach((lesson, index) => {
  if (tpsData[index]) {
    lesson.pair_share = tpsData[index];
  }
});

const jsContent = `export const unitData = ${JSON.stringify(unitData, null, 2)};\n`;
fs.writeFileSync(dataPath, jsContent);
console.log("data.js updated with Think-Pair-Share data.");
