/**
 * History Revision Hub — Master Two-Page Spread Pupil Workbook Engine
 *
 * Target: units/water_and_sanitation (KS3 Year 7: Water & Sanitation Through Time)
 * Output: public/units/water_and_sanitation/pupil_workbook_v2.html
 * PDF:    public/pdfs/water_and_sanitation_pupil_workbook_V2.pdf
 *
 * Gold Standard Publisher Architecture:
 * - 16-Page A4 Pupil Workbook Standard (Staged V2 edition)
 * - Friendly, accessible teacher language for Year 7 (zero pseudo-academic AI fluff)
 * - Page 1: Master Front Cover with 118mm photo frame, pupil info card, and syllabus overview
 * - Pages 2–3: Living Unit Timeline (6 Milestones across 2 pages with 44mm full-width sketchpads)
 * - Pages 4–15: 6 Double-Page Enquiry Spreads:
 *     Left Page (Verso): Do Now (5 questions), Key Vocabulary, Task 4 Source Investigation (filling page, 0 dead void)
 *     Right Page (Recto): Planning Your Answer (3 columns), Key Words & Sentence Starters, Writing Guide,
 *                         21 Ruled Writing Lines (7.0mm), Timeline Mission Box, Page Footer Strip (Zero DIRT box)
 * - Page 16: Outside Back Cover (Student Assessment Record, WWW/EBI Feedback Lines, QR Revision Hub)
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const QRCode = require('qrcode');

const ROOT_DIR = path.join(__dirname, '..');
const dataPath = path.join(ROOT_DIR, 'units', 'water_and_sanitation', 'data_v2_4act.js');

if (!fs.existsSync(dataPath)) {
  console.error('❌ Data file not found:', dataPath);
  process.exit(1);
}

// Load 4-Act staged data safely
const dataContent = fs.readFileSync(dataPath, 'utf8');
const sanitized = dataContent.replace(/export default.*;/g, '').replace(/export {.*};/g, '');
const mod = { exports: {} };
const fn = new Function('module', 'exports', sanitized);
fn(mod, mod.exports);
const unitData = mod.exports;

const lessons = unitData.lessons || [];
console.log(`Loaded ${lessons.length} Water & Sanitation 4-Act lessons for V2 Workbook.`);

/**
 * Image helper (base64 data URI)
 */
function getBase64Image(relPath) {
  if (!relPath) return '';
  const clean = relPath.replace(/^\//, '');
  const candidates = [
    path.join(ROOT_DIR, 'public', clean),
    path.join(ROOT_DIR, clean),
    path.join(ROOT_DIR, 'public', 'images', path.basename(clean)),
    path.join(ROOT_DIR, 'units', 'water_and_sanitation', 'assets', path.basename(clean)),
    path.join(ROOT_DIR, 'public', 'units', 'water_and_sanitation', 'assets', path.basename(clean)),
  ];

  for (const cand of candidates) {
    if (fs.existsSync(cand) && fs.statSync(cand).isFile()) {
      const ext = path.extname(cand).toLowerCase();
      let mime = 'image/jpeg';
      if (ext === '.png') mime = 'image/png';
      if (ext === '.svg') mime = 'image/svg+xml';
      const b64 = fs.readFileSync(cand).toString('base64');
      return `data:${mime};base64,${b64}`;
    }
  }
  return relPath;
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

// Friendly revision quips for Year 7 Water & Sanitation
const revisionQuips = [
  'The History Department • Water & Sanitation Through Time • Year 7 Workbook', // Page 1
  '"A Roman bath was not just for washing—it was where politics, deals, and gossip happened."', // Page 2
  '"Clean water is not an accident of nature; it is a triumph of engineering and public health."', // Page 3
  '"Roman lead pipes at Fishbourne carried fresh spring water under gravity pressure."', // Page 4
  '"Always explain WHY an engineering achievement improved health, not just that it existed."', // Page 5
  '"Medieval monks washed in filtered spring water while townspeople drank from polluted rivers."', // Page 6
  '"Connectives turn facts into explanations: Consequently, As a result, Because of this..."', // Page 7
  '"The plague doctor’s beak was packed with herbs because people believed bad smells caused plague."', // Page 8
  '"Use PEEL paragraphs to give your historical answer a strong, clear structure."', // Page 9
  '"Chadwick proved that filthy slums were not just cruel—they cost taxpayers a fortune."', // Page 10
  '"Support your explanation with named people, dates, and historical facts."', // Page 11
  '"John Snow mapped cholera deaths bar by bar to prove the water was poisoning Soho."', // Page 12
  '"Explain how evidence disproved old ideas like miasma and led to modern science."', // Page 13
  '"It took the Great Stink of 1858 boiling in Parliament to finally end fifty years of excuses."', // Page 14
  '"Joseph Bazalgette built 82 miles of sewers that still keep London healthy today."', // Page 15
  'Water & Sanitation Mastery Complete • Assessment & Revision Hub', // Page 16
];

function renderFooterStrip(pageNum, quipText, totalPages = 16) {
  const isEven = pageNum % 2 === 0;
  if (isEven) {
    return `
      <div class="page-footer-strip">
        <span class="footer-page-num" style="margin-right: 8px;">${pageNum}/${totalPages}</span>
        <span class="footer-quip" style="text-align: right; flex: 1;">${quipText}</span>
      </div>`;
  } else {
    return `
      <div class="page-footer-strip">
        <span class="footer-quip" style="text-align: left; flex: 1; margin-right: 8px;">${quipText}</span>
        <span class="footer-page-num">${pageNum}/${totalPages}</span>
      </div>`;
  }
}

// 6 Bespoke Lesson Configurations (Friendly, Year 7 Accessible Teacher Voice)
const lessonConfigs = [
  {
    // Lesson 1: Roman Britain & Fishbourne Palace (c.43–410 AD)
    lessonNum: 1,
    skill: 'Change & Continuity',
    title: 'How did Roman engineering transform clean water and public health?',
    inquiryQuestion:
      'Was Roman water engineering built to protect ordinary people, or to show off imperial power and luxury?',
    doNow: [
      { q: 'What kind of houses did Celtic Britons live in before AD 43?' },
      { q: 'Why did Iron Age farming villages produce very little concentrated sewage?' },
      { q: 'Where did pre-Roman Britons get their fresh drinking water?' },
      { q: 'What branch of history studies buried ruins, coins, and artifacts?' },
      { q: 'In what year did Emperor Claudius invade Britain?' },
    ],
    objectives: [
      'Understand how Roman aqueducts and gravity conduits transported freshwater into towns.',
      'Explore the hygiene and social role of public bathhouses (thermae) and latrines.',
      'Discover why Roman lead pipes at Fishbourne Palace were an engineering wonder.',
    ],
    vocabPrompt:
      'Explain the difference between an <strong>Aqueduct</strong> (a bridge or channel carrying fresh spring water) and a <strong>Cesspit</strong> (a pit dug in the ground for collecting waste):',
    bridgeTask: {
      type: 'visual_archaeology',
      title: 'Task 4: Source Investigation — Roman Lead Water Pipes at Fishbourne Palace',
      imgSrc: '/images/water_local_fishbourne.jpg',
      imgCaption: 'Archaeological Excavation Plate: Roman Lead Water Pipes at Fishbourne',
      sourceText:
        '“Excavations at Fishbourne Roman Palace revealed a sophisticated water system dating to c.75 AD. Fresh spring water was piped over miles through jointed lead pipes and clay conduits to feed a monumental garden pool, fountains, and a luxury private bathhouse with heated floors and stone sewers flushing waste away.”',
      shelfmark: 'SUSSEX ARCHAEOLOGICAL SOCIETY • FISHBOURNE EXCAVATIONS',
      annotations: [
        '① <strong>Underline:</strong> the luxury features supplied with fresh water at Fishbourne.',
        '② <strong>Circle:</strong> the material used to make the water pipes (lead).',
        '③ <strong>Box:</strong> the date of the Fishbourne water system (c.75 AD).',
      ],
      questionA:
        'What does this archaeological find prove about the skills of Roman engineers in Britain?',
      questionB:
        'Why was this level of clean water technology only enjoyed by the rich and powerful?',
      clue: 'Helpful Clue: Look at the jointed lead pipes. Romans understood metal casting and water pressure, but ordinary villagers carried water in wooden buckets.',
      scholarsEdge:
        'Challenge Question: Did Roman water systems collapse after AD 410 because people forgot the technology, or because the government vanished?',
    },
    structureStrip: [
      {
        col: '1. FRESH RUNNING WATER',
        prompt: 'Aqueducts, gravity flow, spring water, public fountains, and lead pipes.',
      },
      {
        col: '2. BATHS & LATRINES',
        prompt: 'Public thermae, hypocaust heating, and stone sewer channels flushing waste away.',
      },
      {
        col: '3. YOUR CONCLUSION',
        prompt:
          'Did Romans build water systems for public health, or for imperial power and luxury?',
      },
    ],
    wordBank:
      'Aqueduct • Cloaca (sewer) • Thermae • Hypocaust • Lead pipes • Fishbourne Palace • Gravity flow • Latrine',
    connectives:
      'The most impressive Roman achievement was... • For example, at Fishbourne Palace... • However, public health was limited because... • In conclusion...',
    timelineMission:
      'Turn to Pages 2–3 (Milestone 1: c.43–410 AD). In the sketchpad, draw the stone arches of a Roman aqueduct or jointed lead water pipes stamped with the imperial mark.',
  },

  {
    // Lesson 2: Medieval Towns, Monasteries & The Black Death (1100–1500)
    lessonNum: 2,
    skill: 'Comparison & Living Conditions',
    title: 'Why were medieval monasteries so clean while towns were choked with filth?',
    inquiryQuestion:
      'Was medieval town filth caused by a lack of money, or by mistaken medical beliefs like miasma?',
    doNow: [
      { q: 'What happened to Roman aqueducts and baths after the legions left in AD 410?' },
      { q: 'Which famous Roman palace in Sussex had running water and lead pipes?' },
      { q: 'Did Romans know that microscopic bacteria caused diseases like cholera?' },
      { q: 'What word describes water flowing downhill using its natural weight?' },
      { q: 'Why did Roman soldiers and governors love spending hours in public bathhouses?' },
    ],
    objectives: [
      'Contrast living conditions in crowded, muddy medieval towns with clean, orderly monasteries.',
      'Investigate the work of gong farmers, cesspits, and town court fines for dumping waste.',
      'Understand how the Black Death (1348) challenged medieval ideas about health and disease.',
    ],
    vocabPrompt:
      'Explain the difference between <strong>Miasma</strong> (the mistaken belief that bad smells cause disease) and a <strong>Gong Farmer</strong> (a worker paid to shovel waste out of cesspits at night):',
    bridgeTask: {
      type: 'dual_source_interrogation',
      title: 'Task 4: Source Investigation — Town Court Fines vs Monastic Water Plans',
      sourceATitle: 'SOURCE A: Norwich & Winchester Court Records (1312 & 1421)',
      sourceAText:
        '“1312: John le Ropere is fined two shillings for keeping a rotting dung-heap in the public street... 1421: Inquest of Winchester: John Hende has allowed his cesspit to overflow into the King’s ditch, polluting water where women wash clothes.”',
      sourceAShelfmark: 'HAMPSHIRE & NORFOLK RECORD OFFICES • COURT ROLLS',
      sourceBTitle: 'SOURCE B: Waterworks Plan of Christ Church Priory, Canterbury (c.1165)',
      sourceBText:
        '“Drawn by Monk Wibert: Fresh spring water is collected outside Canterbury, passed through five settling tanks to remove sand and mud, piped underground into the monks’ washing cloister, and flushed through latrines into the river.”',
      sourceBShelfmark: 'TRINITY COLLEGE CAMBRIDGE • EADWINE PSALTER',
      annotations: [
        '① <strong>Underline:</strong> the fine John le Ropere paid for his dung-heap in Source A.',
        '② <strong>Circle:</strong> the 5 settling tanks used by monks to filter water in Source B.',
        '③ <strong>Box:</strong> what happened when John Hende’s cesspit overflowed into the ditch.',
      ],
      questionA:
        'What do these sources prove about why monks lived longer, healthier lives than townspeople?',
      questionB:
        'Why did medieval town councils struggle to keep streets clean even when they fined polluters?',
      clue: 'Helpful Clue: Towns grew rapidly with narrow unpaved streets, while monasteries were planned and funded before they were built.',
      scholarsEdge:
        'Challenge Question: If townspeople believed bad smells caused plague, why did they still dump animal guts in the street?',
    },
    structureStrip: [
      {
        col: '1. TOWN SQUALOR',
        prompt:
          'Overflowing cesspits, roaming pigs, butchers dumping offal, and night-time gong farmers.',
      },
      {
        col: '2. MONASTIC CLEANLINESS',
        prompt: 'Settling tanks, lead conduits, running water fountains, and isolated cloisters.',
      },
      {
        col: '3. YOUR CONCLUSION',
        prompt:
          'Did towns fail because of poverty and weak government, or because miasma led them astray?',
      },
    ],
    wordBank:
      'Gong Farmer • Cesspit • Miasma • Settling Tank • Conduit • Black Death (1348) • Court Leet • Monks',
    connectives:
      'Medieval towns were desperately dirty because... • In sharp contrast, monasteries stayed clean by... • When plague struck in 1348, people believed... • Therefore, I conclude that...',
    timelineMission:
      'Turn to Pages 2–3 (Milestone 2: 1100–1350). In the sketchpad, sketch the Canterbury waterworks with its settling tanks, or a gong farmer carrying barrels of waste at night.',
  },

  {
    // Lesson 3: Early Modern Filth & The Great Plague of 1665
    lessonNum: 3,
    skill: 'Change & Continuity',
    title:
      'How did London’s growth create deadly filth, and how did people react to the 1665 Great Plague?',
    inquiryQuestion:
      'Did public health improve during Tudor and Stuart times, or did overcrowding make towns more dangerous?',
    doNow: [
      { q: 'What night-workers were paid to empty human waste from medieval cesspits?' },
      { q: 'What was the Latin word for bad, poisonous air that people blamed for illness?' },
      { q: 'In what year did the Black Death first hit Britain?' },
      { q: 'Name one way monks filtered their drinking water in medieval monasteries.' },
      { q: 'Why were pigs and butchery offal banned from medieval town streets?' },
    ],
    objectives: [
      'Explain how London’s population boom created open sewer ditches like the Fleet Ditch.',
      'Investigate Sir John Harington’s 1596 invention of the flushing toilet (the "Ajax").',
      'Evaluate how authorities fought the 1665 Great Plague with red crosses, watchmen, and plague doctors.',
    ],
    vocabPrompt:
      'Explain the difference between <strong>Quarantine</strong> (locking people inside their homes to stop disease spreading) and <strong>Miasma</strong> (believing disease came from foul smells):',
    bridgeTask: {
      type: 'visual_plague',
      title: 'Task 4: Source Investigation — The Plague Doctor & The 1665 London Plague Orders',
      imgSrc: '/images/plague_doctor_1665.png',
      imgCaption: 'Historical Visual: The 17th-Century Plague Doctor Costume',
      sourceText:
        '“Every visited house shall be shut up with a red cross marked upon the middle of the door a foot long, with these words in capital letters: ‘LORD HAVE MERCY UPON US.’ And a watchman shall stand day and night before the door, to keep the people from coming forth... All dogs and cats shall immediately be destroyed by the dog-killer.”',
      shelfmark: 'LONDON METROPOLITAN ARCHIVES • ORDERS OF THE LORD MAYOR (1665)',
      annotations: [
        '① <strong>Underline:</strong> the words painted in red on infected houses.',
        '② <strong>Circle:</strong> the animals ordered to be killed immediately.',
        '③ <strong>Box:</strong> who stood outside the door day and night.',
      ],
      questionA: 'What was the aim of locking families inside their homes with a watchman outside?',
      questionB:
        'Why did killing thousands of pet dogs and cats accidentally make the plague much worse?',
      clue: 'Helpful Clue: Remember that plague fleas lived on black rats. When people killed cats and dogs, the rat population exploded and spread the fleas everywhere!',
      scholarsEdge:
        'Challenge Question: How does the plague doctor’s herb-filled beak prove that doctors in 1665 still had no idea what truly caused disease?',
    },
    structureStrip: [
      {
        col: '1. CROWDED SQUALOR',
        prompt: 'Wooden shacks, open Fleet Ditch, cesspools under floorboards, and poor drainage.',
      },
      {
        col: '2. INVENTIONS & FAILURE',
        prompt:
          'Sir John Harington’s 1596 flushing toilet failed because towns had no running water.',
      },
      {
        col: '3. YOUR CONCLUSION',
        prompt:
          'Did red crosses and quarantine show government care, or panic and medical ignorance?',
      },
    ],
    wordBank:
      'Plague Doctor • Red Cross • Quarantine • Sir John Harington • Ajax toilet • Fleet Ditch • 1665 Great Plague • Watchmen',
    connectives:
      'Tudor and Stuart London grew dangerously filthy because... • Although Harington invented the flushing toilet... • In 1665, the authorities reacted by... • Overall, I judge that...',
    timelineMission:
      'Turn to Pages 2–3 (Milestone 3: 1596–1665). In the sketchpad, draw the plague doctor’s long-beaked mask or the red cross with ‘Lord Have Mercy Upon Us’.',
  },

  {
    // Lesson 4: Industrial Towns, Chadwick & The 1848 Public Health Act
    lessonNum: 4,
    skill: 'Evidence & Statistics',
    title:
      'Why did Victorian industrial cities become death traps, and how did Chadwick fight back?',
    inquiryQuestion:
      'Was Edwin Chadwick’s 1842 Report successful in forcing Britain to clean up its industrial slums?',
    doNow: [
      { q: 'What symbol was painted on doors during the 1665 Great Plague?' },
      { q: 'Who invented the first flushing toilet for Queen Elizabeth I in 1596?' },
      { q: 'Why did the first flushing toilet fail to improve health for ordinary people?' },
      { q: 'What open London sewer ditch was famous for dead dogs and rotting waste?' },
      { q: 'What French phrase describes the government belief in "leaving things alone"?' },
    ],
    objectives: [
      'Explore living conditions in cramped back-to-back slum housing and damp cellar dwellings.',
      'Analyze Edwin Chadwick’s 1842 Sanitary Report and his shocking life-expectancy statistics.',
      'Understand why the 1848 Public Health Act failed because of "laissez-faire" attitudes.',
    ],
    vocabPrompt:
      'Explain the difference between <strong>Laissez-faire</strong> (the belief that government should not interfere in business or health) and <strong>Public Health</strong> (government action to provide clean water and sewers for everyone):',
    bridgeTask: {
      type: 'sanitary_table',
      title:
        'Task 4: Source Investigation — Chadwick’s 1842 Report on the Sanitary Condition of Workers',
      sourceTitle:
        'Source C: Life Expectancy by Social Class and Location (Chadwick’s 1842 Statistics)',
      shelfmark: 'BRITISH PARLIAMENTARY PAPERS • CHADWICK REPORT (1842)',
      sourceText:
        '“The hard arithmetic of disease: The average age of death of a labourer in rural Rutland was 38 years; in industrial Manchester, it was just 17 years. In Liverpool, over half of all working-class children died before their fifth birthday, poisoned by stagnant cesspools beneath cellar floors.”',
      tableHeaders: [
        'District / Social Class',
        'Gentry & Professional',
        'Tradesmen & Shopkeepers',
        'Artisans & Labourers',
      ],
      tableRows: [
        ['Rural Rutland (Farming county)', '52 years', '41 years', '38 years'],
        ['Leeds (Industrial textile city)', '44 years', '27 years', '19 years'],
        ['Manchester (Cotton factory capital)', '38 years', '20 years', '17 years'],
        ['Liverpool (Major seaport & slums)', '35 years', '22 years', '15 years'],
      ],
      annotations: [
        '① <strong>Underline:</strong> the average age of death for a labourer in Manchester (17 years).',
        '② <strong>Circle:</strong> the age of death for a labourer in farming Rutland (38 years).',
        '③ <strong>Box:</strong> what poisoned children under five in Liverpool cellar dwellings.',
      ],
      questionA:
        'Using the table, explain why moving from the countryside to a factory city halved a worker’s life:',
      questionB:
        'How did Chadwick use these statistics to argue that cleaning up slums would save taxpayers money?',
      clue: 'Helpful Clue: Chadwick argued that sick workers could not work, meaning their families ended up in the workhouse, costing wealthy ratepayers more in poor relief!',
      scholarsEdge:
        'Challenge Question: Why did wealthy ratepayers denounce Chadwick as a "tyrant" when he suggested building national sewer systems?',
    },
    structureStrip: [
      {
        col: '1. INDUSTRIAL SQUALOR',
        prompt:
          'Cellar dwellings, back-to-back terraces, shared outdoor privies, and cesspool leaks.',
      },
      {
        col: '2. CHADWICK’S EVIDENCE',
        prompt: '1842 Report, statistics proving dirt caused early death, and economic arguments.',
      },
      {
        col: '3. YOUR CONCLUSION',
        prompt:
          'Did the 1848 Public Health Act fail because it was voluntary, or did ratepayers hate spending money?',
      },
    ],
    wordBank:
      'Edwin Chadwick • Sanitary Report (1842) • Laissez-faire • Cellar dwellings • 1848 Public Health Act • Ratepayers • Life expectancy',
    connectives:
      'Victorian factory cities were deadly because... • In 1842, Edwin Chadwick revolutionized reform by... • However, the 1848 Public Health Act failed because... • In conclusion, I judge that...',
    timelineMission:
      'Turn to Pages 2–3 (Milestone 4: 1842–1848). In the sketchpad, sketch Chadwick’s scales comparing Rutland (38 years) vs Manchester (17 years), or back-to-back slum houses.',
  },

  {
    // Lesson 5: John Snow, Cholera & The 1854 Broad Street Pump
    lessonNum: 5,
    skill: 'Scientific Methodology',
    title: 'How did Dr John Snow prove that cholera was spread by contaminated drinking water?',
    inquiryQuestion:
      'Did Dr John Snow’s shoe-leather detective work defeat cholera immediately, or did miasma theory hold Britain back?',
    doNow: [
      { q: 'In what year did Edwin Chadwick publish his famous Sanitary Report?' },
      { q: 'What was the average life expectancy of a Manchester worker in 1842?' },
      { q: 'Why did most councils ignore the 1848 Public Health Act?' },
      { q: 'What deadly bacterial water disease first invaded Britain in 1831?' },
      { q: 'What theory said illness was spread by foul stenches and rotting mist?' },
    ],
    objectives: [
      'Understand the terrifying symptoms and rapid spread of Asiatic Cholera in Victorian Britain.',
      'Investigate how Dr John Snow mapped cholera deaths around the Broad Street water pump in Soho (1854).',
      'Discover why brewery workers survived, and why removing the pump handle was a turning point.',
    ],
    vocabPrompt:
      'Explain the difference between <strong>Water-Borne Disease</strong> (illness spread by drinking contaminated water) and <strong>Miasma Theory</strong> (the belief that bad smells spread sickness):',
    bridgeTask: {
      type: 'visual_cholera_map',
      title: 'Task 4: Source Investigation — Dr John Snow’s Broad Street Cholera Spot Map (1854)',
      imgSrc: '/images/john_snow_cholera_map.jpg',
      imgCaption: 'Primary Cartography: Dr John Snow’s 1854 Spot Map of Soho',
      sourceText:
        '“Within 250 yards of the Broad Street pump, 500 deaths occurred in ten days. Nearby, at the Lion Brewery, none of the 70 workers died—they were given free beer and never drank pump water. At the workhouse with its own deep well, only 5 of 535 inmates caught cholera. On 7 September 1854, the pump handle was removed.”',
      shelfmark: 'WELLCOME HISTORICAL MEDICAL COLLECTION • SNOW MONOGRAPH (1855)',
      annotations: [
        '① <strong>Underline:</strong> what happened to the 70 workers at the Lion Brewery.',
        '② <strong>Circle:</strong> the date the Broad Street pump handle was removed (7 September 1854).',
        '③ <strong>Box:</strong> the number of deaths within 250 yards of the pump (500 deaths).',
      ],
      questionA:
        'Why were the brewery workers and workhouse inmates the vital clues that solved the mystery?',
      questionB:
        'Why did doctors continue to believe in miasma for thirty years after Snow removed the pump handle?',
      clue: 'Helpful Clue: Brewery workers drank boiled beer; workhouse inmates had their own private deep well. If bad smells in the air caused cholera, everyone would have died!',
      scholarsEdge:
        'Challenge Question: How did John Snow’s map create the modern science of epidemiology (tracking disease outbreaks)?',
    },
    structureStrip: [
      {
        col: '1. THE CHOLERA PANIC',
        prompt: 'Sudden deaths, blue skin, dehydration, and terrifying miasma beliefs.',
      },
      {
        col: '2. DETECTIVE EVIDENCE',
        prompt: 'Door-to-door interviews, spot map bars, and brewery vs pump drinkers.',
      },
      {
        col: '3. YOUR CONCLUSION',
        prompt:
          'Did removing the pump handle convince Britain, or did doctors stubbornly resist changing their minds?',
      },
    ],
    wordBank:
      'Dr John Snow • Broad Street pump • Asiatic Cholera • Spot Map • Lion Brewery • Soho • Epidemiology • Miasma',
    connectives:
      'When cholera struck Soho in 1854, most doctors believed... • However, Dr John Snow acted like a detective by... • His crucial breakthrough came when he noticed... • Consequently, Snow proved that...',
    timelineMission:
      'Turn to Pages 2–3 (Milestone 5: 1854). In the sketchpad, sketch the famous iron Broad Street pump with its handle removed, or the black bars marking cholera deaths.',
  },

  {
    // Lesson 6: The Great Stink (1858) & Joseph Bazalgette's Sewers
    lessonNum: 6,
    skill: 'Causation & Engineering',
    title:
      'How did the Great Stink of 1858 finally force Parliament to build London’s mega-sewers?',
    inquiryQuestion:
      'Did Britain clean up its water because politicians cared about the poor, or because the Great Stink reached their own noses?',
    doNow: [
      {
        q: 'Which Soho street pump was identified by Dr John Snow as the source of cholera in 1854?',
      },
      { q: 'Why did the 70 workers at the Lion Brewery survive the cholera outbreak?' },
      {
        q: 'What action did officials take on 7 September 1854 to stop the Soho cholera epidemic?',
      },
      { q: 'Did doctors immediately believe John Snow’s water theory in 1854?' },
      { q: 'What major river runs through London that had become an open sewer by the 1850s?' },
    ],
    objectives: [
      'Understand how flush toilets emptied into the River Thames, turning it into a boiling open sewer.',
      'Investigate the Great Stink of June 1858 and how MPs soaked curtains in lime to breathe in Parliament.',
      'Discover how Sir Joseph Bazalgette built 82 miles of brick sewers, leading to the 1875 Public Health Act.',
    ],
    vocabPrompt:
      'Explain the difference between an <strong>Intercepting Sewer</strong> (a giant pipe that catches sewage before it hits the river and carries it far away) and <strong>Compulsory Legislation</strong> (a law that forces councils to build clean water systems):',
    bridgeTask: {
      type: 'visual_bazalgette',
      title: 'Task 4: Source Investigation — Building Joseph Bazalgette’s Brick Sewers (c.1860s)',
      imgSrc: '/images/bazalgette_sewer.jpg',
      imgCaption:
        'Engineering Archive Plate: Construction of Egg-Shaped Brick Sewers Beneath London',
      sourceText:
        '“In June 1858, a blazing heatwave turned the River Thames into a bubbling stew of human waste. In the House of Commons, MPs fled the library holding scented handkerchiefs, and committee rooms were soaked in chloride of lime. Within 18 days, Parliament abandoned fifty years of excuses, passing a bill granting £3 million for Chief Engineer Joseph Bazalgette to build 82 miles of intercepting brick sewers.”',
      shelfmark: 'INSTITUTION OF CIVIL ENGINEERS • BAZALGETTE PAPERS (1860)',
      annotations: [
        '① <strong>Underline:</strong> what MPs held over their faces when trying to work in Parliament.',
        '② <strong>Circle:</strong> the number of days it took Parliament to pass the sewer law (18 days).',
        '③ <strong>Box:</strong> the total length of underground intercepting brick sewers (82 miles).',
      ],
      questionA:
        'What does this source reveal about why politicians finally acted after ignoring slums for fifty years?',
      questionB:
        'How did Bazalgette’s egg-shaped sewers and Portland cement permanently wipe out cholera in London?',
      clue: 'Helpful Clue: For decades, poor children died in cellars and MPs said taxes were too high. When MPs themselves couldn’t breathe in their own debating chamber, money was approved in 18 days!',
      scholarsEdge:
        'Challenge Question: How did Bazalgette’s sewers pave the way for the 1875 Public Health Act, making clean water a legal right in Britain?',
    },
    structureStrip: [
      {
        col: '1. THE GREAT STINK',
        prompt: 'Summer 1858 heatwave, Thames boiling with sewage, and MPs fleeing the chamber.',
      },
      {
        col: '2. MEGA-ENGINEERING',
        prompt:
          '318 million bricks, 82 miles of sewers, Portland cement, and gravity flow to the sea.',
      },
      {
        col: '3. YOUR CONCLUSION',
        prompt:
          'Did cholera end because of science, heroic engineering, or politicians protecting themselves?',
      },
    ],
    wordBank:
      'The Great Stink (1858) • Joseph Bazalgette • River Thames • Intercepting sewers • Portland cement • 1875 Public Health Act • Chloride of lime',
    connectives:
      'For decades, Parliament refused to spend money on sewers because of laissez-faire, but in June 1858... • The Great Stink forced politicians to act because... • Bazalgette’s underground engineering was a triumph because... • Ultimately, I conclude that...',
    timelineMission:
      'Turn to Pages 2–3 (Milestone 6: 1858–1875). In the sketchpad, sketch the egg-shaped brick sewer tunnel or the Victoria Embankment hiding the pipes beneath London.',
  },
];

// Timeline Milestones across Pages 2 & 3 (3 Milestones per page, 100% full-width cards)
const timelineMilestones = [
  // Page 2 Milestones (Lessons 1–3)
  {
    page: 2,
    date: 'c.43–410 AD',
    title: 'Roman Aqueducts, Bathhouses & Fishbourne Lead Pipes',
    lesson: 'Lesson 1',
    summary:
      'Roman engineers bring stone aqueducts, communal bathhouses, and gravity sewers to Britain. At Fishbourne Palace in Sussex, jointed lead water pipes carry fresh running water into garden pools and private bath suites, though ordinary Britons still rely on muddy streams.',
    sketchPrompt:
      'Sketch your visual symbol: The stone arches of a Roman aqueduct or jointed lead pipes stamped with the imperial mark.',
  },
  {
    page: 2,
    date: 'c.1100–1350',
    title: 'Monastic Waterworks vs Medieval Town Squalor',
    lesson: 'Lesson 2',
    summary:
      'While medieval towns choke on overflowing cesspits and hire night-time gong farmers, wealthy monasteries build clean water networks. Canterbury monks filter fresh spring water through five settling tanks into washing fountains and flush their infirmary latrines into the river.',
    sketchPrompt:
      'Sketch your visual symbol: Monastic settling tanks or a gong farmer carrying barrels of waste at night.',
  },
  {
    page: 2,
    date: '1596–1665',
    title: 'Tudor Flush Toilets & The 1665 Great Plague',
    lesson: 'Lesson 3',
    summary:
      'Sir John Harington invents the flushing water closet in 1596, but without piped water it fails to catch on. When the Great Plague strikes in 1665, authorities lock families behind red crosses and plague doctors wear herb-filled beaks to ward off deadly miasma.',
    sketchPrompt:
      'Sketch your visual symbol: The plague doctor’s long-beaked mask or the red cross with ‘Lord Have Mercy Upon Us’.',
  },

  // Page 3 Milestones (Lessons 4–6)
  {
    page: 3,
    date: '1842–1848',
    title: 'Chadwick’s Sanitary Report & The 1848 Health Act',
    lesson: 'Lesson 4',
    summary:
      'Industrial cities grow into death traps of back-to-back terraces and cellar dwellings. Edwin Chadwick’s 1842 Report uses mortality statistics to prove filth causes early death, but the 1848 Public Health Act fails because it is voluntary and ratepayers resist taxes.',
    sketchPrompt:
      'Sketch your visual symbol: Chadwick’s mortality scales (Rutland 38 vs Manchester 17) or slum houses.',
  },
  {
    page: 3,
    date: '1854',
    title: 'Dr John Snow & The Broad Street Water Pump',
    lesson: 'Lesson 5',
    summary:
      'Dr John Snow investigates a sudden cholera outbreak in Soho. By plotting deaths on a street map and discovering that brewery workers were spared, he proves cholera is water-borne and persuades parish officials to remove the Broad Street pump handle.',
    sketchPrompt:
      'Sketch your visual symbol: The iron Broad Street pump with its handle removed, or the Soho spot map.',
  },
  {
    page: 3,
    date: '1858–1875',
    title: 'The Great Stink & Bazalgette’s Underground Sewers',
    lesson: 'Lesson 6',
    summary:
      'The blazing heat of June 1858 turns the Thames into a toxic sewer, forcing MPs to act. Joseph Bazalgette builds 82 miles of underground brick sewers. In 1875, the Public Health Act finally makes clean water and sanitation compulsory by law.',
    sketchPrompt:
      'Sketch your visual symbol: Bazalgette’s egg-shaped brick sewer or the 1875 Public Health Act scroll.',
  },
];

/**
 * Builds the complete Master HTML for Water & Sanitation V2 Pupil Workbook
 */
function buildWaterAndSanitationTwoPageWorkbookHtml() {
  const coverImg = getBase64Image('/images/john_snow_cholera_map.jpg');

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Water &amp; Sanitation Through Time (c.43 AD–Present) — Pupil Workbook</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&display=swap" rel="stylesheet">
  <style>
    *, *:before, *:after { box-sizing: border-box; }
    @page {
      size: A4 portrait;
      margin: 10mm 10mm 10mm 10mm;
    }
    body {
      font-family: 'Georgia', 'Garamond', serif;
      font-size: 8.8pt;
      line-height: 1.3;
      color: #000000;
      margin: 0;
      padding: 0;
      background: #ffffff;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    h1, h2, h3, h4, h5, h6, strong, th, .sans {
      font-family: 'Inter', -apple-system, sans-serif;
    }
    .page-container {
      width: 100%;
      height: 272mm;
      max-height: 272mm;
      position: relative;
      page-break-after: always;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: #ffffff;
      box-sizing: border-box;
      padding: 4mm 6mm;
    }
    .page-body-full {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      overflow: hidden;
    }
    .task-section {
      margin-bottom: 3px;
    }
    .task-line {
      border-bottom: 1.4px solid #000000;
      height: 7.0mm;
      margin: 0;
      box-sizing: border-box;
    }
    .task-line-dotted {
      border-bottom: 1.2px dotted #000000;
      height: 5.4mm;
      margin: 0;
      box-sizing: border-box;
    }
    .page-footer-strip {
      border-top: 1.2px solid #000000;
      padding-top: 2px;
      margin-top: 2px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: 'Inter', sans-serif;
      font-size: 7.2pt;
      color: #000000;
    }
    .footer-page-num {
      font-weight: 800;
    }
    .footer-quip {
      font-style: italic;
      color: #222222;
      font-weight: 500;
    }
    .badge {
      display: inline-block;
      font-family: 'Inter', sans-serif;
      font-size: 7.2pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border: 1px solid #000000;
      padding: 1px 6px;
      border-radius: 2px;
      background: #f8fafc;
    }
    /* Commercial School Brand Customizer */
    [data-department-name]:not([data-department-name=""]):not([data-department-name="The History Department"]):not([data-department-name="History Department"]) .school-brand-target {
      display: inline-block;
      font-size: 0 !important;
    }
    [data-department-name]:not([data-department-name=""]):not([data-department-name="The History Department"]):not([data-department-name="History Department"]) .school-brand-target::after {
      content: attr(data-department-name);
      font-size: 11pt !important;
      letter-spacing: 2px;
    }
  </style>
</head>
<body>
`;

  // ====================================================================
  // PAGE 1: OUTSIDE FRONT COVER
  // ====================================================================
  html += `
  <div class="page page-container" id="page-1">
    <div class="page-body-full" style="justify-content: space-between;">
      
      <!-- Top Branding -->
      <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 3px;" data-department-name="The History Department">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <span class="school-brand-target" style="font-family: 'Inter', sans-serif; font-size: 11pt; font-weight: 900; letter-spacing: 2px; text-transform: uppercase;">The History Department</span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; letter-spacing: 1px; text-transform: uppercase;">Key Stage 3 History • Year 7 Workbook</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-top: 1px; border-top: 1px solid #000; padding-top: 2px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase; color: #222;">UNIT: WATER &amp; SANITATION THROUGH TIME (c.43 AD–PRESENT)</span>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800;">STAGED V2 EDITION</span>
        </div>
      </div>

      <!-- Title Banner -->
      <div style="border: 1.8px solid #000; border-radius: 4px; padding: 4px 8px; background: #fff; margin-bottom: 3px;">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 1px;">
          <span style="background: #000; color: #fff; font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; padding: 1.5px 6px; border-radius: 2px; text-transform: uppercase; letter-spacing: 0.8px;">
            Year 7 Enquiry
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: #222;">
            Public Health, Engineering &amp; Disease • c.43 AD–Present
          </span>
        </div>
        <h1 style="font-family: 'Playfair Display', serif; font-size: 14pt; margin: 1px 0; font-weight: 900; line-height: 1.15; color: #000;">
          WATER &amp; SANITATION THROUGH TIME
        </h1>
        <div style="font-family: 'Georgia', serif; font-size: 8.2pt; color: #222; font-style: italic; line-height: 1.2;">
          Overarching Enquiry: "How did Britain conquer water-borne disease: engineering, science, or government power?"
        </div>
      </div>

      <!-- Hero Photo Plate -->
      <div style="border: 1.8px solid #000; border-radius: 4px; overflow: hidden; background: #fff; margin-bottom: 3px; display: flex; flex-direction: column;">
        <div style="height: 118mm; background: #fff; display: flex; justify-content: center; align-items: center; overflow: hidden;">
          <img src="${coverImg}" alt="John Snow Cholera Spot Map" style="width: 100%; height: 100%; object-fit: contain; object-position: center; display: block;">
        </div>
        <div style="border-top: 1.5px solid #000; padding: 3px 8px; background: #fff;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 900; text-transform: uppercase;">
              Primary Cartography Plate • Soho, London (1854)
            </span>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 900; background: #000; color: #fff; padding: 1px 5px; border-radius: 2px;">
              WELLCOME HISTORICAL MEDICAL COLLECTION
            </span>
          </div>
          <div style="font-family: 'Playfair Display', serif; font-size: 9.2pt; font-weight: 800; line-height: 1.15; margin: 1px 0;">
            Dr John Snow’s Broad Street Cholera Spot Map
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 7.0pt; color: #222; line-height: 1.2;">
            Dr John Snow’s famous 1854 spot map of Soho, marking cholera deaths with black bars clustered around the contaminated Broad Street water pump.
          </div>
        </div>
      </div>

      <!-- Pupil Information Card -->
      <div style="border: 1.5px solid #000; border-radius: 4px; padding: 5px 12px; background: #fff; margin-bottom: 3px;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000; padding-bottom: 2px; margin-bottom: 4px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; text-transform: uppercase; letter-spacing: 0.8px;">
            Pupil Workbook &amp; Academic Record
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 800; text-transform: uppercase; color: #333;">
            Year 7 History • Unit 1
          </span>
        </div>
        <div style="display: grid; grid-template-columns: 2fr 1fr 1.2fr; gap: 14px; font-family: 'Inter', sans-serif; font-size: 7.5pt;">
          <div style="display: flex; align-items: baseline;">
            <strong style="text-transform: uppercase; width: 48px; font-size: 7pt;">Name:</strong>
            <div style="flex: 1; border-bottom: 1.2px solid #000; height: 14px;"></div>
          </div>
          <div style="display: flex; align-items: baseline;">
            <strong style="text-transform: uppercase; width: 44px; font-size: 7pt;">Class:</strong>
            <div style="flex: 1; border-bottom: 1.2px solid #000; height: 14px;"></div>
          </div>
          <div style="display: flex; align-items: baseline;">
            <strong style="text-transform: uppercase; width: 56px; font-size: 7pt;">Teacher:</strong>
            <div style="flex: 1; border-bottom: 1.2px solid #000; height: 14px;"></div>
          </div>
        </div>
      </div>

      <!-- Syllabus Enquiry Overview (Spanning Across the Page, 0 dead void) -->
      <div style="border: 1.5px solid #000; border-radius: 4px; overflow: hidden; background: #fff; flex: 1; display: flex; flex-direction: column; margin-bottom: 2px;">
        <div style="background: #000; color: #fff; padding: 3px 10px; font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.8px; display: flex; justify-content: space-between; align-items: center;">
          <span>The 6 Historical Enquiries Across This Unit</span>
          <span style="font-size: 6.8pt; letter-spacing: 0.5px;">Curriculum Progression</span>
        </div>
        <div style="padding: 6px 10px; display: grid; grid-template-columns: 1fr 1fr; gap: 4px 14px; font-family: 'Inter', sans-serif; font-size: 7.5pt; line-height: 1.25; color: #111; flex: 1; align-content: space-around;">
          <div><strong>L1: Roman Britain &amp; Fishbourne Palace:</strong> Aqueducts, public thermae, and lead pipes.</div>
          <div><strong>L4: Industrial Towns &amp; Chadwick (1842):</strong> Slum cellars, sanitary statistics, and laissez-faire.</div>
          <div><strong>L2: Medieval Towns &amp; Monasteries:</strong> Monastic settling tanks vs town cesspits and gong farmers.</div>
          <div><strong>L5: John Snow &amp; The Broad Street Pump:</strong> Asiatic cholera, detective spot mapping, and brewery clues.</div>
          <div><strong>L3: Early Modern Filth &amp; 1665 Plague:</strong> Fleet Ditch, Harington’s toilet, and plague doctors.</div>
          <div><strong>L6: The Great Stink &amp; Bazalgette’s Sewers:</strong> Boiling Thames, 82 miles of sewers, and the 1875 Act.</div>
        </div>
      </div>

      ${renderFooterStrip(1, revisionQuips[0], 16)}
    </div>
  </div>
`;

  // ====================================================================
  // PAGES 2 & 3: LIVING UNIT TIMELINE (Panoramic Dual-Coding Spread, 6 Milestones)
  // Full-width cards with 44mm open sketchpads (matching CME & Great War gold standard)
  // ====================================================================
  html += `
  <!-- PAGE 2: LIVING TIMELINE PART 1 (MILESTONES 1–3) -->
  <div class="page page-container" id="page-2">
    <div class="page-body-full" style="justify-content: space-between;">
      <div>
        <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 4px; display: flex; justify-content: space-between; align-items: baseline;">
          <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 11pt; color: #000000; text-transform: uppercase; font-weight: 900;">
            Living Unit Timeline • Part 1: Romans to Stuarts (c.43 AD–1665)
          </h2>
          <span class="badge">Pages 2–3 Facing Spread</span>
        </div>
        <div style="border-bottom: 1px solid #000; padding-bottom: 2px; margin-bottom: 5px; font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #333; display: flex; justify-content: space-between;">
          <span><strong>How to use this timeline:</strong> As you study each lesson, illustrate the milestone sketchpad with your visual symbol and key notes.</span>
          <span style="font-weight: 700; color: #1e3a8a;">Spine • Facing Left</span>
        </div>
      </div>

      <!-- 3 Full-Width Milestone Cards Filling Height -->
      <div style="display: flex; flex-direction: column; gap: 6px; flex: 1; justify-content: space-between;">
  `;

  timelineMilestones
    .filter((m) => m.page === 2)
    .forEach((m) => {
      html += `
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 5px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between; background: #ffffff;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 9.4pt; color: #000000;">
                ${m.date} &bull; ${m.title}
              </strong>
              <span class="badge" style="font-size: 7pt; padding: 0.5px 5px;">${m.lesson}</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8.4pt; color: #222222; margin: 0 0 2px 0; line-height: 1.25;">
              ${m.summary}
            </p>
          </div>
          <!-- Full-Width Open Sketchpad Canvas -->
          <div style="border-top: 1.2px dashed #000000; min-height: 44mm; flex: 1; background: #fafafa; border-radius: 2px; margin-top: 3px; padding: 4px; display: flex; flex-direction: column; justify-content: flex-end;">
            <span style="font-family: 'Georgia', serif; font-size: 7pt; color: #777; font-style: italic; text-align: right;">${m.sketchPrompt}</span>
          </div>
        </div>
    `;
    });

  html += `
      </div>

      <!-- Compact 1-Line Synthesis Check at Bottom -->
      <div style="border: 1px solid #000; background: #fdfbf7; border-radius: 3px; padding: 2px 8px; margin-top: 3px; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #222; display: flex; justify-content: space-between; align-items: center;">
        <span><strong>Timeline Check:</strong> Why did clean water systems collapse when the Romans left Britain, and why were monasteries able to stay so much cleaner than medieval towns?</span>
        <span style="font-weight: 700; color: #1e3a8a;">Turn overleaf for Lesson 1 &rarr;</span>
      </div>

      ${renderFooterStrip(2, revisionQuips[1], 16)}
    </div>
  </div>

  <!-- PAGE 3: LIVING TIMELINE PART 2 (MILESTONES 4–6) -->
  <div class="page page-container" id="page-3">
    <div class="page-body-full" style="justify-content: space-between;">
      <div>
        <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 4px; display: flex; justify-content: space-between; align-items: baseline;">
          <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 11pt; color: #000000; text-transform: uppercase; font-weight: 900;">
            Living Unit Timeline • Part 2: Industrial Revolution &amp; Modern Health (1842–1875)
          </h2>
          <span class="badge">Pages 2–3 Facing Spread</span>
        </div>
        <div style="border-bottom: 1px solid #000; padding-bottom: 2px; margin-bottom: 5px; font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #333; display: flex; justify-content: space-between;">
          <span><strong>How to use this timeline:</strong> As you study each lesson, illustrate the milestone sketchpad with your visual symbol and key notes.</span>
          <span style="font-weight: 700; color: #1e3a8a;">Spine • Facing Right</span>
        </div>
      </div>

      <!-- 3 Full-Width Milestone Cards Filling Height -->
      <div style="display: flex; flex-direction: column; gap: 6px; flex: 1; justify-content: space-between;">
  `;

  timelineMilestones
    .filter((m) => m.page === 3)
    .forEach((m) => {
      html += `
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 5px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between; background: #ffffff;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 9.4pt; color: #000000;">
                ${m.date} &bull; ${m.title}
              </strong>
              <span class="badge" style="font-size: 7pt; padding: 0.5px 5px;">${m.lesson}</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8.4pt; color: #222222; margin: 0 0 2px 0; line-height: 1.25;">
              ${m.summary}
            </p>
          </div>
          <!-- Full-Width Open Sketchpad Canvas -->
          <div style="border-top: 1.2px dashed #000000; min-height: 44mm; flex: 1; background: #fafafa; border-radius: 2px; margin-top: 3px; padding: 4px; display: flex; flex-direction: column; justify-content: flex-end;">
            <span style="font-family: 'Georgia', serif; font-size: 7pt; color: #777; font-style: italic; text-align: right;">${m.sketchPrompt}</span>
          </div>
        </div>
    `;
    });

  html += `
      </div>

      <!-- Compact 1-Line Synthesis Check at Bottom -->
      <div style="border: 1px solid #000; background: #fdfbf7; border-radius: 3px; padding: 2px 8px; margin-top: 3px; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #222; display: flex; justify-content: space-between; align-items: center;">
        <span><strong>Timeline Check:</strong> Which was the bigger breakthrough in conquering water-borne disease: Dr John Snow proving the cause in 1854, or Bazalgette building the sewers in 1858?</span>
        <span style="font-weight: 700; color: #1e3a8a;">Use for revision &rarr;</span>
      </div>

      ${renderFooterStrip(3, revisionQuips[2], 16)}
    </div>
  </div>
`;

  // ====================================================================
  // PAGES 4–15: 6 BESPOKE DOUBLE-PAGE ENQUIRY SPREADS
  // ====================================================================
  lessonConfigs.forEach((cfg, idx) => {
    const leftPageNum = idx * 2 + 4;
    const rightPageNum = idx * 2 + 5;

    // ------------------------------------------------------------------
    // LEFT PAGE (VERSO): Evidence & Skills Launch (0 dead space)
    // ------------------------------------------------------------------
    html += `
    <div class="page page-container" id="page-${leftPageNum}">
      <div class="page-body-full" style="justify-content: space-between;">
        <div>
          <!-- Lesson Header -->
          <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 4px; display: flex; justify-content: space-between; align-items: baseline;">
            <div>
              <div style="font-family: 'Inter', sans-serif; font-size: 7.4pt; text-transform: uppercase; letter-spacing: 0.8px; color: #444; font-weight: 800;">
                Water &amp; Sanitation Through Time &bull; Lesson ${cfg.lessonNum}
              </div>
              <h2 style="font-family: 'Playfair Display', serif; font-size: 12pt; color: #000000; margin: 1px 0 0 0; font-weight: 900; line-height: 1.15;">
                L${cfg.lessonNum}: ${cfg.title}
              </h2>
            </div>
            <span class="badge">Evidence &amp; Source Skills</span>
          </div>

          <!-- Learning Objectives -->
          <div style="background: #f8fafc; border: 1px solid #000000; border-left: 3.5px solid #000000; border-radius: 3px; padding: 3px 8px; margin-bottom: 4px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase; color: #000; display: block; margin-bottom: 1px;">
              What We Are Learning Today:
            </strong>
            <ul style="margin: 0; padding-left: 14px; font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #222; line-height: 1.25;">
              ${cfg.objectives.map((o) => `<li>${o}</li>`).join('')}
            </ul>
          </div>

          <!-- Do Now: Retrieval Practice (5 Questions, Score / 5) -->
          <div class="task-section">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.2px solid #000; padding-bottom: 1px; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 7.6pt; text-transform: uppercase; letter-spacing: 0.5px;">
                &bull; 'Do Now' Retrieval Practice (5 Prior Recall Questions)
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 800; border: 1px solid #000; padding: 0 5px; border-radius: 2px;">
                Score: [ &nbsp;&nbsp;&nbsp;&nbsp; / 5 ]
              </span>
            </div>
            <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 4px;">
              ${cfg.doNow
                .map(
                  (item, qIdx) => `
                <div style="background: #ffffff; border: 1px solid #000; border-radius: 2px; padding: 3px; display: flex; flex-direction: column; justify-content: space-between;">
                  <div style="font-family: 'Inter', sans-serif; font-size: 6.6pt; line-height: 1.18; color: #000; font-weight: 600; margin-bottom: 1px;">
                    <strong>Q${qIdx + 1}:</strong> ${item.q}
                  </div>
                  <div>
                    <div class="task-line-dotted"></div>
                    <div class="task-line-dotted"></div>
                  </div>
                </div>
              `,
                )
                .join('')}
            </div>
          </div>

          <!-- Key Vocabulary -->
          <div class="task-section" style="margin-top: 3px;">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.2px solid #000; padding-bottom: 1px; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 7.6pt; text-transform: uppercase; letter-spacing: 0.5px;">
                &bull; Key Vocabulary
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; border: 1px solid #000; padding: 0 4px; border-radius: 2px;">HISTORICAL WORDS</span>
            </div>
            <div style="font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #111; margin-bottom: 2px; line-height: 1.22;">
              ${cfg.vocabPrompt}
            </div>
            <div class="task-line"></div>
            <div class="task-line"></div>
          </div>
        </div>

        <!-- Task 4: Source Investigation (Expanded to Fill Page Down to Footer) -->
        <div style="border: 1.4px solid #000000; border-radius: 4px; padding: 5px 8px; background: #ffffff; flex: 1; display: flex; flex-direction: column; justify-content: space-between; margin-top: 2px;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.2px solid #000; padding-bottom: 2px; margin-bottom: 3px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; color: #000; text-transform: uppercase;">
                ${cfg.bridgeTask.title}
              </strong>
              <span class="badge" style="font-size: 6.5pt; padding: 0 4px;">Primary Evidence</span>
            </div>
    `;

    // Render bespoke Task 4 content based on lesson
    if (cfg.bridgeTask.type === 'visual_archaeology') {
      const b64 = getBase64Image(cfg.bridgeTask.imgSrc);
      html += `
            <div style="display: grid; grid-template-columns: 140px 1fr; gap: 8px; border: 1.2px solid #000; border-radius: 3px; padding: 4px; background: #fdfbf7; margin-bottom: 3px;">
              <div style="height: 95px; border: 1px solid #000; overflow: hidden; background: #000;">
                <img src="${b64}" style="width: 100%; height: 100%; object-fit: cover;" alt="Fishbourne Lead Pipes">
              </div>
              <div style="display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <strong style="font-family: 'Inter', sans-serif; font-size: 7.5pt; text-transform: uppercase;">${cfg.bridgeTask.imgCaption}</strong>
                  <p style="font-family: 'Georgia', serif; font-size: 7.8pt; font-style: italic; color: #111; margin: 2px 0; line-height: 1.25;">
                    ${cfg.bridgeTask.sourceText}
                  </p>
                </div>
                <div style="font-family: 'Inter', sans-serif; font-size: 6.6pt; color: #444; border-top: 1px dotted #999; padding-top: 1px;">
                  <strong>Record:</strong> ${cfg.bridgeTask.shelfmark}
                </div>
              </div>
            </div>

            <div style="background: #f0f9ff; border: 1px solid #000; border-radius: 3px; padding: 2px 6px; margin-bottom: 3px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 7.0pt; text-transform: uppercase; color: #000; display: block; margin-bottom: 1px;">Reading Clues:</strong>
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 4px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #111; line-height: 1.2;">
                <div>${cfg.bridgeTask.annotations[0]}</div>
                <div>${cfg.bridgeTask.annotations[1]}</div>
                <div>${cfg.bridgeTask.annotations[2]}</div>
              </div>
            </div>
      `;
    } else if (cfg.bridgeTask.type === 'dual_source_interrogation') {
      html += `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 3px;">
              <div style="border: 1.2px solid #000; border-left: 3.5px solid #000; background: #f8fafc; padding: 3px 6px; border-radius: 3px;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase;">${cfg.bridgeTask.sourceATitle}</strong>
                <p style="font-family: 'Georgia', serif; font-size: 7.6pt; font-style: italic; color: #111; margin: 1px 0; line-height: 1.22;">${cfg.bridgeTask.sourceAText}</p>
                <div style="font-family: 'Inter', sans-serif; font-size: 6.4pt; color: #444;">${cfg.bridgeTask.sourceAShelfmark}</div>
              </div>
              <div style="border: 1.2px solid #000; border-left: 3.5px solid #000; background: #fffaf0; padding: 3px 6px; border-radius: 3px;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase;">${cfg.bridgeTask.sourceBTitle}</strong>
                <p style="font-family: 'Georgia', serif; font-size: 7.6pt; font-style: italic; color: #111; margin: 1px 0; line-height: 1.22;">${cfg.bridgeTask.sourceBText}</p>
                <div style="font-family: 'Inter', sans-serif; font-size: 6.4pt; color: #444;">${cfg.bridgeTask.sourceBShelfmark}</div>
              </div>
            </div>

            <div style="background: #f0f9ff; border: 1px solid #000; border-radius: 3px; padding: 2px 6px; margin-bottom: 3px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 7.0pt; text-transform: uppercase; color: #000; display: block; margin-bottom: 1px;">Reading Clues:</strong>
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 4px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #111; line-height: 1.2;">
                <div>${cfg.bridgeTask.annotations[0]}</div>
                <div>${cfg.bridgeTask.annotations[1]}</div>
                <div>${cfg.bridgeTask.annotations[2]}</div>
              </div>
            </div>
      `;
    } else if (cfg.bridgeTask.type === 'visual_plague') {
      const b64 = getBase64Image(cfg.bridgeTask.imgSrc);
      html += `
            <div style="display: grid; grid-template-columns: 140px 1fr; gap: 8px; border: 1.2px solid #000; border-radius: 3px; padding: 4px; background: #fdfbf7; margin-bottom: 3px;">
              <div style="height: 95px; border: 1px solid #000; overflow: hidden; background: #fff;">
                <img src="${b64}" style="width: 100%; height: 100%; object-fit: contain;" alt="Plague Doctor">
              </div>
              <div style="display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <strong style="font-family: 'Inter', sans-serif; font-size: 7.5pt; text-transform: uppercase;">${cfg.bridgeTask.imgCaption}</strong>
                  <p style="font-family: 'Georgia', serif; font-size: 7.8pt; font-style: italic; color: #111; margin: 2px 0; line-height: 1.25;">
                    ${cfg.bridgeTask.sourceText}
                  </p>
                </div>
                <div style="font-family: 'Inter', sans-serif; font-size: 6.6pt; color: #444; border-top: 1px dotted #999; padding-top: 1px;">
                  <strong>Record:</strong> ${cfg.bridgeTask.shelfmark}
                </div>
              </div>
            </div>

            <div style="background: #f0f9ff; border: 1px solid #000; border-radius: 3px; padding: 2px 6px; margin-bottom: 3px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 7.0pt; text-transform: uppercase; color: #000; display: block; margin-bottom: 1px;">Reading Clues:</strong>
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 4px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #111; line-height: 1.2;">
                <div>${cfg.bridgeTask.annotations[0]}</div>
                <div>${cfg.bridgeTask.annotations[1]}</div>
                <div>${cfg.bridgeTask.annotations[2]}</div>
              </div>
            </div>
      `;
    } else if (cfg.bridgeTask.type === 'sanitary_table') {
      html += `
            <div style="border: 1.2px solid #000; border-left: 3.5px solid #000; background: #fdfbf7; padding: 3px 6px; border-radius: 3px; margin-bottom: 2px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 7.4pt; text-transform: uppercase;">${cfg.bridgeTask.sourceTitle}</strong>
                <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 700; border: 1px solid #000; padding: 0 4px;">${cfg.bridgeTask.shelfmark}</span>
              </div>
              <div style="font-family: 'Georgia', serif; font-size: 7.8pt; font-style: italic; color: #111; line-height: 1.25; margin: 1px 0;">
                ${cfg.bridgeTask.sourceText}
              </div>
            </div>

            <!-- Comparison Table -->
            <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif; font-size: 7pt; margin-bottom: 3px; border: 1.2px solid #000;">
              <thead>
                <tr style="background: #f1f5f9; color: #000;">
                  ${cfg.bridgeTask.tableHeaders.map((h, hi) => `<th style="padding: 2.5px 5px; text-align: left; border: 1px solid #000; font-size: 7.2pt; width: ${hi === 0 ? '34%' : '22%'};">${h}</th>`).join('')}
                </tr>
              </thead>
              <tbody>
                ${cfg.bridgeTask.tableRows
                  .map(
                    (r) => `
                  <tr>
                    <td style="padding: 2px 5px; font-weight: 700; border: 1px solid #000; background: #fafafa;">${r[0]}</td>
                    <td style="padding: 2px 5px; border: 1px solid #000;">${r[1]}</td>
                    <td style="padding: 2px 5px; border: 1px solid #000;">${r[2]}</td>
                    <td style="padding: 2px 5px; border: 1px solid #000; background: #fef2f2; color: #991b1b; font-weight: 700;">${r[3]}</td>
                  </tr>
                `,
                  )
                  .join('')}
              </tbody>
            </table>

            <div style="background: #f0f9ff; border: 1px solid #000; border-radius: 3px; padding: 2px 6px; margin-bottom: 3px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 7.0pt; text-transform: uppercase; color: #000; display: block; margin-bottom: 1px;">Reading Clues:</strong>
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 4px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #111; line-height: 1.2;">
                <div>${cfg.bridgeTask.annotations[0]}</div>
                <div>${cfg.bridgeTask.annotations[1]}</div>
                <div>${cfg.bridgeTask.annotations[2]}</div>
              </div>
            </div>
      `;
    } else if (cfg.bridgeTask.type === 'visual_cholera_map') {
      const b64 = getBase64Image(cfg.bridgeTask.imgSrc);
      html += `
            <div style="display: grid; grid-template-columns: 140px 1fr; gap: 8px; border: 1.2px solid #000; border-radius: 3px; padding: 4px; background: #fdfbf7; margin-bottom: 3px;">
              <div style="height: 95px; border: 1px solid #000; overflow: hidden; background: #fff;">
                <img src="${b64}" style="width: 100%; height: 100%; object-fit: contain;" alt="John Snow Cholera Spot Map">
              </div>
              <div style="display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <strong style="font-family: 'Inter', sans-serif; font-size: 7.5pt; text-transform: uppercase;">${cfg.bridgeTask.imgCaption}</strong>
                  <p style="font-family: 'Georgia', serif; font-size: 7.8pt; font-style: italic; color: #111; margin: 2px 0; line-height: 1.25;">
                    ${cfg.bridgeTask.sourceText}
                  </p>
                </div>
                <div style="font-family: 'Inter', sans-serif; font-size: 6.6pt; color: #444; border-top: 1px dotted #999; padding-top: 1px;">
                  <strong>Record:</strong> ${cfg.bridgeTask.shelfmark}
                </div>
              </div>
            </div>

            <div style="background: #f0f9ff; border: 1px solid #000; border-radius: 3px; padding: 2px 6px; margin-bottom: 3px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 7.0pt; text-transform: uppercase; color: #000; display: block; margin-bottom: 1px;">Reading Clues:</strong>
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 4px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #111; line-height: 1.2;">
                <div>${cfg.bridgeTask.annotations[0]}</div>
                <div>${cfg.bridgeTask.annotations[1]}</div>
                <div>${cfg.bridgeTask.annotations[2]}</div>
              </div>
            </div>
      `;
    } else if (cfg.bridgeTask.type === 'visual_bazalgette') {
      const b64 = getBase64Image(cfg.bridgeTask.imgSrc);
      html += `
            <div style="display: grid; grid-template-columns: 140px 1fr; gap: 8px; border: 1.2px solid #000; border-radius: 3px; padding: 4px; background: #fdfbf7; margin-bottom: 3px;">
              <div style="height: 95px; border: 1px solid #000; overflow: hidden; background: #000;">
                <img src="${b64}" style="width: 100%; height: 100%; object-fit: cover;" alt="Bazalgette Sewers">
              </div>
              <div style="display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <strong style="font-family: 'Inter', sans-serif; font-size: 7.5pt; text-transform: uppercase;">${cfg.bridgeTask.imgCaption}</strong>
                  <p style="font-family: 'Georgia', serif; font-size: 7.8pt; font-style: italic; color: #111; margin: 2px 0; line-height: 1.25;">
                    ${cfg.bridgeTask.sourceText}
                  </p>
                </div>
                <div style="font-family: 'Inter', sans-serif; font-size: 6.6pt; color: #444; border-top: 1px dotted #999; padding-top: 1px;">
                  <strong>Record:</strong> ${cfg.bridgeTask.shelfmark}
                </div>
              </div>
            </div>

            <div style="background: #f0f9ff; border: 1px solid #000; border-radius: 3px; padding: 2px 6px; margin-bottom: 3px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 7.0pt; text-transform: uppercase; color: #000; display: block; margin-bottom: 1px;">Reading Clues:</strong>
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 4px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #111; line-height: 1.2;">
                <div>${cfg.bridgeTask.annotations[0]}</div>
                <div>${cfg.bridgeTask.annotations[1]}</div>
                <div>${cfg.bridgeTask.annotations[2]}</div>
              </div>
            </div>
      `;
    }

    // 2 Substantial Questions with 3 Ruled Lines each
    html += `
            <div style="margin-top: 2px;">
              <div style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 700; color: #000; margin-bottom: 1px;">
                <strong>Question 1:</strong> ${cfg.bridgeTask.questionA}
              </div>
              <div class="task-line"></div>
              <div class="task-line"></div>
              <div class="task-line"></div>
            </div>

            <div style="margin-top: 2px;">
              <div style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 700; color: #000; margin-bottom: 1px;">
                <strong>Question 2:</strong> ${cfg.bridgeTask.questionB}
              </div>
              <div class="task-line"></div>
              <div class="task-line"></div>
              <div class="task-line"></div>
            </div>
          </div>

          <!-- Helpful Clue & Challenge Question -->
          <div style="border-top: 1px dotted #000; padding-top: 2px; margin-top: 2px; display: flex; justify-content: space-between; font-family: 'Georgia', serif; font-size: 7.2pt;">
            <span style="color: #444; font-style: italic;">${cfg.bridgeTask.clue}</span>
            <span style="color: #000; font-weight: bold;">${cfg.bridgeTask.scholarsEdge}</span>
          </div>
        </div>

        ${renderFooterStrip(leftPageNum, revisionQuips[leftPageNum - 1], 16)}
      </div>
    </div>

    <!-- ------------------------------------------------------------------ -->
    <!-- RIGHT PAGE (RECTO): Extended Enquiry Writing (21 Ruled Lines)      -->
    <!-- Zero DIRT box • Timeline Mission Box at foot                       -->
    <!-- ------------------------------------------------------------------ -->
    <div class="page page-container" id="page-${rightPageNum}">
      <div class="page-body-full" style="justify-content: space-between;">
        <div>
          <!-- Enquiry Header -->
          <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 4px; display: flex; justify-content: space-between; align-items: baseline;">
            <div>
              <div style="font-family: 'Inter', sans-serif; font-size: 7.4pt; text-transform: uppercase; letter-spacing: 0.8px; color: #444; font-weight: 800;">
                Historical Focus: ${cfg.skill}
              </div>
              <h3 style="font-family: 'Playfair Display', serif; font-size: 11.5pt; color: #000000; margin: 1px 0 0 0; font-weight: 900; line-height: 1.15;">
                Enquiry: ${cfg.inquiryQuestion}
              </h3>
            </div>
            <span class="badge">Extended Writing</span>
          </div>

          <!-- 3-Column Planning Matrix with Dotted Planning Lines -->
          <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 6px; background: #fdfbf7; margin-bottom: 3px;">
            <div style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; text-transform: uppercase; color: #000; margin-bottom: 2px; display: flex; justify-content: space-between;">
              <span>Planning Your Answer: 3 Key Arguments</span>
              <span style="color: #555; font-weight: 600;">Draft quick bullet points below &darr;</span>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 4px;">
              ${cfg.structureStrip
                .map(
                  (col) => `
                <div style="border: 1px solid #000; border-radius: 2px; padding: 3px 4px; background: #ffffff;">
                  <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #000; display: block; border-bottom: 1px solid #ddd; padding-bottom: 1px; margin-bottom: 1px;">${col.col}</strong>
                  <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #333; line-height: 1.18; display: block; margin-bottom: 1px;">${col.prompt}</span>
                  <div class="task-line-dotted"></div>
                  <div class="task-line-dotted"></div>
                </div>
              `,
                )
                .join('')}
            </div>
          </div>

          <!-- Key Words & Connectives Strip -->
          <div style="border: 1px solid #000; background: #ffffff; border-radius: 3px; padding: 2px 6px; margin-bottom: 3px; font-family: 'Inter', sans-serif; font-size: 6.8pt; line-height: 1.25;">
            <div><strong>Key Words:</strong> ${cfg.wordBank}</div>
            <div style="border-top: 1px dashed #ccc; padding-top: 1px; margin-top: 1px; color: #444; font-style: italic;">
              <strong>Sentence Starters:</strong> ${cfg.connectives}
            </div>
          </div>

          <!-- Writing Guide (PEEL) -->
          <div style="background: #f8fafc; border: 1px solid #000; border-radius: 2px; padding: 1.5px 6px; margin-bottom: 3px; display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 7.0pt; color: #000;">
            <span><strong>[P] Point:</strong> Clear sentence answering the question.</span>
            <span><strong>[E] Evidence:</strong> Names, dates, places, and statistics.</span>
            <span><strong>[E] Explain:</strong> How and why this affected public health.</span>
            <span><strong>[L] Link:</strong> Direct conclusion answering enquiry.</span>
          </div>

          <!-- Ruled Writing Lines (21 Full Lines at 7.0mm) -->
          <div style="margin-bottom: 2px;">
            ${Array(21).fill('<div class="task-line"></div>').join('\n            ')}
          </div>
        </div>

        <!-- Timeline Mission Box (Connecting Essay back to Pages 2–3) -->
        <div style="border: 1.2px solid #000000; border-left: 3.5px solid #000000; border-radius: 3px; padding: 3px 6px; background: #fdfbf7; margin-top: auto; margin-bottom: 2px;">
          <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-transform: uppercase; color: #000; margin-bottom: 1px;">
            Timeline Mission &bull; Pages 2–3
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 7.6pt; color: #111; line-height: 1.2;">
            ${cfg.timelineMission}
          </div>
        </div>

        ${renderFooterStrip(rightPageNum, revisionQuips[rightPageNum - 1], 16)}
      </div>
    </div>
`;
  });

  // ====================================================================
  // PAGE 16: OUTSIDE BACK COVER (Student Assessment Record & Quizzing Hub)
  // Master Assessment Tracker matching CME & Great War gold standard
  // ====================================================================
  const quizUrl = 'https://history-revision-hub.netlify.app/units/water_and_sanitation/quiz';
  const qrSvg = generateQrSvg(quizUrl);

  html += `
  <div class="page page-container" id="page-16">
    <div class="page-body-full" style="justify-content: space-between;">
      
      <!-- Top Branding -->
      <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 3px;" data-department-name="The History Department">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <span class="school-brand-target" style="font-family: 'Inter', sans-serif; font-size: 11pt; font-weight: 900; letter-spacing: 2px; text-transform: uppercase;">The History Department</span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; letter-spacing: 1px; text-transform: uppercase;">Pupil Assessment Record</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-top: 1px; border-top: 1px solid #000; padding-top: 2px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase; color: #222;">KEY STAGE 3 HISTORY • UNIT: WATER &amp; SANITATION THROUGH TIME</span>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800;">OUTSIDE BACK COVER</span>
        </div>
      </div>

      <!-- Header Block -->
      <div style="text-align: center; border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 4px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 12pt; margin: 0 0 1px 0; font-weight: 900; text-transform: uppercase;">
          Student Assessment Record &amp; Revision Tracker
        </h2>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #222; font-weight: 600;">
          Water &amp; Sanitation (c.43 AD–Present) • 6-Lesson Enquiry Sequence
        </div>
      </div>

      <!-- Target Grade & Pupil Info Strip -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 4px 10px; background: #ffffff; display: grid; grid-template-columns: 2fr 1fr 1fr 1.2fr; gap: 10px; align-items: center; margin-bottom: 4px;">
        <div>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 800; text-transform: uppercase;">Pupil:</span>
          <div style="border-bottom: 1.2px solid #000000; height: 14px; margin-top: 1px;"></div>
        </div>
        <div style="text-align: center;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 800; text-transform: uppercase;">Target Grade:</span>
          <div style="border: 1.2px solid #000000; border-radius: 2px; width: 32px; height: 20px; margin: 1px auto 0 auto;"></div>
        </div>
        <div style="text-align: center;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 800; text-transform: uppercase;">Predicted:</span>
          <div style="border: 1.2px solid #000000; border-radius: 2px; width: 32px; height: 20px; margin: 1px auto 0 auto;"></div>
        </div>
        <div style="text-align: center;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 800; text-transform: uppercase;">Effort:</span>
          <div style="font-family: 'Inter', sans-serif; font-size: 8.5pt; font-weight: 800; margin-top: 2px;">
            1 &bull; 2 &bull; 3 &bull; 4
          </div>
        </div>
      </div>

      <!-- Assessment Progress Ledger Table -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; overflow: hidden; margin-bottom: 4px;">
        <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif; font-size: 7.2pt;">
          <thead>
            <tr style="border-bottom: 1.5px solid #000000; background: #f8fafc;">
              <th style="padding: 3px 4px; width: 24px; text-align: center; font-size: 8pt; font-weight: 900; border-right: 1px solid #000;">#</th>
              <th style="padding: 3px 6px; text-align: left; font-size: 7.6pt; font-weight: 900; text-transform: uppercase; border-right: 1px solid #000;">Lesson Enquiry Title</th>
              <th style="padding: 3px 4px; width: 85px; text-align: center; font-size: 7.5pt; font-weight: 900; border-right: 1px solid #000;">Do Now (/5)</th>
              <th style="padding: 3px 4px; width: 85px; text-align: center; font-size: 7.5pt; font-weight: 900; border-right: 1px solid #000;">Essay (/16)</th>
              <th style="padding: 3px 4px; width: 80px; text-align: center; font-size: 7.5pt; font-weight: 900; border-right: 1px solid #000;">Total (/21)</th>
              <th style="padding: 3px 6px; width: 110px; text-align: left; font-size: 7.5pt; font-weight: 900;">Teacher Sign</th>
            </tr>
          </thead>
          <tbody>
            ${lessonConfigs
              .map(
                (l) => `
              <tr style="border-bottom: 1px solid #000000;">
                <td style="padding: 3px 4px; border-right: 1px solid #000; text-align: center; font-weight: 800;">L${l.lessonNum}</td>
                <td style="padding: 3px 6px; border-right: 1px solid #000; font-weight: 600;">${l.title}</td>
                <td style="padding: 3px 4px; border-right: 1px solid #000; text-align: center;">[ &nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 5</strong> ]</td>
                <td style="padding: 3px 4px; border-right: 1px solid #000; text-align: center;">[ &nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 16</strong> ]</td>
                <td style="padding: 3px 4px; border-right: 1px solid #000; text-align: center; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 21</strong> ]</td>
                <td style="padding: 3px 6px; border-bottom: 1px solid #000;"></td>
              </tr>
            `,
              )
              .join('')}
            <tr style="background: #f8fafc; font-weight: 900; border-top: 1.5px solid #000000;">
              <td colspan="2" style="padding: 3px 6px; border-right: 1px solid #000; text-transform: uppercase;">Unit Cumulative Total</td>
              <td style="padding: 3px 4px; border-right: 1px solid #000; text-align: center;">[ &nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 30</strong> ]</td>
              <td style="padding: 3px 4px; border-right: 1px solid #000; text-align: center;">[ &nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 96</strong> ]</td>
              <td style="padding: 3px 4px; border-right: 1px solid #000; text-align: center; font-size: 8.5pt;">[ &nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 126</strong> ]</td>
              <td style="padding: 3px 6px;"></td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Teacher Feedback: WWW & EBI -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 4px 8px; background: #ffffff; margin-bottom: 4px;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000000; padding-bottom: 1px; margin-bottom: 2px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; text-transform: uppercase; color: #000;">
            Teacher Feedback &amp; Academic Guidance
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700;">STAGED V2 PROGRESS</span>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
          <div>
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase; color: #000; display: block; margin-bottom: 1px;">
              What Went Well (WWW):
            </strong>
            <div class="task-line" style="height: 6.0mm;"></div>
            <div class="task-line" style="height: 6.0mm;"></div>
            <div class="task-line" style="height: 6.0mm;"></div>
          </div>
          <div>
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase; color: #000; display: block; margin-bottom: 1px;">
              Even Better If (EBI):
            </strong>
            <div class="task-line" style="height: 6.0mm;"></div>
            <div class="task-line" style="height: 6.0mm;"></div>
            <div class="task-line" style="height: 6.0mm;"></div>
          </div>
        </div>
      </div>

      <!-- Revision QR Hub & Digital Quizzing -->
      <div style="border: 1.2px solid #000; border-radius: 4px; padding: 4px 8px; background: #fdfbf7; display: flex; align-items: center; justify-content: space-between;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <div style="width: 22mm; height: 22mm; background: #fff; border: 1px solid #000; padding: 1px; border-radius: 2px;">
            ${qrSvg}
          </div>
          <div>
            <div style="font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 900; text-transform: uppercase; color: #000;">
              Interactive Flashcards &amp; Digital Quiz Hub
            </div>
            <div style="font-family: 'Georgia', serif; font-size: 7.4pt; color: #222; margin: 1px 0 2px 0; line-height: 1.2;">
              Scan the QR code on your phone or tablet to revise all 6 lessons and test your recall with 100 interactive questions.
            </div>
            <div style="font-family: 'Inter', sans-serif; font-size: 7.0pt; color: #444; font-weight: 700;">
              Target Score: <strong>18 / 20</strong> on Unit Mastery Check
            </div>
          </div>
        </div>
        <div style="border: 1.2px solid #000; border-radius: 3px; padding: 4px 8px; background: #fff; text-align: center;">
          <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; text-transform: uppercase;">Best Quiz Score:</div>
          <div style="font-family: 'Inter', sans-serif; font-size: 11pt; font-weight: 900; margin-top: 1px;">[ &nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 20</strong> ]</div>
        </div>
      </div>

      ${renderFooterStrip(16, revisionQuips[15], 16)}
    </div>
  </div>
`;

  html += `
</body>
</html>
`;

  return html;
}

/**
 * Main rendering routine (HTML + Puppeteer PDF export)
 */
async function renderWaterAndSanitationTwoPageWorkbook() {
  console.log('🚀 Rendering Staged V2 Two-Page Workbook for Water & Sanitation Through Time...');
  const html = buildWaterAndSanitationTwoPageWorkbookHtml();

  const outHtmlPath = path.join(
    ROOT_DIR,
    'public',
    'units',
    'water_and_sanitation',
    'pupil_workbook_v2.html',
  );
  fs.writeFileSync(outHtmlPath, html, 'utf8');
  console.log(`✅ Staged HTML generated at: ${outHtmlPath}`);

  console.log('🖨️ Compiling PDF via Puppeteer...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });
  await page.setContent(html, { waitUntil: 'networkidle0', timeout: 60000 });

  const outPdfPath = path.join(
    ROOT_DIR,
    'public',
    'pdfs',
    'water_and_sanitation_pupil_workbook_V2.pdf',
  );
  await page.pdf({
    path: outPdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '10mm', bottom: '10mm', left: '10mm', right: '10mm' },
  });

  await browser.close();
  const pdfStats = fs.statSync(outPdfPath);
  console.log(
    `🎉 Masterpiece Staged PDF successfully compiled: ${outPdfPath} (${(pdfStats.size / 1024).toFixed(1)} KB)`,
  );
}

if (require.main === module) {
  renderWaterAndSanitationTwoPageWorkbook().catch((err) => {
    console.error('❌ Error rendering Water & Sanitation Two-Page Workbook:', err);
    process.exit(1);
  });
}

module.exports = {
  renderWaterAndSanitationTwoPageWorkbook,
  buildWaterAndSanitationTwoPageWorkbookHtml,
};
