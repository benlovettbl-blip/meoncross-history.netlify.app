const fs = require('fs');

const specificObjectives = [
  [
    "Describe the simple, practical sanitation methods used by Iron Age Britons.",
    "Explain how Roman engineers introduced revolutionary sanitation technology.",
    "Evaluate the significance of Roman bathhouses and latrines for public health."
  ],
  [
    "Describe the simple cesspits used by peasants in rural Medieval villages.",
    "Explain why Medieval monasteries built complex water systems.",
    "Evaluate the role of gongfermers and night-work in medieval towns."
  ],
  [
    "Describe the sanitation problems in growing Tudor and Stuart towns.",
    "Explain why early flushing toilets like Sir John Harington's failed to catch on.",
    "Evaluate how Samuel Pepys's diary reveals the reality of Early Modern sanitation."
  ],
  [
    "Describe the overcrowded and unhygienic conditions of industrial back-to-back housing.",
    "Explain how Edwin Chadwick argued for public health reform in his 1842 report.",
    "Evaluate Dr. John Snow's discovery that cholera was waterborne."
  ],
  [
    "Describe the events of the Great Stink in 1858.",
    "Explain how Joseph Bazalgette's sewer system transformed London.",
    "Evaluate how Louis Pasteur's Germ Theory revolutionized our understanding of disease."
  ]
];

const p = 'water_and_sanitation/data.js';
let code = fs.readFileSync(p, 'utf8');

let count = 0;
// We need to replace the entire 3 generic objects in the teacher_notes.objectives array
// They look like:
/*
    {
      "objective": "Identify the key features of this topic.",
      "primer": "Teacher notes for this specific objective have not been added yet. Ensure you guide the students to the relevant paragraph in the narrative."
    },
    {
      "objective": "Explain the core concepts and historical context.",
      "primer": "Teacher notes for this specific objective have not been added yet. Ensure you guide the students to the relevant paragraph in the narrative."
    },
    {
      "objective": "Evaluate the overall significance.",
      "primer": "Teacher notes for this specific objective have not been added yet. Ensure you guide the students to the relevant paragraph in the narrative."
    },
*/
const regex = /\{\s*"objective":\s*"Identify the key features of this topic.",\s*"primer":\s*"Teacher notes for this specific objective have not been added yet. Ensure you guide the students to the relevant paragraph in the narrative."\s*\},[\s\S]*?\{\s*"objective":\s*"Evaluate the overall significance.",\s*"primer":\s*"Teacher notes for this specific objective have not been added yet. Ensure you guide the students to the relevant paragraph in the narrative."\s*\},/g;

code = code.replace(regex, (match) => {
    let objs = specificObjectives[count];
    count++;
    if (!objs) return match;
    return `{
      "objective": "${objs[0]}",
      "primer": "Ensure you guide the students to the relevant paragraph in the narrative to identify key features."
    },
    {
      "objective": "${objs[1]}",
      "primer": "Guide the students to connect the core concepts to the historical context provided."
    },
    {
      "objective": "${objs[2]}",
      "primer": "Facilitate a discussion to evaluate the overall significance based on the lesson's themes."
    },`;
});

fs.writeFileSync(p, code);
console.log(`Replaced generic objectives in ${count} places in water_and_sanitation/data.js`);
