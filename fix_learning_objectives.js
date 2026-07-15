const fs = require('fs');

const dataPath = 'water_and_sanitation/data.js';
let data = fs.readFileSync(dataPath, 'utf8');

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

// we have to replace the exact generic string multiple times
let count = 0;
data = data.replace(/"scaffolded": \[\s*"Identify the key features of this topic.",\s*"Explain the core concepts and historical context.",\s*"Evaluate the overall significance."\s*\]/g, (match) => {
    let objs = specificObjectives[count];
    count++;
    if (!objs) return match; // just in case
    return `"scaffolded": [
                    "${objs[0]}",
                    "${objs[1]}",
                    "${objs[2]}"
                ]`;
});

fs.writeFileSync(dataPath, data, 'utf8');
console.log(`Replaced generic objectives in ${count} places.`);
