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
        paraRef: '[1.1]',
        date: 'Jan 1066',
        questionHeading: 'Why did the death of Edward the Confessor trigger a succession crisis?',
        bullets: ['Childless English King', 'Three Rival Claimants', 'Witan Backs Harold'],
        focusClue:
          'How did Edward’s childless death leave the English throne vulnerable to foreign invasion?',
      },
      {
        step: 2,
        paraRef: '[1.2]',
        date: '1066',
        questionHeading: 'Who were the three rival claimants contending for the English crown?',
        bullets: ['English Earl Takes Crown', 'Fierce Viking Giant', 'Duke Promised the Throne'],
        focusClue:
          'Why did Harold Godwinson, Harald Hardrada, and William of Normandy each claim legitimate right to the throne?',
      },
      {
        step: 3,
        paraRef: '[1.3]',
        date: 'Sept 1066',
        questionHeading:
          'How did the Battle of Stamford Bridge exhaust King Harold’s northern forces?',
        bullets: ['300 Viking Longships', 'Fierce River Clash', 'Marching Night and Day'],
        focusClue:
          'Why did marching 200 miles to defeat the Vikings leave Harold’s army dangerously weakened for Hastings?',
      },
      {
        step: 4,
        paraRef: '[1.4]',
        date: '14 Oct 1066',
        questionHeading:
          'How did the Anglo-Saxon shield wall withstand repeated Norman charges on Senlac Hill?',
        bullets: ['Steep Slippery Ridge', 'Locked Wooden Shields', 'Two-Handed Battleaxes'],
        focusClue:
          'Why was the Saxon shield wall atop Senlac Hill almost impossible for Norman cavalry and archers to break?',
      },
      {
        step: 5,
        paraRef: '[1.5]',
        date: 'Oct 1066',
        questionHeading:
          'How did the feigned retreat tactic break the shield wall and secure Norman victory?',
        bullets: ['Pretending to Run Away', 'Chasing Down the Hill', 'Arrow Strikes Harold'],
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
      structureStrip: [
        {
          col: '1. MILITARY TACTICS',
          text: 'Analyse Norman combined-arms coordination, heavy shock cavalry charges, archer volleys, and the feigned retreat on Senlac Hill.',
        },
        {
          col: '2. SAXON EXHAUSTION',
          text: 'Analyse the impact of King Harold’s 200-mile forced march following Stamford Bridge and the loss of shield-wall discipline.',
        },
        {
          col: '3. COMPARATIVE VERDICT',
          text: 'Weigh whether Norman tactical superiority or Anglo-Saxon physical exhaustion and tactical errors proved more decisive.',
        },
      ],
      connectives:
        'A primary factor was... &bull; In particular, this caused... &bull; Furthermore, this was significant because... &bull; As a direct result... &bull; Consequently, this led to...',
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
        paraRef: '[2.1]',
        date: '1066–1068',
        questionHeading:
          'How did the motte-and-bailey blitz allow 10,000 Normans to dominate 2 million Saxons?',
        bullets: ['High Earth Mounds', 'Quick Timber Walls', '500 Castles Built Fast'],
        focusClue:
          'Why were motte-and-bailey castles the ultimate instrument of rapid military psychological shock and awe?',
      },
      {
        step: 2,
        paraRef: '[2.2]',
        date: '1069–1070',
        questionHeading: 'Why did William unleash the brutal scorched-earth Harrying of the North?',
        bullets: ['Rebels Attack York', 'Burning Every Crop', '100,000 Starve to Death'],
        focusClue:
          'Why did Anglo-Norman chronicler Orderic Vitalis condemn William’s brutal devastation of Yorkshire?',
      },
      {
        step: 3,
        paraRef: '[2.3]',
        date: '1070–1100',
        questionHeading:
          'How did massive stone keeps like Portchester Castle project permanent imperial permanence?',
        bullets: ['Ancient Roman Walls', 'Thick Limestone Keep', 'Deep Warship Harbour'],
        focusClue:
          'Why did William build Portchester Castle’s stone keep directly inside an ancient Roman shore fort?',
      },
      {
        step: 4,
        paraRef: '[2.4]',
        date: '1085–1086',
        questionHeading:
          'Why did William commission the exhaustive Domesday Book audit at Gloucester?',
        bullets: [
          'Fearing Viking Invasion',
          'Counting Every Cow and Pig',
          'Paying Every Penny in Tax',
        ],
        focusClue:
          'Why did Anglo-Saxons name it Domesday, believing its royal verdicts were as inescapable as the Day of Judgement?',
      },
      {
        step: 5,
        paraRef: '[2.5]',
        date: '1086',
        questionHeading:
          'What does the local Domesday hundred reveal about Anglo-Saxon land dispossession?',
        bullets: [
          'Hundred of Fareham Survey',
          'English Landlords Kicked Out',
          'Barons Take the Manors',
        ],
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
          'Feature 1: One key feature was that... &bull; Detail: Specifically, this involved... &bull; Feature 2: A second key feature was... &bull; Detail: This served the purpose of...',
      },
      partB: {
        tariff: 'Question 2: Explain One Consequence [4 marks &bull; 5 mins]',
        badge: 'STRUCTURED WRITING',
        question:
          'Explain one consequence of the motte-and-bailey blitz for Anglo-Saxon resistance against Norman rule. [4 marks]',
        hint: 'Focus on how fortified castles allowed small Norman garrisons to dominate thousands of hostile Saxons and suppress regional revolts.',
        stems:
          'One consequence was that... &bull; In particular, this meant that... &bull; This was significant because... &bull; Consequently, the impact was...',
        connectives:
          'A significant consequence was that... &bull; In particular, this meant that... &bull; Furthermore, this led to... &bull; Consequently, the impact was...',
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
        paraRef: '[3.1]',
        date: '1154–1162',
        questionHeading:
          'Why did Henry II appoint his worldly drinking companion Becket as Archbishop?',
        bullets: ['King’s Hunting Friend', 'Silk Robes and Feasting', 'Hoping for an Easy Puppet'],
        focusClue:
          'Why did Henry expect Becket to be a pliant puppet who would bring the wealthy English Church under royal control?',
      },
      {
        step: 2,
        paraRef: '[3.2]',
        date: '1162',
        questionHeading: 'How did Becket’s sudden spiritual transformation shock King Henry?',
        bullets: ['Throws Off Silk Robes', 'Scratchy Goat Hairshirt', 'Loyal Only to the Pope'],
        focusClue:
          'Why did Becket instantly discard his silk robes and declare that his absolute allegiance belonged to God alone?',
      },
      {
        step: 3,
        paraRef: '[3.3]',
        date: '1164',
        questionHeading:
          'Why did the Constitutions of Clarendon and ‘criminous clerks’ provoke an open rift?',
        bullets: [
          'Priests Escaping Punishment',
          'Reading a Latin Verse',
          'King Demands Royal Trials',
        ],
        focusClue:
          'Why did Henry insist that priests who committed murder must be punished by royal judges rather than church courts?',
      },
      {
        step: 4,
        paraRef: '[3.4]',
        date: '29 Dec 1170',
        questionHeading: 'How did royal rage culminate in brutal murder in Canterbury Cathedral?',
        bullets: ['King Shouts in Fury', 'Four Knights Gallop Away', 'Swords Smashed at the Altar'],
        focusClue:
          'Did Henry II order Becket’s murder, or did his barons interpret a king’s reckless temper as a royal execution order?',
      },
      {
        step: 5,
        paraRef: '[3.5]',
        date: '1170–1174',
        questionHeading:
          'Why was Henry II forced to perform barefoot public penance at Canterbury?',
        bullets: ['Miracles at the Tomb', 'Whipping with Birch Rods', 'Church Courts Kept Intact'],
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
        'Interpretations 1 and 2 differ on... &bull; Interpretation 1 argues that... &bull; In contrast, Interpretation 2 suggests that... &bull; This is a difference because...',
      questionC:
        'Suggest one reason why Interpretations 1 and 2 differ on Becket’s clash with King Henry II. [4 marks]',
      stemsC:
        'One reason why Interpretations 1 and 2 differ is because they have a different focus... &bull; Specifically, Interpretation 1 focuses primarily on... &bull; In contrast, Interpretation 2 focuses more on... &bull; As a result, the authors reach different conclusions because...',
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
        paraRef: '[4.1]',
        date: '1199–1204',
        questionHeading:
          'Why did the loss of Normandy earn King John the mocking nickname ‘Softsword’?',
        bullets: ['Losing French Castles', 'Barons Laugh at Softsword', 'Desperate for Silver'],
        focusClue:
          'Why did losing ancestral duchies in France make King John obsessed with wringing money from English barons?',
      },
      {
        step: 2,
        paraRef: '[4.2]',
        date: '1205–1213',
        questionHeading:
          'How did scutage tax extortion and the papal interdict alienate the realm?',
        bullets: ['Shield Money Demands', 'Locked Church Doors', 'Dead Buried in Ditches'],
        focusClue:
          'Why did levying exorbitant shield money on barons who didn’t want to fight in France push the aristocracy to rebellion?',
      },
      {
        step: 3,
        paraRef: '[4.3]',
        date: '1214',
        questionHeading:
          'How did the catastrophic defeat at the Battle of Bouvines shatter John’s authority?',
        bullets: ['Huge War Chest Emptied', 'Allies Smashed in France', 'Barons Refuse More Taxes'],
        focusClue:
          'Why did the total destruction of John’s French coalition leave him bankrupt, discredited, and defenceless at home?',
      },
      {
        step: 4,
        paraRef: '[4.4]',
        date: '15 June 1215',
        questionHeading:
          'What revolutionary legal principle was enshrined in Clause 39 at Runnymede?',
        bullets: [
          'Barons Draw Their Swords',
          'No Jail Without Fair Trial',
          'King Bound by the Law',
        ],
        focusClue:
          'How did declaring that "no free man shall be imprisoned except by lawful judgment of peers" invent the Rule of Law?',
      },
      {
        step: 5,
        paraRef: '[4.5]',
        date: '1215–1216',
        questionHeading:
          'Why did the First Barons’ War erupt immediately after the charter was sealed?',
        bullets: [
          'Pope Tears Up the Treaty',
          'French Prince Invited In',
          'Crown Jewels Lost in the Wash',
        ],
        focusClue:
          'Why did John instantly convince the Pope to annul Magna Carta as a shameful agreement extracted by force?',
      },
    ],
    vocabPrompt:
      'Define <strong>The Rule of Law</strong> and explain how Clause 39 of Magna Carta restricted arbitrary royal power:',
    rightPage: {
      type: 'narrative_8',
      tariff: 'Question 2: Narrative Account [8 marks &bull; 12 mins]',
      badge: 'NARRATIVE ACCOUNT',
      examStem:
        'Write a narrative account analysing the key events leading from the loss of Normandy (1204) to the sealing of Magna Carta (1215). [8 marks]',
      stimulus: [
        'The loss of Normandy and heavy scutage taxation',
        'The defeat at the Battle of Bouvines (1214)',
      ],
      connectives:
        'Initially, the sequence began when... &bull; Following this, the next development was... &bull; A turning point occurred when... &bull; Consequently... &bull; This ultimately resulted in...',
      wordBank:
        'Normandy &bull; scutage &bull; Pope Innocent III &bull; Battle of Bouvines (1214) &bull; Runnymede &bull; Clause 39 &bull; Magna Carta &bull; Robert Fitzwalter',
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
        paraRef: '[5.1]',
        date: '1348–1349',
        questionHeading: 'How did the Black Death wipe out nearly half the population of England?',
        bullets: [
          'Sailor Ship at Weymouth',
          'Buboes Under the Arms',
          'Nearly Half the Country Dead',
        ],
        focusClue:
          'Why were medieval doctors completely helpless against bubonic and pneumonic plague, blaming foul mists (miasma)?',
      },
      {
        step: 2,
        paraRef: '[5.2]',
        date: '1349–1351',
        questionHeading:
          'Why did demographic collapse trigger an unprecedented economic power shift?',
        bullets: [
          'Empty Village Cottages',
          'Wheat Rotting on the Ground',
          'Workers Demanding Double Pay',
        ],
        focusClue:
          'How did the sudden shortage of farm labourers allow serfs to demand double wages or leave their manors?',
      },
      {
        step: 3,
        paraRef: '[5.3]',
        date: '1351–1377',
        questionHeading:
          'How did the Statute of Labourers and sumptuary laws provoke bitter class resentment?',
        bullets: [
          'Wages Frozen by Lords',
          'Iron "F" Burned on Foreheads',
          'Banned from Wearing Fur',
        ],
        focusClue:
          'Why did the ruling class try to use statutory laws and dress restrictions to force peasants back into feudal submission?',
      },
      {
        step: 4,
        paraRef: '[5.4]',
        date: '1377–1381',
        questionHeading:
          'Why did the regressive Poll Taxes of 1377–1381 spark armed peasant uprising?',
        bullets: [
          'French War Debt Bill',
          'Twelve Pence from Every Head',
          'Tax Collector Chased with Pitchforks',
        ],
        focusClue:
          'Why did making a starving farm labourer pay the exact same tax as an earl spark furious tax resistance in Essex and Kent?',
      },
      {
        step: 5,
        paraRef: '[5.5]',
        date: 'June 1381',
        questionHeading:
          'How did the showdown at Smithfield shatter the myth of unquestioned feudal authority?',
        bullets: [
          'Peasants Swarm the Capital',
          'Tyler Stabbed at the Peace Talks',
          'Boy King Promises Freedom',
        ],
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
        'To a large extent, it can be argued that... &bull; On the one hand, a key factor was... &bull; Furthermore, this was significant because... &bull; On the other hand, an alternative perspective is that... &bull; In conclusion, the decisive reason why... because...',
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

// Helper to render a dedicated Lined Notes Page with margin (Pages 14 & 15 of 16-page workbook)
function renderNotesPage(pageNum, quip) {
  const isEven = pageNum % 2 === 0;
  const pageClass = isEven ? 'verso-page' : 'recto-page';

  // 32 ruled lines for standard ~8mm pitch filling the page perfectly
  const numLines = 32;
  let linesHtml = '';
  for (let i = 0; i < numLines; i++) {
    linesHtml += `          <div class="note-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>\n`;
  }

  return `
  <!-- PAGE ${pageNum}: NOTES PAGE -->
  <div class="page page-container ${pageClass}" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Notes Header -->
      <div style="border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 5px;">
        <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 13pt; color: #000000; text-transform: uppercase; font-weight: 900; letter-spacing: 0.5px;">
          Notes
        </h2>
      </div>

      <!-- Ruled Lined Canvas with Left Margin (Exercise Book Standard) -->
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0; position: relative; border-top: 1.2px solid #000000; margin-bottom: 4px;">
        <!-- Vertical Margin Line (26mm from left edge of lines) - British Exercise Book Standard Margin -->
        <div style="position: absolute; top: 0; bottom: 0; left: 26mm; width: 1.5px; background: #000000; z-index: 2;"></div>
        
        <!-- Ruled Horizontal Lines (Standard 8mm school pitch, flex-filled) -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0;">
${linesHtml}        </div>
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
// LEFT PAGE RENDERER: 5-STAGE CHRONOLOGICAL INQUIRY SPINE (HIGH-CONTRAST MONO)
// ============================================================================
function renderSpinePage(cfg, pageNum) {
  const stagesHtml = cfg.stages
    .map((st) => {
      // 3 Spaced-out trigger terms, each aligned 1-to-1 with pairs of ruled lines
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
      return `
        <div class="spine-stage-block" style="display: flex; flex-direction: column; flex: 1; min-height: 0; margin-bottom: 2.5px; border: 1.2px solid #000000; border-radius: 2px; overflow: hidden; background: #ffffff;">
          
          <!-- Full-Width Banner with Key Question Across Page (Strict Single-Line Fit) -->
          <div class="stage-banner" style="background: #000000; color: #ffffff; padding: 2px 7px; display: flex; align-items: center; border-bottom: 1.2px solid #000000; min-height: 20px; box-sizing: border-box;">
            <div style="display: flex; align-items: center; gap: 6px; min-width: 0; flex: 1; overflow: hidden;">
              <span style="background: #ffffff; color: #000000; font-family: 'Inter', sans-serif; font-size: 8.2pt; font-weight: 900; padding: 0.6px 6px; border-radius: 2px; white-space: nowrap; flex-shrink: 0;">
                ${st.step}
              </span>
              <span style="font-family: 'Inter', sans-serif; font-size: 8.4pt; font-weight: 800; color: #ffffff; white-space: nowrap; flex-shrink: 0;">
                ${st.date}
              </span>
              <span style="color: #ffffff; font-size: 7.5pt; flex-shrink: 0;">&bull;</span>
              <span style="font-family: 'Inter', sans-serif; font-size: 9.2pt; font-weight: 800; color: #ffffff; white-space: nowrap; overflow: hidden; letter-spacing: -0.1px;">
                ${st.questionHeading}
              </span>
            </div>
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

  const isEven = pageNum % 2 === 0;
  const pageClass = isEven ? 'verso-page' : 'recto-page';

  return `
  <!-- LESSON SPREAD: ${isEven ? 'LEFT PAGE (VERSO)' : 'RIGHT PAGE (RECTO)'} • CHRONOLOGICAL INQUIRY SPINE -->
  <div class="page page-container ${pageClass}" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      
      <!-- Lesson Header with Inquiry Question Title (Expanded for High Legibility) -->
      <div style="border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 4px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 8.4pt; font-weight: 900; letter-spacing: 0.5px; text-transform: uppercase; background: #000000; color: #ffffff; border: 1.2px solid #000000; padding: 2px 8px; border-radius: 2px;">
            ENQUIRY ${cfg.lessonNum} &bull; LESSON NOTEBOOK
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 8.2pt; font-weight: 800; text-transform: uppercase; color: #000000;">
            YEAR 7 &bull; MEDIEVAL ENGLAND: 1066–1485
          </span>
        </div>
        <h2 style="font-family: 'Playfair Display', serif; font-size: 13.0pt; color: #000000; margin: 2px 0 2px 0; font-weight: 900; line-height: 1.22;">
          ${cfg.enquiryQuestion}
        </h2>
      </div>

      <!-- Chronological Inquiry Spine & Note-Taking Canvas -->
      <div style="flex: 1; display: flex; flex-direction: column; min-height: 0; margin-top: 1px;">
        <div style="display: flex; flex-direction: column; flex: 1; min-height: 0; gap: 0;">
          ${stagesHtml}
        </div>
      </div>

      ${renderFooterStrip(pageNum, cfg.leftPageQuip, 16)}
    </div>
  </div>`;
}

// ============================================================================
// RIGHT PAGE RENDERER: ROTATING DISCIPLINARY SKILLS WRITING (MONOCHROME INTERIOR)
// ============================================================================
function renderRightPage(cfg, pageNum) {
  const rp = cfg.rightPage;
  const isEven = pageNum % 2 === 0;
  const pageClass = isEven ? 'verso-page' : 'recto-page';

  if (rp.type === 'single_12') {
    // 12-MARK CAUSAL / EVALUATIVE ESSAY WRITING (ENQUIRIES 1 AND 5)
    return `
  <!-- LESSON SPREAD: ${isEven ? 'LEFT PAGE (VERSO)' : 'RIGHT PAGE (RECTO)'} • 12-MARK EXTENDED ESSAY -->
  <div class="page page-container ${pageClass}" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Exam Header -->
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 5px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 12.0pt; color: #000000; margin: 0; font-weight: 900;">
          ${rp.tariff}
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 8.2pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; background: #000000; color: #ffffff; padding: 2px 7px; border-radius: 2px;">
          Extended Writing Practice
        </span>
      </div>

      <!-- Question Stem & Stimulus Box -->
      <div style="border: 1px solid #000000; border-left: 3.5px solid #000000; border-radius: 3px; padding: 5px 9px; background: #ffffff; margin-bottom: 5px;">
        <div style="font-family: 'Playfair Display', serif; font-size: 11.6pt; font-weight: 900; color: #000000; margin-bottom: 4px; line-height: 1.32;">
          ${rp.examStem}
        </div>
        <div style="display: flex; align-items: center; gap: 8px; font-family: 'Inter', sans-serif; font-size: 8.4pt; color: #000000;">
          <strong style="color: #000000;">Stimulus:</strong>
          <span style="border: 1.2px solid #000000; padding: 2px 8px; border-radius: 2px; font-weight: 800; color: #000000; background: #ffffff;">${rp.stimulus[0]}</span>
          <span style="border: 1.2px solid #000000; padding: 2px 8px; border-radius: 2px; font-weight: 800; color: #000000; background: #ffffff;">${rp.stimulus[1]}</span>
          <span style="font-style: italic; color: #000000;">(You must also use information of your own)</span>
        </div>
      </div>

      ${
        rp.structureStrip
          ? `
      <!-- Evaluative Structure Strip -->
      <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 3px 6px; background: #ffffff; margin-bottom: 5px; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px;">
        ${rp.structureStrip
          .map(
            (col) => `
          <div style="border-right: 1px solid #000000; padding-right: 4px;">
            <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; color: #000000;">${col.col}</div>
            <div style="font-family: 'Georgia', serif; font-size: 6.8pt; line-height: 1.18; color: #000000; margin-top: 1px;">${col.text}</div>
          </div>`,
          )
          .join('')}
      </div>`
          : ''
      }

      <!-- Connectives & Key Vocabulary Bank -->
      <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 5px 9px; background: #ffffff; margin-bottom: 6px; display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
        <div>
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; font-weight: 900; text-transform: uppercase; display: block; margin-bottom: 2px; color: #000000;">Analytical Connectives:</strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 8.6pt; font-style: italic; line-height: 1.28; display: block; color: #000000;">${rp.connectives}</span>
        </div>
        <div>
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; font-weight: 900; text-transform: uppercase; display: block; margin-bottom: 2px; color: #000000;">Key Vocabulary Bank:</strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 8.6pt; line-height: 1.28; display: block; color: #000000;">${rp.wordBank}</span>
        </div>
      </div>

      <!-- Ruled Task Lines for Extended Writing (20 Lines • Calibrated ~9.4mm British Pitch) -->
      <div style="font-family: 'Inter', sans-serif; font-size: 8.2pt; font-style: italic; color: #000000; margin-bottom: 2px;">
        <strong style="color: #000000;">Task:</strong> Using the vocabulary and connectives above, write your analytical response below:
      </div>
      <div style="display: flex; flex-direction: column; gap: 0; margin-bottom: 4px; flex: 1; min-height: 0;">
        ${Array(20)
          .fill(
            '<div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>',
          )
          .join('')}
      </div>

      <!-- Timeline Mission Box -->
      <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 7px; background: #ffffff; margin-top: 2px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px; border-bottom: 1px solid #000000; padding-bottom: 1.5px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 900; background: #000000; color: #ffffff; padding: 1.5px 6px; border-radius: 2px; text-transform: uppercase; letter-spacing: 0.3px;">
            🎨 ${rp.timelineMissionTitle || 'Timeline Mission'}
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; color: #000000;">
            Turn to Centrefold &bull; Pages 8–9 &rarr;
          </span>
        </div>
        <div style="font-family: 'Georgia', serif; font-size: 8.0pt; color: #000000; line-height: 1.26;">
          ${rp.timelineMission}
        </div>
      </div>

      ${renderFooterStrip(pageNum, cfg.rightPageQuip, 16)}
    </div>
  </div>`;
  } else if (rp.type === 'interpretations') {
    // DUAL HISTORIOGRAPHICAL INTERPRETATIONS WRITING (ENQUIRY 3 - PAGE 7)
    const stemsB = rp.stemsB || '';
    const stemsC = rp.stemsC || '';

    return `
  <!-- LESSON SPREAD: ${isEven ? 'LEFT PAGE (VERSO)' : 'RIGHT PAGE (RECTO)'} • CONTRASTING INTERPRETATIONS -->
  <div class="page page-container ${pageClass}" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Exam Header -->
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 4px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 11.4pt; color: #000000; margin: 0; font-weight: 900;">
          ${rp.tariff}
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 8.0pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; background: #000000; color: #ffffff; padding: 1.5px 6px; border-radius: 2px;">
          HISTORIOGRAPHICAL ANALYSIS
        </span>
      </div>

      <!-- Competing Historical Interpretations Box -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 4px;">
        <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 4px 7px; background: #ffffff;">
          <div style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 900; color: #000000; text-transform: uppercase; border-bottom: 1px solid #000000; padding-bottom: 1.5px; margin-bottom: 2px;">
            Interpretation 1 &bull; ${rp.interpretation1.author}
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 7.6pt; font-style: italic; color: #000000; line-height: 1.25;">
            ${rp.interpretation1.text}
          </div>
        </div>
        <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 4px 7px; background: #ffffff;">
          <div style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 900; color: #000000; text-transform: uppercase; border-bottom: 1px solid #000000; padding-bottom: 1.5px; margin-bottom: 2px;">
            Interpretation 2 &bull; ${rp.interpretation2.author}
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 7.6pt; font-style: italic; color: #000000; line-height: 1.25;">
            ${rp.interpretation2.text}
          </div>
        </div>
      </div>

      <!-- Task B: Question 3(b) -->
      <div style="flex: 1.15; display: flex; flex-direction: column; min-height: 0; margin-bottom: 2px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
          <div style="font-family: 'Playfair Display', serif; font-size: 10.4pt; font-weight: 900; color: #000000;">
            ${rp.questionB}
          </div>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; background: #000000; color: #ffffff; padding: 1px 5px; border-radius: 2px; text-transform: uppercase;">
            PART B
          </span>
        </div>
        ${stemsB ? `<div style="border: 1.2px solid #000000; border-radius: 3px; padding: 2.5px 6px; background: #ffffff; font-family: 'Inter', sans-serif; font-size: 8.2pt; line-height: 1.24; margin-bottom: 2px;"><strong style="color: #000000;">Sentence Stems:</strong> <span style="color: #000000;">${stemsB}</span></div>` : ''}
        <div style="font-family: 'Inter', sans-serif; font-size: 7.8pt; font-style: italic; color: #000000; margin-bottom: 1px;">
          <strong style="color: #000000;">Task:</strong> Write your comparison of Interpretations 1 and 2 below:
        </div>
        <div style="display: flex; flex-direction: column; gap: 0; flex: 1; min-height: 0;">
          ${Array(12)
            .fill(
              '<div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>',
            )
            .join('')}
        </div>
      </div>

      <!-- CLEAN SOLID SECTION SEPARATOR -->
      <div style="border-top: 1.5px solid #000000; margin: 4px 0 4px 0;"></div>

      <!-- Task C: Question 3(c) -->
      <div style="flex: 1.15; display: flex; flex-direction: column; justify-content: space-between; min-height: 0;">
        <div style="display: flex; flex-direction: column; flex: 1; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
            <div style="font-family: 'Playfair Display', serif; font-size: 10.4pt; font-weight: 900; color: #000000;">
              ${rp.questionC}
            </div>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; background: #000000; color: #ffffff; padding: 1px 5px; border-radius: 2px; text-transform: uppercase;">
              PART C
            </span>
          </div>
          ${stemsC ? `<div style="border: 1.2px solid #000000; border-radius: 3px; padding: 2.5px 6px; background: #ffffff; font-family: 'Inter', sans-serif; font-size: 8.2pt; line-height: 1.24; margin-bottom: 2px;"><strong style="color: #000000;">Scaffolded Sentence Stems:</strong> <span style="color: #000000;">${stemsC}</span></div>` : ''}
          <div style="font-family: 'Inter', sans-serif; font-size: 7.8pt; font-style: italic; color: #000000; margin-bottom: 1px;">
            <strong style="color: #000000;">Task:</strong> Explain why the interpretations differ by analysing their different points of focus:
          </div>
          <div style="display: flex; flex-direction: column; gap: 0; flex: 1; min-height: 0; margin-bottom: 3px;">
            ${Array(12)
              .fill(
                '<div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>',
              )
              .join('')}
          </div>
        </div>

        <!-- Timeline Mission Box -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 3.5px 7px; background: #ffffff; margin-top: 2px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px; border-bottom: 1px solid #000000; padding-bottom: 1.5px;">
            <span style="font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 900; background: #000000; color: #ffffff; padding: 1.5px 6px; border-radius: 2px; text-transform: uppercase; letter-spacing: 0.3px;">
              🎨 ${rp.timelineMissionTitle || 'Timeline Mission'}
            </span>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; color: #000000;">
              Turn to Centrefold &bull; Pages 8–9 &rarr;
            </span>
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 8.0pt; color: #000000; line-height: 1.26;">
            ${rp.timelineMission}
          </div>
        </div>
      </div>

      ${renderFooterStrip(pageNum, cfg.rightPageQuip, 16)}
    </div>
  </div>`;
  } else if (rp.type === 'narrative_8') {
    // SINGLE 8-MARK NARRATIVE ACCOUNT WRITING (ENQUIRY 4: MAGNA CARTA - PAGE 11)
    return `
  <!-- LESSON SPREAD: ${isEven ? 'LEFT PAGE (VERSO)' : 'RIGHT PAGE (RECTO)'} • 8-MARK NARRATIVE ACCOUNT -->
  <div class="page page-container ${pageClass}" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Exam Header -->
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 5px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 12.0pt; color: #000000; margin: 0; font-weight: 900;">
          ${rp.tariff}
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 8.2pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; background: #000000; color: #ffffff; padding: 2px 7px; border-radius: 2px;">
          ${rp.badge || 'NARRATIVE ACCOUNT'}
        </span>
      </div>

      <!-- Question Stem & Stimulus Box -->
      <div style="border: 1px solid #000000; border-left: 3.5px solid #000000; border-radius: 3px; padding: 5px 9px; background: #ffffff; margin-bottom: 5px;">
        <div style="font-family: 'Playfair Display', serif; font-size: 11.6pt; font-weight: 900; color: #000000; margin-bottom: 4px; line-height: 1.32;">
          ${rp.examStem}
        </div>
        <div style="display: flex; align-items: center; gap: 8px; font-family: 'Inter', sans-serif; font-size: 8.4pt; color: #000000;">
          <strong style="color: #000000;">Stimulus:</strong>
          <span style="border: 1.2px solid #000000; padding: 2px 8px; border-radius: 2px; font-weight: 800; color: #000000; background: #ffffff;">${rp.stimulus[0]}</span>
          <span style="border: 1.2px solid #000000; padding: 2px 8px; border-radius: 2px; font-weight: 800; color: #000000; background: #ffffff;">${rp.stimulus[1]}</span>
          <span style="font-style: italic; color: #000000;">(You must also use information of your own)</span>
        </div>
      </div>

      <!-- Chronological Connectives & Key Vocabulary Bank -->
      <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 5px 9px; background: #ffffff; margin-bottom: 6px; display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
        <div>
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; font-weight: 900; text-transform: uppercase; display: block; margin-bottom: 2px; color: #000000;">Chronological Connectives:</strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 8.6pt; font-style: italic; line-height: 1.28; display: block; color: #000000;">${rp.connectives}</span>
        </div>
        <div>
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; font-weight: 900; text-transform: uppercase; display: block; margin-bottom: 2px; color: #000000;">Key Vocabulary Bank:</strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 8.6pt; line-height: 1.28; display: block; color: #000000;">${rp.wordBank}</span>
        </div>
      </div>

      <!-- Task Instructions -->
      <div style="font-family: 'Inter', sans-serif; font-size: 8.2pt; font-style: italic; color: #000000; margin-bottom: 2px;">
        <strong style="color: #000000;">Task:</strong> Using the vocabulary and connectives above, write your continuous narrative account below:
      </div>
      <div style="display: flex; flex-direction: column; gap: 0; margin-bottom: 4px; flex: 1; min-height: 0;">
        ${Array(22)
          .fill(
            '<div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>',
          )
          .join('')}
      </div>

      <!-- Timeline Mission Box -->
      <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 7px; background: #ffffff; margin-top: 2px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px; border-bottom: 1px solid #000000; padding-bottom: 1.5px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 900; background: #000000; color: #ffffff; padding: 1.5px 6px; border-radius: 2px; text-transform: uppercase; letter-spacing: 0.3px;">
            🎨 ${rp.timelineMissionTitle || 'Timeline Mission'}
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; color: #000000;">
            Turn to Centrefold &bull; Pages 8–9 &rarr;
          </span>
        </div>
        <div style="font-family: 'Georgia', serif; font-size: 8.0pt; color: #000000; line-height: 1.26;">
          ${rp.timelineMission}
        </div>
      </div>

      ${renderFooterStrip(pageNum, cfg.rightPageQuip, 16)}
    </div>
  </div>`;
  } else {
    // TWO-PART ROTATING SKILLS WRITING (SPLIT: PART A + PART B - ENQUIRY 2: CASTLES, TERROR & DOMESDAY - PAGE 5)
    const partA = rp.partA || {};
    const partB = rp.partB || {};

    return `
  <!-- LESSON SPREAD: ${isEven ? 'LEFT PAGE (VERSO)' : 'RIGHT PAGE (RECTO)'} • ROTATING DISCIPLINARY SKILLS -->
  <div class="page page-container ${pageClass}" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      
      <!-- PART A: SHORT-FORM DISCIPLINARY PRACTICE [4 MARKS] -->
      <div style="margin-bottom: 2px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 3px;">
          <h2 style="font-family: 'Playfair Display', serif; font-size: 11.4pt; color: #000000; margin: 0; font-weight: 900;">
            ${partA.tariff || 'Question 1: Disciplinary Drill'}
          </h2>
          <span style="font-family: 'Inter', sans-serif; font-size: 8.0pt; font-weight: 800; background: #000000; color: #ffffff; border: 1px solid #000000; padding: 1.5px 6px; border-radius: 2px; text-transform: uppercase;">
            ${partA.badge || 'DISCIPLINARY DRILL'}
          </span>
        </div>
        <p style="font-family: 'Playfair Display', serif; font-size: 10.8pt; font-weight: 900; color: #000000; margin: 0 0 3px 0; line-height: 1.28;">
          ${partA.question || ''}
        </p>
        ${partA.hint ? `<div style="font-family: 'Inter', sans-serif; font-size: 8.0pt; font-style: italic; color: #000000; margin-bottom: 2px;">${partA.hint}</div>` : ''}
        ${partA.stems ? `<div style="font-family: 'Inter', sans-serif; font-size: 8.5pt; font-weight: 700; margin-bottom: 2px; color: #000000; line-height: 1.24;"><strong style="color: #000000;">Sentence Stems:</strong> ${partA.stems}</div>` : ''}
        <div class="ruled-lines-block">
          <div class="task-line"></div>
          <div class="task-line"></div>
          <div class="task-line"></div>
          <div class="task-line"></div>
        </div>
      </div>

      <!-- CLEAN SOLID SECTION SEPARATOR -->
      <div style="border-top: 1.5px solid #000000; margin: 5px 0 5px 0;"></div>

      <!-- PART B: EXTENDED SKILL WRITING [4 MARKS] -->
      <div style="flex: 1; display: flex; flex-direction: column; min-height: 0;">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1.5px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
            <h2 style="font-family: 'Playfair Display', serif; font-size: 11.4pt; color: #000000; margin: 0; font-weight: 900;">
              ${partB.tariff || 'Question 2: Structured Writing'}
            </h2>
            <span style="font-family: 'Inter', sans-serif; font-size: 8.0pt; font-weight: 800; background: #000000; color: #ffffff; padding: 1.5px 6px; border-radius: 2px; text-transform: uppercase;">
              ${partB.badge || 'STRUCTURED WRITING'}
            </span>
          </div>
          <p style="font-family: 'Playfair Display', serif; font-size: 10.8pt; font-weight: 900; color: #000000; margin: 0 0 4px 0; line-height: 1.28;">
            ${partB.question || ''}
          </p>
          ${partB.hint ? `<div style="font-family: 'Inter', sans-serif; font-size: 8.0pt; font-style: italic; color: #000000; margin-bottom: 2px;">${partB.hint}</div>` : ''}
          ${
            partB.stimulus
              ? `
          <div style="display: flex; align-items: center; gap: 6px; font-family: 'Inter', sans-serif; font-size: 8.4pt; color: #000000; margin-bottom: 3px;">
            <strong style="color: #000000;">Stimulus:</strong>
            <span style="border: 1.2px solid #000000; padding: 1.5px 7px; border-radius: 2px; font-weight: 800; color: #000000; background: #ffffff;">${partB.stimulus[0]}</span>
            <span style="border: 1.2px solid #000000; padding: 1.5px 7px; border-radius: 2px; font-weight: 800; color: #000000; background: #ffffff;">${partB.stimulus[1]}</span>
          </div>`
              : ''
          }

          <!-- Connectives & Word Bank -->
          <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 4px 8px; background: #ffffff; margin-bottom: 3px; font-family: 'Inter', sans-serif; font-size: 8.3pt; line-height: 1.26;">
            <div><strong style="color: #000000;">Analytical Connectives:</strong> <em style="color: #000000;">${partB.connectives}</em></div>
            <div style="margin-top: 2px;"><strong style="color: #000000;">Key Terms:</strong> <span style="color: #000000;">${partB.wordBank}</span></div>
          </div>
        </div>

        <!-- Task Instruction Prompt -->
        <div style="font-family: 'Inter', sans-serif; font-size: 8.2pt; font-style: italic; color: #000000; margin: 3px 0 2px 0;">
          <strong style="color: #000000;">Task:</strong> Using the vocabulary and connectives above, write your structured response below:
        </div>

        <!-- Ruled Writing Lines (18 Lines • Generous ~8mm Pitch for Pupil Handwriting) -->
        <div style="display: flex; flex-direction: column; gap: 0; margin-bottom: 3px; flex: 1; min-height: 0;">
          ${Array(18)
            .fill(
              '<div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>',
            )
            .join('')}
        </div>

        <!-- Timeline Mission Box -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 3.5px 7px; background: #ffffff; margin-top: 3px; margin-bottom: 3px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px; border-bottom: 1px solid #000000; padding-bottom: 1.5px;">
            <span style="font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 900; background: #000000; color: #ffffff; padding: 1.5px 6px; border-radius: 2px; text-transform: uppercase; letter-spacing: 0.3px;">
              🎨 ${rp.timelineMissionTitle || 'Timeline Mission'}
            </span>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; color: #000000;">
              Turn to Centrefold &bull; Pages 8–9 &rarr;
            </span>
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 8.0pt; color: #000000; line-height: 1.26;">
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
      border-top: 0.8px solid #000000;
      padding-top: 1.5px;
      margin-top: 2px;
      font-family: 'Inter', sans-serif;
      font-size: 6.2pt;
      line-height: 1.15;
      color: #000000;
    }
    .footer-quip {
      font-style: italic;
      color: #000000;
      white-space: nowrap;
    }
    .footer-page-num {
      font-family: 'Inter', sans-serif;
      font-weight: 800;
      white-space: nowrap;
      color: #000000;
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
      <div style="border: 1.5px solid #0f284e; border-radius: 4px; padding: 7px 14px; background: #ffffff; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 14px; align-items: center; margin-bottom: 8px;">
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 9pt; color: #0f284e; text-transform: uppercase; margin-right: 8px;">Pupil Name:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #0f284e; height: 16px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 9pt; color: #0f284e; text-transform: uppercase; margin-right: 8px;">Class:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #0f284e; height: 16px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 9pt; color: #0f284e; text-transform: uppercase; margin-right: 8px;">Teacher:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #0f284e; height: 16px;"></div>
        </div>
      </div>

      <!-- Main Title Block -->
      <div style="text-align: center; margin: 2px 0 6px 0;">
        <div style="display: inline-block; border: 1.5px solid #0f284e; color: #ffffff; background: #0f284e; font-family: 'Inter', sans-serif; font-size: 8.5pt; font-weight: 800; padding: 2.5px 12px; border-radius: 3px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">
          Year 7 Enquiry &bull; 1066–1485
        </div>
        <h1 style="font-family: 'Playfair Display', serif; font-size: 26pt; line-height: 1.15; color: #0f284e; margin: 2px 0 3px 0; font-weight: 900;">
          Medieval England: 1066–1485
        </h1>
        <div style="font-family: 'Georgia', serif; font-size: 11pt; color: #334155; font-style: italic; font-weight: 600;">
          Conquest, Castles, Church &amp; The Shattering of Feudalism
        </div>
      </div>

      <!-- Prominent Primary Visual Source Centerpiece (Enlarged Bayeux Tapestry in Authentic Color + Disciplinary Iconography Plate) -->
      <div style="margin: 2px 0 4px 0; border: 1.5px solid #0f284e; border-radius: 4px; overflow: hidden; background: #ffffff;">
        <div style="display: grid; grid-template-columns: 70mm 1fr; background: #ffffff;">
          <!-- Left: Full Visual Canvas in Rich Authentic Color (Enlarged Display) -->
          <div style="background: #fcfbf9; border-right: 1.5px solid #0f284e; display: flex; justify-content: center; align-items: center; padding: 2px 4px;">
            <img src="${coverImgBase64}" alt="The Bayeux Tapestry &bull; Battle of Hastings" style="height: 118mm; width: auto; max-width: 100%; object-fit: contain; display: block; margin: 0 auto; border: 1.2px solid #0f284e; border-radius: 2px; box-shadow: 0 2px 6px rgba(15,40,78,0.22);">
          </div>
          <!-- Right: Visual Iconography & Historical Significance for Year 7 (Enlarged Typography) -->
          <div style="padding: 5px 10px; display: flex; flex-direction: column; justify-content: space-between; background: #ffffff; box-sizing: border-box;">
            <!-- 1. Header -->
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.2px solid #0f284e; padding-bottom: 2px;">
              <span style="font-family: 'Inter', sans-serif; font-size: 8.4pt; font-weight: 900; text-transform: uppercase; color: #0f284e; letter-spacing: 0.5px;">
                Primary Visual Evidence &bull; Anglo-Norman Embroidery
              </span>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 700; color: #64748b;">
                The Bayeux Tapestry (c. 1070s)
              </span>
            </div>

            <!-- 2. Statecraft Context -->
            <p style="font-family: 'Georgia', serif; font-size: 7.9pt; line-height: 1.25; color: #1e293b; margin: 0;">
              Commissioned by Bishop Odo of Bayeux within a decade of 1066, this 70-metre embroidered linen masterpiece records the Norman Conquest as both triumphant statecraft and a profound human catastrophe:
            </p>

            <!-- 3. Four Core Propaganda Features -->
            <div style="display: flex; flex-direction: column; gap: 2.5px;">
              <div style="border-left: 2.5px solid #0f284e; padding-left: 6px;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 7.5pt; text-transform: uppercase; color: #0f284e;">1. The Saxon Shield Wall at Senlac:</strong>
                <div style="font-family: 'Georgia', serif; font-size: 7.2pt; line-height: 1.20; color: #222222;">
                  Interlocking wooden round shields and Danish two-handed battleaxes held the ridge against hours of Norman cavalry charges and arrow storms.
                </div>
              </div>
              <div style="border-left: 2.5px solid #0f284e; padding-left: 6px;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 7.5pt; text-transform: uppercase; color: #0f284e;">2. Norman Heavy Cavalry with Couched Lances:</strong>
                <div style="font-family: 'Georgia', serif; font-size: 7.2pt; line-height: 1.20; color: #222222;">
                  Iron stirrups and high pommel saddles allowed Norman knights to deliver devastating shock charges, transforming European medieval battle tactics.
                </div>
              </div>
              <div style="border-left: 2.5px solid #0f284e; padding-left: 6px;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 7.5pt; text-transform: uppercase; color: #0f284e;">3. Duke William Unmasks His Helmet:</strong>
                <div style="font-family: 'Georgia', serif; font-size: 7.2pt; line-height: 1.20; color: #222222;">
                  When panic spread that Duke William was dead, he pushed back his nasal-helmet shouting: <em>‘Look at me! I live and by God’s grace shall conquer!’</em>
                </div>
              </div>
              <div style="border-left: 2.5px solid #0f284e; padding-left: 6px;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 7.5pt; text-transform: uppercase; color: #0f284e;">4. The Slain King &amp; The Marginal Dead:</strong>
                <div style="font-family: 'Georgia', serif; font-size: 7.2pt; line-height: 1.20; color: #222222;">
                  King Harold is struck down beside his golden dragon standard; the bottom frieze shows stripped armor, severed limbs, and dead warriors.
                </div>
              </div>
            </div>

            <!-- 4. Three-Pillar Propaganda Decoding Matrix -->
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 4px; padding-top: 2px; border-top: 1px solid #cbd5e1;">
              <div style="border: 1px solid #0f284e; border-radius: 2px; padding: 2px 5px; background: #f0f4f9;">
                <div style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 900; text-transform: uppercase; color: #0f284e;">Couched Lance</div>
                <div style="font-family: 'Georgia', serif; font-size: 6.7pt; line-height: 1.15; color: #1e293b; margin-top: 1px;">Shock cavalry breaking infantry shield walls.</div>
              </div>
              <div style="border: 1px solid #0f284e; border-radius: 2px; padding: 2px 5px; background: #f0f4f9;">
                <div style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 900; text-transform: uppercase; color: #0f284e;">Papal Banner</div>
                <div style="font-family: 'Georgia', serif; font-size: 6.7pt; line-height: 1.15; color: #1e293b; margin-top: 1px;">Holy crusade moral blessing from Rome.</div>
              </div>
              <div style="border: 1px solid #0f284e; border-radius: 2px; padding: 2px 5px; background: #f0f4f9;">
                <div style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 900; text-transform: uppercase; color: #0f284e;">Marginal Frieze</div>
                <div style="font-family: 'Georgia', serif; font-size: 6.7pt; line-height: 1.15; color: #1e293b; margin-top: 1px;">Brutal human carnage of Norman conquest.</div>
              </div>
            </div>

            <!-- 5. Disciplinary Significance Anchor -->
            <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #1e293b; line-height: 1.22; background: #f0f4f9; border-left: 2.5px solid #0f284e; padding: 2.5px 7px;">
              <strong style="text-transform: uppercase; color: #0f284e;">Disciplinary Significance:</strong> Embroidered by English seamstresses under Norman rule, the tapestry serves both as Norman triumphal propaganda and a poignant Anglo-Saxon testimony to national defeat.
            </div>

            <!-- 6. Targeted Disciplinary Hinge Question -->
            <div style="background: #ffffff; border: 1.2px solid #0f284e; border-radius: 3px; padding: 3px 7px;">
              <div style="display: flex; justify-content: space-between; align-items: baseline;">
                <span style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 900; text-transform: uppercase; color: #0f284e;">Disciplinary Hinge Question:</span>
                <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; color: #64748b; text-transform: uppercase;">Historical Evaluation</span>
              </div>
              <div style="font-family: 'Georgia', serif; font-size: 7.3pt; font-style: italic; color: #1e293b; line-height: 1.20; margin-top: 1px;">
                Does the Bayeux Tapestry celebrate William’s conquest as the righteous will of God, or does its vivid marginal art subtly subvert Norman triumph by mourning the destruction of Saxon England?
              </div>
            </div>
          </div>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #ffffff; padding: 3px 8px; border-top: 1.5px solid #0f284e; background: #0f284e;">
          <span><strong>Primary Visual Evidence:</strong> <em>Battle of Hastings Detail &bull; The Death of King Harold</em> &bull; Bayeux Tapestry Museum (c. 1070–1077)</span>
          <span style="font-weight: 700; color: #93c5fd; white-space: nowrap;">BAYEUX ARCHIVE &bull; UNESCO MEMORY OF THE WORLD</span>
        </div>
      </div>

      <!-- Course Specification Curriculum Tracking Table -->
      <div style="border: 1.5px solid #0f284e; border-radius: 4px; overflow: hidden; margin: 3px 0 4px 0;">
        <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif;">
          <thead>
            <tr style="border-bottom: 1.5px solid #0f284e; background: #0f284e;">
              <th style="padding: 5px 8px; text-align: left; font-size: 8.2pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; border-right: 1.2px solid rgba(255,255,255,0.25); color: #ffffff;">
                Course Specification &bull; Key Enquiry Sequence
              </th>
              <th style="padding: 5px 4px; width: 62px; text-align: center; font-size: 7.8pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; border-right: 1.2px solid rgba(255,255,255,0.25); color: #ffffff;">
                Learnt
              </th>
              <th style="padding: 5px 4px; width: 62px; text-align: center; font-size: 7.8pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; color: #ffffff;">
                Revised
              </th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 6.2px 8px; border-right: 1.2px solid #cbd5e1;">
                <div style="font-size: 8.6pt; font-weight: 800; color: #0f284e; line-height: 1.20;">
                  Enquiry 1: 1066 &amp; The Battle of Hastings
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.6pt; font-style: italic; color: #334155; margin-top: 1px; line-height: 1.18;">
                  Why did William of Normandy win the Battle of Hastings in 1066, and how did Senlac Hill decide England's fate?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #cbd5e1;">
                <div style="width: 14px; height: 14px; border: 1.4px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 14px; height: 14px; border: 1.4px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 6.2px 8px; border-right: 1.2px solid #cbd5e1;">
                <div style="font-size: 8.6pt; font-weight: 800; color: #0f284e; line-height: 1.20;">
                  Enquiry 2: Castles, Terror &amp; Domesday
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.6pt; font-style: italic; color: #334155; margin-top: 1px; line-height: 1.18;">
                  How did 10,000 Normans subjugate 2 million Saxons through castles, the Harrying of the North, and the Domesday audit?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #cbd5e1;">
                <div style="width: 14px; height: 14px; border: 1.4px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 14px; height: 14px; border: 1.4px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 6.2px 8px; border-right: 1.2px solid #cbd5e1;">
                <div style="font-size: 8.6pt; font-weight: 800; color: #0f284e; line-height: 1.20;">
                  Enquiry 3: Crown vs Church: Henry II &amp; Thomas Becket
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.6pt; font-style: italic; color: #334155; margin-top: 1px; line-height: 1.18;">
                  Why did Henry II clash with Thomas Becket over canon law, and why did Becket's murder force royal penance?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #cbd5e1;">
                <div style="width: 14px; height: 14px; border: 1.4px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 14px; height: 14px; border: 1.4px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 6.2px 8px; border-right: 1.2px solid #cbd5e1;">
                <div style="font-size: 8.6pt; font-weight: 800; color: #0f284e; line-height: 1.20;">
                  Enquiry 4: Magna Carta (1215) &amp; Medieval Kingship
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.6pt; font-style: italic; color: #334155; margin-top: 1px; line-height: 1.18;">
                  Was Magna Carta a selfish barons’ tax revolt or a revolutionary foundation of due process and the Rule of Law?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #cbd5e1;">
                <div style="width: 14px; height: 14px; border: 1.4px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 14px; height: 14px; border: 1.4px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
            <tr>
              <td style="padding: 6.2px 8px; border-right: 1.2px solid #cbd5e1;">
                <div style="font-size: 8.6pt; font-weight: 800; color: #0f284e; line-height: 1.20;">
                  Enquiry 5: The Black Death (1348) &amp; The Peasants’ Revolt (1381)
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.6pt; font-style: italic; color: #334155; margin-top: 1px; line-height: 1.18;">
                  How did bubonic plague wipe out half of England's population and inspire Wat Tyler's rebellion to shatter serfdom?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #cbd5e1;">
                <div style="width: 14px; height: 14px; border: 1.4px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 14px; height: 14px; border: 1.4px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
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
        <div style="border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 5px;">
          <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 11.8pt; color: #000000; text-transform: uppercase; font-weight: 900; letter-spacing: 0.5px;">
            Living Timeline &bull; Part 1: Conquest, Castles &amp; The Church (1066–1170)
          </h2>
        </div>

        <div style="border: 1.2px solid #000000; border-radius: 3px; background: #ffffff; padding: 3px 6px; margin-bottom: 6px; font-family: 'Inter', sans-serif; font-size: 8.2pt; color: #000000;">
          <strong style="color: #000000;">Living Timeline Dual-Coding Protocol:</strong> Complete each milestone sketchpad using dual-coding (combining visual storytelling symbols, causal arrows, and dates) to master the chronological spine across the centre-fold.
        </div>
      </div>

      <!-- 4 Milestones with Open Drawing Area Across Full A4 Page -->
      <div style="display: flex; flex-direction: column; flex: 1; justify-content: space-between;">
        
        <!-- Milestone 1: 1066 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 10.0pt; font-weight: 900; color: #000000;">
              1066 &bull; The Battle of Hastings &amp; Norman Conquest
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; background: #000000; color: #ffffff; border: 1px solid #000000; padding: 1px 6px; border-radius: 2px;">Enquiry 1</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.8pt; color: #000000; margin: 0; line-height: 1.3;">
            Following victory over Vikings at Stamford Bridge, Harold’s exhausted army forms a shield wall atop Senlac Hill; Norman cavalry feigned retreats shatter the line, Harold is killed, and Duke William seizes the crown.
          </p>
        </div>

        <!-- Milestone 2: 1069–1070 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 10.0pt; font-weight: 900; color: #000000;">
              1069–1070 &bull; The Harrying of the North &amp; Motte-and-Bailey Castles
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; background: #000000; color: #ffffff; border: 1px solid #000000; padding: 1px 6px; border-radius: 2px;">Enquiry 2</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.8pt; color: #000000; margin: 0; line-height: 1.3;">
            William crushes Anglo-Saxon resistance by systematically burning crops, salting fields, and slaughtering livestock across Yorkshire, starving over 100,000 people while erecting 500 timber motte castles across the realm.
          </p>
        </div>

        <!-- Milestone 3: 1086 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 10.0pt; font-weight: 900; color: #000000;">
              1086 &bull; The Domesday Survey &amp; Portchester Stone Keep
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; background: #000000; color: #ffffff; border: 1px solid #000000; padding: 1px 6px; border-radius: 2px;">Enquiry 2</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.8pt; color: #000000; margin: 0; line-height: 1.3;">
            William commissions an exhaustive census of all land, mills, pigs, and taxable wealth in England; towering stone keeps like Portchester are erected to permanently seal Norman military and fiscal dominance.
          </p>
        </div>

        <!-- Milestone 4: 1170 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 10.0pt; font-weight: 900; color: #000000;">
              1170 &bull; The Murder of Thomas Becket at Canterbury
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; background: #000000; color: #ffffff; border: 1px solid #000000; padding: 1px 6px; border-radius: 2px;">Enquiry 3</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.8pt; color: #000000; margin: 0; line-height: 1.3;">
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
        <div style="border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 5px;">
          <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 11.8pt; color: #000000; text-transform: uppercase; font-weight: 900; letter-spacing: 0.5px;">
            Living Timeline &bull; Part 2: Magna Carta, The Black Death &amp; Revolt (1215–1381)
          </h2>
        </div>

        <div style="border: 1.2px solid #000000; border-radius: 3px; background: #ffffff; padding: 3px 6px; margin-bottom: 6px; font-family: 'Inter', sans-serif; font-size: 8.2pt; color: #000000;">
          <strong style="color: #000000;">Living Timeline Dual-Coding Protocol:</strong> Complete each milestone sketchpad using dual-coding (combining visual storytelling symbols, causal arrows, and dates) to master the chronological spine across the centre-fold.
        </div>
      </div>

      <!-- 4 Milestones with Open Drawing Area Across Full A4 Page -->
      <div style="display: flex; flex-direction: column; flex: 1; justify-content: space-between;">
        
        <!-- Milestone 5: 1215 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 10.0pt; font-weight: 900; color: #000000;">
              1215 &bull; The Sealing of Magna Carta at Runnymede
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; background: #000000; color: #ffffff; border: 1px solid #000000; padding: 1px 6px; border-radius: 2px;">Enquiry 4</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.8pt; color: #000000; margin: 0; line-height: 1.3;">
            Bankrupted by military defeat at Bouvines, King John is forced by rebel barons at Runnymede to seal Magna Carta; Clause 39 guarantees that no free man can be imprisoned or stripped of land without lawful trial by his peers.
          </p>
        </div>

        <!-- Milestone 6: 1265 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 10.0pt; font-weight: 900; color: #000000;">
              1265 &bull; Simon de Montfort’s Parliament &amp; The Commons
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; background: #000000; color: #ffffff; border: 1px solid #000000; padding: 1px 6px; border-radius: 2px;">Enquiry 4</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.8pt; color: #000000; margin: 0; line-height: 1.3;">
            Rebel leader Simon de Montfort summons two elected knights from each shire and two burgesses from each borough to Westminster alongside barons and bishops, creating the institutional prototype for the House of Commons.
          </p>
        </div>

        <!-- Milestone 7: 1348–1349 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 10.0pt; font-weight: 900; color: #000000;">
              1348–1349 &bull; The Black Death &amp; Demographic Collapse
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; background: #000000; color: #ffffff; border: 1px solid #000000; padding: 1px 6px; border-radius: 2px;">Enquiry 5</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.8pt; color: #000000; margin: 0; line-height: 1.3;">
            Bubonic plague carried by shipborne black rats enters Dorset and spreads nationwide, killing between 35% and 50% of the population; severe labour shortage enables surviving serfs to demand higher cash wages.
          </p>
        </div>

        <!-- Milestone 8: 1381 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 10.0pt; font-weight: 900; color: #000000;">
              1381 &bull; The Peasants’ Revolt &amp; The Smithfield Confrontation
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; background: #000000; color: #ffffff; border: 1px solid #000000; padding: 1px 6px; border-radius: 2px;">Enquiry 5</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.8pt; color: #000000; margin: 0; line-height: 1.3;">
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

  // Mirror to units directory
  const altUnitsDir = path.join(ROOT_DIR, 'units', 'medieval_england');
  if (fs.existsSync(altUnitsDir)) {
    fs.writeFileSync(path.join(altUnitsDir, 'pupil_workbook.html'), html, 'utf8');
    console.log(`[OK] HTML mirrored to: ${path.join(altUnitsDir, 'pupil_workbook.html')}`);
  }

  // Compile PDFs via Puppeteer
  const pdfDir = path.join(ROOT_DIR, 'public', 'pdfs');
  if (!fs.existsSync(pdfDir)) {
    fs.mkdirSync(pdfDir, { recursive: true });
  }
  const outPdfPath = path.join(pdfDir, 'medieval_england_pupil_workbook.pdf');

  const chromePath =
    process.env.CHROME_PATH ||
    (process.platform === 'win32'
      ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
      : undefined);

  console.log('Launching Puppeteer to generate high-resolution print PDF...');
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: chromePath,
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

  await browser.close();
  console.log(`[OK] Single canonical PDF compiled: ${outPdfPath}`);
}

if (require.main === module) {
  main().catch((err) => {
    console.error('Fatal error during workbook compilation:', err);
    process.exit(1);
  });
}

module.exports = { compileMedievalWorkbook };
