const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');

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
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" shape-rendering="crispEdges" style="width: 100%; height: 100%;"><path fill="#ffffff" d="M0,0h${size}v${size}H0z"/><path fill="#0f172a" d="${pathD.trim()}"/></svg>`;
}

function formatText(txt) {
  if (!txt) return '';
  return txt;
}

// Bespoke Bridge Tasks, Disciplinary Vocabulary Tasks, and Writing Frameworks for all 7 Great War Part 2 lessons
// Implements the 4-Skill Disciplinary Spiral:
// - Lesson 1: Dual-Source Utility (Edexcel Paper 1 & 3 Prep)
// - Lesson 2: Historical Interpretations Debate (Edexcel Paper 3 Prep)
// - Lesson 3: Historical Significance & Erasure
// - Lesson 4: Change & Continuity Matrix
// - Lesson 5: Causation & Analytical Narrative
// - Lesson 6: Local Archival Dual-Source Utility (Stubbington)
// - Lesson 7: Synoptic Capstone Synthesis
const lessonConfigs = [
  {
    // Lesson 1: Recruitment & The Rush to the Colours (1914)
    taskType: 'source_utility',
    genre: 'Genre 1: Source Utility & Enlistment Motivation',
    skill: 'Dual-Source Utility',
    genreNum: 1,
    enquiryQuestion:
      'Enquiry: How useful are Sources A and B for an enquiry into why British men volunteered to join the army in 1914?',
    sourceA: {
      title: 'Source A: Parliamentary Recruiting Committee Poster (1915)',
      shelfmark: 'IMPERIAL WAR MUSEUM • LONDON • ART.IWM PST 2763',
      text: '“Women of Britain say—‘GO!’ Is your lad in uniform yet? If not, why not? Won’t you send him to defend your honour? There are women who would give their lives to bring their boys back from the front, but they sent them willingly.”',
      clue: 'Provenance Clue: Official government propaganda poster designed to use domestic emotional guilt and public shame to compel men into uniform.',
    },
    sourceB: {
      title: 'Source B: Diary of Private Arthur Green, Portsmouth Dockyard (August 1914)',
      shelfmark: 'HAMPSHIRE RECORD OFFICE • WINCHESTER • 42M78/P12',
      text: '“When the call came, four of us from the naval fitting shop marched straight down to the Town Hall to join the Pompey Pals. We feared being called slackers, but mostly we wanted to stick together with our mates. It felt like the greatest adventure of our lives.”',
      clue: 'Provenance Clue: Private personal diary written at the time; reveals genuine peer camaraderie and fear of social disgrace among local workers.',
    },
    matrix: [
      {
        col: '1. CONTENT & DETAIL',
        text: 'Analyse what each source reveals about reasons for enlisting (shame vs patriotism vs peer camaraderie).',
      },
      {
        col: '2. PROVENANCE & MOTIVE',
        text: 'Evaluate how the origin and purpose of each source (state propaganda vs private diary) affects its reliability.',
      },
      {
        col: '3. HISTORICAL JUDGEMENT',
        text: 'Reach a reasoned conclusion: which source is more useful for understanding why ordinary men volunteered in 1914?',
      },
    ],
    connectives:
      'Source A is useful for showing that the state used... • However, its utility is limited because as propaganda it... • In contrast, Source B provides authentic insight into... • When cross-referenced with local Portsmouth history... • On balance, Source [A/B] is more valuable for this enquiry because...',
    vocabTask: {
      type: 'distinction',
      termA: 'British Expeditionary Force (BEF)',
      termB: 'Pals Battalions',
      prompt:
        'Distinguish between Britain’s small professional army of 120,000 regulars in August 1914 (<strong>BEF</strong>) and Kitchener’s civilian volunteer units raised from towns and workmates (<strong>Pals Battalions</strong>):',
    },
    bridgeTask: {
      type: 'ledger',
      badge: 'Analytical Balance Sheet & Motivation Audit',
      title: 'Task 3: The Enlistment Balance Sheet: Push Factors vs Pull Factors (1914)',
      instruction:
        'Balance the negative domestic pressures driving men into uniform against the positive incentives attracting them to join up:',
      col1Title: 'Push Factors (Domestic Pressure & Fear)',
      col1Prompts: [
        'The Order of the White Feather: public shaming on buses and parks.',
        'Emotional guilt from posters: "Women of Britain Say GO!".',
        'Fear of being branded a coward or slacker by neighbours.',
        'Grinding poverty, low industrial wages, and bleak factory work.',
      ],
      col2Title: 'Pull Factors (Patriotism & Opportunity)',
      col2Prompts: [
        'Lord Kitchener’s personal call: "Your Country Needs YOU".',
        'Defending "Brave Little Belgium" against brutal German aggression.',
        'Comradeship of Pals Battalions: serve alongside mates and brothers.',
        'Excitement, foreign adventure, regular food, and warm uniforms.',
      ],
      clue: '<em>Low-Floor Clue:</em> In Hampshire, over 1,000 men from Portsmouth Dockyard joined the Pompey Pals in just two weeks so they would not be separated from their workmates.',
      scholarsEdge:
        '<strong>★ Scholar’s Edge:</strong> How does the tragic wipeout of Pals Battalions on 1 July 1916 challenge the idea that voluntary local recruitment was a humane military policy?',
    },
  },
  {
    // Lesson 2: Trench Warfare & The Haig Debate (1915–1916)
    taskType: 'historical_interpretations',
    genre: 'Genre 2: Historical Interpretations & Military Leadership',
    skill: 'Historical Interpretations',
    genreNum: 2,
    enquiryQuestion:
      'Enquiry: How far do you agree with Interpretation 1 that General Haig was a callous and incompetent commander?',
    interp1: {
      title: 'Interpretation 1: Alan Clark, The Donkeys (1961)',
      badge: 'The Orthodox Critique: Incompetent Donkeys',
      text: '“British soldiers were lions led by donkeys. Haig was an unimaginative cavalryman who lived in distant comfort in French châteaux, completely out of touch with the frontline slaughter. On 1 July 1916, his stubborn refusal to change tactics condemned 57,470 men to death or injury on a single morning.”',
      author: 'Alan Clark (British Military Historian & Politician, 1961)',
    },
    interp2: {
      title: 'Interpretation 2: Professor Gary Sheffield, Forgotten Victory (2001)',
      badge: 'The Revisionist Defence: The Learning Curve',
      text: "“Haig was neither a butcher nor a bungler. He was trapped in an unprecedented industrial war where defense dominated attack. The British Army underwent a massive 'Learning Curve'. By 1918, Haig had mastered combined-arms warfare—using tanks, creeping barrages, and aircraft to smash the German Army.”",
      author: 'Prof. Gary Sheffield (Modern Military Historian, 2001)',
    },
    matrix: [
      {
        col: '1. INTERPRETATION 1 ARGUMENT',
        text: 'Explain Clark’s view: detached châteaux generals, cavalry obsession, and catastrophic Somme casualties.',
      },
      {
        col: '2. INTERPRETATION 2 ARGUMENT',
        text: 'Explain Sheffield’s view: lack of radio technology, relieving Verdun, and the tactical "learning curve".',
      },
      {
        col: '3. SUSTAINED HISTORICAL VERDICT',
        text: 'Evaluate which interpretation is more convincing: was Haig an incompetent "donkey" or a modernizing general?',
      },
    ],
    connectives:
      'Interpretation 1 contends that Haig was... Evidence supporting this critique includes... • In sharp contrast, Interpretation 2 argues that Haig... This is corroborated by... • Weighing both interpretations against historical evidence, I conclude that...',
    vocabTask: {
      type: 'mapping',
      termA: 'War of Attrition',
      termB: 'Creeping Barrage',
      prompt:
        'Write one analytical sentence connecting Haig’s strategic doctrine of a <strong>War of Attrition</strong> to the tactical evolution of the artillery <strong>Creeping Barrage</strong>:',
    },
    bridgeTask: {
      type: 'blueprint',
      badge: 'Defensive Architecture & Tactical Anatomy',
      title: 'Task 3: Anatomy of the Western Front: The Three-Line Trench Network',
      instruction:
        'Analyse the defensive engineering and lethal vectors of the trench system below:',
      features: [
        '① <strong>Frontline Trench:</strong> Firebays and traverses (zigzags) designed to contain blast and prevent enfilade fire.',
        '② <strong>No Man’s Land & Barbed Wire:</strong> 50–500 yards of cratered wasteland sown with impenetrable razor wire belts.',
        '③ <strong>Communication Trenches:</strong> Deep zigzag corridors connecting frontline to support and reserve lines under cover.',
        '④ <strong>Support & Reserve Lines:</strong> Concrete pillboxes, deep dugout shelters (up to 30ft underground), and machine-gun nests.',
      ],
      prompt:
        'In 3–4 sentences, explain why machine guns and barbed wire gave defensive forces an insurmountable advantage over attacking infantry in 1916:',
      lines: 7,
      clue: '<em>Low-Floor Clue:</em> A single German Maxim machine gun fired 500 rounds per minute—the equivalent of an entire rifle company firing simultaneously.',
      scholarsEdge:
        '<strong>★ Scholar’s Edge:</strong> Why did historian John Terraine argue that Haig had no alternative to attrition because there was "no open flank in France"?',
    },
  },
  {
    // Lesson 3: The Empire’s Forgotten Troops (1914–1918)
    taskType: 'extended_writing',
    genre: 'Genre 3: Historical Significance & Historiographical Marginalisation',
    skill: 'Historical Significance',
    genreNum: 3,
    enquiryQuestion:
      'Enquiry: Why were the military contributions of 4 million colonial soldiers and labourers marginalized in British memory?',
    structureStrip: [
      {
        col: '1. VITAL IMPERIAL MOBILISATION',
        text: 'Explain how 1.5 million Indian troops stabilized the frontline at Ypres and Neuve Chapelle in 1914, while the BWIR handled artillery shells and 140,000 Chinese labourers maintained supply lines.',
      },
      {
        col: '2. RACIAL DISCRIMINATION & CENSORSHIP',
        text: 'Explain the racial hierarchy: restricting non-white troops from combat in Europe, censoring sepoy letters, isolating wounded Indians behind gates at Brighton, and denying equal officer ranks.',
      },
      {
        col: '3. HISTORIOGRAPHICAL EVALUATION',
        text: 'Formulate your sustained thesis: why did postwar British commemoration erase non-white troops to create a white national myth of the "British Tommy", and why must this narrative be rewritten?',
      },
    ],
    connectives:
      'The decisive contribution of the British Empire is demonstrated by... • Furthermore, without the Indian Corps in 1914... • In direct contrast to this sacrifice, colonial troops experienced... • Consequently, postwar commemoration... • In conclusion, this marginalisation occurred because...',
    vocabTask: {
      type: 'distinction',
      termA: 'Sepoy',
      termB: 'Chinese Labour Corps (CLC)',
      prompt:
        'Distinguish between professional South Asian frontline infantrymen (<strong>sepoys</strong>) and the 140,000 non-combat civilian logistical workers recruited from China (<strong>CLC</strong>):',
    },
    bridgeTask: {
      type: 'matrix',
      badge: 'Imperial Mobilisation & Disciplinary Audit',
      title: 'Task 3: Imperial Contribution Matrix: The Global War Machine',
      instruction:
        'Audit the scale of mobilisation, key deployments, and postwar recognition across the Empire:',
      boxes: [
        {
          title: 'The Indian Army (1.5 Million Mobilised)',
          evidence:
            'Sepoy Khudadad Khan won the first VC at Hollebeke (1914). Indian divisions held 33% of the British frontline in autumn 1914, suffering over 74,000 dead across France and Mesopotamia.',
        },
        {
          title: 'British West Indies Regiment (16,000 Men)',
          evidence:
            'Caribbean volunteers served under relentless artillery fire carrying heavy shells and building supply roads. Barred from combat in France; rebelled against racism at Taranto in 1918.',
        },
        {
          title: 'Chinese Labour Corps (140,000 Men)',
          evidence:
            'Maintained railroads, unloaded munitions ships, and cleared unexploded ordnance. Over 20,000 died from Spanish Flu and shelling; buried in northern France with no public British monument.',
        },
        {
          title: 'African Troops & Carriers (Over 1 Million)',
          evidence:
            'Carrier Corps sustained the East Africa campaign under horrific conditions. Over 100,000 African porters died of exhaustion, disease, and starvation with zero individual gravestones.',
        },
      ],
      prompt:
        'Synthesise why David Olusoga terms the Western Front an "Empire battlefield", and explain why postwar memorials focused almost exclusively on white British soldiers:',
      lines: 7,
      clue: '<em>Low-Floor Clue:</em> Notice that without Indian troops in autumn 1914, the German army would likely have broken through to the Channel ports.',
      scholarsEdge:
        '<strong>★ Scholar’s Edge:</strong> How did the Imperial War Graves Commission’s 1923 policy systematically treat white soldiers to individual headstones while African dead received mass unmarked cairns?',
    },
  },
  {
    // Lesson 4: Total War & Daily Life on the Home Front (1914–1918)
    taskType: 'extended_writing',
    genre: 'Genre 1: Change and Continuity on the Home Front',
    skill: 'Change & Continuity',
    genreNum: 1,
    enquiryQuestion:
      'Enquiry: How far did the First World War transform the role of the British state and daily life on the Home Front?',
    structureStrip: [
      {
        col: '1. EXPANSION OF STATE POWER',
        text: 'Explain how DORA (1914) suspended civil liberties, censored the press, controlled alcohol, and introduced compulsory military conscription (1916) and food rationing (1918).',
      },
      {
        col: '2. WOMEN’S INDUSTRIAL MOBILISATION',
        text: 'Explain the breakthrough of 1 million female munitions workers ("Canary Girls"), toxic TNT exposure, financial independence, and the passage of the 1918 Representation of the People Act.',
      },
      {
        col: '3. SUSTAINED HISTORICAL JUDGEMENT',
        text: 'Evaluate whether the war caused a permanent revolution in British society, or whether the return to peacetime in 1919 forced women back into traditional domestic roles.',
      },
    ],
    connectives:
      'The outbreak of total war immediately altered daily life through... • In particular, state control reached unprecedented levels under DORA, which... • Concurrently, women experienced profound social transformation when... • However, this emancipation was qualified by... • In summary, the war transformed Britain by...',
    vocabTask: {
      type: 'mapping',
      termA: 'Defence of the Realm Act (DORA)',
      termB: 'Munitionettes ("Canary Girls")',
      prompt:
        'Write one analytical sentence connecting the sweeping government powers granted under <strong>DORA</strong> to the industrial mobilisation of female <strong>Munitionettes</strong>:',
    },
    bridgeTask: {
      type: 'ledger',
      badge: 'Total War Balance Sheet & Social Audit',
      title: 'Task 3: The Total War Ledger: State Expansion vs Female Emancipation',
      instruction:
        'Balance the repressive growth of state intervention against the progressive opportunities gained by women on the Home Front:',
      col1Title: 'State Coercion & Civil Control',
      col1Prompts: [
        'DORA: arrest without warrant, press censorship, and curfews.',
        'Conscription (1916): forced military service for all men aged 18–41.',
        'Brutal persecution of Conscientious Objectors (Richmond Sixteen).',
        'Compulsory food rationing (1918) for butter, sugar, and meat.',
      ],
      col2Title: 'Women’s Mobilisation & Freedom',
      col2Prompts: [
        'Over 1 million women in heavy industry, transport, and police work.',
        'Financial independence: munitionettes earned up to £5 a week.',
        'Heroic physical sacrifice: TNT poisoning and chemical explosions.',
        'Political enfranchisement: 1918 Representation of the People Act.',
      ],
      clue: '<em>Low-Floor Clue:</em> Before 1914, most working-class women were confined to domestic service as maids or laundry workers.',
      scholarsEdge:
        '<strong>★ Scholar’s Edge:</strong> Did the 1918 Act grant women the vote because of their war work, or because politicians feared a pre-war Suffragette resurgence if they were excluded?',
    },
  },
  {
    // Lesson 5: The Treaty of Versailles (1919)
    taskType: 'extended_writing',
    genre: 'Genre 2: Causation & Geopolitical Consequences',
    skill: 'Causation & Consequence',
    genreNum: 2,
    enquiryQuestion:
      'Enquiry: Was the Treaty of Versailles a justified peace or a fatally flawed compromise?',
    structureStrip: [
      {
        col: '1. ALLIED GRIEVANCES & CLAIMS',
        text: 'Explain Allied grievances: French devastation (1.4 million dead, industrial north ruined), Belgian occupation, the brutal German Treaty of Brest-Litovsk, and Article 231 (War Guilt).',
      },
      {
        col: '2. CLASHING AIMS & THE "DIKTAT"',
        text: 'Explain why Germans viewed the treaty as an unjust Diktat: loss of 13% territory, £6.6 billion reparations, 100,000-man army limit, and Will Dyson’s "1940 Class" cartoon warning.',
      },
      {
        col: '3. SUSTAINED HISTORICAL VERDICT',
        text: 'Formulate your judgment: was Versailles an unjust "Carthaginian peace" making WWII inevitable, or a reasonable compromise that failed only because the Allies refused to enforce it?',
      },
    ],
    connectives:
      'Allied statesmen justified severe terms on the grounds that... • Most controversially, Article 231 forced Germany to... • Conversely, critics like Keynes argued that... • The fatal flaw of the settlement was... • Ultimately, I conclude that Versailles was...',
    vocabTask: {
      type: 'distinction',
      termA: 'Article 231 (War Guilt)',
      termB: 'Reparations',
      prompt:
        'Distinguish between the moral clause placing sole blame on Germany (<strong>Article 231</strong>) and the financial compensation demanded by the Allies (<strong>Reparations</strong>):',
    },
    bridgeTask: {
      type: 'ledger',
      badge: 'Diplomatic Crucible & Treaty Audit',
      title: 'Task 3: The Versailles Compromise Ledger: Security vs Revenge vs Stability',
      instruction:
        'Audit the irreconcilable war aims of the Big Three leaders at the Paris Peace Conference:',
      col1Title: 'Clemenceau’s French Demands (Security & Revenge)',
      col1Prompts: [
        'Demanded permanent destruction of German military might.',
        'Annexation of Alsace-Lorraine and occupation of the Rhineland.',
        'Maximum reparations to pay for French reconstruction.',
        'Slogan: "Germany Must Pay!" — driven by fear of future invasion.',
      ],
      col2Title: 'Wilson & Lloyd George (Stability & Trade)',
      col2Prompts: [
        'Wilson’s 14 Points: national self-determination and League of Nations.',
        'Lloyd George wanted Germany as a strong British trading partner.',
        'Feared that an impoverished Germany would fall to Bolshevism (Communism).',
        'Warned that humiliating Germany would provoke future revenge.',
      ],
      clue: '<em>Low-Floor Clue:</em> The cartoonist Will Dyson drew Clemenceau leaving Versailles saying: "Curious! I seem to hear a child weeping!" — the child was labelled "1940 Class".',
      scholarsEdge:
        '<strong>★ Scholar’s Edge:</strong> Why did historian Margaret MacMillan argue that Versailles did not cause WWII, but rather the Allied failure to enforce its disarmament clauses in the 1930s?',
    },
  },
  {
    // Lesson 6: The "Lost Generation" & Stubbington (1914–1922)
    taskType: 'source_utility',
    genre: 'Genre 3: Local Archival Evidence & Communal Memory',
    skill: 'Local Source Utility',
    genreNum: 3,
    enquiryQuestion:
      'Enquiry: How useful are Sources A and B for an enquiry into the human cost of the Great War on the village of Stubbington?',
    sourceA: {
      title: 'Source A: Stubbington Parish Memorial Committee Minutes (1921)',
      shelfmark: 'HAMPSHIRE RECORD OFFICE • FAREHAM PARISH PAPERS • 88M81/W1',
      text: '“Resolved: That the memorial to the 67 men of this parish shall take the form of an open thatched shelter over the village water pump on the Green. It shall provide daily rest and shelter to villagers, so that our debt to the fallen shall be remembered in every hour of daily life, and not merely on Armistice Sunday.”',
      clue: 'Provenance Clue: Official parish council resolution proving villagers consciously chose a living, useful memorial over a remote stone pillar.',
    },
    sourceB: {
      title: 'Source B: Official Commemorative Scroll delivered to Arthur Tribbeck (1919)',
      shelfmark: 'NATIONAL ARCHIVES • ADM 171/123 • ROYAL NAVY COMMEMORATIVE REGISTER',
      text: '“He whom this scroll commemorates was numbered with those who, at the call of King and Country, left all that was dear to them, gave up their lives for freedom. Stoker Arthur Tribbeck, Royal Navy, lost in the blizzard wreck of HMS Narbrough, January 1918.” (Accompanied by the bronze "Dead Man’s Penny").',
      clue: 'Provenance Clue: Standardized national scroll issued directly to local families; demonstrates how private tragedy was honoured by the state.',
    },
    matrix: [
      {
        col: '1. CONTENT & INFERENCE',
        text: 'What do the sources reveal about how the community and bereaved families experienced loss (parish shelter vs family plaque)?',
      },
      {
        col: '2. PROVENANCE & MOTIVE',
        text: 'How does the origin and purpose of each record (local village council vs national crown scroll) shape its historical value?',
      },
      {
        col: '3. LOCAL ARCHIVAL JUDGEMENT',
        text: 'Which source is more useful for understanding the permanent transformation of Stubbington village after the war?',
      },
    ],
    connectives:
      'Source A is exceptionally valuable for revealing... • Furthermore, the choice of a thatched shelter shows... • In contrast, Source B demonstrates the intimate grief of local families such as... • Together, both sources prove that... • Ultimately, Source [A/B] is more revealing because...',
    vocabTask: {
      type: 'mapping',
      termA: 'Lost Generation',
      termB: 'Memorialisation',
      prompt:
        'Write one analytical sentence connecting the demographic catastrophe of the <strong>Lost Generation</strong> to the communal <strong>Memorialisation</strong> on Stubbington Green:',
    },
    bridgeTask: {
      type: 'local_archive',
      badge: 'Local Archival Forensic Dissection: Stubbington Green',
      title: 'Task 3: Forensic Dissection of the Stubbington War Memorial Shelter (1922)',
      instruction: 'Examine the archival evidence from our village green and parish records below:',
      records: [
        '① <strong>The 67 Names on the Beams:</strong> Hand-carved into English oak timbers under a unique thatched roof built over the village water pump.',
        '② <strong>The Lowry Brothers (Manor Way Grange):</strong> Major Auriol Lowry DSO MC survived with severe wounds; his brother Lt Cyril Lowry was killed leading his platoon in 1917.',
        '③ <strong>Arthur Tribbeck (Blacksmith):</strong> Lost two sons to the conflict, including Stoker Arthur Tribbeck drowned when HMS Narbrough was wrecked in a blizzard.',
        '④ <strong>The "Dead Man’s Penny":</strong> Heavy bronze memorial plaques inscribed "He died for freedom and honour" delivered to 67 bereaved Stubbington homes.',
      ],
      prompt:
        'In 3–4 sentences, explain why the parish of Stubbington chose to build a practical thatched shelter over the water pump rather than a cold stone obelisk:',
      lines: 7,
      clue: '<em>Low-Floor Clue:</em> The thatched shelter provided daily protection from the rain for villagers waiting for transport or gathering water, keeping the memory of the fallen intertwined with daily life.',
      scholarsEdge:
        '<strong>★ Scholar’s Edge:</strong> How does the Lowry family’s donation of the Holy Rood memorial lychgate demonstrate how the landed gentry used religious architecture to cope with the extinction of their family line?',
    },
  },
  {
    // Lesson 7: Capstone Assessment: The Great War (1914–1919)
    taskType: 'extended_writing',
    genre: 'Genre 4: Synoptic Historical Synthesis (Capstone Essay)',
    skill: 'Synoptic Historical Synthesis',
    genreNum: 4,
    enquiryQuestion:
      'Enquiry: “The First World War was a total war that completely transformed the modern world.” How far do you agree? (1914–1919)',
    structureStrip: [
      {
        col: '1. MILITARY & GEOPOLITICAL REVOLUTION',
        text: 'Explain how the war destroyed 4 historic empires (German, Russian, Austro-Hungarian, Ottoman), created modern industrialised warfare (tanks, planes, poison gas), and made the USA a global superpower.',
      },
      {
        col: '2. SOCIAL & IMPERIAL TRANSFORMATION',
        text: 'Explain the transformation of civil society: DORA, women’s industrial mobilisation and the 1918 vote, the mobilization of 4 million colonial troops, and the collapse of Victorian class deference.',
      },
      {
        col: '3. SYNOPTIC HISTORICAL JUDGEMENT',
        text: 'Formulate your sustained thesis: did the war genuinely build a progressive new world, or did it primarily bequeath trauma, economic exhaustion, and the seeds of another catastrophic conflict in 1939?',
      },
    ],
    connectives:
      'In assessing the transformative scale of the Great War... • Militarily and geopolitically, the conflict revolutionized the world through... • Concurrently, social and imperial structures were reshaped by... • However, this transformation was fundamentally compromised by... • In conclusion, I judge that...',
    vocabTask: {
      type: 'distinction',
      termA: 'Limited Warfare',
      termB: 'Total War',
      prompt:
        'Distinguish between 19th-century battles fought strictly between professional armies (<strong>limited warfare</strong>) and 20th-century conflicts mobilising entire civilian economies and populations (<strong>total war</strong>):',
    },
    bridgeTask: {
      type: 'matrix',
      badge: 'Synoptic Crucible & Master Synthesis',
      title: 'Task 3: Synoptic Master Matrix: The Four Turning Points (1914–1919)',
      instruction:
        'Synthesise the four decisive vectors that reshaped global history between 1914 and 1919:',
      boxes: [
        {
          title: '1. Industrialized Military Attrition',
          evidence:
            'Trench warfare, machine guns, heavy artillery, creeping barrages, and tanks transformed combat from heroic cavalry charges into mechanized industrial slaughter claiming 20 million lives.',
        },
        {
          title: '2. The Imperial & Global Dimension',
          evidence:
            '4 million non-white colonial troops and labourers mobilized across Europe and Africa, shattering the myth of European racial superiority and igniting global anti-colonial movements.',
        },
        {
          title: '3. Total War & Domestic Mobilisation',
          evidence:
            'State intervention exploded via DORA, national conscription, and food rationing; over 1 million women entered heavy industry, paving the way for the 1918 voting reform.',
        },
        {
          title: '4. The Flawed Geopolitical Settlement',
          evidence:
            'Fall of 4 empires (Romanov, Hohenzollern, Habsburg, Ottoman); fragile League of Nations established; Article 231 and reparations fostered bitter German resentment.',
        },
      ],
      prompt:
        'Evaluate which of these four vectors produced the most permanent structural change in the modern world:',
      lines: 7,
      clue: '<em>Low-Floor Clue:</em> Notice how total war required governments to control every factory, newspaper, and meal, permanently ending the Victorian era of small government.',
      scholarsEdge:
        '<strong>★ Scholar’s Edge:</strong> How does historian Eric Hobsbawm’s concept of the "Age of Extremes" argue that 1914 marked the true birth of the 20th century?',
    },
  },
];

function buildGreatWarPart2TwoPageWorkbook(unitData, period) {
  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Pupil Workbook - great_war_part2</title>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,500;1,600&display=swap" rel="stylesheet">
  <style>
    *, *:before, *:after { box-sizing: border-box; }
    @page {
      size: A4 portrait;
      margin: 15mm 20mm 15mm 20mm;
    }
    body {
      font-family: 'Georgia', 'Garamond', serif;
      font-size: 10pt;
      line-height: 1.35;
      color: #1e293b;
      margin: 0;
      padding: 0;
      background: #ffffff;
    }
    h1, h2, h3, h4, h5, h6, strong, th, .sans {
      font-family: 'Inter', -apple-system, sans-serif;
    }
    .page, .page-container {
      width: 100%;
      height: 256mm;
      max-height: 256mm;
      overflow: hidden;
      box-sizing: border-box;
      position: relative;
      page-break-after: always;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .page:last-child, .page-container:last-child {
      page-break-after: auto;
    }
    .task-line {
      border-bottom: 1.2px solid #475569;
      height: 7.6mm;
      width: 100%;
      box-sizing: border-box;
    }
    .task-line-dotted {
      border-bottom: 1.2px solid #475569;
      height: 5.6mm;
      width: 100%;
      box-sizing: border-box;
    }
    .archival-badge {
      font-family: 'Inter', sans-serif;
      font-size: 7.8pt;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      padding: 2.5px 7px;
      border-radius: 3px;
      background: #f1f5f9;
      color: #475569;
      border: 1px solid #cbd5e1;
      font-weight: 600;
    }
  </style>
</head>
<body>
`;

  // ==========================================
  // PAGE 1: FRONT COVER (Recto, Right Page)
  // ==========================================
  html += `
  <div class="page page-container" id="page-1" style="padding: 16px 18px; border: 1px solid #cbd5e1; outline: 3.5px double #0f172a; outline-offset: -8px; justify-content: flex-start;">
    <!-- Institutional Header & Pupil Registration Strip -->
    <div style="margin-bottom: 10px;">
      <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px;">
        <span style="font-family: 'Inter', sans-serif; font-size: 8.5pt; text-transform: uppercase; letter-spacing: 2px; color: #1e3a8a; font-weight: 700;">
          The History Portal &bull; Department of History
        </span>
        <span style="font-family: 'Inter', sans-serif; font-size: 8pt; text-transform: uppercase; letter-spacing: 1.5px; color: #64748b; font-weight: 600;">
          Year 9 History &bull; KS3 Core
        </span>
      </div>

      <!-- Pupil Name & Class Box at Top -->
      <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 6px 12px; background: #f8fafc; display: grid; grid-template-columns: 2.2fr 1fr; gap: 18px; align-items: center;">
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; white-space: nowrap; margin-right: 8px;">Pupil Name:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #334155; height: 14px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; white-space: nowrap; margin-right: 8px;">Class:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #334155; height: 14px;"></div>
        </div>
      </div>
    </div>

    <!-- Main Title Block -->
    <div style="text-align: center; border-bottom: 1px solid #cbd5e1; padding: 2px 0 8px 0; margin-bottom: 9px;">
      <h1 style="font-family: 'Playfair Display', serif; font-size: 22pt; color: #0f172a; margin: 0 0 3px 0; text-transform: uppercase; letter-spacing: 1.2px; line-height: 1.15;">
        The Great War: 1914–1919
      </h1>
      <div style="font-family: 'Inter', sans-serif; font-size: 9.2pt; color: #334155; font-weight: 500; letter-spacing: 0.5px;">
        Voluntary Enlistment, Trench Warfare, Global Empire &amp; The Peace of Versailles
      </div>
    </div>

    <!-- Overarching Enquiry Callout Box -->
    <div style="border: 1.5px solid #1e3a8a; border-radius: 5px; padding: 9px 16px; background: #f8fafc; margin-bottom: 9px; text-align: center;">
      <div style="font-family: 'Inter', sans-serif; font-size: 7.8pt; text-transform: uppercase; letter-spacing: 1.8px; color: #1e3a8a; font-weight: 700; margin-bottom: 3px;">
        Overarching Historical Enquiry:
      </div>
      <div style="font-family: 'Playfair Display', serif; font-size: 11pt; color: #0f172a; font-style: italic; line-height: 1.35;">
        “How did a single spark in Sarajevo ignite a global conflict that transformed the modern world?”
      </div>
    </div>

    <!-- Front Cover Image Container -->
    <div style="border: 1.2px solid #cbd5e1; border-radius: 5px; overflow: hidden; background: #f1f5f9; text-align: center; margin-bottom: 8px; flex: 1; display: flex; flex-direction: column; justify-content: center;">
      <img src="../../images/stubbington_memorial_1.jpg" alt="Stubbington War Memorial Shelter" style="max-height: 98mm; width: 100%; object-fit: cover; object-position: center right; display: block;">
      <div style="padding: 4px 10px; background: #ffffff; border-top: 1px solid #e2e8f0; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #475569; text-align: center; font-style: italic;">
        The Stubbington War Memorial Shelter on the Village Green, erected in 1922 to commemorate the 67 local men who died in the Great War.
      </div>
    </div>

    <!-- Term & Specification Strip -->
    <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #cbd5e1; border-bottom: 1px solid #cbd5e1; padding: 4.5px 6px; margin-bottom: 8px; font-family: 'Inter', sans-serif; font-size: 8pt; color: #475569;">
      <span><strong>Term:</strong> Autumn Term &bull; Year 9</span>
      <span><strong>Edition:</strong> 2026.1 Departmental Standard</span>
      <span><strong>Format:</strong> 20-Page Double-Page Spread (5 A3 Sheets)</span>
    </div>

    <!-- Disciplinary Genres Ribbon -->
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 5px; margin-bottom: 7px; text-align: center;">
      <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 3px; padding: 3px 2px;">
        <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 700; color: #1e3a8a; text-transform: uppercase; display: block;">Genre 1</span>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #334155;">Causal Weighting</span>
      </div>
      <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 3px; padding: 3px 2px;">
        <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 700; color: #1e3a8a; text-transform: uppercase; display: block;">Genre 2</span>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #334155;">Military Evaluation</span>
      </div>
      <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 3px; padding: 3px 2px;">
        <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 700; color: #1e3a8a; text-transform: uppercase; display: block;">Genre 3</span>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #334155;">Local &amp; Imperial Case</span>
      </div>
      <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 3px; padding: 3px 2px;">
        <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 700; color: #1e3a8a; text-transform: uppercase; display: block;">Genre 4</span>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #334155;">Synoptic Synthesis</span>
      </div>
    </div>

    <!-- Preservation & Academic Integrity Footer -->
    <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #64748b; text-align: center; line-height: 1.35; padding-top: 2px;">
      This workbook is a permanent academic record of historical scholarship. Bring it to every history lesson.
    </div>
  </div>
  `;

  // ==========================================
  // PAGE 2: PROGRESS & ASSESSMENT TRACKER (Verso, Left Page)
  // ==========================================
  html += `
  <div class="page page-container" id="page-2" style="padding: 10px 0; display: flex; flex-direction: column; height: 260mm; justify-content: space-between;">
    <div>
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #1e3a8a; padding-bottom: 4px; margin-bottom: 7px;">
        <h2 style="margin: 0; color: #1e3a8a; font-size: 14pt; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">
          Progress &amp; Assessment Tracker
        </h2>
        <div style="font-family: 'Inter', sans-serif; font-size: 8.5pt; font-weight: 600; color: #334155;">
          Target Level: <span style="display: inline-block; width: 65px; border-bottom: 1.5px solid #0f172a; margin-left: 4px;"></span>
        </div>
      </div>
      
      <!-- Grading Criteria Benchmarks -->
      <table style="width: 100%; border-collapse: collapse; text-align: left; font-family: 'Inter', sans-serif; font-size: 7.2pt; line-height: 1.2; margin-bottom: 6px;">
        <tbody>
          <tr>
            <td style="border: 1px solid #94a3b8; padding: 3px 6px; font-weight: 700; background-color: #1e3a8a; color: #ffffff; width: 10%; text-transform: uppercase; letter-spacing: 0.5px;">Criteria</td>
            <td style="border: 1px solid #cbd5e1; padding: 3px 6px; width: 22.5%; background: #f8fafc;"><strong style="color: #0f172a;">Emerging (1–2):</strong> Recalls isolated facts; basic descriptive narrative of battles/trenches.</td>
            <td style="border: 1px solid #cbd5e1; padding: 3px 6px; width: 22.5%; background: #ffffff;"><strong style="color: #0f172a;">Emerging+ (3):</strong> Identifies causes &amp; consequences with simple explanation.</td>
            <td style="border: 1px solid #cbd5e1; padding: 3px 6px; width: 22.5%; background: #f8fafc;"><strong style="color: #0f172a;">Expected (4–5):</strong> Structured PEEL arguments; supports claims with specific wartime evidence.</td>
            <td style="border: 1px solid #cbd5e1; padding: 3px 6px; width: 22.5%; background: #ffffff;"><strong style="color: #0f172a;">Greater Depth (6–9):</strong> Analytical balance; nuanced historical judgements on total war.</td>
          </tr>
          <tr>
            <td style="border: 1px solid #94a3b8; padding: 2.5px 6px; font-weight: 700; background-color: #0f2942; color: #ffffff; width: 10%; text-transform: uppercase; letter-spacing: 0.5px;">Effort</td>
            <td style="border: 1px solid #cbd5e1; padding: 2.5px 6px; background: #f8fafc;"><strong style="color: #0f172a;">1 • Concern:</strong> Disengaged / incomplete work.</td>
            <td style="border: 1px solid #cbd5e1; padding: 2.5px 6px; background: #ffffff;"><strong style="color: #0f172a;">2 • Inconsistent:</strong> Requires repeated prompting.</td>
            <td style="border: 1px solid #cbd5e1; padding: 2.5px 6px; background: #f8fafc;"><strong style="color: #0f172a;">3 • Satisfactory:</strong> Meets baseline expectations.</td>
            <td style="border: 1px solid #cbd5e1; padding: 2.5px 6px; background: #ffffff;"><strong style="color: #0f172a;">4 • Good / 5 • Exemplary:</strong> Proactive focus; voluntary Scholar’s Edge extension.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div style="width: 100%; display: flex; justify-content: center; flex: 1; min-height: 0; margin-bottom: 4px;">
      <table style="page-break-inside: avoid; width: 100%; height: 100%; border-collapse: collapse; text-align: left; font-family: 'Inter', sans-serif; font-size: 7.6pt; line-height: 1.22; background-color: #ffffff; table-layout: fixed;">
        <thead>
          <tr style="background-color: #1e3a8a; color: #ffffff;">
            <th style="border: 1px solid rgba(255,255,255,0.35); padding: 5px 8px; width: 25%; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; font-size: 7.4pt;">Lesson / Enquiry Title</th>
            <th style="border: 1px solid rgba(255,255,255,0.35); padding: 5px 3px; width: 6.5%; text-align: center; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; font-size: 7.4pt;">Effort (1–5)</th>
            <th style="border: 1px solid rgba(255,255,255,0.35); padding: 5px 3px; width: 5.5%; text-align: center; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; font-size: 7.4pt;">Level</th>
            <th style="border: 1px solid rgba(255,255,255,0.35); padding: 5px 10px; width: 63%; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; font-size: 7.4pt;">Teacher Formative Feedback &amp; Next Steps</th>
          </tr>
        </thead>
        <tbody>
  `;

  lessonConfigs.forEach((cfg, i) => {
    const bg = i % 2 === 1 ? 'background-color: #f8fafc;' : 'background-color: #ffffff;';
    html += `
          <tr style="${bg}">
            <td style="border: 1px solid #cbd5e1; padding: 5px 8px; font-weight: 600; font-size: 7.3pt; color: #0f172a; line-height: 1.25;">
              <div style="color: #1e3a8a; font-weight: 700; font-size: 7.6pt; text-transform: uppercase; margin-bottom: 1px;">Lesson ${i + 1}</div>
              <div style="color: #334155; font-weight: 500;">${cfg.enquiryQuestion.replace(/^Enquiry:\s*/i, '')}</div>
            </td>
            <td style="border: 1px solid #cbd5e1; padding: 3px; text-align: center; font-weight: 600; font-size: 8.5pt; color: #0f172a;"></td>
            <td style="border: 1px solid #cbd5e1; padding: 3px; text-align: center; font-weight: 600; font-size: 8.5pt; color: #0f172a;"></td>
            <td style="border: 1px solid #cbd5e1; padding: 5px 10px; vertical-align: top;"></td>
          </tr>
    `;
  });

  html += `
          <tr style="background-color: #e2e8f0; font-weight: bold;">
            <td style="border: 1px solid #94a3b8; padding: 5px 8px; text-align: right; color: #0f172a; font-size: 7.8pt; text-transform: uppercase; letter-spacing: 0.5px;">
              Final Unit Level &bull; Target Outcome:
            </td>
            <td style="border: 1px solid #94a3b8; padding: 3px; background: #ffffff; text-align: center; font-size: 9.5pt; font-weight: 700; color: #1e3a8a;"></td>
            <td style="border: 1px solid #94a3b8; padding: 3px; background: #ffffff; text-align: center; font-size: 9.5pt; font-weight: 700; color: #1e3a8a;"></td>
            <td style="border: 1px solid #94a3b8; padding: 5px 10px; background: #ffffff;"></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  `;

  // ==========================================
  // PAGE 3: COURSE MAP & TIMELINE (Recto, Right Page)
  // ==========================================
  html += `
  <div class="page page-container" id="page-3" style="padding: 10px 0; display: flex; flex-direction: column; height: 260mm; justify-content: space-between;">
    <div style="flex-shrink: 0;">
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #0f172a; padding-bottom: 4px; margin-bottom: 6px;">
        <h2 style="margin: 0; font-size: 14.5pt; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px;">Curriculum Roadmap &amp; Chronological Spine</h2>
        <span class="archival-badge">1914 – 1919</span>
      </div>
      <p style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #475569; margin: 0; line-height: 1.35;">
        Trace the 5-year transformation of global conflict: from voluntary recruitment in 1914 to the bloodbath of the Somme, total home front mobilisation, and the Paris Peace Conference.
      </p>
    </div>

    <!-- Visual Chronological Spine -->
    <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; margin: 8px 0; padding: 4px 0;">
  `;

  const timelineItems = [
    {
      year: '1914',
      title: 'Outbreak, BEF Mobilisation & Kitchener’s Call',
      desc: 'Assassination in Sarajevo; Britain enters war; 500,000 volunteers enlist; Pompey Pals formed in Portsmouth.',
    },
    {
      year: '1914',
      title: 'First Battle of Ypres: Sepoy Khudadad Khan VC',
      desc: 'Indian Army divisions arrive in France to stabilize the British frontline against overwhelming German assaults.',
    },
    {
      year: '1915',
      title: 'Munitions Crisis, DORA & Women in Industry',
      desc: 'Shell shortages prompt state takeover of factories; Lloyd George mobilises women as "Canary Girls"; DORA expands.',
    },
    {
      year: '1916',
      title: 'Military Service Act (Conscription) & The Somme',
      desc: 'Compulsory conscription begins; 57,470 British casualties on Day 1 of the Somme; Haig’s war of attrition.',
    },
    {
      year: '1917',
      title: 'Passchendaele, Tank Warfare & Global Labour',
      desc: 'Mud of Third Ypres; 140,000 Chinese labourers and BWIR handle ammunition; first major tank attack at Cambrai.',
    },
    {
      year: '1918',
      title: 'Spring Offensive, Hundred Days & Armistice',
      desc: 'German Kaiserschlacht fails; Allied combined-arms Hundred Days Offensive breaks Hindenburg Line; Armistice signed.',
    },
    {
      year: '1919',
      title: 'Paris Peace Conference & Treaty of Versailles',
      desc: 'The Big Three draft the peace; Article 231 war guilt and £6.6bn reparations imposed; League of Nations founded.',
    },
    {
      year: '1922',
      title: 'Communal Memorialisation: Stubbington Green',
      desc: 'Thatched memorial shelter built over village pump on Stubbington Green, honoring 67 fallen local heroes.',
    },
  ];

  timelineItems.forEach((t) => {
    html += `
      <div style="display: flex; gap: 10px; align-items: center; border-left: 2px solid #1e3a8a; padding-left: 10px; margin-left: 5px;">
        <span style="font-family: 'Inter', sans-serif; font-size: 8.5pt; font-weight: 700; color: #1e3a8a; min-width: 42px;">${t.year}</span>
        <div>
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; color: #0f172a; display: block;">${t.title}</strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #475569; line-height: 1.25; display: block;">${t.desc}</span>
        </div>
      </div>
    `;
  });

  html += `
    </div>

    <!-- Hampshire & Meon Valley Local History Callout Box -->
    <div style="flex-shrink: 0; border: 1.5px solid #bae6fd; background: #f0f9ff; border-radius: 6px; padding: 8px 12px; margin-bottom: 6px;">
      <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0369a1; display: block; margin-bottom: 3px;">🏛️ Hampshire &amp; Meon Valley Local History Connection:</strong>
      <p style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #1e293b; margin: 0; line-height: 1.35;">
        The Great War is engraved into our local Hampshire landscape: from the Portsmouth Dockyard workers who formed the 14th and 15th (Portsmouth) Battalions—the famous <strong>Pompey Pals</strong> who suffered catastrophic losses on the Somme—to the <strong>Stubbington Village War Memorial</strong> on the green commemorating 67 fallen men, including blacksmith Arthur Tribbeck’s sons and the Lowry brothers of Manor Way Grange.
      </p>
    </div>

    <div style="flex-shrink: 0; font-family: 'Inter', sans-serif; font-size: 8.2pt; font-weight: 600; color: #475569; text-align: center; border-top: 1px solid #cbd5e1; padding-top: 5px;">
      Turn overleaf to begin <strong>Lesson 1 (Pages 4–5 Facing Spread)</strong> ➔
    </div>
  </div>
  `;

  // ==========================================
  // LESSONS 1 TO 7: FACING 2-PAGE SPREADS!
  // ==========================================
  lessonConfigs.forEach((cfg, lIdx) => {
    const leftPageNum = lIdx * 2 + 4;
    const rightPageNum = lIdx * 2 + 5;

    // ----------------------------------------------------
    // LEFT PAGE (Verso, Even Page Number: 4, 6, 8, 10, 12, 14, 16)
    // ----------------------------------------------------
    html += `
    <div class="page page-container" id="page-${leftPageNum}">
      <div>
        <!-- Lesson Header -->
        <div style="border-bottom: 2px solid #1e3a8a; padding-bottom: 4px; margin-bottom: 6px; display: flex; justify-content: space-between; align-items: flex-end;">
          <div>
            <div style="font-family: 'Inter', sans-serif; font-size: 8pt; text-transform: uppercase; letter-spacing: 1px; color: #64748b; font-weight: 600;">
              KS3 The Great War &bull; Lesson ${lIdx + 1}
            </div>
            <h2 style="font-family: 'Playfair Display', serif; font-size: 13pt; color: #0f172a; margin: 2px 0 0 0; line-height: 1.2;">
              L${lIdx + 1}: ${cfg.enquiryQuestion.replace(/^Enquiry:\s*/i, '')}
            </h2>
          </div>
        </div>

        <!-- Learning Objectives -->
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 5px 8px; margin-bottom: 6px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; text-transform: uppercase; color: #475569; letter-spacing: 0.5px; display: block; margin-bottom: 2px;">Core Learning Objectives:</strong>
          <ul style="margin: 0; padding-left: 16px; font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #334155; line-height: 1.35;">
            <li>Explain the historical context, key protagonists, and competing perspectives of this enquiry.</li>
            <li>Deploy precise factual evidence to analyse cause, consequence, or military significance.</li>
            <li>Formulate an independent, evaluative historical judgement supported by causal reasoning.</li>
          </ul>
        </div>

        <!-- Do Now Recall Strip -->
        <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 5px 8px; margin-bottom: 6px; background: #ffffff;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 3px; margin-bottom: 4px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; text-transform: uppercase; letter-spacing: 0.6px; color: #0f172a;">Task 1: 'Do Now' Retrieval Practice</strong>
            </div>
            <span style="font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 700; color: #1e3a8a; background: #eff6ff; border: 1px solid #bfdbfe; padding: 1px 7px; border-radius: 3px;">Score: &nbsp; &nbsp; / 5</span>
          </div>
          <div style="grid-template-columns: repeat(5, 1fr); gap: 6px; display: grid;">
            <div style="background: #fafaf9; border: 1px solid #e2e8f0; border-radius: 3px; padding: 3px 5px;">
              <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 700; color: #1e3a8a; margin-bottom: 1px;">Q1 (Last)</div>
              <div class="task-line-dotted" style="height: 5.5mm;"></div>
              <div class="task-line-dotted" style="height: 5.5mm;"></div>
            </div>
            <div style="background: #fafaf9; border: 1px solid #e2e8f0; border-radius: 3px; padding: 3px 5px;">
              <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 700; color: #1e3a8a; margin-bottom: 1px;">Q2 (Last)</div>
              <div class="task-line-dotted" style="height: 5.5mm;"></div>
              <div class="task-line-dotted" style="height: 5.5mm;"></div>
            </div>
            <div style="background: #fafaf9; border: 1px solid #e2e8f0; border-radius: 3px; padding: 3px 5px;">
              <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 700; color: #1e3a8a; margin-bottom: 1px;">Q3 (2 Ago)</div>
              <div class="task-line-dotted" style="height: 5.5mm;"></div>
              <div class="task-line-dotted" style="height: 5.5mm;"></div>
            </div>
            <div style="background: #fafaf9; border: 1px solid #e2e8f0; border-radius: 3px; padding: 3px 5px;">
              <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 700; color: #1e3a8a; margin-bottom: 1px;">Q4 (Unit)</div>
              <div class="task-line-dotted" style="height: 5.5mm;"></div>
              <div class="task-line-dotted" style="height: 5.5mm;"></div>
            </div>
            <div style="background: #fafaf9; border: 1px solid #e2e8f0; border-radius: 3px; padding: 3px 5px;">
              <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 700; color: #1e3a8a; margin-bottom: 1px;">Q5 (Synoptic)</div>
              <div class="task-line-dotted" style="height: 5.5mm;"></div>
              <div class="task-line-dotted" style="height: 5.5mm;"></div>
            </div>
          </div>
        </div>

        <!-- Core Vocabulary -->
        <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 5px 8px; margin-bottom: 6px; background: #fdfbf7;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; text-transform: uppercase; color: #0f172a; letter-spacing: 0.5px;">Task 2: Core Disciplinary Vocabulary</strong>
          </div>
    `;

    if (cfg.vocabTask.type === 'distinction') {
      html += `
          <div style="font-family: 'Inter', sans-serif; font-size: 8.2pt; color: #334155; margin-bottom: 3px;">
            ${cfg.vocabTask.prompt}
          </div>
          <div class="auto-fill-lines" data-line-height="5.6" data-line-type="task-line-dotted">
            <div class="task-line-dotted" style="height: 5.6mm;"></div>
            <div class="task-line-dotted" style="height: 5.6mm;"></div>
          </div>
      `;
    } else if (cfg.vocabTask.type === 'mapping') {
      html += `
          <div style="font-family: 'Inter', sans-serif; font-size: 8.2pt; color: #334155; margin-bottom: 3px;">
            ${cfg.vocabTask.prompt}
          </div>
          <div class="auto-fill-lines" data-line-height="5.6" data-line-type="task-line-dotted">
            <div class="task-line-dotted" style="height: 5.6mm;"></div>
            <div class="task-line-dotted" style="height: 5.6mm;"></div>
          </div>
      `;
    }

    html += `
        </div>

        <!-- Task 3 Preparation Bridge Container -->
        <div style="border: 1.5px solid #1e3a8a; border-radius: 5px; padding: 7px 9px; background: #ffffff; margin-bottom: 6px;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid #1e3a8a; padding-bottom: 3px; margin-bottom: 5px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #1e3a8a; text-transform: uppercase; letter-spacing: 0.5px;">
              ${cfg.bridgeTask.title}
            </strong>
            <span class="archival-badge" style="background: #eff6ff; color: #1e3a8a; border-color: #bfdbfe;">
              ${cfg.bridgeTask.badge}
            </span>
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 8.2pt; color: #334155; margin-bottom: 5px;">
            ${cfg.bridgeTask.instruction}
          </div>
    `;

    if (cfg.bridgeTask.type === 'ledger') {
      html += `
          <div class="auto-fill-ledger" style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 5px;">
            <div style="border: 1px solid #cbd5e1; border-radius: 4px; padding: 6px 7px; background: #f8fafc;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0369a1; display: block; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 3px;">${cfg.bridgeTask.col1Title}</strong>
              <ul style="margin: 0 0 5px 0; padding-left: 15px; font-family: 'Inter', sans-serif; font-size: 8pt; color: #475569; line-height: 1.35;">
                ${cfg.bridgeTask.col1Prompts.map((p) => `<li>${p}</li>`).join('')}
              </ul>
              <div style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 600; color: #0369a1; border-top: 1px dashed #cbd5e1; padding-top: 3px; margin: 4px 0 2px 0;">
                ✍️ Synthesise their perspective in 2–3 sentences:
              </div>
              <div class="ledger-col-1">
                <div class="task-line-dotted" style="height: 5.6mm;"></div>
                <div class="task-line-dotted" style="height: 5.6mm;"></div>
                <div class="task-line-dotted" style="height: 5.6mm;"></div>
                <div class="task-line-dotted" style="height: 5.6mm;"></div>
              </div>
            </div>
            <div style="border: 1px solid #cbd5e1; border-radius: 4px; padding: 6px 7px; background: #f8fafc;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #b91c1c; display: block; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 3px;">${cfg.bridgeTask.col2Title}</strong>
              <ul style="margin: 0 0 5px 0; padding-left: 15px; font-family: 'Inter', sans-serif; font-size: 8pt; color: #475569; line-height: 1.35;">
                ${cfg.bridgeTask.col2Prompts.map((p) => `<li>${p}</li>`).join('')}
              </ul>
              <div style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 600; color: #b91c1c; border-top: 1px dashed #cbd5e1; padding-top: 3px; margin: 4px 0 2px 0;">
                ✍️ Synthesise their perspective in 2–3 sentences:
              </div>
              <div class="ledger-col-2">
                <div class="task-line-dotted" style="height: 5.6mm;"></div>
                <div class="task-line-dotted" style="height: 5.6mm;"></div>
                <div class="task-line-dotted" style="height: 5.6mm;"></div>
                <div class="task-line-dotted" style="height: 5.6mm;"></div>
              </div>
            </div>
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 8.2pt; color: #64748b; margin-bottom: 3px;">
            ${cfg.bridgeTask.clue}
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 8.5pt; color: #1e3a8a; font-style: italic; border-top: 1px dotted #cbd5e1; padding-top: 2px;">
            ${cfg.bridgeTask.scholarsEdge}
          </div>
      `;
    } else if (cfg.bridgeTask.type === 'blueprint') {
      html += `
          <div style="background: #fafaf9; border: 1px solid #e2e8f0; border-radius: 4px; padding: 6px 8px; margin-bottom: 5px;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #334155; line-height: 1.35;">
              ${cfg.bridgeTask.features.map((f) => `<div>${f}</div>`).join('')}
            </div>
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #1e293b; margin-bottom: 3px;">
            <strong>Tactical Analysis:</strong> ${cfg.bridgeTask.prompt}
          </div>
          <div class="auto-fill-lines" data-line-height="6.8" data-line-type="task-line">
            ${Array(cfg.bridgeTask.lines || 7)
              .fill('<div class="task-line" style="height: 6.8mm;"></div>')
              .join('')}
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 8.2pt; color: #64748b; margin-top: 3px;">
            ${cfg.bridgeTask.clue}
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 8.5pt; color: #1e3a8a; font-style: italic; border-top: 1px dotted #cbd5e1; padding-top: 2px; margin-top: 3px;">
            ${cfg.bridgeTask.scholarsEdge}
          </div>
      `;
    } else if (cfg.bridgeTask.type === 'matrix') {
      html += `
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 5px;">
            ${cfg.bridgeTask.boxes
              .map(
                (b) => `
              <div style="border: 1px solid #cbd5e1; border-radius: 4px; padding: 5px 7px; background: #f8fafc; font-family: 'Inter', sans-serif;">
                <strong style="font-size: 8pt; color: #1e3a8a; display: block; margin-bottom: 2px;">${b.title}</strong>
                <span style="font-size: 7.5pt; color: #334155; line-height: 1.3; display: block;">${b.evidence}</span>
              </div>
            `,
              )
              .join('')}
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #1e293b; margin-bottom: 3px;">
            <strong>Synoptic Synthesis:</strong> ${cfg.bridgeTask.prompt}
          </div>
          <div class="auto-fill-lines" data-line-height="6.8" data-line-type="task-line">
            ${Array(cfg.bridgeTask.lines || 7)
              .fill('<div class="task-line" style="height: 6.8mm;"></div>')
              .join('')}
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 8.2pt; color: #64748b; margin-top: 3px;">
            ${cfg.bridgeTask.clue}
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 8.5pt; color: #1e3a8a; font-style: italic; border-top: 1px dotted #cbd5e1; padding-top: 2px; margin-top: 3px;">
            ${cfg.bridgeTask.scholarsEdge}
          </div>
      `;
    } else if (cfg.bridgeTask.type === 'local_archive') {
      html += `
          <div style="background: #fafaf9; border: 1px solid #e2e8f0; border-radius: 4px; padding: 6px 8px; margin-bottom: 5px;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #334155; line-height: 1.35;">
              ${cfg.bridgeTask.records.map((r) => `<div>${r}</div>`).join('')}
            </div>
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #1e293b; margin-bottom: 3px;">
            <strong>Communal Analysis:</strong> ${cfg.bridgeTask.prompt}
          </div>
          <div class="auto-fill-lines" data-line-height="6.8" data-line-type="task-line">
            ${Array(cfg.bridgeTask.lines || 7)
              .fill('<div class="task-line" style="height: 6.8mm;"></div>')
              .join('')}
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 8.2pt; color: #64748b; margin-top: 3px;">
            ${cfg.bridgeTask.clue}
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 8.5pt; color: #1e3a8a; font-style: italic; border-top: 1px dotted #cbd5e1; padding-top: 2px; margin-top: 3px;">
            ${cfg.bridgeTask.scholarsEdge}
          </div>
      `;
    }

    html += `
        </div>
      </div>

      <!-- Left Page Footer -->
      <div style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #94a3b8; display: flex; justify-content: space-between; border-top: 1px solid #e2e8f0; padding-top: 3px;">
        <span>The History Portal &bull; KS3 The Great War (1914–1919)</span>
        <span>Page ${leftPageNum} (Facing Spread Left)</span>
      </div>
    </div>
    `;

    // ----------------------------------------------------
    // RIGHT PAGE (Recto, Odd Page Number: 5, 7, 9, 11, 13, 15, 17)
    // ----------------------------------------------------
    if (cfg.taskType === 'source_utility') {
      // ====================================================
      // TEMPLATE A: DUAL-SOURCE UTILITY (Edexcel Papers 1 & 3)
      // ====================================================
      html += `
    <div class="page page-container" id="page-${rightPageNum}">
      <div>
        <!-- Enquiry Question Header -->
        <div style="border-bottom: 2px solid #1e3a8a; padding-bottom: 4px; margin-bottom: 6px; display: flex; justify-content: space-between; align-items: flex-end;">
          <div>
            <div style="font-family: 'Inter', sans-serif; font-size: 8pt; text-transform: uppercase; letter-spacing: 1px; color: #1e3a8a; font-weight: 700;">
              Task 4: Historical Skill: ${cfg.skill} &bull; Dual-Source Evidence
            </div>
            <h3 style="font-family: 'Playfair Display', serif; font-size: 11.8pt; color: #0f172a; margin: 2px 0 0 0; line-height: 1.2;">
              ${cfg.enquiryQuestion}
            </h3>
          </div>
          <span class="archival-badge" style="background: #eff6ff; color: #1e3a8a; border-color: #bfdbfe; flex-shrink: 0; font-size: 7pt;">Edexcel Paper 1 &amp; 3 Prep</span>
        </div>

        <!-- Dual Primary Sources Box (Side-by-Side) -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 7px; margin-bottom: 5px;">
          <!-- Source A -->
          <div style="border: 1.2px solid #cbd5e1; border-top: 3px solid #1e3a8a; border-radius: 4px; padding: 5px 7px; background: #ffffff;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #1e3a8a; text-transform: uppercase;">${cfg.sourceA.title}</strong>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 7.8pt; color: #1e293b; font-style: italic; margin: 0 0 3px 0; line-height: 1.25;">
              ${cfg.sourceA.text}
            </p>
            <div style="font-family: 'Inter', sans-serif; font-size: 6.6pt; color: #64748b; border-top: 1px dotted #cbd5e1; padding-top: 2px; margin-bottom: 2px;">
              <strong>Record:</strong> ${cfg.sourceA.shelfmark}
            </div>
            <div style="font-family: 'Inter', sans-serif; font-size: 7.0pt; color: #0369a1; background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 2px; padding: 2px 4px; line-height: 1.2;">
              ${cfg.sourceA.clue}
            </div>
          </div>

          <!-- Source B -->
          <div style="border: 1.2px solid #cbd5e1; border-top: 3px solid #0369a1; border-radius: 4px; padding: 5px 7px; background: #ffffff;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #0369a1; text-transform: uppercase;">${cfg.sourceB.title}</strong>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 7.8pt; color: #1e293b; font-style: italic; margin: 0 0 3px 0; line-height: 1.25;">
              ${cfg.sourceB.text}
            </p>
            <div style="font-family: 'Inter', sans-serif; font-size: 6.6pt; color: #64748b; border-top: 1px dotted #cbd5e1; padding-top: 2px; margin-bottom: 2px;">
              <strong>Record:</strong> ${cfg.sourceB.shelfmark}
            </div>
            <div style="font-family: 'Inter', sans-serif; font-size: 7.0pt; color: #0369a1; background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 2px; padding: 2px 4px; line-height: 1.2;">
              ${cfg.sourceB.clue}
            </div>
          </div>
        </div>

        <!-- Disciplinary Planning Matrix (3 Columns) -->
        <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 4px 6px; background: #f8fafc; margin-bottom: 5px;">
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px; margin-bottom: 3px;">
            ${cfg.matrix
              .map(
                (m) => `
              <div style="border: 1px solid #e2e8f0; border-radius: 3px; padding: 3px 5px; background: #ffffff;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #1e3a8a; display: block; border-bottom: 1px solid #e2e8f0; padding-bottom: 1px; margin-bottom: 1px;">${m.col}</strong>
                <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #334155; line-height: 1.2; display: block;">${m.text}</span>
              </div>
            `,
              )
              .join('')}
          </div>
          <div style="border-top: 1px dashed #cbd5e1; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #475569; line-height: 1.25;">
            <strong>Sentence Starters &amp; Connectives:</strong> ${cfg.connectives}
          </div>
        </div>

        <!-- Ruled Writing Lines (13 Lines at 7.2mm line-height) -->
        <div class="auto-fill-writing-lines" data-line-height="7.2" style="width: 100%; margin-bottom: 4px;">
          ${Array(13).fill('<div class="task-line" style="height: 7.2mm;"></div>').join('')}
        </div>
      </div>

      <!-- Teacher Grading & Assessment Footer (Utility-Specific Rubric) -->
      <div>
        <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 4px 8px; background: #f8fafc; display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #334155;">
          <div>
            <strong>Teacher Assessment:</strong> &nbsp;
            Content &amp; Inference: [ 1 &bull; 2 &bull; 3 &bull; 4 ] &nbsp;|&nbsp; 
            Provenance Evaluation: [ 1 &bull; 2 &bull; 3 &bull; 4 ] &nbsp;|&nbsp; 
            Contextual Balance: [ 1 &bull; 2 &bull; 3 &bull; 4 ]
          </div>
          <div>
            <strong>Utility Grade:</strong> [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ]
          </div>
        </div>

        <!-- Right Page Footer -->
        <div style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #94a3b8; display: flex; justify-content: space-between; border-top: 1px solid #e2e8f0; padding-top: 3px; margin-top: 3px;">
          <span>Source Utility Assessment &bull; The History Portal</span>
          <span>Page ${rightPageNum} (Facing Spread Right)</span>
        </div>
      </div>
    </div>
      `;
    } else if (cfg.taskType === 'historical_interpretations') {
      // ====================================================
      // TEMPLATE B: HISTORICAL INTERPRETATIONS (Edexcel Paper 3)
      // ====================================================
      html += `
    <div class="page page-container" id="page-${rightPageNum}">
      <div>
        <!-- Enquiry Question Header -->
        <div style="border-bottom: 2px solid #1e3a8a; padding-bottom: 4px; margin-bottom: 6px; display: flex; justify-content: space-between; align-items: flex-end;">
          <div>
            <div style="font-family: 'Inter', sans-serif; font-size: 8pt; text-transform: uppercase; letter-spacing: 1px; color: #1e3a8a; font-weight: 700;">
              Task 4: Historical Skill: ${cfg.skill} &bull; Historiographical Debate
            </div>
            <h3 style="font-family: 'Playfair Display', serif; font-size: 11.8pt; color: #0f172a; margin: 2px 0 0 0; line-height: 1.2;">
              ${cfg.enquiryQuestion}
            </h3>
          </div>
          <span class="archival-badge" style="background: #fef2f2; color: #b91c1c; border-color: #fecaca; flex-shrink: 0; font-size: 7pt;">Edexcel Paper 3 Prep</span>
        </div>

        <!-- Dual Interpretations Box (Side-by-Side) -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 7px; margin-bottom: 5px;">
          <!-- Interpretation 1 -->
          <div style="border: 1.2px solid #cbd5e1; border-top: 3px solid #b91c1c; border-radius: 4px; padding: 5px 7px; background: #ffffff;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #b91c1c; text-transform: uppercase;">${cfg.interp1.title}</strong>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 7.8pt; color: #1e293b; font-style: italic; margin: 0 0 3px 0; line-height: 1.25;">
              ${cfg.interp1.text}
            </p>
            <div style="font-family: 'Inter', sans-serif; font-size: 6.6pt; color: #64748b; border-top: 1px dotted #cbd5e1; padding-top: 2px; margin-bottom: 2px;">
              <strong>Scholar:</strong> ${cfg.interp1.author}
            </div>
            <div style="font-family: 'Inter', sans-serif; font-size: 7.0pt; color: #b91c1c; background: #fef2f2; border: 1px solid #fecaca; border-radius: 2px; padding: 2px 4px; line-height: 1.2;">
              ${cfg.interp1.badge}
            </div>
          </div>

          <!-- Interpretation 2 -->
          <div style="border: 1.2px solid #cbd5e1; border-top: 3px solid #1e3a8a; border-radius: 4px; padding: 5px 7px; background: #ffffff;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #1e3a8a; text-transform: uppercase;">${cfg.interp2.title}</strong>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 7.8pt; color: #1e293b; font-style: italic; margin: 0 0 3px 0; line-height: 1.25;">
              ${cfg.interp2.text}
            </p>
            <div style="font-family: 'Inter', sans-serif; font-size: 6.6pt; color: #64748b; border-top: 1px dotted #cbd5e1; padding-top: 2px; margin-bottom: 2px;">
              <strong>Scholar:</strong> ${cfg.interp2.author}
            </div>
            <div style="font-family: 'Inter', sans-serif; font-size: 7.0pt; color: #1e3a8a; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 2px; padding: 2px 4px; line-height: 1.2;">
              ${cfg.interp2.badge}
            </div>
          </div>
        </div>

        <!-- Disciplinary Planning Matrix (3 Columns) -->
        <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 4px 6px; background: #f8fafc; margin-bottom: 5px;">
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px; margin-bottom: 3px;">
            ${cfg.matrix
              .map(
                (m) => `
              <div style="border: 1px solid #e2e8f0; border-radius: 3px; padding: 3px 5px; background: #ffffff;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #1e3a8a; display: block; border-bottom: 1px solid #e2e8f0; padding-bottom: 1px; margin-bottom: 1px;">${m.col}</strong>
                <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #334155; line-height: 1.2; display: block;">${m.text}</span>
              </div>
            `,
              )
              .join('')}
          </div>
          <div style="border-top: 1px dashed #cbd5e1; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #475569; line-height: 1.25;">
            <strong>Sentence Starters &amp; Connectives:</strong> ${cfg.connectives}
          </div>
        </div>

        <!-- Ruled Writing Lines (13 Lines at 7.2mm line-height) -->
        <div class="auto-fill-writing-lines" data-line-height="7.2" style="width: 100%; margin-bottom: 4px;">
          ${Array(13).fill('<div class="task-line" style="height: 7.2mm;"></div>').join('')}
        </div>
      </div>

      <!-- Teacher Grading & Assessment Footer (Interpretations Rubric) -->
      <div>
        <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 4px 8px; background: #f8fafc; display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #334155;">
          <div>
            <strong>Teacher Assessment:</strong> &nbsp;
            Comprehension of Views: [ 1 &bull; 2 &bull; 3 &bull; 4 ] &nbsp;|&nbsp; 
            Deployment of Knowledge: [ 1 &bull; 2 &bull; 3 &bull; 4 ] &nbsp;|&nbsp; 
            Evaluative Judgement: [ 1 &bull; 2 &bull; 3 &bull; 4 ]
          </div>
          <div>
            <strong>Debate Grade:</strong> [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ]
          </div>
        </div>

        <!-- Right Page Footer -->
        <div style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #94a3b8; display: flex; justify-content: space-between; border-top: 1px solid #e2e8f0; padding-top: 3px; margin-top: 3px;">
          <span>Interpretations Assessment &bull; The History Portal</span>
          <span>Page ${rightPageNum} (Facing Spread Right)</span>
        </div>
      </div>
    </div>
      `;
    } else {
      // ====================================================
      // TEMPLATE C: EXTENDED WRITING / NARRATIVE / CAPSTONE
      // ====================================================
      html += `
    <div class="page page-container" id="page-${rightPageNum}">
      <div>
        <!-- Enquiry Question Header -->
        <div style="border-bottom: 2px solid #1e3a8a; padding-bottom: 5px; margin-bottom: 7px; display: flex; justify-content: space-between; align-items: flex-end;">
          <div>
            <div style="font-family: 'Inter', sans-serif; font-size: 8.2pt; text-transform: uppercase; letter-spacing: 1px; color: #1e3a8a; font-weight: 700;">
              Task 4: Historical Skill: ${cfg.skill} &bull; Extended Writing
            </div>
            <h3 style="font-family: 'Playfair Display', serif; font-size: 12.8pt; color: #0f172a; margin: 3px 0 0 0; line-height: 1.25;">
              ${cfg.enquiryQuestion}
            </h3>
          </div>
          <span class="archival-badge" style="background: #eff6ff; color: #1e3a8a; border-color: #bfdbfe; flex-shrink: 0;">Independent Argument</span>
        </div>

        <!-- Bespoke Disciplinary Structure Strip (3-Columns, 8.5pt) -->
        <div style="border: 1.2px solid #cbd5e1; border-radius: 5px; padding: 6px 8px; background: #f8fafc; margin-bottom: 6px;">
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; margin-bottom: 4px;">
            ${cfg.structureStrip
              .map(
                (s) => `
              <div style="border: 1px solid #e2e8f0; border-radius: 3px; padding: 5px 6px; background: #ffffff;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #1e3a8a; display: block; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px; margin-bottom: 2px;">${s.col}</strong>
                <span style="font-family: 'Inter', sans-serif; font-size: 8.3pt; color: #334155; line-height: 1.3; display: block;">${s.text}</span>
              </div>
            `,
              )
              .join('')}
          </div>
          
          <div style="border-top: 1px dashed #cbd5e1; padding-top: 3px; display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 8.2pt;">
            <span style="color: #475569;"><strong>Sentence Starters &amp; Connectives:</strong> ${cfg.connectives}</span>
          </div>
        </div>

        <!-- Writing Framework Strip (PEEL Mastery) -->
        <div style="background: #f8fafc; border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 5px 8px; margin-bottom: 6px; display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 8.2pt; color: #1e293b;">
          <span><strong style="color: #1e3a8a;">[P] Point:</strong> Clear direct answer to enquiry.</span>
          <span><strong style="color: #1e3a8a;">[E] Evidence:</strong> Specific wartime names, dates &amp; statistics.</span>
          <span><strong style="color: #1e3a8a;">[E] Explanation:</strong> Causal mechanism (why &amp; how).</span>
          <span><strong style="color: #1e3a8a;">[L] Link:</strong> Direct evaluative conclusion.</span>
        </div>

        <!-- Ruled Writing Lines (Dynamic Auto-Fill, 7.6mm Line Height) -->
        <div class="auto-fill-writing-lines" data-line-height="7.6" style="width: 100%; margin-bottom: 6px;">
          ${Array(20).fill('<div class="task-line" style="height: 7.6mm;"></div>').join('')}
        </div>
      </div>

      <!-- Teacher Grading & Assessment Footer -->
      <div>
        <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 5px 8px; background: #f8fafc; display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 8.2pt; color: #334155;">
          <div>
            <strong>Teacher Assessment:</strong> &nbsp;
            Effort: [ 1 &bull; 2 &bull; 3 &bull; 4 &bull; 5 ] &nbsp;|&nbsp; 
            Subject Knowledge: [ 1 &bull; 2 &bull; 3 &bull; 4 ] &nbsp;|&nbsp; 
            Disciplinary Analysis: [ 1 &bull; 2 &bull; 3 &bull; 4 ]
          </div>
          <div>
            <strong>PEEL Mastery:</strong> &nbsp;&nbsp; P &nbsp;&nbsp;&nbsp;&nbsp; E &nbsp;&nbsp;&nbsp;&nbsp; E &nbsp;&nbsp;&nbsp;&nbsp; L
          </div>
        </div>

        <!-- Right Page Footer -->
        <div style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #94a3b8; display: flex; justify-content: space-between; border-top: 1px solid #e2e8f0; padding-top: 3px; margin-top: 4px;">
          <span>Extended Writing Assessment &bull; The History Portal</span>
          <span>Page ${rightPageNum} (Facing Spread Right)</span>
        </div>
      </div>
    </div>
      `;
    }
  });

  // ==========================================
  // PAGE 18: VOCABULARY MASTERY VAULT (Verso, Left Page)
  // ==========================================
  html += `
  <div class="page page-container" id="page-18" style="padding: 12px 16px; display: flex; flex-direction: column; height: 260mm; justify-content: space-between;">
    <div>
      <div style="border-bottom: 2px solid #1e3a8a; padding-bottom: 4px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: baseline;">
        <div>
          <h2 style="margin: 0; font-family: 'Playfair Display', serif; font-size: 15pt; color: #0f172a; text-transform: uppercase;">
            Vocabulary Mastery Vault &bull; The Great War
          </h2>
          <div style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #64748b; margin-top: 1px;">
            KS3 Disciplinary &amp; Substantive Concepts &bull; Year 9 History
          </div>
        </div>
        <span class="archival-badge" style="background: #eff6ff; color: #1e3a8a; border-color: #bfdbfe;">Mastery</span>
      </div>

      <p style="font-family: 'Inter', sans-serif; font-size: 8.2pt; color: #475569; margin: 0 0 8px 0;">
        Mastery of these high-yield disciplinary and substantive concepts is essential for achieving Grade 6–9 in KS3 History extended writing:
      </p>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 7px;">
        <div style="border: 1px solid #cbd5e1; border-radius: 4px; padding: 6px 8px; background: #f8fafc;">
          <strong style="color: #1e3a8a; font-size: 8.5pt;">Total War:</strong>
          <p style="font-size: 7.8pt; color: #334155; margin: 2px 0 0 0; line-height: 1.35;">
            A conflict demanding complete mobilization of an entire society's civilian workforce, industry, agriculture, and military resources, eliminating the distinction between combatant and civilian.
          </p>
        </div>
        <div style="border: 1px solid #cbd5e1; border-radius: 4px; padding: 6px 8px; background: #f8fafc;">
          <strong style="color: #1e3a8a; font-size: 8.5pt;">Pals Battalions (1914):</strong>
          <p style="font-size: 7.8pt; color: #334155; margin: 2px 0 0 0; line-height: 1.35;">
            Volunteer military units recruited under Lord Kitchener allowing workmates, football teams, and neighbours to serve together; suffered catastrophic concentrated local losses on the Somme.
          </p>
        </div>
        <div style="border: 1px solid #cbd5e1; border-radius: 4px; padding: 6px 8px; background: #f8fafc;">
          <strong style="color: #1e3a8a; font-size: 8.5pt;">War of Attrition:</strong>
          <p style="font-size: 7.8pt; color: #334155; margin: 2px 0 0 0; line-height: 1.35;">
            A military strategy aiming to wear down the enemy's manpower, reserves, and industrial supplies through sustained slaughter until total physical collapse.
          </p>
        </div>
        <div style="border: 1px solid #cbd5e1; border-radius: 4px; padding: 6px 8px; background: #f8fafc;">
          <strong style="color: #1e3a8a; font-size: 8.5pt;">Defence of the Realm Act (DORA):</strong>
          <p style="font-size: 7.8pt; color: #334155; margin: 2px 0 0 0; line-height: 1.35;">
            Emergency British legislation passed in August 1914 granting the government sweeping autocratic powers to censor the press, requisition property, and control daily civilian habits.
          </p>
        </div>
        <div style="border: 1px solid #cbd5e1; border-radius: 4px; padding: 6px 8px; background: #f8fafc;">
          <strong style="color: #1e3a8a; font-size: 8.5pt;">Conscription &amp; Conscientious Objection:</strong>
          <p style="font-size: 7.8pt; color: #334155; margin: 2px 0 0 0; line-height: 1.35;">
            Compulsory military call-up introduced in 1916; opposed by conscientious objectors on moral or religious grounds, who faced harsh military tribunals and imprisonment.
          </p>
        </div>
        <div style="border: 1px solid #cbd5e1; border-radius: 4px; padding: 6px 8px; background: #f8fafc;">
          <strong style="color: #1e3a8a; font-size: 8.5pt;">Canary Girls (Munitionettes):</strong>
          <p style="font-size: 7.8pt; color: #334155; margin: 2px 0 0 0; line-height: 1.35;">
            Over 1 million women who machined artillery shells in national projectile factories; nicknamed for their yellowing skin caused by toxic TNT jaundice.
          </p>
        </div>
        <div style="border: 1px solid #cbd5e1; border-radius: 4px; padding: 6px 8px; background: #f8fafc;">
          <strong style="color: #1e3a8a; font-size: 8.5pt;">Article 231 (The War Guilt Clause):</strong>
          <p style="font-size: 7.8pt; color: #334155; margin: 2px 0 0 0; line-height: 1.35;">
            The controversial clause in the 1919 Treaty of Versailles forcing Germany to accept sole moral and legal responsibility for causing all Allied damage, justifying £6.6bn reparations.
          </p>
        </div>
        <div style="border: 1px solid #cbd5e1; border-radius: 4px; padding: 6px 8px; background: #f8fafc;">
          <strong style="color: #1e3a8a; font-size: 8.5pt;">Lost Generation &amp; Memorialisation:</strong>
          <p style="font-size: 7.8pt; color: #334155; margin: 2px 0 0 0; line-height: 1.35;">
            The generation of young men decimated by industrialized combat; commemorated through stone monuments, war memorial shelters, and annual remembrance rituals across Britain.
          </p>
        </div>
      </div>
    </div>

    <div style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #94a3b8; display: flex; justify-content: space-between; border-top: 1px solid #e2e8f0; padding-top: 3px;">
      <span>Vocabulary Vault &bull; Disciplinary Literacy</span>
      <span>Page 18 (Facing Spread Left)</span>
    </div>
  </div>
  `;

  // ==========================================
  // PAGE 19: PUPIL VOICE & REFLECTION (Recto, Right Page)
  // ==========================================
  html += `
  <div class="page page-container" id="page-19" style="padding: 12px 16px; display: flex; flex-direction: column; height: 260mm; justify-content: space-between;">
    <div>
      <div style="border-bottom: 2px solid #1e3a8a; padding-bottom: 4px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: baseline;">
        <div>
          <h2 style="margin: 0; font-family: 'Playfair Display', serif; font-size: 15pt; color: #0f172a; text-transform: uppercase;">
            End of Unit Reflection &amp; Pupil Voice
          </h2>
          <div style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #64748b; margin-top: 1px;">
            Unit: The Great War (1914–1919) &bull; Year 9 History
          </div>
        </div>
        <span class="archival-badge" style="background: #eff6ff; color: #1e3a8a; border-color: #bfdbfe;">Pupil Voice</span>
      </div>

      <!-- 1. WWW -->
      <div style="margin-bottom: 9px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #1e3a8a; text-transform: uppercase;">
            1. What Went Well (WWW)
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #64748b;">Key Strengths &amp; Insights</span>
        </div>
        <p style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #475569; margin: 0 0 3px 0;">
          Which Great War enquiry, primary source (e.g. Wilfred Owen, sepoy letters, Stubbington names), or extended writing skill did you find most compelling or master most successfully?
        </p>
        <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; height: 50px; background: #f8fafc;"></div>
      </div>

      <!-- 2. EBI -->
      <div style="margin-bottom: 9px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #1e3a8a; text-transform: uppercase;">
            2. Even Better If (EBI)
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #64748b;">Areas for Growth</span>
        </div>
        <p style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #475569; margin: 0 0 3px 0;">
          Which historical concept (e.g. military attrition, evaluating conflicting historical interpretations of Haig, or the economic impact of Versailles) did you find most challenging?
        </p>
        <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; height: 50px; background: #f8fafc;"></div>
      </div>

      <!-- 3. Teacher Coaching Dialogue -->
      <div style="border: 1.5px solid #fcd34d; border-radius: 5px; padding: 8px 12px; background: #fffbeb;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 3px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 9.2pt; color: #92400e; text-transform: uppercase;">
            Teacher Formative Coaching &amp; Next Steps
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #b45309; font-style: italic;">Completed post-assessment</span>
        </div>
        <p style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #78350f; margin: 0 0 6px 0;">
          Teacher feedback confirming unit mastery, validating reflection, and setting next unit targets:
        </p>
        <div style="height: 180px; border-radius: 4px; background: #ffffff; border: 1.2px solid #fde68a;"></div>
      </div>
    </div>

    <div style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #94a3b8; display: flex; justify-content: space-between; border-top: 1px solid #e2e8f0; padding-top: 3px;">
      <span>Pupil Voice Reflection &bull; Year 9 History</span>
      <span>Page 19 (Facing Spread Right)</span>
    </div>
  </div>
  `;

  // ==========================================
  // PAGE 20: OUTSIDE BACK COVER (Departmental Marking Policy)
  // ==========================================
  html += `
  <div class="page page-container" id="page-20" style="padding: 14px 18px; display: flex; flex-direction: column; height: 260mm; justify-content: space-between; border: 1px solid #cbd5e1; outline: 3.5px double #0f172a; outline-offset: -8px;">
    <div>
      <div style="border-bottom: 2px solid #1e3a8a; padding-bottom: 6px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: baseline;">
        <div>
          <h2 style="margin: 0; font-family: 'Playfair Display', serif; font-size: 16pt; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px;">
            Departmental Marking Policy &amp; Code
          </h2>
          <div style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #64748b; margin-top: 2px;">
            The History Department Standard
          </div>
        </div>
        <span class="archival-badge" style="background: #eff6ff; color: #1e3a8a; border-color: #bfdbfe;">Policy</span>
      </div>

      <!-- Marking Symbols Grid -->
      <div style="margin-bottom: 12px;">
        <strong style="font-family: 'Inter', sans-serif; font-size: 9.2pt; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 4px;">
          Formative Correction Codes:
        </strong>
        <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif; font-size: 8pt; line-height: 1.35;">
          <thead>
            <tr style="background: #1e3a8a; color: #ffffff;">
              <th style="padding: 4px 8px; width: 12%; text-align: center; border: 1px solid #94a3b8;">Code</th>
              <th style="padding: 4px 8px; width: 38%; border: 1px solid #94a3b8;">Meaning &amp; Focus</th>
              <th style="padding: 4px 8px; width: 50%; border: 1px solid #94a3b8;">Pupil Action / Dirt Task</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 4px 8px; font-weight: 700; text-align: center; border: 1px solid #cbd5e1; background: #f8fafc; color: #b91c1c;">Sp</td>
              <td style="padding: 4px 8px; border: 1px solid #cbd5e1;">Spelling error in key historical term.</td>
              <td style="padding: 4px 8px; border: 1px solid #cbd5e1;">Copy the correct spelling 3 times in margin.</td>
            </tr>
            <tr style="background: #f8fafc;">
              <td style="padding: 4px 8px; font-weight: 700; text-align: center; border: 1px solid #cbd5e1; color: #b91c1c;">Gr / P</td>
              <td style="padding: 4px 8px; border: 1px solid #cbd5e1;">Grammar or punctuation slip.</td>
              <td style="padding: 4px 8px; border: 1px solid #cbd5e1;">Rewrite the sentence correctly in green pen.</td>
            </tr>
            <tr>
              <td style="padding: 4px 8px; font-weight: 700; text-align: center; border: 1px solid #cbd5e1; background: #f8fafc; color: #1e3a8a;">//</td>
              <td style="padding: 4px 8px; border: 1px solid #cbd5e1;">New paragraph required here.</td>
              <td style="padding: 4px 8px; border: 1px solid #cbd5e1;">Insert // symbol and start a new line.</td>
            </tr>
            <tr style="background: #f8fafc;">
              <td style="padding: 4px 8px; font-weight: 700; text-align: center; border: 1px solid #cbd5e1; color: #1e3a8a;">[?]</td>
              <td style="padding: 4px 8px; border: 1px solid #cbd5e1;">Meaning unclear / vague phrasing.</td>
              <td style="padding: 4px 8px; border: 1px solid #cbd5e1;">Clarify argument using specific evidence.</td>
            </tr>
            <tr>
              <td style="padding: 4px 8px; font-weight: 700; text-align: center; border: 1px solid #cbd5e1; background: #f8fafc; color: #0369a1;">Ev</td>
              <td style="padding: 4px 8px; border: 1px solid #cbd5e1;">Missing precise factual evidence.</td>
              <td style="padding: 4px 8px; border: 1px solid #cbd5e1;">Add specific dates, names, or statistics.</td>
            </tr>
            <tr style="background: #f8fafc;">
              <td style="padding: 4px 8px; font-weight: 700; text-align: center; border: 1px solid #cbd5e1; color: #0369a1;">Ex</td>
              <td style="padding: 4px 8px; border: 1px solid #cbd5e1;">Explanation needs deeper causal link.</td>
              <td style="padding: 4px 8px; border: 1px solid #cbd5e1;">Use 'This meant that...' or 'Consequently...'.</td>
            </tr>
            <tr>
              <td style="padding: 4px 8px; font-weight: 700; text-align: center; border: 1px solid #cbd5e1; background: #f8fafc; color: #15803d;">J</td>
              <td style="padding: 4px 8px; border: 1px solid #cbd5e1;">Historical judgment needed.</td>
              <td style="padding: 4px 8px; border: 1px solid #cbd5e1;">Weigh both factors to reach a sustained verdict.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- The 4 Golden Rules of Extended Writing -->
      <div style="border: 1.5px solid #1e3a8a; border-radius: 5px; padding: 8px 14px; background: #f8fafc; margin-bottom: 10px;">
        <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #1e3a8a; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 3px;">
          The 4 Golden Rules of Historical Extended Writing:
        </strong>
        <ol style="margin: 0; padding-left: 18px; font-family: 'Inter', sans-serif; font-size: 8pt; color: #334155; line-height: 1.35;">
          <li><strong>Direct Answer:</strong> Open every paragraph with a clear thematic point that directly addresses the enquiry question.</li>
          <li><strong>Specific Evidence:</strong> Ground every argument in precise historical facts, figures, names, and contemporary legislation.</li>
          <li><strong>Causal Connectives:</strong> Never just describe events; explain the mechanism of how and why one event caused or accelerated another.</li>
          <li><strong>Evaluative Judgement:</strong> Weigh competing arguments against explicit historical criteria to reach a nuanced, independent conclusion.</li>
        </ol>
      </div>

      <!-- Digital Revision Hub Quick-Link (Vector QR Code) -->
      <div style="border: 1.5px solid #1e3a8a; border-radius: 6px; padding: 7px 12px; background: #f0f9ff; margin-bottom: 10px; display: flex; align-items: center; gap: 14px;">
        <div style="width: 78px; height: 78px; flex-shrink: 0; background: #ffffff; padding: 3px; border: 1.2px solid #bae6fd; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.06); display: flex; align-items: center; justify-content: center;">
          ${generateQrSvg('https://the-history-revision-hub.netlify.app/?view=interactive&unit=great_war_part2')}
        </div>
        <div style="flex: 1;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 8.6pt; color: #0369a1; text-transform: uppercase; letter-spacing: 0.5px;">
              📱 Digital Revision Hub &bull; Scan with Phone Camera
            </strong>
            <span class="archival-badge" style="background: #e0f2fe; color: #0369a1; border-color: #bae6fd; font-size: 6.8pt; padding: 1px 6px;">Interactive</span>
          </div>
          <p style="font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #1e293b; margin: 0 0 3px 0; line-height: 1.35;">
            Instant home access to the interactive revision flashcards, self-marking knowledge quizzes, and model answers for this unit:
          </p>
          <div style="display: flex; gap: 12px; font-family: 'Inter', sans-serif; font-size: 7.3pt; color: #475569;">
            <span>&bull; <strong>Flashcard Vault:</strong> 30 Great War vocabulary terms</span>
            <span>&bull; <strong>Quiz Bank:</strong> 140 self-marking recall questions</span>
          </div>
          <div style="font-family: monospace; font-size: 6.8pt; color: #0284c7; margin-top: 2px;">
            https://the-history-revision-hub.netlify.app/?view=interactive&amp;unit=great_war_part2
          </div>
        </div>
      </div>

      <!-- Institutional Colophon -->
      <div style="text-align: center; border-top: 1px solid #cbd5e1; padding-top: 6px;">
        <div style="font-family: 'Inter', sans-serif; font-size: 8.2pt; font-weight: 700; color: #1e3a8a; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 1px;">
          The History Portal &bull; Department of History
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #64748b;">
          Stubbington, Fareham, Hampshire &bull; Academic Year 2025–2026
        </div>
      </div>
    </div>

    <div style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #94a3b8; display: flex; justify-content: space-between; border-top: 1px solid #e2e8f0; padding-top: 3px;">
      <span>Departmental Marking Policy &bull; Year 9 History</span>
      <span>Page 20 (Outside Back Cover)</span>
    </div>
  </div>
  `;

  html += `
</body>
</html>
`;

  return html;
}

module.exports = {
  buildGreatWarPart2TwoPageWorkbook,
};
