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
// 5 Dedicated Renaissance Lesson Configurations (100% Black & White / Photocopy-Ready)
// ============================================================================
const renaissanceConfigs = [
  {
    lessonIndex: 5, // mapped to index 5 in units/edexcel_medicine/data.js (lesson_2_1)
    lessonNum: 1,
    id: 'lesson_2_1',
    title:
      'KT2.1: The New Spirit of Enquiry: Humanism, The Printing Press & The Royal Society (c1500–c1700)',
    enquiryQuestion:
      'How did the invention of printing and the scientific method challenge 1,500 years of medical orthodoxy?',
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
      'One major reason for change was... &bull; Crucially, this accelerated... &bull; Furthermore, the establishment of... &bull; However, the impact was limited because... &bull; Consequently...',
    wordBank: {
      technical:
        'Gutenberg press &bull; movable metal type &bull; vernacular translations &bull; woodcut illustrations &bull; clerical monopoly',
      institutional:
        'The Royal Society (1660) &bull; Royal Charter (1662) &bull; Nullius in Verba &bull; Philosophical Transactions (1665) &bull; peer review',
      continuity:
        'Latin treatises &bull; monastic scriptoria &bull; Four Humours &bull; miasma theory &bull; astrological almanacs',
    },
    doNow: [
      { q: 'In what year did the Black Death arrive in England?', a: '1348' },
      {
        q: 'Name the ancient Roman physician who created the Theory of Opposites.',
        a: 'Claudius Galen',
      },
      {
        q: 'What four bodily fluids did the Hippocratic theory claim must remain balanced for health?',
        a: 'Blood, Phlegm, Yellow Bile, Black Bile',
      },
      {
        q: 'State one reason why the medieval Catholic Church actively protected Galen’s medical ideas.',
        a: 'Galen believed the body was designed by a single Creator, fitting Christian doctrine.',
      },
    ],
    coreKnowledge: [
      {
        heading: 'Gutenberg’s Movable Type (c1440 / Caxton 1476):',
        text: 'Took book production out of Catholic Church scriptoria; mass-produced identical medical treatises and anatomical woodcuts across Europe without copyist errors.',
      },
      {
        heading: 'The Royal Society (1660 / Royal Charter 1662):',
        text: "Elite scientific body granted Crown prestige by Charles II; operated under Nullius in Verba ('Take nobody's word for it'); published Philosophical Transactions (1665), Europe's first peer-reviewed scientific journal.",
      },
      {
        heading: 'Optical Discoveries & The Renaissance Paradox:',
        text: "Hooke's Micrographia (1665) and Leeuwenhoek's 'animalcules' (1676) revealed microscopic cells and bacteria, but without understanding that microbes caused disease, saving zero lives.",
      },
    ],
    vocabTask: {
      type: 'distinction',
      termA: 'Monastic Scriptoria',
      termB: 'Movable Metal Type',
      prompt:
        'Explain the crucial difference between hand-copied <strong>monastic scriptoria</strong> (Church monopoly) and Gutenberg’s <strong>movable metal type</strong> (mass scientific communication):',
    },
    fourMarkComparison: {
      type: 'Similarity',
      question:
        'Explain one way in which ideas about the cause of disease in the Renaissance were similar to ideas in the Medieval period. [4 marks]',
      hint: "Focus on the persistent reliance on miasma (foul air) and God's will among ordinary people, despite elite scientific debates.",
      stems:
        'One way ideas about causes were similar was the continued belief in... &bull; In the Medieval period... &bull; Similarly, in the Renaissance...',
    },
    timelineMission:
      "Turn back to Pages 2–3 (Key Topic 2.1). In the drawing box, sketch Gutenberg’s screw press producing identical anatomical plates and annotate the Royal Society's motto: 'Nullius in Verba' (Take nobody's word for it)!",
    leftPageQuip:
      'Printing meant medical books spread across Europe in weeks instead of centuries. Unfortunately, bad medical advice spread just as quickly.',
    rightPageQuip:
      'The Royal Society motto Nullius in Verba translates to ‘Take nobody’s word for it’—the exact opposite of your teacher during exam revision.',
  },
  {
    lessonIndex: 6, // lesson_2_2
    lessonNum: 2,
    id: 'lesson_2_2',
    title: 'KT2.2: Thomas Sydenham & The Art of Bedside Observation (1676)',
    enquiryQuestion:
      "How did Thomas Sydenham's focus on direct observation challenge traditional medical practice?",
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
      'Sydenham was significant because... &bull; By rejecting classical theory, he established... &bull; This directly led to... &bull; However, his impact on treatments was limited because...',
    wordBank: {
      technical:
        'English Hippocrates &bull; bedside observation &bull; Observationes Medicae &bull; clinical symptoms &bull; disease species',
      treatments:
        'scarlet fever vs measles &bull; cinchona bark (quinine) &bull; cooling regime &bull; fresh air &bull; smallpox ventilation',
      continuity:
        'bloodletting &bull; purging &bull; Four Humours &bull; traditional apothecaries &bull; symptomatic relief',
    },
    doNow: [
      {
        q: "What was the Latin motto of the Royal Society, meaning 'Take nobody's word for it'?",
        a: 'Nullius in Verba',
      },
      {
        q: "Name the world's first peer-reviewed scientific journal published by the Royal Society in 1665.",
        a: 'Philosophical Transactions',
      },
      {
        q: 'What name did Antonie van Leeuwenhoek give to the microscopic organisms he observed in 1676?',
        a: 'Animalcules (bacteria)',
      },
      {
        q: 'Who published Micrographia in 1665 featuring a giant fold-out engraving of a flea?',
        a: 'Robert Hooke',
      },
    ],
    coreKnowledge: [
      {
        heading: "The 'English Hippocrates':",
        text: 'Sydenham rejected university book-learning, pulse-taking charts, and astrology, insisting that physicians must sit at the bedside and carefully record patient symptoms over time.',
      },
      {
        heading: 'Classifying Diseases as Species:',
        text: 'Argued that diseases were separate biological entities with specific characteristics (like plants in a botany book), successfully distinguishing scarlet fever from measles.',
      },
      {
        heading: 'Treatments & The Limits of Change:',
        text: 'Prescribed cinchona bark (quinine) for malaria and cool regimes (open windows, light blankets) for smallpox; yet continued to rely on traditional bloodletting and purging.',
      },
    ],
    vocabTask: {
      type: 'distinction',
      termA: 'Humoral Diagnosis',
      termB: 'Disease Classification',
      prompt:
        "Explain the difference between medieval <strong>humoral diagnosis</strong> (treating individual imbalance) and Sydenham's <strong>disease classification</strong> (treating external disease species):",
    },
    fourMarkComparison: {
      type: 'Difference',
      question:
        "Explain one way in which Thomas Sydenham's approach to diagnosis was different from medieval physicians. [4 marks]",
      hint: 'Contrast Sydenham’s detailed bedside observation of external symptoms with medieval urine charts and astrology.',
      stems:
        'One way diagnosis was different was... &bull; In the Medieval period, doctors relied on... &bull; In contrast, Sydenham insisted on...',
    },
    timelineMission:
      "Turn back to Pages 2–3 (Key Topic 2.2). In the drawing box, sketch Sydenham recording clinical symptoms at a patient's bedside and annotate his landmark book: Observationes Medicae!",
    leftPageQuip:
      'Sydenham told young doctors: ‘Go to the bedside, there alone can you learn disease.’ Put down the Greek textbook, look at the patient!',
    rightPageQuip:
      'Prescribing cool bedrooms for smallpox instead of boiling patients alive in sealed rooms made Sydenham a genius in 1676.',
  },
  {
    lessonIndex: 7, // lesson_2_3
    lessonNum: 3,
    id: 'lesson_2_3',
    title: 'KT2.3: Andreas Vesalius & The Anatomical Revolution (1543)',
    enquiryQuestion:
      'Why did Andreas Vesalius succeed in overturning 1,400 years of Galenic anatomical authority?',
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
      'On the one hand, Vesalius transformed anatomy because... &bull; Crucially, this disproved... &bull; However, in terms of treating patients... &bull; Therefore, his immediate impact was...',
    wordBank: {
      technical:
        'De Humani Corporis Fabrica (1543) &bull; University of Padua &bull; dissection &bull; human cadaver &bull; anatomical plates',
      corrections:
        '300 Galenic errors &bull; lower jaw (mandible) &bull; septum pores &bull; breastbone segments &bull; animal vs human anatomy',
      continuity:
        'lack of cures &bull; traditional surgery &bull; bleeding &bull; surgical pain &bull; infection risks',
    },
    doNow: [
      {
        q: 'What nickname was given to Thomas Sydenham because of his emphasis on bedside observation?',
        a: 'The English Hippocrates',
      },
      {
        q: 'Name the 1676 book in which Sydenham set out his methods of clinical observation.',
        a: 'Observationes Medicae',
      },
      {
        q: 'What treatment did Sydenham prescribe for malaria fevers, imported from South America?',
        a: 'Cinchona bark (quinine)',
      },
      {
        q: 'Which two childhood illnesses did Sydenham successfully prove were separate diseases?',
        a: 'Measles and scarlet fever',
      },
    ],
    coreKnowledge: [
      {
        heading: 'Padua Anatomical Theatre & Human Dissection:',
        text: "Vesalius descended from the high lecturer's pulpit to dissect human cadavers himself, rather than letting illiterate barber-surgeons do the cutting while professors read Galen.",
      },
      {
        heading: 'Correcting Over 300 Galenic Errors:',
        text: 'Proved Galen had only dissected animals (pigs, apes, dogs); proved human lower jaw is one bone not two; breastbone has 3 parts not 7; septum of the heart has no invisible holes.',
      },
      {
        heading: 'De Humani Corporis Fabrica (1543):',
        text: 'Published magnificent folio with precise woodcut anatomical illustrations mass-produced on printing presses; yet accurate anatomy could not cure infection or internal illness.',
      },
    ],
    vocabTask: {
      type: 'distinction',
      termA: 'Galenic Orthodoxy',
      termB: 'Direct Human Dissection',
      prompt:
        "Explain the difference between medieval <strong>Galenic orthodoxy</strong> (reading ancient books) and Vesalius's <strong>direct human dissection</strong> (hands-on observation):",
    },
    fourMarkComparison: {
      type: 'Difference',
      question:
        'Explain one way in which methods of investigating the human body in the Renaissance were different from methods in the Medieval period. [4 marks]',
      hint: 'Contrast medieval professors lecturing from Galenic texts while barbers cut with Vesalius performing human dissections himself.',
      stems:
        'One way methods of investigation differed was... &bull; In the Medieval period... &bull; In contrast, in the Renaissance, Vesalius...',
    },
    timelineMission:
      'Turn back to Pages 2–3 (Key Topic 2.3). In the drawing box, sketch Vesalius dissecting the human muscular system and annotate his landmark masterwork: De Humani Corporis Fabrica (1543)!',
    leftPageQuip:
      'Vesalius proved Galen dissected apes instead of humans. Unsurprisingly, monkey ribs and human ribs do not match up.',
    rightPageQuip:
      'De Fabrica gave surgeons breathtaking anatomical maps, but without antiseptics, knowing where the artery is didn’t stop surgical shock.',
  },
  {
    lessonIndex: 8, // lesson_2_4
    lessonNum: 4,
    id: 'lesson_2_4',
    title: 'KT2.4: William Harvey & The Circulation of the Blood (1628)',
    enquiryQuestion:
      "Why did William Harvey's discovery of blood circulation meet fierce medical resistance?",
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
      'Harvey’s discovery was a turning point because... &bull; By applying mechanical calculations, he proved... &bull; Consequently, this disproved Galen’s idea that... &bull; However, his practical impact was delayed because...',
    wordBank: {
      technical:
        'De Motu Cordis (1628) &bull; circulation of the blood &bull; mechanical pump &bull; arteries &bull; veins &bull; vein valves',
      experiments:
        'Padua (Fabricius) &bull; ligature experiment &bull; 540 pints per hour &bull; dissection of cold-blooded animals &bull; capillaries',
      continuity:
        "conservative backlash ('circulator/quack') &bull; lack of treatment impact &bull; continued bloodletting &bull; microscopic limits",
    },
    doNow: [
      { q: 'In what year did Andreas Vesalius publish De Humani Corporis Fabrica?', a: '1543' },
      {
        q: 'At which famous Italian university did Vesalius serve as professor of surgery?',
        a: 'University of Padua',
      },
      {
        q: 'How many anatomical errors made by Galen did Vesalius identify and correct?',
        a: 'Over 300 errors',
      },
      {
        q: 'State one specific anatomical error of Galen corrected by Vesalius.',
        a: 'The human lower jaw is one bone (not two); the breastbone has 3 segments (not 7).',
      },
    ],
    coreKnowledge: [
      {
        heading: 'The Heart as a Mechanical Pump:',
        text: 'Influenced by Renaissance mechanical water pumps, Harvey proved the heart is a muscular pump that forces blood into arteries, which returns through veins in a closed, one-way system.',
      },
      {
        heading: "Disproving Galen's Liver Theory:",
        text: 'Galen taught blood was made in the liver and consumed like fuel. Harvey mathematically calculated the heart pumped 540 pints an hour (more than body weight), proving blood must recirculate.',
      },
      {
        heading: 'Forensic Experiments & Treatment Limits:',
        text: 'Used tight ligatures on arms to prove vein valves only allow blood to flow towards the heart; published De Motu Cordis (1628); yet bloodletting continued because doctors lacked drug cures.',
      },
    ],
    vocabTask: {
      type: 'distinction',
      termA: 'Galenic Blood Consumption',
      termB: 'Circular Recirculation',
      prompt:
        "Explain the difference between Galen's theory of <strong>blood consumption</strong> (liver creating blood burned as fuel) and Harvey's <strong>circular recirculation</strong> (closed continuous circuit):",
    },
    fourMarkComparison: {
      type: 'Difference',
      question:
        "Explain one way in which William Harvey's understanding of the circulatory system was different from Galen's theories. [4 marks]",
      hint: "Contrast Galen's idea that blood is made in the liver and consumed as fuel with Harvey's proof of a closed, one-way circulation pumped by the heart.",
      stems:
        "One way Harvey's ideas differed from Galen was... &bull; Galen claimed that blood was... &bull; In contrast, Harvey proved that...",
    },
    timelineMission:
      'Turn back to Pages 2–3 (Key Topic 2.4). In the drawing box, sketch the famous arm ligature experiment showing vein valves and annotate: De Motu Cordis (1628)!',
    leftPageQuip:
      'Harvey calculated the heart pumped 540 pints of blood per hour. Unless patients drank a swimming pool of blood daily, Galen was undeniably wrong.',
    rightPageQuip:
      'Doctors called Harvey a ‘circulator’ (slang for a traveling fraud). It turns out accepting the heart is a mechanical pump took 50 years to catch on.',
  },
  {
    lessonIndex: 9, // lesson_2_5
    lessonNum: 5,
    id: 'lesson_2_5',
    title: 'KT2.5: Continuity in Treatment & The Great Plague of London (1665)',
    enquiryQuestion:
      'Why did the Great Plague of 1665 reveal the severe limitations of Renaissance medical progress?',
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
      'On the one hand, responses in 1665 showed change because... &bull; For example, local authorities... &bull; On the other hand, there was complete continuity in... &bull; Overall, while civic methods changed...',
    wordBank: {
      technical:
        'The Great Plague (1665) &bull; London Bills of Mortality &bull; searchers of the dead &bull; mass plague pits &bull; parish watchmen',
      quarantine:
        "28-day house quarantine &bull; red cross on doors &bull; 'Lord have mercy upon us' &bull; killing 200,000 dogs and cats",
      continuity:
        'miasma &bull; pomanders &bull; smoking tobacco &bull; Four Humours &bull; bloodletting &bull; quack remedies &bull; plague water',
    },
    doNow: [
      { q: 'In what year did William Harvey publish De Motu Cordis?', a: '1628' },
      {
        q: 'Which ancient theory of blood production did Harvey disprove through mathematical calculations?',
        a: "Galen's theory that the liver constantly manufactures blood from food",
      },
      {
        q: 'What tiny blood vessels connecting arteries and veins could Harvey NOT see without a microscope?',
        a: 'Capillaries',
      },
      {
        q: "Why did Harvey's discovery of blood circulation have NO immediate effect on medical treatment?",
        a: 'Doctors did not know what caused infection and continued bloodletting to balance humours.',
      },
    ],
    coreKnowledge: [
      {
        heading: 'The Great Plague Catastrophe (1665):',
        text: 'Swept through overcrowded London, killing roughly 100,000 citizens (20% of the population); bodies collected at night by dead-carts and dumped in mass parish lime pits.',
      },
      {
        heading: 'Civic Plague Orders (Change):',
        text: "Mayor enforced strict municipal quarantine: infected houses padlocked for 28 days, painted with a red cross and 'Lord have mercy upon us', guarded by watchmen; 200,000 dogs and cats slaughtered.",
      },
      {
        heading: 'Stagnation in Treatment (Continuity):',
        text: "Physicians had no understanding of rat fleas or bacteria; citizens smoked tobacco and carried pomanders against miasma; apothecaries sold fake 'Plague Water'; bleeding and purging persisted.",
      },
    ],
    vocabTask: {
      type: 'distinction',
      termA: 'Civic Quarantine Orders',
      termB: 'Miasmatic Pomanders',
      prompt:
        'Explain the difference between municipal <strong>civic quarantine orders</strong> (watchmen, red crosses, locked houses) and individual <strong>miasmatic pomanders</strong> (herbs, smoking):',
    },
    fourMarkComparison: {
      type: 'Difference',
      question:
        'Explain one way in which government reactions to the Great Plague of 1665 were different from reactions to the Black Death of 1348. [4 marks]',
      hint: "Contrast the lack of organized municipal action in 1348 with London's 1665 quarantine orders, locked houses, appointed watchmen, and Bills of Mortality.",
      stems:
        'One way government reactions differed was... &bull; In 1348, the government... &bull; In contrast, in 1665, London authorities...',
    },
    timelineMission:
      "Turn back to Pages 2–3 (Key Topic 2.5). In the drawing box, sketch the red cross on a quarantined front door with 'Lord have mercy upon us' and annotate the 28-day watchmen rule!",
    leftPageQuip:
      'In 1665, authorities killed 200,000 dogs and cats to stop the plague. This unfortunately left the infected black rats to breed completely unchecked.',
    rightPageQuip:
      'Eton schoolboys were whipped in 1665 if they refused to smoke tobacco to ward off miasma. Historical evidence that bad habits die hard.',
  },
];

// ============================================================================
// FOOTER STRIP HELPER (Page Number + Humorous Quip on the Same Line)
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
    .page-body-full {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .task-section {
      margin-bottom: 5px;
      padding-bottom: 0;
    }
    .task-section-divider {
      border-bottom: 1.2px solid #000000;
      padding-bottom: 4px;
      margin-bottom: 5px;
    }
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

      <!-- Prominent Primary Visual Source Centerpiece (Vesalius De Fabrica Frontispiece) -->
      <div style="margin: 2px 0 6px 0; border: 1.2px solid #000000; border-radius: 4px; overflow: hidden; background: #ffffff;">
        <div style="display: flex; justify-content: center; align-items: center; padding: 6px 0; background: #ffffff;">
          <img src="/images/vesalius_fabrica_frontispiece.jpg" alt="Andreas Vesalius Dissecting at Padua" style="max-height: 190px; width: auto; max-width: 95%; display: block;">
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #000000; padding: 3px 8px; border-top: 1px solid #000000; background: #ffffff;">
          <span><strong>Primary Visual Source:</strong> <em>Andreas Vesalius Dissecting at Padua</em> (Frontispiece of <em>De Humani Corporis Fabrica</em>, Basel, 1543)</span>
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
  // PAGES 2–3: LIVING TIMELINE (1440–1676) · 8 MILESTONES (100% Black & White)
  // ====================================================================
  html += `
  <!-- PAGE 2: LIVING TIMELINE PART 1 (MILESTONES 1–4: 1440–1628) -->
  <div class="page page-container" id="page-2" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div>
        <div style="border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 6px;">
          <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 11pt; color: #000000; text-transform: uppercase; font-weight: 800;">
            Living Timeline &bull; Part 1: Humanism &amp; The Anatomical Revolution (1440–1628)
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
                c. 1500 &bull; The Rise of Medical Humanism
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Key Topic 2.1</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.22;">
              Scholars bypass distorted medieval Church translations and translate original Greek and Latin medical manuscripts directly. Promotes human reason, empirical observation, and critical questioning, fostering an intellectual climate ready to challenge Galen.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 38mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>

        <!-- Milestone 3 -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #000000;">
                1543 &bull; Andreas Vesalius Publishes De Humani Corporis Fabrica
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Key Topic 2.3</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.22;">
              Based on direct human dissection at Padua, Vesalius corrects over 300 errors in Galen's anatomy (human lower jaw is one bone, not two; no pores in the heart septum). Proves Galen only dissected animals. Inspires empirical observation across Europe.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 38mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>

        <!-- Milestone 4 -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #000000;">
                1628 &bull; William Harvey Publishes De Motu Cordis
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Key Topic 2.4</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.22;">
              Calculates heart pumps 540 pints of blood per hour—proving blood must circulate through a closed system rather than being continuously manufactured by the liver. Demonstrates vein valves ensure one-way flow toward the heart.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 38mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>

      </div>

      ${renderFooterStrip(2, 'Gutenberg gave scholars mass-produced books, and Vesalius gave them accurate anatomy—Galen’s 1,500-year winning streak was officially broken.')}
    </div>
  </div>

  <!-- PAGE 3: LIVING TIMELINE PART 2 (MILESTONES 5–8: 1660–1676) -->
  <div class="page page-container" id="page-3" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div>
        <div style="border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 6px;">
          <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 11pt; color: #000000; text-transform: uppercase; font-weight: 800;">
            Living Timeline &bull; Part 2: The Scientific Method &amp; Bedside Observation (1660–1676)
          </h2>
        </div>

        <div style="border-bottom: 1px solid #000000; padding-bottom: 4px; margin-bottom: 8px; font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #000000;">
          <strong>Instructions:</strong> As you study each enquiry lesson, complete the timeline missions by sketching and annotating in the corresponding Key Topic boxes below.
        </div>
      </div>

      <!-- 4 Milestones with Large Blank Drawing/Notes Area (Calibrated for 0px overflow) -->
      <div style="display: flex; flex-direction: column; gap: 6px; flex: 1; justify-content: space-between;">

        <!-- Milestone 5 -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #000000;">
                1660 / 1662 &bull; The Royal Society Founded &amp; Granted Royal Charter
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Key Topic 2.1</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.22;">
              Operates under Nullius in Verba ('Take nobody's word for it'); receives Royal Charter from Charles II in 1662. Publishes Philosophical Transactions (1665), Europe's first peer-reviewed journal, institutionalising empirical laboratory testing.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 38mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>

        <!-- Milestone 6 -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #000000;">
                1665 &bull; Robert Hooke Publishes Micrographia (Leeuwenhoek Microbes 1676)
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Key Topic 2.1</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.22;">
              Hooke uses compound microscopes to reveal plant cells and fleas. In 1676, Antonie van Leeuwenhoek observes living 'animalcules' (bacteria). However, because microbes are not linked to disease, the discovery saves zero lives.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 38mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>

        <!-- Milestone 7 -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #000000;">
                1665 &bull; Case Study: The Great Plague Catastrophe in London
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Key Topic 2.5</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.22;">
              Kills 100,000 Londoners (20% of the city). Mayor enforces 28-day household quarantines with watchmen and red crosses. Catastrophic slaughter of 200,000 dogs and cats allows infected black rat fleas to proliferate unchecked.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 38mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>

        <!-- Milestone 8 -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #000000;">
                1676 &bull; Thomas Sydenham Publishes Observationes Medicae
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Key Topic 2.2</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.22;">
              Nicknamed 'The English Hippocrates', Sydenham pioneers clinical bedside observation, classifying diseases into distinct species by symptoms. Prescribes cooling regimes for smallpox and cinchona bark (quinine) for malaria fevers.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 38mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>

      </div>

      ${renderFooterStrip(3, 'Sydenham proved practical observation beat theoretical philosophy every time—even if he still carried leeches in his medical bag.')}
    </div>
  </div>
`;

  // ====================================================================
  // 5 LESSON SPREADS: PAGES 4–13 (Facing Double-Page Spreads)
  // ====================================================================
  renaissanceConfigs.forEach((cfg, lIdx) => {
    const leftPageNum = 4 + lIdx * 2;
    const rightPageNum = leftPageNum + 1;

    // ----------------------------------------------------
    // LEFT PAGE (Verso, Even Page Number: 4, 6, 8, 10, 12)
    // ----------------------------------------------------
    html += `
    <div class="page page-container" id="page-${leftPageNum}" style="padding: 4mm 6mm;">
      <div class="page-body-full">
        <div>
          <!-- Lesson Header -->
          <div style="border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 6px; display: flex; justify-content: space-between; align-items: flex-end;">
            <div>
              <div style="font-family: 'Inter', sans-serif; font-size: 7.8pt; text-transform: uppercase; letter-spacing: 0.8px; font-weight: 800; color: #000000;">
                Lesson ${cfg.lessonNum} &bull; Core Knowledge &amp; Comparative Analysis
              </div>
              <h2 style="margin: 2px 0 0 0; font-family: 'Playfair Display', serif; font-size: 12.5pt; color: #000000; line-height: 1.22; font-weight: 800;">
                ${cfg.title}
              </h2>
            </div>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-transform: uppercase; border: 1.2px solid #000000; padding: 2px 6px; border-radius: 3px;">
              Key Topic 2.${cfg.lessonNum}
            </span>
          </div>

          <!-- Task 1: Do Now Recall (4 Questions from Prior Knowledge) -->
          <div class="task-section" style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 7px; background: #ffffff; margin-bottom: 5px;">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000000; padding-bottom: 2px; margin-bottom: 4px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 7.6pt; text-transform: uppercase; letter-spacing: 0.5px;">
                Task 1: Prior Knowledge Retrieval (Do Now)
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 700;">Recall Target: 4/4</span>
            </div>
            <div style="display: flex; flex-direction: column; gap: 2.5px;">
              ${cfg.doNow
                .map(
                  (dn, qIdx) => `
                <div style="display: grid; grid-template-columns: auto 1fr; gap: 6px; align-items: baseline; font-family: 'Inter', sans-serif; font-size: 7.3pt;">
                  <span style="font-weight: 800;">${qIdx + 1}.</span>
                  <div>
                    <span>${dn.q}</span>
                    <div class="task-line-dotted" style="height: 4.8mm; margin-top: 1px;"></div>
                  </div>
                </div>
              `,
                )
                .join('')}
            </div>
          </div>

          <!-- Task 2: Core Knowledge Anchor (3 Key Facts) -->
          <div class="task-section" style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 7px; background: #ffffff; margin-bottom: 5px;">
            <div style="border-bottom: 1px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 7.6pt; text-transform: uppercase; letter-spacing: 0.5px;">
                Task 2: Core Knowledge Anchor &bull; High-Yield GCSE Concepts
              </strong>
            </div>
            <div style="display: flex; flex-direction: column; gap: 3px;">
              ${cfg.coreKnowledge
                .map(
                  (ck) => `
                <div style="font-size: 7.8pt; line-height: 1.28;">
                  <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt;">${ck.heading}</strong>
                  <span style="font-family: 'Georgia', serif;">${ck.text}</span>
                </div>
              `,
                )
                .join('')}
            </div>
          </div>

          <!-- Task 3: Dual-Term Distinction Task -->
          <div class="task-section" style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 7px; background: #ffffff; margin-bottom: 5px;">
            <div style="border-bottom: 1px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 7.6pt; text-transform: uppercase; letter-spacing: 0.5px;">
                Task 3: Dual-Term Analytical Distinction
              </strong>
            </div>
            <div style="font-family: 'Georgia', serif; font-size: 7.8pt; margin-bottom: 2px;">
              ${cfg.vocabTask.prompt}
            </div>
            <div class="task-line" style="height: 6.8mm;"></div>
            <div class="task-line" style="height: 6.8mm;"></div>
          </div>

          <!-- Task 4: GCSE Section B Comparative Analysis (4-mark Exam Practice) -->
          <div class="task-section" style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 7px; background: #ffffff; margin-bottom: 5px;">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 7.6pt; text-transform: uppercase; letter-spacing: 0.5px;">
                Task 4: GCSE Section B Comparative Analysis &bull; Q3 Practice [4 marks]
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 700; border: 1px solid #000000; padding: 0 4px; border-radius: 2px;">
                ${cfg.fourMarkComparison.type}
              </span>
            </div>
            <div style="font-family: 'Georgia', serif; font-size: 8pt; font-weight: 700; margin-bottom: 2px; line-height: 1.25;">
              ${cfg.fourMarkComparison.question}
            </div>
            <div style="font-family: 'Inter', sans-serif; font-size: 7pt; font-style: italic; color: #333333; margin-bottom: 3px;">
              <strong>Exam Hint:</strong> ${cfg.fourMarkComparison.hint}
            </div>
            <div class="task-line" style="height: 6.8mm;"></div>
            <div class="task-line" style="height: 6.8mm;"></div>
            <div class="task-line" style="height: 6.8mm;"></div>
          </div>

          <!-- Task 5: Living Timeline Mission Link -->
          <div style="border: 1.2px dashed #000000; border-radius: 4px; padding: 4px 7px; background: #ffffff; display: flex; justify-content: space-between; align-items: center;">
            <div style="font-family: 'Inter', sans-serif; font-size: 7.4pt; line-height: 1.25; flex: 1;">
              <strong>🎨 Living Timeline Mission:</strong> ${cfg.timelineMission}
            </div>
            <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 800; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px; margin-left: 8px; white-space: nowrap;">
              Turn to Pages 2–3
            </span>
          </div>
        </div>

        ${renderFooterStrip(leftPageNum, cfg.leftPageQuip)}
      </div>
    </div>
    `;

    // ----------------------------------------------------
    // RIGHT PAGE (Recto, Odd Page Number: 5, 7, 9, 11, 13)
    // ----------------------------------------------------
    html += `
    <div class="page page-container" id="page-${rightPageNum}" style="padding: 4mm 6mm;">
      <div class="page-body-full">
        <div>
          <!-- Enquiry Question & Tariff Header -->
          <div style="border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 5px; display: flex; justify-content: space-between; align-items: flex-end;">
            <div>
              <div style="font-family: 'Inter', sans-serif; font-size: 7.8pt; text-transform: uppercase; letter-spacing: 0.8px; font-weight: 800; color: #000000;">
                GCSE Exam Mastery &bull; Extended Writing
              </div>
              <h3 style="font-family: 'Playfair Display', serif; font-size: 11.5pt; color: #000000; margin: 2px 0 0 0; line-height: 1.25; font-weight: 800;">
                ${cfg.enquiryQuestion}
              </h3>
            </div>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; border: 1.2px solid #000000; padding: 2px 6px; border-radius: 3px; white-space: nowrap;">
              ${cfg.tariff}
            </span>
          </div>

          <!-- Exam Question Prompt & Stimulus Box -->
          <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 7px; background: #ffffff; margin-bottom: 5px;">
            <div style="font-family: 'Georgia', serif; font-size: 8.2pt; font-weight: 700; color: #000000; line-height: 1.28; margin-bottom: 2px;">
              ${cfg.examStem}
            </div>
            <div style="font-family: 'Inter', sans-serif; font-size: 7pt; color: #222222; border-top: 1px solid #000000; padding-top: 2px;">
              <strong>Edexcel Stimulus Prompts:</strong> You may use the following in your answer: &bull; <em>${cfg.stimulus[0]}</em> &bull; <em>${cfg.stimulus[1]}</em>. <span style="font-weight: 700;">You must also use information of your own.</span>
            </div>
          </div>

          <!-- 3-Column Enquiry Planning Matrix / Structure Strip -->
          <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 3px 5px; background: #ffffff; margin-bottom: 4px;">
            <div style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 2px; display: flex; justify-content: space-between;">
              <span>Enquiry Planning Matrix &bull; Map your 3 paragraphs before writing</span>
              <span style="font-weight: 600;">Draft notes &darr;</span>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 4px;">
              ${cfg.structureStrip
                .map(
                  (s) => `
                <div style="border: 1px solid #000000; border-radius: 3px; padding: 2.5px 4px; background: #ffffff;">
                  <strong style="font-family: 'Inter', sans-serif; font-size: 7pt; display: block; border-bottom: 1px solid #000000; padding-bottom: 1px; margin-bottom: 1.5px;">${s.col}</strong>
                  <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; line-height: 1.2; display: block; margin-bottom: 1.5px;">${s.text}</span>
                  <div class="task-line-dotted" style="height: 4.2mm;"></div>
                  <div class="task-line-dotted" style="height: 4.2mm;"></div>
                </div>
              `,
                )
                .join('')}
            </div>
          </div>

          <!-- Word Bank & Causal Connective Strip -->
          <div style="border: 1px solid #000000; background: #ffffff; border-radius: 4px; padding: 2.5px 5px; margin-bottom: 4px; font-family: 'Inter', sans-serif; font-size: 6.6pt; line-height: 1.25;">
            <div style="display: grid; grid-template-columns: auto 1fr; gap: 5px; align-items: baseline;">
              <strong style="text-transform: uppercase; letter-spacing: 0.5px;">Key Vocabulary:</strong>
              <span>${cfg.wordBank.technical} &bull; ${cfg.wordBank.institutional || cfg.wordBank.treatments || cfg.wordBank.corrections || cfg.wordBank.experiments || cfg.wordBank.quarantine}</span>
            </div>
            <div style="display: grid; grid-template-columns: auto 1fr; gap: 5px; align-items: baseline; border-top: 1px dashed #000000; margin-top: 1px; padding-top: 1px;">
              <strong style="text-transform: uppercase; letter-spacing: 0.5px;">Causal Stems:</strong>
              <span style="font-style: italic;">${cfg.connectives}</span>
            </div>
          </div>

          <!-- PEEL Writing Framework Strip -->
          <div style="border: 1px solid #000000; border-radius: 3px; padding: 2px 6px; margin-bottom: 4px; display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6.8pt; background: #ffffff;">
            <span><strong>[P] Point:</strong> Direct factor sentence.</span>
            <span><strong>[E] Evidence:</strong> Specific dates, figures &amp; names.</span>
            <span><strong>[E] Explanation:</strong> Causal mechanism (how &amp; why).</span>
            <span><strong>[L] Link:</strong> Evaluate overall historical criteria.</span>
          </div>

          <!-- Explicit Writing Directive Callout -->
          <div style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 800; color: #000000; text-transform: uppercase; letter-spacing: 0.3px; margin-bottom: 2px;">
            Task: Using the structure strip above, write 1–2 detailed analytical paragraphs below (continue in your exercise book for full timed paper):
          </div>

          <!-- Ruled Writing Lines (18 Lines, 7.4mm Height) -->
          <div class="auto-fill-writing-lines" data-line-height="7.4" style="width: 100%; margin-bottom: 3px;">
            ${Array(18).fill('<div class="task-line" style="height: 7.4mm;"></div>').join('')}
          </div>
        </div>

        <!-- Teacher Assessment Bar & Footer -->
        <div>
          <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 3px 6px; background: #ffffff; display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 7.4pt; margin-bottom: 2px;">
            <div>
              <strong>Teacher Assessment:</strong> &nbsp;
              Effort: [ 1 &bull; 2 &bull; 3 &bull; 4 &bull; 5 ] &nbsp;|&nbsp; 
              Subject Knowledge: [ 1 &bull; 2 &bull; 3 &bull; 4 ] &nbsp;|&nbsp; 
              Analysis: [ 1 &bull; 2 &bull; 3 &bull; 4 ]
            </div>
            <div>
              <strong>PEEL Mastery:</strong> &nbsp;&nbsp; P &nbsp;&nbsp;&nbsp;&nbsp; E &nbsp;&nbsp;&nbsp;&nbsp; E &nbsp;&nbsp;&nbsp;&nbsp; L
            </div>
          </div>

          ${renderFooterStrip(rightPageNum, cfg.rightPageQuip)}
        </div>
      </div>
    </div>
    `;
  });

  // ====================================================================
  // PAGE 14: OUTSIDE BACK COVER (Progress Ledger, Feedback & 5 QR Codes)
  // ====================================================================
  html += `
  <div class="page page-container" id="page-14" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div>
        <!-- Top Title & Target Grade Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #000000; padding-bottom: 4px; margin-bottom: 6px;">
          <div>
            <div style="font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 800; text-transform: uppercase; letter-spacing: 1px;">
              Pearson Edexcel GCSE (9–1) History &bull; Paper 1 (1HI0/11)
            </div>
            <h2 style="font-family: 'Playfair Display', serif; font-size: 13.5pt; color: #000000; margin: 1px 0 0 0; text-transform: uppercase; font-weight: 900;">
              Key Topic 2 &bull; The Medical Renaissance Progress Ledger
            </h2>
          </div>
          <!-- Target Grade & Booklet Grade Badges -->
          <div style="display: flex; gap: 6px; align-items: center;">
            <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 2px 7px; background: #ffffff; text-align: center; min-width: 60px;">
              <div style="font-family: 'Inter', sans-serif; font-size: 6pt; font-weight: 800; text-transform: uppercase;">Target Grade</div>
              <div style="font-family: 'Playfair Display', serif; font-size: 11pt; font-weight: 800; line-height: 1.1;">&nbsp;</div>
            </div>
            <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 2px 7px; background: #ffffff; text-align: center; min-width: 60px;">
              <div style="font-family: 'Inter', sans-serif; font-size: 6pt; font-weight: 800; text-transform: uppercase;">Booklet Grade</div>
              <div style="font-family: 'Playfair Display', serif; font-size: 11pt; font-weight: 800; line-height: 1.1;">&nbsp;</div>
            </div>
          </div>
        </div>

        <!-- Pupil Details Strip -->
        <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 7.6pt; background: #ffffff; border: 1.2px solid #000000; border-radius: 3px; padding: 3px 8px; margin-bottom: 6px;">
          <span><strong>Pupil Name:</strong> ___________________________________</span>
          <span><strong>Class / Set:</strong> ____________</span>
          <span><strong>Teacher:</strong> _________________</span>
        </div>

        <!-- 96-Mark GCSE Exam Progress Ledger -->
        <div style="margin-bottom: 6px;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; text-transform: uppercase; letter-spacing: 0.5px;">
              &bull; 96-Mark GCSE Exam Progress Ledger
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-style: italic;">
              Complete Section B Exam Alignment
            </span>
          </div>
          <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif; font-size: 7.2pt; border: 1.2px solid #000000;">
            <thead>
              <tr style="background: #ffffff; border-bottom: 1.5px solid #000000; text-align: left;">
                <th style="padding: 4px 6px; border-right: 1px solid #000000; width: 24%;">Lesson &bull; Specification Focus</th>
                <th style="padding: 4px 6px; border-right: 1px solid #000000; width: 24%; text-align: center;">Q3 Practice [4m]</th>
                <th style="padding: 4px 6px; border-right: 1px solid #000000; width: 34%;">Extended Exam Response</th>
                <th style="padding: 4px 6px; width: 18%; text-align: center;">Lesson Total</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid #000000;">
                <td style="padding: 3.5px 6px; border-right: 1px solid #000000;"><strong>KT2.1:</strong> Printing &amp; Royal Society</td>
                <td style="padding: 3.5px 6px; border-right: 1px solid #000000; text-align: center;">Q3 Similarity: [ &nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 4</strong> ]</td>
                <td style="padding: 3.5px 6px; border-right: 1px solid #000000;">Q4 Explain Why [12m]: [ &nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 12</strong> ]</td>
                <td style="padding: 3.5px 6px; text-align: center; font-weight: 700;">[ &nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 16</strong> ]</td>
              </tr>
              <tr style="border-bottom: 1px solid #000000;">
                <td style="padding: 3.5px 6px; border-right: 1px solid #000000;"><strong>KT2.2:</strong> Thomas Sydenham</td>
                <td style="padding: 3.5px 6px; border-right: 1px solid #000000; text-align: center;">Q3 Difference: [ &nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 4</strong> ]</td>
                <td style="padding: 3.5px 6px; border-right: 1px solid #000000;">Q4 Explain Why [12m]: [ &nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 12</strong> ]</td>
                <td style="padding: 3.5px 6px; text-align: center; font-weight: 700;">[ &nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 16</strong> ]</td>
              </tr>
              <tr style="border-bottom: 1px solid #000000;">
                <td style="padding: 3.5px 6px; border-right: 1px solid #000000;"><strong>KT2.3:</strong> Andreas Vesalius</td>
                <td style="padding: 3.5px 6px; border-right: 1px solid #000000; text-align: center;">Q3 Difference: [ &nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 4</strong> ]</td>
                <td style="padding: 3.5px 6px; border-right: 1px solid #000000;">Q5/6 Essay [16+4 SPaG]: [ &nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 20</strong> ]</td>
                <td style="padding: 3.5px 6px; text-align: center; font-weight: 700;">[ &nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 24</strong> ]</td>
              </tr>
              <tr style="border-bottom: 1px solid #000000;">
                <td style="padding: 3.5px 6px; border-right: 1px solid #000000;"><strong>KT2.4:</strong> William Harvey</td>
                <td style="padding: 3.5px 6px; border-right: 1px solid #000000; text-align: center;">Q3 Difference: [ &nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 4</strong> ]</td>
                <td style="padding: 3.5px 6px; border-right: 1px solid #000000;">Q4 Explain Why [12m]: [ &nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 12</strong> ]</td>
                <td style="padding: 3.5px 6px; text-align: center; font-weight: 700;">[ &nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 16</strong> ]</td>
              </tr>
              <tr style="border-bottom: 1px solid #000000;">
                <td style="padding: 3.5px 6px; border-right: 1px solid #000000;"><strong>KT2.5:</strong> Great Plague 1665</td>
                <td style="padding: 3.5px 6px; border-right: 1px solid #000000; text-align: center;">Q3 Difference: [ &nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 4</strong> ]</td>
                <td style="padding: 3.5px 6px; border-right: 1px solid #000000;">Q5/6 Essay [16+4 SPaG]: [ &nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 20</strong> ]</td>
                <td style="padding: 3.5px 6px; text-align: center; font-weight: 700;">[ &nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 24</strong> ]</td>
              </tr>
              <tr style="background: #ffffff; font-weight: 900; border-top: 1.5px solid #000000;">
                <td style="padding: 4px 6px; border-right: 1px solid #000000; text-transform: uppercase;">Cumulative Assessment Totals</td>
                <td style="padding: 4px 6px; border-right: 1px solid #000000; text-align: center;">Q3 Total: [ &nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 20</strong> ]</td>
                <td style="padding: 4px 6px; border-right: 1px solid #000000;">Extended Total: [ &nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 76</strong> ]</td>
                <td style="padding: 4px 6px; text-align: center; font-size: 8pt;">[ &nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 96</strong> ]</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Teacher Feedback Section (WWW & EBI 4 lines each) -->
        <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 5px 8px; background: #ffffff; margin-bottom: 6px;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; text-transform: uppercase;">
              Teacher Formative Assessment &bull; Feedback
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 700;">
              Effort: [ 1 &bull; 2 &bull; 3 &bull; 4 &bull; 5 ]
            </span>
          </div>

          <div style="margin-bottom: 3px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.5pt; text-transform: uppercase; display: block; margin-bottom: 1px;">
              What Went Well (WWW):
            </strong>
            <div class="task-line" style="height: 6.8mm;"></div>
            <div class="task-line" style="height: 6.8mm;"></div>
            <div class="task-line" style="height: 6.8mm;"></div>
            <div class="task-line" style="height: 6.8mm;"></div>
          </div>

          <div style="margin-bottom: 3px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.5pt; text-transform: uppercase; display: block; margin-bottom: 1px;">
              Even Better If (EBI):
            </strong>
            <div class="task-line" style="height: 6.8mm;"></div>
            <div class="task-line" style="height: 6.8mm;"></div>
            <div class="task-line" style="height: 6.8mm;"></div>
            <div class="task-line" style="height: 6.8mm;"></div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #000000; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 7.2pt;">
            <span><strong>Teacher Signature:</strong> ____________________________</span>
            <span><strong>Date:</strong> ____________________</span>
          </div>
        </div>

        <!-- Interactive Quizzing QR Codes for Lessons 2.1–2.5 -->
        <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 4px 6px; background: #ffffff;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000000; padding-bottom: 2px; margin-bottom: 4px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; text-transform: uppercase;">
              📱 Interactive Digital Quizzing Hub &bull; Scan for Instant Retrieval Practice
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; border: 1px solid #000000; padding: 0 4px; border-radius: 2px;">
              ONLINE RECALL
            </span>
          </div>
          <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 5px; text-align: center;">
            ${renaissanceConfigs
              .map((cfg) => {
                const quizUrl = `https://the-history-revision-hub.netlify.app/?unit=edexcel_medicine&lesson=${cfg.lessonIndex}&quiz=true`;
                const qrSvg = generateQrSvg(quizUrl);
                const shortLabels = [
                  'Printing & Royal Soc',
                  'Thomas Sydenham',
                  'Andreas Vesalius',
                  'William Harvey',
                  'Great Plague 1665',
                ];
                const label = shortLabels[cfg.lessonNum - 1];
                return `
            <div style="border: 1px solid #000000; border-radius: 3px; padding: 3px 2px; background: #ffffff; display: flex; flex-direction: column; align-items: center; justify-content: space-between;">
              <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 900; text-transform: uppercase; margin-bottom: 1px;">
                KT2.${cfg.lessonNum}
              </div>
              <div style="font-family: 'Inter', sans-serif; font-size: 6pt; font-weight: 600; color: #333333; margin-bottom: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%;">
                ${label}
              </div>
              <div style="width: 23mm; height: 23mm; margin: 0 auto 2px auto;">
                ${qrSvg}
              </div>
              <span style="font-family: 'Inter', sans-serif; font-size: 5.6pt; font-weight: 700; text-transform: uppercase; background: #000000; color: #ffffff; padding: 1px 4px; border-radius: 2px; margin-bottom: 2px;">
                Scan to Quiz
              </span>
              <div style="font-family: 'Inter', sans-serif; font-size: 6.2pt; font-weight: 700; color: #000000;">
                Best Score: [ &nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 8</strong> ]
              </div>
            </div>
            `;
              })
              .join('')}
          </div>
        </div>
      </div>

      ${renderFooterStrip(14, 'Knowledge is power, but retrieval practice is what turns knowledge into grade 9s. Scan the codes, beat your best score, and record it above.')}
    </div>
  </div>
</body>
</html>
`;

  return html;
}

module.exports = {
  buildRenaissanceTwoPageWorkbook,
  buildMedicineTwoPageWorkbook: buildRenaissanceTwoPageWorkbook,
};
