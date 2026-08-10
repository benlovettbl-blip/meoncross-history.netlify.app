const fs = require('fs');

const filePath = 'early_modern_world/data.js';
let content = fs.readFileSync(filePath, 'utf8');
const match = content.match(/export const unitData = ([\s\S]+);/);

if (!match) {
    console.log("Failed to match unitData");
    process.exit(1);
}

let data = eval('(' + match[1] + ')');

// --- L1 ---
// Q1 and Q2 to multiple_choice
let l1_tasks = data.lessons[0].narrative_blocks[0].tasks;
data.lessons[0].narrative_blocks[0].tasks = l1_tasks.filter(t => !(t.text || t.question || '').includes("fall of Constantinople") && !(t.text || t.question || '').includes("Thirteen Factories in Canton"));
data.lessons[0].narrative_blocks[0].tasks.unshift({
  type: "multiple_choice",
  text: "Knowledge Check: Review the events of 1450.",
  questions: [
    {
      q: "Why was the fall of Constantinople catastrophic for merchants in Western Europe?",
      options: ["It blocked the Silk Road trade routes", "It destroyed all European ships", "It ended the Renaissance", "It forced them to pay higher taxes to the Pope"]
    },
    {
      q: "Based on Source B, how does the reality of the Thirteen Factories in Canton challenge the idea that Europeans dominated global trade in the 1700s?",
      options: ["Europeans were forced to stay in small, confined trading posts", "Europeans owned the entire city of Canton", "The Chinese refused to trade entirely", "Europeans had stronger armies than the Ming Emperor"]
    }
  ]
});
// Q4 to think_pair_share
let q4 = data.lessons[0].narrative_blocks[1].tasks.find(t => (t.text || t.question || '').includes("Professor Frankopan's argument"));
if (q4) q4.type = "think_pair_share";
// Add drawing task
data.lessons[0].narrative_blocks[1].tasks.push({
  type: "drawing",
  text: "Visual Mapping: Draw a quick sketch comparing a poor European peasant's hut in 1450 with the grand palace of the Ming Emperor or Oba of Benin.",
  lines: 10
});

// --- L2 ---
// Add sorting task
let l2_b0 = data.lessons[1].narrative_blocks[0];
l2_b0.tasks.unshift({
  type: "sorting",
  text: "Chronological Sort: Number these events from 1 to 4 in the order they happened.",
  events: [
    "The Spanish Armada is defeated by the English fleet and bad weather.",
    "Martin Luther pins his 95 Theses to the door, beginning the Protestant Reformation.",
    "Francis Drake circumnavigates the globe and raids Spanish treasure ships.",
    "The Pope splits the 'New World' between Spain and Portugal."
  ]
});
// Q7 to TPS
let l2_q7 = data.lessons[1].narrative_blocks[2].tasks.find(t => (t.text || t.question || '').includes("reality of scurvy"));
if (l2_q7) l2_q7.type = "think_pair_share";
// Add drawing task
data.lessons[1].narrative_blocks[2].tasks.push({
  type: "drawing",
  text: "Visual Mapping: Sketch the crescent formation of the Spanish Armada being attacked by English fireships.",
  lines: 10
});

// --- L3 ---
// Q1 to cloze
let l3_q1 = data.lessons[2].narrative_blocks[0].tasks.find(t => (t.text || t.question || '').includes("Matoaka"));
if (l3_q1) {
  l3_q1.type = "cloze";
  l3_q1.text = "Fill in the blanks using the words provided to summarize the story of Matoaka (Pocahontas).";
  l3_q1.cloze_text = "Matoaka, often known as [Pocahontas], was brought to the court of King [James I] in London. The Virginia Company used her as a living piece of [propaganda] to convince wealthy investors that the indigenous people of America could be 'civilized' and [converted] to Christianity, hiding the brutal reality of the early colonial encounters.";
  l3_q1.words = ["propaganda", "James I", "converted", "Pocahontas"];
}
// Q6 to TPS
let l3_q6 = data.lessons[2].narrative_blocks[2].tasks.find(t => (t.text || t.question || '').includes("Perspective A and Perspective B disagree"));
if (l3_q6) l3_q6.type = "think_pair_share";
// Add drawing task
data.lessons[2].narrative_blocks[2].tasks.push({
  type: "drawing",
  text: "Visual Mapping: Based on the text, draw a bird's-eye view of the fortified Jamestown settlement and label its defenses.",
  lines: 10
});

// --- L4 ---
// Merge Q6/Q7 (Diggers)
let l4_b2_tasks = data.lessons[3].narrative_blocks[2].tasks;
const q6_idx = l4_b2_tasks.findIndex(t => (t.text || t.question || '').includes("radical belief did the Diggers hold"));
if (q6_idx !== -1) {
  l4_b2_tasks[q6_idx].text = "What radical belief did the Diggers hold about private property, and why did wealthy Parliamentarians like Oliver Cromwell violently crush them?";
  l4_b2_tasks.splice(q6_idx + 1, 1); // remove Q7
}
// Scaffold extended
let l4_ext = data.lessons[3].narrative_blocks[3].extended;
if (l4_ext) {
  l4_ext.scaffolding = [
    "Start by defining what a 'revolution' means (a total change in society vs just a change in leadership).",
    "Use evidence about the Diggers to show that it did *not* empower the poor.",
    "Use evidence about the Atlantic Merchants to show who really gained power."
  ];
  l4_ext.vocabulary_bank = ["Divine Right", "Parliamentarians", "Merchants", "Diggers", "Hierarchy", "Ideology", "Capitalism"];
  l4_ext.sentence_starters = [
    "On the one hand, the English Civil War could be seen as a revolution because...",
    "However, a more accurate view is that it was simply a transfer of power, as shown by...",
    "The fate of the Diggers proves that..."
  ];
}
// Q3 to TPS
let l4_q3 = data.lessons[3].narrative_blocks[1].tasks.find(t => (t.text || t.question || '').includes("Source C reveal"));
if (l4_q3) l4_q3.type = "think_pair_share";

// --- L5 ---
// Q3 to TPS
let l5_q3 = null;
data.lessons[4].narrative_blocks.forEach(b => {
  if (b.tasks) {
    let t = b.tasks.find(tk => (tk.text || tk.question || '').includes("Interpretation 1 and Interpretation 2 differ"));
    if (t) l5_q3 = t;
  }
});
if (l5_q3) l5_q3.type = "think_pair_share";
// No drawing task for L5!

// --- L6 ---
// Add drawing task (Triangular Trade)
data.lessons[5].narrative_blocks[1].tasks.push({
  type: "drawing",
  text: "Visual Mapping: Draw a flowchart mapping the 'Triangular Trade' between Europe, Africa, and the Americas, labeling the goods traded at each point.",
  lines: 10
});

// --- L7 ---
// Replace Q5/Q6 with matching
let l7_q5_block = data.lessons[6].narrative_blocks.find(b => b.tasks && b.tasks.some(t => (t.text || t.question || '').includes("Stono Rebellion terrify")));
if (l7_q5_block) {
  let l7_tasks = l7_q5_block.tasks;
  const q5_idx = l7_tasks.findIndex(t => (t.text || t.question || '').includes("Stono Rebellion terrify"));
  if (q5_idx !== -1) {
    l7_tasks.splice(q5_idx, 2); // remove Q5, Q6
    l7_tasks.unshift({
      type: "matching",
      text: "Match the aspects of the Stono Rebellion to their correct historical descriptions.",
      pairs: [
        { left: "The Cause", right: "The Spanish promised freedom in Florida to any enslaved person who escaped." },
        { left: "The Event", right: "A group of 20 enslaved Africans broke into a store, armed themselves, and marched south beating drums." },
        { left: "The Consequence", right: "The British planters passed the brutal Negro Act of 1740, heavily restricting movement, assembly, and education." }
      ]
    });
  }
}
// Q7 to TPS
let l7_q7 = null;
data.lessons[6].narrative_blocks.forEach(b => {
  if (b.tasks) {
    let t = b.tasks.find(tk => (tk.text || tk.question || '').includes("White Savior Narrative"));
    if (t) l7_q7 = t;
  }
});
if (l7_q7) l7_q7.type = "think_pair_share";
// Add drawing task
data.lessons[6].narrative_blocks[7].tasks.push({
  type: "drawing",
  text: "Visual Mapping: Sketch a visual representation of Queen Nanny’s hidden mountain stronghold and how it helped the Maroons resist the British.",
  lines: 10
});

// --- L8 ---
// Add table_planner
if (!data.lessons[7].narrative_blocks[3].tasks) data.lessons[7].narrative_blocks[3].tasks = [];
data.lessons[7].narrative_blocks[3].tasks.push({
  type: "table_planner",
  text: "Assessment Planner: Structure your argument before you write your final essay.",
  columns: ["Point (Your claim)", "Evidence (Historical facts)", "Explanation (Why this matters)"],
  rows: 3
});
// Q3 to TPS
let l8_q3 = data.lessons[7].narrative_blocks[2].tasks.find(t => (t.text || t.question || '').includes("Source C and Source D offer completely opposite"));
if (l8_q3) l8_q3.type = "think_pair_share";
// Add drawing task
if (!data.lessons[7].narrative_blocks[3].tasks) data.lessons[7].narrative_blocks[3].tasks = [];
data.lessons[7].narrative_blocks[3].tasks.push({
  type: "drawing",
  text: "Visual Mapping: Draw a single symbol or logo that you feel best represents the state of 18th-century Britain (e.g., a combination of a bank, a ship, and chains).",
  lines: 10
});


const newContent = content.substring(0, match.index) + 'export const unitData = ' + JSON.stringify(data, null, 2) + ';' + content.substring(match.index + match[0].length);

fs.writeFileSync(filePath, newContent, 'utf8');
console.log("Successfully patched early_modern_world/data.js with drawing tasks and structural changes.");
