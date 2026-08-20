const fs = require('fs');

let code = fs.readFileSync('c:/Projects/meoncross-history.netlify.app/medieval_england/data.js', 'utf8');
const data = JSON.parse(code.replace('export const unitData = ', '').replace(/;\s*$/, ''));

// 1. Lesson 2: Motte & Bailey Drawing
const l2 = data.lessons[1];
const l2Block1 = l2.narrative_blocks.find(b => b.title === 'Castles as Weapons of Conquest');
if (l2Block1) {
  l2Block1.tasks = [{
    "type": "drawing",
    "lines": 10,
    "question": "Task 1: Sketch a Motte and Bailey castle and label the key defensive features (Motte, Keep, Bailey, Palisade, Ditch).",
    "model_answer": "Students should draw a large mound (Motte) with a wooden tower (Keep) on top, connected by a bridge to a lower enclosure (Bailey) surrounded by a wooden fence (Palisade) and a moat (Ditch)."
  }];
}

// 2. Lesson 4: Magna Carta matching
const l4 = data.lessons[3];
const l4Block1 = l4.narrative_blocks.find(b => b.title.includes('Failures of King John'));
if (l4Block1) {
  l4Block1.tasks = [{
    "type": "matching",
    "text": "Task 1: King John was a disastrous ruler. Match his failures to the correct category.",
    "pairs": [
      { "left": "Losing all his land in Normandy to the French King Philip II", "right": "Military Failure" },
      { "left": "Arguing with the Pope and getting excommunicated", "right": "Religious Dispute" },
      { "left": "Raising the Scutage tax on his barons again and again", "right": "Financial Extortion" }
    ],
    "model_answer": "Normandy -> Military Failure | Pope -> Religious Dispute | Scutage -> Financial Extortion"
  }];
}

// 3. Lesson 5: Doom painting drawing
const l5 = data.lessons[4];
const l5Block3 = l5.narrative_blocks.find(b => b.title.includes('Doom Paintings'));
if (l5Block3) {
  l5Block3.tasks = l5Block3.tasks.filter(t => {
     const str = (t.question || '') + (t.text || '');
     return !str.includes('Source C');
  }); // Remove old task
  l5Block3.tasks.push({
    "type": "drawing",
    "lines": 8,
    "question": "Task: Sketch your own terrifying Doom Painting monster (Hellmouth or demon) that would have scared medieval peasants into obeying the Church.",
    "model_answer": "Students should draw a grotesque monster or demon, demonstrating an understanding of how fear of Hell was used to control the peasant population."
  });
}

// 4. Lesson 3 & 7: Cloze tasks for low ability
const l3 = data.lessons[2];
const l3Block3 = l3.narrative_blocks.find(b => b.title.includes('Murder in Canterbury'));
if (l3Block3) {
  // Check if extended writing is there
  const extTaskIdx = l3Block3.tasks.findIndex(t => t.type === 'extended_writing');
  if (extTaskIdx !== -1) {
    // Add cloze task BEFORE it
    l3Block3.tasks.splice(extTaskIdx, 0, {
      "type": "cloze",
      "text": "Task (Supported): Fill in the blanks to explain why Thomas Becket was murdered.",
      "cloze_text": "Thomas Becket was murdered because he refused to sign the Constitutions of [Clarendon], which would have given the King power over Church courts. King Henry II shouted in a rage, asking who would rid him of this [turbulent] priest. Four [knights] heard this and travelled to Canterbury Cathedral, where they brutally murdered Becket by slicing off his [crown]. The public were horrified, and Henry was forced to do [penance] by being whipped by monks.",
      "words": ["Clarendon", "turbulent", "knights", "crown", "penance"],
      "model_answer": "Clarendon, turbulent, knights, crown, penance"
    });
  }
}

const l7 = data.lessons[6];
const l7Block3 = l7.narrative_blocks.find(b => b.title.includes('Smithfield'));
if (l7Block3) {
  const extTaskIdx = l7Block3.tasks.findIndex(t => t.type === 'extended_writing');
  if (extTaskIdx !== -1) {
    l7Block3.tasks.splice(extTaskIdx, 0, {
      "type": "cloze",
      "text": "Task (Supported): Fill in the blanks to explain why the Peasants' Revolt failed.",
      "cloze_text": "The Peasants' Revolt ultimately failed because at Smithfield, their leader Wat [Tyler] was unexpectedly stabbed by the Mayor of London. The young King [Richard II] then bravely rode out to the angry mob and promised them that he would be their new leader. He promised to give them [freedom] and abolish serfdom. However, this was a massive [trick]. Once the peasants went home, the King sent his [army] to hunt down the ringleaders and execute them, breaking all his promises.",
      "words": ["Tyler", "Richard II", "freedom", "trick", "army"],
      "model_answer": "Tyler, Richard II, freedom, trick, army"
    });
  }
}

// 5. Lesson 6: Physician Game
const l6 = data.lessons[5];
const l6Block1 = l6.narrative_blocks.find(b => b.title.includes('Terror of 1348'));
if (l6Block1) {
  l6Block1.tasks = [{
    "type": "physician_game",
    "text": "Task 1: The Plague Doctor. Play the role of a medieval physician and try to cure the infected patients.",
    "model_answer": "Students play the interactive game to learn about the ineffective medieval cures based on the Four Humours."
  }];
}

fs.writeFileSync('c:/Projects/meoncross-history.netlify.app/medieval_england/data.js', 'export const unitData = ' + JSON.stringify(data, null, 2) + ';\n');
console.log('Successfully updated data.js');
