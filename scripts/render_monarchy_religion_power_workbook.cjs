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
// 5 Dedicated Crown, Church, or Parliament Enquiry Configurations (Medicine Style)
// ============================================================================
const enquiryConfigs = [
  {
    lessonNum: 1,
    id: 'lesson_1',
    title: 'Enquiry 1: Henry VIII & The English Reformation (1517–1534)',
    specAnchor:
      'Break with Rome; Royal Supremacy; Act of Supremacy (1534); Dynastic and financial causes.',
    tariff: 'Question 4: Explain Why [12 marks &bull; 15 mins]',
    examStem:
      'Explain why King Henry VIII broke with the Roman Catholic Church in the period 1527–1534. [12 marks]',
    stimulus: ['The succession and Catherine of Aragon', 'Crown finances and monastic wealth'],
    structureStrip: [
      {
        col: '1. DYNASTIC SUCCESSION',
        text: 'Explain Henry’s urgent need for a legitimate male heir; Pope Clement VII was captive to Catherine’s nephew, Charles V, blocking the annulment.',
      },
      {
        col: '2. CROWN FINANCES',
        text: 'Explain how Cromwell highlighted Church riches; breaking with Rome allowed the Crown to seize tenths and first fruits, funding national coastal defence.',
      },
      {
        col: '3. IMPERIAL SOVEREIGNTY',
        text: 'Explain Thomas Cromwell’s 1533 Act in Restraint of Appeals declaring England an ‘Empire’ subject to no foreign pope or potentate.',
      },
    ],
    connectives:
      'A primary cause of the break with Rome was... &bull; In particular, the dynastic crisis... &bull; Furthermore, Thomas Cromwell demonstrated... &bull; Crucially, the 1534 Act of Supremacy... &bull; Consequently...',
    wordBank:
      'Royal Supremacy &bull; Act of Supremacy (1534) &bull; annulment &bull; Catherine of Aragon &bull; Anne Boleyn &bull; Thomas Cromwell &bull; Pope Clement VII &bull; Emperor Charles V &bull; Valor Ecclesiasticus &bull; Act in Restraint of Appeals (1533)',
    doNow: [
      {
        q: 'Which religious leader in Rome held supreme spiritual authority over medieval England?',
        a: 'The Pope (Bishop of Rome)',
      },
      {
        q: 'In which language were all medieval Catholic Bible readings and Church services conducted?',
        a: 'Latin (The Vulgate / Latin Mass)',
      },
      {
        q: 'Name the Archbishop of Canterbury murdered in his cathedral in 1170 after disputing royal power.',
        a: 'Thomas Becket',
      },
      {
        q: 'What German monk sparked the Protestant Reformation in 1517 with his 95 Theses?',
        a: 'Martin Luther',
      },
      {
        q: 'What term describes corrupt church certificates sold to reduce time in purgatory?',
        a: 'Indulgences',
      },
      {
        q: 'What honorary title did Pope Leo X award Henry VIII in 1521 for defending Catholic sacraments?',
        a: 'Fidei Defensor (Defender of the Faith)',
      },
      {
        q: 'Who was Henry VIII’s first wife, the Spanish mother of Princess Mary?',
        a: 'Catherine of Aragon',
      },
      {
        q: 'Which Holy Roman Emperor was Catherine of Aragon’s powerful nephew?',
        a: 'Emperor Charles V',
      },
      {
        q: 'Which English cardinal failed to secure the papal divorce and was stripped of power in 1529?',
        a: 'Cardinal Thomas Wolsey',
      },
      {
        q: 'Which brilliant legal advisor engineered the parliamentary break with Rome in 1532–1534?',
        a: 'Thomas Cromwell',
      },
    ],
    vocabPrompt:
      'Define <strong>Royal Supremacy</strong> and explain how it fundamentally differed from <strong>Papal Authority</strong> in sixteenth-century England:',
    fourMarkA: {
      type: 'Feature',
      question:
        'Describe one key feature of the Act of Supremacy passed by Parliament in 1534. [4 marks]',
      hint: 'Focus on how the statute legally declared Henry VIII the ‘Supreme Head’ of the Church of England on earth, extinguishing all papal jurisdiction.',
      stems:
        'One key feature of the Act of Supremacy was... &bull; Specifically, the statute declared... &bull; This was significant because it meant...',
    },
    fourMarkB: {
      type: 'Difference',
      question:
        'Explain one way in which church authority in England in 1520 was different from church authority in 1535. [4 marks]',
      hint: 'Contrast the supreme judicial authority of the Pope in 1520 with the absolute constitutional supremacy of the Crown established by 1535.',
      stems:
        'One way church authority differed was... &bull; In 1520, the Church was governed by... &bull; In contrast, by 1535...',
    },
    timelineMission:
      'Turn to Pages 10–11 (Enquiry 1). In Milestone 1, sketch King Henry VIII sitting on the English throne with the Pope cast down outside England. Add two speech bubbles explaining why Henry claimed Royal Supremacy.',
    leftPageQuip:
      'Remember: In 1534, disagreeing with Henry VIII’s marriage status wasn’t just poor etiquette—it was an immediate date with the executioner at Tower Hill.',
    rightPageQuip:
      'Thomas Cromwell surveyed 800 English monasteries in 1535 and miraculously discovered they all had vast treasure vaults. Coincidence? Absolutely not.',
  },
  {
    lessonNum: 2,
    id: 'lesson_2',
    title: 'Enquiry 2: Elizabeth I & The Middle Way (1558–1588)',
    specAnchor:
      'Elizabethan Religious Settlement (1559); Act of Supremacy; Act of Uniformity; Via Media compromise.',
    tariff: 'Question 4: Explain Why [12 marks &bull; 15 mins]',
    examStem:
      'Explain why Elizabeth I chose a ‘Middle Way’ (Via Media) in her 1559 Religious Settlement. [12 marks]',
    stimulus: [
      'The threat of religious civil war and European invasion',
      'The legacy of Mary I’s Smithfield persecutions',
    ],
    structureStrip: [
      {
        col: '1. PREVENTING CIVIL WAR',
        text: 'Explain how England was deeply divided; Elizabeth sought national unity to avoid the bloody sectarian wars devastating France and the Netherlands.',
      },
      {
        col: '2. MARIAN BACKLASH',
        text: 'Explain how Mary I’s burning of nearly 300 Protestants at Smithfield alienated the public, creating widespread revulsion against Catholic extremism.',
      },
      {
        col: '3. PRAGMATIC SETTLEMENT',
        text: 'Explain Elizabeth’s adoption of ‘Supreme Governor’ to pacify Catholics while imposing Protestant doctrine via the 1559 Book of Common Prayer.',
      },
    ],
    connectives:
      'A primary reason Elizabeth chose the Middle Way was... &bull; In particular, the threat of civil conflict... &bull; Furthermore, the brutal legacy of Mary I... &bull; Crucially, Elizabeth’s title of Supreme Governor... &bull; Consequently...',
    wordBank:
      'Via Media (Middle Way) &bull; Act of Supremacy (1559) &bull; Supreme Governor &bull; Act of Uniformity (1559) &bull; Book of Common Prayer &bull; recusants &bull; Marian persecutions &bull; Smithfield burnings &bull; Mary, Queen of Scots &bull; Puritan faction',
    doNow: [
      {
        q: 'Which Catholic queen ruled England from 1553 to 1558, restoring the Pope’s authority?',
        a: 'Queen Mary I (Mary Tudor)',
      },
      {
        q: 'How many Protestant martyrs were burned at the stake during the reign of Mary I?',
        a: 'Nearly 300 (approx. 284)',
      },
      {
        q: 'Which Protestant boy-king ruled England between Henry VIII and Mary I (1547–1553)?',
        a: 'King Edward VI',
      },
      { q: 'What year did Elizabeth I ascend the English throne upon Mary I’s death?', a: '1558' },
      {
        q: 'What Latin phrase describes Elizabeth’s deliberate policy of religious compromise?',
        a: 'Via Media (The Middle Way)',
      },
      {
        q: 'What title did Elizabeth I adopt under the 1559 Act of Supremacy instead of ‘Supreme Head’?',
        a: 'Supreme Governor of the Church of England',
      },
      {
        q: 'Which 1559 Act required all English citizens to attend Sunday church services or pay a fine?',
        a: 'The Act of Uniformity',
      },
      {
        q: 'What term describes Catholic believers who refused to attend Anglican services and paid fines?',
        a: 'Recusants',
      },
      {
        q: 'Which Catholic cousin of Elizabeth fled Scotland in 1568 and became the focus of Catholic plots?',
        a: 'Mary, Queen of Scots',
      },
      {
        q: 'In 1570, which Pope issued the papal bull Regnans in Excelsis excommunicating Elizabeth?',
        a: 'Pope Pius V',
      },
    ],
    vocabPrompt:
      'Define <strong>The Middle Way (Via Media)</strong> and explain how it attempted to balance Catholic ceremony with Protestant doctrine:',
    fourMarkA: {
      type: 'Feature',
      question:
        'Describe one key feature of the Elizabethan Act of Uniformity passed in 1559. [4 marks]',
      hint: 'Focus on the compulsory use of the English Book of Common Prayer in every church and the imposition of a one-shilling fine for recusants who refused to attend.',
      stems:
        'One key feature of the Act of Uniformity was... &bull; Specifically, the law required... &bull; This was important because it ensured...',
    },
    fourMarkB: {
      type: 'Difference',
      question:
        'Explain one way in which religious policy under Elizabeth I was different from religious policy under Mary I. [4 marks]',
      hint: 'Contrast Mary I’s systematic heresy burnings and strict papal obedience with Elizabeth’s compromise on outward conformity without investigating private conscience.',
      stems:
        'One way religious policy differed was... &bull; Under Mary I, religious dissent was punished by... &bull; In contrast, Elizabeth I...',
    },
    timelineMission:
      'Turn to Pages 10–11 (Enquiry 2). In Milestone 3, sketch Elizabeth holding balancing scales between Catholic ceremonial tradition and Protestant English scripture. Explain why she refused to ‘make windows into men’s souls’.',
    leftPageQuip:
      'Queen Elizabeth I famously said she had ‘no desire to make windows into men’s souls.’ Translation: pay your church fines on Sunday and keep your treason to yourself.',
    rightPageQuip:
      'Elizabeth’s Middle Way was so balanced that both extreme Catholics and extreme Puritans despised it equally. That is the true definition of a successful British compromise.',
  },
  {
    lessonNum: 3,
    id: 'lesson_3',
    title: 'Enquiry 3: The Spanish Armada & Naval Power (1588)',
    specAnchor:
      'Anglo-Spanish rivalry; execution of Mary Queen of Scots (1587); Armada campaign; naval tactics and weather.',
    tariff: 'Question 4: Explain Why [12 marks &bull; 15 mins]',
    examStem: 'Explain why the Spanish Armada was defeated in the summer of 1588. [12 marks]',
    stimulus: [
      'English naval tactics and fireships at Calais',
      'The ‘Protestant Wind’ and North Sea gales',
    ],
    structureStrip: [
      {
        col: '1. FIRESHIPS & GRAVELINES',
        text: 'Explain how Drake’s midnight fireships panicked Medina Sidonia’s crescent fleet at Calais; English race-built galleons then exploited the chaos at Gravelines.',
      },
      {
        col: '2. NORTH SEA GALES',
        text: 'Explain how severe westerly gales prevented the Armada returning via the Channel, shipwrecking dozens of galleons on the treacherous Scottish and Irish coasts.',
      },
      {
        col: '3. SPANISH FLAWS',
        text: 'Explain Medina Sidonia’s lack of naval experience and the catastrophic breakdown in communication with the Duke of Parma’s invasion army in Flanders.',
      },
    ],
    connectives:
      'A primary cause of the Armada’s defeat was... &bull; In particular, English tactical deployment of fireships... &bull; Furthermore, ferocious storms... &bull; Crucially, Medina Sidonia’s logistical failure... &bull; Consequently...',
    wordBank:
      'Spanish Armada &bull; King Philip II &bull; Duke of Medina Sidonia &bull; Duke of Parma &bull; race-built galleons &bull; fireships (hellburners) &bull; Battle of Gravelines &bull; crescent formation &bull; culverins &bull; Protestant Wind',
    doNow: [
      {
        q: 'Which Catholic King of Spain launched the Armada against England in 1588?',
        a: 'King Philip II',
      },
      {
        q: 'In what year was Mary, Queen of Scots executed at Fotheringhay Castle for plotting against Elizabeth?',
        a: '1587',
      },
      {
        q: 'Which English privateer famously raided the Spanish port of Cadiz in 1587, ‘singeing the King of Spain’s beard’?',
        a: 'Sir Francis Drake',
      },
      {
        q: 'Approximately how many warships and transport vessels comprised the Spanish Armada?',
        a: 'Approx. 130 ships',
      },
      {
        q: 'Who was appointed Commander-in-Chief of the Spanish Armada despite having zero naval experience?',
        a: 'The Duke of Medina Sidonia',
      },
      {
        q: 'What defensive geometric formation did the Spanish fleet adopt sailing up the English Channel?',
        a: 'The Crescent formation',
      },
      {
        q: 'At which French port did the Armada anchor before being scattered by English fireships?',
        a: 'Calais',
      },
      {
        q: 'Name the decisive naval engagement fought on 8 August 1588 after the fireship attack.',
        a: 'The Battle of Gravelines',
      },
      {
        q: 'What popular religious name was given to the fierce North Sea gales that wrecked Spanish ships?',
        a: 'The Protestant Wind',
      },
      {
        q: 'What type of lighter, faster English warships outmanoeuvred the bulky Spanish galleons?',
        a: 'Race-built galleons',
      },
    ],
    vocabPrompt:
      'Define <strong>Fireships (Hellburners)</strong> and explain how their deployment at Calais disrupted the Spanish Armada:',
    fourMarkA: {
      type: 'Feature',
      question:
        'Describe one key feature of the English naval ships designed by Sir John Hawkins. [4 marks]',
      hint: 'Focus on how English race-built galleons were longer, lower, and faster, equipped with long-range culverin cannons that could reload rapidly.',
      stems:
        'One key feature of English race-built galleons was... &bull; Specifically, they were designed to... &bull; This gave the English an advantage because...',
    },
    fourMarkB: {
      type: 'Difference',
      question:
        'Explain one way in which Spanish naval battle tactics were different from English naval tactics in 1588. [4 marks]',
      hint: 'Contrast Spanish reliance on close-range grappling and hand-to-hand infantry boarding with English preference for standoff broadside gunnery.',
      stems:
        'One way naval tactics differed was... &bull; Spanish commanders planned to... &bull; In contrast, English commanders chose to...',
    },
    timelineMission:
      'Turn to Pages 10–11 (Enquiry 3). In Milestone 4, sketch the blazing English fireships drifting into Calais harbour, scattering the Spanish crescent formation into the stormy North Sea.',
    leftPageQuip:
      'The Spanish Armada carried 130 ships, 30,000 soldiers, and hundreds of barrels of holy water. Unfortunately for King Philip II, none of that stopped English fireships.',
    rightPageQuip:
      'King Philip II blamed the loss of his fleet on the weather, claiming he ‘sent ships to fight men, not God’s winds.’ Sir Francis Drake probably disagreed while counting his cannons.',
  },
  {
    lessonNum: 4,
    id: 'lesson_4',
    title: 'Enquiry 4: The English Civil War, Regicide & Bill of Rights (1642–1689)',
    specAnchor:
      'Causes of Civil War; Charles I Personal Rule (1629–40); New Model Army; Trial & Regicide (1649); Bill of Rights (1689).',
    tariff: 'Question 4: Explain Why [12 marks &bull; 15 mins]',
    examStem:
      'Explain why Parliament put King Charles I on trial and executed him in January 1649. [12 marks]',
    stimulus: [
      'Charles I’s refusal to accept constitutional limits',
      'The outbreak of the Second Civil War (1648)',
    ],
    structureStrip: [
      {
        col: '1. DUPLICITY & DIVINE RIGHT',
        text: 'Explain Charles’s obstinate belief in Divine Right; he treated all post-war peace negotiations as delaying tactics while attempting to rearm.',
      },
      {
        col: '2. SECOND CIVIL WAR (1648)',
        text: 'Explain how Charles made a secret pact with the Scots to invade England; the New Model Army viewed him as a ‘man of blood’ who provoked needless death.',
      },
      {
        col: '3. PRIDE’S PURGE & REGICIDE',
        text: 'Explain how the Army purged moderate MPs from Parliament in Dec 1648; the Rump Parliament created a High Court of Justice to execute the King for treason.',
      },
    ],
    connectives:
      'A primary reason Parliament executed Charles I was... &bull; In particular, his unshakeable belief in Divine Right... &bull; Furthermore, his secret Scottish alliance provoked... &bull; Crucially, Colonel Pride’s purge left... &bull; Consequently...',
    wordBank:
      'Divine Right of Kings &bull; Personal Rule (1629–1640) &bull; Ship Money &bull; Oliver Cromwell &bull; New Model Army &bull; Battle of Naseby &bull; ‘Man of Blood’ &bull; Second Civil War (1648) &bull; Pride’s Purge &bull; Rump Parliament &bull; Regicide (30 Jan 1649)',
    doNow: [
      {
        q: 'Which Stuart king succeeded Queen Elizabeth I on the English throne in 1603?',
        a: 'King James I (James VI of Scotland)',
      },
      {
        q: 'What Catholic conspiracy attempted to blow up King James I and Parliament on 5 November 1605?',
        a: 'The Gunpowder Plot',
      },
      {
        q: 'Which king ruled England during the Civil War and was beheaded outside Whitehall in 1649?',
        a: 'King Charles I',
      },
      {
        q: 'What term describes the monarch’s belief that royal power is granted directly by God and cannot be questioned?',
        a: 'The Divine Right of Kings',
      },
      {
        q: 'What controversial coastal tax did Charles I illegally enforce upon inland counties in 1635?',
        a: 'Ship Money',
      },
      {
        q: 'For how many years did Charles I rule without calling Parliament during his ‘Personal Rule’ (1629–1640)?',
        a: '11 Years (The Eleven Years’ Tyranny)',
      },
      {
        q: 'Which revolutionary military force was created by Parliament in 1645, commanded by Fairfax and Cromwell?',
        a: 'The New Model Army',
      },
      {
        q: 'Which decisive 1645 battle destroyed Charles I’s main Royalist field army?',
        a: 'The Battle of Naseby',
      },
      {
        q: 'What military event in December 1648 expelled moderate MPs from Parliament, leaving the radical Rump?',
        a: 'Pride’s Purge',
      },
      {
        q: 'On what exact date was King Charles I executed outside the Banqueting House at Whitehall?',
        a: '30 January 1649',
      },
    ],
    vocabPrompt:
      'Define <strong>Constitutional Monarchy</strong> and contrast it with the Stuart doctrine of <strong>The Divine Right of Kings</strong>:',
    fourMarkA: {
      type: 'Feature',
      question:
        'Describe one key feature of Oliver Cromwell’s New Model Army established in 1645. [4 marks]',
      hint: 'Focus on merit-based promotion regardless of noble birth, regular discipline and pay, and intense religious Puritan zeal.',
      stems:
        'One key feature of the New Model Army was... &bull; Specifically, soldiers were... &bull; This was revolutionary because it meant...',
    },
    fourMarkB: {
      type: 'Difference',
      question:
        'Explain one way in which the power of the Crown in 1640 was different from its power in 1689. [4 marks]',
      hint: 'Contrast Charles I’s unilateral taxation (Ship Money) and personal rule with the statutory restrictions enforced by the 1689 Bill of Rights.',
      stems:
        'One way the power of the Crown differed was... &bull; In 1640, Charles I claimed the right to... &bull; In contrast, by 1689...',
    },
    timelineMission:
      'Turn to Pages 10–11 (Enquiry 4). In Milestone 7, sketch the execution scaffold outside the Banqueting House at Whitehall on 30 January 1649, showing the severed crown fallen onto the block.',
    leftPageQuip:
      'King Charles I honestly believed God personally appointed him to rule without Parliament. Parliament respectfully disagreed by raising an army and locking the gates.',
    rightPageQuip:
      'On 30 January 1649, Charles I wore two shirts to his execution so the crowd wouldn’t think he was shivering from fear in the winter cold. Royal dignity to the very end.',
  },
  {
    lessonNum: 5,
    id: 'lesson_5',
    title: 'Enquiry 5: Synoptic Assessment: Crown, Church, or Parliament?',
    specAnchor:
      'Long-term constitutional transformation (1517–1689); Glorious Revolution (1688); Bill of Rights (1689); Parliamentary Sovereignty.',
    tariff: 'Question 4: Explain Why [12 marks &bull; 15 mins]',
    examStem:
      'Explain why the balance of power shifted permanently from the Crown to Parliament in the period 1640–1689. [12 marks]',
    stimulus: [
      'Parliamentary control over national taxation and finance',
      'The statutory provisions of the 1689 Bill of Rights',
    ],
    structureStrip: [
      {
        col: '1. POWER OF THE PURSE',
        text: 'Explain how the abolition of medieval prerogatives (Ship Money, forced loans) meant the Crown could never govern or fund wars without annual parliamentary supply.',
      },
      {
        col: '2. BILL OF RIGHTS (1689)',
        text: 'Explain the legal terms agreed by William & Mary: banning standing armies in peacetime, outlawing suspension of laws, and guaranteeing free parliamentary debate.',
      },
      {
        col: '3. END OF DIVINE RIGHT',
        text: 'Explain how the regicide of Charles I (1649) and deposition of James II (1688) smashed the mystical doctrine of untouchable kings; monarchs now ruled by contract.',
      },
    ],
    connectives:
      'A primary cause of the shift towards Parliament was... &bull; In particular, parliamentary control over the purse... &bull; Furthermore, the 1689 Bill of Rights established... &bull; Crucially, the collapse of Divine Right... &bull; Consequently...',
    wordBank:
      'Parliamentary Sovereignty &bull; Glorious Revolution (1688) &bull; Bill of Rights (1689) &bull; William III & Mary II &bull; James II &bull; Constitutional Monarchy &bull; power of the purse &bull; Toleration Act (1689) &bull; John Locke &bull; Social Contract',
    doNow: [
      {
        q: 'In what year was the English monarchy restored under King Charles II?',
        a: '1660 (The Restoration)',
      },
      {
        q: 'Which Catholic brother of Charles II ascended the throne in 1685, sparking intense political crisis?',
        a: 'King James II',
      },
      {
        q: 'What term describes the bloodless overthrow of James II in 1688 by William of Orange and Mary?',
        a: 'The Glorious Revolution',
      },
      {
        q: 'Which landmark 1689 constitutional statute banned Catholic monarchs and required parliamentary consent for taxes?',
        a: 'The Bill of Rights',
      },
      {
        q: 'Which 1689 Act granted freedom of worship to non-conformist Protestant dissenters?',
        a: 'The Toleration Act',
      },
      {
        q: 'What constitutional doctrine asserts that Parliament has supreme legal authority over the Crown and courts?',
        a: 'Parliamentary Sovereignty',
      },
      {
        q: 'Which English philosopher wrote Two Treatises of Government (1689) defending government by consent?',
        a: 'John Locke',
      },
      {
        q: 'What financial institution was founded in 1694 to manage government debt and fund military campaigns?',
        a: 'The Bank of England',
      },
      {
        q: 'What 1701 statute settled the succession on the Protestant House of Hanover?',
        a: 'The Act of Settlement',
      },
      {
        q: 'Which 1707 treaty united the parliaments of England and Scotland into the Kingdom of Great Britain?',
        a: 'The Act of Union',
      },
    ],
    vocabPrompt:
      'Define <strong>Parliamentary Sovereignty</strong> and explain how the 1689 Bill of Rights ended the doctrine of absolute royal prerogative:',
    fourMarkA: {
      type: 'Similarity',
      question:
        'Explain one way in which religious rebellion under Henry VIII (1536) was similar to religious rebellion under Elizabeth I (1569). [4 marks]',
      hint: 'Focus on how both the Pilgrimage of Grace (1536) and the Revolt of the Northern Earls (1569) were led by northern Catholic nobles demanding the restoration of the traditional Latin Mass.',
      stems:
        'One way religious rebellions were similar was... &bull; In 1536, the Pilgrimage of Grace demanded... &bull; Similarly, in 1569, northern rebels...',
    },
    fourMarkB: {
      type: 'Difference',
      question:
        'Explain one way in which the authority of Parliament under King Henry VIII was different from its authority under William III & Mary II. [4 marks]',
      hint: 'Contrast Parliament functioning as a subservient instrument summoned at Henry VIII’s pleasure with its permanent sovereign status as a co-equal governing partner under the 1689 Bill of Rights.',
      stems:
        'One way parliamentary authority differed was... &bull; Under Henry VIII, Parliament was... &bull; In contrast, under William & Mary in 1689...',
    },
    timelineMission:
      'Turn to Pages 10–11. Review all 8 milestones. Draw arrows showing the causal chain connecting Henry’s break with Rome in 1534 to the Bill of Rights in 1689.',
    leftPageQuip:
      'The Glorious Revolution of 1688 was so ‘peaceful’ because King James II dropped the Great Seal of England into the Thames and ran away to France in the middle of the night.',
    rightPageQuip:
      'By 1689, British kings officially could not raise taxes, suspend laws, or keep a peacetime army without MPs saying yes. Modern constitutional politics was officially born.',
  },
];

// ============================================================================
// FOOTER STRIP HELPER (Alternating Page Number + Humorous Quip on Same Line)
// Even pages (verso/left): Page number on left, quip on right.
// Odd pages (recto/right): Quip on left, page number on right.
// ============================================================================
function renderFooterStrip(pageNum, quipText, totalPages = 20) {
  const isEven = pageNum % 2 === 0;
  if (isEven) {
    return `
      <div class="page-footer-strip">
        <span class="footer-page-num" style="margin-right: 8px;">${pageNum}/${totalPages}</span>
        <span class="footer-quip" style="text-align: right; flex: 1;"><em>${quipText}</em></span>
      </div>`;
  } else {
    return `
      <div class="page-footer-strip">
        <span class="footer-quip" style="text-align: left; flex: 1; margin-right: 8px;"><em>${quipText}</em></span>
        <span class="footer-page-num">${pageNum}/${totalPages}</span>
      </div>`;
  }
}

// ============================================================================
// COMPILE 20-PAGE SADDLE-STITCHED PUPIL WORKBOOK (100% Black & White / Medicine Standard)
// ============================================================================
function compileMonarchyWorkbook() {
  const coverImgBase64 =
    getBase64Image('public/images/henry_viii.jpg') ||
    getBase64Image('/images/henry_viii.jpg') ||
    '';

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Crown, Church, or Parliament (1517–1689) &bull; Pupil Workbook</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&display=swap" rel="stylesheet">
  <style>
    *, *:before, *:after { box-sizing: border-box; }
    /* Print Offset for Saddle-Stitch Booklet Binding (3mm alternating inner margin) */
    @page {
      size: A4 portrait;
      margin: 10mm 10mm 12mm 10mm;
    }
    @page:left {
      margin-top: 10mm;
      margin-bottom: 12mm;
      margin-left: 7mm;
      margin-right: 13mm; /* 3mm inner gutter on right for verso staple fold */
    }
    @page:right {
      margin-top: 10mm;
      margin-bottom: 12mm;
      margin-left: 13mm; /* 3mm inner gutter on left for recto staple fold */
      margin-right: 7mm;
    }
    body {
      font-family: 'Georgia', 'Garamond', serif;
      font-size: 8.5pt;
      line-height: 1.32;
      color: #000000;
      margin: 0;
      padding: 0;
      background: #ffffff;
      -webkit-font-smoothing: antialiased;
    }
    h1, h2, h3, h4, h5, h6, strong, th, .sans {
      font-family: 'Inter', -apple-system, sans-serif;
    }
    /* Page Container: Zero outer border, pure flex distribution for optimal page budget */
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
      padding: 3mm 4mm;
      background: #ffffff;
    }
    .page:last-child, .page-container:last-child {
      page-break-after: auto;
    }
    /* Full flex section container for interior distribution */
    .page-body-full {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    /* Clean Task Section Spacing (Zero double lines after handwriting task lines) */
    .task-section {
      margin-bottom: 5px;
      padding-bottom: 0;
    }
    .task-section-divider {
      border-bottom: 1.2px solid #000000;
      padding-bottom: 4px;
      margin-bottom: 5px;
    }
    /* Thick Black Writing Lines for Handwriting */
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
    /* Single-Line Page Footer with Page Number & Humorous Revision Quip */
    .page-footer-strip {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 0.5px solid #d0d0d0;
      padding-top: 1.5px;
      margin-top: 2px;
      font-family: 'Inter', sans-serif;
      font-size: 6.4pt;
      line-height: 1.15;
      color: #666666;
    }
    .footer-quip {
      font-style: italic;
      color: #666666;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .footer-page-num {
      font-family: 'Inter', sans-serif;
      font-weight: 700;
      white-space: nowrap;
      color: #000000;
      font-size: 6.8pt;
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
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #000000; padding-bottom: 4px; margin-bottom: 8px;">
        <div data-department-name="The History Department">
          <span style="font-family: 'Inter', sans-serif; font-size: 11pt; font-weight: 900; color: #000000; text-transform: uppercase; letter-spacing: 1px;">
            <span class="school-brand-target">The History Department</span>
          </span>
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 8.5pt; font-weight: 700; color: #000000;">
          KEY STAGE 3 HISTORICAL STUDIES &bull; YEAR 8
        </div>
      </div>

      <!-- Pupil Details Strip -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 6px 12px; background: #ffffff; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 14px; align-items: center; margin-bottom: 8px;">
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #000000; text-transform: uppercase; margin-right: 8px;">Pupil Name:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #000000; height: 14px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #000000; text-transform: uppercase; margin-right: 8px;">Class:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #000000; height: 14px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #000000; text-transform: uppercase; margin-right: 8px;">Teacher:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #000000; height: 14px;"></div>
        </div>
      </div>

      <!-- Main Title Block -->
      <div style="text-align: center; margin: 2px 0 6px 0;">
        <div style="display: inline-block; border: 1.5px solid #000000; color: #000000; font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; padding: 2px 10px; border-radius: 3px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; background: #ffffff;">
          Year 8 Enquiry &bull; 1517–1689
        </div>
        <h1 style="font-family: 'Playfair Display', serif; font-size: 22pt; line-height: 1.15; color: #000000; margin: 2px 0 3px 0; font-weight: 900;">
          Crown, Church, or Parliament?
        </h1>
        <div style="font-family: 'Georgia', serif; font-size: 10pt; color: #222222; font-style: italic; font-weight: 600;">
          The Struggle for Authority, Religion, and the English State (1517–1689)
        </div>
      </div>

      <!-- Prominent Primary Visual Source Centerpiece (Base64 Inlined, Authentic Provenance) -->
      <div style="margin: 2px 0 5px 0; border: 1.5px solid #000000; border-radius: 4px; overflow: hidden; background: #ffffff;">
        <img src="${coverImgBase64}" alt="King Henry VIII Portrait" style="width: 100%; height: 100mm; object-fit: cover; object-position: center 20%; display: block; margin: 0 auto; filter: grayscale(100%);">
        <div style="display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #000000; padding: 3px 8px; border-top: 1.5px solid #000000; background: #ffffff;">
          <span><strong>Primary Visual Evidence:</strong> <em>Contemporary Portrait of King Henry VIII</em> &bull; Workshop of Hans Holbein the Younger (c. 1537)</span>
          <span style="font-weight: 700;">ROYAL COLLECTION ARCHIVE</span>
        </div>
      </div>

      <!-- Disciplinary Strategy Overview & Assessment Blueprint -->
      <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 5px 8px; background: #fbfbfb; margin: 3px 0 6px 0; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px;">
        <div style="border-right: 1px solid #000000; padding-right: 6px;">
          <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; color: #000000;">
            1. Causal Analysis [12m]
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 6.8pt; line-height: 1.2; color: #222222; margin-top: 1px;">
            Q4: Explain why major constitutional turning points occurred. 3 structured analytical paragraphs using 2 stimulus points + own knowledge (15 mins).
          </div>
        </div>
        <div style="border-right: 1px solid #000000; padding-right: 6px;">
          <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; color: #000000;">
            2. Disciplinary Drills [4m]
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 6.8pt; line-height: 1.2; color: #222222; margin-top: 1px;">
            Q3(a/b): Explain features, similarities, and differences between political and religious regimes. Specific factual evidence + comparison (5 mins).
          </div>
        </div>
        <div>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; color: #000000;">
            3. Synoptic Essay [16m+4m]
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 6.8pt; line-height: 1.2; color: #222222; margin-top: 1px;">
            Enquiry 5: ‘How far do you agree?’ Evaluative historical judgement weighing the power of Crown, Church, and Parliament across 172 years (25 mins).
          </div>
        </div>
      </div>

      <!-- Course Specification Curriculum Tracking Table -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; overflow: hidden; margin: 2px 0 2px 0;">
        <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif;">
          <thead>
            <tr style="border-bottom: 1.5px solid #000000; background: #ffffff;">
              <th style="padding: 6px 10px; text-align: left; font-size: 8.2pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; border-right: 1.2px solid #000000; color: #000000;">
                Course Specification &bull; Key Enquiry Sequence
              </th>
              <th style="padding: 6px 4px; width: 64px; text-align: center; font-size: 7.8pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; border-right: 1.2px solid #000000; color: #000000;">
                Learnt
              </th>
              <th style="padding: 6px 4px; width: 64px; text-align: center; font-size: 7.8pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; color: #000000;">
                Revised
              </th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 7px 10px; border-right: 1.2px solid #000000;">
                <div style="font-size: 8.5pt; font-weight: 800; color: #000000; line-height: 1.25;">
                  Enquiry 1: Henry VIII &amp; The English Reformation (1517–1534)
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.8pt; font-style: italic; color: #333333; margin-top: 1px; line-height: 1.2;">
                  Why did Henry VIII break with the Roman Catholic Church, and how did the Act of Supremacy reshape sovereign power?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #000000;">
                <div style="width: 15px; height: 15px; border: 1.5px solid #000000; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 15px; height: 15px; border: 1.5px solid #000000; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 7px 10px; border-right: 1.2px solid #000000;">
                <div style="font-size: 8.5pt; font-weight: 800; color: #000000; line-height: 1.25;">
                  Enquiry 2: Elizabeth I &amp; The Middle Way (1558–1588)
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.8pt; font-style: italic; color: #333333; margin-top: 1px; line-height: 1.2;">
                  How did Elizabeth I navigate deep religious divisions, and why did she reject religious extremism in 1559?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #000000;">
                <div style="width: 15px; height: 15px; border: 1.5px solid #000000; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 15px; height: 15px; border: 1.5px solid #000000; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 7px 10px; border-right: 1.2px solid #000000;">
                <div style="font-size: 8.5pt; font-weight: 800; color: #000000; line-height: 1.25;">
                  Enquiry 3: The Spanish Armada &amp; Naval Power (1588)
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.8pt; font-style: italic; color: #333333; margin-top: 1px; line-height: 1.2;">
                  Why was Philip II’s enterprise of England defeated, and how did fireships and weather decide the outcome?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #000000;">
                <div style="width: 15px; height: 15px; border: 1.5px solid #000000; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 15px; height: 15px; border: 1.5px solid #000000; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 7px 10px; border-right: 1.2px solid #000000;">
                <div style="font-size: 8.5pt; font-weight: 800; color: #000000; line-height: 1.25;">
                  Enquiry 4: The English Civil War, Regicide &amp; Bill of Rights (1642–1689)
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.8pt; font-style: italic; color: #333333; margin-top: 1px; line-height: 1.2;">
                  Why did constitutional collision over Divine Right culminate in the execution of Charles I and parliamentary supremacy?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #000000;">
                <div style="width: 15px; height: 15px; border: 1.5px solid #000000; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 15px; height: 15px; border: 1.5px solid #000000; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
            <tr>
              <td style="padding: 7px 10px; border-right: 1.2px solid #000000;">
                <div style="font-size: 8.5pt; font-weight: 800; color: #000000; line-height: 1.25;">
                  Enquiry 5: Synoptic Assessment: Crown, Church, or Parliament?
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.8pt; font-style: italic; color: #333333; margin-top: 1px; line-height: 1.2;">
                  Which turning point decisively transformed the English constitution from absolute monarchy to parliamentary rule?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #000000;">
                <div style="width: 15px; height: 15px; border: 1.5px solid #000000; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 15px; height: 15px; border: 1.5px solid #000000; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      ${renderFooterStrip(1, 'If you think politics today is messy, just remember King Henry VIII literally invented a new church because his divorce paperwork was taking too long.', 20)}
    </div>
  </div>
`;

  // ====================================================================
  // PAGES 2–9: THE FIRST 4 ENQUIRIES (MEDICINE 2-PAGE SPREAD ARCHITECTURE)
  // ====================================================================
  for (let i = 0; i < 4; i++) {
    const cfg = enquiryConfigs[i];
    const leftPageNum = i * 2 + 2;
    const rightPageNum = i * 2 + 3;

    // LEFT PAGE (VERSO): DO NOW + KEY VOCAB + TWO 4-MARK QUESTIONS
    html += `
  <div class="page page-container verso-page" id="page-${leftPageNum}">
    <div class="page-body-full">
      <!-- Lesson Header -->
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 6px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 11pt; color: #000000; margin: 0; font-weight: 800;">
          ${cfg.title}
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
          Knowledge Retrieval &bull; Key Vocabulary &bull; Disciplinary Practice
        </span>
      </div>

      <!-- 10-Question Do Now Retrieval Grid -->
      <div class="task-section task-section-divider">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; text-transform: uppercase; letter-spacing: 0.5px;">
            &bull; 'Do Now' Retrieval Drill (10 Recall Questions)
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 800; border: 1.2px solid #000000; padding: 1px 6px; border-radius: 3px;">
            Score: [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 10 ]
          </span>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px 14px;">
          ${cfg.doNow
            .map(
              (item, idx) => `
          <div>
            <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 700; color: #000000; line-height: 1.2;">
              ${idx + 1}. ${item.q}
            </div>
            <div class="task-line-dotted"></div>
          </div>
          `,
            )
            .join('')}
        </div>
      </div>

      <!-- Key Vocabulary Task -->
      <div class="task-section task-section-divider">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; text-transform: uppercase; letter-spacing: 0.5px;">
            &bull; Key Vocabulary Task
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 700; border: 1px solid #000000; padding: 0 4px; border-radius: 2px;">TERMINOLOGY</span>
        </div>
        <p style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.25;">
          ${cfg.vocabPrompt}
        </p>
        <div class="ruled-lines-block">
          <div class="task-line" style="height: 8.4mm;"></div>
          <div class="task-line" style="height: 8.4mm;"></div>
          <div class="task-line" style="height: 8.4mm;"></div>
          <div class="task-line" style="height: 8.4mm;"></div>
        </div>
      </div>

      <!-- Disciplinary Practice Question A [4 marks] -->
      <div class="task-section task-section-divider">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; text-transform: uppercase; letter-spacing: 0.5px;">
            &bull; Question 3(a): Explain One ${cfg.fourMarkA.type} [4 marks]
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 700; border: 1px solid #000000; padding: 0 4px; border-radius: 2px;">[4 MARKS &bull; 5 MINS]</span>
        </div>
        <p style="font-family: 'Playfair Display', serif; font-size: 8.2pt; font-weight: 800; color: #000000; margin: 0 0 2px 0;">
          ${cfg.fourMarkA.question}
        </p>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-style: italic; color: #333333; margin-bottom: 2px;">
          <strong>Hint:</strong> ${cfg.fourMarkA.hint}
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; margin-bottom: 2px;">
          <strong>Stems:</strong> ${cfg.fourMarkA.stems}
        </div>
        <div class="ruled-lines-block">
          <div class="task-line" style="height: 8.4mm;"></div>
          <div class="task-line" style="height: 8.4mm;"></div>
          <div class="task-line" style="height: 8.4mm;"></div>
          <div class="task-line" style="height: 8.4mm;"></div>
          <div class="task-line" style="height: 8.4mm;"></div>
        </div>
      </div>

      <!-- Disciplinary Practice Question B [4 marks] -->
      <div class="task-section">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; text-transform: uppercase; letter-spacing: 0.5px;">
            &bull; Question 3(b): Explain One ${cfg.fourMarkB.type} [4 marks]
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 700; border: 1px solid #000000; padding: 0 4px; border-radius: 2px;">[4 MARKS &bull; 5 MINS]</span>
        </div>
        <p style="font-family: 'Playfair Display', serif; font-size: 8.2pt; font-weight: 800; color: #000000; margin: 0 0 2px 0;">
          ${cfg.fourMarkB.question}
        </p>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-style: italic; color: #333333; margin-bottom: 2px;">
          <strong>Hint:</strong> ${cfg.fourMarkB.hint}
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; margin-bottom: 2px;">
          <strong>Stems:</strong> ${cfg.fourMarkB.stems}
        </div>
        <div class="ruled-lines-block">
          <div class="task-line" style="height: 8.4mm;"></div>
          <div class="task-line" style="height: 8.4mm;"></div>
          <div class="task-line" style="height: 8.4mm;"></div>
          <div class="task-line" style="height: 8.4mm;"></div>
          <div class="task-line" style="height: 8.4mm;"></div>
        </div>
      </div>

      ${renderFooterStrip(leftPageNum, cfg.leftPageQuip, 20)}
    </div>
  </div>

  <!-- RIGHT PAGE (RECTO): 12-MARK EXPLAIN WHY + STRUCTURE STRIP + WRITING LINES + TIMELINE MISSION -->
  <div class="page page-container recto-page" id="page-${rightPageNum}">
    <div class="page-body-full">
      <!-- Exam Header -->
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 6px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 11pt; color: #000000; margin: 0; font-weight: 800;">
          ${cfg.tariff}
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
          Extended Writing Assessment
        </span>
      </div>

      <!-- Question Stem & Stimulus Box -->
      <div style="border: 1px solid #000000; border-radius: 3px; padding: 5px 8px; background: #ffffff; margin-bottom: 5px;">
        <div style="font-family: 'Playfair Display', serif; font-size: 8.8pt; font-weight: 800; color: #000000; margin-bottom: 3px; line-height: 1.25;">
          ${cfg.examStem}
        </div>
        <div style="display: flex; align-items: center; gap: 8px; font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #000000;">
          <strong>Stimulus:</strong>
          <span style="border: 1px solid #000000; padding: 1px 6px; border-radius: 2px; font-weight: 600;">${cfg.stimulus[0]}</span>
          <span style="border: 1px solid #000000; padding: 1px 6px; border-radius: 2px; font-weight: 600;">${cfg.stimulus[1]}</span>
          <span style="font-style: italic;">(You must also use information of your own)</span>
        </div>
      </div>

      <!-- 3-Column Planning Structure Strip -->
      <div style="margin-bottom: 5px;">
        <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-transform: uppercase; margin-bottom: 2px; border-bottom: 1px solid #000000; padding-bottom: 1px;">
          Structure Strip &bull; 3-Paragraph Analytical Plan
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px;">
          ${cfg.structureStrip
            .map(
              (strip) => `
          <div style="border: 1px solid #000000; border-top: 2.5px solid #000000; border-radius: 2px; padding: 3px 5px; background: #ffffff;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7pt; color: #000000; display: block; margin-bottom: 1px;">${strip.col}</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #000000; line-height: 1.2; display: block;">${strip.text}</span>
          </div>
          `,
            )
            .join('')}
        </div>
      </div>

      <!-- Connectives & Key Vocabulary Bank -->
      <div style="border: 1px solid #000000; border-radius: 3px; padding: 4px 7px; background: #ffffff; margin-bottom: 5px; display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
        <div>
          <strong style="font-family: 'Inter', sans-serif; font-size: 7pt; text-transform: uppercase; display: block;">Analytical Connectives:</strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-style: italic; line-height: 1.2; display: block;">${cfg.connectives}</span>
        </div>
        <div>
          <strong style="font-family: 'Inter', sans-serif; font-size: 7pt; text-transform: uppercase; display: block;">Key Vocabulary Bank:</strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; line-height: 1.2; display: block;">${cfg.wordBank}</span>
        </div>
      </div>

      <!-- Ruled Task Lines for Extended Writing -->
      <div style="font-family: 'Inter', sans-serif; font-size: 7.1pt; font-style: italic; color: #222222; margin-bottom: 2px;">
        <strong>Task:</strong> Using the structure strip above, write your analytical response below:
      </div>
      <div style="display: flex; flex-direction: column; gap: 0; margin-bottom: 5px; flex: 1; justify-content: space-between;">
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
      </div>

      <!-- Timeline Mission Box -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 5px 8px; background: #ffffff; display: flex; justify-content: space-between; align-items: center; margin-top: 2px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; background: #000000; color: #ffffff; padding: 2px 6px; border-radius: 2px; text-transform: uppercase; white-space: nowrap;">
            Timeline Mission
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.3pt; color: #000000; line-height: 1.2;">
            ${cfg.timelineMission}
          </span>
        </div>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; white-space: nowrap; margin-left: 8px;">
          &rarr; Pages 10–11
        </span>
      </div>

      ${renderFooterStrip(rightPageNum, cfg.rightPageQuip, 20)}
    </div>
  </div>
`;
  }

  // ====================================================================
  // PAGES 10–11: THE LIVING TIMELINE IN THE MIDDLE OF BOOKLET!
  // ====================================================================
  html += `
  <!-- PAGE 10: LIVING TIMELINE PART 1 (MILESTONES 1–4) -->
  <div class="page page-container verso-page" id="page-10" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div>
        <div style="border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 6px;">
          <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 11pt; color: #000000; text-transform: uppercase; font-weight: 800;">
            Living Timeline &bull; Part 1: Reformation, Royal Supremacy &amp; The Middle Way (1517–1588)
          </h2>
        </div>

        <div style="border-bottom: 1px solid #000000; padding-bottom: 4px; margin-bottom: 8px; font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #000000;">
          <strong>Instructions:</strong> As you study each enquiry lesson, complete the timeline missions by sketching and annotating in the corresponding Key Topic boxes below.
        </div>
      </div>

      <!-- 4 Milestones with Large Blank Drawing/Notes Area (Medicine Standard) -->
      <div style="display: flex; flex-direction: column; gap: 6px; flex: 1; justify-content: space-between;">

        <!-- Milestone 1 -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #000000;">
                1517 / 1534 &bull; The Break with Rome &amp; Henry VIII’s Act of Supremacy
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Enquiry 1</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.22;">
              Martin Luther’s 95 Theses challenge papal corruption. In England, Pope Clement VII refuses Henry VIII’s divorce petition. Guided by Thomas Cromwell, Parliament passes the 1534 Act of Supremacy, declaring the King Supreme Head of the Church and extinguishing 1,000 years of papal authority.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 38mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>

        <!-- Milestone 2 -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #000000;">
                1536–1539 &bull; The Dissolution of the Monasteries &amp; Pilgrimage of Grace
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Enquiry 1</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.22;">
              Following the Valor Ecclesiasticus survey, Cromwell dismantles over 800 wealthy monasteries, seizing monastic gold, lead roofs, and vast estates for Crown revenue. In the North, Robert Aske leads 30,000 rebels in the Pilgrimage of Grace; Henry brutally executes the rebel leaders.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 38mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>

        <!-- Milestone 3 -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #000000;">
                1559 &bull; Elizabeth I’s Religious Settlement: The Elizabethan Middle Way
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Enquiry 2</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.22;">
              Following Mary I’s bloody burnings at Smithfield, Elizabeth establishes the Via Media. Taking the title Supreme Governor, she enforces the 1559 Book of Common Prayer and Uniformity fines, while refusing to persecute private Catholic conscience provided citizens remain outwardly loyal.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 38mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>

        <!-- Milestone 4 -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #000000;">
                1588 &bull; The Defeat of the Spanish Armada: English Naval Ascendancy
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Enquiry 3</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.22;">
              Philip II launches 130 warships to overthrow Elizabeth and restore Catholicism. At Calais, Drake deploys midnight fireships to shatter the Spanish crescent formation. Decimated by English long-range gunnery at Gravelines and battered by North Sea storms, half the fleet is destroyed.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 38mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>

      </div>

      ${renderFooterStrip(10, 'Tudor Rule: Marry strategically, execute your chief ministers when things go wrong, and always blame the Pope.', 20)}
    </div>
  </div>

  <!-- PAGE 11: LIVING TIMELINE PART 2 (MILESTONES 5–8) -->
  <div class="page page-container recto-page" id="page-11" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div>
        <div style="border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 6px;">
          <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 11pt; color: #000000; text-transform: uppercase; font-weight: 800;">
            Living Timeline &bull; Part 2: Civil War, Regicide &amp; Parliamentary Sovereignty (1605–1689)
          </h2>
        </div>

        <div style="border-bottom: 1px solid #000000; padding-bottom: 4px; margin-bottom: 8px; font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #000000;">
          <strong>Instructions:</strong> As you study each enquiry lesson, complete the timeline missions by sketching and annotating in the corresponding Key Topic boxes below.
        </div>
      </div>

      <!-- 4 Milestones with Large Blank Drawing/Notes Area (Medicine Standard) -->
      <div style="display: flex; flex-direction: column; gap: 6px; flex: 1; justify-content: space-between;">

        <!-- Milestone 5 -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #000000;">
                1605 / 1628 &bull; The Gunpowder Plot &amp; Petition of Right: Clashing Sovereignty
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Enquiry 4</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.22;">
              Catholic conspirators attempt to blow up James I in 1605. When Charles I claims Divine Right and collects illegal loans, Parliament forces him to sign the 1628 Petition of Right, outlawing taxation without consent. In 1629, Charles dissolves Parliament for eleven years of Personal Rule.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 38mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>

        <!-- Milestone 6 -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #000000;">
                1642–1646 &bull; Outbreak of the Civil War &amp; The Rise of the New Model Army
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Enquiry 4</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.22;">
              Armed confrontation over Ship Money and church policy erupts into civil war. Cromwell and Fairfax forge the professional, merit-based New Model Army. Driven by Puritan conviction and disciplined cavalry tactics, Parliament crushes the Royalists at Naseby in 1645.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 38mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>

        <!-- Milestone 7 -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #000000;">
                1649 &bull; The Trial &amp; Public Regicide of King Charles I at Whitehall
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Enquiry 4</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.22;">
              Branded a ‘man of blood’ after provoking the Second Civil War, Charles is tried by the Rump Parliament for treason against his own people. On 30 January 1649, he is publicly beheaded outside the Banqueting House at Whitehall; England becomes an unprecedented Commonwealth republic.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 38mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>

        <!-- Milestone 8 -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #000000;">
                1688–1689 &bull; The Glorious Revolution &amp; The Statutory Bill of Rights
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Enquiry 5</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.22;">
              Fearing a permanent Catholic dynasty, Parliament deposes James II and invites William of Orange and Mary II. In 1689, they sign the Bill of Rights, permanently outlawing royal suspension of laws and taxation without consent—establishing modern Constitutional Monarchy and Parliamentary Sovereignty.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 38mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>

      </div>

      ${renderFooterStrip(11, 'Stuart Rule: Tell Parliament you answer only to God, dissolve them for 11 years, and act surprised when they issue an arrest warrant.', 20)}
    </div>
  </div>
`;

  // ====================================================================
  // PAGES 12–13: ENQUIRY 5 (SYNOPTIC LESSON SPREAD)
  // ====================================================================
  const cfg5 = enquiryConfigs[4];
  html += `
  <!-- PAGE 12: ENQUIRY 5 LEFT PAGE (VERSO) -->
  <div class="page page-container verso-page" id="page-12">
    <div class="page-body-full">
      <!-- Lesson Header -->
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 6px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 11pt; color: #000000; margin: 0; font-weight: 800;">
          ${cfg5.title}
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
          Knowledge Retrieval &bull; Key Vocabulary &bull; Disciplinary Practice
        </span>
      </div>

      <!-- 10-Question Do Now Retrieval Grid -->
      <div class="task-section task-section-divider">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; text-transform: uppercase; letter-spacing: 0.5px;">
            &bull; 'Do Now' Retrieval Drill (10 Recall Questions)
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 800; border: 1.2px solid #000000; padding: 1px 6px; border-radius: 3px;">
            Score: [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 10 ]
          </span>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px 14px;">
          ${cfg5.doNow
            .map(
              (item, idx) => `
          <div>
            <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 700; color: #000000; line-height: 1.2;">
              ${idx + 1}. ${item.q}
            </div>
            <div class="task-line-dotted"></div>
          </div>
          `,
            )
            .join('')}
        </div>
      </div>

      <!-- Key Vocabulary Task -->
      <div class="task-section task-section-divider">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; text-transform: uppercase; letter-spacing: 0.5px;">
            &bull; Key Vocabulary Task
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 700; border: 1px solid #000000; padding: 0 4px; border-radius: 2px;">TERMINOLOGY</span>
        </div>
        <p style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.25;">
          ${cfg5.vocabPrompt}
        </p>
        <div class="ruled-lines-block">
          <div class="task-line" style="height: 8.4mm;"></div>
          <div class="task-line" style="height: 8.4mm;"></div>
          <div class="task-line" style="height: 8.4mm;"></div>
          <div class="task-line" style="height: 8.4mm;"></div>
        </div>
      </div>

      <!-- Disciplinary Practice Question A [4 marks] -->
      <div class="task-section task-section-divider">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; text-transform: uppercase; letter-spacing: 0.5px;">
            &bull; Question 3(a): Explain One ${cfg5.fourMarkA.type} [4 marks]
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 700; border: 1px solid #000000; padding: 0 4px; border-radius: 2px;">[4 MARKS &bull; 5 MINS]</span>
        </div>
        <p style="font-family: 'Playfair Display', serif; font-size: 8.2pt; font-weight: 800; color: #000000; margin: 0 0 2px 0;">
          ${cfg5.fourMarkA.question}
        </p>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-style: italic; color: #333333; margin-bottom: 2px;">
          <strong>Hint:</strong> ${cfg5.fourMarkA.hint}
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; margin-bottom: 2px;">
          <strong>Stems:</strong> ${cfg5.fourMarkA.stems}
        </div>
        <div class="ruled-lines-block">
          <div class="task-line" style="height: 8.4mm;"></div>
          <div class="task-line" style="height: 8.4mm;"></div>
          <div class="task-line" style="height: 8.4mm;"></div>
          <div class="task-line" style="height: 8.4mm;"></div>
          <div class="task-line" style="height: 8.4mm;"></div>
        </div>
      </div>

      <!-- Disciplinary Practice Question B [4 marks] -->
      <div class="task-section">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; text-transform: uppercase; letter-spacing: 0.5px;">
            &bull; Question 3(b): Explain One ${cfg5.fourMarkB.type} [4 marks]
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 700; border: 1px solid #000000; padding: 0 4px; border-radius: 2px;">[4 MARKS &bull; 5 MINS]</span>
        </div>
        <p style="font-family: 'Playfair Display', serif; font-size: 8.2pt; font-weight: 800; color: #000000; margin: 0 0 2px 0;">
          ${cfg5.fourMarkB.question}
        </p>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-style: italic; color: #333333; margin-bottom: 2px;">
          <strong>Hint:</strong> ${cfg5.fourMarkB.hint}
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; margin-bottom: 2px;">
          <strong>Stems:</strong> ${cfg5.fourMarkB.stems}
        </div>
        <div class="ruled-lines-block">
          <div class="task-line" style="height: 8.4mm;"></div>
          <div class="task-line" style="height: 8.4mm;"></div>
          <div class="task-line" style="height: 8.4mm;"></div>
          <div class="task-line" style="height: 8.4mm;"></div>
          <div class="task-line" style="height: 8.4mm;"></div>
        </div>
      </div>

      ${renderFooterStrip(12, cfg5.leftPageQuip, 20)}
    </div>
  </div>

  <!-- PAGE 13: ENQUIRY 5 RIGHT PAGE (RECTO) -->
  <div class="page page-container recto-page" id="page-13">
    <div class="page-body-full">
      <!-- Exam Header -->
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 6px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 11pt; color: #000000; margin: 0; font-weight: 800;">
          ${cfg5.tariff}
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
          Extended Writing Assessment
        </span>
      </div>

      <!-- Question Stem & Stimulus Box -->
      <div style="border: 1px solid #000000; border-radius: 3px; padding: 5px 8px; background: #ffffff; margin-bottom: 5px;">
        <div style="font-family: 'Playfair Display', serif; font-size: 8.8pt; font-weight: 800; color: #000000; margin-bottom: 3px; line-height: 1.25;">
          ${cfg5.examStem}
        </div>
        <div style="display: flex; align-items: center; gap: 8px; font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #000000;">
          <strong>Stimulus:</strong>
          <span style="border: 1px solid #000000; padding: 1px 6px; border-radius: 2px; font-weight: 600;">${cfg5.stimulus[0]}</span>
          <span style="border: 1px solid #000000; padding: 1px 6px; border-radius: 2px; font-weight: 600;">${cfg5.stimulus[1]}</span>
          <span style="font-style: italic;">(You must also use information of your own)</span>
        </div>
      </div>

      <!-- 3-Column Planning Structure Strip -->
      <div style="margin-bottom: 5px;">
        <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-transform: uppercase; margin-bottom: 2px; border-bottom: 1px solid #000000; padding-bottom: 1px;">
          Structure Strip &bull; 3-Paragraph Analytical Plan
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px;">
          ${cfg5.structureStrip
            .map(
              (strip) => `
          <div style="border: 1px solid #000000; border-top: 2.5px solid #000000; border-radius: 2px; padding: 3px 5px; background: #ffffff;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7pt; color: #000000; display: block; margin-bottom: 1px;">${strip.col}</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #000000; line-height: 1.2; display: block;">${strip.text}</span>
          </div>
          `,
            )
            .join('')}
        </div>
      </div>

      <!-- Connectives & Key Vocabulary Bank -->
      <div style="border: 1px solid #000000; border-radius: 3px; padding: 4px 7px; background: #ffffff; margin-bottom: 5px; display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
        <div>
          <strong style="font-family: 'Inter', sans-serif; font-size: 7pt; text-transform: uppercase; display: block;">Analytical Connectives:</strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-style: italic; line-height: 1.2; display: block;">${cfg5.connectives}</span>
        </div>
        <div>
          <strong style="font-family: 'Inter', sans-serif; font-size: 7pt; text-transform: uppercase; display: block;">Key Vocabulary Bank:</strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; line-height: 1.2; display: block;">${cfg5.wordBank}</span>
        </div>
      </div>

      <!-- Ruled Task Lines for Extended Writing -->
      <div style="font-family: 'Inter', sans-serif; font-size: 7.1pt; font-style: italic; color: #222222; margin-bottom: 2px;">
        <strong>Task:</strong> Using the structure strip above, write your analytical response below:
      </div>
      <div style="display: flex; flex-direction: column; gap: 0; margin-bottom: 5px; flex: 1; justify-content: space-between;">
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
      </div>

      <!-- Timeline Mission Box -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 5px 8px; background: #ffffff; display: flex; justify-content: space-between; align-items: center; margin-top: 2px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; background: #000000; color: #ffffff; padding: 2px 6px; border-radius: 2px; text-transform: uppercase; white-space: nowrap;">
            Timeline Mission
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.3pt; color: #000000; line-height: 1.2;">
            ${cfg5.timelineMission}
          </span>
        </div>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; white-space: nowrap; margin-left: 8px;">
          &larr; Pages 10–11
        </span>
      </div>

      ${renderFooterStrip(13, cfg5.rightPageQuip, 20)}
    </div>
  </div>
`;

  // ====================================================================
  // PAGES 14–15: SYNOPTIC ASSESSMENT & 16-MARK ESSAY SPREAD (MEDICINE STYLE)
  // ====================================================================
  const linedRows15 = Array.from({ length: 28 }, (_, idx) => {
    const isFirst = idx === 0;
    const marginContent = isFirst
      ? `<span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #555555; text-transform: uppercase; font-weight: 700;">Margin</span>`
      : `&nbsp;`;
    const linePrompt = isFirst
      ? `<span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-style: italic; color: #777777;">[ Extended Essay Response &bull; Paragraph 2 / Counter-Argument &bull; Evaluation ]</span>`
      : `&nbsp;`;
    return `
      <div class="lined-row">
        <div class="lined-margin-cell">${marginContent}</div>
        <div class="lined-content-cell">${linePrompt}</div>
      </div>`;
  }).join('');

  html += `
  <!-- PAGE 14: SYNOPTIC ESSAY BLUEPRINT & COMPARATIVE EVALUATION MATRIX -->
  <div class="page page-container verso-page" id="page-14">
    <div class="page-body-full">
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 6px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 11pt; color: #000000; margin: 0; font-weight: 800;">
          Synoptic Historical Verdict &amp; 16-Mark Essay Assessment
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
          [16 MARKS + 4 SPaG &bull; 25 MINS]
        </span>
      </div>

      <!-- Essay Question Stem & Stimulus Box -->
      <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 6px 10px; background: #ffffff; margin-bottom: 6px;">
        <div style="font-family: 'Playfair Display', serif; font-size: 9.5pt; font-weight: 900; color: #000000; margin-bottom: 4px; line-height: 1.25;">
          “The execution of King Charles I in 1649 was the most decisive turning point in the struggle for power between Crown, Church, and Parliament in the period 1517–1689.” How far do you agree? [16 marks + 4 SPaG]
        </div>
        <div style="display: flex; align-items: center; gap: 10px; font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #000000;">
          <strong>Stimulus:</strong>
          <span style="border: 1px solid #000000; padding: 1.5px 8px; border-radius: 2px; font-weight: 700;">The Act of Supremacy (1534)</span>
          <span style="border: 1px solid #000000; padding: 1.5px 8px; border-radius: 2px; font-weight: 700;">The Bill of Rights (1689)</span>
          <span style="font-style: italic;">(You must also use information of your own)</span>
        </div>
      </div>

      <!-- 4-Column Synoptic Evaluation Matrix -->
      <div style="margin-bottom: 6px;">
        <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 800; text-transform: uppercase; margin-bottom: 3px; border-bottom: 1px solid #000000; padding-bottom: 1px;">
          Synoptic Evidence Matrix &bull; Balancing Constitutional &amp; Religious Factors
        </div>
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px;">
          <div style="border: 1px solid #000000; border-top: 2.5px solid #000000; border-radius: 2px; padding: 4px 6px; background: #ffffff;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #000000; display: block; margin-bottom: 2px;">1. CROWN POWER</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #222222; line-height: 1.2; display: block;">From Henry VIII’s supreme imperial kingship to Charles I’s Divine Right and William III’s statutory constitutional monarchy.</span>
          </div>
          <div style="border: 1px solid #000000; border-top: 2.5px solid #000000; border-radius: 2px; padding: 4px 6px; background: #ffffff;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #000000; display: block; margin-bottom: 2px;">2. CHURCH AUTHORITY</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #222222; line-height: 1.2; display: block;">From Roman Catholic monopoly to royal control, Elizabethan Via Media, Puritan Commonwealth, and 1689 Toleration.</span>
          </div>
          <div style="border: 1px solid #000000; border-top: 2.5px solid #000000; border-radius: 2px; padding: 4px 6px; background: #ffffff;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #000000; display: block; margin-bottom: 2px;">3. PARLIAMENT</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #222222; line-height: 1.2; display: block;">From Henry’s legal instrument to revolutionary regicide court and sovereign co-equal governing partner in 1689.</span>
          </div>
          <div style="border: 1px solid #000000; border-top: 2.5px solid #000000; border-radius: 2px; padding: 4px 6px; background: #ffffff;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #000000; display: block; margin-bottom: 2px;">4. TURNING POINTS</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #222222; line-height: 1.2; display: block;">Weighing 1534 (Supreme Head), 1588 (Protestant survival), 1649 (Regicide trauma), against 1689 (Statutory supremacy).</span>
          </div>
        </div>
      </div>

      <!-- Analytical Argument Sentence Stems -->
      <div style="border: 1px solid #000000; border-radius: 3px; padding: 4px 8px; background: #fbfbfb; margin-bottom: 5px;">
        <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase;">Evaluative Stems:</strong>
        <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-style: italic; color: #333333; line-height: 1.25; display: block; margin-top: 1px;">
          A compelling case can be made that the 1649 regicide was the pivotal event because... &bull; On one hand, executing Charles I permanently shattered the mystical belief in Divine Right... &bull; However, the 1649 settlement proved unstable, collapsing into military dictatorship... &bull; In contrast, the 1689 Bill of Rights was more decisive because it established statutory parliamentary sovereignty... &bull; In conclusion, while 1649 removed a king, 1689 permanently transformed the English constitution...
        </span>
      </div>

      <!-- Ruled Lines for Thesis Statement & Introduction -->
      <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; color: #000000; margin-bottom: 2px;">
        Essay Introduction &bull; Thesis Statement &amp; Criterion Definition:
      </div>
      <div style="display: flex; flex-direction: column; gap: 0; margin-bottom: 5px; flex: 1; justify-content: space-between;">
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
      </div>

      ${renderFooterStrip(14, 'When writing a 16-mark essay, never sit on the historical fence so long that the splinters become structural. Take a decisive stand and prove it with dates.', 20)}
    </div>
  </div>

  <!-- PAGE 15: 28-LINE LINED ESSAY PAGE (MEDICINE STYLE) -->
  <div class="page page-container recto-page" id="page-15">
    <div class="page-body-full">
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 4px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 10.5pt; color: #000000; margin: 0; font-weight: 800;">
          Synoptic Historical Verdict &bull; Paragraph 2 &amp; Counter-Perspective
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
          Extended Essay Assessment
        </span>
      </div>

      <div class="lined-page-grid">
        ${linedRows15}
      </div>

      ${renderFooterStrip(15, 'Crucial exam tip: One precise piece of evidence (like ‘1689 Bill of Rights’) is worth ten vague sentences about ‘people being angry at the government’.', 20)}
    </div>
  </div>
`;

  // ====================================================================
  // PAGES 16–17: KEY HISTORICAL FIGURES & HISTORIOGRAPHY (MEDICINE STYLE)
  // ====================================================================
  const linedRows17 = Array.from({ length: 28 }, (_, idx) => {
    const isFirst = idx === 0;
    const marginContent = isFirst
      ? `<span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #555555; text-transform: uppercase; font-weight: 700;">Margin</span>`
      : `&nbsp;`;
    const linePrompt = isFirst
      ? `<span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-style: italic; color: #777777;">[ Extended Response Continued &bull; Paragraph 3 &amp; Sustained Historical Judgement ]</span>`
      : `&nbsp;`;
    return `
      <div class="lined-row">
        <div class="lined-margin-cell">${marginContent}</div>
        <div class="lined-content-cell">${linePrompt}</div>
      </div>`;
  }).join('');

  html += `
  <!-- PAGE 16: KEY HISTORICAL FIGURES & HISTORIOGRAPHICAL DEBATE -->
  <div class="page page-container verso-page" id="page-16">
    <div class="page-body-full">
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 6px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 11pt; color: #000000; margin: 0; font-weight: 800;">
          Key Historical Figures &amp; Historiographical Debate (1517–1689)
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
          Disciplinary Knowledge Mastery
        </span>
      </div>

      <!-- 8 Key Historical Figures Grid -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 5px; margin-bottom: 6px;">
        <div style="border: 1px solid #000000; border-radius: 3px; padding: 4px 6px; background: #ffffff;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #000000; display: block;">1. King Henry VIII (1509–1547)</strong>
          <span style="font-family: 'Georgia', serif; font-size: 7.1pt; color: #222222; line-height: 1.2; display: block;">Engineered the Break with Rome; declared himself Supreme Head of the Church of England (1534); dissolved 800 monasteries to fund Crown military power.</span>
        </div>
        <div style="border: 1px solid #000000; border-radius: 3px; padding: 4px 6px; background: #ffffff;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #000000; display: block;">2. Thomas Cromwell (1485–1540)</strong>
          <span style="font-family: 'Georgia', serif; font-size: 7.1pt; color: #222222; line-height: 1.2; display: block;">Chief minister who transformed parliamentary statutes into legal weapons; drafted the Act in Restraint of Appeals (1533) establishing England as an independent empire.</span>
        </div>
        <div style="border: 1px solid #000000; border-radius: 3px; padding: 4px 6px; background: #ffffff;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #000000; display: block;">3. Queen Elizabeth I (1558–1603)</strong>
          <span style="font-family: 'Georgia', serif; font-size: 7.1pt; color: #222222; line-height: 1.2; display: block;">Established the Via Media (1559) as Supreme Governor; united England against Catholic foreign intervention; oversaw victory against the Spanish Armada in 1588.</span>
        </div>
        <div style="border: 1px solid #000000; border-radius: 3px; padding: 4px 6px; background: #ffffff;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #000000; display: block;">4. King Philip II of Spain (1556–1598)</strong>
          <span style="font-family: 'Georgia', serif; font-size: 7.1pt; color: #222222; line-height: 1.2; display: block;">Leader of the European Catholic Counter-Reformation; funded conspiracies against Elizabeth and launched the 1588 Armada to return England to papal obedience.</span>
        </div>
        <div style="border: 1px solid #000000; border-radius: 3px; padding: 4px 6px; background: #ffffff;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #000000; display: block;">5. King Charles I (1625–1649)</strong>
          <span style="font-family: 'Georgia', serif; font-size: 7.1pt; color: #222222; line-height: 1.2; display: block;">Stubborn champion of the Divine Right of Kings; ruled without Parliament for eleven years; fought Civil War against Parliament and was beheaded for treason in 1649.</span>
        </div>
        <div style="border: 1px solid #000000; border-radius: 3px; padding: 4px 6px; background: #ffffff;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #000000; display: block;">6. Oliver Cromwell (1599–1658)</strong>
          <span style="font-family: 'Georgia', serif; font-size: 7.1pt; color: #222222; line-height: 1.2; display: block;">Puritan general who forged the New Model Army; executed Charles I and governed the English Republic as Lord Protector during the Commonwealth (1653–1658).</span>
        </div>
        <div style="border: 1px solid #000000; border-radius: 3px; padding: 4px 6px; background: #ffffff;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #000000; display: block;">7. William III &amp; Mary II (1689–1702)</strong>
          <span style="font-family: 'Georgia', serif; font-size: 7.1pt; color: #222222; line-height: 1.2; display: block;">Joint constitutional monarchs invited by Parliament in the Glorious Revolution; signed the 1689 Bill of Rights, surrendering absolute royal veto and taxation powers.</span>
        </div>
        <div style="border: 1px solid #000000; border-radius: 3px; padding: 4px 6px; background: #ffffff;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #000000; display: block;">8. John Locke (1632–1704)</strong>
          <span style="font-family: 'Georgia', serif; font-size: 7.1pt; color: #222222; line-height: 1.2; display: block;">Philosopher of the Glorious Revolution; argued in Two Treatises that monarchs hold power only through a Social Contract with citizens to protect natural liberty.</span>
        </div>
      </div>

      <!-- Historiographical Debate Box -->
      <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 5px 8px; background: #fbfbfb; margin-bottom: 6px;">
        <strong style="font-family: 'Inter', sans-serif; font-size: 7.6pt; text-transform: uppercase; color: #000000; display: block; margin-bottom: 2px;">
          Historiographical Debate: Was 1689 a ‘Glorious’ Revolution or an Elite Coup?
        </strong>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-family: 'Georgia', serif; font-size: 7pt; line-height: 1.22; color: #222222;">
          <div>
            <strong>The Traditional Whig Interpretation (Macaulay):</strong> The 1688–89 settlement was a peaceful, providential triumph of Protestant parliamentary liberty over Catholic royal tyranny, establishing the rule of law and constitutional balance.
          </div>
          <div>
            <strong>The Modern Revisionist Interpretation (Pincus/Morrill):</strong> The revolution was an aggressive invasion by Dutch military forces invited by a narrow Whig aristocratic oligarchy to protect their private property, land, and financial investments.
          </div>
        </div>
      </div>

      <!-- Disciplinary Application Lines -->
      <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; color: #000000; margin-bottom: 2px;">
        Independent Historical Application &bull; Synthesis of Interpretations:
      </div>
      <div style="display: flex; flex-direction: column; gap: 0; margin-bottom: 5px; flex: 1; justify-content: space-between;">
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
      </div>

      ${renderFooterStrip(16, 'Oliver Cromwell banned Christmas, mince pies, and theatre in 1647. The British public tolerated republican virtue for eleven years before begging the royals to return.', 20)}
    </div>
  </div>

  <!-- PAGE 17: 28-LINE LINED ESSAY PAGE (MEDICINE STYLE) -->
  <div class="page page-container recto-page" id="page-17">
    <div class="page-body-full">
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 4px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 10.5pt; color: #000000; margin: 0; font-weight: 800;">
          Synoptic Historical Verdict &bull; Paragraph 3 &amp; Sustained Judgement
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
          Extended Essay Assessment
        </span>
      </div>

      <div class="lined-page-grid">
        ${linedRows17}
      </div>

      ${renderFooterStrip(17, 'Historians have argued about the 1689 settlement for 300 years. If you can explain both the Whig and Revisionist views in three paragraphs, examiner grade 9 is yours.', 20)}
    </div>
  </div>
`;

  // ====================================================================
  // PAGES 18–19: 25-QUESTION RETRIEVAL BANK & DIRT SCOREBOARD (MEDICINE STYLE)
  // ====================================================================
  html += `
  <!-- PAGE 18: 25-QUESTION MASTER RETRIEVAL DRILL BANK -->
  <div class="page page-container verso-page" id="page-18">
    <div class="page-body-full">
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 6px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 11pt; color: #000000; margin: 0; font-weight: 800;">
          25-Question Master Knowledge Retrieval Drill Bank
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
          Total Score: [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 25 ]
        </span>
      </div>

      <div style="display: flex; flex-direction: column; gap: 5px; flex: 1; justify-content: space-between;">
        ${enquiryConfigs
          .map(
            (cfg, cIdx) => `
        <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 4px 8px; background: #ffffff;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000000; padding-bottom: 1.5px; margin-bottom: 3px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.6pt; text-transform: uppercase; color: #000000;">
              Enquiry ${cfg.lessonNum}: ${cfg.title.split(': ')[1]}
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 800; border: 1px solid #000000; padding: 0 4px; border-radius: 2px;">
              [ &nbsp;&nbsp; / 5 ]
            </span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3px 12px;">
            ${cfg.doNow
              .slice(0, 5)
              .map(
                (item, qIdx) => `
            <div>
              <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; color: #000000; line-height: 1.15;">
                ${cIdx * 5 + qIdx + 1}. ${item.q}
              </div>
              <div class="task-line-dotted" style="height: 6.2mm;"></div>
            </div>
            `,
              )
              .join('')}
          </div>
        </div>
        `,
          )
          .join('')}
      </div>

      ${renderFooterStrip(18, 'Knowledge retrieval is like fencing: practice the basic thrust twenty times until your wrist doesn’t have to think about it in the middle of the duel.', 20)}
    </div>
  </div>

  <!-- PAGE 19: COMPLETE ANSWER KEY & GAMIFIED DIRT SCOREBOARD -->
  <div class="page page-container recto-page" id="page-19">
    <div class="page-body-full">
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 6px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 11pt; color: #000000; margin: 0; font-weight: 800;">
          Complete Answer Key &amp; Gamified D.I.R.T. Scoreboard
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
          Dedicated Improvement &amp; Reflection Time
        </span>
      </div>

      <!-- 25 Model Answers Grid -->
      <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 5px 8px; background: #fbfbfb; margin-bottom: 6px;">
        <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 800; text-transform: uppercase; border-bottom: 1px solid #000000; padding-bottom: 2px; margin-bottom: 4px;">
          Master Retrieval Answer Key &bull; Self-Marking Criteria
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3px 12px; font-family: 'Inter', sans-serif; font-size: 6.8pt; line-height: 1.2; color: #000000;">
          ${enquiryConfigs
            .map((cfg, cIdx) =>
              cfg.doNow
                .slice(0, 5)
                .map(
                  (item, qIdx) => `
            <div>
              <strong>Q${cIdx * 5 + qIdx + 1}:</strong> ${item.a}
            </div>
            `,
                )
                .join(''),
            )
            .join('')}
        </div>
      </div>

      <!-- Gamified DIRT Scoreboard Table -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; overflow: hidden; margin-bottom: 6px;">
        <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif; font-size: 7.8pt;">
          <thead>
            <tr style="background: #000000; color: #ffffff;">
              <th style="padding: 4px 6px; text-align: left; border-right: 1px solid #444444;">Enquiry Module</th>
              <th style="padding: 4px 6px; text-align: center; border-right: 1px solid #444444; width: 68px;">Recall Score</th>
              <th style="padding: 4px 6px; text-align: center; border-right: 1px solid #444444; width: 68px;">Target Band</th>
              <th style="padding: 4px 6px; text-align: center; width: 90px;">Mastery Level</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 4px 6px; border-right: 1px solid #000000;">Enquiry 1: Henry VIII &amp; Reformation (1517–1534)</td>
              <td style="padding: 4px 6px; text-align: center; border-right: 1px solid #000000; font-weight: 800;">[ &nbsp;&nbsp;&nbsp; / 5 ]</td>
              <td style="padding: 4px 6px; text-align: center; border-right: 1px solid #000000;">4 / 5</td>
              <td style="padding: 4px 6px; text-align: center;">&bull; Proficient &bull;</td>
            </tr>
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 4px 6px; border-right: 1px solid #000000;">Enquiry 2: Elizabeth I &amp; The Middle Way (1558–1588)</td>
              <td style="padding: 4px 6px; text-align: center; border-right: 1px solid #000000; font-weight: 800;">[ &nbsp;&nbsp;&nbsp; / 5 ]</td>
              <td style="padding: 4px 6px; text-align: center; border-right: 1px solid #000000;">4 / 5</td>
              <td style="padding: 4px 6px; text-align: center;">&bull; Proficient &bull;</td>
            </tr>
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 4px 6px; border-right: 1px solid #000000;">Enquiry 3: The Spanish Armada (1588)</td>
              <td style="padding: 4px 6px; text-align: center; border-right: 1px solid #000000; font-weight: 800;">[ &nbsp;&nbsp;&nbsp; / 5 ]</td>
              <td style="padding: 4px 6px; text-align: center; border-right: 1px solid #000000;">4 / 5</td>
              <td style="padding: 4px 6px; text-align: center;">&bull; Proficient &bull;</td>
            </tr>
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 4px 6px; border-right: 1px solid #000000;">Enquiry 4: English Civil War &amp; Regicide (1642–1649)</td>
              <td style="padding: 4px 6px; text-align: center; border-right: 1px solid #000000; font-weight: 800;">[ &nbsp;&nbsp;&nbsp; / 5 ]</td>
              <td style="padding: 4px 6px; text-align: center; border-right: 1px solid #000000;">4 / 5</td>
              <td style="padding: 4px 6px; text-align: center;">&bull; Proficient &bull;</td>
            </tr>
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 4px 6px; border-right: 1px solid #000000;">Enquiry 5: Bill of Rights &amp; Sovereignty (1688–1689)</td>
              <td style="padding: 4px 6px; text-align: center; border-right: 1px solid #000000; font-weight: 800;">[ &nbsp;&nbsp;&nbsp; / 5 ]</td>
              <td style="padding: 4px 6px; text-align: center; border-right: 1px solid #000000;">4 / 5</td>
              <td style="padding: 4px 6px; text-align: center;">&bull; Proficient &bull;</td>
            </tr>
            <tr style="background: #fbfbfb; font-weight: 900; border-top: 2px solid #000000;">
              <td style="padding: 4px 6px; border-right: 1px solid #000000; text-transform: uppercase;">Cumulative Knowledge Drill Total</td>
              <td style="padding: 4px 6px; text-align: center; border-right: 1px solid #000000; font-size: 8.8pt;">[ &nbsp;&nbsp;&nbsp; / 25 ]</td>
              <td style="padding: 4px 6px; text-align: center; border-right: 1px solid #000000;">20 / 25</td>
              <td style="padding: 4px 6px; text-align: center;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; % ]</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Green Pen DIRT Evidence Gap Fill Lines -->
      <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 5px 8px; background: #ffffff; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.5pt; text-transform: uppercase; color: #000000;">
            Green Pen D.I.R.T. Corrections &amp; Evidence Gap Fill:
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-style: italic; color: #555555; display: block; margin-top: 1px;">
            Select any question answered incorrectly above. Re-write the question and complete factual answer in full sentences below:
          </span>
        </div>
        <div style="display: flex; flex-direction: column; gap: 0; margin-top: 3px;">
          <div class="task-line" style="height: 7.4mm;"></div>
          <div class="task-line" style="height: 7.4mm;"></div>
          <div class="task-line" style="height: 7.4mm;"></div>
          <div class="task-line" style="height: 7.4mm;"></div>
        </div>
      </div>

      ${renderFooterStrip(19, 'Use green pen for DIRT corrections: fixing a mistake immediately permanently wires the correct neural pathway. Plus, teachers love green ink.', 20)}
    </div>
  </div>
`;

  // ====================================================================
  // PAGE 20: OUTSIDE BACK COVER (PROGRESS LEDGER + 5 QR CODES - MEDICINE STYLE)
  // ====================================================================
  html += `
  <!-- PAGE 20: OUTSIDE BACK COVER -->
  <div class="page page-container verso-page" id="page-20" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Back Cover Header Strip -->
      <div style="border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 6px;">
        <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 12pt; color: #000000; text-transform: uppercase; font-weight: 900; letter-spacing: 0.5px;">
          Student Assessment Record &amp; Progress Tracker
        </h2>
      </div>

      <!-- Pupil Details & Target Grade Strip -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 5px 12px; background: #ffffff; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 14px; align-items: center; margin-bottom: 7px;">
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #000000; text-transform: uppercase; margin-right: 8px;">Pupil Name:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #000000; height: 14px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #000000; text-transform: uppercase; margin-right: 8px;">Class:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #000000; height: 14px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #000000; text-transform: uppercase; margin-right: 8px;">Target Grade:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #000000; height: 14px; text-align: center; font-weight: 900;"></div>
        </div>
      </div>

      <!-- 80-Mark Progress Ledger Table -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; overflow: hidden; margin-bottom: 6px;">
        <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif; font-size: 8.2pt;">
          <thead>
            <tr style="background: #000000; color: #ffffff;">
              <th style="padding: 4px 6px; width: 14%; text-align: center; border-right: 1px solid #444444; font-size: 7.8pt;">Date Completed</th>
              <th style="padding: 4px 8px; width: 28%; text-align: left; border-right: 1px solid #444444; font-size: 7.8pt;">Enquiry &bull; Focus</th>
              <th style="padding: 4px 6px; width: 20%; text-align: center; border-right: 1px solid #444444; font-size: 7.8pt;">Q3 Drills [4m]</th>
              <th style="padding: 4px 6px; width: 24%; text-align: center; border-right: 1px solid #444444; font-size: 7.8pt;">Extended Response</th>
              <th style="padding: 4px 6px; width: 14%; text-align: center; font-size: 7.8pt;">Lesson Total</th>
            </tr>
          </thead>
          <tbody>
            ${enquiryConfigs
              .map(
                (cfg) => `
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 6px 6px; border-right: 1px solid #000000; text-align: center;">&nbsp;</td>
              <td style="padding: 6px 8px; border-right: 1px solid #000000;"><strong>Enquiry ${cfg.lessonNum}:</strong> ${cfg.title.split(': ')[1].split(' (')[0]}</td>
              <td style="padding: 6px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Q3 Practice: <span style="font-size: 9.2pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 4</strong> ]</span></td>
              <td style="padding: 6px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Q4 Causal: <span style="font-size: 9.2pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 12</strong> ]</span></td>
              <td style="padding: 6px 6px; text-align: center; font-size: 9.5pt; font-weight: 900;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 16</strong> ]</td>
            </tr>
            `,
              )
              .join('')}
            <tr style="background: #ffffff; font-weight: 900; border-top: 2px solid #000000;">
              <td colspan="2" style="padding: 4px 8px; border-right: 1px solid #000000; text-transform: uppercase; font-size: 8pt;">Cumulative Assessment Totals</td>
              <td style="padding: 6px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Q3 Total: <span style="font-size: 9.5pt; font-weight: 900;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 20</strong> ]</span></td>
              <td style="padding: 6px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Extended: <span style="font-size: 9.5pt; font-weight: 900;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 60</strong> ]</span></td>
              <td style="padding: 6px 6px; text-align: center; font-size: 10pt; font-weight: 900;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 80</strong> ]</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Teacher Feedback Section (WWW & EBI) -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 5px 10px; background: #ffffff; margin-bottom: 6px;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; text-transform: uppercase;">
            Teacher Formative Assessment &bull; Feedback
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 700;">
            Effort: [ 1 &bull; 2 &bull; 3 &bull; 4 &bull; 5 ]
          </span>
        </div>

        <div style="margin-bottom: 4px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.6pt; text-transform: uppercase; display: block; margin-bottom: 2px;">
            What Went Well (WWW):
          </strong>
          <div class="ruled-lines-block">
            <div class="task-line" style="height: 10.8mm;"></div>
            <div class="task-line" style="height: 10.8mm;"></div>
            <div class="task-line" style="height: 10.8mm;"></div>
            <div class="task-line" style="height: 10.8mm;"></div>
          </div>
        </div>

        <div style="margin-bottom: 4px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.6pt; text-transform: uppercase; display: block; margin-bottom: 2px;">
            Even Better If (EBI):
          </strong>
          <div class="ruled-lines-block">
            <div class="task-line" style="height: 10.8mm;"></div>
            <div class="task-line" style="height: 10.8mm;"></div>
            <div class="task-line" style="height: 10.8mm;"></div>
            <div class="task-line" style="height: 10.8mm;"></div>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #000000; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 7.4pt;">
          <span><strong>Teacher Signature:</strong> ____________________________</span>
          <span><strong>Date:</strong> ____________________</span>
        </div>
      </div>

      <!-- Interactive Digital Quizzing Hub (Medicine Style) -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 5px 8px; background: #ffffff;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000000; padding-bottom: 2px; margin-bottom: 4px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; text-transform: uppercase;">
            📱 Interactive Digital Quizzing Hub &bull; Scan for Instant Retrieval Practice
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; border: 1px solid #000000; padding: 0 4px; border-radius: 2px;">
            ONLINE RECALL
          </span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; text-align: center;">
          ${enquiryConfigs
            .map((cfg, idx) => {
              const quizUrl = `https://the-history-revision-hub.netlify.app/?unit=monarchy_religion_power&lesson=${idx}&quiz=true`;
              const qrSvg = generateQrSvg(quizUrl);
              const shortLabels = [
                'Reformation',
                'Middle Way',
                'Armada 1588',
                'Civil War',
                'Bill of Rights',
              ];
              return `
          <div style="border: 1px solid #000000; border-radius: 3px; padding: 3px 2px; background: #ffffff; display: flex; flex-direction: column; align-items: center; justify-content: space-between;">
            <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; margin-bottom: 1px;">
              Enquiry ${cfg.lessonNum}
            </div>
            <div style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 700; color: #333333; margin-bottom: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%;">
              ${shortLabels[idx]}
            </div>
            <div style="width: 21.5mm; height: 21.5mm; margin: 0 auto 2px auto;">
              ${qrSvg}
            </div>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.2pt; font-weight: 700; text-transform: uppercase; background: #000000; color: #ffffff; padding: 1px 5px; border-radius: 2px; margin-bottom: 2px;">
              Scan to Quiz
            </span>
            <div style="font-family: 'Inter', sans-serif; font-size: 8.5pt; font-weight: 900; color: #000000; margin-top: 1px; white-space: nowrap;">
              Best Score: [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 8</strong> ]
            </div>
          </div>
          `;
            })
            .join('')}
        </div>
      </div>

      ${renderFooterStrip(20, 'Unlike King Charles I in 1642, scanning these quiz QR codes will not cost you your throne or your head. Test yourself before the real exam does.', 20)}
    </div>
  </div>
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
    'Rendering 20-Page A4 Pupil Workbook (Medicine Standard): Crown, Church, or Parliament (1517–1689)...',
  );

  const outDir = path.join(ROOT_DIR, 'public', 'units', 'monarchy_religion_power');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const outHtmlPath = path.join(outDir, 'pupil_workbook.html');
  const html = compileMonarchyWorkbook();
  fs.writeFileSync(outHtmlPath, html, 'utf8');
  console.log(`[OK] HTML written to: ${outHtmlPath}`);

  // Compile PDF via Puppeteer
  const pdfDir = path.join(ROOT_DIR, 'public', 'pdfs');
  if (!fs.existsSync(pdfDir)) {
    fs.mkdirSync(pdfDir, { recursive: true });
  }
  const outPdfPath = path.join(pdfDir, 'monarchy_religion_power_pupil_workbook.pdf');

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

  await browser.close();
  console.log(`[OK] PDF successfully compiled: ${outPdfPath}`);
}

if (require.main === module) {
  main().catch((err) => {
    console.error('Fatal error during workbook compilation:', err);
    process.exit(1);
  });
}

module.exports = { compileMonarchyWorkbook };
