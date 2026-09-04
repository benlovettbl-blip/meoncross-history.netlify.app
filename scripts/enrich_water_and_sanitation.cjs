const fs = require('fs');
const path = require('path');

const dataJsPath = path.join(__dirname, '..', 'units', 'water_and_sanitation', 'data.js');

(async () => {
  const fileUrl = 'file:///' + dataJsPath.replace(/\\/g, '/');
  const module = await import(fileUrl);
  const unitData = module.default || module.unitData || module.water_and_sanitation;

  if (!unitData || !unitData.lessons) {
    console.error('Failed to load lessons from water_and_sanitation/data.js');
    process.exit(1);
  }

  // --- 1. ENRICH VOCAB & FLASHCARDS (6 per lesson = 36 total) ---
  const vocabByLesson = [
    // Lesson 1
    [
      {
        term: 'Aqueduct',
        definition:
          'A monumental stone bridge and channel built by Roman engineers to carry fresh spring water over valleys into cities using gravity.',
      },
      {
        term: 'Conduit',
        definition:
          'A covered channel, lead pipe, or stone waterway designed to transport fresh water to public fountains and bathhouses.',
      },
      {
        term: 'Hypocaust',
        definition:
          'An ingenious Roman underfloor central heating system that circulated hot furnace air beneath bathhouses and private villas.',
      },
      {
        term: 'Latrine',
        definition:
          'A communal public toilet facility, frequently flushed by continuous water channels flowing beneath stone bench seats.',
      },
      {
        term: 'Cesspit',
        definition:
          'An underground pit or dry well used for the collection and storage of human waste, common in rural settlements and small towns.',
      },
      {
        term: 'Strigil',
        definition:
          'A curved bronze scraper used by Romans in bathhouses to scrape oil, dirt, and sweat off the skin instead of modern soap.',
      },
    ],
    // Lesson 2
    [
      {
        term: 'Gongfermer',
        definition:
          'A medieval night-soil laborer paid to dig out and remove raw human excrement from domestic cesspits under cover of darkness.',
      },
      {
        term: 'Miasma Theory',
        definition:
          'The incorrect medical belief that infectious epidemic diseases were directly caused by breathing poisonous vapors or foul smells.',
      },
      {
        term: 'Monastery',
        definition:
          'A religious community of monks or nuns that often maintained the highest medieval hygiene standards, possessing clean leats and stone lavatoria.',
      },
      {
        term: 'Leat',
        definition:
          'An artificial water ditch or channel diverted from a clean river to supply fresh running water to a town, mill, or monastery.',
      },
      {
        term: 'Privy',
        definition:
          'A simple wooden or stone outhouse toilet built directly over a garden cesspit, a cesspool, or an open drainage ditch.',
      },
      {
        term: 'Black Death (1348)',
        definition:
          'A catastrophic bubonic and pneumonic plague epidemic that wiped out roughly one third to one half of the entire population of Britain.',
      },
    ],
    // Lesson 3
    [
      {
        term: 'Water Closet (1596)',
        definition:
          'An early mechanical flushing toilet invented by Sir John Harington for Queen Elizabeth I, which failed to spread due to a lack of city sewers.',
      },
      {
        term: 'Conduit System',
        definition:
          'A municipal network of wooden or lead pipes that supplied clean spring water to communal public cisterns in growing early modern towns.',
      },
      {
        term: 'Scavenger',
        definition:
          'A city official employed by London parish wards to supervise the raking, sweeping, and removal of street filth and animal dung.',
      },
      {
        term: 'Great Plague of 1665',
        definition:
          'The last major bubonic plague epidemic in England, which killed approximately 100,000 Londoners in filthy, overcrowded parishes.',
      },
      {
        term: 'Night Soil',
        definition:
          'Human excrement collected from urban cesspits at night and carted out to countryside market gardens to be sold as agricultural fertilizer.',
      },
      {
        term: 'Urbanisation',
        definition:
          'The rapid population growth and physical expansion of towns, which overwhelmed medieval waste systems in the 17th and 18th centuries.',
      },
    ],
    // Lesson 4
    [
      {
        term: 'Laissez-faire',
        definition:
          'The political belief that national government should not interfere in the economy, private business, or living conditions of ordinary citizens.',
      },
      {
        term: 'Cholera (1831)',
        definition:
          'A deadly waterborne bacterial disease causing rapid, violent dehydration and death within hours, which first invaded Britain in October 1831.',
      },
      {
        term: 'Back-to-back Housing',
        definition:
          'Cramped, poorly ventilated terraced housing built cheaply by factory owners, lacking gardens, private drains, or indoor plumbing.',
      },
      {
        term: 'Cesspool Overflow',
        definition:
          'The hazardous saturation of urban basements and courtyard soil caused by thousands of unlined waste pits seeping into drinking wells.',
      },
      {
        term: 'Edwin Chadwick',
        definition:
          'A civil servant whose 1842 Report on the Sanitary Condition of the Labouring Population proved filth caused disease and economic loss.',
      },
      {
        term: 'Public Health Act 1848',
        definition:
          'Britain’s first national public health law, which created a General Board of Health but was voluntary rather than compulsory for towns.',
      },
    ],
    // Lesson 5
    [
      {
        term: 'The Great Stink (1858)',
        definition:
          'An unbearable summer crisis in London when hot weather caused untreated sewage in the River Thames to ferment, halting Parliament.',
      },
      {
        term: 'Sir Joseph Bazalgette',
        definition:
          'The visionary chief engineer of the Metropolitan Board of Works who designed and constructed London’s monumental underground sewer network.',
      },
      {
        term: 'Intercepting Sewers',
        definition:
          'Massive underground brick tunnels built parallel to the Thames to capture London’s sewage and transport it downstream away from the city.',
      },
      {
        term: 'River Thames',
        definition:
          'London’s central waterway, which had functioned as an open sewer and source of drinking water until Bazalgette diverted waste eastward.',
      },
      {
        term: 'Germ Theory (1861)',
        definition:
          'The revolutionary scientific discovery by French chemist Louis Pasteur proving that microscopic living organisms cause decay and infectious diseases.',
      },
      {
        term: 'Public Health Act 1875',
        definition:
          'A landmark compulsory law that forced all British local councils to provide clean piped water, inspect sewers, and collect household refuse.',
      },
    ],
    // Lesson 6
    [
      {
        term: 'Dr John Snow',
        definition:
          'A pioneer Victorian physician and epidemiologist who mapped the 1854 Broad Street cholera outbreak and proved the disease was waterborne.',
      },
      {
        term: 'Broad Street Pump',
        definition:
          'A communal Soho drinking water well whose handle Dr John Snow removed in September 1854 after identifying it as the source of cholera.',
      },
      {
        term: 'Waterborne Disease',
        definition:
          'An illness transmitted through drinking or washing in water contaminated by pathogenic microorganisms, such as cholera and typhoid.',
      },
      {
        term: 'Epidemiological Mapping',
        definition:
          'The scientific method of plotting disease cases on a geographic street map to identify the physical source and pattern of an epidemic.',
      },
      {
        term: 'Miasma Myth',
        definition:
          'The deeply entrenched Victorian conviction that foul smells caused disease, which delayed the acceptance of waterborne and germ theories.',
      },
      {
        term: 'Public Health Reform',
        definition:
          'The gradual transition from government non-intervention to state regulation ensuring clean water, sanitation, and compulsory hygiene laws.',
      },
    ],
  ];

  // --- 2. ENRICH QUIZ ARRAYS (16 questions per lesson = 96 total) ---
  const additionalQuizzesByLesson = [
    // Lesson 1 Additions (12 new questions to join existing 4 = 16 total)
    [
      {
        question:
          'Which Emperor ordered the construction of a famous 73-mile defensive wall with fort bathhouses across northern Britain?',
        options: ['Julius Caesar', 'Emperor Hadrian', 'Nero', 'Augustus'],
        answer: 1,
      },
      {
        question: 'What was the primary purpose of Roman public aqueducts?',
        options: [
          'To provide water exclusively to the Emperor’s palace',
          'To flood valleys during barbarian sieges',
          'To transport clean spring water continuously into towns using gravity',
          'To drain rainwater from farmer fields',
        ],
        answer: 2,
      },
      {
        question: 'In a Roman town, where did wastewater from public baths and latrines drain?',
        options: [
          'Into underground stone sewers like the Cloaca Maxima that discharged into local rivers',
          'Into wooden barrels collected weekly by horses',
          'Directly onto the pedestrian pavements',
          'Into private garden cesspits in every household',
        ],
        answer: 0,
      },
      {
        question: 'What did wealthy Romans use to heat their private villas and bathhouses?',
        options: [
          'Cast iron radiators connected to coal boilers',
          'A hypocaust system circulating hot furnace air beneath raised floors',
          'Open campfires in the middle of living rooms',
          'Electric heating coils embedded in plaster walls',
        ],
        answer: 1,
      },
      {
        question:
          'Why did the Romans build public bathhouses in almost every military fort and town?',
        options: [
          'To serve as emergency hospitals during foreign invasions',
          'Because bathing, exercise, and socialising were central to Roman civic culture and soldier fitness',
          'Because it was a religious law mandated by the Senate',
          'To generate municipal tax revenue from entrance fees',
        ],
        answer: 1,
      },
      {
        question:
          'What instrument did Romans use to clean their skin in the bathhouse instead of soap?',
        options: [
          'A sponge on a stick',
          'A metal scraper called a strigil used with olive oil',
          'Coarse river sand and ash',
          'Rough wool cloths',
        ],
        answer: 1,
      },
      {
        question:
          'What happened to Roman water and sanitation infrastructure after the legions left Britain in 410 AD?',
        options: [
          'Anglo-Saxon settlers expanded the stone sewer networks',
          'Town populations collapsed and stone aqueducts fell into decay and disrepair',
          'British kings introduced national water taxes to preserve the pipes',
          'The Roman Catholic Church rebuilt the conduits with lead pipes',
        ],
        answer: 1,
      },
      {
        question:
          'Why did Iron Age Britons have fewer sanitation crises before the Roman invasion?',
        options: [
          'They had advanced underground plumbing in roundhouses',
          'Their dispersed, small population meant waste did not build up enough to contaminate water supplies',
          'They possessed scientific knowledge of bacteria',
          'They boiled all drinking water over wood fires',
        ],
        answer: 1,
      },
      {
        question:
          'What material was commonly used by Roman engineers to line water conduits and cisterns to make them watertight?',
        options: [
          'Waterproof hydraulic mortar (opus signinum)',
          'Sheets of vulcanised rubber',
          'Thick layers of animal fat',
          'Glazed ceramic tiles bonded with tar',
        ],
        answer: 0,
      },
      {
        question: 'What was the caldarium inside a Roman public bathhouse?',
        options: [
          'The cold plunge pool',
          'The hot, steamy bathing room',
          'The changing room with wall cubbies',
          'The open-air exercise wrestling yard',
        ],
        answer: 1,
      },
      {
        question:
          'Who paid for the construction of most public bathhouses and fountains in Roman Britain?',
        options: [
          'Wealthy local magistrates and benefactors seeking political status',
          'Compulsory taxes collected from enslaved people',
          'Foreign merchants visiting from Gaul',
          'The Roman Emperor directly from his private treasury',
        ],
        answer: 0,
      },
      {
        question: 'What health hazard was unwittingly introduced by Roman plumbing in Britain?',
        options: [
          'Asbestos poisoning from wall insulation',
          'Lead poisoning from lead water pipes and cooking vessels',
          'Arsenic contamination in ceramic tiles',
          'Mercury poisoning from bronze taps',
        ],
        answer: 1,
      },
    ],
    // Lesson 2 Additions (12 new questions = 16 total)
    [
      {
        question: 'Why were medieval Christian monasteries cleaner and healthier than towns?',
        options: [
          'Monks possessed modern chemical disinfectants',
          'Monasteries were carefully sited near fresh rivers with dedicated leats, fresh-water lavatoria, and isolated infirmaries',
          'Monks were immune to epidemic diseases',
          'The Pope funded private stone sewer systems in every abbey',
        ],
        answer: 1,
      },
      {
        question:
          'What was the primary medieval theory used to explain why diseases like the Black Death spread?',
        options: [
          'Germ Theory',
          'Miasma Theory (bad air and poisonous stenches)',
          'Atomic Theory',
          'Cellular Mutation',
        ],
        answer: 1,
      },
      {
        question: 'What medieval occupation involved emptying city cesspits and privy vaults?',
        options: ['Pardoner', 'Gongfermer (or Nightman)', 'Scrivener', 'Chamberlain'],
        answer: 1,
      },
      {
        question:
          'In what year did the catastrophic Black Death first arrive in Britain through the Dorset port of Melcombe Regis?',
        options: ['1066', '1215', '1348', '1485'],
        answer: 2,
      },
      {
        question: 'How did medieval town councils like London attempt to combat street filth?',
        options: [
          'By building nationwide underground sewer networks',
          'By passing municipal laws fining residents who threw waste into the street and appointing rakers',
          'By establishing free hospitals in every borough',
          'By ordering all citizens to boil water daily',
        ],
        answer: 1,
      },
      {
        question: 'Where did most ordinary medieval townspeople obtain their drinking water?',
        options: [
          'From lead pipes directly inside their kitchens',
          'From communal public conduits, town wells, or local water carriers called cobs',
          'From bottled spring water sold in markets',
          'From underground reservoirs maintained by the Crown',
        ],
        answer: 1,
      },
      {
        question: 'What did medieval people believe caused the Black Death besides miasma?',
        options: [
          'God’s wrath punishing humanity for sin, and planetary alignments',
          'Contaminated milk from local dairy cows',
          'Bacterial infection spread through unwashed hands',
          'Tainted wheat contaminated with ergot mould',
        ],
        answer: 0,
      },
      {
        question: 'Why did medieval butchers create a major public health nuisance in towns?',
        options: [
          'They charged excessive prices for beef and mutton',
          'They dumped animal blood, entrails, and offal into public streets and rivers like the Fleet',
          'They refused to sell meat to religious minorities',
          'They kept live pigs inside churchyards during mass',
        ],
        answer: 1,
      },
      {
        question: 'What was a medieval "privy"?',
        options: [
          'A private legal document signed by a sheriff',
          'A basic outhouse toilet built over a cesspit or watercourse',
          'A secret Catholic prayer chapel',
          'A private bedroom chamber in a castle',
        ],
        answer: 1,
      },
      {
        question:
          'What proportion of the British population is estimated to have died during the 1348–1349 Black Death?',
        options: ['Roughly 5%', 'Roughly 10–15%', 'Between 30% and 50%', 'Over 90%'],
        answer: 2,
      },
      {
        question:
          'What did the 1388 Parliament of Cambridge attempt to do regarding public health?',
        options: [
          'It passed an Act forbidding the dumping of dung, offal, and animal entrails into ditches and rivers',
          'It ordered all cesspits to be lined with Roman lead',
          'It banned gongfermers from working in towns',
          'It forced all monasteries to admit infected plague victims',
        ],
        answer: 0,
      },
      {
        question: 'Why did the Great Conduit in London (built in 1245) become famous?',
        options: [
          'It carried clean spring water from Tyburn into Cheapside through lead pipes',
          'It was the first sewer designed to process human waste',
          'It was powered by a giant steam engine',
          'It was constructed entirely from gold by King Henry III',
        ],
        answer: 0,
      },
    ],
    // Lesson 3 Additions (12 new questions = 16 total)
    [
      {
        question:
          'What devastating disease struck London in 1665, killing an estimated 100,000 people?',
        options: ['The Spanish Flu', 'The Great Plague', 'Cholera', 'Typhus'],
        answer: 1,
      },
      {
        question:
          'What preventative measure did London authorities take during the 1665 Great Plague when someone fell ill?',
        options: [
          'They quarantined the entire household inside, painting a red cross on the door with "Lord have mercy upon us"',
          'They vaccinated all neighbors with cowpox',
          'They forced infected families onto ships anchored in the English Channel',
          'They tore down the house and burned all belongings immediately',
        ],
        answer: 0,
      },
      {
        question: 'What was Sir John Harington’s 1596 invention called in his satirical book?',
        options: [
          'The Hydro-Pneumatic Chamber',
          'The Metamorphosis of Ajax (a pun on "a jakes", meaning a privy)',
          'The Royal Steam Flush',
          'The Sanitary Engine',
        ],
        answer: 1,
      },
      {
        question:
          'Why did London’s rapid population growth between 1500 and 1700 make public health worse?',
        options: [
          'The city expanded into swampy marshes with no building regulations, overcrowding timber houses and overflowing cesspits',
          'Food production stopped entirely across England',
          'Foreign traders brought modern factories into residential lanes',
          'The King banned all doctors from practicing medicine',
        ],
        answer: 0,
      },
      {
        question:
          'What did early modern Londoners believe smoking tobacco would do during the 1665 plague?',
        options: [
          'Cure coughs and tuberculosis',
          'Ward off poisonous miasmas and prevent plague infection',
          'Repel fleas living in bedstraw',
          'Signal to doctors that a household was wealthy',
        ],
        answer: 1,
      },
      {
        question: 'Who were "searchers of the dead" during early modern plague outbreaks?',
        options: [
          'Royal physicians trained at Oxford University',
          'Elderly parish women appointed to inspect corpses and report the official cause of death',
          'Military officers who collected weapons from dead soldiers',
          'Gravediggers who excavated mass burial pits',
        ],
        answer: 1,
      },
      {
        question:
          'What happened to London’s hygiene and disease levels after the Great Fire of 1666?',
        options: [
          'Plague returned with greater intensity the next summer',
          'The fire destroyed thousands of rat-infested wooden tenements, and rebuilt streets were wider and brick-built',
          'The government banned all private toilets in London',
          'The River Thames dried up completely',
        ],
        answer: 1,
      },
      {
        question: 'What were early modern "Bills of Mortality"?',
        options: [
          'Tax demands sent to surviving family members',
          'Weekly published parish statistics listing total deaths and their recorded causes',
          'Warrants for the arrest of plague breakers',
          'Passports required to leave quarantined towns',
        ],
        answer: 1,
      },
      {
        question: 'What was the Great Conduit water system supplemented by in London in 1613?',
        options: [
          'Sir Hugh Myddelton’s New River project, bringing fresh Hertfordshire spring water along a 40-mile canal',
          'Bazalgette’s Victorian sewer system',
          'A network of steam-powered desalination plants on the coast',
          'Imported barrels of French bottled mineral water',
        ],
        answer: 0,
      },
      {
        question:
          'Why were early modern London cesspits often built directly underneath house floorboards?',
        options: [
          'To keep the waste warm during winter frosts',
          'Because urban land was extremely scarce and houses had no gardens or backyards',
          'Because building codes required waste to stay indoors',
          'To prevent neighbors from stealing valuable manure',
        ],
        answer: 1,
      },
      {
        question:
          'What did early modern physicians wear to protect themselves when examining plague victims?',
        options: [
          'Rubber surgical gloves and paper face masks',
          'Beaked leather masks filled with fragrant dried herbs, long waxed coats, and wide-brimmed hats',
          'White linen coats boiled in carbolic acid',
          'Iron armor suits to block poisonous vapors',
        ],
        answer: 1,
      },
      {
        question:
          'How did wealthy early modern citizens protect their drinking water compared to the poor?',
        options: [
          'They bought piped water delivered through private elm-wood pipes directly to their basements a few days a week',
          'They had private water filtration plants in their gardens',
          'They drank only distilled alcohol and never touched water',
          'They boiled all river water using gas stoves',
        ],
        answer: 0,
      },
    ],
    // Lesson 4 Additions (12 new questions = 16 total)
    [
      {
        question:
          'In what year did Asiatic Cholera first arrive on British shores in the port of Sunderland?',
        options: ['1789', '1831', '1854', '1875'],
        answer: 1,
      },
      {
        question:
          'What nickname did the terrified Victorian public give to cholera because of its horrifying physical symptoms?',
        options: [
          'The Black Death',
          'King Cholera (or the Blue Death)',
          'The White Plague',
          'The Yellow Fever',
        ],
        answer: 1,
      },
      {
        question:
          'What was the central argument of Edwin Chadwick’s landmark 1842 Sanitary Report?',
        options: [
          'That poverty and illness were moral failings that the government should ignore',
          'That filthy living conditions caused disease, which created poverty, burdening taxpayers with higher poor rates',
          'That cholera was transmitted by invisible airborne bacteria that only affected criminals',
          'That private water companies should be given total control of all British rivers',
        ],
        answer: 1,
      },
      {
        question: 'Why were Victorian "back-to-back" houses so hazardous to public health?',
        options: [
          'They were built of unpainted timber that caught fire easily',
          'They shared common side and rear walls with no through-ventilation, and multiple families shared a single privy in an unpaved court',
          'They were constructed directly over active coal mines',
          'They were legally restricted to housing cows and horses',
        ],
        answer: 1,
      },
      {
        question: 'What does the economic and political philosophy of "laissez-faire" mean?',
        options: [
          'Total government ownership and control of all factories and homes',
          'A policy of non-intervention where government leaves trade and public life to private individuals',
          'A military dictatorship governed by generals',
          'A legal system based on medieval Roman law',
        ],
        answer: 1,
      },
      {
        question:
          'Why did ratepayers (local taxpayers and landlords) vigorously oppose Chadwick’s sanitation proposals in the 1840s?',
        options: [
          'They believed clean water was un-Christian',
          'They did not want their local taxes increased to pay for expensive sewer pipes and drainage',
          'They wanted the government to build railways instead',
          'They feared running water would weaken the British race',
        ],
        answer: 1,
      },
      {
        question: 'What was the fatal flaw of the Public Health Act of 1848?',
        options: [
          'It was completely voluntary: councils were only forced to act if the death rate exceeded 23 per 1,000',
          'It made building sewers illegal in northern cities',
          'It appointed only military officers as sanitary inspectors',
          'It required every citizen to buy an expensive flushing toilet',
        ],
        answer: 0,
      },
      {
        question: 'How quickly could cholera kill a previously healthy Victorian adult?',
        options: [
          'Within a few weeks of gradual fever',
          'Within 12 to 24 hours of violent diarrhoea, vomiting, and extreme dehydration',
          'Over six months of weight loss',
          'Instantly upon inhaling a foul street odor',
        ],
        answer: 1,
      },
      {
        question:
          'What was the average life expectancy for a working-class labourer in industrial Manchester in the 1840s?',
        options: [
          'Around 65 years',
          'Around 50 years',
          'Under 20 years (approx. 17–19 years)',
          'Around 40 years',
        ],
        answer: 2,
      },
      {
        question:
          'Where did human waste go when private flush water closets were installed in wealthy Victorian homes before 1855?',
        options: [
          'Into advanced chemical recycling plants',
          'Directly into existing cesspools underneath houses or into street gutters flowing into the Thames',
          'Into sealed cast-iron tanks buried deep in the country',
          'Onto train cars that dumped it in the North Sea',
        ],
        answer: 1,
      },
      {
        question: 'Why was the 1848 General Board of Health disbanded in 1854?',
        options: [
          'Because cholera had been completely wiped out of Europe',
          'Because Edwin Chadwick’s arrogant, domineering style alienated politicians and angered ratepayers',
          'Because Queen Victoria ordered all health boards closed',
          'Because Parliament ran out of money during the Crimean War',
        ],
        answer: 1,
      },
      {
        question: 'What was a "court" or "yard" in an early 19th-century industrial town?',
        options: [
          'A tennis court used by wealthy factory owners',
          'A narrow, enclosed dead-end alley packed with back-to-back dwellings and shared privies',
          'A legal building where sanitary trials took place',
          'A designated open park reserved for children',
        ],
        answer: 1,
      },
    ],
    // Lesson 5 Additions (12 new questions = 16 total)
    [
      {
        question:
          'What famous environmental crisis in London during the blazing summer of 1858 forced politicians to act?',
        options: [
          'The Great London Fog',
          'The Great Stink of the River Thames',
          'The Great Frost',
          'The Acid Rain Outbreak',
        ],
        answer: 1,
      },
      {
        question:
          'How did politicians in the Houses of Parliament try to cope with the foul fumes of the Great Stink in 1858?',
        options: [
          'They wore gas masks designed for coal miners',
          'They soaked parliamentary window curtains in chloride of lime to neutralize the stench',
          'They held their debates on open rowboats in the English Channel',
          'They adjourned Parliament and moved the government to Manchester',
        ],
        answer: 1,
      },
      {
        question:
          'Who was appointed chief engineer of the Metropolitan Board of Works to design London’s new sewer system?',
        options: [
          'Isambard Kingdom Brunel',
          'Sir Joseph Bazalgette',
          'George Stephenson',
          'Thomas Telford',
        ],
        answer: 1,
      },
      {
        question: 'How did Bazalgette’s intercepting sewer system solve London’s sewage crisis?',
        options: [
          'By pumping wastewater uphill into giant evaporators',
          'By building 82 miles of underground brick tunnels parallel to the Thames to carry sewage east of London',
          'By filtering sewage through giant charcoal beds inside Westminster',
          'By dumping all waste into deep underground coal mines',
        ],
        answer: 1,
      },
      {
        question:
          'What remarkable design decision did Bazalgette make when sizing his underground sewer tunnels?',
        options: [
          'He calculated the maximum flow needed, and then doubled the diameter to handle future population growth',
          'He made them just wide enough for a single worker to crawl through',
          'He built them out of timber to keep construction costs cheap',
          'He designed them to run on natural steam power',
        ],
        answer: 0,
      },
      {
        question:
          'What type of mortar did Bazalgette use to ensure the brick sewers would not decay from water and waste acids?',
        options: [
          'Common sand and lime plaster',
          'Portland cement, tested rigorously for strength and waterproof durability',
          'Animal glue mixed with coal dust',
          'Uncured river clay',
        ],
        answer: 1,
      },
      {
        question:
          'What major medical breakthrough in 1861 by Louis Pasteur finally discredited the Miasma Theory?',
        options: [
          'The discovery of penicillin',
          'The publication of Germ Theory, proving microbes cause disease and fermentation',
          'The invention of the stethoscope',
          'The discovery of blood groups',
        ],
        answer: 1,
      },
      {
        question:
          'Why is the Public Health Act of 1875 considered a massive turning point in British history?',
        options: [
          'It ended laissez-faire by making it compulsory for local councils to provide clean water, pave streets, and inspect drains',
          'It made free medical treatment available to all citizens through the NHS',
          'It banned all factories from burning coal in cities',
          'It forced all citizens to undergo daily mandatory exercise',
        ],
        answer: 0,
      },
      {
        question:
          'What grand public embankments were built in London on top of Bazalgette’s low-level intercepting sewers?',
        options: [
          'The Victoria, Albert, and Chelsea Embankments along the Thames',
          'The Tower Bridge Walkways',
          'The Hyde Park Corner overpasses',
          'The Regent Street shopping colonnades',
        ],
        answer: 0,
      },
      {
        question:
          'When cholera struck London for the final time in 1866, what did the health statistics reveal about Bazalgette’s sewers?',
        options: [
          'Deaths were highest in the areas connected to the new sewers',
          'Areas connected to Bazalgette’s new sewers suffered virtually no cholera deaths, proving clean drainage saved lives',
          'The sewers collapsed under the weight of storm floods',
          'The disease spread evenly across all London boroughs',
        ],
        answer: 1,
      },
      {
        question:
          'What Victorian engineering landmarks were constructed by Bazalgette to pump sewage up to river discharge levels?',
        options: [
          'The Abbey Mills and Crossness Pumping Stations, nicknamed "Cathedrals of Sewage"',
          'The Royal Albert Docks',
          'The Crystal Palace water towers',
          'The Greenwich Maritime Observatory',
        ],
        answer: 0,
      },
      {
        question:
          'What political change in 1867 helped encourage Parliament to pass stronger public health laws like the 1875 Act?',
        options: [
          'The abolition of the House of Lords',
          'The Second Reform Act, which gave the vote to urban working-class men',
          'Queen Victoria declared herself Empress of India',
          'The outbreak of the Franco-Prussian War',
        ],
        answer: 1,
      },
    ],
    // Lesson 6: Comprehensive Unit Review & John Snow Assessment (16 questions)
    [
      {
        question:
          'What was Dr John Snow’s revolutionary hypothesis regarding how cholera was transmitted in 1849?',
        options: [
          'It was caused by inhaling sewer gas in damp cellars',
          'It was a waterborne disease transmitted by swallowing invisible contaminated water or food',
          'It was an airborne virus passed through sneezing',
          'It was a moral punishment inflicted on heavy alcohol drinkers',
        ],
        answer: 1,
      },
      {
        question:
          'During the September 1854 cholera outbreak in Soho, what specific piece of evidence did John Snow create to prove his theory?',
        options: [
          'A chemical formula for purifying well water',
          'A street map plotting each cholera death as a black bar outside houses near the Broad Street pump',
          'A microscope image of the cholera bacterium',
          'A signed confession from the owner of the local water company',
        ],
        answer: 1,
      },
      {
        question:
          'What did John Snow convince the parish Board of Guardians to do on 8 September 1854 to halt the Soho epidemic?',
        options: [
          'Burn down all houses on Broad Street',
          'Remove the handle from the Broad Street water pump so residents could not drink the water',
          'Dump lime into all churchyard cesspits',
          'Evacuate all Soho residents to Hyde Park',
        ],
        answer: 1,
      },
      {
        question: 'What was discovered when inspectors later excavated the Broad Street pump well?',
        options: [
          'A cracked brick cesspool from house number 40 was leaking baby cholera waste directly into the well water',
          'Roman lead pipes were contaminating the supply with heavy metals',
          'Dead rats had blocked the iron suction valve',
          'The water was completely pure spring water with no foreign matter',
        ],
        answer: 0,
      },
      {
        question:
          'Why were workers at the nearby Broad Street brewery completely unaffected by the 1854 cholera epidemic?',
        options: [
          'They had natural genetic immunity to cholera',
          'They were allowed free beer and had their own private deep well on site, so they never drank from the Broad Street pump',
          'They wore rubber masks during work shifts',
          'They boiled their clothing in vinegar every evening',
        ],
        answer: 1,
      },
      {
        question:
          'Why did the British medical establishment and General Board of Health initially reject John Snow’s discovery?',
        options: [
          'Because Snow refused to publish his research papers',
          'Because powerful authorities like Edwin Chadwick and Florence Nightingale were deeply committed to Miasma Theory',
          'Because Snow was an unqualified quack with no medical degree',
          'Because cholera had already disappeared from Britain forever',
        ],
        answer: 1,
      },
      {
        question:
          'What German bacteriologist finally isolated and proved the cholera bacterium (Vibrio cholerae) under a microscope in 1883?',
        options: ['Louis Pasteur', 'Robert Koch', 'Alexander Fleming', 'Joseph Lister'],
        answer: 1,
      },
      {
        question:
          'How did John Snow use the Lambeth Water Company versus Southwark & Vauxhall Water Company data to prove his waterborne theory?',
        options: [
          'He compared customers on the same streets: those drinking from Lambeth (intake moved upriver) had vastly lower deaths than those drinking Southwark sewage',
          'He showed that water companies paid taxes to the Crown',
          'He demonstrated that water tasted sweeter when boiled',
          'He proved that pipes made of wood caused more disease than iron',
        ],
        answer: 0,
      },
      {
        question:
          'Which historical period made the LEAST progress in public health engineering in Britain?',
        options: [
          'The Roman Period (43–410 AD)',
          'The Early Middle Ages (500–1000 AD)',
          'The Victorian Era (1850–1900)',
          'The Early Modern Period (1500–1750)',
        ],
        answer: 1,
      },
      {
        question:
          'What was the primary obstacle preventing earlier public health reform throughout British history?',
        options: [
          'The complete absence of running rivers in Britain',
          'Laissez-faire government attitudes, high costs for ratepayers, and stubborn adherence to Miasma Theory',
          'Hostility from foreign European powers',
          'A total lack of iron and brick building materials',
        ],
        answer: 1,
      },
      {
        question:
          'Which of the following was a key feature of the compulsory Public Health Act of 1875?',
        options: [
          'Every local council was legally required to appoint a Medical Officer of Health and a Sanitary Inspector',
          'Citizens were banned from drinking river water under penalty of death',
          'All hospitals were nationalised into the NHS immediately',
          'Every household was given free indoor electricity',
        ],
        answer: 0,
      },
      {
        question: 'How did Roman public health differ fundamentally from Victorian public health?',
        options: [
          'Romans had Germ Theory while Victorians believed in evil spirits',
          'Romans focused on military fitness and civic bathing without knowing about bacteria; Victorians eventually developed scientific bacteriology and compulsory laws',
          'Romans only allowed emperors to drink clean water',
          'Victorians had worse technology than Iron Age peasants',
        ],
        answer: 1,
      },
      {
        question: 'What role did Edwin Chadwick play in the story of British public health?',
        options: [
          'He proved cholera was waterborne using street maps',
          'He demonstrated statistically that poor sanitation caused illness and poverty, campaigning for the 1848 Public Health Act',
          'He invented the first flushing toilet for Queen Victoria',
          'He discovered penicillin during the Crimean War',
        ],
        answer: 1,
      },
      {
        question:
          'What was the significance of Joseph Bazalgette’s intercepting sewer system for the city of London?',
        options: [
          'It eradicated waterborne cholera from London and created a clean urban drainage infrastructure that still operates today',
          'It was demolished after five years due to structural flaws',
          'It provided clean drinking water directly to private taps in all homes',
          'It eliminated all crime from the East End',
        ],
        answer: 0,
      },
      {
        question:
          'Why did John Snow’s investigation become famous as a founding moment of modern medical science?',
        options: [
          'It pioneered the field of epidemiology — using data collection, map analysis, and scientific deduction to track and control epidemics',
          'It proved that prayers in church cured bacterial infection',
          'It established the first private pharmaceutical corporation in England',
          'It was the first medical study funded by the British royal family',
        ],
        answer: 0,
      },
      {
        question:
          'Looking back across all six lessons, why was progress in British public health NOT a simple straight line of improvement?',
        options: [
          'Because Roman sanitary engineering collapsed in the Middle Ages, urbanisation overwhelmed early modern towns, and scientific understanding was delayed by false theories like miasma',
          'Because British citizens repeatedly destroyed water pipes during civil wars',
          'Because infectious diseases only existed during the Victorian era',
          'Because the British climate changed from tropical to cold in 1500',
        ],
        answer: 0,
      },
    ],
  ];

  // Update Lessons 1 to 5
  for (let i = 0; i < 5; i++) {
    const l = unitData.lessons[i];
    // Update vocab & flashcards
    l.vocab = vocabByLesson[i];
    l.flashcards = vocabByLesson[i];

    // Merge existing quiz with new ones (avoid duplicates)
    const existingQuiz = l.quiz || [];
    const newQuizzes = additionalQuizzesByLesson[i];
    const combinedQuiz = [...existingQuiz];
    newQuizzes.forEach((nq) => {
      if (!combinedQuiz.some((eq) => (eq.question || eq.q) === nq.question)) {
        combinedQuiz.push(nq);
      }
    });
    l.quiz = combinedQuiz;
    console.log(
      `✅ Lesson ${i + 1} ('${l.title}'): ${l.vocab.length} flashcards, ${l.quiz.length} quizzes.`,
    );
  }

  // Update Lesson 6 (Assessment & John Snow Review)
  const l6 = unitData.lessons[5];
  l6.vocab = vocabByLesson[5];
  l6.flashcards = vocabByLesson[5];
  l6.quiz = additionalQuizzesByLesson[5];
  l6.learning_objectives = [
    'Evaluate how Dr John Snow used map data and scientific deduction to prove cholera was waterborne in 1854.',
    'Explain the shift from laissez-faire government attitudes to compulsory state intervention in British public health.',
    'Produce a structured 8-mark explanation assessing the significance of Victorian sanitation reforms.',
  ];
  l6.do_now = {
    type: 'questions',
    title: 'Unit Recall & Retrieval (Rome to Industrial Era)',
    instructions:
      'Answer these retrieval questions in full sentences from your memory of Lessons 1–5.',
    items: [
      {
        question: 'What Roman engineering structure carried fresh water across valleys into towns?',
        answer: 'An aqueduct, using the pull of gravity.',
      },
      {
        question: 'What was a medieval worker who cleared cesspits at night called?',
        answer: 'A gongfermer (or nightman).',
      },
      {
        question:
          'What incorrect theory claimed that foul smells and poisonous air caused disease?',
        answer: 'The Miasma Theory.',
      },
      {
        question: 'In what year did Asiatic cholera first strike Britain?',
        answer: '1831 (in Sunderland).',
      },
      {
        question:
          'What 1858 environmental crisis forced Parliament to fund London’s new sewer system?',
        answer: 'The Great Stink of the River Thames.',
      },
    ],
  };
  l6.narrative_blocks = [
    {
      title: 'The Soho Epidemic and the Broad Street Pump (1854)',
      text: 'In late August 1854, a terrifying outbreak of cholera exploded in the densely populated Soho district of London. Within ten days, more than 500 people had died in a radius of just 250 yards. Prevailing medical opinion, led by Edwin Chadwick and Florence Nightingale, blamed the epidemic on miasma—the noxious fumes rising from London’s overcrowded cesspools.\n\nHowever, Dr John Snow, an experienced physician and anaesthetist who had observed previous cholera epidemics, had published a radical hypothesis in 1849 arguing that cholera was an exclusively waterborne disease transmitted through swallowing contaminated water or food.',
      tasks: [
        {
          type: 'written',
          text: 'Explain why the medical establishment initially refused to believe cholera was waterborne in 1854.',
          model_answer:
            'The medical establishment, including prominent figures like Chadwick and Nightingale, strongly believed in Miasma Theory—that diseases were caused by breathing foul smells and toxic fumes. Because Soho smelled terrible and cholera was terrifying and fast-acting, authorities assumed bad air was responsible and resisted new ideas.',
        },
      ],
    },
    {
      title: 'Epidemiological Mapping: The Scientific Method in Action',
      text: 'To test his waterborne hypothesis, John Snow carried out a meticulous investigation. He obtained the names and addresses of all cholera victims in Soho and plotted them as black bars on a detailed street map. The spatial distribution revealed that deaths were overwhelmingly clustered around the public water pump on Broad Street.\n\nCrucially, Snow investigated the anomalies: workers at the nearby Broad Street brewery did not contract cholera because they had their own private deep well and were allowed free beer, while a widow living miles away in Hampstead died because she liked the taste of the Broad Street water and had it carted to her home daily.',
      tasks: [
        {
          type: 'written',
          text: 'How did John Snow’s investigation of the brewery workers strengthen his hypothesis?',
          model_answer:
            'The brewery workers were surrounded by cholera deaths in Soho but remained completely unaffected. When Snow investigated, he found they never drank pump water because the brewery had its own private well and gave workers free beer. This anomalous negative evidence proved that living in the smelly area did not cause cholera; drinking the specific contaminated pump water did.',
        },
      ],
    },
    {
      title: 'The Turning Point: Removing the Handle and Legacy',
      text: 'On 7 September 1854, Snow presented his evidence to the parish Board of Guardians. Convinced by his map data, they removed the handle from the Broad Street pump the following morning. The epidemic quickly abated. Later excavations revealed that a cracked domestic cesspool at 40 Broad Street was leaking raw sewage directly into the well water.\n\nCombined with Louis Pasteur’s Germ Theory in 1861 and the Great Stink of 1858, Snow’s discovery broke the intellectual grip of Miasma Theory and laid the foundation for modern epidemiology and the compulsory Public Health Act of 1875.',
      tasks: [
        {
          type: 'written',
          text: 'Explain the long-term significance of John Snow’s work for modern public health.',
          model_answer:
            'John Snow’s investigation is recognized as the founding moment of modern epidemiology. By demonstrating that data mapping and rigorous scientific deduction could isolate the source of an epidemic, he paved the way for modern disease control and helped convince Victorian authorities that investing millions in clean water and Bazalgette’s sewers was a matter of life and death.',
        },
      ],
    },
  ];

  console.log(
    `✅ Lesson 6 ('${l6.title}'): Injected ${l6.vocab.length} flashcards, ${l6.quiz.length} quizzes, 3 narrative blocks, and Do Now.`,
  );

  // Write updated data.js
  const updatedCode = `const water_and_sanitation = ${JSON.stringify(unitData, null, 2)};\n\nexport const unitData = water_and_sanitation;\nexport default water_and_sanitation;\n`;
  fs.writeFileSync(dataJsPath, updatedCode, 'utf8');
  console.log(
    '\n🎉 Successfully updated units/water_and_sanitation/data.js with 36 flashcards and 96 quiz questions!',
  );
})();
