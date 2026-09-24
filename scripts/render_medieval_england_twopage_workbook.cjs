/**
 * History Revision Hub — Master Two-Page Spread Pupil Workbook Engine
 *
 * Target: units/medieval_england (KS3 Year 7: Medieval England & The Struggle for Power, 1066–1485)
 * Output: public/units/medieval_england/pupil_workbook.html
 * HTML2:  units/medieval_england/pupil_workbook.html
 * PDF:    public/pdfs/medieval_england_pupil_workbook.pdf
 *
 * Gold Standard Publisher Architecture:
 * - Exact 20-Page A4 Pupil Workbook Standard (5 A3 Folded Spreads)
 * - Strict School Anonymity: 0 prohibited school identifiers; 100% institutional neutrality
 * - Page 1:  Master Front Cover with 52mm primary image plate, pupil record card, syllabus overview, 4 Big Storylines
 * - Pages 2–3: Living Timeline & Panoramic Dual-Coding Spread (1066–1485, 8 historical milestones with sketchpads)
 * - Pages 4–19: 8 Double-Page Enquiry Spreads:
 *     Lesson 1 (Pages 4–5):   1066 & Battle of Hastings (Change & Continuity — Extended Writing)
 *     Lesson 2 (Pages 6–7):   Castles, Terror & Domesday (Dual-Source Utility — Orderic Vitalis vs Domesday)
 *     Lesson 3 (Pages 8–9):   Crown vs Church: Henry II & Becket (Causation & Transformation — Extended Writing)
 *     Lesson 4 (Pages 10–11): Magna Carta (1215): Liberty or Grab? (Historical Significance — Extended Writing)
 *     Lesson 5 (Pages 12–13): Doom Paintings, Tithes & Village Life (Historiographical Debate — Extended Writing)
 *     Lesson 6 (Pages 14–15): 1348: Black Death & Social Shatter (Turning Point Analysis — Extended Writing)
 *     Lesson 7 (Pages 16–17): 1381: The Peasants' Revolt (Forensic Evidence & Agency — Froissart vs Anonimalle)
 *     Lesson 8 (Pages 18–19): Wars of the Roses & Bosworth (Agency & Significance — Extended Writing)
 * - Page 20: Master Outside Back Cover (Assessment Ledger, Effort Rubric, QR Hub, Department Colophon)
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');

// 8 Bespoke Double-Page Enquiry Configurations for Year 7 Medieval England
const lessonConfigs = [
  {
    // Lesson 1: 1066 & Hastings
    taskType: 'extended_writing',
    genre: 'Disciplinary Focus: Change & Continuity / Causal Interaction',
    skill: 'Change & Continuity',
    timelineMission:
      'Illustrate Milestone 1 on Page 2: Sketch the Norman cavalry charge, the Anglo-Saxon shield wall, or King Harold struck by an arrow.',
    enquiryQuestion: 'Enquiry: Why did William of Normandy win the Battle of Hastings in 1066?',
    objectives: [
      'Analyse the 1066 succession crisis following the death of King Edward the Confessor.',
      'Evaluate the key turning points on Senlac Hill: the shield wall, cavalry charges, and the feigned retreat.',
      'Formulate a sustained historical argument judging whether Norman tactics or Saxon exhaustion decided the battle.',
    ],
    doNow: [
      {
        q: 'Which Anglo-Saxon King of Wessex successfully defended England against the Great Heathen Army in the 870s?',
      },
      {
        q: 'What was the name of the northeastern territory of England governed under Danish/Viking law?',
      },
      {
        q: 'In which century did Roman legions withdraw from Britannia, leaving it open to Anglo-Saxon settlement?',
      },
      {
        q: 'What was the council of Anglo-Saxon nobles and bishops that advised the king and elected his successor called?',
      },
      {
        q: 'Which King of England died on 5 January 1066 without leaving a direct biological heir?',
      },
    ],
    vocabTask: {
      type: 'distinction',
      prompt:
        'Distinguish between King Harold’s elite, full-time professional bodyguards (<strong>Housecarls</strong>) and the part-time peasant militia called up in emergencies (<strong>Fyrd</strong>). <em>Hint: Explain who each group was and how their battle experience differed:</em>',
    },
    bridgeTask: {
      type: 'ledger',
      badge: 'Causal Factor Matrix',
      title:
        'Task 3: Hastings Factor Matrix: Norman Military Superiority vs Anglo-Saxon Vulnerabilities',
      instruction:
        'Extract 3 key pieces of factual evidence into each column, then develop your argument below:',
      col1Title: 'Norman Military Superiority & Tactics',
      col1Prompts: [
        'Combined-arms army: heavy cavalry, crossbowmen, and disciplined infantry.',
        'Feigned retreat tactic: luring undisciplined Saxons down Senlac Hill.',
        'Duke William’s battlefield leadership: lifting his helmet to rally fleeing men.',
        'Papal banner from Rome providing holy moral authority and papal blessing.',
      ],
      col2Title: 'Anglo-Saxon Vulnerabilities & Bad Luck',
      col2Prompts: [
        'Exhausting 200-mile forced march south after fighting Stamford Bridge.',
        'Loss of elite housecarls and shield wall discipline on Senlac Hill.',
        'Harold’s impetuous rush to battle without waiting for southern reinforcements.',
        'Catastrophic death of King Harold and his brothers late in the day.',
      ],
      synthesisPrompt:
        'Explain whether Norman tactical skill or Saxon exhaustion was the primary cause of William’s victory:',
      clue: '<em>Low-Floor Clue:</em> Remember that Harold’s men had already fought a bloody battle against Vikings at Stamford Bridge and marched over 200 miles in two weeks before facing fresh Norman cavalry.',
      scholarsEdge:
        '<strong>★ Scholar’s Edge:</strong> How does contemporary Norman chronicler William of Poitiers contrast with the Anglo-Saxon Chronicle in explaining why the shield wall collapsed?',
    },
    structureStrip: [
      {
        col: '1. NORMAN TACTICS',
        text: 'Explain how William’s combined cavalry and feigned retreats broke the Saxon shield wall.',
      },
      {
        col: '2. SAXON EXHAUSTION',
        text: 'Analyse the impact of Stamford Bridge, the 200-mile march, and Harold’s tactical impatience.',
      },
      {
        col: '3. SUSTAINED VERDICT',
        text: 'Reach a reasoned conclusion: was victory decided by military brilliance or battlefield luck?',
      },
    ],
    connectives:
      'William won the Battle of Hastings primarily because... • Most decisively, the Norman tactic of the feigned retreat... • Furthermore, King Harold’s Saxon army was critically weakened by... • This exhaustion meant that when the shield wall broke... • On balance, while Harold fought bravely, William’s victory was secured by...',
  },
  {
    // Lesson 2: Castles, Terror & Domesday
    taskType: 'source_utility',
    genre: 'Source Analysis: Dual-Source Utility',
    skill: 'Dual-Source Utility',
    timelineMission:
      'Illustrate Milestone 2 on Page 2: Sketch a timber motte-and-bailey castle, Portchester Castle keep, or the Domesday Book.',
    enquiryQuestion:
      'Enquiry: How useful are Sources A and B for investigating how William the Conqueror subjugated and controlled England (1066–1086)?',
    objectives: [
      'Examine the strategic function of motte-and-bailey castles in dominating hostile Anglo-Saxon shires.',
      'Analyse the brutality of the Harrying of the North and the administrative power of the Domesday Book.',
      'Evaluate the utility and reliability of monastic chronicles versus bureaucratic fiscal audits.',
    ],
    sourceA: {
      title: 'Source A: Orderic Vitalis, Ecclesiastical History (c. 1120s)',
      shelfmark: 'BIBLIOTHÈQUE NATIONALE DE FRANCE • PARIS • MS LATIN 5506',
      text: '“King William vented his fury by commanding that all crops, herds, and food of every kind should be burned to ashes. More than 100,000 human beings perished of hunger in Yorkshire alone. I have often praised William in this book, but for this savage slaughter I can only weep and condemn him.”',
      clue: 'Provenance Clue: Written by an Anglo-Norman monk whose father served William; unusually critical of royal cruelty, reflecting genuine horror at the human cost of the Harrying.',
    },
    sourceB: {
      title: 'Source B: The Great Domesday Book: Hundred of Fareham (1086)',
      shelfmark: 'THE NATIONAL ARCHIVES • KEW • E 31/2/2 (DOMESDAY FOLIO 44)',
      text: '“In Fareham, King William holds the manor. In the time of King Edward, it was assessed at 30 hides. There is land for 30 ploughs. In demesne are 4 ploughs; and 30 villeins and 15 smallholders with 18 ploughs. There are 2 mills, 3 fisheries, and woodland for 20 pigs. Its total value was £40; now £30.”',
      clue: 'Provenance Clue: Verbatim entry from William’s royal tax audit; an objective, cold bureaucratic record detailing land ownership, peasant labour, and taxable wealth in Hampshire.',
    },
    matrix: [
      {
        col: '1. CONTENT & DETAIL',
        text: 'Analyse what each source reveals about William’s methods (military terror and famine vs bureaucratic surveillance).',
      },
      {
        col: '2. PROVENANCE & MOTIVE',
        text: 'Evaluate how authorship affects utility: a repentant monastic chronicle vs an official royal fiscal audit.',
      },
      {
        col: '3. HISTORICAL JUDGEMENT',
        text: 'Reach a reasoned verdict: which source is more useful for understanding how Normans maintained control?',
      },
    ],
    connectives:
      'Source A is valuable for revealing the extreme physical terror William used to crush... • However, its utility is shaped by the author’s moral outrage as a Christian monk... • In contrast, Source B provides precise, forensic evidence of Norman bureaucratic control through... • When cross-referenced, both sources prove that Norman power rested on... • On balance, Source [A/B] is more useful because...',
    doNow: [
      {
        q: 'On what date was the Battle of Hastings fought in 1066?',
      },
      {
        q: 'What battlefield tactic did Norman cavalry execute to trick the Saxon shield wall into breaking?',
      },
      {
        q: 'What was the term for the elite, mail-clad professional bodyguards who fought around King Harold?',
      },
      {
        q: 'What battle in Yorkshire did Harold Godwinson win on 25 September 1066 before marching south?',
      },
      {
        q: 'Which Norman Duke claimed Edward the Confessor had promised him the English throne in 1051?',
      },
    ],
    vocabTask: {
      type: 'cloze',
      prompt:
        'Complete the sentences using: <strong>Motte-and-bailey</strong> (timber castle on a mound), <strong>Castellan</strong> (Norman castle commander), <strong>Harrying of the North</strong> (brutal scorched-earth campaign), <strong>Domesday Book</strong> (1086 national land audit), <strong>Subjugation</strong> (bringing under complete royal control).',
      passage:
        'To enforce the [1] of two million hostile Anglo-Saxons, William ordered the rapid construction of over 500 [2] castles garrisoned by a loyal Norman [3]. Following widespread northern rebellions, William carried out the brutal [4] of 1069–70. In 1086, he consolidated fiscal and military control by commissioning the [5] to survey every acre of English land.',
    },
    bridgeTask: {
      type: 'ledger',
      badge: 'Instruments of Subjugation Matrix',
      title: 'Task 3: Norman Weapons of Control: Physical Terror vs Bureaucratic Surveillance',
      instruction:
        'Extract 3 key pieces of factual evidence into each column, then develop your argument below:',
      col1Title: 'Physical Terror & Fortifications (Castles & Harrying)',
      col1Prompts: [
        'Over 500 timber motte-and-bailey castles built at key river crossings and towns.',
        'Portchester Castle: stone keep constructed inside massive Roman shore fort walls.',
        'The Harrying of the North (1069–70): salted fields, burned villages, 100,000 dead.',
        'Public mutilation and execution of Anglo-Saxon rebels (e.g. Hereward the Wake’s men).',
      ],
      col2Title: 'Bureaucratic Surveillance & Law (Domesday & Feudalism)',
      col2Prompts: [
        'Domesday survey (1086): recorded every ox, plow, mill, and villein in England.',
        'Feudal tenure: all land declared royal property; barons swore direct allegiance.',
        'Forest Laws: harsh capital punishment for hunting deer in the royal forests.',
        'Replacement of Anglo-Saxon thegns with a tiny Norman ruling elite of c. 200 barons.',
      ],
      synthesisPrompt:
        'Explain whether military terror or bureaucratic surveillance was more effective in keeping England under Norman control:',
      clue: '<em>Low-Floor Clue:</em> Castles and terror crushed immediate rebellions, but Domesday and the feudal system ensured William could tax and govern England permanently.',
      scholarsEdge:
        '<strong>★ Scholar’s Edge:</strong> Why did 19th-century historians view the Domesday Book as administrative genius, while contemporary Saxons viewed it as an intrusive instrument of conquest?',
    },
  },
  {
    // Lesson 3: Crown vs Church
    taskType: 'extended_writing',
    genre: 'Causal Analysis: Causation & Transformation',
    skill: 'Causation & Transformation',
    timelineMission:
      'Illustrate Milestone 3 on Page 2: Sketch the Archbishop’s cross, the four knights in Canterbury Cathedral, or Henry II’s public penance.',
    enquiryQuestion:
      'Enquiry: Why did the dispute between King Henry II and Thomas Becket escalate into cathedral murder (1162–1170)?',
    objectives: [
      'Understand the clash between royal common law and Church canon law over criminous clerks.',
      'Explain how Henry II’s friendship with Becket transformed into bitter institutional enmity.',
      'Evaluate why the four knights assassinated Becket and how Henry II was forced into public humiliation.',
    ],
    doNow: [
      {
        q: 'What were the two main parts of an early Norman timber castle?',
      },
      {
        q: 'What brutal scorched-earth campaign did William I carry out across Yorkshire in the winter of 1069–1070?',
      },
      {
        q: 'What unprecedented national survey of land, livestock, and wealth was completed in 1086?',
      },
      {
        q: 'Which Hampshire castle features a Norman stone keep built directly inside Roman fort walls?',
      },
      {
        q: 'Roughly how many Norman invaders successfully ruled over two million Anglo-Saxons after 1066?',
      },
    ],
    vocabTask: {
      type: 'mapping',
      prompt:
        'Write a precise historical sentence connecting two of these terms: <strong>Benefit of Clergy</strong> (trial privilege in Church courts), <strong>Criminous Clerks</strong> (clergy accused of crimes), <strong>Excommunication</strong> (banishment from the Catholic Church). <em>Sentence starter: "King Henry II clashed with Archbishop Becket over criminous clerks because..."</em>',
    },
    bridgeTask: {
      type: 'ledger',
      badge: 'Institutional Collision Matrix',
      title: 'Task 3: The Crown vs Mitre Collision: Royal Legal Authority vs Papal Church Autonomy',
      instruction:
        'Extract 3 key pieces of factual evidence into each column, then develop your argument below:',
      col1Title: 'King Henry II’s Royal Objectives',
      col1Prompts: [
        'Restore royal law and order after the destructive civil war of King Stephen’s reign.',
        'End "benefit of clergy" so murderers and thieves in holy orders faced royal hanging.',
        '1164 Constitutions of Clarendon: demanded criminous clerks be stripped and tried by kings.',
        'Appointed his closest friend Thomas Becket to Canterbury to control the English Church.',
      ],
      col2Title: 'Archbishop Becket’s Spiritual Resistance',
      col2Prompts: [
        'Radical conversion: abandoned luxury, wore sackcloth, and championed papal supremacy.',
        'Refused to sign Clarendon, arguing Christ had not ordained dual punishment for priests.',
        'Fled to France for six years; excommunicated royal bishops who crowned Henry’s son.',
        'Returned to Canterbury in 1170 refusing to compromise on Church freedoms.',
      ],
      synthesisPrompt:
        'Explain whether personal pride or deep religious-legal principle was the primary cause of Becket’s murder:',
      clue: '<em>Low-Floor Clue:</em> Henry II thought appointing his drinking friend Becket as Archbishop would let him control the Church, but Becket believed his supreme duty was to God and the Pope, not the King.',
      scholarsEdge:
        '<strong>★ Scholar’s Edge:</strong> How did Becket’s martyrdom at Canterbury permanently weaken royal legal supremacy over the Catholic Church in medieval England?',
    },
    structureStrip: [
      {
        col: '1. LEGAL COLLISION',
        text: 'Explain the clash over criminous clerks, benefit of clergy, and the Constitutions of Clarendon.',
      },
      {
        col: '2. PERSONAL VOLATILITY',
        text: 'Analyse the breakdown of Henry and Becket’s friendship, exile, and the Young King’s coronation.',
      },
      {
        col: '3. CATHEDRAL MURDER',
        text: 'Evaluate the outburst of Henry II, the knights’ actions, and the long-term triumph of Becket’s martyrdom.',
      },
    ],
    connectives:
      'The dispute between Henry II and Thomas Becket escalated primarily because... • At the heart of the crisis was the controversial issue of... • Crucially, when Henry issued the Constitutions of Clarendon, Becket... • This personal and constitutional friction exploded when Becket excommunicated... • Ultimately, while Henry never intended Becket’s murder, his fatal outburst directly caused...',
  },
  {
    // Lesson 4: Magna Carta
    taskType: 'extended_writing',
    genre: 'Historiographical Debate: Historical Significance',
    skill: 'Historical Significance',
    timelineMission:
      'Illustrate Milestone 4 on Page 2: Sketch King John with the Great Seal, the rebellious barons at Runnymede, or Clause 39 parchment.',
    enquiryQuestion:
      'Enquiry: To what extent was Magna Carta (1215) a selfish baronial power grab rather than a foundation of liberty?',
    objectives: [
      'Examine King John’s financial extortions, loss of Normandy, and clashes with Pope Innocent III.',
      'Analyse the key clauses of Magna Carta: Clause 12 (taxation), Clause 39 (trial by peers), Clause 61 (security).',
      'Judge whether the Great Charter was an aristocratic treaty protecting noble wealth or the birth of constitutional monarchy.',
    ],
    doNow: [
      {
        q: 'In which cathedral was Archbishop Thomas Becket murdered on 29 December 1170?',
      },
      {
        q: 'What 1164 royal document issued by Henry II attempted to strip Church courts of criminal cases?',
      },
      {
        q: 'What legal privilege allowed educated men to claim trial in lenient Church courts rather than royal courts?',
      },
      {
        q: 'What severe religious penalty did the Pope use to cut a Christian off from the sacraments and Church community?',
      },
      {
        q: 'What public act of penance did King Henry II undergo at Canterbury Cathedral in July 1174?',
      },
    ],
    vocabTask: {
      type: 'distinction',
      prompt:
        'Distinguish between the medieval feudal tax paid by barons in place of military service (<strong>Scutage</strong>) and the legal principle protecting free subjects from arbitrary imprisonment without trial (<strong>Due Process / Habeas Corpus</strong>). <em>Hint: Explain what each term meant and why barons demanded due process in 1215:</em>',
    },
    bridgeTask: {
      type: 'ledger',
      badge: 'Charter Evaluation Matrix',
      title:
        'Task 3: Magna Carta Balance Sheet: Selfish Baronial Shield vs Enduring Charter of Liberty',
      instruction:
        'Extract 3 key pieces of factual evidence into each column, then develop your argument below:',
      col1Title: 'Selfish Baronial Shield (13th-Century Reality)',
      col1Prompts: [
        'Created by wealthy Norman barons furious over scutage taxes and lost lands in France.',
        'Entirely ignored 80% of England’s population—the unfree villeins and rural serfs.',
        'Clause 61 (Security Clause): set up an oligarchy of 25 barons to seize royal castles.',
        'Pope Innocent III annulled the charter within 10 weeks, branding it shameful and extortionate.',
      ],
      col2Title: 'Enduring Foundation of Liberty (Long-Term Legacy)',
      col2Prompts: [
        'Clause 39 established that no free man can be imprisoned without lawful trial by his peers.',
        'Clause 40 guaranteed that royal justice could never be sold, delayed, or denied.',
        'Established the revolutionary constitutional principle that the King is subject to the law.',
        'Reissued repeatedly under Henry III, evolving into the bedrock of modern parliamentary democracy.',
      ],
      synthesisPrompt:
        'Explain whether Magna Carta was primarily a selfish baronial treaty or a genuine turning point for human rights:',
      clue: '<em>Low-Floor Clue:</em> In 1215, Magna Carta only protected the rights of "free men"—meaning wealthy nobles and churchmen—leaving millions of unfree peasants completely unprotected.',
      scholarsEdge:
        '<strong>★ Scholar’s Edge:</strong> How does historian J.C. Holt challenge Victorian myths of Magna Carta as an ancient democratic constitution?',
    },
    structureStrip: [
      {
        col: '1. BARONIAL GRIEVANCES',
        text: 'Explain King John’s military defeats in Normandy, heavy scutage taxation, and feudal abuse.',
      },
      {
        col: '2. 1215 REALITY',
        text: 'Analyse how the charter protected noble privileges and ignored the vast majority of peasants.',
      },
      {
        col: '3. LONG-TERM SIGNIFICANCE',
        text: 'Evaluate how Clause 39 established the principle that even monarchs are bound by the Rule of Law.',
      },
    ],
    connectives:
      'In June 1215, King John was forced to agree to Magna Carta because... • On the one hand, historians argue the charter was a selfish power grab because... • Crucially, the document explicitly ignored the rights of... • However, its enduring historical significance lies in Clause 39, which established that... • On balance, while born of noble greed, Magna Carta became revolutionary because...',
  },
  {
    // Lesson 5: Doom Paintings & Village Life
    taskType: 'extended_writing',
    genre: 'Disciplinary Focus: Historiographical Debate & Social Structure',
    skill: 'Historiographical Debate',
    timelineMission:
      'Illustrate Milestone 5 on Page 3: Sketch an open-field strip farm, a church Doom painting with the Hellmouth, or a peasant harvesting wheat.',
    enquiryQuestion:
      'Enquiry: Were medieval peasants helpless victims of feudal oppression, or active community negotiators?',
    objectives: [
      'Examine the social structure of the Three Estates (*bellatores*, *oratores*, *laboratores*) and the open-field manor.',
      'Analyse the oppressive feudal dues (week-work, heriot, merchet, tithe) enforced by lords and the Church.',
      'Evaluate how Doom paintings controlled peasant minds and how peasants negotiated customary rights in manorial courts.',
    ],
    doNow: [
      {
        q: 'On which meadow near Windsor did King John meet his rebellious barons in June 1215?',
      },
      {
        q: 'What tax did King John extort 11 times from his barons to pay for failed wars in Normandy?',
      },
      {
        q: 'Which famous clause in Magna Carta guaranteed that no free man could be imprisoned without lawful trial?',
      },
      {
        q: 'Which Pope issued a papal bull declaring Magna Carta null and void in August 1215?',
      },
      {
        q: 'Which King was murdered in Canterbury Cathedral in 1170 after clashing with his former chancellor?',
      },
    ],
    vocabTask: {
      type: 'cloze',
      prompt:
        'Complete the sentences using: <strong>Villein</strong> (unfree peasant bound to land), <strong>Tithe</strong> (one-tenth harvest tax paid to the Church), <strong>Demesne</strong> (the lord’s personal home farm), <strong>Hellmouth</strong> (monstrous mouth swallowing sinners into Hell), <strong>Manorialism</strong> (the medieval village farming system).',
      passage:
        'Under the economic system of [1], an unfree peasant known as a [2] was legally tied to the land. Peasants farmed their own strips while performing unpaid labour on the lord’s personal estate, called the [3]. In addition, villagers gave one-tenth of their harvest as a [4] to the Church, terrified by wall paintings depicting the fiery [5] awaiting sinners.',
    },
    bridgeTask: {
      type: 'ledger',
      badge: 'Peasant Life Balance Sheet',
      title: 'Task 3: The Peasant Agency Audit: Feudal Oppression vs Communal Negotiation',
      instruction:
        'Extract 3 key pieces of factual evidence into each column, then develop your argument below:',
      col1Title: 'Feudal Oppression & Spiritual Terror (Helpless Victims)',
      col1Prompts: [
        'Tied to the soil: forbidden to leave the manor or marry without paying the lord a fine (merchet).',
        'Crushing labour dues: week-work on the lord’s demesne and heavy harvest boon-work.',
        'Heriot tax: lord seized the peasant family’s best beast when the head of household died.',
        'Doom paintings depicted demons dragging uncooperative peasants into eternal Hellfire.',
      ],
      col2Title: 'Communal Resilience & Agency (Active Negotiators)',
      col2Prompts: [
        'Manorial court rolls show peasants using customary law to challenge unfair lordly fines.',
        'Village open-field farming required sophisticated collective rotation and shared plowing.',
        'Peasant ale-drinking festivals, church ales, and saints’ days provided frequent rest and bonding.',
        'Local case: Bishop’s Waltham tenants successfully defended traditional grazing rights.',
      ],
      synthesisPrompt:
        'Explain whether fear of Hell and the lord’s power made medieval peasant life miserable or whether community solidarity gave them agency:',
      clue: '<em>Low-Floor Clue:</em> While lords held legal ownership of the land, they relied completely on peasants to plow, plant, and harvest; if peasants banded together, lords were often forced to compromise.',
      scholarsEdge:
        '<strong>★ Scholar’s Edge:</strong> How does modern micro-history (e.g. Christopher Dyer’s analysis of manorial rolls) dismantle the Victorian myth of the groveling, miserable medieval serf?',
    },
    structureStrip: [
      {
        col: '1. FEUDAL CONTROL',
        text: 'Explain the physical, legal, and financial burdens of manorialism (demesne, week-work, heriot).',
      },
      {
        col: '2. SPIRITUAL FEAR',
        text: 'Analyse the psychological impact of church Doom paintings, tithes, and eternal damnation.',
      },
      {
        col: '3. PEASANT AGENCY',
        text: 'Evaluate how village cooperation, open-field routines, and court records prove communal resilience.',
      },
    ],
    connectives:
      'Medieval village life was heavily structured by the feudal system because... • On the surface, peasants appeared powerless under burdensome dues like... • Furthermore, the parish church reinforced submission by displaying terrifying Doom paintings of... • However, revisionist social historians demonstrate that villagers... • In conclusion, while feudalism imposed harsh boundaries, ordinary peasants actively...',
  },
  {
    // Lesson 6: 1348: Black Death
    taskType: 'extended_writing',
    genre: 'Disciplinary Focus: Turning Point Analysis',
    skill: 'Turning Point Analysis',
    timelineMission:
      'Illustrate Milestone 6 on Page 3: Sketch a bubo swelling, a mass plague trench, or peasants demanding higher wages.',
    enquiryQuestion:
      'Enquiry: How significantly did the Black Death of 1348 transform English society and shatter the feudal system?',
    objectives: [
      'Trace the arrival of *Yersinia pestis* at Melcombe Regis in 1348 and distinguish bubonic from pneumonic symptoms.',
      'Analyse contemporary explanations: divine punishment, corrupt air (miasma), and planetary alignments.',
      'Evaluate the economic revolution: acute labour scarcity, peasant wage-bargaining, and the 1351 Statute of Labourers.',
    ],
    doNow: [
      {
        q: 'What proportion of their annual crop were medieval villagers legally forced to pay to the Church as a tithe?',
      },
      {
        q: 'What was the term for an unfree peasant legally bound to the land and forced to work on the lord’s demesne?',
      },
      {
        q: 'What terrifying church wall painting depicted Christ judging humanity and demons dragging sinners into Hell?',
      },
      {
        q: 'What agricultural system used three large communal fields rotated annually to preserve soil fertility?',
      },
      {
        q: 'Which grand bishop’s palace in Hampshire was built by the wealthy Bishop of Winchester in the 12th century?',
      },
    ],
    vocabTask: {
      type: 'distinction',
      prompt:
        'Distinguish between the flea-borne strain of the Black Death causing agonising swellings in lymph nodes (<strong>Bubonic Plague</strong>) and the airborne, highly contagious lung infection that was 100% fatal (<strong>Pneumonic Plague</strong>). <em>Hint: Explain how each strain was caught and why pneumonic plague was far deadlier:</em>',
    },
    bridgeTask: {
      type: 'ledger',
      badge: 'Demographic Transformation Matrix',
      title:
        'Task 3: The Demographic Collapse Balance Sheet: Short-Term Horror vs Long-Term Peasant Liberation',
      instruction:
        'Extract 3 key pieces of factual evidence into each column, then develop your argument below:',
      col1Title: 'Short-Term Horror & Chaos (1348–1350)',
      col1Prompts: [
        'Roughly 30% to 50% of the entire English population died within eighteen months.',
        'Total collapse of social order: families abandoned dying kin; priests fled parishes.',
        'Mass burial trenches dug in cities like London and Winchester to bury hundreds daily.',
        'Spiritual despair: belief that God had abandoned humanity in an apocalyptic reckoning.',
      ],
      col2Title: 'Long-Term Socioeconomic Revolution (1350–1400)',
      col2Prompts: [
        'Acute labour shortage: surviving peasants demanded triple their previous daily wages.',
        'Peasants walked off manors to work for the highest bidder, shattering feudal serfdom.',
        'Parliament’s 1351 Statute of Labourers tried to freeze wages but was widely ignored.',
        'Standard of living improved: peasants ate meat and wheat bread and wore finer cloth.',
      ],
      synthesisPrompt:
        'Explain whether the Black Death was primarily an unmitigated human catastrophe or an engine of social progress for the working poor:',
      clue: '<em>Low-Floor Clue:</em> With half the workers dead, landlords had to compete for surviving peasants; if a lord refused to pay high wages or free a serf, the peasant simply moved to another village.',
      scholarsEdge:
        '<strong>★ Scholar’s Edge:</strong> How did economic historian Michael Postan interpret the Black Death as a classic Malthusian demographic correction rather than an unpredictable bolt from the blue?',
    },
    structureStrip: [
      {
        col: '1. CATASTROPHIC IMPACT',
        text: 'Explain the horrific mortality (30–50%), symptoms, mass burial pits, and religious confusion.',
      },
      {
        col: '2. ECONOMIC REVOLUTION',
        text: 'Analyse the labour shortage, wage inflation, peasant mobility, and landlord panic.',
      },
      {
        col: '3. FEUDAL CRACKDOWN',
        text: 'Evaluate the 1351 Statute of Labourers and how it sowed the seeds for the 1381 Peasants’ Revolt.',
      },
    ],
    connectives:
      'The Black Death of 1348 was a profound historical turning point because... • Initially, the pandemic brought unimaginable catastrophe, killing... • However, the resulting demographic collapse created an acute shortage of... • Consequently, surviving peasants realized their labour was valuable and demanded... • While Parliament attempted to reverse this through the 1351 Statute of Labourers, the Black Death permanently shattered...',
  },
  {
    // Lesson 7: 1381: Peasants' Revolt
    taskType: 'source_utility',
    genre: 'Source Analysis: Forensic Evidence & Agency',
    skill: 'Historical Evidence & Forensic Extraction',
    timelineMission:
      'Illustrate Milestone 7 on Page 3: Sketch John Ball preaching on the green, the burning of the Savoy Palace, or the confrontation at Smithfield.',
    enquiryQuestion:
      'Enquiry: How useful are Sources A and B for investigating why the common people rose in rebellion in 1381?',
    objectives: [
      'Examine the triggers of the 1381 revolt: the Third Poll Tax, corruption of royal ministers, and John Ball’s sermon.',
      'Analyse the storming of London, the sacking of the Savoy Palace, and the murder of Archbishop Sudbury.',
      'Evaluate whether the Peasants’ Revolt was an unruly mob riot or a disciplined political revolution for freedom.',
    ],
    sourceA: {
      title: 'Source A: Jean Froissart, Chronicles (c. 1380s)',
      shelfmark: 'BRITISH LIBRARY • LONDON • ROYAL MS 18 E.I',
      text: '“John Ball, a crack-brained priest of Kent, would gather the people in the cloisters after Mass and preach: ‘Good people, matters cannot go well in England until all things are held in common, and there are neither serfs nor gentlemen. How can the lords prove they are greater masters than we? Are we not all descended from Adam and Eve?’”',
      clue: 'Provenance Clue: Chronicler writing for the French-speaking aristocratic elite; hostile to rebels, yet accurately captures the explosive egalitarian theology motivating the peasantry.',
    },
    sourceB: {
      title: 'Source B: The Anonimalle Chronicle: The Execution on Tower Hill (1381)',
      shelfmark: 'LEEDS UNIVERSITY LIBRARY • BROTHERTON COLLECTION • MS 29',
      text: '“The commons dragged Simon Sudbury, Archbishop of Canterbury and Chancellor, out from the chapel in the Tower of London onto Tower Hill. With loud clamour and immense fury, they struck off his head with eight strokes. They placed his head upon London Bridge, along with the royal Treasurer, shouting that they had purged England of corrupt traitors.”',
      clue: 'Provenance Clue: Detailed eyewitness chronicle written in Anglo-Norman French; records the targeted fury of the commons against corrupt royal tax ministers rather than the boy king.',
    },
    matrix: [
      {
        col: '1. CONTENT & DETAIL',
        text: 'Analyse what each source reveals about rebel motives (egalitarian theology vs fury against corrupt tax collectors).',
      },
      {
        col: '2. PROVENANCE & MOTIVE',
        text: 'Evaluate how aristocratic fear of peasant rebellion influences the depiction of John Ball and the crowd.',
      },
      {
        col: '3. HISTORICAL JUDGEMENT',
        text: 'Reach a reasoned conclusion: which source is more useful for understanding why ordinary people rebelled in 1381?',
      },
    ],
    connectives:
      'Source A is valuable for highlighting the ideological and religious motivation behind the revolt, specifically... • However, Froissart’s aristocratic prejudice portrays John Ball as... • In contrast, Source B provides precise forensic evidence of the rebels’ political targets, demonstrating that... • When cross-referenced, both sources prove that 1381 was driven by... • On balance, Source [A/B] is more valuable for this enquiry because...',
    doNow: [
      {
        q: 'In which year did the Black Death first arrive on English shores at Melcombe Regis?',
      },
      {
        q: 'What bacterial pathogen, carried by rodent fleas, was responsible for the Black Death?',
      },
      {
        q: 'Roughly what proportion of England’s population perished during the 1348–1350 epidemic?',
      },
      {
        q: 'What 1351 legislation passed by Parliament attempted to freeze peasant wages at pre-plague rates?',
      },
      {
        q: 'What religious groups whipped their bare backs in public, believing the plague was God’s wrath for human sin?',
      },
    ],
    vocabTask: {
      type: 'mapping',
      prompt:
        'Write a precise historical sentence connecting two of these terms: <strong>Poll Tax</strong> (equal tax on every person regardless of wealth), <strong>Radical Equality</strong> (belief that all humans are equal in God’s eyes), <strong>Charter Revocation</strong> (the King tearing up his promises of freedom). <em>Sentence starter: "When peasants marched on London to protest the Poll Tax, John Ball preached..."</em>',
    },
    bridgeTask: {
      type: 'ledger',
      badge: 'Rebellion Evaluation Matrix',
      title:
        'Task 3: The 1381 Rebellion Balance Sheet: Organized Political Revolution vs Destructive Riot',
      instruction:
        'Extract 3 key pieces of factual evidence into each column, then develop your argument below:',
      col1Title: 'Organized Political Revolution (Disciplined Aims)',
      col1Prompts: [
        'Demanded complete abolition of serfdom and freedom of contract for all workers.',
        'Targeted corrupt ministers (Sudbury and Hales) who squandered taxes on French wars.',
        'Mile End and Smithfield negotiations: presented formal constitutional charters to the King.',
        'Carried royal banners and proclaimed loyalty to King Richard II (*"With King Richard and the true commons"*).',
      ],
      col2Title: 'Destructive Armed Insurrection (Violent Excess)',
      col2Prompts: [
        'Burned the Savoy Palace, destroying royal tax records and debt manorial rolls.',
        'Stormed the Tower of London, murdering the Archbishop of Canterbury and Treasurer.',
        'Massacred Flemish merchant clothiers across London streets without trial.',
        'Wat Tyler’s provocative arrogance at Smithfield leading to his death by Mayor Walworth.',
      ],
      synthesisPrompt:
        'Explain whether the 1381 Peasants’ Revolt was an organized movement for human equality or a violent, uncontrolled riot:',
      clue: '<em>Low-Floor Clue:</em> Notice how the rebels were careful not to steal from the Savoy Palace—they threw gold into the Thames—proving they wanted justice, not common theft.',
      scholarsEdge:
        '<strong>★ Scholar’s Edge:</strong> Why did King Richard II’s famous promise at Mile End—*"I will be your captain"*—mask a ruthless royal counter-offensive that executed hundreds across Essex and Kent?',
    },
  },
  {
    // Lesson 8: Wars of the Roses
    taskType: 'extended_writing',
    genre: 'Disciplinary Focus: Agency & Historical Significance',
    skill: 'Agency & Historical Significance',
    timelineMission:
      'Illustrate Milestone 8 on Page 3: Sketch the Red and White Roses, the blizzard at Towton, or Henry Tudor crowned at Bosworth Field.',
    enquiryQuestion:
      'Enquiry: Why did the English nobility tear England apart in the Wars of the Roses, and how did Bosworth end the medieval era?',
    objectives: [
      'Understand the dynastic feud between the House of Lancaster (Red Rose) and the House of York (White Rose).',
      'Analyse the structural disease of "Bastard Feudalism" and the slaughter at the Battle of Towton (1461).',
      'Evaluate how Richard III’s usurpation led to Bosworth Field (1485) and the founding of the Tudor dynasty.',
    ],
    doNow: [
      {
        q: 'Which regressive tax, levied equally on all adults regardless of wealth, sparked the 1381 rebellion?',
      },
      {
        q: 'Who was the radical hedge-priest who preached "When Adam delved and Eve span, who was then the gentleman?"',
      },
      {
        q: 'Who was the military leader of the Kentish rebels killed at Smithfield by Mayor William Walworth?',
      },
      {
        q: 'Which 14-year-old monarch met the rebels at Mile End and falsely promised to be their leader?',
      },
      {
        q: 'Which Archbishop of Canterbury and Chancellor was dragged from the Tower of London and executed on Tower Hill?',
      },
    ],
    vocabTask: {
      type: 'cloze',
      prompt:
        'Complete the sentences using: <strong>Bastard Feudalism</strong> (paying cash for private armies), <strong>Retainer</strong> (paid private soldier wearing a noble’s livery), <strong>Usurpation</strong> (seizing the royal throne unlawfully), <strong>Towton</strong> (1461 snowy battle), <strong>Bosworth Field</strong> (1485 decisive battle).',
      passage:
        'During the 15th century, the system of [1] allowed wealthy nobles to pay cash to maintain private armies of liveried [2]. The dynastic collision peaked in 1461 at the blizzard battle of [3], the bloodiest clash on English soil. Following the mysterious disappearance of the Princes in the Tower and the [4] of the throne by Richard III, the war ended in 1485 at [5], where Henry VII founded the Tudor dynasty.',
    },
    bridgeTask: {
      type: 'ledger',
      badge: 'Dynastic Collapse Matrix',
      title: 'Task 3: The Wars of the Roses Factor Matrix: Royal Weakness vs Overmighty Subjects',
      instruction:
        'Extract 3 key pieces of factual evidence into each column, then develop your argument below:',
      col1Title: 'Royal Weakness & Incompetence (The Crown)',
      col1Prompts: [
        'Henry VI suffered bouts of mental catatonia and complete paralysis of royal decision-making.',
        'Total loss of English territories in France by 1453 (end of the Hundred Years’ War).',
        'Failure of the Crown to referee noble disputes, allowing feuds to escalate into open war.',
        'Richard III’s ruthless usurpation in 1483 alienated northern and southern Yorkist allies.',
      ],
      col2Title: 'Overmighty Subjects & Bastard Feudalism (The Nobility)',
      col2Prompts: [
        'Nobles retained private armies of hundreds of armed veterans wearing personal livery badges.',
        'Richard Neville, Earl of Warwick ("The Kingmaker"), possessed greater wealth than the Crown.',
        'Bloody vendettas (e.g. Percys vs Nevilles in the North) fought outside royal control.',
        'Nobles treated the English Crown as a prize to be seized by military force.',
      ],
      synthesisPrompt:
        'Explain whether the Wars of the Roses were caused primarily by the tragic weakness of Henry VI or the unchecked greed of overmighty barons:',
      clue: '<em>Low-Floor Clue:</em> A medieval king had to be a warrior and a strong judge; when King Henry VI lost his mind, ambitious nobles filled the power vacuum with private armies.',
      scholarsEdge:
        '<strong>★ Scholar’s Edge:</strong> How did Henry VII’s marriage to Elizabeth of York and his ferocious banning of private retainers permanently end the medieval era and establish early modern stability?',
    },
    structureStrip: [
      {
        col: '1. DYNASTIC FEUD',
        text: 'Explain the rivalry of Lancaster and York, Henry VI’s illness, and Bastard Feudalism.',
      },
      {
        col: '2. SLAUGHTER & TOWTON',
        text: 'Analyse the brutality of the conflict (Towton, Kingmaker, Princes in the Tower).',
      },
      {
        col: '3. BOSWORTH & TUDORS',
        text: 'Evaluate Richard III’s defeat at Bosworth Field and how Henry VII united the roses into stability.',
      },
    ],
    connectives:
      'The Wars of the Roses erupted primarily because... • At the core of the collapse was the fatal weakness of King Henry VI, who... • This void was exploited by overmighty nobles using Bastard Feudalism to... • Consequently, thirty years of slaughter culminated at Bosworth Field when... • Ultimately, the victory of Henry VII in 1485 marked the end of the medieval era because...',
  },
];

module.exports = {
  lessonConfigs,
};
