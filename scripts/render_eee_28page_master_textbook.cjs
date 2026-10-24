/**
 * scripts/render_eee_28page_master_textbook.cjs
 *
 * UNIFIED 28-PAGE PURE NARRATIVE CLASSROOM TEXTBOOK COMPILER
 * Option B4: Early Elizabethan England, 1558–1588 (Pearson Edexcel GCSE 9–1)
 *
 * Conforms strictly to the Disciplinary History Classroom Textbook Standard & GCSE Master Engine:
 * - 100% Pure narrative text (zero primary sources, zero vocab boxes, zero exam rubrics)
 * - Exact 1:1 verbatim SSoT fidelity to units/eee/data.js narrative_blocks (12 lessons, 60 blocks)
 * - Exactly 28 pages (7 folded A3 sheets, saddle-stitch reprographics compatible)
 * - Page 1:  Master Front Cover (Hero artwork, archival caption, overview synopsis, 12-enquiry 2x6 directory)
 * - Page 2:  Master Chronological Milestone Spine (18 defining causal turning points, 1558–1588)
 * - Page 3:  Geopolitical Theater Atlas & 4 Strategic Flashpoints (Dual cartographic perspectives + 2x2 grid)
 * - Pages 4–27: 12 Canonical Disciplinary Enquiries across 12 flat double-page spreads (Verso + Recto)
 *   * Key Topic 1: Queen, Government and Religion, 1558–69 (Enquiries 1–4)
 *   * Key Topic 2: Challenges to Elizabeth at Home and Abroad, 1569–88 (Enquiries 5–8)
 *   * Key Topic 3: Elizabethan Society in the Age of Exploration, 1558–88 (Enquiries 9–12)
 * - Page 28: Master 60-Question Knowledge Retrieval Quiz Back Cover (6 topic cards x 10 questions)
 * - 100% Institutional Neutrality (strictly "The History Revision Hub", zero school names)
 * - Automated in-browser auto-fit engines:
 *   * autoFitCoverBlurb()
 *   * autoFitCoverEnquiries()
 *   * autoFitPage3Flashpoints()
 *   * autoFitSpreadTypography()
 * - Automated reprographics audit via auditPageBudget() (0px overflow, < 25px footer void, >= 95% utilization)
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const puppeteer = require('puppeteer');
const { auditPageBudget, printSpaceAuditReport } = require('./audit_page_budget.cjs');

const ROOT_DIR = path.resolve(__dirname, '..');

// Helper to convert local image to Base64 data URI for zero-latency rendering
function getBase64Image(relativePath) {
  if (!relativePath) return '';
  try {
    const cleanPath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
    const candidates = [
      path.join(ROOT_DIR, 'public', cleanPath),
      path.join(ROOT_DIR, cleanPath),
      path.join(ROOT_DIR, 'public', 'images', path.basename(cleanPath)),
      path.join(ROOT_DIR, 'images', path.basename(cleanPath)),
      path.join(ROOT_DIR, 'public', 'units', 'eee', 'assets', path.basename(cleanPath)),
      path.join(ROOT_DIR, 'units', 'eee', 'assets', path.basename(cleanPath)),
    ];
    for (const cand of candidates) {
      if (fs.existsSync(cand) && fs.statSync(cand).isFile()) {
        const ext = path.extname(cand).toLowerCase();
        const mime =
          ext === '.png'
            ? 'image/png'
            : ext === '.jpg' || ext === '.jpeg'
              ? 'image/jpeg'
              : ext === '.webp'
                ? 'image/webp'
                : ext === '.svg'
                  ? 'image/svg+xml'
                  : 'image/jpeg';
        const data = fs.readFileSync(cand).toString('base64');
        return `data:${mime};base64,${data}`;
      }
    }
    return relativePath;
  } catch (err) {
    return relativePath;
  }
}

// Clean in-prose paragraph ref pills (e.g. <span class="para-ref">[1.1]</span>) and bracketed tags
function cleanProse(text) {
  if (!text) return '';
  return text
    .replace(
      /<span\s+class=["'](?:para-ref|para-pill|archival-meta-tag)["']>[^<]*<\/span>\s*/gi,
      '',
    )
    .replace(/\[\d+\.\d+[A-Z]?\]\s*/g, '')
    .replace(/\[Key Individual:\s*([^\]]+)\]/gi, '$1')
    .replace(
      /\s*\((?:<strong>)?(?:Source|Interpretation|Figure)\s+[A-Z0-9]+(?:<\/strong>)?\)/gi,
      '',
    )
    .replace(/([a-zA-Z])"([a-zA-Z])/g, '$1" $2')
    .replace(/\s*\(\s*\)/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

// Markdown bold and italics parser for clean prose typography
function formatMarkdown(text) {
  if (!text) return '';
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>');
}

// Load canonical unit data from units/eee/data.js
function loadEeeData() {
  const dataPath = path.join(ROOT_DIR, 'units', 'eee', 'data.js');
  let raw = fs.readFileSync(dataPath, 'utf8');
  raw =
    raw
      .replace(/export\s+const\s+unitData\s*=/g, 'const unitData =')
      .replace(/export\s+default\s+unitData;?/g, '')
      .replace(/export\s*\{[^}]*\};?/g, '') + '; unitData;';
  return vm.runInNewContext(raw);
}

// 18 Defining Causal Turning Points for Page 2 Milestone Spine (1558–1588)
const MILESTONE_SPINE = [
  {
    date: '17 Nov 1558',
    title: 'Accession of Queen Elizabeth I & Appointment of William Cecil',
    desc: 'Following the death of Mary I, twenty-five-year-old Elizabeth Tudor ascends the throne, inheriting £300,000 in debt; Sir William Cecil is appointed Principal Secretary.',
    ref: '1.1',
  },
  {
    date: '8 May 1559',
    title: 'The Elizabethan Religious Settlement Passed by Parliament',
    desc: 'The Act of Supremacy establishes Elizabeth as "Supreme Governor" of the Church of England; the Act of Uniformity imposes the 1559 Book of Common Prayer and 1s recusancy fines.',
    ref: '2.2',
  },
  {
    date: '24 Jun 1559',
    title: 'Royal Injunctions Enforce Uniformity & Church Visitations',
    desc: 'Royal Injunctions mandate English liturgy, enforce clerical vestments, ban unauthorized preaching, and initiate nation-wide inspections by royal commissioners.',
    ref: '2.4',
  },
  {
    date: '26 Mar 1566',
    title: "The Lambeth Vestments Crisis & Archbishop Parker's Advertisements",
    desc: 'Archbishop Matthew Parker commands London clergy to wear the surplice; thirty-seven Puritan ministers refuse on grounds of conscience and are stripped of their livings.',
    ref: '3.2',
  },
  {
    date: '16 May 1568',
    title: 'Mary, Queen of Scots Flees into England Across the Solway Firth',
    desc: 'Escaping imprisonment at Lochleven following defeat at Langside, Mary Stuart lands at Workington in Cumbria, creating an immediate dynastic crisis for the English Crown.',
    ref: '4.3',
  },
  {
    date: 'Oct 1568',
    title: 'The York and Westminster Inquiries Convene over the Casket Letters',
    desc: "Scottish Protestant lords present the mysterious Casket Letters implicating Mary in Lord Darnley's murder; Cecil engineers an inconclusive verdict to detain Mary indefinitely.",
    ref: '4.4',
  },
  {
    date: 'Nov 1569',
    title: 'The Revolt of the Northern Earls (The Rising of the North)',
    desc: 'The Catholic Earls of Northumberland and Westmorland seize Durham Cathedral, celebrate Catholic Mass, and march south to free Mary Stuart; the rebellion is crushed and 450 rebels executed.',
    ref: '5.1',
  },
  {
    date: '25 Feb 1570',
    title: 'Pope Pius V Issues the Papal Bull Regnans in Excelsis',
    desc: 'The Pope excommunicates Elizabeth as a heretic, absolving all Catholic subjects from their oath of allegiance and transforming English Catholics into potential traitors in law.',
    ref: '5.2',
  },
  {
    date: 'Mar 1571',
    title: "The Ridolfi Plot Uncovered by Elizabeth's Intelligence Network",
    desc: 'Italian banker Roberto Ridolfi conspires with the Duke of Norfolk and Spain to assassinate Elizabeth; Norfolk is tried for high treason and executed on Tower Hill in 1572.',
    ref: '5.2',
  },
  {
    date: '1572',
    title: 'The Vagabonds Act Introduces Compulsory Parish Poor Rates',
    desc: 'Parliament mandates harsh physical punishments (whipping and ear-boring) for idle vagrants while establishing the first statutory compulsory poor relief system administered by JPs.',
    ref: '10.4',
  },
  {
    date: '26 Sep 1580',
    title: 'Francis Drake Completes Global Circumnavigation in the Golden Hind',
    desc: 'Drake returns to Plymouth with £400,000 in seized Spanish treasure; Elizabeth defies King Philip II by boarding the Golden Hind at Deptford and knighting Drake in April 1581.',
    ref: '6.3',
  },
  {
    date: 'Nov 1583',
    title: 'The Throckmorton Plot Exposed & The Bond of Association Formed',
    desc: 'Francis Throckmorton confesses under torture on the rack to a French Catholic invasion plan backed by Spanish money; Council leaders establish the lethal Bond of Association.',
    ref: '5.3',
  },
  {
    date: '1584',
    title: 'Walter Raleigh Granted Royal Patent for North American Colonisation',
    desc: 'Elizabeth grants Raleigh a charter to explore and settle unclaimed lands; Arthur Barlowe\'s expedition scouts Roanoke Island and returns to London praising "Virginia".',
    ref: '12.1',
  },
  {
    date: '20 Aug 1585',
    title: 'The Treaty of Nonsuch Commits English Troops to the Netherlands',
    desc: "Following William of Orange's assassination and the Treaty of Joinville, Elizabeth signs the Treaty of Nonsuch, sending 7,400 soldiers under Leicester, entering direct war with Spain.",
    ref: '7.1',
  },
  {
    date: 'Jul 1586',
    title: 'The Babington Plot Intercepted: Walsingham Cracks the Cipher',
    desc: "Sir Francis Walsingham intercepts and deciphers letters hidden in beer barrels between Anthony Babington and Mary Stuart, obtaining Mary's explicit written consent to regicide.",
    ref: '5.4',
  },
  {
    date: '8 Feb 1587',
    title: 'Execution of Mary, Queen of Scots at Fotheringhay Castle',
    desc: "Following parliamentary petitions and Cecil's pressure, Elizabeth signs the death warrant; Mary Stuart is beheaded in the Great Hall, removing the Catholic dynastic figurehead.",
    ref: '5.5',
  },
  {
    date: '19 Apr 1587',
    title: 'Drake\'s Raid on Cadiz ("Singeing the King of Spain\'s Beard")',
    desc: 'Sir Francis Drake leads an audacity-fueled preemptive naval assault on Cadiz harbour, destroying over thirty Spanish warships and burning thousands of seasoned oak barrel staves.',
    ref: '7.3',
  },
  {
    date: '8 Aug 1588',
    title: 'The Battle of Gravelines & The Dispersal of the Spanish Armada',
    desc: 'English fireships break the Armada crescent off Calais; race-built galleons batter Spanish hulls at close range; westerly gale winds drive the surviving invasion fleet into the North Sea.',
    ref: '8.3',
  },
];

// Page 28 Master 60-Question Retrieval Quiz (6 Cards x 10 Questions)
const QUIZ_QUESTIONS = {
  card1: [
    'In what month and year did twenty-five-year-old Elizabeth I ascend the throne?',
    'Approximately how much Crown debt did Elizabeth inherit from Mary I in 1558?',
    'Which European financial exchange lent money to the English Crown at 14% interest?',
    'Whom did Elizabeth appoint as her trusted Principal Secretary on her accession day?',
    "How many senior advisors sat on Elizabeth's executive Privy Council?",
    'Which English continental outpost in France was lost in January 1558?',
    'What title did Elizabeth assume under the 1559 Act of Supremacy?',
    'What fine was imposed under the 1559 Act of Uniformity for failing to attend Sunday church?',
    'What liturgical book was made compulsory in all English parish churches in 1559?',
    'What official visitations were launched in 1559 to enforce the Royal Injunctions?',
  ],
  card2: [
    'What term describes devout English Catholics who refused to attend Anglican church services?',
    'How many London preachers were suspended by Archbishop Parker in the 1566 Vestments Crisis?',
    'In which Spanish Netherlands town was an English Catholic seminary college established in 1568?',
    'Which Spanish commander led 10,000 veteran troops (tercios) into the Netherlands in 1567?',
    'In what month and year did Mary, Queen of Scots flee across the Solway Firth into England?',
    'In which fortified castle in the Yorkshire Dales was Mary Stuart first held under custody?',
    'What scandalous documents were presented at the 1568 York Inquiry accusing Mary of murder?',
    'At which house outside Edinburgh was Lord Darnley murdered in February 1567?',
    "Which Scottish Protestant earl led the rebel lords who forced Mary's abdication at Lochleven?",
    'Why did Elizabeth refuse to pass a definitive guilty or innocent verdict at the Westminster Inquiry?',
  ],
  card3: [
    'Which two Catholic Northern Earls led the November 1569 Northern Rebellion?',
    'In which northern cathedral did the rebel Earls tear up English prayer books and celebrate Mass?',
    'Approximately how many northern rebels were executed under martial law by royal order in 1570?',
    'What papal bull was issued by Pope Pius V in February 1570 excommunicating Elizabeth?',
    'Which Italian banker orchestrated an international Catholic conspiracy to invade England in 1571?',
    'Which high-ranking English peer was executed on Tower Hill in June 1572 for his role in the Ridolfi Plot?',
    "What 1584 pledge bound English subjects to execute anyone plotting against Elizabeth's life?",
    'Which young Catholic conspirator used hidden beer-barrel ciphers to communicate with Mary Stuart in 1586?',
    'Who served as Elizabeth’s ruthless Spymaster that cracked the Babington ciphers?',
    'In which Northamptonshire castle was Mary, Queen of Scots beheaded on 8 February 1587?',
  ],
  card4: [
    'What lucrative commercial licenses granted courtiers exclusive rights to trade specific goods?',
    'What Spanish cargo ship carrying 26 tons of silver bullion was seized by Francis Drake in 1579?',
    'What was the name of Drake’s flagship in which he completed his 1577–1580 global circumnavigation?',
    'At which royal dockyard did Queen Elizabeth knight Francis Drake aboard his ship in April 1581?',
    'Approximately how much plunder did Drake return to the English treasury following his voyage?',
    'What 1584 secret treaty allied Philip II of Spain with the French Catholic League against Protestants?',
    'What August 1585 treaty committed Elizabeth to send 7,400 English troops to the Netherlands?',
    'Which royal favourite was appointed commander-in-chief of English forces in the Low Countries?',
    'In which Spanish harbour did Francis Drake launch his daring preemptive raid in April 1587?',
    'How many Spanish warships and supply vessels did Drake destroy during the "singeing of the King\'s beard"?',
  ],
  card5: [
    "Who was appointed Commander-in-Chief of the Spanish Armada following Santa Cruz's death?",
    'How many ships and troops made up the Spanish Armada when it sailed from Lisbon in May 1588?',
    'Which Spanish general commanded the 30,000 veteran invasion army stationed in the Netherlands?',
    'On what date was the Spanish Armada first sighted off the Lizard and Plymouth?',
    'What tactical defensive crescent formation did the Armada maintain while sailing up the Channel?',
    'What naval weapon did the English deploy at midnight off Calais on 7 August to break the crescent?',
    'Which decisive naval battle was fought on 8 August 1588 between English and Spanish fleets?',
    'What name was given to the north-westerly gale that blew the retreating Armada into the North Sea?',
    'Where did Queen Elizabeth deliver her famous speech declaring she had "the heart and stomach of a king"?',
    'Approximately how many Spanish ships were destroyed or wrecked along the coasts of Scotland and Ireland?',
  ],
  card6: [
    "What wooden board with alphabet and Lord's Prayer protected by animal horn was used in petty schools?",
    'Which prestigious legal institutions in London provided gentlemen with courtly and legal education?',
    'Name the first purpose-built London playhouse, erected by James Burbage in Shoreditch in 1576.',
    'What term described the open pit yard where poorer Elizabethan playgoers stood for a penny?',
    'What agrarian process fenced off common arable land for sheep farming, dispossessing rural labourers?',
    'Which 1572 statute introduced whipping, ear-boring, and compulsory parish poor rates for vagrants?',
    'What 1576 statute established Houses of Correction (Bridewells) to put the able-bodied poor to work?',
    'What technological navigational instrument allowed Elizabethan sailors to calculate latitude at sea?',
    'Which courtier and explorer was granted a royal patent by Elizabeth in 1584 to colonise North America?',
    'What mysterious single word was found carved into a wooden post at the abandoned Roanoke colony in 1590?',
  ],
};

// 12 Canonical Disciplinary Enquiries (Exact 1:1 Live Curriculum Alignment, pp. 4–27)
const ENQUIRY_EDITORIAL = [
  // --- KEY TOPIC 1: QUEEN, GOVERNMENT AND RELIGION, 1558–1569 (Enquiries 1–4) ---
  {
    num: 1,
    ktId: 'KT1',
    ktCode: 'KT 1.1',
    ktGroup: 'KEY TOPIC 1: QUEEN, GOVERNMENT & RELIGION (1558–1569)',
    title: 'The Accession Crisis: Bankruptcy, Dynastic Legitimacy & The Privy Council (1558)',
    shortTitle: 'Accession Crisis & Dynastic Danger',
    enquiryQuestion:
      'How did an inexperienced queen secure an impoverished and divided England amidst acute foreign encirclement in 1558?',
    versoSubtitle: "Part I: Inheriting Bankruptcy, Antwerp Loans & Cecil's Partnership (1558)",
    rectoSubtitle:
      'Part II: The Privy Council, Gender Dilemmas & The French Encirclement (1558–1560)',
    decisiveMechanism:
      "Executive Institutionalisation &bull; Factional Patronage and Cecil's Bureaucratic Partnership",
    rectoAnchor:
      'Elizabeth overcame the structural weakness of inherited bankruptcy and patriarchal prejudice by balancing rival court factions and binding the aristocracy through royal patronage.',
    lessonIdx: 0, // lesson_1_1
  },
  {
    num: 2,
    ktId: 'KT1',
    ktCode: 'KT 1.2',
    ktGroup: 'KEY TOPIC 1: QUEEN, GOVERNMENT & RELIGION (1558–1569)',
    title: 'The Elizabethan Religious Settlement: Supremacy, Uniformity & Injunctions (1559)',
    shortTitle: 'The Elizabethan Religious Settlement',
    enquiryQuestion:
      'To what extent was the 1559 Religious Settlement an enduring theological compromise designed to prevent civil war?',
    versoSubtitle: 'Part I: The Marian Trauma, Act of Supremacy & The Title of Supreme Governor',
    rectoSubtitle: 'Part II: The Act of Uniformity, Injunctions & Church Visitation Courts (1559)',
    decisiveMechanism:
      'The Via Media Compromise &bull; Deliberate Doctrinal Ambiguity and Monarchical Supremacy',
    rectoAnchor:
      'By adopting the title Supreme Governor and blending Protestant liturgy with traditional ceremonial vestments, Elizabeth established state control while averting violent religious civil strife.',
    lessonIdx: 1, // lesson_1_2
  },
  {
    num: 3,
    ktId: 'KT1',
    ktCode: 'KT 1.3',
    ktGroup: 'KEY TOPIC 1: QUEEN, GOVERNMENT & RELIGION (1558–1569)',
    title: 'Challenges to the Settlement: The Puritan Conscience & Catholic Counter-Reformation',
    shortTitle: 'Puritan & Catholic Challenges',
    enquiryQuestion:
      'Why did ideological opposition from Puritan zealots and Catholic traditionalists threaten Elizabeth’s middle way in the 1560s?',
    versoSubtitle:
      'Part I: Calvinist Zeal, The Crucifix Crisis & The Lambeth Vestments Revolt (1559–1566)',
    rectoSubtitle:
      "Part II: Catholic Recusancy, Northern Magnates, Alba's Army & The Genoese Silver (1566–1569)",
    decisiveMechanism:
      'Confessional Polarisation &bull; The Radicalisation of Conscience and Foreign Geopolitical Pressure',
    rectoAnchor:
      'The Elizabethan settlement was squeezed between uncompromising Calvinists demanding total reformation and traditionalists sustained by continental Catholic armies and Douai seminaries.',
    lessonIdx: 2, // lesson_1_3
  },
  {
    num: 4,
    ktId: 'KT1',
    ktCode: 'KT 1.4',
    ktGroup: 'KEY TOPIC 1: QUEEN, GOVERNMENT & RELIGION (1558–1569)',
    title: 'Mary, Queen of Scots: Murder, The Solway Flight & The York Inquiry (1568–1569)',
    shortTitle: 'Mary Stuart & Dynastic Danger',
    enquiryQuestion:
      'How did the arrival of Mary, Queen of Scots in 1568 transform Elizabeth’s dynastic security into a permanent national crisis?',
    versoSubtitle:
      "Part I: Bloodline Claims, Darnley's Murder & Abdication at Lochleven (1560–1568)",
    rectoSubtitle:
      'Part II: Flight into Cumbria, The Casket Letters & Imprisonment at Bolton Castle (1568–1569)',
    decisiveMechanism:
      'Dynastic Entrapment &bull; The Legitimate Catholic Alternative and Sovereign Impasse',
    rectoAnchor:
      'As Henry VII’s great-granddaughter and an anointed Catholic sovereign, Mary’s presence on English soil created an inescapable focal point for Catholic rebellion and foreign invasion.',
    lessonIdx: 3, // lesson_1_4
  },

  // --- KEY TOPIC 2: CHALLENGES AT HOME AND ABROAD, 1569–1588 (Enquiries 5–8) ---
  {
    num: 5,
    ktId: 'KT2',
    ktCode: 'KT 2.1',
    ktGroup: 'KEY TOPIC 2: CHALLENGES AT HOME & ABROAD (1569–1588)',
    title: 'Rebellion, Conspiracy & Regicide: From Durham Cathedral to Fotheringhay (1569–1587)',
    shortTitle: 'Plots, Revolt & The Execution of Mary',
    enquiryQuestion:
      'Why did escalating assassination conspiracies compel Elizabeth to take the unprecedented step of executing an anointed monarch?',
    versoSubtitle:
      'Part I: The Revolt of the Northern Earls, Papal Excommunication & The Ridolfi Conspiracy (1569–1572)',
    rectoSubtitle:
      "Part II: Walsingham's Spy Network, The Babington Cipher Trap & The Block at Fotheringhay (1583–1587)",
    decisiveMechanism:
      'Preemptive Surveillance &bull; Cryptanalysis, Agent Provocateurs, and State Security Law',
    rectoAnchor:
      'Faced with papal excommunication and systematic assassination plots, Walsingham’s intelligence apparatus weaponised intercepted ciphers to force the execution of Mary Stuart.',
    lessonIdx: 4, // lesson_2_1
  },
  {
    num: 6,
    ktId: 'KT2',
    ktCode: 'KT 2.2',
    ktGroup: 'KEY TOPIC 2: CHALLENGES AT HOME & ABROAD (1569–1588)',
    title: 'The Cold War with Spain: Piracy, Plunder & The Voyage of the Golden Hind (1569–1585)',
    shortTitle: 'Cold War with Spain & Privateering',
    enquiryQuestion:
      'How did maritime raiding and covert proxy intervention escalate an undeclared cold war into direct military conflict with Spain?',
    versoSubtitle:
      'Part I: Dutch Protestant Struggles, The Spanish Fury & Caribbean Privateering (1570–1579)',
    rectoSubtitle:
      "Part II: Drake's Global Circumnavigation, The Deptford Knighthood & The Joinville Alliance (1577–1585)",
    decisiveMechanism:
      'Asymmetric Maritime Aggression &bull; State-Sanctioned Piracy and Dutch Strategic Buffer Defense',
    rectoAnchor:
      'By backing privateers who raided Spanish treasure routes and knighting Francis Drake in public defiance of Philip II, Elizabeth provoked open war to defend England’s geopolitical frontiers.',
    lessonIdx: 5, // lesson_2_2
  },
  {
    num: 7,
    ktId: 'KT2',
    ktCode: 'KT 2.3',
    ktGroup: 'KEY TOPIC 2: CHALLENGES AT HOME & ABROAD (1569–1588)',
    title: 'The Outbreak of War: The Dutch Intervention & The Cadiz Raid (1585–1588)',
    shortTitle: 'The Outbreak of War & Cadiz Raid',
    enquiryQuestion:
      'Why did direct English military intervention in the Low Countries force Philip II to launch the "Enterprise of England"?',
    versoSubtitle:
      "Part I: The Treaty of Nonsuch, Leicester's Netherlands Campaign & The Battle of Zutphen (1585–1587)",
    rectoSubtitle:
      "Part II: Singeing the King's Beard at Cadiz, Barrel Scorching & The Armada Staging at Lisbon (1587–1588)",
    decisiveMechanism:
      "Logistical Disruption &bull; Drake's Preemptive Strike and the Fragility of Oceanic Staging",
    rectoAnchor:
      'Although Leicester’s expedition in the Netherlands floundered, Drake’s daring 1587 raid on Cadiz destroyed critical shipping and barrel staves, buying England sixteen vital months to prepare.',
    lessonIdx: 6, // lesson_2_3
  },
  {
    num: 8,
    ktId: 'KT2',
    ktCode: 'KT 2.4',
    ktGroup: 'KEY TOPIC 2: CHALLENGES AT HOME & ABROAD (1569–1588)',
    title:
      'The Spanish Armada: Crescent Defense, Midnight Fireships & Protestant Deliverance (1588)',
    shortTitle: 'The Spanish Armada Campaign',
    enquiryQuestion:
      'Was the defeat of the Spanish Armada primarily the result of superior English naval technology or catastrophic Spanish command and weather?',
    versoSubtitle:
      'Part I: The Crescent Formation, Channel Skirmishes & The Calais Roadstead Fireships (1588)',
    rectoSubtitle:
      'Part II: The Battle of Gravelines, The North Sea Gales, Irish Shipwrecks & Tilbury Triumph (1588)',
    decisiveMechanism:
      'Naval Gunfire Revolution &bull; Race-Built Maneuverability, Fireship Disruption, and Atlantic Tempests',
    rectoAnchor:
      "Hawkins' race-built galleons and fast-reloading culverins outmatched the cumbersome Spanish fleet, while hell-burners at Calais and lethal northern gales completed the Armada’s destruction.",
    lessonIdx: 7, // lesson_2_4
  },

  // --- KEY TOPIC 3: ELIZABETHAN SOCIETY IN THE AGE OF EXPLORATION, 1558–1588 (Enquiries 9–12) ---
  {
    num: 9,
    ktId: 'KT3',
    ktCode: 'KT 3.1',
    ktGroup: 'KEY TOPIC 3: SOCIETY & THE AGE OF EXPLORATION (1558–1588)',
    title: 'Elizabethan Education & Leisure: Grammar Schools, Hunting & The Southwark Theatres',
    shortTitle: 'Education, Pastimes & The Theatre',
    enquiryQuestion:
      'How did educational expansion and popular theatrical culture transform English social and civic life?',
    versoSubtitle:
      'Part I: Humanist Ideals, The Printing Press & The Rise of the Latin Grammar School',
    rectoSubtitle:
      'Part II: Blood Sports, Noble Tournaments, Groundlings & The Southwark Playhouses',
    decisiveMechanism:
      'Cultural Democratisation &bull; The Growth of Vernacular Literacy and Commercial Mass Entertainment',
    rectoAnchor:
      'The rapid rise of grammar schools and open-air commercial playhouses like The Globe created a common cultural language uniting nobility and groundlings across social divides.',
    lessonIdx: 8, // lesson_3_1
  },
  {
    num: 10,
    ktId: 'KT3',
    ktCode: 'KT 3.2',
    ktGroup: 'KEY TOPIC 3: SOCIETY & THE AGE OF EXPLORATION (1558–1588)',
    title: 'Poverty, Vagrancy & The Social Order: Enclosure Riots to The Elizabethan Poor Laws',
    shortTitle: 'Poverty, Vagrancy & Poor Laws',
    enquiryQuestion:
      'Why did the Tudor state transition from brutal punishment of vagrants to institutional poor relief in the 1570s?',
    versoSubtitle:
      'Part I: Demographic Pressure, Bad Harvests, Enclosures & The Fear of Social Disorder',
    rectoSubtitle:
      'Part II: The Deserving Poor, Counterfeit Cranks, The 1572 Vagabonds Act & The 1576 Workhouse System',
    decisiveMechanism:
      'Institutional Paternalism &bull; Compulsory Parish Taxation and Statutory Differentiation of Poverty',
    rectoAnchor:
      'Driven by terrified perceptions of roaming vagabond armies, the Elizabethan state pioneered compulsory local taxation and distinguished between the impotent and idle poor.',
    lessonIdx: 9, // lesson_3_2
  },
  {
    num: 11,
    ktId: 'KT3',
    ktCode: 'KT 3.3',
    ktGroup: 'KEY TOPIC 3: SOCIETY & THE AGE OF EXPLORATION (1558–1588)',
    title: 'Voyages of Discovery: Oceanic Navigation, Merchant Companies & Global Circumnavigation',
    shortTitle: 'Exploration & Oceanic Navigation',
    enquiryQuestion:
      'How did technological navigation and oceanic privateering establish England as an emerging global maritime power?',
    versoSubtitle:
      "Part I: Astrolabes, Mercator Projections, Hawkins' Race-Built Galleons & The Muscovy Company",
    rectoSubtitle:
      "Part II: Drake's Oceanic Voyage, Nova Albion, Pacific Plunder & Global Trade Rivalry (1577–1588)",
    decisiveMechanism:
      'Cartographic Mastery &bull; Joint-Stock Investment, Long-Range Navigation, and Global Trade Penetration',
    rectoAnchor:
      'Advances in magnetic instrumentation, race-built ship design, and chartered joint-stock ventures enabled English mariners to break Iberian trade monopolies across three oceans.',
    lessonIdx: 10, // lesson_3_3
  },
  {
    num: 12,
    ktId: 'KT3',
    ktCode: 'KT 3.4',
    ktGroup: 'KEY TOPIC 3: SOCIETY & THE AGE OF EXPLORATION (1558–1588)',
    title:
      'Walter Raleigh & The Colonisation of Virginia: Imperial Ambition & The Lost Colony (1584–1590)',
    shortTitle: 'Raleigh & The Roanoke Colony',
    enquiryQuestion:
      'Why did Walter Raleigh’s attempts to establish a permanent English colony on Roanoke Island end in complete disaster?',
    versoSubtitle:
      "Part I: Raleigh's Royal Patent, Arthur Barlowe's Expedition & The Secotan Welcome (1584–1585)",
    rectoSubtitle:
      'Part II: The 1585 Lane Colony, Food Crisis, The 1587 White Settlers & The Croatoan Mystery (1585–1590)',
    decisiveMechanism:
      'Colonial Fragility &bull; Mismatched Colonist Skills, Severe Logistical Interruption, and Indigenous Alienation',
    rectoAnchor:
      'Unprepared aristocratic settlers, loss of seed stores during the Tiger shipwreck, hostile relations with the Secotan, and the 1588 Armada embargo doomed the first English settlement in America.',
    lessonIdx: 11, // lesson_3_4
  },
];

// Generate Inside Front Cover Specification Directory (Page 2) directly from specData (SSOT) or unitData
function generateInsideFrontCover(unitData) {
  let specData = null;
  try {
    const specCandidates = [
      path.join(ROOT_DIR, 'public', 'data', 'eee_spec.json'),
      path.join(ROOT_DIR, 'data', 'eee_spec.json'),
    ];
    for (const c of specCandidates) {
      if (fs.existsSync(c)) {
        specData = JSON.parse(fs.readFileSync(c, 'utf8'));
        break;
      }
    }
  } catch (e) {}

  // If specData has modular narrative blurbs defined per topic, render the 12-topic modular architecture
  if (
    specData &&
    specData.sections &&
    specData.sections.length > 0 &&
    specData.sections[0].topics &&
    specData.sections[0].topics[0].narrative_blurb
  ) {
    let html = '';
    specData.sections.forEach((sec, sIdx) => {
      const ktNum = sec.keyTopicNumber || sIdx + 1;
      const ktTitle = sec.title.replace(/^Key\s*Topic\s*\d+[:\-–—\s]*/i, '').trim();

      const rowsHtml = sec.topics
        .map((t, tIdx) => {
          const code = t.code || `KT ${ktNum}.${tIdx + 1}`;
          const title = t.title.replace(/^\d+\.\s*/, '').trim();
          const pages = t.spreads || '';
          const blurb = (t.narrative_blurb || '')
            .replace(/\*\*\*([^*]+)\*\*\*/g, '<strong><em>$1</em></strong>')
            .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

          return `
          <div class="inside-spec-row">
            <div class="isr-header">
              <div class="isr-left">
                <span class="isr-code">${code}</span>
                <span class="isr-question">${title}</span>
              </div>
              <span class="isr-pages">${pages}</span>
            </div>
            <p class="isr-blurb">${blurb}</p>
          </div>
        `;
        })
        .join('');

      html += `
        <div class="inside-kt-group">
          <div class="inside-kt-header">
            <span class="ikt-badge">KEY TOPIC ${ktNum}</span>
            <span class="ikt-title">${ktTitle.toUpperCase()}</span>
          </div>
          <div class="inside-kt-rows">
            ${rowsHtml}
          </div>
        </div>
      `;
    });
    return html;
  }

  const lessonPageMap = [
    'Spread 1 &bull; pp. 4–5', // 0: KT 1.1
    'Spread 2 &bull; pp. 6–7', // 1: KT 1.2
    'Spread 3 &bull; pp. 8–9', // 2: KT 1.3
    'Spread 4 &bull; pp. 10–11', // 3: KT 1.4
    'Spread 5 &bull; pp. 12–13', // 4: KT 2.1
    'Spread 6 &bull; pp. 14–15', // 5: KT 2.2
    'Spread 7 &bull; pp. 16–17', // 6: KT 2.3
    'Spread 8 &bull; pp. 18–19', // 7: KT 2.4
    'Spread 9 &bull; pp. 20–21', // 8: KT 3.1
    'Spread 10 &bull; pp. 22–23', // 9: KT 3.2
    'Spread 11 &bull; pp. 24–25', // 10: KT 3.3
    'Spread 12 &bull; pp. 26–27', // 11: KT 3.4
  ];

  const ktTitles = [
    'Queen, Government and Religion, 1558–1569',
    'Challenges to Elizabeth at Home and Abroad, 1569–1588',
    'Elizabethan Society in the Age of Exploration, 1558–1588',
  ];

  let html = '';

  for (let kt = 0; kt < 3; kt++) {
    const ktLessons = unitData.lessons.slice(kt * 4, kt * 4 + 4);
    const rowsHtml = ktLessons
      .map((l, idx) => {
        const globalIdx = kt * 4 + idx;
        const codeMatch = l.title.match(/(?:KT|Key Topic)\s*\d+\.\d+/i);
        const code = codeMatch
          ? codeMatch[0].replace(/Key Topic\s*/i, 'KT ')
          : `KT ${kt + 1}.${idx + 1}`;
        const question = l.title.replace(/^(?:KT|Key Topic)\s*\d+\.\d+[:\-–—]\s*/i, '').trim();

        let blurb = '';
        if (
          specData &&
          specData.sections &&
          specData.sections[kt] &&
          specData.sections[kt].topics &&
          specData.sections[kt].topics[idx]
        ) {
          const pts = specData.sections[kt].topics[idx].points || [];
          blurb = pts.map((p) => p.replace(/\*\*/g, '<strong>').replace(/\*/g, '')).join(' ');
        } else if (l.specification_anchor) {
          blurb = l.specification_anchor.replace(/^[^:]+:\s*/i, '').trim();
        } else if (l.enquiry) {
          blurb = l.enquiry.split('.')[0] + '.';
        }

        const pages = lessonPageMap[globalIdx] || 'pp. 4–27';

        return `
        <div class="inside-spec-row">
          <div class="isr-header">
            <div class="isr-left">
              <span class="isr-code">${code}</span>
              <span class="isr-question">${question}</span>
            </div>
            <span class="isr-pages">${pages}</span>
          </div>
          <p class="isr-blurb">${blurb}</p>
        </div>
      `;
      })
      .join('');

    html += `
      <div class="inside-kt-group">
        <div class="inside-kt-header">
          <span class="ikt-badge">KEY TOPIC ${kt + 1}</span>
          <span class="ikt-title">${ktTitles[kt]}</span>
        </div>
        <div class="inside-kt-rows">
          ${rowsHtml}
        </div>
      </div>
    `;
  }

  return html;
}

// Generate the complete HTML markup for the 28-Page Master Textbook
function buildTextbookHtml(unitData) {
  const heroImageUri = getBase64Image('/images/armada_portrait.jpg');

  // 1. INSIDE FRONT COVER (Page 2) Automated Specification Directory
  const insideCoverHtml = generateInsideFrontCover(unitData);

  // 2. MASTER CHRONOLOGICAL MILESTONE SPINE (Page 3)
  const milestoneItemsHtml = MILESTONE_SPINE.map((m) => {
    return `
      <div class="spine-item">
        <div class="spine-date-badge">${m.date}</div>
        <div class="spine-dot"></div>
        <div class="spine-content">
          <div class="spine-title-row">
            <span class="spine-title">${m.title}</span>
          </div>
          <p class="spine-desc">${m.desc}</p>
        </div>
      </div>
    `;
  }).join('');

  // 3. 12 ENQUIRY SPREADS (Pages 4–27)
  let spreadsHtml = '';

  ENQUIRY_EDITORIAL.forEach((config) => {
    const num = config.num;
    const versoPage = num * 2 + 2;
    const rectoPage = versoPage + 1;

    const lesson = unitData.lessons[config.lessonIdx];
    const rawBlocks = (lesson.narrative_blocks || []).filter((b) => b.text && b.text.trim());

    // Normalize block data (5 blocks per lesson)
    const parsedBlocks = rawBlocks.map((b, bIdx) => {
      let rawTitle = b.theme_heading || b.title || `Section ${bIdx + 1}`;
      rawTitle = rawTitle.replace(/^\d+\.\s*/, '').trim();

      let date = b.period || '';
      const dateMatch = rawTitle.match(/\(([^)]+)\)$/);
      if (dateMatch && !date) {
        date = dateMatch[1];
        rawTitle = rawTitle.replace(/\s*\([^)]+\)$/, '').trim();
      }

      // Split paragraphs
      const cleaned = cleanProse(b.text);
      const paras = cleaned
        .split(/\n\s*\n|\n/)
        .map((p) => p.trim())
        .filter((p) => p.length > 0);

      return {
        ref: `${num}.${bIdx + 1}`,
        date: date || '1558–1588',
        title: rawTitle,
        paras,
      };
    });

    // Verso gets Blocks 1, 2, 3 (Sections [N.1], [N.2], [N.3])
    // Recto gets Blocks 4, 5 (Sections [N.4], [N.5])
    const versoBlocks = parsedBlocks.slice(0, 3);
    const rectoBlocks = parsedBlocks.slice(3, 5);

    function renderNarrativeBlock(b) {
      const parasHtml = b.paras.map((p) => `<p class="prose-p">${formatMarkdown(p)}</p>`).join('');
      return `
        <section class="narrative-block">
          <div class="block-header">
            <span class="block-ref">Ref [${b.ref}]</span>
            <span class="block-date">${b.date}</span>
            <h3 class="block-title">${b.title}</h3>
          </div>
          <div class="block-body">
            ${parasHtml}
          </div>
        </section>
      `;
    }

    const versoBlocksHtml = versoBlocks.map(renderNarrativeBlock).join('');
    const rectoBlocksHtml = rectoBlocks.map(renderNarrativeBlock).join('');

    spreadsHtml += `
      <!-- SPREAD ${num}: VERSO (Page ${versoPage}) -->
      <div class="page verso-page" id="page-${versoPage}" data-page="${versoPage}">
        <div class="page-inner">
          <header class="spread-header verso-header">
            <div class="spread-header-top">
              <span class="spread-badge">ENQUIRY ${num} &bull; PART I</span>
              <span class="spread-subtitle">${config.versoSubtitle}</span>
            </div>
            <div class="spread-question-banner verso-q-banner">
              <span class="q-badge">KEY ENQUIRY QUESTION</span>
              <h2 class="spread-q-title">${config.enquiryQuestion}</h2>
            </div>
          </header>

          <main class="spread-body">
            <div class="prose-columns">
              ${versoBlocksHtml}
            </div>
          </main>

          <footer class="page-footer">
            <span class="footer-left">Page ${versoPage} &bull; Early Elizabethan England, 1558–1588</span>
            <span class="footer-mid">The History Revision Hub &bull; GCSE Master Textbook Standard</span>
            <span class="footer-right">Ref [${num}.1]–[${num}.3]</span>
          </footer>
        </div>
      </div>

      <!-- SPREAD ${num}: RECTO (Page ${rectoPage}) -->
      <div class="page recto-page" id="page-${rectoPage}" data-page="${rectoPage}">
        <div class="page-inner">
          <header class="spread-header recto-header">
            <div class="spread-header-top">
              <span class="spread-badge">ENQUIRY ${num} &bull; PART II</span>
              <span class="spread-subtitle">${config.rectoSubtitle}</span>
            </div>
            <div class="spread-question-banner recto-q-banner">
              <span class="q-badge">DECISIVE HISTORICAL MECHANISM</span>
              <h2 class="spread-q-title">${config.decisiveMechanism}</h2>
            </div>
          </header>

          <main class="spread-body">
            <div class="prose-columns">
              ${rectoBlocksHtml}
            </div>
            <div class="disciplinary-nexus-card">
              <div class="nexus-header">
                <span class="nexus-badge">DISCIPLINARY CAUSAL EVALUATION</span>
                <span class="nexus-title">${config.decisiveMechanism}</span>
              </div>
              <p class="nexus-text">${config.rectoAnchor}</p>
            </div>
          </main>

          <footer class="page-footer">
            <span class="footer-left">Ref [${num}.4]–[${num}.5]</span>
            <span class="footer-mid">The History Revision Hub &bull; GCSE Master Textbook Standard</span>
            <span class="footer-right">Early Elizabethan England, 1558–1588 &bull; Page ${rectoPage}</span>
          </footer>
        </div>
      </div>
    `;
  });

  // 5. MASTER RETRIEVAL QUIZ (Page 28)
  const quizCardsConfig = [
    {
      cardNum: 1,
      title: 'Queen, Government & The 1559 Settlement',
      refs: 'pp. 4–7 &bull; Ref [1.1]–[2.5]',
      qs: QUIZ_QUESTIONS.card1,
      qStart: 1,
    },
    {
      cardNum: 2,
      title: 'Religion Challenges, Recusancy & Mary Stuart',
      refs: 'pp. 8–11 &bull; Ref [3.1]–[4.5]',
      qs: QUIZ_QUESTIONS.card2,
      qStart: 11,
    },
    {
      cardNum: 3,
      title: "Northern Rebellion, Plots & Mary's Execution",
      refs: 'pp. 12–13 &bull; Ref [5.1]–[5.5]',
      qs: QUIZ_QUESTIONS.card3,
      qStart: 21,
    },
    {
      cardNum: 4,
      title: 'Cold War with Spain, Privateering & War',
      refs: 'pp. 14–17 &bull; Ref [6.1]–[7.5]',
      qs: QUIZ_QUESTIONS.card4,
      qStart: 31,
    },
    {
      cardNum: 5,
      title: 'The Spanish Armada Campaign of 1588',
      refs: 'pp. 18–19 &bull; Ref [8.1]–[8.5]',
      qs: QUIZ_QUESTIONS.card5,
      qStart: 41,
    },
    {
      cardNum: 6,
      title: 'Society, Poverty, Exploration & Virginia',
      refs: 'pp. 20–27 &bull; Ref [9.1]–[12.5]',
      qs: QUIZ_QUESTIONS.card6,
      qStart: 51,
    },
  ];

  const quizCardsHtml = quizCardsConfig
    .map((card) => {
      const qListHtml = card.qs
        .map((q, idx) => {
          const qNum = card.qStart + idx;
          return `
        <li class="quiz-q-item">
          <span class="q-num">${qNum}.</span>
          <span class="q-text">${q}</span>
        </li>
      `;
        })
        .join('');

      return `
      <div class="quiz-card">
        <div class="quiz-card-header">
          <div class="quiz-card-meta">
            <span class="quiz-card-badge">TOPIC CARD ${card.cardNum}</span>
            <span class="quiz-card-ref">${card.refs}</span>
          </div>
          <h4 class="quiz-card-title">${card.title}</h4>
        </div>
        <ol class="quiz-q-list">
          ${qListHtml}
        </ol>
      </div>
    `;
    })
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Early Elizabethan England, 1558–1588 &bull; 28-Page Master Classroom Textbook</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;800;900&family=Inter:wght@400;500;600;700;800&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap" rel="stylesheet">
  <style>
    /* ====================================================
       PAGE BUDGET & REPROGRAPHIC GEOMETRY (EXACT 28 PAGES)
       ==================================================== */
    :root {
      --font-display: 'Cinzel', serif;
      --font-body: 'Lora', Georgia, serif;
      --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      --navy-deep: #0f172a;
      --crimson-accent: #8b0000;
      --gold-royal: #c5a059;
      --blue-accent: #1e3a8a;
      --ink-primary: #0f172a;
      --ink-secondary: #334155;
      --ink-muted: #64748b;
      --border-soft: #cbd5e1;
    }

    @page {
      size: A4 portrait;
      margin: 0;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background: #e2e8f0;
      color: #0f172a;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      font-size: 8.5pt;
      line-height: 1.4;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    .page {
      width: 210mm;
      height: 297mm;
      max-height: 297mm;
      margin: 0 auto 10mm auto;
      background: #ffffff;
      padding: 12mm 14mm 10mm 14mm;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      page-break-after: always;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }

    @media print {
      body {
        background: transparent;
      }
      .page {
        margin: 0;
        box-shadow: none;
        page-break-after: always;
      }
    }

    .page-inner {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
    }

    /* ----------------------------------------------------
       GLOBAL PAGE FOOTER
    ---------------------------------------------------- */
    .page-footer {
      border-top: 1px solid #cbd5e1;
      padding-top: 3px;
      margin-top: 4px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 6.6pt;
      font-weight: 600;
      color: #64748b;
      letter-spacing: 0.02em;
      white-space: nowrap;
    }

    .footer-left {
      font-weight: 700;
      color: #0f172a;
    }

    .footer-mid {
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .footer-right {
      font-style: italic;
    }

    /* ----------------------------------------------------
       PAGE 1: MASTER FRONT COVER STYLING
    ---------------------------------------------------- */
    .front-cover {
      background: linear-gradient(145deg, #0b1329 0%, #0f172a 50%, #1e293b 100%);
      color: #ffffff;
      padding: 10mm 15mm 8mm 15mm !important;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .cover-top-masthead {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      padding-bottom: 1.5mm;
      font-family: var(--font-sans);
    }
    .masthead-title {
      font-size: 7.2pt;
      font-weight: 800;
      letter-spacing: 0.10em;
      color: #ffffff;
      text-transform: uppercase;
    }
    .masthead-badge {
      background: rgba(255, 255, 255, 0.15);
      color: #ffffff;
      font-size: 6.2pt;
      font-weight: 700;
      padding: 1.5px 6px;
      border-radius: 2px;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }
    .cover-title-group {
      text-align: center;
      margin-top: 1.2mm;
      margin-bottom: 1.2mm;
    }
    .cover-spec-pill {
      display: inline-block;
      background: rgba(255, 255, 255, 0.15);
      color: #e2e8f0;
      font-family: var(--font-sans);
      font-size: 6.6pt;
      font-weight: 700;
      letter-spacing: 0.08em;
      padding: 1.5px 8px;
      border-radius: 12px;
      margin-bottom: 2px;
      text-transform: uppercase;
    }
    .cover-title-group h1 {
      font-family: var(--font-display);
      font-size: 19.5pt;
      font-weight: 900;
      color: #ffffff;
      letter-spacing: 0.04em;
      line-height: 1.1;
      text-transform: uppercase;
      margin-bottom: 0.8mm;
    }
    .cover-title-group p {
      font-family: var(--font-body);
      font-style: italic;
      font-size: 8.8pt;
      color: #cbd5e1;
    }

    .cover-hero-artwork-frame {
      display: flex;
      flex-direction: column;
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 4px;
      overflow: hidden;
      background: #000000;
      margin-bottom: 3mm;
    }
    .cover-hero-img-box {
      width: 100%;
      height: 144mm;
      overflow: hidden;
    }
    .cover-hero-img-box img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center 20%;
      display: block;
    }
    .cover-hero-caption {
      font-family: var(--font-sans);
      font-size: 6.0pt;
      color: #94a3b8;
      background: #0b1329;
      padding: 3px 8px;
      text-align: center;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      font-style: italic;
    }

    .cover-synopsis-card {
      background: #fdfbf7;
      color: #1e293b;
      border-left: 4px solid var(--blue-accent);
      border-radius: 4px;
      padding: 13px 16px;
      display: flex;
      flex-direction: column;
      gap: 6px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.25);
      margin-bottom: 3.5mm;
    }
    .cover-synopsis-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 2.5px;
    }
    .cover-synopsis-badge {
      font-family: var(--font-sans);
      font-size: 6.6pt;
      font-weight: 800;
      color: var(--navy-deep);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .cover-synopsis-tag {
      font-family: var(--font-sans);
      font-size: 6.2pt;
      font-weight: 700;
      color: var(--crimson-accent);
      letter-spacing: 0.04em;
    }
    .cover-synopsis-body p {
      font-family: var(--font-body);
      font-size: 8.8pt;
      line-height: 1.50;
      color: #1e293b;
      margin-bottom: 5px;
      text-align: justify;
    }
    .cover-synopsis-body p:last-child {
      margin-bottom: 0;
    }

    .cover-curriculum-strip {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 3px;
      padding: 4.5px 14px;
      font-family: var(--font-sans);
      font-size: 6.2pt;
      color: #cbd5e1;
      white-space: nowrap;
      margin-bottom: 2.5mm;
    }
    .ccs-item {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .ccs-code {
      font-weight: 800;
      color: #93c5fd;
      background: rgba(147, 197, 253, 0.15);
      padding: 1px 4px;
      border-radius: 2px;
    }
    .ccs-divider {
      color: rgba(255, 255, 255, 0.3);
    }
    .cover-footer-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid rgba(255, 255, 255, 0.15);
      padding-top: 1.5mm;
      font-family: var(--font-sans);
      font-size: 5.4pt;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      white-space: nowrap;
    }

    /* ----------------------------------------------------
       PAGE 2: INSIDE FRONT COVER SPECIFICATION DIRECTORY
    ---------------------------------------------------- */
    .inside-cover-page {
      background: #ffffff;
      padding: 9.5mm 15mm 7.5mm 15mm !important;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 5px;
    }
    .page-running-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 0.8px solid #cbd5e1;
      padding-bottom: 2mm;
      margin-bottom: 2.8mm;
      font-family: var(--font-sans);
      font-size: 6.2pt;
      font-weight: 700;
      color: var(--ink-muted);
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }
    .page-running-footer {
      border-top: 0.8px solid #cbd5e1;
      padding-top: 2mm;
      margin-top: 3mm;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: var(--font-sans);
      font-size: 5.8pt;
      letter-spacing: 0.04em;
      color: var(--ink-muted);
      white-space: nowrap;
    }
    .inside-cover-header-strip {
      border-bottom: 2px solid var(--navy-deep);
      padding-bottom: 1.8mm;
      margin-bottom: 2.0mm;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .ichs-title-group h2 {
      font-family: var(--font-display);
      font-size: 11pt;
      font-weight: 800;
      color: var(--navy-deep);
      text-transform: uppercase;
      letter-spacing: 0.04em;
      white-space: nowrap;
    }
    .ichs-title-group p {
      font-family: var(--font-sans);
      font-size: 6.8pt;
      color: var(--crimson-accent);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      margin-top: 1px;
      white-space: nowrap;
    }
    .ichs-badge {
      font-family: var(--font-sans);
      font-size: 6.0pt;
      font-weight: 800;
      color: #ffffff;
      background: var(--navy-deep);
      padding: 2px 7px;
      border-radius: 2px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      white-space: nowrap;
    }
    .inside-cover-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 6px;
      min-height: 0;
    }
    .inside-kt-group {
      margin-bottom: 0;
    }
    .inside-kt-group:last-child {
      margin-bottom: 0;
    }
    .inside-kt-header {
      display: flex;
      align-items: center;
      gap: 6px;
      background: #0f172a;
      color: #ffffff;
      padding: 3.0px 8px;
      border-radius: 2px;
      margin-bottom: 2.5px;
    }
    .ikt-badge {
      font-family: var(--font-sans);
      font-size: 6.8pt;
      font-weight: 800;
      background: var(--crimson-accent);
      color: #ffffff;
      padding: 1.5px 6px;
      border-radius: 2px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      white-space: nowrap;
    }
    .ikt-title {
      font-family: var(--font-sans);
      font-size: 8.0pt;
      font-weight: 700;
      letter-spacing: 0.02em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .inside-kt-rows {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }
    .inside-spec-row {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-left: 3px solid var(--blue-accent);
      padding: 4.2px 9px;
      border-radius: 2px;
      display: flex;
      flex-direction: column;
      gap: 1.5px;
    }
    .isr-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
    .isr-left {
      display: flex;
      align-items: baseline;
      gap: 6px;
      flex: 1;
      min-width: 0;
    }
    .isr-code {
      font-family: var(--font-sans);
      font-size: 7.4pt;
      font-weight: 800;
      color: var(--blue-accent);
      white-space: nowrap;
    }
    .isr-question {
      font-family: var(--font-sans);
      font-size: 8.6pt;
      font-weight: 700;
      color: #0f172a;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .isr-pages {
      font-family: var(--font-sans);
      font-size: 6.8pt;
      font-weight: 700;
      color: #64748b;
      white-space: nowrap;
      margin-left: 8px;
    }
    .isr-blurb {
      font-family: var(--font-sans);
      font-size: 7.2pt;
      line-height: 1.32;
      color: #334155;
      margin: 0;
      text-align: justify;
      font-style: italic;
    }
    .isr-blurb strong {
      font-style: normal;
      font-weight: 700;
      color: #0f172a;
    }

    /* =========================================================
       PAGE 3: MASTER CHRONOLOGICAL MILESTONE SPINE
       ========================================================= */
    .spine-page {
      background: #ffffff;
      padding: 10mm 15mm 8mm 15mm !important;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }
    .spine-header-strip {
      border-bottom: 2px solid var(--navy-deep);
      padding-bottom: 1.8mm;
      margin-bottom: 2.2mm;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .shs-title-group h2 {
      font-family: var(--font-display);
      font-size: 11pt;
      font-weight: 800;
      color: var(--navy-deep);
      text-transform: uppercase;
      letter-spacing: 0.04em;
      white-space: nowrap;
    }
    .shs-title-group p {
      font-family: var(--font-sans);
      font-size: 6.8pt;
      color: var(--crimson-accent);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-top: 1px;
      white-space: nowrap;
    }
    .shs-badge {
      font-family: var(--font-sans);
      font-size: 6.0pt;
      font-weight: 800;
      color: #ffffff;
      background: var(--navy-deep);
      padding: 2px 7px;
      border-radius: 2px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      white-space: nowrap;
    }
    .spine-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 3.5px;
      position: relative;
      min-height: 0;
    }
    .spine-container::before {
      content: '';
      position: absolute;
      left: 19.5mm;
      top: 5px;
      bottom: 5px;
      width: 1.5px;
      background: #cbd5e1;
      z-index: 1;
    }
    .spine-item {
      display: flex;
      align-items: flex-start;
      gap: 7px;
      position: relative;
      z-index: 2;
    }
    .spine-date-badge {
      width: 18mm;
      text-align: right;
      font-family: var(--font-sans);
      font-size: 6.8pt;
      font-weight: 800;
      color: var(--crimson-accent);
      padding-top: 1.5px;
      flex-shrink: 0;
      white-space: nowrap;
    }
    .spine-dot {
      width: 7px;
      height: 7px;
      background: #ffffff;
      border: 2px solid var(--navy-deep);
      border-radius: 50%;
      margin-top: 3.5px;
      flex-shrink: 0;
      box-shadow: 0 0 0 1.5px #ffffff;
    }
    .spine-content {
      flex: 1;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-left: 2.5px solid var(--navy-deep);
      padding: 2.5px 8px;
      border-radius: 2px;
    }
    .spine-title-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 1px;
    }
    .spine-title {
      font-family: var(--font-sans);
      font-size: 7.6pt;
      font-weight: 800;
      color: #0f172a;
    }
    .spine-desc {
      font-family: var(--font-body);
      font-size: 7.0pt;
      line-height: 1.25;
      color: #334155;
      text-align: justify;
      margin: 0;
    }

    /* ----------------------------------------------------
       PAGES 4–27: 12 SPREADS (VERSO + RECTO)
    ---------------------------------------------------- */
    .spread-header {
      border-bottom: 2px solid #0f172a;
      padding-bottom: 4px;
      margin-bottom: 7px;
    }

    .spread-header-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 2px;
    }

    .spread-badge {
      font-size: 7pt;
      font-weight: 800;
      letter-spacing: 0.06em;
      color: #ffffff;
      background: #0f172a;
      padding: 2px 7px;
      border-radius: 2px;
      text-transform: uppercase;
    }

    .spread-subtitle {
      font-size: 7.8pt;
      font-weight: 600;
      color: #475569;
      font-style: italic;
    }

    .spread-question-banner {
      background: #f8fafc;
      border-left: 3px solid #0f172a;
      padding: 3px 8px;
      border-radius: 0 3px 3px 0;
    }

    .q-badge {
      font-size: 5.6pt;
      font-weight: 800;
      letter-spacing: 0.05em;
      color: #64748b;
      text-transform: uppercase;
      display: block;
      margin-bottom: 1px;
    }

    .spread-q-title {
      font-family: 'Lora', Georgia, serif;
      font-size: 9pt;
      font-weight: 700;
      color: #0f172a;
      line-height: 1.25;
    }

    .spread-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      min-height: 0;
    }

    .prose-columns {
      column-count: 2;
      column-gap: 8mm;
      column-fill: balance;
      text-align: justify;
      hyphens: auto;
      flex: 1;
    }

    .narrative-block {
      break-inside: auto;
      margin-bottom: 8px;
    }

    .block-header {
      break-after: avoid;
      break-inside: avoid;
      border-bottom: 1px solid #cbd5e1;
      padding-bottom: 1.5px;
      margin-bottom: 4px;
      display: flex;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 5px;
    }

    .block-ref {
      background: #e2e8f0;
      color: #0f172a;
      font-size: 6.6pt;
      font-weight: 800;
      padding: 1px 5px;
      border-radius: 2px;
      letter-spacing: 0.02em;
    }

    .block-date {
      font-size: 6.8pt;
      font-style: italic;
      color: #64748b;
      letter-spacing: 0.02em;
    }

    .block-title {
      font-size: 8.8pt;
      font-weight: 700;
      color: #0f172a;
      line-height: 1.2;
      width: 100%;
      margin-top: 1px;
    }

    .block-body {
      display: block;
    }

    .prose-p {
      font-family: 'Lora', Georgia, serif;
      text-align: justify;
      hyphens: auto;
      margin-bottom: 8px;
      font-size: 11.5pt;
      line-height: 1.58;
      color: #1e293b;
    }

    .prose-p:last-child {
      margin-bottom: 0;
    }

    .recto-page .prose-p {
      font-size: 11.8pt;
      line-height: 1.62;
      margin-bottom: 9px;
    }

    /* Disciplinary Nexus Card on Recto Page */
    .disciplinary-nexus-card {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-left: 3.5px solid #0f172a;
      border-radius: 4px;
      padding: 7px 11px;
      margin-top: 6px;
    }

    .nexus-header {
      display: flex;
      align-items: baseline;
      gap: 6px;
      margin-bottom: 3px;
    }

    .nexus-badge {
      font-size: 6.0pt;
      font-weight: 800;
      letter-spacing: 0.05em;
      color: #ffffff;
      background: #0f172a;
      padding: 1.5px 5px;
      border-radius: 2px;
      text-transform: uppercase;
      white-space: nowrap;
    }

    .nexus-title {
      font-size: 7.8pt;
      font-weight: 700;
      color: #0f172a;
    }

    .nexus-text {
      font-family: 'Lora', Georgia, serif;
      font-size: 8.2pt;
      line-height: 1.40;
      color: #334155;
      font-style: italic;
      text-align: justify;
    }

    /* ----------------------------------------------------
       PAGE 28: MASTER RETRIEVAL QUIZ STYLING
    ---------------------------------------------------- */
    .quiz-page {
      padding: 9mm 13mm 8mm 13mm;
    }

    .quiz-header {
      border-bottom: 2px solid #0f172a;
      padding-bottom: 3px;
      margin-bottom: 4px;
    }

    .quiz-title-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1px;
    }

    .quiz-title {
      font-size: 10.5pt;
      font-weight: 800;
      letter-spacing: 0.05em;
      color: #0f172a;
      text-transform: uppercase;
    }

    .quiz-badge {
      background: #0f172a;
      color: #ffffff;
      font-size: 6.4pt;
      font-weight: 700;
      padding: 1px 6px;
      border-radius: 2px;
      letter-spacing: 0.03em;
    }

    .quiz-instructions {
      background: #f8fafc;
      border-left: 2.5px solid #0f172a;
      padding: 3px 6px;
      font-size: 6.2pt;
      line-height: 1.25;
      color: #475569;
      border-radius: 0 2px 2px 0;
      margin-bottom: 5px;
    }

    .quiz-grid {
      flex: 1;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: repeat(3, 1fr);
      gap: 6px 12px;
      overflow: hidden;
    }

    .quiz-card {
      border: 1px solid #cbd5e1;
      border-radius: 3px;
      padding: 4px 7px;
      background: #ffffff;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      overflow: hidden;
    }

    .quiz-card-header {
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 2px;
      margin-bottom: 3px;
    }

    .quiz-card-meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1px;
    }

    .quiz-card-badge {
      font-size: 5.6pt;
      font-weight: 800;
      color: #ffffff;
      background: #0f172a;
      padding: 1px 4px;
      border-radius: 2px;
      letter-spacing: 0.03em;
    }

    .quiz-card-ref {
      font-size: 5.8pt;
      font-weight: 600;
      color: #64748b;
    }

    .quiz-card-title {
      font-size: 7.2pt;
      font-weight: 700;
      color: #0f172a;
      line-height: 1.15;
    }

    .quiz-q-list {
      list-style: none;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .quiz-q-item {
      display: flex;
      align-items: baseline;
      gap: 3px;
      font-size: 6.2pt;
      line-height: 1.20;
      color: #1e293b;
    }

    .q-num {
      font-weight: 700;
      color: #475569;
      min-width: 13px;
      text-align: right;
    }

    .q-text {
      flex: 1;
    }
  </style>
</head>
<body>

  <!-- ==========================================
       PAGE 1: MASTER FRONT COVER
  =========================================== -->
  <div class="page front-cover" id="page-1" data-page="1">
    <header class="cover-top-masthead">
      <span class="masthead-title">THE HISTORY REVISION HUB &bull; MASTER CURRICULUM SERIES</span>
      <span class="masthead-badge">KEY STAGE 4 &bull; PEARSON EDEXCEL GCSE OPTION B4</span>
    </header>

    <div class="cover-title-group">
      <span class="cover-spec-pill">Pearson Edexcel GCSE (9–1) History &bull; Paper 2 Option B4</span>
      <h1>Early Elizabethan England</h1>
      <p>1558–1588 &bull; Queen, Government &amp; Religion &bull; Challenges Home &amp; Abroad &bull; Elizabethan Society &amp; Exploration</p>
    </div>

    <div class="cover-hero-artwork-frame">
      <div class="cover-hero-img-box">
        <img src="${heroImageUri}" alt="The Armada Portrait of Queen Elizabeth I (1588)">
      </div>
      <div class="cover-hero-caption">
        Plate I: The Armada Portrait of Queen Elizabeth I (1588). Commemorating the defeat of the Spanish invasion fleet; Elizabeth rests her hand upon the global sphere, flanked by the English naval triumph. Woburn Abbey Collection.
      </div>
    </div>

    <div class="cover-synopsis-card">
      <div class="cover-synopsis-header">
        <span class="cover-synopsis-badge">HISTORICAL OVERVIEW &bull; 1558–1588</span>
        <span class="cover-synopsis-tag">MONARCHY, RELIGION &amp; EMPIRE</span>
      </div>
      <div class="cover-synopsis-body" id="cover-synopsis-body">
        <p>
          Ascending the throne in November 1558 amidst religious tumult, crippling Crown debt of £300,000, and foreign encirclement by France and Scotland, twenty-five-year-old Elizabeth Tudor established a durable Protestant state. Her 1559 Religious Settlement crafted an enduring political compromise between Catholic traditionalism and Calvinist zeal, establishing the English monarch as Supreme Governor of the Church of England while preserving political order across thirty precarious years.
        </p>
        <p>
          Yet her reign was fiercely tested by domestic rebellion and geopolitical crisis. The flight of Mary, Queen of Scots ignited northern Catholic insurrections, papal excommunication, and deadly assassination conspiracies, while maritime privateering by Francis Drake escalated into outright war with the superpower of Europe—Philip II’s Spain. Culminating in the cataclysmic defeat of the 1588 Spanish Armada, this master textbook provides an authoritative 28-page narrative tracing how Elizabeth secured her realm and forged an oceanic Golden Age.
        </p>
      </div>
    </div>

    <div class="cover-curriculum-strip">
      <div class="ccs-item"><span class="ccs-code">KT 1</span><span class="ccs-text">Queen, Government &amp; Religion (1558–69)</span></div>
      <div class="ccs-divider">&bull;</div>
      <div class="ccs-item"><span class="ccs-code">KT 2</span><span class="ccs-text">Challenges Home &amp; Abroad (1569–88)</span></div>
      <div class="ccs-divider">&bull;</div>
      <div class="ccs-item"><span class="ccs-code">KT 3</span><span class="ccs-text">Elizabethan Society &amp; Exploration (1558–88)</span></div>
    </div>

    <footer class="cover-footer-meta">
      <span>Page 1 &bull; Master Cover</span>
      <span>The History Revision Hub &bull; GCSE Master Textbook Standard</span>
      <span>Course Specification &amp; Disciplinary Directory &bull; Inside Front Cover (p. 2)</span>
    </footer>
  </div>

  <!-- ==========================================
       PAGE 2: INSIDE FRONT COVER SPECIFICATION DIRECTORY
  =========================================== -->
  <div class="page inside-cover-page" id="page-2" data-page="2">
    <header class="page-running-header">
      <span class="header-left">THE HISTORY REVISION HUB &bull; MASTER CURRICULUM SERIES</span>
      <span class="header-center">PEARSON EDEXCEL GCSE (9–1) HISTORY &bull; OPTION B4</span>
      <span class="header-right">INSIDE FRONT COVER &bull; PAGE 2</span>
    </header>

    <div class="inside-cover-header-strip">
      <div class="ichs-title-group">
        <h2>COURSE SPECIFICATION &amp; DISCIPLINARY DIRECTORY</h2>
        <p>Full Syllabus Alignment Across All 12 Canonical Lessons (Key Topics 1–3) &bull; Option B4</p>
      </div>
      <span class="ichs-badge">Official Specification Alignment</span>
    </div>

    <div class="inside-cover-content">
      ${insideCoverHtml}
    </div>

    <footer class="page-running-footer">
      <span class="footer-left">Option B4: Early Elizabethan England, 1558–1588</span>
      <span class="footer-center">THE DISCIPLINARY HISTORY CLASSROOM TEXTBOOK &bull; SADDLE-STITCH REPROGRAPHICS COMPLIANT</span>
      <span class="footer-right"><span class="page-num">2</span></span>
    </footer>
  </div>

  <!-- ==========================================
       PAGE 3: MASTER CHRONOLOGICAL MILESTONE SPINE
  =========================================== -->
  <div class="page spine-page" id="page-3" data-page="3">
    <header class="page-running-header">
      <span class="header-left">THE HISTORY REVISION HUB &bull; MASTER CURRICULUM</span>
      <span class="header-center">CHRONOLOGICAL MILESTONE SPINE &bull; 1558–1588</span>
      <span class="header-right">OPTION B4 &bull; PAGE 3</span>
    </header>

    <div class="spine-header-strip">
      <div class="shs-title-group">
        <h2>CHRONOLOGICAL MILESTONE SPINE &amp; TURNING POINTS</h2>
        <p>18 Defining Causal Turning Points Across All 12 Canonical Lessons &bull; Option B4</p>
      </div>
      <span class="shs-badge">Chronological Highway</span>
    </div>

    <div class="spine-container">
      ${milestoneItemsHtml}
    </div>

    <footer class="page-running-footer">
      <span class="footer-left">Option B4: Early Elizabethan England, 1558–1588</span>
      <span class="footer-center">THE DISCIPLINARY HISTORY CLASSROOM TEXTBOOK &bull; SADDLE-STITCH REPROGRAPHICS COMPLIANT</span>
      <span class="footer-right"><span class="page-num">3</span></span>
    </footer>
  </div>

  <!-- ==========================================
       PAGES 4–27: 12 CANONICAL DISCIPLINARY SPREADS
  =========================================== -->
  ${spreadsHtml}

  <!-- ==========================================
       PAGE 28: MASTER KNOWLEDGE RETRIEVAL QUIZ
  =========================================== -->
  <div class="page quiz-page" id="page-28" data-page="28">
    <div class="page-inner">
      <header class="quiz-header">
        <div class="quiz-title-row">
          <h2 class="quiz-title">MASTER KNOWLEDGE RETRIEVAL QUIZ &bull; 1558–1588</h2>
          <span class="quiz-badge">60 CORE RETRIEVAL QUESTIONS</span>
        </div>
        <div class="quiz-instructions">
          <strong>PARTNER QUIZ OR SOLO PRACTICE:</strong> Read each question aloud. State the exact historical fact, individual, or date. Cross-check paragraph references to verify your answers. Zero marks awarded for vague generalisations.
        </div>
      </header>

      <main class="quiz-grid" id="quiz-grid">
        ${quizCardsHtml}
      </main>

      <footer class="page-footer">
        <span class="footer-left">Page 28 &bull; Master Knowledge Retrieval Quiz</span>
        <span class="footer-mid">The History Revision Hub &bull; GCSE Master Textbook Standard</span>
        <span class="footer-right">60 Essential Curriculum Questions</span>
      </footer>
    </div>
  </div>

  <!-- IN-BROWSER AUTO-FIT ENGINES FOR 100% REPROGRAPHIC COMPLIANCE -->
  <script>
    function autoFitCoverSynopsis() {
      const page = document.querySelector('#page-1');
      const body = document.querySelector('#cover-synopsis-body');
      if (!page || !body) return;

      let fs = 8.8;
      while (page.scrollHeight > page.clientHeight && fs > 6.0) {
        fs -= 0.1;
        body.querySelectorAll('p').forEach(p => {
          p.style.fontSize = fs.toFixed(1) + 'pt';
          p.style.lineHeight = '1.38';
          p.style.marginBottom = '3px';
        });
      }
    }

    function autoFitInsideCoverDirectory() {
      const page = document.querySelector('#page-2');
      if (!page) return;
      const content = page.querySelector('.inside-cover-content');
      const footer = page.querySelector('.page-running-footer') || page.querySelector('.page-footer');
      if (!content || !footer) return;

      page.style.justifyContent = 'flex-start';
      content.style.justifyContent = 'flex-start';

      const footerTop = footer.getBoundingClientRect().top;
      const blurbs = Array.from(page.querySelectorAll('.isr-blurb'));
      const questions = Array.from(page.querySelectorAll('.isr-question'));
      const rows = Array.from(page.querySelectorAll('.inside-spec-row'));

      function getLastBottom() {
        const lastGroup = page.querySelector('.inside-kt-group:last-child');
        return lastGroup ? lastGroup.getBoundingClientRect().bottom : (content ? content.getBoundingClientRect().bottom : 0);
      }

      let fs = 7.0;
      let pad = 3.8;

      // 1. Scale down if overflowing or touching footer
      while ((page.scrollHeight > page.clientHeight || getLastBottom() > footerTop - 8) && fs > 4.5) {
        fs -= 0.1;
        pad = Math.max(1.8, pad - 0.1);
        blurbs.forEach(b => {
          b.style.fontSize = fs.toFixed(1) + 'pt';
          b.style.lineHeight = '1.28';
        });
        questions.forEach(q => q.style.fontSize = (fs + 1.2).toFixed(1) + 'pt');
        rows.forEach(r => {
          r.style.paddingTop = pad.toFixed(1) + 'px';
          r.style.paddingBottom = pad.toFixed(1) + 'px';
        });
      }

      // 2. Scale up if there is ample clearance to fill vertical space naturally
      let clearance = footerTop - getLastBottom();
      if (clearance > 12 && page.scrollHeight <= page.clientHeight) {
        let bestFs = fs;
        let bestPad = pad;
        for (let testFs = fs + 0.1; testFs <= 8.4; testFs += 0.1) {
          const testPad = pad + (testFs - fs) * 0.8;
          blurbs.forEach(b => {
            b.style.fontSize = testFs.toFixed(1) + 'pt';
            b.style.lineHeight = '1.32';
          });
          questions.forEach(q => q.style.fontSize = (testFs + 1.2).toFixed(1) + 'pt');
          rows.forEach(r => {
            r.style.paddingTop = testPad.toFixed(1) + 'px';
            r.style.paddingBottom = testPad.toFixed(1) + 'px';
          });

          if (getLastBottom() <= footerTop - 8 && page.scrollHeight <= page.clientHeight) {
            bestFs = testFs;
            bestPad = testPad;
          } else {
            break;
          }
        }
        blurbs.forEach(b => {
          b.style.fontSize = bestFs.toFixed(1) + 'pt';
          b.style.lineHeight = '1.32';
        });
        questions.forEach(q => q.style.fontSize = (bestFs + 1.2).toFixed(1) + 'pt');
        rows.forEach(r => {
          r.style.paddingTop = bestPad.toFixed(1) + 'px';
          r.style.paddingBottom = bestPad.toFixed(1) + 'px';
        });
      }
    }

    function autoFitPage3Milestones() {
      const page = document.querySelector('#page-3');
      if (!page) return;
      const spineContainer = page.querySelector('.spine-container');
      const footer = page.querySelector('.page-running-footer') || page.querySelector('.page-footer');
      const items = Array.from(page.querySelectorAll('.spine-item'));
      const descs = Array.from(page.querySelectorAll('.spine-desc'));
      const titles = Array.from(page.querySelectorAll('.spine-title'));
      const badges = Array.from(page.querySelectorAll('.spine-date-badge'));
      const contents = Array.from(page.querySelectorAll('.spine-content'));
      if (!spineContainer || !footer || !items.length) return;

      const footerTop = footer.getBoundingClientRect().top;
      function getLastBottom() {
        const last = page.querySelector('.spine-item:last-child');
        return last ? last.getBoundingClientRect().bottom : 0;
      }

      function apply(fs, gap, padY) {
        spineContainer.style.gap = gap.toFixed(1) + 'px';
        descs.forEach(d => {
          d.style.fontSize = fs.toFixed(1) + 'pt';
          d.style.lineHeight = '1.26';
        });
        titles.forEach(t => t.style.fontSize = (fs + 0.6).toFixed(1) + 'pt');
        badges.forEach(b => b.style.fontSize = (fs - 0.2).toFixed(1) + 'pt');
        contents.forEach(c => {
          c.style.paddingTop = padY.toFixed(1) + 'px';
          c.style.paddingBottom = padY.toFixed(1) + 'px';
        });
      }

      let fs = 6.8;
      let gap = 3.5;
      let padY = 2.5;
      apply(fs, gap, padY);

      // 1. Scale down if overflowing
      while ((page.scrollHeight > page.clientHeight || getLastBottom() > footerTop - 6) && fs > 5.2) {
        fs -= 0.1;
        gap = Math.max(1.8, gap - 0.15);
        padY = Math.max(1.2, padY - 0.1);
        apply(fs, gap, padY);
      }

      // 2. Scale up if room permits
      let clearance = footerTop - getLastBottom();
      if (clearance > 10 && page.scrollHeight <= page.clientHeight) {
        let bestFs = fs;
        let bestGap = gap;
        let bestPadY = padY;
        for (let testFs = fs + 0.1; testFs <= 8.2; testFs += 0.1) {
          const testGap = gap + (testFs - fs) * 0.8;
          const testPadY = padY + (testFs - fs) * 0.35;
          apply(testFs, testGap, testPadY);

          if (getLastBottom() <= footerTop - 8 && page.scrollHeight <= page.clientHeight) {
            bestFs = testFs;
            bestGap = testGap;
            bestPadY = testPadY;
          } else {
            break;
          }
        }
        apply(bestFs, bestGap, bestPadY);
      }
    }

    function autoFitSpreadTypography() {
      document.querySelectorAll('.spread-body').forEach(body => {
        const page = body.closest('.page');
        const footer = page ? page.querySelector('.page-footer') : null;
        if (!page) return;

        let attempts = 0;
        let pSize = 11.5;
        let pLine = 1.58;

        const checkOverflow = () => {
          const bodyOverflow = body.scrollHeight > body.clientHeight + 3;
          let footerOverlap = false;
          if (footer) {
            const bRect = body.getBoundingClientRect();
            const fRect = footer.getBoundingClientRect();
            if (bRect.bottom > fRect.top - 2) footerOverlap = true;
          }
          return bodyOverflow || footerOverlap;
        };

        while (checkOverflow() && attempts < 25 && pSize > 8.8) {
          pSize -= 0.15;
          pLine = Math.max(1.36, pLine - 0.015);
          body.querySelectorAll('.prose-p').forEach(p => {
            p.style.fontSize = pSize + 'pt';
            p.style.lineHeight = pLine;
            p.style.marginBottom = Math.max(3, pSize * 0.35) + 'px';
          });
          attempts++;
        }
      });
    }

    window.addEventListener('load', () => {
      autoFitCoverSynopsis();
      autoFitInsideCoverDirectory();
      autoFitPage3Milestones();
      autoFitSpreadTypography();
    });
  </script>
</body>
</html>`;
}

// Main execution function
async function main() {
  console.log('================================================================');
  console.log('🏛️ COMPILING UNIFIED 28-PAGE MASTER TEXTBOOK: EARLY ELIZABETHAN ENGLAND');
  console.log('================================================================\n');

  console.log('1. Loading canonical unit data from units/eee/data.js...');
  const unitData = loadEeeData();
  console.log(`   Loaded ${unitData.lessons.length} lessons from canonical SSoT.`);

  console.log('2. Building 28-Page Master Textbook HTML markup...');
  const htmlContent = buildTextbookHtml(unitData);

  const htmlOutputDir = path.join(ROOT_DIR, 'public', 'units', 'eee');
  const rootHtmlOutputDir = path.join(ROOT_DIR, 'units', 'eee');
  const pdfOutputDir = path.join(ROOT_DIR, 'public', 'pdfs');

  fs.mkdirSync(htmlOutputDir, { recursive: true });
  fs.mkdirSync(rootHtmlOutputDir, { recursive: true });
  fs.mkdirSync(pdfOutputDir, { recursive: true });

  const htmlPath = path.join(htmlOutputDir, 'textbook_UNIFIED.html');
  const rootHtmlPath = path.join(rootHtmlOutputDir, 'textbook_UNIFIED.html');

  fs.writeFileSync(htmlPath, htmlContent, 'utf8');
  fs.writeFileSync(rootHtmlPath, htmlContent, 'utf8');
  console.log(`   Saved public HTML: ${htmlPath}`);
  console.log(`   Saved root HTML:   ${rootHtmlPath}`);

  console.log('3. Launching Puppeteer to audit page budget and compile PDF...');
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: fs.existsSync(chromePath) ? chromePath : undefined,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--font-render-hinting=none',
    ],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1697, deviceScaleFactor: 2 });

  await page.goto(`file://${htmlPath.replace(/\\/g, '/')}`, {
    waitUntil: ['load', 'networkidle0'],
  });

  await page.evaluateHandle('document.fonts.ready');

  // Run in-browser calibrators
  await page.evaluate(() => {
    if (typeof autoFitCoverSynopsis === 'function') autoFitCoverSynopsis();
    if (typeof autoFitInsideCoverDirectory === 'function') autoFitInsideCoverDirectory();
    if (typeof autoFitPage3Milestones === 'function') autoFitPage3Milestones();
    if (typeof autoFitSpreadTypography === 'function') autoFitSpreadTypography();
  });

  // Allow auto-fit scripts to settle
  await new Promise((r) => setTimeout(r, 1200));

  console.log('4. Executing Reprographics Budget & Clutter Audit...');
  const auditResults = await auditPageBudget(page, {
    maxPages: 28,
    exactPageCount: 28,
    footerVoidWarningThresholdPx: 45,
    pageSelector: '.page',
  });

  printSpaceAuditReport(auditResults, 'eee/textbook_UNIFIED.html');

  if (auditResults.hasErrors) {
    console.error('❌ REPROGRAPHIC AUDIT FAILED: Overflow or severe error detected across pages!');
    const errorPages = auditResults.results.filter(
      (r) => r.overflow > 0 || r.clutterViolations.length > 0,
    );
    console.error('   Error details:', JSON.stringify(errorPages, null, 2));
  } else {
    console.log('✅ REPROGRAPHIC AUDIT PASSED: 100% Optimal page geometry, zero overflow!');
  }

  console.log('5. Rendering PDF publication...');
  const pdfPath = path.join(pdfOutputDir, 'eee_textbook_UNIFIED_FINAL.pdf');
  const pdfPathLegacy = path.join(pdfOutputDir, 'eee_textbook_UNIFIED.pdf');

  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  fs.copyFileSync(pdfPath, pdfPathLegacy);
  console.log(`   Compiled Master PDF: ${pdfPath}`);

  // Take preview screenshots for key milestone spreads
  const previewDir = path.join(htmlOutputDir, 'previews', 'unified');
  fs.mkdirSync(previewDir, { recursive: true });

  const previewPages = [1, 2, 3, 4, 5, 28];
  for (const pageNum of previewPages) {
    const pageEl = await page.$(`#page-${pageNum}`);
    if (pageEl) {
      await pageEl.screenshot({
        path: path.join(previewDir, `page_${String(pageNum).padStart(2, '0')}.png`),
      });
    }
  }
  console.log(`   Captured visual preview screenshots in ${previewDir}`);

  await browser.close();
  console.log('\n================================================================');
  console.log('🎉 EARLY ELIZABETHAN ENGLAND 28-PAGE MASTER TEXTBOOK READY!');
  console.log('================================================================\n');

  return { htmlPath, pdfPath, auditResults };
}

if (require.main === module) {
  main().catch((err) => {
    console.error('Fatal compilation error:', err);
    process.exit(1);
  });
}

module.exports = { main, buildTextbookHtml, loadEeeData };
