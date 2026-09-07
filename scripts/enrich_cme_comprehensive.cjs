const fs = require('fs');
const path = require('path');
const vm = require('vm');

const dataJsPath = path.join(__dirname, '..', 'units', 'cme_new', 'data.js');
let content = fs.readFileSync(dataJsPath, 'utf8');

// Read existing unit object via VM
content = content.replace(/export\s+/g, '// export ');
const sandbox = {};
vm.runInNewContext(content, sandbox);
const unit = sandbox.cme_new;

console.log('Original unit loaded. Total lessons:', unit.lessons.length);

// -------------------------------------------------------------
// 1. REBUILD LESSON 1 (KT 1.0 FOUNDATIONS)
// -------------------------------------------------------------
const lesson1 = unit.lessons[0];
lesson1.id = 'lesson_1';
lesson1.title = 'KT 1.0: Foundational Geography & Geopolitics: Why the Middle East Ignited';
lesson1.enquiry =
  'Water, Faith, and Imperial Rulers: How did physical geography and artificial borders make conflict in the Middle East inevitable?';
lesson1.hook_text =
  'The Middle East is the ultimate geopolitical crossroads of the earth—the physical land bridge connecting Europe, Asia, and Africa, the guardian of vital maritime chokepoints, and the birthplace of three world religions. To understand the bloody wars between Arabs and Israelis from 1945 to 1995, one must first understand its geography: how European diplomats drew straight ruler lines across deserts, why fresh water from the River Jordan is a matter of national survival, and why controlling the high ground of the Golan Heights or the narrow waters of the Straits of Tiran dictated the difference between victory and annihilation.';

lesson1.do_now = {
  type: 'questions',
  title: 'Geopolitical & Spatial Recall (Prior Knowledge)',
  instructions:
    'Answer these questions in full sentences to activate your understanding of the region.',
  items: [
    {
      question:
        'Which three continents intersect at the Middle East, making it a critical strategic crossroads throughout world history?',
      answer: 'Europe, Asia, and Africa.',
    },
    {
      question:
        'What vital maritime waterway, completed in 1869 across Egypt, connects the Mediterranean Sea directly to the Red Sea?',
      answer: 'The Suez Canal.',
    },
    {
      question:
        'What narrow body of water at the southern tip of the Sinai Peninsula controls maritime access to the Gulf of Aqaba and Israel’s southern port of Eilat?',
      answer: 'The Straits of Tiran.',
    },
    {
      question:
        'Which elevated volcanic plateau in south-western Syria directly overlooks the Sea of Galilee and northern Israeli civilian settlements?',
      answer: 'The Golan Heights.',
    },
    {
      question:
        'Which freshwater river forms the natural eastern boundary of the West Bank, flowing south from the Sea of Galilee into the Dead Sea?',
      answer: 'The River Jordan.',
    },
    {
      question:
        'Which ancient city is considered a sacred holy sanctuary by Jews, Christians, and Muslims, and claimed as a capital by both Israelis and Palestinians?',
      answer: 'Jerusalem.',
    },
    {
      question:
        'Which vast triangular desert peninsula connecting Africa to Asia served as a major military buffer zone between Egypt and Israel?',
      answer: 'The Sinai Peninsula.',
    },
    {
      question:
        'What secret agreement in May 1916 saw British and French diplomats use a ruler to carve the collapsing Ottoman Empire into European spheres of influence?',
      answer: 'The Sykes-Picot Agreement.',
    },
    {
      question:
        'What official British letter in November 1917 promised British support for the establishment of a "national home for the Jewish people" in Palestine?',
      answer: 'The Balfour Declaration.',
    },
    {
      question:
        'Why is military control of "high ground" like the Golan Heights considered an indispensable defense asset in modern warfare?',
      answer:
        'It provides commanding sightlines for artillery, radar early warning, and tactical defense against land invasions.',
    },
  ],
};

lesson1.teacher_notes = {
  primer:
    'This foundational lesson establishes the essential geopolitical, spatial, and territorial framework for GCSE Paper 2. Before diving into 1945, students must master the geography of the Middle East, understanding how British and French imperial partitions created artificial borders, why contradictory wartime pledges bred mutual mistrust, and how maritime chokepoints and physical terrain shaped every major war from 1948 to 1973.',
  objectives: [
    {
      objective:
        'Analyse how the Sykes-Picot Agreement (1916) and League of Nations mandates drew artificial straight lines across former Ottoman territories.',
      primer:
        'Examine the primary map in Block 1. Show students how Mark Sykes and François Georges-Picot literally used rulers across desert sands, ignoring tribal and religious boundaries.',
      question:
        'Why did drawing arbitrary straight lines across former Ottoman lands create chronic long-term political instability in the modern Middle East?',
    },
    {
      objective:
        'Evaluate the contradictory British wartime pledges: the McMahon-Hussein Correspondence (1915) versus the Balfour Declaration (1917).',
      primer:
        'Contrast British promises to Sharif Hussein of Mecca with Arthur Balfour’s letter to Lord Rothschild, highlighting why both Arabs and Zionists felt legitimately promised sovereignty.',
      question:
        'How did Britain’s simultaneous promises to Arabs and Jews guarantee that future conflict over Palestine would be almost unavoidable?',
    },
    {
      objective:
        'Identify the 4 strategic flashpoints of the Arab-Israeli conflict: Maritime Chokepoints, Elevated High Ground, Freshwater Basins, and Jerusalem.',
      primer:
        'Guide students through Block 3 and the interactive maps, linking the Suez Canal, Straits of Tiran, Golan Heights, and West Bank directly to causes of war.',
      question:
        'Why would Egypt closing the Straits of Tiran or nationalising the Suez Canal be considered an immediate casus belli (act of war) by Israel and Western powers?',
    },
  ],
  source_context:
    'Primary map of the secret Sykes-Picot Agreement signed on 8 May 1916 by Sir Mark Sykes and François Georges-Picot, dividing the Ottoman Middle East into British and French zones. **Hinge Question:** Why did British and French diplomats believe drawing straight lines across tribal, ethnic, and religious lands would remain stable, and why did this arbitrary imperial partition create over a century of chronic conflict?',
};

lesson1.narrative_blocks = [
  {
    type: 'narrative',
    theme_heading:
      '1. The Imperial Dismemberment: The Collapse of the Ottoman Empire & Sykes-Picot (1916)',
    images: [
      {
        src: '/images/cme_sykes_picot_1916_map.jpg',
        caption:
          'Primary Source: The original signed Sykes-Picot Agreement map (8 May 1916). British and French diplomats used a ruler to carve the Ottoman Middle East into European zones of control.',
        alt: 'Map of the Sykes-Picot Agreement 1916',
      },
    ],
    image_context:
      'Primary map of the secret Sykes-Picot Agreement signed on 8 May 1916 by Sir Mark Sykes and François Georges-Picot, dividing the Ottoman Middle East into British and French zones. **Hinge Question:** Why did British and French diplomats believe drawing straight lines across tribal, ethnic, and religious lands would remain stable, and why did this arbitrary imperial partition create over a century of chronic conflict?',
    text: `For over four centuries leading up to the First World War, the Middle East was ruled as part of the vast Turkish <strong>Ottoman Empire</strong>. The region was not divided into modern nation-states like Lebanon, Syria, Jordan, or Iraq; instead, it was administered as imperial provinces under the Ottoman Sultan in Constantinople.<br><br>
When the Ottoman Empire joined World War One on the side of Germany in October 1914, Britain and France seized the opportunity to dismember the Turkish empire and expand their imperial dominance. In May 1916, British diplomat Sir Mark Sykes and French diplomat François Georges-Picot drew up the secret <strong>Sykes-Picot Agreement</strong>. Using a ruler across a map, they partitioned the region:
<ul>
  <li><strong>French Sphere:</strong> Syria and Lebanon (coastal blue zone and Area A).</li>
  <li><strong>British Sphere:</strong> Mesopotamia (modern Iraq) and Transjordan (Area B and red zone), securing oil routes to the Persian Gulf.</li>
  <li><strong>Brown Zone (Palestine):</strong> Designated for international administration due to the religious sensitivity of Christian, Muslim, and Jewish holy sites in Jerusalem.</li>
</ul>
Following Allied victory in 1918, the newly formed <strong>League of Nations</strong> formalised this partition through the <strong>Mandates System</strong> at the San Remo Conference (1920). These straight-line borders completely ignored traditional tribal boundaries, religious sects (Sunni, Shia, Christian, Druze, Jewish), and natural geography. This artificial map sowed the seeds of chronic regional instability that persists to this day.`,
    tasks: [
      {
        type: 'comprehension',
        question:
          'Explain why the Sykes-Picot Agreement and League of Nations mandates created artificial borders in the Middle East.',
        model:
          'The Sykes-Picot Agreement created artificial borders because British and French diplomats divided the collapsed Ottoman Empire according to European imperial and strategic interests rather than local realities. They drew arbitrary straight lines across desert maps without consulting the indigenous populations, grouping rival religious sects and distinct tribes into newly fabricated states while splitting historic communities across national frontiers.',
      },
    ],
  },
  {
    type: 'narrative',
    theme_heading:
      '2. Contradictory Imperial Pledges: The McMahon-Hussein Correspondence vs The Balfour Declaration (1915–1917)',
    images: [
      {
        src: '/images/cme_balfour_declaration_1917.jpg',
        caption:
          'Primary Source: The Balfour Declaration (2 November 1917). British Foreign Secretary Arthur Balfour conveyed the British government’s support for a Jewish national home in Palestine to Lord Walter Rothschild.',
        alt: 'The Balfour Declaration 1917',
      },
      {
        src: '/images/cme_allenby_jerusalem_1917.jpg',
        caption:
          'General Edmund Allenby entering Jerusalem on foot through the Jaffa Gate (11 December 1917) out of religious respect, marking the end of 400 years of Ottoman Turkish rule.',
        alt: 'General Allenby entering Jerusalem on foot 1917',
      },
    ],
    image_context:
      'The Balfour Declaration (1917) and General Allenby entering Jerusalem on foot (December 1917). **Hinge Question:** Why did General Allenby dismount from his horse to enter Jerusalem on foot through the Jaffa Gate, and how did Britain’s simultaneous, contradictory wartime promises to both Arabs and Zionists make future bloodshed almost unavoidable?',
    text: `During the desperate fighting of World War One, the British government made contradictory promises to both Arab and Jewish leaders in order to secure essential wartime support, creating a legacy of bitter betrayal.<br><br>
<strong>1. The McMahon-Hussein Correspondence (1915–1916):</strong><br>
Sir Henry McMahon, British High Commissioner in Cairo, exchanged ten official letters with <strong>Sharif Hussein of Mecca</strong>, guardian of Islam’s holiest sites. In exchange for the Arabs launching an armed rebellion (the Great Arab Revolt, assisted by T.E. Lawrence) against Ottoman forces, Britain pledged to recognize an independent, sovereign Arab kingdom across the Middle East. Arab leaders believed this pledge encompassed Palestine.<br><br>
<strong>2. The Balfour Declaration (2 November 1917):</strong><br>
Just two years later, British Foreign Secretary Arthur Balfour sent an official letter to Lord Walter Rothschild, a prominent leader of the British Jewish community. The declaration stated: <em>'His Majesty's Government view with favour the establishment in Palestine of a national home for the Jewish people...'</em>. While it added that nothing should prejudice the civil and religious rights of existing non-Jewish communities, it made no mention of their political or national rights, despite Arabs making up over 90% of Palestine’s population in 1917.<br><br>
<strong>The Clash of Nationalisms:</strong>
<ul>
  <li><strong>Zionism:</strong> Founded by Theodor Herzl in 1897 in response to violent European antisemitic pogroms. Zionists argued that Jewish people would never be safe from persecution without their own sovereign state in their ancestral biblical homeland (Eretz Israel / Palestine).</li>
  <li><strong>Arab Nationalism:</strong> Arab leaders argued that having lived continuously in Palestine for centuries, the Arab majority possessed an indisputable natural right to national self-determination and independent statehood.</li>
</ul>
Britain had promised the exact same sliver of land to two different peoples with mutually irreconcilable aspirations.`,
    tasks: [
      {
        type: 'comprehension',
        question:
          'Explain the fundamental contradiction between the McMahon-Hussein Correspondence and the Balfour Declaration.',
        model:
          'The fundamental contradiction was that Britain pledged the same territory to two opposing nationalist movements. Through the McMahon-Hussein Correspondence, Arab leaders were led to believe Britain would support an independent Arab kingdom including Palestine in reward for fighting the Ottomans. However, the Balfour Declaration officially promised British backing for a Jewish national home in Palestine, ignoring the political self-determination of the existing 90% Arab majority.',
      },
    ],
  },
  {
    type: 'narrative',
    theme_heading: '3. The Four Geo-Strategic Flashpoints of the Arab-Israeli Conflict',
    images: [
      {
        src: '/units/cme_new/assets/map_lesson1.png',
        caption:
          'Strategic Map: The contested flashpoints of the Middle East, showing maritime chokepoints, high ground, and regional borders.',
        alt: 'Strategic Map of the Middle East',
      },
    ],
    image_context:
      'Physical geography and strategic chokepoints of the Middle East. **Hinge Question:** Why did controlling physical terrain (high ground like the Golan Heights and waterways like the Straits of Tiran) dictate the military timing of both the 1956 Suez Crisis and the 1967 Six-Day War?',
    text: `Understanding the physical geography of the Middle East is essential to understanding the military strategies, reasons for war, and peace negotiations of the Arab-Israeli conflict. The conflict centers on four critical spatial flashpoints:
<ol>
  <li><strong>The Maritime Chokepoints (Suez Canal & Straits of Tiran):</strong><br>
  The <strong>Suez Canal</strong> links the Mediterranean Sea to the Red Sea, serving as the global trade artery between Europe and Asia. The <strong>Straits of Tiran</strong> are a narrow 3-mile bottleneck at the southern mouth of the Gulf of Aqaba, commanding Israel’s southern maritime corridor from Eilat. Whenever Egypt blockaded the Straits (in 1956 and May 1967), it severed Israel’s oil imports and trade lifeline with Asia, acting as a direct trigger for war.</li>
  <li><strong>The Elevated High Ground (The Golan Heights):</strong><br>
  A volcanic plateau in south-western Syria rising 3,000 feet above the Sea of Galilee. Prior to 1967, Syrian artillery on the heights routinely bombarded Israeli farming settlements (kibbutzim) in the Hula Valley below. Capturing the plateau in 1967 gave Israel indispensable defensive high ground and early radar detection over Damascus.</li>
  <li><strong>The Water Basin & Territorial Depth (The West Bank & River Jordan):</strong><br>
  The hill country west of the River Jordan provides vital territorial depth. The <strong>River Jordan</strong> and the <strong>Sea of Galilee</strong> provide over 50% of the region’s fresh water. Before 1967, Israel was only 9 miles wide at its narrowest waist near Tel Aviv; capturing the West Bank pushed the military frontier to the natural barrier of the Jordan Valley.</li>
  <li><strong>The Sacred Core (Jerusalem & The Old City):</strong><br>
  One square kilometer of ancient stone containing the holiest sites of Judaism (The Western Wall / Temple Mount), Christianity (The Church of the Holy Sepulchre), and Islam (The Al-Aqsa Mosque and Dome of the Rock). Divided between Israel and Jordan along the 1949 Green Line, its capture by Israel in 1967 remains the emotional and political heart of the conflict.</li>
</ol>`,
    tasks: [
      {
        type: 'comprehension',
        question:
          'Why were the Golan Heights and the Straits of Tiran of supreme strategic importance in the Arab-Israeli wars?',
        model:
          "The Golan Heights were strategically vital because their high elevation gave Syrian artillery commanding sightlines to shell civilian Israeli settlements across the Galilee plain, making capture of the high plateau essential for Israeli border security. The Straits of Tiran were crucial because they represented Israel's only southern maritime corridor to the Red Sea and global oil supplies; when Egypt closed this chokepoint in 1967, it severed Israel's trade lifeline and triggered the Six-Day War.",
      },
    ],
  },
];

// Geo-strategic synthesis task replacing empty exam practice in Lesson 1
lesson1.exam_practice = {
  type: 'geo_synthesis',
  title: 'Geo-Strategic Crucible Synthesis Task',
  questions: [
    {
      marks: 8,
      type: 'spatial_synthesis',
      question:
        'Explain why control over the physical geography of the Middle East (specifically the Straits of Tiran and the Golan Heights) made military conflict between Israel and Arab states almost inevitable between 1948 and 1973.',
      prompt:
        'Focus your answer on: (1) The strategic maritime role of the Straits of Tiran for Israel’s economy and trade, and (2) The military dominance of the Golan Heights over Galilee settlements.',
      model: `Control over physical geography made military conflict almost inevitable because both the Straits of Tiran and the Golan Heights created existential security dilemmas that neither side could compromise on.

Firstly, the Straits of Tiran were Israel’s sole southern maritime lifeline. Located at the mouth of the Gulf of Aqaba, the straits provided access from the port of Eilat to the Red Sea, East Africa, and Asian oil markets without navigating the hostile Suez Canal. Because Israel lacked regional diplomatic ties, imported oil was essential for national survival. When Egyptian President Nasser closed the straits in 1956 and again in May 1967 by deploying troops to Sharm el-Sheikh, Israel viewed the blockade as an act of war (casus belli), leaving Israeli leaders with no perceived alternative to launching a pre-emptive military strike.

Secondly, the physical terrain of the Golan Heights gave Syria total tactical military dominance over northern Israel. Rising steeply over 1,000 meters above the Sea of Galilee, Syrian artillery fortified on the volcanic ridge could bombard civilian kibbutzim in the Hula Valley with virtual impunity. Furthermore, Syrian attempts to divert the headwaters of the River Jordan feeding the Sea of Galilee threatened Israel’s primary freshwater supply. Consequently, Israeli military commanders concluded that long-term security in the north was impossible while Syria held the high ground, leading directly to the Israeli assault and capture of the plateau during the Six Day War in June 1967.`,
    },
  ],
};

console.log(
  '✅ Lesson 1 completely rebuilt with authentic scholarship, primary visuals, and geo-synthesis task.',
);

// -------------------------------------------------------------
// 2. THE 3-LESSON EXAM SPIRAL LADDER ACROSS LESSONS 2 TO 10
// -------------------------------------------------------------

// LESSON 2: KT 1.1 The Creation of Israel
const l2 = unit.lessons[1];
l2.title = 'KT 1.1: The End of the British Mandate and the Creation of Israel, 1945–1949';
l2.enquiry =
  'Why did the British Mandate collapse and how was the State of Israel created amidst war?';
l2.do_now = {
  type: 'questions',
  title: 'Recall & Retrieval (Lesson 1: Geopolitics & Mandates)',
  instructions: 'Answer these questions in full sentences based on your prior learning.',
  items: [
    {
      question:
        'Which secret 1916 agreement between Britain and France partitioned the Middle East into European spheres of influence?',
      answer: 'The Sykes-Picot Agreement.',
    },
    {
      question:
        'What official British declaration in November 1917 supported the establishment of a Jewish national home in Palestine?',
      answer: 'The Balfour Declaration.',
    },
    {
      question:
        'What international body granted Britain the official Mandate to govern Palestine in 1920?',
      answer: 'The League of Nations.',
    },
    {
      question:
        'What was the political movement founded by Theodor Herzl aiming to create a sovereign Jewish homeland?',
      answer: 'Zionism.',
    },
    {
      question: 'Why was the Suez Canal of supreme imperial importance to Great Britain?',
      answer:
        'It was Britain’s imperial lifeline connecting the Mediterranean to India, the Far East, and Persian Gulf oil routes.',
    },
    {
      question:
        'What narrow maritime strait at the mouth of the Gulf of Aqaba links Israel’s port of Eilat to the Red Sea?',
      answer: 'The Straits of Tiran.',
    },
    {
      question:
        'Which elevated plateau overlooking Galilee was a major source of border clashes between Syria and Israel?',
      answer: 'The Golan Heights.',
    },
    {
      question: 'Which three world religions consider the Old City of Jerusalem sacred?',
      answer: 'Judaism, Christianity, and Islam.',
    },
    {
      question:
        'What freshwater river forms the natural boundary between the West Bank and Jordan?',
      answer: 'The River Jordan.',
    },
    {
      question:
        'What vast desert peninsula connects Africa to Asia and borders southern Palestine?',
      answer: 'The Sinai Peninsula.',
    },
  ],
};
l2.exam_practice = {
  type: 'consequence_4m',
  title: 'Paper 2 Exam Practice: Question 1 (Consequence)',
  questions: [
    {
      marks: 4,
      type: 'consequence',
      question: 'Explain one consequence of the bombing of the King David Hotel (1946).',
      prompt:
        'Structure your answer as 1 focused PEEL paragraph: (1) Identify a clear consequence, (2) Support with specific historical detail, (3) Explain the direct impact on British policy in Palestine.',
      model: `One consequence of the bombing of the King David Hotel was that it shattered British domestic and political resolve to maintain the Palestine Mandate.

On 22 July 1946, members of the Zionist paramilitary group Irgun, led by Menachem Begin, detonated explosives in the basement of the King David Hotel in Jerusalem, which housed the British military and administrative headquarters. The explosion killed 91 people, including British, Arab, and Jewish civil servants. This devastating attack outraged the British public and convinced Prime Minister Clement Attlee’s cabinet that stationing 100,000 British soldiers in Palestine to maintain peace was financially and politically unsustainable in post-war Britain. As a direct result, Britain abandoned attempts to resolve the crisis and formally referred the Palestine problem to the United Nations in February 1947, leading directly to the UN partition plan and British withdrawal.`,
    },
  ],
};

// LESSON 3: KT 1.2 Aftermath of 1948-49 War & Nakba
const l3 = unit.lessons[2];
l3.title = 'KT 1.2: The Aftermath of the 1948–49 War & The Palestinian Refugee Crisis';
l3.enquiry = 'What were the territorial, human, and geopolitical consequences of the 1948–49 War?';
l3.do_now = {
  type: 'questions',
  title: 'Recall & Retrieval (Lesson 2: British Withdrawal & 1948 War)',
  instructions: 'Answer these questions in full sentences based on your prior learning.',
  items: [
    {
      question:
        'Which international organisation was given responsibility for deciding the future of Palestine in 1947?',
      answer: 'The United Nations (UN).',
    },
    {
      question:
        'What was the number of the UN Partition Plan passed on 29 November 1947 dividing Palestine?',
      answer: 'UN Resolution 181.',
    },
    {
      question:
        'What percentage of Mandatory Palestine was allocated to the proposed Jewish state under Resolution 181?',
      answer: '55% of the land.',
    },
    {
      question:
        'What status was proposed for the city of Jerusalem under the 1947 UN Partition Plan?',
      answer: 'An international zone (corpus separatum) administered directly by the UN.',
    },
    {
      question: 'How did Arab leaders and the Arab Higher Committee respond to UN Resolution 181?',
      answer: 'They totally rejected it as unjust, arguing that Arabs owned the majority of land.',
    },
    {
      question:
        'On what date did David Ben-Gurion officially proclaim the declaration of the State of Israel?',
      answer: '14 May 1948.',
    },
    {
      question:
        'What occurred on the day immediately following Israel’s declaration of independence?',
      answer:
        'Five neighboring Arab armies (Egypt, Syria, Transjordan, Iraq, Lebanon) invaded Israel.',
    },
    {
      question:
        'What was the Jewish paramilitary force that formed the foundation of the newly created Israeli Defence Forces (IDF)?',
      answer: 'The Haganah.',
    },
    {
      question:
        'What Jewish militant group bombed the British headquarters at the King David Hotel in July 1946?',
      answer: 'The Irgun.',
    },
    {
      question:
        'Which European superpower provided crucial initial diplomatic recognition and permitted Czech arms shipments to Israel in 1948?',
      answer: 'The Soviet Union (USSR).',
    },
  ],
};
l3.exam_practice = {
  type: 'narrative_8m',
  title: 'Paper 2 Exam Practice: Question 2 (Narrative Account)',
  questions: [
    {
      marks: 8,
      type: 'narrative',
      question:
        'Write a narrative account analysing the key events of the 1948–49 Arab-Israeli War.\n\nYou may use the following in your answer:\n• The United Nations truce (June 1948)\n• The unification of the IDF and Czech arms supplies\nYou must also use information of your own.',
      prompt:
        'Write 2 to 3 chronological paragraphs. Show clear causal linkage between: (1) The initial Arab invasion, (2) The turning point of the June truce and arms resupply, and (3) The Israeli counter-offensives leading to the 1949 Armistice Green Line.',
      model: `The 1948–49 Arab-Israeli War began on 15 May 1948, immediately following David Ben-Gurion’s declaration of the State of Israel. Armies from Egypt, Syria, Transjordan, Lebanon, and Iraq invaded Palestine from multiple fronts. In the opening weeks of the conflict, the newly formed Israeli state was placed in severe peril, as Egyptian forces advanced north through the Negev towards Tel Aviv, and the British-trained Arab Legion of Transjordan besieged the Jewish Quarter of Jerusalem. However, the Arab forces lacked unified military command and coordinated strategic objectives, which limited their initial advances.

A decisive turning point occurred on 11 June 1948, when the United Nations brokered a four-week truce. While the Arab states largely adhered to the embargo, the provisional Israeli government under Ben-Gurion used the lull in fighting to decisively reorganize. Prime Minister Ben-Gurion dissolved independent paramilitary militias like the Irgun and Lehi, forging a unified, disciplined national army: the Israeli Defence Forces (IDF). Crucially, Israel broke the UN arms embargo by importing thousands of rifles, heavy artillery, and Avia S-199 fighter aircraft from Czechoslovakia with Soviet approval. Consequently, when fighting resumed on 8 July in the 'Ten Days', the IDF possessed superior manpower, morale, and modern weaponry.

In the final phase from autumn 1948 to early 1949, Israel launched sweeping counter-offensives (Operation Yoav and Operation Horev), driving Egyptian forces out of the northern Negev and clearing Galilee. By the time bilateral Armistice Agreements were signed on the island of Rhodes in 1949, Israel had expanded its control from the 55% allocated under UN Resolution 181 to 79% of Mandatory Palestine. The armistice established the 'Green Line', leaving Transjordan in control of the West Bank and Egypt in control of the Gaza Strip, while over 700,000 Palestinian Arabs were displaced as permanent refugees in what they commemorate as the Nakba.`,
    },
  ],
};

// LESSON 4: KT 1.3 Increased Tension & Suez Crisis
const l4 = unit.lessons[3];
l4.title = 'KT 1.3: Increased Tension, Nasser, and the Suez Crisis, 1955–1963';
l4.enquiry = 'Why did the nationalisation of the Suez Canal trigger a global crisis in 1956?';
l4.do_now = {
  type: 'questions',
  title: 'Recall & Retrieval (Lesson 3: 1948-49 War & Aftermath)',
  instructions: 'Answer these questions in full sentences based on your prior learning.',
  items: [
    {
      question:
        'What term do Palestinians use to describe the catastrophe of their expulsion and displacement in 1948?',
      answer: 'The Nakba (Catastrophe).',
    },
    {
      question: 'Approximately how many Palestinian Arabs became refugees during the 1948–49 War?',
      answer: 'Approximately 700,000 to 750,000 refugees.',
    },
    {
      question: 'What was the name of the de facto armistice boundary line drawn on maps in 1949?',
      answer: 'The Green Line.',
    },
    {
      question:
        'Which neighboring Arab kingdom annexed the West Bank and East Jerusalem following the 1948 War?',
      answer: 'Transjordan (Jordan).',
    },
    {
      question:
        'Which Arab nation retained administrative military control over the Gaza Strip after 1949?',
      answer: 'Egypt.',
    },
    {
      question:
        'What legislation passed by Israel in 1950 granted every Jewish person worldwide the legal right to immigrate to Israel?',
      answer: 'The Law of Return (1950).',
    },
    {
      question: 'What was the unified national army established by David Ben-Gurion in 1948?',
      answer: 'The Israeli Defence Forces (IDF).',
    },
    {
      question:
        'Which global superpower provided extensive financial loans and diplomatic backing to Israel in the early 1950s?',
      answer: 'The United States (USA).',
    },
    {
      question:
        'What was the decisive 4-week turning point in June 1948 that allowed Israel to rearm with Czech weapons?',
      answer: 'The First UN Truce.',
    },
    {
      question: 'Who served as Israel’s first Prime Minister from 1948 to 1953?',
      answer: 'David Ben-Gurion.',
    },
  ],
};
l4.exam_practice = {
  type: 'importance_8m',
  title: 'Paper 2 Exam Practice: Question 3 (Importance)',
  questions: [
    {
      marks: 8,
      type: 'importance',
      question:
        'Explain the importance of the Suez Crisis (1956) for regional tension in the Middle East.',
      prompt:
        'Explain two distinct reasons why the 1956 Suez Crisis was significant: (1) How it elevated Gamal Abdel Nasser into an untouchable Pan-Arab hero, and (2) How it introduced direct Cold War superpower rivalry between the USA and USSR into the region.',
      model: `The Suez Crisis of 1956 was of supreme importance for regional tension because it transformed Egyptian President Gamal Abdel Nasser into the undisputed leader of Pan-Arab nationalism and established direct Cold War superpower intervention in the Arab-Israeli conflict.

Firstly, the crisis was important because it resulted in a massive political triumph for Nasser, despite Egypt suffering a military defeat. Following Nasser’s nationalisation of the Suez Canal in July 1956, Britain, France, and Israel launched a coordinated tripartite invasion under the secret Protocol of Sèvres, capturing the Sinai Peninsula and Port Said. However, furious American opposition under President Eisenhower forced an immediate, humiliating Anglo-French withdrawal under threat of financial sanctions. Because Nasser stood up to the old European imperial powers and retained control of the canal, his political prestige soared across the Arab world. This emboldened Nasser to adopt an increasingly aggressive anti-Zionist stance, fostering military alliances with Syria (the United Arab Republic in 1958) and escalating cross-border fedayeen raids against Israel, which directly heightened the likelihood of future regional war.

Secondly, the crisis was important because it permanently replaced Britain and France with the Cold War superpowers as the dominant arbiters of Middle Eastern security. The total humiliation of Britain and France created a power vacuum that the Soviet Union and the United States quickly filled. The USSR had threatened rocket attacks against London and Paris during the crisis and subsequently financed Egypt's Aswan High Dam while providing vast shipments of modern MiG fighters and tanks to Egypt and Syria. In response, the US government formulated the Eisenhower Doctrine (1957), pledging American military and economic aid to any Middle Eastern state resisting communist aggression, and heavily aligning with Israel. Consequently, local Arab-Israeli border frictions became irrevocably entangled in the global Cold War confrontation, escalating future crises into potential global flashpoints.`,
    },
  ],
};

// LESSON 5: KT 2.1 The Six Day War 1967
const l5 = unit.lessons[4];
l5.title = 'KT 2.1: The Six Day War, June 1967';
l5.enquiry =
  'Why did the Six Day War break out and how did Israel achieve such a rapid military victory?';
l5.do_now = {
  type: 'questions',
  title: 'Recall & Retrieval (Key Topic 1: Birth of Israel & Suez)',
  instructions: 'Answer these questions in full sentences based on your prior learning.',
  items: [
    {
      question:
        'Who became President of Egypt in 1954 and emerged as the champion of Pan-Arab nationalism?',
      answer: 'Gamal Abdel Nasser.',
    },
    {
      question:
        'What vital waterway did Nasser nationalise on 26 July 1956, triggering an international invasion?',
      answer: 'The Suez Canal.',
    },
    {
      question: 'Which three nations secretly colluded at Sèvres in October 1956 to attack Egypt?',
      answer: 'Britain, France, and Israel.',
    },
    {
      question:
        'Why was Britain and France forced to halt their military operation in Egypt in November 1956?',
      answer:
        'US President Eisenhower threatened severe financial sanctions and currency devaluation.',
    },
    {
      question:
        'What international peacekeeping body was stationed in Sinai and Sharm el-Sheikh following the 1956 war?',
      answer: 'The United Nations Emergency Force (UNEF).',
    },
    {
      question: 'What was the political union formed between Egypt and Syria in 1958 called?',
      answer: 'The United Arab Republic (UAR).',
    },
    {
      question:
        'What Palestinian organisation was officially created at the Cairo Conference in 1964?',
      answer: 'The Palestine Liberation Organization (PLO).',
    },
    {
      question:
        'What narrow maritime strait controls Israel’s maritime access from Eilat to the Red Sea?',
      answer: 'The Straits of Tiran.',
    },
    {
      question:
        'What freshwater dispute escalated border clashes between Israel and Syria in the mid-1960s?',
      answer: 'Disputes over the River Jordan and Syrian attempts to divert its headwaters.',
    },
    {
      question:
        'Which global superpower became the primary military supplier and patron of Egypt and Syria by the 1960s?',
      answer: 'The Soviet Union (USSR).',
    },
  ],
};
l5.exam_practice = {
  type: 'consequence_4m',
  title: 'Paper 2 Exam Practice: Question 1 (Consequence)',
  questions: [
    {
      marks: 4,
      type: 'consequence',
      question:
        'Explain one consequence of Egypt closing the Straits of Tiran to Israeli shipping in May 1967.',
      prompt:
        'Structure your answer as 1 focused PEEL paragraph: (1) Identify a clear consequence, (2) Support with specific historical detail, (3) Explain how it triggered the Six Day War.',
      model: `One consequence of Egypt closing the Straits of Tiran in May 1967 was that it made an Israeli pre-emptive military strike inevitable.

On 22 May 1967, President Gamal Abdel Nasser expelled UN peacekeepers from Sinai, moved Egyptian troops to the fortress of Sharm el-Sheikh, and officially blockaded the Straits of Tiran to all Israeli shipping. Because the straits were Israel's only maritime corridor to the Red Sea, Asian trade, and vital crude oil supplies from Iran, Israel had repeatedly warned that any closure would be treated as an act of war (casus belli). Fearing that Arab armies were preparing a coordinated invasion to annihilate the state, the Israeli cabinet approved a pre-emptive strike, launching Operation Focus on 5 June 1967, which destroyed the Egyptian air force on the ground and initiated the Six Day War.`,
    },
  ],
};

// LESSON 6: KT 2.2 Aftermath of 1967 War & Palestinian Resistance
const l6 = unit.lessons[5];
l6.title = 'KT 2.2: The Aftermath of the 1967 War & The Rise of Palestinian Resistance';
l6.enquiry =
  'How did the Six Day War redraw the map of the Middle East and transform Palestinian resistance?';
l6.do_now = {
  type: 'questions',
  title: 'Recall & Retrieval (Lesson 5: The Six Day War)',
  instructions: 'Answer these questions in full sentences based on your prior learning.',
  items: [
    {
      question:
        'What was the codename of the surprise Israeli air strike that launched the Six Day War on 5 June 1967?',
      answer: 'Operation Focus.',
    },
    {
      question:
        'Approximately how many Egyptian combat aircraft were destroyed on the ground within the first three hours?',
      answer: 'Over 300 aircraft.',
    },
    {
      question:
        'Which four major territories did Israel capture and occupy during the Six Day War?',
      answer:
        'The Sinai Peninsula, Gaza Strip, West Bank (including East Jerusalem), and Golan Heights.',
    },
    {
      question:
        'From which country did Israel capture the West Bank and the Old City of Jerusalem in 1967?',
      answer: 'Jordan (Transjordan).',
    },
    {
      question: 'From which country did Israel capture the Golan Heights in 1967?',
      answer: 'Syria.',
    },
    {
      question: 'From which country did Israel capture the Sinai Peninsula and Gaza Strip in 1967?',
      answer: 'Egypt.',
    },
    {
      question:
        'What landmark United Nations Security Council Resolution was passed in November 1967 establishing the "land for peace" formula?',
      answer: 'UN Resolution 242.',
    },
    {
      question:
        'What were the "Three No\'s" agreed by Arab leaders at the Khartoum Summit in August 1967?',
      answer: 'No peace with Israel, no recognition of Israel, and no negotiations with Israel.',
    },
    {
      question:
        'Who was Israel’s Minister of Defense during the Six Day War who became an international icon of victory?',
      answer: 'Moshe Dayan.',
    },
    {
      question:
        'What Egyptian waterway was closed to international shipping from 1967 to 1975 due to sunken ships and Israeli occupation of its east bank?',
      answer: 'The Suez Canal.',
    },
  ],
};
l6.exam_practice = {
  type: 'narrative_8m',
  title: 'Paper 2 Exam Practice: Question 2 (Narrative Account)',
  questions: [
    {
      marks: 8,
      type: 'narrative',
      question:
        'Write a narrative account analysing Palestinian armed resistance in the years 1968–1972.\n\nYou may use the following in your answer:\n• The PFLP Dawson’s Field aircraft hijackings (1970)\n• Black September in Jordan (1970)\nYou must also use information of your own.',
      prompt:
        'Write 2 to 3 chronological paragraphs tracing: (1) The Battle of Karameh (1968) and Yasser Arafat taking control of the PLO, (2) The Dawson’s Field hijackings and the expulsion from Jordan during Black September (1970), and (3) The Munich Olympics massacre (1972) and Israeli retaliation.',
      model: `Following the catastrophic defeat of conventional Arab armies in the 1967 Six Day War, Palestinian leaders concluded that they could no longer rely on Arab states to liberate their homeland. In March 1968, Palestinian fighters fought off an Israeli armored raid at the Battle of Karameh in Jordan; although suffering heavy casualties, their fierce resistance was hailed across the Arab world as a moral victory. Consequently, thousands of volunteers joined guerrilla factions, and in February 1969, Yasser Arafat was elected Chairman of the Palestine Liberation Organization (PLO), transforming it into an independent militant movement operating as a 'state within a state' inside Jordan.

However, escalating militant actions by radical factions soon provoked a violent confrontation with the Jordanian monarchy. In September 1970, the Marxist Popular Front for the Liberation of Palestine (PFLP) hijacked four international airliners, landing three of them at Dawson’s Field in Jordan before blowing up the empty planes in front of global television cameras. This direct challenge to Jordanian sovereignty pushed King Hussein to act; on 16 September 1970, the Jordanian army launched an all-out military offensive known as 'Black September'. Over ten days of fierce urban combat, Jordanian forces crushed the Palestinian guerrillas, killing thousands and expelling the PLO leadership and fighters out of Jordan into southern Lebanon.

Driven out of Jordan and seeking to keep the Palestinian cause at the forefront of world attention, a covert extremist faction named 'Black September' adopted international terrorism. In September 1972, armed militants broke into the Olympic Village at the Munich Games, taking eleven Israeli athletes and coaches hostage. Following a disastrous rescue attempt by West German police at the Fürstenfeldbruck airfield, all eleven Israeli hostages, five terrorists, and one German police officer were killed. The Munich massacre shocked the international community and triggered an aggressive covert retaliation campaign by Israel’s Mossad (Operation 'Wrath of God'), ensuring that the cycle of violent terrorism and targeted state assassination deepened.`,
    },
  ],
};

// LESSON 7: KT 2.3 Yom Kippur War 1973
const l7 = unit.lessons[6];
l7.title = 'KT 2.3: Israel and Egypt: The War of Attrition and the Yom Kippur War, 1967–1973';
l7.enquiry = 'Why did the 1973 Yom Kippur War shatter the status quo in the Middle East?';
l7.do_now = {
  type: 'questions',
  title: 'Recall & Retrieval (Lesson 6: Occupied Territories & Resistance)',
  instructions: 'Answer these questions in full sentences based on your prior learning.',
  items: [
    {
      question:
        'What was the massive sand-wall fortification line built by Israel along the eastern bank of the Suez Canal after 1967 called?',
      answer: 'The Bar-Lev Line.',
    },
    {
      question: 'Who became Chairman of the Palestine Liberation Organization (PLO) in 1969?',
      answer: 'Yasser Arafat.',
    },
    {
      question:
        'What country expelled the PLO in September 1970 after international airline hijackings?',
      answer: 'Jordan (Transjordan).',
    },
    {
      question:
        'What tragic terrorist attack carried out by Black September in 1972 resulted in the murder of 11 Israeli athletes?',
      answer: 'The Munich Olympics massacre.',
    },
    {
      question:
        'What country became the new base of operations for the PLO after their expulsion from Jordan in 1970?',
      answer: 'Lebanon.',
    },
    {
      question:
        'Who succeeded Gamal Abdel Nasser as President of Egypt following Nasser’s death in September 1970?',
      answer: 'Anwar Sadat.',
    },
    {
      question:
        'What was the undeclared artillery and air duel fought between Egypt and Israel along the Suez Canal from 1968 to 1970 called?',
      answer: 'The War of Attrition.',
    },
    {
      question:
        'What formula was established by UN Resolution 242 demanding Israeli withdrawal in exchange for peace?',
      answer: '"Land for Peace".',
    },
    {
      question: 'What did the Arab Khartoum Resolution mean by the "Three No’s"?',
      answer: 'No peace, no recognition, and no negotiations with Israel.',
    },
    {
      question:
        'What strategic plateau did Israel capture from Syria in 1967 that protected northern Galilee?',
      answer: 'The Golan Heights.',
    },
  ],
};
l7.exam_practice = {
  type: 'importance_8m',
  title: 'Paper 2 Exam Practice: Question 3 (Importance)',
  questions: [
    {
      marks: 8,
      type: 'importance',
      question:
        'Explain the importance of the 1973 Yom Kippur War for relations between Israel and Egypt.',
      prompt:
        'Explain two distinct reasons why the 1973 war altered relations: (1) How it shattered Israel’s sense of invincibility and demonstrated Egyptian military competence, and (2) How it restored Egyptian pride, convincing Anwar Sadat and Israeli leaders that a diplomatic peace treaty was necessary.',
      model: `The 1973 Yom Kippur War was of fundamental importance for relations between Israel and Egypt because it shattered the psychological myth of Israeli invincibility and restored Egyptian national honor, creating the indispensable political conditions for subsequent peace negotiations.

Firstly, the war was important because it proved to Israeli military and political leaders that holding defensive territorial buffers like the Sinai Peninsula could not guarantee permanent security. On 6 October 1973, Egyptian forces launched a coordinated surprise assault across the Suez Canal (Operation Badr) on Yom Kippur, the holiest day in Judaism. Using high-pressure water cannons to blast breaches through the sand ramparts of the Bar-Lev Line, Egyptian infantry crossed the canal with portable anti-tank missiles (Sagger) and Soviet SAM air defense umbrellas, decimating initial Israeli armored counter-attacks and inflicting over 2,500 Israeli fatalities. Although the IDF ultimately mobilized and crossed back over the canal to encircle Egypt’s Third Army, the initial intelligence failure and heavy casualties traumatized Israeli society, forcing the resignations of Prime Minister Golda Meir and Moshe Dayan. This convinced Israeli leadership that relying purely on military superiority was unsustainable and that negotiated diplomacy with Egypt was essential.

Secondly, the war was important because it achieved Egyptian President Anwar Sadat’s primary strategic objective: restoring Egyptian national dignity and breaking the diplomatic deadlock. Ever since the humiliating catastrophe of 1967, Arab leaders felt unable to negotiate from a position of weakness. By successfully breaching the Bar-Lev Line and proving that Arab soldiers could execute a sophisticated military offensive, Sadat restored Egypt’s international standing and Arab self-respect. Furthermore, the accompanying Arab OPEC oil embargo created a global energy crisis that forced the United States to actively mediate in Middle Eastern diplomacy. Having restored his nation's pride through arms, Sadat possessed the domestic political security to make the historic leap toward bilateral diplomacy, which led directly to Henry Kissinger’s 'shuttle diplomacy', Sadat’s visit to Jerusalem in 1977, and the 1978 Camp David Accords.`,
    },
  ],
};

// LESSON 8: KT 3.1 Diplomatic Negotiations 1974-79
const l8 = unit.lessons[7];
l8.title = 'KT 3.1: Diplomatic Negotiations: From Shuttle Diplomacy to Camp David, 1974–1979';
l8.enquiry = 'How did historic enemies Egypt and Israel finally achieve a lasting peace treaty?';
l8.do_now = {
  type: 'questions',
  title: 'Recall & Retrieval (Key Topic 2: 1967-1973 Wars)',
  instructions: 'Answer these questions in full sentences based on your prior learning.',
  items: [
    {
      question:
        'On what Jewish holy day did Egypt and Syria launch their surprise attack in October 1973?',
      answer: 'Yom Kippur (The Day of Atonement).',
    },
    {
      question:
        'What weapon technology did Egyptian forces use to breach the sand ramparts of the Bar-Lev Line in 1973?',
      answer: 'High-pressure water cannons.',
    },
    {
      question:
        'What action taken by Arab oil-producing states (OPEC) during the 1973 war caused a global economic crisis?',
      answer:
        'An oil embargo cutting production and quadrupling oil prices to Western nations supporting Israel.',
    },
    {
      question:
        'Who was the US Secretary of State who pioneered "shuttle diplomacy" between Middle Eastern capitals in 1974–75?',
      answer: 'Henry Kissinger.',
    },
    {
      question:
        'In what year was the Suez Canal finally cleared and reopened to international commercial shipping?',
      answer: '1975.',
    },
    {
      question:
        'Who was the Egyptian President who stunned the world by flying to Jerusalem to address the Knesset in November 1977?',
      answer: 'Anwar Sadat.',
    },
    {
      question: 'Who was the right-wing Likud Prime Minister of Israel who negotiated with Sadat?',
      answer: 'Menachem Begin.',
    },
    {
      question:
        'What presidential retreat in Maryland hosted 13 days of intense secret negotiations brokered by US President Jimmy Carter in 1978?',
      answer: 'Camp David.',
    },
    {
      question:
        'What was the formal peace treaty signed on the White House lawn in March 1979 called?',
      answer: 'The Treaty of Washington (Egypt-Israel Peace Treaty).',
    },
    {
      question:
        'What territory did Israel agree to return entirely to Egyptian sovereignty under the 1979 treaty?',
      answer: 'The Sinai Peninsula.',
    },
  ],
};
l8.exam_practice = {
  type: 'consequence_4m',
  title: 'Paper 2 Exam Practice: Question 1 (Consequence)',
  questions: [
    {
      marks: 4,
      type: 'consequence',
      question:
        'Explain one consequence of the 1979 Egypt-Israel Peace Treaty (Treaty of Washington).',
      prompt:
        'Structure your answer as 1 focused PEEL paragraph: (1) Identify a clear consequence, (2) Support with specific historical detail, (3) Explain the impact on Egypt’s standing in the Arab world or regional war.',
      model: `One consequence of the 1979 Egypt-Israel Peace Treaty was the total diplomatic isolation of Egypt within the Arab world.

Signed by President Anwar Sadat and Prime Minister Menachem Begin on 26 March 1979, the treaty formally ended thirty years of war between Israel and its most powerful Arab neighbor, returning the Sinai Peninsula to Egypt in exchange for full diplomatic recognition and demilitarisation. However, other Arab states and the PLO viewed Sadat’s separate bilateral peace as a treacherous betrayal of the Palestinian cause, because it failed to secure Palestinian statehood. Consequently, the Arab League voted unanimously to suspend Egypt's membership and move its headquarters out of Cairo, while most Arab nations severed diplomatic and trade relations with Egypt. This intense fury also ignited domestic Islamist extremism inside Egypt, culminating in Sadat's assassination by members of Egyptian Islamic Jihad during a military parade in October 1981.`,
    },
  ],
};

// LESSON 9: KT 3.2 Palestinian Issue, Lebanon & First Intifada
const l9 = unit.lessons[8];
l9.title =
  'KT 3.2: The Palestinian Issue: Lebanon, Sabra & Shatila, and the First Intifada, 1974–1993';
l9.enquiry =
  'How did the First Intifada fundamentally alter the nature of the Palestinian struggle?';
l9.do_now = {
  type: 'questions',
  title: 'Recall & Retrieval (Lesson 8: Camp David & Diplomacy)',
  instructions: 'Answer these questions in full sentences based on your prior learning.',
  items: [
    {
      question:
        'What famous speech did Yasser Arafat deliver to the UN General Assembly in 1974 holding an olive branch and a freedom fighter’s gun?',
      answer: 'The "Olive Branch" speech.',
    },
    {
      question:
        'What was the name of the 1978 agreements negotiated by Carter, Sadat, and Begin in Maryland?',
      answer: 'The Camp David Accords.',
    },
    {
      question: 'What was the formal peace treaty signed between Egypt and Israel in March 1979?',
      answer: 'The Treaty of Washington (Egypt-Israel Peace Treaty).',
    },
    {
      question:
        'What territory did Israel return to Egypt in exchange for peace and demilitarisation?',
      answer: 'The Sinai Peninsula.',
    },
    {
      question:
        'How did the Arab League punish Egypt for signing a separate peace treaty with Israel in 1979?',
      answer: 'They expelled Egypt from the Arab League and cut diplomatic ties.',
    },
    {
      question: 'What happened to Egyptian President Anwar Sadat in October 1981?',
      answer: 'He was assassinated by Islamist army officers during a military parade in Cairo.',
    },
    {
      question: 'Which Israeli Defense Minister orchestrated the June 1982 invasion of Lebanon?',
      answer: 'Ariel Sharon.',
    },
    {
      question: 'What was the official codename for the 1982 Israeli invasion of Lebanon?',
      answer: 'Operation Peace for Galilee.',
    },
    {
      question:
        'What notorious massacre of Palestinian refugees took place in Beirut in September 1982 by Christian Phalangist militiamen?',
      answer: 'The Sabra and Shatila massacres.',
    },
    {
      question:
        'To which North African capital was Yasser Arafat and the PLO leadership evacuated in August 1982?',
      answer: 'Tunis (Tunisia).',
    },
  ],
};
l9.exam_practice = {
  type: 'narrative_8m',
  title: 'Paper 2 Exam Practice: Question 2 (Narrative Account)',
  questions: [
    {
      marks: 8,
      type: 'narrative',
      question:
        'Write a narrative account analysing the escalation of the Palestinian conflict in the years 1982–1988.\n\nYou may use the following in your answer:\n• The Israeli invasion of Lebanon (1982)\n• The outbreak of the First Intifada (1987)\nYou must also use information of your own.',
      prompt:
        'Write 2 to 3 chronological paragraphs tracing: (1) The 1982 Lebanon War and Sabra & Shatila, (2) The exile of the PLO to Tunis leaving occupied Palestinians feeling abandoned, and (3) The grassroots explosion of the First Intifada in Gaza in December 1987.',
      model: `In June 1982, Israeli Defense Minister Ariel Sharon launched 'Operation Peace for Galilee', sending armored columns across the northern border into Lebanon to eradicate PLO rocket emplacements and destroy Yasser Arafat's military infrastructure. However, Israeli forces pushed far beyond their declared 40-kilometer buffer zone, laying siege to the Lebanese capital of Beirut for three months with heavy aerial and artillery bombardment. In August 1982, under an American-brokered evacuation, Arafat and over 14,000 PLO fighters were forced into exile in distant Tunisia. Shortly after, Lebanese Christian Phalangist militiamen allied with Israel entered the Sabra and Shatila refugee camps, massacring between 800 and 2,000 Palestinian civilians while Israeli forces illuminated the night sky. The massacre sparked massive Israeli domestic protests, forcing Sharon to resign as Defense Minister.

With the PLO leadership stranded 1,500 miles away in Tunis, Palestinians living under military occupation in the West Bank and Gaza Strip grew increasingly disillusioned. Over twenty years since 1967, Israeli settlement construction expanded, water resources were diverted, and thousands of young Palestinians faced routine curfews, administrative detention, and checkpoint humiliation. Frustration intensified as Arab leaders met at the Amman Summit in November 1987 without making the Palestinian crisis a priority. This accumulated domestic rage created a volatile social environment ready to explode without external PLO direction.

The catalyst for open rebellion occurred on 8 December 1987 in the Jabalya refugee camp in Gaza, when an Israeli military truck crashed into civilian cars, killing four Palestinian laborers. Rumors spread that the crash was deliberate retaliation for the stabbing of an Israeli merchant. Spontaneous mass riots erupted across Gaza and quickly engulfed the entire West Bank, initiating the First Palestinian Intifada (Uprising). Characterized by civil disobedience, general strikes, boycotts of Israeli goods, and unarmed youths confronting Israeli tanks with stones and slingshots, the uprising was broadcast globally. Defense Minister Yitzhak Rabin's 'break their bones' policy of iron-fist policing alienated international public opinion, bringing the reality of military occupation to the center of world diplomacy and compelling both sides to reconsider armed conflict.`,
    },
  ],
};

// LESSON 10: KT 3.3 Attempts at a Solution, Oslo & Peace Accords
const l10 = unit.lessons[9];
l10.title = 'KT 3.3: Attempts at a Solution: From the Oslo Accords to Oslo II, 1988–1995';
l10.enquiry =
  'Why did the Oslo Accords bring historic hope for peace, yet fail to resolve the conflict?';
l10.do_now = {
  type: 'questions',
  title: 'Recall & Retrieval (Lesson 9: Lebanon & First Intifada)',
  instructions: 'Answer these questions in full sentences based on your prior learning.',
  items: [
    {
      question:
        'What Arabic term meaning "shaking off" refers to the grassroots Palestinian uprising that broke out in 1987?',
      answer: 'The Intifada (First Intifada).',
    },
    {
      question:
        'In which dense refugee camp in the Gaza Strip did the First Intifada begin in December 1987?',
      answer: 'The Jabalya refugee camp.',
    },
    {
      question:
        'What primary weapon did Palestinian youths use against Israeli soldiers that captured global media attention?',
      answer: 'Stones and slingshots.',
    },
    {
      question:
        'What significant concession did Yasser Arafat make in an official speech to the UN in Geneva in December 1988?',
      answer: 'He renounced terrorism and recognized Israel’s right to exist in peace.',
    },
    {
      question:
        'What major international war in 1991, prompted by Saddam Hussein’s invasion of Kuwait, reshaped Middle Eastern diplomacy?',
      answer: 'The Gulf War (First Gulf War).',
    },
    {
      question:
        'Why did the PLO lose financial and diplomatic backing from wealthy Gulf states like Kuwait and Saudi Arabia during the 1991 Gulf War?',
      answer: 'Yasser Arafat supported Iraqi dictator Saddam Hussein.',
    },
    {
      question:
        'What global historical event in 1991 stripped Syria and the PLO of their primary superpower sponsor and military weapons?',
      answer: 'The collapse of the Soviet Union (End of the Cold War).',
    },
    {
      question:
        'Who was elected Prime Minister of Israel in 1992 on a campaign pledge to pursue peace with the Palestinians?',
      answer: 'Yitzhak Rabin.',
    },
    {
      question:
        'In which European city did Israeli and Palestinian negotiators conduct secret talks in 1993?',
      answer: 'Oslo, Norway.',
    },
    {
      question:
        'What self-governing administrative body was established under the Oslo Accords to govern parts of the West Bank and Gaza?',
      answer: 'The Palestinian National Authority (PNA).',
    },
  ],
};
l10.exam_practice = {
  type: 'importance_8m',
  title: 'Paper 2 Exam Practice: Question 3 (Importance)',
  questions: [
    {
      marks: 8,
      type: 'importance',
      question:
        'Explain the importance of the Oslo Accords (1993) for attempts to achieve peace in the Middle East.',
      prompt:
        'Explain two distinct reasons why the 1993 Oslo Accords were significant: (1) The historic breakthrough of mutual recognition between Israel and the PLO creating the Palestinian Authority, and (2) How the failure to resolve core final-status issues (Jerusalem, refugees, settlements) provoked violent extremist opposition on both sides.',
      model: `The 1993 Oslo Accords (Declaration of Principles) were of monumental importance because they achieved an unprecedented political breakthrough of mutual recognition between Israelis and Palestinians, while simultaneously unleashing violent extremist resistance that ultimately derailed the peace process.

Firstly, the accords were important because they dismantled the long-standing taboo of mutual denial and established Palestinian self-governance. Signed on the White House lawn on 13 September 1993, Prime Minister Yitzhak Rabin and Chairman Yasser Arafat shook hands following months of secret negotiations in Norway. In the preceding Letters of Mutual Recognition, the PLO formally renounced terrorism and recognized Israel's sovereign right to exist, while Israel recognized the PLO as the legitimate representative of the Palestinian people. The agreement established a five-year interim timetable for Israeli military withdrawal from Gaza and Jericho, leading to the creation of the Palestinian National Authority (PNA) headed by Arafat. For the first time in modern history, Palestinians exercised autonomous administrative control over their own towns, schools, and police, providing a tangible diplomatic framework for a two-state solution.

Secondly, the accords were important because their deliberate postponement of the core 'final status' issues created profound disillusionment and empowered radical extremists who destroyed the momentum for peace. The negotiators intentionally deferred the hardest questions—the final status of Jerusalem, the right of return for 1948 refugees, the borders of an independent Palestinian state, and the dismantling of Jewish settlements—to future talks. This ambiguity allowed Israeli settlement expansion to accelerate in the West Bank under Oslo II (1995), convincing many Palestinians that the PNA was merely an enforcer of Israeli occupation. In response, Islamist militant groups like Hamas and Islamic Jihad launched a campaign of suicide bus bombings in Tel Aviv and Jerusalem to sabotage the accords. Simultaneously, extreme right-wing Israeli settlers accused Rabin of treason, culminating in Rabin’s assassination by an Israeli Jewish extremist, Yigal Amir, in November 1995. This tragic death shattered the moderate coalition in Israel and brought the Oslo peace process to a virtual standstill.`,
    },
  ],
};

console.log(
  '✅ Exam practice across all 10 lessons converted into the 3-lesson spiral ladder with Level 4 models.',
);

// -------------------------------------------------------------
// 3. WRITE OUT UPDATED DATA.JS
// -------------------------------------------------------------
const outputJs = `// Auto-generated Paper 2 Conflict in the Middle East Unit Data
const cme_new = ${JSON.stringify(unit, null, 2)};

export const unitData = cme_new;
export default cme_new;
`;

fs.writeFileSync(dataJsPath, outputJs, 'utf8');
console.log('🎉 Successfully overhauled units/cme_new/data.js!');
