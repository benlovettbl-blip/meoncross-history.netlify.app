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
    // Lesson 1: Global Power in 1450
    taskType: 'extended_writing',
    genre: 'Genre 1: Global Encounter & Change',
    skill: 'Change & Continuity',
    genreNum: 1,
    enquiryQuestion:
      'Enquiry: Who held true global power in 1450, and why was Europe on the geographic periphery?',
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
    // Lesson 2: Religious Conflict & Global Exploration (DUAL-SOURCE UTILITY)
    taskType: 'source_utility',
    genre: 'Genre 1: Source Utility & Imperial Zeal',
    skill: 'Dual-Source Utility',
    genreNum: 1,
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
      clue: '<em>Low-Floor Clue:</em> In the Tudor era, religion and profit were inextricably linked: Queen Elizabeth I sponsored privateers like Francis Drake to strike at Catholic Spain while enriching her royal treasury.',
      scholarsEdge:
        '<strong>★ Scholar’s Edge:</strong> How does the Armada Portrait of 1588 visually combine Protestant religious providence with global imperial ownership?',
    },
  },
  {
    // Lesson 3: Trade or Takeover: Mughal India & Native America
    taskType: 'extended_writing',
    genre: 'Genre 2: Causation & Imperial Encounter',
    skill: 'Causation & Consequence',
    genreNum: 2,
    enquiryQuestion:
      'Enquiry: Trade or takeover: How did early commercial trading posts transform into colonial empires?',
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
    // Lesson 4: Gunpowder Plot & Religious Volatility
    taskType: 'extended_writing',
    genre: 'Genre 2: Religious Volatility & State Security',
    skill: 'Historical Significance',
    genreNum: 2,
    enquiryQuestion:
      'Enquiry: Why was religious division so volatile and dangerous under King James I?',
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
    // Lesson 5: The English Civil War & Charles I (HISTORIOGRAPHICAL DEBATE)
    taskType: 'historical_interpretations',
    genre: 'Genre 3: Historiographical Debate & Revolution',
    skill: 'Historical Interpretations',
    genreNum: 3,
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
      clue: '<em>Low-Floor Clue:</em> In January 1642, Charles I committed the unthinkable blunder of storming the House of Commons with armed troops to arrest five MPs; Speaker Lenthall famously defied him, declaring he served Parliament, not the King.',
      scholarsEdge:
        '<strong>★ Scholar’s Edge:</strong> How does John Morrill’s famous description of 1642 as "not England\'s first modern revolution, but her last war of religion" undermine Macaulay’s Victorian Whig myth?',
    },
  },
  {
    // Lesson 6: The Economic Shift & Glorious Revolution
    taskType: 'extended_writing',
    genre: 'Genre 3: Constitutional Turning Points',
    skill: 'Turning Point Analysis',
    genreNum: 3,
    enquiryQuestion:
      'Enquiry: How did the 1688 Glorious Revolution and the creation of the Bank of England transform British state power?',
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
    // Lesson 7: Mechanics of the Transatlantic Slave Trade
    taskType: 'extended_writing',
    genre: 'Genre 4: Historical Evidence & Chattel Slavery',
    skill: 'Historical Evidence & Cause',
    genreNum: 4,
    enquiryQuestion:
      'Enquiry: What were the systematic mechanics, commercial scale, and human cost of the Transatlantic Slave Trade?',
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
    // Lesson 8: Resistance to the Slave Trade: Maroons & Rebellion
    taskType: 'extended_writing',
    genre: 'Genre 4: Agency & Historical Resistance',
    skill: 'Agency & Historical Significance',
    genreNum: 4,
    enquiryQuestion:
      'Enquiry: How did enslaved Africans actively resist, undermine, and dismantle the Transatlantic slave system?',
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
      height: 7.2mm;
      width: 100%;
      box-sizing: border-box;
    }
    .task-line-dotted {
      border-bottom: 1.2px solid #475569;
      height: 5.4mm;
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
  </style>
</head>
<body>
`;

  // ==========================================
  // PAGE 1: FRONT COVER (Recto, Right Page)
  // ==========================================
  html += `
  <div class="page page-container" id="page-1" style="padding: 16px 18px; border: 1px solid #cbd5e1; outline: 3.5px double #0f172a; outline-offset: -8px; justify-content: flex-start;">
    <!-- Institutional Header & Pupil Registration Strip -->
    <div style="margin-bottom: 10px;">
      <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px;">
        <span style="font-family: 'Inter', sans-serif; font-size: 8.5pt; text-transform: uppercase; letter-spacing: 2px; color: #1e3a8a; font-weight: 700;">
          The History Portal &bull; Department of History
        </span>
        <span style="font-family: 'Inter', sans-serif; font-size: 8pt; text-transform: uppercase; letter-spacing: 1.5px; color: #64748b; font-weight: 600;">
          Year 8 History &bull; KS3 Core Curriculum
        </span>
      </div>

      <!-- Pupil Name & Class Box at Top -->
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
    <div style="text-align: center; border-bottom: 1px solid #cbd5e1; padding: 2px 0 8px 0; margin-bottom: 9px;">
      <h1 style="font-family: 'Playfair Display', serif; font-size: 21pt; color: #0f172a; margin: 0 0 3px 0; text-transform: uppercase; letter-spacing: 1.2px; line-height: 1.15;">
        The Early Modern World: 1450–1750
      </h1>
      <div style="font-family: 'Inter', sans-serif; font-size: 9pt; color: #334155; font-weight: 500; letter-spacing: 0.5px;">
        Global Encounters, Reformation, Civil War &amp; The Transatlantic Slave Trade
      </div>
    </div>

    <!-- Overarching Enquiry Callout Box -->
    <div style="border: 1.5px solid #1e3a8a; border-radius: 5px; padding: 8px 16px; background: #f8fafc; margin-bottom: 9px; text-align: center;">
      <div style="font-family: 'Inter', sans-serif; font-size: 7.8pt; text-transform: uppercase; letter-spacing: 1.8px; color: #1e3a8a; font-weight: 700; margin-bottom: 3px;">
        Overarching Historical Enquiry:
      </div>
      <div style="font-family: 'Playfair Display', serif; font-size: 10.8pt; color: #0f172a; font-style: italic; line-height: 1.35;">
        “How did religious conflict, oceanic exploration, constitutional civil war, and popular resistance transform Britain and the wider world?”
      </div>
    </div>

    <!-- Front Cover Image Container -->
    <div style="border: 1.2px solid #cbd5e1; border-radius: 5px; overflow: hidden; background: #f1f5f9; text-align: center; margin-bottom: 8px; flex: 1; display: flex; flex-direction: column; justify-content: center;">
      <img src="${frontCoverImage}" alt="East Offering Its Riches to Britannia" style="max-height: 98mm; width: 100%; object-fit: cover; object-position: center; display: block;">
      <div style="padding: 4px 10px; background: #ffffff; border-top: 1px solid #e2e8f0; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #475569; text-align: center; font-style: italic;">
        ‘The East Offering Its Riches to Britannia’ (Spiridione Roma, 1778) • Ceiling painting for the East India Company House, London • Visualising the colonial transfer of wealth.
      </div>
    </div>

    <!-- Term & Specification Strip -->
    <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #cbd5e1; border-bottom: 1px solid #cbd5e1; padding: 4px 6px; margin-bottom: 8px; font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #475569;">
      <span><strong>Term:</strong> Spring Term &bull; Year 8</span>
      <span><strong>Edition:</strong> 2026.1 Departmental Standard</span>
      <span><strong>Format:</strong> 20-Page Double-Page Spread (5 A3 Sheets)</span>
    </div>

    <!-- Disciplinary Genres Ribbon -->
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 5px; margin-bottom: 7px; text-align: center;">
      <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 3px; padding: 3px 2px;">
        <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 700; color: #1e3a8a; text-transform: uppercase; display: block;">Genre 1</span>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #334155;">Global Encounters</span>
      </div>
      <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 3px; padding: 3px 2px;">
        <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 700; color: #1e3a8a; text-transform: uppercase; display: block;">Genre 2</span>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #334155;">Source Utility</span>
      </div>
      <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 3px; padding: 3px 2px;">
        <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 700; color: #1e3a8a; text-transform: uppercase; display: block;">Genre 3</span>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #334155;">Historiography</span>
      </div>
      <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 3px; padding: 3px 2px;">
        <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 700; color: #1e3a8a; text-transform: uppercase; display: block;">Genre 4</span>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #334155;">Slave Resistance</span>
      </div>
    </div>

    <!-- Preservation & Academic Integrity Footer -->
    <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #64748b; text-align: center; line-height: 1.35; padding-top: 2px;">
      This workbook is a permanent academic record of historical scholarship. Bring it to every history lesson.
    </div>
  </div>
  `;

  // ==========================================
  // PAGE 2: PROGRESS & ASSESSMENT TRACKER (Verso, Left Page)
  // ==========================================
  html += `
  <div class="page page-container" id="page-2" style="padding: 10px 0; display: flex; flex-direction: column; height: 256mm; justify-content: space-between;">
    <div>
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #1e3a8a; padding-bottom: 4px; margin-bottom: 7px;">
        <h2 style="margin: 0; color: #1e3a8a; font-size: 13.5pt; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">
          Progress &amp; Assessment Tracker &bull; Year 8 Early Modern
        </h2>
        <div style="font-family: 'Inter', sans-serif; font-size: 8.5pt; font-weight: 600; color: #334155;">
          Target Level: <span style="display: inline-block; width: 65px; border-bottom: 1.5px solid #0f172a; margin-left: 4px;"></span>
        </div>
      </div>
      
      <!-- Grading Criteria Benchmarks -->
      <table style="width: 100%; border-collapse: collapse; text-align: left; font-family: 'Inter', sans-serif; font-size: 7.2pt; line-height: 1.2; margin-bottom: 6px;">
        <tbody>
          <tr>
            <td style="border: 1px solid #94a3b8; padding: 3px 6px; font-weight: 700; background-color: #1e3a8a; color: #ffffff; width: 10%; text-transform: uppercase; letter-spacing: 0.5px;">Criteria</td>
            <td style="border: 1px solid #cbd5e1; padding: 3px 6px; width: 22.5%; background: #f8fafc;"><strong style="color: #0f172a;">Emerging (1–2):</strong> Identifies simple facts; surface description of monarchs, explorers, or battles.</td>
            <td style="border: 1px solid #cbd5e1; padding: 3px 6px; width: 22.5%; background: #ffffff;"><strong style="color: #0f172a;">Emerging+ (3):</strong> Identifies causes &amp; consequences with simple historical explanation.</td>
            <td style="border: 1px solid #cbd5e1; padding: 3px 6px; width: 22.5%; background: #f8fafc;"><strong style="color: #0f172a;">Expected (4–5):</strong> Structured PEEL arguments; supports claims with specific early modern evidence.</td>
            <td style="border: 1px solid #cbd5e1; padding: 3px 6px; width: 22.5%; background: #ffffff;"><strong style="color: #0f172a;">Greater Depth (6–9):</strong> Evaluates conflicting sources/interpretations; nuanced causal synthesis.</td>
          </tr>
          <tr>
            <td style="border: 1px solid #94a3b8; padding: 2.5px 6px; font-weight: 700; background-color: #0f2942; color: #ffffff; width: 10%; text-transform: uppercase; letter-spacing: 0.5px;">Effort</td>
            <td style="border: 1px solid #cbd5e1; padding: 2.5px 6px; background: #f8fafc;"><strong style="color: #0f172a;">1 • Concern:</strong> Disengaged / incomplete work.</td>
            <td style="border: 1px solid #cbd5e1; padding: 2.5px 6px; background: #ffffff;"><strong style="color: #0f172a;">2 • Inconsistent:</strong> Requires repeated prompting.</td>
            <td style="border: 1px solid #cbd5e1; padding: 2.5px 6px; background: #f8fafc;"><strong style="color: #0f172a;">3 • Satisfactory:</strong> Meets baseline expectations.</td>
            <td style="border: 1px solid #cbd5e1; padding: 2.5px 6px; background: #ffffff;"><strong style="color: #0f172a;">4 • Good / 5 • Exemplary:</strong> Proactive focus; voluntary Scholar’s Edge extension.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div style="width: 100%; display: flex; justify-content: center; flex: 1; min-height: 0; margin-bottom: 4px;">
      <table style="page-break-inside: avoid; width: 100%; height: 100%; border-collapse: collapse; text-align: left; font-family: 'Inter', sans-serif; font-size: 7.5pt; line-height: 1.22; background-color: #ffffff; table-layout: fixed;">
        <thead>
          <tr style="background-color: #1e3a8a; color: #ffffff;">
            <th style="border: 1px solid rgba(255,255,255,0.35); padding: 5px 8px; width: 26%; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; font-size: 7.4pt;">Lesson / Enquiry Title</th>
            <th style="border: 1px solid rgba(255,255,255,0.35); padding: 5px 3px; width: 6.5%; text-align: center; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; font-size: 7.4pt;">Effort (1–5)</th>
            <th style="border: 1px solid rgba(255,255,255,0.35); padding: 5px 3px; width: 5.5%; text-align: center; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; font-size: 7.4pt;">Level</th>
            <th style="border: 1px solid rgba(255,255,255,0.35); padding: 5px 10px; width: 62%; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; font-size: 7.4pt;">Teacher Formative Feedback &amp; Next Steps</th>
          </tr>
        </thead>
        <tbody>
  `;

  lessonConfigs.forEach((cfg, i) => {
    const bg = i % 2 === 1 ? 'background-color: #f8fafc;' : 'background-color: #ffffff;';
    html += `
          <tr style="${bg}">
            <td style="border: 1px solid #cbd5e1; padding: 4.5px 8px; font-weight: 600; font-size: 7.2pt; color: #0f172a; line-height: 1.25;">
              <div style="color: #1e3a8a; font-weight: 700; font-size: 7.5pt; text-transform: uppercase; margin-bottom: 1px;">Lesson ${i + 1}</div>
              <div style="color: #334155; font-weight: 500;">${cfg.enquiryQuestion.replace(/^Enquiry:\s*/i, '')}</div>
            </td>
            <td style="border: 1px solid #cbd5e1; padding: 3px; text-align: center; font-weight: 600; font-size: 8.5pt; color: #0f172a;"></td>
            <td style="border: 1px solid #cbd5e1; padding: 3px; text-align: center; font-weight: 600; font-size: 8.5pt; color: #0f172a;"></td>
            <td style="border: 1px solid #cbd5e1; padding: 4px 10px; vertical-align: top;"></td>
          </tr>
    `;
  });

  html += `
          <tr style="background-color: #e2e8f0; font-weight: bold;">
            <td style="border: 1px solid #94a3b8; padding: 4px 8px; text-align: right; color: #0f172a; font-size: 7.6pt; text-transform: uppercase; letter-spacing: 0.5px;">
              Final Unit Level &bull; Target Outcome:
            </td>
            <td style="border: 1px solid #94a3b8; padding: 3px; background: #ffffff; text-align: center; font-size: 9pt; font-weight: 700; color: #1e3a8a;"></td>
            <td style="border: 1px solid #94a3b8; padding: 3px; background: #ffffff; text-align: center; font-size: 9pt; font-weight: 700; color: #1e3a8a;"></td>
            <td style="border: 1px solid #94a3b8; padding: 4px 10px; background: #ffffff;"></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  `;

  // ==========================================
  // PAGE 3: COURSE MAP & TIMELINE (Recto, Right Page)
  // ==========================================
  html += `
  <div class="page page-container" id="page-3" style="padding: 10px 0; display: flex; flex-direction: column; height: 256mm; justify-content: space-between;">
    <div style="flex-shrink: 0;">
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #0f172a; padding-bottom: 4px; margin-bottom: 6px;">
        <h2 style="margin: 0; font-size: 14pt; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px;">Curriculum Roadmap &amp; Chronological Spine</h2>
        <span class="archival-badge">1450 – 1750</span>
      </div>
      <p style="font-family: 'Inter', sans-serif; font-size: 8.3pt; color: #475569; margin: 0; line-height: 1.35;">
        Trace the 300-year transformation of early modern power: from the fall of Constantinople in 1453 to global oceanic rivalries, civil war regicide, financial revolution, and resistance to Atlantic slavery.
      </p>
    </div>

    <!-- Visual Chronological Spine -->
    <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; margin: 6px 0; padding: 2px 0;">
  `;

  const timelineItems = [
    {
      year: '1453',
      title: 'Fall of Constantinople & Rise of Ottoman Hegemony',
      desc: 'Sultan Mehmed II breaches Byzantine walls; Ottoman Empire takes control of Silk Road spice trade, forcing European crowns to search for oceanic routes.',
    },
    {
      year: '1494',
      title: 'Treaty of Tordesillas & Atlantic Oceanic Rivalry',
      desc: 'Pope Alexander VI divides the non-European world between Catholic Spain and Portugal, sparking fierce Protestant pushback from English and Dutch privateers.',
    },
    {
      year: '1588',
      title: 'Defeat of the Spanish Armada & English Expansion',
      desc: 'Elizabeth I’s navy repels King Philip II’s invasion fleet; England establishes global privateering, chartered trading companies, and early American colonies.',
    },
    {
      year: '1605',
      title: 'Gunpowder Plot & Jacobean Religious Volatility',
      desc: 'Catholic conspirators lead by Robert Catesby attempt to blow up King James I and Parliament; state responds with intense anti-popery legislation and surveillance.',
    },
    {
      year: '1649',
      title: 'Execution of King Charles I & The Commonwealth',
      desc: 'English Civil War concludes in unprecedented regicide; monarchy and House of Lords abolished as Oliver Cromwell establishes the Puritan Commonwealth.',
    },
    {
      year: '1688',
      title: 'Glorious Revolution & The 1689 Bill of Rights',
      desc: 'James II deposed; William III and Mary II sign the Bill of Rights, establishing parliamentary supremacy and religious limits on the British Crown.',
    },
    {
      year: '1694',
      title: 'Founding of the Bank of England & National Debt',
      desc: 'Financial Revolution creates modern public credit; British fiscal-military state funds global naval supremacy, colonial garrisons, and overseas empire.',
    },
    {
      year: '1739',
      title: 'Jamaican Maroon Treaty: Sovereign African Resistance',
      desc: 'Queen Nanny and Jamaican Maroons defeat British forces in the Blue Mountains, forcing the Crown to sign a treaty recognizing Maroon land sovereignty.',
    },
  ];

  timelineItems.forEach((item, tIdx) => {
    html += `
      <div style="display: flex; gap: 10px; align-items: flex-start; border-left: 2.5px solid #1e3a8a; padding-left: 10px; margin-bottom: 2px;">
        <div style="background: #1e3a8a; color: #ffffff; font-weight: 800; font-size: 7.8pt; padding: 2px 7px; border-radius: 3px; font-family: monospace; white-space: nowrap; flex-shrink: 0;">
          ${item.year}
        </div>
        <div style="flex: 1;">
          <div style="font-weight: 700; color: #0f172a; font-size: 8.3pt; line-height: 1.2;">${item.title}</div>
          <div style="color: #475569; font-size: 7.4pt; line-height: 1.3; margin-top: 1px;">${item.desc}</div>
        </div>
      </div>
    `;
  });

  html += `
    </div>

    <!-- Navigation Prompt to Overleaf Spread -->
    <div style="flex-shrink: 0; font-family: 'Inter', sans-serif; font-size: 8.2pt; font-weight: 600; color: #475569; text-align: center; border-top: 1px solid #cbd5e1; padding-top: 5px;">
      Turn overleaf to begin <strong>Lesson 1 (Pages 4–5 Facing Spread)</strong> ➔
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
    <div class="page page-container" id="page-${leftPageNum}">
      <div>
        <!-- Lesson Header -->
        <div style="border-bottom: 2px solid #1e3a8a; padding-bottom: 4px; margin-bottom: 6px; display: flex; justify-content: space-between; align-items: flex-end;">
          <div>
            <div style="font-family: 'Inter', sans-serif; font-size: 8pt; text-transform: uppercase; letter-spacing: 1px; color: #64748b; font-weight: 600;">
              KS3 Early Modern World &bull; Lesson ${lIdx + 1}
            </div>
            <h2 style="font-family: 'Playfair Display', serif; font-size: 12.8pt; color: #0f172a; margin: 2px 0 0 0; line-height: 1.2;">
              L${lIdx + 1}: ${cfg.enquiryQuestion.replace(/^Enquiry:\s*/i, '')}
            </h2>
          </div>
          <span class="archival-badge" style="background: #f8fafc; color: #1e3a8a; border-color: #cbd5e1; flex-shrink: 0; font-size: 7.2pt;">${cfg.genre}</span>
        </div>

        <!-- Learning Objectives -->
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 4px 8px; margin-bottom: 5px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; text-transform: uppercase; color: #475569; letter-spacing: 0.5px; display: block; margin-bottom: 2px;">Core Learning Objectives:</strong>
          <ul style="margin: 0; padding-left: 15px; font-family: 'Inter', sans-serif; font-size: 8.2pt; color: #334155; line-height: 1.3;">
            <li>Explain the historical context, global geopolitical shifts, and competing perspectives of this enquiry.</li>
            <li>Deploy precise factual evidence to analyse cause, consequence, or second-order significance.</li>
            <li>Formulate an independent, evaluative historical judgement supported by causal reasoning.</li>
          </ul>
        </div>

        <!-- Do Now Recall Strip -->
        <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 5px 8px; margin-bottom: 5px; background: #ffffff;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 3px; margin-bottom: 4px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; text-transform: uppercase; letter-spacing: 0.6px; color: #0f172a;">Task 1: 'Do Now' Retrieval Practice</strong>
            </div>
            <span style="font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 700; color: #1e3a8a; background: #eff6ff; border: 1px solid #bfdbfe; padding: 1px 7px; border-radius: 3px;">Score: &nbsp; &nbsp; / 5</span>
          </div>
          <div style="grid-template-columns: repeat(5, 1fr); gap: 6px; display: grid;">
            <div style="background: #fafaf9; border: 1px solid #e2e8f0; border-radius: 3px; padding: 3px 5px;">
              <div style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 700; color: #1e3a8a; margin-bottom: 1px;">Q1 (Last)</div>
              <div class="task-line-dotted" style="height: 5.4mm;"></div>
              <div class="task-line-dotted" style="height: 5.4mm;"></div>
            </div>
            <div style="background: #fafaf9; border: 1px solid #e2e8f0; border-radius: 3px; padding: 3px 5px;">
              <div style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 700; color: #1e3a8a; margin-bottom: 1px;">Q2 (Last)</div>
              <div class="task-line-dotted" style="height: 5.4mm;"></div>
              <div class="task-line-dotted" style="height: 5.4mm;"></div>
            </div>
            <div style="background: #fafaf9; border: 1px solid #e2e8f0; border-radius: 3px; padding: 3px 5px;">
              <div style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 700; color: #1e3a8a; margin-bottom: 1px;">Q3 (2 Ago)</div>
              <div class="task-line-dotted" style="height: 5.4mm;"></div>
              <div class="task-line-dotted" style="height: 5.4mm;"></div>
            </div>
            <div style="background: #fafaf9; border: 1px solid #e2e8f0; border-radius: 3px; padding: 3px 5px;">
              <div style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 700; color: #1e3a8a; margin-bottom: 1px;">Q4 (Unit)</div>
              <div class="task-line-dotted" style="height: 5.4mm;"></div>
              <div class="task-line-dotted" style="height: 5.4mm;"></div>
            </div>
            <div style="background: #fafaf9; border: 1px solid #e2e8f0; border-radius: 3px; padding: 3px 5px;">
              <div style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 700; color: #1e3a8a; margin-bottom: 1px;">Q5 (Synoptic)</div>
              <div class="task-line-dotted" style="height: 5.4mm;"></div>
              <div class="task-line-dotted" style="height: 5.4mm;"></div>
            </div>
          </div>
        </div>

        <!-- Core Vocabulary -->
        <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 5px 8px; margin-bottom: 5px; background: #fdfbf7;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; text-transform: uppercase; color: #0f172a; letter-spacing: 0.5px;">Task 2: Core Disciplinary Vocabulary</strong>
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 8.1pt; color: #334155; margin-bottom: 3px;">
            ${cfg.vocabTask.prompt}
          </div>
          <div class="auto-fill-lines">
            <div class="task-line-dotted" style="height: 5.4mm;"></div>
            <div class="task-line-dotted" style="height: 5.4mm;"></div>
          </div>
        </div>

        <!-- Task 3 Preparation Bridge Container -->
        <div style="border: 1.5px solid #1e3a8a; border-radius: 5px; padding: 6px 9px; background: #ffffff; margin-bottom: 5px;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid #1e3a8a; padding-bottom: 3px; margin-bottom: 4px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 8.6pt; color: #1e3a8a; text-transform: uppercase; letter-spacing: 0.5px;">
              ${cfg.bridgeTask.title}
            </strong>
            <span class="archival-badge" style="background: #eff6ff; color: #1e3a8a; border-color: #bfdbfe; font-size: 7pt;">
              ${cfg.bridgeTask.badge}
            </span>
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 8.1pt; color: #334155; margin-bottom: 4px;">
            ${cfg.bridgeTask.instruction}
          </div>

          <div class="auto-fill-ledger" style="display: grid; grid-template-columns: 1fr 1fr; gap: 7px; margin-bottom: 4px;">
            <div style="border: 1px solid #cbd5e1; border-radius: 4px; padding: 5px 6px; background: #f8fafc;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; color: #0369a1; display: block; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 2px;">${cfg.bridgeTask.col1Title}</strong>
              <ul style="margin: 0 0 4px 0; padding-left: 14px; font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #475569; line-height: 1.3;">
                ${cfg.bridgeTask.col1Prompts.map((p) => `<li>${p}</li>`).join('')}
              </ul>
              <div style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 600; color: #0369a1; border-top: 1px dashed #cbd5e1; padding-top: 2px; margin: 3px 0 1px 0;">
                ✍️ Synthesise their perspective in 2 sentences:
              </div>
              <div>
                <div class="task-line-dotted" style="height: 5.4mm;"></div>
                <div class="task-line-dotted" style="height: 5.4mm;"></div>
                <div class="task-line-dotted" style="height: 5.4mm;"></div>
              </div>
            </div>
            <div style="border: 1px solid #cbd5e1; border-radius: 4px; padding: 5px 6px; background: #f8fafc;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; color: #b91c1c; display: block; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 2px;">${cfg.bridgeTask.col2Title}</strong>
              <ul style="margin: 0 0 4px 0; padding-left: 14px; font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #475569; line-height: 1.3;">
                ${cfg.bridgeTask.col2Prompts.map((p) => `<li>${p}</li>`).join('')}
              </ul>
              <div style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 600; color: #b91c1c; border-top: 1px dashed #cbd5e1; padding-top: 2px; margin: 3px 0 1px 0;">
                ✍️ Synthesise their perspective in 2 sentences:
              </div>
              <div>
                <div class="task-line-dotted" style="height: 5.4mm;"></div>
                <div class="task-line-dotted" style="height: 5.4mm;"></div>
                <div class="task-line-dotted" style="height: 5.4mm;"></div>
              </div>
            </div>
          </div>

          <div style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #64748b; margin-top: 2px;">
            ${cfg.bridgeTask.clue}
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 8.2pt; color: #1e3a8a; font-style: italic; border-top: 1px dotted #cbd5e1; padding-top: 2px; margin-top: 2px;">
            ${cfg.bridgeTask.scholarsEdge}
          </div>
        </div>
      </div>

      <!-- Left Page Footer -->
      <div style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #94a3b8; display: flex; justify-content: space-between; border-top: 1px solid #e2e8f0; padding-top: 3px;">
        <span>The History Portal &bull; KS3 The Early Modern World (1450–1750)</span>
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
    <div class="page page-container" id="page-${rightPageNum}">
      <div>
        <!-- Enquiry Question Header -->
        <div style="border-bottom: 2px solid #1e3a8a; padding-bottom: 4px; margin-bottom: 6px; display: flex; justify-content: space-between; align-items: flex-end;">
          <div>
            <div style="font-family: 'Inter', sans-serif; font-size: 8pt; text-transform: uppercase; letter-spacing: 1px; color: #1e3a8a; font-weight: 700;">
              Task 4: Historical Skill: ${cfg.skill} &bull; Dual-Source Evidence
            </div>
            <h3 style="font-family: 'Playfair Display', serif; font-size: 11.5pt; color: #0f172a; margin: 2px 0 0 0; line-height: 1.2;">
              ${cfg.enquiryQuestion}
            </h3>
          </div>
          <span class="archival-badge" style="background: #eff6ff; color: #1e3a8a; border-color: #bfdbfe; flex-shrink: 0; font-size: 7pt;">Edexcel Paper 1 &amp; 3 Prep</span>
        </div>

        <!-- Dual Primary Sources Box (Side-by-Side) -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 7px; margin-bottom: 5px;">
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
        <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 4px 6px; background: #f8fafc; margin-bottom: 5px;">
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

        <!-- Ruled Writing Lines (13 Lines at 7.2mm line-height) -->
        <div class="auto-fill-writing-lines" data-line-height="7.2" style="width: 100%; margin-bottom: 4px;">
          ${Array(13).fill('<div class="task-line" style="height: 7.2mm;"></div>').join('')}
        </div>
      </div>

      <!-- Teacher Grading & Assessment Footer (Utility-Specific Rubric) -->
      <div>
        <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 4px 8px; background: #f8fafc; display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #334155;">
          <div>
            <strong>Teacher Assessment:</strong> &nbsp;
            Content &amp; Inference: [ 1 &bull; 2 &bull; 3 &bull; 4 ] &nbsp;|&nbsp; 
            Provenance Evaluation: [ 1 &bull; 2 &bull; 3 &bull; 4 ] &nbsp;|&nbsp; 
            Contextual Balance: [ 1 &bull; 2 &bull; 3 &bull; 4 ]
          </div>
          <div>
            <strong>Utility Grade:</strong> [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ]
          </div>
        </div>

        <!-- Right Page Footer -->
        <div style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #94a3b8; display: flex; justify-content: space-between; border-top: 1px solid #e2e8f0; padding-top: 3px; margin-top: 3px;">
          <span>Source Utility Assessment &bull; The History Portal</span>
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
    <div class="page page-container" id="page-${rightPageNum}">
      <div>
        <!-- Enquiry Question Header -->
        <div style="border-bottom: 2px solid #1e3a8a; padding-bottom: 4px; margin-bottom: 6px; display: flex; justify-content: space-between; align-items: flex-end;">
          <div>
            <div style="font-family: 'Inter', sans-serif; font-size: 8pt; text-transform: uppercase; letter-spacing: 1px; color: #1e3a8a; font-weight: 700;">
              Task 4: Historical Skill: ${cfg.skill} &bull; Historiographical Debate
            </div>
            <h3 style="font-family: 'Playfair Display', serif; font-size: 11.5pt; color: #0f172a; margin: 2px 0 0 0; line-height: 1.2;">
              ${cfg.enquiryQuestion}
            </h3>
          </div>
          <span class="archival-badge" style="background: #fef2f2; color: #b91c1c; border-color: #fecaca; flex-shrink: 0; font-size: 7pt;">Edexcel Paper 3 Prep</span>
        </div>

        <!-- Dual Interpretations Box (Side-by-Side) -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 7px; margin-bottom: 5px;">
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
            <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #1e40af; font-weight: 700; text-transform: uppercase; margin-bottom: 2px;">
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

        <!-- Disciplinary Debate Matrix (3 Columns) -->
        <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 4px 6px; background: #f8fafc; margin-bottom: 5px;">
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px; margin-bottom: 3px;">
            ${cfg.matrix
              .map(
                (m) => `
              <div style="border: 1px solid #e2e8f0; border-radius: 3px; padding: 3px 5px; background: #ffffff;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #b91c1c; display: block; border-bottom: 1px solid #e2e8f0; padding-bottom: 1px; margin-bottom: 1px;">${m.col}</strong>
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

        <!-- Ruled Writing Lines (13 Lines at 7.2mm line-height) -->
        <div class="auto-fill-writing-lines" data-line-height="7.2" style="width: 100%; margin-bottom: 4px;">
          ${Array(13).fill('<div class="task-line" style="height: 7.2mm;"></div>').join('')}
        </div>
      </div>

      <!-- Teacher Grading & Assessment Footer (Interpretations Rubric) -->
      <div>
        <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 4px 8px; background: #f8fafc; display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #334155;">
          <div>
            <strong>Teacher Assessment:</strong> &nbsp;
            Comprehension of Views: [ 1 &bull; 2 &bull; 3 &bull; 4 ] &nbsp;|&nbsp; 
            Deployment of Own Evidence: [ 1 &bull; 2 &bull; 3 &bull; 4 ] &nbsp;|&nbsp; 
            Sustained Evaluation: [ 1 &bull; 2 &bull; 3 &bull; 4 ]
          </div>
          <div>
            <strong>Debate Grade:</strong> [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ]
          </div>
        </div>

        <!-- Right Page Footer -->
        <div style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #94a3b8; display: flex; justify-content: space-between; border-top: 1px solid #e2e8f0; padding-top: 3px; margin-top: 3px;">
          <span>Historical Interpretations Assessment &bull; The History Portal</span>
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
    <div class="page page-container" id="page-${rightPageNum}">
      <div>
        <!-- Enquiry Question Header -->
        <div style="border-bottom: 2px solid #1e3a8a; padding-bottom: 4px; margin-bottom: 6px; display: flex; justify-content: space-between; align-items: flex-end;">
          <div>
            <div style="font-family: 'Inter', sans-serif; font-size: 8.2pt; text-transform: uppercase; letter-spacing: 1px; color: #1e3a8a; font-weight: 700;">
              Task 4: Historical Skill: ${cfg.skill} &bull; Extended Writing
            </div>
            <h3 style="font-family: 'Playfair Display', serif; font-size: 12.2pt; color: #0f172a; margin: 2px 0 0 0; line-height: 1.25;">
              ${cfg.enquiryQuestion}
            </h3>
          </div>
          <span class="archival-badge" style="background: #eff6ff; color: #1e3a8a; border-color: #bfdbfe; flex-shrink: 0;">Independent Argument</span>
        </div>

        <!-- Bespoke Disciplinary Structure Strip (3-Columns, 8.2pt) -->
        <div style="border: 1.2px solid #cbd5e1; border-radius: 5px; padding: 5px 8px; background: #f8fafc; margin-bottom: 5px;">
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 7px; margin-bottom: 3px;">
            ${cfg.structureStrip
              .map(
                (s) => `
              <div style="border: 1px solid #e2e8f0; border-radius: 3px; padding: 4px 6px; background: #ffffff;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 8.4pt; color: #1e3a8a; display: block; border-bottom: 1px solid #e2e8f0; padding-bottom: 1px; margin-bottom: 2px;">${s.col}</strong>
                <span style="font-family: 'Inter', sans-serif; font-size: 7.9pt; color: #334155; line-height: 1.25; display: block;">${s.text}</span>
              </div>
            `,
              )
              .join('')}
          </div>
          
          <div style="border-top: 1px dashed #cbd5e1; padding-top: 3px; display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 7.8pt;">
            <span style="color: #475569;"><strong>Sentence Starters &amp; Connectives:</strong> ${cfg.connectives}</span>
          </div>
        </div>

        <!-- Writing Framework Strip (PEEL Mastery) -->
        <div style="background: #f8fafc; border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 4px 8px; margin-bottom: 5px; display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 8pt; color: #1e293b;">
          <span><strong style="color: #1e3a8a;">[P] Point:</strong> Clear direct answer to enquiry.</span>
          <span><strong style="color: #1e3a8a;">[E] Evidence:</strong> Specific names, dates, acts &amp; data.</span>
          <span><strong style="color: #1e3a8a;">[E] Explanation:</strong> Causal mechanism (why &amp; how).</span>
          <span><strong style="color: #1e3a8a;">[L] Link:</strong> Evaluative conclusion.</span>
        </div>

        <!-- Ruled Writing Lines (19 Lines at 7.2mm Line Height) -->
        <div class="auto-fill-writing-lines" data-line-height="7.2" style="width: 100%; margin-bottom: 4px;">
          ${Array(19).fill('<div class="task-line" style="height: 7.2mm;"></div>').join('')}
        </div>
      </div>

      <!-- Teacher Grading & Assessment Footer -->
      <div>
        <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 4px 8px; background: #f8fafc; display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 8pt; color: #334155;">
          <div>
            <strong>Teacher Assessment:</strong> &nbsp;
            Effort: [ 1 &bull; 2 &bull; 3 &bull; 4 &bull; 5 ] &nbsp;|&nbsp; 
            Subject Knowledge: [ 1 &bull; 2 &bull; 3 &bull; 4 ] &nbsp;|&nbsp; 
            Disciplinary Analysis: [ 1 &bull; 2 &bull; 3 &bull; 4 ]
          </div>
          <div>
            <strong>PEEL Mastery:</strong> &nbsp;&nbsp; P &nbsp;&nbsp;&nbsp;&nbsp; E &nbsp;&nbsp;&nbsp;&nbsp; E &nbsp;&nbsp;&nbsp;&nbsp; L
          </div>
        </div>

        <!-- Right Page Footer -->
        <div style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #94a3b8; display: flex; justify-content: space-between; border-top: 1px solid #e2e8f0; padding-top: 3px; margin-top: 3px;">
          <span>Extended Writing Assessment &bull; The History Portal</span>
          <span>Page ${rightPageNum} (Facing Spread Right)</span>
        </div>
      </div>
    </div>
      `;
    }
  });

  // ==========================================
  // PAGE 20: OUTSIDE BACK COVER (Departmental Marking Policy)
  // ==========================================
  html += `
  <div class="page page-container" id="page-20" style="padding: 14px 18px; display: flex; flex-direction: column; height: 256mm; justify-content: space-between; border: 1px solid #cbd5e1; outline: 3.5px double #0f172a; outline-offset: -8px;">
    <div>
      <div style="border-bottom: 2px solid #1e3a8a; padding-bottom: 6px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: baseline;">
        <div>
          <h2 style="margin: 0; font-family: 'Playfair Display', serif; font-size: 15.5pt; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px;">
            Departmental Marking Policy &amp; Code
          </h2>
          <div style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #64748b; margin-top: 2px;">
            The History Department Standard &bull; Year 8 KS3
          </div>
        </div>
        <span class="archival-badge" style="background: #eff6ff; color: #1e3a8a; border-color: #bfdbfe;">Policy</span>
      </div>

      <!-- Marking Symbols Grid -->
      <div style="margin-bottom: 10px;">
        <strong style="font-family: 'Inter', sans-serif; font-size: 9pt; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 4px;">
          Formative Correction Codes:
        </strong>
        <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif; font-size: 7.8pt; line-height: 1.35;">
          <thead>
            <tr style="background: #1e3a8a; color: #ffffff;">
              <th style="padding: 4px 8px; width: 12%; text-align: center; border: 1px solid #94a3b8;">Code</th>
              <th style="padding: 4px 8px; width: 38%; border: 1px solid #94a3b8;">Meaning &amp; Focus</th>
              <th style="padding: 4px 8px; width: 50%; border: 1px solid #94a3b8;">Pupil Action / DIRT Task</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 3.5px 8px; font-weight: 700; text-align: center; border: 1px solid #cbd5e1; background: #f8fafc; color: #b91c1c;">Sp</td>
              <td style="padding: 3.5px 8px; border: 1px solid #cbd5e1;">Spelling error in key historical term.</td>
              <td style="padding: 3.5px 8px; border: 1px solid #cbd5e1;">Copy the correct spelling 3 times in margin.</td>
            </tr>
            <tr style="background: #f8fafc;">
              <td style="padding: 3.5px 8px; font-weight: 700; text-align: center; border: 1px solid #cbd5e1; color: #b91c1c;">Gr / P</td>
              <td style="padding: 3.5px 8px; border: 1px solid #cbd5e1;">Grammar or punctuation slip.</td>
              <td style="padding: 3.5px 8px; border: 1px solid #cbd5e1;">Rewrite the sentence correctly in green pen.</td>
            </tr>
            <tr>
              <td style="padding: 3.5px 8px; font-weight: 700; text-align: center; border: 1px solid #cbd5e1; background: #f8fafc; color: #1e3a8a;">//</td>
              <td style="padding: 3.5px 8px; border: 1px solid #cbd5e1;">New paragraph required here.</td>
              <td style="padding: 3.5px 8px; border: 1px solid #cbd5e1;">Insert // symbol and start a new line.</td>
            </tr>
            <tr style="background: #f8fafc;">
              <td style="padding: 3.5px 8px; font-weight: 700; text-align: center; border: 1px solid #cbd5e1; color: #1e3a8a;">[?]</td>
              <td style="padding: 3.5px 8px; border: 1px solid #cbd5e1;">Meaning unclear / vague phrasing.</td>
              <td style="padding: 3.5px 8px; border: 1px solid #cbd5e1;">Clarify argument using specific evidence.</td>
            </tr>
            <tr>
              <td style="padding: 3.5px 8px; font-weight: 700; text-align: center; border: 1px solid #cbd5e1; background: #f8fafc; color: #0369a1;">Ev</td>
              <td style="padding: 3.5px 8px; border: 1px solid #cbd5e1;">Missing precise factual evidence.</td>
              <td style="padding: 3.5px 8px; border: 1px solid #cbd5e1;">Add specific dates, names, treaties, or figures.</td>
            </tr>
            <tr style="background: #f8fafc;">
              <td style="padding: 3.5px 8px; font-weight: 700; text-align: center; border: 1px solid #cbd5e1; color: #0369a1;">Ex</td>
              <td style="padding: 3.5px 8px; border: 1px solid #cbd5e1;">Explanation needs deeper causal link.</td>
              <td style="padding: 3.5px 8px; border: 1px solid #cbd5e1;">Use 'This meant that...' or 'Consequently...'.</td>
            </tr>
            <tr>
              <td style="padding: 3.5px 8px; font-weight: 700; text-align: center; border: 1px solid #cbd5e1; background: #f8fafc; color: #15803d;">J</td>
              <td style="padding: 3.5px 8px; border: 1px solid #cbd5e1;">Historical judgment needed.</td>
              <td style="padding: 3.5px 8px; border: 1px solid #cbd5e1;">Weigh both factors to reach a sustained verdict.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- The 4 Golden Rules of Extended Writing -->
      <div style="border: 1.5px solid #1e3a8a; border-radius: 5px; padding: 7px 12px; background: #f8fafc; margin-bottom: 9px;">
        <strong style="font-family: 'Inter', sans-serif; font-size: 8.6pt; color: #1e3a8a; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 3px;">
          The 4 Golden Rules of Historical Extended Writing:
        </strong>
        <ol style="margin: 0; padding-left: 17px; font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #334155; line-height: 1.35;">
          <li><strong>Direct Answer:</strong> Open every paragraph with a clear thematic point that directly answers the enquiry question.</li>
          <li><strong>Specific Evidence:</strong> Ground every argument in precise historical facts, figures, names, and contemporary legislation.</li>
          <li><strong>Causal Connectives:</strong> Never just describe events; explain the mechanism of how and why one event caused or accelerated another.</li>
          <li><strong>Evaluative Judgement:</strong> Weigh competing arguments against explicit historical criteria to reach a nuanced, independent conclusion.</li>
        </ol>
      </div>

      <!-- Digital Revision Hub Quick-Link (Vector QR Code) -->
      <div style="border: 1.5px solid #1e3a8a; border-radius: 6px; padding: 6px 12px; background: #f0f9ff; margin-bottom: 9px; display: flex; align-items: center; gap: 14px;">
        <div style="width: 74px; height: 74px; flex-shrink: 0; background: #ffffff; padding: 3px; border: 1.2px solid #bae6fd; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.06); display: flex; align-items: center; justify-content: center;">
          ${generateQrSvg('https://the-history-revision-hub.netlify.app/?view=interactive&unit=early_modern_world')}
        </div>
        <div style="flex: 1;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 8.4pt; color: #0369a1; text-transform: uppercase; letter-spacing: 0.5px;">
              📱 Digital Revision Hub &bull; Scan with Phone Camera
            </strong>
            <span class="archival-badge" style="background: #e0f2fe; color: #0369a1; border-color: #bae6fd; font-size: 6.8pt; padding: 1px 6px;">Interactive</span>
          </div>
          <p style="font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #1e293b; margin: 0 0 3px 0; line-height: 1.3;">
            Instant home access to the interactive revision flashcards, self-marking knowledge quizzes, and model answers for this unit:
          </p>
          <div style="display: flex; gap: 12px; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #475569;">
            <span>&bull; <strong>Flashcard Vault:</strong> Early modern vocabulary</span>
            <span>&bull; <strong>Quiz Bank:</strong> 160 self-marking recall questions</span>
          </div>
          <div style="font-family: monospace; font-size: 6.8pt; color: #0284c7; margin-top: 2px;">
            https://the-history-revision-hub.netlify.app/?view=interactive&amp;unit=early_modern_world
          </div>
        </div>
      </div>

      <!-- Institutional Colophon -->
      <div style="text-align: center; border-top: 1px solid #cbd5e1; padding-top: 5px;">
        <div style="font-family: 'Inter', sans-serif; font-size: 8.2pt; font-weight: 700; color: #1e3a8a; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 1px;">
          The History Portal &bull; Department of History
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #64748b;">
          Stubbington, Fareham, Hampshire &bull; Academic Year 2025–2026
        </div>
      </div>
    </div>

    <div style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #94a3b8; display: flex; justify-content: space-between; border-top: 1px solid #e2e8f0; padding-top: 3px;">
      <span>Departmental Marking Policy &bull; Year 8 History</span>
      <span>Page 20 (Outside Back Cover)</span>
    </div>
  </div>
  `;

  html += `
</body>
</html>
`;

  return html;
}

async function renderEarlyModernWorldWorkbook() {
  console.log('Rendering Year 8 Early Modern World Two-Page Spread Workbook (20 Pages)...');
  const html = buildEarlyModernWorldTwoPageWorkbook();

  const outHtmlPath1 = path.join(
    ROOT_DIR,
    'public',
    'units',
    'early_modern_world',
    'pupil_workbook.html',
  );
  const outHtmlPath2 = path.join(ROOT_DIR, 'units', 'early_modern_world', 'pupil_workbook.html');
  const outPdfPath = path.join(ROOT_DIR, 'public', 'pdfs', 'early_modern_world_pupil_workbook.pdf');

  fs.mkdirSync(path.dirname(outHtmlPath1), { recursive: true });
  fs.mkdirSync(path.dirname(outHtmlPath2), { recursive: true });
  fs.mkdirSync(path.dirname(outPdfPath), { recursive: true });

  fs.writeFileSync(outHtmlPath1, html, 'utf8');
  fs.writeFileSync(outHtmlPath2, html, 'utf8');
  console.log(`✅ Saved HTML to ${outHtmlPath1} and ${outHtmlPath2}`);

  console.log('Compiling PDF via Puppeteer...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });

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
  console.log(`✅ Compiled 20-Page PDF to ${outPdfPath}`);
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
};
