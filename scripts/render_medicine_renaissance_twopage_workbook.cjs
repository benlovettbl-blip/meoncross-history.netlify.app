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

function renderFooterStrip(pageNum, quip, totalPages = 24) {
  return `
      <div class="page-footer-strip">
        <span class="footer-page-num" style="margin-right: 8px;">${pageNum}/${totalPages}</span>
        <span class="footer-quip" style="text-align: right; flex: 1;">${quip}</span>
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
        dates: 'c1440–1476',
        title: 'The Movable Metal Printing Press',
        bullets: [
          'Casting lead type in Gutenberg’s German workshop',
          'Setting up William Caxton’s Westminster press',
          'Printing hundreds of identical illustrated medical books',
        ],
        focusClue: 'Why did printing break the clerical monopoly on medical learning?',
      },
      {
        dates: 'c1500',
        title: 'Renaissance Humanism & Ancient Texts',
        bullets: [
          'Translating original Greek manuscripts directly',
          'Spotting errors made by medieval monk copyists',
          'Urging independent questioning of ancient authority',
        ],
        focusClue: 'How did humanism inspire physicians to challenge Galen?',
      },
      {
        dates: '1660',
        title: 'Foundation of the Royal Society',
        bullets: [
          'Meeting at Gresham College in London',
          'Receiving royal charter from King Charles II',
          'Adopting Latin motto "Nullius in Verba"',
        ],
        focusClue: 'Why was experimental observation central to the Royal Society?',
      },
      {
        dates: '1665',
        title: 'Philosophical Transactions & Peer Review',
        bullets: [
          'Publishing Henry Oldenburg’s monthly scientific journal',
          'Distributing experimental reports across Europe',
          'Debating laboratory findings among rival scientists',
        ],
        focusClue: 'How did scientific journals speed up the exchange of medical knowledge?',
      },
      {
        dates: '1665–1670s',
        title: 'Early Microscopes & Animalcules',
        bullets: [
          'Grinding curved glass lenses in brass cylinders',
          'Sketching flea legs in Hooke’s Micrographia',
          'Observing tiny swimming creatures in pond water',
        ],
        focusClue: 'Why did 17th-century microscopes fail to transform medical treatment?',
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
        dates: '1660s',
        title: 'Rejecting Book Learning at the Bedside',
        bullets: [
          'Visiting sick London patients in private bedrooms',
          'Ignoring ancient scholastic university lectures',
          'Recording clinical symptoms in detailed notebooks',
        ],
        focusClue: 'Why did Sydenham believe bedside observation surpassed textbook learning?',
      },
      {
        dates: '1676',
        title: 'Observationes Medicae & Disease Classification',
        bullets: [
          'Classifying distinct illnesses like modern botanists',
          'Distinguishing measles from scarlet fever rashes',
          'Publishing authoritative textbook used for two centuries',
        ],
        focusClue: 'How did classifying diseases challenge traditional individual humoral theory?',
      },
      {
        dates: 'c1670s',
        title: 'Quinine & Cinchona Bark for Malaria',
        bullets: [
          'Importing bitter Peruvian tree bark to London',
          'Dosing marshland ague fevers with powdered bark',
          'Proving specific remedies cured specific diseases',
        ],
        focusClue: 'Why was the success of Peruvian bark a mortal blow to humoral balance?',
      },
      {
        dates: 'c1670s',
        title: 'Cool Therapy for Smallpox Fevers',
        bullets: [
          'Throwing off heavy baronial wool blankets',
          'Opening window shutters to let in cold wind',
          'Giving cool drinks instead of scalding wines',
        ],
        focusClue: 'Why did Sydenham’s cool treatment drastically cut smallpox deaths?',
      },
      {
        dates: '1680s',
        title: 'The Limits of Sydenham’s Legacy',
        bullets: [
          'Continuing to believe miasma caused epidemics',
          'Lacking laboratory tools to identify bacteria',
          'Leaving ordinary patient treatment largely unchanged',
        ],
        focusClue: 'Why did medical treatments remain mostly medieval despite Sydenham?',
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
        dates: '1537',
        title: 'Professor of Surgery at Padua University',
        bullets: [
          'Climbing down from high lecturer chairs',
          'Picking up steel dissection scalpels directly',
          'Opening executed criminal bodies on wooden slabs',
        ],
        focusClue: 'Why was a professor dissecting human bodies revolutionary in 1537?',
      },
      {
        dates: '1540',
        title: 'Proving Galen Wrong on Human Anatomy',
        bullets: [
          'Showing human jawbones consist of one piece',
          'Proving human breastbones have three segments',
          'Demonstrating Galen dissected pigs and Barbary apes',
        ],
        focusClue: 'How did Vesalius prove Galen had made anatomical mistakes?',
      },
      {
        dates: '1543',
        title: 'Publication of De Humani Corporis Fabrica',
        bullets: [
          'Printing seven massive anatomical volumes in Basel',
          'Engraving precise woodcut plates of human muscles',
          'Dedication presented to Holy Roman Emperor Charles V',
        ],
        focusClue: 'Why was The Fabrica considered a masterpiece of Renaissance science?',
      },
      {
        dates: '1545–1553',
        title: 'Thomas Geminus & Dissemination in Britain',
        bullets: [
          'Copying Vesalius’s woodcuts onto English copper plates',
          'Translating Latin descriptions into everyday English',
          'Selling anatomy manuals to London barber-surgeons',
        ],
        focusClue: 'How did English translations spread Vesalius’s ideas to barber-surgeons?',
      },
      {
        dates: 'c1560',
        title: 'Fierce Opposition & Practical Limitations',
        bullets: [
          'Facing angry attacks from conservative university professors',
          'Resigning academic post to serve royal courts',
          'Acknowledging anatomy did not yet cure living sickness',
        ],
        focusClue:
          'Why did Vesalius’s anatomical discoveries fail to save sick patients immediately?',
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
        dates: 'c1615',
        title: 'Dissecting Cold-Blooded Animals & Human Cadavers',
        bullets: [
          'Observing slow heartbeats in live cold frogs',
          'Dissecting human corpses at the Royal College',
          'Mapping one-way pocket valves inside veins',
        ],
        focusClue: 'Why did Harvey study cold-blooded animals to understand the human heart?',
      },
      {
        dates: '1620s',
        title: 'The Mechanical Pump & Quantitative Proof',
        bullets: [
          'Comparing the beating heart to mechanical water pumps',
          'Calculating liver could not produce gallons of blood daily',
          'Proving the same blood circulates continuously',
        ],
        focusClue: 'How did mathematical calculations prove Galen’s theory impossible?',
      },
      {
        dates: '1628',
        title: 'Publication of De Motu Cordis',
        bullets: [
          'Publishing Latin treatise on heart motion in Frankfurt',
          'Demonstrating tied forearm vein experiments',
          'Dedicating medical breakthrough to King Charles I',
        ],
        focusClue: 'Why did Harvey publish his research abroad rather than in England?',
      },
      {
        dates: '1630s–1650s',
        title: 'Ridicule by ‘Galenists’ & Lost Patients',
        bullets: [
          'Being mocked as a madman by rival doctors',
          'Losing wealthy private London medical patients',
          'Waiting fifty years for Oxford university to teach it',
        ],
        focusClue: 'Why was Harvey’s discovery fiercely rejected by established doctors?',
      },
      {
        dates: '1661',
        title: 'Marcello Malpighi Confirms Capillaries',
        bullets: [
          'Focusing microscope lenses on live frog lungs',
          'Discovering microscopic capillary vessels connecting arteries',
          'Confirming Harvey’s circulatory model beyond all doubt',
        ],
        focusClue: 'Why was the discovery of capillaries the final proof Harvey was right?',
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
        dates: 'Spring 1665',
        title: 'The Outbreak in St Giles-in-the-Fields',
        bullets: [
          'Spreading through poor crowded London parishes',
          'Fleeing town by carriage: King Charles II and physicians',
          'Leaving poor weavers trapped behind city gates',
        ],
        focusClue: 'Why did the rich flee London while the poor suffered catastrophic mortality?',
      },
      {
        dates: 'Summer 1665',
        title: 'Continuity of Humoral & Supernatural Beliefs',
        bullets: [
          'Blaming planetary alignments and wrath of God',
          'Sniffing dried sponges soaked in vinegar',
          'Strapping plucked live pigeons to hot buboes',
        ],
        focusClue: 'Why did people still use 14th-century remedies in 1665?',
      },
      {
        dates: '1665',
        title: 'Mayor’s Orders & Pest Houses',
        bullets: [
          'Painting red crosses on barred front doors',
          'Posting armed watchmen to enforce quarantine',
          'Building wooden pest houses outside city walls',
        ],
        focusClue: 'How did local government action in 1665 show greater organization than 1348?',
      },
      {
        dates: '1665',
        title: 'Slaughter of Dogs & Smoking Tar Barrels',
        bullets: [
          'Killing forty thousand domestic dogs and cats',
          'Burning barrels of black tar at street crossings',
          'Smoking tobacco pipes to ward off foul miasma',
        ],
        focusClue: 'Why was slaughtering cats and dogs a tragic medical mistake?',
      },
      {
        dates: 'Winter 1665',
        title: 'The Dead Carts & East Smithfield Pits',
        bullets: [
          'Ringing bell carts through silent dark lanes',
          'Calling "Bring out your dead" into empty alleys',
          'Burying one hundred thousand Londoners in mass trenches',
        ],
        focusClue: 'How devastating was the demographic impact of the 1665 epidemic?',
      },
    ],
  },
];

function renderSpinePage(cfg) {
  const { pageNum, keyTopicBadge, enquiryQuestion, stages, leftPageQuip } = cfg;

  let stagesHtml = '';
  stages.forEach((st, idx) => {
    let bulletsHtml = st.bullets
      .map((b) => `<div><span style="font-weight: 900; color: #000000;">&bull;</span> ${b}</div>`)
      .join('\n');
    stagesHtml += `
          <!-- Stage ${idx + 1} -->
          <div class="spine-stage-row" style="display: flex; flex: 1; min-height: 0; align-items: stretch; margin: 0;">
            <div style="width: 38mm; flex-shrink: 0; border-left: 2.5px solid #000000; padding: 0 3px 0 5px; display: flex; flex-direction: column; justify-content: center; position: relative;">
              <div style="position: absolute; left: -5.5px; top: 50%; transform: translateY(-50%); width: 8px; height: 8px; background: #000000; border-radius: 50%;"></div>
              <div style="display: flex; align-items: center; gap: 3px; margin-bottom: 1px;">
                <span style="background: #000000; color: #ffffff; font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 900; padding: 0.5px 3.5px; border-radius: 2px;">${idx + 1}</span>
                <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; color: #000000;">${st.dates}</span>
              </div>
              <div style="font-family: 'Playfair Display', serif; font-size: 7.2pt; font-weight: 800; color: #000000; line-height: 1.1; margin-bottom: 2px;">
                ${st.title}
              </div>
              <div style="margin-top: 1px;">
                <div style="display: flex; flex-direction: column; gap: 0.5px; font-family: 'Inter', sans-serif; font-size: 6.3pt; line-height: 1.15; color: #111111;">
                  ${bulletsHtml}
                </div>
              </div>
              <div style="margin-top: 2.5px; border: 1px dashed #000000; background: #f8fafc; padding: 1.5px 3px; border-radius: 2px;">
                <div style="font-family: 'Inter', sans-serif; font-size: 5.2pt; font-weight: 900; text-transform: uppercase; color: #000000; line-height: 1; margin-bottom: 1px;">
                  Focus Clue
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 5.8pt; line-height: 1.15; color: #222222; font-style: italic;">
                  ${st.focusClue}
                </div>
              </div>
            </div>

            <!-- Ruled Lines (6 Lines per stage • 30 lines total) -->
            <div style="flex: 1; display: flex; flex-direction: column; border-left: 1px solid #cbd5e1; margin: 0; padding: 0;">
              <div style="flex: 1; min-height: 0; border-bottom: 1.5px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.5px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.5px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.5px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.5px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.5px solid #000000; box-sizing: border-box;"></div>
            </div>
          </div>`;
  });

  return `
  <!-- ------------------------------------------------------------------ -->
  <!-- LESSON ENQUIRY NOTEBOOK WITH CHRONOLOGICAL SPINE (PAGE ${pageNum})         -->
  <!-- ------------------------------------------------------------------ -->
  <div class="page page-container" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Lesson Header with Inquiry Question Title -->
      <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 2px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; letter-spacing: 0.5px; text-transform: uppercase; border: 1.2px solid #000000; padding: 1px 6px; border-radius: 2px;">
            ${keyTopicBadge} &bull; ENQUIRY LESSON NOTEBOOK
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-transform: uppercase; color: #000000;">
            EDEXCEL PAPER 1 (1HI0/11) &bull; THEMATIC STUDY
          </span>
        </div>
        <h2 style="font-family: 'Playfair Display', serif; font-size: 11.5pt; color: #000000; margin: 1px 0 1px 0; font-weight: 900; line-height: 1.18;">
          ${enquiryQuestion}
        </h2>
      </div>

      <!-- Active Lesson Note-Taking Spine -->
      <div style="flex: 1; display: flex; flex-direction: column; margin-top: 1px; min-height: 0;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid #000000; padding: 1px 0; margin-bottom: 2px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px;">
            Chronological Inquiry Spine &bull; Core Causal Narrative
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-style: italic; color: #444444;">
            Take precise, structured notes alongside each milestone as your teacher narrates the history
          </span>
        </div>

        <!-- 5 Chronological Stages with Spine on Left and Ruled Lines on Right -->
        <div style="display: flex; flex-direction: column; flex: 1; min-height: 0; gap: 0;">
${stagesHtml}
        </div>
      </div>

      <div class="page-footer-strip">
        <span class="footer-page-num" style="margin-right: 8px;">${pageNum}/24</span>
        <span class="footer-quip" style="text-align: right; flex: 1;">${leftPageQuip}</span>
      </div>
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
      border-bottom: 1.2px solid #000000;
      height: 7.8mm;
      width: 100%;
      box-sizing: border-box;
      margin: 0;
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

      <!-- Unit Title & Subtitle Banner -->
      <div style="text-align: center; margin-bottom: 8px;">
        <span style="display: inline-block; font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 900; letter-spacing: 1.5px; text-transform: uppercase; border: 1.5px solid #000000; padding: 2px 10px; border-radius: 3px; margin-bottom: 4px;">
          KEY TOPIC 2 &bull; REVISION &amp; PRACTICE COMPANION
        </span>
        <h1 style="font-family: 'Playfair Display', serif; font-size: 20pt; font-weight: 900; color: #000000; margin: 4px 0 2px 0; line-height: 1.15; letter-spacing: -0.5px;">
          The Medical Renaissance in Britain, c1500–c1700
        </h1>
        <p style="font-family: 'Georgia', serif; font-size: 9pt; color: #222222; margin: 0; font-style: italic;">
          Humanism, Anatomy (Vesalius), Circulation (Harvey), Observation (Sydenham) &amp; The Great Plague
        </p>
      </div>

      <!-- Prominent Primary Visual Source Centerpiece -->
      <div style="margin: 2px 0 5px 0; border: 1.5px solid #000000; border-radius: 4px; overflow: hidden; background: #ffffff;">
        <img src="${coverImgBase64}" alt="Andreas Vesalius Dissecting a Female Cadaver (1543)" style="width: 100%; height: 93.5mm; object-fit: cover; object-position: center 30%; display: block; margin: 0 auto; filter: grayscale(100%);">
        <div style="display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #000000; padding: 3px 8px; border-top: 1.5px solid #000000; background: #ffffff;">
          <span><strong>Primary Visual Evidence:</strong> Title Page of Andreas Vesalius, <em>De Humani Corporis Fabrica</em> (1543)</span>
          <span style="font-weight: 700;">CONTEMPORARY PRINT ARCHIVE</span>
        </div>
      </div>

      <!-- Pupil Identification & Target Setting Box -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 4px 10px; background: #ffffff; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 14px; align-items: center; margin-bottom: 6px;">
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #000000; text-transform: uppercase; margin-right: 8px;">Pupil Name:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #000000; height: 12px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #000000; text-transform: uppercase; margin-right: 8px;">Target:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #000000; height: 12px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #000000; text-transform: uppercase; margin-right: 8px;">Class:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #000000; height: 12px;"></div>
        </div>
      </div>

      <!-- Course Specification Curriculum Tracking Table -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; overflow: hidden; margin-bottom: 4px;">
        <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif; font-size: 8pt;">
          <thead>
            <tr style="background: #000000; color: #ffffff; text-transform: uppercase; letter-spacing: 0.5px;">
              <th style="padding: 4px 8px; text-align: left; width: 78%; font-size: 7.5pt; font-weight: 800;">
                Key Topic 2 Specification Framework (1HI0/11)
              </th>
              <th style="padding: 4px 8px; text-align: center; width: 11%; font-size: 7.5pt; font-weight: 800; border-left: 1px solid #444444;">
                Lesson Done
              </th>
              <th style="padding: 4px 8px; text-align: center; width: 11%; font-size: 7.5pt; font-weight: 800; border-left: 1px solid #444444;">
                Quiz [10]
              </th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 18.5px 10px; border-right: 1.2px solid #000000;">
                <div style="font-size: 8.8pt; font-weight: 800; color: #000000; line-height: 1.25;">
                  Key Topic 2.1: The New Spirit of Enquiry: Humanism, The Printing Press &amp; The Royal Society
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 8pt; font-style: italic; color: #333333; margin-top: 1.5px; line-height: 1.25;">
                  How did movable type (c1440), humanism, and the Royal Society (1660) challenge ancient dogma?
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
              <td style="padding: 18.5px 10px; border-right: 1.2px solid #000000;">
                <div style="font-size: 8.8pt; font-weight: 800; color: #000000; line-height: 1.25;">
                  Key Topic 2.2: Thomas Sydenham &amp; The Art of Bedside Observation
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 8pt; font-style: italic; color: #333333; margin-top: 1.5px; line-height: 1.25;">
                  Why was Sydenham called the ‘English Hippocrates’, and how did Observationes Medicae classify illness?
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
              <td style="padding: 18.5px 10px; border-right: 1.2px solid #000000;">
                <div style="font-size: 8.8pt; font-weight: 800; color: #000000; line-height: 1.25;">
                  Key Topic 2.3: Andreas Vesalius &amp; The Anatomical Revolution
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 8pt; font-style: italic; color: #333333; margin-top: 1.5px; line-height: 1.25;">
                  How did De Humani Corporis Fabrica (1543) correct over 200 of Galen’s anatomical errors?
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
              <td style="padding: 18.5px 10px; border-right: 1.2px solid #000000;">
                <div style="font-size: 8.8pt; font-weight: 800; color: #000000; line-height: 1.25;">
                  Key Topic 2.4: William Harvey &amp; The Circulation of the Blood
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 8pt; font-style: italic; color: #333333; margin-top: 1.5px; line-height: 1.25;">
                  How did De Motu Cordis (1628) prove blood circulates through the heart as a mechanical pump?
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
              <td style="padding: 18.5px 10px; border-right: 1.2px solid #000000;">
                <div style="font-size: 8.8pt; font-weight: 800; color: #000000; line-height: 1.25;">
                  Key Topic 2.5: Continuity in Treatment &amp; The Great Plague of London (1665)
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 8pt; font-style: italic; color: #333333; margin-top: 1.5px; line-height: 1.25;">
                  Why did red crosses, quarantine, and humoral remedies in 1665 show so much continuity with 1348?
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

      ${renderFooterStrip(1, 'The History Revision Hub &bull; GCSE History Paper 1 &bull; Key Topic 2 Revision Companion', 24)}
    </div>
  </div>
`;

  // ====================================================================
  // PAGES 2–3: PANORAMIC LIVING TIMELINE (8 HISTORICAL MILESTONES)
  // ====================================================================
  html += `
  <div class="page page-container verso-page" id="page-2">
    <div class="page-body-full">
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 6px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 11pt; color: #000000; margin: 0; font-weight: 800;">
          Living Timeline &bull; Part 1: Scientific Breakthroughs &amp; Anatomy (c1440–1628)
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
          Chronological Inquiry &bull; Milestones 1–4
        </span>
      </div>

      <div style="display: flex; flex-direction: column; gap: 6px; flex: 1; justify-content: space-between;">
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #000000;">
                c. 1440–1476 &bull; The Printing Press: Gutenberg &amp; William Caxton
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Key Topic 2.1</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.22;">
              Johannes Gutenberg invents the movable metal type press in Mainz; William Caxton establishes England’s first printing press at Westminster in 1476. Medical books can now be mass-produced with identical diagrams, shattering the Catholic Church’s clerical monopoly on manuscript copying.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 38mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>

        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #000000;">
                1543 &bull; Andreas Vesalius Publishes De Humani Corporis Fabrica
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Key Topic 2.3</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.22;">
              At the University of Padua, 28-year-old professor Andreas Vesalius carries out human dissections himself. His masterwork, The Fabric of the Human Body, features precise woodcuts disproving over 200 of Galen’s errors, proving the human jawbone is one piece and the breastbone has three segments.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 38mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>

        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #000000;">
                1628 &bull; William Harvey Publishes De Motu Cordis
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Key Topic 2.4</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.22;">
              Royal physician William Harvey publishes On the Motion of the Heart and Blood in Animals. Through dissection of cold-blooded reptiles and mathematical calculations, he proves that the heart acts as a mechanical pump recirculating blood continuously through one-way pocket valves.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 38mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>

        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #000000;">
                1660 &bull; Foundation of the Royal Society &amp; Nullius in Verba
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Key Topic 2.1</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.22;">
              The Royal Society of London for Improving Natural Knowledge is founded at Gresham College, receiving a royal charter from Charles II in 1662. Adopting the motto Nullius in Verba (‘Take nobody’s word for it’), it launches Philosophical Transactions in 1665 to publish and peer-review scientific experiments.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 38mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>
      </div>

      ${renderFooterStrip(2, 'Vesalius proved Galen had been dissecting pigs, dogs, and apes for 1,300 years. The human jawbone is one piece, not two.', 24)}
    </div>
  </div>

  <!-- PAGE 3: LIVING TIMELINE PART 2 -->
  <div class="page page-container recto-page" id="page-3">
    <div class="page-body-full">
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 6px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 11pt; color: #000000; margin: 0; font-weight: 800;">
          Living Timeline &bull; Part 2: Observation, Plagues &amp; Microscopic Discoveries (1661–1676)
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
          Chronological Inquiry &bull; Milestones 5–8
        </span>
      </div>

      <div style="display: flex; flex-direction: column; gap: 6px; flex: 1; justify-content: space-between;">
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #000000;">
                1661 &bull; Marcello Malpighi Observes Capillaries Under the Microscope
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Key Topic 2.4</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.22;">
              Using an early compound microscope, Italian biologist Marcello Malpighi observes blood passing through microscopic capillaries connecting arteries to veins in a live frog’s lungs. This provides the definitive optical proof for William Harvey’s circulatory model.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 38mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>

        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #000000;">
                1665 &bull; The Great Plague of London: Red Crosses &amp; Pest Houses
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Key Topic 2.5</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.22;">
              The bubonic plague strikes London, killing approximately 100,000 people (20% of the city). The Lord Mayor orders watchmen to lock infected families inside houses marked with red crosses and ‘Lord have mercy upon us’. Over 40,000 stray dogs and cats are slaughtered.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 38mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>

        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #000000;">
                1665 &bull; Robert Hooke Publishes Micrographia
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Key Topic 2.1</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.22;">
              Robert Hooke, curator of experiments for the Royal Society, publishes Micrographia, containing stunning copper-plate engravings of magnified insects, sponges, and cork tissue. He coins the term ‘cell’ to describe microscopic plant chambers, popularising scientific observation.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 38mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>

        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #000000;">
                1676 &bull; Thomas Sydenham Publishes Observationes Medicae
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Key Topic 2.2</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.22;">
              Known as the ‘English Hippocrates’, Thomas Sydenham urges doctors to base treatments on bedside clinical observation rather than theoretical book-learning. In Observationes Medicae, he classifies illnesses into distinct species, distinguishes measles from scarlet fever, and popularises cinchona bark (quinine) for malaria.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 38mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>
      </div>

      ${renderFooterStrip(3, 'Nullius in Verba: "Take nobody’s word for it." A brilliant motto for science, and a great rule for evaluating historical sources.', 24)}
    </div>
  </div>
`;

  // ====================================================================
  // PAGES 4–23: 5 DEDICATED 4-PAGE MODULES
  // ====================================================================
  renaissanceConfigs.forEach((cfg) => {
    const leftPageNum = (cfg.lessonNum - 1) * 4 + 4;
    const rightPageNum = (cfg.lessonNum - 1) * 4 + 5;
    const linedLeftPageNum = (cfg.lessonNum - 1) * 4 + 6;
    const linedRightPageNum = (cfg.lessonNum - 1) * 4 + 7;

    // PAGE 1 OF MODULE: CHRONOLOGICAL INQUIRY SPINE
    html += renderSpinePage({ ...cfg, pageNum: leftPageNum });

    // PAGE 2 OF MODULE: EXAM QUESTION (STEM, STIMULUS, 22 FLEX TASK LINES, TIMELINE MISSION)
    const flexTaskLines = Array.from(
      { length: 22 },
      () => `
        <div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>`,
    ).join('');

    html += `
  <div class="page page-container" id="page-${rightPageNum}">
    <div class="page-body-full">
      <div>
        <!-- Exam Header -->
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

        <!-- Accessible Writing Frames & Key Vocabulary Bank -->
        <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 4px 7px; background: #ffffff; margin-bottom: 4px; display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
          <div>
            <strong style="font-family: 'Inter', sans-serif; font-size: 7pt; text-transform: uppercase; display: block; margin-bottom: 1px;">Accessible Writing Frames:</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-style: italic; line-height: 1.2; display: block;">${cfg.connectives}</span>
          </div>
          <div>
            <strong style="font-family: 'Inter', sans-serif; font-size: 7pt; text-transform: uppercase; display: block; margin-bottom: 1px;">Key Vocabulary Bank:</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; line-height: 1.2; display: block;">${cfg.wordBank}</span>
          </div>
        </div>

        <!-- Ruled Task Lines Prompt -->
        <div style="font-family: 'Inter', sans-serif; font-size: 7.1pt; font-style: italic; color: #222222; margin: 2px 0 2px 0; display: flex; justify-content: space-between;">
          <span><strong>Write your response in the space provided below:</strong></span>
          <span style="font-size: 6.8pt; color: #555555;">(Response continues on facing page)</span>
        </div>
      </div>

      <!-- 22 Ruled Task Lines for Extended Writing -->
      <div style="flex: 1; display: flex; flex-direction: column; margin: 2px 0 4px 0;">
${flexTaskLines}
      </div>

      <!-- Timeline Mission -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 5px 8px; background: #ffffff; display: flex; justify-content: space-between; align-items: center; margin-top: 2px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; background: #000000; color: #ffffff; padding: 2px 6px; border-radius: 2px; text-transform: uppercase; white-space: nowrap;">
            Timeline Mission
          </span>
          <span style="font-family: 'Georgia', serif; font-size: 7.2pt; line-height: 1.25; color: #000000;">
            ${cfg.timelineMission}
          </span>
        </div>
        <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 2px 6px; font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 800; white-space: nowrap;">
          [ &nbsp;&nbsp; ] Done
        </div>
      </div>

      <div class="page-footer-strip">
        <span class="footer-quip" style="text-align: left; flex: 1; margin-right: 8px;">${cfg.rightPageQuip}</span>
        <span class="footer-page-num">${rightPageNum}/24</span>
      </div>
    </div>
  </div>
`;

    // PAGE 3 OF MODULE: LINED WRITING (VERSO) - FULL CONTINUATION PAGE (31 LINES)
    const continuationTaskLines = Array.from(
      { length: 31 },
      () => `
        <div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>`,
    ).join('');

    html += `
  <div class="page page-container" id="page-${linedLeftPageNum}">
    <div class="page-body-full">
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 4px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 10.5pt; color: #000000; margin: 0; font-weight: 800;">
          ${cfg.title}
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
          ${cfg.tariff.split(':')[0]} Continued
        </span>
      </div>

      <div style="font-family: 'Inter', sans-serif; font-size: 7.1pt; font-style: italic; color: #333333; margin-bottom: 2px;">
        Continue your response to ${cfg.tariff.split(':')[0]} below:
      </div>

      <div style="flex: 1; display: flex; flex-direction: column; margin: 2px 0 4px 0;">
        ${continuationTaskLines}
      </div>

      ${renderFooterStrip(linedLeftPageNum, cfg.linedLeftQuip)}
    </div>
  </div>
`;

    // PAGE 4 OF MODULE: LINED WRITING (RECTO) - ESSAY SYNTHESIS & HISTORICAL VERDICT (24 LINES) + QUESTION 3 [4 MARKS] (6 LINES)
    const conclusionTaskLines = Array.from(
      { length: 24 },
      () => `
        <div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>`,
    ).join('');

    const q3TaskLines = Array.from(
      { length: 6 },
      () => `
        <div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>`,
    ).join('');

    html += `
  <div class="page page-container" id="page-${linedRightPageNum}">
    <div class="page-body-full" style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
      <div>
        <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 4px;">
          <h2 style="font-family: 'Playfair Display', serif; font-size: 10.5pt; color: #000000; margin: 0; font-weight: 800;">
            ${cfg.title}
          </h2>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
            Assessment Synthesis &amp; Question 3
          </span>
        </div>

        <div style="font-family: 'Inter', sans-serif; font-size: 7.1pt; font-style: italic; color: #333333; margin-bottom: 2px;">
          Final analytical evaluation &amp; concluding historical verdict:
        </div>
      </div>

      <div style="flex: 3.6; display: flex; flex-direction: column; margin: 2px 0 6px 0;">
        ${conclusionTaskLines}
      </div>

      <!-- Question 3: Similarity / Difference [4 marks] -->
      <div style="border-top: 2px solid #000000; padding-top: 4px; margin-top: 2px; flex: 1.4; display: flex; flex-direction: column;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; text-transform: uppercase; letter-spacing: 0.5px;">
            &bull; Question 3: Explain One ${cfg.fourMark.type} [4 marks]
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 700; border: 1px solid #000000; padding: 0 5px; border-radius: 2px; text-transform: uppercase;">
            [4 MARKS &bull; 5 MINS]
          </span>
        </div>
        <p style="font-family: 'Playfair Display', serif; font-size: 8.3pt; font-weight: 800; color: #000000; margin: 0 0 2px 0; line-height: 1.25;">
          ${cfg.fourMark.question}
        </p>
        <div style="flex: 1; display: flex; flex-direction: column; margin: 1px 0 0 0;">
          ${q3TaskLines}
        </div>
      </div>

      ${renderFooterStrip(linedRightPageNum, cfg.linedRightQuip)}
    </div>
  </div>
`;
  });

  // ====================================================================
  // PAGE 24: OUTSIDE BACK COVER
  // ====================================================================
  html += `
  <div class="page page-container verso-page" id="page-24" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #000000; padding-bottom: 4px; margin-bottom: 8px;">
        <div data-department-name="The History Department">
          <span style="font-family: 'Inter', sans-serif; font-size: 10pt; font-weight: 900; color: #000000; text-transform: uppercase; letter-spacing: 1px;">
            <span class="school-brand-target">The History Department</span> &bull; REVISION LEDGER
          </span>
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 700; color: #000000;">
          FINAL SYNOPTIC REVIEW
        </div>
      </div>

      <!-- Core Knowledge Ledger (Top Half) -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 8px 10px; background: #ffffff; margin-bottom: 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid #000000; padding-bottom: 3px; margin-bottom: 6px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 9pt; text-transform: uppercase; letter-spacing: 0.5px;">
              Key Topic 2 &bull; Master Knowledge Ledger
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; border: 1px solid #000000; padding: 1px 6px; border-radius: 2px;">
              Specification Audit
            </span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #000000; margin: 0 0 6px 0; line-height: 1.3;">
            Before sitting Edexcel Paper 1 (Section B), you must be able to deploy precise historical evidence across all five areas of the Medical Renaissance in Britain (c1500–c1700). Use this ledger for spaced retrieval practice.
          </p>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px 16px;">
          <div>
            <div style="font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 800; text-transform: uppercase; color: #000000; border-bottom: 1px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
              1. The Printing Press &amp; The Royal Society
            </div>
            <ul style="margin: 0; padding-left: 14px; font-family: 'Georgia', serif; font-size: 7.5pt; line-height: 1.3; color: #000000;">
              <li>Movable type (c1440) ended Church control of manuscripts.</li>
              <li>Royal Society (1660) received Royal Charter from Charles II.</li>
              <li>Motto Nullius in Verba: "Take nobody’s word for it".</li>
              <li>Philosophical Transactions (1665) established peer review.</li>
            </ul>
          </div>
          <div>
            <div style="font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 800; text-transform: uppercase; color: #000000; border-bottom: 1px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
              2. Thomas Sydenham (English Hippocrates)
            </div>
            <ul style="margin: 0; padding-left: 14px; font-family: 'Georgia', serif; font-size: 7.5pt; line-height: 1.3; color: #000000;">
              <li>Pioneered bedside observation over ancient book-learning.</li>
              <li>Observationes Medicae (1676) classified disease species.</li>
              <li>Distinguished scarlet fever from measles symptoms.</li>
              <li>Introduced cool therapy for smallpox; cinchona bark for ague.</li>
            </ul>
          </div>
          <div>
            <div style="font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 800; text-transform: uppercase; color: #000000; border-bottom: 1px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
              3. Andreas Vesalius &amp; Human Anatomy
            </div>
            <ul style="margin: 0; padding-left: 14px; font-family: 'Georgia', serif; font-size: 7.5pt; line-height: 1.3; color: #000000;">
              <li>Professor at Padua; dissected human corpses directly.</li>
              <li>De Humani Corporis Fabrica (1543) disproved 200+ Galen errors.</li>
              <li>Human jawbone is one piece; breastbone has three parts.</li>
              <li>Thomas Geminus copied anatomical woodcuts for London.</li>
            </ul>
          </div>
          <div>
            <div style="font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 800; text-transform: uppercase; color: #000000; border-bottom: 1px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
              4. William Harvey &amp; Circulation of Blood
            </div>
            <ul style="margin: 0; padding-left: 14px; font-family: 'Georgia', serif; font-size: 7.5pt; line-height: 1.3; color: #000000;">
              <li>Dissected cold-blooded animals; proved heart is a mechanical pump.</li>
              <li>De Motu Cordis (1628) proved blood circulates through one-way valves.</li>
              <li>Mathematical calculations proved liver could not make blood daily.</li>
              <li>Marcello Malpighi (1661) confirmed capillaries with microscope.</li>
            </ul>
          </div>
        </div>

        <div style="border-top: 1px solid #000000; padding-top: 5px; margin-top: 4px; display: flex; justify-content: space-between; align-items: center;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 800; text-transform: uppercase;">
            Cumulative Revision Sign-off:
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt;">
            Teacher Initial: [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ] &bull; Date: [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ]
          </span>
        </div>
      </div>

      <!-- 5 QR Codes for Digital Quizzing Hub (Bottom Half) -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 6px 8px; background: #ffffff;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.2px solid #000000; padding-bottom: 2px; margin-bottom: 5px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; text-transform: uppercase; letter-spacing: 0.5px;">
            📱 Interactive Digital Quizzing Hub &bull; Scan for Instant Retrieval Practice
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; border: 1px solid #000000; padding: 0 4px; border-radius: 2px;">
            ONLINE RECALL
          </span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; text-align: center;">
          ${renaissanceConfigs
            .map((cfg, idx) => {
              const quizLessonIndex = idx + 5;
              const quizUrl = `https://the-history-revision-hub.netlify.app/?unit=edexcel_medicine&lesson=${quizLessonIndex}&quiz=true`;
              const qrSvg = generateQrSvg(quizUrl);
              const shortLabels = ['New Spirit', 'Sydenham', 'Vesalius', 'Harvey', 'Great Plague'];
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

      ${renderFooterStrip(24, 'Nullius in Verba: scanning these quiz QR codes will prove whether your memory holds up under exam pressure.', 24)}
    </div>
  </div>
</body>
</html>
`;

  return html;
}

module.exports = { buildRenaissanceTwoPageWorkbook };
