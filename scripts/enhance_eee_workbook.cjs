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
        'Mary I dies; 25-year-old Elizabeth succeeds to the English throne amid celebration.',
        'Inherits severe Crown debt of £300,000 to Antwerp moneylenders.',
        'Appoints William Cecil as trusted Principal Secretary to direct royal policy.',
      ],
      focusClue: 'Why was the £300,000 Crown debt an immediate danger to Elizabeth?',
    },
    {
      dates: 'NOV–DEC 1558',
      title: 'Features of Elizabethan Government',
      bullets: [
        'The Court: noble advisers, servants, and displays of royal wealth.',
        'The Privy Council: 19 noblemen leading day-to-day government policy.',
        'Patronage: Elizabeth grants land, titles, and offices to secure political loyalty.',
      ],
      focusClue: 'How did patronage ensure political loyalty across the country?',
    },
    {
      dates: 'DEC 1558',
      title: 'Challenges of Gender & Legitimacy',
      bullets: [
        'Widespread belief that a queen regnant could not rule effectively without a husband.',
        'Catholics claimed Elizabeth was illegitimate as the Pope rejected her parents’ marriage.',
      ],
      focusClue: 'Why did Catholics refuse to recognise Elizabeth as the legitimate queen?',
    },
    {
      dates: 'JAN–MAY 1559',
      title: 'Parliament & Local Government',
      bullets: [
        'Parliament called only to approve new laws and grant extraordinary taxation.',
        'Justices of the Peace (JPs): unpaid gentry maintaining county law and order.',
        'Lord Lieutenants: wealthy nobles in charge of county militia and defense.',
      ],
      focusClue: 'Why was Elizabeth dependent on unpaid JPs to enforce her laws locally?',
    },
    {
      dates: '1558–1560',
      title: 'Foreign Threats: France & Scotland',
      bullets: [
        'Mary I loses Calais in 1558, ending English territory in France.',
        'Auld Alliance: French troops stationed in Scotland threatening northern border.',
        'Mary Queen of Scots declares herself rightful Catholic Queen of England.',
      ],
      focusClue: 'Why was the French-Scottish alliance a major threat in 1558?',
    },
  ],

  lesson_1_2: [
    {
      dates: 'NOV 1558–JAN 1559',
      title: 'Religious Divisions in 1558',
      bullets: [
        'North and West of England remained largely Catholic (Durham, Yorkshire, Lancashire).',
        'London, East Anglia, and south had growing Protestant populations.',
        'Catholic bishops dominate the House of Lords and oppose religious change.',
      ],
      focusClue: 'Why did deep religious divisions threaten rebellion in 1558?',
    },
    {
      dates: 'MAY 1559',
      title: 'The Act of Supremacy',
      bullets: [
        'Re-established English Church independence from the Pope in Rome.',
        'Elizabeth takes title ‘Supreme Governor’, not ‘Supreme Head’.',
        'Oath of Supremacy made compulsory for all clergy and royal officials.',
      ],
      focusClue: 'Why did Elizabeth choose the title ‘Supreme Governor’ instead of ‘Supreme Head’?',
    },
    {
      dates: 'MAY 1559',
      title: 'The Act of Uniformity',
      bullets: [
        'Introduced the 1559 Book of Common Prayer in English for all churches.',
        'Communion wording deliberately mixed Protestant and Catholic beliefs.',
        'Recusancy fine of one shilling (12d) imposed for failing to attend church.',
      ],
      focusClue: 'How did the 1559 Communion wording compromise between Catholics and Protestants?',
    },
    {
      dates: 'SUMMER 1559',
      title: 'The Royal Injunctions',
      bullets: [
        '57 instructions to clergy enforcing the Acts of Supremacy and Uniformity.',
        'Each parish required to have an English Bible and report recusants.',
        'Pilgrimages and fake miracles banned; clergy required to wear special vestments.',
      ],
      focusClue: 'How did the Royal Injunctions enforce royal control over local parish churches?',
    },
    {
      dates: '1559–1560s',
      title: 'Enforcing the Settlement & Church Role',
      bullets: [
        'Visitations by 125 commissioners inspect parishes; 400 clergy deprived of livings.',
        'Most parish clergy accepted the settlement; only one Catholic bishop took the Oath.',
        'Church courts controlled community life: marriage, moral behavior, and wills.',
      ],
      focusClue: 'Why did most ordinary parish clergy accept Elizabeth’s Religious Settlement?',
    },
  ],

  lesson_1_3: [
    {
      dates: '1559–1563',
      title: 'The Nature of the Puritan Challenge',
      bullets: [
        'Puritans wanted to purify the Church of England of all Catholic practices.',
        'Demanded removal of crucifixes, statues, altars, and organ music from churches.',
        'Wanted simpler worship and rejected the authority of bishops.',
      ],
      focusClue: 'Why did Puritans object so strongly to bishops and church decorations?',
    },
    {
      dates: '1566',
      title: 'The Crucifix & Vestments Controversy',
      bullets: [
        'Elizabeth keeps crucifix in the Royal Chapel; Puritan bishops threaten to resign.',
        'Archbishop Parker’s Book of Advertisements enforces clergy dress.',
        '37 London vicars refuse to wear special vestments and lose their jobs.',
      ],
      focusClue: 'Why did the vestments controversy demonstrate the strength of Puritan belief?',
    },
    {
      dates: '1559–1568',
      title: 'The Catholic Challenge at Home',
      bullets: [
        'Many English Catholics conformed outwardly while attending secret Mass.',
        'Up to one-third of the nobility were recusants who paid fines rather than conform.',
        '1566: The Pope instructs English Catholics not to attend Church of England services.',
      ],
      focusClue: 'Why did Elizabeth treat early Catholic recusants with moderate fines?',
    },
    {
      dates: '1562–1568',
      title: 'Foreign Threats: France & The Netherlands',
      bullets: [
        '1562: French Wars of Religion begin; 1564 Peace of Troyes ends Calais claims.',
        '1566: Dutch Protestants rebel against Spanish Catholic rule in Netherlands.',
        '1567: Philip II sends Duke of Alba with 10,000 Spanish troops to Netherlands.',
      ],
      focusClue: 'Why did the presence of Alba’s army in the Netherlands alarm Elizabeth?',
    },
    {
      dates: '1568–1569',
      title: 'Escalating Tensions: The Genoese Loan',
      bullets: [
        'Alba sets up Council of Troubles, executing thousands of Dutch Protestants.',
        'Dec 1568: Elizabeth seizes Spanish ships carrying 400,000 gold florins (Genoese Loan).',
        'Philip II seizes English merchant ships in Antwerp and bans English trade.',
      ],
      focusClue: 'How did the seizure of the Genoese Loan push England and Spain toward conflict?',
    },
  ],

  lesson_1_4: [
    {
      dates: '1560–1565',
      title: 'Mary’s Claim to the English Throne',
      bullets: [
        'Mary Stuart: great-granddaughter of Henry VII and Elizabeth’s second cousin.',
        'English Catholics view Mary as rightful Queen, claiming Elizabeth is illegitimate.',
        '1565: Mary marries Catholic Lord Darnley, strengthening her royal claim.',
      ],
      focusClue: 'Why did English Catholics see Mary, Queen of Scots, as the rightful queen?',
    },
    {
      dates: 'FEB 1567',
      title: 'The Murder of Lord Darnley',
      bullets: [
        'Feb 1567: Darnley murdered in an explosion at Kirk o’ Field, Edinburgh.',
        'Earl of Bothwell widely suspected of orchestrating the murder.',
        'May 1567: Mary marries Bothwell, outraging Scottish lords and public opinion.',
      ],
      focusClue: 'Why did Mary’s marriage to Bothwell ruin her authority in Scotland?',
    },
    {
      dates: '1567–1568',
      title: 'Abdication, Lochleven & Escape',
      bullets: [
        'June 1567: Mary imprisoned at Lochleven Castle; forced to abdicate.',
        'May 1568: Mary escapes Lochleven, defeated at Langside, and flees to England.',
        'Mary arrives at Workington in a fishing boat, begging Elizabeth for help.',
      ],
      focusClue: 'Why did Mary’s arrival in England present Elizabeth with a dangerous dilemma?',
    },
    {
      dates: '1568–1569',
      title: 'The Inquiry at York & Casket Letters',
      bullets: [
        'Oct 1568: Inquiry meets at York to examine Darnley’s murder and Mary’s guilt.',
        'Scottish Regent Moray produces ‘Casket Letters’ blaming Mary for the murder.',
        'Elizabeth refuses to give a verdict to avoid condemning or releasing a queen.',
      ],
      focusClue: 'Why did Elizabeth refuse to give a clear verdict at the York Inquiry?',
    },
    {
      dates: '1569',
      title: 'Mary’s Imprisonment in England',
      bullets: [
        'Mary moved south to Tutbury Castle under armed guard by Earl of Shrewsbury.',
        'Becomes a dangerous figurehead for Catholic plots to replace Elizabeth.',
        'Leads directly to the armed Revolt of the Northern Earls in late 1569.',
      ],
      focusClue: 'Why did Mary’s presence in England inevitably lead to Catholic plots?',
    },
  ],

  lesson_2_1: [
    {
      dates: 'NOV 1569–JAN 1570',
      title: 'The Revolt of the Northern Earls',
      bullets: [
        'Earls of Northumberland and Westmorland rebel to restore Catholic worship.',
        'Rebels capture Durham Cathedral and celebrate Mass, but fail to rally the south.',
        'Royal army marches north; earls flee to Scotland; 450 rebels executed.',
      ],
      focusClue: 'Why did the Northern Earls fail to gain widespread support across England?',
    },
    {
      dates: '1570–1571',
      title: 'Papal Bull & The Ridolfi Plot',
      bullets: [
        'Feb 1570: Pope Pius V issues Papal Bull excommunicating Elizabeth from Church.',
        '1571: Roberto Ridolfi plans Spanish invasion and Norfolk-Mary marriage.',
        'Cecil uncovers the conspiracy; Duke of Norfolk executed for treason in 1572.',
      ],
      focusClue: 'How did the 1570 Papal Bull turn English Catholics into suspected traitors?',
    },
    {
      dates: '1583–1584',
      title: 'The Throckmorton Plot & Bond of Association',
      bullets: [
        'French Duke of Guise plots invasion to overthrow Elizabeth and free Mary.',
        'Walsingham arrests Francis Throckmorton; expels Spanish ambassador Mendoza.',
        '1584: Privy Council drafts Bond of Association to execute any plotters.',
      ],
      focusClue: 'Why did the Throckmorton Plot lead to the expulsion of the Spanish ambassador?',
    },
    {
      dates: '1586',
      title: 'The Babington Plot & Walsingham’s Spies',
      bullets: [
        'Anthony Babington plots to assassinate Elizabeth with foreign Catholic backing.',
        'Letters hidden inside beer barrels smuggled to Mary at Chartley Manor.',
        'Codebreaker Phelippes decodes letters proving Mary approved the assassination.',
      ],
      focusClue: 'How did Walsingham use codebreaking and informers to trap Mary?',
    },
    {
      dates: 'FEB 1587',
      title: 'The Execution of Mary, Queen of Scots',
      bullets: [
        'October 1586: Mary tried at Fotheringhay Castle and sentenced to death.',
        'Elizabeth hesitates for months, fearing the precedent of executing a monarch.',
        '8 Feb 1587: Mary executed at Fotheringhay; outrages Catholic Europe and Spain.',
      ],
      focusClue: 'Why was Elizabeth so reluctant to sign Mary Queen of Scots’ death warrant?',
    },
  ],

  lesson_2_2: [
    {
      dates: '1570–1577',
      title: 'Political and Religious Rivalry with Spain',
      bullets: [
        'Philip II sees Protestant England as a threat to Catholic authority in Europe.',
        'Elizabeth aids Dutch Protestant rebels with covert funds and ports for Sea Beggars.',
        'English cloth trade through Antwerp disrupted, harming merchant livelihoods.',
      ],
      focusClue:
        'Why did the Spanish presence in the Netherlands threaten English trade and security?',
    },
    {
      dates: '1570–1579',
      title: 'Commercial Rivalry in the New World',
      bullets: [
        'Spain claims monopoly over trade and wealth in the Americas.',
        'English merchants denied trade licenses; turn to smuggling and privateering.',
        '1572: Drake raids Nombre de Dios in Panama, capturing £20,000 in silver.',
      ],
      focusClue: 'Why did English privateering anger King Philip II of Spain?',
    },
    {
      dates: '1577–1580',
      title: 'Drake’s Circumnavigation',
      bullets: [
        'Drake sails Golden Hind into Pacific; raids Spanish ports in Chile and Peru.',
        'Captures treasure ship Cacafuego carrying 80lb of gold and 26 tons of silver.',
        'Returns to Plymouth in 1580 with £140,000 in treasure, enriching the Crown.',
      ],
      focusClue: 'Why did Drake’s Pacific raid represent a direct challenge to the Spanish Empire?',
    },
    {
      dates: '1581–1584',
      title: 'Escalation & Elizabeth’s Defiance',
      bullets: [
        'April 1581: Elizabeth publicly knights Drake on the Golden Hind at Deptford.',
        'Philip II furious that Elizabeth rewarded a man Spain viewed as a pirate.',
        '1580: Philip II inherits Portuguese crown, navy, and empire, expanding Spanish power.',
      ],
      focusClue: 'Why did Elizabeth’s knighting of Drake make war with Spain more likely?',
    },
    {
      dates: '1584–1585',
      title: 'The Treaties of Joinville & Nonsuch',
      bullets: [
        'Dec 1584: Philip II signs Treaty of Joinville with French Catholics.',
        'Aug 1585: Elizabeth signs Treaty of Nonsuch, sending 7,400 troops to Netherlands.',
        'Marks the formal outbreak of direct, open war between England and Spain.',
      ],
      focusClue: 'How did the Treaty of Nonsuch mark the beginning of direct war with Spain?',
    },
  ],

  lesson_2_3: [
    {
      dates: 'DEC 1585–1586',
      title: 'Dudley’s Campaign in the Netherlands',
      bullets: [
        'Robert Dudley, Earl of Leicester, leads 7,400 English soldiers to the Netherlands.',
        'Dudley accepts title of ‘Governor-General’, angering Elizabeth by implying sovereignty.',
        'English forces slow Duke of Parma’s advance but fail to take deep-water ports.',
      ],
      focusClue: 'Why did Dudley’s acceptance of the title ‘Governor-General’ anger Elizabeth?',
    },
    {
      dates: '1586–1587',
      title: 'Military Setbacks: Zutphen & Deventer',
      bullets: [
        'Sept 1586: Sir Philip Sidney killed fighting at the Battle of Zutphen.',
        'Jan 1587: English commander Sir William Stanley betrays town of Deventer to Spain.',
        'Dudley recalled to England in late 1587; prevented total Dutch defeat.',
      ],
      focusClue:
        'Why did English military intervention in the Netherlands struggle to achieve success?',
    },
    {
      dates: 'APRIL 1587',
      title: 'Drake’s Raid on Cadiz',
      bullets: [
        'April 1587: Elizabeth orders Drake to disrupt Spanish Armada preparations.',
        'Drake sails into Cadiz harbor; destroys 30 Spanish ships and massive supplies.',
        'Destroys thousands of tons of seasoned wooden barrel staves along Portuguese coast.',
      ],
      focusClue: 'How did Drake’s raid on Cadiz delay the launch of the Spanish Armada?',
    },
    {
      dates: '1587–1588',
      title: 'Impact of the Cadiz Raid',
      bullets: [
        'Spaniards forced to use unseasoned wood; food and water barrels spoiled rapidly.',
        'Armada delayed by over a year, giving England vital time to prepare defenses.',
        'Spain’s leading admiral Santa Cruz dies; replaced by Duke of Medina Sidonia.',
      ],
      focusClue: 'Why was the destruction of wooden barrel staves fatal to the Armada?',
    },
    {
      dates: 'MAY–JULY 1588',
      title: 'The Armada Sets Sail',
      bullets: [
        'May 1588: Armada of 130 ships and 30,000 men departs Lisbon under Medina Sidonia.',
        'Hit by storms; forced to stop at Corunna for repairs and supplies.',
        'Plan: sail up Channel, join with Parma’s 27,000 soldiers, and invade England.',
      ],
      focusClue: 'What were the main strengths and weaknesses of Philip II’s invasion plan?',
    },
  ],

  lesson_2_4: [
    {
      dates: 'JULY 1588',
      title: 'Channel Battles: Plymouth to Isle of Wight',
      bullets: [
        '130 Spanish ships advance up the Channel in a tight defensive crescent.',
        'English fleet under Howard and Drake pursues, firing from long range.',
        'English warships prevent the Armada from finding safe anchorage off Isle of Wight.',
      ],
      focusClue: 'Why did the Armada’s tight crescent formation make it difficult to attack?',
    },
    {
      dates: '7–8 AUG 1588',
      title: 'Calais Roads & The Fireships',
      bullets: [
        '6 August: Armada anchors off Calais; Parma’s army not ready due to Dutch blockade.',
        'Midnight, 7 August: English send eight blazing fireships into crowded Spanish fleet.',
        'Spanish captains panic, cut anchor cables, and scatter into the North Sea.',
      ],
      focusClue: 'Why was the use of fireships at Calais the decisive turning point?',
    },
    {
      dates: '8 AUG 1588',
      title: 'The Battle of Gravelines',
      bullets: [
        'English ships close in and fire rapidly with cannons mounted on small carriages.',
        'Spanish heavy cannons on bulky carriages cannot reload quickly during battle.',
        'Three Spanish ships sunk; over 1,000 Spaniards killed; crescent formation broken.',
      ],
      focusClue: 'How did English ship design and gunnery win the Battle of Gravelines?',
    },
    {
      dates: 'AUG–SEPT 1588',
      title: 'The Winds & Atlantic Retreat',
      bullets: [
        'Fierce south-westerly winds blow battered Armada north around Scotland and Ireland.',
        'Lacking anchors and fresh water, over 40 Spanish ships wrecked on rocky coasts.',
        'Only 67 of 130 ships return to Spain; thousands of Spanish sailors drown or starve.',
      ],
      focusClue: 'Why did the loss of anchors and clean water lead to disaster in the Atlantic?',
    },
    {
      dates: '1588–1589',
      title: 'Consequences of the English Victory',
      bullets: [
        'Elizabeth celebrated as a great Protestant monarch; delivered speech at Tilbury.',
        'Proved English naval strength could defend the realm and challenge Spain.',
        'Protestantism in England and Netherlands survived; war with Spain continued.',
      ],
      focusClue: 'Why did the defeat of the Armada boost English national confidence?',
    },
  ],

  lesson_3_1: [
    {
      dates: '1558–1580s',
      title: 'Attitudes to Education & Literacy',
      bullets: [
        'Education was private, fee-paying, and aimed to prepare people for their social rank.',
        'Estimated 15–20% of men and under 10% of women were literate.',
        'Petty and dame schools taught basic reading, writing, and arithmetic.',
      ],
      focusClue: 'Why was formal education in Elizabethan England limited mainly to the rich?',
    },
    {
      dates: '1558–1580s',
      title: 'Grammar Schools',
      bullets: [
        'Over 70 new grammar schools founded across England for boys aged 7–14.',
        'Curriculum focused on Latin grammar, Greek, classical literature, and debate.',
        'Strict 10-hour school days with harsh discipline and birch rod beatings.',
      ],
      focusClue: 'How did grammar schools help boys from middling backgrounds rise in society?',
    },
    {
      dates: '1558–1580s',
      title: 'Universities & Noble Education',
      bullets: [
        'Only two universities: Oxford and Cambridge (studied rhetoric, law, theology).',
        'Noble boys educated at home by private tutors in languages, fencing, and dancing.',
        'Noble girls taught music, needlework, and managing a wealthy household.',
      ],
      focusClue: 'How did the education of noble children differ from grammar school education?',
    },
    {
      dates: '1558–1580s',
      title: 'Sports and Pastimes by Social Class',
      bullets: [
        'Nobility enjoyed hunting, hawking, fencing, real tennis, and tournament jousting.',
        'Ordinary people played folk football, archery, wrestling, and drank in alehouses.',
        'Blood sports popular across all classes: bear-baiting, bull-baiting, and cock-fighting.',
      ],
      focusClue: 'Why were blood sports such as bear-baiting popular with all social classes?',
    },
    {
      dates: '1576–1588',
      title: 'Development of the Theatre',
      bullets: [
        '1576: James Burbage builds London’s first purpose-built playhouse, ‘The Theatre’.',
        'Built outside City walls in Southwark to escape Puritan bans and local authorities.',
        'All classes attended: groundlings paid 1 penny in the pit; nobles sat in roofed galleries.',
      ],
      focusClue: 'Why were purpose-built theatres built outside the walls of the City of London?',
    },
  ],

  lesson_3_2: [
    {
      dates: '1558–1580s',
      title: 'Population Growth & Rising Prices',
      bullets: [
        'Population grew by 35%, from under 3 million in 1558 to over 4 million by 1603.',
        'Food production could not keep pace; bad harvests led to grain shortages and famine.',
        'Inflation drove up food and bread prices while wages fell or remained stagnant.',
      ],
      focusClue: 'Why did population growth cause widespread poverty in Elizabethan England?',
    },
    {
      dates: '1558–1580s',
      title: 'Changes in Farming: Enclosure & Sheep',
      bullets: [
        'Landowners enclosed common fields with hedges for profitable sheep farming.',
        'Sheep farming required far fewer laborers than arable farming, causing evictions.',
        'Unemployed agricultural workers forced to leave villages to look for town work.',
      ],
      focusClue: 'Why did the growth of sheep farming increase unemployment in the countryside?',
    },
    {
      dates: '1558–1570s',
      title: 'Changing Attitudes to the Poor',
      bullets: [
        'Impotent poor (deserving): elderly, sick, and disabled unable to work.',
        'Idle poor (sturdy beggars): able-bodied people viewed as lazy, dishonest, and criminal.',
        'Fear of vagabonds: pamphlets warned of tricksters like Counterfeit Cranks.',
      ],
      focusClue:
        'Why did the Elizabethan government distinguish between the impotent and idle poor?',
    },
    {
      dates: '1572',
      title: 'The 1572 Vagabonds Act',
      bullets: [
        'Introduced a compulsory local poor rate tax on all parish property owners.',
        'Parish Overseers of the Poor collected rates to provide relief for the impotent poor.',
        'Harsh penalties for vagrants: whipped and a hole burned through the right ear.',
      ],
      focusClue: 'Why was the introduction of a compulsory poor rate in 1572 a major change?',
    },
    {
      dates: '1576',
      title: 'The 1576 Act for Relief of the Poor',
      bullets: [
        'Recognized that some able-bodied people were unemployed through no fault of their own.',
        'Towns required to provide raw materials (wool, hemp, flax) so the poor could work.',
        'Houses of Correction established where persistent vagrants were forced to do hard labor.',
      ],
      focusClue: 'How did the 1576 Act move from simply punishing beggars to providing work?',
    },
  ],

  lesson_3_3: [
    {
      dates: '1558–1575',
      title: 'New Navigational Technology',
      bullets: [
        'Astrolabes and quadrants allowed sailors to calculate latitude using sun and stars.',
        'Magnetic compasses, navigational sea charts, and log-and-line calculated speed and course.',
        '1569: Mercator map projection created using parallel grid lines for ocean navigation.',
      ],
      focusClue: 'How did navigational instruments make ocean voyages safer and more accurate?',
    },
    {
      dates: '1558–1577',
      title: 'Improvements in Ship Design',
      bullets: [
        'Development of larger, ocean-going galleons with greater stability and cargo capacity.',
        'Combined traditional square sails (speed) with lateen sails (sailing into the wind).',
        'Armed with long-range cannons mounted on compact four-wheeled naval carriages.',
      ],
      focusClue:
        'How did changes in ship design allow English sailors to undertake long ocean voyages?',
    },
    {
      dates: '1550s–1570s',
      title: 'The Search for New Trade Routes',
      bullets: [
        'Collapse of Antwerp cloth trade in 1550s damaged England’s wool export market.',
        'Merchants founded joint-stock companies (Muscovy Company, Eastland Company).',
        'Sailors searched for a Northwest Passage to China and direct routes to Asian spices.',
      ],
      focusClue: 'Why did English merchants seek new trade routes to Asia and the Americas?',
    },
    {
      dates: '1577–1580',
      title: 'Drake’s Circumnavigation',
      bullets: [
        'Dec 1577: Drake departs Plymouth with five ships on Pelican (renamed Golden Hind).',
        'Navigates treacherous Strait of Magellan; raids Spanish ports in Chile and Peru.',
        'Captures treasure ship Cacafuego; explores California and trades cloves in Ternate.',
      ],
      focusClue:
        'Why was Drake’s navigation of the Strait of Magellan considered a remarkable feat?',
    },
    {
      dates: '1580–1588',
      title: 'Significance of Drake’s Voyage',
      bullets: [
        'Drake returns to Plymouth in 1580 with £140,000 in silver and jewels.',
        'Elizabeth knights Drake on board the Golden Hind at Deptford in April 1581.',
        'Proved English ships could challenge Spanish dominance and circumnavigate the globe.',
      ],
      focusClue: 'Why was Drake’s circumnavigation a turning point for English exploration?',
    },
  ],

  lesson_3_4: [
    {
      dates: '1584',
      title: 'Raleigh’s Patent & Planning',
      bullets: [
        'Elizabeth grants Sir Walter Raleigh a royal patent to colonise North America (Virginia).',
        'Aims: establish base to raid Spanish treasure ships, find minerals, and expand trade.',
        '1584 reconnaissance voyage under Barlowe and Amadas reaches Roanoke Island.',
      ],
      focusClue: 'Why did Raleigh believe a colony in North America would benefit England?',
    },
    {
      dates: '1584–1585',
      title: 'Recruiting Colonists & Leaders',
      bullets: [
        'Raleigh recruits 107 colonists: mostly soldiers, gentlemen, and mineral specialists.',
        'Richard Grenville appointed naval commander; Ralph Lane appointed colony governor.',
        'Few colonists were farmers, and gentlemen refused to do physical manual labor.',
      ],
      focusClue: 'Why did the types of people recruited for the 1585 colony create problems?',
    },
    {
      dates: '1585–1586',
      title: 'The First Roanoke Colony & Disaster',
      bullets: [
        'June 1585: Flagship Tiger runs aground on sandbar; seawater ruins seeds and supplies.',
        'Colonists arrive too late to plant crops; dependent on Native Americans for food.',
        'Lane accuses native Secotan of stealing a silver cup and burns their village.',
      ],
      focusClue: 'How did the grounding of the Tiger threaten the survival of the colony?',
    },
    {
      dates: '1586',
      title: 'Conflict & Evacuation',
      bullets: [
        'Relations collapse; Lane attacks and kills Secotan tribal chief Wingina.',
        'Colonists face starvation and attacks; rescued by Sir Francis Drake in June 1586.',
        'First colony completely abandoned as settlers return to England with Drake.',
      ],
      focusClue: 'Why did the first colony at Roanoke collapse and return to England?',
    },
    {
      dates: '1587–1590',
      title: 'The ‘Lost Colony’ & Significance',
      bullets: [
        '1587: John White leads 118 civilian settlers, including 17 women and children, to Roanoke.',
        'White returns to England for supplies; delayed for three years by the Spanish Armada.',
        'White returns in 1590 to find colony deserted, with only the word ‘CROATOAN’ carved.',
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
