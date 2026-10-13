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
// 5 Dedicated Medieval Enquiry Lesson Configurations (100% Black & White)
// ============================================================================
const medievalConfigs = [
  {
    lessonIndex: 0,
    lessonNum: 1,
    id: 'lesson_1_1',
    keyTopicBadge: 'KEY TOPIC 1.1',
    title: 'KT1.1: Supernatural & Religious Explanations of Disease',
    enquiryQuestion: 'Why did the Catholic Church dominate medieval explanations of disease?',
    specAnchor:
      'Supernatural & religious causes; Catholic Church influence; astrology & planetary conjunctions.',
    tariff: 'Question 4: Explain Why [12 marks &bull; 15 mins]',
    examStem:
      'Explain why the Catholic Church had such a major influence on ideas about the causes of disease in the period c1250–c1500. [12 marks]',
    stimulus: ['Monastic scriptoria and book-copying', 'The imprisonment of Roger Bacon (1277)'],
    connectives:
      'One main reason was that... &bull; For example, ... &bull; This was important because... &bull; Another key factor was... &bull; In particular, ... &bull; Overall, the most decisive reason was... because...',
    wordBank:
      'divine retribution &bull; biblical leprosy &bull; Lazar houses &bull; teleology &bull; heresy &bull; Roger Bacon (1277) &bull; monastic scriptoria &bull; 1345 planetary conjunction &bull; astrological almanacs',
    timelineMission:
      'Turn to Pages 2–3 (Key Topic 1.1). In the drawing box, sketch a monk copying Galen’s medical book in a scriptorium. Add two speech bubbles explaining why the Church banned new medical experiments and imprisoned Roger Bacon in 1277.',
    fourMark: {
      type: 'Similarity',
      question:
        'Explain one way in which ideas about the cause of disease in the Medieval period (c1250–c1500) were similar to ideas in the Renaissance period (c1500–c1700). [4 marks]',
      hint: 'Identify 1 valid similarity, then explain with specific historical detail from both named eras.',
      stems:
        'One way ideas were similar was that... &bull; In the Medieval period... &bull; Similarly, in the Renaissance...',
    },
    leftPageQuip:
      'If you develop a fever in 1300, church logic dictates you definitely committed a sin last Tuesday. Time to buy a pilgrimage badge!',
    rightPageQuip:
      'Galen wrote it, monks copied it, nobody dared question it. Because questioning Galen wasn’t just bad science—it was a heresy trial.',
    linedLeftQuip:
      'Questioning Galen or Church doctrine in 1300 was not just bad science — it was an immediate charge of heresy.',
    linedRightQuip:
      'Explain the monopoly: monks hand-copied manuscripts in scriptoria, so Christian ideas of divine punishment went unchallenged.',
    stages: [
      {
        dates: 'c1250',
        title: 'Scriptoria & Church Monopoly on Learning',
        bullets: [
          'Hand-copying Latin manuscripts by candle-light',
          'Training university priests in Church doctrine',
          'Punishing medical heretics like Roger Bacon',
        ],
        focusClue: 'How did church scriptoria prevent new medical ideas from spreading?',
      },
      {
        dates: 'c1280',
        title: 'Biblical Leprosy & Divine Retribution',
        bullets: [
          'Sending sickness to punish human sin',
          'Exiling lepers to isolated Lazar houses',
          'Ringing warning bells in dirt lanes',
        ],
        focusClue: 'Why was leprosy viewed as visible proof of divine judgment?',
      },
      {
        dates: '1345',
        title: 'Christian Astrology & Planetary Conjunction',
        bullets: [
          'Consulting parchment zodiac almanac wheels',
          'Aligning Mars, Jupiter, and Saturn in Aquarius',
          'Blaming corrupted night air for fever',
        ],
        focusClue: 'How did the Church reconcile astrology with Christian doctrine?',
      },
      {
        dates: 'c1350',
        title: 'Purgatory, Saints & Holy Relics',
        bullets: [
          'Lighting beeswax candles before parish shrines',
          'Kissing holy bone relics of saints',
          'Selling paper indulgences to wealthy barons',
        ],
        focusClue: 'Why did sick people turn to pilgrimage shrines rather than doctors?',
      },
      {
        dates: 'c1400',
        title: 'Censorship & The Ban on Dissection',
        bullets: [
          'Treating Galen’s pagan texts as sacred truth',
          'Banning human dissections in English towns',
          'Threatening curious scholars with church excommunication',
        ],
        focusClue: 'Why did church enforcement of Galen prevent medical progress?',
      },
    ],
  },
  {
    lessonIndex: 1,
    lessonNum: 2,
    id: 'lesson_1_2',
    keyTopicBadge: 'KEY TOPIC 1.2',
    title: 'KT1.2: Rational Explanations: Hippocrates, Galen & The Four Humours',
    enquiryQuestion:
      'Why did the Theory of the Four Humours dominate rational medicine for centuries?',
    specAnchor:
      'Rational explanations: Four Humours (Hippocrates), Theory of Opposites (Galen), Miasma; diagnostic tools.',
    tariff: 'Question 4: Explain Why [12 marks &bull; 15 mins]',
    examStem:
      'Explain why the Theory of the Four Humours remained the dominant rational explanation of disease throughout the period c1250–c1500. [12 marks]',
    stimulus: ['Galen’s Theory of Opposites', 'The diagnostic matula (uroscopy)'],
    connectives:
      'One main reason was that... &bull; For example, ... &bull; This was important because... &bull; Another key factor was... &bull; In particular, ... &bull; Overall, the most decisive reason was... because...',
    wordBank:
      'Four Humours &bull; blood, phlegm, yellow bile, black bile &bull; Theory of Opposites &bull; Galen &bull; clinical observation &bull; Hippocratic Oath &bull; matula &bull; uroscopy wheel &bull; Zodiac Man &bull; miasma',
    timelineMission:
      'Turn to Pages 2–3 (Key Topic 1.2). In the drawing box, sketch a physician holding up a glass matula flask to the sunlight. Annotate the four bodily fluids and explain how Galen’s Theory of Opposites balanced them.',
    fourMark: {
      type: 'Difference',
      question:
        'Explain one way in which ideas about the cause of disease in the Medieval period (c1250–c1500) were different from ideas in the Modern period (c1900–present). [4 marks]',
      hint: 'Identify 1 valid difference, then explain with specific historical detail from both named eras.',
      stems:
        'One way ideas differed was that... &bull; In the Medieval period... &bull; In contrast, in the Modern period...',
    },
    leftPageQuip:
      'Cold and wet? Have some hot dry pepper. Too much blood? Let’s slice your arm open. Galen’s logic was flawless, provided you survived the cure.',
    rightPageQuip:
      'Sniffing urine, tasting urine, holding urine up to the window. 14th-century diagnostics was 90% liquid inspection and 10% guessing.',
    linedLeftQuip:
      'Hippocrates separated medicine from religion; Galen created a complete logical system that answered every symptom without needing dissection.',
    linedRightQuip:
      'Explain the logic: the Theory of Opposites provided clear, practical action for every physician, even when the patient grew worse.',
    stages: [
      {
        dates: 'c460 BC',
        title: 'Hippocrates & Natural Observation',
        bullets: [
          'Rejecting anger of gods at the bedside',
          'Writing case charts on fever symptoms',
          'Swearing ethical oath to protect patients',
        ],
        focusClue: 'How did Hippocrates separate medicine from superstition?',
      },
      {
        dates: 'c1250',
        title: 'The Four Bodily Humours',
        bullets: [
          'Balancing blood, phlegm, and two biles',
          'Linking fluids to four earthly elements',
          'Associating cold damp seasons with winter coughs',
        ],
        focusClue: 'Why did humoral theory seem logical to medieval people?',
      },
      {
        dates: 'c1280',
        title: 'Galen’s Theory of Opposites',
        bullets: [
          'Cooling burning summer fever with cold cucumber',
          'Treating excess phlegm with dry hot pepper',
          'Dissecting Barbary apes to map organs',
        ],
        focusClue: 'How did the Theory of Opposites provide practical treatment rules?',
      },
      {
        dates: 'c1300',
        title: 'The Matula & Diagnostic Uroscopy',
        bullets: [
          'Holding glass flasks up to window sunlight',
          'Comparing urine colours against twenty-shade wheels',
          'Sniffing and tasting samples for sweetness',
        ],
        focusClue: 'Why did uroscopy give physicians great diagnostic authority?',
      },
      {
        dates: 'c1350',
        title: 'Miasma Theory & Foul Vapours',
        bullets: [
          'Fearing stench from open roadside cesspools',
          'Smelling rotting town refuse heaps',
          'Believing toxic smells unbalanced bodily fluids',
        ],
        focusClue: 'Why did rational physicians link bad smells directly to epidemics?',
      },
    ],
  },
  {
    lessonIndex: 2,
    lessonNum: 3,
    id: 'lesson_1_3',
    keyTopicBadge: 'KEY TOPIC 1.3',
    title: 'KT1.3: Approaches to Prevention & Treatment: Rituals, Bleeding & Purging',
    enquiryQuestion:
      'How did medieval treatments balance religious rituals against physical remedies?',
    specAnchor:
      'Approaches to prevention and treatment: religious rituals, bloodletting, purging, herbal remedies, regimen sanitatis, flagellants.',
    tariff: 'Question 4: Explain Why [12 marks &bull; 15 mins]',
    examStem:
      'Explain why medieval treatments for disease focused heavily on restoring humoral balance and religious repentance in the period c1250–c1500. [12 marks]',
    stimulus: ['Phlebotomy (bloodletting by fleam or leeches)', 'The Regimen Sanitatis'],
    connectives:
      'One main reason was that... &bull; For example, ... &bull; This was important because... &bull; Another key factor was... &bull; In particular, ... &bull; Overall, the most decisive reason was... because...',
    wordBank:
      'phlebotomy &bull; fleam &bull; leeches &bull; cupping &bull; purging &bull; emetics &bull; clysters &bull; theriac &bull; herbal materia medica &bull; Regimen Sanitatis &bull; flagellants',
    timelineMission:
      'Turn to Pages 2–3 (Key Topic 1.3). In the drawing box, sketch a barber-surgeon using a fleam and pewter bleeding bowl, alongside a flagellant whip. Label how one treated the body and the other treated the soul.',
    fourMark: {
      type: 'Similarity',
      question:
        'Explain one way in which approaches to preventing disease in the Medieval period (c1250–c1500) were similar to approaches in the Renaissance period (c1500–c1700). [4 marks]',
      hint: 'Identify 1 valid similarity, then explain with specific historical detail from both named eras.',
      stems:
        'One way prevention was similar was... &bull; In the Medieval period... &bull; Similarly, in the Renaissance period...',
    },
    leftPageQuip:
      'Bleeding, purging, boiling vinegar, and swallowing crushed emeralds. If the disease didn’t kill you, the apothecary’s bill definitely would.',
    rightPageQuip:
      'Flagellants marched from town to town whipping themselves bloody to appease God. The townspeople were suitably terrified, and the plague spread faster.',
    linedLeftQuip:
      'Phlebotomy was not random violence: physicians consulted the Zodiac Man to ensure the moon was in the correct astrological house before opening a vein.',
    linedRightQuip:
      'Explain the dual approach: medieval treatments treated the mortal body through purging humours and the immortal soul through fasting and penance.',
    stages: [
      {
        dates: 'c1250',
        title: 'Religious Prayers, Fasting & Flagellation',
        bullets: [
          'Chanting Latin prayers beside the sickbed',
          'Fasting on bread and well water',
          'Whipping bare backs to beg God for mercy',
        ],
        focusClue: 'Why did ordinary people consider prayer more vital than medicine?',
      },
      {
        dates: 'c1300',
        title: 'Humoral Phlebotomy (Bloodletting)',
        bullets: [
          'Slicing vein walls with iron fleams',
          'Applying fat swamp leeches to temples',
          'Catching warm dark blood in pewter bowls',
        ],
        focusClue: 'Why was bloodletting the most universal physical treatment?',
      },
      {
        dates: 'c1320',
        title: 'Purging, Vomiting & Enemas',
        bullets: [
          'Swallowing poisonous black hellebore seeds',
          'Pumping warm mallow tea through boar-bladder clysters',
          'Emptying bowels to balance bodily humours',
        ],
        focusClue: 'How was purging believed to restore bodily equilibrium?',
      },
      {
        dates: 'c1350',
        title: 'Herbal Apothecary Remedies & Theriac',
        bullets: [
          'Grinding crushed mint and sage in stone mortars',
          'Mixing seventy ingredients into treacle theriac',
          'Brewing bitter willow bark teas for fever',
        ],
        focusClue: 'Why did herbal recipes remain popular across all social classes?',
      },
      {
        dates: 'c1400',
        title: 'The Regimen Sanitatis & Clean Air',
        bullets: [
          'Following private Latin health rulebooks',
          'Burning sweet lavender sticks indoors',
          'Carrying fragrant posy flowers through smelly streets',
        ],
        focusClue: 'How did wealthy barons attempt to prevent sickness before it struck?',
      },
    ],
  },
  {
    lessonIndex: 3,
    lessonNum: 4,
    id: 'lesson_1_4',
    keyTopicBadge: 'KEY TOPIC 1.4',
    title: 'KT1.4: Medical Care Providers & Monastic Hospitals: ‘Care Not Cure’',
    enquiryQuestion:
      'Who provided medical care in medieval England, and why did hospitals focus on care rather than cure?',
    specAnchor:
      'Medical care providers: physicians, apothecaries, barber-surgeons; women in the home; hospitals (monastic care, care not cure).',
    tariff: 'Question 4: Explain Why [12 marks &bull; 15 mins]',
    examStem:
      'Explain why hospital care in medieval England was based on the concept of ‘care rather than cure’ in the period c1250–c1500. [12 marks]',
    stimulus: [
      'Monastic rules and religious charity',
      'The exclusion of infectious diseases (lepers and plague victims)',
    ],
    connectives:
      'One main reason was that... &bull; For example, ... &bull; This was important because... &bull; Another key factor was... &bull; In particular, ... &bull; Overall, the most decisive reason was... because...',
    wordBank:
      'care not cure &bull; monastic hospitals &bull; St Bartholomew’s (1123) &bull; infirmarer &bull; university physicians &bull; apothecaries &bull; barber-surgeons &bull; wise women &bull; fleam &bull; Lazar houses',
    timelineMission:
      'Turn to Pages 2–3 (Key Topic 1.4). In the drawing box, sketch the interior of a monastic hospital ward showing rows of beds facing a chapel altar. Annotate why monks prioritized prayer over medical surgery.',
    fourMark: {
      type: 'Difference',
      question:
        'Explain one way in which the work of hospitals in the Medieval period (c1250–c1500) was different from hospitals in the nineteenth century. [4 marks]',
      hint: 'Identify 1 valid difference, then explain with specific historical detail from both named eras.',
      stems:
        'One way hospital care differed was... &bull; In the Medieval period... &bull; In contrast, in the nineteenth century...',
    },
    leftPageQuip:
      'Medieval hospitals: clean sheets, warm porridge, 24-hour prayer, and absolutely zero doctors. It was luxury hospitality, not clinical medicine.',
    rightPageQuip:
      'Barber-surgeons: short back and sides, pull out a molar, lance a boil, amputate a leg. Multi-tasking at its finest and bloodiest.',
    linedLeftQuip:
      'Over 1,200 medieval hospitals in England were run by religious orders: their goal was spiritual salvation of the soul, not medical recovery of the body.',
    linedRightQuip:
      'Explain the hierarchy: wealthy barons hired Oxford-trained physicians; town merchants visited guild apothecaries; ordinary peasants relied on wise women.',
    stages: [
      {
        dates: 'c1250',
        title: 'University-Trained Physicians',
        bullets: [
          'Studying Latin texts for ten years in Oxford',
          'Consulting astronomical star charts for baronial clients',
          'Charging heavy silver fees without touching patients',
        ],
        focusClue: 'Why were university physicians accessible only to the ultra-wealthy?',
      },
      {
        dates: 'c1300',
        title: 'Guild Apothecaries & Spicers',
        bullets: [
          'Weighing dried poppy roots on brass scales',
          'Selling cheap herbal pills to town weavers',
          'Learning trade secrets through guild apprenticeships',
        ],
        focusClue: 'How did apothecaries provide accessible medicines to townspeople?',
      },
      {
        dates: 'c1320',
        title: 'Barber-Surgeons & Wound Care',
        bullets: [
          'Pulling rotten teeth with iron pliers',
          'Setting broken arm bones with wooden splints',
          'Cauterising bleeding flesh wounds with red-hot irons',
        ],
        focusClue: 'Why were barber-surgeons viewed as lower-status craftsmen?',
      },
      {
        dates: 'c1350',
        title: 'Monastic Hospitals: Care Not Cure',
        bullets: [
          'Sheltering bedridden pilgrims in monastic wards',
          'Providing warm woollen blankets and fresh vegetable stew',
          'Hearing Latin mass through chapel chancel screens',
        ],
        focusClue: 'Why did monastic hospitals deliberately avoid medical treatment?',
      },
      {
        dates: 'c1400',
        title: 'Women Healers & Household Care',
        bullets: [
          'Gathering wild chamomile in country hedgerows',
          'Delivering newborn babies in village cottages',
          'Applying warm bread poultices to swollen skin',
        ],
        focusClue: 'Why did the vast majority of sick people rely on female family members?',
      },
    ],
  },
  {
    lessonIndex: 4,
    lessonNum: 5,
    id: 'lesson_1_5',
    keyTopicBadge: 'KEY TOPIC 1.5',
    title: 'KT1.5: Case Study: Dealing with the Black Death (1348–1349)',
    enquiryQuestion:
      'Why did medieval society fail to halt the devastating mortality of the Black Death?',
    specAnchor:
      'Case study: The Black Death, 1348–49; beliefs about causes; approaches to treatment and prevention; local government action.',
    tariff: 'Question 5/6: Thematic Essay [16 marks + 4 marks SPaG &bull; 25 mins]',
    examStem:
      '‘The main reason why so many people died during the Black Death (1348–49) was because governments had no effective way of preventing disease.’ How far do you agree? Explain your answer. [16 marks + 4 marks SPaG]',
    stimulus: [
      'King Edward III’s cleanliness order (1349)',
      'Belief in miasma and supernatural causes',
    ],
    connectives:
      'One main reason was that... &bull; For example, ... &bull; This was important because... &bull; Another key factor was... &bull; In particular, ... &bull; Overall, the most decisive reason was... because...',
    wordBank:
      'Black Death (1348) &bull; Melcombe Regis &bull; bubonic plague &bull; pneumonic plague &bull; Yersinia pestis &bull; black rats &bull; Xenopsylla cheopis fleas &bull; buboes &bull; King Edward III &bull; East Smithfield mass graves &bull; miasma',
    timelineMission:
      'Turn to Pages 2–3 (Key Topic 1.5). In the drawing box, sketch the arrival of a trading cog at Melcombe Regis carrying rats and fleas, alongside an emergency mass burial pit at East Smithfield.',
    fourMark: {
      type: 'Similarity',
      question:
        'Explain one way in which responses to the Black Death (1348–49) were similar to responses to the Great Plague of London (1665). [4 marks]',
      hint: 'Identify 1 valid similarity, then explain with specific historical detail from both named eras.',
      stems:
        'One way responses were similar was... &bull; During the Black Death... &bull; Similarly, during the Great Plague of 1665...',
    },
    leftPageQuip:
      'In 1348, people blamed God, the planets, bad smells, and foreigners. The actual culprits—fleas on black rats—went completely unnoticed.',
    rightPageQuip:
      'King Edward III ordered the streets cleaned because of bad smells. It smelled marginally better, but fleas don’t care about fresh air.',
    linedLeftQuip:
      'Between 30% and 50% of England’s population died in eighteen months: churchyards overflowed, fields went unharvested, and villages were abandoned.',
    linedRightQuip:
      'Weigh the factors: did mortality explode because of scientific ignorance, municipal filth, or the sheer biological ferocity of pneumonic infection?',
    stages: [
      {
        dates: 'June 1348',
        title: 'Arrival at Melcombe Regis',
        bullets: [
          'Docking trade cogs from Gascony in Dorset',
          'Unloading flea-infested wool sacks onto wharves',
          'Spreading black rats into crowded timber cottages',
        ],
        focusClue: 'How did trade routes unwittingly bring the plague to England?',
      },
      {
        dates: 'Autumn 1348',
        title: 'Buboes & Pneumonic Terror',
        bullets: [
          'Swelling agonizing egg-sized groin lumps',
          'Coughing bloody phlegm across family rooms',
          'Killing infected farm labourers within three days',
        ],
        focusClue: 'Why was the pneumonic strain far deadlier than the bubonic form?',
      },
      {
        dates: 'Winter 1348',
        title: 'Desperate Treatments & Strapped Chickens',
        bullets: [
          'Lancing hard neck swellings with hot knives',
          'Strapping plucked live hens to dark sores',
          'Drinking crushed emerald stones dissolved in vinegar',
        ],
        focusClue: 'Why were medical treatments completely useless against the plague?',
      },
      {
        dates: '1349',
        title: 'King Edward III’s Cleanliness Order',
        bullets: [
          'Ordering town bailiffs to clear butchered animal entrails',
          'Shovelling horse dung out of unpaved London streets',
          'Lighting smoking pitch fires at road corners',
        ],
        focusClue: 'How did belief in miasma shape royal prevention orders?',
      },
      {
        dates: '1349–1350',
        title: 'Mass Burial Pits & Demographic Collapse',
        bullets: [
          'Digging vast emergency trenches at East Smithfield',
          'Piling stacked corpses under thin river clay',
          'Losing half of England’s agricultural workforce',
        ],
        focusClue: 'Why did the Black Death trigger a long-term social and economic crisis?',
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

function buildMedievalTwoPageWorkbook(unitData, period) {
  const coverImgBase64 =
    getBase64Image('units/edexcel_medicine/assets/authentic_medieval.jpg') ||
    getBase64Image('/images/authentic_medieval.jpg') ||
    '';

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Key Topic 1: Medicine in Medieval Britain, c1250–c1500 Workbook</title>
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
          KEY TOPIC 1 &bull; REVISION &amp; PRACTICE COMPANION
        </span>
        <h1 style="font-family: 'Playfair Display', serif; font-size: 20pt; font-weight: 900; color: #000000; margin: 4px 0 2px 0; line-height: 1.15; letter-spacing: -0.5px;">
          Medicine in Medieval Britain, c1250–c1500
        </h1>
        <p style="font-family: 'Georgia', serif; font-size: 9pt; color: #222222; margin: 0; font-style: italic;">
          Ideas on Causes, Prevention, Treatment, Medical Care &amp; The Black Death
        </p>
      </div>

      <!-- Prominent Primary Visual Source Centerpiece -->
      <div style="margin: 2px 0 5px 0; border: 1.5px solid #000000; border-radius: 4px; overflow: hidden; background: #ffffff;">
        <img src="${coverImgBase64}" alt="Medieval Plague Sufferers in Bed with Buboes" style="width: 100%; height: 93.5mm; object-fit: cover; object-position: center 40%; display: block; margin: 0 auto; filter: grayscale(100%);">
        <div style="display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #000000; padding: 3px 8px; border-top: 1.5px solid #000000; background: #ffffff;">
          <span><strong>Primary Visual Evidence:</strong> <em>Medieval Plague Sufferers in Bed with Buboes</em> &bull; Toggenburg Bible MS (1411)</span>
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
                Key Topic 1 Specification Framework (1HI0/11)
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
                  Key Topic 1.1: Supernatural &amp; Religious Explanations of Disease
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 8pt; font-style: italic; color: #333333; margin-top: 1.5px; line-height: 1.25;">
                  Why did the Catholic Church, scriptoria, and divine retribution dominate medieval understanding of illness?
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
                  Key Topic 1.2: Rational Explanations: Hippocrates, Galen &amp; The Four Humours
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 8pt; font-style: italic; color: #333333; margin-top: 1.5px; line-height: 1.25;">
                  Why did the Theory of Opposites, uroscopy wheels, and miasma remain unchallenged for centuries?
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
                  Key Topic 1.3: Approaches to Prevention &amp; Treatment: Rituals, Bleeding &amp; Purging
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 8pt; font-style: italic; color: #333333; margin-top: 1.5px; line-height: 1.25;">
                  How did medieval physicians balance fleam bloodletting, treacle theriac, and the Regimen Sanitatis?
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
                  Key Topic 1.4: Medical Care Providers &amp; Monastic Hospitals: ‘Care Not Cure’
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 8pt; font-style: italic; color: #333333; margin-top: 1.5px; line-height: 1.25;">
                  Who cared for the sick, and why did monastic hospitals prioritize spiritual comfort over medical cure?
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
                  Key Topic 1.5: Case Study: Dealing with the Black Death (1348–1349)
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 8pt; font-style: italic; color: #333333; margin-top: 1.5px; line-height: 1.25;">
                  Why was medieval society entirely powerless against the arrival of Yersinia pestis at Melcombe Regis?
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

      ${renderFooterStrip(1, 'The History Revision Hub &bull; GCSE History Paper 1 &bull; Key Topic 1 Revision Companion', 24)}
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
          Living Timeline &bull; Part 1: Medieval Ideas &amp; Medical Hierarchy (c1250–c1350)
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
                c. 1250 &bull; The Church &amp; The Monopoly on Medical Learning
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Key Topic 1.1</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.22;">
              The Catholic Church controls all English universities (Oxford, Cambridge) and hospital foundations. Monks hand-copy medical manuscripts in scriptoria, preserving Galen’s anatomical writings because his teleological view—that the body had a single divine Creator—aligned with Christian dogma.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 38mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>

        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #000000;">
                1277 &bull; The Imprisonment of Roger Bacon
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Key Topic 1.1</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.22;">
              Franciscan friar and Oxford scholar Roger Bacon is imprisoned by church leaders for heresy after writing that physicians should conduct original scientific experiments rather than blindly copying Galen. This imprisonment effectively halts independent anatomical inquiry for over two centuries.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 38mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>

        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #000000;">
                c. 1300 &bull; The Diagnostic Tools: Matula Flasks &amp; The Zodiac Man
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Key Topic 1.2</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.22;">
              Physicians practice uroscopy using glass matula flasks, comparing urine colour, density, and smell against 20-shade charts to diagnose humoral imbalance. They carry Vademecum pocketbooks containing the Zodiac Man to determine safe planetary alignments for phlebotomy (bloodletting).
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 38mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>

        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #000000;">
                c. 1320 &bull; The Medical Hierarchy: Physicians, Barber-Surgeons &amp; Apothecaries
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Key Topic 1.4</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.22;">
              A rigid division of medical labour establishes in England. Fewer than 100 elite university-trained physicians diagnose wealthy nobility. Town apothecaries mix theriac and herbal compounds, while lower-status barber-surgeons perform tooth-pulling, wound-cautery, and bloodletting.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 38mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>
      </div>

      ${renderFooterStrip(2, 'Roger Bacon spent years in a prison cell for suggesting doctors should actually test things. Remember that when your teacher asks you to write an extra paragraph!', 24)}
    </div>
  </div>

  <!-- PAGE 3: LIVING TIMELINE PART 2 -->
  <div class="page page-container recto-page" id="page-3">
    <div class="page-body-full">
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 6px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 11pt; color: #000000; margin: 0; font-weight: 800;">
          Living Timeline &bull; Part 2: Hospitals, Planetary Conjunctions &amp; The Black Death (c1345–1350)
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
                c. 1350 &bull; Monastic Hospitals: The Era of ‘Care Not Cure’
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Key Topic 1.4</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.22;">
              Over 1,200 hospitals run by monks and nuns operate in England (e.g. St Bartholomew’s, 1123). Patients receive clean bedding, warmth, food, and continuous prayer facing a chapel altar. Zero surgery or medical cure is attempted; lepers and plague victims are strictly barred.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 38mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>

        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #000000;">
                1345 &bull; The Great Planetary Conjunction in Aquarius
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Key Topic 1.5</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.22;">
              In March 1345, Mars, Jupiter, and Saturn align in Aquarius. University of Paris physicians state this celestial conjunction drew up poisonous vapours from the earth, corrupting the air with deadly miasma, preparing Europe for the Black Death.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 38mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>

        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #000000;">
                1348 &bull; The Black Death Reaches Melcombe Regis, Dorset
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Key Topic 1.5</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.22;">
              In June 1348, the pestilence arrives on trade ships carrying black rats and fleas. The dual epidemic—bubonic plague (flea bites, agonizing buboes) and pneumonic plague (airborne coughing droplets)—kills 30–50% of England’s population within 18 months.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 38mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>

        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #000000;">
                1349 &bull; King Edward III’s Cleanliness Order &amp; East Smithfield Mass Pits
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Key Topic 1.5</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.22;">
              Alarmed by rotting waste and stench, Edward III orders London streets cleared of dung to remove miasma. Churchyards overflow; emergency mass burial trenches are dug outside city walls at East Smithfield to bury hundreds of corpses daily.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 38mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>
      </div>

      ${renderFooterStrip(3, 'King Edward III ordered Londoners to clean human filth off the streets in 1349. Outstanding for civic smell, totally useless against Yersinia pestis fleas.', 24)}
    </div>
  </div>
`;

  // ====================================================================
  // PAGES 4–23: 5 DEDICATED 4-PAGE MODULES
  // ====================================================================
  medievalConfigs.forEach((cfg) => {
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
              Key Topic 1 &bull; Master Knowledge Ledger
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; border: 1px solid #000000; padding: 1px 6px; border-radius: 2px;">
              Specification Audit
            </span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #000000; margin: 0 0 6px 0; line-height: 1.3;">
            Before sitting Edexcel Paper 1 (Section B), you must be able to deploy precise historical evidence across all five areas of Medieval Britain (c1250–c1500). Use this ledger for spaced retrieval practice.
          </p>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px 16px;">
          <div>
            <div style="font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 800; text-transform: uppercase; color: #000000; border-bottom: 1px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
              1. Supernatural &amp; Religious Causes
            </div>
            <ul style="margin: 0; padding-left: 14px; font-family: 'Georgia', serif; font-size: 7.5pt; line-height: 1.3; color: #000000;">
              <li>God sent disease to punish sin or test faith.</li>
              <li>Church controlled learning through scriptoria.</li>
              <li>Bacon imprisoned in 1277 for advocating experiments.</li>
              <li>1345 planetary alignment of Saturn, Jupiter &amp; Mars.</li>
            </ul>
          </div>
          <div>
            <div style="font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 800; text-transform: uppercase; color: #000000; border-bottom: 1px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
              2. Rational Explanations (Humours &amp; Miasma)
            </div>
            <ul style="margin: 0; padding-left: 14px; font-family: 'Georgia', serif; font-size: 7.5pt; line-height: 1.3; color: #000000;">
              <li>Four Humours: blood, phlegm, yellow bile, black bile.</li>
              <li>Galen’s Theory of Opposites balanced excess fluids.</li>
              <li>Matula flasks used to inspect urine against 20 shades.</li>
              <li>Miasma: foul air from rotting dung, waste &amp; cesspools.</li>
            </ul>
          </div>
          <div>
            <div style="font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 800; text-transform: uppercase; color: #000000; border-bottom: 1px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
              3. Approaches to Prevention &amp; Treatment
            </div>
            <ul style="margin: 0; padding-left: 14px; font-family: 'Georgia', serif; font-size: 7.5pt; line-height: 1.3; color: #000000;">
              <li>Religious: prayer, fasting, pilgrimages, flagellation.</li>
              <li>Humoral: phlebotomy (vein fleams/leeches) &amp; purging.</li>
              <li>Apothecaries mixed herbal compounds and theriac.</li>
              <li>Regimen Sanitatis: personalized lifestyle health rules.</li>
            </ul>
          </div>
          <div>
            <div style="font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 800; text-transform: uppercase; color: #000000; border-bottom: 1px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
              4. Hospitals &amp; The Black Death (1348–49)
            </div>
            <ul style="margin: 0; padding-left: 14px; font-family: 'Georgia', serif; font-size: 7.5pt; line-height: 1.3; color: #000000;">
              <li>Over 1,200 hospitals provided ‘care not cure’.</li>
              <li>Lepers and plague victims strictly excluded.</li>
              <li>Arrived at Melcombe Regis via trade ships (June 1348).</li>
              <li>Killed 30–50% of England: 1349 London cleanliness order.</li>
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
          ${medievalConfigs
            .map((cfg, idx) => {
              const quizUrl = `https://the-history-revision-hub.netlify.app/?unit=edexcel_medicine&lesson=${idx}&quiz=true`;
              const qrSvg = generateQrSvg(quizUrl);
              const shortLabels = [
                'Supernatural',
                'Four Humours',
                'Treatments',
                'Hospitals',
                'Black Death',
              ];
              return `
          <div style="border: 1px solid #000000; border-radius: 3px; padding: 3px 2px; background: #ffffff; display: flex; flex-direction: column; align-items: center; justify-content: space-between;">
            <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; margin-bottom: 1px;">
              KT1.${cfg.lessonNum}
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

      ${renderFooterStrip(24, 'Unlike medieval bloodletting, scanning these quiz QR codes is 100% painless and significantly more likely to boost your survival in the exam hall.', 24)}
    </div>
  </div>
</body>
</html>
`;

  return html;
}

module.exports = { buildMedievalTwoPageWorkbook };
