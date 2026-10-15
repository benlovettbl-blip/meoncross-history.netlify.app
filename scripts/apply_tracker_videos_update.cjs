/**
 * scripts/apply_tracker_videos_update.cjs
 *
 * Ingests all newly identified and curated videos from lesson_tracker.md:
 * 1. great_war (all 5 enquiries + random videos for causes of WW1)
 * 2. medieval_england (all 5 lessons)
 * 3. early_modern_world (transatlantic slave trade)
 * 4. edexcel_medicine (RAMC/FANY)
 * 5. cme_new (KT1.1, KT2.1, KT2.3)
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Starting video injection from lesson_tracker.md...');

// ----------------------------------------------------
// 1. UPDATE units/great_war/data.js
// ----------------------------------------------------
console.log('\n▶ Updating units/great_war/data.js...');
const gwPath = path.join('units', 'great_war', 'data.js');
let gwCode = fs.readFileSync(gwPath, 'utf8');

// Lesson 1
const gwL1Videos = {
  video: {
    type: 'youtube',
    url: 'https://www.youtube.com/watch?v=-PAEmgYv0DE',
    title: 'German Unification and Empire - History in 5 Minutes',
    duration: '5 mins 21 secs',
    teacher_guidance:
      'Crisp curriculum summary of Bismarck\'s "Blood and Iron" strategy, the three wars of unification, and the proclamation of the German Empire in the Hall of Mirrors.',
  },
  extra_videos: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=j1Yk0lzV40Q',
      title: 'The Franco-Prussian War - History Matters',
      duration: '3 mins 49 secs',
      teacher_guidance:
        'Fast-paced animated breakdown of the Ems Telegram, the Battle of Sedan, and the loss of Alsace-Lorraine creating French revanchism.',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=o_PKusG7NFs',
      title: 'The Great War: What Made Germany So Successful Before World War 1?',
      duration: '23 mins 7 secs',
      teacher_guidance:
        'In-depth documentary exploring German industrial supremacy, military mobilization systems, and Bismarckian diplomacy.',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=xVISzFmBiPU',
      title: 'How Prussia Ended The French Empire: Franco-Prussian War',
      duration: '27 mins 56 secs',
      teacher_guidance:
        'Comprehensive military and political analysis of the Franco-Prussian War and the collapse of Napoleon III.',
    },
  ],
};

// Lesson 2
const gwL2Videos = {
  video: {
    type: 'youtube',
    url: 'https://www.youtube.com/watch?v=0SEgckAL-xc',
    title: 'Powder Keg: Europe 1900 to 1914 | Historical Documentary',
    duration: '26 mins 6 secs',
    teacher_guidance:
      'Superb documentary overview of European imperial tensions, colonial rivalry, and the hardening of imperial ambitions.',
  },
  extra_videos: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=DduN1cU2p9U',
      title: "What was the 'Scramble for Africa'? - BBC What's New",
      duration: '3 mins 0 secs',
      teacher_guidance:
        'Accessible summary of the 1884 Berlin Conference and the European carving up of the African continent.',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=efV3uZqc3so',
      title: 'The Scramble for Africa Explained: Imperialism and the Road to World War I',
      duration: '12 mins 49 secs',
      teacher_guidance:
        'Explores how colonial clashes in Africa, including the Moroccan Crises (1905, 1911), pushed Britain and France into diplomatic solidarity.',
    },
  ],
};

// Lesson 3
const gwL3Videos = {
  video: {
    type: 'youtube',
    url: 'https://www.youtube.com/watch?v=yryey5NVODs',
    title: '14th June 1900: Anglo-German naval arms race triggered by the Second German Naval Law',
    duration: '2 mins 35 secs',
    teacher_guidance:
      'Concise explanation of Tirpitz’s Second Naval Law and Germany\'s deliberate challenge to Britain\'s "Two-Power Standard".',
  },
  extra_videos: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=-osfjjJuY6U',
      title: 'Anglo-German Dreadnought Arms Race - Anything you can build I can build better!',
      duration: '32 mins 1 secs',
      teacher_guidance:
        'In-depth military engineering history of HMS Dreadnought, naval budgets, and the political escalation between Fisher and Tirpitz.',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=qmYJUYwsZqY',
      title: 'Anglo-German Relations and the Naval Race',
      duration: '52 mins 22 secs',
      teacher_guidance:
        'Detailed academic documentary on diplomatic breakdown, domestic press jingoism, and naval expenditure.',
    },
  ],
};

// Lesson 4
const gwL4Videos = {
  video: {
    type: 'youtube',
    url: 'https://www.youtube.com/watch?v=f11CKYB2FCA',
    title: 'Europe Prior to World War I: Alliances and Enemies | Prelude to WW1',
    duration: '9 mins 47 secs',
    teacher_guidance:
      'Excellent breakdown of the Dual Alliance, Franco-Russian Alliance, Entente Cordiale, and Triple Entente.',
  },
  extra_videos: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=dYrofaDfMKI',
      title: 'Tinderbox Europe - From Balkan Troubles to World War I | Prelude to WW1',
      duration: '7 mins 37 secs',
      teacher_guidance:
        'Focuses on the Bosnian Crisis (1908), the Balkan Wars, and Pan-Slav nationalism threatening the Austro-Hungarian Empire.',
    },
    {
      url: 'https://era.org.uk/streaming-service-resource/1-the-approach-of-war-history-file/',
      title: 'History File: The Approach of War',
      duration: '20 mins 0 secs',
      teacher_guidance:
        'BBC educational documentary tracing how entangling alliances transformed regional disputes into systemic continental risk.',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=c7nUDLKKEBY',
      title: 'How did WW1 Start? | Causes of the First World War',
      duration: '9 mins 19 secs',
      teacher_guidance:
        'Broad overview illustrating how militarism, alliances, imperialism, and nationalism combined to ignite the conflict.',
    },
  ],
};

// Lesson 5
const gwL5Videos = {
  video: {
    type: 'youtube',
    url: 'https://www.youtube.com/watch?v=OfO7TduevHA',
    title: 'How the Assassination of Archduke Franz Ferdinand Unfolded with Dan Snow',
    duration: '4 mins 12 secs',
    teacher_guidance:
      "Dan Snow narrates the exact sequence of events in Sarajevo on 28 June 1914 and Gavrilo Princip's fateful shots.",
  },
  extra_videos: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=Fmobm9pZtTg',
      title: 'The Bullet that Started WWI',
      duration: '10 mins 27 secs',
      teacher_guidance:
        'Dramatized forensic examination of the Black Hand conspiracy, the route mix-up, and the global diplomatic aftermath.',
    },
    {
      url: 'https://era.org.uk/streaming-service-resource/assassination-of-archduke-franz-ferdinand-days-that-shook-the-world/',
      title: 'Days That Shook the World: Assassination of Archduke Franz Ferdinand',
      duration: '28 mins 0 secs',
      teacher_guidance:
        'Gripping BBC docudrama detailing the minute-by-minute timeline of the Sarajevo assassination.',
    },
    {
      url: 'https://era.org.uk/streaming-service-resource/learning-zone-britain-and-the-start-of-ww1-bbc-two/',
      title: 'Britain and the Start of WW1 | Learning Zone (BBC Two)',
      duration: '15 mins 0 secs',
      teacher_guidance:
        "Explores the Schlieffen Plan, the invasion of neutral Belgium, and Britain's ultimatum to Germany in August 1914.",
    },
  ],
};

// Safely modify using AST or module evaluation
const { unitData: gwData } = require('./load_unit_helper.cjs')('great_war');
gwData.lessons[0].video = gwL1Videos.video;
gwData.lessons[0].extra_videos = gwL1Videos.extra_videos;
gwData.lessons[1].video = gwL2Videos.video;
gwData.lessons[1].extra_videos = gwL2Videos.extra_videos;
gwData.lessons[2].video = gwL3Videos.video;
gwData.lessons[2].extra_videos = gwL3Videos.extra_videos;
gwData.lessons[3].video = gwL4Videos.video;
gwData.lessons[3].extra_videos = gwL4Videos.extra_videos;
gwData.lessons[4].video = gwL5Videos.video;
gwData.lessons[4].extra_videos = gwL5Videos.extra_videos;

fs.writeFileSync(
  gwPath,
  `const great_war = ${JSON.stringify(gwData, null, 2)};\n\nexport const unitData = great_war;\nexport default great_war;\n`,
  'utf8',
);
console.log('✓ Injected 15 videos into units/great_war/data.js');

// ----------------------------------------------------
// 2. UPDATE units/medieval_england/data.js
// ----------------------------------------------------
console.log('\n▶ Updating units/medieval_england/data.js...');
const medPath = path.join('units', 'medieval_england', 'data.js');
const { unitData: medData } = require('./load_unit_helper.cjs')('medieval_england');

medData.lessons[0].video = {
  type: 'youtube',
  url: 'https://www.youtube.com/watch?v=PE0RAgHr06U',
  title: 'Norman Conquest - Timelines.tv History of Britain B01',
  duration: '7 mins 34 secs',
  teacher_guidance:
    "Andrew Chater explains the crisis of 1066, Harold Godwinson's forced march north to Stamford Bridge, and the tactical turning points at Senlac Hill.",
};

medData.lessons[1].video = {
  type: 'youtube',
  url: 'https://www.youtube.com/watch?v=BEU_xPJd7Yo',
  title: 'The Norman Conquest - Timelines.tv',
  duration: '7 mins 34 secs',
  teacher_guidance:
    'Focuses on the Harrying of the North, motte-and-bailey castle construction, and the administrative surveillance of the Domesday Book.',
};

medData.lessons[2].video = {
  type: 'youtube',
  url: 'https://www.youtube.com/watch?v=_EKUIBz_po0',
  title: 'Church & Crown - Timelines.tv',
  duration: '3 mins 53 secs',
  teacher_guidance:
    'Explores the Constitutions of Clarendon, criminous clerks, and the shocking martyrdom of Archbishop Thomas Becket in Canterbury Cathedral in 1170.',
};

medData.lessons[3].video = {
  type: 'youtube',
  url: 'https://www.youtube.com/watch?v=7xo4tUMdAMw',
  title: 'What is Magna Carta?',
  duration: '3 mins 33 secs',
  teacher_guidance:
    "Clear overview of King John's abuses, the feudal revolt of the barons, and the key clauses at Runnymede establishing the rule of law.",
};

medData.lessons[4].video = {
  type: 'youtube',
  url: 'https://www.youtube.com/watch?v=YhsPPBGtquo',
  title: 'Black Death - Timelines.tv',
  duration: '6 mins 33 secs',
  teacher_guidance:
    'Examines the catastrophic social and economic impact of the 1348 bubonic plague, labour shortages, and the collapse of the feudal hierarchy.',
};

medData.lessons[4].extra_videos = [
  {
    type: 'youtube',
    url: 'https://www.youtube.com/watch?v=D3EzLF2rOKY',
    title: 'Peasants Revolt - Timelines.tv',
    duration: '8 mins 44 secs',
    teacher_guidance:
      'Explores the 1381 poll tax crisis, Wat Tyler, John Ball, and the dramatic march of the peasants on London.',
  },
  {
    type: 'youtube',
    url: 'https://www.youtube.com/watch?v=fgd9eI8dk6U',
    title: 'Medieval Manor - Timelines.tv',
    duration: '7 mins 21 secs',
    teacher_guidance:
      'Everyday life in a medieval village: open field farming, tithes, church control, and serfdom.',
  },
  {
    type: 'youtube',
    url: 'https://www.youtube.com/watch?v=uNcBrrMoyL8',
    title: 'Ten Minute English and British History #16 - The Wars of the Roses',
    duration: '9 mins 59 secs',
    teacher_guidance:
      'Fast-paced overview of the dynastic clash between Lancaster and York culminating at the Battle of Bosworth Field (1485).',
  },
];

fs.writeFileSync(
  medPath,
  `const medieval_england = ${JSON.stringify(medData, null, 2)};\n\nexport const unitData = medieval_england;\nexport default medieval_england;\n`,
  'utf8',
);
console.log('✓ Injected 8 videos into units/medieval_england/data.js');

// ----------------------------------------------------
// 3. UPDATE units/early_modern_world/data.js
// ----------------------------------------------------
console.log('\n▶ Updating units/early_modern_world/data.js...');
const emwPath = path.join('units', 'early_modern_world', 'data.js');
const { unitData: emwData } = require('./load_unit_helper.cjs')('early_modern_world');

// Find Lesson 7
const emwL7 = emwData.lessons.find(
  (l) => l.id === 'lesson_7' || l.title.includes('Transatlantic Slave Trade'),
);
if (emwL7) {
  if (!emwL7.extra_videos) emwL7.extra_videos = [];
  if (!emwL7.extra_videos.some((v) => v.url.includes('IpgD2ehtMmM'))) {
    emwL7.extra_videos.push({
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=IpgD2ehtMmM',
      title:
        "How Barbados became the first slave society | History - Britain's Forgotten Slave Owners",
      duration: '4 mins 35 secs',
      teacher_guidance:
        'David Olusoga examines how 17th-century sugar plantations on Barbados established the legal and economic blueprint for chattel slavery.',
    });
    fs.writeFileSync(
      emwPath,
      `const early_modern_world = ${JSON.stringify(emwData, null, 2)};\n\nexport const unitData = early_modern_world;\nexport default early_modern_world;\n`,
      'utf8',
    );
    console.log('✓ Injected Barbados slave society video into units/early_modern_world/data.js');
  }
}

// ----------------------------------------------------
// 4. UPDATE units/edexcel_medicine/data.js
// ----------------------------------------------------
console.log('\n▶ Updating units/edexcel_medicine/data.js...');
const medEdPath = path.join('units', 'edexcel_medicine', 'data.js');
const { unitData: medEdData } = require('./load_unit_helper.cjs')('edexcel_medicine');

const wfL4 = medEdData.lessons.find((l) => l.id === 'lesson_5_4');
if (wfL4) {
  if (!wfL4.extra_videos) wfL4.extra_videos = [];
  if (!wfL4.extra_videos.some((v) => v.url.includes('-jTZ7AwCyug'))) {
    wfL4.extra_videos.push({
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=-jTZ7AwCyug',
      title: 'Women Medics - WW1 Uncut (BBC)',
      duration: '6 mins 19 secs',
      teacher_guidance:
        'Dan Snow and medical historians explore the volunteer work of FANY ambulance drivers and VAD nurses under fire on the Western Front.',
    });
    fs.writeFileSync(
      medEdPath,
      `const edexcel_medicine = ${JSON.stringify(medEdData, null, 2)};\n\nexport const unitData = edexcel_medicine;\nexport default edexcel_medicine;\n`,
      'utf8',
    );
    console.log('✓ Injected Women Medics video into units/edexcel_medicine/data.js');
  }
}

// ----------------------------------------------------
// 5. UPDATE units/cme_new/data.js
// ----------------------------------------------------
console.log('\n▶ Updating units/cme_new/data.js...');
const cmePath = path.join('units', 'cme_new', 'data.js');
const { unitData: cmeData } = require('./load_unit_helper.cjs')('cme_new');

// KT 1.1
const cmeL1 = cmeData.lessons.find(
  (l) => l.id === 'lesson_2' || l.title.includes('Creation of Israel'),
);
if (cmeL1) {
  if (!cmeL1.extra_videos) cmeL1.extra_videos = [];
  if (!cmeL1.extra_videos.some((v) => v.url.includes('IhfysdHgGh8'))) {
    cmeL1.extra_videos.push({
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=IhfysdHgGh8',
      title: 'Land Divided (1947-56) | The 50 Years War: Israel and the Arabs (Part 1)',
      duration: '49 mins 26 secs',
      teacher_guidance:
        'Authoritative documentary on the UN partition resolution, British withdrawal, and the outbreak of the 1948–49 War.',
    });
  }
}

// KT 2.1 (Six Day War)
const cmeL5 = cmeData.lessons.find((l) => l.id === 'lesson_7' || l.title.includes('Six Day War'));
if (cmeL5) {
  if (!cmeL5.extra_videos) cmeL5.extra_videos = [];
  const cmeSixDayVideos = [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=h7wiiKSYrv8',
      title: 'Arab-Israeli War 1967 (Six-Day War Documentary)',
      duration: '22 mins 55 secs',
      teacher_guidance:
        'Comprehensive documentary covering Operation Focus airstrikes and Israeli tank battles in Sinai, West Bank, and Golan.',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=8i3uIz7hoYs',
      title: 'Six Days of Miracles',
      duration: '10 mins 9 secs',
      teacher_guidance:
        'Military analysis of the speed and air superiority of Israel’s pre-emptive strike on 5 June 1967.',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=44u2JfQg9z8',
      title: '1967: A Story of Occupation',
      duration: '3 mins 22 secs',
      teacher_guidance:
        'Concise visual explanation of the territorial shifts following the war: West Bank, Gaza, Sinai Peninsula, and Golan Heights.',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=jitbYp16w5w',
      title: 'Who Will Fire First? (Survival of a Nation)',
      duration: '7 mins 23 secs',
      teacher_guidance:
        "Focuses on Nasser's closure of the Straits of Tiran, mobilization in Sinai, and the diplomatic countdown to war.",
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=Jclz5Fq3y2w',
      title: 'War on Three Fronts (Survival of a Nation)',
      duration: '9 mins 56 secs',
      teacher_guidance:
        'Detailed breakdown of the simultaneous Egyptian, Jordanian, and Syrian combat operations.',
    },
  ];
  for (const v of cmeSixDayVideos) {
    if (!cmeL5.extra_videos.some((existing) => existing.url.includes(v.url.split('v=')[1]))) {
      cmeL5.extra_videos.push(v);
    }
  }
}

// KT 2.3 (Yom Kippur War)
const cmeL9 = cmeData.lessons.find(
  (l) => l.id === 'lesson_10' || l.title.includes('Yom Kippur War'),
);
if (cmeL9) {
  if (!cmeL9.extra_videos) cmeL9.extra_videos = [];
  const cmeYomKippurVideos = [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=sFyFynucf7k',
      title: 'Yom Kippur War Explained 1973: A Brief History',
      duration: '3 mins 8 secs',
      teacher_guidance:
        'Rapid recap of the surprise Egyptian crossing of the Suez Canal and Syrian assault on the Golan Heights.',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=Qzl1tWoPQnU',
      title: 'Israel at War: 1973 | PragerU',
      duration: '5 mins 52 secs',
      teacher_guidance:
        'Overview of the military intelligence failure (Agranat Commission context) and US airlift diplomacy.',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=IHypjF9z8Ko',
      title: 'The Yom Kippur War: Behind The Valley of Tears (Part 1) | Unpacked',
      duration: '10 mins 49 secs',
      teacher_guidance:
        'Forensic narrative of the desperate Israeli tank defence against overwhelming Syrian armour on the Golan.',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=fwWdCNAgB9w',
      title: 'The Yom Kippur War: How Israel Turned the Tide (Part 2) | Unpacked',
      duration: '9 mins 58 secs',
      teacher_guidance:
        'Sharon’s counter-crossing of the Suez Canal, encirclement of the Egyptian Third Army, and the superpower nuclear alert.',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=bFiqwj0qFps',
      title: 'Yom Kippur WAR of 1973 in GREAT HD',
      duration: '36 mins 23 secs',
      teacher_guidance:
        'Archival combat footage documentary of air and land battles across Sinai and Golan.',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=jENMO7-bFjs',
      title: 'Golda Meir and Anwar Sadat Historical Encounter',
      duration: '1 mins 2 secs',
      teacher_guidance:
        'Short historical newsreel clip of Golda Meir greeting President Sadat during his historic 1977 visit to Jerusalem.',
    },
  ];
  for (const v of cmeYomKippurVideos) {
    if (!cmeL9.extra_videos.some((existing) => existing.url.includes(v.url.split('v=')[1]))) {
      cmeL9.extra_videos.push(v);
    }
  }
}

fs.writeFileSync(
  cmePath,
  `const cme_new = ${JSON.stringify(cmeData, null, 2)};\n\nexport const unitData = cme_new;\nexport default cme_new;\n`,
  'utf8',
);
console.log('✓ Injected 12 videos into units/cme_new/data.js');

console.log('\n🎉 ALL TRACKER VIDEOS INJECTED SUCCESSFULLY!');
