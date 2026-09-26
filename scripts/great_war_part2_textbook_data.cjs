/**
 * great_war_part2_textbook_data.cjs
 * Canonical Master Textbook Data Module for KS3 Year 9 The Great War Part 2 (1914–1919)
 * Dual-Column Publisher Grid Engine • 4-Act Christine Counsell Structure
 * Audited: 6 Double-Page Enquiry Spreads (Pages 2–13) + Front & Back Covers = Exact 14-Page Budget.
 */

module.exports = function getGreatWarPart2Data(helpers = {}) {
  const getBase64Image = helpers.getBase64Image || ((p) => p);

  // -------------------------------------------------------------
  // FRONT COVER SYLLABUS MATRIX (Page 1)
  // -------------------------------------------------------------
  const SYLLABUS_MATRIX = [
    {
      num: 1,
      title: 'Recruitment & The Rush to the Colours (1914)',
      enquiry: 'Why did men volunteer in 1914?',
      skill: 'Dual-Source Utility',
      assessmentFocus: 'AO3 Source Utility (Purpose & Provenance)',
      bullets: [
        'Kitchener’s call for 500,000 volunteers & mass British enlistment',
        'Pals Battalions: Pompey Pals (14th & 15th Hampshire) & civic duty',
        'Domestic peer pressure: White Feather campaign & atrocity news',
      ],
    },
    {
      num: 2,
      title: 'Trench Warfare, The Somme & The Haig Debate',
      enquiry: 'Did generals make trench horror worse?',
      skill: 'Historical Interpretations Debate',
      assessmentFocus: 'AO4 Interpretations (Clark vs Terraine)',
      bullets: [
        'Trench engineering: firebays, traverses, dugouts & Maxim vectors',
        'The Somme (1 July 1916): 57,470 casualties & defensive firepower',
        'The Haig historiography: "Butcher" vs "Technological Learner"',
      ],
    },
    {
      num: 3,
      title: 'The Global War & Forgotten Empire Troops',
      enquiry: 'Why were colonial troops forgotten?',
      skill: 'Historical Significance & Erasure',
      assessmentFocus: 'AO2 Historical Significance & Subjugated Voices',
      bullets: [
        '1.5m Indian troops: Sepoy Khudadad Khan VC at Ypres in 1914',
        'Chinese Labour Corps logistics & British West Indies Regiment',
        'Imperial racial hierarchies & postwar memorial amnesia',
      ],
    },
    {
      num: 4,
      title: 'The Home Front, DORA & Total War (1914–1918)',
      enquiry: 'How did war control daily British life?',
      skill: 'Change & Continuity',
      assessmentFocus: 'AO2 Change & Continuity (State Intervention)',
      bullets: [
        'Defence of the Realm Act: press censorship, curfews & requisitioning',
        '1916 Military Service Act: conscription & conscientious objectors',
        '1m "Canary Girls" in munitions & the 1918 Representation Act',
      ],
    },
    {
      num: 5,
      title: 'The Peace of Versailles & The German Trauma (1919)',
      enquiry: 'Did Versailles solve or create problems?',
      skill: 'Causation & Analytical Narrative',
      assessmentFocus: 'AO1/AO2 Causation & Geopolitical Consequence',
      bullets: [
        'Big Three clash: Clemenceau (security) vs Lloyd George vs Wilson',
        'Treaty terms: Article 231 War Guilt, £6.6bn reparations & disarmament',
        'Historiography: Keynes’ "Carthaginian Peace" vs modern revisionism',
      ],
    },
    {
      num: 6,
      title: 'The "Lost Generation" & Local Bereavement (Stubbington)',
      enquiry: 'How did the Lost Generation impact Stubbington?',
      skill: 'Local Archival Dual-Source Utility',
      assessmentFocus: 'AO3 Primary Source Utility (Local Micro-History)',
      bullets: [
        'Demographic shock of the "Lost Generation" on rural communities',
        'The Stubbington Memorial Shelter (1922) over the village pump',
        'Nurse Nita King, the Lowry brothers & 67 local fallen on the green',
      ],
    },
  ];

  // -------------------------------------------------------------
  // LEFT-HAND PAGES (Verso: P2, P4, P6, P8, P10, P12)
  // Sources A & B and Core Disciplinary Vocabulary (4 Terms per Page)
  // -------------------------------------------------------------
  const LEFT_SOURCES = {
    p2: {
      sourceA: {
        badge: 'SOURCE A',
        type: 'Official Recruitment Propaganda',
        title: 'Parliamentary Recruiting Committee Poster (1915)',
        image: getBase64Image('/images/bg_great_war_part2.jpg'),
        context:
          'In early 1915, the British government deployed emotionally coercive propaganda posters targeting women to pressure their husbands, sons, and sweethearts into enlisting for frontline combat.',
        hingeQuestion:
          'How does Source A prove that early British recruitment relied as heavily on domestic guilt and peer pressure as on military patriotism?',
        shelfmark: 'Imperial War Museum, London &bull; Art.IWM PST 2763',
        footer: 'Parliamentary Recruiting Committee &bull; Poster Archive',
      },
      sourceB: {
        badge: 'SOURCE B',
        type: 'Personal Wartime Diary Excerpt',
        title: 'Private Arthur Green: Enlisting in the Pompey Pals (August 1914)',
        text: '“When the call came, four of us from the naval fitting shop marched straight down to Portsmouth Town Hall to join the Pompey Pals. We feared being called slackers or handed white feathers, but mostly we wanted to stick together with our mates. It felt like the greatest adventure of our lives, and none of us imagined we would not return.”',
        context:
          'Private Arthur Green, a Portsmouth naval dockyard apprentice, recorded his reasons for volunteering in August 1914 alongside fellow workmates in the 14th (Portsmouth) Battalion, Hampshire Regiment.',
        hingeQuestion:
          'Why did the communal solidarity of Pals Battalions make men eager to volunteer in 1914, but devastate whole towns later in 1916?',
        shelfmark: 'Portsmouth Town Hall &bull; August 1914 Enlistment',
        footer: 'Hampshire Regimental Archive &bull; Pompey Pals Record',
      },
    },
    p4: {
      sourceA: {
        badge: 'SOURCE A',
        type: 'Aerial Reconnaissance Photograph',
        title: 'Aerial Reconnaissance of Western Front Trenches (1916)',
        image: getBase64Image('/images/aerial_trench_ypres.jpg'),
        context:
          'Aerial reconnaissance photographs taken by the Royal Flying Corps over the Western Front revealed the complex three-line defence: front, support, and reserve trenches with interlocking communication alleys separated by shell-cratered No Man’s Land.',
        hingeQuestion:
          'How did the physical layout of trench systems make defensive firepower far superior to offensive infantry charges?',
        shelfmark: 'Royal Flying Corps &bull; Western Front Reconnaissance',
        footer: 'Aerial Photographic Archive &bull; Somme Sector',
      },
      sourceB: {
        badge: 'SOURCE B',
        type: 'Eyewitness Primary Account',
        title: 'Private Arthur Savage on Trench Rats and Artillery Shelling (1915)',
        text: '“Trench rats were as big as cats. They were bold, vicious brutes that ate the dead and ran across your face while you tried to sleep. But the bombardment was the true terror: days on end of deafening concussions that drove men out of their minds until they clawed at the mud screaming like infants.”',
        context:
          'Private Arthur Savage of the 20th Battalion, Durham Light Infantry, recorded the daily sensory horror of trench life, where soldiers lived in constant proximity to vermin and endured persistent artillery barrages.',
        hingeQuestion:
          'What does Arthur Savage’s account reveal about the psychological toll of trench warfare compared to its physical hazards?',
        shelfmark: 'Durham Light Infantry &bull; Personal Wartime Diary',
        footer: 'Primary Eyewitness Record &bull; Western Front',
      },
    },
    p6: {
      sourceA: {
        badge: 'SOURCE A',
        type: 'Official Military Citation & Portrait',
        title: 'Sepoy Khudadad Khan at Hollebeke, First Battle of Ypres (1914)',
        image: getBase64Image('/images/gw_khudadad_khan.jpg'),
        context:
          'On 31 October 1914 at Hollebeke, Belgium, Sepoy Khudadad Khan of the 129th Duke of Connaught’s Own Baluchis became the first Indian soldier awarded the Victoria Cross after manning his Maxim gun post alone while gravely wounded until all his comrades fell.',
        hingeQuestion:
          'How does Khudadad Khan’s stand challenge traditional British narratives that early 1914 battles were fought solely by European soldiers?',
        shelfmark: 'London Gazette &bull; 7 December 1914 Citation',
        footer: 'National Army Museum, London &bull; Indian Army Collection',
      },
      sourceB: {
        badge: 'SOURCE B',
        type: 'Imperial Logistic Archival Record',
        title: 'Chinese Labour Corps & British West Indies Logistics (1917)',
        text: '“Over 140,000 Chinese labourers and 16,000 West Indian volunteers formed the logistical backbone of the Western Front. Working twelve-hour shifts under artillery fire, they unloaded cargo, constructed railways, and handled toxic chemical shells, yet were segregated in guarded compounds and excluded from victory parades.”',
        context:
          'British War Office records document the indispensable role of non-combatant colonial and foreign labourers who maintained Allied military supply lines under strict racial segregation.',
        hingeQuestion:
          'Why were colonial and Chinese support corps marginalized in post-war European commemorations despite being vital to military victory?',
        shelfmark: 'War Cabinet Records &bull; Labour Directorate',
        footer: 'Primary Logistic Record &bull; Imperial Labour Corps',
      },
    },
    p8: {
      sourceA: {
        badge: 'SOURCE A',
        type: 'Official Wartime Decree',
        title: 'Defence of the Realm Act (DORA) Proclamation Notice (August 1914)',
        text: '“His Majesty in Council has issued regulations under the Defence of the Realm Act for securing the public safety. No person shall publish information concerning naval movements, light bonfires, melt gold coinage, or purchase intoxicating liquor except during restricted hours. Persons acting in contravention will be court-martialled.”',
        context:
          'Passed on 8 August 1914 without parliamentary debate, DORA gave the British government sweeping emergency powers over the press, industry, working hours, and everyday civilian behaviour.',
        hingeQuestion:
          'How did DORA permanently alter the relationship between British citizens and the state during the First World War?',
        shelfmark: 'Statute Book of Great Britain &bull; August 1914',
        footer: 'Official Parliamentary Record &bull; London',
      },
      sourceB: {
        badge: 'SOURCE B',
        type: 'Contemporary Photographic Record',
        title: 'Munitionettes: "Canary Girls" Packing TNT Shells (1916)',
        image: getBase64Image('/images/gw_munitionettes.jpg'),
        context:
          'Over one million women entered munitions factories to resolve the catastrophic 1915 Shell Crisis. Handling toxic chemical compounds turned their skin and hair bright yellow, earning them the nickname "Canary Girls".',
        hingeQuestion:
          'To what extent did women’s hazardous wartime labour accelerate the passage of the 1918 Representation of the People Act?',
        shelfmark: 'Ministry of Munitions Photographic Archive &bull; London',
        footer: 'Imperial War Museum, London &bull; Women’s Work Collection',
      },
    },
    p10: {
      sourceA: {
        badge: 'SOURCE A',
        type: 'Official Diplomatic Photographic Record',
        title: 'The Big Three at the Paris Peace Conference (May 1919)',
        image: getBase64Image('/images/gw_big_three_versailles.jpg'),
        context:
          'French Premier Georges Clemenceau, British Prime Minister David Lloyd George, and US President Woodrow Wilson met in Paris to negotiate the post-war settlement, divided between Clemenceau’s desire to cripple Germany and Wilson’s idealism.',
        hingeQuestion:
          'How did the competing national motives of Clemenceau, Lloyd George, and Wilson produce a fragile and contradictory compromise treaty?',
        shelfmark: 'French Foreign Ministry Photographic Archive &bull; Quai d’Orsay',
        footer: 'Bibliothèque nationale de France &bull; Paris Peace Series',
      },
      sourceB: {
        badge: 'SOURCE B',
        type: 'Contemporary Satirical Cartoon',
        title: 'Political Cartoon: "Peace and Future Cannon Fodder" (13 May 1919)',
        image: getBase64Image('/images/gw_weeping_child.jpg'),
        context:
          'Drawn by Australian war artist Will Dyson for the London Daily Herald as the Big Three concluded treaty negotiations, showing Clemenceau, Lloyd George, and Wilson exiting while a naked child labelled "1940 Class" weeps behind a pillar.',
        hingeQuestion:
          'Why did Will Dyson prophetically predict that children born in 1919 would become "cannon fodder" in another European war around 1940?',
        shelfmark: 'Daily Herald Archive &bull; 13 May 1919 Edition',
        footer: 'British Cartoon Archive &bull; University of Kent',
      },
    },
    p12: {
      sourceA: {
        badge: 'SOURCE A',
        type: 'Contemporary Archival Plate',
        title: 'The Stubbington Memorial Shelter on the Village Green (1922)',
        image: getBase64Image('/images/stubbington_memorial_1.jpg'),
        context:
          'Unlike traditional stone obelisks, the Stubbington war memorial was erected as a wooden shelter over the historic village water pump, providing a practical sanctuary for villagers while mourning local casualties.',
        hingeQuestion:
          'How does the unique community shelter architecture of the Stubbington memorial reflect a shift toward intimate, everyday bereavement?',
        shelfmark: 'Hampshire Record Office, Winchester &bull; Stubbington Parish Records',
        footer: 'Fareham Borough Archives &bull; Memorial Survey',
      },
      sourceB: {
        badge: 'SOURCE B',
        type: 'Material Artifact & Primary Roll of Honour',
        title: 'The Inscribed Beams: 67 Local Fallen of Stubbington & Hill Head',
        image:
          getBase64Image('/images/stubbington_names_1.jpg') ||
          getBase64Image('/images/stubbington_memorial.jpg'),
        context:
          'Carved into the oak beams of the 1922 shelter by village carpenter Arthur Tribbeck are sixty-seven local casualties, including his own son Harold, the three Lowry brothers, and VAD nurse Nita Madeline King.',
        hingeQuestion:
          'What does the presence of multiple sons from single families reveal about the demographic trauma of the "Lost Generation" on small English villages?',
        shelfmark: 'Stubbington Memorial Inscription &bull; The Green, Stubbington',
        footer: 'Community War Memorial Inventory &bull; Hampshire',
      },
    },
  };

  const LEFT_VOCAB = {
    p2: [
      {
        term: 'Pals Battalion',
        def: 'A British army unit recruited from friends, workmates, or townsmen who volunteered and served together.',
      },
      {
        term: 'Lord Kitchener',
        def: 'British Secretary of State for War who predicted a multi-year conflict and led mass recruitment in 1914.',
      },
      {
        term: 'White Feather',
        def: 'A traditional symbol of cowardice handed by civilians to men of military age not wearing army uniform.',
      },
      {
        term: 'Voluntary Enlistment',
        def: 'Joining the military by personal choice before compulsory national conscription was enacted in 1916.',
      },
    ],
    p4: [
      {
        term: 'War of Attrition',
        def: 'A military strategy aiming to wear down the enemy’s soldiers and economic reserves through relentless slaughter.',
      },
      {
        term: 'Maxim Machine Gun',
        def: 'A rapid-firing, belt-fed weapon capable of discharging 500 rounds per minute, dominating frontline defence.',
      },
      {
        term: 'Creeping Barrage',
        def: 'An artillery tactic where shells fall in a continuous line just ahead of advancing infantry to suppress defenders.',
      },
      {
        term: 'No Man’s Land',
        def: 'The dangerous, unoccupied territory between opposing trench lines, covered in shell craters and barbed wire.',
      },
    ],
    p6: [
      {
        term: 'Sepoy',
        def: 'An Indian infantry soldier serving within the British Indian Army on the Western Front and in Mesopotamia.',
      },
      {
        term: 'Victoria Cross',
        def: 'The highest British military decoration awarded for extreme gallantry in the presence of the enemy.',
      },
      {
        term: 'Chinese Labour Corps',
        def: 'Over 140,000 non-combatant Chinese workers hired by Britain and France to sustain essential military logistics.',
      },
      {
        term: 'Imperial Mobilisation',
        def: 'The systematic recruitment of soldiers, raw materials, and labourers from across the British Empire.',
      },
    ],
    p8: [
      {
        term: 'DORA',
        def: 'Defence of the Realm Act (1914); legislation giving the British government sweeping emergency control powers.',
      },
      {
        term: 'Total War',
        def: 'A conflict where a nation directs all economic, industrial, and civilian resources toward military victory.',
      },
      {
        term: 'Canary Girls',
        def: 'Female munitions workers whose skin and hair turned yellow from exposure to toxic TNT shell explosives.',
      },
      {
        term: 'Conscientious Objector',
        def: 'An individual who refused military service on moral, religious, or political grounds under the 1916 Act.',
      },
    ],
    p10: [
      {
        term: 'Article 231',
        def: 'The "War Guilt" clause of the Treaty of Versailles requiring Germany to accept sole moral responsibility for the war.',
      },
      {
        term: 'Reparations',
        def: 'Financial payments (£6.6 billion) demanded from defeated Germany to compensate Allied civilian war damage.',
      },
      {
        term: 'Demilitarisation',
        def: 'The complete removal of military forces and fortifications from a territory, notably the German Rhineland.',
      },
      {
        term: 'Diktat',
        def: 'The German term for an imposed, non-negotiable peace settlement forced upon a defeated nation without debate.',
      },
    ],
    p12: [
      {
        term: 'Lost Generation',
        def: 'The cohort of young men killed or physically and psychologically traumatised by the slaughter of 1914–1918.',
      },
      {
        term: 'VAD Nurse',
        def: 'Voluntary Aid Detachment nurses; civilian female volunteers who provided frontline and home medical care.',
      },
      {
        term: 'War Memorial',
        def: 'A civic monument, plaque, or building erected to commemorate the local military and civilian dead of war.',
      },
      {
        term: 'Micro-History',
        def: 'Historical investigation focused on an individual village or family to illuminate broad national patterns.',
      },
    ],
  };

  // -------------------------------------------------------------
  // RIGHT-HAND PAGES (Recto: P3, P5, P7, P9, P11, P13)
  // Key Figures, Concept Spotlights, Source C Archival Dispatches & Tasks
  // -------------------------------------------------------------
  const COMPONENT_BANK = {
    p3: {
      keyFigure: {
        name: 'Field Marshal Lord Kitchener',
        lifespan: '1850–1916',
        role: 'Secretary of State for War (1914–1916)',
        significance:
          'Recognised that the war would last years, personally launching the New Armies campaign that mobilised 2.5 million British volunteers.',
        actions: [
          'Dismissed prevailing military optimism that the war would be over by Christmas 1914, demanding a three-year army of 30 divisions.',
          'Featured on Alfred Leete’s iconic recruiting poster with pointed finger declaring: "Your Country Needs YOU".',
          'Sanctioned the formation of civic Pals Battalions, allowing friends and work colleagues to enlist and train together.',
        ],
        image: getBase64Image('/images/gw_kitchener_portrait.jpg'),
      },
      conceptSpotlight: `
        <div class="concept-spotlight-box">
          <div class="csb-header">
            <span class="csb-tag">HISTORICAL DEEP DIVE: CIVIC SOLIDARITY</span>
            <span class="csb-category">PALS BATTALIONS &bull; 1914</span>
          </div>
          <h4 class="csb-title">Civic Camaraderie &amp; Demographic Vulnerability</h4>
          <div class="csb-body">
            The Pals Battalion phenomenon harnessed pre-war social institutions—cricket clubs, tramway companies, banks, and churches—to encourage competitive mass volunteering. In Portsmouth, dockyard apprentices and clerks formed the 14th and 15th Hampshire Battalions. While this boosted recruitment, it created catastrophic community vulnerability: when a battalion suffered heavy casualties, the bereavement fell upon a single town in a single morning.
          </div>
          <div class="csb-takeaway">
            <strong>Key Causation:</strong> Pals Battalions solved Britain’s initial manpower shortage but created concentrated local demographic shocks that forever changed British society after July 1916.
          </div>
        </div>
      `,
      archivalDispatch: `
        <div class="archival-source-box">
          <div class="archival-header">
            <div class="source-identity">
              <span class="source-badge">SOURCE C</span>
              <span class="source-type">Parliamentary Address &bull; 1914</span>
            </div>
            <span class="source-date-micro">25 August 1914</span>
          </div>
          <div class="archival-title">Lord Kitchener: Appeal to the House of Lords</div>
          <div class="archival-body">
            "The terms of service are for the war, or if the war lasts longer than three years, for three years... While other nations have large reserves through conscription, our small army has no such reserves. I feel sure that when the necessity of the case is understood, our young men will willingly rally to the colours in sufficient numbers to sustain the Empire."
          </div>
          <div class="archival-context-box">
            <p class="archival-context-text">Delivered to the House of Lords by Secretary of State for War Lord Kitchener during his first major parliamentary address.</p>
            <div class="archival-hinge-q"><strong>Hinge Question:</strong> <em>How does Kitchener’s speech prove that British military leaders understood early on that volunteer forces would face unprecedented attrition?</em></div>
          </div>
          <div class="archival-footer">
            <span>Hansard Parliamentary Debates &bull; House of Lords</span>
            <span>Parliamentary Archives, Westminster</span>
          </div>
        </div>
      `,
      task3Instruction:
        'Compare the reasons British men volunteered in 1914: patriotic duty, domestic emotional coercion (Source A), or local peer solidarity (Sources B & C). Record two key pieces of factual evidence for each in your workbook.',
      task4Question:
        'Explain why so many young British men volunteered to join the army in 1914. (12 marks)',
      wbPages: '4–5',
    },

    p5: {
      keyFigure: {
        name: 'Field Marshal Sir Douglas Haig',
        lifespan: '1861–1928',
        role: 'Commander-in-Chief of the British Expeditionary Force (1915–1918)',
        significance:
          'Orchestrated the Somme, Passchendaele, and the victorious 1918 Hundred Days Offensive; historically polarising between "Butcher" and "Technological Learner".',
        actions: [
          'Commanded British forces during the catastrophic 1 July 1916 offensive on the Somme, suffering 57,470 casualties on day one.',
          'Maintained that continuous attritional pressure was the only viable method to break the deeply fortified German military front.',
          'Pioneered the innovative integration of tanks, creeping artillery barrages, and aircraft reconnaissance during the 1918 Hundred Days.',
        ],
        image: getBase64Image('/images/gw_douglas_haig.jpg'),
      },
      conceptSpotlight: `
        <div class="concept-spotlight-box">
          <div class="csb-header">
            <span class="csb-tag">HISTORIOGRAPHICAL CONTROVERSY: MILITARY COMMAND</span>
            <span class="csb-category">THE HAIG DEBATE &bull; 1916</span>
          </div>
          <h4 class="csb-title">The "Lions Led by Donkeys" Historiographical Debate</h4>
          <div class="csb-body">
            Post-war traditionalist critics (Alan Clark, <em>The Donkeys</em>, 1961) condemned Haig as an inflexible cavalryman who squandered brave infantry against machine guns. Conversely, revisionist historians (John Terraine, Gary Sheffield) argue Haig was trapped by contemporary technology: before wireless radios and reliable tanks matured in 1918, no general on either side could coordinate breakthroughs across fortified trench lines.
          </div>
          <div class="csb-takeaway">
            <strong>Key Causation:</strong> Disciplinary evaluation of Haig requires contrasting the tactical failure of the Somme in 1916 with his strategic triumph in the combined-arms 1918 Hundred Days.
          </div>
        </div>
      `,
      archivalDispatch: `
        <div class="archival-source-box">
          <div class="archival-header">
            <div class="source-identity">
              <span class="source-badge">SOURCE C</span>
              <span class="source-type">Official Commander Dispatch &bull; 1916</span>
            </div>
            <span class="source-date-micro">23 December 1916</span>
          </div>
          <div class="archival-title">General Sir Douglas Haig: Final Somme Dispatch</div>
          <div class="archival-body">
            "The results of the battle are not to be measured only by territory gained... The three main objects of the Allied offensive were: to relieve the pressure on Verdun, to prevent the transfer of German troops to the Russian front, and to wear down the strength of the enemy forces. Each of these three objects has been substantially achieved."
          </div>
          <div class="archival-context-box">
            <p class="archival-context-text">Official public dispatch written by General Haig justifying the 420,000 British casualties of the Somme campaign to the War Committee.</p>
            <div class="archival-hinge-q"><strong>Hinge Question:</strong> <em>How does Haig’s dispatch demonstrate the shift from measuring military success by capturing territory to measuring success by industrial attrition?</em></div>
          </div>
          <div class="archival-footer">
            <span>The London Gazette Supplement &bull; 29 December 1916</span>
            <span>National Archives, Kew &bull; WO 32/5152</span>
          </div>
        </div>
      `,
      task3Instruction:
        'Contrast the traditional interpretation of Haig as an inflexible "Butcher" with the revisionist view of Haig as a "Technological Learner" constrained by 1916 communication limits. Note evidence for both views in your workbook.',
      task4Question:
        '“General Haig was primarily to blame for the catastrophic casualties of the Battle of the Somme.” How far do you agree? (16 marks)',
      wbPages: '6–7',
    },

    p7: {
      keyFigure: {
        name: 'Sepoy Khudadad Khan VC',
        lifespan: '1888–1971',
        role: 'Machine Gunner, 129th Duke of Connaught’s Own Baluchis',
        significance:
          'First South Asian recipient of the Victoria Cross; his heroism at Hollebeke symbolised the decisive contribution of 1.5 million Indian soldiers on the Western Front.',
        actions: [
          'Deployed to the freezing trenches of Flanders in October 1914 as part of the Lahore Division to reinforce the depleted British Expeditionary Force.',
          'Manned his Maxim gun alone at Hollebeke after his team was overrun by Bavarian infantry, holding the line until gravely wounded.',
          'Feigned death among fallen comrades before crawling through mud back to Allied lines, personally decorated with the VC by King George V.',
        ],
        image: getBase64Image('/images/gw_khudadad_khan.jpg'),
      },
      conceptSpotlight: `
        <div class="concept-spotlight-box">
          <div class="csb-header">
            <span class="csb-tag">HISTORICAL RECOVERY: DISCIPLINARY VISIBILITY</span>
            <span class="csb-category">IMPERIAL CONTRIBUTION &bull; 1914–1918</span>
          </div>
          <h4 class="csb-title">Postwar Imperial Erasure &amp; Disciplinary Recovery</h4>
          <div class="csb-body">
            Over four million colonial soldiers and non-combatant labourers from India, Africa, the West Indies, and China sustained the Allied war effort. Over 74,000 Indian troops died overseas, holding the line in Flanders and Mesopotamia. Yet in post-war commemorations, their vital contributions were largely excised from public monuments, school textbooks, and national ceremonies. Black soldiers of the British West Indies Regiment, despite facing heavy artillery bombardments, were denied equal pay, barred from combat promotion, and excluded from the 1919 victory parades, reflecting deep imperial hierarchies that modern historians now actively dismantle.
          </div>
          <div class="csb-takeaway">
            <strong>Key Causation:</strong> Without the prompt arrival of the Indian Corps in autumn 1914, Allied frontline defences in Flanders would have collapsed before Britain’s volunteer armies were even trained.
          </div>
        </div>
      `,
      archivalDispatch: `
        <div class="archival-source-box">
          <div class="archival-header">
            <div class="source-identity">
              <span class="source-badge">SOURCE C</span>
              <span class="source-type">Field Commander Dispatch &bull; 1914</span>
            </div>
            <span class="source-date-micro">20 November 1914</span>
          </div>
          <div class="archival-title">Field Marshal Sir John French: Tribute to the Indian Corps</div>
          <div class="archival-body">
            "The arrival of the Indian contingents under General Willcocks took place at a most critical moment. Their fighting qualities, high discipline, and courage have been proved in the hardest encounters. They arrived in cold rain and deep mud, enduring trench life under conditions wholly unfamiliar, yet displaying magnificent gallantry."
          </div>
          <div class="archival-context-box">
            <p class="archival-context-text">Official military dispatch from British Commander-in-Chief Sir John French acknowledging the Indian Army’s role in saving Ypres.</p>
            <div class="archival-hinge-q"><strong>Hinge Question:</strong> <em>Why did official British praise for Indian troops during wartime contrast so sharply with post-war reluctance to grant India self-governance?</em></div>
          </div>
          <div class="archival-footer">
            <span>War Office Dispatches &bull; Western Front Series</span>
            <span>Imperial War Museum, London &bull; French Archive</span>
          </div>
        </div>
      `,
      task3Instruction:
        'Evaluate the historical significance of imperial troops: immediate military survival in 1914 vs long-term post-war erasure. Note two specific pieces of evidence for each in your workbook.',
      task4Question:
        'Explain the historical significance of the British Empire’s colonial forces in the First World War. (12 marks)',
      wbPages: '8–9',
    },

    p9: {
      keyFigure: {
        name: 'David Lloyd George',
        lifespan: '1863–1945',
        role: 'Minister of Munitions (1915–1916) & Prime Minister (1916–1922)',
        significance:
          'Restructured British industry for total war, resolved the catastrophic 1915 Shell Crisis, and mobilised over one million women into projectile factories.',
        actions: [
          'Created the Ministry of Munitions in May 1915, nationalising factories and breaking trade union restrictions to mass-produce high-explosive artillery shells.',
          'Introduced universal military conscription through the 1916 Military Service Act to replace volunteer recruitment after Somme casualties.',
          'Ousted Asquith in December 1916 to establish a streamlined five-man War Cabinet exercising direct executive control over the wartime economy.',
        ],
        image: getBase64Image('/images/gw_lloyd_george.jpg'),
      },
      conceptSpotlight: `
        <div class="concept-spotlight-box">
          <div class="csb-header">
            <span class="csb-tag">HISTORICAL DEEP DIVE: STATE AUTOCRACY</span>
            <span class="csb-category">THE HOME FRONT &bull; 1914–1918</span>
          </div>
          <h4 class="csb-title">The Rise of the Modern Leviathan: Total State Control</h4>
          <div class="csb-body">
            Before 1914, Great Britain operated on classical *laissez-faire* principles: minimal government interference in private industry, commercial trade, and daily civilian life. By 1918, DORA regulations micro-managed food rationing, industrial production, railway transit, press reports, lighting curfews, and working hours. The Ministry of Munitions nationalised over 250 factories and directly commanded four million workers, fundamentally destroying Victorian concepts of individual liberty and establishing the modern centralised state.
          </div>
          <div class="csb-takeaway">
            <strong>Key Causation:</strong> Total war required total state mobilisation; the unprecedented expansion of government authority between 1914 and 1918 laid the foundation for modern 20th-century state governance.
          </div>
        </div>
      `,
      archivalDispatch: `
        <div class="archival-source-box">
          <div class="archival-header">
            <div class="source-identity">
              <span class="source-badge">SOURCE C</span>
              <span class="source-type">Tribunal Court Minutes &bull; 1916</span>
            </div>
            <span class="source-date-micro">14 April 1916</span>
          </div>
          <div class="archival-title">Tribunal Examination of a Conscientious Objector</div>
          <div class="archival-body">
            "Tribunal Chairman: 'Do you believe it is right to stand by while women and children are slaughtered by German invaders?' Applicant: 'My religious conscience forbids me to take human life under any circumstance; I will not kill my fellow man.' Chairman: 'Your objection is disallowed. You are assigned to the Non-Combatant Corps; report to barracks immediately.'"
          </div>
          <div class="archival-context-box">
            <p class="archival-context-text">Verbatim transcript from a local Military Service Tribunal adjudicating an application for exemption from military conscription.</p>
            <div class="archival-hinge-q"><strong>Hinge Question:</strong> <em>How does the hostile tone of the tribunal chairman reveal the intense friction between individual moral conscience and state survival during total war?</em></div>
          </div>
          <div class="archival-footer">
            <span>Local Military Tribunal Minute Books &bull; Hampshire</span>
            <span>National Archives, Kew &bull; MH 47 Series</span>
          </div>
        </div>
      `,
      task3Instruction:
        'Analyse changes and continuities on the British Home Front: state intervention (DORA & conscription) vs persistent civilian resilience. Note specific evidence for each in your workbook.',
      task4Question:
        'Explain how the First World War transformed daily life on the British Home Front between 1914 and 1918. (12 marks)',
      wbPages: '10–11',
    },

    p11: {
      keyFigure: {
        name: 'Georges Clemenceau ("The Tiger")',
        lifespan: '1841–1929',
        role: 'Prime Minister of France (1906–1909 & 1917–1920)',
        significance:
          'Steered France through the brutal final years of combat and fiercely demanded the territorial dismemberment, disarmament, and financial punishment of Germany at Versailles.',
        actions: [
          'Witnessed the devastating destruction of northeastern France, where 1.4 million French soldiers died and thousands of square miles were ruined.',
          'Resisted Woodrow Wilson’s idealistic Fourteen Points, declaring: "Mr. Wilson bores me with his Fourteen Points; why, Almighty God has only ten!"',
          'Insisted on regaining Alsace-Lorraine, demilitarising the Rhineland, and inserting the punitive Article 231 War Guilt clause.',
        ],
        image: getBase64Image('/images/gw_clemenceau.jpg'),
      },
      conceptSpotlight: `
        <div class="concept-spotlight-box">
          <div class="csb-header">
            <span class="csb-tag">HISTORICAL ANALYSIS: REVISIONIST DIPLOMACY</span>
            <span class="csb-category">THE PEACE SETTLEMENT &bull; 1919</span>
          </div>
          <h4 class="csb-title">The "Stab-in-the-Back" Myth (*Dolchstoßlegende*)</h4>
          <div class="csb-body">
            Because German armies were still fighting on French and Belgian soil when the 1918 Armistice was signed, military commanders (Paul von Hindenburg and Erich Ludendorff) propagated the toxic falsehood that the army was never defeated militarily, but "stabbed in the back" by democratic politicians, socialists, and Jews at home. When Hindenburg testified before the Weimar National Assembly in November 1919, this myth provided reactionary nationalists with a ready-made scapegoat, branding the signatories as the "November Criminals" and fatally delegitimising the democratic republic.
          </div>
          <div class="csb-takeaway">
            <strong>Key Causation:</strong> Article 231 was intended by the Allies as a legal basis for reparations, but became the primary psychological weapon used by right-wing nationalists to undermine European democracy.
          </div>
        </div>
      `,
      archivalDispatch: `
        <div class="archival-source-box">
          <div class="archival-header">
            <div class="source-identity">
              <span class="source-badge">SOURCE C</span>
              <span class="source-type">Plenary Diplomatic Address &bull; 1919</span>
            </div>
            <span class="source-date-micro">7 May 1919</span>
          </div>
          <div class="archival-title">Count Brockdorff-Rantzau: Response to the Treaty Terms</div>
          <div class="archival-body">
            "We know the intensity of the hatred which meets us here... We are asked to confess ourselves the only ones guilty of the war; such a confession in my mouth would be a lie. We do not seek to exonerate Germany from all responsibility, but we emphatically deny that Germany alone is guilty of having caused the catastrophe."
          </div>
          <div class="archival-context-box">
            <p class="archival-context-text">Speech delivered by German Foreign Minister Count Ulrich von Brockdorff-Rantzau at Versailles upon receiving the draft treaty terms.</p>
            <div class="archival-hinge-q"><strong>Hinge Question:</strong> <em>Why did Brockdorff-Rantzau’s defiant speech harden Allied resolve to impose punitive economic and military terms on Germany?</em></div>
          </div>
          <div class="archival-footer">
            <span>Foreign Office Dispatches &bull; Paris Peace Series</span>
            <span>German Chancellery Archive &bull; Berlin</span>
          </div>
        </div>
      `,
      task3Instruction:
        'Contrast the view that Versailles was an unfairly harsh "Carthaginian Peace" with the revisionist view that it was a fragile compromise settlement. Note two pieces of evidence for each in your workbook.',
      task4Question:
        '“The Treaty of Versailles made a second European war inevitable.” How far do you agree with this statement? (16 marks)',
      wbPages: '12–13',
    },

    p13: {
      keyFigure: {
        name: 'Major Auriol "Eric" Lowry DSO, MC',
        lifespan: '1893–1918',
        role: 'Battalion Commander, 2nd Bn West Yorkshire Regiment',
        significance:
          'Commanding officer from Manor Way Grange, Stubbington; his death weeks before the Armistice completed the extinction of all three Lowry brothers.',
        actions: [
          'Awarded the Distinguished Service Order (DSO) and Military Cross (MC) for conspicuous gallantry under heavy artillery fire on the Western Front.',
          'Commanded the battalion in which his younger brother Patrick served, witnessing Patrick killed in action during the 1918 German Spring Offensive.',
          'Killed by a machine-gun bullet near Epéhy on 23 September 1918 (aged 25); in their grief, his parents built the Lowry Memorial Hall in Lee-on-the-Solent.',
        ],
        image: getBase64Image('/images/lowry_auriol.png'),
      },
      conceptSpotlight: `
        <div class="concept-spotlight-box">
          <div class="csb-header">
            <span class="csb-tag">LOCAL ARCHIVE: MICRO-HISTORY</span>
            <span class="csb-category">COMMUNITY MOURNING &bull; 1914–1922</span>
          </div>
          <h4 class="csb-title">Micro-History &amp; The Everyday Geography of Grief</h4>
          <div class="csb-body">
            National casualty statistics (over 700,000 British dead) can desensitize pupils to the human reality of the Great War. Micro-history shifts focus to a single village green, revealing how the loss of 67 local young men devastated small farming communities, shops, and trades in Stubbington. Placing the memorial shelter over the daily village pump ensured that every time villagers collected water, they encountered the names of their missing sons.
          </div>
          <div class="csb-takeaway">
            <strong>Key Causation:</strong> Local war memorials were not triumphalist monuments celebrating victory, but physical anchors of communal therapeutic mourning in a society denied repatriated graves.
          </div>
        </div>
      `,
      archivalDispatch: `
        <div class="archival-source-box">
          <div class="archival-header">
            <div class="source-identity">
              <span class="source-badge">SOURCE C</span>
              <span class="source-type">Memorial Dedication Sermon &bull; 1922</span>
            </div>
            <span class="source-date-micro">4 June 1922</span>
          </div>
          <div class="archival-title">Vicar of Crofton: Dedication of the Stubbington Shelter</div>
          <div class="archival-body">
            "This shelter is not built of cold marble to glorify war, but of warm English oak to shelter the weary and remind our children of those who gave their tomorrow for our today. As you draw water from this pump, remember that sixty-seven of our neighbours laid down their lives that this village might remain in peace."
          </div>
          <div class="archival-context-box">
            <p class="archival-context-text">Sermon preached by the Vicar of Holy Rood Church at the formal civic unveiling of the Stubbington War Memorial Shelter.</p>
            <div class="archival-hinge-q"><strong>Hinge Question:</strong> <em>How does the decision to build a functional shelter over a water pump demonstrate how deeply the trauma of the Great War was woven into daily rural life?</em></div>
          </div>
          <div class="archival-footer">
            <span>Portsmouth Evening News &bull; 5 June 1922 Edition</span>
            <span>Hampshire Record Office &bull; Press Archives</span>
          </div>
        </div>
      `,
      task3Instruction:
        'Analyse Sources A, B, and C to evaluate how the Stubbington War Memorial Shelter reflects local bereavement and community remembrance. Note provenance details and factual evidence in your workbook.',
      task4Question:
        'How useful are Sources A, B, and C for an enquiry into the impact of the "Lost Generation" on local English communities? (12 marks)',
      wbPages: '14–15',
    },
  };

  // -------------------------------------------------------------
  // CORE NARRATIVE PROSE (Acts 1–4 per Lesson, 2–3 Calibrated Paras Each)
  // -------------------------------------------------------------
  const LESSON_SECTIONS = [
    // Lesson 1: Recruitment & The Rush to the Colours (1914)
    [
      {
        title: 'Act 1: The Rush to the Colours & Kitchener’s Appeal',
        text: [
          '<span class="para-ref">[1.1]</span> When Great Britain declared war on Germany at midnight on 4 August 1914 following the invasion of neutral Belgium (violating the 1839 Treaty of London), the nation possessed a small professional army of barely 247,000 regular soldiers. Unlike continental rivals who relied on peacetime conscription, Britain possessed no legal mechanism to compel civilian men into military service, relying entirely on voluntary enlistment.',
          '<span class="para-ref">[1.2]</span> Appointed Secretary of State for War, Field Marshal Lord Kitchener predicted a multi-year war of attrition requiring millions of soldiers. In late August 1914, Kitchener launched an unprecedented appeal for 500,000 volunteers, creating the New Armies ("Kitchener’s Mob"). Over 750,000 men enlisted in the first eight weeks alone, completely swamping recruitment depots, drill halls, and medical inspection boards across Great Britain.',
          '<span class="para-ref">[1.3]</span> Men rushed to enlist driven by genuine moral indignation over reported German atrocities in Belgium ("The Rape of Belgium"), deep Edwardian patriotism, and economic necessity. For thousands of working-class men enduring low wages and unstable casual employment, the army offered guaranteed daily meals, solid woollen uniforms, regular pay of one shilling a day, and the thrilling prospect of overseas adventure before the conflict concluded.',
        ],
      },
      {
        title: 'Act 2: Pals Battalions & The Portsmouth Town Hall Enlistment',
        text: [
          '<span class="para-ref">[2.1]</span> To accelerate voluntary recruitment and prevent recruits from feeling isolated, Lord Derby conceived the innovative scheme of "Pals Battalions". The War Office pledged that friends, workmates, and neighbours who enlisted together would train, live, and fight side by side in the field, converting existing civic, industrial, and sporting solidarity into cohesive military units.',
          '<span class="para-ref">[2.2]</span> Across Britain, clerks, miners, tram drivers, and church congregations formed distinct fighting units. In Portsmouth, civic leaders and naval dockyard managers raised the 14th and 15th (Portsmouth) Battalions of the Hampshire Regiment, known colloquially as the "Pompey Pals". Men queued outside the Town Hall to enlist alongside their fellow shipyard apprentices, boilermaker colleagues, and childhood neighbours, eager to represent their hometown.',
          '<span class="para-ref">[2.3]</span> The intense communal pride of the Pals Battalions initially generated extraordinary morale, camaraderie, and mutual trust during basic training. However, military planners failed to foresee a devastating demographic consequence: when a tightly-knit local unit encountered concentrated machine-gun or artillery fire in combat, the young male population of an entire town, parish, or workplace would be wiped out in a single morning.',
        ],
      },
      {
        title: 'Act 3: Propaganda, Peer Pressure & The White Feather Campaign',
        text: [
          '<span class="para-ref">[3.1]</span> As the initial romantic rush of August volunteers began to slacken during 1915, the British government intensified psychological pressure through the Parliamentary Recruiting Committee. Over fifty million posters were printed, shifting from patriotic appeals to direct emotional coercion that exploited domestic family guilt and filial shame, asking pointed questions such as Savile Lumley’s famous poster: "Daddy, what did YOU do in the Great War?". Public rallies featured fiery speeches urging men to do their duty.',
          '<span class="para-ref">[3.2]</span> Concurrently, civilian organisations unleashed aggressive social shaming tactics to coerce reluctant young men into uniform. Admiral Charles Penrose Fitzgerald founded the Order of the White Feather, encouraging women to publicly present white feathers—a traditional symbol of cowardice—to any man of military age seen in civilian clothes. Baroness Orczy formed the Active Service League, ruthlessly humiliating thousands of eligible men into enlistment offices regardless of vital industrial exemptions.',
        ],
      },
      {
        title: 'Act 4: The Tragic Flaw: Concentrated Community Grief',
        text: [
          '<span class="para-ref">[4.1]</span> By late 1915, over 2.4 million British men had volunteered freely, representing the largest unforced military mobilisation in world history. Yet this volunteer system caused severe industrial disruption: thousands of skilled coal miners, shipbuilders, and munitions engineers had joined the ranks, causing acute manufacturing deficits that precipitated the disastrous May 1915 Shell Crisis on the Western Front, forcing Lloyd George to restructure factory production.',
          '<span class="para-ref">[4.2]</span> More tragically still, when the New Armies marched into combat on the Western Front, the grim mechanics of industrial firepower fell upon specific geographic communities. The slaughter fell not evenly across Britain, but struck concentrated blows against individual streets, factories, and villages, leaving thousands of neighbourhoods simultaneously bereaved and forever altering British social history and collective remembrance.',
        ],
      },
    ],

    // Lesson 2: Trench Warfare, The Somme & The Haig Debate (1914–1916)
    [
      {
        title: 'Act 1: Trench Architecture & Defensive Superiority',
        text: [
          '<span class="para-ref">[1.1]</span> Following the Battle of the Marne and the frantic "Race to the Sea" in autumn 1914, mobile warfare ground to an exhausted halt. Across four hundred continuous miles from the Swiss frontier to the Belgian coast at Nieuwpoort, opposing armies dug thousands of miles of fortified earthworks, establishing the deadlock of the Western Front.',
          '<span class="para-ref">[1.2]</span> This static deadlock was dictated by the total dominance of defensive industrial technology: rapid-firing Maxim and Vickers machine guns (firing 500 rounds per minute), magazine-fed Lee-Enfield rifles, and massed artillery. Against these defensive vectors, infantry charging across open ground faced certain destruction. Earthworks, sandbag parapets, and timber-reinforced dugouts provided the only sanctuary against lethal high-explosive shrapnel.',
          '<span class="para-ref">[1.3]</span> Frontline trenches were engineered in disciplined zig-zag patterns with alternating firebays and defensive traverses to localise shell blasts and prevent enemy raiders from firing down entire trenches. Between opposing positions lay No Man’s Land: a lethal wasteland of shell craters, unburied corpses, and deep belts of barbed wire up to forty yards deep, illuminated at night by magnesium flares and swept continuously by machine-gun fire.',
        ],
      },
      {
        title: 'Act 2: 1 July 1916: The Catastrophe on the Somme',
        text: [
          '<span class="para-ref">[2.1]</span> In summer 1916, British Commander-in-Chief Sir Douglas Haig launched a massive joint offensive alongside French forces along the River Somme in Picardy. The primary strategic objective was to relieve catastrophic German pressure on the French fortress city of Verdun, while wearing down German reserves through sustained attritional pressure.',
          '<span class="para-ref">[2.2]</span> To ensure a decisive infantry breakthrough, British artillery unleashed a seven-day preliminary bombardment, firing over 1.5 million shells designed to pulverise German frontline trenches, obliterate machine-gun redoubts, and sever the barbed wire. British infantry were assured that the bombardment would leave no enemy alive, allowing them to advance walking in orderly waves with sixty-pound packs to occupy German ruins.',
          '<span class="para-ref">[2.3]</span> The bombardment proved a catastrophic failure: over a third of the shells were duds, shrapnel failed to cut the thick wire entanglements, and German soldiers sheltered safely in reinforced concrete dugouts thirty feet underground. When the barrage lifted at 7:30 am on 1 July 1916, German machine gunners rushed to the parapet, mowing down advancing British troops and inflicting 57,470 casualties on the bloodiest single day in British military history.',
        ],
      },
      {
        title: 'Act 3: Industrialized Attrition & Artillery Dominance',
        text: [
          '<span class="para-ref">[3.1]</span> Despite the catastrophic first day, the Battle of the Somme raged for 141 days until mid-November 1916, costing over 420,000 British, 200,000 French, and 450,000 German casualties. Warfare on the Western Front ceased to be a heroic contest of manoeuvre; it became an industrial war of attrition (<em>Materialschlacht</em>) in which victory was calculated by which nation could endure the greatest consumption of men and munitions. Heavy howitzers dominated combat.',
          '<span class="para-ref">[3.2]</span> Artillery fire caused over 70% of all battlefield wounds, raining millions of high-explosive and gas shells onto soldiers trapped in waterlogged, rat-infested mud. Beyond trench foot and lice, soldiers suffered acute psychological destruction termed "shell shock", where the nervous system shattered under relentless acoustic concussions, leading harsh military authorities to court-martial hundreds for desertion.',
        ],
      },
      {
        title: 'Act 4: The Haig Historiographical Debate: "Butcher" vs "Learner"',
        text: [
          '<span class="para-ref">[4.1]</span> Post-war traditionalist historians (such as Alan Clark in <em>The Donkeys</em>, 1961) and wartime politicians like David Lloyd George castigated Field Marshal Haig as an obstinate, unimaginative cavalry officer who detached himself from trench reality and squandered hundreds of thousands of citizen volunteers in futile frontal assaults against fortified machine guns, earning the pejorative label "The Butcher of the Somme".',
          '<span class="para-ref">[4.2]</span> In contrast, modern revisionist historians (John Terraine, Gary Sheffield) argue Haig was trapped by contemporary technological limitations: telephone lines were severed by artillery and wireless radio was too heavy for infantry. Furthermore, revisionists highlight that the attritional pressure of the Somme severely degraded the veteran German army, forcing their 1917 retreat to the Hindenburg Line and enabling the pioneering combined-arms victories of 1918.',
        ],
      },
    ],

    // Lesson 3: The Global War & Forgotten Empire Troops (1914–1918)
    [
      {
        title: 'Act 1: Imperial Mobilisation: The Indian Corps at Ypres',
        text: [
          '<span class="para-ref">[1.1]</span> Popular memory often portrays the Western Front as an exclusively European conflict between Britain, France, and Germany. In reality, Great Britain operated as an imperial superpower commanding the manpower and resources of over 400 million subjects across South Asia, Africa, Australasia, and the Caribbean, without whom the Allied war effort would have collapsed.',
          '<span class="para-ref">[1.2]</span> In autumn 1914, when the original British Expeditionary Force was virtually wiped out at Mons, the Marne, and Ypres, Britain desperately summoned colonial reinforcements. The British Indian Army mobilised with extraordinary speed, transporting the Lahore and Meerut divisions across the Mediterranean to arrive at Marseille in September and October 1914, bringing over 130,000 disciplined frontline soldiers.',
          '<span class="para-ref">[1.3]</span> Clad in thin tropical cotton khaki wholly unsuitable for European winter, Indian soldiers were rushed directly into the freezing mud of the Ypres Salient. At Neuve Chapelle and Hollebeke, Indian sepoys plugged critical breaches in Allied trenches, enduring frostbite, chemical gas attacks, and relentless shellfire, sustaining thousands of casualties while holding the line until Kitchener’s volunteers were trained.',
        ],
      },
      {
        title: 'Act 2: Global Logistics: Chinese Labour Corps & BWIR',
        text: [
          '<span class="para-ref">[2.1]</span> Beyond frontline combat, modern industrial warfare required vast supply networks. To release British troops for the frontline, the War Office recruited over 140,000 Chinese non-combatant workers into the Chinese Labour Corps (CLC), alongside 16,000 volunteers from the British West Indies Regiment (BWIR) and thousands from South Africa and Egypt.',
          '<span class="para-ref">[2.2]</span> Chinese labourers performed gruelling physical tasks under constant German artillery fire: unloading cargo at Channel ports, laying military railways, assembling ammunition depots, and retrieving corpses and unexploded shells from No Man’s Land. Despite their vital contribution, they were confined to guarded camps behind barbed wire and subjected to severe military curfews and restricted movement.',
          '<span class="para-ref">[2.3]</span> West Indian volunteers, motivated by deep imperial loyalty and eager to prove their equal citizenship, encountered pervasive racial discrimination. British authorities initially barred Black soldiers from combat roles, relegating them to digging trenches, carrying heavy artillery shells, and cleaning latrines under harsh white officers, denying Black officers command authority and paying lower allowances.',
        ],
      },
      {
        title: 'Act 3: Frontline Heroism & The Hollebeke Stand',
        text: [
          '<span class="para-ref">[3.1]</span> Colonial troops repeatedly demonstrated exceptional heroism in the face of annihilation. On 31 October 1914 at Hollebeke during the First Battle of Ypres, Sepoy Khudadad Khan of the 129th Duke of Connaught’s Own Baluchis stood alone at his Maxim machine-gun post after his British officer was wounded and the rest of his gun team was killed by advancing Bavarian infantry.',
          '<span class="para-ref">[3.2]</span> Gravely wounded, Khudadad Khan maintained sustained fire that halted the German assault, feigned death until nightfall, and crawled back to British lines. He became the first native South Asian soldier awarded the Victoria Cross, presented personally by King George V. Over 1.5 million Indian personnel served overseas during the war, earning eleven Victoria Crosses across France, Mesopotamia, Gallipoli, and East Africa.',
        ],
      },
      {
        title: 'Act 4: Imperial Hierarchies & Postwar Memorial Amnesia',
        text: [
          '<span class="para-ref">[4.1]</span> When the war ended in November 1918, imperial promises of enhanced political rights and self-governance dissolved into betrayal. In India, wartime sacrifice was answered with the draconian 1919 Rowlatt Acts and the horrific Jallianwala Bagh (Amritsar) Massacre, where General Dyer ordered troops to fire on peaceful demonstrators, killing hundreds and igniting Mahatma Gandhi’s nationwide non-cooperation movement.',
          '<span class="para-ref">[4.2]</span> In Britain, non-white imperial troops were systematically marginalised from post-war commemorations: colonial units were largely excluded from the 1919 London Victory Parade, and the Imperial War Graves Commission frequently buried African and Asian labourers in unmarked communal graves without individual headstones, institutionalising an imperial amnesia that historians have only recently overturned.',
        ],
      },
    ],

    // Lesson 4: The Home Front, DORA & Total War (1914–1918)
    [
      {
        title: 'Act 1: The Defence of the Realm Act (DORA) & State Autocracy',
        text: [
          '<span class="para-ref">[1.1]</span> The First World War was the first true "Total War" in modern history: a conflict in which the boundary between military battlefields and civilian society completely dissolved. Victory depended not merely on soldiers in the trenches, but on the total mobilisation of factories, farms, transport, and civilian labour across the entire Home Front.',
          '<span class="para-ref">[1.2]</span> On 8 August 1914, Parliament passed the Defence of the Realm Act (DORA) without debate. DORA granted the government sweeping executive authority to requisition private land, take direct operational control of coal mines and railways, censor newspapers, and arrest citizens without trial under military regulations, ending Victorian <em>laissez-faire</em> governance and establishing state direction.',
          '<span class="para-ref">[1.3]</span> Daily civilian habits were subjected to rigorous micro-regulation. DORA prohibited lighting bonfires, flying kites, keeping carrier pigeons, melting gold coins, and discussing military affairs. To curb industrial absenteeism caused by alcohol, pub opening hours were slashed, beer was diluted with water, and the "no-treating" rule made it illegal to buy a drink for someone else under heavy fine.',
        ],
      },
      {
        title: 'Act 2: The Shell Crisis & The "Canary Girls"',
        text: [
          '<span class="para-ref">[2.1]</span> In May 1915, British newspapers exposed the "Shell Scandal": an acute shortage of high-explosive artillery shells on the Western Front that crippled British attacks and caused needless casualties. The scandal brought down Asquith’s Liberal government, leading to a coalition and the creation of the Ministry of Munitions under David Lloyd George.',
          '<span class="para-ref">[2.2]</span> Lloyd George nationalised armament manufacturing and recruited over one million women into heavy industry and munitions factories. Handling toxic chemicals like TNT and cordite, female workers endured severe jaundice that turned their skin and hair bright yellow, leading to the nickname "Canary Girls". Despite the constant danger of fatal factory explosions (such as the 1917 Silvertown blast), women produced 80% of British munitions.',
          '<span class="para-ref">[2.3]</span> Women also drove omnibuses, staffed postal routes, served in police patrols, and formed the Women’s Land Army to safeguard food production against German U-boat blockades. Their vital economic contribution decisively shattered Victorian prejudices that women were emotionally and physically incapable of handling civic and industrial responsibilities, shifting public attitudes toward female political equality.',
        ],
      },
      {
        title: 'Act 3: 1916 Conscription & Military Service Tribunals',
        text: [
          '<span class="para-ref">[3.1]</span> By late 1915, the relentless attrition on the Western Front exhausted the voluntary enlistment system. Facing a severe manpower deficit, Prime Minister Asquith passed the Military Service Act in January 1916, introducing compulsory conscription for all unmarried men aged 18 to 41, later extended to married men and men up to age 51 to sustain army divisions.',
          '<span class="para-ref">[3.2]</span> Around 16,000 British men refused military service on religious, moral, or political grounds as "Conscientious Objectors". They were forced to plead their case before hostile local military tribunals. While some accepted non-combatant roles such as stretcher-bearers or ambulance drivers, over 1,500 "absolutists" who refused all war work were imprisoned under brutal hard-labour conditions in places like Dyce camp and Richmond Castle.',
        ],
      },
      {
        title: 'Act 4: Female Suffrage & The Transformation of British Society',
        text: [
          '<span class="para-ref">[4.1]</span> Total war permanently transformed British society. German submarine warfare sank one in four merchant ships approaching Britain in 1917, triggering acute food shortages and forcing the government to introduce national rationing for sugar, meat, butter, and jam in early 1918, equalising consumption across social classes and establishing official coupon books for every household.',
          '<span class="para-ref">[4.2]</span> In February 1918, recognising that working-class soldiers without property could not vote and acknowledging women’s wartime service, Parliament passed the Representation of the People Act. The act abolished property qualifications for men aged 21 and granted the vote to women over 30 who met property requirements, tripling the electorate and taking a decisive stride toward universal adult democracy.',
        ],
      },
    ],

    // Lesson 5: The Peace of Versailles & The German Trauma (1919)
    [
      {
        title: 'Act 1: The Big Three Clashing in the Hall of Mirrors',
        text: [
          '<span class="para-ref">[1.1]</span> In January 1919, delegates from thirty-two victorious nations convened at the Paris Peace Conference to redraw the world map following the collapse of four European empires (German, Austro-Hungarian, Russian, and Ottoman). Negotiations were dominated by the "Big Three": Prime Minister Georges Clemenceau of France, Prime Minister David Lloyd George of Britain, and President Woodrow Wilson of the United States.',
          '<span class="para-ref">[1.2]</span> The leaders pursued deeply conflicting geopolitical agendas. French Premier Clemenceau ("The Tiger"), whose country had suffered 1.4 million military deaths and widespread northern industrial devastation, demanded that Germany be permanently disarmed, territorially partitioned, and crippled with punitive financial reparations to protect French borders from future invasion.',
          '<span class="para-ref">[1.3]</span> Conversely, US President Woodrow Wilson advocated an idealistic peace based on his Fourteen Points, championing national self-determination for European peoples and the establishment of a League of Nations to resolve disputes without war. British Prime Minister David Lloyd George occupied a pragmatic middle position: pressured by British voters demanding to "Hang the Kaiser", but privately eager to preserve Germany as a trading partner and bulwark against Russian Bolshevism.',
        ],
      },
      {
        title: 'Act 2: The Terms: Disarmament, Reparations & Amputation',
        text: [
          '<span class="para-ref">[2.1]</span> Signed on 28 June 1919 in the Hall of Mirrors at Versailles—where the German Empire had been proclaimed in 1871—the Treaty of Versailles was a volatile compromise. The defeated German delegation was excluded from negotiations, locked behind barbed wire at their hotel, and forced to sign under threat of immediate Allied military invasion and the reimposition of the naval starvation blockade.',
          '<span class="para-ref">[2.2]</span> Militarily, the treaty slashed the German army to 100,000 volunteers, outlawed conscription, and banned tanks, military aircraft, heavy artillery, and submarines. The German navy was limited to six pre-dreadnought battleships, leading German sailors to scuttle their own High Seas Fleet at Scapa Flow, while the Rhineland was permanently demilitarised to create a strategic buffer zone for France.',
          '<span class="para-ref">[2.3]</span> Territorially, Germany lost 13% of its European land and six million citizens. Alsace-Lorraine was returned to France; the Polish Corridor was carved out to grant Poland Baltic Sea access, severing East Prussia from Germany; the Saar coalfields were placed under League of Nations control; and all overseas colonies were confiscated as Allied mandates.',
        ],
      },
      {
        title: 'Act 3: Article 231 War Guilt & The German Trauma',
        text: [
          '<span class="para-ref">[3.1]</span> The most psychologically toxic clause of the settlement was Article 231, the "War Guilt Clause". To establish a legal framework justifying financial compensation, the Allies compelled Germany to accept sole moral responsibility for causing all loss and damage suffered by the Allied powers during the war, provoking outrage from German delegate Count Brockdorff-Rantzau.',
          '<span class="para-ref">[3.2]</span> In 1921, the Inter-Allied Reparations Commission set Germany’s financial indemnity at an astronomical £6.6 billion (132 billion gold marks) under the London Ultimatum. The German public, who believed they had fought a defensive war against Russian encirclement, universally condemned the treaty as an illegitimate, humiliating <em>Diktat</em> (dictated peace), fostering revanchist bitterness across Weimar Germany.',
        ],
      },
      {
        title: 'Act 4: Historiographical Debate: "Carthaginian Peace" vs "Fragile Compromise"',
        text: [
          '<span class="para-ref">[4.1]</span> In 1919, British economist John Maynard Keynes famously condemned Versailles in <em>The Economic Consequences of the Peace</em> as a vindictive "Carthaginian Peace" that would starve Germany, destroy European trade networks, and inevitably provoke future continental war. Keynes’ critique shaped inter-war British guilt and encouraged the appeasement policies of the 1930s.',
          '<span class="para-ref">[4.2]</span> Modern revisionist historians (Margaret MacMillan, Sally Marks) challenge Keynes, arguing Versailles was a viable compromise that was neither excessively harsh nor impossible to fulfill. Germany remained territorially unified with its industrial core intact; revisionists argue the failure lay not in the treaty’s terms, but in the Allies’ subsequent refusal to enforce them during the rise of Adolf Hitler.',
        ],
      },
    ],

    // Lesson 6: The "Lost Generation" & Local Bereavement (Stubbington) (1914–1922)
    [
      {
        title: 'Act 1: Demographic Devastation: The Missing Generation',
        text: [
          '<span class="para-ref">[1.1]</span> When the Armistice took effect on 11 November 1918, the British Empire mourned over 900,000 military fatalities, with over 722,000 from the British Isles alone. One in eight British men who enlisted was killed, and more than 1.6 million returned home bearing permanent physical wounds: amputations, severe facial trauma, blindness, and chronic respiratory illness caused by mustard gas.',
          '<span class="para-ref">[1.2]</span> This catastrophe gave rise to the poignant concept of the "Lost Generation". The demographic impact was devastating: among British men aged 20 to 24 in 1914, over 20% were killed. In peacetime society, millions of women were left without husbands, creating a generation of bereaved widows, grieving mothers, and single women whom contemporary newspapers patronisingly labeled "surplus women".',
          '<span class="para-ref">[1.3]</span> Grief was intensified by the government’s policy prohibiting the repatriation of war dead. To enforce equality in death, every fallen soldier was buried near the battlefield where they fell. Denied graves to visit, bereaved families endured immense psychological distress, driving local communities across Britain to construct physical memorials as communal focal points for grief.',
        ],
      },
      {
        title: 'Act 2: The Stubbington Shelter & The Village Green Pump',
        text: [
          '<span class="para-ref">[2.1]</span> Between 1919 and 1925, over 100,000 war memorials were erected across Great Britain, funded entirely by public subscriptions raised within individual parishes, schools, and workplaces. While most towns chose classical stone crosses or soldier statues, the Hampshire parish of Stubbington and Hill Head chose a unique architectural design.',
          '<span class="para-ref">[2.2]</span> The community resolved to build an open-timbered oak memorial shelter directly over the historic village water pump in the centre of Stubbington Green. Rather than an aloof stone obelisk, the village created a functional sanctuary that provided shade, shelter, and seating for residents gathering to collect their daily water, seamlessly weaving remembrance into daily village life.',
          '<span class="para-ref">[2.3]</span> The construction was entrusted to master village carpenter Arthur Tribbeck. Using seasoned English oak, Tribbeck carved the names of sixty-seven local casualties into the roof beams, enduring the heartbreak of chiseling the name of his own 21-year-old son, Harold Tribbeck, who died of gangrene in October 1918. Major funding was provided by Mrs. Lydia King of Seabank, Hill Head, whose daughter was the only woman commemorated among the fallen.',
        ],
      },
      {
        title: 'Act 3: The Extinction of Lineages: The Lowry Brothers & Nurse Nita King',
        text: [
          '<span class="para-ref">[3.1]</span> Behind the sixty-seven names lay catastrophic domestic bereavement. At Manor Way Grange, prominent residents William and Annie Lowry sent all three sons to the front: 2nd Lt William "Harper" Lowry was killed at Gallipoli in 1915; 2nd Lt Cyril "Patrick" Lowry was killed on the Somme in March 1918; and Major Auriol "Eric" Lowry DSO, MC was killed by machine-gun fire just seven weeks before the Armistice, extinguishing the family lineage. In their sorrow, the parents erected the Lowry Memorial Hall in Lee-on-the-Solent.',
          '<span class="para-ref">[3.2]</span> Alongside sixty-six men, the memorial commemorates a single woman: 29-year-old Voluntary Aid Detachment (VAD) nurse Nita Madeline King. Stationed at the tented Allied hospital in Wimereux, France, Nita died of cerebrospinal meningitis contracted while nursing wounded soldiers in May 1917. In her memory, her mother Lydia funded the village shelter and endowed the Nita King Research Scholarship at Cambridge University.',
        ],
      },
      {
        title: 'Act 4: Collective Memory & The Architecture of Mourning',
        text: [
          '<span class="para-ref">[4.1]</span> Micro-history—the detailed investigation of a single parish, street, or family—provides an essential historical lens for comprehending national trauma. Behind abstract national casualty figures lay the intimate destruction of rural English community life: blacksmiths, agricultural labourers, and shop apprentices who vanished from village greens forever, leaving grieving families to cope without breadwinners.',
          '<span class="para-ref">[4.2]</span> By building their war memorial over the community water pump, the residents of Stubbington ensured that remembrance became part of everyday survival. Each time a villager pumped water, they looked up at the names carved into the beams, transforming the memorial from a monument of war into a living covenant of shared community grief and enduring gratitude.',
        ],
      },
    ],
  ];

  // -------------------------------------------------------------
  // BACK COVER REVISION SPINE (Page 14)
  // -------------------------------------------------------------
  const CHRONOLOGY = [
    {
      date: '4 Aug 1914',
      event: 'Britain declares war on Germany following the invasion of Belgium.',
    },
    {
      date: 'Aug–Oct 1914',
      event: 'Kitchener’s Call for 500,000 volunteers; Pompey Pals formed in Portsmouth.',
    },
    {
      date: 'Oct–Nov 1914',
      event: 'Indian Corps arrives in France; Sepoy Khudadad Khan wins VC at Ypres.',
    },
    {
      date: 'May 1915',
      event: 'Shell Crisis exposes ammunition shortages; Ministry of Munitions created.',
    },
    {
      date: 'Jan 1916',
      event: 'Military Service Act introduces compulsory conscription in Great Britain.',
    },
    {
      date: '1 July 1916',
      event: 'First Day on the Somme: 57,470 British casualties on single bloodiest day.',
    },
    {
      date: 'Dec 1916',
      event: 'David Lloyd George becomes Prime Minister and forms five-man War Cabinet.',
    },
    {
      date: '1917',
      event: 'Over 140,000 Chinese labourers deploy to Western Front in logistics corps.',
    },
    {
      date: 'Feb 1918',
      event: 'Representation of the People Act grants vote to men 21+ and women 30+.',
    },
    {
      date: 'Spring 1918',
      event: 'German Ludendorff Offensive broken; Allied Hundred Days Offensive begins.',
    },
    {
      date: '11 Nov 1918',
      event: 'Armistice signed at Compiègne; guns fall silent on Western Front at 11am.',
    },
    {
      date: '28 June 1919',
      event: 'Treaty of Versailles signed in Hall of Mirrors; Article 231 War Guilt imposed.',
    },
    {
      date: '1921',
      event: 'Inter-Allied Commission sets German reparations liability at £6.6 billion.',
    },
    {
      date: '4 June 1922',
      event: 'Stubbington Memorial Shelter over village pump dedicated to 67 local fallen.',
    },
  ];

  const THEMATIC_MATRIX = [
    {
      strand: 'State Control & Conscription',
      trajectory:
        'Voluntary enlistment (1914) → DORA emergency powers → 1916 conscription tribunals → Total war state governance.',
      lessons: 'L1, L2, L4, L5',
    },
    {
      strand: 'Industrialised Slaughter & Tech',
      trajectory:
        'Maxim guns & trench earthworks → 1915 Shell Crisis → 1916 Somme attrition → 1918 tanks & combined-arms victory.',
      lessons: 'L2, L3, L4, L7',
    },
    {
      strand: 'Propaganda & War Guilt',
      trajectory:
        'White Feather coercion & Kitchener posters → German atrocity news → Article 231 War Guilt → Stab-in-the-back myth.',
      lessons: 'L1, L2, L5',
    },
    {
      strand: 'Agency, Dissent & Mourning',
      trajectory:
        'Khudadad Khan VC battlefield agency → 1m Canary Girls → Conscientious objectors → Stubbington village shelter.',
      lessons: 'L3, L4, L6',
    },
  ];

  const HISTORIOGRAPHICAL_DEBATES = [
    {
      debate: 'General Sir Douglas Haig: Butcher or Technological Innovator?',
      viewA:
        '<strong>Traditional "Butcher" View (Alan Clark, Lloyd George):</strong> Haig was an obstinate, unimaginative cavalryman who needlessly sacrificed over 400,000 men on the Somme in futile frontal assaults against fortified machine-gun lines.',
      viewB:
        '<strong>Revisionist "Learner" View (John Terraine, Gary Sheffield):</strong> Haig was constrained by 1916 technological limits; attritional pressure broke the German army, leading directly to the pioneering all-arms victory of the 1918 Hundred Days.',
    },
    {
      debate: 'The Treaty of Versailles: Carthaginian Peace or Fragile Compromise?',
      viewA:
        '<strong>Pessimistic Economic View (John Maynard Keynes):</strong> Versailles was a vindictive and economically disastrous settlement that crushed German industry, guaranteed continental turmoil, and paved the road to a second world war.',
      viewB:
        '<strong>Modern Revisionist View (Margaret MacMillan, Sally Marks):</strong> Versailles was a workable compromise that left Germany geographically unified with its industrial potential intact; failure lay in the lack of Allied political will to enforce it.',
    },
  ];

  const SYNOPTIC_VERDICT = {
    title: 'Synoptic Assessment & Historical Verdict • 4 Core Thematic Conclusions',
    pillars: [
      {
        theme: 'Military Attrition & Tech',
        verdict:
          'Defensive firepower (Maxim guns, wire, artillery) dominated 1914–1917; victory required learning all-arms tactics combining tanks, aircraft, and creeping barrages in 1918.',
      },
      {
        theme: 'State Autocracy & Society',
        verdict:
          'Total war permanently transformed Britain: DORA curbed civil liberties, 1916 conscription replaced volunteerism, and female munitions labour accelerated full adult democracy in 1918/1928.',
      },
      {
        theme: 'Global Empire & Agency',
        verdict:
          'Four million non-white imperial troops and labourers sustained the Allied war effort, yet postwar colonial erasure accelerated anti-colonial resistance across India and the Caribbean.',
      },
      {
        theme: 'Versailles & Geopolitics',
        verdict:
          'The collapse of four European empires and the imposition of Article 231 War Guilt created a fragile, resented peace in Weimar Germany that destabilised European collective security.',
      },
    ],
  };

  return {
    unitId: 'great_war_part2',
    unitTitle: 'THE GREAT WAR (1914–1919)',
    yearGroup: 'Year 9',
    subtitle: 'Voluntary Enlistment, Trench Warfare, Global Empire & The Peace of Versailles',
    overarchingEnquiry:
      'How did a single spark in Sarajevo ignite a global conflict that transformed the modern world?',
    dateRange: '1914–1919',
    heroImage: '/images/stubbington_memorial_1.jpg',
    heroCaption:
      'The Stubbington War Memorial Shelter, erected in 1922 over the village green water pump, built by Arthur Tribbeck and funded by the mother of VAD nurse Nita Madeline King, commemorating the sixty-seven local fallen.',
    syllabusMatrix: SYLLABUS_MATRIX,
    leftSources: LEFT_SOURCES,
    leftVocab: LEFT_VOCAB,
    componentBank: COMPONENT_BANK,
    lessonSections: LESSON_SECTIONS,
    chronology: CHRONOLOGY,
    thematicMatrix: THEMATIC_MATRIX,
    historiographicalDebates: HISTORIOGRAPHICAL_DEBATES,
    synopticVerdict: SYNOPTIC_VERDICT,
  };
};
