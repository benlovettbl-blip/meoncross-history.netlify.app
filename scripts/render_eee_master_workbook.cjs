/**
 * History Revision Hub — Master Two-Page Spread Pupil Workbook Engine
 *
 * Target: Early Elizabethan England, 1558–1588 (Edexcel GCSE Paper 2, Section B)
 * Key Topics:
 *   - KT1: Queen, government and religion, 1558–69
 *   - KT2: Challenges to Elizabeth at home and abroad, 1569–88
 *   - KT3: Elizabethan society in the Age of Exploration, 1558–88
 *
 * Standard:
 *   - Exact 16-Page A4 Double-Page Spread Architecture (4 A3 Folded Spreads)
 *   - 100% Factual Recall & Historical Explanation (AO1 & AO2)
 *   - Zero Sources & Zero Interpretations (Pure Pearson Edexcel Paper 2 Format)
 *   - Q1(a) Feature [2m] + Q1(b) Feature [2m] on Verso
 *   - Q2 Explain Why [12m] / Q3 Evaluative Essay [16m+4m SPaG] on Recto
 *   - Cartographic & Archival Visual Blueprint (Page 12)
 *   - Master Knowledge Organiser (Page 13)
 *   - Grade 9 Masterclass & Band 4 Rubrics (Page 14)
 *   - Synoptic Exam Challenge (Page 15)
 *   - Master Outside Back Cover with Ledger & 5 QR Codes (Page 16)
 *   - Strict School Anonymity (data-department-name customizer standard)
 *
 * Usage:
 *   node scripts/render_eee_twopage_workbook.cjs KT1
 *   node scripts/render_eee_twopage_workbook.cjs KT2
 *   node scripts/render_eee_twopage_workbook.cjs KT3
 *   node scripts/render_eee_twopage_workbook.cjs all
 */

const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');
const puppeteer = require('puppeteer');
const { PDFDocument } = require('pdf-lib');
const { ENQUIRY_STAGES, QUESTION_PROBABILITIES } = require('./enhance_eee_workbook.cjs');
const {
  renderStandardFrontCover,
  renderStandardBackCover,
} = require('./components/render_standard_cover.cjs');
const { auditPageBudget, printSpaceAuditReport } = require('./audit_page_budget.cjs');

const ROOT_DIR = path.join(__dirname, '..');

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

function getBase64Image(relPath) {
  if (!relPath) return '';
  const clean = relPath.replace(/^\//, '');
  const candidates = [
    path.join(ROOT_DIR, 'public', clean),
    path.join(ROOT_DIR, clean),
    path.join(ROOT_DIR, 'public', 'images', path.basename(clean)),
    path.join(ROOT_DIR, 'images', path.basename(clean)),
    path.join(ROOT_DIR, 'units', 'eee', 'assets', path.basename(clean)),
    path.join(ROOT_DIR, 'units', 'eee', 'assets', 'portraits', path.basename(clean)),
    path.join(ROOT_DIR, 'public', 'units', 'eee', 'assets', path.basename(clean)),
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

// Approved Witty Revision Quips (24 Pages per Key Topic)
const EEE_FOOTERS = {
  KT1: [
    'Early Elizabethan England Revision Hub • Key Topic 1 • The History Department', // Page 1
    '"Remember: Mary I left Elizabeth £300,000 of debt; don\'t leave blank lines in your exam!"', // Page 2
    '"Chronology is queen: 1558 Accession before 1559 Settlement, always."', // Page 3
    '"Patronage: Elizabeth gave out titles and monopolies, not marks; write the detail!"', // Page 4
    '"Legitimacy was questioned because of Henry VIII; your explanation must be unquestionable."', // Page 5
    '"Extended writing: develop your 3-paragraph structure with precise evidence on every line."', // Page 6
    '"Analytical precision: link Crown patronage directly to political stability in the counties."', // Page 7
    '"The Middle Way was a compromise: Protestants got English Bibles, Catholics kept vestments."', // Page 8
    '"Royal Injunctions: All clergy had to teach Royal Supremacy — teach the examiner your knowledge."', // Page 9
    '"Recusancy fines: 1 shilling was a week\'s wage for a labourer; factual depth secures Grade 9."', // Page 10
    '"Explain why: connect the 1559 Settlement to Marian bishops refusing the Oath of Supremacy."', // Page 11
    '"Puritans hated crucifixes and vestments; examiners hate vague assertions."', // Page 12
    '"Vestments crisis: 37 vicars suspended by Parker in 1566 proved Protestant division."', // Page 13
    '"Disciplinary notes: evaluate Puritan frustration against the Queen\'s demand for uniform order."', // Page 14
    '"Causal chains: show how Catholic excommunication in 1570 hardened government policy."', // Page 15
    '"Mary, Queen of Scots arrived in 1568 in a fishing boat; don\'t let your essay drift."', // Page 16
    '"Casket Letters: Love letters or forged gossip? Elizabeth used them to keep Mary under lock and key."', // Page 17
    '"Independent practice: forensic analysis of Mary Stuart as an alternative Catholic figurehead."', // Page 18
    '"Sustained judgment: weigh foreign threat against domestic legitimacy to conclude your essay."', // Page 19
    '"Visualise the structure: Monarch rules, Privy Council advises, Parliament taxes, JPs enforce."', // Page 20
    '"Via Media: Neither Geneva nor Rome, but an English compromise designed to avoid civil war."', // Page 21
    '"Grade 9 Rule: Q1 requires Feature + Detail. Name the feature, then drop the factual hammer."', // Page 22
    '"Timed Condition Challenge: 12 marks means 3 paragraphs with 3 distinct causal links."', // Page 23
    'Key Topic 1 Complete • Cumulative Assessment & Digital Practice Hub', // Page 24
  ],
  KT2: [
    'Early Elizabethan England Revision Hub • Key Topic 2 • The History Department', // Page 1
    '"1569: The Northern Earls marched with Catholic banners; Elizabeth responded with 450 executions."', // Page 2
    '"Regnans in Excelsis (1570): The Pope declared Elizabeth a heretic; Elizabeth declared plotters traitors."', // Page 3
    '"Walsingham\'s codebreaker Thomas Phelippes decoded the beer barrel letters: detail matters!"', // Page 4
    '"Ridolfi, Throckmorton, Babington: Three plots, three failures, one execution at Fotheringhay."', // Page 5
    '"Extended writing: explain how each domestic Catholic plot had direct foreign Spanish backing."', // Page 6
    '"Forensic detail: the Bond of Association (1584) sealed Mary Stuart\'s fate before Babington wrote."', // Page 7
    '"Privateers were legal pirates with a royal license: Drake took Spanish silver for England\'s glory."', // Page 8
    '"Cacafuego surrendered £140,000 of treasure: Elizabeth paid off the entire national debt."', // Page 9
    '"Sustained response: explain how privateering transformed commercial rivalry into formal war."', // Page 10
    '"Treaty of Nonsuch (1585): Dudley\'s 7,400 troops in the Netherlands made war with Spain inevitable."', // Page 11
    '"The Netherlands was England\'s front door: Elizabeth could not allow Parma to control Dutch deep-water ports."', // Page 12
    "\"Drake at Cadiz: 'Singeing the King of Spain's Beard' destroyed 30 ships and delayed the Armada by a year.\"", // Page 13
    '"Disciplinary analysis: evaluate the logistical impact of destroying seasoned barrel staves at Cadiz."', // Page 14
    '"Tactical breakdown: English race-built galleons versus high Spanish castles in the Channel duel."', // Page 15
    '"The Spanish crescent formation held until eight English fireships drifted into Calais Roads at midnight."', // Page 16
    '"Battle of Gravelines: Agile English galleons with rapid-fire culverins smashed the drifting Spanish fleet."', // Page 17
    '"Independent practice: weigh fireship chaos against Medina Sidonia\'s lack of deep-water ports."', // Page 18
    '"Sustained conclusion: explain why the Protestant Wind finished what English gunnery started."', // Page 19
    '"Armada Tactics: High Spanish castles for boarding vs low English race-built galleons for gunnery."', // Page 20
    '"The Protestant Wind: God blew and they were scattered, but Hawkins\' ship design won the battle."', // Page 21
    '"Grade 9 Essay: Don\'t just describe the fireships — explain why panic broke the defensive formation."', // Page 22
    '"Timed Condition Challenge: 16 marks means criteria-led evaluation and a sustained, justified verdict."', // Page 23
    'Key Topic 2 Complete • Cumulative Assessment & Digital Practice Hub', // Page 24
  ],
  KT3: [
    'Early Elizabethan England Revision Hub • Key Topic 3 • The History Department', // Page 1
    '"A Golden Age: But if you were a beggar in 1572, you were bored through the ear with a hot iron."', // Page 2
    '"Grammar schools taught Latin from dawn to dusk; your task is 50 minutes of analytical history."', // Page 3
    '"The Theatre (1576): The first permanent playhouse in London, built outside the city walls in Shoreditch."', // Page 4
    '"Groundlings paid a penny to stand in the rain; the rich paid sixpence for covered gallery seats."', // Page 5
    '"Extended writing: analyse how Elizabethan education reinforced rigid social class hierarchies."', // Page 6
    '"Disciplinary notes: compare noble household education with grammar school humanist curricula."', // Page 7
    '"Poverty grew because population rose from 3m to 4m, while wool enclosure eliminated farm jobs."', // Page 8
    '"1576 Act for Relief of the Poor: Local parishes provided wool and hemp so the unemployed could work."', // Page 9
    '"Sustained response: distinguish clearly between the Impotent Poor and Sturdy Beggars."', // Page 10
    '"Forensic evaluation: explain why local parish rates were revolutionary in replacing monastic charity."', // Page 11
    '"New navigation tech: The astrolabe measured stars, but Drake\'s daring navigated the globe."', // Page 12
    '"Drake was the first Englishman to circumnavigate the earth, returning in 1580 with 4,700% profit."', // Page 13
    '"Disciplinary analysis: assess the geopolitical impact of claiming Nova Albion (California) in 1579."', // Page 14
    '"Commercial turning point: Drake\'s return proved England could challenge Spain on the world ocean."', // Page 15
    '"Walter Raleigh planned the Virginia colony from London; he never actually set foot in Roanoke himself."', // Page 16
    '"Roanoke failed because the Tiger ruined seeds, supplies arrived late, and relations with Wingina collapsed."', // Page 17
    '"Independent practice: analyse the three core reasons for the collapse of the 1585 Roanoke colony."', // Page 18
    '"Sustained verdict: explain how Roanoke\'s failure laid the technical groundwork for Jamestown in 1607."', // Page 19
    '"The Globe Theatre Blueprint: The Heavens above, the Pit below, and the Tiring House backstage."', // Page 20
    '"From Deserving Poor to Idle Vagabonds: Elizabethan Poor Laws laid the foundation for 250 years of welfare."', // Page 21
    '"Grade 9 Rule: In 12-mark questions, link your causes! Enclosure caused unemployment, which caused vagrancy."', // Page 22
    '"Timed Condition Challenge: Structure your points with Point, Fact, Explanation, and Causal Link."', // Page 23
    'Key Topic 3 Complete • Cumulative Assessment & Digital Practice Hub', // Page 24
  ],
};

function renderFooterStrip(pageNum, text, totalPages = 24) {
  const isEven = pageNum % 2 === 0;
  if (isEven) {
    return `
      <div class="page-footer-strip">
        <span class="footer-page-num" style="margin-right: 8px;">${pageNum}/${totalPages}</span>
        <span class="footer-quip" style="text-align: right; flex: 1;">${text}</span>
      </div>`;
  } else {
    return `
      <div class="page-footer-strip">
        <span class="footer-quip" style="text-align: left; flex: 1; margin-right: 8px;">${text}</span>
        <span class="footer-page-num">${pageNum}/${totalPages}</span>
      </div>`;
  }
}

const EEE_NOTE_CUES = {
  lesson_1_1: [
    {
      themeNum: 1,
      badge: 'GOVERNMENT ANATOMY',
      title: '1. Society & Royal Prerogative',
      cues: [
        'Great Chain of Being & social hierarchy',
        'Monarch’s Divine Right & Royal Prerogative',
        'Privy Council: 19 advisors led by William Cecil',
        'Parliament’s role: extraordinary taxation (subsidies)',
        'Local government: Lords Lieutenant & unpaid JPs',
      ],
    },
    {
      themeNum: 2,
      badge: 'MONARCHICAL CRISIS',
      title: '2. Gender, Marriage & Legitimacy',
      cues: [
        '16th-century gender prejudice: "unnatural" female rule',
        'Anne Boleyn’s marriage & Catholic illegitimacy claims',
        'Marriage dilemmas: Philip II, Dudley, Archduke Charles',
        'Political risks of foreign vs domestic consort',
        'Creation of the "Virgin Queen" monarchical image',
      ],
    },
    {
      themeNum: 3,
      badge: 'CROWN FINANCES',
      title: '3. Financial Weakness & Crown Debts',
      cues: [
        '£300,000 Crown debt inherited from Mary I in 1558',
        'Crown income: royal demesne lands, customs, subsidies',
        'Debasement of coinage & loss of English credit abroad',
        'Cecil’s austerity policies: cost-cutting & land sales',
        'Loans from Antwerp money markets at high interest',
      ],
    },
    {
      themeNum: 4,
      badge: 'FOREIGN THREATS',
      title: '4. Foreign Threats & Strategic Verdict',
      cues: [
        'Loss of Calais (Jan 1558) via Treaty of Cateau-Cambrésis',
        'France & Scotland: The Auld Alliance & Mary of Guise',
        'French troops stationed on northern Scottish border',
        'Spanish alliance vs Catholic threat from Philip II',
        'Historical Verdict: How stable was Elizabeth’s throne in 1558?',
      ],
    },
  ],
  lesson_1_2: [
    {
      themeNum: 1,
      badge: 'RELIGIOUS DIVIDE',
      title: '1. The Religious Landscape in 1558',
      cues: [
        'Geographical split: Catholic North/West vs Protestant South-East',
        'The Marian legacy: 284 Protestant martyrs burned at stake',
        'Marian bishops in House of Lords opposed reform',
        'Reformed Protestants returning from European exile (Geneva)',
        'The need for political compromise to avoid civil war',
      ],
    },
    {
      themeNum: 2,
      badge: 'ROYAL SUPREMACY',
      title: '2. The Act of Supremacy (1559)',
      cues: [
        'Title: "Supreme Governor" instead of "Supreme Head"',
        'Compromise to appease Catholics & moderate Protestants',
        'Oath of Supremacy: required for all clergy and officials',
        'Deprivation: all Marian bishops except one refused and lost posts',
        'Establishment of the Court of High Commission',
      ],
    },
    {
      themeNum: 3,
      badge: 'LITURGICAL UNIFORMITY',
      title: '3. Act of Uniformity & Prayer Book',
      cues: [
        'Book of Common Prayer (1559): mandated in all parish churches',
        'Deliberately ambiguous wording on Communion bread & wine',
        'Church attendance: 1 shilling fine for absent recusants',
        'Church ornamentation & vestments: traditional Catholic style kept',
        'The Via Media ("Middle Way") between Rome and Geneva',
      ],
    },
    {
      themeNum: 4,
      badge: 'ENFORCEMENT & VISITATION',
      title: '4. Royal Injunctions & Parish Verdict',
      cues: [
        '57 Royal Injunctions issued summer 1559',
        'Clergy required to teach Royal Supremacy & use English Bible',
        'Preaching restricted to licensed clergy only',
        'National visitations by 125 commissioners (approx. 400 clergy lost livings)',
        'Historical Verdict: Was the Settlement a lasting peace or uneasy truce?',
      ],
    },
  ],
  lesson_1_3: [
    {
      themeNum: 1,
      badge: 'PURITAN OPPOSITION',
      title: '1. The Puritan Challenge & Crucifix Crisis',
      cues: [
        'Puritan theology: Calvinist doctrine, anti-bishops, anti-idols',
        'Crucifix Controversy: Elizabeth insisted on crucifixes in Royal Chapel',
        'Puritan bishops (e.g. Jewel, Grindal) threatened resignation',
        'Elizabeth forced to compromise: crucifix removed from parish churches',
        'Growing Puritan influence in Privy Council and House of Commons',
      ],
    },
    {
      themeNum: 2,
      badge: 'VESTMENTS CRISIS',
      title: '2. The Vestments Controversy (1566)',
      cues: [
        'Puritans viewed vestments (surplice & cope) as Catholic "popish rags"',
        'Archbishop Matthew Parker’s "Book of Advertisements" (1566)',
        'Lambeth Palace standardisation exhibition for London clergy',
        '37 London vicars refused to conform and were deprived of livings',
        'Significance: Proved Elizabeth prioritized royal uniformity over Protestant solidarity',
      ],
    },
    {
      themeNum: 3,
      badge: 'CATHOLIC RECUSANCY',
      title: '3. The Catholic Challenge & Recusancy',
      cues: [
        'Recusancy in northern counties (Yorkshire, Durham, Lancashire)',
        'Gentry held secret Catholic Latin Masses in private manor chapels',
        '1566: Pope Pius V instructed Catholics not to attend Anglican services',
        'Elizabeth initially adopted policy of tolerance ("not making windows into souls")',
        'Growing Counter-Reformation in Europe & Council of Trent decrees',
      ],
    },
    {
      themeNum: 4,
      badge: 'PAPAL EXCOMMUNICATION',
      title: '4. Regnans in Excelsis (1570) & Verdict',
      cues: [
        'Pope Pius V issues Papal Bull excommunicating Elizabeth (1570)',
        'English Catholics officially absolved from loyalty to the Crown',
        'Direct threat: turned Catholic subjects into potential royal assassins',
        'Treason Acts of 1571: bringing papal bulls into England made high treason',
        'Historical Verdict: Did Puritan or Catholic dissent pose greater danger?',
      ],
    },
  ],
  lesson_1_4: [
    {
      themeNum: 1,
      badge: 'ROYAL CLAIM',
      title: '1. Mary Stuart’s Claim to the Throne',
      cues: [
        'Lineage: Great-granddaughter of Henry VII via Margaret Tudor',
        'Strict Roman Catholics viewed Mary as legitimate heir over Elizabeth',
        '1558–59: Mary Stuart displayed English royal arms in Paris',
        'Widowed queen returned from France to Presbyterian Scotland (1561)',
        'Marriage to Lord Darnley (1565) strengthened royal succession claim',
      ],
    },
    {
      themeNum: 2,
      badge: 'FLIGHT TO ENGLAND',
      title: '2. Flight to England (May 1568)',
      cues: [
        "Murder of Lord Darnley at Kirk o' Field (Feb 1567)",
        'Mary married chief suspect Earl of Bothwell (May 1567)',
        'Scottish Protestant lords rebelled; Mary imprisoned at Lochleven',
        'Forced abdication in favour of infant son James VI',
        'Escape and defeat at Langside; flight across Solway Firth in fishing boat',
      ],
    },
    {
      themeNum: 3,
      badge: 'DIPLOMATIC DILEMMA',
      title: '3. Elizabeth’s Political & Legal Dilemma',
      cues: [
        'Option A: Help Mary regain Scottish throne (risks restoring Catholic power)',
        'Option B: Hand Mary back to Scottish rebels (threatens Divine Right of Kings)',
        'Option C: Allow Mary to flee to Catholic France (risks French invasion)',
        'Option D: Keep Mary in England under house arrest (risks Catholic plots)',
        'Elizabeth chose indefinite house arrest under Earl of Shrewsbury',
      ],
    },
    {
      themeNum: 4,
      badge: 'CASKET LETTERS',
      title: '4. The Casket Letters Inquiry & Verdict',
      cues: [
        'Inquiry held at York and Westminster (1568–69)',
        'Scottish lords produced 8 love letters and sonnets allegedly by Mary to Bothwell',
        'Mary’s defense: denied authorship, claimed letters were forgeries',
        'Elizabeth refused to make a definitive ruling of guilt or innocence',
        'Historical Verdict: Did Mary’s presence cause or merely catalyse Catholic rebellion?',
      ],
    },
  ],
  lesson_2_1: [
    {
      themeNum: 1,
      badge: 'NORTHERN REBELLION',
      title: '1. The Revolt of the Northern Earls (1569)',
      cues: [
        'Leaders: Charles Neville (Westmorland) & Thomas Percy (Northumberland)',
        'Causes: Catholic devotion, political exclusion by Cecil, Mary Stuart marriage plot',
        'Capture of Durham Cathedral: tore up English prayer books, celebrated Latin Mass',
        'Failed to rescue Mary Stuart; Crown army under Sussex crushed rebellion',
        'Retaliation: 450 rebels executed across northern villages to terrify population',
      ],
    },
    {
      themeNum: 2,
      badge: 'CONSPIRACY INVASIONS',
      title: '2. The Ridolfi & Throckmorton Plots',
      cues: [
        'Ridolfi Plot (1571): Italian banker Roberto Ridolfi, Duke of Norfolk, Spanish army under Alba',
        'Uncovered by Cecil; Norfolk executed on Tower Hill (1572)',
        'Throckmorton Plot (1583): French Duke of Guise invasion funded by Philip II',
        'Walsingham uncovered papers in Francis Throckmorton’s home',
        'Bond of Association (1584): Anyone benefiting from royal murder condemned to death',
      ],
    },
    {
      themeNum: 3,
      badge: 'INTELLIGENCE & ESPIONAGE',
      title: '3. The Babington Plot & Spy Network (1586)',
      cues: [
        'Anthony Babington plotted with Jesuit John Ballard to assassinate Elizabeth',
        'Secret letters smuggled to Mary Stuart inside beer barrels at Chartley',
        'Walsingham’s double agent Gilbert Gifford intercepted all letters',
        'Cipher clerk Thomas Phelippes decoded messages and added gallows forgery',
        'Mary’s reply approving assassination provided fatal forensic proof of treason',
      ],
    },
    {
      themeNum: 4,
      badge: 'ROYAL EXECUTION',
      title: '4. Execution at Fotheringhay (1587) & Verdict',
      cues: [
        'Trial of Mary Stuart at Fotheringhay Castle under Act for Queen’s Safety',
        'Elizabeth’s hesitation: fear of regicide backlash from France and Spain',
        'Death warrant signed 1 Feb 1587; Council dispatched it without royal consent',
        'Beheading of Mary Stuart on 8 February 1587',
        'Historical Verdict: Was Mary Stuart’s execution an act of state security or judicial murder?',
      ],
    },
  ],
  lesson_2_2: [
    {
      themeNum: 1,
      badge: 'IMPERIAL RIVALRY',
      title: '1. Commercial Rivalry in the Americas',
      cues: [
        'Spanish trade monopoly in New World enforced by Philip II',
        'English privateering: legal piracy with royal letters of marque',
        'John Hawkins pioneered Atlantic triangular slave trade (1560s)',
        'San Juan de Ulúa ambush (1568): Spanish fleet attacked Hawkins and Drake',
        'Privateering transformed from commercial venture into national crusade',
      ],
    },
    {
      themeNum: 2,
      badge: 'PACIFIC RAIDS',
      title: '2. Drake & The Circumnavigation (1577–80)',
      cues: [
        'Drake sailed *Golden Hind* into secret Spanish Pacific waters',
        'Raided undefended ports in Chile and Peru (Valparaíso, Callao)',
        'Captured treasure ship *Cacafuego*: seized £140,000 in silver and gold bullion',
        'Claimed Nova Albion (California) for Elizabeth; crossed Pacific to Moluccas',
        'Elizabeth knighted Drake on deck at Deptford (1581), infuriating Philip II',
      ],
    },
    {
      themeNum: 3,
      badge: 'DUTCH REVOLT',
      title: '3. Religious Conflict in the Netherlands',
      cues: [
        'Netherlands: vital trading partner for English cloth at Antwerp',
        'Calvinist Dutch rebels fought against Spanish Duke of Alba’s repression',
        'Elizabeth aided Sea Beggars and allowed Dutch privateers in English ports',
        '1576: Spanish Fury sacked Antwerp; Pacification of Ghent united provinces',
        'Duke of Parma arrived with Army of Flanders to reconquer southern provinces',
      ],
    },
    {
      themeNum: 4,
      badge: 'ESCALATION TO WAR',
      title: '4. The Escalation to Formal War & Verdict',
      cues: [
        '1580: Philip II inherited Portuguese crown and empire, doubling naval power',
        '1584: Assassination of Protestant leader William of Orange',
        '1584: Treaty of Joinville allied Philip II with French Catholic League',
        'Elizabeth faced nightmare scenario of isolated England facing united Catholic Europe',
        'Historical Verdict: Was war between England and Spain inevitable by 1585?',
      ],
    },
  ],
  lesson_2_3: [
    {
      themeNum: 1,
      badge: 'TREATY ALLIANCE',
      title: '1. The Treaty of Nonsuch (1585)',
      cues: [
        'August 1585: Elizabeth formally committed England to open military alliance',
        'Terms: 7,400 troops (6,400 foot, 1,000 horse) sent to the Netherlands',
        'Crown funded war costs of £126,000 per year',
        'Cautionary towns: Brill and Flushing handed over as English military guarantees',
        'Significance: Direct declaration of war against the Spanish Empire',
      ],
    },
    {
      themeNum: 2,
      badge: 'MILITARY CAMPAIGN',
      title: '2. Leicester’s Netherlands Campaign (1585–87)',
      cues: [
        'Robert Dudley, Earl of Leicester, appointed commander of English forces',
        'Dudley accepted title of "Governor-General" of Low Countries, enraging Elizabeth',
        'English army plagued by poor supplies, unpaid troops, and desertion',
        'Rowland York and William Stanley betrayed English forts (Zutphen) to Spain',
        'Leicester recalled in December 1587 having achieved minimal military progress',
      ],
    },
    {
      themeNum: 3,
      badge: 'CADIZ RAID',
      title: '3. Drake’s Raid on Cadiz (April 1587)',
      cues: [
        'Elizabeth dispatched Drake with 23 ships to disrupt Spanish fleet preparations',
        '"Singeing the King of Spain\'s Beard": Drake sailed straight into Cadiz harbor',
        'Destroyed over 30 Spanish war galleons and captured immense supply stores',
        'Crucial destruction: burned thousands of seasoned wood barrel staves (food/water rot)',
        'Delayed sailing of the Armada by over 12 months',
      ],
    },
    {
      themeNum: 4,
      badge: 'ARMADA PREPARATIONS',
      title: '4. Spanish Invasion Plans & Verdict',
      cues: [
        'Philip II’s grand strategy: Armada to sail up Channel to Calais',
        'Join with Duke of Parma’s 27,000 elite veteran soldiers in the Netherlands',
        'Parma’s army to cross Channel in flat-bottomed landing barges under naval escort',
        'Flaw: Parma had no deep-water port to load troops safe from Dutch flyboats',
        'Historical Verdict: How effective was English preemptive strategy before 1588?',
      ],
    },
  ],
  lesson_2_4: [
    {
      themeNum: 1,
      badge: 'FLEET LOGISTICS',
      title: '1. Fleet Strength & Medina Sidonia',
      cues: [
        'Spanish Armada: 130 ships, 2,431 guns, 30,000 men (led by Duke of Medina Sidonia)',
        'Medina Sidonia: experienced administrator but lacked sea combat experience',
        'Spanish strategy: tight defensive crescent formation, board enemy ships with infantry',
        'English fleet: 200 ships (led by Lord Howard of Effingham and Francis Drake)',
        'Hawkins\' design: "race-built" galleons (faster, lower in water, more manoeuvrable)',
      ],
    },
    {
      themeNum: 2,
      badge: 'CHANNEL BATTLES',
      title: '2. The Channel Running Battle (July 1588)',
      cues: [
        '29 July: Armada sighted off the Lizard, Cornwall; English fleet left Plymouth',
        'Spanish crescent formation held firm past Plymouth, Portland Bill, and Isle of Wight',
        'English long-range culverin artillery inflicted minimal structural damage',
        'Spanish ammunition spent heavily without closing for boarding combat',
        '6 August: Armada anchored at Calais Roads waiting for Parma’s army',
      ],
    },
    {
      themeNum: 3,
      badge: 'GRAVELINES DECISION',
      title: '3. Calais Fireships & Battle of Gravelines',
      cues: [
        'Midnight 7 August: English launched 8 fireships packed with pitch and gunpowder into Calais',
        'Panic: Spanish captains cut anchor cables; crescent formation broken permanently',
        '8 August: Battle of Gravelines: English ships closed to 100 yards',
        'Rapid-fire culverins pounded drifting Spanish galleons; 5 ships sunk, 1,000+ killed',
        'Spanish gunners poorly trained; mismatched cannonballs jammed guns',
      ],
    },
    {
      themeNum: 4,
      badge: 'PROTESTANT WIND',
      title: '4. The Atlantic Retreat & Historical Verdict',
      cues: [
        'South-westerly gale drove Armada north into dangerous North Sea waters',
        'Medina Sidonia forced to navigate perilous route around Scotland and western Ireland',
        'Lacking anchors and fresh water, over 40 Spanish ships wrecked on Atlantic reefs',
        'Thousands of Spanish survivors slaughtered or drowned on Irish beaches',
        'Historical Verdict: Did English tactics, Spanish blunders, or the weather defeat the Armada?',
      ],
    },
  ],
  lesson_3_1: [
    {
      themeNum: 1,
      badge: 'GRAMMAR SCHOOLS',
      title: '1. Elizabethan Grammar Schools & Humanism',
      cues: [
        'Expansion of Grammar Schools: 72 new schools founded across Elizabethan era',
        'Curriculum: Humanist education focused on Latin, Greek, rhetoric, and classical history',
        'Strict routine: 6am–5pm school day, memorization, translation, corporal punishment',
        'Target pupils: Sons of the gentry, yeomen, merchants, and prosperous craftsmen',
        'Universities: Oxford and Cambridge expanded with colleges for civil service training',
      ],
    },
    {
      themeNum: 2,
      badge: 'CLASS & GENDER',
      title: '2. Social Class & Gender Hierarchies',
      cues: [
        'Nobility & upper gentry: children educated at home by private tutors',
        'Subjects for noble boys: French, fencing, horsemanship, Latin, law',
        'Education for girls: strictly domestic skills (needlework, music, household accounts)',
        'Working-class children: zero formal schooling; agricultural and trade apprenticeships',
        'Literacy rates: 30% for men and under 10% for women by the end of Elizabeth’s reign',
      ],
    },
    {
      themeNum: 3,
      badge: 'PASTIMES & SPORT',
      title: '3. Elizabethan Pastimes & Blood Sports',
      cues: [
        'Upper-class sports: hunting, hawking (falconry), jousting, fencing, real tennis',
        'Lower-class sports: mob football (violent, unregulated), wrestling, cudgelling',
        'Blood sports: bear-baiting and cockfighting attended by all classes including Queen',
        'Popular music: madrigals, lute playing, morris dancing, parish feast days',
        'Inns and alehouses: central social hubs for ordinary townspeople and labourers',
      ],
    },
    {
      themeNum: 4,
      badge: 'PUBLIC THEATRE',
      title: '4. The Rise of Theatres & Cultural Verdict',
      cues: [
        '1576: James Burbage built "The Theatre" in Shoreditch, outside London’s city walls',
        'Playhouse architecture: unroofed circular yard (pit) for 1d groundlings, tiered galleries',
        'Playwrights: Christopher Marlowe, William Shakespeare; acting troupes (Lord Chamberlain’s Men)',
        'Opposition: Puritans condemned theatre as sinful; City authorities feared plague and riots',
        'Historical Verdict: Did Elizabethan leisure represent a genuine "Golden Age"?',
      ],
    },
  ],
  lesson_3_2: [
    {
      themeNum: 1,
      badge: 'POVERTY DRIVERS',
      title: '1. Demographic & Economic Drivers of Poverty',
      cues: [
        'Population explosion: grew from approx. 2.8 million to over 4 million (1558–1603)',
        'Rising demand for food and housing outstripped supply, causing massive inflation',
        'Bad harvests: severe failures in 1556, 1573, 1586, and consecutive crises in 1590s',
        'Debasement of coinage: lowered currency value and raised living costs for labourers',
        'Collapse of Antwerp cloth market in 1550s hit English textile weavers',
      ],
    },
    {
      themeNum: 2,
      badge: 'AGRICULTURAL REVOLUTION',
      title: '2. Enclosure & Rural Displacement',
      cues: [
        'Enclosure: replacing open fields with fenced sheep pasture for profitable wool trade',
        'Sheep farming required far fewer agricultural workers than traditional arable farming',
        'Loss of common land: deprived small cottagers of grazing rights and firewood',
        'Rack-renting: landlords increased tenant rents sharply, forcing evictions',
        'Displaced peasants migrated to market towns and London seeking scarce work',
      ],
    },
    {
      themeNum: 3,
      badge: 'SOCIAL ATTITUDES',
      title: '3. Changing Attitudes to the Poor',
      cues: [
        'Distinction: "Deserving / Impotent Poor" (elderly, sick, children) vs "Idle Vagabonds"',
        'Thomas Harman’s pamphlet *Caveat for Common Cursitors* (1567) popularized fears of con artists',
        'Categories of beggars: Anglers, Rufflers, Counterfeit Cranks (faking epilepsy)',
        'Fear of social insurrection and spread of plague from wandering vagrants',
        'Belief that poverty was becoming an imperial and civic crisis requiring state action',
      ],
    },
    {
      themeNum: 4,
      badge: 'POOR LAW REFORM',
      title: '4. Elizabethan Poor Laws & Historical Verdict',
      cues: [
        '1572 Vagabonds Act: whipping and boring through ear with hot iron; created local poor rate',
        '1576 Act for Relief of the Poor: provided raw wool and hemp for able-bodied to work',
        'House of Correction: established in each county to punish refusal to work',
        '1601 Poor Law: codified state welfare system that lasted until 1834 Poor Law Amendment',
        'Historical Verdict: Did Elizabethan policy alleviate poverty or punish victims of economic change?',
      ],
    },
  ],
  lesson_3_3: [
    {
      themeNum: 1,
      badge: 'MARITIME TECHNOLOGY',
      title: '1. Navigational Tech & Scientific Enablers',
      cues: [
        'Astrolabe and quadrant: measured latitude using angle of sun and North Star',
        'Magnetic compass and chip log: calculated ship bearing and sailing speed in knots',
        'Cartography: Gerardus Mercator’s 1569 map projection enabled true compass headings',
        'Ephemerides and navigational tables: calculated celestial positions accurately',
        'Printing press: allowed rapid distribution of voyage logs and marine manuals',
      ],
    },
    {
      themeNum: 2,
      badge: 'SHIP DESIGN',
      title: '2. Shipbuilding Innovations & Trade Routes',
      cues: [
        'Galleons: lower forecastles and longer keels increased sea-keeping and stability',
        'Lateen sails: triangular sails enabled ships to tack into the wind effectively',
        'Heavy naval armament: broadside-mounted culverins transformed merchantmen into warships',
        'Search for trade routes: North-East Passage (Muscovy Company) & North-West Passage',
        'Drive to break Spanish and Portuguese monopolies over Asian spice trade',
      ],
    },
    {
      themeNum: 3,
      badge: 'CIRCUMNAVIGATION',
      title: '3. Drake’s Global Track (1577–80)',
      cues: [
        'Departed Plymouth with 5 ships; sailed through deadly Strait of Magellan',
        '*Golden Hind* was sole ship to survive into Pacific Ocean waters',
        'Ransacked Spanish ports in Chile/Peru; took £140,000 from the *Cacafuego*',
        'Sailed north seeking North-West Passage; landed and claimed Nova Albion (California)',
        'Crossed Pacific to Moluccas (Ternate); negotiated clove trade; rounded Cape of Good Hope',
      ],
    },
    {
      themeNum: 4,
      badge: 'GEOPOLITICAL IMPACT',
      title: '4. Commercial Impact & Imperial Verdict',
      cues: [
        'Drake returned to Plymouth in Sept 1580: investors earned 4,700% profit',
        'Crown’s share paid off entire foreign national debt of £300,000',
        'Proved English maritime technology could challenge Iberian global hegemony',
        'Paved way for founding of East India Company in 1600',
        'Historical Verdict: Was Elizabethan exploration driven primarily by science, trade, or piracy?',
      ],
    },
  ],
  lesson_3_4: [
    {
      themeNum: 1,
      badge: 'COLONIAL VISION',
      title: '1. Walter Raleigh’s Colonisation Vision',
      cues: [
        'March 1584: Elizabeth granted Raleigh royal patent to colonize land not owned by Christians',
        'Strategic motives: base for privateers to raid Spanish treasure fleets in Caribbean',
        'Economic motives: access to valuable American commodities (timber, flax, tobacco, sugar)',
        '1584 reconnaissance expedition under Arthur Barlowe and Philip Amadas',
        'Barlowe returned with glowing reports and two Native Americans (Manteo and Wanchese)',
      ],
    },
    {
      themeNum: 2,
      badge: 'ROANOKE EXPEDITION',
      title: '2. The 1585 Roanoke Colony Voyage',
      cues: [
        'April 1585: fleet of 5 ships departed Plymouth carrying 107 male colonists',
        'Leadership: Sir Richard Grenville (naval commander) and Ralph Lane (colony governor)',
        'Flagship *Tiger* ran aground at Ocracoke Inlet; seawater flooded and ruined food supplies',
        'Colonists constructed a fort on Roanoke Island (modern-day North Carolina)',
        'Grenville returned to England for supplies, leaving colonists dependent on local tribes',
      ],
    },
    {
      themeNum: 3,
      badge: 'COLONY FAILURE',
      title: '3. Causes of the 1585 Colony Failure',
      cues: [
        'Unsuitable colonists: too many gentlemen who refused manual labour, lacking farmers',
        'Poor timing: late arrival meant seeds could not be planted before winter',
        'Hostility with Native Americans: English suspected theft of silver cup and burned a village',
        'Lane feared attack and killed Secotan Chief Wingina in June 1586',
        'Drake arrived two weeks later; exhausted and starving colonists evacuated back to England',
      ],
    },
    {
      themeNum: 4,
      badge: 'LOST COLONY',
      title: '4. The 1587 "Lost Colony" & Imperial Verdict',
      cues: [
        '1587: Second colony of 118 men, women, and children led by artist John White',
        'Birth of Virginia Dare, first English child born in the Americas',
        'White returned to England for supplies; delayed 3 years due to Spanish Armada threat',
        'August 1590: White returned; found settlement abandoned with only "CROATOAN" carved on post',
        'Historical Verdict: Did the Virginia failures prevent or pave the way for successful empire?',
      ],
    },
  ],
};

// ============================================================================
// KEY TOPICS MASTER CONFIGURATIONS
// ============================================================================
const KEY_TOPICS_DATA = {
  KT1: {
    keyTopicNum: 1,
    title: 'Queen, Government and Religion, 1558–69',
    subtitle:
      'Accession, Religious Settlement, Puritan & Catholic Challenges, and Mary, Queen of Scots',
    dateRange: '1558–1569',
    heroImage: {
      src: getBase64Image('/images/elizabeth_coronation_robes.jpg'),
      alt: 'Queen Elizabeth I in Coronation Robes',
      objectPosition: 'center 20%',
      shelfmark: 'NPG 2607 • NATIONAL PORTRAIT GALLERY • LONDON',
      date: 'c. 1600',
      title: 'Queen Elizabeth I in Coronation Robes',
      caption:
        'Unknown English Artist • Queen Elizabeth I depicted in her patterned cloth of gold coronation robes, holding the sovereign orb and sceptre. National Portrait Gallery, London (NPG 2607).',
      sourceTag: 'Historical Primary Record',
      archiveTag: 'Edexcel Paper 2 Master Archive',
      heightMm: 96,
    },
    specBox: {
      title: 'Pearson Edexcel GCSE (9–1) History Specification Content',
      specImageSrc: getBase64Image('/images/edexcel_spec_kt1_crop_precise.png'),
    },
    milestones: [
      {
        date: '17 NOV 1558',
        title: 'Accession of Elizabeth I & Council Appointments',
        tag: 'Key Topic 1.1',
        text: 'Mary I dies; 25-year-old Elizabeth succeeds to the throne. She immediately appoints trusted Protestant statesman Sir William Cecil as her Principal Secretary, confronting £300,000 in Crown debts and French military forces stationed in Scotland.',
      },
      {
        date: 'MAY 1559',
        title: 'The Acts of Supremacy & Uniformity (The Settlement)',
        tag: 'Key Topic 1.2',
        text: "Parliament passes the Religious Settlement. The Act of Supremacy establishes Elizabeth as 'Supreme Governor' of the Church of England; the Act of Uniformity mandates the 1559 Book of Common Prayer and imposes a 1 shilling fine for recusancy.",
      },
      {
        date: 'SUMMER 1559',
        title: 'The Royal Injunctions & National Visitations',
        tag: 'Key Topic 1.2',
        text: 'The Crown issues 57 Royal Injunctions enforcing Protestant worship. Clergy must preach royal supremacy, condemn papal authority, report recusants, and use English bibles. National visitations by 125 commissioners inspect parish compliance.',
      },
      {
        date: 'JULY 1560',
        title: 'The Treaty of Edinburgh',
        tag: 'Key Topic 1.1 / 1.4',
        text: 'French troops withdraw from Scotland after a rebellion by Protestant Scottish lords. The Treaty establishes peace and Mary, Queen of Scots gives up her claim to the English throne, though Mary refuses to formally ratify the agreement.',
      },
      {
        date: '1566',
        title: 'The Vestments Controversy & Puritan Dissent',
        tag: 'Key Topic 1.3',
        text: "Archbishop Matthew Parker issues the 'Book of Advertisements' requiring all clergy to wear the surplice and tippet. In London, 37 Puritan vicars refuse to wear Catholic-style vestments and are deprived of their livings, revealing deep Protestant divisions.",
      },
      {
        date: 'MAY 1568',
        title: 'Mary Queen of Scots Flees to England',
        tag: 'Key Topic 1.4',
        text: 'Following the murder of Lord Darnley and defeat at Carberry Hill, Catholic Mary Stuart flees Scotland in a fishing boat to Workington, Cumberland. Elizabeth places her under armed house arrest, triggering twenty years of Catholic conspiracy.',
      },
    ],
    enquiries: [
      {
        enquiryNum: 1,
        id: 'lesson_1_1',
        title: 'The situation on Elizabeth’s accession, 1558',
        inquiryQuestion:
          'How dangerous was the crisis facing Elizabeth I upon her accession in 1558?',
        subTitle:
          'Key Topic 1.1: Society, Government, Legitimacy, Marriage, Debt & Foreign Threats',
        specAnchor:
          'Elizabethan government (Monarch, Privy Council, Parliament, Lords Lieutenant, JPs); challenges of gender, legitimacy, and marriage; financial debt; foreign threats from France and Scotland.',
        doNow: [
          {
            q: 'Which Tudor monarch was Elizabeth I’s father?',
            a: 'King Henry VIII',
          },
          {
            q: 'Who was Elizabeth I’s mother, executed in 1536?',
            a: 'Anne Boleyn',
          },
          {
            q: 'Which Catholic queen preceded Elizabeth on the throne (1553–58)?',
            a: 'Mary I (Mary Tudor)',
          },
          {
            q: 'What religion was Queen Elizabeth I?',
            a: 'Protestant',
          },
          {
            q: 'What ancient English possession in France was lost in January 1558?',
            a: 'Calais',
          },
          {
            q: 'Approximately how much Crown debt did Elizabeth inherit in 1558?',
            a: '£300,000',
          },
          {
            q: 'Who did Elizabeth appoint as her trusted Principal Secretary in 1558?',
            a: 'Sir William Cecil (Lord Burghley)',
          },
          {
            q: 'Which institution had the sole legal power to grant monarchical taxes?',
            a: 'Parliament',
          },
          {
            q: 'Which unpaid local officials maintained law and order in counties?',
            a: 'Justices of the Peace (JPs)',
          },
          {
            q: 'Which northern kingdom was ruled by Mary of Guise in 1558?',
            a: 'Scotland',
          },
        ],
        vocabRef: '[Textbook §1.1–§2.1]',
        vocabTermA: 'Royal Prerogative',
        vocabTermB: 'Privy Council',
        vocabPrompt:
          'Explain the difference between the monarch’s personal right to make key decisions alone (<strong>Royal Prerogative</strong>) and her group of trusted noble advisers who ran the daily government (<strong>Privy Council</strong>):',
        featureA: {
          provenance: 'Edexcel June 2018 (Q1a)',
          ref: '[Textbook §1.1]',
          stem: 'Describe one key feature of the role of the Privy Council in 1558.',
          guidance:
            'Point (A group of 19 noble advisors who guided royal policy and administration) &bull; Fact (Led by William Cecil, they debated daily on war, finance, and treason, but the Queen had the final prerogative).',
          stems:
            'One key feature was that the Privy Council... Specifically, led by Sir William Cecil, they...',
        },
        featureB: {
          provenance: 'Edexcel June 2022 (Q1b)',
          ref: '[Textbook §3.1]',
          stem: 'Describe one key feature of the financial weaknesses Elizabeth faced in 1558.',
          guidance:
            'Point (The Crown was in crippling debt of £300,000 inherited from Mary I) &bull; Fact (Crown income had fallen due to inflation and selling royal land; debasement of the coinage ruined English credit abroad).',
          stems:
            'One key feature was the massive Crown debt inherited from Mary I... Specifically, the debt stood at...',
        },
        featureC: {
          provenance: 'Edexcel Specification Focus',
          ref: '[Textbook §2.3]',
          stem: 'Describe one key feature of the challenges Elizabeth faced regarding marriage in 1558.',
          guidance:
            'Point (Intense pressure to produce a Protestant heir and secure foreign alliances) &bull; Fact (Marriage to an English noble created factional jealousy; marrying a foreign Catholic prince risked foreign domination like Mary I and Philip II).',
          stems:
            'One key feature was the intense political dilemma over marriage... Specifically, Elizabeth was wary because...',
        },
        rightExam: {
          provenance: 'Edexcel June 2018 (Q2)',
          type: 'explain_why_12',
          tariff: 'Question 2: Explain Why [12 marks &bull; 18 mins]',
          stem: 'Explain why Elizabeth’s legitimacy was questioned when she became queen in 1558.',
          stimulus: ["Her parents' marriage", 'Mary, Queen of Scots'],
          structureStrip: [
            {
              col: '1. CAUSE 1: ANNE BOLEYN & PAPAL LAW',
              ref: '[Textbook §2.1–§2.2]',
              text: 'Explain that Catholics never recognized Henry VIII’s divorce from Catherine of Aragon; the Pope declared his marriage to Anne Boleyn illegal, rendering Elizabeth an illegitimate bastard.',
            },
            {
              col: '2. CAUSE 2: HENRY VIII’S OWN SUCCESSION ACTS',
              ref: '[Textbook §2.2]',
              text: 'Explain that after Anne Boleyn was beheaded in 1536, Parliament passed the 1536 Succession Act declaring Elizabeth illegitimate, creating enduring legal doubt despite the 1544 Act.',
            },
            {
              col: '3. CAUSE 3: CATHOLIC MARY, QUEEN OF SCOTS',
              ref: '[Textbook §4.1–§4.2]',
              text: 'Explain that strict Catholics viewed Mary Stuart, granddaughter of Henry VIII’s sister Margaret Tudor, as the legitimate, Catholic, God-ordained rightful heir to the English throne.',
            },
          ],
          connectives:
            'Elizabeth’s legitimacy was challenged primarily because... &bull; Specifically, Roman Catholic doctrine maintained that... &bull; Furthermore, this was compounded by Henry VIII’s own actions when... &bull; Consequently, English and European Catholics argued that... &bull; Ultimately, this weakness made Mary Stuart an existential threat because...',
          wordBank:
            'Legitimacy &bull; Catherine of Aragon &bull; Anne Boleyn &bull; Papal annulment &bull; Succession Act 1536 &bull; Mary, Queen of Scots &bull; Henry VIII &bull; Illegitimate &bull; Catholic Europe',
          timelineMission:
            'Turn to Pages 2–3 (Milestone 1). In Milestone 1, sketch the Tudor Rose crown and note Elizabeth’s £300,000 inherited debt.',
        },
      },
      {
        enquiryNum: 2,
        id: 'lesson_1_2',
        title: "The 'settlement' of religion, 1559",
        inquiryQuestion:
          'Was Elizabeth’s Religious Settlement a brilliant compromise or an unstable truce?',
        subTitle:
          'Key Topic 1.2: Act of Supremacy, Act of Uniformity, Royal Injunctions & The Prayer Book',
        specAnchor:
          'The Act of Supremacy (1559); the Act of Uniformity (1559); the Royal Injunctions (1559); the Book of Common Prayer; the role of the Church of England.',
        doNow: [
          {
            q: 'What title did Henry VIII claim over the Church of England in 1534?',
            a: 'Supreme Head of the Church of England',
          },
          {
            q: 'What language was the Catholic Latin Mass spoken in?',
            a: 'Latin',
          },
          {
            q: 'What term describes Protestants who wanted to purify the Church of all Catholic practices?',
            a: 'Puritans',
          },
          {
            q: 'What was the official fine for refusing to attend church under the 1559 Act of Uniformity?',
            a: 'One shilling (12 pence)',
          },
          {
            q: 'What title did Elizabeth I adopt under the 1559 Act of Supremacy?',
            a: 'Supreme Governor of the Church of England',
          },
          {
            q: 'What English prayer book was made compulsory in all parish churches in 1559?',
            a: 'The Book of Common Prayer',
          },
          {
            q: 'What official set of 57 instructions enforced the 1559 Settlement?',
            a: 'The Royal Injunctions',
          },
          {
            q: 'What was a Catholic called who refused to attend Anglican church services?',
            a: 'A Recusant',
          },
          {
            q: 'How many Marian Catholic bishops refused the Oath of Supremacy in 1559?',
            a: 'All except one (27 out of 28 bishops)',
          },
          {
            q: 'Who was appointed Elizabeth’s first Protestant Archbishop of Canterbury in 1559?',
            a: 'Matthew Parker',
          },
        ],
        vocabRef: '[Textbook §1.1–§2.1]',
        vocabTermA: 'Act of Supremacy',
        vocabTermB: 'Act of Uniformity',
        vocabPrompt:
          'Explain the difference between the law that made Elizabeth Supreme Governor of the Church (<strong>Act of Supremacy</strong>) and the law that set out rules for church services and the prayer book (<strong>Act of Uniformity</strong>):',
        featureA: {
          provenance: 'Edexcel SAMs (Q1a)',
          ref: '[Textbook §1.1]',
          stem: 'Describe one key feature of the Act of Supremacy (1559).',
          guidance:
            'Point (Made Elizabeth Supreme Governor of the Church of England rather than Supreme Head) &bull; Fact (All clergy and royal officials had to take an Oath of Supremacy acknowledging her title or lose their posts).',
          stems:
            'One key feature was that Elizabeth took the title of Supreme Governor... Specifically, this required all clergy to...',
        },
        featureB: {
          provenance: 'Edexcel June 2023 (Q1a)',
          ref: '[Textbook §2.1]',
          stem: 'Describe one key feature of the Royal Injunctions of 1559.',
          guidance:
            'Point (A set of 57 practical instructions issued by William Cecil to enforce church conformity) &bull; Fact (Commanded clergy to preach royal supremacy, keep an English Bible, report recusants, and ban unapproved preaching).',
          stems:
            'One key feature of the Royal Injunctions was to enforce uniform Protestant practice... Specifically, they ordered that...',
        },
        featureC: {
          provenance: 'Edexcel Specification Focus',
          ref: '[Textbook §1.2]',
          stem: 'Describe one key feature of the Act of Uniformity (1559).',
          guidance:
            'Point (Enforced identical church worship and prayer book throughout England) &bull; Fact (Made church attendance compulsory on Sundays with a one-shilling recusancy fine and reinstated the 1552 Protestant Book of Common Prayer).',
          stems:
            'One key feature was the legal enforcement of uniform church services... Specifically, the Act established that...',
        },
        rightExam: {
          provenance: 'Edexcel SAMs (Q3)',
          type: 'essay_16',
          tariff: 'Question 3: Evaluative Essay [16 marks + 4 SPaG &bull; 25 mins]',
          stem: '‘Elizabeth’s religious settlement of 1559 was completely successful in pleasing all religious groups.’ How far do you agree? Explain your answer.',
          stimulus: ['The Act of Uniformity (1559)', 'The Puritan challenge'],
          structureStrip: [
            {
              col: '1. CRITERIA 1: SUCCESSFUL VIA MEDIA',
              ref: '[Textbook §1.1–§2.2]',
              text: 'Explain how the Settlement successfully achieved a broad Middle Way: moderate Protestant theology (English services, Book of Common Prayer) combined with Catholic outward ritual (vestments, candles) to prevent civil war.',
            },
            {
              col: '2. CRITERIA 2: PURITAN DISCONTENT',
              ref: '[Textbook §3.1–§3.2]',
              text: 'Explain that the Settlement failed to satisfy zealous Puritans: they condemned the crucifix and vestments as "idolatrous popish rags" and challenged Elizabeth’s authority in the 1566 Vestments Controversy.',
            },
            {
              col: '3. CRITERIA 3: CATHOLIC ALIENATION',
              ref: '[Textbook §4.1–§4.2]',
              text: 'Explain that devout Catholics could not accept Elizabeth as Supreme Governor; almost all Catholic bishops resigned in 1559, recusancy grew in the North, and the Pope later excommunicated Elizabeth in 1570.',
            },
          ],
          connectives:
            'On the one hand, the settlement was highly effective because... &bull; Crucially, by adopting the title Supreme Governor, Elizabeth... &bull; In direct contrast, radical Puritans remained dissatisfied because... &bull; Furthermore, traditional Catholics viewed the settlement as heretical because... &bull; Weighing these factors, I conclude that while the settlement prevented immediate religious war, it was not completely successful because...',
          wordBank:
            'Settlement &bull; Supreme Governor &bull; Book of Common Prayer &bull; Surplice &bull; Middle Way (Via Media) &bull; Puritans &bull; Recusancy &bull; Compromise &bull; Vestments Controversy',
          timelineMission:
            'Turn to Pages 2–3 (Milestone 2). In Milestone 2, sketch the open English Book of Common Prayer and note the 1 shilling recusancy fine.',
        },
      },
      {
        enquiryNum: 3,
        id: 'lesson_1_3',
        title: 'Challenge to the religious settlement',
        inquiryQuestion:
          'Which group posed the greater danger to Elizabeth: zealous Puritans or defiant Catholics?',
        subTitle:
          'Key Topic 1.3: Crucifix Controversy, Vestments Controversy, Recusancy & The Papacy',
        specAnchor:
          'The nature and extent of the Puritan challenge (crucifix and vestments controversies); the nature and extent of the Catholic challenge (the papacy, recusancy, and foreign Catholic powers).',
        doNow: [
          {
            q: 'What Latin term means "the middle way", describing Elizabeth’s settlement?',
            a: 'Via Media',
          },
          {
            q: 'Which white linen robe did Puritans refuse to wear during church services?',
            a: 'The Surplice',
          },
          {
            q: 'Which Archbishop of Canterbury issued the 1566 Book of Advertisements?',
            a: 'Matthew Parker',
          },
          {
            q: 'How many London priests were dismissed in 1566 for refusing to wear vestments?',
            a: '37 priests',
          },
          {
            q: 'What object did Elizabeth place in the Royal Chapel that outraged Puritans?',
            a: 'A silver Crucifix',
          },
          {
            q: 'What Catholic movement aimed to stamp out Protestantism across Europe?',
            a: 'The Counter-Reformation',
          },
          {
            q: 'Which Catholic king ruled Spain, the Netherlands, and the Spanish Empire?',
            a: 'King Philip II of Spain',
          },
          {
            q: 'What region of England was most heavily Catholic in the 1560s?',
            a: 'The North of England (Lancashire, Yorkshire, Durham)',
          },
          {
            q: 'What council of Catholic clergy (1545–63) reaffirmed Catholic doctrines?',
            a: 'The Council of Trent',
          },
          {
            q: 'Did King Philip II of Spain immediately attack Elizabeth in 1559?',
            a: 'No (he hoped Elizabeth might marry him or ally with Spain against France)',
          },
        ],
        vocabRef: '[Textbook §1.1–§2.2]',
        vocabTermA: 'Puritans',
        vocabTermB: 'Recusants',
        vocabPrompt:
          'Explain the difference between extreme Protestants who wanted to purify the Church of Catholic rituals (<strong>Puritans</strong>) and Catholics who refused to attend Sunday church services (<strong>Recusants</strong>):',
        featureA: {
          provenance: 'Edexcel November 2020 (Q1a)',
          ref: '[Textbook §1.2]',
          stem: 'Describe one key feature of the Vestments Controversy (1566).',
          guidance:
            'Point (Puritan vicars refused to wear the surplice ordered by Archbishop Parker) &bull; Fact (Parker held an exhibition in London; 37 clergy refused to conform and were stripped of their livings and church posts).',
          stems:
            'One key feature was the clash over clerical dress... Specifically, Archbishop Parker insisted on the surplice, but 37 London clergy...',
        },
        featureB: {
          provenance: 'Edexcel June 2024 (Q1b)',
          ref: '[Textbook §3.1]',
          stem: 'Describe one key feature of recusancy in early Elizabethan England.',
          guidance:
            'Point (Catholics secretly practiced the Latin Mass and refused compulsory Sunday church services) &bull; Fact (They paid a 1 shilling fine each week; in the North, wealthy Catholic gentry protected recusant priests).',
          stems:
            'One key feature of recusancy was refusal to attend the new Anglican church... Specifically, recusants held secret Latin masses and paid...',
        },
        featureC: {
          provenance: 'Edexcel Specification Focus',
          ref: '[Textbook §1.3]',
          stem: 'Describe one key feature of the Puritan challenge over crucifixes.',
          guidance:
            'Point (Puritans objected to crucifixes as Catholic idolatry representing graven images) &bull; Fact (Puritan bishops threatened to resign when Elizabeth ordered crucifixes displayed in every church, forcing her to compromise by removing them from parish churches).',
          stems:
            'One key feature was strong Puritan resistance to visual symbols of Catholicism... Specifically, Puritans argued that...',
        },
        rightExam: {
          provenance: 'Edexcel June 2019 (Q2)',
          type: 'explain_why_12',
          tariff: 'Question 2: Explain Why [12 marks &bull; 18 mins]',
          stem: 'Explain why the Puritans challenged Elizabeth’s religious settlement between 1559 and 1566.',
          stimulus: ['Vestments', 'The Crucifix Controversy'],
          structureStrip: [
            {
              col: '1. CAUSE 1: VESTMENTS & POPISH RAGS',
              ref: '[Textbook §1.1–§1.3]',
              text: 'Explain that Puritans, influenced by Genevan Calvinism, viewed priestly vestments (surplices) as unscriptural Catholic idolatry that set clergy apart from ordinary congregations.',
            },
            {
              col: '2. CAUSE 2: CRUCIFIXES & GRAVEN IMAGES',
              ref: '[Textbook §2.1–§2.2]',
              text: 'Explain that Puritans believed crucifixes violated the Ten Commandments against graven images; several Puritan bishops threatened to resign when Elizabeth insisted on a crucifix in her chapel.',
            },
            {
              col: '3. CAUSE 3: BISHOPS & LITURGICAL PURITY',
              ref: '[Textbook §3.1–§3.2]',
              text: 'Explain that Puritans wanted to eradicate the hierarchy of bishops and eradicate holy days, organs, and kneeling at communion, aiming for an entirely purified biblical church.',
            },
          ],
          connectives:
            'The Puritans challenged the religious settlement primarily because... &bull; Specifically, their Calvinist theology taught that... &bull; This led directly to conflict over vestments when... &bull; In addition, the crucifix controversy demonstrated that... &bull; Consequently, Puritans believed Elizabeth had stopped halfway in reforming...',
          wordBank:
            'Calvinism &bull; Vestments Controversy (1566) &bull; Crucifix &bull; Surplice &bull; Graven images &bull; Idolatry &bull; Archbishop Parker &bull; Book of Advertisements &bull; Nonconformist',
          timelineMission:
            'Turn to Pages 2–3 (Milestone 5). In Milestone 5, sketch the plain Puritan surplice and the crossed-out Catholic crucifix.',
        },
      },
      {
        enquiryNum: 4,
        id: 'lesson_1_4',
        title: 'The problem of Mary, Queen of Scots',
        inquiryQuestion:
          'Was Mary, Queen of Scots an innocent royal refugee or an existential threat to the realm?',
        subTitle:
          'Key Topic 1.4: Royal Legitimacy, Flight to England (1568), Casket Letters & House Arrest',
        specAnchor:
          'Mary, Queen of Scots: her claim to the English throne; her arrival in England in 1568; relations between Elizabeth and Mary (1568–69); the Casket Letters inquiry.',
        doNow: [
          {
            q: 'Who was Mary, Queen of Scots’ first husband, King of France?',
            a: 'King Francis II',
          },
          {
            q: 'Which grandmother gave Mary Stuart a legitimate claim to the English throne?',
            a: 'Margaret Tudor (sister of Henry VIII)',
          },
          {
            q: 'What religion was Mary, Queen of Scots?',
            a: 'Roman Catholic',
          },
          {
            q: 'Who was Mary’s second husband, found strangled after Kirk o’Field exploded in 1567?',
            a: 'Lord Darnley',
          },
          {
            q: 'Whom did Mary marry shortly after Darnley’s suspicious death?',
            a: 'The Earl of Bothwell',
          },
          {
            q: 'In what year did Mary Stuart flee across the border into England?',
            a: '1568',
          },
          {
            q: 'In what northern castle was Mary first held under armed house arrest?',
            a: 'Carlisle Castle (later Bolton Castle)',
          },
          {
            q: 'What alleged love letters were presented to prove Mary murdered Darnley?',
            a: 'The Casket Letters',
          },
          {
            q: 'Did Elizabeth formally find Mary guilty of murder at the York Inquiry in 1568–69?',
            a: 'No (Elizabeth gave a "not proven" verdict to avoid executing a sovereign monarch)',
          },
          {
            q: 'Which powerful Catholic noble family in France was Mary closely related to?',
            a: 'The Guise family (House of Guise)',
          },
        ],
        vocabRef: '[Textbook §1.1–§2.1]',
        vocabTermA: 'Legitimacy',
        vocabTermB: 'Succession',
        vocabPrompt:
          'Explain the difference between whether a monarch was born to legally married parents (<strong>Legitimacy</strong>) and the legal right to inherit the crown after Elizabeth died (<strong>Succession</strong>):',
        featureA: {
          provenance: 'Edexcel November 2021 (Q1a)',
          ref: '[Textbook §1.1]',
          stem: 'Describe one key feature of Mary, Queen of Scots’ claim to the English throne.',
          guidance:
            'Point (Mary was the great-granddaughter of Henry VII through Margaret Tudor) &bull; Fact (Because Catholics viewed Elizabeth as illegitimate, many regarded Mary as the rightful, legitimate Catholic Queen of England).',
          stems:
            'One key feature was Mary’s legitimate Tudor bloodline... Specifically, as great-granddaughter of Henry VII, English Catholics viewed her as...',
        },
        featureB: {
          provenance: '★ High-Yield Forecast (Q1b)',
          ref: '[Textbook §3.1]',
          stem: 'Describe one key feature of the inquiry into the Casket Letters (1568–69).',
          guidance:
            'Point (A commission held at York and Westminster to investigate whether Mary plotted Darnley’s murder) &bull; Fact (Elizabeth reached a "not proven" verdict; this allowed her to keep Mary detained in England without executing an anointed queen).',
          stems:
            'One key feature of the Casket Letters inquiry was to determine Mary’s guilt... Specifically, the inquiry concluded with a verdict of...',
        },
        featureC: {
          provenance: 'Edexcel Specification Focus',
          ref: '[Textbook §2.2]',
          stem: 'Describe one key feature of Mary, Queen of Scots’ arrival in England in May 1568.',
          guidance:
            'Point (Mary fled Scotland after Protestant nobles defeated her and sought Elizabeth’s military aid) &bull; Fact (Elizabeth placed Mary under house arrest in the north because her presence as a legitimate Catholic claimant threatened English stability).',
          stems:
            'One key feature of Mary’s arrival was the acute security crisis it posed... Specifically, Elizabeth decided to...',
        },
        rightExam: {
          provenance: 'Edexcel June 2022 (Q3a)',
          type: 'essay_16',
          tariff: 'Question 3: Evaluative Essay [16 marks + 4 SPaG &bull; 25 mins]',
          stem: '‘The arrival of Mary, Queen of Scots in England in 1568 was the main cause of instability in Elizabethan government.’ How far do you agree? Explain your answer.',
          stimulus: ['Mary’s claim to the throne', 'Religious divisions in the North'],
          structureStrip: [
            {
              col: '1. CRITERIA 1: MARY AS CATHOLIC FIGUREHEAD',
              ref: '[Textbook §1.1–§2.2]',
              text: 'Explain how Mary’s physical presence provided a live, legitimate Catholic alternative to Elizabeth, immediately attracting discontented northern nobles and foreign Catholic conspirators.',
            },
            {
              col: '2. CRITERIA 2: PRE-EXISTING NORTHERN DISCONTENT',
              ref: '[Textbook §3.1–§3.2]',
              text: 'Explain that the North was already deeply Catholic and alienated by Cecil’s centralizing Protestant government; the Earls of Northumberland and Westmorland had lost land and influence before 1568.',
            },
            {
              col: '3. CRITERIA 3: SUCCESSION & DIPLOMATIC RISK',
              ref: '[Textbook §4.1–§4.2]',
              text: 'Explain that Elizabeth had no heir; Mary’s presence forced foreign powers (France, Spain, Papacy) to view Elizabeth as expendable, turning Mary into a catalyst for domestic rebellion.',
            },
          ],
          connectives:
            'Mary’s arrival was undeniably a major cause of instability because... &bull; Specifically, her presence gave English Catholics a figurehead who... &bull; However, severe instability already existed because the northern nobility... &bull; Furthermore, Elizabeth’s refusal to marry meant that... &bull; On balance, while northern grievances were deep-seated, Mary’s arrival was the decisive catalyst because...',
          wordBank:
            'Mary, Queen of Scots &bull; Legitimacy &bull; Anointed Queen &bull; Casket Letters &bull; Carlisle Castle &bull; Northern Earls &bull; Succession &bull; Catholic Figurehead &bull; House arrest',
          timelineMission:
            'Turn to Pages 2–3 (Milestone 6). In Milestone 6, sketch Carlisle Castle where Mary Stuart was first held under house arrest in 1568.',
        },
      },
    ],
  },

  // ==========================================================================
  // KEY TOPIC 2: Challenges to Elizabeth at home and abroad, 1569–88
  // ==========================================================================
  KT2: {
    keyTopicNum: 2,
    title: 'Challenges to Elizabeth at Home and Abroad, 1569–88',
    subtitle: 'Catholic Plots, Mary’s Execution, Spanish Rivalry & The Armada',
    dateRange: '1569–1588',
    heroImage: {
      src: getBase64Image('/images/armada_portrait.jpg'),
      alt: 'The Armada Portrait of Queen Elizabeth I (1588)',
      objectPosition: 'center 30%',
      shelfmark: 'WOBURN ABBEY COLLECTION • BEDFORDSHIRE • WA-INV-042',
      date: 'c. 1588',
      title: 'The Armada Portrait of Queen Elizabeth I',
      caption:
        'Attributed to George Gower • Queen Elizabeth I sits in triumph with her right hand resting on a global orb. Behind her, windows depict the English fireships assaulting the Spanish fleet at Gravelines and the Armada wrecked on stormy rocks. Accession Shelfmark WA-INV-042.',
      sourceTag: 'Historical Primary Source',
      archiveTag: 'Edexcel Paper 2 Master Archive',
      heightMm: 106,
    },
    specBox: {
      title: 'Pearson Edexcel GCSE (9–1) History Specification Content',
      specImageSrc: getBase64Image('/images/edexcel_spec_kt2_crop_precise.png'),
    },
    milestones: [
      {
        date: 'NOV 1569',
        title: 'Revolt of the Northern Earls',
        tag: 'Key Topic 2.1',
        text: 'Catholic Earls of Northumberland and Westmorland march on Durham Cathedral, tear up English bibles, and restore the Latin Mass with 4,600 men. Royal troops march north; the rebellion collapses and Elizabeth executes 450 rebels to crush northern disobedience.',
      },
      {
        date: 'FEB 1570',
        title: 'Papal Bull *Regnans in Excelsis*',
        tag: 'Key Topic 2.1',
        text: "Pope Pius V issues a papal bull excommunicating Elizabeth, declaring her a 'pretended queen' and heretic. Crucially, the Pope releases all Catholic subjects from their oath of allegiance, making it a sacred Catholic duty to overthrow the Queen.",
      },
      {
        date: '1571–1583',
        title: 'The Ridolfi and Throckmorton Plots',
        tag: 'Key Topic 2.1',
        text: 'Italian banker Roberto Ridolfi plans a Spanish invasion by the Duke of Alba to marry Mary to the Duke of Norfolk. In 1583, French Catholic Francis Throckmorton coordinates a planned invasion backed by Spain and the Pope. Walsingham uncovers both.',
      },
      {
        date: 'AUG 1585',
        title: 'The Treaty of Nonsuch & Open War with Spain',
        tag: 'Key Topic 2.3',
        text: 'Following the assassination of Dutch Protestant leader William of Orange, Elizabeth signs the Treaty of Nonsuch with Dutch rebels, agreeing to send 7,400 troops under Robert Dudley. This ends decades of cold war and triggers open military conflict with Spain.',
      },
      {
        date: '1586–FEB 1587',
        title: 'The Babington Plot & Execution of Mary Stuart',
        tag: 'Key Topic 2.1',
        text: 'Anthony Babington sends coded letters in beer barrels to Mary Stuart agreeing to assassinate Elizabeth. Walsingham’s codebreaker Thomas Phelippes intercepts Mary’s endorsement. Mary is convicted of high treason and beheaded at Fotheringhay Castle on 8 Feb 1587.',
      },
      {
        date: 'APR 1587–AUG 1588',
        title: 'Drake at Cadiz & Defeat of the Spanish Armada',
        tag: 'Key Topic 2.4',
        text: "Drake raids Cadiz harbour, destroying 30 Spanish ships ('singeing the King's beard') and delaying the Armada by a year. In July 1588, 130 Spanish ships enter the Channel. English fireships break their formation at Calais; Gravelines artillery seals English victory.",
      },
    ],
    enquiries: [
      {
        enquiryNum: 1,
        id: 'lesson_2_1',
        title: 'Plots and revolts at home',
        inquiryQuestion:
          'Why did every Catholic plot to assassinate Elizabeth end in catastrophic failure?',
        subTitle:
          'Key Topic 2.1: Northern Earls, Ridolfi, Throckmorton, Babington & Walsingham’s Spies',
        specAnchor:
          'The Revolt of the Northern Earls (1569); plots: Ridolfi (1571), Throckmorton (1583), Babington (1586); Walsingham’s network of spies; execution of Mary Queen of Scots (1587).',
        doNow: [
          {
            q: 'Which two northern Catholic earls led the 1569 rebellion?',
            a: 'The Earls of Northumberland and Westmorland',
          },
          {
            q: 'Which Catholic cathedral did the Northern Earls seize to celebrate the Latin Mass?',
            a: 'Durham Cathedral',
          },
          {
            q: 'What papal bull excommunicated Elizabeth I in 1570?',
            a: 'Regnans in Excelsis',
          },
          {
            q: 'Which English duke was executed in 1572 for his role in the Ridolfi Plot?',
            a: 'The Duke of Norfolk (Thomas Howard)',
          },
          {
            q: 'Who was Queen Elizabeth’s Spymaster General from 1573?',
            a: 'Sir Francis Walsingham',
          },
          {
            q: 'How did plotters smuggle coded messages to Mary Stuart during the Babington Plot?',
            a: 'Inside the bungs of beer barrels',
          },
          {
            q: 'What skilled cryptographer decoded Mary Stuart’s letters for Walsingham?',
            a: 'Thomas Phelippes',
          },
          {
            q: 'What 1584 document pledged to execute anyone who attempted to assassinate Elizabeth?',
            a: 'The Bond of Association',
          },
          {
            q: 'In which castle was Mary, Queen of Scots beheaded on 8 February 1587?',
            a: 'Fotheringhay Castle',
          },
          {
            q: 'Approximately how many northern rebels did Elizabeth execute after the 1569 revolt?',
            a: 'Approximately 450 rebels',
          },
        ],
        vocabRef: '[Textbook §1.1–§2.2]',
        vocabTermA: 'Papal Bull',
        vocabTermB: 'Conspiracy',
        vocabPrompt:
          'Explain the difference between an official written order issued by the Pope (<strong>Papal Bull</strong>) and a secret agreement between people to overthrow or kill the Queen (<strong>Conspiracy</strong>):',
        featureA: {
          provenance: 'Edexcel June 2018 (Q1b)',
          ref: '[Textbook §1.2]',
          stem: 'Describe one key feature of the Revolt of the Northern Earls (1569).',
          guidance:
            'Point (A Catholic uprising led by the Earls of Northumberland and Westmorland to restore Catholicism) &bull; Fact (They held a Latin Mass in Durham Cathedral with 4,600 men, but fled when royal troops advanced; 450 rebels were executed).',
          stems:
            'One key feature was the northern Catholic nobles’ attempt to overthrow Protestantism... Specifically, they captured Durham Cathedral and...',
        },
        featureB: {
          provenance: 'Edexcel June 2023 (Q1b)',
          ref: '[Textbook §3.1]',
          stem: 'Describe one key feature of Sir Francis Walsingham’s spy network.',
          guidance:
            'Point (An extensive intelligence network of spies, informers, codebreakers, and cryptographers) &bull; Fact (Walsingham intercepted letters, cracked ciphers with Thomas Phelippes, and deployed double agents across England and Europe).',
          stems:
            'One key feature was Walsingham’s systematic interception of secret communications... Specifically, his cryptographer Thomas Phelippes...',
        },
        featureC: {
          provenance: 'Edexcel Specification Focus',
          ref: '[Textbook §2.1]',
          stem: 'Describe one key feature of the Ridolfi Plot (1571).',
          guidance:
            'Point (A conspiracy led by Italian banker Roberto Ridolfi to assassinate Elizabeth and place Mary on the throne) &bull; Fact (Planned for 10,000 Spanish troops under the Duke of Alba to invade; Cecil uncovered the cipher letters and the Duke of Norfolk was executed).',
          stems:
            'One key feature was the conspiracy to depose Elizabeth with Spanish military backing... Specifically, the plotters planned to...',
        },
        rightExam: {
          provenance: 'Edexcel June 2018 (Q2)',
          type: 'explain_why_12',
          tariff: 'Question 2: Explain Why [12 marks &bull; 18 mins]',
          stem: 'Explain why Mary, Queen of Scots was executed in 1587.',
          stimulus: ['The Babington Plot (1586)', 'Walsingham’s spy network'],
          structureStrip: [
            {
              col: '1. CAUSE 1: DIRECT COMPLICITY IN BABINGTON PLOT',
              ref: '[Textbook §2.2–§2.3]',
              text: 'Explain that intercepted beer-barrel letters explicitly showed Mary endorsing Anthony Babington’s plot to assassinate Elizabeth; Phelippes decoded Mary’s letter containing the postmark gallows sign.',
            },
            {
              col: '2. CAUSE 2: WALSINGHAM & PARLIAMENTARY PRESSURE',
              ref: '[Textbook §3.1–§3.2]',
              text: 'Explain that the 1584 Bond of Association legally obligated privy councillors to execute anyone involved in assassination plots; Parliament and Cecil relentlessly lobbied Elizabeth to sign the death warrant.',
            },
            {
              col: '3. CAUSE 3: ESCALATING SPANISH WAR THREAT',
              ref: '[Textbook §4.1–§4.2]',
              text: 'Explain that by 1586 England was at open war with Spain following the Treaty of Nonsuch; keeping Mary alive created an immediate rallying figure for an imminent Spanish invasion of England.',
            },
          ],
          connectives:
            'Mary Stuart was executed in 1587 primarily because... &bull; Specifically, Walsingham obtained conclusive forensic evidence when... &bull; Furthermore, under the Bond of Association, Privy Councillors argued that... &bull; In addition, with war looming against Spain, Mary represented... &bull; Consequently, these combined pressures forced Elizabeth to sign the death warrant because...',
          wordBank:
            'Mary, Queen of Scots &bull; Babington Plot &bull; Walsingham &bull; Thomas Phelippes &bull; Bond of Association &bull; Fotheringhay Castle &bull; High Treason &bull; Ciphers &bull; Philip II',
          timelineMission:
            'Turn to Pages 2–3 (Milestone 5). In Milestone 5, sketch the beer barrel with hidden cipher letters and the execution block at Fotheringhay.',
        },
      },
      {
        enquiryNum: 2,
        id: 'lesson_2_2',
        title: 'Relations with Spain',
        inquiryQuestion:
          'Was war between England and Spain inevitable from the moment Elizabeth took the throne?',
        subTitle: 'Key Topic 2.2: Commercial Rivalry, Privateering, Drake & Religious Conflict',
        specAnchor:
          'Political and religious rivalry between England and Spain; commercial rivalry in the New World; English privateering and the activities of Sir Francis Drake.',
        doNow: [
          {
            q: 'Which Spanish king had previously been married to Elizabeth’s sister Mary I?',
            a: 'King Philip II of Spain',
          },
          {
            q: 'What religion was Philip II, positioning himself as champion of the Counter-Reformation?',
            a: 'Roman Catholic',
          },
          {
            q: 'What Spanish monopoly prohibited English merchants from trading in the Americas?',
            a: 'The trade monopoly on Spanish New World colonies',
          },
          {
            q: 'What term describes state-licensed sea captains who raided enemy merchant ships?',
            a: 'Privateers',
          },
          {
            q: 'Which English privateer became the first to circumnavigate the globe (1577–80)?',
            a: 'Sir Francis Drake',
          },
          {
            q: 'What famous Spanish treasure ship was captured by Drake off Ecuador in 1579?',
            a: 'The *Nuestra Señora de la Concepción* (nicknamed the *Cacafuego*)',
          },
          {
            q: 'How much silver and treasure did Drake capture from the *Cacafuego*?',
            a: 'Over £140,000 (worth tens of millions today)',
          },
          {
            q: 'Where did Elizabeth publicly knight Francis Drake in 1581?',
            a: 'On board the *Golden Hind* at Deptford',
          },
          {
            q: 'Why was Philip II enraged by Elizabeth knighting Francis Drake?',
            a: 'He viewed Drake as a common pirate and thief of Spanish property',
          },
          {
            q: 'What Dutch territory revolted against Philip II’s rule in 1566?',
            a: 'The Netherlands (Spanish Netherlands)',
          },
        ],
        vocabRef: '[Textbook §1.1–§2.1]',
        vocabTermA: 'Privateer',
        vocabTermB: 'Trade Embargo',
        vocabPrompt:
          'Explain the difference between an armed sailor licensed by the Queen to capture enemy ships (<strong>Privateer</strong>) and a government ban that stops all trade with another nation (<strong>Trade Embargo</strong>):',
        featureA: {
          provenance: 'Edexcel June 2019 (Q1a)',
          ref: '[Textbook §1.2]',
          stem: 'Describe one key feature of commercial rivalry between England and Spain in the New World.',
          guidance:
            'Point (Spain held an exclusive trade monopoly on its American colonies that barred English merchants) &bull; Fact (English privateers like John Hawkins and Drake bypassed Spanish licenses to trade illegally and seize Spanish bullion ships).',
          stems:
            'One key feature was Spanish trade restrictions in the Caribbean... Specifically, Spain banned English merchants, prompting privateers like Drake to...',
        },
        featureB: {
          provenance: 'Edexcel November 2021 (Q1b)',
          ref: '[Textbook §2.2]',
          stem: 'Describe one key feature of Sir Francis Drake’s raid on the Cacafuego (1579).',
          guidance:
            'Point (Drake captured Spain’s richest treasure galleon in the Pacific during his circumnavigation) &bull; Fact (He seized 80lb of gold, 26 tons of silver, and jewels worth £140,000, bringing it back to Elizabeth on the Golden Hind).',
          stems:
            'One key feature was the colossal value of the treasure seized... Specifically, Drake intercepted the treasure ship off Ecuador and took...',
        },
        featureC: {
          provenance: 'Edexcel Specification Focus',
          ref: '[Textbook §1.2]',
          stem: 'Describe one key feature of English privateering against Spanish treasure fleets.',
          guidance:
            'Point (Elizabeth secretly backed English captains to capture Spanish silver without open declaration of war) &bull; Fact (Captains like Francis Drake held royal letters of marque, bringing vast riches to England and crippling Philip II’s Atlantic supply lines).',
          stems:
            'One key feature was the covert state sponsorship of privateering raids... Specifically, English privateers...',
        },
        rightExam: {
          provenance: 'Edexcel June 2023 (Q3a)',
          type: 'essay_16',
          tariff: 'Question 3: Evaluative Essay [16 marks + 4 SPaG &bull; 25 mins]',
          stem: '‘Commercial rivalry in the Americas was the main cause of worsening relations between England and Spain between 1569 and 1585.’ How far do you agree? Explain your answer.',
          stimulus: ['Francis Drake’s privateering', 'Religious conflict'],
          structureStrip: [
            {
              col: '1. CRITERIA 1: COMMERCIAL RIVALRY & DRAKE',
              ref: '[Textbook §1.1–§2.2]',
              text: 'Explain how Drake’s raids in the West Indies and Pacific humiliated Philip II; by knighting Drake in 1581 and funding privateers, Elizabeth demonstrated state sponsorship of piracy against Spanish bullion.',
            },
            {
              col: '2. CRITERIA 2: RELIGIOUS ANTAGONISM',
              ref: '[Textbook §3.1–§3.2]',
              text: 'Explain that Philip viewed himself as the secular sword of the Catholic Counter-Reformation; the 1570 papal bull excommunicating Elizabeth and Philip’s backing of plots (Ridolfi, Throckmorton) made holy war inevitable.',
            },
            {
              col: '3. CRITERIA 3: THE STRATEGIC NETHERLANDS CRISIS',
              ref: '[Textbook §4.1–§4.2]',
              text: 'Explain that Spain’s military brutality in the Netherlands (Alba and Parma) threatened England’s chief wool export market; Spanish control of Channel ports was an intolerable direct invasion threat.',
            },
          ],
          connectives:
            'Commercial rivalry was an explosive cause of hostility because... &bull; Specifically, Drake’s plundering of Spanish galleons directly attacked Philip’s treasury and prestige... &bull; However, religious divisions deepened the clash because Philip believed... &bull; Furthermore, the strategic geopolitical crisis in the Netherlands was arguably more urgent because... &bull; Weighing these factors, I conclude that while commercial piracy provoked constant anger, the Netherlands crisis was the decisive trigger because...',
          wordBank:
            'Commercial rivalry &bull; Privateers &bull; Francis Drake &bull; *Golden Hind* &bull; *Cacafuego* &bull; Philip II &bull; Netherlands &bull; Papal Bull (1570) &bull; Counter-Reformation',
          timelineMission:
            'Turn to Pages 2–3 (Milestone 3). In Milestone 3, sketch Drake’s ship the *Golden Hind* and the Spanish silver bars.',
        },
      },
      {
        enquiryNum: 3,
        id: 'lesson_2_3',
        title: 'Outbreak of war with Spain, 1585–88',
        inquiryQuestion:
          'Did English intervention in the Netherlands or Drake’s raid on Cadiz make the Armada inevitable?',
        subTitle:
          'Key Topic 2.3: The Dutch Revolt, Treaty of Nonsuch (1585), Robert Dudley & Cadiz (1587)',
        specAnchor:
          'The Dutch Revolt and English involvement in the Netherlands (Treaty of Nonsuch, Robert Dudley); Drake’s raid on Cadiz (1587) and "Singeing the King of Spain’s Beard".',
        doNow: [
          {
            q: 'Which Dutch Protestant leader was assassinated by a Catholic fanatic in 1584?',
            a: 'William of Orange (William the Silent)',
          },
          {
            q: 'What treaty between Philip II and the French Catholic League was signed in 1584?',
            a: 'The Treaty of Joinville',
          },
          {
            q: 'What 1585 treaty committed English troops to fight alongside Dutch rebels?',
            a: 'The Treaty of Nonsuch',
          },
          {
            q: 'Who was appointed commander of the 7,400 English soldiers sent to the Netherlands?',
            a: 'Robert Dudley, Earl of Leicester',
          },
          {
            q: 'What controversial political title did Robert Dudley accept in the Netherlands, outraging Elizabeth?',
            a: 'Governor-General of the United Provinces',
          },
          {
            q: 'Which brilliant Spanish general commanded the Army of Flanders in the Netherlands?',
            a: 'The Duke of Parma (Alexander Farnese)',
          },
          {
            q: 'In which Spanish harbour did Francis Drake launch a daring surprise raid in April 1587?',
            a: 'Cadiz Harbour',
          },
          {
            q: 'How many Spanish ships did Drake destroy in Cadiz harbour in 36 hours?',
            a: 'Approximately 30 ships',
          },
          {
            q: 'What famous phrase described Drake’s raid on Cadiz?',
            a: '"Singeing the King of Spain’s Beard"',
          },
          {
            q: 'What vital naval supplies did Drake destroy at Cadiz that crippled the Armada’s food storage?',
            a: 'Seasoned oak barrel staves (ruining water and provisions)',
          },
        ],
        vocabRef: '[Textbook §1.1–§2.2]',
        vocabTermA: 'Treaty of Nonsuch',
        vocabTermB: 'Raid on Cadiz',
        vocabPrompt:
          'Explain the difference between England’s treaty promising direct military troops to Dutch rebels (<strong>Treaty of Nonsuch</strong>) and Drake’s surprise naval attack that delayed the Spanish Armada (<strong>Raid on Cadiz</strong>):',
        featureA: {
          provenance: 'Edexcel June 2022 (Q1a)',
          ref: '[Textbook §1.2]',
          stem: 'Describe one key feature of the Treaty of Nonsuch (1585).',
          guidance:
            'Point (An official military alliance committing England to support Dutch Protestant rebels against Spain) &bull; Fact (Elizabeth sent 7,400 soldiers under the Earl of Leicester and financed their campaign, officially ending covert neutrality).',
          stems:
            'One key feature was England’s formal military commitment to the Dutch rebels... Specifically, Elizabeth agreed to send...',
        },
        featureB: {
          provenance: 'Edexcel June 2019 (Q1b)',
          ref: '[Textbook §3.1]',
          stem: 'Describe one key feature of Francis Drake’s raid on Cadiz in 1587.',
          guidance:
            'Point (A surprise pre-emptive attack on Spain’s primary naval staging base at Cadiz) &bull; Fact (Drake destroyed 30 Spanish warships and tons of seasoned barrel staves, delaying the sailing of the Armada by over 12 months).',
          stems:
            'One key feature was the devastating destruction of Spanish naval shipping... Specifically, Drake sailed directly into Cadiz harbour and...',
        },
        featureC: {
          provenance: 'Edexcel Specification Focus',
          ref: '[Textbook §1.1]',
          stem: 'Describe one key feature of the Treaty of Joinville (1584).',
          guidance:
            'Point (A secret alliance between Philip II of Spain and the French Catholic League) &bull; Fact (Both parties agreed to eradicate Protestantism, isolating England and removing France as a counterweight against Spanish aggression).',
          stems:
            'One key feature was the secret Catholic alliance signed between Spain and France... Specifically, the Treaty of Joinville meant that...',
        },
        rightExam: {
          provenance: 'Edexcel November 2020 (Q2)',
          type: 'explain_why_12',
          tariff: 'Question 2: Explain Why [12 marks &bull; 18 mins]',
          stem: 'Explain why Elizabeth signed the Treaty of Nonsuch with Dutch rebels in 1585.',
          stimulus: ['The assassination of William of Orange', 'The Treaty of Joinville'],
          structureStrip: [
            {
              col: '1. CAUSE 1: ASSASSINATION OF WILLIAM OF ORANGE',
              ref: '[Textbook §1.1–§1.2]',
              text: 'Explain that the murder of William the Silent in July 1584 left the Dutch rebellion leaderless and facing total collapse; if the Dutch fell, Parma’s veteran Spanish army would turn directly on England.',
            },
            {
              col: '2. CAUSE 2: THE TREATY OF JOINVILLE & ISOLATION',
              ref: '[Textbook §2.1–§2.2]',
              text: 'Explain that in Dec 1584 Spain and France signed the Treaty of Joinville, uniting the two Catholic superpowers; England faced total diplomatic encirclement and could no longer play France off against Spain.',
            },
            {
              col: '3. CAUSE 3: STRATEGIC CONTROL OF CHANNEL PORTS',
              ref: '[Textbook §3.1–§3.2]',
              text: 'Explain that deep-water Dutch ports like Antwerp, Flushing, and Brill lay directly opposite the Thames estuary; Elizabeth had to secure these ports to prevent an invasion springboard into southern England.',
            },
          ],
          connectives:
            'Elizabeth signed the Treaty of Nonsuch primarily because... &bull; Crucially, the sudden assassination of William of Orange meant that... &bull; This danger was intensified by the Treaty of Joinville, which... &bull; Furthermore, from a military standpoint, controlling Dutch Channel ports was vital because... &bull; Consequently, Elizabeth was forced to abandon covert diplomacy and declare open military commitment because...',
          wordBank:
            'Treaty of Nonsuch &bull; William of Orange &bull; Treaty of Joinville &bull; Robert Dudley &bull; Duke of Parma &bull; Netherlands &bull; Army of Flanders &bull; Flushing &bull; Channel ports',
          timelineMission:
            'Turn to Pages 2–3 (Milestone 4). In Milestone 4, sketch the Dutch Protestant rebel banner and the Treaty of Nonsuch seal.',
        },
      },
      {
        enquiryNum: 4,
        id: 'lesson_2_4',
        title: 'The Armada',
        inquiryQuestion:
          'Why did the Spanish Armada fail: superior English tactics or disastrous Spanish planning?',
        subTitle:
          'Key Topic 2.4: Spanish Invasion Plan, Ship Design, Fireships at Calais & Battle of Gravelines',
        specAnchor:
          'The Spanish invasion plan and leadership of Medina Sidonia; English naval design (Hawkins) and artillery; fireships at Calais; the Battle of Gravelines (1588); the reasons for the Armada’s defeat.',
        doNow: [
          {
            q: 'How many ships sailed in the Spanish Armada in May 1588?',
            a: '130 ships',
          },
          {
            q: 'Who was appointed Commander-in-Chief of the Spanish Armada by Philip II?',
            a: 'The Duke of Medina Sidonia',
          },
          {
            q: 'What veteran Spanish army in the Netherlands was the Armada supposed to collect?',
            a: 'The Duke of Parma’s Army of Flanders (27,000 troops)',
          },
          {
            q: 'Who served as Lord High Admiral commanding the English fleet in 1588?',
            a: 'Lord Howard of Effingham',
          },
          {
            q: 'What naval treasurer revolutionized English galleon design with lower forecastles?',
            a: 'Sir John Hawkins',
          },
          {
            q: 'What long-range naval cannon allowed English ships to bombard Spanish galleons from safety?',
            a: 'Culverins',
          },
          {
            q: 'What defensive formation did the Spanish Armada maintain sailing up the Channel?',
            a: 'The tight Crescent Formation',
          },
          {
            q: 'What terrifying tactic did the English use at midnight on 7 August off Calais?',
            a: 'Eight Hellburners / Fireships',
          },
          {
            q: 'What decisive naval battle was fought on 8 August 1588 off the Flemish coast?',
            a: 'The Battle of Gravelines',
          },
          {
            q: 'What route were the surviving Spanish ships forced to take back to Spain?',
            a: 'North around Scotland and the west coast of Ireland',
          },
        ],
        vocabRef: '[Textbook §1.1–§2.2]',
        vocabTermA: 'Galleon',
        vocabTermB: 'Fireships',
        vocabPrompt:
          'Explain the difference between a large, heavily armed warship designed for ocean fighting (<strong>Galleon</strong>) and burning vessels sent into the Spanish fleet to cause panic and scatter their formation (<strong>Fireships</strong>):',
        featureA: {
          provenance: 'Edexcel November 2020 (Q1b)',
          ref: '[Textbook §1.2]',
          stem: 'Describe one key feature of the Spanish invasion plan of 1588.',
          guidance:
            'Point (A joint operation requiring the Armada to rendezvous with the Duke of Parma’s army in the Netherlands) &bull; Fact (Medina Sidonia had to transport Parma’s 27,000 veteran soldiers across the Channel on flat-bottomed barges to invade Kent).',
          stems:
            'One key feature was the coordination required between fleet and army... Specifically, Medina Sidonia was ordered to rendezvous with Parma at...',
        },
        featureB: {
          provenance: 'Edexcel June 2024 (Q1a)',
          ref: '[Textbook §3.1]',
          stem: 'Describe one key feature of the English fireship attack at Calais (7 August 1588).',
          guidance:
            'Point (Eight burning ships filled with pitch and gunpowder were launched into the anchored Spanish fleet) &bull; Fact (Spanish captains panicked, cut their anchor cables, and broke their defensive crescent formation, scattering into the open sea).',
          stems:
            'One key feature was the psychological panic caused by the fireships... Specifically, Spanish captains cut their anchors and broke...',
        },
        featureC: {
          provenance: 'Edexcel Specification Focus',
          ref: '[Textbook §2.2]',
          stem: 'Describe one key feature of English naval tactics during the Armada campaign.',
          guidance:
            'Point (English ships utilized superior maneuverability and long-range gunnery) &bull; Fact (English race-built galleons kept out of Spanish grappling range, pounding Spanish vessels with culverin broadsides and causing severe damage at Gravelines).',
          stems:
            'One key feature was the reliance on long-distance artillery rather than boarding... Specifically, English commanders...',
        },
        rightExam: {
          provenance: 'Edexcel June 2019 (Q3b)',
          type: 'essay_16',
          tariff: 'Question 3: Evaluative Essay [16 marks + 4 SPaG &bull; 25 mins]',
          stem: '‘The English defeated the Spanish Armada mainly because of superior English naval tactics and technology.’ How far do you agree? Explain your answer.',
          stimulus: ['English fireships at Calais', 'Spanish planning and leadership'],
          structureStrip: [
            {
              col: '1. CRITERIA 1: ENGLISH TACTICS & SHIP DESIGN',
              ref: '[Textbook §2.1–§3.2]',
              text: 'Explain how Hawkins’ race-built galleons out-maneuvered clumsy Spanish carracks, using long-range culverins on four-wheeled truck carriages to reload and fire broadsides rapidly at Gravelines.',
            },
            {
              col: '2. CRITERIA 2: FLAWED SPANISH INVASION PLANNING',
              ref: '[Textbook §1.1–§1.3]',
              text: 'Explain that Philip II’s plan was fatally flawed: Parma controlled no deep-water port in the Netherlands, meaning communication took 48 hours by horse and barges could not escape Dutch flyboat blockades.',
            },
            {
              col: '3. CRITERIA 3: ADVERSE WEATHER & THE "PROTESTANT WIND"',
              ref: '[Textbook §4.1–§4.2]',
              text: 'Explain that south-westerly gales drove the scattered Spanish fleet into the hazardous North Sea; lacking anchors lost at Calais, dozens of galleons were wrecked on the jagged rocks of Scotland and Ireland.',
            },
          ],
          connectives:
            'Superior English tactics and ship design were pivotal because... &bull; Specifically, the deployment of fireships at Calais succeeded in... &bull; Furthermore, at the Battle of Gravelines, English culverins... &bull; However, Spanish structural blunders critically undermined the operation because... &bull; Ultimately, while bad weather completed the destruction, English naval technology was the decisive factor because...',
          wordBank:
            'Spanish Armada &bull; Medina Sidonia &bull; Duke of Parma &bull; Race-built galleons &bull; Culverins &bull; Crescent formation &bull; Calais fireships &bull; Battle of Gravelines &bull; Protestant Wind',
          timelineMission:
            'Turn to Pages 2–3 (Milestone 6). In Milestone 6, sketch the blazing fireships drifting into Calais Roads and the shattered Spanish galleon.',
        },
      },
    ],
  },

  // ==========================================================================
  // KEY TOPIC 3: Elizabethan society in the Age of Exploration, 1558–88
  // ==========================================================================
  KT3: {
    keyTopicNum: 3,
    title: 'Elizabethan Society in the Age of Exploration, 1558–88',
    subtitle: 'Education, Leisure, The Problem of Poverty, Voyages & Virginia',
    dateRange: '1558–1588',
    heroImage: {
      src: getBase64Image('/images/john_white_chief_herowan.jpg'),
      alt: 'John White Watercolor of a Chief of the Secotan (1585)',
      objectPosition: 'center 12%',
      shelfmark: 'BRITISH MUSEUM • 1906,0509.1.21 • LONDON',
      date: '1585',
      title: 'A Chief of the Secotan (Carolina Algonquian)',
      caption:
        'John White • A Cheife Herowan of the Secotan, painted in watercolour during the first Roanoke expedition (1585). Depicts an indigenous Algonquian leader wearing a copper gorget, feather, and fringed deerskin apron. British Museum, London (1906,0509.1.21).',
      sourceTag: 'Historical Primary Record',
      archiveTag: 'Edexcel Paper 2 Master Archive',
      heightMm: 105,
    },
    specBox: {
      title: 'Pearson Edexcel GCSE (9–1) History Specification Content',
      edexcelTable: {
        header: 'Key topic 3: Elizabethan society in the Age of Exploration, 1558–88',
        rows: [
          {
            numTitle: '1 Education and leisure',
            bullets: ['Education in the home and schools.', 'Sport, pastimes and the theatre.'],
          },
          {
            numTitle: "2 The 'problem' of the poor",
            bullets: [
              'The reasons for the increase in poverty and vagabondage during these years.',
              'The changing attitudes and policies towards the poor.',
            ],
          },
          {
            numTitle: '3 Exploration and voyages of discovery',
            bullets: [
              'Factors prompting exploration, including the impact of new technology on ships and sailing and the drive to expand trade.',
              'The reasons for, and significance of, Drake’s circumnavigation of the globe.',
            ],
          },
          {
            numTitle: '4 Attempted colonisation of Virginia',
            bullets: [
              'Reasons for the attempted colonisation of Virginia, including the significance of Raleigh.',
              'Reasons for the failure of the first settlement in Virginia.',
            ],
          },
        ],
      },
    },
    milestones: [
      {
        date: '1572',
        title: 'The Vagabonds Act',
        tag: 'Key Topic 3.2',
        text: "Parliament passes the 1572 Vagabonds Act, creating a legal distinction between the 'deserving poor' (elderly and sick) and 'idle beggars'. Vagrants over 14 are whipped and burned through the ear; repeat offenders face execution.",
      },
      {
        date: '1576',
        title: "Act for Relief of the Poor & Burbage Builds 'The Theatre'",
        tag: 'Key Topic 3.1',
        text: "The 1576 Poor Act orders town councils to provide wool and raw materials to put the unemployed to work, creating 'Houses of Correction' (Bridewells). In the same year, actor James Burbage constructs 'The Theatre' in Shoreditch, launching Elizabethan public drama.",
      },
      {
        date: 'DEC 1577',
        title: 'Drake Departs on Global Circumnavigation',
        tag: 'Key Topic 3.3',
        text: 'Sir Francis Drake departs Plymouth with five ships on the *Pelican* (*Golden Hind*). Backed secretly by Elizabeth and investors, his mission is to disrupt Spanish Pacific trade, discover trade routes to the Moluccas, and claim land for the English Crown.',
      },
      {
        date: 'SEPT 1580',
        title: 'Drake Returns to Deptford; Knighted by Elizabeth',
        tag: 'Key Topic 3.3',
        text: 'Drake sails the *Golden Hind* into Plymouth Harbour after 33 months, becoming the first Englishman to circumnavigate the globe. His cargo of Spanish bullion yields a 4,700% return for royal investors, and Elizabeth knights him on board in April 1581.',
      },
      {
        date: '1584–1585',
        title: 'Raleigh’s Patent & The First Roanoke Colony',
        tag: 'Key Topic 3.4',
        text: 'Queen Elizabeth grants Sir Walter Raleigh a royal patent to explore and colonise Virginia. In 1585, 107 male colonists sail under Sir Richard Grenville and Ralph Lane to Roanoke Island, seeking gold, privateering bases, and fertile agricultural land.',
      },
      {
        date: '1587–1590',
        title: 'The Second Roanoke Colony ("The Lost Colony")',
        tag: 'Key Topic 3.4',
        text: 'John White leads 118 settlers, including women and children, to establish a permanent plantation. When White returns in 1590 after being delayed by the Armada, the entire colony has vanished without a trace, leaving only the word "CROATOAN" carved on a post.',
      },
    ],
    enquiries: [
      {
        enquiryNum: 1,
        id: 'lesson_3_1',
        title: 'Education and leisure',
        inquiryQuestion:
          'Was Elizabethan society truly entering a "Golden Age" of culture and learning?',
        subTitle:
          'Key Topic 3.1: Petty Schools, Grammar Schools, Sport, Hunting, Music & The Globe Playhouse',
        specAnchor:
          'Education in schools and universities; pastimes, sports, music, and seasonal festivities; the development of the Elizabethan theatre and public playhouses.',
        doNow: [
          {
            q: 'What basic elementary schools taught reading, writing, and arithmetic to young children?',
            a: 'Petty schools (or Dame schools)',
          },
          {
            q: 'Which fee-paying secondary schools taught Latin, Greek, and rhetoric to middle-class boys?',
            a: 'Grammar schools',
          },
          {
            q: 'Did girls attend grammar schools or universities in Elizabethan England?',
            a: 'No (girls were educated at home in domestic needlework and household management)',
          },
          {
            q: 'Which two universities existed in England during Elizabeth’s reign?',
            a: 'Oxford and Cambridge',
          },
          {
            q: 'What violent blood sports were popular with both ordinary people and the nobility?',
            a: 'Bear-baiting and cock-fighting',
          },
          {
            q: 'What name was given to theatergoers who paid 1 penny to stand in the unroofed pit?',
            a: 'Groundlings (or penny stinkards)',
          },
          {
            q: "Who built London’s first permanent public playhouse, 'The Theatre', in 1576?",
            a: 'James Burbage',
          },
          {
            q: 'Which famous Southwark playhouse was built by Shakespeare’s company in 1599?',
            a: 'The Globe Theatre',
          },
          {
            q: 'Why did the Puritan-led City of London Corporation oppose theatres?',
            a: 'They believed plays spread plague, promoted sin and immorality, and lured apprentices from work',
          },
          {
            q: 'What aristocratic playing company was patronized by Elizabeth’s favourite Robert Dudley?',
            a: 'The Earl of Leicester’s Men',
          },
        ],
        vocabRef: '[Textbook §1.1–§2.2]',
        vocabTermA: 'Grammar Schools',
        vocabTermB: 'The Pit',
        vocabPrompt:
          'Explain the difference between fee-paying secondary schools teaching Latin to boys (<strong>Grammar Schools</strong>) and the open standing area in front of the theatre stage where ordinary groundlings stood for one penny (<strong>The Pit</strong>):',
        featureA: {
          provenance: 'Edexcel June 2018 (Q1a)',
          ref: '[Textbook §1.2]',
          stem: 'Describe one key feature of education in Elizabethan Grammar Schools.',
          guidance:
            'Point (Fee-paying schools for boys aged 7–14 focusing heavily on classical Latin language and literature) &bull; Fact (Pupils attended 10-hour days from 6am to 5pm, memorizing Latin grammar, Greek, and rhetoric through rote learning and corporal punishment).',
          stems:
            'One key feature was the intense focus on Latin and classical literature... Specifically, boys spent ten hours a day studying...',
        },
        featureB: {
          provenance: 'Edexcel June 2019 (Q1a)',
          ref: '[Textbook §3.1]',
          stem: 'Describe one key feature of the Elizabethan theatre.',
          guidance:
            'Point (A circular open-air wooden amphiteatre that brought all social classes together for entertainment) &bull; Fact (Groundlings paid 1 penny to stand in the uncovered yard, while wealthy gentry paid 2–3 pence for tiered roofed galleries; plays took place in daylight).',
          stems:
            'One key feature was that public playhouses attracted all social classes... Specifically, poor groundlings stood in the yard for 1 penny, while wealthy gentry...',
        },
        featureC: {
          provenance: 'Edexcel Specification Focus',
          ref: '[Textbook §2.2]',
          stem: 'Describe one key feature of sports and pastimes in Elizabethan England.',
          guidance:
            'Point (Pastimes were strictly divided along social class lines) &bull; Fact (Nobles participated in hunting, hawking, and fencing, while ordinary folk gathered for brutal blood sports like bear-baiting, cock-fighting, and football).',
          stems:
            'One key feature was the clear social division in leisure activities... Specifically, while the nobility engaged in...',
        },
        rightExam: {
          provenance: 'Edexcel June 2022 (Q2)',
          type: 'explain_why_12',
          tariff: 'Question 2: Explain Why [12 marks &bull; 18 mins]',
          stem: 'Explain why there was a significant expansion in education in Elizabethan England.',
          stimulus: ['Grammar schools', 'The Protestant Reformation'],
          structureStrip: [
            {
              col: '1. CAUSE 1: RENAISSANCE HUMANISM & TRADE',
              ref: '[Textbook §1.1–§1.3]',
              text: 'Explain that the Renaissance emphasized that education was essential for success; growing international trade and bureaucracy required literate merchants, lawyers, clerks, and estate stewards.',
            },
            {
              col: '2. CAUSE 2: PROTESTANT REFORMATION & BIBLE STUDY',
              ref: '[Textbook §2.1–§2.2]',
              text: 'Explain that Protestant theology insisted that every Christian must be able to read the English Bible to achieve personal salvation; literacy was viewed as a sacred religious duty.',
            },
            {
              col: '3. CAUSE 3: EXPANSION OF ENDOWED GRAMMAR SCHOOLS',
              ref: '[Textbook §3.1–§3.2]',
              text: 'Explain that wealthy merchants and gentry established over 70 new grammar schools, endowing scholarships so that bright boys from humble backgrounds could attend without paying fees.',
            },
          ],
          connectives:
            'Education expanded rapidly under Elizabeth primarily because... &bull; Crucially, the growth of commercial trade created a pressing need for... &bull; In addition, Protestant religious belief demanded that ordinary people... &bull; Furthermore, wealthy philanthropists actively funded... &bull; Consequently, these combined economic and religious forces transformed literacy rates because...',
          wordBank:
            'Humanism &bull; Grammar schools &bull; Petty schools &bull; Protestantism &bull; Literacy &bull; English Bible &bull; Renaissance &bull; Endowments &bull; Commercial trade',
          timelineMission:
            'Turn to Pages 2–3 (Milestone 2). In Milestone 2, sketch James Burbage’s wooden playhouse and the quill pen of a grammar school scholar.',
        },
      },
      {
        enquiryNum: 2,
        id: 'lesson_3_2',
        title: 'The Problem of Poverty',
        inquiryQuestion:
          'Was Elizabethan poverty caused by personal idleness or unstoppable economic forces?',
        subTitle:
          'Key Topic 3.2: Enclosure, Population Surge, Bad Harvests & The Poor Laws of 1572 and 1576',
        specAnchor:
          'Reasons for the increase in poverty and vagabondage; changing attitudes towards the poor (the deserving/impotent poor vs the idle/sturdy poor); the Elizabethan Poor Laws (1572 and 1576).',
        doNow: [
          {
            q: 'Approximately what was England’s population in 1558 compared to 1603?',
            a: 'Roughly 3 million in 1558, rising to over 4 million by 1603 (35% increase)',
          },
          {
            q: 'What term describes fencing off open peasant farmland into enclosed fields for sheep grazing?',
            a: 'Enclosure',
          },
          {
            q: 'Why did landowners prefer sheep farming to arable farming with grain crops?',
            a: 'Wool was highly profitable and sheep required far fewer agricultural labourers',
          },
          {
            q: 'What economic term describes continuous rising prices of food and goods?',
            a: 'Inflation (price rise)',
          },
          {
            q: 'What catastrophic weather disaster caused food shortages and rocketing grain prices in the 1590s?',
            a: 'Consecutive bad harvests',
          },
          {
            q: 'What term described the elderly, orphans, and disabled poor who were unable to work?',
            a: 'The Impotent Poor (or Deserving Poor)',
          },
          {
            q: 'What term described fit, healthy beggars who were assumed to be deliberately lazy?',
            a: 'The Sturdy Beggars (or Idle/Undeserving Poor)',
          },
          {
            q: 'What punishment was imposed on sturdy beggars under the 1572 Vagabonds Act?',
            a: 'Whipped and burned through the gristle of the right ear with a hot iron',
          },
          {
            q: 'What institutions were created by the 1576 Poor Act to punish idle beggars with hard labour?',
            a: 'Houses of Correction (Bridewells)',
          },
          {
            q: 'What local parish tax paid for the relief of the impotent poor?',
            a: 'The Poor Rate',
          },
        ],
        vocabRef: '[Textbook §1.1–§2.2]',
        vocabTermA: 'Enclosure',
        vocabTermB: 'Vagabonds',
        vocabPrompt:
          'Explain the difference between fencing off common land for sheep farming (<strong>Enclosure</strong>) and homeless people who wandered from town to town looking for work (<strong>Vagabonds</strong>):',
        featureA: {
          provenance: 'Edexcel November 2021 (Q1a)',
          ref: '[Textbook §1.1]',
          stem: 'Describe one key feature of the enclosure of land in Elizabethan England.',
          guidance:
            'Point (Landlords fenced off common fields to replace arable crop farming with sheep farming) &bull; Fact (Wool was far more profitable, but sheep required only one shepherd, putting hundreds of rural labourers out of work and driving them to towns).',
          stems:
            'One key feature of enclosure was the conversion of farmland to sheep pasture... Specifically, landlords replaced crops with sheep because wool was profitable, which left...',
        },
        featureB: {
          provenance: 'Edexcel June 2023 (Q1a)',
          ref: '[Textbook §3.1]',
          stem: 'Describe one key feature of the 1576 Act for the Relief of the Poor.',
          guidance:
            'Point (A landmark law that placed legal responsibility on local towns to find work for the unemployed) &bull; Fact (Parishes had to provide raw wool and hemp for the able-bodied to spin, and build Houses of Correction for those who refused to work).',
          stems:
            'One key feature of the 1576 Poor Act was distinguishing between the unemployed and the lazy... Specifically, it forced towns to provide raw materials like wool and build...',
        },
        featureC: {
          provenance: 'Edexcel Specification Focus',
          ref: '[Textbook §1.1]',
          stem: 'Describe one key feature of the distinction between the ‘deserving’ and ‘idle’ poor.',
          guidance:
            'Point (Elizabethan authorities distinguished between those unable to work and those deemed lazy) &bull; Fact (The impotent poor received parish relief and shelter, whereas sturdy beggars and vagabonds were publicly whipped and sent to Houses of Correction).',
          stems:
            'One key feature was the official separation of the poor into two categories... Specifically, the law differentiated between...',
        },
        rightExam: {
          provenance: 'Edexcel November 2020 (Q3b)',
          type: 'essay_16',
          tariff: 'Question 3: Evaluative Essay [16 marks + 4 SPaG &bull; 25 mins]',
          stem: '‘The enclosure of land was the main reason for the dramatic increase in poverty in Elizabethan England.’ How far do you agree? Explain your answer.',
          stimulus: ['Sheep farming', 'Population growth'],
          structureStrip: [
            {
              col: '1. CRITERIA 1: ENCLOSURE & RURAL EVICTIONS',
              ref: '[Textbook §1.1–§1.3]',
              text: 'Explain how enclosing common fields for sheep grazing removed arable strip farming; because wool needed few shepherds, whole villages were depopulated, forcing dispossessed cottagers into vagrancy.',
            },
            {
              col: '2. CRITERIA 2: POPULATION SURGE & INFLATION',
              ref: '[Textbook §2.1–§2.2]',
              text: 'Explain that England’s population surged from 3m to over 4m; higher demand drove up food and bread prices (inflation) while creating a labour surplus that depressed wages below subsistence level.',
            },
            {
              col: '3. CRITERIA 3: HARVEST FAILURES & MONASTERY LOSS',
              ref: '[Textbook §3.1–§3.2]',
              text: 'Explain that the dissolution of monasteries had eliminated traditional Catholic charity networks; when bad harvests struck, famine pushed marginal farmworkers into absolute starvation.',
            },
          ],
          connectives:
            'Enclosure was undeniably a major cause of rural destitution because... &bull; Specifically, landowners converted arable crop fields to sheep pasture, which... &bull; However, rapid population growth was arguably an even deeper cause because... &bull; In addition, consecutive bad harvests caused grain prices to... &bull; Weighing these factors, I conclude that while enclosure devastated specific rural villages, the broad demographic surge and inflation were the fundamental causes because...',
          wordBank:
            'Poverty &bull; Enclosure &bull; Sheep farming &bull; Population surge &bull; Inflation &bull; Bad harvests &bull; Vagabonds Act 1572 &bull; 1576 Poor Act &bull; Houses of Correction',
          timelineMission:
            'Turn to Pages 2–3 (Milestone 1). In Milestone 1, sketch the sheep shears and the ear-boring branding iron from the 1572 Act.',
        },
      },
      {
        enquiryNum: 3,
        id: 'lesson_3_3',
        title: 'Exploration and voyages of discovery',
        inquiryQuestion:
          'Was English maritime exploration driven by scientific curiosity or ruthless economic greed?',
        subTitle:
          'Key Topic 3.3: Astrolabe, Quadrant, Mercator Maps, Trade Routes & Drake’s Circumnavigation',
        specAnchor:
          'Factors prompting exploration (new navigational technology, new trade routes, commercial rivalry); Drake’s circumnavigation (1577–80): motives and significance.',
        doNow: [
          {
            q: 'Which navigation instrument measured the angle of the sun and stars to calculate latitude?',
            a: 'The Astrolabe (or Quadrant)',
          },
          {
            q: 'What magnetic Chinese navigational tool allowed Elizabethan ships to steer accurate compass headings?',
            a: 'The Magnetic Compass',
          },
          {
            q: 'What new 1569 map projection allowed navigators to plot straight sailing courses across oceans?',
            a: 'The Mercator Projection',
          },
          {
            q: 'Which valuable Asian commodities drove European explorers to find sea routes to the East?',
            a: 'Spices (pepper, cloves, nutmeg) and silk',
          },
          {
            q: 'What was the original name of Sir Francis Drake’s flagship before he renamed it *Golden Hind*?',
            a: '*The Pelican*',
          },
          {
            q: 'Through which notoriously dangerous strait at the tip of South America did Drake sail in 1578?',
            a: 'The Strait of Magellan',
          },
          {
            q: 'What name did Drake give to the Californian coast he claimed for Queen Elizabeth in 1579?',
            a: 'Nova Albion (New Britain)',
          },
          {
            q: 'In which Indonesian spice islands did Drake trade with the Sultan of Ternate for cloves?',
            a: 'The Moluccas (Spice Islands)',
          },
          {
            q: 'How long did Drake’s circumnavigation take from departure to return?',
            a: 'Nearly three years (December 1577 – September 1580)',
          },
          {
            q: 'What percentage profit did Drake’s voyage generate for Queen Elizabeth and his investors?',
            a: '4,700% profit',
          },
        ],
        vocabRef: '[Textbook §1.1–§2.1]',
        vocabTermA: 'Astrolabe',
        vocabTermB: 'Circumnavigation',
        vocabPrompt:
          'Explain the difference between an instrument used by sailors to calculate latitude by observing the sun and stars (<strong>Astrolabe</strong>) and sailing completely around the world on a ship (<strong>Circumnavigation</strong>):',
        featureA: {
          provenance: 'Edexcel June 2022 (Q1b)',
          ref: '[Textbook §1.1]',
          stem: 'Describe one key feature of the new navigational technology used by Elizabethan explorers.',
          guidance:
            'Point (The development of precise navigation instruments like the astrolabe and quadrant) &bull; Fact (They allowed sea captains to measure the angle of the pole star and sun to calculate precise latitude, enabling accurate ocean crossings away from coastlines).',
          stems:
            'One key feature was the technological advance in navigation instruments... Specifically, devices like the astrolabe allowed navigators to...',
        },
        featureB: {
          provenance: 'Edexcel June 2024 (Q1b)',
          ref: '[Textbook §2.2]',
          stem: 'Describe one key feature of Francis Drake’s circumnavigation (1577–80).',
          guidance:
            'Point (Drake became the first Englishman to sail completely around the globe) &bull; Fact (He navigated the hazardous Strait of Magellan, raided Spanish treasure ships in the Pacific, reached California (Nova Albion), and returned with £140,000 of bullion).',
          stems:
            'One key feature was the immense geographical and financial success of the voyage... Specifically, Drake sailed into the Pacific and returned with...',
        },
        featureC: {
          provenance: 'Edexcel Specification Focus',
          ref: '[Textbook §2.1]',
          stem: 'Describe one key feature of the search for the Northwest Passage.',
          guidance:
            'Point (English navigators sought an ice-free northern sea route to Asia to bypass Spanish trade routes) &bull; Fact (Explorers Martin Frobisher and John Davis made three expeditions to northern Canada, charting Arctic waters despite failing to reach China).',
          stems:
            'One key feature was the economic motivation to find a northern trade route to Asia... Specifically, explorers like Frobisher...',
        },
        rightExam: {
          provenance: 'Edexcel November 2021 (Q2)',
          type: 'explain_why_12',
          tariff: 'Question 2: Explain Why [12 marks &bull; 18 mins]',
          stem: 'Explain why English exploration by sea increased so rapidly between 1558 and 1588.',
          stimulus: ['New navigational technology', 'The cloth trade collapse'],
          structureStrip: [
            {
              col: '1. CAUSE 1: ECONOMIC CRISIS & NEW MARKETS',
              ref: '[Textbook §1.1–§1.3]',
              text: 'Explain that the collapse of the Antwerp cloth market in the 1550s devastated England’s wool trade, forcing merchants to seek new trade routes to Russia (Muscovy Company), the Mediterranean, and the Americas.',
            },
            {
              col: '2. CAUSE 2: TECHNOLOGICAL & CARTOGRAPHIC ADVANCE',
              ref: '[Textbook §2.1–§2.2]',
              text: 'Explain that astrolabes, magnetic compasses, Mercator maps, and larger, multi-masted galleons enabled safe transatlantic voyages, transforming open-ocean navigation from suicide into a calculated commercial risk.',
            },
            {
              col: '3. CAUSE 3: PRIVATEERING WEALTH & SPANISH RIVALRY',
              ref: '[Textbook §3.1–§3.2]',
              text: 'Explain that plundering Spanish bullion ships in the Americas offered astronomical wealth; Elizabeth and courtiers secretly invested in voyages to challenge Philip II’s monopoly and finance the Crown.',
            },
          ],
          connectives:
            'English maritime exploration expanded rapidly primarily because... &bull; Crucially, the sudden collapse of European cloth trade forced merchants to... &bull; In addition, revolutionary developments in navigation technology allowed... &bull; Furthermore, the immense profits of privateering encouraged courtiers to... &bull; Consequently, these economic and strategic incentives transformed England into an oceanic power because...',
          wordBank:
            'Exploration &bull; Astrolabe &bull; Mercator projection &bull; Antwerp cloth market &bull; Muscovy Company &bull; Francis Drake &bull; Privateering &bull; Spanish monopoly &bull; *Golden Hind*',
          timelineMission:
            'Turn to Pages 2–3 (Milestone 3). In Milestone 3, sketch the astrolabe dial and the globe encircled by Drake’s sailing route.',
        },
      },
      {
        enquiryNum: 4,
        id: 'lesson_3_4',
        title: 'Raleigh and Virginia',
        inquiryQuestion:
          'Why did Walter Raleigh’s dream of an English empire in Virginia end in total catastrophe?',
        subTitle:
          'Key Topic 3.4: Royal Patent, Roanoke Colony (1585), Manteo & Wanchese, and "The Lost Colony"',
        specAnchor:
          'Sir Walter Raleigh and the attempt to colonise Virginia; reasons for colonising Virginia; reasons for the failure of the first colony (1585); the significance of the colonisation attempts.',
        doNow: [
          {
            q: 'Which Elizabethan courtier and explorer was granted a royal patent to colonise Virginia in 1584?',
            a: 'Sir Walter Raleigh',
          },
          {
            q: "Why was the new North American territory named 'Virginia' by the English?",
            a: 'In honour of Elizabeth I, the "Virgin Queen"',
          },
          {
            q: 'Did Sir Walter Raleigh ever travel to Virginia himself?',
            a: 'No (he organized and funded the expeditions from England)',
          },
          {
            q: 'On which barrier island off modern North Carolina was the first English colony established in 1585?',
            a: 'Roanoke Island',
          },
          {
            q: 'Which two Native Americans were brought back to London in 1584 to advise the English?',
            a: 'Manteo and Wanchese',
          },
          {
            q: 'Who was appointed governor of the first 1585 Roanoke settlement?',
            a: 'Ralph Lane',
          },
          {
            q: 'What catastrophic accident happened to the flagship *Tiger* that destroyed the colonists’ food seeds?',
            a: 'It ran aground on a sandbar, letting seawater flood the hold and ruin the grain',
          },
          {
            q: 'Who commanded the English relief fleet that evacuated the starving colonists in 1586?',
            a: 'Sir Francis Drake',
          },
          {
            q: 'Who was appointed governor of the second 1587 settlement ("The Lost Colony")?',
            a: 'John White',
          },
          {
            q: 'What single word carved on a wooden palisade post was found when John White returned in 1590?',
            a: 'CROATOAN',
          },
        ],
        vocabRef: '[Textbook §1.1–§2.1]',
        vocabTermA: 'Colony',
        vocabTermB: 'Empire',
        vocabPrompt:
          'Explain the difference between a new settlement established and ruled by people from another country (<strong>Colony</strong>) and a collection of lands and colonies ruled over by a single monarch or power (<strong>Empire</strong>):',
        featureA: {
          provenance: '★ High-Yield Forecast (Q1a)',
          ref: '[Textbook §1.1]',
          stem: 'Describe one key feature of Sir Walter Raleigh’s royal patent for Virginia (1584).',
          guidance:
            'Point (A royal license granting Raleigh the right to explore and colonise any lands not already possessed by Christian monarchs) &bull; Fact (Raleigh was granted ownership of all land and minerals discovered, in exchange for giving the Crown one-fifth of all gold and silver mined).',
          stems:
            'One key feature was the royal authorization to establish an overseas empire... Specifically, Elizabeth granted Raleigh ownership of Virginia, provided he gave the Crown...',
        },
        featureB: {
          provenance: 'Edexcel June 2023 (Q1b)',
          ref: '[Textbook §3.1]',
          stem: 'Describe one key feature of the failure of the first Roanoke colony (1585–86).',
          guidance:
            'Point (The colony faced starvation after the flagship *Tiger* flooded, ruining their food seeds) &bull; Fact (Colonists lacked farming skills, alienated local Secotan tribes led by Wingina, and had to be evacuated back to England by Francis Drake in 1586).',
          stems:
            'One key feature was the rapid collapse of food supplies and local relations... Specifically, after the *Tiger* flooded their seeds, the colonists angered Chief Wingina and were rescued by...',
        },
        featureC: {
          provenance: 'Edexcel Specification Focus',
          ref: '[Textbook §3.2]',
          stem: 'Describe one key feature of the ‘Lost Colony’ of Roanoke (1587–90).',
          guidance:
            'Point (A second settlement of 117 men, women, and children led by John White disappeared completely) • Fact (Delayed by the Spanish Armada, White returned in 1590 to find the fort abandoned with only the word ‘CROATOAN’ carved into a palisade post).',
          stems:
            'One key feature was the complete and mysterious disappearance of the second colony... Specifically, when John White returned in 1590...',
        },
        rightExam: {
          provenance: 'Edexcel June 2018 (Q3a)',
          type: 'essay_16',
          tariff: 'Question 3: Evaluative Essay [16 marks + 4 SPaG &bull; 25 mins]',
          stem: '‘Poor planning and unsuitable colonists were the main reasons why the attempt to colonise Virginia failed in 1585–86.’ How far do you agree? Explain your answer.',
          stimulus: ['Lack of farming skills', 'Relations with Native Americans'],
          structureStrip: [
            {
              col: '1. CRITERIA 1: UNSUITABLE SETTLERS & POOR PLANNING',
              ref: '[Textbook §1.1–§2.2]',
              text: 'Explain that the 107 settlers were mostly aristocratic soldiers seeking quick gold rather than farmers; they lacked agricultural skills, refused physical manual labour, and brought inadequate seeds.',
            },
            {
              col: '2. CRITERIA 2: BAD LUCK & VOYAGE ACCIDENTS',
              ref: '[Textbook §2.2]',
              text: 'Explain that the flagship *Tiger* ran aground on a sandbank off Roanoke, flooding the hold with seawater and destroying all grain seeds; settlers arrived too late in the season to plant crops before winter.',
            },
            {
              col: '3. CRITERIA 3: HOSTILITY WITH NATIVE TRIBES',
              ref: '[Textbook §3.1–§3.2]',
              text: 'Explain that Ralph Lane’s brutal military temperament alienated Chief Wingina’s Secotan tribe; when an English silver cup went missing, settlers burned a village, leading to open war and starvation.',
            },
          ],
          connectives:
            'Poor planning and unsuitable personnel were primary factors in the colony’s collapse because... &bull; Specifically, the aristocratic gentlemen refused to perform agricultural labour, which... &bull; Furthermore, this was compounded by disastrous bad luck when the *Tiger*... &bull; In addition, Ralph Lane’s aggressive hostility towards Native Americans alienated Chief Wingina... &bull; Weighing these factors, I conclude that while the loss of the *Tiger’s* seeds made survival precarious, poor planning was the fundamental cause because the expedition was built for plunder rather than permanent farming...',
          wordBank:
            'Walter Raleigh &bull; Virginia &bull; Roanoke Island &bull; Ralph Lane &bull; *Tiger* &bull; Chief Wingina &bull; Secotan &bull; Manteo & Wanchese &bull; "Lost Colony" &bull; CROATOAN',
          timelineMission:
            'Turn to Pages 2–3 (Milestone 6). In Milestone 6, sketch the wooden palisade post carved with "CROATOAN" and the sinking flagship *Tiger*.',
        },
      },
    ],
  },
};

// ============================================================================
// MAIN GENERATOR FUNCTION FOR A GIVEN KEY TOPIC (16 PAGES)
// ============================================================================

// ============================================================================
// ============================================================================
// MEDICINE-STYLE ENQUIRY RENDERING ENGINE (CALIBRATED ZERO-OVERFLOW / ZERO-UNDERFLOW)
// ============================================================================

function renderSpinePage(enq, pageNum, quip, keyTopicNum) {
  let stagesHtml = '';
  const stages = enq.stages || [];
  stages.forEach((st, idx) => {
    let bulletsHtml = st.bullets
      .map(
        (b) =>
          `<div style="margin-bottom: 2px;"><span style="font-weight: 900; color: #000000;">&bull;</span> ${b}</div>`,
      )
      .join('');
    stagesHtml += `
          <!-- Stage ${idx + 1} -->
          <div class="spine-stage-row" style="display: flex; flex: 1; min-height: 0; align-items: stretch; margin: 0; border-bottom: 1.5px solid #000000;">
            <!-- Left: Factual Chronology Spine (38mm) with larger strong black font -->
            <div style="width: 38mm; flex-shrink: 0; border-left: 2.5px solid #000000; padding: 2px 4px 2px 5px; display: flex; flex-direction: column; justify-content: center; position: relative;">
              <div style="position: absolute; left: -5.5px; top: 12px; width: 8px; height: 8px; background: #000000; border-radius: 50%;"></div>
              <div style="display: flex; align-items: center; gap: 3px; margin-bottom: 1.5px;">
                <span style="background: #000000; color: #ffffff; font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 900; padding: 0.5px 4px; border-radius: 2px;">${idx + 1}</span>
                <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; color: #000000;">${st.dates}</span>
              </div>
              <div style="font-family: 'Playfair Display', serif; font-size: 7.8pt; font-weight: 900; color: #000000; line-height: 1.12; margin-bottom: 2.5px;">
                ${st.title}
              </div>
              <!-- Larger, Strong Black Bullets (7.1pt, 700 weight, deep black) -->
              <div style="display: flex; flex-direction: column; font-family: 'Inter', sans-serif; font-size: 7.1pt; font-weight: 700; line-height: 1.20; color: #000000;">
                ${bulletsHtml}
              </div>
            </div>

            <!-- Right: Juicy Enquiry Prompt + Exact 6 Ruled Lines (Live Line Ruling Preserved) -->
            <div style="flex: 1; display: flex; flex-direction: column; border-left: 1.5px solid #000000; margin: 0; padding: 0;">
              <!-- Embedded Stage Enquiry Focus Bar (No redundant badge; number is already on left) -->
              <div style="background: #f1f5f9; border-bottom: 1.5px solid #000000; padding: 2.5px 8px; display: flex; align-items: center;">
                <span style="font-family: 'Georgia', serif; font-size: 7.8pt; font-weight: 700; color: #000000; line-height: 1.18; font-style: italic;">
                  ${st.focusClue}
                </span>
              </div>
              <!-- Exact 6 Ruled Lines (Matching Medicine 1.2px solid #000000 ruling) -->
              <div style="flex: 1; display: flex; flex-direction: column;">
                <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
                <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
                <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
                <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
                <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
                <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
              </div>
            </div>
          </div>`;
  });

  return `
  <!-- LESSON ENQUIRY NOTEBOOK WITH CHRONOLOGICAL SPINE (PAGE ${pageNum}) -->
  <div class="page page-container verso-page" id="page-${pageNum}" style="padding: 2.5mm 6mm 2mm 6mm;">
    <div class="page-body-full">
      <!-- Lesson Header -->
      <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 2px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; letter-spacing: 0.5px; text-transform: uppercase; border: 1.2px solid #000000; padding: 1px 6px; border-radius: 2px;">
            KEY TOPIC ${keyTopicNum}.${enq.enquiryNum} &bull; ENQUIRY LESSON NOTEBOOK
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-transform: uppercase; color: #000000;">
            EDEXCEL PAPER 2 (1HI0/2B) &bull; BRITISH DEPTH STUDY
          </span>
        </div>
        <h2 style="font-family: 'Playfair Display', serif; font-size: 11.5pt; color: #000000; margin: 1px 0 1px 0; font-weight: 900; line-height: 1.18;">
          ${enq.inquiryQuestion}
        </h2>
      </div>

      <!-- Active Lesson Note-Taking Spine -->
      <div style="flex: 1; display: flex; flex-direction: column; margin-top: 1px; min-height: 0;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid #000000; padding: 1.5px 0; margin-bottom: 2px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px;">
            CHRONOLOGICAL INQUIRY SPINE &bull; 5 CAUSAL MILESTONES
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 700; color: #1e293b;">
            PUPIL NOTE-TAKING ZONE &bull; <span style="font-style: italic; font-weight: 500; color: #475569;">Answer each milestone prompt using evidence from teacher exposition</span>
          </span>
        </div>

        <!-- 5 Chronological Stages with Spine on Left and Ruled Lines on Right -->
        <div style="display: flex; flex-direction: column; flex: 1; min-height: 0; gap: 0;">
          ${stagesHtml}
        </div>
      </div>

      ${renderFooterStrip(pageNum, quip, 24)}
    </div>
  </div>`;
}

function renderFeaturePage(enq, pageNum, quip, keyTopicNum) {
  const featAProb = enq.featureA.probability || '★ HIGH PROBABILITY';
  const featBProb = enq.featureB.probability || 'CORE SPECIFICATION FOCUS';
  const featCProb = enq.featureC?.probability || 'HIGH-YIELD SPECIFICATION FOCUS';

  return `
  <!-- SHORT-TARIFF EXAM PRACTICE: 3x Q1 FEATURE [2m+2m+2m] + TIMELINE MISSION (PAGE ${pageNum}) -->
  <div class="page page-container recto-page" id="page-${pageNum}" style="padding: 3.5mm 6mm 2.5mm 6mm;">
    <div class="page-body-full" style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
      
      <!-- Top Exam Header -->
      <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 2px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; letter-spacing: 0.5px; text-transform: uppercase; border: 1.2px solid #000000; padding: 1px 6px; border-radius: 2px;">
            KEY TOPIC ${keyTopicNum}.${enq.enquiryNum} &bull; SHORT-TARIFF EXAM PRACTICE
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-transform: uppercase; color: #000000;">
            EDEXCEL PAPER 2 &bull; FACTUAL RECALL (AO1)
          </span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <h2 style="font-family: 'Playfair Display', serif; font-size: 11pt; color: #000000; margin: 1px 0 0 0; font-weight: 900; line-height: 1.2;">
            Question 1 Practice: Describe Three Key Features [3 &times; 2 marks &bull; 9 mins]
          </h2>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 800; border: 1.2px solid #000000; padding: 1px 5px; border-radius: 2px;">
            Total Score: [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 6 ]
          </span>
        </div>
      </div>

      <!-- 3 Feature Practice Questions (Flex Absorbs Vertical Space with zero inter-task void) -->
      <div style="display: flex; flex-direction: column; gap: 4px; flex: 1; min-height: 0; margin: 2px 0;">

        <!-- Question 1(a): Describe One Key Feature [2 marks] -->
        <div class="task-section" style="border: 1.2px solid #000000; border-radius: 3px; padding: 3px 6px; background: #ffffff; flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000000; padding-bottom: 1.5px; margin-bottom: 1.5px;">
              <div style="display: flex; align-items: center; gap: 5px;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; text-transform: uppercase; letter-spacing: 0.5px;">
                  &bull; Question 1(a): Describe One Key Feature [2 marks &bull; 3 mins]
                </strong>
                <span style="font-family: 'Inter', sans-serif; font-size: 6.6pt; font-weight: 800; background: #000000; color: #ffffff; padding: 1px 4px; border-radius: 2px;">
                  ${featAProb}
                </span>
              </div>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; border: 1px solid #000000; padding: 0 4px; border-radius: 2px; background: #f8fafc;">
                ${enq.featureA.provenance || 'EDEXCEL PAPER 2'}
              </span>
            </div>
            <p style="font-family: 'Playfair Display', serif; font-size: 9.0pt; font-weight: 800; color: #000000; margin: 1px 0 2px 0; line-height: 1.18;">
              ${enq.featureA.stem}
            </p>
            <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-style: italic; color: #333333; margin-bottom: 1px; line-height: 1.15;">
              <strong>Target Guidance:</strong> ${enq.featureA.guidance}
            </div>
            <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; margin-bottom: 2px;">
              <strong>Sentence Stems:</strong> ${enq.featureA.stems}
            </div>
          </div>
          <div style="display: flex; flex-direction: column; justify-content: space-between; margin-top: 1px;">
            <div class="task-line"></div>
            <div class="task-line"></div>
            <div class="task-line"></div>
            <div class="task-line"></div>
          </div>
        </div>

        <!-- Question 1(b): Describe One Key Feature [2 marks] -->
        <div class="task-section" style="border: 1.2px solid #000000; border-radius: 3px; padding: 3px 6px; background: #ffffff; flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000000; padding-bottom: 1.5px; margin-bottom: 1.5px;">
              <div style="display: flex; align-items: center; gap: 5px;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; text-transform: uppercase; letter-spacing: 0.5px;">
                  &bull; Question 1(b): Describe One Key Feature [2 marks &bull; 3 mins]
                </strong>
                <span style="font-family: 'Inter', sans-serif; font-size: 6.6pt; font-weight: 800; background: #000000; color: #ffffff; padding: 1px 4px; border-radius: 2px;">
                  ${featBProb}
                </span>
              </div>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; border: 1px solid #000000; padding: 0 4px; border-radius: 2px; background: #f8fafc;">
                ${enq.featureB.provenance || 'EDEXCEL PAPER 2'}
              </span>
            </div>
            <p style="font-family: 'Playfair Display', serif; font-size: 9.0pt; font-weight: 800; color: #000000; margin: 1px 0 2px 0; line-height: 1.18;">
              ${enq.featureB.stem}
            </p>
            <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-style: italic; color: #333333; margin-bottom: 1px; line-height: 1.15;">
              <strong>Target Guidance:</strong> ${enq.featureB.guidance}
            </div>
            <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; margin-bottom: 2px;">
              <strong>Sentence Stems:</strong> ${enq.featureB.stems}
            </div>
          </div>
          <div style="display: flex; flex-direction: column; justify-content: space-between; margin-top: 1px;">
            <div class="task-line"></div>
            <div class="task-line"></div>
            <div class="task-line"></div>
            <div class="task-line"></div>
          </div>
        </div>

        <!-- Question 1(c): Describe One Key Feature [2 marks] -->
        <div class="task-section" style="border: 1.2px solid #000000; border-radius: 3px; padding: 3px 6px; background: #ffffff; flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000000; padding-bottom: 1.5px; margin-bottom: 1.5px;">
              <div style="display: flex; align-items: center; gap: 5px;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; text-transform: uppercase; letter-spacing: 0.5px;">
                  &bull; Question 1(c): Describe One Key Feature [2 marks &bull; 3 mins]
                </strong>
                <span style="font-family: 'Inter', sans-serif; font-size: 6.6pt; font-weight: 800; background: #000000; color: #ffffff; padding: 1px 4px; border-radius: 2px;">
                  ${featCProb}
                </span>
              </div>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; border: 1px solid #000000; padding: 0 4px; border-radius: 2px; background: #f8fafc;">
                ${enq.featureC?.provenance || 'EDEXCEL PAPER 2'}
              </span>
            </div>
            <p style="font-family: 'Playfair Display', serif; font-size: 9.0pt; font-weight: 800; color: #000000; margin: 1px 0 2px 0; line-height: 1.18;">
              ${enq.featureC?.stem}
            </p>
            <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-style: italic; color: #333333; margin-bottom: 1px; line-height: 1.15;">
              <strong>Target Guidance:</strong> ${enq.featureC?.guidance}
            </div>
            <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; margin-bottom: 2px;">
              <strong>Sentence Stems:</strong> ${enq.featureC?.stems}
            </div>
          </div>
          <div style="display: flex; flex-direction: column; justify-content: space-between; margin-top: 1px;">
            <div class="task-line"></div>
            <div class="task-line"></div>
            <div class="task-line"></div>
            <div class="task-line"></div>
          </div>
        </div>

      </div>

      <!-- Timeline Mission (Medicine-Style Analytical Navigation Strip) -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 4px 8px; background: #ffffff; display: flex; justify-content: space-between; align-items: center; margin-top: 2px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; background: #000000; color: #ffffff; padding: 2px 6px; border-radius: 2px; text-transform: uppercase; white-space: nowrap;">
            Timeline Mission
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.3pt; color: #000000; line-height: 1.2;">
            ${enq.rightExam.timelineMission}
          </span>
        </div>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; white-space: nowrap; margin-left: 8px;">
          &larr; Pages 2–3
        </span>
      </div>

      ${renderFooterStrip(pageNum, quip, 24)}
    </div>
  </div>`;
}

function renderExtendedWritingPages(enq, leftPageNum, rightPageNum, footers, keyTopicNum) {
  const rx = enq.rightExam;
  const is12m = rx.type === 'explain_why_12';
  const maxScore = is12m ? '12' : '20';
  const rightProb = rx.probability || '★ HIGH-YIELD FORECAST';

  // 17 Ruled lines for first page (Word Bank omitted from workbook; preserved in digital app)
  const leftTaskLines = Array.from(
    { length: 17 },
    () => `
      <div class="lined-row">
        <div class="lined-margin-cell">&nbsp;</div>
        <div class="lined-content-cell">&nbsp;</div>
      </div>`,
  ).join('');

  // 28 Ruled lines for continuation page
  const rightTaskLines = Array.from({ length: 28 }, (_, lIdx) => {
    const isFirst = lIdx === 0;
    const marginContent = isFirst
      ? `<span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #555555; text-transform: uppercase; font-weight: 700;">Margin</span>`
      : `&nbsp;`;
    const linePrompt = isFirst
      ? `<span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-style: italic; color: #777777;">[ Extended Writing Continued &bull; Paragraph 2/3 &amp; Final Sustained Conclusion ]</span>`
      : `&nbsp;`;
    return `
        <div class="lined-row">
          <div class="lined-margin-cell">${marginContent}</div>
          <div class="lined-content-cell">${linePrompt}</div>
        </div>`;
  }).join('');

  return `
  <!-- EXTENDED WRITING PART 1 (VERSO - PAGE ${leftPageNum}) -->
  <div class="page page-container verso-page" id="page-${leftPageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Exam Header -->
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 2px;">
        <div style="display: flex; align-items: baseline; gap: 6px;">
          <h2 style="font-family: 'Playfair Display', serif; font-size: 11pt; color: #000000; margin: 0; font-weight: 800;">
            ${rx.tariff}
          </h2>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; border: 1px solid #000000; padding: 0 4px; border-radius: 2px; background: #f1f5f9; text-transform: uppercase;">
            ${rx.provenance || 'EDEXCEL PAPER 2'}
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 900; background: #000000; color: #ffffff; padding: 1px 5px; border-radius: 2px;">
            ${rightProb}
          </span>
        </div>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; border: 1.2px solid #000000; padding: 0 5px; border-radius: 2px;">
          Score: [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / ${maxScore} ]
        </span>
      </div>

      <!-- Question Stem & Stimulus -->
      <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 4px 6px; background: #ffffff; margin-bottom: 3px;">
        <p style="font-family: 'Playfair Display', serif; font-size: 9.6pt; font-weight: 800; color: #000000; margin: 0 0 2px 0; line-height: 1.22;">
          ${rx.stem}
        </p>
        <div style="display: flex; gap: 8px; font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #000000; background: #f8fafc; border: 1px solid #cbd5e1; padding: 2px 6px; border-radius: 2px;">
          <strong>You may use in your answer:</strong>
          <span>&bull; ${rx.stimulus[0]}</span>
          <span>&bull; ${rx.stimulus[1]}</span>
          <span style="font-style: italic; color: #1e3a8a; font-weight: 700;">(You must also use information of your own.)</span>
        </div>
      </div>

      <!-- 3-Column Mastery Structure Strip -->
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px; margin-bottom: 2px;">
        ${rx.structureStrip
          .map(
            (col, cIdx) => `
        <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 2px 4px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000000; padding-bottom: 1px; margin-bottom: 1px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.0pt; text-transform: uppercase; color: #000000;">
              ${col.col}
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.4pt; font-weight: 800; border: 1px solid #000000; padding: 0 3px; border-radius: 2px; background: #f8fafc;">POINT ${cIdx + 1}</span>
          </div>
          <p style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #111111; margin: 0; line-height: 1.15;">
            ${col.text}
          </p>
        </div>
        `,
          )
          .join('')}
      </div>

      <!-- Ruled Task Lines Prompt -->
      <div style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-style: italic; color: #222222; margin: 2px 0 1px 0;">
        <strong>Task:</strong> Using the structure strip above, write your analytical response below (continue on facing page for full timed response):
      </div>

      <!-- 17 Ruled Lines with 22mm Left Margin -->
      <div class="lined-page-grid" style="flex: 1; min-height: 0;">
        ${leftTaskLines}
      </div>

      ${renderFooterStrip(leftPageNum, footers[leftPageNum - 1], 24)}
    </div>
  </div>

  <!-- EXTENDED WRITING PART 2 (RECTO - PAGE ${rightPageNum}) -->
  <div class="page page-container recto-page" id="page-${rightPageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Running Header -->
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 4px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 10.5pt; color: #000000; margin: 0; font-weight: 800;">
          Enquiry ${keyTopicNum}.${enq.enquiryNum}: ${enq.title} &bull; ${rx.tariff.split(':')[0]} Continued
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
          Independent Timed Response &bull; Final Historical Verdict
        </span>
      </div>

      <!-- 28 Ruled Lines with 22mm Left Margin -->
      <div class="lined-page-grid" style="flex: 1; min-height: 0;">
        ${rightTaskLines}
      </div>

      ${renderFooterStrip(rightPageNum, footers[rightPageNum - 1], 24)}
    </div>
  </div>`;
}

function renderSynopticVaultPages(data, footers) {
  const enq1 = data.enquiries[0];
  const enq2 = data.enquiries[1];
  const enq3 = data.enquiries[2];
  const enq4 = data.enquiries[3];

  function renderDrillColumn(enq, startNum) {
    return `
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; border: 1.2px solid #000000; border-radius: 4px; padding: 3px 6px; background: #ffffff;">
        <div style="border-bottom: 1.2px solid #000000; padding-bottom: 2px; margin-bottom: 2px; display: flex; justify-content: space-between; align-items: center;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.0pt; text-transform: uppercase; color: #000000;">
            Enquiry ${data.keyTopicNum}.${enq.enquiryNum}: ${enq.title}
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; border: 1px solid #000000; padding: 0 4px; border-radius: 2px;">
            [ &nbsp;&nbsp;&nbsp;&nbsp; / 10 ]
          </span>
        </div>
        <div style="display: flex; flex-direction: column; flex: 1; justify-content: space-between; min-height: 0;">
          ${enq.doNow
            .map(
              (item, qi) => `
          <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; padding-top: 1px; min-height: 0;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 4px;">
              <span style="font-family: 'Inter', sans-serif; font-size: 7.3pt; font-weight: 700; color: #000000; line-height: 1.15;">
                ${startNum + qi}. ${item.q}
              </span>
              <span style="font-family: 'Inter', sans-serif; font-size: 5.8pt; color: #555555; white-space: nowrap; flex-shrink: 0; padding-top: 1px;">
                [ ] R1 &nbsp; [ ] R2 &nbsp; [ ] R3
              </span>
            </div>
            <div style="flex: 1; min-height: 2.2mm;"></div>
            <div style="border-bottom: 1.2px dotted #000000; width: 100%; margin-bottom: 1px;"></div>
          </div>
          `,
            )
            .join('')}
        </div>
      </div>`;
  }

  // Generate 40-question answers for upside-down key
  const ans1 = enq1.doNow
    .map((item, idx) => `<strong>${1 + idx}.</strong> ${item.a}`)
    .join(' &bull; ');
  const ans2 = enq2.doNow
    .map((item, idx) => `<strong>${11 + idx}.</strong> ${item.a}`)
    .join(' &bull; ');
  const ans3 = enq3.doNow
    .map((item, idx) => `<strong>${21 + idx}.</strong> ${item.a}`)
    .join(' &bull; ');
  const ans4 = enq4.doNow
    .map((item, idx) => `<strong>${31 + idx}.</strong> ${item.a}`)
    .join(' &bull; ');

  // Page 22 (Enquiries 1 & 2)
  const page22Html = `
  <!-- PAGE 22: SYNOPTIC RETRIEVAL VAULT PART 1 (ENQUIRIES 1 & 2) -->
  <div class="page page-container verso-page" id="page-22" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div>
        <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1px;">
            <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; letter-spacing: 0.5px; text-transform: uppercase; border: 1.2px solid #000000; padding: 1px 6px; border-radius: 2px;">
              KEY TOPIC ${data.keyTopicNum} &bull; SYNOPTIC RETRIEVAL VAULT &bull; PART 1
            </span>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-transform: uppercase; color: #000000;">
              SPACED RETRIEVAL DRILLS &bull; DO NOW QUESTIONS 1–20
            </span>
          </div>
          <h2 style="margin: 0; font-family: 'Playfair Display', serif; font-size: 11pt; color: #000000; font-weight: 900;">
            Cumulative Specification Recall: Enquiries ${data.keyTopicNum}.1 &amp; ${data.keyTopicNum}.2
          </h2>
        </div>

        <div style="border: 1px solid #000000; border-left: 3.5px solid #000000; padding: 2px 6px; background: #f8fafc; margin-bottom: 3px; font-family: 'Inter', sans-serif; font-size: 7.2pt; line-height: 1.2;">
          <strong>Classroom Protocol:</strong> Complete 5–10 questions as a Do Now bell-ringer at the start of each lesson, or quiz yourself across the term. Tick the review checkboxes (<strong>R1, R2, R3</strong>) after each spaced retrieval attempt.
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; flex: 1; min-height: 0;">
        ${renderDrillColumn(enq1, 1)}
        ${renderDrillColumn(enq2, 11)}
      </div>

      ${renderFooterStrip(22, footers[21], 24)}
    </div>
  </div>`;

  // Page 23 (Enquiries 3 & 4 + Upside-down Quick-Check Answer Key)
  const page23Html = `
  <!-- PAGE 23: SYNOPTIC RETRIEVAL VAULT PART 2 (ENQUIRIES 3 & 4) -->
  <div class="page page-container recto-page" id="page-23" style="padding: 4mm 6mm;">
    <div class="page-body-full" style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
      <div>
        <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1px;">
            <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; letter-spacing: 0.5px; text-transform: uppercase; border: 1.2px solid #000000; padding: 1px 6px; border-radius: 2px;">
              KEY TOPIC ${data.keyTopicNum} &bull; SYNOPTIC RETRIEVAL VAULT &bull; PART 2
            </span>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-transform: uppercase; color: #000000;">
              SPACED RETRIEVAL DRILLS &bull; DO NOW QUESTIONS 21–40
            </span>
          </div>
          <h2 style="margin: 0; font-family: 'Playfair Display', serif; font-size: 11pt; color: #000000; font-weight: 900;">
            Cumulative Specification Recall: Enquiries ${data.keyTopicNum}.3 &amp; ${data.keyTopicNum}.4
          </h2>
        </div>

        <div style="border: 1px solid #000000; border-left: 3.5px solid #000000; padding: 2px 6px; background: #f8fafc; margin-bottom: 3px; font-family: 'Inter', sans-serif; font-size: 7.2pt; line-height: 1.2;">
          <strong>Spaced Retention Target:</strong> Test yourself on previous weeks’ topics before starting a new enquiry. Frequent low-stakes retrieval prevents forgetting and secures Level 4 factual precision.
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; flex: 1; min-height: 0;">
        ${renderDrillColumn(enq3, 21)}
        ${renderDrillColumn(enq4, 31)}
      </div>

      <!-- Upside-Down Quick-Check Answer Key (Rotated 180° for self-marking in green pen) -->
      <div style="transform: rotate(180deg); margin: 3px 0 1px 0; border: 1.2px solid #000000; border-radius: 3px; padding: 2.5px 6px; background: #f8fafc; font-family: 'Inter', sans-serif; font-size: 5.3pt; line-height: 1.22; color: #1e293b; box-sizing: border-box;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 0.8px solid #000000; padding-bottom: 1px; margin-bottom: 1.5px;">
          <strong style="text-transform: uppercase; font-size: 5.6pt; color: #000000; letter-spacing: 0.3px;">
            🔄 Quick-Check Answer Key &bull; Key Topic ${data.keyTopicNum} Synoptic Vault (Questions 1–40)
          </strong>
          <span style="font-size: 4.8pt; font-style: italic; color: #64748b;">Rotate booklet 180&deg; to self-mark retrieval drills in green pen</span>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5px 8px;">
          <div><strong style="color: #000000;">Enquiry ${data.keyTopicNum}.1 (Q1–10):</strong> ${ans1}</div>
          <div><strong style="color: #000000;">Enquiry ${data.keyTopicNum}.2 (Q11–20):</strong> ${ans2}</div>
          <div><strong style="color: #000000;">Enquiry ${data.keyTopicNum}.3 (Q21–30):</strong> ${ans3}</div>
          <div><strong style="color: #000000;">Enquiry ${data.keyTopicNum}.4 (Q31–40):</strong> ${ans4}</div>
        </div>
      </div>

      ${renderFooterStrip(23, footers[22], 24)}
    </div>
  </div>`;

  return page22Html + page23Html;
}

// ============================================================================
// OPTION 1: GRADE 9 MODEL ANSWERS & UNSEEN SYNOPTIC EXAM PRACTICE (PAGES 20 & 21)
// ============================================================================

const GRADE_9_MODEL_ANSWERS = {
  KT1: {
    ktNum: '1',
    ktTitle: 'Queen, Government & Religion, 1558–69',
    examCode: 'Edexcel Specification · Paper 2',
    stem: 'Explain why Elizabeth faced challenges upon her accession in 1558.',
    stimulus: ['The French threat', 'Financial weaknesses'],
    p1: 'A primary challenge Elizabeth faced upon her accession was the acute military and diplomatic threat from France. In 1558, England was militarily vulnerable following the disastrous loss of Calais in January—England’s last continental possession—which severely damaged national prestige and removed the defensive buffer across the Channel. Compounding this, France was allied with Scotland via the "Auld Alliance", and Mary of Guise governed Scotland with French troops stationed directly along the English border. Furthermore, Mary, Queen of Scots had married the French Dauphin, Francis, and openly declared herself the rightful Queen of England, incorporating the English royal coat of arms into her own. This left Elizabeth immediately encircled by a hostile Catholic superpower capable of launching a two-pronged invasion.',
    p2: 'Furthermore, Elizabeth inherited crippling financial weaknesses from Mary I that threatened to paralyse the English state. In November 1558, Crown debt stood at an astronomical £300,000, while annual royal revenue was roughly £287,000, requiring £65,000 annually merely to service interest owed to foreign moneylenders in Antwerp. Consecutive Tudor monarchs had debased the silver coinage to fund wars in France, resulting in rampant price inflation, devastating ordinary households and ruining England’s international credit rating. Because Elizabeth needed extraordinary taxation from Parliament to function, her financial desperation risked forcing her into humiliating political concessions before her government was securely established.',
    p3: 'Beyond the stimulus, Elizabeth’s authority was fundamentally undermined by the dual dilemmas of her gender and legitimacy. In sixteenth-century Europe, society firmly believed female monarchy was "unnatural" and inherently weak, assuming a queen regnant could not lead armies or govern effectively without male control. Aggravating this prejudice was the question of Elizabeth’s dynastic legitimacy. Roman Catholics throughout England and Europe regarded Henry VIII’s marriage to Anne Boleyn as invalid because the Pope had never sanctioned Henry’s divorce from Catherine of Aragon. Under Catholic canon law, Elizabeth was illegitimate, meaning she had no legal right to inherit the crown. This dynastic vulnerability encouraged both domestic Catholic dissidents and foreign monarchs to view her regime as illegitimate and vulnerable to overthrow.',
    level2Trap:
      'Pupils describe Tudor problems as a factual list: "First England was £300,000 in debt. Next the French were in Scotland. Also people thought women should not rule, and Catholics disliked Anne Boleyn." This narrates what the problems were rather than explaining WHY they constituted grave threats to state security, financial stability, and monarchical survival.',
    level4Standard:
      'Every paragraph explains the specific mechanism of danger tied directly to the question stem (encirclement and invasion risk from France; sovereign insolvency and dependence on Parliament; ideological rebellion sparked by illegitimacy and gender). Integrates precise quantitative evidence (£300,000 debt, £65,000 interest, loss of Calais, Mary of Guise) and substantial own knowledge beyond the stimulus.',
    conclusionPrompt:
      'State which challenge posed the greatest immediate threat to Elizabeth in 1558 (foreign French invasion, Crown insolvency, or questions over her legitimacy) and justify your choice in 2 sentences:',
  },
  KT2: {
    ktNum: '2',
    ktTitle: 'Challenges at Home & Abroad, 1569–88',
    examCode: 'Edexcel June 2021 · Paper 2',
    stem: 'Explain why the Catholic threat to Elizabeth increased in the years 1569–85.',
    stimulus: ['Papal Bull Regnans in Excelsis (1570)', 'Throckmorton Plot (1583)'],
    p1: "A primary reason why the Catholic threat increased was Pope Pius V’s papal bull 'Regnans in Excelsis' in 1570. By excommunicating Elizabeth as a heretic and formally declaring her deposed, the Pope released English Catholics from their feudal oaths of allegiance, ordering them to disobey her royal commands. This transformed English Catholics from moderate religious dissenters into active traitors, providing international theological justification for domestic rebellion and foreign invasion. It also destroyed Elizabeth's policy of religious toleration, forcing the government to treat every Catholic as a potential assassin.",
    p2: 'Furthermore, the threat deepened because domestic Catholic unrest evolved into coordinated international conspiracies to overthrow the regime, as demonstrated by the 1583 Throckmorton Plot. Led by Francis Throckmorton, the conspiracy planned for a French Catholic invasion force led by the Duke of Guise, funded by Philip II of Spain and the Pope, to liberate Mary, Queen of Scots and depose Elizabeth. Uncovered by Sir Francis Walsingham’s intelligence service, the plot confirmed that foreign Catholic superpowers were actively collaborating to launch a full-scale invasion of England, provoking nationwide alarm and leading directly to the 1584 Bond of Association.',
    p3: 'Beyond the stimulus, the threat escalated dramatically due to the covert arrival of seminary priests and Jesuits trained in continental Europe. Following William Allen’s establishment of the English College at Douai in 1568, and the arrival of Jesuits like Edmund Campion in 1580, these trained missionaries travelled secretly through England administering Latin sacraments and sustaining Catholic defiance in secret priest holes. Although priests claimed purely spiritual motives, the Privy Council viewed them as foreign fifth-columnists preparing the populace for Spanish invasion. This prompted Parliament to enact draconian treason laws in 1581 and 1585, making conversion to Catholicism punishable by death.',
    level2Trap:
      'Pupils list Catholic plots chronologically: "First the Northern Earls rebelled in 1569. Then the Pope issued a bull. Then Ridolfi plotted with Norfolk, and later Throckmorton planned an invasion." This narrates events without explaining HOW the threat mutated from local discontent into global warfare.',
    level4Standard:
      'Traces the systematic escalation of threat across three analytical tiers: ideological warfare (papal bull), foreign military coordination (Spanish-backed invasion plots), and clandestine religious subversion (Jesuit missions). Directly explains why each development forced the Crown to adopt harsher counter-measures.',
    conclusionPrompt:
      'State which factor was the most dangerous catalyst in escalating the Catholic threat and justify your choice in 2 sentences:',
  },
  KT3: {
    ktNum: '3',
    ktTitle: 'Elizabethan Society in the Age of Exploration, 1558–88',
    examCode: 'Edexcel June 2022 · Paper 2',
    stem: 'Explain why the problem of poverty and vagrancy increased in the years 1558–88.',
    stimulus: ['Enclosure', 'Population growth'],
    p1: 'A fundamental cause of increasing poverty and vagrancy was explosive population growth. Between 1558 and 1588, England’s population grew rapidly from roughly 3 million to over 4.2 million. Agricultural food production could not keep pace with this demographic surge, creating chronic food shortages that drove runaway inflation, particularly in bread prices. Concurrently, the massive influx of young labourers saturated the rural job market, depressing real wages while grasping landowners dramatically increased entry fines and rents. Millions of ordinary Englishmen were reduced to subsistence poverty, unable to afford basic nourishment.',
    p2: 'This crisis was aggravated by agrarian restructuring, predominantly the enclosure of common land for sheep farming. Traditional open-field arable farming supported entire village communities through labour-intensive crop cultivation. However, the immense profitability of the wool trade incentivised landlords to enclose common pastures with hedges and convert arable fields into private sheep pasture. Sheep farming required only a tiny fraction of the labour force needed for arable crops, resulting in the widespread eviction of tenant farmers and cottagers. Deprived of common grazing rights, thousands of dispossessed families were driven onto the roads as destitute vagrants.',
    p3: 'Beyond the stimulus, poverty worsened severely due to the catastrophic collapse of the European cloth trade and consecutive harvest failures. Woollen cloth accounted for over 80% of England’s exports. In the 1550s and 1560s, religious warfare in the Netherlands and trade disputes with Philip II caused the Antwerp cloth market to crash, causing mass unemployment among spinners, carders, and weavers across East Anglia and the West Country. When combined with consecutive disastrous harvests in the 1570s and 1580s, bread prices spiked beyond reach, forcing thousands of impoverished townspeople to turn to begging and criminality to survive.',
    level2Trap:
      'Pupils write descriptive accounts of Tudor beggar types: "Vagabonds wandered the roads. Counterfeit cranks put soap in their mouths to pretend they were foaming sick. Parliament passed laws to whip vagrants and burn holes through their ears." This describes symptoms and punishments rather than analyzing economic causes.',
    level4Standard:
      'Categorises socio-economic causation into structural demographic pressure (population surge vs food supply), agrarian structural change (enclosure for sheep farming destroying rural employment), and macroeconomic trade shocks (Antwerp cloth collapse). Explains why parish charity was overwhelmed.',
    conclusionPrompt:
      'State which factor was the primary driver of Elizabethan poverty and explain your reasoning in 2 sentences:',
  },
};

const UNSEEN_SYNOPTIC_PRACTICE = {
  KT1: {
    ktNum: '1',
    ktTitle: 'Queen, Government & Religion, 1558–69',
    examCode: 'Pearson Edexcel Nov 2020 · Paper 2',
    stem: 'Explain why Elizabeth faced serious opposition to her religious settlement in the years 1559–69.',
    stimulus: ['The Vestments Controversy (1566)', 'Papal Bull / Recusancy'],
    plan1:
      '<strong>Factor 1 · Puritan Resistance:</strong> Archbishop Parker’s Book of Advertisements (1566) required clerical surplices; 37 London vicars refused and were suspended; challenged royal supremacy.',
    plan2:
      '<strong>Factor 2 · Catholic Recusancy:</strong> Devout Catholic gentry refused Protestant services; paid 1s fines; Pope Pius IV forbade church attendance; secret household Latin Masses.',
    plan3:
      '<strong>Factor 3 · Own Knowledge (Crucial):</strong> Revolt of the Northern Earls (1569); Catholic Earls of Northumberland and Westmorland marched on Durham Cathedral, restored Latin Mass, and aimed to free Mary Stuart.',
  },
  KT2: {
    ktNum: '2',
    ktTitle: 'Challenges at Home & Abroad, 1569–88',
    examCode: 'Pearson Edexcel June 2018 · Paper 2',
    stem: 'Explain why relations between England and Spain worsened between 1569 and 1585.',
    stimulus: ["Francis Drake's privateering", 'The Netherlands'],
    plan1:
      '<strong>Factor 1 · Drake’s Privateering:</strong> Raids on Nombre de Dios (1572) and Cacafuego (£140,000 in silver); Drake circumnavigates (1577–80); Elizabeth knights him at Deptford in 1581, enraging Philip II.',
    plan2:
      '<strong>Factor 2 · The Netherlands Crisis:</strong> Brutal Spanish repression under Duke of Alba; 1576 Spanish Fury at Antwerp; 1584 William the Silent murdered; 1585 Treaty of Nonsuch sends 7,400 English troops.',
    plan3:
      '<strong>Factor 3 · Own Knowledge (Crucial):</strong> Religious & Dynastic Conspiracies; Philip II and Spanish Ambassador Mendoza actively funded the 1571 Ridolfi and 1583 Throckmorton plots; 1584 Treaty of Joinville united France and Spain against England.',
  },
  KT3: {
    ktNum: '3',
    ktTitle: 'Elizabethan Society in the Age of Exploration, 1558–88',
    examCode: 'Pearson Edexcel Specification SAMs · Paper 2',
    stem: 'Explain why English exploration by sea expanded so rapidly in the years 1558–88.',
    stimulus: ['Navigational technology', 'New trade routes'],
    plan1:
      "<strong>Factor 1 · Navigational Advances:</strong> Adoption of the astrolabe and quadrant for latitude calculations; magnetic compasses; Mercator projection nautical charts; Hawkins' race-built galleons.",
    plan2:
      '<strong>Factor 2 · Commercial Need for Markets:</strong> Antwerp cloth market collapsed in 1550s/60s; English wool merchants forced to seek new export markets; Muscovy Company (Russia) and Levant Company.',
    plan3:
      '<strong>Factor 3 · Own Knowledge (Crucial):</strong> Privateering Riches & Imperial Geopolitics; Royal patronage and unofficial investment from Elizabeth; Drake’s 1577–80 circumnavigation returning £140,000; challenging Spanish Catholic hegemony.',
  },
};

function renderGrade9ModelAnswerPage(ktId, footerText) {
  const modelData = GRADE_9_MODEL_ANSWERS[ktId];
  if (!modelData) return '';

  return `
  <!-- PAGE 20: GRADE 9 MODEL ANSWER MASTERCLASS (VERSO) -->
  <div class="page page-container verso-page" id="page-20" style="padding: 4mm 6mm; box-sizing: border-box;">
    <div class="page-body-full" style="display: flex; flex-direction: column; justify-content: space-between; height: 100%; box-sizing: border-box;">

      <!-- Top Department & Exam Header -->
      <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 3px; display: flex; justify-content: space-between; align-items: baseline; box-sizing: border-box;">
        <div style="display: flex; align-items: baseline; gap: 6px;">
          <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 10.5pt; color: #000000; text-transform: uppercase; font-weight: 900; letter-spacing: 0.3px;">
            ⭐ Grade 9 Masterclass: Causation Essay &bull; Key Topic ${modelData.ktNum}
          </h2>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; border: 1px solid #000000; padding: 0 4px; border-radius: 2px; background: #f8fafc; text-transform: uppercase;">
            ${modelData.examCode}
          </span>
        </div>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 800; background: #000000; color: #ffffff; padding: 1px 6px; border-radius: 2px; text-transform: uppercase;">
          Level 4 Exemplar &bull; 12/12 Marks
        </span>
      </div>

      <!-- Question Stem & Official Stimulus Box -->
      <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 3px 6px; background: #ffffff; margin-bottom: 2.5px; box-sizing: border-box;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #cbd5e1; padding-bottom: 1.5px; margin-bottom: 2px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.4pt; text-transform: uppercase; color: #000000;">
            Official Exam Question &bull; Question 2 [12 Marks &bull; 18 Mins]
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; color: #475569;">
            AO1 (6m Knowledge &amp; Understanding) + AO2 (6m Causation &amp; Analysis)
          </span>
        </div>
        <p style="font-family: 'Playfair Display', serif; font-size: 9.0pt; font-weight: 800; color: #000000; margin: 1px 0 2px 0; line-height: 1.2;">
          ${modelData.stem}
        </p>
        <div style="display: flex; gap: 8px; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #000000; background: #f8fafc; border: 1px solid #cbd5e1; padding: 2px 6px; border-radius: 2px;">
          <strong>You may use in your answer:</strong>
          <span>&bull; ${modelData.stimulus[0]}</span>
          <span>&bull; ${modelData.stimulus[1]}</span>
          <span style="font-style: italic; color: #1e3a8a; font-weight: 700;">(You must also use information of your own.)</span>
        </div>
      </div>

      <!-- Active Pupil Annotation Protocol Ribbon -->
      <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 2px 6px; background: #f1f5f9; display: flex; justify-content: space-between; align-items: center; margin-bottom: 2.5px; box-sizing: border-box;">
        <strong style="font-family: 'Inter', sans-serif; font-size: 6.8pt; text-transform: uppercase; color: #000000; letter-spacing: 0.3px;">
          Active Model Annotation Protocol:
        </strong>
        <div style="display: flex; gap: 8px; font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700;">
          <span style="color: #854d0e;">🟡 1. Highlight 3 historical facts / statistics</span>
          <span style="color: #1e40af;">🔵 2. Underline 3 causal connective links</span>
          <span style="color: #15803d;">🟢 3. Circle where own knowledge beyond stimulus begins</span>
        </div>
      </div>

      <!-- Continuous Prose Level 4 Model Answer (3 Structured Paragraphs) -->
      <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 4px 7px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between; flex: 1; min-height: 0; margin-bottom: 2.5px; box-sizing: border-box;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000000; padding-bottom: 1.5px; margin-bottom: 2px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.4pt; text-transform: uppercase; color: #000000;">
            Continuous Prose Level 4 Exemplar Response (Full Marks &bull; 12/12)
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.6pt; font-style: italic; color: #475569;">
            Notice: Every paragraph opens with a factor, gives precise evidence, and ends with a direct causal link.
          </span>
        </div>
        <div style="font-family: 'Newsreader', 'Georgia', serif; font-size: 7.7pt; line-height: 1.25; color: #111111; display: flex; flex-direction: column; justify-content: space-between; flex: 1;">
          <p style="margin: 0; text-align: justify;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 6.9pt; text-transform: uppercase; color: #1e3a8a; border: 1px solid #1e3a8a; padding: 0 3px; border-radius: 2px; margin-right: 4px;">Paragraph 1 &bull; Stimulus 1</strong>
            ${modelData.p1}
          </p>
          <p style="margin: 0; text-align: justify;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 6.9pt; text-transform: uppercase; color: #1e3a8a; border: 1px solid #1e3a8a; padding: 0 3px; border-radius: 2px; margin-right: 4px;">Paragraph 2 &bull; Stimulus 2</strong>
            ${modelData.p2}
          </p>
          <p style="margin: 0; text-align: justify;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 6.9pt; text-transform: uppercase; color: #15803d; border: 1px solid #15803d; padding: 0 3px; border-radius: 2px; margin-right: 4px;">Paragraph 3 &bull; Own Knowledge</strong>
            ${modelData.p3}
          </p>
        </div>
      </div>

      <!-- Examiner Comparison: Level 2 Narrative Trap vs Level 4 Depth -->
      <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 3px 6px; background: #f8fafc; margin-bottom: 2.5px; box-sizing: border-box;">
        <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase; display: block; border-bottom: 1px solid #000000; padding-bottom: 1px; margin-bottom: 2px; color: #000000;">
          Examiner Comparison &bull; Why Most Pupils Drop Marks on Question 2
        </strong>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; font-family: 'Inter', sans-serif; font-size: 6.9pt; line-height: 1.18;">
          <div style="border: 1px solid #cbd5e1; padding: 2.5px 5px; border-radius: 2px; background: #ffffff;">
            <strong style="color: #b91c1c; display: block; margin-bottom: 1px;">⚠️ The Level 2 Narrative Trap (4–6 / 12 Marks):</strong>
            ${modelData.level2Trap}
          </div>
          <div style="border: 1px solid #cbd5e1; padding: 2.5px 5px; border-radius: 2px; background: #ffffff;">
            <strong style="color: #15803d; display: block; margin-bottom: 1px;">🎯 The Level 4 Analytical Standard (10–12 / 12 Marks):</strong>
            ${modelData.level4Standard}
          </div>
        </div>
      </div>

      <!-- Active Student Writing Task: Concluding Synthesis (2 Lines) -->
      <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 2.5px 6px; background: #ffffff; margin-bottom: 2px; box-sizing: border-box;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1.5px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase; color: #000000;">
            ✍️ Pupil Action &bull; Draft Your Own Analytical Conclusion [2 Sentences]
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-style: italic; color: #555555;">
            ${modelData.conclusionPrompt}
          </span>
        </div>
        <div style="display: flex; flex-direction: column; gap: 0;">
          <div class="task-line" style="height: 7.8mm;"></div>
          <div class="task-line" style="height: 7.8mm;"></div>
        </div>
      </div>

      ${renderFooterStrip(20, footerText, 24)}
    </div>
  </div>
  `;
}

function renderSynopticExamPracticePage(ktId, footerText) {
  const unseenData = UNSEEN_SYNOPTIC_PRACTICE[ktId];
  if (!unseenData) return '';

  return `
  <!-- PAGE 21: UNSEEN SYNOPTIC EXAM PRACTICE (RECTO) -->
  <div class="page page-container recto-page" id="page-21" style="padding: 4mm 6mm; box-sizing: border-box;">
    <div class="page-body-full" style="display: flex; flex-direction: column; justify-content: space-between; height: 100%; box-sizing: border-box;">

      <!-- Top Department & Timed Header -->
      <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 3px; display: flex; justify-content: space-between; align-items: baseline; box-sizing: border-box;">
        <div style="display: flex; align-items: baseline; gap: 6px;">
          <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 10.5pt; color: #000000; text-transform: uppercase; font-weight: 900; letter-spacing: 0.3px;">
            ⚡ Unseen Synoptic Exam Practice &bull; Key Topic ${unseenData.ktNum}
          </h2>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; border: 1px solid #000000; padding: 0 4px; border-radius: 2px; background: #f8fafc; text-transform: uppercase;">
            ${unseenData.examCode}
          </span>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; color: #000000;">
            ⏱️ Timed Condition: 18 Mins
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 800; border: 1.2px solid #000000; padding: 1px 6px; border-radius: 2px; background: #ffffff;">
            Score: [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 12 ]
          </span>
        </div>
      </div>

      <!-- Question Stem & Official Stimulus Box -->
      <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 3px 6px; background: #ffffff; margin-bottom: 3px; box-sizing: border-box;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #cbd5e1; padding-bottom: 1.5px; margin-bottom: 2px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.4pt; text-transform: uppercase; color: #000000;">
            Question 2 &bull; Explain Why [12 Marks &bull; AO1 (6m) + AO2 (6m)]
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; color: #475569;">
            Write 3 analytical paragraphs with sustained causal links to the stem
          </span>
        </div>
        <p style="font-family: 'Playfair Display', serif; font-size: 9.2pt; font-weight: 800; color: #000000; margin: 1px 0 2px 0; line-height: 1.2;">
          ${unseenData.stem}
        </p>
        <div style="display: flex; gap: 8px; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #000000; background: #f8fafc; border: 1px solid #cbd5e1; padding: 2px 6px; border-radius: 2px;">
          <strong>You may use in your answer:</strong>
          <span>&bull; ${unseenData.stimulus[0]}</span>
          <span>&bull; ${unseenData.stimulus[1]}</span>
          <span style="font-style: italic; color: #1e3a8a; font-weight: 700;">(You must also use information of your own.)</span>
        </div>
      </div>

      <!-- 3-Column Paragraph Planning Strip (3 Mins Plan) -->
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px; margin-bottom: 3px; box-sizing: border-box;">
        <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 2.5px 4px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000000; padding-bottom: 1px; margin-bottom: 1px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 6.9pt; text-transform: uppercase; color: #000000;">
              Paragraph 1 (Stimulus 1)
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.2pt; font-weight: 800; border: 1px solid #000000; padding: 0 2px; border-radius: 2px; background: #f8fafc;">PLAN</span>
          </div>
          <p style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #222222; margin: 0; line-height: 1.15;">
            ${unseenData.plan1}
          </p>
        </div>
        <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 2.5px 4px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000000; padding-bottom: 1px; margin-bottom: 1px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 6.9pt; text-transform: uppercase; color: #000000;">
              Paragraph 2 (Stimulus 2)
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.2pt; font-weight: 800; border: 1px solid #000000; padding: 0 2px; border-radius: 2px; background: #f8fafc;">PLAN</span>
          </div>
          <p style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #222222; margin: 0; line-height: 1.15;">
            ${unseenData.plan2}
          </p>
        </div>
        <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 2.5px 4px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000000; padding-bottom: 1px; margin-bottom: 1px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 6.9pt; text-transform: uppercase; color: #15803d;">
              Paragraph 3 (Own Knowledge)
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.2pt; font-weight: 800; border: 1px solid #15803d; color: #15803d; padding: 0 2px; border-radius: 2px; background: #f0fdf4;">CRUCIAL</span>
          </div>
          <p style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #222222; margin: 0; line-height: 1.15;">
            ${unseenData.plan3}
          </p>
        </div>
      </div>

      <!-- Exactly 18 Ruled Lines with 22mm Left Margin -->
      <div class="lined-page-grid" style="flex: 1; min-height: 0; margin-bottom: 3px;">
        ${Array.from({ length: 18 }, (_, lIdx) => {
          const isFirst = lIdx === 0;
          const marginContent = isFirst
            ? `<span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #555555; text-transform: uppercase; font-weight: 700;">Margin</span>`
            : `&nbsp;`;
          const linePrompt = isFirst
            ? `<span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-style: italic; color: #777777;">[ Begin your 3-paragraph timed causation response here... ]</span>`
            : `&nbsp;`;
          return `
            <div class="lined-row">
              <div class="lined-margin-cell">${marginContent}</div>
              <div class="lined-content-cell">${linePrompt}</div>
            </div>`;
        }).join('')}
      </div>

      <!-- Teacher / Self Assessment Feedback Micro-Box -->
      <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 2.5px 6px; background: #f8fafc; display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px; box-sizing: border-box;">
        <div style="display: flex; gap: 8px; font-family: 'Inter', sans-serif; font-size: 6.6pt; font-weight: 700; color: #333333;">
          <span>Level Descriptors:</span>
          <span>[ ] L1 (1–3m): Basic / Descriptive</span>
          <span>[ ] L2 (4–6m): Simple Explanation</span>
          <span>[ ] L3 (7–9m): Developed Analysis</span>
          <span>[ ] L4 (10–12m): Sustained Causal Judgement</span>
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; color: #000000;">
          Final Mark: [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 12</strong> ]
        </div>
      </div>

      ${renderFooterStrip(21, footerText, 24)}
    </div>
  </div>
  `;
}

function buildEeeKeyTopicWorkbook(ktId) {
  const data = KEY_TOPICS_DATA[ktId];
  if (!data) throw new Error(`Unknown Key Topic ID: ${ktId}`);

  // Inject 5-stage Chronological Inquiry Spine and probability tags
  data.enquiries.forEach((enq) => {
    if (ENQUIRY_STAGES[enq.id]) {
      enq.stages = ENQUIRY_STAGES[enq.id];
    }
    if (QUESTION_PROBABILITIES[enq.id]) {
      enq.featureA.probability = QUESTION_PROBABILITIES[enq.id].featA;
      enq.featureB.probability = QUESTION_PROBABILITIES[enq.id].featB;
      enq.rightExam.probability = QUESTION_PROBABILITIES[enq.id].right;
    }
  });

  const footers = EEE_FOOTERS[ktId];
  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Key Topic ${data.keyTopicNum}: ${data.title} Workbook</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:wght@700;800;900&display=swap" rel="stylesheet">
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
    }
    .verso-page,
    .recto-page {
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
      margin-bottom: 2px;
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
    
    /* Cornell Notes Architecture (Spread 2) */
    .cornell-notes-grid {
      display: flex;
      flex-direction: column;
      flex: 1;
      gap: 5px;
      margin: 2px 0;
      overflow: hidden;
    }
    .cornell-section {
      border: 1.3px solid #000000;
      border-radius: 4px;
      display: flex;
      flex: 1;
      overflow: hidden;
      background: #ffffff;
    }
    .cornell-margin-cell {
      width: 58mm;
      border-right: 1.5px solid #000000;
      padding: 4px 6px;
      background: #fbfbfb;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex-shrink: 0;
      box-sizing: border-box;
    }
    .cornell-badge {
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      font-weight: 800;
      text-transform: uppercase;
      color: #1e3a8a;
      letter-spacing: 0.5px;
      border-bottom: 1px solid #cbd5e1;
      padding-bottom: 1px;
      margin-bottom: 2px;
    }
    .cornell-title {
      font-family: 'Playfair Display', serif;
      font-size: 8.8pt;
      font-weight: 900;
      color: #000000;
      line-height: 1.15;
      margin-bottom: 3px;
    }
    .cornell-cues {
      font-family: 'Inter', sans-serif;
      font-size: 7.0pt;
      line-height: 1.22;
      color: #334155;
    }
    .cornell-cues div {
      margin-bottom: 2px;
    }
    .cornell-lines-cell {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 0 4px;
      background: #ffffff;
      box-sizing: border-box;
    }
    .line-prompt {
      font-family: 'Inter', sans-serif;
      font-size: 6.6pt;
      font-style: italic;
      color: #64748b;
      position: absolute;
      top: 1px;
      left: 2px;
    }

    /* Clean Lined Paper Grid for Extended Writing Pages (28 ruled lines per page) */
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
      width: 22mm;
      border-right: 1.2px solid #000000;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      padding-left: 2px;
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
      color: #111111;
      font-weight: 500;
    }
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
  html += renderStandardFrontCover({
    unitId: 'eee',
    paperTitle:
      'PEARSON EDEXCEL GCSE (9–1) HISTORY • PAPER 2: EARLY ELIZABETHAN ENGLAND, 1558–1588',
    specCode: 'SPECIFICATION 1HI0/2B (SECTION B: BRITISH DEPTH STUDY)',
    keyTopicNum: data.keyTopicNum,
    dateRange: data.dateRange,
    title: data.title,
    subtitle: data.subtitle,
    heroImage: data.heroImage,
    specBox: data.specBox,
    footerQuip: footers[0],
    totalPageCount: 24,
    renderFooterStrip,
  });

  // ====================================================================
  // PAGES 2–3: LIVING TIMELINE (6 MILESTONES)
  // ====================================================================
  const msPart1 = data.milestones.slice(0, 3);
  const msPart2 = data.milestones.slice(3, 6);

  html += `
  <!-- PAGE 2: LIVING TIMELINE PART 1 -->
  <div class="page page-container verso-page" id="page-2" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div>
        <div style="border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 5px;">
          <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 11pt; color: #000000; text-transform: uppercase; font-weight: 800;">
            Living Timeline &bull; Part 1: Chronological Anchors (Key Topic ${data.keyTopicNum})
          </h2>
        </div>
        <div style="border-bottom: 1px solid #000000; padding-bottom: 3px; margin-bottom: 6px; font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #000000;">
          <strong>Instructions:</strong> As you study each enquiry lesson, complete the timeline missions by sketching and annotating in the corresponding dual-coding sketchpads below.
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 6px; flex: 1; justify-content: space-between;">
        ${msPart1
          .map(
            (m) => `
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 5px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 9.6pt; color: #000000;">
                ${m.date} &bull; ${m.title}
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">${m.tag}</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 9.0pt; color: #000000; margin: 0 0 3px 0; line-height: 1.24;">
              ${m.text}
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 48mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>
        `,
          )
          .join('')}
      </div>

      ${renderFooterStrip(2, footers[1], 24)}
    </div>
  </div>

  <!-- PAGE 3: LIVING TIMELINE PART 2 -->
  <div class="page page-container recto-page" id="page-3" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div>
        <div style="border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 5px;">
          <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 11pt; color: #000000; text-transform: uppercase; font-weight: 800;">
            Living Timeline &bull; Part 2: Chronological Anchors (Key Topic ${data.keyTopicNum})
          </h2>
        </div>
        <div style="border-bottom: 1px solid #000000; padding-bottom: 3px; margin-bottom: 6px; font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #000000;">
          <strong>Instructions:</strong> Complete the dual-coding sketches to permanently anchor these chronological turning points in long-term memory.
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 6px; flex: 1; justify-content: space-between;">
        ${msPart2
          .map(
            (m) => `
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 5px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 9.6pt; color: #000000;">
                ${m.date} &bull; ${m.title}
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">${m.tag}</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 9.0pt; color: #000000; margin: 0 0 3px 0; line-height: 1.24;">
              ${m.text}
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 48mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>
        `,
          )
          .join('')}
      </div>

      ${renderFooterStrip(3, footers[2], 24)}
    </div>
  </div>
`;

  // ====================================================================
  // PAGES 4–19: 4 DEDICATED FOUR-PAGE ENQUIRY MODULES (MEDICINE-STYLE)
  // Page 1: 5-Stage Chronological Inquiry Spine & Lecture Notes (Verso)
  // Page 2: Short-Tariff Exam Practice & Concept Bridge (Recto)
  // Pages 3 & 4: Extended Writing Timed Assessment (Facing Spread)
  // ====================================================================
  data.enquiries.forEach((enq, idx) => {
    const leftPageNum = 4 + idx * 4; // 4, 8, 12, 16
    const rightPageNum = leftPageNum + 1; // 5, 9, 13, 17
    const linedLeftPageNum = leftPageNum + 2; // 6, 10, 14, 18
    const linedRightPageNum = leftPageNum + 3; // 7, 11, 15, 19

    // Page 1 of module (Verso): Chronological Inquiry Spine + Cornell Notes
    html += renderSpinePage(enq, leftPageNum, footers[leftPageNum - 1], data.keyTopicNum);

    // Page 2 of module (Recto): Q1(a) [2m] + Q1(b) [2m] + Core Vocab + Timeline Mission
    html += renderFeaturePage(enq, rightPageNum, footers[rightPageNum - 1], data.keyTopicNum);

    // Pages 3 & 4 of module (Facing Spread): Extended Writing Assessment (12m / 16m+4m)
    html += renderExtendedWritingPages(
      enq,
      linedLeftPageNum,
      linedRightPageNum,
      footers,
      data.keyTopicNum,
    );
  });

  // ====================================================================
  // PAGE 20: GRADE 9 LEVEL 4 (12/12) MASTERCLASS & CAUSATION ESSAY (VERSO)
  // ====================================================================
  html += renderGrade9ModelAnswerPage(ktId, footers[19]);

  // ====================================================================
  // PAGE 21: UNSEEN SYNOPTIC EXAM PRACTICE (RECTO)
  // ====================================================================
  html += renderSynopticExamPracticePage(ktId, footers[20]);

  // ====================================================================
  // PAGES 22 & 23: THE 40-QUESTION SYNOPTIC RETRIEVAL VAULT
  // ====================================================================
  html += renderSynopticVaultPages(data, footers);

  // ====================================================================
  // ====================================================================
  // PAGE 24: OUTSIDE BACK COVER
  // ====================================================================

  function cleanStem(stem) {
    if (!stem) return '';
    return stem
      .replace(/^Describe one key feature of /i, '')
      .replace(/^Describe one feature of /i, '')
      .replace(/\.$/, '');
  }

  let examRowsHtml = '';

  data.enquiries.forEach((enq, idx) => {
    const leftPageNum = idx * 4 + 4;
    const rightPageNum = idx * 4 + 5;
    const extTariff = enq.rightExam.type === 'explain_why_12' ? 12 : 16;
    const extLabel = enq.rightExam.type === 'explain_why_12' ? 'Q2 Explain Why' : 'Q3 Essay';

    const featAText = cleanStem(enq.featureA?.stem);
    const featBText = cleanStem(enq.featureB?.stem);
    const featCText = cleanStem(enq.featureC?.stem);
    let extText = enq.rightExam?.stem || 'Extended Writing Task';
    if (extText.length > 70) extText = extText.slice(0, 67) + '...';

    examRowsHtml += `
      <tr style="border-top: 1.5px solid #000000; border-bottom: 1px solid #cbd5e1; background: #ffffff;">
        <td rowspan="4" style="padding: 3px 4px; text-align: center; font-weight: 900; font-size: 8.5pt; border-right: 1.2px solid #000000; vertical-align: middle; background: #f8fafc;">
          ${data.keyTopicNum}.${enq.enquiryNum}
        </td>
        <td rowspan="4" style="padding: 3px 8px; border-right: 1.2px solid #000000; vertical-align: middle; background: #ffffff;">
          <strong style="font-size: 8.0pt; text-transform: uppercase; color: #000000; display: block; line-height: 1.2;">
            Enquiry ${data.keyTopicNum}.${enq.enquiryNum}: ${enq.title}
          </strong>
          <span style="font-size: 7.2pt; color: #475569; display: block; margin-top: 2px;">
            Do Now Retrieval (p. ${leftPageNum}): [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 10</strong> ]
          </span>
        </td>
        <td style="padding: 3px 4px; text-align: center; border-right: 1px solid #000000; font-size: 7.4pt; font-weight: 800; background: #fafafa;">
          p. ${rightPageNum}
        </td>
        <td style="padding: 3px 8px; border-right: 1px solid #000000; font-size: 7.4pt; font-weight: 600;">
          <strong>Q1(a) Feature:</strong> ${featAText} [2m]
        </td>
        <td rowspan="4" style="padding: 4px 6px; text-align: center; border-right: 1.2px solid #000000; font-size: 8.5pt; font-weight: 800; vertical-align: middle; background: #ffffff;">
          [ &nbsp;&nbsp;&nbsp;<strong>___ / ___</strong>&nbsp;&nbsp;&nbsp; ]
        </td>
        <td style="padding: 3px 6px; text-align: center; font-size: 9.0pt; font-weight: 800; white-space: nowrap;">
          [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 2</strong> ]
        </td>
      </tr>
      <tr style="border-bottom: 1px solid #cbd5e1; background: #ffffff;">
        <td style="padding: 3px 4px; text-align: center; border-right: 1px solid #000000; font-size: 7.4pt; font-weight: 800; background: #fafafa;">
          p. ${rightPageNum}
        </td>
        <td style="padding: 3px 8px; border-right: 1px solid #000000; font-size: 7.4pt; font-weight: 600;">
          <strong>Q1(b) Feature:</strong> ${featBText} [2m]
        </td>
        <td style="padding: 3px 6px; text-align: center; font-size: 9.0pt; font-weight: 800; white-space: nowrap;">
          [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 2</strong> ]
        </td>
      </tr>
      <tr style="border-bottom: 1px solid #cbd5e1; background: #ffffff;">
        <td style="padding: 3px 4px; text-align: center; border-right: 1px solid #000000; font-size: 7.4pt; font-weight: 800; background: #fafafa;">
          p. ${rightPageNum}
        </td>
        <td style="padding: 3px 8px; border-right: 1px solid #000000; font-size: 7.4pt; font-weight: 600;">
          <strong>Q1(c) Feature:</strong> ${featCText} [2m]
        </td>
        <td style="padding: 3px 6px; text-align: center; font-size: 9.0pt; font-weight: 800; white-space: nowrap;">
          [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 2</strong> ]
        </td>
      </tr>
      <tr style="border-bottom: 1.5px solid #000000; background: #ffffff;">
        <td style="padding: 3px 4px; text-align: center; border-right: 1px solid #000000; font-size: 7.4pt; font-weight: 800; background: #fafafa;">
          p. ${rightPageNum}
        </td>
        <td style="padding: 3px 8px; border-right: 1px solid #000000; font-size: 7.4pt; font-weight: 600;">
          <strong>${extLabel}:</strong> ${extText} [${extTariff}m]
        </td>
        <td style="padding: 3px 6px; text-align: center; font-size: 9.0pt; font-weight: 800; white-space: nowrap;">
          [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ ${extTariff}</strong> ]
        </td>
      </tr>
    `;
  });

  // 4 Interactive Digital Dual-QR Cards (Lesson Hub + 20-Q Quiz)
  const qrCardsHtml = data.enquiries
    .map((enq) => {
      const lessonUrl = `https://the-history-revision-hub.netlify.app/?view=lessons&unit=eee&lesson=${enq.id}`;
      const quizUrl = `https://the-history-revision-hub.netlify.app/?view=lessons&unit=eee&lesson=${enq.id}&quiz=true`;
      const lessonQrSvg = generateQrSvg(lessonUrl);
      const quizQrSvg = generateQrSvg(quizUrl);

      let specSnippet = '';
      if (enq.specAnchor) {
        const parts = enq.specAnchor
          .split(/;|\(|\)/)
          .map((s) => s.trim())
          .filter(Boolean);
        specSnippet = parts.slice(0, 2).join(' &bull; ');
        if (specSnippet.length > 44) specSnippet = specSnippet.slice(0, 41) + '...';
      }

      return `
      <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 5px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between; text-align: center; box-sizing: border-box; overflow: hidden; min-width: 0;">
        
        <!-- Card Header -->
        <div style="border-bottom: 1.2px solid #000000; padding-bottom: 2px; margin-bottom: 2px; overflow: hidden;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 900; text-transform: uppercase; color: #000000; display: block;">
            Enquiry ${data.keyTopicNum}.${enq.enquiryNum}
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.3pt; font-weight: 700; color: #1e293b; display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%;">
            ${enq.title}
          </span>
          ${
            specSnippet
              ? `
          <span style="font-family: 'Inter', sans-serif; font-size: 5.4pt; color: #64748b; display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%; margin-top: 1px;">
            ${specSnippet}
          </span>`
              : ''
          }
        </div>

        <!-- Dual QR Codes: Lesson + Quiz -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px; align-items: center; justify-content: center; margin: 3px 0; padding: 2px 0;">
          
          <!-- Left QR: Digital Lesson -->
          <div style="display: flex; flex-direction: column; align-items: center; min-width: 0;">
            <span style="font-family: 'Inter', sans-serif; font-size: 5.8pt; font-weight: 800; text-transform: uppercase; color: #000000; margin-bottom: 1.5px; white-space: nowrap;">
              📖 Lesson
            </span>
            <div style="width: 16mm; height: 16mm; margin: 0 auto; background: #ffffff; padding: 1px; border: 1px solid #cbd5e1; border-radius: 3px; box-sizing: border-box; display: flex; align-items: center; justify-content: center;">
              ${lessonQrSvg}
            </div>
            <span style="font-family: 'Inter', sans-serif; font-size: 5.2pt; font-weight: 600; color: #475569; margin-top: 1.5px; white-space: nowrap;">
              Read Online
            </span>
          </div>

          <!-- Right QR: Interactive Quiz -->
          <div style="display: flex; flex-direction: column; align-items: center; min-width: 0;">
            <span style="font-family: 'Inter', sans-serif; font-size: 5.8pt; font-weight: 800; text-transform: uppercase; color: #000000; margin-bottom: 1.5px; white-space: nowrap;">
              ⚡ 20-Q Quiz
            </span>
            <div style="width: 16mm; height: 16mm; margin: 0 auto; background: #ffffff; padding: 1px; border: 1px solid #cbd5e1; border-radius: 3px; box-sizing: border-box; display: flex; align-items: center; justify-content: center;">
              ${quizQrSvg}
            </div>
            <span style="font-family: 'Inter', sans-serif; font-size: 5.2pt; font-weight: 600; color: #475569; margin-top: 1.5px; white-space: nowrap;">
              Self-Marking
            </span>
          </div>

        </div>

        <!-- Retrieval Attempts Log & Score Box -->
        <div style="border-top: 1.2px solid #000000; padding: 2.5px 3px; margin-top: 2px; font-family: 'Inter', sans-serif; background: #f8fafc; border-radius: 2px; box-sizing: border-box;">
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 5.6pt; font-weight: 700; color: #475569; margin-bottom: 2px;">
            <span>Quiz Attempt:</span>
            <span>[ ] 1st &nbsp; [ ] 2nd &nbsp; [ ] 3rd</span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 7.2pt; font-weight: 900; color: #000000;">
            <span style="font-size: 6.0pt; font-weight: 700;">Score:</span>
            <span>[ &nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 20</strong> ]</span>
            <span style="font-size: 5.8pt; font-weight: 600; color: #64748b;">Date: ___/___</span>
          </div>
        </div>

      </div>`;
    })
    .join('');

  html += `
  <div class="page page-container verso-page" id="page-24" style="padding: 4mm 6mm; box-sizing: border-box;">
    <div class="page-body-full" style="display: flex; flex-direction: column; justify-content: space-between; height: 100%; box-sizing: border-box;">
      
      <!-- Top Department Header -->
      <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 3px; box-sizing: border-box;" data-department-name="The History Department">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 10.5pt; text-transform: uppercase; color: #000000;">
            <span class="school-brand-target">The History Department</span> &bull; Assessment &amp; Progress Record
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 700; letter-spacing: 0.5px;">
            KEY TOPIC ${data.keyTopicNum} ASSESSMENT &amp; HOMEWORK RECORD
          </span>
        </div>
      </div>

      <!-- Pupil Header Card -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 4px 10px; background: #ffffff; display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px; box-sizing: border-box;">
        <div style="flex: 1; margin-right: 15px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 8.5pt; font-weight: 800; text-transform: uppercase;">Pupil:</span>
          <div style="border-bottom: 1.5px solid #000000; height: 16px; margin-top: 1px;"></div>
        </div>
        <div style="text-align: center; margin-right: 15px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 8.2pt; font-weight: 800; text-transform: uppercase;">Target Grade:</span>
          <div style="border: 1.5px solid #000000; border-radius: 3px; width: 36px; height: 24px; margin: 2px auto 0 auto; font-family: 'Inter', sans-serif; font-size: 11pt; font-weight: 900; line-height: 22px;"></div>
        </div>
        <div style="text-align: center; margin-right: 15px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 8.2pt; font-weight: 800; text-transform: uppercase;">Predicted:</span>
          <div style="border: 1.5px solid #000000; border-radius: 3px; width: 36px; height: 24px; margin: 2px auto 0 auto; font-family: 'Inter', sans-serif; font-size: 11pt; font-weight: 900; line-height: 22px;"></div>
        </div>
        <div style="text-align: center;">
          <span style="font-family: 'Inter', sans-serif; font-size: 8.2pt; font-weight: 800; text-transform: uppercase;">Attitude:</span>
          <div style="font-family: 'Inter', sans-serif; font-size: 9.5pt; font-weight: 800; margin-top: 4px;">
            1 &bull; 2 &bull; 3 &bull; 4 &bull; 5
          </div>
        </div>
      </div>

      <!-- Master Exam Practice & Homework Assessment Tracker Table -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; overflow: hidden; margin-bottom: 4px; box-sizing: border-box;">
        <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif;">
          <thead>
            <tr style="border-bottom: 1px solid #000000; background: #e2e8f0; color: #000000;">
              <th colspan="6" style="padding: 3px 6px; font-size: 7.8pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; text-align: left;">
                Master Exam Practice &amp; Homework Assessment Tracker &bull; Key Topic ${data.keyTopicNum}
              </th>
            </tr>
            <tr style="border-bottom: 1.5px solid #000000; background: #ffffff;">
              <th style="padding: 3px 4px; width: 28px; text-align: center; font-size: 7.6pt; font-weight: 900; border-right: 1.2px solid #000000;">#</th>
              <th style="padding: 3px 8px; text-align: left; font-size: 7.6pt; font-weight: 900; text-transform: uppercase; border-right: 1.2px solid #000000;">Enquiry &amp; Specification Topic</th>
              <th style="padding: 3px 4px; width: 36px; text-align: center; font-size: 7.4pt; font-weight: 900; text-transform: uppercase; border-right: 1px solid #000000;">Page</th>
              <th style="padding: 3px 8px; text-align: left; font-size: 7.6pt; font-weight: 900; text-transform: uppercase; border-right: 1px solid #000000;">Exam Practice Question &amp; Focus</th>
              <th style="padding: 4px 6px; width: 100px; text-align: center; font-size: 7.6pt; font-weight: 900; text-transform: uppercase; border-right: 1.2px solid #000000;">Homework Deadline</th>
              <th style="padding: 4px 6px; width: 125px; text-align: center; font-size: 7.6pt; font-weight: 900; text-transform: uppercase;">Mark Awarded</th>
            </tr>
          </thead>
          <tbody>
            ${examRowsHtml}
          </tbody>
        </table>
      </div>

      <!-- Interactive Digital Hub (Flex Absorbs Vertical Space) -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 4px 6px; background: #ffffff; flex: 1; display: flex; flex-direction: column; justify-content: space-between; margin-bottom: 2px; box-sizing: border-box; overflow: hidden;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid #000000; padding-bottom: 2px; margin-bottom: 3px; box-sizing: border-box;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; text-transform: uppercase; color: #000000;">
            📱 Interactive Digital Hub &bull; Smartphone QR Revision Access
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; color: #222222; font-weight: 700;">
            Scan to read full digital textbook narratives or take live 20-question self-marking quizzes
          </span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; text-align: center; flex: 1; box-sizing: border-box; overflow: hidden;">
          ${qrCardsHtml}
        </div>
      </div>

      ${renderFooterStrip(24, footers[23], 24)}
    </div>
  </div>
`;

  html += `
  <!-- Client-Side Auto-Lines Calculator (Evaluated in Puppeteer before PDF print) -->
  <script>
    function autoFillWritingLines() {
      document.querySelectorAll('[data-auto-lines]').forEach(el => {
        el.innerHTML = '';
        const availablePx = el.clientHeight;
        const lineHMm = parseFloat(el.dataset.lineHeight || '7.5');
        // Standard 96 DPI: 1 inch = 25.4mm = 96px => 1mm = 3.779527559px
        const lineHPx = lineHMm * (96 / 25.4);
        const count = Math.max(1, Math.round(availablePx / lineHPx));
        el.innerHTML = Array(count).fill(
          '<div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>'
        ).join('');
      });
    }
    window.addEventListener('DOMContentLoaded', autoFillWritingLines);
    if (document.readyState !== 'loading') autoFillWritingLines();
  </script>
</body>
</html>
`;

  return html;
}

// ============================================================================
// PDF COMPILER HELPER (WITH AUDIT)
// ============================================================================
async function compilePdf(htmlPath, pdfPath, v17Path) {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
  });
  const page = await browser.newPage();
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });

  // Evaluate dynamic lines calculation client-side in Puppeteer
  await page.evaluate(() => {
    if (typeof autoFillWritingLines === 'function') {
      autoFillWritingLines();
    }
  });

  // Space audit before PDF compilation
  const audit = await auditPageBudget(page);
  printSpaceAuditReport(audit, path.basename(htmlPath));

  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '0mm', bottom: '0mm', left: '0mm', right: '0mm' },
  });

  if (v17Path) {
    fs.copyFileSync(pdfPath, v17Path);
  }

  await browser.close();
}

// ============================================================================
// WORKBOOK COMPILATION & PDF ASSEMBLY
// ============================================================================
async function renderKeyTopicWorkbook(kt) {
  console.log(`\n▶ Generating 24-page workbook for Key Topic ${kt}...`);
  const html = buildEeeKeyTopicWorkbook(kt);

  const publicHtml = path.join(
    ROOT_DIR,
    'public',
    'units',
    'eee',
    `pupil_workbook_${kt.toLowerCase()}.html`,
  );
  const unitHtml = path.join(ROOT_DIR, 'units', 'eee', `pupil_workbook_${kt.toLowerCase()}.html`);

  fs.mkdirSync(path.dirname(publicHtml), { recursive: true });
  fs.mkdirSync(path.dirname(unitHtml), { recursive: true });

  fs.writeFileSync(publicHtml, html, 'utf8');
  fs.writeFileSync(unitHtml, html, 'utf8');
  console.log(`✅ Saved HTML: ${publicHtml}`);

  const pdfPath = path.join(
    ROOT_DIR,
    'public',
    'units',
    'eee',
    `pupil_workbook_${kt.toLowerCase()}.pdf`,
  );
  const pdfGeneral = path.join(ROOT_DIR, 'public', 'pdfs', `eee_pupil_workbook_${kt}.pdf`);
  const v17Path = path.join(ROOT_DIR, 'public', 'pdfs', `eee_pupil_workbook_${kt}_FINAL_V17.pdf`);

  fs.mkdirSync(path.dirname(pdfPath), { recursive: true });
  fs.mkdirSync(path.dirname(pdfGeneral), { recursive: true });
  console.log(`🖨️ Compiling PDF with Puppeteer...`);
  await compilePdf(publicHtml, pdfPath, v17Path);
  fs.copyFileSync(pdfPath, pdfGeneral);
  console.log(`✅ Compiled PDF: ${pdfPath}`);
}

async function mergeMasterWorkbook() {
  console.log('\n=============================================================');
  console.log('📚 MERGING 72-PAGE EARLY ELIZABETHAN ENGLAND MASTER WORKBOOK...');
  console.log('=============================================================');

  const kt1PdfPath = path.join(ROOT_DIR, 'public', 'units', 'eee', 'pupil_workbook_kt1.pdf');
  const kt2PdfPath = path.join(ROOT_DIR, 'public', 'units', 'eee', 'pupil_workbook_kt2.pdf');
  const kt3PdfPath = path.join(ROOT_DIR, 'public', 'units', 'eee', 'pupil_workbook_kt3.pdf');
  const masterPdfPath = path.join(ROOT_DIR, 'public', 'units', 'eee', 'pupil_workbook.pdf');
  const masterPdfGeneral = path.join(ROOT_DIR, 'public', 'pdfs', 'eee_pupil_workbook_master.pdf');

  if (!fs.existsSync(kt1PdfPath) || !fs.existsSync(kt2PdfPath) || !fs.existsSync(kt3PdfPath)) {
    throw new Error('One or more KT PDF files missing for master merge!');
  }

  const mergedPdf = await PDFDocument.create();

  for (const [name, pdfPath] of [
    ['KT1', kt1PdfPath],
    ['KT2', kt2PdfPath],
    ['KT3', kt3PdfPath],
  ]) {
    const pdfBytes = fs.readFileSync(pdfPath);
    const doc = await PDFDocument.load(pdfBytes);
    const copiedPages = await mergedPdf.copyPages(doc, doc.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
    console.log(`  + Appended ${name}: ${copiedPages.length} pages`);
  }

  const mergedBytes = await mergedPdf.save();
  fs.writeFileSync(masterPdfPath, mergedBytes);
  fs.writeFileSync(masterPdfGeneral, mergedBytes);
  console.log(
    `\n🎉 Master Workbook compiled: ${masterPdfPath} (${mergedPdf.getPageCount()} pages, ${(mergedBytes.length / 1024 / 1024).toFixed(2)} MB)`,
  );
}

// Master PDF Merger (KT1 + KT2 + KT3 = 72-page Master Workbook)
async function mergeMasterWorkbook() {
  console.log('\n🔄 Merging Early Elizabethan England Master Pupil Workbook (72 Pages)...');
  const mergedPdf = await PDFDocument.create();

  const kts = ['KT1', 'KT2', 'KT3'];
  let totalMergedPages = 0;

  for (const kt of kts) {
    const pdfFileName = `eee_pupil_workbook_${kt}_FINAL_V17.pdf`;
    const pdfPath = path.join(ROOT_DIR, 'public', 'pdfs', pdfFileName);

    if (!fs.existsSync(pdfPath)) {
      console.warn(`⚠️ Warning: Missing ${pdfFileName}, skipping merge for ${kt}...`);
      continue;
    }

    const pdfBytes = fs.readFileSync(pdfPath);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
    totalMergedPages += pdfDoc.getPageCount();
    console.log(`  ✓ Added ${kt} (${pdfDoc.getPageCount()} pages)`);
  }

  const masterPdfPath = path.join(
    ROOT_DIR,
    'public',
    'pdfs',
    'eee_pupil_workbook_master_FINAL_V17.pdf',
  );
  const masterLegacyPath = path.join(ROOT_DIR, 'public', 'pdfs', 'eee_pupil_workbook_master.pdf');

  const mergedBytes = await mergedPdf.save();
  fs.writeFileSync(masterPdfPath, mergedBytes);
  fs.copyFileSync(masterPdfPath, masterLegacyPath);

  console.log(
    `🎉 Successfully compiled Master Pupil Workbook (${totalMergedPages} pages) -> ${masterPdfPath}\n`,
  );
}

// ============================================================================
// CLI RUNNER
// ============================================================================
if (require.main === module) {
  const target = (process.argv[2] || 'all').toUpperCase();

  (async () => {
    try {
      if (target === 'ALL') {
        for (const kt of ['KT1', 'KT2', 'KT3']) {
          await renderKeyTopicWorkbook(kt);
        }
        await mergeMasterWorkbook();
      } else if (target === 'MASTER') {
        await mergeMasterWorkbook();
      } else {
        await renderKeyTopicWorkbook(target);
      }
      console.log('\n🎉 All requested operations completed cleanly!');
      process.exit(0);
    } catch (err) {
      console.error('\n💥 Execution failed:', err);
      process.exit(1);
    }
  })();
}

module.exports = {
  buildEeeKeyTopicWorkbook,
  renderKeyTopicWorkbook,
  mergeMasterWorkbook,
  KEY_TOPICS_DATA,
};
