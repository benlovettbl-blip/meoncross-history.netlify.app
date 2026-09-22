/**
 * History Revision Hub — Master Two-Page Spread Pupil Workbook Engine
 *
 * Target: units/great_war (KS3 Year 9: Causes of the Great War, 1871–1914)
 * Output: public/units/great_war/pupil_workbook_v2.html
 * PDF:    public/pdfs/great_war_pupil_workbook_V2.pdf
 *
 * Gold Standard Publisher Architecture:
 * - 16-Page A4 Pupil Workbook Standard (Staged V2 edition)
 * - Friendly, accessible teacher language (no pseudo-academic AI fluff)
 * - Page 1: Master Front Cover with 120mm photo frame, pupil info card, and syllabus overview
 * - Pages 2–3: Living Unit Timeline (6 Milestones across 2 pages with 48mm full-width sketchpads)
 * - Pages 4–15: 6 Double-Page Enquiry Spreads:
 *     Left Page (Verso): Do Now (5 questions), Key Vocabulary, Task 4 Source Investigation (filling the page, 0 gaps)
 *     Right Page (Recto): Planning Your Answer (3 columns), Key Words & Connectives, Writing Guide,
 *                         20 Ruled Writing Lines (7.0mm), Timeline Mission Box, Page Footer Strip (Zero DIRT box)
 * - Page 16: Outside Back Cover (Student Assessment Record, WWW/EBI Feedback Lines, QR Revision Hub)
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const QRCode = require('qrcode');

const ROOT_DIR = path.join(__dirname, '..');
const dataPath = path.join(ROOT_DIR, 'units', 'great_war', 'data_v2_4act.js');

if (!fs.existsSync(dataPath)) {
  console.error('❌ Data file not found:', dataPath);
  process.exit(1);
}

// Load 4-Act staged data
const dataContent = fs.readFileSync(dataPath, 'utf8');
const startIndex = dataContent.indexOf('{');
const endIndex = dataContent.lastIndexOf('}');
const unitData = eval('(' + dataContent.substring(startIndex, endIndex + 1) + ')');

const lessons = unitData.lessons || [];
console.log(`Loaded ${lessons.length} Great War 4-Act lessons for V2 Workbook.`);

/**
 * Image helper (base64 data URI)
 */
function getBase64Image(relPath) {
  if (!relPath) return '';
  const clean = relPath.replace(/^\//, '');
  const candidates = [
    path.join(ROOT_DIR, 'public', clean),
    path.join(ROOT_DIR, clean),
    path.join(ROOT_DIR, 'public', 'images', path.basename(clean)),
    path.join(ROOT_DIR, 'units', 'great_war', 'assets', path.basename(clean)),
    path.join(ROOT_DIR, 'public', 'units', 'great_war', 'assets', path.basename(clean)),
  ];

  for (const cand of candidates) {
    if (fs.existsSync(cand) && fs.statSync(cand).isFile()) {
      const ext = path.extname(cand).toLowerCase();
      let mime = 'image/jpeg';
      if (ext === '.png') mime = 'image/png';
      if (ext === '.svg') mime = 'image/svg+xml';
      const b64 = fs.readFileSync(cand).toString('base64');
      return `data:${mime};base64,${b64}`;
    }
  }
  return relPath;
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

// Friendly revision quips for Great War
const revisionQuips = [
  'The History Department • Causes of the Great War • Year 9 Workbook', // Page 1
  '"Remember: A timeline without causal links is just a list of dates."', // Page 2
  '"Chronology matters: 1914 was prepared by decades of imperial and naval rivalry."', // Page 3
  '"Bismarck united Germany with iron and blood; Wilhelm II untied it with bluster."', // Page 4
  '"Always explain HOW an event changed attitudes, not just that it happened."', // Page 5
  '"Losing Alsace-Lorraine turned French classrooms into training grounds for revenge."', // Page 6
  '"Support your claims with named treaties, dates, and historical details."', // Page 7
  '"Colonial squabbles in Africa proved European rivals could not trust each other."', // Page 8
  '"Use PEEL paragraphs to give your answer a clear, sustained argument."', // Page 9
  '"HMS Dreadnought made every other warship obsolete in a single afternoon."', // Page 10
  '"Connectives turn facts into explanations: Consequently, As a result, This led to..."', // Page 11
  '"The alliance system was meant to keep the peace; instead, it acted like a tripwire."', // Page 12
  '"Distinguish between long-term MAIN causes and the short-term Sarajevo spark."', // Page 13
  '"One fatal wrong turn in Sarajevo pulled twenty nations into war in thirty-seven days."', // Page 14
  '"Outstanding history explains not only what happened, but why people believed it mattered."', // Page 15
  'Causes of the Great War Mastery Complete • Assessment & Revision Hub', // Page 16
];

function renderFooterStrip(pageNum, quipText, totalPages = 16) {
  const isEven = pageNum % 2 === 0;
  if (isEven) {
    return `
      <div class="page-footer-strip">
        <span class="footer-page-num" style="margin-right: 8px;">${pageNum}/${totalPages}</span>
        <span class="footer-quip" style="text-align: right; flex: 1;">${quipText}</span>
      </div>`;
  } else {
    return `
      <div class="page-footer-strip">
        <span class="footer-quip" style="text-align: left; flex: 1; margin-right: 8px;">${quipText}</span>
        <span class="footer-page-num">${pageNum}/${totalPages}</span>
      </div>`;
  }
}

// 6 Bespoke Lesson Configurations (Friendly, Teacher-Crafted)
const lessonConfigs = [
  {
    // Lesson 1: Creation of German Empire (1871)
    lessonNum: 1,
    skill: 'Causation',
    title: 'How was the German Empire created in 1871?',
    inquiryQuestion: 'Was Germany united mainly by military force or by clever diplomacy?',
    doNow: [
      { q: 'What was the "Balance of Power" in 19th-century Europe?' },
      { q: 'Name two major European empires that existed in 1870.' },
      { q: 'Why did Britain prefer that no single country dominated Europe?' },
      { q: 'How did railways and telegraphs change warfare by 1870?' },
      { q: 'What was the Zollverein, and which state led it?' },
    ],
    objectives: [
      'Learn how Prussia grew stronger through industry, railways, and army reforms.',
      'Explore how Chancellor Otto von Bismarck used three wars to bring German states together.',
      'Understand how the new German Empire in 1871 changed the balance of power across Europe.',
    ],
    vocabPrompt:
      'Explain the difference between <strong>Realpolitik</strong> (practical politics based on power) and <strong>Liberalism</strong> (rule of law and elected parliaments):',
    bridgeTask: {
      type: 'source_annotation',
      title: 'Task 3: Source Investigation — Bismarck’s "Blood and Iron" Speech',
      sourceTitle: 'Source A: Bismarck speaks to the Prussian Parliament (September 1862)',
      shelfmark: 'PRUSSIAN STATE ARCHIVES • BERLIN',
      sourceText:
        '“Prussia’s borders according to the Vienna treaties are not favorable to a healthy state life. Not by speeches and majority decisions will the great questions of the day be decided—that was the great mistake of 1848 and 1849—but by iron and blood.”',
      provenance:
        'Minister-President Otto von Bismarck addressing the Budget Committee in Berlin, 1862.',
      annotations: [
        '① <strong>Underline:</strong> words showing Bismarck disliked parliamentary debates.',
        '② <strong>Circle:</strong> the phrase describing the old 1815 borders.',
        '③ <strong>Box:</strong> the two words Bismarck said would decide the future.',
      ],
      questionA:
        'What does Source A tell us about Bismarck’s attitude towards democracy and military power?',
      questionB:
        'Why did Prussia’s victories between 1864 and 1871 convince Germans that Bismarck’s policy was right?',
      clue: 'Helpful Clue: Bismarck believed speeches and voting took too long—weapons, factories, and armies were what built nations.',
      scholarsEdge:
        'Challenge Question: Did Bismarck’s reliance on the military make the new German Empire distrustful of peace?',
    },
    structureStrip: [
      {
        col: '1. MILITARY FORCE',
        prompt:
          'Prussian army reforms, Krupp artillery, and victories over Austria (1866) and France (1870).',
      },
      {
        col: '2. CLEVER DIPLOMACY',
        prompt:
          'Bismarck isolating rivals, editing the Ems Telegram, and stirring up German national pride.',
      },
      {
        col: '3. YOUR CONCLUSION',
        prompt:
          'Weigh both sides: did military strength create Germany, or did Bismarck’s diplomacy make it possible?',
      },
    ],
    wordBank:
      'Realpolitik • Blood and Iron • Zollverein • Krupp steel • Needle gun • Ems Telegram • Sedan • Alsace-Lorraine',
    connectives:
      'The main military factor was... • However, diplomacy was essential because... • Consequently... • Ultimately, I conclude that...',
    timelineMission:
      'Turn to Pages 2–3 (Milestone 1: 1871). In the sketchpad, draw Bismarck’s Prussian helmet or the German imperial eagle, and label the proclamation at Versailles.',
  },

  {
    // Lesson 2: Franco-Prussian War & Alsace-Lorraine (1871)
    lessonNum: 2,
    skill: 'Change & Continuity',
    title: 'How did the Franco-Prussian War create a lasting legacy of hatred?',
    inquiryQuestion:
      'Why did the annexation of Alsace-Lorraine make lasting peace in Europe impossible?',
    doNow: [
      { q: 'Which Prussian minister was famous for his "Blood and Iron" speech?' },
      { q: 'In which grand French palace was the German Empire proclaimed in 1871?' },
      { q: 'Which two provinces did Germany take from France after the war?' },
      { q: 'What is the French word for "revenge" (revanche)?' },
      { q: 'Why was France left feeling humiliated and isolated after 1871?' },
    ],
    objectives: [
      'Understand how the Siege of Paris and the harsh 1871 Treaty of Frankfurt shocked France.',
      'Explore how the loss of Alsace-Lorraine fuelled a deep desire for revenge (revanche).',
      'Explain how French schools and culture prepared a whole generation for future conflict.',
    ],
    vocabPrompt:
      'Complete the sentence using the terms <strong>Revanche</strong> (revenge) and <strong>Annexation</strong> (taking land by force):<br>' +
      'After the German [ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ] of Alsace-Lorraine, the French public demanded [ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ] to reclaim their lost provinces.',
    bridgeTask: {
      type: 'visual_painting',
      title: 'Task 3: Source Investigation — "The Black Stain" (La Tache Noire, 1887)',
      imgSrc: '/images/la_tache_noire_1887.jpg',
      imgCaption: 'Albert Bettannier, "La Tache Noire" (1887)',
      sourceText:
        '“In French schoolrooms after 1871, teachers pointed to maps where the lost provinces of Alsace and Lorraine were colored black or violet. Boys wore uniforms and were drilled in gymnastics and rifle handling, taught that their duty was to win back the provinces.”',
      shelfmark: 'FRENCH MINISTRY OF PUBLIC INSTRUCTION • 1882 EDUCATION REPORT',
      annotations: [
        '① <strong>Underline:</strong> what the teacher is pointing to on the classroom map.',
        '② <strong>Circle:</strong> the uniform the French schoolboy is wearing.',
        '③ <strong>Box:</strong> the military skills being taught to the young pupils.',
      ],
      questionA:
        'What does this painting show about how French children were brought up to feel about Germany?',
      questionB:
        'Why did taking Alsace-Lorraine guarantee that France and Germany could never be true friends?',
      clue: 'Helpful Clue: Notice the cadet belt and drum. French schools were not just teaching reading; they were preparing boys for a future war.',
      scholarsEdge:
        'Challenge Question: Was taking Alsace-Lorraine Bismarck’s greatest strategic mistake?',
    },
    structureStrip: [
      {
        col: '1. FRENCH HUMILIATION',
        prompt:
          'The Siege of Paris, German troops marching on the Champs-Élysées, and the £200m indemnity.',
      },
      {
        col: '2. LOST PROVINCES',
        prompt:
          'Losing 1.5 million French citizens, iron mines in Lorraine, and the rise of revanche.',
      },
      {
        col: '3. YOUR CONCLUSION',
        prompt:
          'Explain why taking land guaranteed that any future European crisis would involve France attacking Germany.',
      },
    ],
    wordBank:
      'Revanche • Alsace-Lorraine • Treaty of Frankfurt • Siege of Paris • indemnity • Albert Bettannier • patriotism • buffer zone',
    connectives:
      'The immediate shock was... • Furthermore, in French society... • This meant that whenever a crisis arose... • In conclusion...',
    timelineMission:
      'Turn to Pages 2–3 (Milestone 2: 1871). In the sketchpad, sketch the map of France with the shaded black border provinces of Alsace and Lorraine.',
  },

  {
    // Lesson 3: The Scramble for Africa & Weltpolitik
    lessonNum: 3,
    skill: 'Causation & Empire',
    title: 'How did imperialism and the "Scramble for Africa" fuel European rivalry?',
    inquiryQuestion: 'Did the race for overseas empires make war in Europe more likely?',
    doNow: [
      { q: 'Which new Kaiser dismissed Bismarck in 1890?' },
      { q: 'What German phrase described Kaiser Wilhelm’s aggressive world policy (Weltpolitik)?' },
      { q: 'What nickname was given to European powers carving up Africa between 1881 and 1914?' },
      { q: 'Which two European powers had by far the largest global empires in 1900?' },
      { q: 'What valuable raw materials did European nations want from African colonies?' },
    ],
    objectives: [
      'Learn why European powers rushed to colonize 90% of Africa in just thirty years.',
      'Understand Kaiser Wilhelm II’s ambition for Germany to have a "place in the sun".',
      'Analyze how colonial disputes in Morocco pushed Britain and France together against Germany.',
    ],
    vocabPrompt:
      'Explain the difference between <strong>Imperialism</strong> (building an overseas empire) and <strong>Weltpolitik</strong> (Germany’s aggressive drive for world influence):',
    bridgeTask: {
      type: 'visual_map',
      title: 'Task 3: Source Investigation — The Partition of Africa (1914)',
      imgSrc: '/images/map_africa_1914.png',
      imgCaption: 'Primary Map: European Possessions in Africa (1914)',
      sourceText:
        '“By 1914, only Liberia and Ethiopia remained independent. Britain held a continuous corridor from Cairo to Cape Town; France held vast areas of West Africa. Germany arrived late and gained only scattered territories (Togo, Cameroon, South-West Africa, German East Africa), convincing the Kaiser that Germany had been cheated of its rightful share.”',
      shelfmark: 'BERLIN CONFERENCE MAP ARCHIVES • 1885–1914',
      annotations: [
        '① <strong>Underline:</strong> in the text excerpt, the two powers that held the vast majority of African land.',
        '② <strong>Circle:</strong> in the text excerpt, how the Kaiser felt about Germany’s share of colonies.',
        '③ <strong>Box:</strong> in the text excerpt, the two independent African nations.',
        '④ <strong>Map Action:</strong> on the map, visually trace Britain’s corridor from Cairo to Cape Town.',
      ],
      questionA:
        'What does this map show about why Germany was jealous of the British and French empires?',
      questionB:
        'How did German attempts to interfere in Morocco (1905 and 1911) backfire and strengthen Britain and France?',
      clue: 'Helpful Clue: Look at how much territory Britain and France controlled compared to Germany’s small, isolated patches.',
      scholarsEdge:
        'Challenge Question: Did imperial clashes cause the Great War, or did they simply make European powers suspicious of each other?',
    },
    structureStrip: [
      {
        col: '1. THE RACE FOR LAND',
        prompt:
          'Raw materials (rubber, copper, oil), markets, and national prestige driving European conquest.',
      },
      {
        col: '2. GERMAN JEALOUSY',
        prompt:
          'Wilhelm II demanding a "place in the sun" and challenging French control in Morocco.',
      },
      {
        col: '3. YOUR CONCLUSION',
        prompt:
          'Judge whether colonial rivalry was a direct cause of war or just worsened existing European fears.',
      },
    ],
    wordBank:
      'Imperialism • Scramble for Africa • Weltpolitik • "Place in the Sun" • Berlin Conference • Morocco Crises • Panther gunboat',
    connectives:
      'Imperialism heightened tensions because... • In particular, Germany felt... • This backfired when... • Overall, I judge that...',
    timelineMission:
      'Turn to Pages 2–3 (Milestone 3: 1898–1904). In the sketchpad, sketch the African continent with British and French flags overshadowing Germany’s tiny colonies.',
  },

  {
    // Lesson 4: HMS Dreadnought & The Naval Arms Race
    lessonNum: 4,
    skill: 'Technology & Rivalry',
    title: 'How did the launch of HMS Dreadnought trigger a naval arms race?',
    inquiryQuestion: 'Was the naval arms race the main reason Britain turned against Germany?',
    doNow: [
      {
        q: 'What British policy said the Royal Navy must equal the next two biggest navies combined?',
      },
      {
        q: 'In what year was the revolutionary battleship HMS Dreadnought launched in Portsmouth?',
      },
      { q: 'What new engine made Dreadnought faster than any previous battleship?' },
      { q: 'Which German admiral drew up the German Navy Laws to rival Britain?' },
      { q: 'What popular slogan did British newspapers print demanding eight new dreadnoughts?' },
    ],
    objectives: [
      'Understand how revolutionary engineering made HMS Dreadnought faster and more deadly.',
      'Explain why building dreadnoughts made all previous battleships obsolete overnight.',
      'Evaluate why Germany’s decision to build battleships frightened Britain into a naval arms race.',
    ],
    vocabPrompt:
      'Explain the difference between the British <strong>Two-Power Standard</strong> (naval safety policy) and the German <strong>Risk Theory</strong> (building enough ships to frighten Britain):',
    bridgeTask: {
      type: 'technical_table',
      title: 'Task 3: Source Investigation — The Battleship Revolution (1906)',
      sourceTitle: 'Source A: Admiral Sir John Fisher explains the Dreadnought revolution (1906)',
      shelfmark: 'BRITISH ADMIRALTY RECORDS • PORTSMOUTH DOCKYARD',
      sourceText:
        '“HMS Dreadnought can sink the whole German fleet by herself before they can get close enough to hit her. She carries ten 12-inch guns and steam turbines driving her at 21 knots. It has made every existing battleship in the world obsolete.”',
      tableHeaders: ['Feature', 'Old Battleships (Pre-Dreadnought)', 'HMS Dreadnought (1906)'],
      tableRows: [
        [
          'Main Armament',
          '4 × 12-inch heavy guns + mixed smaller guns',
          '10 × 12-inch big guns (all-big-gun ship)',
        ],
        [
          'Engines & Speed',
          'Piston steam engines (18 knots maximum)',
          'Steam turbines (21 knots top speed)',
        ],
        [
          'Effective Range',
          'Accurate only up to 4 miles',
          'Accurate up to 8 miles with central fire control',
        ],
      ],
      annotations: [
        '① <strong>Underline:</strong> the number of 12-inch guns Dreadnought carried.',
        '② <strong>Circle:</strong> Dreadnought’s top speed in knots.',
        '③ <strong>Box:</strong> what happened to all previous battleships.',
      ],
      questionA:
        'Using the table, explain why HMS Dreadnought was described as an engineering revolution:',
      questionB:
        'Why did building Dreadnought accidentally help Germany by wiping out Britain’s huge numerical lead?',
      clue: 'Helpful Clue: Because all older ships were now useless, both Britain and Germany started from zero in the dreadnought race.',
      scholarsEdge:
        'Challenge Question: Why did the German fleet threaten Britain’s very survival, while the British fleet did not threaten Germany’s survival?',
    },
    structureStrip: [
      {
        col: '1. THE WEAPON',
        prompt:
          'Ten 12-inch guns, steam turbines, thick Krupp armour, and revolution in naval warfare.',
      },
      {
        col: '2. THE RIVALRY',
        prompt:
          'Tirpitz building German dreadnoughts, British public panic ("We want eight and we won’t wait!").',
      },
      {
        col: '3. YOUR CONCLUSION',
        prompt:
          'Did building battleships make war inevitable, or did it push Britain into France and Russia’s arms?',
      },
    ],
    wordBank:
      'HMS Dreadnought • Two-Power Standard • Admiral Fisher • Admiral Tirpitz • steam turbine • 12-inch guns • naval arms race',
    connectives:
      'Dreadnought transformed naval power because... • However, for Britain, the German challenge was... • Consequently... • Ultimately...',
    timelineMission:
      'Turn to Pages 2–3 (Milestone 4: 1906). In the sketchpad, draw the silhouette of HMS Dreadnought with its big gun turrets pointing forward.',
  },

  {
    // Lesson 5: The Alliance System & Willy-Nicky Telegrams
    lessonNum: 5,
    skill: 'Diplomacy & Evidence',
    title: 'How did rival alliances and secret treaties divide Europe into two armed camps?',
    inquiryQuestion:
      'Was the European alliance system meant to prevent war, or did it make war inevitable?',
    doNow: [
      { q: 'Which three nations formed the Triple Alliance in 1882?' },
      { q: 'Which three nations formed the Triple Entente by 1907?' },
      { q: 'What term describes an alliance where an attack on one is an attack on all?' },
      { q: 'What informal diplomatic friendly agreement did Britain and France sign in 1904?' },
      { q: 'Who were the royal cousins who sent the famous "Willy-Nicky" telegrams in July 1914?' },
    ],
    objectives: [
      'Identify the two armed camps: the Triple Alliance vs the Triple Entente.',
      'Understand how secret promises and mobilization timetables created a dangerous chain reaction.',
      'Investigate the private telegrams between Kaiser Wilhelm II and Tsar Nicholas II as war loomed.',
    ],
    vocabPrompt:
      'Explain the difference between a <strong>Defensive Alliance</strong> (promising mutual help if attacked) and <strong>Military Mobilization</strong> (calling up millions of soldiers ready for war):',
    bridgeTask: {
      type: 'willy_nicky_telegrams',
      title: 'Task 3: Source Investigation — The "Willy-Nicky" Telegrams (July 1914)',
      sourceATitle: 'TELEGRAM 1: Tsar Nicholas II to Kaiser Wilhelm II (29 July 1914)',
      sourceAText:
        '“To try and avoid such a calamity as a European war, I beg you in the name of our old friendship to do what you can to stop your ally [Austria] from going too far. An ignominious war has been declared on a weak country [Serbia]. — NICKY”',
      sourceAShelfmark: 'RUSSIAN IMPERIAL TELEGRAPH ARCHIVE • ST PETERSBURG',
      sourceBTitle: 'TELEGRAM 2: Kaiser Wilhelm II to Tsar Nicholas II (30 July 1914)',
      sourceBText:
        '“The whole weight of the decision lies upon your shoulders now, who have to bear the responsibility for Peace or War. My ally is acting justly against a nest of assassins. If Russia mobilizes, I will be forced to mobilize too. — WILLY”',
      sourceBShelfmark: 'GERMAN IMPERIAL TELEGRAPH ARCHIVE • BERLIN',
      annotations: [
        '① <strong>Underline:</strong> the word the Tsar uses to describe European war ("calamity").',
        '② <strong>Circle:</strong> how the Kaiser describes Serbia ("nest of assassins").',
        '③ <strong>Box:</strong> the warnings both leaders give about military mobilization.',
      ],
      questionA:
        'What do these telegrams show about the personal relationship between the Tsar and the Kaiser?',
      questionB:
        'Why were the two leaders unable to stop the war despite calling each other by childhood nicknames?',
      clue: 'Helpful Clue: Behind their personal friendship, both leaders were trapped by rigid army railway plans and alliance promises.',
      scholarsEdge:
        'Challenge Question: Did alliances cause the war, or did the fear of being left without allies cause the war?',
    },
    structureStrip: [
      {
        col: '1. TWO ARMED CAMPS',
        prompt:
          'Triple Alliance (Germany, Austria, Italy) vs Triple Entente (Britain, France, Russia).',
      },
      {
        col: '2. THE TRIPWIRE',
        prompt:
          'Secret agreements, military staff talks, and the domino effect if one ally was attacked.',
      },
      {
        col: '3. YOUR CONCLUSION',
        prompt:
          'Did alliances keep peace for twenty years, or did they turn a small Balkan dispute into a world war?',
      },
    ],
    wordBank:
      'Triple Alliance • Triple Entente • Willy-Nicky telegrams • Entente Cordiale • mobilization • tripwire • balance of power',
    connectives:
      'The alliance system was intended to... • However, in reality, it acted as... • The Willy-Nicky telegrams prove that... • Therefore...',
    timelineMission:
      'Turn to Pages 2–3 (Milestone 5: 1908–1914). In the sketchpad, draw the two opposing flags (Union Jack / Tricolour vs German Eagle) connected by chains.',
  },

  {
    // Lesson 6: The Spark — Sarajevo & The July Crisis (1914)
    lessonNum: 6,
    skill: 'Chronology & Causation',
    title: 'How did an assassination in Sarajevo trigger the outbreak of the First World War?',
    inquiryQuestion:
      'Could the First World War have been avoided after the shots in Sarajevo, or was it inevitable?',
    doNow: [
      { q: 'In which Bosnian city was Archduke Franz Ferdinand assassinated on 28 June 1914?' },
      { q: 'Name the 19-year-old Bosnian Serb student who fired the fatal shots.' },
      { q: 'What secret nationalist Serbian society helped train and arm the assassins?' },
      {
        q: 'What promise did Germany give to Austria on 5 July 1914, backing them unconditionally?',
      },
      {
        q: 'Which neutral country did Germany invade, forcing Britain to enter the war on 4 August?',
      },
    ],
    objectives: [
      'Follow the dramatic events of 28 June 1914 in Sarajevo, including the fateful wrong turn.',
      'Understand how the German "Blank Cheque" gave Austria-Hungary the confidence to attack Serbia.',
      'Trace the 37-day countdown of the July Crisis from assassination to a world war.',
    ],
    vocabPrompt:
      'Explain the difference between the <strong>Sarajevo Spark</strong> (the immediate trigger) and the <strong>Blank Cheque</strong> (Germany’s promise of unconditional military backing):',
    bridgeTask: {
      type: 'dual_written_sources',
      title: 'Task 3: Source Investigation — Eyewitness in Sarajevo & The Kaiser’s Telegram',
      sourceATitle: 'Source A: Eyewitness Account of Count Franz von Harrach (28 June 1914)',
      sourceAShelfmark: 'AUSTRIAN MILITARY ARCHIVES • VIENNA',
      sourceAText:
        '“As the car reversed slowly to correct the driver’s wrong turn outside Schiller’s shop, a youth stepped from the crowd. He aimed a Browning pistol point-blank into the carriage and fired twice. A thin stream of blood spurted from the Archduke’s mouth upon my cheek. Duchess Sophie cried out: ‘For heaven’s sake! What has happened to you?’ Then she sank lifeless across his knees.”',
      sourceAProvenance:
        'Count Harrach was an Austrian officer standing on the running board of the royal car protecting the Archduke.',
      sourceBTitle: 'Source B: Kaiser Wilhelm II’s "Blank Cheque" Dispatch (5 July 1914)',
      sourceBShelfmark: 'GERMAN IMPERIAL CHANCELLERY • DISPATCH TO VIENNA',
      sourceBText:
        '“Emperor Franz Joseph may rest assured that His Majesty the Kaiser will stand loyally by Austria-Hungary, in accordance with the alliance, even if matters should result in war between Austria-Hungary and Russia. Austria-Hungary should judge what is to be done; Germany stands steadfastly beside her.”',
      sourceBProvenance:
        'Official diplomatic telegram guaranteeing unconditional German military backing for Austria’s war against Serbia.',
      annotations: [
        '① <strong>Underline:</strong> what the royal car was doing when the assassin fired (Source A).',
        '② <strong>Circle:</strong> the German promise to stand loyally by Austria even if Russia intervenes (Source B).',
        '③ <strong>Box:</strong> the physical detail showing the Archduke was mortally wounded (Source A).',
      ],
      questionA:
        'Using Source A, describe how the driver’s wrong turn outside Schiller’s shop gave the assassin his chance:',
      questionB:
        'Using Source B, explain why Germany’s "Blank Cheque" gave Austria-Hungary the confidence to declare war on Serbia:',
      clue: 'Helpful Clue: Austria was terrified that Russia would defend Serbia. The Kaiser’s promise gave Austria the green light to strike.',
      scholarsEdge:
        'Challenge Question: Without Germany’s Blank Cheque, would the Sarajevo assassination have stayed a localized Balkan conflict?',
    },
    structureStrip: [
      {
        col: '1. THE WRONG TURN',
        prompt:
          'Princip, the Black Hand, the failed bomb, and the stalled car outside Schiller’s Delicatessen.',
      },
      {
        col: '2. THE JULY CRISIS',
        prompt:
          'The Blank Cheque (5 July), Austria’s harsh ultimatum to Serbia, and Russia mobilizing to protect Slavs.',
      },
      {
        col: '3. YOUR CONCLUSION',
        prompt:
          'Judge whether the spark in Sarajevo created the war, or if decades of M-A-I-N tension made an explosion inevitable.',
      },
    ],
    wordBank:
      'Sarajevo • Gavrilo Princip • Black Hand • Franz Ferdinand • Blank Cheque • Ultimatum • Schlieffen Plan • Belgium • 4 August 1914',
    connectives:
      'The immediate trigger occurred when... • However, this localized crisis escalated because... • Without the Blank Cheque... • Ultimately...',
    timelineMission:
      'Turn to Pages 2–3 (Milestone 6: 28 June – Aug 1914). In the sketchpad, sketch the stalled open-top royal car or the dominoes tumbling into war.',
  },
];

// Calibrated Line Counts per lesson spread to eliminate all dead-space voids
// Verso: Q1 = 4 lines; Q2 fills remaining height to clue footer (gap <= 20px)
const versoQ2Lines = [14, 12, 12, 12, 12, 10];
// Recto: Essay writing lines docking directly above Timeline Mission box (gap <= 20px)
const rectoWritingLines = [27, 26, 27, 27, 26, 26];

// Timeline Milestones across Pages 2 & 3 (3 Milestones per page, 100% full-width cards)
const timelineMilestones = [
  // Page 2 Milestones
  {
    page: 2,
    date: '1871',
    title: 'The German Empire Proclaimed at Versailles',
    lesson: 'Lesson 1',
    summary:
      'Following Prussia’s swift victory in the Franco-Prussian War, King Wilhelm I is proclaimed German Emperor in the Hall of Mirrors at Versailles. Otto von Bismarck unites 39 separate states into a powerful new industrial empire, permanently upsetting the traditional European balance of power.',
    sketchPrompt:
      'Sketch your visual symbol: Bismarck’s spiked Pickelhaube helmet, Prussian needle guns, or the German imperial crown.',
  },
  {
    page: 2,
    date: '1871–1890',
    title: 'Bismarckian Diplomacy & The French "Black Stain"',
    lesson: 'Lesson 2',
    summary:
      'Germany annexes the wealthy French provinces of Alsace and Lorraine. Humiliated by defeat and the loss of their lands, French politicians and classrooms embrace "revanche" (revenge). Bismarck works tirelessly to keep France diplomatically isolated through alliances with Russia and Austria.',
    sketchPrompt:
      'Sketch your visual symbol: The map of France with Alsace-Lorraine shaded black, or the weeping French Marianne.',
  },
  {
    page: 2,
    date: '1890–1904',
    title: 'Wilhelm II, Weltpolitik & The Entente Cordiale',
    lesson: 'Lesson 3',
    summary:
      'Ambitious young Kaiser Wilhelm II dismisses Bismarck in 1890 and demands a "place in the sun" for Germany. German meddling in African colonies and blustering diplomacy alarms Britain, prompting London to abandon "Splendid Isolation" and sign the 1904 Entente Cordiale with France.',
    sketchPrompt:
      'Sketch your visual symbol: The African continent with imperial flags, or Kaiser Wilhelm II pointing overseas.',
  },
  // Page 3 Milestones
  {
    page: 3,
    date: '1906–1912',
    title: 'Launch of HMS Dreadnought & The Naval Race',
    lesson: 'Lesson 4',
    summary:
      'The Royal Navy launches HMS Dreadnought in Portsmouth, rendering all older battleships obsolete overnight with its ten 12-inch guns and steam turbines. When Germany starts building its own dreadnoughts, a feverish arms race erupts, convincing Britain that Germany poses a mortal threat.',
    sketchPrompt:
      'Sketch your visual symbol: The heavy gun turret of HMS Dreadnought or two battleships firing broadsides.',
  },
  {
    page: 3,
    date: '1908–1914',
    title: 'The Alliance System: Europe Divided into Armed Camps',
    lesson: 'Lesson 5',
    summary:
      'Europe hardens into two heavily armed rival blocs: the Triple Alliance (Germany, Austria-Hungary, Italy) and the Triple Entente (Britain, France, Russia). Massive armies draw up strict railway mobilization plans, meaning any local border clash risks pulling all six great powers into war.',
    sketchPrompt:
      'Sketch your visual symbol: The two rival alliance shields connected by chains, or the Willy-Nicky telegraph wires.',
  },
  {
    page: 3,
    date: '28 June – 4 Aug 1914',
    title: 'The Sarajevo Spark & The Outbreak of Total War',
    lesson: 'Lesson 6',
    summary:
      'Gavrilo Princip assassinates Archduke Franz Ferdinand in Sarajevo. Germany issues Austria the "Blank Cheque" to crush Serbia. Russia mobilizes to protect fellow Slavs; Germany invades neutral Belgium; and on 4 August 1914, Britain enters the conflict. The Great War begins.',
    sketchPrompt:
      'Sketch your visual symbol: The stalled open-top car on Franz Josef Street, or a row of tumbling dominoes.',
  },
];

/**
 * Builds the complete Master HTML for Great War V2 Pupil Workbook
 */
function buildGreatWarTwoPageWorkbookHtml() {
  const coverImg = getBase64Image('/images/cover_great_war.jpg');

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Causes of the Great War (1871–1914) — Pupil Workbook</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&display=swap" rel="stylesheet">
  <style>
    *, *:before, *:after { box-sizing: border-box; }
    @page {
      size: A4 portrait;
      margin: 10mm 10mm 10mm 10mm;
    }
    body {
      font-family: 'Georgia', 'Garamond', serif;
      font-size: 8.8pt;
      line-height: 1.3;
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
    .page-container {
      width: 100%;
      height: 272mm;
      max-height: 272mm;
      position: relative;
      page-break-after: always;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: #ffffff;
      box-sizing: border-box;
      padding: 4mm 6mm;
    }
    .page-body-full {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      overflow: hidden;
    }
    .task-section {
      margin-bottom: 3px;
    }
    .task-line {
      border-bottom: 1.4px solid #000000;
      height: 7.0mm;
      margin: 0;
      box-sizing: border-box;
    }
    .task-line-dotted {
      border-bottom: 1.2px dotted #000000;
      height: 5.4mm;
      margin: 0;
      box-sizing: border-box;
    }
    .page-footer-strip {
      border-top: 1.2px solid #000000;
      padding-top: 2px;
      margin-top: 2px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: 'Inter', sans-serif;
      font-size: 7.2pt;
      color: #000000;
    }
    .footer-page-num {
      font-weight: 800;
    }
    .footer-quip {
      font-style: italic;
      color: #222222;
      font-weight: 500;
    }
    .badge {
      display: inline-block;
      font-family: 'Inter', sans-serif;
      font-size: 7.2pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border: 1px solid #000000;
      padding: 1px 6px;
      border-radius: 2px;
      background: #f8fafc;
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
  // PAGE 1: OUTSIDE FRONT COVER
  // ====================================================================
  html += `
  <div class="page page-container" id="page-1">
    <div class="page-body-full" style="justify-content: space-between;">
      
      <!-- Top Branding -->
      <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 3px;" data-department-name="The History Department">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <span class="school-brand-target" style="font-family: 'Inter', sans-serif; font-size: 11pt; font-weight: 900; letter-spacing: 2px; text-transform: uppercase;">The History Department</span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; letter-spacing: 1px; text-transform: uppercase;">Key Stage 3 History • Year 9 Workbook</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-top: 1px; border-top: 1px solid #000; padding-top: 2px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase; color: #222;">UNIT 9: THE OUTBREAK OF THE FIRST WORLD WAR (1871–1914)</span>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800;">STAGED V2 EDITION</span>
        </div>
      </div>

      <!-- Title Banner -->
      <div style="border: 1.8px solid #000; border-radius: 4px; padding: 4px 8px; background: #fff; margin-bottom: 3px;">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 1px;">
          <span style="background: #000; color: #fff; font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; padding: 1.5px 6px; border-radius: 2px; text-transform: uppercase; letter-spacing: 0.8px;">
            Year 9 Enquiry
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: #222;">
            M-A-I-N Causes &amp; The July Crisis • 1871–1914
          </span>
        </div>
        <h1 style="font-family: 'Playfair Display', serif; font-size: 14pt; margin: 1px 0; font-weight: 900; line-height: 1.15; color: #000;">
          CAUSES OF THE GREAT WAR
        </h1>
        <div style="font-family: 'Georgia', serif; font-size: 8.2pt; color: #222; font-style: italic; line-height: 1.2;">
          Overarching Enquiry: "How did decades of imperial rivalry, dreadnoughts, and alliances culminate in thirty-seven days of madness?"
        </div>
      </div>

      <!-- Hero Photo Plate -->
      <div style="border: 1.8px solid #000; border-radius: 4px; overflow: hidden; background: #fff; margin-bottom: 3px; display: flex; flex-direction: column;">
        <div style="height: 118mm; background: #000; display: flex; justify-content: center; align-items: center; overflow: hidden;">
          <img src="${coverImg}" alt="Causes of the Great War" style="width: 100%; height: 100%; object-fit: cover; object-position: center 30%; display: block; filter: grayscale(100%) contrast(110%);">
        </div>
        <div style="border-top: 1.5px solid #000; padding: 3px 8px; background: #fff;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 900; text-transform: uppercase;">
              Primary Visual Plate • 28 June 1914
            </span>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 900; background: #000; color: #fff; padding: 1px 5px; border-radius: 2px;">
              AUSTRIAN STATE ARCHIVES • SARAJEVO
            </span>
          </div>
          <div style="font-family: 'Playfair Display', serif; font-size: 9.2pt; font-weight: 800; line-height: 1.15; margin: 1px 0;">
            The Arrest of Gavrilo Princip Moments After Firing the Fatal Shots
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 7.0pt; color: #222; line-height: 1.2;">
            Austrian gendarmes struggle with 19-year-old Serbian nationalist Gavrilo Princip outside Schiller's Delicatessen on Franz Josef Street, Sarajevo.
          </div>
        </div>
      </div>

      <!-- Pupil Information Card -->
      <div style="border: 1.5px solid #000; border-radius: 4px; padding: 5px 12px; background: #fff; margin-bottom: 3px;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000; padding-bottom: 2px; margin-bottom: 4px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; text-transform: uppercase; letter-spacing: 0.8px;">
            Pupil Workbook &amp; Academic Record
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 800; text-transform: uppercase; color: #333;">
            Year 9 History • Unit 9
          </span>
        </div>
        <div style="display: grid; grid-template-columns: 2fr 1fr 1.2fr; gap: 14px; font-family: 'Inter', sans-serif; font-size: 7.5pt;">
          <div style="display: flex; align-items: baseline;">
            <strong style="text-transform: uppercase; width: 48px; font-size: 7pt;">Name:</strong>
            <div style="flex: 1; border-bottom: 1.2px solid #000; height: 14px;"></div>
          </div>
          <div style="display: flex; align-items: baseline;">
            <strong style="text-transform: uppercase; width: 44px; font-size: 7pt;">Class:</strong>
            <div style="flex: 1; border-bottom: 1.2px solid #000; height: 14px;"></div>
          </div>
          <div style="display: flex; align-items: baseline;">
            <strong style="text-transform: uppercase; width: 56px; font-size: 7pt;">Teacher:</strong>
            <div style="flex: 1; border-bottom: 1.2px solid #000; height: 14px;"></div>
          </div>
        </div>
      </div>

      <!-- Syllabus Enquiry Overview (Spanning Across the Page, 0 dead void) -->
      <div style="border: 1.5px solid #000; border-radius: 4px; overflow: hidden; background: #fff; flex: 1; display: flex; flex-direction: column; margin-bottom: 2px;">
        <div style="background: #000; color: #fff; padding: 3px 10px; font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.8px; display: flex; justify-content: space-between; align-items: center;">
          <span>The 6 Historical Enquiries Across This Unit</span>
          <span style="font-size: 6.8pt; letter-spacing: 0.5px;">Curriculum Progression</span>
        </div>
        <div style="padding: 6px 10px; display: grid; grid-template-columns: 1fr 1fr; gap: 4px 14px; font-family: 'Inter', sans-serif; font-size: 7.5pt; line-height: 1.25; color: #111; flex: 1; align-content: space-around;">
          <div><strong>L1: Creation of German Empire (1871):</strong> Bismarck, Realpolitik, and Prussian military power.</div>
          <div><strong>L4: Dreadnought &amp; Naval Race:</strong> The Portsmouth revolution and Anglo-German naval fear.</div>
          <div><strong>L2: Franco-Prussian War &amp; Alsace-Lorraine:</strong> French revanche and European division.</div>
          <div><strong>L5: The Rival Alliance System:</strong> Triple Alliance, Triple Entente, and Willy-Nicky cables.</div>
          <div><strong>L3: Scramble for Africa &amp; Weltpolitik:</strong> Imperial rivalry, Morocco crises, and German jealousy.</div>
          <div><strong>L6: The Spark — Sarajevo &amp; July Crisis:</strong> Princip, the Black Hand, and the fatal wrong turn.</div>
        </div>
      </div>

      ${renderFooterStrip(1, revisionQuips[0], 16)}
    </div>
  </div>
`;

  // ====================================================================
  // PAGES 2 & 3: LIVING UNIT TIMELINE (Panoramic Dual-Coding Spread, 6 Milestones)
  // Full-width cards with 48mm open sketchpads (matching CME gold standard)
  // ====================================================================
  html += `
  <!-- PAGE 2: LIVING TIMELINE PART 1 (MILESTONES 1–3) -->
  <div class="page page-container" id="page-2">
    <div class="page-body-full" style="justify-content: space-between;">
      <div>
        <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 4px; display: flex; justify-content: space-between; align-items: baseline;">
          <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 11pt; color: #000000; text-transform: uppercase; font-weight: 900;">
            Living Unit Timeline • Part 1: The Rise of Rivalries (1871–1904)
          </h2>
          <span class="badge">Pages 2–3 Facing Spread</span>
        </div>
        <div style="border-bottom: 1px solid #000; padding-bottom: 2px; margin-bottom: 5px; font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #333; display: flex; justify-content: space-between;">
          <span><strong>How to use this timeline:</strong> As you study each lesson, illustrate the milestone sketchpad with your visual symbol and key notes.</span>
          <span style="font-weight: 700; color: #1e3a8a;">Spine • Facing Left</span>
        </div>
      </div>

      <!-- 3 Full-Width Milestone Cards Filling Height -->
      <div style="display: flex; flex-direction: column; gap: 6px; flex: 1; justify-content: space-between;">
  `;

  timelineMilestones
    .filter((m) => m.page === 2)
    .forEach((m) => {
      html += `
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 5px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between; background: #ffffff;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 9.4pt; color: #000000;">
                ${m.date} &bull; ${m.title}
              </strong>
              <span class="badge" style="font-size: 7pt; padding: 0.5px 5px;">${m.lesson}</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8.4pt; color: #222222; margin: 0 0 2px 0; line-height: 1.25;">
              ${m.summary}
            </p>
          </div>
          <!-- Full-Width Open Sketchpad Canvas -->
          <div style="border-top: 1.2px dashed #000000; min-height: 44mm; flex: 1; background: #fafafa; border-radius: 2px; margin-top: 3px; padding: 4px; display: flex; flex-direction: column; justify-content: flex-end;">
            <span style="font-family: 'Georgia', serif; font-size: 7pt; color: #777; font-style: italic; text-align: right;">${m.sketchPrompt}</span>
          </div>
        </div>
    `;
    });

  html += `
      </div>

      <!-- Compact 1-Line Synthesis Check at Bottom -->
      <div style="border: 1px solid #000; background: #fdfbf7; border-radius: 3px; padding: 2px 8px; margin-top: 3px; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #222; display: flex; justify-content: space-between; align-items: center;">
        <span><strong>Timeline Check:</strong> How did Bismarck's unity in 1871 and the loss of Alsace-Lorraine begin Europe's division into rival camps?</span>
        <span style="font-weight: 700; color: #1e3a8a;">Turn overleaf for Lesson 1 &rarr;</span>
      </div>

      ${renderFooterStrip(2, revisionQuips[1], 16)}
    </div>
  </div>

  <!-- PAGE 3: LIVING TIMELINE PART 2 (MILESTONES 4–6) -->
  <div class="page page-container" id="page-3">
    <div class="page-body-full" style="justify-content: space-between;">
      <div>
        <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 4px; display: flex; justify-content: space-between; align-items: baseline;">
          <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 11pt; color: #000000; text-transform: uppercase; font-weight: 900;">
            Living Unit Timeline • Part 2: Crises &amp; The Road to War (1906–1914)
          </h2>
          <span class="badge">Pages 2–3 Facing Spread</span>
        </div>
        <div style="border-bottom: 1px solid #000; padding-bottom: 2px; margin-bottom: 5px; font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #333; display: flex; justify-content: space-between;">
          <span><strong>How to use this timeline:</strong> As you study each lesson, illustrate the milestone sketchpad with your visual symbol and key notes.</span>
          <span style="font-weight: 700; color: #1e3a8a;">Spine • Facing Right</span>
        </div>
      </div>

      <!-- 3 Full-Width Milestone Cards Filling Height -->
      <div style="display: flex; flex-direction: column; gap: 6px; flex: 1; justify-content: space-between;">
  `;

  timelineMilestones
    .filter((m) => m.page === 3)
    .forEach((m) => {
      html += `
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 5px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between; background: #ffffff;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 9.4pt; color: #000000;">
                ${m.date} &bull; ${m.title}
              </strong>
              <span class="badge" style="font-size: 7pt; padding: 0.5px 5px;">${m.lesson}</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8.4pt; color: #222222; margin: 0 0 2px 0; line-height: 1.25;">
              ${m.summary}
            </p>
          </div>
          <!-- Full-Width Open Sketchpad Canvas -->
          <div style="border-top: 1.2px dashed #000000; min-height: 44mm; flex: 1; background: #fafafa; border-radius: 2px; margin-top: 3px; padding: 4px; display: flex; flex-direction: column; justify-content: flex-end;">
            <span style="font-family: 'Georgia', serif; font-size: 7pt; color: #777; font-style: italic; text-align: right;">${m.sketchPrompt}</span>
          </div>
        </div>
    `;
    });

  html += `
      </div>

      <!-- Compact 1-Line Synthesis Check at Bottom -->
      <div style="border: 1px solid #000; background: #fdfbf7; border-radius: 3px; padding: 2px 8px; margin-top: 3px; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #222; display: flex; justify-content: space-between; align-items: center;">
        <span><strong>Timeline Check:</strong> Why did the naval arms race and the alliance tripwire turn an assassination in Bosnia into a global war?</span>
        <span style="font-weight: 700; color: #1e3a8a;">Use for revision &rarr;</span>
      </div>

      ${renderFooterStrip(3, revisionQuips[2], 16)}
    </div>
  </div>
`;

  // ====================================================================
  // PAGES 4–15: 6 BESPOKE DOUBLE-PAGE ENQUIRY SPREADS
  // ====================================================================
  lessonConfigs.forEach((cfg, idx) => {
    const leftPageNum = idx * 2 + 4;
    const rightPageNum = idx * 2 + 5;

    // ------------------------------------------------------------------
    // LEFT PAGE (VERSO): Evidence & Skills Launch (0 dead space)
    // ------------------------------------------------------------------
    html += `
    <div class="page page-container" id="page-${leftPageNum}">
      <div class="page-body-full" style="justify-content: space-between;">
        <div>
          <!-- Lesson Header -->
          <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 4px; display: flex; justify-content: space-between; align-items: baseline;">
            <div>
              <div style="font-family: 'Inter', sans-serif; font-size: 7.4pt; text-transform: uppercase; letter-spacing: 0.8px; color: #444; font-weight: 800;">
                Unit 9: Causes of the Great War &bull; Lesson ${cfg.lessonNum}
              </div>
              <h2 style="font-family: 'Playfair Display', serif; font-size: 12pt; color: #000000; margin: 1px 0 0 0; font-weight: 900; line-height: 1.15;">
                L${cfg.lessonNum}: ${cfg.title}
              </h2>
            </div>
            <span class="badge">Evidence &amp; Source Skills</span>
          </div>

          <!-- Learning Objectives -->
          <div style="background: #f8fafc; border: 1px solid #000000; border-left: 3.5px solid #000000; border-radius: 3px; padding: 3px 8px; margin-bottom: 4px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase; color: #000; display: block; margin-bottom: 1px;">
              What We Are Learning Today:
            </strong>
            <ul style="margin: 0; padding-left: 14px; font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #222; line-height: 1.25;">
              ${cfg.objectives.map((o) => `<li>${o}</li>`).join('')}
            </ul>
          </div>

          <!-- Task 1: Do Now: Retrieval Practice (5 Questions, Score / 5) -->
          <div class="task-section">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.2px solid #000; padding-bottom: 1px; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 7.6pt; text-transform: uppercase; letter-spacing: 0.5px;">
                Task 1: 'Do Now' Retrieval Practice (5 Prior Recall Questions)
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 800; border: 1px solid #000; padding: 0 5px; border-radius: 2px;">
                Score: [ &nbsp;&nbsp;&nbsp;&nbsp; / 5 ]
              </span>
            </div>
            <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 4px;">
              ${cfg.doNow
                .map(
                  (item, qIdx) => `
                <div style="background: #ffffff; border: 1px solid #000; border-radius: 2px; padding: 3px; display: flex; flex-direction: column; justify-content: space-between;">
                  <div style="font-family: 'Inter', sans-serif; font-size: 6.6pt; line-height: 1.18; color: #000; font-weight: 600; margin-bottom: 1px;">
                    <strong>Q${qIdx + 1}:</strong> ${item.q}
                  </div>
                  <div>
                    <div class="task-line-dotted"></div>
                    <div class="task-line-dotted"></div>
                  </div>
                </div>
              `,
                )
                .join('')}
            </div>
          </div>

          <!-- Task 2: Key Vocabulary -->
          <div class="task-section" style="margin-top: 3px;">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.2px solid #000; padding-bottom: 1px; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 7.6pt; text-transform: uppercase; letter-spacing: 0.5px;">
                Task 2: Key Vocabulary
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; color: #444;">Core Definitions</span>
            </div>
            <div style="font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #111; margin-bottom: 2px; line-height: 1.22;">
              ${cfg.vocabPrompt}
            </div>
            <div class="task-line"></div>
            <div class="task-line"></div>
          </div>
        </div>

        <!-- Task 3: Source Investigation (Expanded to Fill Page Down to Footer) -->
        <div style="border: 1.4px solid #000000; border-radius: 4px; padding: 5px 8px; background: #ffffff; flex: 1; display: flex; flex-direction: column; justify-content: space-between; margin-top: 2px;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.2px solid #000; padding-bottom: 2px; margin-bottom: 3px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; color: #000; text-transform: uppercase;">
                ${cfg.bridgeTask.title}
              </strong>
              <span class="badge" style="font-size: 6.5pt; padding: 0 4px;">Primary Evidence</span>
            </div>
    `;

    // Render bespoke Task 4 content based on lesson
    if (cfg.bridgeTask.type === 'source_annotation') {
      html += `
            <div style="border: 1.2px solid #000; border-left: 3.5px solid #000; background: #fdfbf7; padding: 4px 8px; border-radius: 3px; margin-bottom: 3px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1px;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 7.5pt; text-transform: uppercase;">${cfg.bridgeTask.sourceTitle}</strong>
                <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 700; border: 1px solid #000; padding: 0 4px;">${cfg.bridgeTask.shelfmark}</span>
              </div>
              <div style="font-family: 'Georgia', serif; font-size: 8.4pt; font-style: italic; color: #111; line-height: 1.3; margin: 1px 0;">
                ${cfg.bridgeTask.sourceText}
              </div>
              <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #444; border-top: 1px dotted #999; padding-top: 1px;">
                <strong>Provenance:</strong> ${cfg.bridgeTask.provenance}
              </div>
            </div>

            <!-- Reading Clues Protocol -->
            <div style="background: #f0f9ff; border: 1px solid #000; border-radius: 3px; padding: 2px 6px; margin-bottom: 4px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 7.0pt; text-transform: uppercase; color: #000; display: block; margin-bottom: 1px;">
                Reading Clues:
              </strong>
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 4px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #111; line-height: 1.2;">
                <div>${cfg.bridgeTask.annotations[0]}</div>
                <div>${cfg.bridgeTask.annotations[1]}</div>
                <div>${cfg.bridgeTask.annotations[2]}</div>
              </div>
            </div>
      `;
    } else if (cfg.bridgeTask.type === 'visual_painting') {
      const b64 = getBase64Image(cfg.bridgeTask.imgSrc);
      html += `
            <div style="display: grid; grid-template-columns: 140px 1fr; gap: 8px; border: 1.2px solid #000; border-radius: 3px; padding: 4px; background: #fdfbf7; margin-bottom: 3px;">
              <div style="height: 95px; border: 1px solid #000; overflow: hidden; background: #000;">
                <img src="${b64}" style="width: 100%; height: 100%; object-fit: cover;" alt="La Tache Noire">
              </div>
              <div style="display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <strong style="font-family: 'Inter', sans-serif; font-size: 7.5pt; text-transform: uppercase;">${cfg.bridgeTask.imgCaption}</strong>
                  <p style="font-family: 'Georgia', serif; font-size: 7.8pt; font-style: italic; color: #111; margin: 2px 0; line-height: 1.25;">
                    ${cfg.bridgeTask.sourceText}
                  </p>
                </div>
                <div style="font-family: 'Inter', sans-serif; font-size: 6.6pt; color: #444; border-top: 1px dotted #999; padding-top: 1px;">
                  <strong>Record:</strong> ${cfg.bridgeTask.shelfmark}
                </div>
              </div>
            </div>

            <div style="background: #f0f9ff; border: 1px solid #000; border-radius: 3px; padding: 2px 6px; margin-bottom: 3px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 7.0pt; text-transform: uppercase; color: #000; display: block; margin-bottom: 1px;">Reading Clues:</strong>
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 4px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #111; line-height: 1.2;">
                <div>${cfg.bridgeTask.annotations[0]}</div>
                <div>${cfg.bridgeTask.annotations[1]}</div>
                <div>${cfg.bridgeTask.annotations[2]}</div>
              </div>
            </div>
      `;
    } else if (cfg.bridgeTask.type === 'visual_map') {
      const b64Map = getBase64Image(cfg.bridgeTask.imgSrc);
      html += `
            <div style="display: grid; grid-template-columns: 145px 1fr; gap: 8px; border: 1.2px solid #000; border-radius: 3px; padding: 4px; background: #fdfbf7; margin-bottom: 3px;">
              <div style="height: 100px; border: 1px solid #000; overflow: hidden; background: #fff; display: flex; align-items: center; justify-content: center;">
                <img src="${b64Map}" style="max-width: 100%; max-height: 100%; object-fit: contain;" alt="Scramble for Africa Map">
              </div>
              <div style="display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <strong style="font-family: 'Inter', sans-serif; font-size: 7.5pt; text-transform: uppercase;">${cfg.bridgeTask.imgCaption}</strong>
                  <p style="font-family: 'Georgia', serif; font-size: 7.8pt; font-style: italic; color: #111; margin: 2px 0; line-height: 1.25;">
                    ${cfg.bridgeTask.sourceText}
                  </p>
                </div>
                <div style="font-family: 'Inter', sans-serif; font-size: 6.6pt; color: #444; border-top: 1px dotted #999; padding-top: 1px;">
                  <strong>Record:</strong> ${cfg.bridgeTask.shelfmark}
                </div>
              </div>
            </div>

            <div style="background: #f0f9ff; border: 1px solid #000; border-radius: 3px; padding: 2px 6px; margin-bottom: 3px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 7.0pt; text-transform: uppercase; color: #000; display: block; margin-bottom: 1px;">Reading Clues &amp; Map Protocol:</strong>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2px 6px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #111; line-height: 1.2;">
                ${cfg.bridgeTask.annotations.map((a) => `<div>${a}</div>`).join('')}
              </div>
            </div>
      `;
    } else if (cfg.bridgeTask.type === 'technical_table') {
      html += `
            <div style="border: 1.2px solid #000; border-left: 3.5px solid #000; background: #fdfbf7; padding: 3px 6px; border-radius: 3px; margin-bottom: 2px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 7.4pt; text-transform: uppercase;">${cfg.bridgeTask.sourceTitle}</strong>
                <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 700; border: 1px solid #000; padding: 0 4px;">${cfg.bridgeTask.shelfmark}</span>
              </div>
              <div style="font-family: 'Georgia', serif; font-size: 7.8pt; font-style: italic; color: #111; line-height: 1.25; margin: 1px 0;">
                ${cfg.bridgeTask.sourceText}
              </div>
            </div>

            <!-- Comparison Table -->
            <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif; font-size: 7pt; margin-bottom: 3px; border: 1.2px solid #000;">
              <thead>
                <tr style="background: #f1f5f9; color: #000;">
                  ${cfg.bridgeTask.tableHeaders.map((h, hi) => `<th style="padding: 2.5px 5px; text-align: left; border: 1px solid #000; font-size: 7.2pt; width: ${hi === 0 ? '22%' : '39%'};">${h}</th>`).join('')}
                </tr>
              </thead>
              <tbody>
                ${cfg.bridgeTask.tableRows
                  .map(
                    (r) => `
                  <tr>
                    <td style="padding: 2px 5px; font-weight: 700; border: 1px solid #000; background: #fafafa;">${r[0]}</td>
                    <td style="padding: 2px 5px; border: 1px solid #000;">${r[1]}</td>
                    <td style="padding: 2px 5px; border: 1px solid #000; background: #f0f9ff; font-weight: 600;">${r[2]}</td>
                  </tr>
                `,
                  )
                  .join('')}
              </tbody>
            </table>
      `;
    } else if (cfg.bridgeTask.type === 'willy_nicky_telegrams') {
      html += `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 3px;">
              <div style="border: 1.2px solid #000; border-left: 3.5px solid #000; background: #f8fafc; padding: 3px 6px; border-radius: 3px;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase;">${cfg.bridgeTask.sourceATitle}</strong>
                <p style="font-family: 'Georgia', serif; font-size: 7.6pt; font-style: italic; color: #111; margin: 1px 0; line-height: 1.22;">${cfg.bridgeTask.sourceAText}</p>
                <div style="font-family: 'Inter', sans-serif; font-size: 6.4pt; color: #444;">${cfg.bridgeTask.sourceAShelfmark}</div>
              </div>
              <div style="border: 1.2px solid #000; border-left: 3.5px solid #000; background: #fffaf0; padding: 3px 6px; border-radius: 3px;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase;">${cfg.bridgeTask.sourceBTitle}</strong>
                <p style="font-family: 'Georgia', serif; font-size: 7.6pt; font-style: italic; color: #111; margin: 1px 0; line-height: 1.22;">${cfg.bridgeTask.sourceBText}</p>
                <div style="font-family: 'Inter', sans-serif; font-size: 6.4pt; color: #444;">${cfg.bridgeTask.sourceBShelfmark}</div>
              </div>
            </div>

            <div style="background: #f0f9ff; border: 1px solid #000; border-radius: 3px; padding: 2px 6px; margin-bottom: 3px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 7.0pt; text-transform: uppercase; color: #000; display: block; margin-bottom: 1px;">Reading Clues:</strong>
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 4px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #111; line-height: 1.2;">
                <div>${cfg.bridgeTask.annotations[0]}</div>
                <div>${cfg.bridgeTask.annotations[1]}</div>
                <div>${cfg.bridgeTask.annotations[2]}</div>
              </div>
            </div>
      `;
    } else if (cfg.bridgeTask.type === 'dual_written_sources') {
      html += `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 3px;">
              <!-- Source A Card -->
              <div style="border: 1.2px solid #000; border-left: 3.5px solid #000; background: #fdfbf7; padding: 3px 6px; border-radius: 3px; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1px;">
                    <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase;">${cfg.bridgeTask.sourceATitle}</strong>
                  </div>
                  <p style="font-family: 'Georgia', serif; font-size: 7.4pt; font-style: italic; color: #111; margin: 1px 0; line-height: 1.25;">
                    ${cfg.bridgeTask.sourceAText}
                  </p>
                </div>
                <div style="font-family: 'Inter', sans-serif; font-size: 6.2pt; color: #444; border-top: 1px dotted #999; padding-top: 1px; margin-top: 1px;">
                  <strong>Provenance:</strong> ${cfg.bridgeTask.sourceAProvenance}
                </div>
              </div>

              <!-- Source B Card -->
              <div style="border: 1.2px solid #000; border-left: 3.5px solid #000; background: #fffaf0; padding: 3px 6px; border-radius: 3px; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1px;">
                    <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase;">${cfg.bridgeTask.sourceBTitle}</strong>
                  </div>
                  <p style="font-family: 'Georgia', serif; font-size: 7.4pt; font-style: italic; color: #111; margin: 1px 0; line-height: 1.25;">
                    ${cfg.bridgeTask.sourceBText}
                  </p>
                </div>
                <div style="font-family: 'Inter', sans-serif; font-size: 6.2pt; color: #444; border-top: 1px dotted #999; padding-top: 1px; margin-top: 1px;">
                  <strong>Provenance:</strong> ${cfg.bridgeTask.sourceBProvenance}
                </div>
              </div>
            </div>

            <!-- Reading Clues Protocol -->
            <div style="background: #f0f9ff; border: 1px solid #000; border-radius: 3px; padding: 2px 6px; margin-bottom: 3px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 6.9pt; text-transform: uppercase; color: #000; display: block; margin-bottom: 1px;">
                Reading Clues:
              </strong>
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 4px; font-family: 'Inter', sans-serif; font-size: 6.7pt; color: #111; line-height: 1.2;">
                <div>${cfg.bridgeTask.annotations[0]}</div>
                <div>${cfg.bridgeTask.annotations[1]}</div>
                <div>${cfg.bridgeTask.annotations[2]}</div>
              </div>
            </div>
      `;
    }

    // 2 Substantial Questions with Ruled Lines (Q1: 4 lines, Q2 calibrated to fill to footer)
    html += `
            <div style="margin-top: 2px;">
              <div style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 700; color: #000; margin-bottom: 1px;">
                <strong>Question 1:</strong> ${cfg.bridgeTask.questionA}
              </div>
              ${Array(4).fill('<div class="task-line"></div>').join('\n              ')}
            </div>

            <div style="margin-top: 2px;">
              <div style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 700; color: #000; margin-bottom: 1px;">
                <strong>Question 2:</strong> ${cfg.bridgeTask.questionB}
              </div>
              ${Array(versoQ2Lines[idx]).fill('<div class="task-line"></div>').join('\n              ')}
            </div>
          </div>

          <!-- Helpful Clue & Challenge Question -->
          <div style="border-top: 1px dotted #000; padding-top: 2px; margin-top: 2px; display: flex; justify-content: space-between; font-family: 'Georgia', serif; font-size: 7.2pt;">
            <span style="color: #444; font-style: italic;">${cfg.bridgeTask.clue}</span>
            <span style="color: #000; font-weight: bold;">${cfg.bridgeTask.scholarsEdge}</span>
          </div>
        </div>

        ${renderFooterStrip(leftPageNum, revisionQuips[leftPageNum - 1], 16)}
      </div>
    </div>

    <!-- ------------------------------------------------------------------ -->
    <!-- RIGHT PAGE (RECTO): Extended Enquiry Writing                        -->
    <!-- Zero DIRT box • Timeline Mission Box at foot                       -->
    <!-- ------------------------------------------------------------------ -->
    <div class="page page-container" id="page-${rightPageNum}">
      <div class="page-body-full" style="justify-content: space-between;">
        <div>
          <!-- Enquiry Header -->
          <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 4px; display: flex; justify-content: space-between; align-items: baseline;">
            <div>
              <div style="font-family: 'Inter', sans-serif; font-size: 7.4pt; text-transform: uppercase; letter-spacing: 0.8px; color: #444; font-weight: 800;">
                Unit 9: Causes of the Great War &bull; Lesson ${cfg.lessonNum} &bull; Focus: ${cfg.skill}
              </div>
              <h3 style="font-family: 'Playfair Display', serif; font-size: 11.5pt; color: #000000; margin: 1px 0 0 0; font-weight: 900; line-height: 1.15;">
                Task 4: Extended Enquiry &bull; ${cfg.inquiryQuestion}
              </h3>
            </div>
            <span class="badge">Extended Writing</span>
          </div>

          <!-- 3-Column Planning Matrix with Dotted Planning Lines -->
          <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 6px; background: #fdfbf7; margin-bottom: 3px;">
            <div style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; text-transform: uppercase; color: #000; margin-bottom: 2px; display: flex; justify-content: space-between;">
              <span>Planning Your Answer: 3 Key Arguments</span>
              <span style="color: #555; font-weight: 600;">Draft quick bullet points below &darr;</span>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 4px;">
              ${cfg.structureStrip
                .map(
                  (col) => `
                <div style="border: 1px solid #000; border-radius: 2px; padding: 3px 4px; background: #ffffff;">
                  <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #000; display: block; border-bottom: 1px solid #ddd; padding-bottom: 1px; margin-bottom: 1px;">${col.col}</strong>
                  <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #333; line-height: 1.18; display: block; margin-bottom: 1px;">${col.prompt}</span>
                  <div class="task-line-dotted"></div>
                  <div class="task-line-dotted"></div>
                </div>
              `,
                )
                .join('')}
            </div>
          </div>

          <!-- Key Words & Connectives Strip -->
          <div style="border: 1px solid #000; background: #ffffff; border-radius: 3px; padding: 2px 6px; margin-bottom: 3px; font-family: 'Inter', sans-serif; font-size: 6.8pt; line-height: 1.25;">
            <div><strong>Key Words:</strong> ${cfg.wordBank}</div>
            <div style="border-top: 1px dashed #ccc; padding-top: 1px; margin-top: 1px; color: #444; font-style: italic;">
              <strong>Sentence Starters:</strong> ${cfg.connectives}
            </div>
          </div>

          <!-- Writing Guide (PEEL) -->
          <div style="background: #f8fafc; border: 1px solid #000; border-radius: 2px; padding: 1.5px 6px; margin-bottom: 3px; display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 7.0pt; color: #000;">
            <span><strong>[P] Point:</strong> Clear sentence answering the question.</span>
            <span><strong>[E] Evidence:</strong> Names, dates, battles, and treaties.</span>
            <span><strong>[E] Explain:</strong> How and why this caused tension.</span>
            <span><strong>[L] Link:</strong> Direct conclusion answering enquiry.</span>
          </div>

          <!-- Ruled Writing Lines (${rectoWritingLines[idx]} Full Lines at 7.0mm) -->
          <div style="margin-bottom: 2px;">
            ${Array(rectoWritingLines[idx]).fill('<div class="task-line"></div>').join('\n            ')}
          </div>
        </div>

        <!-- Timeline Mission Box (Connecting Essay back to Pages 2–3) -->
        <div style="border: 1.2px solid #000000; border-left: 3.5px solid #000000; border-radius: 3px; padding: 3px 6px; background: #fdfbf7; margin-top: auto; margin-bottom: 2px;">
          <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-transform: uppercase; color: #000; margin-bottom: 1px;">
            Timeline Mission &bull; Pages 2–3
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 7.6pt; color: #111; line-height: 1.2;">
            ${cfg.timelineMission}
          </div>
        </div>

        ${renderFooterStrip(rightPageNum, revisionQuips[rightPageNum - 1], 16)}
      </div>
    </div>
`;
  });

  // ====================================================================
  // PAGE 16: OUTSIDE BACK COVER (Key Stage 3 Progress & Assessment Tracker & 6-Lesson QR Hub)
  // Master Assessment Tracker matching Gold Standard
  // ====================================================================
  const lessonShortTitles = [
    'German Empire',
    'Alsace-Lorraine',
    'Scramble for Africa',
    'Naval Arms Race',
    'Alliance System',
    'Sarajevo Spark',
  ];

  html += `
  <div class="page page-container" id="page-16">
    <div class="page-body-full" style="justify-content: space-between;">
      
      <!-- Top Branding Strip -->
      <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 3px;" data-department-name="The History Department">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <span class="school-brand-target" style="font-family: 'Inter', sans-serif; font-size: 11pt; font-weight: 900; letter-spacing: 2px; text-transform: uppercase;">The History Department</span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; letter-spacing: 1px; text-transform: uppercase;">Pupil Assessment Record</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-top: 1px; border-top: 1px solid #000; padding-top: 2px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase; color: #222;">KEY STAGE 3 HISTORY &bull; UNIT 9: CAUSES OF THE GREAT WAR (1871–1914)</span>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800;">OUTSIDE BACK COVER</span>
        </div>
      </div>

      <!-- Header & Target Grade Strip -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 3px 8px; background: #ffffff; display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px;">
        <div style="display: flex; align-items: baseline; gap: 8px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; text-transform: uppercase;">Pupil:</span>
          <span style="border-bottom: 1.2px solid #000; width: 140px; display: inline-block;"></span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; text-transform: uppercase; margin-left: 6px;">Class:</span>
          <span style="border-bottom: 1.2px solid #000; width: 60px; display: inline-block;"></span>
        </div>
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="display: flex; align-items: center; gap: 4px;">
            <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-transform: uppercase;">Target Level:</span>
            <span style="border: 1.2px solid #000; border-radius: 2px; padding: 1px 8px; font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; min-width: 60px; text-align: center;">&nbsp;</span>
          </div>
          <div style="display: flex; align-items: center; gap: 4px;">
            <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-transform: uppercase;">Target GCSE:</span>
            <span style="border: 1.2px solid #000; border-radius: 2px; padding: 1px 6px; font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; min-width: 32px; text-align: center;">&nbsp;</span>
          </div>
        </div>
      </div>

      <!-- KS3 Attainment Criteria & Effort Scale Box -->
      <table style="width: 100%; border-collapse: collapse; text-align: left; font-family: 'Inter', sans-serif; font-size: 6.7pt; line-height: 1.2; margin-bottom: 3px; border: 1.2px solid #000;">
        <tbody>
          <tr style="background: #1e3a8a; color: #fff;">
            <td style="border: 1px solid #000; padding: 2.5px 5px; font-weight: 800; width: 12%; text-transform: uppercase; letter-spacing: 0.5px;">KS3 Pathway</td>
            <td style="border: 1px solid #000; padding: 2.5px 5px; width: 17.6%; background: #f8fafc; color: #000;"><strong>Emerging (1–2):</strong> Recalls isolated facts; basic descriptive narrative.</td>
            <td style="border: 1px solid #000; padding: 2.5px 5px; width: 17.6%; background: #ffffff; color: #000;"><strong>Emerging+ (3):</strong> Identifies causes &amp; features with basic explanation.</td>
            <td style="border: 1px solid #000; padding: 2.5px 5px; width: 17.6%; background: #f8fafc; color: #000;"><strong>Expected (4–5):</strong> Structured PEEL writing; supports with specific evidence.</td>
            <td style="border: 1px solid #000; padding: 2.5px 5px; width: 17.6%; background: #ffffff; color: #000;"><strong>Expected+ (6–7):</strong> Detailed causation; balances competing factors.</td>
            <td style="border: 1px solid #000; padding: 2.5px 5px; width: 17.6%; background: #f8fafc; color: #000;"><strong>Greater Depth (8–9):</strong> Nuanced historical judgements; evaluates provenance &amp; interpretations.</td>
          </tr>
          <tr style="background: #0f172a; color: #fff;">
            <td style="border: 1px solid #000; padding: 2px 5px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;">Effort Rubric</td>
            <td style="border: 1px solid #000; padding: 2px 5px; background: #fff; color: #111;"><strong>1 • Concern:</strong> Disengaged or incomplete work.</td>
            <td style="border: 1px solid #000; padding: 2px 5px; background: #fafafa; color: #111;"><strong>2 • Inconsistent:</strong> Needs repeated teacher prompts.</td>
            <td style="border: 1px solid #000; padding: 2px 5px; background: #fff; color: #111;"><strong>3 • Satisfactory:</strong> Meets baseline expectations.</td>
            <td style="border: 1px solid #000; padding: 2px 5px; background: #fafafa; color: #111;"><strong>4 • Good:</strong> Proactive focus &amp; thoughtful work.</td>
            <td style="border: 1px solid #000; padding: 2px 5px; background: #fff; color: #111;"><strong>5 • Exemplary:</strong> Exceptional scholarship &amp; pride.</td>
          </tr>
        </tbody>
      </table>

      <!-- Master Assessment Tracking Ledger Table (6 Lessons) -->
      <div style="border: 1.4px solid #000000; border-radius: 4px; overflow: hidden; margin-bottom: 3px;">
        <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif; font-size: 7.1pt;">
          <thead>
            <tr style="border-bottom: 1.5px solid #000000; background: #1e3a8a; color: #ffffff;">
              <th style="padding: 3px 5px; width: 26px; text-align: center; font-size: 7.4pt; font-weight: 900; border-right: 1px solid rgba(255,255,255,0.4);">#</th>
              <th style="padding: 3px 6px; text-align: left; font-size: 7.4pt; font-weight: 900; text-transform: uppercase; border-right: 1px solid rgba(255,255,255,0.4); width: 42%;">Lesson Enquiry Title</th>
              <th style="padding: 3px 4px; width: 68px; text-align: center; font-size: 7.2pt; font-weight: 900; border-right: 1px solid rgba(255,255,255,0.4);">Effort (1–5)</th>
              <th style="padding: 3px 4px; width: 85px; text-align: center; font-size: 7.2pt; font-weight: 900; border-right: 1px solid rgba(255,255,255,0.4);">Attainment Level</th>
              <th style="padding: 3px 6px; text-align: left; font-size: 7.2pt; font-weight: 900; text-transform: uppercase;">Teacher Formative Feedback &amp; Next Steps</th>
            </tr>
          </thead>
          <tbody>
            ${lessonConfigs
              .map(
                (l, idx) => `
              <tr style="border-bottom: 1px solid #000000; background: ${idx % 2 === 1 ? '#f8fafc' : '#ffffff'};">
                <td style="padding: 3px 4px; border-right: 1px solid #000; text-align: center; font-weight: 800; color: #1e3a8a;">L${l.lessonNum}</td>
                <td style="padding: 3px 6px; border-right: 1px solid #000; font-weight: 600; line-height: 1.15;">
                  ${l.title}
                </td>
                <td style="padding: 3px 4px; border-right: 1px solid #000; text-align: center; font-weight: 700;"></td>
                <td style="padding: 3px 4px; border-right: 1px solid #000; text-align: center; font-weight: 700;"></td>
                <td style="padding: 3px 6px;"></td>
              </tr>
            `,
              )
              .join('')}
            <tr style="background: #e2e8f0; font-weight: 900; border-top: 1.5px solid #000000;">
              <td colspan="2" style="padding: 3.5px 6px; border-right: 1px solid #000; text-transform: uppercase; font-size: 7.3pt; color: #0f172a;">
                Unit Summative Outcome &bull; Target Standard Met?
              </td>
              <td style="padding: 3.5px 4px; border-right: 1px solid #000; text-align: center; font-size: 7.4pt; background: #ffffff;"></td>
              <td style="padding: 3.5px 4px; border-right: 1px solid #000; text-align: center; font-size: 7.4pt; background: #ffffff;"></td>
              <td style="padding: 3.5px 6px; font-size: 6.8pt; background: #ffffff;">
                Teacher Sign: ________________________ &bull; Date: ___/___/2026
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Teacher Feedback: WWW & EBI (Compact 2 Full Lines each) -->
      <div style="border: 1.4px solid #000000; border-radius: 4px; padding: 3px 8px; background: #ffffff; margin-bottom: 3px;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000000; padding-bottom: 1px; margin-bottom: 2px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.4pt; text-transform: uppercase; color: #000;">
            Overall Unit Formative Feedback &amp; Academic Guidance
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 700; color: #444;">KEY STAGE 3 MASTERY</span>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
          <div>
            <strong style="font-family: 'Inter', sans-serif; font-size: 6.9pt; text-transform: uppercase; color: #000; display: block; margin-bottom: 1px;">
              What Went Well (WWW):
            </strong>
            <div class="task-line" style="height: 5.5mm;"></div>
            <div class="task-line" style="height: 5.5mm;"></div>
          </div>
          <div>
            <strong style="font-family: 'Inter', sans-serif; font-size: 6.9pt; text-transform: uppercase; color: #000; display: block; margin-bottom: 1px;">
              Even Better If (EBI):
            </strong>
            <div class="task-line" style="height: 5.5mm;"></div>
            <div class="task-line" style="height: 5.5mm;"></div>
          </div>
        </div>
      </div>

      <!-- Revision QR Hub & Digital Quizzing (6 Individual Lesson QR Cards) -->
      <div style="border: 1.4px solid #000; border-radius: 4px; padding: 4px 6px; background: #fdfbf7;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000; padding-bottom: 2px; margin-bottom: 4px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.4pt; text-transform: uppercase;">
            Digital Revision &amp; Interactive Quizzing Hub &bull; 6 Lesson QR Codes (60 Total Questions)
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.6pt; font-weight: 700; color: #444;">Scan with Mobile / Tablet</span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 4px;">
          ${lessonConfigs
            .map((cfg, i) => {
              const lNum = cfg.lessonNum;
              const lUrl = `https://the-history-revision-hub.netlify.app/?view=lessons&unit=great_war&lesson=${lNum}`;
              const lQr = generateQrSvg(lUrl);
              return `
            <div class="qr-card" style="border: 1px solid #000; border-radius: 3px; background: #ffffff; padding: 3px 2px; display: flex; flex-direction: column; align-items: center; text-align: center; justify-content: space-between;">
              <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 900; text-transform: uppercase;">Lesson ${lNum}</span>
              <span style="font-family: 'Inter', sans-serif; font-size: 5.5pt; color: #333; line-height: 1.1; margin-bottom: 2px; font-weight: 600;">${lessonShortTitles[i]}</span>
              <div style="width: 17mm; height: 17mm; margin: 1px 0;">
                ${lQr}
              </div>
              <span style="font-family: 'Inter', sans-serif; font-size: 5.5pt; color: #555; text-transform: uppercase; font-weight: 700;">Scan to Quiz</span>
              <div style="font-family: 'Inter', sans-serif; font-size: 6.2pt; font-weight: 800; border-top: 1px dotted #ccc; width: 100%; padding-top: 1px; margin-top: 1px;">
                Score: [ &nbsp; / 10 ]
              </div>
            </div>
          `;
            })
            .join('')}
        </div>
      </div>

      ${renderFooterStrip(16, revisionQuips[15], 16)}
    </div>
  </div>
`;

  html += `
</body>
</html>
`;

  return html;
}

/**
 * Main rendering routine (HTML + Puppeteer PDF export)
 */
async function renderGreatWarTwoPageWorkbook() {
  console.log('🚀 Rendering Staged V2 Two-Page Workbook for Causes of the Great War...');
  const html = buildGreatWarTwoPageWorkbookHtml();

  const outHtmlPath = path.join(ROOT_DIR, 'public', 'units', 'great_war', 'pupil_workbook_v2.html');
  fs.writeFileSync(outHtmlPath, html, 'utf8');
  console.log(`✅ Staged HTML generated at: ${outHtmlPath}`);

  console.log('🖨️ Compiling PDF via Puppeteer...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });
  await page.setContent(html, { waitUntil: 'networkidle0', timeout: 60000 });

  const outPdfPath = path.join(ROOT_DIR, 'public', 'pdfs', 'great_war_pupil_workbook_V2.pdf');
  await page.pdf({
    path: outPdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '10mm', bottom: '10mm', left: '10mm', right: '10mm' },
  });

  await browser.close();
  const pdfStats = fs.statSync(outPdfPath);
  console.log(
    `🎉 Masterpiece Staged PDF successfully compiled: ${outPdfPath} (${(pdfStats.size / 1024).toFixed(1)} KB)`,
  );
}

if (require.main === module) {
  renderGreatWarTwoPageWorkbook().catch((err) => {
    console.error('❌ Error rendering Great War Two-Page Workbook:', err);
    process.exit(1);
  });
}

module.exports = {
  renderGreatWarTwoPageWorkbook,
  buildGreatWarTwoPageWorkbookHtml,
};
