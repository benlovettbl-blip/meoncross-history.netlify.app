const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');

const ROOT_DIR = path.resolve(__dirname, '..');

function getBase64Image(relPath) {
  if (!relPath) return null;
  const clean = relPath.replace(/^\//, '');
  const candidates = [
    path.join(ROOT_DIR, 'public', clean),
    path.join(ROOT_DIR, clean),
    path.join(ROOT_DIR, 'public', 'images', path.basename(clean)),
    path.join(ROOT_DIR, 'images', path.basename(clean)),
    path.join(ROOT_DIR, 'units', 'edexcel_medicine', 'assets', path.basename(clean)),
    path.join(ROOT_DIR, 'public', 'units', 'edexcel_medicine', 'assets', path.basename(clean)),
  ];

  for (const cand of candidates) {
    if (fs.existsSync(cand) && fs.statSync(cand).isFile()) {
      const ext = path.extname(cand).toLowerCase();
      let mime = 'image/jpeg';
      if (ext === '.png') mime = 'image/png';
      else if (ext === '.webp') mime = 'image/webp';
      else if (ext === '.svg') mime = 'image/svg+xml';
      const buf = fs.readFileSync(cand);
      return `data:${mime};base64,${buf.toString('base64')}`;
    }
  }
  return null;
}

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

function renderFooterStrip(pageNum, quip, totalPages = 20) {
  const isEven = pageNum % 2 === 0;
  if (isEven) {
    return `
      <div class="page-footer-strip">
        <span class="footer-page-num" style="margin-right: 8px;">${pageNum}/${totalPages}</span>
        <span class="footer-quip" style="text-align: right; flex: 1;">${quip}</span>
      </div>`;
  } else {
    return `
      <div class="page-footer-strip">
        <span class="footer-quip" style="text-align: left; flex: 1; margin-right: 8px;">${quip}</span>
        <span class="footer-page-num">${pageNum}/${totalPages}</span>
      </div>`;
  }
}

function renderNotesPage(pageNum, quip, totalPages = 20) {
  const isEven = pageNum % 2 === 0;
  const pageClass = isEven ? 'verso-page' : 'recto-page';
  const numLines = 32;
  let linesHtml = '';
  for (let i = 0; i < numLines; i++) {
    linesHtml += `          <div class="note-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>\n`;
  }

  return `
  <!-- PAGE ${pageNum}: DEDICATED BRITISH EXERCISE NOTES PAGE -->
  <div class="page page-container ${pageClass}" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div style="border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 5px;">
        <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 12pt; color: #000000; text-transform: uppercase; font-weight: 900; letter-spacing: 0.5px;">
          Key Topic 2 Notes &amp; Examination Strategy
        </h2>
      </div>

      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0; position: relative; border-top: 1.2px solid #000000; margin-bottom: 4px;">
        <!-- Vertical Margin Line (26mm from left edge of lines) - British Exercise Book Standard Margin -->
        <div style="position: absolute; top: 0; bottom: 0; left: 26mm; width: 1.5px; background: #000000; z-index: 2;"></div>
        
        <!-- Ruled Horizontal Lines (Standard ~8mm school pitch, flex-filled) -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0;">
${linesHtml}        </div>
      </div>

      ${renderFooterStrip(pageNum, quip, totalPages)}
    </div>
  </div>`;
}

// ============================================================================
// 5 Dedicated Renaissance Enquiry Lesson Configurations (100% Black & White)
// ============================================================================
const renaissanceConfigs = [
  {
    lessonIndex: 5,
    lessonNum: 1,
    id: 'lesson_2_1',
    keyTopicBadge: 'KEY TOPIC 2.1',
    title: 'KT2.1: The New Spirit of Enquiry: Humanism, The Printing Press & The Royal Society',
    enquiryQuestion:
      'How did new technologies and scientific societies challenge traditional medical authority?',
    specAnchor:
      'Medical Renaissance: Humanism; the printing press (c1440); the Royal Society (1660); microscopes and scientific observation.',
    tariff: 'Question 4: Explain Why [12 marks &bull; 15 mins]',
    examStem:
      'Explain why new ideas in medicine were able to spread more rapidly in the period c1500–c1700. [12 marks]',
    stimulus: ['The invention of the printing press (c1440)', 'The Royal Society (1660)'],
    connectives:
      'One main reason was that... &bull; For example, ... &bull; This was important because... &bull; Another key factor was... &bull; In particular, ... &bull; Overall, the most decisive reason was... because...',
    wordBank:
      'Gutenberg press (c1440) &bull; William Caxton (1476) &bull; clerical monopoly &bull; vernacular translations &bull; Royal Society (1660) &bull; Royal Charter (1662) &bull; Nullius in Verba &bull; Philosophical Transactions (1665) &bull; peer review &bull; animalcules &bull; Robert Hooke (1665)',
    timelineMission:
      'Turn to Pages 2–3 (Key Topic 2.1). In the drawing box, sketch Caxton’s printing press beside the Royal Society’s coat of arms (motto: Nullius in Verba). Annotate how printing removed the Church’s control over book production.',
    fourMark: {
      type: 'Similarity',
      question:
        'Explain one way in which ideas about the cause of disease in the Renaissance (c1500–c1700) were similar to ideas in the Medieval period (c1250–c1500). [4 marks]',
      hint: 'Focus on persistent beliefs in miasma, supernatural forces, and humoral imbalance despite new anatomical knowledge.',
      stems:
        'One way ideas were similar was... &bull; In the Medieval period... &bull; Similarly, in the Renaissance...',
    },
    leftPageQuip:
      'Gutenberg gave the world movable type; the Royal Society gave the world peer review. Neither cured a cold, but both destroyed ignorance.',
    rightPageQuip:
      'Nullius in Verba: "Take nobody’s word for it." A brilliant motto for science, and a great rule for evaluating historical sources.',
    linedLeftQuip:
      'The printing press ended the Church’s monopoly on text copying: for the first time, radical medical treatises could not simply be suppressed.',
    linedRightQuip:
      'Explain the mechanism: the Royal Society’s journal (Philosophical Transactions) allowed European scientists to confirm and repeat experiments.',
    stages: [
      {
        step: 1,
        dates: 'c1440–1476',
        title: 'The Movable Metal Printing Press',
        questionHeading: 'Why did printing break the clerical monopoly on medical learning?',
        paraBadge: '[1.1]',
        bullets: [
          'Casting lead type in Gutenberg’s German workshop',
          'Setting up William Caxton’s Westminster press',
          'Printing hundreds of identical illustrated medical books',
        ],
      },
      {
        step: 2,
        dates: 'c1500',
        title: 'Renaissance Humanism & Ancient Texts',
        questionHeading: 'How did humanism inspire physicians to challenge Galen?',
        paraBadge: '[1.2]',
        bullets: [
          'Translating original Greek manuscripts directly',
          'Spotting errors made by medieval monk copyists',
          'Urging independent questioning of ancient authority',
        ],
      },
      {
        step: 3,
        dates: '1660',
        title: 'Foundation of the Royal Society',
        questionHeading: 'Why was experimental observation central to the Royal Society?',
        paraBadge: '[1.3]',
        bullets: [
          'Meeting at Gresham College in London',
          'Receiving royal charter from King Charles II',
          'Adopting Latin motto "Nullius in Verba"',
        ],
      },
      {
        step: 4,
        dates: '1665',
        title: 'Philosophical Transactions & Peer Review',
        questionHeading: 'How did scientific journals speed up the exchange of medical knowledge?',
        paraBadge: '[1.4]',
        bullets: [
          'Publishing Henry Oldenburg’s monthly scientific journal',
          'Distributing experimental reports across Europe',
          'Debating laboratory findings among rival scientists',
        ],
      },
      {
        step: 5,
        dates: '1665–1670s',
        title: 'Early Microscopes & Animalcules',
        questionHeading: 'Why did 17th-century microscopes fail to transform medical treatment?',
        paraBadge: '[1.5]',
        bullets: [
          'Grinding curved glass lenses in brass cylinders',
          'Sketching flea legs in Hooke’s Micrographia',
          'Observing tiny swimming creatures in pond water',
        ],
      },
    ],
  },
  {
    lessonIndex: 6,
    lessonNum: 2,
    id: 'lesson_2_2',
    keyTopicBadge: 'KEY TOPIC 2.2',
    title: 'KT2.2: Thomas Sydenham & The Art of Bedside Observation',
    enquiryQuestion: 'Why was Thomas Sydenham known as the ‘English Hippocrates’?',
    specAnchor:
      'Thomas Sydenham (‘The English Hippocrates’); bedside observation; classification of diseases (Observationes Medicae, 1676); treatments.',
    tariff: 'Question 4: Explain Why [12 marks &bull; 15 mins]',
    examStem:
      'Explain why Thomas Sydenham was an important figure in the development of medicine in the seventeenth century. [12 marks]',
    stimulus: [
      'Observationes Medicae (1676)',
      'Treatments for smallpox and malaria (cinchona bark)',
    ],
    connectives:
      'One main reason was that... &bull; For example, ... &bull; This was important because... &bull; Another key factor was... &bull; In particular, ... &bull; Overall, the most decisive reason was... because...',
    wordBank:
      'Thomas Sydenham &bull; English Hippocrates &bull; bedside clinical observation &bull; Observationes Medicae (1676) &bull; species of disease &bull; scarlet fever vs. measles &bull; Cinchona bark (quinine) &bull; cool therapy for smallpox &bull; laudanum',
    timelineMission:
      'Turn to Pages 2–3 (Key Topic 2.2). In the drawing box, sketch Sydenham taking clinical bedside notes beside a patient with cool fresh air flowing through an open window. Annotate why his classification of diseases was revolutionary.',
    fourMark: {
      type: 'Difference',
      question:
        'Explain one way in which ideas about the treatment of disease in the Renaissance (c1500–c1700) were different from the Medieval period (c1250–c1500). [4 marks]',
      hint: 'Focus on Sydenham’s specific treatments (e.g. Peruvian bark for malaria) versus universal humoral purging.',
      stems:
        'One way treatments differed was... &bull; In the Medieval period... &bull; In contrast, in the Renaissance...',
    },
    leftPageQuip:
      'Sydenham told medical students: "Go to the bedside, there alone can you learn disease." Textbooks are great, but patients actually have the symptoms.',
    rightPageQuip:
      'Cool therapy for smallpox: opening windows and throwing off blankets. Radical in 1670, entirely sensible today.',
    linedLeftQuip:
      'Sydenham broke with tradition by treating diseases as specific external illnesses with unique characteristics, rather than unique personal humoral imbalances.',
    linedRightQuip:
      'Explain the impact: by proving cinchona bark cured only ague (malaria), Sydenham proved specific remedies could target specific diseases.',
    stages: [
      {
        step: 1,
        dates: '1660s',
        title: 'Rejecting Book Learning at the Bedside',
        questionHeading:
          'Why did Sydenham believe bedside observation surpassed textbook learning?',
        paraBadge: '[2.1]',
        bullets: [
          'Visiting sick London patients in private bedrooms',
          'Ignoring ancient scholastic university lectures',
          'Recording clinical symptoms in detailed notebooks',
        ],
      },
      {
        step: 2,
        dates: '1676',
        title: 'Observationes Medicae & Disease Classification',
        questionHeading:
          'How did classifying diseases challenge traditional individual humoral theory?',
        paraBadge: '[2.2]',
        bullets: [
          'Classifying distinct illnesses like modern botanists',
          'Distinguishing measles from scarlet fever rashes',
          'Publishing authoritative textbook used for two centuries',
        ],
      },
      {
        step: 3,
        dates: 'c1670s',
        title: 'Quinine & Cinchona Bark for Malaria',
        questionHeading: 'Why was the success of Peruvian bark a mortal blow to humoral balance?',
        paraBadge: '[2.3]',
        bullets: [
          'Importing bitter Peruvian tree bark to London',
          'Dosing marshland ague fevers with powdered bark',
          'Proving specific remedies cured specific diseases',
        ],
      },
      {
        step: 4,
        dates: 'c1670s',
        title: 'Cool Therapy for Smallpox Fevers',
        questionHeading: 'Why did Sydenham’s cool treatment drastically cut smallpox deaths?',
        paraBadge: '[2.4]',
        bullets: [
          'Throwing off heavy baronial wool blankets',
          'Opening window shutters to let in cold wind',
          'Giving cool drinks instead of scalding wines',
        ],
      },
      {
        step: 5,
        dates: '1680s',
        title: 'The Limits of Sydenham’s Legacy',
        questionHeading: 'Why did medical treatments remain mostly medieval despite Sydenham?',
        paraBadge: '[2.5]',
        bullets: [
          'Continuing to believe miasma caused epidemics',
          'Lacking laboratory tools to identify bacteria',
          'Leaving ordinary patient treatment largely unchanged',
        ],
      },
    ],
  },
  {
    lessonIndex: 7,
    lessonNum: 3,
    id: 'lesson_2_3',
    keyTopicBadge: 'KEY TOPIC 2.3',
    title: 'KT2.3: Andreas Vesalius & The Anatomical Revolution',
    enquiryQuestion: 'How did Andreas Vesalius revolutionize the study of human anatomy?',
    specAnchor:
      'Andreas Vesalius; The Fabric of the Human Body (De Humani Corporis Fabrica, 1543); human dissection; correcting Galen’s errors.',
    tariff: 'Question 4: Explain Why [12 marks &bull; 15 mins]',
    examStem:
      'Explain why Andreas Vesalius made significant breakthroughs in the understanding of human anatomy in the sixteenth century. [12 marks]',
    stimulus: [
      'De Humani Corporis Fabrica (1543)',
      'Dissection of human corpses rather than animals',
    ],
    connectives:
      'One main reason was that... &bull; For example, ... &bull; This was important because... &bull; Another key factor was... &bull; In particular, ... &bull; Overall, the most decisive reason was... because...',
    wordBank:
      'Andreas Vesalius &bull; Padua University &bull; human dissection &bull; De Humani Corporis Fabrica (1543) &bull; anatomical woodcuts &bull; jawbone (mandible) &bull; breastbone segments &bull; Barbary apes vs. humans &bull; Thomas Geminus',
    timelineMission:
      'Turn to Pages 2–3 (Key Topic 2.3). In the drawing box, sketch Vesalius standing over an anatomical dissection table holding a scalpel. Annotate two specific errors of Galen that he disproved.',
    fourMark: {
      type: 'Similarity',
      question:
        'Explain one way in which methods of anatomical training in the Renaissance (c1500–c1700) were similar to anatomical training in the nineteenth century. [4 marks]',
      hint: 'Focus on direct physical dissection of human bodies as the foundation of surgical education.',
      stems:
        'One way anatomical training was similar was... &bull; In the Renaissance period... &bull; Similarly, in the nineteenth century...',
    },
    leftPageQuip:
      'Vesalius proved Galen had been dissecting pigs, dogs, and apes for 1,300 years. The human jawbone is one piece, not two. Awkward for Galenists!',
    rightPageQuip:
      'De Humani Corporis Fabrica was published in 1543—the exact same year Copernicus published that the earth revolved around the sun. A good year for science.',
    linedLeftQuip:
      'Vesalius insisted that medical professors perform dissections themselves, rather than sitting in high chairs while barbers hacked away below.',
    linedRightQuip:
      'Explain the limitation: while Vesalius proved Galen wrong on over 200 anatomical points, his discoveries did not immediately cure a single disease.',
    stages: [
      {
        step: 1,
        dates: '1537',
        title: 'Professor of Surgery at Padua University',
        questionHeading: 'Why was a professor dissecting human bodies revolutionary in 1537?',
        paraBadge: '[3.1]',
        bullets: [
          'Climbing down from high lecturer chairs',
          'Picking up steel dissection scalpels directly',
          'Opening executed criminal bodies on wooden slabs',
        ],
      },
      {
        step: 2,
        dates: '1540',
        title: 'Proving Galen Wrong on Human Anatomy',
        questionHeading: 'How did Vesalius prove Galen had made anatomical mistakes?',
        paraBadge: '[3.2]',
        bullets: [
          'Showing human jawbones consist of one piece',
          'Proving human breastbones have three segments',
          'Demonstrating Galen dissected pigs and Barbary apes',
        ],
      },
      {
        step: 3,
        dates: '1543',
        title: 'Publication of De Humani Corporis Fabrica',
        questionHeading: 'Why was The Fabrica considered a masterpiece of Renaissance science?',
        paraBadge: '[3.3]',
        bullets: [
          'Printing seven massive anatomical volumes in Basel',
          'Engraving precise woodcut plates of human muscles',
          'Dedication presented to Holy Roman Emperor Charles V',
        ],
      },
      {
        step: 4,
        dates: '1545–1553',
        title: 'Thomas Geminus & Dissemination in Britain',
        questionHeading: 'How did English translations spread Vesalius’s ideas to barber-surgeons?',
        paraBadge: '[3.4]',
        bullets: [
          'Copying Vesalius’s woodcuts onto English copper plates',
          'Translating Latin descriptions into everyday English',
          'Selling anatomy manuals to London barber-surgeons',
        ],
      },
      {
        step: 5,
        dates: 'c1560',
        title: 'Fierce Opposition & Practical Limitations',
        questionHeading:
          'Why did Vesalius’s anatomical discoveries fail to save sick patients immediately?',
        paraBadge: '[3.5]',
        bullets: [
          'Facing angry attacks from conservative university professors',
          'Resigning academic post to serve royal courts',
          'Acknowledging anatomy did not yet cure living sickness',
        ],
      },
    ],
  },
  {
    lessonIndex: 8,
    lessonNum: 4,
    id: 'lesson_2_4',
    keyTopicBadge: 'KEY TOPIC 2.4',
    title: 'KT2.4: William Harvey & The Circulation of the Blood',
    enquiryQuestion:
      'How did William Harvey prove the circulation of the blood, and why was it resisted?',
    specAnchor:
      'William Harvey; circulation of the blood; De Motu Cordis (1628); the heart as a mechanical pump; veins and one-way valves; limitations.',
    tariff: 'Question 4: Explain Why [12 marks &bull; 15 mins]',
    examStem:
      'Explain why William Harvey’s discovery of the circulation of the blood was a major breakthrough in medicine in the seventeenth century. [12 marks]',
    stimulus: ['De Motu Cordis (1628)', 'Mechanical pump calculations and vein experiments'],
    connectives:
      'One main reason was that... &bull; For example, ... &bull; This was important because... &bull; Another key factor was... &bull; In particular, ... &bull; Overall, the most decisive reason was... because...',
    wordBank:
      'William Harvey &bull; De Motu Cordis (1628) &bull; circulation of the blood &bull; mechanical pump &bull; one-way pocket valves &bull; tied-arm ligature experiment &bull; quantitative calculation &bull; Marcello Malpighi (1661) &bull; capillaries',
    timelineMission:
      'Turn to Pages 2–3 (Key Topic 2.4). In the drawing box, sketch Harvey’s tied-arm ligature experiment showing blood pooling at the valves. Annotate his mathematical calculation proving Galen’s liver-blood theory was impossible.',
    fourMark: {
      type: 'Difference',
      question:
        'Explain one way in which ideas about the human body in the Renaissance (c1500–c1700) were different from the Medieval period (c1250–c1500). [4 marks]',
      hint: 'Contrast Harvey’s dynamic mechanical circulation model with Galen’s belief that the liver manufactured fresh blood consumed by organs.',
      stems:
        'One way ideas differed was... &bull; In the Medieval period... &bull; In contrast, in the Renaissance...',
    },
    leftPageQuip:
      'Galen thought the liver made fresh blood like a factory; Harvey calculated you would need to produce 250 litres a day. Mathematics: the ultimate Galen-slayer.',
    rightPageQuip:
      'Harvey tied a bandage around an arm and watched the veins swell. Simple experiment, monumental consequence for human physiology.',
    linedLeftQuip:
      'Harvey treated the heart as a mechanical pump, reflecting the Scientific Revolution’s obsession with clockwork mechanisms and engineering.',
    linedRightQuip:
      'Explain the resistance: contemporary physicians mocked Harvey as "circulator" (charlatan) because admitting he was right meant Galen was fundamentally wrong.',
    stages: [
      {
        step: 1,
        dates: 'c1615',
        title: 'Dissecting Cold-Blooded Animals & Human Cadavers',
        questionHeading: 'Why did Harvey study cold-blooded animals to understand the human heart?',
        paraBadge: '[4.1]',
        bullets: [
          'Observing slow heartbeats in live cold frogs',
          'Dissecting human corpses at the Royal College',
          'Mapping one-way pocket valves inside veins',
        ],
      },
      {
        step: 2,
        dates: '1620s',
        title: 'The Mechanical Pump & Quantitative Proof',
        questionHeading: 'How did mathematical calculations prove Galen’s theory impossible?',
        paraBadge: '[4.2]',
        bullets: [
          'Comparing the beating heart to mechanical water pumps',
          'Calculating liver could not produce gallons of blood daily',
          'Proving the same blood circulates continuously',
        ],
      },
      {
        step: 3,
        dates: '1628',
        title: 'Publication of De Motu Cordis',
        questionHeading: 'Why did Harvey publish his research abroad rather than in England?',
        paraBadge: '[4.3]',
        bullets: [
          'Publishing Latin treatise on heart motion in Frankfurt',
          'Demonstrating tied forearm vein experiments',
          'Dedicating medical breakthrough to King Charles I',
        ],
      },
      {
        step: 4,
        dates: '1630s–1650s',
        title: 'Ridicule by ‘Galenists’ & Lost Patients',
        questionHeading: 'Why was Harvey’s discovery fiercely rejected by established doctors?',
        paraBadge: '[4.4]',
        bullets: [
          'Being mocked as a madman by rival doctors',
          'Losing wealthy private London medical patients',
          'Waiting fifty years for Oxford university to teach it',
        ],
      },
      {
        step: 5,
        dates: '1661',
        title: 'Marcello Malpighi Confirms Capillaries',
        questionHeading: 'Why was the discovery of capillaries the final proof Harvey was right?',
        paraBadge: '[4.5]',
        bullets: [
          'Focusing microscope lenses on live frog lungs',
          'Discovering microscopic capillary vessels connecting arteries',
          'Confirming Harvey’s circulatory model beyond all doubt',
        ],
      },
    ],
  },
  {
    lessonIndex: 9,
    lessonNum: 5,
    id: 'lesson_2_5',
    keyTopicBadge: 'KEY TOPIC 2.5',
    title: 'KT2.5: Continuity in Treatment & The Great Plague of London (1665)',
    enquiryQuestion:
      'Why did treatments during the Great Plague of 1665 show so much continuity with 1348?',
    specAnchor:
      'Continuity in treatment and prevention; the Great Plague of London (1665); comparison with the Black Death; plague orders; quarantine.',
    tariff: 'Question 5/6: Thematic Essay [16 marks + 4 marks SPaG &bull; 25 mins]',
    examStem:
      '‘Approaches to dealing with the Great Plague in 1665 were completely different from approaches to the Black Death in 1348.’ How far do you agree? Explain your answer. [16 marks + 4 marks SPaG]',
    stimulus: [
      'Mayor’s plague orders and quarantine (red crosses)',
      'Beliefs in miasma, astrology, and supernatural causes',
    ],
    connectives:
      'One main reason was that... &bull; For example, ... &bull; This was important because... &bull; Another key factor was... &bull; In particular, ... &bull; Overall, the most decisive reason was... because...',
    wordBank:
      'Great Plague of London (1665) &bull; Lord Mayor’s orders &bull; searchers of the dead &bull; red crosses &bull; "Lord have mercy upon us" &bull; quarantine &bull; pest houses &bull; slaughter of 40,000 dogs and cats &bull; smoking tar barrels &bull; dead carts',
    timelineMission:
      'Turn to Pages 2–3 (Key Topic 2.5). In the drawing box, sketch a London front door marked with a red cross and guarded by a watchman. Annotate two continuities and two differences between 1348 and 1665.',
    fourMark: {
      type: 'Difference',
      question:
        'Explain one way in which government responses to the Great Plague of London (1665) were different from government responses to the Black Death (1348). [4 marks]',
      hint: 'Contrast systematic quarantine, red crosses, and pest houses in 1665 with rudimentary 1349 street cleaning.',
      stems:
        'One way government responses differed was... &bull; During the Black Death (1348)... &bull; In contrast, during the Great Plague (1665)...',
    },
    leftPageQuip:
      '1665: They killed 40,000 dogs and cats to stop the plague. The real culprits—the rat fleas—enjoyed a predator-free paradise.',
    rightPageQuip:
      'Red crosses on doors, armed watchmen, and smoking tar barrels. London in 1665 was a nightmare of disease, quarantine, and municipal panic.',
    linedLeftQuip:
      'Despite 150 years of Renaissance anatomy, when epidemic plague returned in 1665, treatments were virtually identical to 1348.',
    linedRightQuip:
      'Weigh continuity versus change: while government organization improved (quarantine, pest houses), medical understanding of the cause remained 100% medieval.',
    stages: [
      {
        step: 1,
        dates: 'Spring 1665',
        title: 'The Outbreak in St Giles-in-the-Fields',
        questionHeading:
          'Why did the rich flee London while the poor suffered catastrophic mortality?',
        paraBadge: '[5.1]',
        bullets: [
          'Spreading through poor crowded London parishes',
          'Fleeing town by carriage: King Charles II and physicians',
          'Leaving poor weavers trapped behind city gates',
        ],
      },
      {
        step: 2,
        dates: 'Summer 1665',
        title: 'Continuity of Humoral & Supernatural Beliefs',
        questionHeading: 'Why did people still use 14th-century remedies in 1665?',
        paraBadge: '[5.2]',
        bullets: [
          'Blaming planetary alignments and wrath of God',
          'Sniffing dried sponges soaked in vinegar',
          'Strapping plucked live pigeons to hot buboes',
        ],
      },
      {
        step: 3,
        dates: '1665',
        title: 'Mayor’s Orders & Pest Houses',
        questionHeading:
          'How did local government action in 1665 show greater organization than 1348?',
        paraBadge: '[5.3]',
        bullets: [
          'Painting red crosses on barred front doors',
          'Posting armed watchmen to enforce quarantine',
          'Building wooden pest houses outside city walls',
        ],
      },
      {
        step: 4,
        dates: '1665',
        title: 'Slaughter of Dogs & Smoking Tar Barrels',
        questionHeading: 'Why was slaughtering cats and dogs a tragic medical mistake?',
        paraBadge: '[5.4]',
        bullets: [
          'Killing forty thousand domestic dogs and cats',
          'Burning barrels of black tar at street crossings',
          'Smoking tobacco pipes to ward off foul miasma',
        ],
      },
      {
        step: 5,
        dates: 'Winter 1665',
        title: 'The Dead Carts & East Smithfield Pits',
        questionHeading: 'How devastating was the demographic impact of the 1665 epidemic?',
        paraBadge: '[5.5]',
        bullets: [
          'Ringing bell carts through silent dark lanes',
          'Calling "Bring out your dead" into empty alleys',
          'Burying one hundred thousand Londoners in mass trenches',
        ],
      },
    ],
  },
];

function renderSpinePage(cfg) {
  const { pageNum, lessonNum, keyTopicBadge, enquiryQuestion, specAnchor, stages, leftPageQuip } =
    cfg;

  const stagesHtml = stages
    .map((st, sIdx) => {
      const bulletsHtml = st.bullets
        .map(
          (b, idx) => `
            <div style="flex: 1; display: flex; align-items: center; padding: 0 5px; ${idx < 2 ? 'border-bottom: 0.8px solid #000000;' : ''}">
              <div style="display: flex; align-items: flex-start; gap: 4px; line-height: 1.18;">
                <span style="font-weight: 900; color: #000000; font-size: 7pt; line-height: 1.3;">&bull;</span>
                <span style="font-family: 'Inter', sans-serif; font-size: 8.8pt; font-weight: 800; color: #000000; word-break: break-word;">${b}</span>
              </div>
            </div>`,
        )
        .join('');

      const questionText = st.questionHeading || st.focusClue || st.title;
      const paraBadge = st.paraBadge || `[${lessonNum}.${sIdx + 1}]`;

      return `
        <div class="spine-stage-block" style="display: flex; flex-direction: column; flex: 1; min-height: 0; margin-bottom: 2.5px; border: 1.2px solid #000000; border-radius: 2px; overflow: hidden; background: #ffffff;">
          
          <!-- Full-Width Banner with Key Question Across Page (Strict Single-Line Fit) -->
          <div class="stage-banner" style="background: #000000; color: #ffffff; padding: 2px 7px; display: flex; align-items: center; border-bottom: 1.2px solid #000000; min-height: 20px; box-sizing: border-box;">
            <div style="display: flex; align-items: center; gap: 6px; min-width: 0; flex: 1; overflow: hidden;">
              <span style="background: #ffffff; color: #000000; font-family: 'Inter', sans-serif; font-size: 8.2pt; font-weight: 900; padding: 0.6px 6px; border-radius: 2px; white-space: nowrap; flex-shrink: 0;">
                ${st.step || sIdx + 1}
              </span>
              <span style="font-family: 'Inter', sans-serif; font-size: 8.4pt; font-weight: 800; color: #ffffff; white-space: nowrap; flex-shrink: 0;">
                ${st.dates}
              </span>
              <span style="color: #ffffff; font-size: 7.5pt; flex-shrink: 0;">&bull;</span>
              <span style="font-family: 'Inter', sans-serif; font-size: 8.6pt; font-weight: 800; color: #ffffff; white-space: nowrap; overflow: hidden; letter-spacing: -0.1px;">
                ${questionText}
              </span>
            </div>
            <span style="background: #ffffff; color: #000000; font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 900; padding: 0.5px 5px; border-radius: 2px; margin-left: 6px; white-space: nowrap; flex-shrink: 0;">
              ${paraBadge}
            </span>
          </div>

          <!-- Content Row: Left 3-Zone Trigger Spine (44mm) & Right Ruled Writing Lines (~154mm) -->
          <div style="display: flex; flex: 1; min-height: 0; align-items: stretch;">
            
            <!-- Left Column: High-Visibility 44mm Trigger Spine (Pure White Canvas, Zero Grey Dithering) -->
            <div style="width: 44mm; flex-shrink: 0; background: #ffffff; display: flex; flex-direction: column; border-right: 1.2px solid #000000; box-sizing: border-box;">
              ${bulletsHtml}
            </div>

            <!-- Right Column: 6 Ruled Note-Taking Lines (Expanded Writing Space) -->
            <div style="flex: 1; display: flex; flex-direction: column; background: #ffffff; margin: 0; padding: 0;">
              <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
            </div>

          </div>
        </div>`;
    })
    .join('');

  return `
  <!-- ------------------------------------------------------------------ -->
  <!-- LESSON ENQUIRY NOTEBOOK WITH CHRONOLOGICAL SPINE (PAGE ${pageNum})         -->
  <!-- ------------------------------------------------------------------ -->
  <div class="page page-container verso-page" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      
      <!-- Lesson Header with Inquiry Question Title -->
      <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 2px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 8.0pt; font-weight: 900; letter-spacing: 0.5px; text-transform: uppercase; background: #000000; color: #ffffff; border: 1.2px solid #000000; padding: 1.5px 7px; border-radius: 2px;">
            ${keyTopicBadge} &bull; LESSON NOTEBOOK
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 8.0pt; font-weight: 800; text-transform: uppercase; color: #000000;">
            EDEXCEL GCSE (9–1) HISTORY &bull; PAPER 1 (1HI0/11)
          </span>
        </div>
        <h2 style="font-family: 'Playfair Display', serif; font-size: 12.2pt; color: #000000; margin: 1px 0 1px 0; font-weight: 900; line-height: 1.2;">
          ${enquiryQuestion}
        </h2>
      </div>

      <!-- Core Specification Focus Strip -->
      <div style="border: 1px solid #000000; border-left: 3.5px solid #000000; padding: 2.5px 7px; background: #ffffff; margin-bottom: 2px; font-family: 'Inter', sans-serif; font-size: 8.4pt; line-height: 1.26; color: #000000;">
        <strong style="color: #000000;">Core Specification Focus:</strong> ${specAnchor}
      </div>

      <!-- Chronological Inquiry Spine & Note-Taking Canvas -->
      <div style="flex: 1; display: flex; flex-direction: column; min-height: 0; margin-top: 2px;">
        <!-- 5 Chronological Stages with Spine on Left and Ruled Lines on Right -->
        <div style="display: flex; flex-direction: column; flex: 1; min-height: 0; gap: 0;">
          ${stagesHtml}
        </div>
      </div>

      ${renderFooterStrip(pageNum, leftPageQuip, 20)}
    </div>
  </div>`;
}

function buildRenaissanceTwoPageWorkbook(unitData, period) {
  const coverImgBase64 =
    getBase64Image('units/edexcel_medicine/assets/authentic_renaissance.jpg') ||
    getBase64Image('/images/authentic_renaissance.jpg') ||
    '';

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Key Topic 2: The Medical Renaissance in Britain, c1500–c1700 Workbook</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:wght@700;800;900&display=swap" rel="stylesheet">
  <style>
    *, *:before, *:after {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
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
      border-bottom: 1.2px solid #000000;
      height: 7.8mm;
      min-height: 7.8mm;
      max-height: 7.8mm;
      width: 100%;
      box-sizing: border-box;
      margin: 0;
      flex-shrink: 0;
    }
    .task-line-dotted {
      border-bottom: 1.2px dotted #000000;
      height: 7.4mm;
      width: 100%;
      box-sizing: border-box;
      margin: 0;
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
  // PAGE 1: FRONT COVER
  // ====================================================================
  html += `
  <div class="page page-container" id="page-1" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Top Departmental Branding with Customizer Hook -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #0f284e; padding-bottom: 4px; margin-bottom: 8px;">
        <div data-department-name="The History Department">
          <span style="font-family: 'Inter', sans-serif; font-size: 11pt; font-weight: 900; color: #0f284e; text-transform: uppercase; letter-spacing: 1px;">
            <span class="school-brand-target">The History Department</span>
          </span>
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 8.5pt; font-weight: 800; color: #0f284e;">
          EDEXCEL GCSE (9–1) HISTORY &bull; PAPER 1
        </div>
      </div>

      <!-- Unit Title & Subtitle Banner -->
      <div style="text-align: center; margin-bottom: 8px;">
        <span style="display: inline-block; font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 900; letter-spacing: 1.5px; text-transform: uppercase; border: 1.5px solid #0f284e; background: #0f284e; color: #ffffff; padding: 2px 10px; border-radius: 3px; margin-bottom: 4px;">
          KEY TOPIC 2 &bull; PUPIL WORKBOOK
        </span>
        <h1 style="font-family: 'Playfair Display', serif; font-size: 20pt; font-weight: 900; color: #0f284e; margin: 4px 0 2px 0; line-height: 1.15; letter-spacing: -0.5px;">
          The Medical Renaissance in Britain, c1500–c1700
        </h1>
        <p style="font-family: 'Georgia', serif; font-size: 9pt; color: #334155; margin: 0; font-style: italic; font-weight: 600;">
          Humanism, Anatomy (Vesalius), Circulation (Harvey), Observation (Sydenham) &amp; The Great Plague
        </p>
      </div>

      <!-- Prominent Primary Visual Source Centerpiece (Rich Authentic Colour) -->
      <div style="margin: 2px 0 5px 0; border: 1.5px solid #0f284e; border-radius: 4px; overflow: hidden; background: #ffffff;">
        <div style="background: #fcfbf9; display: flex; justify-content: center; align-items: center; padding: 2px 4px;">
          <img src="${coverImgBase64}" alt="Andreas Vesalius Dissecting a Female Cadaver (1543)" style="width: 100%; height: 93mm; object-fit: cover; object-position: center 30%; display: block; margin: 0 auto; border: 1.2px solid #0f284e; border-radius: 2px; box-shadow: 0 2px 6px rgba(15,40,78,0.22);">
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #0f284e; padding: 3px 8px; border-top: 1.5px solid #0f284e; background: #ffffff;">
          <span><strong>Primary Visual Evidence:</strong> Title Page of Andreas Vesalius, <em>De Humani Corporis Fabrica</em> (1543)</span>
          <span style="font-weight: 700; color: #475569;">CONTEMPORARY PRINT ARCHIVE</span>
        </div>
      </div>

      <!-- Pupil Identification & Target Setting Box -->
      <div style="border: 1.5px solid #0f284e; border-radius: 4px; padding: 4px 10px; background: #ffffff; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 14px; align-items: center; margin-bottom: 6px;">
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #0f284e; text-transform: uppercase; margin-right: 8px;">Pupil Name:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #0f284e; height: 12px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #0f284e; text-transform: uppercase; margin-right: 8px;">Target:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #0f284e; height: 12px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #0f284e; text-transform: uppercase; margin-right: 8px;">Class:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #0f284e; height: 12px;"></div>
        </div>
      </div>

      <!-- Course Specification Curriculum Tracking Table -->
      <div style="border: 1.5px solid #0f284e; border-radius: 4px; overflow: hidden; margin-bottom: 4px;">
        <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif; font-size: 8pt;">
          <thead>
            <tr style="background: #0f284e; color: #ffffff; text-transform: uppercase; letter-spacing: 0.5px;">
              <th style="padding: 4px 8px; text-align: left; width: 78%; font-size: 7.5pt; font-weight: 800;">
                Key Topic 2 Specification Framework (1HI0/11)
              </th>
              <th style="padding: 4px 8px; text-align: center; width: 11%; font-size: 7.5pt; font-weight: 800; border-left: 1px solid rgba(255,255,255,0.25);">
                Lesson Done
              </th>
              <th style="padding: 4px 8px; text-align: center; width: 11%; font-size: 7.5pt; font-weight: 800; border-left: 1px solid rgba(255,255,255,0.25);">
                Quiz [10]
              </th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #cbd5e1;">
              <td style="padding: 18.5px 10px; border-right: 1.2px solid #cbd5e1;">
                <div style="font-size: 8.8pt; font-weight: 800; color: #0f284e; line-height: 1.25;">
                  Key Topic 2.1: The New Spirit of Enquiry: Humanism, The Printing Press &amp; The Royal Society
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 8pt; font-style: italic; color: #475569; margin-top: 1.5px; line-height: 1.25;">
                  How did movable type (c1440), humanism, and the Royal Society (1660) challenge ancient dogma?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #cbd5e1;">
                <div style="width: 16px; height: 16px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 16px; height: 16px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #cbd5e1;">
              <td style="padding: 18.5px 10px; border-right: 1.2px solid #cbd5e1;">
                <div style="font-size: 8.8pt; font-weight: 800; color: #0f284e; line-height: 1.25;">
                  Key Topic 2.2: Thomas Sydenham &amp; The Art of Bedside Observation
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 8pt; font-style: italic; color: #475569; margin-top: 1.5px; line-height: 1.25;">
                  Why was Sydenham called the ‘English Hippocrates’, and how did Observationes Medicae classify illness?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #cbd5e1;">
                <div style="width: 16px; height: 16px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 16px; height: 16px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #cbd5e1;">
              <td style="padding: 18.5px 10px; border-right: 1.2px solid #cbd5e1;">
                <div style="font-size: 8.8pt; font-weight: 800; color: #0f284e; line-height: 1.25;">
                  Key Topic 2.3: Andreas Vesalius &amp; The Anatomical Revolution
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 8pt; font-style: italic; color: #475569; margin-top: 1.5px; line-height: 1.25;">
                  How did De Humani Corporis Fabrica (1543) correct over 200 of Galen’s anatomical errors?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #cbd5e1;">
                <div style="width: 16px; height: 16px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 16px; height: 16px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #cbd5e1;">
              <td style="padding: 18.5px 10px; border-right: 1.2px solid #cbd5e1;">
                <div style="font-size: 8.8pt; font-weight: 800; color: #0f284e; line-height: 1.25;">
                  Key Topic 2.4: William Harvey &amp; The Circulation of the Blood
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 8pt; font-style: italic; color: #475569; margin-top: 1.5px; line-height: 1.25;">
                  How did De Motu Cordis (1628) prove blood circulates through the heart as a mechanical pump?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #cbd5e1;">
                <div style="width: 16px; height: 16px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 16px; height: 16px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #cbd5e1;">
              <td style="padding: 18.5px 10px; border-right: 1.2px solid #cbd5e1;">
                <div style="font-size: 8.8pt; font-weight: 800; color: #0f284e; line-height: 1.25;">
                  Key Topic 2.5: Continuity in Treatment &amp; The Great Plague of London (1665)
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 8pt; font-style: italic; color: #475569; margin-top: 1.5px; line-height: 1.25;">
                  Why did red crosses, quarantine, and humoral remedies in 1665 show so much continuity with 1348?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #cbd5e1;">
                <div style="width: 16px; height: 16px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 16px; height: 16px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      ${renderFooterStrip(1, 'The History Revision Hub &bull; GCSE History Paper 1 &bull; Key Topic 2 Pupil Workbook', 20)}
    </div>
  </div>
`;

  // ====================================================================
  // PAGES 2–3: PANORAMIC LIVING TIMELINE (8 HISTORICAL MILESTONES)
  // OPEN DRAWING CANVAS (ZERO ENCLOSING BOX BORDERS)
  // ====================================================================
  html += `
  <div class="page page-container verso-page" id="page-2" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div>
        <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 4px;">
          <h2 style="font-family: 'Playfair Display', serif; font-size: 11pt; color: #000000; margin: 0; font-weight: 800;">
            Living Timeline &bull; Part 1: Scientific Breakthroughs &amp; Anatomy (c1440–1628)
          </h2>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
            Chronological Inquiry &bull; Milestones 1–4
          </span>
        </div>

        <div style="border: 1.2px solid #000000; border-radius: 3px; background: #ffffff; padding: 3px 6px; margin-bottom: 5px; font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #000000;">
          <strong style="color: #000000;">Living Timeline Dual-Coding Protocol:</strong> Complete each milestone sketchpad using dual-coding (combining visual storytelling symbols, causal arrows, and dates) to master the chronological spine across the centre-fold.
        </div>
      </div>

      <!-- 4 Milestones with Open Drawing Area (Zero Box Lines) -->
      <div style="display: flex; flex-direction: column; flex: 1; justify-content: space-between; min-height: 0;">
        
        <!-- Milestone 1: c. 1440–1476 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 9.6pt; font-weight: 900; color: #000000;">
              c. 1440–1476 &bull; The Printing Press: Gutenberg &amp; William Caxton
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 800; background: #000000; color: #ffffff; border: 1px solid #000000; padding: 1px 6px; border-radius: 2px;">Key Topic 2.1</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.6pt; color: #000000; margin: 0; line-height: 1.3;">
            Johannes Gutenberg invents movable metal type in Mainz; William Caxton establishes England’s first press at Westminster in 1476. Medical texts can now be mass-produced with identical diagrams, shattering the Catholic Church’s clerical monopoly on manuscript copying.
          </p>
        </div>

        <!-- Milestone 2: 1543 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 9.6pt; font-weight: 900; color: #000000;">
              1543 &bull; Andreas Vesalius Publishes De Humani Corporis Fabrica
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 800; background: #000000; color: #ffffff; border: 1px solid #000000; padding: 1px 6px; border-radius: 2px;">Key Topic 2.3</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.6pt; color: #000000; margin: 0; line-height: 1.3;">
            At the University of Padua, professor Andreas Vesalius carries out human dissections personally. The Fabric of the Human Body features precise woodcuts disproving over 200 of Galen’s errors, proving the human jawbone is one piece and the breastbone has three segments.
          </p>
        </div>

        <!-- Milestone 3: 1628 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 9.6pt; font-weight: 900; color: #000000;">
              1628 &bull; William Harvey Publishes De Motu Cordis
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 800; background: #000000; color: #ffffff; border: 1px solid #000000; padding: 1px 6px; border-radius: 2px;">Key Topic 2.4</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.6pt; color: #000000; margin: 0; line-height: 1.3;">
            Royal physician William Harvey publishes On the Motion of the Heart. Through dissection of cold-blooded reptiles and mathematical calculations, he proves that the heart acts as a mechanical pump recirculating blood continuously through one-way pocket valves.
          </p>
        </div>

        <!-- Milestone 4: 1660 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 9.6pt; font-weight: 900; color: #000000;">
              1660 &bull; Foundation of the Royal Society &amp; Nullius in Verba
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 800; background: #000000; color: #ffffff; border: 1px solid #000000; padding: 1px 6px; border-radius: 2px;">Key Topic 2.1</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.6pt; color: #000000; margin: 0; line-height: 1.3;">
            The Royal Society is founded at Gresham College, London, receiving a royal charter from Charles II in 1662. Adopting the motto Nullius in Verba (‘Take nobody’s word for it’), it launches Philosophical Transactions in 1665 to publish and peer-review scientific experiments.
          </p>
        </div>

      </div>

      ${renderFooterStrip(2, 'Vesalius proved Galen had been dissecting pigs, dogs, and apes for 1,300 years. The human jawbone is one piece, not two.', 20)}
    </div>
  </div>

  <!-- PAGE 3: LIVING TIMELINE PART 2 -->
  <div class="page page-container recto-page" id="page-3" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div>
        <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 4px;">
          <h2 style="font-family: 'Playfair Display', serif; font-size: 11pt; color: #000000; margin: 0; font-weight: 800;">
            Living Timeline &bull; Part 2: Observation, Plagues &amp; Microscopic Discoveries (1661–1676)
          </h2>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
            Chronological Inquiry &bull; Milestones 5–8
          </span>
        </div>

        <div style="border: 1.2px solid #000000; border-radius: 3px; background: #ffffff; padding: 3px 6px; margin-bottom: 5px; font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #000000;">
          <strong style="color: #000000;">Living Timeline Dual-Coding Protocol:</strong> Draw visual symbols for clinical bedside observation, London pest houses, microscope animalcules, and Sydenham’s disease classification across the timeline below.
        </div>
      </div>

      <!-- 4 Milestones with Open Drawing Area (Zero Box Lines) -->
      <div style="display: flex; flex-direction: column; flex: 1; justify-content: space-between; min-height: 0;">
        
        <!-- Milestone 5: 1661 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 9.6pt; font-weight: 900; color: #000000;">
              1661 &bull; Marcello Malpighi Observes Capillaries Under the Microscope
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 800; background: #000000; color: #ffffff; border: 1px solid #000000; padding: 1px 6px; border-radius: 2px;">Key Topic 2.4</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.6pt; color: #000000; margin: 0; line-height: 1.3;">
            Using an early compound microscope, Italian biologist Marcello Malpighi observes blood passing through microscopic capillaries connecting arteries to veins in a frog’s lungs. This provides the definitive optical proof for William Harvey’s circulatory model.
          </p>
        </div>

        <!-- Milestone 6: 1665 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 9.6pt; font-weight: 900; color: #000000;">
              1665 &bull; The Great Plague of London: Red Crosses &amp; Pest Houses
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 800; background: #000000; color: #ffffff; border: 1px solid #000000; padding: 1px 6px; border-radius: 2px;">Key Topic 2.5</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.6pt; color: #000000; margin: 0; line-height: 1.3;">
            Bubonic plague strikes London, killing approximately 100,000 people (20% of the city). The Lord Mayor orders watchmen to lock infected families inside houses marked with red crosses and ‘Lord have mercy upon us’. Over 40,000 stray dogs and cats are slaughtered.
          </p>
        </div>

        <!-- Milestone 7: 1665 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 9.6pt; font-weight: 900; color: #000000;">
              1665 &bull; Robert Hooke Publishes Micrographia
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 800; background: #000000; color: #ffffff; border: 1px solid #000000; padding: 1px 6px; border-radius: 2px;">Key Topic 2.1</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.6pt; color: #000000; margin: 0; line-height: 1.3;">
            Robert Hooke presents detailed microscopic drawings of fleas, cork cells, and fly eyes to the Royal Society. While microscopes prove the existence of an invisible world, lenses are too weak to reveal bacteria or germs, leaving medical treatments largely unchanged.
          </p>
        </div>

        <!-- Milestone 8: 1676 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 9.6pt; font-weight: 900; color: #000000;">
              1676 &bull; Thomas Sydenham Publishes Observationes Medicae
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 800; background: #000000; color: #ffffff; border: 1px solid #000000; padding: 1px 6px; border-radius: 2px;">Key Topic 2.2</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.6pt; color: #000000; margin: 0; line-height: 1.3;">
            Known as the ‘English Hippocrates’, Thomas Sydenham urges doctors to base treatments on bedside clinical observation. In Observationes Medicae, he classifies illnesses into distinct species, distinguishes measles from scarlet fever, and popularises cinchona bark (quinine) for malaria.
          </p>
        </div>

      </div>

      ${renderFooterStrip(3, 'Nullius in Verba: "Take nobody’s word for it." A brilliant motto for science, and a great rule for evaluating historical sources.', 20)}
    </div>
  </div>
`;

  // ====================================================================
  // PAGES 4–18: 5 DEDICATED THREE-PAGE ENQUIRY MODULES (15 PAGES TOTAL)
  // Page 1: Chronological Inquiry Spine & Exposition Notes (Left/Right)
  // Page 2: Extended Writing Part 1 (18 task lines, stimulus, writing frames & vocab @ 8.2pt)
  // Page 3: Extended Writing Part 2 (16 continuation lines + Question 3 Similarity/Difference [4 marks])
  // ====================================================================
  renaissanceConfigs.forEach((cfg, idx) => {
    const spinePageNum = 4 + idx * 3; // 4, 7, 10, 13, 16
    const questionPart1PageNum = spinePageNum + 1; // 5, 8, 11, 14, 17
    const questionPart2PageNum = spinePageNum + 2; // 6, 9, 12, 15, 18

    // PAGE 1 OF ENQUIRY: CHRONOLOGICAL INQUIRY SPINE
    html += renderSpinePage({ ...cfg, pageNum: spinePageNum });

    // PAGE 2 OF ENQUIRY: EXAM QUESTION PART 1 (18 TASK LINES, TIMELINE MISSION, PROMINENT TYPOGRAPHY)
    const part1TaskLines = Array.from(
      { length: 18 },
      () => '<div class="task-line" style="height: 7.8mm;"></div>',
    ).join('');

    html += `
  <div class="page page-container" id="page-${questionPart1PageNum}">
    <div class="page-body-full">
      <div>
        <!-- Exam Header -->
        <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 5px;">
          <h2 style="font-family: 'Playfair Display', serif; font-size: 11pt; color: #000000; margin: 0; font-weight: 800;">
            ${cfg.tariff}
          </h2>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
            Extended Writing Assessment
          </span>
        </div>

        <!-- Question Stem & Stimulus Box -->
        <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 5px 8px; background: #ffffff; margin-bottom: 5px;">
          <div style="font-family: 'Playfair Display', serif; font-size: 9.2pt; font-weight: 800; color: #000000; margin-bottom: 4px; line-height: 1.28;">
            ${cfg.examStem}
          </div>
          <div style="display: flex; align-items: center; gap: 8px; font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #000000;">
            <strong>Stimulus:</strong>
            <span style="border: 1px solid #000000; padding: 1px 6px; border-radius: 2px; font-weight: 700;">${cfg.stimulus[0]}</span>
            <span style="border: 1px solid #000000; padding: 1px 6px; border-radius: 2px; font-weight: 700;">${cfg.stimulus[1]}</span>
            <span style="font-style: italic; color: #333333;">(You must also use information of your own)</span>
          </div>
        </div>

        <!-- Accessible Writing Frames & Key Vocabulary Bank (High-Legibility 8.2pt Font) -->
        <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 5px 8px; background: #ffffff; margin-bottom: 4px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
          <div>
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; text-transform: uppercase; display: block; margin-bottom: 2px; color: #000000;">Accessible Writing Frames:</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 8.2pt; font-style: italic; line-height: 1.32; display: block; color: #111111;">${cfg.connectives}</span>
          </div>
          <div>
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; text-transform: uppercase; display: block; margin-bottom: 2px; color: #000000;">Key Vocabulary Bank:</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 8.2pt; line-height: 1.32; display: block; color: #111111;">${cfg.wordBank}</span>
          </div>
        </div>

        <!-- Ruled Task Lines Prompt -->
        <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-style: italic; color: #222222; margin: 2px 0 2px 0; display: flex; justify-content: space-between;">
          <span><strong>Write your response in the space provided below:</strong></span>
          <span style="font-size: 7.0pt; color: #555555; font-weight: 600;">(Response continues on facing page)</span>
        </div>
      </div>

      <!-- 18 Ruled Task Lines for Extended Writing -->
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; margin: 1px 0 3px 0;">
${part1TaskLines}
      </div>

      <!-- Timeline Mission -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 4px 8px; background: #ffffff; display: flex; justify-content: space-between; align-items: center; margin-top: 2px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; background: #000000; color: #ffffff; padding: 2px 6px; border-radius: 2px; text-transform: uppercase; white-space: nowrap;">
            Timeline Mission
          </span>
          <span style="font-family: 'Georgia', serif; font-size: 7.4pt; line-height: 1.25; color: #000000;">
            ${cfg.timelineMission}
          </span>
        </div>
        <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 2px 6px; font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 800; white-space: nowrap;">
          [ &nbsp;&nbsp; ] Done
        </div>
      </div>

      ${renderFooterStrip(questionPart1PageNum, cfg.rightPageQuip, 20)}
    </div>
  </div>
`;

    // PAGE 3 OF ENQUIRY: EXAM QUESTION PART 2 (16 CONTINUATION LINES + QUESTION 3 [4 MARKS] AT BOTTOM)
    const part2ContinuationLines = Array.from(
      { length: 16 },
      () => '<div class="task-line" style="height: 7.8mm;"></div>',
    ).join('');

    const q3TaskLines = Array.from(
      { length: 6 },
      () => '<div class="task-line" style="height: 7.8mm;"></div>',
    ).join('');

    html += `
  <div class="page page-container" id="page-${questionPart2PageNum}">
    <div class="page-body-full" style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
      <div>
        <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 4px;">
          <h2 style="font-family: 'Playfair Display', serif; font-size: 10.5pt; color: #000000; margin: 0; font-weight: 800;">
            ${cfg.title}
          </h2>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
            ${cfg.tariff.split(':')[0]} Continued
          </span>
        </div>

        <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-style: italic; color: #333333; margin-bottom: 2px;">
          Continue your response to ${cfg.tariff.split(':')[0]} below:
        </div>
      </div>

      <!-- 16 Continuation Lines -->
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; margin: 1px 0 4px 0;">
        ${part2ContinuationLines}
      </div>

      <!-- Question 3: Similarity / Difference [4 marks] At Bottom of Page -->
      <div style="border-top: 2px solid #000000; padding-top: 4px; margin-top: 2px; display: flex; flex-direction: column;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; text-transform: uppercase; letter-spacing: 0.5px;">
            &bull; Question 3: Explain One ${cfg.fourMark.type} [4 marks]
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px; text-transform: uppercase;">
            Score: [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 4 ] &bull; 5 Mins
          </span>
        </div>
        <p style="font-family: 'Playfair Display', serif; font-size: 8.8pt; font-weight: 800; color: #000000; margin: 0 0 2px 0; line-height: 1.25;">
          ${cfg.fourMark.question}
        </p>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-style: italic; color: #475569; margin-bottom: 2px;">
          ${cfg.fourMark.hint}
        </div>
        <div style="display: flex; flex-direction: column; margin: 1px 0 0 0;">
          ${q3TaskLines}
        </div>
      </div>

      ${renderFooterStrip(questionPart2PageNum, cfg.linedRightQuip, 20)}
    </div>
  </div>
`;
  });

  // ====================================================================
  // PAGE 19: DEDICATED BRITISH EXERCISE NOTES & REVISION STRATEGY PAGE
  // ====================================================================
  html += renderNotesPage(
    19,
    'Notes: Record key causal links, essay plans, and teacher feedback for this unit.',
    20,
  );

  // ====================================================================
  // PAGE 20: OUTSIDE BACK COVER
  // ====================================================================
  html += `
  <div class="page page-container verso-page" id="page-20" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Top Departmental Branding -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #0f284e; padding-bottom: 3px;">
        <div data-department-name="The History Department">
          <span style="font-family: 'Inter', sans-serif; font-size: 10pt; font-weight: 900; color: #0f284e; text-transform: uppercase; letter-spacing: 0.8px;">
            <span class="school-brand-target">The History Department</span>
          </span>
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 8.5pt; font-weight: 700; color: #0f284e;">
          KEY TOPIC 2 ASSESSMENT RECORD &bull; c1500–c1700
        </div>
      </div>

      <!-- Student Target Grade Strip -->
      <div style="border: 1.5px solid #0f284e; border-radius: 4px; padding: 6px 12px; background: #ffffff; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 16px; align-items: center;">
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f284e; text-transform: uppercase; margin-right: 8px;">Pupil Name:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #0f284e; height: 14px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f284e; text-transform: uppercase; margin-right: 8px;">Target:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #0f284e; height: 14px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f284e; text-transform: uppercase; margin-right: 8px;">Current Grade:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #0f284e; height: 14px;"></div>
        </div>
      </div>

      <!-- Expanded Key Topic 2 Assessment Record Table (10 Questions + Cumulative Total) -->
      <div style="border: 1.5px solid #0f284e; border-radius: 4px; overflow: hidden; margin-bottom: 6px;">
        <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif;">
          <thead>
            <tr style="background: #0f284e; color: #ffffff; text-transform: uppercase; letter-spacing: 0.5px;">
              <th style="padding: 7px 6px; text-align: center; width: 8%; font-size: 7.8pt; font-weight: 800;">Enquiry</th>
              <th style="padding: 7px 10px; text-align: left; width: 36%; font-size: 7.8pt; font-weight: 800; border-left: 1px solid rgba(255,255,255,0.25);">Assessment Component Focus</th>
              <th style="padding: 7px 6px; text-align: center; width: 7%; font-size: 7.8pt; font-weight: 800; border-left: 1px solid rgba(255,255,255,0.25);">Page</th>
              <th style="padding: 7px 6px; text-align: center; width: 12%; font-size: 7.8pt; font-weight: 800; border-left: 1px solid rgba(255,255,255,0.25);">Score</th>
              <th style="padding: 7px 10px; text-align: left; width: 37%; font-size: 7.8pt; font-weight: 800; border-left: 1px solid rgba(255,255,255,0.25);">Teacher Comment &amp; Next Steps</th>
            </tr>
          </thead>
          <tbody>
            <!-- KT2.1: The New Spirit of Enquiry -->
            <tr style="border-bottom: 1px dashed #cbd5e1;">
              <td rowspan="2" style="padding: 12px 6px; text-align: center; font-weight: 900; font-size: 9.5pt; border-right: 1.2px solid #cbd5e1; background: #f0f4f9; color: #0f284e; vertical-align: middle;">
                KT2.1
              </td>
              <td style="padding: 13px 10px; font-weight: 600; line-height: 1.35; border-right: 1.2px solid #cbd5e1; font-size: 8.2pt; color: #0f284e;">
                <strong>Q4:</strong> Explain Why New Medical Ideas Spread More Rapidly c1500–c1700
              </td>
              <td style="padding: 13px 6px; text-align: center; font-weight: 800; font-size: 8.5pt; border-right: 1.2px solid #cbd5e1; white-space: nowrap; color: #0f284e;">
                p. 5–6
              </td>
              <td style="padding: 13px 6px; text-align: center; font-size: 10pt; font-weight: 900; border-right: 1.2px solid #cbd5e1; white-space: nowrap; color: #0f284e;">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 12
              </td>
              <td rowspan="2" style="padding: 10px 10px; vertical-align: middle; font-size: 8pt; background: #ffffff;">
                <div style="display: flex; flex-direction: column; justify-content: space-around; height: 20.5mm;">
                  <div style="border-bottom: 1px dotted #cbd5e1; height: 6.8mm;"></div>
                  <div style="border-bottom: 1px dotted #cbd5e1; height: 6.8mm;"></div>
                  <div style="border-bottom: 1px dotted #cbd5e1; height: 6.8mm;"></div>
                </div>
              </td>
            </tr>
            <tr style="border-bottom: 1.5px solid #0f284e;">
              <td style="padding: 13px 10px; font-weight: 600; line-height: 1.35; border-right: 1.2px solid #cbd5e1; font-size: 8.2pt; color: #0f284e;">
                <strong>Q3:</strong> Explain One Similarity (Ideas on Cause: Renaissance vs Medieval)
              </td>
              <td style="padding: 13px 6px; text-align: center; font-weight: 800; font-size: 8.5pt; border-right: 1.2px solid #cbd5e1; white-space: nowrap; color: #0f284e;">
                p. 6
              </td>
              <td style="padding: 13px 6px; text-align: center; font-size: 10pt; font-weight: 900; border-right: 1.2px solid #cbd5e1; white-space: nowrap; color: #0f284e;">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 4
              </td>
            </tr>

            <!-- KT2.2: Thomas Sydenham -->
            <tr style="border-bottom: 1px dashed #cbd5e1;">
              <td rowspan="2" style="padding: 12px 6px; text-align: center; font-weight: 900; font-size: 9.5pt; border-right: 1.2px solid #cbd5e1; background: #f0f4f9; color: #0f284e; vertical-align: middle;">
                KT2.2
              </td>
              <td style="padding: 13px 10px; font-weight: 600; line-height: 1.35; border-right: 1.2px solid #cbd5e1; font-size: 8.2pt; color: #0f284e;">
                <strong>Q4:</strong> Explain Why Thomas Sydenham Was an Important Figure
              </td>
              <td style="padding: 13px 6px; text-align: center; font-weight: 800; font-size: 8.5pt; border-right: 1.2px solid #cbd5e1; white-space: nowrap; color: #0f284e;">
                p. 8–9
              </td>
              <td style="padding: 13px 6px; text-align: center; font-size: 10pt; font-weight: 900; border-right: 1.2px solid #cbd5e1; white-space: nowrap; color: #0f284e;">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 12
              </td>
              <td rowspan="2" style="padding: 10px 10px; vertical-align: middle; font-size: 8pt; background: #ffffff;">
                <div style="display: flex; flex-direction: column; justify-content: space-around; height: 20.5mm;">
                  <div style="border-bottom: 1px dotted #cbd5e1; height: 6.8mm;"></div>
                  <div style="border-bottom: 1px dotted #cbd5e1; height: 6.8mm;"></div>
                  <div style="border-bottom: 1px dotted #cbd5e1; height: 6.8mm;"></div>
                </div>
              </td>
            </tr>
            <tr style="border-bottom: 1.5px solid #0f284e;">
              <td style="padding: 13px 10px; font-weight: 600; line-height: 1.35; border-right: 1.2px solid #cbd5e1; font-size: 8.2pt; color: #0f284e;">
                <strong>Q3:</strong> Explain One Difference (Treatments: Renaissance vs Medieval)
              </td>
              <td style="padding: 13px 6px; text-align: center; font-weight: 800; font-size: 8.5pt; border-right: 1.2px solid #cbd5e1; white-space: nowrap; color: #0f284e;">
                p. 9
              </td>
              <td style="padding: 13px 6px; text-align: center; font-size: 10pt; font-weight: 900; border-right: 1.2px solid #cbd5e1; white-space: nowrap; color: #0f284e;">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 4
              </td>
            </tr>

            <!-- KT2.3: Andreas Vesalius -->
            <tr style="border-bottom: 1px dashed #cbd5e1;">
              <td rowspan="2" style="padding: 12px 6px; text-align: center; font-weight: 900; font-size: 9.5pt; border-right: 1.2px solid #cbd5e1; background: #f0f4f9; color: #0f284e; vertical-align: middle;">
                KT2.3
              </td>
              <td style="padding: 13px 10px; font-weight: 600; line-height: 1.35; border-right: 1.2px solid #cbd5e1; font-size: 8.2pt; color: #0f284e;">
                <strong>Q4:</strong> Explain Why Andreas Vesalius Made Anatomical Breakthroughs
              </td>
              <td style="padding: 13px 6px; text-align: center; font-weight: 800; font-size: 8.5pt; border-right: 1.2px solid #cbd5e1; white-space: nowrap; color: #0f284e;">
                p. 11–12
              </td>
              <td style="padding: 13px 6px; text-align: center; font-size: 10pt; font-weight: 900; border-right: 1.2px solid #cbd5e1; white-space: nowrap; color: #0f284e;">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 12
              </td>
              <td rowspan="2" style="padding: 10px 10px; vertical-align: middle; font-size: 8pt; background: #ffffff;">
                <div style="display: flex; flex-direction: column; justify-content: space-around; height: 20.5mm;">
                  <div style="border-bottom: 1px dotted #cbd5e1; height: 6.8mm;"></div>
                  <div style="border-bottom: 1px dotted #cbd5e1; height: 6.8mm;"></div>
                  <div style="border-bottom: 1px dotted #cbd5e1; height: 6.8mm;"></div>
                </div>
              </td>
            </tr>
            <tr style="border-bottom: 1.5px solid #0f284e;">
              <td style="padding: 13px 10px; font-weight: 600; line-height: 1.35; border-right: 1.2px solid #cbd5e1; font-size: 8.2pt; color: #0f284e;">
                <strong>Q3:</strong> Explain One Similarity (Anatomical Training: Renaissance vs 19th C)
              </td>
              <td style="padding: 13px 6px; text-align: center; font-weight: 800; font-size: 8.5pt; border-right: 1.2px solid #cbd5e1; white-space: nowrap; color: #0f284e;">
                p. 12
              </td>
              <td style="padding: 13px 6px; text-align: center; font-size: 10pt; font-weight: 900; border-right: 1.2px solid #cbd5e1; white-space: nowrap; color: #0f284e;">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 4
              </td>
            </tr>

            <!-- KT2.4: William Harvey -->
            <tr style="border-bottom: 1px dashed #cbd5e1;">
              <td rowspan="2" style="padding: 12px 6px; text-align: center; font-weight: 900; font-size: 9.5pt; border-right: 1.2px solid #cbd5e1; background: #f0f4f9; color: #0f284e; vertical-align: middle;">
                KT2.4
              </td>
              <td style="padding: 13px 10px; font-weight: 600; line-height: 1.35; border-right: 1.2px solid #cbd5e1; font-size: 8.2pt; color: #0f284e;">
                <strong>Q4:</strong> Explain Why William Harvey’s Circulation Discovery Was Major Breakthrough
              </td>
              <td style="padding: 13px 6px; text-align: center; font-weight: 800; font-size: 8.5pt; border-right: 1.2px solid #cbd5e1; white-space: nowrap; color: #0f284e;">
                p. 14–15
              </td>
              <td style="padding: 13px 6px; text-align: center; font-size: 10pt; font-weight: 900; border-right: 1.2px solid #cbd5e1; white-space: nowrap; color: #0f284e;">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 12
              </td>
              <td rowspan="2" style="padding: 10px 10px; vertical-align: middle; font-size: 8pt; background: #ffffff;">
                <div style="display: flex; flex-direction: column; justify-content: space-around; height: 20.5mm;">
                  <div style="border-bottom: 1px dotted #cbd5e1; height: 6.8mm;"></div>
                  <div style="border-bottom: 1px dotted #cbd5e1; height: 6.8mm;"></div>
                  <div style="border-bottom: 1px dotted #cbd5e1; height: 6.8mm;"></div>
                </div>
              </td>
            </tr>
            <tr style="border-bottom: 1.5px solid #0f284e;">
              <td style="padding: 13px 10px; font-weight: 600; line-height: 1.35; border-right: 1.2px solid #cbd5e1; font-size: 8.2pt; color: #0f284e;">
                <strong>Q3:</strong> Explain One Difference (Ideas About Human Body: Renaissance vs Medieval)
              </td>
              <td style="padding: 13px 6px; text-align: center; font-weight: 800; font-size: 8.5pt; border-right: 1.2px solid #cbd5e1; white-space: nowrap; color: #0f284e;">
                p. 15
              </td>
              <td style="padding: 13px 6px; text-align: center; font-size: 10pt; font-weight: 900; border-right: 1.2px solid #cbd5e1; white-space: nowrap; color: #0f284e;">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 4
              </td>
            </tr>

            <!-- KT2.5: The Great Plague of 1665 -->
            <tr style="border-bottom: 1px dashed #cbd5e1;">
              <td rowspan="2" style="padding: 12px 6px; text-align: center; font-weight: 900; font-size: 9.5pt; border-right: 1.2px solid #cbd5e1; background: #f0f4f9; color: #0f284e; vertical-align: middle;">
                KT2.5
              </td>
              <td style="padding: 13px 10px; font-weight: 600; line-height: 1.35; border-right: 1.2px solid #cbd5e1; font-size: 8.2pt; color: #0f284e;">
                <strong>Q5/6:</strong> Evaluative Essay: Great Plague (1665) vs Black Death (1348)
              </td>
              <td style="padding: 13px 6px; text-align: center; font-weight: 800; font-size: 8.5pt; border-right: 1.2px solid #cbd5e1; white-space: nowrap; color: #0f284e;">
                p. 17–18
              </td>
              <td style="padding: 13px 6px; text-align: center; font-size: 10pt; font-weight: 900; border-right: 1.2px solid #cbd5e1; white-space: nowrap; color: #0f284e;">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 20
              </td>
              <td rowspan="2" style="padding: 10px 10px; vertical-align: middle; font-size: 8pt; background: #ffffff;">
                <div style="display: flex; flex-direction: column; justify-content: space-around; height: 20.5mm;">
                  <div style="border-bottom: 1px dotted #cbd5e1; height: 6.8mm;"></div>
                  <div style="border-bottom: 1px dotted #cbd5e1; height: 6.8mm;"></div>
                  <div style="border-bottom: 1px dotted #cbd5e1; height: 6.8mm;"></div>
                </div>
              </td>
            </tr>
            <tr style="border-bottom: 1.5px solid #0f284e;">
              <td style="padding: 13px 10px; font-weight: 600; line-height: 1.35; border-right: 1.2px solid #cbd5e1; font-size: 8.2pt; color: #0f284e;">
                <strong>Q3:</strong> Explain One Difference (Government Responses: 1665 vs 1348)
              </td>
              <td style="padding: 13px 6px; text-align: center; font-weight: 800; font-size: 8.5pt; border-right: 1.2px solid #cbd5e1; white-space: nowrap; color: #0f284e;">
                p. 18
              </td>
              <td style="padding: 13px 6px; text-align: center; font-size: 10pt; font-weight: 900; border-right: 1.2px solid #cbd5e1; white-space: nowrap; color: #0f284e;">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 4
              </td>
            </tr>

            <!-- Total Row -->
            <tr style="background: #f0f4f9; border-top: 2px solid #0f284e;">
              <td style="padding: 12px 6px; text-align: center; font-weight: 900; font-size: 8.5pt; border-right: 1.2px solid #cbd5e1; background: #0f284e; color: #ffffff;">
                TOTAL
              </td>
              <td style="padding: 12px 10px; font-weight: 800; font-size: 8.5pt; border-right: 1.2px solid #cbd5e1; color: #0f284e;">
                Key Topic 2 Cumulative Examination Assessment Portfolio (10 Tasks)
              </td>
              <td style="padding: 12px 6px; text-align: center; font-weight: 800; font-size: 8.5pt; border-right: 1.2px solid #cbd5e1; color: #0f284e;">
                p. 4–18
              </td>
              <td style="padding: 12px 6px; text-align: center; font-size: 11pt; font-weight: 900; border-right: 1.2px solid #cbd5e1; white-space: nowrap; color: #0f284e;">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 88
              </td>
              <td style="padding: 12px 10px; font-weight: 800; font-size: 8.5pt; background: #f0f4f9; color: #0f284e;">
                <div style="display: flex; justify-content: space-between; align-items: baseline;">
                  <span>Overall Grade: <span style="display: inline-block; width: 45px; border-bottom: 1.5px solid #0f284e;"></span></span>
                  <span style="font-size: 7.5pt; color: #475569;">Teacher Target: <span style="display: inline-block; width: 40px; border-bottom: 1px solid #475569;"></span></span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 5 Verified Micro-QR Codes with Dual QR (Lesson + Quiz) -->
      <div style="border: 1.5px solid #0f284e; border-radius: 4px; padding: 7px 6px; background: #f0f4f9;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.5pt; text-transform: uppercase; letter-spacing: 0.5px; color: #0f284e;">
            &bull; Digital Learning &amp; Retrieval Hub &bull; Interactive Lessons &amp; Quizzes
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; color: #475569;">
            Interactive Textbook &bull; 10 Questions Per Enquiry
          </span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px;">
          ${renaissanceConfigs
            .map((cfg, idx) => {
              const lessonUrl = `https://the-history-revision-hub.netlify.app/?unit=edexcel_medicine&lesson=${cfg.id}&view=lessons`;
              const quizUrl = `https://the-history-revision-hub.netlify.app/?unit=edexcel_medicine&lesson=${cfg.id}&quiz=true`;
              const lessonQrSvg = generateQrSvg(lessonUrl);
              const quizQrSvg = generateQrSvg(quizUrl);
              const shortLabels = [
                'New Spirit',
                'Thomas Sydenham',
                'Andreas Vesalius',
                'William Harvey',
                'Great Plague',
              ];
              return `
          <div style="border: 1.2px solid #0f284e; border-radius: 3px; padding: 4px 3px; background: #ffffff; display: flex; flex-direction: column; align-items: center; justify-content: space-between;">
            <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 900; text-transform: uppercase; margin-bottom: 1px; color: #0f284e;">
              KT2.${cfg.lessonNum}
            </div>
            <div style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 700; color: #475569; margin-bottom: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%;">
              ${shortLabels[idx]}
            </div>

            <!-- Top QR: Interactive Lesson Hub -->
            <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 4px; width: 100%;">
              <div style="width: 17.5mm; height: 17.5mm; margin: 0 auto 1px auto;">
                ${lessonQrSvg}
              </div>
              <span style="font-family: 'Inter', sans-serif; font-size: 5.6pt; font-weight: 800; text-transform: uppercase; background: #0f284e; color: #ffffff; padding: 1.5px 4px; border-radius: 2px; letter-spacing: 0.2px; white-space: nowrap;">
                Lesson Hub
              </span>
            </div>

            <!-- Bottom QR: Practice Quiz -->
            <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 3px; width: 100%;">
              <div style="width: 17.5mm; height: 17.5mm; margin: 0 auto 1px auto;">
                ${quizQrSvg}
              </div>
              <span style="font-family: 'Inter', sans-serif; font-size: 5.6pt; font-weight: 800; text-transform: uppercase; background: #0f284e; color: #ffffff; padding: 1.5px 4px; border-radius: 2px; letter-spacing: 0.2px; white-space: nowrap;">
                Practice Quiz
              </span>
            </div>

            <div style="font-family: 'Inter', sans-serif; font-size: 8.2pt; font-weight: 900; color: #0f284e; margin-top: 2px; white-space: nowrap; border: 1px solid #0f284e; border-radius: 2px; padding: 1px 3px; background: #f0f4f9;">
              Score: [ &nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 10</strong> ]
            </div>
          </div>
          `;
            })
            .join('')}
        </div>
      </div>

      ${renderFooterStrip(20, 'Nullius in Verba: "Take nobody’s word for it." Scanning these quiz QR codes will prove whether your memory holds up under exam pressure.', 20)}
    </div>
  </div>
</body>
</html>
`;

  return html;
}

async function main() {
  console.log(
    'Rendering 20-Page A4 Pupil Workbook (Dual QR & Assessment Portfolio): Key Topic 2: Renaissance Britain (c1500–c1700)...',
  );
  const puppeteer = require('puppeteer');
  const customHtml = buildRenaissanceTwoPageWorkbook({}, {});

  const unitDir = path.resolve(__dirname, '../units/edexcel_medicine');
  const publicUnitDir = path.resolve(__dirname, '../public/units/edexcel_medicine');
  const pdfsDir = path.resolve(__dirname, '../public/pdfs');

  const unitHtmlPath = path.join(unitDir, 'pupil_workbook_renaissance.html');
  const pubHtmlPath = path.join(publicUnitDir, 'pupil_workbook_renaissance.html');
  const outPdfPath = path.join(
    pdfsDir,
    'edexcel_medicine_pupil_workbook_renaissance_FINAL_V17.pdf',
  );
  const pubPdfCopy = path.join(publicUnitDir, 'pupil_workbook_renaissance.pdf');

  fs.writeFileSync(unitHtmlPath, customHtml, 'utf8');
  fs.writeFileSync(pubHtmlPath, customHtml, 'utf8');
  console.log(`[OK] HTML written to: ${pubHtmlPath}`);

  console.log('Launching Puppeteer to generate high-resolution print PDF...');
  const chromePath =
    process.env.PUPPETEER_EXECUTABLE_PATH ||
    (fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
      ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
      : undefined);

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: chromePath,
    args: ['--allow-file-access-from-files', '--disable-web-security', '--no-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });
  await page.setContent(customHtml, { waitUntil: 'networkidle0', timeout: 60000 });

  await page.pdf({
    path: outPdfPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0mm',
      bottom: '0mm',
      left: '0mm',
      right: '0mm',
    },
  });

  await browser.close();
  console.log(`[OK] PDF successfully compiled: ${outPdfPath}`);

  fs.copyFileSync(outPdfPath, pubPdfCopy);
  console.log(`[OK] PDF copy written: ${pubPdfCopy}`);

  const outPdfStandardPath = path.join(pdfsDir, 'edexcel_medicine_pupil_workbook_renaissance.pdf');
  fs.copyFileSync(outPdfPath, outPdfStandardPath);
  console.log(`[OK] PDF standard copy written: ${outPdfStandardPath}`);
}

if (require.main === module) {
  main().catch((err) => {
    console.error('❌ Error compiling Renaissance workbook:', err);
    process.exit(1);
  });
}

module.exports = {
  buildRenaissanceTwoPageWorkbook,
  buildMedicineTwoPageWorkbook: buildRenaissanceTwoPageWorkbook,
  renaissanceConfigs,
};
