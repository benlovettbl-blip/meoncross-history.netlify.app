const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');

function generateQrSvg(url) {
  const qr = QRCode.create(url, { margin: 1 });
  const size = qr.modules.size;
  const data = qr.modules.data;
  let pathD = '';
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (data[r * size + c]) {
        pathD += `M${c},${r}h1v1h-1z `;
      }
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" shape-rendering="crispEdges" style="width: 100%; height: 100%;"><path fill="#ffffff" d="M0,0h${size}v${size}H0z"/><path fill="#000000" d="${pathD.trim()}"/></svg>`;
}

function formatText(txt) {
  if (!txt) return '';
  return txt;
}

// ============================================================================
// 5 Dedicated Renaissance Enquiry Lesson Configurations (100% Black & White)
// ============================================================================
const renaissanceConfigs = [
  {
    lessonIndex: 5, // mapped to index 5 in units/edexcel_medicine/data.js (lesson_2_1)
    lessonNum: 1,
    id: 'lesson_2_1',
    title: 'KT2.1: The New Spirit of Enquiry: Humanism, The Printing Press & The Royal Society',
    specAnchor:
      'Ideas about the cause of disease and illness: the influence of the printing press and the work of the Royal Society on the communication of ideas.',
    tariff: 'Question 4: Explain Why [12 marks &bull; 15 mins]',
    examStem:
      'Explain why there were changes in the way ideas about the causes of disease and illness were communicated in the period c1500–c1700. [12 marks]',
    stimulus: ['The printing press (c1440/1476)', 'The Royal Society (1660/1662)'],
    structureStrip: [
      {
        col: '1. BREAKING CLERICAL MONOPOLY',
        text: 'Explain how Gutenberg’s movable-type press (c1440/Caxton 1476) took book production from Church scribes, ending censorship and hand-copying distortions.',
      },
      {
        col: '2. THE ROYAL SOCIETY & PEER REVIEW',
        text: 'Explain how the 1662 Royal Charter, motto Nullius in Verba, and Philosophical Transactions (1665) established the empirical scientific method.',
      },
      {
        col: '3. LIMITS OF CHANGE (CRITERIA)',
        text: 'Evaluate the paradox: books remained Latin luxury items for the wealthy; ordinary people still believed in miasma and the Four Humours.',
      },
    ],
    connectives:
      'A primary reason for change was... &bull; In particular, the movable-type press... &bull; Furthermore, the Royal Society established... &bull; However, the impact was limited because... &bull; Consequently...',
    wordBank:
      'Gutenberg press (c1440) &bull; William Caxton (1476) &bull; clerical monopoly &bull; vernacular translations &bull; Royal Society (1660) &bull; Royal Charter (1662) &bull; Nullius in Verba &bull; Philosophical Transactions (1665) &bull; peer review &bull; animalcules &bull; Robert Hooke (1665)',
    doNow: [
      {
        q: 'In what century did Hippocrates live and teach in Ancient Greece?',
        a: '5th Century BC (c. 460–370 BC)',
      },
      {
        q: 'Name the four bodily fluids identified in Hippocratic medicine.',
        a: 'Blood, Phlegm, Yellow Bile, Black Bile',
      },
      {
        q: 'Which ancient Roman physician expanded this into the Theory of Opposites?',
        a: 'Claudius Galen',
      },
      {
        q: 'Why did the medieval Catholic Church actively protect Galen’s medical ideas?',
        a: 'Galen believed the body was designed by a single Creator, fitting Christian doctrine',
      },
      {
        q: 'What Latin term refers to foul-smelling air blamed for causing epidemic disease?',
        a: 'Miasma',
      },
      {
        q: 'In what year did the Black Death first arrive in England?',
        a: '1348',
      },
      {
        q: 'Which Franciscan friar was imprisoned in 1277 for urging scientific experiments?',
        a: 'Roger Bacon',
      },
      {
        q: 'What glass flask was used by medieval physicians to inspect urine?',
        a: 'The matula (uroscopy)',
      },
      {
        q: 'What was the primary guiding principle of medieval monastic hospitals?',
        a: '‘Care not cure’ (spiritual comfort rather than medical treatment)',
      },
      {
        q: 'Name one humoural treatment used by medieval physicians to purge excessive blood.',
        a: 'Phlebotomy (bloodletting with fleams, cupping, or leeches)',
      },
    ],
    vocabPrompt:
      'Define <strong>The Royal Society (1660)</strong> and explain how its motto <strong>Nullius in Verba</strong> challenged medieval clerical authority:',
    fourMarkA: {
      type: 'Similarity',
      question:
        'Explain one way in which ideas about the cause of disease in the Renaissance (c1500–c1700) were similar to ideas in the Medieval period (c1250–c1500). [4 marks]',
      hint: "Focus on the persistent reliance on miasma (foul air) and God's will among ordinary people, despite elite scientific debates.",
      stems:
        'One way ideas about causes were similar was the continued belief in... &bull; In the Medieval period... &bull; Similarly, in the Renaissance...',
    },
    fourMarkB: {
      type: 'Difference',
      question:
        'Explain one way in which the communication of medical ideas in the Renaissance was different from the Medieval period. [4 marks]',
      hint: 'Contrast the mass-production of identical medical texts on printing presses with hand-copied manuscripts controlled by monks in scriptoria.',
      stems:
        'One way communication differed was... &bull; In the Medieval period, books were... &bull; In contrast, in the Renaissance, the printing press...',
    },
    timelineMission:
      "Turn to Pages 2–3 (Key Topic 2.1). In the drawing box, sketch Gutenberg’s screw press producing identical anatomical plates and annotate the Royal Society's motto: 'Nullius in Verba' (Take nobody's word for it)!",
    leftPageQuip:
      'Printing meant medical books spread across Europe in weeks instead of centuries. Unfortunately, bad medical advice spread just as quickly.',
    rightPageQuip:
      'The Royal Society motto Nullius in Verba translates to ‘Take nobody’s word for it’—the exact opposite of your teacher during exam revision.',
  },
  {
    lessonIndex: 6, // mapped to index 6 in units/edexcel_medicine/data.js (lesson_2_2)
    lessonNum: 2,
    id: 'lesson_2_2',
    title: 'KT2.2: Thomas Sydenham & The Art of Bedside Observation (1676)',
    specAnchor:
      'Continuity and change in care and treatment: Thomas Sydenham and the observation of symptoms.',
    tariff: 'Question 4: Explain Why [12 marks &bull; 15 mins]',
    examStem:
      'Explain why Thomas Sydenham was significant in the development of medicine in Britain. [12 marks]',
    stimulus: ['Observationes Medicae (1676)', 'Classifying diseases into species'],
    structureStrip: [
      {
        col: '1. BEDSIDE EMPIRICISM',
        text: 'Explain how Sydenham insisted on closely monitoring symptoms at the patient’s bedside, rejecting Galenic book-learning and complex astrological charts.',
      },
      {
        col: '2. CLASSIFYING DISEASES',
        text: 'Explain how Sydenham argued diseases were distinct species (like plants), successfully distinguishing measles from scarlet fever.',
      },
      {
        col: '3. TREATMENT & LIMITS',
        text: 'Explain his practical innovations (cinchona bark for malaria; cool regimes for smallpox) alongside his continued use of bloodletting and purging.',
      },
    ],
    connectives:
      'A primary reason for Sydenham’s significance was... &bull; In particular, his bedside method... &bull; Furthermore, classifying diseases into species... &bull; However, his impact on treatments was limited because... &bull; Consequently...',
    wordBank:
      'English Hippocrates &bull; bedside observation &bull; Observationes Medicae (1676) &bull; clinical symptoms &bull; disease species &bull; scarlet fever vs measles &bull; cinchona bark (quinine) &bull; cooling regime &bull; fresh air &bull; continued bloodletting &bull; purging',
    doNow: [
      {
        q: 'In what year did Johannes Gutenberg invent the movable metal type printing press?',
        a: 'c. 1440',
      },
      {
        q: 'In what year did William Caxton introduce the first printing press to England?',
        a: '1476',
      },
      {
        q: 'How did the printing press break the Catholic Church’s clerical monopoly on books?',
        a: 'Mass-produced identical copies without relying on hand-copying monk scribes',
      },
      {
        q: 'In what year was the Royal Society formally founded in London?',
        a: '1660 (Royal Charter granted 1662)',
      },
      {
        q: "What was the Latin motto of the Royal Society, meaning 'Take nobody's word for it'?",
        a: 'Nullius in Verba',
      },
      {
        q: 'Name the world’s first peer-reviewed scientific journal, published in 1665.',
        a: 'Philosophical Transactions',
      },
      {
        q: 'Who published Micrographia in 1665 featuring detailed microscopic illustrations?',
        a: 'Robert Hooke',
      },
      {
        q: 'What term did Antonie van Leeuwenhoek give to microscopic bacteria in 1676?',
        a: '‘Animalcules’',
      },
      {
        q: 'Why did optical discoveries of microbes save zero lives in the Renaissance?',
        a: 'Scientists did not realize that microscopic organisms caused infectious disease',
      },
      {
        q: 'Which ancient Greek physician originated the clinical observation of patients?',
        a: 'Hippocrates of Kos',
      },
    ],
    vocabPrompt:
      'Define <strong>Bedside Observation</strong> and explain how Sydenham’s concept of <strong>Disease Species</strong> differed from humoural theory:',
    fourMarkA: {
      type: 'Difference',
      question:
        "Explain one way in which Thomas Sydenham's approach to diagnosis was different from medieval physicians. [4 marks]",
      hint: 'Contrast Sydenham’s detailed bedside observation of clinical symptoms with medieval reliance on urine flasks (matula) and astrological charts.',
      stems:
        'One way diagnosis differed was... &bull; In the Medieval period, doctors relied on... &bull; In contrast, Sydenham insisted on...',
    },
    fourMarkB: {
      type: 'Similarity',
      question:
        'Explain one way in which medical treatments prescribed by Thomas Sydenham were similar to medieval treatments. [4 marks]',
      hint: 'Focus on his continued reliance on traditional humoural purging and bloodletting (phlebotomy) to deplete patient fluids.',
      stems:
        'One way treatments were similar was the continued use of... &bull; In the Medieval period... &bull; Similarly, Sydenham continued to prescribe...',
    },
    timelineMission:
      "Turn to Pages 2–3 (Key Topic 2.2). In the drawing box, sketch Sydenham recording clinical symptoms at a patient's bedside and annotate his landmark book: Observationes Medicae (1676)!",
    leftPageQuip:
      'Sydenham told young doctors: ‘Go to the bedside, there alone can you learn disease.’ Put down the Greek textbook, look at the patient!',
    rightPageQuip:
      'Prescribing cool bedrooms for smallpox instead of boiling patients alive in sealed rooms made Sydenham a genius in 1676.',
  },
  {
    lessonIndex: 7, // mapped to index 7 in units/edexcel_medicine/data.js (lesson_2_3)
    lessonNum: 3,
    id: 'lesson_2_3',
    title: 'KT2.3: Andreas Vesalius & The Anatomical Revolution (1543)',
    specAnchor:
      'Andreas Vesalius and his work on anatomy; the impact of De Humani Corporis Fabrica (1543).',
    tariff: 'Question 5/6: Evaluative Essay [16+4 marks &bull; 25 mins]',
    examStem:
      "'Andreas Vesalius’s work on anatomy was the most significant breakthrough in medicine in the period c1500–c1700.' How far do you agree? Explain your answer. [16+4 marks]",
    stimulus: ['De Humani Corporis Fabrica (1543)', 'Medical treatments in the 16th century'],
    structureStrip: [
      {
        col: '1. OVERTURNING GALEN (CHANGE)',
        text: 'Explain how Vesalius dissected human cadavers himself at Padua, correcting 300+ errors (e.g. human lower jaw is 1 bone not 2; no invisible heart pores).',
      },
      {
        col: '2. VISUAL MASS COMMUNICATION',
        text: 'Explain the impact of De Fabrica (1543): masterfully illustrated anatomical plates printed identically on printing presses, inspiring a generation of anatomists.',
      },
      {
        col: '3. LIMITATIONS ON TREATMENT (CRITERIA)',
        text: 'Evaluate: Vesalius created accurate anatomy, but knowing the structure of the body did not cure disease. Doctors remained helpless at the bedside.',
      },
    ],
    connectives:
      'On the one hand, Vesalius transformed anatomy because... &bull; Crucially, by dissecting human cadavers he proved... &bull; Furthermore, De Fabrica was mass-distributed... &bull; However, in terms of treating patients... &bull; Therefore, his overall significance was...',
    wordBank:
      'Andreas Vesalius &bull; University of Padua &bull; De Humani Corporis Fabrica (1543) &bull; human dissection &bull; 300+ Galenic errors &bull; mandible (jawbone) &bull; sternum (3 parts not 7) &bull; septum pores &bull; anatomical plates &bull; lack of medical cures &bull; continued humoural bleeding',
    doNow: [
      {
        q: 'What nickname was given to Thomas Sydenham because of his clinical approach?',
        a: 'The English Hippocrates',
      },
      {
        q: 'In what landmark 1676 book did Sydenham set out his clinical observations?',
        a: 'Observationes Medicae',
      },
      {
        q: 'How did Sydenham view diseases differently from humoural theory?',
        a: 'As distinct external species (like plants in botany), rather than unique personal imbalances',
      },
      {
        q: 'Which two childhood illnesses did Sydenham successfully prove were separate diseases?',
        a: 'Measles and scarlet fever',
      },
      {
        q: 'What imported South American tree bark did Sydenham prescribe for malaria fevers?',
        a: 'Cinchona bark (quinine)',
      },
      {
        q: 'What revolutionary cooling treatment did Sydenham prescribe for smallpox patients?',
        a: 'Open windows, cool bedrooms, and light blankets',
      },
      {
        q: 'In what way did Sydenham’s treatments still show continuity with the Middle Ages?',
        a: 'He continued prescribing bloodletting and purging to balance humours',
      },
      {
        q: 'What was the Royal Society’s Latin motto promoting empirical evidence?',
        a: 'Nullius in Verba (Take nobody’s word for it)',
      },
      {
        q: 'Where were medical manuscripts copied prior to the invention of the printing press?',
        a: 'Monastic scriptoria (by monks)',
      },
      {
        q: 'In what year did William Caxton set up the first printing press in England?',
        a: '1476',
      },
    ],
    vocabPrompt:
      'Define <strong>Human Dissection</strong> and explain why Vesalius’s corrections of <strong>Galenic Anatomy</strong> met furious resistance:',
    fourMarkA: {
      type: 'Difference',
      question:
        'Explain one way in which methods of investigating the human body in the Renaissance were different from methods in the Medieval period. [4 marks]',
      hint: 'Contrast medieval professors lecturing from Galenic texts while barbers cut with Vesalius performing human dissections himself at Padua.',
      stems:
        'One way methods of investigation differed was... &bull; In the Medieval period, professors... &bull; In contrast, in the Renaissance, Vesalius...',
    },
    fourMarkB: {
      type: 'Similarity',
      question:
        'Explain one way in which the effectiveness of surgical treatments in the 16th century was similar to the Medieval period. [4 marks]',
      hint: 'Focus on the fact that despite accurate anatomical diagrams, surgeons still lacked anesthetics, antiseptics, and effective treatments, leaving surgery agonizing and fatal.',
      stems:
        'One way the effectiveness of surgery was similar was... &bull; In the Medieval period... &bull; Similarly, in the 16th century...',
    },
    timelineMission:
      'Turn to Pages 2–3 (Key Topic 2.3). In the drawing box, sketch Vesalius dissecting the human muscular system and annotate his landmark masterwork: De Humani Corporis Fabrica (1543)!',
    leftPageQuip:
      'Vesalius proved Galen dissected apes instead of humans. Unsurprisingly, monkey ribs and human ribs do not match up.',
    rightPageQuip:
      'De Fabrica gave surgeons breathtaking anatomical maps, but without antiseptics, knowing where the artery is didn’t stop surgical shock.',
  },
  {
    lessonIndex: 8, // mapped to index 8 in units/edexcel_medicine/data.js (lesson_2_4)
    lessonNum: 4,
    id: 'lesson_2_4',
    title: 'KT2.4: William Harvey & The Circulation of the Blood (1628)',
    specAnchor:
      'William Harvey and his work on the circulation of the blood; the impact of De Motu Cordis (1628).',
    tariff: 'Question 4: Explain Why [12 marks &bull; 15 mins]',
    examStem:
      "Explain why William Harvey's discovery of the circulation of the blood was a turning point in medicine. [12 marks]",
    stimulus: ['Calculating blood volume (540 pints/hr)', 'De Motu Cordis (1628)'],
    structureStrip: [
      {
        col: '1. THE HEART AS A MECHANICAL PUMP',
        text: 'Explain how Harvey proved the heart acts as a pump, circulating blood through a closed one-way system of arteries and veins.',
      },
      {
        col: '2. MATHEMATICAL CALCULATION',
        text: 'Explain how Harvey calculated that the heart pumped 540 pints an hour (more than body weight), disproving Galen’s theory that the liver made blood from food.',
      },
      {
        col: '3. RESISTANCE & TREATMENT LIMITS',
        text: "Explain why conservative doctors rejected Harvey ('quack') and why his discovery did not change medical treatments or halt bloodletting.",
      },
    ],
    connectives:
      'Harvey’s discovery was a turning point because... &bull; By applying mechanical pump theory, he proved... &bull; Crucially, his mathematical calculations proved... &bull; However, the practical impact was limited because... &bull; Consequently...',
    wordBank:
      'William Harvey &bull; De Motu Cordis (1628) &bull; circulation of the blood &bull; mechanical pump &bull; arteries &bull; veins &bull; vein valves (Fabricius) &bull; ligature experiment &bull; 540 pints per hour &bull; capillaries &bull; conservative backlash',
    doNow: [
      {
        q: 'In what year did Andreas Vesalius publish De Humani Corporis Fabrica?',
        a: '1543',
      },
      {
        q: 'At which famous Italian university did Vesalius serve as professor of surgery?',
        a: 'University of Padua',
      },
      {
        q: 'How did Vesalius’s method of teaching anatomy differ from medieval professors?',
        a: 'He dissected human cadavers himself rather than lecturing from ancient Galenic texts',
      },
      {
        q: 'How many anatomical errors made by Galen did Vesalius identify and correct?',
        a: 'Over 300 errors',
      },
      {
        q: 'State one specific anatomical error of Galen corrected by Vesalius.',
        a: 'The human lower jaw is one bone (not two); the breastbone has 3 segments (not 7)',
      },
      {
        q: 'Why did Vesalius’s accurate anatomical discoveries fail to cure sick patients?',
        a: 'Knowing anatomy did not cure internal infections or provide new medicines',
      },
      {
        q: 'Which ancient Roman doctor’s anatomical monopoly was overturned by Vesalius?',
        a: 'Claudius Galen',
      },
      {
        q: 'What 1676 book did Thomas Sydenham publish on clinical bedside symptoms?',
        a: 'Observationes Medicae',
      },
      {
        q: 'In what year was the Royal Society granted its Royal Charter by Charles II?',
        a: '1662',
      },
      {
        q: 'What was the Royal Society’s motto promoting empirical evidence?',
        a: 'Nullius in Verba (Take nobody’s word for it)',
      },
    ],
    vocabPrompt:
      'Define <strong>Circulation of the Blood</strong> and explain how Harvey’s <strong>Mechanical Pump</strong> model overturned Galen’s liver theory:',
    fourMarkA: {
      type: 'Difference',
      question:
        "Explain one way in which William Harvey's understanding of the circulatory system was different from Galen's theories. [4 marks]",
      hint: 'Contrast Galen’s idea that blood is constantly manufactured in the liver and burned as fuel with Harvey’s proof of a closed, continuous circulation pumped by the heart.',
      stems:
        "One way Harvey's ideas differed was... &bull; Galen claimed that blood was... &bull; In contrast, Harvey proved that...",
    },
    fourMarkB: {
      type: 'Similarity',
      question:
        'Explain one way in which medical treatments after Harvey’s discovery were similar to treatments in the Medieval period. [4 marks]',
      hint: 'Focus on the fact that physicians continued to practice bloodletting (phlebotomy) to balance humours because Harvey’s discovery offered zero practical cures.',
      stems:
        'One way medical treatments remained similar was... &bull; In the Medieval period... &bull; Similarly, after Harvey’s discovery...',
    },
    timelineMission:
      'Turn to Pages 2–3 (Key Topic 2.4). In the drawing box, sketch the famous arm ligature experiment showing vein valves and annotate: De Motu Cordis (1628)!',
    leftPageQuip:
      'Harvey calculated the heart pumped 540 pints of blood per hour. Unless patients drank a swimming pool of blood daily, Galen was undeniably wrong.',
    rightPageQuip:
      'Doctors called Harvey a ‘circulator’ (slang for a traveling fraud). It turns out accepting the heart is a mechanical pump took 50 years to catch on.',
  },
  {
    lessonIndex: 9, // mapped to index 9 in units/edexcel_medicine/data.js (lesson_2_5)
    lessonNum: 5,
    id: 'lesson_2_5',
    title: 'KT2.5: Continuity in Treatment & The Great Plague of London (1665)',
    specAnchor:
      'Dealing with the Great Plague in London, 1665: approaches to treatment and attempts to prevent its spread.',
    tariff: 'Question 5/6: Evaluative Essay [16+4 marks &bull; 25 mins]',
    examStem:
      "'Approaches to treating and preventing disease during the Great Plague of 1665 showed almost complete continuity with the Black Death of 1348.' How far do you agree? Explain your answer. [16+4 marks]",
    stimulus: ['The Four Humours and miasma', 'Quarantine and watchmen'],
    structureStrip: [
      {
        col: '1. LOCAL CIVIC ACTION (CHANGE)',
        text: "Explain how London authorities enforced organized quarantine: padlocking infected houses for 28 days with red crosses ('Lord have mercy upon us'), watchmen, and Bills of Mortality.",
      },
      {
        col: '2. MEDICAL TREATMENT (CONTINUITY)',
        text: "Explain how doctors still blamed miasma, God, and the Four Humours: smoking tobacco, holding pomanders, bleeding patients, and taking useless quack 'Plague Water'.",
      },
      {
        col: '3. EVALUATIVE VERDICT (CRITERIA)',
        text: 'Weigh civic organisation against medical ignorance: government responses became more organized, but medical knowledge of the disease was identical to 1348.',
      },
    ],
    connectives:
      'On the one hand, responses in 1665 showed change because... &bull; For example, local authorities enforced... &bull; On the other hand, there was complete continuity in... &bull; Crucially, medical treatments... &bull; Overall, while civic methods changed...',
    wordBank:
      'The Great Plague (1665) &bull; London Bills of Mortality &bull; 28-day house quarantine &bull; red crosses &bull; Lord have mercy upon us &bull; searchers of the dead &bull; mass plague pits &bull; parish watchmen &bull; miasma &bull; pomanders &bull; smoking tobacco &bull; continued bloodletting',
    doNow: [
      {
        q: 'In what year did William Harvey publish De Motu Cordis?',
        a: '1628',
      },
      {
        q: 'How did Harvey mathematically disprove Galen’s liver theory?',
        a: 'Showed the heart pumps 540 pints an hour, far more than the body’s weight',
      },
      {
        q: 'What one-way valves in veins did Harvey investigate using his arm ligature experiment?',
        a: 'Vein valves (discovered by Fabricius)',
      },
      {
        q: 'What microscopic vessels connecting arteries and veins could Harvey not observe?',
        a: 'Capillaries',
      },
      {
        q: 'Why did conservative doctors nickname Harvey a ‘circulator’ (quack)?',
        a: 'They fiercely defended Galen’s 1,400-year anatomical authority',
      },
      {
        q: 'In what year was Vesalius’s De Humani Corporis Fabrica published?',
        a: '1543',
      },
      {
        q: 'State one anatomical error of Galen corrected by Vesalius.',
        a: 'The lower jaw is one bone not two (or the breastbone has 3 parts not 7)',
      },
      {
        q: 'What nickname was given to Thomas Sydenham?',
        a: '‘The English Hippocrates’',
      },
      {
        q: 'In what year did the Black Death first strike England?',
        a: '1348',
      },
      {
        q: 'Name the imported South American tree bark prescribed by Sydenham for malaria fevers.',
        a: 'Cinchona bark (quinine)',
      },
    ],
    vocabPrompt:
      'Define <strong>Civic Quarantine</strong> and explain how the 1665 response to <strong>Miasma</strong> showed continuity with 1348:',
    fourMarkA: {
      type: 'Similarity',
      question:
        'Explain one way in which attempts to prevent the spread of the Great Plague (1665) were similar to attempts during the Black Death (1348). [4 marks]',
      hint: 'Focus on the continued belief in miasma, leading people to carry pomanders, smoke tobacco, and light street bonfires, alongside prayers to avert God’s wrath.',
      stems:
        'One way attempts to prevent spread were similar was... &bull; During the Black Death in 1348... &bull; Similarly, during the Great Plague of 1665...',
    },
    fourMarkB: {
      type: 'Difference',
      question:
        'Explain one way in which municipal and civic reactions to the Great Plague (1665) were different from reactions to the Black Death (1348). [4 marks]',
      hint: 'Contrast the absence of organized municipal quarantine in 1348 with strict 28-day house lock-ins, red crosses on doors, parish watchmen, and Bills of Mortality in 1665.',
      stems:
        'One way civic reactions differed was... &bull; During the Black Death in 1348... &bull; In contrast, during the Great Plague of 1665, the Mayor of London...',
    },
    timelineMission:
      'Turn to Pages 2–3 (Key Topic 2.5). In the drawing box, sketch Londoners fleeing the 1665 plague, padlocked houses with red crosses, and the dead-cart collecting bodies. Annotate why treatments showed continuity with 1348!',
    leftPageQuip:
      'In 1665, Eton schoolboys were flogged if they refused to smoke tobacco every morning to ward off plague miasma. Good luck explaining that to your parents.',
    rightPageQuip:
      'Painting a red cross and writing ‘Lord have mercy upon us’ on a door kept healthy neighbours away, but did shockingly little to stop the infected fleas.',
  },
];

// ============================================================================
// FOOTER STRIP HELPER (Page Number + Quip on the Same Line)
// Even pages (verso/left): Page number on left, quip on right.
// Odd pages (recto/right): Quip on left, page number on right.
// ============================================================================
function renderFooterStrip(pageNum, quipText, totalPages = 14) {
  const isEven = pageNum % 2 === 0;
  if (isEven) {
    return `
      <div class="page-footer-strip">
        <span class="footer-page-num" style="margin-right: 8px;">${pageNum}/${totalPages}</span>
        <span class="footer-quip" style="text-align: right; flex: 1;"><em>${quipText}</em></span>
      </div>`;
  } else {
    return `
      <div class="page-footer-strip">
        <span class="footer-quip" style="text-align: left; flex: 1; margin-right: 8px;"><em>${quipText}</em></span>
        <span class="footer-page-num">${pageNum}/${totalPages}</span>
      </div>`;
  }
}

// ============================================================================
// HTML WORKBOOK GENERATOR FUNCTION (100% Black & White / Photocopy-Ready)
// ============================================================================
function buildRenaissanceTwoPageWorkbook(unitData, period) {
  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Key Topic 2: The Medical Renaissance in England Workbook</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:wght@700;800;900&display=swap" rel="stylesheet">
  <style>
    *, *:before, *:after { box-sizing: border-box; }
    @page {
      size: A4 portrait;
      margin: 10mm 10mm 12mm 10mm;
    }
    body {
      font-family: 'Georgia', 'Garamond', serif;
      font-size: 8.5pt;
      line-height: 1.32;
      color: #000000;
      margin: 0;
      padding: 0;
      background: #ffffff;
    }
    h1, h2, h3, h4, h5, h6, strong, th, .sans {
      font-family: 'Inter', -apple-system, sans-serif;
    }
    /* Page Container: Zero outer border, pure flex distribution for optimal page budget */
    .page, .page-container {
      width: 100%;
      height: 272mm;
      max-height: 272mm;
      overflow: hidden;
      box-sizing: border-box;
      position: relative;
      page-break-after: always;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 3mm 4mm;
      background: #ffffff;
    }
    .page:last-child, .page-container:last-child {
      page-break-after: auto;
    }
    /* Full flex section container for interior distribution */
    .page-body-full {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    /* Clean Task Section Spacing */
    .task-section {
      margin-bottom: 5px;
      padding-bottom: 0;
    }
    .task-section-divider {
      border-bottom: 1.2px solid #000000;
      padding-bottom: 4px;
      margin-bottom: 5px;
    }
    /* Thick Black Writing Lines for Handwriting */
    .task-line {
      border-bottom: 1.5px solid #000000;
      height: 7.4mm;
      width: 100%;
      box-sizing: border-box;
    }
    .task-line-dotted {
      border-bottom: 1.2px dotted #000000;
      height: 6.2mm;
      width: 100%;
      box-sizing: border-box;
    }
    /* Clean Footer Strip */
    .page-footer-strip {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 0.5px solid #d0d0d0;
      padding-top: 1.5px;
      margin-top: 2px;
      font-family: 'Inter', sans-serif;
      font-size: 6.4pt;
      line-height: 1.15;
      color: #666666;
    }
    .footer-quip {
      font-style: italic;
      color: #666666;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .footer-page-num {
      font-family: 'Inter', sans-serif;
      font-weight: 700;
      white-space: nowrap;
      color: #000000;
      font-size: 6.8pt;
    }
  </style>
</head>
<body>
`;

  // ====================================================================
  // PAGE 1: FRONT COVER (Specification Table, Large Archival Image, No Outer Borders)
  // ====================================================================
  html += `
  <div class="page page-container" id="page-1" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Top Departmental Branding with Customizer Hook -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #000000; padding-bottom: 4px; margin-bottom: 8px;">
        <div data-department-name="The History Department">
          <span style="font-family: 'Inter', sans-serif; font-size: 11pt; font-weight: 900; color: #000000; text-transform: uppercase; letter-spacing: 1px;">
            <span class="school-brand-target">The History Department</span>
          </span>
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 8.5pt; font-weight: 700; color: #000000;">
          EDEXCEL GCSE (9–1) HISTORY &bull; PAPER 1
        </div>
      </div>

      <!-- Pupil Details Strip -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 6px 12px; background: #ffffff; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 14px; align-items: center; margin-bottom: 10px;">
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #000000; text-transform: uppercase; margin-right: 8px;">Pupil Name:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #000000; height: 14px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #000000; text-transform: uppercase; margin-right: 8px;">Class:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #000000; height: 14px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #000000; text-transform: uppercase; margin-right: 8px;">Teacher:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #000000; height: 14px;"></div>
        </div>
      </div>

      <!-- Main Title Block -->
      <div style="text-align: center; margin: 2px 0 6px 0;">
        <div style="display: inline-block; border: 1.5px solid #000000; color: #000000; font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; padding: 2px 10px; border-radius: 3px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; background: #ffffff;">
          Key Topic 2 &bull; c1500–c1700
        </div>
        <h1 style="font-family: 'Playfair Display', serif; font-size: 22pt; line-height: 1.15; color: #000000; margin: 2px 0 3px 0; font-weight: 900;">
          The Medical Renaissance in England
        </h1>
        <div style="font-family: 'Georgia', serif; font-size: 10pt; color: #222222; font-style: italic; font-weight: 600;">
          Humanism, The Anatomical Revolution, and The Persistence of Ancient Dogma
        </div>
      </div>

      <!-- Prominent Primary Visual Source Centerpiece (Massively Zoomed on Vesalius Dissection, Grand KS3-Scale Hero Presentation) -->
      <div style="margin: 3px 0 5px 0; text-align: center; background: #ffffff;">
        <img src="/images/vesalius_dissection_wide.jpg" alt="Andreas Vesalius Performing Human Dissection at Padua (1543)" style="width: 100%; max-height: 245px; object-fit: cover; object-position: center 30%; display: block; margin: 0 auto;">
        <div style="display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #000000; padding: 3px 4px; border-top: 1px solid #000000; margin-top: 2px; background: #ffffff;">
          <span><strong>Primary Visual Source:</strong> <em>Andreas Vesalius Performing Human Dissection at Padua</em> (Frontispiece of <em>De Fabrica</em>, 1543)</span>
          <span>Accession Shelfmark: <strong>ARCH-MED-1543</strong></span>
        </div>
      </div>

      <!-- Course Specification Curriculum Tracking Table -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; overflow: hidden; margin: 4px 0 2px 0;">
        <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif;">
          <thead>
            <tr style="border-bottom: 1.5px solid #000000; background: #ffffff;">
              <th style="padding: 6px 10px; text-align: left; font-size: 8.5pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; border-right: 1.2px solid #000000; color: #000000;">
                Course Specification &bull; Key Enquiry Sequence
              </th>
              <th style="padding: 6px 4px; width: 68px; text-align: center; font-size: 8pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; border-right: 1.2px solid #000000; color: #000000;">
                Learnt
              </th>
              <th style="padding: 6px 4px; width: 68px; text-align: center; font-size: 8pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; color: #000000;">
                Revised
              </th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 5px 10px; border-right: 1.2px solid #000000;">
                <div style="font-size: 8.8pt; font-weight: 800; color: #000000; line-height: 1.25;">
                  Key Topic 2.1: The New Spirit of Enquiry: Humanism, The Printing Press &amp; The Royal Society
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 8pt; font-style: italic; color: #333333; margin-top: 1.5px; line-height: 1.25;">
                  How did movable type printing and the scientific method challenge 1,500 years of clerical medical dogma?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #000000;">
                <div style="width: 16px; height: 16px; border: 1.5px solid #000000; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 16px; height: 16px; border: 1.5px solid #000000; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 5px 10px; border-right: 1.2px solid #000000;">
                <div style="font-size: 8.8pt; font-weight: 800; color: #000000; line-height: 1.25;">
                  Key Topic 2.2: Thomas Sydenham &amp; The Art of Bedside Observation (1676)
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 8pt; font-style: italic; color: #333333; margin-top: 1.5px; line-height: 1.25;">
                  Why was Sydenham nicknamed 'The English Hippocrates', and how did his disease classification revolutionize diagnosis?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #000000;">
                <div style="width: 16px; height: 16px; border: 1.5px solid #000000; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 16px; height: 16px; border: 1.5px solid #000000; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 5px 10px; border-right: 1.2px solid #000000;">
                <div style="font-size: 8.8pt; font-weight: 800; color: #000000; line-height: 1.25;">
                  Key Topic 2.3: Andreas Vesalius &amp; The Anatomical Revolution (1543)
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 8pt; font-style: italic; color: #333333; margin-top: 1.5px; line-height: 1.25;">
                  How did direct human dissection in De Fabrica disprove 300+ Galenic errors, and why did it fail to cure disease?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #000000;">
                <div style="width: 16px; height: 16px; border: 1.5px solid #000000; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 16px; height: 16px; border: 1.5px solid #000000; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 5px 10px; border-right: 1.2px solid #000000;">
                <div style="font-size: 8.8pt; font-weight: 800; color: #000000; line-height: 1.25;">
                  Key Topic 2.4: William Harvey &amp; The Circulation of the Blood (1628)
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 8pt; font-style: italic; color: #333333; margin-top: 1.5px; line-height: 1.25;">
                  How did mathematical calculation and ligature experiments prove that blood circulates rather than being burned as fuel?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #000000;">
                <div style="width: 16px; height: 16px; border: 1.5px solid #000000; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 16px; height: 16px; border: 1.5px solid #000000; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
            <tr>
              <td style="padding: 5px 10px; border-right: 1.2px solid #000000;">
                <div style="font-size: 8.8pt; font-weight: 800; color: #000000; line-height: 1.25;">
                  Key Topic 2.5: Case Study: Continuity in Treatment &amp; The Great Plague of London (1665)
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 8pt; font-style: italic; color: #333333; margin-top: 1.5px; line-height: 1.25;">
                  How did civic quarantine orders change municipal response, and why did treatment show complete continuity with 1348?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #000000;">
                <div style="width: 16px; height: 16px; border: 1.5px solid #000000; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 16px; height: 16px; border: 1.5px solid #000000; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      ${renderFooterStrip(1, 'The Renaissance brought printing presses and telescopes, but if you caught the plague in 1665, your doctor still smoked tobacco and bled you dry.')}
    </div>
  </div>
`;

  // ====================================================================
  // PAGES 2–3: LIVING TIMELINE (Expanded Open Drawing/Note Spaces)
  // ====================================================================
  html += `
  <!-- PAGE 2: LIVING TIMELINE PART 1 (MILESTONES 1–4: 1440–1660) -->
  <div class="page page-container" id="page-2" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div>
        <div style="border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 6px;">
          <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 11pt; color: #000000; text-transform: uppercase; font-weight: 800;">
            Living Timeline &bull; Part 1: Humanism &amp; The Anatomical Revolution (1440–1660)
          </h2>
        </div>

        <div style="border-bottom: 1px solid #000000; padding-bottom: 4px; margin-bottom: 8px; font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #000000;">
          <strong>Instructions:</strong> As you study each enquiry lesson, complete the timeline missions by sketching and annotating in the corresponding Key Topic boxes below.
        </div>
      </div>

      <!-- 4 Milestones with Large Blank Drawing/Notes Area (Calibrated for 0px overflow) -->
      <div style="display: flex; flex-direction: column; gap: 6px; flex: 1; justify-content: space-between;">

        <!-- Milestone 1 -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #000000;">
                1440 &bull; Johannes Gutenberg: Movable Metal Type Printing Press
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Key Topic 2.1</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.22;">
              Gutenberg invents movable metal type in Mainz (introduced to England by Caxton in 1476). Shatters Church monopoly on medical manuscript copying. Enables rapid mass-production of identical medical texts and anatomical diagrams without copyist errors.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 38mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>

        <!-- Milestone 2 -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #000000;">
                1543 &bull; Andreas Vesalius: De Humani Corporis Fabrica &amp; Padua Dissections
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Key Topic 2.3</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.22;">
              Vesalius personally conducts human dissections at Padua, correcting over 300 Galenic anatomical errors (e.g. human lower jaw is one bone not two). Masterfully illustrated by Titian’s workshop and mass-printed, creating the foundation of modern anatomy.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 38mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>

        <!-- Milestone 3 -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #000000;">
                1628 &bull; William Harvey: De Motu Cordis &amp; Circulation of the Blood
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Key Topic 2.4</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.22;">
              Harvey mathematically calculates the volume of blood pumped per hour (540 pints), proving blood circulates continuously through arteries and veins. Disproves Galen’s 1,400-year theory that blood is consumed as fuel manufactured by the liver.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 38mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>

        <!-- Milestone 4 -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #000000;">
                1660 &bull; The Royal Society: Nullius in Verba &amp; Scientific Peer Review
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Key Topic 2.1</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.22;">
              Founded under royal patronage (Charles II). Operating under the motto Nullius in Verba (‘Take nobody’s word for it’), it establishes the empirical scientific method, publishing Philosophical Transactions (1665) to share peer-reviewed laboratory research across Europe.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 38mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>

      </div>

      ${renderFooterStrip(2, 'Vesalius proved the human jawbone is one piece, not two like a dog’s. Galen had a lot of explaining to do.')}
    </div>
  </div>

  <!-- PAGE 3: LIVING TIMELINE PART 2 (MILESTONES 5–8: 1665–1676) -->
  <div class="page page-container" id="page-3" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div>
        <div style="border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 6px;">
          <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 11pt; color: #000000; text-transform: uppercase; font-weight: 800;">
            Living Timeline &bull; Part 2: Observation, Plagues &amp; The Microscopic World (1665–1676)
          </h2>
        </div>

        <div style="border-bottom: 1px solid #000000; padding-bottom: 4px; margin-bottom: 8px; font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #000000;">
          <strong>Instructions:</strong> Complete the timeline sketches and notes as you master each enquiry lesson.
        </div>
      </div>

      <!-- 4 Milestones with Large Blank Drawing/Notes Area (Calibrated for 0px overflow) -->
      <div style="display: flex; flex-direction: column; gap: 6px; flex: 1; justify-content: space-between;">

        <!-- Milestone 5 -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #000000;">
                1665 &bull; Robert Hooke: Micrographia &amp; Discovery of Plant Cells
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Key Topic 2.1</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.22;">
              Hooke uses compound microscopes to examine cork tissue, coining the term 'cell'. His stunning fold-out engravings of fleas and insects shock the public, demonstrating that visible nature contains an unseen microscopic architecture.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 38mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>

        <!-- Milestone 6 -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #000000;">
                1665 &bull; The Great Plague of London: Civic Quarantine &amp; Bills of Mortality
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Key Topic 2.5</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.22;">
              The plague kills 100,000 Londoners. The Mayor enforces strict municipal orders: infected houses padlocked for 28 days with red crosses; parish watchmen guard doors; mass plague pits dug; yet treatments (bleeding, tobacco) remain identical to 1348.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 38mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>

        <!-- Milestone 7 -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #000000;">
                1676 &bull; Thomas Sydenham: Observationes Medicae &amp; Bedside Observation
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Key Topic 2.2</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.22;">
              The 'English Hippocrates' urges doctors to abandon theoretical books and study living symptoms at the bedside. Classifies diseases into distinct biological species (distinguishing scarlet fever from measles); prescribes cool regimes for smallpox and cinchona bark for malaria.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 38mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>

        <!-- Milestone 8 -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #000000;">
                1676 &bull; Antonie van Leeuwenhoek: Discovery of 'Animalcules' (Bacteria)
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Key Topic 2.1</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.22;">
              Using precision single-lens microscopes magnifying up to 300x, Leeuwenhoek discovers living microorganisms in rainwater and dental plaque. Yet without understanding that microbes cause illness, the discovery saves zero lives until Pasteur in 1861.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 38mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>

      </div>

      ${renderFooterStrip(3, 'Leeuwenhoek discovered bacteria in 1676. Sadly, nobody realized they caused disease until 1861, proving timing is everything in medical history.')}
    </div>
  </div>
`;

  // ====================================================================
  // PAGES 4–13: 5 DEDICATED TWO-PAGE SPREADS (LESSONS 2.1 TO 2.5)
  // Matching 100% the Master Medieval Template
  // ====================================================================
  renaissanceConfigs.forEach((cfg) => {
    const leftPageNum = cfg.lessonNum * 2 + 2;
    const rightPageNum = cfg.lessonNum * 2 + 3;

    // ------------------------------------------------------------------
    // LEFT PAGE: 10-QUESTION DO NOW + KEY VOCAB (3 LINES) + TWO 4-MARK QUESTIONS
    // ------------------------------------------------------------------
    html += `
  <div class="page page-container" id="page-${leftPageNum}">
    <div class="page-body-full">
      <!-- Lesson Header (No Redundant Page/Spread Number) -->
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 6px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 11pt; color: #000000; margin: 0; font-weight: 800;">
          ${cfg.title}
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
          Knowledge Retrieval &bull; Key Vocabulary &bull; Exam Practice
        </span>
      </div>

      <!-- 10-Question Do Now Retrieval Grid (Clean borderless presentation) -->
      <div class="task-section task-section-divider">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; text-transform: uppercase; letter-spacing: 0.5px;">
            &bull; 'Do Now' Retrieval Drill (10 Recall Questions)
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 800; border: 1.2px solid #000000; padding: 1px 6px; border-radius: 3px;">
            Score: [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 10 ]
          </span>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px 14px;">
          ${cfg.doNow
            .map(
              (item, idx) => `
          <div>
            <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 700; color: #000000; line-height: 1.2;">
              ${idx + 1}. ${item.q}
            </div>
            <div class="task-line-dotted"></div>
          </div>
          `,
            )
            .join('')}
        </div>
      </div>

      <!-- Key Vocabulary Task (3 Handwriting Lines to eliminate underflow) -->
      <div class="task-section">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; text-transform: uppercase; letter-spacing: 0.5px;">
            &bull; Key Vocabulary Task
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 700; border: 1px solid #000000; padding: 0 4px; border-radius: 2px;">TERMINOLOGY</span>
        </div>
        <p style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.25;">
          ${cfg.vocabPrompt}
        </p>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
      </div>

      <!-- Exam Practice Question 3A [4 marks] -->
      <div class="task-section">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; text-transform: uppercase; letter-spacing: 0.5px;">
            &bull; Question 3(a): Explain One ${cfg.fourMarkA.type} [4 marks]
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 700; border: 1px solid #000000; padding: 0 4px; border-radius: 2px;">[4 MARKS &bull; 5 MINS]</span>
        </div>
        <p style="font-family: 'Playfair Display', serif; font-size: 8.2pt; font-weight: 800; color: #000000; margin: 0 0 2px 0;">
          ${cfg.fourMarkA.question}
        </p>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-style: italic; color: #333333; margin-bottom: 2px;">
          <strong>Hint:</strong> ${cfg.fourMarkA.hint}
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; margin-bottom: 2px;">
          <strong>Stems:</strong> ${cfg.fourMarkA.stems}
        </div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
      </div>

      <!-- Exam Practice Question 3B [4 marks] -->
      <div class="task-section">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; text-transform: uppercase; letter-spacing: 0.5px;">
            &bull; Question 3(b): Explain One ${cfg.fourMarkB.type} [4 marks]
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 700; border: 1px solid #000000; padding: 0 4px; border-radius: 2px;">[4 MARKS &bull; 5 MINS]</span>
        </div>
        <p style="font-family: 'Playfair Display', serif; font-size: 8.2pt; font-weight: 800; color: #000000; margin: 0 0 2px 0;">
          ${cfg.fourMarkB.question}
        </p>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-style: italic; color: #333333; margin-bottom: 2px;">
          <strong>Hint:</strong> ${cfg.fourMarkB.hint}
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; margin-bottom: 2px;">
          <strong>Stems:</strong> ${cfg.fourMarkB.stems}
        </div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
      </div>

      ${renderFooterStrip(leftPageNum, cfg.leftPageQuip)}
    </div>
  </div>

  <!-- ------------------------------------------------------------------ -->
  <!-- RIGHT PAGE: EXTENDED EXAM PRACTICE & RIGOROUS TIMELINE MISSION     -->
  <!-- ------------------------------------------------------------------ -->
  <div class="page page-container" id="page-${rightPageNum}">
    <div class="page-body-full">
      <!-- Exam Header (No Redundant Page/Spread Number) -->
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 6px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 11pt; color: #000000; margin: 0; font-weight: 800;">
          ${cfg.tariff}
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
          Extended Writing Assessment
        </span>
      </div>

      <!-- Question Stem & Stimulus Box -->
      <div style="border: 1px solid #000000; border-radius: 3px; padding: 5px 8px; background: #ffffff; margin-bottom: 5px;">
        <div style="font-family: 'Playfair Display', serif; font-size: 8.8pt; font-weight: 800; color: #000000; margin-bottom: 3px; line-height: 1.25;">
          ${cfg.examStem}
        </div>
        <div style="display: flex; align-items: center; gap: 8px; font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #000000;">
          <strong>Stimulus:</strong>
          <span style="border: 1px solid #000000; padding: 1px 6px; border-radius: 2px; font-weight: 600;">${cfg.stimulus[0]}</span>
          <span style="border: 1px solid #000000; padding: 1px 6px; border-radius: 2px; font-weight: 600;">${cfg.stimulus[1]}</span>
          <span style="font-style: italic;">(You must also use information of your own)</span>
        </div>
      </div>

      <!-- 3-Column Planning Structure Strip -->
      <div style="margin-bottom: 5px;">
        <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-transform: uppercase; margin-bottom: 2px; border-bottom: 1px solid #000000; padding-bottom: 1px;">
          Structure Strip &bull; 3-Paragraph Analytical Plan
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px;">
          ${cfg.structureStrip
            .map(
              (strip) => `
          <div style="border: 1px solid #000000; border-top: 2.5px solid #000000; border-radius: 2px; padding: 3px 5px; background: #ffffff;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7pt; color: #000000; display: block; margin-bottom: 1px;">${strip.col}</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #000000; line-height: 1.2; display: block;">${strip.text}</span>
          </div>
          `,
            )
            .join('')}
        </div>
      </div>

      <!-- Connectives & Key Vocabulary Bank -->
      <div style="border: 1px solid #000000; border-radius: 3px; padding: 4px 7px; background: #ffffff; margin-bottom: 5px; display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
        <div>
          <strong style="font-family: 'Inter', sans-serif; font-size: 7pt; text-transform: uppercase; display: block;">Analytical Connectives:</strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-style: italic; line-height: 1.2; display: block;">${cfg.connectives}</span>
        </div>
        <div>
          <strong style="font-family: 'Inter', sans-serif; font-size: 7pt; text-transform: uppercase; display: block;">Key Vocabulary Bank:</strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; line-height: 1.2; display: block;">${cfg.wordBank}</span>
        </div>
      </div>

      <!-- Ruled Task Lines for Extended Writing -->
      <div style="font-family: 'Inter', sans-serif; font-size: 7.1pt; font-style: italic; color: #222222; margin-bottom: 2px;">
        <strong>Task:</strong> Using the structure strip above, write 1–2 detailed analytical paragraphs below (continue in your exercise book for full timed paper):
      </div>
      <div style="display: flex; flex-direction: column; gap: 0; margin-bottom: 5px; flex: 1; justify-content: space-between;">
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
      </div>

      <!-- Timeline Mission (Deep Historical Analytical Task) -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 5px 8px; background: #ffffff; display: flex; justify-content: space-between; align-items: center; margin-top: 2px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; background: #000000; color: #ffffff; padding: 2px 6px; border-radius: 2px; text-transform: uppercase; white-space: nowrap;">
            Timeline Mission
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.3pt; color: #000000; line-height: 1.2;">
            ${cfg.timelineMission}
          </span>
        </div>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; white-space: nowrap; margin-left: 8px;">
          &larr; Pages 2–3
        </span>
      </div>

      ${renderFooterStrip(rightPageNum, cfg.rightPageQuip)}
    </div>
  </div>
`;
  });

  // ====================================================================
  // PAGE 14: OUTSIDE BACK COVER (Target Grade, Wide Ledger, 5 QR Codes)
  // Matching 100% the Master Medieval Template
  // ====================================================================
  html += `
  <div class="page page-container" id="page-14" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Back Cover Header Strip (No Redundant 'OUTSIDE BACK COVER' text) -->
      <div style="border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 6px;">
        <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 12.5pt; color: #000000; text-transform: uppercase; font-weight: 900; letter-spacing: 0.5px;">
          Student Assessment Record &amp; Progress Tracker
        </h2>
      </div>

      <!-- Pupil Details & Target Grade Strip -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 5px 12px; background: #ffffff; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 14px; align-items: center; margin-bottom: 7px;">
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #000000; text-transform: uppercase; margin-right: 8px;">Pupil Name:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #000000; height: 14px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #000000; text-transform: uppercase; margin-right: 8px;">Class:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #000000; height: 14px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #000000; text-transform: uppercase; margin-right: 8px;">Target Grade:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #000000; height: 14px; text-align: center; font-weight: 900;"></div>
        </div>
      </div>

      <!-- 96-Mark Progress Ledger Table with 'Date Completed' as Column 1 and Wide Score Boxes -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; overflow: hidden; margin-bottom: 7px;">
        <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif; font-size: 7.8pt;">
          <thead>
            <tr style="background: #000000; color: #ffffff;">
              <th style="padding: 5px 6px; width: 15%; text-align: center; border-right: 1px solid #444444;">Date Completed</th>
              <th style="padding: 5px 8px; width: 28%; text-align: left; border-right: 1px solid #444444;">Lesson &bull; Specification Focus</th>
              <th style="padding: 5px 8px; width: 19%; text-align: center; border-right: 1px solid #444444;">Q3 Practice [4m]</th>
              <th style="padding: 5px 8px; width: 24%; text-align: center; border-right: 1px solid #444444;">Extended Response</th>
              <th style="padding: 5px 6px; width: 14%; text-align: center;">Lesson Total</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 4px 6px; border-right: 1px solid #000000; text-align: center;">&nbsp;</td>
              <td style="padding: 4px 8px; border-right: 1px solid #000000;"><strong>KT2.1:</strong> Printing &amp; Royal Society</td>
              <td style="padding: 4px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Q3 Sim: <span style="font-size: 9.5pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 4</strong> ]</span></td>
              <td style="padding: 4px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Q4 Why: <span style="font-size: 9.5pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 12</strong> ]</span></td>
              <td style="padding: 4px 6px; text-align: center; font-size: 9.8pt; font-weight: 900;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 16</strong> ]</td>
            </tr>
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 4px 6px; border-right: 1px solid #000000; text-align: center;">&nbsp;</td>
              <td style="padding: 4px 8px; border-right: 1px solid #000000;"><strong>KT2.2:</strong> Thomas Sydenham</td>
              <td style="padding: 4px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Q3 Diff: <span style="font-size: 9.5pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 4</strong> ]</span></td>
              <td style="padding: 4px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Q4 Why: <span style="font-size: 9.5pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 12</strong> ]</span></td>
              <td style="padding: 4px 6px; text-align: center; font-size: 9.8pt; font-weight: 900;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 16</strong> ]</td>
            </tr>
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 4px 6px; border-right: 1px solid #000000; text-align: center;">&nbsp;</td>
              <td style="padding: 4px 8px; border-right: 1px solid #000000;"><strong>KT2.3:</strong> Andreas Vesalius</td>
              <td style="padding: 4px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Q3 Diff: <span style="font-size: 9.5pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 4</strong> ]</span></td>
              <td style="padding: 4px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Q5/6 Essay: <span style="font-size: 9.5pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 20</strong> ]</span></td>
              <td style="padding: 4px 6px; text-align: center; font-size: 9.8pt; font-weight: 900;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 24</strong> ]</td>
            </tr>
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 4px 6px; border-right: 1px solid #000000; text-align: center;">&nbsp;</td>
              <td style="padding: 4px 8px; border-right: 1px solid #000000;"><strong>KT2.4:</strong> William Harvey</td>
              <td style="padding: 4px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Q3 Diff: <span style="font-size: 9.5pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 4</strong> ]</span></td>
              <td style="padding: 4px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Q4 Why: <span style="font-size: 9.5pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 12</strong> ]</span></td>
              <td style="padding: 4px 6px; text-align: center; font-size: 9.8pt; font-weight: 900;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 16</strong> ]</td>
            </tr>
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 4px 6px; border-right: 1px solid #000000; text-align: center;">&nbsp;</td>
              <td style="padding: 4px 8px; border-right: 1px solid #000000;"><strong>KT2.5:</strong> Great Plague of 1665</td>
              <td style="padding: 4px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Q3 Sim: <span style="font-size: 9.5pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 4</strong> ]</span></td>
              <td style="padding: 4px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Q5/6 Essay: <span style="font-size: 9.5pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 20</strong> ]</span></td>
              <td style="padding: 4px 6px; text-align: center; font-size: 9.8pt; font-weight: 900;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 24</strong> ]</td>
            </tr>
            <tr style="background: #ffffff; font-weight: 900; border-top: 2px solid #000000;">
              <td colspan="2" style="padding: 4px 8px; border-right: 1px solid #000000; text-transform: uppercase; font-size: 8pt;">Cumulative Assessment Totals</td>
              <td style="padding: 4px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Q3 Total: <span style="font-size: 9.8pt; font-weight: 900;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 20</strong> ]</span></td>
              <td style="padding: 4px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Extended: <span style="font-size: 9.8pt; font-weight: 900;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 76</strong> ]</span></td>
              <td style="padding: 4px 6px; text-align: center; font-size: 10.5pt; font-weight: 900;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 96</strong> ]</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Teacher Feedback Section (WWW & EBI 4 lines each) -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 5px 10px; background: #ffffff; margin-bottom: 6px;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; text-transform: uppercase;">
            Teacher Formative Assessment &bull; Feedback
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 700;">
            Effort: [ 1 &bull; 2 &bull; 3 &bull; 4 &bull; 5 ]
          </span>
        </div>

        <div style="margin-bottom: 3px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.6pt; text-transform: uppercase; display: block; margin-bottom: 1px;">
            What Went Well (WWW):
          </strong>
          <div class="task-line"></div>
          <div class="task-line"></div>
          <div class="task-line"></div>
          <div class="task-line"></div>
        </div>

        <div style="margin-bottom: 3px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.6pt; text-transform: uppercase; display: block; margin-bottom: 1px;">
            Even Better If (EBI):
          </strong>
          <div class="task-line"></div>
          <div class="task-line"></div>
          <div class="task-line"></div>
          <div class="task-line"></div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #000000; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 7.4pt;">
          <span><strong>Teacher Signature:</strong> ____________________________</span>
          <span><strong>Date:</strong> ____________________</span>
        </div>
      </div>

      <!-- Interactive Quizzing QR Codes for Lessons 2.1–2.5 -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 5px 8px; background: #ffffff;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000000; padding-bottom: 2px; margin-bottom: 4px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; text-transform: uppercase;">
            📱 Interactive Digital Quizzing Hub &bull; Scan for Instant Retrieval Practice
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; border: 1px solid #000000; padding: 0 4px; border-radius: 2px;">
            ONLINE RECALL
          </span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; text-align: center;">
          ${renaissanceConfigs
            .map((cfg, idx) => {
              const quizUrl = `https://the-history-revision-hub.netlify.app/?unit=edexcel_medicine&lesson=${cfg.lessonIndex}&quiz=true`;
              const qrSvg = generateQrSvg(quizUrl);
              const shortLabels = [
                'Printing & Science',
                'Thomas Sydenham',
                'Andreas Vesalius',
                'William Harvey',
                'Great Plague 1665',
              ];
              return `
          <div style="border: 1px solid #000000; border-radius: 3px; padding: 3px 2px; background: #ffffff; display: flex; flex-direction: column; align-items: center; justify-content: space-between;">
            <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; margin-bottom: 1px;">
              KT2.${cfg.lessonNum}
            </div>
            <div style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 700; color: #333333; margin-bottom: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%;">
              ${shortLabels[idx]}
            </div>
            <div style="width: 21.5mm; height: 21.5mm; margin: 0 auto 2px auto;">
              ${qrSvg}
            </div>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.2pt; font-weight: 700; text-transform: uppercase; background: #000000; color: #ffffff; padding: 1px 5px; border-radius: 2px; margin-bottom: 2px;">
              Scan to Quiz
            </span>
            <div style="font-family: 'Inter', sans-serif; font-size: 8.5pt; font-weight: 900; color: #000000; margin-top: 1px; white-space: nowrap;">
              Best Score: [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 8</strong> ]
            </div>
          </div>
          `;
            })
            .join('')}
        </div>
      </div>

      ${renderFooterStrip(14, 'Knowledge is power, but retrieval practice is how you actually remember it in the exam hall.')}
    </div>
  </div>
`;

  html += `
</body>
</html>
`;

  return html;
}

module.exports = {
  buildRenaissanceTwoPageWorkbook,
};
