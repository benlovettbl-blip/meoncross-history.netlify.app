/**
 * scripts/build_eee_master_script.cjs
 *
 * Transforms scripts/render_eee_twopage_workbook.cjs into scripts/render_eee_master_workbook.cjs:
 * 1. Adds pdf-lib import at top
 * 2. Injects Cornell notes CSS into <style>
 * 3. Injects EEE_NOTE_CUES into each enquiry object
 * 4. Strips scaffolding from Q1a/Q1b (removes Target Guidance and Sentence Stems)
 * 5. Strips scaffolding from extended writing questions (removes 3-column strips, connectives, word bank)
 * 6. Replaces the generic lined paper with the Cornell 4-theme double-page note-taking layout
 * 7. Adds mergeMasterWorkbook() to combine KT1+KT2+KT3 into a 72-page Master Workbook PDF
 * 8. Updates CLI runner to handle 'master' and 'all'
 */

const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, 'render_eee_twopage_workbook.cjs');
let code = fs.readFileSync(srcPath, 'utf8');

// 1. Add pdf-lib import
code = code.replace(
  "const puppeteer = require('puppeteer');",
  "const puppeteer = require('puppeteer');\nconst { PDFDocument } = require('pdf-lib');",
);

// 2. Add Cornell CSS to <style>
const cornellCss = `
    /* Cornell Notes Architecture (Spread 2) */
    .cornell-notes-grid {
      display: flex;
      flex-direction: column;
      flex: 1;
      gap: 5px;
      margin: 2px 0;
      overflow: hidden;
    }
    .cornell-section {
      border: 1.3px solid #000000;
      border-radius: 4px;
      display: flex;
      flex: 1;
      overflow: hidden;
      background: #ffffff;
    }
    .cornell-margin-cell {
      width: 58mm;
      border-right: 1.5px solid #000000;
      padding: 4px 6px;
      background: #fbfbfb;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex-shrink: 0;
      box-sizing: border-box;
    }
    .cornell-badge {
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      font-weight: 800;
      text-transform: uppercase;
      color: #1e3a8a;
      letter-spacing: 0.5px;
      border-bottom: 1px solid #cbd5e1;
      padding-bottom: 1px;
      margin-bottom: 2px;
    }
    .cornell-title {
      font-family: 'Playfair Display', serif;
      font-size: 8.8pt;
      font-weight: 900;
      color: #000000;
      line-height: 1.15;
      margin-bottom: 3px;
    }
    .cornell-cues {
      font-family: 'Inter', sans-serif;
      font-size: 7.0pt;
      line-height: 1.22;
      color: #334155;
    }
    .cornell-cues div {
      margin-bottom: 2px;
    }
    .cornell-lines-cell {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 0 4px;
      background: #ffffff;
      box-sizing: border-box;
    }
    .line-prompt {
      font-family: 'Inter', sans-serif;
      font-size: 6.6pt;
      font-style: italic;
      color: #64748b;
      position: absolute;
      top: 1px;
      left: 2px;
    }
`;

code = code.replace(
  '/* Clean Lined Paper Grid for Extended Writing Pages (28 ruled lines per page) */',
  cornellCss +
    '\n    /* Clean Lined Paper Grid for Extended Writing Pages (28 ruled lines per page) */',
);

// 3. Inject EEE_NOTE_CUES definition before KEY_TOPICS_DATA
const EEE_NOTE_CUES = {
  lesson_1_1: [
    {
      themeNum: 1,
      badge: 'GOVERNMENT ANATOMY',
      title: '1. Society & Royal Prerogative',
      cues: [
        'Great Chain of Being & social hierarchy',
        'Monarch’s Divine Right & Royal Prerogative',
        'Privy Council: 19 advisors led by William Cecil',
        'Parliament’s role: extraordinary taxation (subsidies)',
        'Local government: Lords Lieutenant & unpaid JPs',
      ],
    },
    {
      themeNum: 2,
      badge: 'MONARCHICAL CRISIS',
      title: '2. Gender, Marriage & Legitimacy',
      cues: [
        '16th-century gender prejudice: "unnatural" female rule',
        'Anne Boleyn’s marriage & Catholic illegitimacy claims',
        'Marriage dilemmas: Philip II, Dudley, Archduke Charles',
        'Political risks of foreign vs domestic consort',
        'Creation of the "Virgin Queen" monarchical image',
      ],
    },
    {
      themeNum: 3,
      badge: 'CROWN FINANCES',
      title: '3. Financial Weakness & Crown Debts',
      cues: [
        '£300,000 Crown debt inherited from Mary I in 1558',
        'Crown income: royal demesne lands, customs, subsidies',
        'Debasement of coinage & loss of English credit abroad',
        'Cecil’s austerity policies: cost-cutting & land sales',
        'Loans from Antwerp money markets at high interest',
      ],
    },
    {
      themeNum: 4,
      badge: 'FOREIGN THREATS',
      title: '4. Foreign Threats & Strategic Verdict',
      cues: [
        'Loss of Calais (Jan 1558) via Treaty of Cateau-Cambrésis',
        'France & Scotland: The Auld Alliance & Mary of Guise',
        'French troops stationed on northern Scottish border',
        'Spanish alliance vs Catholic threat from Philip II',
        'Historical Verdict: How stable was Elizabeth’s throne in 1558?',
      ],
    },
  ],
  lesson_1_2: [
    {
      themeNum: 1,
      badge: 'RELIGIOUS DIVIDE',
      title: '1. The Religious Landscape in 1558',
      cues: [
        'Geographical split: Catholic North/West vs Protestant South-East',
        'The Marian legacy: 284 Protestant martyrs burned at stake',
        'Marian bishops in House of Lords opposed reform',
        'Reformed Protestants returning from European exile (Geneva)',
        'The need for political compromise to avoid civil war',
      ],
    },
    {
      themeNum: 2,
      badge: 'ROYAL SUPREMACY',
      title: '2. The Act of Supremacy (1559)',
      cues: [
        'Title: "Supreme Governor" instead of "Supreme Head"',
        'Compromise to appease Catholics & moderate Protestants',
        'Oath of Supremacy: required for all clergy and officials',
        'Deprivation: all Marian bishops except one refused and lost posts',
        'Establishment of the Court of High Commission',
      ],
    },
    {
      themeNum: 3,
      badge: 'LITURGICAL UNIFORMITY',
      title: '3. Act of Uniformity & Prayer Book',
      cues: [
        'Book of Common Prayer (1559): mandated in all parish churches',
        'Deliberately ambiguous wording on Communion bread & wine',
        'Church attendance: 1 shilling fine for absent recusants',
        'Church ornamentation & vestments: traditional Catholic style kept',
        'The Via Media ("Middle Way") between Rome and Geneva',
      ],
    },
    {
      themeNum: 4,
      badge: 'ENFORCEMENT & VISITATION',
      title: '4. Royal Injunctions & Parish Verdict',
      cues: [
        '57 Royal Injunctions issued summer 1559',
        'Clergy required to teach Royal Supremacy & use English Bible',
        'Preaching restricted to licensed clergy only',
        'National visitations by 125 commissioners (approx. 400 clergy lost livings)',
        'Historical Verdict: Was the Settlement a lasting peace or uneasy truce?',
      ],
    },
  ],
  lesson_1_3: [
    {
      themeNum: 1,
      badge: 'PURITAN OPPOSITION',
      title: '1. The Puritan Challenge & Crucifix Crisis',
      cues: [
        'Puritan theology: Calvinist doctrine, anti-bishops, anti-idols',
        'Crucifix Controversy: Elizabeth insisted on crucifixes in Royal Chapel',
        'Puritan bishops (e.g. Jewel, Grindal) threatened resignation',
        'Elizabeth forced to compromise: crucifix removed from parish churches',
        'Growing Puritan influence in Privy Council and House of Commons',
      ],
    },
    {
      themeNum: 2,
      badge: 'VESTMENTS CRISIS',
      title: '2. The Vestments Controversy (1566)',
      cues: [
        'Puritans viewed vestments (surplice & cope) as Catholic "popish rags"',
        'Archbishop Matthew Parker’s "Book of Advertisements" (1566)',
        'Lambeth Palace standardisation exhibition for London clergy',
        '37 London vicars refused to conform and were deprived of livings',
        'Significance: Proved Elizabeth prioritized royal uniformity over Protestant solidarity',
      ],
    },
    {
      themeNum: 3,
      badge: 'CATHOLIC RECUSANCY',
      title: '3. The Catholic Challenge & Recusancy',
      cues: [
        'Recusancy in northern counties (Yorkshire, Durham, Lancashire)',
        'Gentry held secret Catholic Latin Masses in private manor chapels',
        '1566: Pope Pius V instructed Catholics not to attend Anglican services',
        'Elizabeth initially adopted policy of tolerance ("not making windows into souls")',
        'Growing Counter-Reformation in Europe & Council of Trent decrees',
      ],
    },
    {
      themeNum: 4,
      badge: 'PAPAL EXCOMMUNICATION',
      title: '4. Regnans in Excelsis (1570) & Verdict',
      cues: [
        'Pope Pius V issues Papal Bull excommunicating Elizabeth (1570)',
        'English Catholics officially absolved from loyalty to the Crown',
        'Direct threat: turned Catholic subjects into potential royal assassins',
        'Treason Acts of 1571: bringing papal bulls into England made high treason',
        'Historical Verdict: Did Puritan or Catholic dissent pose greater danger?',
      ],
    },
  ],
  lesson_1_4: [
    {
      themeNum: 1,
      badge: 'ROYAL CLAIM',
      title: '1. Mary Stuart’s Claim to the Throne',
      cues: [
        'Lineage: Great-granddaughter of Henry VII via Margaret Tudor',
        'Strict Roman Catholics viewed Mary as legitimate heir over Elizabeth',
        '1558–59: Mary Stuart displayed English royal arms in Paris',
        'Widowed queen returned from France to Presbyterian Scotland (1561)',
        'Marriage to Lord Darnley (1565) strengthened royal succession claim',
      ],
    },
    {
      themeNum: 2,
      badge: 'FLIGHT TO ENGLAND',
      title: '2. Flight to England (May 1568)',
      cues: [
        "Murder of Lord Darnley at Kirk o' Field (Feb 1567)",
        'Mary married chief suspect Earl of Bothwell (May 1567)',
        'Scottish Protestant lords rebelled; Mary imprisoned at Lochleven',
        'Forced abdication in favour of infant son James VI',
        'Escape and defeat at Langside; flight across Solway Firth in fishing boat',
      ],
    },
    {
      themeNum: 3,
      badge: 'DIPLOMATIC DILEMMA',
      title: '3. Elizabeth’s Political & Legal Dilemma',
      cues: [
        'Option A: Help Mary regain Scottish throne (risks restoring Catholic power)',
        'Option B: Hand Mary back to Scottish rebels (threatens Divine Right of Kings)',
        'Option C: Allow Mary to flee to Catholic France (risks French invasion)',
        'Option D: Keep Mary in England under house arrest (risks Catholic plots)',
        'Elizabeth chose indefinite house arrest under Earl of Shrewsbury',
      ],
    },
    {
      themeNum: 4,
      badge: 'CASKET LETTERS',
      title: '4. The Casket Letters Inquiry & Verdict',
      cues: [
        'Inquiry held at York and Westminster (1568–69)',
        'Scottish lords produced 8 love letters and sonnets allegedly by Mary to Bothwell',
        'Mary’s defense: denied authorship, claimed letters were forgeries',
        'Elizabeth refused to make a definitive ruling of guilt or innocence',
        'Historical Verdict: Did Mary’s presence cause or merely catalyse Catholic rebellion?',
      ],
    },
  ],
  lesson_2_1: [
    {
      themeNum: 1,
      badge: 'NORTHERN REBELLION',
      title: '1. The Revolt of the Northern Earls (1569)',
      cues: [
        'Leaders: Charles Neville (Westmorland) & Thomas Percy (Northumberland)',
        'Causes: Catholic devotion, political exclusion by Cecil, Mary Stuart marriage plot',
        'Capture of Durham Cathedral: tore up English prayer books, celebrated Latin Mass',
        'Failed to rescue Mary Stuart; Crown army under Sussex crushed rebellion',
        'Retaliation: 450 rebels executed across northern villages to terrify population',
      ],
    },
    {
      themeNum: 2,
      badge: 'CONSPIRACY INVASIONS',
      title: '2. The Ridolfi & Throckmorton Plots',
      cues: [
        'Ridolfi Plot (1571): Italian banker Roberto Ridolfi, Duke of Norfolk, Spanish army under Alba',
        'Uncovered by Cecil; Norfolk executed on Tower Hill (1572)',
        'Throckmorton Plot (1583): French Duke of Guise invasion funded by Philip II',
        'Walsingham uncovered papers in Francis Throckmorton’s home',
        'Bond of Association (1584): Anyone benefiting from royal murder condemned to death',
      ],
    },
    {
      themeNum: 3,
      badge: 'INTELLIGENCE & ESPIONAGE',
      title: '3. The Babington Plot & Spy Network (1586)',
      cues: [
        'Anthony Babington plotted with Jesuit John Ballard to assassinate Elizabeth',
        'Secret letters smuggled to Mary Stuart inside beer barrels at Chartley',
        'Walsingham’s double agent Gilbert Gifford intercepted all letters',
        'Cipher clerk Thomas Phelippes decoded messages and added gallows forgery',
        'Mary’s reply approving assassination provided fatal forensic proof of treason',
      ],
    },
    {
      themeNum: 4,
      badge: 'ROYAL EXECUTION',
      title: '4. Execution at Fotheringhay (1587) & Verdict',
      cues: [
        'Trial of Mary Stuart at Fotheringhay Castle under Act for Queen’s Safety',
        'Elizabeth’s hesitation: fear of regicide backlash from France and Spain',
        'Death warrant signed 1 Feb 1587; Council dispatched it without royal consent',
        'Beheading of Mary Stuart on 8 February 1587',
        'Historical Verdict: Was Mary Stuart’s execution an act of state security or judicial murder?',
      ],
    },
  ],
  lesson_2_2: [
    {
      themeNum: 1,
      badge: 'IMPERIAL RIVALRY',
      title: '1. Commercial Rivalry in the Americas',
      cues: [
        'Spanish trade monopoly in New World enforced by Philip II',
        'English privateering: legal piracy with royal letters of marque',
        'John Hawkins pioneered Atlantic triangular slave trade (1560s)',
        'San Juan de Ulúa ambush (1568): Spanish fleet attacked Hawkins and Drake',
        'Privateering transformed from commercial venture into national crusade',
      ],
    },
    {
      themeNum: 2,
      badge: 'PACIFIC RAIDS',
      title: '2. Drake & The Circumnavigation (1577–80)',
      cues: [
        'Drake sailed *Golden Hind* into secret Spanish Pacific waters',
        'Raided undefended ports in Chile and Peru (Valparaíso, Callao)',
        'Captured treasure ship *Cacafuego*: seized £140,000 in silver and gold bullion',
        'Claimed Nova Albion (California) for Elizabeth; crossed Pacific to Moluccas',
        'Elizabeth knighted Drake on deck at Deptford (1581), infuriating Philip II',
      ],
    },
    {
      themeNum: 3,
      badge: 'DUTCH REVOLT',
      title: '3. Religious Conflict in the Netherlands',
      cues: [
        'Netherlands: vital trading partner for English cloth at Antwerp',
        'Calvinist Dutch rebels fought against Spanish Duke of Alba’s repression',
        'Elizabeth aided Sea Beggars and allowed Dutch privateers in English ports',
        '1576: Spanish Fury sacked Antwerp; Pacification of Ghent united provinces',
        'Duke of Parma arrived with Army of Flanders to reconquer southern provinces',
      ],
    },
    {
      themeNum: 4,
      badge: 'ESCALATION TO WAR',
      title: '4. The Escalation to Formal War & Verdict',
      cues: [
        '1580: Philip II inherited Portuguese crown and empire, doubling naval power',
        '1584: Assassination of Protestant leader William of Orange',
        '1584: Treaty of Joinville allied Philip II with French Catholic League',
        'Elizabeth faced nightmare scenario of isolated England facing united Catholic Europe',
        'Historical Verdict: Was war between England and Spain inevitable by 1585?',
      ],
    },
  ],
  lesson_2_3: [
    {
      themeNum: 1,
      badge: 'TREATY ALLIANCE',
      title: '1. The Treaty of Nonsuch (1585)',
      cues: [
        'August 1585: Elizabeth formally committed England to open military alliance',
        'Terms: 7,400 troops (6,400 foot, 1,000 horse) sent to the Netherlands',
        'Crown funded war costs of £126,000 per year',
        'Cautionary towns: Brill and Flushing handed over as English military guarantees',
        'Significance: Direct declaration of war against the Spanish Empire',
      ],
    },
    {
      themeNum: 2,
      badge: 'MILITARY CAMPAIGN',
      title: '2. Leicester’s Netherlands Campaign (1585–87)',
      cues: [
        'Robert Dudley, Earl of Leicester, appointed commander of English forces',
        'Dudley accepted title of "Governor-General" of Low Countries, enraging Elizabeth',
        'English army plagued by poor supplies, unpaid troops, and desertion',
        'Rowland York and William Stanley betrayed English forts (Zutphen) to Spain',
        'Leicester recalled in December 1587 having achieved minimal military progress',
      ],
    },
    {
      themeNum: 3,
      badge: 'CADIZ RAID',
      title: '3. Drake’s Raid on Cadiz (April 1587)',
      cues: [
        'Elizabeth dispatched Drake with 23 ships to disrupt Spanish fleet preparations',
        '"Singeing the King of Spain\'s Beard": Drake sailed straight into Cadiz harbor',
        'Destroyed over 30 Spanish war galleons and captured immense supply stores',
        'Crucial destruction: burned thousands of seasoned wood barrel staves (food/water rot)',
        'Delayed sailing of the Armada by over 12 months',
      ],
    },
    {
      themeNum: 4,
      badge: 'ARMADA PREPARATIONS',
      title: '4. Spanish Invasion Plans & Verdict',
      cues: [
        'Philip II’s grand strategy: Armada to sail up Channel to Calais',
        'Join with Duke of Parma’s 27,000 elite veteran soldiers in the Netherlands',
        'Parma’s army to cross Channel in flat-bottomed landing barges under naval escort',
        'Flaw: Parma had no deep-water port to load troops safe from Dutch flyboats',
        'Historical Verdict: How effective was English preemptive strategy before 1588?',
      ],
    },
  ],
  lesson_2_4: [
    {
      themeNum: 1,
      badge: 'FLEET LOGISTICS',
      title: '1. Fleet Strength & Medina Sidonia',
      cues: [
        'Spanish Armada: 130 ships, 2,431 guns, 30,000 men (led by Duke of Medina Sidonia)',
        'Medina Sidonia: experienced administrator but lacked sea combat experience',
        'Spanish strategy: tight defensive crescent formation, board enemy ships with infantry',
        'English fleet: 200 ships (led by Lord Howard of Effingham and Francis Drake)',
        'Hawkins\' design: "race-built" galleons (faster, lower in water, more manoeuvrable)',
      ],
    },
    {
      themeNum: 2,
      badge: 'CHANNEL BATTLES',
      title: '2. The Channel Running Battle (July 1588)',
      cues: [
        '29 July: Armada sighted off the Lizard, Cornwall; English fleet left Plymouth',
        'Spanish crescent formation held firm past Plymouth, Portland Bill, and Isle of Wight',
        'English long-range culverin artillery inflicted minimal structural damage',
        'Spanish ammunition spent heavily without closing for boarding combat',
        '6 August: Armada anchored at Calais Roads waiting for Parma’s army',
      ],
    },
    {
      themeNum: 3,
      badge: 'GRAVELINES DECISION',
      title: '3. Calais Fireships & Battle of Gravelines',
      cues: [
        'Midnight 7 August: English launched 8 fireships packed with pitch and gunpowder into Calais',
        'Panic: Spanish captains cut anchor cables; crescent formation broken permanently',
        '8 August: Battle of Gravelines: English ships closed to 100 yards',
        'Rapid-fire culverins pounded drifting Spanish galleons; 5 ships sunk, 1,000+ killed',
        'Spanish gunners poorly trained; mismatched cannonballs jammed guns',
      ],
    },
    {
      themeNum: 4,
      badge: 'PROTESTANT WIND',
      title: '4. The Atlantic Retreat & Historical Verdict',
      cues: [
        'South-westerly gale drove Armada north into dangerous North Sea waters',
        'Medina Sidonia forced to navigate perilous route around Scotland and western Ireland',
        'Lacking anchors and fresh water, over 40 Spanish ships wrecked on Atlantic reefs',
        'Thousands of Spanish survivors slaughtered or drowned on Irish beaches',
        'Historical Verdict: Did English tactics, Spanish blunders, or the weather defeat the Armada?',
      ],
    },
  ],
  lesson_3_1: [
    {
      themeNum: 1,
      badge: 'GRAMMAR SCHOOLS',
      title: '1. Elizabethan Grammar Schools & Humanism',
      cues: [
        'Expansion of Grammar Schools: 72 new schools founded across Elizabethan era',
        'Curriculum: Humanist education focused on Latin, Greek, rhetoric, and classical history',
        'Strict routine: 6am–5pm school day, memorization, translation, corporal punishment',
        'Target pupils: Sons of the gentry, yeomen, merchants, and prosperous craftsmen',
        'Universities: Oxford and Cambridge expanded with colleges for civil service training',
      ],
    },
    {
      themeNum: 2,
      badge: 'CLASS & GENDER',
      title: '2. Social Class & Gender Hierarchies',
      cues: [
        'Nobility & upper gentry: children educated at home by private tutors',
        'Subjects for noble boys: French, fencing, horsemanship, Latin, law',
        'Education for girls: strictly domestic skills (needlework, music, household accounts)',
        'Working-class children: zero formal schooling; agricultural and trade apprenticeships',
        'Literacy rates: 30% for men and under 10% for women by the end of Elizabeth’s reign',
      ],
    },
    {
      themeNum: 3,
      badge: 'PASTIMES & SPORT',
      title: '3. Elizabethan Pastimes & Blood Sports',
      cues: [
        'Upper-class sports: hunting, hawking (falconry), jousting, fencing, real tennis',
        'Lower-class sports: mob football (violent, unregulated), wrestling, cudgelling',
        'Blood sports: bear-baiting and cockfighting attended by all classes including Queen',
        'Popular music: madrigals, lute playing, morris dancing, parish feast days',
        'Inns and alehouses: central social hubs for ordinary townspeople and labourers',
      ],
    },
    {
      themeNum: 4,
      badge: 'PUBLIC THEATRE',
      title: '4. The Rise of Theatres & Cultural Verdict',
      cues: [
        '1576: James Burbage built "The Theatre" in Shoreditch, outside London’s city walls',
        'Playhouse architecture: unroofed circular yard (pit) for 1d groundlings, tiered galleries',
        'Playwrights: Christopher Marlowe, William Shakespeare; acting troupes (Lord Chamberlain’s Men)',
        'Opposition: Puritans condemned theatre as sinful; City authorities feared plague and riots',
        'Historical Verdict: Did Elizabethan leisure represent a genuine "Golden Age"?',
      ],
    },
  ],
  lesson_3_2: [
    {
      themeNum: 1,
      badge: 'POVERTY DRIVERS',
      title: '1. Demographic & Economic Drivers of Poverty',
      cues: [
        'Population explosion: grew from approx. 2.8 million to over 4 million (1558–1603)',
        'Rising demand for food and housing outstripped supply, causing massive inflation',
        'Bad harvests: severe failures in 1556, 1573, 1586, and consecutive crises in 1590s',
        'Debasement of coinage: lowered currency value and raised living costs for labourers',
        'Collapse of Antwerp cloth market in 1550s hit English textile weavers',
      ],
    },
    {
      themeNum: 2,
      badge: 'AGRICULTURAL REVOLUTION',
      title: '2. Enclosure & Rural Displacement',
      cues: [
        'Enclosure: replacing open fields with fenced sheep pasture for profitable wool trade',
        'Sheep farming required far fewer agricultural workers than traditional arable farming',
        'Loss of common land: deprived small cottagers of grazing rights and firewood',
        'Rack-renting: landlords increased tenant rents sharply, forcing evictions',
        'Displaced peasants migrated to market towns and London seeking scarce work',
      ],
    },
    {
      themeNum: 3,
      badge: 'SOCIAL ATTITUDES',
      title: '3. Changing Attitudes to the Poor',
      cues: [
        'Distinction: "Deserving / Impotent Poor" (elderly, sick, children) vs "Idle Vagabonds"',
        'Thomas Harman’s pamphlet *Caveat for Common Cursitors* (1567) popularized fears of con artists',
        'Categories of beggars: Anglers, Rufflers, Counterfeit Cranks (faking epilepsy)',
        'Fear of social insurrection and spread of plague from wandering vagrants',
        'Belief that poverty was becoming an imperial and civic crisis requiring state action',
      ],
    },
    {
      themeNum: 4,
      badge: 'POOR LAW REFORM',
      title: '4. Elizabethan Poor Laws & Historical Verdict',
      cues: [
        '1572 Vagabonds Act: whipping and boring through ear with hot iron; created local poor rate',
        '1576 Act for Relief of the Poor: provided raw wool and hemp for able-bodied to work',
        'House of Correction: established in each county to punish refusal to work',
        '1601 Poor Law: codified state welfare system that lasted until 1834 Poor Law Amendment',
        'Historical Verdict: Did Elizabethan policy alleviate poverty or punish victims of economic change?',
      ],
    },
  ],
  lesson_3_3: [
    {
      themeNum: 1,
      badge: 'MARITIME TECHNOLOGY',
      title: '1. Navigational Tech & Scientific Enablers',
      cues: [
        'Astrolabe and quadrant: measured latitude using angle of sun and North Star',
        'Magnetic compass and chip log: calculated ship bearing and sailing speed in knots',
        'Cartography: Gerardus Mercator’s 1569 map projection enabled true compass headings',
        'Ephemerides and navigational tables: calculated celestial positions accurately',
        'Printing press: allowed rapid distribution of voyage logs and marine manuals',
      ],
    },
    {
      themeNum: 2,
      badge: 'SHIP DESIGN',
      title: '2. Shipbuilding Innovations & Trade Routes',
      cues: [
        'Galleons: lower forecastles and longer keels increased sea-keeping and stability',
        'Lateen sails: triangular sails enabled ships to tack into the wind effectively',
        'Heavy naval armament: broadside-mounted culverins transformed merchantmen into warships',
        'Search for trade routes: North-East Passage (Muscovy Company) & North-West Passage',
        'Drive to break Spanish and Portuguese monopolies over Asian spice trade',
      ],
    },
    {
      themeNum: 3,
      badge: 'CIRCUMNAVIGATION',
      title: '3. Drake’s Global Track (1577–80)',
      cues: [
        'Departed Plymouth with 5 ships; sailed through deadly Strait of Magellan',
        '*Golden Hind* was sole ship to survive into Pacific Ocean waters',
        'Ransacked Spanish ports in Chile/Peru; took £140,000 from the *Cacafuego*',
        'Sailed north seeking North-West Passage; landed and claimed Nova Albion (California)',
        'Crossed Pacific to Moluccas (Ternate); negotiated clove trade; rounded Cape of Good Hope',
      ],
    },
    {
      themeNum: 4,
      badge: 'GEOPOLITICAL IMPACT',
      title: '4. Commercial Impact & Imperial Verdict',
      cues: [
        'Drake returned to Plymouth in Sept 1580: investors earned 4,700% profit',
        'Crown’s share paid off entire foreign national debt of £300,000',
        'Proved English maritime technology could challenge Iberian global hegemony',
        'Paved way for founding of East India Company in 1600',
        'Historical Verdict: Was Elizabethan exploration driven primarily by science, trade, or piracy?',
      ],
    },
  ],
  lesson_3_4: [
    {
      themeNum: 1,
      badge: 'COLONIAL VISION',
      title: '1. Walter Raleigh’s Colonisation Vision',
      cues: [
        'March 1584: Elizabeth granted Raleigh royal patent to colonize land not owned by Christians',
        'Strategic motives: base for privateers to raid Spanish treasure fleets in Caribbean',
        'Economic motives: access to valuable American commodities (timber, flax, tobacco, sugar)',
        '1584 reconnaissance expedition under Arthur Barlowe and Philip Amadas',
        'Barlowe returned with glowing reports and two Native Americans (Manteo and Wanchese)',
      ],
    },
    {
      themeNum: 2,
      badge: 'ROANOKE EXPEDITION',
      title: '2. The 1585 Roanoke Colony Voyage',
      cues: [
        'April 1585: fleet of 5 ships departed Plymouth carrying 107 male colonists',
        'Leadership: Sir Richard Grenville (naval commander) and Ralph Lane (colony governor)',
        'Flagship *Tiger* ran aground at Ocracoke Inlet; seawater flooded and ruined food supplies',
        'Colonists constructed a fort on Roanoke Island (modern-day North Carolina)',
        'Grenville returned to England for supplies, leaving colonists dependent on local tribes',
      ],
    },
    {
      themeNum: 3,
      badge: 'COLONY FAILURE',
      title: '3. Causes of the 1585 Colony Failure',
      cues: [
        'Unsuitable colonists: too many gentlemen who refused manual labour, lacking farmers',
        'Poor timing: late arrival meant seeds could not be planted before winter',
        'Hostility with Native Americans: English suspected theft of silver cup and burned a village',
        'Lane feared attack and killed Secotan Chief Wingina in June 1586',
        'Drake arrived two weeks later; exhausted and starving colonists evacuated back to England',
      ],
    },
    {
      themeNum: 4,
      badge: 'LOST COLONY',
      title: '4. The 1587 "Lost Colony" & Imperial Verdict',
      cues: [
        '1587: Second colony of 118 men, women, and children led by artist John White',
        'Birth of Virginia Dare, first English child born in the Americas',
        'White returned to England for supplies; delayed 3 years due to Spanish Armada threat',
        'August 1590: White returned; found settlement abandoned with only "CROATOAN" carved on post',
        'Historical Verdict: Did the Virginia failures prevent or pave the way for successful empire?',
      ],
    },
  ],
};
const EEE_NOTE_CUES_DEF =
  'const EEE_NOTE_CUES = ' + JSON.stringify(EEE_NOTE_CUES, null, 2) + ';\n\n';

code = code.replace(
  '// ============================================================================\n// KEY TOPICS MASTER CONFIGURATIONS\n// ============================================================================',
  EEE_NOTE_CUES_DEF +
    '\n// ============================================================================\n// KEY TOPICS MASTER CONFIGURATIONS\n// ============================================================================',
);

// 4. In buildEeeKeyTopicWorkbook:
// Obtain cues for the enquiry:
code = code.replace(
  '    const rx = enq.rightExam;',
  `    const rx = enq.rightExam;\n    const cues = enq.noteCues || EEE_NOTE_CUES[enq.id] || [];`,
);

// 5. Replace Q1a/Q1b with zero-scaffolding version:
const oldQ1Block = `      <!-- Question 1(a): Describe One Key Feature [2 marks] -->
      <div class="task-section" style="margin-bottom: 3px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.6pt; text-transform: uppercase; letter-spacing: 0.5px;">
            &bull; Question 1(a): Describe One Key Feature [2 marks &bull; 3 mins]
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; border: 1px solid #000000; padding: 0 4px; border-radius: 2px; background: #f8fafc; color: #000000;">
            \${enq.featureA.provenance || 'EDEXCEL PAPER 2'}
          </span>
        </div>
        <p style="font-family: 'Playfair Display', serif; font-size: 9.4pt; font-weight: 800; color: #000000; margin: 0 0 1px 0; line-height: 1.2;">
          \${enq.featureA.stem}
        </p>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-style: italic; color: #333333; margin-bottom: 1px; line-height: 1.15;">
          <strong>Target Guidance:</strong> \${enq.featureA.guidance}
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 700; margin-bottom: 1px;">
          <strong>Sentence Stems:</strong> \${enq.featureA.stems}
        </div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
      </div>

      <!-- Question 1(b): Describe One Key Feature [2 marks] -->
      <div class="task-section">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.6pt; text-transform: uppercase; letter-spacing: 0.5px;">
            &bull; Question 1(b): Describe One Key Feature [2 marks &bull; 3 mins]
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; border: 1px solid #000000; padding: 0 4px; border-radius: 2px; background: #f8fafc; color: #000000;">
            \${enq.featureB.provenance || 'EDEXCEL PAPER 2'}
          </span>
        </div>
        <p style="font-family: 'Playfair Display', serif; font-size: 9.4pt; font-weight: 800; color: #000000; margin: 0 0 1px 0; line-height: 1.2;">
          \${enq.featureB.stem}
        </p>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-style: italic; color: #333333; margin-bottom: 1px; line-height: 1.15;">
          <strong>Target Guidance:</strong> \${enq.featureB.guidance}
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 700; margin-bottom: 1px;">
          <strong>Sentence Stems:</strong> \${enq.featureB.stems}
        </div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
      </div>`;

const newQ1Block = `      <!-- Question 1(a): Describe One Key Feature [2 marks] (Pure Exam Prompt) -->
      <div class="task-section" style="margin-bottom: 3px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.6pt; text-transform: uppercase; letter-spacing: 0.5px;">
            &bull; Question 1(a): Describe One Feature [2 marks &bull; 3 mins]
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; border: 1px solid #000000; padding: 0 4px; border-radius: 2px; background: #f8fafc; color: #000000;">
            \${enq.featureA.provenance || 'EDEXCEL PAPER 2'}
          </span>
        </div>
        <p style="font-family: 'Playfair Display', serif; font-size: 9.4pt; font-weight: 800; color: #000000; margin: 0 0 2px 0; line-height: 1.2;">
          \${enq.featureA.stem}
        </p>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
      </div>

      <!-- Question 1(b): Describe One Key Feature [2 marks] (Pure Exam Prompt) -->
      <div class="task-section">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.6pt; text-transform: uppercase; letter-spacing: 0.5px;">
            &bull; Question 1(b): Describe One Feature [2 marks &bull; 3 mins]
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; border: 1px solid #000000; padding: 0 4px; border-radius: 2px; background: #f8fafc; color: #000000;">
            \${enq.featureB.provenance || 'EDEXCEL PAPER 2'}
          </span>
        </div>
        <p style="font-family: 'Playfair Display', serif; font-size: 9.4pt; font-weight: 800; color: #000000; margin: 0 0 2px 0; line-height: 1.2;">
          \${enq.featureB.stem}
        </p>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
      </div>`;

code = code.replace(oldQ1Block, newQ1Block);

// 5b. Expand vocabulary practice to 4 lines for optimal space absorption
code = code.replace(
  `          <div class="task-line" style="height: 6.0mm; margin-top: 2px;"></div>
          <div class="task-line" style="height: 6.0mm;"></div>
          <div class="task-line" style="height: 6.0mm;"></div>`,
  `          <div class="task-line" style="height: 6.0mm; margin-top: 2px;"></div>
          <div class="task-line" style="height: 6.0mm;"></div>
          <div class="task-line" style="height: 6.0mm;"></div>
          <div class="task-line" style="height: 6.0mm;"></div>`,
);

// 6. Replace extended writing scaffolding with authentic lines
const oldRxScaffoldBlock = `      <!-- 3-Column Mastery Structure Strip -->
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px; margin-bottom: 2px;">
        \${rx.structureStrip
          .map(
            (col, cIdx) => \`
        <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 2px 4px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000000; padding-bottom: 1px; margin-bottom: 1px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase; color: #000000;">
              \${col.col}
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.6pt; font-weight: 800; border: 1px solid #000000; padding: 0 3px; border-radius: 2px; background: #f8fafc;">POINT \${cIdx + 1}</span>
          </div>
          <p style="font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #111111; margin: 0; line-height: 1.16;">
            \${col.text}
          </p>
        </div>
        \`,
          )
          .join('')}
      </div>

      <!-- Connectives & Word Bank -->
      <div style="border: 1px solid #000000; padding: 2px 5px; background: #ffffff; margin-bottom: 2px; font-family: 'Inter', sans-serif; font-size: 7.2pt; line-height: 1.2;">
        <div><strong>Analytical Connectives:</strong> \${rx.connectives}</div>
        <div style="margin-top: 1px;"><strong>Word Bank:</strong> \${rx.wordBank}</div>
      </div>

      <!-- Ruled Task Lines for Extended Writing (18 Lines with Task Continuation Prompt) -->
      <div style="font-family: 'Inter', sans-serif; font-size: 7.1pt; font-style: italic; color: #222222; margin-bottom: 2px;">
        <strong>Task:</strong> Using the structure strip above, write your analytical response below (continue on Pages \${linedLeftPageNum}–\${linedRightPageNum} for full 3-paragraph timed assessment):
      </div>`;

const newRxScaffoldBlock = `      <!-- Ruled Task Lines for Authentic Exam Writing (18 Lines) -->
      <div style="display: flex; justify-content: space-between; align-items: baseline; font-family: 'Inter', sans-serif; font-size: 7.1pt; font-style: italic; color: #222222; margin-bottom: 2px;">
        <span><strong>Task:</strong> Write your analytical response below (continue on Pages \${linedLeftPageNum}–\${linedRightPageNum} for full timed assessment):</span>
        <span style="font-weight: 700; color: #000;">[ Total: \${rx.type === 'explain_why_12' ? '12 marks' : '16 marks + 4 SPaG'} ]</span>
      </div>`;

code = code.replace(oldRxScaffoldBlock, newRxScaffoldBlock);

// 7. Replace generic lined pages with Cornell Notes Layout
const oldLinedPagesBlock = `  <!-- ------------------------------------------------------------------ -->
  <!-- SPREAD 2, LEFT PAGE (VERSO): EXTENDED ESSAY RESPONSE / NOTES        -->
  <!-- ------------------------------------------------------------------ -->
  \${(() => {
    const linedRowsLeft = Array.from({ length: 28 }, (_, lIdx) => {
      const isFirst = lIdx === 0;
      const marginContent = isFirst
        ? \`<span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #555555; text-transform: uppercase; font-weight: 700;">Margin</span>\`
        : \`&nbsp;\`;
      const linePrompt = isFirst
        ? \`<span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-style: italic; color: #777777;">[ Extended Response &bull; Paragraph 2 / Further Disciplinary Notes ]</span>\`
        : \`&nbsp;\`;
      return \`
        <div class="lined-row">
          <div class="lined-margin-cell">\${marginContent}</div>
          <div class="lined-content-cell">\${linePrompt}</div>
        </div>\`;
    }).join('');

    return \`
  <div class="page page-container verso-page" id="page-\${linedLeftPageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Running Header -->
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 4px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 10.5pt; color: #000000; margin: 0; font-weight: 800;">
          Enquiry \${data.keyTopicNum}.\${enq.enquiryNum}: \${enq.title}
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
          Extended Writing &bull; Disciplinary Notes &bull; Structured Response
        </span>
      </div>

      <!-- 28 Ruled Lines with 22mm Left Margin -->
      <div class="lined-page-grid">
        \${linedRowsLeft}
      </div>

      \${renderFooterStrip(linedLeftPageNum, footers[linedLeftPageNum - 1], 24)}
    </div>
  </div>
\`;
  })()}

  <!-- ------------------------------------------------------------------ -->
  <!-- SPREAD 2, RIGHT PAGE (RECTO): INDEPENDENT PRACTICE & ESSAY CONCLUSION-->
  <!-- ------------------------------------------------------------------ -->
  \${(() => {
    const linedRowsRight = Array.from({ length: 28 }, (_, lIdx) => {
      const isFirst = lIdx === 0;
      const marginContent = isFirst
        ? \`<span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #555555; text-transform: uppercase; font-weight: 700;">Margin</span>\`
        : \`&nbsp;\`;
      const linePrompt = isFirst
        ? \`<span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-style: italic; color: #777777;">[ Extended Response Continued &bull; Paragraph 3 &amp; Sustained Conclusion ]</span>\`
        : \`&nbsp;\`;
      return \`
        <div class="lined-row">
          <div class="lined-margin-cell">\${marginContent}</div>
          <div class="lined-content-cell">\${linePrompt}</div>
        </div>\`;
    }).join('');

    return \`
  <div class="page page-container recto-page" id="page-\${linedRightPageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Running Header -->
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 4px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 10.5pt; color: #000000; margin: 0; font-weight: 800;">
          Enquiry \${data.keyTopicNum}.\${enq.enquiryNum}: \${enq.title}
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
          Independent Practice &bull; Timed Exam Response &bull; Sustained Verdict
        </span>
      </div>

      <!-- 28 Ruled Lines with 22mm Left Margin -->
      <div class="lined-page-grid">
        \${linedRowsRight}
      </div>

      \${renderFooterStrip(linedRightPageNum, footers[linedRightPageNum - 1], 24)}
    </div>
  </div>
\`;
  })()}`;

const newCornellNotesBlock = `  <!-- ------------------------------------------------------------------ -->
  <!-- SPREAD 2, LEFT PAGE (VERSO): CORNELL NOTES PART 1 (THEMES 1 & 2)  -->
  <!-- ------------------------------------------------------------------ -->
  <div class="page page-container verso-page" id="page-\${linedLeftPageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Running Header -->
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 10.5pt; color: #000000; margin: 0; font-weight: 800;">
          Enquiry \${data.keyTopicNum}.\${enq.enquiryNum}: \${enq.title}
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
          Structured Enquiry Notes &bull; Themes 1 &amp; 2
        </span>
      </div>

      <!-- Cornell Dual-Section Grid (Theme 1 & Theme 2) -->
      <div class="cornell-notes-grid">
        
        <!-- Theme 1 (Top Half: 14 Lines) -->
        <div class="cornell-section">
          <div class="cornell-margin-cell">
            <div>
              <div class="cornell-badge">\${cues[0].badge}</div>
              <div class="cornell-title">\${cues[0].title}</div>
              <div class="cornell-cues">
                \${cues[0].cues.map(c => \`<div>&bull; \${c}</div>\`).join('')}
              </div>
            </div>
            <div style="font-family: 'Inter', sans-serif; font-size: 6.2pt; color: #64748b; font-style: italic; border-top: 1px dotted #cbd5e1; padding-top: 2px;">
              Enquiry \${data.keyTopicNum}.\${enq.enquiryNum} &bull; Section A
            </div>
          </div>
          <div class="cornell-lines-cell">
            \${Array.from({ length: 14 }).map((_, li) => \`
              <div class="task-line">
                \${li === 0 ? \`<span class="line-prompt" style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-style: italic; color: #64748b; padding-left: 2px;">[ Notes: Historical Evidence, Figures &amp; Specific Detail ]</span>\` : ''}
              </div>
            \`).join('')}
          </div>
        </div>

        <!-- Theme 2 (Bottom Half: 14 Lines) -->
        <div class="cornell-section">
          <div class="cornell-margin-cell">
            <div>
              <div class="cornell-badge">\${cues[1].badge}</div>
              <div class="cornell-title">\${cues[1].title}</div>
              <div class="cornell-cues">
                \${cues[1].cues.map(c => \`<div>&bull; \${c}</div>\`).join('')}
              </div>
            </div>
            <div style="font-family: 'Inter', sans-serif; font-size: 6.2pt; color: #64748b; font-style: italic; border-top: 1px dotted #cbd5e1; padding-top: 2px;">
              Enquiry \${data.keyTopicNum}.\${enq.enquiryNum} &bull; Section B
            </div>
          </div>
          <div class="cornell-lines-cell">
            \${Array.from({ length: 14 }).map((_, li) => \`
              <div class="task-line">
                \${li === 0 ? \`<span class="line-prompt" style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-style: italic; color: #64748b; padding-left: 2px;">[ Notes: Detailed Factors, Causal Links &amp; Explanations ]</span>\` : ''}
              </div>
            \`).join('')}
          </div>
        </div>

      </div>

      \${renderFooterStrip(linedLeftPageNum, footers[linedLeftPageNum - 1], 24)}
    </div>
  </div>

  <!-- ------------------------------------------------------------------ -->
  <!-- SPREAD 2, RIGHT PAGE (RECTO): CORNELL NOTES PART 2 (THEMES 3 & 4) -->
  <!-- ------------------------------------------------------------------ -->
  <div class="page page-container recto-page" id="page-\${linedRightPageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Running Header -->
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 10.5pt; color: #000000; margin: 0; font-weight: 800;">
          Enquiry \${data.keyTopicNum}.\${enq.enquiryNum}: \${enq.title}
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
          Structured Enquiry Notes &bull; Theme 3 &amp; Synthesis
        </span>
      </div>

      <!-- Cornell Dual-Section Grid (Theme 3 & Theme 4/Synthesis) -->
      <div class="cornell-notes-grid">
        
        <!-- Theme 3 (Top Half: 14 Lines) -->
        <div class="cornell-section">
          <div class="cornell-margin-cell">
            <div>
              <div class="cornell-badge">\${cues[2].badge}</div>
              <div class="cornell-title">\${cues[2].title}</div>
              <div class="cornell-cues">
                \${cues[2].cues.map(c => \`<div>&bull; \${c}</div>\`).join('')}
              </div>
            </div>
            <div style="font-family: 'Inter', sans-serif; font-size: 6.2pt; color: #64748b; font-style: italic; border-top: 1px dotted #cbd5e1; padding-top: 2px;">
              Enquiry \${data.keyTopicNum}.\${enq.enquiryNum} &bull; Section C
            </div>
          </div>
          <div class="cornell-lines-cell">
            \${Array.from({ length: 14 }).map((_, li) => \`
              <div class="task-line">
                \${li === 0 ? \`<span class="line-prompt" style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-style: italic; color: #64748b; padding-left: 2px;">[ Notes: Strategic Consequences, Opposition &amp; Impacts ]</span>\` : ''}
              </div>
            \`).join('')}
          </div>
        </div>

        <!-- Theme 4 (Bottom Half: 14 Lines - Evaluative Synthesis) -->
        <div class="cornell-section">
          <div class="cornell-margin-cell">
            <div>
              <div class="cornell-badge">\${cues[3].badge}</div>
              <div class="cornell-title">\${cues[3].title}</div>
              <div class="cornell-cues">
                \${cues[3].cues.map(c => \`<div>&bull; \${c}</div>\`).join('')}
              </div>
            </div>
            <div style="font-family: 'Inter', sans-serif; font-size: 6.2pt; color: #64748b; font-style: italic; border-top: 1px dotted #cbd5e1; padding-top: 2px;">
              Enquiry \${data.keyTopicNum}.\${enq.enquiryNum} &bull; Historical Verdict
            </div>
          </div>
          <div class="cornell-lines-cell">
            \${Array.from({ length: 14 }).map((_, li) => \`
              <div class="task-line">
                \${li === 0 ? \`<span class="line-prompt" style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-style: italic; color: #64748b; padding-left: 2px;">[ Evaluative Synthesis &amp; Sustained Historical Judgment ]</span>\` : ''}
              </div>
            \`).join('')}
          </div>
        </div>

      </div>

      \${renderFooterStrip(linedRightPageNum, footers[linedRightPageNum - 1], 24)}
    </div>
  </div>`;

code = code.replace(oldLinedPagesBlock, newCornellNotesBlock);

// 8. Add mergeMasterWorkbook() before main()
const mergeFunction = `
// Master PDF Merger (KT1 + KT2 + KT3 = 72-page Master Workbook)
async function mergeMasterWorkbook() {
  console.log('\\n🔄 Merging Early Elizabethan England Master Pupil Workbook (72 Pages)...');
  const mergedPdf = await PDFDocument.create();

  const kts = ['KT1', 'KT2', 'KT3'];
  let totalMergedPages = 0;

  for (const kt of kts) {
    const pdfFileName = \`eee_pupil_workbook_\${kt}_FINAL_V17.pdf\`;
    const pdfPath = path.join(ROOT_DIR, 'public', 'pdfs', pdfFileName);

    if (!fs.existsSync(pdfPath)) {
      console.warn(\`⚠️ Warning: Missing \${pdfFileName}, skipping merge for \${kt}...\`);
      continue;
    }

    const pdfBytes = fs.readFileSync(pdfPath);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
    totalMergedPages += pdfDoc.getPageCount();
    console.log(\`  ✓ Added \${kt} (\${pdfDoc.getPageCount()} pages)\`);
  }

  const masterPdfPath = path.join(ROOT_DIR, 'public', 'pdfs', 'eee_pupil_workbook_master_FINAL_V17.pdf');
  const masterLegacyPath = path.join(ROOT_DIR, 'public', 'pdfs', 'eee_pupil_workbook_master.pdf');

  const mergedBytes = await mergedPdf.save();
  fs.writeFileSync(masterPdfPath, mergedBytes);
  fs.copyFileSync(masterPdfPath, masterLegacyPath);

  console.log(\`🎉 Successfully compiled Master Pupil Workbook (\${totalMergedPages} pages) -> \${masterPdfPath}\\n\`);
}
`;

code = code.replace(
  '// ============================================================================\n// CLI RUNNER\n// ============================================================================',
  mergeFunction +
    '\n// ============================================================================\n// CLI RUNNER\n// ============================================================================',
);

// 9. Update main() to merge if target is 'master' or 'all'
const oldMainEnd = `  console.log('\\n🎉 100% COMPLETE: Early Elizabethan England Workbooks Generated!');
}`;

const newMainEnd = `  if (target === 'all' || target === 'master') {
    await mergeMasterWorkbook();
  }

  console.log('\\n🎉 100% COMPLETE: Early Elizabethan England Master Workbooks Generated!');
}`;

code = code.replace(oldMainEnd, newMainEnd);

// 10. Update exports
code = code.replace(
  'module.exports = {\n  buildEeeKeyTopicWorkbook,\n  KEY_TOPICS_DATA,\n};',
  'module.exports = {\n  buildEeeKeyTopicWorkbook,\n  mergeMasterWorkbook,\n  KEY_TOPICS_DATA,\n};',
);

const outTarget = path.join(__dirname, 'render_eee_master_workbook.cjs');
fs.writeFileSync(outTarget, code, 'utf8');
console.log(`🎉 Successfully generated ${outTarget} (${code.length} bytes)`);
