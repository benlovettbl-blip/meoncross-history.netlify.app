const fs = require('fs');
const path = require('path');

const eeePath = path.resolve('units/eee/data.js');
const rawContent = fs.readFileSync(eeePath, 'utf8');
const endIdx = rawContent.indexOf('\nif (typeof module');
const jsonPart = rawContent.substring('const eee_data = '.length, endIdx).trim().replace(/;$/, '');
const data = JSON.parse(jsonPart);

console.log('Loaded EEE data with', data.lessons.length, 'lessons.');

// Helper to update or replace source fields cleanly
function updateSource(source, updates) {
  Object.assign(source, updates);
  // If written source, remove image paths
  if (updates.type === 'written') {
    delete source.src;
    delete source.image;
    delete source.source;
    delete source.image_url;
  }
}

// -------------------------------------------------------------
// Lesson 1.1: Accession 1558
// -------------------------------------------------------------
const l11 = data.lessons.find((l) => l.id === 'lesson_1_1');
if (l11) {
  // Source C: John Knox First Blast on Gender & Monarchical Rule (matches Block 3)
  updateSource(l11.sources[2], {
    title:
      "Source C: John Knox, 'The First Blast of the Trumpet Against the Monstrous Regiment of Women' (1558)",
    type: 'written',
    text: 'To promote a woman to bear rule, superiority, dominion, or empire above any realm, nation, or city, is repugnant to nature; an insult to God, a thing most contrary to his revealed will and approved ordinance; and finally, it is the subversion of good order, of all equity and justice... Woman in her greatest perfection was made to serve and obey man, not to rule and govern him.',
    provenance:
      'Geneva, Switzerland (Printed Tract widely circulated in England and Scotland), 1558.',
    citation: 'Geneva, Switzerland, 1558.',
    question_badge: 'Source Inference',
    question_type: 'Source Inference',
    enquiry_question:
      'What can you infer from Source C about the contemporary religious and political objections to female monarchical rule facing Elizabeth in 1558?',
    model_answer:
      'Source C shows that contemporary religious theorists viewed female monarchy as unnatural and contrary to divine law, creating intense skepticism that Elizabeth could command military forces or govern without a male sovereign consort.',
    teacher_notes: {
      source_context:
        "Calvinist preacher John Knox published his tract against Mary Tudor and Mary of Guise just months before Elizabeth's accession. His fierce patriarchal argument that women were incapable of rule created immediate diplomatic friction with the young Queen. **Hinge Question:** Why did Knox's fierce condemnation of female sovereignty threaten Elizabeth's legitimacy even though Knox was an ardent Protestant reformer?",
    },
  });

  // Source D: Parliamentary Subsidy Grant and Duties of JPs (matches Block 4)
  updateSource(l11.sources[3], {
    title: 'Source D: Royal Commission of the Peace and Parliamentary Subsidy Instructions (1559)',
    type: 'written',
    text: "The Queen's Majesty strictly commandeth all Justices of the Peace within every shire of this realm diligently to assemble themselves in their quarter sessions, to inquire into all riots, unlawful assemblies, vagabonds, and breaches of the peace, and to levy the royal subsidies granted by Parliament without fear, favor, or corruption, preserving good order and justice among the common people.",
    provenance: 'The National Archives, Kew (SP 12/2), Royal Commission of the Peace, April 1559.',
    citation: 'The National Archives, Kew (SP 12/2), April 1559.',
    question_badge: 'Reliability & Provenance',
    question_type: 'Reliability & Provenance',
    enquiry_question:
      'Why is Source D reliable evidence for understanding the strengths and weaknesses of Elizabethan governance in the English shires?',
    model_answer:
      'Source D is an official royal directive proving that royal authority depended on unpaid local gentry (JPs), meaning Crown policy was effectively enforced only when local elites remained willing and loyal to implement royal orders.',
    teacher_notes: {
      source_context:
        'Without a standing army or professional civil service, Elizabeth relied on roughly 30 to 50 unpaid Justices of the Peace per county. JPs held quarterly sessions, maintained roads, regulated wages, and enforced royal religious policy. **Hinge Question:** Why was the unpaid nature of Elizabethan Justices of the Peace both a vital economic strength and a dangerous administrative vulnerability for the Crown?',
    },
  });
}

// -------------------------------------------------------------
// Lesson 1.2: The Settlement of Religion, 1559
// -------------------------------------------------------------
const l12 = data.lessons.find((l) => l.id === 'lesson_1_2');
if (l12) {
  // Source C: Cecil Memorandum on Uniformity Bill (written source)
  updateSource(l12.sources[2], {
    title:
      "Source C: Sir William Cecil's Confidential Memorandum on Passing the Uniformity Bill (April 1559)",
    type: 'written',
    text: "The bill of uniformity for the service and sacraments passeth with extreme difficulty in the Upper House. The bishops oppose it stubbornly as heresy. If two of the chief prelates [the Bishops of Winchester and Lincoln] be not sequestered in the Tower before the division, the votes will stand equal and the Queen's reformation shall be overthrown.",
    provenance:
      "The National Archives, Kew (SP 12/1), Sir William Cecil's private notes for the Privy Council, April 1559.",
    citation: 'The National Archives, Kew (SP 12/1), April 1559.',
    question_badge: "Author's Purpose",
    question_type: "Author's Purpose",
    enquiry_question:
      "Why was Cecil's memorandum written, and what does it reveal about the fragility of the 1559 Settlement in Parliament?",
    model_answer:
      'Cecil wrote this confidential memorandum to orchestrate the imprisonment of Catholic bishops on charges of contempt, ensuring the Uniformity Bill could pass the House of Lords by the razor-thin margin of 21 votes to 18.',
    teacher_notes: {
      source_context:
        "The House of Lords was dominated by Catholic peers and Marian bishops. By imprisoning Bishops White and Watson in the Tower and obtaining the decisive abstention of the Abbot of Westminster, Cecil engineered a narrow three-vote victory for Protestant liturgy. **Hinge Question:** How does Cecil's tactical imprisonment of two Catholic bishops demonstrate that the Elizabethan Settlement was established through political coercion rather than parliamentary consensus?",
    },
  });

  // Source E: Papal Condemnation of Settlement (written source)
  updateSource(l12.sources[4], {
    title: 'Source E: Papal Dispatch of Pope Pius IV Condemning the Elizabethan Settlement (1560)',
    type: 'written',
    text: 'We understand with profound grief that Elizabeth, the pretended Queen of England, hath abolished the Holy Sacrifice of the Mass, replaced the sacred Latin liturgy with a heretical vernacular service, and compelled Catholic clergy under severe penalties to swear allegiance to her monstrous spiritual supremacy.',
    provenance:
      'Vatican Secret Archives, Rome, Epistolae ad Principes (Dispatch to the Catholic Princes of Europe), 1560.',
    citation: 'Vatican Secret Archives, Rome, 1560.',
    question_badge: "Author's Purpose",
    question_type: "Author's Purpose",
    enquiry_question:
      "What was the Papacy's objective in issuing this dispatch regarding the 1559 Elizabethan Church Settlement?",
    model_answer:
      "The Papacy intended to denounce Elizabeth's Royal Supremacy as illegitimate and mobilize continental Catholic rulers (particularly France and Spain) to isolate England and refuse to recognize the Protestant settlement.",
    teacher_notes: {
      source_context:
        'Although Pope Pius V would later formally excommunicate Elizabeth in 1570, the Vatican immediately branded the 1559 Acts of Supremacy and Uniformity as schismatic and invalid, laying the ideological groundwork for Catholic resistance. **Hinge Question:** Why did the Papacy avoid issuing an immediate formal bull of excommunication in 1559, waiting instead until 1570?',
    },
  });
}

// -------------------------------------------------------------
// Lesson 1.3: Challenge to the Religious Settlement
// -------------------------------------------------------------
const l13 = data.lessons.find((l) => l.id === 'lesson_1_3');
if (l13) {
  // Source A: Bishop Jewel on the Crucifix Controversy (Puritan Challenge, Block 1)
  updateSource(l13.sources[0], {
    title:
      'Source A: Bishop John Jewel on the Crucifix Controversy in the Royal Chapel (February 1560)',
    type: 'written',
    text: "That little silver cross of ill-omened origin still maintains its place in the Queen's chapel. Wretched me! This thing will soon be taken for an example and set up in parish churches everywhere. I have already spoken freely against it; would that it were dashed to pieces and reduced to powder, for the people will think it an idol!",
    provenance:
      'Zurich Letters, Letter from John Jewel, Bishop of Salisbury, to Peter Martyr in Zurich, 4 February 1560.',
    citation: 'Zurich Letters, Parker Society Archives, 1560.',
    question_badge: 'Source Inference',
    question_type: 'Source Inference',
    enquiry_question:
      "What can you infer from Source A about the core theological concerns dividing radical Puritans from Elizabeth's religious settlement?",
    model_answer:
      "Source A reveals that Puritans viewed crucifixes and visual imagery as idolatrous remnants of Catholicism, fearing that Elizabeth's insistence on displaying a cross in her royal chapel would encourage ordinary churchgoers to continue traditional Catholic devotions.",
    teacher_notes: {
      source_context:
        'Elizabeth insisted on retaining a silver cross and candles in her royal chapel to appease Catholic foreign ambassadors and conservative subjects. Radical Marian exiles who had returned from Geneva and Zurich viewed this as intolerable idolatry and threatened to resign their bishoprics. **Hinge Question:** Why did Elizabeth consider keeping the crucifix in her chapel a matter of vital political diplomacy rather than minor theological debate?',
    },
  });

  // Source B: Matthew Parker on Vestments Controversy (Block 2)
  updateSource(l13.sources[1], {
    title:
      'Source B: Chronicle Account of Archbishop Parker and the Lambeth Vestments Confrontation (March 1566)',
    type: 'written',
    text: "Thirty-seven ministers of London, being called before Archbishop Parker at Lambeth Palace and commanded to wear the square cap, gown, and linen surplice, did stubbornly refuse, crying out: 'We cannot consent to wear the livery of the Antichrist and the rags of popery!' Whereupon they were instantly suspended from their livings and forbidden to preach, leaving London parishes without divine service.",
    provenance:
      "John Stow, 'Annales of England', contemporary London chronicle recording the Lambeth clerical suspensions, March 1566.",
    citation: 'John Stow, Annales of England, British Library, 1566.',
    question_badge: "Author's Purpose",
    question_type: "Author's Purpose",
    enquiry_question:
      'Why did 37 London clergymen risk their careers and livings over clerical vestments in 1566?',
    model_answer:
      "They believed the surplice and square cap were 'popish rags' that falsely suggested priests had supernatural powers during communion, preferring suspension rather than compromising their strict Protestant conscience.",
    teacher_notes: {
      source_context:
        "In 1566, Archbishop Matthew Parker issued his 'Book of Advertisements' enforcing uniform dress for clergy. At Lambeth Palace, a clergyman dressed in full canonicals was stood before London ministers with the order: 'Be as this man is, or lose your livings.' 37 refused. **Hinge Question:** Why did Elizabeth demand absolute outward uniformity in clerical dress even when it alienated her most educated Protestant preachers?",
    },
  });

  // Source D: Father William Allen & Douai Seminary (Block 4)
  updateSource(l13.sources[3], {
    title: 'Source D: Father William Allen on Founding the English College at Douai (1568)',
    type: 'written',
    text: 'Our purpose in erecting this seminary at Douai in Flanders is to draw together English Catholic scholars in exile, to preserve the ancient faith in our native language, and to train zealous young priests who shall return to England secretly to administer the sacraments, reconcile lapsed believers, and rescue Catholic souls from heresy, even at the peril of death.',
    provenance:
      "Cardinal William Allen, 'Apology for the English Seminaries', Douai, Flanders, 1568.",
    citation: 'Douai College Archives, 1568.',
    question_badge: "Author's Purpose",
    question_type: "Author's Purpose",
    enquiry_question:
      "What was William Allen's purpose in establishing the English College at Douai in 1568?",
    model_answer:
      'Allen aimed to preserve English Catholic priesthood by educating young exiles abroad and training missionary priests to re-enter England clandestine to sustain the Catholic faith.',
    teacher_notes: {
      source_context:
        "As traditional Marian Catholic priests grew old and died, the Catholic faith in England faced extinction. William Allen founded Douai College in Spanish-controlled Flanders to educate a new generation of missionary priests, transforming passive English Catholicism into an active Counter-Reformation movement. **Hinge Question:** How did the arrival of seminary priests from Douai transform the Elizabethan government's perception of Catholic subjects from harmless dissenters into active traitors?",
    },
  });

  // Source E: Cecil on the Genoese Loan Seizure (Block 5)
  updateSource(l13.sources[4], {
    title:
      "Source E: Sir William Cecil's Privy Council Warrant Seizing the Genoese Bullion Ships (November 1568)",
    type: 'written',
    text: 'Whereas five Spanish vessels carrying 400,000 florins of silver borrowed from Genoese bankers have taken refuge from Huguenot privateers in the ports of Plymouth and Southampton: let the bullion be brought ashore and safely secured in the Tower of London. Since the money belongeth to the merchants of Genoa until delivered to the Duke of Alba in Antwerp, Her Majesty hath decided to take up the loan herself.',
    provenance: 'Privy Council Register, Whitehall (PC 2/9), November 1568.',
    citation: 'The National Archives, Kew (PC 2/9), November 1568.',
    question_badge: 'Reliability & Provenance',
    question_type: 'Reliability & Provenance',
    enquiry_question:
      'Why is Source E significant for explaining the sudden collapse of Anglo-Spanish trade relations in 1568–1569?',
    model_answer:
      "Source E documents Elizabeth's deliberate legal seizure of money intended to pay Alba's Spanish troops in the Netherlands, directly causing Alba to retaliate by placing an embargo on all English cloth in Antwerp.",
    teacher_notes: {
      source_context:
        "Cecil discovered that the Spanish Crown did not technically own the silver until it arrived in Antwerp; it remained the property of Italian bankers. Elizabeth audaciously took over the loan, leaving Alba's army unpaid and mutinous. Alba responded by impounding English property in the Low Countries. **Hinge Question:** How did Cecil's seizure of the Genoese loan expose the fundamental economic vulnerability of Spanish military power in the Netherlands?",
    },
  });
}

// -------------------------------------------------------------
// Lesson 1.4: Mary, Queen of Scots, 1568–69
// -------------------------------------------------------------
const l14 = data.lessons.find((l) => l.id === 'lesson_1_4');
if (l14) {
  // Source C: Lochleven Abdication Deed (Block 3)
  updateSource(l14.sources[2], {
    title: 'Source C: The Deed of Abdication Extorted from Mary at Lochleven Castle (24 July 1567)',
    type: 'written',
    text: 'We, Mary, by the grace of God Queen of Scots, being by long sickness and grievous travail so vexed and weary of government that our frail body and spirit can no longer endure the weight thereof, do freely resign and give over the Crown and royal estate of this realm to our dearest son, Prince James, and ordain our brother, James, Earl of Moray, to be Regent.',
    provenance: 'Acts of the Parliament of Scotland, Lochleven Castle, 24 July 1567.',
    citation: 'National Records of Scotland, Edinburgh (PA2/10), 1567.',
    question_badge: 'Reliability & Provenance',
    question_type: 'Reliability & Provenance',
    enquiry_question:
      'How does the provenance of Source C undermine its reliability as evidence that Mary Stuart freely renounced the Scottish Crown?',
    model_answer:
      'Source C was signed under direct duress while Mary was imprisoned on an island in Lochleven Castle, with Lord Lindsay threatening to cut her throat unless she signed away her crown.',
    teacher_notes: {
      source_context:
        "Following the scandal of her marriage to Bothwell (the prime suspect in Darnley's murder), Protestant Scottish confederate lords imprisoned Mary in Lochleven Castle and forced her signature. Mary immediately revoked her abdication upon escaping from the island in May 1568. **Hinge Question:** Why did Mary's forced abdication create a dangerous constitutional dilemma for Queen Elizabeth when Mary fled across the Solway Firth into England?",
    },
  });

  // Source D: Casket Letters at York (Block 4)
  updateSource(l14.sources[3], {
    title:
      'Source D: The Disputed Casket Letters Produced by Regent Moray at the York Inquiry (December 1568)',
    type: 'written',
    text: "Extract from the alleged letter of Mary to Bothwell: 'I must have your love, else let me die... You have made me dissemble so far that I have horror at it. Blame me not if I obey you to bring him [Darnley] to Glasgow. You force me to a deceitful play... He suspecteth greatly, but I shall bring him to Kirk o' Field, where he shall be at your disposal.'",
    provenance:
      'Copies preserved in The National Archives, Kew (SP 53/2), produced before English Commissioners at York, December 1568.',
    citation: 'The National Archives, Kew (SP 53/2), 1568.',
    question_badge: "Author's Purpose",
    question_type: "Author's Purpose",
    enquiry_question:
      'Why did the Scottish Protestant lords produce the Casket Letters at the York Inquiry?',
    model_answer:
      "The Scottish lords wanted to prove Mary was complicit in Darnley's murder and an unfit adulteress, preventing Elizabeth from using English troops to restore Mary to the Scottish throne.",
    teacher_notes: {
      source_context:
        "The Casket Letters were eight unsigned French letters and sonnets allegedly found in a silver casket left behind by Bothwell. Mary was denied sight of the originals or permission to defend herself. Cecil engineered a verdict that Darnley's murder was 'not proven' against either side, justifying Mary's indefinite English detention. **Hinge Question:** How did Cecil's inconclusive verdict at York serve Elizabeth's strategic foreign policy perfectly?",
    },
  });

  // Source E: Sir Ralph Sadler on Mary's Captivity at Bolton Castle (Block 5)
  updateSource(l14.sources[4], {
    title:
      "Source E: Sir Ralph Sadler's Confidential Dispatch on Mary's Custody at Bolton Castle (January 1569)",
    type: 'written',
    text: 'This Queen of Scots hath a charming and eloquent tongue; she hath also a great wit and courage. The northern papists do greatly reverence and flock to her. If she remain long in this shire, she will stir up a perilous rebellion. Her presence here is a firebrand in the thatch of the realm; she must be removed farther from the Scottish border and kept under rigorous surveillance.',
    provenance:
      'The National Archives, Kew (SP 53/3), Sir Ralph Sadler to Sir William Cecil, Bolton Castle, January 1569.',
    citation: 'The National Archives, Kew (SP 53/3), January 1569.',
    question_badge: 'Source Inference',
    question_type: 'Source Inference',
    enquiry_question:
      "What can you infer from Source E about the immediate domestic threat posed by Mary Stuart's presence in northern England?",
    model_answer:
      "Source E proves that Mary's royal bloodline and Catholic faith acted as an immediate magnet for discontented Catholic gentry in the north, creating an acute fear of rebellion that materialized in late 1569.",
    teacher_notes: {
      source_context:
        "Mary was moved from Carlisle Castle to Bolton Castle in Yorkshire under the charge of Sir Francis Knollys and Sir Ralph Sadler. Her presence in the deeply Catholic north galvanized the Earls of Northumberland and Westmorland to plan the 1569 rebellion. **Hinge Question:** Why did Mary's presence in northern England pose a far greater threat to Elizabeth than if Mary had remained in exile in France?",
    },
  });
}

// -------------------------------------------------------------
// Lesson 2.2: War with Spain, 1576–1588
// -------------------------------------------------------------
const l22 = data.lessons.find((l) => l.id === 'lesson_2_2');
if (l22) {
  // Source E: Duke of Parma's Dispatch (Block 5)
  updateSource(l22.sources[4], {
    title:
      "Source E: The Duke of Parma's Dispatch to King Philip II on the Armada Strategy (January 1588)",
    type: 'written',
    text: "I must remind Your Majesty that my flat-bottomed invasion barges cannot withstand open sea warfare or the English warships. Unless the Duke of Medina Sidonia's Armada sweeps the English fleet completely from the Channel and anchors off Dunkirk to cover our embarkation, it will be utter madness to put our 30,000 veterans to sea. The enemy's long guns will send my soldiers to the bottom of the ocean.",
    provenance:
      'General Archive of Simancas, Spain (Estado, leg. 594), Duke of Parma to Philip II, Brussels, January 1588.',
    citation: 'General Archive of Simancas (Estado, leg. 594), 1588.',
    question_badge: "Author's Purpose",
    question_type: "Author's Purpose",
    enquiry_question:
      'Why did the Duke of Parma write this urgent warning to King Philip II before the Armada sailed?',
    model_answer:
      'Parma wanted to alert Philip to the fatal operational flaw in the invasion plan: his barges were unarmed and unseaworthy, making rendezvous impossible without total Spanish naval mastery.',
    teacher_notes: {
      source_context:
        "Philip II's grand strategy required two separate forces—Medina Sidonia's fleet from Spain and Parma's Army of Flanders—to rendezvous off the Flemish coast without possessing a deep-water port. Parma warned repeatedly that communication was impossible in the presence of Dutch flyboats and English galleons. **Hinge Question:** How did the lack of a deep-water port in the Netherlands doom Philip II's Armada plan before the ships even left Lisbon?",
    },
  });
}

// -------------------------------------------------------------
// Lesson 2.3: The Spanish Armada, 1588
// -------------------------------------------------------------
const l23 = data.lessons.find((l) => l.id === 'lesson_2_3');
if (l23) {
  // Source C: Fireships at Calais (Block 3)
  updateSource(l23.sources[2], {
    title:
      'Source C: Eyewitness Account of the English Fireships at Calais Roads (Midnight, 7 August 1588)',
    type: 'written',
    text: "At midnight two hours before day, the English loosed eight great ships filled with pitch, brimstone, and wild-fire, sailing directly upon our fleet before the wind. Seeing the blazing hulls drifting among us with their cannon discharging in the flames, our captains cried 'The hellburners of Antwerp!' In terrifying panic, every galleon cut her cables and severed their anchors, scattering in wild confusion across the stormy shoals.",
    provenance:
      'Diary of Father Pedro Coco Calderón, chief purveyor of the Spanish Armada, August 1588.',
    citation: 'Biblioteca Nacional de España, Madrid (MS 18.423), 1588.',
    question_badge: 'Source Inference',
    question_type: 'Source Inference',
    enquiry_question:
      'What does Source C suggest was the decisive psychological impact of the English fireships on the Spanish Armada?',
    model_answer:
      'Source C reveals that the fireships induced absolute panic by triggering fears of exploding hellburners, causing Spanish captains to sever their anchors and irrevocably destroy their disciplined crescent formation.',
    teacher_notes: {
      source_context:
        'The fireships caused zero physical damage to Spanish hulls, but their psychological effect was catastrophic. By severing their anchors, the Spanish ships could not regroup in Calais roads and were swept northeast toward the dangerous shallows of Gravelines. **Hinge Question:** Why was the loss of their anchors at Calais far more fatal to the Spanish Armada than direct artillery hits from English culverins?',
    },
  });

  // Source D: Battle of Gravelines (Block 4) -> Real visual battle plate
  updateSource(l23.sources[3], {
    title: 'Source D: Contemporary Painting of the Battle of Gravelines (8 August 1588)',
    src: '/images/battle_of_gravelines_1588.jpg',
    image: '/images/battle_of_gravelines_1588.jpg',
    source: '/images/battle_of_gravelines_1588.jpg',
    caption:
      'The Battle of Gravelines (8 August 1588): English race-built galleons engaging the disarrayed Spanish fleet at point-blank range along the Flemish coast.',
    desc: 'English race-built warships using superior speed and culverin broadsides against the Spanish Armada.',
    provenance:
      'National Maritime Museum, Greenwich (BHC0262), contemporary 16th-century marine artwork.',
    citation: 'National Maritime Museum, Greenwich.',
    question_badge: 'Cross-Referencing',
    question_type: 'Cross-Referencing',
    enquiry_question:
      'How does Source D support the view that superior naval tactics and gunnery, rather than weather alone, defeated the Armada at Gravelines?',
    model_answer:
      'Source D shows English galleons exploiting superior manoeuvrability to fire repeated broadsides into Spanish warships at close range, riddling Spanish hulls while preventing the Spanish infantry from boarding.',
    teacher_notes: {
      source_context:
        "At Gravelines, Lord Howard and Drake closed to within 100 yards of the disorganized Spanish fleet. English race-built ships could fire three broadsides to Spain's one, sinking three great galleons and forcing the battered Armada onto the North Sea. **Hinge Question:** How did English reload speed and long culverin guns neutralize Spain's overwhelming superiority in hand-to-hand soldiers?",
    },
  });

  // Source E: Route of the Armada Map (Block 5) -> Visual map
  updateSource(l23.sources[4], {
    title:
      'Source E: Route and Shipwrecks of the Spanish Armada around Scotland and Ireland (1588)',
    src: '/images/spanish_armada_1588_route_battle_map.jpg',
    image: '/images/spanish_armada_1588_route_battle_map.jpg',
    source: '/images/spanish_armada_1588_route_battle_map.jpg',
    caption:
      "Historical Map of the Spanish Armada's Retreat: Charting the perilous voyage around northern Scotland and the catastrophic Atlantic shipwrecks along the Irish coast (September 1588).",
    desc: 'The track of the surviving Armada ships fleeing north around Scotland and wrecked along the Atlantic coast of Ireland.',
    provenance: 'The National Archives, Kew (MPF 1/240), contemporary map of Armada wrecks, 1588.',
    citation: 'The National Archives, Kew.',
    question_badge: 'Reliability & Provenance',
    question_type: 'Reliability & Provenance',
    enquiry_question:
      "Why is Source E valuable for showing why less than half of Philip II's soldiers returned to Spain?",
    model_answer:
      'Source E maps the devastating trail of Atlantic wrecks along the Irish coast, showing that severe gales, starvation, and lack of fresh water destroyed far more Spanish ships and men than battle casualties.',
    teacher_notes: {
      source_context:
        "With the English Channel blocked, Medina Sidonia had no choice but to sail north around the Orkneys. Without spare anchors or water barrels, fierce autumn storms smashed over 35 galleons against the rocky coasts of Sligo, Mayo, and Kerry. **Hinge Question:** Why did contemporary Elizabethans celebrate the Irish gales as 'The Protestant Wind', and how did this transform the religious significance of the victory?",
    },
  });
}

// -------------------------------------------------------------
// Lesson 3.1: Education and Leisure
// -------------------------------------------------------------
const l31 = data.lessons.find((l) => l.id === 'lesson_3_1');
if (l31) {
  // Source A: Authentic Hornbook (Block 1 - Petty Schools)
  updateSource(l31.sources[0], {
    title:
      "Source A: Contemporary Elizabethan Wooden Hornbook with Alphabet and Lord's Prayer (c. 1570s)",
    src: '/images/tudor_wooden_hornbook_alphabet.jpg',
    image: '/images/tudor_wooden_hornbook_alphabet.jpg',
    source: '/images/tudor_wooden_hornbook_alphabet.jpg',
    caption:
      "An authentic Elizabethan wooden hornbook: parchment sheet with alphabet and the Lord's Prayer protected by a thin slice of transparent horn with brass trim.",
    desc: 'A wooden paddle hornbook used to teach reading and literacy to young children in Tudor dame and petty schools.',
    provenance:
      'Museum of London (Accession A1248), Elizabethan wooden hornbook, late 16th century.',
    citation: 'Museum of London (Accession A1248).',
    question_badge: 'Source Inference',
    question_type: 'Source Inference',
    enquiry_question:
      'What can you infer from Source A about the core priorities and methods of early childhood education in Elizabethan England?',
    model_answer:
      "Source A demonstrates that early literacy was inextricably linked with religious instruction, teaching children the alphabet and phonics through memorizing the Lord's Prayer on durable horn-protected boards.",
    teacher_notes: {
      source_context:
        "Hornbooks were wooden paddles holding a sheet of printed paper covered by transparent animal horn to protect it from sticky fingers. Every Elizabethan child began learning literacy through the alphabet and the Lord's Prayer. **Hinge Question:** Why did Protestant religious doctrine make early reading literacy an essential spiritual duty rather than merely an elite academic luxury?",
    },
  });

  // Source B: Roger Ascham on Grammar Schools and Birch Rod (Block 2 - Latin Grammar Schools)
  updateSource(l31.sources[1], {
    title: 'Source B: Roger Ascham on Cruelty and the Birch Rod in Tudor Grammar Schools (1570)',
    type: 'written',
    text: 'I have known good wits so beaten and battered by cruel schoolmasters that they have clean lost all delight in learning. Young gentlemen are driven from books by the terror of the birch rod; for masters do punish dullness of memory as if it were malice of the heart. Beat a horse often and he will ever shy; beat a child often, and you shall make him an enemy to all virtue.',
    provenance:
      "Roger Ascham, 'The Scholemaster: A Plain and Perfect Way of Teaching Children to Understand, Write, and Speak the Latin Tongue', London, 1570.",
    citation: 'Roger Ascham, The Scholemaster, British Library, 1570.',
    question_badge: "Author's Purpose",
    question_type: "Author's Purpose",
    enquiry_question:
      "Why did Roger Ascham publish 'The Scholemaster' in 1570, and what does it reveal about Elizabethan schooling?",
    model_answer:
      'Ascham aimed to reform grammar school education by arguing against routine corporal punishment, demonstrating that brutal caning and endless Latin memorization were driving boys away from classical scholarship.',
    teacher_notes: {
      source_context:
        "Roger Ascham was Queen Elizabeth's former tutor and a renowned humanist scholar. Tudor grammar school days lasted from 6:00 am to 5:30 pm, with boys subjected to strict Latin immersion and severe corporal punishment for speaking English or forgetting grammar declensions. **Hinge Question:** How did the grammar school curriculum reflect the class structure and social ambitions of the rising Elizabethan middling sort?",
    },
  });

  // Source C: University Curriculum & Thomas Harriot (Block 3 - Oxford, Cambridge, Inns of Court)
  updateSource(l31.sources[2], {
    title: 'Source C: Register of Oxford University Studies and Navigational Sciences (1577)',
    type: 'written',
    text: 'At Oxford and Cambridge, gentlemen scholars are instructed in logic, rhetoric, and moral philosophy, but of late years many do apply their minds to geography, geometry, and astronomy. Master Thomas Harriot and other scholars have brought forth new calculations for oceanic navigation, translating Euclidean principles to assist our mariners in sailing the Atlantic.',
    provenance:
      'Bodleian Library, Oxford (MS Bodl. 421), memoranda on collegiate studies, c. 1577.',
    citation: 'Bodleian Library, Oxford.',
    question_badge: 'Source Inference',
    question_type: 'Source Inference',
    enquiry_question:
      'What does Source C reveal about how higher education in Elizabethan universities was adapting to the Age of Exploration?',
    model_answer:
      'Source C shows that while traditional humanities like logic and Latin rhetoric remained dominant, universities were increasingly teaching practical sciences like astronomy and mathematics to support global oceanic navigation.',
    teacher_notes: {
      source_context:
        "During Elizabeth's reign, Oxford and Cambridge transitioned from preparing men solely for the priesthood into training institutions for gentry, diplomats, and explorers. Thomas Harriot studied at St Mary Hall, Oxford, later teaching navigational mathematics to Raleigh's captains. **Hinge Question:** Why did the Elizabethan gentry view time spent at the Inns of Court in London as equally valuable to an Oxford degree?",
    },
  });

  // Source D: Bear Baiting Woodcut (Block 4 - Blood Sports)
  updateSource(l31.sources[3], {
    title: 'Source D: Contemporary Woodcut of Bear-Baiting in the Southwark Arena (c. 1570s)',
    src: '/images/elizabethan_bear_baiting_southwark.jpg',
    image: '/images/elizabethan_bear_baiting_southwark.jpg',
    source: '/images/elizabethan_bear_baiting_southwark.jpg',
    caption:
      'Contemporary woodcut of bear-baiting in London: a bear chained to a stake in the pit being attacked by mastiffs before spectator galleries.',
    desc: 'An Elizabethan woodcut showing bear-baiting, a popular blood sport patronized by all classes including the Queen.',
    provenance:
      'British Library (Department of Prints and Drawings), contemporary Elizabethan woodcut plate, c. 1575.',
    citation: 'British Library, London.',
    question_badge: 'Source Inference',
    question_type: 'Source Inference',
    enquiry_question:
      'What does Source D show about the popularity and brutal nature of Elizabethan spectator sports?',
    model_answer:
      'Source D depicts a chained bear fighting ferocious mastiffs in an arena packed with spectators, illustrating that violent animal sports were socially accepted, highly commercialized entertainment patronized by both commoners and royalty.',
    teacher_notes: {
      source_context:
        'Bear-baiting arenas on the Bankside in Southwark attracted thousands of spectators, including Queen Elizabeth herself, who famously entertained foreign ambassadors with bear-baiting exhibitions. Puritans campaigned vigorously against Sunday performances, not out of cruelty to animals, but because it drew people away from sermons. **Hinge Question:** Why did Puritan objections to bear-baiting focus on the Sabbath and crowd immorality rather than animal cruelty?',
    },
  });

  // Source E: Johannes de Witt's Swan Theatre Sketch (Block 5 - The Elizabethan Playhouse)
  updateSource(l31.sources[4], {
    title: "Source E: Johannes de Witt's Eyewitness Sketch of the Swan Theatre (c. 1596)",
    src: '/images/swan_theatre_interior_de_witt.jpg',
    image: '/images/swan_theatre_interior_de_witt.jpg',
    source: '/images/swan_theatre_interior_de_witt.jpg',
    caption:
      "Johannes de Witt's eyewitness sketch of the Swan Theatre interior (1596, copied by Arend van Buchell): showing thrust proscenium stage, groundling pit, three-tiered galleries, and tiring house.",
    desc: 'The only surviving contemporary drawing of the interior of an Elizabethan public amphitheatre.',
    provenance:
      'Utrecht University Library (MS 842, fol. 132r), sketch by Arend van Buchell after Johannes de Witt, 1596.',
    citation: 'Utrecht University Library (MS 842).',
    question_badge: 'Reliability & Provenance',
    question_type: 'Reliability & Provenance',
    enquiry_question:
      'Why is Source E the single most valuable surviving piece of visual evidence for the architectural design of Elizabethan playhouses?',
    model_answer:
      'Source E is the only surviving contemporary drawing of an Elizabethan theatre interior, providing verified primary details of the open thrust stage, the groundling yard, and the covered galleries where 3,000 Londoners gathered.',
    teacher_notes: {
      source_context:
        "Dutch traveller Johannes de Witt visited London in 1596 and recorded that the Swan Theatre was the largest and most magnificent amphitheatre, holding up to 3,000 spectators. The sketch is the primary architectural source used to reconstruct Shakespeare's Globe. **Hinge Question:** How does the architecture depicted in De Witt's sketch explain why the London authorities feared the playhouses as breeding grounds for plague and social unrest?",
    },
  });
}

// -------------------------------------------------------------
// Lesson 3.2: The Problem of the Poor and Vagrancy
// -------------------------------------------------------------
const l32 = data.lessons.find((l) => l.id === 'lesson_3_2');
if (l32) {
  // Source A: Cecil on Grain Inflation (Block 1 - Population & Harvests)
  updateSource(l32.sources[0], {
    title:
      "Source A: Sir William Cecil's Parliamentary Memoranda on Bad Harvests and Soaring Grain Prices (1570s)",
    type: 'written',
    text: 'The price of wheat and rye hath risen beyond the reach of the poor husbandman. By reason of four unseasonable and wet summers, the corn in the fields is mildewed and rotten. Bread is scarce; the multitude of impoverished people doth multiply in every shire, and unless the hoarders of grain be restrained, we shall see dangerous risings among the commons.',
    provenance:
      'The National Archives, Kew (SP 12/85), Sir William Cecil, memoranda on grain supply and dearth, 1572.',
    citation: 'The National Archives, Kew (SP 12/85), 1572.',
    question_badge: 'Source Inference',
    question_type: 'Source Inference',
    enquiry_question:
      'What does Source A indicate about the primary causes of widespread poverty and rural hardship in Elizabethan England?',
    model_answer:
      'Source A shows that repeated harvest failures caused severe grain shortages and runaway food inflation, leaving poor laborers unable to afford bread and provoking deep government fears of peasant revolt.',
    teacher_notes: {
      source_context:
        "England's population surged from 2.8 million to over 4 million during Elizabeth's reign. This massive population growth collided with four disastrous harvest failures in the 1590s, driving food prices up by 80% while real wages fell to their lowest level in centuries. **Hinge Question:** Why did the Elizabethan government fear grain shortages far more than any other economic problem?",
    },
  });

  // Source B: Anti-Enclosure Petition (Block 2 - Enclosure & Rural Depopulation)
  updateSource(l32.sources[1], {
    title:
      'Source B: Contemporary Complaint on the Evils of Sheep Enclosure and Village Ruin (1560s)',
    type: 'written',
    text: 'Where forty persons had their livings by growing corn, now one shepherd and his dog hath all. The rich gentlemen have enclosed the commons with ditches and quickset hedges, turning tillage into sheep pasture. Whole hamlets are depopulated; ploughs rot in the furrows, and honest ploughmen, being driven from their cottages, are cast into the highways to starve or beg.',
    provenance:
      'Tudor tract on the decay of husbandry, British Library (Lansdowne MS 152), c. 1565.',
    citation: 'British Library, London (Lansdowne MS 152).',
    question_badge: "Author's Purpose",
    question_type: "Author's Purpose",
    enquiry_question:
      'Why did contemporary writers and petitioners condemn the enclosure of land for sheep farming so passionately?',
    model_answer:
      'They argued that enclosing arable fields for wool production drove tenant farmers off the land, destroying rural communities and turning self-sufficient families into homeless vagrants.',
    teacher_notes: {
      source_context:
        "Wool was England's most profitable export, accounting for 80% of foreign trade. Landlords realized they could make vastly higher profits grazing sheep than renting arable land to peasant farmers, leading to forced evictions and the enclosure of common pastures. **Hinge Question:** Why was enclosure blamed for creating vagrancy, even though modern historians show population growth was the primary economic driver?",
    },
  });

  // Source D: Whipping of Vagrants (Block 4 - 1572 Vagabonds Act)
  updateSource(l32.sources[3], {
    title: 'Source D: Contemporary Woodcut of Vagrants Whipped at the Cart-Tail under the 1572 Act',
    src: '/images/tudor_vagrant_whipping.jpg',
    image: '/images/tudor_vagrant_whipping.jpg',
    source: '/images/tudor_vagrant_whipping.jpg',
    caption:
      'A contemporary Elizabethan woodcut depicting sturdy beggars being tied to the cart-tail and whipped through the market town until bloody under the harsh 1572 Vagabonds Act.',
    desc: 'A woodcut showing the public corporal punishment of vagrants in an Elizabethan market town.',
    provenance: 'British Library, woodcut from a Tudor penal broadsheet, c. 1575.',
    citation: 'British Library, London.',
    question_badge: 'Reliability & Provenance',
    question_type: 'Reliability & Provenance',
    enquiry_question:
      "Why is Source D reliable evidence of the severe punitive measures Elizabeth's government used against mobile vagrants?",
    model_answer:
      'Source D faithfully illustrates the corporal punishment mandated by the 1572 Vagabonds Act, where sturdy beggars were publicly whipped and had their ear bored through with a hot iron to deter mobile vagrancy.',
    teacher_notes: {
      source_context:
        'The 1572 Vagabonds Act introduced draconian punishments: first-time offenders were whipped and bored through the ear; second-time offenders were treated as felons; and persistent vagrants could be executed. However, it also introduced compulsory local poor rates. **Hinge Question:** How did the 1572 Act mark a major turning point by combining brutal corporal deterrence with the first mandatory taxpayer poor relief?',
    },
  });

  // Source E: Poor Law 1601 Roll (Block 5 - 1576 & 1601 Welfare System)
  updateSource(l32.sources[4], {
    title: 'Source E: The Elizabethan Poor Law Statute of 1601 (Parliamentary Roll)',
    src: '/images/poor_law_1601.jpg',
    image: '/images/poor_law_1601.jpg',
    source: '/images/poor_law_1601.jpg',
    caption:
      'The official parliamentary roll of the 1601 Poor Law: codifying the parish rate, appointing Overseers of the Poor, providing raw materials for the able-bodied, and establishing almshouses for the impotent poor.',
    desc: 'The 1601 Elizabethan Poor Law statute, which remained the bedrock of British welfare legislation for over 230 years.',
    provenance:
      'Parliamentary Archives, Palace of Westminster (Statute 43 Eliz. c. 2), London, 1601.',
    citation: 'Parliamentary Archives, London.',
    question_badge: "Author's Purpose",
    question_type: "Author's Purpose",
    enquiry_question:
      "What was Parliament's objective in codifying the 1601 Poor Law, and how did it establish the framework of modern welfare?",
    model_answer:
      'Parliament codified the 1601 statute to establish a permanent, legally binding nationwide system making each parish responsible for caring for the impotent poor while putting the able-bodied to work.',
    teacher_notes: {
      source_context:
        "The 1601 'Act for the Relief of the Poor' created a comprehensive welfare system: Overseers levied a compulsory local tax; the impotent poor were given pensions or almshouses; the able-bodied were provided raw flax and wool to work; and orphans were apprenticed. It endured until 1834. **Hinge Question:** Why did the 1601 Poor Law place administrative and financial responsibility strictly on individual parishes rather than creating a centralized royal welfare fund?",
    },
  });
}

// -------------------------------------------------------------
// Lesson 3.3: Exploration and Voyages of Discovery
// -------------------------------------------------------------
const l33 = data.lessons.find((l) => l.id === 'lesson_3_3');
if (l33) {
  // Source A: Mariner's Astrolabe (Block 1 - Navigation)
  updateSource(l33.sources[0], {
    title: "Source A: Authentic Elizabethan Mariner's Astrolabe for Latitude Navigation (c. 1580s)",
    src: '/images/mariners_astrolabe_1603.jpg',
    image: '/images/mariners_astrolabe_1603.jpg',
    source: '/images/mariners_astrolabe_1603.jpg',
    caption:
      "An authentic heavy cast-brass mariner's astrolabe: cut-out spokes reduce wind resistance on pitching decks, allowing navigators to sight the Sun or Pole Star to determine latitude.",
    desc: 'A brass navigational instrument essential for Elizabethan oceanic voyages across the Atlantic and Pacific.',
    provenance:
      "National Maritime Museum, Greenwich (NAV0024), brass mariner's astrolabe, late 16th century.",
    citation: 'National Maritime Museum, Greenwich.',
    question_badge: 'Source Inference',
    question_type: 'Source Inference',
    enquiry_question:
      'What does Source A reveal about the scientific and technological advancements that enabled Elizabethan voyages of discovery?',
    model_answer:
      'Source A shows that oceanic navigation evolved from guesswork to scientific celestial observation, using heavy brass astrolabes designed to calculate latitude accurately on pitching ships.',
    teacher_notes: {
      source_context:
        "Unlike delicate land astrolabes, mariner's astrolabes were heavy brass discs with large cut-out holes to prevent the instrument swaying in ocean winds. Navigators aligned the alidade with the noonday Sun or the North Star to measure altitude and calculate latitude. **Hinge Question:** Why did the inability to calculate longitude remain the greatest navigational obstacle for Elizabethan explorers despite instruments like the astrolabe?",
    },
  });

  // Source B: Race-Built Galleon Ark Royal (Block 2 - Race-Built Galleons)
  updateSource(l33.sources[1], {
    title: 'Source B: Contemporary Plate of the Race-Built English Galleon Ark Royal (1587)',
    src: '/images/ark_royal.jpg',
    image: '/images/ark_royal.jpg',
    source: '/images/ark_royal.jpg',
    caption:
      'The English race-built flagship Ark Royal: designed by Sir John Hawkins with reduced castles, a sleek hydrodynamic hull, lateen sails, and heavy culverins mounted low along broadsides.',
    desc: "A contemporary engraving of the English flagship Ark Royal, exemplifying John Hawkins' race-built naval design.",
    provenance:
      'British Museum (Department of Prints and Drawings), contemporary 16th-century naval engraving.',
    citation: 'British Museum, London.',
    question_badge: 'Cross-Referencing',
    question_type: 'Cross-Referencing',
    enquiry_question:
      'How does Source B support the claim that John Hawkins revolutionized English naval architecture?',
    model_answer:
      "Source B illustrates Hawkins' 'race-built' concept: cutting down high clumsy forecastles to lower wind resistance, increasing hull length, and equipping warships to fight with heavy broadside cannon rather than boarding.",
    teacher_notes: {
      source_context:
        "As Treasurer of the Royal Navy from 1577, Hawkins stripped away towering fore- and stern-castles, creating low-profile galleons that were faster, more manoeuvrable, and could sail closer to the wind than cumbersome Spanish floating fortresses. **Hinge Question:** How did Hawkins' race-built design transform the fundamental purpose of a naval warship from a floating troop carrier into a gunnery platform?",
    },
  });

  // Source D: Hondius Circumnavigation Map (Block 4 - Drake's Circumnavigation)
  updateSource(l33.sources[3], {
    title:
      "Source D: Jodocus Hondius World Map Showing the Track of Drake's Circumnavigation (1595)",
    src: '/images/hondius_drake_circumnavigation_map_1595.jpg',
    image: '/images/hondius_drake_circumnavigation_map_1595.jpg',
    source: '/images/hondius_drake_circumnavigation_map_1595.jpg',
    caption:
      'Jodocus Hondius world map (1595) showing the confirmed global track of Sir Francis Drake on the Golden Hind (1577–1580), including Cape Horn, Nova Albion (California), and the Moluccas.',
    desc: "A renowned Dutch world map charting Drake's voyage around the globe, with the Golden Hind illustrated at the bottom.",
    provenance:
      'British Library (Maps C.2.a.7), Jodocus Hondius world map published in The Hague, 1595.',
    citation: 'British Library, London (Maps C.2.a.7).',
    question_badge: 'Reliability & Provenance',
    question_type: 'Reliability & Provenance',
    enquiry_question:
      "Why is Source D exceptionally reliable evidence for understanding the global scale and geopolitical impact of Drake's voyage?",
    model_answer:
      "Source D is an authoritative map compiled by Hondius using Drake's verified navigational logs, tracing his exact path around South America, up the uncharted Pacific coast to Nova Albion, and home via the Spice Islands.",
    teacher_notes: {
      source_context:
        "Drake set sail in December 1577 with five ships; only the Golden Hind completed the voyage. He returned in September 1580 with £400,000 in Spanish treasure, shattering Spain's claim that the Pacific Ocean was a closed Spanish sea (Mare Clausum). **Hinge Question:** Why did Drake claim Nova Albion (modern California) for Elizabeth, and what geopolitical message did this send to King Philip II?",
    },
  });

  // Source E: Spanish Ambassador Mendoza on Drake's Plunder (Block 5 - Spoils & Geopolitics)
  updateSource(l33.sources[4], {
    title:
      "Source E: Spanish Ambassador Bernardino de Mendoza's Urgent Dispatch to King Philip II (October 1580)",
    type: 'written',
    text: "The master-thief Drake hath arrived at Plymouth laden with astronomical riches stolen from Your Majesty's peaceful subjects in Peru. He hath brought twenty-six tons of silver bullion, eighty pounds of gold, and chests of pearls and emeralds from the Cacafuego. The Queen hath received him privately at court, and far from punishing this pirate, she hath taken the lion's share of the booty for her royal treasury and intends to knight him on his ship!",
    provenance:
      'Calendar of State Papers, Spanish (Simancas Archives), Mendoza to Philip II, London, October 1580.',
    citation: 'General Archive of Simancas (Estado, leg. 833), 1580.',
    question_badge: "Author's Purpose",
    question_type: "Author's Purpose",
    enquiry_question:
      "What was Mendoza's purpose in writing this dispatch to King Philip II upon Drake's return in 1580?",
    model_answer:
      "Mendoza intended to portray Elizabeth as an unprincipled sponsor of piracy who personally profited from stolen Spanish bullion, urging Philip II to treat England's state-sponsored plunder as an act of open war.",
    teacher_notes: {
      source_context:
        "Drake's plunder was so vast that Elizabeth's 50% royal share exceeded the entire Crown revenue for a year, allowing her to pay off England's foreign debt and invest in the Levant Company. In April 1581, Elizabeth boarded the Golden Hind at Deptford and knighted Drake in full view of the French ambassador. **Hinge Question:** Why was Elizabeth's decision to knight Drake on the Golden Hind in front of foreign diplomats considered a calculated act of defiance against Spain?",
    },
  });
}

// -------------------------------------------------------------
// Write back to units/eee/data.js and public/units/eee/data.js
// -------------------------------------------------------------
const output = `const eee_data = ${JSON.stringify(data, null, 2)};
if (typeof module !== 'undefined' && module.exports) {
  module.exports = eee_data;
}
export default eee_data;
`;

fs.writeFileSync('units/eee/data.js', output, 'utf8');
fs.writeFileSync('public/units/eee/data.js', output, 'utf8');
console.log('✅ Successfully updated units/eee/data.js and public/units/eee/data.js!');
