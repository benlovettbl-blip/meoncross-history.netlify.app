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
const { EEE_ENQUIRY_CONFIGS } = require('./components/eee_enquiry_configs.cjs');
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

// Approved Witty Revision Quips (16 Pages per Key Topic)
const EEE_FOOTERS = {
  KT1: [
    'Early Elizabethan England Revision Hub • Key Topic 1 • The History Department', // Page 1
    '"Remember: Mary I left Elizabeth £300,000 of debt; don\'t leave blank lines in your exam!"', // Page 2
    '"Chronology is queen: 1558 Accession before 1559 Settlement, always."', // Page 3
    '"Patronage: Elizabeth gave out titles and monopolies, not marks; write the detail!"', // Page 4
    '"Legitimacy was questioned because of Henry VIII; your explanation must be unquestionable."', // Page 5
    '"Grade 9 Rule: Q1 requires Feature + Detail. Name the feature, then drop the factual hammer."', // Page 6
    '"The Middle Way was a compromise: Protestants got English Bibles, Catholics kept vestments."', // Page 7
    '"Royal Injunctions: All clergy had to teach Royal Supremacy — teach the examiner your knowledge."', // Page 8
    '"Explain why: connect the 1559 Settlement to Marian bishops refusing the Oath of Supremacy."', // Page 9
    '"Puritans hated crucifixes and vestments; examiners hate vague assertions."', // Page 10
    '"Vestments crisis: 37 vicars suspended by Parker in 1566 proved Protestant division."', // Page 11
    '"Causal chains: show how Catholic excommunication in 1570 hardened government policy."', // Page 12
    '"Mary, Queen of Scots arrived in 1568 in a fishing boat; don\'t let your essay drift."', // Page 13
    '"Casket Letters: Love letters or forged gossip? Elizabeth kept Mary under lock and key."', // Page 14
    '"Timed Condition Challenge: 16 marks means criteria-led evaluation and a sustained verdict."', // Page 15
    'Key Topic 1 Complete • Cumulative Assessment & Digital Practice Hub', // Page 16
  ],
  KT2: [
    'Early Elizabethan England Revision Hub • Key Topic 2 • The History Department', // Page 1
    '"1569: The Northern Earls marched with Catholic banners; Elizabeth responded with 450 executions."', // Page 2
    '"Regnans in Excelsis (1570): The Pope declared Elizabeth a heretic; Elizabeth declared plotters traitors."', // Page 3
    '"Walsingham\'s codebreaker Thomas Phelippes decoded the beer barrel letters: detail matters!"', // Page 4
    '"Ridolfi, Throckmorton, Babington: Three plots, three failures, one execution at Fotheringhay."', // Page 5
    '"Forensic detail: the Bond of Association (1584) sealed Mary Stuart\'s fate before Babington wrote."', // Page 6
    '"Privateers were legal pirates with a royal license: Drake took Spanish silver for England\'s glory."', // Page 7
    '"Cacafuego surrendered £140,000 of treasure: Elizabeth paid off the entire national debt."', // Page 8
    '"Sustained response: explain how privateering transformed commercial rivalry into formal war."', // Page 9
    '"Treaty of Nonsuch (1585): Dudley\'s 7,400 troops in the Netherlands made war with Spain inevitable."', // Page 10
    "\"Drake at Cadiz: 'Singeing the King of Spain's Beard' destroyed 30 ships and delayed the Armada by a year.\"", // Page 11
    '"Tactical breakdown: English race-built galleons versus high Spanish castles in the Channel duel."', // Page 12
    '"The Spanish crescent formation held until eight English fireships drifted into Calais Roads at midnight."', // Page 13
    '"Battle of Gravelines: Agile English galleons with rapid-fire culverins smashed the drifting Spanish fleet."', // Page 14
    '"The Protestant Wind: God blew and they were scattered, but Hawkins\' ship design won the battle."', // Page 15
    'Key Topic 2 Complete • Cumulative Assessment & Digital Practice Hub', // Page 16
  ],
  KT3: [
    'Early Elizabethan England Revision Hub • Key Topic 3 • The History Department', // Page 1
    '"A Golden Age: But if you were a beggar in 1572, you were bored through the ear with a hot iron."', // Page 2
    '"Grammar schools taught Latin from dawn to dusk; your task is 50 minutes of analytical history."', // Page 3
    '"The Theatre (1576): The first permanent playhouse in London, built outside the city walls in Shoreditch."', // Page 4
    '"Groundlings paid a penny to stand in the rain; the rich paid sixpence for covered gallery seats."', // Page 5
    '"Extended writing: analyse how Elizabethan education reinforced rigid social class hierarchies."', // Page 6
    '"Poverty grew because population rose from 3m to 4m, while wool enclosure eliminated farm jobs."', // Page 7
    '"1576 Act for Relief of the Poor: Local parishes provided wool and hemp so the unemployed could work."', // Page 8
    '"Sustained response: distinguish clearly between the Impotent Poor and Sturdy Beggars."', // Page 9
    '"New navigation tech: The astrolabe measured stars, but Drake\'s daring navigated the globe."', // Page 10
    '"Drake was the first Englishman to circumnavigate the earth, returning in 1580 with 4,700% profit."', // Page 11
    '"Commercial turning point: Drake\'s return proved England could challenge Spain on the world ocean."', // Page 12
    '"Walter Raleigh planned the Virginia colony from London; he never set foot in Roanoke himself."', // Page 13
    '"Roanoke failed because the Tiger ruined seeds, supplies arrived late, and relations with Wingina collapsed."', // Page 14
    '"Grade 9 Rule: In 12-mark questions, link your causes! Enclosure caused unemployment, which caused vagrancy."', // Page 15
    'Key Topic 3 Complete • Cumulative Assessment & Digital Practice Hub', // Page 16
  ],
};

function renderFooterStrip(pageNum, text, totalPages = 16) {
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

// ============================================================================
// KEY TOPICS MASTER CONFIGURATIONS
// ============================================================================
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
      heightMm: 102,
    },
    specBox: {
      title: 'Pearson Edexcel GCSE (9–1) History Specification Content',
      edexcelTable: {
        header: 'Key topic 1: Queen, government and religion, 1558–69',
        rows: [
          {
            numTitle: '1 The situation on Elizabeth’s accession',
            bullets: [
              'Elizabethan England in 1558: society and government.',
              'The Virgin Queen: the problem of her legitimacy, gender, marriage. Her character and strengths.',
              'Challenges at home and from abroad: financial weaknesses, religious divisions, the French threat.',
            ],
          },
          {
            numTitle: '2 The ‘settlement’ of religion',
            bullets: [
              'Elizabeth’s religious settlement (1559): its features and impact.',
              'The Church of England: its role in society.',
            ],
          },
          {
            numTitle: '3 Challenge to the religious settlement',
            bullets: [
              'The nature and extent of the Puritan challenge.',
              'The nature and extent of the Catholic challenge, including the role of the nobility, Papacy and foreign powers.',
            ],
          },
          {
            numTitle: '4 The problem of Mary, Queen of Scots',
            bullets: [
              'Mary, Queen of Scots: her claim to the English throne.',
              'Relations between Elizabeth and Mary, 1568–69.',
            ],
          },
        ],
      },
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
    enquiries: EEE_ENQUIRY_CONFIGS.KT1,
  },

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
      heightMm: 102,
    },
    specBox: {
      title: 'Pearson Edexcel GCSE (9–1) History Specification Content',
      edexcelTable: {
        header: 'Key topic 2: Challenges to Elizabeth at home and abroad, 1569–88',
        rows: [
          {
            numTitle: '1 Plots and revolts at home',
            bullets: [
              'The reasons for, and significance of, the Revolt of the Northern Earls, 1569–70.',
              'The features and significance of the Ridolfi, Throckmorton and Babington plots. Walsingham and the use of spies.',
              'The reasons for, and significance of, Mary Queen of Scots’ execution in 1587.',
            ],
          },
          {
            numTitle: '2 Relations with Spain',
            bullets: [
              'Political, religious and commercial rivalry.',
              'The significance of privateering and the activities of Drake.',
            ],
          },
          {
            numTitle: '3 Outbreak of war with Spain, 1585–88',
            bullets: [
              'Reasons for deteriorating relations with Spain: English direct involvement in the Netherlands and the actions of Robert Dudley.',
              'Drake and the raid on Cadiz: ‘Singeing the King of Spain’s beard’.',
            ],
          },
          {
            numTitle: '4 The Armada',
            bullets: [
              'Spanish invasion plans. Key events of the Spanish Armada.',
              'The reasons for the English victory.',
            ],
          },
        ],
      },
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
        title: 'Papal Bull: Regnans in Excelsis',
        tag: 'Key Topic 2.1',
        text: 'Pope Pius V issues the papal bull Regnans in Excelsis, excommunicating Elizabeth as a heretic and absolving all Catholic subjects of their oath of allegiance. This officially criminalizes Catholic loyalty and makes all active recusants potential traitors.',
      },
      {
        date: '1577–1580',
        title: 'Drake Circumnavigates the Globe',
        tag: 'Key Topic 2.2',
        text: 'Francis Drake completes the second circumnavigation in history in the Golden Hind, raiding Spanish Pacific colonies and capturing the treasure galleon Cacafuego (£140,000 in silver). Elizabeth knights Drake at Deptford, escalating Anglo-Spanish commercial rivalry.',
      },
      {
        date: 'AUG 1585',
        title: 'Treaty of Nonsuch (War in Netherlands)',
        tag: 'Key Topic 2.3',
        text: 'Following the assassination of William of Orange and the French Treaty of Joinville, Elizabeth signs the Treaty of Nonsuch, sending Robert Dudley (Earl of Leicester) with 7,400 English soldiers to aid Dutch Protestant rebels against the Duke of Parma.',
      },
      {
        date: 'FEB 1587',
        title: 'Execution of Mary, Queen of Scots',
        tag: 'Key Topic 2.1',
        text: 'Walsingham’s codebreaker Thomas Phelippes intercepts Babington’s ciphers explicitly approved by Mary Stuart. Tried under the 1584 Bond of Association, Mary is found guilty of high treason and beheaded at Fotheringhay Castle on 8 February 1587.',
      },
      {
        date: 'JUL–AUG 1588',
        title: 'Defeat of the Spanish Armada',
        tag: 'Key Topic 2.4',
        text: 'Medina Sidonia sails 130 ships to ferry Parma’s invasion army across the Channel. English fireships scatter the crescent formation at Calais Roads; agile galleons batter Spanish ships at Gravelines, and violent storms wreck half the fleet on Scottish and Irish rocks.',
      },
    ],
    enquiries: EEE_ENQUIRY_CONFIGS.KT2,
  },

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
      heightMm: 102,
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
        date: '1577',
        title: 'Grammar School Expansion & Humanist Curriculum',
        tag: 'Key Topic 3.1',
        text: "Over 70 new grammar schools are founded during Elizabeth's reign. The sons of the gentry and yeomanry study Latin, Greek, rhetoric, and classical history from dawn to dusk, fostering a highly literate administrative and legal class.",
      },
      {
        date: '1577–1580',
        title: 'Drake’s Circumnavigation & Scientific Sailing',
        tag: 'Key Topic 3.3',
        text: "Using new navigation technology including the astrolabe, magnetic compass, and quadrant, Francis Drake navigates through treacherous waters, claims 'Nova Albion' (California) for Elizabeth, and returns with a 4,700% return for his financial backers.",
      },
      {
        date: '1584',
        title: 'Raleigh Granted Royal Patent for Virginia',
        tag: 'Key Topic 3.4',
        text: "Elizabeth grants Sir Walter Raleigh a royal charter to discover and colonise 'remote heathen and barbarous lands'. Raleigh names the territory 'Virginia' in honour of the Virgin Queen, raising funds from London merchants for private colonisation.",
      },
      {
        date: '1585–1586',
        title: 'The First Roanoke Settlement & Failure',
        tag: 'Key Topic 3.4',
        text: '107 male colonists under Ralph Lane settle Roanoke Island. The flagship Tiger grounds, ruining seed crops; relations with Chief Wingina turn violent, and when Francis Drake arrives in June 1586, the starving colonists abandon the settlement.',
      },
    ],
    enquiries: EEE_ENQUIRY_CONFIGS.KT3,
  },
};

function formatFeatureStem(stem) {
  if (!stem) return 'Describe one feature of Elizabethan England.';
  return stem
    .replace(/^Describe one key feature of /i, 'Describe one feature of ')
    .replace(/^Describe two features of /i, 'Describe one feature of ')
    .trim();
}

function renderSpinePage(cfg, pageNum, quip, keyTopicNum) {
  let stagesHtml = '';
  const stages = cfg.stages || [];
  stages.forEach((st, idx) => {
    let bulletsHtml = st.bullets
      .map(
        (b) =>
          `<div style="margin-bottom: 2px; display: flex; align-items: baseline;"><span style="font-weight: 900; color: #000000; margin-right: 4px;">&bull;</span><span style="font-size: 8.2pt; font-weight: 700; color: #000000; line-height: 1.22;">${b}</span></div>`,
      )
      .join('');

    // Dynamic base font size so prompt never wraps onto a 2nd line
    const clueLen = (st.focusClue || '').length;
    let baseSizePt = '8.0';
    if (clueLen > 82) baseSizePt = '7.6';
    if (clueLen > 90) baseSizePt = '7.2';
    if (clueLen > 98) baseSizePt = '6.9';

    stagesHtml += `
          <!-- Stage ${idx + 1} -->
          <div class="spine-stage-row" style="display: flex; flex: 1; min-height: 0; align-items: stretch; margin: 0; border-bottom: 1.5px solid #000000;">
            <!-- Left: Factual Chronology Spine (44mm) with strong black font -->
            <div style="width: 44mm; flex-shrink: 0; border-left: 2.5px solid #000000; padding: 2.5px 5px 2.5px 6px; display: flex; flex-direction: column; justify-content: center; position: relative;">
              <div style="position: absolute; left: -5.5px; top: 12px; width: 8px; height: 8px; background: #000000; border-radius: 50%;"></div>
              <div style="display: flex; align-items: center; gap: 4px; margin-bottom: 2px;">
                <span style="background: #000000; color: #ffffff; font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 900; padding: 0.5px 5px; border-radius: 2px;">${idx + 1}</span>
                <span style="font-family: 'Inter', sans-serif; font-size: 8.4pt; font-weight: 900; color: #000000; letter-spacing: 0.3px;">${st.dates}</span>
              </div>
              <div style="font-family: 'Playfair Display', serif; font-size: 8.8pt; font-weight: 900; color: #000000; line-height: 1.15; margin-bottom: 2.5px;">
                ${st.title}
              </div>
              <div style="display: flex; flex-direction: column; font-family: 'Inter', sans-serif;">
                ${bulletsHtml}
              </div>
            </div>

            <!-- Right: Enquiry Prompt + Exact 6 Ruled Lines (Preserving teacher exposition notes) -->
            <div style="flex: 1; display: flex; flex-direction: column; border-left: 1.5px solid #000000; margin: 0; padding: 0; overflow: hidden;">
              <div style="background: #f1f5f9; border-bottom: 1.5px solid #000000; padding: 2.5px 8px; display: flex; align-items: center; overflow: hidden; white-space: nowrap;">
                <span class="spine-focus-prompt" data-base-size="${baseSizePt}" style="font-family: 'Georgia', serif; font-size: ${baseSizePt}pt; font-weight: 700; color: #000000; line-height: 1.15; font-style: italic; white-space: nowrap; display: inline-block;">
                  ${st.focusClue}
                </span>
              </div>
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
  <div class="page page-container ${pageNum % 2 === 0 ? 'verso-page' : 'recto-page'}" id="page-${pageNum}" style="padding: 2.5mm 6mm 2mm 6mm;">
    <div class="page-body-full">
      <!-- Lesson Header -->
      <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 2px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; letter-spacing: 0.5px; text-transform: uppercase; border: 1.2px solid #000000; padding: 1px 6px; border-radius: 2px;">
            KEY TOPIC ${keyTopicNum}.${cfg.enquiryNum} &bull; ENQUIRY LESSON NOTEBOOK
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-transform: uppercase; color: #000000;">
            EDEXCEL PAPER 2 (1HI0/2B) &bull; BRITISH DEPTH STUDY
          </span>
        </div>
        <h2 style="font-family: 'Playfair Display', serif; font-size: 11.5pt; color: #000000; margin: 1px 0 1px 0; font-weight: 900; line-height: 1.18;">
          ${cfg.inquiryQuestion}
        </h2>
      </div>

      <!-- Active Lesson Note-Taking Spine -->
      <div style="flex: 1; display: flex; flex-direction: column; margin-top: 2px; min-height: 0;">
        <!-- 5 Chronological Stages with Spine on Left and Ruled Lines on Right -->
        <div style="display: flex; flex-direction: column; flex: 1; min-height: 0; gap: 0;">
          ${stagesHtml}
        </div>
      </div>

      ${renderFooterStrip(pageNum, quip, 16)}
    </div>
  </div>`;
}

/**
 * ENQUIRY EXTENDED WRITING PART 1 (Page 1 of response - 22 Ruled Lines)
 */
function renderEnquiryWritingPart1(cfg, pageNum, quip, keyTopicNum) {
  const isEssay = cfg.tariff && cfg.tariff.includes('16');
  const extTariff = isEssay ? '20' : '12';
  const flexTaskLines = Array.from(
    { length: 22 },
    () => `
        <div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>`,
  ).join('');

  return `
  <!-- ENQUIRY EXTENDED WRITING PART 1 (PAGE ${pageNum}) -->
  <div class="page page-container ${pageNum % 2 === 0 ? 'verso-page' : 'recto-page'}" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full" style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
      <div>
        <!-- Exam Header -->
        <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 2px;">
          <div style="display: flex; align-items: baseline; gap: 6px;">
            <h2 style="font-family: 'Playfair Display', serif; font-size: 11pt; color: #000000; margin: 0; font-weight: 800;">
              ${cfg.tariff}
            </h2>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; border: 1px solid #000000; padding: 0 4px; border-radius: 2px; background: #f1f5f9; text-transform: uppercase;">
              EDEXCEL PAPER 2 (1HI0/2B)
            </span>
          </div>
          <span style="font-family: 'Inter', sans-serif; font-size: 8.5pt; font-weight: 800; border: 1.2px solid #000000; padding: 0 8px; border-radius: 2px;">
            Score: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ ${extTariff}</strong>
          </span>
        </div>

        <!-- Question Stem & Stimulus Box -->
        <div style="border: 1px solid #000000; border-radius: 3px; padding: 4px 6px; background: #ffffff; margin-bottom: 3px;">
          <div style="font-family: 'Playfair Display', serif; font-size: 9.0pt; font-weight: 800; color: #000000; margin-bottom: 2px; line-height: 1.22;">
            ${cfg.examStem}
          </div>
          <div style="display: flex; align-items: center; gap: 8px; font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #000000; background: #f8fafc; border: 1px solid #cbd5e1; padding: 2px 6px; border-radius: 2px;">
            <strong>You may use in your answer:</strong>
            <span>&bull; ${cfg.stimulus[0]}</span>
            <span>&bull; ${cfg.stimulus[1]}</span>
            <span style="font-style: italic; color: #1e3a8a; font-weight: 700;">(You must also use information of your own.)</span>
          </div>
        </div>

        <!-- Accessible Writing Frames & Key Vocabulary Bank -->
        <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 3px 6px; background: #ffffff; margin-bottom: 3px; display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 6px;">
          <div>
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.0pt; text-transform: uppercase; display: block; margin-bottom: 1px; color: #000000;">
              Accessible Writing Frames:
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-style: italic; line-height: 1.2; display: block; color: #222222;">
              ${cfg.connectives}
            </span>
          </div>
          <div>
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.0pt; text-transform: uppercase; display: block; margin-bottom: 1px; color: #000000;">
              Key Vocabulary Bank:
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; line-height: 1.2; display: block; color: #111111;">
              ${cfg.wordBank}
            </span>
          </div>
        </div>

        <!-- Ruled Task Lines Prompt -->
        <div style="font-family: 'Inter', sans-serif; font-size: 7.1pt; font-style: italic; color: #222222; margin: 2px 0; display: flex; justify-content: space-between;">
          <span><strong>Write your response in the space provided below:</strong></span>
          <span style="font-size: 6.8pt; color: #555555;">(Response continues on facing page)</span>
        </div>
      </div>

      <!-- 22 Ruled Task Lines for Extended Writing Part 1 -->
      <div style="flex: 1; display: flex; flex-direction: column; margin: 2px 0 4px 0;">
${flexTaskLines}
      </div>

      ${renderFooterStrip(pageNum, quip, 16)}
    </div>
  </div>`;
}

/**
 * ENQUIRY EXTENDED WRITING PART 2 & QUESTION 1 FEATURE PRACTICE
 * Top Half: Concluding Extended Writing (~13 Ruled Lines)
 * Bottom Half (Starts halfway down page): Q1(a) [2m] stacked vertically on top of Q1(b) [2m] (3 blank lines each) + Timeline Mission
 */
function renderEnquiryWritingPart2AndFeatures(cfg, pageNum, quip, keyTopicNum) {
  const isEssay = cfg.tariff && cfg.tariff.includes('16');
  const extTariff = isEssay ? '20' : '12';
  const tariffLabel = isEssay ? 'Question 3 Evaluative Essay' : 'Question 2 Explain Why';

  const continuationLines = Array.from(
    { length: 15 },
    () => `
        <div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>`,
  ).join('');

  const featLinesA = Array.from(
    { length: 3 },
    () => `
        <div class="task-line" style="height: 8.6mm; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>`,
  ).join('');

  const featLinesB = Array.from(
    { length: 3 },
    () => `
        <div class="task-line" style="height: 8.6mm; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>`,
  ).join('');

  const stemA = formatFeatureStem(cfg.featureA?.stem);
  const stemB = formatFeatureStem(cfg.featureB?.stem);

  return `
  <!-- ENQUIRY PART 2 & QUESTION 1 FEATURE PRACTICE (PAGE ${pageNum}) -->
  <div class="page page-container ${pageNum % 2 === 0 ? 'verso-page' : 'recto-page'}" id="page-${pageNum}" style="padding: 3.5mm 6mm 3mm 6mm;">
    <div class="page-body-full" style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">

      <!-- TOP HALF: Extended Writing Conclusion & Verdict (15 Ruled Lines Calibrated to Match Page 14) -->
      <div style="flex: 1.15; display: flex; flex-direction: column; min-height: 0; margin-bottom: 3px;">
        <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 2px; display: flex; justify-content: space-between; align-items: baseline;">
          <h2 style="font-family: 'Playfair Display', serif; font-size: 10.5pt; color: #000000; margin: 0; font-weight: 800;">
            Enquiry ${keyTopicNum}.${cfg.enquiryNum}: ${cfg.title} &bull; ${tariffLabel} Continued
          </h2>
          <span style="font-family: 'Inter', sans-serif; font-size: 8.0pt; font-weight: 800; border: 1.2px solid #000000; padding: 0 6px; border-radius: 2px;">
            Score: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ ${extTariff}</strong>
          </span>
        </div>

        <div style="font-family: 'Inter', sans-serif; font-size: 7.1pt; font-style: italic; color: #333333; margin-bottom: 2px;">
          Conclude your ${tariffLabel.toLowerCase()} and provide your sustained historical verdict below:
        </div>

        <div style="flex: 1; display: flex; flex-direction: column; margin: 1px 0 2px 0;">
${continuationLines}
        </div>
      </div>

      <!-- BOTTOM HALF (STARTS HALFWAY DOWN PAGE): QUESTION 1 PRACTICE: DESCRIBE ONE FEATURE (STACKED) -->
      <div style="border-top: 2px solid #000000; padding-top: 3px; display: flex; flex-direction: column; gap: 4px;">
        
        <!-- Section Header Bar -->
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; text-transform: uppercase; letter-spacing: 0.5px; color: #000000;">
            &bull; Question 1 Practice: Describe One Feature [2 &times; 2m = 4 marks &bull; 6 mins]
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 800; border: 1.2px solid #000000; padding: 0 6px; border-radius: 2px;">
            Q1 Total: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 4</strong>
          </span>
        </div>

        <!-- Feature Question 1(a) -->
        <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 2.5px 6px 3.5px 6px; background: #ffffff;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #cbd5e1; padding-bottom: 1.5px; margin-bottom: 2px;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 900; background: #000000; color: #ffffff; padding: 0.5px 5px; border-radius: 2px; text-transform: uppercase;">
                Q1(a)
              </span>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; color: #1e293b; text-transform: uppercase;">
                ${cfg.featureA?.provenance || 'Edexcel Exam Specification'}
              </span>
            </div>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800;">
              Mark: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 2</strong>
            </span>
          </div>
          <p style="font-family: 'Playfair Display', serif; font-size: 8.5pt; font-weight: 800; color: #000000; margin: 0 0 2px 0; line-height: 1.2;">
            ${stemA} <span style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 700; color: #475569;">[2 marks]</span>
          </p>
          <div style="font-family: 'Inter', sans-serif; font-size: 6.4pt; line-height: 1.15; background: #f8fafc; border: 1px solid #cbd5e1; padding: 1.5px 5px; border-radius: 2px; margin-bottom: 2px;">
            <strong>Target: AO1 (2m) &bull;</strong> <em>Feature: One key feature was that... &bull; Detail: Specifically, this was evident when...</em>
          </div>
          <div style="display: flex; flex-direction: column; padding-bottom: 2px;">
${featLinesA}
          </div>
        </div>

        <!-- Feature Question 1(b) (Stacked Vertically on top of each other) -->
        <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 2.5px 6px 3.5px 6px; background: #ffffff;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #cbd5e1; padding-bottom: 1.5px; margin-bottom: 2px;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 900; background: #000000; color: #ffffff; padding: 0.5px 5px; border-radius: 2px; text-transform: uppercase;">
                Q1(b)
              </span>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; color: #1e293b; text-transform: uppercase;">
                ${cfg.featureB?.provenance || 'Edexcel Exam Specification'}
              </span>
            </div>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800;">
              Mark: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 2</strong>
            </span>
          </div>
          <p style="font-family: 'Playfair Display', serif; font-size: 8.5pt; font-weight: 800; color: #000000; margin: 0 0 2px 0; line-height: 1.2;">
            ${stemB} <span style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 700; color: #475569;">[2 marks]</span>
          </p>
          <div style="font-family: 'Inter', sans-serif; font-size: 6.4pt; line-height: 1.15; background: #f8fafc; border: 1px solid #cbd5e1; padding: 1.5px 5px; border-radius: 2px; margin-bottom: 2px;">
            <strong>Target: AO1 (2m) &bull;</strong> <em>Feature: One key feature was that... &bull; Detail: Specifically, this meant that...</em>
          </div>
          <div style="display: flex; flex-direction: column; padding-bottom: 2px;">
${featLinesB}
          </div>
        </div>

        <!-- Timeline Mission Navigation Strip -->
        <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 2.5px 8px; background: #ffffff; display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 900; background: #000000; color: #ffffff; padding: 1.5px 6px; border-radius: 2px; text-transform: uppercase; white-space: nowrap;">
              Timeline Mission
            </span>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; color: #000000; line-height: 1.2;">
              ${cfg.timelineMission}
            </span>
          </div>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; white-space: nowrap; margin-left: 8px;">
            &larr; Pages 2–3
          </span>
        </div>

      </div>

      ${renderFooterStrip(pageNum, quip, 16)}
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
    totalPageCount: 16,
    renderFooterStrip,
  });

  // ====================================================================
  // PAGES 2–3: LIVING TIMELINE (6 MILESTONES)
  // Clean full-width dual-coding sketchpads without restrictive outer borders
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

      <div style="display: flex; flex-direction: column; gap: 4px; flex: 1; justify-content: space-between;">
        ${msPart1
          .map(
            (m, mIdx) => `
        <div style="border: none; padding: 2px 0 4px 0; ${mIdx < 2 ? 'border-bottom: 1.5px solid #000000;' : ''} flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 9.6pt; color: #000000;">
                ${m.date} &bull; ${m.title}
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">${m.tag}</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8.8pt; color: #000000; margin: 0 0 2px 0; line-height: 1.22;">
              ${m.text}
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 52mm; width: 100%; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>
        `,
          )
          .join('')}
      </div>

      ${renderFooterStrip(2, footers[1], 16)}
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

      <div style="display: flex; flex-direction: column; gap: 4px; flex: 1; justify-content: space-between;">
        ${msPart2
          .map(
            (m, mIdx) => `
        <div style="border: none; padding: 2px 0 4px 0; ${mIdx < 2 ? 'border-bottom: 1.5px solid #000000;' : ''} flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 9.6pt; color: #000000;">
                ${m.date} &bull; ${m.title}
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">${m.tag}</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8.8pt; color: #000000; margin: 0 0 2px 0; line-height: 1.22;">
              ${m.text}
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 52mm; width: 100%; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>
        `,
          )
          .join('')}
      </div>

      ${renderFooterStrip(3, footers[2], 16)}
    </div>
  </div>
`;

  // ====================================================================
  // PAGES 4–15: 4 DEDICATED THREE-PAGE ENQUIRY MODULES (12 PAGES TOTAL)
  // Page 1: 5-Stage Chronological Inquiry Spine & Exposition Notes (30 ruled lines)
  // Page 2: Extended Writing Part 1 (22 ruled lines, stimulus, frames, vocab)
  // Page 3: Extended Writing Part 2 (~13 lines) + Q1 Feature Practice (3 lines each) + Timeline Mission
  // ====================================================================
  data.enquiries.forEach((enq, idx) => {
    const spinePageNum = 4 + idx * 3; // 4, 7, 10, 13
    const writePart1PageNum = spinePageNum + 1; // 5, 8, 11, 14
    const writePart2PageNum = spinePageNum + 2; // 6, 9, 12, 15

    // Page 1 of enquiry: Chronological Inquiry Spine & Exposition Notes
    html += renderSpinePage(enq, spinePageNum, footers[spinePageNum - 1], data.keyTopicNum);

    // Page 2 of enquiry: Extended Writing Part 1 (Stimulus, Accessible Writing Frames, Key Vocab Bank, 22 flex lines)
    html += renderEnquiryWritingPart1(
      enq,
      writePart1PageNum,
      footers[writePart1PageNum - 1],
      data.keyTopicNum,
    );

    // Page 3 of enquiry: Extended Writing Part 2 (~13 lines) + Stacked Feature Practice Q1(a)&(b) [3 lines each] + Timeline Mission
    html += renderEnquiryWritingPart2AndFeatures(
      enq,
      writePart2PageNum,
      footers[writePart2PageNum - 1],
      data.keyTopicNum,
    );
  });

  // ====================================================================
  // PAGE 16: OUTSIDE BACK COVER (ASSESSMENT RECORD LEDGER & 4 DUAL-QR CARDS)
  // ====================================================================

  function cleanStem(stem) {
    if (!stem) return '';
    return stem
      .replace(/^Describe one key feature of /i, '')
      .replace(/^Describe one feature of /i, '')
      .replace(/^Describe two features of /i, '')
      .replace(/\.$/, '');
  }

  let examRowsHtml = '';

  data.enquiries.forEach((enq, idx) => {
    const spinePageNum = 4 + idx * 3;
    const writePart1PageNum = spinePageNum + 1;
    const writePart2PageNum = spinePageNum + 2;
    const extTariff = enq.tariff && enq.tariff.includes('16') ? 20 : 12;
    const extLabel = enq.tariff && enq.tariff.includes('16') ? 'Q3 Essay' : 'Q2 Explain Why';

    const featAText = cleanStem(enq.featureA?.stem);
    const featBText = cleanStem(enq.featureB?.stem);
    let extText = enq.examStem || enq.rightExam?.stem || 'Extended Writing Task';
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
            Spine Lecture Notes (p. ${spinePageNum}): &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 10</strong>
          </span>
        </td>
        <td style="padding: 3px 4px; text-align: center; border-right: 1px solid #000000; font-size: 7.4pt; font-weight: 800; background: #fafafa;">
          p. ${writePart1PageNum}–${writePart2PageNum}
        </td>
        <td style="padding: 3px 8px; border-right: 1px solid #000000; font-size: 7.4pt; font-weight: 600;">
          <strong>${extLabel}:</strong> ${extText} [${extTariff}m]
        </td>
        <td rowspan="4" style="padding: 4px 6px; text-align: center; border-right: 1.2px solid #000000; font-size: 8.5pt; font-weight: 800; vertical-align: middle; background: #ffffff;">
          &nbsp;&nbsp;&nbsp;<strong>___ / ___</strong>&nbsp;&nbsp;&nbsp;
        </td>
        <td style="padding: 3px 6px; text-align: center; font-size: 9.0pt; font-weight: 800; white-space: nowrap;">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ ${extTariff}</strong>
        </td>
      </tr>
      <tr style="border-bottom: 1px solid #cbd5e1; background: #ffffff;">
        <td style="padding: 3px 4px; text-align: center; border-right: 1px solid #000000; font-size: 7.4pt; font-weight: 800; background: #fafafa;">
          p. ${writePart2PageNum}
        </td>
        <td style="padding: 3px 8px; border-right: 1px solid #000000; font-size: 7.4pt; font-weight: 600;">
          <strong>Q1(a) Feature:</strong> ${featAText} [2m]
        </td>
        <td style="padding: 3px 6px; text-align: center; font-size: 9.0pt; font-weight: 800; white-space: nowrap;">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 2</strong>
        </td>
      </tr>
      <tr style="border-bottom: 1.5px solid #000000; background: #ffffff;">
        <td style="padding: 3px 4px; text-align: center; border-right: 1px solid #000000; font-size: 7.4pt; font-weight: 800; background: #fafafa;">
          p. ${writePart2PageNum}
        </td>
        <td style="padding: 3px 8px; border-right: 1px solid #000000; font-size: 7.4pt; font-weight: 600;">
          <strong>Q1(b) Feature:</strong> ${featBText} [2m]
        </td>
        <td style="padding: 3px 6px; text-align: center; font-size: 9.0pt; font-weight: 800; white-space: nowrap;">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 2</strong>
        </td>
      </tr>
      <tr style="border-bottom: 1.5px solid #000000; background: #f8fafc;">
        <td style="padding: 2px 4px; text-align: center; border-right: 1px solid #000000; font-size: 7.0pt; font-weight: 800; color: #475569;">
          Summary
        </td>
        <td style="padding: 2px 8px; border-right: 1px solid #000000; font-size: 7.0pt; font-weight: 700; color: #475569;">
          Total Module Enquiry Assessment Mark
        </td>
        <td style="padding: 2px 6px; text-align: center; font-size: 8.5pt; font-weight: 900; white-space: nowrap; color: #000000;">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ ${extTariff + 4}</strong>
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

        <!-- Retrieval Attempts Log & Score Box (No brackets around score!) -->
        <div style="border-top: 1.2px solid #000000; padding: 2.5px 3px; margin-top: 2px; font-family: 'Inter', sans-serif; background: #f8fafc; border-radius: 2px; box-sizing: border-box;">
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 5.6pt; font-weight: 700; color: #475569; margin-bottom: 2px;">
            <span>Quiz Attempt:</span>
            <span>[ ] 1st &nbsp; [ ] 2nd &nbsp; [ ] 3rd</span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 7.2pt; font-weight: 900; color: #000000;">
            <span style="font-size: 6.0pt; font-weight: 700;">Score:</span>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 20</strong></span>
            <span style="font-size: 5.8pt; font-weight: 600; color: #64748b;">Date: ___/___</span>
          </div>
        </div>

      </div>`;
    })
    .join('');

  html += `
  <div class="page page-container verso-page" id="page-16" style="padding: 4mm 6mm; box-sizing: border-box;">
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

      <!-- Master Exam Practice & Homework Assessment Tracker Table (No brackets around scores!) -->
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
              <th style="padding: 3px 4px; width: 44px; text-align: center; font-size: 7.4pt; font-weight: 900; text-transform: uppercase; border-right: 1px solid #000000;">Page</th>
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

      ${renderFooterStrip(16, footers[15], 16)}
    </div>
  </div>
`;

  html += `
  <!-- Client-Side Auto-Lines & Auto-Fit Calculator (Evaluated in Puppeteer before PDF print) -->
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

    function autoFitStagePrompts() {
      document.querySelectorAll('.spine-focus-prompt').forEach(el => {
        const parent = el.parentElement;
        if (!parent) return;
        const maxW = parent.clientWidth - 16;
        let sizePt = parseFloat(el.dataset.baseSize || '7.6');
        while (el.scrollWidth > maxW && sizePt > 6.0) {
          sizePt -= 0.1;
          el.style.fontSize = sizePt.toFixed(2) + 'pt';
        }
      });
    }

    function initPageCalibrations() {
      autoFillWritingLines();
      autoFitStagePrompts();
    }

    window.addEventListener('DOMContentLoaded', initPageCalibrations);
    if (document.readyState !== 'loading') initPageCalibrations();
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

  // Evaluate dynamic lines calculation and stage prompt fitting client-side in Puppeteer
  await page.evaluate(() => {
    if (typeof autoFillWritingLines === 'function') autoFillWritingLines();
    if (typeof autoFitStagePrompts === 'function') autoFitStagePrompts();
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
  console.log(`\n▶ Generating 16-page workbook for Key Topic ${kt}...`);
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
  console.log('📚 MERGING 48-PAGE EARLY ELIZABETHAN ENGLAND MASTER WORKBOOK...');
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
