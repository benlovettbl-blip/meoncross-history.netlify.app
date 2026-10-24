// ==========================================================================
// Pearson Edexcel GCSE History (9-1) Paper 1 Section A: Historic Environment
// The British sector of the Western Front, 1914-18: Injuries, Treatments and the Trenches
// Master 2-Mark "Describe One Feature of..." Question & Answer Bank
//
// Exam Specification Architecture:
// In the official exam, Question 1 is asked as two separate 2-mark questions:
// - Question 1(a): "Describe one feature of [Topic]..." [2 marks]
// - Question 1(b): "Describe one feature of [Topic]..." [2 marks]
// Marking Criteria per feature:
// - Award 1 mark for valid identification of a historical feature.
// - Award 1 mark for supporting factual detail / context (measurements, dates, locations, medical procedures).
// ==========================================================================

export const WESTERN_FRONT_FEATURES_DATABASE = [
  // --------------------------------------------------------------------------
  // Category 1: Battles & Salient Topography
  // --------------------------------------------------------------------------
  {
    id: 'wf_ypres_salient',
    topic: 'Ypres Salient',
    category: 'Battles & Topography',
    question: 'Describe one feature of the Ypres Salient.',
    feature1: {
      heading: 'Vital Supply Corridor to Channel Ports',
      text: 'Stood on the most direct routes to English Channel ports such as Calais and Dunkirk, so was vital to keep forces well-supplied.',
    },
    feature2: {
      heading: 'Vulnerable Topography Surrounded on Three Sides',
      text: 'British forces were surrounded on three sides by German forces on higher ground such as Hill 60, with the British holding onto the town of Ypres.',
    },
    keywords: [
      'ypres',
      'salient',
      'channel ports',
      'calais',
      'dunkirk',
      'hill 60',
      'higher ground',
      'surrounded',
    ],
  },
  {
    id: 'wf_1st_ypres_1914',
    topic: '1st Battle of Ypres - 1914',
    category: 'Battles & Topography',
    question: 'Describe one feature of the 1st Battle of Ypres (1914).',
    feature1: {
      heading: 'Part of the "Race to the Sea"',
      text: 'Part of the "Race to the Sea" during autumn 1914, fought to prevent German forces encircling the Allies and capturing the vital northern French ports.',
    },
    feature2: {
      heading: 'High Casualties to Establish the Salient',
      text: 'The British suffered 58,000 casualties but successfully held onto Ypres, establishing the salient that defined fighting in Flanders for the rest of the war.',
    },
    keywords: [
      '1st ypres',
      '1914',
      'race to the sea',
      '58000',
      'casualties',
      'encircling',
      'flanders',
    ],
  },
  {
    id: 'wf_mines_hill_60_1915',
    topic: 'Mines at Hill 60 - 1915',
    category: 'Battles & Topography',
    question: 'Describe one feature of the mines at Hill 60 (1915).',
    feature1: {
      heading: 'Underground Tunnelling Warfare',
      text: "Welsh and Australian specialist tunnelling companies dug deep tunnels beneath No Man's Land, with German troops counter-tunnelling to detect and destroy them.",
    },
    feature2: {
      heading: 'Detonation of Massive Ammonite Mines',
      text: 'Five ammonite mines were detonated under the German positions, blowing the entire top off the hill and allowing Allied infantry to briefly capture the strategic high ground.',
    },
    keywords: [
      'hill 60',
      '1915',
      'mines',
      'welsh',
      'australian',
      'ammonite',
      'counter-tunnelling',
      'tunnels',
    ],
  },
  {
    id: 'wf_2nd_ypres_1915',
    topic: '2nd Battle of Ypres - 1915',
    category: 'Battles & Topography',
    question: 'Describe one feature of the 2nd Battle of Ypres (1915).',
    feature1: {
      heading: 'First Mass Use of Chlorine Gas',
      text: 'Marked the first mass deployment of lethal chlorine gas by the German Army on the Western Front; Allied troops were completely unprepared and had no gas masks.',
    },
    feature2: {
      heading: 'Severe British Casualties without Loss of Town',
      text: 'British casualties totalled 59,000 men during the battle, but despite the initial panic and retreat from the gas cloud, the Germans failed to capture the town of Ypres.',
    },
    keywords: [
      '2nd ypres',
      '1915',
      'chlorine gas',
      'gas masks',
      '59000',
      'unprepared',
      'suffocation',
    ],
  },
  {
    id: 'wf_battle_somme_1916',
    topic: 'Battle of the Somme - 1916',
    category: 'Battles & Topography',
    question: 'Describe one feature of the Battle of the Somme (1916).',
    feature1: {
      heading: 'Catastrophic First-Day Casualties',
      text: 'On the first day alone (1 July 1916), the British suffered 57,000 casualties (including 19,000 dead) while attempting to break German lines and relieve pressure on the French at Verdun.',
    },
    feature2: {
      heading: 'First Deployment of Tanks in Warfare',
      text: 'Featured the first use of tanks in warfare, though to minimal effect as many of the early Mark I tanks broke down mechanically or became bogged down in shell craters.',
    },
    keywords: [
      'somme',
      '1916',
      'july 1',
      '57000',
      '60000',
      'verdun',
      'tanks',
      'mark i',
      'first day',
    ],
  },
  {
    id: 'wf_battle_arras_1917',
    topic: 'Battle of Arras - 1917',
    category: 'Battles & Topography',
    question: 'Describe one feature of the Battle of Arras (1917).',
    feature1: {
      heading: 'Expansion of Chalk Quarries and Roman Tunnels',
      text: 'The soft chalky soil of Arras made tunnelling relatively easy, allowing British and New Zealand miners to expand ancient Roman quarries into a vast underground subterranean transit network.',
    },
    feature2: {
      heading: "Underground Hospital Complex (Thompson's Cave)",
      text: 'An enormous underground hospital was constructed inside the caverns with space for 700 beds, fully equipped operating theatres, and its own independent water and electricity supplies.',
    },
    keywords: [
      'arras',
      '1917',
      'chalk',
      'roman',
      "thompson's cave",
      '700 beds',
      'underground hospital',
      'quarries',
    ],
  },
  {
    id: 'wf_3rd_ypres_passchendaele_1917',
    topic: '3rd Battle of Ypres / Passchendaele - 1917',
    category: 'Battles & Topography',
    question: 'Describe one feature of the 3rd Battle of Ypres (Passchendaele) (1917).',
    feature1: {
      heading: 'Impassable Liquid Mud and Destroyed Drainage',
      text: 'Heavy unseasonal rain combined with constant artillery bombardment destroyed the delicate Flemish drainage system, turning the ground into liquid mud in which soldiers, horses, and equipment drowned.',
    },
    feature2: {
      heading: 'Massive Attrition for Minimal Territorial Gain',
      text: 'The British suffered an estimated 245,000 casualties to push the frontline forward by only seven miles to capture the ruined village of Passchendaele.',
    },
    keywords: [
      'passchendaele',
      '3rd ypres',
      '1917',
      'mud',
      'drainage',
      'drowned',
      '250000',
      'seven miles',
    ],
  },
  {
    id: 'wf_battle_cambrai_1917',
    topic: 'Battle of Cambrai - 1917',
    category: 'Battles & Topography',
    question: 'Describe one feature of the Battle of Cambrai (1917).',
    feature1: {
      heading: 'First Massed Tank Attack in History',
      text: 'Saw the first large-scale massed deployment of nearly 500 tanks operating closely alongside infantry, successfully breaking through the formidable German Hindenburg Line defenses.',
    },
    feature2: {
      heading: 'Predicted Artillery Fire without Preliminary Barrage',
      text: 'The British used predicted artillery fire without a multi-day preliminary bombardment, achieving tactical surprise against German defenders before counter-attacks inflicted 40,000 casualties.',
    },
    keywords: [
      'cambrai',
      '1917',
      'tanks',
      '500 tanks',
      'hindenburg line',
      'predicted artillery',
      'surprise',
      'blood bank',
    ],
  },

  // --------------------------------------------------------------------------
  // Category 2: Trench Architecture & Underground Systems
  // --------------------------------------------------------------------------
  {
    id: 'wf_trench_system',
    topic: 'Trench System',
    category: 'Trench Architecture',
    question: 'Describe one feature of the trench system on the Western Front.',
    feature1: {
      heading: 'Zig-Zag Traverse Pattern',
      text: 'Trenches were constructed in a zig-zag or traverse pattern rather than straight lines, preventing enemies from firing down the entire length if they breached the trench.',
    },
    feature2: {
      heading: 'Defensive Infrastructure and Communication Links',
      text: 'Trenches provided defensive cover from machine guns and shrapnel, featuring underground dugouts for shelter and communication trenches linking to lines behind.',
    },
    keywords: [
      'trench system',
      'zig-zag',
      'traverse',
      'straight',
      'machine gun',
      'dugouts',
      'communication',
    ],
  },
  {
    id: 'wf_structure_of_trenches',
    topic: 'Structure of Trenches',
    category: 'Trench Architecture',
    question: 'Describe one feature of the structure of trenches.',
    feature1: {
      heading: 'Tiered Defensive Lines',
      text: 'Consisted of multiple parallel lines of trenches: the frontline firing trench, support trench, and reserve trench, all interconnected by perpendicular communication trenches.',
    },
    feature2: {
      heading: 'Standardized Dimensions and Firing Features',
      text: 'Typically dug 2 to 2.5 metres deep, featuring a raised fire step for shooting, a sandbagged parapet at the front, and a parados at the rear to protect from explosive blasts.',
    },
    keywords: [
      'structure',
      'frontline',
      'support',
      'reserve',
      'parapet',
      'fire step',
      'parados',
      '2.5 metres',
    ],
  },
  {
    id: 'wf_frontline_trench',
    topic: 'Frontline Trench',
    category: 'Trench Architecture',
    question: 'Describe one feature of a frontline trench.',
    feature1: {
      heading: 'Nearest Line of Combat Engagement',
      text: "Located closest to enemy lines across No Man's Land, equipped with a firing step for sentries and deep underground dugouts for cover during shellfire.",
    },
    feature2: {
      heading: 'Traverse Construction to Contain Blast Damage',
      text: 'Dug roughly 2 to 2.5 metres deep in a zig-zag traverse pattern to restrict bomb blast radii and prevent invading infantry from sweeping the line.',
    },
    keywords: [
      'frontline',
      "no man's land",
      'fire step',
      'sentries',
      'dugouts',
      'shellfire',
      'traverse',
    ],
  },
  {
    id: 'wf_support_trenches',
    topic: 'Support Trenches',
    category: 'Trench Architecture',
    question: 'Describe one feature of support trenches.',
    feature1: {
      heading: 'Immediate Reinforcement and Retreat Position',
      text: 'Located approximately 60 to 100 metres behind the frontline trench, holding secondary troops and providing a designated retreat position if the front fell.',
    },
    feature2: {
      heading: 'Reserve Line Depth for Major Counter-Attacks',
      text: 'Reserve trenches were positioned hundreds of metres further back to assemble reserve battalions capable of launching organized counter-offensives.',
    },
    keywords: ['support trench', 'reserve', '100m', 'reinforcement', 'counter-attack', 'retreat'],
  },
  {
    id: 'wf_caves_tunnels_arras',
    topic: 'Caves and Tunnels at Arras',
    category: 'Trench Architecture',
    question: 'Describe one feature of the caves and tunnels at Arras.',
    feature1: {
      heading: 'Comprehensive Domestic Utilities Underground',
      text: 'Equipped with running water, electric lighting, kitchens, and sleeping accommodation for up to 25,000 soldiers hidden directly beneath the town of Arras.',
    },
    feature2: {
      heading: "Subterranean Thompson's Cave Hospital",
      text: "Contained a complete underground hospital (Thompson's Cave) with 700 beds and operating theatres, though abandoned in 1917 after its water supply was destroyed.",
    },
    keywords: [
      'arras',
      'caves',
      'tunnels',
      'running water',
      'electricity',
      '25000',
      "thompson's cave",
      '700 beds',
    ],
  },

  // --------------------------------------------------------------------------
  // Category 3: Conditions & Battlefield Trauma
  // --------------------------------------------------------------------------
  {
    id: 'wf_trench_foot',
    topic: 'Trench Foot',
    category: 'Conditions & Battlefield Trauma',
    question: 'Describe one feature of trench foot.',
    feature1: {
      heading: 'Tissue Necrosis from Cold Water Immersion',
      text: 'Caused by prolonged standing in freezing water and mud, which restricted blood circulation and caused swelling, blisters, tissue decomposition, and gangrene.',
    },
    feature2: {
      heading: 'Strict Preventative Regimen',
      text: 'Treated primarily through prevention: soldiers were ordered to change dry socks frequently, rub whale oil into their feet, and undergo mandatory daily inspections by officers.',
    },
    keywords: [
      'trench foot',
      'circulation',
      'gangrene',
      'whale oil',
      'dry socks',
      'inspections',
      'amputation',
    ],
  },
  {
    id: 'wf_gas_gangrene',
    topic: 'Gas Gangrene',
    category: 'Conditions & Battlefield Trauma',
    question: 'Describe one feature of gas gangrene.',
    feature1: {
      heading: 'Bacterial Infection from Heavily Fertilized French Soil',
      text: 'Intensively farmed French fields contained anaerobic Clostridium bacteria that entered wounds on dirty uniform fragments, producing gas that destroyed surrounding muscle tissue.',
    },
    feature2: {
      heading: 'Treatment via Carrel-Dakin Antiseptic Irrigation',
      text: 'Treated using surgical debridement and the Carrel-Dakin method, which continuously flushed wounds with a sterilised sodium hypochlorite solution through rubber tubes.',
    },
    keywords: [
      'gas gangrene',
      'clostridium',
      'fertilizer',
      'soil',
      'carrel-dakin',
      'antiseptic',
      'debridement',
    ],
  },
  {
    id: 'wf_trench_fever',
    topic: 'Trench Fever',
    category: 'Conditions & Battlefield Trauma',
    question: 'Describe one feature of trench fever.',
    feature1: {
      heading: 'Debilitating Flu-Like Symptoms',
      text: 'Produced high remittent fever, severe headaches, and intense muscle pain in the shins, incapacitating an estimated 500,000 British soldiers during the war.',
    },
    feature2: {
      heading: 'Transmission by Body Lice and Delousing Measures',
      text: 'Identified in 1918 as being transmitted by body lice feces, leading to the creation of delousing stations, steam sterilisation machines, and boiling clothes in paraffin.',
    },
    keywords: [
      'trench fever',
      'lice',
      'body lice',
      'delousing',
      'shins',
      '500000',
      'fever',
      'steam',
    ],
  },
  {
    id: 'wf_shellshock',
    topic: 'Shellshock',
    category: 'Conditions & Battlefield Trauma',
    question: 'Describe one feature of shellshock.',
    feature1: {
      heading: 'Severe Psychological and Neurological Breakdown',
      text: 'Caused by prolonged artillery bombardment, resulting in debilitating psychological trauma including severe tremors, hysterical blindness, muteness, and paralysis.',
    },
    feature2: {
      heading: 'Misunderstood Condition and Severe Military Discipline',
      text: 'Poorly understood by military authorities who often treated sufferers as malingerers or cowards; approximately 306 British soldiers were executed, many showing shellshock symptoms.',
    },
    keywords: [
      'shellshock',
      'ptsd',
      'bombardment',
      'tremors',
      'muteness',
      'cowardice',
      'executed',
      '306',
    ],
  },
  {
    id: 'wf_amputation',
    topic: 'Amputation',
    category: 'Conditions & Battlefield Trauma',
    question: 'Describe one feature of amputation on the Western Front.',
    feature1: {
      heading: 'Emergency Measure to Prevent Fatal Sepsis',
      text: 'Used as an extreme last resort when wound debridement or antiseptic irrigation failed to halt the rapid spread of gas gangrene or fatal bloodstream infection.',
    },
    feature2: {
      heading: 'Mass Scale Driving Prosthetic Innovations',
      text: 'Over 240,000 British servicemen underwent limb amputations by 1918, driving major medical advances in surgical techniques and the mass production of lightweight artificial limbs.',
    },
    keywords: [
      'amputation',
      '240000',
      'gangrene',
      'sepsis',
      'prosthetic',
      'artificial limbs',
      'limbs',
    ],
  },
  {
    id: 'wf_types_of_wound',
    topic: 'Types of Wound from Battle',
    category: 'Conditions & Battlefield Trauma',
    question: 'Describe one feature of battle wounds on the Western Front.',
    feature1: {
      heading: 'High-Explosive Shells and Shrapnel Dominance',
      text: 'High-explosive artillery shells and metal shrapnel caused approximately 60% of all battlefield wounds, lacerating flesh and shattering bones.',
    },
    feature2: {
      heading: 'Disproportionate Psychological Impact of Gas',
      text: 'While poison gas attacks caused immense panic and horrific blistering, they accounted for only about 6,000 British deaths due to the swift issue of protective gas respirators.',
    },
    keywords: [
      'wounds',
      'shrapnel',
      '60%',
      'artillery',
      'gas',
      '6000',
      'brodie helmet',
      'respirator',
    ],
  },
  {
    id: 'wf_problem_of_shrapnel',
    topic: 'The Problem of Shrapnel',
    category: 'Conditions & Battlefield Trauma',
    question: 'Describe one feature of the problem of shrapnel.',
    feature1: {
      heading: 'Vulnerability to Severe Cranial Trauma',
      text: 'Exploding artillery shells sprayed jagged metal balls and casing that struck exposed soldiers in the head and shoulders, fracturing skulls and inflicting brain damage.',
    },
    feature2: {
      heading: 'Deep Bacterial Contamination from Uniform Cloth',
      text: 'Jagged shrapnel fragments dragged dirty, manure-soaked uniform cloth deep into wound cavities, creating ideal anaerobic conditions for tetanus and gas gangrene.',
    },
    keywords: [
      'shrapnel',
      'jagged',
      'head wounds',
      'skulls',
      'uniform',
      'infection',
      'manure',
      'tetanus',
    ],
  },
  {
    id: 'wf_head_injuries',
    topic: 'Head Injuries',
    category: 'Conditions & Battlefield Trauma',
    question: 'Describe one feature of head injuries on the Western Front.',
    feature1: {
      heading: 'Dramatic Reduction via the Brodie Steel Helmet (1915)',
      text: 'The introduction of the steel Brodie helmet in 1915 reduced fatal head wounds by up to 80%, meaning far more soldiers survived with severe skull fractures.',
    },
    feature2: {
      heading: 'Spurred Pioneering Plastic Surgery by Harold Gillies',
      text: "Over 60,000 British soldiers suffered severe facial disfigurements, prompting surgeon Harold Gillies to establish the Queen's Hospital in Kent for specialized facial reconstruction.",
    },
    keywords: [
      'head injuries',
      'brodie helmet',
      '1915',
      '80%',
      'harold gillies',
      'plastic surgery',
      'facial',
      "queen's hospital",
    ],
  },
  {
    id: 'wf_effects_of_gas_attacks',
    topic: 'Effects of Gas Attacks',
    category: 'Conditions & Battlefield Trauma',
    question: 'Describe one feature of the effects of gas attacks.',
    feature1: {
      heading: 'Chlorine Gas Causes Death by Internal Suffocation',
      text: 'First deployed at 2nd Ypres in 1915, chlorine gas stripped the lining of the bronchial tubes and caused fluid to fill the lungs, leading to agonizing death by suffocation.',
    },
    feature2: {
      heading: 'Mustard Gas Causes External and Internal Blisters',
      text: 'Introduced in 1917, mustard gas was an odourless blistering agent that penetrated clothing, burning the skin, blinding soldiers, and remaining active in the soil for weeks.',
    },
    keywords: [
      'gas attacks',
      'chlorine',
      'mustard gas',
      'suffocation',
      'blisters',
      '1915',
      '1917',
      'blindness',
    ],
  },

  // --------------------------------------------------------------------------
  // Category 4: The Evacuation Chain & Medical Transport
  // --------------------------------------------------------------------------
  {
    id: 'wf_transport_of_injured',
    topic: 'Transport of the Injured',
    category: 'Evacuation Chain & Transport',
    question: 'Describe one feature of the transport of the injured.',
    feature1: {
      heading: 'Frontline Manual Stretcher Transit',
      text: 'Near the frontline, wounded men had to be carried manually by stretcher bearers and loaded into horse-drawn or motor ambulance wagons over shell-cratered tracks.',
    },
    feature2: {
      heading: 'Long-Distance Evacuation via Trains and Barges',
      text: 'Beyond the clearing stations, wounded soldiers were transported smoothly to port hospitals using custom-fitted hospital trains and river barges along French canals.',
    },
    keywords: [
      'transport',
      'stretcher bearers',
      'ambulance',
      'hospital trains',
      'barges',
      'canals',
      'ports',
    ],
  },
  {
    id: 'wf_ramc',
    topic: 'RAMC (Royal Army Medical Corps)',
    category: 'Evacuation Chain & Transport',
    question: 'Describe one feature of the RAMC (Royal Army Medical Corps).',
    feature1: {
      heading: 'Comprehensive Responsibility for Medical Services',
      text: 'Responsible for all formal military medical care on the Western Front, overseeing doctors, field medical officers, hospital administration, and stretcher teams.',
    },
    feature2: {
      heading: 'Massive Wartime Expansion',
      text: 'Expanded exponentially from 9,000 personnel in 1914 to over 113,000 by 1918 to manage the unprecedented scale of industrialized combat casualties.',
    },
    keywords: [
      'ramc',
      'royal army medical corps',
      '9000',
      '113000',
      'doctors',
      'stretcher',
      'expansion',
    ],
  },
  {
    id: 'wf_fany',
    topic: 'FANY (First Aid Nursing Yeomanry)',
    category: 'Evacuation Chain & Transport',
    question: 'Describe one feature of the FANY (First Aid Nursing Yeomanry).',
    feature1: {
      heading: 'Initial Service with Belgian and French Armies',
      text: 'Founded in 1907 as a voluntary corps, female FANY members were initially barred from the British sector and served with the Belgian and French armies until officially accepted by Britain in 1916.',
    },
    feature2: {
      heading: 'Frontline Ambulance Drivers and Mobile Canteen Staff',
      text: 'Operated motor ambulance convoys under dangerous fire, driving wounded troops between Dressing Stations, Casualty Clearing Stations, and Base Hospitals.',
    },
    keywords: [
      'fany',
      'first aid nursing yeomanry',
      '1916',
      'ambulance drivers',
      'belgian',
      'french',
      'women',
    ],
  },
  {
    id: 'wf_stretcher_bearers',
    topic: 'Stretcher Bearers',
    category: 'Evacuation Chain & Transport',
    question: 'Describe one feature of stretcher bearers on the Western Front.',
    feature1: {
      heading: 'Dangerous Retrieval under Enemy Fire',
      text: "Operated under intense artillery fire, often at night or during combat lulls, to recover injured soldiers from shell craters in No Man's Land who could not walk.",
    },
    feature2: {
      heading: 'Exhausting Teams Scaled to Muddy Conditions',
      text: 'Standard stretcher teams of four men had to be expanded to six or eight bearers per casualty in treacherous mud like Passchendaele to prevent the stretcher slipping.',
    },
    keywords: [
      'stretcher bearers',
      'four men',
      'passchendaele',
      'six or eight',
      "no man's land",
      'night',
      'mud',
    ],
  },
  {
    id: 'wf_horse_motor_ambulances',
    topic: 'Horse/Motor Ambulance Wagons',
    category: 'Evacuation Chain & Transport',
    question: 'Describe one feature of horse/motor ambulance wagons.',
    feature1: {
      heading: 'Motor Ambulances Accelerated Transit Behind the Lines',
      text: 'The arrival of motor ambulances funded by the British Red Cross significantly sped up transit times from dressing stations to clearing stations on paved roads.',
    },
    feature2: {
      heading: 'Horse-Drawn Ambulances Retained for Muddy Frontlines',
      text: 'Horse-drawn wagons remained indispensable throughout the war because motor vehicles frequently broke down or became hopelessly bogged down in thick cratered mud.',
    },
    keywords: ['horse', 'motor ambulance', 'red cross', 'mud', 'paved roads', 'bogged', 'wagons'],
  },
  {
    id: 'wf_rap',
    topic: 'Regimental Aid Post (RAP)',
    category: 'Evacuation Chain & Transport',
    question: 'Describe one feature of a Regimental Aid Post (RAP).',
    feature1: {
      heading: 'Immediate Proximity to the Firing Line',
      text: 'Located within 200 metres of the frontline in communication trenches, ruined buildings, or deep dugouts to administer immediate triage and wound dressing.',
    },
    feature2: {
      heading: 'Primary Sorting and Immediate Dressing Station Transfer',
      text: 'Run by one Medical Officer and orderly team; soldiers with superficial wounds were bandaged and returned to the line, while severe casualties were evacuated back to an ADS.',
    },
    keywords: [
      'rap',
      'regimental aid post',
      '200 metres',
      'dugout',
      'triage',
      'medical officer',
      'dressing',
    ],
  },
  {
    id: 'wf_field_ambulances',
    topic: 'Field Ambulances',
    category: 'Evacuation Chain & Transport',
    question: 'Describe one feature of Field Ambulances.',
    feature1: {
      heading: 'Mobile RAMC Operational Units',
      text: 'Large, mobile medical units of the Royal Army Medical Corps comprising medical officers, orderlies, and bearers responsible for manning Advanced and Main Dressing Stations.',
    },
    feature2: {
      heading: 'Implementation of Systematic Triage',
      text: 'Sorted casualties into three clinical categories: those who could quickly return to fight, those requiring urgent surgery at a CCS, and hopeless cases given palliative morphine.',
    },
    keywords: ['field ambulance', 'ramc', 'triage', 'ads', 'mds', 'dressing station', 'sorting'],
  },
  {
    id: 'wf_dressing_stations',
    topic: 'Dressing Stations (ADS/MDS)',
    category: 'Evacuation Chain & Transport',
    question: 'Describe one feature of Dressing Stations (ADS/MDS).',
    feature1: {
      heading: 'Tiered Position in the Evacuation Chain',
      text: 'Advanced Dressing Stations (ADS) sat roughly 400 metres behind the front, while Main Dressing Stations (MDS) operated around 1.5 km back in tents or farmhouses.',
    },
    feature2: {
      heading: 'Triage Processing for up to 1,000 Casualties',
      text: 'Designed to treat emergency wound shock and sort casualties via triage, handling up to 1,000 men over a few days during major offensives before transport to a CCS.',
    },
    keywords: ['dressing stations', 'ads', 'mds', '400m', '1.5km', 'triage', 'shock', 'farmhouses'],
  },
  {
    id: 'wf_casualty_clearing_stations',
    topic: 'Casualty Clearing Stations (CCS)',
    category: 'Evacuation Chain & Transport',
    question: 'Describe one feature of Casualty Clearing Stations (CCS).',
    feature1: {
      heading: 'Primary Surgical Center of the Evacuation Chain',
      text: 'Located 7 to 12 miles back from the frontline out of artillery range, equipped with operating theatres, mobile X-ray units, and surgical teams to treat life-threatening wounds.',
    },
    feature2: {
      heading: 'Strategic Rail and Water Transport Links',
      text: 'Positioned adjacent to railway sidings or canals so large numbers of post-operative patients could be swiftly loaded onto ambulance trains or barges bound for Base Hospitals.',
    },
    keywords: [
      'ccs',
      'casualty clearing station',
      '7 to 12 miles',
      'surgery',
      'amputation',
      'railway',
      'x-ray',
    ],
  },
  {
    id: 'wf_base_hospitals',
    topic: 'Base Hospitals',
    category: 'Evacuation Chain & Transport',
    question: 'Describe one feature of Base Hospitals.',
    feature1: {
      heading: 'Large Facilities Located near French Channel Ports',
      text: 'Situated in large requisitioned civilian hospitals, hotels, and barracks near ports like Boulogne and Rouen, with easy access to hospital ships returning to Britain.',
    },
    feature2: {
      heading: 'Specialised Treatment Units and Rehabilitation',
      text: 'Divided into dedicated specialist wards for gas poisoning, amputees, and head injuries, providing longer-term convalescent care or organizing transport to England.',
    },
    keywords: [
      'base hospitals',
      'ports',
      'boulogne',
      'rouen',
      'specialised',
      'wards',
      'convalescent',
      'england',
    ],
  },
  {
    id: 'wf_chain_of_evacuation',
    topic: 'Chain of Evacuation',
    category: 'Evacuation Chain & Transport',
    question: 'Describe one feature of the Chain of Evacuation.',
    feature1: {
      heading: 'Four Progressive Stages of Medical Care',
      text: 'Structured as a four-stage hierarchy: Regimental Aid Post (RAP) -> Advanced/Main Dressing Station -> Casualty Clearing Station (CCS) -> Base Hospital.',
    },
    feature2: {
      heading: 'Triage Determines Speed and Route of Transit',
      text: 'Utilized triage at every stage to prioritize immediate surgical cases and avoid clogging forward aid posts, keeping soldiers moving towards appropriate medical facilities.',
    },
    keywords: [
      'chain of evacuation',
      'four stages',
      'rap',
      'dressing station',
      'ccs',
      'base hospital',
      'triage',
    ],
  },
  {
    id: 'wf_underground_hospital_arras',
    topic: 'The Underground Hospital at Arras',
    category: 'Evacuation Chain & Transport',
    question: 'Describe one feature of the Underground Hospital at Arras.',
    feature1: {
      heading: 'Massive Subterranean Hospital Capacity (700 Beds)',
      text: "Known as Thompson's Cave, it was constructed in expanded Roman quarries 800 metres from the line, housing 700 beds, operating theatres, and a mortuary completely bomb-proof.",
    },
    feature2: {
      heading: 'Integrated Domestic Infrastructure Abandoned in 1917',
      text: 'Included running water, electric generators, and a light rail track to transport wounded soldiers, though closed after its water supply was destroyed during the 1917 battle.',
    },
    keywords: [
      'arras hospital',
      "thompson's cave",
      '700 beds',
      'operating theatres',
      'bomb-proof',
      'generators',
      'light rail',
    ],
  },

  // --------------------------------------------------------------------------
  // Category 5: Medical & Surgical Innovations
  // --------------------------------------------------------------------------
  {
    id: 'wf_aseptic_surgery',
    topic: 'Aseptic Surgery',
    category: 'Surgery & Medical Innovations',
    question: 'Describe one feature of aseptic surgery on the Western Front.',
    feature1: {
      heading: 'Steam Sterilisation of Operating Equipment',
      text: 'All surgical instruments were sterilised in autoclaves using high-pressure steam, proving far more effective at killing resilient soil bacteria than chemical carbolic acid.',
    },
    feature2: {
      heading: 'Sterile Operating Attire and Environment',
      text: 'Surgeons adopted sterile rubber gloves, gowns, and face masks, eliminating bacteria transferred from surgeon to patient during complex battlefield procedures.',
    },
    keywords: [
      'aseptic surgery',
      'steam',
      'autoclave',
      'rubber gloves',
      'masks',
      'gowns',
      'carbolic',
    ],
  },
  {
    id: 'wf_x_rays',
    topic: 'X-Rays',
    category: 'Surgery & Medical Innovations',
    question: 'Describe one feature of X-rays on the Western Front.',
    feature1: {
      heading: 'Locating Deep Fragments and Fractures',
      text: 'Allowed military surgeons to pinpoint the precise location of buried shrapnel balls and shattered bone fragments inside wound cavities before cutting into tissue.',
    },
    feature2: {
      heading: 'Fleet of Mobile Diagnostic X-Ray Units',
      text: 'The British Army deployed six static and 14 mobile X-ray vans equipped with generators, allowing diagnostic imaging to be rushed to CCSs during heavy offensives.',
    },
    keywords: [
      'x-rays',
      'roentgen',
      'shrapnel',
      'fractures',
      'mobile x-ray',
      '14 mobile',
      'diagnostic',
      'vans',
    ],
  },
  {
    id: 'wf_blood_transfusions',
    topic: 'Blood Transfusions',
    category: 'Surgery & Medical Innovations',
    question: 'Describe one feature of blood transfusions on the Western Front.',
    feature1: {
      heading: 'Chemical Anticoagulants Preserved Stored Blood',
      text: 'The discovery of sodium citrate (1915) stopped blood clotting for up to two days, and citrate-glucose (1916) allowed blood to be refrigerated and stored for up to four weeks.',
    },
    feature2: {
      heading: 'First Wartime Blood Bank at Cambrai (1917)',
      text: "Captain Oswald Robertson created the world's first mobile blood depot at the Battle of Cambrai in 1917, saving 11 soldiers who would have died from hypovolemic shock.",
    },
    keywords: [
      'blood transfusions',
      'sodium citrate',
      'robertson',
      'cambrai',
      '1917',
      'blood bank',
      'shock',
      'refrigerated',
    ],
  },
  {
    id: 'wf_thomas_splint',
    topic: 'Thomas Splint',
    category: 'Surgery & Medical Innovations',
    question: 'Describe one feature of the Thomas Splint.',
    feature1: {
      heading: 'Longitudinal Traction Stabilized Broken Femurs',
      text: 'Designed by Hugh Owen Thomas, the metal traction splint pulled the fractured leg lengthways, stopping jagged broken femur bones from grinding and severing the femoral artery.',
    },
    feature2: {
      heading: 'Dramatically Reduced Fracture Mortality from 80% to 20%',
      text: 'Introduced to forward RAPs and dressing stations in 1915 by Robert Jones, it reduced the mortality rate for compound femur fractures from 80% down to under 20%.',
    },
    keywords: [
      'thomas splint',
      'hugh owen thomas',
      'robert jones',
      'femur',
      'traction',
      '80% to 20%',
      'artery',
      '1915',
    ],
  },
  {
    id: 'wf_brain_surgery',
    topic: 'Brain Surgery',
    category: 'Surgery & Medical Innovations',
    question: 'Describe one feature of brain surgery on the Western Front.',
    feature1: {
      heading: 'Shift from Hopeless Triage to Active Intervention',
      text: 'In 1914, head wounds were largely deemed fatal and left untreated; by 1916, specialized neurosurgical stations were established to operate directly at selected CCSs.',
    },
    feature2: {
      heading: "Harvey Cushing's Magnet and Local Anaesthesia",
      text: 'American neurosurgeon Harvey Cushing pioneered using a surgical electromagnet to draw deep shrapnel from brain tissue and operated under local anaesthesia to avoid brain swelling.',
    },
    keywords: [
      'brain surgery',
      'harvey cushing',
      'magnet',
      'electromagnet',
      'local anaesthesia',
      'head wounds',
      'neurosurgery',
    ],
  },
  {
    id: 'wf_plastic_surgery',
    topic: 'Plastic Surgery',
    category: 'Surgery & Medical Innovations',
    question: 'Describe one feature of plastic surgery on the Western Front.',
    feature1: {
      heading: 'Harold Gillies and the Pedicle Tube Technique',
      text: 'New Zealand surgeon Harold Gillies pioneered facial reconstruction using "pedicle tubes" (skin flaps rolled into tubes to maintain active blood supply while migrating to faces).',
    },
    feature2: {
      heading: "Dedicated Queen's Hospital in Sidcup, Kent",
      text: "The British military established the specialist Queen's Hospital in Sidcup, Kent in 1917, which performed nearly 12,000 pioneering facial reconstruction operations on disfigured soldiers.",
    },
    keywords: [
      'plastic surgery',
      'harold gillies',
      'pedicle tube',
      'skin grafts',
      "queen's hospital",
      'sidcup',
      'facial',
      '12000',
    ],
  },
];
