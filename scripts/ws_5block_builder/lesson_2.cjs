/**
 * Master 5-Block Decimal Curriculum Standard
 * Lesson 2: Medieval Public Health (c.1100–1500)
 */

module.exports = {
  id: 'lesson_2',
  title: 'Why did public health decline during the Middle Ages?',
  enquiry:
    'Was medieval public health squalor caused by a lack of money, or by mistaken medical beliefs like miasma?',
  subtitle: 'From urban filth and gong farmers to monastic hydraulics and the Black Death',
  skill: 'Disciplinary Skill: Comparison & Living Conditions / Causation',
  card_image: '/images/black_death.jpg',
  card_position: 'center 30%',
  banner: '/images/black_death.jpg',
  cover_image: '/images/black_death.jpg',

  prologue:
    'When the Roman legions withdrew in AD 410, their monumental aqueducts and hypocausts fell into ruin. Across medieval Britain, newly expanding boroughs grew rapidly with narrow unpaved alleys, timber-framed houses, and overflowing cesspits. Yet the popular myth of the "filthy dark ages" overlooks the remarkable engineering of medieval monasteries like Canterbury and Titchfield, as well as municipal ordinances fining polluters. When the Black Death struck in 1348, wiping out nearly half the population, it exposed the tragic divide between medieval hygiene efforts and the limits of medical understanding.',

  margin_spine: [
    { year: '1100', label: 'The Borough Boom' },
    { year: '1250', label: 'The Waste Battle' },
    { year: '1300', label: 'Monastic Hydraulics' },
    { year: '1348', label: 'The Black Death' },
    { year: '1388', label: 'Statute of Cambridge' },
  ],

  causal_domino_spine: {
    title: 'Medieval Urban Expansion, Monastic Hydraulics & Plague (1100–1500)',
    subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
    stages: [
      {
        step: 1,
        para_ref: '[2.1]',
        date: '1100–1250',
        title: 'The Vanishing Aqueducts & The Borough Boom',
        actor: 'Medieval Townspeople & Borough Corporations',
        tag: '🏘️ BOROUGH BOOM',
        trigger:
          'The rapid expansion of medieval trading towns outpaced rudimentary water infrastructure, forcing citizens into unpaved muddy lanes overhung by timber tenements.',
        connective:
          'Resulted in widespread reliance on polluted rivers and shallow garden wells vulnerable to contamination from neighbouring latrines.',
        question: 'Why did the growth of medieval towns overwhelm traditional water supplies?',
      },
      {
        step: 2,
        para_ref: '[2.2]',
        date: 'c.1250–1348',
        title: 'The Municipal Waste Battle: Rakers & Gong Farmers',
        actor: 'Town Bailiffs, Rakers & Gong Farmers',
        tag: '💩 NIGHTSOIL BATTLE',
        trigger:
          'Town councils hired street rakers and deployed nocturnal gong farmers to empty deep cesspits, fining polluters at Court Leet inquests.',
        connective:
          'Demonstrated active municipal regulation, yet unpaved thoroughfares and roaming pigs meant street filth constantly threatened contamination.',
        question: 'How did medieval towns attempt to manage human and animal waste?',
      },
      {
        step: 3,
        para_ref: '[2.3]',
        date: 'c.1300',
        title: 'Monastic Hydraulics: Canterbury & Titchfield Abbey',
        actor: 'Monks of Christ Church & Premonstratensian Canons',
        tag: '⛪ MONASTIC HYDRAULICS',
        trigger:
          'Wealthy monastic foundations engineered private five-stage settling tanks, lead pipes, and fresh spring water conduits feeding lavatorium washing basins.',
        connective:
          'Enabled monks to live far healthier, longer lives than townspeople, proving clean water was achievable when funded by religious endowments.',
        question: 'Why did medieval monasteries enjoy far cleaner water than crowded towns?',
      },
      {
        step: 4,
        para_ref: '[2.4]',
        date: '1348–1350',
        title: 'The Black Death Catastrophe & Miasma Theory',
        actor: 'Yersinia Pestis, Plague Fleas & Medieval Doctors',
        tag: '💀 THE BLACK DEATH',
        trigger:
          'In 1348, bubonic plague entered Dorset ports, killing 40–50% of England’s population while medical authorities blamed corrupt air (miasma) and divine wrath.',
        connective:
          'Prompted desperate quarantines and public street bonfires, exposing the lethal helplessness of pre-scientific medicine.',
        question: 'How did the 1348 Black Death challenge medieval understanding of disease?',
      },
      {
        step: 5,
        para_ref: '[2.5]',
        date: '1388',
        title: 'Historical Verdict: Statute of Cambridge & Peasant Hygiene',
        actor: 'King Richard II & Parliament',
        tag: '📜 1388 STATUTE',
        trigger:
          'Parliament passed the 1388 Statute of Cambridge, making it a criminal offence under heavy royal fines to cast dung, entrails, and offal into rivers.',
        connective:
          'Dismantled Victorian myths of the "ignorant dirty peasant", proving medieval society recognized environmental contamination and attempted nationwide regulation.',
        question:
          'Did public health genuinely collapse, or have Victorians exaggerated medieval squalor?',
      },
    ],
  },

  workbook_stages: [
    {
      step: 1,
      paraRef: '[2.1]',
      date: '1100–1250',
      questionHeading: 'Why did the growth of medieval towns overwhelm traditional water supplies?',
      bullets: [
        'Collapsed Roman Stone Aqueducts',
        'Booming Market Boroughs',
        'Unpaved Muddy Thoroughfares',
      ],
      focusClue:
        'Why did rapid medieval town growth outpace water infrastructure once central imperial taxation had vanished?',
    },
    {
      step: 2,
      paraRef: '[2.2]',
      date: 'c.1250–1348',
      questionHeading: 'How did medieval towns attempt to manage human and animal waste?',
      bullets: [
        'Overcrowded Timber Tenements',
        'Night-Time Gong Farmers',
        'Court Leet Fines & Rakers',
      ],
      focusClue:
        'How do court records prove that town councils actively tried to fine polluters rather than ignoring street filth?',
    },
    {
      step: 3,
      paraRef: '[2.3]',
      date: 'c.1300',
      questionHeading: 'Why did medieval monasteries enjoy far cleaner water than crowded towns?',
      bullets: [
        'Settling Tanks & Lead Conduits',
        'Segregated Monastic Cloisters',
        'Titchfield Abbey Fishponds',
      ],
      focusClue:
        'How did monks use five-stage settling tanks and running fountain basins to maintain sanitary isolation?',
    },
    {
      step: 4,
      paraRef: '[2.4]',
      date: '1348–1350',
      questionHeading: 'How did the 1348 Black Death challenge medieval understanding of disease?',
      bullets: [
        'Yersinia Pestis in Fleas',
        'Poisonous Foul Air (Miasma)',
        'Forty-Day Port Quarantines',
      ],
      focusClue:
        'Why did religious beliefs and miasma theory prevent physicians from discovering that rat fleas transmitted plague?',
    },
    {
      step: 5,
      paraRef: '[2.5]',
      date: '1388',
      questionHeading:
        'Did public health genuinely collapse, or have Victorians exaggerated medieval squalor?',
      bullets: [
        'Statute of Cambridge (1388)',
        'Compulsory River Clean-Up',
        'Carole Rawcliffe Revisionism',
      ],
      focusClue:
        'How does parliamentary legislation prove that medieval society recognised the vital danger of water pollution?',
    },
  ],

  did_you_know:
    'Gong farmers were among the highest-paid manual labourers in medieval England! Because the stench of emptying cesspits was so overwhelming and hazardous, they were legally permitted to work only between 9:00 PM and 5:00 AM under cover of darkness. They shoveled nightsoil into barrels and sold it to suburban farmers as prized agricultural fertilizer.',

  do_now: [
    {
      q: 'What happened to Roman aqueducts and baths after the legions left in AD 410?',
      a: 'They fell into disrepair, choked with mud, and lead pipes were melted down for weapons.',
    },
    {
      q: 'Which famous Roman palace in Sussex had running water and lead pipes?',
      a: 'Fishbourne Roman Palace.',
    },
    {
      q: 'Did the Romans possess any knowledge of microscopic bacteria and germ theory?',
      a: 'No, they believed in Galen’s four humours and miasma (bad air).',
    },
    { q: 'What natural force carried water downhill through Roman aqueducts?', a: 'Gravity.' },
    {
      q: 'What communal hygiene item was shared by bathers in Roman public latrines?',
      a: 'The tersorium (a sea sponge on a stick rinsed in salt water).',
    },
  ],

  vocabulary: [
    {
      term: 'Borough',
      definition:
        'A self-governing medieval town granted a royal charter with the right to hold regular markets and run local courts.',
    },
    {
      term: 'Gong Farmer',
      definition:
        'A nocturnal specialist labourer hired to dig out and remove raw human sewage from domestic cesspits.',
    },
    {
      term: 'Cesspit',
      definition:
        'A deep pit lined with dry stone or timber, dug beneath or behind houses to collect household toilet waste.',
    },
    {
      term: 'Miasma',
      definition:
        'The incorrect medical belief that infectious diseases were generated and transmitted by toxic, foul-smelling air.',
    },
    {
      term: 'Settling Tank',
      definition:
        'A stone reservoir designed to slow water flow so that suspended sand, silt, and mud sink to the bottom, purifying the water.',
    },
    {
      term: 'Lavatorium',
      definition:
        'A dedicated stone washing trough or circular fountain located outside a monastic dining refectory for communal handwashing.',
    },
    {
      term: 'Black Death',
      definition:
        'The catastrophic pandemic of bubonic and pneumonic plague that struck Britain in 1348, killing up to half the population.',
    },
    {
      term: 'Statute of Cambridge',
      definition:
        'A 1388 parliamentary law passed under Richard II banning the disposal of animal dung, offal, and refuse into public rivers and ditches.',
    },
  ],

  narrative_blocks: [
    {
      act: 1,
      title: 'The Medieval Borough Boom & Overhanging Jetties',
      theme_heading: 'The Medieval Borough Boom & Overhanging Jetties',
      text: '<span class="para-ref">[2.1]</span> After the Roman legions abandoned Britain in AD 410, centralized stone infrastructure crumbled. Aqueducts collapsed, lead pipes were melted down into weapons, and hypocaust furnaces went cold. For centuries, Anglo-Saxon communities lived in dispersed timber villages where waste naturally returned to the soil. However, from the eleventh century, England experienced an explosive commercial revival: London’s population surged toward 50,000, while provincial market towns like Norwich, Winchester, and York rapidly expanded.<br><br>This medieval urban boom created an urgent sanitation crisis. Towns grew inside restrictive stone defensive walls, forcing builders to construct multi-storey timber homes with cantilevered upper floors called **jetties** that leaned over streets, blocking sunlight and air. Towns lacked piped water networks or storm sewers. Ordinary citizens fetched water in wooden buckets from public conduits, parish wells, or local rivers like the Fleet in London, which quickly grew fouled with household wash and street grime.',
    },
    {
      act: 2,
      title: 'Municipal Waste Battles: Rakers, Gong Farmers & Court Leet Fines',
      theme_heading: 'Municipal Waste Battles: Rakers, Gong Farmers & Court Leet Fines',
      text: '<span class="para-ref">[2.2]</span> Contrary to the myth that medieval people happily wallowed in filth, town corporations fought an active, organized battle against street squalor. Householders dug back-garden cesspits to collect privy waste. In cramped boroughs, however, cesspits frequently cracked and seeped into neighbour cellars or drinking wells. To fight this danger, town councils hired street sweepers called **rakers** to clear public markets and strictly banned wandering pigs from churning up alleys.<br><br>The dirtiest work fell to **gong farmers** (nightmen). Because sewage stench was feared as poisonous, gong farmers were legally allowed to work only between 9:00 PM and 5:00 AM under cover of darkness. Armed with shovels and tubs, they dug out overflowing cesspits and carted human manure outside city walls to sell to farmers. Borough court rolls (Source A) prove that citizens who dumped animal entrails into streets or neglected cesspits were prosecuted and fined at local Court Leet inquests.',
      source: {
        letter: 'A',
        title: 'Source A: Municipal Court Rolls of Norwich and Winchester (1312 & 1421)',
        image: '/images/black_death.jpg',
        caption:
          'Extracts from medieval Court Leet inquests: in 1312, John le Ropere of Norwich was fined two shillings for maintaining an overflowing dungheap on the public street; in 1421, Winchester bailiffs fined John Hende for allowing his cesspit to leak into the King’s ditch.',
        source_context:
          'Borough court rolls provide forensic legal evidence of medieval municipal regulation. Citizens were regularly prosecuted and fined for polluting public waterways and obstructing streets with offal. Hinge Question: Do town court fines prove that medieval councils were proactive protectors of health, or that municipal enforcement was completely overwhelmed by street filth?',
        how_useful_question:
          'How useful is Source A for an enquiry into how medieval town corporations attempted to regulate street sanitation?',
        provenance_clues: [
          'Author: Official town clerks recording sworn verdicts of local jury inquests.',
          'Audience: Town bailiffs, council aldermen, and fined citizens.',
          'Motive: To enforce municipal sanitation ordinances and collect fines for the borough treasury.',
        ],
        hinge_question:
          'Hinge Question: Do town court fines prove that medieval councils were proactive protectors of health, or that municipal enforcement was completely overwhelmed by street filth?',
        citation: 'Norfolk & Hampshire Record Offices • Medieval Borough Court Inquests.',
      },
    },
    {
      act: 3,
      title: 'Monastic Hydraulics: Canterbury Priory’s Five Settling Tanks (c.1165)',
      theme_heading: 'Monastic Hydraulics: Canterbury Priory’s Five Settling Tanks (c.1165)',
      text: '<span class="para-ref">[2.3]</span> The sharpest contrast to crowded town squalor lay inside medieval religious houses. Wealthy monasteries possessed the land, disciplined workforce, and vast wealth needed to engineer advanced water systems. At Christ Church Priory in Canterbury (Source B), a famous architectural plan from c.1165 in the Eadwine Psalter shows hydraulic ingenuity engineered by Monk Wibert, piping fresh spring water from hills over a mile outside the city walls.<br><br>Canterbury’s water passed through five consecutive **settling tanks** to filter out silt and dirt. This purified water flowed under gravity into an elevated water tower, supplying wash-basins, the infirmary, kitchen sculleries, and an ornate circular fountain (**lavatorium**) where monks washed hands before meals. Finally, wastewater flushed the monastic *reredorter* (communal latrine), carrying waste away into the River Stour.',
      source: {
        letter: 'B',
        title: 'Source B: Waterworks Plan of Christ Church Priory, Canterbury (c.1165)',
        image: '/images/water_local_fishbourne.jpg',
        caption:
          'Architectural schematic drawn by Monk Wibert in the Eadwine Psalter (c.1165). Fresh spring water was piped over a mile through lead conduits, filtered through five settling tanks, and distributed to running fountain basins and the monastic latrine.',
        source_context:
          'The Canterbury waterworks plan illustrates the pinnacle of medieval hydraulic engineering, proving that religious orders preserved and advanced fluid mechanics long after Roman authority collapsed. Hinge Question: Why were monastic orders able to engineer advanced hydraulic filtration while neighbouring townspeople drank polluted river water?',
        how_useful_question:
          'How useful is Source B for an enquiry into the differences between monastic and urban water supply in the Middle Ages?',
        provenance_clues: [
          'Author: Monk Wibert, hydraulic engineer and prior of Christ Church, Canterbury.',
          'Audience: The monastic community and future prior administrators maintaining the water system.',
          'Motive: To record the precise layout of underground lead pipes, stopcocks, and settling tanks for maintenance.',
        ],
        hinge_question:
          'Hinge Question: Why were monastic orders able to engineer advanced hydraulic filtration while neighbouring townspeople drank polluted river water?',
        citation: 'Trinity College Cambridge • Eadwine Psalter (MS R.17.1).',
      },
    },
    {
      act: 4,
      title: 'The Black Death Catastrophe: Bubonic Plague & Miasma Dogma (1348)',
      theme_heading: 'The Black Death Catastrophe: Bubonic Plague & Miasma Dogma (1348)',
      text: '<span class="para-ref">[2.4]</span> In the summer of 1348, an unprecedented catastrophe struck Britain: the **Black Death**. Caused by the bacterium *Yersinia pestis* carried on flea-infested black rats, the plague caused agonizing egg-sized swellings (**buboes**) in the groin and armpits, dark skin blotches, and violent coughing of blood. Between 1348 and 1350, the pandemic wiped out between 40% and 50% of the entire English population, emptying whole villages.<br><br>Medieval medicine was powerless. Physicians believed the plague was caused by divine wrath and poisonous bad air (**miasma**) rising from rotting filth. To ward off bad air, people burned aromatic herbs and barrels of tar in streets, carried sweet-smelling posies, and enforced port quarantines (*quarantena*—forty days). Councils ordered streets swept and closed public bathhouses (*bagnios*), fearing hot steam opened skin pores to miasma. Possessing no knowledge of microscopic germs or flea vectors, their desperate remedies could not halt the epidemic.',
    },
    {
      act: 5,
      title: 'Historical Verdict: The 1388 Statute of Cambridge & Peasant Realities',
      theme_heading: 'Historical Verdict: The 1388 Statute of Cambridge & Peasant Realities',
      text: '<span class="para-ref">[2.5]</span> Modern historians like Carole Rawcliffe have overturned the Victorian myth of the dirty medieval peasant. Archaeological fieldwork at Titchfield Abbey in Hampshire (Source C) shows how medieval religious houses engineered artificial river channels, freshwater culverts, and stone fishponds to safeguard health. Ordinary peasants also valued cleanliness, bathing in wooden tubs and cleaning teeth with salt.<br><br>In 1388, Parliament passed Britain’s first nationwide environmental law: the **Statute of Cambridge** under King Richard II. It imposed heavy royal fines for dumping animal dung, butchery offal, and rotting refuse into rivers and public ditches. Town wardens inspected latrines and prosecuted polluters. While medieval Britain lacked modern microbiology, the era was defined not by deliberate dirtiness, but by an organized, persistent municipal struggle against urban waste within the limits of pre-industrial technology.',
      source: {
        letter: 'C',
        title: 'Source C: Monastic Water Management at Titchfield Abbey (1232–1537)',
        image: '/images/titchfield/titchfield_estate_map_1605.jpg',
        caption:
          'Cartographic and landscape evidence from Titchfield Abbey in Hampshire, founded in 1232. The Premonstratensian canons engineered artificial river diversions, stone-lined freshwater culverts, and large fishponds providing fresh fish and running water.',
        source_context:
          'Fieldwork analysis of Titchfield Abbey confirms that monastic houses across Hampshire and Britain invested heavily in diverting natural waterways to ensure hygiene, food security, and cloister flushing. Hinge Question: How does the landscape evidence at Titchfield Abbey demonstrate monastic mastery over water supply?',
        how_useful_question:
          'How useful is Source C for an enquiry into monastic engineering and landscape transformation in medieval England?',
        provenance_clues: [
          'Author: Premonstratensian monastic hydraulic builders and seventeenth-century estate surveyors.',
          'Audience: Monastic community and subsequent landowning gentry.',
          'Motive: To manage water resources for domestic sanitation, grain milling, and fish breeding.',
        ],
        hinge_question:
          'Hinge Question: How does the landscape evidence at Titchfield Abbey demonstrate monastic mastery over water supply?',
        citation: 'Hampshire Cultural Trust • Titchfield Abbey Landscape Archaeology Archive.',
      },
    },
  ],

  tasks: [
    {
      id: 'ws_l2_q4_explain_why',
      type: 'extended_writing',
      topic: 'Question 4: Explain Why [12 marks • 15 mins]',
      title: 'Question 4: Explain Why [12 marks • 15 mins]',
      question:
        'Explain why living conditions and public health in medieval towns were so much worse than in medieval monasteries. [12 marks]',
      stimulus: [
        'The design and funding of monastic water systems such as Canterbury Priory',
        'The rapid, unregulated growth of commercial towns and lack of central taxation',
      ],
      scaffolding: {
        guidance:
          'Write a structured 3-paragraph PEEL response. Use the exact words from the question stem in your Point and in your Link for every paragraph.',
        structure_strip: [
          {
            col: '1. TOWN SQUALOR & LACK OF INFRASTRUCTURE',
            prompt:
              'Explain how rapid population growth, unpaved streets, animal butchery, and leaking cesspits contaminated town water supplies [2.1, 2.2].',
            starter:
              'A decisive reason explaining why living conditions in medieval towns were so much worse than in monasteries was the chaotic, uncoordinated growth of urban centres...',
          },
          {
            col: '2. MONASTIC WEALTH & HYDRAULIC PLANNING',
            prompt:
              'Explain how vast land endowments enabled monasteries (Canterbury, Titchfield) to construct settling tanks, lead conduits, and flushing reredorters [2.3].',
            starter:
              'In sharp contrast, public health was far superior in medieval monasteries because religious orders possessed immense wealth, land, and hydraulic planning...',
          },
          {
            col: '3. COMPARATIVE VERDICT',
            prompt:
              'Weigh whether financial wealth or geographical isolation was more decisive in explaining the health divide between towns and monasteries [2.3, 2.5].',
            starter:
              'Ultimately, the decisive factor explaining why living conditions in monasteries surpassed towns was the combination of religious wealth and long-term planning...',
          },
        ],
      },
      hints: [
        'Point: State your factor clearly using the exact words from the question stem.',
        'Evidence: Deploy specific historical details: Canterbury Priory (c.1165), 5 settling tanks, lead pipes, lavatorium, gong farmers, and Court Leet fines [2.2, 2.3].',
        'Explanation: Explain the causal connection: show why crowded towns lacked the financial endowments and unified governance needed to build piped water networks [2.1].',
        'Link: Conclude with a sustained comparative judgment: evaluate whether institutional wealth or urban density was the primary driver [2.5].',
      ],
      model_answer:
        'A decisive reason explaining why living conditions in medieval towns were so much worse than in monasteries was the chaotic, uncoordinated growth of urban centres following the Norman Conquest. As market boroughs like London, Winchester, and Norwich expanded, thousands of traders and craftsmen were packed into narrow, unpaved thoroughfares lined with multi-storey timber buildings with overhanging jetties. Towns lacked centralized Roman aqueducts and municipal sewage networks. Instead, households dug shallow back-garden cesspits that frequently leaked liquid waste through porous soil into parish wells and local rivers. Furthermore, butchers dumped rotting offal into street gutters, and roaming pigs churned roadways into filthy mud. Although town councils employed rakers and hired nocturnal gong farmers to empty cesspits, municipal court fines at Court Leet inquests could not keep pace with rapid urban squalor, ensuring that town drinking water was routinely contaminated with water-borne pathogens.<br><br>In sharp contrast, public health was far superior in medieval monasteries because religious orders possessed immense financial wealth, royal land endowments, and a disciplined community structure that prioritized cleanliness. Monastic rules, such as the Rule of Saint Benedict, required personal bodily washing and clean clothes before daily prayers and meals. At institutions like Christ Church Priory in Canterbury, Prior Wibert engineered an extraordinary hydraulic network in c.1165. Spring water was collected over a mile outside the city walls and conveyed through underground lead pipes into five successive settling tanks that filtered out mud and silt. Purified water was then distributed to sculleries, the infirmary, and an ornate circular lavatorium where monks washed before meals, before flushing the communal reredorter latrines directly into the river. Similarly, at Titchfield Abbey in Hampshire, canons canalized local river channels and excavated stone-lined fishponds. This level of planned hydraulic engineering ensured that monks drank clean water and avoided the intestinal parasites that plagued town dwellers.<br><br>Ultimately, the decisive factor explaining why living conditions in monasteries surpassed towns was the combination of long-term financial endowments and unified institutional authority. Monasteries were planned, self-contained sanctuaries constructed with private funds before monks even took up residence, allowing engineers to lay complex underground conduits without disrupting private property. In contrast, commercial boroughs were governed by divided town councils that lacked central tax revenue and faced furious ratepayer resistance whenever they attempted to levy taxes for street paving or sewage drainage. While towns were forced to rely on reactive emergency measures like the 1388 Statute of Cambridge, monasteries enjoyed proactive hydraulic infrastructure. Therefore, institutional wealth and long-term planning explain why monastic sanitation remained centuries ahead of squalid medieval towns.',
    },
  ],

  teacher_notes: {
    primer:
      'This enquiry challenges the Victorian stereotype of the "filthy dark ages". Guide pupils to recognize that while medieval towns struggled with structural density and lack of central taxation, citizens actively fined polluters and monasteries engineered world-class hydraulic filtration.',
    objectives: [
      {
        objective:
          'Contrast living conditions in crowded medieval towns with clean monastic complexes.',
        primer:
          'Direct pupils to paragraphs [2.2] and [2.3]. Contrast the gong farmer with Canterbury Priory’s settling tanks.',
        question:
          'Hinge Question: If medieval monks could build settling tanks and lead water pipes, why didn’t neighbouring townspeople copy their technology?',
      },
      {
        objective:
          'Assess how the Black Death (1348) challenged medieval ideas about health and disease.',
        primer:
          'Focus on paragraph [2.4]. Emphasise the miasma consensus and absence of germ theory.',
        question:
          'Hinge Question: Why did medieval town councils order bonfires and vinegar washing when plague struck, instead of focusing on clean drinking water?',
      },
    ],
    source_context: [
      {
        source: 'Source A (Court Rolls)',
        context:
          'Borough court inquests fining citizens for dungheaps and leaking cesspits. Hinge Question: Do town court fines prove that medieval councils were proactive protectors of health, or that municipal enforcement was completely overwhelmed by street filth?',
      },
      {
        source: 'Source B (Canterbury Water Plan)',
        context:
          'Schematic of Christ Church Priory showing 5-stage settling tanks and conduits. Hinge Question: Why were monastic orders able to engineer advanced hydraulic filtration while neighbouring townspeople drank polluted river water?',
      },
      {
        source: 'Source C (Titchfield Abbey)',
        context:
          'Landscape archaeology of Premonstratensian water management and fishponds. Hinge Question: How does the landscape evidence at Titchfield Abbey demonstrate monastic mastery over water supply?',
      },
    ],
  },

  video: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=nVJV8iEAm88',
      title: 'Medieval Monasteries: Engineering Water and Cleanliness',
      duration: '9 mins 15 secs',
      viewing_task:
        'Identify three ways monks at Canterbury or Fountains Abbey engineered clean water supplies.',
      model_answer:
        'Monks piped water from distant unpolluted springs through lead conduits, filtered water through settling tanks to remove silt, and flushed communal latrines directly into outflowing rivers.',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=YhsPPBGtquo',
      title: 'The Black Death (1348): Causes, Symptoms, and Medieval Responses',
      duration: '11 mins 40 secs',
      viewing_task:
        'Explain how medieval people attempted to protect themselves from the Black Death, and why their efforts failed.',
      model_answer:
        'Medieval people believed plague was caused by corrupt air (miasma) or divine wrath. They burned sweet herbs, carried pomanders, and prayed, but these measures failed because plague was transmitted by fleas on black rats carrying Yersinia pestis.',
    },
  ],

  quick_quiz: [
    {
      question: 'What happened to Roman water systems in Britain after AD 410?',
      options: [
        'They were completely destroyed by volcanoes',
        'They fell into disrepair as central taxes and engineers vanished',
        'They were expanded across every village',
        'They were sold to France',
      ],
      answer: 'They fell into disrepair as central taxes and engineers vanished',
    },
    {
      question: 'What was a self-governing medieval town granted a royal charter called?',
      options: ['A borough', 'A parish', 'A manor', 'A monastery'],
      answer: 'A borough',
    },
    {
      question: 'Why were medieval houses built with overhanging upper storeys (jetties)?',
      options: [
        'To create extra floor space within cramped walled towns',
        'To catch rainwater from roofs',
        'To defend against archers',
        'To look like French castles',
      ],
      answer: 'To create extra floor space within cramped walled towns',
    },
    {
      question: 'What was a deep pit dug behind a house to collect human toilet waste called?',
      options: ['An aqueduct', 'A cesspit', 'A settling tank', 'A conduit'],
      answer: 'A cesspit',
    },
    {
      question: 'What specialist workers were hired to dig out cesspits under cover of darkness?',
      options: ['Gong farmers (nightmen)', 'Town rakers', 'Blacksmiths', 'Monastic scribes'],
      answer: 'Gong farmers (nightmen)',
    },
    {
      question: 'During what hours were gong farmers legally allowed to work in medieval towns?',
      options: ['9:00 AM to 5:00 PM', '9:00 PM to 5:00 AM', 'Only at noon', 'Any time of day'],
      answer: '9:00 PM to 5:00 AM',
    },
    {
      question: 'What was done with the waste shoveled out of town cesspits?',
      options: [
        'Dumped in the town church',
        'Sold to suburban farmers as agricultural fertilizer',
        'Burned in public bonfires',
        'Thrown onto house roofs',
      ],
      answer: 'Sold to suburban farmers as agricultural fertilizer',
    },
    {
      question: 'What local court prosecuted and fined citizens for dumping waste in the street?',
      options: [
        'The Court Leet',
        'The High Court of Parliament',
        'The Star Chamber',
        'The Papal Curia',
      ],
      answer: 'The Court Leet',
    },
    {
      question:
        'At which famous English priory was a sophisticated waterworks map drawn in c.1165?',
      options: [
        'Christ Church Priory, Canterbury',
        'Titchfield Abbey',
        'Battle Abbey',
        'Waverley Abbey',
      ],
      answer: 'Christ Church Priory, Canterbury',
    },
    {
      question:
        'What engineering feature was used at Canterbury to filter sand and silt from spring water?',
      options: [
        'Electric carbon filters',
        'Five successive settling tanks',
        'Boiling cauldrons',
        'Chlorine tablets',
      ],
      answer: 'Five successive settling tanks',
    },
    {
      question: 'What was the stone washing trough outside a monastic dining hall called?',
      options: ['A lavatorium', 'A reredorter', 'A cloister', 'A refectory'],
      answer: 'A lavatorium',
    },
    {
      question: 'What was a communal monastic latrine block called?',
      options: ['A reredorter', 'A lavatorium', 'A scriptorium', 'A chapter house'],
      answer: 'A reredorter',
    },
    {
      question:
        'Which local abbey in Hampshire engineered fishponds and river diversions for clean water?',
      options: ['Titchfield Abbey', 'Portchester Castle', 'Winchester College', 'Netley Castle'],
      answer: 'Titchfield Abbey',
    },
    {
      question: 'In what year did the Black Death arrive in England?',
      options: ['AD 43', '1066', '1348', '1665'],
      answer: '1348',
    },
    {
      question: 'What bacterium caused the Black Death?',
      options: [
        'Vibrio cholerae',
        'Yersinia pestis',
        'Mycobacterium tuberculosis',
        'Salmonella typhi',
      ],
      answer: 'Yersinia pestis',
    },
    {
      question: 'How was the Black Death primarily transmitted between humans and rats?',
      options: [
        'Contaminated water pipes',
        'Bites from rat fleas',
        'Eating bad meat',
        'Breathing cold wind',
      ],
      answer: 'Bites from rat fleas',
    },
    {
      question:
        'What incorrect medical theory blamed the Black Death on poisonous, foul-smelling air?',
      options: ['Germ theory', 'Miasma theory', 'Four humours theory', 'Circulation theory'],
      answer: 'Miasma theory',
    },
    {
      question: 'What proportion of the English population died during the 1348–1350 Black Death?',
      options: ['About 5%', 'Between 40% and 50%', 'Exactly 95%', 'Nobody died'],
      answer: 'Between 40% and 50%',
    },
    {
      question:
        'What landmark law was passed in 1388 banning the dumping of offal and dung into rivers?',
      options: [
        'The Act of Supremacy',
        'The Statute of Cambridge',
        'The Public Health Act',
        'The Magna Carta',
      ],
      answer: 'The Statute of Cambridge',
    },
    {
      question:
        'Which modern historian challenged the myth that medieval people were dirty and ignorant?',
      options: ['Carole Rawcliffe', 'Edwin Chadwick', 'Joseph Bazalgette', 'John Snow'],
      answer: 'Carole Rawcliffe',
    },
  ],
  quiz: [],
};

module.exports.quiz = module.exports.quick_quiz;
