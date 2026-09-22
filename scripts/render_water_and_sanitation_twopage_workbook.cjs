/**
 * History Revision Hub — Master Two-Page Spread Pupil Workbook Engine
 *
 * Target: units/water_and_sanitation (KS3 Year 7: Water & Sanitation Through Time)
 * Output: public/units/water_and_sanitation/pupil_workbook_v2.html
 * PDF:    public/pdfs/water_and_sanitation_pupil_workbook_V2.pdf
 *
 * Architecture:
 * - 16-Page A4 Pupil Workbook Standard (Zero Disruption: Staged V2 edition)
 * - Toned for Year 7 cognitive accessibility with lively storytelling and local Hampshire archaeological links
 * - Page 1: Master Front Cover (Aqueduct hero plate, Year 7 registration, 6-lesson syllabus)
 * - Pages 2–3: Living Unit Timeline (c.43 AD Roman Britain to 1948 Modern NHS Spine & Sketchpads)
 * - Pages 4–15: 6 Bespoke Double-Page Enquiry Spreads:
 *     Left Page:  Prior-Recall Do Now (5 items), Fingertip Vocab, Forensic Bridge Task
 *     Right Page: Master Enquiry Question, 3-Tier Structure Strip, Auto-Fill Ruled Lines, Teacher Assessment
 * - Page 16: Master Back Cover (2,000-Year Balance Sheet, Factors of Change, 6 QR Portals, Assessment Ledger)
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT_DIR = path.join(__dirname, '..');
const dataPath = path.join(ROOT_DIR, 'units', 'water_and_sanitation', 'data_v2_4act.js');

if (!fs.existsSync(dataPath)) {
  console.error('❌ Data file not found:', dataPath);
  process.exit(1);
}

// Load 4-Act staged data safely
const dataContent = fs.readFileSync(dataPath, 'utf8');
const sanitized = dataContent.replace(/export default.*;/g, '').replace(/export {.*};/g, '');
const mod = { exports: {} };
const fn = new Function('module', 'exports', sanitized);
fn(mod, mod.exports);
const unitData = mod.exports;

const lessons = unitData.lessons || [];
console.log(`Loaded ${lessons.length} Water & Sanitation 4-Act lessons for V2 Workbook.`);

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
    path.join(ROOT_DIR, 'units', 'water_and_sanitation', 'assets', path.basename(clean)),
    path.join(ROOT_DIR, 'public', 'units', 'water_and_sanitation', 'assets', path.basename(clean)),
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

// Bespoke pedagogical configurations for Water & Sanitation 6 lessons
const lessonConfigs = [
  {
    // Lesson 1: Roman Britain & Fishbourne Palace
    skill: 'Change & Technological Continuity',
    enquiryQuestion:
      'Enquiry: How much progress did the Romans make in public health and clean water engineering?',
    structureStrip: [
      {
        col: '1. CLEAN WATER & AQUEDUCTS',
        text: 'Explain how Roman gravity aqueducts carried fresh spring water over miles to public fountains, bathhouses, and private estates.',
      },
      {
        col: '2. BATHHOUSES & REMOVING WASTE',
        text: 'Explain how stone drains, communal latrines, and flushing sewer channels carried filthy waste away from towns into rivers.',
      },
      {
        col: '3. LIMITS OF PROGRESS',
        text: 'Judge the limits: Romans did not know germs caused disease, lead pipes could cause poisoning, and ordinary plebeians still lived in squalor.',
      },
    ],
    connectives:
      'The most impressive Roman achievement was... • For example, archaeological evidence shows that... • However, public health was limited because... • Consequently, while Roman engineering was brilliant, they lacked...',
    vocabTask: {
      type: 'distinction',
      termA: 'Aqueduct',
      termB: 'Cesspit',
      prompt:
        'Distinguish between an <strong>Aqueduct</strong> (a bridge or channel carrying fresh clean water into a town) and a <strong>Cesspit</strong> (a pit in the ground for collecting sewage):',
    },
    bridgeTask: {
      type: 'source_annotation',
      title: 'Task 4: Archaeological Interrogation: Fishbourne Roman Palace Water Systems',
      sourceTitle:
        'Source A: Archaeological Excavation Records — Fishbourne Roman Palace (Hampshire / West Sussex Border)',
      shelfmark: 'SUSSEX ARCHAEOLOGICAL SOCIETY · EXCAVATION ARCHIVES · CHICHESTER',
      sourceText:
        '“Excavations at Fishbourne Roman Palace revealed a sophisticated hydraulic system dating to c.75 AD. Fresh water was tapped from nearby natural springs and fed through jointed lead pipes and terracotta conduits to supply a monumental garden pool, decorative fountains, and a private bath suite with heated hypocaust floors and stone drainage channels flushing sewage away.”',
      provenance:
        'Official archaeological site survey report, Fishbourne Roman Palace excavations (1961–1969).',
      questionA:
        'What can an historian infer from Source A about the standard of living enjoyed by wealthy Romans in southern Britain?',
      questionB:
        'Explain why archaeological evidence like pipes and drains is more reliable than written Roman speeches when investigating public health:',
      clue: '<em>Low-Floor Clue:</em> Notice the words "jointed lead pipes" and "stone drainage channels"—what does this physical survival prove?',
      scholarsEdge:
        '<strong>★ Scholar’s Edge:</strong> Why did this sophisticated Roman water engineering completely vanish from Britain after 410 AD?',
    },
  },
  {
    // Lesson 2: Medieval Towns, Monasteries & The Black Death
    skill: 'Comparison & Medieval Public Health',
    enquiryQuestion:
      'Enquiry: Why did public health collapse in medieval towns, while monasteries remained remarkably clean?',
    structureStrip: [
      {
        col: '1. FILTH IN MEDIEVAL TOWNS',
        text: 'Explain how rapid town growth, overflowing cesspits, wandering pigs, and butchers dumping offal into streets created deadly filth.',
      },
      {
        col: '2. CLEAN WATER IN MONASTERIES',
        text: 'Explain how monks had the wealth, literacy, and isolation to build settling tanks, lead water pipes, and latrines over running streams.',
      },
      {
        col: '3. HISTORICAL JUDGMENT',
        text: 'Judge why towns struggled: was it lack of money and government power, or the mistaken belief that bad smells (miasma) caused disease?',
      },
    ],
    connectives:
      'Living conditions in medieval towns were filthy because... • In sharp contrast, monasteries enjoyed clean water because... • When the Black Death struck in 1348, people believed... • Therefore, the fundamental difference between towns and monasteries was...',
    vocabTask: {
      type: 'cloze',
      prompt:
        'Complete the summary below using the terms <em>Miasma</em> and <em>Gong Farmer</em>:',
      clozeText:
        'Medieval townspeople believed disease was caused by [ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ] (poisonous bad air); at night, human waste had to be dug out of overflowing cesspits by workers called [ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ].',
      followUp:
        'Explain why medieval mayors fined butchers for dumping rotting meat into town streams:',
    },
    bridgeTask: {
      type: 'source_utility',
      badge: 'Medieval Town Court Records',
      title: 'Task 4: Interrogating Medieval Winchester and London Court Leet Records',
      sourceText:
        '“1372: Order issued by the Mayor of London: ‘No person shall throw dung, rubbish, or intestines of beasts into the streets or ditches, under pain of imprisonment.’<br>1421: Inquest of the City of Winchester: ‘John Hende has allowed his latrine to overflow onto the King’s highway, polluting the air and the ditch behind the High Street, to the great danger of his neighbors. Fined 12 pence.’”',
      instruction:
        '1. What do these court records prove about whether medieval town councils tried to keep streets clean?<br>2. In the lines below, explain why laws against dumping rubbish were so difficult for medieval mayors to enforce:',
      lines: 8,
      clue: '<em>Low-Floor Clue:</em> Notice that councils passed strict laws and fines—does this disprove the myth that medieval people didn’t care about filth?',
      scholarsEdge:
        '<strong>★ Scholar’s Edge:</strong> How did religious beliefs during the 1348 Black Death lead people to prioritize church prayers over street cleaning?',
    },
  },
  {
    // Lesson 3: Early Modern Filth & The Great Plague of 1665
    skill: 'Change & Continuity',
    enquiryQuestion:
      'Enquiry: To what extent did towns become filthier during the Tudor and Stuart eras?',
    structureStrip: [
      {
        col: '1. OVERCROWDING & WASTE',
        text: 'Explain how London’s rapid population growth created cramped wooden shanties, open sewer ditches (Fleet Ditch), and scavengers.',
      },
      {
        col: '2. INVENTIONS & FLUSHING TOILETS',
        text: 'Explain Sir John Harington’s 1596 invention of the flushing water closet, and why only Queen Elizabeth I and the rich could afford it.',
      },
      {
        col: '3. THE 1665 PLAGUE CRISIS',
        text: 'Evaluate how authorities responded to the 1665 Plague: red crosses on doors, watchmen, and killing cats and dogs (which made rats worse).',
      },
    ],
    connectives:
      'During the Tudor and Stuart eras, living conditions worsened because... • Although Sir John Harington invented the first flushing toilet, it failed to spread because... • In 1665, when the Great Plague struck, authorities attempted to... • Ultimately, public health did not improve because...',
    vocabTask: {
      type: 'golden_sentence',
      prompt:
        'Write ONE grammatically sophisticated, historically accurate Golden Sentence connecting <strong>Quarantine</strong> and <strong>Miasma</strong> using a causal conjunction (<em>because</em>, <em>although</em>, or <em>consequently</em>):',
      wordBank:
        'Quarantine · Red Cross · Miasma · Sir John Harington · Flushing Privy · The Great Plague · Searchers',
    },
    bridgeTask: {
      type: 'source_annotation',
      title: 'Task 4: Interrogating the 1665 London Orders for the Prevention of the Plague',
      sourceTitle:
        'Source B: Orders Conceived and Published by the Lord Mayor and Aldermen of London (June 1665)',
      shelfmark: 'LONDON METROPOLITAN ARCHIVES · GUILDHALL RECORDS · 1665',
      sourceText:
        '“Every visited house shall be shut up with a red cross marked upon the middle of the door a foot long, with these words in capital letters: ‘LORD HAVE MERCY UPON US.’ And a watchman shall stand day and night before the door, to keep the people from coming forth... All dogs and cats shall immediately be destroyed by the dog-killer, for preventing the spreading of the contagion.”',
      provenance:
        'Official emergency plague orders issued by the Lord Mayor and City Council of London during the Great Plague of 1665.',
      questionA:
        'What was the intended purpose of locking families inside their homes behind a red cross and a watchman?',
      questionB:
        'Explain why ordering the slaughter of domestic dogs and cats tragically caused the plague to spread even faster:',
      clue: '<em>Low-Floor Clue:</em> Think about what animal really carried plague fleas—if you kill all the cats and dogs, what happens to the rat population?',
      scholarsEdge:
        '<strong>★ Scholar’s Edge:</strong> How did belief in Miasma prevent 17th-century doctors from discovering that fleas on black rats carried plague bacteria?',
    },
  },
  {
    // Lesson 4: Industrial Crisis, Cholera & John Snow
    skill: 'Historical Evidence & Scientific Inquiry',
    enquiryQuestion:
      'Enquiry: Explain how John Snow proved that cholera was spread through contaminated water rather than bad air.',
    structureStrip: [
      {
        col: '1. INDUSTRIAL SQUALOR & CHOLERA',
        text: 'Explain how overcrowded industrial slums, shared privy pits, and polluted drinking water caused terrifying cholera epidemics from 1831.',
      },
      {
        col: '2. JOHN SNOW’S INVESTIGATION (1854)',
        text: 'Explain how Dr. John Snow mapped cholera deaths around Broad Street, Soho, spotting that brewery workers who drank beer survived.',
      },
      {
        col: '3. REMOVING THE PUMP HANDLE',
        text: 'Explain how removing the pump handle stopped the outbreak, disproving Miasma theory and providing empirical evidence for water-borne disease.',
      },
    ],
    connectives:
      'In the early 19th century, cholera terrified Victorian Britain because... • Most doctors wrongly blamed miasma, but in 1854 Dr John Snow... • By painstakingly mapping the victims, Snow discovered that... • Consequently, Snow proved that cholera was transmitted by...',
    vocabTask: {
      type: 'distinction',
      termA: 'Cholera',
      termB: 'Laissez-faire',
      prompt:
        'Distinguish between <strong>Cholera</strong> (a deadly water-borne bacterial disease causing fatal dehydration) and <strong>Laissez-faire</strong> (the government belief that it should "leave things alone" and not spend tax money on sewers):',
    },
    bridgeTask: {
      type: 'source_utility',
      badge: 'Dr John Snow’s Dot Map (1854)',
      title: 'Task 4: Interrogating Dr. John Snow’s Broad Street Cholera Investigation',
      sourceText:
        '“In Broad Street, Soho, within 250 yards of the street pump, 500 fatal attacks of cholera took place in ten days. I examined the water from the pump and found white flakes suspended in it. Nearby, at the Lion Brewery, none of the 70 workers contracted cholera—they were allowed free beer and never drank the pump water. On 7 September 1854, I met with the Board of Guardians and persuaded them to remove the handle of the Broad Street pump. The outbreak immediately ceased.” — Dr John Snow, On the Mode of Communication of Cholera (1855).',
      instruction:
        '1. Underline the piece of evidence regarding the Lion Brewery workers.<br>2. In the lines below, explain why this comparison between brewery workers and ordinary residents was the crucial clue proving water spread cholera:',
      lines: 8,
      clue: '<em>Low-Floor Clue:</em> Brewery workers drank fermented beer boiled with hops, not water from the street pump—why did that save their lives?',
      scholarsEdge:
        '<strong>★ Scholar’s Edge:</strong> Why did the medical establishment stubbornly reject John Snow’s findings until Robert Koch identified the cholera vibrio in 1883?',
    },
  },
  {
    // Lesson 5: The Great Stink (1858) & Joseph Bazalgette
    skill: 'Causation & Engineering Triumph',
    enquiryQuestion:
      'Enquiry: Why did it take the smell of the River Thames outside Parliament to finally force the government to build London’s sewers?',
    structureStrip: [
      {
        col: '1. THE GREAT STINK OF 1858',
        text: 'Explain how an unprecedented summer heatwave turned the River Thames into a bubbling open sewer, forcing MPs in Parliament to soak curtains in chloride of lime.',
      },
      {
        col: '2. BAZALGETTE’S BRICK SEWERS',
        text: 'Explain Chief Engineer Joseph Bazalgette’s revolutionary design: 82 miles of underground intercepting sewers carrying 420 million gallons of sewage daily.',
      },
      {
        col: '3. HISTORICAL SIGNIFICANCE',
        text: 'Evaluate the significance: Bazalgette’s sewers permanently eradicated cholera from London, proving that state investment and engineering could conquer disease.',
      },
    ],
    connectives:
      'For decades, Victorian politicians refused to fund sewers due to laissez-faire, but in June 1858... • The Great Stink affected MPs directly because... • Within eighteen days, Parliament abandoned its principles and passed a law funding... • Consequently, Joseph Bazalgette was able to construct an engineering triumph that...',
    vocabTask: {
      type: 'cloze',
      prompt:
        'Complete the summary below using the terms <em>Laissez-faire</em> and <em>Intercepting Sewer</em>:',
      clozeText:
        'Parliament finally abandoned its policy of [ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ] when the Great Stink of 1858 choked MPs, giving Joseph Bazalgette funding to construct a giant system of [ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ] pipes to divert waste eastwards away from drinking water.',
      followUp:
        'Explain why Bazalgette used Portland cement and egg-shaped brick sewers instead of round pipes:',
    },
    bridgeTask: {
      type: 'source_annotation',
      title: 'Task 4: Interrogating the 1858 Punch Cartoon: "The ‘Silent Highway’—Man"',
      sourceTitle: 'Source C: "The ‘Silent Highway’—Man", Punch Magazine (10 July 1858)',
      shelfmark: 'BRITISH LIBRARY NEWSPAPER ARCHIVE · PUNCH CARTOONS · LONDON',
      sourceText:
        '“Caption: ‘Your MONEY or your LIFE!’ The cartoon depicts Father Thames transformed into a grim, skeletal figure dressed in rags, rowing a boat across the jet-black, foul waters of the River Thames. Rotting dead dogs, floating cesspool scum, and poisonous miasma vapors rise from the water beneath the newly rebuilt Palace of Westminster.”',
      provenance:
        'Political satirical cartoon published in Punch Magazine during the height of the Great Stink, July 1858.',
      questionA:
        'What is the cartoonist suggesting about the River Thames by portraying Father Thames as a skeletal highwayman demanding "Your money or your life"?',
      questionB:
        'Explain why it took direct threat to the lives of rich politicians in Parliament to overcome the government’s refusal to spend public money on sanitation:',
      clue: '<em>Low-Floor Clue:</em> Notice the highwayman’s choice: spend money on sewers, or lose your life to cholera and toxic river fumes!',
      scholarsEdge:
        '<strong>★ Scholar’s Edge:</strong> How did the construction of Bazalgette’s Victoria and Albert Embankments transform both public health and modern urban architecture?',
    },
  },
  {
    // Lesson 6: The Clean Water Revolution & The Welfare State
    skill: 'Significance & Historical Causation',
    enquiryQuestion:
      'Enquiry: Which factor was most important in conquering water-borne disease in Britain: science, engineering, or government legislation?',
    structureStrip: [
      {
        col: '1. SCIENTIFIC PROGRESS',
        text: 'Explain how Pasteur’s Germ Theory (1861) and Robert Koch’s discovery of the cholera bacterium (1883) finally proved that living microbes caused disease.',
      },
      {
        col: '2. COMPULSORY LAWS (1875 ACT)',
        text: 'Explain how the 1875 Public Health Act forced local councils to appoint medical officers, supply clean water, and connect every home to sewers.',
      },
      {
        col: '3. FINAL EVALUATION',
        text: 'Reach your verdict: did engineering, scientific microbiology, or compulsory government laws matter most in saving millions of British lives?',
      },
    ],
    connectives:
      'On the one hand, scientific discovery was essential because... • On the other hand, science was useless without engineering feats like... • However, neither could succeed without government legislation, such as... • Therefore, in evaluating which factor was decisive, I judge that...',
    vocabTask: {
      type: 'golden_sentence',
      prompt:
        'Write ONE grammatically sophisticated, historically accurate Golden Sentence connecting <strong>Germ Theory</strong> and <strong>1875 Public Health Act</strong> using a causal conjunction (<em>because</em>, <em>although</em>, or <em>consequently</em>):',
      wordBank:
        'Germ Theory · Louis Pasteur · 1875 Public Health Act · Compulsory · Filtration · Chlorination · Clean Water',
    },
    bridgeTask: {
      type: 'metric_table',
      title: 'Task 4: Causal Weighting Matrix: The Three Pillars of Clean Water',
      tableHeaders: [
        'Pillar of Progress',
        'Key Historical Breakthrough',
        'Impact on Ordinary People',
      ],
      rows: [
        [
          '1. Science & Medicine',
          'Pasteur’s Germ Theory (1861) & Koch’s cholera microbe (1883)',
          'Proved germs, not bad smells, spread disease; led to water chlorination.',
        ],
        [
          '2. Engineering',
          'Bazalgette’s London sewers, reservoirs & sand filtration beds',
          'Physically separated human excrement from clean drinking water.',
        ],
        [
          '3. Government Law',
          'The 1875 Public Health Act (made clean water compulsory)',
          'Forced councils to tax landowners to connect every working-class home.',
        ],
      ],
      prompt:
        'In 3–4 sentences, explain which of these three pillars you consider the most indispensable in permanently ending cholera in Britain:',
      lines: 6,
      clue: '<em>Low-Floor Clue:</em> Could engineering happen without money from government laws? Could laws be passed without scientific proof?',
      scholarsEdge:
        '<strong>★ Scholar’s Edge:</strong> How did clean municipal tap water by 1900 transform infant mortality rates and raise life expectancy across Britain?',
    },
  },
];

/**
 * Builds the complete 16-page Pupil Workbook V2 HTML for Water and Sanitation
 */
function buildWaterAndSanitationTwoPageWorkbookHtml() {
  const coverImg =
    getBase64Image('/images/pont_du_gard_aqueduct.jpg') ||
    getBase64Image('/images/john_snow_cholera_map.jpg');

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Pupil Workbook V2 (Staged) — Water &amp; Sanitation Through Time (KS3 Year 7)</title>
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
        <span class="school-brand-target" data-department-name="The History Department" style="font-family: 'Inter', sans-serif; font-size: 8.5pt; text-transform: uppercase; letter-spacing: 2px; color: #0284c7; font-weight: 700;">
          The History Department
        </span>
        <span style="font-family: 'Inter', sans-serif; font-size: 8pt; text-transform: uppercase; letter-spacing: 1.5px; color: #64748b; font-weight: 600;">
          Year 7 History &bull; V2 Staged Edition
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
        Water &amp; Sanitation
      </h1>
      <div style="font-family: 'Inter', sans-serif; font-size: 9.2pt; color: #0369a1; font-weight: 600; letter-spacing: 0.5px;">
        Public Health, Engineering &amp; The Battle Against Disease (c.43 AD–Present)
      </div>
    </div>

    <!-- Overarching Enquiry Callout Box -->
    <div style="border: 1.5px solid #0284c7; border-radius: 5px; padding: 9px 16px; background: #f0f9ff; margin-bottom: 9px; text-align: center;">
      <div style="font-family: 'Inter', sans-serif; font-size: 7.8pt; text-transform: uppercase; letter-spacing: 1.8px; color: #0369a1; font-weight: 700; margin-bottom: 3px;">
        Overarching Historical Enquiry
      </div>
      <div style="font-family: 'Playfair Display', serif; font-size: 13.5pt; color: #0f172a; font-style: italic; font-weight: 600; line-height: 1.25;">
        “How did Britain conquer water-borne disease: engineering, science, or government power?”
      </div>
    </div>

    <!-- Hero Primary Source Presentation -->
    <div style="border: 1.2px solid #cbd5e1; border-radius: 6px; padding: 7px; background: #ffffff; box-shadow: 0 2px 6px rgba(0,0,0,0.04); margin-bottom: 9px;">
      <div style="width: 100%; height: 445px; border-radius: 4px; overflow: hidden; border: 1px solid #e2e8f0; background: #0f172a;">
        <img src="${coverImg}" style="width: 100%; height: 100%; object-fit: cover; object-position: center; display: block;" alt="Water and Sanitation Historic Visual">
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 5px; padding: 0 4px; font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #64748b;">
        <span><strong>Primary Visual Plate:</strong> Roman Aqueduct Architecture &amp; The Gravity Water Engineering Tradition</span>
        <span style="font-style: italic;">Fieldwork Primary Photographic Record</span>
      </div>
    </div>

    <!-- Curriculum Synopsis Box -->
    <div style="border: 1.2px solid #e2e8f0; border-radius: 5px; padding: 8px 12px; background: #fafaf9; margin-bottom: 9px;">
      <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; text-transform: uppercase; letter-spacing: 1px; color: #0f172a; font-weight: 700; margin-bottom: 3px;">
        Curriculum Synopsis &bull; The 2,000-Year Clean Water Quest
      </div>
      <p style="font-family: 'Georgia', serif; font-size: 8.5pt; color: #334155; line-height: 1.45; margin: 0; text-align: justify;">
        From the Roman lead pipes at Fishbourne Palace to the stench of medieval cesspits and the deadly cholera water pumps of Victorian London, clean water has been Britain’s greatest battle. In this Year 7 pupil workbook, students investigate how doctors, brave engineers, and government laws transformed Britain from a country plagued by water-borne death into a modern society where safe, clean drinking water flows from every tap.
      </p>
    </div>

    <!-- 6 Core Enquiries Unit Syllabus Roadmap -->
    <div style="border: 1px solid #cbd5e1; border-radius: 5px; padding: 7px 10px; background: #f8fafc;">
      <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase; letter-spacing: 1px; color: #0284c7; font-weight: 700; margin-bottom: 4px;">
        The 6 Disciplinary Enquiries:
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px;">
        <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #334155; padding: 2.5px 6px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 3px; display: flex; align-items: center;"><strong style="color: #0284c7; margin-right: 5px; white-space: nowrap;">L1:</strong> Roman Britain &amp; Fishbourne Palace</div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #334155; padding: 2.5px 6px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 3px; display: flex; align-items: center;"><strong style="color: #0284c7; margin-right: 5px; white-space: nowrap;">L4:</strong> Industrial Towns &amp; John Snow’s Pump</div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #334155; padding: 2.5px 6px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 3px; display: flex; align-items: center;"><strong style="color: #0284c7; margin-right: 5px; white-space: nowrap;">L2:</strong> Medieval Towns &amp; Monasteries</div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #334155; padding: 2.5px 6px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 3px; display: flex; align-items: center;"><strong style="color: #0284c7; margin-right: 5px; white-space: nowrap;">L5:</strong> The Great Stink &amp; Bazalgette’s Sewers</div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #334155; padding: 2.5px 6px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 3px; display: flex; align-items: center;"><strong style="color: #0284c7; margin-right: 5px; white-space: nowrap;">L3:</strong> Early Modern Filth &amp; 1665 Plague</div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #334155; padding: 2.5px 6px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 3px; display: flex; align-items: center;"><strong style="color: #0284c7; margin-right: 5px; white-space: nowrap;">L6:</strong> The Clean Water Revolution &amp; Modern NHS</div>
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
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #0284c7; padding-bottom: 4px; margin-bottom: 8px;">
        <div>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.8pt; text-transform: uppercase; letter-spacing: 1px; color: #0284c7; font-weight: 700;">
            Living Unit Timeline &bull; Part I: Romans to Tudors (c.43 AD–1600)
          </div>
          <h2 style="margin: 2px 0 0 0; font-family: 'Playfair Display', serif; font-size: 14pt; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px;">
            The Ancient &amp; Medieval Foundations
          </h2>
        </div>
        <span class="archival-badge" style="background: #f0f9ff; color: #0284c7; border-color: #bae6fd;">
          Pages 2–3 Facing Spread
        </span>
      </div>

      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-left: 3px solid #0284c7; padding: 4px 8px; margin-bottom: 8px; border-radius: 3px; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #475569; display: flex; justify-content: space-between; align-items: center;">
        <span><strong>Living Timeline Protocol:</strong> Throughout this unit, sketch each milestone inside its box. Add pipes, pumps, and water drops!</span>
        <span style="font-weight: 700; color: #0284c7; white-space: nowrap; margin-left: 8px;">Spine &bull; Facing Left</span>
      </div>

      <!-- Timeline Nodes -->
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <!-- Milestone 1: c.43–410 AD -->
        <div style="display: grid; grid-template-columns: 105px 1fr; gap: 10px; align-items: stretch; border: 1px solid #cbd5e1; border-radius: 4px; padding: 5px 8px; background: #ffffff;">
          <div style="border: 1.2px dashed #94a3b8; border-radius: 3px; background: #fafaf9; display: flex; flex-direction: column; justify-content: space-between; padding: 3px 4px; min-height: 28mm;">
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌜</span><span>Sketchpad</span><span>⌝</span>
            </div>
            <div style="text-align: center; font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #64748b; font-style: italic;">
              [Sketch: Roman Aqueduct arches / Lead pipe]
            </div>
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌞</span><span>Roman Britain</span><span>⌟</span>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
                <span style="font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; background: #0284c7; color: #ffffff; padding: 1px 6px; border-radius: 3px;">c.43–410 AD</span>
                <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f172a;">Roman Aqueducts, Bathhouses &amp; Fishbourne Lead Pipes</strong>
              </div>
              <p style="font-family: 'Georgia', serif; font-size: 7.8pt; color: #334155; line-height: 1.35; margin: 0;">
                The Romans introduce stone aqueducts, communal bathhouses, and gravity sewers to Britain. At Fishbourne Roman Palace in Hampshire/Sussex, jointed lead water pipes supply fresh running water to garden pools, private fountains, and heated bath suites.
              </p>
            </div>
            <div style="border-top: 1px dotted #cbd5e1; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b;">
              <strong>Key Enquiry Link:</strong> Lesson 1 &bull; Roman public health engineering vs. lack of germ knowledge
            </div>
          </div>
        </div>

        <!-- Milestone 2: c.1100–1300 -->
        <div style="display: grid; grid-template-columns: 105px 1fr; gap: 10px; align-items: stretch; border: 1px solid #cbd5e1; border-radius: 4px; padding: 5px 8px; background: #ffffff;">
          <div style="border: 1.2px dashed #94a3b8; border-radius: 3px; background: #fafaf9; display: flex; flex-direction: column; justify-content: space-between; padding: 3px 4px; min-height: 28mm;">
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌜</span><span>Sketchpad</span><span>⌝</span>
            </div>
            <div style="text-align: center; font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #64748b; font-style: italic;">
              [Sketch: Monastic water conduit / Cloister fountain]
            </div>
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌞</span><span>Monasteries</span><span>⌟</span>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
                <span style="font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; background: #0284c7; color: #ffffff; padding: 1px 6px; border-radius: 3px;">c.1100–1300</span>
                <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f172a;">Monastic Engineering: Water Conduits &amp; Settling Tanks</strong>
              </div>
              <p style="font-family: 'Georgia', serif; font-size: 7.8pt; color: #334155; line-height: 1.35; margin: 0;">
                While towns drink from muddy rivers and dump waste in streets, medieval abbeys and priories construct elaborate piped water systems. Monks in Winchester and Canterbury build settling tanks to filter water, piping fresh water directly into washing cloisters.
              </p>
            </div>
            <div style="border-top: 1px dotted #cbd5e1; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b;">
              <strong>Key Enquiry Link:</strong> Lesson 2 &bull; Monastic hygiene vs. town squalor
            </div>
          </div>
        </div>

        <!-- Milestone 3: 1348 -->
        <div style="display: grid; grid-template-columns: 105px 1fr; gap: 10px; align-items: stretch; border: 1.5px solid #b91c1c; border-radius: 4px; padding: 5px 8px; background: #fffaf0;">
          <div style="border: 1.2px dashed #b91c1c; border-radius: 3px; background: #fef2f2; display: flex; flex-direction: column; justify-content: space-between; padding: 3px 4px; min-height: 28mm;">
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #b91c1c;">
              <span>⌜</span><span>Sketchpad</span><span>⌝</span>
            </div>
            <div style="text-align: center; font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #991b1b; font-weight: 600;">
              [Sketch: Black Death cross / Gong farmer barrel]
            </div>
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #b91c1c;">
              <span>⌞</span><span>1348 Plague</span><span>⌟</span>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
                <span style="font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; background: #b91c1c; color: #ffffff; padding: 1px 6px; border-radius: 3px;">1348</span>
                <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f172a;">The Black Death &amp; The Rise of Gong Farmers</strong>
              </div>
              <p style="font-family: 'Georgia', serif; font-size: 7.8pt; color: #334155; line-height: 1.35; margin: 0;">
                The bubonic plague kills over a third of Britain’s population. Believing bad smells (miasma) cause the plague, towns fine citizens for leaving dung heaps and hire night workers ("gong farmers") to shovel human waste out of overflowing cesspits.
              </p>
            </div>
            <div style="border-top: 1px dotted #cbd5e1; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #b91c1c;">
              <strong>Key Enquiry Link:</strong> Lesson 2 &bull; Medieval town councils trying to regulate filth
            </div>
          </div>
        </div>

        <!-- Milestone 4: 1596 -->
        <div style="display: grid; grid-template-columns: 105px 1fr; gap: 10px; align-items: stretch; border: 1px solid #cbd5e1; border-radius: 4px; padding: 5px 8px; background: #ffffff;">
          <div style="border: 1.2px dashed #94a3b8; border-radius: 3px; background: #fafaf9; display: flex; flex-direction: column; justify-content: space-between; padding: 3px 4px; min-height: 28mm;">
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌜</span><span>Sketchpad</span><span>⌝</span>
            </div>
            <div style="text-align: center; font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #64748b; font-style: italic;">
              [Sketch: Sir John Harington's flushing toilet]
            </div>
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌞</span><span>1596 Invention</span><span>⌟</span>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
                <span style="font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; background: #0284c7; color: #ffffff; padding: 1px 6px; border-radius: 3px;">1596</span>
                <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f172a;">Sir John Harington Invents the First Flushing Toilet (Water Closet)</strong>
              </div>
              <p style="font-family: 'Georgia', serif; font-size: 7.8pt; color: #334155; line-height: 1.35; margin: 0;">
                Queen Elizabeth I’s godson, Sir John Harington, invents the first flushing water closet called the "Ajax." Water is released from a cistern to flush waste into a vault. However, without running water pipes or city sewers, ordinary people continue using chamber pots.
              </p>
            </div>
            <div style="border-top: 1px dotted #cbd5e1; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b;">
              <strong>Key Enquiry Link:</strong> Lesson 3 &bull; Early modern technology vs. lack of infrastructure
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Colophon -->
    <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #cbd5e1; padding-top: 3px; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #94a3b8;">
      <span>The History Department &bull; Water &amp; Sanitation (Year 7 V2)</span>
      <span>Page 2 (Facing Spread Left)</span>
    </div>
  </div>

  <!-- PAGE 3: TIMELINE PART II -->
  <div class="page page-container" id="page-3" style="padding: 16px 18px; border: 1px solid #cbd5e1; outline: 3.5px double #0f172a; outline-offset: -8px; justify-content: space-between;">
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #0284c7; padding-bottom: 4px; margin-bottom: 8px;">
        <div>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.8pt; text-transform: uppercase; letter-spacing: 1px; color: #0284c7; font-weight: 700;">
            Living Unit Timeline &bull; Part II: The Industrial Battle for Clean Water (1665–1948)
          </div>
          <h2 style="margin: 2px 0 0 0; font-family: 'Playfair Display', serif; font-size: 14pt; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px;">
            The Modern Sanitation Revolution
          </h2>
        </div>
        <span class="archival-badge" style="background: #f0f9ff; color: #0284c7; border-color: #bae6fd;">
          Pages 2–3 Facing Spread
        </span>
      </div>

      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-left: 3px solid #0284c7; padding: 4px 8px; margin-bottom: 8px; border-radius: 3px; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #475569; display: flex; justify-content: space-between; align-items: center;">
        <span><strong>Living Timeline Protocol:</strong> Trace how Britain moved from the 1665 Plague and Cholera to Bazalgette's sewers and the modern NHS.</span>
        <span style="font-weight: 700; color: #0284c7; white-space: nowrap; margin-left: 8px;">Spine &bull; Facing Right</span>
      </div>

      <!-- Timeline Nodes -->
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <!-- Milestone 5: 1665 -->
        <div style="display: grid; grid-template-columns: 1fr 105px; gap: 10px; align-items: stretch; border: 1px solid #cbd5e1; border-radius: 4px; padding: 5px 8px; background: #ffffff;">
          <div style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
                <span style="font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; background: #0284c7; color: #ffffff; padding: 1px 6px; border-radius: 3px;">1665</span>
                <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f172a;">The Great Plague of London: Quarantines &amp; Red Crosses</strong>
              </div>
              <p style="font-family: 'Georgia', serif; font-size: 7.8pt; color: #334155; line-height: 1.35; margin: 0;">
                Over 100,000 Londoners die in the Great Plague. Streets are choked with filth and rotting garbage. City officials board up infected families inside their houses, painting red crosses on doors, while dead-carts collect bodies shouting "Bring out your dead!"
              </p>
            </div>
            <div style="border-top: 1px dotted #cbd5e1; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b;">
              <strong>Key Enquiry Link:</strong> Lesson 3 &bull; Early modern public health regulations
            </div>
          </div>
          <div style="border: 1.2px dashed #94a3b8; border-radius: 3px; background: #fafaf9; display: flex; flex-direction: column; justify-content: space-between; padding: 3px 4px; min-height: 28mm;">
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌜</span><span>Sketchpad</span><span>⌝</span>
            </div>
            <div style="text-align: center; font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #64748b; font-style: italic;">
              [Sketch: Red cross on door / Plague bell]
            </div>
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌞</span><span>1665 Plague</span><span>⌟</span>
            </div>
          </div>
        </div>

        <!-- Milestone 6: 1854 -->
        <div style="display: grid; grid-template-columns: 1fr 105px; gap: 10px; align-items: stretch; border: 1.5px solid #0284c7; border-radius: 4px; padding: 5px 8px; background: #f0f9ff;">
          <div style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
                <span style="font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; background: #0284c7; color: #ffffff; padding: 1px 6px; border-radius: 3px;">1854</span>
                <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f172a;">Dr. John Snow Removes the Broad Street Pump Handle</strong>
              </div>
              <p style="font-family: 'Georgia', serif; font-size: 7.8pt; color: #334155; line-height: 1.35; margin: 0;">
                During a terrifying cholera outbreak in Soho, London, Dr. John Snow maps every death on a street plan. He spots that deaths cluster around the Broad Street water pump. He removes the pump handle, ending the outbreak and proving cholera is spread by drinking water.
              </p>
            </div>
            <div style="border-top: 1px dotted #cbd5e1; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #0369a1;">
              <strong>Key Enquiry Link:</strong> Lesson 4 &bull; The Broad Street map &bull; Challenging Miasma theory
            </div>
          </div>
          <div style="border: 1.2px dashed #0284c7; border-radius: 3px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between; padding: 3px 4px; min-height: 28mm;">
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #0284c7;">
              <span>⌜</span><span>Sketchpad</span><span>⌝</span>
            </div>
            <div style="text-align: center; font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #0369a1; font-weight: 600;">
              [Sketch: Broad Street pump without handle]
            </div>
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #0284c7;">
              <span>⌞</span><span>1854 Snow</span><span>⌟</span>
            </div>
          </div>
        </div>

        <!-- Milestone 7: 1858–1865 -->
        <div style="display: grid; grid-template-columns: 1fr 105px; gap: 10px; align-items: stretch; border: 1px solid #cbd5e1; border-radius: 4px; padding: 5px 8px; background: #ffffff;">
          <div style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
                <span style="font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; background: #0284c7; color: #ffffff; padding: 1px 6px; border-radius: 3px;">1858–65</span>
                <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f172a;">The Great Stink &amp; Joseph Bazalgette’s Victorian Sewers</strong>
              </div>
              <p style="font-family: 'Georgia', serif; font-size: 7.8pt; color: #334155; line-height: 1.35; margin: 0;">
                In the blazing hot summer of 1858, the River Thames smells so foul that Parliament cannot meet. MPs quickly pass a law granting £3 million to Chief Engineer Joseph Bazalgette. He constructs 82 miles of underground brick intercepting sewers, saving London from cholera.
              </p>
            </div>
            <div style="border-top: 1px dotted #cbd5e1; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b;">
              <strong>Key Enquiry Link:</strong> Lesson 5 &bull; Punch cartoons &bull; Victorian engineering triumph
            </div>
          </div>
          <div style="border: 1.2px dashed #94a3b8; border-radius: 3px; background: #fafaf9; display: flex; flex-direction: column; justify-content: space-between; padding: 3px 4px; min-height: 28mm;">
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌜</span><span>Sketchpad</span><span>⌝</span>
            </div>
            <div style="text-align: center; font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #64748b; font-style: italic;">
              [Sketch: Bazalgette egg-shaped brick sewer]
            </div>
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌞</span><span>1858 Sewers</span><span>⌟</span>
            </div>
          </div>
        </div>

        <!-- Milestone 8: 1875–1948 -->
        <div style="display: grid; grid-template-columns: 1fr 105px; gap: 10px; align-items: stretch; border: 1px solid #cbd5e1; border-radius: 4px; padding: 5px 8px; background: #ffffff;">
          <div style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
                <span style="font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; background: #0284c7; color: #ffffff; padding: 1px 6px; border-radius: 3px;">1875–1948</span>
                <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f172a;">The 1875 Public Health Act to the Modern Clean Water Era</strong>
              </div>
              <p style="font-family: 'Georgia', serif; font-size: 7.8pt; color: #334155; line-height: 1.35; margin: 0;">
                The 1875 Public Health Act makes it compulsory for local councils to supply clean drinking water, sewers, and street lighting. With Pasteur’s Germ Theory, water chlorination, and the 1948 founding of the NHS, water-borne epidemics are finally eradicated from Britain.
              </p>
            </div>
            <div style="border-top: 1px dotted #cbd5e1; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b;">
              <strong>Key Enquiry Link:</strong> Lesson 6 &bull; Government legislation &bull; Universal clean tap water
            </div>
          </div>
          <div style="border: 1.2px dashed #94a3b8; border-radius: 3px; background: #fafaf9; display: flex; flex-direction: column; justify-content: space-between; padding: 3px 4px; min-height: 28mm;">
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌜</span><span>Sketchpad</span><span>⌝</span>
            </div>
            <div style="text-align: center; font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #64748b; font-style: italic;">
              [Sketch: Clean water tap / NHS shield]
            </div>
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌞</span><span>Modern Era</span><span>⌟</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Colophon -->
    <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #cbd5e1; padding-top: 3px; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #94a3b8;">
      <span>The History Department &bull; Water &amp; Sanitation (Year 7 V2)</span>
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
        <div style="border-bottom: 2px solid #0284c7; padding-bottom: 4px; margin-bottom: 6px; display: flex; justify-content: space-between; align-items: flex-end;">
          <div>
            <div style="font-family: 'Inter', sans-serif; font-size: 8pt; text-transform: uppercase; letter-spacing: 1px; color: #64748b; font-weight: 600;">
              Unit 1: Water &amp; Sanitation &bull; Lesson ${lIdx + 1}
            </div>
            <h2 style="font-family: 'Playfair Display', serif; font-size: 13.5pt; color: #0f172a; margin: 2px 0 0 0; line-height: 1.2;">
              L${lIdx + 1}: ${lesson.title}
            </h2>
          </div>
          <span class="archival-badge" style="background: #f0f9ff; color: #0284c7; border-color: #bae6fd;">Evidence &amp; Skills Launch</span>
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
            <span style="font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 700; color: #0284c7; background: #f0f9ff; border: 1px solid #bae6fd; padding: 1px 7px; border-radius: 3px;">Score: &nbsp; &nbsp; / 5</span>
          </div>
          <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px;">
    `;
    const doNowItems = lesson.do_now && lesson.do_now.items ? lesson.do_now.items.slice(0, 5) : [];
    doNowItems.forEach((item, qIdx) => {
      html += `
            <div style="background: #fafaf9; border: 1px solid #e2e8f0; border-radius: 3px; padding: 4px 5px; display: flex; flex-direction: column; justify-content: space-between;">
              <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; line-height: 1.22; color: #1e293b; margin-bottom: 2px;">
                <strong style="color: #0284c7;">Q${qIdx + 1}:</strong> ${item.question || item.q}
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
          <div style="border: 1.2px solid #cbd5e1; border-left: 4px solid #0284c7; background: #fffdfa; border-radius: 4px; padding: 5px 9px; margin-bottom: 4px;">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px; margin-bottom: 3px;">
              <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.6px; color: #0284c7;">
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
          <div style="border: 1px solid #cbd5e1; border-left: 3px solid #0284c7; background: #fdfbf7; padding: 5px 8px; font-size: 8.2pt; font-style: italic; color: #1e293b; margin-bottom: 4px; line-height: 1.35;">
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
    } else if (cfg.bridgeTask.type === 'metric_table') {
      html += `
          <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif; font-size: 7.5pt; margin-bottom: 4px; border: 1px solid #cbd5e1;">
            <thead>
              <tr style="background: #f1f5f9; color: #0f172a;">
                ${cfg.bridgeTask.tableHeaders.map((h) => `<th style="padding: 3px 5px; text-align: left; border: 1px solid #cbd5e1; font-size: 7.6pt;">${h}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${cfg.bridgeTask.rows
                .map(
                  (r) => `
                <tr>
                  <td style="padding: 3px 5px; font-weight: 700; border: 1px solid #cbd5e1; width: 25%; font-size: 7.4pt; color: #0369a1;">${r[0]}</td>
                  <td style="padding: 3px 5px; border: 1px solid #cbd5e1; width: 38%; font-size: 7.4pt;">${r[1]}</td>
                  <td style="padding: 3px 5px; border: 1px solid #cbd5e1; width: 37%; font-size: 7.4pt;">${r[2]}</td>
                </tr>
              `,
                )
                .join('')}
            </tbody>
          </table>
          <div style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #1e293b; margin-bottom: 2px;">
            <strong>Synthesis:</strong> ${cfg.bridgeTask.prompt}
          </div>
          <div class="task-line" style="height: 5.6mm;"></div>
          <div class="task-line" style="height: 5.6mm;"></div>
          <div class="task-line" style="height: 5.6mm;"></div>
      `;
    }

    html += `
          <div style="display: flex; justify-content: space-between; align-items: baseline; border-top: 1px dotted #cbd5e1; padding-top: 2px; margin-top: 3px;">
            <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #64748b;">${cfg.bridgeTask.clue || ''}</span>
            <span style="font-family: 'Georgia', serif; font-size: 7.5pt; color: #0284c7; font-style: italic;">${cfg.bridgeTask.scholarsEdge || ''}</span>
          </div>
        </div>
      </div>

      <!-- Left Page Footer -->
      <div style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #94a3b8; display: flex; justify-content: space-between; border-top: 1px solid #e2e8f0; padding-top: 3px;">
        <span>The History Department &bull; Water &amp; Sanitation (Year 7 V2)</span>
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
        <div style="border-bottom: 2px solid #0284c7; padding-bottom: 4px; margin-bottom: 6px; display: flex; justify-content: space-between; align-items: flex-end;">
          <div>
            <div style="font-family: 'Inter', sans-serif; font-size: 8pt; text-transform: uppercase; letter-spacing: 1px; color: #0284c7; font-weight: 700;">
              Historical Skill: ${cfg.skill}
            </div>
            <h3 style="font-family: 'Playfair Display', serif; font-size: 12.5pt; color: #0f172a; margin: 2px 0 0 0; line-height: 1.25;">
              ${cfg.enquiryQuestion}
            </h3>
          </div>
          <span class="archival-badge" style="background: #f0f9ff; color: #0284c7; border-color: #bae6fd; flex-shrink: 0;">Extended Writing</span>
        </div>

        <!-- 3-Tier Structure Strip -->
        <div style="border: 1.2px solid #cbd5e1; border-radius: 5px; padding: 5px 8px; background: #f8fafc; margin-bottom: 6px;">
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; margin-bottom: 3px;">
            ${cfg.structureStrip
              .map(
                (s) => `
              <div style="border: 1px solid #e2e8f0; border-radius: 3px; padding: 4px 6px; background: #ffffff;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; color: #0284c7; display: block; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px; margin-bottom: 2px;">${s.col}</strong>
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
          <span><strong style="color: #0284c7;">[P] Point:</strong> Clear historical claim answering the question.</span>
          <span><strong style="color: #0284c7;">[E] Evidence:</strong> Specific names, dates, inventions, or source facts.</span>
          <span><strong style="color: #0284c7;">[E] Explanation:</strong> Explain how this helped or hindered clean water.</span>
          <span><strong style="color: #0284c7;">[L] Link:</strong> Direct evaluative link back to the enquiry question.</span>
        </div>

        <!-- Dynamic Auto-Fill Ruled Writing Lines (Default 15 lines) -->
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
            <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 700; color: #0284c7; text-transform: uppercase;">Teacher Assessment &bull; DIRT Target</span>
          </div>
          <div style="display: grid; grid-template-columns: 80px 1fr; gap: 8px; align-items: center;">
            <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #475569; font-weight: 600;">DIRT Target:</span>
            <div class="task-line" style="height: 5mm; border-bottom-style: dotted;"></div>
          </div>
        </div>

        <!-- Right Page Footer -->
        <div style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #94a3b8; display: flex; justify-content: space-between; border-top: 1px solid #e2e8f0; padding-top: 3px;">
          <span>Water &amp; Sanitation Through Time &bull; Extended Writing Spread</span>
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
      <div style="border-bottom: 2px solid #0284c7; padding-bottom: 4px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: flex-end;">
        <div>
          <div style="font-family: 'Inter', sans-serif; font-size: 8pt; text-transform: uppercase; letter-spacing: 1.5px; color: #0284c7; font-weight: 700;">
            The History Department &bull; Assessment &amp; Revision Synthesis
          </div>
          <h2 style="font-family: 'Playfair Display', serif; font-size: 15pt; color: #0f172a; margin: 2px 0 0 0; text-transform: uppercase; letter-spacing: 0.8px;">
            Water &amp; Sanitation (c.43 AD–Present) &bull; Master Review
          </h2>
        </div>
        <span class="archival-badge" style="background: #f0f9ff; color: #0284c7; border-color: #bae6fd;">Unit Revision Hub</span>
      </div>

      <!-- Public Health Factors of Change Matrix -->
      <div style="border: 1.5px solid #0f172a; border-radius: 5px; padding: 6px 10px; background: #ffffff; margin-bottom: 8px;">
        <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f172a; text-transform: uppercase; display: block; border-bottom: 1.2px solid #0f172a; padding-bottom: 2px; margin-bottom: 5px;">
          The Four Key Factors in Public Health Progress
        </strong>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px;">
          <div style="border: 1px solid #cbd5e1; border-left: 3px solid #0284c7; border-radius: 3px; padding: 4px 6px; background: #f8fafc;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #0284c7; display: block; margin-bottom: 1px;">1. SCIENTIFIC KNOWLEDGE</strong>
            <span style="font-family: 'Georgia', serif; font-size: 7.5pt; color: #334155; line-height: 1.25; display: block;">Moving from false Miasma theory to Dr. John Snow’s cholera map (1854), Louis Pasteur’s Germ Theory (1861), and Robert Koch’s bacterial discoveries.</span>
          </div>
          <div style="border: 1px solid #cbd5e1; border-left: 3px solid #0284c7; border-radius: 3px; padding: 4px 6px; background: #f8fafc;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #0284c7; display: block; margin-bottom: 1px;">2. ENGINEERING &amp; TECHNOLOGY</strong>
            <span style="font-family: 'Georgia', serif; font-size: 7.5pt; color: #334155; line-height: 1.25; display: block;">Roman gravity aqueducts and bathhouses; Harington’s flushing toilet (1596); Bazalgette’s 82 miles of Victorian underground intercepting sewers.</span>
          </div>
          <div style="border: 1px solid #cbd5e1; border-left: 3px solid #0284c7; border-radius: 3px; padding: 4px 6px; background: #f8fafc;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #0284c7; display: block; margin-bottom: 1px;">3. GOVERNMENT POWER &amp; LAW</strong>
            <span style="font-family: 'Georgia', serif; font-size: 7.5pt; color: #334155; line-height: 1.25; display: block;">Abandoning laissez-faire after the Great Stink of 1858; the compulsory 1875 Public Health Act; establishing clean municipal water supplies for all.</span>
          </div>
          <div style="border: 1px solid #cbd5e1; border-left: 3px solid #0284c7; border-radius: 3px; padding: 4px 6px; background: #f8fafc;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #0284c7; display: block; margin-bottom: 1px;">4. INDIVIDUAL BRAVERY &amp; REFORM</strong>
            <span style="font-family: 'Georgia', serif; font-size: 7.5pt; color: #334155; line-height: 1.25; display: block;">Campaigners like Edwin Chadwick using statistics to shame Parliament, and Dr. John Snow risking his life to remove the Broad Street pump handle.</span>
          </div>
        </div>
      </div>

      <!-- Historical Balance Sheet -->
      <div style="border: 1px solid #cbd5e1; border-radius: 4px; padding: 6px 10px; background: #f8fafc; margin-bottom: 8px;">
        <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #0284c7; text-transform: uppercase; display: block; margin-bottom: 3px;">
          The 2,000-Year Historical Balance Sheet
        </strong>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
          <div style="font-family: 'Georgia', serif; font-size: 7.5pt; color: #1e293b; line-height: 1.3;">
            <strong style="color: #b91c1c;">Periods of Squalor &amp; Disease:</strong> After Roman withdrawal (410 AD), piped water collapsed. Medieval towns and overcrowded 19th-century industrial cellar slums were plagued by cholera, typhoid, and infant mortality.
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 7.5pt; color: #1e293b; line-height: 1.3;">
            <strong style="color: #0369a1;">The Clean Water Triumph:</strong> Victorian sewer construction, reservoir networks, sand filtration, and chlorination virtually eliminated water-borne deaths, raising British life expectancy from 40 to over 80 years.
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
            <tr><td style="padding: 3px 5px; border: 1px solid #cbd5e1;">L1: Roman Britain &amp; Fishbourne Palace</td><td style="border: 1px solid #cbd5e1;"></td><td style="border: 1px solid #cbd5e1;"></td><td style="border: 1px solid #cbd5e1; text-align: center;">[ &nbsp; ]</td><td style="border: 1px solid #cbd5e1;"></td></tr>
            <tr><td style="padding: 3px 5px; border: 1px solid #cbd5e1;">L2: Medieval Towns &amp; Monasteries</td><td style="border: 1px solid #cbd5e1;"></td><td style="border: 1px solid #cbd5e1;"></td><td style="border: 1px solid #cbd5e1; text-align: center;">[ &nbsp; ]</td><td style="border: 1px solid #cbd5e1;"></td></tr>
            <tr><td style="padding: 3px 5px; border: 1px solid #cbd5e1;">L3: Early Modern Filth &amp; 1665 Plague</td><td style="border: 1px solid #cbd5e1;"></td><td style="border: 1px solid #cbd5e1;"></td><td style="border: 1px solid #cbd5e1; text-align: center;">[ &nbsp; ]</td><td style="border: 1px solid #cbd5e1;"></td></tr>
            <tr><td style="padding: 3px 5px; border: 1px solid #cbd5e1;">L4: Industrial Towns &amp; John Snow’s Pump</td><td style="border: 1px solid #cbd5e1;"></td><td style="border: 1px solid #cbd5e1;"></td><td style="border: 1px solid #cbd5e1; text-align: center;">[ &nbsp; ]</td><td style="border: 1px solid #cbd5e1;"></td></tr>
            <tr><td style="padding: 3px 5px; border: 1px solid #cbd5e1;">L5: The Great Stink &amp; Bazalgette’s Sewers</td><td style="border: 1px solid #cbd5e1;"></td><td style="border: 1px solid #cbd5e1;"></td><td style="border: 1px solid #cbd5e1; text-align: center;">[ &nbsp; ]</td><td style="border: 1px solid #cbd5e1;"></td></tr>
            <tr><td style="padding: 3px 5px; border: 1px solid #cbd5e1;">L6: Clean Water Revolution &amp; Modern NHS</td><td style="border: 1px solid #cbd5e1;"></td><td style="border: 1px solid #cbd5e1;"></td><td style="border: 1px solid #cbd5e1; text-align: center;">[ &nbsp; ]</td><td style="border: 1px solid #cbd5e1;"></td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Final Institutional Signoff -->
    <div style="border-top: 1px solid #cbd5e1; padding-top: 5px; text-align: center; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #64748b;">
      <span>The History Revision Hub &bull; Year 7 Master Curriculum Series &bull; Staged 4-Act V2 Edition</span>
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
async function renderWaterAndSanitationTwoPageWorkbook() {
  console.log('🚀 Rendering Staged V2 Two-Page Workbook for Water & Sanitation Through Time...');
  const html = buildWaterAndSanitationTwoPageWorkbookHtml();

  // Write staged HTML file
  const outHtmlPath = path.join(
    ROOT_DIR,
    'public',
    'units',
    'water_and_sanitation',
    'pupil_workbook_v2.html',
  );
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

  const outPdfPath = path.join(
    ROOT_DIR,
    'public',
    'pdfs',
    'water_and_sanitation_pupil_workbook_V2.pdf',
  );
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
  renderWaterAndSanitationTwoPageWorkbook().catch((err) => {
    console.error('❌ Error rendering Water & Sanitation Two-Page Workbook:', err);
    process.exit(1);
  });
}

module.exports = {
  buildWaterAndSanitationTwoPageWorkbookHtml,
  renderWaterAndSanitationTwoPageWorkbook,
  lessonConfigs,
};
