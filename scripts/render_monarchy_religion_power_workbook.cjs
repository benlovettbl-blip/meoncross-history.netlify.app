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
// 5 Dedicated Crown, Church, or Parliament Enquiry Configurations
// Medicine 18th-19th Century & CME Standard (Spine Left, Rotating Skills Right)
// ============================================================================
const enquiryConfigs = [
  {
    lessonNum: 1,
    id: 'lesson_1',
    title: 'Enquiry 1: Henry VIII & The English Reformation (1517–1534)',
    enquiryQuestion: 'Why did Henry VIII break with Rome, and how was Royal Supremacy established?',
    specAnchor:
      'Break with Rome; Royal Supremacy; Act of Supremacy (1534); Dynastic and financial causes.',
    stages: [
      {
        step: 1,
        date: '1517–1527',
        questionHeading: 'Why did the royal marriage become an urgent dynastic crisis?',
        bullets: [
          'Catherine of Aragon produced no surviving male heir',
          'Henry VIII feared divine biblical curse (Leviticus 20:21)',
          'Anne Boleyn refused to become a mere royal mistress',
          'Urgent need for uncontested Tudor dynastic succession',
        ],
        focusClue: 'Why was the lack of a male heir seen as a threat of civil war?',
      },
      {
        step: 2,
        date: '1527–1529',
        questionHeading: 'Why did Pope Clement VII refuse Henry’s annulment request?',
        bullets: [
          'Cardinal Wolsey tasked with securing papal annulment in Rome',
          'Imperial sack of Rome (1527) by Emperor Charles V',
          'Pope Clement VII held captive by Charles V (Catherine’s nephew)',
          'Blackfriars legatine court collapsed without verdict (1529)',
        ],
        focusClue: 'Why did European power politics prevent the Pope from granting the annulment?',
      },
      {
        step: 3,
        date: '1529–1532',
        questionHeading: 'How did Thomas Cromwell use Parliament to pressure the Church?',
        bullets: [
          'Wolsey dismissed and stripped of power for praemunire (1529)',
          'Thomas Cromwell proposed breaking legal jurisdiction of Rome',
          'Reformation Parliament summoned; anti-clerical petitions heard',
          'Supplication Against the Ordinaries forced clergy submission',
        ],
        focusClue: 'How did Cromwell weaponise parliamentary statute against the clergy?',
      },
      {
        step: 4,
        date: '1533',
        questionHeading: 'How did the Act in Restraint of Appeals make England an ‘Empire’?',
        bullets: [
          'Thomas Cranmer consecrated as new Archbishop of Canterbury',
          'Cranmer declared Henry’s marriage to Catherine null and void',
          'Anne Boleyn crowned Queen of England in Westminster Abbey',
          'Statute declared: “This realm of England is an Empire” under the King',
        ],
        focusClue: 'What constitutional power did declaring England an ‘Empire’ grant Henry?',
      },
      {
        step: 5,
        date: '1534',
        questionHeading: 'How did the Act of Supremacy legally consolidate royal sovereignty?',
        bullets: [
          'Act of Supremacy confirmed King as “Supreme Head in earth”',
          'All papal taxation, annates, and appeals permanently abolished',
          'Treasons Act (1534) made questioning royal title punishable by death',
          'Sir Thomas More and Bishop John Fisher beheaded for dissent',
        ],
        focusClue: 'How did the Treasons Act extinguish all legal opposition to the Supremacy?',
      },
    ],
    vocabPrompt:
      'Define <strong>Royal Supremacy</strong> and explain how it fundamentally differed from <strong>Papal Authority</strong> in sixteenth-century England:',
    rightPage: {
      type: 'single_12',
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
      timelineMission:
        'Turn to Pages 10–11 (Enquiry 1). In Milestone 1, sketch King Henry VIII sitting on the English throne with the Pope cast down outside England. Add two speech bubbles explaining why Henry claimed Royal Supremacy.',
    },
    leftPageQuip:
      'Remember: In 1534, disagreeing with Henry VIII’s marriage status wasn’t just poor etiquette—it was an immediate date with the executioner at Tower Hill.',
    rightPageQuip:
      'Thomas Cromwell surveyed 800 English monasteries in 1535 and miraculously discovered they all had vast treasure vaults. Coincidence? Absolutely not.',
  },
  {
    lessonNum: 2,
    id: 'lesson_2',
    title: 'Enquiry 2: Elizabeth I & The Middle Way (1558–1588)',
    enquiryQuestion: 'How did Elizabeth I navigate religious divisions through the 1559 Via Media?',
    specAnchor:
      'Elizabethan Religious Settlement (1559); Act of Supremacy; Act of Uniformity; Via Media compromise.',
    stages: [
      {
        step: 1,
        date: '1558–1559',
        questionHeading: 'Why was England religiously fractured upon Elizabeth’s accession?',
        bullets: [
          'Edward VI’s radical Protestantism vs Mary I’s Catholic restoration',
          '280+ Protestants burned at the stake under Mary (Smithfield fires)',
          'Returning Marian exiles demanded radical Calvinist purification',
          'War with France, crown bankruptcy, and constant Catholic threat',
        ],
        focusClue: 'Why did Mary I’s burnings produce profound anti-Catholic fear in England?',
      },
      {
        step: 2,
        date: '1559',
        questionHeading: 'How did the Act of Supremacy restore royal control without alienation?',
        bullets: [
          'Elizabeth dropped Henry VIII’s provocative title of “Supreme Head”',
          'Adopted compromise title of “Supreme Governor” of the Church',
          'Oath of Supremacy required from all clergy and royal officials',
          'All Catholic Marian bishops except one refused and were deprived',
        ],
        focusClue: 'Why was the title “Supreme Governor” a masterstroke of political compromise?',
      },
      {
        step: 3,
        date: '1559',
        questionHeading: 'How did the Act of Uniformity establish the ‘Middle Way’?',
        bullets: [
          '1559 Book of Common Prayer merged 1549 and 1552 communion words',
          'Allowed belief in either spiritual or literal Eucharistic presence',
          'Traditional vestments and church decorations retained for Catholics',
          '12d shilling recusancy fine for failing to attend Sunday service',
        ],
        focusClue: 'Why did Elizabeth claim she had “no desire to make windows into men’s souls”?',
      },
      {
        step: 4,
        date: '1568–1570',
        questionHeading: 'How did Mary Queen of Scots and the Papal Bull shatter stability?',
        bullets: [
          'Mary Queen of Scots fled to England; focal point for Catholic plots',
          'Northern Rebellion (1569) attempted to overthrow Elizabeth',
          'Pope Pius V issued Regnans in Excelsis bull excommunicating Queen',
          'Papal bull ordered English Catholics to depose Elizabeth as heretic',
        ],
        focusClue:
          'How did the 1570 Papal Bull turn private Catholic faith into political treason?',
      },
      {
        step: 5,
        date: '1571–1588',
        questionHeading: 'How did Walsingham’s counter-espionage lead to Mary’s execution?',
        bullets: [
          'Ridolfi (1571) and Throckmorton (1583) plots backed by Spain',
          'Sir Francis Walsingham established codebreaking intelligence network',
          'Babington Plot (1586) intercepted letter proving Mary’s treason',
          'Mary Stuart beheaded at Fotheringhay Castle on 8 February 1587',
        ],
        focusClue:
          'Why was executing an anointed monarch such a terrifying precedent for Elizabeth?',
      },
    ],
    vocabPrompt:
      'Define Elizabeth I’s <strong>Via Media (The Middle Way)</strong> and explain how it sought to reconcile conflicting <strong>Catholic</strong> and <strong>Protestant</strong> doctrines:',
    rightPage: {
      type: 'split',
      partA: {
        tariff: 'Question 3(a): Explain One Difference [4 marks &bull; 5 mins]',
        question:
          'Explain one way in which Elizabeth I’s religious policy in 1559 was different from Mary I’s religious policy (1553–1558). [4 marks]',
        hint: 'Contrast Mary I’s systematic heresy burnings and strict papal obedience with Elizabeth’s compromise on outward conformity without investigating private conscience.',
        stems:
          'One way religious policy differed was... &bull; Under Mary I, religious dissent was punished by... &bull; In contrast, Elizabeth I...',
      },
      partB: {
        tariff: 'Question 3(b): Explain Importance [8 marks &bull; 10 mins]',
        question:
          'Explain the importance of the Elizabethan Religious Settlement (1559) for religious stability in England. [8 marks]',
        structureStrip: [
          {
            col: '1. VIA MEDIA & DEFUSING REBELLION',
            text: 'Explain how the 1559 Prayer Book’s ambiguous Communion wording and traditional vestments allowed moderate Catholics to attend without violating conscience.',
          },
          {
            col: '2. SECURING THE PROTESTANT STATE',
            text: 'Explain how adopting ‘Supreme Governor’ and enforcing 12d recusancy fines established royal control while uniting the nation against foreign Catholic threats.',
          },
        ],
        connectives:
          'This was of paramount importance because... &bull; Specifically, the compromise prevented... &bull; Furthermore, by establishing the Queen as Supreme Governor... &bull; Crucially, this secured stability because...',
        wordBank:
          'Via Media &bull; Act of Supremacy (1559) &bull; Supreme Governor &bull; Act of Uniformity &bull; Book of Common Prayer &bull; Recusancy fines &bull; outward conformity',
      },
      timelineMission:
        'Turn to Pages 10–11 (Enquiry 2). In Milestone 3, sketch Elizabeth holding balancing scales between Catholic ceremonial tradition and Protestant English scripture. Explain why she refused to ‘make windows into men’s souls’.',
    },
    leftPageQuip:
      'Queen Elizabeth I famously said she had ‘no desire to make windows into men’s souls.’ Translation: pay your church fines on Sunday and keep your treason to yourself.',
    rightPageQuip:
      'Elizabeth’s Middle Way was so balanced that both extreme Catholics and extreme Puritans despised it equally. That is the true definition of a successful British compromise.',
  },
  {
    lessonNum: 3,
    id: 'lesson_3',
    title: 'Enquiry 3: The Spanish Armada & Naval Power (1588)',
    enquiryQuestion:
      'Why was Philip II’s Armada defeated, and how did naval strategy transform warfare?',
    specAnchor:
      'Anglo-Spanish rivalry; execution of Mary Queen of Scots (1587); Armada campaign; naval tactics and weather.',
    stages: [
      {
        step: 1,
        date: '1585–1587',
        questionHeading: 'What imperial and religious rivalries provoked Philip II’s invasion?',
        bullets: [
          'Spain Championed Catholic Counter-Reformation across Europe',
          'Drake and English privateers raided Spanish silver fleets in Americas',
          'Treaty of Nonsuch (1585): English troops sent to aid Dutch rebels',
          'Execution of Mary Queen of Scots (1587) triggered Enterprise of England',
        ],
        focusClue: 'Why did Francis Drake’s 1587 raid on Cadiz delay the Armada by a full year?',
      },
      {
        step: 2,
        date: 'July–Aug 1588',
        questionHeading: 'How did the Spanish Armada advance up the English Channel?',
        bullets: [
          '130 warships and 30,000 troops sailed from Lisbon under Medina Sidonia',
          'Strict defensive crescent formation resisted English broadside attacks',
          'Running skirmishes off Plymouth, Portland Bill, and Isle of Wight',
          'English lacked heavy firepower to break the dense Spanish formation',
        ],
        focusClue: 'Why was the crescent formation impenetrable to standoff English naval gunfire?',
      },
      {
        step: 3,
        date: '6–7 August 1588',
        questionHeading: 'How did English fireships break the Spanish formation at Calais?',
        bullets: [
          'Armada anchored off Calais awaiting Duke of Parma’s invasion army',
          'Parma’s troop barges blocked by Dutch flyboat shallow water blockades',
          'Lord Howard and Drake launched 8 blazing pitch-soaked fireships',
          'Spanish panicked, cut anchor cables, and scattered into the night',
        ],
        focusClue: 'Why was cutting anchor cables at Calais a fatal tactical error for the Armada?',
      },
      {
        step: 4,
        date: '8 August 1588',
        questionHeading: 'How did the Battle of Gravelines prove English tactical supremacy?',
        bullets: [
          'Scattered Spanish ships engaged in close-range battle off Gravelines',
          'Hawkins’ race-built galleons sailed faster and loaded cannon rapidly',
          'English culverin long guns battered timber hulls at close range',
          'Three Spanish galleons sank; many others crippled and drifted north',
        ],
        focusClue: 'How did English race-built naval architecture outclass heavy Spanish galleons?',
      },
      {
        step: 5,
        date: 'Aug–Sept 1588',
        questionHeading: 'How did the ‘Protestant Wind’ and severe gales destroy the fleet?',
        bullets: [
          'Fierce south-westerly winds prevented return through English Channel',
          'Armada forced to circumnavigate Scotland and treacherous Irish coast',
          'Over 50 Spanish ships wrecked on rocks; thousands drowned or killed',
          'Fewer than 70 battered vessels limped back to Spain; England survived',
        ],
        focusClue:
          'Why did English propaganda strike commemorative medals declaring “God blew and they were scattered”?',
      },
    ],
    vocabPrompt:
      'Define <strong>Fireships (Hellburners)</strong> and explain how their deployment at Calais disrupted the Spanish Armada:',
    rightPage: {
      type: 'split',
      partA: {
        tariff: 'Question 1: Describe One Feature [4 marks &bull; 5 mins]',
        question:
          'Describe one key feature of the English race-built warships designed by Sir John Hawkins. [4 marks]',
        hint: 'Focus on how English race-built galleons were lower, longer, and faster, carrying long-range culverin cannons that could reload quickly.',
        stems:
          'One key feature of English race-built galleons was... &bull; Specifically, they were designed with... &bull; This gave the English an advantage because...',
      },
      partB: {
        tariff: 'Question 2: Narrative Account [8 marks &bull; 10 mins]',
        question:
          'Write a narrative account analysing the key events of the Spanish Armada campaign in the summer of 1588. [8 marks]',
        stimulus: ['The crescent formation in the Channel', 'The fireships at Calais'],
        structureStrip: [
          {
            col: '1. CHANNEL RUN & CRESCENT',
            text: 'Explain the 130-ship crescent formation sailing up the Channel; running battles off Plymouth and Isle of Wight tested standoff gunnery.',
          },
          {
            col: '2. CALAIS FIRESHIPS & GRAVELINES',
            text: 'Explain Drake’s midnight fireships forcing Spanish captains to cut anchors; English race-built galleons battered scattered ships at Gravelines.',
          },
          {
            col: '3. PROTESTANT WIND & RETREAT',
            text: 'Explain south-westerly gales driving Armada into the North Sea, wrecking over 50 galleons on the treacherous Scottish and Irish coasts.',
          },
        ],
        connectives:
          'The campaign began in July 1588 when... &bull; In response, English warships... &bull; The decisive turning point occurred at Calais when... &bull; Following the fireship chaos, the Battle of Gravelines resulted in... &bull; Finally, ferocious storms...',
        wordBank:
          'Spanish Armada &bull; Medina Sidonia &bull; crescent formation &bull; Calais &bull; fireships (hellburners) &bull; Battle of Gravelines &bull; race-built galleons &bull; culverins &bull; Protestant Wind',
      },
      timelineMission:
        'Turn to Pages 10–11 (Enquiry 3). In Milestone 4, sketch the blazing English fireships drifting into Calais harbour, scattering the Spanish crescent formation into the stormy North Sea.',
    },
    leftPageQuip:
      'The Spanish Armada carried 130 ships, 30,000 soldiers, and hundreds of barrels of holy water. Unfortunately for King Philip II, none of that stopped English fireships.',
    rightPageQuip:
      'King Philip II blamed the loss of his fleet on the weather, claiming he ‘sent ships to fight men, not God’s winds.’ Sir Francis Drake probably disagreed while counting his cannons.',
  },
  {
    lessonNum: 4,
    id: 'lesson_4',
    title: 'Enquiry 4: The English Civil War, Regicide & Bill of Rights (1642–1689)',
    enquiryQuestion:
      'Why did the collision over Divine Right lead to the trial and execution of Charles I?',
    specAnchor:
      'Causes of Civil War; Charles I Personal Rule (1629–40); New Model Army; Trial & Regicide (1649); Bill of Rights (1689).',
    stages: [
      {
        step: 1,
        date: '1629–1640',
        questionHeading: 'Why did Charles I’s ‘Personal Rule’ alienate Parliament and country?',
        bullets: [
          'Charles dissolved Parliament in 1629 for questioning royal power',
          'Ruled 11 years without Parliament using archaic taxes (Ship Money)',
          'John Hampden put on trial (1637) for refusing illegal inland tax',
          'Archbishop Laud enforced Arminian ritual, triggering Scottish Revolt',
        ],
        focusClue:
          'Why did inland Ship Money spark widespread constitutional outrage across England?',
      },
      {
        step: 2,
        date: '1640–1642',
        questionHeading: 'How did the breakdown of trust lead to armed civil conflict?',
        bullets: [
          'Bankruptcy forced Charles to summon Long Parliament in Nov 1640',
          'MPs impeached Laud and executed King’s chief minister Strafford',
          'Charles entered Commons with 400 soldiers to arrest Five Members (1642)',
          'Charles raised royal battle standard at Nottingham on 22 August 1642',
        ],
        focusClue: 'Why did the King entering the Commons with armed soldiers make war inevitable?',
      },
      {
        step: 3,
        date: '1645–1648',
        questionHeading: 'How did the New Model Army defeat the King and radicalise politics?',
        bullets: [
          'Fairfax and Cromwell created New Model Army with merit-based command',
          'Decisive victory at Battle of Naseby (1645) destroyed Royalist forces',
          'Charles surrendered to Scots (1646) but secretly plotted Scottish invasion',
          'Second Civil War (1648) branded Charles a treacherous “man of blood”',
        ],
        focusClue:
          'Why did the Second Civil War convince army officers that Charles had to be punished?',
      },
      {
        step: 4,
        date: 'Dec 1648 – Jan 1649',
        questionHeading: 'Why did Pride’s Purge and the High Court lead to regicide?',
        bullets: [
          'Colonel Pride purged moderate MPs who wished to negotiate with King',
          'Rump Parliament created High Court of Justice to try Charles for treason',
          'Charles refused to enter a plea, arguing no court had authority over king',
          'King Charles I publicly beheaded outside Whitehall Banqueting House (30 Jan)',
        ],
        focusClue:
          'On what constitutional grounds did Charles I refuse to recognize the trial court?',
      },
      {
        step: 5,
        date: '1660–1689',
        questionHeading: 'How did the Glorious Revolution permanently limit royal power?',
        bullets: [
          'Monarchy restored under Charles II (1660) after Cromwell’s Protectorate',
          'James II alienated nation by suspending anti-Catholic laws and packing courts',
          'William of Orange invited by Parliament in 1688; James fled to France',
          '1689 Bill of Rights established parliamentary supremacy and rule of law',
        ],
        focusClue:
          'How did the 1689 Bill of Rights legally end the Stuart doctrine of Divine Right?',
      },
    ],
    vocabPrompt:
      'Define <strong>Constitutional Monarchy</strong> and contrast it with the Stuart doctrine of <strong>The Divine Right of Kings</strong>:',
    rightPage: {
      type: 'single_12',
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
      timelineMission:
        'Turn to Pages 10–11 (Enquiry 4). In Milestone 6, sketch the execution scaffold outside the Banqueting House at Whitehall on 30 January 1649. Add Charles I’s final speech rejecting parliamentary trial authority.',
    },
    leftPageQuip:
      'King Charles I told his trial judges: ‘A King cannot be tried by any superior jurisdiction on earth.’ Three days later, they beheaded him outside his own banqueting hall.',
    rightPageQuip:
      'Oliver Cromwell called the execution of King Charles I a ‘cruel necessity.’ Charles I’s loyal supporters had several rather less polite words for it.',
  },
  {
    lessonNum: 5,
    id: 'lesson_5',
    title: 'Enquiry 5: Synoptic Assessment: Crown, Church, or Parliament?',
    enquiryQuestion:
      'Which turning point decisively transformed the English state between 1517 and 1689?',
    specAnchor:
      'Synoptic evaluation of Royal Supremacy, Civil War, Regicide, and the 1689 Bill of Rights.',
    stages: [
      {
        step: 1,
        date: '1517–1534',
        questionHeading: 'How did Henry VIII reshape sovereign authority in the Reformation?',
        bullets: [
          'Henry broke with Rome to secure Tudor succession and Crown wealth',
          'Act of Supremacy (1534) absorbed spiritual authority into royal crown',
          'Used Parliament to pass statutes, setting a vital constitutional precedent',
          'Dissolution of monasteries created landed gentry invested in Reformation',
        ],
        focusClue: 'Did the break with Rome increase royal prerogative or parliamentary authority?',
      },
      {
        step: 2,
        date: '1559–1588',
        questionHeading: 'How did the Elizabethan settlement forge a Protestant national state?',
        bullets: [
          'Via Media compromise prevented religious civil war seen in Europe',
          'Queen governed as Supreme Governor with broad popular acceptance',
          'Victory against Armada (1588) tied English patriotism to Protestantism',
          'Crown and Parliament worked in mutual alliance against foreign Catholic threat',
        ],
        focusClue: 'How did external threats under Elizabeth cement parliamentary co-operation?',
      },
      {
        step: 3,
        date: '1603–1640',
        questionHeading: 'Why did Stuart claims of Divine Right provoke constitutional crisis?',
        bullets: [
          'James I and Charles I asserted absolute royal prerogative above the law',
          '11 Years’ Personal Rule bypassed Parliament through illegal taxation',
          'Collision between royal prerogative and parliamentary privileges of speech',
          'Religious reforms of Archbishop Laud sparked armed rebellion in Scotland',
        ],
        focusClue: 'Why did Stuart absolutism break down while Tudor compromise had succeeded?',
      },
      {
        step: 4,
        date: '1642–1649',
        questionHeading: 'Why was the trial and execution of Charles I a radical turning point?',
        bullets: [
          'English Civil War pitted Crown against Parliamentary armed forces',
          'New Model Army proved soldiers from lower orders could defeat nobility',
          'Regicide (1649) proved an English monarch was accountable to the law',
          'Abolition of monarchy and House of Lords created radical Commonwealth',
        ],
        focusClue:
          'Why was publicly executing an anointed king the most shocking event in Tudor-Stuart history?',
      },
      {
        step: 5,
        date: '1660–1689',
        questionHeading: 'How did the 1689 Bill of Rights finalize Parliamentary Supremacy?',
        bullets: [
          'Restoration of 1660 failed to resolve royal prerogative vs Parliament',
          'Glorious Revolution (1688) expelled James II without major bloodshed',
          'William and Mary accepted throne strictly upon parliamentary conditions',
          '1689 Bill of Rights: no royal standing army or taxation without Parliament',
        ],
        focusClue:
          'Why does the 1689 Bill of Rights form the bedrock of Britain’s modern democracy?',
      },
    ],
    vocabPrompt:
      'Define <strong>Parliamentary Supremacy</strong> and explain how it was legally secured through the <strong>Bill of Rights (1689)</strong>:',
    rightPage: {
      type: 'split',
      partA: {
        tariff: 'Question 1: Explain One Consequence [4 marks &bull; 5 mins]',
        question:
          'Explain one consequence of the Bill of Rights passed by Parliament in 1689. [4 marks]',
        hint: 'Focus on how the statute permanently abolished the royal suspension of laws and taxation without parliamentary consent, establishing statutory constitutional monarchy.',
        stems:
          'One major consequence was... &bull; Specifically, the Bill of Rights established that... &bull; Consequently, this permanently altered the constitution because...',
      },
      partB: {
        tariff: 'Question 5: Evaluative Judgement [12 marks &bull; 12 mins]',
        question:
          '‘The execution of Charles I in 1649 was the most significant turning point in the struggle between Crown and Parliament.’ How far do you agree? [12 marks]',
        structureStrip: [
          {
            col: '1. REGICIDE & ABOLITION (1649)',
            text: 'Explain how executing Charles I shattered Divine Right and proved Parliament could eliminate the monarchy by military force.',
          },
          {
            col: '2. BILL OF RIGHTS (1689)',
            text: 'Explain how the 1689 settlement created permanent statutory limits on the Crown, ensuring no taxation or standing army without Parliament.',
          },
          {
            col: '3. COMPARATIVE VERDICT',
            text: 'Weigh whether the radical violence of 1649 was more significant than the enduring, peaceful constitutional victory of 1689.',
          },
        ],
        connectives:
          'A compelling argument for 1649 being pivotal is... &bull; On one hand, executing Charles I proved... &bull; However, the 1649 republic collapsed, whereas 1689... &bull; Crucially, the Bill of Rights permanently established... &bull; In conclusion...',
        wordBank:
          'Regicide (1649) &bull; Divine Right of Kings &bull; High Court of Justice &bull; Glorious Revolution (1688) &bull; Bill of Rights (1689) &bull; William and Mary &bull; Constitutional Monarchy &bull; Parliamentary Sovereignty',
      },
      timelineMission:
        'Turn to Pages 10–11 (Enquiry 5). In Milestone 8, sketch King William III and Queen Mary II presenting the signed 1689 Bill of Rights before Parliament, establishing the permanent victory of constitutional law.',
    },
    leftPageQuip:
      'In 1689, King William III signed the Bill of Rights, surrendering absolute taxation powers. He wanted money to fight France; Parliament wanted him under control. Both got their wish.',
    rightPageQuip:
      'By 1689, England had tried absolute monarchy, civil war, military dictatorship, and Dutch invasion. Finally, Parliament decided that writing rules down was the safest option.',
  },
];

// 25 Core Knowledge Recall Questions Gathered for Pages 18–19 (End of booklet!)
const synopticRetrievalBank = [
  // Enquiry 1 (1–5)
  {
    q: 'Which religious leader in Rome held supreme spiritual authority over medieval England?',
    a: 'The Pope (Bishop of Rome)',
  },
  {
    q: 'In which language were all medieval Catholic Bible readings and Church services conducted?',
    a: 'Latin (The Vulgate / Latin Mass)',
  },
  {
    q: 'What German monk sparked the Protestant Reformation in 1517 with his 95 Theses?',
    a: 'Martin Luther',
  },
  {
    q: 'Which Holy Roman Emperor was Catherine of Aragon’s powerful nephew?',
    a: 'Emperor Charles V',
  },
  {
    q: 'Which 1534 parliamentary statute declared Henry VIII the ‘Supreme Head’ of the Church of England?',
    a: 'The Act of Supremacy (1534)',
  },
  // Enquiry 2 (6–10)
  {
    q: 'What royal title did Elizabeth I adopt in the 1559 Act of Supremacy instead of ‘Supreme Head’?',
    a: 'Supreme Governor',
  },
  {
    q: 'What fine was imposed on recusants who refused to attend Sunday services under the Act of Uniformity?',
    a: '12d (One Shilling)',
  },
  {
    q: 'Which Catholic cousin of Elizabeth fled to England in 1568, becoming the focus of Catholic plots?',
    a: 'Mary, Queen of Scots',
  },
  {
    q: 'Which Pope excommunicated Elizabeth I in 1570 with the papal bull Regnans in Excelsis?',
    a: 'Pope Pius V',
  },
  {
    q: 'Who served as Elizabeth I’s spymaster, uncovering the Babington Plot in 1586?',
    a: 'Sir Francis Walsingham',
  },
  // Enquiry 3 (11–15)
  {
    q: 'Which Catholic King of Spain launched the Armada against England in 1588?',
    a: 'King Philip II',
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
    q: 'What popular name was given to the fierce North Sea gales that wrecked Spanish ships?',
    a: 'The Protestant Wind',
  },
  // Enquiry 4 (16–20)
  {
    q: 'What term describes the monarch’s belief that royal power is granted directly by God and cannot be questioned?',
    a: 'The Divine Right of Kings',
  },
  {
    q: 'What controversial coastal tax did Charles I illegally enforce upon inland counties in 1635?',
    a: 'Ship Money',
  },
  {
    q: 'Which decisive 1645 battle destroyed Charles I’s main Royalist field army?',
    a: 'The Battle of Naseby',
  },
  {
    q: 'What military event in December 1648 expelled moderate MPs from Parliament, leaving the Rump?',
    a: 'Pride’s Purge',
  },
  {
    q: 'On what exact date was King Charles I executed outside the Banqueting House at Whitehall?',
    a: '30 January 1649',
  },
  // Enquiry 5 (21–25)
  {
    q: 'Who ruled Britain as Lord Protector during the Commonwealth period (1653–1658)?',
    a: 'Oliver Cromwell',
  },
  {
    q: 'Which Catholic Stuart king was deposed in the Glorious Revolution of 1688?',
    a: 'King James II',
  },
  {
    q: 'Which Dutch prince was invited by Parliament to invade England in 1688?',
    a: 'William of Orange (King William III)',
  },
  {
    q: 'Which foundational 1689 statute ended royal taxation and standing armies without parliamentary consent?',
    a: 'The Bill of Rights (1689)',
  },
  {
    q: 'Which political philosopher wrote Two Treatises of Government justifying the 1688 revolution?',
    a: 'John Locke',
  },
];

function renderFooterStrip(pageNum, quip, totalPages = 20) {
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
// LEFT PAGE RENDERER: 5-STAGE CHRONOLOGICAL INQUIRY SPINE (MEDICINE/CME STYLE)
// ============================================================================
function renderSpinePage(cfg, pageNum) {
  const stagesHtml = cfg.stages
    .map((st) => {
      const bulletsHtml = st.bullets
        .map((b) => `<div><span style="font-weight: 900; color: #000000;">&bull;</span> ${b}</div>`)
        .join('');
      return `
        <div class="spine-stage-row" style="display: flex; flex: 1; min-height: 0; align-items: stretch; margin: 0;">
          <!-- Node Column (38mm Width with Authentic Chronological Question Heading) -->
          <div style="width: 38mm; flex-shrink: 0; border-left: 2.5px solid #000000; padding: 0 4px 0 6px; display: flex; flex-direction: column; justify-content: center; position: relative;">
            <div style="position: absolute; left: -5.5px; top: 50%; transform: translateY(-50%); width: 8px; height: 8px; background: #000000; border-radius: 50%;"></div>
            <div style="display: flex; align-items: center; gap: 3px; margin-bottom: 1px;">
              <span style="background: #000000; color: #ffffff; font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 900; padding: 0.5px 3.5px; border-radius: 2px;">${st.step}</span>
              <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; color: #000000;">${st.date}</span>
            </div>
            <div style="font-family: 'Playfair Display', serif; font-size: 7.2pt; font-weight: 800; color: #000000; line-height: 1.1; margin-bottom: 2px;">
              ${st.questionHeading}
            </div>
            <div style="margin-top: 1px;">
              <div style="display: flex; flex-direction: column; gap: 0.5px; font-family: 'Inter', sans-serif; font-size: 6.3pt; line-height: 1.15; color: #111111;">
                ${bulletsHtml}
              </div>
            </div>
            <div style="margin-top: 2px; border: 1px dashed #000000; background: #f8fafc; padding: 1.5px 3px; border-radius: 2px;">
              <div style="font-family: 'Inter', sans-serif; font-size: 5.2pt; font-weight: 900; text-transform: uppercase; color: #000000; line-height: 1; margin-bottom: 1px;">
                Focus Clue
              </div>
              <div style="font-family: 'Georgia', serif; font-size: 5.8pt; line-height: 1.15; color: #222222; font-style: italic;">
                ${st.focusClue}
              </div>
            </div>
          </div>

          <!-- Ruled Note-Taking Lines (5 Lines per stage • Tighter Line Spacing) -->
          <div style="flex: 1; display: flex; flex-direction: column; border-left: 1px solid #cbd5e1; margin: 0; padding: 0;">
            <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
            <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
            <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
            <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
            <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
          </div>
        </div>`;
    })
    .join('');

  return `
  <!-- LESSON SPREAD: LEFT PAGE (VERSO • CHRONOLOGICAL INQUIRY SPINE) -->
  <div class="page page-container verso-page" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      
      <!-- Lesson Header with Inquiry Question Title -->
      <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 2px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; letter-spacing: 0.5px; text-transform: uppercase; border: 1.2px solid #000000; padding: 1px 6px; border-radius: 2px;">
            ENQUIRY ${cfg.lessonNum} &bull; LESSON NOTEBOOK
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-transform: uppercase; color: #000000;">
            YEAR 8 &bull; CROWN, CHURCH, OR PARLIAMENT? (1517–1689)
          </span>
        </div>
        <h2 style="font-family: 'Playfair Display', serif; font-size: 11pt; color: #000000; margin: 1px 0 1px 0; font-weight: 900; line-height: 1.18;">
          ${cfg.enquiryQuestion}
        </h2>
      </div>

      <!-- Specification Focus Strip -->
      <div style="border: 1px solid #000000; border-left: 3.5px solid #000000; padding: 2px 6px; background: #f8fafc; margin-bottom: 2px; font-family: 'Inter', sans-serif; font-size: 7.4pt; line-height: 1.2;">
        <strong>Core Specification Focus:</strong> ${cfg.specAnchor}
      </div>

      <!-- Chronological Inquiry Spine & Note-Taking Canvas -->
      <div style="flex: 1; display: flex; flex-direction: column; min-height: 0; margin-top: 1px;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid #000000; padding: 1px 0; margin-bottom: 2px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px;">
            Chronological Inquiry Spine &bull; Core Causal Narrative
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-style: italic; color: #444444;">
            Take structured notes alongside each milestone as your teacher narrates the history
          </span>
        </div>

        <div style="display: flex; flex-direction: column; flex: 1; min-height: 0; gap: 0;">
          ${stagesHtml}
        </div>
      </div>

      ${renderFooterStrip(pageNum, cfg.leftPageQuip, 20)}
    </div>
  </div>`;
}

// ============================================================================
// RIGHT PAGE RENDERER: ROTATING DISCIPLINARY SKILLS WRITING (PAGES 3, 5, 7, 9, 13)
// ============================================================================
function renderRightPage(cfg, pageNum) {
  const rp = cfg.rightPage;

  if (rp.type === 'single_12') {
    // 12-MARK CAUSAL WRITING (ENQUIRIES 1 AND 4)
    return `
  <!-- LESSON SPREAD: RIGHT PAGE (RECTO • 12-MARK EXPLAIN WHY) -->
  <div class="page page-container recto-page" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Exam Header -->
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 5px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 11pt; color: #000000; margin: 0; font-weight: 800;">
          ${rp.tariff}
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
          Extended Writing Assessment
        </span>
      </div>

      <!-- Question Stem & Stimulus Box -->
      <div style="border: 1px solid #000000; border-radius: 3px; padding: 5px 8px; background: #ffffff; margin-bottom: 5px;">
        <div style="font-family: 'Playfair Display', serif; font-size: 8.8pt; font-weight: 800; color: #000000; margin-bottom: 3px; line-height: 1.25;">
          ${rp.examStem}
        </div>
        <div style="display: flex; align-items: center; gap: 8px; font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #000000;">
          <strong>Stimulus:</strong>
          <span style="border: 1px solid #000000; padding: 1px 6px; border-radius: 2px; font-weight: 600;">${rp.stimulus[0]}</span>
          <span style="border: 1px solid #000000; padding: 1px 6px; border-radius: 2px; font-weight: 600;">${rp.stimulus[1]}</span>
          <span style="font-style: italic;">(You must also use information of your own)</span>
        </div>
      </div>

      <!-- 3-Column Planning Structure Strip -->
      <div style="margin-bottom: 5px;">
        <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-transform: uppercase; margin-bottom: 2px; border-bottom: 1px solid #000000; padding-bottom: 1px;">
          Structure Strip &bull; 3-Paragraph Analytical Plan
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px;">
          ${rp.structureStrip
            .map(
              (strip) => `
          <div style="border: 1px solid #000000; border-top: 2.5px solid #000000; border-radius: 2px; padding: 3px 5px; background: #ffffff;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7pt; color: #000000; display: block; margin-bottom: 1px;">${strip.col}</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #000000; line-height: 1.2; display: block;">${strip.text}</span>
          </div>`,
            )
            .join('')}
        </div>
      </div>

      <!-- Connectives & Key Vocabulary Bank -->
      <div style="border: 1px solid #000000; border-radius: 3px; padding: 4px 7px; background: #ffffff; margin-bottom: 5px; display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
        <div>
          <strong style="font-family: 'Inter', sans-serif; font-size: 7pt; text-transform: uppercase; display: block;">Analytical Connectives:</strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-style: italic; line-height: 1.2; display: block;">${rp.connectives}</span>
        </div>
        <div>
          <strong style="font-family: 'Inter', sans-serif; font-size: 7pt; text-transform: uppercase; display: block;">Key Vocabulary Bank:</strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; line-height: 1.2; display: block;">${rp.wordBank}</span>
        </div>
      </div>

      <!-- Ruled Task Lines for Extended Writing -->
      <div style="font-family: 'Inter', sans-serif; font-size: 7.1pt; font-style: italic; color: #222222; margin-bottom: 2px;">
        <strong>Task:</strong> Using the structure strip above, write your analytical response below:
      </div>
      <div style="display: flex; flex-direction: column; gap: 0; margin-bottom: 5px; flex: 1; justify-content: space-between;">
        <div class="task-line" style="height: 9.8mm;"></div>
        <div class="task-line" style="height: 9.8mm;"></div>
        <div class="task-line" style="height: 9.8mm;"></div>
        <div class="task-line" style="height: 9.8mm;"></div>
        <div class="task-line" style="height: 9.8mm;"></div>
        <div class="task-line" style="height: 9.8mm;"></div>
        <div class="task-line" style="height: 9.8mm;"></div>
        <div class="task-line" style="height: 9.8mm;"></div>
        <div class="task-line" style="height: 9.8mm;"></div>
        <div class="task-line" style="height: 9.8mm;"></div>
        <div class="task-line" style="height: 9.8mm;"></div>
        <div class="task-line" style="height: 9.8mm;"></div>
        <div class="task-line" style="height: 9.8mm;"></div>
      </div>

      <!-- Timeline Mission Box -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 4px 8px; background: #ffffff; display: flex; justify-content: space-between; align-items: center; margin-top: 2px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; background: #000000; color: #ffffff; padding: 2px 6px; border-radius: 2px; text-transform: uppercase; white-space: nowrap;">
            Timeline Mission
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.3pt; color: #000000; line-height: 1.2;">
            ${rp.timelineMission}
          </span>
        </div>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; white-space: nowrap; margin-left: 8px;">
          &rarr; Pages 10–11
        </span>
      </div>

      ${renderFooterStrip(pageNum, cfg.rightPageQuip, 20)}
    </div>
  </div>`;
  } else {
    // TWO-PART ROTATING SKILLS WRITING (ENQUIRIES 2, 3, AND 5)
    return `
  <!-- LESSON SPREAD: RIGHT PAGE (RECTO • ROTATING DISCIPLINARY SKILLS) -->
  <div class="page page-container recto-page" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      
      <!-- PART A: SHORT-FORM DISCIPLINARY PRACTICE [4 MARKS] -->
      <div style="border-bottom: 1.5px solid #000000; padding-bottom: 4px; margin-bottom: 5px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 3px;">
          <h2 style="font-family: 'Playfair Display', serif; font-size: 10pt; color: #000000; margin: 0; font-weight: 800;">
            ${rp.partA.tariff}
          </h2>
          <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 700; border: 1px solid #000000; padding: 0 4px; border-radius: 2px;">
            DISCIPLINARY DRILL
          </span>
        </div>
        <p style="font-family: 'Playfair Display', serif; font-size: 8.2pt; font-weight: 800; color: #000000; margin: 0 0 2px 0;">
          ${rp.partA.question}
        </p>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.1pt; font-style: italic; color: #333333; margin-bottom: 2px;">
          <strong>Hint:</strong> ${rp.partA.hint}
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.1pt; font-weight: 700; margin-bottom: 2px;">
          <strong>Sentence Stems:</strong> ${rp.partA.stems}
        </div>
        <div class="ruled-lines-block">
          <div class="task-line" style="height: 8.6mm;"></div>
          <div class="task-line" style="height: 8.6mm;"></div>
          <div class="task-line" style="height: 8.6mm;"></div>
          <div class="task-line" style="height: 8.6mm;"></div>
        </div>
      </div>

      <!-- PART B: EXTENDED SKILL WRITING [8 OR 12 MARKS] -->
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0;">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1.5px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
            <h2 style="font-family: 'Playfair Display', serif; font-size: 10pt; color: #000000; margin: 0; font-weight: 800;">
              ${rp.partB.tariff}
            </h2>
            <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 700; text-transform: uppercase;">
              STRUCTURED WRITING
            </span>
          </div>
          <p style="font-family: 'Playfair Display', serif; font-size: 8.4pt; font-weight: 800; color: #000000; margin: 0 0 3px 0; line-height: 1.25;">
            ${rp.partB.question}
          </p>
          ${
            rp.partB.stimulus
              ? `
          <div style="display: flex; align-items: center; gap: 6px; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #000000; margin-bottom: 3px;">
            <strong>Stimulus:</strong>
            <span style="border: 1px solid #000000; padding: 0.5px 5px; border-radius: 2px; font-weight: 600;">${rp.partB.stimulus[0]}</span>
            <span style="border: 1px solid #000000; padding: 0.5px 5px; border-radius: 2px; font-weight: 600;">${rp.partB.stimulus[1]}</span>
          </div>`
              : ''
          }

          <!-- Structure Strip -->
          <div style="display: grid; grid-template-columns: repeat(${rp.partB.structureStrip.length}, 1fr); gap: 5px; margin-bottom: 4px;">
            ${rp.partB.structureStrip
              .map(
                (strip) => `
            <div style="border: 1px solid #000000; border-top: 2.2px solid #000000; border-radius: 2px; padding: 2px 4px; background: #ffffff;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #000000; display: block; margin-bottom: 1px;">${strip.col}</strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #000000; line-height: 1.18; display: block;">${strip.text}</span>
            </div>`,
              )
              .join('')}
          </div>

          <!-- Connectives & Word Bank -->
          <div style="border: 1px solid #000000; border-radius: 3px; padding: 3px 6px; background: #ffffff; margin-bottom: 4px; font-family: 'Inter', sans-serif; font-size: 6.6pt; line-height: 1.2;">
            <div><strong>Connectives:</strong> <em>${rp.partB.connectives}</em></div>
            <div style="margin-top: 1px;"><strong>Key Terms:</strong> ${rp.partB.wordBank}</div>
          </div>
        </div>

        <!-- Ruled Writing Lines -->
        <div style="display: flex; flex-direction: column; gap: 0; margin-bottom: 4px; flex: 1; justify-content: space-between;">
          <div class="task-line" style="height: 9.4mm;"></div>
          <div class="task-line" style="height: 9.4mm;"></div>
          <div class="task-line" style="height: 9.4mm;"></div>
          <div class="task-line" style="height: 9.4mm;"></div>
          <div class="task-line" style="height: 9.4mm;"></div>
          <div class="task-line" style="height: 9.4mm;"></div>
          <div class="task-line" style="height: 9.4mm;"></div>
        </div>

        <!-- Timeline Mission Box -->
        <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 4px 8px; background: #ffffff; display: flex; justify-content: space-between; align-items: center; margin-top: 2px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; background: #000000; color: #ffffff; padding: 2px 6px; border-radius: 2px; text-transform: uppercase; white-space: nowrap;">
              Timeline Mission
            </span>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.3pt; color: #000000; line-height: 1.2;">
              ${rp.timelineMission}
            </span>
          </div>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; white-space: nowrap; margin-left: 8px;">
            &rarr; Pages 10–11
          </span>
        </div>
      </div>

      ${renderFooterStrip(pageNum, cfg.rightPageQuip, 20)}
    </div>
  </div>`;
  }
}

// ============================================================================
// MAIN COMPILATION FUNCTION
// ============================================================================
function compileMonarchyWorkbook() {
  const coverImgBase64 =
    getBase64Image('images/henry_viii.jpg') || getBase64Image('public/images/henry_viii.jpg') || '';

  const linedRows15 = Array.from({ length: 28 }, (_, idx) => {
    const isFirst = idx === 0;
    const marginContent = isFirst
      ? `<span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #555555; text-transform: uppercase; font-weight: 700;">Margin</span>`
      : `&nbsp;`;
    const linePrompt = isFirst
      ? `<span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-style: italic; color: #777777;">[ Extended Essay Response &bull; Write your thesis, evidence, and analytical evaluation below ]</span>`
      : `&nbsp;`;
    return `
      <div class="lined-row">
        <div class="lined-margin-cell">${marginContent}</div>
        <div class="lined-content-cell">${linePrompt}</div>
      </div>`;
  }).join('');

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

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Crown, Church, or Parliament (1517–1689) Pupil Workbook</title>
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
      height: 8.4mm;
      width: 100%;
      box-sizing: border-box;
      margin: 0;
    }
    .task-line-dotted {
      border-bottom: 1.2px dotted #000000;
      height: 7.2mm;
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
      width: 12mm;
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
      border-top: 0.5px solid #000000;
      padding-top: 1.5px;
      margin-top: 2px;
      font-family: 'Inter', sans-serif;
      font-size: 6.4pt;
      line-height: 1.15;
      color: #000000;
    }
    .footer-quip {
      font-style: italic;
      color: #000000;
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
            2. Disciplinary Drills [4m/8m]
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 6.8pt; line-height: 1.2; color: #222222; margin-top: 1px;">
            Rotating skills: explain differences, features, and historical importance. Specific factual evidence + comparison (5–10 mins).
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
  // PAGES 2–9: THE FIRST 4 ENQUIRIES (MEDICINE/CME STYLE: SPINE LEFT, SKILLS RIGHT)
  // ====================================================================
  for (let i = 0; i < 4; i++) {
    const cfg = enquiryConfigs[i];
    const leftPageNum = i * 2 + 2;
    const rightPageNum = i * 2 + 3;

    // LEFT PAGE (VERSO): CHRONOLOGICAL INQUIRY SPINE WITH QUESTION HEADINGS
    html += renderSpinePage(cfg, leftPageNum);

    // RIGHT PAGE (RECTO): ROTATING SKILLS WRITING WITH STRUCTURE STRIP & TIMELINE MISSION
    html += renderRightPage(cfg, rightPageNum);
  }

  // ====================================================================
  // PAGES 10–11: THE LIVING TIMELINE IN THE EXACT MIDDLE OF BOOKLET!
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
          <strong>Living Timeline Protocol:</strong> Complete each milestone sketchpad using dual-coding (combining visual symbols, causal arrows, and dates) to master the chronological spine across the centre-fold.
        </div>
      </div>

      <!-- 4 Milestones with Large Blank Dual-Coding Workspace -->
      <div style="display: flex; flex-direction: column; gap: 6px; flex: 1; justify-content: space-between;">
        
        <!-- Milestone 1: 1534 -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #000000;">
                1534 &bull; Henry VIII &amp; The Act of Supremacy
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Enquiry 1</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.22;">
              Parliament passes the Act of Supremacy, declaring Henry VIII ‘Supreme Head’ of the Church of England, legally ending papal authority and redirecting Church tithes to the Crown.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 38mm; flex: 1; background: #ffffff; margin-top: 2px; padding: 3px 5px 2px 5px; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; font-family: 'Inter', sans-serif; font-size: 6.8pt; border-bottom: 0.5px dashed #000000; padding-bottom: 2px;">
              <span><strong style="text-transform: uppercase; color: #000000;">Milestone 1 Sketchpad:</strong> <span style="font-style: italic; color: #222222;">Dual-code Henry VIII on the throne severing the Pope’s papal ties with England; annotate Royal Supremacy.</span></span>
              <span style="font-size: 6pt; color: #555555; font-weight: 700; text-transform: uppercase;">Dual-Coding</span>
            </div>
            <div style="flex: 1;"></div>
          </div>
        </div>

        <!-- Milestone 2: 1536–1540 -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #000000;">
                1536–1540 &bull; Dissolution of the Monasteries
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Enquiry 1</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.22;">
              Thomas Cromwell surveys monastic wealth (Valor Ecclesiasticus); over 800 monasteries are closed, confiscating lead, gold, and lands to fund royal coastal fortifications.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 38mm; flex: 1; background: #ffffff; margin-top: 2px; padding: 3px 5px 2px 5px; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; font-family: 'Inter', sans-serif; font-size: 6.8pt; border-bottom: 0.5px dashed #000000; padding-bottom: 2px;">
              <span><strong style="text-transform: uppercase; color: #000000;">Milestone 2 Sketchpad:</strong> <span style="font-style: italic; color: #222222;">Dual-code a ruined monastery, confiscated gold church chests, and newly fortified Tudor coastal castles.</span></span>
              <span style="font-size: 6pt; color: #555555; font-weight: 700; text-transform: uppercase;">Dual-Coding</span>
            </div>
            <div style="flex: 1;"></div>
          </div>
        </div>

        <!-- Milestone 3: 1559 -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #000000;">
                1559 &bull; Elizabeth I &amp; The Religious Settlement
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Enquiry 2</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.22;">
              The Acts of Supremacy and Uniformity establish the Via Media (‘Middle Way’), making Elizabeth ‘Supreme Governor’ and enforcing the 1559 Book of Common Prayer.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 38mm; flex: 1; background: #ffffff; margin-top: 2px; padding: 3px 5px 2px 5px; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; font-family: 'Inter', sans-serif; font-size: 6.8pt; border-bottom: 0.5px dashed #000000; padding-bottom: 2px;">
              <span><strong style="text-transform: uppercase; color: #000000;">Milestone 3 Sketchpad:</strong> <span style="font-style: italic; color: #222222;">Dual-code balancing scales between Catholic ceremonial tradition and Protestant English scripture.</span></span>
              <span style="font-size: 6pt; color: #555555; font-weight: 700; text-transform: uppercase;">Dual-Coding</span>
            </div>
            <div style="flex: 1;"></div>
          </div>
        </div>

        <!-- Milestone 4: 1588 -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #000000;">
                1588 &bull; Defeat of the Spanish Armada
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Enquiry 3</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.22;">
              English fireships scatter King Philip II’s 130-ship Armada off Calais; broadside cannons and fierce North Sea gales destroy Spanish hopes of restoring Catholicism.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 38mm; flex: 1; background: #ffffff; margin-top: 2px; padding: 3px 5px 2px 5px; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; font-family: 'Inter', sans-serif; font-size: 6.8pt; border-bottom: 0.5px dashed #000000; padding-bottom: 2px;">
              <span><strong style="text-transform: uppercase; color: #000000;">Milestone 4 Sketchpad:</strong> <span style="font-style: italic; color: #222222;">Dual-code fireships scattering the Spanish crescent at Calais, followed by storms in the North Sea.</span></span>
              <span style="font-size: 6pt; color: #555555; font-weight: 700; text-transform: uppercase;">Dual-Coding</span>
            </div>
            <div style="flex: 1;"></div>
          </div>
        </div>

      </div>

      ${renderFooterStrip(10, 'Centrefold timeline: Dual-coding visual symbols alongside dates and causal links turns raw historical narrative into permanent long-term memory.', 20)}
    </div>
  </div>

  <!-- PAGE 11: LIVING TIMELINE PART 2 (MILESTONES 5–8) -->
  <div class="page page-container recto-page" id="page-11" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div>
        <div style="border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 6px;">
          <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 11pt; color: #000000; text-transform: uppercase; font-weight: 800;">
            Living Timeline &bull; Part 2: Civil War, Regicide &amp; The Bill of Rights (1603–1689)
          </h2>
        </div>

        <div style="border-bottom: 1px solid #000000; padding-bottom: 4px; margin-bottom: 8px; font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #000000;">
          <strong>Living Timeline Protocol:</strong> Complete each milestone sketchpad using dual-coding (combining visual symbols, causal arrows, and dates) to master the chronological spine across the centre-fold.
        </div>
      </div>

      <!-- 4 Milestones with Large Blank Dual-Coding Workspace -->
      <div style="display: flex; flex-direction: column; gap: 6px; flex: 1; justify-content: space-between;">
        
        <!-- Milestone 5: 1629–1640 -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #000000;">
                1629–1640 &bull; Charles I’s ‘Personal Rule’ &amp; Ship Money
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Enquiry 4</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.22;">
              Charles I rules without Parliament for eleven years, raising unparliamentary funds through Ship Money; John Hampden’s refusal to pay sparks nationwide tax resistance.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 38mm; flex: 1; background: #ffffff; margin-top: 2px; padding: 3px 5px 2px 5px; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; font-family: 'Inter', sans-serif; font-size: 6.8pt; border-bottom: 0.5px dashed #000000; padding-bottom: 2px;">
              <span><strong style="text-transform: uppercase; color: #000000;">Milestone 5 Sketchpad:</strong> <span style="font-style: italic; color: #222222;">Dual-code a padlock on the doors of Parliament, a coastal tax collector in inland towns, and Hampden’s protest.</span></span>
              <span style="font-size: 6pt; color: #555555; font-weight: 700; text-transform: uppercase;">Dual-Coding</span>
            </div>
            <div style="flex: 1;"></div>
          </div>
        </div>

        <!-- Milestone 6: 1649 -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #000000;">
                1649 &bull; Trial &amp; Execution of King Charles I
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Enquiry 4</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.22;">
              Pride’s Purge clears moderate MPs; the Rump Parliament convicts Charles I of high treason as a ‘tyrant, traitor, and murderer’; the King is beheaded on 30 January 1649.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 38mm; flex: 1; background: #ffffff; margin-top: 2px; padding: 3px 5px 2px 5px; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; font-family: 'Inter', sans-serif; font-size: 6.8pt; border-bottom: 0.5px dashed #000000; padding-bottom: 2px;">
              <span><strong style="text-transform: uppercase; color: #000000;">Milestone 6 Sketchpad:</strong> <span style="font-style: italic; color: #222222;">Dual-code the scaffold outside Whitehall Banqueting House, the executioner’s axe, and Charles’s fallen crown.</span></span>
              <span style="font-size: 6pt; color: #555555; font-weight: 700; text-transform: uppercase;">Dual-Coding</span>
            </div>
            <div style="flex: 1;"></div>
          </div>
        </div>

        <!-- Milestone 7: 1688 -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #000000;">
                1688 &bull; The Glorious Revolution
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Enquiry 5</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.22;">
              Fearing a permanent Catholic dynasty under James II, seven prominent peers invite Dutch Prince William of Orange; James flees and William lands with 15,000 troops.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 38mm; flex: 1; background: #ffffff; margin-top: 2px; padding: 3px 5px 2px 5px; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; font-family: 'Inter', sans-serif; font-size: 6.8pt; border-bottom: 0.5px dashed #000000; padding-bottom: 2px;">
              <span><strong style="text-transform: uppercase; color: #000000;">Milestone 7 Sketchpad:</strong> <span style="font-style: italic; color: #222222;">Dual-code William of Orange landing at Torbay under Protestant banners while James II flees across the Thames.</span></span>
              <span style="font-size: 6pt; color: #555555; font-weight: 700; text-transform: uppercase;">Dual-Coding</span>
            </div>
            <div style="flex: 1;"></div>
          </div>
        </div>

        <!-- Milestone 8: 1689 -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #000000;">
                1689 &bull; The Bill of Rights &amp; Constitutional Monarchy
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Enquiry 5</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.22;">
              William III and Mary II accept the Crown subject to the Bill of Rights, establishing that the King cannot raise taxes, suspend laws, or keep a standing army without Parliament.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 38mm; flex: 1; background: #ffffff; margin-top: 2px; padding: 3px 5px 2px 5px; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; font-family: 'Inter', sans-serif; font-size: 6.8pt; border-bottom: 0.5px dashed #000000; padding-bottom: 2px;">
              <span><strong style="text-transform: uppercase; color: #000000;">Milestone 8 Sketchpad:</strong> <span style="font-style: italic; color: #222222;">Dual-code the Crown placed on top of the statutory Bill of Rights, symbolizing constitutional supremacy.</span></span>
              <span style="font-size: 6pt; color: #555555; font-weight: 700; text-transform: uppercase;">Dual-Coding</span>
            </div>
            <div style="flex: 1;"></div>
          </div>
        </div>

      </div>

      ${renderFooterStrip(11, 'Notice how the 1689 Bill of Rights completed what the 1534 Act of Supremacy began: Parliament went from Henry VIII’s legal weapon to the supreme master of the Crown.', 20)}
    </div>
  </div>
`;

  // ====================================================================
  // PAGES 12–13: ENQUIRY 5 (SPINE LEFT, SKILLS RIGHT)
  // ====================================================================
  const cfg5 = enquiryConfigs[4];
  // LEFT PAGE (VERSO): CHRONOLOGICAL INQUIRY SPINE WITH QUESTION HEADINGS
  html += renderSpinePage(cfg5, 12);

  // RIGHT PAGE (RECTO): ROTATING SKILLS WRITING (CONSEQUENCE + EVALUATIVE STATEMENT)
  html += renderRightPage(cfg5, 13);

  // ====================================================================
  // PAGES 14–15: SYNOPTIC ESSAY SPREAD (MEDICINE STYLE)
  // ====================================================================
  html += `
  <!-- PAGE 14: SYNOPTIC ESSAY BLUEPRINT & COMPARATIVE EVALUATION MATRIX -->
  <div class="page page-container verso-page" id="page-14" style="padding: 4mm 6mm;">
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
  <div class="page page-container recto-page" id="page-15" style="padding: 4mm 6mm;">
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
  html += `
  <!-- PAGE 16: KEY HISTORICAL FIGURES & HISTORIOGRAPHICAL DEBATE -->
  <div class="page page-container verso-page" id="page-16" style="padding: 4mm 6mm;">
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
  <div class="page page-container recto-page" id="page-17" style="padding: 4mm 6mm;">
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
  // PAGES 18–19: 25-QUESTION RETRIEVAL BANK & DIRT SCOREBOARD (END OF BOOKLET!)
  // ====================================================================
  html += `
  <!-- PAGE 18: 25-QUESTION MASTER RETRIEVAL DRILL BANK -->
  <div class="page page-container verso-page" id="page-18" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 6px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 11pt; color: #000000; margin: 0; font-weight: 800;">
          Synoptic Knowledge Retrieval Bank &bull; 25 Core Recall Questions
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
          Total Score: [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 25 ]
        </span>
      </div>

      <div style="display: flex; flex-direction: column; gap: 5px; flex: 1; justify-content: space-between;">
        ${enquiryConfigs
          .map((cfg, cIdx) => {
            const questions = synopticRetrievalBank.slice(cIdx * 5, cIdx * 5 + 5);
            return `
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
            ${questions
              .map(
                (item, qIdx) => `
            <div>
              <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; color: #000000; line-height: 1.15;">
                ${cIdx * 5 + qIdx + 1}. ${item.q}
              </div>
              <div class="task-line-dotted" style="height: 6.2mm;"></div>
            </div>`,
              )
              .join('')}
          </div>
        </div>`;
          })
          .join('')}
      </div>

      ${renderFooterStrip(18, 'Knowledge retrieval is like fencing: practice the basic thrust twenty times until your wrist doesn’t have to think about it in the middle of the duel.', 20)}
    </div>
  </div>

  <!-- PAGE 19: COMPLETE ANSWER KEY & GAMIFIED DIRT SCOREBOARD -->
  <div class="page page-container recto-page" id="page-19" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 6px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 11pt; color: #000000; margin: 0; font-weight: 800;">
          Retrieval Drill Complete Model Answer Key &amp; DIRT Tracker
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
          Self / Peer Assessment
        </span>
      </div>

      <!-- Gamified DIRT Mastery Scoreboard -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 5px 10px; background: #ffffff; display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
        <div style="display: flex; align-items: baseline; gap: 6px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; text-transform: uppercase;">
            DIRT Retrieval Score:
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 11pt; font-weight: 900; border: 1.5px solid #000000; padding: 1px 10px; border-radius: 3px; background: #ffffff;">
            [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 25</strong> ]
          </span>
        </div>
        <div style="display: flex; gap: 6px; font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800;">
          <span style="border: 1px solid #000000; padding: 2px 6px; border-radius: 3px; background: #000000; color: #ffffff;">23–25: MASTER</span>
          <span style="border: 1px solid #000000; padding: 2px 6px; border-radius: 3px;">19–22: SECURE</span>
          <span style="border: 1px solid #000000; padding: 2px 6px; border-radius: 3px;">14–18: DEVELOPING</span>
          <span style="border: 1px solid #000000; padding: 2px 6px; border-radius: 3px; font-style: italic;">&lt;14: REVISION NEEDED</span>
        </div>
      </div>

      <!-- 25 Complete Answers in 5 Structured Enquiry Blocks -->
      <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 6px 10px; background: #ffffff; margin-bottom: 6px;">
        <div style="font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 900; text-transform: uppercase; border-bottom: 1px solid #000000; padding-bottom: 2.5px; margin-bottom: 4px;">
          Official Model Answer Key (Enquiries 1 to 5)
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px 16px; font-family: 'Inter', sans-serif; font-size: 7.2pt; line-height: 1.25;">
          <div>
            ${synopticRetrievalBank
              .slice(0, 13)
              .map(
                (item, idx) => `
            <div style="margin-bottom: 2.5px;">
              <strong>${idx + 1}.</strong> ${item.a}
            </div>`,
              )
              .join('')}
          </div>
          <div>
            ${synopticRetrievalBank
              .slice(13)
              .map(
                (item, idx) => `
            <div style="margin-bottom: 2.5px;">
              <strong>${idx + 14}.</strong> ${item.a}
            </div>`,
              )
              .join('')}
          </div>
        </div>
      </div>

      <!-- DIRT Green Pen Reflection & Correction Box -->
      <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 5px 10px; background: #fbfbfb; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; text-transform: uppercase;">
            DIRT Protocol: Green Pen Knowledge Correction
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-style: italic;">
            Write out the full corrections for any incorrect recall answers below:
          </span>
        </div>
        <div class="ruled-lines-block" style="flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div class="task-line" style="height: 8.6mm;"></div>
          <div class="task-line" style="height: 8.6mm;"></div>
          <div class="task-line" style="height: 8.6mm;"></div>
          <div class="task-line" style="height: 8.6mm;"></div>
          <div class="task-line" style="height: 8.6mm;"></div>
          <div class="task-line" style="height: 8.6mm;"></div>
          <div class="task-line" style="height: 8.6mm;"></div>
          <div class="task-line" style="height: 8.6mm;"></div>
          <div class="task-line" style="height: 8.6mm;"></div>
          <div class="task-line" style="height: 8.6mm;"></div>
          <div class="task-line" style="height: 8.6mm;"></div>
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
              <th style="padding: 4px 6px; width: 20%; text-align: center; border-right: 1px solid #444444; font-size: 7.8pt;">Drills / Skills</th>
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
              <td style="padding: 6px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Skills: <span style="font-size: 9.2pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 4</strong> ]</span></td>
              <td style="padding: 6px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Writing: <span style="font-size: 9.2pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 12</strong> ]</span></td>
              <td style="padding: 6px 6px; text-align: center; font-size: 9.5pt; font-weight: 900;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 16</strong> ]</td>
            </tr>`,
              )
              .join('')}
            <tr style="background: #ffffff; font-weight: 900; border-top: 2px solid #000000;">
              <td colspan="2" style="padding: 4px 8px; border-right: 1px solid #000000; text-transform: uppercase; font-size: 8pt;">Cumulative Assessment Totals</td>
              <td style="padding: 6px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Drills: <span style="font-size: 9.5pt; font-weight: 900;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 20</strong> ]</span></td>
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
          </div>`;
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
    'Rendering 20-Page A4 Pupil Workbook (Medicine/CME Standard): Crown, Church, or Parliament (1517–1689)...',
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
