/**
 * scripts/generate_eee_quiz_booklet.cjs
 *
 * Compiles the 16-Page Master Knowledge Retrieval & Homework Companion
 * for Pearson Edexcel GCSE (9–1) History: Early Elizabethan England, 1558–1588.
 *
 * Page Architecture (16-Page A4 Booklet):
 * - Page 1: Master Front Cover with Formative Tracking Ledger & Student Identity
 *           (Strict School Anonymity: data-department-name customizer standard)
 * - Pages 2–13: 12 Dedicated Lesson Pages (1 page per lesson • 10 questions each = 120 questions)
 *               High-legibility 10.5pt font size • Zero clutter / Zero flowcharts / Zero DIRT
 *               2 roomy writing lines per question:
 *               Line 1: Answer: [Core Historical Fact]
 *               Line 2: Detail / Why: [Significance or Historical Context]
 *               Header QR code linking directly to interactive online quiz
 * - Pages 14–16: 3 Dedicated Marking Bank Pages (Key Topics 1, 2, and 3)
 *                High-density 9.5pt font size with bold answers and historical explanations.
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const QRCode = require('qrcode');

const ROOT_DIR = path.join(__dirname, '..');
const PDFS_DIR = path.join(ROOT_DIR, 'public', 'pdfs');
const OUTPUT_HTML = path.join(ROOT_DIR, 'public', 'units', 'eee', 'quiz_pack.html');
const OUTPUT_PDF = path.join(PDFS_DIR, 'Early_Elizabethan_England_Quiz_Pack.pdf');

if (!fs.existsSync(PDFS_DIR)) {
  fs.mkdirSync(PDFS_DIR, { recursive: true });
}

// Base64 helper for offline PDF rendering
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

// QR Code SVG generator
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

// --------------------------------------------------------------------------
// 120 SPECIFICATION QUESTIONS ACROSS 12 LESSONS (10 QUESTIONS PER LESSON)
// Strictly anchored to the 5 enquiry stages (2 questions per stage)
// --------------------------------------------------------------------------
const QUIZ_DATA = [
  // LESSON 1.1
  {
    lessonId: 'lesson_1_1',
    kt: 'KEY TOPIC 1.1',
    lessonNum: 1,
    title: 'The Situation on Elizabeth’s Accession, 1558',
    enquiry: 'How dangerous was the crisis facing Elizabeth I upon her accession in 1558?',
    questions: [
      {
        q: 'How much Crown debt did Elizabeth inherit upon her accession in November 1558?',
        a: '£300,000 (inherited from Mary I).',
        exp: 'The Crown owed £300,000 against ordinary annual revenues of barely £286,000, creating immediate financial vulnerability.',
      },
      {
        q: 'What exorbitant interest rate was the Crown forced to pay European lenders on the Antwerp Exchange?',
        a: '14 per cent.',
        exp: 'Over £100,000 was owed to Antwerp financiers, leaving England vulnerable to economic blackmail from the Habsburg Netherlands.',
      },
      {
        q: 'How many trusted noblemen and statesmen comprised Elizabeth’s executive Privy Council?',
        a: '19 members.',
        exp: 'Led by Principal Secretary William Cecil, this compact executive body managed national defense, finance, and foreign diplomacy daily.',
      },
      {
        q: 'What political mechanism of granting titles, offices, and trade monopolies did Elizabeth use to secure noble loyalty?',
        a: 'Royal patronage.',
        exp: 'By balancing rival court factions and distributing lucrative privileges, Elizabeth maintained sovereign control without a standing army.',
      },
      {
        q: 'Why did Roman Catholics regard Henry VIII’s marriage to Anne Boleyn as unlawful?',
        a: 'The Pope had refused to annul Henry’s first marriage to Catherine of Aragon.',
        exp: 'Catholics viewed Catherine as Henry’s only lawful wife, branding Elizabeth an illegitimate child with zero divine right to rule.',
      },
      {
        q: 'What parliamentary statute passed in 1536 formally declared Elizabeth illegitimate?',
        a: 'The Second Succession Act.',
        exp: 'Passed after Anne Boleyn was executed for treason, the act created enduring statutory doubt despite Henry’s 1544 will.',
      },
      {
        q: 'Which unpaid local officials from the country gentry enforced statutory law and held county quarter sessions?',
        a: 'Justices of the Peace (JPs).',
        exp: 'Around 20–40 JPs per county administered poor relief, fixed wage rates, and maintained public order without a salaried police force.',
      },
      {
        q: 'What sole constitutional power did Parliament possess that gave MPs financial leverage over the monarch?',
        a: 'Sole authority to approve extraordinary taxation (subsidies).',
        exp: 'Because ordinary feudal revenues were insufficient in wartime, Elizabeth was forced to summon Parliament whenever she needed tax revenue.',
      },
      {
        q: 'Which vital French port and commercial gateway held by England since 1347 was lost in January 1558?',
        a: 'Calais.',
        exp: 'Its capture by the Duke of Guise shattered English national prestige and stripped the realm of its last military foothold on mainland Europe.',
      },
      {
        q: 'What traditional military and diplomatic alliance between France and Scotland threatened England’s northern border?',
        a: 'The Auld Alliance.',
        exp: 'French garrisons stationed in Scotland under regent Mary of Guise left England vulnerable to a coordinated two-front invasion.',
      },
    ],
  },

  // LESSON 1.2
  {
    lessonId: 'lesson_1_2',
    kt: 'KEY TOPIC 1.2',
    lessonNum: 2,
    title: "The 'Settlement' of Religion, 1559",
    enquiry:
      'How successfully did Elizabeth’s 1559 settlement balance Protestant doctrine and Catholic tradition?',
    questions: [
      {
        q: 'What was the broad geographical divide in English religious sympathies in 1558?',
        a: 'Catholic North and West vs Protestant South and East.',
        exp: 'Landed northern aristocrats remained Catholic, whereas London, Kent, and East Anglia embraced Protestant reformation ideas.',
      },
      {
        q: 'Approximately how many Protestants were burned at the stake for heresy during the reign of Mary I?',
        a: 'Nearly 300 Protestants.',
        exp: 'These Marian burnings created intense anti-Catholic trauma and generated deep public hatred of Spanish and papal influence.',
      },
      {
        q: "What title did Elizabeth accept under the 1559 Act of Supremacy instead of 'Supreme Head'?",
        a: 'Supreme Governor of the Church of England.',
        exp: 'This compromise pacified Catholics who believed Christ or the Pope was Head, and Puritans who believed no woman could be head of church.',
      },
      {
        q: 'What oath of loyalty were all clergymen, judges, and royal officials required to swear on pain of dismissal?',
        a: 'The Oath of Supremacy.',
        exp: 'Refusing the oath meant immediate loss of office, property confiscation, and charges of treason upon repeated refusal.',
      },
      {
        q: 'What fine was imposed on recusants who refused to attend Anglican Sunday services under the Act of Uniformity?',
        a: 'One shilling (12 pence) per missed service.',
        exp: 'While affordable for wealthy gentry, 12d represented a full week’s wages for ordinary agricultural labourers.',
      },
      {
        q: 'Which liturgical book in English was made mandatory in all parish churches by the 1559 Act of Uniformity?',
        a: 'The 1559 Book of Common Prayer.',
        exp: 'It combined Edward VI’s 1549 and 1552 prayer books, using deliberate ambiguity over the Eucharist to allow diverse interpretations.',
      },
      {
        q: 'What controversial rule retained traditional church decorations and clerical vestments from 1548?',
        a: 'The Ornaments Rubric.',
        exp: 'Elizabeth insisted that churches retain traditional candles and clerical robes, provoking furious objections from returning Puritans.',
      },
      {
        q: 'How many Royal Injunctions were issued in summer 1559 to provide practical rules for parish worship?',
        a: '57 Royal Injunctions.',
        exp: 'Drafted by William Cecil, they detailed everything from preaching quarterly sermons to vetting prospective clergy wives.',
      },
      {
        q: 'What text was legally required to be placed in every parish church for parishioners to read?',
        a: 'An English Bible.',
        exp: 'This reinforced the central Protestant doctrine that scripture must be accessible to all believers in their native tongue.',
      },
      {
        q: 'How did the Catholic bishopric respond to the Oath of Supremacy during the 1559 Royal Visitations?',
        a: 'All Marian bishops except one refused the Oath and were dismissed.',
        exp: 'Only the Bishop of Llandaff conformed; Elizabeth replaced all dismissed Catholic bishops with loyal Protestant reformers.',
      },
    ],
  },

  // LESSON 1.3
  {
    lessonId: 'lesson_1_3',
    kt: 'KEY TOPIC 1.3',
    lessonNum: 3,
    title: 'Challenge to the Religious Settlement',
    enquiry:
      'Why did both Puritans and Catholics challenge Elizabeth’s religious settlement in the 1560s?',
    questions: [
      {
        q: 'What name was given to English Protestants who returned from Geneva and Zurich demanding church purification?',
        a: 'Marian Exiles (or Puritans).',
        exp: 'They had witnessed Calvinist reform abroad and demanded the complete eradication of all remaining Catholic ceremonies in England.',
      },
      {
        q: 'What democratic form of church government, run by local elders without bishops, did radical Puritans advocate?',
        a: 'Presbyterianism.',
        exp: 'Presbyterians challenged the monarch’s power to appoint bishops, which Elizabeth viewed as a direct threat to royal authority.',
      },
      {
        q: 'What decorative object did Elizabeth insist on keeping in her Royal Chapel, provoking Puritan bishop resignations?',
        a: 'A silver crucifix (cross).',
        exp: 'Puritan bishops threatened resignation over what they saw as Catholic idol worship; Elizabeth backed down and removed the cross.',
      },
      {
        q: "What traditional white linen garment did radical Puritan ministers refuse to wear as 'popish livery'?",
        a: 'The surplice.',
        exp: 'Puritans argued that plain black scholar gowns should be worn, claiming ornate vestments had no authority in the Bible.',
      },
      {
        q: 'What document did Archbishop Matthew Parker issue in 1566 to enforce clerical dress codes?',
        a: 'The Book of Advertisements.',
        exp: 'Parker mandated that all clergy wear the surplice during communion and outdoor apparel, triggering the Vestments Controversy.',
      },
      {
        q: 'How many London clergy were suspended and deprived of their pulpits in 1566 for refusing the surplice?',
        a: '37 ministers.',
        exp: 'Despite their dismissal, the ministers formed underground Puritan printing presses and separatist congregations in London.',
      },
      {
        q: 'What term described Catholics who outwardly attended Anglican services to avoid fines while secretly practising Catholicism?',
        a: 'Church Papists.',
        exp: 'Most English Catholics conformed outwardly during the 1560s because early recusancy enforcement was deliberately lenient.',
      },
      {
        q: 'Which Spanish general was sent to the Netherlands in 1567 with 10,000 troops to crush Dutch Protestant rebels?',
        a: 'The Duke of Alba.',
        exp: 'Alba established the brutal Council of Troubles ("Council of Blood"), positioning a massive Spanish army directly across the Channel.',
      },
      {
        q: 'How much gold and silver did Elizabeth confiscate from Spanish ships sheltering in English ports in 1568?',
        a: '400,000 florins (the Genoese Loan).',
        exp: 'Elizabeth seized money intended to pay Alba’s troops, claiming the silver still legally belonged to Genoese bankers.',
      },
      {
        q: 'How did Philip II and Alba retaliate against Elizabeth’s seizure of the Genoese Loan?',
        a: 'Imposed a total trade embargo on English cloth in Antwerp.',
        exp: 'The embargo disrupted English wool exports, pushing London merchants into economic recession and escalating Anglo-Spanish hostility.',
      },
    ],
  },

  // LESSON 1.4
  {
    lessonId: 'lesson_1_4',
    kt: 'KEY TOPIC 1.4',
    lessonNum: 4,
    title: 'The Problem of Mary, Queen of Scots, 1568–69',
    enquiry:
      'Why did the arrival of Mary, Queen of Scots create an insoluble dilemma for the Elizabethan regime?',
    questions: [
      {
        q: 'Through which English royal ancestor did Mary, Queen of Scots derive her claim to the English crown?',
        a: 'Margaret Tudor (Henry VIII’s elder sister).',
        exp: 'As Henry VIII’s great-niece, Mary was viewed by strict Catholics as the legitimate, Catholic, God-ordained heir to Elizabeth.',
      },
      {
        q: 'Who did Mary marry in July 1565, uniting the two strongest Catholic claims to the English succession?',
        a: 'Henry Stuart, Lord Darnley.',
        exp: 'Darnley was also a Tudor descendant; their marriage caused intense panic in Whitehall over a unified Catholic succession.',
      },
      {
        q: 'At which Edinburgh house was Lord Darnley murdered in a gunpowder explosion on 10 February 1567?',
        a: "Kirk o' Field.",
        exp: 'Darnley was found strangled in an adjoining garden, triggering a massive political scandal that destroyed Mary’s authority in Scotland.',
      },
      {
        q: 'Who was the chief suspect in Darnley’s assassination, whom Mary shockingly married in May 1567?',
        a: 'James Hepburn, 4th Earl of Bothwell.',
        exp: 'Marrying Bothwell under Protestant rites alienated Scottish nobles and Catholic Europe, triggering an immediate armed uprising.',
      },
      {
        q: 'At which confrontation in June 1567 did Mary surrender to rebellious Scottish Protestant lords?',
        a: 'Carberry Hill.',
        exp: 'Mary’s army melted away without fighting; Bothwell fled into Scandinavian exile while Mary was taken captive to Edinburgh.',
      },
      {
        q: 'In which island fortress was Mary imprisoned and forced to abdicate the Scottish throne?',
        a: 'Lochleven Castle.',
        exp: 'Under threat of death, Mary signed deeds of abdication on 24 July 1567 in favour of her one-year-old infant son, James VI.',
      },
      {
        q: 'Who was crowned King of Scotland in 1567 following Mary’s forced abdication?',
        a: 'James VI (with the Earl of Moray as regent).',
        exp: 'Protestant regent Moray established firm control, ensuring Scotland remained allied to Elizabethan England.',
      },
      {
        q: 'Where in England did Mary land in an open fishing boat on 16 May 1568 after fleeing Scotland?',
        a: 'Workington in Cumberland.',
        exp: 'Following her defeat at the Battle of Langside, Mary fled across the Solway Firth seeking Elizabeth’s military protection.',
      },
      {
        q: 'What controversial letters were produced at the York Inquiry (1568–69) to accuse Mary of murder?',
        a: 'The Casket Letters.',
        exp: 'Eight French love letters allegedly written by Mary to Bothwell were produced by Moray to prove her complicity in Darnley’s murder.',
      },
      {
        q: 'Which English nobleman was given custody of Mary during her long confinement at Tutbury and Sheffield?',
        a: 'George Talbot, 6th Earl of Shrewsbury.',
        exp: 'Mary remained under Shrewsbury’s surveillance for fifteen years, acting as a permanent magnetic pole for Catholic conspiracies.',
      },
    ],
  },

  // LESSON 2.1
  {
    lessonId: 'lesson_2_1',
    kt: 'KEY TOPIC 2.1',
    lessonNum: 5,
    title: 'Plots and Revolts at Home, 1569–1587',
    enquiry:
      'How close did Catholic conspiracies come to deposing Elizabeth and executing Mary, Queen of Scots?',
    questions: [
      {
        q: 'Which two Catholic magnates led the Revolt of the Northern Earls in November 1569?',
        a: 'The Earl of Northumberland and the Earl of Westmorland.',
        exp: 'They resented their loss of court power to Protestant newcomers like Cecil and sought to restore traditional Catholic worship.',
      },
      {
        q: 'In which major building did northern rebels burn English service books and celebrate Latin Mass in 1569?',
        a: 'Durham Cathedral.',
        exp: 'Celebrating Mass at Durham symbolized the restoration of Roman Catholicism across the north of England.',
      },
      {
        q: 'How many ordinary northern rebels did Elizabeth execute following the collapse of the 1569 uprising?',
        a: 'Approximately 450 rebels.',
        exp: 'Elizabeth ordered public hangings in every rebellious northern village to terrify the population and permanently crush feudal rebellion.',
      },
      {
        q: 'What papal bull was issued by Pope Pius V in February 1570, excommunicating Queen Elizabeth?',
        a: 'Regnans in Excelsis.',
        exp: 'The bull declared Elizabeth a heretic and released English Catholics from their allegiance, transforming religious belief into treason.',
      },
      {
        q: 'Which Italian banker orchestrated a 1571 plot involving the Duke of Norfolk and 10,000 Spanish troops?',
        a: 'Roberto Ridolfi.',
        exp: 'Ridolfi travelled between Rome, Madrid, and Brussels planning a Spanish invasion under Alba to marry Mary to the Duke of Norfolk.',
      },
      {
        q: 'Which English peer was executed on Tower Hill in June 1572 for treasonous involvement in the Ridolfi Plot?',
        a: 'Thomas Howard, 4th Duke of Norfolk.',
        exp: 'Norfolk was the premier peer of England; his execution showed that royal justice applied to the highest nobility in the realm.',
      },
      {
        q: 'Which French Catholic aristocrat was intended to lead an invasion army in the 1583 Throckmorton Plot?',
        a: 'The Duke of Guise (funded by Philip II).',
        exp: 'Guise planned to land in Sussex, liberate Mary, and murder Elizabeth; Walsingham intercepted Throckmorton’s coded documents.',
      },
      {
        q: 'What national loyalty oath was drafted in 1584 pledging to execute anyone attempting Elizabeth’s murder?',
        a: 'The Bond of Association.',
        exp: 'Drafted by Cecil and Walsingham, signers swore to execute anyone attempting or benefiting from the assassination of the Queen.',
      },
      {
        q: 'Through what ingenious concealment method were coded letters smuggled to Mary at Chartley Hall in 1586?',
        a: 'Waterproof cartridges inside beer barrels.',
        exp: 'Double agent Gilbert Gifford intercepted every letter, allowing Walsingham’s cryptanalyst Thomas Phelippes to decode them.',
      },
      {
        q: 'On what date was Mary, Queen of Scots beheaded at Fotheringhay Castle following the Babington Plot?',
        a: '8 February 1587.',
        exp: 'Mary’s execution removed the domestic figurehead for Catholic plots, but provoked Philip II into launching the Spanish Armada.',
      },
    ],
  },

  // LESSON 2.2
  {
    lessonId: 'lesson_2_2',
    kt: 'KEY TOPIC 2.2',
    lessonNum: 6,
    title: 'Relations with Spain, 1569–1585',
    enquiry:
      'How did commercial rivalry and proxy warfare in the Netherlands escalate tensions towards direct conflict?',
    questions: [
      {
        q: 'Who was the devout Catholic King of Spain and Habsburg superpower monarch during Elizabeth’s reign?',
        a: 'King Philip II.',
        exp: 'Ruling Spain, the Spanish Netherlands, and the American empire, Philip saw himself as the supreme defender of the Catholic faith.',
      },
      {
        q: 'Which Protestant Dutch prince led the armed rebellion against Spanish rule in the Netherlands?',
        a: 'William of Orange (William the Silent).',
        exp: 'Assassinated in July 1584, William’s death left Dutch rebels leaderless and forced Elizabeth to consider direct intervention.',
      },
      {
        q: 'What name was given to Dutch Protestant privateers whom Elizabeth sheltered in English Channel ports?',
        a: 'The Sea Beggars.',
        exp: 'They disrupted Spanish supply fleets in the Channel until Elizabeth expelled them in 1572, prompting them to seize the Dutch port of Brill.',
      },
      {
        q: 'Which English naval pioneer and privateer was ambushed by the Spanish fleet at San Juan de Ulúa in 1568?',
        a: 'Sir John Hawkins.',
        exp: 'The Spanish ambush destroyed several English ships, convincing Hawkins and Drake that Spanish treaties could never be trusted.',
      },
      {
        q: 'In what year did Francis Drake set sail on his famous global circumnavigation voyage?',
        a: '1577 (returning in September 1580).',
        exp: 'Backed secretly by Elizabeth and Privy Councillors, Drake’s expedition raided undefended Spanish treasure ports across the Pacific.',
      },
      {
        q: 'What was the name of the Spanish treasure galleon captured by Drake off Peru, yielding 26 tons of silver?',
        a: "Nuestra Señora de la Concepción (the 'Cacafuego').",
        exp: 'Drake seized eighty pounds of gold, thirteen chests of coins, and 26 tons of silver, making the voyage the richest plunder in history.',
      },
      {
        q: 'Where and when did Queen Elizabeth publicly knight Francis Drake, infuriating King Philip II?',
        a: 'Aboard the Golden Hind at Deptford in April 1581.',
        exp: 'Elizabeth’s public knighthood demonstrated open royal defiance against Philip’s demands for Drake to be hanged as a pirate.',
      },
      {
        q: 'Which European kingdom and navy did Philip II inherit and annex in 1580, expanding Spanish naval power?',
        a: 'Portugal.',
        exp: 'Annexing Portugal gave Spain control of Lisbon harbour, the Portuguese oceanic battle fleet, and extensive Atlantic trade routes.',
      },
      {
        q: 'What secret treaty did Spain sign with the French Catholic League in December 1584 to isolate England?',
        a: 'The Treaty of Joinville.',
        exp: 'The treaty united France and Spain against European Protestantism, eliminating the threat of France attacking Spain during an invasion.',
      },
      {
        q: 'Which treaty did Elizabeth sign in August 1585, committing 7,400 troops and officially declaring war on Spain?',
        a: 'The Treaty of Nonsuch.',
        exp: 'Elizabeth placed the Netherlands under English military protection, crossing the Rubicon into direct armed conflict with Spain.',
      },
    ],
  },

  // LESSON 2.3
  {
    lessonId: 'lesson_2_3',
    kt: 'KEY TOPIC 2.3',
    lessonNum: 7,
    title: 'The Outbreak of War with Spain, 1585–1588',
    enquiry:
      'Why did the Netherlands campaign falter, and how did Drake’s raid on Cadiz disrupt Armada preparations?',
    questions: [
      {
        q: 'Which English nobleman was appointed commander of English forces in the Netherlands in December 1585?',
        a: 'Robert Dudley, Earl of Leicester.',
        exp: 'Leicester led 7,000 soldiers to support the Dutch, but suffered from inadequate funding and severe tactical disagreements.',
      },
      {
        q: 'What title did Leicester accept from Dutch authorities in January 1586, causing furious rage from Elizabeth?',
        a: 'Governor-General of the Low Countries.',
        exp: 'Elizabeth was outraged because accepting sovereign executive title implied England sought to depose Philip and annex the Netherlands.',
      },
      {
        q: 'Which famous Elizabethan poet and courtier died from battlefield wounds following the Battle of Zutphen in 1586?',
        a: 'Sir Philip Sidney.',
        exp: 'Sidney’s death made him a Protestant martyr, but the battle failed to capture the Spanish-held town of Zutphen.',
      },
      {
        q: 'Which key fortress was betrayed to the Spanish in January 1587 by the English Catholic commander William Stanley?',
        a: 'Deventer (alongside the Zutphen sconces).',
        exp: 'Stanley and Rowland York defected to Spain, destroying Dutch confidence in English military leadership and alliances.',
      },
      {
        q: 'On what date in April 1587 did Francis Drake attack the Spanish naval base at Cadiz harbour?',
        a: '19 April 1587.',
        exp: 'Drake sailed twenty-four warships directly into Cadiz harbour in a bold pre-emptive strike against assembling Armada transports.',
      },
      {
        q: 'Approximately how many Spanish transport ships and warships did Drake destroy during the Cadiz raid?',
        a: '30 vessels.',
        exp: 'Drake burned and captured warships and supply transports over 36 hours, exposing the vulnerability of Spanish home naval ports.',
      },
      {
        q: 'What famous boast did Drake make regarding his pre-emptive strike on Cadiz?',
        a: 'That he had "singed the King of Spain\'s beard".',
        exp: 'Drake’s phrase mocked Philip II and demonstrated English naval mastery over Spanish defensive coastal positions.',
      },
      {
        q: 'What vital material used for making food and water storage barrels did Drake burn thousands of tons of?',
        a: 'Seasoned oak barrel staves.',
        exp: 'Destroying seasoned wood forced Spain to use green timber barrels, causing food to rot and fresh drinking water to leak during 1588.',
      },
      {
        q: 'By how long did Drake’s raid on Cadiz delay the launch of the Spanish Armada?',
        a: 'A full twelve months (one year).',
        exp: 'The delay gave England critical time to mobilize county militias, fortify southern coastal beacons, and complete race-built galleons.',
      },
      {
        q: 'Who was appointed Commander-in-Chief of the Spanish Armada following the death of Santa Cruz?',
        a: 'The Duke of Medina Sidonia.',
        exp: 'Medina Sidonia was an experienced land administrator but possessed no naval combat experience and suffered from chronic seasickness.',
      },
    ],
  },

  // LESSON 2.4
  {
    lessonId: 'lesson_2_4',
    kt: 'KEY TOPIC 2.4',
    lessonNum: 8,
    title: 'The Spanish Armada: Strategy, Conflict & Defeat, 1588',
    enquiry:
      'Why did the Spanish Armada fail, and how did its defeat reshape England’s national standing?',
    questions: [
      {
        q: 'How many total warships and supply transports set sail with the Spanish Armada in May 1588?',
        a: '130 ships.',
        exp: 'The fleet carried 8,000 sailors, 19,000 soldiers, and 2,400 cannons under the grand Enterprise of England.',
      },
      {
        q: 'Which Spanish general and army was the Armada designed to rendezvous with and escort from Flanders?',
        a: 'The Duke of Parma and his 27,000 veteran soldiers.',
        exp: 'Parma’s Army of Flanders was to be ferried across the English Channel in flat-bottomed barges under Armada naval escort.',
      },
      {
        q: 'What defensive formation did the Armada adopt that protected supply vessels across a seven-mile front?',
        a: 'The crescent formation.',
        exp: 'Heavily armed galleons guarded the curved wings, preventing English captains from isolating and boarding individual transports.',
      },
      {
        q: 'What long-range naval artillery guns did English galleons use to pound Spanish ships beyond boarding distance?',
        a: 'Culverins.',
        exp: 'Culverins fired 17-pound balls at long range; English captains stayed upwind to avoid close-quarters Spanish infantry boarding.',
      },
      {
        q: 'At which French roadstead did the Armada anchor on 6 August 1588 awaiting Parma’s troops?',
        a: 'Calais Roads.',
        exp: 'Medina Sidonia anchored in open water, but Parma was blockaded by Dutch flyboats in Dunkirk and unable to embark.',
      },
      {
        q: 'How did English commanders break the Spanish crescent formation at midnight on 7–8 August?',
        a: 'Sent eight pitch-soaked fireships into the packed anchorage.',
        exp: 'Fearing explosive "hellburners", Spanish captains cut their anchor cables in panic and scattered into the dark North Sea.',
      },
      {
        q: 'What major naval battle took place on 8 August 1588 where English galleons pounded the scattered Spanish fleet?',
        a: 'The Battle of Gravelines.',
        exp: 'English ships closed to point-blank range, firing rapid broadsides that sank three galleons and killed over 1,000 Spanish soldiers.',
      },
      {
        q: 'What name was given to the gale-force winds that drove the crippled Armada north into the North Sea?',
        a: 'The "Protestant Wind".',
        exp: 'Southwesterly gales prevented Medina Sidonia from rejoining Parma, forcing the battered fleet around Scotland and Ireland.',
      },
      {
        q: 'Where did Elizabeth deliver her famous speech proclaiming she had "the heart and stomach of a king"?',
        a: 'At the military troop camp at Tilbury.',
        exp: 'Elizabeth rallied county militia troops preparing for invasion, projecting heroic defiance and sovereign leadership.',
      },
      {
        q: 'How many battered Spanish ships out of the original 130 survived the voyage around Scotland and Ireland to reach home?',
        a: 'Barely 67 ships.',
        exp: 'Over forty vessels were wrecked on the rocky coasts of Ireland and Scotland, shattering the myth of Spanish naval invincibility.',
      },
    ],
  },

  // LESSON 3.1
  {
    lessonId: 'lesson_3_1',
    kt: 'KEY TOPIC 3.1',
    lessonNum: 9,
    title: 'Education and Leisure in Elizabethan England, 1558–1588',
    enquiry:
      'How far did education and leisure reflect both class division and changing cultural life in Elizabethan England?',
    questions: [
      {
        q: 'What Renaissance intellectual movement emphasized classical literature and civic governance in education?',
        a: 'Humanism.',
        exp: 'Humanists argued that education should develop rational, moral citizens capable of serving in royal government and local courts.',
      },
      {
        q: 'By the end of Elizabeth’s reign, what percentage of English men were literate compared to women?',
        a: 'Approximately 30% of men compared to under 10% of women.',
        exp: 'Literacy rose among merchants, yeomen, and gentry, while poor labourers and working women remained largely unschooled.',
      },
      {
        q: 'What basic primary schools run by local women or clergy taught young boys reading, writing, and arithmetic?',
        a: 'Petty Schools (or Dame Schools for girls).',
        exp: 'Pupils learned basic English reading using hornbooks before boys of the middling sort progressed to grammar school.',
      },
      {
        q: 'Approximately how many new endowed Grammar Schools were founded across England during the Elizabethan period?',
        a: 'Over 70 grammar schools.',
        exp: 'Independent of the Catholic Church, grammar schools allowed sons of yeomen and merchants to achieve modest social mobility.',
      },
      {
        q: 'Which ancient language formed the primary foundation of the Elizabethan grammar school curriculum?',
        a: 'Latin (grammar, rhetoric, and classical literature).',
        exp: 'Pupils memorized Latin texts by Cicero, Virgil, and Seneca, speaking exclusively in Latin to build fluency for university.',
      },
      {
        q: 'Which two English universities expanded significantly under Elizabeth to train clergy, lawyers, and civil servants?',
        a: 'Oxford and Cambridge.',
        exp: 'Both universities founded new colleges and reformed curricula to produce educated Anglican clergy and royal statesmen.',
      },
      {
        q: 'Where in London did wealthy young gentlemen study common law and prepare for roles in county administration?',
        a: 'The Inns of Court.',
        exp: 'Studying common law at the Inns provided essential legal knowledge for managing country estates and serving as Justices of the Peace.',
      },
      {
        q: 'Which exclusive aristocratic field sports were reserved for royalty and nobility to demonstrate martial skill?',
        a: 'Hunting deer, hawking, real tennis, and fencing.',
        exp: 'These expensive pastimes reinforced aristocratic chivalry, requiring vast private parks, specialized gear, and leisure time.',
      },
      {
        q: 'Which brutal spectator blood sport held at Paris Garden in Southwark attracted spectators from all social classes?',
        a: 'Bear-baiting (alongside bull-baiting and cockfighting).',
        exp: 'Huge crowds from vagrants to Queen Elizabeth enjoyed watching mastiffs attack chained bears, wagering heavily on the fights.',
      },
      {
        q: 'What was the name of England’s first purpose-built permanent commercial playhouse, built in Shoreditch in 1576?',
        a: 'The Theatre (built by James Burbage).',
        exp: 'Built outside the City of London’s jurisdiction, it welcomed up to 3,000 groundlings paying 1d and wealthy patrons in galleries.',
      },
    ],
  },

  // LESSON 3.2
  {
    lessonId: 'lesson_3_2',
    kt: 'KEY TOPIC 3.2',
    lessonNum: 10,
    title: 'The Problem of the Poor and Vagrancy, 1558–1588',
    enquiry:
      'Why did poverty escalate, and how did Elizabethan legislation reshape state welfare and punishment?',
    questions: [
      {
        q: 'By how much did the population of England increase between 1558 and 1600?',
        a: 'From 3 million to over 4.2 million.',
        exp: 'A 40% population surge caused consumer demand for bread grain to drastically outstrip agricultural production.',
      },
      {
        q: 'What happened to real wages in England due to rapid inflation and consecutive harvest failures?',
        a: 'Real wages collapsed by roughly 50%.',
        exp: 'Food prices rose while wages remained fixed, leaving ordinary rural labourers unable to afford basic bread subsistence.',
      },
      {
        q: 'What agricultural practice of fencing off common arable land for sheep pasture caused widespread rural eviction?',
        a: 'Enclosure.',
        exp: 'Landlords converted strip-farming crop fields into private sheep runs, needing only a few shepherds and evicting tenant families.',
      },
      {
        q: 'What proportion of Elizabethan English exports was accounted for by wool and woollen cloth?',
        a: '80 per cent of all exports.',
        exp: 'Wool profitability drove landowners to maximize grazing acreage at the direct expense of labour-intensive arable farming.',
      },
      {
        q: 'What legal distinction did Elizabethan authorities make between the two categories of impoverished people?',
        a: 'The Impotent Poor vs the Idle/Sturdy Poor.',
        exp: 'The Impotent Poor were genuinely unable to work (elderly, sick, orphans); the Sturdy Poor were able-bodied but accused of laziness.',
      },
      {
        q: "Which author wrote the influential 1567 book 'A Caveat for Common Cursitors', warning of organised criminal vagrants?",
        a: 'Thomas Harman.',
        exp: 'Harman sensationalized vagrant categories like "counterfeit cranks" and "priggers", stoking upper-class terror of rebellion.',
      },
      {
        q: 'What painful physical punishment was introduced by the 1572 Vagabonds Act for beggars over fourteen?',
        a: 'Severe whipping and boring a hole through the right ear with a hot iron.',
        exp: 'Repeat offenders faced hanging as felons, reflecting Tudor determination to terrorize vagrants into staying in their home parishes.',
      },
      {
        q: 'What groundbreaking compulsory local tax was established under the 1572 Vagabonds Act to fund poor relief?',
        a: 'The Poor Rate.',
        exp: 'Every parish was legally mandated to assess local property owners and appoint Overseers of the Poor to distribute relief.',
      },
      {
        q: 'What raw materials were county Justices of the Peace required to provide for the unemployed under the 1576 Poor Act?',
        a: 'Wool, hemp, flax, and iron.',
        exp: 'For the first time, statute law accepted state responsibility to provide work for the able-bodied rather than merely punishing them.',
      },
      {
        q: 'What disciplinary institutions, also known as Bridewells, were established under the 1576 Act to force vagrants to work?',
        a: 'Houses of Correction.',
        exp: 'Vagrants who refused available work were locked in Bridewells and subjected to hard manual labour under corporal discipline.',
      },
    ],
  },

  // LESSON 3.3
  {
    lessonId: 'lesson_3_3',
    kt: 'KEY TOPIC 3.3',
    lessonNum: 11,
    title: 'Exploration and Voyages of Discovery, 1558–1588',
    enquiry:
      'How did navigational advances and Drake’s circumnavigation transform England into a maritime power?',
    questions: [
      {
        q: 'Which navigational instruments did Elizabethan sailors use to calculate latitude by measuring sun or star elevation?',
        a: 'Astrolabes and quadrants.',
        exp: 'Measuring the angular height of the Pole Star or midday sun allowed captains to determine latitude on uncharted oceanic voyages.',
      },
      {
        q: 'What map projection introduced in 1569 allowed navigators to plot reliable straight-line courses across open oceans?',
        a: 'The Mercator Projection (Gerardus Mercator).',
        exp: 'Mercator’s conformal cylindrical chart represented lines of constant compass bearing as straight lines, revolutionizing navigation.',
      },
      {
        q: 'What revolutionary galleon design with lower forecastles and lateen sails was developed by Sir John Hawkins?',
        a: 'The race-built galleon.',
        exp: 'Longer, lower, and narrower than bulky Spanish ships, race-built galleons sailed faster and tacked closer into prevailing winds.',
      },
      {
        q: 'What type of cannons mounted on compact four-wheel truck carriages allowed English galleons to fire rapid broadsides?',
        a: 'Culverins.',
        exp: 'Compact four-wheeled carriages allowed English gun crews to rapidly haul back, reload, and run out guns through low gunports.',
      },
      {
        q: 'What commercial corporate model allowed English merchants to pool capital and share financial risk for distant voyages?',
        a: 'Joint-stock companies.',
        exp: 'Investors bought shares and split profits or losses, enabling expensive, hazardous expeditions without risking individual ruin.',
      },
      {
        q: 'What trading company received a royal charter in 1555 to establish direct commerce with Russia in furs and timber?',
        a: 'The Muscovy Company.',
        exp: 'Founded after Richard Chancellor reached Archangel, it bypassed Baltic Hanseatic merchants to trade directly with Tsar Ivan IV.',
      },
      {
        q: 'Which Arctic explorer led three expeditions in the 1570s in search of a North-West Passage to China?',
        a: 'Martin Frobisher (or John Davis).',
        exp: 'Though he failed to find the passage and brought back worthless iron pyrite (fool’s gold), he mapped Arctic waters around Baffin Island.',
      },
      {
        q: 'Through which treacherous strait at the southern tip of South America did Drake sail into the Pacific in 1578?',
        a: 'The Strait of Magellan.',
        exp: 'Surviving violent gales that destroyed four accompanying ships, Drake entered the Pacific alone in his renamed Golden Hind.',
      },
      {
        q: 'What territory in northern California did Drake claim for Queen Elizabeth in June 1579?',
        a: 'Nova Albion (New Britain).',
        exp: 'Drake careened his ship, made peaceful contact with local Coast Miwok people, and erected a brass plate claiming sovereign English title.',
      },
      {
        q: 'What financial return on investment did Drake’s circumnavigation yield for Elizabeth and his financial backers?',
        a: 'A staggering 4,700% return.',
        exp: 'Bringing home £140,000 in official treasure, the loot wiped out Elizabeth’s foreign debt and laid the seeds of global commercial empire.',
      },
    ],
  },

  // LESSON 3.4
  {
    lessonId: 'lesson_3_4',
    kt: 'KEY TOPIC 3.4',
    lessonNum: 12,
    title: 'Raleigh and the Colonisation of Virginia, 1584–1590',
    enquiry:
      'Why did the Roanoke colonial expeditions fail, and what vital lessons were learned for future empire-building?',
    questions: [
      {
        q: 'Which English courtier and explorer was granted a royal patent by Elizabeth in March 1584 to colonize America?',
        a: 'Sir Walter Raleigh.',
        exp: 'Raleigh funded expeditions to claim North American territory, though Elizabeth forbade him from leaving court to lead them in person.',
      },
      {
        q: 'What name did Raleigh give to the claimed American territory in honor of Elizabeth, the Virgin Queen?',
        a: 'Virginia.',
        exp: 'The name honored Elizabeth’s virgin status and established England’s first formal territorial claim on the North American continent.',
      },
      {
        q: "Which scholar wrote 'A Discourse on Western Planting' in 1584, promoting colonization as a base against Spain?",
        a: 'Richard Hakluyt.',
        exp: 'Hakluyt argued a colony would provide naval bases to raid Spanish treasure fleets, supply exotic timber, and reduce English poverty.',
      },
      {
        q: 'Who commanded the fleet of the 1585 Roanoke expedition, and who was appointed military governor?',
        a: 'Sir Richard Grenville (naval fleet) and Ralph Lane (colony governor).',
        exp: 'Grenville departed with the ships after landing, leaving Lane to govern 107 settlers with strict, rigid army discipline.',
      },
      {
        q: 'Why was the social makeup of the 107 colonists in 1585 fundamentally ill-suited for establishing a colony?',
        a: 'Lacked farmers and was dominated by gentlemen and soldiers who refused manual work.',
        exp: 'Gentlemen expected servants to feed them, while soldiers were prone to violence rather than tilling soil or building shelters.',
      },
      {
        q: 'What maritime accident damaged the flagship Tiger at Roanoke in July 1585, spoiling most of the colonists’ food?',
        a: 'Ran aground on a coastal sandbar, flooding the hold with seawater.',
        exp: 'Seawater ruined planting seeds and grain stores, forcing immediate, humiliating dependency upon the local Indigenous population.',
      },
      {
        q: 'Who was the paramount chief of the local Secotan tribe upon whom the starving 1585 colonists relied for food?',
        a: 'Chief Wingina.',
        exp: 'Wingina initially provided fish and corn from weirs, but English demands and European disease epidemics caused relations to collapse.',
      },
      {
        q: 'Which English privateer arrived at Roanoke in June 1586 and evacuated the surviving colonists back to England?',
        a: 'Sir Francis Drake.',
        exp: 'Drake arrived after raiding Spanish Florida; facing starvation and Indigenous attacks after Lane killed Wingina, the settlers fled.',
      },
      {
        q: 'Who was the first English child born in North America, born at Roanoke in August 1587?',
        a: 'Virginia Dare.',
        exp: 'Daughter of Ananias Dare and Eleanor White, her birth symbolized the attempt to establish a permanent civilian family colony.',
      },
      {
        q: 'What mysterious single word was carved on a palisade post when John White returned to the deserted colony in 1590?',
        a: 'CROATOAN.',
        exp: 'Delayed for three years by the Spanish Armada, White found the colony abandoned, with the carve indicating they moved to nearby Croatoan Island.',
      },
    ],
  },
];

// Helper to generate a single lesson question page (Pages 2–13)
function renderLessonQuestionPage(lesson, pageNum) {
  const qrUrl = `https://thehistorydepartment.org/units/eee/?lesson=${lesson.lessonId}`;
  const qrSvg = generateQrSvg(qrUrl);

  const questionsHtml = lesson.questions
    .map((item, idx) => {
      const qNum = idx + 1;
      return `
      <div class="q-block">
        <div class="q-stem">
          <span class="q-num">${qNum}.</span>
          <span class="q-text">${item.q}</span>
        </div>
        <div class="q-lines">
          <div class="write-line line-1"><span class="line-label">Answer / Detail:</span><span class="rule-line"></span></div>
          <div class="write-line line-2"><span class="rule-line full-rule"></span></div>
        </div>
      </div>
    `;
    })
    .join('');

  return `
    <div class="a4-page page-container" id="page-${pageNum}">
      <div class="page-header">
        <div class="header-left">
          <div class="spec-pill">${lesson.kt} &bull; EDEXCEL GCSE HISTORY</div>
          <h2 class="lesson-header-title">${lesson.lessonNum}. ${lesson.title}</h2>
          <div class="lesson-enquiry-subtitle">${lesson.enquiry}</div>
        </div>
        <div class="header-right">
          <div class="qr-container">
            ${qrSvg}
            <span class="qr-caption">Scan for Quiz</span>
          </div>
          <div class="score-badge">
            <span class="score-label">Score</span>
            <span class="score-val">/ 10</span>
          </div>
        </div>
      </div>

      <div class="questions-body">
        ${questionsHtml}
      </div>

      <div class="page-footer">
        <div class="footer-left">Early Elizabethan England, 1558–1588 &bull; Key Topic ${lesson.lessonNum <= 4 ? '1' : lesson.lessonNum <= 8 ? '2' : '3'} Master Assessment Pack</div>
        <div class="footer-right">Page ${pageNum}</div>
      </div>
    </div>
  `;
}

// Helper to render marking bank page (Pages 14–16)
function renderMarkingBankPage(ktTitle, lessons, pageNum) {
  const lessonsHtml = lessons
    .map((lesson) => {
      const itemsHtml = lesson.questions
        .map(
          (item, idx) => `
      <div class="mb-item">
        <span class="mb-qnum">Q${idx + 1}.</span>
        <strong class="mb-ans">${item.a}</strong>
        <span class="mb-exp">${item.exp}</span>
      </div>
    `,
        )
        .join('');

      return `
      <div class="mb-lesson-card">
        <div class="mb-lesson-header">
          <span class="mb-kt-badge">${lesson.kt}</span>
          <span class="mb-lesson-title">${lesson.title}</span>
        </div>
        <div class="mb-items-grid">
          ${itemsHtml}
        </div>
      </div>
    `;
    })
    .join('');

  return `
    <div class="a4-page page-container marking-bank-page" id="page-${pageNum}">
      <div class="page-header mb-header">
        <div class="header-left">
          <div class="spec-pill mb-pill">DEPARTMENT MARKING SCHEME &bull; AO1 FACTUAL RETRIEVAL</div>
          <h2 class="lesson-header-title mb-title">Marking Bank: ${ktTitle}</h2>
          <div class="lesson-enquiry-subtitle mb-sub">Official Pearson Edexcel GCSE (9–1) Core Knowledge & Model Factual Answers</div>
        </div>
        <div class="header-right">
          <div class="marking-badge">
            <span class="mb-icon">✓</span>
            <span class="mb-badge-text">Grade 9 Master Key</span>
          </div>
        </div>
      </div>

      <div class="marking-body">
        ${lessonsHtml}
      </div>

      <div class="page-footer">
        <div class="footer-left">Early Elizabethan England, 1558–1588 &bull; Department Assessment Ledger</div>
        <div class="footer-right">Page ${pageNum}</div>
      </div>
    </div>
  `;
}

// Generate the complete HTML
function generateBookletHtml() {
  const coverImageBase64 =
    getBase64Image('/images/armada_portrait.jpg') ||
    getBase64Image('/images/elizabeth_coronation_robes.jpg');

  // Tracking table rows for Page 1
  const trackingRows = QUIZ_DATA.map(
    (l, i) => `
    <tr>
      <td class="tb-hw"></td>
      <td class="tb-title"><strong>${l.kt}:</strong> ${l.title}</td>
      <td class="tb-box">/ 10</td>
      <td class="tb-box">/ 10</td>
      <td class="tb-box tb-parent"></td>
      <td class="tb-box tb-teacher"></td>
    </tr>
  `,
  ).join('');

  // 12 Question pages (Pages 2–13)
  const questionPages = QUIZ_DATA.map((l, idx) => renderLessonQuestionPage(l, idx + 2)).join('\n');

  // 3 Marking Bank pages (Pages 14–16)
  const mbKt1 = renderMarkingBankPage(
    'Key Topic 1: Queen, Government & Religion (1558–69)',
    QUIZ_DATA.slice(0, 4),
    14,
  );
  const mbKt2 = renderMarkingBankPage(
    'Key Topic 2: Challenges at Home and Abroad (1569–88)',
    QUIZ_DATA.slice(4, 8),
    15,
  );
  const mbKt3 = renderMarkingBankPage(
    'Key Topic 3: Society in the Age of Exploration (1558–88)',
    QUIZ_DATA.slice(8, 12),
    16,
  );

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Early Elizabethan England, 1558–1588 — Master Retrieval & Quiz Pack</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 0;
    }
    *, *::before, *::after {
      box-sizing: border-box;
    }
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      background: #f1f5f9;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .a4-page {
      width: 210mm;
      height: 297mm;
      max-height: 297mm;
      margin: 0 auto;
      background: #ffffff;
      padding: 14mm 16mm 12mm 16mm;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      page-break-after: always;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }
    @media print {
      body { background: #ffffff; }
      .a4-page { box-shadow: none; margin: 0; }
    }

    /* COVER PAGE (PAGE 1) */
    .cover-page {
      padding: 12mm 16mm 10mm 16mm;
      text-align: center;
    }
    .cover-top-banner {
      background: #0f172a;
      color: #ffffff;
      padding: 5px 12px;
      font-size: 8pt;
      font-weight: 800;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      border-radius: 4px;
      margin-bottom: 8px;
    }
    .school-brand-target {
      color: #f8fafc;
    }
    .cover-title {
      font-size: 23pt;
      font-weight: 900;
      color: #1e3a8a;
      margin: 4px 0 2px 0;
      line-height: 1.15;
      font-family: "Georgia", serif;
      letter-spacing: -0.5px;
    }
    .cover-subtitle {
      font-size: 11pt;
      font-weight: 700;
      color: #475569;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 8px;
    }

    .cover-hero-container {
      margin: 4px auto 8px auto;
      max-height: 52mm;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .cover-hero-img {
      max-height: 52mm;
      max-width: 90%;
      object-fit: contain;
      border-radius: 4px;
      border: 1.5px solid #cbd5e1;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .student-id-grid {
      display: grid;
      grid-template-columns: 2fr 1.5fr 1fr;
      gap: 12px;
      background: #f8fafc;
      border: 1.5px solid #cbd5e1;
      border-radius: 6px;
      padding: 8px 14px;
      margin: 6px 0 10px 0;
      font-size: 9.5pt;
      text-align: left;
    }
    .id-field {
      display: flex;
      align-items: center;
      gap: 6px;
      font-weight: 700;
      color: #334155;
    }
    .id-field span.line {
      flex: 1;
      border-bottom: 1.5px solid #0f172a;
      min-height: 14px;
    }

    .tracking-table-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      margin-bottom: 4px;
    }
    .cover-table-title {
      font-size: 8.5pt;
      font-weight: 800;
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      margin-bottom: 4px;
      text-align: left;
    }
    .tracking-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 7.5pt;
    }
    .tracking-table th {
      background: #1e3a8a;
      color: #ffffff;
      padding: 3.5px 6px;
      font-weight: 800;
      text-transform: uppercase;
      font-size: 7pt;
      border: 1px solid #1e3a8a;
      text-align: center;
    }
    .tracking-table td {
      border: 1px solid #cbd5e1;
      padding: 3px 6px;
      vertical-align: middle;
      color: #1e293b;
    }
    .tb-hw { text-align: center; width: 55px; font-weight: 600; font-size: 7pt; }
    .tb-title { text-align: left; }
    .tb-box { text-align: center; width: 44px; font-weight: 700; }
    .tb-parent { width: 75px; }
    .tb-teacher { width: 55px; }

    /* LESSON QUESTION PAGES (PAGES 2–13) */
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2px solid #1e3a8a;
      padding-bottom: 6px;
      margin-bottom: 8px;
    }
    .spec-pill {
      display: inline-block;
      background: #1e3a8a;
      color: #ffffff;
      font-size: 7pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1px;
      padding: 2px 8px;
      border-radius: 3px;
      margin-bottom: 3px;
    }
    .lesson-header-title {
      font-size: 13.5pt;
      font-weight: 900;
      color: #0f172a;
      margin: 2px 0 2px 0;
      font-family: "Georgia", serif;
      line-height: 1.15;
    }
    .lesson-enquiry-subtitle {
      font-size: 8.5pt;
      font-style: italic;
      color: #475569;
      line-height: 1.25;
    }
    .header-right {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .qr-container {
      width: 44px;
      height: 44px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .qr-caption {
      font-size: 5.5pt;
      font-weight: 700;
      color: #475569;
      text-transform: uppercase;
      margin-top: 1px;
    }
    .score-badge {
      background: #f8fafc;
      border: 1.5px solid #cbd5e1;
      border-radius: 4px;
      padding: 4px 10px;
      text-align: center;
      min-width: 52px;
    }
    .score-label {
      display: block;
      font-size: 6.5pt;
      font-weight: 800;
      color: #64748b;
      text-transform: uppercase;
    }
    .score-val {
      font-size: 12pt;
      font-weight: 900;
      color: #1e3a8a;
    }

    .questions-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin: 2px 0 6px 0;
    }
    .q-block {
      display: flex;
      flex-direction: column;
      margin-bottom: 2px;
    }
    .q-stem {
      display: flex;
      align-items: baseline;
      gap: 5px;
      font-size: 10.2pt;
      font-weight: 700;
      color: #0f172a;
      line-height: 1.22;
      margin-bottom: 2px;
    }
    .q-num {
      color: #1e3a8a;
      font-weight: 900;
      min-width: 18px;
    }
    .q-text {
      flex: 1;
    }
    .q-lines {
      display: flex;
      flex-direction: column;
      gap: 6px;
      padding-left: 23px;
    }
    .write-line {
      display: flex;
      align-items: flex-end;
      height: 22px;
    }
    .line-label {
      font-size: 8pt;
      font-weight: 700;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      margin-right: 6px;
      white-space: nowrap;
      padding-bottom: 2px;
    }
    .rule-line {
      flex: 1;
      border-bottom: 1.2px solid #94a3b8;
      height: 100%;
    }
    .full-rule {
      width: 100%;
    }

    /* MARKING BANK PAGES (PAGES 14–16) */
    .marking-bank-page {
      padding: 12mm 14mm 10mm 14mm;
    }
    .mb-header {
      border-bottom: 2px solid #047857;
      margin-bottom: 8px;
    }
    .mb-pill {
      background: #047857;
    }
    .mb-title {
      font-size: 14pt;
      color: #065f46;
    }
    .mb-sub {
      color: #047857;
    }
    .marking-badge {
      display: flex;
      align-items: center;
      gap: 6px;
      background: #ecfdf5;
      border: 1.5px solid #10b981;
      padding: 5px 10px;
      border-radius: 4px;
    }
    .mb-icon {
      color: #047857;
      font-weight: 900;
      font-size: 12pt;
    }
    .mb-badge-text {
      font-size: 7.5pt;
      font-weight: 800;
      color: #065f46;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .marking-body {
      flex: 1;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      gap: 10px;
      margin-bottom: 4px;
    }
    .mb-lesson-card {
      background: #f8fafc;
      border: 1.2px solid #cbd5e1;
      border-top: 3px solid #047857;
      border-radius: 4px;
      padding: 6px 8px;
      display: flex;
      flex-direction: column;
    }
    .mb-lesson-header {
      display: flex;
      align-items: center;
      gap: 6px;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 3px;
      margin-bottom: 4px;
    }
    .mb-kt-badge {
      background: #065f46;
      color: #ffffff;
      font-size: 6pt;
      font-weight: 800;
      padding: 1.5px 5px;
      border-radius: 2px;
      text-transform: uppercase;
    }
    .mb-lesson-title {
      font-size: 8pt;
      font-weight: 800;
      color: #0f172a;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .mb-items-grid {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
      gap: 3px;
    }
    .mb-item {
      font-size: 7.2pt;
      line-height: 1.2;
      color: #334155;
    }
    .mb-qnum {
      font-weight: 800;
      color: #047857;
      margin-right: 2px;
    }
    .mb-ans {
      color: #0f172a;
      font-weight: 800;
    }
    .mb-exp {
      color: #64748b;
      margin-left: 3px;
    }

    /* FOOTER */
    .page-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #cbd5e1;
      padding-top: 4px;
      font-size: 7pt;
      color: #64748b;
      font-weight: 600;
    }
  </style>
</head>
<body>

  <!-- PAGE 1: FRONT COVER & TRACKING LEDGER -->
  <div class="a4-page cover-page" id="page-1">
    <div class="cover-top-banner" data-department-name="The History Department">
      <span class="school-brand-target">The History Department</span> &bull; GCSE (9–1) HISTORY REVISION HUB
    </div>

    <h1 class="cover-title">Early Elizabethan England, 1558–1588</h1>
    <div class="cover-subtitle">Edexcel GCSE Paper 2 (Section B) &bull; Master Assessment & Retrieval Pack</div>

    ${
      coverImageBase64
        ? `
      <div class="cover-hero-container">
        <img src="${coverImageBase64}" class="cover-hero-img" alt="Queen Elizabeth I Portrait">
      </div>
    `
        : ''
    }

    <div class="student-id-grid">
      <div class="id-field"><span>Pupil Name:</span><span class="line"></span></div>
      <div class="id-field"><span>Teacher:</span><span class="line"></span></div>
      <div class="id-field"><span>Target Grade:</span><span class="line"></span></div>
    </div>

    <div class="tracking-table-container">
      <div class="cover-table-title">Formative Assessment Tracking Ledger (12 Enquiries &bull; 120 Questions)</div>
      <table class="tracking-table">
        <thead>
          <tr>
            <th style="width: 55px;">H.W. Date</th>
            <th>Enquiry & Specification Focus</th>
            <th style="width: 44px;">Att 1</th>
            <th style="width: 44px;">Att 2</th>
            <th style="width: 75px;">Parent Signature</th>
            <th style="width: 55px;">Teacher Sign</th>
          </tr>
        </thead>
        <tbody>
          ${trackingRows}
        </tbody>
      </table>
    </div>

    <div class="page-footer">
      <div class="footer-left">Early Elizabethan England, 1558–1588 &bull; Pearson Edexcel Specification Companion</div>
      <div class="footer-right">Page 1</div>
    </div>
  </div>

  <!-- PAGES 2–13: 12 DEDICATED ENQUIRY RETRIEVAL PAGES -->
  ${questionPages}

  <!-- PAGES 14–16: 3 DEDICATED MARKING BANK PAGES -->
  ${mbKt1}
  ${mbKt2}
  ${mbKt3}

</body>
</html>`;
}

async function run() {
  console.log('Generating Early Elizabethan England Quiz Pack HTML...');
  const html = generateBookletHtml();

  // Ensure output dir exists
  const unitHtmlDir = path.dirname(OUTPUT_HTML);
  if (!fs.existsSync(unitHtmlDir)) {
    fs.mkdirSync(unitHtmlDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_HTML, html, 'utf8');
  console.log(`✓ HTML written to ${OUTPUT_HTML}`);

  console.log('Launching Puppeteer to compile 16-page PDF...');
  const chromePath =
    process.env.PUPPETEER_EXECUTABLE_PATH ||
    (fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
      ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
      : undefined);

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: chromePath,
    protocolTimeout: 600000,
    timeout: 300000,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--allow-file-access-from-files',
      '--disable-web-security',
    ],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600 });
  await page.setContent(html, { waitUntil: 'networkidle0' });

  // Verify page count
  const pageContainers = await page.$$('.a4-page');
  console.log(`Detected ${pageContainers.length} pages in DOM.`);

  if (pageContainers.length !== 16) {
    console.warn(`⚠️ Warning: Expected 16 pages, but found ${pageContainers.length}.`);
  }

  console.log(`Printing PDF to ${OUTPUT_PDF}...`);
  await page.pdf({
    path: OUTPUT_PDF,
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: false,
    margin: { top: '0mm', bottom: '0mm', left: '0mm', right: '0mm' },
  });

  await browser.close();
  console.log(`\n🎉 Early Elizabethan England Quiz Pack successfully created!`);
  console.log(`PDF saved to: ${OUTPUT_PDF}`);
}

run().catch((err) => {
  console.error('Fatal error during PDF generation:', err);
  process.exit(1);
});
