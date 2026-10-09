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
          'Catherine of Aragon had no surviving male heir to secure the Tudor succession',
          'Henry VIII feared a divine curse from God, citing Leviticus 20:21',
          'Anne Boleyn refused to be a royal mistress, demanding legitimate marriage',
        ],
        focusClue:
          'Why did Henry believe that without a son, England would collapse into civil war?',
      },
      {
        step: 2,
        date: '1527–1529',
        questionHeading: 'Why did Pope Clement VII refuse Henry’s annulment request?',
        bullets: [
          'Cardinal Wolsey failed to secure a papal annulment from Rome',
          'In 1527, Charles V sacked Rome and held Pope Clement captive',
          'Charles V was Catherine’s nephew, blocking any divorce from Henry',
        ],
        focusClue: 'Why did European power politics prevent the Pope from granting the annulment?',
      },
      {
        step: 3,
        date: '1529–1532',
        questionHeading: 'How did Thomas Cromwell use Parliament to pressure the Church?',
        bullets: [
          'Thomas Cromwell advised Henry to break England from the legal power of Rome',
          'Reformation Parliament passed laws attacking church abuses and clergy privileges',
          'In 1532, English bishops surrendered their independence to the King',
        ],
        focusClue:
          'How did using Acts of Parliament give Henry’s religious changes the force of law?',
      },
      {
        step: 4,
        date: '1533',
        questionHeading: 'How did the Act in Restraint of Appeals make England an ‘Empire’?',
        bullets: [
          '1533 statute declared: ‘This realm of England is an Empire’ under the King alone',
          'Banned all English legal and religious appeals to the Pope in Rome',
          'Archbishop Cranmer annulled Henry’s marriage; Anne Boleyn crowned Queen',
        ],
        focusClue: 'What constitutional power did declaring England an ‘Empire’ grant Henry?',
      },
      {
        step: 5,
        date: '1534',
        questionHeading: 'How did the Act of Supremacy legally consolidate royal sovereignty?',
        bullets: [
          '1534 Act of Supremacy declared Henry the ‘Supreme Head’ of the Church of England',
          'Treason Act made denying the King’s supremacy punishable by public execution',
          'Sir Thomas More and Bishop Fisher were beheaded for refusing the oath',
        ],
        focusClue:
          'Why was the Act of Supremacy the most radical constitutional change in English history?',
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
      'In 1534, questioning Henry VIII’s marriage was high treason punishable by death at Tower Hill.',
    rightPageQuip:
      'Thomas Cromwell surveyed 800 monasteries in 1535 and conveniently discovered vast riches. Coincidence? Absolutely not.',
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
        questionHeading: 'Why was England religiously fractured when Elizabeth became Queen?',
        bullets: [
          'Violent religious swings under Edward VI (Protestant) and Mary I (Catholic)',
          'Over 280 Protestants burned at the stake under Mary I, sparking deep anti-Catholic fear',
          'Returning Protestant exiles demanded radical reform, while Catholics held the north',
        ],
        focusClue: 'Why did Mary I’s burnings produce profound anti-Catholic fear across England?',
      },
      {
        step: 2,
        date: '1559',
        questionHeading: 'How did the Act of Supremacy restore royal control through compromise?',
        bullets: [
          'Elizabeth dropped Henry VIII’s title of ‘Supreme Head’ to avoid offending Catholics',
          'Adopted the compromise title of ‘Supreme Governor’ of the Church of England',
          'All clergy took an Oath of Supremacy; all but one Catholic bishop refused and were dismissed',
        ],
        focusClue:
          'Why was the title ‘Supreme Governor’ a clever compromise for moderate subjects?',
      },
      {
        step: 3,
        date: '1559',
        questionHeading: 'How did the Act of Uniformity establish the ‘Middle Way’ (Via Media)?',
        bullets: [
          'Set up a single national church using the 1559 English Book of Common Prayer',
          'Communion wording was kept ambiguous so Protestants and Catholics could accept it',
          'Compulsory church attendance; recusants who stayed away paid a 12d shilling fine',
        ],
        focusClue:
          'Why did Elizabeth state that she had ‘no desire to make windows into men’s souls’?',
      },
      {
        step: 4,
        date: '1568–1570',
        questionHeading: 'How did Mary Queen of Scots and the Papal Bull spark Catholic plots?',
        bullets: [
          'In 1568, Catholic cousin Mary Queen of Scots fled to England and became a rival figurehead',
          'Northern Catholic Earls rebelled in 1569, attempting to overthrow Elizabeth and free Mary',
          'In 1570, Pope Pius V excommunicated Elizabeth, ordering Catholics to depose her',
        ],
        focusClue: 'How did the 1570 Papal Bull turn practicing Catholics into suspected traitors?',
      },
      {
        step: 5,
        date: '1571–1588',
        questionHeading: 'How did Walsingham’s spy network lead to Mary’s execution?',
        bullets: [
          'Sir Francis Walsingham built a network of spies and codebreakers to uncover Catholic plots',
          'Babington Plot (1586) intercepted letter proving Mary agreed to assassinate Elizabeth',
          'Elizabeth reluctantly signed the death warrant; Mary was beheaded in February 1587',
        ],
        focusClue: 'Why was executing an anointed queen such a dangerous precedent for Elizabeth?',
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
      'Elizabeth I had ‘no desire to make windows into men’s souls’—pay your Sunday fines and keep private doubts to yourself.',
    rightPageQuip:
      'The Elizabethan Middle Way was balanced so that strict Catholics and Puritans disliked it equally—the ultimate compromise.',
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
          'Philip II was determined to restore Catholicism and punish England for Mary’s execution',
          'Francis Drake and English privateers repeatedly plundered Spanish treasure ships',
          'Elizabeth sent English troops to help Protestant Dutch rebels fight against Spain',
        ],
        focusClue: 'Why did Philip view invading England as a holy crusade against Protestantism?',
      },
      {
        step: 2,
        date: '1587',
        questionHeading: 'How did Drake’s raid on Cadiz delay the Spanish invasion?',
        bullets: [
          'In April 1587, Drake sailed daringly into Cadiz harbor in southern Spain',
          'Burned over 30 Spanish warships and destroyed seasoned barrel wood supplies',
          'Drake boasted he had ‘singed the King of Spain’s beard’, delaying the Armada by a year',
        ],
        focusClue:
          'How did burning seasoned barrel wood ruin Spanish water and food supplies at sea?',
      },
      {
        step: 3,
        date: 'July 1588',
        questionHeading: 'How did the English fleet harry the Armada up the English Channel?',
        bullets: [
          '130 Spanish ships sailed in an impenetrable crescent formation up the English Channel',
          'English race-built galleons were faster, lighter, and loaded long-range culverin cannon',
          'English gunners fired from safe distance, preventing Spanish soldiers from boarding',
        ],
        focusClue:
          'Why did long-range gunnery give the English fleet a decisive tactical advantage?',
      },
      {
        step: 4,
        date: '7–8 August 1588',
        questionHeading: 'How did English fireships at Calais shatter the Spanish formation?',
        bullets: [
          'Armada anchored off Calais waiting for the Duke of Parma’s army from Flanders',
          'At midnight on 7 August, the English launched eight blazing fireships into the fleet',
          'Spanish captains panicked, cut their heavy anchor cables, and scattered into the dark',
        ],
        focusClue:
          'Why did cutting anchor cables leave Spanish ships helpless in rough North Sea weather?',
      },
      {
        step: 5,
        date: 'Aug–Sept 1588',
        questionHeading: 'How did the Battle of Gravelines and severe storms destroy the fleet?',
        bullets: [
          'At Gravelines, English warships battered the scattered, anchorless Spanish galleons',
          'Ferocious Atlantic gales (‘The Protestant Wind’) drove the Armada around Scotland and Ireland',
          'Over 50 Spanish ships wrecked on rocky coasts; fewer than half limped home to Spain',
        ],
        focusClue: 'Why did Elizabeth’s medal declare: ‘God blew and they were scattered’?',
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
      'The Armada carried 130 ships and 30,000 soldiers. Unfortunately for Philip II, none of it stopped English fireships.',
    rightPageQuip:
      'Philip II blamed storms for his Armada defeat; Drake and English gunners credited superior standoff broadsides.',
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
        questionHeading: 'Why did Charles I’s ‘Personal Rule’ without Parliament cause outrage?',
        bullets: [
          'Charles I believed in Divine Right—that kings answer only to God, never to Parliament',
          'Ruled 11 years alone, raising archaic taxes like inland Ship Money without MPs’ consent',
          'Archbishop Laud forced English prayer books on Scotland, sparking an armed rebellion',
        ],
        focusClue:
          'Why did inland Ship Money spark widespread constitutional outrage across England?',
      },
      {
        step: 2,
        date: '1640–1642',
        questionHeading: 'How did the breakdown of trust lead to armed civil conflict?',
        bullets: [
          'Bankruptcy forced Charles to summon the Long Parliament; MPs arrested royal ministers',
          'In January 1642, Charles entered the Commons with 400 soldiers to arrest five MPs',
          'The MPs had fled; Charles raised the royal standard at Nottingham on 22 August 1642',
        ],
        focusClue: 'Why did the King entering the Commons with armed soldiers make war inevitable?',
      },
      {
        step: 3,
        date: '1645–1648',
        questionHeading: 'How did the New Model Army defeat the King at the Battle of Naseby?',
        bullets: [
          'Parliament formed the New Model Army under Fairfax and Cromwell, promoted on merit',
          'Decisive victory at the Battle of Naseby (1645) destroyed Charles’s royalist army',
          'Defeated Charles secretly plotted with the Scots to invade England (Second Civil War, 1648)',
        ],
        focusClue:
          'Why did Charles’s secret deal brand him in soldiers’ eyes as a treacherous ‘man of blood’?',
      },
      {
        step: 4,
        date: '1648–1649',
        questionHeading: 'Why did Pride’s Purge and the High Court lead to regicide?',
        bullets: [
          'In Dec 1648, Colonel Pride purged moderate MPs who wanted to negotiate with the King',
          'Remaining ‘Rump Parliament’ put Charles on trial for treason against his own people',
          'Charles refused to plead; publicly beheaded outside Whitehall on 30 January 1649',
        ],
        focusClue:
          'On what constitutional grounds did Charles I refuse to recognize the trial court?',
      },
      {
        step: 5,
        date: '1660–1689',
        questionHeading: 'How did the Glorious Revolution permanently limit royal power?',
        bullets: [
          'Cromwell’s republic collapsed, restoring Charles II in 1660, but James II alienated MPs',
          'In 1688, Parliament invited Dutch Prince William of Orange to replace Catholic James II',
          'The 1689 Bill of Rights established that no monarch can tax or keep an army without Parliament',
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
      'Charles I insisted no earthly court could try a king; three days later, Parliament had him beheaded outside Whitehall.',
    rightPageQuip:
      'Oliver Cromwell called the 1649 regicide a ‘cruel necessity’; Royalists called it sacrilegious murder.',
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
          '1534 Act of Supremacy used Parliament to give religious change legal authority',
          'Dissolution of monasteries created landed gentry invested in Protestant rule',
        ],
        focusClue: 'Did the break with Rome increase royal prerogative or parliamentary authority?',
      },
      {
        step: 2,
        date: '1559–1588',
        questionHeading: 'How did the Elizabethan settlement forge a Protestant national state?',
        bullets: [
          'The 1559 Via Media compromise prevented the religious civil wars seen in Europe',
          'Queen governed as ‘Supreme Governor’ with broad popular acceptance and outward conformity',
          'Victory over the Spanish Armada in 1588 fused English patriotism with Protestantism',
        ],
        focusClue:
          'How did external Catholic threats unite Crown and Parliament during Elizabeth’s reign?',
      },
      {
        step: 3,
        date: '1603–1640',
        questionHeading: 'Why did Stuart claims of Divine Right provoke constitutional crisis?',
        bullets: [
          'James I and Charles I asserted absolute royal prerogative, claiming they answered only to God',
          'Charles I’s 11-Year Personal Rule raised illegal taxes and silenced critics without Parliament',
          'Attempt to impose religious uniformity sparked war with Scotland, bankrupting the King',
        ],
        focusClue: 'Why did Stuart absolutism break down while Tudor compromise had succeeded?',
      },
      {
        step: 4,
        date: '1642–1649',
        questionHeading: 'Why was the trial and execution of Charles I a radical turning point?',
        bullets: [
          'Civil war proved a disciplined parliamentary citizen army could defeat the King’s forces',
          'Regicide in 1649 proved that an English monarch was accountable to the law of the people',
          'Abolishing the monarchy and House of Lords created England’s only republican Commonwealth',
        ],
        focusClue:
          'Why was publicly executing an anointed king the most shocking event in Tudor-Stuart history?',
      },
      {
        step: 5,
        date: '1660–1689',
        questionHeading: 'How did the 1689 Bill of Rights finalize Parliamentary Supremacy?',
        bullets: [
          'The 1660 Restoration failed to settle whether King or Parliament held supreme power',
          'Glorious Revolution (1688) expelled James II without major bloodshed',
          '1689 Bill of Rights established parliamentary sovereignty: law and taxation require Parliament',
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
      'In 1689, William III accepted the Bill of Rights to secure war taxes, legally subordinating the Crown to Parliament.',
    rightPageQuip:
      'After monarchy, civil war, and military rule, Parliament decided in 1689 that binding written rules were the safest remedy.',
  },
];

// ============================================================================
// 24-QUESTION SEN-ACCESSIBLE DUAL-RETRIEVAL MASTERY BANK (48 MARKS TOTAL)
// Structure: 4 Questions per Enquiry (5 x 4 = 20) + 4 Synoptic Turning Points = 24 Qs
// Line 1: Core Fact [1m] • Line 2: Causal Explanation [1m]
// ============================================================================
const dualRetrievalBank = [
  // Enquiry 1: Henry VIII & The English Reformation (1517–1534)
  {
    num: 1,
    enquiryNum: 1,
    enquiryTitle: 'Enquiry 1: Henry VIII & The English Reformation',
    title: 'Catherine of Aragon & Succession Crisis',
    stem: 'Why did Henry VIII urgently demand an annulment from Catherine of Aragon in 1527?',
    factPrompt: 'Catherine had no surviving male heir to secure the Tudor succession...',
    explPrompt: 'Henry feared Leviticus 20:21 divine curse & dynastic civil war without a son...',
    modelFact: 'Catherine had no surviving male heir to secure the Tudor royal succession.',
    modelExpl:
      'Henry feared a divine curse under Leviticus 20:21 and believed a male heir was vital to prevent civil war.',
  },
  {
    num: 2,
    enquiryNum: 1,
    enquiryTitle: 'Enquiry 1: Henry VIII & The English Reformation',
    title: 'Pope Clement VII & Charles V',
    stem: 'Why was Pope Clement VII unable to grant Henry’s annulment request in 1527?',
    factPrompt: 'Emperor Charles V sacked Rome and held Pope Clement captive...',
    explPrompt: 'Charles was Catherine’s nephew, blocking any papal annulment...',
    modelFact: 'Holy Roman Emperor Charles V sacked Rome in 1527 and held the Pope captive.',
    modelExpl:
      'Charles was Catherine of Aragon’s nephew, so the Pope could not grant the divorce without enraging the Emperor.',
  },
  {
    num: 3,
    enquiryNum: 1,
    enquiryTitle: 'Enquiry 1: Henry VIII & The English Reformation',
    title: 'Act in Restraint of Appeals (1533)',
    stem: 'How did the 1533 Act in Restraint of Appeals transform English legal sovereignty?',
    factPrompt: 'Declared England an independent ‘Empire’ under the King alone...',
    explPrompt: 'Banned all legal appeals to Rome, allowing Cranmer to annul the marriage...',
    modelFact: 'It declared England an independent ‘Empire’ and banned legal appeals to the Pope.',
    modelExpl:
      'This allowed Archbishop Thomas Cranmer to annul Henry’s marriage in England without Roman interference.',
  },
  {
    num: 4,
    enquiryNum: 1,
    enquiryTitle: 'Enquiry 1: Henry VIII & The English Reformation',
    title: 'Act of Supremacy (1534)',
    stem: 'What was the constitutional significance of the 1534 Act of Supremacy?',
    factPrompt: 'Declared Henry VIII the ‘Supreme Head’ of the Church of England...',
    explPrompt: 'Ended papal authority and backed royal supremacy with the Treason Act...',
    modelFact: 'Declared Henry VIII ‘Supreme Head’ of the Church of England.',
    modelExpl:
      'It permanently stripped the Pope of power in England, making denial of royal supremacy punishable by death.',
  },

  // Enquiry 2: Elizabeth I & The Middle Way (1558–1588)
  {
    num: 5,
    enquiryNum: 2,
    enquiryTitle: 'Enquiry 2: Elizabeth I & The Middle Way',
    title: 'The Title ‘Supreme Governor’ (1559)',
    stem: 'Why did Elizabeth I adopt the title ‘Supreme Governor’ instead of ‘Supreme Head’?',
    factPrompt: 'Adopted ‘Supreme Governor’ in the 1559 Act of Supremacy...',
    explPrompt:
      'Reassured Catholics (Christ/Pope is head) & Puritans (opposed female spiritual head)...',
    modelFact: 'She adopted ‘Supreme Governor’ in the 1559 Act of Supremacy.',
    modelExpl:
      'It defused Catholic objections that only Christ or the Pope could head the Church and placated Puritans.',
  },
  {
    num: 6,
    enquiryNum: 2,
    enquiryTitle: 'Enquiry 2: Elizabeth I & The Middle Way',
    title: '1559 Book of Common Prayer',
    stem: 'How did the 1559 Prayer Book compromise on the Communion service?',
    factPrompt: 'Combined Catholic (1549) and Protestant (1552) Communion wording...',
    explPrompt:
      'Allowed moderate Catholics & Protestants to attend without violating conscience...',
    modelFact: 'It combined Catholic (1549) and Protestant (1552) communion wording.',
    modelExpl:
      'This ambiguity allowed moderate Catholics to imagine the Real Presence while Protestants saw a commemoration.',
  },
  {
    num: 7,
    enquiryNum: 2,
    enquiryTitle: 'Enquiry 2: Elizabeth I & The Middle Way',
    title: 'Papal Excommunication (1570)',
    stem: 'How did Pope Pius V’s papal bull Regnans in Excelsis (1570) threaten Elizabeth I?',
    factPrompt: 'Excommunicated Elizabeth and ordered Catholics to depose her...',
    explPrompt: 'Transformed English practicing Catholics into suspected political traitors...',
    modelFact: 'It excommunicated Elizabeth and released English Catholics from loyalty to her.',
    modelExpl:
      'It transformed practicing English Catholics in the eyes of the Crown from religious dissenters into active traitors.',
  },
  {
    num: 8,
    enquiryNum: 2,
    enquiryTitle: 'Enquiry 2: Elizabeth I & The Middle Way',
    title: 'Babington Plot & Execution of Mary (1586–87)',
    stem: 'Why did Walsingham’s discovery of the Babington Plot lead to Mary’s execution?',
    factPrompt: 'Intercepted coded letters proved Mary agreed to assassinate Elizabeth...',
    explPrompt:
      'Executing Mary permanently eliminated the Catholic figurehead for foreign invasion...',
    modelFact: 'Intercepted coded letters proved Mary agreed to assassinate Elizabeth I.',
    modelExpl:
      'Executing Mary in 1587 removed the rallying figurehead for Catholic plots and Spanish invasion schemes.',
  },

  // Enquiry 3: The Spanish Armada & Naval Power (1588)
  {
    num: 9,
    enquiryNum: 3,
    enquiryTitle: 'Enquiry 3: The Spanish Armada & Naval Power',
    title: 'King Philip II’s Invasion Motives',
    stem: 'Why did King Philip II launch the Spanish Armada against England in 1588?',
    factPrompt: 'To restore Catholicism, avenge Mary Queen of Scots, and stop Drake’s piracy...',
    explPrompt:
      'Philip viewed invasion as a holy crusade to end English support for Dutch rebels...',
    modelFact: 'To restore Catholicism, avenge Mary Queen of Scots, and punish English privateers.',
    modelExpl:
      'Philip viewed it as a holy crusade to depose Elizabeth and stop English military aid to Dutch Protestant rebels.',
  },
  {
    num: 10,
    enquiryNum: 3,
    enquiryTitle: 'Enquiry 3: The Spanish Armada & Naval Power',
    title: 'Drake’s Raid on Cadiz (1587)',
    stem: 'How did Francis Drake’s raid on Cadiz in 1587 disrupt Spanish invasion plans?',
    factPrompt: 'Burned 30+ Spanish warships and destroyed seasoned barrel stave supplies...',
    explPrompt: 'Delayed the Armada by a year and caused food and water to rot at sea...',
    modelFact:
      'Drake burned over 30 warships and destroyed seasoned barrel stave supplies in Cadiz harbor.',
    modelExpl:
      'This delayed the invasion by a full year and ruined Spanish food and fresh water storage at sea.',
  },
  {
    num: 11,
    enquiryNum: 3,
    enquiryTitle: 'Enquiry 3: The Spanish Armada & Naval Power',
    title: 'English Race-Built Galleons & Standoff Tactics',
    stem: 'What tactical advantage did English warships have over the Spanish fleet in 1588?',
    factPrompt: 'Race-built galleons were faster, lower, and loaded long-range culverin cannons...',
    explPrompt: 'Allowed English gunners to fire repeated broadsides without being boarded...',
    modelFact:
      'English race-built galleons were faster, lower, and armed with long-range culverins.',
    modelExpl:
      'English crews fired devastating broadsides from standoff range, preventing Spanish soldiers from boarding.',
  },
  {
    num: 12,
    enquiryNum: 3,
    enquiryTitle: 'Enquiry 3: The Spanish Armada & Naval Power',
    title: 'Calais Fireships & Battle of Gravelines',
    stem: 'Why did the deployment of English fireships at Calais trigger the Armada’s defeat?',
    factPrompt:
      'Eight blazing fireships sent into Calais anchorage forced captains to cut anchor cables...',
    explPrompt:
      'Scattered ships could not regroup, leaving them helpless at Gravelines & in storms...',
    modelFact:
      'Eight blazing fireships launched off Calais forced Spanish captains to cut anchor cables.',
    modelExpl:
      'Scattered anchorless ships broke formation and were battered at Gravelines and wrecked by North Sea storms.',
  },

  // Enquiry 4: The English Civil War & Execution of Charles I (1625–1649)
  {
    num: 13,
    enquiryNum: 4,
    enquiryTitle: 'Enquiry 4: The English Civil War & Regicide',
    title: 'Divine Right & 11-Year Personal Rule',
    stem: 'Why did King Charles I rule without Parliament between 1629 and 1640?',
    factPrompt: 'Charles believed in Divine Right and refused parliamentary limits on power...',
    explPrompt:
      'He wanted total control of religion and taxes until Scottish wars forced a recall...',
    modelFact:
      'Charles believed in the Divine Right of Kings and rejected parliamentary criticism.',
    modelExpl:
      'Ruling alone allowed him to impose Arminian religion and unparliamentary taxes until the Scottish war bankrupt him.',
  },
  {
    num: 14,
    enquiryNum: 4,
    enquiryTitle: 'Enquiry 4: The English Civil War & Regicide',
    title: 'Ship Money & John Hampden (1635–37)',
    stem: 'Why did Charles I’s expansion of Ship Money provoke furious nationwide resistance?',
    factPrompt: 'Levied a coastal emergency naval tax on inland counties in peacetime...',
    explPrompt:
      'Landowners like Hampden argued taxation without Parliament violated English law...',
    modelFact: 'He levied an emergency coastal naval tax on inland counties during peacetime.',
    modelExpl:
      'Landowners like John Hampden argued that taking property without parliamentary consent was illegal tyranny.',
  },
  {
    num: 15,
    enquiryNum: 4,
    enquiryTitle: 'Enquiry 4: The English Civil War & Regicide',
    title: 'The New Model Army & Battle of Naseby (1645)',
    stem: 'Why was the New Model Army able to decisively defeat the Royalists at Naseby?',
    factPrompt: 'A national, disciplined, professional citizen army promoted on merit...',
    explPrompt: 'Cromwell’s disciplined cavalry charges crushed the King’s main field army...',
    modelFact:
      'It was England’s first national, professional army promoted on merit rather than birth.',
    modelExpl:
      'Superior training, discipline, and Cromwell’s cavalry charges shattered the Royalist field army permanently.',
  },
  {
    num: 16,
    enquiryNum: 4,
    enquiryTitle: 'Enquiry 4: The English Civil War & Regicide',
    title: 'Trial & Execution of Charles I (1649)',
    stem: 'Why did the Rump Parliament take the radical step of executing King Charles I?',
    factPrompt: 'Tried as a ‘tyrant, traitor, and murderer’ and beheaded on 30 January 1649...',
    explPrompt:
      'Parliament decided peace was impossible while the King lived after the 2nd Civil War...',
    modelFact:
      'Charles was tried as a ‘tyrant, traitor, and murderer’ and beheaded on 30 January 1649.',
    modelExpl:
      'Having secretly conspired with the Scots in the Second Civil War, MPs concluded he could never be trusted.',
  },

  // Enquiry 5: The Restoration, Glorious Revolution & Bill of Rights (1660–1689)
  {
    num: 17,
    enquiryNum: 5,
    enquiryTitle: 'Enquiry 5: Restoration & Glorious Revolution',
    title: 'The Restoration Settlement (1660)',
    stem: 'Why did the English Republic collapse and restore King Charles II in 1660?',
    factPrompt: 'The Protectorate collapsed into military chaos following Cromwell’s death...',
    explPrompt:
      'Elites & public wanted stability, social order, and parliamentary government restored...',
    modelFact:
      'The military Protectorate collapsed into political chaos after Oliver Cromwell’s death.',
    modelExpl:
      'The political nation restored the monarchy to recover social order, stability, and constitutional law.',
  },
  {
    num: 18,
    enquiryNum: 5,
    enquiryTitle: 'Enquiry 5: Restoration & Glorious Revolution',
    title: 'James II & Dynastic Crisis (1688)',
    stem: 'Why did the birth of James II’s son in June 1688 trigger a constitutional crisis?',
    factPrompt: 'The infant prince threatened a permanent Catholic Stuart dynasty...',
    explPrompt:
      'Protestant peers feared permanent royal suspension of laws & persecution of Protestants...',
    modelFact: 'The birth of a Catholic male heir threatened a permanent Catholic Stuart dynasty.',
    modelExpl:
      'Protestant peers panicked that Protestant heirs Mary and Anne would be displaced by a Catholic succession.',
  },
  {
    num: 19,
    enquiryNum: 5,
    enquiryTitle: 'Enquiry 5: Restoration & Glorious Revolution',
    title: 'William of Orange & Glorious Revolution (1688)',
    stem: 'How did Parliament justify the transfer of the Crown to William and Mary in 1688?',
    factPrompt: 'The ‘Immortal Seven’ invited William of Orange; James II fled London...',
    explPrompt:
      'Parliament declared the throne ‘vacant’ and offered it jointly under statutory rules...',
    modelFact:
      'Seven leading peers invited William of Orange; James II threw the Great Seal into the Thames and fled.',
    modelExpl:
      'Parliament declared that by fleeing, James had abdicated, leaving the throne vacant for a constitutional contract.',
  },
  {
    num: 20,
    enquiryNum: 5,
    enquiryTitle: 'Enquiry 5: Restoration & Glorious Revolution',
    title: 'The Bill of Rights (1689)',
    stem: 'How did the 1689 Bill of Rights permanently transform the power of the English Crown?',
    factPrompt:
      'Banned royal suspension of laws, taxation, and standing armies without Parliament...',
    explPrompt:
      'Created a constitutional monarchy where statutory law is supreme over royal prerogative...',
    modelFact:
      'It banned royal suspension of laws, unparliamentary taxes, and peacetime standing armies.',
    modelExpl:
      'It permanently established parliamentary supremacy, transforming Britain into a constitutional monarchy.',
  },

  // Synoptic Turning Points (Questions 21–24)
  {
    num: 21,
    enquiryNum: 5,
    enquiryTitle: 'Synoptic Chronology & Historical Significance',
    title: 'Transformation of Crown vs Church (1517–1689)',
    stem: 'How did supreme religious authority change between the reign of Henry VIII and 1689?',
    factPrompt: 'Shifted from papal supremacy to Royal Supremacy, then parliamentary regulation...',
    explPrompt:
      'The Church ceased to be an independent European power and became governed by statute...',
    modelFact:
      'Religious power shifted from the Pope in Rome to Royal Supremacy, then statutory toleration under Parliament.',
    modelExpl:
      'The Church was transformed from an autonomous Roman power into an institution regulated by English parliamentary law.',
  },
  {
    num: 22,
    enquiryNum: 5,
    enquiryTitle: 'Synoptic Chronology & Historical Significance',
    title: 'The Fundamental Struggle Over Taxation',
    stem: 'What was the core constitutional conflict over taxation between the Stuarts and Parliament?',
    factPrompt:
      'Kings claimed Divine Right to levy funds; Parliament insisted supply required MP consent...',
    explPrompt:
      'This dispute sparked civil war and was resolved in 1689 by outlawing unparliamentary taxes...',
    modelFact:
      'Monarchs claimed divine prerogative to levy taxes, while Parliament insisted only MPs could grant supply.',
    modelExpl:
      'This dispute directly caused the Civil War and was resolved in 1689 by making unparliamentary taxation illegal.',
  },
  {
    num: 23,
    enquiryNum: 5,
    enquiryTitle: 'Synoptic Chronology & Historical Significance',
    title: '1649 Regicide vs 1689 Bill of Rights',
    stem: 'Why is the 1689 settlement considered more historically permanent than the 1649 execution?',
    factPrompt:
      '1649 created an unstable military dictatorship that collapsed back to monarchy in 1660...',
    explPrompt:
      '1689 created a legal partnership between Crown & Parliament that endures to this day...',
    modelFact: 'The 1649 Republic collapsed into military dictatorship and was overthrown in 1660.',
    modelExpl:
      'The 1689 Bill of Rights established a stable statutory compromise that forms the basis of modern democracy.',
  },
  {
    num: 24,
    enquiryNum: 5,
    enquiryTitle: 'Synoptic Chronology & Historical Significance',
    title: 'Evolution of Parliament (1534–1689)',
    stem: 'How did Parliament’s constitutional role evolve between the 1530s and 1689?',
    factPrompt:
      'Evolved from Henry VIII’s occasional legal tool into the permanent sovereign lawmaker...',
    explPrompt:
      'Free speech, regular elections, and control of finances made Parliament the supreme power...',
    modelFact:
      'Parliament evolved from a royal rubber-stamp under Henry VIII into the permanent supreme lawmaker.',
    modelExpl:
      'Statutory guarantees of free elections, free debate, and taxation control permanently subordinated the Crown to the law.',
  },
];

// Helper to render an 8-question Dual-Retrieval Page (Pages 16, 17, 18)
function renderDualRetrievalPage(pageNum, title, subtitle, tariff, questions, quip) {
  const sec1 = questions.slice(0, 4);
  const sec2 = questions.slice(4, 8);
  const enquiryTitle1 = sec1[0].enquiryTitle;
  const enquiryTitle2 = sec2[0].enquiryTitle;

  const renderCard = (q) => `
    <div style="border: 1.2px solid #000000; border-radius: 3px; display: flex; flex-direction: column; justify-content: space-between; background: #ffffff; flex: 1; min-height: 0; margin-bottom: 2px; padding: 2.5px 8px;">
      <!-- Question Prompt Header -->
      <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1px;">
        <span style="font-family: 'Inter', sans-serif; font-size: 8.5pt; font-weight: 900; color: #000000; line-height: 1.22;">
          ${q.num}. ${q.stem}
        </span>
        <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; border: 1px solid #000000; padding: 0.5px 5px; border-radius: 2px; white-space: nowrap; margin-left: 8px;">
          2 marks
        </span>
      </div>
      <!-- Answer Line -->
      <div style="display: flex; align-items: flex-end; border-bottom: 1.2px solid #000000; height: 8mm; box-sizing: border-box; padding-bottom: 1px;">
        <span style="font-family: 'Inter', sans-serif; font-size: 8.2pt; font-weight: 900; color: #000000; margin-right: 6px; white-space: nowrap;">
          Answer:
        </span>
        <div style="flex: 1;"></div>
      </div>
      <!-- Explanation Line -->
      <div style="display: flex; align-items: flex-end; border-bottom: 1.2px solid #000000; height: 8mm; box-sizing: border-box; padding-bottom: 1px;">
        <span style="font-family: 'Inter', sans-serif; font-size: 8.2pt; font-weight: 900; color: #000000; margin-right: 6px; white-space: nowrap;">
          Explanation:
        </span>
        <div style="flex: 1;"></div>
      </div>
    </div>`;

  return `
  <!-- PAGE ${pageNum}: DUAL-RETRIEVAL PRACTICE BANK -->
  <div class="page page-container ${pageNum % 2 === 0 ? 'verso-page' : 'recto-page'}" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 4px;">
        <div>
          <h2 style="font-family: 'Playfair Display', serif; font-size: 11pt; color: #000000; margin: 0; font-weight: 900;">
            ${title}
          </h2>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #444444; font-weight: 600;">
            ${subtitle}
          </div>
        </div>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px;">
          ${tariff}
        </span>
      </div>

      <!-- Sections Container filling vertical space -->
      <div style="display: flex; flex-direction: column; gap: 4px; flex: 1; justify-content: space-between; min-height: 0;">
        <!-- Section 1 -->
        <div style="border: 1.5px solid #000000; border-radius: 4px; overflow: hidden; background: #ffffff; flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0;">
          <div style="background: #000000; color: #ffffff; padding: 2.5px 8px; display: flex; justify-content: space-between; align-items: center;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.6pt; text-transform: uppercase; letter-spacing: 0.3px;">
              ${enquiryTitle1}
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 800; background: #ffffff; color: #000000; padding: 0.5px 6px; border-radius: 2px;">
              Score: [ &nbsp;&nbsp; / 8 ]
            </span>
          </div>
          <div style="padding: 3px 5px 2px 5px; flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0;">
            ${sec1.map(renderCard).join('')}
          </div>
        </div>

        <!-- Section 2 -->
        <div style="border: 1.5px solid #000000; border-radius: 4px; overflow: hidden; background: #ffffff; flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0;">
          <div style="background: #000000; color: #ffffff; padding: 2.5px 8px; display: flex; justify-content: space-between; align-items: center;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.6pt; text-transform: uppercase; letter-spacing: 0.3px;">
              ${enquiryTitle2}
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 800; background: #ffffff; color: #000000; padding: 0.5px 6px; border-radius: 2px;">
              Score: [ &nbsp;&nbsp; / 8 ]
            </span>
          </div>
          <div style="padding: 3px 5px 2px 5px; flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0;">
            ${sec2.map(renderCard).join('')}
          </div>
        </div>
      </div>

      ${renderFooterStrip(pageNum, quip, 20)}
    </div>
  </div>`;
}

// Helper to render Page 19 Complete Department Answer Bank + Examiner Traps Box
function renderAnswerBankPage(pageNum, quip) {
  const col1 = dualRetrievalBank.slice(0, 12);
  const col2 = dualRetrievalBank.slice(12, 24);

  const renderAnswerItem = (q) => `
    <div style="border-bottom: 0.8px solid #e0e0e0; padding: 2px 0; flex: 1; display: flex; flex-direction: column; justify-content: center;">
      <div style="display: flex; justify-content: space-between; align-items: baseline;">
        <strong style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 900; color: #000000;">
          Q${q.num}. ${q.title}
        </strong>
        <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; color: #000000;">[2m]</span>
      </div>
      <div style="font-family: 'Inter', sans-serif; font-size: 7.3pt; line-height: 1.25; color: #000000; font-weight: 800; margin-top: 1.5px;">
        <span style="font-weight: 900; color: #000000;">• Fact:</span> ${q.modelFact}
      </div>
      <div style="font-family: 'Inter', sans-serif; font-size: 7.3pt; line-height: 1.25; color: #000000; font-weight: 800; margin-top: 1px;">
        <span style="font-weight: 900; color: #000000;">• Explanation:</span> ${q.modelExpl}
      </div>
    </div>`;

  return `
  <!-- PAGE 19: COMPLETE DEPARTMENT ANSWER BANK & EXAMINER TRAP MATRIX -->
  <div class="page page-container recto-page" id="page-19" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 5px;">
        <div>
          <h2 style="font-family: 'Playfair Display', serif; font-size: 11pt; color: #000000; margin: 0; font-weight: 900;">
            Complete Department Answer Bank &bull; 24-Question Dual-Retrieval Key
          </h2>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #333333; font-weight: 600;">
            Standardised Core Factual Knowledge &amp; Causal Explanation Models (Enquiries 1–5 &amp; Synoptic Turning Points)
          </div>
        </div>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px;">
          Total Score: [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 48 ]
        </span>
      </div>

      <!-- Main Body Container filling vertical space -->
      <div style="display: flex; flex-direction: column; gap: 6px; flex: 1; justify-content: space-between; min-height: 0;">
        <!-- 2-Column Complete Answer Grid -->
        <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 6px 9px; background: #ffffff; flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px 16px; flex: 1; align-content: space-between; height: 100%;">
            <div style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
              ${col1.map(renderAnswerItem).join('')}
            </div>
            <div style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
              ${col2.map(renderAnswerItem).join('')}
            </div>
          </div>
        </div>

        <!-- Common Examiner Traps & Misconceptions Matrix -->
        <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 5px 8px; background: #fafafa;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.6pt; text-transform: uppercase; color: #000000;">
              ⚠️ Common Examiner Traps &amp; Key Historical Misconceptions
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; color: #333333;">
              GCSE GRADE 7–9 DISCIPLINARY PRECISION
            </span>
          </div>
          <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 5px; font-family: 'Inter', sans-serif; font-size: 6.6pt; line-height: 1.24; color: #000000;">
            <div style="border: 0.8px solid #000000; border-radius: 2px; padding: 3px 4px; background: #ffffff;">
              <strong style="display: block; font-size: 6.8pt; color: #000000; margin-bottom: 1px;">1. Supreme Head vs Governor</strong>
              Henry VIII claimed absolute spiritual headship (1534); Elizabeth I deliberately chose ‘Governor’ (1559) to soothe Catholic conscience and avoid Puritan blasphemy claims while retaining legal governance.
            </div>
            <div style="border: 0.8px solid #000000; border-radius: 2px; padding: 3px 4px; background: #ffffff;">
              <strong style="display: block; font-size: 6.8pt; color: #000000; margin-bottom: 1px;">2. 1642 Outbreak vs 1649 Regicide</strong>
              The Civil War was fought in 1642 to curb royal prerogative and enforce parliamentary consent, NOT to kill the King. Regicide in 1649 was a radical minority act after Charles secretly restarted war with Scotland.
            </div>
            <div style="border: 0.8px solid #000000; border-radius: 2px; padding: 3px 4px; background: #ffffff;">
              <strong style="display: block; font-size: 6.8pt; color: #000000; margin-bottom: 1px;">3. 1688 Was an Invited Invasion</strong>
              1688 was NOT a popular rebellion. Seven prominent English peers wrote a secret letter formally inviting Dutch Prince William with 15,000 troops; James II fled, allowing Parliament to claim abdication.
            </div>
            <div style="border: 0.8px solid #000000; border-radius: 2px; padding: 3px 4px; background: #ffffff;">
              <strong style="display: block; font-size: 6.8pt; color: #000000; margin-bottom: 1px;">4. Cromwell: Protector, Not King</strong>
              Oliver Cromwell was offered the crown in the Humble Petition and Advice (1657) but refused it due to Puritan army pressure. He governed as Lord Protector, a military dictatorship, not an anointed monarch.
            </div>
            <div style="border: 0.8px solid #000000; border-radius: 2px; padding: 3px 4px; background: #ffffff;">
              <strong style="display: block; font-size: 6.8pt; color: #000000; margin-bottom: 1px;">5. Ship Money Legal Nuance</strong>
              Ship Money was historically a lawful emergency tax on coastal towns during war. Charles I made it tyrannical by extending it permanently to inland counties in peacetime without parliamentary vote.
            </div>
          </div>
        </div>
      </div>

      ${renderFooterStrip(pageNum, quip, 20)}
    </div>
  </div>`;
}

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
        .map(
          (b) =>
            `<div style="display: flex; align-items: baseline; gap: 4px;"><span style="font-weight: 900; color: #000000; font-size: 8pt; line-height: 1;">&bull;</span> <span>${b}</span></div>`,
        )
        .join('');
      return `
        <div class="spine-stage-block" style="display: flex; flex-direction: column; flex: 1; min-height: 0; margin-bottom: 2.5px; border: 1.2px solid #000000; border-radius: 2px; overflow: hidden; background: #ffffff;">
          
          <!-- Full-Width Banner with Key Question Across Page -->
          <div class="stage-banner" style="background: #000000; color: #ffffff; padding: 2.5px 8px; display: flex; align-items: center; border-bottom: 1.2px solid #000000;">
            <div style="display: flex; align-items: center; gap: 7px; min-width: 0; flex: 1;">
              <span style="background: #ffffff; color: #000000; font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; padding: 0.5px 5.5px; border-radius: 2px; white-space: nowrap;">
                ${st.step}
              </span>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 800; color: #cbd5e1; white-space: nowrap;">
                ${st.date}
              </span>
              <span style="color: #64748b; font-size: 7pt;">&bull;</span>
              <span style="font-family: 'Playfair Display', serif; font-size: 8.8pt; font-weight: 800; color: #ffffff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                ${st.questionHeading}
              </span>
            </div>
          </div>

          <!-- Content Row: Left Cues & Right Ruled Note-Taking Lines -->
          <div style="display: flex; flex: 1; min-height: 0; align-items: stretch;">
            
            <!-- Left Column: Reduced Number of Bullet Points (2-3 concise cues with larger font, no duplicate hinge box) -->
            <div style="width: 55mm; flex-shrink: 0; background: #f8fafc; padding: 3px 6px; display: flex; flex-direction: column; justify-content: center; border-right: 1.2px solid #000000; box-sizing: border-box;">
              <div style="display: flex; flex-direction: column; gap: 2.5px; font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 500; line-height: 1.28; color: #0f172a;">
                ${bulletsHtml}
              </div>
            </div>

            <!-- Right Column: Widened Ruled Lines (Medicine/CME Standard: 1.2px solid #000000) -->
            <div style="flex: 1; display: flex; flex-direction: column; background: #ffffff; margin: 0; padding: 0;">
              <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
            </div>

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
            Take structured notes alongside each stage as your teacher narrates the history
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

      <!-- Connectives & Key Vocabulary Bank -->
      <div style="border: 1px solid #000000; border-radius: 3px; padding: 5px 8px; background: #ffffff; margin-bottom: 6px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
        <div>
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase; display: block; margin-bottom: 2px;">Analytical Connectives:</strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-style: italic; line-height: 1.22; display: block;">${rp.connectives}</span>
        </div>
        <div>
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase; display: block; margin-bottom: 2px;">Key Vocabulary Bank:</strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; line-height: 1.22; display: block;">${rp.wordBank}</span>
        </div>
      </div>

      <!-- Ruled Task Lines for Extended Writing -->
      <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-style: italic; color: #222222; margin-bottom: 2px;">
        <strong>Task:</strong> Using the vocabulary and connectives above, write your analytical response below:
      </div>
      <div style="display: flex; flex-direction: column; gap: 0; margin-bottom: 4px; flex: 1; min-height: 0;">
        <div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>
        <div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>
        <div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>
        <div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>
        <div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>
        <div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>
        <div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>
        <div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>
        <div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>
        <div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>
        <div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>
        <div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>
        <div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>
        <div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>
        <div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>
        <div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>
        <div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>
        <div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>
        <div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>
        <div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>
        <div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>
        <div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>
        <div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>
        <div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>
        <div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>
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
        <div style="font-family: 'Inter', sans-serif; font-size: 7.1pt; font-weight: 700; margin-bottom: 2px;">
          <strong>Sentence Stems:</strong> ${rp.partA.stems}
        </div>
        <div class="ruled-lines-block">
          <div class="task-line"></div>
          <div class="task-line"></div>
          <div class="task-line"></div>
          <div class="task-line"></div>
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

          <!-- Connectives & Word Bank -->
          <div style="border: 1px solid #000000; border-radius: 3px; padding: 4px 7px; background: #ffffff; margin-bottom: 4px; font-family: 'Inter', sans-serif; font-size: 6.8pt; line-height: 1.24;">
            <div><strong>Analytical Connectives:</strong> <em>${rp.partB.connectives}</em></div>
            <div style="margin-top: 2px;"><strong>Key Terms:</strong> ${rp.partB.wordBank}</div>
          </div>
        </div>

        <!-- Ruled Writing Lines (21 Lines • Matching GCSE 7.8mm pitch) -->
        <div style="display: flex; flex-direction: column; gap: 0; margin-bottom: 4px; flex: 1; min-height: 0;">
          <div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>
          <div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>
          <div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>
          <div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>
          <div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>
          <div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>
          <div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>
          <div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>
          <div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>
          <div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>
          <div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>
          <div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>
          <div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>
          <div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>
          <div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>
          <div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>
          <div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>
          <div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>
          <div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>
          <div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>
          <div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>
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
      width: 18mm;
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
      font-size: 6.2pt;
      line-height: 1.15;
      color: #000000;
    }
    .footer-quip {
      font-style: italic;
      color: #000000;
      white-space: nowrap;
    }
    .footer-page-num {
      font-family: 'Inter', sans-serif;
      font-weight: 700;
      white-space: nowrap;
      color: #000000;
      font-size: 6.8pt;
      flex-shrink: 0;
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

      <!-- Prominent Primary Visual Source Centerpiece (Holbein Full Canvas in Authentic Color + Disciplinary Iconography Plate) -->
      <div style="margin: 2px 0 5px 0; border: 1.5px solid #000000; border-radius: 4px; overflow: hidden; background: #ffffff;">
        <div style="display: grid; grid-template-columns: 62mm 1fr; background: #ffffff;">
          <!-- Left: Full-Length Uncropped Portrait in Rich Authentic Color -->
          <div style="background: #fcfbf9; border-right: 1.5px solid #000000; display: flex; justify-content: center; align-items: center; padding: 2px 3px;">
            <img src="${coverImgBase64}" alt="King Henry VIII Full-Length Portrait by Hans Holbein" style="height: 101mm; width: auto; max-width: 100%; object-fit: contain; display: block; margin: 0 auto; border: 1.2px solid #000000; border-radius: 2px; box-shadow: 0 2px 6px rgba(0,0,0,0.18);">
          </div>
          <!-- Right: Visual Iconography & Historical Significance for Year 8 -->
          <div style="padding: 6px 10px; display: flex; flex-direction: column; justify-content: space-between; background: #ffffff; box-sizing: border-box;">
            <!-- 1. Header -->
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.2px solid #000000; padding-bottom: 2px;">
              <span style="font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 900; text-transform: uppercase; color: #000000; letter-spacing: 0.5px;">
                Primary Visual Evidence &bull; Tudor Royal Propaganda
              </span>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; color: #555555;">
                Hans Holbein the Younger (c. 1537)
              </span>
            </div>

            <!-- 2. Statecraft Context -->
            <p style="font-family: 'Georgia', serif; font-size: 7.5pt; line-height: 1.3; color: #111111; margin: 0;">
              Following the 1534 Act of Supremacy, Henry VIII commissioned Hans Holbein to project an overwhelming image of absolute monarchical sovereignty. Every visual element was calculated statecraft:
            </p>

            <!-- 3. Four Core Propaganda Features -->
            <div style="display: flex; flex-direction: column; gap: 3px;">
              <div style="border-left: 2.5px solid #000000; padding-left: 6px;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 7.1pt; text-transform: uppercase; color: #000000;">1. Stance of Absolute Dominance:</strong>
                <div style="font-family: 'Georgia', serif; font-size: 7pt; line-height: 1.22; color: #222222;">
                  Facing the viewer squarely with feet planted wide, elbows flared, and hands gripping dagger and gloves, Henry occupies maximum physical space to intimidate foreign ambassadors and subjects.
                </div>
              </div>
              <div style="border-left: 2.5px solid #000000; padding-left: 6px;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 7.1pt; text-transform: uppercase; color: #000000;">2. Imperial Splendour &amp; Monastic Wealth:</strong>
                <div style="font-family: 'Georgia', serif; font-size: 7pt; line-height: 1.22; color: #222222;">
                  Exaggerated square shoulders padded in ermine fur, gold-embroidered silver doublet, and heavy ruby collars—lavishly financed by Thomas Cromwell’s Dissolution of the Monasteries (1536–40).
                </div>
              </div>
              <div style="border-left: 2.5px solid #000000; padding-left: 6px;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 7.1pt; text-transform: uppercase; color: #000000;">3. Dynastic Virility &amp; Tudor Succession:</strong>
                <div style="font-family: 'Georgia', serif; font-size: 7pt; line-height: 1.22; color: #222222;">
                  The prominent codpiece and muscular posture were deliberate visual propaganda, asserting vitality and the promise of a legitimate male Tudor heir following the break with Rome.
                </div>
              </div>
              <div style="border-left: 2.5px solid #000000; padding-left: 6px;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 7.1pt; text-transform: uppercase; color: #000000;">4. The Absent Pope (Sovereignty Unchallenged):</strong>
                <div style="font-family: 'Georgia', serif; font-size: 7pt; line-height: 1.22; color: #222222;">
                  Depicted with zero papal, cross, or Roman Catholic emblems. The King stands solitary on English ground—the undisputed Supreme Head on Earth of the Church of England.
                </div>
              </div>
            </div>

            <!-- 4. Three-Pillar Propaganda Decoding Matrix -->
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 4px; padding-top: 3px; border-top: 1px solid #000000;">
              <div style="border: 1px solid #000000; border-radius: 2px; padding: 2.5px 5px; background: #fbfbfb;">
                <div style="font-family: 'Inter', sans-serif; font-size: 6.4pt; font-weight: 900; text-transform: uppercase; color: #000000;">The Dagger</div>
                <div style="font-family: 'Georgia', serif; font-size: 6.4pt; line-height: 1.15; color: #333333; margin-top: 1px;">Immediate physical violence against papal traitors.</div>
              </div>
              <div style="border: 1px solid #000000; border-radius: 2px; padding: 2.5px 5px; background: #fbfbfb;">
                <div style="font-family: 'Inter', sans-serif; font-size: 6.4pt; font-weight: 900; text-transform: uppercase; color: #000000;">Ermine &amp; Gold</div>
                <div style="font-family: 'Georgia', serif; font-size: 6.4pt; line-height: 1.15; color: #333333; margin-top: 1px;">Imperial status equal to Holy Roman Emperor.</div>
              </div>
              <div style="border: 1px solid #000000; border-radius: 2px; padding: 2.5px 5px; background: #fbfbfb;">
                <div style="font-family: 'Inter', sans-serif; font-size: 6.4pt; font-weight: 900; text-transform: uppercase; color: #000000;">Turkish Carpet</div>
                <div style="font-family: 'Georgia', serif; font-size: 6.4pt; line-height: 1.15; color: #333333; margin-top: 1px;">Global trade connections &amp; Renaissance wealth.</div>
              </div>
            </div>

            <!-- 5. Disciplinary Significance Anchor -->
            <div style="font-family: 'Inter', sans-serif; font-size: 6.4pt; color: #333333; line-height: 1.25; background: #f8fafc; border-left: 2px solid #000000; padding: 2px 6px;">
              <strong style="text-transform: uppercase; color: #000000;">Disciplinary Significance:</strong> In 16th-century England, lacking a standing army or police force, visual portraiture was essential constitutional statecraft to enforce Royal Supremacy.
            </div>

            <!-- 6. Targeted Disciplinary Hinge Question -->
            <div style="background: #ffffff; border: 1.2px solid #000000; border-radius: 3px; padding: 3px 6px;">
              <div style="display: flex; justify-content: space-between; align-items: baseline;">
                <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 900; text-transform: uppercase; color: #000000;">Disciplinary Hinge Question:</span>
                <span style="font-family: 'Inter', sans-serif; font-size: 6.2pt; font-weight: 700; color: #555555; text-transform: uppercase;">Historical Evaluation</span>
              </div>
              <div style="font-family: 'Georgia', serif; font-size: 6.9pt; font-style: italic; color: #222222; line-height: 1.2; margin-top: 1px;">
                Does this portrait show a monarch completely confident in his sovereign power, or a ruler using theatrical spectacle to mask profound dynastic and religious vulnerability?
              </div>
            </div>
          </div>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #000000; padding: 3px 8px; border-top: 1.5px solid #000000; background: #ffffff;">
          <span><strong>Primary Visual Evidence:</strong> <em>Full-Length Portrait of King Henry VIII</em> &bull; Workshop of Hans Holbein the Younger (c. 1537–1540)</span>
          <span style="font-weight: 700;">ROYAL COLLECTION ARCHIVE &bull; WALKER ART GALLERY</span>
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

      ${renderFooterStrip(1, 'If you think politics today is messy, King Henry VIII invented a whole new church because his divorce paperwork took too long.', 20)}
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
        <div style="border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 5px;">
          <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 11pt; color: #000000; text-transform: uppercase; font-weight: 800;">
            Living Timeline &bull; Part 1: Reformation, Royal Supremacy &amp; The Middle Way (1517–1588)
          </h2>
        </div>

        <div style="border-bottom: 1px solid #000000; padding-bottom: 3px; margin-bottom: 6px; font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #000000;">
          <strong>Living Timeline Dual-Coding Protocol:</strong> Complete each milestone sketchpad using dual-coding (combining visual storytelling symbols, causal arrows, and dates) to master the chronological spine across the centre-fold.
        </div>
      </div>

      <!-- 4 Milestones with Large Blank Dual-Coding Workspace -->
      <div style="display: flex; flex-direction: column; gap: 5px; flex: 1; justify-content: space-between;">
        
        <!-- Milestone 1: 1534 -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #000000;">
                1534 &bull; Henry VIII &amp; The Act of Supremacy
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Enquiry 1</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 7.8pt; color: #000000; margin: 0 0 2px 0; line-height: 1.2;">
              Parliament passes the Act of Supremacy, declaring Henry VIII ‘Supreme Head’ of the Church of England, legally ending papal authority and redirecting Church tithes to the Crown.
            </p>
            <div style="background: #fafafa; border: 1px solid #000000; border-radius: 3px; padding: 2px 6px; margin-bottom: 2px;">
              <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; color: #000000;">
                🎨 Drawing Challenge: The Double-Crown Snip
              </div>
              <div style="font-family: 'Georgia', serif; font-size: 7pt; color: #222222; line-height: 1.2;">
                Sketch King Henry VIII using a giant golden pair of shears to snip the papal authority cable connecting Rome and London, placing a second crown upon his own head.
              </div>
              <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; color: #444444; margin-top: 1px;">
                Quick-Draw: Shears ✂️ &bull; Pope’s Tiara 👑 &bull; Broken Chain ⛓️
              </div>
            </div>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 28mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
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
            <p style="font-family: 'Georgia', serif; font-size: 7.8pt; color: #000000; margin: 0 0 2px 0; line-height: 1.2;">
              Thomas Cromwell surveys monastic wealth (Valor Ecclesiasticus); over 800 monasteries are closed, confiscating lead, gold, and lands to fund royal coastal fortifications.
            </p>
            <div style="background: #fafafa; border: 1px solid #000000; border-radius: 3px; padding: 2px 6px; margin-bottom: 2px;">
              <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; color: #000000;">
                🎨 Drawing Challenge: The Monastery Meltdown
              </div>
              <div style="font-family: 'Georgia', serif; font-size: 7pt; color: #222222; line-height: 1.2;">
                Sketch Thomas Cromwell wheeling cartloads of melted lead roof tiles and golden chalices away from a dissolved abbey to build King Henry's coastal artillery forts.
              </div>
              <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; color: #444444; margin-top: 1px;">
                Quick-Draw: Handcart 🛒 &bull; Melted Lead 🪙 &bull; Castle Fortress 🏰
              </div>
            </div>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 28mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
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
            <p style="font-family: 'Georgia', serif; font-size: 7.8pt; color: #000000; margin: 0 0 2px 0; line-height: 1.2;">
              The Acts of Supremacy and Uniformity establish the Via Media (‘Middle Way’), making Elizabeth ‘Supreme Governor’ and enforcing the 1559 Book of Common Prayer.
            </p>
            <div style="background: #fafafa; border: 1px solid #000000; border-radius: 3px; padding: 2px 6px; margin-bottom: 2px;">
              <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; color: #000000;">
                🎨 Drawing Challenge: The Tudor Tightrope Walk
              </div>
              <div style="font-family: 'Georgia', serif; font-size: 7pt; color: #222222; line-height: 1.2;">
                Sketch Queen Elizabeth I balancing on a tightrope labelled 'Via Media', holding a Protestant Bible in one hand and a Catholic crucifix in the other, smiling as extremists shout below.
              </div>
              <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; color: #444444; margin-top: 1px;">
                Quick-Draw: Tightrope Walker 🎪 &bull; Open Bible 📖 &bull; Balancing Cross ⚖️
              </div>
            </div>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 28mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
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
            <p style="font-family: 'Georgia', serif; font-size: 7.8pt; color: #000000; margin: 0 0 2px 0; line-height: 1.2;">
              English fireships scatter King Philip II’s 130-ship Armada off Calais; broadside cannons and fierce North Sea gales destroy Spanish hopes of restoring Catholicism.
            </p>
            <div style="background: #fafafa; border: 1px solid #000000; border-radius: 3px; padding: 2px 6px; margin-bottom: 2px;">
              <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; color: #000000;">
                🎨 Drawing Challenge: The Midnight Hellburners of Calais
              </div>
              <div style="font-family: 'Georgia', serif; font-size: 7pt; color: #222222; line-height: 1.2;">
                Sketch eight blazing English fireships crashing into the anchored Spanish Armada at midnight, Spanish galleons desperately slicing their anchor cables in panic.
              </div>
              <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; color: #444444; margin-top: 1px;">
                Quick-Draw: Blazing Sails 🔥 &bull; Sliced Anchor Cable ⚓ &bull; Scattering Galleons ⛵
              </div>
            </div>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 28mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>

      </div>

      ${renderFooterStrip(10, 'Centrefold timeline: Dual-coding sketches and dates turns narrative history into permanent long-term memory.', 20)}
    </div>
  </div>

  <!-- PAGE 11: LIVING TIMELINE PART 2 (MILESTONES 5–8) -->
  <div class="page page-container recto-page" id="page-11" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div>
        <div style="border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 5px;">
          <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 11pt; color: #000000; text-transform: uppercase; font-weight: 800;">
            Living Timeline &bull; Part 2: Civil War, Regicide &amp; The Bill of Rights (1603–1689)
          </h2>
        </div>

        <div style="border-bottom: 1px solid #000000; padding-bottom: 3px; margin-bottom: 6px; font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #000000;">
          <strong>Living Timeline Dual-Coding Protocol:</strong> Complete each milestone sketchpad using dual-coding (combining visual storytelling symbols, causal arrows, and dates) to master the chronological spine across the centre-fold.
        </div>
      </div>

      <!-- 4 Milestones with Large Blank Dual-Coding Workspace -->
      <div style="display: flex; flex-direction: column; gap: 5px; flex: 1; justify-content: space-between;">
        
        <!-- Milestone 5: 1629–1640 -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #000000;">
                1629–1640 &bull; Charles I’s ‘Personal Rule’ &amp; Ship Money
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Enquiry 4</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 7.8pt; color: #000000; margin: 0 0 2px 0; line-height: 1.2;">
              Charles I rules without Parliament for eleven years, raising unparliamentary funds through Ship Money; John Hampden’s refusal to pay sparks nationwide tax resistance.
            </p>
            <div style="background: #fafafa; border: 1px solid #000000; border-radius: 3px; padding: 2px 6px; margin-bottom: 2px;">
              <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; color: #000000;">
                🎨 Drawing Challenge: The Inland Navy Absurdity
              </div>
              <div style="font-family: 'Georgia', serif; font-size: 7pt; color: #222222; line-height: 1.2;">
                Sketch King Charles I's royal sheriff demanding coastal 'Ship Money' gold from a bewildered farmer standing in a dusty field miles away from the sea.
              </div>
              <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; color: #444444; margin-top: 1px;">
                Quick-Draw: Bewildered Farmer 👨‍🌾 &bull; Landlocked Haystack 🌾 &bull; Royal Tax Bag 💰
              </div>
            </div>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 28mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
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
            <p style="font-family: 'Georgia', serif; font-size: 7.8pt; color: #000000; margin: 0 0 2px 0; line-height: 1.2;">
              Pride’s Purge clears moderate MPs; the Rump Parliament convicts Charles I of high treason as a ‘tyrant, traitor, and murderer’; the King is beheaded on 30 January 1649.
            </p>
            <div style="background: #fafafa; border: 1px solid #000000; border-radius: 3px; padding: 2px 6px; margin-bottom: 2px;">
              <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; color: #000000;">
                🎨 Drawing Challenge: The Crown on the Block
              </div>
              <div style="font-family: 'Georgia', serif; font-size: 7pt; color: #222222; line-height: 1.2;">
                Sketch the executioner's chopping block outside the Banqueting House at Whitehall, with a royal crown sitting on the block before a silent crowd.
              </div>
              <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; color: #444444; margin-top: 1px;">
                Quick-Draw: Chopping Block 🪓 &bull; Fallen Crown 👑 &bull; Whitehall Window 🏛️
              </div>
            </div>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 28mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
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
            <p style="font-family: 'Georgia', serif; font-size: 7.8pt; color: #000000; margin: 0 0 2px 0; line-height: 1.2;">
              Fearing a permanent Catholic dynasty under James II, seven prominent peers invite Dutch Prince William of Orange; James flees and William lands with 15,000 troops.
            </p>
            <div style="background: #fafafa; border: 1px solid #000000; border-radius: 3px; padding: 2px 6px; margin-bottom: 2px;">
              <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; color: #000000;">
                🎨 Drawing Challenge: The Midnight Thames Splash
              </div>
              <div style="font-family: 'Georgia', serif; font-size: 7pt; color: #222222; line-height: 1.2;">
                Sketch King James II fleeing London in the dead of night, secretly hurling the heavy Great Seal of the Realm into the cold, dark River Thames.
              </div>
              <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; color: #444444; margin-top: 1px;">
                Quick-Draw: Rowboat in Fog 🚣 &bull; Sinking Great Seal 🌊 &bull; Cloaked King 👑
              </div>
            </div>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 28mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
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
            <p style="font-family: 'Georgia', serif; font-size: 7.8pt; color: #000000; margin: 0 0 2px 0; line-height: 1.2;">
              William III and Mary II accept the Crown subject to the Bill of Rights, establishing that the King cannot raise taxes, suspend laws, or keep a standing army without Parliament.
            </p>
            <div style="background: #fafafa; border: 1px solid #000000; border-radius: 3px; padding: 2px 6px; margin-bottom: 2px;">
              <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; color: #000000;">
                🎨 Drawing Challenge: The Clipped Crown Contract
              </div>
              <div style="font-family: 'Georgia', serif; font-size: 7pt; color: #222222; line-height: 1.2;">
                Sketch Parliament handing King William III and Queen Mary II the Crown, but with a pair of legal hedge-clippers trimming away the powers of taxation and arrest.
              </div>
              <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; color: #444444; margin-top: 1px;">
                Quick-Draw: Legal Scroll 📜 &bull; Trimmed Crown 👑 &bull; Parliamentary Mace 🏛️
              </div>
            </div>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 28mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>

      </div>

      ${renderFooterStrip(11, 'From 1534 to 1689, Parliament evolved from Henry VIII’s occasional legal tool into the sovereign ruler of the Crown.', 20)}
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
  <!-- PAGE 14: SYNOPTIC ESSAY RESPONSE & VOCABULARY BANK -->
  <div class="page page-container verso-page" id="page-14" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Essay Question Stem & Stimulus Box -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 6px 10px; background: #ffffff; margin-bottom: 5px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 3px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px;">
            Synoptic Extended Writing
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; border: 1px solid #000000; padding: 1px 6px; border-radius: 2px;">
            16 marks + 4 SPaG &bull; 25 mins
          </span>
        </div>
        <div style="font-family: 'Playfair Display', serif; font-size: 9.6pt; font-weight: 900; color: #000000; margin-bottom: 4px; line-height: 1.25;">
          “The execution of King Charles I in 1649 was the most decisive turning point in the struggle for power between Crown, Church, and Parliament in the period 1517–1689.” How far do you agree?
        </div>
        <div style="display: flex; align-items: center; gap: 8px; font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #000000;">
          <strong>Stimulus:</strong>
          <span style="border: 1px solid #000000; padding: 1px 7px; border-radius: 2px; font-weight: 700;">The Act of Supremacy (1534)</span>
          <span style="border: 1px solid #000000; padding: 1px 7px; border-radius: 2px; font-weight: 700;">The Bill of Rights (1689)</span>
          <span style="font-style: italic; color: #333333;">(You must also use information of your own)</span>
        </div>
      </div>

      <!-- Connectives & Key Vocabulary Bank (Zero Scaffolding Answers) -->
      <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 4px 8px; background: #ffffff; margin-bottom: 5px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
        <div>
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase; display: block; margin-bottom: 1px;">Analytical Connectives:</strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-style: italic; color: #111111; line-height: 1.22; display: block;">
            Furthermore &bull; Consequently &bull; In stark contrast &bull; Most decisively &bull; Crucially &bull; Although... nevertheless &bull; In the final analysis
          </span>
        </div>
        <div>
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase; display: block; margin-bottom: 1px;">Key Vocabulary Bank:</strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #111111; line-height: 1.22; display: block;">
            Royal Prerogative &bull; Divine Right &bull; Regicide &bull; Protectorate &bull; Constitutional Monarchy &bull; Bill of Rights &bull; Statutory Supremacy
          </span>
        </div>
      </div>

      <!-- Ruled Lines for Thesis Statement & Introduction (with 18mm Left Teacher Margin) -->
      <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; color: #000000; margin-bottom: 2px;">
        Essay Response &bull; Introduction &amp; Paragraph 1:
      </div>
      <div class="lined-page-grid" style="margin-bottom: 4px; flex: 1;">
        ${Array.from({ length: 27 }, (_, idx) => {
          const isFirst = idx === 0;
          const marginContent = isFirst
            ? `<span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #555555; text-transform: uppercase; font-weight: 700;">Margin</span>`
            : `&nbsp;`;
          return `
            <div class="lined-row">
              <div class="lined-margin-cell">${marginContent}</div>
              <div class="lined-content-cell">&nbsp;</div>
            </div>`;
        }).join('')}
      </div>

      ${renderFooterStrip(14, 'In 16-mark essays, never sit on the historical fence until splinters become structural. Take a decisive stand with precise dates.', 20)}
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

      ${renderFooterStrip(15, 'One precise historical fact (like ‘1689 Bill of Rights’) is worth ten vague sentences about people being angry.', 20)}
    </div>
  </div>
`;

  // ====================================================================
  // PAGES 16–18: SEN-ACCESSIBLE DUAL-RETRIEVAL QUIZZING (24 QUESTIONS TOTAL • 48 MARKS)
  // Page 16 (Verso): Enquiry 1 & 2 (Questions 1–8) [16 marks]
  // Page 17 (Recto): Enquiry 3 & 4 (Questions 9–16) [16 marks]
  // Page 18 (Verso): Enquiry 5 & Synoptic Turning Points (Questions 17–24) [16 marks]
  // ====================================================================

  // PAGE 16 (VERSO): DUAL-RETRIEVAL PART 1 (ENQUIRIES 1 & 2 • QS 1–8)
  html += renderDualRetrievalPage(
    16,
    'Dual-Retrieval Practice Bank &bull; Part 1: Enquiries 1 &amp; 2',
    'Standardised Active Recall &bull; Core Answer + Causal Explanation Structure',
    '[16 MARKS &bull; 8 QUESTIONS]',
    dualRetrievalBank.slice(0, 8),
    'Dual-Retrieval Rule: A fact without an explanation is like a sword without a blade—you need both to score full marks.',
  );

  // PAGE 17 (RECTO): DUAL-RETRIEVAL PART 2 (ENQUIRIES 3 & 4 • QS 9–16)
  html += renderDualRetrievalPage(
    17,
    'Dual-Retrieval Practice Bank &bull; Part 2: Enquiries 3 &amp; 4',
    'Standardised Active Recall &bull; Core Answer + Causal Explanation Structure',
    '[16 MARKS &bull; 8 QUESTIONS]',
    dualRetrievalBank.slice(8, 16),
    'Drake’s 1587 raid destroyed so many seasoned barrel staves that Spanish drinking water spoiled before reaching England.',
  );

  // PAGE 18 (VERSO): DUAL-RETRIEVAL PART 3 (ENQUIRY 5 & SYNOPTIC • QS 17–24)
  html += renderDualRetrievalPage(
    18,
    'Dual-Retrieval Practice Bank &bull; Part 3: Enquiry 5 &amp; Synoptic Turning Points',
    'Standardised Active Recall &bull; Core Answer + Causal Explanation Structure',
    '[16 MARKS &bull; 8 QUESTIONS]',
    dualRetrievalBank.slice(16, 24),
    'In 1649, Parliament proved kings could be beheaded; in 1689, they proved paperwork and statutory law were far more permanent.',
  );

  // ====================================================================
  // PAGE 19: COMPLETE DEPARTMENT ANSWER BANK & EXAMINER TRAP MATRIX
  // ====================================================================
  html += renderAnswerBankPage(
    19,
    'Department Answer Key: Self-assess in green pen. If your answer missed the causal explanation, improve it directly.',
  );

  // ====================================================================
  // PAGE 20: OUTSIDE BACK COVER (PROGRESS LEDGER + 5 QR CODES - MEDICINE STYLE)
  // ====================================================================
  html += `
  <!-- PAGE 20: OUTSIDE BACK COVER -->
  <div class="page page-container verso-page" id="page-20" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Back Cover Header Strip -->
      <div style="border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 6px;">
        <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 11.5pt; color: #000000; text-transform: uppercase; font-weight: 900; letter-spacing: 0.5px;">
          Key Stage 3 History &bull; Pupil Progress &amp; Assessment Record
        </h2>
      </div>

      <!-- Pupil Details & Target Level Strip -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 7px 12px; background: #ffffff; display: grid; grid-template-columns: 2fr 1fr 1.3fr; gap: 14px; align-items: center; margin-bottom: 5px;">
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #000000; text-transform: uppercase; margin-right: 8px;">Pupil Name:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #000000; height: 14px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #000000; text-transform: uppercase; margin-right: 8px;">Class:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #000000; height: 14px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #000000; text-transform: uppercase; margin-right: 8px;">Target KS3 Level:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #000000; height: 14px; text-align: center; font-weight: 900;"></div>
        </div>
      </div>

      <!-- KS3 History Progress Pathways & Descriptors -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 6px 8px; background: #ffffff; margin-bottom: 5px; font-family: 'Inter', sans-serif;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.2px solid #000000; padding-bottom: 3px; margin-bottom: 4px;">
          <strong style="font-size: 8pt; text-transform: uppercase; letter-spacing: 0.5px;">
            Key Stage 3 History Assessment Pathways &bull; Level Descriptors &amp; Criteria
          </strong>
          <span style="font-size: 7.2pt; font-weight: 800; color: #000000;">YEAR 8 STANDARDS</span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 5px; font-size: 7pt; line-height: 1.3;">
          <div style="border: 1px solid #000000; border-radius: 3px; padding: 5px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-weight: 900; border-bottom: 1px solid #000000; padding-bottom: 2px; margin-bottom: 3px; font-size: 7.2pt; text-transform: uppercase;">
                Emerging (1–2)
              </div>
              Recalls key historical narrative facts; describes basic Tudor/Stuart events using guided sentence starters.
            </div>
            <div style="margin-top: 4px; font-size: 6.4pt; font-style: italic; border-top: 1px dashed #cccccc; padding-top: 2px; color: #333333;">
              <strong>Focus:</strong> Add dates &amp; key vocabulary.
            </div>
          </div>
          <div style="border: 1px solid #000000; border-radius: 3px; padding: 5px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-weight: 900; border-bottom: 1px solid #000000; padding-bottom: 2px; margin-bottom: 3px; font-size: 7.2pt; text-transform: uppercase;">
                Emerging Plus (3)
              </div>
              Identifies reasons for events; begins to describe causes of religious changes and civil conflict with structured paragraphs.
            </div>
            <div style="margin-top: 4px; font-size: 6.4pt; font-style: italic; border-top: 1px dashed #cccccc; padding-top: 2px; color: #333333;">
              <strong>Focus:</strong> Explain *why*, not just *what*.
            </div>
          </div>
          <div style="border: 1px solid #000000; border-radius: 3px; padding: 5px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-weight: 900; border-bottom: 1px solid #000000; padding-bottom: 2px; margin-bottom: 3px; font-size: 7.2pt; text-transform: uppercase;">
                Expected (4–5)
              </div>
              Explains multiple causes &amp; consequences; writes structured causal paragraphs using precise statutes and dates.
            </div>
            <div style="margin-top: 4px; font-size: 6.4pt; font-style: italic; border-top: 1px dashed #cccccc; padding-top: 2px; color: #333333;">
              <strong>Focus:</strong> Compare relative importance.
            </div>
          </div>
          <div style="border: 1px solid #000000; border-radius: 3px; padding: 5px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-weight: 900; border-bottom: 1px solid #000000; padding-bottom: 2px; margin-bottom: 3px; font-size: 7.2pt; text-transform: uppercase;">
                Expected Plus (6–7)
              </div>
              Analyses causal significance; evaluates competing historical interpretations and weighs counter-arguments with detailed evidence.
            </div>
            <div style="margin-top: 4px; font-size: 6.4pt; font-style: italic; border-top: 1px dashed #cccccc; padding-top: 2px; color: #333333;">
              <strong>Focus:</strong> Sustained historical criteria.
            </div>
          </div>
          <div style="border: 1px solid #000000; border-radius: 3px; padding: 5px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-weight: 900; border-bottom: 1px solid #000000; padding-bottom: 2px; margin-bottom: 3px; font-size: 7.2pt; text-transform: uppercase;">
                Greater Depth (8–9)
              </div>
              Sustained, nuanced evaluative judgement; synthesises constitutional, political, and religious change across the 1517–1689 period.
            </div>
            <div style="margin-top: 4px; font-size: 6.4pt; font-style: italic; border-top: 1px dashed #cccccc; padding-top: 2px; color: #333333;">
              <strong>Focus:</strong> Nuanced historical judgement.
            </div>
          </div>
        </div>
      </div>

      <!-- Streamlined KS3 Marking Grid (Low-Friction & Periodic Marking Standard) -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; overflow: hidden; margin-bottom: 5px;">
        <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif; font-size: 8pt;">
          <thead>
            <tr style="background: #000000; color: #ffffff;">
              <th style="padding: 7px 4px; width: 10%; text-align: center; border-right: 1px solid #444444; font-size: 7.5pt; text-transform: uppercase;">Date</th>
              <th style="padding: 7px 8px; width: 43%; text-align: left; border-right: 1px solid #444444; font-size: 7.5pt; text-transform: uppercase;">Enquiry &bull; Assessment Focus</th>
              <th style="padding: 7px 6px; width: 17%; text-align: center; border-right: 1px solid #444444; font-size: 7.5pt; text-transform: uppercase;">KS3 Level / Effort</th>
              <th style="padding: 7px 8px; width: 30%; text-align: left; font-size: 7.5pt; text-transform: uppercase;">Teacher Comment / Spellings</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 16px 4px; border-right: 1px solid #000000; text-align: center;">&nbsp;</td>
              <td style="padding: 16px 8px; border-right: 1px solid #000000;">
                <div style="font-weight: 900; font-size: 8.5pt;">Enquiry 1: Henry VIII &amp; Break with Rome</div>
                <div style="font-size: 7.5pt; color: #333333; margin-top: 2px;">Causal Explanation: Break with Rome (1527–34)</div>
              </td>
              <td style="padding: 16px 6px; border-right: 1px solid #000000; text-align: center; vertical-align: middle;">
                &nbsp;
              </td>
              <td style="padding: 16px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 16px 4px; border-right: 1px solid #000000; text-align: center;">&nbsp;</td>
              <td style="padding: 16px 8px; border-right: 1px solid #000000;">
                <div style="font-weight: 900; font-size: 8.5pt;">Enquiry 2: Elizabeth I &amp; Religious Settlement</div>
                <div style="font-size: 7.5pt; color: #333333; margin-top: 2px;">Source Utility &amp; Consequence of Middle Way</div>
              </td>
              <td style="padding: 16px 6px; border-right: 1px solid #000000; text-align: center; vertical-align: middle;">
                &nbsp;
              </td>
              <td style="padding: 16px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 16px 4px; border-right: 1px solid #000000; text-align: center;">&nbsp;</td>
              <td style="padding: 16px 8px; border-right: 1px solid #000000;">
                <div style="font-weight: 900; font-size: 8.5pt;">Enquiry 3: Spanish Armada &amp; Naval Power</div>
                <div style="font-size: 7.5pt; color: #333333; margin-top: 2px;">Analytical Narrative: Defeat of the Armada (1588)</div>
              </td>
              <td style="padding: 16px 6px; border-right: 1px solid #000000; text-align: center; vertical-align: middle;">
                &nbsp;
              </td>
              <td style="padding: 16px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 16px 4px; border-right: 1px solid #000000; text-align: center;">&nbsp;</td>
              <td style="padding: 16px 8px; border-right: 1px solid #000000;">
                <div style="font-weight: 900; font-size: 8.5pt;">Enquiry 4: Causes of the English Civil War</div>
                <div style="font-size: 7.5pt; color: #333333; margin-top: 2px;">Causal Essay: Divine Right vs Parliament (1642)</div>
              </td>
              <td style="padding: 16px 6px; border-right: 1px solid #000000; text-align: center; vertical-align: middle;">
                &nbsp;
              </td>
              <td style="padding: 16px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 16px 4px; border-right: 1px solid #000000; text-align: center;">&nbsp;</td>
              <td style="padding: 16px 8px; border-right: 1px solid #000000;">
                <div style="font-weight: 900; font-size: 8.5pt;">Enquiry 5: Trial of Charles I &amp; Bill of Rights</div>
                <div style="font-size: 7.5pt; color: #333333; margin-top: 2px;">Evaluative Judgement: Turning point in Crown vs Parliament</div>
              </td>
              <td style="padding: 16px 6px; border-right: 1px solid #000000; text-align: center; vertical-align: middle;">
                &nbsp;
              </td>
              <td style="padding: 16px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
            <tr style="border-bottom: 1px solid #000000; background: #fafafa;">
              <td style="padding: 16px 4px; border-right: 1px solid #000000; text-align: center;">&nbsp;</td>
              <td style="padding: 16px 8px; border-right: 1px solid #000000;">
                <div style="font-weight: 900; font-size: 8.5pt;">Synoptic Dual Retrieval: 24-Question Mastery Bank</div>
                <div style="font-size: 7.5pt; color: #333333; margin-top: 2px;">Pages 16–18 Dual Retrieval (Fact + Causal Explanation)</div>
              </td>
              <td style="padding: 16px 6px; border-right: 1px solid #000000; text-align: center; vertical-align: middle;">
                &nbsp;
              </td>
              <td style="padding: 16px 8px; background: #fafafa;">&nbsp;</td>
            </tr>
            <tr style="background: #ffffff; border-top: 1.5px solid #000000;">
              <td style="padding: 16px 4px; border-right: 1px solid #000000; text-align: center;">&nbsp;</td>
              <td style="padding: 16px 8px; border-right: 1px solid #000000;">
                <div style="font-weight: 900; font-size: 8.5pt;">Unit Assessment: Monarchy, Religion &amp; Power</div>
                <div style="font-size: 7.5pt; color: #333333; margin-top: 2px;">End-of-Unit Summative Extended Assessment</div>
              </td>
              <td style="padding: 16px 6px; border-right: 1px solid #000000; text-align: center; vertical-align: middle;">
                &nbsp;
              </td>
              <td style="padding: 16px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Interactive Digital Quizzing Hub (Medicine Style) -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 6px 8px; background: #ffffff;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000000; padding-bottom: 2px; margin-bottom: 4px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; text-transform: uppercase;">
            📱 Interactive Digital Quizzing Hub &bull; Scan for Instant Retrieval Practice
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 700; border: 1px solid #000000; padding: 0 4px; border-radius: 2px;">
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
          <div style="border: 1px solid #000000; border-radius: 3px; padding: 5px 2px; background: #ffffff; display: flex; flex-direction: column; align-items: center; justify-content: space-between;">
            <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; margin-bottom: 1px;">
              Enquiry ${cfg.lessonNum}
            </div>
            <div style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 700; color: #333333; margin-bottom: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%;">
              ${shortLabels[idx]}
            </div>
            <div style="width: 24mm; height: 24mm; margin: 0 auto 2px auto;">
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

      ${renderFooterStrip(20, "Unlike Charles I in 1642, scanning these revision QR codes won't cost your head. Test yourself before the end-of-unit assessment.", 20)}
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
