/**
 * History Revision Hub — Master Two-Page Spread Pupil Workbook Engine
 *
 * Target: units/great_war (KS3 Year 9: Causes of the Great War, 1871–1914)
 * Output: public/units/great_war/pupil_workbook_v2.html
 * PDF:    public/pdfs/great_war_pupil_workbook_V2.pdf
 *
 * Architecture:
 * - 16-Page A4 Pupil Workbook Standard (Zero Disruption: Staged V2 edition)
 * - Page 1: Master Front Cover (Hero plate, enquiry question, pupil box, 6-lesson syllabus)
 * - Pages 2–3: Living Unit Timeline (1871–1914 Chronological Spine & Sketchpads)
 * - Pages 4–15: 6 Bespoke Double-Page Enquiry Spreads:
 *     Left Page:  Prior-Recall Do Now (5 items), Fingertip Vocab, Forensic Bridge Task
 *     Right Page: Master Enquiry Question, 3-Tier Structure Strip, Auto-Fill Ruled Lines, Teacher Assessment
 * - Page 16: Master Back Cover (M-A-I-N Synthesis Matrix, Historiography, 6 QR Portals, Assessment Ledger)
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
 * Image helper (base64 or clean web path)
 */
function getBase64Image(relPath) {
  if (!relPath) return null;
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

// Bespoke pedagogical configurations for Great War 6 lessons
const lessonConfigs = [
  {
    // Lesson 0: Creation of German Empire (1871)
    skill: 'Causation & Diplomacy',
    enquiryQuestion:
      'Enquiry: Was the unification of Germany in 1871 primarily achieved through military force or diplomatic calculation?',
    structureStrip: [
      {
        col: '1. MILITARY FORCE',
        text: 'Explain how the modernized Prussian army, Dreyse needle guns, and victories over Austria (1866) and France (1870) forged German unity through "iron".',
      },
      {
        col: '2. REALPOLITIK DIPLOMACY',
        text: 'Explain how Bismarck manipulated German nationalism, isolated rivals diplomatically, and used the Zollverein customs union to exclude Austria.',
      },
      {
        col: '3. HISTORICAL JUDGMENT',
        text: 'Give your final verdict: was military force the indispensable driver of unification, or was Bismarck’s diplomatic chess game the true deciding factor?',
      },
    ],
    connectives:
      'The decisive military catalyst was... • From a diplomatic perspective, Bismarck... • Crucially, the Zollverein ensured that... • Consequently, while military force provided the weapon, Bismarck’s Realpolitik...',
    vocabTask: {
      type: 'distinction',
      termA: 'Realpolitik',
      termB: 'Liberalism',
      prompt:
        'Distinguish between Bismarck’s ruthless, pragmatic <strong>Realpolitik</strong> (practical power and national interest) and democratic <strong>Liberalism</strong> (speeches and majority votes):',
    },
    bridgeTask: {
      type: 'source_annotation',
      title: 'Task 4: Interrogating Bismarck’s "Blood and Iron" Speech (September 1862)',
      sourceTitle:
        'Source A: Otto von Bismarck Addresses the Prussian Budget Commission (30 September 1862)',
      shelfmark: 'PRUSSIAN STATE ARCHIVES · PARLIAMENTARY PROCEEDINGS · BERLIN',
      sourceText:
        '“Prussia must concentrate and maintain its power for the favorable moment which has already been missed several times. Prussia’s borders according to the treaties of Vienna are not favorable to a healthy state life. Not through speeches and majority decisions will the great questions of the day be decided—that was the great mistake of 1848 and 1849—but by iron and blood (<em>Eisen und Blut</em>).”',
      provenance:
        'Speech by Minister-President Otto von Bismarck to the Budget Committee of the Prussian House of Representatives, Berlin, 1862.',
      questionA:
        'What can a historian infer from Source A about why Bismarck rejected parliamentary debate in favor of military force?',
      questionB:
        'Explain how the phrase "iron and blood" came to define Prussian statecraft from 1862 to the unification of Germany in 1871:',
      clue: '<em>Low-Floor Clue:</em> Notice what Bismarck calls the "great mistake of 1848"—why did he believe speeches were useless without military muscle?',
      scholarsEdge:
        '<strong>★ Scholar’s Edge:</strong> How did Bismarck’s rejection of constitutional democracy in 1862 lay a militaristic foundation for the new German Empire?',
    },
  },
  {
    // Lesson 1: Franco-Prussian War & Alsace-Lorraine
    skill: 'Change & Continuity',
    enquiryQuestion:
      'Enquiry: How far was French revanche for the loss of Alsace-Lorraine the fundamental cause of European instability before 1914?',
    structureStrip: [
      {
        col: '1. THE 1871 HUMILIATION',
        text: 'Explain how the siege of Paris, the crowning of the Kaiser in the Hall of Mirrors at Versailles, and the 5-billion franc indemnity shattered French prestige.',
      },
      {
        col: '2. REVANCHE & BORDER LOSS',
        text: 'Explain how the annexation of Alsace-Lorraine created a permanent open wound in French society, with classroom maps veiled in black.',
      },
      {
        col: '3. EVALUATIVE WEIGHT',
        text: 'Judge whether French desire for revenge was the main source of European instability, or whether German fear of encirclement and British naval anxiety were more dangerous.',
      },
    ],
    connectives:
      'The immediate trauma of 1871 was... • This fostered a continuous culture of revanche because... • Furthermore, the loss of Alsace-Lorraine forced France to... • Ultimately, while revanche kept Europe tense, broader geopolitical alliances...',
    vocabTask: {
      type: 'cloze',
      prompt:
        'Complete the summary below using the terms <em>Revanche</em> and <em>Annexation</em>:',
      clozeText:
        'Following the Prussian victory in 1871, the German Empire enforced the direct [ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ] of Alsace-Lorraine, sparking a deep and permanent culture of [ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ] across French politics and education.',
      followUp:
        'Explain why Bismarck spent the next twenty years desperately trying to diplomatically isolate France:',
    },
    bridgeTask: {
      type: 'source_utility',
      badge: 'Visual Archival Interrogation',
      title: 'Task 4: Interrogating Albert Bettannier’s "The Black Stain" (La Tache Noire, 1887)',
      sourceText:
        '“In French school classrooms after 1871, teachers wore black armbands and maps of France showed the lost provinces of Alsace and Lorraine shaded in deep violet or draped in mourning crepe. French schoolboys were drilled daily in military discipline, singing patriotic hymns and learning that their highest civic duty was the sacred liberation of the lost homeland.” — Historical analysis of French third-republic education.',
      instruction:
        '1. Explain what this evidence reveals about how French children were conditioned to view the German Empire.<br>2. Explain why an historian must examine both official school curriculum and public political rallies when judging the popularity of revanche:',
      lines: 8,
      clue: '<em>Low-Floor Clue:</em> Notice the use of mourning colors and classroom maps—how does this show that grief was turned into a weapon of war?',
      scholarsEdge:
        '<strong>★ Scholar’s Edge:</strong> How did Bismarck’s fear of a two-front war with a vengeful France lead directly to the secret Triple Alliance of 1882?',
    },
  },
  {
    // Lesson 2: The Scramble for Africa & Imperial Rivalry
    skill: 'Causation & Imperialism',
    enquiryQuestion:
      'Enquiry: Did colonial rivalry in Africa cause the First World War, or merely mirror existing European tensions?',
    structureStrip: [
      {
        col: '1. IMPERIAL GREED & WELTPOLITIK',
        text: 'Explain how Kaiser Wilhelm II’s aggressive demand for a "Place in the Sun" challenged British and French global dominance across Africa and Asia.',
      },
      {
        col: '2. THE MOROCCAN CRISES',
        text: 'Explain how Germany provoked crises in Tangier (1905) and Agadir (1911) using the gunboat Panther, backfiring by cementing the Anglo-French Entente Cordiale.',
      },
      {
        col: '3. HISTORICAL JUDGMENT',
        text: 'Judge whether African colonial clashes were the true root of WWI or merely a secondary theatre that reinforced mutual distrust between European alliances.',
      },
    ],
    connectives:
      'The fundamental driver of imperial tension was... • This escalated dramatically during the Agadir Crisis when... • Instead of driving a wedge between Britain and France, German gunboat diplomacy... • Consequently, colonial conflicts did not cause war on their own, but rather...',
    vocabTask: {
      type: 'golden_sentence',
      prompt:
        'Write ONE grammatically sophisticated, historically accurate Golden Sentence connecting <strong>Weltpolitik</strong> and <strong>Entente Cordiale</strong> using a causal conjunction (<em>because</em>, <em>although</em>, or <em>consequently</em>):',
      wordBank:
        'Weltpolitik · Place in the Sun · Entente Cordiale · Gunboat Diplomacy · Agadir Crisis · Algeciras Conference',
    },
    bridgeTask: {
      type: 'causal_pivot',
      title: 'Task 4: Chronological Sequence Analysis: The 1911 Agadir Crisis (The Panther’s Leap)',
      steps: [
        {
          stage: 'Stage 1',
          year: 'May 1911',
          text: 'French troops occupy Fez in Morocco to protect European citizens against a rebellion.',
        },
        {
          stage: 'Stage 2',
          year: 'July 1911',
          text: 'Germany sends the gunboat SMS Panther to Agadir, claiming to protect German commercial interests.',
        },
        {
          stage: 'Stage 3',
          year: 'July 1911',
          text: 'David Lloyd George delivers the Mansion House speech, warning Britain will not be treated as of no account.',
        },
        {
          stage: 'Stage 4',
          year: 'Nov 1911',
          text: 'Germany backs down in exchange for useless Congo marshland; Britain and France initiate secret naval talks.',
        },
      ],
      prompt:
        'Explain how the Agadir Crisis backfired catastrophically on German foreign policy by tightening Anglo-French military cooperation:',
      lines: 7,
      clue: '<em>Low-Floor Clue:</em> Look at Stage 4: Germany wanted to break the Entente, but what secret military agreement happened instead?',
      scholarsEdge:
        '<strong>★ Scholar’s Edge:</strong> Why did the failure at Agadir convince German military leaders that future diplomacy must be backed by unstoppable continental force?',
    },
  },
  {
    // Lesson 3: The Naval Arms Race & HMS Dreadnought
    skill: 'Significance & Militarism',
    enquiryQuestion:
      'Enquiry: Explain how the launch of HMS Dreadnought transformed the naval balance of power between Britain and Germany.',
    structureStrip: [
      {
        col: '1. THE DREADNOUGHT REVOLUTION',
        text: 'Explain how HMS Dreadnought’s steam turbines and 12-inch "all-big-gun" armament made every previous battleship on Earth instantly obsolete.',
      },
      {
        col: '2. THE RISK THEORY & ARMS RACE',
        text: 'Explain how Tirpitz’s Risk Theory sought to build a German fleet large enough to threaten Britain, forcing Britain to abandon its Two-Power Standard.',
      },
      {
        col: '3. SIGNIFICANCE VERDICT',
        text: 'Evaluate the significance of the naval race: did it make war inevitable by turning British public opinion decisively against Germany, or was it contained by 1912?',
      },
    ],
    connectives:
      'The revolutionary launch of HMS Dreadnought in 1906 meant that... • However, this breakthrough ironically harmed Britain because... • In response, Kaiser Wilhelm and Admiral Tirpitz accelerated... • Therefore, the naval race was profoundly significant because it transformed economic rivalry into...',
    vocabTask: {
      type: 'distinction',
      termA: 'Two-Power Standard',
      termB: 'Risk Theory (Risikogedanke)',
      prompt:
        'Distinguish between Britain’s <strong>Two-Power Standard</strong> (Royal Navy must equal next two navies combined) and Tirpitz’s <strong>Risk Theory</strong> (German navy strong enough that attacking it would risk Britain’s supremacy):',
    },
    bridgeTask: {
      type: 'source_annotation',
      title: 'Task 4: Interrogating Admiral Fisher’s Secret Memorandum on Naval Supremacy (1906)',
      sourceTitle: 'Source C: First Sea Lord Sir John Fisher, Confidential Admiralty Memorandum',
      shelfmark: 'BRITISH ADMIRALTY ARCHIVES · ADM 1/7892 · LONDON',
      sourceText:
        '“My principles are: Speed is armor. Hit first, hit hard, and keep on hitting... The Dreadnought has rendered all existing battleships obsolete. If Germany builds one, we must build two. The Empire floats upon the Royal Navy; if the navy is defeated, we are starved into surrender in three weeks. We cannot afford sentiment or hesitation.”',
      provenance:
        'Confidential memorandum by First Sea Lord Admiral Sir John Fisher to the Cabinet, December 1906.',
      questionA:
        'What does Admiral Fisher mean by the stark warning: "The Empire floats upon the Royal Navy; if the navy is defeated, we are starved into surrender in three weeks"?',
      questionB:
        'Explain why the invention of the Dreadnought paradoxically wiped out Britain’s enormous numerical battleship advantage over Germany:',
      clue: '<em>Low-Floor Clue:</em> If all older battleships were suddenly useless, both Britain and Germany had to start building the new ships from zero!',
      scholarsEdge:
        '<strong>★ Scholar’s Edge:</strong> How did popular British slogans like "We want eight and we won’t wait!" show that naval militarism had captured public politics?',
    },
  },
  {
    // Lesson 4: The Alliance System — Deterrence or Trap?
    skill: 'Causation & The Alliance System',
    enquiryQuestion:
      'Enquiry: Did the alliance system keep the peace in Europe for four decades, or guarantee an unavoidable global disaster?',
    structureStrip: [
      {
        col: '1. THE LOGIC OF DETERRENCE',
        text: 'Explain how the Triple Alliance (1882) and Triple Entente (1907) were designed to create a balance of power where no single nation dared to attack.',
      },
      {
        col: '2. THE DOOMSDAY MACHINE',
        text: 'Explain how secret mutual-defense treaties and rigid railway mobilization schedules meant that a localized Balkan spark would automatically trigger total war.',
      },
      {
        col: '3. HISTORICAL JUDGMENT',
        text: 'Judge whether European leaders were trapped by their alliance machinery, or whether reckless political decisions (like the Blank Cheque) made war inevitable.',
      },
    ],
    connectives:
      'On the one hand, alliances functioned as a deterrent because... • However, the fatal flaw of the system was... • When military timetables took over, civilian leaders found that... • Consequently, while the alliances maintained an uneasy peace for decades, in 1914 they acted as...',
    vocabTask: {
      type: 'cloze',
      prompt:
        'Complete the summary below using the terms <em>Deterrence</em> and <em>Mobilisation</em>:',
      clozeText:
        'European statesmen believed large defensive alliances would create [ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ] to prevent aggression; however, the rigid railway timetables of military [ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ] transformed defensive pacts into an unstoppable chain reaction.',
      followUp:
        'Explain why the German Schlieffen Plan made a diplomatic pause impossible once Russia mobilized:',
    },
    bridgeTask: {
      type: 'source_annotation',
      title: 'Task 4: Archival Interrogation: The "Willy-Nicky" Telegrams (29–31 July 1914)',
      sourceTitle:
        'Source D: Urgent Personal Telegrams Exchanged Between Kaiser Wilhelm II and Tsar Nicholas II',
      shelfmark: 'IMPERIAL DIPLOMATIC RECORDS · BERLIN & ST PETERSBURG ARCHIVES',
      sourceText:
        '“Tsar Nicholas to Kaiser Wilhelm (29 July, 1:00 am): ‘To try and avoid such a calamity as a European war, I beg you in the name of our old friendship to do what you can to stop your ally [Austria] from going too far.’<br>Kaiser Wilhelm to Tsar Nicholas (29 July, 6:30 pm): ‘I cannot consider Austria’s action against Serbia as an ‘ignoble’ war... I am exerting my utmost influence to induce the Austrians to arrive at an understanding with you. If you mobilize against Austria, my role as mediator will be endangered if not ruined.’<br>Tsar Nicholas to Kaiser Wilhelm (31 July, 2:00 pm): ‘It is technically impossible to stop our military preparations which were made necessary by Austria’s mobilization. We are far from wishing war... I give you my solemn word for this.’”',
      provenance:
        'Declassified private diplomatic telegrams between cousins Kaiser Wilhelm II and Tsar Nicholas II during the final days of the July Crisis, July 1914.',
      questionA:
        'What does the intimate, desperate tone of these telegrams reveal about the personal feelings of the two monarchs as war approached?',
      questionB:
        'Explain why the monarchs were completely powerless to halt the march to war despite their desperate personal appeals:',
      clue: '<em>Low-Floor Clue:</em> Look closely at Tsar Nicholas’s words: "It is technically impossible to stop our military preparations"—why couldn’t generals just stop the trains?',
      scholarsEdge:
        '<strong>★ Scholar’s Edge:</strong> How does the Willy-Nicky exchange support Christopher Clark’s thesis that European rulers were "sleepwalkers" rather than calculated warmongers?',
    },
  },
  {
    // Lesson 5: Sarajevo Assassination & The July Crisis
    skill: 'Causation & The Spark',
    enquiryQuestion:
      'Enquiry: Why did a single assassination in Sarajevo ignite an unstoppable world war within thirty-seven days?',
    structureStrip: [
      {
        col: '1. THE SARAJEVO SPARK',
        text: 'Explain how Gavrilo Princip and the Black Hand exploited the motorcade’s fatal wrong turn onto Franz Josef Street to shoot Archduke Franz Ferdinand.',
      },
      {
        col: '2. THE ESCALATING CHAIN',
        text: 'Trace the 37-day escalation: the German "Blank Cheque", the Austrian 48-hour ultimatum, Russian general mobilization, and the invasion of Belgium.',
      },
      {
        col: '3. ULTIMATE CAUSATION',
        text: 'Evaluate whether the assassination was merely an excuse for a war Germany and Austria had already planned (Fischer thesis), or the trigger of an alliance trap.',
      },
    ],
    connectives:
      'The immediate catalyst occurred on 28 June 1914 when... • This regional Balkan crisis transformed into a continental showdown because of... • Crucially, the German Schlieffen Plan demanded that... • Ultimately, while Princip fired the first shot, the war was caused by forty years of...',
    vocabTask: {
      type: 'golden_sentence',
      prompt:
        'Write ONE grammatically sophisticated, historically accurate Golden Sentence connecting <strong>The Black Hand</strong> and <strong>Blank Cheque</strong> using a causal conjunction (<em>because</em>, <em>although</em>, or <em>consequently</em>):',
      wordBank:
        'Assassination · The Black Hand · Franz Josef Street · Blank Cheque · Ultimatum · July Crisis · Mobilisation · Treaty of London',
    },
    bridgeTask: {
      type: 'dual_source_interrogation',
      title:
        'Task 4: Archival Interrogation: The Crime Scene Route Map vs. The German "Blank Cheque"',
      sourceATitle:
        'Source A: Sarajevo Police Forensic Plan — Appel Quay & Franz Josef Street (28 June 1914)',
      sourceAShelfmark: 'SARAJEVO POLICE ARCHIVES · CRIME PLAN 1914-0628',
      sourceAText:
        '“Motorcade Route Plan: The royal car traveled down Appel Quay. At the Latin Bridge, the lead car took an unauthorized right turn into Franz Josef Street. Governor Potiorek shouted: ‘Stop! That is the wrong way!’ The chauffeur braked and attempted to reverse, stalling the open Graf & Stift cabriolet directly in front of Schiller’s Delicatessen, five feet from Gavrilo Princip.”',
      sourceBTitle: 'Source B: The German "Blank Cheque" Telegram to Vienna (5 July 1914)',
      sourceBShelfmark: 'GERMAN FOREIGN OFFICE · TELEGRAM NO. 142 · BERLIN',
      sourceBText:
        '“His Majesty the Kaiser authorizes me to inform your Government that Austria-Hungary may rely upon Germany’s full support, even if grave European complications should arise out of an action against Serbia. In this case, as in any other, Germany will stand faithfully by Austria’s side according to its alliance obligations.”',
      questionA:
        'Using Source A, explain how pure chance and human error allowed Gavrilo Princip to assassinate the Archduke after the morning bomb plot had failed:',
      questionB:
        'Using Source B, explain why Germany’s "Blank Cheque" transformed a localized Austro-Serbian dispute into a catastrophic European conflagration:',
      clue: '<em>Low-Floor Clue:</em> Without Germany promising 100% military backing in Source B, would Austria-Hungary have dared to declare war knowing Russia would protect Serbia?',
      scholarsEdge:
        '<strong>★ Scholar’s Edge:</strong> How does the interplay between Source A (chance) and Source B (geopolitics) demonstrate the limits of the Great Man theory in historical causation?',
    },
  },
];

/**
 * Builds the complete 16-page Pupil Workbook V2 HTML
 */
function buildGreatWarTwoPageWorkbookHtml() {
  const coverImg = getBase64Image('/images/great_war_cover.jpg');

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Pupil Workbook V2 (Staged) — Causes of the Great War (1871–1914)</title>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,600;0,700;1,500;1,600&display=swap" rel="stylesheet">
  <style>
    *, *:before, *:after { box-sizing: border-box; }
    @page {
      size: A4 portrait;
      margin: 10mm 12mm 12mm 12mm;
    }
    body {
      font-family: 'Georgia', 'Garamond', serif;
      font-size: 10pt;
      line-height: 1.35;
      color: #1e293b;
      margin: 0;
      padding: 0;
      background: #ffffff;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    h1, h2, h3, h4, h5, h6, strong, th, .sans {
      font-family: 'Inter', -apple-system, sans-serif;
    }
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
    /* Commercial School Brand Customizer */
    [data-department-name]:not([data-department-name=""]):not([data-department-name="The History Department"]):not([data-department-name="History Department"]) .school-brand-target {
      display: inline-block;
      font-size: 0 !important;
    }
    [data-department-name]:not([data-department-name=""]):not([data-department-name="The History Department"]):not([data-department-name="History Department"]) .school-brand-target::after {
      content: attr(data-department-name);
      font-size: 8.5pt !important;
      letter-spacing: 2px;
    }
  </style>
</head>
<body>
`;

  // ==========================================
  // PAGE 1: FRONT COVER
  // ==========================================
  html += `
  <div class="page page-container" id="page-1" style="padding: 16px 18px; border: 1px solid #cbd5e1; outline: 3.5px double #0f172a; outline-offset: -8px; justify-content: flex-start;">
    <!-- Institutional Header & Pupil Registration Strip -->
    <div style="margin-bottom: 10px;">
      <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px;">
        <span class="school-brand-target" data-department-name="The History Department" style="font-family: 'Inter', sans-serif; font-size: 8.5pt; text-transform: uppercase; letter-spacing: 2px; color: #1e3a8a; font-weight: 700;">
          The History Department
        </span>
        <span style="font-family: 'Inter', sans-serif; font-size: 8pt; text-transform: uppercase; letter-spacing: 1.5px; color: #64748b; font-weight: 600;">
          Year 9 History &bull; V2 Staged Edition
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
      <h1 style="font-family: 'Playfair Display', serif; font-size: 23pt; color: #0f172a; margin: 0 0 3px 0; text-transform: uppercase; letter-spacing: 1.5px; line-height: 1.15;">
        Causes of the Great War
      </h1>
      <div style="font-family: 'Inter', sans-serif; font-size: 9.2pt; color: #334155; font-weight: 500; letter-spacing: 0.5px;">
        Imperial Rivalry, the Arms Race &amp; The Thirty Days of Madness (1871–1914)
      </div>
    </div>

    <!-- Overarching Enquiry Callout Box -->
    <div style="border: 1.5px solid #1e3a8a; border-radius: 5px; padding: 9px 16px; background: #f8fafc; margin-bottom: 9px; text-align: center;">
      <div style="font-family: 'Inter', sans-serif; font-size: 7.8pt; text-transform: uppercase; letter-spacing: 1.8px; color: #1e3a8a; font-weight: 700; margin-bottom: 3px;">
        Overarching Historical Enquiry
      </div>
      <div style="font-family: 'Playfair Display', serif; font-size: 13.5pt; color: #0f172a; font-style: italic; font-weight: 600; line-height: 1.25;">
        “How did decades of imperial rivalry and fear culminate in thirty days of madness?”
      </div>
    </div>

    <!-- Hero Primary Source Presentation -->
    <div style="border: 1.2px solid #cbd5e1; border-radius: 6px; padding: 7px; background: #ffffff; box-shadow: 0 2px 6px rgba(0,0,0,0.04); margin-bottom: 9px;">
      <div style="width: 100%; height: 445px; border-radius: 4px; overflow: hidden; border: 1px solid #e2e8f0; background: #0f172a;">
        <img src="${coverImg}" style="width: 100%; height: 100%; object-fit: cover; object-position: center; display: block;" alt="HMS Dreadnought at Sea">
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 5px; padding: 0 4px; font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #64748b;">
        <span><strong>Primary Visual Plate:</strong> Royal Navy battleship <em>HMS Dreadnought</em> at sea (c. 1906–1907)</span>
        <span style="font-style: italic;">Imperial War Museum Photographic Archive</span>
      </div>
    </div>

    <!-- Curriculum Synopsis Box -->
    <div style="border: 1.2px solid #e2e8f0; border-radius: 5px; padding: 8px 12px; background: #fafaf9; margin-bottom: 9px;">
      <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; text-transform: uppercase; letter-spacing: 1px; color: #0f172a; font-weight: 700; margin-bottom: 3px;">
        Curriculum Synopsis &bull; The Powder Keg of Europe
      </div>
      <p style="font-family: 'Georgia', serif; font-size: 8.5pt; color: #334155; line-height: 1.45; margin: 0; text-align: justify;">
        For forty years following the 1871 unification of Germany, the European Great Powers preserved an uneasy armed peace through intricate alliances, imperial expansion, and massive dreadnought construction. In this master enquiry workbook, pupils investigate how long-term militarism, colonial jealousy in Africa, and rigid railway mobilisations transformed two pistol shots in Sarajevo into the unprecedented catastrophe of the First World War.
      </p>
    </div>

    <!-- 6 Core Enquiries Unit Syllabus Roadmap -->
    <div style="border: 1px solid #cbd5e1; border-radius: 5px; padding: 7px 10px; background: #f8fafc;">
      <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase; letter-spacing: 1px; color: #1e3a8a; font-weight: 700; margin-bottom: 4px;">
        The 6 Disciplinary Enquiries:
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px;">
        <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #334155; padding: 2.5px 6px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 3px; display: flex; align-items: center;"><strong style="color: #1e3a8a; margin-right: 5px; white-space: nowrap;">L1:</strong> Creation of the German Empire (1871)</div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #334155; padding: 2.5px 6px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 3px; display: flex; align-items: center;"><strong style="color: #1e3a8a; margin-right: 5px; white-space: nowrap;">L4:</strong> Dreadnought &amp; The Naval Arms Race</div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #334155; padding: 2.5px 6px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 3px; display: flex; align-items: center;"><strong style="color: #1e3a8a; margin-right: 5px; white-space: nowrap;">L2:</strong> Franco-Prussian War &amp; Alsace-Lorraine</div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #334155; padding: 2.5px 6px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 3px; display: flex; align-items: center;"><strong style="color: #1e3a8a; margin-right: 5px; white-space: nowrap;">L5:</strong> The Alliance System: Peace or Trap?</div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #334155; padding: 2.5px 6px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 3px; display: flex; align-items: center;"><strong style="color: #1e3a8a; margin-right: 5px; white-space: nowrap;">L3:</strong> The Scramble for Africa &amp; Weltpolitik</div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #334155; padding: 2.5px 6px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 3px; display: flex; align-items: center;"><strong style="color: #1e3a8a; margin-right: 5px; white-space: nowrap;">L6:</strong> Sarajevo &amp; The Thirty-Seven Days of Crisis</div>
      </div>
    </div>
  </div>
`;

  // ==========================================
  // PAGES 2–3: LIVING UNIT TIMELINE SPINE
  // ==========================================
  html += `
  <!-- PAGE 2: TIMELINE PART I -->
  <div class="page page-container" id="page-2" style="padding: 16px 18px; border: 1px solid #cbd5e1; outline: 3.5px double #0f172a; outline-offset: -8px; justify-content: space-between;">
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #1e3a8a; padding-bottom: 4px; margin-bottom: 8px;">
        <div>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.8pt; text-transform: uppercase; letter-spacing: 1px; color: #1e3a8a; font-weight: 700;">
            Living Unit Timeline &bull; Part I: The Road to Armed Peace (1871–1904)
          </div>
          <h2 style="margin: 2px 0 0 0; font-family: 'Playfair Display', serif; font-size: 14pt; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px;">
            The European Balance of Power
          </h2>
        </div>
        <span class="archival-badge" style="background: #eff6ff; color: #1e3a8a; border-color: #bfdbfe;">
          Pages 2–3 Facing Spread
        </span>
      </div>

      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-left: 3px solid #1e3a8a; padding: 4px 8px; margin-bottom: 8px; border-radius: 3px; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #475569; display: flex; justify-content: space-between; align-items: center;">
        <span><strong>Living Timeline Protocol:</strong> Throughout this unit, sketch each historical milestone inside its dedicated frame. Add dates, flags, and causal arrows.</span>
        <span style="font-weight: 700; color: #1e3a8a; white-space: nowrap; margin-left: 8px;">Spine &bull; Facing Left</span>
      </div>

      <!-- Timeline Nodes -->
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <!-- Milestone 1: 1871 -->
        <div style="display: grid; grid-template-columns: 105px 1fr; gap: 10px; align-items: stretch; border: 1px solid #cbd5e1; border-radius: 4px; padding: 5px 8px; background: #ffffff;">
          <div style="border: 1.2px dashed #94a3b8; border-radius: 3px; background: #fafaf9; display: flex; flex-direction: column; justify-content: space-between; padding: 3px 4px; min-height: 28mm;">
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌜</span><span>Sketchpad</span><span>⌝</span>
            </div>
            <div style="text-align: center; font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #64748b; font-style: italic;">
              [Sketch: Hall of Mirrors / Pickelhaube helmet]
            </div>
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌞</span><span>1871 Unification</span><span>⌟</span>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
                <span style="font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; background: #1e3a8a; color: #ffffff; padding: 1px 6px; border-radius: 3px;">1871</span>
                <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f172a;">Proclamation of the German Empire at Versailles</strong>
              </div>
              <p style="font-family: 'Georgia', serif; font-size: 7.8pt; color: #334155; line-height: 1.35; margin: 0;">
                Following the crushing defeat of Napoleon III in the Franco-Prussian War, King Wilhelm I of Prussia is crowned Kaiser in the French palace of Versailles. Germany annexes the mineral-rich provinces of Alsace and Lorraine, cementing bitter French <em>revanche</em>.
              </p>
            </div>
            <div style="border-top: 1px dotted #cbd5e1; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b;">
              <strong>Key Enquiry Link:</strong> Lessons 1 &amp; 2 &bull; Power shift to Berlin &bull; French territorial loss
            </div>
          </div>
        </div>

        <!-- Milestone 2: 1882 -->
        <div style="display: grid; grid-template-columns: 105px 1fr; gap: 10px; align-items: stretch; border: 1px solid #cbd5e1; border-radius: 4px; padding: 5px 8px; background: #ffffff;">
          <div style="border: 1.2px dashed #94a3b8; border-radius: 3px; background: #fafaf9; display: flex; flex-direction: column; justify-content: space-between; padding: 3px 4px; min-height: 28mm;">
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌜</span><span>Sketchpad</span><span>⌝</span>
            </div>
            <div style="text-align: center; font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #64748b; font-style: italic;">
              [Sketch: Triple Alliance pact / Eagle crests]
            </div>
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌞</span><span>1882 Alliance</span><span>⌟</span>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
                <span style="font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; background: #1e3a8a; color: #ffffff; padding: 1px 6px; border-radius: 3px;">1882</span>
                <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f172a;">Formation of the Triple Alliance</strong>
              </div>
              <p style="font-family: 'Georgia', serif; font-size: 7.8pt; color: #334155; line-height: 1.35; margin: 0;">
                Bismarck secures Germany's southern flank by forming a defensive military alliance with Austria-Hungary and Italy. Bismarck's primary goal is to keep France isolated and deprived of continental allies, preventing any coalition from threatening Berlin.
              </p>
            </div>
            <div style="border-top: 1px dotted #cbd5e1; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b;">
              <strong>Key Enquiry Link:</strong> Lesson 5 &bull; The alliance system as a defensive deterrent
            </div>
          </div>
        </div>

        <!-- Milestone 3: 1890 -->
        <div style="display: grid; grid-template-columns: 105px 1fr; gap: 10px; align-items: stretch; border: 1.5px solid #1e3a8a; border-radius: 4px; padding: 5px 8px; background: #fffdfa;">
          <div style="border: 1.2px dashed #1e3a8a; border-radius: 3px; background: #f0f9ff; display: flex; flex-direction: column; justify-content: space-between; padding: 3px 4px; min-height: 28mm;">
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #0284c7;">
              <span>⌜</span><span>Sketchpad</span><span>⌝</span>
            </div>
            <div style="text-align: center; font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #0369a1; font-weight: 600;">
              [Sketch: Punch cartoon 'Dropping the Pilot']
            </div>
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #0284c7;">
              <span>⌞</span><span>1890 Dismissal</span><span>⌟</span>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
                <span style="font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; background: #0284c7; color: #ffffff; padding: 1px 6px; border-radius: 3px;">1890</span>
                <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f172a;">Kaiser Wilhelm II Dismisses Bismarck: The Launch of Weltpolitik</strong>
              </div>
              <p style="font-family: 'Georgia', serif; font-size: 7.8pt; color: #334155; line-height: 1.35; margin: 0;">
                The young, impetuous Kaiser Wilhelm II forces Bismarck to resign, abandons the secret Reinsurance Treaty with Russia, and embarks on <em>Weltpolitik</em>—demanding Germany’s "Place in the Sun" through an aggressive colonial empire and a high-seas navy.
              </p>
            </div>
            <div style="border-top: 1px dotted #cbd5e1; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #0369a1;">
              <strong>Key Enquiry Link:</strong> Lessons 3 &amp; 4 &bull; End of diplomatic caution &bull; Franco-Russian alliance (1894)
            </div>
          </div>
        </div>

        <!-- Milestone 4: 1898–1904 -->
        <div style="display: grid; grid-template-columns: 105px 1fr; gap: 10px; align-items: stretch; border: 1px solid #cbd5e1; border-radius: 4px; padding: 5px 8px; background: #ffffff;">
          <div style="border: 1.2px dashed #94a3b8; border-radius: 3px; background: #fafaf9; display: flex; flex-direction: column; justify-content: space-between; padding: 3px 4px; min-height: 28mm;">
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌜</span><span>Sketchpad</span><span>⌝</span>
            </div>
            <div style="text-align: center; font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #64748b; font-style: italic;">
              [Sketch: Battleship guns / Entente handshake]
            </div>
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌞</span><span>1904 Entente</span><span>⌟</span>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
                <span style="font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; background: #1e3a8a; color: #ffffff; padding: 1px 6px; border-radius: 3px;">1898–04</span>
                <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f172a;">German Naval Laws &amp; The Anglo-French Entente Cordiale</strong>
              </div>
              <p style="font-family: 'Georgia', serif; font-size: 7.8pt; color: #334155; line-height: 1.35; margin: 0;">
                Admiral Tirpitz passes the German Navy Laws to construct a fleet capable of challenging Britain. Alarmed by German naval expansion, Great Britain abandons "Splendid Isolation" in 1904, signing the historic <em>Entente Cordiale</em> with its historic rival, France.
              </p>
            </div>
            <div style="border-top: 1px dotted #cbd5e1; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b;">
              <strong>Key Enquiry Link:</strong> Lessons 3 &amp; 5 &bull; Two-Power Standard &bull; Polarisation of Europe into two armed blocs
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Colophon -->
    <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #cbd5e1; padding-top: 3px; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #94a3b8;">
      <span>The History Department &bull; Causes of the Great War</span>
      <span>Page 2 (Facing Spread Left)</span>
    </div>
  </div>

  <!-- PAGE 3: TIMELINE PART II -->
  <div class="page page-container" id="page-3" style="padding: 16px 18px; border: 1px solid #cbd5e1; outline: 3.5px double #0f172a; outline-offset: -8px; justify-content: space-between;">
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #1e3a8a; padding-bottom: 4px; margin-bottom: 8px;">
        <div>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.8pt; text-transform: uppercase; letter-spacing: 1px; color: #1e3a8a; font-weight: 700;">
            Living Unit Timeline &bull; Part II: Crises &amp; The Spark (1905–1914)
          </div>
          <h2 style="margin: 2px 0 0 0; font-family: 'Playfair Display', serif; font-size: 14pt; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px;">
            The Escalation to Total War
          </h2>
        </div>
        <span class="archival-badge" style="background: #eff6ff; color: #1e3a8a; border-color: #bfdbfe;">
          Pages 2–3 Facing Spread
        </span>
      </div>

      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-left: 3px solid #1e3a8a; padding: 4px 8px; margin-bottom: 8px; border-radius: 3px; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #475569; display: flex; justify-content: space-between; align-items: center;">
        <span><strong>Living Timeline Protocol:</strong> Trace the countdown from the Dreadnought revolution to the Sarajevo assassination and Belgian invasion.</span>
        <span style="font-weight: 700; color: #1e3a8a; white-space: nowrap; margin-left: 8px;">Spine &bull; Facing Right</span>
      </div>

      <!-- Timeline Nodes -->
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <!-- Milestone 5: 1906 -->
        <div style="display: grid; grid-template-columns: 1fr 105px; gap: 10px; align-items: stretch; border: 1px solid #cbd5e1; border-radius: 4px; padding: 5px 8px; background: #ffffff;">
          <div style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
                <span style="font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; background: #1e3a8a; color: #ffffff; padding: 1px 6px; border-radius: 3px;">1906</span>
                <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f172a;">Launch of HMS Dreadnought: The Naval Revolution</strong>
              </div>
              <p style="font-family: 'Georgia', serif; font-size: 7.8pt; color: #334155; line-height: 1.35; margin: 0;">
                The Royal Navy launches <em>HMS Dreadnought</em> in Portsmouth. Powered by steam turbines and mounting ten 12-inch guns, it makes all existing warships obsolete. Germany immediately enlarges the Kiel Canal and begins building its own Nassau-class dreadnoughts.
              </p>
            </div>
            <div style="border-top: 1px dotted #cbd5e1; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b;">
              <strong>Key Enquiry Link:</strong> Lesson 4 &bull; Naval arms race &bull; Public hysteria ("We want eight and we won't wait!")
            </div>
          </div>
          <div style="border: 1.2px dashed #94a3b8; border-radius: 3px; background: #fafaf9; display: flex; flex-direction: column; justify-content: space-between; padding: 3px 4px; min-height: 28mm;">
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌜</span><span>Sketchpad</span><span>⌝</span>
            </div>
            <div style="text-align: center; font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #64748b; font-style: italic;">
              [Sketch: Dreadnought dreadnought gun turret]
            </div>
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌞</span><span>1906 Dreadnought</span><span>⌟</span>
            </div>
          </div>
        </div>

        <!-- Milestone 6: 1908–1911 -->
        <div style="display: grid; grid-template-columns: 1fr 105px; gap: 10px; align-items: stretch; border: 1px solid #cbd5e1; border-radius: 4px; padding: 5px 8px; background: #ffffff;">
          <div style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
                <span style="font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; background: #1e3a8a; color: #ffffff; padding: 1px 6px; border-radius: 3px;">1908–11</span>
                <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f172a;">Bosnian Crisis &amp; The Agadir Incident</strong>
              </div>
              <p style="font-family: 'Georgia', serif; font-size: 7.8pt; color: #334155; line-height: 1.35; margin: 0;">
                Austria-Hungary annexes Bosnia and Herzegovina in 1908, infuriating Serbia and humiliating Russia. In 1911, Germany sends the gunboat <em>Panther</em> to Morocco. Britain intervenes to back France, cementing Anglo-French military coordination.
              </p>
            </div>
            <div style="border-top: 1px dotted #cbd5e1; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b;">
              <strong>Key Enquiry Link:</strong> Lessons 3 &amp; 5 &bull; The Balkan Powder Keg &bull; Serbian nationalist underground
            </div>
          </div>
          <div style="border: 1.2px dashed #94a3b8; border-radius: 3px; background: #fafaf9; display: flex; flex-direction: column; justify-content: space-between; padding: 3px 4px; min-height: 28mm;">
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌜</span><span>Sketchpad</span><span>⌝</span>
            </div>
            <div style="text-align: center; font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #64748b; font-style: italic;">
              [Sketch: SMS Panther gunboat / Balkan map]
            </div>
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌞</span><span>1911 Agadir</span><span>⌟</span>
            </div>
          </div>
        </div>

        <!-- Milestone 7: 28 June 1914 -->
        <div style="display: grid; grid-template-columns: 1fr 105px; gap: 10px; align-items: stretch; border: 1.5px solid #b91c1c; border-radius: 4px; padding: 5px 8px; background: #fffaf0;">
          <div style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
                <span style="font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; background: #b91c1c; color: #ffffff; padding: 1px 6px; border-radius: 3px;">28 June 1914</span>
                <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f172a;">Assassination of Archduke Franz Ferdinand in Sarajevo</strong>
              </div>
              <p style="font-family: 'Georgia', serif; font-size: 7.8pt; color: #334155; line-height: 1.35; margin: 0;">
                Nineteen-year-old Bosnian Serb militant Gavrilo Princip shoots Archduke Franz Ferdinand and his wife Sophie at point-blank range on Franz Josef Street. Princip is armed and trained by the clandestine Serbian military network, <em>The Black Hand</em>.
              </p>
            </div>
            <div style="border-top: 1px dotted #cbd5e1; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #b91c1c;">
              <strong>Key Enquiry Link:</strong> Lesson 6 &bull; Fatal wrong turn &bull; FN Browning semi-automatic pistol
            </div>
          </div>
          <div style="border: 1.2px dashed #b91c1c; border-radius: 3px; background: #fef2f2; display: flex; flex-direction: column; justify-content: space-between; padding: 3px 4px; min-height: 28mm;">
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #b91c1c;">
              <span>⌜</span><span>Sketchpad</span><span>⌝</span>
            </div>
            <div style="text-align: center; font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #991b1b; font-weight: 600;">
              [Sketch: Browning pistol / Stalled open car]
            </div>
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #b91c1c;">
              <span>⌞</span><span>Sarajevo Spark</span><span>⌟</span>
            </div>
          </div>
        </div>

        <!-- Milestone 8: July–Aug 1914 -->
        <div style="display: grid; grid-template-columns: 1fr 105px; gap: 10px; align-items: stretch; border: 1px solid #cbd5e1; border-radius: 4px; padding: 5px 8px; background: #ffffff;">
          <div style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
                <span style="font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; background: #1e3a8a; color: #ffffff; padding: 1px 6px; border-radius: 3px;">July–Aug 1914</span>
                <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f172a;">The July Crisis &amp; The Outbreak of Total War</strong>
              </div>
              <p style="font-family: 'Georgia', serif; font-size: 7.8pt; color: #334155; line-height: 1.35; margin: 0;">
                Backed by Germany’s "Blank Cheque", Austria-Hungary issues an ultimatum and declares war on Serbia. Russia mobilizes; Germany declares war on Russia and France, invading neutral Belgium under the Schlieffen Plan. Britain declares war on Germany on 4 August.
              </p>
            </div>
            <div style="border-top: 1px dotted #cbd5e1; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b;">
              <strong>Key Enquiry Link:</strong> Lesson 6 &bull; The July Crisis Domino Sequence &bull; Treaty of London (1839)
            </div>
          </div>
          <div style="border: 1.2px dashed #94a3b8; border-radius: 3px; background: #fafaf9; display: flex; flex-direction: column; justify-content: space-between; padding: 3px 4px; min-height: 28mm;">
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌜</span><span>Sketchpad</span><span>⌝</span>
            </div>
            <div style="text-align: center; font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #64748b; font-style: italic;">
              [Sketch: 4 August declaration / Belgian border]
            </div>
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌞</span><span>1914 World War</span><span>⌟</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Colophon -->
    <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #cbd5e1; padding-top: 3px; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #94a3b8;">
      <span>The History Department &bull; Causes of the Great War</span>
      <span>Page 3 (Facing Spread Right)</span>
    </div>
  </div>
`;

  // ==========================================
  // PAGES 4–15: 6 DOUBLE-PAGE SPREADS
  // ==========================================
  lessons.forEach((lesson, lIdx) => {
    const cfg = lessonConfigs[lIdx];
    const leftPageNum = lIdx * 2 + 4;
    const rightPageNum = lIdx * 2 + 5;

    // ----------------------------------------------------
    // LEFT PAGE (Verso, Even Page Number)
    // ----------------------------------------------------
    html += `
    <div class="page page-container" id="page-${leftPageNum}" style="padding: 16px 18px; border: 1px solid #cbd5e1; outline: 3.5px double #0f172a; outline-offset: -8px; justify-content: space-between;">
      <div>
        <!-- Lesson Header -->
        <div style="border-bottom: 2px solid #1e3a8a; padding-bottom: 4px; margin-bottom: 6px; display: flex; justify-content: space-between; align-items: flex-end;">
          <div>
            <div style="font-family: 'Inter', sans-serif; font-size: 8pt; text-transform: uppercase; letter-spacing: 1px; color: #64748b; font-weight: 600;">
              Unit 9: Causes of the Great War &bull; Lesson ${lIdx + 1}
            </div>
            <h2 style="font-family: 'Playfair Display', serif; font-size: 13.5pt; color: #0f172a; margin: 2px 0 0 0; line-height: 1.2;">
              L${lIdx + 1}: ${lesson.title}
            </h2>
          </div>
          <span class="archival-badge" style="background: #eff6ff; color: #1e3a8a; border-color: #bfdbfe;">Evidence &amp; Skills Launch</span>
        </div>

        <!-- Learning Objectives -->
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 5px 8px; margin-bottom: 6px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; text-transform: uppercase; color: #475569; letter-spacing: 0.5px; display: block; margin-bottom: 2px;">Core Learning Objectives:</strong>
          <ul style="margin: 0; padding-left: 16px; font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #334155; line-height: 1.35;">
    `;
    const objs =
      lesson.teacher_notes && lesson.teacher_notes.objectives
        ? lesson.teacher_notes.objectives.map((o) => o.objective)
        : lesson.learning_objectives
          ? lesson.learning_objectives.scaffolded
          : [];
    (objs || []).slice(0, 3).forEach((obj) => {
      html += `<li>${obj}</li>`;
    });
    html += `
          </ul>
        </div>

        <!-- Do Now Recall Strip -->
        <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 5px 8px; margin-bottom: 6px; background: #ffffff;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 3px; margin-bottom: 4px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; text-transform: uppercase; letter-spacing: 0.6px; color: #0f172a;">Do Now: Prior Knowledge Recall</strong>
            </div>
            <span style="font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 700; color: #1e3a8a; background: #eff6ff; border: 1px solid #bfdbfe; padding: 1px 7px; border-radius: 3px;">Score: &nbsp; &nbsp; / 5</span>
          </div>
          <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px;">
    `;
    const doNowItems = lesson.do_now && lesson.do_now.items ? lesson.do_now.items.slice(0, 5) : [];
    doNowItems.forEach((item, qIdx) => {
      html += `
            <div style="background: #fafaf9; border: 1px solid #e2e8f0; border-radius: 3px; padding: 4px 5px; display: flex; flex-direction: column; justify-content: space-between;">
              <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; line-height: 1.22; color: #1e293b; margin-bottom: 2px;">
                <strong style="color: #1e3a8a;">Q${qIdx + 1}:</strong> ${item.question || item.q}
              </div>
              <div>
                <div class="task-line-dotted" style="height: 5.2mm;"></div>
                <div class="task-line-dotted" style="height: 5.2mm;"></div>
              </div>
            </div>
      `;
    });
    html += `
          </div>
        </div>

        <!-- Core Vocabulary Check -->
        <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 5px 8px; margin-bottom: 6px; background: #fdfbf7;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; text-transform: uppercase; color: #0f172a; letter-spacing: 0.5px;">Core Vocabulary &amp; Conceptual Precision</strong>
          </div>
    `;

    if (cfg.vocabTask.type === 'distinction') {
      html += `
          <div style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #334155; margin-bottom: 3px; line-height: 1.3;">
            ${cfg.vocabTask.prompt}
          </div>
          <div class="task-line" style="height: 5.8mm;"></div>
          <div class="task-line" style="height: 5.8mm;"></div>
      `;
    } else if (cfg.vocabTask.type === 'cloze') {
      html += `
          <div style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #334155; margin-bottom: 2px;">
            ${cfg.vocabTask.prompt}
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #1e293b; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 3px; padding: 3px 6px; margin-bottom: 2px; line-height: 1.3;">
            ${cfg.vocabTask.clozeText}
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #475569;">
            <strong>Application:</strong> ${cfg.vocabTask.followUp}
          </div>
          <div class="task-line" style="height: 5.4mm;"></div>
          <div class="task-line" style="height: 5.4mm;"></div>
      `;
    } else if (cfg.vocabTask.type === 'golden_sentence') {
      html += `
          <div style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #334155; margin-bottom: 2px; line-height: 1.25;">
            ${cfg.vocabTask.prompt}
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #0369a1; background: #f0f9ff; border: 1px solid #bae6fd; padding: 2px 6px; border-radius: 3px; margin-bottom: 3px;">
            <strong>Word Bank:</strong> ${cfg.vocabTask.wordBank}
          </div>
          <div class="task-line" style="height: 5.8mm;"></div>
          <div class="task-line" style="height: 5.8mm;"></div>
      `;
    }

    html += `
        </div>

        <!-- Task 4: Archival Forensic Interrogation / Bridge Task -->
        <div style="border: 1.5px solid #0f172a; border-radius: 5px; padding: 6px 9px; background: #ffffff;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.2px solid #0f172a; padding-bottom: 3px; margin-bottom: 4px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 8.6pt; color: #0f172a; text-transform: uppercase;">${cfg.bridgeTask.title}</strong>
          </div>
    `;

    if (cfg.bridgeTask.type === 'source_annotation') {
      html += `
          <div style="border: 1.2px solid #cbd5e1; border-left: 4px solid #1e3a8a; background: #fffdfa; border-radius: 4px; padding: 5px 9px; margin-bottom: 4px;">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px; margin-bottom: 3px;">
              <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.6px; color: #1e3a8a;">
                ${cfg.bridgeTask.sourceTitle}
              </span>
              <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; color: #475569; background: #f1f5f9; border: 1px solid #cbd5e1; padding: 1px 5px; border-radius: 3px;">
                ${cfg.bridgeTask.shelfmark}
              </span>
            </div>
            <div style="font-family: 'Georgia', serif; font-size: 8.4pt; font-style: italic; color: #1e293b; line-height: 1.35; margin-bottom: 2px;">
              ${cfg.bridgeTask.sourceText}
            </div>
            <div style="font-family: 'Inter', sans-serif; font-size: 7pt; color: #64748b; border-top: 1px dotted #e2e8f0; padding-top: 2px;">
              <strong>Provenance:</strong> ${cfg.bridgeTask.provenance}
            </div>
          </div>

          <div style="margin-bottom: 3px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #0f172a;">1. Historical Inference:</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #334155;">${cfg.bridgeTask.questionA}</span>
            <div class="task-line" style="height: 5.6mm;"></div>
            <div class="task-line" style="height: 5.6mm;"></div>
          </div>

          <div style="margin-bottom: 3px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #0f172a;">2. Contextual Explanation:</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #334155;">${cfg.bridgeTask.questionB}</span>
            <div class="task-line" style="height: 5.6mm;"></div>
            <div class="task-line" style="height: 5.6mm;"></div>
          </div>
      `;
    } else if (cfg.bridgeTask.type === 'source_utility') {
      html += `
          <div style="border: 1px solid #cbd5e1; border-left: 3px solid #1e3a8a; background: #fdfbf7; padding: 5px 8px; font-size: 8.2pt; font-style: italic; color: #1e293b; margin-bottom: 4px; line-height: 1.35;">
            ${cfg.bridgeTask.sourceText}
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #334155; margin-bottom: 3px;">
            ${cfg.bridgeTask.instruction}
          </div>
          <div class="task-line" style="height: 5.8mm;"></div>
          <div class="task-line" style="height: 5.8mm;"></div>
          <div class="task-line" style="height: 5.8mm;"></div>
          <div class="task-line" style="height: 5.8mm;"></div>
          <div class="task-line" style="height: 5.8mm;"></div>
      `;
    } else if (cfg.bridgeTask.type === 'causal_pivot') {
      html += `
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 5px; margin-bottom: 4px;">
            ${cfg.bridgeTask.steps
              .map(
                (s) => `
              <div style="border: 1px solid #bae6fd; background: #f0f9ff; border-radius: 3px; padding: 4px 5px; font-family: 'Inter', sans-serif;">
                <span style="font-size: 7.2pt; font-weight: 700; color: #0369a1; display: block; margin-bottom: 1px;">${s.stage} (${s.year})</span>
                <span style="font-size: 7pt; color: #1e293b; line-height: 1.25; display: block;">${s.text}</span>
              </div>
            `,
              )
              .join('')}
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #1e293b; margin-bottom: 2px;">
            <strong>Causal Analysis:</strong> ${cfg.bridgeTask.prompt}
          </div>
          <div class="task-line" style="height: 5.8mm;"></div>
          <div class="task-line" style="height: 5.8mm;"></div>
          <div class="task-line" style="height: 5.8mm;"></div>
          <div class="task-line" style="height: 5.8mm;"></div>
      `;
    } else if (cfg.bridgeTask.type === 'dual_source_interrogation') {
      html += `
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 4px;">
            <div style="border: 1px solid #cbd5e1; border-left: 3px solid #1e3a8a; background: #f8fafc; padding: 4px 6px; border-radius: 3px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #1e3a8a; display: block; margin-bottom: 2px;">${cfg.bridgeTask.sourceATitle}</strong>
              <div style="font-family: 'Georgia', serif; font-size: 7.6pt; font-style: italic; color: #334155; line-height: 1.25;">${cfg.bridgeTask.sourceAText}</div>
            </div>
            <div style="border: 1px solid #cbd5e1; border-left: 3px solid #b91c1c; background: #fffaf0; padding: 4px 6px; border-radius: 3px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #b91c1c; display: block; margin-bottom: 2px;">${cfg.bridgeTask.sourceBTitle}</strong>
              <div style="font-family: 'Georgia', serif; font-size: 7.6pt; font-style: italic; color: #334155; line-height: 1.25;">${cfg.bridgeTask.sourceBText}</div>
            </div>
          </div>
          <div style="margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #1e3a8a;">1. Forensic Route Analysis (Source A):</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #334155;">${cfg.bridgeTask.questionA}</span>
            <div class="task-line" style="height: 5.4mm;"></div>
            <div class="task-line" style="height: 5.4mm;"></div>
          </div>
          <div style="margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #b91c1c;">2. The Blank Cheque Escalation (Source B):</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #334155;">${cfg.bridgeTask.questionB}</span>
            <div class="task-line" style="height: 5.4mm;"></div>
            <div class="task-line" style="height: 5.4mm;"></div>
          </div>
      `;
    }

    html += `
          <div style="display: flex; justify-content: space-between; align-items: baseline; border-top: 1px dotted #cbd5e1; padding-top: 2px; margin-top: 3px;">
            <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #64748b;">${cfg.bridgeTask.clue || ''}</span>
            <span style="font-family: 'Georgia', serif; font-size: 7.5pt; color: #1e3a8a; font-style: italic;">${cfg.bridgeTask.scholarsEdge || ''}</span>
          </div>
        </div>
      </div>

      <!-- Left Page Footer -->
      <div style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #94a3b8; display: flex; justify-content: space-between; border-top: 1px solid #e2e8f0; padding-top: 3px;">
        <span>The History Department &bull; Causes of the Great War (V2 Staged)</span>
        <span>Page ${leftPageNum} (Facing Spread Left)</span>
      </div>
    </div>
    `;

    // ----------------------------------------------------
    // RIGHT PAGE (Recto, Odd Page Number: Extended Writing)
    // ----------------------------------------------------
    html += `
    <div class="page page-container" id="page-${rightPageNum}" style="padding: 16px 18px; border: 1px solid #cbd5e1; outline: 3.5px double #0f172a; outline-offset: -8px; justify-content: space-between;">
      <div>
        <!-- Enquiry Question Header -->
        <div style="border-bottom: 2px solid #1e3a8a; padding-bottom: 4px; margin-bottom: 6px; display: flex; justify-content: space-between; align-items: flex-end;">
          <div>
            <div style="font-family: 'Inter', sans-serif; font-size: 8pt; text-transform: uppercase; letter-spacing: 1px; color: #1e3a8a; font-weight: 700;">
              Historical Skill: ${cfg.skill}
            </div>
            <h3 style="font-family: 'Playfair Display', serif; font-size: 12.5pt; color: #0f172a; margin: 2px 0 0 0; line-height: 1.25;">
              ${cfg.enquiryQuestion}
            </h3>
          </div>
          <span class="archival-badge" style="background: #eff6ff; color: #1e3a8a; border-color: #bfdbfe; flex-shrink: 0;">Extended Writing</span>
        </div>

        <!-- 3-Tier Structure Strip -->
        <div style="border: 1.2px solid #cbd5e1; border-radius: 5px; padding: 5px 8px; background: #f8fafc; margin-bottom: 6px;">
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; margin-bottom: 3px;">
            ${cfg.structureStrip
              .map(
                (s) => `
              <div style="border: 1px solid #e2e8f0; border-radius: 3px; padding: 4px 6px; background: #ffffff;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; color: #1e3a8a; display: block; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px; margin-bottom: 2px;">${s.col}</strong>
                <span style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #334155; line-height: 1.25; display: block;">${s.text}</span>
              </div>
            `,
              )
              .join('')}
          </div>
          
          <div style="border-top: 1px dashed #cbd5e1; padding-top: 3px; display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 7.6pt;">
            <span style="color: #475569;"><strong>Causal Connectives &amp; Analytical Stems:</strong> ${cfg.connectives}</span>
          </div>
        </div>

        <!-- Disciplinary Writing Framework Strip (PEEL) -->
        <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 3px; padding: 3px 8px; margin-bottom: 5px; display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #1e293b;">
          <span><strong style="color: #1e3a8a;">[P] Point:</strong> Clear historical claim addressing the question.</span>
          <span><strong style="color: #1e3a8a;">[E] Evidence:</strong> Specific dates, names, treaties, or source citations.</span>
          <span><strong style="color: #1e3a8a;">[E] Explanation:</strong> Causal mechanism showing how it increased conflict.</span>
          <span><strong style="color: #1e3a8a;">[L] Link:</strong> Direct evaluative link back to overall enquiry question.</span>
        </div>

        <!-- Dynamic Auto-Fill Ruled Writing Lines -->
        <div class="auto-fill-writing-lines" data-line-height="7.6" style="width: 100%; margin-bottom: 4px;">
          ${Array(15).fill('<div class="task-line" style="height: 7.6mm;"></div>').join('')}
        </div>
      </div>

      <!-- Teacher Feedback & DIRT Target Strip -->
      <div>
        <div style="border: 1.2px solid #94a3b8; border-radius: 4px; padding: 5px 8px; background: #f8fafc; margin-bottom: 4px;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 3px;">
            <div style="display: flex; gap: 15px; font-family: 'Inter', sans-serif; font-size: 7.5pt;">
              <span><strong>Mark:</strong> &nbsp; &nbsp; &nbsp; / 16</span>
              <span><strong>DOK Level:</strong> &nbsp; [ 1 &bull; 2 &bull; 3 &bull; 4 ]</span>
              <span><strong>Fingertip Vocab Used:</strong> &nbsp; [ Y &bull; N ]</span>
            </div>
            <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 700; color: #1e3a8a; text-transform: uppercase;">Teacher Assessment &bull; DIRT Target</span>
          </div>
          <div style="display: grid; grid-template-columns: 80px 1fr; gap: 8px; align-items: center;">
            <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #475569; font-weight: 600;">DIRT Target:</span>
            <div class="task-line" style="height: 5mm; border-bottom-style: dotted;"></div>
          </div>
        </div>

        <!-- Right Page Footer -->
        <div style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #94a3b8; display: flex; justify-content: space-between; border-top: 1px solid #e2e8f0; padding-top: 3px;">
          <span>Causes of the Great War &bull; Extended Writing Spread</span>
          <span>Page ${rightPageNum} (Facing Spread Right)</span>
        </div>
      </div>
    </div>
    `;
  });

  // ==========================================
  // PAGE 16: MASTER BACK COVER
  // ==========================================
  html += `
  <div class="page page-container" id="page-16" style="padding: 16px 18px; border: 1px solid #cbd5e1; outline: 3.5px double #0f172a; outline-offset: -8px; justify-content: space-between;">
    <div>
      <div style="border-bottom: 2px solid #1e3a8a; padding-bottom: 4px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: flex-end;">
        <div>
          <div style="font-family: 'Inter', sans-serif; font-size: 8pt; text-transform: uppercase; letter-spacing: 1.5px; color: #1e3a8a; font-weight: 700;">
            The History Department &bull; Assessment &amp; Revision Synthesis
          </div>
          <h2 style="font-family: 'Playfair Display', serif; font-size: 15pt; color: #0f172a; margin: 2px 0 0 0; text-transform: uppercase; letter-spacing: 0.8px;">
            Causes of the Great War (1871–1914) &bull; Master Review
          </h2>
        </div>
        <span class="archival-badge" style="background: #eff6ff; color: #1e3a8a; border-color: #bfdbfe;">Unit Revision Hub</span>
      </div>

      <!-- M-A-I-N Causal Matrix -->
      <div style="border: 1.5px solid #0f172a; border-radius: 5px; padding: 6px 10px; background: #ffffff; margin-bottom: 8px;">
        <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f172a; text-transform: uppercase; display: block; border-bottom: 1.2px solid #0f172a; padding-bottom: 2px; margin-bottom: 5px;">
          The M-A-I-N Framework of Long-Term Causes
        </strong>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px;">
          <div style="border: 1px solid #cbd5e1; border-left: 3px solid #1e3a8a; border-radius: 3px; padding: 4px 6px; background: #f8fafc;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #1e3a8a; display: block; margin-bottom: 1px;">[M] MILITARISM</strong>
            <span style="font-family: 'Georgia', serif; font-size: 7.5pt; color: #334155; line-height: 1.25; display: block;">The Anglo-German naval arms race (Dreadnoughts); rigid railway mobilization timetables (Schlieffen Plan); glorification of armed combat.</span>
          </div>
          <div style="border: 1px solid #cbd5e1; border-left: 3px solid #1e3a8a; border-radius: 3px; padding: 4px 6px; background: #f8fafc;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #1e3a8a; display: block; margin-bottom: 1px;">[A] ALLIANCES</strong>
            <span style="font-family: 'Georgia', serif; font-size: 7.5pt; color: #334155; line-height: 1.25; display: block;">The Triple Alliance (Germany, Austria-Hungary, Italy) vs. The Triple Entente (Britain, France, Russia). Intended as deterrence, but acted as a doomsday machine.</span>
          </div>
          <div style="border: 1px solid #cbd5e1; border-left: 3px solid #1e3a8a; border-radius: 3px; padding: 4px 6px; background: #f8fafc;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #1e3a8a; display: block; margin-bottom: 1px;">[I] IMPERIALISM</strong>
            <span style="font-family: 'Georgia', serif; font-size: 7.5pt; color: #334155; line-height: 1.25; display: block;">Kaiser Wilhelm II’s demand for a "Place in the Sun" (<em>Weltpolitik</em>); clashes over Morocco (Tangier 1905, Agadir 1911); the partition of Africa.</span>
          </div>
          <div style="border: 1px solid #cbd5e1; border-left: 3px solid #1e3a8a; border-radius: 3px; padding: 4px 6px; background: #f8fafc;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #1e3a8a; display: block; margin-bottom: 1px;">[N] NATIONALISM</strong>
            <span style="font-family: 'Georgia', serif; font-size: 7.5pt; color: #334155; line-height: 1.25; display: block;">French desire for <em>revanche</em> over Alsace-Lorraine; aggressive Pan-Slavic nationalism in the Balkans; Serbian terrorist networks (The Black Hand).</span>
          </div>
        </div>
      </div>

      <!-- Historiographical Verdict Strip -->
      <div style="border: 1px solid #cbd5e1; border-radius: 4px; padding: 6px 10px; background: #f8fafc; margin-bottom: 8px;">
        <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #1e3a8a; text-transform: uppercase; display: block; margin-bottom: 3px;">
          Historiographical Debate: Who Was to Blame?
        </strong>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
          <div style="font-family: 'Georgia', serif; font-size: 7.5pt; color: #1e293b; line-height: 1.3;">
            <strong style="color: #b91c1c;">Fritz Fischer (1961):</strong> Argued that imperial Germany bore primary responsibility by deliberately provoking a European war via the "Blank Cheque" to break out of encirclement and achieve world power status.
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 7.5pt; color: #1e293b; line-height: 1.3;">
            <strong style="color: #0369a1;">Christopher Clark (2012):</strong> Argued in <em>The Sleepwalkers</em> that all European powers shared blame. Leaders were blind to the catastrophic risks of their diplomatic maneuvers, sleepwalking into a tragedy none truly wanted.
          </div>
        </div>
      </div>

      <!-- Assessment Tracker & Mark Ledger -->
      <div style="border: 1px solid #cbd5e1; border-radius: 4px; padding: 6px 10px; background: #ffffff; margin-bottom: 8px;">
        <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #0f172a; text-transform: uppercase; display: block; margin-bottom: 4px;">
          Pupil Assessment &amp; DIRT Progress Ledger
        </strong>
        <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif; font-size: 7.2pt; border: 1px solid #cbd5e1;">
          <thead>
            <tr style="background: #f1f5f9; color: #0f172a;">
              <th style="padding: 3px 5px; border: 1px solid #cbd5e1; text-align: left;">Lesson Enquiry</th>
              <th style="padding: 3px 5px; border: 1px solid #cbd5e1; text-align: center; width: 65px;">Do Now (/5)</th>
              <th style="padding: 3px 5px; border: 1px solid #cbd5e1; text-align: center; width: 65px;">Essay (/16)</th>
              <th style="padding: 3px 5px; border: 1px solid #cbd5e1; text-align: center; width: 85px;">DIRT Complete</th>
              <th style="padding: 3px 5px; border: 1px solid #cbd5e1; text-align: left;">Teacher Signature</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style="padding: 3px 5px; border: 1px solid #cbd5e1;">L1: German Empire Unification (1871)</td><td style="border: 1px solid #cbd5e1;"></td><td style="border: 1px solid #cbd5e1;"></td><td style="border: 1px solid #cbd5e1; text-align: center;">[ &nbsp; ]</td><td style="border: 1px solid #cbd5e1;"></td></tr>
            <tr><td style="padding: 3px 5px; border: 1px solid #cbd5e1;">L2: Franco-Prussian War &amp; Alsace-Lorraine</td><td style="border: 1px solid #cbd5e1;"></td><td style="border: 1px solid #cbd5e1;"></td><td style="border: 1px solid #cbd5e1; text-align: center;">[ &nbsp; ]</td><td style="border: 1px solid #cbd5e1;"></td></tr>
            <tr><td style="padding: 3px 5px; border: 1px solid #cbd5e1;">L3: The Scramble for Africa &amp; Weltpolitik</td><td style="border: 1px solid #cbd5e1;"></td><td style="border: 1px solid #cbd5e1;"></td><td style="border: 1px solid #cbd5e1; text-align: center;">[ &nbsp; ]</td><td style="border: 1px solid #cbd5e1;"></td></tr>
            <tr><td style="padding: 3px 5px; border: 1px solid #cbd5e1;">L4: HMS Dreadnought &amp; Naval Arms Race</td><td style="border: 1px solid #cbd5e1;"></td><td style="border: 1px solid #cbd5e1;"></td><td style="border: 1px solid #cbd5e1; text-align: center;">[ &nbsp; ]</td><td style="border: 1px solid #cbd5e1;"></td></tr>
            <tr><td style="padding: 3px 5px; border: 1px solid #cbd5e1;">L5: The Alliance System: Peace or Trap?</td><td style="border: 1px solid #cbd5e1;"></td><td style="border: 1px solid #cbd5e1;"></td><td style="border: 1px solid #cbd5e1; text-align: center;">[ &nbsp; ]</td><td style="border: 1px solid #cbd5e1;"></td></tr>
            <tr><td style="padding: 3px 5px; border: 1px solid #cbd5e1;">L6: Sarajevo Assassination &amp; July Crisis</td><td style="border: 1px solid #cbd5e1;"></td><td style="border: 1px solid #cbd5e1;"></td><td style="border: 1px solid #cbd5e1; text-align: center;">[ &nbsp; ]</td><td style="border: 1px solid #cbd5e1;"></td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Final Institutional Signoff & End-of-Term Notice -->
    <div style="border-top: 1px solid #cbd5e1; padding-top: 5px; text-align: center; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #64748b;">
      <span>The History Revision Hub &bull; Year 9 Master Curriculum Series &bull; Staged 4-Act V2 Edition</span>
    </div>
  </div>
  `;

  html += `
  <script>
    // Automated auto-fill line balancer to guarantee zero dead space and zero overflow
    (function() {
      function autoFillPages() {
        const pages = document.querySelectorAll('.page');
        pages.forEach((page, pIdx) => {
          const topDiv = page.children[0];
          const footerDiv = page.children[page.children.length - 1];
          if (!topDiv || !footerDiv) return;

          const pStyle = window.getComputedStyle(page);
          const padTop = parseFloat(pStyle.paddingTop) || 0;
          const padBottom = parseFloat(pStyle.paddingBottom) || 0;

          function getGap() {
            return (page.clientHeight - padTop - padBottom) - (topDiv.offsetHeight + footerDiv.offsetHeight);
          }

          const writingContainer = page.querySelector('.auto-fill-writing-lines');
          if (writingContainer) {
            const lineH = parseFloat(writingContainer.getAttribute('data-line-height') || '7.6');
            const lineHPx = lineH * 3.7795;
            let safety = 0;
            while (getGap() > lineHPx + 8 && safety < 25) {
              const newLine = document.createElement('div');
              newLine.className = 'task-line';
              newLine.style.height = lineH + 'mm';
              writingContainer.appendChild(newLine);
              safety++;
            }
            while (getGap() < 6 && writingContainer.children.length > 8) {
              writingContainer.removeChild(writingContainer.lastElementChild);
            }
          }
        });
      }

      if (document.readyState === 'complete' || document.readyState === 'interactive') {
        autoFillPages();
      } else {
        window.addEventListener('DOMContentLoaded', autoFillPages);
      }
      window.addEventListener('load', autoFillPages);
    })();
  </script>
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

  // Write staged HTML file
  const outHtmlPath = path.join(ROOT_DIR, 'public', 'units', 'great_war', 'pupil_workbook_v2.html');
  fs.writeFileSync(outHtmlPath, html, 'utf8');
  console.log(`✅ Staged HTML generated at: ${outHtmlPath}`);

  // Compile PDF via Puppeteer
  console.log('🖨️ Compiling PDF via Puppeteer...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });
  await page.setContent(html, { waitUntil: 'networkidle0', timeout: 60000 });

  // Evaluate autoFillPages inside Puppeteer
  await page.evaluate(() => {
    if (window.autoFillPages) window.autoFillPages();
  });
  await new Promise((r) => setTimeout(r, 1500));

  const outPdfPath = path.join(ROOT_DIR, 'public', 'pdfs', 'great_war_pupil_workbook_V2.pdf');
  await page.pdf({
    path: outPdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '10mm', bottom: '12mm', left: '12mm', right: '12mm' },
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
  buildGreatWarTwoPageWorkbookHtml,
  renderGreatWarTwoPageWorkbook,
  lessonConfigs,
};
