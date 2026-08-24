const fs = require('fs');

let content = fs.readFileSync('early_modern_world/data.js', 'utf8');
let data;
eval('data = ' + content.replace('export default early_modern_world;', 'early_modern_world;').replace('const early_modern_world =', ''));

// 1. Lesson 1 Block 1
let l1_tasks = data.lessons[0].narrative_blocks[1].tasks;
l1_tasks.unshift({
  type: "source_analysis",
  question: "Study Source A. What does the eyewitness account suggest about the power of the Ottoman Empire compared to Christian Europe in 1453?",
  model_answer: "Source A suggests the Ottoman Empire was vastly more powerful, disciplined, and wealthy than Christian Europe. The mention of the Sultan's 'great pomp', 'absolute' power, and the fact that European rulers 'quaked with fear' highlights the severe power imbalance."
});

// 2. Lesson 8 Block 0
let l8_tasks = data.lessons[7].narrative_blocks[0].tasks;
l8_tasks.unshift({
  type: "source_analysis",
  question: "Study Source B. How did the geography of Jamaica shown in the map help the Maroons wage a successful guerrilla war against the British?",
  model_answer: "The 1775 map shows Jamaica's rugged, mountainous interior (the Blue Mountains). This harsh, inaccessible terrain allowed the Maroons to build hidden strongholds like Nanny Town and use the dense rainforest camouflage to launch surprise attacks on the British."
});

// Serialize back
const newContent = "const early_modern_world = " + JSON.stringify(data, null, 2) + ";\n\nexport default early_modern_world;";

fs.writeFileSync('early_modern_world/data.js', newContent);
console.log('Added tasks for Source A and Source B!');
