const fs = require('fs');

const injectionData = {
  'lesson_1_1': { sources: [{ title: 'Source A: The Religious Divide', src: '/images/religious_divide.jpg', caption: 'Map showing the religious divisions in Europe around 1558.' }] },
  'lesson_1_2': { sources: [{ title: 'Source A: The Act of Supremacy', src: '/images/act_of_supremacy.jpg', caption: 'A portrait of Elizabeth as Supreme Governor of the Church of England.' }] },
  'lesson_1_3': { sources: [{ title: 'Source A: Papal Bull', src: '/images/papal_bull.jpg', caption: 'Regnans in Excelsis, the 1570 Papal Bull excommunicating Elizabeth I.' }] },
  'lesson_1_4': { sources: [{ title: 'Source A: Mary Queen of Scots', src: '/images/mary_qos.jpg', caption: 'A portrait of Mary, Queen of Scots, a Catholic claimant to the English throne.' }] },
  'lesson_2_1': { 
    vocab: [
      { term: "Treason", definition: "The crime of betraying one's country, especially by attempting to kill or overthrow the sovereign." },
      { term: "Excommunication", definition: "The action of officially excluding someone from participation in the sacraments and services of the Christian Church." }
    ],
    sources: [{ title: 'Source A: The Northern Earls', src: '/images/northern_earls.jpg', caption: 'An illustration of the rebellion of the Northern Earls in 1569.' }] 
  },
  'lesson_2_2': { sources: [{ title: 'Source A: Philip II of Spain', src: '/images/philip_ii.jpg', caption: 'A portrait of King Philip II of Spain, the most powerful monarch in Europe at the time.' }] },
  'lesson_2_3': { 
    vocab: [
      { term: "Privateer", definition: "An armed ship owned and officered by private individuals holding a government commission and authorized for use in war, especially in the capture of enemy merchant shipping." },
      { term: "Treaty of Nonsuch", definition: "An agreement in 1585 in which Elizabeth I promised military support to the Dutch rebels fighting against Spain." }
    ],
    sources: [{ title: 'Source A: Francis Drake', src: '/images/drake.jpg', caption: 'Sir Francis Drake, an English privateer who raided Spanish ships.' }] 
  },
  'lesson_2_4': { 
    vocab: [
      { term: "Armada", definition: "A fleet of warships." },
      { term: "Fireships", definition: "Ships deliberately set on fire and steered into an enemy fleet to destroy or scatter it." }
    ],
    sources: [{ title: 'Source A: The Spanish Armada', src: '/images/spanish_armada.jpg', caption: 'A painting of the Spanish Armada engaged in battle with the English fleet.' }] 
  },
  'lesson_3_1': { 
    vocab: [
      { term: "Grammar School", definition: "A school that taught boys Latin, Greek, and classical literature." },
      { term: "Pastimes", definition: "Activities that people do for enjoyment in their free time." }
    ],
    sources: [{ title: 'Source A: Elizabethan Theatre', src: '/images/theatre.jpg', caption: 'A sketch of the Swan Theatre in London, showing the stage and audience galleries.' }] 
  },
  'lesson_3_2': { sources: [{ title: 'Source A: The Poor Law', src: '/images/poor_law.jpg', caption: 'An extract from the 1601 Elizabethan Poor Law outlining support for the destitute.' }] },
  'lesson_3_3': { sources: [{ title: 'Source A: The Golden Hind', src: '/images/golden_hind.jpg', caption: 'A replica of the Golden Hind, the ship Francis Drake used to circumnavigate the globe.' }] },
  'lesson_3_4': { sources: [{ title: 'Source A: Roanoke Colony', src: '/images/roanoke.jpg', caption: 'A map of the failed Roanoke colony in Virginia.' }] }
};

let content = fs.readFileSync('eee/data.js', 'utf8');

Object.keys(injectionData).forEach(lessonId => {
  const inj = injectionData[lessonId];
  const lessonIdx = content.indexOf(`"id": "${lessonId}"`);
  if (lessonIdx === -1) {
    console.error(`Could not find ${lessonId}`);
    return;
  }
  
  let nextLessonIdx = content.length;
  // Match next lesson id regardless of what it is
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
    if (inj.vocab) {
      injectStr += `,\n      "vocab": ${JSON.stringify(inj.vocab, null, 2).replace(/\n/g, '\n      ')}`;
    }
    if (inj.sources) {
      injectStr += `,\n      "sources": ${JSON.stringify(inj.sources, null, 2).replace(/\n/g, '\n      ')}`;
    }
    
    content = content.slice(0, injectPos) + injectStr + content.slice(injectPos);
  }
});

fs.writeFileSync('eee/data.js', content, 'utf8');
console.log('Injected vocab and sources into eee/data.js');
