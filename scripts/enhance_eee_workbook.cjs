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
const ENQUIRY_STAGES = {
  lesson_1_1: [
    {
      dates: '17 NOV 1558',
      title: 'Accession of Elizabeth I',
      bullets: [
        'Mary I dies; 25-year-old Elizabeth succeeds to the English throne',
        'Coronation takes place in January 1559 amid public celebration',
        'Inherits Crown debt of £300,000 to foreign moneylenders in Antwerp',
        'Appoints trusted adviser Sir William Cecil as Principal Secretary',
      ],
      focusClue: 'Why was the £300,000 Crown debt an immediate danger to Elizabeth?',
    },
    {
      dates: 'NOV–DEC 1558',
      title: 'Features of Elizabethan Government',
      bullets: [
        'The Court: noble advisers, servants, and displays of royal wealth',
        'The Privy Council: 19 noblemen leading day-to-day government policy',
        'Monarch rules by Divine Right and customary Royal Prerogative',
        'Patronage: Elizabeth grants land, offices, and titles to secure loyalty',
      ],
      focusClue: 'How did patronage ensure political loyalty across the country?',
    },
    {
      dates: 'DEC 1558',
      title: 'Challenges of Gender & Legitimacy',
      bullets: [
        'Christian traditions suggested women should follow men’s authority',
        'Widespread disapproval of a queen regnant ruling in her own right',
        'Catholics claimed Elizabeth was illegitimate as the Pope rejected her parents’ marriage',
        'Urgent pressure from Parliament and Privy Council for Elizabeth to marry',
      ],
      focusClue: 'Why did Catholics refuse to recognise Elizabeth as the legitimate queen?',
    },
    {
      dates: 'JAN–MAY 1559',
      title: 'Parliament & Local Government',
      bullets: [
        'Parliament meets to approve new laws and grant extraordinary taxation',
        'Justices of the Peace (JPs): unpaid gentry maintaining county law and order',
        'Lord Lieutenants: wealthy nobles in charge of county militia and defense',
        'Debasement of coinage since the 1540s fuels severe inflation and poverty',
      ],
      focusClue: 'Why was Elizabeth dependent on unpaid JPs to enforce her laws locally?',
    },
    {
      dates: '1558–1560',
      title: 'Foreign Threats: France & Scotland',
      bullets: [
        'Mary I loses Calais in 1558, ending English territory in France',
        'France allied with Scotland (Auld Alliance); French troops in Scotland',
        'Mary Queen of Scots married to French King Francis II; claims English crown',
        '1560: Treaty of Edinburgh secures withdrawal of French troops from Scotland',
      ],
      focusClue: 'Why was the French-Scottish alliance a major threat in 1558?',
    },
  ],

  lesson_1_2: [
    {
      dates: 'NOV 1558–JAN 1559',
      title: 'Religious Divisions in 1558',
      bullets: [
        'North and West of England remained largely Catholic (Durham, Yorkshire, Lancashire)',
        'London, Kent, and East Anglia had growing Protestant populations',
        'Marian exiles return from Europe demanding further reform (Puritans)',
        'Catholic bishops dominate the House of Lords and oppose religious change',
      ],
      focusClue: 'Why did deep religious divisions threaten rebellion in 1558?',
    },
    {
      dates: 'MAY 1559',
      title: 'The Act of Supremacy',
      bullets: [
        'Re-established the English Church’s independence from the Pope in Rome',
        'Elizabeth takes the title ‘Supreme Governor’, not ‘Supreme Head’',
        'Oath of Supremacy made compulsory for all clergy and royal officials',
        'Ecclesiastical High Commission established to enforce Church discipline',
      ],
      focusClue: 'Why did Elizabeth choose the title ‘Supreme Governor’ instead of ‘Supreme Head’?',
    },
    {
      dates: 'MAY 1559',
      title: 'The Act of Uniformity',
      bullets: [
        'Established the appearance of churches and conduct of religious services',
        'Introduced the 1559 Book of Common Prayer in English for all churches',
        'Communion service wording deliberately mixed Protestant and Catholic beliefs',
        'Recusancy fine of one shilling (12d) imposed for failing to attend church',
      ],
      focusClue: 'How did the 1559 Communion wording compromise between Catholics and Protestants?',
    },
    {
      dates: 'SUMMER 1559',
      title: 'The Royal Injunctions',
      bullets: [
        '57 instructions to the clergy to enforce the Acts of Supremacy and Uniformity',
        'Clergy required to preach royal supremacy and condemn the authority of the Pope',
        'Each parish church required to have an English Bible and report recusants',
        'Pilgrimages and fake miracles banned; clergy required to wear special vestments',
      ],
      focusClue: 'How did the Royal Injunctions enforce royal control over local parish churches?',
    },
    {
      dates: '1559–1560s',
      title: 'Enforcing the Settlement & Church Role',
      bullets: [
        'Visitations by 125 commissioners inspect parishes; 400 clergy deprived of livings',
        'Most parish clergy accepted the settlement; only one Catholic bishop took the Oath',
        'Church courts controlled community life: marriage, moral behavior, and wills',
        'Parish clergy provided guidance for communities and announced royal news',
      ],
      focusClue: 'Why did most ordinary parish clergy accept Elizabeth’s Religious Settlement?',
    },
  ],

  lesson_1_3: [
    {
      dates: '1559–1563',
      title: 'The Nature of the Puritan Challenge',
      bullets: [
        'Puritans wanted to purify the Church of England of all Catholic practices',
        'Demanded removal of crucifixes, statues, altars, and organ music from churches',
        'Wanted simpler worship and rejected the authority of bishops',
        '1563 Convocation debate narrowly fails to ban vestments and holy days',
      ],
      focusClue: 'Why did Puritans object so strongly to bishops and church decorations?',
    },
    {
      dates: '1566',
      title: 'The Crucifix & Vestments Controversy',
      bullets: [
        'Elizabeth keeps crucifix in the Royal Chapel; Puritan bishops threaten to resign',
        'Archbishop Matthew Parker issues Book of Advertisements enforcing clergy dress',
        '37 London vicars refuse to wear special vestments and lose their jobs',
        'Showed that Puritan clergy were willing to disobey the Queen on church matters',
      ],
      focusClue: 'Why did the vestments controversy demonstrate the strength of Puritan belief?',
    },
    {
      dates: '1559–1568',
      title: 'The Catholic Challenge at Home',
      bullets: [
        'Many English Catholics attended church outwardly while practicing privately',
        'Catholic gentry protected priests in country houses in the north',
        'Up to one-third of the nobility were recusants who paid fines rather than conform',
        '1566: The Pope instructs English Catholics not to attend Church of England services',
      ],
      focusClue: 'Why did Elizabeth treat early Catholic recusants with moderate fines?',
    },
    {
      dates: '1562–1568',
      title: 'Foreign Threats: France & The Netherlands',
      bullets: [
        '1562: French Wars of Religion begin; Elizabeth aids French Protestants',
        '1564: Peace of Troyes ends English claims to Calais permanently',
        '1566: Dutch Protestants rebel against Spanish Catholic rule in the Netherlands',
        '1567: Philip II sends the Duke of Alba with 10,000 Spanish soldiers to the Netherlands',
      ],
      focusClue: 'Why did the presence of Alba’s army in the Netherlands alarm Elizabeth?',
    },
    {
      dates: '1568–1569',
      title: 'Escalating Tensions: The Genoese Loan',
      bullets: [
        'Alba sets up the Council of Troubles, executing thousands of Dutch Protestants',
        'Dec 1568: Elizabeth seizes Spanish ships carrying 400,000 gold florins (Genoese Loan)',
        'Philip II seizes English merchant ships in Antwerp and bans English trade',
        'Deepened hostility between Catholic Spain and Protestant England',
      ],
      focusClue: 'How did the seizure of the Genoese Loan push England and Spain toward conflict?',
    },
  ],

  lesson_1_4: [
    {
      dates: '1560–1565',
      title: 'Mary’s Claim to the English Throne',
      bullets: [
        'Mary Stuart: great-granddaughter of Henry VII and Elizabeth’s second cousin',
        'Catholics view Mary as rightful Queen, believing Elizabeth was illegitimate',
        '1560: Husband King Francis II of France dies; Mary returns to rule Scotland',
        '1565: Mary marries Catholic Lord Darnley, strengthening her royal claim',
      ],
      focusClue: 'Why did English Catholics see Mary, Queen of Scots, as the rightful queen?',
    },
    {
      dates: 'FEB 1567',
      title: 'The Murder of Lord Darnley',
      bullets: [
        'Feb 1567: Darnley murdered in explosion at Kirk o’ Field house, Edinburgh',
        'The Earl of Bothwell widely suspected of arranging the murder',
        'May 1567: Mary marries Bothwell, outraging Scottish lords and public opinion',
        'Protestant Scottish lords rebel to protect baby Prince James from Bothwell',
      ],
      focusClue: 'Why did Mary’s marriage to Bothwell ruin her authority in Scotland?',
    },
    {
      dates: '1567–1568',
      title: 'Abdication, Lochleven & Escape',
      bullets: [
        'June 1567: Mary imprisoned at Lochleven Castle; forced to abdicate',
        'Baby son crowned King James VI of Scotland with Protestant regents',
        'May 1568: Mary escapes Lochleven, raises an army, but is defeated at Langside',
        'Mary flees in a fishing boat to Workington in England, asking Elizabeth for help',
      ],
      focusClue: 'Why did Mary’s arrival in England present Elizabeth with a dangerous dilemma?',
    },
    {
      dates: '1568–1569',
      title: 'The Inquiry at York & Casket Letters',
      bullets: [
        'Oct 1568: Inquiry meets at York to examine Darnley’s murder and Mary’s guilt',
        'Scottish Regent Moray shows ‘Casket Letters’ claiming Mary helped murder Darnley',
        'Elizabeth refuses to find Mary guilty (which would justify overthrowing a queen)',
        'Elizabeth refuses to declare Mary innocent (which would mean releasing her to take power)',
      ],
      focusClue: 'Why did Elizabeth refuse to give a clear verdict at the York Inquiry?',
    },
    {
      dates: '1569',
      title: 'Mary’s Imprisonment in England',
      bullets: [
        'Mary moved south to Tutbury Castle under armed guard by the Earl of Shrewsbury',
        'Mary becomes a focus for discontented English Catholics hoping to replace Elizabeth',
        'Duke of Norfolk plots to marry Mary without Elizabeth’s consent',
        'Mary’s presence leads directly to the Revolt of the Northern Earls in late 1569',
      ],
      focusClue: 'Why did Mary’s presence in England inevitably lead to Catholic plots?',
    },
  ],

  lesson_2_1: [
    {
      dates: 'NOV 1569–JAN 1570',
      title: 'The Revolt of the Northern Earls',
      bullets: [
        'Earls of Northumberland and Westmorland rebel to restore Catholic worship',
        'Rebels take Durham Cathedral, celebrate Catholic Mass, and march south',
        'Royal army of 14,000 under Earl of Sussex marches north; the earls flee to Scotland',
        'Elizabeth orders the execution of over 450 rebels to deter further uprisings',
      ],
      focusClue: 'Why did the Northern Earls fail to gain widespread support across England?',
    },
    {
      dates: '1570–1571',
      title: 'Papal Bull & The Ridolfi Plot',
      bullets: [
        'Feb 1570: Pope Pius V issues Papal Bull excommunicating Elizabeth from Church',
        '1571: Italian banker Roberto Ridolfi plans Spanish invasion and Norfolk-Mary marriage',
        'Philip II and Duke of Alba agree to send 10,000 troops; plot uncovered by William Cecil',
        'June 1572: Duke of Norfolk executed for treason; Ridolfi remains abroad',
      ],
      focusClue: 'How did the 1570 Papal Bull turn English Catholics into suspected traitors?',
    },
    {
      dates: '1583–1584',
      title: 'The Throckmorton Plot & Bond of Association',
      bullets: [
        'French Duke of Guise plots invasion to overthrow Elizabeth and free Mary Stuart',
        'Philip II offers financial help and the Pope approves the invasion plan',
        'Francis Throckmorton arrested by Walsingham; papers expose Spanish ambassador Mendoza',
        '1584: Privy Council drafts Bond of Association to execute anyone plotting against Elizabeth',
      ],
      focusClue: 'Why did the Throckmorton Plot lead to the expulsion of the Spanish ambassador?',
    },
    {
      dates: '1586',
      title: 'The Babington Plot & Walsingham’s Spies',
      bullets: [
        'Anthony Babington plots to assassinate Elizabeth with foreign Catholic backing',
        'Letters hidden inside beer barrels are smuggled to Mary at Chartley Manor',
        'Walsingham’s codebreaker Thomas Phelippes decodes letters showing Mary agreed to plot',
        'Babington and six conspirators executed for treason in September 1586',
      ],
      focusClue: 'How did Walsingham use codebreaking and informers to trap Mary?',
    },
    {
      dates: 'FEB 1587',
      title: 'The Execution of Mary, Queen of Scots',
      bullets: [
        'October 1586: Mary tried at Fotheringhay Castle under the Act for the Queen’s Safety',
        'Found guilty of treason; Parliament and Privy Council demand her immediate death',
        'Elizabeth hesitates for months, fearing the precedent of executing an anointed monarch',
        '8 Feb 1587: Mary executed at Fotheringhay; outrages Spain and Catholic Europe',
      ],
      focusClue: 'Why was Elizabeth so reluctant to sign Mary Queen of Scots’ death warrant?',
    },
  ],

  lesson_2_2: [
    {
      dates: '1570–1577',
      title: 'Political and Religious Rivalry with Spain',
      bullets: [
        'Philip II sees Protestant England as a threat to Catholic authority in Europe',
        'Elizabeth aids Dutch Protestant rebels with covert funds and safe ports for Sea Beggars',
        '1572: Elizabeth expels Sea Beggars; they capture Brill, sparking wider Dutch revolt',
        'English cloth trade through Antwerp disrupted, harming merchant livelihoods',
      ],
      focusClue:
        'Why did the Spanish presence in the Netherlands threaten English trade and security?',
    },
    {
      dates: '1570–1579',
      title: 'Commercial Rivalry in the New World',
      bullets: [
        'Spain claims monopoly over trade and wealth in the Americas',
        'English merchants denied trade licenses by Spanish authorities',
        'English sailors turn to illegal trade and attacking Spanish treasure fleets',
        '1572: Francis Drake raids Nombre de Dios in Panama, capturing £20,000 in silver',
      ],
      focusClue: 'Why did English privateering anger King Philip II of Spain?',
    },
    {
      dates: '1577–1580',
      title: 'Drake’s Circumnavigation',
      bullets: [
        'Drake sails Golden Hind into the Pacific; raids Spanish ports in Chile and Peru',
        'Captures treasure ship Cacafuego carrying 80lb of gold and 26 tons of silver',
        'Explores California (Nova Albion); trades for cloves with Sultan of Ternate',
        'Returns to Plymouth in Sept 1580 with £140,000 in treasure, enriching the Crown',
      ],
      focusClue: 'Why did Drake’s Pacific raid represent a direct challenge to the Spanish Empire?',
    },
    {
      dates: '1581–1584',
      title: 'Escalation & Elizabeth’s Defiance',
      bullets: [
        'April 1581: Elizabeth publicly knights Drake on the Golden Hind at Deptford',
        'Philip II furious that Elizabeth rewarded a man Spain viewed as a common pirate',
        '1580: Philip II inherits the crown of Portugal, gaining its navy and empire',
        '1584: French Duke of Alençon and Dutch rebel leader William the Silent both die',
      ],
      focusClue: 'Why did Elizabeth’s knighting of Drake make war with Spain more likely?',
    },
    {
      dates: '1584–1585',
      title: 'The Treaties of Joinville & Nonsuch',
      bullets: [
        'Dec 1584: Philip II signs Treaty of Joinville with French Catholics to fight Protestantism',
        'English government fears combined French and Spanish Catholic invasion',
        'Aug 1585: Elizabeth signs Treaty of Nonsuch, sending 7,400 English soldiers to Netherlands',
        'Oct 1585: Drake dispatched to raid Spanish ports in Vigo and the Caribbean',
      ],
      focusClue: 'How did the Treaty of Nonsuch mark the beginning of direct war with Spain?',
    },
  ],

  lesson_2_3: [
    {
      dates: 'DEC 1585–1586',
      title: 'Dudley’s Campaign in the Netherlands',
      bullets: [
        'Robert Dudley, Earl of Leicester, leads 7,400 English soldiers to the Netherlands',
        'Dudley accepts title of ‘Governor-General’ of Low Countries, angering Elizabeth',
        'English forces slow Duke of Parma’s advance but fail to take the deep-water port of Flushing',
        'Quarrels between English commanders and Dutch rebels hinder military cooperation',
      ],
      focusClue: 'Why did Dudley’s acceptance of the title ‘Governor-General’ anger Elizabeth?',
    },
    {
      dates: '1586–1587',
      title: 'Military Setbacks: Zutphen & Deventer',
      bullets: [
        'Sept 1586: Sir Philip Sidney killed at the Battle of Zutphen',
        'Jan 1587: English commander Sir William Stanley betrays town of Deventer to Spain',
        'Betrayals lead Dutch rebels to lose confidence in English leadership',
        'Dudley recalled to England in late 1587; English intervention prevented total Dutch defeat',
      ],
      focusClue:
        'Why did English military intervention in the Netherlands struggle to achieve success?',
    },
    {
      dates: 'APRIL 1587',
      title: 'Drake’s Raid on Cadiz',
      bullets: [
        'April 1587: Elizabeth orders Drake to disrupt Spanish Armada preparations',
        'Drake sails directly into Cadiz harbor; destroys 30 Spanish ships and tons of supplies',
        'Raids the coast of Portugal; destroys thousands of tons of seasoned wooden barrel staves',
        'Captures rich Portuguese treasure ship San Felipe on his return journey',
      ],
      focusClue: 'How did Drake’s raid on Cadiz delay the launch of the Spanish Armada?',
    },
    {
      dates: '1587–1588',
      title: 'Impact of the Cadiz Raid',
      bullets: [
        'Loss of seasoned wood forced Spaniards to use unseasoned wood for food and water barrels',
        'Fresh water and food spoiled quickly aboard the Armada, causing sickness and disease',
        'Armada delayed by over a year, giving England vital time to prepare coastal defenses',
        'Spain’s leading admiral Santa Cruz dies; replaced by Duke of Medina Sidonia',
      ],
      focusClue: 'Why was the destruction of wooden barrel staves fatal to the Armada?',
    },
    {
      dates: 'MAY–JULY 1588',
      title: 'The Armada Sets Sail',
      bullets: [
        'May 1588: Armada of 130 ships and 30,000 men departs Lisbon under Medina Sidonia',
        'Hit by storms; forced to stop at Corunna for repairs and supplies',
        'Warning beacons lit along the English coast as Armada sighted off the Lizard in July',
        'Plan: sail up Channel, join with Parma’s 27,000 soldiers, and invade England',
      ],
      focusClue: 'What were the main strengths and weaknesses of Philip II’s invasion plan?',
    },
  ],

  lesson_2_4: [
    {
      dates: 'JULY 1588',
      title: 'Channel Battles: Plymouth to Isle of Wight',
      bullets: [
        '130 Spanish ships advance up the English Channel in a tight defensive crescent',
        'English fleet under Howard and Drake pursues, firing from long range',
        'Medina Sidonia aims to anchor off Isle of Wight to await news from Parma',
        'English warships out-maneuver Spanish ships and prevent them finding safe anchorage',
      ],
      focusClue: 'Why did the Armada’s tight crescent formation make it difficult to attack?',
    },
    {
      dates: '7–8 AUG 1588',
      title: 'Calais Roads & The Fireships',
      bullets: [
        '6 August: Armada anchors off Calais; Parma’s army not ready due to Dutch blockade',
        'Midnight, 7 August: English send eight blazing fireships into crowded Spanish fleet',
        'Spanish captains panic, cut their anchor cables, and scatter into the North Sea',
        'Defensive crescent formation broken; ships drift toward shallow sandbanks',
      ],
      focusClue: 'Why was the use of fireships at Calais the decisive turning point?',
    },
    {
      dates: '8 AUG 1588',
      title: 'The Battle of Gravelines',
      bullets: [
        'English ships close to within 100 meters of scattered Spanish vessels',
        'English cannons mounted on small carriages fire rapidly into wooden hulls',
        'Spanish heavy cannons on unwieldy carriages cannot reload quickly',
        'Three Spanish ships sunk; over 1,000 Spaniards killed; fleet heavily damaged',
      ],
      focusClue: 'How did English ship design and gunnery win the Battle of Gravelines?',
    },
    {
      dates: 'AUG–SEPT 1588',
      title: 'The Winds & Atlantic Retreat',
      bullets: [
        'South-westerly winds blow battered Armada north into treacherous Scottish waters',
        'Lacking anchors and fresh water, Spanish ships attempt to sail around Scotland and Ireland',
        'Fierce storms wreck over 40 Spanish ships on the rocky coasts of Scotland and Ireland',
        'Only 67 of 130 ships return to Spain; thousands of Spanish sailors die',
      ],
      focusClue: 'Why did the loss of anchors and clean water lead to disaster in the Atlantic?',
    },
    {
      dates: '1588–1589',
      title: 'Consequences of the English Victory',
      bullets: [
        'Elizabeth celebrated as a great Protestant monarch; delivered speech at Tilbury',
        'Proved English naval strength could defend the country and challenge Spain',
        'Protestantism in England and the Netherlands survived Spanish invasion',
        'Philip II’s prestige damaged, though war with Spain continued for 16 years',
      ],
      focusClue: 'Why did the defeat of the Armada boost English national confidence?',
    },
  ],

  lesson_3_1: [
    {
      dates: '1558–1580s',
      title: 'Attitudes to Education & Literacy',
      bullets: [
        'Education was private, fee-paying, and aimed to prepare people for their place in life',
        'Estimated 15–20% of men and under 10% of women could read and write',
        'Petty schools and dame schools taught basic reading, writing, and arithmetic',
        'Most children from poorer families received no formal schooling, working from young age',
      ],
      focusClue: 'Why was formal education in Elizabethan England limited mainly to the rich?',
    },
    {
      dates: '1558–1580s',
      title: 'Grammar Schools',
      bullets: [
        'Over 70 new grammar schools founded across England by wealthy merchants and gentry',
        'Fee-paying schools for boys aged 7–14; bright boys from poorer families had scholarships',
        'Curriculum focused on Latin grammar, Greek, classical literature, and debate',
        'Strict 10-hour school days with harsh discipline and beatings with a birch rod',
      ],
      focusClue: 'How did grammar schools help boys from middling backgrounds rise in society?',
    },
    {
      dates: '1558–1580s',
      title: 'Universities & Noble Education',
      bullets: [
        'Only two universities: Oxford and Cambridge (studied Latin, rhetoric, law, theology)',
        'Noble boys educated at home by private tutors (learned French, Latin, fencing, dancing)',
        'Noble girls educated at home in music, French, needlework, and household management',
        'Growing numbers of gentry sons attended university and the Inns of Court in London',
      ],
      focusClue: 'How did the education of noble children differ from grammar school education?',
    },
    {
      dates: '1558–1580s',
      title: 'Sports and Pastimes by Social Class',
      bullets: [
        'Nobility enjoyed hunting, hawking, fencing, real tennis, and tournament jousting',
        'Ordinary people played folk football, archery, wrestling, bowls, and dice games',
        'Blood sports popular across all classes: bear-baiting, bull-baiting, and cock-fighting',
        'Seasonal feasts celebrated with May Day dancing, Midsummer bonfires, and Christmas games',
      ],
      focusClue: 'Why were blood sports such as bear-baiting popular with all social classes?',
    },
    {
      dates: '1576–1588',
      title: 'Development of the Theatre',
      bullets: [
        'Actors originally performed in inn-yards; viewed with suspicion as vagrants',
        '1576: James Burbage builds London’s first purpose-built playhouse, ‘The Theatre’',
        'Followed by the Curtain, the Rose, and the Swan, built outside City walls in Southwark',
        'All classes attended: groundlings paid 1 penny to stand in the pit; rich paid for galleries',
      ],
      focusClue: 'Why were purpose-built theatres built outside the walls of the City of London?',
    },
  ],

  lesson_3_2: [
    {
      dates: '1558–1580s',
      title: 'Population Growth & Rising Prices',
      bullets: [
        'England’s population increased by 35%, from under 3 million in 1558 to over 4 million by 1603',
        'Food production could not keep pace; bad harvests led to grain shortages and famine',
        'Inflation drove up food and bread prices while wages stayed low or fell',
        'Dissolution of monasteries under Henry VIII had removed traditional church charity',
      ],
      focusClue: 'Why did population growth cause widespread poverty in Elizabethan England?',
    },
    {
      dates: '1558–1580s',
      title: 'Changes in Farming: Enclosure & Sheep',
      bullets: [
        'Open fields replaced by enclosing land with hedges and fences for sheep farming',
        'Wool and cloth trade was very profitable for landowners and gentry',
        'Sheep farming required far fewer laborers than crop farming, causing rural evictions',
        'Unemployed farm workers forced to leave villages to look for work in towns',
      ],
      focusClue: 'Why did the growth of sheep farming increase unemployment in the countryside?',
    },
    {
      dates: '1558–1570s',
      title: 'Changing Attitudes to the Poor',
      bullets: [
        'Elizabethan society divided the poor into two distinct groups',
        'Impotent poor (deserving): elderly, sick, orphans, and disabled who could not work',
        'Idle poor (sturdy beggars): able-bodied people seen as lazy, dishonest, and criminal',
        'Fear of vagabonds: pamphlets warned of tricksters like Counterfeit Cranks and Clapper Dudgeons',
      ],
      focusClue:
        'Why did the Elizabethan government distinguish between the impotent and idle poor?',
    },
    {
      dates: '1572',
      title: 'The 1572 Vagabonds Act',
      bullets: [
        'Introduced a compulsory local poor rate tax on all parish property owners',
        'Parish officials (Overseers of the Poor) collected the rate to help the impotent poor',
        'Harsh penalties for sturdy beggars: whipped and a hole burned through the right ear',
        'A third vagrancy offense was punished by death as a convicted felon',
      ],
      focusClue: 'Why was the introduction of a compulsory poor rate in 1572 a major change?',
    },
    {
      dates: '1576',
      title: 'The 1576 Act for Relief of the Poor',
      bullets: [
        'Recognized that some able-bodied people were unemployed through no fault of their own',
        'Towns required to provide raw materials (wool, hemp, flax) so the poor could work',
        'Established Houses of Correction where persistent vagrants were forced to do hard labor',
        'Created a national system of poor relief that lasted for over two centuries',
      ],
      focusClue: 'How did the 1576 Act move from simply punishing beggars to providing work?',
    },
  ],

  lesson_3_3: [
    {
      dates: '1558–1575',
      title: 'New Navigational Technology',
      bullets: [
        'Astrolabes and quadrants allowed sailors to calculate latitude using the sun and stars',
        'Calculating latitude enabled captains to navigate accurately across open oceans',
        'Magnetic compasses, navigation charts, and log-and-line lines helped calculate position and speed',
        '1569: Gerardus Mercator creates the Mercator map projection with parallel grid lines',
      ],
      focusClue: 'How did navigational instruments make ocean voyages safer and more accurate?',
    },
    {
      dates: '1558–1577',
      title: 'Improvements in Ship Design',
      bullets: [
        'English shipbuilders developed larger, ocean-going galleons',
        'Combined traditional square sails (for speed) with lateen sails (for sailing into the wind)',
        'Larger cargo holds allowed ships to carry sufficient food, fresh water, and guns for long voyages',
        'Armed with long-range cannons on compact four-wheeled carriages',
      ],
      focusClue:
        'How did changes in ship design allow English sailors to undertake long ocean voyages?',
    },
    {
      dates: '1550s–1570s',
      title: 'The Search for New Trade Routes',
      bullets: [
        'Collapse of Antwerp cloth trade in 1550s damaged England’s wool export trade',
        'English merchants formed joint-stock companies to finance new trading voyages',
        'Muscovy Company (1555) traded with Russia; Eastland Company (1579) traded in the Baltic',
        'Sailors searched for a Northwest Passage to China and direct routes to Asian spice markets',
      ],
      focusClue: 'Why did English merchants seek new trade routes to Asia and the Americas?',
    },
    {
      dates: '1577–1580',
      title: 'Drake’s Circumnavigation',
      bullets: [
        'Dec 1577: Drake leaves Plymouth with five ships on the Pelican (renamed Golden Hind)',
        'Sails through the dangerous Strait of Magellan into the Pacific Ocean',
        'Raids Spanish ports along coasts of Chile and Peru; captures treasure ship Cacafuego',
        'Explores north to California (Nova Albion); crosses the Pacific to trade for cloves in Ternate',
      ],
      focusClue:
        'Why was Drake’s navigation of the Strait of Magellan considered a remarkable feat?',
    },
    {
      dates: '1580–1588',
      title: 'Significance of Drake’s Voyage',
      bullets: [
        'Sept 1580: Drake returns to Plymouth with £140,000 in silver and jewels',
        'Elizabeth knights Drake on board his ship at Deptford in April 1581',
        'Proved English ships could sail anywhere in the world and challenge Spanish dominance',
        'Inspired further English voyages of discovery and plans for colonisation in North America',
      ],
      focusClue: 'Why was Drake’s circumnavigation a turning point for English exploration?',
    },
  ],

  lesson_3_4: [
    {
      dates: '1584',
      title: 'Raleigh’s Patent & Planning',
      bullets: [
        'Elizabeth grants courtier Sir Walter Raleigh a patent to explore and colonise North America',
        'Raleigh raises money and uses Richard Hakluyt’s pamphlet to promote the enterprise',
        'Aims: establish a base to raid Spanish treasure ships, find minerals, and open trade markets',
        '1584: Reconnaissance voyage under Arthur Barlowe and Philip Amadas reaches Roanoke Island',
      ],
      focusClue: 'Why did Raleigh believe a colony in North America would benefit England?',
    },
    {
      dates: '1584–1585',
      title: 'Recruiting Colonists & Leaders',
      bullets: [
        'Barlowe brings two Native Americans, Manteo and Wanchese, back to London to advise',
        'Raleigh recruits 107 colonists: mostly soldiers, gentlemen, and mineral specialists',
        'Richard Grenville appointed naval commander; Ralph Lane appointed governor of colony',
        'Few colonists were farmers, and many gentlemen refused to do physical manual labor',
      ],
      focusClue: 'Why did the types of people recruited for the 1585 colony create problems?',
    },
    {
      dates: '1585–1586',
      title: 'The First Roanoke Colony & Disaster',
      bullets: [
        'June 1585: Fleet arrives off Roanoke; flagship Tiger runs aground on a sandbar',
        'Seawater destroys the colonists’ grain seeds and food supplies',
        'Colonists arrive too late in the year to plant crops; dependent on Native Americans for food',
        'Lane accuses native Secotan villagers of stealing a silver cup and burns their village',
      ],
      focusClue: 'How did the grounding of the Tiger threaten the survival of the colony?',
    },
    {
      dates: '1586',
      title: 'Conflict & Evacuation',
      bullets: [
        'Relations with the Secotan deteriorate; Lane attacks and kills Chief Wingina',
        'Colonists face starvation and hostile Native American attacks',
        'June 1586: Sir Francis Drake arrives off Roanoke after raiding Spanish ports',
        'Colonists decide to abandon Roanoke and return to England with Drake’s fleet',
      ],
      focusClue: 'Why did the first colony at Roanoke collapse and return to England?',
    },
    {
      dates: '1587–1590',
      title: 'The ‘Lost Colony’ & Significance',
      bullets: [
        '1587: John White leads 118 civilian settlers, including 17 women and children, to Roanoke',
        'Virginia Dare born: the first English child born in North America',
        'White returns to England for supplies; delayed for three years by the Spanish Armada',
        'White returns in 1590 to find colony deserted, with only the word ‘CROATOAN’ carved on a post',
      ],
      focusClue:
        'What lessons did the failure of the Roanoke colonies provide for future settlements?',
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
