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
        paraRef: '[1.1]',
        date: '1517–1521',
        questionHeading: 'How did Martin Luther’s protest spark the Reformation across Europe?',
        bullets: [
          'Wittenberg Church Door',
          'Paying for Forgiveness',
          'Defender of the Faith Title',
        ],
        focusClue:
          'How did Luther’s attack on papal corruption shatter European unity and earn Henry the title ‘Defender of the Faith’?',
      },
      {
        step: 2,
        paraRef: '[1.2]',
        date: '1525–1527',
        questionHeading: 'Why did the royal marriage become an urgent dynastic crisis?',
        bullets: ['Need for a Son', 'Bible Warning on Marriage', 'Love for Anne Boleyn'],
        focusClue:
          'Why did Henry believe that without a son, England would collapse into civil war?',
      },
      {
        step: 3,
        paraRef: '[1.3]',
        date: '1527–1529',
        questionHeading: 'Why did Pope Clement VII refuse Henry’s annulment request?',
        bullets: ['Emperor Attacks Rome', 'Pope Held Prisoner', 'Church Trial Cancelled'],
        focusClue: 'Why did European power politics prevent the Pope from granting the annulment?',
      },
      {
        step: 4,
        paraRef: '[1.4]',
        date: '1529–1533',
        questionHeading: 'How did Thomas Cromwell use Parliament to pressure the Church?',
        bullets: ['Threatening Church Fines', 'Stopping Taxes to Rome', 'Banning Appeals to Pope'],
        focusClue:
          'How did declaring England an ‘Empire’ and banning appeals to Rome legally isolate the Pope?',
      },
      {
        step: 5,
        paraRef: '[1.5]',
        date: '1534',
        questionHeading: 'How did the Act of Supremacy legally consolidate royal sovereignty?',
        bullets: ['Head of the Church', 'Forced Treason Oaths', 'Breaking Ties with Rome'],
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
          text: 'Analyse the urgent requirement for an undisputed male heir and the diplomatic obstacle posed by Habsburg influence in Rome.',
        },
        {
          col: '2. CROWN FINANCES',
          text: 'Analyse the fiscal incentives of subordinating ecclesiastical revenues, first fruits, and property to the royal treasury.',
        },
        {
          col: '3. IMPERIAL SOVEREIGNTY',
          text: 'Evaluate the constitutional doctrine that England was an autonomous empire subject to no external foreign jurisdiction.',
        },
      ],
      connectives:
        'A primary catalyst for religious divergence was... &bull; In particular, dynastic vulnerabilities created... &bull; Furthermore, legal manoeuvres demonstrated that... &bull; Crucially, statutory enactments established... &bull; Consequently, long-term sovereignty...',
      wordBank:
        'Royal Supremacy &bull; Act of Supremacy (1534) &bull; annulment &bull; Catherine of Aragon &bull; Anne Boleyn &bull; Thomas Cromwell &bull; Pope Clement VII &bull; Emperor Charles V &bull; Valor Ecclesiasticus &bull; Act in Restraint of Appeals (1533)',
      timelineMission:
        '<strong>Milestone 1 (Wittenberg Door &bull; 1517):</strong> Sketch Martin Luther nailing the 95 Theses to the church door while the Pope counts indulgence coins [🔨 hammer &bull; 📜 95 Theses &bull; 💰 crossed-out gold coins].<br style="display:block; margin-top:2px;"><strong>Milestone 2 (The Double-Crown Snip &amp; Abbey Meltdown &bull; 1534–40):</strong> Sketch Henry VIII using golden shears to snip the papal cable while Cromwell carts away abbey lead [✂️ shears &bull; 👑 double crown &bull; 🛒 melted lead handcart].',
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
        paraRef: '[2.1]',
        date: '1558–1559',
        questionHeading: 'Why was England religiously fractured when Elizabeth became Queen?',
        bullets: [
          'Protestants Burned at Stake',
          'Fierce Religious Hatred',
          'Return of Strict Puritans',
        ],
        focusClue: 'Why did Mary I’s burnings produce profound anti-Catholic fear across England?',
      },
      {
        step: 2,
        paraRef: '[2.2]',
        date: '1559',
        questionHeading: 'How did the Act of Supremacy restore royal control through compromise?',
        bullets: [
          'Title of Supreme Governor',
          'Loyalty Oaths for Priests',
          'Sacking Catholic Bishops',
        ],
        focusClue:
          'Why was the title ‘Supreme Governor’ a clever compromise for moderate subjects?',
      },
      {
        step: 3,
        paraRef: '[2.3]',
        date: '1559',
        questionHeading: 'How did the Act of Uniformity establish the ‘Middle Way’ (Via Media)?',
        bullets: [
          'One Shared Prayer Book',
          'Clever Compromise Wording',
          'Sunday Church Fines (12d)',
        ],
        focusClue:
          'Why did Elizabeth state that she had ‘no desire to make windows into men’s souls’?',
      },
      {
        step: 4,
        paraRef: '[2.4]',
        date: '1568–1570',
        questionHeading: 'How did Mary Queen of Scots and the Papal Bull spark Catholic plots?',
        bullets: ['Northern Earls Rebel', 'Secret Catholic Mass', 'Pope Orders Elizabeth Deposed'],
        focusClue: 'How did the 1570 Papal Bull turn practicing Catholics into suspected traitors?',
      },
      {
        step: 5,
        paraRef: '[2.5]',
        date: '1571–1588',
        questionHeading: 'How did Walsingham’s spy network lead to Mary’s execution?',
        bullets: ['Letters Hidden in Barrels', 'Secret Code Broken', 'Death Warrant Signed'],
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
        hint: 'Consider the extent to which state enforcement shifted from active heresy persecutions to formal demands for outward legal conformity.',
        stems:
          'One way religious policy differed was... &bull; Under Mary I, religious dissent was punished by... &bull; In contrast, Elizabeth I...',
      },
      partB: {
        tariff: 'Question 3(b): Explain Importance [8 marks &bull; 10 mins]',
        question:
          'Explain the importance of the Elizabethan Religious Settlement (1559) for religious stability in England. [8 marks]',
        structureStrip: [
          {
            col: '1. THEOLOGICAL COMPROMISE',
            text: 'Analyse how deliberately ambiguous liturgical language and ritual continuities defused widespread provincial resistance.',
          },
          {
            col: '2. ENFORCEMENT & CONFORMITY',
            text: 'Evaluate how legislative supremacy oaths and financial penalties established state control while discouraging foreign intervention.',
          },
        ],
        connectives:
          'This was of paramount importance because... &bull; Specifically, structural compromise prevented... &bull; Furthermore, the statutory settlement established that... &bull; Crucially, national stability was secured because...',
        wordBank:
          'Via Media &bull; Act of Supremacy (1559) &bull; Supreme Governor &bull; Act of Uniformity &bull; Book of Common Prayer &bull; Recusancy fines &bull; outward conformity',
      },
      timelineMissionTitle: 'Centrefold Sketch Challenge 3',
      timelineMission:
        '<strong>Milestone 3 (The Tudor Tightrope Walk &bull; 1559):</strong> Sketch Queen Elizabeth I balancing on a tightrope labelled ‘Via Media’, holding an English Protestant Bible in one hand and a Catholic crucifix in the other, smiling as Catholic and Puritan extremists shout below [🎪 tightrope walker &bull; 📖 open Bible &bull; ⚖️ balancing cross].',
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
        paraRef: '[3.1]',
        date: '1585–1587',
        questionHeading: 'What imperial and religious rivalries provoked Philip II’s invasion?',
        bullets: [
          'Help for Dutch Rebels',
          'Drake Stealing Spanish Gold',
          'Mary Queen of Scots Beheaded',
        ],
        focusClue: 'Why did Philip view invading England as a holy crusade against Protestantism?',
      },
      {
        step: 2,
        paraRef: '[3.2]',
        date: '1587',
        questionHeading: 'How did Drake’s raid on Cadiz delay the Spanish invasion?',
        bullets: ['Burning Food Barrels', 'Rotten Water and Bread', 'Fleet Held Back for a Year'],
        focusClue:
          'How did burning seasoned barrel wood ruin Spanish water and food supplies at sea?',
      },
      {
        step: 3,
        paraRef: '[3.3]',
        date: 'July 1588',
        questionHeading: 'How did the English fleet harry the Armada up the English Channel?',
        bullets: [
          '130 Ships in Crescent Line',
          'Faster Race-Built Ships',
          'Firing Cannons from Afar',
        ],
        focusClue:
          'Why did long-range gunnery give the English fleet a decisive tactical advantage?',
      },
      {
        step: 4,
        paraRef: '[3.4]',
        date: '7–8 August 1588',
        questionHeading: 'How did English fireships at Calais shatter the Spanish formation?',
        bullets: [
          'Eight Burning Ghost Ships',
          'Cutting Anchor Ropes in Panic',
          'Scattering in the Dark',
        ],
        focusClue:
          'Why did cutting anchor cables leave Spanish ships helpless in rough North Sea weather?',
      },
      {
        step: 5,
        paraRef: '[3.5]',
        date: 'Aug–Sept 1588',
        questionHeading: 'How did the Battle of Gravelines and severe storms destroy the fleet?',
        bullets: ['Blasting Wooden Hulls', 'Fierce North Sea Gales', 'Shipwrecks on Irish Rocks'],
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
        hint: 'Consider naval architectural design, hull profiles, and how artillery battery configurations influenced manoeuvrability and reload rates.',
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
            col: '1. INITIAL ENGAGEMENTS',
            text: 'Analyse how defensive naval formations encountered long-range standoff gunnery during the initial channel approach.',
          },
          {
            col: '2. TACTICAL TURNING POINT',
            text: 'Evaluate how nighttime disruption at anchor dispersed the fleet and enabled close-range decisive broadsides.',
          },
          {
            col: '3. RETREAT & ADVERSE CONDITIONS',
            text: 'Explain how severe weather conditions and navigational hazards compounded losses during the northern return voyage.',
          },
        ],
        connectives:
          'The naval campaign commenced when... &bull; In response, maritime tactical operations... &bull; The decisive operational turning point occurred when... &bull; Following tactical disruption, subsequent engagements resulted in... &bull; Finally, severe environmental conditions...',
        wordBank:
          'Spanish Armada &bull; Medina Sidonia &bull; crescent formation &bull; Calais &bull; fireships (hellburners) &bull; Battle of Gravelines &bull; race-built galleons &bull; culverins &bull; Protestant Wind',
      },
      timelineMissionTitle: 'Centrefold Sketch Challenge 4',
      timelineMission:
        '<strong>Milestone 4 (The Midnight Hellburners of Calais &bull; 1588):</strong> Sketch eight blazing English fireships crashing into the anchored Spanish Armada at Calais at midnight, with Spanish galleons desperately slicing anchor cables in panic as the crescent formation shatters [🔥 blazing sails &bull; ⚓ sliced anchor cable &bull; ⛵ scattering galleons].',
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
        paraRef: '[4.1]',
        date: '1629–1640',
        questionHeading: 'Why did Charles I’s ‘Personal Rule’ without Parliament cause outrage?',
        bullets: [
          'Eleven Years with No MPs',
          'Ship Money on Inland Towns',
          'John Hampden Refuses to Pay',
        ],
        focusClue:
          'Why did inland Ship Money spark widespread constitutional outrage across England?',
      },
      {
        step: 2,
        paraRef: '[4.2]',
        date: '1640–1642',
        questionHeading: 'How did the breakdown of trust lead to armed civil conflict?',
        bullets: ['Guards Raid the Commons', 'Five MPs Escape by River', 'King Raises War Flag'],
        focusClue: 'Why did the King entering the Commons with armed soldiers make war inevitable?',
      },
      {
        step: 3,
        paraRef: '[4.3]',
        date: '1645–1648',
        questionHeading: 'How did the New Model Army defeat the King at the Battle of Naseby?',
        bullets: [
          'Full-Time Paid Redcoats',
          'Cromwell’s Cavalry Charges',
          'Royalists Routed and Captured',
        ],
        focusClue:
          'Why did Charles’s secret deal brand him in soldiers’ eyes as a treacherous ‘man of blood’?',
      },
      {
        step: 4,
        paraRef: '[4.4]',
        date: '1648–1649',
        questionHeading: 'Why did Pride’s Purge and the High Court lead to regicide?',
        bullets: [
          'Army Kicks Out Moderate MPs',
          'King Put on Trial for Treason',
          'Beheaded Outside Whitehall',
        ],
        focusClue:
          'On what constitutional grounds did Charles I refuse to recognize the trial court?',
      },
      {
        step: 5,
        paraRef: '[4.5]',
        date: '1660–1689',
        questionHeading: 'How did the Glorious Revolution permanently limit royal power?',
        bullets: [
          'Dutch Army Lands at Torbay',
          'James II Flees the Country',
          'Monarch Bound by the Law',
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
          col: '1. IDEOLOGICAL OBSTINACY',
          text: 'Analyse the refusal to accept binding constitutional constraints and the perception that negotiations were bad-faith stalling tactics.',
        },
        {
          col: '2. MILITARY RETALIATION',
          text: 'Explain how attempting to renew armed hostilities through external alliances hardened military resolve against the monarch.',
        },
        {
          col: '3. POLITICAL RADICALISATION',
          text: 'Evaluate how military intervention in the legislature removed political moderates and enabled unprecedented judicial action.',
        },
      ],
      connectives:
        'A primary catalyst for unprecedented judicial retribution was... &bull; In particular, adherence to absolute prerogative provoked... &bull; Furthermore, renewed armed conflict demonstrated that... &bull; Crucially, legislative purges ensured that... &bull; Consequently, judicial proceedings culminated in...',
      wordBank:
        'Divine Right of Kings &bull; Personal Rule (1629–1640) &bull; Ship Money &bull; Oliver Cromwell &bull; New Model Army &bull; Battle of Naseby &bull; ‘Man of Blood’ &bull; Second Civil War (1648) &bull; Pride’s Purge &bull; Rump Parliament &bull; Regicide (30 Jan 1649)',
      timelineMissionTitle: 'Centrefold Sketch Challenges 5 &amp; 6',
      timelineMission:
        '<strong>Milestone 5 (The Inland Navy Absurdity &bull; 1629–40):</strong> Sketch King Charles I’s royal sheriff demanding coastal Ship Money gold from a bewildered farmer in a landlocked field miles from the sea [👨‍🌾 bewildered farmer &bull; 🌾 landlocked haystack &bull; 💰 royal tax bag].<br style="display:block; margin-top:2px;"><strong>Milestone 6 (The Crown on the Block &bull; 1649):</strong> Sketch the executioner’s chopping block outside the Banqueting House at Whitehall on 30 January 1649, with the fallen royal crown resting on the block before a silent crowd [🪓 chopping block &bull; 👑 fallen crown &bull; 🏛️ Whitehall window].',
    },
    leftPageQuip:
      'Charles I insisted no earthly court could try a king; three days later, Parliament had him beheaded outside Whitehall.',
    rightPageQuip:
      'Oliver Cromwell called the 1649 regicide a ‘cruel necessity’; Royalists called it sacrilegious murder.',
  },
  {
    lessonNum: 5,
    id: 'lesson_5',
    title: 'Enquiry 5: Crown, Church, or Parliament? (1517–1689)',
    enquiryQuestion:
      'Which turning point decisively transformed the English state between 1517 and 1689?',
    specAnchor:
      'Synoptic evaluation of Royal Supremacy, Civil War, Regicide, and the 1689 Bill of Rights.',
    stages: [
      {
        step: 1,
        paraRef: '[5.1]',
        date: '1517–1534',
        questionHeading: 'How did Henry VIII reshape sovereign authority in the Reformation?',
        bullets: [
          'Pope Lost All English Power',
          'New Laws Made with MPs',
          'Monastery Lands Given Away',
        ],
        focusClue: 'Did the break with Rome increase royal prerogative or parliamentary authority?',
      },
      {
        step: 2,
        paraRef: '[5.2]',
        date: '1559–1588',
        questionHeading: 'How did the Elizabethan settlement forge a Protestant national state?',
        bullets: [
          'Compromise for Both Sides',
          'Fines for Missing Church',
          'United by Armada Victory',
        ],
        focusClue:
          'How did external Catholic threats unite Crown and Parliament during Elizabeth’s reign?',
      },
      {
        step: 3,
        paraRef: '[5.3]',
        date: '1603–1640',
        questionHeading: 'Why did Stuart claims of Divine Right provoke constitutional crisis?',
        bullets: [
          'Kings Claim Only God Rules Them',
          'Illegal Taxes Without Votes',
          'Scots Rebel Against English Rules',
        ],
        focusClue: 'Why did Stuart absolutism break down while Tudor compromise had succeeded?',
      },
      {
        step: 4,
        paraRef: '[5.4]',
        date: '1642–1649',
        questionHeading: 'Why was the trial and execution of Charles I a radical turning point?',
        bullets: [
          'Citizen Army Beat the King',
          'Monarch Held to the Law',
          'Abolishing the House of Lords',
        ],
        focusClue:
          'Why was publicly executing an anointed king the most shocking event in Tudor-Stuart history?',
      },
      {
        step: 5,
        paraRef: '[5.5]',
        date: '1660–1689',
        questionHeading: 'How did the 1689 Bill of Rights finalize Parliamentary Supremacy?',
        bullets: [
          'King Cannot Cancel Laws',
          'No Taxes Without MP Votes',
          'Contract with New Rulers',
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
        hint: 'Consider the permanent transfer of sovereign authority over taxation, standing armies, and legislative suspension to the elected assembly.',
        stems:
          'One major consequence was... &bull; Specifically, the Bill of Rights established that... &bull; Consequently, this permanently altered the constitution because...',
      },
      partB: {
        tariff: 'Question 5: Evaluative Judgement [12 marks &bull; 12 mins]',
        question:
          '‘The execution of Charles I in 1649 was the most significant turning point in the struggle between Crown and Parliament.’ How far do you agree? [12 marks]',
        structureStrip: [
          {
            col: '1. RADICAL REGICIDE & ABOLITION',
            text: 'Analyse how judicial regicide shattered the sacrosanct status of Divine Right and temporarily abolished monarchical governance.',
          },
          {
            col: '2. STATUTORY SETTLEMENT',
            text: 'Evaluate how permanent statutory limits bound the Crown to legal governance, parliamentary consent, and financial oversight.',
          },
          {
            col: '3. COMPARATIVE VERDICT',
            text: 'Weigh whether physical overthrow and republican experiments represented a more profound transformation than permanent statutory compromise.',
          },
        ],
        connectives:
          'A compelling argument supporting this statement is... &bull; On one hand, evidence suggests that... &bull; However, an alternative perspective is that... &bull; Crucially, enduring systemic reform was secured when... &bull; In conclusion, the decisive constitutional turning point was... because...',
        wordBank:
          'Regicide (1649) &bull; Divine Right of Kings &bull; High Court of Justice &bull; Glorious Revolution (1688) &bull; Bill of Rights (1689) &bull; William and Mary &bull; Constitutional Monarchy &bull; Parliamentary Sovereignty',
      },
      timelineMissionTitle: 'Centrefold Sketch Challenges 7 &amp; 8',
      timelineMission:
        '<strong>Milestone 7 (The Midnight Thames Splash &bull; 1688):</strong> Sketch King James II fleeing London by rowboat at midnight, secretly hurling the heavy Great Seal of the Realm into the cold, dark River Thames [🚣 rowboat in fog &bull; 🌊 sinking Great Seal &bull; 👑 cloaked king].<br style="display:block; margin-top:2px;"><strong>Milestone 8 (The Clipped Crown Contract &bull; 1689):</strong> Sketch Parliament presenting the Crown to William III and Mary II, with legal hedge-clippers trimming away royal powers over taxes, laws, and standing armies [📜 legal scroll &bull; 👑 trimmed crown &bull; 🏛️ parliamentary mace].',
    },
    leftPageQuip:
      'In 1689, William III accepted the Bill of Rights to secure war taxes, legally subordinating the Crown to Parliament.',
    rightPageQuip:
      'After monarchy, civil war, and military rule, Parliament decided in 1689 that binding written rules were the safest remedy.',
  },
];

// ============================================================================
// 4 DEDICATED PRIMARY SOURCE WORKSHOP CONFIGURATIONS (PLAN A1 STANDARD)
// Two Thematic Spreads: Tudor Lab (Pages 6–7) & Stuart Lab (Pages 16–17)
// Top Half: Source A (Written) + Provenance Clues + 3 Lines
// Bottom Half: Source B (Visual) + Visual Iconography Guide + 3 Lines
// Bottom Footer: 8-Mark "How Useful" Exam Challenge with Structure Strip
// ============================================================================
const sourceWorkshopConfigs = [
  // WORKSHOP 1 (PAGE 6): HENRY VIII & ROYAL SUPREMACY (1534)
  {
    workshopNum: 1,
    title: 'Tudor Source Workshop 1: Henry VIII & Royal Supremacy (1534)',
    tariff: 'Question 3(a): How Useful [8 marks &bull; 10–12 mins]',
    enquiryQuestion:
      'How useful are Sources A and B for an enquiry into how King Henry VIII established Royal Supremacy over the Church of England?',
    sourceA: {
      type: 'written',
      label: 'SOURCE A: Official Statute &bull; The Act of Supremacy (November 1534)',
      provenanceTitle: 'Provenance Analysis:',
      provenancePrompts: [
        '<strong>Nature:</strong> Official Act of Parliament with full force of English statutory law.',
        '<strong>Origin:</strong> Drafted by Thomas Cromwell and passed by the Reformation Parliament.',
        '<strong>Purpose:</strong> Legally assert supreme royal authority and deter papal resistance under threat of high treason.',
      ],
      text: '“Albeit the King’s Majesty justly and rightfully is and ought to be the supreme head of the Church of England... be it enacted by authority of this present Parliament that the King our sovereign lord, his heirs and successors kings of this realm, shall be taken, accepted, and reputed the only supreme head in earth of the Church of England... and shall have full power to correct and reform all manner of errors, heresies, and abuses within the same.”',
      analysisPrompt:
        'What does Source A prove about how Henry VIII made his religious supremacy legally binding upon all subjects?',
    },
    sourceB: {
      type: 'visual',
      label: 'SOURCE B: Contemporary Woodcut &bull; Title Page of the Great Bible (1539)',
      imageRelPath: 'images/great_bible_frontispiece.jpg',
      iconographyTitle: 'Iconography & Visual Evidence:',
      iconographyPrompts: [
        '<strong>1. Divine Authority:</strong> God in heaven blesses King Henry, who sits crowned on his throne.',
        '<strong>2. Royal Supremacy:</strong> Henry hands the Bible directly to Cranmer (Church) and Cromwell (Nobility).',
        '<strong>3. Eradication of the Pope:</strong> The Pope is completely absent from the national religious hierarchy.',
        '<strong>4. Popular Obedience:</strong> Subjects at the base shout <em>‘Vivat Rex’</em> and <em>‘God Save the King’</em>.',
      ],
      caption:
        'Title page of the Great Bible (1539), commissioned by Thomas Cromwell and authorized by King Henry VIII for every parish church in England.',
      analysisPrompt:
        'What visual message does Source B communicate about the King’s new position as head of both Church and State?',
    },
    structureStrip:
      '<strong>Structure Strip:</strong> <strong>Para 1:</strong> Source A (Content + Provenance: statutory parliamentary authority) &bull; <strong>Para 2:</strong> Source B (Visual Evidence + Purpose: royal propaganda of divine kingship) &bull; <strong>Verdict:</strong> Explain how combining legal statute with visual propaganda secured total Crown control.',
    quip: 'Henry VIII placed his face on every English Bible so no subject could ever forget who ran the Church.',
  },

  // WORKSHOP 2 (PAGE 7): ELIZABETH I & ROYAL AUTHORITY (1559–1588)
  {
    workshopNum: 2,
    title: 'Tudor Source Workshop 2: Elizabeth I & Royal Authority (1559–1588)',
    tariff: 'Question 3(a): How Useful [8 marks &bull; 10–12 mins]',
    enquiryQuestion:
      'How useful are Sources A and B for an enquiry into how Elizabeth I maintained authority and religious stability in England?',
    sourceA: {
      type: 'written',
      label: 'SOURCE A: Official Statute &bull; The Act of Uniformity (April 1559)',
      provenanceTitle: 'Provenance Analysis:',
      provenancePrompts: [
        '<strong>Nature:</strong> Parliamentary statute establishing compulsory national church attendance.',
        '<strong>Origin:</strong> Elizabethan government legislative compromise (The Via Media).',
        '<strong>Purpose:</strong> Enforce outward religious uniformity while avoiding Marian heresy burnings or open civil rebellion.',
      ],
      text: '“Every person and persons inhabiting within this realm shall diligently and faithfully, having no lawful or reasonable excuse to be absent, endeavour themselves to resort to their parish church... upon every Sunday and other days ordained to be kept as holy days, upon pain that every person so offending shall forfeit for every such offence twelve pence, to be levied by the churchwardens to the use of the poor.”',
      analysisPrompt:
        'What does Source A reveal about Elizabeth’s strategy of demanding outward obedience through fines rather than religious persecution?',
    },
    sourceB: {
      type: 'visual',
      label: 'SOURCE B: Royal Portraiture &bull; The Armada Portrait of Elizabeth I (c. 1588)',
      imageRelPath: 'images/armada_portrait.jpg',
      iconographyTitle: 'Iconography & Visual Evidence:',
      iconographyPrompts: [
        '<strong>1. Global Dominion:</strong> Elizabeth’s hand rests firmly on the globe, asserting English power over the Americas.',
        '<strong>2. Imperial Crown:</strong> Sits prominently behind the Queen, symbolizing independent imperial majesty.',
        '<strong>3. Providential Victory:</strong> Windows show the calm English fleet on the left, and Spanish galleons wrecked on the right.',
        '<strong>4. Virgin Purity:</strong> Pearls and bows symbolize chastity, national security, and God’s sacred protection.',
      ],
      caption:
        'The Armada Portrait (c. 1588), commemorating the defeat of Philip II’s invasion fleet and celebrating Elizabeth’s providential rule.',
      analysisPrompt:
        'How does Source B use visual symbols to convince English subjects that Elizabeth was chosen and protected by God?',
    },
    structureStrip:
      '<strong>Structure Strip:</strong> <strong>Para 1:</strong> Source A (Content + Provenance: pragmatic legal fines) &bull; <strong>Para 2:</strong> Source B (Visual Evidence + Purpose: providential imperial propaganda) &bull; <strong>Verdict:</strong> Weigh how statutory compromise and visual myth-making together secured national stability.',
    quip: 'Elizabeth I demanded 12-pence Sunday fines for missed church—expensive enough to enforce conformity without provoking martyrs.',
  },

  // WORKSHOP 3 (PAGE 16): CHARLES I & DIVINE RIGHT ON TRIAL (1649)
  {
    workshopNum: 3,
    title: 'Stuart Source Workshop 3: Charles I & Divine Right on Trial (1649)',
    tariff: 'Question 3(a): How Useful [8 marks &bull; 10–12 mins]',
    enquiryQuestion:
      'How useful are Sources A and B for an enquiry into why King Charles I was tried and executed in January 1649?',
    sourceA: {
      type: 'written',
      label:
        'SOURCE A: Verbatim Court Transcript &bull; Charles I at Westminster Hall (22 January 1649)',
      provenanceTitle: 'Provenance Analysis:',
      provenancePrompts: [
        '<strong>Nature:</strong> Official trial courtroom speech spoken directly by the King.',
        '<strong>Origin:</strong> High Court of Justice proceedings, recorded by parliamentary court scribes.',
        '<strong>Purpose:</strong> Deny that any human court holds legal jurisdiction over an anointed monarch answering only to God.',
      ],
      text: '“I would know by what power I am called hither... I would know by what authority, I mean lawful; for there are many unlawful authorities in the world, thieves and robbers by the highways... Remember I am your King, your lawful King! I have a trust committed unto me by God, by old and lawful descent; I will not betray it to answer to a new and unlawful authority. An earthly King cannot be tried by any court on earth!”',
      analysisPrompt:
        'What does Source A prove about Charles I’s unyielding refusal to compromise on the Divine Right of Kings?',
    },
    sourceB: {
      type: 'visual',
      label:
        'SOURCE B: Contemporary Broadside &bull; Execution of Charles I at Whitehall (30 January 1649)',
      imageRelPath: 'images/charles_i_execution.jpg',
      iconographyTitle: 'Iconography & Visual Evidence:',
      iconographyPrompts: [
        '<strong>1. The Scaffold:</strong> Erected outside the royal Banqueting House at Whitehall.',
        '<strong>2. The Severed Head:</strong> Executioner holds up the King’s head before a vast crowd.',
        '<strong>3. Military Guard:</strong> New Model Army cavalry and pikemen surround the scaffold to prevent public rebellion.',
        '<strong>4. Martyrdom Medallions:</strong> Top portraits frame Charles as a Christian martyr sacrifice.',
      ],
      caption:
        'Contemporary 1649 German broadside engraving depicting the public beheading of King Charles I outside the Banqueting House at Whitehall.',
      analysisPrompt:
        'What does Source B reveal about the public shock and military power required to carry out the King’s execution?',
    },
    structureStrip:
      '<strong>Structure Strip:</strong> <strong>Para 1:</strong> Source A (Content + Provenance: King’s constitutional defiance) &bull; <strong>Para 2:</strong> Source B (Visual Evidence + Context: military enforcement of regicide) &bull; <strong>Verdict:</strong> Explain how the irreconcilable clash between divine monarchy and military sovereignty made regicide inevitable.',
    quip: 'Charles I insisted no earthly court could try a king; three days later, Parliament had him beheaded outside Whitehall.',
  },

  // WORKSHOP 4 (PAGE 17): THE GLORIOUS REVOLUTION & SOVEREIGNTY (1688–1689)
  {
    workshopNum: 4,
    title: 'Stuart Source Workshop 4: The Bill of Rights & Sovereignty (1688–1689)',
    tariff: 'Question 3(a): How Useful [8 marks &bull; 10–12 mins]',
    enquiryQuestion:
      'How useful are Sources A and B for an enquiry into how the Glorious Revolution (1688–1689) limited the powers of the English Monarchy?',
    sourceA: {
      type: 'written',
      label: 'SOURCE A: Parliamentary Statute &bull; The Bill of Rights (December 1689)',
      provenanceTitle: 'Provenance Analysis:',
      provenancePrompts: [
        '<strong>Nature:</strong> Landmark constitutional statute enacted by Parliament.',
        '<strong>Origin:</strong> Drafted by Convention Parliament and accepted by William & Mary.',
        '<strong>Purpose:</strong> Permanently abolish royal prerogative to suspend laws or tax without parliamentary consent.',
      ],
      text: '“That the pretended power of suspending of laws, or the execution of laws, by regal authority, without consent of Parliament, is illegal; That levying money for or to the use of the Crown by pretence of prerogative, without grant of Parliament, is illegal; That the raising or keeping a standing army within the kingdom in time of peace, unless it be with consent of Parliament, is against law; That election of members of Parliament ought to be free.”',
      analysisPrompt:
        'What specific royal powers does Source A permanently take away from the English Crown?',
    },
    sourceB: {
      type: 'visual',
      label:
        'SOURCE B: Contemporary Painting &bull; William III Landing at Brixham (5 November 1688)',
      imageRelPath: 'images/william_landing_1688.jpg',
      iconographyTitle: 'Iconography & Visual Evidence:',
      iconographyPrompts: [
        '<strong>1. Massive Dutch Fleet:</strong> 463 transport ships and 50 warships fill Torbay.',
        '<strong>2. Armed Invasion:</strong> 15,000 Dutch soldiers and artillery disembarking.',
        '<strong>3. Royal Standards:</strong> Flags display the arms of Orange and the motto <em>‘For Religion and Liberty’</em>.',
        '<strong>4. English Welcome:</strong> Local gentry and fishermen wading out to greet the Prince.',
      ],
      caption:
        'The Landing of Prince William of Orange at Brixham, Torbay (5 November 1688), leading a Dutch army to overthrow James II.',
      analysisPrompt:
        'How does Source B challenge the myth that the Glorious Revolution was merely a peaceful parliamentary discussion?',
    },
    structureStrip:
      '<strong>Structure Strip:</strong> <strong>Para 1:</strong> Source A (Content + Provenance: statutory binding of royal prerogative) &bull; <strong>Para 2:</strong> Source B (Visual Evidence + Context: armed invasion that forced royal collapse) &bull; <strong>Verdict:</strong> Synthesise how military intervention produced the statutory constitutional monarchy.',
    quip: 'In 1689, William III accepted the Bill of Rights to secure war taxes, permanently ending Stuart Divine Right.',
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

// Helper to render a dedicated Lined Notes Page with margin (Pages 14 & 15 of 16-page workbook)
function renderNotesPage(pageNum, quip) {
  const isEven = pageNum % 2 === 0;
  const pageClass = isEven ? 'verso-page' : 'recto-page';

  // 32 ruled lines for standard ~8mm pitch filling the page perfectly
  const numLines = 32;
  let linesHtml = '';
  for (let i = 0; i < numLines; i++) {
    linesHtml += `          <div class="note-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>\n`;
  }

  return `
  <!-- PAGE ${pageNum}: NOTES PAGE -->
  <div class="page page-container ${pageClass}" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Notes Header -->
      <div style="border-bottom: 2px solid #0f284e; padding-bottom: 3px; margin-bottom: 5px;">
        <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 13pt; color: #0f284e; text-transform: uppercase; font-weight: 900; letter-spacing: 0.5px;">
          Notes
        </h2>
      </div>

      <!-- Ruled Lined Canvas with Left Margin (Exercise Book Standard) -->
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0; position: relative; border-top: 1.2px solid #0f284e; margin-bottom: 4px;">
        <!-- Vertical Margin Line (26mm from left edge of lines) - British Exercise Book Red Margin -->
        <div style="position: absolute; top: 0; bottom: 0; left: 26mm; width: 1.5px; background: #dc2626; z-index: 2;"></div>
        
        <!-- Ruled Horizontal Lines (Standard 8mm school pitch, flex-filled) -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0;">
${linesHtml}        </div>
      </div>

      ${renderFooterStrip(pageNum, quip, 16)}
    </div>
  </div>`;
}

// Helper to render Page 23 Complete Department Answer Bank + Examiner Traps Box
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
  <!-- PAGE 23: COMPLETE DEPARTMENT ANSWER BANK & EXAMINER TRAP MATRIX -->
  <div class="page page-container recto-page" id="page-23" style="padding: 4mm 6mm;">
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

      ${renderFooterStrip(pageNum, quip, 24)}
    </div>
  </div>`;
}

function renderFooterStrip(pageNum, quip, totalPages = 16) {
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
      // 3 Spaced-out trigger terms, each aligned 1-to-1 with pairs of ruled lines
      const bulletsHtml = st.bullets
        .map(
          (b, idx) => `
            <div style="flex: 1; display: flex; align-items: center; padding: 0 4px; ${idx < 2 ? 'border-bottom: 0.8px solid #cbd5e1;' : ''}">
              <div style="display: flex; align-items: flex-start; gap: 3.5px; line-height: 1.18;">
                <span style="font-weight: 900; color: #0f284e; font-size: 6pt; line-height: 1.3;">&bull;</span>
                <span style="font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 800; color: #0f284e; word-break: break-word;">${b}</span>
              </div>
            </div>`,
        )
        .join('');
      return `
        <div class="spine-stage-block" style="display: flex; flex-direction: column; flex: 1; min-height: 0; margin-bottom: 2.5px; border: 1.2px solid #0f284e; border-radius: 2px; overflow: hidden; background: #ffffff;">
          
          <!-- Full-Width Banner with Key Question Across Page -->
          <div class="stage-banner" style="background: #0f284e; color: #ffffff; padding: 2px 7px; display: flex; align-items: center; border-bottom: 1.2px solid #0f284e;">
            <div style="display: flex; align-items: center; gap: 6px; min-width: 0; flex: 1;">
              <span style="background: #ffffff; color: #0f284e; font-family: 'Inter', sans-serif; font-size: 8.0pt; font-weight: 900; padding: 0.8px 6px; border-radius: 2px; white-space: nowrap;">
                ${st.step}
              </span>
              <span style="font-family: 'Inter', sans-serif; font-size: 8.2pt; font-weight: 800; color: #93c5fd; white-space: nowrap;">
                ${st.date}
              </span>
              <span style="color: #60a5fa; font-size: 7.5pt;">&bull;</span>
              <span style="font-family: 'Playfair Display', serif; font-size: 9.6pt; font-weight: 800; color: #ffffff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                ${st.questionHeading}
              </span>
            </div>
          </div>

          <!-- Content Row: Left 3-Zone Trigger Spine (36mm) & Right Ruled Writing Lines (~162mm) -->
          <div style="display: flex; flex: 1; min-height: 0; align-items: stretch;">
            
            <!-- Left Column: High-Visibility 36mm Trigger Spine (Each Zone Aligns to 2 Ruled Lines) -->
            <div style="width: 36mm; flex-shrink: 0; background: #f0f4f9; display: flex; flex-direction: column; border-right: 1.2px solid #0f284e; box-sizing: border-box;">
              ${bulletsHtml}
            </div>

            <!-- Right Column: 6 Ruled Note-Taking Lines (Expanded Writing Space) -->
            <div style="flex: 1; display: flex; flex-direction: column; background: #ffffff; margin: 0; padding: 0;">
              <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
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

  const isEven = pageNum % 2 === 0;
  const pageClass = isEven ? 'verso-page' : 'recto-page';

  return `
  <!-- LESSON SPREAD: ${isEven ? 'LEFT PAGE (VERSO)' : 'RIGHT PAGE (RECTO)'} • CHRONOLOGICAL INQUIRY SPINE -->
  <div class="page page-container ${pageClass}" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      
      <!-- Lesson Header with Inquiry Question Title -->
      <div style="border-bottom: 2px solid #0f284e; padding-bottom: 2px; margin-bottom: 2px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 900; letter-spacing: 0.5px; text-transform: uppercase; background: #0f284e; color: #ffffff; border: 1.2px solid #0f284e; padding: 1px 6px; border-radius: 2px;">
            ENQUIRY ${cfg.lessonNum} &bull; LESSON NOTEBOOK
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; text-transform: uppercase; color: #0f284e;">
            YEAR 8 &bull; CROWN, CHURCH, OR PARLIAMENT? (1517–1689)
          </span>
        </div>
        <h2 style="font-family: 'Playfair Display', serif; font-size: 11.5pt; color: #0f284e; margin: 1px 0 1px 0; font-weight: 900; line-height: 1.2;">
          ${cfg.enquiryQuestion}
        </h2>
      </div>

      <!-- Specification Focus Strip -->
      <div style="border: 1px solid #0f284e; border-left: 3.5px solid #0f284e; padding: 2px 6px; background: #f0f4f9; margin-bottom: 2px; font-family: 'Inter', sans-serif; font-size: 7.8pt; line-height: 1.24; color: #1e293b;">
        <strong style="color: #0f284e;">Core Specification Focus:</strong> ${cfg.specAnchor}
      </div>

      <!-- Chronological Inquiry Spine & Note-Taking Canvas -->
      <div style="flex: 1; display: flex; flex-direction: column; min-height: 0; margin-top: 1px;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid #0f284e; padding: 1px 0; margin-bottom: 2px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; color: #0f284e;">
            Chronological Inquiry Spine &bull; Core Causal Narrative
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-style: italic; color: #475569;">
            Construct your causal explanation for each stage incorporating the core trigger terms
          </span>
        </div>

        <div style="display: flex; flex-direction: column; flex: 1; min-height: 0; gap: 0;">
          ${stagesHtml}
        </div>
      </div>

      ${renderFooterStrip(pageNum, cfg.leftPageQuip, 16)}
    </div>
  </div>`;
}

// ============================================================================
// RIGHT PAGE RENDERER: ROTATING DISCIPLINARY SKILLS WRITING (PAGES 3, 5, 9, 11, 15)
// ============================================================================
function renderRightPage(cfg, pageNum) {
  const rp = cfg.rightPage;
  const isEven = pageNum % 2 === 0;
  const pageClass = isEven ? 'verso-page' : 'recto-page';

  if (rp.type === 'single_12') {
    // 12-MARK CAUSAL WRITING (ENQUIRIES 1 AND 4)
    return `
  <!-- LESSON SPREAD: ${isEven ? 'LEFT PAGE (VERSO)' : 'RIGHT PAGE (RECTO)'} • 12-MARK EXPLAIN WHY -->
  <div class="page page-container ${pageClass}" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Exam Header -->
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #0f284e; padding-bottom: 3px; margin-bottom: 5px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 11.5pt; color: #0f284e; margin: 0; font-weight: 900;">
          ${rp.tariff}
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 8.0pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; background: #0f284e; color: #ffffff; padding: 1.5px 6px; border-radius: 2px;">
          Extended Writing Practice
        </span>
      </div>

      <!-- Question Stem & Stimulus Box -->
      <div style="border: 1px solid #0f284e; border-left: 3.5px solid #0f284e; border-radius: 3px; padding: 5px 8px; background: #f0f4f9; margin-bottom: 5px;">
        <div style="font-family: 'Playfair Display', serif; font-size: 10.4pt; font-weight: 900; color: #0f284e; margin-bottom: 4px; line-height: 1.28;">
          ${rp.examStem}
        </div>
        <div style="display: flex; align-items: center; gap: 8px; font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #1e293b;">
          <strong style="color: #0f284e;">Stimulus:</strong>
          <span style="border: 1px solid #0f284e; padding: 1.5px 7px; border-radius: 2px; font-weight: 800; color: #0f284e; background: #ffffff;">${rp.stimulus[0]}</span>
          <span style="border: 1px solid #0f284e; padding: 1.5px 7px; border-radius: 2px; font-weight: 800; color: #0f284e; background: #ffffff;">${rp.stimulus[1]}</span>
          <span style="font-style: italic; color: #475569;">(You must also use information of your own)</span>
        </div>
      </div>

      <!-- Connectives & Key Vocabulary Bank -->
      <div style="border: 1px solid #0f284e; border-radius: 3px; padding: 5px 8px; background: #ffffff; margin-bottom: 6px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
        <div>
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 900; text-transform: uppercase; display: block; margin-bottom: 2px; color: #0f284e;">Analytical Connectives:</strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-style: italic; line-height: 1.24; display: block; color: #1e293b;">${rp.connectives}</span>
        </div>
        <div>
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 900; text-transform: uppercase; display: block; margin-bottom: 2px; color: #0f284e;">Key Vocabulary Bank:</strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; line-height: 1.24; display: block; color: #1e293b;">${rp.wordBank}</span>
        </div>
      </div>

      <!-- Ruled Task Lines for Extended Writing -->
      <div style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-style: italic; color: #222222; margin-bottom: 2px;">
        <strong style="color: #0f284e;">Task:</strong> Using the vocabulary and connectives above, write your analytical response below:
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
      <div style="border: 1.2px solid #0f284e; border-radius: 4px; padding: 3px 6px; background: #ffffff; margin-top: 2px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px; border-bottom: 1px solid #0f284e; padding-bottom: 1.5px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 900; background: #0f284e; color: #ffffff; padding: 1.5px 5px; border-radius: 2px; text-transform: uppercase; letter-spacing: 0.3px;">
            🎨 ${rp.timelineMissionTitle || 'Timeline Mission'}
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; color: #0f284e;">
            Turn to Centrefold &bull; Pages 8–9 &rarr;
          </span>
        </div>
        <div style="font-family: 'Georgia', serif; font-size: 7.4pt; color: #111111; line-height: 1.24;">
          ${rp.timelineMission}
        </div>
      </div>

      ${renderFooterStrip(pageNum, cfg.rightPageQuip, 16)}
    </div>
  </div>`;
  } else {
    // TWO-PART ROTATING SKILLS WRITING (ENQUIRIES 2, 3, AND 5)
    return `
  <!-- LESSON SPREAD: ${isEven ? 'LEFT PAGE (VERSO)' : 'RIGHT PAGE (RECTO)'} • ROTATING DISCIPLINARY SKILLS -->
  <div class="page page-container ${pageClass}" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      
      <!-- PART A: SHORT-FORM DISCIPLINARY PRACTICE [4 MARKS] -->
      <div style="border-bottom: 1.5px solid #0f284e; padding-bottom: 4px; margin-bottom: 5px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 3px;">
          <h2 style="font-family: 'Playfair Display', serif; font-size: 10.8pt; color: #0f284e; margin: 0; font-weight: 900;">
            ${rp.partA.tariff}
          </h2>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; background: #0f284e; color: #ffffff; border: 1px solid #0f284e; padding: 1px 5px; border-radius: 2px; text-transform: uppercase;">
            DISCIPLINARY DRILL
          </span>
        </div>
        <p style="font-family: 'Playfair Display', serif; font-size: 10.2pt; font-weight: 900; color: #0f284e; margin: 0 0 3px 0; line-height: 1.28;">
          ${rp.partA.question}
        </p>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 700; margin-bottom: 2px; color: #1e293b; line-height: 1.22;">
          <strong style="color: #0f284e;">Sentence Stems:</strong> ${rp.partA.stems}
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
          <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1.5px solid #0f284e; padding-bottom: 2px; margin-bottom: 3px;">
            <h2 style="font-family: 'Playfair Display', serif; font-size: 10.8pt; color: #0f284e; margin: 0; font-weight: 900;">
              ${rp.partB.tariff}
            </h2>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; background: #0f284e; color: #ffffff; padding: 1px 5px; border-radius: 2px; text-transform: uppercase;">
              STRUCTURED WRITING
            </span>
          </div>
          <p style="font-family: 'Playfair Display', serif; font-size: 10.2pt; font-weight: 900; color: #0f284e; margin: 0 0 4px 0; line-height: 1.28;">
            ${rp.partB.question}
          </p>
          ${
            rp.partB.stimulus
              ? `
          <div style="display: flex; align-items: center; gap: 6px; font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #1e293b; margin-bottom: 3px;">
            <strong style="color: #0f284e;">Stimulus:</strong>
            <span style="border: 1px solid #0f284e; padding: 1px 6px; border-radius: 2px; font-weight: 800; color: #0f284e; background: #f0f4f9;">${rp.partB.stimulus[0]}</span>
            <span style="border: 1px solid #0f284e; padding: 1px 6px; border-radius: 2px; font-weight: 800; color: #0f284e; background: #f0f4f9;">${rp.partB.stimulus[1]}</span>
          </div>`
              : ''
          }

          <!-- Connectives & Word Bank -->
          <div style="border: 1px solid #0f284e; border-radius: 3px; padding: 4px 7px; background: #f0f4f9; margin-bottom: 4px; font-family: 'Inter', sans-serif; font-size: 7.6pt; line-height: 1.24;">
            <div><strong style="color: #0f284e;">Analytical Connectives:</strong> <em style="color: #1e293b;">${rp.partB.connectives}</em></div>
            <div style="margin-top: 2px;"><strong style="color: #0f284e;">Key Terms:</strong> <span style="color: #1e293b;">${rp.partB.wordBank}</span></div>
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
        <div style="border: 1.2px solid #0f284e; border-radius: 4px; padding: 3px 6px; background: #ffffff; margin-top: 2px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px; border-bottom: 1px solid #0f284e; padding-bottom: 1.5px;">
            <span style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 900; background: #0f284e; color: #ffffff; padding: 1.5px 5px; border-radius: 2px; text-transform: uppercase; letter-spacing: 0.3px;">
              🎨 ${rp.timelineMissionTitle || 'Timeline Mission'}
            </span>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; color: #0f284e;">
              Turn to Centrefold &bull; Pages 8–9 &rarr;
            </span>
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 7.4pt; color: #111111; line-height: 1.24;">
            ${rp.timelineMission}
          </div>
        </div>
      </div>

      ${renderFooterStrip(pageNum, cfg.rightPageQuip, 16)}
    </div>
  </div>`;
  }
}

// ============================================================================
// DEDICATED PRIMARY SOURCE WORKSHOP RENDERER (PAGES 6, 7, 16, 17)
// Top Half: Source A (Written) + Provenance Clues + 3 Lines
// Bottom Half: Source B (Visual) + Visual Iconography Guide + 3 Lines
// Bottom Footer: 8-Mark "How Useful" Exam Challenge with Structure Strip
// ============================================================================
function renderSourceWorkshopPage(cfg, pageNum) {
  const isEven = pageNum % 2 === 0;
  const pageClass = isEven ? 'verso-page' : 'recto-page';
  const imgBase64 = getBase64Image(cfg.sourceB.imageRelPath) || '';

  return `
  <!-- SOURCE WORKSHOP: ${isEven ? 'VERSO' : 'RECTO'} • ${cfg.title.toUpperCase()} -->
  <div class="page page-container ${pageClass}" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      
      <!-- 1. Header Banner -->
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 10.2pt; color: #000000; margin: 0; font-weight: 900; letter-spacing: 0.2px;">
          ${cfg.title}
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; border: 1.2px solid #000000; padding: 1px 6px; border-radius: 2px; text-transform: uppercase; background: #ffffff;">
          ${cfg.tariff}
        </span>
      </div>

      <!-- 2. Question Stem Strip -->
      <div style="border: 1.2px solid #000000; border-left: 4px solid #000000; padding: 3px 6px; background: #ffffff; margin-bottom: 3px;">
        <div style="font-family: 'Playfair Display', serif; font-size: 8.4pt; font-weight: 800; color: #000000; line-height: 1.22;">
          ${cfg.enquiryQuestion}
        </div>
      </div>

      <!-- 3. TOP HALF: SOURCE A (WRITTEN PRIMARY SOURCE) -->
      <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 3.5px 6px; background: #ffffff; margin-bottom: 3.5px; display: flex; flex-direction: column; justify-content: space-between;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid #000000; padding-bottom: 1.5px; margin-bottom: 2.5px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; color: #000000;">
            ${cfg.sourceA.label}
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-style: italic; color: #444444;">
            Contemporary Written Evidence
          </span>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 58mm; gap: 7px; align-items: stretch; margin-bottom: 2.5px;">
          <!-- Verbatim Primary Extract in Archival Card -->
          <div style="background: #faf8f5; border: 1px solid #000000; border-radius: 2px; padding: 3.5px 5px; font-family: 'Georgia', serif; font-size: 7.2pt; line-height: 1.26; color: #111111; font-style: italic; display: flex; align-items: center;">
            ${cfg.sourceA.text}
          </div>
          <!-- Provenance Analysis Guidance Box -->
          <div style="background: #f8fafc; border: 1px solid #000000; border-radius: 2px; padding: 2.5px 4.5px; font-family: 'Inter', sans-serif; font-size: 6.3pt; line-height: 1.2; color: #000000; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="font-weight: 900; text-transform: uppercase; border-bottom: 0.8px solid #000000; padding-bottom: 1px; margin-bottom: 1.5px; font-size: 6.4pt;">
              ${cfg.sourceA.provenanceTitle}
            </div>
            ${cfg.sourceA.provenancePrompts.map((p) => `<div>&bull; ${p}</div>`).join('')}
          </div>
        </div>

        <!-- Source A Guided Response Lines -->
        <div>
          <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; color: #000000; margin-bottom: 1px;">
            1. Source A Evaluation &bull; Content &amp; Provenance: <span style="font-weight: 400; font-style: italic; color: #333333;">(${cfg.sourceA.analysisPrompt})</span>
          </div>
          <div class="ruled-lines-block">
            <div class="task-line" style="height: 8.0mm;"></div>
            <div class="task-line" style="height: 8.0mm;"></div>
            <div class="task-line" style="height: 8.0mm;"></div>
            <div class="task-line" style="height: 8.0mm;"></div>
          </div>
        </div>
      </div>

      <!-- 4. BOTTOM HALF: SOURCE B (VISUAL PRIMARY SOURCE) -->
      <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 3.5px 6px; background: #ffffff; margin-bottom: 3.5px; display: flex; flex-direction: column; justify-content: space-between;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid #000000; padding-bottom: 1.5px; margin-bottom: 2.5px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; color: #000000;">
            ${cfg.sourceB.label}
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-style: italic; color: #444444;">
            Contemporary Visual Evidence
          </span>
        </div>

        <div style="display: grid; grid-template-columns: 44mm 1fr; gap: 7px; align-items: stretch; margin-bottom: 2.5px;">
          <!-- Visual Image Plate -->
          <div style="background: #faf8f5; border: 1px solid #000000; border-radius: 2px; padding: 2px; display: flex; justify-content: center; align-items: center;">
            <img src="${imgBase64}" alt="${cfg.sourceB.label}" style="max-height: 40mm; max-width: 100%; object-fit: contain; border: 0.8px solid #000000; display: block;">
          </div>
          <!-- Visual Iconography Guidance Box -->
          <div style="background: #f8fafc; border: 1px solid #000000; border-radius: 2px; padding: 2.5px 4.5px; font-family: 'Inter', sans-serif; font-size: 6.3pt; line-height: 1.2; color: #000000; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-weight: 900; text-transform: uppercase; border-bottom: 0.8px solid #000000; padding-bottom: 1px; margin-bottom: 1.5px; font-size: 6.4pt;">
                ${cfg.sourceB.iconographyTitle}
              </div>
              ${cfg.sourceB.iconographyPrompts.map((p) => `<div>&bull; ${p}</div>`).join('')}
            </div>
            <div style="font-size: 6.0pt; font-style: italic; color: #444444; border-top: 0.8px dashed #cccccc; padding-top: 1px; margin-top: 1px;">
              ${cfg.sourceB.caption}
            </div>
          </div>
        </div>

        <!-- Source B Guided Response Lines -->
        <div>
          <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; color: #000000; margin-bottom: 1px;">
            2. Source B Evaluation &bull; Visual Evidence &amp; Purpose: <span style="font-weight: 400; font-style: italic; color: #333333;">(${cfg.sourceB.analysisPrompt})</span>
          </div>
          <div class="ruled-lines-block">
            <div class="task-line" style="height: 8.0mm;"></div>
            <div class="task-line" style="height: 8.0mm;"></div>
            <div class="task-line" style="height: 8.0mm;"></div>
            <div class="task-line" style="height: 8.0mm;"></div>
          </div>
        </div>
      </div>

      <!-- 5. Comparative Utility Verdict Response -->
      <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 3.5px 6px; background: #ffffff; margin-bottom: 3px;">
        <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; color: #000000; margin-bottom: 1px;">
          3. Comparative Utility Verdict &bull; Final Synthesis: <span style="font-weight: 400; font-style: italic; color: #333333;">(Compare both sources &bull; Which provides greater historical insight into this enquiry, and why?)</span>
        </div>
        <div class="ruled-lines-block">
          <div class="task-line" style="height: 8.0mm;"></div>
          <div class="task-line" style="height: 8.0mm;"></div>
          <div class="task-line" style="height: 8.0mm;"></div>
        </div>
      </div>

      <!-- 6. Structure Strip & Utility Exam Strategy -->
      <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 4px 6px; background: #ffffff; margin-bottom: 2px; font-family: 'Inter', sans-serif; font-size: 6.4pt; line-height: 1.22;">
        ${cfg.structureStrip}
      </div>

      ${renderFooterStrip(pageNum, cfg.quip, 24)}
    </div>
  </div>`;
}

// ============================================================================
// MAIN COMPILATION FUNCTION
// ============================================================================
function compileMonarchyWorkbook() {
  const coverImgBase64 =
    getBase64Image('images/henry_viii.jpg') || getBase64Image('public/images/henry_viii.jpg') || '';

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
      height: 100%;
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
      border-top: 0.8px solid #0f284e;
      padding-top: 1.5px;
      margin-top: 2px;
      font-family: 'Inter', sans-serif;
      font-size: 6.2pt;
      line-height: 1.15;
      color: #000000;
    }
    .footer-quip {
      font-style: italic;
      color: #475569;
      white-space: nowrap;
    }
    .footer-page-num {
      font-family: 'Inter', sans-serif;
      font-weight: 800;
      white-space: nowrap;
      color: #0f284e;
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
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #0f284e; padding-bottom: 4px; margin-bottom: 8px;">
        <div data-department-name="The History Department">
          <span style="font-family: 'Inter', sans-serif; font-size: 11pt; font-weight: 900; color: #0f284e; text-transform: uppercase; letter-spacing: 1px;">
            <span class="school-brand-target">The History Department</span>
          </span>
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 8.5pt; font-weight: 800; color: #0f284e;">
          KEY STAGE 3 HISTORICAL STUDIES &bull; YEAR 8
        </div>
      </div>

      <!-- Pupil Details Strip -->
      <div style="border: 1.5px solid #0f284e; border-radius: 4px; padding: 6px 12px; background: #ffffff; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 14px; align-items: center; margin-bottom: 8px;">
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f284e; text-transform: uppercase; margin-right: 8px;">Pupil Name:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #0f284e; height: 14px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f284e; text-transform: uppercase; margin-right: 8px;">Class:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #0f284e; height: 14px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f284e; text-transform: uppercase; margin-right: 8px;">Teacher:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #0f284e; height: 14px;"></div>
        </div>
      </div>

      <!-- Main Title Block -->
      <div style="text-align: center; margin: 2px 0 6px 0;">
        <div style="display: inline-block; border: 1.5px solid #0f284e; color: #ffffff; background: #0f284e; font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; padding: 2px 10px; border-radius: 3px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">
          Year 8 Enquiry &bull; 1517–1689
        </div>
        <h1 style="font-family: 'Playfair Display', serif; font-size: 22pt; line-height: 1.15; color: #0f284e; margin: 2px 0 3px 0; font-weight: 900;">
          Crown, Church, or Parliament?
        </h1>
        <div style="font-family: 'Georgia', serif; font-size: 10pt; color: #334155; font-style: italic; font-weight: 600;">
          The Struggle for Authority, Religion, and the English State (1517–1689)
        </div>
      </div>

      <!-- Prominent Primary Visual Source Centerpiece (Holbein Full Canvas in Authentic Color + Disciplinary Iconography Plate) -->
      <div style="margin: 2px 0 5px 0; border: 1.5px solid #0f284e; border-radius: 4px; overflow: hidden; background: #ffffff;">
        <div style="display: grid; grid-template-columns: 62mm 1fr; background: #ffffff;">
          <!-- Left: Full-Length Uncropped Portrait in Rich Authentic Color -->
          <div style="background: #fcfbf9; border-right: 1.5px solid #0f284e; display: flex; justify-content: center; align-items: center; padding: 2px 3px;">
            <img src="${coverImgBase64}" alt="King Henry VIII Full-Length Portrait by Hans Holbein" style="height: 101mm; width: auto; max-width: 100%; object-fit: contain; display: block; margin: 0 auto; border: 1.2px solid #0f284e; border-radius: 2px; box-shadow: 0 2px 6px rgba(15,40,78,0.22);">
          </div>
          <!-- Right: Visual Iconography & Historical Significance for Year 8 -->
          <div style="padding: 6px 10px; display: flex; flex-direction: column; justify-content: space-between; background: #ffffff; box-sizing: border-box;">
            <!-- 1. Header -->
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.2px solid #0f284e; padding-bottom: 2px;">
              <span style="font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 900; text-transform: uppercase; color: #0f284e; letter-spacing: 0.5px;">
                Primary Visual Evidence &bull; Tudor Royal Propaganda
              </span>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; color: #64748b;">
                Hans Holbein the Younger (c. 1537)
              </span>
            </div>

            <!-- 2. Statecraft Context -->
            <p style="font-family: 'Georgia', serif; font-size: 7.5pt; line-height: 1.3; color: #1e293b; margin: 0;">
              Following the 1534 Act of Supremacy, Henry VIII commissioned Hans Holbein to project an overwhelming image of absolute monarchical sovereignty. Every visual element was calculated statecraft:
            </p>

            <!-- 3. Four Core Propaganda Features -->
            <div style="display: flex; flex-direction: column; gap: 3px;">
              <div style="border-left: 2.5px solid #0f284e; padding-left: 6px;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 7.1pt; text-transform: uppercase; color: #0f284e;">1. Stance of Absolute Dominance:</strong>
                <div style="font-family: 'Georgia', serif; font-size: 7pt; line-height: 1.22; color: #222222;">
                  Facing the viewer squarely with feet planted wide, elbows flared, and hands gripping dagger and gloves, Henry occupies maximum physical space to intimidate foreign ambassadors and subjects.
                </div>
              </div>
              <div style="border-left: 2.5px solid #0f284e; padding-left: 6px;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 7.1pt; text-transform: uppercase; color: #0f284e;">2. Imperial Splendour &amp; Monastic Wealth:</strong>
                <div style="font-family: 'Georgia', serif; font-size: 7pt; line-height: 1.22; color: #222222;">
                  Exaggerated square shoulders padded in ermine fur, gold-embroidered silver doublet, and heavy ruby collars—lavishly financed by Thomas Cromwell’s Dissolution of the Monasteries (1536–40).
                </div>
              </div>
              <div style="border-left: 2.5px solid #0f284e; padding-left: 6px;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 7.1pt; text-transform: uppercase; color: #0f284e;">3. Dynastic Virility &amp; Tudor Succession:</strong>
                <div style="font-family: 'Georgia', serif; font-size: 7pt; line-height: 1.22; color: #222222;">
                  The prominent codpiece and muscular posture were deliberate visual propaganda, asserting vitality and the promise of a legitimate male Tudor heir following the break with Rome.
                </div>
              </div>
              <div style="border-left: 2.5px solid #0f284e; padding-left: 6px;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 7.1pt; text-transform: uppercase; color: #0f284e;">4. The Absent Pope (Sovereignty Unchallenged):</strong>
                <div style="font-family: 'Georgia', serif; font-size: 7pt; line-height: 1.22; color: #222222;">
                  Depicted with zero papal, cross, or Roman Catholic emblems. The King stands solitary on English ground—the undisputed Supreme Head on Earth of the Church of England.
                </div>
              </div>
            </div>

            <!-- 4. Three-Pillar Propaganda Decoding Matrix -->
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 4px; padding-top: 3px; border-top: 1px solid #cbd5e1;">
              <div style="border: 1px solid #0f284e; border-radius: 2px; padding: 2.5px 5px; background: #f0f4f9;">
                <div style="font-family: 'Inter', sans-serif; font-size: 6.4pt; font-weight: 900; text-transform: uppercase; color: #0f284e;">The Dagger</div>
                <div style="font-family: 'Georgia', serif; font-size: 6.4pt; line-height: 1.15; color: #1e293b; margin-top: 1px;">Immediate physical violence against papal traitors.</div>
              </div>
              <div style="border: 1px solid #0f284e; border-radius: 2px; padding: 2.5px 5px; background: #f0f4f9;">
                <div style="font-family: 'Inter', sans-serif; font-size: 6.4pt; font-weight: 900; text-transform: uppercase; color: #0f284e;">Ermine &amp; Gold</div>
                <div style="font-family: 'Georgia', serif; font-size: 6.4pt; line-height: 1.15; color: #1e293b; margin-top: 1px;">Imperial status equal to Holy Roman Emperor.</div>
              </div>
              <div style="border: 1px solid #0f284e; border-radius: 2px; padding: 2.5px 5px; background: #f0f4f9;">
                <div style="font-family: 'Inter', sans-serif; font-size: 6.4pt; font-weight: 900; text-transform: uppercase; color: #0f284e;">Turkish Carpet</div>
                <div style="font-family: 'Georgia', serif; font-size: 6.4pt; line-height: 1.15; color: #1e293b; margin-top: 1px;">Global trade connections &amp; Renaissance wealth.</div>
              </div>
            </div>

            <!-- 5. Disciplinary Significance Anchor -->
            <div style="font-family: 'Inter', sans-serif; font-size: 6.4pt; color: #1e293b; line-height: 1.25; background: #f0f4f9; border-left: 2.5px solid #0f284e; padding: 2px 6px;">
              <strong style="text-transform: uppercase; color: #0f284e;">Disciplinary Significance:</strong> In 16th-century England, lacking a standing army or police force, visual portraiture was essential constitutional statecraft to enforce Royal Supremacy.
            </div>

            <!-- 6. Targeted Disciplinary Hinge Question -->
            <div style="background: #ffffff; border: 1.2px solid #0f284e; border-radius: 3px; padding: 3px 6px;">
              <div style="display: flex; justify-content: space-between; align-items: baseline;">
                <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 900; text-transform: uppercase; color: #0f284e;">Disciplinary Hinge Question:</span>
                <span style="font-family: 'Inter', sans-serif; font-size: 6.2pt; font-weight: 700; color: #64748b; text-transform: uppercase;">Historical Evaluation</span>
              </div>
              <div style="font-family: 'Georgia', serif; font-size: 6.9pt; font-style: italic; color: #1e293b; line-height: 1.2; margin-top: 1px;">
                Does this portrait show a monarch completely confident in his sovereign power, or a ruler using theatrical spectacle to mask profound dynastic and religious vulnerability?
              </div>
            </div>
          </div>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #ffffff; padding: 3px 8px; border-top: 1.5px solid #0f284e; background: #0f284e;">
          <span><strong>Primary Visual Evidence:</strong> <em>Full-Length Portrait of King Henry VIII</em> &bull; Workshop of Hans Holbein the Younger (c. 1537–1540)</span>
          <span style="font-weight: 700; color: #93c5fd;">ROYAL COLLECTION ARCHIVE &bull; WALKER ART GALLERY</span>
        </div>
      </div>

      <!-- Disciplinary Strategy Overview & Workbook Blueprint -->
      <div style="border: 1.2px solid #0f284e; border-radius: 4px; padding: 5px 8px; background: #f0f4f9; margin: 3px 0 6px 0; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px;">
        <div style="border-right: 1px solid #cbd5e1; padding-right: 6px;">
          <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; color: #0f284e;">
            1. Chronological Spines [Enquiries 1–5]
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 6.8pt; line-height: 1.2; color: #1e293b; margin-top: 1px;">
            Structured chronological note-taking on each left page: 5 causal stages guiding pupil understanding as the teacher narrates the history.
          </div>
        </div>
        <div style="border-right: 1px solid #cbd5e1; padding-right: 6px;">
          <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; color: #0f284e;">
            2. Disciplinary Writing Practice [4m, 8m, 12m]
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 6.8pt; line-height: 1.2; color: #1e293b; margin-top: 1px;">
            Targeted extended writing on each right page: causal explanation, narrative account, difference, and constitutional evaluation.
          </div>
        </div>
        <div>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; color: #0f284e;">
            3. Centrefold Timeline &amp; Notes Portfolio
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 6.8pt; line-height: 1.2; color: #1e293b; margin-top: 1px;">
            Centrefold Living Timeline dual-coding sketchpads (pp. 8–9) and dedicated lined notes &amp; essay planning pages (pp. 14–15).
          </div>
        </div>
      </div>

      <!-- Course Specification Curriculum Tracking Table -->
      <div style="border: 1.5px solid #0f284e; border-radius: 4px; overflow: hidden; margin: 2px 0 2px 0;">
        <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif;">
          <thead>
            <tr style="border-bottom: 1.5px solid #0f284e; background: #0f284e;">
              <th style="padding: 6px 10px; text-align: left; font-size: 8.2pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; border-right: 1.2px solid rgba(255,255,255,0.25); color: #ffffff;">
                Course Specification &bull; Key Enquiry Sequence
              </th>
              <th style="padding: 6px 4px; width: 64px; text-align: center; font-size: 7.8pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; border-right: 1.2px solid rgba(255,255,255,0.25); color: #ffffff;">
                Learnt
              </th>
              <th style="padding: 6px 4px; width: 64px; text-align: center; font-size: 7.8pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; color: #ffffff;">
                Revised
              </th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 7px 10px; border-right: 1.2px solid #cbd5e1;">
                <div style="font-size: 8.5pt; font-weight: 800; color: #0f284e; line-height: 1.25;">
                  Enquiry 1: Henry VIII &amp; The English Reformation (1517–1534)
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.8pt; font-style: italic; color: #334155; margin-top: 1px; line-height: 1.2;">
                  Why did Henry VIII break with the Roman Catholic Church, and how did the Act of Supremacy reshape sovereign power?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #cbd5e1;">
                <div style="width: 15px; height: 15px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 15px; height: 15px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 7px 10px; border-right: 1.2px solid #cbd5e1;">
                <div style="font-size: 8.5pt; font-weight: 800; color: #0f284e; line-height: 1.25;">
                  Enquiry 2: Elizabeth I &amp; The Middle Way (1558–1588)
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.8pt; font-style: italic; color: #334155; margin-top: 1px; line-height: 1.2;">
                  How did Elizabeth I navigate deep religious divisions, and why did she reject religious extremism in 1559?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #cbd5e1;">
                <div style="width: 15px; height: 15px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 15px; height: 15px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 7px 10px; border-right: 1.2px solid #cbd5e1;">
                <div style="font-size: 8.5pt; font-weight: 800; color: #0f284e; line-height: 1.25;">
                  Enquiry 3: The Spanish Armada &amp; Naval Power (1588)
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.8pt; font-style: italic; color: #334155; margin-top: 1px; line-height: 1.2;">
                  Why was Philip II’s enterprise of England defeated, and how did fireships and weather decide the outcome?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #cbd5e1;">
                <div style="width: 15px; height: 15px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 15px; height: 15px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 7px 10px; border-right: 1.2px solid #cbd5e1;">
                <div style="font-size: 8.5pt; font-weight: 800; color: #0f284e; line-height: 1.25;">
                  Enquiry 4: The English Civil War, Regicide &amp; The Republic (1642–1649)
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.8pt; font-style: italic; color: #334155; margin-top: 1px; line-height: 1.2;">
                  Why did constitutional collision over Divine Right culminate in the execution of Charles I and England's republic?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #cbd5e1;">
                <div style="width: 15px; height: 15px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 15px; height: 15px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
            <tr>
              <td style="padding: 7px 10px; border-right: 1.2px solid #cbd5e1;">
                <div style="font-size: 8.5pt; font-weight: 800; color: #0f284e; line-height: 1.25;">
                  Enquiry 5: The Glorious Revolution &amp; The Bill of Rights (1688–1689)
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.8pt; font-style: italic; color: #334155; margin-top: 1px; line-height: 1.2;">
                  Why did Parliament invite William of Orange in 1688, and how did the Bill of Rights establish parliamentary rule?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #cbd5e1;">
                <div style="width: 15px; height: 15px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 15px; height: 15px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      ${renderFooterStrip(1, 'If you think politics today is messy, King Henry VIII invented a whole new church because his divorce paperwork took too long.', 16)}
    </div>
  </div>
`;

  // ====================================================================
  // PAGES 2–3: ENQUIRY 1 (HENRY VIII & BREAK WITH ROME)
  // ====================================================================
  html += renderSpinePage(enquiryConfigs[0], 2);
  html += renderRightPage(enquiryConfigs[0], 3);

  // ====================================================================
  // PAGES 4–5: ENQUIRY 2 (THE ELIZABETHAN SETTLEMENT)
  // ====================================================================
  html += renderSpinePage(enquiryConfigs[1], 4);
  html += renderRightPage(enquiryConfigs[1], 5);

  // ====================================================================
  // PAGES 6–7: ENQUIRY 3 (THE SPANISH ARMADA & MARITIME POWER)
  // ====================================================================
  html += renderSpinePage(enquiryConfigs[2], 6);
  html += renderRightPage(enquiryConfigs[2], 7);

  // ====================================================================
  // PAGES 8–9: THE LIVING TIMELINE IN THE EXACT PHYSICAL CENTREFOLD!
  // ====================================================================
  html += `
  <!-- PAGE 8: LIVING TIMELINE PART 1 (MILESTONES 1–4) -->
  <div class="page page-container verso-page" id="page-8" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div>
        <div style="border-bottom: 2px solid #0f284e; padding-bottom: 3px; margin-bottom: 5px;">
          <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 11.8pt; color: #0f284e; text-transform: uppercase; font-weight: 900; letter-spacing: 0.5px;">
            Living Timeline &bull; Part 1: Reformation, Royal Supremacy &amp; The Middle Way (1517–1588)
          </h2>
        </div>

        <div style="border: 1px solid #0f284e; border-radius: 3px; background: #f0f4f9; padding: 3px 6px; margin-bottom: 6px; font-family: 'Inter', sans-serif; font-size: 8.2pt; color: #1e293b;">
          <strong style="color: #0f284e;">Living Timeline Dual-Coding Protocol:</strong> Complete each milestone sketchpad using dual-coding (combining visual storytelling symbols, causal arrows, and dates) to master the chronological spine across the centre-fold.
        </div>
      </div>

      <!-- 4 Milestones with Open Drawing Area Across Full A4 Page -->
      <div style="display: flex; flex-direction: column; flex: 1; justify-content: space-between;">
        
        <!-- Milestone 1: 1517 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 10.0pt; font-weight: 900; color: #0f284e;">
              1517 &bull; Martin Luther &amp; The Protestant Reformation
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; background: #0f284e; color: #ffffff; border: 1px solid #0f284e; padding: 1px 6px; border-radius: 2px;">Enquiry 1</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.8pt; color: #000000; margin: 0; line-height: 1.3;">
            Martin Luther nails his 95 Theses to the Wittenberg church door, attacking corrupt papal indulgences and shattering Catholic unity; King Henry VIII writes in defence of the Pope, earning the title ‘Defender of the Faith’.
          </p>
        </div>

        <!-- Milestone 2: 1534–1540 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 10.0pt; font-weight: 900; color: #0f284e;">
              1534–1540 &bull; Royal Supremacy &amp; Dissolution of the Monasteries
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; background: #0f284e; color: #ffffff; border: 1px solid #0f284e; padding: 1px 6px; border-radius: 2px;">Enquiry 1</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.8pt; color: #000000; margin: 0; line-height: 1.3;">
            Parliament passes the Act of Supremacy declaring Henry VIII ‘Supreme Head’ of the Church; Thomas Cromwell surveys and dissolves over 800 monasteries, confiscating gold, lead, and church lands for the Crown.
          </p>
        </div>

        <!-- Milestone 3: 1559 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 10.0pt; font-weight: 900; color: #0f284e;">
              1559 &bull; Elizabeth I &amp; The Religious Settlement
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; background: #0f284e; color: #ffffff; border: 1px solid #0f284e; padding: 1px 6px; border-radius: 2px;">Enquiry 2</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.8pt; color: #000000; margin: 0; line-height: 1.3;">
            The Acts of Supremacy and Uniformity establish the Via Media (‘Middle Way’), making Elizabeth ‘Supreme Governor’ and enforcing the 1559 Book of Common Prayer.
          </p>
        </div>

        <!-- Milestone 4: 1588 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 10.0pt; font-weight: 900; color: #0f284e;">
              1588 &bull; Defeat of the Spanish Armada
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; background: #0f284e; color: #ffffff; border: 1px solid #0f284e; padding: 1px 6px; border-radius: 2px;">Enquiry 3</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.8pt; color: #000000; margin: 0; line-height: 1.3;">
            English fireships scatter King Philip II’s 130-ship Armada off Calais; broadside cannons and fierce North Sea gales destroy Spanish hopes of restoring Catholicism.
          </p>
        </div>

      </div>

      ${renderFooterStrip(8, 'Centrefold timeline: Dual-coding sketches and dates turns narrative history into permanent long-term memory.', 16)}
    </div>
  </div>

  <!-- PAGE 9: LIVING TIMELINE PART 2 (MILESTONES 5–8) -->
  <div class="page page-container recto-page" id="page-9" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div>
        <div style="border-bottom: 2px solid #0f284e; padding-bottom: 3px; margin-bottom: 5px;">
          <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 11.8pt; color: #0f284e; text-transform: uppercase; font-weight: 900; letter-spacing: 0.5px;">
            Living Timeline &bull; Part 2: Civil War, Regicide &amp; The Bill of Rights (1603–1689)
          </h2>
        </div>

        <div style="border: 1px solid #0f284e; border-radius: 3px; background: #f0f4f9; padding: 3px 6px; margin-bottom: 6px; font-family: 'Inter', sans-serif; font-size: 8.2pt; color: #1e293b;">
          <strong style="color: #0f284e;">Living Timeline Dual-Coding Protocol:</strong> Complete each milestone sketchpad using dual-coding (combining visual storytelling symbols, causal arrows, and dates) to master the chronological spine across the centre-fold.
        </div>
      </div>

      <!-- 4 Milestones with Open Drawing Area Across Full A4 Page -->
      <div style="display: flex; flex-direction: column; flex: 1; justify-content: space-between;">
        
        <!-- Milestone 5: 1629–1640 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 10.0pt; font-weight: 900; color: #0f284e;">
              1629–1640 &bull; Charles I’s ‘Personal Rule’ &amp; Ship Money
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; background: #0f284e; color: #ffffff; border: 1px solid #0f284e; padding: 1px 6px; border-radius: 2px;">Enquiry 4</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.8pt; color: #000000; margin: 0; line-height: 1.3;">
            Charles I rules without Parliament for eleven years, raising unparliamentary funds through Ship Money; John Hampden’s refusal to pay sparks nationwide tax resistance.
          </p>
        </div>

        <!-- Milestone 6: 1649 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 10.0pt; font-weight: 900; color: #0f284e;">
              1649 &bull; Trial &amp; Execution of King Charles I
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; background: #0f284e; color: #ffffff; border: 1px solid #0f284e; padding: 1px 6px; border-radius: 2px;">Enquiry 4</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.8pt; color: #000000; margin: 0; line-height: 1.3;">
            Pride’s Purge clears moderate MPs; the Rump Parliament convicts Charles I of high treason as a ‘tyrant, traitor, and murderer’; the King is beheaded on 30 January 1649.
          </p>
        </div>

        <!-- Milestone 7: 1688 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 10.0pt; font-weight: 900; color: #0f284e;">
              1688 &bull; The Glorious Revolution
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; background: #0f284e; color: #ffffff; border: 1px solid #0f284e; padding: 1px 6px; border-radius: 2px;">Enquiry 5</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.8pt; color: #000000; margin: 0; line-height: 1.3;">
            Fearing a permanent Catholic dynasty under James II, seven prominent peers invite Dutch Prince William of Orange; James flees and William lands with 15,000 troops.
          </p>
        </div>

        <!-- Milestone 8: 1689 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 10.0pt; font-weight: 900; color: #0f284e;">
              1689 &bull; The Bill of Rights &amp; Constitutional Monarchy
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; background: #0f284e; color: #ffffff; border: 1px solid #0f284e; padding: 1px 6px; border-radius: 2px;">Enquiry 5</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.8pt; color: #000000; margin: 0; line-height: 1.3;">
            William III and Mary II accept the Crown subject to the Bill of Rights, establishing that the King cannot raise taxes, suspend laws, or keep a standing army without Parliament.
          </p>
        </div>

      </div>

      ${renderFooterStrip(9, 'From 1534 to 1689, Parliament evolved from Henry VIII’s occasional legal tool into the sovereign ruler of the Crown.', 16)}
    </div>
  </div>
`;

  // ====================================================================
  // PAGES 10–11: ENQUIRY 4 (CIVIL WAR & REGICIDE)
  // ====================================================================
  html += renderSpinePage(enquiryConfigs[3], 10);
  html += renderRightPage(enquiryConfigs[3], 11);

  // ====================================================================
  // PAGES 12–13: ENQUIRY 5 (CROWN, CHURCH, OR PARLIAMENT?)
  // ====================================================================
  html += renderSpinePage(enquiryConfigs[4], 12);
  html += renderRightPage(enquiryConfigs[4], 13);

  // ====================================================================
  // PAGES 14–15: DEDICATED LINED NOTES PAGES (EXERCISE BOOK RULING WITH MARGIN)
  // ====================================================================
  html += renderNotesPage(
    14,
    'Notes: Record key causal links, essay plans, and teacher feedback for this unit.',
  );
  html += renderNotesPage(
    15,
    'Notes: Record key causal links, essay plans, and teacher feedback for this unit.',
  );

  // ====================================================================
  // PAGE 16: OUTSIDE BACK COVER (PROGRESS LEDGER + 5 QR CODES - MEDICINE STYLE)
  // ====================================================================
  html += `
  <!-- PAGE 16: OUTSIDE BACK COVER -->
  <div class="page page-container verso-page" id="page-16" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Back Cover Header Strip -->
      <div style="border-bottom: 2px solid #0f284e; padding-bottom: 3px; margin-bottom: 6px;">
        <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 11.5pt; color: #0f284e; text-transform: uppercase; font-weight: 900; letter-spacing: 0.5px;">
          Key Stage 3 History &bull; Pupil Progress &amp; Assessment Record
        </h2>
      </div>

      <!-- Pupil Details & Target Level Strip -->
      <div style="border: 1.5px solid #0f284e; border-radius: 4px; padding: 7px 12px; background: #ffffff; display: grid; grid-template-columns: 2fr 1fr 1.3fr; gap: 14px; align-items: center; margin-bottom: 5px;">
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f284e; text-transform: uppercase; margin-right: 8px;">Pupil Name:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #0f284e; height: 14px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f284e; text-transform: uppercase; margin-right: 8px;">Class:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #0f284e; height: 14px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f284e; text-transform: uppercase; margin-right: 8px;">Target KS3 Level:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #0f284e; height: 14px; text-align: center; font-weight: 900; color: #0f284e;"></div>
        </div>
      </div>

      <!-- KS3 History Progress Pathways & Descriptors -->
      <div style="border: 1.5px solid #0f284e; border-radius: 4px; padding: 6px 8px; background: #ffffff; margin-bottom: 5px; font-family: 'Inter', sans-serif;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.2px solid #0f284e; background: #f0f4f9; padding: 3px 6px; margin-bottom: 4px; border-radius: 2px;">
          <strong style="font-size: 8pt; text-transform: uppercase; letter-spacing: 0.5px; color: #0f284e;">
            Key Stage 3 History Assessment Pathways &bull; Level Descriptors &amp; Criteria
          </strong>
          <span style="font-size: 7.2pt; font-weight: 800; color: #0f284e;">YEAR 8 STANDARDS</span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 5px; font-size: 7pt; line-height: 1.3;">
          <div style="border: 1px solid #cbd5e1; border-radius: 3px; padding: 5px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-weight: 900; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 3px; font-size: 7.2pt; text-transform: uppercase; color: #0f284e;">
                Emerging (1–2)
              </div>
              Recalls key historical narrative facts; describes basic Tudor/Stuart events using guided sentence starters.
            </div>
            <div style="margin-top: 4px; font-size: 6.4pt; font-style: italic; border-top: 1px dashed #cbd5e1; padding-top: 2px; color: #475569;">
              <strong style="color: #0f284e;">Focus:</strong> Add dates &amp; key vocabulary.
            </div>
          </div>
          <div style="border: 1px solid #cbd5e1; border-radius: 3px; padding: 5px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-weight: 900; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 3px; font-size: 7.2pt; text-transform: uppercase; color: #0f284e;">
                Emerging+ (3)
              </div>
              Identifies reasons for events; begins to describe causes of religious changes and civil conflict with structured paragraphs.
            </div>
            <div style="margin-top: 4px; font-size: 6.4pt; font-style: italic; border-top: 1px dashed #cbd5e1; padding-top: 2px; color: #475569;">
              <strong style="color: #0f284e;">Focus:</strong> Explain *why*, not just *what*.
            </div>
          </div>
          <div style="border: 1px solid #cbd5e1; border-radius: 3px; padding: 5px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-weight: 900; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 3px; font-size: 7.2pt; text-transform: uppercase; color: #0f284e;">
                Expected (4–5)
              </div>
              Explains multiple causes &amp; consequences; writes structured causal paragraphs using precise statutes and dates.
            </div>
            <div style="margin-top: 4px; font-size: 6.4pt; font-style: italic; border-top: 1px dashed #cbd5e1; padding-top: 2px; color: #475569;">
              <strong style="color: #0f284e;">Focus:</strong> Compare relative importance.
            </div>
          </div>
          <div style="border: 1.2px solid #0f284e; border-radius: 3px; padding: 5px; background: #f0f4f9; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-weight: 900; border-bottom: 1px solid #0f284e; padding-bottom: 2px; margin-bottom: 3px; font-size: 7.2pt; text-transform: uppercase; color: #0f284e;">
                Expected+ (6–7)
              </div>
              Analyses causal significance; evaluates competing historical interpretations and weighs counter-arguments with detailed evidence.
            </div>
            <div style="margin-top: 4px; font-size: 6.4pt; font-style: italic; border-top: 1px dashed #93c5fd; padding-top: 2px; color: #1e293b;">
              <strong style="color: #0f284e;">Focus:</strong> Sustained historical criteria.
            </div>
          </div>
          <div style="border: 1.2px solid #0f284e; border-radius: 3px; padding: 5px; background: #f0f4f9; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-weight: 900; border-bottom: 1px solid #0f284e; padding-bottom: 2px; margin-bottom: 3px; font-size: 7.2pt; text-transform: uppercase; color: #0f284e;">
                Greater Depth (8–9)
              </div>
              Sustained, nuanced evaluative judgement; synthesises constitutional, political, and religious change across the 1517–1689 period.
            </div>
            <div style="margin-top: 4px; font-size: 6.4pt; font-style: italic; border-top: 1px dashed #93c5fd; padding-top: 2px; color: #1e293b;">
              <strong style="color: #0f284e;">Focus:</strong> Nuanced historical judgement.
            </div>
          </div>
        </div>
      </div>

      <!-- Streamlined KS3 Marking Grid (Low-Friction & Periodic Marking Standard) -->
      <div style="border: 1.5px solid #0f284e; border-radius: 4px; overflow: hidden; margin-bottom: 5px;">
        <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif; font-size: 8pt;">
          <thead>
            <tr style="background: #0f284e; color: #ffffff;">
              <th style="padding: 7px 4px; width: 10%; text-align: center; border-right: 1px solid rgba(255,255,255,0.25); font-size: 7.5pt; text-transform: uppercase; color: #ffffff;">Date</th>
              <th style="padding: 7px 8px; width: 43%; text-align: left; border-right: 1px solid rgba(255,255,255,0.25); font-size: 7.5pt; text-transform: uppercase; color: #ffffff;">Enquiry &bull; Assessment Focus</th>
              <th style="padding: 7px 6px; width: 17%; text-align: center; border-right: 1px solid rgba(255,255,255,0.25); font-size: 7.5pt; text-transform: uppercase; color: #ffffff;">KS3 Level / Effort</th>
              <th style="padding: 7px 8px; width: 30%; text-align: left; font-size: 7.5pt; text-transform: uppercase; color: #ffffff;">Teacher Comment / Spellings</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 16px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 16px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.5pt; color: #0f284e;">Enquiry 1: Henry VIII &amp; Break with Rome</div>
                <div style="font-size: 7.5pt; color: #475569; margin-top: 2px;">Causal Explanation: Break with Rome (1527–34)</div>
              </td>
              <td style="padding: 16px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">
                &nbsp;
              </td>
              <td style="padding: 16px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 16px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 16px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.5pt; color: #0f284e;">Enquiry 2: Elizabeth I &amp; Religious Settlement</div>
                <div style="font-size: 7.5pt; color: #475569; margin-top: 2px;">Source Utility &amp; Consequence of Middle Way</div>
              </td>
              <td style="padding: 16px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">
                &nbsp;
              </td>
              <td style="padding: 16px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 16px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 16px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.5pt; color: #0f284e;">Enquiry 3: Spanish Armada &amp; Naval Power</div>
                <div style="font-size: 7.5pt; color: #475569; margin-top: 2px;">Analytical Narrative: Defeat of the Armada (1588)</div>
              </td>
              <td style="padding: 16px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">
                &nbsp;
              </td>
              <td style="padding: 16px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 16px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 16px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.5pt; color: #0f284e;">Enquiry 4: Causes of the English Civil War</div>
                <div style="font-size: 7.5pt; color: #475569; margin-top: 2px;">Causal Essay: Divine Right vs Parliament (1642)</div>
              </td>
              <td style="padding: 16px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">
                &nbsp;
              </td>
              <td style="padding: 16px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 16px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 16px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.5pt; color: #0f284e;">Enquiry 5: Trial of Charles I &amp; Bill of Rights</div>
                <div style="font-size: 7.5pt; color: #475569; margin-top: 2px;">Evaluative Judgement: Turning point in Crown vs Parliament</div>
              </td>
              <td style="padding: 16px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">
                &nbsp;
              </td>
              <td style="padding: 16px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
            <tr style="border-bottom: 1px solid #0f284e; background: #f0f4f9;">
              <td style="padding: 16px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 16px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.5pt; color: #0f284e;">Independent Study &amp; Notes Portfolio</div>
                <div style="font-size: 7.5pt; color: #475569; margin-top: 2px;">Pages 14–15 Enquiry Notes, Reflection &amp; Revision Tasks</div>
              </td>
              <td style="padding: 16px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">
                &nbsp;
              </td>
              <td style="padding: 16px 8px; background: #f0f4f9;">&nbsp;</td>
            </tr>
            <tr style="background: #ffffff; border-top: 1.5px solid #0f284e;">
              <td style="padding: 16px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 16px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.5pt; color: #0f284e;">Teacher-Designated Assessment Task</div>
                <div style="font-size: 7.5pt; color: #475569; margin-top: 2px;">Designated Key Enquiry Assessment (Teacher Selected)</div>
              </td>
              <td style="padding: 16px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">
                &nbsp;
              </td>
              <td style="padding: 16px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Interactive Digital Quizzing Hub (Medicine Style) -->
      <div style="border: 1.5px solid #0f284e; border-radius: 4px; padding: 6px 8px; background: #ffffff;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.2px solid #0f284e; background: #f0f4f9; padding: 3px 6px; margin-bottom: 4px; border-radius: 2px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; text-transform: uppercase; color: #0f284e;">
            📱 Interactive Digital Quizzing Hub &bull; Scan for Instant Retrieval Practice
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 800; background: #0f284e; color: #ffffff; border: 1px solid #0f284e; padding: 1px 5px; border-radius: 2px;">
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
          <div style="border: 1.2px solid #0f284e; border-radius: 3px; padding: 5px 2px; background: #ffffff; display: flex; flex-direction: column; align-items: center; justify-content: space-between;">
            <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; margin-bottom: 1px; color: #0f284e;">
              Enquiry ${cfg.lessonNum}
            </div>
            <div style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 700; color: #475569; margin-bottom: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%;">
              ${shortLabels[idx]}
            </div>
            <div style="width: 24mm; height: 24mm; margin: 0 auto 2px auto;">
              ${qrSvg}
            </div>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.2pt; font-weight: 800; text-transform: uppercase; background: #0f284e; color: #ffffff; padding: 1px 5px; border-radius: 2px; margin-bottom: 2px;">
              Scan to Quiz
            </span>
            <div style="font-family: 'Inter', sans-serif; font-size: 8.5pt; font-weight: 900; color: #0f284e; margin-top: 1px; white-space: nowrap;">
              Best Score: [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 8</strong> ]
            </div>
          </div>`;
            })
            .join('')}
        </div>
      </div>

      ${renderFooterStrip(16, "Unlike Charles I in 1642, scanning these revision QR codes won't cost your head. Test yourself regularly.", 16)}
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
    'Rendering 16-Page A4 Pupil Workbook (Medicine/CME Standard): Crown, Church, or Parliament (1517–1689)...',
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
