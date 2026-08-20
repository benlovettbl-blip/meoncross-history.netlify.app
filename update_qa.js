const fs = require('fs');

let code = fs.readFileSync('c:/Projects/meoncross-history.netlify.app/medieval_england/data.js', 'utf8');
const data = JSON.parse(code.replace('export const unitData = ', '').replace(/;\s*$/, ''));

// TPS Tasks
const tpsTasks = {
  1: { "type": "think_pair_share", "question": "Think-Pair-Share: Which of the three claimants do you think had the strongest legal claim to the throne of England, and why?" },
  2: { "type": "think_pair_share", "question": "Think-Pair-Share: Did William conquer England using fear, or using organisation? Which was more important?" },
  3: { "type": "think_pair_share", "question": "Think-Pair-Share: If you were King Henry II, would you have appointed your best friend as Archbishop, or a deeply religious monk?" },
  4: { "type": "think_pair_share", "question": "Think-Pair-Share: Do you think the Magna Carta was about freedom for all people, or just the barons protecting their own wealth?" },
  5: { "type": "think_pair_share", "question": "Think-Pair-Share: Why was the Church able to take a tenth (tithe) of a peasant's crops when they were already starving?" },
  6: { "type": "think_pair_share", "question": "Think-Pair-Share: If you were a peasant who survived the Black Death, how would your attitude towards the local lord and the Church change?" },
  7: { "type": "think_pair_share", "question": "Think-Pair-Share: Did the Peasants' Revolt achieve anything, or was it a complete failure?" },
  9: { "type": "think_pair_share", "question": "Think-Pair-Share: Based on everything we have studied, what was the most effective way for a medieval monarch to keep their power?" }
};

Object.keys(tpsTasks).forEach(lessonNum => {
  const lIdx = parseInt(lessonNum) - 1;
  const l = data.lessons[lIdx];
  if (l && l.narrative_blocks.length > 0) {
    // Add to the last block
    const lastBlock = l.narrative_blocks[l.narrative_blocks.length - 1];
    if (!lastBlock.tasks) lastBlock.tasks = [];
    lastBlock.tasks.push(tpsTasks[lessonNum]);
  }
});

// Visual Source QA Mismatches
// Lesson 2: Portchester Castle
const l2 = data.lessons[1];
const l2Block1 = l2.narrative_blocks.find(b => b.title.includes('Castles'));
if (l2Block1) {
  l2Block1.tasks.push({
    "type": "short_answer",
    "question": "Task: Look at Source B (Portchester Castle). Why would this towering stone keep be absolutely terrifying for the local English peasants who lived in small wooden huts?",
    "model_answer": "It was huge, permanent, and indestructible to ordinary weapons. It was a physical reminder that the Normans were there to stay and could not be defeated."
  });
}

// Lesson 5: Parish Church
const l5 = data.lessons[4];
const l5Block1 = l5.narrative_blocks.find(b => b.title.includes('Parish Church'));
if (l5Block1) {
  l5Block1.tasks.push({
    "type": "short_answer",
    "question": "Task: Look at Source A (the medieval parish church). Identify three different activities taking place inside the church, showing that it was used for more than just praying.",
    "model_answer": "Students should identify people trading/selling goods, a dog running around, people talking/gossiping, and the priest delivering a sermon."
  });
}

// Lesson 8: Roses
const l8 = data.lessons[7];
const l8Block1 = l8.narrative_blocks.find(b => b.title.includes('Rival Roses'));
if (l8Block1) {
  l8Block1.tasks.push({
    "type": "short_answer",
    "question": "Task: Look at Sources A and B. Why was it important for rival noble houses to have simple, recognizable badges like the Red and White Roses during a chaotic civil war?",
    "model_answer": "In the chaos of a medieval battlefield, where many soldiers couldn't read and armour made it hard to recognize people, simple visual badges were essential for soldiers to know who was friend and who was foe."
  });
}

fs.writeFileSync('c:/Projects/meoncross-history.netlify.app/medieval_england/data.js', 'export const unitData = ' + JSON.stringify(data, null, 2) + ';\n');
console.log('Successfully added TPS and Visual QA tasks to data.js');
