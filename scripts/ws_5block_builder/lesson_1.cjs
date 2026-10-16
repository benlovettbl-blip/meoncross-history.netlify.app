/**
 * Master 5-Block Decimal Curriculum Standard
 * Lesson 1: Roman Public Health (c.AD 43–410)
 */

module.exports = {
  id: 'lesson_1',
  title: 'How much progress did the Romans make in public health?',
  enquiry:
    'Was Roman water engineering built to protect ordinary people, or to show off imperial power and luxury?',
  subtitle: 'From Celtic streams to monumental aqueducts, thermae, and public latrines',
  skill: 'Disciplinary Skill: Change & Continuity / Causation',
  card_image: '/images/roman_aqueduct.jpg',
  card_position: 'center 25%',
  banner: '/images/roman_aqueduct.jpg',
  cover_image: '/images/roman_aqueduct.jpg',

  prologue:
    'In AD 43, Roman legions landed on the shores of Britain, bringing not merely swords and armor, but an engineering revolution. In place of dispersed Celtic roundhouses drawing water from local streams, the conquerors erected stone-walled cities requiring vast volumes of freshwater. Through towering aqueducts, pressurized lead conduits, luxurious public thermae, and flushing latrines, Rome transformed the landscape. But did these monumental hydraulic feats stem from genuine medical understanding, or were they imperial displays of power and prestige?',

  margin_spine: [
    { year: 'AD 43', label: '1.1 Imperial Invasion' },
    { year: 'AD 75', label: '1.2 The Gravity Revolution' },
    { year: 'AD 100', label: '1.3 The Thermae Experience' },
    { year: 'AD 150', label: '1.4 Latrines & Plumbism' },
    { year: 'AD 410', label: '1.5 The Imperial Collapse' },
  ],

  causal_domino_spine: {
    title: 'Roman Hydraulic Engineering & Public Health (AD 43–410)',
    subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
    stages: [
      {
        step: 1,
        para_ref: '[1.1]',
        date: 'AD 43',
        title: 'Celtic Iron Age Settlement vs Imperial Urban Shock',
        actor: 'Celtic Tribes & Invading Roman Legions',
        tag: '⚔️ URBAN SHOCK',
        trigger:
          'The AD 43 Roman invasion concentrated thousands of soldiers and civilians into dense stone-walled towns like Londinium, overwhelming traditional rural shallow cesspits.',
        connective:
          'Forced Roman administrators to engineer massive centralised water systems to prevent devastating urban epidemics from crippling the province.',
        question: 'How did the Roman invasion of AD 43 trigger an urban sanitation crisis?',
      },
      {
        step: 2,
        para_ref: '[1.2]',
        date: 'c.AD 43–100',
        title: 'The Gravity Revolution: Aqueducts & Conduits',
        actor: 'Roman Military Hydraulic Engineers',
        tag: '🏛️ GRAVITY FLOW',
        trigger:
          'Engineers surveyed distant hill springs and built monumental stone aqueducts maintaining a gradual downward gradient of inches per hundred yards over miles.',
        connective:
          'Channeled millions of gallons of pristine spring water directly into castella water towers, supplying street fountains, public baths, and elite villas.',
        question: 'How did Roman engineers use gravity to transport millions of gallons of water?',
      },
      {
        step: 3,
        para_ref: '[1.3]',
        date: 'c.AD 100',
        title: 'The Thermae Experience & Social Hygiene',
        actor: 'Roman Citizens, Slaves & Bathhouse Operators',
        tag: '♨️ PUBLIC THERMAE',
        trigger:
          'Monumental public bathhouses operated for a single copper coin, offering heated hypocaust floors, caldarium sweat rooms, olive oil cleaning, and cold frigidarium plunges.',
        connective:
          'Created an accessible daily hygiene ritual that removed dirt and dead skin, transforming bathing into the central social activity of Roman civic life.',
        question: 'How did monumental public bathhouses promote cleanliness and imperial culture?',
      },
      {
        step: 4,
        para_ref: '[1.4]',
        date: 'c.AD 150',
        title: 'Forensic Realities: Latrines, Tersorium & Plumbism',
        actor: 'Archaeologists, Skeletons & Ordinary Citizens',
        tag: '🪱 HIDDEN HAZARDS',
        trigger:
          'Flushing multi-seater public latrines lacked privacy and shared a communal sea sponge on a stick (tersorium), while standing bath water was rarely changed and lead pipes caused plumbism.',
        connective:
          'Exposed that despite impressive stonework, Romans lacked microbiological knowledge, leaving citizens heavily infested with whipworms and toxic lead.',
        question: 'Why did forensic science expose severe flaws in Roman hygiene and health?',
      },
      {
        step: 5,
        para_ref: '[1.5]',
        date: 'AD 410',
        title: 'Historical Verdict: Romanitas & The AD 410 Collapse',
        actor: 'Departing Roman Legions & Anglo-Saxon Settlers',
        tag: '📉 IMPERIAL COLLAPSE',
        trigger:
          'In AD 410, Roman legions withdrew from Britain, causing the imperial tax base, municipal councils, and maintenance workforce to vanish overnight.',
        connective:
          'Left stone aqueducts to choke with silt and lead pipes to be melted into weapons, plunging Britain into a thousand-year sanitation void with no piped water.',
        question: 'Why did Roman water engineering abruptly collapse after AD 410?',
      },
    ],
  },

  workbook_stages: [
    {
      step: 1,
      paraRef: '[1.1]',
      date: 'AD 43',
      questionHeading: 'How did the Roman invasion of AD 43 trigger an urban sanitation crisis?',
      bullets: ['Dispersed Celtic Roundhouses', 'Four Imperial Legions', 'Cramped Walled Cities'],
      focusClue:
        'Why could crowded new Roman cities like Londinium not rely on traditional Iron Age cesspits and local streams?',
    },
    {
      step: 2,
      paraRef: '[1.2]',
      date: 'c.AD 43–100',
      questionHeading:
        'How did Roman engineers use gravity to transport millions of gallons of water?',
      bullets: [
        'Distant Mountain Springs',
        'Mathematical Downward Gradient',
        'Castella Water Towers',
      ],
      focusClue:
        'How did Roman hydraulic engineers move freshwater across valleys without mechanical steam or electric pumps?',
    },
    {
      step: 3,
      paraRef: '[1.3]',
      date: 'c.AD 100',
      questionHeading:
        'How did monumental public bathhouses promote cleanliness and imperial culture?',
      bullets: [
        'Subterranean Hypocaust Heating',
        'Olive Oil & Bronze Strigils',
        'Frigidarium Cold Plunge',
      ],
      focusClue:
        'Why were public thermae cheap social hubs where citizens bathed, made deals, and relaxed every afternoon?',
    },
    {
      step: 4,
      paraRef: '[1.4]',
      date: 'c.AD 150',
      questionHeading: 'Why did forensic science expose severe flaws in Roman hygiene and health?',
      bullets: ['Communal Sponge on a Stick', 'Intestinal Parasite Eggs', 'Toxic Lead Water Pipes'],
      focusClue:
        'Why did stagnant plunge pools and jointed lead pipes at Fishbourne Palace create hidden health hazards?',
    },
    {
      step: 5,
      paraRef: '[1.5]',
      date: 'AD 410',
      questionHeading: 'Why did Roman water engineering abruptly collapse after AD 410?',
      bullets: [
        'Imperial Power & Vanity',
        'Vanishing Roman Legions',
        'Thousand-Year Sanitation Void',
      ],
      focusClue:
        'Did Roman sanitation collapse because people forgot engineering skills, or because imperial taxes and administrators vanished?',
    },
  ],

  did_you_know:
    'Roman bathers did not use soap made from animal fat. Instead, they coated their bodies in scented olive oil and had slaves scrape off the accumulated sweat, dirt, and dead skin cells with a curved bronze blade called a strigil! Vendors outside the Colosseum even bottled gladiator sweat to sell as an expensive luxury cosmetic.',

  do_now: [
    {
      q: 'What kind of round timber homes did Celtic Britons live in before AD 43?',
      a: 'Roundhouses made of wattle and daub with thatched conical roofs.',
    },
    {
      q: 'Why did Iron Age Celtic farming settlements produce very little concentrated sewage?',
      a: 'Populations were small, rural, and widely dispersed across open countryside.',
    },
    {
      q: 'Where did pre-Roman Britons get their daily freshwater?',
      a: 'Natural bubbling springs, hand-dug gravel wells, and unpolluted rivers.',
    },
    {
      q: 'What archaeological material was used to make the water pipes excavated at Fishbourne Palace?',
      a: 'Cast lead sheets soldered into tubular conduits.',
    },
    { q: 'In what year did Emperor Claudius launch the Roman invasion of Britain?', a: 'AD 43.' },
  ],

  vocabulary: [
    {
      term: 'Aqueduct',
      definition:
        'A monumental bridge or masonry channel engineered to convey fresh spring water over long distances using gravity.',
    },
    {
      term: 'Thermae',
      definition:
        'Large, state-run public bathhouses equipped with heated pools, exercise yards, and social meeting spaces.',
    },
    {
      term: 'Hypocaust',
      definition:
        'An underground Roman central heating system where furnace heat and hot smoke circulated beneath suspended floors.',
    },
    {
      term: 'Strigil',
      definition:
        'A curved bronze or iron scraping tool used with olive oil to remove sweat, grime, and dead skin from the body.',
    },
    {
      term: 'Latrine',
      definition:
        'A communal multi-seater public toilet consisting of stone benches set over a deep running-water sewer ditch.',
    },
    {
      term: 'Tersorium',
      definition:
        'A natural sea sponge affixed to a wooden stick, used communally to clean oneself in Roman latrines.',
    },
    {
      term: 'Plumbism',
      definition:
        'Chronic, toxic lead poisoning caused by consuming water or wine conveyed through lead pipes and lead-lined cookware.',
    },
    {
      term: 'Romanitas',
      definition:
        'The cultural, political, and technological ideals of Roman imperial civilization and power.',
    },
  ],

  narrative_blocks: [
    {
      act: 1,
      title: '1.1 Context & Catalyst: Celtic Iron Age Settlement vs The Imperial Shock of AD 43',
      text: '<span class="para-ref">[1.1]</span> For centuries before the Roman conquest, Iron Age Britain was an agrarian society of small, dispersed tribal farming communities. Celtic families lived in circular timber homes called roundhouses, constructed from wattle-and-daub walls and topped with thick conical thatched roofs. Because farming homesteads were scattered across hills and valleys, waste management was straightforward, practical, and sustainable: families dug shallow, temporary cesspits in their vegetable enclosures, which naturally decomposed into fertilizer without endangering drinking supplies. Freshwater was drawn by wooden bucket from nearby unpolluted streams, bubbling natural springs, or shallow hand-dug gravel wells.<br><br>Everything changed dramatically in AD 43 when Emperor Claudius dispatched four imperial legions to invade Britain. The Romans brought an urban revolution. To garrison soldiers and govern conquered tribes, imperial administrators founded dense stone-walled towns and legionary fortresses (*castra*) such as Londinium (London), Verulamium (St Albans), and Eboracum (York). Suddenly, thousands of citizens, administrators, and soldiers were concentrated within cramped, paved streets. The simple rural methods of Celtic roundhouses could not survive this density; without a coordinated municipal water supply and organized waste disposal, urban populations would swiftly collapse from epidemic disease.',
    },
    {
      act: 2,
      title: '1.2 The Gravity Revolution: Aqueducts, Conduits and Water Towers',
      text: '<span class="para-ref">[1.2]</span> Roman engineers solved the crisis of urban density through mastery of hydraulic engineering and the unyielding law of gravity. Recognizing that rivers running through towns quickly became fouled with surface wash, engineers located pristine natural springs in distant hills. To convey millions of gallons of water into cities, they constructed massive stone aqueducts (*aquae*) and covered conduits. Because the Romans possessed no electric or steam pumps, aqueducts were calculated with extraordinary mathematical precision: channels maintained an imperceptible downward slope gradient—often dropping just a few inches every hundred yards over distances of thirty miles or more—ensuring water flowed steadily into distribution castella (water towers).<br><br>From these central towers, lead and terracotta pipes distributed pressurized water across the city. Priority was allocated strictly: first to public street fountains where ordinary plebeians collected clean drinking water in ceramic jugs; second to monumental public bathhouses (*thermae*); and third, via paid taxation, to the private villas of wealthy patricians. At monumental sites like Fishbourne Roman Palace in Sussex (Source A), excavated lead pipes prove that water pressure was harnessed to power garden fountains and private luxury pools, showcasing the supreme mechanical confidence of imperial Rome.',
      source: {
        letter: 'A',
        title: 'Source A: Roman Lead Water Pipes at Fishbourne Roman Palace (c.75 AD)',
        image: '/images/water_local_fishbourne.jpg',
        caption:
          'Excavated section of jointed lead piping and water conduits from Fishbourne Roman Palace in West Sussex, built c.75 AD. Freshwater was piped over miles from natural springs to supply garden water features, fountains, and private bath suites.',
        source_context:
          'Archaeological excavations conducted by Barry Cunliffe at Fishbourne Roman Palace revealed an elaborate hydraulic network featuring jointed lead conduits, settling tanks, and stone drainage channels flushing waste away into Chichester Harbour. Hinge Question: Does the luxury lead piping at Fishbourne Palace prove Romans understood the link between clean water and health, or that hydraulic technology was an imperial luxury reserved for the ruling elite?',
        how_useful_question:
          'How useful is Source A for an enquiry into the engineering skills and limitations of Roman water systems in Britain?',
        provenance_clues: [
          'Author: Imperial Roman hydraulic engineers constructing client King Togidubnus’ palace.',
          'Audience: Roman provincial aristocracy and visiting imperial administrators.',
          'Motive: To showcase Roman civil engineering supremacy and supply luxury fountains and private baths.',
        ],
        hinge_question:
          'Hinge Question: Does the luxury lead piping at Fishbourne Palace prove Romans understood the link between clean water and health, or that hydraulic technology was an imperial luxury reserved for the ruling elite?',
        citation: 'Sussex Archaeological Collections • Fishbourne Excavation Reports.',
      },
    },
    {
      act: 3,
      title: '1.3 The Thermae Experience: Public Bathhouses, Hypocausts, and Social Hygiene',
      text: '<span class="para-ref">[1.3]</span> The crown jewel of Roman public health was the public bathhouse, accessible to all citizens for the minimal entrance fee of a single copper coin (*quadrans*). Roman bathing was an elaborate physical ritual. Romans did not possess soap made from animal fat; instead, bathers entered the sweltering heat of the *caldarium*, slathered themselves in olive oil, and had slaves use curved bronze strigils to scrape away accumulated sweat, grime, and dead skin cells before plunging into the frigid cold waters of the *frigidarium* to close their pores.<br><br>Outside the Colosseum and provincial amphitheatres, shrewd vendors even bottled the sweat, dirt, and scraped skin of famous gladiators to sell as wildly expensive luxury facial moisturizers to adoring fans! The subterranean hypocaust system (Source B) circulated furnace heat beneath suspended mosaic floors, providing affordable warmth to thousands. The thermae functioned as daily community hubs where citizens exercised, debated politics, concluded commercial transactions, and dined, ensuring basic bodily cleanliness was woven directly into urban civic identity.',
      source: {
        letter: 'B',
        title: 'Source B: Architectural Diagram of a Roman Public Bathhouse (Thermae)',
        image: '/images/roman_baths_diagram.svg',
        caption:
          'Schematic cross-section of a Roman thermae complex showing the progression through the apodyterium (changing room), tepidarium (warm room), caldarium (hot steam room), and frigidarium (cold plunge pool), heated by an underground hypocaust furnace.',
        source_context:
          'Diagrammatic reconstruction of provincial Roman baths illustrating how gravity water channels and underground charcoal hypocaust furnaces heated floors and water tanks. Hinge Question: Why did the hypocaust and bathhouse layout succeed in keeping Romans warm, yet fail to protect them from water-borne bacteria?',
        how_useful_question:
          'How useful is Source B for an enquiry into how Roman bathhouses attempted to promote bodily cleanliness?',
        provenance_clues: [
          'Author: Modern archaeological reconstruction based on excavated Roman thermae.',
          'Audience: History students and researchers studying ancient civil engineering.',
          'Motive: To clearly visualize the subterranean heating channels and water flow through Roman bath chambers.',
        ],
        hinge_question:
          'Hinge Question: Why did the hypocaust and bathhouse layout succeed in keeping Romans warm, yet fail to protect them from water-borne bacteria?',
        citation: 'British Museum Educational Archive • Roman Engineering Schematics.',
      },
    },
    {
      act: 4,
      title: '1.4 Forensic Realities: Public Latrines, Tersorium, and the Lead Paradox',
      text: '<span class="para-ref">[1.4]</span> Furthermore, Roman cities incorporated communal public latrines featuring circular stone bench seats set over deep trenches continuously flushed with wastewater from the public baths. There were no individual cubicles or privacy doors: Roman citizens sat shoulder-to-shoulder chatting about politics, dinner, or chariot races! Even more remarkable was Roman toilet paper: the *tersorium*, a communal sea sponge attached to a wooden stick. After finishing their business, citizens rinsed the sponge in a saltwater channel running along the floor and politely passed the dripping sponge-on-a-stick to the next person waiting on the bench!<br><br>Surviving bronze strigils and oil flasks (Source C) illustrate how Romans cleaned their skin with oil and friction rather than chemical soap, but forensic archaeological science exposes severe limitations in Roman hygiene. The Romans possessed zero knowledge of microbiology; their health theories were based upon Galen’s balance of the four bodily humours and avoiding foul air (*miasma*). Because firewood was costly, the standing water in public plunge pools was rarely replaced, transforming warm communal baths into a murky, tepid soup of floating skin, hairs, and intestinal parasites. Forensic analysis of latrine soil and Roman coprolites reveals widespread infestation with whipworm, roundworm, and dysentery. Crucially, forensic bone analysis of Roman skeletons reveals high concentrations of lead poisoning (*plumbism*): while mineral deposits lined freshwater pipes, acidic water, wine, and lead cookware slowly poisoned the provincial elite.',
      source: {
        letter: 'C',
        title: 'Source C: Roman Bronze Strigils and Oil Flask (Aryballos)',
        image: '/images/roman_strigils.jpg',
        caption:
          'A pair of curved bronze strigils and an aryballos (oil flask) found at a Romano-British bath site. Roman bathers coated their skin in scented olive oil before slaves scraped off perspiration, dust, and dead skin cells.',
        source_context:
          'Authentic Roman hygiene equipment recovered from Romano-British settlements. Lacking chemical soap, Romans relied on oil lubrication and friction. Hinge Question: How does scraping dirt with olive oil and a bronze blade compare in effectiveness to modern chemical soap?',
        how_useful_question:
          'How useful is Source C for an enquiry into daily hygiene practices in Roman Britain?',
        provenance_clues: [
          'Author: Roman metalworkers casting bronze hygiene instruments.',
          'Audience: Daily bathers in Roman civic and military settlements.',
          'Motive: To provide durable instruments for scraping perspiration and grime from skin.',
        ],
        hinge_question:
          'Hinge Question: How does scraping dirt with olive oil and a bronze blade compare in effectiveness to modern chemical soap?',
        citation: 'Museum of London Archaeology • Romano-British Antiquities Collection.',
      },
    },
    {
      act: 5,
      title: '1.5 The Historical Verdict: Medical Enlightenment vs Imperial Vanity',
      text: '<span class="para-ref">[1.5]</span> Historians have long debated the real motives behind Roman sanitation. In the past, Victorian historians believed the Romans built baths and sewers simply to be clean, healthy, and benevolent. However, modern historians argue that Roman public health was really about military strength and imperial power (*romanitas*). Sick soldiers could not march or put down rebellions; grand marble bathhouses and towering stone aqueducts were physical signs of Roman authority, designed to impress conquered Celtic Britons and show off the technological superiority of Rome.<br><br>How fragile Roman public health really was became clear in AD 410, when the Western Roman Empire collapsed and the legions were pulled out of Britain. The sanitation system did not fall apart because people forgot how to build it; it collapsed because the imperial taxes, military officers, and organized municipal workers needed to clean sewers and repair pipes disappeared. Within decades, stone drains choked with silt, lead pipes were melted down for weapons, and Britain entered an unpaved era with no running piped water that lasted for nearly a thousand years.',
    },
  ],

  tasks: [
    {
      id: 'ws_l1_q2_explain_why',
      type: 'extended_writing',
      topic: 'Question 2: Explain Why [12 marks • 15 mins]',
      title: 'Question 2: Explain Why [12 marks • 15 mins]',
      question:
        'Explain why the Romans built sophisticated water supply and sanitation systems in Britain after AD 43. [12 marks]',
      stimulus: [
        'The need for fresh water and hygiene in densely populated towns like Londinium',
        'Displaying imperial power, Romanitas, and luxury at sites like Fishbourne Palace',
      ],
      scaffolding: {
        guidance:
          'Write a structured 3-paragraph PEEL response. Use the exact words from the question stem in your Point and in your Link for every paragraph.',
        structure_strip: [
          {
            col: '1. URBAN DENSITY & HYGIENE',
            prompt:
              'Explain how founding crowded stone towns (Londinium, York) forced Romans to construct gravity aqueducts and flushing latrines to prevent devastating epidemics [1.1, 1.2].',
            starter:
              'A primary catalyst explaining why the Romans built sophisticated water supply systems was the urgent need to sustain dense urban populations...',
          },
          {
            col: '2. IMPERIAL POWER & ROMANITAS',
            prompt:
              'Explain how grand thermae, heated hypocausts, and luxury lead pipes at Fishbourne Palace were designed to display imperial supremacy (*romanitas*) [1.3, 1.5].',
            starter:
              'Furthermore, a decisive underlying motive explaining why the Romans built monumental bathhouses was the political desire to project imperial power...',
          },
          {
            col: '3. MILITARY READINESS & VERDICT',
            prompt:
              'Weigh whether practical military survival or imperial vanity was more decisive in driving Roman engineering [1.4, 1.5].',
            starter:
              'Ultimately, while imperial prestige was prominent, the decisive factor explaining why Roman water systems were constructed was military efficiency...',
          },
        ],
      },
      hints: [
        'Point: State your factor clearly using the exact words from the question stem.',
        'Evidence: Deploy specific historical details: aqueducts, downward gradients, castella, Fishbourne Palace lead pipes, hypocausts, and tersorium [1.2–1.4].',
        'Explanation: Explain the causal connection: show how imperial conquest created urban concentrations that made rural Celtic cesspits unviable [1.1].',
        'Link: Conclude with a sustained comparative judgment: evaluate whether practical health or imperial propaganda was the primary driver [1.5].',
      ],
      model_answer:
        'A primary catalyst explaining why the Romans built sophisticated water supply systems was the urgent need to sustain dense urban populations after the AD 43 invasion. Unlike the small, dispersed Celtic farming roundhouses that relied on local streams and shallow garden cesspits, Roman administrators gathered thousands of legionaries and civilians into cramped, stone-walled cities such as Londinium and Verulamium. In these densely populated environments, local rivers quickly became fouled with refuse and sewage, threatening lethal outbreaks of dysentery. Roman military engineers solved this crisis by surveying distant hill springs and constructing monumental masonry aqueducts with precise mathematical downward gradients. Piped into castella water towers, millions of gallons of clean spring water were distributed to street fountains, flushing sewers, and communal latrines, proving that urban survival was an essential reason why the Romans built sanitation systems.<br><br>Furthermore, a decisive underlying motive explaining why the Romans built monumental bathhouses was the political desire to project imperial power and civilize conquered peoples through Romanitas. Public thermae were not merely hygiene facilities; they were grand cultural monuments equipped with heated hypocaust floors, mosaic plunge pools, and social halls. Accessible for the minimal fee of a single copper quadrans, the baths encouraged Celtic Britons to adopt Roman dress, language, and leisure routines. At luxury sites like Fishbourne Roman Palace in Sussex, jointed lead conduits and pressurized water channels fed ornamental garden fountains and private bathing suites. These lavish waterworks demonstrated the technological and financial supremacy of Rome, winning the loyalty of local client rulers and showing that imperial vanity and political control were vital reasons behind Roman water engineering.<br><br>Ultimately, while imperial prestige was prominent, the decisive factor explaining why Roman water systems were constructed was military efficiency and imperial defence. The Roman Empire depended entirely on the physical stamina and marching discipline of its standing army. Sick, dehydrated soldiers plagued by water-borne illnesses could neither build roads nor suppress provincial rebellions. This military imperative was proven when the Roman legions were withdrawn from Britain in AD 410: without imperial military command, taxes, and municipal maintenance, aqueducts choked with silt and lead pipes were melted down. Therefore, while Roman public health created impressive civil engineering, it was fundamentally driven by the practical demands of military conquest and urban defence rather than genuine humanitarian medicine.',
    },
  ],

  teacher_notes: {
    primer:
      'This enquiry establishes the foundational technological baseline of ancient sanitation. Guide Year 7 pupils to contrast pre-Roman Celtic rural sustainability against Roman urban hydraulic engineering, emphasizing that impressive engineering did not equal modern germ theory.',
    objectives: [
      {
        objective:
          'Explain how Roman aqueducts and conduits transported freshwater into towns using gravity.',
        primer:
          'Focus on paragraph [1.2]. Emphasise the mathematical gradient and absence of mechanical pumps.',
        question:
          'Hinge Question: If the Romans possessed no electric or steam pumps, how did they move millions of gallons of water over thirty miles of countryside?',
      },
      {
        objective:
          'Evaluate whether Roman sanitation was motivated by genuine medical understanding or imperial prestige.',
        primer:
          'Contrast the forensic parasite evidence in [1.4] with the political propaganda described in [1.5].',
        question:
          'Hinge Question: Does the excavation of lead pipes and intestinal parasites prove Roman public health was an illusion, or a genuine achievement for its time?',
      },
    ],
    source_context: [
      {
        source: 'Source A (Fishbourne Lead Pipes)',
        context:
          'Excavations at Fishbourne Roman Palace demonstrate high-pressure lead plumbing engineered for client King Togidubnus. Hinge Question: Does the luxury lead piping at Fishbourne Palace prove Romans understood the link between clean water and health, or that hydraulic technology was an imperial luxury reserved for the ruling elite?',
      },
      {
        source: 'Source B (Thermae Diagram)',
        context:
          'Schematic of Roman baths showing hypocaust and water circulation. Hinge Question: Why did the hypocaust and bathhouse layout succeed in keeping Romans warm, yet fail to protect them from water-borne bacteria?',
      },
      {
        source: 'Source C (Bronze Strigils)',
        context:
          'Bronze strigils used with olive oil to scrape skin. Hinge Question: How does scraping dirt with olive oil and a bronze blade compare in effectiveness to modern chemical soap?',
      },
    ],
  },

  video: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=klnMloYjHmg',
      title: 'Roman Bathing and Wellness: How Were Roman Baths Really Used?',
      duration: '14 mins 5 secs',
      viewing_task:
        'Explain the social, ritual, and hygienic routines Romans followed when visiting the public baths (thermae).',
      model_answer:
        'Roman bathing was an essential daily social ritual. Romans moved through progressive heated chambers (tepidarium, caldarium) to induce sweating, used olive oil and strigils to scrape away dirt and dead skin, plunged into cold water (frigidarium) to close pores, and socialised in the communal complex.',
    },
  ],

  // 20-Question Recall Quiz
  quick_quiz: [
    {
      question: 'What kind of houses did Celtic Britons live in before AD 43?',
      options: ['Stone castles', 'Timber roundhouses', 'Brick villas', 'Underground bunkers'],
      answer: 'Timber roundhouses',
    },
    {
      question: 'Why did Celtic roundhouse communities produce very little concentrated sewage?',
      options: [
        'They used modern chemical toilets',
        'They lived in small, dispersed farming settlements',
        'They burned all their waste daily',
        'They had flush toilets',
      ],
      answer: 'They lived in small, dispersed farming settlements',
    },
    {
      question: 'In what year did Emperor Claudius invade Britain?',
      options: ['55 BC', 'AD 43', 'AD 1066', 'AD 410'],
      answer: 'AD 43',
    },
    {
      question: 'What Latin term describes Roman military fortresses that grew into towns?',
      options: ['Castra', 'Villa', 'Thermae', 'Aquae'],
      answer: 'Castra',
    },
    {
      question:
        'What natural force did Roman engineers rely on to transport water through aqueducts?',
      options: ['Steam power', 'Electric pumps', 'Gravity', 'Wind power'],
      answer: 'Gravity',
    },
    {
      question: 'What was the typical slope gradient of a Roman aqueduct channel?',
      options: [
        'A steep 45-degree angle',
        'A few inches every hundred yards',
        'Completely flat',
        'Flowing uphill using siphons',
      ],
      answer: 'A few inches every hundred yards',
    },
    {
      question: 'What was the central water distribution tower in a Roman city called?',
      options: ['Castellum', 'Colosseum', 'Basilica', 'Forum'],
      answer: 'Castellum',
    },
    {
      question: 'Which users received first priority for fresh water from Roman castella?',
      options: [
        'Private villas of the rich',
        'Public street fountains for ordinary citizens',
        'Gladiator arenas',
        'Emperor’s palace',
      ],
      answer: 'Public street fountains for ordinary citizens',
    },
    {
      question: 'At which famous Roman palace in Sussex were jointed lead water pipes excavated?',
      options: [
        'Fishbourne Roman Palace',
        'Portchester Castle',
        'Bignor Villa',
        'Rockbourne Villa',
      ],
      answer: 'Fishbourne Roman Palace',
    },
    {
      question: 'What were large public bathhouses called in Roman Britain?',
      options: ['Thermae', 'Cloacae', 'Domus', 'Insulae'],
      answer: 'Thermae',
    },
    {
      question: 'What was the name of the hot steam chamber in a Roman bathhouse?',
      options: ['Frigidarium', 'Tepidarium', 'Caldarium', 'Apodyterium'],
      answer: 'Caldarium',
    },
    {
      question: 'What was the name of the cold plunge pool in a Roman bathhouse?',
      options: ['Frigidarium', 'Caldarium', 'Tepidarium', 'Hypocaust'],
      answer: 'Frigidarium',
    },
    {
      question: 'How did Romans clean their skin in the baths instead of using soap?',
      options: [
        'Rubbed sand and lemon juice',
        'Applied olive oil and scraped with a bronze strigil',
        'Washed with vinegar and salt',
        'Used lye soap from animal tallow',
      ],
      answer: 'Applied olive oil and scraped with a bronze strigil',
    },
    {
      question: 'What was the underground central heating system in Roman baths called?',
      options: ['Hypocaust', 'Aqueduct', 'Castellum', 'Cloaca'],
      answer: 'Hypocaust',
    },
    {
      question: 'What was the tersorium used for in Roman communal latrines?',
      options: [
        'Scraping dead skin in baths',
        'A communal sea sponge on a stick for wiping',
        'Stirring bath water',
        'Cleaning bronze strigils',
      ],
      answer: 'A communal sea sponge on a stick for wiping',
    },
    {
      question: 'What chronic medical condition was caused by lead pipes and lead cookware?',
      options: ['Plumbism (lead poisoning)', 'Cholera', 'The Black Death', 'Scurvy'],
      answer: 'Plumbism (lead poisoning)',
    },
    {
      question: 'What microscopic organisms were Romans completely unaware of?',
      options: ['Insects', 'Bacteria and microbes', 'Fleas and lice', 'Earthworms'],
      answer: 'Bacteria and microbes',
    },
    {
      question: 'What Latin term described the cultural values and power of Roman civilization?',
      options: ['Romanitas', 'Pax Romana', 'Imperium', 'Senatus'],
      answer: 'Romanitas',
    },
    {
      question: 'In what year did the Roman legions withdraw from Britain?',
      options: ['AD 43', 'AD 312', 'AD 410', 'AD 1066'],
      answer: 'AD 410',
    },
    {
      question: 'Why did Roman sanitation systems fall into ruin after AD 410?',
      options: [
        'Invading Vikings blew up the aqueducts',
        'Taxes, engineers, and municipal councils vanished with the legions',
        'People decided they preferred drinking sewage',
        'A giant earthquake destroyed all pipes',
      ],
      answer: 'Taxes, engineers, and municipal councils vanished with the legions',
    },
  ],
  quiz: [], // Populated dynamically to mirror quick_quiz
};

module.exports.quiz = module.exports.quick_quiz;
