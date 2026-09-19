const fs = require('fs');
const path = require('path');

function formatText(txt) {
  if (!txt) return '';
  return txt;
}

// 5 Dedicated Renaissance Lessons Configurations with Living Timeline Missions and Spec Anchors
const renaissanceConfigs = [
  {
    lessonIndex: 3, // mapped to index 3 in units/edexcel_medicine/data.js (lesson_2_1)
    lessonNum: 1,
    id: 'lesson_2_1',
    title:
      'KT2.1: The New Spirit of Enquiry: Humanism, The Printing Press & The Royal Society (c1500–c1700)',
    enquiryQuestion:
      'How did the invention of printing and the scientific method challenge 1,500 years of medical orthodoxy?',
    specAnchor:
      'Ideas about the cause of disease and illness: the influence of the printing press and the work of the Royal Society on the communication of ideas.',
    tariff: '[12 marks &bull; 15 mins]',
    examStem:
      'Explain why there were changes in the way ideas about the causes of disease and illness were communicated in the period c1500–c1700. [12 marks]',
    stimulus: ['The printing press', 'The Royal Society'],
    structureStrip: [
      {
        col: '1. BREAKING CLERICAL MONOPOLY',
        text: 'Explain how Gutenberg’s movable-type press (c1440/Caxton 1476) took book production from Church scribes, ending censorship and hand-copying errors.',
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
        'Gutenberg press &bull; movable type &bull; vernacular &bull; woodcut illustrations &bull; clerical monopoly',
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
      {
        q: 'What term describes the foul, poisonous air widely believed to cause pestilence?',
        a: 'Miasma',
      },
    ],
    sources: [
      {
        id: 'Source A',
        title: 'Gutenberg Screw Press (c1440)',
        src: '../../images/printing_press.jpg',
        desc: 'Movable metal type press that mass-produced identical texts and complex anatomical woodcuts without copying errors.',
      },
      {
        id: 'Source B',
        title: 'Philosophical Transactions (1665)',
        src: '../../images/philosophical_transactions_vol1.jpg',
        desc: "Frontispiece of Vol. 1 of Europe's first peer-reviewed scientific journal, established by Henry Oldenburg.",
      },
      {
        id: 'Source C',
        title: "Hooke's Micrographia Flea (1665)",
        src: '../../images/hooke_micrographia_flea.jpg',
        desc: 'Giant fold-out copperplate engraving from Micrographia, stunning the public with the invisible world of microscopic parasites.',
      },
    ],
    vocabTask: {
      type: 'distinction',
      termA: 'Monastic Scriptoria',
      termB: 'Movable Metal Type',
      prompt:
        'Distinguish between hand-copied <strong>monastic scriptoria</strong> (Church monopoly) and Gutenberg’s <strong>movable metal type</strong> (mass communication):',
    },
    livingTimelineMission: {
      milestone: 'Milestones 1 & 5 (1440 & 1662)',
      instruction:
        "Turn back to <strong>Pages 2–3 (Milestones 1 & 5)</strong>. In the sketchpad frame, sketch Gutenberg’s screw press producing identical anatomical plates and annotate the Royal Society's motto: <em>'Nullius in Verba'</em> (Take nobody's word for it)!",
    },
  },
  {
    lessonIndex: 4, // lesson_2_2
    lessonNum: 2,
    id: 'lesson_2_2',
    title: 'KT2.2: Thomas Sydenham & The Art of Bedside Observation (1676)',
    enquiryQuestion:
      "How did Thomas Sydenham's focus on direct observation challenge traditional medical practice?",
    specAnchor:
      'Continuity and change in care and treatment: Thomas Sydenham and the observation of symptoms.',
    tariff: '[12 marks &bull; 15 mins]',
    examStem:
      'Explain why Thomas Sydenham was significant in the development of medicine in Britain. [12 marks]',
    stimulus: ['Observationes Medicae (1676)', 'Classifying diseases'],
    structureStrip: [
      {
        col: '1. BEDSIDE EMPIRICISM',
        text: 'Explain how Sydenham insisted on closely monitoring symptoms at the patient’s bedside, rejecting Galenic book-learning and complex astrological charts.',
      },
      {
        col: '2. CLASSIFYING DISEASES',
        text: 'Explain how Sydenham pioneered classifying diseases into distinct species (like a botanist), successfully distinguishing scarlet fever from measles.',
      },
      {
        col: '3. LIMITS OF DIAGNOSIS',
        text: 'Evaluate his limitations: despite revolutionary observation and prescribing fresh air and cinchona bark, he still could not see germs and believed in miasma.',
      },
    ],
    connectives:
      'A primary reason Sydenham was significant was... &bull; In particular, he revolutionized diagnosis by... &bull; Furthermore, his publication of... &bull; However, his impact was constrained by... &bull; Overall, he represents...',
    wordBank: {
      technical:
        'bedside observation &bull; symptom clustering &bull; Observationes Medicae (1676) &bull; botanical taxonomy &bull; measles vs scarlet fever',
      treatments:
        'cinchona bark (quinine) &bull; laudanum (pain relief) &bull; cool regimen for smallpox &bull; fresh air therapy &bull; iron for anaemia',
      continuity:
        'Four Humours denial &bull; miasma belief &bull; humoural remnants &bull; pre-bacteriology limits &bull; The English Hippocrates',
    },
    doNow: [
      {
        q: 'What was the revolutionary Latin motto of the Royal Society, founded in 1660?',
        a: "Nullius in Verba ('Take nobody's word for it')",
      },
      {
        q: 'Which German inventor pioneered the movable metal type printing press in c1440?',
        a: 'Johannes Gutenberg',
      },
      {
        q: "Name the world's first peer-reviewed scientific journal, published from 1665.",
        a: 'Philosophical Transactions',
      },
      {
        q: "Who discovered microscopic 'animalcules' (bacteria) using a single-lens microscope in 1676?",
        a: 'Antonie van Leeuwenhoek',
      },
      {
        q: 'Why did the invention of printing NOT immediately cure illnesses among ordinary Londoners?',
        a: 'Medical texts were in Latin and expensive; the public was illiterate and still bought cheap astrology books.',
      },
    ],
    sources: [
      {
        id: 'Source A',
        title: 'Portrait of Dr Thomas Sydenham by Mary Beale',
        src: '../../images/thomas_sydenham.jpg',
        desc: "Thomas Sydenham (1624–1689), 'The English Hippocrates', who insisted on bedside observation over Galen.",
      },
      {
        id: 'Source B',
        title: 'Bedside Clinical Observation',
        src: '../../images/philosophical_transactions_vol1.jpg',
        desc: 'Empirical records recording the precise progression of epidemic fevers and smallpox symptoms.',
      },
    ],
    vocabTask: {
      type: 'mapping',
      termA: 'Bedside Observation',
      termB: 'Species of Disease',
      prompt:
        "Write one historically accurate sentence connecting <strong>bedside observation</strong> to Sydenham's classification of <strong>species of disease</strong>:",
    },
    livingTimelineMission: {
      milestone: 'Milestone 8 (1676)',
      instruction:
        "Turn back to <strong>Pages 2–3 (Milestone 8: 1676)</strong>. In the sketchpad frame, sketch Sydenham taking notes at a patient's bedside and annotate: <em>'Classify diseases like plants; observe the patient, don't read Galen!'</em>",
    },
  },
  {
    lessonIndex: 5, // lesson_2_3
    lessonNum: 3,
    id: 'lesson_2_3',
    title: 'KT2.3: Andreas Vesalius & The Anatomical Revolution (1543)',
    enquiryQuestion: "How did Andreas Vesalius challenge Galen's authority on human anatomy?",
    specAnchor:
      'Approaches to prevention and treatment: Andreas Vesalius and the study of human anatomy.',
    tariff: '[12 marks &bull; 15 mins]',
    examStem:
      'Explain why Andreas Vesalius was able to make breakthroughs in anatomical knowledge in the sixteenth century. [12 marks]',
    stimulus: ['De Humani Corporis Fabrica (1543)', 'Dissections in Padua'],
    structureStrip: [
      {
        col: '1. HUMAN DISSECTION',
        text: 'Explain how Vesalius dissected executed criminals himself at Padua university, discovering Galen had dissected pigs, dogs, and apes instead of humans.',
      },
      {
        col: '2. DISPROVING GALEN (300 ERRORS)',
        text: 'Detail specific anatomical corrections: human lower jaw is one single bone (not two), breastbone has three parts (not seven), no holes in septum.',
      },
      {
        col: '3. PRINTING & SPREAD IN ENGLAND',
        text: "Explain how Fabrica's exquisite woodcut illustrations were mass-printed and copied in England by Thomas Geminus (Compendiosa, 1545).",
      },
    ],
    connectives:
      "The primary catalyst for Vesalius's success was... &bull; By conducting dissections with his own hands... &bull; Crucially, he disproved Galen by showing... &bull; Furthermore, the printing press allowed... &bull; Consequently...",
    wordBank: {
      technical:
        'human dissection &bull; Padua University &bull; De Humani Corporis Fabrica (1543) &bull; anatomical woodcuts &bull; cathedra (pulpit)',
      corrections:
        'single human mandible &bull; sternum (3 parts) &bull; cardiac septum (impermeable) &bull; renal blood vessels &bull; 300 Galenic errors',
      impact:
        'Thomas Geminus (1545) &bull; barber-surgeons manual &bull; empirical observation &bull; anatomical theater &bull; Padua medical school',
    },
    doNow: [
      {
        q: "Why was Thomas Sydenham known as the 'English Hippocrates'?",
        a: 'Because he emphasized careful bedside observation of patient symptoms rather than book theory.',
      },
      {
        q: 'Name one disease that Sydenham successfully distinguished from another illness.',
        a: 'Measles from scarlet fever.',
      },
      {
        q: 'What was the main language in which Renaissance scientific books were published?',
        a: 'Latin.',
      },
      {
        q: "State one reason why Galen's anatomical knowledge contained numerous errors.",
        a: 'Roman law forbade dissecting human corpses, so Galen dissected animals like pigs, dogs, and Barbary apes.',
      },
      {
        q: 'How many bones did Galen claim made up the human lower jaw?',
        a: 'Two bones (true for dogs and apes, but false for humans, who have one mandible).',
      },
    ],
    sources: [
      {
        id: 'Source A',
        title: 'De Humani Corporis Fabrica Frontispiece (1543)',
        src: '../../images/vesalius_fabrica_frontispiece.jpg',
        desc: 'Vesalius dissecting a human corpse in the center of the crowded Padua anatomy theater with his own hands.',
      },
      {
        id: 'Source B',
        title: 'Vesalius Muscle Men Plate',
        src: '../../images/vesalius_muscle_men.jpg',
        desc: 'Exquisite anatomical plate showing human musculature drawn in a classical Renaissance landscape.',
      },
    ],
    vocabTask: {
      type: 'distinction',
      termA: 'Medieval Cathedra Lecture',
      termB: 'Empirical Human Dissection',
      prompt:
        "Distinguish between passive <strong>cathedra lectures</strong> (professors reading Latin while barbers sliced pigs) and Vesalius's <strong>direct human dissection</strong>:",
    },
    livingTimelineMission: {
      milestone: 'Milestone 3 (1543)',
      instruction:
        "Turn back to <strong>Pages 2–3 (Milestone 3: 1543)</strong>. In the sketchpad frame, sketch the single human lower jawbone and annotate: <em>'De Fabrica — 300 Galenic Errors Corrected through Human Dissection'</em>!",
    },
  },
  {
    lessonIndex: 6, // lesson_2_4
    lessonNum: 4,
    id: 'lesson_2_4',
    title: 'KT2.4: William Harvey & The Circulation of Blood (1628)',
    enquiryQuestion:
      "Why did William Harvey's discovery of blood circulation meet fierce initial resistance?",
    specAnchor:
      'Ideas about the cause of disease and illness: William Harvey and the circulation of the blood.',
    tariff: '[12 marks &bull; 15 mins]',
    examStem:
      "Explain why William Harvey's discovery of the circulation of blood had a limited immediate impact on medical treatment in the seventeenth century. [12 marks]",
    stimulus: ['De Motu Cordis (1628)', 'The Four Humours'],
    structureStrip: [
      {
        col: '1. THE CIRCULATION DISCOVERY',
        text: 'Explain how Harvey proved the heart is a mechanical pump, disproving Galen’s claim that liver makes blood constantly from food consumed as fuel.',
      },
      {
        col: '2. MATHEMATICS & EXPERIMENT',
        text: 'Detail his mechanical proofs: calculated heart pumps 540 pints/day (too much to consume); tight-ligature arm tests showing one-way vein valves.',
      },
      {
        col: '3. WHY TREATMENTS DID NOT CHANGE',
        text: 'Explain the paradox: knowing blood circulated did not cure disease; doctors still bled patients with leeches; capillaries remained invisible without microscopes.',
      },
    ],
    connectives:
      'On the one hand, Harvey revolutionized physiology because... &bull; Using mathematical calculation, he proved... &bull; However, his discovery had limited practical effect because... &bull; In particular, physicians still practiced... &bull; Consequently...',
    wordBank: {
      technical:
        'De Motu Cordis (1628) &bull; mechanical pump &bull; circulation of blood &bull; one-way venous valves &bull; tight ligature test',
      mathematics:
        '540 pints per day &bull; arterial vs venous flow &bull; cold-blooded animal dissection &bull; disproved liver furnace &bull; systole and diastole',
      limits:
        'invisible capillaries &bull; persisting phlebotomy (bleeding) &bull; Four Humours adherence &bull; quack ridicule &bull; zero new medications',
    },
    doNow: [
      {
        q: "In what year was Andreas Vesalius's 'De Humani Corporis Fabrica' published?",
        a: '1543',
      },
      {
        q: 'Name one specific Galenic error regarding bones that Vesalius corrected.',
        a: 'The human lower jaw has one bone (not two); the breastbone has three parts (not seven).',
      },
      {
        q: "Which English publisher pirated Vesalius's plates for English barber-surgeons in 1545?",
        a: 'Thomas Geminus (Compendiosa).',
      },
      {
        q: 'What ancient theory did Galen propose about how blood was produced in the body?',
        a: 'Galen claimed blood was constantly produced by the liver from food and consumed by tissues like fuel.',
      },
      {
        q: 'What role did Galen believe the heart played in the vascular system?',
        a: 'A furnace that warmed blood and allowed spirits to cross through invisible pores in the septum.',
      },
    ],
    sources: [
      {
        id: 'Source A',
        title: "Harvey's Forearm Ligature Experiment (1628)",
        src: '../../images/harvey_veins.jpg',
        desc: 'Original plate from De Motu Cordis demonstrating how pressing blood in veins proves internal one-way valves.',
      },
      {
        id: 'Source B',
        title: 'Vesalius Fabrica Dissection Plate',
        src: '../../images/vesalius_fabrica_frontispiece.jpg',
        desc: 'Padua university training where Harvey studied before serving as physician to James I and Charles I.',
      },
    ],
    vocabTask: {
      type: 'cloze',
      prompt:
        'Complete the summary below using the terms <em>Circulation</em>, <em>Mechanical Pump</em>, and <em>Phlebotomy</em>:',
      clozeText:
        'William Harvey proved that the heart acted as a [ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ], maintaining the continuous [ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ] of blood. Despite this breakthrough, physicians continued the harmful practice of [ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ].',
      followUp:
        'Explain why physicians refused to abandon bleeding even after Harvey disproved Galen:',
    },
    livingTimelineMission: {
      milestone: 'Milestone 4 (1628)',
      instruction:
        'Turn back to <strong>Pages 2–3 (Milestone 4: 1628)</strong>. In the sketchpad frame, sketch Harvey’s forearm tight-ligature experiment showing swollen vein valves that proved blood flows toward the heart only!',
    },
  },
  {
    lessonIndex: 7, // lesson_2_5
    lessonNum: 5,
    id: 'lesson_2_5',
    title: 'KT2.5: Continuity, Quackery & The Great Plague of 1665',
    enquiryQuestion:
      'Was the response to the Great Plague of 1665 modern public health or medieval superstition?',
    specAnchor:
      'A case study of the treatment and prevention of illness during the Great Plague of 1665: approaches to treatment and attempts to prevent its spread.',
    tariff: '[16+4 marks &bull; 25 mins]',
    examStem:
      '“The responses of ordinary people and local government to the Great Plague of 1665 showed that medical understanding had completely transformed since the Black Death of 1348.” How far do you agree? Explain your answer. [16 marks + 4 marks for SPaG]',
    stimulus: ['Mayoral Quarantine Orders', 'Plague amulets and smoking'],
    structureStrip: [
      {
        col: '1. LOCAL GOVERNMENT CHANGE',
        text: "Explain new mayoral measures: 28-day quarantine of infected houses, red cross on doors with 'Lord have mercy', parish watchmen, banned gatherings.",
      },
      {
        col: '2. POPULAR CONTINUITY & BELIEFS',
        text: 'Explain what stayed the same: Four Humours bleeding, miasma posies/smoking tobacco, astrology, God’s wrath, slaughtering 40,000 dogs and 200,000 cats.',
      },
      {
        col: '3. OVERALL EVALUATIVE JUDGMENT',
        text: 'Weigh the balance: Did administrative quarantine represent genuine scientific progress, or did total ignorance of Yersinia pestis bacteria mean responses remained medieval?',
      },
    ],
    connectives:
      "In support of the statement, municipal authorities introduced... &bull; In particular, the Mayor's 1665 Plague Orders enforced... &bull; On the other hand, popular understanding showed profound continuity because... &bull; Crucially, people still believed... &bull; Overall, I judge that...",
    wordBank: {
      government:
        "Mayor's Plague Orders &bull; 28-day quarantine &bull; parish watchmen &bull; Bills of Mortality &bull; red cross on door",
      continuity:
        'miasma pomanders &bull; forced tobacco smoking &bull; astrological alignment &bull; divine retribution &bull; slaughter of dogs and cats',
      treatments:
        'plague water / theriac &bull; hot onions on buboes &bull; bleeding with leeches &bull; quack remedies &bull; mass burial pits (100,000 dead)',
    },
    doNow: [
      {
        q: 'In what year did the Great Plague strike London, killing roughly 100,000 people?',
        a: '1665',
      },
      {
        q: 'How did William Harvey calculate that blood must circulate continuously?',
        a: 'The heart pumped 540 pints a day—far more blood than food eaten could possibly replace.',
      },
      {
        q: "Why did Harvey's discovery NOT immediately cure disease?",
        a: 'Doctors still did not know what caused disease (bacteria was unknown); they continued bloodletting.',
      },
      {
        q: 'What symbol was painted on the doors of infected houses during the 1665 Plague?',
        a: "A red cross, accompanied by the words 'Lord have mercy upon us'.",
      },
      {
        q: 'What animal was wrongly blamed and slaughtered in tens of thousands during the 1665 Plague?',
        a: 'Dogs and cats (which allowed the true carriers—black rats and fleas—to multiply).',
      },
    ],
    sources: [
      {
        id: 'Source A',
        title: 'Doctor Schnabel von Rom (Plague Doctor 1665)',
        src: '../../images/plague_doctor_1665.png',
        desc: 'Protective waxed leather robe and bird beak mask stuffed with sweet herbs against poisonous miasma.',
      },
      {
        id: 'Source B',
        title: 'Plague Pit Burial at Holywell Mount (1665)',
        src: '../../images/plague_burial.jpg',
        desc: 'Dead-carts collecting bodies at night for mass lime-pit burials across London parishes.',
      },
    ],
    vocabTask: {
      type: 'distinction',
      termA: 'Parish Quarantine Orders',
      termB: 'Miasma Pomanders',
      prompt:
        'Distinguish between civic public health measures (quarantine and watchmen) and superstitious individual protections (pomanders and smoking):',
    },
    livingTimelineMission: {
      milestone: 'Milestone 7 (1665)',
      instruction:
        "Turn back to <strong>Pages 2–3 (Milestone 7: 1665)</strong>. In the sketchpad frame, sketch the red cross on a quarantined front door with <em>'Lord have mercy upon us'</em> and annotate the 28-day watchmen rule!",
    },
  },
];

function buildMedicineTwoPageWorkbook(unitData, period) {
  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Edexcel GCSE (9–1) Medicine &bull; Renaissance Pupil Mastery Workbook</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600&family=Cinzel:wght@700;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <style>
    *, *:before, *:after { box-sizing: border-box; }
    @page {
      size: A4 portrait;
      margin: 10mm 12mm 12mm 12mm;
    }
    body {
      font-family: 'Georgia', 'Garamond', serif;
      font-size: 10pt;
      line-height: 1.35;
      color: #1e293b;
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
    }
    .page:last-child, .page-container:last-child {
      page-break-after: auto;
    }
    .task-line {
      border-bottom: 1.2px solid #475569;
      height: 7.6mm;
      width: 100%;
      box-sizing: border-box;
    }
    .task-line-dotted {
      border-bottom: 1.2px solid #475569;
      height: 5.6mm;
      width: 100%;
      box-sizing: border-box;
    }
    .archival-badge {
      font-family: 'Inter', sans-serif;
      font-size: 7.8pt;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      padding: 2.5px 7px;
      border-radius: 3px;
      background: #f1f5f9;
      color: #475569;
      border: 1px solid #cbd5e1;
      font-weight: 600;
    }
    .spec-anchor-bar {
      background: #f8fafc;
      border: 1.2px solid #cbd5e1;
      border-left: 4px solid #1e3a8a;
      border-radius: 4px;
      padding: 4px 8px;
      margin-bottom: 6px;
      display: flex;
      align-items: center;
      gap: 8px;
      font-family: 'Inter', sans-serif;
    }
    .spec-anchor-badge {
      background: #1e3a8a;
      color: #ffffff;
      font-size: 6.8pt;
      font-weight: 800;
      padding: 2px 6px;
      border-radius: 3px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      white-space: nowrap;
    }
    .spec-anchor-text {
      font-size: 7.5pt;
      color: #1e293b;
      line-height: 1.25;
    }
    .living-mission-box {
      border: 1.2px dashed #0284c7;
      background: #f0f9ff;
      border-radius: 4px;
      padding: 4px 7px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 6px;
    }
    .living-mission-tag {
      font-family: 'Inter', sans-serif;
      font-size: 7pt;
      font-weight: 800;
      background: #0284c7;
      color: #ffffff;
      padding: 1.5px 6px;
      border-radius: 2px;
      text-transform: uppercase;
      white-space: nowrap;
    }
    .living-mission-text {
      font-family: 'Inter', sans-serif;
      font-size: 7.3pt;
      color: #0369a1;
      line-height: 1.25;
      flex: 1;
    }
    .living-mission-link {
      font-family: 'Inter', sans-serif;
      font-size: 7pt;
      font-weight: 700;
      color: #0284c7;
      white-space: nowrap;
    }
  </style>
</head>
<body>
`;

  // ====================================================================
  // PAGE 1: FRONT COVER (Recto, Right Page)
  // ====================================================================
  html += `
  <div class="page page-container" id="page-1" style="padding: 16px 18px; border: 1px solid #cbd5e1; outline: 3.5px double #0f172a; outline-offset: -8px; justify-content: flex-start;">
    <!-- Institutional Header & Pupil Registration Strip -->
    <div style="margin-bottom: 10px;">
      <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px;">
        <span class="school-brand-target" data-department-name="The History Department" style="font-family: 'Inter', sans-serif; font-size: 8.5pt; text-transform: uppercase; letter-spacing: 2px; color: #1e3a8a; font-weight: 700;">
          The History Department
        </span>
        <span style="font-family: 'Inter', sans-serif; font-size: 8pt; text-transform: uppercase; letter-spacing: 1.5px; color: #64748b; font-weight: 600;">
          GCSE History &bull; Paper 1
        </span>
      </div>

      <!-- Pupil Name & Class Box at Top -->
      <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 6px 12px; background: #f8fafc; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 14px; align-items: center;">
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; white-space: nowrap; margin-right: 8px;">Pupil Name:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #334155; height: 14px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; white-space: nowrap; margin-right: 8px;">Class:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #334155; height: 14px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; white-space: nowrap; margin-right: 8px;">Target:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #334155; height: 14px;"></div>
        </div>
      </div>
    </div>

    <!-- Main Title Block -->
    <div style="text-align: center; border-bottom: 1px solid #cbd5e1; padding: 2px 0 8px 0; margin-bottom: 8px;">
      <div style="font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 2px;">
        Pearson Edexcel GCSE (9–1) History &bull; Paper 1 (1HI0/11)
      </div>
      <h1 style="font-family: 'Playfair Display', serif; font-size: 22pt; color: #0f172a; margin: 0 0 3px 0; text-transform: uppercase; letter-spacing: 1.2px; line-height: 1.15;">
        The Medical Renaissance in Britain
      </h1>
      <div style="font-family: 'Inter', sans-serif; font-size: 9.2pt; color: #334155; font-weight: 500; letter-spacing: 0.5px;">
        Key Topic 2: Ideas, Anatomy, Circulation &amp; Public Health (c1500–c1700)
      </div>
    </div>

    <!-- Overarching Enquiry Callout Box -->
    <div style="border: 1.5px solid #1e3a8a; border-radius: 5px; padding: 8px 16px; background: #f8fafc; margin-bottom: 8px; text-align: center;">
      <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; text-transform: uppercase; letter-spacing: 1.8px; color: #1e3a8a; font-weight: 700; margin-bottom: 2px;">
        Overarching Historical Enquiry
      </div>
      <div style="font-family: 'Playfair Display', serif; font-size: 13pt; color: #0f172a; font-style: italic; font-weight: 600; line-height: 1.25;">
        &ldquo;Did the Renaissance truly revolutionise medicine, or was it a revolution on paper only?&rdquo;
      </div>
    </div>

    <!-- Hero Primary Source Presentation -->
    <div style="border: 1.2px solid #cbd5e1; border-radius: 6px; padding: 6px; background: #ffffff; box-shadow: 0 2px 6px rgba(0,0,0,0.04); margin-bottom: 8px;">
      <div style="width: 100%; height: 380px; border-radius: 4px; overflow: hidden; border: 1px solid #e2e8f0; background: #f8fafc;">
        <img src="../../images/vesalius_fabrica_frontispiece.jpg" style="width: 100%; height: 100%; object-fit: contain; object-position: center; display: block;" alt="Vesalius De Fabrica Frontispiece 1543">
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px; padding: 0 4px; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #64748b;">
        <span><strong>Primary Visual Plate:</strong> <em>Andreas Vesalius Dissecting at Padua</em> (Frontispiece of <em>De Humani Corporis Fabrica</em>, Basel, 1543)</span>
        <span style="font-style: italic;">Padua University Medical School</span>
      </div>
    </div>

    <!-- Historical Context & Synopsis Box -->
    <div style="border: 1.2px solid #e2e8f0; border-radius: 5px; padding: 7px 12px; background: #fafaf9; margin-bottom: 8px;">
      <div style="font-family: 'Inter', sans-serif; font-size: 7.3pt; text-transform: uppercase; letter-spacing: 1px; color: #0f172a; font-weight: 700; margin-bottom: 2px;">
        Curriculum Synopsis &bull; The Renaissance Medical Paradox
      </div>
      <p style="font-family: 'Georgia', serif; font-size: 8.2pt; color: #334155; line-height: 1.4; margin: 0; text-align: justify;">
        Between 1500 and 1700, European medicine experienced an intellectual earthquake. Humanism shattered blind subservience to ancient dogma; Gutenberg’s movable metal type enabled mass distribution of accurate scientific anatomical woodcuts; and the Royal Society banned church debate under the revolutionary motto <em>Nullius in Verba</em>. Yet, behind this elite communication triumph lay a stark historical reality: not a single new medical cure was discovered. Ordinary Londoners facing the Great Plague of 1665 still bled themselves and carried pomanders against miasma, caught between cutting-edge scientific theory and ancient medieval treatment.
      </p>
    </div>

    <!-- 5 Core Enquiries Unit Syllabus Roadmap -->
    <div style="border: 1px solid #cbd5e1; border-radius: 5px; padding: 6px 10px; background: #f8fafc;">
      <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase; letter-spacing: 1px; color: #1e3a8a; font-weight: 700; margin-bottom: 3px;">
        The 5 Renaissance Enquiries &bull; Course Roadmap:
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px;">
        <div style="font-family: 'Inter', sans-serif; font-size: 7.3pt; color: #334155; padding: 2.5px 6px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 3px;"><strong style="color: #1e3a8a; margin-right: 4px;">L1:</strong> Humanism, The Printing Press &amp; The Royal Society</div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.3pt; color: #334155; padding: 2.5px 6px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 3px;"><strong style="color: #1e3a8a; margin-right: 4px;">L4:</strong> William Harvey &amp; Blood Circulation</div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.3pt; color: #334155; padding: 2.5px 6px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 3px;"><strong style="color: #1e3a8a; margin-right: 4px;">L2:</strong> Thomas Sydenham &amp; Bedside Observation</div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.3pt; color: #334155; padding: 2.5px 6px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 3px;"><strong style="color: #1e3a8a; margin-right: 4px;">L5:</strong> Continuity, Quackery &amp; The Great Plague</div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.3pt; color: #334155; padding: 2.5px 6px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 3px; grid-column: 1 / -1;"><strong style="color: #1e3a8a; margin-right: 4px;">L3:</strong> Andreas Vesalius &amp; The Anatomical Revolution (De Fabrica)</div>
      </div>
    </div>
  </div>
  `;

  // ====================================================================
  // PAGES 2 & 3: FACING DOUBLE-PAGE LIVING UNIT TIMELINE (1440–1676)
  // ====================================================================
  html += `
  <!-- PAGE 2: LIVING UNIT TIMELINE (1440–1628) · PART I (Facing Spread Left) -->
  <div class="page page-container" id="page-2" style="padding: 10px 14px; display: flex; flex-direction: column; height: 272mm; justify-content: space-between; border: 1px solid #cbd5e1; outline: 3.5px double #0f172a; outline-offset: -6px;">
    <div>
      <!-- Header -->
      <div style="border-bottom: 2px solid #1e3a8a; padding-bottom: 5px; margin-bottom: 6px; display: flex; justify-content: space-between; align-items: flex-end;">
        <div>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.8pt; text-transform: uppercase; letter-spacing: 1px; color: #1e3a8a; font-weight: 700;">
            Living Unit Timeline &bull; Part I: The Humanist &amp; Anatomical Awakening (1440–1628)
          </div>
          <h2 style="margin: 2px 0 0 0; font-family: 'Playfair Display', serif; font-size: 14pt; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px;">
            The Scientific Revolution Begins
          </h2>
        </div>
        <span class="archival-badge" style="background: #eff6ff; color: #1e3a8a; border-color: #bfdbfe;">
          Pages 2–3 Facing Spread
        </span>
      </div>

      <!-- Protocol Banner -->
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-left: 3px solid #1e3a8a; padding: 4px 8px; margin-bottom: 7px; border-radius: 3px; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #475569; display: flex; justify-content: space-between; align-items: center;">
        <span><strong>Living Timeline Protocol:</strong> Throughout this unit, illustrate each key milestone inside its dedicated sketchpad box. Add visual symbols, causal arrows, and forensic tags.</span>
        <span style="font-weight: 700; color: #1e3a8a; white-space: nowrap; margin-left: 8px;">Spine &bull; Facing Left</span>
      </div>

      <!-- Chronological Timeline Nodes: 1440–1628 -->
      <div style="display: flex; flex-direction: column; gap: 7px;">

        <!-- Milestone 1: 1440 -->
        <div style="display: grid; grid-template-columns: 105px 1fr; gap: 10px; align-items: stretch; border: 1px solid #cbd5e1; border-radius: 4px; padding: 5px 8px; background: #ffffff;">
          <div style="border: 1.2px dashed #94a3b8; border-radius: 3px; background: #fafaf9; display: flex; flex-direction: column; justify-content: space-between; padding: 3px 4px; min-height: 27mm;">
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌜</span><span>Milestone 1 Sketchpad</span><span>⌝</span>
            </div>
            <div style="text-align: center; font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #64748b; font-style: italic;">
              [Sketch: Gutenberg screw press &amp; identical book prints]
            </div>
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌞</span><span>1440 Invention</span><span>⌟</span>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
                <span style="font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; background: #1e3a8a; color: #ffffff; padding: 1px 6px; border-radius: 3px;">1440</span>
                <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f172a;">Johannes Gutenberg: Movable Metal Type Printing Press</strong>
              </div>
              <p style="font-family: 'Georgia', serif; font-size: 7.8pt; color: #334155; line-height: 1.35; margin: 0;">
                Invented in Mainz, Germany; brought to Westminster by William Caxton in 1476. Shatters the Catholic Church\'s monopoly over scriptoria. Enables rapid, cheap production of identical anatomical woodcuts and medical texts with zero hand-copying distortions.
              </p>
            </div>
            <div style="border-top: 1px dotted #cbd5e1; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b;">
              <strong>Key Enquiry Link:</strong> Lesson 1 &bull; Mass communication vs. Church censorship &bull; Latin luxury limitations
            </div>
          </div>
        </div>

        <!-- Milestone 2: c.1500 -->
        <div style="display: grid; grid-template-columns: 105px 1fr; gap: 10px; align-items: stretch; border: 1px solid #cbd5e1; border-radius: 4px; padding: 5px 8px; background: #ffffff;">
          <div style="border: 1.2px dashed #94a3b8; border-radius: 3px; background: #fafaf9; display: flex; flex-direction: column; justify-content: space-between; padding: 3px 4px; min-height: 27mm;">
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌜</span><span>Milestone 2 Sketchpad</span><span>⌝</span>
            </div>
            <div style="text-align: center; font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #64748b; font-style: italic;">
              [Sketch: Scholar reading Greek scroll vs ancient dogma]
            </div>
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌞</span><span>c.1500 Humanism</span><span>⌟</span>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
                <span style="font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; background: #1e3a8a; color: #ffffff; padding: 1px 6px; border-radius: 3px;">c.1500</span>
                <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f172a;">The Humanist Renaissance: Questioning Ancient Dogma</strong>
              </div>
              <p style="font-family: 'Georgia', serif; font-size: 7.8pt; color: #334155; line-height: 1.35; margin: 0;">
                Scholars rediscover original Greek and Roman manuscripts uncontaminated by medieval monastic translations. Humanism promotes human reason, direct observation of nature, and the moral duty to interrogate the physical universe rather than blindly obeying medieval authority.
              </p>
            </div>
            <div style="border-top: 1px dotted #cbd5e1; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b;">
              <strong>Key Enquiry Link:</strong> Lessons 1–3 &bull; Recovery of ancient clinical ideals &bull; Sparking anatomical enquiry
            </div>
          </div>
        </div>

        <!-- Milestone 3: 1543 -->
        <div style="display: grid; grid-template-columns: 105px 1fr; gap: 10px; align-items: stretch; border: 1px solid #cbd5e1; border-radius: 4px; padding: 5px 8px; background: #ffffff;">
          <div style="border: 1.2px dashed #94a3b8; border-radius: 3px; background: #fafaf9; display: flex; flex-direction: column; justify-content: space-between; padding: 3px 4px; min-height: 27mm;">
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌜</span><span>Milestone 3 Sketchpad</span><span>⌝</span>
            </div>
            <div style="text-align: center; font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #64748b; font-style: italic;">
              [Sketch: Vesalius Fabrica 1-piece lower jawbone]
            </div>
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌞</span><span>1543 Anatomy</span><span>⌟</span>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
                <span style="font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; background: #1e3a8a; color: #ffffff; padding: 1px 6px; border-radius: 3px;">1543</span>
                <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f172a;">Andreas Vesalius Publishes De Humani Corporis Fabrica</strong>
              </div>
              <p style="font-family: 'Georgia', serif; font-size: 7.8pt; color: #334155; line-height: 1.35; margin: 0;">
                Conducting dissections with his own hands at Padua University, Vesalius proves Galen made over 300 anatomical errors because Galen dissected apes, dogs, and pigs. Corrects Galen: lower jaw is one bone (not two); breastbone has three parts (not seven); no holes exist in the heart septum.
              </p>
            </div>
            <div style="border-top: 1px dotted #cbd5e1; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b;">
              <strong>Key Enquiry Link:</strong> Lesson 3 &bull; Shattering Galenic infallibility &bull; Thomas Geminus brings prints to London (1545)
            </div>
          </div>
        </div>

        <!-- Milestone 4: 1628 -->
        <div style="display: grid; grid-template-columns: 105px 1fr; gap: 10px; align-items: stretch; border: 1px solid #cbd5e1; border-radius: 4px; padding: 5px 8px; background: #ffffff;">
          <div style="border: 1.2px dashed #94a3b8; border-radius: 3px; background: #fafaf9; display: flex; flex-direction: column; justify-content: space-between; padding: 3px 4px; min-height: 27mm;">
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌜</span><span>Milestone 4 Sketchpad</span><span>⌝</span>
            </div>
            <div style="text-align: center; font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #64748b; font-style: italic;">
              [Sketch: Forearm tight ligature &amp; venous valves]
            </div>
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌞</span><span>1628 Circulation</span><span>⌟</span>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
                <span style="font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; background: #1e3a8a; color: #ffffff; padding: 1px 6px; border-radius: 3px;">1628</span>
                <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f172a;">William Harvey: Circulation of Blood (De Motu Cordis)</strong>
              </div>
              <p style="font-family: 'Georgia', serif; font-size: 7.8pt; color: #334155; line-height: 1.35; margin: 0;">
                Calculates mathematically that the heart pumps 540 pints of blood per day—proving blood cannot be manufactured constantly by the liver as fuel. Proves blood circulates continuously in one direction; heart acts as a mechanical pump. Vein valves prevent backflow.
              </p>
            </div>
            <div style="border-top: 1px dotted #cbd5e1; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b;">
              <strong>Key Enquiry Link:</strong> Lesson 4 &bull; Mathematical physiology vs. Four Humours &bull; Initial resistance from conservative physicians
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Page 2 Footer -->
    <div style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #94a3b8; display: flex; justify-content: space-between; border-top: 1px solid #e2e8f0; padding-top: 3px;">
      <span>The History Department &bull; GCSE Medicine Paper 1</span>
      <span>Living Unit Timeline &bull; Part I: 1440–1628</span>
      <span>Page 2 (Facing Spread Left)</span>
    </div>
  </div>

  <!-- PAGE 3: LIVING UNIT TIMELINE (1660–1676) · PART II (Facing Spread Right) -->
  <div class="page page-container" id="page-3" style="padding: 10px 14px; display: flex; flex-direction: column; height: 272mm; justify-content: space-between; border: 1px solid #cbd5e1; outline: 3.5px double #0f172a; outline-offset: -6px;">
    <div>
      <!-- Header -->
      <div style="border-bottom: 2px solid #1e3a8a; padding-bottom: 5px; margin-bottom: 6px; display: flex; justify-content: space-between; align-items: flex-end;">
        <div>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.8pt; text-transform: uppercase; letter-spacing: 1px; color: #1e3a8a; font-weight: 700;">
            Living Unit Timeline &bull; Part II: Institutional Science &amp; Public Reality (1660–1676)
          </div>
          <h2 style="margin: 2px 0 0 0; font-family: 'Playfair Display', serif; font-size: 14pt; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px;">
            The Scientific Method vs Popular Tradition
          </h2>
        </div>
        <span class="archival-badge" style="background: #eff6ff; color: #1e3a8a; border-color: #bfdbfe;">
          Pages 2–3 Facing Spread
        </span>
      </div>

      <!-- Protocol Banner -->
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-left: 3px solid #0284c7; padding: 4px 8px; margin-bottom: 7px; border-radius: 3px; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #475569; display: flex; justify-content: space-between; align-items: center;">
        <span><strong>Living Timeline Complete:</strong> Cross-reference these 8 milestones during extended exam writing to evaluate change vs continuity.</span>
        <span style="font-weight: 700; color: #0284c7; white-space: nowrap; margin-left: 8px;">Spine &bull; Facing Right</span>
      </div>

      <!-- Chronological Timeline Nodes: 1660–1676 -->
      <div style="display: flex; flex-direction: column; gap: 7px;">

        <!-- Milestone 5: 1660–1662 -->
        <div style="display: grid; grid-template-columns: 105px 1fr; gap: 10px; align-items: stretch; border: 1px solid #cbd5e1; border-radius: 4px; padding: 5px 8px; background: #ffffff;">
          <div style="border: 1.2px dashed #94a3b8; border-radius: 3px; background: #fafaf9; display: flex; flex-direction: column; justify-content: space-between; padding: 3px 4px; min-height: 27mm;">
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌜</span><span>Milestone 5 Sketchpad</span><span>⌝</span>
            </div>
            <div style="text-align: center; font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #64748b; font-style: italic;">
              [Sketch: Royal Society crest &amp; motto 'Nullius in Verba']
            </div>
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌞</span><span>1662 Charter</span><span>⌟</span>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
                <span style="font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; background: #1e3a8a; color: #ffffff; padding: 1px 6px; border-radius: 3px;">1662</span>
                <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f172a;">Foundation of The Royal Society &amp; Nullius in Verba</strong>
              </div>
              <p style="font-family: 'Georgia', serif; font-size: 7.8pt; color: #334155; line-height: 1.35; margin: 0;">
                Founded at Gresham College in London (1660); granted Royal Charter by King Charles II in 1662. Adopts radical Latin motto <em>Nullius in Verba</em> (&ldquo;Take nobody\'s word for it&rdquo;). Demands laboratory demonstration and repeatable experiment over ancient theological and Galenic authority.
              </p>
            </div>
            <div style="border-top: 1px dotted #cbd5e1; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b;">
              <strong>Key Enquiry Link:</strong> Lesson 1 &bull; Institutional prestige for experimental science &bull; Banning religious debate
            </div>
          </div>
        </div>

        <!-- Milestone 6: 1665 -->
        <div style="display: grid; grid-template-columns: 105px 1fr; gap: 10px; align-items: stretch; border: 1px solid #cbd5e1; border-radius: 4px; padding: 5px 8px; background: #ffffff;">
          <div style="border: 1.2px dashed #94a3b8; border-radius: 3px; background: #fafaf9; display: flex; flex-direction: column; justify-content: space-between; padding: 3px 4px; min-height: 27mm;">
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌜</span><span>Milestone 6 Sketchpad</span><span>⌝</span>
            </div>
            <div style="text-align: center; font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #64748b; font-style: italic;">
              [Sketch: Hooke microscope &amp; animalcules]
            </div>
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌞</span><span>1665 Journal</span><span>⌟</span>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
                <span style="font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; background: #1e3a8a; color: #ffffff; padding: 1px 6px; border-radius: 3px;">1665</span>
                <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f172a;">Philosophical Transactions &amp; Hooke\'s Micrographia</strong>
              </div>
              <p style="font-family: 'Georgia', serif; font-size: 7.8pt; color: #334155; line-height: 1.35; margin: 0;">
                Henry Oldenburg establishes Europe\'s first peer-reviewed journal, creating an international scientific communication network. Robert Hooke publishes <em>Micrographia</em>, revealing complex microscopic structures. Later, Leeuwenhoek submits drawings of living &ldquo;animalcules&rdquo; (bacteria) in 1676.
              </p>
            </div>
            <div style="border-top: 1px dotted #cbd5e1; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b;">
              <strong>Key Enquiry Link:</strong> Lesson 1 &bull; Peer review standard &bull; Optical technology reveals invisible organisms
            </div>
          </div>
        </div>

        <!-- Milestone 7: 1665 -->
        <div style="display: grid; grid-template-columns: 105px 1fr; gap: 10px; align-items: stretch; border: 1px solid #cbd5e1; border-radius: 4px; padding: 5px 8px; background: #ffffff;">
          <div style="border: 1.2px dashed #94a3b8; border-radius: 3px; background: #fafaf9; display: flex; flex-direction: column; justify-content: space-between; padding: 3px 4px; min-height: 27mm;">
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌜</span><span>Milestone 7 Sketchpad</span><span>⌝</span>
            </div>
            <div style="text-align: center; font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #64748b; font-style: italic;">
              [Sketch: Quarantined door with red cross &amp; dead-cart]
            </div>
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌞</span><span>1665 Plague</span><span>⌟</span>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
                <span style="font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; background: #be123c; color: #ffffff; padding: 1px 6px; border-radius: 3px;">1665</span>
                <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f172a;">The Great Plague of London: Continuity in Practice</strong>
              </div>
              <p style="font-family: 'Georgia', serif; font-size: 7.8pt; color: #334155; line-height: 1.35; margin: 0;">
                Outbreak claims 100,000 Londoners. Mayor imposes 28-day house quarantine, padlocks doors marked with red crosses, and hires parish watchmen. Yet cause remains unknown: people smoke tobacco and hold pomanders against miasma, while quacks sell useless remedies.
              </p>
            </div>
            <div style="border-top: 1px dotted #cbd5e1; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b;">
              <strong>Key Enquiry Link:</strong> Lesson 5 &bull; Municipal quarantine vs. medical ignorance &bull; Contrast with 1348 Black Death
            </div>
          </div>
        </div>

        <!-- Milestone 8: 1676 -->
        <div style="display: grid; grid-template-columns: 105px 1fr; gap: 10px; align-items: stretch; border: 1px solid #cbd5e1; border-radius: 4px; padding: 5px 8px; background: #ffffff;">
          <div style="border: 1.2px dashed #94a3b8; border-radius: 3px; background: #fafaf9; display: flex; flex-direction: column; justify-content: space-between; padding: 3px 4px; min-height: 27mm;">
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌜</span><span>Milestone 8 Sketchpad</span><span>⌝</span>
            </div>
            <div style="text-align: center; font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #64748b; font-style: italic;">
              [Sketch: Sydenham taking notes at patient bedside]
            </div>
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌞</span><span>1676 Diagnosis</span><span>⌟</span>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
                <span style="font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; background: #1e3a8a; color: #ffffff; padding: 1px 6px; border-radius: 3px;">1676</span>
                <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f172a;">Thomas Sydenham Publishes Observationes Medicae</strong>
              </div>
              <p style="font-family: 'Georgia', serif; font-size: 7.8pt; color: #334155; line-height: 1.35; margin: 0;">
                The \'English Hippocrates\' moves medicine away from ancient book theory. Argues that diseases should be classified into distinct species like plants. Successfully distinguishes measles from scarlet fever; prescribes fresh air and cinchona bark (quinine) for fevers.
              </p>
            </div>
            <div style="border-top: 1px dotted #cbd5e1; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b;">
              <strong>Key Enquiry Link:</strong> Lesson 2 &bull; Clinical observation over Galen &bull; First modern disease classification
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Page 3 Footer -->
    <div style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #94a3b8; display: flex; justify-content: space-between; border-top: 1px solid #e2e8f0; padding-top: 3px;">
      <span>The History Department &bull; GCSE Medicine Paper 1</span>
      <span>Living Unit Timeline &bull; Part II: 1660–1676</span>
      <span>Page 3 (Facing Spread Right)</span>
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
    <div class="page page-container" id="page-${leftPageNum}" style="padding: 10px 14px; display: flex; flex-direction: column; height: 272mm; justify-content: space-between; border: 1px solid #cbd5e1; outline: 3.5px double #0f172a; outline-offset: -6px;">
      <div>
        <!-- Lesson Header -->
        <div style="border-bottom: 2px solid #1e3a8a; padding-bottom: 4px; margin-bottom: 6px; display: flex; justify-content: space-between; align-items: flex-end;">
          <div>
            <div style="font-family: 'Inter', sans-serif; font-size: 7.8pt; text-transform: uppercase; letter-spacing: 1px; color: #1e3a8a; font-weight: 700;">
              Lesson ${cfg.lessonNum} &bull; Disciplinary Enquiry
            </div>
            <h2 style="margin: 2px 0 0 0; font-family: 'Playfair Display', serif; font-size: 13pt; color: #0f172a; line-height: 1.25;">
              ${cfg.title}
            </h2>
          </div>
          <span class="archival-badge" style="background: #eff6ff; color: #1e3a8a; border-color: #bfdbfe;">
            Disciplinary Lab
          </span>
        </div>

        <!-- Task 1: Do Now Recall (5 Questions from Prior Knowledge) -->
        <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 5px 8px; background: #f8fafc; margin-bottom: 6px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; text-transform: uppercase; color: #1e3a8a; letter-spacing: 0.5px;">
              Task 1: Prior Knowledge Retrieval (Do Now)
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; color: #64748b;">Target: 5/5</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 3px;">
            ${cfg.doNow
              .map(
                (dn, qIdx) => `
              <div style="display: grid; grid-template-columns: auto 1fr; gap: 6px; align-items: baseline; font-family: 'Inter', sans-serif; font-size: 7.4pt;">
                <span style="font-weight: 700; color: #1e3a8a;">${qIdx + 1}.</span>
                <div>
                  <span style="color: #1e293b;">${dn.q}</span>
                  <div class="task-line-dotted" style="height: 4.8mm; margin-top: 1px;"></div>
                </div>
              </div>
            `,
              )
              .join('')}
          </div>
        </div>

        <!-- Task 2: Authentic Primary Source Archival Investigation -->
        <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 5px 8px; background: #ffffff; margin-bottom: 6px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; text-transform: uppercase; color: #1e3a8a; letter-spacing: 0.5px;">
              Task 2: Primary Archival Forensic Evidence
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b; font-style: italic;">Interrogate authentic primary plates</span>
          </div>
          <div style="display: grid; grid-template-columns: ${cfg.sources.length === 3 ? '1fr 1fr 1fr' : '1fr 1fr'}; gap: 6px;">
            ${cfg.sources
              .map(
                (s) => `
              <div style="border: 1px solid #e2e8f0; border-radius: 3px; padding: 4px; background: #f8fafc; display: flex; flex-direction: column; justify-content: space-between;">
                <div style="height: 110px; width: 100%; border: 1px solid #cbd5e1; border-radius: 2px; overflow: hidden; background: #fff; margin-bottom: 3px;">
                  <img src="${s.src}" style="width: 100%; height: 100%; object-fit: contain; display: block;" alt="${s.title}">
                </div>
                <div>
                  <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #1e3a8a; display: block; line-height: 1.2;">${s.id}: ${s.title}</strong>
                  <span style="font-family: 'Georgia', serif; font-size: 6.8pt; color: #475569; line-height: 1.2; display: block; margin-top: 2px;">${s.desc}</span>
                </div>
              </div>
            `,
              )
              .join('')}
          </div>
        </div>

        <!-- Task 3: Disciplinary Vocabulary Precision Task -->
        <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 5px 8px; background: #f8fafc; margin-bottom: 6px;">
          <div style="font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 700; text-transform: uppercase; color: #1e3a8a; letter-spacing: 0.5px; margin-bottom: 2px;">
            Task 3: Disciplinary Vocabulary Mastery
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #334155; margin-bottom: 3px;">
            ${cfg.vocabTask.prompt}
          </div>
          ${
            cfg.vocabTask.type === 'cloze'
              ? `
            <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 3px; padding: 4px 6px; font-family: 'Georgia', serif; font-size: 7.4pt; color: #1e293b; line-height: 1.35; margin-bottom: 3px;">
              ${cfg.vocabTask.clozeText}
            </div>
            <div style="font-family: 'Inter', sans-serif; font-size: 7.3pt; color: #64748b; margin-bottom: 2px;">${cfg.vocabTask.followUp}</div>
            <div class="task-line" style="height: 6mm;"></div>
            <div class="task-line" style="height: 6mm;"></div>
          `
              : `
            <div class="task-line" style="height: 6.2mm;"></div>
            <div class="task-line" style="height: 6.2mm;"></div>
            <div class="task-line" style="height: 6.2mm;"></div>
          `
          }
        </div>

      </div>

      <!-- Task 4: Living Timeline Mission Box (Sends Student Back to Pages 2–3) -->
      <div>
        <div class="living-mission-box" style="margin-bottom: 4px;">
          <div style="display: flex; align-items: center; gap: 6px; flex: 1;">
            <span class="living-mission-tag">
              <i class="fa-solid fa-timeline"></i> Living Timeline Mission
            </span>
            <span class="living-mission-text">
              ${cfg.livingTimelineMission.instruction}
            </span>
          </div>
          <span class="living-mission-link">&larr; Turn to Pages 2–3</span>
        </div>

        <!-- Left Page Footer -->
        <div style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #94a3b8; display: flex; justify-content: space-between; border-top: 1px solid #e2e8f0; padding-top: 3px;">
          <span>The History Department &bull; GCSE Medicine</span>
          <span>Lesson ${cfg.lessonNum}: Disciplinary Knowledge</span>
          <span>Page ${leftPageNum} (Facing Spread Left)</span>
        </div>
      </div>
    </div>
    `;

    // ----------------------------------------------------
    // RIGHT PAGE (Recto, Odd Page Number: 5, 7, 9, 11, 13)
    // ----------------------------------------------------
    html += `
    <div class="page page-container" id="page-${rightPageNum}" style="padding: 10px 14px; display: flex; flex-direction: column; height: 272mm; justify-content: space-between; border: 1px solid #cbd5e1; outline: 3.5px double #0f172a; outline-offset: -6px;">
      <div>
        <!-- Specification Anchor Strip (GCSE Mandate) -->
        <div class="spec-anchor-bar">
          <span class="spec-anchor-badge">
            <i class="fa-solid fa-bookmark"></i> Edexcel Paper 1 &bull; KT2
          </span>
          <span class="spec-anchor-text">
            <strong>Specification:</strong> &ldquo;${cfg.specAnchor}&rdquo;
          </span>
        </div>

        <!-- Enquiry Question & Tariff Header -->
        <div style="border-bottom: 2px solid #1e3a8a; padding-bottom: 4px; margin-bottom: 6px; display: flex; justify-content: space-between; align-items: flex-end;">
          <div>
            <div style="font-family: 'Inter', sans-serif; font-size: 7.8pt; text-transform: uppercase; letter-spacing: 1px; color: #1e3a8a; font-weight: 700;">
              GCSE Exam Mastery &bull; Extended Writing
            </div>
            <h3 style="font-family: 'Playfair Display', serif; font-size: 12pt; color: #0f172a; margin: 2px 0 0 0; line-height: 1.25;">
              ${cfg.enquiryQuestion}
            </h3>
          </div>
          <span class="archival-badge" style="background: #1e3a8a; color: #ffffff; border-color: #1e3a8a; font-weight: 700; white-space: nowrap;">
            ${cfg.tariff}
          </span>
        </div>

        <!-- Exam Question Prompt & Stimulus Box -->
        <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 5px 8px; background: #f8fafc; margin-bottom: 6px;">
          <div style="font-family: 'Georgia', serif; font-size: 8.5pt; font-weight: 700; color: #0f172a; line-height: 1.3; margin-bottom: 3px;">
            ${cfg.examStem}
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #475569; background: #eff6ff; border-left: 3px solid #3b82f6; padding: 3px 6px; border-radius: 3px;">
            <strong>Edexcel Stimulus Prompts:</strong> You may use the following in your answer: &bull; <em>${cfg.stimulus[0]}</em> &bull; <em>${cfg.stimulus[1]}</em>. <span style="color: #b91c1c; font-weight: 600;">You must also use information of your own.</span>
          </div>
        </div>

        <!-- 3-Column Enquiry Planning Matrix / Structure Strip -->
        <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 4px 6px; background: #f8fafc; margin-bottom: 5px;">
          <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-transform: uppercase; color: #1e3a8a; letter-spacing: 0.5px; margin-bottom: 3px; display: flex; justify-content: space-between;">
            <span>Enquiry Planning Matrix &bull; Map your 3 paragraphs before writing</span>
            <span style="color: #64748b; font-weight: 600;">Draft notes &darr;</span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 5px;">
            ${cfg.structureStrip
              .map(
                (s) => `
              <div style="border: 1px solid #e2e8f0; border-radius: 3px; padding: 3px 5px; background: #ffffff;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #1e3a8a; display: block; border-bottom: 1px solid #e2e8f0; padding-bottom: 1px; margin-bottom: 2px;">${s.col}</strong>
                <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #334155; line-height: 1.25; display: block; margin-bottom: 2px;">${s.text}</span>
                <div class="task-line-dotted" style="height: 4.8mm;"></div>
                <div class="task-line-dotted" style="height: 4.8mm;"></div>
              </div>
            `,
              )
              .join('')}
          </div>
        </div>

        <!-- Word Bank & Causal Connective Strip -->
        <div style="border: 1px solid #cbd5e1; background: #ffffff; border-radius: 4px; padding: 3px 6px; margin-bottom: 5px; font-family: 'Inter', sans-serif; font-size: 6.8pt; line-height: 1.3;">
          <div style="display: grid; grid-template-columns: auto 1fr; gap: 6px; align-items: baseline;">
            <strong style="color: #1e3a8a; text-transform: uppercase; letter-spacing: 0.5px;">Key Bank:</strong>
            <span style="color: #334155;">${cfg.wordBank.technical} &bull; ${cfg.wordBank.institutional || cfg.wordBank.treatments || cfg.wordBank.corrections || cfg.wordBank.government}</span>
          </div>
          <div style="display: grid; grid-template-columns: auto 1fr; gap: 6px; align-items: baseline; border-top: 1px dashed #e2e8f0; margin-top: 1px; padding-top: 1px;">
            <strong style="color: #b91c1c; text-transform: uppercase; letter-spacing: 0.5px;">Causal Stems:</strong>
            <span style="color: #475569; font-style: italic;">${cfg.connectives}</span>
          </div>
        </div>

        <!-- PEEL Writing Framework Strip -->
        <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 3px; padding: 3px 8px; margin-bottom: 5px; display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #1e293b;">
          <span><strong style="color: #1e3a8a;">[P] Point:</strong> Clear direct factor sentence.</span>
          <span><strong style="color: #1e3a8a;">[E] Evidence:</strong> Specific dates, figures &amp; facts.</span>
          <span><strong style="color: #1e3a8a;">[E] Explanation:</strong> Causal mechanism (how &amp; why).</span>
          <span><strong style="color: #1e3a8a;">[L] Link:</strong> Evaluate overall historical impact.</span>
        </div>

        <!-- Ruled Writing Lines (Dynamic Auto-Fill, 7.6mm Line Height) -->
        <div class="auto-fill-writing-lines" data-line-height="7.6" style="width: 100%; margin-bottom: 4px;">
          ${Array(17).fill('<div class="task-line" style="height: 7.6mm;"></div>').join('')}
        </div>

      </div>

      <!-- Teacher Grading & Assessment Footer -->
      <div>
        <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 4px 8px; background: #f8fafc; display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #334155; margin-bottom: 4px;">
          <div>
            <strong>Teacher Assessment:</strong> &nbsp;
            Effort: [ 1 &bull; 2 &bull; 3 &bull; 4 &bull; 5 ] &nbsp;|&nbsp; 
            Subject Knowledge: [ 1 &bull; 2 &bull; 3 &bull; 4 ] &nbsp;|&nbsp; 
            Analysis &amp; Evaluation: [ 1 &bull; 2 &bull; 3 &bull; 4 ]
          </div>
          <div>
            <strong>PEEL Mastery:</strong> &nbsp;&nbsp; P &nbsp;&nbsp;&nbsp;&nbsp; E &nbsp;&nbsp;&nbsp;&nbsp; E &nbsp;&nbsp;&nbsp;&nbsp; L
          </div>
        </div>

        <!-- Right Page Footer -->
        <div style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #94a3b8; display: flex; justify-content: space-between; border-top: 1px solid #e2e8f0; padding-top: 3px;">
          <span>The History Department &bull; GCSE Medicine</span>
          <span>Lesson ${cfg.lessonNum}: Exam Mastery</span>
          <span>Page ${rightPageNum} (Facing Spread Right)</span>
        </div>
      </div>
    </div>
    `;
  });

  // ====================================================================
  // PAGE 14: OUTSIDE BACK COVER (Specification Audit & Revision Matrix)
  // ====================================================================
  html += `
  <div class="page page-container" id="page-14" style="padding: 16px 18px; border: 1px solid #cbd5e1; outline: 3.5px double #0f172a; outline-offset: -8px; justify-content: space-between;">
    <div>
      <div style="text-align: center; border-bottom: 2px solid #1e3a8a; padding-bottom: 6px; margin-bottom: 10px;">
        <div style="font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 2px;">
          Pearson Edexcel GCSE (9–1) History &bull; Paper 1 (1HI0/11)
        </div>
        <h2 style="font-family: 'Playfair Display', serif; font-size: 16pt; color: #0f172a; margin: 0 0 3px 0; text-transform: uppercase; letter-spacing: 1px;">
          Key Topic 2 Specification Audit &bull; Revision Matrix
        </h2>
        <div style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #64748b; font-style: italic;">
          Rate your confidence for each specification bullet before mock examinations: [ &bull; Red &bull; Amber &bull; Green ]
        </div>
      </div>

      <!-- Specification Audit Table -->
      <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif; font-size: 7.8pt; margin-bottom: 12px;">
        <thead>
          <tr style="background: #1e3a8a; color: #ffffff;">
            <th style="padding: 5px 8px; border: 1px solid #334155; text-align: left; width: 35%;">Pearson Edexcel Specification Topic</th>
            <th style="padding: 5px 8px; border: 1px solid #334155; text-align: left; width: 45%;">Core Historical Mechanisms &amp; Case Studies</th>
            <th style="padding: 5px 8px; border: 1px solid #334155; text-align: center; width: 20%;">Mastery Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 5px 8px; border: 1px solid #cbd5e1; font-weight: 700; color: #1e3a8a; background: #f8fafc;">1. Causes of Disease</td>
            <td style="padding: 5px 8px; border: 1px solid #cbd5e1; color: #334155;">Continuity of Four Humours and miasma; decline in Church authority; Sydenham\'s classification of diseases into biological species.</td>
            <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; font-weight: 600;">[ R &bull; A &bull; G ]</td>
          </tr>
          <tr>
            <td style="padding: 5px 8px; border: 1px solid #cbd5e1; font-weight: 700; color: #1e3a8a; background: #f8fafc;">2. Treatment &amp; Care</td>
            <td style="padding: 5px 8px; border: 1px solid #cbd5e1; color: #334155;">Continuity of traditional herbal remedies; bleeding and purging; quack doctors; dissolution of monastic hospitals under Henry VIII.</td>
            <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; font-weight: 600;">[ R &bull; A &bull; G ]</td>
          </tr>
          <tr>
            <td style="padding: 5px 8px; border: 1px solid #cbd5e1; font-weight: 700; color: #1e3a8a; background: #f8fafc;">3. Scientific Communication</td>
            <td style="padding: 5px 8px; border: 1px solid #cbd5e1; color: #334155;">Gutenberg\'s printing press (c1440); The Royal Society (1660/1662); Nullius in Verba; Philosophical Transactions (1665); Leeuwenhoek\'s animalcules.</td>
            <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; font-weight: 600;">[ R &bull; A &bull; G ]</td>
          </tr>
          <tr>
            <td style="padding: 5px 8px; border: 1px solid #cbd5e1; font-weight: 700; color: #1e3a8a; background: #f8fafc;">4. Vesalius &amp; Anatomy</td>
            <td style="padding: 5px 8px; border: 1px solid #cbd5e1; color: #334155;">De Humani Corporis Fabrica (1543); Padua human dissections; corrected 300 Galenic errors (mandible, sternum, septum); Geminus\'s English prints.</td>
            <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; font-weight: 600;">[ R &bull; A &bull; G ]</td>
          </tr>
          <tr>
            <td style="padding: 5px 8px; border: 1px solid #cbd5e1; font-weight: 700; color: #1e3a8a; background: #f8fafc;">5. Harvey &amp; Circulation</td>
            <td style="padding: 5px 8px; border: 1px solid #cbd5e1; color: #334155;">De Motu Cordis (1628); heart as a mechanical pump; calculated 540 pints/day; forearm ligature test proving one-way venous valves; limits of change.</td>
            <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; font-weight: 600;">[ R &bull; A &bull; G ]</td>
          </tr>
          <tr>
            <td style="padding: 5px 8px; border: 1px solid #cbd5e1; font-weight: 700; color: #be123c; background: #fff1f2;">6. Case Study: Great Plague</td>
            <td style="padding: 5px 8px; border: 1px solid #cbd5e1; color: #334155;">1665 outbreak (100,000 deaths); Mayor\'s quarantine orders (red cross, 28-day isolation, watchmen) vs popular continuity (pomanders, tobacco, amulets).</td>
            <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; font-weight: 600;">[ R &bull; A &bull; G ]</td>
          </tr>
        </tbody>
      </table>

      <!-- Synoptic Revision Advice Box -->
      <div style="border: 1.2px solid #1e3a8a; border-radius: 5px; padding: 10px 14px; background: #f0f4ff; margin-bottom: 12px;">
        <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #1e3a8a; display: block; margin-bottom: 4px; text-transform: uppercase;">
          <i class="fa-solid fa-lightbulb"></i> The Golden Exam Rule for Paper 1 Section B (Question 4 &amp; 5/6):
        </strong>
        <p style="font-family: 'Georgia', serif; font-size: 8.2pt; color: #1e293b; line-height: 1.45; margin: 0;">
          Never confuse <em>scientific discovery</em> with <em>practical cure</em>. Whenever evaluating the impact of Vesalius, Harvey, or the Royal Society, always emphasize the historical paradox: although their ideas were revolutionary and permanently destroyed Galen\'s authority among university academics, they did not lead to a single new medical treatment for ordinary patients during the Renaissance. Doctors continued bloodletting, and Londoners in 1665 still believed miasma caused the plague.
        </p>
      </div>

      <!-- Revision QR & Digital Companion Box -->
      <div style="border: 1px solid #cbd5e1; border-radius: 5px; padding: 10px 14px; background: #fafaf9; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f172a; display: block; margin-bottom: 2px;">
            The History Revision Hub &bull; Digital Mastery Portal
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #64748b;">
            Access interactive Leitner flashcards, exam mark scheme breakdowns, and model answers.
          </span>
        </div>
        <span class="archival-badge" style="background: #1e3a8a; color: #ffffff; border-color: #1e3a8a; font-weight: 700;">
          Edition 2026.1
        </span>
      </div>
    </div>

    <!-- Outside Back Cover Footer -->
    <div style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #94a3b8; display: flex; justify-content: space-between; border-top: 1px solid #e2e8f0; padding-top: 4px;">
      <span>The History Department &bull; GCSE History Revision Hub</span>
      <span>Key Topic 2 &bull; Revision &amp; Assessment Matrix</span>
      <span>Page 14 (Outside Back Cover)</span>
    </div>
  </div>
  `;

  // Auto-Fill Client-Side Script
  html += `
  <script>
    (function () {
      function autoFillPages() {
        const pages = document.querySelectorAll('.page');
        pages.forEach((page, pIdx) => {
          const pageId = page.id || 'page-' + (pIdx + 1);
          const writingContainer = page.querySelector('.auto-fill-writing-lines');
          if (writingContainer) {
            const lineH = parseFloat(writingContainer.getAttribute('data-line-height')) || 7.6;
            const lineHpx = lineH * 3.7795275591;
            const targetPageHeight = 272 * 3.7795275591;

            const getGap = () => targetPageHeight - page.scrollHeight;

            let safety = 0;
            while (getGap() >= lineHpx && safety < 30) {
              const newLine = document.createElement('div');
              newLine.className = 'task-line';
              newLine.style.height = lineH + 'mm';
              writingContainer.appendChild(newLine);
              safety++;
            }
            while (getGap() < 6 && writingContainer.children.length > 6) {
              writingContainer.removeChild(writingContainer.lastElementChild);
            }
          }
        });
      }

      if (document.readyState === 'complete' || document.readyState === 'interactive') {
        autoFillPages();
      } else {
        window.addEventListener('DOMContentLoaded', autoFillPages);
      }
      window.addEventListener('load', autoFillPages);
    })();
  </script>
</body>
</html>
`;

  return html;
}

module.exports = {
  buildMedicineTwoPageWorkbook,
  renaissanceConfigs,
};
