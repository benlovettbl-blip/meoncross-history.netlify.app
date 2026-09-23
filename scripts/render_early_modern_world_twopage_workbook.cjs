/**
 * History Revision Hub — Master Two-Page Spread Pupil Workbook Engine
 *
 * Target: units/early_modern_world (KS3 Year 8: The Early Modern World, 1450–1750)
 * Output: public/units/early_modern_world/pupil_workbook.html
 * HTML2:  units/early_modern_world/pupil_workbook.html
 * PDF:    public/pdfs/early_modern_world_pupil_workbook.pdf
 *
 * Gold Standard Publisher Architecture:
 * - Exact 20-Page A4 Pupil Workbook Standard (5 A3 Folded Spreads)
 * - Strict School Anonymity: 0 prohibited school identifiers; 100% institutional neutrality
 * - Page 1:  Master Front Cover with 98mm photo frame, pupil record card, syllabus overview
 * - Page 2:  Progress & Assessment Tracker (8 Lessons, Effort 1–5, Target Level, Teacher feedback)
 * - Page 3:  Curriculum Roadmap & Chronological Spine (c.1450–1750, 8 historical milestones)
 * - Pages 4–19: 8 Double-Page Enquiry Spreads:
 *     Lesson 1 (Pages 4–5):   Global Power in 1450 (Change & Continuity — Extended Writing)
 *     Lesson 2 (Pages 6–7):   Religious Conflict & Global Exploration (Dual-Source Utility — Template A: Tordesillas vs Hakluyt)
 *     Lesson 3 (Pages 8–9):   Trade to Empire: Mughal India & Native America (Causation — Extended Writing)
 *     Lesson 4 (Pages 10–11): Gunpowder Plot & Religious Volatility (Historical Significance — Extended Writing)
 *     Lesson 5 (Pages 12–13): The English Civil War & Execution of Charles I (Historiographical Debate — Template B: Whig vs Revisionist)
 *     Lesson 6 (Pages 14–15): The Economic Shift & Glorious Revolution (Turning Point Analysis — Extended Writing)
 *     Lesson 7 (Pages 16–17): Mechanics of Transatlantic Slave Trade (Historical Evidence — Extended Writing)
 *     Lesson 8 (Pages 18–19): Resistance to Slave Trade: Maroons & Rebellion (Agency & Significance — Extended Writing)
 * - Page 20: Master Outside Back Cover (Correction Codes, 4 Golden Rules, QR Hub, Department Colophon)
 */

const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');
const puppeteer = require('puppeteer');
const { renderKs3BackCover } = require('./components/render_standard_cover.cjs');

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
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" shape-rendering="crispEdges" style="width: 100%; height: 100%;"><path fill="#ffffff" d="M0,0h${size}v${size}H0z"/><path fill="#0f172a" d="${pathD.trim()}"/></svg>`;
}

function getBase64Image(relPath) {
  if (!relPath) return '';
  const clean = relPath.replace(/^\//, '');
  const candidates = [
    path.join(ROOT_DIR, 'public', clean),
    path.join(ROOT_DIR, clean),
    path.join(ROOT_DIR, 'public', 'images', path.basename(clean)),
    path.join(ROOT_DIR, 'images', path.basename(clean)),
    path.join(ROOT_DIR, 'units', 'early_modern_world', 'assets', path.basename(clean)),
    path.join(ROOT_DIR, 'public', 'units', 'early_modern_world', 'assets', path.basename(clean)),
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

// 8 Bespoke Double-Page Enquiry Configurations for Year 8 Early Modern World
const lessonConfigs = [
  {
    taskType: 'extended_writing',
    genre: 'Disciplinary Focus: Change & Continuity',
    skill: 'Change & Continuity',
    timelineMission:
      'Illustrate Milestone 1 on Page 2: Sketch the Ottoman siege cannon, Mehmed II’s overland galleys, or Constantinople.',
    enquiryQuestion:
      'Enquiry: Who held true global power in 1450, and why was Europe on the geographic periphery?',
    doNow: [
      {
        q: 'Which catastrophic pandemic struck Europe in 1348, killing roughly half its population?',
      },
      {
        q: 'What overland trade network historically linked China and the Mediterranean across Asia?',
      },
      {
        q: 'Which Christian empire, centered at Constantinople, fell to the Ottomans in 1453?',
      },
      {
        q: 'What was the primary source of wealth and power for medieval European feudal barons?',
      },
      {
        q: 'Which religious figure in Rome held supreme spiritual authority over Western Europe?',
      },
    ],
    vocabTask: {
      type: 'distinction',
      prompt:
        'Distinguish between the military and bureaucratic hegemony of the <strong>Ottoman Empire</strong> under Mehmed II and the tributary commercial isolationism of the <strong>Ming Dynasty</strong> in 1450:',
    },
    bridgeTask: {
      type: 'ledger',
      badge: 'Geopolitical Hegemony Matrix',
      title: 'Task 3: Global Power Balance: Ottoman Dominance vs European Fragmentation (1450)',
      instruction:
        'Balance the formidable geopolitical advantages of the Islamic and Asian worlds against the vulnerabilities of medieval Europe:',
      col1Title: 'Ottoman & Asian Dominance (The Epicentre)',
      col1Prompts: [
        'Conquest of Constantinople (1453): control of the Bosphorus and Silk Road.',
        'Superior Ottoman siege artillery and disciplined Janissary standing infantry.',
        'Ming Dynasty tribute system: massive population, paper money, and naval mastery.',
        'Islamic world controls global spice, silk, and porcelain maritime trade routes.',
      ],
      col2Title: 'European Peripheral Fragility (The Outpost)',
      col2Prompts: [
        "Exhausted by the Hundred Years' War (1337–1453) and Black Death losses.",
        'Divided into rival Catholic kingdoms lacking unified military commands.',
        'Completely dependent on Muslim Venetian middlemen for eastern luxuries.',
        'Blocked from eastern overland routes, forcing dangerous oceanic navigation.',
      ],
      synthesisPrompt:
        'Synthesise why Ottoman dominance and European weakness forced oceanic exploration:',
      clue: '<em>Low-Floor Clue:</em> In 1450, Europe was not the centre of the world; it was a fractured, impoverished peninsula desperate to find a sea route to Asian wealth.',
      scholarsEdge:
        '<strong>★ Scholar’s Edge:</strong> How does Janet Abu-Lughod’s concept of a "thirteenth-century world system" disprove the traditional Eurocentric myth of inevitable Western supremacy?',
    },
    structureStrip: [
      {
        col: '1. OTTOMAN EXPANSION',
        text: 'Explain how the fall of Constantinople in 1453 secured Ottoman dominance over global trade.',
      },
      {
        col: '2. MING ISOLATION',
        text: 'Analyse why Ming China retreated from oceanic voyages despite possessing superior maritime fleets.',
      },
      {
        col: '3. EUROPEAN PERIPHERY',
        text: 'Formulate a sustained conclusion explaining why peripheral weakness forced European exploration.',
      },
    ],
    connectives:
      'In 1450, global power was concentrated in... • Crucially, the Ottoman capture of Constantinople meant that... • In stark contrast, European monarchies were... • This imbalance directly forced explorers like Columbus and da Gama to... • Ultimately, European expansion was born not of strength, but of desperation to...',
  },
  {
    taskType: 'source_utility',
    genre: 'Source Analysis: Dual-Source Utility',
    skill: 'Dual-Source Utility',
    timelineMission:
      'Illustrate Milestone 2 on Page 2: Sketch the 1494 Tordesillas meridian dividing the Atlantic, or Drake’s fireships scattering the Armada.',
    enquiryQuestion:
      'Enquiry: How useful are Sources A and B for an enquiry into why European powers engaged in global oceanic expansion between 1494 and 1588?',
    sourceA: {
      title: 'Source A: Papal Bull Inter Caetera & Treaty of Tordesillas (1493–1494)',
      shelfmark: 'ARCHIVO GENERAL DE INDIAS • SEVILLE • PATRONATO 1',
      text: '“We assign to you, Catholic Kings of Castile and Leon, all islands and mainlands discovered westward of the meridian line. We strictly command you to lead the inhabitants to embrace the Christian faith, so that the Holy Roman Catholic Church may be exalted and barbarous nations brought to the salvation of Christ.”',
      clue: 'Provenance Clue: Official papal decree by Pope Alexander VI; reveals how Spanish imperial claims were justified by divine mandate and religious zeal.',
    },
    sourceB: {
      title: 'Source B: Richard Hakluyt, Discourse on Western Planting (1584)',
      shelfmark: 'BRITISH LIBRARY • LONDON • COTTON MS TITUS B.XIII',
      text: '“This western enterprise will yield great profit unto our realm: providing naval timber and pitch, venting our woollen cloth, and employing our idle poor. Crucially, it will check the pride of King Philip of Spain, whose gold mines in the West Indies feed his war against Protestant England.”',
      clue: 'Provenance Clue: Secret strategic briefing for Queen Elizabeth I; emphasizes commercial profit, domestic unemployment, and geopolitical rivalry with Catholic Spain.',
    },
    matrix: [
      {
        col: '1. CONTENT & DETAIL',
        text: 'Analyse what each source reveals about imperial motives (Catholic evangelism vs English trade profit and naval rivalry).',
      },
      {
        col: '2. PROVENANCE & MOTIVE',
        text: 'Evaluate how the authorship and purpose of each document (papal decree vs secret royal briefing) affects its historical reliability.',
      },
      {
        col: '3. HISTORICAL JUDGEMENT',
        text: 'Reach a reasoned conclusion: which source is more useful for understanding why European nations took to the Atlantic Ocean?',
      },
    ],
    connectives:
      'Source A is useful for proving that initial oceanic claims were legitimized by... • However, its utility is limited because as an official papal bull it conceals Spain’s desire for... • In contrast, Source B provides insider insight into England’s strategic ambition to... • Cross-referencing both sources demonstrates that exploration was driven by a volatile mix of... • On balance, Source [A/B] is more valuable for this enquiry because...',
    doNow: [
      {
        q: 'Which Chinese imperial dynasty deployed massive treasure fleets under Zheng He?',
      },
      {
        q: 'What city did Ottoman Sultan Mehmed II conquer in 1453, ending the Byzantine Empire?',
      },
      {
        q: 'Why did Ottoman control of eastern routes force Europeans to seek oceanic sea routes?',
      },
      {
        q: 'What disciplined standing elite infantry formed the core of the Ottoman military?',
      },
      {
        q: 'Why was 15th-century Europe described as economically and geographically peripheral?',
      },
    ],
    vocabTask: {
      type: 'distinction',
      prompt:
        'Distinguish between the Catholic legal monopoly granted by the <strong>Treaty of Tordesillas (1494)</strong> and Protestant England’s commercial doctrine of <strong>Privateering & Mercantilism</strong>:',
    },
    bridgeTask: {
      type: 'ledger',
      badge: 'Imperial Motivation Balance Sheet',
      title: 'Task 3: The Exploration Balance Sheet: Religious Zeal vs Commercial Wealth',
      instruction:
        'Balance the religious justifications for global expansion against the commercial and strategic incentives driving European crowns:',
      col1Title: 'Religious Zeal & Catholic Monopoly (God)',
      col1Prompts: [
        'Papal decrees granting exclusive dominion to convert native peoples.',
        'Counter-Reformation mission to spread Catholicism before Protestantism.',
        'Spanish conquistadors accompanied by Franciscan and Dominican friars.',
        'Belief that monarchs had a divine duty to expand Christ’s kingdom.',
      ],
      col2Title: 'Commercial Wealth & Strategic Rivalry (Gold & Glory)',
      col2Prompts: [
        'Desire to bypass Ottoman trade tariffs on Asian silk and spices.',
        'Vast silver deposits discovered at Potosí and Zacatecas funding imperial armies.',
        'English privateers (Drake and Hawkins) plundering Spanish treasure galleons.',
        'Mercantilist doctrine: wealth is finite and must be captured from rivals.',
      ],
      synthesisPrompt:
        'Synthesise whether religious zeal or commercial greed was the primary driver of oceanic expansion:',
      clue: '<em>Low-Floor Clue:</em> In the Tudor era, religion and profit were inextricably linked: Queen Elizabeth I sponsored privateers like Francis Drake to strike at Catholic Spain while enriching her royal treasury.',
      scholarsEdge:
        '<strong>★ Scholar’s Edge:</strong> How does the Armada Portrait of 1588 visually combine Protestant religious providence with global imperial ownership?',
    },
  },
  {
    taskType: 'extended_writing',
    genre: 'Causal Analysis: Trade to Empire',
    skill: 'Causation & Consequence',
    timelineMission:
      'Illustrate Milestone 3 on Page 2: Sketch Sir Thomas Roe before Emperor Jahangir, or a fortified coastal trading factory at Surat.',
    enquiryQuestion:
      'Enquiry: Trade or takeover: How did early commercial trading posts transform into colonial empires?',
    doNow: [
      {
        q: 'What 1494 treaty between Spain and Portugal divided newly discovered lands?',
      },
      {
        q: 'Which English monarch licensed privateers like Drake to plunder Spanish bullion?',
      },
      {
        q: 'In what year did the Spanish Armada fail to invade Tudor England?',
      },
      {
        q: 'What German monk initiated the Protestant Reformation in 1517?',
      },
      {
        q: 'What precious metal mined at Potosí funded Spanish imperial armies across Europe?',
      },
    ],
    vocabTask: {
      type: 'distinction',
      prompt:
        'Distinguish between a fortified coastal commercial trading depot (<strong>Factory</strong>) and full territorial annexation and subjugation (<strong>Colonial Conquest</strong>):',
    },
    bridgeTask: {
      type: 'ledger',
      badge: 'Encounter Transformation Matrix',
      title: 'Task 3: Commercial Enclaves vs Territorial Subjugation (Mughal India & America)',
      instruction:
        'Examine how humble merchant companies evolved into ruthless colonial rulers through military force and political manipulation:',
      col1Title: 'Phase 1: Humble Commercial Enclaves (1600–1650)',
      col1Prompts: [
        'East India Company (EIC) establishes tiny coastal factories at Surat and Madras.',
        'English merchants bow before Mughal Emperor Jahangir seeking trade firmans (royal decrees).',
        'Jamestown (1607): precarious settlers depend entirely on Powhatan maize to survive.',
        'Strict royal charters restricting companies to commercial exchange, not conquest.',
      ],
      col2Title: 'Phase 2: Military Takeover & Territorial Sovereignty (1700–1757)',
      col2Prompts: [
        'Battle of Plassey (1757): Robert Clive uses private army and bribes to seize Bengal.',
        'Treaty of Allahabad (1765): EIC extracts the Diwani (right to collect all land taxes).',
        'Virginia tobacco plantations expand violently, displacing indigenous Algonquin tribes.',
        'Joint-stock corporations command private armies larger than sovereign European states.',
      ],
      synthesisPrompt:
        'Synthesise how private commercial trade depots transformed into coercive colonial empires:',
      clue: '<em>Low-Floor Clue:</em> The East India Company was not a government; it was a private profit-making corporation that built a private army of 260,000 men to control an empire.',
      scholarsEdge:
        '<strong>★ Scholar’s Edge:</strong> How does William Dalrymple’s concept of "The Anarchy" characterize the EIC’s transition from merchant traders to corporate pillagers?',
    },
    structureStrip: [
      {
        col: '1. COMMERCIAL ORIGINS',
        text: 'Explain why European companies originally operated as humble supplicants to powerful Asian rulers.',
      },
      {
        col: '2. MILITARY LEVERAGE',
        text: 'Analyse how private company armies and political alliances turned commercial rivalry into military takeover.',
      },
      {
        col: '3. INDIGENOUS IMPACT',
        text: 'Evaluate how taxation rights (Diwani) and territorial conquest destroyed local sovereignty and economies.',
      },
    ],
    connectives:
      'Initially, European encounters in India and the Americas were characterised by... • However, as corporate profits grew, merchant companies began to... • The turning point occurred when... • This resulted in the catastrophic transformation of... • Ultimately, commercial trade evolved into imperial takeover because...',
  },
  {
    taskType: 'extended_writing',
    genre: 'Historical Significance: 1605 Crisis',
    skill: 'Historical Significance',
    timelineMission:
      'Illustrate Milestone 4 on Page 2: Sketch the 36 barrels in the Parliament undercroft, the Monteagle letter, or Guy Fawkes’ lantern.',
    enquiryQuestion:
      'Enquiry: Why was religious division so volatile and dangerous under King James I?',
    doNow: [
      {
        q: 'What type of commercial company allowed English investors to pool risk and capital?',
      },
      {
        q: 'What was the first permanent English colony in North America, founded in 1607?',
      },
      {
        q: 'Which Indian Islamic empire did ambassador Sir Thomas Roe visit in 1615?',
      },
      {
        q: 'What agricultural cash crop saved the Jamestown settlement from economic ruin?',
      },
      {
        q: 'What term described an armed coastal trading depot built by the East India Company?',
      },
    ],
    vocabTask: {
      type: 'distinction',
      prompt:
        'Distinguish between Catholic citizens refusing to attend Anglican church services (<strong>Recusancy</strong>) and the political belief that monarchs answer only to God (<strong>Divine Right of Kings</strong>):',
    },
    bridgeTask: {
      type: 'ledger',
      badge: 'Jacobean Security Audit',
      title: 'Task 3: Religious Radicalism vs State Surveillance: The 1605 Crisis',
      instruction:
        'Analyse the escalating tensions between disillusioned Catholic conspirators and Robert Cecil’s surveillance network:',
      col1Title: 'Catholic Disillusionment & Militant Plotting',
      col1Prompts: [
        'James I promises religious tolerance but reinstates harsh anti-Catholic recusancy fines.',
        'Robert Catesby and conspirators resolve to assassinate King, Prince, and Parliament.',
        '36 barrels of gunpowder hidden beneath the House of Lords to trigger Catholic uprising.',
        'Belief that violent regicide was morally justified to end the persecution of true believers.',
      ],
      col2Title: 'Jacobean Counter-Espionage & State Retribution',
      col2Prompts: [
        'Robert Cecil operates an extensive network of informers, intercepts, and cryptographers.',
        'The mysterious Monteagle Letter warning Lord Monteagle not to attend Parliament.',
        'Discovery of Guy Fawkes with fuses and match in the Parliament cellar on 4 November.',
        'Public executions, enhanced Penal Laws, and the Popish Recusants Act of 1606.',
      ],
      synthesisPrompt:
        'Synthesise why religious division threatened state security and royal authority under James I:',
      clue: '<em>Low-Floor Clue:</em> The Gunpowder Plot shocked contemporaries because it targeted the entire political establishment—the King, his heirs, Lords, and Commons—in a single explosion.',
      scholarsEdge:
        '<strong>★ Scholar’s Edge:</strong> How did Robert Cecil weaponize the Gunpowder Plot to forge an enduring British national identity rooted in militant anti-Catholicism?',
    },
    structureStrip: [
      {
        col: '1. VOLATILE CONTEXT',
        text: 'Explain how broken promises of religious tolerance created radicalized Jacobean Catholic conspirators.',
      },
      {
        col: '2. TERRORIST CRISIS',
        text: 'Analyse the catastrophic intended scale of the 36-barrel gunpowder plot beneath Parliament.',
      },
      {
        col: '3. LONG-TERM LEGACY',
        text: 'Evaluate how state retribution and anti-popery laws entrenched religious division for centuries.',
      },
    ],
    connectives:
      'Religious division under James I was profoundly volatile because... • Specifically, the anger of Catholic gentry like Catesby was triggered by... • The discovery of the cellar plot demonstrated that... • Consequently, the Jacobean state responded with... • Therefore, the Gunpowder Plot was historically significant because...',
  },
  {
    taskType: 'historical_interpretations',
    genre: 'Historiographical Debate: Civil War',
    skill: 'Historical Interpretations',
    timelineMission:
      'Illustrate Milestone 5 on Page 3: Sketch Charles I raising his standard at Nottingham, or the execution scaffold outside Whitehall.',
    enquiryQuestion:
      'Enquiry: How far do you agree with Interpretation 1 that the English Civil War was an inevitable constitutional battle for parliamentary liberty?',
    interp1: {
      title: 'Interpretation 1: Lord Macaulay & G.M. Trevelyan, The Whig Orthodoxy (1848 / 1926)',
      badge: 'The Whig View: Inevitable March of Parliamentary Liberty',
      text: '“The clash between King and Parliament was the grand heroic struggle of English history. Charles I was an unbending tyrant who sought to extinguish ancient liberties through illegal taxes like Ship Money and eleven years of Personal Rule. The Civil War was the inevitable, necessary triumph of parliamentary freedom, rule of law, and Protestant democracy over royal absolutism.”',
      author: 'Lord Macaulay (Whig Historian & Statesman)',
    },
    interp2: {
      title:
        'Interpretation 2: Professor Conrad Russell & John Morrill, The Revisionist View (1990 / 1993)',
      badge: 'The Revisionist View: An Unforced Accident & War of Religion',
      text: '“The Civil War was neither inevitable nor primarily about modern constitutional liberty. It was a tragic, unforced breakdown caused by the personal untrustworthiness of Charles I and explosive religious fear. In 1640, nobody wanted war; England stumbled into disaster because the King failed to govern three distinct kingdoms—England, Scotland, and Ireland—simultaneously.”',
      author: "Conrad Russell (Professor of Commonwealth History, King's College London)",
    },
    matrix: [
      {
        col: '1. INTERPRETATION 1 CLAIMS',
        text: 'Analyse Macaulay’s Whig argument that tyranny and Ship Money made parliamentary conflict inevitable.',
      },
      {
        col: '2. INTERPRETATION 2 CRITIQUE',
        text: 'Evaluate Russell’s Revisionist counter-argument that war was an accidental crisis of religion and personal mistrust.',
      },
      {
        col: '3. HISTORIOGRAPHICAL VERDICT',
        text: "Weigh both interpretations against factual evidence (1642 Militia Ordinance, Bishops' Wars) to reach an independent verdict.",
      },
    ],
    connectives:
      'Interpretation 1 argues that the Civil War was an inevitable result of... • This is supported by evidence such as Charles I’s eleven years of Personal Rule and... • However, Interpretation 2 directly challenges this Whig orthodoxy, maintaining that... • Russell’s thesis is reinforced by the fact that in 1640 MPs like Pym were terrified of... • On balance, Interpretation [1/2] offers a more convincing historical explanation because...',
    doNow: [
      {
        q: 'What political doctrine stated that kings answer solely to God, not to Parliament?',
      },
      {
        q: 'Who was the militant Catholic mastermind who led the Gunpowder Plot in 1605?',
      },
      {
        q: 'How many barrels of gunpowder were concealed beneath the House of Lords?',
      },
      {
        q: 'What was the crime of refusing to attend compulsory Church of England services?',
      },
      {
        q: 'What anonymous letter warned Lord Monteagle not to attend Parliament on 5 November?',
      },
    ],
    vocabTask: {
      type: 'distinction',
      prompt:
        'Distinguish between the monarchical doctrine of <strong>Divine Right Absolutism</strong> and the constitutional principle of <strong>Parliamentary Sovereignty</strong>:',
    },
    bridgeTask: {
      type: 'ledger',
      badge: 'Civil War Causation Audit',
      title: 'Task 3: Long-Term Constitutional Friction vs Short-Term Royal Blunders',
      instruction:
        'Examine whether the English Civil War was caused by deep-seated institutional friction or Charles I’s immediate miscalculations:',
      col1Title: 'Long-Term Structural Causes (The Whig Case)',
      col1Prompts: [
        'James I and Charles I asserting absolute Divine Right rule over Parliament.',
        'Eleven Years of Personal Rule (1629–1640): governing without calling Parliament.',
        'Illegal imposition of Ship Money tax on inland counties to fund royal finances.',
        'Archbishop Laud’s "Arminian" church reforms perceived as sneaking Catholicism back.',
      ],
      col2Title: 'Short-Term Triggers & Royal Blunders (The Revisionist Case)',
      col2Prompts: [
        'Attempting to impose the English Prayer Book on Presbyterian Scotland (Bishops’ Wars 1639).',
        'The Irish Rebellion of 1641: panic over who should command the army to suppress it.',
        'Charles I entering the House of Commons with 400 soldiers to arrest the Five Members (1642).',
        'Charles I’s fatal character: inflexible, secretive, and widely perceived as untrustworthy.',
      ],
      synthesisPrompt:
        'Synthesise whether structural friction or Charles I’s personal blunders triggered the Civil War:',
      clue: '<em>Low-Floor Clue:</em> In January 1642, Charles I committed the unthinkable blunder of storming the House of Commons with armed troops to arrest five MPs; Speaker Lenthall famously defied him, declaring he served Parliament, not the King.',
      scholarsEdge:
        '<strong>★ Scholar’s Edge:</strong> How does John Morrill’s famous description of 1642 as "not England\'s first modern revolution, but her last war of religion" undermine Macaulay’s Victorian Whig myth?',
    },
  },
  {
    taskType: 'extended_writing',
    genre: 'Turning Point: Financial Revolution',
    skill: 'Turning Point Analysis',
    timelineMission:
      'Illustrate Milestone 6 on Page 3: Sketch the 1689 Bill of Rights parchment, or the founding charter and gold vaults of the Bank of England.',
    enquiryQuestion:
      'Enquiry: How did the 1688 Glorious Revolution and the creation of the Bank of England transform British state power?',
    doNow: [
      {
        q: 'What illegal coastal tax did Charles I extend inland during his Personal Rule?',
      },
      {
        q: 'In what year was King Charles I publicly executed outside Whitehall Banqueting House?',
      },
      {
        q: 'What disciplined parliamentary army was established by Fairfax and Cromwell in 1645?',
      },
      {
        q: 'What title did Oliver Cromwell assume as head of the Commonwealth in 1653?',
      },
      {
        q: 'What legal term defines the formal judicial execution of a reigning monarch?',
      },
    ],
    vocabTask: {
      type: 'distinction',
      prompt:
        'Distinguish between the state economic doctrine of strict trade controls (<strong>Mercantilism</strong>) and credit-based national borrowing (<strong>The Financial Revolution & National Debt</strong>):',
    },
    bridgeTask: {
      type: 'ledger',
      badge: 'Constitutional Transformation Matrix',
      title: 'Task 3: Stuart Catholic Absolutism vs The 1688 Constitutional Settlement',
      instruction:
        'Analyse how the replacement of James II with William III and Mary II established a modern fiscal-military state:',
      col1Title: 'Stuart Catholic Autocracy (Pre-1688 Crisis)',
      col1Prompts: [
        'James II uses the royal dispensing power to appoint Catholic officers illegally.',
        'Birth of a Catholic male heir in June 1688 raises the prospect of a Catholic dynasty.',
        'The Trial of the Seven Bishops for refusing to read the Declaration of Indulgence.',
        'Crown reliant on irregular French subsidies from King Louis XIV.',
      ],
      col2Title: 'The 1688 Settlement & Fiscal-Military Power',
      col2Prompts: [
        'Bill of Rights (1689): Parliament controls taxation, elections, and standing armies.',
        'Founding of the Bank of England (1694): institutionalizing the National Debt.',
        'Government able to borrow millions at low interest rates from City of London merchants.',
        'Massive naval expansion: Royal Navy becomes the dominant fighting force in Europe.',
      ],
      synthesisPrompt:
        'Synthesise how the 1688 settlement and the Financial Revolution created a modern superpower:',
      clue: '<em>Low-Floor Clue:</em> The Glorious Revolution was not just about religion; by guaranteeing that Parliament controlled taxes, it allowed Britain to borrow money cheaply and build the world’s greatest navy.',
      scholarsEdge:
        '<strong>★ Scholar’s Edge:</strong> How did John Brewer’s concept of the "Fiscal-Military State" explain Britain’s ability to defeat much larger continental rivals like France after 1688?',
    },
    structureStrip: [
      {
        col: '1. RELIGIOUS CRISIS',
        text: 'Explain why James II’s pro-Catholic policies provoked the Immortal Seven to invite William of Orange.',
      },
      {
        col: '2. BILL OF RIGHTS',
        text: 'Analyse how the 1689 constitutional settlement permanently subordinated royal prerogative to Parliament.',
      },
      {
        col: '3. FINANCIAL REVOLUTION',
        text: 'Evaluate how the Bank of England and National Debt enabled Britain to project global military power.',
      },
    ],
    connectives:
      'The Glorious Revolution of 1688 marked a decisive turning point because... • The immediate catalyst was James II’s attempt to... • Consequently, the 1689 Bill of Rights established that... • Furthermore, the founding of the Bank of England in 1694 revolutionised... • Ultimately, Britain emerged as a global superpower because...',
  },
  {
    taskType: 'extended_writing',
    genre: 'Historical Evidence: Middle Passage',
    skill: 'Historical Evidence & Cause',
    timelineMission:
      'Illustrate Milestone 7 on Page 3: Sketch the brutal plan of the slave ship Brookes, or the triangular flow of goods, captives, and sugar.',
    enquiryQuestion:
      'Enquiry: What were the systematic mechanics, commercial scale, and human cost of the Transatlantic Slave Trade?',
    doNow: [
      {
        q: 'What 1689 statute permanently subordinated royal prerogative to Parliament?',
      },
      {
        q: 'What central bank was founded in 1694 to manage national borrowing and fund the Navy?',
      },
      {
        q: 'What Dutch ruler was invited by Parliament to replace James II in the Glorious Revolution?',
      },
      {
        q: 'What economic doctrine held that national power required hoarding silver and gold bullion?',
      },
      {
        q: 'What financial innovation allowed the British government to borrow money cheaply?',
      },
    ],
    vocabTask: {
      type: 'distinction',
      prompt:
        'Distinguish between the three-legged oceanic shipping network (<strong>Triangular Trade</strong>) and the legal classification of human beings as saleable personal property (<strong>Chattel Slavery</strong>):',
    },
    bridgeTask: {
      type: 'ledger',
      badge: 'Transatlantic Trade Architecture',
      title: 'Task 3: Commercial Profit Architecture vs The Reality of the Middle Passage',
      instruction:
        'Examine the brutal contradiction between British commercial enrichment and the industrial dehumanization of African captives:',
      col1Title: 'Commercial Machine & British Ports (The Outward & Homeward Legs)',
      col1Prompts: [
        'Outward Leg: British manufactured goods (guns, brass, textiles) shipped to West Africa.',
        'Homeward Leg: slave-grown plantation produce (sugar, tobacco, cotton) imported to Britain.',
        'Vast municipal wealth built in Liverpool, Bristol, and London from slave trade financing.',
        'British banks and insurance syndicates (e.g. Barclays, Lloyd’s) underwrite slaving voyages.',
      ],
      col2Title: 'Dehumanization of the Middle Passage (The Inward Leg)',
      col2Prompts: [
        'The Slave Ship Brookes (1788): 454 men, women, and children packed into 14-inch shelves.',
        'Horrific mortality rates: over 1.8 million Africans died of dysentery, fever, and suicide.',
        'Branding with red-hot irons and physical shackling in darkness below deck for 6–12 weeks.',
        'Olaudah Equiano’s testimony: the stench, shrieks of the dying, and unbearable claustrophobia.',
      ],
      synthesisPrompt:
        'Synthesise the contradiction between British domestic wealth and the inhumanity of the Middle Passage:',
      clue: '<em>Low-Floor Clue:</em> In 1788, the Abolition Society published a technical architectural plan of the slave ship Brookes; its chilling diagram showed human beings stacked like cargo in the hold.',
      scholarsEdge:
        '<strong>★ Scholar’s Edge:</strong> How does Eric Williams’s landmark "Capitalism and Slavery" thesis argue that the profits of Atlantic slavery directly financed Britain’s Industrial Revolution?',
    },
    structureStrip: [
      {
        col: '1. TRIANGULAR SYSTEM',
        text: 'Explain how the three legs of the triangular trade operated to maximize European mercantile profits.',
      },
      {
        col: '2. MIDDLE PASSAGE',
        text: 'Deploy primary evidence from Equiano and the Brookes diagram to analyse the horrors of the crossing.',
      },
      {
        col: '3. ECONOMIC IMPACT',
        text: 'Evaluate how British cities, industries, and financial institutions became deeply entangled with slavery.',
      },
    ],
    connectives:
      'The Transatlantic Slave Trade functioned as a ruthless commercial machine because... • On the Outward Leg, British merchants traded... • During the harrowing Middle Passage, enslaved Africans endured... • Primary evidence from the Brookes architectural plan demonstrates that... • Consequently, British economic prosperity in the eighteenth century was inextricably built upon...',
  },
  {
    taskType: 'extended_writing',
    genre: 'Historical Agency: Maroon Resistance',
    skill: 'Agency & Historical Significance',
    timelineMission:
      'Illustrate Milestone 8 on Page 3: Sketch Queen Nanny’s Blue Mountain fighters, or the signing of the 1739 Maroon Peace Treaty.',
    enquiryQuestion:
      'Enquiry: How did enslaved Africans actively resist, undermine, and dismantle the Transatlantic slave system?',
    doNow: [
      {
        q: 'What three-cornered oceanic trade route linked Britain, West Africa, and the Americas?',
      },
      {
        q: 'What was the harrowing middle leg transporting captured Africans called?',
      },
      {
        q: 'What 1788 architectural plan exposed over 450 enslaved people crammed into a ship’s hold?',
      },
      {
        q: 'Which two British ports expanded dramatically from trading slave-produced sugar and tobacco?',
      },
      {
        q: 'What legal classification treated enslaved human beings as personal property?',
      },
    ],
    vocabTask: {
      type: 'distinction',
      prompt:
        'Distinguish between covert everyday plantation resistance (<strong>Work Slowdowns, Sabotage & Cultural Survival</strong>) and organized armed rebellion (<strong>Maroon Guerilla Warfare & Insurrection</strong>):',
    },
    bridgeTask: {
      type: 'ledger',
      badge: 'Resistance & Agency Audit',
      title: 'Task 3: Everyday Covert Resistance vs Militant Guerilla Insurrection',
      instruction:
        'Assess the multifaceted ways enslaved people asserted their humanity and fought for freedom against overwhelming colonial force:',
      col1Title: 'Everyday Covert Resistance (Plantation Agency)',
      col1Prompts: [
        'Deliberate work slowdowns, feigning illness, and breaking harvesting tools.',
        'Preserving African linguistic roots, drumming, spirituals, and ancestral religious rituals.',
        'Poisoning livestock, setting fire to sugarcane fields, and clandestine literacy learning.',
        'Maintaining family ties and cultural dignity despite horrific physical punishments.',
      ],
      col2Title: 'Militant Armed Insurrection & Maroon Sovereignty',
      col2Prompts: [
        'Shipboard uprisings: documented revolts on over 10% of all transatlantic slaving voyages.',
        'Jamaican Maroons: escaped communities in the Blue Mountains fighting guerilla campaigns.',
        'Queen Nanny of the Maroons: brilliant tactical general defeating British redcoat regiments.',
        'The 1739 Maroon Treaty: forced the British Empire to sign a peace treaty recognizing Maroon freedom.',
      ],
      synthesisPrompt:
        'Synthesise how everyday resistance and armed insurrections actively challenged chattel slavery:',
      clue: '<em>Low-Floor Clue:</em> In 1739, after decades of guerilla war in the Jamaican mountains, the mighty British Empire was forced to negotiate a formal peace treaty with Queen Nanny, granting her people 1,500 acres of sovereign land.',
      scholarsEdge:
        '<strong>★ Scholar’s Edge:</strong> How does highlighting African agency and rebellion correct the flawed traditional narrative that abolition was solely the charitable gift of white politicians like William Wilberforce?',
    },
    structureStrip: [
      {
        col: '1. COVERT RESISTANCE',
        text: 'Explain how everyday acts of sabotage and cultural preservation resisted chattel dehumanization.',
      },
      {
        col: '2. ARMED INSURRECTION',
        text: 'Analyse the military impact of shipboard revolts and Tacky’s 1760 rebellion in Jamaica.',
      },
      {
        col: '3. MAROON VICTORY',
        text: 'Evaluate how Queen Nanny and the Maroons forced the British state into recognizing autonomous freedom.',
      },
    ],
    connectives:
      'Enslaved Africans constantly resisted the plantation machine through... • On a daily basis, covert agency was expressed by... • More aggressively, militant insurrections like Tacky’s Rebellion proved that... • Most remarkably, the Jamaican Maroons under Queen Nanny demonstrated... • Ultimately, the historical significance of slave resistance is that it disproves the myth of...',
  },
];

function buildEarlyModernWorldTwoPageWorkbook() {
  const frontCoverImage = getBase64Image('images/east_offering.jpg');

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>The History Portal • KS3 Early Modern World Pupil Workbook (1450–1750)</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,500;1,600&family=Georgia&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4 portrait;
      margin: 10mm 12mm 10mm 12mm;
    }
    *, *:before, *:after {
      box-sizing: border-box;
    }
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 8.5pt;
      line-height: 1.35;
      color: #1e293b;
      margin: 0;
      padding: 0;
      background: #ffffff;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .page, .page-container {
      width: 100%;
      height: 256mm;
      max-height: 256mm;
      overflow: hidden;
      box-sizing: border-box;
      position: relative;
      page-break-after: always;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .page:last-child, .page-container:last-child {
      page-break-after: auto;
    }
    .task-line {
      border-bottom: 1.2px solid #475569;
      height: 7.8mm;
      width: 100%;
      box-sizing: border-box;
    }
    .task-line-dotted {
      border-bottom: 1.2px dotted #475569;
      height: 7.8mm;
      width: 100%;
      box-sizing: border-box;
    }
    .archival-badge {
      font-family: 'Inter', sans-serif;
      font-size: 7.6pt;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      padding: 2px 7px;
      border-radius: 3px;
      background: #f1f5f9;
      color: #475569;
      border: 1px solid #cbd5e1;
      font-weight: 600;
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

  // ==========================================
  // PAGE 1: FRONT COVER (Recto, Right Page)
  // ==========================================
  html += `
  <div class="page page-container" id="page-1" style="padding: 14px 16px; border: 1px solid #cbd5e1; outline: 3.5px double #0f172a; outline-offset: -8px; justify-content: space-between;">
    <!-- Top Branding Banner with Commercial Customizer -->
    <div style="border-bottom: 2px solid #0f172a; padding-bottom: 3px; margin-bottom: 3px;" data-department-name="The History Department">
      <div style="display: flex; justify-content: space-between; align-items: baseline;">
        <span class="school-brand-target" style="font-family: 'Inter', sans-serif; font-size: 11pt; font-weight: 900; letter-spacing: 2px; text-transform: uppercase; color: #0f172a;">The History Department</span>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; color: #475569;">Key Stage 3 History • Year 8 Workbook</span>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: baseline; margin-top: 1px; border-top: 1px solid #cbd5e1; padding-top: 2px;">
        <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase; color: #1e3a8a;">UNIT: THE EARLY MODERN WORLD (1450–1750)</span>
        <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; color: #64748b;">DEPARTMENTAL STANDARD EDITION</span>
      </div>
    </div>

    <!-- Title Banner -->
    <div style="border: 1.8px solid #0f172a; border-radius: 4px; padding: 4px 8px; background: #ffffff; margin-bottom: 3px;">
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 2px;">
        <span style="background: #1e3a8a; color: #ffffff; font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; padding: 1.5px 6px; border-radius: 2px; text-transform: uppercase; letter-spacing: 0.8px;">
          Year 8 Enquiry
        </span>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: #334155;">
          Global Encounters, Reformation, Civil War &amp; The Transatlantic Slave Trade
        </span>
      </div>
      <h1 style="font-family: 'Playfair Display', serif; font-size: 15pt; margin: 1px 0; font-weight: 900; line-height: 1.15; color: #0f172a;">
        THE EARLY MODERN WORLD: 1450–1750
      </h1>
      <div style="font-family: 'Georgia', serif; font-size: 8.4pt; color: #1e293b; font-style: italic; line-height: 1.25;">
        Overarching Enquiry: “How did religious conflict, oceanic exploration, constitutional civil war, and popular resistance transform Britain and the wider world?”
      </div>
    </div>

    <!-- Hero Photo Plate -->
    <div style="border: 1.8px solid #0f172a; border-radius: 4px; overflow: hidden; background: #ffffff; margin-bottom: 3px; display: flex; flex-direction: column;">
      <div style="height: 94mm; background: #ffffff; display: flex; justify-content: center; align-items: center; overflow: hidden;">
        <img src="${frontCoverImage}" alt="East Offering Its Riches to Britannia" style="width: 100%; height: 100%; object-fit: cover; object-position: center 25%; display: block;">
      </div>
      <div style="border-top: 1.5px solid #0f172a; padding: 3px 8px; background: #f8fafc;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 900; text-transform: uppercase; color: #1e3a8a;">
            Primary Painting Plate • Spiridione Roma (1778)
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 900; background: #0f172a; color: #ffffff; padding: 1px 5px; border-radius: 2px;">
            THE BRITISH LIBRARY &bull; EAST INDIA HOUSE
          </span>
        </div>
        <div style="font-family: 'Playfair Display', serif; font-size: 9.4pt; font-weight: 800; line-height: 1.15; margin: 1px 0; color: #0f172a;">
          ‘The East Offering Its Riches to Britannia’
        </div>
        <div style="font-family: 'Georgia', serif; font-size: 7.2pt; color: #334155; line-height: 1.2;">
          Spiridione Roma’s 1778 ceiling fresco commissioned for the East India Company House in Leadenhall Street, London, allegorically visualising the colonial extraction and transfer of Asian wealth to Britannia.
        </div>
      </div>
    </div>

    <!-- Pupil Information Card -->
    <div style="border: 1.5px solid #0f172a; border-radius: 4px; padding: 5px 12px; background: #ffffff; margin-bottom: 3px;">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 4px;">
        <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; text-transform: uppercase; letter-spacing: 0.8px; color: #0f172a;">
          Pupil Workbook &amp; Academic Record
        </strong>
        <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 800; text-transform: uppercase; color: #64748b;">
          Year 8 History • Unit 2
        </span>
      </div>
      <div style="display: grid; grid-template-columns: 2fr 1fr 1.2fr 1fr; gap: 12px; font-family: 'Inter', sans-serif; font-size: 7.5pt;">
        <div style="display: flex; align-items: baseline;">
          <strong style="text-transform: uppercase; width: 48px; font-size: 7pt; color: #0f172a;">Name:</strong>
          <div style="flex: 1; border-bottom: 1.2px solid #0f172a; height: 14px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="text-transform: uppercase; width: 44px; font-size: 7pt; color: #0f172a;">Class:</strong>
          <div style="flex: 1; border-bottom: 1.2px solid #0f172a; height: 14px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="text-transform: uppercase; width: 56px; font-size: 7pt; color: #0f172a;">Teacher:</strong>
          <div style="flex: 1; border-bottom: 1.2px solid #0f172a; height: 14px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="text-transform: uppercase; width: 44px; font-size: 7pt; color: #0f172a;">Target:</strong>
          <div style="flex: 1; border-bottom: 1.2px solid #0f172a; height: 14px;"></div>
        </div>
      </div>
    </div>

    <!-- Syllabus Enquiry Overview (The 8 Enquiries Learning Journey) -->
    <div style="border: 1.5px solid #0f172a; border-radius: 4px; overflow: hidden; background: #ffffff; flex: 1; display: flex; flex-direction: column; margin-bottom: 3px;">
      <div style="background: #0f172a; color: #ffffff; padding: 3px 10px; font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.8px; display: flex; justify-content: space-between; align-items: center;">
        <span>The 8 Historical Enquiries Across This Unit</span>
        <span style="font-size: 6.8pt; letter-spacing: 0.5px; color: #94a3b8;">Curriculum Progression &bull; 1450–1750</span>
      </div>
      <div style="padding: 5px 10px; display: grid; grid-template-columns: 1fr 1fr; gap: 3.5px 14px; font-family: 'Inter', sans-serif; font-size: 7.3pt; line-height: 1.25; color: #1e293b; flex: 1; align-content: space-around;">
        <div><strong>L1: Global Power in 1450:</strong> Ottoman Hegemony, Fall of Constantinople &amp; European Periphery.</div>
        <div><strong>L5: The English Civil War:</strong> Divine Right Absolutism, Ship Money, Regicide &amp; Cromwell.</div>
        <div><strong>L2: Religious Zeal &amp; Exploration:</strong> Papal Bull, Treaty of Tordesillas &amp; Spanish Armada.</div>
        <div><strong>L6: The Financial Revolution:</strong> The 1688 Settlement, Bank of England &amp; Fiscal State.</div>
        <div><strong>L3: Trade to Empire:</strong> East India Company, Mughal Bengal &amp; North American Trade.</div>
        <div><strong>L7: Transatlantic Slave Trade:</strong> Triangular Trade, The Brookes &amp; The Middle Passage.</div>
        <div><strong>L4: Gunpowder Plot &amp; Terror:</strong> Recusancy Fines, 36 Barrels &amp; Cecil’s Surveillance State.</div>
        <div><strong>L8: Enslaved Resistance:</strong> Queen Nanny of the Maroons, Tacky’s Revolt &amp; Abolition Agency.</div>
      </div>
    </div>

    <!-- Bottom Footer Strip -->
    <div style="border-top: 1.2px solid #0f172a; padding-top: 3px; display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #475569;">
      <span><strong>Term:</strong> Spring Term &bull; Year 8 History</span>
      <span style="font-style: italic; color: #64748b;">Permanent Academic Record &bull; Retain for Synoptic Revision</span>
      <span><strong>Edition:</strong> 2026.1 Publisher Standard</span>
    </div>
  </div>
  `;

  // ==========================================
  // PAGES 2 & 3: FACING LIVING UNIT TIMELINE SPREAD (1450–1750)
  // ==========================================

  // PAGE 2: LIVING UNIT TIMELINE (1450–1605) · PART I (Facing Spread Left)
  html += `
  <div class="page page-container verso-page" id="page-2" style="padding: 10px 14px; display: flex; flex-direction: column; height: 256mm; justify-content: space-between; box-sizing: border-box;">
    <div>
      <div style="border-bottom: 2px solid #0f172a; padding-bottom: 3px; margin-bottom: 4px; display: flex; justify-content: space-between; align-items: baseline;">
        <h2 style="margin: 0; font-family: 'Playfair Display', serif; font-size: 13pt; color: #0f172a; text-transform: uppercase; font-weight: 900; letter-spacing: 0.5px;">
          Living Unit Timeline &bull; Part 1: Global Encounter &amp; Religious Crisis (1450–1605)
        </h2>
        <span class="archival-badge" style="background: #1e3a8a; color: #ffffff; border-color: #1e3a8a; font-size: 6.8pt; padding: 1.5px 6px;">Pages 2–3 Facing Spread</span>
      </div>
      <div style="border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 4px; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #475569; display: flex; justify-content: space-between;">
        <span><strong>Timeline Mission:</strong> In each lesson, turn back to this double-page spread to illustrate the milestone sketchpad with your visual symbol and key notes.</span>
        <span style="font-weight: 700; color: #1e3a8a;">Chronological Spine &bull; Facing Left</span>
      </div>
    </div>

    <!-- Milestones 1 to 4 Container -->
    <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; margin: 2px 0;">
      
      <!-- Milestone 1 -->
      <div style="border: 1.2px solid #0f172a; border-radius: 4px; padding: 4px 7px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between; margin-bottom: 3px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1px;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="background: #1e3a8a; color: #ffffff; font-family: monospace; font-size: 7.6pt; font-weight: 800; padding: 1px 5px; border-radius: 2px;">1453</span>
            <strong style="font-family: 'Inter', sans-serif; font-size: 8.0pt; color: #0f172a;">Milestone 1: Fall of Constantinople &amp; Ottoman Hegemony</strong>
          </div>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; color: #1e3a8a; background: #eff6ff; border: 1px solid #bfdbfe; padding: 1px 5px; border-radius: 2px;">Lesson 1</span>
        </div>
        <p style="font-family: 'Georgia', serif; font-size: 7.2pt; color: #334155; margin: 0 0 3px 0; line-height: 1.25;">
          Sultan Mehmed II’s Ottoman forces breach the Byzantine walls using massive siege cannons. Controlling Constantinople and the Silk Road, the Ottoman Empire levies heavy transit taxes, forcing peripheral European crowns out onto the Atlantic to search for maritime routes to Asian spices.
        </p>
        <div style="border: 1.2px dashed #94a3b8; border-radius: 3px; background: #fdfbf7; height: 26mm; padding: 3px 6px; display: flex; flex-direction: column; justify-content: space-between;">
          <span style="font-family: 'Inter', sans-serif; font-size: 6.4pt; color: #64748b; font-style: italic;">
            ✎ <strong>Dual-Coding Sketchpad:</strong> Sketch the Ottoman siege cannon, Mehmed II’s galleys rolling over land, or the golden horns of Constantinople.
          </span>
          <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6.2pt; color: #94a3b8;">
            <span>Key term: Ottoman Hegemony</span>
            <span>Date: May 1453</span>
          </div>
        </div>
      </div>

      <!-- Milestone 2 -->
      <div style="border: 1.2px solid #0f172a; border-radius: 4px; padding: 4px 7px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between; margin-bottom: 3px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1px;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="background: #1e3a8a; color: #ffffff; font-family: monospace; font-size: 7.6pt; font-weight: 800; padding: 1px 5px; border-radius: 2px;">1494–1588</span>
            <strong style="font-family: 'Inter', sans-serif; font-size: 8.0pt; color: #0f172a;">Milestone 2: Treaty of Tordesillas &amp; Defeat of the Spanish Armada</strong>
          </div>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; color: #1e3a8a; background: #eff6ff; border: 1px solid #bfdbfe; padding: 1px 5px; border-radius: 2px;">Lesson 2</span>
        </div>
        <p style="font-family: 'Georgia', serif; font-size: 7.2pt; color: #334155; margin: 0 0 3px 0; line-height: 1.25;">
          Pope Alexander VI divides the globe between Catholic Spain and Portugal (Treaty of Tordesillas). Protestant England strikes back through state-sponsored privateering (Drake, Hawkins). When Philip II sends the 1588 Armada to invade England, English fireships and storms scatter the fleet, unleashing English oceanic ambitions.
        </p>
        <div style="border: 1.2px dashed #94a3b8; border-radius: 3px; background: #fdfbf7; height: 26mm; padding: 3px 6px; display: flex; flex-direction: column; justify-content: space-between;">
          <span style="font-family: 'Inter', sans-serif; font-size: 6.4pt; color: #64748b; font-style: italic;">
            ✎ <strong>Dual-Coding Sketchpad:</strong> Sketch the 1494 Tordesillas meridian dividing the Atlantic, or Drake’s fireships scattering the Spanish crescent formation at Gravelines.
          </span>
          <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6.2pt; color: #94a3b8;">
            <span>Key term: Mercantilism &amp; Privateering</span>
            <span>Date: 1494 / 1588</span>
          </div>
        </div>
      </div>

      <!-- Milestone 3 -->
      <div style="border: 1.2px solid #0f172a; border-radius: 4px; padding: 4px 7px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between; margin-bottom: 3px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1px;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="background: #1e3a8a; color: #ffffff; font-family: monospace; font-size: 7.6pt; font-weight: 800; padding: 1px 5px; border-radius: 2px;">1600–1615</span>
            <strong style="font-family: 'Inter', sans-serif; font-size: 8.0pt; color: #0f172a;">Milestone 3: Foundation of the East India Company &amp; Mughal Trade</strong>
          </div>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; color: #1e3a8a; background: #eff6ff; border: 1px solid #bfdbfe; padding: 1px 5px; border-radius: 2px;">Lesson 3</span>
        </div>
        <p style="font-family: 'Georgia', serif; font-size: 7.2pt; color: #334155; margin: 0 0 3px 0; line-height: 1.25;">
          Elizabeth I charters the East India Company. English merchants operate as humble supplicants at the court of Mughal Emperor Jahangir, securing trade firmans to build fortified factories at Surat and Madras. Over time, commercial enclaves expand into private corporate armies and territorial rule.
        </p>
        <div style="border: 1.2px dashed #94a3b8; border-radius: 3px; background: #fdfbf7; height: 26mm; padding: 3px 6px; display: flex; flex-direction: column; justify-content: space-between;">
          <span style="font-family: 'Inter', sans-serif; font-size: 6.4pt; color: #64748b; font-style: italic;">
            ✎ <strong>Dual-Coding Sketchpad:</strong> Sketch Sir Thomas Roe bowing before Emperor Jahangir, or a fortified coastal trading factory at Surat with spice barrels.
          </span>
          <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6.2pt; color: #94a3b8;">
            <span>Key term: Joint-Stock Factory</span>
            <span>Date: 31 Dec 1600</span>
          </div>
        </div>
      </div>

      <!-- Milestone 4 -->
      <div style="border: 1.2px solid #0f172a; border-radius: 4px; padding: 4px 7px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1px;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="background: #1e3a8a; color: #ffffff; font-family: monospace; font-size: 7.6pt; font-weight: 800; padding: 1px 5px; border-radius: 2px;">1605</span>
            <strong style="font-family: 'Inter', sans-serif; font-size: 8.0pt; color: #0f172a;">Milestone 4: The Gunpowder Plot &amp; Jacobean Surveillance State</strong>
          </div>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; color: #1e3a8a; background: #eff6ff; border: 1px solid #bfdbfe; padding: 1px 5px; border-radius: 2px;">Lesson 4</span>
        </div>
        <p style="font-family: 'Georgia', serif; font-size: 7.2pt; color: #334155; margin: 0 0 3px 0; line-height: 1.25;">
          Disillusioned Catholic conspirators led by Robert Catesby conceal 36 gunpowder barrels beneath the House of Lords. Discovered on 4 November, Guy Fawkes is captured. Robert Cecil’s surveillance network weaponizes the conspiracy to enact ferocious anti-recusancy laws and solidify Protestant state identity.
        </p>
        <div style="border: 1.2px dashed #94a3b8; border-radius: 3px; background: #fdfbf7; height: 26mm; padding: 3px 6px; display: flex; flex-direction: column; justify-content: space-between;">
          <span style="font-family: 'Inter', sans-serif; font-size: 6.4pt; color: #64748b; font-style: italic;">
            ✎ <strong>Dual-Coding Sketchpad:</strong> Sketch the 36 barrels in the Parliament undercroft, the Monteagle letter, or Guy Fawkes holding his lantern and fuse.
          </span>
          <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6.2pt; color: #94a3b8;">
            <span>Key term: Recusancy &amp; Counter-Espionage</span>
            <span>Date: 5 Nov 1605</span>
          </div>
        </div>
      </div>

    </div>

    <!-- Bottom Synthesis Box (Facing Spread Left) -->
    <div style="border: 1.2px solid #1e3a8a; border-radius: 4px; padding: 3px 8px; background: #eff6ff; display: flex; justify-content: space-between; align-items: center; margin-top: 3px;">
      <span style="font-family: 'Inter', sans-serif; font-size: 7.1pt; color: #1e3a8a;">
        <strong>Timeline Check:</strong> Why did the fall of Constantinople in 1453 force European crowns out onto the Atlantic Ocean?
      </span>
      <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; color: #0f172a; white-space: nowrap; margin-left: 8px;">
        See Milestone 5 Facing Right &rarr;
      </span>
    </div>

    <!-- Footer Strip -->
    <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #64748b; display: flex; justify-content: space-between; border-top: 1.2px solid #cbd5e1; padding-top: 3px;">
      <span>The History Department &bull; Year 8 Early Modern World &bull; Living Chronology</span>
      <span>Page 2 (Facing Spread Left)</span>
    </div>
  </div>
  `;

  // PAGE 3: LIVING UNIT TIMELINE (1642–1739) · PART II (Facing Spread Right)
  html += `
  <div class="page page-container recto-page" id="page-3" style="padding: 10px 14px; display: flex; flex-direction: column; height: 256mm; justify-content: space-between; box-sizing: border-box;">
    <div>
      <div style="border-bottom: 2px solid #0f172a; padding-bottom: 3px; margin-bottom: 4px; display: flex; justify-content: space-between; align-items: baseline;">
        <h2 style="margin: 0; font-family: 'Playfair Display', serif; font-size: 13pt; color: #0f172a; text-transform: uppercase; font-weight: 900; letter-spacing: 0.5px;">
          Living Unit Timeline &bull; Part 2: Civil War, Finance &amp; Enslaved Resistance (1642–1739)
        </h2>
        <span class="archival-badge" style="background: #1e3a8a; color: #ffffff; border-color: #1e3a8a; font-size: 6.8pt; padding: 1.5px 6px;">Pages 2–3 Facing Spread</span>
      </div>
      <div style="border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 4px; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #475569; display: flex; justify-content: space-between;">
        <span><strong>Timeline Mission:</strong> In each lesson, turn back to this double-page spread to illustrate the milestone sketchpad with your visual symbol and key notes.</span>
        <span style="font-weight: 700; color: #1e3a8a;">Chronological Spine &bull; Facing Right</span>
      </div>
    </div>

    <!-- Milestones 5 to 8 Container -->
    <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; margin: 2px 0;">
      
      <!-- Milestone 5 -->
      <div style="border: 1.2px solid #0f172a; border-radius: 4px; padding: 4px 7px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between; margin-bottom: 3px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1px;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="background: #1e3a8a; color: #ffffff; font-family: monospace; font-size: 7.6pt; font-weight: 800; padding: 1px 5px; border-radius: 2px;">1642–1649</span>
            <strong style="font-family: 'Inter', sans-serif; font-size: 8.0pt; color: #0f172a;">Milestone 5: The English Civil War &amp; Execution of Charles I</strong>
          </div>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; color: #1e3a8a; background: #eff6ff; border: 1px solid #bfdbfe; padding: 1px 5px; border-radius: 2px;">Lesson 5</span>
        </div>
        <p style="font-family: 'Georgia', serif; font-size: 7.2pt; color: #334155; margin: 0 0 3px 0; line-height: 1.25;">
          Constitutional collision over Divine Right, Ship Money, and religion plunges England into civil war. Parliament's New Model Army defeats Royalist forces. In January 1649, Charles I is executed outside Whitehall for treason against his own people; England becomes an unprecedented Puritan republic under Oliver Cromwell.
        </p>
        <div style="border: 1.2px dashed #94a3b8; border-radius: 3px; background: #fdfbf7; height: 26mm; padding: 3px 6px; display: flex; flex-direction: column; justify-content: space-between;">
          <span style="font-family: 'Inter', sans-serif; font-size: 6.4pt; color: #64748b; font-style: italic;">
            ✎ <strong>Dual-Coding Sketchpad:</strong> Sketch Charles I raising the royal standard at Nottingham, or the execution scaffold and severed crown outside Whitehall.
          </span>
          <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6.2pt; color: #94a3b8;">
            <span>Key term: Regicide &amp; Parliamentary Sovereignty</span>
            <span>Date: 30 Jan 1649</span>
          </div>
        </div>
      </div>

      <!-- Milestone 6 -->
      <div style="border: 1.2px solid #0f172a; border-radius: 4px; padding: 4px 7px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between; margin-bottom: 3px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1px;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="background: #1e3a8a; color: #ffffff; font-family: monospace; font-size: 7.6pt; font-weight: 800; padding: 1px 5px; border-radius: 2px;">1688–1694</span>
            <strong style="font-family: 'Inter', sans-serif; font-size: 8.0pt; color: #0f172a;">Milestone 6: Glorious Revolution &amp; Founding of the Bank of England</strong>
          </div>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; color: #1e3a8a; background: #eff6ff; border: 1px solid #bfdbfe; padding: 1px 5px; border-radius: 2px;">Lesson 6</span>
        </div>
        <p style="font-family: 'Georgia', serif; font-size: 7.2pt; color: #334155; margin: 0 0 3px 0; line-height: 1.25;">
          James II deposed in the Glorious Revolution. William III and Mary II accept the 1689 Bill of Rights, establishing constitutional monarchy. In 1694, the Bank of England is founded, creating the National Debt; Britain's new fiscal-military state raises millions at low interest to build the Royal Navy into Europe's supreme fleet.
        </p>
        <div style="border: 1.2px dashed #94a3b8; border-radius: 3px; background: #fdfbf7; height: 26mm; padding: 3px 6px; display: flex; flex-direction: column; justify-content: space-between;">
          <span style="font-family: 'Inter', sans-serif; font-size: 6.4pt; color: #64748b; font-style: italic;">
            ✎ <strong>Dual-Coding Sketchpad:</strong> Sketch the 1689 Bill of Rights parchment, or the founding charter and gold vaults of the Bank of England in London.
          </span>
          <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6.2pt; color: #94a3b8;">
            <span>Key term: Fiscal-Military State</span>
            <span>Date: 1688 / 1694</span>
          </div>
        </div>
      </div>

      <!-- Milestone 7 -->
      <div style="border: 1.2px solid #0f172a; border-radius: 4px; padding: 4px 7px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between; margin-bottom: 3px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1px;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="background: #1e3a8a; color: #ffffff; font-family: monospace; font-size: 7.6pt; font-weight: 800; padding: 1px 5px; border-radius: 2px;">c.1700–1780</span>
            <strong style="font-family: 'Inter', sans-serif; font-size: 8.0pt; color: #0f172a;">Milestone 7: The Transatlantic Slave Trade &amp; The Brookes</strong>
          </div>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; color: #1e3a8a; background: #eff6ff; border: 1px solid #bfdbfe; padding: 1px 5px; border-radius: 2px;">Lesson 7</span>
        </div>
        <p style="font-family: 'Georgia', serif; font-size: 7.2pt; color: #334155; margin: 0 0 3px 0; line-height: 1.25;">
          British ports (Liverpool, Bristol, London) dominate the Triangular Trade. British ships force over 3 million enslaved Africans across the catastrophic Middle Passage into chattel slavery on Caribbean sugar estates. In 1788, the abolitionist plan of the slave ship Brookes exposes the industrial scale of human commodification.
        </p>
        <div style="border: 1.2px dashed #94a3b8; border-radius: 3px; background: #fdfbf7; height: 26mm; padding: 3px 6px; display: flex; flex-direction: column; justify-content: space-between;">
          <span style="font-family: 'Inter', sans-serif; font-size: 6.4pt; color: #64748b; font-style: italic;">
            ✎ <strong>Dual-Coding Sketchpad:</strong> Sketch the chilling cross-section diagram of the slave ship Brookes, or the triangular flow of guns, captives, and sugar.
          </span>
          <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6.2pt; color: #94a3b8;">
            <span>Key term: Triangular Trade &amp; Chattel Slavery</span>
            <span>Date: 18th Century</span>
          </div>
        </div>
      </div>

      <!-- Milestone 8 -->
      <div style="border: 1.2px solid #0f172a; border-radius: 4px; padding: 4px 7px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1px;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="background: #1e3a8a; color: #ffffff; font-family: monospace; font-size: 7.6pt; font-weight: 800; padding: 1px 5px; border-radius: 2px;">1739–1760</span>
            <strong style="font-family: 'Inter', sans-serif; font-size: 8.0pt; color: #0f172a;">Milestone 8: Jamaican Maroon Sovereignty &amp; Tacky’s Rebellion</strong>
          </div>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; color: #1e3a8a; background: #eff6ff; border: 1px solid #bfdbfe; padding: 1px 5px; border-radius: 2px;">Lesson 8</span>
        </div>
        <p style="font-family: 'Georgia', serif; font-size: 7.2pt; color: #334155; margin: 0 0 3px 0; line-height: 1.25;">
          Enslaved Africans actively resist the plantation machine through sabotage, cultural preservation, and armed insurrection. In Jamaica, Queen Nanny leads Maroon guerillas against British regiments, forcing the Crown to sign the 1739 Peace Treaty recognizing Maroon sovereignty—proving black agency long before parliamentary abolition.
        </p>
        <div style="border: 1.2px dashed #94a3b8; border-radius: 3px; background: #fdfbf7; height: 26mm; padding: 3px 6px; display: flex; flex-direction: column; justify-content: space-between;">
          <span style="font-family: 'Inter', sans-serif; font-size: 6.4pt; color: #64748b; font-style: italic;">
            ✎ <strong>Dual-Coding Sketchpad:</strong> Sketch Queen Nanny’s Blue Mountain fighters, the horn (abeng) signaling across ravines, or the 1739 Peace Treaty.
          </span>
          <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6.2pt; color: #94a3b8;">
            <span>Key term: Maroon Sovereignty &amp; Agency</span>
            <span>Date: 1739 / 1760</span>
          </div>
        </div>
      </div>

    </div>

    <!-- Bottom Synthesis Box (Facing Spread Right) -->
    <div style="border: 1.2px solid #1e3a8a; border-radius: 4px; padding: 3px 8px; background: #eff6ff; display: flex; justify-content: space-between; align-items: center; margin-top: 3px;">
      <span style="font-family: 'Inter', sans-serif; font-size: 7.1pt; color: #1e3a8a;">
        <strong>Timeline Check:</strong> How did the wealth generated by Atlantic trade and the 1688 financial settlement transform Britain into a global superpower?
      </span>
      <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; color: #0f172a; white-space: nowrap; margin-left: 8px;">
        Turn overleaf for Lesson 1 (Pages 4–5) &rarr;
      </span>
    </div>

    <!-- Footer Strip -->
    <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #64748b; display: flex; justify-content: space-between; border-top: 1.2px solid #cbd5e1; padding-top: 3px;">
      <span>The History Department &bull; Year 8 Early Modern World &bull; Living Chronology</span>
      <span>Page 3 (Facing Spread Right)</span>
    </div>
  </div>
  `;

  // ==========================================
  // LESSONS 1 TO 8: FACING 2-PAGE SPREADS!
  // ==========================================
  lessonConfigs.forEach((cfg, lIdx) => {
    const leftPageNum = lIdx * 2 + 4;
    const rightPageNum = lIdx * 2 + 5;

    // ----------------------------------------------------
    // LEFT PAGE (Verso, Even Page Number: 4, 6, 8, 10, 12, 14, 16, 18)
    // ----------------------------------------------------
    html += `
    <div class="page page-container" id="page-${leftPageNum}" style="padding: 10px 0; display: flex; flex-direction: column; height: 256mm; justify-content: space-between;">
      <div>
        <!-- Lesson Header -->
        <div style="border-bottom: 2px solid #1e3a8a; padding-bottom: 4px; margin-bottom: 5px; display: flex; justify-content: space-between; align-items: flex-end;">
          <div>
            <div style="font-family: 'Inter', sans-serif; font-size: 7.8pt; text-transform: uppercase; letter-spacing: 1px; color: #64748b; font-weight: 600;">
              KS3 Early Modern World &bull; Lesson ${lIdx + 1}
            </div>
            <h2 style="font-family: 'Playfair Display', serif; font-size: 12.2pt; color: #0f172a; margin: 2px 0 0 0; line-height: 1.2;">
              L${lIdx + 1}: ${cfg.enquiryQuestion.replace(/^Enquiry:\s*/i, '')}
            </h2>
          </div>
          <span class="archival-badge" style="background: #f8fafc; color: #1e3a8a; border-color: #cbd5e1; flex-shrink: 0; font-size: 7pt;">${cfg.genre}</span>
        </div>

        <!-- Learning Objectives -->
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 4px 8px; margin-bottom: 5px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; text-transform: uppercase; color: #475569; letter-spacing: 0.5px; display: block; margin-bottom: 2px;">Core Learning Objectives:</strong>
          <ul style="margin: 0; padding-left: 15px; font-family: 'Inter', sans-serif; font-size: 8.0pt; color: #334155; line-height: 1.3;">
            <li>Explain the historical context, global geopolitical shifts, and competing perspectives of this enquiry.</li>
            <li>Deploy precise factual evidence to analyse cause, consequence, or second-order significance.</li>
            <li>Formulate an independent, evaluative historical judgement supported by causal reasoning.</li>
          </ul>
        </div>

        <!-- Do Now Recall Strip (Task 1) -->
        <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 4px 8px; margin-bottom: 4px; background: #ffffff;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px; margin-bottom: 3px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 8.0pt; text-transform: uppercase; letter-spacing: 0.6px; color: #0f172a;">Task 1: 'Do Now' Retrieval Practice</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 700; color: #1e3a8a; background: #eff6ff; border: 1px solid #bfdbfe; padding: 1px 7px; border-radius: 3px;">Score: &nbsp; &nbsp; / 5</span>
          </div>
          <div style="grid-template-columns: repeat(5, 1fr); gap: 5px; display: grid;">
            ${(cfg.doNow || [])
              .map(
                (item, qIdx) => `
              <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 3px; padding: 3px 4px; display: flex; flex-direction: column; justify-content: space-between;">
                <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; line-height: 1.18; color: #0f172a; margin-bottom: 2px;">
                  <strong style="color: #1e3a8a;">Q${qIdx + 1}:</strong> ${item.q}
                </div>
                <div>
                  <div class="task-line-dotted" style="height: 5.2mm;"></div>
                  <div class="task-line-dotted" style="height: 5.2mm;"></div>
                </div>
              </div>
            `,
              )
              .join('')}
          </div>
        </div>

        <!-- Task 2: Core Disciplinary Vocabulary -->
        <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 4px 8px; margin-bottom: 4px; background: #fdfbf7;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 8.0pt; text-transform: uppercase; color: #0f172a; letter-spacing: 0.5px;">Task 2: Core Disciplinary Vocabulary</strong>
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #334155; margin-bottom: 2px;">
            ${cfg.vocabTask.prompt}
          </div>
          <div class="auto-fill-lines">
            <div class="task-line-dotted" style="height: 5.4mm;"></div>
            <div class="task-line-dotted" style="height: 5.4mm;"></div>
          </div>
        </div>
      </div>

      <!-- Task 3 Preparation Bridge Container (Expanded to absorb vertical space) -->
      <div style="border: 1.5px solid #1e3a8a; border-radius: 5px; padding: 5px 8px; background: #ffffff; margin-bottom: 2px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid #1e3a8a; padding-bottom: 2px; margin-bottom: 3px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 8.4pt; color: #1e3a8a; text-transform: uppercase; letter-spacing: 0.5px;">
              ${cfg.bridgeTask.title}
            </strong>
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #334155; margin-bottom: 4px;">
            ${cfg.bridgeTask.instruction} <strong style="color: #1e3a8a;">Extract 3 key pieces of factual evidence from the lesson narrative into each column, then synthesise below:</strong>
          </div>
        </div>

        <!-- Dual Evidence Columns (Side-by-Side Active Extraction with Ruled Writing Lines) -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 7px; margin-bottom: 4px;">
          <!-- Column 1 -->
          <div style="border: 1.2px solid #cbd5e1; border-top: 3px solid #0369a1; border-radius: 4px; padding: 4px 6px; background: #f8fafc;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #0369a1; display: block; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 3px; text-transform: uppercase;">
              ${cfg.bridgeTask.col1Title}
            </strong>
            <div style="display: flex; flex-direction: column; gap: 3px;">
              <div>
                <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #0369a1;">Point 1:</strong>
                <div class="task-line" style="height: 6.8mm; border-bottom: 1.2px solid #94a3b8;"></div>
                <div class="task-line" style="height: 6.8mm; border-bottom: 1.2px solid #94a3b8;"></div>
              </div>
              <div>
                <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #0369a1;">Point 2:</strong>
                <div class="task-line" style="height: 6.8mm; border-bottom: 1.2px solid #94a3b8;"></div>
                <div class="task-line" style="height: 6.8mm; border-bottom: 1.2px solid #94a3b8;"></div>
              </div>
              <div>
                <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #0369a1;">Point 3:</strong>
                <div class="task-line" style="height: 6.8mm; border-bottom: 1.2px solid #94a3b8;"></div>
                <div class="task-line" style="height: 6.8mm; border-bottom: 1.2px solid #94a3b8;"></div>
              </div>
            </div>
          </div>

          <!-- Column 2 -->
          <div style="border: 1.2px solid #cbd5e1; border-top: 3px solid #b91c1c; border-radius: 4px; padding: 4px 6px; background: #fffaf0;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #b91c1c; display: block; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 3px; text-transform: uppercase;">
              ${cfg.bridgeTask.col2Title}
            </strong>
            <div style="display: flex; flex-direction: column; gap: 3px;">
              <div>
                <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #b91c1c;">Point 1:</strong>
                <div class="task-line" style="height: 6.8mm; border-bottom: 1.2px solid #fca5a5;"></div>
                <div class="task-line" style="height: 6.8mm; border-bottom: 1.2px solid #fca5a5;"></div>
              </div>
              <div>
                <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #b91c1c;">Point 2:</strong>
                <div class="task-line" style="height: 6.8mm; border-bottom: 1.2px solid #fca5a5;"></div>
                <div class="task-line" style="height: 6.8mm; border-bottom: 1.2px solid #fca5a5;"></div>
              </div>
              <div>
                <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #b91c1c;">Point 3:</strong>
                <div class="task-line" style="height: 6.8mm; border-bottom: 1.2px solid #fca5a5;"></div>
                <div class="task-line" style="height: 6.8mm; border-bottom: 1.2px solid #fca5a5;"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Full-Width Synthesis & Disciplinary Argument Workspace -->
        <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 4px 7px; background: #ffffff; margin-bottom: 3px;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px; border-bottom: 1px dashed #cbd5e1; padding-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #1e3a8a; text-transform: uppercase;">
              ✍️ Task 3 Synthesis &amp; Disciplinary Argument (Bridge to Task 4):
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.9pt; color: #475569;">
              ${cfg.bridgeTask.synthesisPrompt || 'Synthesise both perspectives in 3–4 developed sentences using precise causal evidence:'}
            </span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 0;">
            <div class="task-line-dotted" style="height: 7.8mm;"></div>
            <div class="task-line-dotted" style="height: 7.8mm;"></div>
            <div class="task-line-dotted" style="height: 7.8mm;"></div>
            <div class="task-line-dotted" style="height: 7.8mm;"></div>
            <div class="task-line-dotted" style="height: 7.8mm;"></div>
            <div class="task-line-dotted" style="height: 7.8mm;"></div>
          </div>
        </div>

        <div>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #64748b; margin-top: 1px;">
            ${cfg.bridgeTask.clue}
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 7.9pt; color: #1e3a8a; font-style: italic; border-top: 1px dotted #cbd5e1; padding-top: 2px; margin-top: 2px;">
            ${cfg.bridgeTask.scholarsEdge}
          </div>
        </div>
      </div>

      <!-- Left Page Footer -->
      <div style="font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #64748b; display: flex; justify-content: space-between; border-top: 1.2px solid #cbd5e1; padding-top: 3px; margin-top: 2px;">
        <span>The History Department &bull; KS3 The Early Modern World (1450–1750)</span>
        <span>Page ${leftPageNum} (Facing Spread Left)</span>
      </div>
    </div>
    `;

    // ----------------------------------------------------
    // RIGHT PAGE (Recto, Odd Page Number: 5, 7, 9, 11, 13, 15, 17, 19)
    // ----------------------------------------------------
    if (cfg.taskType === 'source_utility') {
      // ====================================================
      // TEMPLATE A: DUAL-SOURCE UTILITY (Edexcel Papers 1 & 3 Prep)
      // ====================================================
      html += `
    <div class="page page-container" id="page-${rightPageNum}" style="padding: 10px 0; display: flex; flex-direction: column; height: 256mm; justify-content: space-between;">
      <div>
        <!-- Enquiry Question Header -->
        <div style="border-bottom: 2px solid #1e3a8a; padding-bottom: 4px; margin-bottom: 5px; display: flex; justify-content: space-between; align-items: flex-end;">
          <div>
            <div style="font-family: 'Inter', sans-serif; font-size: 7.8pt; text-transform: uppercase; letter-spacing: 1px; color: #1e3a8a; font-weight: 700;">
              Task 4: Historical Skill: ${cfg.skill} &bull; Dual-Source Evidence
            </div>
            <h3 style="font-family: 'Playfair Display', serif; font-size: 11.5pt; color: #0f172a; margin: 2px 0 0 0; line-height: 1.2;">
              ${cfg.enquiryQuestion}
            </h3>
          </div>
          <span class="archival-badge" style="background: #eff6ff; color: #1e3a8a; border-color: #bfdbfe; flex-shrink: 0; font-size: 7pt;">Edexcel Paper 1 &amp; 3 Prep</span>
        </div>

        <!-- Dual Primary Sources Box (Side-by-Side) -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 7px; margin-bottom: 4px;">
          <!-- Source A -->
          <div style="border: 1.2px solid #cbd5e1; border-top: 3px solid #1e3a8a; border-radius: 4px; padding: 5px 7px; background: #ffffff;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #1e3a8a; text-transform: uppercase;">${cfg.sourceA.title}</strong>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 7.8pt; color: #1e293b; font-style: italic; margin: 0 0 3px 0; line-height: 1.25;">
              ${cfg.sourceA.text}
            </p>
            <div style="font-family: 'Inter', sans-serif; font-size: 6.6pt; color: #64748b; border-top: 1px dotted #cbd5e1; padding-top: 2px; margin-bottom: 2px;">
              <strong>Record:</strong> ${cfg.sourceA.shelfmark}
            </div>
            <div style="font-family: 'Inter', sans-serif; font-size: 7.0pt; color: #0369a1; background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 2px; padding: 2px 4px; line-height: 1.2;">
              ${cfg.sourceA.clue}
            </div>
          </div>

          <!-- Source B -->
          <div style="border: 1.2px solid #cbd5e1; border-top: 3px solid #0369a1; border-radius: 4px; padding: 5px 7px; background: #ffffff;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #0369a1; text-transform: uppercase;">${cfg.sourceB.title}</strong>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 7.8pt; color: #1e293b; font-style: italic; margin: 0 0 3px 0; line-height: 1.25;">
              ${cfg.sourceB.text}
            </p>
            <div style="font-family: 'Inter', sans-serif; font-size: 6.6pt; color: #64748b; border-top: 1px dotted #cbd5e1; padding-top: 2px; margin-bottom: 2px;">
              <strong>Record:</strong> ${cfg.sourceB.shelfmark}
            </div>
            <div style="font-family: 'Inter', sans-serif; font-size: 7.0pt; color: #0369a1; background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 2px; padding: 2px 4px; line-height: 1.2;">
              ${cfg.sourceB.clue}
            </div>
          </div>
        </div>

        <!-- Disciplinary Planning Matrix (3 Columns) -->
        <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 4px 6px; background: #f8fafc; margin-bottom: 4px;">
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px; margin-bottom: 3px;">
            ${cfg.matrix
              .map(
                (m) => `
              <div style="border: 1px solid #e2e8f0; border-radius: 3px; padding: 3px 5px; background: #ffffff;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #1e3a8a; display: block; border-bottom: 1px solid #e2e8f0; padding-bottom: 1px; margin-bottom: 1px;">${m.col}</strong>
                <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #334155; line-height: 1.2; display: block;">${m.text}</span>
              </div>
            `,
              )
              .join('')}
          </div>
          <div style="border-top: 1px dashed #cbd5e1; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #475569; line-height: 1.25;">
            <strong>Sentence Starters &amp; Connectives:</strong> ${cfg.connectives}
          </div>
        </div>

        <!-- Ruled Writing Lines (14 Lines at 7.8mm Line Height) -->
        <div class="auto-fill-writing-lines" data-line-height="7.8" style="width: 100%; margin-bottom: 3px;">
          ${Array(14).fill('<div class="task-line" style="height: 7.8mm;"></div>').join('')}
        </div>
      </div>

      <!-- Footer Section: Strictly Timeline Mission Box & Page Footer -->
      <div>
        <!-- Timeline Mission Box (Connecting Task 4 back to Pages 2–3) -->
        <div style="border: 1.2px solid #1e3a8a; border-radius: 4px; padding: 2.5px 8px; background: #eff6ff; display: flex; align-items: center; justify-content: space-between; margin-bottom: 3px;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #1e3a8a; text-transform: uppercase; letter-spacing: 0.5px; white-space: nowrap;">
              Timeline Mission &bull; Pages 2–3:
            </strong>
            <span style="font-family: 'Georgia', serif; font-size: 7.2pt; color: #1e293b; font-style: italic;">
              ${cfg.timelineMission || 'Illustrate the milestone sketchpad on Pages 2–3 with your visual symbol.'}
            </span>
          </div>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; color: #1e3a8a; white-space: nowrap; margin-left: 8px;">
            Pages 2–3 &rarr;
          </span>
        </div>

        <!-- Right Page Footer -->
        <div style="font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #64748b; display: flex; justify-content: space-between; border-top: 1.2px solid #cbd5e1; padding-top: 3px; margin-top: 3px;">
          <span>Source Utility Assessment &bull; The History Department</span>
          <span>Page ${rightPageNum} (Facing Spread Right)</span>
        </div>
      </div>
    </div>
      `;
    } else if (cfg.taskType === 'historical_interpretations') {
      // ====================================================
      // TEMPLATE B: HISTORICAL INTERPRETATIONS (Edexcel Paper 3 Prep)
      // ====================================================
      html += `
    <div class="page page-container" id="page-${rightPageNum}" style="padding: 10px 0; display: flex; flex-direction: column; height: 256mm; justify-content: space-between;">
      <div>
        <!-- Enquiry Question Header -->
        <div style="border-bottom: 2px solid #1e3a8a; padding-bottom: 4px; margin-bottom: 5px; display: flex; justify-content: space-between; align-items: flex-end;">
          <div>
            <div style="font-family: 'Inter', sans-serif; font-size: 7.8pt; text-transform: uppercase; letter-spacing: 1px; color: #1e3a8a; font-weight: 700;">
              Task 4: Historical Skill: ${cfg.skill} &bull; Historiographical Debate
            </div>
            <h3 style="font-family: 'Playfair Display', serif; font-size: 11.5pt; color: #0f172a; margin: 2px 0 0 0; line-height: 1.2;">
              ${cfg.enquiryQuestion}
            </h3>
          </div>
          <span class="archival-badge" style="background: #fef2f2; color: #b91c1c; border-color: #fecaca; flex-shrink: 0; font-size: 7pt;">Edexcel Paper 3 Prep</span>
        </div>

        <!-- Dual Interpretations Box (Side-by-Side) -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 7px; margin-bottom: 4px;">
          <!-- Interpretation 1 -->
          <div style="border: 1.2px solid #cbd5e1; border-top: 3px solid #b91c1c; border-radius: 4px; padding: 5px 7px; background: #ffffff;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #b91c1c; text-transform: uppercase;">${cfg.interp1.title}</strong>
            </div>
            <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #991b1b; font-weight: 700; text-transform: uppercase; margin-bottom: 2px;">
              ${cfg.interp1.badge}
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 7.8pt; color: #1e293b; font-style: italic; margin: 0 0 3px 0; line-height: 1.25;">
              ${cfg.interp1.text}
            </p>
            <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b; border-top: 1px dotted #cbd5e1; padding-top: 2px;">
              <strong>Scholar:</strong> ${cfg.interp1.author}
            </div>
          </div>

          <!-- Interpretation 2 -->
          <div style="border: 1.2px solid #cbd5e1; border-top: 3px solid #1e3a8a; border-radius: 4px; padding: 5px 7px; background: #ffffff;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #1e3a8a; text-transform: uppercase;">${cfg.interp2.title}</strong>
            </div>
            <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #1e3a8a; font-weight: 700; text-transform: uppercase; margin-bottom: 2px;">
              ${cfg.interp2.badge}
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 7.8pt; color: #1e293b; font-style: italic; margin: 0 0 3px 0; line-height: 1.25;">
              ${cfg.interp2.text}
            </p>
            <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b; border-top: 1px dotted #cbd5e1; padding-top: 2px;">
              <strong>Scholar:</strong> ${cfg.interp2.author}
            </div>
          </div>
        </div>

        <!-- Disciplinary Planning Matrix (3 Columns) -->
        <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 4px 6px; background: #f8fafc; margin-bottom: 4px;">
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px; margin-bottom: 3px;">
            ${cfg.matrix
              .map(
                (m) => `
              <div style="border: 1px solid #e2e8f0; border-radius: 3px; padding: 3px 5px; background: #ffffff;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #1e3a8a; display: block; border-bottom: 1px solid #e2e8f0; padding-bottom: 1px; margin-bottom: 1px;">${m.col}</strong>
                <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #334155; line-height: 1.2; display: block;">${m.text}</span>
              </div>
            `,
              )
              .join('')}
          </div>
          <div style="border-top: 1px dashed #cbd5e1; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #475569; line-height: 1.25;">
            <strong>Sentence Starters &amp; Connectives:</strong> ${cfg.connectives}
          </div>
        </div>

        <!-- Ruled Writing Lines (14 Lines at 7.8mm Line Height) -->
        <div class="auto-fill-writing-lines" data-line-height="7.8" style="width: 100%; margin-bottom: 3px;">
          ${Array(14).fill('<div class="task-line" style="height: 7.8mm;"></div>').join('')}
        </div>
      </div>

      <!-- Footer Section: Strictly Timeline Mission Box & Page Footer -->
      <div>
        <!-- Timeline Mission Box (Connecting Task 4 back to Pages 2–3) -->
        <div style="border: 1.2px solid #1e3a8a; border-radius: 4px; padding: 2.5px 8px; background: #eff6ff; display: flex; align-items: center; justify-content: space-between; margin-bottom: 3px;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #1e3a8a; text-transform: uppercase; letter-spacing: 0.5px; white-space: nowrap;">
              Timeline Mission &bull; Pages 2–3:
            </strong>
            <span style="font-family: 'Georgia', serif; font-size: 7.2pt; color: #1e293b; font-style: italic;">
              ${cfg.timelineMission || 'Illustrate the milestone sketchpad on Pages 2–3 with your visual symbol.'}
            </span>
          </div>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; color: #1e3a8a; white-space: nowrap; margin-left: 8px;">
            Pages 2–3 &rarr;
          </span>
        </div>

        <!-- Right Page Footer -->
        <div style="font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #64748b; display: flex; justify-content: space-between; border-top: 1.2px solid #cbd5e1; padding-top: 3px; margin-top: 3px;">
          <span>Historical Interpretations Assessment &bull; The History Department</span>
          <span>Page ${rightPageNum} (Facing Spread Right)</span>
        </div>
      </div>
    </div>
      `;
    } else {
      // ====================================================
      // TEMPLATE C: EXTENDED WRITING / DISCIPLINARY EVALUATION
      // ====================================================
      html += `
    <div class="page page-container" id="page-${rightPageNum}" style="padding: 10px 0; display: flex; flex-direction: column; height: 256mm; justify-content: space-between;">
      <div>
        <!-- Enquiry Question Header -->
        <div style="border-bottom: 2px solid #1e3a8a; padding-bottom: 4px; margin-bottom: 5px; display: flex; justify-content: space-between; align-items: flex-end;">
          <div>
            <div style="font-family: 'Inter', sans-serif; font-size: 8.0pt; text-transform: uppercase; letter-spacing: 1px; color: #1e3a8a; font-weight: 700;">
              Task 4: Historical Skill: ${cfg.skill} &bull; Extended Writing
            </div>
            <h3 style="font-family: 'Playfair Display', serif; font-size: 12.0pt; color: #0f172a; margin: 2px 0 0 0; line-height: 1.25;">
              ${cfg.enquiryQuestion}
            </h3>
          </div>
          <span class="archival-badge" style="background: #eff6ff; color: #1e3a8a; border-color: #bfdbfe; flex-shrink: 0; font-size: 7pt;">Independent Argument</span>
        </div>

        <!-- Bespoke Disciplinary Structure Strip (3-Columns, 8.0pt) -->
        <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 4px 7px; background: #f8fafc; margin-bottom: 4px;">
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px; margin-bottom: 3px;">
            ${cfg.structureStrip
              .map(
                (s) => `
              <div style="border: 1px solid #e2e8f0; border-radius: 3px; padding: 3px 5px; background: #ffffff;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 8.0pt; color: #1e3a8a; display: block; border-bottom: 1px solid #e2e8f0; padding-bottom: 1px; margin-bottom: 2px;">${s.col}</strong>
                <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #334155; line-height: 1.22; display: block;">${s.text}</span>
              </div>
            `,
              )
              .join('')}
          </div>
          
          <div style="border-top: 1px dashed #cbd5e1; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #475569; line-height: 1.25;">
            <strong>Sentence Starters &amp; Connectives:</strong> ${cfg.connectives}
          </div>
        </div>

        <!-- Writing Framework Strip (PEEL Mastery) -->
        <div style="background: #f8fafc; border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 3px 8px; margin-bottom: 4px; display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #1e293b;">
          <span><strong style="color: #1e3a8a;">[P] Point:</strong> Clear direct answer to enquiry.</span>
          <span><strong style="color: #1e3a8a;">[E] Evidence:</strong> Specific names, dates, acts &amp; data.</span>
          <span><strong style="color: #1e3a8a;">[E] Explanation:</strong> Causal mechanism (why &amp; how).</span>
          <span><strong style="color: #1e3a8a;">[L] Link:</strong> Evaluative conclusion.</span>
        </div>

        <!-- Ruled Writing Lines (17 Lines at 7.8mm Line Height) -->
        <div class="auto-fill-writing-lines" data-line-height="7.8" style="width: 100%; margin-bottom: 3px;">
          ${Array(17).fill('<div class="task-line" style="height: 7.8mm;"></div>').join('')}
        </div>
      </div>

      <!-- Footer Section: Strictly Timeline Mission Box & Page Footer -->
      <div>
        <!-- Timeline Mission Box (Connecting Task 4 back to Pages 2–3) -->
        <div style="border: 1.2px solid #1e3a8a; border-radius: 4px; padding: 2.5px 8px; background: #eff6ff; display: flex; align-items: center; justify-content: space-between; margin-bottom: 3px;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #1e3a8a; text-transform: uppercase; letter-spacing: 0.5px; white-space: nowrap;">
              Timeline Mission &bull; Pages 2–3:
            </strong>
            <span style="font-family: 'Georgia', serif; font-size: 7.2pt; color: #1e293b; font-style: italic;">
              ${cfg.timelineMission || 'Illustrate the milestone sketchpad on Pages 2–3 with your visual symbol.'}
            </span>
          </div>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; color: #1e3a8a; white-space: nowrap; margin-left: 8px;">
            Pages 2–3 &rarr;
          </span>
        </div>

        <!-- Right Page Footer -->
        <div style="font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #64748b; display: flex; justify-content: space-between; border-top: 1.2px solid #cbd5e1; padding-top: 3px; margin-top: 3px;">
          <span>Extended Writing Assessment &bull; The History Department</span>
          <span>Page ${rightPageNum} (Facing Spread Right)</span>
        </div>
      </div>
    </div>
      `;
    }
  });

  // ==========================================
  // PAGE 20: OUTSIDE BACK COVER (Standard Publisher Architecture)
  // ==========================================
  html += renderKs3BackCover({
    unitId: 'early_modern_world',
    unitTitle: 'The Early Modern World (1450–1750)',
    yearGroup: 'Year 8',
    trackerTitle: 'Progress & Assessment Record',
    trackerSubtitle: 'Key Stage 3 Historical Studies • Termly Evidence Ledger',
    lessons: lessonConfigs.map((cfg, i) => ({
      num: i + 1,
      title: cfg.enquiryQuestion.replace(/^Enquiry:\s*/i, '').split(':')[0] || `Enquiry ${i + 1}`,
      skill: cfg.skill || 'Historical Analysis',
      doNowMax: 5,
      taskMax: 'Grade',
      feedbackHint:
        i === 0
          ? 'Ottomans vs Europe periphery'
          : i === 1
            ? 'Papal Bull vs Hakluyt motives'
            : i === 2
              ? 'EIC trade to territorial rule'
              : i === 3
                ? 'Recusancy & surveillance state'
                : i === 4
                  ? 'Divine Right vs Civil War regicide'
                  : i === 5
                    ? '1688 Settlement & Bank of England'
                    : i === 6
                      ? 'Brookes plan & Middle Passage'
                      : 'Queen Nanny & Maroon resistance',
    })),
    qrLessons: lessonConfigs.map((cfg, i) => {
      const subLabels = [
        'Ottoman Power',
        'Early Empire',
        'Mughal India',
        'Jacobean State',
        'Civil War',
        'Glorious Rev.',
        'Atlantic Slave',
        'Resistance',
      ];
      return {
        label: `L${i + 1}`,
        subLabel: subLabels[i] || `Lesson ${i + 1}`,
        title: `Lesson ${i + 1}`,
        url: `https://the-history-revision-hub.netlify.app/?view=lessons&unit=early_modern_world&lesson=${i + 1}`,
      };
    }),
    totalPageCount: 20,
    footerQuip: 'Permanent Scholarship Record • Retain for Synoptic Revision & GCSE Foundation',
  });

  html += `
</body>
</html>
`;

  const { buildKs3WorkbookHtml } = require('./sandbox/ks3_workbook_engine.cjs');
  const { getEarlyModernConfig } = require('./early_modern_world_config.cjs');
  return buildKs3WorkbookHtml(getEarlyModernConfig(lessonConfigs));
}

async function renderEarlyModernWorldWorkbook() {
  console.log('Rendering Year 8 Early Modern World Two-Page Spread Workbook (20 Pages)...');
  const { buildKs3WorkbookHtml } = require('./sandbox/ks3_workbook_engine.cjs');
  const { getEarlyModernConfig } = require('./early_modern_world_config.cjs');
  const html = buildKs3WorkbookHtml(getEarlyModernConfig(lessonConfigs));

  const outHtmlPath1 = path.join(
    ROOT_DIR,
    'public',
    'units',
    'early_modern_world',
    'pupil_workbook.html',
  );
  const outHtmlPath2 = path.join(ROOT_DIR, 'units', 'early_modern_world', 'pupil_workbook.html');
  const outPdfPath = path.join(ROOT_DIR, 'public', 'pdfs', 'early_modern_world_pupil_workbook.pdf');
  const outPdfPathV17 = path.join(
    ROOT_DIR,
    'public',
    'pdfs',
    'early_modern_world_pupil_workbook_FINAL_V17.pdf',
  );
  const outPdfPathDist = path.join(
    ROOT_DIR,
    'dist',
    'pdfs',
    'early_modern_world_pupil_workbook_FINAL_V17.pdf',
  );

  fs.mkdirSync(path.dirname(outHtmlPath1), { recursive: true });
  fs.mkdirSync(path.dirname(outHtmlPath2), { recursive: true });
  fs.mkdirSync(path.dirname(outPdfPath), { recursive: true });
  fs.mkdirSync(path.dirname(outPdfPathDist), { recursive: true });

  fs.writeFileSync(outHtmlPath1, html, 'utf8');
  fs.writeFileSync(outHtmlPath2, html, 'utf8');

  console.log('Compiling PDF via Puppeteer with auto-line measurement...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });
  await page.setContent(html, { waitUntil: 'networkidle0' });

  // Evaluate lines in-browser so all writing lines are dynamically populated
  await page.evaluate(() => {
    if (typeof autoFillWritingLines === 'function') {
      autoFillWritingLines();
    }
  });

  // Save the populated HTML back to file so static HTML viewers have pre-rendered lines
  const populatedHtml = await page.content();
  fs.writeFileSync(outHtmlPath1, populatedHtml, 'utf8');
  fs.writeFileSync(outHtmlPath2, populatedHtml, 'utf8');
  console.log(`✅ Saved pre-populated HTML to ${outHtmlPath1} and ${outHtmlPath2}`);

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

  // Also update V17 and dist copies so any legacy/alternate links match
  fs.copyFileSync(outPdfPath, outPdfPathV17);
  fs.copyFileSync(outPdfPath, outPdfPathDist);

  await browser.close();
  console.log(`✅ Compiled 20-Page PDF to ${outPdfPath}`);
  console.log(`✅ Synchronized PDF to ${outPdfPathV17} and ${outPdfPathDist}`);
}

if (require.main === module) {
  renderEarlyModernWorldWorkbook().catch((err) => {
    console.error('❌ Error rendering Year 8 Early Modern World workbook:', err);
    process.exit(1);
  });
}

module.exports = {
  buildEarlyModernWorldTwoPageWorkbook,
  renderEarlyModernWorldWorkbook,
  lessonConfigs,
};
