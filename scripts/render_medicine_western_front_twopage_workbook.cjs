const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');

const ROOT_DIR = path.resolve(__dirname, '..');

/**
 * Robust Base64 Image Inliner
 * Resolves local image files from public/ or units/ assets and embeds them as data URIs
 * to prevent broken image icons when rendering via Puppeteer or standalone HTML files.
 */
function getBase64Image(relPath) {
  if (!relPath) return null;
  const clean = relPath.replace(/^\//, '');
  const candidates = [
    path.join(ROOT_DIR, 'public', clean),
    path.join(ROOT_DIR, clean),
    path.join(ROOT_DIR, 'public', 'images', path.basename(clean)),
    path.join(ROOT_DIR, 'images', path.basename(clean)),
    path.join(ROOT_DIR, 'units', 'edexcel_medicine', 'assets', path.basename(clean)),
    path.join(ROOT_DIR, 'public', 'units', 'edexcel_medicine', 'assets', path.basename(clean)),
  ];

  for (const cand of candidates) {
    if (fs.existsSync(cand) && fs.statSync(cand).isFile()) {
      const ext = path.extname(cand).toLowerCase();
      let mime = 'image/jpeg';
      if (ext === '.png') mime = 'image/png';
      else if (ext === '.webp') mime = 'image/webp';
      else if (ext === '.svg') mime = 'image/svg+xml';
      const buf = fs.readFileSync(cand);
      return `data:${mime};base64,${buf.toString('base64')}`;
    }
  }
  return null;
}

function generateQrSvg(url) {
  const qr = QRCode.create(url, { margin: 1 });
  const size = qr.modules.size;
  const data = qr.modules.data;
  let pathD = '';
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (data[r * size + c]) {
        pathD += `M${c},${r}h1v1h-1z `;
      }
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" shape-rendering="crispEdges" style="width: 100%; height: 100%;"><path fill="#ffffff" d="M0,0h${size}v${size}H0z"/><path fill="#000000" d="${pathD.trim()}"/></svg>`;
}

// 16 APPROVED RISQUÉ / CHEEKY BLACKADDER-STYLE QUIPS
const quipList = [
  'Western Front Revision Hub • The History Department', // Page 1
  'If you think your walk to period 1 is rough, try carrying a 14-stone sergeant through 4 miles of knee-deep Flanders clay.', // Page 2
  'Living Timeline complete: 4 years of static trench warfare, mud, and rapid medical innovation summarized in 6 chronological milestones.', // Page 3
  'Welcome to Flanders: 500 square miles of fermented pig manure, liquid mud, and artillery with terrifying accuracy.', // Page 4
  'Trench drainage tip: If your duckboards are floating, you are no longer in an infantry trench; you are commanding a submarine.', // Page 5
  'Whale oil smells like dead fish and regrets, but it beats having your toes amputated by an RAMC surgeon with a bone-saw.', // Page 6
  "Body lice: The only creatures on the Western Front that didn't care about King, Kaiser, or your personal hygiene.", // Page 7
  'The Brodie helmet: Looks like an upside-down soup bowl, but prevents your skull from becoming one.', // Page 8
  'Chlorine gas: If it smells like rotten pineapple and bleaches the grass, do NOT inhale—unless you fancy drowning in your own lungs.', // Page 9
  'The Regimental Aid Post: 200 yards from the German front line, lit by candle-ends, and smelling entirely of iodine and panic.', // Page 10
  'Motor ambulances: Guaranteed to rattle every uninjured bone in your body while speeding you to the Casualty Clearing Station.', // Page 11
  'The Thomas Splint: Before Robert Jones introduced it, an 80% chance of death; after Jones, an 80% chance of living to complain about the food.', // Page 12
  'Carrel-Dakin solution: If it burns like liquid fire and smells like a Victorian washhouse, congratulations—it is killing the gas gangrene.', // Page 13
  "Robertson's Blood Depot: Ice chests, sodium citrate, and refrigerated blood at Cambrai—proof that cold beer isn't the only thing worth chilling.", // Page 14
  'Harold Gillies at Sidcup: Turning shattered faces into men again with tubed pedicle skin grafts, while patients politely pretended not to notice.', // Page 15
  'Western Front Spec Mastery complete: 16 marks in the bag, zero gangrene, and not a single complaint to the War Office.', // Page 16
];

// ============================================================================
// FOOTER STRIP HELPER (Page Number + Quip on the Same Line)
// Even pages (verso/left): Page number on left, quip on right.
// Odd pages (recto/right): Quip on left, page number on right.
// ============================================================================
function renderFooterStrip(pageNum, quipText, totalPages = 28) {
  const isEven = pageNum % 2 === 0;
  if (isEven) {
    return `
      <div class="page-footer-strip">
        <span class="footer-page-num" style="margin-right: 8px;">${pageNum}/${totalPages}</span>
        <span class="footer-quip" style="text-align: right; flex: 1;"><em>${quipText}</em></span>
      </div>`;
  } else {
    return `
      <div class="page-footer-strip">
        <span class="footer-quip" style="text-align: left; flex: 1; margin-right: 8px;"><em>${quipText}</em></span>
        <span class="footer-page-num">${pageNum}/${totalPages}</span>
      </div>`;
  }
}

// ============================================================================
// 6 DEDICATED WESTERN FRONT ENQUIRY LESSON CONFIGURATIONS
// ============================================================================
const wfConfigs = [
  {
    lessonIndex: 20,
    lessonNum: 1,
    id: 'lesson_5_1',
    title: 'KT5.1: The Theatre of War: The British Sector, Trench Geography & Battles',
    specAnchor:
      'The British sector of the Western Front: theatre of war and trench system (frontline, support, reserve, communication trenches); terrain, saps, and battleground sectors (Ypres, Somme, Arras, Cambrai).',
    sourceIndex: 0,
    sourceBadge: 'SOURCE A',
    sourceSubtitle: 'Contemporary Aerial Reconnaissance • Royal Flying Corps',
    sourceDate: '1917',
    doNow: [
      {
        q: 'In which century BC did Hippocrates practise clinical observation?',
        a: '5th Century BC',
      },
      {
        q: 'Name the four bodily fluids in humoural medicine.',
        a: 'Blood, Phlegm, Yellow Bile, Black Bile',
      },
      { q: 'Which Roman physician developed the Theory of Opposites?', a: 'Claudius Galen' },
      { q: 'In what year did the Black Death reach England?', a: '1348' },
      { q: 'Which Renaissance anatomist published De Fabrica in 1543?', a: 'Andreas Vesalius' },
      { q: 'Who proved blood circulates through the body in 1628?', a: 'William Harvey' },
      {
        q: 'Which physician classified diseases through bedside observation?',
        a: 'Thomas Sydenham (1676)',
      },
      { q: 'In what year was the Royal Society founded?', a: '1660' },
      { q: 'What term describes foul air believed to cause disease?', a: 'Miasma' },
      {
        q: 'What religious institution monopolized medical copying in the Middle Ages?',
        a: 'The Catholic Church',
      },
    ],
    vocabPrompt:
      'Write a concise historical explanation demonstrating the tactical medical difference between a communication trench and a sap.',
    q1Features: {
      a: {
        q: 'Describe one feature of the system of communication trenches on the Western Front.',
        hint: 'Consider how communication trenches connected frontline trenches to dressing stations and supply lines.',
      },
      b: {
        q: 'Describe one feature of the underground hospital at Arras (Thompson’s Cave).',
        hint: 'Consider the chalk geology, lighting, water supply, and surgical capacity 20 metres underground.',
      },
    },
    tariff: 'Question 2(a): Source Utility Assessment [8 marks &bull; 10 mins]',
    examStem:
      'Study Source A. How useful is Source A for an enquiry into the defensive layout and tactical design of trench systems on the Western Front? Explain your answer, using Source A and your knowledge of the historical context. [8 marks]',
    provenanceClue:
      'Consider the nature of an official military aerial reconnaissance photograph taken by the Royal Flying Corps in 1917. What does an overhead view reveal about traverses, fire-steps, and saps, and what ground-level medical and mud conditions does it omit?',
    structureStrip: [
      {
        col: '1. CONTENT & UTILITY',
        text: 'Explain how the aerial photograph clearly shows the zig-zag traverse design, communication lines, and support saps.',
      },
      {
        col: '2. PROVENANCE & MOTIVE',
        text: 'Evaluate the RFC photographic intelligence: highly accurate for cartography, but taken from high altitude under combat conditions.',
      },
      {
        col: '3. CONTEXT & LIMITATIONS',
        text: 'Cross-reference with knowledge of mud, water tables at Ypres, and the difficulty stretcher bearers faced turning sharp right-angle corners.',
      },
    ],
    connectives:
      'Source A is useful for an enquiry into trench layout because... &bull; Specifically, the aerial perspective reveals... &bull; In terms of provenance, as an official RFC reconnaissance photograph... &bull; However, the source is limited because it cannot show... &bull; Therefore...',
    wordBank:
      'Royal Flying Corps &bull; zig-zag traverses &bull; communication trench &bull; Ypres Salient &bull; Messines Ridge &bull; water table &bull; duckboards &bull; parapet &bull; parados &bull; fire-step',
    timelineMission:
      'Sketch and annotate the zig-zag traverse pattern and low-lying Ypres water table on Milestone 1',
    leftPageQuip:
      'Welcome to Flanders: 500 square miles of fermented pig manure, liquid mud, and artillery with terrifying accuracy.',
    rightPageQuip:
      'Trench drainage tip: If your duckboards are floating, you are no longer in an infantry trench; you are commanding a submarine.',
    linedLeftQuip:
      'Ypres Salient: surrounded on three sides by German artillery on Messines Ridge; duckboards were life preservers.',
    linedRightQuip:
      'Under Arras, 25,000 British soldiers waited in lit chalk tunnels with running water and electric power.',
  },
  {
    lessonIndex: 21,
    lessonNum: 2,
    id: 'lesson_5_2',
    title: 'KT5.2: The Trench Environment: Mud, Vermin & Non-Combat Illnesses',
    specAnchor:
      'Ill health arising from the trench environment: trench foot (pathology, prevention, whale oil); trench fever (body lice, delousing); dysentery (water chlorination, chloride of lime, latrines); underground shelters.',
    sourceIndex: 0,
    sourceBadge: 'SOURCE A',
    sourceSubtitle: 'Contemporary Photographic Evidence • Western Front',
    sourceDate: 'July 1916',
    doNow: [
      {
        q: 'Which French chemist published the Germ Theory of Disease in 1861?',
        a: 'Louis Pasteur',
      },
      {
        q: 'Which German scientist identified the specific bacteria for anthrax (1876) and TB (1882)?',
        a: 'Robert Koch',
      },
      { q: 'Who discovered the smallpox vaccination in 1796?', a: 'Edward Jenner' },
      {
        q: 'Which pioneer transformed sanitation at Scutari Hospital in 1854?',
        a: 'Florence Nightingale',
      },
      {
        q: 'Which Scottish doctor discovered the anaesthetic properties of chloroform in 1847?',
        a: 'James Simpson',
      },
      { q: 'Who pioneered antiseptic carbolic acid spray in surgery in 1865?', a: 'Joseph Lister' },
      {
        q: 'Who proved cholera was waterborne via the Broad Street pump in 1854?',
        a: 'Dr John Snow',
      },
      { q: 'What year was the Second Public Health Act passed in Britain?', a: '1875' },
      {
        q: 'What was the primary danger of static warfare in the low-lying Ypres Salient?',
        a: 'High water table and waterlogged trenches',
      },
      {
        q: 'Why were trenches dug in zig-zag traverses rather than straight lines?',
        a: 'To contain artillery blast and prevent enfilade rifle fire',
      },
    ],
    vocabPrompt:
      'Explain how trench foot differed biologically from trench fever, identifying the distinct cause and preventive measure for each.',
    q1Features: {
      a: {
        q: 'Describe one feature of the methods used to prevent trench foot on the Western Front.',
        hint: 'Consider the buddy-system inspections, grease rubbing routines, and spare sock requirements.',
      },
      b: {
        q: 'Describe one feature of the causes of trench fever among British troops.',
        hint: 'Identify the parasite vector (body lice) and how lice faeces entered scratched skin.',
      },
    },
    tariff: 'Question 2(b): Follow-Up Enquiry Table [4 marks &bull; 5 mins]',
    examStem:
      'Study Source A. How could you follow up Source A to find out more about the living conditions and non-combat illnesses experienced by British soldiers in frontline trenches on the Western Front?',
    q2bData: {
      sourceLetter: 'A',
      detailPrompt:
        'Soldiers huddled asleep on the damp trench floor wrapped in waterproof groundsheets.',
      questionPrompt:
        'What proportion of frontline infantry casualties were evacuated due to non-combat illnesses like trench fever and exhaustion rather than enemy action?',
      sourceTypePrompt:
        'RAMC Divisional Medical Officer monthly sickness returns and battalion casualty logs for the Somme sector in 1916.',
      helpPrompt:
        'This would provide official statistical data proving how many soldiers were incapacitated by trench living conditions, vermin, and exhaustion compared to battle wounds.',
    },
    connectives:
      'A key detail to follow up is... &bull; The question I would ask is... &bull; The specific historical source type needed is... &bull; This source would help answer my question because...',
    wordBank:
      'trench foot &bull; whale oil &bull; buddy-system &bull; gangrene &bull; trench fever &bull; body lice (Pediculus humanus) &bull; delousing stations &bull; dysentery &bull; chloride of lime &bull; latrine inspection',
    timelineMission: 'Draw soldiers applying whale oil and delousing garments on Milestone 2',
    leftPageQuip:
      'Whale oil smells like dead fish and regrets, but it beats having your toes amputated by an RAMC surgeon with a bone-saw.',
    rightPageQuip:
      "Body lice: The only creatures on the Western Front that didn't care about King, Kaiser, or your personal hygiene.",
    linedLeftQuip:
      'Trench foot required 3 pairs of dry socks and rubbing with whale oil; negligence resulted in court martial.',
    linedRightQuip:
      'Body lice lived in uniform seams; delousing machines reduced typhus and trench fever across the British Expeditionary Force.',
  },
  {
    lessonIndex: 22,
    lessonNum: 3,
    id: 'lesson_5_3',
    title: 'KT5.3: Battlefield Trauma: High Explosive Shrapnel, Gas Attacks & Infection',
    specAnchor:
      'Wounds, injuries and diseases: high-explosive artillery shells, shrapnel fragments; infection (gas gangrene, Clostridium welchii, tetanus); head trauma and the Brodie helmet; chemical gas attacks (chlorine, phosgene, mustard gas) and respirators.',
    sourceIndex: 1, // CRITICAL FIX: Source B is the PH Anti-Gas Helmet, matching the gas exam question
    sourceBadge: 'SOURCE B',
    sourceSubtitle: 'Contemporary Photographic Evidence • Machine Gun Corps',
    sourceDate: 'July 1916',
    doNow: [
      {
        q: 'What percentage of Western Front wounds were caused by artillery shells and shrapnel?',
        a: 'Approximately 58%',
      },
      {
        q: 'Which bacterium in heavily manured Flanders soil caused fatal gas gangrene?',
        a: 'Clostridium welchii',
      },
      { q: 'In what year was the British pressed-steel Brodie helmet first issued?', a: '1915' },
      {
        q: 'By what percentage did the Brodie helmet reduce fatal shrapnel head wounds?',
        a: 'Estimated 80%',
      },
      {
        q: 'In which battle did the German Army first deploy chlorine poison gas in April 1915?',
        a: 'Second Battle of Ypres',
      },
      {
        q: 'What emergency measure did British troops use before gas masks were invented?',
        a: 'Urine-soaked cloth pads',
      },
      {
        q: 'Which gas introduced in 1917 caused internal and external blistering and blindness?',
        a: 'Mustard gas',
      },
      { q: 'What antiseptic chemical did Joseph Lister pioneer in 1865?', a: 'Carbolic acid' },
      {
        q: 'Who proved that cholera was caused by contaminated water rather than miasma?',
        a: 'Dr John Snow',
      },
      {
        q: 'What was the daily routine used in British trenches to prevent trench foot?',
        a: 'Rubbing feet with whale oil and changing socks',
      },
    ],
    vocabPrompt:
      'Explain the crucial medical difference between wound contamination from shrapnel and chemical tissue destruction from mustard gas.',
    q1Features: {
      a: {
        q: 'Describe one feature of the effects of poison gas attacks on soldiers on the Western Front.',
        hint: 'Distinguish between chlorine (suffocation/pulmonary oedema), phosgene, and mustard gas (blistering).',
      },
      b: {
        q: 'Describe one feature of the design of the British Brodie steel helmet.',
        hint: 'Consider the pressed-steel construction, shallow brim, and internal lining to deflect shrapnel.',
      },
    },
    tariff: 'Question 2(a): Source Utility Assessment [8 marks &bull; 10 mins]',
    examStem:
      'Study Source B. How useful is Source B for an enquiry into the methods used to protect British soldiers from poison gas attacks on the Western Front? Explain your answer, using Source B and your knowledge of the historical context. [8 marks]',
    provenanceClue:
      'Consider the nature of an authentic British War Office Phenate-Hexamine (PH) anti-gas helmet manufactured in 1915–1916. What physical protective properties does chemically impregnated flannel possess, and what severe combat limitations did it have in battle?',
    structureStrip: [
      {
        col: '1. CONTENT & ARTIFACT UTILITY',
        text: 'Explain how the PH hood protected against chlorine and phosgene, featuring glass eyepieces and an exhalation valve.',
      },
      {
        col: '2. PROVENANCE & MOTIVE',
        text: 'Evaluate the artifact: official War Office standard issue, demonstrating rapid British industrial response to chemical warfare.',
      },
      {
        col: '3. CONTEXT & COMBAT LIMITS',
        text: 'Cross-reference with knowledge: hot, suffocating, prone to fogging, and completely ineffective against mustard gas introduced in 1917.',
      },
    ],
    connectives:
      'Source B is useful for investigating gas defence because... &bull; Specifically, the physical helmet proves that... &bull; In terms of provenance, as a standard-issue War Office artifact... &bull; However, Source B is limited because it cannot show... &bull; Consequently...',
    wordBank:
      'high-explosive artillery &bull; shrapnel balls &bull; gas gangrene &bull; Clostridium welchii &bull; Brodie steel helmet &bull; chlorine gas (1915) &bull; phosgene &bull; mustard gas (1917) &bull; PH helmet &bull; Small Box Respirator (1916)',
    timelineMission: 'Sketch the Brodie steel helmet and British PH gas hood on Milestone 2',
    leftPageQuip:
      'The Brodie helmet: Looks like an upside-down soup bowl, but prevents your skull from becoming one.',
    rightPageQuip:
      'Chlorine gas: If it smells like rotten pineapple and bleaches the grass, do NOT inhale—unless you fancy drowning in your own lungs.',
    linedLeftQuip:
      'The 1915 Brodie helmet slashed penetrating head wounds by 75%; shrapnel helmets became universal equipment.',
    linedRightQuip:
      'Small Box Respirators with charcoal filters neutralized chlorine and phosgene, though mustard gas still blistered through clothing.',
  },
  {
    lessonIndex: 23,
    lessonNum: 4,
    id: 'lesson_5_4',
    title: 'KT5.4: The Chain of Evacuation: Stretcher Bearers, RAP, Dressing Stations & CCS',
    specAnchor:
      'The work of the RAMC and FANY: the Chain of Evacuation (stretcher bearers, Regimental Aid Posts, Field Ambulances and Dressing Stations, Casualty Clearing Stations, Base Hospitals); triage systems; transport methods (motor ambulances, ambulance trains, canal barges).',
    sourceIndex: 0,
    sourceBadge: 'SOURCE A',
    sourceSubtitle: 'Contemporary Photographic Evidence • Western Front',
    sourceDate: 'August 1917',
    doNow: [
      {
        q: 'How many stretcher bearers were assigned to an infantry battalion of 1,000 men?',
        a: '16 stretcher bearers',
      },
      {
        q: 'How many bearers were typically required to carry one wounded man in Passchendaele mud?',
        a: '4 to 6 bearers',
      },
      {
        q: 'How far behind the frontline was a Regimental Aid Post (RAP) usually located?',
        a: '200 to 300 yards',
      },
      {
        q: 'Could major surgery be performed at a Regimental Aid Post?',
        a: 'No (only first aid and bandaging)',
      },
      {
        q: 'Which medical unit operated Advanced and Main Dressing Stations (ADS/MDS)?',
        a: 'RAMC Field Ambulance',
      },
      {
        q: 'What station in the evacuation chain was the primary surgical center near rail lines?',
        a: 'Casualty Clearing Station (CCS)',
      },
      {
        q: 'What three triage categories were used at Casualty Clearing Stations?',
        a: 'The Walking Wounded, Immediate Surgery, The Moribund',
      },
      {
        q: 'What female voluntary organisation drove motor ambulances on the Western Front?',
        a: 'First Aid Nursing Yeomanry (FANY)',
      },
      {
        q: 'Why were canal barges preferred for transporting chest and brain wound patients?',
        a: 'Provided smooth, vibration-free travel',
      },
      {
        q: 'Where were large British Base Hospitals located in France?',
        a: 'Coastal ports (Boulogne, Le Touquet, Calais)',
      },
    ],
    vocabPrompt:
      'Explain why the triage classification system at Casualty Clearing Stations was necessary when dealing with mass-casualty offensives.',
    q1Features: {
      a: {
        q: 'Describe one feature of the triage system used at Casualty Clearing Stations on the Western Front.',
        hint: 'Explain how casualties were sorted into Walking Wounded, Immediate Surgery, and Moribund to maximize survival.',
      },
      b: {
        q: 'Describe one feature of the work of the First Aid Nursing Yeomanry (FANY) on the Western Front.',
        hint: 'Consider ambulance driving, mobile soup kitchens, and transporting wounded through artillery fire.',
      },
    },
    tariff: 'Question 2(b): Follow-Up Enquiry Table [4 marks &bull; 5 mins]',
    examStem:
      'Study Source A. How could you follow up Source A to find out more about the difficulties stretcher bearers faced evacuating casualties from the Western Front?',
    q2bData: {
      sourceLetter: 'A',
      detailPrompt:
        'A team of six stretcher bearers struggling through deep, liquid mud to evacuate a wounded soldier on a wooden stretcher near Boesinghe.',
      questionPrompt:
        'What was the average time taken to evacuate a casualty from the frontline sap to the RAP and Dressing Station during the Third Battle of Ypres?',
      sourceTypePrompt:
        'RAMC Battalion Medical Officer war diaries and Field Ambulance stretcher bearer logs from the Ypres sector in autumn 1917.',
      helpPrompt:
        'This would reveal exact transport durations, bearer casualty rates, and whether delays caused fatal haemorrhagic shock.',
    },
    connectives:
      'A key detail to follow up is... &bull; The question I would ask is... &bull; The specific historical source type needed is... &bull; This source would help answer my question because...',
    wordBank:
      'RAMC &bull; FANY &bull; Regimental Aid Post &bull; Advanced Dressing Station &bull; Casualty Clearing Station &bull; Base Hospital &bull; triage system &bull; motor ambulance &bull; hospital train &bull; canal barge',
    timelineMission: 'Draw the 6 sequential stages of the Chain of Evacuation on Milestone 5',
    leftPageQuip:
      'The Regimental Aid Post: 200 yards from the German front line, lit by candle-ends, and smelling entirely of iodine and panic.',
    rightPageQuip:
      'Motor ambulances: Guaranteed to rattle every uninjured bone in your body while speeding you to the Casualty Clearing Station.',
    linedLeftQuip:
      'From Stretcher Bearer to RAP, ADS, and CCS: the 1917 evacuation chain prioritized speed to combat wound sepsis.',
    linedRightQuip:
      'Casualty Clearing Stations performed triage and emergency abdominal surgery before infection overwhelmed damaged organs.',
  },
  {
    lessonIndex: 24,
    lessonNum: 5,
    id: 'lesson_5_5',
    title: 'KT5.5: Surgical Breakthroughs: The Thomas Splint, Wound Debridement & Mobile X-Rays',
    specAnchor:
      'Medical advances on the Western Front: the Thomas Splint (Hugh Owen Thomas, Robert Jones) reducing compound femur mortality; wound debridement and delayed primary closure; the Carrel-Dakin antiseptic irrigation method; mobile X-ray units and radiology.',
    sourceIndex: 0,
    sourceBadge: 'SOURCE A',
    sourceSubtitle: 'Contemporary Medical Artifact • Standard Issue',
    sourceDate: 'c.1916',
    doNow: [
      {
        q: 'What was the mortality rate for compound femur fractures in 1914 before the Thomas Splint?',
        a: '80%',
      },
      {
        q: 'Who introduced the Thomas Splint to frontline medical officers in December 1915?',
        a: 'Robert Jones',
      },
      {
        q: 'To what percentage did the Thomas Splint reduce compound femur mortality by 1916?',
        a: '20%',
      },
      {
        q: 'How did the Thomas Splint prevent fatal internal haemorrhage in fractured thighs?',
        a: 'Applied mechanical traction to pull bone ends apart',
      },
      {
        q: 'What surgical term describes cutting away dead, infected tissue from a gunshot wound?',
        a: 'Wound debridement (wound excision)',
      },
      {
        q: 'What antiseptic irrigation solution was used continuously through perforated rubber tubes?',
        a: 'Carrel-Dakin solution',
      },
      {
        q: 'Why did Carrel-Dakin solution need to be made fresh in laboratories every 6 hours?',
        a: 'It degraded quickly and lost antiseptic potency',
      },
      { q: 'Who discovered X-rays in Germany in 1895?', a: 'Wilhelm Röntgen' },
      {
        q: 'Name one limitation of mobile X-ray units used at Casualty Clearing Stations.',
        a: 'Could not detect fabric or clothing fragments driven into wounds',
      },
      {
        q: 'What was the role of Marie Curie in mobile radiology during the Great War?',
        a: 'Equipped mobile X-ray vans (‘Petites Curies’) on the Western Front',
      },
    ],
    vocabPrompt:
      'Explain how wound debridement combined with Carrel-Dakin irrigation prevented fatal gas gangrene in high-explosive wounds.',
    q1Features: {
      a: {
        q: 'Describe one feature of the Thomas Splint used on the Western Front.',
        hint: 'Explain the padded metal ring fitted against the groin and the windlass traction system on the foot.',
      },
      b: {
        q: 'Describe one feature of the Carrel-Dakin method of treating infected wounds.',
        hint: 'Explain the system of perforated rubber tubes irrigating the deep wound with sodium hypochlorite bleach.',
      },
    },
    tariff: 'Question 2(a): Source Utility Assessment [8 marks &bull; 10 mins]',
    examStem:
      'Study Source A. How useful is Source A for an enquiry into the methods used to treat wounded soldiers with fractured limbs on the Western Front? Explain your answer, using Source A and your knowledge of the historical context. [8 marks]',
    provenanceClue:
      'Consider the nature of an authentic instructional photograph taken in an RAMC military hospital training ward c.1916. What does it demonstrate about mechanical traction and splinting, and why might an instructional training photograph differ from emergency frontline conditions in a mud dugout?',
    structureStrip: [
      {
        col: '1. CONTENT & UTILITY',
        text: 'Explain how Source A illustrates the Thomas Splint: groin ring, steel framework, and traction cord pulling the leg taut to prevent bone grinding.',
      },
      {
        col: '2. PROVENANCE & TONE',
        text: 'Evaluate the photograph: produced for medical training manuals, demonstrating correct surgical application under clean, controlled conditions.',
      },
      {
        col: '3. CONTEXT & LIMITS',
        text: 'Cross-reference with knowledge: Robert Jones 1915, 80% down to 20% mortality; note limitations—photograph cannot convey agony or muddy dugout application.',
      },
    ],
    connectives:
      'Source A is useful for an enquiry into limb treatments because... &bull; Specifically, the photograph demonstrates... &bull; In terms of provenance, as an RAMC instructional image... &bull; However, the source is limited because... &bull; Therefore...',
    wordBank:
      'Thomas Splint &bull; Hugh Owen Thomas &bull; Robert Jones &bull; compound fracture &bull; femoral artery &bull; mechanical traction &bull; wound debridement &bull; Carrel-Dakin solution &bull; delayed primary closure &bull; mobile X-ray unit',
    timelineMission: 'Sketch the Thomas Splint groin ring and traction cord on Milestone 3',
    leftPageQuip:
      'The Thomas Splint: Before Robert Jones introduced it, an 80% chance of death; after Jones, an 80% chance of living to complain about the food.',
    rightPageQuip:
      'Carrel-Dakin solution: If it burns like liquid fire and smells like a Victorian washhouse, congratulations—it is killing the gas gangrene.',
    linedLeftQuip:
      'The Thomas Splint immobilized compound femur fractures; mortality dropped from 80% to 20% in two years.',
    linedRightQuip:
      'Mobile X-ray units located shrapnel; Carrel-Dakin saline irrigation prevented anaerobic gas gangrene in massive wounds.',
  },
  {
    lessonIndex: 25,
    lessonNum: 6,
    id: 'lesson_5_6',
    title: 'KT5.6: Lifesaving Innovations: Blood Storage, Brain Surgery & Plastic Reconstruction',
    specAnchor:
      'Medical advances on the Western Front: blood transfusions and storage (Landsteiner, Hustin, Rous and Turner, Captain Oswald Robertson and the Cambrai blood bank); specialized neurosurgery (Harvey Cushing); plastic and facial reconstruction (Harold Gillies, Queen’s Hospital Sidcup, tubed pedicle).',
    sourceIndex: 0,
    sourceBadge: 'SOURCE A',
    sourceSubtitle: 'Primary Medical Artifact • Cambrai Blood Depot',
    sourceDate: '1917',
    doNow: [
      { q: 'Who discovered the main ABO blood groups in Vienna in 1901?', a: 'Karl Landsteiner' },
      {
        q: 'What chemical was discovered by Albert Hustin in 1914 to prevent blood clotting?',
        a: 'Sodium citrate',
      },
      {
        q: 'What substance did Rous and Turner add in 1916 to preserve blood for up to 4 weeks?',
        a: 'Glucose (dextrose)',
      },
      {
        q: 'Who established the world’s first stored blood depot at the Battle of Cambrai in 1917?',
        a: 'Captain Oswald Robertson',
      },
      {
        q: 'What blood group was chosen for universal transfusion in Robertson’s blood depot?',
        a: 'Group O',
      },
      {
        q: 'Which American surgeon pioneered precise neurosurgery using local anaesthetic on the Western Front?',
        a: 'Harvey Cushing',
      },
      {
        q: 'To what percentage did Harvey Cushing reduce brain surgery mortality in 1917?',
        a: 'From 54% to 29%',
      },
      {
        q: 'Which New Zealand-born surgeon pioneered facial reconstructive plastic surgery at Sidcup?',
        a: 'Harold Gillies',
      },
      {
        q: 'What surgical skin-transfer technique did Harold Gillies invent in 1917?',
        a: 'The tubed pedicle graft',
      },
      {
        q: 'What hospital in Kent became the world centre for British plastic facial reconstruction?',
        a: 'Queen’s Hospital, Sidcup',
      },
    ],
    vocabPrompt:
      'Explain how sodium citrate combined with refrigeration revolutionized blood transfusion between 1914 and 1917.',
    q1Features: {
      a: {
        q: 'Describe one feature of the blood depot established by Oswald Robertson at the Battle of Cambrai in 1917.',
        hint: 'Consider the use of sodium citrate, ice chests, Type O blood, and treating shock before surgery.',
      },
      b: {
        q: 'Describe one feature of the surgical methods used by Harold Gillies at Queen’s Hospital, Sidcup.',
        hint: 'Explain the tubed pedicle method of maintaining blood supply while grafting facial tissue.',
      },
    },
    tariff: 'Question 2(b): Follow-Up Enquiry Table [4 marks &bull; 5 mins]',
    examStem:
      'Study Source A. How could you follow up Source A to find out more about the success of stored blood transfusions at the Battle of Cambrai in 1917?',
    q2bData: {
      sourceLetter: 'A',
      detailPrompt:
        'Captain Oswald Robertson’s portable blood storage chest and glass transfusion bottles packed in ice.',
      questionPrompt:
        'What percentage of severely shocked casualties survived after receiving stored blood transfusions at Cambrai?',
      sourceTypePrompt:
        'RAMC Third Army medical report and clinical case records authored by Captain Oswald Robertson in November 1917.',
      helpPrompt:
        'This would provide empirical survival data comparing outcomes of refrigerated citrated blood versus direct donor transfusions.',
    },
    connectives:
      'A key detail to follow up is... &bull; The question I would ask is... &bull; The specific historical source type needed is... &bull; This source would help answer my question because...',
    wordBank:
      'Karl Landsteiner &bull; ABO blood groups &bull; sodium citrate (Hustin 1914) &bull; glucose preservative (Rous & Turner 1916) &bull; Oswald Robertson &bull; Battle of Cambrai (1917) &bull; blood depot &bull; Harvey Cushing &bull; Harold Gillies &bull; tubed pedicle graft',
    timelineMission:
      'Sketch Oswald Robertson’s iced blood chest and Harold Gillies’ tubed pedicle on Milestone 6',
    leftPageQuip:
      "Robertson's Blood Depot: Ice chests, sodium citrate, and refrigerated blood at Cambrai—proof that cold beer isn't the only thing worth chilling.",
    rightPageQuip:
      'Harold Gillies at Sidcup: Turning shattered faces into men again with tubed pedicle skin grafts, while patients politely pretended not to notice.',
    linedLeftQuip:
      'Oswald Robertson stored blood in iced chests with sodium citrate and glucose at Cambrai in 1917, saving dying men from shock.',
    linedRightQuip:
      'At Queen’s Hospital Sidcup, Harold Gillies designed pedicle skin tubes to reconstruct faces shattered by artillery shrapnel.',
  },
];

// ============================================================================
// MAIN GENERATOR FUNCTION: 16-PAGE TWO-PAGE SPREAD WORKBOOK
// ============================================================================
function buildWesternFrontTwoPageWorkbook(unitData, period) {
  const lessons = unitData.lessons;

  // Resolve cover image base64
  const coverImgBase64 =
    getBase64Image('/units/edexcel_medicine/assets/authentic_western_front.jpg') ||
    getBase64Image('/images/stretcher_bearers_passchendaele.jpg') ||
    '';

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Key Topic 5: The British Sector of the Western Front Workbook</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&display=swap" rel="stylesheet">
  <style>
    *, *:before, *:after { box-sizing: border-box; }
    /* Print Offset for Saddle-Stitch Booklet Binding (3mm alternating inner margin) */
    @page {
      size: A4 portrait;
      margin: 10mm 10mm 12mm 10mm;
    }
    @page:left {
      margin-top: 10mm;
      margin-bottom: 12mm;
      margin-left: 7mm;
      margin-right: 13mm; /* 3mm inner gutter on right for verso staple fold */
    }
    @page:right {
      margin-top: 10mm;
      margin-bottom: 12mm;
      margin-left: 13mm; /* 3mm inner gutter on left for recto staple fold */
      margin-right: 7mm;
    }
    body {
      font-family: 'Georgia', 'Garamond', serif;
      font-size: 8.5pt;
      line-height: 1.32;
      color: #000000;
      margin: 0;
      padding: 0;
      background: #ffffff;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    h1, h2, h3, h4, h5, h6, strong, th, .sans {
      font-family: 'Inter', -apple-system, sans-serif;
    }
    /* Page Container: Zero outer border, pure flex distribution for optimal page budget */
    .page, .page-container {
      width: 100%;
      height: 272mm;
      max-height: 272mm;
      overflow: hidden;
      box-sizing: border-box;
      position: relative;
      page-break-after: always;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 3mm 4mm;
      background: #ffffff;
    }
    .page:last-child, .page-container:last-child {
      page-break-after: auto;
    }
    /* Full flex section container for interior distribution */
    .page-body-full {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    /* Clean Task Section Spacing */
    .task-section {
      margin-bottom: 5px;
      padding-bottom: 0;
    }
    .task-section-divider {
      border-bottom: 1.2px solid #000000;
      padding-bottom: 4px;
      margin-bottom: 4px;
    }
    /* Standard Handwriting Writing Lines */
    .task-line {
      border-bottom: 1.2px solid #000000;
      height: 7.8mm;
      width: 100%;
      box-sizing: border-box;
      margin: 0;
    }
    .task-line-dotted {
      border-bottom: 1.2px dotted #000000;
      height: 7.4mm;
      width: 100%;
      box-sizing: border-box;
      margin: 0;
    }
    .ruled-lines-block {
      display: flex;
      flex-direction: column;
      gap: 0;
      margin: 1px 0;
    }
    /* Clean Lined Paper Grid for Extended Writing Pages (28 ruled lines per page) */
    .lined-page-grid {
      display: flex;
      flex-direction: column;
      flex: 1;
      margin: 2px 0 3px 0;
      border-top: 1.2px solid #000000;
    }
    .lined-row {
      display: flex;
      flex: 1;
      min-height: 0;
      border-bottom: 1.2px solid #000000;
      box-sizing: border-box;
    }
    .lined-margin-cell {
      width: 22mm;
      border-right: 1.2px solid #000000;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      padding-left: 2px;
      box-sizing: border-box;
    }
    .lined-content-cell {
      flex: 1;
      display: flex;
      align-items: center;
      padding-left: 6px;
      box-sizing: border-box;
    }
    /* Single-Line Page Footer with Page Number & Humorous Revision Quip */
    .page-footer-strip {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 0.5px solid #d0d0d0;
      padding-top: 1.5px;
      margin-top: 2px;
      font-family: 'Inter', sans-serif;
      font-size: 6.4pt;
      line-height: 1.15;
      color: #666666;
    }
    .footer-quip {
      font-style: italic;
      color: #666666;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .footer-page-num {
      font-family: 'Inter', sans-serif;
      font-weight: 700;
      white-space: nowrap;
      color: #000000;
      font-size: 6.8pt;
    }
    .archival-box {
      border: 1.2px solid #000000;
      border-radius: 3px;
      padding: 3px 5px;
      background: #ffffff;
      margin-bottom: 3px;
    }
    /* Commercial School Brand Customizer */
    [data-department-name]:not([data-department-name=""]):not([data-department-name="The History Department"]):not([data-department-name="History Department"]) .school-brand-target {
      display: inline-block;
      font-size: 0 !important;
    }
    [data-department-name]:not([data-department-name=""]):not([data-department-name="The History Department"]):not([data-department-name="History Department"]) .school-brand-target::after {
      content: attr(data-department-name);
      font-size: 11pt !important;
      letter-spacing: 2px;
    }
  </style>
</head>
<body>
`;

  // ====================================================================
  // PAGE 1: FRONT COVER (Canonical Archival Standard, Zero AI Fluff)
  // ====================================================================
  html += `
  <div class="page page-container recto-page" id="page-1" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      
      <!-- Top Departmental Branding with Customizer Hook -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #000000; padding-bottom: 4px; margin-bottom: 6px;">
        <div data-department-name="The History Department">
          <span style="font-family: 'Inter', sans-serif; font-size: 11pt; font-weight: 900; color: #000000; text-transform: uppercase; letter-spacing: 1px;">
            <span class="school-brand-target">The History Department</span>
          </span>
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 8.5pt; font-weight: 700; color: #000000;">
          EDEXCEL GCSE (9–1) HISTORY &bull; PAPER 1 SECTION A
        </div>
      </div>

      <!-- Pupil Details Strip -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 6px 12px; background: #ffffff; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 14px; align-items: center; margin-bottom: 8px;">
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #000000; text-transform: uppercase; margin-right: 8px;">Pupil Name:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #000000; height: 14px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #000000; text-transform: uppercase; margin-right: 8px;">Class:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #000000; height: 14px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #000000; text-transform: uppercase; margin-right: 8px;">Teacher:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #000000; height: 14px;"></div>
        </div>
      </div>

      <!-- Main Title Block -->
      <div style="text-align: center; margin: 2px 0 6px 0;">
        <div style="display: inline-block; border: 1.5px solid #000000; color: #000000; font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; padding: 2px 10px; border-radius: 3px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 3px; background: #ffffff;">
          Key Topic 5 &bull; 1914–1918
        </div>
        <h1 style="font-family: 'Playfair Display', serif; font-size: 21pt; line-height: 1.15; color: #000000; margin: 2px 0 2px 0; font-weight: 900;">
          The British Sector of the Western Front, 1914–1918
        </h1>
        <div style="font-family: 'Georgia', serif; font-size: 10pt; color: #222222; font-style: italic; font-weight: 600;">
          Injuries, Treatment and the Trenches in the British Sector
        </div>
      </div>

      <!-- Prominent Primary Visual Source Centerpiece (Base64 Inlined) -->
      <div style="margin: 2px 0 5px 0; border: 1.5px solid #000000; border-radius: 4px; overflow: hidden; background: #ffffff;">
        <img src="${coverImgBase64}" alt="RAMC Stretcher Bearers Carrying Casualty at Passchendaele" style="width: 100%; height: 86mm; object-fit: cover; object-position: center 35%; display: block; margin: 0 auto; filter: grayscale(100%);">
        <div style="display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #000000; padding: 3px 8px; border-top: 1.5px solid #000000; background: #ffffff;">
          <span><strong>Primary Visual Evidence:</strong> <em>RAMC Stretcher Bearers navigating mud at Passchendaele</em> &bull; Third Battle of Ypres (1917)</span>
          <span style="font-weight: 700;">CONTEMPORARY PHOTOGRAPHIC ARCHIVE</span>
        </div>
      </div>

      <!-- Edexcel Paper 1 Section A Specification Overview & Exam Strategy -->
      <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 7px 8px; background: #fbfbfb; margin: 4px 0 7px 0; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px;">
        <div style="border-right: 1px solid #000000; padding-right: 6px;">
          <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; color: #000000;">
            1. Feature Drills [4m]
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 6.8pt; line-height: 1.2; color: #222222; margin-top: 1px;">
            Q1(a) &amp; Q1(b): Two 2-mark questions. Identify 1 specific feature + 1 supporting factual detail (5 mins).
          </div>
        </div>
        <div style="border-right: 1px solid #000000; padding-right: 6px;">
          <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; color: #000000;">
            2. Source Utility [8m]
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 6.8pt; line-height: 1.2; color: #222222; margin-top: 1px;">
            Q2(a): 3-step evaluation of Content, Provenance (Nature, Origin, Motive), and Contextual Limitations (10 mins).
          </div>
        </div>
        <div>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; color: #000000;">
            3. Follow-Up Enquiry [4m]
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 6.8pt; line-height: 1.2; color: #222222; margin-top: 1px;">
            Q2(b): 4-row tabular enquiry: Detail, Historical Question, Source Type, and Clinical Value (5 mins).
          </div>
        </div>
      </div>

      <!-- Course Specification Curriculum Tracking Table -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; overflow: hidden; margin: 2px 0 2px 0;">
        <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif;">
          <thead>
            <tr style="border-bottom: 1.5px solid #000000; background: #000000; color: #ffffff;">
              <th style="padding: 6px 10px; text-align: left; font-size: 8pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; border-right: 1.2px solid #444444;">
                Course Specification &bull; Key Enquiry Sequence (1914–1918)
              </th>
              <th style="padding: 4px; width: 68px; text-align: center; font-size: 7.6pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; border-right: 1.2px solid #444444;">
                Learnt
              </th>
              <th style="padding: 4px; width: 68px; text-align: center; font-size: 7.6pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px;">
                Revised
              </th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 8.5px 10px; border-right: 1.2px solid #000000;">
                <div style="font-size: 8.2pt; font-weight: 800; color: #000000; line-height: 1.2;">
                  Key Topic 5.1: The Theatre of War: The British Sector, Trench Geography &amp; Battles
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.5pt; font-style: italic; color: #333333; margin-top: 1px; line-height: 1.2;">
                  Why were trenches designed in zig-zag traverses, and how did terrain at Ypres, Somme, and Arras affect medical treatment?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #000000;">
                <div style="width: 14px; height: 14px; border: 1.5px solid #000000; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 14px; height: 14px; border: 1.5px solid #000000; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 8.5px 10px; border-right: 1.2px solid #000000;">
                <div style="font-size: 8.2pt; font-weight: 800; color: #000000; line-height: 1.2;">
                  Key Topic 5.2: The Trench Environment: Mud, Vermin &amp; Non-Combat Illnesses
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.5pt; font-style: italic; color: #333333; margin-top: 1px; line-height: 1.2;">
                  How did frontline conditions cause trench foot, trench fever, and dysentery, and what preventive routines were enforced?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #000000;">
                <div style="width: 14px; height: 14px; border: 1.5px solid #000000; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 14px; height: 14px; border: 1.5px solid #000000; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 8.5px 10px; border-right: 1.2px solid #000000;">
                <div style="font-size: 8.2pt; font-weight: 800; color: #000000; line-height: 1.2;">
                  Key Topic 5.3: Battlefield Trauma: High Explosive Shrapnel, Gas Attacks &amp; Infection
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.5pt; font-style: italic; color: #333333; margin-top: 1px; line-height: 1.2;">
                  Why did explosive artillery produce gas gangrene, and how did the Brodie steel helmet and respirators reduce fatalities?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #000000;">
                <div style="width: 14px; height: 14px; border: 1.5px solid #000000; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 14px; height: 14px; border: 1.5px solid #000000; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 8.5px 10px; border-right: 1.2px solid #000000;">
                <div style="font-size: 8.2pt; font-weight: 800; color: #000000; line-height: 1.2;">
                  Key Topic 5.4: The Chain of Evacuation: Stretcher Bearers, RAP, Dressing Stations &amp; CCS
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.5pt; font-style: italic; color: #333333; margin-top: 1px; line-height: 1.2;">
                  How did the RAMC and FANY evacuate wounded soldiers through six stations, and why was triage critical at CCSs?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #000000;">
                <div style="width: 14px; height: 14px; border: 1.5px solid #000000; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 14px; height: 14px; border: 1.5px solid #000000; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 8.5px 10px; border-right: 1.2px solid #000000;">
                <div style="font-size: 8.2pt; font-weight: 800; color: #000000; line-height: 1.2;">
                  Key Topic 5.5: Surgical Breakthroughs: The Thomas Splint, Wound Debridement &amp; Mobile X-Rays
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.5pt; font-style: italic; color: #333333; margin-top: 1px; line-height: 1.2;">
                  How did the Thomas Splint slash femur mortality from 80% to 20%, and why was Carrel-Dakin irrigation necessary?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #000000;">
                <div style="width: 14px; height: 14px; border: 1.5px solid #000000; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 14px; height: 14px; border: 1.5px solid #000000; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
            <tr>
              <td style="padding: 8.5px 10px; border-right: 1.2px solid #000000;">
                <div style="font-size: 8.2pt; font-weight: 800; color: #000000; line-height: 1.2;">
                  Key Topic 5.6: Lifesaving Innovations: Blood Storage, Brain Surgery &amp; Plastic Reconstruction
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.5pt; font-style: italic; color: #333333; margin-top: 1px; line-height: 1.2;">
                  How did Oswald Robertson establish the first blood bank at Cambrai, and how did Gillies rebuild shattered faces at Sidcup?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #000000;">
                <div style="width: 14px; height: 14px; border: 1.5px solid #000000; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 14px; height: 14px; border: 1.5px solid #000000; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      ${renderFooterStrip(1, quipList[0], 28)}
    </div>
  </div>
`;

  // ====================================================================
  // PAGES 2–3: LIVING TIMELINE SPREAD (2 Pages, Zero Exam Synthesis)
  // ====================================================================
  html += `
  <!-- PAGE 2: LIVING TIMELINE PART 1 (MILESTONES 1–3: 1914–1915) -->
  <div class="page page-container verso-page" id="page-2" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div>
        <div style="border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 5px;">
          <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 11pt; color: #000000; text-transform: uppercase; font-weight: 800;">
            Living Timeline &bull; Part 1: Frontline Conditions &amp; Early Trauma (1914–1915)
          </h2>
        </div>

        <div style="border-bottom: 1px solid #000000; padding-bottom: 4px; margin-bottom: 6px; font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #000000;">
          <strong>Instructions:</strong> As you study each enquiry lesson, complete the timeline missions by sketching and annotating in the corresponding Key Topic boxes below.
        </div>
      </div>

      <!-- 3 Spacious Milestones with Large Blank Dual-Coding Workspace -->
      <div style="display: flex; flex-direction: column; gap: 6px; flex: 1; justify-content: space-between;">

        <!-- Milestone 1: 1914 -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 5px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #000000;">
                OCT–NOV 1914 &bull; 1st Battle of Ypres &amp; The Onset of Static Trench Warfare
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Key Topic 5.1</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.22;">
              The mobile war ends as both armies dig continuous defensive lines from the English Channel to Switzerland. British troops defend the vulnerable, low-lying Ypres Salient, surrounded on three sides by German artillery on high ground, with an impenetrable clay water table just two feet below the surface.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 48mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>

        <!-- Milestone 2: 1915 -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 5px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #000000;">
                1915 &bull; Chlorine Gas at 2nd Ypres &amp; The Brodie Steel Helmet
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Key Topic 5.2 &bull; 5.3</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.22;">
              In April 1915, the German Army launches the first chemical chlorine gas cloud attack at 2nd Ypres, causing fatal pulmonary oedema. Soldiers improvise urine pads before British PH flannel hoods are issued. John Brodie patents the pressed-steel helmet in late 1915, slashing fatal head wounds by 80%.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 48mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>

        <!-- Milestone 3: DEC 1915 -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 5px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #000000;">
                DEC 1915 &bull; Robert Jones Introduces the Thomas Splint
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Key Topic 5.5</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.22;">
              Compound femur fractures from artillery shrapnel carry an 80% death rate due to muscle spasm driving bone ends through femoral arteries. Robert Jones trains frontline RAMC officers to fit Hugh Owen Thomas’s splint at the aid post, applying mechanical traction to pull bone ends straight and slashing mortality to 20%.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 48mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>

      </div>

      ${renderFooterStrip(2, quipList[1], 28)}
    </div>
  </div>

  <!-- PAGE 3: LIVING TIMELINE PART 2 (MILESTONES 4–6: 1916–1918) -->
  <div class="page page-container recto-page" id="page-3" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div>
        <div style="border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 5px;">
          <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 11pt; color: #000000; text-transform: uppercase; font-weight: 800;">
            Living Timeline &bull; Part 2: Surgical Innovation &amp; Blood Storage (1916–1918)
          </h2>
        </div>

        <div style="border-bottom: 1px solid #000000; padding-bottom: 4px; margin-bottom: 6px; font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #000000;">
          <strong>Instructions:</strong> As you study each enquiry lesson, complete the timeline missions by sketching and annotating in the corresponding Key Topic boxes below.
        </div>
      </div>

      <!-- 3 Spacious Milestones with Large Blank Dual-Coding Workspace -->
      <div style="display: flex; flex-direction: column; gap: 6px; flex: 1; justify-content: space-between;">

        <!-- Milestone 4: JULY 1916 -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 5px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #000000;">
                JULY 1916 &bull; Battle of the Somme, Debridement &amp; Carrel-Dakin Irrigation
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Key Topic 5.1 &bull; 5.5</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.22;">
              The British Army suffers 57,470 casualties on Day 1 of the Somme, overwhelming Casualty Clearing Stations. Surgeons abandon Listerian superficial antiseptics for wide wound debridement (excision) to excise dead necrotic tissue before anaerobic gas gangrene develops, coupled with continuous Carrel-Dakin bleach irrigation.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 48mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>

        <!-- Milestone 5: 1917 -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 5px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #000000;">
                1917 &bull; Arras Underground Hospital &amp; The Mud Logistics of Passchendaele
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Key Topic 5.1 &bull; 5.4</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.22;">
              At Arras, New Zealand tunnelers excavate Thompson’s Cave—a 700-bed underground hospital with operating theatres, running water, and electric lights 20m beneath the chalk. At 3rd Ypres (Passchendaele), artillery destroys all drainage systems, creating knee-deep liquid mud requiring 6 bearers per stretcher.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 48mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>

        <!-- Milestone 6: NOV 1917 -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 5px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #000000;">
                NOV 1917 &bull; Oswald Robertson’s Blood Depot &amp; Gillies Facial Reconstruction
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Key Topic 5.6</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.22;">
              At the Battle of Cambrai, Captain Oswald Robertson deploys the world’s first blood bank, using sodium citrate to stop clotting, glucose to preserve red cells, and ice chests to store Group O blood for 28 days. In Britain, Harold Gillies pioneers plastic facial surgery using tubed pedicles at Queen’s Hospital, Sidcup.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 48mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>

      </div>

      ${renderFooterStrip(3, quipList[2], 28)}
    </div>
  </div>
`;

  // ====================================================================
  // PAGES 4–27: 6 DEDICATED FOUR-PAGE SPREADS (LESSONS 5.1 TO 5.6)
  // ====================================================================
  wfConfigs.forEach((cfg) => {
    const lesson = lessons[cfg.lessonIndex];
    const leftPageNum = (cfg.lessonNum - 1) * 4 + 4; // Pages 4, 8, 12, 16, 20, 24
    const rightPageNum = (cfg.lessonNum - 1) * 4 + 5; // Pages 5, 9, 13, 17, 21, 25
    const linedLeftPageNum = (cfg.lessonNum - 1) * 4 + 6; // Pages 6, 10, 14, 18, 22, 26
    const linedRightPageNum = (cfg.lessonNum - 1) * 4 + 7; // Pages 7, 11, 15, 19, 23, 27

    // Select the correct primary source for this lesson enquiry
    const sIdx = cfg.sourceIndex !== undefined ? cfg.sourceIndex : 0;
    const primarySource = lesson.sources[sIdx] || lesson.sources[0];

    // Resolve base64 image data URI for rock-solid embedding
    const b64Img = getBase64Image(primarySource.src) || primarySource.src;

    // ------------------------------------------------------------------
    // LEFT PAGE: 10 DO NOW + VOCAB APPLICATION (4 LINES) + 2x Q1 FULL FEATURE DRILLS
    // ------------------------------------------------------------------
    html += `
  <div class="page page-container verso-page" id="page-${leftPageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      
      <!-- Lesson Header -->
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 5px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 11pt; color: #000000; margin: 0; font-weight: 800;">
          ${cfg.title}
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
          Knowledge Retrieval &bull; Key Vocabulary &bull; Exam Practice
        </span>
      </div>

      <!-- 10-Question Do Now Retrieval Drill -->
      <div class="task-section task-section-divider">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; text-transform: uppercase; letter-spacing: 0.5px;">
            &bull; 'Do Now' Retrieval Drill (10 Recall Questions)
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 800; border: 1.2px solid #000000; padding: 1px 6px; border-radius: 3px;">
            Score: [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 10 ]
          </span>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3px 14px;">
          ${cfg.doNow
            .map(
              (item, idx) => `
          <div>
            <div style="font-family: 'Inter', sans-serif; font-size: 7.3pt; font-weight: 700; color: #000000; line-height: 1.15;">
              ${idx + 1}. ${item.q}
            </div>
            <div class="task-line-dotted"></div>
          </div>
          `,
            )
            .join('')}
        </div>
      </div>

      <!-- Key Vocabulary Task (4 Handwriting Lines to eliminate underflow) -->
      <div class="task-section task-section-divider">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; text-transform: uppercase; letter-spacing: 0.5px;">
            &bull; Key Vocabulary Application Task
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 700; border: 1px solid #000000; padding: 0 4px; border-radius: 2px;">TERMINOLOGY</span>
        </div>
        <p style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #000000; margin: 0 0 2px 0; line-height: 1.22;">
          ${cfg.vocabPrompt}
        </p>
        <div class="ruled-lines-block">
          <div class="task-line"></div>
          <div class="task-line"></div>
          <div class="task-line"></div>
          <div class="task-line"></div>
        </div>
      </div>

      <!-- Edexcel Paper 1 Section A Question 1: Feature Questions [2 x 2 = 4 marks] -->
      <div class="task-section" style="margin-bottom: 0;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; text-transform: uppercase; letter-spacing: 0.5px;">
            &bull; Edexcel Section A: Question 1 Feature Drills [4 marks &bull; 5 mins]
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 700; border: 1px solid #000000; padding: 0 4px; border-radius: 2px;">[2 x 2 MARKS]</span>
        </div>

        <!-- Examiner Strategy Guidance Banner -->
        <div style="background: #f4f4f4; border-left: 2px solid #000000; padding: 2px 6px; font-family: 'Inter', sans-serif; font-size: 6.6pt; line-height: 1.15; margin-bottom: 4px;">
          <strong>Examiner Mark Scheme:</strong> Award 1 mark for identifying a valid historical feature + 1 mark for supporting factual detail. To score 2/2, the supporting detail must directly explain and develop the named feature.
        </div>
        
        <!-- Q1(a) Feature Drill [2 marks] -->
        <div style="margin-bottom: 5px; border: 1px solid #000000; border-radius: 3px; padding: 3px 6px; background: #ffffff;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1px;">
            <span style="font-family: 'Playfair Display', serif; font-size: 8.2pt; font-weight: 800; color: #000000;">
              1(a) ${cfg.q1Features.a.q} [2 marks]
            </span>
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 6.6pt; font-style: italic; color: #444444; margin-bottom: 2px;">
            <strong>Examiner Guidance:</strong> ${cfg.q1Features.a.hint}
          </div>
          <div style="margin-bottom: 2px;">
            <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; color: #000000;">
              Feature 1 &bull; Identify a distinct historical feature [1 mark]:
            </div>
            <div class="ruled-lines-block">
              <div class="task-line"></div>
              <div class="task-line"></div>
            </div>
          </div>
          <div>
            <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; color: #000000;">
              Supporting Detail &bull; Develop with precise factual explanation [1 mark]:
            </div>
            <div class="ruled-lines-block">
              <div class="task-line"></div>
              <div class="task-line"></div>
              <div class="task-line"></div>
            </div>
          </div>
        </div>

        <!-- Q1(b) Feature Drill [2 marks] -->
        <div style="border: 1px solid #000000; border-radius: 3px; padding: 3px 6px; background: #ffffff;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1px;">
            <span style="font-family: 'Playfair Display', serif; font-size: 8.2pt; font-weight: 800; color: #000000;">
              1(b) ${cfg.q1Features.b.q} [2 marks]
            </span>
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 6.6pt; font-style: italic; color: #444444; margin-bottom: 2px;">
            <strong>Examiner Guidance:</strong> ${cfg.q1Features.b.hint}
          </div>
          <div style="margin-bottom: 2px;">
            <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; color: #000000;">
              Feature 2 &bull; Identify another distinct historical feature [1 mark]:
            </div>
            <div class="ruled-lines-block">
              <div class="task-line"></div>
              <div class="task-line"></div>
            </div>
          </div>
          <div>
            <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; color: #000000;">
              Supporting Detail &bull; Develop with precise factual explanation [1 mark]:
            </div>
            <div class="ruled-lines-block">
              <div class="task-line"></div>
              <div class="task-line"></div>
              <div class="task-line"></div>
            </div>
          </div>
        </div>

      </div>

      ${renderFooterStrip(leftPageNum, cfg.leftPageQuip, 28)}
    </div>
  </div>

  <!-- ------------------------------------------------------------------ -->
  <!-- RIGHT PAGE: PRIMARY SOURCE + EXAM ENQUIRY + TIMELINE MISSION       -->
  <!-- ------------------------------------------------------------------ -->
  <div class="page page-container recto-page" id="page-${rightPageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      
      <!-- Exam Header -->
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 4px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 11pt; color: #000000; margin: 0; font-weight: 800;">
          ${cfg.tariff}
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
          Primary Archival Source &bull; Section A Enquiry Assessment
        </span>
      </div>

      <!-- Archival Primary Source Box (Base64 Inlined Image + Clean Heading) -->
      <div class="archival-box">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; background: #000000; color: #ffffff; padding: 1px 5px; border-radius: 2px; text-transform: uppercase;">
              ${cfg.sourceBadge || 'SOURCE A'}
            </span>
            <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 700; color: #333333; text-transform: uppercase; letter-spacing: 0.3px;">
              ${cfg.sourceSubtitle || 'Contemporary Visual Evidence'}
            </span>
          </div>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; color: #000000;">
            ${cfg.sourceDate || '1914–1918'}
          </span>
        </div>
        <div style="display: flex; gap: 8px; align-items: center;">
          <div style="flex: 1.1; text-align: center;">
            <img src="${b64Img}" alt="${primarySource.title}" style="max-height: 40mm; max-width: 100%; object-fit: contain; border: 1px solid #000000; filter: grayscale(100%);">
            <div style="font-family: 'Inter', sans-serif; font-size: 5.8pt; font-style: italic; margin-top: 1px; color: #333333; line-height: 1.15;">
              ${primarySource.caption}
            </div>
          </div>
          <div style="flex: 1.5; font-size: 6.8pt; line-height: 1.25; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <strong>Provenance:</strong> ${primarySource.provenance}<br>
              <span style="margin-top: 2px; display: block;"><strong>Historical Context:</strong> ${primarySource.source_context}</span>
            </div>
            <div style="border-top: 1px dashed #666666; padding-top: 2px; margin-top: 2px; background: #f9f9f9; padding: 2px 4px; border-left: 2px solid #000000;">
              <strong>Hinge Question:</strong> <em>${primarySource.hinge_question}</em>
            </div>
          </div>
        </div>
      </div>

      ${
        cfg.q2bData
          ? `
      <!-- Question 2(b) 4-Row Follow-Up Enquiry Table (Generous 2-Line Row Spacing) -->
      <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 4px 5px; background: #ffffff; margin-bottom: 4px;">
        <div style="font-family: 'Playfair Display', serif; font-size: 8.2pt; font-weight: 800; color: #000000; margin-bottom: 2px;">
          ${cfg.examStem}
        </div>
        <table style="width: 100%; border-collapse: collapse; font-size: 6.8pt; font-family: 'Inter', sans-serif; border: 1.2px solid #000000; margin-top: 2px;">
          <tr>
            <td style="width: 36%; border: 1px solid #000000; padding: 3px 5px; font-weight: 700; background: #f4f4f4;">Detail in Source ${cfg.q2bData.sourceLetter} that I would follow up:</td>
            <td style="width: 64%; border: 1px solid #000000; padding: 2px 5px;">
              <div class="task-line" style="height: 6.8mm; border-bottom: 1px solid #000000;"></div>
              <div class="task-line" style="height: 6.8mm; border-bottom: 1px solid #000000;"></div>
            </td>
          </tr>
          <tr>
            <td style="border: 1px solid #000000; padding: 3px 5px; font-weight: 700; background: #f4f4f4;">Question I would ask:</td>
            <td style="border: 1px solid #000000; padding: 2px 5px;">
              <div class="task-line" style="height: 6.8mm; border-bottom: 1px solid #000000;"></div>
              <div class="task-line" style="height: 6.8mm; border-bottom: 1px solid #000000;"></div>
            </td>
          </tr>
          <tr>
            <td style="border: 1px solid #000000; padding: 3px 5px; font-weight: 700; background: #f4f4f4;">Type of source I would look for:</td>
            <td style="border: 1px solid #000000; padding: 2px 5px;">
              <div class="task-line" style="height: 6.8mm; border-bottom: 1px solid #000000;"></div>
              <div class="task-line" style="height: 6.8mm; border-bottom: 1px solid #000000;"></div>
            </td>
          </tr>
          <tr>
            <td style="border: 1px solid #000000; padding: 3px 5px; font-weight: 700; background: #f4f4f4;">How this might help answer my question:</td>
            <td style="border: 1px solid #000000; padding: 2px 5px;">
              <div class="task-line" style="height: 6.8mm; border-bottom: 1px solid #000000;"></div>
              <div class="task-line" style="height: 6.8mm; border-bottom: 1px solid #000000;"></div>
            </td>
          </tr>
        </table>
      </div>

      <!-- Connectives & Key Vocabulary Bank -->
      <div style="border: 1px solid #000000; border-radius: 3px; padding: 3px 5px; background: #ffffff; margin-bottom: 5px; display: grid; grid-template-columns: 1fr 1fr; gap: 6px;">
        <div>
          <strong style="font-family: 'Inter', sans-serif; font-size: 6.6pt; text-transform: uppercase; display: block;">Sentence Stems:</strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.4pt; font-style: italic; line-height: 1.15; display: block;">${cfg.connectives}</span>
        </div>
        <div>
          <strong style="font-family: 'Inter', sans-serif; font-size: 6.6pt; text-transform: uppercase; display: block;">Key Vocabulary Bank:</strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.4pt; line-height: 1.15; display: block;">${cfg.wordBank}</span>
        </div>
      </div>

      <!-- Extended Writing Lines for Follow-Up Rationale (Ruled Handwriting Lines at Natural 7.6mm) -->
      <div>
        <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-style: italic; color: #222222; margin-bottom: 1px;">
          <strong>Enquiry Rationale:</strong> Explain in full sentences why your chosen source type is historically reliable and superior to alternatives (continue on Pages ${linedLeftPageNum}–${linedRightPageNum} for full timed response):
        </div>
        <div style="height: 3px;"></div>
        <div class="ruled-lines-block">
          <div class="task-line"></div>
          <div class="task-line"></div>
          <div class="task-line"></div>
          <div class="task-line"></div>
          <div class="task-line"></div>
          <div class="task-line"></div>
          <div class="task-line"></div>
          <div class="task-line"></div>
          <div class="task-line"></div>
        </div>
      </div>
      `
          : `
      <!-- Question 2(a) Utility Stem & Scaffolding Box -->
      <div style="border: 1px solid #000000; border-radius: 3px; padding: 3px 5px; background: #ffffff; margin-bottom: 3px;">
        <div style="font-family: 'Playfair Display', serif; font-size: 8.2pt; font-weight: 800; color: #000000; margin-bottom: 2px; line-height: 1.2;">
          ${cfg.examStem}
        </div>
        <div style="background: #f4f4f4; border-left: 2px solid #000000; padding: 2px 5px; font-family: 'Inter', sans-serif; font-size: 6.6pt; line-height: 1.2; margin-bottom: 1px;">
          <strong>Provenance Clue:</strong> ${cfg.provenanceClue}
        </div>
      </div>

      <!-- 3-Column Planning Structure Strip -->
      <div style="margin-bottom: 5px;">
        <div style="font-family: 'Inter', sans-serif; font-size: 6.6pt; font-weight: 800; text-transform: uppercase; margin-bottom: 1px; border-bottom: 1px solid #000000; padding-bottom: 1px;">
          Structure Strip &bull; 3-Step Utility Analysis
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 4px;">
          ${cfg.structureStrip
            .map(
              (strip) => `
          <div style="border: 1px solid #000000; border-top: 2.2px solid #000000; border-radius: 2px; padding: 2px 4px; background: #ffffff;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 6.6pt; color: #000000; display: block; margin-bottom: 1px;">${strip.col}</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.2pt; color: #000000; line-height: 1.15; display: block;">${strip.text}</span>
          </div>
          `,
            )
            .join('')}
        </div>
      </div>

      <!-- Connectives & Key Vocabulary Bank -->
      <div style="border: 1px solid #000000; border-radius: 3px; padding: 2px 5px; background: #ffffff; margin-bottom: 3px; display: grid; grid-template-columns: 1fr 1fr; gap: 6px;">
        <div>
          <strong style="font-family: 'Inter', sans-serif; font-size: 6.6pt; text-transform: uppercase; display: block;">Analytical Connectives:</strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.4pt; font-style: italic; line-height: 1.15; display: block;">${cfg.connectives}</span>
        </div>
        <div>
          <strong style="font-family: 'Inter', sans-serif; font-size: 6.6pt; text-transform: uppercase; display: block;">Key Vocabulary Bank:</strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.4pt; line-height: 1.15; display: block;">${cfg.wordBank}</span>
        </div>
      </div>

      <!-- Ruled Task Lines for Extended Utility Writing (12 Natural 7.6mm Ruled Lines) -->
      <div>
        <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-style: italic; color: #222222; margin-bottom: 1px;">
          <strong>Task:</strong> Using the structure strip above, write your analytical source utility evaluation below (continue on Pages ${linedLeftPageNum}–${linedRightPageNum} for full timed assessment):
        </div>
        <div class="ruled-lines-block">
          <div class="task-line"></div>
          <div class="task-line"></div>
          <div class="task-line"></div>
          <div class="task-line"></div>
          <div class="task-line"></div>
          <div class="task-line"></div>
          <div class="task-line"></div>
          <div class="task-line"></div>
          <div class="task-line"></div>
          <div class="task-line"></div>
          <div class="task-line"></div>
          <div class="task-line"></div>
          <div class="task-line"></div>
        </div>
      </div>
      `
      }

      <!-- Timeline Mission (Direct Link to Pages 2–3 Living Timeline) -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 3px 6px; background: #ffffff; display: flex; justify-content: space-between; align-items: center; margin-top: 2px;">
        <div style="display: flex; align-items: center; gap: 6px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 900; background: #000000; color: #ffffff; padding: 1px 5px; border-radius: 2px; text-transform: uppercase; white-space: nowrap;">
            Timeline Mission
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7pt; color: #000000; line-height: 1.2;">
            ${cfg.timelineMission}
          </span>
        </div>
        <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 800; white-space: nowrap; margin-left: 8px;">
          &larr; Pages 2–3
        </span>
      </div>

      ${renderFooterStrip(rightPageNum, cfg.rightPageQuip, 28)}
    </div>
  </div>
`;

    // ------------------------------------------------------------------
    // SPREAD 2, LEFT PAGE (VERSO): EXTENDED WRITING & DISCIPLINARY NOTES
    // ------------------------------------------------------------------
    const linedRowsLeft = Array.from({ length: 28 }, (_, idx) => {
      const isFirst = idx === 0;
      const marginContent = isFirst
        ? `<span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #555555; text-transform: uppercase; font-weight: 700;">Margin</span>`
        : `&nbsp;`;
      const linePrompt = isFirst
        ? `<span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-style: italic; color: #777777;">[ Extended Section A Response &bull; Sustained Source Evaluation / Disciplinary Notes ]</span>`
        : `&nbsp;`;
      return `
        <div class="lined-row">
          <div class="lined-margin-cell">${marginContent}</div>
          <div class="lined-content-cell">${linePrompt}</div>
        </div>`;
    }).join('');

    html += `
  <div class="page page-container verso-page" id="page-${linedLeftPageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Running Header -->
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 4px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 10.5pt; color: #000000; margin: 0; font-weight: 800;">
          ${cfg.title}
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
          Extended Source Evaluation &bull; Disciplinary Notes &bull; Historic Environment
        </span>
      </div>

      <!-- 28 Ruled Lines with 22mm Left Margin -->
      <div class="lined-page-grid">
        ${linedRowsLeft}
      </div>

      ${renderFooterStrip(linedLeftPageNum, cfg.linedLeftQuip, 28)}
    </div>
  </div>
`;

    // ------------------------------------------------------------------
    // SPREAD 2, RIGHT PAGE (RECTO): INDEPENDENT PRACTICE & TIMED WRITING
    // ------------------------------------------------------------------
    const linedRowsRight = Array.from({ length: 28 }, (_, idx) => {
      const isFirst = idx === 0;
      const marginContent = isFirst
        ? `<span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #555555; text-transform: uppercase; font-weight: 700;">Margin</span>`
        : `&nbsp;`;
      const linePrompt = isFirst
        ? `<span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-style: italic; color: #777777;">[ Extended Section A Response Continued &bull; Analytical Conclusion &amp; Historical Context ]</span>`
        : `&nbsp;`;
      return `
        <div class="lined-row">
          <div class="lined-margin-cell">${marginContent}</div>
          <div class="lined-content-cell">${linePrompt}</div>
        </div>`;
    }).join('');

    html += `
  <div class="page page-container recto-page" id="page-${linedRightPageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Running Header -->
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 4px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 10.5pt; color: #000000; margin: 0; font-weight: 800;">
          ${cfg.title}
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
          Independent Practice &bull; Timed Exam Response
        </span>
      </div>

      <!-- 28 Ruled Lines with 22mm Left Margin -->
      <div class="lined-page-grid">
        ${linedRowsRight}
      </div>

      ${renderFooterStrip(linedRightPageNum, cfg.linedRightQuip, 28)}
    </div>
  </div>
`;
  });

  // ====================================================================
  // PAGE 28: OUTSIDE BACK COVER (Target Grade, 96-Mark Ledger, QR Hub)
  // ====================================================================
  html += `
  <div class="page page-container verso-page" id="page-28" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      
      <!-- Back Cover Header Strip -->
      <div style="border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 5px;">
        <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 12pt; color: #000000; text-transform: uppercase; font-weight: 900; letter-spacing: 0.5px;">
          Student Assessment Record &amp; Progress Tracker
        </h2>
      </div>

      <!-- Pupil Details & Target Grade Strip -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 5px 12px; background: #ffffff; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 14px; align-items: center; margin-bottom: 5px;">
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #000000; text-transform: uppercase; margin-right: 8px;">Pupil Name:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #000000; height: 14px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #000000; text-transform: uppercase; margin-right: 8px;">Class:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #000000; height: 14px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #000000; text-transform: uppercase; margin-right: 8px;">Target Grade:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #000000; height: 14px; text-align: center; font-weight: 900;"></div>
        </div>
      </div>

      <!-- 96-Mark Progress Ledger Table with 'Date Completed' and Wide Score Boxes -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; overflow: hidden; margin-bottom: 5px;">
        <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif; font-size: 8pt;">
          <thead>
            <tr style="background: #000000; color: #ffffff;">
              <th style="padding: 7px 6px; width: 14%; text-align: center; border-right: 1px solid #444444; font-size: 7.6pt;">Date Completed</th>
              <th style="padding: 7px 8px; width: 30%; text-align: left; border-right: 1px solid #444444; font-size: 7.6pt;">Lesson &bull; Specification Focus</th>
              <th style="padding: 7px 6px; width: 20%; text-align: center; border-right: 1px solid #444444; font-size: 7.6pt;">Q1 Feature Drills [4m]</th>
              <th style="padding: 7px 6px; width: 22%; text-align: center; border-right: 1px solid #444444; font-size: 7.6pt;">Q2 Source Practice</th>
              <th style="padding: 7px 6px; width: 14%; text-align: center; font-size: 7.6pt;">Lesson Total</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 7px 6px; border-right: 1px solid #000000; text-align: center;">&nbsp;</td>
              <td style="padding: 7px 8px; border-right: 1px solid #000000;"><strong>KT5.1:</strong> Trench System &amp; Battles</td>
              <td style="padding: 7px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Q1: <span style="font-size: 9pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 4</strong> ]</span></td>
              <td style="padding: 7px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Q2a Util: <span style="font-size: 9pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 8</strong> ]</span></td>
              <td style="padding: 7px 6px; text-align: center; font-size: 9.5pt; font-weight: 900;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 12</strong> ]</td>
            </tr>
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 7px 6px; border-right: 1px solid #000000; text-align: center;">&nbsp;</td>
              <td style="padding: 7px 8px; border-right: 1px solid #000000;"><strong>KT5.2:</strong> Trench Illnesses &amp; Mud</td>
              <td style="padding: 7px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Q1: <span style="font-size: 9pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 4</strong> ]</span></td>
              <td style="padding: 7px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Q2b Follow: <span style="font-size: 9pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 4</strong> ]</span></td>
              <td style="padding: 7px 6px; text-align: center; font-size: 9.5pt; font-weight: 900;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 8</strong> ]</td>
            </tr>
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 7px 6px; border-right: 1px solid #000000; text-align: center;">&nbsp;</td>
              <td style="padding: 7px 8px; border-right: 1px solid #000000;"><strong>KT5.3:</strong> Combat Trauma &amp; Gas</td>
              <td style="padding: 7px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Q1: <span style="font-size: 9pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 4</strong> ]</span></td>
              <td style="padding: 7px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Q2a Util: <span style="font-size: 9pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 8</strong> ]</span></td>
              <td style="padding: 7px 6px; text-align: center; font-size: 9.5pt; font-weight: 900;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 12</strong> ]</td>
            </tr>
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 7px 6px; border-right: 1px solid #000000; text-align: center;">&nbsp;</td>
              <td style="padding: 7px 8px; border-right: 1px solid #000000;"><strong>KT5.4:</strong> Evacuation Chain &amp; CCS</td>
              <td style="padding: 7px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Q1: <span style="font-size: 9pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 4</strong> ]</span></td>
              <td style="padding: 7px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Q2b Follow: <span style="font-size: 9pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 4</strong> ]</span></td>
              <td style="padding: 7px 6px; text-align: center; font-size: 9.5pt; font-weight: 900;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 8</strong> ]</td>
            </tr>
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 7px 6px; border-right: 1px solid #000000; text-align: center;">&nbsp;</td>
              <td style="padding: 7px 8px; border-right: 1px solid #000000;"><strong>KT5.5:</strong> Splints, Debridement, X-Rays</td>
              <td style="padding: 7px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Q1: <span style="font-size: 9pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 4</strong> ]</span></td>
              <td style="padding: 7px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Q2a Util: <span style="font-size: 9pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 8</strong> ]</span></td>
              <td style="padding: 7px 6px; text-align: center; font-size: 9.5pt; font-weight: 900;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 12</strong> ]</td>
            </tr>
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 7px 6px; border-right: 1px solid #000000; text-align: center;">&nbsp;</td>
              <td style="padding: 7px 8px; border-right: 1px solid #000000;"><strong>KT5.6:</strong> Blood Storage &amp; Reconstruction</td>
              <td style="padding: 7px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Q1: <span style="font-size: 9pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 4</strong> ]</span></td>
              <td style="padding: 7px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Q2b Follow: <span style="font-size: 9pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 4</strong> ]</span></td>
              <td style="padding: 7px 6px; text-align: center; font-size: 9.5pt; font-weight: 900;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 8</strong> ]</td>
            </tr>
            <tr style="background: #ffffff; font-weight: 900; border-top: 2px solid #000000;">
              <td colspan="2" style="padding: 4px 8px; border-right: 1px solid #000000; text-transform: uppercase; font-size: 7.8pt;">Section A Assessment Totals</td>
              <td style="padding: 7px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Q1 Total: <span style="font-size: 9.5pt; font-weight: 900;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 24</strong> ]</span></td>
              <td style="padding: 7px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Q2 Total: <span style="font-size: 9.5pt; font-weight: 900;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 36</strong> ]</span></td>
              <td style="padding: 7px 6px; text-align: center; font-size: 10pt; font-weight: 900;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 60</strong> ]</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Teacher Feedback Section (WWW & EBI 4 generous 8.4mm lines each) -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 5px 10px; background: #ffffff; margin-bottom: 5px;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; text-transform: uppercase;">
            Teacher Formative Assessment &bull; Feedback
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 700;">
            Effort: [ 1 &bull; 2 &bull; 3 &bull; 4 &bull; 5 ]
          </span>
        </div>

        <div style="margin-bottom: 4px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.4pt; text-transform: uppercase; display: block; margin-bottom: 2px;">
            What Went Well (WWW):
          </strong>
          <div class="ruled-lines-block">
            <div class="task-line" style="height: 9.0mm;"></div>
            <div class="task-line" style="height: 9.0mm;"></div>
            <div class="task-line" style="height: 9.0mm;"></div>
            <div class="task-line" style="height: 9.0mm;"></div>
          </div>
        </div>

        <div style="margin-bottom: 4px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.4pt; text-transform: uppercase; display: block; margin-bottom: 2px;">
            Even Better If (EBI):
          </strong>
          <div class="ruled-lines-block">
            <div class="task-line" style="height: 9.0mm;"></div>
            <div class="task-line" style="height: 9.0mm;"></div>
            <div class="task-line" style="height: 9.0mm;"></div>
            <div class="task-line" style="height: 9.0mm;"></div>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #000000; padding-top: 4px; margin-top: 2px; font-family: 'Inter', sans-serif; font-size: 7.2pt;">
          <span><strong>Teacher Signature:</strong> ____________________________</span>
          <span><strong>Date:</strong> ____________________</span>
        </div>
      </div>

      <!-- Interactive Quizzing QR Codes for Lessons 5.1–5.6 -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 4px 6px; background: #ffffff;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; text-transform: uppercase;">
            📱 Interactive Digital Quizzing Hub &bull; Scan for Instant Retrieval Practice
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.6pt; font-weight: 700; border: 1px solid #000000; padding: 0 4px; border-radius: 2px;">
            ONLINE RECALL
          </span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 4px; text-align: center;">
          ${wfConfigs
            .map((cfg, idx) => {
              const quizUrl = `https://the-history-revision-hub.netlify.app/?unit=edexcel_medicine&lesson=${cfg.lessonIndex}&quiz=true`;
              const qrSvg = generateQrSvg(quizUrl);
              const shortLabels = [
                'Trenches & Mud',
                'Trench Illness',
                'Trauma & Gas',
                'Evacuation',
                'Splints & X-Rays',
                'Blood & Plastic',
              ];
              return `
          <div style="border: 1px solid #000000; border-radius: 3px; padding: 5px 2px; background: #ffffff; display: flex; flex-direction: column; align-items: center; justify-content: space-between;">
            <div style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 900; text-transform: uppercase; margin-bottom: 1px;">
              KT5.${cfg.lessonNum}
            </div>
            <div style="font-family: 'Inter', sans-serif; font-size: 6.2pt; font-weight: 700; color: #333333; margin-bottom: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%;">
              ${shortLabels[idx]}
            </div>
            <div style="width: 22mm; height: 22mm; margin: 0 auto 2px auto;">
              ${qrSvg}
            </div>
            <span style="font-family: 'Inter', sans-serif; font-size: 5.8pt; font-weight: 700; text-transform: uppercase; background: #000000; color: #ffffff; padding: 1px 4px; border-radius: 2px; margin-bottom: 1px;">
              Scan to Quiz
            </span>
            <div style="font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 900; color: #000000; margin-top: 1px; white-space: nowrap;">
              Score: [ &nbsp;&nbsp; <strong>/ 8</strong> ]
            </div>
          </div>
          `;
            })
            .join('')}
        </div>
      </div>

      ${renderFooterStrip(28, quipList[15], 28)}
    </div>
  </div>
</body>
</html>
`;

  return html;
}

module.exports = {
  buildWesternFrontTwoPageWorkbook,
};
