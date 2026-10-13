/**
 * scripts/enhance_eee_workbook.cjs
 *
 * Implements the Medicine-style architecture for Early Elizabethan England (Paper 2):
 * 1. 5-Stage Chronological Inquiry Spine for all 12 enquiries (100% Pearson textbook terminology)
 * 2. Exam probability tags and past paper dates for all questions
 * 3. 4-Page Enquiry Architecture:
 *    - Page 1 of module (Verso): Chronological Inquiry Spine + 30 ruled Cornell lines
 *    - Page 2 of module (Recto): Q1(a) [2m] + Q1(b) [2m] + Core Vocab + Timeline Mission
 *    - Pages 3 & 4 of module (Facing Spread): Extended Writing Assessment (Q2 Explain Why [12m] / Q3 Evaluative Essay [16m+4m])
 *       with structure strip, connectives, word bank, and 2 full pages of ruled lines with 22mm examiner margin
 * 4. Pages 22–23: The 40-Question Synoptic Retrieval Vault (Do Now questions 1–40 across Enquiries 1–4 with [ ] R1 [ ] R2 [ ] R3 checkboxes)
 * 5. Master 72-page PDF merger for 'all' and 'master'
 */

// 1. STAGES DEFINITIONS FOR ALL 12 ENQUIRIES (100% Pearson GCSE Textbook & Revision Guide)
// Pedagogical Standard: Hard Factual Anchors on Left (no spoilers) • High-Level Causal Enquiry Prompts on Right
const ENQUIRY_STAGES = {
  lesson_1_1: [
    {
      dates: '17 NOV 1558',
      title: 'Accession of Elizabeth I',
      bullets: [
        '£300,000 Crown Debt',
        'Antwerp Loans (14% Interest)',
        'Cecil Appointed Principal Secretary',
      ],
      focusClue:
        'Why did inherited debt and foreign loans create an immediate crisis for the new Queen?',
    },
    {
      dates: 'NOV–DEC 1558',
      title: 'Features of Elizabethan Government',
      bullets: [
        '19-Man Privy Council',
        'Monopolies & Royal Licences',
        'Factional Balance at Court',
      ],
      focusClue:
        'How did Elizabeth use patronage and factional competition to secure political control?',
    },
    {
      dates: 'DEC 1558',
      title: 'Challenges of Gender & Legitimacy',
      bullets: [
        'Papal Rejection of Anne Boleyn',
        '1536 Succession Act Bar',
        'Pressure to Produce Protestant Heir',
      ],
      focusClue:
        'Why did challenges to Elizabeth’s gender and legitimacy threaten domestic stability?',
    },
    {
      dates: 'JAN–MAY 1559',
      title: 'Parliament & Local Government',
      bullets: [
        'Unpaid Justices of the Peace',
        'Lords Lieutenant County Militias',
        'Taxation Granted Solely by MPs',
      ],
      focusClue:
        'Why was Elizabeth entirely dependent on unpaid local gentry to enforce royal authority?',
    },
    {
      dates: '1558–1560',
      title: 'Foreign Threats: France & Scotland',
      bullets: [
        'Loss of Calais (January 1558)',
        'Mary of Guise French Troops',
        'Quartered English Royal Arms',
      ],
      focusClue:
        'Why did the Auld Alliance and the loss of Calais make England vulnerable to foreign invasion?',
    },
  ],

  lesson_1_2: [
    {
      dates: 'NOV 1558–JAN 1559',
      title: 'Religious Divisions in 1558',
      bullets: [
        'Conservative North & Western Gentry',
        'Radical Returning Marian Exiles',
        'Marian Bishops in Lords',
      ],
      focusClue:
        'Why did England’s geographic and political divisions make a religious settlement essential?',
    },
    {
      dates: 'MAY 1559',
      title: 'The Act of Supremacy',
      bullets: [
        '‘Supreme Governor’ Compromise Title',
        'Compulsory Oath for Clergy',
        'All Marian Bishops Deprived',
      ],
      focusClue: 'Why did Elizabeth choose the title ‘Supreme Governor’ instead of ‘Supreme Head’?',
    },
    {
      dates: 'MAY 1559',
      title: 'The Act of Uniformity',
      bullets: [
        'Compulsory 1559 Prayer Book',
        'One-Shilling Recusancy Fine',
        'Deliberate Communion Ambiguity',
      ],
      focusClue:
        'How did the Act of Uniformity attempt to compromise between Catholic and Protestant worship?',
    },
    {
      dates: 'SUMMER 1559',
      title: 'The Royal Injunctions',
      bullets: [
        'Fifty-Seven Royal Directives',
        'English Bible in Every Church',
        'Pilgrimages & Fake Miracles Banned',
      ],
      focusClue:
        'How did the Royal Injunctions establish central royal control over local parish life?',
    },
    {
      dates: '1559–1560s',
      title: 'Enforcing the Settlement & Church Role',
      bullets: [
        '125 Visitation Commissioners',
        'Parish Church Court Supervision',
        'Four Hundred Clergy Resignations',
      ],
      focusClue:
        'How effectively did royal visitations and Church courts enforce conformity across England?',
    },
  ],

  lesson_1_3: [
    {
      dates: '1559–1563',
      title: 'The Nature of the Puritan Challenge',
      bullets: [
        'Geneva Calvinist Influence',
        'Demand to Abolish Holy Days',
        'Threat to Royal Prerogative',
      ],
      focusClue:
        'Why did Puritan religious demands pose a direct challenge to Elizabeth’s royal authority?',
    },
    {
      dates: '1566',
      title: 'The Crucifix & Vestments Controversy',
      bullets: [
        'Parker’s Book of Advertisements',
        'White Linen Surplice Requirement',
        'Thirty-Seven London Priests Sacked',
      ],
      focusClue:
        'Why did the dispute over clergy vestments become a major test of Elizabeth’s control?',
    },
    {
      dates: '1559–1568',
      title: 'The Catholic Challenge at Home',
      bullets: [
        'Church Papists Attending Services',
        'Lax Local JPs in North',
        'Tolerant ‘Windows Into Men’s Souls’',
      ],
      focusClue:
        'Why was Elizabeth able to tolerate moderate Catholic non-conformity during the early 1560s?',
    },
    {
      dates: '1562–1568',
      title: 'Foreign Threats: France & The Netherlands',
      bullets: [
        'French Wars of Religion (1562)',
        '10,000 Spanish Troops under Alba',
        'Council of Troubles Brutality',
      ],
      focusClue:
        'Why did the arrival of Alba’s Spanish army in the Netherlands alarm the English Privy Council?',
    },
    {
      dates: '1568–1569',
      title: 'Escalating Tensions: The Genoese Loan',
      bullets: [
        '£85,000 Italian Bullion Storm Shelter',
        'Queen Claims Italian Bank Loan',
        'Alba Imposes English Trade Embargo',
      ],
      focusClue:
        'How did the seizure of the Genoese Loan push England and Spain closer to open conflict?',
    },
  ],

  lesson_1_4: [
    {
      dates: '1560–1565',
      title: 'Mary’s Claim to the English Throne',
      bullets: [
        'Margaret Tudor Granddaughter Lineage',
        'Marriage to Henry Lord Darnley',
        'Legitimate Catholic Figurehead',
      ],
      focusClue:
        'Why did Mary Stuart’s royal ancestry and marriage choices threaten Elizabeth’s security?',
    },
    {
      dates: 'FEB 1567',
      title: 'The Murder of Lord Darnley',
      bullets: [
        'Kirk o’ Field Gunpowder Explosion',
        'Marriage to Earl of Bothwell',
        'Scottish Protestant Rebellion',
      ],
      focusClue:
        'Why did Darnley’s murder and Mary’s marriage to Bothwell ruin her authority in Scotland?',
    },
    {
      dates: '1567–1568',
      title: 'Abdication, Lochleven & Escape',
      bullets: [
        'Forced Abdication for Infant James VI',
        'Fishing Boat Crossing to Workington',
        'Anointed Monarch Under House Arrest',
      ],
      focusClue:
        'Why did Mary’s unexpected arrival in England present Elizabeth with an impossible dilemma?',
    },
    {
      dates: '1568–1569',
      title: 'The Inquiry at York & Casket Letters',
      bullets: [
        'Eight French Casket Love Letters',
        'Refusal of Direct Cross-Examination',
        'No Verdict Justifies Detention',
      ],
      focusClue:
        'Why did Elizabeth choose an inconclusive verdict rather than declaring Mary guilty or innocent?',
    },
    {
      dates: '1569',
      title: 'Mary’s Imprisonment in England',
      bullets: [
        'Guarded by Earl of Shrewsbury',
        'Duke of Norfolk Court Marriage Plot',
        'Magnet for Northern Catholic Discontent',
      ],
      focusClue:
        'Why did Mary Stuart’s presence in England inevitably lead to armed Catholic rebellion?',
    },
  ],

  lesson_2_1: [
    {
      dates: 'NOV 1569–JAN 1570',
      title: 'The Revolt of the Northern Earls',
      bullets: [
        'Latin Mass at Durham Cathedral',
        'Spanish Troops Fail to Land',
        'Four Hundred and Fifty Executions',
      ],
      focusClue:
        'Why did the Northern Earls fail to overthrow Elizabeth despite capturing Durham Cathedral?',
    },
    {
      dates: '1570–1571',
      title: 'Papal Bull & The Ridolfi Plot',
      bullets: [
        'Regnans in Excelsis Excommunication',
        'Italian Banker Roberto Ridolfi Courier',
        'Norfolk Beheaded on Tower Hill',
      ],
      focusClue:
        'How did the 1570 Papal Bull transform the legal and political danger facing English Catholics?',
    },
    {
      dates: '1583–1584',
      title: 'The Throckmorton Plot & Bond of Association',
      bullets: [
        'French Duke of Guise Invasion Plan',
        'Philip II Provides 200,000 Ducats',
        'Bond of Association Traitor Oath',
      ],
      focusClue:
        'Why did the discovery of the Throckmorton Plot lead to harsher anti-Catholic measures?',
    },
    {
      dates: '1586',
      title: 'The Babington Plot & Walsingham’s Spies',
      bullets: [
        'Letters in Waterproof Beer Barrels',
        'Phelippes Decodes Gallows Cipher',
        'Explicit Approval of Regicide',
      ],
      focusClue:
        'How did Walsingham use espionage and deciphered correspondence to trap Mary Stuart?',
    },
    {
      dates: 'FEB 1587',
      title: 'The Execution of Mary, Queen of Scots',
      bullets: [
        'Act for the Queen’s Safety Trial',
        'Fotheringhay Castle Great Hall Block',
        'Divine Right Monarchical Martyrdom',
      ],
      focusClue:
        'Why was Elizabeth so reluctant to execute Mary Queen of Scots despite proven treason?',
    },
  ],

  lesson_2_2: [
    {
      dates: '1570–1577',
      title: 'Political and Religious Rivalry with Spain',
      bullets: [
        'Antwerp Deep-Water Ports Threat',
        'William of Orange Protestant Rebellion',
        'Funding Sea Beggars Privateers',
      ],
      focusClue: 'Why did Spanish control of the Netherlands threaten English trade and security?',
    },
    {
      dates: '1570–1579',
      title: 'Commercial Rivalry in the New World',
      bullets: [
        'Spanish Monopoly on American Bullion',
        'Nombre de Dios Mule Train Ambush',
        'Queen Licences Legal Piracy',
      ],
      focusClue:
        'Why did English privateering in the Caribbean inflame diplomatic tensions with Spain?',
    },
    {
      dates: '1577–1580',
      title: 'Drake’s Circumnavigation',
      bullets: [
        'Cacafuego Surrenders £140,000 Treasure',
        'Uncharted Pacific Raids on Peru',
        'Golden Hind Knighthood Defiance',
      ],
      focusClue:
        'Why did Drake’s circumnavigation represent a direct challenge to the Spanish Empire?',
    },
    {
      dates: '1581–1584',
      title: 'Escalation & Elizabeth’s Defiance',
      bullets: [
        'Philip II Inherits Portuguese Crown',
        'Assassination of William of Orange',
        'French Catholic Guise League Accord',
      ],
      focusClue:
        'How did events in Europe between 1580 and 1584 increase the threat of a Spanish invasion?',
    },
    {
      dates: '1584–1585',
      title: 'The Treaties of Joinville & Nonsuch',
      bullets: [
        'Secret Treaty of Joinville (Dec 1584)',
        '7,400 English Troops under Dudley',
        'Direct Military Confrontation Declared',
      ],
      focusClue:
        'Why did the Treaty of Nonsuch mark the point of no return for war between England and Spain?',
    },
  ],

  lesson_2_3: [
    {
      dates: 'DEC 1585–1586',
      title: 'Dudley’s Campaign in the Netherlands',
      bullets: [
        'Governor-General Title Angers Elizabeth',
        'Underfunded & Deserting English Troops',
        'Prevents Parma Capturing Deep Ports',
      ],
      focusClue:
        'Why did Dudley’s campaign in the Netherlands struggle to achieve decisive military success?',
    },
    {
      dates: '1586–1587',
      title: 'Military Setbacks: Zutphen & Deventer',
      bullets: [
        'Sir Philip Sidney Killed at Zutphen',
        'Stanley & Yorke Betray Dutch Forts',
        'Dutch Council of State Distrust',
      ],
      focusClue:
        'How did English betrayals and command disputes damage relations with the Dutch rebels?',
    },
    {
      dates: 'APRIL 1587',
      title: 'Drake’s Raid on Cadiz',
      bullets: [
        'Thirty Spanish Warships Destroyed',
        '‘Singeing the King of Spain’s Beard’',
        'Postpones Armada by Twelve Months',
      ],
      focusClue:
        'How did Drake’s tactical boldness at Cadiz disrupt the Spanish invasion timetable?',
    },
    {
      dates: '1587–1588',
      title: 'Impact of the Cadiz Raid',
      bullets: [
        'Seasoned Barrel Staves Incinerated',
        'Santa Cruz Dies; Medina Sidonia Inexperienced',
        'Rotting Food & Leaking Water Casks',
      ],
      focusClue:
        'Why were logistical damage and command changes fatal to the Spanish invasion plan?',
    },
    {
      dates: 'MAY–JULY 1588',
      title: 'The Armada Sets Sail',
      bullets: [
        '130 Ships & 30,000 Men Sail',
        'Parma Lacks Deep-Water Harbor in Shallows',
        'Unreliable 48-Hour Message Relay',
      ],
      focusClue:
        'What strategic flaws made Philip II’s plan to link the fleet with Parma extremely risky?',
    },
  ],

  lesson_2_4: [
    {
      dates: 'JULY 1588',
      title: 'Channel Battles: Plymouth to Isle of Wight',
      bullets: [
        'Seven-Mile Crescent Defensive Line',
        'Long-Range Culverin Duel Beyond Boarding',
        'Prevented Landing on Isle of Wight',
      ],
      focusClue:
        'Why were English ships unable to break the Armada’s crescent formation in open Channel water?',
    },
    {
      dates: '7–8 AUG 1588',
      title: 'Calais Roads & The Fireships',
      bullets: [
        'Eight Pitch-Soaked Vessels at Midnight',
        'Panic-Stricken Spanish Ships Cut Anchors',
        'Shattered Crescent Never Reforms',
      ],
      focusClue:
        'Why did the English use of fireships at Calais prove the decisive turning point of the campaign?',
    },
    {
      dates: '8 AUG 1588',
      title: 'The Battle of Gravelines',
      bullets: [
        'Hawkins’ Low Race-Built Galleons',
        'Rapid-Fire Broadside Gunnery Close Range',
        'Three Galleons Sunk & Fleet Scattered',
      ],
      focusClue:
        'How did English ship design and gunnery tactics defeat Spanish warships at Gravelines?',
    },
    {
      dates: 'AUG–SEPT 1588',
      title: 'The Winds & Atlantic Retreat',
      bullets: [
        'Gale-Force ‘Protestant Wind’ Drives North',
        'Missing Anchors on Scottish & Irish Reefs',
        'Only Sixty-Seven Battered Ships Return',
      ],
      focusClue:
        'Why did the combination of adverse weather and lost equipment destroy the retreating Armada?',
    },
    {
      dates: '1588–1589',
      title: 'Consequences of the English Victory',
      bullets: [
        'Tilbury Speech: ‘Heart & Stomach of a King’',
        '‘God Blew and They Were Scattered’ Medals',
        'English Naval Superpower Prestige Secured',
      ],
      focusClue:
        'How did the defeat of the Armada transform Elizabeth’s reputation at home and abroad?',
    },
  ],

  lesson_3_1: [
    {
      dates: '1558–1580s',
      title: 'Attitudes to Education & Literacy',
      bullets: [
        'Literacy at 30% for Men & 10% for Women',
        'Petty Schools & Dame Schools for Basics',
        'Reinforcing Great Chain of Being',
      ],
      focusClue:
        'Why did Elizabethan attitudes towards social hierarchy limit educational opportunity?',
    },
    {
      dates: '1558–1580s',
      title: 'Grammar Schools',
      bullets: [
        'Over Seventy New Endowed Schools Founded',
        'Latin Grammar & Classical Rhetoric Curriculum',
        'Social Mobility for Middling Sons',
      ],
      focusClue:
        'How did grammar schools provide a route for sons of the gentry and merchants to rise in society?',
    },
    {
      dates: '1558–1580s',
      title: 'Universities & Noble Education',
      bullets: [
        'Private Tutors in Noble Households',
        'Oxford & Cambridge College Expansions',
        'Inns of Court London Legal Training',
      ],
      focusClue:
        'How did the education of the nobility differ from schooling provided to the middling classes?',
    },
    {
      dates: '1558–1580s',
      title: 'Sports and Pastimes by Social Class',
      bullets: [
        'Hunting, Hawking & Fencing for Elites',
        'Violent Folk Football & Archery for Commoners',
        'Universal Paris Garden Bear-Baiting',
      ],
      focusClue:
        'How did leisure pursuits reflect both deep social divisions and shared national culture?',
    },
    {
      dates: '1576–1588',
      title: 'Development of the Theatre',
      bullets: [
        'Burbage Builds ‘The Theatre’ at Shoreditch',
        'Penny Groundlings Mingle with Box Gentry',
        'Puritans Condemn Immorality & Plague Risk',
      ],
      focusClue:
        'Why did the theatre attract enormous popularity while provoking intense Puritan opposition?',
    },
  ],

  lesson_3_2: [
    {
      dates: '1558–1580s',
      title: 'Population Growth & Rising Prices',
      bullets: [
        'Population Surges from 3m to Over 4m',
        'Consecutive Bad Harvests Inflate Grain Prices',
        'Falling Real Wages for Farm Labourers',
      ],
      focusClue:
        'How did the relationship between population growth and food supply generate severe poverty?',
    },
    {
      dates: '1558–1580s',
      title: 'Changes in Farming: Enclosure & Sheep',
      bullets: [
        'Wool Accounts for 80% of English Exports',
        'Hedging Common Land for Low-Labour Flocks',
        'Eviction of Strip-Farming Tenant Cottagers',
      ],
      focusClue:
        'Why did the expansion of sheep farming cause widespread rural unemployment and eviction?',
    },
    {
      dates: '1558–1570s',
      title: 'Changing Attitudes to the Poor',
      bullets: [
        'Harman’s Caveat for Common Cursitors Book',
        'Impotent Poor Versus Sturdy Beggars',
        'Dread of Social Unrest & Treasonous Riot',
      ],
      focusClue:
        'Why did Elizabethan authorities draw such a sharp distinction between the ‘deserving’ and ‘idle’ poor?',
    },
    {
      dates: '1572',
      title: 'The 1572 Vagabonds Act',
      bullets: [
        'Compulsory Parish Poor Rate Tax',
        'Overseers Appointed to Distribute Relief',
        'Ear-Boring with Hot Iron for Repeat Vagrants',
      ],
      focusClue:
        'How did the 1572 Act combine harsh criminal punishment with the first compulsory tax for relief?',
    },
    {
      dates: '1576',
      title: 'The 1576 Act for Relief of the Poor',
      bullets: [
        'Parishes Provide Raw Wool, Flax & Hemp',
        'County Bridewells Compel Hard Labour',
        'Foundation for Comprehensive 1601 Poor Law',
      ],
      focusClue:
        'Why did the 1576 Act represent a major shift in the state’s responsibility for unemployment?',
    },
  ],

  lesson_3_3: [
    {
      dates: '1558–1575',
      title: 'New Navigational Technology',
      bullets: [
        'Astrolabes & Quadrants Measure Latitude',
        'Mercator Projection Global Maps (1569)',
        'Navigation Away from Known Coastlines',
      ],
      focusClue:
        'How did advances in navigational science make oceanic exploration feasible for English captains?',
    },
    {
      dates: '1558–1577',
      title: 'Improvements in Ship Design',
      bullets: [
        'Low Forecastles & Triangular Lateen Sails',
        'Culverin Cannons on Four-Wheel Carriages',
        'Manoeuvrable Tacking in Severe Atlantic Weather',
      ],
      focusClue:
        'How did changes in galleon design and gun placement give English sailors an advantage at sea?',
    },
    {
      dates: '1550s–1570s',
      title: 'The Search for New Trade Routes',
      bullets: [
        'Collapse of Antwerp Cloth Market (1550s)',
        'Muscovy & Levant Joint-Stock Companies',
        'Frobisher & Davis Arctic Northwest Search',
      ],
      focusClue:
        'Why did English merchants establish joint-stock companies to explore new global trade routes?',
    },
    {
      dates: '1577–1580',
      title: 'Drake’s Circumnavigation',
      bullets: [
        'Pelican Renamed Golden Hind at Horn',
        'Strait of Magellan Gale Storm Survival',
        'Claims Nova Albion (California) for Crown',
      ],
      focusClue:
        'Why was Drake’s voyage through the Strait of Magellan and across the Pacific an extraordinary achievement?',
    },
    {
      dates: '1580–1588',
      title: 'Significance of Drake’s Voyage',
      bullets: [
        '£140,000 Spanish Bullion Cargo Returns',
        '4,700% Financial Profit Pays Crown Debt',
        'Proves England Can Challenge Spanish Seas',
      ],
      focusClue:
        'How did the success of Drake’s circumnavigation alter England’s position on the world stage?',
    },
  ],

  lesson_3_4: [
    {
      dates: '1584',
      title: 'Raleigh’s Patent & Planning',
      bullets: [
        'Six-Year Patent to Claim Uncharted Land',
        'Hakluyt’s Discourse on Western Planting',
        'Privateering Base to Intercept Spanish Plate',
      ],
      focusClue:
        'Why did Raleigh and the Elizabethan court believe an American colony was vital to England?',
    },
    {
      dates: '1584–1585',
      title: 'Recruiting Colonists & Leaders',
      bullets: [
        '107 Gentlemen Soldiers & No Farmers',
        'Grenville Fleet & Ralph Lane Army Discipline',
        'Manteo & Wanchese Native Translators',
      ],
      focusClue:
        'Why did the social composition and skills of the 1585 colonists create severe vulnerabilities?',
    },
    {
      dates: '1585–1586',
      title: 'The First Roanoke Colony & Disaster',
      bullets: [
        'Flagship Tiger Runs Aground on Sandbar',
        'Seawater Ruins Grain Seeds & Provisions',
        'Disastrous Reliance on Secotan Fish Weirs',
      ],
      focusClue:
        'How did environmental accidents and food dependency undermine the first Roanoke settlement?',
    },
    {
      dates: '1586',
      title: 'Conflict & Evacuation',
      bullets: [
        'Silver Cup Dispute Leads to Village Burning',
        'Ralph Lane Ambush Kills Chief Wingina',
        'Drake Arrives to Evacuate Starving Settlers',
      ],
      focusClue:
        'Why did armed conflict with the Secotan force the complete abandonment of the 1585 colony?',
    },
    {
      dates: '1587–1590',
      title: 'The ‘Lost Colony’ & Significance',
      bullets: [
        '118 Civilian Settlers Led by John White',
        'Armada Impounds Supply Ships in England',
        '‘CROATOAN’ Carved on Deserted Palisade',
      ],
      focusClue:
        'What crucial lessons did the failure of the Roanoke expeditions provide for future English colonies?',
    },
  ],
};

const QUESTION_PROBABILITIES = {
  lesson_1_1: {
    featA: '★ HIGH PROBABILITY (Not examined in 7 years)',
    featB: 'CORE SPECIFICATION FOCUS',
    right: '★ HIGH-YIELD FORECAST',
  },
  lesson_1_2: {
    featA: '★ HIGH PROBABILITY',
    featB: 'RECENT EXAM BOARD FOCUS',
    right: '★ HIGH-YIELD FORECAST',
  },
  lesson_1_3: {
    featA: 'MEDIUM FREQUENCY',
    featB: 'RECENT EXAM BOARD FOCUS',
    right: '★ HIGH-YIELD FORECAST',
  },
  lesson_1_4: {
    featA: 'MEDIUM FREQUENCY',
    featB: '★ HIGH PROBABILITY (Never examined)',
    right: 'CORE SPECIFICATION FOCUS',
  },
  lesson_2_1: {
    featA: '★ HIGH PROBABILITY',
    featB: 'RECENT EXAM BOARD FOCUS',
    right: '★ HIGH-YIELD FORECAST',
  },
  lesson_2_2: {
    featA: 'MEDIUM FREQUENCY',
    featB: 'CORE SPECIFICATION FOCUS',
    right: 'CORE EXAM FOCUS',
  },
  lesson_2_3: {
    featA: 'CORE SPECIFICATION FOCUS',
    featB: '★ HIGH PROBABILITY (Not examined since 2019)',
    right: '★ HIGH-YIELD FORECAST',
  },
  lesson_2_4: {
    featA: 'MEDIUM FREQUENCY',
    featB: 'RECENT EXAM BOARD FOCUS',
    right: '★ HIGH-YIELD FORECAST',
  },
  lesson_3_1: {
    featA: '★ HIGH PROBABILITY',
    featB: '★ HIGH PROBABILITY',
    right: 'CORE SPECIFICATION FOCUS',
  },
  lesson_3_2: {
    featA: '★ HIGH PROBABILITY',
    featB: '★ HIGH PROBABILITY (Never examined)',
    right: '★ HIGH-YIELD FORECAST',
  },
  lesson_3_3: {
    featA: 'MEDIUM FREQUENCY',
    featB: 'RECENT EXAM BOARD FOCUS',
    right: '★ HIGH-YIELD FORECAST',
  },
  lesson_3_4: {
    featA: '★ HIGH PROBABILITY (Never examined)',
    featB: 'RECENT EXAM BOARD FOCUS',
    right: '★ HIGH-YIELD FORECAST',
  },
};

module.exports = { ENQUIRY_STAGES, QUESTION_PROBABILITIES };
