// ==========================================================================
// Pearson Edexcel GCSE History (9-1) Active Recall Blurt Curriculum Database
// Platform: The History Revision Hub
//
// Calibrated strictly to Pearson Edexcel Assessment Objectives (AO1, AO2, AO3, AO4)
// Across Paper 1 (Section A & B), Paper 2 (Depth & Period), and Paper 3 (Modern Depth)
// ==========================================================================

export const BLURT_TOPICS_DATABASE = [
  // ==========================================================================
  // PAPER 1: MEDICINE IN BRITAIN (c1250–present) & WESTERN FRONT (1914–18)
  // ==========================================================================

  // --- Paper 1 Section B: Thematic Study (c1250–Present) ---
  {
    topicId: 'med_c1250_black_death',
    paperId: 'paper1_11_medicine_britain',
    paperType: 'paper1_thematic',
    specCode: 'Option 11 • c1250–c1500',
    title: 'Medieval Medicine: Ideas on Cause & The Black Death (1348)',
    subtitle: 'Religious explanations, Galenic humorism, miasma, and municipal responses',
    examMission:
      'Compare ideas on cause, treatments/preventions, and which factor drove continuity (Church control & lack of scientific dissection).',
    drivingQuestion:
      'Explain why there was so little change in medical ideas about the cause and treatment of disease between c1250 and c1500.',
    pupilPromptCue:
      'Write about: Four Humours & Galen, supernatural/religious beliefs, miasma, and how people responded to the 1348 Black Death.',
    prompt:
      'Free recall practice: Retrieve medieval ideas about the causes of disease (Four Humours, Galen, God, Miasma), treatments, and societal reactions to the Black Death (1348).',
    specItemSyncPrefix: 'spec-paper1_11_medicine_britain-med_medieval',
    relatedLesson: { unit: 'edexcel_medicine', index: 0 },
    scaffoldLadder: {
      step1_questions: [
        'What supernatural and rational beliefs did medieval people hold about why disease occurred?',
        'How did ordinary people and physicians attempt to treat or ward off the 1348 Black Death?',
        "Why did the Catholic Church's authority prevent major changes in medical knowledge?",
      ],
      step2_wordbank: [
        'c1250',
        '1348 (Arrival in Dorset)',
        '1349 (Edward III letter)',
        'Four Humours',
        'Theory of Opposites',
        'Galen',
        'Hippocrates',
        'Miasma',
        'Astrology (1345 conjunction)',
        'Flagellants',
        'Phlebotomy (bloodletting)',
        'Regimen Sanitatis',
        'Urine chart',
      ],
      step3_starters: [
        'In the medieval period, the two dominant explanations for the cause of illness were divine punishment from God and...',
        'When the Black Death struck England in 1348, people attempted to prevent and treat it by...',
        'Medical ideas did not change during this era because the Catholic Church controlled universities and...',
      ],
    },
    thematicClusters: [
      {
        name: 'Supernatural & Religious Explanations',
        description:
          'Disease sent by God as punishment for sins, planetary alignment (1345), and devilish influence.',
        keywords: [
          'god',
          'divine',
          'sin',
          'punishment',
          'flagellants',
          'astrology',
          'saturn',
          'mars',
          'prayer',
          'penance',
        ],
      },
      {
        name: 'Humoral & Natural Theory (Galen & Hippocrates)',
        description:
          "The Four Humours (blood, phlegm, yellow bile, black bile) and Galen's Theory of Opposites.",
        keywords: [
          'humour',
          'humoral',
          'galen',
          'hippocrates',
          'opposites',
          'bloodletting',
          'phlebotomy',
          'purging',
          'leech',
          'cupping',
        ],
      },
      {
        name: 'Miasma & Environmental Air',
        description:
          'Corrupt, foul-smelling air from swamps, rotting dung, and corpses causing internal decay.',
        keywords: [
          'miasma',
          'bad air',
          'rotting',
          'dung',
          'sweet-smelling',
          'posies',
          'pomander',
          'stench',
        ],
      },
      {
        name: 'The Black Death Epidemic (1348)',
        description:
          'Arrival at Melcombe Regis, buboes, pneumonic symptoms, mortality, and municipal reaction.',
        keywords: [
          '1348',
          'black death',
          'buboes',
          'melcombe regis',
          'dorset',
          'edward iii',
          '1349',
          'quarantine',
          '30%',
          '50%',
        ],
      },
    ],
    widerKnowledgeExamples:
      'Flagellants whipping themselves, King Edward III 1349 London street cleaning order, 1345 conjunction of Saturn/Jupiter/Mars, pomanders, quarantine boards, pilgrimage to Canterbury.',
    benchmark: {
      dates: [
        {
          date: 'c1250',
          label: 'Start of Edexcel medieval period; Catholic Church monopolizes medical education',
        },
        { date: '1348', label: 'Black Death arrives in England via Dorset port of Melcombe Regis' },
        {
          date: '1349',
          label:
            'King Edward III writes to Mayor of London demanding street cleaning to remove miasma',
        },
        {
          date: '1350',
          label:
            'First Black Death epidemic subsides after killing an estimated 30–50% of the population',
        },
      ],
      vocab: [
        {
          term: 'Four Humours',
          meaning: "Hippocrates' theory of Blood, Phlegm, Yellow Bile, Black Bile",
        },
        {
          term: 'Theory of Opposites',
          meaning:
            "Galen's principle of treating humours with their opposite quality (e.g. cucumber for hot fever)",
        },
        {
          term: 'Miasma',
          meaning:
            'Corrupt air believed to emanate from rotting organic waste, swamps, and marshes',
        },
        {
          term: 'Astrology',
          meaning: 'Conjunction of Saturn, Jupiter, and Mars in 1345 blamed for corrupting air',
        },
        {
          term: 'Flagellants',
          meaning:
            "Radical religious sect who whipped themselves in public to appease God's divine wrath",
        },
        {
          term: 'Regimen Sanitatis',
          meaning:
            'Set of health instructions written by Galen prescribing balanced diet, rest, and baths',
        },
        {
          term: 'Phlebotomy',
          meaning:
            'Bloodletting via vein incision, cupping, or leeches to restore humoral equilibrium',
        },
        {
          term: 'Urine Chart',
          meaning:
            'Visual diagnostic wheel used by medieval physicians to assess colour, thickness, and smell',
        },
      ],
      mechanisms: [
        'The Catholic Church exercised total control over universities and monastic libraries, forbidding human dissection and declaring Galenic texts sacrosanct because Galen believed in a single Creator.',
        'Therapeutic approaches focused exclusively on divine appeasement (prayers, fasting, pilgrimages) and humoral re-balancing (bloodletting, purging) because microscopic germ transmission was inconceivable.',
        'Local authorities enacted crude public health measures (quarantine, raking streets, halting cemetery burials), but lacked enforcement power or scientific understanding of flea vectors.',
      ],
      examinerTip:
        'Grade 9 Distinction: Do not confuse the Black Death (1348) with the Great Plague (1665). Emphasize that criticizing Galen in the medieval period was treated as heresy by the Church.',
    },
  },

  {
    topicId: 'med_ren_anat',
    paperId: 'paper1_11_medicine_britain',
    paperType: 'paper1_thematic',
    specCode: 'Option 11 • c1500–c1700',
    title: 'Renaissance Anatomy & Physiology: Vesalius & William Harvey',
    subtitle:
      'Challenging Galenic orthodoxy through empirical human dissection and mechanical calculation',
    examMission:
      'Assess anatomical breakthroughs vs lagged medical treatments; the role of the printing press and Royal Society.',
    drivingQuestion:
      'Explain why the discoveries of Andreas Vesalius and William Harvey changed medical understanding, but had limited impact on everyday treatments in the period c1500–c1700.',
    pupilPromptCue:
      "Write about: Vesalius disproving Galen's anatomical errors (1543), Harvey's circulation proof (1628), and why traditional treatments persisted.",
    prompt:
      'Free recall practice: Retrieve the anatomical breakthroughs of Andreas Vesalius (1543) and William Harvey (1628), and evaluate their immediate vs long-term impact.',
    specItemSyncPrefix: 'spec-paper1_11_medicine_britain-med_renaissance',
    relatedLesson: { unit: 'edexcel_medicine', index: 4 },
    scaffoldLadder: {
      step1_questions: [
        "How did Andreas Vesalius use human dissection to challenge Galen's 300+ anatomical errors?",
        'How did William Harvey calculate mathematically that blood circulated in a closed loop?',
        'Why did these anatomical discoveries have little immediate effect on curing everyday illnesses?',
      ],
      step2_wordbank: [
        '1543 (The Fabric)',
        '1628 (De Motu Cordis)',
        '1660 (Royal Society)',
        'Vesalius',
        'Harvey',
        'De Humani Corporis Fabrica',
        'Dissection of human cadavers',
        'Jawbone error',
        'Mechanical cardiac pump',
        'One-way valves in veins',
        'Capillaries predicted',
      ],
      step3_starters: [
        'Andreas Vesalius revolutionized the study of anatomy in 1543 by insisting on direct human dissection, which proved that Galen had...',
        'In 1628, William Harvey calculated that the liver could not possibly manufacture new blood because...',
        'Although Vesalius and Harvey transformed anatomical understanding, their immediate impact on patient survival was limited because...',
      ],
    },
    thematicClusters: [
      {
        name: 'Andreas Vesalius: Human Dissection & Fabric of the Human Body (1543)',
        description:
          "Direct dissection of executed criminals, disproving Galen's errors based on animals (jawbone in one piece, liver lobes, septum pores).",
        keywords: [
          'vesalius',
          'fabrica',
          '1543',
          'dissection',
          'cadaver',
          'jawbone',
          'septum',
          'printing press',
          'padua',
        ],
      },
      {
        name: 'William Harvey: Circulation of the Blood (1628)',
        description:
          'De Motu Cordis, calculating blood volume, heart as a mechanical pump, one-way valves in veins, disproving Galenic blood consumption.',
        keywords: [
          'harvey',
          '1628',
          'de motu cordis',
          'circulation',
          'pump',
          'valves',
          'veins',
          'arteries',
          'charles i',
          'capillaries',
        ],
      },
      {
        name: 'Scientific Revolution & Royal Society (1660)',
        description:
          'Motto "Nullius in Verba", sharing empirical observations, peer review, and the development of the microscope.',
        keywords: [
          'royal society',
          '1660',
          'nullius in verba',
          'empirical',
          'microscope',
          'hooke',
          'scientific method',
        ],
      },
      {
        name: 'The Treatment-Knowledge Disconnect',
        description:
          'Why patients continued to receive bloodletting and herbal purges despite anatomical breakthroughs.',
        keywords: [
          'treatment lag',
          'continuity',
          'bloodletting',
          'purging',
          'superstition',
          'germ theory missing',
          'quackery',
        ],
      },
    ],
    widerKnowledgeExamples:
      'Harvey as royal physician to James I and Charles I, Vesalius stealing bodies from the gallows at Louvain, Jan van Calcar\'s woodcut illustrations, Thomas Sydenham\'s bedside observations ("English Hippocrates").',
    benchmark: {
      dates: [
        {
          date: '1543',
          label: 'Vesalius publishes De Humani Corporis Fabrica (The Fabric of the Human Body)',
        },
        {
          date: '1628',
          label: 'Harvey publishes De Motu Cordis (On the Motion of the Heart and Blood)',
        },
        {
          date: '1660',
          label: 'The Royal Society is founded in London to promote empirical scientific inquiry',
        },
        { date: '1665', label: 'Great Plague strikes London; municipal quarantine rules enacted' },
      ],
      vocab: [
        {
          term: 'De Humani Corporis Fabrica',
          meaning:
            "Vesalius' masterwork illustrating human anatomy based on direct human dissection",
        },
        {
          term: 'De Motu Cordis',
          meaning:
            "Harvey's treatise proving the heart acts as a pump circulating blood continuously",
        },
        {
          term: 'One-Way Valves',
          meaning:
            "Internal venous flaps proved by Harvey's ligature experiments, ensuring blood only flows toward heart",
        },
        {
          term: 'Dissection',
          meaning:
            'Surgical cutting open of human corpses for anatomical observation, championed in Renaissance universities',
        },
        {
          term: 'Royal Society',
          meaning:
            'Scientific fellowship chartered by Charles II in 1662 with motto Nullius in Verba ("Take nobody\'s word for it")',
        },
        {
          term: 'Mechanical Pump',
          meaning:
            "Harvey's conceptualization of the heart operating like a fire engine water pump",
        },
        {
          term: 'Printing Press',
          meaning:
            "Gutenberg's moveable type innovation allowing accurate medical anatomical plates to spread across Europe",
        },
      ],
      mechanisms: [
        "Vesalius corrected over 300 of Galen's anatomical errors by demonstrating that Galen had dissected apes and pigs (e.g. human lower jaw is one bone, not two; no holes in heart septum).",
        'Harvey calculated mathematically that the liver would have to produce 540 pints of blood per hour if consumed by the body, proving blood must circulate continuously through a closed system.',
        'Anatomical discoveries failed to immediately improve treatments because microscopic pathogens (bacteria/viruses) were still invisible, leaving doctors without anti-infective medications.',
      ],
      examinerTip:
        'Examiner Warning: Many candidates mistakenly write that Harvey discovered capillaries. Clarify that Harvey mathematically predicted capillaries, but Marcello Malpighi observed them with a microscope in 1661 after Harvey died.',
    },
  },

  {
    topicId: 'med_18_19_snow_pasteur',
    paperId: 'paper1_11_medicine_britain',
    paperType: 'paper1_thematic',
    specCode: 'Option 11 • c1700–c1900',
    title: '19th-Century Breakthroughs: Snow, Germ Theory & Antiseptics',
    subtitle:
      'John Snow (1854), Louis Pasteur (1861), Robert Koch (1882), and Joseph Lister (1865)',
    examMission:
      'Explain multi-factor change: Government public health action, empirical epidemiology (Snow), bacteriology (Pasteur/Koch), and antiseptic surgery (Lister).',
    drivingQuestion:
      'Explain why there was rapid progress in disease prevention and surgical survival in Britain between 1850 and 1900.',
    pupilPromptCue:
      "Write about: John Snow's Broad Street pump (1854), Pasteur's Germ Theory (1861), Koch's microbe identification, and Lister's carbolic acid (1865).",
    prompt:
      "Free recall practice: Retrieve 19th-century medical milestones: John Snow's 1854 cholera breakthrough, Pasteur's 1861 Germ Theory, Koch's staining techniques, and Lister's carbolic acid.",
    specItemSyncPrefix: 'spec-paper1_11_medicine_britain-med_modern',
    relatedLesson: { unit: 'edexcel_medicine', index: 8 },
    scaffoldLadder: {
      step1_questions: [
        'How did John Snow prove that cholera was a water-borne disease in Soho in 1854?',
        'How did Louis Pasteur disprove spontaneous generation in 1861 with his swan-neck flask experiment?',
        "How did Joseph Lister use Pasteur's research to pioneer antiseptic surgery in 1865?",
      ],
      step2_wordbank: [
        '1854 (Broad Street pump)',
        '1861 (Germ Theory)',
        '1865 (Carbolic acid)',
        '1875 (Public Health Act)',
        '1882 (Koch TB discovery)',
        'John Snow',
        'Louis Pasteur',
        'Robert Koch',
        'Joseph Lister',
        'Swan-neck flask',
        'Carbolic spray',
        'Agar jelly & industrial dyes',
        'Broad Street pump handle',
      ],
      step3_starters: [
        'In 1854, Dr John Snow proved that cholera was transmitted through contaminated drinking water rather than miasma by...',
        'Louis Pasteur overturned centuries of belief in spontaneous generation in 1861 by publishing his Germ Theory, which demonstrated that...',
        "Joseph Lister applied Pasteur's findings to the operating theatre in 1865 by introducing carbolic acid, which resulted in...",
      ],
    },
    thematicClusters: [
      {
        name: 'John Snow & The Broad Street Pump (1854)',
        description:
          'Epidemiological spot-mapping in Soho, identifying the Broad Street pump, cesspool contamination, and handle removal.',
        keywords: [
          'john snow',
          'broad street',
          '1854',
          'cholera',
          'water',
          'soho',
          'pump handle',
          'cesspool',
          'brewery',
        ],
      },
      {
        name: "Louis Pasteur's Germ Theory (1861)",
        description:
          'Swan-neck flask experiments on beer/wine souring, proving microorganisms in air cause decay and disease.',
        keywords: [
          'louis pasteur',
          'germ theory',
          '1861',
          'swan neck',
          'decay',
          'fermentation',
          'spontaneous generation',
          'microbes',
        ],
      },
      {
        name: 'Robert Koch & Specific Bacteriology (1882)',
        description:
          'Identifying specific microbes (anthrax 1876, tuberculosis 1882, cholera 1883) using methyl violet dyes and agar petri dishes.',
        keywords: [
          'robert koch',
          'staining',
          'dyes',
          'agar',
          'petri dish',
          'tuberculosis',
          '1882',
          'anthrax',
          'pure culture',
        ],
      },
      {
        name: 'Joseph Lister & Antiseptic Surgery (1865)',
        description:
          'Carbolic acid spray in operating theatres, dressings, carbolic ligatures, reducing post-operative mortality from 46% to 15%.',
        keywords: [
          'joseph lister',
          'carbolic acid',
          '1865',
          'antiseptic',
          'gangrene',
          'sepsis',
          'dressings',
          'compound fracture',
        ],
      },
    ],
    widerKnowledgeExamples:
      "Soho brewery workers surviving because they drank beer rather than pump water, Edwin Chadwick's 1842 Report, 1875 Public Health Act making clean water and sewers mandatory, Joseph Bazalgette's 1,100-mile London sewer system following the Great Stink of 1858.",
    benchmark: {
      dates: [
        {
          date: '1854',
          label:
            'John Snow removes the Broad Street pump handle, halting the Soho cholera epidemic',
        },
        { date: '1861', label: 'Louis Pasteur publishes the Germ Theory of disease' },
        {
          date: '1865',
          label:
            'Joseph Lister first uses carbolic acid antiseptic during surgery on Jamie Greenlees',
        },
        { date: '1875', label: "Disraeli's government passes the compulsory Public Health Act" },
        {
          date: '1882',
          label:
            'Robert Koch discovers the specific bacterium causing tuberculosis (Mycobacterium tuberculosis)',
        },
      ],
      vocab: [
        {
          term: 'Epidemiology',
          meaning:
            'The study and mapping of disease incidence and distribution in populations (pioneered by Snow)',
        },
        {
          term: 'Germ Theory',
          meaning:
            "Pasteur's principle that microscopic organisms cause decay and specific human diseases",
        },
        {
          term: 'Spontaneous Generation',
          meaning:
            'False theory that rotting matter generated microbes spontaneously rather than air contaminants',
        },
        {
          term: 'Carbolic Acid',
          meaning:
            'Phenol spray used by Lister to sterilize surgical instruments, operating fields, and wound dressings',
        },
        {
          term: 'Agar Jelly & Dyes',
          meaning:
            'Petri dish culture medium and chemical stains used by Koch to isolate specific bacterial colonies',
        },
        {
          term: 'Public Health Act 1875',
          meaning:
            'Landmark legislation compelling local councils to provide clean water, sewers, and street paving',
        },
      ],
      mechanisms: [
        "John Snow's forensic dot map provided empirical proof that cholera clustered exclusively around a contaminated water source, disproving miasma even before the cholera bacterium was seen under a microscope.",
        "Pasteur's swan-neck flask experiment proved that sterilized broth remained sterile until exposed to airborne particles, shattering the ancient orthodoxy of spontaneous generation.",
        "Lister's introduction of carbolic acid reduced surgical mortality from 46% to 15% within 3 years by preventing airborne and contact bacterial sepsis in compound fractures and amputations.",
      ],
      examinerTip:
        'High-Level Synthesis: Connect the chain of causation—Snow observed water transmission empirically (1854) ➔ Pasteur proved airborne germs cause decay (1861) ➔ Lister applied Germ Theory to kill surgical wound bacteria (1865) ➔ Koch isolated the specific cholera and TB bacteria (1882).',
    },
  },

  {
    topicId: 'med_wf_medicine',
    paperId: 'paper1_11_medicine_britain',
    paperType: 'paper1_sec_a',
    specCode: 'Option 11 • Historic Environment',
    title: 'Western Front: Evacuation Chain, Gas Trauma & Wound Care (1914–18)',
    subtitle:
      'The casualty evacuation chain, Thomas Splint, blood transfusions, mobile X-rays, and plastic surgery',
    examMission:
      'Describe two features of medical evacuation, trauma innovations, or environmental illness on the British sector of the Western Front.',
    drivingQuestion:
      'Explain why new medical treatments and logistical innovations were developed to treat wounded soldiers on the Western Front, 1914–18.',
    pupilPromptCue:
      "Write about: The Casualty Evacuation Chain (RAP ➔ MDS ➔ CCS ➔ Base Hospital), Thomas Splint, mobile X-rays, blood storage, and Harold Gillies' plastic surgery.",
    prompt:
      'Free recall practice: Retrieve Western Front medical organization: the Evacuation Chain (RAP, ADS/MDS, CCS, Base Hospital), FANY/RAMC, the Thomas Splint, mobile X-rays, and blood storage depots.',
    specItemSyncPrefix: 'spec-paper1_11_medicine_britain-med_wf',
    relatedLesson: { unit: 'edexcel_medicine', index: 12 },
    scaffoldLadder: {
      step1_questions: [
        'What were the four sequential stages of the British Casualty Evacuation Chain on the Western Front?',
        "How did Hugh Owen Thomas' splint reduce compound femur fracture mortality from 80% to 20%?",
        'How was blood collected, stored with sodium citrate, and administered at the Battle of Cambrai in 1917?',
      ],
      step2_wordbank: [
        '1914–18',
        '1915 (Second Ypres gas)',
        '1916 (Thomas Splint standardized)',
        '1917 (Cambrai blood depot)',
        'RAP (Regimental Aid Post)',
        'Dressing Station (ADS/MDS)',
        'CCS (Casualty Clearing Station)',
        'Base Hospital',
        'RAMC & FANY',
        'Thomas Splint (80% to 20%)',
        'Sodium citrate & glucose',
        'Oswald Robertson',
        'Mobile X-ray (radiology)',
        'Carrel-Dakin method',
        "Harold Gillies (Queen's Hospital Sidcup)",
      ],
      step3_starters: [
        'The British Army casualty evacuation chain operated in four progressive tiers designed to triage wounded men, starting with...',
        'The introduction of the Thomas Splint in late 1915 transformed battlefield trauma survival because it...',
        'Blood transfusions were revolutionized on the Western Front by 1917 through the work of Oswald Robertson, who...',
      ],
    },
    thematicClusters: [
      {
        name: 'The Casualty Evacuation Chain (Triage Architecture)',
        description:
          'Regimental Aid Post (RAP 200m from line), Dressing Stations (ADS/MDS), Casualty Clearing Station (CCS near railheads), and Base Hospitals at coastal ports (Calais, Boulogne).',
        keywords: [
          'rap',
          'dressing station',
          'ccs',
          'casualty clearing station',
          'base hospital',
          'triage',
          'evacuation',
          'railhead',
          'ambulance',
        ],
      },
      {
        name: 'The Thomas Splint & Fracture Survival (1915–16)',
        description:
          'Stabilizing fractured femurs, preventing bone ends grinding together, stopping internal haemorrhage and fat embolisms, slashing mortality from 80% to 20%.',
        keywords: [
          'thomas splint',
          'femur',
          'compound fracture',
          'haemorrhage',
          '80% to 20%',
          '80%',
          '20%',
          'hugh owen thomas',
          '1915',
        ],
      },
      {
        name: 'Mobile X-Rays & Foreign Body Extraction',
        description:
          'Marie Curie and RAMC mobile radiological vans locating shrapnel, bullets, and clothing before gas gangrene sets in.',
        keywords: [
          'x-ray',
          'radiology',
          'mobile',
          'shrapnel',
          'marie curie',
          'locating bullets',
          'tubes',
          'burns',
        ],
      },
      {
        name: 'Blood Transfusion & The First Blood Bank (Cambrai 1917)',
        description:
          "Adding sodium citrate (Hustin 1914) to prevent clotting, glucose for refrigeration (Rous & Turner 1916), and Oswald Robertson's blood depot at Cambrai (1917).",
        keywords: [
          'blood transfusion',
          'sodium citrate',
          'robertson',
          'cambrai',
          '1917',
          'blood depot',
          'refrigeration',
          'shock',
        ],
      },
    ],
    widerKnowledgeExamples:
      "Carrel-Dakin antiseptic irrigation method for gas gangrene, Queen's Hospital in Sidcup (Kent) where Harold Gillies performed over 11,000 plastic surgeries on facial blast wounds, FANY (First Aid Nursing Yeomanry) driving motorized ambulances, gas masks progressing from urine-soaked rags to the Small Box Respirator (1916).",
    benchmark: {
      dates: [
        {
          date: '1914',
          label:
            'Outbreak of WWI; British Expeditionary Force establishes initial casualty clearing system',
        },
        {
          date: '1915',
          label:
            'Germans first deploy chlorine gas at 2nd Battle of Ypres; Thomas Splint brought to Western Front',
        },
        {
          date: '1916',
          label: 'Battle of the Somme; massive triage test for CCS; Small Box Respirator issued',
        },
        {
          date: 'Nov 1917',
          label:
            "Battle of Cambrai; Captain Oswald Robertson establishes the world's first blood bank",
        },
      ],
      vocab: [
        {
          term: 'Regimental Aid Post (RAP)',
          meaning: 'Immediate dugout triage post situated within 200m of the front line',
        },
        {
          term: 'Casualty Clearing Station (CCS)',
          meaning:
            'Critical surgical trauma units located beyond enemy artillery range near railway lines',
        },
        {
          term: 'Thomas Splint',
          meaning:
            'Rigid metal frame that stabilized broken thigh bones, reducing femur fracture deaths from 80% to 20%',
        },
        {
          term: 'Sodium Citrate',
          meaning:
            'Anticoagulant chemical discovered in 1914 that stopped donor blood clotting outside the body',
        },
        {
          term: 'Oswald Robertson',
          meaning:
            'US Army doctor who collected, bottled, and stored blood on ice before the Battle of Cambrai (1917)',
        },
        {
          term: 'Carrel-Dakin Method',
          meaning:
            'Sterile chemical irrigation of open wounds with sodium hypochlorite to combat gas gangrene',
        },
        {
          term: 'FANY',
          meaning:
            'First Aid Nursing Yeomanry; female volunteer ambulance drivers transporting wounded from CCS to Base Hospitals',
        },
      ],
      mechanisms: [
        'The evacuation chain operated a strict triage protocol at the CCS, categorizing men into Walking Wounded, In Need of Immediate Surgery, and Beyond Help, ensuring finite surgical staff focused exclusively on salvageable abdominal/arterial trauma.',
        'The Thomas Splint immobilized compound femur fractures during transport across pitted shell-hole terrain, halting femoral artery severance and traumatic blood loss.',
        'Storing universal Type O blood in iced ammunition boxes at Cambrai allowed doctors to treat traumatic shock instantaneously at the CCS before performing life-saving emergency surgery.',
      ],
      examinerTip:
        'Historic Environment Q1 Format: In "Describe two features of..." questions, give Feature 1 + Specific Supporting Detail (dates, statistics, equipment), followed by Feature 2 + Specific Supporting Detail. Do not write full essay paragraphs!',
    },
  },

  {
    topicId: 'med_wf_q1_battles_terrain',
    paperId: 'paper1_11_medicine_britain',
    paperType: 'paper1_sec_a',
    specCode: 'Option 11 • Section A Q1',
    title: 'Western Front Q1: Battles, Terrain & The Evacuation Chain',
    subtitle: 'Official 2-mark features for Ypres, Somme, Arras underground hospital, and Cambrai',
    examMission:
      'Describe two features of the evacuation chain or key Western Front battle sectors (Ypres, Somme, Arras, Cambrai). 2 + 2 = 4 Marks.',
    drivingQuestion:
      'Describe two features of the support systems or battle conditions on the Western Front. [4 Marks]',
    pupilPromptCue:
      'Write 2 distinct features: Feature 1 + specific fact/statistic, and Feature 2 + specific fact/statistic.',
    prompt:
      'Free recall practice: Retrieve features of the Western Front battle sectors: Ypres salient, Somme casualties, Arras underground quarry hospital, and Cambrai blood depots.',
    specItemSyncPrefix: 'spec-paper1_11_medicine_britain-med_wf',
    relatedLesson: { unit: 'edexcel_medicine', index: 11 },
    scaffoldLadder: {
      step1_questions: [
        'What were the unique geographical or architectural features of the underground hospital at Arras?',
        'What was a key feature of the terrain at the Ypres salient, and how did it affect stretcher bearers?',
        'What was the primary function of the Casualty Clearing Station (CCS)?',
      ],
      step2_wordbank: [
        'Ypres Salient (Hill 60)',
        'Somme (57,000 casualties Day 1)',
        'Arras (700 beds underground)',
        'Cambrai (450 tanks & blood depot)',
        'Chalk quarries at Arras',
        'Mud and waterlogged trenches',
        'Stretcher bearers (4–8 men per stretcher)',
        'Motorized ambulances (FANY)',
        'Casualty Clearing Station near railway',
      ],
      step3_starters: [
        'One feature of the underground hospital at Arras was that it was constructed inside ancient chalk quarries and...',
        'Another feature of medical evacuation on the Western Front was the Casualty Clearing Station (CCS), which was positioned near railway sidings so that...',
      ],
    },
    thematicClusters: [
      {
        name: "Arras Underground Hospital (Thompson's Cave)",
        description:
          'Chalk quarries expanded into a subterranean 700-bed hospital with running water, electric lights, and operating theatres 800m from front line.',
        keywords: [
          'arras',
          'underground',
          'quarry',
          'chalk',
          'thompson',
          '700 beds',
          'electricity',
          'operating theatre',
          'water',
        ],
      },
      {
        name: 'The Ypres Salient & Shell-Cratered Terrain',
        description:
          'Vulnerable bulge surrounded on 3 sides by German artillery on higher ground; Passchendaele mud requiring 6–8 bearers per stretcher.',
        keywords: [
          'ypres',
          'salient',
          'hill 60',
          'mud',
          'passchendaele',
          'stretcher bearers',
          'waterlogged',
          'shell holes',
        ],
      },
      {
        name: 'The Somme (1916) & Casualty Overload',
        description:
          '57,470 casualties on 1 July 1916 alone; overwhelming forward medical triage and proving need for advanced CCS surgery.',
        keywords: ['somme', '1916', '57000', 'overwhelmed', 'july 1', 'stretcher', 'triage'],
      },
    ],
    widerKnowledgeExamples:
      '4 to 8 stretcher bearers needed to carry a single casualty through Passchendaele mud, motorized ambulances replacing horse-drawn wagons through Red Cross and FANY fundraising.',
    benchmark: {
      dates: [
        {
          date: '1914',
          label: '1st Battle of Ypres: salient established; British hold vital Channel ports',
        },
        {
          date: '1915',
          label: '2nd Battle of Ypres: chlorine gas first used; miners blow Hill 60 ammonite mines',
        },
        {
          date: '1916',
          label: 'Battle of the Somme: 57,470 casualties on first day; Thomas Splint introduced',
        },
        {
          date: '1917',
          label:
            'Battle of Arras: underground hospital created; 3rd Ypres (Passchendaele) liquid mud',
        },
      ],
      vocab: [
        {
          term: 'Arras Underground Hospital',
          meaning:
            '800-metre subterranean hospital in chalk caves with 700 beds, operating theatres, and electricity',
        },
        {
          term: 'Ypres Salient',
          meaning:
            'Vulnerable British bulge in the Allied line surrounded on three sides by German ridge artillery',
        },
        {
          term: 'Stretcher Bearers',
          meaning:
            'Four to eight RAMC soldiers assigned per casualty to carry stretchers through impassable mud',
        },
        {
          term: 'FANY Motor Ambulances',
          meaning:
            'Volunteer women ambulance drivers transporting wounded across shell-cratered roads to Base Hospitals',
        },
      ],
      mechanisms: [
        'Feature 1: The underground hospital at Arras was built into ancient limestone quarries and contained 700 hospital beds, running water, and surgical theatres just 800 metres from the front line, protecting patients from artillery bombardment.',
        'Feature 2: Casualty Clearing Stations were strategically placed along railheads and canals, enabling rapid transfer of stabilized post-operative casualties onto dedicated ambulance trains bound for Base Hospitals at French ports.',
      ],
      examinerTip:
        'Mark Scheme Exactitude: 1 mark for the feature + 1 mark for the specific factual detail (e.g. "Arras underground hospital" = 1 mark; "contained 700 beds and was fitted with electricity and operating theatres" = 2nd mark).',
    },
  },

  {
    topicId: 'med_wf_q1_innovations_trauma',
    paperId: 'paper1_11_medicine_britain',
    paperType: 'paper1_sec_a',
    specCode: 'Option 11 • Section A Q1',
    title: 'Western Front Q1: Clinical Innovations & Trauma Treatments',
    subtitle:
      'Official 2-mark features for Thomas Splint, blood transfusions, mobile X-rays, gas masks, and plastic surgery',
    examMission:
      'Describe two features of surgical, technological, or clinical innovations on the Western Front. 2 + 2 = 4 Marks.',
    drivingQuestion:
      'Describe two features of the surgical or medical innovations developed to treat trauma on the Western Front. [4 Marks]',
    pupilPromptCue:
      'Write 2 distinct features: Feature 1 + specific fact/statistic, and Feature 2 + specific fact/statistic.',
    prompt:
      'Free recall practice: Retrieve features of clinical trauma treatments: the Thomas Splint (80% to 20%), mobile X-rays, sodium citrate blood storage, Carrel-Dakin method, and plastic surgery at Sidcup.',
    specItemSyncPrefix: 'spec-paper1_11_medicine_britain-med_wf',
    relatedLesson: { unit: 'edexcel_medicine', index: 13 },
    scaffoldLadder: {
      step1_questions: [
        'What specific medical effect did the Thomas Splint have on femur compound fractures?',
        'How did mobile X-ray units prevent gas gangrene in wounded soldiers?',
        "How did Harold Gillies reconstruct blast injuries at Queen's Hospital, Sidcup?",
      ],
      step2_wordbank: [
        'Thomas Splint',
        '80% mortality reduced to 20%',
        'Mobile X-ray vans',
        'Shrapnel localization',
        'Sodium citrate & glucose',
        'Cambrai blood depot (1917)',
        'Harold Gillies',
        "Queen's Hospital, Sidcup",
        'Pedicle tubes (skin grafts)',
        'Carrel-Dakin antiseptic irrigation',
      ],
      step3_starters: [
        'One feature of the Thomas Splint was that it pulled the broken thigh bone into rigid traction, which...',
        'Another feature of trauma surgery on the Western Front was the Carrel-Dakin method, which involved...',
      ],
    },
    thematicClusters: [
      {
        name: 'The Thomas Splint',
        description:
          'Immobilizing broken femur, pulling leg straight in traction, reducing fracture mortality from 80% to 20%.',
        keywords: ['thomas splint', '80% to 20%', '80%', '20%', 'traction', 'femur', 'blood loss'],
      },
      {
        name: 'Blood Preservation & Transfusion',
        description:
          'Sodium citrate preventing clotting, glucose extending storage to 28 days, Oswald Robertson creating the first blood bank at Cambrai (1917).',
        keywords: [
          'blood',
          'transfusion',
          'sodium citrate',
          'glucose',
          'robertson',
          'cambrai',
          'bank',
          'depot',
          'refrigerated',
        ],
      },
      {
        name: 'Harold Gillies & Plastic Reconstruction',
        description:
          "Queen's Hospital at Sidcup, pedicle skin grafting tube method, treating 11,000+ facial blast casualties.",
        keywords: [
          'gillies',
          'plastic surgery',
          'sidcup',
          'pedicle tube',
          'facial',
          'skin graft',
          'jaw',
        ],
      },
    ],
    widerKnowledgeExamples:
      'Magnets used to remove shrapnel from brain wounds (Harvey Cushing), Carrel-Dakin antiseptic irrigation flush, mobile X-ray vans designed by Marie Curie ("Petites Curies").',
    benchmark: {
      dates: [
        {
          date: '1915',
          label: 'Thomas Splint introduced to Western Front front-line medical units',
        },
        {
          date: '1916',
          label: 'Carrel-Dakin antiseptic irrigation method adopted across CCS units',
        },
        {
          date: '1917',
          label:
            "Harold Gillies opens Queen's Hospital in Sidcup, Kent, dedicated to facial reconstructive surgery",
        },
        {
          date: 'Nov 1917',
          label: "World's first stored blood transfusion depot deployed at the Battle of Cambrai",
        },
      ],
      vocab: [
        {
          term: 'Thomas Splint',
          meaning: 'Rigid traction splint reducing compound femur mortality from 80% to 20%',
        },
        {
          term: 'Pedicle Tube',
          meaning:
            'Surgical technique pioneered by Harold Gillies where skin is grown in a tube to maintain blood supply before grafting',
        },
        {
          term: 'Mobile X-Ray Van',
          meaning:
            'RAMC vehicle housing radiological equipment to identify shrapnel fragments and bullets inside casualties',
        },
        {
          term: 'Carrel-Dakin Solution',
          meaning:
            'Antiseptic sodium hypochlorite solution flushed through open puncture wounds to prevent gas gangrene',
        },
      ],
      mechanisms: [
        'Feature 1: The Thomas Splint was designed with an oval metal ring resting against the groin, holding the broken leg in continuous mechanical tension and reducing mortality from fractured femurs from 80% down to under 20%.',
        "Feature 2: Harold Gillies established Queen's Hospital in Sidcup, Kent, where he pioneered pedicle tube skin grafting to reconstruct the faces of over 11,000 soldiers suffering from catastrophic artillery blast trauma.",
      ],
      examinerTip:
        'Examiner Advice: Ensure your two features are clearly distinct. Do not give two variations of the same innovation (e.g. do not give two features of splints); give one surgical innovation (e.g. Thomas Splint) and one clinical innovation (e.g. mobile X-rays or blood storage).',
    },
  },

  // ==========================================================================
  // PAPER 2: BRITISH DEPTH STUDY (B4: Early Elizabethan England, 1558–88)
  // ==========================================================================
  {
    topicId: 'eee_religious_settlement',
    paperId: 'paper2_b4_early_elizabethan_england',
    paperType: 'paper2_depth',
    specCode: 'Option B4 • Key Topic 1',
    title: 'The Elizabethan Religious Settlement of 1559',
    subtitle:
      'Acts of Supremacy and Uniformity, Royal Injunctions, and the Puritan/Catholic challenge',
    examMission:
      'Analyze religious compromise: explain how the "Middle Way" established stability while triggering recusant and vestment challenges.',
    drivingQuestion:
      "Explain why Elizabeth I's Religious Settlement of 1559 caused opposition from both Roman Catholics and radical Puritans.",
    pupilPromptCue:
      'Write about: The Middle Way, Act of Supremacy (Supreme Governor), Act of Uniformity (Prayer Book), recusancy fines, and the Vestments Controversy.',
    prompt:
      'Free recall practice: Retrieve the Elizabethan Religious Settlement (1559): the Act of Supremacy, Act of Uniformity, Royal Injunctions, and early Puritan and Catholic challenges.',
    specItemSyncPrefix: 'spec-paper2_b4_early_elizabethan_england-eee_settlement',
    relatedLesson: { unit: 'eee', index: 1 },
    scaffoldLadder: {
      step1_questions: [
        'How did Elizabeth\'s title "Supreme Governor" resolve theological tensions compared to Henry VIII\'s "Supreme Head"?',
        'What elements of Catholic ritual and doctrine were preserved in the 1559 Prayer Book to satisfy traditionalists?',
        'Why did radical Puritans object to clerical vestments and kneeling during communion?',
      ],
      step2_wordbank: [
        '1559 (Settlement passed)',
        '1566 (Vestments controversy)',
        'Act of Supremacy',
        'Act of Uniformity',
        'Supreme Governor',
        'Book of Common Prayer',
        'Royal Injunctions',
        'Recusants (1 shilling fine)',
        'Puritans',
        'Crucifix Controversy',
        'Archbishop Matthew Parker',
        'Book of Advertisements',
      ],
      step3_starters: [
        'Elizabeth I designed her 1559 Religious Settlement as a moderate compromise or "Middle Way" because...',
        'The Act of Uniformity retained traditional ceremonial features like clerical vestments, which provoked severe opposition from Puritans who...',
        'Although Catholic recusancy was initially met with mild one-shilling fines, opposition hardened after...',
      ],
    },
    thematicClusters: [
      {
        name: 'The Act of Supremacy (1559)',
        description:
          'Elizabeth as Supreme Governor rather than Supreme Head, appeasing Catholics who believed the Pope was head of the Church.',
        keywords: [
          'act of supremacy',
          'supreme governor',
          'oath',
          'clergy',
          'pope',
          'head',
          '1559',
        ],
      },
      {
        name: 'The Act of Uniformity & Book of Common Prayer (1559)',
        description:
          'English services, but deliberate ambiguity in communion wording; clerical vestments and church decorations retained.',
        keywords: [
          'act of uniformity',
          'book of common prayer',
          'communion',
          'bread and wine',
          'vestments',
          'surplice',
          'shilling',
        ],
      },
      {
        name: 'The Puritan Challenge (Vestments & Crucifix)',
        description:
          'Puritan Marian exiles returning from Geneva demanding eradication of Catholic "popish" idolatry; Matthew Parker\'s Book of Advertisements.',
        keywords: [
          'puritans',
          'vestments',
          'crucifix',
          'matthew parker',
          'book of advertisements',
          'geneva',
          'resignation',
        ],
      },
      {
        name: 'The Catholic Challenge & Recusancy',
        description:
          'Papal loyalty, nobility in the North remaining secretly Catholic, attending Mass in private, payment of 1-shilling recusant fines.',
        keywords: [
          'catholic',
          'recusants',
          'pope',
          'mass',
          'northern nobility',
          'fines',
          'shilling',
          'loyalty',
        ],
      },
    ],
    widerKnowledgeExamples:
      'Elizabeth keeping a silver crucifix and candles in the Chapel Royal, only 1 Catholic bishop taking the Oath of Supremacy (Bishop of Llandaff), 37 London Puritan clergy refusing to wear the surplice in 1566.',
    benchmark: {
      dates: [
        {
          date: 'May 1559',
          label:
            'Parliament passes the Act of Supremacy and Act of Uniformity, establishing the Settlement',
        },
        {
          date: 'Summer 1559',
          label:
            'Royal Injunctions issued enforcing Protestant preaching while ordering images/miracles destroyed',
        },
        {
          date: '1566',
          label:
            'Vestments Controversy culminates in Archbishop Parker issuing the Book of Advertisements',
        },
      ],
      vocab: [
        {
          term: 'Supreme Governor',
          meaning:
            "Title assumed by Elizabeth to show royal supremacy without claiming headship over Christ's spiritual church",
        },
        {
          term: 'Act of Uniformity',
          meaning:
            'Law making attendance at Anglican church compulsory and mandating the 1559 Book of Common Prayer',
        },
        {
          term: 'Recusants',
          meaning:
            'Catholics who refused to attend Anglican Sunday services and paid a 1 shilling fine',
        },
        {
          term: 'Puritans',
          meaning:
            'Radical English Protestants influenced by Calvinism who demanded the complete purification of Catholic practices',
        },
        {
          term: 'Book of Advertisements',
          meaning:
            '1566 code issued by Archbishop Matthew Parker enforcing the wearing of the surplice by clergy',
        },
      ],
      mechanisms: [
        'Elizabeth adopted the title Supreme Governor rather than Supreme Head to placate Catholics who saw the Pope as supreme spiritual authority and Protestants who held that only Jesus could be Head of the Church.',
        'The 1559 Prayer Book intentionally merged the 1549 and 1552 communion wordings, allowing Catholics to believe in Transubstantiation while Protestants interpreted it as a symbolic commemoration.',
        'The settlement successfully co-opted the majority of parish clergy, as fewer than 300 of the 9,000 priests refused the Oath of Supremacy in 1559.',
      ],
      examinerTip:
        'Level 4 Mark Scheme: Explain the delicate balancing act—explain why Elizabeth could not afford a hard-line Protestant Church (risk of Catholic rebellion in the North and Spanish invasion) or a Catholic Church (illegitimacy under Catholic canon law).',
    },
  },

  {
    topicId: 'eee_mary_queen_of_scots_plots',
    paperId: 'paper2_b4_early_elizabethan_england',
    paperType: 'paper2_depth',
    specCode: 'Option B4 • Key Topic 2',
    title: 'Mary, Queen of Scots & Catholic Plots (1569–1587)',
    subtitle:
      "Northern Earls, Ridolfi, Throckmorton, Babington, Walsingham's spy network, and Mary's execution",
    examMission:
      'Explain Multi-Factor Causation: Analyze why Catholic plots escalated—papal excommunication, Spanish foreign sponsorship, and Mary as a legitimate Catholic figurehead.',
    drivingQuestion:
      'Explain why Catholic plots against Elizabeth I increased between 1569 and 1586. [12 Marks]',
    pupilPromptCue:
      "Write about: The Papal Bull of Excommunication (1570), Spanish support for English Catholic plots, and Mary Queen of Scots' presence in England.",
    prompt:
      'Free recall practice: Retrieve the sequence of Catholic conspiracies against Elizabeth I: the Revolt of the Northern Earls (1569), the Ridolfi Plot (1571), the Throckmorton Plot (1583), the Babington Plot (1586), and the role of Sir Francis Walsingham.',
    specItemSyncPrefix: 'spec-paper2_b4_early_elizabethan_england-eee_kt2',
    relatedLesson: { unit: 'eee', index: 4 },
    scaffoldLadder: {
      step1_questions: [
        "Why did Mary Queen of Scots' arrival in England in 1568 create an immediate domestic and dynastic threat?",
        'How did Pope Pius V\'s 1570 Papal Bull "Regnans in Excelsis" legitimize plots to assassinate Elizabeth?',
        "How did Sir Francis Walsingham's intelligence network uncover the 1586 Babington Plot using cipher-breaking?",
      ],
      step2_wordbank: [
        '1568 (Mary arrives)',
        '1569 (Northern Earls)',
        '1570 (Papal Bull)',
        '1571 (Ridolfi Plot)',
        '1583 (Throckmorton Plot)',
        '1584 (Bond of Association)',
        '1586 (Babington Plot)',
        '1587 (Mary executed)',
        'Regnans in Excelsis',
        'Duke of Norfolk',
        'King Philip II of Spain',
        'Sir Francis Walsingham',
        'Thomas Phelippes (codebreaker)',
        'Gallows sign cipher',
        'Fotheringhay Castle',
      ],
      step3_starters: [
        'Catholic conspiracies against Elizabeth I escalated significantly after 1568 because the arrival of Mary, Queen of Scots provided...',
        'In 1570, Pope Pius V issued the Papal Bull Regnans in Excelsis, which directly threatened Elizabeth by...',
        'The threat reached a climax in 1586 with the Babington Plot, which was uncovered by Sir Francis Walsingham when his cipher-breaker...',
      ],
    },
    thematicClusters: [
      {
        name: 'The Dynastic Alternative: Mary, Queen of Scots (1568)',
        description:
          "Mary's arrival in Cumbria after fleeing Scottish Protestant lords, her strong claim as Henry VII's great-granddaughter, and English Catholic aspirations.",
        keywords: [
          'mary queen of scots',
          '1568',
          'dynastic',
          'catholic figurehead',
          'scotland',
          'legitimacy',
          'cumbria',
        ],
      },
      {
        name: 'The Revolt of the Northern Earls & Papal Bull (1569–70)',
        description:
          'Earls of Northumberland and Westmorland restoring Catholic Mass in Durham Cathedral; Pope Pius V excommunicating Elizabeth in Regnans in Excelsis.',
        keywords: [
          'northern earls',
          '1569',
          'northumberland',
          'westmorland',
          'durham cathedral',
          'papal bull',
          'regnans in excelsis',
          '1570',
          'excommunication',
        ],
      },
      {
        name: 'Foreign Intervention & Plots: Ridolfi & Throckmorton (1571 & 1583)',
        description:
          'Roberto Ridolfi using Spanish troops under Duke of Alba to put Norfolk and Mary on throne; Francis Throckmorton coordinating French Catholic invasion funded by Spain.',
        keywords: [
          'ridolfi',
          '1571',
          'norfolk',
          'alba',
          'throckmorton',
          '1583',
          'french invasion',
          'de mendoza',
          'spanish ambassador',
        ],
      },
      {
        name: "Walsingham's Spy Network & The Babington Plot (1586)",
        description:
          "Anthony Babington using beer barrels to smuggle letters; Walsingham intercepting and codebreaker Thomas Phelippes forging postscript; Mary's trial and execution.",
        keywords: [
          'babington',
          '1586',
          'walsingham',
          'phelippes',
          'cipher',
          'gallows',
          'beer barrels',
          'bond of association',
          'fotheringhay',
          '1587',
        ],
      },
    ],
    widerKnowledgeExamples:
      "Execution of Duke of Norfolk in 1572, William of Orange assassinated in Netherlands in 1584 shocking English Protestants, Bond of Association (1584) pledging to execute anyone in whose name an assassination attempt was made, Elizabeth hesitating for weeks before signing Mary's death warrant.",
    benchmark: {
      dates: [
        {
          date: '1568',
          label: 'Mary, Queen of Scots flees Scotland and lands in Workington, England',
        },
        {
          date: 'Nov 1569',
          label: 'Revolt of the Northern Earls: Northumberland and Westmorland march on Durham',
        },
        {
          date: 'Feb 1570',
          label: 'Pope Pius V issues Papal Bull Regnans in Excelsis excommunicating Elizabeth',
        },
        {
          date: '1571',
          label: 'Ridolfi Plot discovered; Duke of Norfolk executed for treason in 1572',
        },
        {
          date: '1583',
          label: 'Throckmorton Plot uncovered; Spanish Ambassador Bernardino de Mendoza expelled',
        },
        {
          date: '1586',
          label: "Babington Plot trapped by Walsingham; Mary's direct complicity proven",
        },
        { date: 'Feb 1587', label: 'Mary, Queen of Scots executed at Fotheringhay Castle' },
      ],
      vocab: [
        {
          term: 'Regnans in Excelsis',
          meaning:
            'Papal Bull of 1570 declaring Elizabeth a heretic and commanding English Catholics not to obey her laws',
        },
        {
          term: 'Sir Francis Walsingham',
          meaning:
            "Elizabeth's Principal Secretary and spymaster whose network of ciphers and agents uncovered Catholic plots",
        },
        {
          term: 'Bond of Association',
          meaning:
            "1584 pledge signed by thousands of English nobles vowing to execute anyone who plotted Elizabeth's death",
        },
        {
          term: 'Thomas Phelippes',
          meaning:
            "Walsingham's master cryptanalyst who deciphered Mary's letters and forged the gallows cipher mark",
        },
        {
          term: 'Duke of Norfolk',
          meaning:
            "England's premier peer who schemed to marry Mary Queen of Scots and seize the crown",
        },
        {
          term: 'Seminary Priests',
          meaning:
            'English Catholic priests trained at Douai in France and smuggled into England to sustain the Catholic faith',
        },
      ],
      mechanisms: [
        'The presence of Mary Queen of Scots provided English Catholics with a viable, legitimate royal figurehead, transforming vague religious disaffection into tangible treasonable plots.',
        'The 1570 Papal Bull placed English Catholics in an irreconcilable dilemma between religious obedience to the Pope and political loyalty to the Queen, legitimizing regicide as a holy act.',
        "Walsingham allowed the Babington conspiracy to develop until he possessed written proof of Mary endorsing Elizabeth's assassination, enabling the Privy Council to legally secure Mary's trial and execution.",
      ],
      examinerTip:
        'Distinction Factor: Emphasize how the nature of the Catholic threat shifted over time—from an internal aristocratic rebellion (Northern Earls 1569) to sophisticated international Catholic assassination conspiracies backed by Spain and the Papacy (Throckmorton & Babington).',
    },
  },

  {
    topicId: 'eee_exploration_voyages',
    paperId: 'paper2_b4_early_elizabethan_england',
    paperType: 'paper2_depth',
    specCode: 'Option B4 • Key Topic 3',
    title: 'Elizabethan Exploration & Colonisation (1577–1588)',
    subtitle:
      "Francis Drake's circumnavigation, privateering, trade rivalry, and Walter Raleigh's Roanoke colony",
    examMission:
      'Explain Multi-Factor Causation: Assess driving factors behind Elizabethan voyages—commercial trade with the East, religious rivalry with Catholic Spain, and national prestige.',
    drivingQuestion:
      'Explain why English voyages of exploration increased in the years 1577–1588. [12 Marks]',
    pupilPromptCue:
      "Write about: Francis Drake's circumnavigation (1577–80), trade rivalry with the Spanish Empire, and attempts to colonize Virginia (Roanoke).",
    prompt:
      "Free recall practice: Retrieve the motives and consequences of English exploration: Drake's circumnavigation in the Golden Hind, privateering against Spanish treasure ships, trade routes, and Raleigh's attempts to establish the Virginia colony.",
    specItemSyncPrefix: 'spec-paper2_b4_early_elizabethan_england-eee_kt3',
    relatedLesson: { unit: 'eee', index: 8 },
    scaffoldLadder: {
      step1_questions: [
        'How did navigational technology and ship design improvements facilitate long-distance oceanic voyages?',
        "How did Francis Drake's circumnavigation (1577–80) attack the Spanish trade monopoly and enrich the English Crown?",
        "Why did Sir Walter Raleigh's efforts to establish a permanent colony at Roanoke in 1585–87 fail?",
      ],
      step2_wordbank: [
        '1577–80 (Circumnavigation)',
        '1580 (Drake knighted)',
        '1584 (Raleigh patent)',
        '1585 (Roanoke)',
        'Golden Hind',
        'Cacafuego (Nuestra Señora)',
        'Sir Francis Drake',
        'Sir Walter Raleigh',
        'Privateering & Sea Dogs',
        'John Hawkins',
        'Astrolabe & Magnetic Compass',
        'Virginia colony',
        'Chief Wingina',
        'Ralph Lane',
        'Lost Colony of 1587',
      ],
      step3_starters: [
        'One primary factor driving the increase in English exploration was the lucrative financial reward of raiding the Spanish Main, exemplified by Francis Drake who...',
        'A second driving factor was the desire to break the Spanish and Portuguese trade monopolies by discovering new trading routes, leading merchants to...',
        'Additionally, English voyages were motivated by imperial ambition to establish permanent colonies in the New World, leading Sir Walter Raleigh to...',
      ],
    },
    thematicClusters: [
      {
        name: 'Privateering & Plundering the Spanish Main',
        description:
          'Drake capturing Spanish treasure galleon Cacafuego, returning with £400,000 in silver/gold, Elizabeth knighting him on the Golden Hind.',
        keywords: [
          'drake',
          'privateering',
          'sea dogs',
          'golden hind',
          'cacafuego',
          'silver',
          'plunder',
          'knighted',
          '1580',
          'treasure',
        ],
      },
      {
        name: 'Navigational Innovations & Shipbuilding',
        description:
          "John Hawkins' race-built galleons, astrolabes, cross-staffs, magnetic compasses, and Mercator projection maps.",
        keywords: [
          'navigation',
          'astrolabe',
          'compass',
          'hawkins',
          'race-built',
          'galleon',
          'charts',
          'mercator',
        ],
      },
      {
        name: 'New Commercial Markets & Trading Companies',
        description:
          'Search for the Northwest Passage to China and India; Muscovy Company, Levant Company, and East India Company foundations.',
        keywords: [
          'trade',
          'markets',
          'muscovy company',
          'levant company',
          'wool trade',
          'northwest passage',
          'frobisher',
        ],
      },
      {
        name: 'Raleigh & The Colonisation of Virginia (Roanoke)',
        description:
          'Walter Raleigh\'s patent, Ralph Lane\'s 1585 expedition, hostilities with Chief Wingina, starvation, and the "Lost Colony" of 1587.',
        keywords: [
          'raleigh',
          'roanoke',
          'virginia',
          '1585',
          '1587',
          'ralph lane',
          'wingina',
          'lost colony',
          'croatoan',
        ],
      },
    ],
    widerKnowledgeExamples:
      'Drake claiming Nova Albion (California) for Elizabeth in 1579, John White returning to Roanoke in 1590 to find the colony abandoned with the word "CROATOAN" carved into a post, Elizabeth investing £1,000 into Drake\'s voyage and receiving a 4,700% return on investment.',
    benchmark: {
      dates: [
        {
          date: '1577–80',
          label: 'Sir Francis Drake successfully circumnavigates the globe in the Golden Hind',
        },
        {
          date: 'April 1581',
          label: 'Elizabeth knights Drake on the deck of the Golden Hind at Deptford',
        },
        {
          date: '1584',
          label: 'Sir Walter Raleigh granted royal patent to explore and colonize North America',
        },
        { date: '1585', label: 'First English colony established at Roanoke Island by Ralph Lane' },
        {
          date: '1587',
          label: 'Second Roanoke expedition led by John White; colonists disappear by 1590',
        },
      ],
      vocab: [
        {
          term: 'Circumnavigation',
          meaning:
            'Sailing completely around the world, achieved by Drake as the first Englishman (1577–80)',
        },
        {
          term: 'Privateering',
          meaning:
            'State-licensed piracy authorizing armed English "Sea Dogs" to capture enemy Spanish merchant ships',
        },
        {
          term: 'Golden Hind',
          meaning:
            "Drake's 100-ton flagship, originally named the Pelican, that carried £400,000 in plundered treasure",
        },
        {
          term: 'Roanoke',
          meaning:
            "Island off modern North Carolina selected by Raleigh as England's first American colonial settlement",
        },
        {
          term: 'Astrolabe',
          meaning:
            'Navigational instrument measuring the altitude of the sun and stars to calculate ship latitude',
        },
        {
          term: 'Virginia',
          meaning:
            'Territory in North America named by Walter Raleigh in honor of Elizabeth, the "Virgin Queen"',
        },
      ],
      mechanisms: [
        "The prospect of astronomical commercial profit motivated both court aristocrats and Queen Elizabeth to secretly finance privateering expeditions, directly attacking Philip II's silver pipeline.",
        'Collapse of the traditional English cloth market in Antwerp (due to the Dutch Revolt) compelled English merchants to finance long-distance expeditions to discover alternative markets in Asia and the Americas.',
        "Raleigh's colonisation attempts at Roanoke failed because the settlers arrived too late in the season to plant crops, lacked farming skills, and antagonized the local Secotan tribe under Chief Wingina.",
      ],
      examinerTip:
        'Examiner Advice: For a 12-mark question, distinguish between economic push factors (collapse of the Antwerp cloth trade) and pull factors (enormous wealth from Spanish silver and national glory).',
    },
  },

  {
    topicId: 'eee_spanish_armada',
    paperId: 'paper2_b4_early_elizabethan_england',
    paperType: 'paper2_depth',
    specCode: 'Option B4 • Key Topic 3',
    title: 'The Spanish Armada: Execution of Mary & Battle of Gravelines (1588)',
    subtitle:
      "Philip II's Enterprise of England, Medina Sidonia, fire ships, culverins, and the Protestant Wind",
    examMission:
      'Explain multi-factor historical defeat: tactical English leadership (Drake/Howard), fire ships at Calais, superior long-range naval gunnery (culverins), and severe Atlantic weather.',
    drivingQuestion: 'Explain why the Spanish Armada was defeated in 1588.',
    pupilPromptCue:
      "Write about: Philip II's motives (Mary's execution 1587 & Drake's raid on Cadiz), fire ships at Calais, long-range culverins at Gravelines, and the Protestant Wind.",
    prompt:
      "Free recall practice: Retrieve the defeat of the Spanish Armada (1588): Philip II's Enterprise of England, Drake's raid on Cadiz (1587), the battle at Gravelines, fire ships, and navigational disaster.",
    specItemSyncPrefix: 'spec-paper2_b4_early_elizabethan_england-eee_armada',
    relatedLesson: { unit: 'eee', index: 9 },
    scaffoldLadder: {
      step1_questions: [
        'Why did King Philip II launch the Armada against England in 1588?',
        'How did English naval tactics (fire ships at Calais & culverin gunnery) disrupt the Spanish plan?',
        'What logistical failures and weather conditions sealed the destruction of the Spanish fleet?',
      ],
      step2_wordbank: [
        '1587 (Cadiz raid & Mary executed)',
        'July 1588 (Armada sighted)',
        'August 1588 (Gravelines)',
        'Philip II',
        'Duke of Medina Sidonia',
        'Duke of Parma',
        'Lord Howard of Effingham',
        'Sir Francis Drake',
        'Crescent formation',
        'Calais fire ships',
        'Battle of Gravelines',
        'Culverins (rapid reloading)',
        'Protestant Wind (Scottish/Irish coasts)',
      ],
      step3_starters: [
        'Philip II launched the Enterprise of England in 1588 due to religious conflict, English privateering, and...',
        'The turning point of the campaign occurred at Calais on 7 August 1588 when the English sent fire ships into the Spanish anchorage, which...',
        'At the Battle of Gravelines, English naval gunnery decisively overpowered the Spanish because...',
      ],
    },
    thematicClusters: [
      {
        name: 'Causes of the Armada (1585–88)',
        description:
          "Treaty of Nonsuch (1585), Drake's privateering, execution of Catholic Mary Queen of Scots (1587), and Drake's raid on Cadiz (\"singeing the King of Spain's beard\").",
        keywords: [
          'treaty of nonsuch',
          'mary executed',
          'cadiz',
          'singeing beard',
          'philip ii',
          'catholic crusade',
          '1587',
          'barrels',
        ],
      },
      {
        name: 'The Armada Campaign & Spanish Tactics',
        description:
          "130 ships sailing in crescent formation, Medina Sidonia's mission to rendezvous with Duke of Parma's 30,000 invasion veterans at Dunkirk.",
        keywords: [
          'medina sidonia',
          'parma',
          'crescent',
          'dunkirk',
          'invasion',
          'barges',
          '130 ships',
          'rendezvous',
        ],
      },
      {
        name: 'English Tactical Superiority & Fire Ships (Calais & Gravelines)',
        description:
          '8 unmanned fire ships at midnight scattering Spanish anchors at Calais; long-range culverin cannonade at Battle of Gravelines.',
        keywords: [
          'fire ships',
          'calais',
          'gravelines',
          'culverins',
          'drake',
          'howard',
          'cannons',
          'truck carriages',
          'anchors',
        ],
      },
      {
        name: 'Logistical Collapse & The Protestant Wind',
        description:
          'Lack of communication with Parma, rotting food barrels from Cadiz raid, fleeing north around Scotland and Ireland, Atlantic gales wrecking ships.',
        keywords: [
          'protestant wind',
          'scotland',
          'ireland',
          'gales',
          'shipwrecks',
          'hunger',
          'disease',
          'half returned',
        ],
      },
    ],
    widerKnowledgeExamples:
      'Elizabeth I\'s famous Speech to the Troops at Tilbury ("I know I have the body of a weak and feeble woman, but I have the heart and stomach of a king"), commemorative Armada medal struck ("God blew and they were scattered"), over 20,000 Spanish sailors dying of wounds, shipwreck, and starvation.',
    benchmark: {
      dates: [
        {
          date: 'Feb 1587',
          label: 'Mary, Queen of Scots executed; Philip II secures Papal blessing for invasion',
        },
        {
          date: 'April 1587',
          label: "Drake's raid on Cadiz destroys 30 Spanish ships, delaying Armada by one year",
        },
        { date: 'July 1588', label: 'Spanish Armada sighted off the Lizard in Cornwall' },
        {
          date: '7–8 Aug 1588',
          label: 'English launch fire ships at Calais; Battle of Gravelines fought',
        },
        {
          date: 'Autumn 1588',
          label:
            'Armada battered by gales around Scotland and Ireland; only 67 ships return to Spain',
        },
      ],
      vocab: [
        {
          term: 'Duke of Medina Sidonia',
          meaning: 'Spanish commander of the Armada with little naval combat experience',
        },
        {
          term: 'Duke of Parma',
          meaning: 'Spanish commander in Netherlands waiting with 30,000 invasion troops in barges',
        },
        {
          term: 'Lord Howard of Effingham',
          meaning: 'English Lord High Admiral; commanded alongside Sir Francis Drake',
        },
        {
          term: 'Fire Ships',
          meaning:
            'Eight unmanned English vessels set ablaze and floated into Spanish fleet anchored at Calais',
        },
        {
          term: 'Battle of Gravelines',
          meaning:
            'Decisive naval engagement where English long-range culverins pounded disorganized Spanish ships',
        },
        {
          term: 'Culverins',
          meaning: 'Fast-loading, long-range English naval cannons mounted on truck carriages',
        },
        {
          term: 'Protestant Wind',
          meaning:
            'Severe Atlantic gales driving the retreating Spanish fleet around the jagged coasts of Scotland and Ireland',
        },
      ],
      mechanisms: [
        "Medina Sidonia could not communicate effectively with Parma's army because Parma had no deep-water port in the Netherlands and was blockaded by Dutch flyboats.",
        'The deployment of 8 English fire ships at midnight scattered the Spanish fleet, forcing captains to cut their anchor cables and ruining their defensive crescent formation.',
        'English shipwright John Hawkins had designed sleeker, faster galleons with cannons on truck carriages that could be reloaded in minutes, while Spanish guns could only fire once or twice.',
      ],
      examinerTip:
        "Level 4 Explanation: Defeat was caused by a combination of English naval advantages (fire ships, culverins, Hawkins' galleons), Spanish logistical failure (lack of deep-water port for Parma, rotting food barrels from Cadiz raid), and adverse weather.",
    },
  },

  // ==========================================================================
  // PAPER 2: PERIOD STUDY (P5: Conflict in the Middle East, 1945–95)
  // Strictly Authentic Edexcel Formats: Analytical Narratives [8m], Consequences [8m]
  // ==========================================================================
  {
    topicId: 'cme_birth_of_israel_1948',
    paperId: 'paper2_p5_middle_east',
    paperType: 'paper2_period',
    specCode: 'Option P5 • Topic 1',
    title: 'The Birth of Israel & the 1948–49 War',
    subtitle: 'UN Partition Plan 1947, British withdrawal, 1948 Arab-Israeli War, and the Nakba',
    examMission:
      'Construct a 3-Stage Analytical Narrative Chain: Trigger (UN Res 181 & British exit) ➔ Escalation (Statehood declaration & 5-nation Arab invasion) ➔ Consequence (Israeli military triumph, Green Line, and Nakba).',
    drivingQuestion:
      'Write an analytical narrative explaining the events leading to the creation of Israel and the outbreak of war, 1947–49. [8 Marks]',
    pupilPromptCue:
      'Write a 3-link analytical chain: (1) UN Partition Plan (Resolution 181) & British withdrawal, (2) Declaration of Statehood and Arab invasion, and (3) Israeli victory, 1949 Armistice agreements, and the Nakba.',
    prompt:
      'Free recall practice: Retrieve the events leading to the creation of the State of Israel (1947–48), the outbreak of the First Arab-Israeli War, Israeli victory factors, and the Palestinian refugee crisis (Nakba).',
    specItemSyncPrefix: 'spec-paper2_p5_middle_east-cme_topic1',
    relatedLesson: { unit: 'cme_new', index: 1 },
    scaffoldLadder: {
      step1_questions: [
        'Link 1: Why did Britain surrender its mandate to the UN, and what partition borders did UN Resolution 181 recommend in November 1947?',
        'Link 2: What happened on 14–15 May 1948 when David Ben-Gurion declared the State of Israel?',
        'Link 3: Why was the newly formed IDF able to defeat five Arab armies, and what was the consequence for Palestinian refugees (the Nakba)?',
      ],
      step2_wordbank: [
        'Nov 1947 (UN Res 181)',
        '14 May 1948 (State of Israel)',
        '15 May 1948 (Arab invasion)',
        '1949 (Armistice)',
        'David Ben-Gurion',
        'Haganah / IDF',
        'King David Hotel (1946)',
        'Exodus 1947',
        'Nakba (Catastrophe)',
        '700,000 Palestinian refugees',
        'Czech arms shipments',
        'Green Line armistice',
      ],
      step3_starters: [
        'In November 1947, the United Nations passed Resolution 181 to partition Palestine into separate Jewish and Arab states, which caused immediate tension because...',
        'Following the British withdrawal, David Ben-Gurion declared the State of Israel on 14 May 1948, prompting five neighbouring Arab states to invade because...',
        'Israel secured victory in 1949 due to superior military coordination and weapons from Czechoslovakia, resulting in the Green Line armistice and the Nakba, where over 700,000 Palestinians...',
      ],
    },
    thematicClusters: [
      {
        name: 'Link 1: British Collapse & UN Partition (1947)',
        description:
          'Exhausted post-war Britain facing Zionist insurgency (Irgun bombing King David Hotel 1946); handing Palestine to UN; UN Resolution 181 granting 56% to Jews; Arab rejection.',
        keywords: [
          'un resolution 181',
          'partition',
          'king david hotel',
          'irgun',
          'haganah',
          '1947',
          'british withdrawal',
          '56%',
        ],
      },
      {
        name: 'Link 2: Declaration of Statehood & 5-Nation Invasion (May 1948)',
        description:
          'Ben-Gurion declaring Israeli independence; armies of Egypt, Jordan, Syria, Iraq, and Lebanon invading; initial desperate fighting.',
        keywords: [
          'ben-gurion',
          '14 may 1948',
          'arab invasion',
          'egypt',
          'jordan',
          'syria',
          'iraq',
          'lebanon',
          'statehood',
        ],
      },
      {
        name: 'Link 3: Israeli Victory, Green Line & The Nakba (1948–49)',
        description:
          'IDF unified command, Czech arms shipments, Arab division; 1949 armistice lines (Green Line) giving Israel 79% of territory; 700,000+ Palestinian refugees displaced (Nakba).',
        keywords: [
          'nakba',
          'refugees',
          'czech arms',
          'green line',
          'armistice',
          '1949',
          'west bank',
          'gaza',
          'catastrophe',
        ],
      },
    ],
    widerKnowledgeExamples:
      'The Exodus 1947 refugee ship turned back by Britain gaining global Jewish sympathy, Count Folke Bernadotte assassinated by Lehi, Arab Legion under Glubb Pasha holding East Jerusalem and the West Bank.',
    benchmark: {
      dates: [
        {
          date: 'Nov 1947',
          label:
            'UN General Assembly adopts Resolution 181 to partition Palestine into Jewish and Arab states',
        },
        {
          date: '14 May 1948',
          label: 'British Mandate terminates; David Ben-Gurion proclaims the State of Israel',
        },
        {
          date: '15 May 1948',
          label: 'Forces from Egypt, Transjordan, Syria, Lebanon, and Iraq invade Israel',
        },
        { date: '1949', label: 'Armistice agreements signed establishing the Green Line borders' },
      ],
      vocab: [
        {
          term: 'UN Resolution 181',
          meaning:
            'UN partition plan allocating 56% of mandatory Palestine to a Jewish state and 43% to an Arab state',
        },
        {
          term: 'David Ben-Gurion',
          meaning:
            'First Prime Minister of Israel who read the Declaration of Independence in Tel Aviv',
        },
        {
          term: 'Haganah / IDF',
          meaning:
            'Zionist paramilitary force reorganized on 26 May 1948 into the official Israel Defense Forces',
        },
        {
          term: 'Nakba',
          meaning:
            'Arabic term meaning "Catastrophe", referring to the permanent displacement and flight of over 700,000 Palestinian Arabs',
        },
        {
          term: 'Green Line',
          meaning:
            "1949 armistice demarcation lines setting Israel's de facto borders until the 1967 Six-Day War",
        },
        {
          term: 'Czech Arms Deal',
          meaning:
            'Clandestine delivery of thousands of rifles, machine guns, and Avia fighter planes breaking the arms embargo',
        },
      ],
      mechanisms: [
        'The exhaustion of post-war Britain and deadly guerrilla attacks by Irgun and Lehi forced London to surrender the Mandate to the UN without executing an orderly transition plan.',
        'Although outnumbered on paper, the IDF mobilized over 100,000 troops under unified national command, whereas the five Arab armies had conflicting territorial ambitions and zero coordinated strategy.',
        'The war resulted in permanent territorial and demographic realities: Israel expanded to control 79% of Palestine, Jordan annexed the West Bank, Egypt controlled Gaza, and 700,000 Palestinian refugees were barred from returning.',
      ],
      examinerTip:
        'Edexcel Period Study Standard: Ensure analytical narrative links flow sequentially—show how UN 181 provoked civil conflict, leading directly to the declaration of statehood and Arab invasion, which triggered Israeli military mobilization and the 1949 armistice agreements.',
    },
  },

  {
    topicId: 'cme_suez_crisis_1956',
    paperId: 'paper2_p5_middle_east',
    paperType: 'paper2_period',
    specCode: 'Option P5 • Topic 1',
    title: 'The Suez Crisis (1956)',
    subtitle:
      'Nasser nationalises the Canal, the Sèvres collusion, Anglo-French invasion, and Cold War intervention',
    examMission:
      "Explain Two Direct Consequences: Identify distinct outcomes (Anglo-French imperial humiliation vs Nasser's emergence as hero of Pan-Arab nationalism and UNEF deployment).",
    drivingQuestion: 'Explain two consequences of the Suez Crisis (1956). [8 Marks]',
    pupilPromptCue:
      'Explain two distinct consequences: (1) The humiliation of Britain and France as global imperial powers, and (2) The rise of President Nasser as champion of Pan-Arabism and deployment of UNEF peacekeepers.',
    prompt:
      'Free recall practice: Retrieve the causes, events, and international consequences of the 1956 Suez Crisis, including the nationalisation of the canal, Protocol of Sèvres, and US superpower intervention.',
    specItemSyncPrefix: 'spec-paper2_p5_middle_east-cme_topic1',
    relatedLesson: { unit: 'cme_new', index: 2 },
    scaffoldLadder: {
      step1_questions: [
        'Why did President Gamal Abdel Nasser nationalise the Suez Canal Company in July 1956?',
        'What secret tripartite collusion was agreed between Britain, France, and Israel at the Protocol of Sèvres?',
        'Why did US President Eisenhower compel Britain and France to withdraw, and what was the lasting effect on international prestige?',
      ],
      step2_wordbank: [
        'July 1956 (Canal nationalised)',
        '24 Oct 1956 (Sèvres collusion)',
        '29 Oct 1956 (Sinai invaded)',
        'Nov 1956 (Anglo-French landings)',
        'Gamal Abdel Nasser',
        'Anthony Eden',
        'Protocol of Sèvres',
        'Aswan High Dam',
        'Dwight D. Eisenhower',
        'UNEF peacekeepers',
        'Pan-Arabism',
        'Sterling run & oil cutoff',
      ],
      step3_starters: [
        'One significant consequence of the 1956 Suez Crisis was the profound geopolitical humiliation of Britain and France, because...',
        'A second major consequence was the enormous prestige gained by President Nasser across the Arab world, because...',
      ],
    },
    thematicClusters: [
      {
        name: 'Consequence 1: End of Anglo-French Imperial Hegemony',
        description:
          'US President Eisenhower threatening to crash the British pound; UN ceasefire; Eden resigning in disgrace; proved European powers could no longer act independently of superpowers.',
        keywords: [
          'britain',
          'france',
          'eden',
          'eisenhower',
          'sterling',
          'superpowers',
          'humiliation',
          'imperial',
          'resignation',
        ],
      },
      {
        name: "Consequence 2: Nasser's Hero Status & Pan-Arabism",
        description:
          'Nasser kept the canal; hailed across the Middle East as the defiant leader who defeated Western imperialism; closer military and financial ties with the USSR.',
        keywords: [
          'nasser',
          'prestige',
          'pan-arabism',
          'hero',
          'soviet union',
          'aswan dam',
          'unef',
          'sinai',
          'straits of tiran',
        ],
      },
    ],
    widerKnowledgeExamples:
      'US refusal to provide emergency oil to Britain unless troops evacuated, Soviet Premier Bulganin threatening rocket attacks on London and Paris, Lester B. Pearson proposing the first UN Emergency Force (UNEF).',
    benchmark: {
      dates: [
        {
          date: '26 July 1956',
          label:
            'President Nasser announces nationalisation of the Suez Canal Company in Alexandria',
        },
        {
          date: '24 Oct 1956',
          label: 'Britain, France, and Israel sign secret Protocol of Sèvres',
        },
        { date: '29 Oct 1956', label: 'Israel launches invasion of Egyptian Sinai' },
        {
          date: '5–6 Nov 1956',
          label: 'Anglo-French paratroopers land at Port Said (Operation Musketeer)',
        },
        {
          date: 'Dec 1956',
          label: 'British and French forces withdraw under intense US financial pressure',
        },
      ],
      vocab: [
        {
          term: 'Gamal Abdel Nasser',
          meaning:
            'Egyptian President and charismatic champion of Pan-Arab nationalism who nationalised the canal',
        },
        {
          term: 'Protocol of Sèvres',
          meaning:
            'Secret collusion treaty where Israel agreed to attack Sinai, providing a pretext for British and French intervention',
        },
        {
          term: 'Anthony Eden',
          meaning:
            'British Prime Minister whose military gamble failed and led to his resignation in January 1957',
        },
        {
          term: 'UNEF',
          meaning:
            'United Nations Emergency Force deployed in Sinai to police the armistice and guarantee Israeli shipping',
        },
        {
          term: 'Pan-Arabism',
          meaning:
            'Political movement seeking the political and economic unity of all Arab nations against Western dominance',
        },
        {
          term: 'Aswan High Dam',
          meaning:
            'Massive hydro-electric irrigation project; US cancellation of funding triggered the canal nationalisation',
        },
      ],
      mechanisms: [
        'The crisis demonstrated that European imperial powers (Britain and France) could no longer conduct independent military action on the world stage without the explicit consent of the United States.',
        'Although defeated militarily in the Sinai by the IDF, Nasser won a total political and psychological victory, keeping the canal and establishing Egypt as the undisputed leader of Arab nationalism.',
        'The deployment of UNEF peacekeepers in the Sinai Peninsula and along the Straits of Tiran provided Israel with ten years of maritime access to the Red Sea until 1967.',
      ],
      examinerTip:
        'Consequence Architecture: In 8-mark "Explain two consequences" questions, clearly separate your answer into two distinct paragraphs, each stating the consequence, explaining the historical mechanism, and detailing the lasting impact.',
    },
  },

  {
    topicId: 'cme_six_day_1967',
    paperId: 'paper2_p5_middle_east',
    paperType: 'paper2_period',
    specCode: 'Option P5 • Topic 2',
    title: 'The Six-Day War & Territorial Transformation (1967)',
    subtitle:
      "Nasser's provocations, Operation Focus airstrike, three front blitzkrieg, and UN Resolution 242",
    examMission:
      'Construct a 3-Stage Analytical Narrative Chain: Trigger (Tiran/Nasser) ➔ Escalation (Operation Focus) ➔ Consequence (Territorial Occupation & UN 242).',
    drivingQuestion:
      'Write an analytical narrative explaining the outbreak and consequences of the Six-Day War in June 1967. [8 Marks]',
    pupilPromptCue:
      'Write a 3-link analytical chain: (1) Nasser closing the Straits of Tiran, (2) Operation Focus airstrike, and (3) Territorial occupation (Sinai, West Bank, Golan) & UN Resolution 242.',
    prompt:
      'Free recall practice: Retrieve the escalating causes of the 1967 crisis, the pre-emptive Israeli air strike (Operation Focus), territorial gains, and UN Resolution 242.',
    specItemSyncPrefix: 'spec-paper2_p5_middle_east-cme_topic2',
    relatedLesson: { unit: 'cme_new', index: 3 },
    scaffoldLadder: {
      step1_questions: [
        'Link 1 (The Trigger): What military and diplomatic actions by President Nasser in May 1967 escalated tensions?',
        "Link 2 (The Escalation): How did Israel's Operation Focus achieve complete air superiority on the morning of 5 June 1967?",
        'Link 3 (The Consequence): What three territories did Israel capture, and what did UN Resolution 242 establish?',
      ],
      step2_wordbank: [
        'May 1967 (Tiran closed)',
        '5 June 1967 (Operation Focus)',
        '10 June 1967 (Ceasefire)',
        'Nov 1967 (UN Res 242)',
        'Gamal Abdel Nasser',
        'Straits of Tiran',
        'UNEF peacekeepers expelled',
        'Operation Focus',
        'Sinai Peninsula',
        'West Bank & Old Jerusalem',
        'Golan Heights',
        'Land for Peace formula',
      ],
      step3_starters: [
        'Tensions escalated into war in May 1967 when Egyptian President Nasser demanded the withdrawal of UNEF peacekeepers and closed...',
        'Israel launched a pre-emptive strike known as Operation Focus on 5 June 1967, which succeeded because...',
        'The war radically transformed the geopolitical landscape of the Middle East as Israel occupied Sinai, the West Bank, and the Golan Heights, leading the UN to pass Resolution 242 which...',
      ],
    },
    thematicClusters: [
      {
        name: 'Link 1: The Escalating Crisis (May 1967)',
        description:
          'Nasser massing Egyptian troops in Sinai, expelling UN peacekeepers (UNEF), and closing the Straits of Tiran to Israeli shipping.',
        keywords: [
          'nasser',
          'tiran',
          'straits',
          'unef',
          'blockade',
          'may 1967',
          'sharm el-sheikh',
          'sinai',
          'provocation',
        ],
      },
      {
        name: 'Link 2: Operation Focus & The 3-Front Campaign',
        description:
          "Israel's pre-emptive airstrike destroying Egyptian, Syrian, and Jordanian air forces on the tarmac in 3 hours.",
        keywords: [
          'operation focus',
          'air force',
          'pre-emptive',
          'surprise',
          'runways',
          'air supremacy',
          'june 5',
          'radar',
          'blitzkrieg',
        ],
      },
      {
        name: 'Link 3: Territorial Occupation & UN Resolution 242',
        description:
          'Capture of Sinai, Gaza Strip, West Bank, East Jerusalem, Golan Heights; UN Res 242 "Land for Peace" principle.',
        keywords: [
          'golan',
          'west bank',
          'sinai',
          'jerusalem',
          'un resolution 242',
          '242',
          'land for peace',
          'occupation',
          'refugees',
        ],
      },
    ],
    widerKnowledgeExamples:
      'Soviet false intelligence report claiming Israeli mobilization against Syria, Moshe Dayan appointed Israeli Defence Minister, David Elazar taking the Golan Heights, Khartoum Resolution "Three Noes" (No peace, no recognition, no negotiations).',
    benchmark: {
      dates: [
        {
          date: 'May 1967',
          label:
            'Nasser closes Straits of Tiran to Israeli shipping and expels UNEF peacekeepers from Sinai',
        },
        {
          date: '5 June 1967',
          label:
            'Israel launches pre-emptive airstrikes (Operation Focus), destroying Arab air forces on tarmac',
        },
        {
          date: '10 June 1967',
          label:
            'Ceasefire takes effect; Six-Day War ends with decisive Israeli victory on three fronts',
        },
        {
          date: 'Nov 1967',
          label: 'UN Security Council unanimously adopts Resolution 242 ("Land for Peace" formula)',
        },
      ],
      vocab: [
        {
          term: 'Gamal Abdel Nasser',
          meaning:
            'President of Egypt whose bellicose rhetoric and blockade provoked the Israeli pre-emptive strike',
        },
        {
          term: 'Straits of Tiran',
          meaning:
            'Vital Israeli maritime shipping lane into the Gulf of Aqaba closed by Egypt, viewed by Israel as a casus belli',
        },
        {
          term: 'Operation Focus',
          meaning:
            'Devastating pre-emptive airstrike destroying over 400 Arab combat aircraft in initial hours',
        },
        {
          term: 'Sinai Peninsula & Gaza',
          meaning:
            'Massive Egyptian desert territory and coastal strip captured by IDF armored columns',
        },
        {
          term: 'West Bank & East Jerusalem',
          meaning:
            'Jordanian-administered biblical territory and holy sites captured by Israeli paratroopers',
        },
        {
          term: 'Golan Heights',
          meaning:
            'Strategic Syrian mountainous plateau overlooking northern Israeli settlements seized in final days',
        },
        {
          term: 'UN Resolution 242',
          meaning:
            'Framework requiring withdrawal of Israeli armed forces from territories occupied in exchange for peace',
        },
      ],
      mechanisms: [
        'By destroying Egyptian air forces on the ground in the first 3 hours, the Israeli Air Force secured total air supremacy, allowing armored columns to advance across Sinai with zero air opposition.',
        'Capturing the West Bank and East Jerusalem fulfilled religious Zionist aspirations, but brought over one million Palestinian Arabs under direct Israeli military administration.',
        'UN Resolution 242 established the "Land for Peace" formula that underpinned all subsequent Arab-Israeli diplomatic negotiations (including the 1978 Camp David Accords).',
      ],
      examinerTip:
        'Examiner Requirement: In Edexcel Question 2 (Analytical Narrative), you must show explicit linkage between paragraphs: show how the closure of Tiran led directly to Operation Focus, and how Operation Focus led to territorial occupation and UN 242.',
    },
  },

  {
    topicId: 'cme_yom_kippur_1973',
    paperId: 'paper2_p5_middle_east',
    paperType: 'paper2_period',
    specCode: 'Option P5 • Topic 2',
    title: 'The Yom Kippur War (October 1973)',
    subtitle:
      "Sadat's surprise assault, Operation Badr, Bar Lev line breach, superpower resupply, and OPEC oil embargo",
    examMission:
      'Explain Two Direct Consequences: Identify distinct outcomes (restoration of Arab self-respect shattering Israeli invincibility vs OPEC oil weapon driving US shuttle diplomacy).',
    drivingQuestion: 'Explain two consequences of the Yom Kippur War (October 1973). [8 Marks]',
    pupilPromptCue:
      'Explain two distinct consequences: (1) The psychological restoration of Egyptian pride shattering the myth of Israeli invincibility, and (2) The deployment of the OPEC oil weapon forcing US shuttle diplomacy.',
    prompt:
      "Free recall practice: Retrieve the strategic aims of Anwar Sadat, the surprise assault across the Suez, the superpowers' intervention, and the OPEC oil embargo.",
    specItemSyncPrefix: 'spec-paper2_p5_middle_east-cme_topic2',
    relatedLesson: { unit: 'cme_new', index: 4 },
    scaffoldLadder: {
      step1_questions: [
        'Why did Egypt (Sadat) and Syria launch their coordinated surprise attack on 6 October 1973 (Yom Kippur)?',
        'How did Egyptian forces breach the fortified Israeli Bar Lev Line in Operation Badr?',
        'How did the Arab oil embargo (OPEC) transform international geopolitics and compel US shuttle diplomacy?',
      ],
      step2_wordbank: [
        '6 Oct 1973 (Yom Kippur attack)',
        '14 Oct (Sinai tank battle)',
        '16 Oct (Sharon crosses Suez)',
        '17 Oct (OPEC embargo)',
        'Anwar Sadat',
        'Operation Badr',
        'Bar Lev Line',
        'SAM-6 anti-aircraft missiles',
        'Golda Meir',
        'Ariel Sharon',
        'OPEC oil embargo',
        'Henry Kissinger',
        'Shuttle diplomacy',
        'UN Resolution 338',
      ],
      step3_starters: [
        'One profound consequence of the 1973 Yom Kippur War was the shattering of the Israeli myth of military invincibility, because...',
        'A second critical consequence was the deployment of the Arab oil weapon through OPEC, which transformed international diplomacy by...',
      ],
    },
    thematicClusters: [
      {
        name: 'Consequence 1: Psychological Transformation & Arab Dignity',
        description:
          "Operation Badr proved Arab armies could execute sophisticated modern assault; destroyed Israeli complacency; led to Agranat Commission and Golda Meir's resignation.",
        keywords: [
          'sadat',
          'pride',
          'dignity',
          'invincibility',
          'bar lev',
          'operation badr',
          'meir',
          'agranat',
          'complacency',
        ],
      },
      {
        name: 'Consequence 2: OPEC Oil Weapon & US Shuttle Diplomacy',
        description:
          'OPEC quadrupled oil prices and placed embargo on US/Netherlands; severe Western fuel rationing; forced Henry Kissinger into active mediation.',
        keywords: [
          'opec',
          'oil embargo',
          'kissinger',
          'shuttle diplomacy',
          'gasoline',
          'prices',
          'quadrupled',
          'un resolution 338',
        ],
      },
    ],
    widerKnowledgeExamples:
      'Egyptian water cannons used to blast gaps in the Bar Lev sand wall, US Operation Nickel Grass airlifting 22,000 tons of tanks/munitions to Israel, Soviet airlift to Egypt and Syria, Sharon encircling the Egyptian Third Army.',
    benchmark: {
      dates: [
        {
          date: '6 Oct 1973',
          label: 'Egypt and Syria launch simultaneous surprise attack on Yom Kippur / Ramadan',
        },
        {
          date: '14 Oct 1973',
          label: 'Massive tank clash in Sinai; Egyptian armored advance halted',
        },
        {
          date: '16 Oct 1973',
          label: 'IDF forces under Sharon cross Suez Canal onto the Egyptian mainland',
        },
        {
          date: '17 Oct 1973',
          label: 'OPEC oil ministers announce oil production cuts and embargo on Israeli allies',
        },
        {
          date: '25 Oct 1973',
          label: 'Ceasefire takes effect under UN Security Council Resolution 338',
        },
      ],
      vocab: [
        {
          term: 'Anwar Sadat',
          meaning:
            'President of Egypt who launched the war to break diplomatic stalemate and force negotiations',
        },
        {
          term: 'Bar Lev Line',
          meaning:
            'Massive $300m Israeli defensive sand wall and bunker fortification along east bank of Suez Canal',
        },
        {
          term: 'Operation Badr',
          meaning:
            'Precision Egyptian amphibious crossing of the Suez Canal using high-pressure water cannons',
        },
        {
          term: 'SAM-6 Missiles',
          meaning:
            'Soviet-supplied mobile surface-to-air missile batteries that neutralized Israeli air supremacy',
        },
        {
          term: 'OPEC Oil Embargo',
          meaning:
            'Economic weapon deployed by Arab oil exporters quadrupling petroleum prices to pressure Western nations',
        },
        {
          term: 'Henry Kissinger',
          meaning:
            'US Secretary of State who pioneered "shuttle diplomacy" flying between Middle Eastern capitals',
        },
      ],
      mechanisms: [
        'Sadat never aimed to conquer all of Israel; his strategy was to seize a bridgehead in Sinai, withstand the IDF counter-attack, and force superpower intervention to break the diplomatic stalemate.',
        'The failure of Israeli military intelligence to predict the surprise assault shattered public trust in the Labor establishment, forcing the resignation of Prime Minister Golda Meir and Defence Minister Moshe Dayan.',
        'The quadruple rise in world oil prices proved that Arab states possessed decisive economic leverage over the West, compelling Washington to prioritize Middle East peace negotiations.',
      ],
      examinerTip:
        'Examiner Advice: Focus on consequences, not just a narrative of military battles. Explain how the restoration of Arab pride was the psychological prerequisite that made the 1977 Jerusalem visit and 1978 Camp David Accords possible.',
    },
  },

  {
    topicId: 'cme_camp_david_1978_79',
    paperId: 'paper2_p5_middle_east',
    paperType: 'paper2_period',
    specCode: 'Option P5 • Topic 3',
    title: 'The Camp David Accords & 1979 Peace Treaty',
    subtitle:
      "Sadat's Jerusalem initiative, Jimmy Carter's mediation, Begin, and the land-for-peace treaty",
    examMission:
      "Explain Two Direct Consequences: Recovery of sovereign Sinai territory in exchange for mutual recognition vs severe Arab League boycott and Sadat's assassination.",
    drivingQuestion: 'Explain two consequences of the Egypt-Israel Peace Treaty of 1979. [8 Marks]',
    pupilPromptCue:
      "Explain two distinct consequences: (1) The return of the Sinai Peninsula to Egypt in exchange for full diplomatic recognition, and (2) The total diplomatic isolation of Egypt from the Arab world leading to Sadat's assassination.",
    prompt:
      "Free recall practice: Retrieve Sadat's historic 1977 visit to Jerusalem, the 1978 Camp David negotiations mediated by Jimmy Carter, the 1979 Washington Peace Treaty terms, and the Arab reaction.",
    specItemSyncPrefix: 'spec-paper2_p5_middle_east-cme_topic3',
    relatedLesson: { unit: 'cme_new', index: 5 },
    scaffoldLadder: {
      step1_questions: [
        'Why did Anwar Sadat take the unprecedented step of flying to Jerusalem to address the Israeli Knesset in November 1977?',
        'How did US President Jimmy Carter broker the September 1978 Camp David Accords between Menachem Begin and Anwar Sadat?',
        "What were the consequences of the 1979 Washington Peace Treaty for Egypt's standing among Arab nations?",
      ],
      step2_wordbank: [
        'Nov 1977 (Jerusalem visit)',
        'Sept 1978 (Camp David Accords)',
        'March 1979 (Peace Treaty signed)',
        'Oct 1981 (Sadat assassinated)',
        'Anwar Sadat',
        'Menachem Begin',
        'Jimmy Carter',
        'Knesset speech',
        'Land for Peace',
        'Sinai returned in phases',
        'Diplomatic recognition & embassy',
        'Arab League expulsion',
        'Islamic Jihad',
      ],
      step3_starters: [
        'One primary consequence of the 1979 Egypt-Israel Peace Treaty was that Egypt recovered the entire Sinai Peninsula, because...',
        'A second critical consequence was the severe diplomatic and political backlash against Egypt across the Arab world, which resulted in...',
      ],
    },
    thematicClusters: [
      {
        name: 'Consequence 1: Recovery of Sinai & Mutual Recognition',
        description:
          'Israel dismantled settlements (Yamit) and withdrew from all of Sinai by 1982; Egypt opened diplomatic relations, exchanged ambassadors, and guaranteed Israeli shipping through Tiran.',
        keywords: [
          'sinai',
          'land for peace',
          'recognition',
          'ambassador',
          'tiran',
          'yamit',
          'begin',
          'demilitarized',
        ],
      },
      {
        name: "Consequence 2: Arab League Boycott & Sadat's Assassination",
        description:
          'Arab states condemned Sadat for betraying the Palestinians; Egypt suspended from Arab League; HQ moved from Cairo to Tunis; Sadat assassinated in 1981 by Islamic Jihad.',
        keywords: [
          'arab league',
          'boycott',
          'traitor',
          'palestine',
          'assassination',
          '1981',
          'islamic jihad',
          'cairo',
          'tunis',
        ],
      },
    ],
    widerKnowledgeExamples:
      'Begin and Sadat sharing the 1978 Nobel Peace Prize, Carter spending 13 grueling days at Camp David shuttle-negotiating between separate cabins, US guaranteeing $3bn+ in annual military aid to Israel and Egypt.',
    benchmark: {
      dates: [
        {
          date: 'Nov 1977',
          label: 'Anwar Sadat makes historic visit to Jerusalem and addresses the Israeli Knesset',
        },
        {
          date: 'Sept 1978',
          label: 'Camp David Accords signed after 13 days of negotiations mediated by Jimmy Carter',
        },
        { date: '26 March 1979', label: 'Egypt-Israel Peace Treaty signed on White House lawn' },
        {
          date: '6 Oct 1981',
          label:
            'President Anwar Sadat assassinated by Egyptian Islamic Jihad during military parade',
        },
      ],
      vocab: [
        {
          term: 'Anwar Sadat',
          meaning:
            'Egyptian President who broke the Arab taboo on negotiating directly with Israel',
        },
        {
          term: 'Menachem Begin',
          meaning:
            'Right-wing Likud Prime Minister of Israel who agreed to dismantle Sinai settlements',
        },
        {
          term: 'Jimmy Carter',
          meaning:
            'US President whose personal diplomacy at Camp David prevented the collapse of talks',
        },
        {
          term: 'Camp David Accords',
          meaning:
            '1978 framework agreement establishing the basis for bilateral peace and Palestinian autonomy',
        },
        {
          term: 'Arab League Boycott',
          meaning:
            'Diplomatic and economic severance of ties with Egypt by Arab nations, moving HQ from Cairo to Tunis',
        },
        {
          term: 'Islamic Jihad',
          meaning:
            'Radical Islamist militant group that assassinated Sadat for signing peace with Israel',
        },
      ],
      mechanisms: [
        'The treaty validated the "Land for Peace" principle of UN 242: Israel surrendered a vast buffer zone (Sinai) with its oil fields and airbases in exchange for the priceless prize of official recognition from the largest Arab military power.',
        'By removing Egypt from the anti-Israel military coalition, the treaty eliminated the existential threat of a coordinated two-front Arab invasion against Israel for the remainder of the 20th century.',
        'The failure of the Accords to resolve the Palestinian issue (only offering vague autonomy) enraged the Arab world and radicalized Palestinian factions, isolating Egypt until the 1990s.',
      ],
      examinerTip:
        'Period Study Insight: Note the asymmetry—the bilateral treaty between Egypt and Israel was a triumph, but the second framework regarding Palestinian self-determination in the West Bank and Gaza remained completely unfulfilled.',
    },
  },

  {
    topicId: 'cme_first_intifada_oslo_1987_93',
    paperId: 'paper2_p5_middle_east',
    paperType: 'paper2_period',
    specCode: 'Option P5 • Topic 3',
    title: 'The First Intifada & The Oslo Peace Accords (1987–1993)',
    subtitle:
      'Jabalia camp trigger, grassroots civil disobedience, international sympathy, and the 1993 Oslo Accords',
    examMission:
      "Construct a 3-Stage Analytical Narrative Chain: Trigger (Jabalia incident & 20 years occupation) ➔ Escalation (Popular uprising, stone-throwing & Rabin's Iron Fist) ➔ Consequence (Secret Oslo negotiations & mutual recognition).",
    drivingQuestion:
      'Write an analytical narrative explaining the causes and immediate outcomes of the First Intifada, 1987–1993. [8 Marks]',
    pupilPromptCue:
      'Write a 3-link analytical chain: (1) Outbreak in Jabalia refugee camp in December 1987, (2) Spread of civil disobedience, stone-throwing, and Israeli military response, and (3) Secret Norwegian negotiations culminating in the 1993 Oslo Accords.',
    prompt:
      'Free recall practice: Retrieve the conditions triggering the First Intifada (1987), tactics of civil resistance, international shifts in perception, and the historic 1993 Oslo Accords.',
    specItemSyncPrefix: 'spec-paper2_p5_middle_east-cme_topic3',
    relatedLesson: { unit: 'cme_new', index: 6 },
    scaffoldLadder: {
      step1_questions: [
        'Link 1: What conditions in the Occupied Territories and what road incident in Jabalia triggered the Intifada in December 1987?',
        'Link 2: What grassroots tactics (strikes, stone-throwing) did Palestinians use, and how did Defence Minister Rabin respond?',
        'Link 3: How did the Intifada push Yitzhak Rabin and Yasser Arafat to sign the Oslo Accords in September 1993?',
      ],
      step2_wordbank: [
        'Dec 1987 (Intifada begins)',
        '1988 (Arafat renounces terrorism)',
        '1991 (Madrid Conference)',
        'Sept 1993 (Oslo Accords)',
        'Jabalia refugee camp',
        'Intifada ("Shaking off")',
        'UNLU (Unified Leadership)',
        'Yitzhak Rabin',
        'Iron Fist policy',
        'Yasser Arafat & PLO',
        'Palestinian Authority',
        'Gaza-Jericho First',
        'White House handshake',
      ],
      step3_starters: [
        'The First Intifada erupted in December 1987 following an IDF vehicle collision in Jabalia refugee camp, which triggered widespread anger because Palestinians had endured...',
        "The uprising spread rapidly across Gaza and the West Bank through strikes and stone-throwing youths, which damaged Israel's international reputation because...",
        'Recognising that military force could not end the uprising, Israeli Prime Minister Yitzhak Rabin engaged in secret talks leading to the 1993 Oslo Accords, where Israel and the PLO...',
      ],
    },
    thematicClusters: [
      {
        name: 'Link 1: Outbreak in Gaza (Dec 1987)',
        description:
          '20 years of military occupation since 1967; confiscation of Palestinian land; Jabalia camp traffic incident killing 4 workers triggering mass demonstrations.',
        keywords: [
          'jabalia',
          'december 1987',
          'refugee camp',
          'traffic collision',
          '20 years occupation',
          'gaza',
          'west bank',
          'frustration',
        ],
      },
      {
        name: 'Link 2: Grassroots Resistance & Israeli Reaction',
        description:
          'Unified National Leadership of the Uprising (UNLU); tax boycotts, general strikes, youth stone-throwing ("David vs Goliath"); Rabin\'s "break their bones" Iron Fist policy televised globally.',
        keywords: [
          'unlu',
          'stone throwing',
          'david vs goliath',
          'rabin',
          'iron fist',
          'curfews',
          'televised',
          'international sympathy',
        ],
      },
      {
        name: 'Link 3: Oslo Peace Accords (1993)',
        description:
          "Secret talks in Norway; PLO recognized Israel's right to exist; Israel recognized PLO as representative; Palestinian Authority established in Gaza and Jericho; historic Clinton handshake.",
        keywords: [
          'oslo accords',
          '1993',
          'arafat',
          'rabin',
          'clinton',
          'handshake',
          'palestinian authority',
          'gaza jericho',
          'mutual recognition',
        ],
      },
    ],
    widerKnowledgeExamples:
      'Founding of Hamas in 1987 as Islamic rival to secular PLO, Arafat reading declaration in Algiers in 1988 accepting UN 242, Johan Jørgen Holst facilitating the secret Norwegian negotiations.',
    benchmark: {
      dates: [
        {
          date: 'Dec 1987',
          label: 'First Intifada erupts in Jabalia refugee camp following truck collision',
        },
        {
          date: 'Nov 1988',
          label:
            'Yasser Arafat addresses UN in Geneva, recognising Israel and renouncing terrorism',
        },
        {
          date: '1991',
          label: 'Madrid Peace Conference opens negotiations following the Gulf War',
        },
        {
          date: '13 Sept 1993',
          label:
            'Oslo Declaration of Principles signed on the White House lawn by Rabin and Arafat',
        },
      ],
      vocab: [
        {
          term: 'First Intifada',
          meaning:
            'Arabic word for "shaking off"; spontaneous mass Palestinian uprising against Israeli occupation',
        },
        {
          term: 'Jabalia Refugee Camp',
          meaning:
            'Densely populated Gaza camp where protests began after 4 Palestinians died in an IDF collision',
        },
        {
          term: 'UNLU',
          meaning:
            'Unified National Leadership of the Uprising; underground committees coordinating strikes and boycotts',
        },
        {
          term: 'Iron Fist Policy',
          meaning:
            "Yitzhak Rabin's military approach utilizing curfews, mass detentions, tear gas, and force",
        },
        {
          term: 'Oslo Accords',
          meaning:
            '1993 peace agreement providing for Israeli withdrawal from Gaza and Jericho and Palestinian interim self-government',
        },
        {
          term: 'Palestinian Authority',
          meaning:
            'Interim administrative body created under Oslo to govern parts of the West Bank and Gaza Strip',
        },
      ],
      mechanisms: [
        'The Intifada altered international perception by casting stone-throwing Palestinian children as "David" against the heavily armed Israeli military "Goliath", shattering Israel\'s moral standing abroad.',
        'The civilian uprising convinced Israeli military leaders, including Prime Minister Yitzhak Rabin, that military occupation was unsustainable and that political dialogue was the only path to security.',
        "Mutual recognition at Oslo in 1993 broke 45 years of existential enmity: the PLO renounced terrorism and accepted Israel's existence, while Israel recognized the PLO as the legitimate representative of Palestinians.",
      ],
      examinerTip:
        'Analytical Narrative Linkage: Connect the causation clearly: show how the misery of occupation exploded in 1987, how the televised brutality of the uprising undermined Israeli policy, and how this political realization culminated directly in the Oslo Accords.',
    },
  },

  // ==========================================================================
  // PAPER 3: MODERN DEPTH STUDY (Option 33: USA / Option 31: Weimar)
  // ==========================================================================
  {
    topicId: 'usa_civil_rights_50s_60s',
    paperId: 'paper3_33_usa_conflict_home_abroad',
    paperType: 'paper3_modern',
    specCode: 'Option 33 • Section 1',
    title: 'The Civil Rights Movement: Direct Action & Major Legislation, 1954–1965',
    subtitle: 'From Montgomery and Little Rock to Birmingham, Selma, and the 1964/1965 Acts',
    examMission:
      'Explain multi-factor causation: assess the relative significance of grassroots direct action vs federal executive and legislative intervention.',
    drivingQuestion:
      'Explain why the Civil Rights Movement was able to achieve major legal and social changes between 1954 and 1965.',
    pupilPromptCue:
      'Write about: Nonviolent direct action (Montgomery, sit-ins, Birmingham, Selma), media coverage, MLK, Civil Rights Act 1964, and Voting Rights Act 1965.',
    prompt:
      'Free recall practice: Retrieve key civil rights campaigns (Montgomery, Little Rock, Birmingham, Selma), organizations, Supreme Court rulings, and landmark federal legislation between 1954 and 1965.',
    specItemSyncPrefix: 'spec-paper3_33_usa_conflict_home_abroad-usa_cr',
    relatedLesson: { unit: 'usa', index: 0 },
    scaffoldLadder: {
      step1_questions: [
        'How did legal challenges like Brown v. Board of Education (1954) overturn "separate but equal"?',
        'How did grassroots nonviolent direct action in Birmingham (1963) provoke violent police reactions that shamed the nation?',
        'How did the March on Washington (1963) and Selma (1965) compel Presidents Kennedy and Johnson to pass the Civil Rights Act (1964) and Voting Rights Act (1965)?',
      ],
      step2_wordbank: [
        '1954 (Brown v. Board)',
        '1955 (Montgomery)',
        '1957 (Little Rock)',
        '1963 (Birmingham & Washington)',
        '1964 (Civil Rights Act)',
        '1965 (Selma & Voting Rights Act)',
        'Martin Luther King Jr.',
        'Rosa Parks',
        'Bull Connor (water cannons/dogs)',
        'President Lyndon B. Johnson',
        'Jim Crow laws',
        'SCLC & SNCC',
      ],
      step3_starters: [
        'The Civil Rights Movement gained vital momentum in 1954 when the Supreme Court ruled in Brown v. Board of Education that...',
        'Grassroots direct action in Birmingham in 1963 was deliberately designed to create a media crisis, which succeeded because...',
        'Federal intervention under President Lyndon B. Johnson culminated in landmark legislation including...',
      ],
    },
    thematicClusters: [
      {
        name: 'Legal Victories & Desegregation (1954–57)',
        description:
          'NAACP, Thurgood Marshall, Brown v. Board overturning Plessy v. Ferguson; Eisenhower sending 101st Airborne to Little Rock Central High.',
        keywords: [
          'brown v board',
          '1954',
          'little rock',
          'eisenhower',
          '101st airborne',
          'naacp',
          'plessy',
          'segregation',
        ],
      },
      {
        name: 'Grassroots Nonviolent Direct Action (1955–61)',
        description:
          'Rosa Parks, 381-day Montgomery Bus Boycott; Greensboro sit-ins; CORE Freedom Rides testing interstate bus desegregation.',
        keywords: [
          'montgomery',
          'rosa parks',
          'bus boycott',
          'greensboro',
          'sit-ins',
          'freedom rides',
          'core',
          'sncc',
          'sclc',
          'mlk',
        ],
      },
      {
        name: 'Confrontation & Media Exposure: Birmingham & Selma (1963–65)',
        description:
          'Project C in Birmingham, Bull Connor using attack dogs and high-pressure fire hoses on children; Selma to Montgomery "Bloody Sunday" march.',
        keywords: [
          'birmingham',
          'bull connor',
          'fire hoses',
          'dogs',
          'selma',
          'bloody sunday',
          'march on washington',
          'i have a dream',
        ],
      },
      {
        name: 'Federal Legislative Transformation (1964–65)',
        description:
          'Civil Rights Act of 1964 ending public segregation; Voting Rights Act of 1965 outlawing literacy tests; LBJ\'s "Great Society".',
        keywords: [
          'civil rights act 1964',
          'voting rights act 1965',
          'lyndon b johnson',
          'lbj',
          'literacy tests',
          'equal employment',
        ],
      },
    ],
    widerKnowledgeExamples:
      'Letter from Birmingham Jail written by MLK, 250,000 marchers at the Lincoln Memorial for the March on Washington, 16th Street Baptist Church bombing killing four young girls, James Meredith escorted by federal marshals to Ole Miss in 1962.',
    benchmark: {
      dates: [
        {
          date: '1954',
          label:
            'Supreme Court rules segregation in public schools unconstitutional in Brown v. Board of Education',
        },
        {
          date: '1955–56',
          label: 'Montgomery Bus Boycott successfully desegregates city buses after 381 days',
        },
        {
          date: '1957',
          label:
            'President Eisenhower deploys the 101st Airborne Division to protect the Little Rock Nine',
        },
        {
          date: 'Aug 1963',
          label: 'March on Washington for Jobs and Freedom; MLK delivers "I Have a Dream" speech',
        },
        {
          date: 'July 1964',
          label: 'President Lyndon B. Johnson signs the landmark Civil Rights Act of 1964',
        },
        {
          date: 'Aug 1965',
          label:
            'Voting Rights Act of 1965 signed into law following the Selma to Montgomery marches',
        },
      ],
      vocab: [
        {
          term: 'Brown v. Board of Education',
          meaning:
            '1954 Supreme Court ruling declaring "separate educational facilities are inherently unequal"',
        },
        {
          term: 'Civil Rights Act of 1964',
          meaning:
            'Federal law banning discrimination in voter registration, public accommodations, and employment',
        },
        {
          term: 'Voting Rights Act of 1965',
          meaning:
            'Law banning literacy tests and providing federal registrars to oversee voter registration in the South',
        },
        {
          term: 'SCLC',
          meaning:
            'Southern Christian Leadership Conference founded by Martin Luther King Jr. to organize nonviolent protests',
        },
        {
          term: 'SNCC',
          meaning:
            'Student Nonviolent Coordinating Committee, pioneering student sit-ins and Freedom Summer drives',
        },
        {
          term: 'Jim Crow Laws',
          meaning:
            'State and local statutes across the American South that legalized racial segregation',
        },
      ],
      mechanisms: [
        'Nonviolent direct action deliberately provoked extreme violent overreactions from white segregationist authorities (e.g. Bull Connor in Birmingham), creating televised spectacles that outraged national public opinion and made federal inaction untenable.',
        'The partnership between grassroots activists and federal institutions enabled progress: when Southern governors defied federal law, Presidents Eisenhower and Kennedy were forced to dispatch troops to enforce court orders.',
        'Following the assassination of President Kennedy, President Johnson utilized political momentum and his legislative mastery to push the Civil Rights Act and Voting Rights Act through Congress.',
      ],
      examinerTip:
        'Grade 9 Causation: Balance the bottom-up factor (courageous ordinary activists, Rosa Parks, sit-in students) with the top-down factor (Supreme Court judicial review, Presidential executive orders, congressional statutes).',
    },
  },

  {
    topicId: 'usa_vietnam_tactics_tet_1968',
    paperId: 'paper3_33_usa_conflict_home_abroad',
    paperType: 'paper3_modern',
    specCode: 'Option 33 • Section 2',
    title: 'The Vietnam War: Military Tactics, Tet Offensive & Media (1965–1968)',
    subtitle:
      'Guerrilla warfare vs US firepower, Operation Rolling Thunder, the Tet Offensive turning point, and media impact',
    examMission:
      'Examine Multi-Factor Causation & Interpretations: Contrast guerrilla resilience with US tactical failure; evaluate the 1968 Tet Offensive as a psychological turning point.',
    drivingQuestion:
      'Explain why US military tactics failed to defeat the Vietcong in Vietnam in the years 1965–1968. [12 Marks]',
    pupilPromptCue:
      'Write about: Vietcong guerrilla tactics (tunnels, booby traps), the limitations of US aerial bombing and Search & Destroy, and the Tet Offensive (1968).',
    prompt:
      'Free recall practice: Retrieve the asymmetric tactics of the Vietnam War: Vietcong guerrilla warfare and the Ho Chi Minh Trail versus US firepower (Rolling Thunder, Agent Orange, Search and Destroy), and the impact of the 1968 Tet Offensive.',
    specItemSyncPrefix: 'spec-paper3_33_usa_conflict_home_abroad-usa_sec2',
    relatedLesson: { unit: 'usa', index: 4 },
    scaffoldLadder: {
      step1_questions: [
        'How did Vietcong guerrilla tactics (tunnels, punji traps, "hanging onto US belts") neutralize superior American firepower?',
        'Why did US tactics like Operation Rolling Thunder, Search & Destroy, and defoliants alienate the Vietnamese rural population?',
        'Why was the 1968 Tet Offensive a military defeat for the Vietcong but a catastrophic political and media disaster for the US government?',
      ],
      step2_wordbank: [
        '1964 (Gulf of Tonkin)',
        '1965 (Rolling Thunder begins)',
        'Jan 1968 (Tet Offensive)',
        'March 1968 (My Lai massacre)',
        'Vietcong (NLF)',
        'Cu Chi tunnels',
        'Ho Chi Minh Trail',
        'Operation Rolling Thunder',
        'Search and Destroy',
        'Zippo raids',
        'Agent Orange & Napalm',
        'General Westmoreland',
        'Walter Cronkite (stalemate)',
      ],
      step3_starters: [
        'US military tactics failed because the Vietcong operated an effective asymmetric guerrilla strategy, using tunnel complexes like Cu Chi and booby traps that...',
        'Furthermore, American conventional tactics such as Search and Destroy missions and the use of chemical defoliants like Agent Orange backfired because...',
        'The turning point came in January 1968 during the Tet Offensive, which, despite heavy Vietcong casualties, shattered American public belief in victory because...',
      ],
    },
    thematicClusters: [
      {
        name: 'Vietcong Guerrilla Warfare & The Ho Chi Minh Trail',
        description:
          'Tunnels of Cu Chi, punji stick traps, blending into peasant villages, supplying forces via the Ho Chi Minh Trail through Laos and Cambodia.',
        keywords: [
          'vietcong',
          'guerrilla',
          'tunnels',
          'cu chi',
          'booby traps',
          'punji',
          'ho chi minh trail',
          'laos',
          'cambodia',
          'hanging onto belts',
        ],
      },
      {
        name: 'US Conventional Firepower: Rolling Thunder & Defoliation',
        description:
          '3-year bombing campaign dropping more tonnage than WWII; Operation Ranch Hand spraying 20 million gallons of Agent Orange and Napalm.',
        keywords: [
          'rolling thunder',
          'bombing',
          'agent orange',
          'napalm',
          'defoliant',
          'ranch hand',
          'chemical',
          'jungles',
        ],
      },
      {
        name: 'Search & Destroy & Civilian Alienation',
        description:
          'Helicopter insertions into villages, body count metrics, burning thatch huts ("Zippo raids"), driving peasants into supporting the NLF; My Lai massacre (1968).',
        keywords: [
          'search and destroy',
          'zippo',
          'helicopters',
          'body count',
          'my lai',
          'calley',
          'civilian casualties',
          'hearts and minds',
        ],
      },
      {
        name: 'The Tet Offensive (1968) & The Credibility Gap',
        description:
          'Coordinated assault on 100+ cities and the US Embassy in Saigon; television coverage disproving Westmoreland\'s "light at the end of the tunnel"; Cronkite broadcast.',
        keywords: [
          'tet offensive',
          '1968',
          'saigon',
          'embassy',
          'credibility gap',
          'cronkite',
          'stalemate',
          'johnson',
          'will not run',
        ],
      },
    ],
    widerKnowledgeExamples:
      'Over 500,000 US troops deployed by 1968, 58,000 American names on the Vietnam Memorial wall, My Lai massacre covered up until 1969 where over 400 unarmed civilians were killed, President Johnson declaring he would not seek re-election in March 1968.',
    benchmark: {
      dates: [
        {
          date: 'Aug 1964',
          label: 'Gulf of Tonkin incident leads to Congress passing the Gulf of Tonkin Resolution',
        },
        {
          date: 'March 1965',
          label: 'Operation Rolling Thunder begins; first US combat Marines land at Da Nang',
        },
        {
          date: '31 Jan 1968',
          label: 'Vietcong and NVA launch the Tet Offensive across South Vietnam',
        },
        {
          date: 'March 1968',
          label: 'My Lai massacre occurs; President Johnson announces he will not seek re-election',
        },
        { date: 'Nov 1969', label: '500,000 anti-war demonstrators march on Washington DC' },
      ],
      vocab: [
        {
          term: 'Vietcong (NLF)',
          meaning:
            'Communist guerrilla movement fighting the South Vietnamese government and the US military',
        },
        {
          term: 'Cu Chi Tunnels',
          meaning:
            'Over 200 miles of underground tunnels containing hospitals, kitchens, and arsenals',
        },
        {
          term: 'Ho Chi Minh Trail',
          meaning:
            'Network of jungle paths through Laos and Cambodia supplying communist forces in the South',
        },
        {
          term: 'Search and Destroy',
          meaning:
            'US tactic of airlifting troops into enemy territory, killing suspects, and burning villages',
        },
        {
          term: 'Agent Orange',
          meaning:
            'Toxic chemical herbicide sprayed by US planes to destroy jungle canopy and expose Vietcong supply trails',
        },
        {
          term: 'Tet Offensive',
          meaning:
            'Major communist offensive attacking 100+ cities during the Vietnamese Lunar New Year in 1968',
        },
        {
          term: 'Credibility Gap',
          meaning:
            'The growing divide between government claims of winning the war and televised reality',
        },
      ],
      mechanisms: [
        'The Vietcong adopted "hanging onto American belts" tactics (fighting at close quarters), which neutralized devastating US air and artillery strikes because Americans could not call in airstrikes without bombing their own troops.',
        'Search and Destroy missions relied on body counts rather than holding territory, causing widespread civilian destruction that completely alienated Vietnamese peasants and made winning "hearts and minds" impossible.',
        "The Tet Offensive was a military catastrophe for the Vietcong (losing 45,000 men), but a decisive psychological victory: live television footage of fighting inside the US Embassy destroyed the Johnson administration's credibility, triggering the anti-war movement and the policy of Vietnamization.",
      ],
      examinerTip:
        'Level 4 Nuance: Clarify that the Tet Offensive was a military defeat for the Vietcong, but an overwhelming political, psychological, and media defeat for the United States.',
    },
  },

  {
    topicId: 'weimar_crisis_1923',
    paperId: 'paper3_31_weimar_nazi_germany',
    paperType: 'paper3_modern',
    specCode: 'Option 31 • Key Topic 1',
    title: "The Weimar Republic's Crisis Year 1923: Ruhr, Hyperinflation & Munich Putsch",
    subtitle:
      'Reparation defaults, passive resistance, economic collapse, and extremist challenges',
    examMission:
      "Examine structural economic collapse vs extremist political challenges; evaluate Gustav Stresemann's short-term vs long-term resolution.",
    drivingQuestion:
      'Explain why the year 1923 was a year of extreme crisis for the Weimar Republic, and explain how the government resolved it.',
    pupilPromptCue:
      "Write about: French occupation of the Ruhr, passive resistance, the hyperinflation spiral, the Munich Beer Hall Putsch, and Stresemann's Rentenmark.",
    prompt:
      "Free recall practice: Retrieve the events of the 1923 crisis: the French invasion of the Ruhr, the hyperinflation spiral, the Munich Beer Hall Putsch, and Gustav Stresemann's solution.",
    specItemSyncPrefix: 'spec-paper3_31_weimar_nazi_germany-wng_kt1',
    relatedLesson: { unit: 'weimar_nazi_germany', index: 2 },
    scaffoldLadder: {
      step1_questions: [
        'Why did French and Belgian troops occupy the Ruhr in January 1923, and how did the German government respond?',
        'How did printing money for passive resistance lead to uncontrollable hyperinflation, and who was most damaged?',
        'How did Adolf Hitler exploit the crisis during the Munich Beer Hall Putsch, and how did Gustav Stresemann stabilize the mark?',
      ],
      step2_wordbank: [
        'Jan 1923 (Ruhr invaded)',
        'Summer 1923 (Hyperinflation)',
        'Nov 1923 (Munich Putsch & Rentenmark)',
        'Ruhr Occupation',
        'Passive resistance',
        'Hyperinflation',
        'Rentenmark',
        'Gustav Stresemann',
        'Munich Beer Hall Putsch',
        'Erich Ludendorff',
        'Mittelstand (middle class)',
        'Landsberg Prison',
      ],
      step3_starters: [
        'In January 1923, French and Belgian troops invaded the Ruhr industrial region because Germany defaulted on...',
        'The Weimar government ordered workers into passive resistance and printed billions of banknotes, which triggered catastrophic hyperinflation that destroyed...',
        'Gustav Stresemann resolved the immediate crisis in late 1923 by calling off passive resistance and introducing the Rentenmark, but the psychological legacy was...',
      ],
    },
    thematicClusters: [
      {
        name: 'French Invasion of the Ruhr & Passive Resistance',
        description:
          '60,000 French/Belgian troops occupying industrial heartland; Cuno government calling general strike and funding striking workers.',
        keywords: [
          'ruhr',
          'french',
          'belgian',
          'reparations',
          'coal',
          'passive resistance',
          'strike',
          'january 1923',
        ],
      },
      {
        name: 'The Hyperinflation Spiral & Social Winners/Losers',
        description:
          'Marks losing all value, barter economy, middle class (Mittelstand) savings wiped out, while industrialists paid debts with worthless currency.',
        keywords: [
          'hyperinflation',
          'money',
          'printing presses',
          'worthless',
          'mittelstand',
          'middle class',
          'savings',
          'pensioners',
          'stinnes',
          'wheelbarrows',
        ],
      },
      {
        name: 'The Munich Beer Hall Putsch (Nov 1923)',
        description:
          "Hitler, Ludendorff, and the NSDAP marching on Munich, police shootout, and Hitler's trial in Landsberg Prison.",
        keywords: [
          'munich putsch',
          'beer hall',
          'hitler',
          'ludendorff',
          'kahr',
          'landsberg',
          'mein kampf',
          'trial',
          'propaganda',
        ],
      },
      {
        name: "Stresemann's Recovery & The Rentenmark",
        description:
          'Ending passive resistance, introducing mortgage-backed Rentenmark, and paving way for the 1924 Dawes Plan.',
        keywords: [
          'stresemann',
          'rentenmark',
          'dawes plan',
          'mortgage',
          'currency',
          'chancellor',
          'stabilization',
          '1924',
        ],
      },
    ],
    widerKnowledgeExamples:
      'Loaf of bread reaching 201 billion marks by November 1923, industrialists like Hugo Stinnes buying up bankrupt competitors, sympathetic right-wing judges giving Hitler a light 5-year sentence (serving 9 months), Rentenmark backed by agricultural land.',
    benchmark: {
      dates: [
        {
          date: 'Jan 1923',
          label: '60,000 French and Belgian troops invade and occupy the industrial Ruhr valley',
        },
        {
          date: 'Summer 1923',
          label: 'Hyperinflation reaches peak; printing presses run 24/7; marks become worthless',
        },
        {
          date: 'Aug 1923',
          label: 'Gustav Stresemann appointed Chancellor; orders end to passive resistance in Ruhr',
        },
        { date: '8–9 Nov 1923', label: 'Hitler and NSDAP launch abortive Munich Beer Hall Putsch' },
        {
          date: 'Nov 1923',
          label:
            'Stresemann introduces temporary Rentenmark backed by agricultural and industrial land',
        },
      ],
      vocab: [
        {
          term: 'Ruhr Occupation',
          meaning:
            "French/Belgian military takeover of Germany's industrial heartland to seize coal reparations",
        },
        {
          term: 'Passive Resistance',
          meaning:
            'Policy of Ruhr workers refusing to work or cooperate with occupying French forces',
        },
        {
          term: 'Hyperinflation',
          meaning:
            'Rapid, uncontrollable price increases; a loaf of bread reached 201 billion marks by Nov 1923',
        },
        {
          term: 'Rentenmark',
          meaning:
            'Temporary emergency currency introduced by Stresemann, replaced in 1924 by the Reichsmark',
        },
        {
          term: 'Munich Beer Hall Putsch',
          meaning:
            'Failed Nazi insurrection in Bavaria led by Adolf Hitler and General Erich Ludendorff',
        },
        {
          term: 'Landsberg Prison',
          meaning:
            'Fortress where Hitler served 9 months of a 5-year sentence and dictated Mein Kampf',
        },
        {
          term: 'Mittelstand',
          meaning:
            'German middle class whose savings, pensions, and insurance policies were completely wiped out',
        },
      ],
      mechanisms: [
        "The Weimar government printed billions of banknotes to pay striking Ruhr workers on passive resistance, destroying the currency's purchasing power.",
        'Hyperinflation permanently alienated the German middle class from democracy, leaving deep psychological resentment that Hitler later exploited.',
        "Hitler's trial for the Munich Putsch gave him national publicity; sympathetic right-wing judges allowed him to make speeches, and his light sentence proved the judiciary was disloyal to Weimar.",
      ],
      examinerTip:
        'Weimar Nuance: Note who gained and who lost from hyperinflation—businessmen and homeowners paid off massive mortgages with worthless paper, whereas pensioners and savers lost everything.',
    },
  },

  {
    topicId: 'weimar_nazi_rise_1929_1933',
    paperId: 'paper3_31_weimar_nazi_germany',
    paperType: 'paper3_modern',
    specCode: 'Option 31 • Key Topic 2',
    title: "Hitler's Rise to Power & The Depression (1929–1933)",
    subtitle:
      "Wall Street Crash, mass unemployment, Goebbels' propaganda, SA intimidation, and backstairs political intrigue",
    examMission:
      'Explain Multi-Factor Causation: Synthesize economic collapse (6 million unemployed) with Nazi campaigning, fear of communism, and political intrigue by Papen and Hindenburg.',
    drivingQuestion:
      'Explain why the Nazi Party grew in popularity between 1929 and 1932. [12 Marks]',
    pupilPromptCue:
      'Write about: The impact of the Wall Street Crash and Great Depression, Nazi propaganda and the appeal of Hitler, and the failure of democratic Weimar governments.',
    prompt:
      "Free recall practice: Retrieve the factors behind the rapid rise of the NSDAP: the 1929 Wall Street Crash, 6 million unemployed, fear of Communism, Hitler's oratory and Goebbels' propaganda, and backstairs political maneuvering in 1932–33.",
    specItemSyncPrefix: 'spec-paper3_31_weimar_nazi_germany-wng_kt2',
    relatedLesson: { unit: 'weimar_nazi_germany', index: 4 },
    scaffoldLadder: {
      step1_questions: [
        'How did the Wall Street Crash in October 1929 trigger catastrophic economic collapse and mass unemployment in Germany?',
        'How did Joseph Goebbels and Adolf Hitler tailor propaganda messages to different social classes (workers, farmers, Mittelstand)?',
        "Why did democratic Weimar coalitions fail, leading to Chancellor Brüning's austerity rule by Article 48 emergency decree?",
      ],
      step2_wordbank: [
        'Oct 1929 (Wall Street Crash)',
        'July 1932 (Nazis win 230 seats)',
        '30 Jan 1933 (Hitler appointed)',
        'Great Depression (6 million unemployed)',
        'Heinrich Brüning ("Hunger Chancellor")',
        'Article 48 presidential decrees',
        'Joseph Goebbels',
        'Hitler over Germany (air travel)',
        'SA (Brownshirts & street violence)',
        'Fear of Communism (KPD)',
        'Franz von Papen & Hindenburg',
      ],
      step3_starters: [
        'The primary catalyst for the Nazi electoral breakthrough was the Wall Street Crash of October 1929, which caused...',
        'The NSDAP capitalized on the economic crisis through sophisticated propaganda engineered by Joseph Goebbels, which portrayed Hitler as...',
        'Furthermore, the failure of democratic politicians like Chancellor Brüning to resolve unemployment led to political paralysis and...',
      ],
    },
    thematicClusters: [
      {
        name: 'The Great Depression & Economic Despair (1929–32)',
        description:
          'US banks calling in Dawes Plan loans; factory closures; 6 million unemployed by 1932; shanty towns and poverty.',
        keywords: [
          'wall street crash',
          '1929',
          'great depression',
          '6 million',
          'unemployment',
          'loans',
          'dawes plan',
          'banks',
        ],
      },
      {
        name: 'Nazi Propaganda, Campaigning & Appeal of Hitler',
        description:
          'Targeted posters, modern technology ("Hitler over Germany" airplanes), Goebbels, promises of "Work and Bread", anti-communism.',
        keywords: [
          'propaganda',
          'goebbels',
          'hitler over germany',
          'work and bread',
          'oratory',
          'airplane',
          'speeches',
          'rallies',
        ],
      },
      {
        name: 'The SA (Brownshirts) & Fear of Communism',
        description:
          "Ernst Röhm's 400,000 SA men fighting KPD communists in streets, providing image of order and strength amidst Weimar chaos.",
        keywords: [
          'sa',
          'brownshirts',
          'rohm',
          'communists',
          'kpd',
          'street violence',
          'order',
          'intimidation',
        ],
      },
      {
        name: 'Political Paralysis & Backstairs Intrigue (1930–33)',
        description:
          'Collapse of Muller grand coalition; Brüning ruling by Article 48; Papen and Schleicher plotting to control Hitler as Chancellor.',
        keywords: [
          'article 48',
          'bruning',
          'papen',
          'schleicher',
          'hindenburg',
          'intrigue',
          'chancellor',
          'january 1933',
          'puppet',
        ],
      },
    ],
    widerKnowledgeExamples:
      'Nazis jumping from 12 Reichstag seats in 1928 to 107 seats in 1930 and 230 seats in July 1932 (becoming largest party), Hindenburg calling Hitler a "Bohemian corporal", Papen\'s boast: "Within two months we will have pushed Hitler so far into a corner that he will squeak".',
    benchmark: {
      dates: [
        {
          date: 'Oct 1929',
          label: 'Wall Street Crash in New York; American banks recall short-term loans to Germany',
        },
        {
          date: 'March 1930',
          label:
            'Müller coalition collapses; Brüning becomes Chancellor ruling by Article 48 decrees',
        },
        {
          date: 'July 1932',
          label:
            'NSDAP wins 230 seats (37.3% of vote), becoming the largest party in the Reichstag',
        },
        {
          date: '30 Jan 1933',
          label: 'President von Hindenburg appoints Adolf Hitler as Chancellor of Germany',
        },
      ],
      vocab: [
        {
          term: 'Wall Street Crash',
          meaning:
            'Collapse of the US stock exchange in October 1929 that sparked worldwide Great Depression',
        },
        {
          term: 'Article 48',
          meaning:
            'Emergency decree clause in Weimar Constitution allowing Chancellor to pass laws without Reichstag vote',
        },
        {
          term: 'Heinrich Brüning',
          meaning:
            'Centrist Chancellor (1930–32) whose austerity policies earned him the nickname "Hunger Chancellor"',
        },
        {
          term: 'Joseph Goebbels',
          meaning: 'Nazi Head of Propaganda who coordinated radio, posters, and aircraft rallies',
        },
        {
          term: 'SA (Sturmabteilung)',
          meaning:
            'Nazi paramilitary stormtroopers led by Ernst Röhm who violently fought communists in the streets',
        },
        {
          term: 'Backstairs Intrigue',
          meaning:
            'Behind-the-scenes political plotting by Papen and Hindenburg to appoint Hitler as figurehead Chancellor',
        },
      ],
      mechanisms: [
        'The Great Depression caused an existential crisis for the German middle and working classes (6 million unemployed), destroying faith in moderate democratic parties and driving voters to the political extremes (NSDAP on the right, KPD on the left).',
        "Goebbels' propaganda deliberately tailored Nazi appeals to specific grievances—offering subsidies to bankrupt farmers, law and order to the terrified middle class, and jobs/bread to the unemployed.",
        'Hitler was not elected into the Chancellorship by a majority vote; he was appointed through backstairs intrigue by conservative elites (Papen and Hindenburg) who foolishly believed they could control and "tame" him as a puppet.',
      ],
      examinerTip:
        'Weimar Analysis: Distinguish between the long-term structural weakness of Weimar (Article 48, proportional representation), the trigger of the 1929 Depression, and the decisive catalyst of backstairs intrigue in January 1933.',
    },
  },
];
