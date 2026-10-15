const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '..', 'units', 'edexcel_medicine', 'data.js');

const westernFrontSpines = {
  lesson_5_1: {
    workbook_stages: [
      {
        step: 1,
        date: '1914–1915',
        para_ref: '[1.1–1.2]',
        heading: 'Why was the low-lying topography of Ypres a tactical and medical nightmare?',
        bullets: [
          'Digging into sticky wet clay',
          'Heavy artillery breaking water canals',
          'Wounded men sinking into knee-deep mud',
        ],
        focus_clue: 'Why was the low-lying topography of Ypres a tactical and medical nightmare?',
      },
      {
        step: 2,
        date: '1914–1918',
        para_ref: '[2.1]',
        heading: 'How did zig-zag traverses limit shrapnel injuries and contain shell explosions?',
        bullets: [
          'Digging sharp zig-zag corners into earth',
          'Laying wooden duckboards over smelly puddles',
          'Stacking sandbags high on front firing steps',
        ],
        focus_clue:
          'How did zig-zag traverses limit shrapnel injuries and contain shell explosions?',
      },
      {
        step: 3,
        date: '1915–1918',
        para_ref: '[2.2]',
        heading: 'Why did narrow communication trenches create acute bottlenecks for stretchers?',
        bullets: [
          "Guarding firing steps facing No Man's Land",
          'Squeezing wooden stretchers along narrow passages',
          'Crawling through listening saps near enemy barbed wire',
        ],
        focus_clue:
          'Why did narrow communication trenches create acute bottlenecks for stretchers?',
      },
      {
        step: 4,
        date: 'Nov 1916–1917',
        para_ref: '[3.1]',
        heading: 'How did the chalk geology at Arras allow safe, sterile surgical conditions?',
        bullets: [
          'Carving hospital wards deep into dry white chalk',
          'Wiring electric light bulbs and water pipes',
          'Treating seven hundred beds safely underground',
        ],
        focus_clue: 'How did the chalk geology at Arras allow safe, sterile surgical conditions?',
      },
      {
        step: 5,
        date: '1916–1917',
        para_ref: '[3.2, 4.1]',
        heading: 'Why did mass-casualty offensives force the RAMC to reorganize evacuation?',
        bullets: [
          'Fifty-seven thousand men falling on first morning',
          'Driving heavy metal tanks over chalk slopes',
          'Overworked medical orderly lines facing endless stretchers',
        ],
        focus_clue: 'Why did mass-casualty offensives force the RAMC to reorganize evacuation?',
      },
    ],
    causal_domino_spine: {
      title: 'The Theatre of War: The British Sector, Trench Geography & Battles',
      subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
      stages: [
        {
          step: 1,
          date: '1914–1915',
          para_ref: '[1.1–1.2]',
          title: 'Flanders Terrain & Ypres Salient',
          actor: 'British Expeditionary Force & Royal Engineers',
          tag: '🌧️ FLANDERS WATER TABLE',
          trigger:
            'The Ypres Salient was surrounded on three sides by German artillery occupying higher ground on Messines Ridge, with low-lying clay soil and a water table just inches below the surface.',
          desc: 'The Ypres Salient was surrounded on three sides by German artillery occupying higher ground on Messines Ridge, with low-lying clay soil and a water table just inches below the surface.',
          connective:
            'Constant artillery bombardment smashed ancient drainage dykes, turning trenches into treacherous liquid quagmires where wounded soldiers risked drowning in mud.',
          question: 'Why was the low-lying topography of Ypres a tactical and medical nightmare?',
        },
        {
          step: 2,
          date: '1914–1918',
          para_ref: '[2.1]',
          title: 'Trench Architecture & Traverses',
          actor: 'Frontline Infantrymen & Sappers',
          tag: '📐 ZIG-ZAG TRAVERSES',
          trigger:
            'Engineers designed frontline trenches with sharp, alternating 90-degree zig-zag traverses rather than straight continuous firebays.',
          desc: 'Engineers designed frontline trenches with sharp, alternating 90-degree zig-zag traverses rather than straight continuous firebays.',
          connective:
            'Prevented enfilade rifle fire along the trench and localized blast concussions and hot shrapnel balls within a single isolated section, saving dozens of lives.',
          question:
            'How did zig-zag traverses limit shrapnel injuries and contain shell explosions?',
        },
        {
          step: 3,
          date: '1915–1918',
          para_ref: '[2.2]',
          title: 'Trench System: Front to Rear',
          actor: 'RAMC Stretcher Bearers & Battalion Runners',
          tag: '🚧 COMMUNICATION BOTTLENECKS',
          trigger:
            'The Western Front system comprised frontline firing trenches, support lines 80 yards back, reserve lines, and narrow zig-zag communication trenches connecting to the rear.',
          desc: 'The Western Front system comprised frontline firing trenches, support lines 80 yards back, reserve lines, and narrow zig-zag communication trenches connecting to the rear.',
          connective:
            'Severe congestion from incoming troop columns, ammunition crates, and muddy right-angle corners created acute bottlenecks for stretcher bearers evacuating haemorrhaging casualties.',
          question:
            'Why did narrow communication trenches create acute bottlenecks for stretchers?',
        },
        {
          step: 4,
          date: 'Nov 1916–1917',
          para_ref: '[3.1]',
          title: 'Thompson’s Cave & Arras Tunnels',
          actor: 'New Zealand Tunnelling Corps & RAMC',
          tag: '⛏️ ARRAS UNDERGROUND HOSPITAL',
          trigger:
            'In late 1916, New Zealand and British miners connected ancient Roman chalk quarries beneath Arras, constructing Thompson’s Cave—a massive underground medical complex.',
          desc: 'In late 1916, New Zealand and British miners connected ancient Roman chalk quarries beneath Arras, constructing Thompson’s Cave—a massive underground medical complex.',
          connective:
            'Fitted with electric lighting, piped running water, and 700 hospital beds directly beneath enemy artillery range, providing dry, clean surgical operating conditions before the 1917 battle.',
          question: 'How did the chalk geology at Arras allow safe, sterile surgical conditions?',
        },
        {
          step: 5,
          date: '1916–1917',
          para_ref: '[3.2, 4.1]',
          title: 'Mass Trauma: Somme & Cambrai',
          actor: 'RAMC Directors & Field Ambulances',
          tag: '💥 MASS CASUALTY ATTRITION',
          trigger:
            'Massive set-piece offensives like the Somme (57,000 British casualties on 1 July 1916) and Cambrai (November 1917) overwhelmed existing medical clearing lines.',
          desc: 'Massive set-piece offensives like the Somme (57,000 British casualties on 1 July 1916) and Cambrai (November 1917) overwhelmed existing medical clearing lines.',
          connective:
            'Forced the RAMC to expand motor ambulance convoys, deploy advance surgical teams closer to the line, and integrate railway hospital trains into the evacuation timetable.',
          question: 'Why did mass-casualty offensives force the RAMC to reorganize evacuation?',
        },
      ],
    },
  },

  lesson_5_2: {
    workbook_stages: [
      {
        step: 1,
        date: '1914–1915',
        para_ref: '[1.1–1.2]',
        heading: 'How did prolonged cold water immersion destroy tissue and produce gangrene?',
        bullets: [
          'Standing for days in freezing dirty water',
          'Toes turning numb, swollen, and bluish-black',
          'Surgeons sawing off rotting gangrene feet',
        ],
        focus_clue: 'How did prolonged cold water immersion destroy tissue and produce gangrene?',
      },
      {
        step: 2,
        date: '1915–1918',
        para_ref: '[2.1]',
        heading: 'Why did mandatory officer inspections succeed where voluntary advice had failed?',
        bullets: [
          'Pairs of soldiers rubbing fishy grease into toes',
          'Packing three dry woollen pairs in kits',
          'Officers holding daily morning foot inspections',
        ],
        focus_clue:
          'Why did mandatory officer inspections succeed where voluntary advice had failed?',
      },
      {
        step: 3,
        date: '1914–1918',
        para_ref: '[2.2]',
        heading:
          'Why did trench fever persist until the body louse insect vector was proven in 1918?',
        bullets: [
          'Scratching itchy insect bites along uniform seams',
          'High shaking chills and burning shin bone aches',
          'Steaming dirty woollen jackets in giant barrels',
        ],
        focus_clue:
          'Why did trench fever persist until the body louse insect vector was proven in 1918?',
      },
      {
        step: 4,
        date: '1914–1918',
        para_ref: '[3.1]',
        heading: 'How did strict sanitation and chemical water chlorination prevent epidemics?',
        bullets: [
          'Violent stomach cramps from dirty swamp water',
          'Digging deep toilet pits far behind sleeping lines',
          'Throwing smelly white lime powder into waste trenches',
        ],
        focus_clue: 'How did strict sanitation and chemical water chlorination prevent epidemics?',
      },
      {
        step: 5,
        date: '1914–1918',
        para_ref: '[3.2, 4.1]',
        heading:
          'Why was shell shock initially stigmatised as cowardice before being treated medically?',
        bullets: [
          "Endless artillery thunder breaking soldiers' minds",
          'Men shaking uncontrollably and losing their speech',
          'Resting traumatised patients in quiet country hospitals',
        ],
        focus_clue:
          'Why was shell shock initially stigmatised as cowardice before being treated medically?',
      },
    ],
    causal_domino_spine: {
      title: 'The Trench Environment: Mud, Vermin & Non-Combat Illnesses',
      subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
      stages: [
        {
          step: 1,
          date: '1914–1915',
          para_ref: '[1.1–1.2]',
          title: 'Trench Foot Pathology',
          actor: 'Frontline Infantry Soldiers',
          tag: '🦶 TRENCH FOOT PATHOLOGY',
          trigger:
            'Soldiers stood for consecutive days in sub-zero waterlogged trenches wearing tight puttees and wet boots, severely constricting capillary blood circulation.',
          desc: 'Soldiers stood for consecutive days in sub-zero waterlogged trenches wearing tight puttees and wet boots, severely constricting capillary blood circulation.',
          connective:
            'Caused severe numbness, tissue necrosis, and fungal rotting that frequently progressed to secondary gas gangrene, forcing surgeons to amputate thousands of feet in winter 1914–15.',
          question: 'How did prolonged cold water immersion destroy tissue and produce gangrene?',
        },
        {
          step: 2,
          date: '1915–1918',
          para_ref: '[2.1]',
          title: 'Prevention: Whale Oil & Socks',
          actor: 'Battalion Officers & The Buddy System',
          tag: '🧴 WHALE OIL DISCIPLINE',
          trigger:
            'The British Army issued waterproof duckboards, provided three pairs of clean dry socks per soldier, and mandated the pairing of soldiers in a daily "buddy system" to rub feet with water-repellent whale oil.',
          desc: 'The British Army issued waterproof duckboards, provided three pairs of clean dry socks per soldier, and mandated the pairing of soldiers in a daily "buddy system" to rub feet with water-repellent whale oil.',
          connective:
            'Backed by strict daily morning officer parades and threats of court martial for neglect, these preventive measures virtually eliminated trench foot casualties by 1917.',
          question:
            'Why did mandatory officer inspections succeed where voluntary advice had failed?',
        },
        {
          step: 3,
          date: '1914–1918',
          para_ref: '[2.2]',
          title: 'Trench Fever, Lice & Delousing',
          actor: 'Body Lice (Pediculus humanus) & RAMC Researchers',
          tag: '🪲 TRENCH FEVER DELOUSING',
          trigger:
            'Over 95% of British soldiers harboured body lice thriving in uniform seams, suffering debilitating bouts of shaking chills, headaches, and acute shin-bone pain (trench fever).',
          desc: 'Over 95% of British soldiers harboured body lice thriving in uniform seams, suffering debilitating bouts of shaking chills, headaches, and acute shin-bone pain (trench fever).',
          connective:
            'Incapacitated up to 15% of men at any one time until researchers proved lice excrement transmitted the disease in 1918, prompting the deployment of steam delousing "Serbian barrels".',
          question:
            'Why did trench fever persist until the body louse insect vector was proven in 1918?',
        },
        {
          step: 4,
          date: '1914–1918',
          para_ref: '[3.1]',
          title: 'Dysentery & Water Chlorination',
          actor: 'RAMC Sanitary Sections & Regimental Pioneers',
          tag: '💧 CHLORIDE OF LIME PURIFICATION',
          trigger:
            'Flooded trenches contaminated with human faeces and unburied corpses sparked widespread outbreaks of bacillary dysentery, causing severe dehydration and fever.',
          desc: 'Flooded trenches contaminated with human faeces and unburied corpses sparked widespread outbreaks of bacillary dysentery, causing severe dehydration and fever.',
          connective:
            'Specialized RAMC Sanitary Sections dug deep covered latrines treated with chloride of lime and chemically chlorinated all drinking water in cart tanks, preventing catastrophic epidemics.',
          question: 'How did strict sanitation and chemical water chlorination prevent epidemics?',
        },
        {
          step: 5,
          date: '1914–1918',
          para_ref: '[3.2, 4.1]',
          title: 'Shell Shock & Psychological Trauma',
          actor: 'Dr Charles Myers & Craiglockhart War Hospital',
          tag: '🧠 NYDN & SHELL SHOCK',
          trigger:
            'Unrelenting high-explosive artillery bombardments caused severe psychiatric trauma: uncontrollable tremors, amnesia, mutism, and catatonic paralysis, termed "shell shock" by Charles Myers in 1915.',
          desc: 'Unrelenting high-explosive artillery bombardments caused severe psychiatric trauma: uncontrollable tremors, amnesia, mutism, and catatonic paralysis, termed "shell shock" by Charles Myers in 1915.',
          connective:
            'Initially punished as cowardice or malingering, the Army eventually classified cases as "Not Yet Diagnosed, Nervous" (NYDN), establishing forward rest centres and specialized psychiatric recovery hospitals.',
          question:
            'Why was shell shock initially stigmatised as cowardice before being treated medically?',
        },
      ],
    },
  },

  lesson_5_3: {
    workbook_stages: [
      {
        step: 1,
        date: '1914–1918',
        para_ref: '[1.1–1.2]',
        heading: 'Why did jagged shrapnel fragments cause far worse infections than rifle bullets?',
        bullets: [
          'Blasting hot jagged metal balls through flesh',
          'Blowing dirty uniform cloth deep into broken bones',
          'Causing over half of all battlefield wounds',
        ],
        focus_clue:
          'Why did jagged shrapnel fragments cause far worse infections than rifle bullets?',
      },
      {
        step: 2,
        date: '1914–1918',
        para_ref: '[2.1]',
        heading: 'Why was Clostridium welchii so lethal in deep, airless shrapnel wounds?',
        bullets: [
          'Fertilising farmland with rotten animal manure',
          'Deadly microbes multiplying inside airless wounds',
          'Hissing bubbles swelling under blackened skin',
        ],
        focus_clue: 'Why was Clostridium welchii so lethal in deep, airless shrapnel wounds?',
      },
      {
        step: 3,
        date: 'Late 1915',
        para_ref: '[2.2]',
        heading:
          'Why did the introduction of the Brodie helmet cause an apparent rise in hospital head cases?',
        bullets: [
          'Soft cloth caps offering zero protection from blasts',
          'Pressing hard steel bowls with wide gutters',
          'Slashing deadly skull splinter wounds by eighty percent',
        ],
        focus_clue:
          'Why did the introduction of the Brodie helmet cause an apparent rise in hospital head cases?',
      },
      {
        step: 4,
        date: 'Apr 1915–1916',
        para_ref: '[3.1]',
        heading: 'How did the rapid evolution of chemical respirators counter suffocating gases?',
        bullets: [
          'Releasing green-yellow choking cloud over fields',
          'Holding urine-soaked handkerchiefs over noses',
          'Breathing through grey flannel hoods with glass eyepieces',
        ],
        focus_clue:
          'How did the rapid evolution of chemical respirators counter suffocating gases?',
      },
      {
        step: 5,
        date: '1916–1918',
        para_ref: '[3.2, 4.1]',
        heading: 'Why was mustard gas far harder to counter than chlorine or phosgene?',
        bullets: [
          'Sucking air through rubber tubes and charcoal canisters',
          'Oily yellow liquid burning huge skin blisters through clothes',
          'Soaking into muddy earth for weeks without evaporating',
        ],
        focus_clue: 'Why was mustard gas far harder to counter than chlorine or phosgene?',
      },
    ],
    causal_domino_spine: {
      title: 'Battlefield Trauma: High Explosive Shrapnel, Gas Attacks & Infection',
      subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
      stages: [
        {
          step: 1,
          date: '1914–1918',
          para_ref: '[1.1–1.2]',
          title: 'Artillery & Shrapnel Trauma',
          actor: 'Heavy Artillery & Shrapnel Shells',
          tag: '💣 HIGH-EXPLOSIVE ARTILLERY',
          trigger:
            'Artillery was responsible for 58% of all battlefield wounds, showering trenches with jagged high-velocity steel shell casings and hot lead shrapnel balls.',
          desc: 'Artillery was responsible for 58% of all battlefield wounds, showering trenches with jagged high-velocity steel shell casings and hot lead shrapnel balls.',
          connective:
            'Blasted dirty, bacteria-laden woollen uniform fabric and muddy soil deep into fragmented bone tissue, creating complex compound wounds prone to virulent sepsis.',
          question:
            'Why did jagged shrapnel fragments cause far worse infections than rifle bullets?',
        },
        {
          step: 2,
          date: '1914–1918',
          para_ref: '[2.1]',
          title: 'Soil Bacteria & Gas Gangrene',
          actor: 'Clostridium welchii & Anaerobic Bacteria',
          tag: '☣️ GAS GANGRENE CRISIS',
          trigger:
            'Flanders farmland had been intensively manured for centuries, heavily saturating the damp soil with tetanus spores and anaerobic Clostridium welchii bacteria.',
          desc: 'Flanders farmland had been intensively manured for centuries, heavily saturating the damp soil with tetanus spores and anaerobic Clostridium welchii bacteria.',
          connective:
            'Multiplied rapidly in deep, oxygen-deprived shrapnel wound tracts, producing foul-smelling gas bubbles under blackened dying flesh that killed victims within 48 hours without surgery.',
          question: 'Why was Clostridium welchii so lethal in deep, airless shrapnel wounds?',
        },
        {
          step: 3,
          date: 'Late 1915',
          para_ref: '[2.2]',
          title: 'Head Trauma & Brodie Helmet',
          actor: 'John Leopold Brodie & War Office',
          tag: '🪖 BRODIE STEEL HELMET',
          trigger:
            'British soldiers entered the war wearing soft cloth peaked caps that offered zero protection against raining shrapnel and falling trench timber splinters.',
          desc: 'British soldiers entered the war wearing soft cloth peaked caps that offered zero protection against raining shrapnel and falling trench timber splinters.',
          connective:
            'John Brodie patented the pressed steel helmet in 1915; its wide brim deflected descending shell fragments, reducing fatal penetrating head wounds by 75% across the front.',
          question:
            'Why did the introduction of the Brodie helmet cause an apparent rise in hospital head cases?',
        },
        {
          step: 4,
          date: 'Apr 1915–1916',
          para_ref: '[3.1]',
          title: 'Chlorine & Phosgene Attacks',
          actor: 'German Gas Regiments & RAMC Chemical Advisors',
          tag: '☁️ CHEMICAL RESPIRED DEFENCE',
          trigger:
            'The German Army launched the first mass chemical gas attack at Second Ypres in April 1915, discharging cylinders of suffocation-inducing greenish-yellow chlorine gas.',
          desc: 'The German Army launched the first mass chemical gas attack at Second Ypres in April 1915, discharging cylinders of suffocation-inducing greenish-yellow chlorine gas.',
          connective:
            'British troops improvised with urine-soaked rags before the War Office manufactured the Phenate-Hexamine (PH) anti-gas hood, neutralizing lethal chlorine and phosgene vapors.',
          question:
            'How did the rapid evolution of chemical respirators counter suffocating gases?',
        },
        {
          step: 5,
          date: '1916–1918',
          para_ref: '[3.2, 4.1]',
          title: 'Mustard Gas & Box Respirators',
          actor: 'British War Office & Small Box Respirators',
          tag: '😷 SMALL BOX RESPIRATOR & MUSTARD GAS',
          trigger:
            'The British introduced the Small Box Respirator in 1916 with activated charcoal canisters; however, in July 1917 Germans deployed oily, odorless blistering mustard gas.',
          desc: 'The British introduced the Small Box Respirator in 1916 with activated charcoal canisters; however, in July 1917 Germans deployed oily, odorless blistering mustard gas.',
          connective:
            'Unlike respiratory gases, mustard liquid burned through damp woollen uniforms to cause agonizing internal and external chemical burns, remaining toxic in trench soil for weeks.',
          question: 'Why was mustard gas far harder to counter than chlorine or phosgene?',
        },
      ],
    },
  },

  lesson_5_4: {
    workbook_stages: [
      {
        step: 1,
        date: '1914–1918',
        para_ref: '[1.1–1.2]',
        heading:
          'Why was rapid evacuation by stretcher bearers vital to prevent irreversible shock?',
        bullets: [
          'Teams of four hauling wounded through bullet fire',
          'Crowding into dark sandbagged frontline dugouts',
          'Slapping brown iodine and white bandages on cuts',
        ],
        focus_clue:
          'Why was rapid evacuation by stretcher bearers vital to prevent irreversible shock?',
      },
      {
        step: 2,
        date: '1914–1918',
        para_ref: '[2.1]',
        heading: 'What was the tactical role of Dressing Stations in preventing CCS congestion?',
        bullets: [
          'Setting up treatment cots inside ruined farm barns',
          'Checking clean bandages one mile behind frontline',
          'Loading urgent bleeding cases into transport carts',
        ],
        focus_clue: 'What was the tactical role of Dressing Stations in preventing CCS congestion?',
      },
      {
        step: 3,
        date: '1914–1918',
        para_ref: '[2.2]',
        heading: 'How did the 3-tier triage system maximize survival during mass offensives?',
        bullets: [
          'Setting up big operating tents near railway tracks',
          'Sorting bleeding soldiers into three survival groups',
          "Rushing torn stomach wounds straight to surgeons' tables",
        ],
        focus_clue: 'How did the 3-tier triage system maximize survival during mass offensives?',
      },
      {
        step: 4,
        date: '1914–1918',
        para_ref: '[3.1]',
        heading: 'Why were Base Hospitals situated near major coastal rail terminals and ports?',
        bullets: [
          'Converting coastal resort hotels into recovery wards',
          'Treating specialized amputations and poison burns',
          'Carrying healed patients onto white hospital ships',
        ],
        focus_clue: 'Why were Base Hospitals situated near major coastal rail terminals and ports?',
      },
      {
        step: 5,
        date: '1914–1918',
        para_ref: '[3.2, 4.1]',
        heading: 'Why were canal barges preferred over trains for head and chest trauma?',
        bullets: [
          'Bouncing painfully in old wooden horse wagons',
          'Donating hundreds of fast petrol motor vans',
          'Gliding gently down quiet canals for head injuries',
        ],
        focus_clue: 'Why were canal barges preferred over trains for head and chest trauma?',
      },
    ],
    causal_domino_spine: {
      title: 'The Chain of Evacuation: Stretcher Bearers, RAP, Dressing Stations & CCS',
      subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
      stages: [
        {
          step: 1,
          date: '1914–1918',
          para_ref: '[1.1–1.2]',
          title: 'Stretcher Bearers & RAP',
          actor: 'Regimental Stretcher Bearers & Medical Officers',
          tag: '🩹 REGIMENTAL AID POST (RAP)',
          trigger:
            'Battalion stretcher bearers crawled across shell holes to carry wounded men to the Regimental Aid Post, situated 200 yards behind the frontline in sandbagged dugouts or ruined basements.',
          desc: 'Battalion stretcher bearers crawled across shell holes to carry wounded men to the Regimental Aid Post, situated 200 yards behind the frontline in sandbagged dugouts or ruined basements.',
          connective:
            'Administered emergency first aid, tied tourniquets, smeared antiseptic iodine, and applied field dressings to stabilize casualties before secondary haemorrhage set in.',
          question:
            'Why was rapid evacuation by stretcher bearers vital to prevent irreversible shock?',
        },
        {
          step: 2,
          date: '1914–1918',
          para_ref: '[2.1]',
          title: 'Field Ambulances & ADS/MDS',
          actor: 'RAMC Field Ambulances',
          tag: '🏥 ADVANCED DRESSING STATIONS (ADS)',
          trigger:
            'Field Ambulances operated Advanced Dressing Stations (ADS) and Main Dressing Stations (MDS) located one to two miles behind the frontline in farmhouses, tents, or bunkers.',
          desc: 'Field Ambulances operated Advanced Dressing Stations (ADS) and Main Dressing Stations (MDS) located one to two miles behind the frontline in farmhouses, tents, or bunkers.',
          connective:
            'Sorted incoming casualties, replaced contaminated field dressings, administered tetanus antitoxins, and dispatched urgent surgical cases to the rear in motorized transport.',
          question: 'What was the tactical role of Dressing Stations in preventing CCS congestion?',
        },
        {
          step: 3,
          date: '1914–1918',
          para_ref: '[2.2]',
          title: 'CCS & The Triage System',
          actor: 'Casualty Clearing Station Surgeons & Triage Officers',
          tag: '⚖️ 3-TIER CCS TRIAGE',
          trigger:
            'Located 10 miles behind the front near railway sidings, Casualty Clearing Stations (CCS) served as the vital surgical hub where incoming wounded were divided into three triage categories.',
          desc: 'Located 10 miles behind the front near railway sidings, Casualty Clearing Stations (CCS) served as the vital surgical hub where incoming wounded were divided into three triage categories.',
          connective:
            'Separated the moribund, the walking wounded, and those requiring immediate life-saving surgery (abdominal wounds and torn femurs), performing operations before infection overwhelmed damaged organs.',
          question: 'How did the 3-tier triage system maximize survival during mass offensives?',
        },
        {
          step: 4,
          date: '1914–1918',
          para_ref: '[3.1]',
          title: 'Base Hospitals on French Coast',
          actor: 'Coastal Base Hospitals & Hospital Ships',
          tag: '🚢 BASE HOSPITALS & BLIGHTY',
          trigger:
            'Vast Base Hospitals operated at Boulogne, Le Havre, and Rouen, taking advantage of major coastal railheads and passenger ship docks.',
          desc: 'Vast Base Hospitals operated at Boulogne, Le Havre, and Rouen, taking advantage of major coastal railheads and passenger ship docks.',
          connective:
            'Housed specialized surgical and recovery units for severe head trauma and chest surgery, evacuating stabilized soldiers on hospital ships across the English Channel to Britain ("Blighty").',
          question: 'Why were Base Hospitals situated near major coastal rail terminals and ports?',
        },
        {
          step: 5,
          date: '1914–1918',
          para_ref: '[3.2, 4.1]',
          title: 'Motor Ambulances & Barges',
          actor: 'Red Cross, FANY & Ambulance Drivers',
          tag: '🚑 MOTOR AMBULANCES & CANAL BARGES',
          trigger:
            'Early horse-drawn ambulances jolted severely on shell-cratered roads, prompting public appeals that raised funds for 250 motorized ambulances operated by the Red Cross and FANY.',
          desc: 'Early horse-drawn ambulances jolted severely on shell-cratered roads, prompting public appeals that raised funds for 250 motorized ambulances operated by the Red Cross and FANY.',
          connective:
            'In northern France, converted canal barges provided smooth, vibration-free water transport along inland waterways, preserving delicate surgical sutures for severe head and chest cases.',
          question: 'Why were canal barges preferred over trains for head and chest trauma?',
        },
      ],
    },
  },

  lesson_5_5: {
    workbook_stages: [
      {
        step: 1,
        date: '1914–1918',
        para_ref: '[1.1–1.2]',
        heading:
          'Why was surgical excision of dead tissue more effective than chemical antiseptics?',
        bullets: [
          'Cutting away bruised, black, and dead muscle tissue',
          'Depriving hungry bacteria of rotting food',
          'Leaving surgical cuts open to wash before stitching',
        ],
        focus_clue:
          'Why was surgical excision of dead tissue more effective than chemical antiseptics?',
      },
      {
        step: 2,
        date: '1915–1918',
        para_ref: '[2.1]',
        heading:
          'How did continuous chemical irrigation solve the problem of deep wound infection?',
        bullets: [
          'Pushing narrow rubber tubes deep into torn flesh',
          'Dripping fresh salty bleach solution day and night',
          'Killing hidden microbes before gangrene takes hold',
        ],
        focus_clue:
          'How did continuous chemical irrigation solve the problem of deep wound infection?',
      },
      {
        step: 3,
        date: 'Dec 1915–1916',
        para_ref: '[2.2]',
        heading: 'How did rigid traction prevent fatal haemorrhage and shock from broken femurs?',
        bullets: [
          'Fitting padded metal oval ring around upper groin',
          'Pulling leather cords to stretch broken leg bones taut',
          'Dropping thigh fracture deaths from eighty to twenty percent',
        ],
        focus_clue:
          'How did rigid traction prevent fatal haemorrhage and shock from broken femurs?',
      },
      {
        step: 4,
        date: '1914–1918',
        para_ref: '[3.1]',
        heading: 'Why was locating shrapnel on an X-ray vital before operating on gas gangrene?',
        bullets: [
          'Running small dynamo generators off motor engines',
          'Scanning wounded soldiers right behind battle lines',
          'Locating buried steel balls before surgeon cuts',
        ],
        focus_clue: 'Why was locating shrapnel on an X-ray vital before operating on gas gangrene?',
      },
      {
        step: 5,
        date: '1914–1918',
        para_ref: '[3.2, 4.1]',
        heading: 'Why did undetected cloth fragments remain the primary cause of post-op gangrene?',
        bullets: [
          'Shattering delicate glass vacuum bulbs on bumpy tracks',
          'Overheating metal tubes after five minutes of use',
          'Failing to spot buried uniform cloth and muddy splinters',
        ],
        focus_clue:
          'Why did undetected cloth fragments remain the primary cause of post-op gangrene?',
      },
    ],
    causal_domino_spine: {
      title: 'Surgical Breakthroughs: The Thomas Splint, Wound Debridement & Mobile X-Rays',
      subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
      stages: [
        {
          step: 1,
          date: '1914–1918',
          para_ref: '[1.1–1.2]',
          title: 'Wound Debridement & Excision',
          actor: 'Frontline Surgeons & CCS Medical Officers',
          tag: '🔪 WOUND DEBRIDEMENT',
          trigger:
            'Surgeons realized chemical antiseptics could not penetrate deep shrapnel pockets, adopting radical surgical debridement to slice away all bruised, contaminated, and dead tissue.',
          desc: 'Surgeons realized chemical antiseptics could not penetrate deep shrapnel pockets, adopting radical surgical debridement to slice away all bruised, contaminated, and dead tissue.',
          connective:
            'Deprived anaerobic gas gangrene microbes of dead biological tissue to feed upon, allowing wounds to be washed thoroughly before delayed primary closure.',
          question:
            'Why was surgical excision of dead tissue more effective than chemical antiseptics?',
        },
        {
          step: 2,
          date: '1915–1918',
          para_ref: '[2.1]',
          title: 'Carrel-Dakin Antiseptic Flush',
          actor: 'Alexis Carrel & Henry Dakin',
          tag: '🧪 CARREL-DAKIN IRRIGATION',
          trigger:
            'French surgeon Alexis Carrel and British chemist Henry Dakin designed a sterilized chemical irrigation system using a dilute, neutral sodium hypochlorite bleach solution.',
          desc: 'French surgeon Alexis Carrel and British chemist Henry Dakin designed a sterilized chemical irrigation system using a dilute, neutral sodium hypochlorite bleach solution.',
          connective:
            'Flushed deep wound recesses continuously through perforated rubber tubes, neutralizing necrotic microbes within six hours without destroying living human flesh.',
          question:
            'How did continuous chemical irrigation solve the problem of deep wound infection?',
        },
        {
          step: 3,
          date: 'Dec 1915–1916',
          para_ref: '[2.2]',
          title: 'The Thomas Splint Breakthrough',
          actor: 'Hugh Owen Thomas & Sir Robert Jones',
          tag: '🦿 THE THOMAS SPLINT',
          trigger:
            'In 1914–15, compound femur fractures carried an 80% mortality rate because broken bone fragments grated violently during transit, tearing the femoral artery and causing fatal haemorrhagic shock.',
          desc: 'In 1914–15, compound femur fractures carried an 80% mortality rate because broken bone fragments grated violently during transit, tearing the femoral artery and causing fatal haemorrhagic shock.',
          connective:
            'Sir Robert Jones introduced his uncle’s rigid traction splint to the Western Front in December 1915, pulling the leg taut and dramatically cutting compound fracture mortality from 80% down to 20%.',
          question:
            'How did rigid traction prevent fatal haemorrhage and shock from broken femurs?',
        },
        {
          step: 4,
          date: '1914–1918',
          para_ref: '[3.1]',
          title: 'Mobile X-Rays & Marie Curie',
          actor: 'Marie Curie & British Mobile X-Ray Units',
          tag: '⚡ MOBILE RADIOLOGY VANS',
          trigger:
            'British Base Hospitals and field units deployed mobile X-ray vans powered by dynamo generators directly connected to automobile petrol engines.',
          desc: 'British Base Hospitals and field units deployed mobile X-ray vans powered by dynamo generators directly connected to automobile petrol engines.',
          connective:
            'Allowed radiologists to take two cross-angled diagnostic images, pinpointing the exact depth of buried metal shrapnel and bullet fragments before surgeons made incisions.',
          question: 'Why was locating shrapnel on an X-ray vital before operating on gas gangrene?',
        },
        {
          step: 5,
          date: '1914–1918',
          para_ref: '[3.2, 4.1]',
          title: 'X-Ray Limits in Combat',
          actor: 'Field Radiologists & Hospital Mechanics',
          tag: '⚠️ RADIOLOGY COMBAT LIMITS',
          trigger:
            'Combat X-ray equipment was fragile: glass vacuum tubes overheated rapidly during heavy offensives, delicate bulbs shattered on potholed roads, and machines could not detect radiolucent materials.',
          desc: 'Combat X-ray equipment was fragile: glass vacuum tubes overheated rapidly during heavy offensives, delicate bulbs shattered on potholed roads, and machines could not detect radiolucent materials.',
          connective:
            'Failed to reveal buried mud, khaki uniform fabric, or trench timber splinters, which remained deadly bacterial breeding grounds that still caused fatal post-operative gas gangrene.',
          question:
            'Why did undetected cloth fragments remain the primary cause of post-op gangrene?',
        },
      ],
    },
  },

  lesson_5_6: {
    workbook_stages: [
      {
        step: 1,
        date: '1914–1915',
        para_ref: '[1.1–1.2]',
        heading: 'How did sodium citrate liberate blood transfusion from donor-to-patient tubing?',
        bullets: [
          'Adding chemical salts to stop blood turning into jelly',
          "Uncoupling donor arm from dying patient's vein",
          'Pouring red liquid freely through sterile glass funnels',
        ],
        focus_clue:
          'How did sodium citrate liberate blood transfusion from donor-to-patient tubing?',
      },
      {
        step: 2,
        date: '1916–1917',
        para_ref: '[2.1]',
        heading: 'Why was glucose addition essential to prevent red blood cell breakdown?',
        bullets: [
          'Mixing sweet sugar syrup to feed fragile red cells',
          'Packing glass medicine bottles into insulated ice chests',
          'Keeping precious donations fresh for four weeks',
        ],
        focus_clue: 'Why was glucose addition essential to prevent red blood cell breakdown?',
      },
      {
        step: 3,
        date: 'Nov 1917',
        para_ref: '[2.2]',
        heading: 'Why did pre-stored blood transform surgical survival during surprise assaults?',
        bullets: [
          'Collecting universal Type O bottles before big attack',
          'Carrying twenty-two vacuum metal flasks to frontline',
          'Reviving dying soldiers suffering cold shock',
        ],
        focus_clue:
          'Why did pre-stored blood transform surgical survival during surprise assaults?',
      },
      {
        step: 4,
        date: '1917–1918',
        para_ref: '[3.1]',
        heading: 'Why was local anaesthesia superior to general anaesthetic in head trauma?',
        bullets: [
          'Numbing scalp with local needle jabs to stop brain swelling',
          'Clamping bleeding blood vessels with tiny silver clips',
          'Pulling out buried iron shards with magnetic rods',
        ],
        focus_clue: 'Why was local anaesthesia superior to general anaesthetic in head trauma?',
      },
      {
        step: 5,
        date: '1917–1918',
        para_ref: '[3.2, 4.1]',
        heading: 'How did the tubed pedicle technique prevent skin grafts from rotting and dying?',
        bullets: [
          'Rolling chest skin into living round meat tubes',
          'Keeping blood pumping into graft while it stitches to face',
          'Sculpting new noses, chins, and jaws for shattered soldiers',
        ],
        focus_clue:
          'How did the tubed pedicle technique prevent skin grafts from rotting and dying?',
      },
    ],
    causal_domino_spine: {
      title: 'Lifesaving Innovations: Blood Storage, Brain Surgery & Plastic Reconstruction',
      subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
      stages: [
        {
          step: 1,
          date: '1914–1915',
          para_ref: '[1.1–1.2]',
          title: 'Sodium Citrate & Clotting',
          actor: 'Albert Hustin & Richard Lewisohn',
          tag: '🩸 SODIUM CITRATE ANTICOAGULANT',
          trigger:
            'Before 1914, blood transfusions required connecting donor and patient arm-to-arm with rubber tubes because blood coagulated into solid clots within minutes of leaving the human body.',
          desc: 'Before 1914, blood transfusions required connecting donor and patient arm-to-arm with rubber tubes because blood coagulated into solid clots within minutes of leaving the human body.',
          connective:
            'Belgian doctor Albert Hustin discovered that adding non-toxic sodium citrate prevented clotting, allowing blood to be collected in advance and administered indirectly via glass funnels.',
          question:
            'How did sodium citrate liberate blood transfusion from donor-to-patient tubing?',
        },
        {
          step: 2,
          date: '1916–1917',
          para_ref: '[2.1]',
          title: 'Citrate-Glucose Blood Storage',
          actor: 'Francis Rous & James Turner',
          tag: '❄️ REFRIGERATED GLUCOSE STORAGE',
          trigger:
            'In 1916, Francis Rous and James Turner discovered that adding a dextrose-glucose sugar solution nourished red blood cells and prevented cellular breakdown during storage.',
          desc: 'In 1916, Francis Rous and James Turner discovered that adding a dextrose-glucose sugar solution nourished red blood cells and prevented cellular breakdown during storage.',
          connective:
            'Allowed citrated blood bottled in glass medicine containers and packed in insulated iceboxes to remain fresh, viable, and transfusable for up to four weeks.',
          question: 'Why was glucose addition essential to prevent red blood cell breakdown?',
        },
        {
          step: 3,
          date: 'Nov 1917',
          para_ref: '[2.2]',
          title: 'Cambrai Blood Bank Depot',
          actor: 'Captain Oswald Robertson (US Army / British RAMC)',
          tag: '🧊 CAMBRAI BLOOD DEPOT',
          trigger:
            'Ahead of the British tank offensive at Cambrai in November 1917, Captain Oswald Robertson established the world’s first forward military blood bank depot, stocking 22 units of universal Type O blood in ice chests.',
          desc: 'Ahead of the British tank offensive at Cambrai in November 1917, Captain Oswald Robertson established the world’s first forward military blood bank depot, stocking 22 units of universal Type O blood in ice chests.',
          connective:
            'Treated 20 severely shocked casualties who would have died waiting for live donors, reviving 11 and proving that stored blood banks were practical on active battlefields.',
          question:
            'Why did pre-stored blood transform surgical survival during surprise assaults?',
        },
        {
          step: 4,
          date: '1917–1918',
          para_ref: '[3.1]',
          title: 'Harvey Cushing’s Brain Surgery',
          actor: 'Harvey Cushing (Pioneering Neurosurgeon)',
          tag: '🧠 NEUROSURGERY & SILVER CLIPS',
          trigger:
            'American neurosurgeon Harvey Cushing operated at CCS No. 46, abandoning traditional scalpels and ether to introduce local anaesthetic injections (preventing brain swelling and fatal intracranial pressure).',
          desc: 'American neurosurgeon Harvey Cushing operated at CCS No. 46, abandoning traditional scalpels and ether to introduce local anaesthetic injections (preventing brain swelling and fatal intracranial pressure).',
          connective:
            'Used surgical magnets to extract shrapnel and tiny silver clips to stop delicate cerebral haemorrhages, raising surgical brain wound survival from 50% to over 71%.',
          question: 'Why was local anaesthesia superior to general anaesthetic in head trauma?',
        },
        {
          step: 5,
          date: '1917–1918',
          para_ref: '[3.2, 4.1]',
          title: 'Harold Gillies at Sidcup',
          actor: "Harold Gillies & Queen's Hospital Sidcup",
          tag: '🎭 TUBED PEDICLE PLASTIC SURGERY',
          trigger:
            'New Zealand surgeon Harold Gillies established a specialized facial reconstruction hospital at Queen’s Hospital, Sidcup, in 1917 to rebuild jaws and faces destroyed by bullet fire and shrapnel.',
          desc: 'New Zealand surgeon Harold Gillies established a specialized facial reconstruction hospital at Queen’s Hospital, Sidcup, in 1917 to rebuild jaws and faces destroyed by bullet fire and shrapnel.',
          connective:
            'Invented the "tubed pedicle" graft, rolling skin into living tubes connected to the chest to preserve blood supply until the new facial graft established its own circulation, completing over 11,000 pioneering plastic operations.',
          question:
            'How did the tubed pedicle technique prevent skin grafts from rotting and dying?',
        },
      ],
    },
  },
};

function main() {
  const { unitData } = require(dataFilePath);
  console.log(`Loaded edexcel_medicine data. Total lessons: ${unitData.lessons.length}`);

  let updatedCount = 0;
  for (let i = 0; i < unitData.lessons.length; i++) {
    const lesson = unitData.lessons[i];
    if (westernFrontSpines[lesson.id]) {
      const spine = westernFrontSpines[lesson.id];
      lesson.workbook_stages = spine.workbook_stages;
      lesson.causal_domino_spine = spine.causal_domino_spine;
      // Also update timeline_anchor so it stays in full harmony
      lesson.timeline_anchor = spine.causal_domino_spine.stages.map((st) => ({
        date: st.date,
        title: st.title,
        desc: st.trigger,
        para_ref: st.para_ref,
      }));
      updatedCount++;
      console.log(`[OK] Injected spine & stages into ${lesson.id} (${lesson.title})`);
    }
  }

  const exportString = `export const unitData = ${JSON.stringify(unitData, null, 2)};\n`;
  fs.writeFileSync(dataFilePath, exportString, 'utf8');
  console.log(`🎉 Successfully updated ${updatedCount} Western Front lessons in ${dataFilePath}`);
}

main();
