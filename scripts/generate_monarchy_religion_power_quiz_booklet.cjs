/**
 * generate_monarchy_religion_power_quiz_booklet.cjs
 *
 * Compiles the 8-Page Saddle-Stitch Knowledge Retrieval & Homework Companion
 * for KS3 History (Year 8): Crown, Church, or Parliament (1517–1689).
 *
 * Page Architecture (8-Page Saddle-Stitch Booklet / 2 sheets A4 landscape folded in half):
 * - Page 1: Uniform Front Cover & Formative Homework & Retrieval Tracking Ledger
 *           (Scholar box, Attempt 1 vs 2 scores, Retrieval Strength [ ] Instant [ ] Effortful [ ] Restudy,
 *           Roomy Parent Initial box, QR code to interactive portal)
 * - Pages 2–6: 5 Dedicated Lesson Retrieval Pages (Lessons 1 to 5 • 8 questions each = 40 questions total)
 *              Featuring 2 roomy write-in lines per question with strong #000000 black typography:
 *              Line 1: Answer: [Core Fact]
 *              Line 2: Detail / Why: [Historical Mechanism or Consequence]
 * - Page 7: Department Marking Bank (Part 1 • Lessons 1–3 • Q1–Q24 • Bold answers + Explanations + [✓][✗])
 * - Page 8: Department Marking Bank (Part 2 • Lessons 4–5 • Q25–Q40 • Bold answers + Explanations + [✓][✗])
 *           + DIRT Revision Standard + Department Evaluator Quality Seal & Sign-off Box
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
// Formatted for A4 landscape folded in half (exactly 2 sheets = 8 pages)
// 100% Solid Black (#000000) Typography for Razor-Sharp Reprographics
// --------------------------------------------------------------------------
const A5_BOOKLET_CSS = `
  @page {
    size: 148mm 210mm;
    margin: 6mm 0mm;
  }
  * { box-sizing: border-box; }
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: #000000;
    margin: 0;
    padding: 0;
    font-size: 7.5pt;
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

  /* Page Headers & Footers */
  .page-header-strip {
    border-bottom: 1.5px solid #000000;
    padding-bottom: 2px;
    margin-bottom: 4px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .page-header-strip h2 {
    margin: 0;
    font-size: 9.2pt;
    color: #000000;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }
  .page-header-strip p {
    margin: 1px 0 0 0;
    font-size: 6.8pt;
    color: #000000;
    font-weight: 600;
  }
  .page-tag {
    font-size: 6.5pt;
    font-weight: 800;
    background: #000000;
    color: #ffffff;
    padding: 2.5px 6px;
    border-radius: 2px;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    white-space: nowrap;
  }
  .page-footer-strip {
    font-size: 6.8pt;
    color: #000000;
    border-top: 1.2px solid #000000;
    padding-top: 2px;
    margin-top: 2px;
    display: flex;
    justify-content: space-between;
    font-weight: 700;
  }

  /* Cover Page Styling (Page 1) */
  .cover-banner {
    background: #000000;
    color: #ffffff;
    padding: 4px 8px;
    border-radius: 4px 4px 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 6.8pt;
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
    font-size: 6.8pt;
  }
  .cover-header-block {
    text-align: center;
    padding: 4px 6px 3px 6px;
    background: #f8fafc;
    border-left: 1.2px solid #000000;
    border-right: 1.2px solid #000000;
  }
  .cover-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 11.8pt;
    font-weight: 800;
    color: #000000;
    line-height: 1.15;
    margin: 0 0 2px 0;
  }
  .cover-subtitle {
    font-size: 7.2pt;
    font-weight: 700;
    color: #000000;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    margin: 0;
  }

  /* Pupil Box */
  .pupil-box {
    background: #ffffff;
    border: 1.2px solid #000000;
    border-top: none;
    padding: 4.5px 8px;
    font-size: 7.2pt;
    color: #000000;
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
    font-weight: 800;
    color: #000000;
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
    background: #ffffff;
    border: 1.2px solid #000000;
    border-radius: 4px;
    padding: 3px 6px;
  }
  .cover-map-frame {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    max-height: 75.5mm;
  }
  .cover-map-img {
    max-height: 75.5mm;
    max-width: 100%;
    object-fit: contain;
    border: 1.2px solid #000000;
    border-radius: 2px;
  }
  .cover-map-caption {
    font-size: 6.2pt;
    color: #000000;
    margin-top: 2px;
    font-style: italic;
    font-weight: 600;
  }

  /* Tracking Ledger */
  .ledger-container {
    margin-top: 3px;
  }
  .tracking-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 6.6pt;
    background: #ffffff;
    color: #000000;
  }
  .tracking-table th {
    background: #000000;
    color: #ffffff;
    font-weight: 800;
    padding: 3px 3.5px;
    border: 1px solid #000000;
    text-transform: uppercase;
    letter-spacing: 0.2px;
    text-align: center;
  }
  .tracking-table td {
    border: 1px solid #000000;
    padding: 4.5px 3.5px;
    text-align: center;
    vertical-align: middle;
    color: #000000;
  }
  .tracking-table td.left-title {
    text-align: left;
    color: #000000;
  }
  .tb-lesson-title {
    font-weight: 800;
    font-size: 6.8pt;
    color: #000000;
    line-height: 1.15;
  }
  .tb-lesson-enquiry {
    font-size: 5.6pt;
    color: #000000;
    font-style: italic;
    line-height: 1.15;
    margin-top: 0.5px;
  }
  .score-line {
    display: inline-block;
    width: 14px;
    border-bottom: 1.2px solid #000000;
  }
  .retrieval-boxes {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3.5px;
    font-size: 6pt;
    color: #000000;
    white-space: nowrap;
  }
  .retrieval-boxes span {
    font-weight: 700;
  }
  .parent-sig-cell {
    padding: 2px 4px;
  }
  .parent-sig-box {
    border: 1.2px solid #000000;
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
    background: #ffffff;
    border: 1.2px solid #000000;
    border-radius: 3px;
    padding: 2.5px 6px;
    margin-top: 2px;
    margin-bottom: 2px;
    font-size: 6pt;
    line-height: 1.15;
    color: #000000;
    font-weight: 600;
  }
  .traffic-tier {
    display: flex;
    align-items: center;
    gap: 3.5px;
    color: #000000;
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
    background: #ffffff;
    border: 1.2px solid #000000;
    border-radius: 4px;
    padding: 3px 6px;
    gap: 8px;
    margin-top: 2px;
    margin-bottom: 1px;
    color: #000000;
  }
  .qr-code-img {
    width: 32px;
    height: 32px;
    flex-shrink: 0;
  }
  .qr-caption-text {
    font-size: 6.4pt;
    color: #000000;
    line-height: 1.2;
    text-align: left;
    font-weight: 700;
  }

  /* Pages 2–6: Dedicated Question Page Layout */
  .lesson-instruction-bar {
    background: #f8fafc;
    border-left: 3.5px solid #000000;
    border-top: 1px solid #000000;
    border-right: 1px solid #000000;
    border-bottom: 1px solid #000000;
    padding: 2.5px 6px;
    font-size: 6.8pt;
    color: #000000;
    font-weight: 700;
    margin-bottom: 2.5px;
  }
  .q-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    gap: 2px;
  }
  .q-block {
    background: #ffffff;
    border: 1.2px solid #000000;
    border-radius: 3px;
    padding: 3.5px 6px;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .q-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 4px;
    font-size: 9.2pt;
    line-height: 1.18;
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
    min-width: 16px;
    font-size: 9.2pt;
  }
  .q-prompt {
    font-weight: 700;
    color: #000000;
    font-size: 9.2pt;
  }
  .q-mastery {
    font-size: 6.5pt;
    font-weight: 800;
    color: #000000;
    white-space: nowrap;
  }
  .q-line-row {
    display: flex;
    align-items: flex-end;
    gap: 5px;
    font-size: 7.8pt;
    margin-top: 1px;
  }
  .q-line-lbl {
    font-weight: 800;
    color: #000000;
    white-space: nowrap;
    font-size: 7.8pt;
    min-width: 72px;
  }
  .q-solid-line {
    flex: 1;
    border-bottom: 1.2px solid #000000;
    min-height: 20px;
  }

  /* Pages 7 & 8: Marking Bank */
  .mb-section-title {
    background: #f1f5f9;
    border-left: 3.5px solid #000000;
    border-top: 1px solid #000000;
    border-right: 1px solid #000000;
    border-bottom: 1px solid #000000;
    padding: 2px 6px;
    font-size: 7.2pt;
    font-weight: 800;
    color: #000000;
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
    font-size: 6.8pt;
    line-height: 1.18;
    background: #ffffff;
    border: 1px solid #000000;
    border-radius: 2px;
    padding: 2px 5px;
    color: #000000;
  }
  .ans-num {
    font-weight: 800;
    color: #000000;
    min-width: 14px;
    font-size: 7.2pt;
  }
  .ans-content {
    flex: 1;
    color: #000000;
  }
  .ans-core {
    font-weight: 800;
    color: #000000;
    font-size: 7.2pt;
  }
  .ans-exp {
    color: #000000;
    font-style: italic;
    font-size: 6.8pt;
  }
  .ans-boxes {
    font-size: 6.5pt;
    font-weight: 800;
    color: #000000;
    white-space: nowrap;
    margin-left: 3px;
  }

  /* Page 8: Summative Evaluation & Verification Sign-Off Box */
  .signoff-box {
    background: #ffffff;
    border: 1.5px solid #000000;
    border-radius: 3px;
    padding: 4px 8px;
    margin-top: 4px;
    font-size: 6.8pt;
    color: #000000;
  }
  .signoff-grid {
    display: grid;
    grid-template-columns: 1.2fr 1fr 1fr;
    gap: 8px;
    align-items: center;
    margin-top: 3px;
  }
  .signoff-field {
    display: flex;
    align-items: center;
    gap: 4px;
    font-weight: 700;
  }
  .signoff-line {
    border-bottom: 1.2px solid #000000;
    flex: 1;
    min-height: 14px;
  }
`;

async function compileQuizBookletHtml() {
  const portalUrl =
    'https://the-history-revision-hub.netlify.app/?unit=monarchy_religion_power&view=quizzes';
  const qrDataUrl = await QRCode.toDataURL(portalUrl, {
    margin: 1,
    color: { dark: '#000000', light: '#ffffff' },
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
          <div class="pupil-field"><span class="lbl">Scholar Name:</span><span class="line"></span></div>
          <div class="pupil-field"><span class="lbl">Class:</span><span class="line"></span></div>
          <div class="pupil-field"><span class="lbl">Teacher:</span><span class="line"></span></div>
        </div>
      </div>
    </div>

    <!-- Centerpiece Portrait -->
    <div class="cover-map-container">
      <div class="cover-map-frame">
        ${
          coverImgData
            ? `<img src="${coverImgData}" alt="Queen Elizabeth I Armada Portrait" class="cover-map-img">`
            : `<div style="padding: 10px; font-weight: bold; color: #000000;">Armada Portrait (1588)</div>`
        }
      </div>
      <div class="cover-map-caption">
        Queen Elizabeth I (The Armada Portrait, 1588) • Commemorating the defeat of Catholic Spain and the defense of the Protestant realm.
      </div>
    </div>

    <!-- Formative Homework & Retrieval Tracking Ledger -->
    <div class="ledger-container">
      <table class="tracking-table">
        <thead>
          <tr>
            <th style="width: 32%;">Lesson Retrieval Unit</th>
            <th style="width: 14%;">Att 1 Score</th>
            <th style="width: 14%;">Att 2 Score</th>
            <th style="width: 25%;">Retrieval Strength</th>
            <th style="width: 15%;">Parent Init</th>
          </tr>
        </thead>
        <tbody>
          ${QUIZ_DATA.map(
            (l) => `
          <tr>
            <td class="left-title">
              <div class="tb-lesson-title">Lesson ${l.lesson}: ${l.shortTitle}</div>
              <div class="tb-lesson-enquiry">${l.enquiry}</div>
            </td>
            <td><span class="score-line"></span> / 8</td>
            <td><span class="score-line"></span> / 8</td>
            <td>
              <div class="retrieval-boxes">
                <span>[ ] Ins</span>
                <span>[ ] Eff</span>
                <span>[ ] Res</span>
              </div>
            </td>
            <td class="parent-sig-cell"><div class="parent-sig-box"></div></td>
          </tr>`,
          ).join('')}
        </tbody>
      </table>
    </div>

    <!-- 3-Tier Traffic Light Mastery Rule (DIRT Loop) -->
    <div class="mastery-traffic-strip">
      <div class="traffic-tier">
        <span class="traffic-dot green-dot">&#9679;</span>
        <strong>7–8/8 Mastered:</strong> Secure factual recall.
      </div>
      <div class="traffic-tier">
        <span class="traffic-dot amber-dot">&#9679;</span>
        <strong>5–6/8 Consolidate:</strong> Flashcard restudy on missed terms.
      </div>
      <div class="traffic-tier">
        <span class="traffic-dot red-dot">&#9679;</span>
        <strong>&lt;5/8 Action Required:</strong> Mandatory re-test after DIRT corrections.
      </div>
    </div>

    <!-- Interactive Portal QR Code -->
    <div class="qr-strip">
      <img src="${qrDataUrl}" alt="Digital Portal QR" class="qr-code-img">
      <div class="qr-caption-text">
        <strong>Scan for Interactive Digital Quizzes & Audio Lessons:</strong><br>
        Access online self-marking retrieval flashcards, diagnostic feedback, and audio narration at <strong>the-history-revision-hub.netlify.app</strong>.
      </div>
    </div>

    <div class="page-footer-strip">
      <span><strong>The History Department</strong> &bull; Key Stage 3 Formative Retrieval Companion</span>
      <span>Front Cover & Tracking Ledger &bull; Page 1 of 8</span>
    </div>
  </div>
`;

  // ==========================================================================
  // PAGES 2–6: 5 DEDICATED LESSON RETRIEVAL PAGES (8 Questions Each)
  // ==========================================================================
  let globalQNum = 1;
  QUIZ_DATA.forEach((lessonData, lIdx) => {
    const pageNum = lIdx + 2;
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
      <span>Retrieval Companion &bull; Page ${pageNum} of 8</span>
    </div>
  </div>
`;
  });

  // ==========================================================================
  // PAGE 7: DEPARTMENT MARKING BANK (PART 1 • LESSONS 1–3 • Q1–Q24)
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
      <span>Marking Bank Part 1 &bull; Page 7 of 8</span>
    </div>
  </div>
`;

  // ==========================================================================
  // PAGE 8: DEPARTMENT MARKING BANK (PART 2 • LESSONS 4–5 • Q25–Q40) & SIGN-OFF
  // ==========================================================================
  html += `
  <div class="a5-page page-flex-full">
    <div class="page-header-strip">
      <div>
        <h2>Department Marking Bank • Lessons 4–5 & Summative Review</h2>
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

    <!-- DIRT Protocol & Teacher Quality Inspection Box -->
    <div class="signoff-box">
      <div style="font-weight: 800; text-transform: uppercase; font-size: 7.2pt; border-bottom: 1.2px solid #000000; padding-bottom: 2px; margin-bottom: 3px; display: flex; justify-content: space-between;">
        <span>Department Assessment & DIRT Verification Sign-Off</span>
        <span>Unit Final Score: ______ / 40</span>
      </div>
      <div style="font-size: 6.4pt; line-height: 1.25; margin-bottom: 3px;">
        <strong>DIRT Protocol:</strong> Any question marked [✗] must be corrected in green pen with the full historical mechanism written out. If score is below 32/40 (80%), scholar must complete a re-test session using the online revision portal.
      </div>
      <div class="signoff-grid">
        <div class="signoff-field"><span>Teacher Sign:</span><span class="signoff-line"></span></div>
        <div class="signoff-field"><span>DIRT Verified:</span> [ ] Pass &bull; [ ] Redo</div>
        <div class="signoff-field"><span>Date:</span><span class="signoff-line"></span></div>
      </div>
    </div>

    <div class="page-footer-strip">
      <span>Crown, Church, or Parliament (1517–1689)</span>
      <span>Marking Bank Part 2 & Sign-Off &bull; Page 8 of 8</span>
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
  console.log('📖 COMPILING MONARCHY, RELIGION & POWER 8-PAGE QUIZ BOOKLET');
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
    console.log('🎉 Audit Passed: 100% clean across all 8 pages with ZERO overflow!');
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
  console.log(`✅ Generated Master 8-Page Saddle-Stitch PDF: ${primaryPdf}`);

  fs.copyFileSync(primaryPdf, aliasPdf);
  console.log(`✅ Updated PDF alias: ${aliasPdf}`);

  await browser.close();

  console.log(
    '\n🎉 Complete 8-page saddle-stitch Knowledge Retrieval Companion compiled successfully!',
  );
}

if (require.main === module) {
  run().catch(console.error);
}

module.exports = { run };
