/**
 * scripts/inject_all_tracker_videos.cjs
 *
 * Surgically and safely injects all newly curated and tracked video links
 * from lesson_tracker.md into:
 *  - units/great_war/data.js (18 videos across 5 enquiries)
 *  - units/medieval_england/data.js (8 videos across 5 lessons)
 *  - units/early_modern_world/data.js (1 video into Lesson 7)
 *  - units/edexcel_medicine/data.js (1 video into Lesson 5.4)
 *  - units/cme_new/data.js (13 videos across Lessons 2, 7, 10)
 *
 * Ensures:
 *  - Authentic titles & exact durations (e.g. '5 mins 21 secs')
 *  - Valid JavaScript syntax (verified with node --check)
 *  - Mirroring to public/units/<unitId>/data.js
 *  - Full alignment with lesson_renderer.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = path.join(__dirname, '..');

function formatVideoObject(v, indent = '        ') {
  return (
    `${indent}{\n` +
    `${indent}  url: '${v.url}',\n` +
    `${indent}  title: '${v.title.replace(/'/g, "\\'")}',\n` +
    `${indent}  duration: '${v.duration}',\n` +
    `${indent}  teacher_guidance:\n` +
    `${indent}    '${v.teacher_guidance.replace(/'/g, "\\'")}',\n` +
    `${indent}}`
  );
}

function formatVideoBlock(videos, indent = '      ') {
  let lines = [`${indent}video: [`];
  for (const v of videos) {
    lines.push(formatVideoObject(v, indent + '  ') + ',');
  }
  lines.push(`${indent}],`);
  return lines.join('\n');
}

// -----------------------------------------------------------------------------
// 1. GREAT WAR
// -----------------------------------------------------------------------------
console.log('\n=============================================');
console.log('▶ [1/5] Injecting videos into units/great_war/data.js');
console.log('=============================================');

const gwVideos = {
  lesson_1: [
    {
      url: 'https://www.youtube.com/watch?v=-PAEmgYv0DE',
      title: 'German Unification and Empire - History in 5 Minutes',
      duration: '5 mins 21 secs',
      teacher_guidance:
        'Crisp curriculum summary of Bismarck\'s "Blood and Iron" strategy, the three wars of unification, and the proclamation of the German Empire in the Hall of Mirrors.',
    },
    {
      url: 'https://www.youtube.com/watch?v=j1Yk0lzV40Q',
      title: 'The Franco Prussian War - History Matters (Short Animated Documentary)',
      duration: '3 mins 49 secs',
      teacher_guidance:
        'Fast-paced animated breakdown of the Ems Telegram, the Battle of Sedan, and the loss of Alsace-Lorraine creating French revanchism.',
    },
    {
      url: 'https://www.youtube.com/watch?v=o_PKusG7NFs',
      title: 'The Great War: What Made Germany So Successful Before World War 1?',
      duration: '23 mins 7 secs',
      teacher_guidance:
        'In-depth documentary exploring German industrial supremacy, military mobilization systems, and Bismarckian diplomacy.',
    },
    {
      url: 'https://www.youtube.com/watch?v=xVISzFmBiPU',
      title: 'How Prussia Ended The French Empire: Franco-Prussian War | Animated History',
      duration: '27 mins 56 secs',
      teacher_guidance:
        'Comprehensive military and political analysis of the Franco-Prussian War and the collapse of Napoleon III.',
    },
  ],
  lesson_2: [
    {
      url: 'https://www.youtube.com/watch?v=DduN1cU2p9U',
      title: "What was the 'Scramble for Africa'? - BBC What's New",
      duration: '3 mins 0 secs',
      teacher_guidance:
        'Accessible summary of the 1884 Berlin Conference and the European carving up of the African continent.',
    },
    {
      url: 'https://www.youtube.com/watch?v=efV3uZqc3so',
      title: 'The Scramble for Africa Explained: Imperialism, Empire, and the Road to World War I',
      duration: '12 mins 49 secs',
      teacher_guidance:
        'Explores how colonial clashes in Africa, including the Moroccan Crises (1905, 1911), pushed Britain and France into diplomatic solidarity.',
    },
    {
      url: 'https://www.youtube.com/watch?v=0SEgckAL-xc',
      title: 'Powder Keg: Europe 1900 to 1914 | Historical Documentary | Lucasfilm',
      duration: '26 mins 6 secs',
      teacher_guidance:
        'Superb documentary overview of European imperial tensions, colonial rivalry, and the hardening of imperial ambitions.',
    },
  ],
  lesson_3: [
    {
      url: 'https://www.youtube.com/watch?v=yryey5NVODs',
      title:
        '14th June 1900: Anglo-German naval arms race triggered by the Second German Naval Law',
      duration: '2 mins 35 secs',
      teacher_guidance:
        "Concise explanation of Tirpitz's Second Naval Law and Germany's deliberate challenge to Britain's \"Two-Power Standard\".",
    },
    {
      url: 'https://www.youtube.com/watch?v=-osfjjJuY6U',
      title: 'Anglo-German Dreadnought Arms Race - Anything you can build I can build better!',
      duration: '32 mins 1 secs',
      teacher_guidance:
        'In-depth military engineering history of HMS Dreadnought, naval budgets, and the political escalation between Fisher and Tirpitz.',
    },
    {
      url: 'https://www.youtube.com/watch?v=qmYJUYwsZqY',
      title: 'Anglo-German Relations and the Naval Race',
      duration: '52 mins 22 secs',
      teacher_guidance:
        'Detailed academic documentary on diplomatic breakdown, domestic press jingoism, and naval expenditure.',
    },
  ],
  lesson_4: [
    {
      url: 'https://www.youtube.com/watch?v=dYrofaDfMKI',
      title: 'Tinderbox Europe - From Balkan Troubles to World War I | Prelude to WW1',
      duration: '7 mins 37 secs',
      teacher_guidance:
        'Focuses on the Bosnian Crisis (1908), the Balkan Wars, and Pan-Slav nationalism threatening the Austro-Hungarian Empire.',
    },
    {
      url: 'https://www.youtube.com/watch?v=c7nUDLKKEBY',
      title: 'How did WW1 Start? | Causes of the First World War',
      duration: '9 mins 19 secs',
      teacher_guidance:
        'Broad overview illustrating how militarism, alliances, imperialism, and nationalism combined to ignite the conflict.',
    },
    {
      url: 'https://www.youtube.com/watch?v=f11CKYB2FCA',
      title: 'Europe Prior to World War I: Alliances and Enemies | Prelude to WW1',
      duration: '9 mins 47 secs',
      teacher_guidance:
        'Excellent breakdown of the Dual Alliance, Franco-Russian Alliance, Entente Cordiale, and Triple Entente.',
    },
    {
      url: 'https://era.org.uk/streaming-service-resource/1-the-approach-of-war-history-file/',
      title: 'History File: The Approach of War',
      duration: '20 mins 0 secs',
      teacher_guidance:
        'BBC educational documentary tracing how entangling alliances transformed regional disputes into systemic continental risk.',
    },
  ],
  lesson_5: [
    {
      url: 'https://www.youtube.com/watch?v=OfO7TduevHA',
      title: 'How the Assassination of Archduke Franz Ferdinand Unfolded with Dan Snow',
      duration: '4 mins 12 secs',
      teacher_guidance:
        "Dan Snow narrates the exact sequence of events in Sarajevo on 28 June 1914 and Gavrilo Princip's fateful shots.",
    },
    {
      url: 'https://www.youtube.com/watch?v=Fmobm9pZtTg',
      title: 'The Bullet that Started WWI',
      duration: '10 mins 27 secs',
      teacher_guidance:
        'Dramatized forensic examination of the Black Hand conspiracy, the route mix-up, and the global diplomatic aftermath.',
    },
    {
      url: 'https://era.org.uk/streaming-service-resource/learning-zone-britain-and-the-start-of-ww1-bbc-two/',
      title: 'Britain and the Start of WW1 | Learning Zone (BBC Two)',
      duration: '15 mins 0 secs',
      teacher_guidance:
        "Explores the Schlieffen Plan, the invasion of neutral Belgium, and Britain's ultimatum to Germany in August 1914.",
    },
    {
      url: 'https://era.org.uk/streaming-service-resource/assassination-of-archduke-franz-ferdinand-days-that-shook-the-world/',
      title: 'Days That Shook the World: Assassination of Archduke Franz Ferdinand',
      duration: '28 mins 0 secs',
      teacher_guidance:
        'Gripping BBC docudrama detailing the minute-by-minute timeline of the Sarajevo assassination.',
    },
  ],
};

const gwFile = path.join(ROOT_DIR, 'units', 'great_war', 'data.js');
let gwContent = fs.readFileSync(gwFile, 'utf8');

for (const [lessonId, videos] of Object.entries(gwVideos)) {
  const needle = `id: '${lessonId}',`;
  if (gwContent.includes(needle)) {
    // Check if video is already present
    const lessonIdx = gwContent.indexOf(needle);
    const nextChunk = gwContent.slice(lessonIdx, lessonIdx + 300);
    if (!nextChunk.includes('video: [')) {
      const blockStr = '\n' + formatVideoBlock(videos, '      ');
      gwContent =
        gwContent.slice(0, lessonIdx + needle.length) +
        blockStr +
        gwContent.slice(lessonIdx + needle.length);
      console.log(`  ✓ Injected ${videos.length} videos into great_war ${lessonId}`);
    } else {
      console.log(`  ℹ️ great_war ${lessonId} already has video block`);
    }
  }
}
fs.writeFileSync(gwFile, gwContent, 'utf8');
execSync(`node --check "${gwFile}"`);
console.log('✅ units/great_war/data.js validated.');

// -----------------------------------------------------------------------------
// 2. MEDIEVAL ENGLAND
// -----------------------------------------------------------------------------
console.log('\n=============================================');
console.log('▶ [2/5] Injecting videos into units/medieval_england/data.js');
console.log('=============================================');

const medVideos = {
  lesson_1: [
    {
      url: 'https://www.youtube.com/watch?v=PE0RAgHr06U',
      title: 'Norman Conquest - Timelines.tv History of Britain B01',
      duration: '7 mins 34 secs',
      teacher_guidance:
        "Andrew Chater explains the crisis of 1066, Harold Godwinson's forced march north to Stamford Bridge, and the tactical turning points at Senlac Hill.",
    },
  ],
  lesson_2: [
    {
      url: 'https://www.youtube.com/watch?v=BEU_xPJd7Yo',
      title: 'The Norman Conquest - Timelines.tv',
      duration: '7 mins 34 secs',
      teacher_guidance:
        'Focuses on the Harrying of the North, motte-and-bailey castle construction, and the administrative surveillance of the Domesday Book.',
    },
  ],
  lesson_3: [
    {
      url: 'https://www.youtube.com/watch?v=_EKUIBz_po0',
      title: 'Church & Crown - Timelines.tv',
      duration: '3 mins 53 secs',
      teacher_guidance:
        'Explores the Constitutions of Clarendon, criminous clerks, and the shocking martyrdom of Archbishop Thomas Becket in Canterbury Cathedral in 1170.',
    },
  ],
  lesson_4: [
    {
      url: 'https://www.youtube.com/watch?v=7xo4tUMdAMw',
      title: 'What is Magna Carta?',
      duration: '3 mins 33 secs',
      teacher_guidance:
        "Clear overview of King John's abuses, the feudal revolt of the barons, and the key clauses at Runnymede establishing the rule of law.",
    },
  ],
  lesson_5: [
    {
      url: 'https://www.youtube.com/watch?v=YhsPPBGtquo',
      title: 'Black Death - Timelines.tv',
      duration: '6 mins 33 secs',
      teacher_guidance:
        'Examines the catastrophic social and economic impact of the 1348 bubonic plague, labour shortages, and the collapse of the feudal hierarchy.',
    },
    {
      url: 'https://www.youtube.com/watch?v=fgd9eI8dk6U',
      title: 'Medieval Manor - Timelines.tv',
      duration: '7 mins 21 secs',
      teacher_guidance:
        'Everyday life in a medieval village: open field farming, tithes, church control, and serfdom.',
    },
    {
      url: 'https://www.youtube.com/watch?v=D3EzLF2rOKY',
      title: 'Peasants Revolt - Timelines.tv',
      duration: '8 mins 44 secs',
      teacher_guidance:
        'Explores the 1381 poll tax crisis, Wat Tyler, John Ball, and the dramatic march of the peasants on London.',
    },
    {
      url: 'https://www.youtube.com/watch?v=uNcBrrMoyL8',
      title: 'Ten Minute English and British History #16 - The Wars of the Roses',
      duration: '9 mins 59 secs',
      teacher_guidance:
        'Fast-paced overview of the dynastic clash between Lancaster and York culminating at the Battle of Bosworth Field (1485).',
    },
  ],
};

const medFile = path.join(ROOT_DIR, 'units', 'medieval_england', 'data.js');
let medContent = fs.readFileSync(medFile, 'utf8');

for (const [lessonId, videos] of Object.entries(medVideos)) {
  // Look for lesson object definition
  const needle = `id: '${lessonId}',`;
  // In medieval_england, make sure we target the main lesson in lessons: [...] (around line 350 onwards)
  let lessonIdx = medContent.indexOf(needle);
  // If there's a retrieval block with lesson_id, needle matches main lesson correctly
  if (lessonIdx !== -1) {
    const nextChunk = medContent.slice(lessonIdx, lessonIdx + 300);
    if (!nextChunk.includes('video: [')) {
      const blockStr = '\n' + formatVideoBlock(videos, '      ');
      medContent =
        medContent.slice(0, lessonIdx + needle.length) +
        blockStr +
        medContent.slice(lessonIdx + needle.length);
      console.log(`  ✓ Injected ${videos.length} videos into medieval_england ${lessonId}`);
    } else {
      console.log(`  ℹ️ medieval_england ${lessonId} already has video block`);
    }
  }
}
fs.writeFileSync(medFile, medContent, 'utf8');
execSync(`node --check "${medFile}"`);
console.log('✅ units/medieval_england/data.js validated.');

// -----------------------------------------------------------------------------
// 3. EARLY MODERN WORLD (Lesson 7)
// -----------------------------------------------------------------------------
console.log('\n=============================================');
console.log('▶ [3/5] Injecting video into units/early_modern_world/data.js');
console.log('=============================================');

const emwFile = path.join(ROOT_DIR, 'units', 'early_modern_world', 'data.js');
let emwContent = fs.readFileSync(emwFile, 'utf8');

const emwVideoToAdd = {
  url: 'https://www.youtube.com/watch?v=IpgD2ehtMmM',
  title: "How Barbados became the first slave society | History - Britain's Forgotten Slave Owners",
  duration: '4 mins 35 secs',
  teacher_guidance:
    'David Olusoga examines how 17th-century sugar plantations on Barbados established the legal and economic blueprint for chattel slavery.',
};

if (!emwContent.includes(emwVideoToAdd.url)) {
  const l7Idx = emwContent.indexOf("id: 'lesson_7'");
  const l8Idx = emwContent.indexOf("id: 'lesson_8'");
  if (l7Idx !== -1) {
    const videoIdx = emwContent.indexOf('video: [', l7Idx);
    if (videoIdx !== -1 && (l8Idx === -1 || videoIdx < l8Idx)) {
      const insertPoint = videoIdx + 'video: ['.length;
      const formatted = '\n' + formatVideoObject(emwVideoToAdd, '        ') + ',';
      emwContent = emwContent.slice(0, insertPoint) + formatted + emwContent.slice(insertPoint);
      fs.writeFileSync(emwFile, emwContent, 'utf8');
      console.log('  ✓ Injected Barbados slave society video into lesson_7');
    }
  }
} else {
  console.log('  ℹ️ early_modern_world already contains Barbados video');
}
execSync(`node --check "${emwFile}"`);
console.log('✅ units/early_modern_world/data.js validated.');

// -----------------------------------------------------------------------------
// 4. EDEXCEL MEDICINE (Lesson 5.4 - Western Front)
// -----------------------------------------------------------------------------
console.log('\n=============================================');
console.log('▶ [4/5] Injecting video into units/edexcel_medicine/data.js');
console.log('=============================================');

const medEdFile = path.join(ROOT_DIR, 'units', 'edexcel_medicine', 'data.js');
let medEdContent = fs.readFileSync(medEdFile, 'utf8');

const medEdVideoToAdd = {
  url: 'https://www.youtube.com/watch?v=-jTZ7AwCyug',
  title: 'Women Medics - WW1 Uncut (BBC)',
  duration: '6 mins 19 secs',
  teacher_guidance:
    'Dan Snow and medical historians explore the volunteer work of FANY ambulance drivers and VAD nurses under fire on the Western Front.',
};

if (!medEdContent.includes(medEdVideoToAdd.url)) {
  const wfIdx = medEdContent.indexOf("id: 'lesson_5_4'");
  const nextLIdx = medEdContent.indexOf("id: 'lesson_5_5'");
  if (wfIdx !== -1) {
    const videoIdx = medEdContent.indexOf('video: [', wfIdx);
    if (videoIdx !== -1 && (nextLIdx === -1 || videoIdx < nextLIdx)) {
      const insertPoint = videoIdx + 'video: ['.length;
      const formatted = '\n' + formatVideoObject(medEdVideoToAdd, '        ') + ',';
      medEdContent =
        medEdContent.slice(0, insertPoint) + formatted + medEdContent.slice(insertPoint);
      fs.writeFileSync(medEdFile, medEdContent, 'utf8');
      console.log('  ✓ Injected Women Medics video into lesson_5_4');
    }
  }
} else {
  console.log('  ℹ️ edexcel_medicine already contains Women Medics video');
}
execSync(`node --check "${medEdFile}"`);
console.log('✅ units/edexcel_medicine/data.js validated.');

// -----------------------------------------------------------------------------
// 5. CME NEW (Lessons 2, 7, 10)
// -----------------------------------------------------------------------------
console.log('\n=============================================');
console.log('▶ [5/5] Injecting videos into units/cme_new/data.js');
console.log('=============================================');

const cmeFile = path.join(ROOT_DIR, 'units', 'cme_new', 'data.js');
let cmeContent = fs.readFileSync(cmeFile, 'utf8');

const cmeAdditions = {
  lesson_2: [
    {
      url: 'https://www.youtube.com/watch?v=IhfysdHgGh8',
      title: 'Land Divided (1947-56) | The 50 Years War: Israel and the Arabs (Part 1)',
      duration: '49 mins 26 secs',
      teacher_guidance:
        'Authoritative documentary on the UN partition resolution, British withdrawal, and the outbreak of the 1948–49 War.',
    },
  ],
  lesson_7: [
    {
      url: 'https://www.youtube.com/watch?v=44u2JfQg9z8',
      title: '1967: A Story of Occupation',
      duration: '3 mins 22 secs',
      teacher_guidance:
        'Concise visual explanation of the territorial shifts following the war: West Bank, Gaza, Sinai Peninsula, and Golan Heights.',
    },
    {
      url: 'https://www.youtube.com/watch?v=jitbYp16w5w',
      title: 'Who Will Fire First? (Survival of a Nation)',
      duration: '7 mins 23 secs',
      teacher_guidance:
        "Focuses on Nasser's closure of the Straits of Tiran, mobilization in Sinai, and the diplomatic countdown to war.",
    },
    {
      url: 'https://www.youtube.com/watch?v=Jclz5Fq3y2w',
      title: 'War on Three Fronts (Survival of a Nation)',
      duration: '9 mins 56 secs',
      teacher_guidance:
        'Detailed breakdown of the simultaneous Egyptian, Jordanian, and Syrian combat operations.',
    },
    {
      url: 'https://www.youtube.com/watch?v=8i3uIz7hoYs',
      title: 'Six Days of Miracles',
      duration: '10 mins 9 secs',
      teacher_guidance:
        'Military analysis of the speed and air superiority of Israel’s pre-emptive strike on 5 June 1967.',
    },
    {
      url: 'https://www.youtube.com/watch?v=h7wiiKSYrv8',
      title: 'Arab-Israeli War 1967 (Six-Day War Documentary)',
      duration: '22 mins 55 secs',
      teacher_guidance:
        'Comprehensive documentary covering surprise Israeli air strikes and tank battles across Sinai, the West Bank, and Golan.',
    },
  ],
  lesson_10: [
    {
      url: 'https://www.youtube.com/watch?v=jENMO7-bFjs',
      title: 'Golda Meir and Anwar Sadat Historical Encounter',
      duration: '1 mins 2 secs',
      teacher_guidance:
        'Short historical newsreel clip of Golda Meir greeting President Sadat during his historic 1977 visit to Jerusalem.',
    },
    {
      url: 'https://www.youtube.com/watch?v=sFyFynucf7k',
      title: 'Yom Kippur War Explained 1973: A Brief History',
      duration: '3 mins 8 secs',
      teacher_guidance:
        'Rapid recap of the surprise Egyptian crossing of the Suez Canal and Syrian assault on the Golan Heights.',
    },
    {
      url: 'https://www.youtube.com/watch?v=Qzl1tWoPQnU',
      title: 'Israel at War: 1973 | PragerU',
      duration: '5 mins 52 secs',
      teacher_guidance:
        'Overview of the military intelligence failure (Agranat Commission context) and US airlift diplomacy.',
    },
    {
      url: 'https://www.bbc.co.uk/programmes/w3cswsnv',
      title: 'Sadat in Jerusalem | BBC Witness History',
      duration: '9 mins 50 secs',
      teacher_guidance:
        'BBC Witness History radio documentary featuring eyewitness recollections of President Sadat’s breakthrough 1977 visit to Jerusalem.',
    },
    {
      url: 'https://www.youtube.com/watch?v=fwWdCNAgB9w',
      title: 'The Yom Kippur War: How Israel Turned the Tide (Part 2) | Unpacked',
      duration: '9 mins 58 secs',
      teacher_guidance:
        'Sharon’s counter-crossing of the Suez Canal, encirclement of the Egyptian Third Army, and the superpower nuclear alert.',
    },
    {
      url: 'https://www.youtube.com/watch?v=IHypjF9z8Ko',
      title: 'The Yom Kippur War: Behind The Valley of Tears (Part 1) | Unpacked',
      duration: '10 mins 49 secs',
      teacher_guidance:
        'Forensic narrative of the desperate Israeli tank defence against overwhelming Syrian armour on the Golan.',
    },
    {
      url: 'https://www.youtube.com/watch?v=bFiqwj0qFps',
      title: 'Yom Kippur WAR of 1973 in GREAT HD',
      duration: '36 mins 23 secs',
      teacher_guidance:
        'Archival combat footage documentary of air and land battles across Sinai and Golan.',
    },
  ],
};

const cmeLessonOrder = [
  'lesson_1',
  'lesson_2',
  'lesson_3',
  'lesson_4',
  'lesson_6',
  'lesson_7',
  'lesson_8',
  'lesson_9',
  'lesson_10',
  'lesson_11',
  'lesson_12',
  'lesson_13',
];

for (const [lessonId, vids] of Object.entries(cmeAdditions)) {
  const lIdx = cmeContent.indexOf(`id: '${lessonId}'`);
  const currentIdx = cmeLessonOrder.indexOf(lessonId);
  const nextLessonId =
    currentIdx !== -1 && currentIdx + 1 < cmeLessonOrder.length
      ? cmeLessonOrder[currentIdx + 1]
      : null;
  const nextLIdx = nextLessonId ? cmeContent.indexOf(`id: '${nextLessonId}'`) : -1;

  if (lIdx !== -1) {
    const videoIdx = cmeContent.indexOf('video: [', lIdx);
    if (videoIdx !== -1 && (nextLIdx === -1 || videoIdx < nextLIdx)) {
      let insertPoint = videoIdx + 'video: ['.length;
      let insertedCount = 0;
      for (const v of vids) {
        const ytId = v.url.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})/);
        const identifier = ytId ? ytId[1] : v.url.split('/').pop();
        if (!cmeContent.includes(identifier)) {
          const formatted = '\n' + formatVideoObject(v, '        ') + ',';
          cmeContent = cmeContent.slice(0, insertPoint) + formatted + cmeContent.slice(insertPoint);
          insertPoint += formatted.length;
          insertedCount++;
        }
      }
      console.log(`  ✓ Injected ${insertedCount} new videos into cme_new ${lessonId}`);
    }
  }
}
fs.writeFileSync(cmeFile, cmeContent, 'utf8');
execSync(`node --check "${cmeFile}"`);
console.log('✅ units/cme_new/data.js validated.');

// -----------------------------------------------------------------------------
// 6. MIRROR TO public/units/<unitId>/data.js
// -----------------------------------------------------------------------------
console.log('\n=============================================');
console.log('▶ [6/6] Mirroring data.js files to public/units/');
console.log('=============================================');

const unitsToMirror = [
  'great_war',
  'medieval_england',
  'early_modern_world',
  'edexcel_medicine',
  'cme_new',
];
for (const u of unitsToMirror) {
  const src = path.join(ROOT_DIR, 'units', u, 'data.js');
  const dst = path.join(ROOT_DIR, 'public', 'units', u, 'data.js');
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dst);
    console.log(`  ✓ Mirrored ${u}/data.js -> public/units/${u}/data.js`);
  }
}

console.log('\n🎉 ALL TRACKER VIDEOS INJECTED AND VALIDATED SUCCESSFULLY!\n');
