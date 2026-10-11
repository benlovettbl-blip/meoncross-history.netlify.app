const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');
const puppeteer = require('puppeteer');

const ROOT_DIR = path.resolve(__dirname, '..');

function getBase64Image(relPath) {
  if (!relPath) return null;
  const clean = relPath.replace(/^\//, '');
  const candidates = [
    path.join(ROOT_DIR, 'public', clean),
    path.join(ROOT_DIR, clean),
    path.join(ROOT_DIR, 'public', 'images', path.basename(clean)),
    path.join(ROOT_DIR, 'images', path.basename(clean)),
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

// ============================================================================
// 5 Dedicated Medieval England Enquiry Configurations
// Gold-Standard Christine Counsell 5-Act Decimal Standard
// ============================================================================
const enquiryConfigs = [
  {
    lessonNum: 1,
    id: 'lesson_1',
    title: 'Enquiry 1: 1066 & The Battle of Hastings',
    enquiryQuestion: 'Why did William of Normandy win the Battle of Hastings in 1066?',
    specAnchor:
      'Death of Edward the Confessor; three rivals for the crown; Battle of Stamford Bridge; Anglo-Saxon shield wall on Senlac Hill; Norman combined-arms & feigned retreat.',
    stages: [
      {
        step: 1,
        date: 'Jan 1066',
        questionHeading: 'Why did the death of Edward the Confessor trigger a succession crisis?',
        bullets: ['Confessor Dies', 'No Direct Heir', 'Witan Backs Harold'],
        focusClue:
          'How did Edward’s childless death leave the English throne vulnerable to foreign invasion?',
      },
      {
        step: 2,
        date: '1066',
        questionHeading: 'Who were the three rival claimants contending for the English crown?',
        bullets: ['Harold Godwinson', 'Harald Hardrada', 'William of Normandy'],
        focusClue:
          'Why did Harold Godwinson, Harald Hardrada, and William of Normandy each claim legitimate right to the throne?',
      },
      {
        step: 3,
        date: 'Sept 1066',
        questionHeading:
          'How did the Battle of Stamford Bridge exhaust King Harold’s northern forces?',
        bullets: ['Viking Invasion', 'Stamford Bridge', '200-Mile March South'],
        focusClue:
          'Why did marching 200 miles to defeat the Vikings leave Harold’s army dangerously weakened for Hastings?',
      },
      {
        step: 4,
        date: '14 Oct 1066',
        questionHeading:
          'How did the Anglo-Saxon shield wall withstand repeated Norman charges on Senlac Hill?',
        bullets: ['Senlac Hill Ridge', 'Impenetrable Wall', 'Housecarl Battleaxes'],
        focusClue:
          'Why was the Saxon shield wall atop Senlac Hill almost impossible for Norman cavalry and archers to break?',
      },
      {
        step: 5,
        date: 'Oct 1066',
        questionHeading:
          'How did the feigned retreat tactic break the shield wall and secure Norman victory?',
        bullets: ['Feigned Retreat', 'Saxons Break Ranks', 'Harold Slain'],
        focusClue:
          'Did Duke William plan the retreat, or did he brilliantly exploit the undisciplined Saxon pursuit?',
      },
    ],
    vocabPrompt:
      'Define <strong>The Feigned Retreat</strong> and explain why it was the decisive tactical turning point at Hastings:',
    rightPage: {
      type: 'single_12',
      tariff: 'Question 2: Explain Why [12 marks &bull; 15 mins]',
      examStem:
        'Explain why William of Normandy achieved victory at the Battle of Hastings in 1066. [12 marks]',
      stimulus: [
        'Norman military tactics, heavy cavalry, and the feigned retreat',
        'Anglo-Saxon exhaustion and loss of shield-wall discipline',
      ],
      connectives:
        'A primary cause of William’s victory was... &bull; Most decisively, the Norman tactic of the feigned retreat... &bull; Furthermore, King Harold’s Saxon army was critically weakened by... &bull; This exhaustion meant that when the shield wall broke... &bull; On balance, while Harold fought bravely, William’s victory was secured by...',
      wordBank:
        'Senlac Hill &bull; shield wall &bull; feigned retreat &bull; heavy cavalry &bull; housecarls &bull; Harold Godwinson &bull; Stamford Bridge &bull; Duke William &bull; Norman archers',
      timelineMissionTitle: 'Centrefold Sketch Challenges 1 &amp; 2',
      timelineMission:
        '<strong>Milestone 1 (The Senlac Shield Wall &bull; 1066):</strong> Sketch Anglo-Saxon housecarls with interlocking round shields and two-handed battleaxes resisting charging Norman knights [🛡️ round wooden shield &bull; 🪓 Danish battleaxe &bull; 🐎 charging Norman warhorse].<br style="display:block; margin-top:2px;"><strong>Milestone 2 (The Feigned Retreat &bull; 1066):</strong> Sketch Norman cavalry pretending to flee downhill while undisciplined Saxon fyrdmen break ranks to pursue [🐎 retreating knight &bull; 🏹 Norman archer &bull; 👑 fallen banner].',
    },
    leftPageQuip:
      'King Harold marched his army 200 miles north to beat the Vikings, then 200 miles back south in 14 days before fighting Hastings.',
    rightPageQuip:
      'William had to lift off his helmet during the battle to prove he was still alive after rumours spread that he had been slain.',
  },
  {
    lessonNum: 2,
    id: 'lesson_2',
    title: 'Enquiry 2: Castles, Terror & Domesday',
    enquiryQuestion: 'How did the Normans subjugate England and enforce total royal control?',
    specAnchor:
      '10,000 Normans ruling 2 million Saxons; motte-and-bailey blitz; Harrying of the North (1069–70); feudal hierarchy; Domesday Book (1086); Portchester Castle keep & local hundred entries.',
    stages: [
      {
        step: 1,
        date: '1066–1068',
        questionHeading:
          'How did the motte-and-bailey blitz allow 10,000 Normans to dominate 2 million Saxons?',
        bullets: ['Earthwork Mottes', 'Pre-Cut Timber', '500 Castles in 20 Yrs'],
        focusClue:
          'Why were motte-and-bailey castles the ultimate instrument of rapid military psychological shock and awe?',
      },
      {
        step: 2,
        date: '1069–1070',
        questionHeading: 'Why did William unleash the brutal scorched-earth Harrying of the North?',
        bullets: ['Northern Rebellion', 'Salted Fields & Crops', '100,000 Starved'],
        focusClue:
          'Why did Anglo-Norman chronicler Orderic Vitalis condemn William’s brutal devastation of Yorkshire?',
      },
      {
        step: 3,
        date: '1070–1100',
        questionHeading:
          'How did massive stone keeps like Portchester Castle project permanent imperial permanence?',
        bullets: ['Roman Shore Fort', 'Norman Stone Keep', 'Solent Deep Water'],
        focusClue:
          'Why did William build Portchester Castle’s stone keep directly inside an ancient Roman shore fort?',
      },
      {
        step: 4,
        date: '1085–1086',
        questionHeading:
          'Why did William commission the exhaustive Domesday Book audit at Gloucester?',
        bullets: ['Gloucester Deep Speech', 'Every Ox & Mill', 'Feudal Tax Extraction'],
        focusClue:
          'Why did Anglo-Saxons name it Domesday, believing its royal verdicts were as inescapable as the Day of Judgement?',
      },
      {
        step: 5,
        date: '1086',
        questionHeading:
          'What does the local Domesday hundred reveal about Anglo-Saxon land dispossession?',
        bullets: ['Portchester & Fareham', 'Saxon Thegns Displaced', 'Norman Tenants-in-Chief'],
        focusClue:
          'How did local manorial surveys record the total replacement of English landholders by Norman barons?',
      },
    ],
    vocabPrompt:
      'Define <strong>Subjugation</strong> and explain how the combination of castles and the Domesday audit secured Norman rule:',
    rightPage: {
      type: 'split',
      partA: {
        tariff: 'Question 1: Describe Two Features [4 marks &bull; 5 mins]',
        badge: 'FEATURE DRILL',
        question: 'Describe two features of Norman motte-and-bailey castles. [4 marks]',
        stems:
          'Feature 1: One key feature was... &bull; Detail: Specifically, this was constructed by... &bull; Feature 2: A second key feature was... &bull; Detail: This served the military purpose of...',
      },
      partB: {
        tariff: 'Question 2: Explain One Consequence [4 marks &bull; 5 mins]',
        badge: 'STRUCTURED WRITING',
        question:
          'Explain one consequence of the motte-and-bailey blitz for Anglo-Saxon resistance against Norman rule. [4 marks]',
        hint: 'Focus on how fortified castles allowed small Norman garrisons to dominate thousands of hostile Saxons and suppress regional revolts.',
        stems:
          'One consequence was that... &bull; Specifically, this meant that... &bull; This affected Anglo-Saxon resistance because... &bull; As a result, Norman control...',
        connectives:
          'A significant consequence was... &bull; For instance, the building of castles... &bull; This directly led to... &bull; Consequently, the impact on resistance was...',
        wordBank:
          'motte-and-bailey &bull; garrison &bull; timber palisade &bull; intimidation &bull; Harrying of the North &bull; Portchester Castle &bull; Domesday Book',
      },
      timelineMissionTitle: 'Centrefold Sketch Challenge 3',
      timelineMission:
        '<strong>Milestone 3 (The Domesday Audit &amp; Portchester Keep &bull; 1086):</strong> Sketch royal commissioners cataloguing oxen and land into the leather-bound Domesday Book before the towering stone keep of Portchester Castle [🏰 stone Norman keep &bull; 📖 open Domesday ledger &bull; 🐂 yoked farm ox].',
    },
    leftPageQuip:
      'Anglo-Saxons called it the "Domesday Book" because you could no more appeal William’s tax survey than escape the Last Judgement.',
    rightPageQuip:
      'Portchester Castle’s Norman keep was built inside 1,700-year-old Roman fortress walls that guarded the Solent sea approaches.',
  },
  {
    lessonNum: 3,
    id: 'lesson_3',
    title: 'Enquiry 3: Crown vs Church: Henry II & Thomas Becket',
    enquiryQuestion: 'Why did Henry II clash with Thomas Becket, and who triumphed?',
    specAnchor:
      'Royal Chancellor to Archbishop of Canterbury; Constitutions of Clarendon (1164); criminous clerks & canon law; 1170 murder in Canterbury Cathedral; Henry’s barefoot penance.',
    stages: [
      {
        step: 1,
        date: '1154–1162',
        questionHeading:
          'Why did Henry II appoint his worldly drinking companion Becket as Archbishop?',
        bullets: ['King’s Chancellor', 'Lavish Courtier', 'Crown Control of Church'],
        focusClue:
          'Why did Henry expect Becket to be a pliant puppet who would bring the wealthy English Church under royal control?',
      },
      {
        step: 2,
        date: '1162',
        questionHeading: 'How did Becket’s sudden spiritual transformation shock King Henry?',
        bullets: ['Resigns Chancellorship', 'Hairshirt & Fasting', 'Sole Loyalty to Christ'],
        focusClue:
          'Why did Becket instantly discard his silk robes and declare that his absolute allegiance belonged to God alone?',
      },
      {
        step: 3,
        date: '1164',
        questionHeading:
          'Why did the Constitutions of Clarendon and ‘criminous clerks’ provoke an open rift?',
        bullets: ['Benefit of Clergy', 'Clarendon Decrees', 'Secular vs Canon Courts'],
        focusClue:
          'Why did Henry insist that priests who committed murder must be punished by royal judges rather than church courts?',
      },
      {
        step: 4,
        date: '29 Dec 1170',
        questionHeading: 'How did royal rage culminate in brutal murder in Canterbury Cathedral?',
        bullets: ['‘Turbulent Priest!’', 'Four Armed Knights', 'Sword Blows at Altar'],
        focusClue:
          'Did Henry II order Becket’s murder, or did his barons interpret a king’s reckless temper as a royal execution order?',
      },
      {
        step: 5,
        date: '1170–1174',
        questionHeading:
          'Why was Henry II forced to perform barefoot public penance at Canterbury?',
        bullets: ['European Outrage', 'Becket Canonised Saint', 'Barefoot Scourging'],
        focusClue:
          'How did Becket’s martyrdom transform him into a saint and force Henry to abandon his claims over canon law?',
      },
    ],
    vocabPrompt:
      'Define <strong>Benefit of Clergy</strong> and explain why Henry II believed it threatened royal justice:',
    rightPage: {
      type: 'interpretations',
      tariff: 'Question 3(b) & 3(c): Contrasting Interpretations [8 marks &bull; 10 mins]',
      interpretation1: {
        author: 'Edward Grim, Eyewitness Monk &amp; Chronicler, Life of St Thomas (c. 1175)',
        text: '“The glorious martyr Thomas stood like a rock before the altar, refusing to yield the sacred liberties of Christ’s holy Church to earthly tyrants. He offered his neck to the wicked swords of the four knights, dying willingly so that God’s law might triumph over royal pride.”',
      },
      interpretation2: {
        author: 'Historian Frank Barlow, Thomas Becket (1986)',
        text: '“Becket was vain, stubborn, and obsessively confrontational. Having served Henry faithfully as chancellor, his dramatic conversion into an unbending champion of clerical privilege was theatrical extremism. By shielding rapists and murderers in holy orders from secular law, Becket provoked a needless crisis.”',
      },
      questionB:
        'Explain how Interpretations 1 and 2 differ on Thomas Becket’s motives and character. [4 marks]',
      stemsB:
        'Interpretations 1 and 2 differ on... &bull; Interpretation 1 portrays Becket as... &bull; In contrast, Interpretation 2 argues that he was...',
      questionC:
        'Suggest one reason why Interpretations 1 and 2 differ on Becket’s clash with King Henry II. [4 marks]',
      stemsC:
        'One reason why Interpretations 1 and 2 differ is because of the authors’ backgrounds and purposes... &bull; Specifically, the author of Interpretation 1 was... whereas the author of Interpretation 2 is... &bull; As a result, their emphasis differs because...',
      timelineMissionTitle: 'Centrefold Sketch Challenge 4',
      timelineMission:
        '<strong>Milestone 4 (The Murder in Canterbury Cathedral &bull; 1170):</strong> Sketch Archbishop Thomas Becket standing defiant before the cathedral altar while four Norman knights draw their swords in the shadows [⛪ cathedral arch &bull; 🗡️ four knights’ swords &bull; ✝️ altar cross].',
    },
    leftPageQuip:
      'Henry II was so furious with Becket that he reportedly shouted: ‘Will no one rid me of this turbulent priest?’ Four knights took him literally.',
    rightPageQuip:
      'To escape excommunication, King Henry II walked barefoot through Canterbury in sackcloth and allowed eighty monks to flog him with rods.',
  },
  {
    lessonNum: 4,
    id: 'lesson_4',
    title: 'Enquiry 4: Magna Carta (1215) & Medieval Kingship',
    enquiryQuestion:
      'Was Magna Carta a foundation of human liberty or a selfish barons’ power grab?',
    specAnchor:
      'King John; loss of Normandy (1204); scutage extortion; clash with Pope Innocent III; disaster of Bouvines (1214); Runnymede (1215); Clause 39 & rule of law; papal annulment.',
    stages: [
      {
        step: 1,
        date: '1199–1204',
        questionHeading:
          'Why did the loss of Normandy earn King John the mocking nickname ‘Softsword’?',
        bullets: ['Loss of Normandy', '‘John Lackland’', 'Desperate for Revenue'],
        focusClue:
          'Why did losing ancestral duchies in France make King John obsessed with wringing money from English barons?',
      },
      {
        step: 2,
        date: '1205–1213',
        questionHeading:
          'How did scutage tax extortion and the papal interdict alienate the realm?',
        bullets: ['11 Scutages in 16 Yrs', 'Papal Interdict', 'Church Bells Silenced'],
        focusClue:
          'Why did levying exorbitant shield money on barons who didn’t want to fight in France push the aristocracy to rebellion?',
      },
      {
        step: 3,
        date: '1214',
        questionHeading:
          'How did the catastrophic defeat at the Battle of Bouvines shatter John’s authority?',
        bullets: ['Battle of Bouvines', '£135,000 Wasted', 'Barons Refuse Taxes'],
        focusClue:
          'Why did the total destruction of John’s French coalition leave him bankrupt, discredited, and defenceless at home?',
      },
      {
        step: 4,
        date: '15 June 1215',
        questionHeading:
          'What revolutionary legal principle was enshrined in Clause 39 at Runnymede?',
        bullets: ['Meadow of Runnymede', 'Great Charter Sealed', 'Clause 39: Lawful Trial'],
        focusClue:
          'How did declaring that "no free man shall be imprisoned except by lawful judgment of peers" invent the Rule of Law?',
      },
      {
        step: 5,
        date: '1215–1216',
        questionHeading:
          'Why did the First Barons’ War erupt immediately after the charter was sealed?',
        bullets: ['Pope Annuls Charter', 'Civil War & French Invade', 'John Dies at Newark'],
        focusClue:
          'Why did John instantly convince the Pope to annul Magna Carta as a shameful agreement extracted by force?',
      },
    ],
    vocabPrompt:
      'Define <strong>The Rule of Law</strong> and explain how Clause 39 of Magna Carta restricted arbitrary royal power:',
    rightPage: {
      type: 'equal_split',
      partA: {
        tariff: 'Question 2: Narrative Account [8 marks &bull; 10 mins]',
        badge: 'PART A &bull; NARRATIVE',
        question:
          'Write a narrative account analysing the key events leading from the loss of Normandy (1204) to the sealing of Magna Carta (1215). [8 marks]',
        stimulus: [
          'The loss of Normandy and heavy scutage taxation',
          'The defeat at the Battle of Bouvines (1214)',
        ],
        connectives:
          'The sequence began in 1204 when... &bull; This led to increasing conflict because... &bull; A decisive turning point occurred when... &bull; This directly caused... &bull; Consequently, this culminated in...',
        wordBank:
          'Normandy &bull; scutage &bull; Pope Innocent III &bull; Battle of Bouvines (1214) &bull; Runnymede &bull; Clause 39 &bull; Magna Carta &bull; Robert Fitzwalter',
      },
      partB: {
        tariff: 'Question 3: Explain Importance [8 marks &bull; 10 mins]',
        badge: 'PART B &bull; IMPORTANCE',
        question:
          'Explain the importance of Clause 39 of Magna Carta for the development of the English legal system. [8 marks]',
        connectives:
          'Clause 39 was of vital importance because... &bull; Prior to 1215, royal authority had been... &bull; As a result of Clause 39, legal rights were... &bull; Consequently, the long-term impact on the legal system was...',
        wordBank:
          'Clause 39 &bull; arbitrary power &bull; lawful judgment of peers &bull; due process &bull; trial by jury &bull; rule of law',
      },
      timelineMissionTitle: 'Centrefold Sketch Challenges 5 &amp; 6',
      timelineMission:
        '<strong>Milestone 5 (Runnymede &amp; The Great Charter &bull; 1215):</strong> Sketch King John seated reluctantly in a pavilion beside the River Thames pressing his Great Seal onto the parchment of Magna Carta [⛺ royal pavilion &bull; 📜 wax-sealed charter &bull; 🛡️ rebel baron banner].<br style="display:block; margin-top:2px;"><strong>Milestone 6 (Simon de Montfort’s Parliament &bull; 1265):</strong> Sketch knights from the shires and burgesses from the towns gathering for the first representative English Parliament [🏛️ Parliament hall &bull; 📜 writ of summons &bull; 👥 knights and townsmen].',
    },
    leftPageQuip:
      'King John did not sign Magna Carta with a pen; he affixed his royal wax seal because medieval kings rarely signed documents.',
    rightPageQuip:
      'Magna Carta originally applied only to "free men"—which in 1215 meant wealthy barons and churchmen, excluding 80% of peasants who were serfs.',
  },
  {
    lessonNum: 5,
    id: 'lesson_5',
    title: 'Enquiry 5: The Black Death (1348) & The Peasants’ Revolt (1381)',
    enquiryQuestion:
      'How did demographic catastrophe and peasant rebellion shatter the feudal order?',
    specAnchor:
      'Yersinia pestis; 1348 arrival in Melcombe Regis; 35–50% population mortality; labour shortage; 1351 Statute of Labourers; sumptuary laws; 1381 Poll Tax; Wat Tyler & John Ball; Smithfield confrontation; collapse of serfdom.',
    stages: [
      {
        step: 1,
        date: '1348–1349',
        questionHeading: 'How did the Black Death wipe out nearly half the population of England?',
        bullets: ['Yersinia Pestis', 'Fleas on Black Rats', '35–50% Dead in 18 Mos'],
        focusClue:
          'Why were medieval doctors completely helpless against bubonic and pneumonic plague, blaming foul mists (miasma)?',
      },
      {
        step: 2,
        date: '1349–1351',
        questionHeading:
          'Why did demographic collapse trigger an unprecedented economic power shift?',
        bullets: ['Labour Shortage', 'Crops Rot in Fields', 'Peasants Demand Wages'],
        focusClue:
          'How did the sudden shortage of farm labourers allow serfs to demand double wages or leave their manors?',
      },
      {
        step: 3,
        date: '1351–1377',
        questionHeading:
          'How did the Statute of Labourers and sumptuary laws provoke bitter class resentment?',
        bullets: ['Statute of Labourers', 'Wages Frozen to 1346', 'Branded with "F"'],
        focusClue:
          'Why did the ruling class try to use statutory laws and dress restrictions to force peasants back into feudal submission?',
      },
      {
        step: 4,
        date: '1377–1381',
        questionHeading:
          'Why did the regressive Poll Taxes of 1377–1381 spark armed peasant uprising?',
        bullets: ['Hundred Years’ War Debt', 'Three Hated Poll Taxes', 'Every Adult Pays 12d'],
        focusClue:
          'Why did making a starving farm labourer pay the exact same tax as an earl spark furious tax resistance in Essex and Kent?',
      },
      {
        step: 5,
        date: 'June 1381',
        questionHeading:
          'How did the showdown at Smithfield shatter the myth of unquestioned feudal authority?',
        bullets: ['Wat Tyler & John Ball', 'March on London', 'Richard II Promises'],
        focusClue:
          'How did preacher John Ball’s sermon—"When Adam delved and Eve span, who was then the gentleman?"—undermine feudal hierarchy?',
      },
    ],
    vocabPrompt:
      'Define <strong>The Statute of Labourers (1351)</strong> and explain how it attempted to halt the economic rise of English peasants:',
    rightPage: {
      type: 'single_12',
      tariff: 'Question 5: Evaluative Statement Essay [12 marks &bull; 15 mins]',
      examStem:
        '‘The Black Death of 1348 was the main cause of the breakdown of the feudal system in medieval England.’ How far do you agree? [12 marks]',
      stimulus: [
        'The demographic collapse and labour shortage caused by the Black Death (1348–1350)',
        'The 1351 Statute of Labourers and the Peasants’ Revolt of 1381',
      ],
      structureStrip: [
        {
          col: '1. PLAGUE & ECONOMIC LEVERAGE',
          text: 'Explain how the death of up to 50% of the population created a desperate shortage of agricultural labour, forcing lords to pay wages.',
        },
        {
          col: '2. REPRESSION & SOCIAL REBELLION',
          text: 'Explain how parliamentary laws (Statute of Labourers) and poll taxes failed to stop peasant mobility, culminating in the 1381 Revolt.',
        },
        {
          col: '3. COMPARATIVE VERDICT',
          text: 'Weigh whether biological demographic collapse or political peasant resistance ultimately dealt the fatal blow to feudal serfdom.',
        },
      ],
      connectives:
        'To some extent I agree that the Black Death of 1348 was the main cause of the breakdown of the feudal system in medieval England because... &bull; On the other hand, it can also be argued that feudalism collapsed because of... &bull; Furthermore, long-term social changes such as... &bull; In conclusion, the most significant factor in the breakdown of the feudal system was... because...',
      wordBank:
        'Black Death (1348) &bull; Yersinia pestis &bull; labour shortage &bull; Statute of Labourers (1351) &bull; sumptuary laws &bull; Poll Tax &bull; Wat Tyler &bull; John Ball &bull; serfdom / villeinage',
      timelineMissionTitle: 'Centrefold Sketch Challenges 7 &amp; 8',
      timelineMission:
        '<strong>Milestone 7 (The Black Death &amp; Village Desolation &bull; 1348):</strong> Sketch a medieval village with black plague crosses painted on cottage doors and peasants fleeing pestilence [💀 plague skull &bull; 🚪 barred door with red/black cross &bull; 🌾 overgrown untilled field].<br style="display:block; margin-top:2px;"><strong>Milestone 8 (Wat Tyler at Smithfield &bull; 1381):</strong> Sketch 14-year-old King Richard II on horseback facing the rebel banner of Wat Tyler and the Kentish peasants outside London’s city gates [🐎 young King Richard II &bull; 🚩 peasant pitchfork &amp; banner &bull; 🗡️ Lord Mayor Walworth’s blade].',
    },
    leftPageQuip:
      'Preacher John Ball asked: ‘When Adam delved and Eve span, who was then the gentleman?’—arguing God never created masters and serfs.',
    rightPageQuip:
      '14-year-old Richard II told the fleeing peasants: ‘I am your captain, follow me!’—before executing their leaders once the danger passed.',
  },
];

// ============================================================================
// HELPER RENDERERS
// ============================================================================
function renderNotesPage(pageNum, quip) {
  const isEven = pageNum % 2 === 0;
  const pageClass = isEven ? 'verso-page' : 'recto-page';
  const ruledRows = Array(26)
    .fill(
      '<div class="lined-row"><div class="lined-margin-cell"></div><div class="lined-content-cell"></div></div>',
    )
    .join('');

  return `
  <!-- PAGE ${pageNum}: DEDICATED LINED NOTES PAGE -->
  <div class="page page-container ${pageClass}" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div style="border-bottom: 2px solid #0f284e; padding-bottom: 3px; margin-bottom: 4px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <h2 style="margin: 0; font-family: 'Playfair Display', serif; font-size: 11pt; color: #0f284e; font-weight: 900;">
            ${pageNum === 14 ? 'Medieval England: Historical Enquiry &amp; Causal Synthesis Notes' : 'Medieval England: Disciplinary Extended Writing &amp; Essay Planning'}
          </h2>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; background: #0f284e; color: #ffffff; padding: 1.5px 6px; border-radius: 2px; text-transform: uppercase;">
            ${pageNum === 14 ? 'KNOWLEDGE REPERTOIRE' : 'DISCIPLINARY WRITING'}
          </span>
        </div>
      </div>

      <div style="border: 1px solid #0f284e; border-radius: 3px; background: #f0f4f9; padding: 2.5px 6px; margin-bottom: 3px; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #1e293b;">
        <strong style="color: #0f284e;">Scholar Note-Taking Protocol:</strong> Record key causal factors, primary source evidence, historiographical debates, and structured essay plans in this ruled portfolio.
      </div>

      <div class="lined-page-grid">
        ${ruledRows}
      </div>

      ${renderFooterStrip(pageNum, quip, 16)}
    </div>
  </div>`;
}

function renderFooterStrip(pageNum, quip, totalPages = 16) {
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

// ============================================================================
// LEFT PAGE RENDERER: 5-STAGE CHRONOLOGICAL INQUIRY SPINE
// ============================================================================
function renderSpinePage(cfg, pageNum) {
  const stagesHtml = cfg.stages
    .map((st) => {
      const bulletsHtml = st.bullets
        .map(
          (b, idx) => `
            <div style="flex: 1; display: flex; align-items: center; padding: 0 2.5px; ${idx < 2 ? 'border-bottom: 0.8px solid #cbd5e1;' : ''}">
              <div style="display: flex; align-items: flex-start; gap: 2.5px; line-height: 1.15;">
                <span style="font-weight: 900; color: #0f284e; font-size: 5pt; line-height: 1.3;">&bull;</span>
                <span style="font-family: 'Inter', sans-serif; font-size: 6.4pt; font-weight: 700; color: #0f284e; word-break: break-word;">${b}</span>
              </div>
            </div>`,
        )
        .join('');
      return `
        <div class="spine-stage-block" style="display: flex; flex-direction: column; flex: 1; min-height: 0; margin-bottom: 2.5px; border: 1.2px solid #0f284e; border-radius: 2px; overflow: hidden; background: #ffffff;">
          
          <!-- Full-Width Banner with Key Question Across Page -->
          <div class="stage-banner" style="background: #0f284e; color: #ffffff; padding: 2px 7px; display: flex; align-items: center; border-bottom: 1.2px solid #0f284e;">
            <div style="display: flex; align-items: center; gap: 6px; min-width: 0; flex: 1;">
              <span style="background: #ffffff; color: #0f284e; font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; padding: 0.5px 5.5px; border-radius: 2px; white-space: nowrap;">
                ${st.step}
              </span>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 800; color: #93c5fd; white-space: nowrap;">
                ${st.date}
              </span>
              <span style="color: #60a5fa; font-size: 7pt;">&bull;</span>
              <span style="font-family: 'Playfair Display', serif; font-size: 8.8pt; font-weight: 800; color: #ffffff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                ${st.questionHeading}
              </span>
            </div>
          </div>

          <!-- Content Row: Left 3-Zone Trigger Spine (25mm) & Right Ruled Writing Lines (~173mm) -->
          <div style="display: flex; flex: 1; min-height: 0; align-items: stretch;">
            
            <div style="width: 25mm; flex-shrink: 0; background: #f0f4f9; display: flex; flex-direction: column; border-right: 1.2px solid #0f284e; box-sizing: border-box;">
              ${bulletsHtml}
            </div>

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

  const isEven = pageNum % 2 === 0;
  const pageClass = isEven ? 'verso-page' : 'recto-page';

  return `
  <!-- LESSON SPREAD: ${isEven ? 'LEFT PAGE (VERSO)' : 'RIGHT PAGE (RECTO)'} • CHRONOLOGICAL INQUIRY SPINE -->
  <div class="page page-container ${pageClass}" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      
      <!-- Lesson Header with Inquiry Question Title -->
      <div style="border-bottom: 2px solid #0f284e; padding-bottom: 2px; margin-bottom: 2px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; letter-spacing: 0.5px; text-transform: uppercase; background: #0f284e; color: #ffffff; border: 1.2px solid #0f284e; padding: 1px 6px; border-radius: 2px;">
            ENQUIRY ${cfg.lessonNum} &bull; LESSON NOTEBOOK
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-transform: uppercase; color: #0f284e;">
            YEAR 7 &bull; MEDIEVAL ENGLAND: 1066–1485
          </span>
        </div>
        <h2 style="font-family: 'Playfair Display', serif; font-size: 11pt; color: #0f284e; margin: 1px 0 1px 0; font-weight: 900; line-height: 1.18;">
          ${cfg.enquiryQuestion}
        </h2>
      </div>

      <!-- Specification Focus Strip -->
      <div style="border: 1px solid #0f284e; border-left: 3.5px solid #0f284e; padding: 2px 6px; background: #f0f4f9; margin-bottom: 2px; font-family: 'Inter', sans-serif; font-size: 7.4pt; line-height: 1.2; color: #1e293b;">
        <strong style="color: #0f284e;">Core Specification Focus:</strong> ${cfg.specAnchor}
      </div>

      <!-- Chronological Inquiry Spine & Note-Taking Canvas -->
      <div style="flex: 1; display: flex; flex-direction: column; min-height: 0; margin-top: 1px;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid #0f284e; padding: 1px 0; margin-bottom: 2px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; color: #0f284e;">
            Chronological Inquiry Spine &bull; Core Causal Narrative
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-style: italic; color: #475569;">
            Construct your causal explanation for each stage incorporating the core trigger terms
          </span>
        </div>

        <div style="display: flex; flex-direction: column; flex: 1; min-height: 0; gap: 0;">
          ${stagesHtml}
        </div>
      </div>

      ${renderFooterStrip(pageNum, cfg.leftPageQuip, 16)}
    </div>
  </div>`;
}

// ============================================================================
// RIGHT PAGE RENDERER: ROTATING DISCIPLINARY SKILLS WRITING
// ============================================================================
function renderRightPage(cfg, pageNum) {
  const rp = cfg.rightPage;
  const isEven = pageNum % 2 === 0;
  const pageClass = isEven ? 'verso-page' : 'recto-page';

  if (rp.type === 'single_12') {
    // 12-MARK CAUSAL / EVALUATIVE ESSAY WRITING
    return `
  <!-- LESSON SPREAD: ${isEven ? 'LEFT PAGE (VERSO)' : 'RIGHT PAGE (RECTO)'} • 12-MARK EXTENDED ESSAY -->
  <div class="page page-container ${pageClass}" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Exam Header -->
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #0f284e; padding-bottom: 3px; margin-bottom: 5px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 11pt; color: #0f284e; margin: 0; font-weight: 800;">
          ${rp.tariff}
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; background: #0f284e; color: #ffffff; padding: 1.5px 6px; border-radius: 2px;">
          Extended Writing Practice
        </span>
      </div>

      <!-- Question Stem & Stimulus Box -->
      <div style="border: 1px solid #0f284e; border-left: 3.5px solid #0f284e; border-radius: 3px; padding: 5px 8px; background: #f0f4f9; margin-bottom: 5px;">
        <div style="font-family: 'Playfair Display', serif; font-size: 8.8pt; font-weight: 800; color: #0f284e; margin-bottom: 3px; line-height: 1.25;">
          ${rp.examStem}
        </div>
        <div style="display: flex; align-items: center; gap: 8px; font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #1e293b;">
          <strong style="color: #0f284e;">Stimulus:</strong>
          <span style="border: 1px solid #0f284e; padding: 1px 6px; border-radius: 2px; font-weight: 700; color: #0f284e; background: #ffffff;">${rp.stimulus[0]}</span>
          <span style="border: 1px solid #0f284e; padding: 1px 6px; border-radius: 2px; font-weight: 700; color: #0f284e; background: #ffffff;">${rp.stimulus[1]}</span>
          <span style="font-style: italic; color: #475569;">(You must also use information of your own)</span>
        </div>
      </div>

      <!-- Connectives & Key Vocabulary Bank -->
      <div style="border: 1px solid #0f284e; border-radius: 3px; padding: 5px 8px; background: #ffffff; margin-bottom: 6px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
        <div>
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase; display: block; margin-bottom: 2px; color: #0f284e;">Analytical Connectives:</strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-style: italic; line-height: 1.22; display: block; color: #1e293b;">${rp.connectives}</span>
        </div>
        <div>
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase; display: block; margin-bottom: 2px; color: #0f284e;">Key Vocabulary Bank:</strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; line-height: 1.22; display: block; color: #1e293b;">${rp.wordBank}</span>
        </div>
      </div>

      <!-- Ruled Task Lines for Extended Writing -->
      <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-style: italic; color: #222222; margin-bottom: 2px;">
        <strong style="color: #0f284e;">Task:</strong> Using the vocabulary and connectives above, write your analytical response below:
      </div>
      <div style="display: flex; flex-direction: column; gap: 0; margin-bottom: 4px; flex: 1; min-height: 0;">
        ${Array(25).fill('<div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>').join('')}
      </div>

      <!-- Timeline Mission Box -->
      <div style="border: 1.2px solid #0f284e; border-radius: 4px; padding: 3px 6px; background: #ffffff; margin-top: 2px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px; border-bottom: 1px solid #0f284e; padding-bottom: 1.5px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 6.9pt; font-weight: 900; background: #0f284e; color: #ffffff; padding: 1.5px 5px; border-radius: 2px; text-transform: uppercase; letter-spacing: 0.3px;">
            🎨 ${rp.timelineMissionTitle || 'Timeline Mission'}
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; color: #0f284e;">
            Turn to Centrefold &bull; Pages 8–9 &rarr;
          </span>
        </div>
        <div style="font-family: 'Georgia', serif; font-size: 6.9pt; color: #111111; line-height: 1.22;">
          ${rp.timelineMission}
        </div>
      </div>

      ${renderFooterStrip(pageNum, cfg.rightPageQuip, 16)}
    </div>
  </div>`;
  } else if (rp.type === 'interpretations') {
    // DUAL HISTORIOGRAPHICAL INTERPRETATIONS WRITING
    const stemsB = rp.stemsB || (rp.stems ? rp.stems.split(' &bull; One reason')[0] : '');
    const stemsC =
      rp.stemsC ||
      (rp.stems ? 'One reason' + rp.stems.split(' &bull; One reason')[1] : rp.stems || '');

    return `
  <!-- LESSON SPREAD: ${isEven ? 'LEFT PAGE (VERSO)' : 'RIGHT PAGE (RECTO)'} • CONTRASTING INTERPRETATIONS -->
  <div class="page page-container ${pageClass}" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Exam Header -->
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #0f284e; padding-bottom: 3px; margin-bottom: 4px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 10.5pt; color: #0f284e; margin: 0; font-weight: 800;">
          ${rp.tariff}
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; background: #0f284e; color: #ffffff; padding: 1.5px 6px; border-radius: 2px;">
          HISTORIOGRAPHICAL ANALYSIS
        </span>
      </div>

      <!-- Competing Historical Interpretations Box -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 4px;">
        <div style="border: 1.2px solid #0f284e; border-radius: 3px; padding: 4px 6px; background: #fdfbf7;">
          <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; color: #0f284e; text-transform: uppercase; border-bottom: 1px solid #cbd5e1; padding-bottom: 1.5px; margin-bottom: 2px;">
            Interpretation 1 &bull; ${rp.interpretation1.author}
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 6.9pt; font-style: italic; color: #1e293b; line-height: 1.22;">
            ${rp.interpretation1.text}
          </div>
        </div>
        <div style="border: 1.2px solid #0f284e; border-radius: 3px; padding: 4px 6px; background: #f0f4f9;">
          <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; color: #0f284e; text-transform: uppercase; border-bottom: 1px solid #cbd5e1; padding-bottom: 1.5px; margin-bottom: 2px;">
            Interpretation 2 &bull; ${rp.interpretation2.author}
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 6.9pt; font-style: italic; color: #1e293b; line-height: 1.22;">
            ${rp.interpretation2.text}
          </div>
        </div>
      </div>

      <!-- Task B: Question 3(b) -->
      <div style="border-bottom: 1.5px solid #0f284e; padding-bottom: 3px; margin-bottom: 4px; flex: 1.15; display: flex; flex-direction: column; min-height: 0;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
          <div style="font-family: 'Playfair Display', serif; font-size: 8.2pt; font-weight: 800; color: #0f284e;">
            ${rp.questionB}
          </div>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; background: #0f284e; color: #ffffff; padding: 1px 5px; border-radius: 2px; text-transform: uppercase;">
            PART B
          </span>
        </div>
        ${stemsB ? `<div style="border: 1px solid #0f284e; border-radius: 3px; padding: 2.5px 6px; background: #f0f4f9; font-family: 'Inter', sans-serif; font-size: 6.7pt; line-height: 1.22; margin-bottom: 3px;"><strong style="color: #0f284e;">Sentence Stems:</strong> <span style="color: #1e293b;">${stemsB}</span></div>` : ''}
        <div style="display: flex; flex-direction: column; gap: 0; flex: 1; min-height: 0;">
          ${Array(14).fill('<div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>').join('')}
        </div>
      </div>

      <!-- Task C: Question 3(c) -->
      <div style="flex: 1.15; display: flex; flex-direction: column; justify-content: space-between; min-height: 0;">
        <div style="display: flex; flex-direction: column; flex: 1; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
            <div style="font-family: 'Playfair Display', serif; font-size: 8.2pt; font-weight: 800; color: #0f284e;">
              ${rp.questionC}
            </div>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; background: #0f284e; color: #ffffff; padding: 1px 5px; border-radius: 2px; text-transform: uppercase;">
              PART C
            </span>
          </div>
          ${stemsC ? `<div style="border: 1px solid #0f284e; border-radius: 3px; padding: 2.5px 6px; background: #f0f4f9; font-family: 'Inter', sans-serif; font-size: 6.7pt; line-height: 1.22; margin-bottom: 3px;"><strong style="color: #0f284e;">Scaffolded Sentence Stems:</strong> <span style="color: #1e293b;">${stemsC}</span></div>` : ''}
          <div style="display: flex; flex-direction: column; gap: 0; flex: 1; min-height: 0; margin-bottom: 3px;">
            ${Array(12).fill('<div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>').join('')}
          </div>
        </div>

        <!-- Timeline Mission Box -->
        <div style="border: 1.2px solid #0f284e; border-radius: 4px; padding: 3px 6px; background: #ffffff; margin-top: 2px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px; border-bottom: 1px solid #0f284e; padding-bottom: 1.5px;">
            <span style="font-family: 'Inter', sans-serif; font-size: 6.9pt; font-weight: 900; background: #0f284e; color: #ffffff; padding: 1.5px 5px; border-radius: 2px; text-transform: uppercase; letter-spacing: 0.3px;">
              🎨 ${rp.timelineMissionTitle || 'Timeline Mission'}
            </span>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; color: #0f284e;">
              Turn to Centrefold &bull; Pages 8–9 &rarr;
            </span>
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 6.9pt; color: #111111; line-height: 1.22;">
            ${rp.timelineMission}
          </div>
        </div>
      </div>

      ${renderFooterStrip(pageNum, cfg.rightPageQuip, 16)}
    </div>
  </div>`;
  } else if (
    rp.type === 'equal_split' ||
    (rp.partA &&
      rp.partA.tariff &&
      rp.partA.tariff.includes('8 marks') &&
      rp.partB &&
      rp.partB.tariff &&
      rp.partB.tariff.includes('8 marks'))
  ) {
    // EQUAL-SPLIT ROTATING SKILLS WRITING (E.G. TWO 8-MARK QUESTIONS WITH EQUAL LINES)
    const partA = rp.partA || {};
    const partB = rp.partB || {};

    return `
  <!-- LESSON SPREAD: ${isEven ? 'LEFT PAGE (VERSO)' : 'RIGHT PAGE (RECTO)'} • EQUAL SPLIT WRITING [8 MARKS + 8 MARKS] -->
  <div class="page page-container ${pageClass}" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      
      <!-- PART A: QUESTION 2 NARRATIVE ACCOUNT [8 MARKS] -->
      <div style="border-bottom: 1.5px solid #0f284e; padding-bottom: 3px; margin-bottom: 4px; flex: 1; display: flex; flex-direction: column; min-height: 0;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
          <h2 style="font-family: 'Playfair Display', serif; font-size: 9.6pt; color: #0f284e; margin: 0; font-weight: 800;">
            ${partA.tariff || 'Question 1: Structured Writing [8 marks]'}
          </h2>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; background: #0f284e; color: #ffffff; padding: 1px 5px; border-radius: 2px; text-transform: uppercase;">
            ${partA.badge || 'PART A &bull; NARRATIVE'}
          </span>
        </div>
        <p style="font-family: 'Playfair Display', serif; font-size: 8.2pt; font-weight: 800; color: #0f284e; margin: 0 0 2px 0; line-height: 1.22;">
          ${partA.question || ''}
        </p>
        ${
          partA.stimulus
            ? `
        <div style="display: flex; align-items: center; gap: 6px; font-family: 'Inter', sans-serif; font-size: 7.0pt; color: #1e293b; margin-bottom: 2.5px;">
          <strong style="color: #0f284e;">Stimulus:</strong>
          <span style="border: 1px solid #0f284e; padding: 0.5px 5px; border-radius: 2px; font-weight: 700; color: #0f284e; background: #f0f4f9;">${partA.stimulus[0]}</span>
          <span style="border: 1px solid #0f284e; padding: 0.5px 5px; border-radius: 2px; font-weight: 700; color: #0f284e; background: #f0f4f9;">${partA.stimulus[1]}</span>
        </div>`
            : ''
        }
        ${
          partA.connectives || partA.wordBank || partA.stems
            ? `
        <div style="border: 1px solid #0f284e; border-radius: 3px; padding: 2.5px 6px; background: #f0f4f9; margin-bottom: 3px; font-family: 'Inter', sans-serif; font-size: 6.7pt; line-height: 1.22;">
          ${partA.connectives ? `<div><strong style="color: #0f284e;">Analytical Connectives:</strong> <em style="color: #1e293b;">${partA.connectives}</em></div>` : ''}
          ${partA.stems ? `<div><strong style="color: #0f284e;">Sentence Stems:</strong> <span style="color: #1e293b;">${partA.stems}</span></div>` : ''}
          ${partA.wordBank ? `<div style="margin-top: 1.5px;"><strong style="color: #0f284e;">Key Terms:</strong> <span style="color: #1e293b;">${partA.wordBank}</span></div>` : ''}
        </div>`
            : ''
        }
        <div style="display: flex; flex-direction: column; gap: 0; flex: 1; min-height: 0;">
          ${Array(14).fill('<div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>').join('')}
        </div>
      </div>

      <!-- PART B: QUESTION 3 EXPLAIN IMPORTANCE [8 MARKS] -->
      <div style="flex: 1.1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0;">
        <div style="display: flex; flex-direction: column; flex: 1; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
            <h2 style="font-family: 'Playfair Display', serif; font-size: 9.6pt; color: #0f284e; margin: 0; font-weight: 800;">
              ${partB.tariff || 'Question 2: Structured Writing [8 marks]'}
            </h2>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; background: #0f284e; color: #ffffff; padding: 1px 5px; border-radius: 2px; text-transform: uppercase;">
              ${partB.badge || 'PART B &bull; IMPORTANCE'}
            </span>
          </div>
          <p style="font-family: 'Playfair Display', serif; font-size: 8.2pt; font-weight: 800; color: #0f284e; margin: 0 0 2px 0; line-height: 1.22;">
            ${partB.question || ''}
          </p>
          ${
            partB.stimulus
              ? `
          <div style="display: flex; align-items: center; gap: 6px; font-family: 'Inter', sans-serif; font-size: 7.0pt; color: #1e293b; margin-bottom: 2.5px;">
            <strong style="color: #0f284e;">Stimulus:</strong>
            <span style="border: 1px solid #0f284e; padding: 0.5px 5px; border-radius: 2px; font-weight: 700; color: #0f284e; background: #f0f4f9;">${partB.stimulus[0]}</span>
            <span style="border: 1px solid #0f284e; padding: 0.5px 5px; border-radius: 2px; font-weight: 700; color: #0f284e; background: #f0f4f9;">${partB.stimulus[1]}</span>
          </div>`
              : ''
          }
          ${
            partB.connectives || partB.wordBank || partB.stems
              ? `
          <div style="border: 1px solid #0f284e; border-radius: 3px; padding: 2.5px 6px; background: #f0f4f9; margin-bottom: 3px; font-family: 'Inter', sans-serif; font-size: 6.7pt; line-height: 1.22;">
            ${partB.connectives ? `<div><strong style="color: #0f284e;">Analytical Connectives:</strong> <em style="color: #1e293b;">${partB.connectives}</em></div>` : ''}
            ${partB.stems ? `<div><strong style="color: #0f284e;">Sentence Stems:</strong> <span style="color: #1e293b;">${partB.stems}</span></div>` : ''}
            ${partB.wordBank ? `<div style="margin-top: 1.5px;"><strong style="color: #0f284e;">Key Terms:</strong> <span style="color: #1e293b;">${partB.wordBank}</span></div>` : ''}
          </div>`
              : ''
          }
          <div style="display: flex; flex-direction: column; gap: 0; flex: 1; min-height: 0; margin-bottom: 3px;">
            ${Array(14).fill('<div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>').join('')}
          </div>
        </div>

        <!-- Timeline Mission Box -->
        <div style="border: 1.2px solid #0f284e; border-radius: 4px; padding: 3px 6px; background: #ffffff; margin-top: 2px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px; border-bottom: 1px solid #0f284e; padding-bottom: 1.5px;">
            <span style="font-family: 'Inter', sans-serif; font-size: 6.9pt; font-weight: 900; background: #0f284e; color: #ffffff; padding: 1.5px 5px; border-radius: 2px; text-transform: uppercase; letter-spacing: 0.3px;">
              🎨 ${rp.timelineMissionTitle || 'Timeline Mission'}
            </span>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; color: #0f284e;">
              Turn to Centrefold &bull; Pages 8–9 &rarr;
            </span>
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 6.9pt; color: #111111; line-height: 1.22;">
            ${rp.timelineMission}
          </div>
        </div>
      </div>

      ${renderFooterStrip(pageNum, cfg.rightPageQuip, 16)}
    </div>
  </div>`;
  } else {
    // TWO-PART ROTATING SKILLS WRITING (SPLIT: PART A + PART B)
    const partA = rp.partA || {};
    const partB = rp.partB || {};

    return `
  <!-- LESSON SPREAD: ${isEven ? 'LEFT PAGE (VERSO)' : 'RIGHT PAGE (RECTO)'} • ROTATING DISCIPLINARY SKILLS -->
  <div class="page page-container ${pageClass}" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      
      <!-- PART A: SHORT-FORM DISCIPLINARY PRACTICE [4 OR 8 MARKS] -->
      <div style="border-bottom: 1.5px solid #0f284e; padding-bottom: 4px; margin-bottom: 5px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 3px;">
          <h2 style="font-family: 'Playfair Display', serif; font-size: 10pt; color: #0f284e; margin: 0; font-weight: 800;">
            ${partA.tariff || 'Question 1: Disciplinary Drill'}
          </h2>
          <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 800; background: #0f284e; color: #ffffff; border: 1px solid #0f284e; padding: 1px 5px; border-radius: 2px; text-transform: uppercase;">
            DISCIPLINARY DRILL
          </span>
        </div>
        <p style="font-family: 'Playfair Display', serif; font-size: 8.2pt; font-weight: 800; color: #0f284e; margin: 0 0 2px 0;">
          ${partA.question || ''}
        </p>
        ${partA.hint ? `<div style="font-family: 'Inter', sans-serif; font-size: 7pt; font-style: italic; color: #475569; margin-bottom: 2px;">${partA.hint}</div>` : ''}
        ${partA.stems ? `<div style="font-family: 'Inter', sans-serif; font-size: 7.1pt; font-weight: 700; margin-bottom: 2px; color: #1e293b;"><strong style="color: #0f284e;">Sentence Stems:</strong> ${partA.stems}</div>` : ''}
        ${partA.connectives ? `<div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; line-height: 1.22; background: #f0f4f9; padding: 2px 5px; border-radius: 2px; margin-bottom: 2px;"><strong style="color: #0f284e;">Connectives:</strong> ${partA.connectives}</div>` : ''}
        <div class="ruled-lines-block">
          <div class="task-line"></div>
          <div class="task-line"></div>
          <div class="task-line"></div>
          <div class="task-line"></div>
        </div>
      </div>

      <!-- PART B: EXTENDED SKILL WRITING [4, 8 OR 12 MARKS] -->
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0;">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1.5px solid #0f284e; padding-bottom: 2px; margin-bottom: 3px;">
            <h2 style="font-family: 'Playfair Display', serif; font-size: 10pt; color: #0f284e; margin: 0; font-weight: 800;">
              ${partB.tariff || 'Question 2: Structured Writing'}
            </h2>
            <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 800; background: #0f284e; color: #ffffff; padding: 1px 5px; border-radius: 2px; text-transform: uppercase;">
              STRUCTURED WRITING
            </span>
          </div>
          <p style="font-family: 'Playfair Display', serif; font-size: 8.4pt; font-weight: 800; color: #0f284e; margin: 0 0 3px 0; line-height: 1.25;">
            ${partB.question || ''}
          </p>
          ${partB.hint ? `<div style="font-family: 'Inter', sans-serif; font-size: 7pt; font-style: italic; color: #475569; margin-bottom: 2px;">${partB.hint}</div>` : ''}
          ${
            partB.stimulus
              ? `
          <div style="display: flex; align-items: center; gap: 6px; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #1e293b; margin-bottom: 3px;">
            <strong style="color: #0f284e;">Stimulus:</strong>
            <span style="border: 1px solid #0f284e; padding: 0.5px 5px; border-radius: 2px; font-weight: 700; color: #0f284e; background: #f0f4f9;">${partB.stimulus[0]}</span>
            <span style="border: 1px solid #0f284e; padding: 0.5px 5px; border-radius: 2px; font-weight: 700; color: #0f284e; background: #f0f4f9;">${partB.stimulus[1]}</span>
          </div>`
              : ''
          }

          <!-- Connectives & Word Bank -->
          ${
            partB.connectives || partB.stems || partB.wordBank
              ? `
          <div style="border: 1px solid #0f284e; border-radius: 3px; padding: 4px 7px; background: #f0f4f9; margin-bottom: 4px; font-family: 'Inter', sans-serif; font-size: 6.8pt; line-height: 1.24;">
            ${partB.connectives ? `<div><strong style="color: #0f284e;">Analytical Connectives:</strong> <em style="color: #1e293b;">${partB.connectives}</em></div>` : ''}
            ${partB.stems ? `<div><strong style="color: #0f284e;">Sentence Stems:</strong> <span style="color: #1e293b;">${partB.stems}</span></div>` : ''}
            ${partB.wordBank ? `<div style="margin-top: 2px;"><strong style="color: #0f284e;">Key Terms:</strong> <span style="color: #1e293b;">${partB.wordBank}</span></div>` : ''}
          </div>`
              : ''
          }
        </div>

        <!-- Ruled Writing Lines (18 Lines • Matching GCSE 7.8mm pitch) -->
        <div style="display: flex; flex-direction: column; gap: 0; margin-bottom: 4px; flex: 1; min-height: 0;">
          ${Array(18).fill('<div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>').join('')}
        </div>

        <!-- Timeline Mission Box -->
        <div style="border: 1.2px solid #0f284e; border-radius: 4px; padding: 3px 6px; background: #ffffff; margin-top: 2px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px; border-bottom: 1px solid #0f284e; padding-bottom: 1.5px;">
            <span style="font-family: 'Inter', sans-serif; font-size: 6.9pt; font-weight: 900; background: #0f284e; color: #ffffff; padding: 1.5px 5px; border-radius: 2px; text-transform: uppercase; letter-spacing: 0.3px;">
              🎨 ${rp.timelineMissionTitle || 'Timeline Mission'}
            </span>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; color: #0f284e;">
              Turn to Centrefold &bull; Pages 8–9 &rarr;
            </span>
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 6.9pt; color: #111111; line-height: 1.22;">
            ${rp.timelineMission}
          </div>
        </div>
      </div>

      ${renderFooterStrip(pageNum, cfg.rightPageQuip, 16)}
    </div>
  </div>`;
  }
}

// ============================================================================
// MAIN COMPILATION FUNCTION
// ============================================================================
function compileMedievalWorkbook() {
  const coverImgBase64 =
    getBase64Image('images/battle_of_hastings_bayeux.jpg') ||
    getBase64Image('public/images/battle_of_hastings_bayeux.jpg') ||
    '';

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Medieval England (1066–1485) Pupil Workbook</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,600;0,6..72,700;1,6..72,400&family=Georgia:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
  <style>
    *, *:before, *:after { box-sizing: border-box; }
    @page {
      size: A4 portrait;
      margin: 10mm 10mm 12mm 10mm;
    }
    body {
      font-family: 'Georgia', serif;
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
      padding: 4mm 6mm;
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
      height: 100%;
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
    .ruled-lines-block {
      display: flex;
      flex-direction: column;
      gap: 0;
      margin: 1px 0;
    }
    .lined-page-grid {
      display: flex;
      flex-direction: column;
      flex: 1;
      margin: 2px 0 3px 0;
      border-top: 1.2px solid #000000;
    }
    .lined-row {
      display: flex;
      flex: 1;
      min-height: 0;
      border-bottom: 1.2px solid #000000;
      box-sizing: border-box;
    }
    .lined-margin-cell {
      width: 18mm;
      border-right: 1.2px solid #000000;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      padding-left: 1mm;
      padding-right: 0.5mm;
      box-sizing: border-box;
    }
    .lined-content-cell {
      flex: 1;
      display: flex;
      align-items: center;
      padding-left: 6px;
      box-sizing: border-box;
    }
    .page-footer-strip {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 0.8px solid #0f284e;
      padding-top: 1.5px;
      margin-top: 2px;
      font-family: 'Inter', sans-serif;
      font-size: 6.2pt;
      line-height: 1.15;
      color: #000000;
    }
    .footer-quip {
      font-style: italic;
      color: #475569;
      white-space: nowrap;
    }
    .footer-page-num {
      font-family: 'Inter', sans-serif;
      font-weight: 800;
      white-space: nowrap;
      color: #0f284e;
      font-size: 6.8pt;
      flex-shrink: 0;
    }
  </style>
</head>
<body>
`;

  // ====================================================================
  // PAGE 1: FRONT COVER (GCSE Medicine Style & High Contrast)
  // ====================================================================
  html += `
  <div class="page page-container recto-page" id="page-1" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Top Departmental Branding with Customizer Hook -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #0f284e; padding-bottom: 4px; margin-bottom: 8px;">
        <div data-department-name="The History Department">
          <span style="font-family: 'Inter', sans-serif; font-size: 11pt; font-weight: 900; color: #0f284e; text-transform: uppercase; letter-spacing: 1px;">
            <span class="school-brand-target">The History Department</span>
          </span>
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 8.5pt; font-weight: 800; color: #0f284e;">
          KEY STAGE 3 HISTORICAL STUDIES &bull; YEAR 7
        </div>
      </div>

      <!-- Pupil Details Strip -->
      <div style="border: 1.5px solid #0f284e; border-radius: 4px; padding: 6px 12px; background: #ffffff; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 14px; align-items: center; margin-bottom: 8px;">
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f284e; text-transform: uppercase; margin-right: 8px;">Pupil Name:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #0f284e; height: 14px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f284e; text-transform: uppercase; margin-right: 8px;">Class:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #0f284e; height: 14px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f284e; text-transform: uppercase; margin-right: 8px;">Teacher:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #0f284e; height: 14px;"></div>
        </div>
      </div>

      <!-- Main Title Block -->
      <div style="text-align: center; margin: 2px 0 6px 0;">
        <div style="display: inline-block; border: 1.5px solid #0f284e; color: #ffffff; background: #0f284e; font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; padding: 2px 10px; border-radius: 3px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">
          Year 7 Enquiry &bull; 1066–1485
        </div>
        <h1 style="font-family: 'Playfair Display', serif; font-size: 22pt; line-height: 1.15; color: #0f284e; margin: 2px 0 3px 0; font-weight: 900;">
          Medieval England: 1066–1485
        </h1>
        <div style="font-family: 'Georgia', serif; font-size: 10pt; color: #334155; font-style: italic; font-weight: 600;">
          Conquest, Castles, Church &amp; The Shattering of Feudalism
        </div>
      </div>

      <!-- Prominent Primary Visual Source Centerpiece (Bayeux Tapestry in Authentic Color + Disciplinary Iconography Plate) -->
      <div style="margin: 2px 0 5px 0; border: 1.5px solid #0f284e; border-radius: 4px; overflow: hidden; background: #ffffff;">
        <div style="display: grid; grid-template-columns: 66mm 1fr; background: #ffffff;">
          <!-- Left: Full Visual Canvas -->
          <div style="background: #fcfbf9; border-right: 1.5px solid #0f284e; display: flex; justify-content: center; align-items: center; padding: 2px 3px;">
            <img src="${coverImgBase64}" alt="The Bayeux Tapestry &bull; Battle of Hastings" style="height: 101mm; width: auto; max-width: 100%; object-fit: contain; display: block; margin: 0 auto; border: 1.2px solid #0f284e; border-radius: 2px; box-shadow: 0 2px 6px rgba(15,40,78,0.22);">
          </div>
          <!-- Right: Visual Iconography & Historical Significance for Year 7 -->
          <div style="padding: 6px 10px; display: flex; flex-direction: column; justify-content: space-between; background: #ffffff; box-sizing: border-box;">
            <!-- 1. Header -->
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.2px solid #0f284e; padding-bottom: 2px;">
              <span style="font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 900; text-transform: uppercase; color: #0f284e; letter-spacing: 0.5px;">
                Primary Visual Evidence &bull; Anglo-Norman Embroidery
              </span>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; color: #64748b;">
                The Bayeux Tapestry (c. 1070s)
              </span>
            </div>

            <!-- 2. Statecraft Context -->
            <p style="font-family: 'Georgia', serif; font-size: 7.5pt; line-height: 1.3; color: #1e293b; margin: 0;">
              Commissioned by Bishop Odo of Bayeux within a decade of 1066, this 70-metre embroidered linen masterpiece records the Norman Conquest as both triumphant statecraft and a profound human catastrophe:
            </p>

            <!-- 3. Four Core Propaganda Features -->
            <div style="display: flex; flex-direction: column; gap: 3px;">
              <div style="border-left: 2.5px solid #0f284e; padding-left: 6px;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 7.1pt; text-transform: uppercase; color: #0f284e;">1. The Saxon Shield Wall at Senlac:</strong>
                <div style="font-family: 'Georgia', serif; font-size: 7pt; line-height: 1.22; color: #222222;">
                  Interlocking wooden round shields and Danish two-handed battleaxes held the ridge against hours of Norman cavalry charges and arrow storms.
                </div>
              </div>
              <div style="border-left: 2.5px solid #0f284e; padding-left: 6px;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 7.1pt; text-transform: uppercase; color: #0f284e;">2. Norman Heavy Cavalry with Couched Lances:</strong>
                <div style="font-family: 'Georgia', serif; font-size: 7pt; line-height: 1.22; color: #222222;">
                  Iron stirrups and high pommel saddles allowed Norman knights to deliver devastating shock charges, transforming European medieval battle tactics.
                </div>
              </div>
              <div style="border-left: 2.5px solid #0f284e; padding-left: 6px;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 7.1pt; text-transform: uppercase; color: #0f284e;">3. Duke William Unmasks His Helmet:</strong>
                <div style="font-family: 'Georgia', serif; font-size: 7pt; line-height: 1.22; color: #222222;">
                  When panic spread that Duke William was dead, he pushed back his nasal-helmet shouting: <em>‘Look at me! I live and by God’s grace shall conquer!’</em>
                </div>
              </div>
              <div style="border-left: 2.5px solid #0f284e; padding-left: 6px;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 7.1pt; text-transform: uppercase; color: #0f284e;">4. The Slain King &amp; The Marginal Dead:</strong>
                <div style="font-family: 'Georgia', serif; font-size: 7pt; line-height: 1.22; color: #222222;">
                  King Harold is struck down beside his golden dragon standard; the bottom frieze shows stripped armor, severed limbs, and dead warriors.
                </div>
              </div>
            </div>

            <!-- 4. Three-Pillar Propaganda Decoding Matrix -->
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 4px; padding-top: 3px; border-top: 1px solid #cbd5e1;">
              <div style="border: 1px solid #0f284e; border-radius: 2px; padding: 2.5px 5px; background: #f0f4f9;">
                <div style="font-family: 'Inter', sans-serif; font-size: 6.4pt; font-weight: 900; text-transform: uppercase; color: #0f284e;">Couched Lance</div>
                <div style="font-family: 'Georgia', serif; font-size: 6.4pt; line-height: 1.15; color: #1e293b; margin-top: 1px;">Shock cavalry breaking infantry shield walls.</div>
              </div>
              <div style="border: 1px solid #0f284e; border-radius: 2px; padding: 2.5px 5px; background: #f0f4f9;">
                <div style="font-family: 'Inter', sans-serif; font-size: 6.4pt; font-weight: 900; text-transform: uppercase; color: #0f284e;">Papal Banner</div>
                <div style="font-family: 'Georgia', serif; font-size: 6.4pt; line-height: 1.15; color: #1e293b; margin-top: 1px;">Holy crusade moral blessing from Rome.</div>
              </div>
              <div style="border: 1px solid #0f284e; border-radius: 2px; padding: 2.5px 5px; background: #f0f4f9;">
                <div style="font-family: 'Inter', sans-serif; font-size: 6.4pt; font-weight: 900; text-transform: uppercase; color: #0f284e;">Marginal Frieze</div>
                <div style="font-family: 'Georgia', serif; font-size: 6.4pt; line-height: 1.15; color: #1e293b; margin-top: 1px;">Brutal human carnage of Norman conquest.</div>
              </div>
            </div>

            <!-- 5. Disciplinary Significance Anchor -->
            <div style="font-family: 'Inter', sans-serif; font-size: 6.4pt; color: #1e293b; line-height: 1.25; background: #f0f4f9; border-left: 2.5px solid #0f284e; padding: 2px 6px;">
              <strong style="text-transform: uppercase; color: #0f284e;">Disciplinary Significance:</strong> Embroidered by English seamstresses under Norman rule, the tapestry serves both as Norman triumphal propaganda and a poignant Anglo-Saxon testimony to national defeat.
            </div>

            <!-- 6. Targeted Disciplinary Hinge Question -->
            <div style="background: #ffffff; border: 1.2px solid #0f284e; border-radius: 3px; padding: 3px 6px;">
              <div style="display: flex; justify-content: space-between; align-items: baseline;">
                <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 900; text-transform: uppercase; color: #0f284e;">Disciplinary Hinge Question:</span>
                <span style="font-family: 'Inter', sans-serif; font-size: 6.2pt; font-weight: 700; color: #64748b; text-transform: uppercase;">Historical Evaluation</span>
              </div>
              <div style="font-family: 'Georgia', serif; font-size: 6.9pt; font-style: italic; color: #1e293b; line-height: 1.2; margin-top: 1px;">
                Does the Bayeux Tapestry celebrate William’s conquest as the righteous will of God, or does its vivid marginal art subtly subvert Norman triumph by mourning the destruction of Saxon England?
              </div>
            </div>
          </div>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #ffffff; padding: 3px 8px; border-top: 1.5px solid #0f284e; background: #0f284e;">
          <span><strong>Primary Visual Evidence:</strong> <em>Battle of Hastings Detail &bull; The Death of King Harold</em> &bull; Bayeux Tapestry Museum (c. 1070–1077)</span>
          <span style="font-weight: 700; color: #93c5fd;">BAYEUX ARCHIVE &bull; UNESCO MEMORY OF THE WORLD</span>
        </div>
      </div>

      <!-- Disciplinary Strategy Overview & Workbook Blueprint -->
      <div style="border: 1.2px solid #0f284e; border-radius: 4px; padding: 5px 8px; background: #f0f4f9; margin: 3px 0 6px 0; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px;">
        <div style="border-right: 1px solid #cbd5e1; padding-right: 6px;">
          <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; color: #0f284e;">
            1. Chronological Spines [Enquiries 1–5]
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 6.8pt; line-height: 1.2; color: #1e293b; margin-top: 1px;">
            Structured chronological note-taking on each left page: 5 causal stages guiding pupil understanding as the teacher narrates the history.
          </div>
        </div>
        <div style="border-right: 1px solid #cbd5e1; padding-right: 6px;">
          <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; color: #0f284e;">
            2. Disciplinary Writing Practice [4m, 8m, 12m]
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 6.8pt; line-height: 1.2; color: #1e293b; margin-top: 1px;">
            Targeted extended writing on each right page: causal explanation, narrative account, difference, and constitutional evaluation.
          </div>
        </div>
        <div>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; color: #0f284e;">
            3. Centrefold Timeline &amp; Notes Portfolio
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 6.8pt; line-height: 1.2; color: #1e293b; margin-top: 1px;">
            Centrefold Living Timeline dual-coding sketchpads (pp. 8–9) and dedicated lined notes &amp; essay planning pages (pp. 14–15).
          </div>
        </div>
      </div>

      <!-- Course Specification Curriculum Tracking Table -->
      <div style="border: 1.5px solid #0f284e; border-radius: 4px; overflow: hidden; margin: 2px 0 2px 0;">
        <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif;">
          <thead>
            <tr style="border-bottom: 1.5px solid #0f284e; background: #0f284e;">
              <th style="padding: 6px 10px; text-align: left; font-size: 8.2pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; border-right: 1.2px solid rgba(255,255,255,0.25); color: #ffffff;">
                Course Specification &bull; Key Enquiry Sequence
              </th>
              <th style="padding: 6px 4px; width: 64px; text-align: center; font-size: 7.8pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; border-right: 1.2px solid rgba(255,255,255,0.25); color: #ffffff;">
                Learnt
              </th>
              <th style="padding: 6px 4px; width: 64px; text-align: center; font-size: 7.8pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; color: #ffffff;">
                Revised
              </th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 7px 10px; border-right: 1.2px solid #cbd5e1;">
                <div style="font-size: 8.5pt; font-weight: 800; color: #0f284e; line-height: 1.25;">
                  Enquiry 1: 1066 &amp; The Battle of Hastings
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.8pt; font-style: italic; color: #334155; margin-top: 1px; line-height: 1.2;">
                  Why did William of Normandy win the Battle of Hastings in 1066, and how did Senlac Hill decide England's fate?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #cbd5e1;">
                <div style="width: 15px; height: 15px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 15px; height: 15px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 7px 10px; border-right: 1.2px solid #cbd5e1;">
                <div style="font-size: 8.5pt; font-weight: 800; color: #0f284e; line-height: 1.25;">
                  Enquiry 2: Castles, Terror &amp; Domesday
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.8pt; font-style: italic; color: #334155; margin-top: 1px; line-height: 1.2;">
                  How did 10,000 Normans subjugate 2 million Saxons through castles, the Harrying of the North, and the Domesday audit?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #cbd5e1;">
                <div style="width: 15px; height: 15px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 15px; height: 15px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 7px 10px; border-right: 1.2px solid #cbd5e1;">
                <div style="font-size: 8.5pt; font-weight: 800; color: #0f284e; line-height: 1.25;">
                  Enquiry 3: Crown vs Church: Henry II &amp; Thomas Becket
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.8pt; font-style: italic; color: #334155; margin-top: 1px; line-height: 1.2;">
                  Why did Henry II clash with Thomas Becket over canon law, and why did Becket's murder force royal penance?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #cbd5e1;">
                <div style="width: 15px; height: 15px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 15px; height: 15px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 7px 10px; border-right: 1.2px solid #cbd5e1;">
                <div style="font-size: 8.5pt; font-weight: 800; color: #0f284e; line-height: 1.25;">
                  Enquiry 4: Magna Carta (1215) &amp; Medieval Kingship
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.8pt; font-style: italic; color: #334155; margin-top: 1px; line-height: 1.2;">
                  Was Magna Carta a selfish barons’ tax revolt or a revolutionary foundation of due process and the Rule of Law?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #cbd5e1;">
                <div style="width: 15px; height: 15px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 15px; height: 15px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
            <tr>
              <td style="padding: 7px 10px; border-right: 1.2px solid #cbd5e1;">
                <div style="font-size: 8.5pt; font-weight: 800; color: #0f284e; line-height: 1.25;">
                  Enquiry 5: The Black Death (1348) &amp; The Peasants’ Revolt (1381)
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.8pt; font-style: italic; color: #334155; margin-top: 1px; line-height: 1.2;">
                  How did bubonic plague wipe out half of England's population and inspire Wat Tyler's rebellion to shatter serfdom?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #cbd5e1;">
                <div style="width: 15px; height: 15px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 15px; height: 15px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      ${renderFooterStrip(1, 'William the Conqueror was so paranoid about Saxon rebellions that he built castles inside ancient Roman forts, including right here at Portchester Castle.', 16)}
    </div>
  </div>
`;

  // ====================================================================
  // PAGES 2–3: ENQUIRY 1 (1066 & HASTINGS)
  // ====================================================================
  html += renderSpinePage(enquiryConfigs[0], 2);
  html += renderRightPage(enquiryConfigs[0], 3);

  // ====================================================================
  // PAGES 4–5: ENQUIRY 2 (CASTLES, TERROR & DOMESDAY)
  // ====================================================================
  html += renderSpinePage(enquiryConfigs[1], 4);
  html += renderRightPage(enquiryConfigs[1], 5);

  // ====================================================================
  // PAGES 6–7: ENQUIRY 3 (CROWN VS CHURCH: BECKET)
  // ====================================================================
  html += renderSpinePage(enquiryConfigs[2], 6);
  html += renderRightPage(enquiryConfigs[2], 7);

  // ====================================================================
  // PAGES 8–9: THE LIVING TIMELINE IN THE EXACT PHYSICAL CENTREFOLD!
  // ====================================================================
  html += `
  <!-- PAGE 8: LIVING TIMELINE PART 1 (MILESTONES 1–4) -->
  <div class="page page-container verso-page" id="page-8" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div>
        <div style="border-bottom: 2px solid #0f284e; padding-bottom: 3px; margin-bottom: 5px;">
          <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 11pt; color: #0f284e; text-transform: uppercase; font-weight: 900; letter-spacing: 0.5px;">
            Living Timeline &bull; Part 1: Conquest, Castles &amp; The Church (1066–1170)
          </h2>
        </div>

        <div style="border: 1px solid #0f284e; border-radius: 3px; background: #f0f4f9; padding: 3px 6px; margin-bottom: 6px; font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #1e293b;">
          <strong style="color: #0f284e;">Living Timeline Dual-Coding Protocol:</strong> Complete each milestone sketchpad using dual-coding (combining visual storytelling symbols, causal arrows, and dates) to master the chronological spine across the centre-fold.
        </div>
      </div>

      <!-- 4 Milestones with Open Drawing Area Across Full A4 Page -->
      <div style="display: flex; flex-direction: column; flex: 1; justify-content: space-between;">
        
        <!-- Milestone 1: 1066 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 9.0pt; color: #0f284e;">
              1066 &bull; The Battle of Hastings &amp; Norman Conquest
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; background: #0f284e; color: #ffffff; border: 1px solid #0f284e; padding: 1px 5px; border-radius: 2px;">Enquiry 1</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.0pt; color: #000000; margin: 0; line-height: 1.25;">
            Following victory over Vikings at Stamford Bridge, Harold’s exhausted army forms a shield wall atop Senlac Hill; Norman cavalry feigned retreats shatter the line, Harold is killed, and Duke William seizes the crown.
          </p>
        </div>

        <!-- Milestone 2: 1069–1070 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 9.0pt; color: #0f284e;">
              1069–1070 &bull; The Harrying of the North &amp; Motte-and-Bailey Castles
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; background: #0f284e; color: #ffffff; border: 1px solid #0f284e; padding: 1px 5px; border-radius: 2px;">Enquiry 2</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.0pt; color: #000000; margin: 0; line-height: 1.25;">
            William crushes Anglo-Saxon resistance by systematically burning crops, salting fields, and slaughtering livestock across Yorkshire, starving over 100,000 people while erecting 500 timber motte castles across the realm.
          </p>
        </div>

        <!-- Milestone 3: 1086 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 9.0pt; color: #0f284e;">
              1086 &bull; The Domesday Survey &amp; Portchester Stone Keep
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; background: #0f284e; color: #ffffff; border: 1px solid #0f284e; padding: 1px 5px; border-radius: 2px;">Enquiry 2</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.0pt; color: #000000; margin: 0; line-height: 1.25;">
            William commissions an exhaustive census of all land, mills, pigs, and taxable wealth in England; towering stone keeps like Portchester are erected to permanently seal Norman military and fiscal dominance.
          </p>
        </div>

        <!-- Milestone 4: 1170 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 9.0pt; color: #0f284e;">
              1170 &bull; The Murder of Thomas Becket at Canterbury
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; background: #0f284e; color: #ffffff; border: 1px solid #0f284e; padding: 1px 5px; border-radius: 2px;">Enquiry 3</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.0pt; color: #000000; margin: 0; line-height: 1.25;">
            Following a bitter clash over whether royal courts or church courts could try criminal priests, four of Henry II’s knights butcher Archbishop Becket on the cathedral altar steps; Becket’s shrine becomes Christendom’s greatest pilgrimage.
          </p>
        </div>

      </div>

      ${renderFooterStrip(8, 'Centrefold timeline: Dual-coding sketches and dates turns narrative history into permanent long-term memory.', 16)}
    </div>
  </div>

  <!-- PAGE 9: LIVING TIMELINE PART 2 (MILESTONES 5–8) -->
  <div class="page page-container recto-page" id="page-9" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div>
        <div style="border-bottom: 2px solid #0f284e; padding-bottom: 3px; margin-bottom: 5px;">
          <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 11pt; color: #0f284e; text-transform: uppercase; font-weight: 900; letter-spacing: 0.5px;">
            Living Timeline &bull; Part 2: Magna Carta, The Black Death &amp; Revolt (1215–1381)
          </h2>
        </div>

        <div style="border: 1px solid #0f284e; border-radius: 3px; background: #f0f4f9; padding: 3px 6px; margin-bottom: 6px; font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #1e293b;">
          <strong style="color: #0f284e;">Living Timeline Dual-Coding Protocol:</strong> Complete each milestone sketchpad using dual-coding (combining visual storytelling symbols, causal arrows, and dates) to master the chronological spine across the centre-fold.
        </div>
      </div>

      <!-- 4 Milestones with Open Drawing Area Across Full A4 Page -->
      <div style="display: flex; flex-direction: column; flex: 1; justify-content: space-between;">
        
        <!-- Milestone 5: 1215 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 9.0pt; color: #0f284e;">
              1215 &bull; The Sealing of Magna Carta at Runnymede
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; background: #0f284e; color: #ffffff; border: 1px solid #0f284e; padding: 1px 5px; border-radius: 2px;">Enquiry 4</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.0pt; color: #000000; margin: 0; line-height: 1.25;">
            Bankrupted by military defeat at Bouvines, King John is forced by rebel barons at Runnymede to seal Magna Carta; Clause 39 guarantees that no free man can be imprisoned or stripped of land without lawful trial by his peers.
          </p>
        </div>

        <!-- Milestone 6: 1265 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 9.0pt; color: #0f284e;">
              1265 &bull; Simon de Montfort’s Parliament &amp; The Commons
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; background: #0f284e; color: #ffffff; border: 1px solid #0f284e; padding: 1px 5px; border-radius: 2px;">Enquiry 4</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.0pt; color: #000000; margin: 0; line-height: 1.25;">
            Rebel leader Simon de Montfort summons two elected knights from each shire and two burgesses from each borough to Westminster alongside barons and bishops, creating the institutional prototype for the House of Commons.
          </p>
        </div>

        <!-- Milestone 7: 1348–1349 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 9.0pt; color: #0f284e;">
              1348–1349 &bull; The Black Death &amp; Demographic Collapse
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; background: #0f284e; color: #ffffff; border: 1px solid #0f284e; padding: 1px 5px; border-radius: 2px;">Enquiry 5</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.0pt; color: #000000; margin: 0; line-height: 1.25;">
            Bubonic plague carried by shipborne black rats enters Dorset and spreads nationwide, killing between 35% and 50% of the population; severe labour shortage enables surviving serfs to demand higher cash wages.
          </p>
        </div>

        <!-- Milestone 8: 1381 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 9.0pt; color: #0f284e;">
              1381 &bull; The Peasants’ Revolt &amp; The Smithfield Confrontation
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; background: #0f284e; color: #ffffff; border: 1px solid #0f284e; padding: 1px 5px; border-radius: 2px;">Enquiry 5</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.0pt; color: #000000; margin: 0; line-height: 1.25;">
            Enraged by three regressive poll taxes and the 1351 Statute of Labourers, Wat Tyler and radical priest John Ball lead 60,000 peasants into London; Mayor Walworth cuts down Tyler at Smithfield, but serfdom is fatally broken.
          </p>
        </div>

      </div>

      ${renderFooterStrip(9, 'Between 1066 and 1381, England transformed from a conquered Norman fiefdom into a kingdom bound by common law, parliament, and free labour.', 16)}
    </div>
  </div>
`;

  // ====================================================================
  // PAGES 10–11: ENQUIRY 4 (MAGNA CARTA)
  // ====================================================================
  html += renderSpinePage(enquiryConfigs[3], 10);
  html += renderRightPage(enquiryConfigs[3], 11);

  // ====================================================================
  // PAGES 12–13: ENQUIRY 5 (THE BLACK DEATH & PEASANTS' REVOLT)
  // ====================================================================
  html += renderSpinePage(enquiryConfigs[4], 12);
  html += renderRightPage(enquiryConfigs[4], 13);

  // ====================================================================
  // PAGES 14–15: DEDICATED LINED NOTES PAGES
  // ====================================================================
  html += renderNotesPage(
    14,
    'Notes: Record key causal links, essay plans, and teacher feedback for this unit.',
  );
  html += renderNotesPage(
    15,
    'Notes: Record key causal links, essay plans, and teacher feedback for this unit.',
  );

  // ====================================================================
  // PAGE 16: OUTSIDE BACK COVER (PROGRESS LEDGER + 5 QR CODES - MEDICINE STYLE)
  // ====================================================================
  html += `
  <!-- PAGE 16: OUTSIDE BACK COVER -->
  <div class="page page-container verso-page" id="page-16" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Back Cover Header Strip -->
      <div style="border-bottom: 2px solid #0f284e; padding-bottom: 3px; margin-bottom: 6px;">
        <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 11.5pt; color: #0f284e; text-transform: uppercase; font-weight: 900; letter-spacing: 0.5px;">
          Key Stage 3 History &bull; Pupil Progress &amp; Assessment Record
        </h2>
      </div>

      <!-- Pupil Details & Target Level Strip -->
      <div style="border: 1.5px solid #0f284e; border-radius: 4px; padding: 7px 12px; background: #ffffff; display: grid; grid-template-columns: 2fr 1fr 1.3fr; gap: 14px; align-items: center; margin-bottom: 5px;">
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f284e; text-transform: uppercase; margin-right: 8px;">Pupil Name:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #0f284e; height: 14px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f284e; text-transform: uppercase; margin-right: 8px;">Class:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #0f284e; height: 14px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f284e; text-transform: uppercase; margin-right: 8px;">Target KS3 Level:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #0f284e; height: 14px; text-align: center; font-weight: 900; color: #0f284e;"></div>
        </div>
      </div>

      <!-- KS3 History Progress Pathways & Descriptors -->
      <div style="border: 1.5px solid #0f284e; border-radius: 4px; padding: 6px 8px; background: #ffffff; margin-bottom: 5px; font-family: 'Inter', sans-serif;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.2px solid #0f284e; background: #f0f4f9; padding: 3px 6px; margin-bottom: 4px; border-radius: 2px;">
          <strong style="font-size: 8pt; text-transform: uppercase; letter-spacing: 0.5px; color: #0f284e;">
            Key Stage 3 History Assessment Pathways &bull; Level Descriptors &amp; Criteria
          </strong>
          <span style="font-size: 7.2pt; font-weight: 800; color: #0f284e;">YEAR 7 STANDARDS</span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 5px; font-size: 7pt; line-height: 1.3;">
          <div style="border: 1px solid #cbd5e1; border-radius: 3px; padding: 5px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-weight: 900; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 3px; font-size: 7.2pt; text-transform: uppercase; color: #0f284e;">
                Emerging (1–2)
              </div>
              Recalls key historical facts; describes basic medieval events using guided sentence starters.
            </div>
            <div style="margin-top: 4px; font-size: 6.4pt; font-style: italic; border-top: 1px dashed #cbd5e1; padding-top: 2px; color: #475569;">
              <strong style="color: #0f284e;">Focus:</strong> Add dates &amp; key vocabulary.
            </div>
          </div>
          <div style="border: 1px solid #cbd5e1; border-radius: 3px; padding: 5px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-weight: 900; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 3px; font-size: 7.2pt; text-transform: uppercase; color: #0f284e;">
                Emerging+ (3)
              </div>
              Identifies reasons for events; begins to describe causes of military victory, rebellion, and legal reform.
            </div>
            <div style="margin-top: 4px; font-size: 6.4pt; font-style: italic; border-top: 1px dashed #cbd5e1; padding-top: 2px; color: #475569;">
              <strong style="color: #0f284e;">Focus:</strong> Explain *why*, not just *what*.
            </div>
          </div>
          <div style="border: 1px solid #cbd5e1; border-radius: 3px; padding: 5px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-weight: 900; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 3px; font-size: 7.2pt; text-transform: uppercase; color: #0f284e;">
                Expected (4–5)
              </div>
              Explains multiple causes &amp; consequences; writes structured causal paragraphs using precise dates and historical concepts.
            </div>
            <div style="margin-top: 4px; font-size: 6.4pt; font-style: italic; border-top: 1px dashed #cbd5e1; padding-top: 2px; color: #475569;">
              <strong style="color: #0f284e;">Focus:</strong> Rank and connect multiple causes.
            </div>
          </div>
          <div style="border: 1.2px solid #0f284e; border-radius: 3px; padding: 5px; background: #f0f4f9; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-weight: 900; border-bottom: 1px solid #0f284e; padding-bottom: 2px; margin-bottom: 3px; font-size: 7.2pt; text-transform: uppercase; color: #0f284e;">
                Expected+ (6–7)
              </div>
              Analyses causal significance; evaluates competing historical interpretations and weighs counter-arguments with detailed evidence.
            </div>
            <div style="margin-top: 4px; font-size: 6.4pt; font-style: italic; border-top: 1px dashed #93c5fd; padding-top: 2px; color: #1e293b;">
              <strong style="color: #0f284e;">Focus:</strong> Sustained historical criteria.
            </div>
          </div>
          <div style="border: 1.2px solid #0f284e; border-radius: 3px; padding: 5px; background: #f0f4f9; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-weight: 900; border-bottom: 1px solid #0f284e; padding-bottom: 2px; margin-bottom: 3px; font-size: 7.2pt; text-transform: uppercase; color: #0f284e;">
                Greater Depth (8–9)
              </div>
              Sustained, nuanced evaluative judgement; synthesises constitutional, political, and socio-economic transformation across 1066–1485.
            </div>
            <div style="margin-top: 4px; font-size: 6.4pt; font-style: italic; border-top: 1px dashed #93c5fd; padding-top: 2px; color: #1e293b;">
              <strong style="color: #0f284e;">Focus:</strong> Nuanced synoptic judgements.
            </div>
          </div>
        </div>
      </div>

      <!-- Streamlined KS3 Marking Grid (Low-Friction & Periodic Marking Standard) -->
      <div style="border: 1.5px solid #0f284e; border-radius: 4px; overflow: hidden; margin-bottom: 5px;">
        <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif; font-size: 8pt;">
          <thead>
            <tr style="background: #0f284e; color: #ffffff;">
              <th style="padding: 7px 4px; width: 10%; text-align: center; border-right: 1px solid rgba(255,255,255,0.25); font-size: 7.5pt; text-transform: uppercase; color: #ffffff;">Date</th>
              <th style="padding: 7px 8px; width: 43%; text-align: left; border-right: 1px solid rgba(255,255,255,0.25); font-size: 7.5pt; text-transform: uppercase; color: #ffffff;">Enquiry &bull; Assessment Focus</th>
              <th style="padding: 7px 6px; width: 17%; text-align: center; border-right: 1px solid rgba(255,255,255,0.25); font-size: 7.5pt; text-transform: uppercase; color: #ffffff;">KS3 Level / Effort</th>
              <th style="padding: 7px 8px; width: 30%; text-align: left; font-size: 7.5pt; text-transform: uppercase; color: #ffffff;">Teacher Comment / Spellings</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 17px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 17px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.5pt; color: #0f284e;">Enquiry 1: 1066 &amp; Battle of Hastings</div>
                <div style="font-size: 7.5pt; color: #475569; margin-top: 2px;">Causal Analysis: Why did William win at Hastings?</div>
              </td>
              <td style="padding: 17px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">
                &nbsp;
              </td>
              <td style="padding: 17px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 17px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 17px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.5pt; color: #0f284e;">Enquiry 2: Castles, Terror &amp; Domesday</div>
                <div style="font-size: 7.5pt; color: #475569; margin-top: 2px;">Feature Drill &amp; Motte-and-Bailey Blitz</div>
              </td>
              <td style="padding: 17px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">
                &nbsp;
              </td>
              <td style="padding: 17px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 17px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 17px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.5pt; color: #0f284e;">Enquiry 3: Crown vs Church: Henry II &amp; Becket</div>
                <div style="font-size: 7.5pt; color: #475569; margin-top: 2px;">Contrasting Interpretations: Character of Becket</div>
              </td>
              <td style="padding: 17px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">
                &nbsp;
              </td>
              <td style="padding: 17px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 17px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 17px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.5pt; color: #0f284e;">Enquiry 4: Magna Carta &amp; Medieval Kingship</div>
                <div style="font-size: 7.5pt; color: #475569; margin-top: 2px;">Narrative Account &amp; Importance of Clause 39</div>
              </td>
              <td style="padding: 17px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">
                &nbsp;
              </td>
              <td style="padding: 17px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 17px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 17px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.5pt; color: #0f284e;">Enquiry 5: Black Death &amp; The Peasants' Revolt</div>
                <div style="font-size: 7.5pt; color: #475569; margin-top: 2px;">Evaluative Essay: Causes of Feudal Breakdown</div>
              </td>
              <td style="padding: 17px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">
                &nbsp;
              </td>
              <td style="padding: 17px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
            <tr style="border-bottom: 1px solid #0f284e; background: #f0f4f9;">
              <td style="padding: 17px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 17px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.5pt; color: #0f284e;">Independent Study &amp; Notes Portfolio</div>
                <div style="font-size: 7.5pt; color: #475569; margin-top: 2px;">Pages 14–15 Enquiry Notes, Reflection &amp; Revision Tasks</div>
              </td>
              <td style="padding: 17px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">
                &nbsp;
              </td>
              <td style="padding: 17px 8px; background: #f0f4f9;">&nbsp;</td>
            </tr>
            <tr style="background: #ffffff; border-top: 1.5px solid #0f284e;">
              <td style="padding: 17px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 17px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.5pt; color: #0f284e;">Teacher-Designated Assessment Task</div>
              </td>
              <td style="padding: 17px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">
                &nbsp;
              </td>
              <td style="padding: 17px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Interactive Digital Quizzing Hub (Medicine Style) -->
      <div style="border: 1.5px solid #0f284e; border-radius: 4px; padding: 6px 8px; background: #ffffff;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.2px solid #0f284e; background: #f0f4f9; padding: 3px 6px; margin-bottom: 4px; border-radius: 2px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; text-transform: uppercase; color: #0f284e;">
            📱 Interactive Digital Quizzing Hub &bull; Scan for Instant Retrieval Practice
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 800; background: #0f284e; color: #ffffff; border: 1px solid #0f284e; padding: 1px 5px; border-radius: 2px;">
            ONLINE RECALL
          </span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; text-align: center;">
          ${enquiryConfigs
            .map((cfg, idx) => {
              const quizUrl =
                'https://the-history-revision-hub.netlify.app/?unit=medieval_england&lesson=' +
                idx +
                '&quiz=true';
              const qrSvg = generateQrSvg(quizUrl);
              const shortLabels = [
                'Hastings 1066',
                'Castles & Terror',
                'Crown vs Church',
                'Magna Carta',
                'Black Death',
              ];
              return (
                '<div style="border: 1.2px solid #0f284e; border-radius: 3px; padding: 5px 2px; background: #ffffff; display: flex; flex-direction: column; align-items: center; justify-content: space-between;">' +
                '<div style="font-family: \'Inter\', sans-serif; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; margin-bottom: 1px; color: #0f284e;">Enquiry ' +
                cfg.lessonNum +
                '</div>' +
                '<div style="font-family: \'Inter\', sans-serif; font-size: 6.5pt; font-weight: 700; color: #475569; margin-bottom: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%;">' +
                shortLabels[idx] +
                '</div>' +
                '<div style="width: 24mm; height: 24mm; margin: 0 auto 2px auto;">' +
                qrSvg +
                '</div>' +
                '<span style="font-family: \'Inter\', sans-serif; font-size: 6.2pt; font-weight: 800; text-transform: uppercase; background: #0f284e; color: #ffffff; padding: 1px 5px; border-radius: 2px; margin-bottom: 2px;">Scan to Quiz</span>' +
                '<div style="font-family: \'Inter\', sans-serif; font-size: 8.5pt; font-weight: 900; color: #0f284e; margin-top: 1px; white-space: nowrap;">Best Score: [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 8</strong> ]</div>' +
                '</div>'
              );
            })
            .join('')}
        </div>
      </div>

      ${renderFooterStrip(16, 'The History Revision Hub &bull; Master Saddle-Stitch Pupil Workbook Standard &bull; All Rights Reserved.', 16)}
    </div>
  </div>
`;

  html += `
</body>
</html>
`;

  return html;
}

// ============================================================================
// MAIN COMPILATION SCRIPT
// ============================================================================
async function main() {
  console.log(
    'Rendering 16-Page A4 Pupil Workbook (Christine Counsell Standard): Medieval England: 1066–1485...',
  );

  const outDir = path.join(ROOT_DIR, 'public', 'units', 'medieval_england');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const outHtmlPath = path.join(outDir, 'pupil_workbook.html');
  const html = compileMedievalWorkbook();
  fs.writeFileSync(outHtmlPath, html, 'utf8');
  console.log(`[OK] HTML written to: ${outHtmlPath}`);

  // Compile PDFs via Puppeteer
  const pdfDir = path.join(ROOT_DIR, 'public', 'pdfs');
  if (!fs.existsSync(pdfDir)) {
    fs.mkdirSync(pdfDir, { recursive: true });
  }
  const outPdfPath = path.join(pdfDir, 'medieval_england_pupil_workbook.pdf');
  const outPdf16pPath = path.join(pdfDir, 'medieval_england_16p_workbook.pdf');

  console.log('Launching Puppeteer to generate high-resolution print PDF...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });

  // Wait for web fonts to load
  await page.evaluateHandle('document.fonts.ready');

  await page.pdf({
    path: outPdfPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0mm',
      right: '0mm',
      bottom: '0mm',
      left: '0mm',
    },
  });

  // Also write 16p alias
  fs.copyFileSync(outPdfPath, outPdf16pPath);

  await browser.close();
  console.log(`[OK] PDF successfully compiled: ${outPdfPath}`);
  console.log(`[OK] 16P PDF alias compiled: ${outPdf16pPath}`);
}

if (require.main === module) {
  main().catch((err) => {
    console.error('Fatal error during workbook compilation:', err);
    process.exit(1);
  });
}

module.exports = { compileMedievalWorkbook };
