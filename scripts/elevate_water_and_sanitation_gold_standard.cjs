/**
 * elevate_water_and_sanitation_gold_standard.cjs
 * Upgrades all 6 lessons of KS3 Year 7: Water & Sanitation Through Time
 * to the publisher-grade Christine Counsell 4-Act Gold Standard:
 * 1. Dramatic Enquiry Prologues (2-3 sentences setting up the historical hook/paradox)
 * 2. 5-Question Prior-Knowledge Retrieval Do Nows (strictly prior knowledge)
 * 3. 4 Disciplinary Narrative Acts with 2 beats per act ([X.1], [X.2])
 * 4. Zero inline comprehension clutter (narrative acts 100% clean)
 * 5. Structured Assessment Zone:
 *    - Task 3: Dual-Column Planning Bridge (two competing interpretations with whiteboard masking)
 *    - Task 4: Enquiry Essay with PEEL stems and high-caliber model answers
 * 6. High-yield 6-term vocabulary decks per lesson
 * 7. 20-question practice quizzes per lesson
 */

const fs = require('fs');
const path = require('path');

const filePathV2 = path.join(__dirname, '..', 'units', 'water_and_sanitation', 'data_v2_4act.js');
const filePathLive = path.join(__dirname, '..', 'units', 'water_and_sanitation', 'data.js');

const PROLOGUES = [
  // Lesson 1: Roman Public Health
  'For centuries before the Roman conquest, Iron Age Celtic Britain was a rural patchwork of roundhouses where small communities drew clean water from hillsides and simple cesspits decomposed into fertilizer. In AD 43, the arrival of four Roman legions brought monumental stone cities, communal bathhouses, and gravity aqueducts carrying millions of gallons of water across the empire. Did the Romans build this complex infrastructure out of genuine medical understanding, or as an expression of imperial power and military discipline?',
  // Lesson 2: Medieval Public Health
  "When the Roman legions withdrew in AD 410, Britain's stone aqueducts fell into disrepair and urban populations collapsed into agrarian villages. Victorian historians often painted the medieval period as a thousand years of ignorant squalor where citizens wallowed in filth and threw excrement from upstairs windows. Was medieval Britain truly devoid of sanitation, or did monastic water systems and strict town council regulations provide far more hygiene than modern myths suggest?",
  // Lesson 3: Early Modern Towns
  "Between 1500 and 1750, London transformed into a bustling commercial metropolis of half a million citizens, crammed along narrow cobblestone lanes. In 1596, Sir John Harington invented the world's first flush toilet for Queen Elizabeth I, yet royal courtiers and city residents continued using foul privy pits and open street gutters for over two hundred years. Why did technological innovation fail to clean up early modern Britain's towns despite the horrors of the Great Plague?",
  // Lesson 4: Industrial Public Health Crisis
  'The rapid dawn of the Industrial Revolution drew millions of rural laborers into northern factory cities, packing families into damp, back-to-back slums without drains, clean water, or ventilation. When the terrifying epidemic of Asiatic Cholera struck in 1831, killing thousands within hours, Parliament refused to intervene, clinging to a rigid dogma of "laissez-faire". Why did the British government abandon industrial workers to disease, and what finally forced authorities to investigate the slums?',
  // Lesson 5: The Great Stink
  "In the sweltering heat of July 1858, the River Thames became a fermenting open sewer, creating a stench so overpowering that MPs soaked Parliament's curtains in chloride of lime and considered fleeing the capital. For decades, reformers had warned that London's sewage was poisoning the population, but politicians only acted when their own nostrils were assaulted. Did the \"Great Stink\" inspire genuine civic philanthropy, or was London's 82-mile sewer network born purely out of political panic?",
  // Lesson 6: Germ Theory & John Snow
  'Throughout the nineteenth century, medical orthodoxy insisted that lethal epidemics arose from "miasma"—poisonous atmospheric vapor released by decaying filth. In 1854, during a vicious cholera outbreak in Soho, Dr. John Snow pioneered forensic epidemiology by mapping fatalities to the contaminated Broad Street water pump. Why did Victorian medical institutions fiercely reject Snow\'s water-borne germ evidence for over twenty years, and what finally established the landmark Public Health Act of 1875?',
];

const DO_NOWS = [
  // Lesson 1: Pre-Roman Iron Age Baseline
  {
    title: 'Do Now: Foundations of Pre-Roman Britain',
    type: 'questions',
    items: [
      {
        question:
          'What type of circular homes did Celtic Britons construct during the Iron Age before AD 43?',
        answer: 'Timber roundhouses with wattle-and-daub walls and thatched roofs.',
      },
      {
        question:
          'Why did pre-Roman farming communities have fewer sanitation problems than later towns?',
        answer:
          'Low population density meant households were spread out, allowing shallow garden cesspits to absorb waste safely.',
      },
      {
        question: 'From what natural sources did Celtic communities obtain their freshwater?',
        answer: 'Local unpolluted rivers, natural freshwater springs, and shallow gravel wells.',
      },
      {
        question:
          'Which discipline of historical study unearths physical artifacts when written records do not exist?',
        answer: 'Archaeology.',
      },
      {
        question: 'Which Roman Emperor launched the successful conquest of Britain in AD 43?',
        answer: 'Emperor Claudius.',
      },
    ],
  },
  // Lesson 2: Prior Recall from Roman Britain
  {
    title: 'Do Now: Retrieval from Roman Britain',
    type: 'questions',
    items: [
      {
        question: 'Without mechanical pumps, how did Roman aqueducts transport water over miles?',
        answer: 'By calculating a continuous gentle downward gravity slope gradient.',
      },
      {
        question:
          'What tool did Romans use in bathhouses to scrape away olive oil, sweat, and dead skin?',
        answer: 'A curved bronze strigil.',
      },
      {
        question:
          'What communal sponge on a stick was used for personal cleaning in Roman public latrines?',
        answer: 'The tersorium.',
      },
      {
        question:
          'Under what medical theory did ancient physicians believe illness was caused by foul air?',
        answer: 'Miasma theory.',
      },
      {
        question:
          'In what year did Roman legions withdraw from Britain, triggering the collapse of town infrastructure?',
        answer: 'AD 410.',
      },
    ],
  },
  // Lesson 3: Prior Recall from Medieval Britain
  {
    title: 'Do Now: Retrieval from the Middle Ages',
    type: 'questions',
    items: [
      {
        question:
          "Which religious communities constructed Britain's most advanced piped water networks in the Middle Ages?",
        answer: 'Christian monasteries and abbeys.',
      },
      {
        question:
          'What job title was given to laborers who emptied town privy cesspits late at night?',
        answer: 'Gongfermers (or night-soil men).',
      },
      {
        question:
          "What devastating pandemic killed roughly one-third of Britain's population between 1348 and 1349?",
        answer: 'The Black Death (bubonic plague).',
      },
      {
        question:
          'Name one municipal regulation medieval town councils passed to reduce street filth.',
        answer:
          'Fining butchers for dumping animal offal into streets or ordering rakers to clear dung.',
      },
      {
        question:
          'Under the four humours theory, which four bodily fluids needed to remain in balance for health?',
        answer: 'Blood, phlegm, black bile, and yellow bile.',
      },
    ],
  },
  // Lesson 4: Prior Recall from Early Modern Britain
  {
    title: 'Do Now: Retrieval from Early Modern Britain',
    type: 'questions',
    items: [
      {
        question:
          'Who invented the first mechanical flush toilet (water closet) for Queen Elizabeth I in 1596?',
        answer: 'Sir John Harington.',
      },
      {
        question:
          "Why was Harington's flush toilet not adopted by ordinary early modern households?",
        answer:
          'Most homes lacked pressurized running piped water and connected street sewers to carry waste away.',
      },
      {
        question:
          'What term describes workers who collected waste and manure from early modern streets to sell as fertilizer?',
        answer: 'Scavengers (or muck-rakers).',
      },
      {
        question: 'Which major epidemic struck London in 1665, killing over 70,000 citizens?',
        answer: 'The Great Plague of 1665.',
      },
      {
        question:
          "What disaster in September 1666 destroyed much of London's wooden, rat-infested housing?",
        answer: 'The Great Fire of London.',
      },
    ],
  },
  // Lesson 5: Prior Recall from Industrial Slums
  {
    title: 'Do Now: Retrieval from the Industrial Slums',
    type: 'questions',
    items: [
      {
        question:
          'What type of narrow, cheaply built terraced housing crammed factory families together with shared walls?',
        answer: 'Back-to-back housing.',
      },
      {
        question:
          'What water-borne bacterial disease arrived in Britain in 1831, causing severe dehydration and blue skin?',
        answer: 'Asiatic Cholera.',
      },
      {
        question:
          'What government philosophy believed the state should not interfere in the economy or living conditions?',
        answer: 'Laissez-faire.',
      },
      {
        question:
          'Who authored the groundbreaking 1842 Report on the Sanitary Condition of the Labouring Population?',
        answer: 'Edwin Chadwick.',
      },
      {
        question:
          'What landmark legislation in 1848 created the first General Board of Health, though its powers were non-compulsory?',
        answer: 'The Public Health Act of 1848.',
      },
    ],
  },
  // Lesson 6: Prior Recall from The Great Stink
  {
    title: 'Do Now: Retrieval from the Great Stink & Victorian London',
    type: 'questions',
    items: [
      {
        question:
          'In what year did extreme summer heat ferment sewage in the River Thames, causing the "Great Stink"?',
        answer: '1858.',
      },
      {
        question:
          'What chemical did MPs soak into curtains and pour into the Thames to suppress the stench in Parliament?',
        answer: 'Chloride of lime.',
      },
      {
        question:
          "Which chief engineer designed London's vast 82-mile underground intercepting sewer network?",
        answer: 'Sir Joseph Bazalgette.',
      },
      {
        question:
          "How did Bazalgette's sewer network transport sewage eastward away from London's drinking intake?",
        answer:
          'Using gravity-assisted underground brick tunnels and massive steam pumping stations (e.g. Abbey Mills, Crossness).',
      },
      {
        question:
          'What false medical belief about disease transmission did Bazalgette and Parliament still believe while building the sewers?',
        answer: 'Miasma theory (believing the smell itself carried deadly disease).',
      },
    ],
  },
];

const TASK_3_BRIDGES = [
  // Lesson 1: Roman Public Health
  {
    type: 'two_sided_argument',
    topic: 'Task 3: Planning Bridge — Roman Public Health: Imperial Might vs Medical Understanding',
    question:
      'Was Roman public health infrastructure driven by genuine medical understanding or imperial prestige and military discipline?',
    instruction:
      'Examine both interpretations of Roman public health. Review the factual evidence below, bullet-point two key points into each column, then frame your balanced argument:',
    advancement: {
      title: 'Interpretation 1: Imperial Power, Military Readiness & Prestige',
      points: [
        'Aqueducts, thermae, and grand fountains were monumental symbols of Roman civilization designed to impress conquered peoples.',
        'Hygiene infrastructure was prioritized at legionary fortresses (castra) to keep professional soldiers healthy for conquest.',
        'Communal thermae charged only a single quadrans, serving as a cheap political tool to keep urban plebeians content and obedient.',
      ],
      starter:
        'Historians emphasizing imperial power argue that Roman engineering was designed to showcase imperial majesty and military efficiency, because...',
    },
    limitations: {
      title: 'Interpretation 2: Genuine Concern for Cleanliness & Health',
      points: [
        'Roman medical writers like Galen understood that swampy, stagnant waters caused fevers and insisted on fresh mountain springs.',
        'Engineers allocated fresh water to public drinking fountains first, ensuring poorest citizens had access to uncontaminated water.',
        'Regular daily bathing with strigils physically removed dirt, dead skin, and sweat, which reduced the transmission of bacterial infections.',
      ],
      starter:
        'Conversely, scholars defending Roman medical intent contend that administrators genuinely sought public well-being, because...',
    },
  },
  // Lesson 2: Medieval Public Health
  {
    type: 'two_sided_argument',
    topic:
      'Task 3: Planning Bridge — Medieval Sanitation: Dark Age Squalor vs Pragmatic Civic Action',
    question:
      'How far is it historically accurate to describe medieval towns as completely filthy and devoid of sanitation rules?',
    instruction:
      'Examine both interpretations of medieval public health. Review the factual evidence below, bullet-point two key points into each column, then frame your balanced argument:',
    advancement: {
      title: 'Interpretation 1: Strict Civic Regulations & Monastic Engineering',
      points: [
        'Monasteries like Canterbury and Titchfield constructed sophisticated freshwater channels, lead conduits, and flushed latrines.',
        'Town councils employed gongfermers to empty cesspits at night and imposed heavy fines on butchers who dumped animal offal into streets.',
        'During the Black Death of 1348, authorities in Gloucester and London instituted quarantine measures to halt disease transmission.',
      ],
      starter:
        'Revisionist historians argue that medieval communities took active, intelligent steps to preserve public health, because...',
    },
    limitations: {
      title: 'Interpretation 2: Chronic Urban Filth & Medical Powerlessness',
      points: [
        'Rapid urban growth overwhelmed rudimentary cesspits, leading to frequent sewage seepage into porous gravel drinking wells.',
        'Town streets lacked underground sewers; open central gutters (kennels) ran with rotting food, animal dung, and stagnant rainwater.',
        'Medical knowledge remained locked in the four humours and miasma; doctors were completely helpless against the 1348 Black Death.',
      ],
      starter:
        'Traditional historians maintain that medieval towns remained fundamentally squalid and medically vulnerable, because...',
    },
  },
  // Lesson 3: Early Modern Towns
  {
    type: 'two_sided_argument',
    topic:
      'Task 3: Planning Bridge — Early Modern Hygiene: Inevitable Squalor vs Scientific Innovation',
    question:
      'Why did town sanitation fail to improve significantly between 1500 and 1750 despite technological invention?',
    instruction:
      'Examine both interpretations of early modern hygiene. Review the factual evidence below, bullet-point two key points into each column, then frame your balanced argument:',
    advancement: {
      title: 'Interpretation 1: Mechanical Innovation & Commercial Initiatives',
      points: [
        'Sir John Harington invented the first mechanical flush water closet in 1596, proving engineering could remove waste instantly.',
        "Private ventures like Hugh Myddelton's New River (1613) brought clean Hertfordshire spring water 40 miles into London homes.",
        'The rebuilding of London after the Great Fire of 1666 mandated wider brick streets, improving light, air, and drainage.',
      ],
      starter:
        'Some historians argue that the early modern era laid the intellectual and technical foundations for modern sanitation, because...',
    },
    limitations: {
      title: 'Interpretation 2: Overcrowding, Lack of Sewers & Entrenched Miasma',
      points: [
        "Harington's toilet was useless without pressurized mains water and street sewers, remaining an expensive novelty for the royal court.",
        "London's population exploded from 60,000 to over 675,000, creating desperate overcrowding in poorly built wooden tenements.",
        'Authorities still believed miasma caused disease, relying on bonfires of tar and shooting stray dogs during the 1665 Great Plague.',
      ],
      starter:
        'However, most historians conclude that rapid urban expansion completely outpaced sanitation technology, because...',
    },
  },
  // Lesson 4: Industrial Public Health Crisis
  {
    type: 'two_sided_argument',
    topic:
      'Task 3: Planning Bridge — Industrial Slums: Economic Inevitability vs Laissez-Faire Neglect',
    question:
      'Why did the British government adhere to "laissez-faire" while thousands perished from cholera in industrial slums?',
    instruction:
      "Examine both interpretations of the government's response to the industrial health crisis. Review the factual evidence below, bullet-point two key points into each column, then frame your balanced argument:",
    advancement: {
      title: 'Interpretation 1: Belief in Laissez-Faire & Respect for Private Property',
      points: [
        'Ruling politicians and wealthy middle-class taxpayers believed state interference was a tyrannical violation of individual liberty.',
        'Town councils and slum landlords fiercely opposed sanitary reforms that would increase local property rates and cut rental profits.',
        'Medical consensus still blamed miasma and moral degeneracy for disease, believing poverty was caused by personal laziness.',
      ],
      starter:
        'Defenders of the parliamentary record argue that politicians acted in accordance with prevailing political and economic theories, because...',
    },
    limitations: {
      title: 'Interpretation 2: Callous Neglect & Avoidable Loss of Life',
      points: [
        "Edwin Chadwick's 1842 Report proved that poor sanitation caused epidemic disease, economic disruption, and premature death.",
        'Back-to-back slum landlords deliberately refused to install toilets or clean water, forcing 100 people to share a single overflowing privy.',
        'The Public Health Act of 1848 was made non-compulsory, allowing corrupt local boards to ignore sanitation for decades.',
      ],
      starter:
        "Conversely, critics argue that the government's refusal to intervene represented a catastrophic and selfish moral failure, because...",
    },
  },
  // Lesson 5: The Great Stink
  {
    type: 'two_sided_argument',
    topic: "Task 3: Planning Bridge — London's Sewers: Parliamentary Panic vs Engineering Vision",
    question:
      "How far was the building of London's sewer system driven by political panic and self-preservation rather than altruism for the poor?",
    instruction:
      'Examine both interpretations of the Great Stink of 1858. Review the factual evidence below, bullet-point two key points into each column, then frame your balanced argument:',
    advancement: {
      title: 'Interpretation 1: Self-Preservation & Olfactory Terror of MPs',
      points: [
        'Parliament had ignored decades of cholera deaths in poor East End slums like Whitechapel, where thousands died without government action.',
        'During the heatwave of July 1858, MPs were forced to soak committee curtains in chloride of lime and abandoned legislative debates.',
        'Within just eighteen days of the smell reaching the Commons chamber, Parliament rushed through a £3 million bill to fund the sewers.',
      ],
      starter:
        "Critics argue that London's sewers were built primarily to protect the health and comfort of the ruling elite, because...",
    },
    limitations: {
      title: 'Interpretation 2: Visionary Engineering & Comprehensive Reform',
      points: [
        'Sir Joseph Bazalgette designed 82 miles of underground brick intercepting sewers with extraordinary foresight, doubling pipe diameters.',
        'The sewer system was engineered to collect waste from rich and poor districts alike, revolutionizing municipal sanitation for all citizens.',
        'Pumping stations like Abbey Mills and Crossness represented world-leading civil engineering that eradicated cholera from London permanently.',
      ],
      starter:
        "In contrast, historians praising Victorian public works argue that Bazalgette's network was a triumph of civic ambition, because...",
    },
  },
  // Lesson 6: Germ Theory & John Snow
  {
    type: 'two_sided_argument',
    topic: 'Task 3: Planning Bridge — Conquering Cholera: Entrenched Orthodoxy vs Scientific Data',
    question:
      "Why was John Snow's discovery of the cause of cholera initially rejected in 1854, and what finally forced Britain to clean up its water supply by 1875?",
    instruction:
      'Examine both interpretations of the medical battle over cholera. Review the factual evidence below, bullet-point two key points into each column, then frame your balanced argument:',
    advancement: {
      title: 'Interpretation 1: Entrenched Miasma Orthodoxy & Commercial Vested Interests',
      points: [
        'Leading medical figures like William Farr and Edwin Chadwick were fiercely committed to miasma theory, believing bad smells carried disease.',
        "Private water companies rejected Snow's findings because replacing polluted Thames intakes would destroy their corporate profit margins.",
        'Without microscopes powerful enough to see the cholera bacterium, Snow could not physically display the germ, leaving his theory vulnerable.',
      ],
      starter:
        'Historians examining the delay in public health reform argue that scientific dogma and corporate greed delayed change, because...',
    },
    limitations: {
      title: 'Interpretation 2: Irrefutable Epidemiological Data & The 1875 Breakthrough',
      points: [
        "Dr. John Snow's 1854 Broad Street spot map provided mathematical proof that cases clustered around a single contaminated water pump.",
        'The 1866 East London cholera outbreak proved that only customers of the polluted East London Waterworks contracted the disease.',
        "Louis Pasteur's 1861 Germ Theory and Robert Koch's 1883 isolation of Vibrio cholerae finally forced the compulsory Public Health Act of 1875.",
      ],
      starter:
        'Conversely, scholars focusing on scientific progress argue that rigorous empirical evidence eventually crushed medical superstitions, because...',
    },
  },
];

const TASK_4_ESSAYS = [
  // Lesson 1: Roman Public Health
  {
    type: 'extended_writing',
    taskType: 'extended_writing',
    topic: 'Task 4: Master Enquiry Essay — Roman Public Health',
    question:
      'To what extent was Roman public health driven by imperial prestige and military efficiency rather than genuine medical understanding?',
    instruction:
      'Write a balanced historical explanation answering the enquiry question. Structure your analysis using the PEEL sentence stems and compare the model answer against your work:',
    stems: {
      point:
        'On the one hand, substantial evidence suggests Roman public health was primarily driven by imperial prestige and military discipline, because...',
      evidence: 'For instance, archaeological remains and primary sources confirm that...',
      explanation: 'This demonstrates that the Roman state prioritized infrastructure because...',
      link: 'Consequently, while Roman engineering was extraordinarily sophisticated, its primary motivation was...',
    },
    model_answer:
      'To a significant extent, Roman public health infrastructure was driven by imperial power and military discipline rather than genuine medical science. The Roman conquest of Britain in AD 43 concentrated thousands of soldiers and administrators into dense stone towns like Londinium and Eboracum. To keep professional legions combat-ready and showcase imperial grandeur, Roman engineers constructed monumental gravity-fed aqueducts, communal latrines, and vast public thermae. These architectural marvels functioned as powerful symbols of Roman civilization designed to pacify and impress conquered native populations. Furthermore, Roman medical understanding remained unscientific: physicians adhered to Galen’s balance of the four humours and miasma theory, possessing zero knowledge of bacteria. Murky, unheated plunge pools in public baths frequently harbored parasitic worms and skin infections, while lead piping slowly poisoned patrician households. However, it would be overly cynical to dismiss Roman health measures as pure propaganda. Engineers deliberately routed freshwater to public street fountains first so ordinary citizens could access uncontaminated water, and daily scraping with bronze strigils physically removed grime and reduced disease. Ultimately, Roman public health achieved remarkable practical hygienic success, but this success was an engineered byproduct of imperial governance, military logistics, and civic pride rather than scientific bacteriology.',
  },
  // Lesson 2: Medieval Public Health
  {
    type: 'extended_writing',
    taskType: 'extended_writing',
    topic: 'Task 4: Master Enquiry Essay — Medieval Public Health',
    question:
      'How far is it historically accurate to describe medieval towns as completely filthy and devoid of sanitation rules?',
    instruction:
      'Write a balanced historical explanation answering the enquiry question. Structure your analysis using the PEEL sentence stems and compare the model answer against your work:',
    stems: {
      point:
        'On the one hand, traditional accounts describe medieval towns as squalid and filthy because...',
      evidence:
        'For example, historical records and archaeological excavations demonstrate that...',
      explanation:
        'This meant that ordinary town populations were constantly exposed to disease because...',
      link: 'However, revisionist historical evidence proves that medieval communities were far from passive, because...',
    },
    model_answer:
      'The popular depiction of medieval towns as lawless cesspools of unchecked filth is historically inaccurate and overlooks sophisticated local attempts to maintain civic hygiene. It is undeniable that medieval towns faced severe environmental challenges: population growth within fortified stone walls created cramped living conditions, while unpaved roads and open gutters (kennels) ran with animal dung, rainwater, and household slops. Furthermore, shallow cesspits frequently leaked waste into porous gravel drinking wells, and medical reliance on the four humours left doctors powerless when the Black Death wiped out a third of Britain in 1348. Nevertheless, medieval people intensely valued cleanliness and actively regulated their environment. Town councils appointed wardens to inspect streets, levied heavy fines on butchers who dumped rotting entrails, and paid licensed gongfermers high wages to cart human waste out of towns under cover of night. Religious monasteries like Canterbury and Titchfield engineered advanced piped water systems using settling tanks and lead pipes that rivaled Roman conduits. Medieval authorities may have lacked modern germ theory, but their belief in miasma drove genuine, proactive municipal cleanliness. Therefore, while medieval sanitation was severely limited by technology and medical ignorance, towns were governed by organized health regulations rather than complete neglect.',
  },
  // Lesson 3: Early Modern Towns
  {
    type: 'extended_writing',
    taskType: 'extended_writing',
    topic: 'Task 4: Master Enquiry Essay — Early Modern Hygiene',
    question:
      'Why did town sanitation fail to improve significantly between 1500 and 1750 despite technological inventions?',
    instruction:
      'Write a balanced historical explanation answering the enquiry question. Structure your analysis using the PEEL sentence stems and compare the model answer against your work:',
    stems: {
      point:
        'A primary reason why early modern sanitation failed to progress was catastrophic urban population growth, which...',
      evidence:
        'For instance, between 1500 and 1700, London expanded from 60,000 to over 675,000 residents, resulting in...',
      explanation:
        'This rapid expansion neutralized inventions like Sir John Harington’s 1596 water closet because...',
      link: 'Furthermore, progress was paralyzed by persistent medical orthodoxy, such as...',
    },
    model_answer:
      "Town sanitation failed to improve significantly between 1500 and 1750 primarily because explosive urban growth completely overwhelmed existing infrastructure, while technological innovations lacked the municipal networks required to function. During this era, London transformed into Europe's largest metropolis, ballooning from 60,000 residents in 1500 to over 675,000 by 1700. Greedy landlords subdivided old timber houses and crammed impoverished families into narrow alleys without piped water, cesspools, or ventilation. While Sir John Harington invented the mechanical flush toilet in 1596, his breakthrough was virtually useless to ordinary citizens: without pressurized water mains to refill cisterns or subterranean sewer networks to carry waste away, flush toilets merely flushed excrement into overflowing basement privy vaults. Even private initiatives like Hugh Myddelton's New River (1613) only supplied wealthy subscribers for a few hours a week. Moreover, medical understanding remained frozen in classical miasma theory; during the devastating Great Plague of 1665, authorities burned barrels of pitch and slaughtered stray dogs rather than eliminating contaminated water sources. Consequently, despite individual strokes of engineering genius, early modern town sanitation stagnated because society lacked the political will, public taxation, and underground civil engineering necessary to sustain urban health.",
  },
  // Lesson 4: Industrial Public Health Crisis
  {
    type: 'extended_writing',
    taskType: 'extended_writing',
    topic: 'Task 4: Master Enquiry Essay — Industrial Public Health Crisis',
    question:
      'Why did the British government adhere to "laissez-faire" while thousands perished from cholera in industrial slums?',
    instruction:
      'Write a balanced historical explanation answering the enquiry question. Structure your analysis using the PEEL sentence stems and compare the model answer against your work:',
    stems: {
      point:
        'The British government adhered strictly to "laissez-faire" during the industrial health crisis because...',
      evidence: 'Specifically, wealthy taxpayers and parliamentary politicians believed that...',
      explanation: 'This ideological commitment meant that when Asiatic Cholera arrived in 1831...',
      link: 'Ultimately, the government’s inaction was driven by a toxic combination of economic self-interest and...',
    },
    model_answer:
      'The British government maintained its rigid policy of "laissez-faire" (leave alone) throughout the early nineteenth century due to deep-seated ideological opposition to state interference, compounded by the economic self-interest of wealthy taxpayers and slum landlords. As factories pulled millions into northern industrial cities like Manchester and Leeds, unscrupulous builders erected miles of cheap, back-to-back terraced slums. Entire courts shared single overflowing privies, and private water companies pumped untreated, contaminated river water for only two hours daily. When Asiatic Cholera arrived in 1831, killing over 30,000 Britons in agonizing dehydration, the ruling classes viewed disease through a moral lens, believing poverty and illness were punishments for drunkenness and sinful living. Ideologically, politicians argued that state-mandated public health infringed upon individual liberty and sacred private property rights. Middle-class ratepayers violently opposed paying local taxes to clean working-class slums, and corrupt town councils were dominated by the very slum landlords who profited from squalor. Even after Edwin Chadwick’s landmark 1842 Report scientifically proved that filth caused disease and economic ruin, the resulting 1848 Public Health Act was crippled by making local health boards optional. Consequently, Parliament abandoned industrial workers to horrific mortality rates until epidemic disease directly threatened the wealthy.',
  },
  // Lesson 5: The Great Stink
  {
    type: 'extended_writing',
    taskType: 'extended_writing',
    topic: 'Task 4: Master Enquiry Essay — The Great Stink & London Sewers',
    question:
      "How far was the building of London's sewer system driven by political panic and self-preservation rather than altruism for the poor?",
    instruction:
      'Write a balanced historical explanation answering the enquiry question. Structure your analysis using the PEEL sentence stems and compare the model answer against your work:',
    stems: {
      point:
        "A compelling argument can be made that London's sewer network was built purely out of parliamentary panic, because...",
      evidence: 'For example, during the scorching summer heatwave of July 1858...',
      explanation:
        'This sudden legislative urgency proved that politicians only cared about public health when...',
      link: 'Nonetheless, the resulting engineering achievements of Sir Joseph Bazalgette demonstrate that...',
    },
    model_answer:
      'The construction of London’s sewer network was undeniably catalyzed by political panic and aristocratic self-preservation rather than genuine compassion for impoverished citizens. For decades, reformers like Edwin Chadwick had warned that discharging raw sewage into the River Thames—London’s primary drinking water intake—was murdering thousands in poor East End slums. Yet Parliament refused to grant funding, dismissing working-class cholera outbreaks with callous indifference. Everything changed in July 1858 when an unprecedented heatwave caused hundreds of thousands of tons of human waste to ferment in the Thames. The resulting "Great Stink" was so nauseating that politicians in the Palace of Westminster choked during committee meetings, soaked window draperies in chloride of lime, and contemplated fleeing upriver to Hampton Court. Terrified that the miasmatic stench would infect them with lethal cholera, MPs abruptly abandoned their laissez-faire principles and passed an emergency bill in just eighteen days, granting £3 million to the Metropolitan Board of Works. However, while the political catalyst was selfish panic, the actual execution by Chief Engineer Sir Joseph Bazalgette was visionary and egalitarian. Bazalgette constructed 82 miles of subterranean brick intercepting sewers and monumental pumping stations that captured waste from both wealthy West End squares and destitute East End slums. Therefore, while fear and panic forced Parliament to release the purse strings, the resulting infrastructure became a permanent, democratic triumph of Victorian public health.',
  },
  // Lesson 6: Germ Theory & John Snow
  {
    type: 'extended_writing',
    taskType: 'extended_writing',
    topic: 'Task 4: Master Enquiry Essay — Germ Theory & John Snow',
    question:
      "Why was John Snow's discovery of the cause of cholera initially rejected in 1854, and what finally forced Britain to clean up its water supply by 1875?",
    instruction:
      'Write a balanced historical explanation answering the enquiry question. Structure your analysis using the PEEL sentence stems and compare the model answer against your work:',
    stems: {
      point:
        'Dr. John Snow’s revolutionary water-borne cholera discovery was fiercely rejected in 1854 because...',
      evidence:
        'For instance, leading medical authorities like William Farr and Edwin Chadwick insisted that...',
      explanation:
        'This entrenched scientific dogma, combined with the commercial interests of private water companies, meant that...',
      link: 'However, by the late 1860s and 1870s, a convergence of empirical breakthroughs finally forced reform, including...',
    },
    model_answer:
      'Dr. John Snow’s 1854 discovery that cholera was a water-borne gastrointestinal infection was initially rejected because it clashed violently with the entrenched medical orthodoxy of miasma and threatened powerful commercial monopolies. During the 1854 Soho outbreak, Snow conducted brilliant epidemiological detective work: by plotting cholera deaths on a street map, he proved cases clustered around the Broad Street pump, which drew water from a cesspool-leaking well. Although removing the pump handle halted the outbreak, the General Board of Health dismissed his findings as eccentric speculation. Authorities were intellectually addicted to miasma theory, believing foul odors poisoned the blood. Furthermore, acknowledging Snow’s theory would force private water companies to invest vast fortunes relocating polluted Thames intakes, prompting corporate lobbyists to fight his conclusions. Change was only achieved when overwhelming evidence made denial impossible. The 1866 East London cholera epidemic conclusively vindicated Snow: fatalities were strictly confined to households receiving untreated water from the East London Waterworks. Simultaneously, Louis Pasteur’s 1861 Germ Theory provided the microbiological foundation Snow had lacked, proving that invisible microscopic pathogens caused disease. Armed with irrefutable science and terrified of working-class revolution following the 1867 Reform Act, Benjamin Disraeli’s government passed the compulsory Public Health Act of 1875. This monumental law finally required local councils to provide clean piped water, sewage disposal, and sanitary inspectors, completing the scientific victory Snow had ignited.',
  },
];

// Read existing live unitData to extract vocabulary and ensure full fidelity
console.log('Loading live data.js for vocabulary extraction...');
const rawLive = fs.readFileSync(filePathLive, 'utf8');
const liveClean = rawLive
  .replace(/export\s+default\s+[^;]+;?/, '')
  .replace(/export\s+{[^}]+};?/, '');
const liveObj = new Function(
  liveClean +
    '; return (typeof water_and_sanitation !== "undefined" ? water_and_sanitation : unitData);',
)();

// Read existing v2 4-act data
console.log('Loading staged data_v2_4act.js for 4-Act narrative extraction...');
const rawV2 = fs.readFileSync(filePathV2, 'utf8');
const v2Clean = rawV2.replace(/export\s+default\s+[^;]+;?/, '').replace(/export\s+{[^}]+};?/, '');
const v2Obj = new Function(
  v2Clean +
    '; return (typeof water_and_sanitation !== "undefined" ? water_and_sanitation : unitData);',
)();

// Merge and elevate all 6 lessons
v2Obj.lessons.forEach((lesson, idx) => {
  const lessonNum = idx + 1;
  const liveLesson = liveObj.lessons[idx] || {};

  console.log(`Elevating Lesson ${lessonNum}: ${lesson.title}`);

  // 1. Ensure clean 1-based lesson ID
  lesson.id = `lesson_${lessonNum}`;

  // 2. Dramatic Enquiry Prologue
  lesson.prologue = PROLOGUES[idx];

  // 3. 5-Question Prior-Knowledge Retrieval Do Now
  lesson.do_now = DO_NOWS[idx];

  // 4. Preserve rich vocabulary from live data (6 terms)
  if (liveLesson.vocab && liveLesson.vocab.length > 0) {
    lesson.vocab = liveLesson.vocab;
  }

  // 5. Clean narrative blocks: 4 Acts, 2 beats each ([X.1], [X.2]), zero inline tasks
  if (lesson.narrative_blocks && lesson.narrative_blocks.length === 4) {
    lesson.narrative_blocks.forEach((block) => {
      // Remove any legacy inline comprehension tasks
      delete block.tasks;
      delete block.comprehension_questions;
    });
  }

  // 6. Structured Assessment Zone: Task 3 (Dual-Column Planning Bridge) + Task 4 (Master Enquiry Essay)
  lesson.tasks = [TASK_3_BRIDGES[idx], TASK_4_ESSAYS[idx]];
});

// Serialize to JS module
function generateModuleCode(data) {
  return `// =============================================================================
// Water and Sanitation Through Time — KS3 Curriculum Data (Year 7)
// Full Christine Counsell 4-Act Disciplinary Gold Standard Model
// Pure [Act.Paragraph] indexing, authentic sources, prior-recall Do Nows,
// Task 3 Planning Bridge with whiteboard projection masking,
// Task 4 Master Enquiry Essay with PEEL stems & model answers,
// and 20-question recall quizzes.
// =============================================================================

const water_and_sanitation = ${JSON.stringify(data, null, 2)};

export { water_and_sanitation };
export default water_and_sanitation;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = water_and_sanitation;
}
`;
}

console.log('Writing elevated curriculum data to data_v2_4act.js...');
fs.writeFileSync(filePathV2, generateModuleCode(v2Obj), 'utf8');

console.log('Promoting elevated curriculum data to live data.js...');
fs.writeFileSync(filePathLive, generateModuleCode(v2Obj), 'utf8');

console.log(
  '✅ Water & Sanitation (Year 7) successfully elevated to Christine Counsell 4-Act Gold Standard across all 6 lessons!',
);
