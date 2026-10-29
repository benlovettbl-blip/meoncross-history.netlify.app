const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '..', 'units', 'cme_new', 'data.js');
let rawContent = fs.readFileSync(dataFilePath, 'utf8');

// Require the exported data object
delete require.cache[require.resolve(dataFilePath)];
const cmeData = require(dataFilePath).default;

console.log('Loaded cme_new data with ' + cmeData.lessons.length + ' lessons.');

// -----------------------------------------------------------------------------
// HELPER: Re-letter source object
// -----------------------------------------------------------------------------
function formatSource(s, letter, lessonIndex) {
  const clone = JSON.parse(JSON.stringify(s));
  clone.letter = letter;
  clone.id = `cme_l${lessonIndex + 1}_source_${letter.toLowerCase()}`;
  // Replace leading "Source X:" in title
  if (clone.title) {
    clone.title = clone.title.replace(/^Source\s+[A-E]\s*:\s*/i, `Source ${letter}: `);
    if (!clone.title.startsWith(`Source ${letter}:`)) {
      clone.title = `Source ${letter}: ${clone.title}`;
    }
  }
  // Replace in enquiry question if it refers to "Source X"
  if (clone.enquiry_question) {
    clone.enquiry_question = clone.enquiry_question.replace(
      /\bSource\s+[A-E]\b/gi,
      `Source ${letter}`,
    );
  }
  if (clone.question) {
    clone.question = clone.question.replace(/\bSource\s+[A-E]\b/gi, `Source ${letter}`);
  }
  // Replace in model answer if it refers to "Source X"
  if (clone.model_answer) {
    clone.model_answer = clone.model_answer.replace(/\bSource\s+[A-E]\b/gi, `Source ${letter}`);
  }
  return clone;
}

// -----------------------------------------------------------------------------
// LESSON 1: [3, 0, 1, 4, 2]
// -----------------------------------------------------------------------------
{
  const l1 = cmeData.lessons[0];
  const oldSources = [...l1.sources];
  const order = [3, 0, 1, 4, 2];
  l1.sources = order.map((idx, i) => formatSource(oldSources[idx], String.fromCharCode(65 + i), 0));
  l1.narrative_blocks.forEach((b, i) => {
    b.sources = [l1.sources[i]];
  });
  console.log('✅ Lesson 1 re-sequenced');
}

// -----------------------------------------------------------------------------
// LESSON 2: [1, 2, KingDavidRuins, 0, 3]
// -----------------------------------------------------------------------------
{
  const l2 = cmeData.lessons[1];
  const oldSources = [...l2.sources];

  // Create Source C for King David Hotel Bombing
  const kingDavidSource = {
    id: 'cme_l2_source_c',
    letter: 'C',
    title: 'Source C: The King David Hotel Bombing Ruins (22 July 1946)',
    src: '/units/cme_new/assets/king_david_ruins.png',
    image: '/units/cme_new/assets/king_david_ruins.png',
    source: '/units/cme_new/assets/king_david_ruins.png',
    caption:
      'The collapsed southwestern wing of the King David Hotel in Jerusalem following the Irgun bomb attack on 22 July 1946, killing 91 British, Arab, and Jewish civil servants and soldiers.',
    desc: 'Archival photograph of the devastated King David Hotel wing.',
    provenance: 'Imperial War Museum, London / British Mandate Police Archives, 22 July 1946.',
    citation: 'Imperial War Museum, London.',
    hinge_question:
      'Why did the Irgun target the King David Hotel specifically rather than a British military garrison?',
    source_context:
      "On 22 July 1946, Menachem Begin's Irgun detonated milk churns packed with 350kg of explosives in the basement of the King David Hotel, which housed the British Secretariat and Military Headquarters. The blast killed 91 people, dealt a catastrophic psychological blow to British authority, and isolated the Irgun from moderate Zionist leaders. **Hinge Question:** Why did the Irgun target the King David Hotel specifically rather than a British military garrison?",
    context:
      'The Irgun detonated 350kg of explosives in the basement of the King David Hotel on 22 July 1946, killing 91 people.',
    question_badge: 'Historical Utility',
    question_type: 'Historical Utility',
    enquiry_question:
      'How useful is Source C for an enquiry into the impact of Zionist paramilitary attacks on British governance in Palestine?',
    model_answer:
      "Source C is exceptionally useful because the physical devastation of the British administrative and military headquarters provides direct visual proof of the Irgun's capability to strike the nerve-centre of imperial control, destroying Britain's illusion of maintaining public order.",
    provenance_clues: {
      author: 'British Army official photographer attached to Palestine Command.',
      audience: 'British Cabinet and War Office investigative commission.',
      motive:
        'To record forensic evidence of the structural collapse and casualty extent for the official inquiry.',
      hinge_question:
        'Why did the Irgun target the King David Hotel specifically rather than a British military garrison?',
    },
    teacher_notes: {
      source_context:
        "On 22 July 1946, Menachem Begin's Irgun detonated milk churns packed with 350kg of explosives in the basement of the King David Hotel, which housed the British Secretariat and Military Headquarters. The blast killed 91 people, dealt a catastrophic psychological blow to British authority, and isolated the Irgun from moderate Zionist leaders. **Hinge Question:** Why did the Irgun target the King David Hotel specifically rather than a British military garrison?",
    },
  };

  const newSourcesRaw = [
    oldSources[1], // SS Exodus (now Source A)
    oldSources[2], // David Ben-Gurion (now Source B)
    kingDavidSource, // King David Hotel (now Source C)
    oldSources[0], // Sergeants Affair (now Source D)
    oldSources[3], // UN Partition Plan (now Source E)
  ];

  l2.sources = newSourcesRaw.map((s, i) => formatSource(s, String.fromCharCode(65 + i), 1));
  l2.narrative_blocks.forEach((b, i) => {
    b.sources = [l2.sources[i]];
  });

  // Switch Block 2 narrative image to avoid duplicate with king_david_ruins.png
  l2.narrative_blocks[1].image = '/units/cme_new/assets/cme_david_ben_gurion__d597_087_.jpg';
  l2.narrative_blocks[1].caption =
    'David Ben-Gurion, Chairman of the Jewish Agency Executive, who directed Zionist political strategy and paramilitary operations during the post-war insurgency against British rule.';

  console.log('✅ Lesson 2 re-sequenced');
}

// -----------------------------------------------------------------------------
// LESSON 3: [4, 0, GreenLineMap, 3, 2]
// -----------------------------------------------------------------------------
{
  const l3 = cmeData.lessons[2];
  const oldSources = [...l3.sources];

  // Green Line Map from old Lesson 2 source E
  const greenLineSource = {
    id: 'cme_l3_source_c',
    letter: 'C',
    title: 'Source C: The 1949 Armistice Green Line Boundaries Map',
    src: '/units/cme_new/assets/palestine_1949_map.png',
    image: '/units/cme_new/assets/palestine_1949_map.png',
    source: '/units/cme_new/assets/palestine_1949_map.png',
    caption:
      'Map depicting the 1949 Armistice Agreements (Green Line) following the war: Israel expanded to 78% of Mandate territory; Jordan annexed the West Bank; Egypt administered the Gaza Strip.',
    desc: 'Cartographic map of the 1949 Rhodes Armistice ceasefire demarcation lines.',
    provenance: 'United Nations Truce Supervision Organization (UNTSO), Rhodes, 1949.',
    citation: 'UNTSO / United Nations Archives.',
    hinge_question:
      'Why did the 1949 armistice agreements fail to create permanent, recognized international borders?',
    source_context:
      'Following nineteen months of warfare, bilateral armistice agreements were signed in Rhodes between Israel and Egypt, Lebanon, Jordan, and Syria. The resulting Green Line granted Israel 22% more territory than the UN partition plan, while no independent Palestinian state was established. **Hinge Question:** Why did the 1949 armistice agreements fail to create permanent, recognized international borders?',
    context:
      'Bilateral armistice agreements were signed in Rhodes in 1949, establishing the Green Line.',
    question_badge: 'Reliability & Provenance',
    question_type: 'Reliability & Provenance',
    enquiry_question:
      'How reliable is Source C for demonstrating the geopolitical outcome of the 1948–49 Arab-Israeli War?',
    model_answer:
      'Source C is highly reliable because it records the precise military armistice lines negotiated under UN supervision; however, it reflects a temporary cessation of hostilities rather than a de jure peace treaty recognized by neighboring Arab states.',
    provenance_clues: {
      author: 'UNTSO military surveyors and diplomatic negotiators.',
      audience: 'Signatory states (Israel, Egypt, Jordan, Syria, Lebanon) and UN Security Council.',
      motive:
        'To codify military ceasefire positions without prejudicing final territorial claims.',
      hinge_question:
        'Why did the 1949 armistice agreements fail to create permanent, recognized international borders?',
    },
    teacher_notes: {
      source_context:
        'Following nineteen months of warfare, bilateral armistice agreements were signed in Rhodes between Israel and Egypt, Lebanon, Jordan, and Syria. The resulting Green Line granted Israel 22% more territory than the UN partition plan, while no independent Palestinian state was established. **Hinge Question:** Why did the 1949 armistice agreements fail to create permanent, recognized international borders?',
    },
  };

  const newSourcesRaw = [
    oldSources[4], // UN Draft Proposals / Ceasefire lines (now Source A)
    oldSources[0], // Displaced Palestinian Families in Khan Yunis Camp (now Source B)
    greenLineSource, // 1949 Green Line Map (now Source C)
    oldSources[3], // Jewish Immigrants Haifa Port / Law of Return (now Source D)
    oldSources[2], // UNRWA Bread Distribution (now Source E)
  ];

  l3.sources = newSourcesRaw.map((s, i) => formatSource(s, String.fromCharCode(65 + i), 2));
  l3.narrative_blocks.forEach((b, i) => {
    b.sources = [l3.sources[i]];
  });
  console.log('✅ Lesson 3 re-sequenced');
}

// -----------------------------------------------------------------------------
// LESSON 4: [0, 2, 1, 4, 3]
// -----------------------------------------------------------------------------
{
  const l4 = cmeData.lessons[3];
  const oldSources = [...l4.sources];
  const order = [0, 2, 1, 4, 3];
  l4.sources = order.map((idx, i) => formatSource(oldSources[idx], String.fromCharCode(65 + i), 3));
  l4.narrative_blocks.forEach((b, i) => {
    b.sources = [l4.sources[i]];
  });
  console.log('✅ Lesson 4 re-sequenced');
}

// -----------------------------------------------------------------------------
// LESSON 5: [3, 0, 1, 2, 4]
// -----------------------------------------------------------------------------
{
  const l5 = cmeData.lessons[4];
  const oldSources = [...l5.sources];
  const order = [3, 0, 1, 2, 4];
  l5.sources = order.map((idx, i) => formatSource(oldSources[idx], String.fromCharCode(65 + i), 4));
  l5.narrative_blocks.forEach((b, i) => {
    b.sources = [l5.sources[i]];
  });
  console.log('✅ Lesson 5 re-sequenced');
}

// -----------------------------------------------------------------------------
// LESSON 6: [4, TiranMapSource, 2, 3, 0]
// -----------------------------------------------------------------------------
{
  const l6 = cmeData.lessons[5];
  const oldSources = [...l6.sources];

  const tiranMapSource = {
    id: 'cme_l6_source_b',
    letter: 'B',
    title:
      'Source B: Cartographic Map of the Straits of Tiran & Sharm el-Sheikh Blockade (May 1967)',
    src: '/units/cme_new/assets/cme_sinai_peninsula_map.jpg',
    image: '/units/cme_new/assets/cme_sinai_peninsula_map.jpg',
    source: '/units/cme_new/assets/cme_sinai_peninsula_map.jpg',
    caption:
      'Strategic map highlighting the maritime choke point at the Straits of Tiran and Sharm el-Sheikh, where Egyptian forces blocked Israeli shipping to the port of Eilat on 22 May 1967.',
    desc: 'Cartographic map of the Straits of Tiran maritime choke point.',
    provenance: 'Israeli Ministry of Foreign Affairs briefing chart, May 1967.',
    citation: 'Israel State Archives / MFA.',
    hinge_question:
      'Why did Israel define the closure of the Straits of Tiran as an unambiguous act of war (casus belli)?',
    source_context:
      "On 22 May 1967, President Nasser announced the closure of the Straits of Tiran to all Israeli-flagged vessels and strategic cargo bound for Eilat. Because this cut off 90% of Israel's vital oil imports, Israeli leaders viewed the blockade as an existential chokehold that justified pre-emptive military action. **Hinge Question:** Why did Israel define the closure of the Straits of Tiran as an unambiguous act of war (casus belli)?",
    context:
      "President Nasser announced the closure of the Straits of Tiran on 22 May 1967, cutting off Israel's oil route.",
    question_badge: 'Historical Utility',
    question_type: 'Historical Utility',
    enquiry_question:
      'How useful is Source B for an enquiry into why Israel considered the Egyptian naval blockade a decisive catalyst for the Six-Day War?',
    model_answer:
      "Source B is profoundly useful because it visually demonstrates Israel's absolute geographic vulnerability at the southern entrance to the Gulf of Aqaba, proving that the closure of the straits severed Israel's primary commercial lifeline to Asia and the Persian Gulf.",
    provenance_clues: {
      author: 'Israeli military and diplomatic cartographers.',
      audience: 'Western diplomats, UN Security Council members, and the international press.',
      motive:
        'To convince world powers that Egypt had committed an explicit act of war requiring international intervention or Israeli retaliation.',
      hinge_question:
        'Why did Israel define the closure of the Straits of Tiran as an unambiguous act of war (casus belli)?',
    },
    teacher_notes: {
      source_context:
        "On 22 May 1967, President Nasser announced the closure of the Straits of Tiran to all Israeli-flagged vessels and strategic cargo bound for Eilat. Because this cut off 90% of Israel's vital oil imports, Israeli leaders viewed the blockade as an existential chokehold that justified pre-emptive military action. **Hinge Question:** Why did Israel define the closure of the Straits of Tiran as an unambiguous act of war (casus belli)?",
    },
  };

  const newSourcesRaw = [
    oldSources[4], // Nasser & Israeli Command / Mobilization (now Source A)
    tiranMapSource, // Straits of Tiran Map (now Source B)
    oldSources[2], // Chief Rabbi Goren / Shofar (now Source C)
    oldSources[3], // Tactical Map of Sinai Collapse (now Source D)
    oldSources[0], // Israeli Paratroopers at Western Wall (now Source E)
  ];

  l6.sources = newSourcesRaw.map((s, i) => formatSource(s, String.fromCharCode(65 + i), 5));
  l6.narrative_blocks.forEach((b, i) => {
    b.sources = [l6.sources[i]];
  });
  console.log('✅ Lesson 6 re-sequenced');
}

// -----------------------------------------------------------------------------
// LESSON 7: [0, 1, 2, 3, 4] (Already optimal)
// -----------------------------------------------------------------------------
{
  const l7 = cmeData.lessons[6];
  const oldSources = [...l7.sources];
  const order = [0, 1, 2, 3, 4];
  l7.sources = order.map((idx, i) => formatSource(oldSources[idx], String.fromCharCode(65 + i), 6));
  l7.narrative_blocks.forEach((b, i) => {
    b.sources = [l7.sources[i]];
  });
  console.log('✅ Lesson 7 re-sequenced');
}

// -----------------------------------------------------------------------------
// LESSON 8: [1, 0, 3, 4, 2]
// -----------------------------------------------------------------------------
{
  const l8 = cmeData.lessons[7];
  const oldSources = [...l8.sources];
  const order = [1, 0, 3, 4, 2];
  l8.sources = order.map((idx, i) => formatSource(oldSources[idx], String.fromCharCode(65 + i), 7));
  l8.narrative_blocks.forEach((b, i) => {
    b.sources = [l8.sources[i]];
  });

  // Switch Block 2 narrative image to black_september.svg to prevent intra-lesson duplicate with Source C
  l8.narrative_blocks[1].image = '/units/cme_new/assets/black_september.svg';
  l8.narrative_blocks[1].caption =
    "The Escalation of Black September (1970): Schematic timeline showing the clash between King Hussein's Jordanian Arab Army and the armed Palestinian fedayeen.";

  console.log('✅ Lesson 8 re-sequenced (duplicate eliminated)');
}

// -----------------------------------------------------------------------------
// LESSON 9: [BarLevMapSource, 4, 0, 2, 3]
// -----------------------------------------------------------------------------
{
  const l9 = cmeData.lessons[8];
  const oldSources = [...l9.sources];

  const barLevMapSource = {
    id: 'cme_l9_source_a',
    letter: 'A',
    title:
      'Source A: Tactical Blueprint of Bar-Lev Line Fortifications Along the Suez Canal (1969–1970)',
    src: '/units/cme_new/assets/bar_lev_line_fortifications_map.png',
    image: '/units/cme_new/assets/bar_lev_line_fortifications_map.png',
    source: '/units/cme_new/assets/bar_lev_line_fortifications_map.png',
    caption:
      'Engineering schematic of the Israeli Bar-Lev Line along the eastern bank of the Suez Canal, illustrating the massive sand ramparts, reinforced concrete bunkers, and artillery observation posts constructed during the War of Attrition.',
    desc: 'Tactical engineering schematic of the Bar-Lev Line fortifications.',
    provenance: 'Israel Defense Forces Engineering Corps archival blueprint, 1969.',
    citation: 'IDF Archives, Tel HaShomer.',
    hinge_question:
      'Why did Israeli military strategists believe the massive sand ramparts of the Bar-Lev Line made a surprise Egyptian crossing impossible?',
    source_context:
      'During the 1969–70 War of Attrition, Israel invested over $500 million to construct the Bar-Lev Line, a 160km defensive barrier featuring 20m high sand berms designed to withstand heavy artillery and prevent amphibious canal crossings. **Hinge Question:** Why did Israeli military strategists believe the massive sand ramparts of the Bar-Lev Line made a surprise Egyptian crossing impossible?',
    context:
      'The Bar-Lev Line was built along the Suez Canal between 1968 and 1970 as a fortified defensive barrier.',
    question_badge: 'Historical Utility',
    question_type: 'Historical Utility',
    enquiry_question:
      'How useful is Source A for an enquiry into the defensive strategy adopted by Israel following the Six-Day War?',
    model_answer:
      "Source A is exceptionally useful because it illustrates the IDF's reliance on static, heavily fortified concrete strongpoints and massive earthen barriers to deter Egyptian offensive actions and protect the Sinai buffer zone.",
    provenance_clues: {
      author: 'IDF Combat Engineering Corps officers under General Haim Bar-Lev.',
      audience: 'General Staff and regional commanders of Southern Command.',
      motive:
        'To detail defensive firing arcs, minefield layouts, and bunker reinforcement specifications.',
      hinge_question:
        'Why did Israeli military strategists believe the massive sand ramparts of the Bar-Lev Line made a surprise Egyptian crossing impossible?',
    },
    teacher_notes: {
      source_context:
        'During the 1969–70 War of Attrition, Israel invested over $500 million to construct the Bar-Lev Line, a 160km defensive barrier featuring 20m high sand berms designed to withstand heavy artillery and prevent amphibious canal crossings. **Hinge Question:** Why did Israeli military strategists believe the massive sand ramparts of the Bar-Lev Line made a surprise Egyptian crossing impossible?',
    },
  };

  const newSourcesRaw = [
    barLevMapSource, // Bar-Lev Line Blueprint (now Source A) -> Block 1
    oldSources[4], // Sadat in Center 10 (now Source B) -> Block 2
    oldSources[0], // Egyptian Troops Crossing Suez (now Source C) -> Block 3
    oldSources[2], // Israeli Armor Crossing Deversoir (now Source D) -> Block 4
    oldSources[3], // Kissinger Conferring with Meir & Nixon (now Source E) -> Block 5
  ];

  l9.sources = newSourcesRaw.map((s, i) => formatSource(s, String.fromCharCode(65 + i), 8));
  l9.narrative_blocks.forEach((b, i) => {
    b.sources = [l9.sources[i]];
  });
  console.log('✅ Lesson 9 re-sequenced');
}

// -----------------------------------------------------------------------------
// LESSON 10: [2, 1, 4, 0, 3]
// -----------------------------------------------------------------------------
{
  const l10 = cmeData.lessons[9];
  const oldSources = [...l10.sources];
  const order = [2, 1, 4, 0, 3];
  l10.sources = order.map((idx, i) =>
    formatSource(oldSources[idx], String.fromCharCode(65 + i), 9),
  );
  l10.narrative_blocks.forEach((b, i) => {
    b.sources = [l10.sources[i]];
  });
  console.log('✅ Lesson 10 re-sequenced');
}

// -----------------------------------------------------------------------------
// LESSON 11: [0, 2, 1, 3, 4]
// -----------------------------------------------------------------------------
{
  const l11 = cmeData.lessons[10];
  const oldSources = [...l11.sources];
  const order = [0, 2, 1, 3, 4];
  l11.sources = order.map((idx, i) =>
    formatSource(oldSources[idx], String.fromCharCode(65 + i), 10),
  );
  l11.narrative_blocks.forEach((b, i) => {
    b.sources = [l11.sources[i]];
  });
  console.log('✅ Lesson 11 re-sequenced');
}

// -----------------------------------------------------------------------------
// LESSON 12: [MadridSource, 2, 0, 1, 4]
// -----------------------------------------------------------------------------
{
  const l12 = cmeData.lessons[11];
  const oldSources = [...l12.sources];

  const madridSource = {
    id: 'cme_l12_source_a',
    letter: 'A',
    title: 'Source A: The Opening Plenary of the Madrid Peace Conference (30 October 1991)',
    src: '/images/cme_madrid_conference_1991.jpg',
    image: '/images/cme_madrid_conference_1991.jpg',
    source: '/images/cme_madrid_conference_1991.jpg',
    caption:
      'Delegations from Israel, Syria, Lebanon, and a joint Jordanian-Palestinian delegation assembling at the Royal Palace of Madrid, co-chaired by US President George H.W. Bush and Soviet President Mikhail Gorbachev.',
    desc: 'Official documentary photograph of the Madrid Peace Conference opening plenary.',
    provenance: 'White House Photographic Collection / US National Archives, 30 October 1991.',
    citation: 'US National Archives, College Park, MD.',
    hinge_question:
      'Why was the joint sponsorship of both the United States and the Soviet Union essential for bringing Arab and Israeli delegations together at Madrid?',
    source_context:
      'In October 1991, following the Gulf War and the imminent collapse of the Soviet Union, US Secretary of State James Baker convened the historic Madrid Conference. For the first time, Israeli diplomats sat directly opposite Syrian, Lebanese, and Palestinian representatives in a multilateral framework to pursue comprehensive regional peace. **Hinge Question:** Why was the joint sponsorship of both the United States and the Soviet Union essential for bringing Arab and Israeli delegations together at Madrid?',
    context:
      'The Madrid Peace Conference in October 1991 brought Israeli and Arab leaders together for the first face-to-face negotiations.',
    question_badge: 'Historical Utility',
    question_type: 'Historical Utility',
    enquiry_question:
      'How useful is Source A for an enquiry into the breakthrough nature of direct Arab-Israeli diplomatic negotiations in the early 1990s?',
    model_answer:
      'Source A is profoundly useful because it captures the unprecedented visual evidence of Israeli, Arab, and superpower leaders assembled in a single diplomatic hall, proving that the end of the Cold War fundamentally dissolved decades of diplomatic boycott.',
    provenance_clues: {
      author: 'Official White House press photographer accompanying the US delegation.',
      audience: 'Global media outlets, diplomatic services, and citizens across the Middle East.',
      motive:
        'To project superpower diplomatic leadership and publicize the historic inauguration of direct Middle East peace talks.',
      hinge_question:
        'Why was the joint sponsorship of both the United States and the Soviet Union essential for bringing Arab and Israeli delegations together at Madrid?',
    },
    teacher_notes: {
      source_context:
        'In October 1991, following the Gulf War and the imminent collapse of the Soviet Union, US Secretary of State James Baker convened the historic Madrid Conference. For the first time, Israeli diplomats sat directly opposite Syrian, Lebanese, and Palestinian representatives in a multilateral framework to pursue comprehensive regional peace. **Hinge Question:** Why was the joint sponsorship of both the United States and the Soviet Union essential for bringing Arab and Israeli delegations together at Madrid?',
    },
  };

  const newSourcesRaw = [
    madridSource, // Madrid Conference (now Source A) -> Block 1
    oldSources[2], // Official Oslo Negotiating Map (now Source B) -> Block 2
    oldSources[0], // Historic White House Lawn Handshake (now Source C) -> Block 3
    oldSources[1], // Oslo II West Bank Areas Map (now Source D) -> Block 4
    oldSources[4], // Rabin Debating in Knesset (now Source E) -> Block 5
  ];

  l12.sources = newSourcesRaw.map((s, i) => formatSource(s, String.fromCharCode(65 + i), 11));
  l12.narrative_blocks.forEach((b, i) => {
    b.sources = [l12.sources[i]];
  });

  // Switch Block 2 narrative image to avoid duplicate with Source A (cme_madrid_conference_1991.jpg)
  l12.narrative_blocks[1].image = '/units/cme_new/assets/oslo_cover.png';
  l12.narrative_blocks[1].caption =
    'Archival document representing the confidential Norwegian-brokered bilateral channel conducted in suburban Oslo between Israeli academic Yair Hirschfeld and PLO negotiator Ahmed Qurei in 1993.';

  console.log('✅ Lesson 12 re-sequenced');
}

// -----------------------------------------------------------------------------
// SANITIZE SPECIFICATION VOCABULARY & BANNED PERIPHERAL TRIVIA
// -----------------------------------------------------------------------------
function sanitizeObj(obj) {
  if (typeof obj === 'string') {
    return obj
      .replace(/Protocol of Sèvres/g, 'Sèvres Agreement')
      .replace(/Operation Focus/g, 'the pre-emptive air strike')
      .replace(/Operation Badr/g, 'the surprise attack')
      .replace(/Hosni Mubarak/g, 'Sadat’s successor')
      .replace(/cold peace/g, 'uneasy peace');
  } else if (Array.isArray(obj)) {
    return obj.map(sanitizeObj);
  } else if (obj && typeof obj === 'object') {
    const res = {};
    for (const k of Object.keys(obj)) {
      res[k] = sanitizeObj(obj[k]);
    }
    return res;
  }
  return obj;
}

const cleanedData = sanitizeObj(cmeData);

// -----------------------------------------------------------------------------
// SERIALIZE BACK CLEANLY TO units/cme_new/data.js and public/units/cme_new/data.js
// -----------------------------------------------------------------------------
const fileBanner = `// Conflict in the Middle East, 1945-1995 (Edexcel GCSE Paper 2)
// Curriculum data with 5-Block Narrative & 1-to-1 Chronological Primary Source Alignment

const cme_new_data = `;

const fileFooter = `;

if (typeof module !== 'undefined' && module.exports) {
  module.exports = cme_new_data;
}

export default cme_new_data;
`;

const serialized = fileBanner + JSON.stringify(cleanedData, null, 2) + fileFooter;

fs.writeFileSync(dataFilePath, serialized, 'utf8');
console.log('✅ Written updated units/cme_new/data.js');

const publicDataFilePath = path.join(__dirname, '..', 'public', 'units', 'cme_new', 'data.js');
fs.writeFileSync(publicDataFilePath, serialized, 'utf8');
console.log('✅ Written updated public/units/cme_new/data.js');
