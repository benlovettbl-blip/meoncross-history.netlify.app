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
  'Western Front Spec Complete: 16 marks in the bag, zero gangrene, and not a single complaint to the War Office.', // Page 16
];

// FOOTER STRIP HELPER
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
// Full Edexcel Specification Coverage & Environmental Inquiry Spines
// ============================================================================
const wfConfigs = [
  {
    lessonIndex: 20,
    lessonNum: 1,
    id: 'lesson_5_1',
    keyTopicBadge: 'KEY TOPIC 5.1',
    title: 'KT5.1: The Theatre of War: The British Sector, Trench Geography & Battles',
    enquiryQuestion:
      'How did the physical terrain and trench architecture of the British sector dictate medical evacuation and care?',
    specAnchor:
      'The British sector of the Western Front: theatre of war in Flanders and northern France; Ypres, Somme, Arras, Cambrai; trench system (frontline, support, reserve, communication trenches; saps); terrain, clay, water table, mud; underground systems at Arras (Thompson’s Cave).',
    sourceIndex: 0,
    sourceBadge: 'SOURCE A',
    sourceSubtitle: 'Contemporary Aerial Reconnaissance • Royal Flying Corps',
    sourceDate: '1917',
    q1Features: {
      a: {
        q: 'Describe one feature of the system of communication trenches on the Western Front.',
        hint: 'Explain how communication trenches connected frontline trenches to dressing stations and supply lines, and why their narrow width created bottlenecks.',
      },
      b: {
        q: 'Describe one feature of the underground hospital at Arras (Thompson’s Cave).',
        hint: 'Consider the chalk geology, lighting, water supply, and 700-bed surgical capacity 20 metres underground.',
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
      'Turn to Pages 2–3 (Milestone 1). Sketch and annotate the zig-zag traverse pattern and low-lying Ypres water table.',
    leftPageQuip:
      'Welcome to Flanders: 500 square miles of fermented pig manure, liquid mud, and artillery with terrifying accuracy.',
    rightPageQuip:
      'Trench drainage tip: If your duckboards are floating, you are no longer in an infantry trench; you are commanding a submarine.',
    linedLeftQuip:
      'Ypres Salient: surrounded on three sides by German artillery on Messines Ridge; duckboards were life preservers.',
    linedRightQuip:
      'Under Arras, 25,000 British soldiers waited in lit chalk tunnels with running water and electric power.',
    stages: [
      {
        dates: '1914–1915',
        title: 'Flanders Terrain & Ypres Salient',
        bullets: [
          'Low-lying Flanders clay: very high water table',
          'Heavy rain and artillery blast destroy drainage',
          'British held vulnerable salient overlooked by Germans',
          'Liquid mud made stretcher evacuation agonizingly slow',
        ],
        focusClue: 'Why was the low-lying topography of Ypres a tactical and medical nightmare?',
      },
      {
        dates: '1914–1918',
        title: 'Trench Architecture & Traverses',
        bullets: [
          'Trenches dug 2m deep in zig-zag traverse pattern',
          'Traverses contain shell blast and flying shrapnel',
          'Prevents enemy firing straight down length of trench',
          'Duckboards, fire-steps, parapets, and parados fitted',
        ],
        focusClue:
          'How did zig-zag traverses limit shrapnel injuries and contain shell explosions?',
      },
      {
        dates: '1915–1918',
        title: 'Trench System: Front to Rear',
        bullets: [
          'Frontline: fire-steps for observation and combat',
          'Support trench (70m back) & Reserve (hundreds m)',
          'Communication trenches move fresh men & stretchers',
          'Saps: narrow blind tunnels into No Man’s Land',
        ],
        focusClue: 'Why did narrow communication trenches create acute bottlenecks for stretchers?',
      },
      {
        dates: 'Nov 1916–1917',
        title: 'Thompson’s Cave & Arras Tunnels',
        bullets: [
          'Chalk geology enabled massive tunnel excavations',
          'New Zealand tunnelers joined ancient Roman quarries',
          'Electric lighting, running piped water & rail tracks',
          '700-bed underground hospital (Thompson’s Cave)',
        ],
        focusClue: 'How did the chalk geology at Arras allow safe, sterile surgical conditions?',
      },
      {
        dates: '1916–1917',
        title: 'Mass Trauma: Somme & Cambrai',
        bullets: [
          'July 1916 Somme: 57,000 British casualties Day 1',
          'Stretcher bearers overwhelmed by mass casualties',
          'Nov 1917 Cambrai: mass tank assault over chalk ridge',
          'Mobile breakthrough demanded rapid surgical shifts',
        ],
        focusClue: 'Why did mass-casualty offensives force the RAMC to reorganize evacuation?',
      },
    ],
  },
  {
    lessonIndex: 21,
    lessonNum: 2,
    id: 'lesson_5_2',
    keyTopicBadge: 'KEY TOPIC 5.2',
    title: 'KT5.2: The Trench Environment: Mud, Vermin & Non-Combat Illnesses',
    enquiryQuestion:
      'Why were environmental pathogens and vermin as dangerous to British troops as enemy artillery?',
    specAnchor:
      'Ill health arising from the trench environment: trench foot (pathology, gangrene, prevention, whale oil, sock inspection); trench fever (body lice, Pediculus humanus, delousing stations, Serbian barrels); shell shock (symptoms, NYDN, rest treatment); dysentery (water chlorination, chloride of lime, latrines); underground shelter conditions.',
    sourceIndex: 0,
    sourceBadge: 'SOURCE A',
    sourceSubtitle: 'Contemporary Photographic Evidence • Western Front',
    sourceDate: 'July 1916',
    q1Features: {
      a: {
        q: 'Describe one feature of the methods used to prevent trench foot on the Western Front.',
        hint: 'Consider the buddy-system inspections, grease/whale oil rubbing routines, and 3-pair spare sock requirements.',
      },
      b: {
        q: 'Describe one feature of the causes of trench fever among British troops.',
        hint: 'Identify the parasite vector (body lice) and how lice faeces entered scratched skin to transmit the pathogen.',
      },
    },
    tariff: 'Question 2(b): Follow-Up Enquiry Table [4 marks &bull; 5 mins]',
    examStem:
      'Study Source A. How could you follow up Source A to find out more about the living conditions and non-combat illnesses experienced by British soldiers in frontline trenches on the Western Front? [4 marks]',
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
      'trench foot &bull; whale oil &bull; buddy-system &bull; gangrene &bull; trench fever &bull; body lice (Pediculus humanus) &bull; delousing stations &bull; Serbian barrels &bull; shell shock &bull; NYDN &bull; dysentery &bull; chloride of lime',
    timelineMission:
      'Turn to Pages 2–3 (Milestone 2). Draw soldiers applying whale oil and delousing garments in steam ovens.',
    leftPageQuip:
      'Whale oil smells like dead fish and regrets, but it beats having your toes amputated by an RAMC surgeon with a bone-saw.',
    rightPageQuip:
      "Body lice: The only creatures on the Western Front that didn't care about King, Kaiser, or your personal hygiene.",
    linedLeftQuip:
      'Trench foot required 3 pairs of dry socks and rubbing with whale oil; negligence resulted in court martial.',
    linedRightQuip:
      'Body lice lived in uniform seams; delousing machines reduced typhus and trench fever across the British Expeditionary Force.',
    stages: [
      {
        dates: '1914–1915',
        title: 'Trench Foot Pathology',
        bullets: [
          'Caused by standing in cold water and mud in tight boots',
          'Constricts capillary blood flow; tissues lose oxygen',
          'Numbness, severe swelling, skin turning blue and black',
          'Led to wet gangrene, tissue necrosis and amputation',
        ],
        focusClue: 'How did prolonged cold water immersion destroy tissue and produce gangrene?',
      },
      {
        dates: '1915–1918',
        title: 'Prevention: Whale Oil & Socks',
        bullets: [
          'Mandatory buddy system: soldiers rubbed whale oil daily',
          'Whale oil formed water-repellent barrier on skin',
          'Daily foot inspections strictly enforced by officers',
          'Every soldier carried three pairs of clean, dry socks',
        ],
        focusClue:
          'Why did mandatory officer inspections succeed where voluntary advice had failed?',
      },
      {
        dates: '1914–1918',
        title: 'Trench Fever, Lice & Delousing',
        bullets: [
          'High fever, violent shivering, severe joint and shin pain',
          'Incapacitated up to 15% of troops for a month or more',
          '1918: Proven transmitted by body lice (Pediculus humanus) faeces',
          'Divisional delousing bathhouses, steam ovens & Serbian barrels',
        ],
        focusClue:
          'Why did trench fever persist until the body louse insect vector was proven in 1918?',
      },
      {
        dates: '1914–1918',
        title: 'Dysentery & Water Chlorination',
        bullets: [
          'Severe bacterial diarrhoea caused by unhygienic water & food',
          'Deep latrine pits dug away from frontline trenches',
          'Chloride of lime added daily to neutralize foul waste',
          'Drinking water purified with chemical chlorination tablets',
        ],
        focusClue: 'How did strict sanitation and chemical water chlorination prevent epidemics?',
      },
      {
        dates: '1914–1918',
        title: 'Shell Shock & Psychological Trauma',
        bullets: [
          'Caused by artillery blast concussion and mortal combat terror',
          'Symptoms: uncontrollable shaking, hysterical blindness, mutism',
          '~80,000 British cases diagnosed; labeled NYDN (Not Yet Diagnosed, Nervous)',
          'Treated with rest and food; specialist centres like Craiglockhart',
        ],
        focusClue:
          'Why was shell shock initially stigmatised as cowardice before being treated medically?',
      },
    ],
  },
  {
    lessonIndex: 22,
    lessonNum: 3,
    id: 'lesson_5_3',
    keyTopicBadge: 'KEY TOPIC 5.3',
    title: 'KT5.3: Battlefield Trauma: High Explosive Shrapnel, Gas Attacks & Infection',
    enquiryQuestion:
      'How did high-explosive artillery trauma and chemical poison gas transform surgical treatment?',
    specAnchor:
      'Wounds, injuries and diseases: high-explosive artillery shells, shrapnel fragments; infection (gas gangrene, Clostridium welchii, tetanus); head trauma and the Brodie helmet; chemical gas attacks (chlorine, phosgene, mustard gas) and respirators.',
    sourceIndex: 1, // Source B is PH Anti-Gas Helmet
    sourceBadge: 'SOURCE B',
    sourceSubtitle: 'Contemporary Photographic Evidence • Machine Gun Corps',
    sourceDate: 'July 1916',
    q1Features: {
      a: {
        q: 'Describe one feature of the effects of poison gas attacks on soldiers on the Western Front.',
        hint: 'Distinguish between chlorine (suffocation/pulmonary oedema), phosgene, and mustard gas (external/internal blistering).',
      },
      b: {
        q: 'Describe one feature of the design of the British Brodie steel helmet.',
        hint: 'Consider the pressed-steel construction, shallow brim, and internal lining to deflect shrapnel from above.',
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
    timelineMission:
      'Turn to Pages 2–3 (Milestone 2). Sketch the Brodie steel helmet and British PH gas hood.',
    leftPageQuip:
      'The Brodie helmet: Looks like an upside-down soup bowl, but prevents your skull from becoming one.',
    rightPageQuip:
      'Chlorine gas: If it smells like rotten pineapple and bleaches the grass, do NOT inhale—unless you fancy drowning in your own lungs.',
    linedLeftQuip:
      'The 1915 Brodie helmet slashed penetrating head wounds by 75%; shrapnel helmets became universal equipment.',
    linedRightQuip:
      'Small Box Respirators with charcoal filters neutralized chlorine and phosgene, though mustard gas still blistered through clothing.',
    stages: [
      {
        dates: '1914–1918',
        title: 'Artillery & Shrapnel Trauma',
        bullets: [
          'High-explosive artillery caused ~58% of all battle wounds',
          'Shells shattered into thousands of jagged steel splinters',
          'Smashed complex bones, caused blast shock and severe bleeding',
          'Mud, dirt, and filthy uniform cloth driven deep into tissue',
        ],
        focusClue:
          'Why did jagged shrapnel fragments cause far worse infections than rifle bullets?',
      },
      {
        dates: '1914–1918',
        title: 'Soil Bacteria & Gas Gangrene',
        bullets: [
          'Manured Flanders farmland heavily contaminated with microbes',
          'Clostridium welchii bacterium produces lethal toxins and gas',
          'Anaerobic: flourishes in deep, airless shrapnel wounds',
          'Gas bubbles under skin; gangrene killed soldiers in hours',
        ],
        focusClue: 'Why was Clostridium welchii so lethal in deep, airless shrapnel wounds?',
      },
      {
        dates: 'Late 1915',
        title: 'Head Trauma & Brodie Helmet',
        bullets: [
          'Soft cloth caps offered zero protection against shrapnel',
          'Late 1915: John Brodie patented the steel combat helmet',
          'Stamped from single steel sheet; wide rim deflected blast',
          'Reduced fatal penetrating shrapnel head wounds by ~80%',
        ],
        focusClue:
          'Why did the introduction of the Brodie helmet cause an apparent rise in hospital head cases?',
      },
      {
        dates: 'Apr 1915–1916',
        title: 'Chlorine & Phosgene Attacks',
        bullets: [
          'Apr 1915: Germans used chlorine gas at 2nd Battle of Ypres',
          'Choking gas destroyed respiratory lungs; fluid suffocation',
          'Urine pads replaced by chemical hypo hoods and P-helmets',
          'Dec 1915: Phosgene introduced (faint musty smell; 6x deadlier)',
        ],
        focusClue: 'How did the rapid evolution of chemical respirators counter suffocating gases?',
      },
      {
        dates: '1916–1918',
        title: 'Mustard Gas & Box Respirators',
        bullets: [
          '1916: Small Box Respirator issued (carbon/charcoal filter)',
          'July 1917: Germans deployed mustard gas at 3rd Ypres',
          'Blistering agent burned skin through uniforms; caused blindness',
          'Odorless, oily liquid soaked into soil; persisted for weeks',
        ],
        focusClue: 'Why was mustard gas far harder to counter than chlorine or phosgene?',
      },
    ],
  },
  {
    lessonIndex: 23,
    lessonNum: 4,
    id: 'lesson_5_4',
    keyTopicBadge: 'KEY TOPIC 5.4',
    title: 'KT5.4: The Chain of Evacuation: Stretcher Bearers, RAP, Dressing Stations & CCS',
    enquiryQuestion:
      'How successfully did the Chain of Evacuation transport, triage, and treat mass battlefield casualties?',
    specAnchor:
      'The work of the RAMC and FANY: the Chain of Evacuation (stretcher bearers, Regimental Aid Posts, Field Ambulances and Dressing Stations, Casualty Clearing Stations, Base Hospitals); triage systems; transport methods (motor ambulances, ambulance trains, canal barges).',
    sourceIndex: 0,
    sourceBadge: 'SOURCE A',
    sourceSubtitle: 'Contemporary Photographic Evidence • Western Front',
    sourceDate: 'August 1917',
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
      'Study Source A. How could you follow up Source A to find out more about the difficulties stretcher bearers faced evacuating casualties from the Western Front? [4 marks]',
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
    timelineMission:
      'Turn to Pages 2–3 (Milestone 5). Draw the 6 sequential stages of the Chain of Evacuation.',
    leftPageQuip:
      'The Regimental Aid Post: 200 yards from the German front line, lit by candle-ends, and smelling entirely of iodine and panic.',
    rightPageQuip:
      'Motor ambulances: Guaranteed to rattle every uninjured bone in your body while speeding you to the Casualty Clearing Station.',
    linedLeftQuip:
      'From Stretcher Bearer to RAP, ADS, and CCS: the 1917 evacuation chain prioritized speed to combat wound sepsis.',
    linedRightQuip:
      'Casualty Clearing Stations performed triage and emergency abdominal surgery before infection overwhelmed damaged organs.',
    stages: [
      {
        dates: '1914–1918',
        title: 'Stretcher Bearers & RAP',
        bullets: [
          '16 bearers per battalion (4 per stretcher; 6–8 in mud)',
          'Recovered wounded under direct machine-gun/artillery fire',
          'Regimental Aid Post (RAP) 200m behind front line in dugout',
          'Regimental Medical Officer (RMO) applied iodine & bandages',
        ],
        focusClue:
          'Why was rapid evacuation by stretcher bearers vital to prevent irreversible shock?',
      },
      {
        dates: '1914–1918',
        title: 'Field Ambulances & ADS/MDS',
        bullets: [
          'Staffed by Royal Army Medical Corps (RAMC) Field Ambulance',
          'Advanced Dressing Station (1/2 mile back); MDS (1 mile back)',
          'Located in abandoned farmhouses, church ruins, or bunkers',
          'Minor wounds dressed; severe cases dispatched by ambulance',
        ],
        focusClue: 'What was the tactical role of Dressing Stations in preventing CCS congestion?',
      },
      {
        dates: '1914–1918',
        title: 'CCS & The Triage System',
        bullets: [
          'Located 7–12 miles behind front, near railway junctions',
          'Primary surgical centre for critical life-saving operations',
          'Triage: 1. Walking Wounded, 2. Immediate, 3. Moribund',
          'Major amputations and emergency abdominal laparotomies done',
        ],
        focusClue: 'How did the 3-tier triage system maximize survival during mass offensives?',
      },
      {
        dates: '1914–1918',
        title: 'Base Hospitals on French Coast',
        bullets: [
          'Located at coastal ports (Boulogne, Calais, Le Havre, Étaples)',
          'Large civilian hospitals, hotels, or vast tent cities',
          'Specialized wards: amputees, gas burns, chest injuries',
          'Patients convalesced or shipped back to Britain on hospital ships',
        ],
        focusClue: 'Why were Base Hospitals situated near major coastal rail terminals and ports?',
      },
      {
        dates: '1914–1918',
        title: 'Motor Ambulances & Barges',
        bullets: [
          'Horse ambulances caused agony; shaken by rough shell-holes',
          '1914 Red Cross appeal raised 512 motorized ambulances',
          'Hospital trains fitted with kitchens and operating rooms',
          'Canal barges provided smooth travel for head and chest trauma',
        ],
        focusClue: 'Why were canal barges preferred over trains for head and chest trauma?',
      },
    ],
  },
  {
    lessonIndex: 24,
    lessonNum: 5,
    id: 'lesson_5_5',
    keyTopicBadge: 'KEY TOPIC 5.5',
    title: 'KT5.5: Surgical Breakthroughs: The Thomas Splint, Wound Debridement & Mobile X-Rays',
    enquiryQuestion:
      'Why were the Thomas Splint, debridement, and mobile X-rays decisive surgical breakthroughs?',
    specAnchor:
      'Medical advances on the Western Front: the Thomas Splint (Hugh Owen Thomas, Robert Jones) reducing compound femur mortality; wound debridement and delayed primary closure; the Carrel-Dakin antiseptic irrigation method; mobile X-ray units and radiology.',
    sourceIndex: 0,
    sourceBadge: 'SOURCE A',
    sourceSubtitle: 'Contemporary Medical Artifact • Standard Issue',
    sourceDate: 'c.1916',
    q1Features: {
      a: {
        q: 'Describe one feature of the Thomas Splint used on the Western Front.',
        hint: 'Explain the padded metal ring fitted against the groin and the windlass traction cord pulling the leg taut.',
      },
      b: {
        q: 'Describe one feature of the Carrel-Dakin method of treating infected wounds.',
        hint: 'Explain the system of perforated rubber tubes irrigating the deep wound with sodium hypochlorite antiseptic.',
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
    timelineMission:
      'Turn to Pages 2–3 (Milestone 3). Sketch the Thomas Splint groin ring and traction cord.',
    leftPageQuip:
      'The Thomas Splint: Before Robert Jones introduced it, an 80% chance of death; after Jones, an 80% chance of living to complain about the food.',
    rightPageQuip:
      'Carrel-Dakin solution: If it burns like liquid fire and smells like a Victorian washhouse, congratulations—it is killing the gas gangrene.',
    linedLeftQuip:
      'The Thomas Splint immobilized compound femur fractures; mortality dropped from 80% to 20% in two years.',
    linedRightQuip:
      'Mobile X-ray units located shrapnel; Carrel-Dakin saline irrigation prevented anaerobic gas gangrene in massive wounds.',
    stages: [
      {
        dates: '1914–1918',
        title: 'Wound Debridement & Excision',
        bullets: [
          'Surface antiseptics failed against deep dirty shrapnel wounds',
          'Surgeons cut away all dead, bruised, and infected tissue',
          'Deprived anaerobic bacteria (Clostridium welchii) of dead flesh',
          'Delayed primary closure: wound left open to flush before stitching',
        ],
        focusClue:
          'Why was surgical excision of dead tissue more effective than chemical antiseptics?',
      },
      {
        dates: '1915–1918',
        title: 'Carrel-Dakin Antiseptic Flush',
        bullets: [
          'Alexis Carrel & Henry Dakin design continuous wound irrigation',
          'Dilute sodium hypochlorite (buffered chlorine solution)',
          'Flushed into deep wound through network of perforated rubber tubes',
          'Prevented gangrene; degraded quickly so made fresh every 24h',
        ],
        focusClue:
          'How did continuous chemical irrigation solve the problem of deep wound infection?',
      },
      {
        dates: 'Dec 1915–1916',
        title: 'The Thomas Splint Breakthrough',
        bullets: [
          'Compound femur fracture mortality in 1914 stood at 80%',
          'Muscle spasms pulled sharp broken bone ends through femoral artery',
          'Hugh Owen Thomas splint introduced to front by Robert Jones',
          'Secured leg in rigid mechanical traction; mortality dropped to 20%',
        ],
        focusClue: 'How did rigid traction prevent fatal haemorrhage and shock from broken femurs?',
      },
      {
        dates: '1914–1918',
        title: 'Mobile X-Rays & Marie Curie',
        bullets: [
          'Essential to locate shrapnel and bullets before surgical incision',
          'Marie Curie equipped and deployed 20 mobile X-ray vans',
          'Powered by van engines; operated near Casualty Clearing Stations',
          'Static base hospital X-rays located deep fragments and gas pockets',
        ],
        focusClue: 'Why was locating shrapnel on an X-ray vital before operating on gas gangrene?',
      },
      {
        dates: '1914–1918',
        title: 'X-Ray Limits in Combat',
        bullets: [
          'Glass X-ray tubes fragile; easily shattered on rutted roads',
          'Tubes overheated after minutes; required cooling periods',
          'Could not detect cloth, mud, or wooden splinters in tissue',
          'Severely wounded soldiers had to lie completely still for minutes',
        ],
        focusClue:
          'Why did undetected cloth fragments remain the primary cause of post-op gangrene?',
      },
    ],
  },
  {
    lessonIndex: 25,
    lessonNum: 6,
    id: 'lesson_5_6',
    keyTopicBadge: 'KEY TOPIC 5.6',
    title: 'KT5.6: Lifesaving Innovations: Blood Storage, Brain Surgery & Plastic Reconstruction',
    enquiryQuestion:
      'How did stored blood banks, specialized neurosurgery, and plastic reconstruction transform wartime survival?',
    specAnchor:
      'Medical advances on the Western Front: blood transfusions and storage (Landsteiner, Hustin, Rous and Turner, Captain Oswald Robertson and the Cambrai blood bank); specialized neurosurgery (Harvey Cushing); plastic and facial reconstruction (Harold Gillies, Queen’s Hospital Sidcup, tubed pedicle).',
    sourceIndex: 0,
    sourceBadge: 'SOURCE A',
    sourceSubtitle: 'Primary Medical Artifact • Cambrai Blood Depot',
    sourceDate: '1917',
    q1Features: {
      a: {
        q: 'Describe one feature of Harvey Cushing’s surgical techniques in operating on head wounds on the Western Front.',
        hint: 'Consider the use of local anaesthetic to reduce brain swelling, silver clips for haemostasis, surgical magnets to extract shrapnel, and suction cannula (cutting mortality from 54% to 29%).',
      },
      b: {
        q: 'Describe one feature of the surgical methods used by Harold Gillies at Queen’s Hospital, Sidcup.',
        hint: 'Explain the tubed pedicle method of maintaining blood supply while grafting tissue from the chest or neck to reconstruct shattered facial features.',
      },
    },
    tariff: 'Question 2(b): Follow-Up Enquiry Table [4 marks &bull; 5 mins]',
    examStem:
      'Study Source A. How could you follow up Source A to find out more about the success of stored blood transfusions at the Battle of Cambrai in 1917? [4 marks]',
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
      'Karl Landsteiner &bull; ABO blood groups &bull; sodium citrate (Hustin 1914) &bull; glucose preservative (Rous & Turner 1916) &bull; Oswald Robertson &bull; Battle of Cambrai (1917) &bull; blood depot &bull; Harvey Cushing &bull; silver clips &amp; surgical magnets &bull; Harold Gillies &bull; Queen’s Hospital Sidcup &bull; tubed pedicle graft',
    timelineMission:
      'Turn to Pages 2–3 (Milestone 6). Sketch Oswald Robertson’s iced blood chest and Harold Gillies’ tubed pedicle.',
    leftPageQuip:
      "Robertson's Blood Depot: Ice chests, sodium citrate, and refrigerated blood at Cambrai—proof that cold beer isn't the only thing worth chilling.",
    rightPageQuip:
      'Harold Gillies at Sidcup: Turning shattered faces into men again with tubed pedicle skin grafts, while patients politely pretended not to notice.',
    linedLeftQuip:
      'Oswald Robertson stored blood in iced chests with sodium citrate and glucose at Cambrai in 1917, saving dying men from shock.',
    linedRightQuip:
      'At Queen’s Hospital Sidcup, Harold Gillies designed pedicle skin tubes to reconstruct faces shattered by artillery shrapnel.',
    stages: [
      {
        dates: '1914–1915',
        title: 'Sodium Citrate & Clotting',
        bullets: [
          '1914: Albert Hustin discovers sodium citrate stops clotting',
          'Prevents blood from coagulating when exposed to air',
          '1915: Richard Lewisohn determines safe non-toxic dosage (0.2%)',
          'Enabled indirect transfusion: donor no longer strapped to patient',
        ],
        focusClue:
          'How did sodium citrate liberate blood transfusion from donor-to-patient tubing?',
      },
      {
        dates: '1916–1917',
        title: 'Citrate-Glucose Blood Storage',
        bullets: [
          'Francis Rous & James Turner add glucose (dextrose) solution',
          'Preserves fragile red blood cells from breaking down',
          'Citrated blood kept in ice chests remained viable up to 4 weeks',
          'Made storing blood possible in advance of military offensives',
        ],
        focusClue: 'Why was glucose addition essential to prevent red blood cell breakdown?',
      },
      {
        dates: 'Nov 1917',
        title: 'Cambrai Blood Bank Depot',
        bullets: [
          'Capt Oswald Hope Robertson created world’s first blood bank',
          'Collected universal Group O blood from healthy walking wounded',
          'Stored in 22 iced metal vacuum flasks at Casualty Clearing Station',
          'Treated 20 severely shocked soldiers at Cambrai; 11 survived',
        ],
        focusClue: 'Why did pre-stored blood transform surgical survival during surprise assaults?',
      },
      {
        dates: '1917–1918',
        title: 'Harvey Cushing’s Brain Surgery',
        bullets: [
          'American surgeon Harvey Cushing pioneered delicate military neurosurgery',
          'Used local anaesthetic instead of general to prevent fatal brain swelling',
          'Silver clips clamped vessels (haemostasis); magnets extracted deep shrapnel',
          'Operated on 45 patients at 3rd Ypres, cutting mortality from 54% to 29%',
        ],
        focusClue: 'Why was local anaesthesia superior to general anaesthetic in head trauma?',
      },
      {
        dates: '1917–1918',
        title: 'Harold Gillies at Sidcup',
        bullets: [
          'Harold Gillies founded Queen’s Hospital, Sidcup, Kent (1917)',
          'Treated over 11,000 men with shattered faces and jaw trauma',
          'Pioneered tubed pedicle skin grafting to maintain active blood supply',
          'Grafts from chest/neck rebuilt noses and jaws; foundation of plastic surgery',
        ],
        focusClue:
          'How did the tubed pedicle technique prevent skin grafts from rotting and dying?',
      },
    ],
  },
];

// ============================================================================
// HELPER: RENDER ENVIRONMENTAL INQUIRY SPINE PAGE (PAGE 1 OF LESSON)
// ============================================================================
function renderWfSpinePage(cfg, pageNum) {
  const { keyTopicBadge, enquiryQuestion, specAnchor, stages, leftPageQuip } = cfg;

  let stagesHtml = '';
  stages.forEach((st, idx) => {
    let bulletsHtml = st.bullets
      .map((b) => `<div><span style="font-weight: 900; color: #000000;">&bull;</span> ${b}</div>`)
      .join('\n');
    stagesHtml += `
          <!-- Stage ${idx + 1} -->
          <div class="spine-stage-row" style="display: flex; flex: 1; min-height: 0; align-items: stretch; margin: 0;">
            <div style="width: 38mm; flex-shrink: 0; border-left: 2.5px solid #000000; padding: 0 3px 0 5px; display: flex; flex-direction: column; justify-content: center; position: relative;">
              <div style="position: absolute; left: -5.5px; top: 50%; transform: translateY(-50%); width: 8px; height: 8px; background: #000000; border-radius: 50%;"></div>
              <div style="display: flex; align-items: center; gap: 3px; margin-bottom: 1px;">
                <span style="background: #000000; color: #ffffff; font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 900; padding: 0.5px 3.5px; border-radius: 2px;">${idx + 1}</span>
                <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; color: #000000;">${st.dates}</span>
              </div>
              <div style="font-family: 'Playfair Display', serif; font-size: 7.2pt; font-weight: 800; color: #000000; line-height: 1.1; margin-bottom: 2px;">
                ${st.title}
              </div>
              <div style="margin-top: 1px;">
                <div style="display: flex; flex-direction: column; gap: 0.5px; font-family: 'Inter', sans-serif; font-size: 6.3pt; line-height: 1.15; color: #111111;">
                  ${bulletsHtml}
                </div>
              </div>
              <div style="margin-top: 2.5px; border: 1px dashed #000000; background: #f8fafc; padding: 1.5px 3px; border-radius: 2px;">
                <div style="font-family: 'Inter', sans-serif; font-size: 5.2pt; font-weight: 900; text-transform: uppercase; color: #000000; line-height: 1; margin-bottom: 1px;">
                  Focus Clue
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 5.8pt; line-height: 1.15; color: #222222; font-style: italic;">
                  ${st.focusClue}
                </div>
              </div>
            </div>

            <!-- Ruled Handwriting Lines (6 Lines per stage • 30 lines total) -->
            <div style="flex: 1; display: flex; flex-direction: column; border-left: 1px solid #cbd5e1; margin: 0; padding: 0;">
              <div style="flex: 1; min-height: 0; border-bottom: 1.5px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.5px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.5px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.5px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.5px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.5px solid #000000; box-sizing: border-box;"></div>
            </div>
          </div>`;
  });

  return `
  <!-- ------------------------------------------------------------------ -->
  <!-- LESSON ENVIRONMENTAL INQUIRY NOTEBOOK (PAGE ${pageNum})            -->
  <!-- ------------------------------------------------------------------ -->
  <div class="page page-container verso-page" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Lesson Header with Inquiry Question Title -->
      <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 2px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; letter-spacing: 0.5px; text-transform: uppercase; border: 1.2px solid #000000; padding: 1px 6px; border-radius: 2px;">
            ${keyTopicBadge} &bull; ENVIRONMENTAL INQUIRY NOTEBOOK
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-transform: uppercase; color: #000000;">
            EDEXCEL PAPER 1 (1HI0/11) &bull; HISTORIC ENVIRONMENT
          </span>
        </div>
        <h2 style="font-family: 'Playfair Display', serif; font-size: 11.5pt; color: #000000; margin: 1px 0 1px 0; font-weight: 900; line-height: 1.18;">
          ${enquiryQuestion}
        </h2>
        <div style="font-family: 'Georgia', serif; font-size: 6.8pt; color: #333333; line-height: 1.2; font-style: italic;">
          <strong>Specification Requirement:</strong> ${specAnchor}
        </div>
      </div>

      <!-- Chronological & Environmental Inquiry Spine (5 Stages • Full Page Height) -->
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; margin: 1px 0; min-height: 0;">
        ${stagesHtml}
      </div>

      <!-- Bottom Timeline Mission Pointer -->
      <div style="border: 1.2px solid #000000; border-radius: 2px; padding: 2px 5px; background: #ffffff; display: flex; justify-content: space-between; align-items: center; margin-top: 1.5px;">
        <div style="display: flex; align-items: center; gap: 4px;">
          <span style="background: #000000; color: #ffffff; font-family: 'Inter', sans-serif; font-size: 6.2pt; font-weight: 900; padding: 1px 4px; border-radius: 2px; text-transform: uppercase;">
            Timeline Mission
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; color: #000000;">
            ${cfg.timelineMission}
          </span>
        </div>
        <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 800; white-space: nowrap; margin-left: 6px;">
          &larr; Pages 2–3
        </span>
      </div>

      ${renderFooterStrip(pageNum, leftPageQuip, 28)}
    </div>
  </div>`;
}

// ============================================================================
// HELPER: RENDER SECTION A EXAM BLUEPRINT PAGE (PAGE 2 OF LESSON)
// ============================================================================
function renderWfExamBlueprintPage(
  cfg,
  pageNum,
  primarySource,
  b64Img,
  linedLeftPageNum,
  linedRightPageNum,
) {
  const isQ2a = cfg.tariff.includes('2(a)');

  // Exam Question 2 Enquiry Blueprint Section
  let q2Html = '';
  if (isQ2a) {
    q2Html = `
      <!-- Question 2(a) Source Utility Blueprint [8 marks] -->
      <div style="border: 1px solid #000000; border-radius: 3px; padding: 3px 5px; background: #ffffff; margin-bottom: 2px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; color: #000000;">
            &bull; Question 2(a): Source Utility Assessment [8 marks &bull; 10 mins]
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.6pt; font-weight: 800; border: 1px solid #000000; padding: 0 4px; border-radius: 2px;">
            AO3 EVALUATION
          </span>
        </div>
        <div style="font-family: 'Playfair Display', serif; font-size: 8pt; font-weight: 800; color: #000000; margin-bottom: 2px; line-height: 1.18;">
          ${cfg.examStem}
        </div>
        <div style="background: #f4f4f4; border-left: 2px solid #000000; padding: 2px 5px; font-family: 'Inter', sans-serif; font-size: 6.4pt; line-height: 1.15; margin-bottom: 2px;">
          <strong>Provenance Clue:</strong> ${cfg.provenanceClue}
        </div>


        <!-- Connectives & Key Vocabulary Bank -->
        <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 4px; margin-top: 3px; border-top: 1px dashed #000000; padding-top: 2px;">
          <div>
            <strong style="font-family: 'Inter', sans-serif; font-size: 6.2pt; text-transform: uppercase;">Analytical Connectives:</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 6pt; font-style: italic; line-height: 1.12; display: block;">${cfg.connectives}</span>
          </div>
          <div>
            <strong style="font-family: 'Inter', sans-serif; font-size: 6.2pt; text-transform: uppercase;">Key Vocabulary:</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 6pt; line-height: 1.12; display: block;">${cfg.wordBank}</span>
          </div>
        </div>
      </div>
    `;
  } else {
    q2Html = `
      <!-- Question 2(b) 4-Prompt Follow-Up Blueprint [4 marks] -->
      <div style="border: 1px solid #000000; border-radius: 3px; padding: 3px 5px; background: #ffffff; margin-bottom: 2px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; color: #000000;">
            &bull; Question 2(b): 4-Prompt Follow-Up Enquiry [4 marks &bull; 5 mins]
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.6pt; font-weight: 800; border: 1px solid #000000; padding: 0 4px; border-radius: 2px;">
            AO3 HISTORICAL ENQUIRY
          </span>
        </div>
        <div style="font-family: 'Playfair Display', serif; font-size: 8pt; font-weight: 800; color: #000000; margin-bottom: 2px; line-height: 1.18;">
          ${cfg.examStem}
        </div>
        <div style="background: #f4f4f4; border-left: 2px solid #000000; padding: 2px 5px; font-family: 'Inter', sans-serif; font-size: 6.4pt; line-height: 1.15; margin-bottom: 2px;">
          <strong>Examiner Strategy:</strong> Follow up an exact quotation or visual detail. Your question must directly target your chosen detail. Your named source type must be authentic and specific (e.g. RAMC casualty returns, battalion war diaries).
        </div>

        <!-- 4-Prompt Planning Matrix Model -->
        <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif; font-size: 6.2pt; margin-top: 2px;">
          <thead>
            <tr style="background: #000000; color: #ffffff;">
              <th style="padding: 2px 4px; text-align: left; width: 32%;">Official Edexcel Prompt</th>
              <th style="padding: 2px 4px; text-align: left;">High-Scoring Model Strategy &bull; Historical Exemplar</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #cccccc;">
              <td style="padding: 2px 4px; font-weight: 700; border-right: 1px solid #000000;">1. Detail in Source ${cfg.q2bData.sourceLetter} to follow up:</td>
              <td style="padding: 2px 4px; font-style: italic;">“${cfg.q2bData.detailPrompt}”</td>
            </tr>
            <tr style="border-bottom: 1px solid #cccccc;">
              <td style="padding: 2px 4px; font-weight: 700; border-right: 1px solid #000000;">2. Question I would ask:</td>
              <td style="padding: 2px 4px; font-style: italic;">${cfg.q2bData.questionPrompt}</td>
            </tr>
            <tr style="border-bottom: 1px solid #cccccc;">
              <td style="padding: 2px 4px; font-weight: 700; border-right: 1px solid #000000;">3. Type of source I would use:</td>
              <td style="padding: 2px 4px; font-style: italic;">${cfg.q2bData.sourceTypePrompt}</td>
            </tr>
            <tr>
              <td style="padding: 2px 4px; font-weight: 700; border-right: 1px solid #000000;">4. How this would help me:</td>
              <td style="padding: 2px 4px; font-style: italic;">${cfg.q2bData.helpPrompt}</td>
            </tr>
          </tbody>
        </table>

        <!-- Vocabulary & Connectives -->
        <div style="margin-top: 2.5px; border-top: 1px dashed #000000; padding-top: 2px; display: flex; justify-content: space-between; font-size: 6pt; font-family: 'Inter', sans-serif;">
          <span><strong>Key Vocabulary:</strong> ${cfg.wordBank}</span>
          <span style="font-style: italic; color: #444444;">${cfg.connectives}</span>
        </div>
      </div>
    `;
  }

  return `
  <!-- ------------------------------------------------------------------ -->
  <!-- LESSON EXAM BLUEPRINT & SOURCE INVESTIGATION (PAGE ${pageNum})      -->
  <!-- ------------------------------------------------------------------ -->
  <div class="page page-container recto-page" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Running Header -->
      <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; letter-spacing: 0.5px; text-transform: uppercase; border: 1.2px solid #000000; padding: 1px 6px; border-radius: 2px;">
            ${cfg.keyTopicBadge} &bull; SECTION A EXAM BLUEPRINT
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-transform: uppercase; color: #000000;">
            HISTORIC ENVIRONMENT &bull; PAPER 1 SECTION A
          </span>
        </div>
        <h2 style="font-family: 'Playfair Display', serif; font-size: 11pt; color: #000000; margin: 1px 0; font-weight: 900; line-height: 1.15;">
          ${cfg.title}
        </h2>
      </div>

      <!-- Primary Archival Source Investigation Box (Compact, Base64 Inlined) -->
      <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 4px 6px; background: #ffffff; margin-bottom: 4px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 900; text-transform: uppercase; color: #000000;">
            ${cfg.sourceBadge} &bull; ${cfg.sourceSubtitle}
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; color: #333333;">
            ORIGIN: ${cfg.sourceDate}
          </span>
        </div>
        <div style="display: flex; gap: 8px; align-items: center;">
          <div style="width: 44mm; height: 32mm; border: 1px solid #000000; border-radius: 2px; overflow: hidden; flex-shrink: 0; background: #f0f0f0;">
            <img src="${b64Img}" alt="${primarySource.caption || 'Primary Source Evidence'}" style="width: 100%; height: 100%; object-fit: cover; filter: grayscale(100%); display: block;">
          </div>
          <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; height: 32mm;">
            <div style="font-family: 'Georgia', serif; font-size: 6.8pt; line-height: 1.25; color: #000000;">
              ${primarySource.caption || 'Official photographic and archival evidence documenting medical facilities and conditions in the British sector of the Western Front.'}
            </div>
            <div style="border-top: 1px dashed #000000; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.2pt; color: #333333; line-height: 1.15;">
              <strong>Historical Provenance:</strong> ${primarySource.provenance || 'Imperial War Museum / Contemporary Photographic Record (1914–1918).'}
            </div>
          </div>
        </div>
      </div>

      <!-- Question 1 Feature Drills Blueprint [2 x 2 = 4 marks] -->
      <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 4px 6px; background: #ffffff; margin-bottom: 4px;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.6pt; text-transform: uppercase; letter-spacing: 0.5px;">
            &bull; Edexcel Section A: Question 1 Feature Drills [4 marks &bull; 5 mins]
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; border: 1px solid #000000; padding: 0 4px; border-radius: 2px;">
            2 SEPARATE QUESTIONS &bull; 2 MARKS EACH
          </span>
        </div>
        <div style="background: #f4f4f4; border-left: 2px solid #000000; padding: 2px 5px; font-family: 'Inter', sans-serif; font-size: 6.4pt; line-height: 1.15; margin-bottom: 3px;">
          <strong>Examiner Mark Scheme:</strong> Award 1 mark for identifying a valid historical feature + 1 mark for supporting factual detail. To score 2/2, the supporting detail must directly explain and develop the named feature.
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px;">
          <!-- Q1(a) Prompt -->
          <div style="border: 1px solid #000000; border-radius: 2px; padding: 3px 5px; background: #ffffff;">
            <div style="font-family: 'Playfair Display', serif; font-size: 7.8pt; font-weight: 800; color: #000000; line-height: 1.15; margin-bottom: 1.5px;">
              1(a) ${cfg.q1Features.a.q} [2 marks]
            </div>
            <div style="font-family: 'Inter', sans-serif; font-size: 6.2pt; color: #444444; line-height: 1.15; font-style: italic;">
              <strong>Hint:</strong> ${cfg.q1Features.a.hint}
            </div>
          </div>
          <!-- Q1(b) Prompt -->
          <div style="border: 1px solid #000000; border-radius: 2px; padding: 3px 5px; background: #ffffff;">
            <div style="font-family: 'Playfair Display', serif; font-size: 7.8pt; font-weight: 800; color: #000000; line-height: 1.15; margin-bottom: 1.5px;">
              1(b) ${cfg.q1Features.b.q} [2 marks]
            </div>
            <div style="font-family: 'Inter', sans-serif; font-size: 6.2pt; color: #444444; line-height: 1.15; font-style: italic;">
              <strong>Hint:</strong> ${cfg.q1Features.b.hint}
            </div>
          </div>
        </div>
      </div>

      <!-- Question 2 Enquiry Blueprint Section -->
      ${q2Html}

      <!-- Source Evidence & Planning Notes (Standard Ruled Lines) -->
      <div style="margin: 6px 0 5px 0; border: 1px solid #000000; border-radius: 3px; padding: 3.5px 5px; background: #ffffff;">
        <div style="font-family: 'Inter', sans-serif; font-size: 6.6pt; font-weight: 800; text-transform: uppercase; color: #000000; margin-bottom: 2px;">
          Source Evidence, Contextual Knowledge &amp; Disciplinary Analysis Notes:
        </div>
        <div style="display: flex; flex-direction: column; width: 100%;">
          ${Array.from(
            { length: isQ2a ? 14 : 12 },
            () =>
              `<div style="height: 7.9mm; border-bottom: 1.2px solid #000000; box-sizing: border-box; width: 100%;"></div>`,
          ).join('')}
        </div>
      </div>

      <!-- Page Pointer Callout -->
      <div style="border: 1.2px solid #000000; border-radius: 2px; padding: 2.5px 6px; background: #ffffff; display: flex; justify-content: space-between; align-items: center; margin-top: 1px;">
        <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; text-transform: uppercase;">
          Formal Examination Practice
        </span>
        <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; color: #000000;">
          Write your formal answers on Pages ${linedLeftPageNum}–${linedRightPageNum} &rarr;
        </span>
      </div>

      ${renderFooterStrip(pageNum, cfg.rightPageQuip, 28)}
    </div>
  </div>`;
}

// ============================================================================
// HELPER: RENDER OFFICIAL EXAM RESPONSE PAGE 1 (PAGE 3 OF LESSON)
// ============================================================================
function renderWfExamResponsePage1(cfg, pageNum) {
  const isQ2a = cfg.tariff.includes('2(a)');

  let q2ResponseArea = '';
  if (isQ2a) {
    const q2Lines = Array.from({ length: 22 }, (_, idx) => {
      const linePrompt =
        idx === 0
          ? `<span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-style: italic; color: #777777;">[ Begin Question 2(a) Utility Evaluation &bull; Content &bull; Provenance &bull; Context ]</span>`
          : `&nbsp;`;
      return `
        <div class="lined-row" style="height: 7.2mm; border-bottom: 1.2px solid #000000; box-sizing: border-box; width: 100%; display: flex; align-items: center;">
          ${linePrompt}
        </div>`;
    }).join('');

    q2ResponseArea = `
      <div style="flex: 1; display: flex; flex-direction: column; min-height: 0; margin-top: 2px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1.2px solid #000000; padding-bottom: 1px; margin-bottom: 2px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.4pt; text-transform: uppercase; letter-spacing: 0.5px;">
            &bull; Question 2(a): Source Utility Response [8 marks &bull; 10 mins]
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.6pt; font-weight: 700;">
            Continue on next page &rarr;
          </span>
        </div>
        <div class="lined-page-grid" style="flex: 1; min-height: 0; display: flex; flex-direction: column; margin: 0;">
          ${q2Lines}
        </div>
      </div>
    `;
  } else {
    const q2bLines = Array.from({ length: 14 }, (_, idx) => {
      const linePrompt =
        idx === 0
          ? `<span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-style: italic; color: #777777;">[ Disciplinary Commentary: Justify why this source type is authoritative for your historical enquiry ]</span>`
          : `&nbsp;`;
      return `
        <div class="lined-row" style="height: 7.2mm; border-bottom: 1.2px solid #000000; box-sizing: border-box; width: 100%; display: flex; align-items: center;">
          ${linePrompt}
        </div>`;
    }).join('');

    q2ResponseArea = `
      <div style="flex: 1; display: flex; flex-direction: column; min-height: 0; margin-top: 2px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1.2px solid #000000; padding-bottom: 1px; margin-bottom: 2px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.4pt; text-transform: uppercase; letter-spacing: 0.5px;">
            &bull; Question 2(b): 4-Prompt Follow-Up Matrix [4 marks &bull; 5 mins]
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; border: 1.2px solid #000000; padding: 0 4px; border-radius: 2px;">
            Score: [ &nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 4</strong> ]
          </span>
        </div>

        <table style="width: 100%; border-collapse: collapse; border: 1.5px solid #000000; font-family: 'Inter', sans-serif; font-size: 6.8pt; margin-bottom: 2px;">
          <tbody>
            <tr style="border-bottom: 1.2px solid #000000;">
              <td style="width: 38%; padding: 3px 5px; font-weight: 800; background: #f9f9f9; border-right: 1.2px solid #000000; vertical-align: top;">
                Detail in Source ${cfg.q2bData.sourceLetter} that I would follow up:
              </td>
              <td style="padding: 2px 4px;">
                <div class="task-line" style="height: 6.8mm;"></div>
                <div class="task-line" style="height: 6.8mm;"></div>
              </td>
            </tr>
            <tr style="border-bottom: 1.2px solid #000000;">
              <td style="padding: 3px 5px; font-weight: 800; background: #f9f9f9; border-right: 1.2px solid #000000; vertical-align: top;">
                Question I would ask:
              </td>
              <td style="padding: 2px 4px;">
                <div class="task-line" style="height: 6.8mm;"></div>
                <div class="task-line" style="height: 6.8mm;"></div>
              </td>
            </tr>
            <tr style="border-bottom: 1.2px solid #000000;">
              <td style="padding: 3px 5px; font-weight: 800; background: #f9f9f9; border-right: 1.2px solid #000000; vertical-align: top;">
                Type of source I would use:
              </td>
              <td style="padding: 2px 4px;">
                <div class="task-line" style="height: 6.8mm;"></div>
                <div class="task-line" style="height: 6.8mm;"></div>
              </td>
            </tr>
            <tr>
              <td style="padding: 3px 5px; font-weight: 800; background: #f9f9f9; border-right: 1.2px solid #000000; vertical-align: top;">
                How this would help me find out more:
              </td>
              <td style="padding: 2px 4px;">
                <div class="task-line" style="height: 6.8mm;"></div>
                <div class="task-line" style="height: 6.8mm;"></div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Additional Disciplinary Extension Lines -->
        <div style="flex: 1; display: flex; flex-direction: column; min-height: 0; margin-top: 1px;">
          <div class="lined-page-grid" style="flex: 1; min-height: 0; display: flex; flex-direction: column; margin: 0;">
            ${q2bLines}
          </div>
        </div>
      </div>
    `;
  }

  return `
  <!-- ------------------------------------------------------------------ -->
  <!-- LESSON OFFICIAL EXAM RESPONSE (PAGE ${pageNum})                    -->
  <!-- ------------------------------------------------------------------ -->
  <div class="page page-container verso-page" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Running Header -->
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 10.5pt; color: #000000; margin: 0; font-weight: 800;">
          ${cfg.title}
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
          Official Examination Response &bull; Question 1 &amp; Question 2
        </span>
      </div>

      <!-- Question 1 Official Answering Frame [4 marks] -->
      <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 4px 6px; background: #ffffff; margin-bottom: 2px;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000000; padding-bottom: 2px; margin-bottom: 2px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.6pt; text-transform: uppercase;">
            &bull; Question 1: Feature Drills [2 x 2 = 4 marks]
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 800; border: 1.2px solid #000000; padding: 0 5px; border-radius: 2px;">
            Q1 Total: [ &nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 4</strong> ]
          </span>
        </div>

        <!-- 1(a) Response Area -->
        <div style="margin-bottom: 3px; border-bottom: 1px dashed #cccccc; padding-bottom: 2px;">
          <div style="display: flex; justify-content: space-between; align-items: baseline;">
            <span style="font-family: 'Playfair Display', serif; font-size: 7.8pt; font-weight: 800; color: #000000;">
              1(a) ${cfg.q1Features.a.q}
            </span>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.6pt; font-weight: 800;">[ &nbsp;&nbsp; <strong>/ 2</strong> ]</span>
          </div>
          <div style="display: flex; align-items: baseline; gap: 6px; margin-top: 2px;">
            <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 800; text-transform: uppercase; width: 14mm;">Feature:</span>
            <div style="flex: 1; border-bottom: 1.2px solid #000000; height: 7.2mm;"></div>
          </div>
          <div style="display: flex; align-items: baseline; gap: 6px; margin-top: 2px;">
            <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 800; text-transform: uppercase; width: 14mm;">Detail:</span>
            <div style="flex: 1; border-bottom: 1.2px solid #000000; height: 7.2mm;"></div>
          </div>
          <div style="border-bottom: 1.2px solid #000000; height: 7.2mm; width: 100%;"></div>
        </div>

        <!-- 1(b) Response Area -->
        <div>
          <div style="display: flex; justify-content: space-between; align-items: baseline;">
            <span style="font-family: 'Playfair Display', serif; font-size: 7.8pt; font-weight: 800; color: #000000;">
              1(b) ${cfg.q1Features.b.q}
            </span>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.6pt; font-weight: 800;">[ &nbsp;&nbsp; <strong>/ 2</strong> ]</span>
          </div>
          <div style="display: flex; align-items: baseline; gap: 6px; margin-top: 2px;">
            <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 800; text-transform: uppercase; width: 14mm;">Feature:</span>
            <div style="flex: 1; border-bottom: 1.2px solid #000000; height: 7.2mm;"></div>
          </div>
          <div style="display: flex; align-items: baseline; gap: 6px; margin-top: 2px;">
            <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 800; text-transform: uppercase; width: 14mm;">Detail:</span>
            <div style="flex: 1; border-bottom: 1.2px solid #000000; height: 7.2mm;"></div>
          </div>
          <div style="border-bottom: 1.2px solid #000000; height: 7.2mm; width: 100%;"></div>
        </div>
      </div>

      <!-- Question 2 Response Area -->
      ${q2ResponseArea}

      ${renderFooterStrip(pageNum, cfg.linedLeftQuip, 28)}
    </div>
  </div>`;
}

// ============================================================================
// HELPER: RENDER OFFICIAL EXAM RESPONSE PAGE 2 (PAGE 4 OF LESSON)
// ============================================================================
function renderWfExamResponsePage2(cfg, pageNum) {
  const isQ2a = cfg.tariff.includes('2(a)');
  const q2Mark = isQ2a ? '8' : '4';
  const totalMark = isQ2a ? '12' : '8';

  // 32 ruled lines edge-to-edge (no margin cell) with exact 7.4mm height to utilize full page budget
  const linedRows = Array.from({ length: 32 }, (_, idx) => {
    const linePrompt =
      idx === 0
        ? `<span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-style: italic; color: #777777;">[ Question 2 Sustained Analysis Continued &bull; Contextual Knowledge &bull; Conclusion ]</span>`
        : `&nbsp;`;
    return `
      <div class="lined-row" style="height: 7.4mm; border-bottom: 1.2px solid #000000; box-sizing: border-box; width: 100%; display: flex; align-items: center;">
        ${linePrompt}
      </div>`;
  }).join('');

  return `
  <!-- ------------------------------------------------------------------ -->
  <!-- LESSON SUSTAINED RESPONSE & FINAL VERDICT (PAGE ${pageNum})        -->
  <!-- ------------------------------------------------------------------ -->
  <div class="page page-container recto-page" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Running Header -->
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 10.5pt; color: #000000; margin: 0; font-weight: 800;">
          ${cfg.title}
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
          Sustained Evaluation &bull; Disciplinary Context &bull; Historic Environment
        </span>
      </div>

      <!-- 30 Ruled Lines Across Page Width -->
      <div class="lined-page-grid" style="margin-top: 1px;">
        ${linedRows}
      </div>

      <!-- Teacher Feedback & Lesson Score Ledger Strip -->
      <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 3px 6px; background: #ffffff; display: flex; justify-content: space-between; align-items: center; margin-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.8pt;">
        <div>
          <span><strong>Q2 Score:</strong> [ &nbsp;&nbsp;&nbsp;&nbsp; <strong>/ ${q2Mark}</strong> ]</span>
          <span style="margin-left: 8px;"><strong>Lesson Total:</strong> [ &nbsp;&nbsp;&nbsp;&nbsp; <strong>/ ${totalMark}</strong> ]</span>
        </div>
        <div style="flex: 1; margin-left: 12px; display: flex; align-items: baseline;">
          <span style="font-weight: 700; margin-right: 6px;">Teacher Feedback / Target:</span>
          <div style="flex: 1; border-bottom: 1px dotted #888888; height: 12px;"></div>
        </div>
      </div>

      ${renderFooterStrip(pageNum, cfg.linedRightQuip, 28)}
    </div>
  </div>`;
}

// ============================================================================
// HELPER: RENDER EXPANDED ASSESSMENT RECORD & BACK COVER (PAGE 28)
// ============================================================================
function renderWfBackCover(cfgList, quipText) {
  const assessmentRows = [
    {
      enquiry: 'KT5.1',
      title: 'Trench Geography & Battles',
      q1: '<strong>Q1:</strong> Describe Two Features of Trenches / Arras [4m]',
      p1: 'p. 6',
      max1: 4,
      q2: '<strong>Q2(a):</strong> Source Utility Assessment (Trench Design) [8m]',
      p2: 'p. 6–7',
      max2: 8,
    },
    {
      enquiry: 'KT5.2',
      title: 'Trench Environment & Illnesses',
      q1: '<strong>Q1:</strong> Describe Two Features of Trench Foot / Fever [4m]',
      p1: 'p. 10',
      max1: 4,
      q2: '<strong>Q2(b):</strong> 4-Prompt Follow-Up Matrix (Living Conditions) [4m]',
      p2: 'p. 10–11',
      max2: 4,
    },
    {
      enquiry: 'KT5.3',
      title: 'Trauma, Shrapnel & Gas Attacks',
      q1: '<strong>Q1:</strong> Describe Two Features of Shrapnel / Poison Gas [4m]',
      p1: 'p. 14',
      max1: 4,
      q2: '<strong>Q2(a):</strong> Source Utility Assessment (Artillery Trauma) [8m]',
      p2: 'p. 14–15',
      max2: 8,
    },
    {
      enquiry: 'KT5.4',
      title: 'The Evacuation Chain & Transport',
      q1: '<strong>Q1:</strong> Describe Two Features of Dressing Station / FANY [4m]',
      p1: 'p. 18',
      max1: 4,
      q2: '<strong>Q2(b):</strong> 4-Prompt Follow-Up Matrix (Stretcher Transport) [4m]',
      p2: 'p. 18–19',
      max2: 4,
    },
    {
      enquiry: 'KT5.5',
      title: 'Splints, Antiseptics & Mobile X-Rays',
      q1: '<strong>Q1:</strong> Describe Two Features of Thomas Splint / X-Rays [4m]',
      p1: 'p. 22',
      max1: 4,
      q2: '<strong>Q2(a):</strong> Source Utility Assessment (Mobile X-Rays) [8m]',
      p2: 'p. 22–23',
      max2: 8,
    },
    {
      enquiry: 'KT5.6',
      title: 'Blood Storage, Brain & Plastic Surgery',
      q1: '<strong>Q1:</strong> Describe Two Features of Cushing / Gillies Surgery [4m]',
      p1: 'p. 26',
      max1: 4,
      q2: '<strong>Q2(b):</strong> 4-Prompt Follow-Up Matrix (Cambrai Blood Bank) [4m]',
      p2: 'p. 26–27',
      max2: 4,
    },
  ];

  const tableBodyHtml = assessmentRows
    .map(
      (item) => `
      <!-- ${item.enquiry}: ${item.title} -->
      <tr style="border-bottom: 1px dashed #d1d5db;">
        <td rowspan="2" style="padding: 10px 4px; text-align: center; font-weight: 900; font-size: 9pt; border-right: 1.5px solid #000000; background: #f8fafc; vertical-align: middle;">
          ${item.enquiry}
        </td>
        <td style="padding: 10px 8px; font-weight: 600; line-height: 1.35; border-right: 1.5px solid #000000; font-size: 7.8pt;">
          ${item.q1}
        </td>
        <td style="padding: 10px 4px; text-align: center; font-weight: 800; font-size: 8pt; border-right: 1.5px solid #000000; white-space: nowrap;">
          ${item.p1}
        </td>
        <td style="padding: 10px 4px; text-align: center; font-size: 9pt; font-weight: 900; border-right: 1.5px solid #000000; white-space: nowrap;">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / ${item.max1}
        </td>
        <td rowspan="2" style="padding: 6px 8px; vertical-align: top; font-size: 7pt; background: #ffffff;">
          <div style="font-family: 'Inter', sans-serif; font-size: 6pt; color: #777777; font-weight: 700; text-transform: uppercase; margin-bottom: 2px;">
            Marking Feedback &bull; Targets:
          </div>
          <div style="display: flex; flex-direction: column; justify-content: space-around; height: 18.5mm;">
            <div style="border-bottom: 1px dotted #d1d5db; height: 4.5mm;"></div>
            <div style="border-bottom: 1px dotted #d1d5db; height: 4.5mm;"></div>
            <div style="border-bottom: 1px dotted #d1d5db; height: 4.5mm;"></div>
            <div style="border-bottom: 1px dotted #d1d5db; height: 4.5mm;"></div>
          </div>
        </td>
      </tr>
      <tr style="border-bottom: 2px solid #000000;">
        <td style="padding: 10px 8px; font-weight: 600; line-height: 1.35; border-right: 1.5px solid #000000; font-size: 7.8pt;">
          ${item.q2}
        </td>
        <td style="padding: 10px 4px; text-align: center; font-weight: 800; font-size: 8pt; border-right: 1.5px solid #000000; white-space: nowrap;">
          ${item.p2}
        </td>
        <td style="padding: 10px 4px; text-align: center; font-size: 9pt; font-weight: 900; border-right: 1.5px solid #000000; white-space: nowrap;">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / ${item.max2}
        </td>
      </tr>
    `,
    )
    .join('');

  return `
  <!-- ------------------------------------------------------------------ -->
  <!-- PAGE 28: OUTSIDE BACK COVER & EXPANDED ASSESSMENT RECORD           -->
  <!-- ------------------------------------------------------------------ -->
  <div class="page page-container" id="page-28" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Top Departmental Branding -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 4px;">
        <div data-department-name="The History Department">
          <span style="font-family: 'Inter', sans-serif; font-size: 9.5pt; font-weight: 900; color: #000000; text-transform: uppercase; letter-spacing: 0.8px;">
            <span class="school-brand-target">The History Department</span>
          </span>
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 8.2pt; font-weight: 700; color: #000000;">
          KEY TOPIC 5 ASSESSMENT RECORD &bull; 6 CURRICULUM HOURS &bull; 1914–1918
        </div>
      </div>

      <!-- Student Target Grade Strip -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 7px 12px; background: #ffffff; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 14px; align-items: center; margin-bottom: 4px;">
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #000000; text-transform: uppercase; margin-right: 8px;">Pupil Name:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #000000; height: 14px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #000000; text-transform: uppercase; margin-right: 8px;">Target:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #000000; height: 14px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #000000; text-transform: uppercase; margin-right: 8px;">Current Grade:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #000000; height: 14px;"></div>
        </div>
      </div>

      <!-- Expanded Key Topic 5 Assessment Record Table (12 Exam Tasks) -->
      <div style="border: 2px solid #000000; border-radius: 4px; overflow: hidden; margin-bottom: 4px;">
        <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif;">
          <thead>
            <tr style="background: #000000; color: #ffffff; text-transform: uppercase; letter-spacing: 0.5px;">
              <th style="padding: 6px 4px; text-align: center; width: 8%; font-size: 7.2pt; font-weight: 800;">Enquiry</th>
              <th style="padding: 6px 8px; text-align: left; width: 42%; font-size: 7.2pt; font-weight: 800; border-left: 1px solid #444444;">Assessment Component Focus</th>
              <th style="padding: 6px 4px; text-align: center; width: 8%; font-size: 7.2pt; font-weight: 800; border-left: 1px solid #444444;">Page</th>
              <th style="padding: 6px 4px; text-align: center; width: 10%; font-size: 7.2pt; font-weight: 800; border-left: 1px solid #444444;">Score</th>
              <th style="padding: 6px 8px; text-align: left; width: 32%; font-size: 7.2pt; font-weight: 800; border-left: 1px solid #444444;">Teacher Comment &amp; Next Steps</th>
            </tr>
          </thead>
          <tbody>
            ${tableBodyHtml}
          </tbody>
        </table>
      </div>

      <!-- 6 Verified Micro-QR Codes with Dual QR (Lesson + Quiz) -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 4px 6px; background: #f8fafc;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase; letter-spacing: 0.5px;">
            &bull; Digital Learning &amp; Retrieval Hub &bull; Interactive Lessons &amp; Quizzes
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.6pt; font-weight: 700; color: #000000;">
            Interactive Textbook &bull; 10/20 Questions Per Enquiry
          </span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 4px;">
          ${cfgList
            .map((cfg, idx) => {
              const lessonUrl = `https://the-history-revision-hub.netlify.app/?unit=edexcel_medicine&lesson=${cfg.id}&view=lessons`;
              const quizUrl = `https://the-history-revision-hub.netlify.app/?unit=edexcel_medicine&lesson=${cfg.id}&quiz=true`;
              const lessonQrSvg = generateQrSvg(lessonUrl);
              const quizQrSvg = generateQrSvg(quizUrl);
              const shortLabels = [
                'Trenches & Mud',
                'Trench Illness',
                'Trauma & Gas',
                'Evacuation Chain',
                'Splints & X-Rays',
                'Blood & Plastic',
              ];
              return `
          <div style="border: 1px solid #000000; border-radius: 3px; padding: 3px 2px; background: #ffffff; display: flex; flex-direction: column; align-items: center; justify-content: space-between;">
            <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; margin-bottom: 1px;">
              KT5.${cfg.lessonNum}
            </div>
            <div style="font-family: 'Inter', sans-serif; font-size: 5.6pt; font-weight: 700; color: #333333; margin-bottom: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%;">
              ${shortLabels[idx]}
            </div>

            <!-- Top QR: Interactive Lesson Hub -->
            <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 3px; width: 100%;">
              <div style="width: 16.5mm; height: 16.5mm; margin: 0 auto 1px auto;">
                ${lessonQrSvg}
              </div>
              <span style="font-family: 'Inter', sans-serif; font-size: 5.2pt; font-weight: 800; text-transform: uppercase; background: #000000; color: #ffffff; padding: 1px 3px; border-radius: 2px; letter-spacing: 0.2px; white-space: nowrap;">
                Lesson Hub
              </span>
            </div>

            <!-- Bottom QR: Mastery Quiz -->
            <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
              <div style="width: 16.5mm; height: 16.5mm; margin: 0 auto 1px auto;">
                ${quizQrSvg}
              </div>
              <span style="font-family: 'Inter', sans-serif; font-size: 5.2pt; font-weight: 800; text-transform: uppercase; background: #000000; color: #ffffff; padding: 1px 3px; border-radius: 2px; letter-spacing: 0.2px; white-space: nowrap;">
                Mastery Quiz
              </span>
            </div>

            <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; color: #000000; margin-top: 2px; white-space: nowrap; border: 1px solid #000000; border-radius: 2px; padding: 1px 3px; background: #f8fafc;">
              Score: [ &nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 10</strong> ]
            </div>
          </div>
          `;
            })
            .join('')}
        </div>
      </div>

      ${renderFooterStrip(28, quipText, 28)}
    </div>
  </div>`;
}

// ============================================================================
// MAIN GENERATOR FUNCTION: 28-PAGE TWO-PAGE SPREAD WORKBOOK
// ============================================================================
function buildWesternFrontTwoPageWorkbook(unitData, period) {
  const lessons = unitData.lessons;

  // Resolve cover image base64
  const coverImgBase64 =
    getBase64Image('/images/stretcher_bearers_gilbert_rogers.jpg') ||
    getBase64Image('/units/edexcel_medicine/assets/authentic_western_front.jpg') ||
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
    .spine-stage-row {
      display: flex;
      flex: 1;
      min-height: 0;
      align-items: stretch;
      margin: 0;
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
      height: 7.4mm;
      width: 100%;
      box-sizing: border-box;
      margin: 0;
    }
    .task-line-dotted {
      border-bottom: 1.2px dotted #000000;
      height: 7.2mm;
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
    /* Clean Lined Paper Grid for Extended Writing Pages (Ruled lines across 100% width) */
    .lined-page-grid {
      display: flex;
      flex-direction: column;
      margin: 2px 0 3px 0;
      border-top: 1.2px solid #000000;
      width: 100%;
    }
    .lined-row {
      display: flex;
      align-items: center;
      width: 100%;
      height: 7.2mm;
      border-bottom: 1.2px solid #000000;
      box-sizing: border-box;
      padding-left: 2px;
      padding-right: 2px;
    }
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
  </style>
</head>
<body>
`;

  // ====================================================================
  // PAGE 1: FRONT COVER
  // ====================================================================
  html += `
  <div class="page page-container" id="page-1" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      
      <!-- Top Department & Specification Header Strip -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #000000; padding-bottom: 4px; margin-bottom: 6px;">
        <span data-department-name="The History Department" style="font-family: 'Inter', sans-serif; font-size: 8.5pt; font-weight: 900; letter-spacing: 0.5px; text-transform: uppercase;">
          <span class="school-brand-target">The History Department</span> &bull; GCSE Revision Hub
        </span>
        <span style="font-family: 'Inter', sans-serif; font-size: 8.5pt; font-weight: 800; text-transform: uppercase; color: #000000;">
          Edexcel GCSE (9-1) History &bull; Paper 1 Section A
        </span>
      </div>

      <!-- Student Identification Box -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 6px 12px; margin-bottom: 6px; background: #ffffff; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px;">
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #000000; text-transform: uppercase; margin-right: 8px;">Pupil:</strong>
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
          Key Topic 5 &bull; 6 Enquiry Hours &bull; 1914–1918
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
        <img src="${coverImgBase64}" alt="Stretcher Bearers of the Royal Army Medical Corps (RAMC) Lifting a Wounded Man out of a Trench by Gilbert Rogers (c1919)" style="width: 100%; height: 88mm; object-fit: cover; object-position: center 25%; display: block; margin: 0 auto; filter: grayscale(100%);">
        <div style="display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #000000; padding: 3px 8px; border-top: 1.5px solid #000000; background: #ffffff;">
          <span><strong>Primary Visual Evidence:</strong> <em>Stretcher Bearers of the RAMC Lifting a Wounded Man out of a Trench</em> &bull; Gilbert Rogers (c. 1919)</span>
          <span style="font-weight: 700;">OFFICIAL EDEXCEL SOURCE ARCHIVE &bull; IWM ART 2485 / RAMC HISTORIC COLLECTION</span>
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
  // PAGES 2–3: LIVING TIMELINE SPREAD (2 Pages, Milestones 1–6)
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

      <!-- 3 Vertical Timeline Milestone Containers -->
      <div style="display: flex; flex-direction: column; gap: 7px; flex: 1;">
        
        <!-- Milestone 1: OCT 1914 -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 5px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #000000;">
                OCT 1914 &bull; Flanders Mud &amp; The 1st Battle of Ypres
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Key Topic 5.1</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.22;">
              The British Expeditionary Force (BEF) holds the Ypres Salient. Low-lying Flanders clay creates a dangerously high water table; trenches fill with liquid mud. Shelling smashes all natural drainage canals, leaving men standing waist-deep in water and giving rise to the first epidemics of trench foot and dysentery.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 48mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>

        <!-- Milestone 2: APR 1915 -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 5px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #000000;">
                APR 1915 &bull; 2nd Battle of Ypres: The First Poison Gas Attack
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Key Topic 5.2 &bull; 5.3</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.22;">
              German forces release 160 tons of chlorine gas across a 4-mile front. British troops suffer suffocation and fluid in the lungs; soldiers improvise with urine-soaked pads before chemically impregnated cotton-pad respirators (the Hypo Helmet) are rushed to the front. Lice-borne trench fever breaks out across all divisions.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 48mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>

        <!-- Milestone 3: DEC 1915 -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 5px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #000000;">
                DEC 1915 &bull; The Thomas Splint &amp; Introduction of the Brodie Helmet
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Key Topic 5.3 &bull; 5.5</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.22;">
              Robert Jones introduces the Thomas Splint to frontline medical posts, stabilizing compound fractures and reducing femur mortality from 80% to 20%. Simultaneously, the War Office begins issuing John Brodie’s stamped steel helmet, reducing penetrating shrapnel head trauma by an estimated 75–80%.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 48mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>

      </div>

      ${renderFooterStrip(2, quipList[1], 28)}
    </div>
  </div>

  <!-- PAGE 3: LIVING TIMELINE PART 2 (MILESTONES 4–6: 1916–1917) -->
  <div class="page page-container recto-page" id="page-3" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div>
        <div style="border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 5px;">
          <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 11pt; color: #000000; text-transform: uppercase; font-weight: 800;">
            Living Timeline &bull; Part 2: Mass Offensives &amp; Clinical Innovation (1916–1917)
          </h2>
        </div>

        <div style="border-bottom: 1px solid #000000; padding-bottom: 4px; margin-bottom: 6px; font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #000000;">
          <strong>Instructions:</strong> Complete the timeline missions by sketching and annotating in the corresponding Key Topic boxes below.
        </div>
      </div>

      <!-- 3 Vertical Timeline Milestone Containers -->
      <div style="display: flex; flex-direction: column; gap: 7px; flex: 1;">
        
        <!-- Milestone 4: JULY 1916 -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 5px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #000000;">
                JULY 1916 &bull; The Battle of the Somme: The Triage Crisis
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">Key Topic 5.4</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.22;">
              The BEF suffers 57,000 casualties on 1 July 1916. Stretcher bearers and Casualty Clearing Stations are overwhelmed; motor ambulances struggle along single rutted roads. As a direct result, the RAMC enforces a strict three-tier triage system (Walking Wounded, Immediate Surgery, Moribund) to prevent total collapse.
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 48mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>

        <!-- Milestone 5: APR–NOV 1917 -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 5px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #000000;">
                APR–NOV 1917 &bull; Arras Underground Hospital &amp; Passchendaele Mud
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
  // Each lesson = 4 pages:
  //   Page 1: Environmental Inquiry Spine (5 Stages • Full Spec Coverage)
  //   Page 2: Section A Exam Blueprint & Source Investigation
  //   Page 3: Official Exam Response (Q1 Features [4m] + Q2 Start)
  //   Page 4: Official Exam Response Continued (Sustained Analysis [26 lines])
  // ====================================================================
  wfConfigs.forEach((cfg) => {
    const lesson = lessons[cfg.lessonIndex];
    const leftPageNum = (cfg.lessonNum - 1) * 4 + 4; // Pages 4, 8, 12, 16, 20, 24
    const rightPageNum = (cfg.lessonNum - 1) * 4 + 5; // Pages 5, 9, 13, 17, 21, 25
    const linedLeftPageNum = (cfg.lessonNum - 1) * 4 + 6; // Pages 6, 10, 14, 18, 22, 26
    const linedRightPageNum = (cfg.lessonNum - 1) * 4 + 7; // Pages 7, 11, 15, 19, 23, 27

    // Select primary source
    const sIdx = cfg.sourceIndex !== undefined ? cfg.sourceIndex : 0;
    const primarySource =
      lesson && lesson.sources && lesson.sources[sIdx]
        ? lesson.sources[sIdx]
        : {
            caption: 'Contemporary primary visual source from the Western Front.',
            provenance: 'Imperial War Museum Photographic Archive (1914–1918).',
          };

    // Resolve base64 image
    const b64Img = primarySource.src ? getBase64Image(primarySource.src) || primarySource.src : '';

    // Page 1: Environmental Inquiry Spine
    html += renderWfSpinePage(cfg, leftPageNum);

    // Page 2: Section A Exam Blueprint & Source Investigation
    html += renderWfExamBlueprintPage(
      cfg,
      rightPageNum,
      primarySource,
      b64Img,
      linedLeftPageNum,
      linedRightPageNum,
    );

    // Page 3: Official Exam Response Page 1 (Q1 Feature Drills + Q2 Start)
    html += renderWfExamResponsePage1(cfg, linedLeftPageNum);

    // Page 4: Official Exam Response Page 2 (Sustained Evaluation & Conclusion)
    html += renderWfExamResponsePage2(cfg, linedRightPageNum);
  });

  // ====================================================================
  // PAGE 28: BACK COVER - EXPANDED ASSESSMENT LEDGER & QUIZZING HUB
  // ====================================================================
  html += renderWfBackCover(wfConfigs, quipList[15]);

  html += `
</body>
</html>
`;

  return html;
}

module.exports = {
  buildWesternFrontTwoPageWorkbook,
};

if (require.main === module) {
  const { pathToFileURL } = require('url');
  (async () => {
    const mod = await import(
      pathToFileURL(path.resolve(__dirname, '../units/edexcel_medicine/data.js')).href
    );
    const customHtml = buildWesternFrontTwoPageWorkbook(mod.unitData, { name: 'western_front' });
    const unitPath = path.resolve(
      __dirname,
      '../units/edexcel_medicine/pupil_workbook_western_front.html',
    );
    const pubPath = path.resolve(
      __dirname,
      '../public/units/edexcel_medicine/pupil_workbook_western_front.html',
    );
    fs.writeFileSync(unitPath, customHtml, 'utf8');
    fs.writeFileSync(pubPath, customHtml, 'utf8');
    console.log('Successfully generated pupil_workbook_western_front.html to:');
    console.log(' -', unitPath);
    console.log(' -', pubPath);
  })();
}
