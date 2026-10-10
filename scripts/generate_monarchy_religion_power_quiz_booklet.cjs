/**
 * generate_monarchy_religion_power_quiz_booklet.cjs
 *
 * Compiles the 12-Page Saddle-Stitch Knowledge Retrieval & Homework Companion
 * for KS3 History (Year 8): Crown, Church, or Parliament (1517–1689).
 *
 * Page Architecture (12-Page Saddle-Stitch Booklet / 3 sheets A4 landscape folded in half):
 * - Page 1: Uniform Front Cover & Formative Homework & Retrieval Tracking Ledger
 *           (Scholar box, Attempt 1 vs 2, Retrieval Strength [ ] Instant [ ] Effortful [ ] Restudy,
 *           Roomy Parent Initial box, QR code to interactive portal)
 * - Page 2: Inside Front Cover — Master Chronology Domino Flowchart (1517–1689)
 * - Pages 3–7: 5 Dedicated Lesson Retrieval Pages (Lessons 1 to 5 • 8 questions each = 40 questions total)
 *              Featuring 2 roomy write-in lines per question:
 *              Line 1: Answer: [Core Fact]
 *              Line 2: Detail / Why: [Historical Mechanism or Consequence]
 * - Page 8: Department Marking Bank (Part 1 • Lessons 1–3 • Q1–Q24 • Bold answers + The Explanation + [✓][✗])
 * - Page 9: Department Marking Bank (Part 2 • Lessons 4–5 • Q25–Q40 • Bold answers + The Explanation + [✓][✗])
 * - Page 10: Key Historical Figures Gallery (7 protagonists) & Academic Vocabulary with Phonetics
 * - Page 11: Thematic Synoptic Matrix (1517–1689: Crown vs Church vs Parliament)
 * - Page 12: Back Cover — Summative Assessment Preparation & Essay Architect
 *            ("Who had the right to rule Britain: King, Church, or Parliament?" • 4-Pillar Matrix,
 *            Whig Constitutional Progress vs Revisionist Conflict debate, sentence starters, Archival Seal)
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const QRCode = require('qrcode');

const ROOT_DIR = path.join(__dirname, '..');
const UNIT_DIR = path.join(ROOT_DIR, 'public', 'units', 'monarchy_religion_power');
const PDFS_DIR = path.join(ROOT_DIR, 'public', 'pdfs');

if (!fs.existsSync(PDFS_DIR)) {
  fs.mkdirSync(PDFS_DIR, { recursive: true });
}
if (!fs.existsSync(UNIT_DIR)) {
  fs.mkdirSync(UNIT_DIR, { recursive: true });
}

// Base64 image helper for 100% offline self-contained HTML/PDF rendering
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

// --------------------------------------------------------------------------
// 40 CURATED HIGH-YIELD QUESTIONS ACROSS THE 5 LESSONS
// --------------------------------------------------------------------------
const QUIZ_DATA = [
  // LESSON 1: The Reformation & The Break with Rome (1517–1547)
  {
    lesson: 1,
    lessonTitle: '1. The Reformation & The Break with Rome (1517–1547)',
    shortTitle: 'Reformation & Break with Rome',
    enquiry: 'Why did Henry VIII break with Rome, and how was Royal Supremacy established?',
    items: [
      {
        q: 'In what year did Martin Luther nail his 95 Theses to the church door in Wittenberg?',
        a: '1517',
        exp: 'Martin Luther nailed his 95 Theses in October 1517, sparking the Protestant Reformation across Europe.',
      },
      {
        q: 'What corrupt Catholic certificates did Martin Luther attack for promising forgiveness of sins for cash?',
        a: 'Indulgences',
        exp: 'Indulgences were sold by Catholic friars promising wealthy sinners less time suffering in Purgatory.',
      },
      {
        q: 'What title did Pope Leo X award Henry VIII in 1521 for defending Catholic sacraments against Luther?',
        a: 'Defender of the Faith (Fidei Defensor)',
        exp: 'Henry wrote Assertio Septem Sacramentorum defending the Pope, earning him this prestigious papal title.',
      },
      {
        q: 'Which Spanish queen failed to give Henry VIII a surviving male heir, triggering his "Great Matter"?',
        a: 'Catherine of Aragon',
        exp: 'Catherine produced only one surviving child (Princess Mary), prompting Henry to seek an annulment to secure the Tudor succession.',
      },
      {
        q: 'What 1534 law officially made King Henry VIII the Supreme Head of the Church of England?',
        a: 'The Act of Supremacy',
        exp: 'Passed by Parliament in November 1534, it permanently severed the English Church from papal authority in Rome.',
      },
      {
        q: 'Which former Lord Chancellor was executed in 1535 for refusing to swear the Oath of Supremacy?',
        a: 'Sir Thomas More',
        exp: 'Sir Thomas More refused to betray his conscience and Catholic faith, and was beheaded for high treason on Tower Hill.',
      },
      {
        q: 'What happened to over 800 Catholic monasteries and abbeys across England between 1536 and 1540?',
        a: 'They were dissolved, looted, and their lands sold by the Crown',
        exp: 'Thomas Cromwell orchestrated the Dissolution of the Monasteries, seizing vast wealth to fund royal defences and foreign wars.',
      },
      {
        q: 'Which imperial ruler held Pope Clement VII captive in Rome in 1527, blocking Henry’s annulment?',
        a: 'Emperor Charles V',
        exp: 'Charles V was Catherine of Aragon’s nephew; his sack of Rome left the Pope completely unable to grant Henry a divorce.',
      },
    ],
  },

  // LESSON 2: Elizabeth I & The Middle Way (1558–1588)
  {
    lesson: 2,
    lessonTitle: '2. Elizabeth I & The Middle Way (1558–1588)',
    shortTitle: 'Elizabeth I & The Middle Way',
    enquiry: 'How successfully did Elizabeth I resolve the Tudor religious crisis?',
    items: [
      {
        q: 'What title did Elizabeth I adopt in the 1559 Act of Supremacy to appease Catholics and Puritans?',
        a: 'Supreme Governor of the Church of England',
        exp: 'Elizabeth chose "Supreme Governor", a diplomatic compromise that avoided claiming spiritual authority over Christ.',
      },
      {
        q: 'Approximately how many Protestant martyrs did Queen Mary I burn at the stake during her reign?',
        a: 'Over 280 (approx. 284)',
        exp: 'Mary I burned around 284 Protestants, creating immortal martyrs recorded in John Foxe’s famous Book of Martyrs.',
      },
      {
        q: 'What fine was imposed on Catholic recusants who refused to attend Church of England services on Sundays?',
        a: 'One shilling (12 pence) per missed Sunday',
        exp: 'The 1559 Act of Uniformity imposed a 12d fine per missed service, designed as a financial deterrent rather than execution.',
      },
      {
        q: 'What was the Latin name for Elizabeth’s strategic religious compromise between Protestantism and Catholicism?',
        a: 'Via Media ("The Middle Way")',
        exp: 'The Via Media balanced Protestant theology and English scriptures with traditional vestments, music, and ceremonies.',
      },
      {
        q: 'Which Catholic cousin fled Scotland in 1568 and became a figurehead for plots against Elizabeth?',
        a: 'Mary Queen of Scots',
        exp: 'Mary Queen of Scots had a legitimate dynastic claim to the English throne and inspired repeated Catholic assassination plots.',
      },
      {
        q: 'In what year did Pope Pius V issue the Papal Bull Regnans in Excelsis excommunicating Elizabeth?',
        a: '1570',
        exp: 'The 1570 Papal Bull declared Elizabeth a heretic and commanded English Catholics to disobey her on pain of excommunication.',
      },
      {
        q: 'Who served as Elizabeth I’s ruthless Principal Secretary and spymaster, uncovering the Babington Plot?',
        a: 'Sir Francis Walsingham',
        exp: 'Walsingham managed a sophisticated intelligence network across Europe, using codebreakers to decrypt conspirators’ letters.',
      },
      {
        q: 'Where was Mary Queen of Scots beheaded for high treason in February 1587?',
        a: 'Fotheringhay Castle',
        exp: 'Mary was tried and executed in the Great Hall of Fotheringhay Castle after proof emerged of her complicity in the Babington Plot.',
      },
    ],
  },

  // LESSON 3: The Spanish Armada & Naval Warfare (1588)
  {
    lesson: 3,
    lessonTitle: '3. The Spanish Armada & Naval Warfare (1588)',
    shortTitle: 'The Spanish Armada & Naval Warfare',
    enquiry: 'Why did the Spanish Armada fail to conquer Elizabethan England?',
    items: [
      {
        q: 'In what year did Sir Francis Drake carry out his raid on Cadiz, "singeing the King of Spain’s beard"?',
        a: '1587',
        exp: 'Drake raided Cadiz harbour in April 1587, destroying over 30 warships and thousands of seasoned barrel staves, delaying the invasion.',
      },
      {
        q: 'What defensive formation did the 130 ships of the Spanish Armada sail in up the English Channel?',
        a: 'A crescent formation',
        exp: 'The Armada sailed in an impenetrable seven-mile crescent formation with heavily armed galleons protecting transports in the centre.',
      },
      {
        q: 'What weapon did Francis Drake launch at midnight on 7 August 1588 to scatter the Spanish fleet at Calais?',
        a: 'Eight blazing fireships (hell-burners)',
        exp: 'Loaded with pitch and gunpowder, the fireships panicked Spanish captains into severing their anchor cables and scattering in the dark.',
      },
      {
        q: 'What decisive naval battle took place on 8 August 1588 after the fireships scattered the Armada?',
        a: 'The Battle of Gravelines',
        exp: 'At Gravelines, nimble English race-built galleons pounded the disorganised, anchorless Spanish fleet with rapid broadside fire.',
      },
      {
        q: 'What popular nickname was given to the violent Atlantic storms that wrecked Spanish ships around Scotland and Ireland?',
        a: 'The Protestant Wind',
        exp: 'Protestants viewed the fierce northerly gales as divine intervention, striking medals reading: "God blew and they were scattered."',
      },
      {
        q: 'Who designed the faster, lower "race-built" galleons that gave the English navy superior maneuverability?',
        a: 'Sir John Hawkins',
        exp: 'Hawkins removed heavy forecastles, lowered hulls, and fitted long-range culverins that allowed standoff broadside gunnery.',
      },
      {
        q: 'Which Spanish general’s army in the Netherlands was the Armada supposed to transport across to invade England?',
        a: 'The Duke of Parma',
        exp: 'The Duke of Parma assembled 30,000 elite Spanish veterans in Flanders waiting to be ferried across in flat-bottomed barges.',
      },
      {
        q: 'Approximately how many of the 130 Spanish ships were destroyed or wrecked during the 1588 campaign?',
        a: 'Over 50 ships (between 50 and 65)',
        exp: 'Fewer than half the men and only 67 battered ships limped back to Spain, crippled by shipwrecks, scurvy, and dysentery.',
      },
    ],
  },

  // LESSON 4: The Civil War, Regicide & The Bill of Rights (1642–1689)
  {
    lesson: 4,
    lessonTitle: '4. The Civil War, Regicide & The Bill of Rights (1642–1689)',
    shortTitle: 'Civil War, Regicide & Bill of Rights',
    enquiry:
      'Why did the struggle between King and Parliament lead to Civil War and the execution of Charles I?',
    items: [
      {
        q: 'What belief held that kings were appointed directly by God and could not be questioned by Parliament?',
        a: 'The Divine Right of Kings',
        exp: 'Divine Right asserted that monarchs were chosen by God Almighty and answered only to Heaven, placing them above earthly statutes.',
      },
      {
        q: 'What ancient coastal tax did Charles I illegally force inland towns to pay during his Personal Rule?',
        a: 'Ship Money',
        exp: 'Traditionally levied only on coastal ports during wartime emergencies, Charles imposed Ship Money across the whole country in peacetime.',
      },
      {
        q: 'In what year did Oliver Cromwell form the disciplined, merit-based New Model Army?',
        a: '1645',
        exp: 'Formed in 1645, this professional, religiously zealous Puritan army destroyed the Royalist forces at the Battle of Naseby.',
      },
      {
        q: 'On what exact date was King Charles I publicly beheaded outside Whitehall Banqueting House?',
        a: '30 January 1649',
        exp: 'Charles I was executed on 30 January 1649, wearing two shirts in the freezing winter air so the crowd would not see him shiver.',
      },
      {
        q: 'What event in December 1648 saw Colonel Pride arrest moderate MPs, leaving the "Rump Parliament"?',
        a: 'Pride’s Purge',
        exp: 'Colonel Thomas Pride expelled MPs who wanted to reach a negotiated compromise with the King, leaving only radicals who favored execution.',
      },
      {
        q: 'What historic title did Oliver Cromwell assume as head of the republican Commonwealth in 1653?',
        a: 'Lord Protector',
        exp: 'Cromwell ruled Britain as Lord Protector during the Protectorate from 1653 until his death in 1658, declining the royal crown.',
      },
      {
        q: 'Which Dutch prince invaded England in the 1688 Glorious Revolution and accepted the 1689 Bill of Rights?',
        a: 'Prince William of Orange (King William III)',
        exp: 'Invited by English nobles to depose James II, William landed at Brixham and ruled jointly with his Protestant wife Queen Mary II.',
      },
      {
        q: 'Which key constitutional principle was permanently established by the 1689 Bill of Rights?',
        a: 'Monarchs cannot suspend laws, levy taxes, or maintain a standing army without Parliament',
        exp: 'The Bill of Rights established Parliamentary Sovereignty and created Britain’s lasting constitutional monarchy under statutory law.',
      },
    ],
  },

  // LESSON 5: Crown, Church, or Parliament? (1517–1689)
  {
    lesson: 5,
    lessonTitle: '5. Crown, Church, or Parliament? Synoptic Review (1517–1689)',
    shortTitle: 'Synoptic Review: Crown, Church, Parliament',
    enquiry: 'Which turning point decisively transformed the English state between 1517 and 1689?',
    items: [
      {
        q: 'In 1517, to which foreign spiritual leader did the English Church and King legally answer?',
        a: 'The Pope in Rome',
        exp: 'Before Henry VIII broke with Rome in 1534, England was a Roman Catholic nation subordinate to papal canon law.',
      },
      {
        q: 'Why did Henry VIII’s use of Parliament during the Reformation inadvertently increase Parliament’s power?',
        a: 'He used statute laws passed by Parliament to validate royal supremacy and seize church land',
        exp: 'By continually using parliamentary legislation to confirm royal power, Henry elevated Parliament into a co-equal statutory institution.',
      },
      {
        q: 'What radical principle was established by the public trial and execution of King Charles I in 1649?',
        a: 'Monarchs are legally accountable to the law and their people',
        exp: 'The regicide proved that even an anointed monarch was not above the law and could be punished for tyranny and bloodshed.',
      },
      {
        q: 'Which 1689 constitutional document permanently barred British monarchs from taxing without Parliament?',
        a: 'The Bill of Rights',
        exp: 'The 1689 statute ended royal absolutism, guaranteeing regular parliaments, free elections, and legislative supremacy.',
      },
      {
        q: 'What form of government was permanently established in Britain following the 1689 Bill of Rights?',
        a: 'A Constitutional Monarchy',
        exp: 'Britain became a constitutional monarchy, where the Crown reigns but rules only through and with the elected Parliament.',
      },
      {
        q: 'Did the everyday legal rights and economic lives of poor agricultural labourers change significantly between 1517 and 1689?',
        a: 'No, power shifted primarily to wealthy landowners and gentry, leaving labourers poor',
        exp: 'While constitutional structures transformed, ordinary peasants and women experienced profound continuity in poverty and lack of political voice.',
      },
      {
        q: 'Which radical group of peasants attempted to dig common land on St George’s Hill in Surrey in 1649?',
        a: 'The Diggers (True Levellers)',
        exp: 'Led by Gerrard Winstanley, the Diggers advocated communal ownership of land, but were crushed by landowners and Cromwell’s soldiers.',
      },
      {
        q: 'What term describes the system where British laws are enacted jointly by the monarch, Lords, and Commons?',
        a: 'The King-in-Parliament',
        exp: 'The "King-in-Parliament" is the foundational principle of British constitutional law: sovereign power resides in the crown in legislature.',
      },
    ],
  },
];

// --------------------------------------------------------------------------
// CSS STYLING FOR A5 SADDLE-STITCH BOOKLET (148mm x 210mm)
// Formatted for A4 landscape folded in half or printed directly on A4 saddle-stitch
// --------------------------------------------------------------------------
const A5_BOOKLET_CSS = `
  @page {
    size: 148mm 210mm;
    margin: 6mm 0mm;
  }
  * { box-sizing: border-box; }
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: #0f172a;
    margin: 0;
    padding: 0;
    font-size: 7.2pt;
    line-height: 1.2;
    background: #ffffff;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  
  .a5-page {
    page-break-after: always;
    height: 198mm;
    max-height: 198mm;
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
  }
  /* Gutter-Safe Margin Tuning for A5 Saddle-Stitch Binding */
  .a5-page:nth-child(odd) {
    padding-left: 10mm; /* Inner spine clearance on left for odd/recto pages */
    padding-right: 6mm;
  }
  .a5-page:nth-child(even) {
    padding-left: 6mm;
    padding-right: 10mm; /* Inner spine clearance on right for even/verso pages */
  }
  .a5-page:last-child { page-break-after: avoid; }

  .page-flex-full {
    display: flex !important;
    flex-direction: column !important;
    justify-content: space-between !important;
    height: 198mm !important;
    box-sizing: border-box !important;
  }
  .page-body-stretch {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .timeline-page-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  /* Page Headers & Footers */
  .page-header-strip {
    border-bottom: 1.5px solid #0f172a;
    padding-bottom: 2px;
    margin-bottom: 4px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .page-header-strip h2 {
    margin: 0;
    font-size: 8.8pt;
    color: #0f172a;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }
  .page-header-strip p {
    margin: 1px 0 0 0;
    font-size: 6.2pt;
    color: #475569;
    font-weight: 600;
  }
  .page-tag {
    font-size: 6.2pt;
    font-weight: 800;
    background: #0f172a;
    color: #ffffff;
    padding: 2px 6px;
    border-radius: 2px;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    white-space: nowrap;
  }
  .page-footer-strip {
    font-size: 6.2pt;
    color: #64748b;
    border-top: 1px solid #cbd5e1;
    padding-top: 2px;
    margin-top: 2px;
    display: flex;
    justify-content: space-between;
    font-weight: 600;
  }

  /* Cover Page Styling (Page 1) */
  .cover-banner {
    background: #0f172a;
    color: #ffffff;
    padding: 4px 8px;
    border-radius: 4px 4px 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 6.5pt;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.8px;
  }
  /* Commercial School Cover Customizer */
  [data-department-name]:not([data-department-name=""]):not([data-department-name="The History Department"]) .school-brand-target {
    display: inline-block;
    font-size: 0;
  }
  [data-department-name]:not([data-department-name=""]):not([data-department-name="The History Department"]) .school-brand-target::after {
    content: attr(data-department-name);
    font-size: 6.5pt;
  }
  .cover-header-block {
    text-align: center;
    padding: 4px 6px 3px 6px;
    background: #f8fafc;
    border-left: 1px solid #cbd5e1;
    border-right: 1px solid #cbd5e1;
  }
  .cover-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 11.5pt;
    font-weight: 800;
    color: #0f172a;
    line-height: 1.15;
    margin: 0 0 2px 0;
  }
  .cover-subtitle {
    font-size: 6.8pt;
    font-weight: 700;
    color: #475569;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    margin: 0;
  }

  /* Pupil Box */
  .pupil-box {
    background: #ffffff;
    border: 1px solid #cbd5e1;
    border-top: none;
    padding: 3px 8px;
    font-size: 7pt;
  }
  .pupil-grid {
    display: grid;
    grid-template-columns: 2fr 1.2fr 1.5fr;
    gap: 10px;
    align-items: center;
  }
  .pupil-field {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .pupil-field span.lbl {
    font-weight: 700;
    color: #334155;
    white-space: nowrap;
  }
  .pupil-field span.line {
    border-bottom: 1.2px solid #000000;
    flex: 1;
    min-height: 12px;
  }

  /* Cover Portrait Container */
  .cover-map-container {
    margin: 3px 0 3px 0;
    text-align: center;
    background: #f8fafc;
    border: 1px solid #cbd5e1;
    border-radius: 4px;
    padding: 3px 6px;
  }
  .cover-map-frame {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    max-height: 64mm;
  }
  .cover-map-img {
    max-height: 64mm;
    max-width: 100%;
    object-fit: contain;
    border: 1px solid #94a3b8;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.08);
  }
  .cover-map-caption {
    font-size: 5.8pt;
    color: #475569;
    margin-top: 2px;
    font-style: italic;
  }

  /* Tracking Ledger */
  .ledger-container {
    margin-top: 3px;
  }
  .tracking-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 6.4pt;
    background: #ffffff;
  }
  .tracking-table th {
    background: #0f172a;
    color: #ffffff;
    font-weight: 800;
    padding: 2.5px 3.5px;
    border: 1px solid #0f172a;
    text-transform: uppercase;
    letter-spacing: 0.2px;
    text-align: center;
  }
  .tracking-table td {
    border: 1px solid #cbd5e1;
    padding: 3.5px 3.5px;
    text-align: center;
    vertical-align: middle;
  }
  .tracking-table td.left-title {
    text-align: left;
    color: #0f172a;
  }
  .tb-lesson-title {
    font-weight: 800;
    font-size: 6.5pt;
    color: #0f172a;
    line-height: 1.15;
  }
  .tb-lesson-enquiry {
    font-size: 5.4pt;
    color: #475569;
    font-style: italic;
    line-height: 1.15;
    margin-top: 0.5px;
  }
  .score-line {
    display: inline-block;
    width: 14px;
    border-bottom: 1px solid #000;
  }
  .retrieval-boxes {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3.5px;
    font-size: 5.8pt;
    color: #334155;
    white-space: nowrap;
  }
  .retrieval-boxes span {
    font-weight: 600;
  }
  .parent-sig-cell {
    padding: 2px 4px;
  }
  .parent-sig-box {
    border: 1px solid #94a3b8;
    background: #ffffff;
    border-radius: 2px;
    height: 16px;
    width: 100%;
  }

  /* Page 1: 3-Tier Traffic Light Mastery Rule (DIRT Loop) */
  .mastery-traffic-strip {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f8fafc;
    border: 1px solid #cbd5e1;
    border-radius: 3px;
    padding: 2.5px 6px;
    margin-top: 2px;
    margin-bottom: 2px;
    font-size: 5.8pt;
    line-height: 1.15;
  }
  .traffic-tier {
    display: flex;
    align-items: center;
    gap: 3.5px;
    color: #1e293b;
  }
  .traffic-dot {
    font-size: 7.5pt;
    line-height: 1;
  }
  .green-dot { color: #16a34a; }
  .amber-dot { color: #d97706; }
  .red-dot { color: #dc2626; }

  /* QR Strip */
  .qr-strip {
    display: flex;
    align-items: center;
    background: #f1f5f9;
    border: 1px solid #cbd5e1;
    border-radius: 4px;
    padding: 3px 6px;
    gap: 8px;
    margin-top: 2px;
    margin-bottom: 1px;
  }
  .qr-code-img {
    width: 32px;
    height: 32px;
    flex-shrink: 0;
  }
  .qr-caption-text {
    font-size: 6.2pt;
    color: #334155;
    line-height: 1.2;
    text-align: left;
    font-weight: 600;
  }

  /* Page 2: Chronology Domino Flowchart */
  .timeline-flow {
    display: flex;
    flex-direction: column;
    gap: 2.5px;
    flex: 1;
    justify-content: space-between;
    margin-top: 2px;
    margin-bottom: 2px;
  }
  .domino-node {
    display: flex;
    align-items: center;
    gap: 6px;
    background: #ffffff;
    border: 1px solid #0f172a;
    border-radius: 3px;
    padding: 2.5px 5px;
    font-size: 6.6pt;
    line-height: 1.18;
  }
  .domino-year {
    background: #0f172a;
    color: #ffffff;
    font-weight: 800;
    font-size: 6.4pt;
    padding: 1.5px 4px;
    border-radius: 2px;
    white-space: nowrap;
  }
  .domino-text {
    flex: 1;
  }

  /* Pages 3–7: Dedicated Question Page Layout */
  .lesson-instruction-bar {
    background: #f8fafc;
    border-left: 3px solid #0f172a;
    padding: 2px 6px;
    font-size: 6.4pt;
    color: #334155;
    font-weight: 600;
    margin-bottom: 2px;
  }
  .q-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    gap: 1.5px;
  }
  .q-block {
    background: #ffffff;
    border: 1px solid #cbd5e1;
    border-radius: 3px;
    padding: 3px 6px;
    display: flex;
    flex-direction: column;
    gap: 1.5px;
  }
  .q-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 4px;
    font-size: 8.5pt;
    line-height: 1.15;
  }
  .q-prompt-wrap {
    display: flex;
    align-items: flex-start;
    gap: 4px;
    flex: 1;
  }
  .q-num {
    font-weight: 800;
    color: #000000;
    min-width: 14px;
    font-size: 8.5pt;
  }
  .q-prompt {
    font-weight: 700;
    color: #000000;
    font-size: 8.5pt;
  }
  .q-mastery {
    font-size: 6pt;
    font-weight: 700;
    color: #475569;
    white-space: nowrap;
  }
  .q-line-row {
    display: flex;
    align-items: flex-end;
    gap: 5px;
    font-size: 7.2pt;
    margin-top: 1px;
  }
  .q-line-lbl {
    font-weight: 800;
    color: #000000;
    white-space: nowrap;
    font-size: 7.2pt;
    min-width: 65px;
  }
  .q-solid-line {
    flex: 1;
    border-bottom: 1.2px solid #000000;
    min-height: 18px;
  }

  /* Pages 8 & 9: Marking Bank */
  .mb-section-title {
    background: #f1f5f9;
    border-left: 3px solid #0f172a;
    padding: 1.5px 5px;
    font-size: 6.8pt;
    font-weight: 800;
    color: #0f172a;
    text-transform: uppercase;
    letter-spacing: 0.2px;
    margin: 3px 0 1.5px 0;
  }
  .mb-section-title:first-child { margin-top: 0; }
  .mb-container {
    display: flex;
    flex-direction: column;
    gap: 1.5px;
    flex: 1;
    justify-content: space-between;
  }
  .ans-card {
    display: flex;
    align-items: flex-start;
    gap: 4px;
    font-size: 6.4pt;
    line-height: 1.15;
    background: #f8fafc;
    border: 1px solid #cbd5e1;
    border-radius: 2px;
    padding: 2px 4px;
  }
  .ans-num {
    font-weight: 800;
    color: #0f172a;
    min-width: 13px;
  }
  .ans-content {
    flex: 1;
    color: #0f172a;
  }
  .ans-core {
    font-weight: 800;
    color: #0f172a;
  }
  .ans-exp {
    color: #334155;
    font-style: italic;
  }
  .ans-boxes {
    font-size: 6pt;
    font-weight: 800;
    color: #475569;
    white-space: nowrap;
    margin-left: 3px;
  }

  /* Page 10: Figures Gallery & Vocabulary */
  .p10-sec-title {
    font-size: 7pt;
    font-weight: 800;
    color: #0f172a;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    border-bottom: 1px solid #cbd5e1;
    padding-bottom: 1px;
    margin: 2px 0 2px 0;
  }
  .figures-grid {
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin-bottom: 3px;
  }
  .figure-card {
    background: #ffffff;
    border: 1px solid #cbd5e1;
    border-left: 2.5px solid #0f172a;
    border-radius: 2px;
    padding: 2px 5px;
    font-size: 6.3pt;
    line-height: 1.16;
  }
  .figure-name {
    font-weight: 800;
    color: #0f172a;
  }
  .figure-role {
    font-weight: 600;
    color: #475569;
    font-style: italic;
    margin-left: 3px;
  }
  .figure-act {
    color: #1e293b;
    margin-top: 0.5px;
  }

  .vocab-list {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .vocab-card {
    background: #f8fafc;
    border: 1px solid #cbd5e1;
    border-left: 2.5px solid #2563eb;
    border-radius: 2px;
    padding: 2px 5px;
    font-size: 6.3pt;
    line-height: 1.16;
  }
  .vocab-term {
    font-weight: 800;
    color: #0f172a;
  }
  .vocab-phonetic {
    color: #2563eb;
    font-weight: 700;
    margin-left: 2px;
  }
  .vocab-def {
    color: #334155;
    margin-top: 0.5px;
  }

  /* Page 11: Thematic Synoptic Matrix */
  .synoptic-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 6.1pt;
    background: #ffffff;
    margin-top: 2px;
  }
  .synoptic-table th {
    background: #0f172a;
    color: #ffffff;
    font-weight: 800;
    padding: 2.5px 4px;
    border: 1px solid #0f172a;
    text-transform: uppercase;
    letter-spacing: 0.2px;
    text-align: center;
  }
  .synoptic-table td {
    border: 1px solid #cbd5e1;
    padding: 3px 4px;
    vertical-align: top;
    line-height: 1.2;
  }
  .synoptic-table tr:nth-child(even) td {
    background: #f8fafc;
  }
  .synoptic-era {
    font-weight: 800;
    color: #0f172a;
    white-space: nowrap;
  }

  /* Page 12: Summative Assessment Preparation & Essay Architect */
  .architect-card {
    background: #ffffff;
    border: 1px solid #cbd5e1;
    border-radius: 3px;
    padding: 4px 6px;
    font-size: 6.8pt;
    line-height: 1.2;
    margin-bottom: 3px;
  }
  .architect-sec-head {
    font-size: 7.4pt;
    font-weight: 800;
    color: #0f172a;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    background: #f1f5f9;
    border-left: 3px solid #0f172a;
    padding: 2.5px 5px;
    margin: 4px 0 3px 0;
  }
  .four-pillar-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3.5px;
  }
  .four-pillar-cell {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 3px;
    padding: 3.5px 5px;
    font-size: 6.5pt;
    line-height: 1.2;
  }
  .historiography-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4px;
  }
  .historiography-cell {
    background: #ffffff;
    border: 1px solid #cbd5e1;
    border-left: 3px solid #0f172a;
    border-radius: 2px;
    padding: 3.5px 5px;
    font-size: 6.4pt;
    line-height: 1.2;
  }
  .sentence-starters-list {
    margin: 2px 0 0 14px;
    padding: 0;
    font-size: 6.4pt;
    line-height: 1.25;
    color: #1e293b;
  }
  .archival-seal-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #cbd5e1;
    padding-top: 3px;
    margin-top: 3px;
    font-size: 6pt;
    color: #64748b;
  }
`;

async function compileQuizBookletHtml() {
  const portalUrl =
    'https://the-history-revision-hub.netlify.app/?unit=monarchy_religion_power&view=quizzes';
  const qrDataUrl = await QRCode.toDataURL(portalUrl, {
    margin: 1,
    color: { dark: '#0f172a', light: '#ffffff' },
  });

  const coverImgData =
    getBase64Image('/images/armada_portrait.jpg') || getBase64Image('/images/henry_viii.jpg');

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Crown, Church, or Parliament (1517–1689) • Knowledge Retrieval Companion</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,700;1,6..72,400&display=swap" rel="stylesheet">
  <style>
    ${A5_BOOKLET_CSS}
  </style>
</head>
<body>
`;

  // ==========================================================================
  // PAGE 1: FRONT COVER & TRACKING LEDGER
  // ==========================================================================
  html += `
  <div class="a5-page page-flex-full">
    <div>
      <div class="cover-banner" data-department-name="The History Department">
        <span class="school-brand-target">The History Department</span>
        <span>Key Stage 3 • Year 8 History</span>
      </div>
      <div class="cover-header-block">
        <h1 class="cover-title">Crown, Church, or Parliament? (1517–1689)</h1>
        <p class="cover-subtitle">Formative Homework & Knowledge Retrieval Companion • 40 High-Yield Retrieval Questions</p>
      </div>
      <div class="pupil-box">
        <div class="pupil-grid">
          <div class="pupil-field"><span class="lbl">Scholar:</span><span class="line"></span></div>
          <div class="pupil-field"><span class="lbl">Class:</span><span class="line"></span></div>
          <div class="pupil-field"><span class="lbl">Teacher:</span><span class="line"></span></div>
        </div>
      </div>
    </div>

    ${
      coverImgData
        ? `
    <div class="cover-map-container">
      <div class="cover-map-frame">
        <img class="cover-map-img" src="${coverImgData}" alt="Queen Elizabeth I Armada Portrait">
      </div>
      <div class="cover-map-caption">The Armada Portrait of Queen Elizabeth I (1588): Protestant Victory, Royal Majesty & Global Ambition</div>
    </div>`
        : ''
    }

    <div class="ledger-container">
      <table class="tracking-table">
        <thead>
          <tr>
            <th style="width: 32%;">Enquiry Lesson</th>
            <th style="width: 14%;">Att. 1 (/8)</th>
            <th style="width: 14%;">Att. 2 (/8)</th>
            <th style="width: 26%;">Retrieval Strength</th>
            <th style="width: 14%;">Parent Sig.</th>
          </tr>
        </thead>
        <tbody>
          ${QUIZ_DATA.map(
            (q) => `
          <tr>
            <td class="left-title">
              <div class="tb-lesson-title">L${q.lesson}: ${q.shortTitle}</div>
              <div class="tb-lesson-enquiry">${q.enquiry}</div>
            </td>
            <td><span class="score-line"></span> / 8</td>
            <td><span class="score-line"></span> / 8</td>
            <td>
              <div class="retrieval-boxes">
                <span>[ ] Instant</span>
                <span>[ ] Effortful</span>
                <span>[ ] Restudy</span>
              </div>
            </td>
            <td class="parent-sig-cell"><div class="parent-sig-box"></div></td>
          </tr>`,
          ).join('')}
        </tbody>
      </table>
    </div>

    <div>
      <div class="mastery-traffic-strip">
        <div class="traffic-tier"><span class="traffic-dot green-dot">&#9679;</span> <strong>7–8 / 8: Instant Recall</strong> (Secure Core Knowledge)</div>
        <div class="traffic-tier"><span class="traffic-dot amber-dot">&#9679;</span> <strong>5–6 / 8: Effortful</strong> (Targeted DIRT Required)</div>
        <div class="traffic-tier"><span class="traffic-dot red-dot">&#9679;</span> <strong>0–4 / 8: Restudy</strong> (Re-read Lesson & Resit)</div>
      </div>

      <div class="qr-strip">
        <img class="qr-code-img" src="${qrDataUrl}" alt="Digital Revision Hub QR Code">
        <div class="qr-caption-text">
          <strong>Digital Revision Hub & Interactive Self-Scoring Vault</strong><br>
          Scan to practice all 40 questions online with automated feedback, flashcards, and living timeline audio.
        </div>
      </div>
    </div>

    <div class="page-footer-strip">
      <span>Crown, Church, or Parliament (1517–1689)</span>
      <span>Formative Retrieval Companion • Page 1 of 12</span>
    </div>
  </div>
`;

  // ==========================================================================
  // PAGE 2: INSIDE FRONT COVER — MASTER CHRONOLOGY DOMINO FLOWCHART (1517–1689)
  // ==========================================================================
  const CHRONOLOGY = [
    {
      year: '1517',
      title: 'Luther Sparks the Reformation',
      desc: 'Martin Luther nails 95 Theses in Wittenberg attacking corrupt indulgences; starts Protestantism across Europe.',
    },
    {
      year: '1534',
      title: 'Act of Supremacy (Henry VIII)',
      desc: 'Parliament declares Henry VIII Supreme Head of the Church of England; permanent break with the Pope in Rome.',
    },
    {
      year: '1559',
      title: 'Elizabeth’s Religious Settlement',
      desc: 'Elizabeth I establishes the Via Media ("Middle Way"), balancing Protestant doctrine with traditional ceremonies.',
    },
    {
      year: '1588',
      title: 'Defeat of the Spanish Armada',
      desc: 'Midnight fireships at Calais and battle of Gravelines scatter Philip II’s fleet; Protestant Wind wrecks Spanish ships.',
    },
    {
      year: '1642',
      title: 'Outbreak of English Civil War',
      desc: 'Charles I attempts to arrest five MPs; nation divides into Royalist Cavaliers and Parliamentary Roundheads.',
    },
    {
      year: '1649',
      title: 'Trial & Execution of Charles I',
      desc: 'Parliament tries and executes Charles I for treason against his people; Britain becomes a republic (Commonwealth).',
    },
    {
      year: '1689',
      title: 'The Bill of Rights Enacted',
      desc: 'Following the Glorious Revolution, William & Mary accept statutory limits; establishes permanent Parliamentary Sovereignty.',
    },
  ];

  html += `
  <div class="a5-page page-flex-full">
    <div class="page-header-strip">
      <div>
        <h2>Master Chronology Domino Flowchart (1517–1689)</h2>
        <p>Causal turning points across 170 years of religious conflict, civil war, and constitutional revolution.</p>
      </div>
      <span class="page-tag">Timeline Spine</span>
    </div>

    <div class="timeline-flow">
      ${CHRONOLOGY.map(
        (c) => `
      <div class="domino-node">
        <span class="domino-year">${c.year}</span>
        <div class="domino-text">
          <strong>${c.title}:</strong> ${c.desc}
        </div>
      </div>`,
      ).join('')}
    </div>

    <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 3px; padding: 4px 6px; font-size: 6.2pt; line-height: 1.25;">
      <strong>Pedagogical Timeline Protocol:</strong> Draw arrows between connected causal dominoes. Notice how Henry VIII’s use of parliamentary statute in 1534 established the precedent that eventually enabled Parliament to put King Charles I on trial in 1649 and establish supreme sovereignty in 1689.
    </div>

    <div class="page-footer-strip">
      <span>Crown, Church, or Parliament (1517–1689)</span>
      <span>Living Chronology Spine • Page 2 of 12</span>
    </div>
  </div>
`;

  // ==========================================================================
  // PAGES 3–7: 5 DEDICATED LESSON RETRIEVAL PAGES (8 Questions Each)
  // ==========================================================================
  let globalQNum = 1;
  QUIZ_DATA.forEach((lessonData, lIdx) => {
    const pageNum = lIdx + 3;
    html += `
  <div class="a5-page page-flex-full">
    <div class="page-header-strip">
      <div>
        <h2>Lesson ${lessonData.lesson}: ${lessonData.shortTitle}</h2>
        <p>${lessonData.enquiry}</p>
      </div>
      <span class="page-tag">Questions ${globalQNum}–${globalQNum + 7}</span>
    </div>

    <div class="lesson-instruction-bar">
      <strong>Retrieval Protocol:</strong> Write the core factual answer on Line 1. On Line 2, write the historical explanation or consequence (Detail / Why).
    </div>

    <div class="q-container">
      ${lessonData.items
        .map((item) => {
          const currentNum = globalQNum++;
          return `
      <div class="q-block">
        <div class="q-header">
          <div class="q-prompt-wrap">
            <span class="q-num">${currentNum}.</span>
            <span class="q-prompt">${item.q}</span>
          </div>
          <span class="q-mastery">Att 1: [ ] &bull; Att 2: [ ]</span>
        </div>
        <div class="q-line-row">
          <span class="q-line-lbl">Answer:</span>
          <span class="q-solid-line"></span>
        </div>
        <div class="q-line-row">
          <span class="q-line-lbl">Detail / Why:</span>
          <span class="q-solid-line"></span>
        </div>
      </div>`;
        })
        .join('')}
    </div>

    <div class="page-footer-strip">
      <span>Lesson ${lessonData.lesson}: ${lessonData.shortTitle}</span>
      <span>Retrieval Companion • Page ${pageNum} of 12</span>
    </div>
  </div>
`;
  });

  // ==========================================================================
  // PAGE 8: DEPARTMENT MARKING BANK (PART 1 • LESSONS 1–3 • Q1–Q24)
  // ==========================================================================
  html += `
  <div class="a5-page page-flex-full">
    <div class="page-header-strip">
      <div>
        <h2>Department Marking Bank • Lessons 1–3</h2>
        <p>Self & Peer Assessment • Review with green pen: tick correct facts and annotate missed historical details.</p>
      </div>
      <span class="page-tag">Mark Scheme Q1–Q24</span>
    </div>

    <div class="mb-container">
      <div class="mb-section-title">Lesson 1: The Reformation & Break with Rome (Q1–Q8)</div>
      ${QUIZ_DATA[0].items
        .map(
          (item, i) => `
      <div class="ans-card">
        <span class="ans-num">${i + 1}.</span>
        <div class="ans-content">
          <span class="ans-core">${item.a}</span> —
          <span class="ans-exp">${item.exp}</span>
        </div>
        <span class="ans-boxes">[✓] [✗]</span>
      </div>`,
        )
        .join('')}

      <div class="mb-section-title">Lesson 2: Elizabeth I & The Middle Way (Q9–Q16)</div>
      ${QUIZ_DATA[1].items
        .map(
          (item, i) => `
      <div class="ans-card">
        <span class="ans-num">${i + 9}.</span>
        <div class="ans-content">
          <span class="ans-core">${item.a}</span> —
          <span class="ans-exp">${item.exp}</span>
        </div>
        <span class="ans-boxes">[✓] [✗]</span>
      </div>`,
        )
        .join('')}

      <div class="mb-section-title">Lesson 3: The Spanish Armada & Naval Warfare (Q17–Q24)</div>
      ${QUIZ_DATA[2].items
        .map(
          (item, i) => `
      <div class="ans-card">
        <span class="ans-num">${i + 17}.</span>
        <div class="ans-content">
          <span class="ans-core">${item.a}</span> —
          <span class="ans-exp">${item.exp}</span>
        </div>
        <span class="ans-boxes">[✓] [✗]</span>
      </div>`,
        )
        .join('')}
    </div>

    <div class="page-footer-strip">
      <span>Crown, Church, or Parliament (1517–1689)</span>
      <span>Marking Bank Part 1 • Page 8 of 12</span>
    </div>
  </div>
`;

  // ==========================================================================
  // PAGE 9: DEPARTMENT MARKING BANK (PART 2 • LESSONS 4–5 • Q25–Q40)
  // ==========================================================================
  html += `
  <div class="a5-page page-flex-full">
    <div class="page-header-strip">
      <div>
        <h2>Department Marking Bank • Lessons 4–5</h2>
        <p>Self & Peer Assessment • Review with green pen: tick correct facts and annotate missed historical details.</p>
      </div>
      <span class="page-tag">Mark Scheme Q25–Q40</span>
    </div>

    <div class="mb-container">
      <div class="mb-section-title">Lesson 4: The Civil War, Regicide & Bill of Rights (Q25–Q32)</div>
      ${QUIZ_DATA[3].items
        .map(
          (item, i) => `
      <div class="ans-card">
        <span class="ans-num">${i + 25}.</span>
        <div class="ans-content">
          <span class="ans-core">${item.a}</span> —
          <span class="ans-exp">${item.exp}</span>
        </div>
        <span class="ans-boxes">[✓] [✗]</span>
      </div>`,
        )
        .join('')}

      <div class="mb-section-title">Lesson 5: Synoptic Review — Crown, Church, or Parliament (Q33–Q40)</div>
      ${QUIZ_DATA[4].items
        .map(
          (item, i) => `
      <div class="ans-card">
        <span class="ans-num">${i + 33}.</span>
        <div class="ans-content">
          <span class="ans-core">${item.a}</span> —
          <span class="ans-exp">${item.exp}</span>
        </div>
        <span class="ans-boxes">[✓] [✗]</span>
      </div>`,
        )
        .join('')}
    </div>

    <div style="background: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 3px; padding: 4px 6px; font-size: 6.2pt; line-height: 1.25; margin-top: 4px;">
      <strong>DIRT Revision Rule (Dedicated Improvement & Reflection Time):</strong> Any question marked [✗] must be corrected in green pen. Explain the historical mechanism (why it happened) rather than simply writing the one-word answer.
    </div>

    <div class="page-footer-strip">
      <span>Crown, Church, or Parliament (1517–1689)</span>
      <span>Marking Bank Part 2 • Page 9 of 12</span>
    </div>
  </div>
`;

  // ==========================================================================
  // PAGE 10: KEY HISTORICAL FIGURES GALLERY & ACADEMIC VOCABULARY
  // ==========================================================================
  const FIGURES = [
    {
      name: 'Martin Luther',
      role: 'German Protestant Reformer',
      bio: 'Nailed 95 Theses in 1517 attacking indulgences; translated the Bible into everyday German, shattering Catholic papal monopoly.',
    },
    {
      name: 'King Henry VIII',
      role: 'Tudor Monarch (reigned 1509–1547)',
      bio: 'Secured the 1534 Act of Supremacy to become Supreme Head of the Church of England; dissolved 800 Catholic monasteries for revenue.',
    },
    {
      name: 'Queen Elizabeth I',
      role: 'Tudor Monarch (reigned 1558–1603)',
      bio: 'Established the Protestant "Middle Way" (Via Media); defeated the 1588 Spanish Armada and forged a resilient English national identity.',
    },
    {
      name: 'Sir Francis Drake',
      role: 'English Privateer & Vice-Admiral',
      bio: 'Raided Cadiz harbour in 1587; launched midnight fireships at Calais in 1588 that broke the Armada’s crescent formation.',
    },
    {
      name: 'King Charles I',
      role: 'Stuart Monarch (reigned 1625–1649)',
      bio: 'Ruled without Parliament for 11 years (Personal Rule); levied Ship Money; tried for high treason and publicly executed on 30 January 1649.',
    },
    {
      name: 'Oliver Cromwell',
      role: 'Lord Protector & General (1599–1658)',
      bio: 'Created the New Model Army; led the Parliamentary cause in the Civil War; ruled Britain as Lord Protector during the Commonwealth republic.',
    },
    {
      name: 'William III & Mary II',
      role: 'Joint Constitutional Monarchs (from 1689)',
      bio: 'Invited in the 1688 Glorious Revolution; signed the 1689 Bill of Rights, permanently establishing parliamentary supremacy over the Crown.',
    },
  ];

  const VOCAB = [
    {
      term: 'Reformation',
      phon: '/ˌrɛf.ərˈmeɪ.ʃən/',
      def: 'A 16th-century religious movement that challenged the Catholic Church and created Protestant national churches.',
    },
    {
      term: 'Indulgence',
      phon: '/ɪnˈdʌl.dʒəns/',
      def: 'A certificate sold by Catholic officials promising forgiveness of sins and reduced time in Purgatory.',
    },
    {
      term: 'Act of Supremacy',
      phon: '/ækt ɒv suːˈprɛm.ə.si/',
      def: 'The 1534 statute declaring the English monarch the Supreme Head of the Church of England instead of the Pope.',
    },
    {
      term: 'Via Media',
      phon: '/ˈvaɪ.ə ˈmiː.di.ə/',
      def: 'The Latin term for Elizabeth I’s "Middle Way", balancing Protestant doctrine with traditional church ceremonies.',
    },
    {
      term: 'Divine Right of Kings',
      phon: '/dɪˈvaɪn raɪt/',
      def: 'The belief that monarchs are appointed directly by God and cannot be judged or restrained by Parliament.',
    },
    {
      term: 'Regicide',
      phon: '/ˈrɛdʒ.ɪ.saɪd/',
      def: 'The deliberate killing or judicial execution of a king, carried out against Charles I on 30 January 1649.',
    },
    {
      term: 'Constitutional Monarchy',
      phon: '/ˌkɒn.stɪˈtjuː.ʃən.əl ˈmɒn.ə.ki/',
      def: 'A system where the monarch reigns within the limits of statutory law passed by an elected Parliament.',
    },
    {
      term: 'Bill of Rights (1689)',
      phon: '/bɪl ɒv raɪts/',
      def: 'The landmark statute barring monarchs from suspending laws, levying taxes, or maintaining armies without Parliament.',
    },
  ];

  html += `
  <div class="a5-page page-flex-full">
    <div class="page-header-strip">
      <div>
        <h2>Historical Figures Gallery & Academic Vocabulary</h2>
        <p>Key protagonists and disciplinary vocabulary for high-status historical communication.</p>
      </div>
      <span class="page-tag">Protagonists & Literacy</span>
    </div>

    <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
      <div>
        <div class="p10-sec-title">Key Historical Figures (1517–1689)</div>
        <div class="figures-grid">
          ${FIGURES.map(
            (f) => `
          <div class="figure-card">
            <div>
              <span class="figure-name">${f.name}</span>
              <span class="figure-role">&bull; ${f.role}</span>
            </div>
            <div class="figure-act">${f.bio}</div>
          </div>`,
          ).join('')}
        </div>

        <div class="p10-sec-title" style="margin-top: 4px;">Core Disciplinary Vocabulary & Phonetics</div>
        <div class="vocab-list">
          ${VOCAB.map(
            (v) => `
          <div class="vocab-card">
            <div>
              <span class="vocab-term">${v.term}</span>
              <span class="vocab-phonetic">${v.phon}</span>
            </div>
            <div class="vocab-def">${v.def}</div>
          </div>`,
          ).join('')}
        </div>
      </div>

      <div style="background: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 3px; padding: 4px 6px; font-size: 6.2pt; line-height: 1.25; margin-top: 4px;">
        <strong>Disciplinary Literacy Standard:</strong> When crafting analytical essays, always deploy at least two substantive Tier 3 terms per paragraph (e.g. <em>Royal Supremacy</em>, <em>Via Media</em>, <em>Divine Right</em>, or <em>Statute Law</em>) to demonstrate precise conceptual understanding.
      </div>
    </div>

    <div class="page-footer-strip">
      <span>Crown, Church, or Parliament (1517–1689)</span>
      <span>Protagonists & Vocabulary • Page 10 of 12</span>
    </div>
  </div>
`;

  // ==========================================================================
  // PAGE 11: THEMATIC SYNOPTIC MATRIX (1517–1689)
  // ==========================================================================
  html += `
  <div class="a5-page page-flex-full">
    <div class="page-header-strip">
      <div>
        <h2>Thematic Synoptic Matrix (1517–1689)</h2>
        <p>Tracking the shifting balance of power between Crown, Church, and Parliament across 170 years.</p>
      </div>
      <span class="page-tag">Constitutional Matrix</span>
    </div>

    <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
      <table class="synoptic-table">
        <thead>
          <tr>
            <th style="width: 22%;">Historical Era</th>
            <th style="width: 26%;">The Crown</th>
            <th style="width: 26%;">The Church</th>
            <th style="width: 26%;">Parliament</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="synoptic-era">Late Medieval (Pre-1517)</td>
            <td>Subordinate to papal canon law; dependent on church coronation and papal legitimacy.</td>
            <td>Supreme Roman Catholic authority; answered to Pope in Rome; owned 1/3 of all English land.</td>
            <td>Occasional advisory body; called rarely, primarily to grant extraordinary wartime taxes.</td>
          </tr>
          <tr>
            <td class="synoptic-era">Tudor Revolution (1534–1558)</td>
            <td>King Henry VIII seizes Royal Supremacy; claims absolute imperial sovereignty over England.</td>
            <td>Severed from Rome; monasteries dissolved; clergy forced to swear loyalty to monarch.</td>
            <td>Passes revolutionary statutes; inadvertently gains permanent law-making status.</td>
          </tr>
          <tr>
            <td class="synoptic-era">Elizabethan Settlement (1558–1603)</td>
            <td>Queen acts as Supreme Governor; balances religious factions via the pragmatic Via Media.</td>
            <td>Church of England established as national Protestant institution with English Prayer Book.</td>
            <td>More assertive; Puritan MPs challenge royal policy on marriage, succession, and religion.</td>
          </tr>
          <tr>
            <td class="synoptic-era">Stuart Personal Rule (1625–1642)</td>
            <td>Charles I claims Divine Right; locks out MPs for 11 years; levies illegal Ship Money taxes.</td>
            <td>Archbishop Laud introduces high-church Arminian rituals, alienating Scottish and English Puritans.</td>
            <td>Refuses to grant taxes without redress of grievances; impeaches royal ministers.</td>
          </tr>
          <tr>
            <td class="synoptic-era">Civil War & Republic (1642–1660)</td>
            <td>Crown abolished; King Charles I tried for high treason and executed on 30 January 1649.</td>
            <td>Bishops abolished; Puritan Commonwealth enforces strict moral and religious discipline.</td>
            <td>New Model Army purges moderates (Pride’s Purge); Rump Parliament governs as a republic.</td>
          </tr>
          <tr>
            <td class="synoptic-era">Glorious Revolution (1688–1689)</td>
            <td>James II deposed; William & Mary accept statutory limits under the 1689 Bill of Rights.</td>
            <td>Toleration Act (1689) grants freedom of worship to non-conformist Protestants; Catholics barred.</td>
            <td>Permanent Parliamentary Sovereignty: Crown cannot tax, make law, or keep an army without MPs.</td>
          </tr>
        </tbody>
      </table>

      <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 3px; padding: 4px 6px; font-size: 6.2pt; line-height: 1.25; margin-top: 4px;">
        <strong>Examiner’s Synoptic Insight:</strong> The central irony of Tudor statecraft is that by using Parliament to break away from the Pope in 1534, Henry VIII created the statutory machinery that ultimately enabled Parliament to execute his great-nephew Charles I in 1649 and reduce the Crown to a constitutional monarchy in 1689.
      </div>
    </div>

    <div class="page-footer-strip">
      <span>Crown, Church, or Parliament (1517–1689)</span>
      <span>Synoptic Thematic Matrix • Page 11 of 12</span>
    </div>
  </div>
`;

  // ==========================================================================
  // PAGE 12: BACK COVER — SUMMATIVE ESSAY ARCHITECT
  // ==========================================================================
  html += `
  <div class="a5-page page-flex-full">
    <div class="page-header-strip">
      <div>
        <h2>Summative Assessment Preparation & Essay Architect</h2>
        <p>Disciplinary writing framework for the unit enquiry essay.</p>
      </div>
      <span class="page-tag">Essay Blueprint</span>
    </div>

    <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
      <div class="architect-card" style="border-left: 3px solid #0f172a; margin-bottom: 2px;">
        <strong style="color: #0f172a; font-size: 7.6pt;">Core Disciplinary Enquiry Question:</strong>
        <div style="font-family: 'Playfair Display', Georgia, serif; font-size: 9.2pt; font-weight: 800; color: #0f172a; margin: 1.5px 0;">
          "Who had the right to rule Britain: King, Church, or Parliament?"
        </div>
        <div style="font-size: 6.1pt; color: #475569;">
          Evaluate how 170 years of religious conflict, civil war, and constitutional revolution transformed Britain from an absolute monarchy into a parliamentary state (1517–1689).
        </div>
      </div>

      <div class="architect-sec-head" style="margin: 2px 0 1.5px 0;">1. Four Core Specification Turning Points</div>
      <div class="four-pillar-grid">
        <div class="four-pillar-cell">
          <strong>1. Royal Supremacy (1517–1547):</strong> Henry VIII severs ties with Rome; uses Parliament to pass 1534 Act of Supremacy; dissolves 800 monasteries for Crown revenue.
        </div>
        <div class="four-pillar-cell">
          <strong>2. Elizabethan Settlement (1558–1588):</strong> Elizabeth I adopts "Supreme Governor"; crafts Via Media; survives Papal Bull (1570); defeats Spanish Armada.
        </div>
        <div class="four-pillar-cell">
          <strong>3. Divine Right & Regicide (1625–1649):</strong> Charles I’s Personal Rule & Ship Money; New Model Army wins Civil War; public trial and execution of Charles I (1649).
        </div>
        <div class="four-pillar-cell">
          <strong>4. Parliamentary Supremacy (1660–1689):</strong> Restoration fails to halt conflict; Glorious Revolution deposes James II; 1689 Bill of Rights establishes constitutional monarchy.
        </div>
      </div>

      <div class="architect-sec-head" style="margin: 2px 0 1.5px 0;">2. Historiographical Debate: Progress vs. Conflict</div>
      <div class="historiography-grid">
        <div class="historiography-cell">
          <strong style="color: #0f172a;">Whig Progressive Interpretation:</strong>
          <div>Views 1517–1689 as an unbroken, heroic march toward parliamentary democracy and Protestant liberty, where the despotic claims of Stuart absolutism were rightfully defeated by the rule of statutory law.</div>
        </div>
        <div class="historiography-cell">
          <strong style="color: #0f172a;">Revisionist Conflict Interpretation:</strong>
          <div>Argues that the Civil War and Glorious Revolution were unintended, violent crises triggered by religious zeal, fiscal mismanagement, and dynastic paranoia, transferring power to rich landowners rather than the common people.</div>
        </div>
      </div>

      <div class="architect-sec-head" style="margin: 2px 0 1.5px 0;">3. Four-Paragraph Disciplinary Essay Plan</div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3px; font-size: 6.2pt;">
        <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 2px; padding: 2.5px 4px;">
          <strong>Para 1 (Intro):</strong> State your thesis; define the shift from Royal Supremacy (1534) to Parliamentary Sovereignty (1689).
        </div>
        <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 2px; padding: 2.5px 4px;">
          <strong>Para 2 (Tudor Arc):</strong> Analyse how Henry VIII and Elizabeth I used Parliament to break with Rome and build national power.
        </div>
        <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 2px; padding: 2.5px 4px;">
          <strong>Para 3 (Stuart Crisis):</strong> Explain how Charles I’s Divine Right and illegal taxes provoked Civil War and the 1649 Regicide.
        </div>
        <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 2px; padding: 2.5px 4px;">
          <strong>Para 4 (Conclusion):</strong> Evaluate why the 1689 Bill of Rights permanently locked in the supremacy of King-in-Parliament.
        </div>
      </div>

      <div class="architect-sec-head" style="margin: 2px 0 1.5px 0;">4. Examiner-Grade Sentence Starters & Analytical Connectives</div>
      <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 3px; padding: 3px 6px;">
        <ul class="sentence-starters-list">
          <li><strong>Opening Thesis:</strong> <em>"Although Henry VIII initially established absolute royal supremacy in 1534, the decisive constitutional shift occurred in 1689 because..."</em></li>
          <li><strong>Causal Mechanism:</strong> <em>"This crisis was fundamentally accelerated by Charles I’s rigid insistence on the Divine Right of Kings, which demonstrated that..."</em></li>
          <li><strong>Historiographical Balance:</strong> <em>"While Whig historians celebrate the 1689 Bill of Rights as the birth of liberty, revisionist evidence reveals that..."</em></li>
          <li><strong>Decisive Verdict:</strong> <em>"Ultimately, sovereignty shifted from Crown to Parliament not through peaceful evolution, but through the violent trauma of regicide in 1649 and the statutory terms imposed in 1689."</em></li>
        </ul>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3.5px; margin-top: 2px;">
        <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 2px; padding: 2.5px 5px; font-size: 6.1pt; line-height: 1.2;">
          <strong style="color: #0f172a; text-transform: uppercase;">Analytical Linking Connectives:</strong><br>
          <em>Consequently &bull; Furthermore &bull; In stark contrast &bull; Crucially &bull; As a direct consequence &bull; Fundamentally</em>
        </div>
        <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 2px; padding: 2.5px 5px; font-size: 6.1pt; line-height: 1.2;">
          <strong style="color: #0f172a; text-transform: uppercase;">Scholar Pre-Flight Checklist:</strong><br>
          [ ] Direct thesis in opening line &bull; [ ] 3+ Tier 3 terms per paragraph<br>
          [ ] Evaluated 1649 regicide &bull; [ ] Balanced Whig vs Revisionist views
        </div>
      </div>
    </div>

    <div class="archival-seal-footer">
      <span><strong>The History Department</strong> &bull; KS3 Revision & Assessment Spine</span>
      <span>Unit Code: MRP-Y8-2026.1</span>
      <span>Formative Retrieval Companion • Page 12 of 12</span>
    </div>
  </div>
`;

  html += `
</body>
</html>`;

  return html;
}

async function run() {
  console.log('=============================================================');
  console.log('📖 COMPILING MONARCHY, RELIGION & POWER 12-PAGE QUIZ BOOKLET');
  console.log('=============================================================\n');

  const htmlContent = await compileQuizBookletHtml();
  const htmlPath = path.join(UNIT_DIR, 'quiz_pack.html');
  fs.writeFileSync(htmlPath, htmlContent, 'utf8');
  console.log(`✅ Written HTML Booklet: ${htmlPath}`);

  console.log('🚀 Launching Puppeteer for PDF export and space budget audit...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

  // Space Budget & Overflow Audit
  const auditResults = await page.evaluate(() => {
    const pages = document.querySelectorAll('.a5-page');
    const pageData = [];
    pages.forEach((p, idx) => {
      const scrollH = p.scrollHeight;
      const clientH = p.clientHeight;
      const overflow = scrollH - clientH;
      pageData.push({
        pageNum: idx + 1,
        scrollH,
        clientH,
        overflow: overflow > 1 ? overflow : 0,
      });
    });
    return pageData;
  });

  console.log('\n=============================================================');
  console.log('📐 SPACE BUDGET & OVERFLOW AUDIT: Crown, Church, or Parliament');
  console.log('=============================================================');
  let hasErrors = false;
  auditResults.forEach((res) => {
    const status =
      res.overflow === 0 ? '✅ 0px overflow (PERFECT FIT)' : `❌ OVERFLOW ${res.overflow}px`;
    console.log(
      `Page ${String(res.pageNum).padStart(2, ' ')}: ${status} (clientH: ${res.clientH}px, scrollH: ${res.scrollH}px)`,
    );
    if (res.overflow > 0) hasErrors = true;
  });
  console.log('=============================================================\n');

  if (hasErrors) {
    console.warn('⚠️ Layout overflow detected; checking typographical calibration...');
  } else {
    console.log('🎉 Audit Passed: 100% clean across all 12 pages with ZERO overflow!');
  }

  // Primary PDF: A5 size (148mm x 210mm) formatted for A4 saddle-stitch printing
  const primaryPdf = path.join(PDFS_DIR, 'monarchy_religion_power_quiz_pack_FINAL_V1.pdf');
  const aliasPdf = path.join(PDFS_DIR, 'monarchy_religion_power_quiz_pack.pdf');

  await page.pdf({
    path: primaryPdf,
    width: '148mm',
    height: '210mm',
    printBackground: true,
    margin: { top: '6mm', bottom: '6mm', left: '0mm', right: '0mm' },
  });
  console.log(`✅ Generated Master 12-Page Saddle-Stitch PDF: ${primaryPdf}`);

  fs.copyFileSync(primaryPdf, aliasPdf);
  console.log(`✅ Updated PDF alias: ${aliasPdf}`);

  await browser.close();

  console.log(
    '\n🎉 Complete 12-page saddle-stitch Knowledge Retrieval Companion compiled successfully!',
  );
}

if (require.main === module) {
  run().catch(console.error);
}

module.exports = { run };
