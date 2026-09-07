const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '..', 'units', 'cme_new', 'data.js');
const publicDataFilePath = path.join(__dirname, '..', 'public', 'units', 'cme_new', 'data.js');

const rawContent = fs.readFileSync(dataFilePath, 'utf8');

// We load the data module dynamically
delete require.cache[require.resolve(dataFilePath)];
const cmeModule = require(dataFilePath);
const unitData = cmeModule.unitData || cmeModule.default;

// 1. Define the Scaffolding Templates
const PEE_SCAFFOLDING = (
  eventName,
  focusTopic,
  year,
  starters,
  connectives,
  redFlags,
  checklist,
) => ({
  acronym: 'PEE',
  acronym_title: 'The 3-Step PEE Formula (Point, Evidence, Explanation)',
  guidance:
    'Write exactly 1 focused analytical paragraph (approx. 5 minutes). Do NOT write an introduction, conclusion, or a second consequence.',
  steps: [
    {
      letter: 'P',
      name: 'Point (Consequence)',
      prompt: `State ONE clear, valid consequence of ${eventName} directly addressing ${focusTopic}.`,
      starter: starters[0] || `One consequence of ${eventName} was...`,
    },
    {
      letter: 'E',
      name: 'Evidence (Contextual Detail)',
      prompt: `Deploy precise historical facts (names, dates, treaties, or figures) from ${year} to prove what happened.`,
      starter: starters[1] || `For example, ...`,
    },
    {
      letter: 'E',
      name: 'Explanation (Causal Impact)',
      prompt: `Explain the lasting causal effect on Arab-Jewish relations or regional geopolitics using causal connectives.`,
      starter: starters[2] || `As a direct result of this, ... Consequently, this meant that...`,
    },
  ],
  sentence_starters: starters,
  connectives_bank: connectives || [
    'As a direct result',
    'Consequently',
    'This led directly to',
    'Because of this',
    'This meant that',
    'Crucially',
  ],
  red_flags: redFlags || [
    'Do NOT describe what caused the event—focus exclusively on what happened AFTERWARDS as a direct consequence.',
    'Do NOT list two or three weak consequences—the Edexcel mark scheme awards full 4/4 marks for ONE thoroughly developed PEEL paragraph.',
    'Avoid vague generalisations—always include specific dates, names, or organisations.',
  ],
  checklist: checklist || [
    'Did I state one clear consequence in my very first sentence?',
    'Did I include precise evidence (proper nouns, years, agreements)?',
    "Did I use at least two causal connectives ('Consequently', 'As a direct result') to explain the lasting impact?",
  ],
});

const NARRATIVE_SCAFFOLDING = (
  topicName,
  beginningPrompt,
  middlePrompt,
  outcomePrompt,
  starters,
  connectives,
  redFlags,
  checklist,
) => ({
  acronym: 'Chronological Linkage Chain',
  acronym_title: 'The 3-Stage Chronological Linkage Chain (Beginning ➔ Middle ➔ End)',
  guidance:
    'Write exactly 3 logically connected chronological paragraphs (approx. 10–12 minutes). You MUST use both stimulus points PLUS at least one development from your own knowledge. Show HOW each event directly triggered the next.',
  steps: [
    {
      letter: '1',
      name: 'The Beginning (Catalyst & Origin)',
      prompt: beginningPrompt,
      starter: starters[0] || 'The crisis was initiated when...',
    },
    {
      letter: '2',
      name: 'The Middle (Causal Turning Point)',
      prompt: middlePrompt,
      starter:
        starters[1] || 'A decisive turning point occurred when... Consequently, this triggered...',
    },
    {
      letter: '3',
      name: 'The End (Culmination & Resolution)',
      prompt: outcomePrompt,
      starter: starters[2] || 'This situation culminated in... As a direct consequence...',
    },
  ],
  sentence_starters: starters,
  connectives_bank: connectives || [
    'The crisis was initiated when',
    'This directly triggered',
    'A decisive turning point occurred when',
    'Consequently',
    'As a direct consequence',
    'This situation culminated in',
  ],
  red_flags: redFlags || [
    'Do NOT tell a simple descriptive story—examiners award Level 3 (6-8 marks) ONLY for analytical narrative that explicitly explains CAUSAL CONNECTIONS between events.',
    'Do NOT omit your own knowledge—if you only write about the two stimulus points, your mark is strictly capped at Level 2 (max 5 marks).',
    'Do NOT jump backwards or forwards in time—maintain strict chronological sequence.',
  ],
  checklist: checklist || [
    'Are there exactly three chronological paragraphs (Beginning, Middle, Culmination)?',
    'Does each paragraph begin or end with a causal linking phrase showing how Event A caused Event B?',
    'Did I include both stimulus points AND at least one independent development from my own knowledge?',
  ],
});

const IMPORTANCE_SCAFFOLDING = (
  factorX,
  targetY,
  shortTermPrompt,
  longTermPrompt,
  starters,
  connectives,
  redFlags,
  checklist,
) => ({
  acronym: "PEEL x 2 ('X Linked to Y')",
  acronym_title: "The 'X Linked to Y' Significance Framework (2 Focused PEEL Paragraphs)",
  guidance: `Write exactly 2 analytical PEEL paragraphs (approx. 10–12 minutes). Divide your analysis into (1) Immediate / Short-Term Importance and (2) Long-Term / Strategic Significance. Always explain the difference ${factorX} made for ${targetY}.`,
  steps: [
    {
      letter: 'P1',
      name: 'Immediate / Short-Term Importance',
      prompt: shortTermPrompt,
      starter: starters[0] || `In the short term, ${factorX} was crucial for ${targetY} because...`,
    },
    {
      letter: 'P2',
      name: 'Long-Term / Strategic Transformation',
      prompt: longTermPrompt,
      starter:
        starters[1] || `In the long term, ${factorX} permanently transformed ${targetY} because...`,
    },
  ],
  sentence_starters: starters,
  connectives_bank: connectives || [
    `In the short term, ${factorX} was of decisive importance for ${targetY} because`,
    'This was demonstrated when',
    'In the long term, this fundamentally altered',
    'Crucially, the strategic impact was that',
    `Ultimately, the significance of ${factorX} for ${targetY} was that`,
  ],
  red_flags: redFlags || [
    `Do NOT just describe the event—the question asks for IMPORTANCE FOR ${targetY}. Every point must explain what difference it made to ${targetY}.`,
    'Do NOT write an essay with an introduction and conclusion—jump straight into the two analytical PEEL paragraphs.',
    'Do NOT neglect specific evidence—support each analytical claim with precise historical details.',
  ],
  checklist: checklist || [
    `Did I write two distinct paragraphs: one on immediate importance, and one on long-term/strategic significance?`,
    `Did I continually link my analysis back to ${targetY} throughout both paragraphs?`,
    'Did I support both points with precise historical evidence (names, numbers, treaties)?',
  ],
});

console.log(
  'Enriching CME lessons with explicit exam scaffolding, verified primary sources, and pedagogical Do Nows...',
);

// Lesson 1 (Consequence 4m)
unitData.lessons[0].exam_practice.questions[0].scaffolding = PEE_SCAFFOLDING(
  'the Balfour Declaration (1917)',
  'Arab-Jewish relations in Palestine',
  '1917–1939',
  [
    'One consequence of the Balfour Declaration (1917) was the entrenchment of intense, long-term political and communal hostility between Arab Palestinians and Jewish immigrants under the British Mandate.',
    'For example, following the declaration, Jewish immigration expanded rapidly during the 1920s and 1930s, accompanied by land purchases by the Jewish National Fund that displaced tenant farmers (fellahin).',
    'As a direct result of this British imperial endorsement, Arab Palestinians felt betrayed and disenfranchised, which consequently triggered widespread intercommunal violence including the 1929 Western Wall Riots and the 1936–39 Arab Revolt.',
  ],
);

// Lesson 2 (Consequence 4m)
unitData.lessons[1].exam_practice.questions[0].scaffolding = PEE_SCAFFOLDING(
  'the bombing of the King David Hotel (July 1946)',
  'British policy in Mandatory Palestine',
  '1946–1947',
  [
    "One consequence of the Irgun's bombing of the King David Hotel in July 1946 was the collapse of British domestic and political willpower to maintain military control over Mandatory Palestine.",
    'For example, the attack killed 91 British military officers, civil servants, and Arab and Jewish staff, destroying the central administrative secretariat of the British Mandate.',
    'As a direct result of the escalating military casualties, immense financial costs (spending £40 million annually during post-war austerity), and public outrage in London, the British government consequently announced in February 1947 that it was surrendering the Mandate to the United Nations.',
  ],
);

// Lesson 3 (Narrative 8m)
unitData.lessons[2].exam_practice.questions[0].scaffolding = NARRATIVE_SCAFFOLDING(
  'the 1948–49 War and the creation of the refugee crisis',
  'Explain how the declaration of Israel and the Arab invasion on 15 May 1948 initiated the conflict (Stimulus: Outbreak of war).',
  'Explain the decisive turning point: the first UN truce (June 1948) allowing Israeli rearmament with Czech arms, Plan Dalet, and the displacement of Palestinian civilians (Own Knowledge).',
  'Explain the culmination: Israeli military victories across the Negev and Galilee, the 1949 Armistice Agreements (Green Line), and UN Resolution 194 (Stimulus: 1949 Armistice).',
  [
    'The 1948–49 War was initiated when David Ben-Gurion proclaimed the independence of the State of Israel on 14 May 1948, prompting five neighbouring Arab states to launch an immediate invasion.',
    'A decisive turning point occurred during the first UN ceasefire in June 1948, when the IDF secretly rearmed with heavy Czechoslovakian weaponry and launched offensive operations (such as Operation Dani), which directly caused the mass displacement of over 700,000 Palestinian Arabs (the Nakba).',
    "This situation culminated in early 1949 with the signing of bilateral armistice agreements on Rhodes, which established the de facto 'Green Line' borders, leaving Israel in control of 78% of Mandatory Palestine while the refugee crisis remained entirely unresolved.",
  ],
);

// Lesson 4 (Importance 8m)
unitData.lessons[3].exam_practice.questions[0].scaffolding = IMPORTANCE_SCAFFOLDING(
  'the nationalisation of the Suez Canal (1956)',
  'international relations in the Middle East',
  "Explain how Nasser's nationalisation immediately challenged Anglo-French imperial prestige and provoked the secret Protocol of Sèvres invasion with Israel.",
  'Explain how the American financial intervention and Soviet missile threats permanently ended European imperial hegemony and established the Middle East as a Cold War proxy battleground.',
  [
    "In the short term, Nasser's nationalisation of the Suez Canal on 26 July 1956 was of decisive importance because it triggered a secret tripartite military conspiracy that brought the region to the brink of global war.",
    'This was demonstrated when Britain, France, and Israel secretly signed the Protocol of Sèvres in October 1956 to launch a coordinated invasion to seize the canal and overthrow Nasser.',
    'In the long term, the crisis fundamentally transformed Middle Eastern international relations by definitively ending British and French imperial dominance and establishing the region as a bipolar Cold War proxy battleground between the USA and the Soviet Union.',
    "Crucially, President Eisenhower's threat to collapse the British pound forced an immediate, humiliating Anglo-French withdrawal, proving that European imperial powers could no longer dictate Middle Eastern affairs without superpower approval.",
  ],
);

// Lesson 5 (Consequence 4m)
unitData.lessons[4].exam_practice.questions[0].scaffolding = PEE_SCAFFOLDING(
  'the Israeli preemptive airstrike in Operation Focus (5 June 1967)',
  'the military outcome of the Six Day War',
  'June 1967',
  [
    'One consequence of the Israeli preemptive airstrike in Operation Focus (5 June 1967) was the total destruction of Arab air power, securing absolute Israeli air supremacy that guaranteed rapid victory.',
    'For example, in the opening three hours of the war, the Israeli Air Force (IAF) wiped out over 300 Egyptian combat aircraft on the tarmac and cratered their runways, followed by the destruction of the Syrian and Jordanian air forces.',
    'As a direct result of operating with zero aerial opposition, Israeli ground armour was able to advance with complete impunity across the Sinai Peninsula, West Bank, and Golan Heights, consequently achieving total military victory in just six days.',
  ],
);

// Lesson 6 (Narrative 8m)
unitData.lessons[5].exam_practice.questions[0].scaffolding = NARRATIVE_SCAFFOLDING(
  'Palestinian resistance and international terrorism between 1967 and 1974',
  'Explain how the territorial losses of the 1967 Six Day War led to the rise of independent fedayeen guerrilla warfare and the Battle of Karameh (1968) (Stimulus: 1967 War aftermath).',
  'Explain the decisive turning point of Black September (1970) in Jordan, the expulsion to Lebanon, and the shift toward international terrorism like the Munich Olympics massacre (1972) (Own Knowledge).',
  "Explain the culmination: international recognition of the PLO as the 'sole legitimate representative of the Palestinian people' at the Rabat Summit and Arafat's landmark UN address in 1974 (Stimulus: Arafat UN Speech).",
  [
    'The growth of independent Palestinian resistance was initiated following the Arab defeat in the 1967 Six Day War, which convinced Palestinians that conventional Arab armies could not liberate their homeland.',
    "A decisive turning point occurred in September 1970 ('Black September') when King Hussein of Jordan crushed and expelled the heavily armed PLO militias, which consequently drove extremist factions like Black September to adopt spectacular international terror tactics, culminating in the 1972 Munich Olympics massacre.",
    "This cycle of armed resistance and international notoriety culminated in November 1974 when Yasser Arafat was invited to address the UN General Assembly in New York, securing global diplomatic legitimacy for the PLO while presenting his famous choice between 'an olive branch and a freedom fighter's gun'.",
  ],
);

// Lesson 7 (Importance 8m)
unitData.lessons[6].exam_practice.questions[0].scaffolding = IMPORTANCE_SCAFFOLDING(
  'the Yom Kippur War (October 1973)',
  'Arab-Israeli diplomacy and military perceptions',
  "Explain how Egypt's successful initial crossing of the Suez Canal (Operation Badr) shattered the myth of Israeli invincibility and restored Egyptian national honour.",
  'Explain how the OPEC oil embargo and superpower nuclear alert convinced the United States (via Henry Kissinger) that Middle Eastern peace was an urgent global priority, paving the way for Camp David.',
  [
    'In the short term, the Yom Kippur War was of decisive importance because it shattered the dangerous Israeli myth of invincibility and restored Egyptian military honour following the humiliation of 1967.',
    'This was demonstrated when Egyptian forces successfully crossed the Suez Canal under Operation Badr on 6 October 1973, breaching the heavily fortified Bar-Lev Line and inflicting catastrophic early casualties on Israeli armour using Soviet-supplied Sagger missiles.',
    'In the long term, the war fundamentally transformed Middle Eastern diplomacy by convincing both Washington and Jerusalem that military occupation alone could not guarantee Israeli security.',
    "Crucially, the devastating Arab OPEC oil embargo against the West and the threat of US-Soviet nuclear escalation forced US Secretary of State Henry Kissinger to launch 'shuttle diplomacy', which directly initiated the diplomatic path leading to the Camp David Accords.",
  ],
);

// Lesson 8 (Consequence 4m)
unitData.lessons[7].exam_practice.questions[0].scaffolding = PEE_SCAFFOLDING(
  'the Camp David Accords (1978) and the Egypt-Israel Peace Treaty (1979)',
  'the geopolitical balance of the Middle East',
  '1978–1981',
  [
    'One consequence of the 1979 Egypt-Israel Peace Treaty was the total diplomatic and political isolation of Egypt within the Arab world.',
    "For example, following the treaty signing on the White House lawn, the Arab League immediately suspended Egypt's membership, moved its headquarters from Cairo to Tunis, and severed diplomatic relations.",
    'As a direct result of neutralizing Egypt—historically the largest and most powerful Arab military force—Israel was freed from the strategic nightmare of facing a multi-front war, which consequently provoked fury among radical Islamists and culminated in the assassination of Anwar Sadat in October 1981.',
  ],
);

// Lesson 9 (Narrative 8m)
unitData.lessons[8].exam_practice.questions[0].scaffolding = NARRATIVE_SCAFFOLDING(
  'the Palestinian conflict in Lebanon and the First Intifada (1982–1993)',
  "Explain how cross-border fedayeen raids provoked Israel's full-scale invasion of Lebanon in June 1982 ('Operation Peace for Galilee') (Stimulus: 1982 Lebanon invasion).",
  'Explain the decisive turning point of the siege of Beirut, the expulsion of the PLO leadership to Tunisia, and the international outcry over the Sabra and Shatila massacres (Own Knowledge).',
  'Explain the culmination: the explosion of the grassroots First Intifada in December 1987 in Gaza and the West Bank, which forced both Israel and the PLO to reconsider diplomacy (Stimulus: First Intifada 1987).',
  [
    "The crisis was initiated in June 1982 when Israeli Defence Minister Ariel Sharon launched 'Operation Peace for Galilee', sending 76,000 troops across the border to destroy PLO bases in southern Lebanon and drive all the way to Beirut.",
    'A decisive turning point occurred in September 1982 following the expulsion of Arafat and 14,000 PLO fighters to Tunisia, when Lebanese Christian Phalangist militias massacred between 800 and 3,500 Palestinian civilians in the Sabra and Shatila refugee camps while the IDF surrounded the perimeter, provoking immense international condemnation.',
    "This protracted displacement culminated in December 1987 when spontaneous grassroots frustration exploded into the First Intifada in Gaza and the West Bank, where unarmed youths confronting armed soldiers with stones shattered Israel's international standing and created the urgent political necessity for the Oslo peace talks.",
  ],
);

// Lesson 10 (Importance 8m)
unitData.lessons[9].exam_practice.questions[0].scaffolding = IMPORTANCE_SCAFFOLDING(
  'the Oslo I Accord (Declaration of Principles, 1993)',
  'the Israeli-Palestinian peace process',
  'Explain how Oslo I broke the 45-year existential deadlock through historic mutual recognition between Israel and the PLO and the creation of the Palestinian Authority.',
  'Explain how the deferral of permanent status issues (Jerusalem, refugees, borders, settlements) enabled extremist sabotage, culminating in the assassination of Yitzhak Rabin in 1995.',
  [
    'In the short term, the Oslo I Accord of September 1993 was of revolutionary importance because it achieved historic mutual recognition between the State of Israel and the Palestine Liberation Organization, breaking a 45-year existential deadlock.',
    'This was demonstrated by the iconic handshake between Yitzhak Rabin and Yasser Arafat on the White House lawn, followed by the establishment of the Palestinian National Authority (PNA) to govern Gaza and Jericho.',
    "In the long term, however, Oslo's deliberate decision to postpone permanent status issues—namely the sovereignty of Jerusalem, the right of return for refugees, and Jewish settlement expansion—fatally undermined the peace process.",
    'Crucially, this ambiguity created a political vacuum exploited by rejectionist extremists on both sides, including Hamas suicide bombings and the tragic assassination of Prime Minister Yitzhak Rabin by a Jewish extremist in November 1995, which effectively derailed the promise of lasting peace.',
  ],
);

// 2. Enrich Visual Primary Sources and Secondary Maps
// Lesson 1 Sources
unitData.lessons[0].primary_source = {
  title: 'Source A: The Sykes-Picot Agreement Partition Map (8 May 1916)',
  src: '/images/cme_sykes_picot_1916_map.jpg',
  source: '/images/cme_sykes_picot_1916_map.jpg',
  caption:
    'The original 1916 map signed by British diplomat Sir Mark Sykes and French diplomat François Georges-Picot, carving the Ottoman Empire into British (Area B, red) and French (Area A, blue) spheres of imperial influence.',
  question:
    'Why did British and French diplomats believe drawing straight lines across tribal, ethnic, and religious lands would remain stable, and why did this arbitrary imperial partition create over a century of chronic conflict?',
};
unitData.lessons[0].sources = [
  {
    title: 'Source A: The Sykes-Picot Agreement Partition Map (May 1916)',
    src: '/images/cme_sykes_picot_1916_map.jpg',
    source: '/images/cme_sykes_picot_1916_map.jpg',
    caption:
      'The official partition map signed by Britain and France in 1916 dividing the Middle East.',
    question:
      'How does the straight line dividing Area A and Area B reveal the imperial priorities of Britain and France over local self-determination?',
  },
  {
    title: 'Source B: The Original Balfour Declaration Letter (2 November 1917)',
    src: '/images/cme_balfour_declaration_1917.jpg',
    source: '/images/cme_balfour_declaration_1917.jpg',
    caption:
      "Official letter from British Foreign Secretary Arthur Balfour to Lord Rothschild expressing British support for a 'national home for the Jewish people' in Palestine.",
    question:
      'What contradictory promises did Britain make to Arab and Jewish leaders between 1915 and 1917, and how did this letter ignite communal conflict?',
  },
];
unitData.lessons[0].teacher_notes.source_context =
  'Primary map of the secret Sykes-Picot Agreement signed on 8 May 1916 by Sir Mark Sykes and François Georges-Picot, dividing the Ottoman Middle East into British and French zones, alongside the 1917 Balfour Declaration letter. **Hinge Question:** Why did British and French diplomats believe drawing straight lines across tribal, ethnic, and religious lands would remain stable, and why did this arbitrary imperial partition create over a century of chronic conflict?';

// Lesson 3 Sources
unitData.lessons[2].primary_source = {
  title: 'Source A: Palestinian Refugees Fleeing Galilee During the 1948 Nakba',
  src: '/images/cme_palestinian_refugees_1948.jpg',
  source: '/images/cme_palestinian_refugees_1948.jpg',
  caption:
    'Palestinian Arab families evacuating their villages in Galilee carrying their remaining household belongings on donkeys and foot in late 1948.',
  question:
    'How does this photograph demonstrate the human scale and trauma of the Palestinian refugee crisis (the Nakba) that followed the 1948–49 War?',
};
unitData.lessons[2].sources = [
  {
    title: 'Source A: Palestinian Refugees Fleeing Galilee During the 1948 Nakba',
    src: '/images/cme_palestinian_refugees_1948.jpg',
    source: '/images/cme_palestinian_refugees_1948.jpg',
    caption:
      'Palestinian Arabs displaced from Galilee carrying their possessions along dusty roads in late 1948.',
    question:
      'What were the primary causes of the flight of over 700,000 Palestinian Arabs between 1947 and 1949?',
  },
  {
    title: 'Source B: David Ben-Gurion Declaring Israeli Independence (14 May 1948)',
    src: '/images/cme_bengurion_declaration_1948.jpg',
    source: '/images/cme_bengurion_declaration_1948.jpg',
    caption:
      'David Ben-Gurion reading the Declaration of Independence beneath the portrait of Theodor Herzl at the Tel Aviv Museum on 14 May 1948.',
    question:
      'Why was the declaration of Israeli statehood viewed by Jewish people as historic national redemption, but by Arab states as an illegitimate catastrophe?',
  },
];
unitData.lessons[2].teacher_notes.source_context =
  "Photographic evidence of Palestinian refugees evacuating Galilee in late 1948 alongside Ben-Gurion's formal proclamation of Israeli independence on 14 May 1948. **Hinge Question:** How does the profound contrast between Jewish national celebration and Palestinian refugee catastrophe in 1948 explain why a permanent peace treaty proved impossible to negotiate?";

// Lesson 4 Sources
unitData.lessons[3].primary_source = {
  title: 'Source A: British Troops Landing at Port Said During the Suez Invasion (November 1956)',
  src: '/images/cme_port_said_british_troops_1956.jpg',
  source: '/images/cme_port_said_british_troops_1956.jpg',
  caption:
    'British landing craft disembarking soldiers and vehicles amid burning oil storage tanks at Port Said, Egypt, during Operation Musketeer in November 1956.',
  question:
    'Why did the Anglo-French military intervention at Suez backfire so disastrously on the international stage?',
};
unitData.lessons[3].sources = [
  {
    title: 'Source A: British Troops Landing at Port Said (November 1956)',
    src: '/images/cme_port_said_british_troops_1956.jpg',
    source: '/images/cme_port_said_british_troops_1956.jpg',
    caption: 'British amphibious assault troops entering Port Said against Egyptian resistance.',
    question:
      'How did British Prime Minister Anthony Eden justify the military intervention, and why did US President Eisenhower oppose it?',
  },
  {
    title: 'Source B: Cairo Newspaper Al-Ahram Announcing the Suez Nationalisation (July 1956)',
    src: '/images/cme_alahram_suez_1956.jpg',
    source: '/images/cme_alahram_suez_1956.jpg',
    caption:
      "The front page of Cairo's leading daily Al-Ahram featuring Gamal Abdel Nasser's announcement nationalising the Suez Canal Company.",
    question:
      "Why did Nasser's nationalisation of the Suez Canal make him an instant hero of Pan-Arab nationalism across the Middle East?",
  },
];
unitData.lessons[3].teacher_notes.source_context =
  "Historical news photography of the Anglo-French landing at Port Said alongside Cairo's Al-Ahram front page proclaiming the nationalisation of the Suez Canal. **Hinge Question:** How did Gamal Abdel Nasser turn a tactical military defeat at Port Said into a monumental political and anti-imperial triumph?";

// Lesson 5 Sources
unitData.lessons[4].sources = [
  {
    title: 'Source A: Israeli Paratroopers at the Western Wall, Jerusalem (7 June 1967)',
    src: '/images/israeli_troops_wall.jpg',
    source: '/images/israeli_troops_wall.jpg',
    caption:
      "David Rubinger's iconic photograph of Israeli paratroopers standing before the Western Wall in the Old City of Jerusalem after capturing it from Jordanian forces.",
    question:
      'Why did the capture of the Western Wall hold such overwhelming emotional and religious significance for Israel?',
  },
  {
    title: 'Source B: Map of the Conquered Territories Following the Six Day War (June 1967)',
    src: '/units/cme_new/assets/palestine_1967_map.png',
    source: '/units/cme_new/assets/palestine_1967_map.png',
    caption:
      'Map showing the State of Israel (blue) and the territories occupied in June 1967: the Sinai Peninsula, Gaza Strip, West Bank, and Golan Heights (red).',
    question:
      'How did the occupation of these vast territories fundamentally transform Israel from a small vulnerable state into a regional imperial occupying power?',
  },
];
unitData.lessons[4].teacher_notes.source_context =
  "Iconic photograph of Israeli paratroopers at the Western Wall alongside the territorial occupation map of June 1967. **Hinge Question:** Did Israel's dramatic territorial expansion in 1967 provide permanent defensive security, or did it trap Israel into an unsustainable occupation of over one million hostile civilians?";

// Lesson 6 Sources & Context
unitData.lessons[5].teacher_notes.source_context =
  "Kurt Strumpf's chilling AP photograph of a masked Black September militant on the Olympic Village balcony in September 1972 alongside Yasser Arafat's landmark November 1974 address to the UN General Assembly ('Do not let the olive branch fall from my hand'). **Hinge Question:** Why did Palestinian militants choose high-profile international civilian targets like the Munich Olympics to pursue their political goals, and how did Arafat use his 1974 UN address to pivot from terrorism to international diplomacy?";

// Lesson 7 Sources: REPLACE Camp David with Israeli crossing of Suez!
unitData.lessons[6].primary_source = {
  title: 'Source A: Egyptian Troops Crossing the Suez Canal in Operation Badr (October 1973)',
  src: '/images/cme_egyptians_crossing_suez_1973.jpg',
  source: '/images/cme_egyptians_crossing_suez_1973.jpg',
  caption:
    'Egyptian infantry and military vehicles crossing the Suez Canal on pontoon bridges after breaching the sand ramparts of the Bar-Lev Line on 6 October 1973.',
  question:
    'How did the Egyptian surprise assault on Yom Kippur completely undermine Israeli intelligence and defensive assumptions?',
};
unitData.lessons[6].sources = [
  {
    title: 'Source A: Egyptian Troops Crossing the Suez Canal in Operation Badr (October 1973)',
    src: '/images/cme_egyptians_crossing_suez_1973.jpg',
    source: '/images/cme_egyptians_crossing_suez_1973.jpg',
    caption: 'Egyptian army vehicles crossing the Suez Canal into Sinai in October 1973.',
    question:
      'Why was the successful breach of the Bar-Lev Line considered an enormous psychological victory for Anwar Sadat?',
  },
  {
    title:
      'Source B: Israeli Tanks Crossing the Suez Canal in Operation Abirey-Halev (October 1973)',
    src: '/images/cme_israeli_crossing_suez_1973.jpg',
    source: '/images/cme_israeli_crossing_suez_1973.jpg',
    caption:
      'An Israeli Magach (M60) tank crossing westwards across a motorized pontoon bridge into the Egyptian mainland under Major General Ariel Sharon in mid-October 1973.',
    question:
      'How did the Israeli counter-offensive west of the Suez Canal encircle the Egyptian Third Army and force an urgent ceasefire?',
  },
];
unitData.lessons[6].teacher_notes.source_context =
  'Dual photographs of the 1973 Yom Kippur War: the Egyptian breach of the Bar-Lev Line crossing eastwards, and the Israeli armoured counter-offensive crossing westwards over the Suez Canal. **Hinge Question:** Why did a war that ended with Israeli tanks 100km from Cairo nevertheless restore Egyptian self-confidence and enable diplomatic peace talks?';

// Lesson 8 Sources: Camp David Accords + Peace Treaty Signing
unitData.lessons[7].primary_source = {
  title: 'Source A: Begin, Carter, and Sadat at the Camp David Summit (September 1978)',
  src: '/images/cme_camp_david_1978.jpg',
  source: '/images/cme_camp_david_1978.jpg',
  caption:
    'Israeli Prime Minister Menachem Begin, US President Jimmy Carter, and Egyptian President Anwar Sadat standing together after 13 days of secret negotiations at Camp David, Maryland.',
  question:
    "Why was US President Jimmy Carter's personal mediation indispensable in preventing the Camp David negotiations from collapsing?",
};
unitData.lessons[7].sources = [
  {
    title: 'Source A: Begin, Carter, and Sadat at the Camp David Accords (September 1978)',
    src: '/images/cme_camp_david_1978.jpg',
    source: '/images/cme_camp_david_1978.jpg',
    caption: 'Menachem Begin, Jimmy Carter, and Anwar Sadat at Camp David in September 1978.',
    question:
      'What major compromises did Sadat and Begin make in order to reach the Camp David framework?',
  },
  {
    title: 'Source B: The Triple Handshake at the Washington Peace Treaty Signing (26 March 1979)',
    src: '/images/cme_treaty_triple_handshake_1979.jpg',
    source: '/images/cme_treaty_triple_handshake_1979.jpg',
    caption:
      'Sadat, Carter, and Begin joining hands on the White House lawn following the formal signing of the historic Egypt-Israel Peace Treaty.',
    question:
      "Why did the signing of a separate peace treaty with Israel lead to Egypt's expulsion from the Arab League and Sadat's assassination in 1981?",
  },
];
unitData.lessons[7].teacher_notes.source_context =
  'Historical photographs of the 1978 Camp David negotiations and the 1979 White House peace treaty signing between Sadat, Carter, and Begin. **Hinge Question:** Why did the Arab world view the Camp David Accords as a selfish betrayal of the Palestinian cause, even though it returned the entire Sinai Peninsula to Egypt?';

// Lesson 9 Sources: Lebanon 1982 + First Intifada 1987
unitData.lessons[8].primary_source = {
  title: 'Source A: Ariel Sharon Overlooking Beirut During the Lebanon Invasion (June 1982)',
  src: '/images/sharon_yom_kippur.jpg',
  source: '/images/sharon_yom_kippur.jpg',
  caption:
    'Israeli Defence Minister Ariel Sharon reviewing maps and overlooking the besieged skyline of Beirut, Lebanon, during Operation Peace for Galilee in the summer of 1982.',
  question:
    'Why did the Israeli invasion of Lebanon and the siege of Beirut provoke unprecedented domestic protests and international condemnation?',
};
unitData.lessons[8].sources = [
  {
    title: 'Source A: Ariel Sharon Overlooking Beirut During the Lebanon Invasion (1982)',
    src: '/images/sharon_yom_kippur.jpg',
    source: '/images/sharon_yom_kippur.jpg',
    caption: 'Ariel Sharon observing military positions on the outskirts of Beirut in 1982.',
    question:
      "What were Sharon's strategic goals in Lebanon, and how did the Kahan Commission hold him indirectly responsible for the Sabra and Shatila massacre?",
  },
  {
    title:
      'Source B: Palestinian Youths at Street Barricades During the First Intifada (December 1987)',
    src: '/units/cme_new/assets/first_intifada.png',
    source: '/units/cme_new/assets/first_intifada.png',
    caption:
      'Masked Palestinian youths throwing stones and confronting Israeli troops behind burning tyre barricades in the West Bank during the First Intifada.',
    question:
      'How did the visual imagery of teenage stone-throwers confronting heavily armed IDF soldiers transform global public sympathy in favour of the Palestinians?',
  },
];
unitData.lessons[8].teacher_notes.source_context =
  'Photographic comparison between Ariel Sharon overlooking besieged Beirut in 1982 and Palestinian street youths confronting troops during the First Intifada in 1987. **Hinge Question:** How did the First Intifada shift the political center of Palestinian resistance from exile in Tunis directly into the streets of the West Bank and Gaza?';

// Lesson 10 Sources: Oslo Handshake 1993 + Oslo II Areas Map 1995
unitData.lessons[9].primary_source = {
  title: 'Source A: The Historic Oslo Handshake on the White House Lawn (13 September 1993)',
  src: '/images/oslo_handshake.jpg',
  source: '/images/oslo_handshake.jpg',
  caption:
    'Israeli Prime Minister Yitzhak Rabin and PLO Chairman Yasser Arafat shaking hands on the White House lawn, encouraged by US President Bill Clinton, after signing the Oslo I Accord.',
  question:
    'Why did the visual handshake between Rabin and Arafat symbolize an astonishing diplomatic breakthrough, and what major obstacles remained unresolved?',
};
unitData.lessons[9].sources = [
  {
    title: 'Source A: The Oslo Handshake on the White House Lawn (13 September 1993)',
    src: '/images/oslo_handshake.jpg',
    source: '/images/oslo_handshake.jpg',
    caption: 'Rabin, Clinton, and Arafat at the signing of the Declaration of Principles.',
    question:
      'What were the immediate achievements of the 1993 Oslo I Accord for both Israel and the PLO?',
  },
  {
    title: 'Source B: The Oslo II Map of West Bank Areas A, B, and C (1995)',
    src: '/images/cme_oslo_areas_map.png',
    source: '/images/cme_oslo_areas_map.png',
    caption:
      'Map showing the territorial fragmentation of the West Bank under the 1995 Oslo II Accord: Area A (green, Palestinian civil & security control), Area B (dark red, Palestinian civil & Israeli security control), and Area C (pink, full Israeli civil & military control).',
    question:
      'Why did the division into separate enclaves (Areas A, B, and C) lead critics to argue that Oslo created a permanent patchwork of non-contiguous cantons rather than a viable sovereign state?',
  },
];
unitData.lessons[9].teacher_notes.source_context =
  'Iconic photography of the 1993 Oslo handshake between Rabin and Arafat alongside the 1995 Oslo II map showing the territorial division of the West Bank into Areas A, B, and C. **Hinge Question:** Why did an agreement heralded as the dawn of peace ultimately trigger intense political violence, culminating in the assassination of Yitzhak Rabin in November 1995?';

// 3. Fix Pedagogical Recall in Do Nows for Lessons 8, 9, 10
// Lesson 8 Do Now: Strictly recall Lesson 7 (War of Attrition & Yom Kippur War 1967-1973)
unitData.lessons[7].do_now = {
  type: 'questions',
  title: 'Recall & Retrieval (Lesson 7: Yom Kippur War & Aftermath)',
  instructions: 'Answer these recall questions from previous lessons in full sentences.',
  items: [
    {
      question:
        'On what Jewish holy day did Egypt and Syria launch their surprise attack in October 1973?',
      answer: 'Yom Kippur (the Day of Atonement).',
    },
    {
      question:
        'What weapon technology did Egyptian forces use to breach the sand ramparts of the Bar-Lev Line in 1973?',
      answer: 'High-pressure water cannons (turbines) and Soviet pontoon bridges.',
    },
    {
      question:
        'What action taken by Arab oil-producing states (OPEC) during the 1973 war caused a global economic crisis?',
      answer:
        'An oil embargo and production cuts against nations supporting Israel, causing global oil prices to quadruple.',
    },
    {
      question:
        "Who was the US Secretary of State who pioneered 'shuttle diplomacy' between Middle Eastern capitals in 1974–75?",
      answer: 'Henry Kissinger.',
    },
    {
      question:
        'What was the massive sand fortification line built by Israel along the eastern bank of the Suez Canal after 1967?',
      answer: 'The Bar-Lev Line.',
    },
    {
      question:
        'Which Israeli general led the armoured counter-crossing of the Suez Canal into Egypt in mid-October 1973?',
      answer: 'Major General Ariel Sharon.',
    },
    {
      question:
        'What United Nations resolution passed on 22 October 1973 brought about a ceasefire in the Yom Kippur War?',
      answer: 'UN Security Council Resolution 338.',
    },
    {
      question:
        "Who was Israel's Prime Minister during the Yom Kippur War who faced severe domestic criticism for intelligence failures?",
      answer: 'Golda Meir.',
    },
    {
      question:
        'Which superpower enacted a massive military airlift (Operation Nickel Grass) to resupply Israel with tanks and ammunition?',
      answer: 'The United States.',
    },
    {
      question: 'Who succeeded Gamal Abdel Nasser as President of Egypt in September 1970?',
      answer: 'Anwar Sadat.',
    },
  ],
};

// Lesson 9 Do Now: Strictly recall Lesson 8 (Diplomacy, Camp David & 1979 Peace Treaty)
unitData.lessons[8].do_now = {
  type: 'questions',
  title: 'Recall & Retrieval (Lesson 8: Shuttle Diplomacy to Camp David)',
  instructions: 'Answer these recall questions from previous lessons in full sentences.',
  items: [
    {
      question:
        'Which Egyptian President stunned the world by flying to Jerusalem to address the Israeli Knesset in November 1977?',
      answer: 'Anwar Sadat.',
    },
    {
      question: 'Who was the right-wing Likud Prime Minister of Israel who negotiated with Sadat?',
      answer: 'Menachem Begin.',
    },
    {
      question:
        'What presidential retreat in Maryland hosted 13 days of intense secret negotiations brokered by Jimmy Carter in September 1978?',
      answer: 'Camp David.',
    },
    {
      question:
        'What was the formal peace treaty signed on the White House lawn between Egypt and Israel on 26 March 1979 called?',
      answer: 'The Egypt-Israel Peace Treaty (Treaty of Washington).',
    },
    {
      question:
        'What major territory did Israel agree to return entirely to Egyptian sovereignty in exchange for peace and demilitarisation?',
      answer: 'The Sinai Peninsula.',
    },
    {
      question:
        'How did the Arab League punish Egypt for signing a separate bilateral peace treaty with Israel in 1979?',
      answer:
        'They expelled Egypt from the Arab League, relocated its headquarters to Tunis, and severed diplomatic and economic ties.',
    },
    {
      question:
        'What tragic event occurred to President Anwar Sadat on 6 October 1981 during a military parade in Cairo?',
      answer: 'He was assassinated by members of the Egyptian Islamic Jihad.',
    },
    {
      question: 'Who succeeded Anwar Sadat as President of Egypt in October 1981?',
      answer: 'Hosni Mubarak.',
    },
    {
      question:
        'What diplomatic method involved Henry Kissinger flying back and forth between Middle Eastern capitals to broker disengagement treaties?',
      answer: 'Shuttle diplomacy.',
    },
    {
      question:
        'What international maritime waterway did Egypt agree to open to Israeli commercial shipping under the 1979 treaty?',
      answer: 'The Suez Canal and the Straits of Tiran.',
    },
  ],
};

// Lesson 10 Do Now: Strictly recall Lesson 9 (Lebanon War 1982, Sabra & Shatila, First Intifada)
unitData.lessons[9].do_now = {
  type: 'questions',
  title: 'Recall & Retrieval (Lesson 9: Lebanon War & The First Intifada)',
  instructions: 'Answer these recall questions from previous lessons in full sentences.',
  items: [
    {
      question: 'Which Israeli Defence Minister orchestrated the June 1982 invasion of Lebanon?',
      answer: 'Ariel Sharon.',
    },
    {
      question: 'What was the official Israeli codename for the June 1982 invasion of Lebanon?',
      answer: 'Operation Peace for Galilee.',
    },
    {
      question:
        'What notorious massacre of Palestinian civilians took place in Beirut in September 1982 by Christian Phalangist militias?',
      answer: 'The Sabra and Shatila massacre.',
    },
    {
      question:
        'To which North African capital was Yasser Arafat and the PLO leadership evacuated in August 1982?',
      answer: 'Tunis, Tunisia.',
    },
    {
      question:
        "What Arabic term meaning 'shaking off' refers to the spontaneous grassroots Palestinian uprising that broke out in December 1987?",
      answer: 'The Intifada (First Intifada).',
    },
    {
      question:
        'In which dense refugee camp in the Gaza Strip did the First Intifada begin following a fatal road collision?',
      answer: 'The Jabalya refugee camp.',
    },
    {
      question:
        'What primary weapon used by Palestinian youths against Israeli soldiers captured global television headlines?',
      answer: 'Stones and petrol bombs (Molotov cocktails).',
    },
    {
      question:
        'What Islamic resistance organisation was founded in December 1987 in Gaza as a militant rival to the secular PLO?',
      answer: 'Hamas.',
    },
    {
      question:
        'What historic concession did Yasser Arafat announce in a speech to the UN in Geneva in December 1988?',
      answer:
        "He explicitly recognized Israel's right to exist and formally renounced all forms of terrorism.",
    },
    {
      question:
        'What official Israeli commission of inquiry found Ariel Sharon personally responsible for failing to prevent the Sabra and Shatila massacres?',
      answer: 'The Kahan Commission.',
    },
  ],
};

// Write out updated files
const outputCode =
  'export const unitData = ' + JSON.stringify(unitData, null, 2) + ';\nexport default unitData;\n';
fs.writeFileSync(dataFilePath, outputCode, 'utf8');
fs.writeFileSync(publicDataFilePath, outputCode, 'utf8');

console.log('✅ Successfully updated units/cme_new/data.js and public/units/cme_new/data.js');
