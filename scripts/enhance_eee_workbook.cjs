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
        'Mary I dies (17 Nov 1558); 25-year-old Elizabeth succeeds to the throne.',
        'Inherits Crown debt of £300,000 to Antwerp moneylenders.',
        'Appoints Sir William Cecil as Principal Secretary to direct royal policy.',
      ],
      focusClue:
        'Why did inherited debt and foreign loans create an immediate crisis for the new Queen?',
    },
    {
      dates: 'NOV–DEC 1558',
      title: 'Features of Elizabethan Government',
      bullets: [
        'The Court: personal household, noble advisers, and ceremonial displays of power.',
        'The Privy Council: 19 wealthy noblemen directing day-to-day royal government.',
        'System of Patronage: royal distribution of titles, land, offices, and monopolies.',
      ],
      focusClue:
        'How did Elizabeth use patronage and factional competition to secure political control?',
    },
    {
      dates: 'DEC 1558',
      title: 'Challenges of Gender & Legitimacy',
      bullets: [
        '16th-century Christian teaching on male authority and monarchs (queen regnant).',
        'Henry VIII & Anne Boleyn: marriage declared invalid by Pope Clement VII.',
        '1536 Second Succession Act: declared Elizabeth illegitimate after Anne’s execution.',
      ],
      focusClue:
        'Why did challenges to Elizabeth’s gender and legitimacy threaten domestic stability?',
    },
    {
      dates: 'JAN–MAY 1559',
      title: 'Parliament & Local Government',
      bullets: [
        'Parliament: House of Lords and Commons called for legislation and extraordinary taxation.',
        'Justices of the Peace (JPs): unpaid county gentry responsible for local law and order.',
        'Lord Lieutenants: wealthy nobles commanding the county militia and regional defenses.',
      ],
      focusClue:
        'Why was Elizabeth entirely dependent on unpaid local gentry to enforce royal authority?',
    },
    {
      dates: '1558–1560',
      title: 'Foreign Threats: France & Scotland',
      bullets: [
        '1558: England loses Calais to France during the reign of Mary I.',
        'The Auld Alliance: traditional military alliance between France and Scotland.',
        'Mary, Queen of Scots: married to French Dauphin Francis II; claims English crown.',
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
        'North and West: Catholic heartlands (Durham, Yorkshire, Lancashire, Wales).',
        'South-East and London: growing Protestant populations and returning Marian exiles.',
        'House of Lords: Catholic bishops appointed by Mary I opposing religious reform.',
      ],
      focusClue:
        'Why did England’s geographic and political divisions make a religious settlement essential?',
    },
    {
      dates: 'MAY 1559',
      title: 'The Act of Supremacy',
      bullets: [
        'Re-established English Church independence from the authority of the Pope in Rome.',
        'Elizabeth declared ‘Supreme Governor’ of the Church of England.',
        'Compulsory Oath of Supremacy for all clergy and royal officials.',
      ],
      focusClue: 'Why did Elizabeth choose the title ‘Supreme Governor’ instead of ‘Supreme Head’?',
    },
    {
      dates: 'MAY 1559',
      title: 'The Act of Uniformity',
      bullets: [
        '1559 Book of Common Prayer in English made compulsory in all parish churches.',
        'Communion wording: combines 1549 and 1552 Protestant and Catholic phrasing.',
        'Recusancy fine of one shilling (12d) per Sunday for failing to attend church.',
      ],
      focusClue:
        'How did the Act of Uniformity attempt to compromise between Catholic and Protestant worship?',
    },
    {
      dates: 'SUMMER 1559',
      title: 'The Royal Injunctions',
      bullets: [
        '57 royal instructions to clergy enforcing the Acts of Supremacy and Uniformity.',
        'Mandatory English Bible in each parish; pilgrimages and fake miracles banned.',
        'Vestments: clergy required to wear special vestments (surplice) during services.',
      ],
      focusClue:
        'How did the Royal Injunctions establish central royal control over local parish life?',
    },
    {
      dates: '1559–1560s',
      title: 'Enforcing the Settlement & Church Role',
      bullets: [
        'Royal Visitations: 125 commissioners inspect parishes; 400 clergy deprived of livings.',
        'Only one Catholic bishop out of fifteen takes the Oath of Supremacy.',
        'Church Courts: legal control over marriage, moral conduct, slander, and wills.',
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
        'Puritans (strict Protestants): Marian exiles influenced by Geneva and Calvinist teaching.',
        'Demanded removal of crucifixes, statues, altars, organs, and holy days from churches.',
        'Rejected bishops and argued congregations should choose their own ministers.',
      ],
      focusClue:
        'Why did Puritan religious demands pose a direct challenge to Elizabeth’s royal authority?',
    },
    {
      dates: '1566',
      title: 'The Crucifix & Vestments Controversy',
      bullets: [
        'Elizabeth orders crucifixes and candles retained in Royal Chapel and parish churches.',
        'Archbishop Matthew Parker issues Book of Advertisements (1566) enforcing clergy dress.',
        '37 London vicars refuse to wear the surplice and are dismissed from their posts.',
      ],
      focusClue:
        'Why did the dispute over clergy vestments become a major test of Elizabeth’s control?',
    },
    {
      dates: '1559–1568',
      title: 'The Catholic Challenge at Home',
      bullets: [
        'Church Papists: attended Church of England outwardly while practicing Catholic Mass at home.',
        'Recusants: Catholic gentry and nobility who paid fines rather than attend services.',
        '1566: Pope Pius V issues instruction forbidding English Catholics from attending services.',
      ],
      focusClue:
        'Why was Elizabeth able to tolerate moderate Catholic non-conformity during the early 1560s?',
    },
    {
      dates: '1562–1568',
      title: 'Foreign Threats: France & The Netherlands',
      bullets: [
        '1562: Outbreak of French Wars of Religion; 1564 Peace of Troyes ends Calais claims.',
        '1566: Dutch Protestant rebellion against Spanish Catholic rule in the Netherlands.',
        '1567: Philip II sends the Duke of Alba with 10,000 Spanish soldiers to Netherlands.',
      ],
      focusClue:
        'Why did the arrival of Alba’s Spanish army in the Netherlands alarm the English Privy Council?',
    },
    {
      dates: '1568–1569',
      title: 'Escalating Tensions: The Genoese Loan',
      bullets: [
        'Alba’s Council of Troubles: thousands of Dutch Protestants sentenced to death.',
        'Nov 1568: English privateers seize Spanish ships sheltering in English ports.',
        'Genoese Loan: £85,000 (400,000 florins) lent by Italian bankers seized by Elizabeth.',
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
        'Mary Stuart: great-granddaughter of Henry VII and Elizabeth’s second cousin.',
        '1560: French husband Francis II dies; Mary returns from France to rule Scotland.',
        '1565: Mary marries Catholic Lord Darnley, uniting rival Stuart claims to English throne.',
      ],
      focusClue:
        'Why did Mary Stuart’s royal ancestry and marriage choices threaten Elizabeth’s security?',
    },
    {
      dates: 'FEB 1567',
      title: 'The Murder of Lord Darnley',
      bullets: [
        'Feb 1567: Darnley’s house at Kirk o’ Field blown up; Darnley found strangled in garden.',
        'James Hepburn, Earl of Bothwell, widely suspected of organising the assassination.',
        'May 1567: Mary marries Bothwell following a Protestant ceremony at Holyrood.',
      ],
      focusClue:
        'Why did Darnley’s murder and Mary’s marriage to Bothwell ruin her authority in Scotland?',
    },
    {
      dates: '1567–1568',
      title: 'Abdication, Lochleven & Escape',
      bullets: [
        'June 1567: Scottish Protestant lords capture Mary and imprison her at Lochleven Castle.',
        'Forced to abdicate in favor of infant son King James VI, with Earl of Moray as regent.',
        'May 1568: Mary escapes Lochleven, defeated at Langside, and flees across Solway to England.',
      ],
      focusClue:
        'Why did Mary’s unexpected arrival in England present Elizabeth with an impossible dilemma?',
    },
    {
      dates: '1568–1569',
      title: 'The Inquiry at York & Casket Letters',
      bullets: [
        'Oct 1568–Jan 1569: Formal commission at York and Westminster investigates Darnley’s murder.',
        'Casket Letters: eight love letters and poems allegedly written by Mary to Bothwell.',
        'Commission delivers an official verdict of ‘not proven’, leaving Mary in royal custody.',
      ],
      focusClue:
        'Why did Elizabeth choose an inconclusive verdict rather than declaring Mary guilty or innocent?',
    },
    {
      dates: '1569',
      title: 'Mary’s Imprisonment in England',
      bullets: [
        'Mary moved south to Tutbury Castle under armed guard of Earl of Shrewsbury.',
        'Thomas Howard, Duke of Norfolk: secret plan to marry Mary with noble backing.',
        'Nov 1569: Earls of Northumberland and Westmorland summon northern tenants to rebellion.',
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
        'Earls of Northumberland and Westmorland lead 4,600 armed men in open rebellion.',
        'Rebels occupy Durham Cathedral, celebrate Latin Mass, and tear up English prayer books.',
        'Earl of Sussex marches north with 14,000 royal troops; earls flee to Scotland.',
      ],
      focusClue:
        'Why did the Northern Earls fail to overthrow Elizabeth despite capturing Durham Cathedral?',
    },
    {
      dates: '1570–1571',
      title: 'Papal Bull & The Ridolfi Plot',
      bullets: [
        'Feb 1570: Pope Pius V issues Papal Bull Regnans in Excelsis excommunicating Elizabeth.',
        'Roberto Ridolfi: Italian banker liaising between Duke of Norfolk, Philip II, and Mary Stuart.',
        'Plan: 10,000 Spanish troops under Alba land in England, marry Mary to Norfolk, and take throne.',
      ],
      focusClue:
        'How did the 1570 Papal Bull transform the legal and political danger facing English Catholics?',
    },
    {
      dates: '1583–1584',
      title: 'The Throckmorton Plot & Bond of Association',
      bullets: [
        'Francis Throckmorton: Catholic intermediary between French Duke of Guise, Philip II, and Mary.',
        'Sir Francis Walsingham uncovers plot through surveillance and interrogation in Tower.',
        '1584: Privy Council and Parliament draw up the Bond of Association.',
      ],
      focusClue:
        'Why did the discovery of the Throckmorton Plot lead to harsher anti-Catholic measures?',
    },
    {
      dates: '1586',
      title: 'The Babington Plot & Walsingham’s Spies',
      bullets: [
        'Anthony Babington: wealthy Catholic leading plot to assassinate Elizabeth with foreign backing.',
        'Letters hidden inside beer barrels smuggled into Mary’s residence at Chartley Manor.',
        'Thomas Phelippes: Walsingham’s codebreaker intercepts and deciphers all letters.',
      ],
      focusClue:
        'How did Walsingham use espionage and deciphered correspondence to trap Mary Stuart?',
    },
    {
      dates: 'FEB 1587',
      title: 'The Execution of Mary, Queen of Scots',
      bullets: [
        'Oct 1586: Mary tried at Fotheringhay Castle under the Act for the Queen’s Safety (1585).',
        'Parliament and Privy Council petition Elizabeth to sign the death warrant.',
        '8 Feb 1587: Mary executed in the Great Hall at Fotheringhay Castle.',
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
        'Philip II of Spain: leader of Catholic Counter-Reformation and ruler of vast global empire.',
        'Spanish Netherlands: English cloth export trade centered on Antwerp.',
        'Sea Beggars: Dutch rebel privateers granted temporary shelter in English ports.',
      ],
      focusClue: 'Why did Spanish control of the Netherlands threaten English trade and security?',
    },
    {
      dates: '1570–1579',
      title: 'Commercial Rivalry in the New World',
      bullets: [
        'Spanish trade monopoly: English merchants forbidden from trading with colonies without license.',
        'Privateering: English armed merchant ships raiding Spanish treasure fleets and ports.',
        '1572: Francis Drake raids Nombre de Dios on Isthmus of Panama, seizing £20,000 in silver.',
      ],
      focusClue:
        'Why did English privateering in the Caribbean inflame diplomatic tensions with Spain?',
    },
    {
      dates: '1577–1580',
      title: 'Drake’s Circumnavigation',
      bullets: [
        'Dec 1577: Drake departs Plymouth with five ships on Pelican (renamed Golden Hind).',
        'Captures Spanish treasure ship Cacafuego carrying 80lb of gold and 26 tons of silver.',
        'Returns to Plymouth in Sept 1580 with £140,000 in treasure, enriching royal finances.',
      ],
      focusClue:
        'Why did Drake’s circumnavigation represent a direct challenge to the Spanish Empire?',
    },
    {
      dates: '1581–1584',
      title: 'Escalation & Elizabeth’s Defiance',
      bullets: [
        'April 1581: Elizabeth publicly knights Drake on board the Golden Hind at Deptford.',
        '1580: Philip II annexes Portugal, gaining the Portuguese navy and Atlantic coastline.',
        '1584: Assassination of Dutch rebel leader William the Silent; death of Duke of Alençon.',
      ],
      focusClue:
        'How did events in Europe between 1580 and 1584 increase the threat of a Spanish invasion?',
    },
    {
      dates: '1584–1585',
      title: 'The Treaties of Joinville & Nonsuch',
      bullets: [
        'Dec 1584: Treaty of Joinville signed between Philip II and the French Catholic League.',
        'Aug 1585: Elizabeth signs Treaty of Nonsuch, sending 7,400 English troops to Netherlands.',
        'Oct 1585: Drake dispatched with 25 ships to attack Spanish ports in Vigo and Caribbean.',
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
        'Robert Dudley, Earl of Leicester, leads 7,400 English soldiers to the Netherlands.',
        'Dudley accepts title of ‘Governor-General’ of United Provinces without royal approval.',
        'Duke of Parma: highly skilled commander leading experienced Spanish Army of Flanders.',
      ],
      focusClue:
        'Why did Dudley’s campaign in the Netherlands struggle to achieve decisive military success?',
    },
    {
      dates: '1586–1587',
      title: 'Military Setbacks: Zutphen & Deventer',
      bullets: [
        'Sept 1586: Sir Philip Sidney fatally wounded at the Battle of Zutphen.',
        'Jan 1587: English commander Sir William Stanley surrenders town of Deventer to Spain.',
        'Late 1587: Dudley recalled to England after disputes with Dutch rebel leaders.',
      ],
      focusClue:
        'How did English betrayals and command disputes damage relations with the Dutch rebels?',
    },
    {
      dates: 'APRIL 1587',
      title: 'Drake’s Raid on Cadiz',
      bullets: [
        'April 1587: Elizabeth orders Drake to attack Spanish naval preparations.',
        'Drake sails directly into Cadiz harbor; sinks and burns over 30 Spanish ships.',
        'Raids coast of Portugal; captures treasure ship San Felipe carrying £108,000 in cargo.',
      ],
      focusClue:
        'How did Drake’s tactical boldness at Cadiz disrupt the Spanish invasion timetable?',
    },
    {
      dates: '1587–1588',
      title: 'Impact of the Cadiz Raid',
      bullets: [
        'Destruction of seasoned wooden barrel staves along the Portuguese coast.',
        'Marquis of Santa Cruz: Spain’s veteran naval admiral dies during invasion delays.',
        'Philip II appoints Duke of Medina Sidonia as new commander-in-chief of Armada.',
      ],
      focusClue:
        'Why were logistical damage and command changes fatal to the Spanish invasion plan?',
    },
    {
      dates: 'MAY–JULY 1588',
      title: 'The Armada Sets Sail',
      bullets: [
        'May 1588: Armada of 130 ships, 2,431 cannons, and 30,000 men departs Lisbon.',
        'Forced into port at Corunna for repairs following severe Atlantic storms.',
        'Invasion plan: sail up Channel, join Parma’s 27,000 troops, and cross to Kent.',
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
        '130 Spanish ships enter English Channel in a rigid defensive crescent formation.',
        'Lord Howard of Effingham and Drake shadow the Armada, firing at long range.',
        'Medina Sidonia attempts to secure safe deep-water anchorage off Isle of Wight.',
      ],
      focusClue:
        'Why were English ships unable to break the Armada’s crescent formation in open Channel water?',
    },
    {
      dates: '7–8 AUG 1588',
      title: 'Calais Roads & The Fireships',
      bullets: [
        '6 Aug: Armada anchors off Calais; Parma’s barges blockaded at Dunkirk by Dutch flyboats.',
        'Midnight, 7 Aug: English deploy eight blazing fireships packed with pitch and gunpowder.',
        'Spanish captains cut anchor cables and scatter into dark waters of North Sea.',
      ],
      focusClue:
        'Why did the English use of fireships at Calais prove the decisive turning point of the campaign?',
    },
    {
      dates: '8 AUG 1588',
      title: 'The Battle of Gravelines',
      bullets: [
        'English race-built galleons engage scattered Spanish ships at close range (100 meters).',
        'English culverins on compact naval trucks reload and fire multiple broadsides rapidly.',
        'Spanish heavy siege cannons mounted on two-wheeled land carriages reload slowly.',
      ],
      focusClue:
        'How did English ship design and gunnery tactics defeat Spanish warships at Gravelines?',
    },
    {
      dates: 'AUG–SEPT 1588',
      title: 'The Winds & Atlantic Retreat',
      bullets: [
        'Strong south-westerly gales drive battered Armada north past Scotland into Atlantic.',
        'Spanish ships lack anchors, fresh water, and food due to rotten unseasoned barrels.',
        'Over 40 Spanish ships wrecked along rocky coasts of Scotland and western Ireland.',
      ],
      focusClue:
        'Why did the combination of adverse weather and lost equipment destroy the retreating Armada?',
    },
    {
      dates: '1588–1589',
      title: 'Consequences of the English Victory',
      bullets: [
        'Only 67 of 130 Spanish ships return to Spain; thousands of Spanish sailors perish.',
        'Elizabeth delivers Tilbury speech; commemorative Armada portrait and medal commissioned.',
        'War with Spain continues for another 16 years until Treaty of London (1604).',
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
        'Education: fee-paying, private, and designed to reinforce the established social hierarchy.',
        'Literacy rates: approximately 15–20% of men and under 10% of women could read and write.',
        'Petty schools and dame schools taught basic reading, writing, and religion to younger children.',
      ],
      focusClue:
        'Why did Elizabethan attitudes towards social hierarchy limit educational opportunity?',
    },
    {
      dates: '1558–1580s',
      title: 'Grammar Schools',
      bullets: [
        'Over 70 new grammar schools established for boys aged 7–14 from middling classes.',
        'Curriculum: intensive study of Latin grammar, Greek, classical literature, and rhetoric.',
        '10-hour school days with strict discipline enforced by corporal punishment (birch rod).',
      ],
      focusClue:
        'How did grammar schools provide a route for sons of the gentry and merchants to rise in society?',
    },
    {
      dates: '1558–1580s',
      title: 'Universities & Noble Education',
      bullets: [
        'Oxford and Cambridge: curriculum centered on philosophy, rhetoric, law, and theology.',
        'Noble boys: private home tutors teaching French, Latin, fencing, horsemanship, and dancing.',
        'Noble girls: private home education in music, needlework, French, and estate management.',
      ],
      focusClue:
        'How did the education of the nobility differ from schooling provided to the middling classes?',
    },
    {
      dates: '1558–1580s',
      title: 'Sports and Pastimes by Social Class',
      bullets: [
        'Nobility and gentry: hunting, hawking, fencing, real tennis, and tournament jousting.',
        'Lower orders: folk football, archery, cudgel-fighting, wrestling, and tavern dice games.',
        'Blood sports enjoyed across all social classes: bear-baiting, bull-baiting, and cock-fighting.',
      ],
      focusClue:
        'How did leisure pursuits reflect both deep social divisions and shared national culture?',
    },
    {
      dates: '1576–1588',
      title: 'Development of the Theatre',
      bullets: [
        '1576: James Burbage builds ‘The Theatre’ outside the walls of the City of London.',
        'Purpose-built playhouses (The Curtain, The Rose, The Swan) built in Southwark and Shoreditch.',
        'Groundlings paid 1 penny to stand in open pit; wealthy patrons paid for roofed gallery seats.',
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
        'England’s population grew by 35%, from under 3 million in 1558 to over 4 million by 1603.',
        'Successive harvest failures in the 1570s and 1590s led to food shortages and grain price spikes.',
        'Inflation: food prices increased rapidly while wages for agricultural laborers fell.',
      ],
      focusClue:
        'How did the relationship between population growth and food supply generate severe poverty?',
    },
    {
      dates: '1558–1580s',
      title: 'Changes in Farming: Enclosure & Sheep',
      bullets: [
        'Enclosure: replacing open fields and common land with hedged fields for sheep farming.',
        'Cloth trade: raw wool and finished cloth accounted for over 80% of English export value.',
        'Sheep farming required significantly fewer farm hands than traditional arable crop farming.',
      ],
      focusClue:
        'Why did the expansion of sheep farming cause widespread rural unemployment and eviction?',
    },
    {
      dates: '1558–1570s',
      title: 'Changing Attitudes to the Poor',
      bullets: [
        'Impotent poor: elderly, sick, disabled, and orphans physically unable to work.',
        'Idle poor (sturdy beggars): able-bodied individuals viewed as dishonest and dangerous.',
        'Pamphlets like Thomas Harman’s Caveat for Common Cursitors warning of beggar tricksters.',
      ],
      focusClue:
        'Why did Elizabethan authorities draw such a sharp distinction between the ‘deserving’ and ‘idle’ poor?',
    },
    {
      dates: '1572',
      title: 'The 1572 Vagabonds Act',
      bullets: [
        'Compulsory poor rate: local property tax levied on parish households to fund poor relief.',
        'Overseers of the Poor: parish officials appointed to collect rates and distribute relief.',
        'Penalties for vagabonds: public whipping and a hole burned through right ear with a hot iron.',
      ],
      focusClue:
        'How did the 1572 Act combine harsh criminal punishment with the first compulsory tax for relief?',
    },
    {
      dates: '1576',
      title: 'The 1576 Act for Relief of the Poor',
      bullets: [
        'Towns required to provide stocks of raw materials (wool, hemp, flax, iron) for unemployed.',
        'Houses of Correction (Bridewells) built in counties to compel persistent vagrants to hard labor.',
        'Laid legislative foundation for the comprehensive Elizabethan Poor Law of 1601.',
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
        'Astrolabes and quadrants used by navigators to calculate latitude from sun and stars.',
        'Magnetic compasses, sea charts, and log-and-line used to estimate dead reckoning and speed.',
        '1569: Gerardus Mercator publishes world map projection with parallel lines of longitude and latitude.',
      ],
      focusClue:
        'How did advances in navigational science make oceanic exploration feasible for English captains?',
    },
    {
      dates: '1558–1577',
      title: 'Improvements in Ship Design',
      bullets: [
        'English ocean galleons: larger hull capacity, lower forecastles, and greater stability in rough seas.',
        'Sail design: combined traditional square sails for speed with triangular lateen sails for tacking.',
        'Naval armament: heavy culverin cannons mounted low down on compact four-wheeled carriages.',
      ],
      focusClue:
        'How did changes in galleon design and gun placement give English sailors an advantage at sea?',
    },
    {
      dates: '1550s–1570s',
      title: 'The Search for New Trade Routes',
      bullets: [
        'Collapse of traditional wool trade through Antwerp in the 1550s.',
        'Joint-stock companies: Muscovy Company (1555), Eastland Company (1579), Levant Company (1581).',
        'Search for a Northwest Passage to China led by Martin Frobisher and John Davis.',
      ],
      focusClue:
        'Why did English merchants establish joint-stock companies to explore new global trade routes?',
    },
    {
      dates: '1577–1580',
      title: 'Drake’s Circumnavigation',
      bullets: [
        'Dec 1577: Drake departs Plymouth aboard Pelican with 164 crew and five vessels.',
        'Navigates treacherous Strait of Magellan; lone surviving ship Golden Hind enters Pacific.',
        'Raids Spanish settlements along Peru and Chile; lands in California (Nova Albion); visits Ternate.',
      ],
      focusClue:
        'Why was Drake’s voyage through the Strait of Magellan and across the Pacific an extraordinary achievement?',
    },
    {
      dates: '1580–1588',
      title: 'Significance of Drake’s Voyage',
      bullets: [
        'Sept 1580: Drake returns to Plymouth with £140,000 in silver, gold, and spice cargo.',
        'April 1581: Elizabeth knights Drake on board Golden Hind in presence of French ambassadors.',
        'English navigational charts and firsthand logs open up Atlantic and Asian trade horizons.',
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
        'March 1584: Elizabeth grants courtier Sir Walter Raleigh a royal patent to colonise North America.',
        'Richard Hakluyt writes Discourse on Western Planting promoting colonial enterprise.',
        '1584: Arthur Barlowe and Philip Amadas lead reconnaissance expedition to Roanoke Island.',
      ],
      focusClue:
        'Why did Raleigh and the Elizabethan court believe an American colony was vital to England?',
    },
    {
      dates: '1584–1585',
      title: 'Recruiting Colonists & Leaders',
      bullets: [
        'Raleigh recruits 107 male colonists: mostly discharged soldiers, gentlemen, and mineral specialists.',
        'Sir Richard Grenville appointed fleet commander; Ralph Lane appointed colony governor.',
        'Thomas Harriot (mathematician/surveyor) and John White (artist) hired to document the region.',
      ],
      focusClue:
        'Why did the social composition and skills of the 1585 colonists create severe vulnerabilities?',
    },
    {
      dates: '1585–1586',
      title: 'The First Roanoke Colony & Disaster',
      bullets: [
        'June 1585: Flagship Tiger runs aground on sandbanks; seawater ruins seeds and grain supplies.',
        'Colonists arrive too late in the agricultural season to clear woodland and plant English crops.',
        'Secotan Native Americans: relations break down over food demands and allegations of theft.',
      ],
      focusClue:
        'How did environmental accidents and food dependency undermine the first Roanoke settlement?',
    },
    {
      dates: '1586',
      title: 'Conflict & Evacuation',
      bullets: [
        'Ralph Lane orders a preemptive armed attack on Secotan village, killing Chief Wingina.',
        'June 1586: Sir Francis Drake arrives off coast of Roanoke with a fleet returning from Caribbean.',
        'Colonists abandon the settlement and board Drake’s ships to return to England.',
      ],
      focusClue:
        'Why did armed conflict with the Secotan force the complete abandonment of the 1585 colony?',
    },
    {
      dates: '1587–1590',
      title: 'The ‘Lost Colony’ & Significance',
      bullets: [
        '1587: John White leads second expedition of 118 civilian settlers, including 17 women and children.',
        'White returns to England for emergency supplies; ships impounded due to 1588 Spanish Armada.',
        'Aug 1590: White returns to Roanoke to find settlement deserted and the word ‘CROATOAN’ carved.',
      ],
      focusClue:
        'What crucial lessons did the failure of the Roanoke expeditions provide for future English colonies?',
    },
  ],
};

// 2. QUESTION PROBABILITY TAGS
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
