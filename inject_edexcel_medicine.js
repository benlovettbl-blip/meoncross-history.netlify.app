const fs = require('fs');

const injectionData = {
  'lesson_1_1': { sources: [{ title: 'Source A: The Four Humours', src: '/images/four_humours.jpg', caption: 'A medieval diagram showing the Theory of the Four Humours.' }] },
  'lesson_1_2': { sources: [{ title: 'Source A: Medieval Bloodletting', src: '/images/bloodletting.jpg', caption: 'A manuscript illustration of a physician performing bloodletting.' }] },
  'lesson_1_3': { sources: [{ title: 'Source A: The Black Death', src: '/images/black_death.jpg', caption: 'An illustration showing victims of the Black Death covered in buboes.' }] },
  'lesson_2_1': { sources: [{ title: 'Source A: The Printing Press', src: '/images/printing_press.jpg', caption: 'An early printing press, which helped spread new medical ideas during the Renaissance.' }] },
  'lesson_2_2': { sources: [{ title: 'Source A: Pare and Paracelsus', src: '/images/pare_treatment.jpg', caption: 'Illustration of Ambroise Pare treating gunshot wounds with a soothing lotion instead of boiling oil.' }] },
  'lesson_2_3': { sources: [{ title: 'Source A: Harvey on the Heart', src: '/images/harvey_veins.jpg', caption: 'William Harvey demonstrating the circulation of blood and valves in the veins.' }] },
  'lesson_3_1': { sources: [{ title: 'Source A: Pasteur in the Lab', src: '/images/pasteur_lab.jpg', caption: 'Louis Pasteur working in his laboratory to prove Germ Theory.' }] },
  'lesson_3_2': { sources: [{ title: 'Source A: Florence Nightingale', src: '/images/nightingale.jpg', caption: 'Florence Nightingale tending to patients in the clean wards she established at Scutari.' }] },
  'lesson_3_3': { sources: [{ title: 'Source A: The Broad Street Pump', src: '/images/broad_street_pump.jpg', caption: 'John Snow\'s map showing deaths centered around the Broad Street pump.' }] },
  'lesson_4_1': { sources: [{ title: 'Source A: DNA Structure', src: '/images/dna_structure.jpg', caption: 'Watson and Crick with their model of the DNA double helix in 1953.' }] },
  'lesson_4_2': { sources: [{ title: 'Source A: The NHS Established', src: '/images/nhs_established.jpg', caption: 'A poster from 1948 advertising the establishment of the National Health Service.' }] },
  'lesson_4_3': { sources: [{ title: 'Source A: Fleming and Penicillin', src: '/images/penicillin_mould.jpg', caption: 'Alexander Fleming\'s original petri dish showing Penicillium mould killing staphylococci bacteria.' }] },
  'lesson_4_4': { sources: [{ title: 'Source A: Anti-Smoking Campaign', src: '/images/lung_cancer_campaign.jpg', caption: 'A modern government health campaign warning about the dangers of smoking and lung cancer.' }] }
};

let content = fs.readFileSync('edexcel_medicine/data.js', 'utf8');

Object.keys(injectionData).forEach(lessonId => {
  const inj = injectionData[lessonId];
  const lessonIdx = content.indexOf(`"id": "${lessonId}"`);
  if (lessonIdx === -1) {
    console.error(`Could not find ${lessonId}`);
    return;
  }
  
  let nextLessonIdx = content.length;
  const nextLessonMatch = content.slice(lessonIdx + 20).match(/"id": "lesson_\d+_\d+"/);
  if (nextLessonMatch) {
    nextLessonIdx = lessonIdx + 20 + nextLessonMatch.index;
  }
  
  // Find the end of the lesson block, which is just before the next lesson or EOF.
  const blockString = content.slice(lessonIdx, nextLessonIdx);
  const lastBraceIdx = blockString.lastIndexOf('    }');
  
  if (lastBraceIdx !== -1) {
    const injectPos = lessonIdx + lastBraceIdx;
    
    let injectStr = ``;
    if (inj.sources) {
      injectStr += `,\n      "sources": ${JSON.stringify(inj.sources, null, 2).replace(/\n/g, '\n      ')}`;
    }
    
    content = content.slice(0, injectPos) + injectStr + content.slice(injectPos);
  }
});

fs.writeFileSync('edexcel_medicine/data.js', content, 'utf8');
console.log('Injected sources into edexcel_medicine/data.js');
