// scripts/eee_textbook_data_kt2.cjs
// Publisher-Grade Master Curriculum Content for Early Elizabethan England (1558-88)
// Key Topic 2: Challenges to Elizabeth at home and abroad, 1569-88
// Grounded 100% in Edexcel 9-1 Specification and Pearson Student Book

module.exports = {
  unitId: 'eee',
  keyTopicId: 'KT2',
  keyTopicNumber: 2,
  period: '1569–88',
  title: 'Paper 2: Early Elizabethan England, 1558–88',
  topicTitle: 'Key Topic 2: Challenges to Elizabeth at home and abroad, 1569–88',
  enquiryQuestion:
    'Why did domestic plots, Catholic conspiracies, and foreign rivalry push Elizabeth from fragile peace into total war with Spain by 1588?',
  coverImage: '/images/armada_portrait.jpg',
  coverCaption:
    'Source A: The Armada Portrait of Queen Elizabeth I (1588), attributed to George Gower. Elizabeth rests her hand on the globe, flanked by scenes of the English fireships at Calais and the Spanish fleet wrecked upon the rocky coasts.',

  specMatrix: [
    {
      code: 'KT2.1',
      title: 'Plots and Revolts at Home',
      spec: 'Revolt of Northern Earls (1569); Papal Bull (1570); Ridolfi (1571), Throckmorton (1583) & Babington (1586) Plots; Walsingham’s spy network; Execution of Mary QoS (1587).',
    },
    {
      code: 'KT2.2',
      title: 'Relations with Spain',
      spec: 'Commercial rivalry in New World; Drake’s privateering & circumnavigation (1577–80); Religious differences & Dutch Revolt; Pacification of Ghent (1576); Treaty of Joinville (1584).',
    },
    {
      code: 'KT2.3',
      title: 'Outbreak of War with Spain',
      spec: 'Treaty of Nonsuch (1585); Leicester’s campaign in Low Countries (1585–87); Drake’s raid on Cadiz (1587) & the ‘Singeing of the King of Spain’s Beard’.',
    },
    {
      code: 'KT2.4',
      title: 'The Spanish Armada',
      spec: 'Philip II’s grand strategy & tactical flaws; English naval design & culverin gunnery; Fireships at Calais & Battle of Gravelines; The ‘Protestant Wind’ & long-term consequences.',
    },
  ],

  enquiries: [
    // -------------------------------------------------------------
    // ENQUIRY 2.1
    // -------------------------------------------------------------
    {
      id: 'lesson_2_1',
      number: '2.1',
      title: 'Plots and Revolts at Home, 1569–87',
      focus:
        'How did Catholic rebellion, foreign-backed conspiracies, and Walsingham’s intelligence apparatus lead inexorably to the execution of Mary, Queen of Scots?',
      sideImage: '/images/the_duke_of_norfolk_thomas_howard.jpg',
      sideImageCaption:
        'Thomas Howard, 4th Duke of Norfolk, England’s premier Catholic peer, executed for high treason in 1572 following his complicity in the Ridolfi Plot.',
      paragraphs: [
        `The arrival of Mary, Queen of Scots in 1568 ignited persistent domestic Catholic rebellion. In November 1569, the Revolt of the Northern Earls erupted, led by Charles Neville (Earl of Westmorland) and Thomas Percy (Earl of Northumberland). Disaffected by Elizabeth’s appointment of southern Protestants to northern administrative posts and the severe curtailment of their traditional feudal authority, the earls sought to depose Elizabeth, marry Mary to Thomas Howard, 4th Duke of Norfolk, and re-establish the Roman Catholic Church. The rebels seized Durham Cathedral, destroyed the English Communion table and Book of Common Prayer, and celebrated Catholic Mass before marching south to Bramham Moor with 4,600 men. However, anticipated military assistance from the Spanish Duke of Alba failed to materialise, and large northern towns like York remained loyal to the Crown. As the Earl of Sussex mobilised a royal army of 14,000 men, the rebel leaders disbanded their forces and fled across the Scottish border. Elizabeth’s retribution was merciless: Northumberland was extradited and beheaded at York, and Elizabeth ordered the summary execution of approximately 450 ordinary rebels to deter further northern dissent.`,

        `The revolt fundamentally altered the security climate. In February 1570, Pope Pius V issued the papal bull <em>Regnans in Excelsis</em>, excommunicating Elizabeth as an illegitimate heretic and commanding English Catholics to withdraw their civil obedience on pain of damnation. This transformed all practising English Catholics into potential traitors in the eyes of the state. A series of foreign-backed assassination conspiracies swiftly followed. In 1571, the Ridolfi Plot—hatched by Roberto Ridolfi, an Italian banker—planned an invasion of 10,000 veteran troops under the Duke of Alba, the murder of Elizabeth, and the enthronement of Mary married to Norfolk. Decrypted merchant letters alerted Sir William Cecil; Norfolk was arrested and executed for treason in June 1572. In 1583, the Throckmorton Plot envisaged an invasion by the French Catholic Duke of Guise, funded by Philip II and the Papacy. The English conspirator Francis Throckmorton acted as intermediary between Mary and the Spanish ambassador, Bernardino de Mendoza. Sir Francis Walsingham’s nascent counter-espionage network intercepted the plot, torturing Throckmorton on the rack to extract confessions before his execution. Mendoza was expelled from England, and the Privy Council drafted the ruthless Bond of Association (1584), obliging signatories to execute anyone attempting or benefiting from the assassination of Queen Elizabeth.`,

        `The existential crisis culminated in the Babington Plot of 1586. Led by Anthony Babington, a wealthy Catholic gentleman, the plotters planned regicide and an immediate foreign Catholic invasion. Walsingham constructed an intricate counter-espionage sting: double-agent Gilbert Gifford supplied encrypted letter containers hidden inside beer barrels delivered to Mary’s residence at Chartley Manor. Every letter was intercepted, deciphered, and copied by Walsingham’s cryptographer, Thomas Phelippes. On 17 July 1586, Mary fatally sent written instructions endorsing the assassination of Elizabeth by 'the six gentlemen'. Armed with irrefutable cryptographic evidence, Walsingham arrested Babington and his co-conspirators, who were publicly hanged, drawn, and quartered. In October 1586, Mary was tried under the Act for the Queen’s Safety at Fotheringhay Castle and sentenced to death. Elizabeth agonised for four months, deeply unsettled by the dangerous constitutional precedent of executing an anointed, sovereign queen. Under intense pressure from Cecil and Parliament, she signed the death warrant on 1 February 1587; the Privy Council secretly dispatched it without her final authorisation. On 8 February 1587, Mary was beheaded at Fotheringhay Castle, eliminating the domestic Catholic figurehead but removing the final obstacle preventing Philip II from launching an all-out invasion.`,
      ],
      keyFigures: [
        {
          name: 'Sir Francis Walsingham',
          role: 'Principal Secretary & Spymaster General',
          desc: 'Constructed an omniscient intelligence network of overseas spies, codebreakers, and double-agents to unmask Catholic plots.',
        },
        {
          name: 'Thomas Howard, Duke of Norfolk',
          role: 'Premier Catholic Peer',
          desc: 'England’s wealthiest noble; schemed to marry Mary QoS in both 1569 and 1571; convicted of high treason and beheaded in 1572.',
        },
        {
          name: 'Anthony Babington',
          role: 'Catholic Conspirator',
          desc: 'Recruited by Catholic priests to coordinate Elizabeth’s murder; entrapped by Walsingham’s beer-barrel cipher operation in 1586.',
        },
      ],
      spotlight: {
        title: 'The Anatomy of Walsingham’s Espionage Machine',
        desc: 'Walsingham employed an elite cadre of linguistic decoders, including Thomas Phelippes, who pioneered cryptographic frequency analysis and forged postscripts (such as the gallows emblem on Mary’s final dispatch) to identify conspirators before executing them.',
      },
      source: {
        meta: 'SOURCE B • Primary Evidence: Walsingham’s Cryptographic Intercept',
        date: 'July 1586',
        title: 'Mary, Queen of Scots to Anthony Babington (Decrypted postscript)',
        body: '‘...Set the six gentlemen to work taking order upon the accomplishing of their design, that I may be suddenly taken out of this place... Let great care be taken that no suspicion be given to the Queen of England, nor to any of her officers.’',
        hingeQuestion:
          'How does Mary’s endorsement of the ‘six gentlemen’ demonstrate why Elizabeth’s council viewed her execution as an unavoidable national security imperative rather than merely private dynastic vengeance?',
      },
      vocab: [
        {
          term: 'Recusancy',
          def: 'Refusal to attend Church of England Sunday services, punished by heavy statutory fines.',
        },
        {
          term: 'Papal Bull',
          def: 'An official formal proclamation issued by the Pope, carrying the force of ecclesiastical law.',
        },
        {
          term: 'Bond of Association',
          def: 'A 1584 legal pledge binding signatories to murder any claimant in whose name the Queen was harmed.',
        },
        {
          term: 'Regicide',
          def: 'The deliberate killing of an anointed monarch, viewed in Tudor theology as cosmic rebellion.',
        },
      ],
    },

    // -------------------------------------------------------------
    // ENQUIRY 2.2
    // -------------------------------------------------------------
    {
      id: 'lesson_2_2',
      number: '2.2',
      title: 'Relations with Spain, 1569–85',
      focus:
        'How did commercial piracy in the New World, ideological warfare in the Netherlands, and shifting European alliances shatter Anglo-Spanish peace?',
      sideImage: '/images/king_philip_ii_of_spain.jpg',
      sideImageCaption:
        'King Philip II of Spain, ruler of the global Spanish Empire, who regarded himself as the divinely appointed champion of the Catholic Counter-Reformation.',
      paragraphs: [
        `Throughout the 1560s and 1570s, relations between England and Spain disintegrated along economic, geopolitical, and religious fault lines. Philip II ruled the most formidable empire on earth, comprising Spain, Portugal, the Spanish Netherlands, southern Italy, and vast American territories. Under Spanish colonial law, foreign merchants were strictly forbidden from trading in the New World without a royal license. Defying this monopoly, English 'sea dogs' such as John Hawkins and Francis Drake engaged in illicit trade and state-sanctioned privateering. In 1572, Drake raided the Spanish Silver Train at Nombre de Dios in Panama, seizing £20,000 in bullion. Between 1577 and 1580, Drake undertook his historic circumnavigation aboard the <em>Golden Hind</em>. Operating with secret financial backing from Elizabeth and Privy Councillors, Drake plundered Spanish settlements along the unguarded Pacific coast of Chile and Peru, capturing the great treasure galleon <em>Nuestra Señora de la Concepción</em> (the <em>Cacafuego</em>). He returned to Plymouth laden with over £400,000 of gold, silver, and precious stones—doubling the Crown’s annual income. In April 1581, Elizabeth openly knighted Drake aboard his ship at Deptford, defying Philip’s demands for his execution as an international pirate.`,

        `Simultaneously, the geopolitical flashpoint of the Spanish Netherlands posed an intolerable strategic threat. In 1566, Dutch Protestants revolted against heavy Spanish taxation and religious persecution. Philip responded by dispatching the Duke of Alba with 10,000 veteran infantry to crush the rebellion. Alba established the Council of Troubles (dubbed the 'Council of Blood'), which executed over a thousand Dutch subjects and imposed martial law directly across the English Channel. Elizabeth faced a delicate dilemma: direct military intervention risked immediate war with Spain, yet Spanish military domination of Antwerp and the Dutch coastline threatened English cloth exports and provided Philip with an ideal springboard for an invasion of England. Elizabeth pursued covert, proxy resistance: she permitted Protestant Dutch privateers (the 'Sea Beggars') to shelter in English ports, allowed English volunteers to enlist in Dutch rebel armies, and impounded Spanish pay ships carrying 400,000 florins (the Genoese Loan) when they sought refuge in English harbours in 1568. When unpaid Spanish mutineers sacked Antwerp in 1576—massacring 7,000 citizens in the 'Spanish Fury'—the united provinces signed the Pacification of Ghent demanding the expulsion of Spanish troops. Elizabeth dispatched a £100,000 loan to the Dutch Estates-General to sustain resistance.`,

        `By 1584, the geopolitical balance collapsed disastrously in Spain’s favour. In July 1584, the leader of the Dutch rebellion, William of Orange ('William the Silent'), was assassinated by a Catholic fanatic motivated by a 25,000-crown bounty placed on his head by Philip II. This proved that a Protestant leader could be eliminated, heightening Elizabeth’s vulnerability. Months earlier, the Duke of Alençon (the French King’s brother and Elizabeth’s chosen proxy fundee in the Netherlands) died, extinguishing French opposition to Spain in the Low Countries. In December 1584, Philip II signed the secret Treaty of Joinville with the French Catholic League, led by the Duke of Guise. By agreeing to finance Guise to prevent a Protestant heir from ascending the French throne, Philip successfully neutralised France. England was left completely isolated on the European stage, confronted by a united Catholic bloc. Elizabeth could no longer rely on covert loans or privateering; direct English intervention became the only alternative to absolute Spanish subjugation of Western Europe.`,
      ],
      keyFigures: [
        {
          name: 'King Philip II of Spain',
          role: 'Monarch of the Spanish Empire',
          desc: 'Devout Catholic champion who funded English assassination plots and directed the conquest of England to restore Catholicism.',
        },
        {
          name: 'Sir Francis Drake',
          role: 'Privateer & Naval Commander',
          desc: 'Terrorised Spanish commerce in the Americas; executed the 1577–80 circumnavigation; knighted by Elizabeth in 1581.',
        },
        {
          name: 'William the Silent',
          role: 'Leader of the Dutch Revolt',
          desc: 'Prince of Orange who led United Provinces against Spain; assassinated in July 1584, triggering the direct English intervention crisis.',
        },
      ],
      spotlight: {
        title: 'The Cacafuego Haul: Geopolitical Economic Warfare',
        desc: 'Drake’s capture of the *Cacafuego* yielded 26 tons of silver bullion, 80 pounds of gold, and 13 chests of minted coin. Elizabeth invested her share into the Levant Company and retired all foreign debt, infuriating Philip II whose imperial treasuries were nearing bankruptcy.',
      },
      source: {
        meta: 'SOURCE C • Primary Evidence: Spanish Diplomatic Protest',
        date: 'April 1581',
        title: 'Ambassador Bernardino de Mendoza’s Dispatch to King Philip II',
        body: '‘...The Queen has had the pirate Drake knighted upon his ship in public assembly, bestowing upon him highest honours. This is the greatest insolence your Majesty has ever suffered from a petty princess who has lived upon your royal patience.’',
        hingeQuestion:
          'Why did Elizabeth’s public knighting of Drake mark an irreversible point of no return in Anglo-Spanish diplomatic relations?',
      },
      vocab: [
        {
          term: 'Privateering',
          def: 'State-sanctioned piracy where armed merchant vessels operated under government letters of marque.',
        },
        {
          term: 'Circumnavigation',
          def: 'Sailing entirely around the globe, achieved by Drake’s Golden Hind expedition (1577–80).',
        },
        {
          term: 'Council of Blood',
          def: 'Alba’s tribunal in the Netherlands which executed thousands of Protestant political rebels.',
        },
        {
          term: 'Treaty of Joinville',
          def: 'Secret 1584 alliance uniting Spain and French Catholic League against European Protestantism.',
        },
      ],
    },

    // -------------------------------------------------------------
    // ENQUIRY 2.3
    // -------------------------------------------------------------
    {
      id: 'lesson_2_3',
      number: '2.3',
      title: 'The Outbreak of War with Spain, 1585–88',
      focus:
        'Why did the Treaty of Nonsuch, Leicester’s Dutch campaign, and Drake’s Cadiz raid transform Cold War proxy conflict into open military invasion?',
      sideImage: '/images/robert_dudley_earl_of_leicester.jpg',
      sideImageCaption:
        'Robert Dudley, Earl of Leicester, appointed Lieutenant-General of English forces in the Low Countries under the Treaty of Nonsuch (1585).',
      paragraphs: [
        `In August 1585, Elizabeth abandoned her longstanding policy of strategic ambiguity and committed England to direct, formal warfare by signing the Treaty of Nonsuch with the Dutch Protestant rebels. Under the treaty’s terms, Elizabeth agreed to finance and dispatch an English expeditionary force of 6,400 foot soldiers and 1,000 cavalry, commanded by her close favourite, Robert Dudley, Earl of Leicester. In return, the Dutch pledged to hand over two strategic deep-water 'cautionary towns'—Flushing and Brill—which English garrisons occupied as collateral for military expenses. Elizabeth’s war aims were strictly defensive: she did not seek Dutch independence or the permanent destruction of Spanish sovereignty, but rather the restoration of traditional Dutch political charters and the withdrawal of the Spanish army. However, this formal deployment was regarded by King Philip II as an explicit, undeniable declaration of open war between Spain and England.`,

        `Despite significant expenditure, Leicester’s military campaign in the Netherlands proved a diplomatic and tactical failure. Upon arriving in January 1586, Leicester accepted the title of 'Governor-General of the United Provinces' from the Dutch Estates. Elizabeth was incandescent with rage: accepting sovereign executive power directly undermined her insistence that she was not attempting to annex Dutch territory from Philip. Furthermore, Leicester was chronically underfunded by the Queen, who withheld money because of his political insubordination; English troops went unpaid, poorly fed, and lacked basic winter clothing. Leicester clashed bitterly with Dutch political leaders over commercial regulations, while two English Catholic commanders, Sir William Stanley and Rowland York, defected to the Spanish, handing over key defensive forts at Deventer and Zutphen. Although Leicester’s forces skirmished gallantly at the Battle of Zutphen (where poet Sir Philip Sidney was mortally wounded), they failed to dislodge the brilliant Spanish commander, the Duke of Parma, or capture any deep-water ports. Leicester resigned his command and returned to England in December 1587, having damaged Anglo-Dutch trust.`,

        `While Leicester struggled in the Low Countries, Francis Drake executed pre-emptive naval strikes that fundamentally disrupted Spanish invasion plans. Between 1585 and 1586, Drake raided the Spanish Caribbean, sacking Santo Domingo, Cartagena, and St Augustine. More decisively, in March 1587, intelligence confirmed that Philip II was assembling an immense invasion fleet in Spanish ports. Elizabeth authorised Drake to disrupt Spanish naval concentrations. On 19 April 1587, Drake audaciously sailed four royal warships and twenty merchantmen straight into the heavily fortified inner harbour of Cadiz. In a stunning display of naval superiority, Drake spent thirty-six hours bombarding shore batteries, sinking or burning between 24 and 36 major Spanish vessels, and capturing four supply ships loaded with provisions. Before departing, Drake destroyed vast stockpiles of seasoned oak barrel staves intended for food and water casks. Drake dubbed this raid the 'Singeing of the King of Spain’s Beard'. The destruction was catastrophic for Philip: it delayed the launch of the Armada by more than twelve months and forced the Spanish to construct fresh water casks from unseasoned wood, which subsequently rotted provisions during the 1588 expedition.`,
      ],
      keyFigures: [
        {
          name: 'Robert Dudley, Earl of Leicester',
          role: 'Commander of English Army in Netherlands',
          desc: 'Court favourite who led English expeditionary force (1585–87); accepted Dutch Governor-Generalship against Queen’s orders.',
        },
        {
          name: 'Alexander Farnese, Duke of Parma',
          role: 'Spanish Military Commander',
          desc: 'Brilliant general who recaptured southern Netherlands; commanded 27,000 veteran troops awaiting Armada pickup in 1588.',
        },
        {
          name: 'Sir Francis Drake',
          role: 'Vice-Admiral of English Fleet',
          desc: 'Executed the audacious 1587 Cadiz raid, destroying Spanish warships and delaying the invasion by a full year.',
        },
      ],
      spotlight: {
        title: 'The Cadiz Barrel Staves Disaster',
        desc: 'Drake burned over 1,700 tons of seasoned barrel staves at Cadiz. Barrels made from unseasoned green wood shrank, leaked, and spoiled meat, beer, and water casks, causing virulent dysentery and scurvy aboard the Armada before it ever reached English waters.',
      },
      source: {
        meta: 'SOURCE D • Primary Dispatch: The Cadiz Raid',
        date: '27 April 1587',
        title: 'Sir Francis Drake’s Dispatch to Sir Francis Walsingham',
        body: '‘...We have distressed the King of Spain’s armada at Cadiz, sunk thirty vessels, and won great spoils. Yet there is great preparation ongoing in Lisbon; prepare therefore your battle unto England, for the King of Spain intends a full conquest.’',
        hingeQuestion:
          'Why was the destruction of naval supply lines and cooperage at Cadiz more militarily decisive than sinking warships in disrupting Philip’s invasion plans?',
      },
      vocab: [
        {
          term: 'Treaty of Nonsuch',
          def: 'Formal 1585 military treaty providing English troops and cash subsidies to Dutch Protestant rebels.',
        },
        {
          term: 'Cautionary Towns',
          def: 'Dutch deep-water ports (Flushing and Brill) surrendered to English garrisons as surety for war loans.',
        },
        {
          term: 'Governor-General',
          def: 'Executive title accepted by Leicester in 1586, implying English sovereignty over Dutch provinces.',
        },
        {
          term: 'Barrel Staves',
          def: 'Seasoned wooden planks required to construct watertight casks for naval food and fresh water storage.',
        },
      ],
    },

    // -------------------------------------------------------------
    // ENQUIRY 2.4
    // -------------------------------------------------------------
    {
      id: 'lesson_2_4',
      number: '2.4',
      title: 'The Spanish Armada: Strategy, Conflict & Defeat, 1588',
      focus:
        'Why did Philip II’s grand invasion plan disintegrate in the English Channel, and what were the decisive factors behind the English naval victory?',
      sideImage: '/images/spanish_armada_battle.jpg',
      sideImageCaption:
        'The Battle of Gravelines (8 August 1588), where superior English culverin gunnery and fireships shattered the Spanish defensive crescent formation.',
      paragraphs: [
        `In May 1588, Philip II launched his 'Enterprise of England'. The Armada comprised 130 ships, 2,431 guns, and approximately 30,000 men, commanded by the Duke of Medina Sidonia. Philip’s grand strategy relied upon a fatal coordination challenge: the Armada was ordered to sail up the English Channel, anchor off the coast of Flanders, rendezvous with the Duke of Parma’s 27,000 veteran infantry, and escort their invasion barges across the Channel to land in Kent and march on London. However, the plan contained crippling strategic defects. Medina Sidonia was a nobleman with zero naval combat experience who pleaded with Philip to cancel the expedition. Crucially, the Spanish held no deep-water ports along the shallow Flemish coast; Parma’s flat-bottomed barges could not leave harbour under blockade by armed Dutch Protestant flyboats. Furthermore, maritime communications were slow and disjointed: it took up to forty-eight hours for courier boats to travel between Sidonia and Parma, making a synchronised maritime rendezvous almost impossible to execute.`,

        `When the Armada was sighted off the Lizard on 29 July 1588, English warning beacons blazed across the southern coast. The English fleet of 200 ships—commanded by Lord Howard of Effingham, with Drake and Hawkins as vice-admirals—enjoyed substantial technological superiority. English 'race-built' galleons (designed by Hawkins) were longer, lower, and faster than the towering Spanish vessels, allowing them to sail closer to the wind and outmanoeuvre their opponents. While Spanish tactics prioritised grappling enemy ships to unleash boarding infantry, English doctrine relied upon stand-off artillery bombardment. English ships carried long-range bronze culverins mounted on compact, four-wheeled truck carriages, enabling trained gunners to reload and fire every five minutes. In contrast, Spanish ships carried bulky, two-wheeled field gun carriages staffed by soldiers that took up to an hour to reload. For eight days, Medina Sidonia maintained a rigid, protective crescent formation up the Channel, repelling English skirmishes off Portland Bill and the Isle of Wight before anchoring at Calais on 6 August to await Parma.`,

        `The turning point occurred on the night of 7–8 August 1588 off Calais. Lord Howard launched eight 'hellburners' (fireships loaded with pitch, tar, and gunpowder) straight into the densely packed Spanish anchorage. Panicking captains cut their anchor cables and scattered into the night, irrevocably shattering the defensive crescent formation. At dawn on 8 August, the Battle of Gravelines began. In ten hours of ferocious close-range fighting, nimble English warships pounded the disordered Spanish galleons with rapid broadsides, sinking or grounding five major warships and killing over 1,000 Spanish sailors without losing a single English vessel. Running out of ammunition, Medina Sidonia was spared from annihilation by a dramatic shift in wind direction. Fierce south-westerly gales—hailed as the 'Protestant Wind'—drove the Armada into the treacherous North Sea, blocking retreat down the Channel. Sidonia had no choice but to steer his battered fleet around the perilous, uncharted coastlines of Scotland and Ireland. Lacking sea anchors, short of water, and battered by ferocious Atlantic storms, over forty Spanish ships were wrecked on the rocky coasts, with surviving sailors executed by English garrisons. Fewer than half the ships and 10,000 men limped back to Spain. The victory cemented English maritime independence, secured Elizabeth’s throne, and became a cornerstone of Protestant national identity.`,
      ],
      keyFigures: [
        {
          name: 'Duke of Medina Sidonia',
          role: 'Commander of the Spanish Armada',
          desc: 'Appointed despite lack of naval experience; led with bravery but was shackled by Philip’s rigid, unworkable operational plan.',
        },
        {
          name: 'Lord Howard of Effingham',
          role: 'Lord High Admiral of England',
          desc: 'Commander of English naval forces; trusted Drake and Hawkins to deploy innovative fireship and culverin artillery tactics.',
        },
        {
          name: 'Queen Elizabeth I',
          role: 'Monarch of England',
          desc: 'Rallied English land militia at Tilbury on 9 August 1588, delivering her iconic speech of defiance against Spanish invasion.',
        },
      ],
      spotlight: {
        title: 'Culverins vs Cannon: The Four-Wheel Truck Revolution',
        desc: 'John Hawkins fitted English race-built galleons with four-wheel truck carriages, allowing guns to be recoiled, swabbed, and reloaded inboard within 5 minutes. Spanish two-wheel carriages required gunners to climb outboard onto gunports under enemy musket fire, restricting them to 1–2 shots per hour.',
      },
      source: {
        meta: 'SOURCE E • Royal Address: Fortitude in the Face of Invasion',
        date: '9 August 1588',
        title: 'Queen Elizabeth I’s Speech to the Troops at Tilbury',
        body: '‘...I know I have the body of a weak and feeble woman, but I have the heart and stomach of a king, and of a king of England too, and think foul scorn that Parma or Spain, or any prince of Europe, should dare to invade the borders of my realm...’',
        hingeQuestion:
          'How did Elizabeth’s rhetoric at Tilbury transform her gender from an acknowledged Tudor vulnerability into a divine symbol of royal fortitude?',
      },
      vocab: [
        {
          term: 'Crescent Formation',
          def: 'Tight, defensive naval arc where heavily armed galleons protected transport ships at the centre.',
        },
        {
          term: 'Culverin',
          def: 'Long-range, accurate naval artillery gun firing 17-pound iron balls with high muzzle velocity.',
        },
        {
          term: 'Race-built Galleon',
          def: 'Lower, narrower warship design developed by Hawkins, prioritising speed, manoeuvrability, and gunnery.',
        },
        {
          term: 'Protestant Wind',
          def: 'The south-westerly gale that blew the Armada into the North Sea, interpreted as divine intervention.',
        },
      ],
    },
  ],

  // -------------------------------------------------------------
  // SYNTHESIS & EXAM MASTERCLASS (PAGES 10-11)
  // -------------------------------------------------------------
  examMasterclass: {
    overview:
      'Key Topic 2 examines the escalation of conflict from domestic Catholic plots (1569–86) to direct military intervention (1585) and the Spanish Armada (1588). In Edexcel Paper 2, Section B tests feature descriptions (Q1 [4 marks]), causal explanation (Q2 [12 marks]), and analytical judgement (Q3 [16 marks]).',
    q1: {
      question:
        'Describe two features of the plots against Elizabeth I in the years 1571–86. [4 marks]',
      structure:
        'Identify feature 1 + supporting precise factual detail. Identify feature 2 + supporting precise factual detail. Zero evaluation or comparison needed.',
      modelAnswer:
        "One feature of the plots was the active involvement of foreign Catholic powers seeking to invade England. For example, in both the Ridolfi Plot (1571) and Throckmorton Plot (1583), conspirators planned for Spanish troops under the Duke of Alba or French troops under the Duke of Guise to land in England and overthrow Elizabeth.\n\nA second feature was the central role of Mary, Queen of Scots as the figurehead for replacing Elizabeth. In the Babington Plot (1586), conspirators communicated directly with Mary using encrypted ciphers hidden in beer barrels, and Mary explicitly endorsed the assassination of Elizabeth by 'the six gentlemen' in her written reply.",
    },
    q2: {
      question: 'Explain why the Spanish Armada was defeated in 1588. [12 marks]',
      stimulus: ['English naval tactics', 'The weather'],
      paragraphs: [
        {
          point: 'English naval design and artillery tactics',
          evidence:
            'John Hawkins designed sleek, low-built ‘race-built’ galleons that sailed faster and closer to the wind. Crucially, English ships carried long-range bronze culverins mounted on compact four-wheel truck carriages, allowing gunners to reload and fire broadsides every 5 minutes from safe stand-off range, shattering Spanish hulls at the Battle of Gravelines.',
          explanation:
            'This neutralised the traditional Spanish boarding tactic, ensuring the English inflicted crippling damage without suffering a single lost ship.',
        },
        {
          point: 'Fatal flaws in Spanish invasion strategy and coordination',
          evidence:
            'Medina Sidonia had no naval combat experience, and the Spanish held no deep-water ports along the Flemish coast. Parma’s 27,000 troops could not leave harbour in flat-bottomed barges due to Dutch flyboat blockades, while communications between Medina Sidonia and Parma took 48 hours by horse and boat.',
          explanation:
            'This communication lag meant the rendezvous was impossible to synchronise, leaving the Armada exposed and immobile off Calais.',
        },
        {
          point: 'The Calais fireships and the ‘Protestant Wind’',
          evidence:
            'On 7 August, English commanders launched eight fireships into the Calais anchorage, panicking Spanish captains into cutting anchor cables and shattering their defensive crescent formation. Following Gravelines, relentless south-westerly gales drove the Armada into the stormy North Sea.',
          explanation:
            'Deprived of anchors and forced around the uncharted coasts of Scotland and Ireland, over 40 Spanish ships were wrecked by storms, converting a tactical retreat into absolute catastrophe.',
        },
      ],
    },
    q3: {
      question:
        '‘The execution of Mary, Queen of Scots was the main cause of the Spanish Armada in 1588.’ How far do you agree? Explain your answer. [16 marks + 4 SPaG]',
      stimulus: ['The execution of Mary, Queen of Scots (1587)', 'Drake’s privateering'],
      verdictStructure:
        'Agree (Mary gave Philip a clear dynastic pretext) vs Disagree (commercial rivalry, Drake’s piracy, Treaty of Nonsuch, and Dutch Revolt were the underlying drivers). Conclude that Mary’s execution merely removed the final diplomatic obstacle, while Dutch intervention made war unavoidable.',
    },
  },

  // -------------------------------------------------------------
  // BACK COVER (PAGE 12)
  // -------------------------------------------------------------
  backCover: {
    knowledgeOrganiser: [
      {
        date: 'Nov 1569',
        event:
          'Revolt of the Northern Earls (Northumberland & Westmorland defeated; 450 executed).',
      },
      {
        date: 'Feb 1570',
        event: 'Pope Pius V issues Regnans in Excelsis excommunicating Elizabeth as a heretic.',
      },
      {
        date: '1571',
        event: 'Ridolfi Plot uncovered by Cecil; Duke of Norfolk executed for treason in 1572.',
      },
      {
        date: '1577–80',
        event:
          'Francis Drake circumnavigates the globe, returning with £400,000 in Spanish treasure.',
      },
      {
        date: '1583',
        event:
          'Throckmorton Plot uncovered; Spanish ambassador Mendoza expelled; Bond of Association drafted.',
      },
      {
        date: 'Dec 1584',
        event:
          'Treaty of Joinville: France and Spain form secret anti-Protestant Catholic alliance.',
      },
      {
        date: 'Aug 1585',
        event:
          'Treaty of Nonsuch: Elizabeth sends Leicester with 7,400 troops to aid Dutch rebels.',
      },
      {
        date: '1586',
        event:
          'Babington Plot entrapped by Walsingham’s beer-barrel cipher sting; Mary QoS implicated.',
      },
      {
        date: '8 Feb 1587',
        event:
          'Mary, Queen of Scots beheaded at Fotheringhay Castle after signing of death warrant.',
      },
      {
        date: 'Apr 1587',
        event:
          'Drake raids Cadiz harbour, burning 30 Spanish ships and delaying the Armada by a year.',
      },
      {
        date: '29 Jul 1588',
        event: 'Spanish Armada sighted off the Lizard; English beacons alert the country.',
      },
      {
        date: '7–8 Aug 1588',
        event:
          'English fireships at Calais; Battle of Gravelines; Armada driven north into storms.',
      },
    ],
    vocabulary: [
      {
        term: 'Excommunication',
        def: 'Formal papal decree expelling a person from the Catholic Church.',
      },
      { term: 'Privateering', def: 'State-sanctioned naval raiding of enemy merchant shipping.' },
      {
        term: 'Circumnavigation',
        def: 'Sailing entirely around the earth (achieved by Drake 1577–80).',
      },
      {
        term: 'Regicide',
        def: 'The killing of an anointed monarch, viewed as treason against God.',
      },
      {
        term: 'Bond of Association',
        def: '1584 pledge to execute anyone plotting against the Queen or benefiting from her death.',
      },
      {
        term: 'Treaty of Nonsuch',
        def: '1585 treaty committing English army to the Protestant Dutch Revolt.',
      },
      {
        term: 'Governor-General',
        def: 'Title accepted by Leicester in 1586, infuriating Queen Elizabeth.',
      },
      {
        term: 'Barrel Staves',
        def: 'Seasoned wooden planks burnt by Drake at Cadiz, ruining Armada water casks.',
      },
      {
        term: 'Race-built Galleon',
        def: 'Faster, lower English warship designed for stand-off artillery gunnery.',
      },
      {
        term: 'Culverin',
        def: 'Long-range naval cannon firing 17lb iron shots on 4-wheel truck carriages.',
      },
      {
        term: 'Crescent Formation',
        def: 'Spanish defensive naval arc protecting vulnerable supply and troop ships.',
      },
      {
        term: 'Protestant Wind',
        def: 'Gale-force weather driving the scattered Armada around Scotland and Ireland.',
      },
    ],
    qrCards: [
      {
        code: 'Q1',
        title: 'Northern Earls & Papal Bull',
        desc: 'Test knowledge on the 1569 revolt, Durham mass, and Pius V’s Regnans in Excelsis.',
      },
      {
        code: 'Q2',
        title: 'The 4 Catholic Plots',
        desc: 'Compare Ridolfi (1571), Throckmorton (1583), Babington (1586), and Mary’s execution.',
      },
      {
        code: 'Q3',
        title: 'Dutch Revolt & Cadiz Raid',
        desc: 'Master Treaty of Nonsuch, Leicester’s errors, and Drake’s barrel staves at Cadiz.',
      },
      {
        code: 'Q4',
        title: 'Armada Tactics & Defeat',
        desc: 'Revise race-built galleons, culverin gunnery, Calais fireships, and Gravelines.',
      },
    ],
    checklist: [
      'I can explain the political, religious, and economic causes of the Revolt of the Northern Earls (1569).',
      'I can evaluate the significance of the Papal Bull Regnans in Excelsis (1570) on English Catholics.',
      'I can distinguish between the Ridolfi, Throckmorton, and Babington Plots and explain Walsingham’s role.',
      'I can explain why Mary, Queen of Scots was executed in 1587 and how Elizabeth reacted.',
      'I can assess the impact of commercial rivalry and Drake’s privateering on Anglo-Spanish relations.',
      'I can explain why the Treaty of Nonsuch (1585) marked the official outbreak of war with Spain.',
      'I can describe the strategic significance of Drake’s 1587 Cadiz raid (‘Singeing the King’s Beard’).',
      'I can evaluate why the Armada was defeated in 1588, weighing naval tactics, leadership, and weather.',
    ],
  },
};
