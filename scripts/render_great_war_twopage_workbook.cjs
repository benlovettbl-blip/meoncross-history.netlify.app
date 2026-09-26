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
    skill: 'Change & Continuity',
    title: 'How was the German Empire created in 1871?',
    inquiryQuestion:
      'To what extent was the creation of the German Empire in 1871 a complete turning point in European peace?',
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
      'Understand how the new German Empire in 1871 shattered the old balance of power.',
    ],
    vocabPrompt:
      'Explain the difference between <strong>Realpolitik</strong> (practical politics based on power) and <strong>Liberalism</strong> (rule of law and elected parliaments):',
    bridgeTask: {
      type: 'source_annotation',
      title: 'Task 3: Evidence Preparation — Bismarck’s Statecraft & The 1871 Geopolitical Rupture',
      sourceTitle: 'Source A: Bismarck speaks to the Prussian Parliament (September 1862)',
      shelfmark: 'PRUSSIAN STATE ARCHIVES • BERLIN',
      sourceText:
        '“Prussia’s borders according to the Vienna treaties are not favorable to a healthy state life. Not by speeches and majority decisions will the great questions of the day be decided—that was the great mistake of 1848 and 1849—but by iron and blood.”',
      provenance:
        'Minister-President Otto von Bismarck addressing the Budget Committee in Berlin, 1862.',
      annotations: [
        '① <strong>Underline:</strong> words showing Bismarck rejected parliamentary democracy.',
        '② <strong>Circle:</strong> the phrase describing the old 1815 Vienna borders.',
        '③ <strong>Box:</strong> the two words Bismarck said would decide the future.',
      ],
      questionA:
        'What does Source A reveal about why Bismarck chose military force over democracy to unify Germany?',
      questionB:
        'How did the sudden emergence of a unified, industrialized Germany in 1871 overturn the European balance of power?',
      clue: 'Helpful Clue: Before 1871, Central Europe was fragmented and weak. Suddenly, 41 million people and Krupp steel formed a dominant military giant.',
      scholarsEdge:
        'Challenge Question: Did 1871 represent a total break with the past, or was Bismarck continuing long-standing Prussian militarism?',
    },
    structureStrip: [
      {
        col: '1. PRE-1871 BALANCE',
        prompt:
          'Fragmented German states, Vienna settlement, and British/French continental security.',
      },
      {
        col: '2. THE 1871 RUPTURE',
        prompt:
          'Blood and iron, Krupp artillery, seizing Alsace-Lorraine, and the 41m industrial powerhouse.',
      },
      {
        col: '3. YOUR CONCLUSION',
        prompt:
          'Judge whether 1871 was a total turning point or if monarchical rule and diplomacy continued.',
      },
    ],
    wordBank:
      'Realpolitik • Blood and Iron • Balance of Power • Otto von Bismarck • Franco-Prussian War • Hall of Mirrors • Turning point',
    connectives:
      'Before 1871, European peace rested on... • However, the creation of the German Empire was a turning point because... • On the other hand, certain continuities remained, such as... • In conclusion, 1871 was...',
    timelineMission:
      'Turn to Pages 2–3 (Milestone 1: 1871). In the sketchpad, draw Bismarck’s Prussian helmet or the German imperial eagle, and label the proclamation at Versailles.',
  },

  {
    // Lesson 2: Franco-Prussian War & Alsace-Lorraine (1871)
    lessonNum: 2,
    skill: 'Dual-Source Utility',
    title: 'How did the Franco-Prussian War create a lasting legacy of hatred?',
    inquiryQuestion:
      'How useful are Sources A and B for an enquiry into why the annexation of Alsace-Lorraine made lasting peace impossible?',
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
      title: 'Task 3: Forensic Source Interrogation — French Grief vs German Military Rationale',
      imgSrc: '/images/la_tache_noire_1887.jpg',
      imgCaption: 'Source A: Albert Bettannier, "La Tache Noire" (1887)',
      sourceText:
        '“In French schoolrooms after 1871, maps showed Alsace-Lorraine shaded black in mourning. Boys were drilled in gymnastics and rifle handling, taught that their sacred duty was to win back the lost provinces.”',
      shelfmark: 'FRENCH MINISTRY OF EDUCATION • 1882 ARCHIVE',
      sourceBTitle: 'Source B: Otto von Bismarck on the Annexation (1871)',
      sourceBShelfmark: 'PRUSSIAN STATE ARCHIVE • BERLIN DISPATCH',
      sourceBText:
        '“We take Alsace and northern Lorraine not to add territory, but as a defensive glacis and shield against France. For centuries, French armies have invaded Germany through Metz. By holding these fortresses, we secure our borders against future attack.”',
      annotations: [
        '① <strong>Underline:</strong> in Source A, what the schoolmaster is pointing to on the classroom map.',
        '② <strong>Circle:</strong> in Source B, the phrase Bismarck uses to justify taking the provinces ("defensive glacis and shield").',
        '③ <strong>Box:</strong> in Source B, why Prussian generals insisted on holding the border fortresses.',
      ],
      questionA:
        'What does Source A reveal about how French schoolboys were educated to view Germany after 1871?',
      questionB:
        'How does Source B explain Germany’s military justification for seizing the border provinces?',
      clue: 'Helpful Clue: Source A reveals deep emotional grief and national desire for revenge, while Source B shows cold military calculation and strategic fear.',
      scholarsEdge:
        'Challenge Question: How do both sources together prove that neither France nor Germany could ever feel truly secure after 1871?',
    },
    structureStrip: [
      {
        col: '1. SOURCE A UTILITY',
        prompt:
          'What Source A shows (revanche, mourning maps, military drills), who created it, and its value/limits.',
      },
      {
        col: '2. SOURCE B UTILITY',
        prompt:
          'What Source B reveals (Bismarck’s defensive buffer, fear of French invasion), and its value/limits.',
      },
      {
        col: '3. EVALUATIVE VERDICT',
        prompt:
          'Conclude: how useful are both sources together in explaining why lasting peace became impossible?',
      },
    ],
    wordBank:
      'Revanche • Alsace-Lorraine • Treaty of Frankfurt • Siege of Paris • indemnity • Albert Bettannier • buffer zone • utility',
    connectives:
      'Source A is useful for investigating French attitudes because... • However, its value is limited because it represents... • In contrast, Source B is valuable for understanding German strategy because... • Together, both sources prove...',
    timelineMission:
      'Turn to Pages 2–3 (Milestone 2: 1871). In the sketchpad, sketch the map of France with the shaded black border provinces of Alsace and Lorraine.',
  },

  {
    // Lesson 3: The Scramble for Africa & Weltpolitik
    lessonNum: 3,
    skill: 'Historical Interpretations',
    title: 'How did imperialism and the "Scramble for Africa" fuel European rivalry?',
    inquiryQuestion:
      'Which interpretation better explains why European powers clashed over Africa between 1884 and 1911?',
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
      type: 'dual_written_sources',
      title:
        'Task 3: Historiographical Analysis — View A (Economic Greed) vs View B (National Status)',
      sourceATitle: 'Interpretation 1: View A (Economic Greed & Resource Clashes)',
      sourceAShelfmark: 'HISTORICAL PERSPECTIVE • ECONOMIC COMPETITION',
      sourceAText:
        '“European powers carved up Africa primarily out of economic greed. As factories expanded in Britain, France, and Germany, industrialists desperately needed raw materials—rubber, copper, cotton, and palm oil—that Europe could not produce. Clashes like the Moroccan crises occurred because capitalist rivals fought to monopolize overseas markets and mineral wealth.”',
      sourceAProvenance:
        'Economic interpretation focusing on industrial resource hunger and trade competition.',
      sourceBTitle: 'Interpretation 2: View B (National Status, Pride & Diplomacy)',
      sourceBShelfmark: 'HISTORICAL PERSPECTIVE • DIPLOMACY & STATUS',
      sourceBText:
        '“The scramble for Africa was driven by prestige and Great Power diplomacy rather than financial profit. Most colonies cost far more to govern than they ever made in trade. For Kaiser Wilhelm II, demanding a ‘place in the sun’ was about national pride—proving that Germany was a world superpower. Clashes in Africa were diplomatic tests of European alliances.”',
      sourceBProvenance:
        'Diplomatic interpretation focusing on imperial prestige, national pride, and testing alliances.',
      annotations: [
        '① <strong>Underline:</strong> in View A, the raw materials European factories desperately needed.',
        '② <strong>Circle:</strong> in View B, what Kaiser Wilhelm II demanded for Germany ("place in the sun").',
        '③ <strong>Box:</strong> in View B, why colonies often lost money rather than returning a profit.',
      ],
      questionA:
        'Using View A, explain why economic competition for raw materials made European rivals clash:',
      questionB:
        'Using View B, explain why national prestige and testing alliances were more important than profit:',
      clue: 'Helpful Clue: Notice that most German colonies lost money, yet Kaiser Wilhelm still provoked crises in Morocco to prove Germany was a great power.',
      scholarsEdge:
        'Challenge Question: Can economic greed and national prestige be separated, or did European leaders use national pride to disguise commercial greed?',
    },
    structureStrip: [
      {
        col: '1. VIEW A: ECONOMIC GREED',
        prompt:
          'Raw materials (rubber, copper, oil), industrial factory needs, and commercial trade rivalry.',
      },
      {
        col: '2. VIEW B: NATIONAL STATUS',
        prompt:
          'Wilhelm II demanding a "place in the sun", national pride, and testing the Entente in Morocco.',
      },
      {
        col: '3. EVALUATIVE VERDICT',
        prompt:
          'Which interpretation provides a more convincing explanation of imperial tension and why?',
      },
    ],
    wordBank:
      'Imperialism • Scramble for Africa • Weltpolitik • "Place in the Sun" • raw materials • national prestige • Moroccan Crises • interpretation',
    connectives:
      'View A argues that imperial clashes were driven by economic competition because... • In contrast, View B emphasizes national pride, arguing that... • Evidence supporting View B includes... • In conclusion, I find View [A/B] more convincing because...',
    timelineMission:
      'Turn to Pages 2–3 (Milestone 3: 1898–1904). In the sketchpad, sketch the African continent with British and French flags overshadowing Germany’s tiny colonies.',
  },

  {
    // Lesson 4: HMS Dreadnought & The Naval Arms Race
    lessonNum: 4,
    skill: 'Causation & Causal Hierarchy',
    title: 'How did the launch of HMS Dreadnought trigger a naval arms race?',
    inquiryQuestion:
      'Was the naval arms race the primary reason Britain ended its "Splendid Isolation" to ally with France and Russia?',
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
      title: 'Task 3: Evidence Preparation — The Battleship Revolution & Naval Construction (1906)',
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
        'Using the table, explain why HMS Dreadnought gave Germany a chance to challenge British naval supremacy:',
      questionB:
        'Why did Britain view Germany’s battle fleet construction as a deadly threat to its national survival?',
      clue: 'Helpful Clue: Britain is an island reliant on imported food; a hostile fleet in the North Sea could starve Britain within weeks, whereas Germany was a land power.',
      scholarsEdge:
        'Challenge Question: Did Tirpitz’s Risk Theory work, or did it make Germany’s nightmare of British hostility come true?',
    },
    structureStrip: [
      {
        col: '1. THE NAVAL THREAT',
        prompt:
          'Dreadnought, Tirpitz’s Risk Fleet, British food imports, and invasion panic ("We want eight!").',
      },
      {
        col: '2. OTHER PRESSURES',
        prompt:
          'German industrial export boom, Berlin-to-Baghdad railway, and bullying tactics in Morocco.',
      },
      {
        col: '3. CAUSAL HIERARCHY',
        prompt:
          'Judge whether the naval race was the primary cause of Britain allying with France/Russia, or a secondary factor.',
      },
    ],
    wordBank:
      'HMS Dreadnought • Two-Power Standard • Admiral Fisher • Admiral Tirpitz • Risk Theory • Splendid Isolation • Entente Cordiale • naval arms race',
    connectives:
      'The most critical factor pushing Britain away from isolation was... • For example, the naval challenge... • However, other factors also alarmed Britain, including... • In conclusion, I judge that the naval race was [primary / secondary] because...',
    timelineMission:
      'Turn to Pages 2–3 (Milestone 4: 1906). In the sketchpad, draw the silhouette of HMS Dreadnought with its big gun turrets pointing forward.',
  },

  {
    // Lesson 5: The Alliance System & Willy-Nicky Telegrams
    lessonNum: 5,
    skill: 'Significance & Inevitability',
    title: 'How did rival alliances and secret treaties divide Europe into two armed camps?',
    inquiryQuestion:
      'Did the European alliance system preserve peace between the Great Powers, or make a general war inevitable?',
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
      title: 'Task 3: Archival Interrogation — The "Willy-Nicky" Telegrams & Alliance Clauses',
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
        col: '1. THE PEACEKEEPER CASE',
        prompt:
          'Deterrence, balance of power for over twenty years, and leaders using diplomacy during crises.',
      },
      {
        col: '2. THE INEVITABLE TRIPWIRE',
        prompt:
          'Secret agreements, military staff talks, and the domino effect of rigid railway mobilization plans.',
      },
      {
        col: '3. EVALUATIVE VERDICT',
        prompt:
          'Did alliances successfully keep peace for decades, or did they make a general world war unavoidable?',
      },
    ],
    wordBank:
      'Triple Alliance • Triple Entente • Willy-Nicky telegrams • Entente Cordiale • mobilization • tripwire • balance of power • deterrence',
    connectives:
      'Defenders of the alliance system argue that it kept the peace because... • However, critics argue it acted as an inevitable tripwire because... • The Willy-Nicky telegrams prove that... • Therefore, I conclude that...',
    timelineMission:
      'Turn to Pages 2–3 (Milestone 5: 1908–1914). In the sketchpad, draw the two opposing flags (Union Jack / Tricolour vs German Eagle) connected by chains.',
  },

  {
    // Lesson 6: The Spark — Sarajevo & The July Crisis (1914)
    lessonNum: 6,
    skill: 'Synoptic Causation',
    title: 'How did an assassination in Sarajevo trigger the outbreak of the First World War?',
    inquiryQuestion:
      'Could the First World War have been avoided after the shots in Sarajevo, or had decades of M-A-I-N tension made conflict inevitable?',
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
      title: 'Task 3: Dual Evidence — Eyewitness in Sarajevo & The German Blank Cheque',
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
        col: '1. THE SARAJEVO SPARK',
        prompt:
          'Princip, the Black Hand, the failed bomb, and the stalled car outside Schiller’s Delicatessen.',
      },
      {
        col: '2. THE JULY CRISIS & M-A-I-N',
        prompt:
          'The Blank Cheque (5 July), Austria’s harsh ultimatum to Serbia, and Russia mobilizing to protect Slavs.',
      },
      {
        col: '3. SYNOPTIC VERDICT',
        prompt:
          'Judge whether the spark in Sarajevo created the war, or if decades of M-A-I-N tension made an explosion inevitable.',
      },
    ],
    wordBank:
      'Sarajevo • Gavrilo Princip • Black Hand • Franz Ferdinand • Blank Cheque • Ultimatum • Schlieffen Plan • Belgium • 4 August 1914',
    connectives:
      'The immediate trigger occurred when... • However, this localized crisis escalated because... • Without the Blank Cheque... • Ultimately...',
    timelineMission:
      'Turn to Pages 2–3 (Milestone 6: 1914). In the sketchpad, sketch Gavrilo Princip’s Browning pistol, the royal car, or a row of falling dominoes.',
  },
];

// Calibrated Line Counts per lesson spread to eliminate all dead-space voids
// Verso: Q1 = 4 lines; Q2 fills remaining height to clue footer (gap <= 20px)
const versoQ2Lines = [14, 12, 12, 12, 12, 10];
// Recto: Essay writing lines docking directly above Timeline Mission box (gap <= 20px)
const rectoWritingLines = [27, 27, 27, 27, 27, 26];

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
  const coverImg = getBase64Image('/images/great_war_cover.jpg');

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
  <div class="page page-container" id="page-1" style="padding: 10px 14px 10px 14px; border: 1.5px solid #0f172a; border-radius: 4px; justify-content: space-between;">
    <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0;">
      <div>
        <div style="border-bottom: 2px solid #0f172a; padding-bottom: 2px; margin-bottom: 3px;" data-department-name="The History Department">
          <div style="display: flex; justify-content: space-between; align-items: baseline;">
            <span class="school-brand-target" style="font-family: 'Inter', sans-serif; font-size: 11.5pt; font-weight: 900; letter-spacing: 2px; text-transform: uppercase; color: #0f172a;">The History Department</span>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 800; letter-spacing: 0.8px; text-transform: uppercase; color: #475569;">Key Stage 3 Historical Studies</span>
          </div>
        </div>

        <!-- Pupil Information Strip (At Top under Department Header, with Micro QR Hub Badge) -->
        <div style="border: 1.2px solid #0f172a; border-radius: 4px; padding: 2.5px 8px; background: #ffffff; margin-bottom: 3px; display: flex; align-items: center; justify-content: space-between; gap: 12px;">
          <div style="display: flex; align-items: baseline; flex: 2;">
            <strong style="font-family: 'Inter', sans-serif; text-transform: uppercase; font-size: 7.2pt; color: #0f172a; width: 42px;">Name:</strong>
            <div style="flex: 1; border-bottom: 1.4px solid #0f172a; height: 11px;"></div>
          </div>
          <div style="display: flex; align-items: baseline; flex: 1.2;">
            <strong style="font-family: 'Inter', sans-serif; text-transform: uppercase; font-size: 7.2pt; color: #0f172a; width: 40px;">Class:</strong>
            <div style="flex: 1; border-bottom: 1.4px solid #0f172a; height: 11px;"></div>
          </div>
          <div style="display: flex; align-items: baseline; flex: 1.6;">
            <strong style="font-family: 'Inter', sans-serif; text-transform: uppercase; font-size: 7.2pt; color: #0f172a; width: 52px;">Teacher:</strong>
            <div style="flex: 1; border-bottom: 1.4px solid #0f172a; height: 11px;"></div>
          </div>
          <!-- Micro QR Hub Badge -->
          <div style="border-left: 1px solid #cbd5e1; padding-left: 8px; display: flex; align-items: center; gap: 6px; flex-shrink: 0;">
            <div style="width: 26px; height: 26px; flex-shrink: 0; border: 1px solid #0f172a; border-radius: 2px; padding: 1px; background: #ffffff;">
              ${generateQrSvg('https://the-history-revision-hub.netlify.app/?unit=great_war')}
            </div>
            <div style="font-family: 'Inter', sans-serif; text-align: left; line-height: 1.1;">
              <span style="display: block; font-size: 5.5pt; font-weight: 900; text-transform: uppercase; color: #1e3a8a; letter-spacing: 0.3px;">Revision Hub</span>
              <span style="display: block; font-size: 4.8pt; font-weight: 700; color: #64748b; text-transform: uppercase;">Scan To Launch</span>
            </div>
          </div>
        </div>

        <!-- Unit Title & Overarching Enquiry Box -->
        <div style="border: 1.4px solid #0f172a; border-radius: 4px; padding: 3px 8px; background: #ffffff; margin-bottom: 3px;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 1.5px;">
            <span style="background: #1e3a8a; color: #ffffff; font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; padding: 1px 6px; border-radius: 2px; text-transform: uppercase; letter-spacing: 0.8px;">
              Year 9 Enquiry
            </span>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: #334155;">
              M-A-I-N CAUSES, IMPERIAL CRISES, NAVAL ARMS RACE &amp; THE JULY CRISIS
            </span>
          </div>
          <h1 style="font-family: 'Playfair Display', serif; font-size: 14pt; margin: 1px 0; font-weight: 900; line-height: 1.15; color: #0f172a;">
            CAUSES OF THE GREAT WAR (1871–1914)
          </h1>
          <div style="font-family: 'Georgia', serif; font-size: 8.0pt; color: #1e293b; font-style: italic; line-height: 1.2;">
            Overarching Enquiry: “How did decades of imperial rivalry, dreadnoughts, and alliances culminate in thirty-seven days of madness?”
          </div>
        </div>

        <!-- Hero Photo Plate (Full Uncropped Primary Source Presentation) -->
        <div style="border: 1.4px solid #0f172a; border-radius: 4px; overflow: hidden; background: #ffffff; margin-bottom: 3px; display: flex; flex-direction: column;">
          <div style="height: 48mm; background: #0f172a; display: flex; justify-content: center; align-items: center; overflow: hidden; padding: 2px 0;">
            <img src="${coverImg}" alt="Causes of the Great War" style="width: 100%; height: 100%; object-fit: contain; object-position: center center; display: block;">
          </div>
          <div style="border-top: 1.2px solid #0f172a; padding: 2px 8px; background: #f8fafc;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 900; text-transform: uppercase; color: #1e3a8a;">
                Primary Visual Plate &bull; 28 June 1914
              </span>
              <span style="font-family: 'Inter', sans-serif; font-size: 6.4pt; font-weight: 900; background: #0f172a; color: #ffffff; padding: 1px 5px; border-radius: 2px;">
                AUSTRIAN STATE ARCHIVES &bull; SARAJEVO
              </span>
            </div>
            <div style="font-family: 'Playfair Display', serif; font-size: 8.5pt; font-weight: 800; line-height: 1.15; margin: 1px 0; color: #0f172a;">
              The Arrest of Gavrilo Princip Moments After Firing the Fatal Shots
            </div>
            <div style="font-family: 'Georgia', serif; font-size: 6.6pt; color: #334155; line-height: 1.15;">
              Austrian gendarmes struggle with 19-year-old Serbian nationalist Gavrilo Princip outside Schiller's Delicatessen on Franz Josef Street, Sarajevo, moments after the fatal shots that ignited the July Crisis.
            </div>
          </div>
        </div>

        <!-- The 6 Historical Enquiries (Curriculum Roadmap) -->
        <div style="border: 1.4px solid #0f172a; border-radius: 4px; overflow: hidden; background: #ffffff; margin-bottom: 3px;">
          <div style="background: #0f172a; color: #ffffff; padding: 2px 8px; font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.8px; display: flex; justify-content: space-between; align-items: center;">
            <span>The 6 Historical Enquiries Across This Unit &bull; Knowledge Checklist</span>
            <span style="font-size: 6.6pt; letter-spacing: 0.5px; color: #94a3b8;">1871–1914</span>
          </div>
          <div style="padding: 3px 5px; display: grid; grid-template-columns: 1fr 1fr; gap: 2.5px 6px; font-family: 'Inter', sans-serif; background: #ffffff;">
            <!-- Enquiry 1 -->
            <div style="border: 1px solid #cbd5e1; border-left: 3px solid #1e3a8a; border-radius: 3px; padding: 2.5px 4.5px; background: #f8fafc; display: flex; flex-direction: column; justify-content: space-between;">
              <div style="margin-bottom: 1px;">
                <div style="display: flex; align-items: center; margin-bottom: 1px;">
                  <span style="background: #1e3a8a; color: #ffffff; font-family: 'Inter', sans-serif; font-size: 6.4pt; font-weight: 800; padding: 0.5px 4px; border-radius: 2px; flex-shrink: 0; letter-spacing: 0.3px;">ENQUIRY 1</span>
                </div>
                <strong style="font-family: 'Playfair Display', serif; font-size: 8.5pt; font-weight: 800; color: #0f172a; line-height: 1.16; display: block; margin-bottom: 1px;">
                  To what extent was the creation of the German Empire in 1871 a complete turning point in European peace?
                </strong>
              </div>
              <div style="font-family: 'Inter', sans-serif; font-size: 6.4pt; color: #334155; line-height: 1.16; padding-left: 2px;">
                <div style="display: flex; gap: 3px; align-items: baseline;"><span style="color: #1e3a8a; font-weight: 700; font-size: 5.8pt;">&bull;</span><span>Prussian military victory &amp; 1871 proclamation in the Hall of Mirrors at Versailles</span></div>
                <div style="display: flex; gap: 3px; align-items: baseline;"><span style="color: #1e3a8a; font-weight: 700; font-size: 5.8pt;">&bull;</span><span>Otto von Bismarck’s Realpolitik, Krupp industrial steel &amp; 'Iron and Blood' statecraft</span></div>
                <div style="display: flex; gap: 3px; align-items: baseline;"><span style="color: #1e3a8a; font-weight: 700; font-size: 5.8pt;">&bull;</span><span>Disruption of the 1815 Congress of Vienna balance of power by a unified giant</span></div>
              </div>
            </div>

            <!-- Enquiry 2 -->
            <div style="border: 1px solid #cbd5e1; border-left: 3px solid #1e3a8a; border-radius: 3px; padding: 2.5px 4.5px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;">
              <div style="margin-bottom: 1px;">
                <div style="display: flex; align-items: center; margin-bottom: 1px;">
                  <span style="background: #1e3a8a; color: #ffffff; font-family: 'Inter', sans-serif; font-size: 6.4pt; font-weight: 800; padding: 0.5px 4px; border-radius: 2px; flex-shrink: 0; letter-spacing: 0.3px;">ENQUIRY 2</span>
                </div>
                <strong style="font-family: 'Playfair Display', serif; font-size: 8.5pt; font-weight: 800; color: #0f172a; line-height: 1.16; display: block; margin-bottom: 1px;">
                  How useful are Sources A and B for an enquiry into why the annexation of Alsace-Lorraine made lasting peace impossible?
                </strong>
              </div>
              <div style="font-family: 'Inter', sans-serif; font-size: 6.4pt; color: #334155; line-height: 1.16; padding-left: 2px;">
                <div style="display: flex; gap: 3px; align-items: baseline;"><span style="color: #1e3a8a; font-weight: 700; font-size: 5.8pt;">&bull;</span><span>1871 Treaty of Frankfurt: 5 billion franc war indemnity &amp; loss of border fortresses</span></div>
                <div style="display: flex; gap: 3px; align-items: baseline;"><span style="color: #1e3a8a; font-weight: 700; font-size: 5.8pt;">&bull;</span><span>French revanchism: classroom maps shaded in black (*La Tache Noire*) &amp; youth rifle drills</span></div>
                <div style="display: flex; gap: 3px; align-items: baseline;"><span style="color: #1e3a8a; font-weight: 700; font-size: 5.8pt;">&bull;</span><span>Bismarck’s strategic glacis buffer vs German fear of a vengeful two-front encirclement</span></div>
              </div>
            </div>

            <!-- Enquiry 3 -->
            <div style="border: 1px solid #cbd5e1; border-left: 3px solid #1e3a8a; border-radius: 3px; padding: 2.5px 4.5px; background: #f8fafc; display: flex; flex-direction: column; justify-content: space-between;">
              <div style="margin-bottom: 1px;">
                <div style="display: flex; align-items: center; margin-bottom: 1px;">
                  <span style="background: #1e3a8a; color: #ffffff; font-family: 'Inter', sans-serif; font-size: 6.4pt; font-weight: 800; padding: 0.5px 4px; border-radius: 2px; flex-shrink: 0; letter-spacing: 0.3px;">ENQUIRY 3</span>
                </div>
                <strong style="font-family: 'Playfair Display', serif; font-size: 8.5pt; font-weight: 800; color: #0f172a; line-height: 1.16; display: block; margin-bottom: 1px;">
                  Explain why Kaiser Wilhelm II’s policy of Weltpolitik caused serious international tension between 1890 and 1911.
                </strong>
              </div>
              <div style="font-family: 'Inter', sans-serif; font-size: 6.4pt; color: #334155; line-height: 1.16; padding-left: 2px;">
                <div style="display: flex; gap: 3px; align-items: baseline;"><span style="color: #1e3a8a; font-weight: 700; font-size: 5.8pt;">&bull;</span><span>Kaiser Wilhelm II dismisses Bismarck (1890) and demands Germany’s "Place in the Sun"</span></div>
                <div style="display: flex; gap: 3px; align-items: baseline;"><span style="color: #1e3a8a; font-weight: 700; font-size: 5.8pt;">&bull;</span><span>First Moroccan Crisis (1905): Kaiser lands at Tangier to test the new Anglo-French Entente</span></div>
                <div style="display: flex; gap: 3px; align-items: baseline;"><span style="color: #1e3a8a; font-weight: 700; font-size: 5.8pt;">&bull;</span><span>Second Moroccan Crisis (1911): SMS Panther gunboat at Agadir and Lloyd George's warning</span></div>
              </div>
            </div>

            <!-- Enquiry 4 -->
            <div style="border: 1px solid #cbd5e1; border-left: 3px solid #0369a1; border-radius: 3px; padding: 2.5px 4.5px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;">
              <div style="margin-bottom: 1px;">
                <div style="display: flex; align-items: center; margin-bottom: 1px;">
                  <span style="background: #0369a1; color: #ffffff; font-family: 'Inter', sans-serif; font-size: 6.4pt; font-weight: 800; padding: 0.5px 4px; border-radius: 2px; flex-shrink: 0; letter-spacing: 0.3px;">ENQUIRY 4</span>
                </div>
                <strong style="font-family: 'Playfair Display', serif; font-size: 8.5pt; font-weight: 800; color: #0f172a; line-height: 1.16; display: block; margin-bottom: 1px;">
                  Explain why Britain viewed the German naval build-up as a direct threat to its national security.
                </strong>
              </div>
              <div style="font-family: 'Inter', sans-serif; font-size: 6.4pt; color: #334155; line-height: 1.16; padding-left: 2px;">
                <div style="display: flex; gap: 3px; align-items: baseline;"><span style="color: #0369a1; font-weight: 700; font-size: 5.8pt;">&bull;</span><span>1906 launch of HMS Dreadnought in Portsmouth: turbine speed &amp; ten 12-inch heavy guns</span></div>
                <div style="display: flex; gap: 3px; align-items: baseline;"><span style="color: #0369a1; font-weight: 700; font-size: 5.8pt;">&bull;</span><span>Admiral von Tirpitz’s German Navy Laws &amp; 'Risk Theory' challenging British North Sea control</span></div>
                <div style="display: flex; gap: 3px; align-items: baseline;"><span style="color: #0369a1; font-weight: 700; font-size: 5.8pt;">&bull;</span><span>British Two-Power Standard, island food import vulnerability &amp; the "We want eight!" campaign</span></div>
              </div>
            </div>

            <!-- Enquiry 5 -->
            <div style="border: 1px solid #cbd5e1; border-left: 3px solid #0369a1; border-radius: 3px; padding: 2.5px 4.5px; background: #f8fafc; display: flex; flex-direction: column; justify-content: space-between;">
              <div style="margin-bottom: 1px;">
                <div style="display: flex; align-items: center; margin-bottom: 1px;">
                  <span style="background: #0369a1; color: #ffffff; font-family: 'Inter', sans-serif; font-size: 6.4pt; font-weight: 800; padding: 0.5px 4px; border-radius: 2px; flex-shrink: 0; letter-spacing: 0.3px;">ENQUIRY 5</span>
                </div>
                <strong style="font-family: 'Playfair Display', serif; font-size: 8.5pt; font-weight: 800; color: #0f172a; line-height: 1.16; display: block; margin-bottom: 1px;">
                  Did the European alliance system preserve peace between the Great Powers, or make a general war inevitable?
                </strong>
              </div>
              <div style="font-family: 'Inter', sans-serif; font-size: 6.4pt; color: #334155; line-height: 1.16; padding-left: 2px;">
                <div style="display: flex; gap: 3px; align-items: baseline;"><span style="color: #0369a1; font-weight: 700; font-size: 5.8pt;">&bull;</span><span>The armed camps: Triple Alliance (1882) vs Dual Alliance (1894) &amp; Triple Entente (1907)</span></div>
                <div style="display: flex; gap: 3px; align-items: baseline;"><span style="color: #0369a1; font-weight: 700; font-size: 5.8pt;">&bull;</span><span>Secret military protocols, automatic mutual defence triggers &amp; rigid railway timetables</span></div>
                <div style="display: flex; gap: 3px; align-items: baseline;"><span style="color: #0369a1; font-weight: 700; font-size: 5.8pt;">&bull;</span><span>The "Willy-Nicky" telegrams: royal cousins powerless to halt military mobilisation</span></div>
              </div>
            </div>

            <!-- Enquiry 6 -->
            <div style="border: 1px solid #cbd5e1; border-left: 3px solid #0369a1; border-radius: 3px; padding: 2.5px 4.5px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;">
              <div style="margin-bottom: 1px;">
                <div style="display: flex; align-items: center; margin-bottom: 1px;">
                  <span style="background: #0369a1; color: #ffffff; font-family: 'Inter', sans-serif; font-size: 6.4pt; font-weight: 800; padding: 0.5px 4px; border-radius: 2px; flex-shrink: 0; letter-spacing: 0.3px;">ENQUIRY 6</span>
                </div>
                <strong style="font-family: 'Playfair Display', serif; font-size: 8.5pt; font-weight: 800; color: #0f172a; line-height: 1.16; display: block; margin-bottom: 1px;">
                  How far do you agree that the assassination of Franz Ferdinand was the main cause of the First World War?
                </strong>
              </div>
              <div style="font-family: 'Inter', sans-serif; font-size: 6.4pt; color: #334155; line-height: 1.16; padding-left: 2px;">
                <div style="display: flex; gap: 3px; align-items: baseline;"><span style="color: #0369a1; font-weight: 700; font-size: 5.8pt;">&bull;</span><span>28 June 1914: Gavrilo Princip and the Black Hand assassinate Franz Ferdinand in Sarajevo</span></div>
                <div style="display: flex; gap: 3px; align-items: baseline;"><span style="color: #0369a1; font-weight: 700; font-size: 5.8pt;">&bull;</span><span>The July Crisis: Germany’s "Blank Cheque", the Austrian ultimatum &amp; Russian mobilisation</span></div>
                <div style="display: flex; gap: 3px; align-items: baseline;"><span style="color: #0369a1; font-weight: 700; font-size: 5.8pt;">&bull;</span><span>The Schlieffen Plan: German invasion of neutral Belgium triggers British declaration (4 August)</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Lower Section: "How to Write Like a Historian" + "The Big Storylines" -->
      <div style="display: grid; grid-template-columns: 1.15fr 1fr; gap: 6px; margin-top: auto; margin-bottom: 8px;">
        <!-- Left Box: How to Write Like a Historian -->
        <div style="border: 1.2px solid #0f172a; border-radius: 4px; overflow: hidden; background: #ffffff;">
          <div style="background: #0f172a; color: #ffffff; padding: 2.5px 8px; font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.6px; display: flex; justify-content: space-between; align-items: center;">
            <span>How to Write Like a Historian</span>
            <span style="color: #94a3b8; font-size: 6.2pt;">4 Golden Rules &amp; Connectives</span>
          </div>
          <div style="padding: 3px 7px; font-family: 'Inter', sans-serif; font-size: 6.5pt; line-height: 1.2; color: #1e293b; display: flex; flex-direction: column; gap: 2px;">
            <div>
              <strong style="color: #1e3a8a; text-transform: uppercase; font-size: 6.5pt;">The 4 Golden Rules of Extended Writing:</strong>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5px 6px; margin-top: 1px; font-size: 6.3pt; color: #334155;">
                <span><strong>1. Direct Thesis:</strong> Clear answer in sentence 1.</span>
                <span><strong>2. Specific Evidence:</strong> Names, dates, acts &amp; data.</span>
                <span><strong>3. Causal Mechanics:</strong> Explain <em>why</em> &amp; <em>how</em>.</span>
                <span><strong>4. Evaluative Balance:</strong> Weighted judgement.</span>
              </div>
            </div>
            <div style="border-top: 1px dashed #cbd5e1; padding-top: 2px; margin-top: 1px;">
              <strong style="color: #0369a1; text-transform: uppercase; font-size: 6.5pt;">High-Impact Analytical Connectives:</strong>
              <div style="font-size: 6.2pt; color: #475569; line-height: 1.2; margin-top: 1px;">
                <strong style="color: #0f172a;">Causation:</strong> <em>Consequently &bull; Precipitated by &bull; Directly resulted in</em><br>
                <strong style="color: #0f172a;">Nuance &amp; Evaluation:</strong> <em>Conversely &bull; While ostensibly... in reality &bull; Decisively</em>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Box: Thematic Strands (Single Source of Truth) -->
        <div style="border: 1.2px solid #0f172a; border-radius: 4px; overflow: hidden; background: #ffffff;">
          <div style="background: #1e3a8a; color: #ffffff; padding: 2.5px 8px; font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.6px; display: flex; justify-content: space-between; align-items: center;">
            <span>The 4 Big Storylines to Track</span>
            <span style="color: #bfdbfe; font-size: 6.2pt;">Core Historical Themes</span>
          </div>
          <div style="padding: 3px 7px; font-family: 'Inter', sans-serif; font-size: 6.4pt; line-height: 1.2; color: #1e293b; display: flex; flex-direction: column; gap: 2px;">
            <div>
              <strong style="color: #1e3a8a;">1. Imperial Alliances &amp; State Control:</strong> <span style="color: #475569;">Balance of power collapse &rarr; Secret protocols &rarr; July Crisis chain reaction (L1, L2, L5)</span>
            </div>
            <div>
              <strong style="color: #0369a1;">2. Industrialised Warfare &amp; Naval Race:</strong> <span style="color: #475569;">Krupp artillery &rarr; HMS Dreadnought &rarr; Tirpitz Risk Fleet (L1, L4)</span>
            </div>
            <div>
              <strong style="color: #b91c1c;">3. Militarism, Imperialism &amp; Weltpolitik:</strong> <span style="color: #475569;">Alsace-Lorraine revanche &rarr; Tangier &amp; Agadir &rarr; Pan-Slavic nationalism (L2, L3, L6)</span>
            </div>
            <div>
              <strong style="color: #15803d;">4. Diplomatic Breakdown &amp; Alliances:</strong> <span style="color: #475569;">Bismarckian treaties &rarr; Triple Entente &rarr; Blank Cheque &amp; Schlieffen Plan (L4, L5, L6)</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Page 1 Footer Strip -->
    <div class="cover-footer page-footer-strip" style="border-top: 1.2px solid #0f172a; padding-top: 2.5px; margin-top: 3px; display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 7.0pt; color: #475569;">
      <span>The History Department &bull; CAUSES OF THE GREAT WAR (1871–1914)</span>
      <span style="font-style: italic; color: #64748b;">Permanent Academic Record &bull; Retain for Synoptic Revision</span>
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
        <div style="border-bottom: 1px solid #cbd5e1; padding: 2px 0 6px 0; flex: 1; display: flex; flex-direction: column; justify-content: space-between; background: #ffffff;">
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
          <div style="border: 1.2px dashed #94a3b8; min-height: 44mm; flex: 1; background: #fafafa; border-radius: 4px; margin-top: 3px; padding: 4px; display: flex; flex-direction: column; justify-content: flex-end;">
            <span style="font-family: 'Georgia', serif; font-size: 7pt; color: #64748b; font-style: italic; text-align: right;">${m.sketchPrompt}</span>
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
        <div style="border-bottom: 1px solid #cbd5e1; padding: 2px 0 6px 0; flex: 1; display: flex; flex-direction: column; justify-content: space-between; background: #ffffff;">
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
          <div style="border: 1.2px dashed #94a3b8; min-height: 44mm; flex: 1; background: #fafafa; border-radius: 4px; margin-top: 3px; padding: 4px; display: flex; flex-direction: column; justify-content: flex-end;">
            <span style="font-family: 'Georgia', serif; font-size: 7pt; color: #64748b; font-style: italic; text-align: right;">${m.sketchPrompt}</span>
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
      if (cfg.bridgeTask.sourceBText) {
        html += `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 3px;">
              <!-- Source A Card -->
              <div style="border: 1.2px solid #000; border-left: 3.5px solid #000; background: #fdfbf7; padding: 3px 5px; border-radius: 3px; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1px;">
                    <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase;">${cfg.bridgeTask.imgCaption}</strong>
                  </div>
                  <div style="height: 54px; border: 1px solid #000; overflow: hidden; background: #000; margin-bottom: 2px; line-height: 0;">
                    <img src="${b64}" style="display: block; width: 100%; height: 100%; object-fit: cover;" alt="La Tache Noire">
                  </div>
                  <p style="font-family: 'Georgia', serif; font-size: 7.3pt; font-style: italic; color: #111; margin: 1px 0; line-height: 1.22;">
                    ${cfg.bridgeTask.sourceText}
                  </p>
                </div>
                <div style="font-family: 'Inter', sans-serif; font-size: 6.2pt; color: #444; border-top: 1px dotted #999; padding-top: 1px;">
                  <strong>Record:</strong> ${cfg.bridgeTask.shelfmark}
                </div>
              </div>

              <!-- Source B Card -->
              <div style="border: 1.2px solid #000; border-left: 3.5px solid #000; background: #fffaf0; padding: 3px 5px; border-radius: 3px; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1px;">
                    <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase;">${cfg.bridgeTask.sourceBTitle}</strong>
                  </div>
                  <p style="font-family: 'Georgia', serif; font-size: 7.5pt; font-style: italic; color: #111; margin: 2px 0 1px 0; line-height: 1.25;">
                    ${cfg.bridgeTask.sourceBText}
                  </p>
                </div>
                <div style="font-family: 'Inter', sans-serif; font-size: 6.2pt; color: #444; border-top: 1px dotted #999; padding-top: 1px; margin-top: 2px;">
                  <strong>Record:</strong> ${cfg.bridgeTask.sourceBShelfmark}
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
      } else {
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
      }
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
      <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 4px 8px; background: #ffffff; display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
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
      <table style="width: 100%; border-collapse: collapse; text-align: left; font-family: 'Inter', sans-serif; font-size: 6.7pt; line-height: 1.2; margin-bottom: 4px; border: 1.2px solid #000;">
        <tbody>
          <tr style="background: #1e3a8a; color: #fff;">
            <td style="border: 1px solid #000; padding: 2.8px 5px; font-weight: 800; width: 12%; text-transform: uppercase; letter-spacing: 0.5px;">KS3 Pathway</td>
            <td style="border: 1px solid #000; padding: 2.8px 5px; width: 17.6%; background: #f8fafc; color: #000;"><strong>Emerging (1–2):</strong> Recalls isolated facts; basic descriptive narrative.</td>
            <td style="border: 1px solid #000; padding: 2.8px 5px; width: 17.6%; background: #ffffff; color: #000;"><strong>Emerging+ (3):</strong> Identifies causes &amp; features with basic explanation.</td>
            <td style="border: 1px solid #000; padding: 2.8px 5px; width: 17.6%; background: #f8fafc; color: #000;"><strong>Expected (4–5):</strong> Structured PEEL writing; supports with specific evidence.</td>
            <td style="border: 1px solid #000; padding: 2.8px 5px; width: 17.6%; background: #ffffff; color: #000;"><strong>Expected+ (6–7):</strong> Detailed causation; balances competing factors.</td>
            <td style="border: 1px solid #000; padding: 2.8px 5px; width: 17.6%; background: #f8fafc; color: #000;"><strong>Greater Depth (8–9):</strong> Nuanced historical judgements; evaluates provenance &amp; interpretations.</td>
          </tr>
          <tr style="background: #0f172a; color: #fff;">
            <td style="border: 1px solid #000; padding: 2.2px 5px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;">Effort Rubric</td>
            <td style="border: 1px solid #000; padding: 2.2px 5px; background: #fff; color: #111;"><strong>1 • Concern:</strong> Disengaged or incomplete work.</td>
            <td style="border: 1px solid #000; padding: 2.2px 5px; background: #fafafa; color: #111;"><strong>2 • Inconsistent:</strong> Needs repeated teacher prompts.</td>
            <td style="border: 1px solid #000; padding: 2.2px 5px; background: #fff; color: #111;"><strong>3 • Satisfactory:</strong> Meets baseline expectations.</td>
            <td style="border: 1px solid #000; padding: 2.2px 5px; background: #fafafa; color: #111;"><strong>4 • Good:</strong> Proactive focus &amp; thoughtful work.</td>
            <td style="border: 1px solid #000; padding: 2.2px 5px; background: #fff; color: #111;"><strong>5 • Exemplary:</strong> Exceptional scholarship &amp; pride.</td>
          </tr>
        </tbody>
      </table>

      <!-- Master Assessment Tracking Ledger Table (6 Lessons) -->
      <div style="border: 1.4px solid #000000; border-radius: 4px; overflow: hidden; margin-bottom: 4px;">
        <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif; font-size: 7.1pt;">
          <thead>
            <tr style="border-bottom: 1.5px solid #000000; background: #1e3a8a; color: #ffffff;">
              <th style="padding: 4px 5px; width: 26px; text-align: center; font-size: 7.4pt; font-weight: 900; border-right: 1px solid rgba(255,255,255,0.4);">#</th>
              <th style="padding: 4px 6px; text-align: left; font-size: 7.4pt; font-weight: 900; text-transform: uppercase; border-right: 1px solid rgba(255,255,255,0.4); width: 42%;">Lesson Enquiry Title</th>
              <th style="padding: 4px 4px; width: 68px; text-align: center; font-size: 7.2pt; font-weight: 900; border-right: 1px solid rgba(255,255,255,0.4);">Effort (1–5)</th>
              <th style="padding: 4px 4px; width: 85px; text-align: center; font-size: 7.2pt; font-weight: 900; border-right: 1px solid rgba(255,255,255,0.4);">Attainment Level</th>
              <th style="padding: 4px 6px; text-align: left; font-size: 7.2pt; font-weight: 900; text-transform: uppercase;">Teacher Formative Feedback &amp; Next Steps</th>
            </tr>
          </thead>
          <tbody>
            ${lessonConfigs
              .map(
                (l, idx) => `
              <tr style="border-bottom: 1px solid #000000; background: ${idx % 2 === 1 ? '#f8fafc' : '#ffffff'};">
                <td style="padding: 11.5px 4px; border-right: 1px solid #000; text-align: center; font-weight: 800; color: #1e3a8a;">L${l.lessonNum}</td>
                <td style="padding: 11.5px 6px; border-right: 1px solid #000; font-weight: 600; line-height: 1.2;">
                  ${l.title}
                </td>
                <td style="padding: 11.5px 4px; border-right: 1px solid #000; text-align: center; font-weight: 700;"></td>
                <td style="padding: 11.5px 4px; border-right: 1px solid #000; text-align: center; font-weight: 700;"></td>
                <td style="padding: 11.5px 6px;"></td>
              </tr>
            `,
              )
              .join('')}
            <tr style="background: #e2e8f0; font-weight: 900; border-top: 1.5px solid #000000;">
              <td colspan="2" style="padding: 8.5px 6px; border-right: 1px solid #000; text-transform: uppercase; font-size: 7.3pt; color: #0f172a;">
                Unit Summative Outcome &bull; Target Standard Met?
              </td>
              <td style="padding: 8.5px 4px; border-right: 1px solid #000; text-align: center; font-size: 7.4pt; background: #ffffff;"></td>
              <td style="padding: 8.5px 4px; border-right: 1px solid #000; text-align: center; font-size: 7.4pt; background: #ffffff;"></td>
              <td style="padding: 8.5px 6px; font-size: 6.8pt; background: #ffffff;">
                Teacher Sign: ________________________ &bull; Date: ___/___/2026
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Teacher Feedback: WWW & EBI (4 Full Lines each) -->
      <div style="border: 1.4px solid #000000; border-radius: 4px; padding: 6px 8px; background: #ffffff; margin-bottom: 5px;">
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
            <div class="task-line" style="height: 7.2mm;"></div>
            <div class="task-line" style="height: 7.2mm;"></div>
            <div class="task-line" style="height: 7.2mm;"></div>
            <div class="task-line" style="height: 7.2mm;"></div>
          </div>
          <div>
            <strong style="font-family: 'Inter', sans-serif; font-size: 6.9pt; text-transform: uppercase; color: #000; display: block; margin-bottom: 1px;">
              Even Better If (EBI):
            </strong>
            <div class="task-line" style="height: 7.2mm;"></div>
            <div class="task-line" style="height: 7.2mm;"></div>
            <div class="task-line" style="height: 7.2mm;"></div>
            <div class="task-line" style="height: 7.2mm;"></div>
          </div>
        </div>
      </div>

      <!-- Revision QR Hub & Digital Quizzing (6 Individual Lesson QR Cards) -->
      <div style="border: 1.4px solid #000; border-radius: 4px; padding: 5px 6px; background: #fdfbf7; margin-bottom: 4px;">
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
            <div class="qr-card" style="border: 1px solid #000; border-radius: 3px; background: #ffffff; padding: 4px 2px; display: flex; flex-direction: column; align-items: center; text-align: center; justify-content: space-between;">
              <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 900; text-transform: uppercase;">Lesson ${lNum}</span>
              <span style="font-family: 'Inter', sans-serif; font-size: 5.5pt; color: #333; line-height: 1.1; margin-bottom: 2px; font-weight: 600;">${lessonShortTitles[i]}</span>
              <div style="width: 22mm; height: 22mm; margin: 1px 0;">
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

      <!-- Revision Strategy Protocol: Cognitive Science & Retrieval Techniques -->
      <div style="border: 1.2px solid #000; border-radius: 4px; padding: 5px 6px; background: #f0fdf4; margin-bottom: 3px;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #bbf7d0; padding-bottom: 1px; margin-bottom: 2px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase; color: #166534; letter-spacing: 0.5px;">
            🎯 Year 9 Revision Protocol &bull; 4 Evidence-Based Retrieval Techniques
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.3pt; font-weight: 800; color: #15803d; text-transform: uppercase;">Cognitive Science in Practice</span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px; font-family: 'Inter', sans-serif;">
          <div style="background: #ffffff; border: 1px solid #bbf7d0; border-radius: 2px; padding: 4px 4px;">
            <strong style="font-size: 6.8pt; color: #166534; display: block; margin-bottom: 1px;">1. Spaced Quizzing</strong>
            <span style="font-size: 6.3pt; color: #334155; line-height: 1.22; display: block;">Scan each QR code weekly. Retest until scoring 10/10 before reviewing your notes.</span>
          </div>
          <div style="background: #ffffff; border: 1px solid #bbf7d0; border-radius: 2px; padding: 4px 4px;">
            <strong style="font-size: 6.8pt; color: #166534; display: block; margin-bottom: 1px;">2. Dual-Coding Walk</strong>
            <span style="font-size: 6.3pt; color: #334155; line-height: 1.22; display: block;">Turn to Pages 2–3. Cover the text and narrate 1871–1914 using your sketchpad symbols.</span>
          </div>
          <div style="background: #ffffff; border: 1px solid #bbf7d0; border-radius: 2px; padding: 4px 4px;">
            <strong style="font-size: 6.8pt; color: #166534; display: block; margin-bottom: 1px;">3. 5-Min Brain Dumps</strong>
            <span style="font-size: 6.3pt; color: #334155; line-height: 1.22; display: block;">Pick one enquiry. Write every date, treaty, and battle from memory in 5 minutes.</span>
          </div>
          <div style="background: #ffffff; border: 1px solid #bbf7d0; border-radius: 2px; padding: 4px 4px;">
            <strong style="font-size: 6.8pt; color: #166534; display: block; margin-bottom: 1px;">4. Causal Connectives</strong>
            <span style="font-size: 6.3pt; color: #334155; line-height: 1.22; display: block;">Draft PEEL sentences explaining causation: <em>Consequently... This directly resulted in...</em></span>
          </div>
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

  const standardTargets = [
    path.join(ROOT_DIR, 'public', 'pdfs', 'great_war_pupil_workbook_FINAL_V17.pdf'),
    path.join(ROOT_DIR, 'public', 'pdfs', 'great_war_pupil_workbook.pdf'),
  ];
  for (const target of standardTargets) {
    fs.copyFileSync(outPdfPath, target);
    console.log(`📋 Synchronized copy: ${target}`);
  }
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
