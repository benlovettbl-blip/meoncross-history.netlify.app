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
              <!-- Exact 6 Ruled Lines (Preserving live 1.5px solid #000000 ruling) -->
              <div style="flex: 1; display: flex; flex-direction: column;">
                <div style="flex: 1; min-height: 0; border-bottom: 1.5px solid #000000; box-sizing: border-box;"></div>
                <div style="flex: 1; min-height: 0; border-bottom: 1.5px solid #000000; box-sizing: border-box;"></div>
                <div style="flex: 1; min-height: 0; border-bottom: 1.5px solid #000000; box-sizing: border-box;"></div>
                <div style="flex: 1; min-height: 0; border-bottom: 1.5px solid #000000; box-sizing: border-box;"></div>
                <div style="flex: 1; min-height: 0; border-bottom: 1.5px solid #000000; box-sizing: border-box;"></div>
                <div style="flex: 1; min-height: 0; border-bottom: 1.5px solid #000000; box-sizing: border-box;"></div>
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

  return `
  <!-- SHORT-TARIFF EXAM PRACTICE: 2x Q1 FEATURE [2m+2m] + VOCAB + TIMELINE (PAGE ${pageNum}) -->
  <div class="page page-container recto-page" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full" style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
      
      <!-- Top Exam Header -->
      <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; letter-spacing: 0.5px; text-transform: uppercase; border: 1.2px solid #000000; padding: 1px 6px; border-radius: 2px;">
            KEY TOPIC ${keyTopicNum}.${enq.enquiryNum} &bull; SHORT-TARIFF EXAM PRACTICE
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-transform: uppercase; color: #000000;">
            EDEXCEL PAPER 2 &bull; FACTUAL RECALL (AO1)
          </span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <h2 style="font-family: 'Playfair Display', serif; font-size: 11.2pt; color: #000000; margin: 1px 0 0 0; font-weight: 900; line-height: 1.2;">
            Question 1: Describe Two Features [2 &times; 2 marks &bull; 6 mins]
          </h2>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 800; border: 1.2px solid #000000; padding: 1px 5px; border-radius: 2px;">
            Total Score: [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 4 ]
          </span>
        </div>
      </div>

      <!-- Question 1(a): Describe One Key Feature [2 marks] -->
      <div class="task-section" style="border: 1.2px solid #000000; border-radius: 3px; padding: 4px 6px; background: #ffffff; margin-bottom: 3px;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000000; padding-bottom: 2px; margin-bottom: 2px;">
          <div style="display: flex; align-items: center; gap: 5px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 8.4pt; text-transform: uppercase; letter-spacing: 0.5px;">
              &bull; Question 1(a): Describe One Key Feature [2 marks &bull; 3 mins]
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; background: #000000; color: #ffffff; padding: 1px 4px; border-radius: 2px;">
              ${featAProb}
            </span>
          </div>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; border: 1px solid #000000; padding: 0 4px; border-radius: 2px; background: #f8fafc;">
            ${enq.featureA.provenance || 'EDEXCEL PAPER 2'}
          </span>
        </div>
        <p style="font-family: 'Playfair Display', serif; font-size: 9.4pt; font-weight: 800; color: #000000; margin: 1px 0 2px 0; line-height: 1.2;">
          ${enq.featureA.stem}
        </p>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-style: italic; color: #333333; margin-bottom: 1px; line-height: 1.15;">
          <strong>Target Guidance:</strong> ${enq.featureA.guidance}
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 700; margin-bottom: 2px;">
          <strong>Sentence Stems:</strong> ${enq.featureA.stems}
        </div>
        <div class="task-line" style="height: 7.5mm;"></div>
        <div class="task-line" style="height: 7.5mm;"></div>
        <div class="task-line" style="height: 7.5mm;"></div>
        <div class="task-line" style="height: 7.5mm;"></div>
        <div class="task-line" style="height: 7.5mm;"></div>
      </div>

      <!-- Question 1(b): Describe One Key Feature [2 marks] -->
      <div class="task-section" style="border: 1.2px solid #000000; border-radius: 3px; padding: 4px 6px; background: #ffffff; margin-bottom: 3px;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000000; padding-bottom: 2px; margin-bottom: 2px;">
          <div style="display: flex; align-items: center; gap: 5px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 8.4pt; text-transform: uppercase; letter-spacing: 0.5px;">
              &bull; Question 1(b): Describe One Key Feature [2 marks &bull; 3 mins]
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; background: #000000; color: #ffffff; padding: 1px 4px; border-radius: 2px;">
              ${featBProb}
            </span>
          </div>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; border: 1px solid #000000; padding: 0 4px; border-radius: 2px; background: #f8fafc;">
            ${enq.featureB.provenance || 'EDEXCEL PAPER 2'}
          </span>
        </div>
        <p style="font-family: 'Playfair Display', serif; font-size: 9.4pt; font-weight: 800; color: #000000; margin: 1px 0 2px 0; line-height: 1.2;">
          ${enq.featureB.stem}
        </p>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-style: italic; color: #333333; margin-bottom: 1px; line-height: 1.15;">
          <strong>Target Guidance:</strong> ${enq.featureB.guidance}
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 700; margin-bottom: 2px;">
          <strong>Sentence Stems:</strong> ${enq.featureB.stems}
        </div>
        <div class="task-line" style="height: 7.5mm;"></div>
        <div class="task-line" style="height: 7.5mm;"></div>
        <div class="task-line" style="height: 7.5mm;"></div>
        <div class="task-line" style="height: 7.5mm;"></div>
        <div class="task-line" style="height: 7.5mm;"></div>
      </div>

      <!-- Core Disciplinary Vocabulary Bridge -->
      <div class="task-section" style="border: 1.2px solid #000000; border-radius: 3px; padding: 4px 6px; background: #fdfdfd; margin-bottom: 3px;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000000; padding-bottom: 1px; margin-bottom: 2px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; text-transform: uppercase; letter-spacing: 0.5px;">
            &bull; Core Specification Vocabulary Distinction
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 700; border: 1px solid #000000; padding: 0 4px; border-radius: 2px;">PEARSON EDEXCEL SPECIFICATION</span>
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #000000; line-height: 1.18;">
          ${enq.vocabPrompt}
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.1pt; color: #1e3a8a; line-height: 1.15; margin: 1px 0;">
          <strong>Sentence Starter:</strong> <em>While ${enq.vocabTermA} refers specifically to..., ${enq.vocabTermB} operated differently because...</em>
        </div>
        <div class="task-line" style="height: 7.0mm;"></div>
        <div class="task-line" style="height: 7.0mm;"></div>
        <div class="task-line" style="height: 7.0mm;"></div>
        <div class="task-line" style="height: 7.0mm;"></div>
      </div>

      <!-- Timeline Mission Box with Draft Sketchpad -->
      <div style="border: 1.2px solid #000000; border-left: 3.5px solid #000000; border-radius: 3px; padding: 4px 8px; background: #ffffff;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 900; background: #000000; color: #ffffff; padding: 1px 5px; border-radius: 2px; text-transform: uppercase;">
            Timeline Mission &bull; Pages 2–3
          </span>
          <span style="border: 1px solid #000000; padding: 1px 5px; border-radius: 2px; font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800;">
            [ &nbsp;&nbsp; ] Sketch Completed
          </span>
        </div>
        <div style="font-family: 'Georgia', serif; font-size: 8.0pt; color: #000000; line-height: 1.22;">
          ${enq.rightExam.timelineMission}
        </div>
        <div style="border-top: 1px dashed #94a3b8; height: 38mm; margin-top: 3px; background: #fafafa; border-radius: 2px; display: flex; align-items: center; justify-content: center;">
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b; font-style: italic;">
            Optional Draft Sketchpad &bull; Practice your visual dual-coding icon before transferring to Pages 2–3
          </span>
        </div>
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

  // 14 Ruled lines for first page
  const leftTaskLines = Array.from(
    { length: 14 },
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

      <!-- Connectives & Word Bank -->
      <div style="border: 1px solid #000000; padding: 2px 5px; background: #ffffff; margin-bottom: 2px; font-family: 'Inter', sans-serif; font-size: 7.0pt; line-height: 1.18;">
        <div><strong>Analytical Connectives:</strong> ${rx.connectives}</div>
        <div style="margin-top: 1px;"><strong>Word Bank:</strong> ${rx.wordBank}</div>
      </div>

      <!-- Ruled Task Lines Prompt -->
      <div style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-style: italic; color: #222222; margin: 1px 0;">
        <strong>Task:</strong> Using the structure strip above, write your analytical response below (continue on facing page for full timed response):
      </div>

      <!-- 14 Ruled Lines with 22mm Left Margin -->
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
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; border: 1.2px solid #000000; border-radius: 4px; padding: 4px 6px; background: #ffffff;">
        <div style="border-bottom: 1.2px solid #000000; padding-bottom: 2px; margin-bottom: 3px; display: flex; justify-content: space-between; align-items: center;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; text-transform: uppercase; color: #000000;">
            Enquiry ${data.keyTopicNum}.${enq.enquiryNum}: ${enq.title}
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; border: 1px solid #000000; padding: 0 4px; border-radius: 2px;">
            [ &nbsp;&nbsp;&nbsp;&nbsp; / 10 ]
          </span>
        </div>
        <div style="display: flex; flex-direction: column; flex: 1; justify-content: space-between; min-height: 0;">
          ${enq.doNow
            .map(
              (item, qi) => `
          <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; padding-top: 1px; min-height: 0;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 4px;">
              <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 700; color: #000000; line-height: 1.15;">
                ${startNum + qi}. ${item.q}
              </span>
              <span style="font-family: 'Inter', sans-serif; font-size: 6.0pt; color: #555555; white-space: nowrap; flex-shrink: 0; padding-top: 1px;">
                [ ] R1 &nbsp; [ ] R2 &nbsp; [ ] R3
              </span>
            </div>
            <div style="flex: 1; min-height: 3.8mm;"></div>
            <div style="border-bottom: 1.2px dotted #000000; width: 100%; margin-bottom: 1px;"></div>
          </div>
          `,
            )
            .join('')}
        </div>
      </div>`;
  }

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

        <div style="border: 1px solid #000000; border-left: 3.5px solid #000000; padding: 2px 6px; background: #f8fafc; margin-bottom: 4px; font-family: 'Inter', sans-serif; font-size: 7.2pt; line-height: 1.2;">
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

  // Page 23 (Enquiries 3 & 4)
  const page23Html = `
  <!-- PAGE 23: SYNOPTIC RETRIEVAL VAULT PART 2 (ENQUIRIES 3 & 4) -->
  <div class="page page-container recto-page" id="page-23" style="padding: 4mm 6mm;">
    <div class="page-body-full">
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

        <div style="border: 1px solid #000000; border-left: 3.5px solid #000000; padding: 2px 6px; background: #f8fafc; margin-bottom: 4px; font-family: 'Inter', sans-serif; font-size: 7.2pt; line-height: 1.2;">
          <strong>Spaced Retention Target:</strong> Test yourself on previous weeks’ topics before starting a new enquiry. Frequent low-stakes retrieval prevents forgetting and secures Level 4 factual precision.
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; flex: 1; min-height: 0;">
        ${renderDrillColumn(enq3, 21)}
        ${renderDrillColumn(enq4, 31)}
      </div>

      ${renderFooterStrip(23, footers[22], 24)}
    </div>
  </div>`;

  return page22Html + page23Html;
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
      border-bottom: 1.5px solid #000000;
      height: 7.0mm;
      margin: 0;
      box-sizing: border-box;
    }
    .task-line-dotted {
      border-bottom: 1.2px dotted #000000;
      height: 6.0mm;
      margin: 0;
      box-sizing: border-box;
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
  // PAGE 12: CARTOGRAPHIC & ARCHIVAL VISUAL BLUEPRINT (VERSO)
  // ====================================================================
  let page12Content = '';
  if (ktId === 'KT1') {
    page12Content = `
      <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 4px;">
        <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 11pt; color: #000000; text-transform: uppercase; font-weight: 800;">
          Archival &amp; Conceptual Blueprint &bull; Structure of Government &amp; Religious Spectrum
        </h2>
      </div>
      
      <!-- Top Half: Government Anatomy -->
      <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 6px 10px; margin-bottom: 6px; background: #ffffff;">
        <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; text-transform: uppercase; display: block; border-bottom: 1.2px solid #000000; padding-bottom: 2px; margin-bottom: 4px;">
          1. Anatomy of Elizabethan Government: Power, Patronage &amp; Prerogative
        </strong>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-family: 'Inter', sans-serif; font-size: 7.8pt; line-height: 1.22;">
          <div style="border: 1px solid #cbd5e1; padding: 4px; border-radius: 3px; background: #f8fafc;">
            <strong style="color: #000000; display: block;">👑 The Monarch (Queen Elizabeth I):</strong>
            Ruled by Divine Right. Controlled Royal Prerogative: deciding foreign policy, declaring war, marriage, and religion. Could summon and dismiss Parliament at will.
          </div>
          <div style="border: 1px solid #cbd5e1; padding: 4px; border-radius: 3px; background: #f8fafc;">
            <strong style="color: #000000; display: block;">🏛️ The Privy Council (Led by William Cecil):</strong>
            Approx. 19 trusted senior advisors who met daily. Managed government expenditure, state security, military logistics, and drafted royal legislation.
          </div>
          <div style="border: 1px solid #cbd5e1; padding: 4px; border-radius: 3px; background: #f8fafc;">
            <strong style="color: #000000; display: block;">⚖️ Parliament (Lords &amp; Commons):</strong>
            Met only 10 times in 44 years. Crucial power: approving extraordinary taxation (subsidies) and passing statute laws. Free speech was strictly limited by the Queen.
          </div>
          <div style="border: 1px solid #cbd5e1; padding: 4px; border-radius: 3px; background: #f8fafc;">
            <strong style="color: #000000; display: block;">🛡️ Lords Lieutenant &amp; Justices of the Peace (JPs):</strong>
            Lords Lieutenant trained county militias. Unpaid JPs (gentry) enforced laws locally: collected taxes, regulated wages, punished beggars, and tracked recusants.
          </div>
        </div>
      </div>

      <!-- Bottom Half: The Religious Settlement Spectrum -->
      <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 6px 10px; flex: 1; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;">
        <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; text-transform: uppercase; display: block; border-bottom: 1.2px solid #000000; padding-bottom: 2px; margin-bottom: 4px;">
          2. The Elizabethan Religious Spectrum: Radical Puritanism vs The Middle Way vs Roman Catholicism
        </strong>
        <div style="display: grid; grid-template-columns: 1fr 1.2fr 1fr; gap: 6px; font-family: 'Inter', sans-serif; font-size: 7.6pt; line-height: 1.2; flex: 1;">
          <div style="border: 1.5px solid #000000; padding: 4px; border-radius: 3px; background: #ffffff;">
            <strong style="font-size: 8pt; color: #000000; display: block; border-bottom: 1px solid #000000; padding-bottom: 1px; margin-bottom: 2px; text-align: center;">
              PURITAN REFORMERS
            </strong>
            &bull; Leader: John Calvin (Geneva)<br>
            &bull; Church Government: Committees of presbyters (no bishops)<br>
            &bull; Services: Plain English, long sermons<br>
            &bull; Ornaments: No vestments (surplices), no crucifixes, plain communion tables<br>
            &bull; Sacraments: 2 (Baptism &amp; Communion)<br>
            &bull; Attitude to Queen: Wanted further radical purification
          </div>
          <div style="border: 2px solid #000000; padding: 4px; border-radius: 3px; background: #f8fafc;">
            <strong style="font-size: 8pt; color: #000000; display: block; border-bottom: 1.5px solid #000000; padding-bottom: 1px; margin-bottom: 2px; text-align: center;">
              ELIZABETH’S VIA MEDIA (1559)
            </strong>
            &bull; Supreme Governor: Queen Elizabeth I<br>
            &bull; Hierarchy: Kept Archbishops and Bishops<br>
            &bull; Services: English Book of Common Prayer<br>
            &bull; Ornaments: Clergy wear white surplice; candles and music permitted<br>
            &bull; Communion: Deliberately ambiguous wording accepting spiritual presence<br>
            &bull; Recusancy: 1 shilling fine for non-attendance
          </div>
          <div style="border: 1.5px solid #000000; padding: 4px; border-radius: 3px; background: #ffffff;">
            <strong style="font-size: 8pt; color: #000000; display: block; border-bottom: 1px solid #000000; padding-bottom: 1px; margin-bottom: 2px; text-align: center;">
              ROMAN CATHOLIC CHURCH
            </strong>
            &bull; Supreme Head: The Pope in Rome<br>
            &bull; Hierarchy: Cardinals, Bishops, Priests<br>
            &bull; Services: Traditional Latin Mass<br>
            &bull; Ornaments: Rich embroidered vestments, crucifixes, statues of saints, altars<br>
            &bull; Sacraments: 7 Sacraments<br>
            &bull; Transubstantiation: Bread &amp; wine become the literal body of Christ
          </div>
        </div>
      </div>
    `;
  } else if (ktId === 'KT2') {
    page12Content = `
      <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 4px;">
        <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 11pt; color: #000000; text-transform: uppercase; font-weight: 800;">
          Naval Tactics &amp; Strategic Map &bull; The Spanish Armada (1588)
        </h2>
      </div>

      <!-- Top Half: Map Summary -->
      <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 6px 10px; margin-bottom: 6px; background: #ffffff;">
        <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; text-transform: uppercase; display: block; border-bottom: 1.2px solid #000000; padding-bottom: 2px; margin-bottom: 4px;">
          1. The Strategic Route of the Armada: Plymouth to Gravelines &amp; The Atlantic Retreat
        </strong>
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; font-family: 'Inter', sans-serif; font-size: 7.6pt; line-height: 1.2;">
          <div style="border: 1px solid #cbd5e1; padding: 3px; border-radius: 2px; background: #f8fafc;">
            <strong>① The Channel (July):</strong> 130 Spanish ships in tight crescent formation sail past Plymouth and the Isle of Wight. English long-range fire inflicts minor damage.
          </div>
          <div style="border: 1px solid #cbd5e1; padding: 3px; border-radius: 2px; background: #f8fafc;">
            <strong>② Calais Roads (7 Aug):</strong> Armada anchors waiting for Parma. Midnight English fireships scatter Spanish fleet, forcing captains to cut anchor cables.
          </div>
          <div style="border: 1px solid #cbd5e1; padding: 3px; border-radius: 2px; background: #f8fafc;">
            <strong>③ Gravelines (8 Aug):</strong> Close-range artillery duel. English race-built galleons pummel drifting Spanish ships with rapid-fire culverins; 5 galleons sunk.
          </div>
          <div style="border: 1px solid #cbd5e1; padding: 3px; border-radius: 2px; background: #f8fafc;">
            <strong>④ The Retreat (Aug–Sept):</strong> South-westerly gales drive Armada around Scotland and Ireland. Lacking anchors, over 40 ships wreck on Atlantic reefs.
          </div>
        </div>
      </div>

      <!-- Bottom Half: Naval Technology Comparison -->
      <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 6px 10px; flex: 1; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;">
        <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; text-transform: uppercase; display: block; border-bottom: 1.2px solid #000000; padding-bottom: 2px; margin-bottom: 4px;">
          2. Naval Architecture: Hawkins’ Race-Built Galleon vs The Spanish Imperial Carrack
        </strong>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-family: 'Inter', sans-serif; font-size: 7.8pt; line-height: 1.22; flex: 1;">
          <div style="border: 1.5px solid #000000; padding: 5px; border-radius: 3px; background: #ffffff;">
            <strong style="font-size: 8.2pt; color: #000000; display: block; border-bottom: 1px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
              🇬🇧 English Race-Built Galleon (*Revenge*, *Ark Royal*)
            </strong>
            &bull; Designer: Sir John Hawkins (Treasurer of the Navy)<br>
            &bull; Hull Design: Lower forecastles and aftercastles; streamlined hull for superior speed, maneuverability, and pointing into the wind<br>
            &bull; Armament: Armed with long-range bronze <strong>culverins</strong> mounted on compact four-wheeled truck carriages<br>
            &bull; Gunnery Doctrine: Trained gun crews could reload and fire broadsides rapidly from standoff range, avoiding boarding combat<br>
            &bull; Tactical Goal: Batter enemy hulls and rigging from safe artillery distance
          </div>
          <div style="border: 1.5px solid #000000; padding: 5px; border-radius: 3px; background: #ffffff;">
            <strong style="font-size: 8.2pt; color: #000000; display: block; border-bottom: 1px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
              🇪🇸 Spanish Imperial Galleon / Carrack (*San Martín*)
            </strong>
            &bull; Commander: Duke of Medina Sidonia<br>
            &bull; Hull Design: High towering wooden forecastles and sterncastles designed as floating wooden fortresses for infantry<br>
            &bull; Armament: Heavy short-range cannon and demi-cannon mounted on clumsy two-wheeled field carriages<br>
            &bull; Gunnery Doctrine: Soldiers fired muskets from high castles while gunners reloaded outside ship hulls (extremely slow)<br>
            &bull; Tactical Goal: Grapple enemy ships, board with veteran Spanish infantry, and capture vessels in hand-to-hand combat
          </div>
        </div>
      </div>
    `;
  } else {
    page12Content = `
      <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 4px;">
        <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 11pt; color: #000000; text-transform: uppercase; font-weight: 800;">
          Cultural &amp; Global Blueprint &bull; The Elizabethan Playhouse &amp; Voyages of Discovery
        </h2>
      </div>

      <!-- Top Half: Globe Playhouse Anatomy -->
      <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 6px 10px; margin-bottom: 6px; background: #ffffff;">
        <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; text-transform: uppercase; display: block; border-bottom: 1.2px solid #000000; padding-bottom: 2px; margin-bottom: 4px;">
          1. Anatomy of an Elizabethan Playhouse: The Globe &amp; The Swan (Bankside)
        </strong>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; font-family: 'Inter', sans-serif; font-size: 7.6pt; line-height: 1.2;">
          <div style="border: 1px solid #cbd5e1; padding: 4px; border-radius: 2px; background: #f8fafc;">
            <strong>① The Heavens &amp; Roof:</strong> Painted canopy ceiling over the stage supported by wooden pillars; housed winches, ropes, and cannons for special effects.
          </div>
          <div style="border: 1px solid #cbd5e1; padding: 4px; border-radius: 2px; background: #f8fafc;">
            <strong>② The Yard / Pit:</strong> Unroofed earthen standing area surrounding the thrust stage; held up to 1,000 "groundlings" who paid 1 penny to watch in all weathers.
          </div>
          <div style="border: 1px solid #cbd5e1; padding: 4px; border-radius: 2px; background: #f8fafc;">
            <strong>③ Tiered Galleries &amp; Lords:</strong> Three tiers of covered wooden seating (2–3 pence); exclusive Lords’ Rooms above the stage cost 6 pence for aristocratic display.
          </div>
        </div>
      </div>

      <!-- Bottom Half: Global Exploration Map Summary -->
      <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 6px 10px; flex: 1; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;">
        <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; text-transform: uppercase; display: block; border-bottom: 1.2px solid #000000; padding-bottom: 2px; margin-bottom: 4px;">
          2. Elizabethan Global Exploration: Drake’s Circumnavigation &amp; The Virginia Colonies
        </strong>
        <div style="display: grid; grid-template-columns: 1.1fr 1fr; gap: 8px; font-family: 'Inter', sans-serif; font-size: 7.8pt; line-height: 1.22; flex: 1;">
          <div style="border: 1.5px solid #000000; padding: 5px; border-radius: 3px; background: #ffffff;">
            <strong style="font-size: 8.2pt; color: #000000; display: block; border-bottom: 1px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
              🧭 Drake’s Global Track (1577–1580)
            </strong>
            &bull; Route: Departed Plymouth &rarr; Cape Verde &rarr; Brazil &rarr; Strait of Magellan (Cape Horn) &rarr; Valparaíso &rarr; Lima &rarr; California (Nova Albion) &rarr; Pacific Crossing &rarr; Moluccas (Ternate) &rarr; Cape of Good Hope &rarr; Plymouth.<br>
            &bull; Achievements: First English circumnavigation, claimed California for Elizabeth, broke Spanish Pacific exclusivity, secured clove treaty with Sultan of Ternate, returned with £140,000 in silver bullion.
          </div>
          <div style="border: 1.5px solid #000000; padding: 5px; border-radius: 3px; background: #ffffff;">
            <strong style="font-size: 8.2pt; color: #000000; display: block; border-bottom: 1px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
              🌲 Raleigh’s Virginia Colonisation (1585–1587)
            </strong>
            &bull; 1585 First Colony: Ralph Lane and 107 soldiers settle Roanoke Island. Flagship *Tiger* floods seeds; settlers fail to farm, rely on Secotan handouts, alienate Chief Wingina, and evacuate with Drake in 1586.<br>
            &bull; 1587 Second Colony ("Lost Colony"): John White leads 118 civilian men, women, and children. White returns in 1590 after Armada delays; colony has vanished, leaving only "CROATOAN".
          </div>
        </div>
      </div>
    `;
  }

  html += `
  <div class="page page-container verso-page" id="page-20" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      ${page12Content}
      ${renderFooterStrip(20, footers[19], 24)}
    </div>
  </div>
`;

  // ====================================================================
  // PAGE 13: MASTER KNOWLEDGE ORGANISER (RECTO)
  // ====================================================================
  let koConcepts = [];
  let koDates = [];
  let koFigures = [];

  if (ktId === 'KT1') {
    koConcepts = [
      {
        t: 'Royal Prerogative',
        d: 'The monarch’s exclusive customary powers over foreign policy, declaring war, marriage, and religion.',
      },
      {
        t: 'Privy Council',
        d: 'A committee of around 19 trusted noble advisers who met daily to run government, finance, and security.',
      },
      {
        t: 'Via Media',
        d: 'The "Middle Way": Elizabeth’s religious settlement balancing Protestant doctrine with traditional ritual.',
      },
      {
        t: 'Act of Supremacy (1559)',
        d: 'Established Elizabeth as "Supreme Governor" of the Church of England, requiring all clergy to take an oath.',
      },
      {
        t: 'Act of Uniformity (1559)',
        d: 'Mandated the Book of Common Prayer, church ornaments, vestments, and imposed a 1s recusancy fine.',
      },
      {
        t: 'Recusancy',
        d: 'Refusing to attend compulsory Church of England Sunday services; practiced by devout Roman Catholics.',
      },
      {
        t: 'Vestments Controversy',
        d: '1566 crisis where 37 Puritan vicars were suspended for refusing Archbishop Parker’s order to wear surplices.',
      },
      {
        t: 'Succession',
        d: 'The legal right to inherit the crown; Elizabeth refused to name a successor throughout her reign.',
      },
    ];
    koDates = [
      '1558: Elizabeth succeeds Mary I',
      '1559: Act of Supremacy passed',
      '1559: Act of Uniformity passed',
      '1559: Royal Injunctions issued',
      '1560: Treaty of Edinburgh signed',
      '1566: Vestments Controversy (Parker)',
      '1567: Murder of Lord Darnley',
      '1568: Mary Stuart flees to England',
      '1568–69: York & Westminster inquiry',
      '1569: Northern Earls revolt breaks out',
    ];
    koFigures = [
      {
        n: 'Queen Elizabeth I',
        r: 'Tudor monarch (1558–1603); established Protestant settlement and resisted marriage.',
      },
      {
        n: 'Sir William Cecil',
        r: 'Principal Secretary & Lord Burghley; Elizabeth’s most trusted Protestant statesman.',
      },
      {
        n: 'Matthew Parker',
        r: 'Archbishop of Canterbury (1559–75); drafted the 1566 Book of Advertisements.',
      },
      {
        n: 'Mary, Queen of Scots',
        r: 'Catholic cousin of Elizabeth; claimed English throne; fled Scotland in 1568.',
      },
      {
        n: 'Philip II of Spain',
        r: 'Catholic king of Spain and Netherlands; former husband of Mary I; rival to Elizabeth.',
      },
      {
        n: 'Robert Dudley',
        r: 'Earl of Leicester; Master of the Horse, royal favourite, and leading Puritan patron at court.',
      },
    ];
  } else if (ktId === 'KT2') {
    koConcepts = [
      {
        t: 'Papal Bull (1570)',
        d: '*Regnans in Excelsis*: Pope Pius V excommunicated Elizabeth, releasing subjects from loyalty.',
      },
      {
        t: 'Privateering',
        d: 'State-licensed raiding of enemy merchant shipping by armed private vessels holding letters of marque.',
      },
      {
        t: 'Bond of Association (1584)',
        d: 'Pledge by Englishmen to execute anyone involved in an assassination attempt against Elizabeth.',
      },
      {
        t: 'Treaty of Nonsuch (1585)',
        d: 'Official military alliance committing 7,400 English soldiers under Robert Dudley to aid Dutch rebels.',
      },
      {
        t: 'Singeing the King’s Beard',
        d: 'Drake’s April 1587 raid on Cadiz harbour destroying 30 ships and delaying the Armada by a year.',
      },
      {
        t: 'Galleon',
        d: 'A large, multi-decked warship designed for ocean navigation and long-range cannon fire.',
      },
      {
        t: 'Culverin',
        d: 'Long-range English bronze naval cannon mounted on truck carriages for rapid reloading.',
      },
      {
        t: 'Battle of Gravelines (1588)',
        d: 'Decisive naval clash off Flanders where English artillery battered scattered Spanish warships.',
      },
    ];
    koDates = [
      '1569: Revolt of the Northern Earls',
      '1570: Papal Bull excommunicates Queen',
      '1571: Ridolfi Plot uncovered',
      '1577–80: Drake circumnavigates world',
      '1583: Throckmorton Plot uncovered',
      '1584: Treaty of Joinville (Spain/France)',
      '1585: Treaty of Nonsuch signed',
      '1586: Babington Plot ciphers cracked',
      'Feb 1587: Mary Stuart executed',
      'July–Aug 1588: Spanish Armada defeated',
    ];
    koFigures = [
      {
        n: 'Sir Francis Walsingham',
        r: 'Principal Secretary & Spymaster General; uncovered Ridolfi, Throckmorton, and Babington plots.',
      },
      {
        n: 'Sir Francis Drake',
        r: 'Privateer, navigator, and vice-admiral; raided Cadiz in 1587 and commanded at Gravelines.',
      },
      {
        n: 'Duke of Medina Sidonia',
        r: 'Spanish grandee appointed by Philip II to command the 130 ships of the Armada.',
      },
      {
        n: 'Duke of Parma',
        r: 'Brilliant general commanding Spain’s 27,000-man veteran Army of Flanders.',
      },
      {
        n: 'Anthony Babington',
        r: 'Catholic gentleman whose coded letters to Mary Stuart triggered her trial and execution.',
      },
      {
        n: 'Sir John Hawkins',
        r: 'Treasurer of the Navy; designed English race-built galleons and developed naval gunnery.',
      },
    ];
  } else {
    koConcepts = [
      {
        t: 'Grammar School',
        d: 'Fee-paying secondary school for boys aged 7–14; over 70 established under Elizabeth.',
      },
      {
        t: 'Petty School',
        d: 'Early elementary school for young boys run in a teacher’s home, teaching basic reading and writing.',
      },
      {
        t: 'Enclosure',
        d: 'Fencing common arable land into private pastures for sheep farming, dispossessing farm labourers.',
      },
      {
        t: 'Impotent Poor',
        d: 'The elderly, sick, and disabled unable to work; categorized as "deserving" of parish relief.',
      },
      {
        t: 'Sturdy Beggars',
        d: 'Able-bodied vagrants categorized as "idle"; punished by whipping and forced labour.',
      },
      {
        t: 'Houses of Correction',
        d: 'Bridewell workhouses created by the 1576 Poor Act to punish idle vagrants with hard labour.',
      },
      {
        t: 'Astrolabe',
        d: 'Navigation tool measuring the altitude of sun and stars to calculate latitude at sea.',
      },
      {
        t: 'Colony',
        d: 'A new overseas settlement established, populated, and governed by people from another country.',
      },
    ];
    koDates = [
      '1572: Vagabonds Act passed',
      '1576: Act for Relief of the Poor',
      "1576: Burbage builds 'The Theatre'",
      '1577: Drake sails on *Golden Hind*',
      '1580: Drake returns to Deptford',
      '1584: Raleigh receives Virginia patent',
      '1585: First Roanoke colony founded',
      '1586: Drake rescues Roanoke settlers',
      '1587: Second Roanoke settlement',
      '1590: White finds "CROATOAN" post',
    ];
    koFigures = [
      {
        n: 'Sir Walter Raleigh',
        r: 'Courtier, poet, and explorer; organized and financed the Virginia colonization expeditions.',
      },
      {
        n: 'James Burbage',
        r: "Actor and builder; constructed 'The Theatre' in 1576, London’s first public playhouse.",
      },
      {
        n: 'William Shakespeare',
        r: 'Playwright and actor; joined the Lord Chamberlain’s Men; shaped Elizabethan culture.',
      },
      {
        n: 'Ralph Lane',
        r: 'Governor of the 1585 Roanoke colony; military officer whose brutality alienated native tribes.',
      },
      {
        n: 'John White',
        r: 'Artist and governor of the 1587 "Lost Colony"; painted watercolors of Native American life.',
      },
      {
        n: 'Chief Wingina',
        r: 'Secotan tribal chief on Roanoke Island; initially aided English, killed by Lane in 1586.',
      },
    ];
  }

  html += `
  <div class="page page-container recto-page" id="page-21" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 4px;">
        <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 11pt; color: #000000; text-transform: uppercase; font-weight: 800;">
          Master Knowledge Organiser &bull; Key Topic ${data.keyTopicNum}: ${data.title}
        </h2>
      </div>

      <!-- 8 Disciplinary Concepts -->
      <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 8px; margin-bottom: 4px; background: #ffffff;">
        <strong style="font-family: 'Inter', sans-serif; font-size: 8.6pt; text-transform: uppercase; display: block; border-bottom: 1.2px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
          1. Core Disciplinary Vocabulary &amp; Conceptual Definitions
        </strong>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3px 10px; font-family: 'Inter', sans-serif; font-size: 7.6pt; line-height: 1.18;">
          ${koConcepts
            .map(
              (c) => `
          <div><strong>&bull; ${c.t}:</strong> ${c.d}</div>
          `,
            )
            .join('')}
        </div>
      </div>

      <!-- 10 Chronological Anchors & 6 Historical Figures -->
      <div style="display: grid; grid-template-columns: 1fr 1.3fr; gap: 6px; flex: 1;">
        
        <!-- 10 Chronological Milestones -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 6px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.4pt; text-transform: uppercase; display: block; border-bottom: 1px solid #000000; padding-bottom: 2px; margin-bottom: 2px;">
            2. Essential Chronology
          </strong>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.4pt; line-height: 1.22; display: flex; flex-direction: column; justify-content: space-between; flex: 1;">
            ${koDates
              .map(
                (d) => `
            <div><strong>&bull;</strong> ${d}</div>
            `,
              )
              .join('')}
          </div>
        </div>

        <!-- 6 Historical Figures Matrix -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 6px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.4pt; text-transform: uppercase; display: block; border-bottom: 1px solid #000000; padding-bottom: 2px; margin-bottom: 2px;">
            3. Key Historical Figures Matrix
          </strong>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.4pt; line-height: 1.2; display: flex; flex-direction: column; justify-content: space-between; flex: 1;">
            ${koFigures
              .map(
                (f) => `
            <div><strong>&bull; ${f.n}:</strong> ${f.r}</div>
            `,
              )
              .join('')}
          </div>
        </div>

      </div>

      ${renderFooterStrip(21, footers[20], 24)}
    </div>
  </div>
`;

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
  let cumulativeExamTotal = 0;

  data.enquiries.forEach((enq, idx) => {
    const leftPageNum = idx * 4 + 4;
    const rightPageNum = idx * 4 + 5;
    const extTariff = enq.rightExam.type === 'explain_why_12' ? 12 : 16;
    const extLabel = enq.rightExam.type === 'explain_why_12' ? 'Q2 Explain Why' : 'Q3 Essay';
    cumulativeExamTotal += 2 + 2 + extTariff;

    const featAText = cleanStem(enq.featureA?.stem);
    const featBText = cleanStem(enq.featureB?.stem);
    let extText = enq.rightExam?.stem || 'Extended Writing Task';
    if (extText.length > 68) extText = extText.slice(0, 65) + '...';

    examRowsHtml += `
      <tr style="border-top: 1.5px solid #000000; border-bottom: 1px solid #cbd5e1; background: #ffffff;">
        <td rowspan="3" style="padding: 3.5px 4px; text-align: center; font-weight: 900; font-size: 8.2pt; border-right: 1.2px solid #000000; vertical-align: middle; background: #f8fafc;">
          ${data.keyTopicNum}.${enq.enquiryNum}
        </td>
        <td rowspan="3" style="padding: 3.5px 6px; border-right: 1.2px solid #000000; vertical-align: middle; background: #ffffff;">
          <strong style="font-size: 7.6pt; text-transform: uppercase; color: #000000; display: block; line-height: 1.15;">
            Enquiry ${data.keyTopicNum}.${enq.enquiryNum}: ${enq.title}
          </strong>
          <span style="font-size: 6.8pt; color: #475569; display: block; margin-top: 2px;">
            Do Now Retrieval (p. ${leftPageNum}): [ &nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 10</strong> ]
          </span>
        </td>
        <td style="padding: 3px 4px; text-align: center; border-right: 1px solid #000000; font-size: 7.4pt; font-weight: 800; background: #fafafa;">
          p. ${rightPageNum}
        </td>
        <td style="padding: 3px 6px; border-right: 1px solid #000000; font-size: 7.3pt; font-weight: 600;">
          <strong>Q1(a) Feature:</strong> ${featAText} [2m]
        </td>
        <td style="padding: 3px 4px; text-align: center; border-right: 1px solid #000000; font-size: 7.4pt; font-weight: 700;">
          [ &nbsp;<strong>___ / ___</strong>&nbsp; ]
        </td>
        <td style="padding: 3px 4px; text-align: center; border-right: 1px solid #000000; font-size: 8.0pt; font-weight: 800; white-space: nowrap;">
          [ &nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 2</strong> ]
        </td>
        <td style="padding: 3px 4px; text-align: center; font-size: 6.8pt; color: #444444; white-space: nowrap;">
          [ ] Done &nbsp; [ ] Redraft
        </td>
      </tr>
      <tr style="border-bottom: 1px solid #cbd5e1; background: #ffffff;">
        <td style="padding: 3px 4px; text-align: center; border-right: 1px solid #000000; font-size: 7.4pt; font-weight: 800; background: #fafafa;">
          p. ${rightPageNum}
        </td>
        <td style="padding: 3px 6px; border-right: 1px solid #000000; font-size: 7.3pt; font-weight: 600;">
          <strong>Q1(b) Feature:</strong> ${featBText} [2m]
        </td>
        <td style="padding: 3px 4px; text-align: center; border-right: 1px solid #000000; font-size: 7.4pt; font-weight: 700;">
          [ &nbsp;<strong>___ / ___</strong>&nbsp; ]
        </td>
        <td style="padding: 3px 4px; text-align: center; border-right: 1px solid #000000; font-size: 8.0pt; font-weight: 800; white-space: nowrap;">
          [ &nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 2</strong> ]
        </td>
        <td style="padding: 3px 4px; text-align: center; font-size: 6.8pt; color: #444444; white-space: nowrap;">
          [ ] Done &nbsp; [ ] Redraft
        </td>
      </tr>
      <tr style="border-bottom: 1.5px solid #000000; background: #ffffff;">
        <td style="padding: 3px 4px; text-align: center; border-right: 1px solid #000000; font-size: 7.4pt; font-weight: 800; background: #fafafa;">
          p. ${rightPageNum}
        </td>
        <td style="padding: 3px 6px; border-right: 1px solid #000000; font-size: 7.3pt; font-weight: 600;">
          <strong>${extLabel}:</strong> ${extText} [${extTariff}m]
        </td>
        <td style="padding: 3px 4px; text-align: center; border-right: 1px solid #000000; font-size: 7.4pt; font-weight: 700;">
          [ &nbsp;<strong>___ / ___</strong>&nbsp; ]
        </td>
        <td style="padding: 3px 4px; text-align: center; border-right: 1px solid #000000; font-size: 8.0pt; font-weight: 800; white-space: nowrap;">
          [ &nbsp;&nbsp;&nbsp;&nbsp; <strong>/ ${extTariff}</strong> ]
        </td>
        <td style="padding: 3px 4px; text-align: center; font-size: 6.8pt; color: #444444; white-space: nowrap;">
          [ ] Done &nbsp; [ ] Redraft
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
        if (specSnippet.length > 50) specSnippet = specSnippet.slice(0, 48) + '...';
      }

      return `
      <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 5px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between; text-align: center; flex: 1; box-sizing: border-box;">
        
        <!-- Card Header -->
        <div style="border-bottom: 1.2px solid #000000; padding-bottom: 2px; margin-bottom: 2px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.0pt; font-weight: 900; text-transform: uppercase; color: #000000; display: block;">
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
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px; align-items: center; justify-content: center; margin: auto 0; padding: 2px 0;">
          
          <!-- Left QR: Digital Lesson -->
          <div style="display: flex; flex-direction: column; align-items: center;">
            <span style="font-family: 'Inter', sans-serif; font-size: 5.8pt; font-weight: 800; text-transform: uppercase; color: #000000; margin-bottom: 1.5px;">
              📖 Lesson
            </span>
            <div style="width: 18mm; height: 18mm; margin: 0 auto; background: #ffffff; padding: 1px; border: 1px solid #cbd5e1; border-radius: 3px; box-sizing: border-box;">
              ${lessonQrSvg}
            </div>
            <span style="font-family: 'Inter', sans-serif; font-size: 5.2pt; font-weight: 600; color: #475569; margin-top: 1.5px;">
              Read Online
            </span>
          </div>

          <!-- Right QR: Interactive Quiz -->
          <div style="display: flex; flex-direction: column; align-items: center;">
            <span style="font-family: 'Inter', sans-serif; font-size: 5.8pt; font-weight: 800; text-transform: uppercase; color: #000000; margin-bottom: 1.5px;">
              ⚡ 20-Q Quiz
            </span>
            <div style="width: 18mm; height: 18mm; margin: 0 auto; background: #ffffff; padding: 1px; border: 1px solid #cbd5e1; border-radius: 3px; box-sizing: border-box;">
              ${quizQrSvg}
            </div>
            <span style="font-family: 'Inter', sans-serif; font-size: 5.2pt; font-weight: 600; color: #475569; margin-top: 1.5px;">
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
      <div style="border: 1.5px solid #000000; border-radius: 4px; overflow: hidden; margin-bottom: 3px; box-sizing: border-box;">
        <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif;">
          <thead>
            <tr style="border-bottom: 1px solid #000000; background: #e2e8f0; color: #000000;">
              <th colspan="7" style="padding: 2.5px 6px; font-size: 7.5pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; text-align: left;">
                Master Exam Practice &amp; Homework Assessment Tracker &bull; Key Topic ${data.keyTopicNum}
              </th>
            </tr>
            <tr style="border-bottom: 1.5px solid #000000; background: #ffffff;">
              <th style="padding: 2.5px 3px; width: 28px; text-align: center; font-size: 7.5pt; font-weight: 900; border-right: 1.2px solid #000000;">#</th>
              <th style="padding: 2.5px 6px; text-align: left; font-size: 7.5pt; font-weight: 900; text-transform: uppercase; border-right: 1.2px solid #000000;">Enquiry &amp; Specification Topic</th>
              <th style="padding: 2.5px 4px; width: 34px; text-align: center; font-size: 7.3pt; font-weight: 900; text-transform: uppercase; border-right: 1px solid #000000;">Page</th>
              <th style="padding: 2.5px 6px; text-align: left; font-size: 7.5pt; font-weight: 900; text-transform: uppercase; border-right: 1px solid #000000;">Exam Practice Question &amp; Focus</th>
              <th style="padding: 2.5px 4px; width: 78px; text-align: center; font-size: 7.3pt; font-weight: 900; text-transform: uppercase; border-right: 1px solid #000000;">HW (Date)</th>
              <th style="padding: 2.5px 4px; width: 74px; text-align: center; font-size: 7.3pt; font-weight: 900; text-transform: uppercase; border-right: 1px solid #000000;">Mark Awarded</th>
              <th style="padding: 2.5px 4px; width: 88px; text-align: center; font-size: 7.3pt; font-weight: 900; text-transform: uppercase;">Teacher Check</th>
            </tr>
          </thead>
          <tbody>
            ${examRowsHtml}
            <tr style="background: #f8fafc; font-weight: 900; border-top: 2px solid #000000;">
              <td colspan="3" style="padding: 3px 6px; border-right: 1px solid #000000; text-transform: uppercase; font-size: 7.4pt;">
                Key Topic ${data.keyTopicNum} Cumulative Assessment Totals
              </td>
              <td style="padding: 3px 6px; border-right: 1px solid #000000; font-size: 7.3pt;">
                Do Now Retrieval Vault Total (pp. 22–23): [ <strong>&nbsp;&nbsp;&nbsp;&nbsp; / 40</strong> ]
              </td>
              <td style="padding: 3px 4px; border-right: 1px solid #000000; text-align: center; font-size: 7.2pt; color: #555555;">
                Key Topic Total
              </td>
              <td style="padding: 3px 4px; border-right: 1px solid #000000; text-align: center; white-space: nowrap; font-size: 7.8pt;">
                [ &nbsp;&nbsp;&nbsp; <strong>/ ${cumulativeExamTotal}</strong> ]
              </td>
              <td style="padding: 3px 4px; text-align: center; font-size: 7.8pt; font-weight: 900;">
                [ &nbsp;&nbsp;&nbsp; <strong>/ ${cumulativeExamTotal + 40}</strong> ]
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Interactive Digital Hub (Flex Absorbs Vertical Space) -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 4px 6px; background: #ffffff; flex: 1; display: flex; flex-direction: column; justify-content: space-between; margin-bottom: 2px; box-sizing: border-box;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid #000000; padding-bottom: 2px; margin-bottom: 3px; box-sizing: border-box;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; text-transform: uppercase; color: #000000;">
            📱 Interactive Digital Hub &bull; Smartphone QR Revision Access
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; color: #222222; font-weight: 700;">
            Scan to read full digital textbook narratives or take live 20-question self-marking quizzes
          </span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; text-align: center; flex: 1; box-sizing: border-box;">
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
