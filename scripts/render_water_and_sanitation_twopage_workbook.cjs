/**
 * History Revision Hub — Master Two-Page Spread Pupil Workbook Engine
 *
 * Target: units/water_and_sanitation (KS3 Year 7: Water & Sanitation Through Time)
 * Output: public/units/water_and_sanitation/pupil_workbook_v2.html
 * PDF:    public/pdfs/water_and_sanitation_pupil_workbook_V2.pdf
 *
 * Architecture:
 * - 16-Page A4 Pupil Workbook Standard (Zero Disruption: Staged V2 edition)
 * - Toned for Year 7 cognitive accessibility with lively storytelling and local Hampshire archaeological links
 * - Page 1: Master Front Cover (Hero plate, Year 7 registration, 6-lesson syllabus)
 * - Pages 2–3: Living Unit Timeline (c.43 AD Roman Britain to 1875 Public Health Act Spine & Sketchpads + Causal Synthesis)
 * - Pages 4–15: 6 Bespoke Double-Page Enquiry Spreads:
 *     Left Page:  Prior-Recall Do Now (5 items), Fingertip Vocab, Forensic Bridge Task (with authentic images/diagrams)
 *     Right Page: Master Enquiry Question, 3-Column Structure Strip with Dotted Planning Lines,
 *                 Categorized Word Bank, PEEL Writing Strip, Ruled Writing Lines, Teacher Assessment DIRT
 * - Page 16: Master Back Cover (4 Eras Matrix, Three Factors of Change, DIRT Progress Ledger, Chronology Challenge, Synoptic Planning)
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

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

// Bespoke pedagogical configurations for Water & Sanitation 6 lessons
const lessonConfigs = [
  {
    // Lesson 1: Roman Britain & Fishbourne Palace
    skill: 'Change & Technological Continuity',
    enquiryQuestion:
      'Enquiry: How much progress did the Romans make in public health and clean water engineering?',
    doNow: [
      {
        q: 'What type of homes did Celtic Britons live in before the Roman invasion of AD 43?',
        a: 'Roundhouses with thatched roofs and central fire hearths.',
      },
      {
        q: 'Why did Iron Age farming communities have minimal trouble with sewage contamination?',
        a: 'Small, dispersed rural populations did not produce concentrated waste.',
      },
      {
        q: 'From what natural sources did pre-Roman Britons obtain their freshwater?',
        a: 'Nearby unpolluted rivers, streams, and natural springs.',
      },
      {
        q: 'Which discipline of historical study unearths physical artifacts and buried ruins?',
        a: 'Archaeology.',
      },
      {
        q: 'In what year did the Roman Emperor Claudius order the invasion of Britain?',
        a: 'AD 43.',
      },
    ],
    objectives: [
      'Understand how Roman engineers used gravity conduits and aqueducts to transport freshwater into towns.',
      'Analyze the social and hygienic function of Roman public bathhouses (thermae) and latrines.',
      'Evaluate why Roman public health infrastructure collapsed after the withdrawal of the legions in AD 410.',
    ],
    structureStrip: [
      {
        col: '1. CLEAN WATER & AQUEDUCTS',
        prompt:
          'Gravity aqueducts carrying fresh spring water over miles to public fountains, bathhouses, and private estates.',
      },
      {
        col: '2. BATHHOUSES & REMOVING WASTE',
        prompt:
          'Stone drains, communal latrines, and flushing sewer channels carrying filthy waste away from towns into rivers.',
      },
      {
        col: '3. LIMITS OF PROGRESS',
        prompt:
          'Romans did not know germs caused disease, lead pipes could poison water, and ordinary plebeians still lived in squalor.',
      },
    ],
    wordBank: {
      technical:
        'Aqueduct &bull; Cloaca (sewer) &bull; Thermae (baths) &bull; Hypocaust &bull; Lead pipes (fistulae) &bull; Latrine',
      geopolitical:
        'Roman Empire &bull; Fishbourne Palace &bull; Pax Romana &bull; civic prestige &bull; public amenity',
      connectives:
        'The most impressive Roman achievement was... &bull; For example, archaeological evidence reveals... &bull; However, public health was limited because... &bull; Consequently, while Roman engineering was brilliant...',
    },
    vocabTask: {
      type: 'distinction',
      prompt:
        'Distinguish between an <strong>Aqueduct</strong> (a bridge or channel carrying fresh clean water into a town) and a <strong>Cesspit</strong> (a pit in the ground for collecting sewage):',
    },
    bridgeTask: {
      type: 'visual_archaeology',
      title: 'Task 4: Archaeological Interrogation: Fishbourne Roman Palace Hydraulic Systems',
      imgSrc: '/images/water_local_fishbourne.jpg',
      imgCaption:
        'Archaeological Excavation Plate: Jointed Roman lead water pipes at Fishbourne Palace, West Sussex.',
      sourceText:
        '“Excavations at Fishbourne Roman Palace revealed a sophisticated hydraulic system dating to c.75 AD. Fresh spring water was piped over miles through jointed lead pipes and terracotta conduits to supply a monumental garden pool, decorative fountains, and a private bath suite with heated hypocaust floors and stone drainage channels flushing sewage away.”',
      shelfmark: 'SUSSEX ARCHAEOLOGICAL SOCIETY · EXCAVATION ARCHIVES · CHICHESTER',
      annotations: [
        '① Underline: phrase proving water was piped under hydraulic pressure.',
        '② Circle: 3 luxury amenities supplied with freshwater at Fishbourne.',
        '③ Box: the physical material used to manufacture the water pipes.',
      ],
      questionA:
        'What can an historian infer from Source A and the excavation plate about the standard of living enjoyed by wealthy Romans in southern Britain?',
      questionB:
        'Explain why archaeological evidence like pipes and drains is more reliable than written Roman speeches when investigating public health:',
      clue: '<em>Low-Floor Clue:</em> Notice the jointed lead pipes—this proves Romans mastered metal casting and gravity pressure to bring running water directly inside luxury villas.',
      scholarsEdge:
        '★ Scholar’s Edge: Why did this sophisticated Roman water engineering completely vanish from Britain after the legions departed in AD 410?',
    },
  },
  {
    // Lesson 2: Medieval Towns, Monasteries & The Black Death
    skill: 'Comparison & Medieval Public Health',
    enquiryQuestion:
      'Enquiry: Why did public health collapse in medieval towns, while monasteries remained remarkably clean?',
    doNow: [
      {
        q: 'What happened to Roman aqueducts and bathhouses in Britain after AD 410?',
        a: 'They fell into ruin and were dismantled for building stone.',
      },
      {
        q: 'Which wealthy local Roman palace in Sussex had running water and lead pipes?',
        a: 'Fishbourne Roman Palace.',
      },
      {
        q: 'Why did the Romans build public bathhouses (thermae)?',
        a: 'For civic pride, cleanliness, business meetings, and leisure.',
      },
      {
        q: 'Did the Romans understand that invisible bacteria and germs cause disease?',
        a: 'No, they believed in the Four Humours and miasma (bad air).',
      },
      {
        q: 'What term describes waste water or rainwater flowing naturally downhill?',
        a: 'Gravity flow / hydraulic gradient.',
      },
    ],
    objectives: [
      'Contrast living conditions in filthy, crowded medieval towns with clean, ordered monasteries.',
      'Examine the role of gong farmers, cesspits, and town ordinances against dumping butchery waste.',
      'Analyze how the Black Death (1348) challenged medieval understanding of disease and sanitation.',
    ],
    structureStrip: [
      {
        col: '1. FILTH IN MEDIEVAL TOWNS',
        prompt:
          'Rapid town growth, overflowing cesspits, wandering pigs, and butchers dumping offal into streets and rivers.',
      },
      {
        col: '2. MONASTIC CLEAN WATER',
        prompt:
          'Monks had wealth, literacy, and isolation to build settling tanks, lead water pipes, and latrines over running streams.',
      },
      {
        col: '3. HISTORICAL JUDGMENT',
        prompt:
          'Why did towns struggle: was it lack of money and enforcement, or the mistaken belief that bad smells (miasma) caused disease?',
      },
    ],
    wordBank: {
      technical:
        'Gong Farmer &bull; Cesspit &bull; Miasma Theory &bull; Conduits &bull; Settling Tank &bull; Black Death (1348)',
      geopolitical:
        'Monastic Rule of St Benedict &bull; Guilds &bull; Court Leet &bull; Canterbury waterworks &bull; unpaved streets',
      connectives:
        'Living conditions in medieval towns were filthy because... &bull; In sharp contrast, monasteries enjoyed clean water because... &bull; When the Black Death struck in 1348, people believed... &bull; Therefore, the fundamental difference was...',
    },
    vocabTask: {
      type: 'cloze',
      prompt:
        'Complete the summary below using the terms <em>Miasma</em> and <em>Gong Farmer</em>:',
      clozeText:
        'Medieval townspeople believed disease was caused by [ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ] (poisonous bad air); at night, human waste had to be dug out of overflowing cesspits by workers called [ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ].',
      followUp:
        'Explain why medieval mayors fined butchers for dumping rotting animal offal into town streams:',
    },
    bridgeTask: {
      type: 'dual_source_interrogation',
      title: 'Task 4: Archival Interrogation: Town Court Fines vs. Monastic Engineering Plans',
      sourceATitle: 'SOURCE A: NORWICH & WINCHESTER COURT LEET RECORDS (1312 & 1421)',
      sourceAText:
        '“1312: John le Ropere is fined 2 shillings for keeping a rotting dung-heap in the public street... 1421: Inquest of Winchester: John Hende has allowed his cesspit to overflow into the King’s ditch, polluting the water where women wash clothes, to the great peril of the town.”',
      sourceAShelfmark: 'NORFOLK & HAMPSHIRE RECORD OFFICES · COURT ROLLS',
      sourceBTitle: 'SOURCE B: WATER CONDUIT PLAN OF CHRIST CHURCH PRIORY, CANTERBURY (c.1165)',
      sourceBText:
        '“Drawn by Monk Wibert: Fresh spring water is collected 1 mile outside Canterbury, passed through five settling tanks to remove gravel and sand, piped underground into the monks’ washing fountain, and then flushed through the infirmary latrines into the river.”',
      sourceBShelfmark: 'TRINITY COLLEGE CAMBRIDGE · MS R.17.1 (EADWINE PSALTER)',
      annotations: [
        '① Underline: the fine imposed on John le Ropere for polluting the street.',
        '② Circle: the 5 water filters used by Canterbury monks to purify spring water.',
        '③ Box: the dual destination of monastic water (clean fountain vs latrine flushing).',
      ],
      questionA:
        'What do Source A and Source B prove about why medieval monks lived significantly longer, healthier lives than townspeople?',
      questionB:
        'Explain why medieval town councils found it almost impossible to enforce laws against dumping filth despite repeated fines:',
      clue: '<em>Low-Floor Clue:</em> Notice the contrast: towns had no underground pipes and relied on open gutters, while monasteries planned their water systems before building.',
      scholarsEdge:
        '★ Scholar’s Edge: How did belief in Miasma (bad air) lead town councils to focus on banning smelly dung heaps while completely ignoring contaminated well water?',
    },
  },
  {
    // Lesson 3: Early Modern Filth & The Great Plague of 1665
    skill: 'Change & Continuity',
    enquiryQuestion:
      'Enquiry: To what extent did towns become filthier during the Tudor and Stuart eras?',
    doNow: [
      {
        q: 'What night workers were paid to shovel human waste out of medieval cesspits?',
        a: 'Gong farmers.',
      },
      {
        q: 'What did medieval people mistakenly believe caused disease and the Black Death?',
        a: 'Miasma (poisonous bad smells) or God’s punishment.',
      },
      {
        q: 'Why were monastic water systems superior to town water systems?',
        a: 'Monasteries had piped spring water, settling tanks, and latrines over running rivers.',
      },
      { q: 'In what year did the Black Death first arrive in England?', a: '1348.' },
      {
        q: 'Which Hampshire city’s court records fined citizens for overflowing cesspits in 1421?',
        a: 'Winchester.',
      },
    ],
    objectives: [
      'Explain how London’s rapid population growth created cramped wooden shanties and open sewer ditches.',
      'Analyze Sir John Harington’s 1596 invention of the flushing water closet (the "Ajax").',
      'Evaluate how authorities responded to the 1665 Great Plague: red crosses, watchmen, and animal slaughter.',
    ],
    structureStrip: [
      {
        col: '1. OVERCROWDING & FLEET DITCH',
        prompt:
          'London’s explosive population growth, open sewer ditches, overflowing cesspools, and street scavengers.',
      },
      {
        col: '2. HARINGTON’S FLUSHING PRIVY',
        prompt:
          'Sir John Harington’s 1596 Ajax toilet: why only Queen Elizabeth I and the rich could afford water closets.',
      },
      {
        col: '3. THE 1665 PLAGUE CRISIS',
        prompt:
          'Locking families inside homes behind red crosses, watchmen, and killing cats and dogs (which worsened rats).',
      },
    ],
    wordBank: {
      technical:
        'Quarantine &bull; Red Cross &bull; Sir John Harington &bull; Ajax Water Closet &bull; Fleet Ditch &bull; Plague Doctor',
      geopolitical:
        'Great Plague of 1665 &bull; Lord Mayor of London &bull; Searchers of the Dead &bull; bill of mortality &bull; cesspool seepage',
      connectives:
        'During the Tudor and Stuart eras, living conditions worsened because... &bull; Although Harington invented the flushing toilet, it failed to spread because... &bull; In 1665, when plague struck, authorities... &bull; Ultimately, public health did not improve because...',
    },
    vocabTask: {
      type: 'golden_sentence',
      prompt:
        'Write ONE grammatically sophisticated, historically accurate Golden Sentence connecting <strong>Quarantine</strong> and <strong>Miasma</strong> using a causal conjunction (<em>because</em>, <em>although</em>, or <em>consequently</em>):',
      wordBank:
        'Quarantine &bull; Red Cross &bull; Miasma &bull; Sir John Harington &bull; Flushing Privy &bull; The Great Plague &bull; Searchers',
    },
    bridgeTask: {
      type: 'visual_plague',
      title: 'Task 4: Archival Interrogation: The 1665 London Plague Orders & The Plague Doctor',
      imgSrc: '/images/plague_doctor_1665.png',
      imgCaption:
        'Historical Visual: The 17th-century Plague Doctor costume with beak mask packed with aromatic herbs to ward off miasma.',
      sourceText:
        '“Every visited house shall be shut up with a red cross marked upon the middle of the door a foot long, with these words in capital letters: ‘LORD HAVE MERCY UPON US.’ And a watchman shall stand day and night before the door, to keep the people from coming forth... All dogs and cats shall immediately be destroyed by the common dog-killer, for preventing the spreading of the contagion.”',
      shelfmark: 'LONDON METROPOLITAN ARCHIVES · ORDERS OF THE LORD MAYOR AND ALDERMEN (JUNE 1665)',
      annotations: [
        '① Underline: the phrase ordering healthy and sick family members to be locked together.',
        '② Circle: the fatal instruction to destroy domestic pets.',
        '③ Box: the words painted in red letters across the door.',
      ],
      questionA:
        'What was the intended purpose of locking families inside their homes behind a red cross and a watchman?',
      questionB:
        'Explain why ordering the slaughter of 200,000 domestic dogs and cats tragically caused the plague to spread far faster:',
      clue: '<em>Low-Floor Clue:</em> Think about what animal really carried plague fleas—if you kill all the dogs and cats, the black rat population explodes!',
      scholarsEdge:
        '★ Scholar’s Edge: How did the plague doctor’s beak mask prove that 17th-century medical science was still completely trapped by ancient Greek Miasma theory?',
    },
  },
  {
    // Lesson 4: Industrial Towns, Chadwick & The 1848 Public Health Act
    skill: 'Historical Evidence & Sanitary Statistics',
    enquiryQuestion:
      'Enquiry: Why did Victorian industrial cities become death traps, and how did Chadwick challenge laissez-faire?',
    doNow: [
      {
        q: 'What did the red cross painted on doors during the 1665 Great Plague mean?',
        a: 'The house was infected with plague and locked under quarantine.',
      },
      {
        q: 'Who invented the first flushing water closet in 1596 for Queen Elizabeth I?',
        a: 'Sir John Harington (called the Ajax).',
      },
      {
        q: 'Why did Harington’s flushing toilet fail to improve public health in Tudor London?',
        a: 'No running water pipes existed, and it simply flushed waste into cesspools under houses.',
      },
      {
        q: 'What famous London sewer ditch was notorious for rotting filth and dead carcasses?',
        a: 'The Fleet Ditch.',
      },
      {
        q: 'What was the economic belief that the government should "leave things alone"?',
        a: 'Laissez-faire.',
      },
    ],
    objectives: [
      'Examine living conditions in back-to-back slum housing and unventilated cellar dwellings.',
      'Analyze Edwin Chadwick’s 1842 Sanitary Report and his revolutionary "sanitary arithmetic".',
      'Evaluate why the 1848 Public Health Act was largely ineffective across most British towns.',
    ],
    structureStrip: [
      {
        col: '1. INDUSTRIAL SLUM SQUALOR',
        prompt:
          'Back-to-back terraces, damp cellar dwellings, shared outdoor privies, and cesspool seepage into well water.',
      },
      {
        col: '2. CHADWICK’S SANITARY ARITHMETIC',
        prompt:
          'Chadwick’s 1842 Report using mortality statistics to prove that filth caused poverty, costing taxpayers money.',
      },
      {
        col: '3. LIMITS OF THE 1848 ACT',
        prompt:
          'Laissez-faire resistance: the 1848 Act was permissive (voluntary) rather than compulsory, so few towns built sewers.',
      },
    ],
    wordBank: {
      technical:
        'Laissez-faire &bull; Edwin Chadwick &bull; Sanitary Report (1842) &bull; Cellar dwellings &bull; 1848 Public Health Act',
      geopolitical:
        'Industrial Revolution &bull; back-to-back housing &bull; rate-payers &bull; Central Board of Health &bull; permissive legislation',
      connectives:
        'In Victorian industrial slums, living conditions were deadly because... &bull; In 1842, Edwin Chadwick revolutionized reform by... &bull; However, wealthy ratepayers resisted because... &bull; Consequently, the 1848 Act failed to transform Britain because...',
    },
    vocabTask: {
      type: 'distinction',
      prompt:
        'Distinguish between <strong>Permissive Legislation</strong> (a law that allows councils to act if they choose) and <strong>Compulsory Legislation</strong> (a law that forces councils to act by national command):',
    },
    bridgeTask: {
      type: 'sanitary_table',
      title:
        'Task 4: Interrogating Chadwick’s 1842 Report on the Sanitary Condition of the Labouring Population',
      sourceTitle:
        'Source C: Life Expectancy by Social Class and Location (Chadwick’s 1842 Statistics)',
      shelfmark: 'BRITISH PARLIAMENTARY PAPERS · CHADWICK REPORT · HC 1842 [007]',
      sourceText:
        '“The hard arithmetic of disease: The average age of death of an artisan or labourer in rural Rutland was 38 years; in industrial Manchester, it was just 17 years. In Liverpool, over half of all working-class children died before their fifth birthday, poisoned by stagnant cesspools beneath cellar floors.”',
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
      questionA:
        'Using Chadwick’s statistics table, explain how an artisan’s life expectancy was cut in half simply by moving from rural Rutland to industrial Manchester:',
      questionB:
        'Explain how Chadwick cleverly used these statistics to argue that cleaning up filthy slums would save taxpayers money:',
      clue: '<em>Low-Floor Clue:</em> Look at the gap: 38 years in Rutland down to 17 in Manchester—Chadwick proved dirt and squalor, not bad luck, killed workers.',
      scholarsEdge:
        '★ Scholar’s Edge: Why did wealthy factory owners and ratepayers fiercely denounce Chadwick as a "Prussian dictator" for proposing municipal water taxes?',
    },
  },
  {
    // Lesson 5: John Snow, Cholera & The 1854 Broad Street Pump
    skill: 'Scientific Methodology & Source Utility',
    enquiryQuestion:
      'Enquiry: Explain how John Snow proved that cholera was spread through contaminated water rather than bad air.',
    doNow: [
      {
        q: 'In what year was Edwin Chadwick’s groundbreaking Sanitary Report published?',
        a: '1842.',
      },
      {
        q: 'What was the average age of death for a factory labourer in Manchester according to Chadwick?',
        a: '17 years old.',
      },
      {
        q: 'Why was the 1848 Public Health Act mostly ineffective across Britain?',
        a: 'It was permissive (voluntary), so councils refused to spend tax money.',
      },
      {
        q: 'What deadly water-borne bacterial disease first struck Britain in 1831?',
        a: 'Asiatic Cholera.',
      },
      {
        q: 'What was the medical theory that poisonous bad smells and rotting air spread disease?',
        a: 'Miasma Theory.',
      },
    ],
    objectives: [
      'Examine the terrifying symptoms and rapid mortality of Asiatic Cholera epidemics.',
      'Analyze Dr John Snow’s meticulous mapping of cholera victims around Broad Street in 1854.',
      'Evaluate how removing the pump handle provided empirical proof that water transmitted cholera.',
    ],
    structureStrip: [
      {
        col: '1. CHOLERA SQUALOR & MIASMA',
        prompt:
          'Terrifying cholera symptoms (blue death, extreme dehydration) and why Victorian doctors clung to miasma theory.',
      },
      {
        col: '2. SNOW’S SHOE-LEATHER DETECTIVE WORK',
        prompt:
          'Dr John Snow knocking on doors, marking deaths with black bars on a map, and investigating the Broad Street pump.',
      },
      {
        col: '3. REMOVING THE PUMP HANDLE',
        prompt:
          'Persuading the parish guardians to remove the handle, halting the outbreak, and proving water-borne contagion.',
      },
    ],
    wordBank: {
      technical:
        'Dr John Snow &bull; Broad Street Pump &bull; Cholera Vibrio &bull; Dot Map / Ghost Map &bull; Lion Brewery &bull; Cesspool leakage',
      geopolitical:
        'Soho outbreak (1854) &bull; Board of Guardians &bull; shoe-leather epidemiology &bull; water company pollution &bull; Robert Koch',
      connectives:
        'When cholera struck Soho in 1854, most doctors blamed... &bull; However, Dr John Snow investigated forensically by... &bull; His crucial breakthrough came when he noticed... &bull; Consequently, by removing the pump handle, Snow proved...',
    },
    vocabTask: {
      type: 'cloze',
      prompt:
        'Complete the summary below using the terms <em>Cholera</em> and <em>Epidemiology</em>:',
      clozeText:
        'Dr John Snow founded the modern science of [ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ] (tracking disease patterns) by proving that [ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ] was spread through fecal bacteria in drinking water, not foul air.',
      followUp:
        'Explain why brewery workers on Broad Street survived the outbreak without catching cholera:',
    },
    bridgeTask: {
      type: 'visual_cholera_map',
      title: 'Task 4: Archival Interrogation: Dr. John Snow’s Broad Street Spot Map (1854)',
      imgSrc: '/images/john_snow_cholera_map.jpg',
      imgCaption:
        'Primary Cartography: Dr John Snow’s 1854 Spot Map of Soho, with black bars showing cholera deaths clustered around the pump.',
      sourceText:
        '“Within 250 yards of the Broad Street pump, 500 deaths occurred in ten days. Nearby, at the Lion Brewery, none of the 70 workers died—they were given free malt liquor and never drank pump water. At the workhouse with its own private well, only 5 of 535 inmates caught cholera. On 7 September 1854, the pump handle was removed.”',
      shelfmark: 'WELLCOME HISTORICAL MEDICAL COLLECTION · SNOW CHOLERA MONOGRAPH · 1855',
      annotations: [
        '① Underline: the evidence regarding the 70 Lion Brewery workers.',
        '② Circle: the date the Broad Street pump handle was removed.',
        '③ Box: the death toll recorded within 250 yards of the pump.',
      ],
      questionA:
        'Using the spot map and text, explain why the Lion Brewery and the local workhouse were the two crucial clues proving cholera was in the water:',
      questionB:
        'Explain why the medical establishment stubbornly rejected John Snow’s water theory for another thirty years until Robert Koch identified the cholera microbe in 1883:',
      clue: '<em>Low-Floor Clue:</em> Brewery workers drank boiled, fermented beer; workhouse inmates had a private deep well. If bad air was the killer, why didn’t they breathe it too?',
      scholarsEdge:
        '★ Scholar’s Edge: How did John Snow’s dot map pioneer modern spatial data analysis and revolutionize the discipline of public health epidemiology?',
    },
  },
  {
    // Lesson 6: The Great Stink (1858) & Joseph Bazalgette
    skill: 'Causation & Engineering Significance',
    enquiryQuestion:
      'Enquiry: Why did it take the Great Stink of 1858 to finally force Parliament to clean up Britain’s water?',
    doNow: [
      {
        q: 'What London street pump was identified by Dr John Snow as the source of the 1854 cholera epidemic?',
        a: 'The Broad Street pump in Soho.',
      },
      {
        q: 'Why did the 70 workers at the Lion Brewery survive the 1854 Soho cholera outbreak?',
        a: 'They drank free beer brewed with boiled water, not pump water.',
      },
      {
        q: 'What action did parish guardians take on 7 September 1854 to halt the cholera outbreak?',
        a: 'They removed the handle of the Broad Street pump.',
      },
      {
        q: 'Did Victorian medical authorities immediately accept John Snow’s water-borne theory in 1854?',
        a: 'No, they clung to Miasma theory for another 30 years.',
      },
      {
        q: 'What major London river had become an open, toxic sewer by the 1850s?',
        a: 'The River Thames.',
      },
    ],
    objectives: [
      'Understand how domestic flush toilets turned the River Thames into an open, toxic sewer.',
      'Analyze how the Great Stink of 1858 paralyzed the House of Commons and forced emergency legislation.',
      'Evaluate the engineering scale of Joseph Bazalgette’s intercepting sewers and the 1875 Public Health Act.',
    ],
    structureStrip: [
      {
        col: '1. THE GREAT STINK OF 1858',
        prompt:
          'Unprecedented summer heatwave, boiling river filth, and MPs soaking curtains in chloride of lime to breathe.',
      },
      {
        col: '2. BAZALGETTE’S BRICK SEWERS',
        prompt:
          '82 miles of underground intercepting brick sewers, 318 million bricks, and Portland cement pumping waste east to the sea.',
      },
      {
        col: '3. HISTORICAL SIGNIFICANCE',
        prompt:
          'Permanent eradication of cholera from London, the 1875 Public Health Act, and ending laissez-faire forever.',
      },
    ],
    wordBank: {
      technical:
        'Joseph Bazalgette &bull; The Great Stink (1858) &bull; Intercepting Sewers &bull; Portland Cement &bull; 1875 Public Health Act',
      geopolitical:
        'Victoria Embankment &bull; House of Commons &bull; chloride of lime &bull; compulsory sanitation &bull; Crossness pumping station',
      connectives:
        'For decades, politicians refused to fund sewers due to laissez-faire, but in June 1858... &bull; The Great Stink affected MPs directly because... &bull; In response, Parliament passed an emergency bill empowering... &bull; Consequently, Bazalgette constructed...',
    },
    vocabTask: {
      type: 'cloze',
      prompt:
        'Complete the summary below using the terms <em>Laissez-faire</em> and <em>Intercepting Sewer</em>:',
      clozeText:
        'Parliament finally abandoned its policy of [ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ] when the Great Stink of 1858 choked MPs, giving Joseph Bazalgette funding to construct a giant system of [ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ] pipes to divert waste eastwards away from drinking water.',
      followUp:
        'Explain why Bazalgette used Portland cement and egg-shaped brick sewers instead of round pipes:',
    },
    bridgeTask: {
      type: 'visual_bazalgette',
      title: 'Task 4: Archival Interrogation: Joseph Bazalgette’s Intercepting Underground Sewers',
      imgSrc: '/images/bazalgette_sewer.jpg',
      imgCaption:
        'Engineering Archive Plate: Construction of Joseph Bazalgette’s egg-shaped brick intercepting sewers beneath London (c. 1860s).',
      sourceText:
        '“In June 1858, a blazing heatwave turned the River Thames into a bubbling cesspool of human excrement. In the House of Commons, MPs fled the library holding scented handkerchiefs, and committee rooms were soaked in chloride of lime. Within 18 days, Parliament abandoned 50 years of laissez-faire excuses, passing a bill granting £3 million for Chief Engineer Joseph Bazalgette to build 82 miles of intercepting brick sewers.”',
      shelfmark: 'INSTITUTION OF CIVIL ENGINEERS ARCHIVES · BAZALGETTE PAPERS · LONDON',
      annotations: [
        '① Underline: what MPs used to try and mask the toxic smell in Parliament.',
        '② Circle: the speed with which Parliament passed the emergency sewer legislation.',
        '③ Box: the total mileage of underground intercepting brick sewers constructed.',
      ],
      questionA:
        'Using the photograph and text, explain why it took a direct threat to the lives and nostrils of rich politicians in Parliament to finally end laissez-faire:',
      questionB:
        'Explain how Joseph Bazalgette’s egg-shaped brick sewers and Portland cement created an engineering triumph that permanently eradicated cholera from London:',
      clue: '<em>Low-Floor Clue:</em> As long as poor people died in slums, MPs refused to spend taxes; when MPs themselves couldn’t breathe in Parliament, money was approved in 18 days!',
      scholarsEdge:
        '★ Scholar’s Edge: How did the completion of Bazalgette’s sewers pave the way for the historic 1875 Public Health Act, making clean water a compulsory human right in Britain?',
    },
  },
];

/**
 * Builds the complete HTML for the 16-page Water & Sanitation workbook
 */
function buildWaterAndSanitationTwoPageWorkbookHtml() {
  const coverImg = getBase64Image('/images/john_snow_cholera_map.jpg');

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Pupil Workbook - Water &amp; Sanitation Through Time (Staged V2)</title>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Inter:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,500;1,600&family=Special+Elite&display=swap" rel="stylesheet">
  <style>
    *, *:before, *:after { box-sizing: border-box; }
    @page {
      size: A4 portrait;
      margin: 10mm 12mm 12mm 12mm;
    }
    body {
      font-family: 'Georgia', 'Garamond', serif;
      font-size: 9pt;
      line-height: 1.32;
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
      padding: 14px 16px;
      border: 1px solid #cbd5e1;
      outline: 3.5px double #0f172a;
      outline-offset: -7px;
      background: #ffffff;
    }
    .page:last-child, .page-container:last-child {
      page-break-after: auto;
    }
    .task-line {
      border-bottom: 1.2px solid #475569;
      height: 7.2mm;
      width: 100%;
      box-sizing: border-box;
    }
    .task-line-dotted {
      border-bottom: 1.2px dotted #64748b;
      height: 4.8mm;
      width: 100%;
      box-sizing: border-box;
    }
    .archival-badge {
      font-family: 'Inter', sans-serif;
      font-size: 7.5pt;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      padding: 2px 7px;
      border-radius: 3px;
      background: #f1f5f9;
      color: #334155;
      border: 1px solid #cbd5e1;
      font-weight: 700;
    }
  </style>
</head>
<body>
`;

  // ==========================================
  // PAGE 1: FRONT COVER (Recto, Right Page)
  // ==========================================
  html += `
  <div class="page page-container" id="page-1" style="justify-content: flex-start;">
    <!-- Institutional Header & Pupil Registration Strip -->
    <div style="margin-bottom: 8px;">
      <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 5px;">
        <span class="school-brand-target" data-department-name="The History Department" style="font-family: 'Inter', sans-serif; font-size: 8.5pt; text-transform: uppercase; letter-spacing: 2px; color: #0284c7; font-weight: 800;">
          The History Department
        </span>
        <span style="font-family: 'Inter', sans-serif; font-size: 8pt; text-transform: uppercase; letter-spacing: 1.5px; color: #64748b; font-weight: 700;">
          Year 7 History &bull; V2 Staged Edition
        </span>
      </div>

      <!-- Pupil Name & Class Box -->
      <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 6px 12px; background: #f8fafc; display: grid; grid-template-columns: 2.2fr 1fr; gap: 18px; align-items: center;">
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; white-space: nowrap; margin-right: 8px;">Pupil Name:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #334155; height: 14px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; white-space: nowrap; margin-right: 8px;">Class:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #334155; height: 14px;"></div>
        </div>
      </div>
    </div>

    <!-- Main Title Block -->
    <div style="text-align: center; border-bottom: 1px solid #cbd5e1; padding: 2px 0 7px 0; margin-bottom: 8px;">
      <h1 style="font-family: 'Playfair Display', serif; font-size: 23pt; color: #0f172a; margin: 0 0 2px 0; text-transform: uppercase; letter-spacing: 1.5px; line-height: 1.15;">
        Water &amp; Sanitation
      </h1>
      <div style="font-family: 'Inter', sans-serif; font-size: 9pt; color: #334155; font-weight: 600; letter-spacing: 0.5px;">
        Public Health, Engineering &amp; The Battle Against Disease (c.43 AD–Present)
      </div>
    </div>

    <!-- Overarching Enquiry Box -->
    <div style="border: 1.5px solid #0284c7; border-radius: 5px; padding: 8px 14px; background: #f0f9ff; margin-bottom: 8px; text-align: center;">
      <div style="font-family: 'Inter', sans-serif; font-size: 7.6pt; text-transform: uppercase; letter-spacing: 1.8px; color: #0284c7; font-weight: 800; margin-bottom: 2px;">
        Overarching Historical Enquiry
      </div>
      <div style="font-family: 'Playfair Display', serif; font-size: 13.5pt; color: #0f172a; font-style: italic; font-weight: 600; line-height: 1.25;">
        “How did Britain conquer water-borne disease: engineering, science, or government power?”
      </div>
    </div>

    <!-- Hero Primary Plate -->
    <div style="border: 1.2px solid #cbd5e1; border-radius: 6px; padding: 6px; background: #ffffff; box-shadow: 0 2px 6px rgba(0,0,0,0.04); margin-bottom: 8px;">
      <div style="width: 100%; height: 470px; border-radius: 4px; overflow: hidden; border: 1px solid #e2e8f0; background: #0f172a;">
        <img src="${coverImg}" style="width: 100%; height: 100%; object-fit: contain; object-position: center; display: block;" alt="John Snow Cholera Spot Map">
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px; padding: 0 4px; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #64748b;">
        <span><strong>Primary Visual Plate:</strong> Dr. John Snow’s Broad Street Cholera Spot Map (Soho, 1854)</span>
        <span style="font-style: italic;">Wellcome Historical Medical Collection</span>
      </div>
    </div>

    <!-- Curriculum Synopsis Box -->
    <div style="border: 1.2px solid #e2e8f0; border-radius: 5px; padding: 7px 11px; background: #fafaf9; margin-bottom: 8px;">
      <div style="font-family: 'Inter', sans-serif; font-size: 7.3pt; text-transform: uppercase; letter-spacing: 1px; color: #0f172a; font-weight: 800; margin-bottom: 2px;">
        Curriculum Synopsis &bull; The 2,000-Year Clean Water Quest
      </div>
      <p style="font-family: 'Georgia', serif; font-size: 8.2pt; color: #334155; line-height: 1.4; margin: 0; text-align: justify;">
        From the Roman lead pipes at Fishbourne Palace to the stench of medieval cesspits and the deadly cholera water pumps of Victorian London, clean water has been Britain’s greatest battle. In this Year 7 pupil workbook, students investigate how doctors, brave engineers, and government laws transformed Britain from a country plagued by water-borne death into a modern society where safe, clean drinking water flows from every tap.
      </p>
    </div>

    <!-- 6 Core Enquiries Unit Syllabus Roadmap -->
    <div style="border: 1px solid #cbd5e1; border-radius: 5px; padding: 6px 9px; background: #f8fafc;">
      <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase; letter-spacing: 1px; color: #0284c7; font-weight: 800; margin-bottom: 4px;">
        The 6 Disciplinary Enquiries:
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px;">
        <div style="font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #334155; padding: 2px 6px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 3px; display: flex; align-items: center;"><strong style="color: #0284c7; margin-right: 5px; white-space: nowrap;">L1:</strong> Roman Britain &amp; Fishbourne Palace</div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #334155; padding: 2px 6px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 3px; display: flex; align-items: center;"><strong style="color: #0284c7; margin-right: 5px; white-space: nowrap;">L4:</strong> Industrial Towns &amp; Chadwick (1842)</div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #334155; padding: 2px 6px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 3px; display: flex; align-items: center;"><strong style="color: #0284c7; margin-right: 5px; white-space: nowrap;">L2:</strong> Medieval Towns &amp; Monasteries</div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #334155; padding: 2px 6px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 3px; display: flex; align-items: center;"><strong style="color: #0284c7; margin-right: 5px; white-space: nowrap;">L5:</strong> John Snow &amp; The Broad Street Pump</div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #334155; padding: 2px 6px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 3px; display: flex; align-items: center;"><strong style="color: #0284c7; margin-right: 5px; white-space: nowrap;">L3:</strong> Early Modern Filth &amp; 1665 Plague</div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #334155; padding: 2px 6px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 3px; display: flex; align-items: center;"><strong style="color: #0284c7; margin-right: 5px; white-space: nowrap;">L6:</strong> The Great Stink &amp; Bazalgette’s Sewers</div>
      </div>
    </div>
  </div>
`;

  // ==========================================
  // PAGES 2–3: LIVING UNIT TIMELINE SPINE
  // ==========================================
  html += `
  <!-- PAGE 2: TIMELINE PART I (Facing Spread Left) -->
  <div class="page page-container" id="page-2">
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #0284c7; padding-bottom: 4px; margin-bottom: 6px;">
        <div>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.8pt; text-transform: uppercase; letter-spacing: 1px; color: #0284c7; font-weight: 800;">
            Living Unit Timeline &bull; Part I: Romans to Tudors (c.43 AD–1600)
          </div>
          <h2 style="margin: 2px 0 0 0; font-family: 'Playfair Display', serif; font-size: 13.5pt; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px;">
            The Ancient &amp; Medieval Foundations
          </h2>
        </div>
        <span class="archival-badge" style="background: #f0f9ff; color: #0284c7; border-color: #bae6fd;">
          Pages 2–3 Facing Spread
        </span>
      </div>

      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-left: 3px solid #0284c7; padding: 3px 8px; margin-bottom: 6px; border-radius: 3px; font-family: 'Inter', sans-serif; font-size: 7.1pt; color: #475569; display: flex; justify-content: space-between; align-items: center;">
        <span><strong>Living Timeline Protocol:</strong> Throughout this unit, sketch each milestone inside its box. Add pipes, pumps, and water drops!</span>
        <span style="font-weight: 700; color: #0284c7; white-space: nowrap; margin-left: 8px;">Spine &bull; Facing Left</span>
      </div>

      <!-- Timeline Nodes -->
      <div style="display: flex; flex-direction: column; gap: 7px;">
        <!-- Milestone 1: c.43–410 AD -->
        <div style="display: grid; grid-template-columns: 110px 1fr; gap: 9px; align-items: stretch; border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 5px 8px; background: #ffffff;">
          <div style="border: 1.2px dashed #94a3b8; border-radius: 3px; background: #fafaf9; display: flex; flex-direction: column; justify-content: space-between; padding: 3px 4px; min-height: 36mm;">
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌜</span><span>Milestone Sketchpad</span><span>⌝</span>
            </div>
            <div style="text-align: center; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b; font-style: italic;">
              [Sketch: Roman Aqueduct arches / Lead pipe]
            </div>
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌞</span><span>Roman Britain</span><span>⌟</span>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
                <span style="font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; background: #0284c7; color: #ffffff; padding: 1px 6px; border-radius: 3px;">c.43–410 AD</span>
                <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f172a;">Roman Aqueducts, Bathhouses &amp; Fishbourne Lead Pipes</strong>
              </div>
              <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #334155; line-height: 1.35; margin: 0;">
                The Romans introduce stone aqueducts, communal bathhouses, and gravity sewers to Britain. At Fishbourne Roman Palace in Hampshire/Sussex, jointed lead water pipes supply fresh running water to garden pools, private fountains, and heated bath suites.
              </p>
            </div>
            <div style="border-top: 1px dotted #cbd5e1; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b;">
              <strong>Key Enquiry Link:</strong> Lesson 1 &bull; Roman public health engineering vs. lack of germ knowledge
            </div>
          </div>
        </div>

        <!-- Milestone 2: c.1100–1300 -->
        <div style="display: grid; grid-template-columns: 110px 1fr; gap: 9px; align-items: stretch; border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 5px 8px; background: #ffffff;">
          <div style="border: 1.2px dashed #94a3b8; border-radius: 3px; background: #fafaf9; display: flex; flex-direction: column; justify-content: space-between; padding: 3px 4px; min-height: 36mm;">
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌜</span><span>Milestone Sketchpad</span><span>⌝</span>
            </div>
            <div style="text-align: center; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b; font-style: italic;">
              [Sketch: Monastic conduit / Settling tank]
            </div>
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌞</span><span>Monasteries</span><span>⌟</span>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
                <span style="font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; background: #0284c7; color: #ffffff; padding: 1px 6px; border-radius: 3px;">c.1100–1300</span>
                <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f172a;">Monastic Engineering: Water Conduits &amp; Settling Tanks</strong>
              </div>
              <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #334155; line-height: 1.35; margin: 0;">
                While towns drink from muddy rivers and dump waste in streets, medieval abbeys and priories construct elaborate piped water systems. Monks in Winchester and Canterbury build settling tanks to filter water, piping fresh water directly into washing cloisters.
              </p>
            </div>
            <div style="border-top: 1px dotted #cbd5e1; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b;">
              <strong>Key Enquiry Link:</strong> Lesson 2 &bull; Monastic hygiene vs. town squalor &bull; settling tanks
            </div>
          </div>
        </div>

        <!-- Milestone 3: 1348 -->
        <div style="display: grid; grid-template-columns: 110px 1fr; gap: 9px; align-items: stretch; border: 1.4px solid #b91c1c; border-radius: 4px; padding: 5px 8px; background: #fffaf0;">
          <div style="border: 1.2px dashed #b91c1c; border-radius: 3px; background: #fef2f2; display: flex; flex-direction: column; justify-content: space-between; padding: 3px 4px; min-height: 36mm;">
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #b91c1c;">
              <span>⌜</span><span>Milestone Sketchpad</span><span>⌝</span>
            </div>
            <div style="text-align: center; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #991b1b; font-weight: 700;">
              [Sketch: Black Death cross / Gong farmer barrel]
            </div>
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #b91c1c;">
              <span>⌞</span><span>1348 Plague</span><span>⌟</span>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
                <span style="font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; background: #b91c1c; color: #ffffff; padding: 1px 6px; border-radius: 3px;">1348</span>
                <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f172a;">The Black Death &amp; The Rise of Gong Farmers</strong>
              </div>
              <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #334155; line-height: 1.35; margin: 0;">
                The bubonic plague kills over a third of Britain’s population. Believing bad smells (miasma) cause the plague, towns fine citizens for leaving dung heaps and hire night workers ("gong farmers") to shovel human waste out of overflowing cesspits.
              </p>
            </div>
            <div style="border-top: 1px dotted #cbd5e1; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #b91c1c;">
              <strong>Key Enquiry Link:</strong> Lesson 2 &bull; Medieval town councils trying to regulate filth &bull; miasma
            </div>
          </div>
        </div>

        <!-- Milestone 4: 1596 -->
        <div style="display: grid; grid-template-columns: 110px 1fr; gap: 9px; align-items: stretch; border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 5px 8px; background: #ffffff;">
          <div style="border: 1.2px dashed #94a3b8; border-radius: 3px; background: #fafaf9; display: flex; flex-direction: column; justify-content: space-between; padding: 3px 4px; min-height: 36mm;">
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌜</span><span>Milestone Sketchpad</span><span>⌝</span>
            </div>
            <div style="text-align: center; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b; font-style: italic;">
              [Sketch: Sir John Harington's flushing toilet]
            </div>
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌞</span><span>1596 Invention</span><span>⌟</span>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
                <span style="font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; background: #0284c7; color: #ffffff; padding: 1px 6px; border-radius: 3px;">1596</span>
                <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f172a;">Sir John Harington Invents the First Flushing Toilet (Water Closet)</strong>
              </div>
              <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #334155; line-height: 1.35; margin: 0;">
                Queen Elizabeth I’s godson, Sir John Harington, invents the first flushing water closet called the "Ajax." Water is released from a cistern to flush waste into a vault. However, without running water pipes or city sewers, ordinary people continue using chamber pots.
              </p>
            </div>
            <div style="border-top: 1px dotted #cbd5e1; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b;">
              <strong>Key Enquiry Link:</strong> Lesson 3 &bull; Early modern technology vs. lack of infrastructure &bull; Ajax
            </div>
          </div>
        </div>
      </div>

      <!-- Living Timeline Part I Synthesis Challenge -->
      <div style="border: 1.2px solid #0284c7; background: #f0f9ff; border-radius: 4px; padding: 5px 9px; margin-top: 8px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.6pt; text-transform: uppercase; color: #0284c7; letter-spacing: 0.5px;">
            Living Timeline Synthesis Challenge &bull; The Ancient to Tudor Gap
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 700; color: #0369a1;">Infrastructure Check</span>
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #334155; margin-bottom: 3px; line-height: 1.3;">
          Why did Britain lose running water for over 1,000 years after the Romans left in AD 410, and why were monasteries the only places able to rebuild clean water systems?
        </div>
        <div class="task-line-dotted" style="height: 5.2mm;"></div>
        <div class="task-line-dotted" style="height: 5.2mm;"></div>
      </div>
    </div>

    <!-- Colophon -->
    <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #cbd5e1; padding-top: 3px; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #94a3b8;">
      <span>The History Department &bull; Water &amp; Sanitation (Year 7 V2)</span>
      <span>Page 2 (Facing Spread Left)</span>
    </div>
  </div>

  <!-- PAGE 3: TIMELINE PART II (Facing Spread Right) -->
  <div class="page page-container" id="page-3">
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #0284c7; padding-bottom: 4px; margin-bottom: 6px;">
        <div>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.8pt; text-transform: uppercase; letter-spacing: 1px; color: #0284c7; font-weight: 800;">
            Living Unit Timeline &bull; Part II: The Clean Water Revolution (1800–Present)
          </div>
          <h2 style="margin: 2px 0 0 0; font-family: 'Playfair Display', serif; font-size: 13.5pt; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px;">
            Conquering Water-Borne Disease
          </h2>
        </div>
        <span class="archival-badge" style="background: #f0f9ff; color: #0284c7; border-color: #bae6fd;">
          Pages 2–3 Facing Spread
        </span>
      </div>

      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-left: 3px solid #0284c7; padding: 3px 8px; margin-bottom: 6px; border-radius: 3px; font-family: 'Inter', sans-serif; font-size: 7.1pt; color: #475569; display: flex; justify-content: space-between; align-items: center;">
        <span><strong>Living Timeline Protocol:</strong> Trace how scientific investigation and mega-engineering finally eliminated cholera from Britain.</span>
        <span style="font-weight: 700; color: #0284c7; white-space: nowrap; margin-left: 8px;">Spine &bull; Facing Right</span>
      </div>

      <!-- Timeline Nodes -->
      <div style="display: flex; flex-direction: column; gap: 7px;">
        <!-- Milestone 5: 1842 -->
        <div style="display: grid; grid-template-columns: 1fr 110px; gap: 9px; align-items: stretch; border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 5px 8px; background: #ffffff;">
          <div style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
                <span style="font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; background: #0284c7; color: #ffffff; padding: 1px 6px; border-radius: 3px;">1842</span>
                <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f172a;">Edwin Chadwick’s Sanitary Report &amp; The 1848 Act</strong>
              </div>
              <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #334155; line-height: 1.35; margin: 0;">
                Edwin Chadwick publishes his landmark report proving that horrific slum filth and cesspool seepage reduce labourer life expectancy in Manchester to just 17 years. Parliament passes the 1848 Public Health Act, but because it is permissive, few towns spend money.
              </p>
            </div>
            <div style="border-top: 1px dotted #cbd5e1; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b;">
              <strong>Key Enquiry Link:</strong> Lesson 4 &bull; Sanitary statistics &bull; Laissez-faire resistance &bull; 1848 Act
            </div>
          </div>
          <div style="border: 1.2px dashed #94a3b8; border-radius: 3px; background: #fafaf9; display: flex; flex-direction: column; justify-content: space-between; padding: 3px 4px; min-height: 36mm;">
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌜</span><span>Milestone Sketchpad</span><span>⌝</span>
            </div>
            <div style="text-align: center; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b; font-style: italic;">
              [Sketch: Chadwick's Report / Cellar dwelling]
            </div>
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌞</span><span>1842 Report</span><span>⌟</span>
            </div>
          </div>
        </div>

        <!-- Milestone 6: 1854 -->
        <div style="display: grid; grid-template-columns: 1fr 110px; gap: 9px; align-items: stretch; border: 1.4px solid #b91c1c; border-radius: 4px; padding: 5px 8px; background: #fffaf0;">
          <div style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
                <span style="font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; background: #b91c1c; color: #ffffff; padding: 1px 6px; border-radius: 3px;">1854</span>
                <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f172a;">Dr John Snow Removes the Broad Street Pump Handle</strong>
              </div>
              <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #334155; line-height: 1.35; margin: 0;">
                During a ferocious cholera outbreak in Soho, Dr John Snow maps 500 fatal cases and proves victims drank from the Broad Street pump. By removing the pump handle, he halts the outbreak and provides empirical proof that cholera is water-borne, shattering Miasma dogma.
              </p>
            </div>
            <div style="border-top: 1px dotted #cbd5e1; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #b91c1c;">
              <strong>Key Enquiry Link:</strong> Lesson 5 &bull; Shoe-leather epidemiology &bull; Broad Street pump &bull; Ghost Map
            </div>
          </div>
          <div style="border: 1.2px dashed #b91c1c; border-radius: 3px; background: #fef2f2; display: flex; flex-direction: column; justify-content: space-between; padding: 3px 4px; min-height: 36mm;">
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #b91c1c;">
              <span>⌜</span><span>Milestone Sketchpad</span><span>⌝</span>
            </div>
            <div style="text-align: center; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #991b1b; font-weight: 700;">
              [Sketch: Broad Street pump handle removed]
            </div>
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #b91c1c;">
              <span>⌞</span><span>1854 Snow</span><span>⌟</span>
            </div>
          </div>
        </div>

        <!-- Milestone 7: 1858 -->
        <div style="display: grid; grid-template-columns: 1fr 110px; gap: 9px; align-items: stretch; border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 5px 8px; background: #ffffff;">
          <div style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
                <span style="font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; background: #0284c7; color: #ffffff; padding: 1px 6px; border-radius: 3px;">1858</span>
                <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f172a;">The Great Stink &amp; Bazalgette’s Intercepting Sewers</strong>
              </div>
              <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #334155; line-height: 1.35; margin: 0;">
                A scorching summer turns the Thames into an intolerable open sewer, forcing Parliament to soak curtains in chloride of lime. In panic, MPs grant £3 million to Joseph Bazalgette to build 82 miles of underground intercepting brick sewers, permanently ridding London of cholera.
              </p>
            </div>
            <div style="border-top: 1px dotted #cbd5e1; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b;">
              <strong>Key Enquiry Link:</strong> Lesson 6 &bull; Great Stink &bull; Bazalgette's 82-mile sewer network &bull; Portland cement
            </div>
          </div>
          <div style="border: 1.2px dashed #94a3b8; border-radius: 3px; background: #fafaf9; display: flex; flex-direction: column; justify-content: space-between; padding: 3px 4px; min-height: 36mm;">
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌜</span><span>Milestone Sketchpad</span><span>⌝</span>
            </div>
            <div style="text-align: center; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b; font-style: italic;">
              [Sketch: Egg-shaped brick sewer / Embankment]
            </div>
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌞</span><span>1858 Bazalgette</span><span>⌟</span>
            </div>
          </div>
        </div>

        <!-- Milestone 8: 1875 -->
        <div style="display: grid; grid-template-columns: 1fr 110px; gap: 9px; align-items: stretch; border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 5px 8px; background: #ffffff;">
          <div style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
                <span style="font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; background: #0284c7; color: #ffffff; padding: 1px 6px; border-radius: 3px;">1875</span>
                <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f172a;">The 1875 Public Health Act: Clean Water as a Right</strong>
              </div>
              <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #334155; line-height: 1.35; margin: 0;">
                Disraeli’s government passes the historic 1875 Public Health Act, making clean water and sewer connections compulsory across every town in Britain. Laissez-faire is officially abandoned as local councils are legally required to provide clean drinking water and collect rubbish.
              </p>
            </div>
            <div style="border-top: 1px dotted #cbd5e1; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b;">
              <strong>Key Enquiry Link:</strong> Lesson 6 &bull; Compulsory legislation &bull; End of laissez-faire &bull; Modern sanitation
            </div>
          </div>
          <div style="border: 1.2px dashed #94a3b8; border-radius: 3px; background: #fafaf9; display: flex; flex-direction: column; justify-content: space-between; padding: 3px 4px; min-height: 36mm;">
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌜</span><span>Milestone Sketchpad</span><span>⌝</span>
            </div>
            <div style="text-align: center; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b; font-style: italic;">
              [Sketch: Clean water tap flowing into home]
            </div>
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌞</span><span>1875 Public Health</span><span>⌟</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Living Timeline Part II Synthesis Challenge -->
      <div style="border: 1.2px solid #0284c7; background: #f0f9ff; border-radius: 4px; padding: 5px 9px; margin-top: 8px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.6pt; text-transform: uppercase; color: #0284c7; letter-spacing: 0.5px;">
            Living Timeline Synthesis Challenge &bull; Science vs. Engineering
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 700; color: #0369a1;">Causal Weighing Check</span>
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #334155; margin-bottom: 3px; line-height: 1.3;">
          Explain how John Snow's shoe-leather detective work in 1854 and Bazalgette's mega-engineering in 1858 proved that clean water was the ultimate weapon against disease:
        </div>
        <div class="task-line-dotted" style="height: 5.2mm;"></div>
        <div class="task-line-dotted" style="height: 5.2mm;"></div>
      </div>
    </div>

    <!-- Colophon -->
    <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #cbd5e1; padding-top: 3px; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #94a3b8;">
      <span>The History Department &bull; Water &amp; Sanitation (Year 7 V2)</span>
      <span>Page 3 (Facing Spread Right)</span>
    </div>
  </div>
`;

  // ==========================================
  // PAGES 4–15: 6 DOUBLE-PAGE SPREADS
  // ==========================================
  lessons.forEach((lesson, lIdx) => {
    const cfg = lessonConfigs[lIdx];
    const leftPageNum = lIdx * 2 + 4;
    const rightPageNum = lIdx * 2 + 5;

    // ----------------------------------------------------
    // LEFT PAGE (Verso, Even Page Number: 4, 6, 8, 10, 12, 14)
    // ----------------------------------------------------
    html += `
    <div class="page page-container" id="page-${leftPageNum}">
      <div>
        <!-- Lesson Header -->
        <div style="border-bottom: 2px solid #0284c7; padding-bottom: 3px; margin-bottom: 5px; display: flex; justify-content: space-between; align-items: flex-end;">
          <div>
            <div style="font-family: 'Inter', sans-serif; font-size: 7.8pt; text-transform: uppercase; letter-spacing: 1px; color: #64748b; font-weight: 700;">
              Unit 1: Water &amp; Sanitation &bull; Lesson ${lIdx + 1}
            </div>
            <h2 style="font-family: 'Playfair Display', serif; font-size: 13pt; color: #0f172a; margin: 2px 0 0 0; line-height: 1.2;">
              L${lIdx + 1}: ${lesson.title}
            </h2>
          </div>
          <span class="archival-badge" style="background: #f0f9ff; color: #0284c7; border-color: #bae6fd;">
            Evidence &amp; Skills Launch
          </span>
        </div>

        <!-- Learning Objectives -->
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 4px 8px; margin-bottom: 5px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.6pt; text-transform: uppercase; color: #475569; letter-spacing: 0.5px; display: block; margin-bottom: 2px;">
            Core Learning Objectives:
          </strong>
          <ul style="margin: 0; padding-left: 15px; font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #334155; line-height: 1.3;">
    `;
    cfg.objectives.forEach((obj) => {
      html += `<li>${obj}</li>`;
    });
    html += `
          </ul>
        </div>

        <!-- Do Now Recall Strip (5 Questions, Score / 5) -->
        <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 4px 7px; margin-bottom: 5px; background: #ffffff;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px; margin-bottom: 3px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; text-transform: uppercase; letter-spacing: 0.6px; color: #0f172a;">
              Do Now: Prior Knowledge Recall
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 800; color: #0284c7; background: #f0f9ff; border: 1px solid #bae6fd; padding: 1px 7px; border-radius: 3px;">Score: &nbsp; &nbsp; / 5</span>
          </div>
          <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 5px;">
    `;
    cfg.doNow.forEach((item, qIdx) => {
      html += `
            <div style="background: #fafaf9; border: 1px solid #e2e8f0; border-radius: 3px; padding: 3px 4px; display: flex; flex-direction: column; justify-content: space-between;">
              <div style="font-family: 'Inter', sans-serif; font-size: 6.6pt; line-height: 1.2; color: #1e293b; margin-bottom: 2px;">
                <strong style="color: #0284c7;">Q${qIdx + 1}:</strong> ${item.q}
              </div>
              <div>
                <div class="task-line-dotted" style="height: 4.8mm;"></div>
                <div class="task-line-dotted" style="height: 4.8mm;"></div>
              </div>
            </div>
      `;
    });
    html += `
          </div>
        </div>

        <!-- Core Vocabulary Check -->
        <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 4px 7px; margin-bottom: 5px; background: #fdfbf7;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; text-transform: uppercase; color: #0f172a; letter-spacing: 0.5px;">
              Core Vocabulary &amp; Conceptual Precision
            </strong>
          </div>
    `;

    if (cfg.vocabTask.type === 'distinction') {
      html += `
          <div style="font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #334155; margin-bottom: 2px; line-height: 1.25;">
            ${cfg.vocabTask.prompt}
          </div>
          <div class="task-line" style="height: 5.6mm;"></div>
          <div class="task-line" style="height: 5.6mm;"></div>
      `;
    } else if (cfg.vocabTask.type === 'cloze') {
      html += `
          <div style="font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #334155; margin-bottom: 2px;">
            ${cfg.vocabTask.prompt}
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #1e293b; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 3px; padding: 2px 5px; margin-bottom: 2px; line-height: 1.25;">
            ${cfg.vocabTask.clozeText}
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #475569;">
            <strong>Application:</strong> ${cfg.vocabTask.followUp}
          </div>
          <div class="task-line" style="height: 5.4mm;"></div>
          <div class="task-line" style="height: 5.4mm;"></div>
      `;
    } else if (cfg.vocabTask.type === 'golden_sentence') {
      html += `
          <div style="font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #334155; margin-bottom: 2px; line-height: 1.25;">
            ${cfg.vocabTask.prompt}
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.1pt; color: #0284c7; background: #f0f9ff; border: 1px solid #bae6fd; padding: 2px 5px; border-radius: 3px; margin-bottom: 2px;">
            <strong>Word Bank:</strong> ${cfg.vocabTask.wordBank}
          </div>
          <div class="task-line" style="height: 5.6mm;"></div>
          <div class="task-line" style="height: 5.6mm;"></div>
      `;
    }

    html += `
        </div>

        <!-- Task 4: Rich Archival Forensic Interrogation / Bridge Task -->
        <div style="border: 1.5px solid #0f172a; border-radius: 5px; padding: 5px 8px; background: #ffffff;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.2px solid #0f172a; padding-bottom: 2px; margin-bottom: 4px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; color: #0f172a; text-transform: uppercase;">
              ${cfg.bridgeTask.title}
            </strong>
          </div>
    `;

    // Render bespoke Task 4 variants
    if (cfg.bridgeTask.type === 'visual_archaeology') {
      const b64Img = getBase64Image(cfg.bridgeTask.imgSrc);
      html += `
          <div style="display: grid; grid-template-columns: 140px 1fr; gap: 8px; align-items: stretch; border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 4px; background: #fffdfa; margin-bottom: 4px;">
            <div style="border: 1px solid #cbd5e1; border-radius: 3px; overflow: hidden; background: #0f172a; height: 110px;">
              <img src="${b64Img}" style="width: 100%; height: 100%; object-fit: cover; object-position: center; display: block;" alt="Fishbourne Lead Pipes">
            </div>
            <div style="display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 800; color: #0284c7; text-transform: uppercase; margin-bottom: 1px;">
                  ${cfg.bridgeTask.imgCaption}
                </div>
                <p style="font-family: 'Georgia', serif; font-size: 7.6pt; font-style: italic; color: #1e293b; line-height: 1.3; margin: 0;">
                  ${cfg.bridgeTask.sourceText}
                </p>
              </div>
              <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b; border-top: 1px dotted #e2e8f0; padding-top: 2px;">
                <strong>Archival Shelfmark:</strong> ${cfg.bridgeTask.shelfmark}
              </div>
            </div>
          </div>

          <!-- Active Annotation Protocol -->
          <div style="background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 3px; padding: 2px 6px; margin-bottom: 4px;">
            <div style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 800; color: #0284c7; text-transform: uppercase; letter-spacing: 0.5px;">
              ✏️ Active Archaeological Annotation Protocol:
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 4px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #0369a1; line-height: 1.2;">
              <div>${cfg.bridgeTask.annotations[0]}</div>
              <div>${cfg.bridgeTask.annotations[1]}</div>
              <div>${cfg.bridgeTask.annotations[2]}</div>
            </div>
          </div>

          <div style="margin-bottom: 3px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #0f172a;">1. Archaeological Inference:</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #334155;">${cfg.bridgeTask.questionA}</span>
            <div class="task-line" style="height: 5.6mm;"></div>
            <div class="task-line" style="height: 5.6mm;"></div>
            <div class="task-line" style="height: 5.6mm;"></div>
          </div>

          <div style="margin-bottom: 3px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #0f172a;">2. Historical Evidence:</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #334155;">${cfg.bridgeTask.questionB}</span>
            <div class="task-line" style="height: 5.6mm;"></div>
            <div class="task-line" style="height: 5.6mm;"></div>
            <div class="task-line" style="height: 5.6mm;"></div>
          </div>
      `;
    } else if (cfg.bridgeTask.type === 'dual_source_interrogation') {
      html += `
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 4px;">
            <div style="border: 1.2px solid #cbd5e1; border-left: 3px solid #0284c7; background: #f8fafc; padding: 4px 6px; border-radius: 3px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 7pt; color: #0284c7; display: block; margin-bottom: 1px;">${cfg.bridgeTask.sourceATitle}</strong>
              <div style="font-family: 'Georgia', serif; font-size: 7.5pt; font-style: italic; color: #1e293b; line-height: 1.25;">${cfg.bridgeTask.sourceAText}</div>
              <div style="font-family: 'Inter', sans-serif; font-size: 6.4pt; color: #64748b; margin-top: 2px;">${cfg.bridgeTask.sourceAShelfmark}</div>
            </div>

            <div style="border: 1.2px solid #cbd5e1; border-left: 3px solid #10b981; background: #f0fdf4; padding: 4px 6px; border-radius: 3px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 7pt; color: #047857; display: block; margin-bottom: 1px;">${cfg.bridgeTask.sourceBTitle}</strong>
              <div style="font-family: 'Georgia', serif; font-size: 7.5pt; font-style: italic; color: #1e293b; line-height: 1.25;">${cfg.bridgeTask.sourceBText}</div>
              <div style="font-family: 'Inter', sans-serif; font-size: 6.4pt; color: #64748b; margin-top: 2px;">${cfg.bridgeTask.sourceBShelfmark}</div>
            </div>
          </div>

          <!-- Active Annotation Protocol -->
          <div style="background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 3px; padding: 2px 6px; margin-bottom: 4px;">
            <div style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 800; color: #0284c7; text-transform: uppercase; letter-spacing: 0.5px;">
              ✏️ Active Source Annotation Protocol:
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 4px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #0369a1; line-height: 1.2;">
              <div>${cfg.bridgeTask.annotations[0]}</div>
              <div>${cfg.bridgeTask.annotations[1]}</div>
              <div>${cfg.bridgeTask.annotations[2]}</div>
            </div>
          </div>

          <div style="margin-bottom: 3px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #0f172a;">1. Comparative Inference:</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #334155;">${cfg.bridgeTask.questionA}</span>
            <div class="task-line" style="height: 5.6mm;"></div>
            <div class="task-line" style="height: 5.6mm;"></div>
            <div class="task-line" style="height: 5.6mm;"></div>
          </div>

          <div style="margin-bottom: 3px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #0f172a;">2. Civic Enforcement:</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #334155;">${cfg.bridgeTask.questionB}</span>
            <div class="task-line" style="height: 5.6mm;"></div>
            <div class="task-line" style="height: 5.6mm;"></div>
            <div class="task-line" style="height: 5.6mm;"></div>
          </div>
      `;
    } else if (cfg.bridgeTask.type === 'visual_plague') {
      const b64Img = getBase64Image(cfg.bridgeTask.imgSrc);
      html += `
          <div style="display: grid; grid-template-columns: 130px 1fr; gap: 8px; align-items: stretch; border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 4px; background: #fffdfa; margin-bottom: 4px;">
            <div style="border: 1px solid #cbd5e1; border-radius: 3px; overflow: hidden; background: #fafaf9; height: 110px;">
              <img src="${b64Img}" style="width: 100%; height: 100%; object-fit: contain; object-position: center; display: block;" alt="Plague Doctor">
            </div>
            <div style="display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 800; color: #b91c1c; text-transform: uppercase; margin-bottom: 1px;">
                  ${cfg.bridgeTask.imgCaption}
                </div>
                <p style="font-family: 'Georgia', serif; font-size: 7.6pt; font-style: italic; color: #1e293b; line-height: 1.3; margin: 0;">
                  ${cfg.bridgeTask.sourceText}
                </p>
              </div>
              <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b; border-top: 1px dotted #e2e8f0; padding-top: 2px;">
                <strong>Archival Record:</strong> ${cfg.bridgeTask.shelfmark}
              </div>
            </div>
          </div>

          <!-- Active Annotation Protocol -->
          <div style="background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 3px; padding: 2px 6px; margin-bottom: 4px;">
            <div style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 800; color: #0284c7; text-transform: uppercase; letter-spacing: 0.5px;">
              ✏️ Active Source Annotation Protocol:
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 4px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #0369a1; line-height: 1.2;">
              <div>${cfg.bridgeTask.annotations[0]}</div>
              <div>${cfg.bridgeTask.annotations[1]}</div>
              <div>${cfg.bridgeTask.annotations[2]}</div>
            </div>
          </div>

          <div style="margin-bottom: 3px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #0f172a;">1. Quarantine Assessment:</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #334155;">${cfg.bridgeTask.questionA}</span>
            <div class="task-line" style="height: 5.6mm;"></div>
            <div class="task-line" style="height: 5.6mm;"></div>
            <div class="task-line" style="height: 5.6mm;"></div>
          </div>

          <div style="margin-bottom: 3px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #0f172a;">2. Medical Consequences:</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #334155;">${cfg.bridgeTask.questionB}</span>
            <div class="task-line" style="height: 5.6mm;"></div>
            <div class="task-line" style="height: 5.6mm;"></div>
            <div class="task-line" style="height: 5.6mm;"></div>
          </div>
      `;
    } else if (cfg.bridgeTask.type === 'sanitary_table') {
      html += `
          <div style="border: 1.2px solid #cbd5e1; border-left: 4px solid #0284c7; background: #fffdfa; border-radius: 4px; padding: 4px 7px; margin-bottom: 4px;">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 1px; margin-bottom: 2px;">
              <span style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 800; text-transform: uppercase; color: #0284c7;">
                ${cfg.bridgeTask.sourceTitle}
              </span>
              <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; color: #475569; background: #f1f5f9; border: 1px solid #cbd5e1; padding: 1px 5px; border-radius: 3px;">
                ${cfg.bridgeTask.shelfmark}
              </span>
            </div>
            <div style="font-family: 'Georgia', serif; font-size: 7.9pt; font-style: italic; color: #1e293b; line-height: 1.3; margin-bottom: 2px;">
              ${cfg.bridgeTask.sourceText}
            </div>
          </div>

          <!-- Life Expectancy Comparison Table -->
          <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif; font-size: 7.1pt; margin-bottom: 4px; border: 1px solid #cbd5e1;">
            <thead>
              <tr style="background: #f1f5f9; color: #0f172a;">
                ${cfg.bridgeTask.tableHeaders.map((h, hi) => `<th style="padding: 3px 5px; text-align: left; border: 1px solid #cbd5e1; font-size: 7.2pt; width: ${hi === 0 ? '31%' : '23%'};">${h}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${cfg.bridgeTask.tableRows
                .map(
                  (r) => `
                <tr>
                  <td style="padding: 2.5px 5px; font-weight: 700; border: 1px solid #cbd5e1; background: #fafaf9;">${r[0]}</td>
                  <td style="padding: 2.5px 5px; border: 1px solid #cbd5e1;">${r[1]}</td>
                  <td style="padding: 2.5px 5px; border: 1px solid #cbd5e1;">${r[2]}</td>
                  <td style="padding: 2.5px 5px; border: 1px solid #cbd5e1; background: #fef2f2; color: #991b1b; font-weight: 700;">${r[3]}</td>
                </tr>
              `,
                )
                .join('')}
            </tbody>
          </table>

          <div style="margin-bottom: 3px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #0f172a;">1. Statistical Analysis:</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #334155;">${cfg.bridgeTask.questionA}</span>
            <div class="task-line" style="height: 5.6mm;"></div>
            <div class="task-line" style="height: 5.6mm;"></div>
            <div class="task-line" style="height: 5.6mm;"></div>
          </div>

          <div style="margin-bottom: 3px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #0f172a;">2. Sanitary Arithmetic:</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #334155;">${cfg.bridgeTask.questionB}</span>
            <div class="task-line" style="height: 5.6mm;"></div>
            <div class="task-line" style="height: 5.6mm;"></div>
            <div class="task-line" style="height: 5.6mm;"></div>
          </div>
      `;
    } else if (cfg.bridgeTask.type === 'visual_cholera_map') {
      const b64Img = getBase64Image(cfg.bridgeTask.imgSrc);
      html += `
          <div style="display: grid; grid-template-columns: 140px 1fr; gap: 8px; align-items: stretch; border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 4px; background: #fffdfa; margin-bottom: 4px;">
            <div style="border: 1px solid #cbd5e1; border-radius: 3px; overflow: hidden; background: #f8fafc; height: 110px;">
              <img src="${b64Img}" style="width: 100%; height: 100%; object-fit: contain; object-position: center; display: block;" alt="John Snow Spot Map">
            </div>
            <div style="display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 800; color: #0284c7; text-transform: uppercase; margin-bottom: 1px;">
                  ${cfg.bridgeTask.imgCaption}
                </div>
                <p style="font-family: 'Georgia', serif; font-size: 7.6pt; font-style: italic; color: #1e293b; line-height: 1.3; margin: 0;">
                  ${cfg.bridgeTask.sourceText}
                </p>
              </div>
              <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b; border-top: 1px dotted #e2e8f0; padding-top: 2px;">
                <strong>Archival Source:</strong> ${cfg.bridgeTask.shelfmark}
              </div>
            </div>
          </div>

          <!-- Active Annotation Protocol -->
          <div style="background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 3px; padding: 2px 6px; margin-bottom: 4px;">
            <div style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 800; color: #0284c7; text-transform: uppercase; letter-spacing: 0.5px;">
              ✏️ Active Detective Annotation Protocol:
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 4px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #0369a1; line-height: 1.2;">
              <div>${cfg.bridgeTask.annotations[0]}</div>
              <div>${cfg.bridgeTask.annotations[1]}</div>
              <div>${cfg.bridgeTask.annotations[2]}</div>
            </div>
          </div>

          <div style="margin-bottom: 3px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #0f172a;">1. Epidemic Deduction:</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #334155;">${cfg.bridgeTask.questionA}</span>
            <div class="task-line" style="height: 5.6mm;"></div>
            <div class="task-line" style="height: 5.6mm;"></div>
            <div class="task-line" style="height: 5.6mm;"></div>
          </div>

          <div style="margin-bottom: 3px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #0f172a;">2. Medical Resistance:</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #334155;">${cfg.bridgeTask.questionB}</span>
            <div class="task-line" style="height: 5.6mm;"></div>
            <div class="task-line" style="height: 5.6mm;"></div>
            <div class="task-line" style="height: 5.6mm;"></div>
          </div>
      `;
    } else if (cfg.bridgeTask.type === 'visual_bazalgette') {
      const b64Img = getBase64Image(cfg.bridgeTask.imgSrc);
      html += `
          <div style="display: grid; grid-template-columns: 140px 1fr; gap: 8px; align-items: stretch; border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 4px; background: #fffdfa; margin-bottom: 4px;">
            <div style="border: 1px solid #cbd5e1; border-radius: 3px; overflow: hidden; background: #0f172a; height: 110px;">
              <img src="${b64Img}" style="width: 100%; height: 100%; object-fit: cover; object-position: center; display: block;" alt="Bazalgette Sewers">
            </div>
            <div style="display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 800; color: #0284c7; text-transform: uppercase; margin-bottom: 1px;">
                  ${cfg.bridgeTask.imgCaption}
                </div>
                <p style="font-family: 'Georgia', serif; font-size: 7.6pt; font-style: italic; color: #1e293b; line-height: 1.3; margin: 0;">
                  ${cfg.bridgeTask.sourceText}
                </p>
              </div>
              <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b; border-top: 1px dotted #e2e8f0; padding-top: 2px;">
                <strong>Archival Source:</strong> ${cfg.bridgeTask.shelfmark}
              </div>
            </div>
          </div>

          <!-- Active Annotation Protocol -->
          <div style="background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 3px; padding: 2px 6px; margin-bottom: 4px;">
            <div style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 800; color: #0284c7; text-transform: uppercase; letter-spacing: 0.5px;">
              ✏️ Active Engineering Annotation Protocol:
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 4px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #0369a1; line-height: 1.2;">
              <div>${cfg.bridgeTask.annotations[0]}</div>
              <div>${cfg.bridgeTask.annotations[1]}</div>
              <div>${cfg.bridgeTask.annotations[2]}</div>
            </div>
          </div>

          <div style="margin-bottom: 3px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #0f172a;">1. Parliamentary Crisis:</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #334155;">${cfg.bridgeTask.questionA}</span>
            <div class="task-line" style="height: 5.6mm;"></div>
            <div class="task-line" style="height: 5.6mm;"></div>
            <div class="task-line" style="height: 5.6mm;"></div>
          </div>

          <div style="margin-bottom: 3px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #0f172a;">2. Engineering Legacy:</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #334155;">${cfg.bridgeTask.questionB}</span>
            <div class="task-line" style="height: 5.6mm;"></div>
            <div class="task-line" style="height: 5.6mm;"></div>
            <div class="task-line" style="height: 5.6mm;"></div>
          </div>
      `;
    }

    // Clue & Scholar's Edge footer
    html += `
          <div style="border-top: 1px dotted #cbd5e1; padding-top: 2px; margin-top: 3px; display: flex; justify-content: space-between; font-family: 'Georgia', serif; font-size: 7.2pt;">
            <span style="color: #475569;">${cfg.bridgeTask.clue}</span>
            <span style="color: #0284c7; font-weight: bold;">${cfg.bridgeTask.scholarsEdge}</span>
          </div>
        </div>
      </div>

      <!-- Left Page Colophon -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #cbd5e1; padding-top: 3px; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #94a3b8;">
        <span>The History Department &bull; Water &amp; Sanitation (Year 7 V2)</span>
        <span>Page ${leftPageNum} (Facing Spread Left)</span>
      </div>
    </div>
    `;

    // ----------------------------------------------------
    // RIGHT PAGE (Recto, Odd Page Number: 5, 7, 9, 11, 13, 15)
    // ----------------------------------------------------
    html += `
    <div class="page page-container" id="page-${rightPageNum}">
      <div>
        <!-- Enquiry Question Header -->
        <div style="border-bottom: 2px solid #0284c7; padding-bottom: 3px; margin-bottom: 5px; display: flex; justify-content: space-between; align-items: flex-end;">
          <div>
            <div style="font-family: 'Inter', sans-serif; font-size: 7.8pt; text-transform: uppercase; letter-spacing: 1px; color: #0284c7; font-weight: 800;">
              Historical Skill: ${cfg.skill}
            </div>
            <h3 style="font-family: 'Playfair Display', serif; font-size: 12.2pt; color: #0f172a; margin: 2px 0 0 0; line-height: 1.2;">
              ${cfg.enquiryQuestion}
            </h3>
          </div>
          <span class="archival-badge" style="background: #f0f9ff; color: #0284c7; border-color: #bae6fd; flex-shrink: 0;">
            Extended Writing
          </span>
        </div>

        <!-- Bespoke Disciplinary Structure Strip (Active Student Planning Matrix with Dotted Lines) -->
        <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 4px 6px; background: #f8fafc; margin-bottom: 4px;">
          <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-transform: uppercase; color: #0284c7; letter-spacing: 0.5px; margin-bottom: 3px; display: flex; justify-content: space-between;">
            <span>Enquiry Planning Matrix: Map your 3 arguments before writing</span>
            <span style="color: #64748b; font-weight: 600;">Draft bullet points below &darr;</span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 5px;">
            ${cfg.structureStrip
              .map(
                (col) => `
              <div style="border: 1px solid #cbd5e1; border-radius: 3px; padding: 3px 5px; background: #ffffff;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #0284c7; display: block; border-bottom: 1px solid #e2e8f0; padding-bottom: 1px; margin-bottom: 2px;">${col.col}</strong>
                <span style="font-family: 'Inter', sans-serif; font-size: 6.6pt; color: #475569; line-height: 1.2; display: block; margin-bottom: 2px;">${col.prompt}</span>
                <div class="task-line-dotted" style="height: 4.6mm;"></div>
                <div class="task-line-dotted" style="height: 4.6mm;"></div>
                <div class="task-line-dotted" style="height: 4.6mm;"></div>
              </div>
            `,
              )
              .join('')}
          </div>
        </div>

        <!-- Categorized Word Bank & Causal Connectives -->
        <div style="border: 1px solid #cbd5e1; background: #f8fafc; border-radius: 4px; padding: 3px 7px; margin-bottom: 4px; font-family: 'Inter', sans-serif; font-size: 7pt; line-height: 1.3;">
          <div style="display: grid; grid-template-columns: auto 1fr; gap: 6px; align-items: center; margin-bottom: 1px;">
            <strong style="color: #0284c7; text-transform: uppercase; font-size: 6.8pt; letter-spacing: 0.5px;">Technical Bank:</strong>
            <span style="color: #334155;">${cfg.wordBank.technical}</span>
          </div>
          <div style="display: grid; grid-template-columns: auto 1fr; gap: 6px; align-items: center; margin-bottom: 1px;">
            <strong style="color: #0369a1; text-transform: uppercase; font-size: 6.8pt; letter-spacing: 0.5px;">Contextual Bank:</strong>
            <span style="color: #334155;">${cfg.wordBank.geopolitical}</span>
          </div>
          <div style="border-top: 1px dashed #cbd5e1; padding-top: 2px; display: grid; grid-template-columns: auto 1fr; gap: 6px; align-items: center;">
            <strong style="color: #b91c1c; text-transform: uppercase; font-size: 6.8pt; letter-spacing: 0.5px;">Causal Stems:</strong>
            <span style="color: #475569; font-style: italic;">${cfg.wordBank.connectives}</span>
          </div>
        </div>

        <!-- Disciplinary Writing Framework Strip (PEEL) -->
        <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 3px; padding: 2px 7px; margin-bottom: 4px; display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #1e293b;">
          <span><strong style="color: #0284c7;">[P] Point:</strong> Clear claim answering the question.</span>
          <span><strong style="color: #0284c7;">[E] Evidence:</strong> Specific names, dates &amp; sources.</span>
          <span><strong style="color: #0284c7;">[E] Explanation:</strong> Causal mechanism explained.</span>
          <span><strong style="color: #0284c7;">[L] Link:</strong> Evaluate overall historical weight.</span>
        </div>

        <!-- Ruled Writing Lines (Precisely 13 lines at 7.2mm filling the page) -->
        <div class="auto-fill-writing-lines" data-line-height="7.2">
          ${Array(13).fill('<div class="task-line" style="height: 7.2mm;"></div>').join('')}
        </div>
      </div>

      <!-- Teacher Assessment & DIRT Footer -->
      <div style="margin-top: 4px;">
        <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 4px 8px; background: #f8fafc; margin-bottom: 3px;">
          <div style="display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 7.5pt;">
            <span><strong style="color: #0f172a;">Mark:</strong> &nbsp; &nbsp; &nbsp; &nbsp; / 16</span>
            <span><strong style="color: #0f172a;">DOK Level:</strong> [ 1 &bull; 2 &bull; 3 &bull; 4 ]</span>
            <span><strong style="color: #0f172a;">Fingertip Vocab Used:</strong> [ Y &bull; N ]</span>
            <span style="font-weight: 700; color: #0284c7; text-transform: uppercase;">Teacher Assessment &bull; DIRT Target</span>
          </div>
          <div style="display: flex; align-items: center; margin-top: 3px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #334155; margin-right: 6px; white-space: nowrap;">DIRT Target:</strong>
            <div style="flex: 1; border-bottom: 1.2px dotted #94a3b8; height: 12px;"></div>
          </div>
        </div>

        <!-- Colophon -->
        <div style="display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #94a3b8;">
          <span>Water &amp; Sanitation Through Time &bull; Extended Writing Spread</span>
          <span>Page ${rightPageNum} (Facing Spread Right)</span>
        </div>
      </div>
    </div>
    `;
  });

  // ==========================================
  // PAGE 16: MASTER REVIEW & ASSESSMENT HUB
  // ==========================================
  html += `
  <div class="page page-container" id="page-16" style="justify-content: space-between;">
    <div>
      <!-- Header -->
      <div style="border-bottom: 2px solid #0284c7; padding-bottom: 3px; margin-bottom: 6px; display: flex; justify-content: space-between; align-items: flex-end;">
        <div>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.8pt; text-transform: uppercase; letter-spacing: 1px; color: #64748b; font-weight: 700;">
            The History Department &bull; Assessment &amp; Revision Synthesis
          </div>
          <h2 style="font-family: 'Playfair Display', serif; font-size: 14pt; color: #0f172a; margin: 2px 0 0 0; text-transform: uppercase; letter-spacing: 0.5px;">
            Water &amp; Sanitation (c.43 AD–Present) &bull; Master Review
          </h2>
        </div>
        <span class="archival-badge" style="background: #f0f9ff; color: #0284c7; border-color: #bae6fd;">
          Unit Revision Hub
        </span>
      </div>

      <!-- 4 Eras Matrix -->
      <div style="border: 1.2px solid #0f172a; border-radius: 5px; padding: 6px 9px; background: #f8fafc; margin-bottom: 6px;">
        <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #0f172a; text-transform: uppercase; display: block; margin-bottom: 4px;">
          The 4 Key Eras of British Water &amp; Sanitation:
        </strong>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px;">
          <div style="border: 1px solid #cbd5e1; border-left: 3px solid #0284c7; padding: 3px 6px; background: #ffffff; border-radius: 3px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #0284c7;">1. ROMAN BRITAIN (c.43–410 AD)</strong>
            <p style="font-family: 'Georgia', serif; font-size: 7.4pt; color: #334155; margin: 2px 0 0 0; line-height: 1.25;">
              Stone aqueducts, communal thermae, lead pipes (Fishbourne), and gravity flushing. Brilliant engineering, but lacked germ theory and collapsed after AD 410.
            </p>
          </div>
          <div style="border: 1px solid #cbd5e1; border-left: 3px solid #0284c7; padding: 3px 6px; background: #ffffff; border-radius: 3px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #0284c7;">2. MEDIEVAL TOWNS &amp; MONASTERIES (1100–1500)</strong>
            <p style="font-family: 'Georgia', serif; font-size: 7.4pt; color: #334155; margin: 2px 0 0 0; line-height: 1.25;">
              Towns were choked with cesspits, dung heaps, and gong farmers. In sharp contrast, wealthy monasteries built piped water, settling tanks, and latrines.
            </p>
          </div>
          <div style="border: 1px solid #cbd5e1; border-left: 3px solid #0284c7; padding: 3px 6px; background: #ffffff; border-radius: 3px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #0284c7;">3. EARLY MODERN EXPANSION (1500–1750)</strong>
            <p style="font-family: 'Georgia', serif; font-size: 7.4pt; color: #334155; margin: 2px 0 0 0; line-height: 1.25;">
              Harington invented the flushing toilet (1596), but without running water pipes, town squalor worsened. The 1665 Plague proved miasma theory remained dominant.
            </p>
          </div>
          <div style="border: 1px solid #cbd5e1; border-left: 3px solid #0284c7; padding: 3px 6px; background: #ffffff; border-radius: 3px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #0284c7;">4. INDUSTRIAL REVOLUTION &amp; MODERN NHS (1750–PRESENT)</strong>
            <p style="font-family: 'Georgia', serif; font-size: 7.4pt; color: #334155; margin: 2px 0 0 0; line-height: 1.25;">
              Cholera epidemics forced Chadwick’s 1842 Report, Snow’s pump removal (1854), Bazalgette’s sewers (1858), and the compulsory 1875 Public Health Act.
            </p>
          </div>
        </div>
      </div>

      <!-- The Three Factors of Change -->
      <div style="border: 1.2px solid #cbd5e1; border-radius: 5px; padding: 6px 9px; background: #ffffff; margin-bottom: 6px;">
        <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #0f172a; text-transform: uppercase; display: block; margin-bottom: 3px;">
          The Three Factors of Change: Which Mattered Most?
        </strong>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px;">
          <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #334155; line-height: 1.25;">
            <strong style="color: #0284c7;">1. Science &amp; Medicine:</strong> Snow mapping cholera (1854), Pasteur’s Germ Theory (1861), and Koch’s cholera bacterium (1883) disproved miasma and enabled chlorination.
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #334155; line-height: 1.25;">
            <strong style="color: #047857;">2. Engineering:</strong> Roman aqueducts, Canterbury settling tanks, and Bazalgette’s 82 miles of sewers physically separated human waste from drinking water.
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #334155; line-height: 1.25;">
            <strong style="color: #b91c1c;">3. Government Power:</strong> Parliament ending laissez-faire with the compulsory 1875 Public Health Act forced councils to tax ratepayers to connect every home.
          </div>
        </div>
      </div>

      <!-- Chronological Mastery Challenge (Matching Grid) -->
      <div style="border: 1.2px solid #cbd5e1; border-radius: 5px; padding: 5px 9px; background: #fdfbf7; margin-bottom: 6px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #0f172a; text-transform: uppercase;">
            Chronological Mastery Challenge &bull; Match Milestone to Year:
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7pt; color: #64748b;">Draw connecting lines</span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px; font-family: 'Inter', sans-serif; font-size: 7.1pt;">
          <div style="background: #ffffff; border: 1px solid #e2e8f0; padding: 3px 5px; border-radius: 3px;"><strong>[ &nbsp; ] c.75 AD:</strong> Lead pipes installed at Fishbourne</div>
          <div style="background: #ffffff; border: 1px solid #e2e8f0; padding: 3px 5px; border-radius: 3px;"><strong>[ &nbsp; ] 1165:</strong> Canterbury monks build settling tanks</div>
          <div style="background: #ffffff; border: 1px solid #e2e8f0; padding: 3px 5px; border-radius: 3px;"><strong>[ &nbsp; ] 1348:</strong> Black Death kills one-third of Britain</div>
          <div style="background: #ffffff; border: 1px solid #e2e8f0; padding: 3px 5px; border-radius: 3px;"><strong>[ &nbsp; ] 1596:</strong> Harington invents the flushing toilet</div>
          <div style="background: #ffffff; border: 1px solid #e2e8f0; padding: 3px 5px; border-radius: 3px;"><strong>[ &nbsp; ] 1842:</strong> Chadwick publishes Sanitary Report</div>
          <div style="background: #ffffff; border: 1px solid #e2e8f0; padding: 3px 5px; border-radius: 3px;"><strong>[ &nbsp; ] 1854:</strong> Snow removes Broad Street pump handle</div>
          <div style="background: #ffffff; border: 1px solid #e2e8f0; padding: 3px 5px; border-radius: 3px;"><strong>[ &nbsp; ] 1858:</strong> Great Stink forces funding for sewers</div>
          <div style="background: #ffffff; border: 1px solid #e2e8f0; padding: 3px 5px; border-radius: 3px;"><strong>[ &nbsp; ] 1875:</strong> Public Health Act makes clean water a law</div>
        </div>
      </div>

      <!-- Pupil Assessment & DIRT Progress Ledger -->
      <div style="border: 1px solid #cbd5e1; border-radius: 4px; padding: 5px 9px; background: #ffffff; margin-bottom: 6px;">
        <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #0f172a; text-transform: uppercase; display: block; margin-bottom: 3px;">
          Pupil Assessment &amp; DIRT Progress Ledger
        </strong>
        <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif; font-size: 7.1pt; border: 1px solid #cbd5e1;">
          <thead>
            <tr style="background: #f1f5f9; color: #0f172a;">
              <th style="padding: 2.5px 5px; border: 1px solid #cbd5e1; text-align: left;">Lesson Enquiry</th>
              <th style="padding: 2.5px 5px; border: 1px solid #cbd5e1; text-align: center; width: 65px;">Do Now (/5)</th>
              <th style="padding: 2.5px 5px; border: 1px solid #cbd5e1; text-align: center; width: 65px;">Essay (/16)</th>
              <th style="padding: 2.5px 5px; border: 1px solid #cbd5e1; text-align: center; width: 85px;">DIRT Complete</th>
              <th style="padding: 2.5px 5px; border: 1px solid #cbd5e1; text-align: left;">Teacher Signature</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1;">L1: Roman Britain &amp; Fishbourne Palace</td><td style="border: 1px solid #cbd5e1;"></td><td style="border: 1px solid #cbd5e1;"></td><td style="border: 1px solid #cbd5e1; text-align: center;">[ &nbsp; ]</td><td style="border: 1px solid #cbd5e1;"></td></tr>
            <tr><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1;">L2: Medieval Towns &amp; Monasteries</td><td style="border: 1px solid #cbd5e1;"></td><td style="border: 1px solid #cbd5e1;"></td><td style="border: 1px solid #cbd5e1; text-align: center;">[ &nbsp; ]</td><td style="border: 1px solid #cbd5e1;"></td></tr>
            <tr><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1;">L3: Early Modern Filth &amp; 1665 Plague</td><td style="border: 1px solid #cbd5e1;"></td><td style="border: 1px solid #cbd5e1;"></td><td style="border: 1px solid #cbd5e1; text-align: center;">[ &nbsp; ]</td><td style="border: 1px solid #cbd5e1;"></td></tr>
            <tr><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1;">L4: Industrial Towns &amp; Chadwick (1842)</td><td style="border: 1px solid #cbd5e1;"></td><td style="border: 1px solid #cbd5e1;"></td><td style="border: 1px solid #cbd5e1; text-align: center;">[ &nbsp; ]</td><td style="border: 1px solid #cbd5e1;"></td></tr>
            <tr><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1;">L5: John Snow &amp; The Broad Street Pump</td><td style="border: 1px solid #cbd5e1;"></td><td style="border: 1px solid #cbd5e1;"></td><td style="border: 1px solid #cbd5e1; text-align: center;">[ &nbsp; ]</td><td style="border: 1px solid #cbd5e1;"></td></tr>
            <tr><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1;">L6: The Great Stink &amp; Bazalgette’s Sewers</td><td style="border: 1px solid #cbd5e1;"></td><td style="border: 1px solid #cbd5e1;"></td><td style="border: 1px solid #cbd5e1; text-align: center;">[ &nbsp; ]</td><td style="border: 1px solid #cbd5e1;"></td></tr>
          </tbody>
        </table>
      </div>

      <!-- Synoptic Final Verdict Planning Strip -->
      <div style="border: 1.2px solid #0284c7; border-radius: 4px; padding: 4px 8px; background: #f0f9ff;">
        <strong style="font-family: 'Inter', sans-serif; font-size: 7.6pt; text-transform: uppercase; color: #0284c7; letter-spacing: 0.5px; display: block; margin-bottom: 2px;">
          Synoptic Master Enquiry Verdict: "Which factor was most decisive in conquering water-borne disease?"
        </strong>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #334155; margin-bottom: 2px;">
          Draft your final verdict weighing science (Snow/Pasteur) vs mega-engineering (Bazalgette) vs compulsory laws (1875 Act):
        </div>
        <div class="task-line-dotted" style="height: 4.8mm;"></div>
        <div class="task-line-dotted" style="height: 4.8mm;"></div>
      </div>
    </div>

    <!-- Final Institutional Signoff -->
    <div style="border-top: 1px solid #cbd5e1; padding-top: 4px; text-align: center; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #64748b;">
      <span>The History Revision Hub &bull; Year 7 Master Curriculum Series &bull; Staged 4-Act V2 Edition</span>
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

  // Write staged HTML file
  const outHtmlPath = path.join(
    ROOT_DIR,
    'public',
    'units',
    'water_and_sanitation',
    'pupil_workbook_v2.html',
  );
  fs.writeFileSync(outHtmlPath, html, 'utf8');
  console.log(`✅ Staged HTML generated at: ${outHtmlPath}`);

  // Compile PDF via Puppeteer
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
    margin: { top: '10mm', bottom: '12mm', left: '12mm', right: '12mm' },
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
  buildWaterAndSanitationTwoPageWorkbookHtml,
  renderWaterAndSanitationTwoPageWorkbook,
  lessonConfigs,
};
