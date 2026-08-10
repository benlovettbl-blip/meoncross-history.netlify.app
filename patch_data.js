const fs = require('fs');
const path = './public/units/early_modern_world/data.js';

let code = fs.readFileSync(path, 'utf8');

// Replace export statement so we can require it
code = code.replace(/export const unitData\s*=\s*/, 'module.exports = ');
fs.writeFileSync('temp_data.js', code);

const data = require('./temp_data');

// Patch Lesson 1: Add context to image-only blocks
const l1 = data.lessons[0];
if (l1.narrative_blocks[3] && !l1.narrative_blocks[3].text) {
  l1.narrative_blocks[3].text = "Source B shows the reality of global trade in Canton, where European merchants were restricted and tightly controlled by the Chinese Emperor, challenging the myth of European dominance.";
}
if (l1.narrative_blocks[5] && !l1.narrative_blocks[5].text) {
  l1.narrative_blocks[5].text = "Source C illustrates the fall of Constantinople in 1453 to the powerful Ottoman Empire, an event that deeply shocked Christian Europe and blocked their traditional trade routes to the East.";
}
if (l1.narrative_blocks[7] && !l1.narrative_blocks[7].text) {
  l1.narrative_blocks[7].text = "Source D reveals the highly advanced metallurgical skills of the Benin Empire in West Africa, producing magnificent bronzes that rivalled or surpassed European art of the same period.";
}
if (l1.narrative_blocks[9] && !l1.narrative_blocks[9].text) {
  l1.narrative_blocks[9].text = "Source E, a detail from the Catalan Atlas, highlights the staggering wealth of Mansa Musa and the Mali Empire, drawing desperate European merchants towards West African gold.";
}

// Patch Lesson 2: Add Summary Task
const l2 = data.lessons[1];
if (!l2.tasks) l2.tasks = [];
l2.tasks.push({
  title: "Summary Task",
  type: "comprehension",
  question: "Summarize in two sentences how the religious conflict of the Reformation directly triggered global exploration and early colonialism by European powers.",
  model_answer: "The Reformation split Europe into hostile Catholic and Protestant camps, leading to intense geopolitical rivalry. To gain the upper hand, rival monarchs desperately sought new sources of wealth and new territories to spread their faith, driving them to explore and colonize the Americas."
});

// Patch Lesson 3: Add East India Company block
const l3 = data.lessons[2];
if (l3.narrative_blocks) {
  // Insert before the last block or at the end
  l3.narrative_blocks.push({
    title: "The Rise of the East India Company",
    text: "By 1600, the nature of empire was shifting from religious crusade to corporate monopoly. The English Crown granted a charter to the East India Company (EIC), a ruthless joint-stock corporation that built its own private army. The EIC eventually transitioned from trading spices in India to outright territorial conquest, laying the foundations for the British Empire in Asia.",
    tasks: [
      {
        type: "comprehension",
        question: "How did the East India Company change the nature of British empire-building?",
        model_answer: "It shifted the focus from religious conflict to corporate profit, using a private company with its own army to conquer territory and monopolize trade in India."
      }
    ]
  });
}

// Patch Lesson 4: Add English Civil War block
const l4 = data.lessons[3];
if (l4.narrative_blocks) {
  // Insert at a logical point
  l4.narrative_blocks.push({
    title: "The Ultimate Ideological Battle: The English Civil War",
    text: "The struggle for control between the monarch and the people exploded into the English Civil War (1642–1651). King Charles I believed in his divine right to rule absolutely, while Parliament demanded a say in taxation and governance. The conflict ended with the shocking execution of the King in 1649, temporarily turning England into a republic and permanently establishing that a British monarch could not rule without the consent of Parliament.",
    tasks: [
      {
        type: "comprehension",
        question: "Why was the execution of King Charles I in 1649 such a significant turning point in the ideological battle for control of Britain?",
        model_answer: "It destroyed the idea of the 'Divine Right of Kings' and permanently established that a monarch's power was limited and subject to the consent of Parliament."
      }
    ]
  });
}

// Patch Lesson 5: Add Summary Task
const l5 = data.lessons[4];
if (!l5.tasks) l5.tasks = [];
l5.tasks.push({
  title: "Summary Task",
  type: "comprehension",
  question: "Explain the connection between Britain's growing global trade and the shift in domestic economic power by 1750.",
  model_answer: "The massive profits generated from global trade, the East India Company, and the Transatlantic Slave Trade created a new, wealthy middle class. This shifted economic power away from the traditional land-owning aristocracy and paved the way for the Industrial Revolution."
});

// Write it back as an ES module
const newCode = 'export const unitData = ' + JSON.stringify(data, null, 2) + ';\n';
fs.writeFileSync(path, newCode);

console.log('Patching complete!');
