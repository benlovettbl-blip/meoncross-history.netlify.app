const fs = require('fs');
const path = require('path');

function formatText(txt) {
  if (!txt) return '';
  return txt;
}

// Bespoke Bridge Tasks, Disciplinary Vocabulary Tasks, and Writing Genres for each lesson
const lessonConfigs = [
  {
    // Lesson 1: Henry Cort & Energy
    genre: 'Genre 2: Historical Significance',
    skill: 'Significance',
    genreNum: 2,
    enquiryQuestion:
      'Enquiry: How significant was Henry Cort’s puddling process to British industrial and naval supremacy?',
    structureStrip: [
      {
        col: '1. IMMEDIATE IMPACT',
        text: 'Explain how Cort’s puddling furnace and grooved rollers boosted British iron production 15 times and stopped Britain relying on foreign iron.',
      },
      {
        col: '2. LONG-TERM CHANGES',
        text: 'Explain how cheap, strong iron changed Britain over time—making it possible to build steam engines, railways, and iron warships.',
      },
      {
        col: '3. OVERALL JUDGMENT',
        text: 'Give your final judgment: was Cort’s breakthrough the main reason Britain became an industrial power, or were coal and steam more important?',
      },
    ],
    connectives:
      'The immediate breakthrough was... • Over time, this changed Britain because... • Crucially, this transformed... • In terms of importance... • Overall, Cort was significant because...',
    vocabTask: {
      type: 'distinction',
      termA: 'Pig Iron',
      termB: 'Wrought Iron',
      prompt:
        'Distinguish between brittle <strong>pig iron</strong> (high carbon content) and tough naval <strong>wrought iron</strong> (refined by Cort at Funtley):',
    },
    bridgeTask: {
      type: 'draw_label',
      badge: 'Technical Blueprint & Archival Anatomy',
      title: 'Task 4: Draw & Label Henry Cort’s Puddling Furnace & Grooved Rollers (1784)',
      instruction: 'Sketch the furnace and rollers in the box below, then label the 4 key parts:',
      checklist:
        '① <strong>Firebox</strong> (keeps coal separate from iron) &bull; ② <strong>Arched roof</strong> (bounces heat down onto iron) &bull; ③ <strong>Puddling bar</strong> (worker stirs out carbon) &bull; ④ <strong>Grooved rollers</strong> (squeezes out impurities)',
      clue: '<em>Low-Floor Clue:</em> Notice how the coal fuel never touches the iron directly—only the heat melts the metal, keeping it pure and strong.',
      scholarsEdge:
        '<strong>★ Scholar’s Edge:</strong> Why did Britain’s ability to mass-produce coal-fired wrought iron give it a huge naval advantage over France?',
    },
  },
  {
    // Lesson 2: Industrial Work
    genre: 'Genre 3: Change & Continuity',
    skill: 'Change & Continuity',
    genreNum: 3,
    enquiryQuestion:
      'Enquiry: Was industrial work a triumph of human progress or a catastrophe of punishment for the working class?',
    structureStrip: [
      {
        col: '1. WHAT CHANGED?',
        text: 'Explain how daily life changed when workers moved from cottage farming to long hours ruled by the factory clock and loud machines.',
      },
      {
        col: '2. WHAT STAYED THE SAME?',
        text: 'Explain what stayed the same: dangerous physical work, long shifts, and children working hard in brickworks and textile mills.',
      },
      {
        col: '3. WAS IT PROGRESS?',
        text: 'Give your judgment: did cheaper goods and higher national wealth make up for the harsh and dangerous working conditions?',
      },
    ],
    connectives:
      'A major change for workers was... • However, conditions stayed the same because... • On the one hand... • On the other hand... • Overall, I judge that...',
    vocabTask: {
      type: 'mapping',
      termA: 'Pug Mill',
      termB: 'Fareham Reds',
      prompt:
        'Write one historically accurate sentence connecting the mechanised <strong>pug mill</strong> to the mass production of durable <strong>Fareham Red bricks</strong>:',
    },
    bridgeTask: {
      type: 'ledger',
      badge: 'Analytical Conflict Ledger',
      title: 'Task 4: The Balance Sheet of Industrial Labour: Progress vs. Punishment',
      instruction:
        'Complete the two-column ledger below, contrasting the factory owner’s argument for progress against the worker’s lived reality.',
      col1Title: 'The Case for Progress (Factory Owners)',
      col1Prompts: [
        'Higher cash wages compared to agricultural farm work.',
        'Production of cheap, machine-made clothes and iron goods.',
        'Steam-powered machines producing far more goods than hands.',
        'Fewer seasonal famines and better trade between towns.',
      ],
      col2Title: 'The Case for Hardship (Workers & Children)',
      col2Prompts: [
        '14-hour work days strictly ruled by the factory clock.',
        'Widespread child labour in Hampshire clay pits and mills.',
        'Terrible accidents: lost fingers, broken bones, and lung disease.',
        'Loss of independence and family time at home.',
      ],
      clue: '<em>Low-Floor Clue:</em> Contrast the clock tower at the factory gates against the freedom of cottage workers choosing their own hours.',
      scholarsEdge:
        '<strong>★ Scholar’s Edge:</strong> Did factory work bring genuine progress to ordinary people, or did it sacrifice their health for industrial profit?',
    },
  },
  {
    // Lesson 3: Industrial Towns & Public Health
    genre: 'Genre 6: Source Utility & Forensic Evaluation',
    skill: 'Source Evaluation',
    genreNum: 6,
    enquiryQuestion:
      'Enquiry: How useful is Edwin Chadwick’s 1842 Sanitary Report for investigating living conditions in Victorian industrial towns?',
    structureStrip: [
      {
        col: '1. CONTENT & CONTEXT',
        text: 'Explain what Chadwick’s report reveals about filthy streets, overflowing cesspools, and low life expectancy, confirmed by your own knowledge of slum conditions.',
      },
      {
        col: '2. PROVENANCE (NOP)',
        text: 'Interrogate Nature, Origin & Purpose: Chadwick was a campaigning reformer using shocking statistics to force Parliament to fund sewers and abandon laissez-faire.',
      },
      {
        col: '3. EVALUATIVE UTILITY',
        text: 'Give your final verdict: why is this report exceptionally useful to a historian, even if Chadwick deliberately focused only on the worst cellar dwellings?',
      },
    ],
    connectives:
      'In terms of Content, the report reveals... • This matches my contextual knowledge of... • Analysing Provenance, the Nature of this source is an official report whose Purpose was to... • Consequently, this makes the source highly useful for...',
    vocabTask: {
      type: 'cloze',
      prompt:
        'Complete the summary below using the terms <em>Miasma Theory</em> and <em>Laissez-faire</em>:',
      clozeText:
        'Victorian authorities refused to fund municipal sewers due to their doctrine of [ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ], wrongly assuming cholera spread via [ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ].',
      followUp: 'Explain why Chadwick’s 1842 Report challenged both assumptions:',
    },
    bridgeTask: {
      type: 'source_utility',
      badge: 'Archival Forensic Interrogation',
      title:
        'Task 4: Interrogating Chadwick’s 1842 Report on the Sanitary Condition of the Labouring Population',
      sourceText:
        '“The annual loss of life from filth and bad ventilation are greater than the loss from death or wounds in any modern war. In the cellar dwellings of Manchester and Leeds, human excrement oozes through walls, and whole families sleep upon damp dung. The average age at death of the working class in Manchester is 17 years, compared to 38 years for the rural gentry.”',
      instruction:
        '1. Underline the shocking statistical comparison Chadwick uses to provoke Parliament.<br>2. In the lines below, explain why an historian must consider Chadwick’s motive when judging the accuracy of these figures:',
      lines: 8,
      clue: '<em>Low-Floor Clue:</em> Notice the comparison between disease in towns and battle in war—why would a government reformer write it this way?',
      scholarsEdge:
        '<strong>★ Scholar’s Edge:</strong> How did the belief in "miasma" (bad smells causing disease) encourage cleaning streets while delaying clean drinking water?',
    },
  },
  {
    // Lesson 4: The British Empire
    genre: 'Genre 1: Causal Weighting & Prioritisation',
    skill: 'Causation',
    genreNum: 1,
    enquiryQuestion:
      'Enquiry: Was the expansion of the British Empire primarily driven by naval military power or commercial profit?',
    structureStrip: [
      {
        col: '1. WARSHIPS & NAVAL POWER',
        text: 'Explain how the Royal Navy and dockyards like Portsmouth helped Britain conquer lands, guard trade routes, and defeat rivals.',
      },
      {
        col: '2. TRADE & MAKING MONEY',
        text: 'Explain how merchants and companies like the East India Company expanded the empire to make huge profits from tea, spices, and textiles.',
      },
      {
        col: '3. WHICH MATTERED MORE?',
        text: 'Give your judgment: was the British Empire built mainly by military warships, or was the search for trade and profits more important?',
      },
    ],
    connectives:
      'The Royal Navy was vital because... • At the same time, trade drove expansion because... • However, without warships... • Overall, the main driving force was...',
    vocabTask: {
      type: 'distinction',
      termA: 'Chartered Monopoly (EIC)',
      termB: 'Two-Power Standard',
      prompt:
        'Distinguish between corporate commercial expansion (<strong>East India Company</strong>) and state naval deterrence (<strong>Two-Power Standard</strong>):',
    },
    bridgeTask: {
      type: 'metric_table',
      badge: 'Comparative Metric Analysis',
      title: 'Task 4: Pillars of Imperial Dominance: The Royal Navy vs. Chartered Monopolies',
      instruction:
        'Complete the comparative analysis below evaluating the two main drivers of British imperial expansion.',
      tableHeaders: [
        'Dimension',
        'The Royal Navy (Portsmouth Complex)',
        'Chartered Trade (East India Company)',
      ],
      rows: [
        [
          'Strategic Purpose',
          'Global command of sea lanes & military deterrence.',
          'Commercial extraction of silk, spices, tea & opium.',
        ],
        [
          'Key Mechanism',
          'Industrial dockyards, steam frigates, global coaling.',
          'Private corporate armies, tax collection (Diwani).',
        ],
        [
          'Vulnerability',
          'Massive state tax burden & naval timber shortages.',
          'Corporate corruption & indigenous armed rebellion.',
        ],
      ],
      prompt:
        'In 3–4 sentences, explain which pillar was more essential for maintaining global dominance between 1750 and 1850:',
      lines: 8,
      clue: '<em>Low-Floor Clue:</em> Think about what happened to British trading posts whenever the Royal Navy lost control of the English Channel or Atlantic.',
      scholarsEdge:
        '<strong>★ Scholar’s Edge:</strong> Did the British Empire grow through a clear government plan, or through traders chasing private wealth?',
    },
  },
  {
    // Lesson 5: 1857 Indian Rebellion
    genre: 'Genre 5: Analytical Narrative',
    skill: 'Causation & Narrative',
    genreNum: 5,
    enquiryQuestion:
      'Enquiry: Explain the sequence of events that transformed a military mutiny in Meerut into the 1857 Indian Rebellion.',
    structureStrip: [
      {
        col: '1. WHY ANGER BOILED OVER',
        text: 'Explain why people in India were angry: the British taking over kingdoms and soldiers fearing greased cartridges offended their religion.',
      },
      {
        col: '2. HOW THE REBELLION SPREAD',
        text: 'Explain how a soldiers’ mutiny at Meerut quickly grew into a massive rebellion joined by princes and ordinary people across northern India.',
      },
      {
        col: '3. WHAT HAPPENED NEXT?',
        text: 'Explain how Britain crushed the rebellion with harsh punishment, abolished the East India Company, and gave direct control to Queen Victoria.',
      },
    ],
    connectives:
      'Anger first broke out because... • This quickly spread across India when... • The turning point came when... • As a result, the British government decided to...',
    vocabTask: {
      type: 'mapping',
      termA: 'Doctrine of Lapse',
      termB: 'Azamgarh Proclamation',
      prompt:
        'Write one historically accurate sentence connecting Dalhousie’s <strong>Doctrine of Lapse</strong> to the grievances published in the <strong>Azamgarh Proclamation</strong>:',
    },
    bridgeTask: {
      type: 'source_utility',
      badge: 'Archival Forensic Interrogation',
      title: 'Task 4: Interrogating the Rebel Motivation: The 1857 Azamgarh Proclamation',
      sourceText:
        '“Both Hindus and Muslims are being ruined under the tyranny and oppression of the treacherous English. The British have subverted our religion, impoverished our artisans with foreign machine goods, and dispossessed our ancient landed nobility. Arise, then, and rally under the Imperial banner to defend your faith and ancestral lands!”',
      instruction:
        '1. Underline the economic and religious grievances listed by the rebel leadership.<br>2. In the lines below, explain what this proclamation reveals about the diverse groups uniting against British rule:',
      lines: 8,
      clue: '<em>Low-Floor Clue:</em> Look at who is addressed—is this just soldiers complaining about rifle grease, or something much broader?',
      scholarsEdge:
        '<strong>★ Scholar’s Edge:</strong> Why did British colonial authorities deliberately label the 1857 conflict a "Sepoy Mutiny" rather than a war of national independence?',
    },
  },
  {
    // Lesson 6: Working Class Protest & Peterloo
    genre: 'Genre 6: Source Utility & Forensic Evaluation',
    skill: 'Source Evaluation',
    genreNum: 6,
    enquiryQuestion:
      'Enquiry: How useful is the Manchester Magistrates’ official report for an enquiry into the events of the Peterloo Massacre (1819)?',
    structureStrip: [
      {
        col: '1. CONTENT & CONTEXT',
        text: 'Explain what the magistrates claimed about 60,000 protestors marching in military drill, contrasting against your own knowledge of the peaceful Sunday crowd.',
      },
      {
        col: '2. PROVENANCE (NOP)',
        text: 'Interrogate Nature, Origin & Purpose: Written by terrified Tory magistrates just 4 years after Waterloo, with the purpose of justifying their panic reading of the Riot Act and cavalry charge.',
      },
      {
        col: '3. EVALUATIVE UTILITY',
        text: 'Give your final verdict: why is this report exceptionally useful for understanding elite paranoia, even if it is completely unreliable about the crowd’s peaceful intentions?',
      },
    ],
    connectives:
      'In terms of Content, the magistrates report that... • However, contextual evidence proves that... • Evaluating Provenance, the Author’s Purpose was to justify... • Overall, the source is exceptionally useful for revealing elite panic rather than crowd violence.',
    vocabTask: {
      type: 'cloze',
      prompt:
        'Complete the summary below using the terms <em>Franchise</em> and <em>Six Acts</em>:',
      clozeText:
        'When 60,000 peaceful protestors demanded the [ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ] at St Peter’s Field, the terrified elite responded by passing the repressive [ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ].',
      followUp: 'Explain why the magistrates were terrified of a French-style revolution:',
    },
    bridgeTask: {
      type: 'ledger',
      badge: 'Analytical Conflict Ledger',
      title:
        'Task 4: The Crucible of Class Conflict: Reformers vs. The Manchester Magistrates (1819)',
      instruction:
        'Contrast the stated aims of the peaceful working-class crowd against the paranoid fears of the ruling elite at St Peter’s Field.',
      col1Title: 'The Peaceful Reformers (Henry Hunt)',
      col1Prompts: [
        'Repeal of the hated 1815 Corn Laws causing mass starvation.',
        'Universal male suffrage & annual parliaments to end corruption.',
        'Dressed in Sunday best; women & children proudly marching.',
        'Banners demanding "Liberty and Fraternity" and "No Corn Laws".',
      ],
      col2Title: 'The Manchester Magistrates (Elite Panic)',
      col2Prompts: [
        'Terror of a violent French-style Jacobin revolution in the North.',
        'Suspicion of military marching drill & revolutionary liberty caps.',
        'Panic reading of the Riot Act within 45 minutes of assembly.',
        'Ordering drunken cavalry to charge sabres drawn into the crowd.',
      ],
      clue: '<em>Low-Floor Clue:</em> Why were British landowners so petrified of mass gatherings in 1819, just 4 years after the defeat of Napoleon?',
      scholarsEdge:
        '<strong>★ Scholar’s Edge:</strong> How did the British government’s passage of the repressive "Six Acts" in 1819 delay democracy while making future reform inevitable?',
    },
  },
  {
    // Lesson 7: The 1832 Great Reform Act
    genre: 'Genre 1: Causal Weighting & Prioritisation',
    skill: 'Causation',
    genreNum: 1,
    enquiryQuestion:
      'Enquiry: Why was the Great Reform Act passed in 1832? Was it conceded out of fear of revolution or granted as a principled reform?',
    structureStrip: [
      {
        col: '1. FEAR OF VIOLENT RIOTS',
        text: 'Explain how working-class riots, burned castles, and threats to pull all money from banks pushed Britain close to a revolution.',
      },
      {
        col: '2. THE GOVERNMENT’S PLAN',
        text: 'Explain why politicians passed the Act: giving the vote to middle-class men to keep them happy and stop them joining with workers.',
      },
      {
        col: '3. WHAT WAS THE REAL REASON?',
        text: 'Give your judgment: did politicians pass the 1832 Act because they believed in democracy, or because they were scared of a civil war?',
      },
    ],
    connectives:
      'One main reason for the Reform Act was... • Politicians were especially scared when... • On the other hand, the government wanted to... • In conclusion, Parliament only acted because...',
    vocabTask: {
      type: 'distinction',
      termA: 'Rotten Borough',
      termB: 'Pocket Borough',
      prompt:
        'Distinguish between a depopulated <strong>Rotten Borough</strong> (e.g. Old Sarum) and an aristocratic <strong>Pocket Borough</strong>:',
    },
    bridgeTask: {
      type: 'causal_pivot',
      badge: 'Causal Pivot & Catalyst Chain',
      title: 'Task 4: The 1832 Reform Crisis: From Rotten Boroughs to Compromise',
      instruction:
        'Track the escalation of the 1832 Reform crisis from parliamentary deadlock to the King’s intervention below:',
      steps: [
        {
          stage: '1. The Stagnation',
          year: '1830',
          text: 'Rotten boroughs like Old Sarum (3 houses, 2 MPs) hold power, while industrial Birmingham has 0 MPs.',
        },
        {
          stage: '2. The Catalyst',
          year: '1831',
          text: 'The House of Lords rejects the Reform Bill, sparking mass riots in Bristol and the burning of Nottingham Castle.',
        },
        {
          stage: '3. The Turning Point',
          year: 'May 1832',
          text: 'The "Days of May": Reformers demand "Stop the Duke, go for Gold", threatening total collapse of bank reserves.',
        },
        {
          stage: '4. The Concession',
          year: 'June 1832',
          text: 'King William IV threatens to create 50 Whig peers; the Lords surrender and pass the Great Reform Act.',
        },
      ],
      prompt:
        'In 3–4 sentences, explain why the threat of financial panic ("Go for Gold") and civil war forced the aristocracy to concede the vote to the middle class:',
      lines: 8,
      clue: '<em>Low-Floor Clue:</em> What would happen to the wealthy landowners if the British banking system completely collapsed?',
      scholarsEdge:
        '<strong>★ Scholar’s Edge:</strong> Did the 1832 Great Reform Act represent the birth of British democracy, or a clever move by landowners to protect their power?',
    },
  },
  {
    // Lesson 8: Capstone Synoptic Evaluation
    genre: 'Genre 4: Historiographical Debate (Capstone Essay)',
    skill: 'Historical Interpretations',
    genreNum: 4,
    enquiryQuestion:
      'Enquiry: Who truly benefited from the Industrial Revolution? Evaluate the competing claims of the Optimists and the Pessimists.',
    structureStrip: [
      {
        col: '1. THE POSITIVE VIEW',
        text: 'Explain the positive argument: factory goods became cheaper, trains allowed travel, and wages slowly rose, creating modern life.',
      },
      {
        col: '2. THE NEGATIVE VIEW',
        text: 'Explain the negative argument: workers lived in filthy slums, died young from disease, and were punished by dangerous factory work.',
      },
      {
        col: '3. YOUR FINAL VERDICT',
        text: 'Give your judgment: did the Industrial Revolution do more good or more harm to the ordinary people who lived through it?',
      },
    ],
    connectives:
      'Some historians argue life improved because... • In contrast, other historians point out that... • For example, ordinary families suffered from... • Ultimately, I judge that...',
    vocabTask: {
      type: 'mapping',
      termA: 'Optimist School',
      termB: 'Pessimist School',
      prompt:
        'Write one analytical sentence contrasting the historical claims of the <strong>Optimist School</strong> against the <strong>Pessimist School</strong> regarding living standards:',
    },
    bridgeTask: {
      type: 'ledger',
      badge: 'Historiographical Synthesis Ledger',
      title: 'Task 4: The Great Standard of Living Debate: Optimists vs. Pessimists',
      instruction:
        'Complete the audit below, organizing the strongest historical evidence for each viewpoint.',
      col1Title: 'The Optimist View (Things Got Better)',
      col1Prompts: [
        'Cheaper mass-produced clothes, soap, tea, and train travel.',
        'Wages slowly rose after 1850; new laws protected children.',
        'Created modern hospitals, schools, and democratic rights.',
        'Fewer famines and more reliable food supplies.',
      ],
      col2Title: 'The Pessimist View (Things Got Worse)',
      col2Prompts: [
        'Cottage workers lost their independence and dignity.',
        'Dirty urban slums, stunted children, and deadly cholera.',
        'Huge wealth created by exploiting workers and colonies.',
        'Long, exhausting hours under the tyranny of the factory clock.',
      ],
      clue: '<em>Low-Floor Clue:</em> Distinguish between what happened to the first generation of factory workers (1780–1830) versus their grandchildren (after 1860).',
      scholarsEdge:
        '<strong>★ Scholar’s Edge:</strong> Is it fair to say forty years of misery for early workers was worth it because our lives are better today?',
    },
  },
];

function buildIndustrialisationTwoPageWorkbook(unitData, period) {
  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Pupil Workbook - industrialisation_and_empire</title>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,500;1,600&display=swap" rel="stylesheet">
  <style>
    *, *:before, *:after { box-sizing: border-box; }
    @page {
      size: A4 portrait;
      margin: 15mm 20mm 15mm 20mm;
    }
    body {
      font-family: 'Georgia', 'Garamond', serif;
      font-size: 10pt;
      line-height: 1.35;
      color: #1e293b;
      margin: 0;
      padding: 0;
      background: #ffffff;
    }
    h1, h2, h3, h4, h5, h6, strong, th, .sans {
      font-family: 'Inter', -apple-system, sans-serif;
    }
    .page, .page-container {
      width: 100%;
      height: 260mm;
      max-height: 260mm;
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
      border-bottom: 1px solid #cbd5e1;
      height: 7.6mm;
      width: 100%;
      box-sizing: border-box;
    }
    .task-line-dotted {
      border-bottom: 1px dotted #94a3b8;
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
  </style>
</head>
<body>
`;

  // ==========================================
  // PAGE 1: FRONT COVER (Recto, Right Page)
  // ==========================================
  html += `
  <div class="page page-container" id="page-1" style="padding: 16px 18px; border: 1px solid #cbd5e1; outline: 3.5px double #0f172a; outline-offset: -8px; justify-content: flex-start;">
    <!-- Institutional Header & Pupil Registration Strip -->
    <div style="margin-bottom: 10px;">
      <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px;">
        <span style="font-family: 'Inter', sans-serif; font-size: 8.5pt; text-transform: uppercase; letter-spacing: 2px; color: #1e3a8a; font-weight: 700;">
          Meoncross School &bull; Department of History
        </span>
        <span style="font-family: 'Inter', sans-serif; font-size: 8pt; text-transform: uppercase; letter-spacing: 1.5px; color: #64748b; font-weight: 600;">
          Year 8 History
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

    <!-- Main Title Block (No black line above it) -->
    <div style="text-align: center; border-bottom: 1px solid #cbd5e1; padding: 2px 0 8px 0; margin-bottom: 9px;">
      <h1 style="font-family: 'Playfair Display', serif; font-size: 23pt; color: #0f172a; margin: 0 0 3px 0; text-transform: uppercase; letter-spacing: 1.5px; line-height: 1.15;">
        Industrialisation, Empire &amp; Power
      </h1>
      <div style="font-family: 'Inter', sans-serif; font-size: 9.2pt; color: #334155; font-weight: 500; letter-spacing: 0.5px;">
        Britain’s Transformation from Agrarian Kingdom to Global Workshop (1750–1901)
      </div>
    </div>

    <!-- Overarching Enquiry Callout Box (Enlarged, Centered, No Badge) -->
    <div style="border: 1.5px solid #1e3a8a; border-radius: 5px; padding: 9px 16px; background: #f8fafc; margin-bottom: 9px; text-align: center;">
      <div style="font-family: 'Inter', sans-serif; font-size: 7.8pt; text-transform: uppercase; letter-spacing: 1.8px; color: #1e3a8a; font-weight: 700; margin-bottom: 3px;">
        Overarching Historical Enquiry
      </div>
      <div style="font-family: 'Playfair Display', serif; font-size: 13.5pt; color: #0f172a; font-style: italic; font-weight: 600; line-height: 1.25;">
        “How did 19th-century Britain transform at home and abroad?”
      </div>
    </div>

    <!-- Hero Primary Source Presentation (Maximized Map) -->
    <div style="border: 1.2px solid #cbd5e1; border-radius: 6px; padding: 7px; background: #ffffff; box-shadow: 0 2px 6px rgba(0,0,0,0.04); margin-bottom: 9px;">
      <div style="width: 100%; height: 390px; border-radius: 4px; overflow: hidden; border: 1px solid #e2e8f0; background: #f8fafc;">
        <img src="../../images/imperial_federation_map.jpg" style="width: 100%; height: 100%; object-fit: contain; object-position: center; display: block;" alt="Imperial Federation Map 1886">
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 5px; padding: 0 4px; font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #64748b;">
        <span><strong>Primary Visual Source:</strong> <em>Imperial Federation: Map of the World Showing the Extent of the British Empire in 1886</em></span>
        <span style="font-style: italic;">Illustrated by Walter Crane (1845–1915)</span>
      </div>
    </div>

    <!-- Historical Context & Synopsis Box -->
    <div style="border: 1.2px solid #e2e8f0; border-radius: 5px; padding: 8px 12px; background: #fafaf9; margin-bottom: 9px;">
      <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; text-transform: uppercase; letter-spacing: 1px; color: #0f172a; font-weight: 700; margin-bottom: 3px;">
        Curriculum Synopsis &bull; The Dual Reality of the Industrial Age
      </div>
      <p style="font-family: 'Georgia', serif; font-size: 8.5pt; color: #334155; line-height: 1.45; margin: 0; text-align: justify;">
        Steam engines shrieking in smoke-choked valleys, coal-fired textile mills grinding night and day, and an island kingdom projecting naval power across a global empire upon which the sun never set. In this unit, pupils interrogate the dual reality of Britain’s Industrial Revolution: revolutionary engineering and technological mastery built alongside the brutal transatlantic trade in enslaved human beings, deadly urban squalor, and the struggle for working-class democracy.
      </p>
    </div>

    <!-- 8 Core Enquiries Unit Syllabus Roadmap -->
    <div style="border: 1px solid #cbd5e1; border-radius: 5px; padding: 7px 10px; background: #f8fafc;">
      <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase; letter-spacing: 1px; color: #1e3a8a; font-weight: 700; margin-bottom: 4px;">
        The 8 Disciplinary Enquiries:
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px;">
        <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #334155; padding: 2.5px 6px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 3px; display: flex; align-items: center;"><strong style="color: #1e3a8a; margin-right: 5px; white-space: nowrap;">L1:</strong> Energy, Steam &amp; Henry Cort</div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #334155; padding: 2.5px 6px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 3px; display: flex; align-items: center;"><strong style="color: #1e3a8a; margin-right: 5px; white-space: nowrap;">L5:</strong> Empire &amp; 1857 Indian Rebellion</div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #334155; padding: 2.5px 6px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 3px; display: flex; align-items: center;"><strong style="color: #1e3a8a; margin-right: 5px; white-space: nowrap;">L2:</strong> Factory Labour &amp; Discipline</div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #334155; padding: 2.5px 6px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 3px; display: flex; align-items: center;"><strong style="color: #1e3a8a; margin-right: 5px; white-space: nowrap;">L6:</strong> Peterloo &amp; Working-Class Protest</div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #334155; padding: 2.5px 6px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 3px; display: flex; align-items: center;"><strong style="color: #1e3a8a; margin-right: 5px; white-space: nowrap;">L3:</strong> Town Slums &amp; Chadwick (1842)</div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #334155; padding: 2.5px 6px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 3px; display: flex; align-items: center;"><strong style="color: #1e3a8a; margin-right: 5px; white-space: nowrap;">L7:</strong> The 1832 Great Reform Act</div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #334155; padding: 2.5px 6px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 3px; display: flex; align-items: center;"><strong style="color: #1e3a8a; margin-right: 5px; white-space: nowrap;">L4:</strong> Navy &amp; Expansion of Empire</div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #334155; padding: 2.5px 6px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 3px; display: flex; align-items: center;"><strong style="color: #1e3a8a; margin-right: 5px; white-space: nowrap;">L8:</strong> The Standard of Living Debate</div>
      </div>
    </div>
  </div>
  `;

  // ==========================================
  // PAGE 2: PROGRESS & ASSESSMENT TRACKER (Verso, Left Page)
  // ==========================================
  html += `
  <div class="page page-container" id="page-2" style="padding: 10px 0; display: flex; flex-direction: column; height: 260mm; justify-content: space-between;">
    <div>
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #1e3a8a; padding-bottom: 4px; margin-bottom: 7px;">
        <h2 style="margin: 0; color: #1e3a8a; font-size: 14pt; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">
          Progress &amp; Assessment Tracker
        </h2>
        <div style="font-family: 'Inter', sans-serif; font-size: 8.5pt; font-weight: 600; color: #334155;">
          Target Grade: <span style="display: inline-block; width: 65px; border-bottom: 1.5px solid #0f172a; margin-left: 4px;"></span>
        </div>
      </div>
      
      <!-- Grading Criteria Benchmarks -->
      <table style="width: 100%; border-collapse: collapse; text-align: left; font-family: 'Inter', sans-serif; font-size: 7.4pt; line-height: 1.25; margin-bottom: 7px;">
        <tbody>
          <tr>
            <td style="border: 1px solid #94a3b8; padding: 3.5px 6px; font-weight: 700; background-color: #1e3a8a; color: #ffffff; width: 10%; text-transform: uppercase; letter-spacing: 0.5px;">Criteria</td>
            <td style="border: 1px solid #cbd5e1; padding: 3.5px 6px; width: 22.5%; background: #f8fafc;"><strong style="color: #0f172a;">Emerging (1–2):</strong> Recalls isolated facts; basic descriptive narrative.</td>
            <td style="border: 1px solid #cbd5e1; padding: 3.5px 6px; width: 22.5%; background: #ffffff;"><strong style="color: #0f172a;">Emerging+ (3):</strong> Identifies causes &amp; consequences with simple explanation.</td>
            <td style="border: 1px solid #cbd5e1; padding: 3.5px 6px; width: 22.5%; background: #f8fafc;"><strong style="color: #0f172a;">Expected (4–5):</strong> Structured PEEL arguments; supports claims with evidence.</td>
            <td style="border: 1px solid #cbd5e1; padding: 3.5px 6px; width: 22.5%; background: #ffffff;"><strong style="color: #0f172a;">Greater Depth (6–9):</strong> Analytical balance; nuanced historical judgements.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div style="width: 100%; display: flex; justify-content: center; flex: 1; min-height: 0; margin-bottom: 4px;">
      <table style="page-break-inside: avoid; width: 100%; height: 100%; border-collapse: collapse; text-align: left; font-family: 'Inter', sans-serif; font-size: 7.8pt; line-height: 1.25; background-color: #ffffff; table-layout: fixed;">
        <thead>
          <tr style="background-color: #1e3a8a; color: #ffffff;">
            <th style="border: 1px solid rgba(255,255,255,0.35); padding: 6px 8px; width: 24%; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; font-size: 7.5pt;">Lesson / Assessment Enquiry</th>
            <th style="border: 1px solid rgba(255,255,255,0.35); padding: 6px 3px; width: 5.5%; text-align: center; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; font-size: 7.5pt;">Effort</th>
            <th style="border: 1px solid rgba(255,255,255,0.35); padding: 6px 3px; width: 5.5%; text-align: center; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; font-size: 7.5pt;">Level</th>
            <th style="border: 1px solid rgba(255,255,255,0.35); padding: 6px 10px; width: 65%; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; font-size: 7.5pt;">Teacher Formative Feedback &amp; Next Steps</th>
          </tr>
        </thead>
        <tbody>
  `;

  unitData.lessons.forEach((l, i) => {
    const isAssessment = l.title && l.title.startsWith('End of Unit Assessment');
    const bg = i % 2 === 1 ? 'background-color: #f8fafc;' : 'background-color: #ffffff;';
    html += `
          <tr style="${bg}">
            <td style="border: 1px solid #cbd5e1; padding: 5px 8px; font-weight: 600; font-size: 7.2pt; color: #0f172a; line-height: 1.2;">
              <div style="color: #1e3a8a; font-weight: 700; font-size: 7.6pt; text-transform: uppercase; margin-bottom: 2px;">Lesson ${i + 1}</div>
              <div style="color: #334155; font-weight: 500;">${l.title}</div>
            </td>
            <td style="border: 1px solid #cbd5e1; padding: 4px; text-align: center; font-weight: 600; font-size: 9pt; color: #0f172a;"></td>
            <td style="border: 1px solid #cbd5e1; padding: 4px; text-align: center; font-weight: 600; font-size: 9pt; color: #0f172a;"></td>
            <td style="border: 1px solid #cbd5e1; padding: 6px 10px; vertical-align: top;"></td>
          </tr>
    `;
  });

  html += `
          <tr style="background-color: #f1f5f9;">
            <td style="border: 1px solid #cbd5e1; padding: 6px 8px; font-weight: 600; font-size: 7.5pt; color: #0f172a; line-height: 1.25;">
              <div style="color: #1e3a8a; font-weight: 700; font-size: 7.8pt; text-transform: uppercase; margin-bottom: 2px;">Formal Assessment</div>
              <div style="color: #334155; font-weight: 600;">End of Unit Enquiry Assessment: Industrialisation &amp; Empire</div>
            </td>
            <td style="border: 1px solid #cbd5e1; padding: 4px; text-align: center; font-weight: 700; font-size: 9pt;"></td>
            <td style="border: 1px solid #cbd5e1; padding: 4px; text-align: center; font-weight: 700; font-size: 9pt;"></td>
            <td style="border: 1px solid #cbd5e1; padding: 6px 10px; vertical-align: top;"></td>
          </tr>
          <tr style="background-color: #e2e8f0; font-weight: bold;">
            <td style="border: 1px solid #94a3b8; padding: 6px 8px; text-align: right; color: #0f172a; font-size: 8.2pt; text-transform: uppercase; letter-spacing: 0.5px;">
              Final Unit Grade &bull; Target Outcome:
            </td>
            <td style="border: 1px solid #94a3b8; padding: 4px; background: #ffffff; text-align: center; font-size: 10pt; font-weight: 700; color: #1e3a8a;"></td>
            <td style="border: 1px solid #94a3b8; padding: 4px; background: #ffffff; text-align: center; font-size: 10pt; font-weight: 700; color: #1e3a8a;"></td>
            <td style="border: 1px solid #94a3b8; padding: 6px 10px; background: #ffffff;"></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  `;

  // ==========================================
  // PAGE 3: COURSE MAP & TIMELINE (Recto, Right Page)
  // ==========================================
  html += `
  <div class="page page-container" id="page-3" style="padding: 10px 0; display: flex; flex-direction: column; height: 260mm; justify-content: space-between;">
    <div style="flex-shrink: 0;">
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #0f172a; padding-bottom: 4px; margin-bottom: 6px;">
        <h2 style="margin: 0; font-size: 14.5pt; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px;">Curriculum Roadmap & Chronological Spine</h2>
        <span class="archival-badge">1750 – 1900</span>
      </div>
      <p style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #475569; margin: 0; line-height: 1.35;">
        Follow Britain's dual transformation: the domestic industrial revolution at home and the expansion of imperial power abroad.
      </p>
    </div>

    <!-- Visual Chronological Spine (Spaced out to use entirety of page) -->
    <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; margin: 8px 0; padding: 4px 0;">
  `;

  const timelineItems = [
    {
      year: '1769–1784',
      title: 'The Energy & Materials Revolution',
      desc: 'Watt patents separate steam condenser (1769); Cort patents puddling & rolling at Funtley (1783-84).',
    },
    {
      year: '1780–1830',
      title: 'The Rise of the Factory System',
      desc: 'Water frames and steam looms concentrate workers into textile cities; domestic system collapses.',
    },
    {
      year: '1815–1819',
      title: 'Post-Napoleonic Distress & Peterloo',
      desc: 'Corn Laws spark starvation; 60,000 peaceful reformers charged by cavalry at St Peter’s Field (1819).',
    },
    {
      year: '1832–1848',
      title: 'The Struggle for Parliamentary Voice',
      desc: 'Great Reform Act enfranchises middle class (1832); Chartists present million-signature petitions (1838–48).',
    },
    {
      year: '1842–1858',
      title: 'Urban Crisis & Public Health Reform',
      desc: 'Chadwick exposes slum death rates (1842); King Cholera epidemics lead to the Great Stink & Bazalgette (1858).',
    },
    {
      year: '1857–1858',
      title: 'The Indian Rebellion & Crown Rule',
      desc: 'Uprising in Meerut shatters East India Company control; Queen Victoria assumes direct Crown sovereignty (1858).',
    },
    {
      year: '1870–1900',
      title: 'High Imperialism & The Global Balance Sheet',
      desc: 'Scramble for Africa; Victorian cultural propaganda contrasts against domestic working-class inequality.',
    },
  ];

  timelineItems.forEach((item) => {
    html += `
      <div style="display: flex; gap: 14px; align-items: flex-start; border-left: 3.5px solid #1e3a8a; padding-left: 14px; position: relative;">
        <div style="position: absolute; left: -6px; top: 4px; width: 9px; height: 9px; border-radius: 50%; background: #1e3a8a; border: 2px solid #ffffff;"></div>
        <div style="font-family: 'Inter', sans-serif; font-size: 8.5pt; font-weight: 800; color: #1e3a8a; width: 84px; flex-shrink: 0; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 4px; padding: 3px 5px; text-align: center;">${item.year}</div>
        <div style="flex: 1;">
          <strong style="font-size: 9.2pt; color: #0f172a; display: block; margin-bottom: 1px;">${item.title}</strong>
          <span style="font-size: 8.2pt; color: #334155; font-family: 'Inter', sans-serif; line-height: 1.4; display: block;">${item.desc}</span>
        </div>
      </div>
    `;
  });

  html += `
    </div>

    <div style="flex-shrink: 0; border: 1.5px solid #bae6fd; background: #f0f9ff; border-radius: 6px; padding: 8px 12px; margin-bottom: 6px;">
      <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0369a1; display: block; margin-bottom: 3px;">🏛️ Hampshire Local History Connection:</strong>
      <p style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #1e293b; margin: 0; line-height: 1.35;">
        Our curriculum directly anchors national events into our local Hampshire landscape: from <strong>Henry Cort’s surviving puddling weir and iron slag wall at Funtley</strong>, to <strong>Fareham Red brick clay pits</strong>, and the <strong>Portsmouth Royal Navy Dockyard</strong> industrial complex.
      </p>
    </div>

    <div style="flex-shrink: 0; font-family: 'Inter', sans-serif; font-size: 8.2pt; font-weight: 600; color: #475569; text-align: center; border-top: 1px solid #cbd5e1; padding-top: 5px;">
      Turn overleaf to begin <strong>Lesson 1 (Pages 4–5 Facing Spread)</strong> ➔
    </div>
  </div>
  `;

  // ==========================================
  // LESSONS 1 TO 8: FACING 2-PAGE SPREADS!
  // ==========================================
  unitData.lessons.forEach((lesson, lIdx) => {
    const cfg = lessonConfigs[lIdx];
    const leftPageNum = lIdx * 2 + 4;
    const rightPageNum = lIdx * 2 + 5;

    // ----------------------------------------------------
    // LEFT PAGE (Verso, Even Page Number: 4, 6, 8, 10...)
    // ----------------------------------------------------
    html += `
    <div class="page page-container" id="page-${leftPageNum}">
      <div>
        <!-- Lesson Header (Compact & Scholarly) -->
        <div style="border-bottom: 2px solid #1e3a8a; padding-bottom: 4px; margin-bottom: 6px; display: flex; justify-content: space-between; align-items: flex-end;">
          <div>
            <div style="font-family: 'Inter', sans-serif; font-size: 8pt; text-transform: uppercase; letter-spacing: 1px; color: #64748b; font-weight: 600;">
              Unit 4: Industrialisation &bull; Lesson ${lIdx + 1}
            </div>
            <h2 style="font-family: 'Playfair Display', serif; font-size: 13.5pt; color: #0f172a; margin: 2px 0 0 0; line-height: 1.2;">
              L${lIdx + 1}: ${formatText(lesson.title)}
            </h2>
          </div>
        </div>

        <!-- Learning Objectives (Compact 3-bullets, 8.5pt) -->
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 5px 8px; margin-bottom: 6px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; text-transform: uppercase; color: #475569; letter-spacing: 0.5px; display: block; margin-bottom: 2px;">Core Learning Objectives:</strong>
          <ul style="margin: 0; padding-left: 16px; font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #334155; line-height: 1.35;">
    `;
    (lesson.learning_objectives.scaffolded || []).slice(0, 3).forEach((obj) => {
      html += `<li>${formatText(obj)}</li>`;
    });
    html += `
          </ul>
        </div>

        <!-- Do Now Recall Strip -->
        <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 5px 8px; margin-bottom: 6px; background: #ffffff;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 3px; margin-bottom: 4px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; text-transform: uppercase; letter-spacing: 0.6px; color: #0f172a;">Do Now: Recall</strong>
            </div>
            <span style="font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 700; color: #1e3a8a; background: #eff6ff; border: 1px solid #bfdbfe; padding: 1px 7px; border-radius: 3px;">Score: &nbsp; &nbsp; / 5</span>
          </div>
          <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px;">
            <div style="background: #fafaf9; border: 1px solid #e2e8f0; border-radius: 3px; padding: 3px 5px;">
              <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 700; color: #1e3a8a; margin-bottom: 1px;">Q1</div>
              <div class="task-line-dotted" style="height: 5.5mm;"></div>
              <div class="task-line-dotted" style="height: 5.5mm;"></div>
            </div>
            <div style="background: #fafaf9; border: 1px solid #e2e8f0; border-radius: 3px; padding: 3px 5px;">
              <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 700; color: #1e3a8a; margin-bottom: 1px;">Q2</div>
              <div class="task-line-dotted" style="height: 5.5mm;"></div>
              <div class="task-line-dotted" style="height: 5.5mm;"></div>
            </div>
            <div style="background: #fafaf9; border: 1px solid #e2e8f0; border-radius: 3px; padding: 3px 5px;">
              <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 700; color: #1e3a8a; margin-bottom: 1px;">Q3</div>
              <div class="task-line-dotted" style="height: 5.5mm;"></div>
              <div class="task-line-dotted" style="height: 5.5mm;"></div>
            </div>
            <div style="background: #fafaf9; border: 1px solid #e2e8f0; border-radius: 3px; padding: 3px 5px;">
              <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 700; color: #1e3a8a; margin-bottom: 1px;">Q4</div>
              <div class="task-line-dotted" style="height: 5.5mm;"></div>
              <div class="task-line-dotted" style="height: 5.5mm;"></div>
            </div>
            <div style="background: #fafaf9; border: 1px solid #e2e8f0; border-radius: 3px; padding: 3px 5px;">
              <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 700; color: #1e3a8a; margin-bottom: 1px;">Q5</div>
              <div class="task-line-dotted" style="height: 5.5mm;"></div>
              <div class="task-line-dotted" style="height: 5.5mm;"></div>
            </div>
          </div>
        </div>

        <!-- Core Vocabulary -->
        <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 5px 8px; margin-bottom: 6px; background: #fdfbf7;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; text-transform: uppercase; color: #0f172a; letter-spacing: 0.5px;">Core Vocabulary</strong>
          </div>
    `;

    if (cfg.vocabTask.type === 'cloze') {
      html += `
          <div style="font-family: 'Inter', sans-serif; font-size: 8.2pt; color: #334155; margin-bottom: 2px;">
            ${cfg.vocabTask.prompt}
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #1e293b; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 3px; padding: 4px 6px; margin-bottom: 3px; line-height: 1.35;">
            ${cfg.vocabTask.clozeText}
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #475569; margin-bottom: 1px;">
            <strong>Application:</strong> ${cfg.vocabTask.followUp}
          </div>
          <div class="task-line" style="height: 6mm;"></div>
          <div class="task-line" style="height: 6mm;"></div>
      `;
    } else {
      html += `
          <div style="font-family: 'Inter', sans-serif; font-size: 8.2pt; color: #334155; margin-bottom: 3px; line-height: 1.3;">
            ${cfg.vocabTask.prompt}
          </div>
          <div class="task-line" style="height: 6mm;"></div>
          <div class="task-line" style="height: 6mm;"></div>
          <div class="task-line" style="height: 6mm;"></div>
      `;
    }

    html += `
        </div>

        <!-- TASK 4: APPLICATION & SYNTHESIS -->
        <div style="border: 1.5px solid #0f172a; border-radius: 5px; padding: 7px 9px; background: #ffffff; margin-bottom: 4px;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.2px solid #0f172a; padding-bottom: 3px; margin-bottom: 5px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #0f172a; text-transform: uppercase;">${cfg.bridgeTask.title}</strong>
          </div>
          ${
            cfg.bridgeTask.instruction
              ? `
          <div style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #334155; margin-bottom: 5px; line-height: 1.35;">
            ${cfg.bridgeTask.instruction}
          </div>`
              : ''
          }
    `;

    // Render task body based on type
    if (cfg.bridgeTask.type === 'draw_label') {
      html += `
          <div class="auto-fill-drawing-box" style="height: 360px; border: 1.5px solid #64748b; border-radius: 4px; background: #ffffff; position: relative; margin-bottom: 5px; box-sizing: border-box;"></div>
          <div style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #1e293b; background: #f1f5f9; padding: 5px 8px; border-radius: 4px; margin-bottom: 4px; border: 1px solid #cbd5e1;">
            ${cfg.bridgeTask.checklist}
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 8.2pt; color: #64748b; margin-bottom: 3px;">
            ${cfg.bridgeTask.clue}
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 8.5pt; color: #1e3a8a; font-style: italic; border-top: 1px dotted #cbd5e1; padding-top: 2px;">
            ${cfg.bridgeTask.scholarsEdge}
          </div>
      `;
    } else if (cfg.bridgeTask.type === 'ledger') {
      html += `
          <div class="auto-fill-ledger" style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 5px;">
            <div style="border: 1px solid #cbd5e1; border-radius: 4px; padding: 6px 7px; background: #f8fafc;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0369a1; display: block; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 3px;">${cfg.bridgeTask.col1Title}</strong>
              <ul style="margin: 0 0 5px 0; padding-left: 15px; font-family: 'Inter', sans-serif; font-size: 8pt; color: #475569; line-height: 1.35;">
                ${cfg.bridgeTask.col1Prompts.map((p) => `<li>${p}</li>`).join('')}
              </ul>
              <div style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 600; color: #0369a1; border-top: 1px dashed #cbd5e1; padding-top: 3px; margin: 4px 0 2px 0;">
                ✍️ Synthesise their perspective in 2–3 sentences:
              </div>
              <div class="ledger-col-1">
                <div class="task-line-dotted" style="height: 5.6mm;"></div>
                <div class="task-line-dotted" style="height: 5.6mm;"></div>
                <div class="task-line-dotted" style="height: 5.6mm;"></div>
                <div class="task-line-dotted" style="height: 5.6mm;"></div>
                <div class="task-line-dotted" style="height: 5.6mm;"></div>
              </div>
            </div>
            <div style="border: 1px solid #cbd5e1; border-radius: 4px; padding: 6px 7px; background: #f8fafc;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #b91c1c; display: block; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 3px;">${cfg.bridgeTask.col2Title}</strong>
              <ul style="margin: 0 0 5px 0; padding-left: 15px; font-family: 'Inter', sans-serif; font-size: 8pt; color: #475569; line-height: 1.35;">
                ${cfg.bridgeTask.col2Prompts.map((p) => `<li>${p}</li>`).join('')}
              </ul>
              <div style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 600; color: #b91c1c; border-top: 1px dashed #cbd5e1; padding-top: 3px; margin: 4px 0 2px 0;">
                ✍️ Synthesise their perspective in 2–3 sentences:
              </div>
              <div class="ledger-col-2">
                <div class="task-line-dotted" style="height: 5.6mm;"></div>
                <div class="task-line-dotted" style="height: 5.6mm;"></div>
                <div class="task-line-dotted" style="height: 5.6mm;"></div>
                <div class="task-line-dotted" style="height: 5.6mm;"></div>
                <div class="task-line-dotted" style="height: 5.6mm;"></div>
              </div>
            </div>
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 8.2pt; color: #64748b; margin-bottom: 3px;">
            ${cfg.bridgeTask.clue}
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 8.5pt; color: #1e3a8a; font-style: italic; border-top: 1px dotted #cbd5e1; padding-top: 2px;">
            ${cfg.bridgeTask.scholarsEdge}
          </div>
      `;
    } else if (cfg.bridgeTask.type === 'source_utility') {
      html += `
          <div style="border: 1px solid #cbd5e1; border-left: 3px solid #1e3a8a; background: #fdfbf7; padding: 7px 10px; font-size: 8.5pt; font-style: italic; color: #1e293b; margin-bottom: 5px; line-height: 1.4;">
            ${cfg.bridgeTask.sourceText}
          </div>
          <div class="auto-fill-lines" data-line-height="6.8" data-line-type="task-line">
            ${Array(cfg.bridgeTask.lines || 8)
              .fill('<div class="task-line" style="height: 6.8mm;"></div>')
              .join('')}
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 8.2pt; color: #64748b; margin-top: 4px; margin-bottom: 2px;">
            ${cfg.bridgeTask.clue}
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 8.5pt; color: #1e3a8a; font-style: italic; border-top: 1px dotted #cbd5e1; padding-top: 2px;">
            ${cfg.bridgeTask.scholarsEdge}
          </div>
      `;
    } else if (cfg.bridgeTask.type === 'metric_table') {
      html += `
          <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif; font-size: 8pt; margin-bottom: 5px; border: 1px solid #cbd5e1;">
            <thead>
              <tr style="background: #f1f5f9; color: #0f172a;">
                ${cfg.bridgeTask.tableHeaders.map((h) => `<th style="padding: 5px 7px; text-align: left; border: 1px solid #cbd5e1; font-size: 8.2pt;">${h}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${cfg.bridgeTask.rows
                .map(
                  (r) => `
                <tr>
                  <td style="padding: 5px 7px; font-weight: 700; border: 1px solid #cbd5e1; width: 22%; font-size: 8pt;">${r[0]}</td>
                  <td style="padding: 5px 7px; border: 1px solid #cbd5e1; width: 39%; font-size: 8pt;">${r[1]}</td>
                  <td style="padding: 5px 7px; border: 1px solid #cbd5e1; width: 39%; font-size: 8pt;">${r[2]}</td>
                </tr>
              `,
                )
                .join('')}
            </tbody>
          </table>
          <div style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #1e293b; margin-bottom: 3px;">
            <strong>Synthesis:</strong> ${cfg.bridgeTask.prompt}
          </div>
          <div class="auto-fill-lines" data-line-height="6.8" data-line-type="task-line">
            ${Array(cfg.bridgeTask.lines || 8)
              .fill('<div class="task-line" style="height: 6.8mm;"></div>')
              .join('')}
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 8.5pt; color: #1e3a8a; font-style: italic; border-top: 1px dotted #cbd5e1; padding-top: 2px; margin-top: 3px;">
            ${cfg.bridgeTask.scholarsEdge}
          </div>
      `;
    } else if (cfg.bridgeTask.type === 'causal_pivot') {
      html += `
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 5px; margin-bottom: 6px;">
            ${cfg.bridgeTask.steps
              .map(
                (s) => `
              <div style="border: 1px solid #bae6fd; background: #f0f9ff; border-radius: 3px; padding: 5px 6px; font-family: 'Inter', sans-serif;">
                <span style="font-size: 7.5pt; font-weight: 700; color: #0369a1; display: block; margin-bottom: 2px;">${s.stage} (${s.year})</span>
                <span style="font-size: 7.5pt; color: #1e293b; line-height: 1.3; display: block;">${s.text}</span>
              </div>
            `,
              )
              .join('')}
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #1e293b; margin-bottom: 3px;">
            <strong>Causal Analysis:</strong> ${cfg.bridgeTask.prompt}
          </div>
          <div class="auto-fill-lines" data-line-height="6.8" data-line-type="task-line">
            ${Array(cfg.bridgeTask.lines || 8)
              .fill('<div class="task-line" style="height: 6.8mm;"></div>')
              .join('')}
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 8.5pt; color: #1e3a8a; font-style: italic; border-top: 1px dotted #cbd5e1; padding-top: 2px; margin-top: 3px;">
            ${cfg.bridgeTask.scholarsEdge}
          </div>
      `;
    }

    html += `
        </div>
      </div>

      <!-- Left Page Footer -->
      <div style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #94a3b8; display: flex; justify-content: space-between; border-top: 1px solid #e2e8f0; padding-top: 3px;">
        <span>Meoncross History &bull; KS3 Industrialisation</span>
        <span>Page ${leftPageNum} (Facing Spread Left)</span>
      </div>
    </div>
    `;

    // ----------------------------------------------------
    // RIGHT PAGE (Recto, Odd Page Number: 5, 7, 9, 11...)
    // ----------------------------------------------------
    html += `
    <div class="page page-container" id="page-${rightPageNum}">
      <div>
        <!-- Enquiry Question Header (Natural Archival School Typography) -->
        <div style="border-bottom: 2px solid #1e3a8a; padding-bottom: 5px; margin-bottom: 7px; display: flex; justify-content: space-between; align-items: flex-end;">
          <div>
            <div style="font-family: 'Inter', sans-serif; font-size: 8.2pt; text-transform: uppercase; letter-spacing: 1px; color: #1e3a8a; font-weight: 700;">
              Historical Skill: ${cfg.skill}
            </div>
            <h3 style="font-family: 'Playfair Display', serif; font-size: 13pt; color: #0f172a; margin: 3px 0 0 0; line-height: 1.25;">
              ${cfg.enquiryQuestion}
            </h3>
          </div>
          <span class="archival-badge" style="background: #eff6ff; color: #1e3a8a; border-color: #bfdbfe; flex-shrink: 0;">Extended Writing</span>
        </div>

        <!-- Bespoke Disciplinary Structure Strip (3-Columns, 8.5pt) -->
        <div style="border: 1.2px solid #cbd5e1; border-radius: 5px; padding: 6px 8px; background: #f8fafc; margin-bottom: 6px;">
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; margin-bottom: 4px;">
            ${cfg.structureStrip
              .map(
                (s) => `
              <div style="border: 1px solid #e2e8f0; border-radius: 3px; padding: 5px 6px; background: #ffffff;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #1e3a8a; display: block; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px; margin-bottom: 2px;">${s.col}</strong>
                <span style="font-family: 'Inter', sans-serif; font-size: 8.4pt; color: #334155; line-height: 1.3; display: block;">${s.text}</span>
              </div>
            `,
              )
              .join('')}
          </div>
          
          <div style="border-top: 1px dashed #cbd5e1; padding-top: 3px; display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 8.2pt;">
            <span style="color: #475569;"><strong>Sentence Starters &amp; Connectives:</strong> ${cfg.connectives}</span>
          </div>
        </div>

        <!-- Disciplinary Writing Framework Strip (Source Utility NOP vs PEEL) -->
        ${
          cfg.genreNum === 6
            ? `
        <div style="background: #f8fafc; border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 5px 8px; margin-bottom: 6px; display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 8.2pt; color: #1e293b;">
          <span><strong style="color: #1e3a8a;">[C] Content:</strong> Specific details from Source C.</span>
          <span><strong style="color: #1e3a8a;">[O] Own Knowledge:</strong> Corroborating historical context.</span>
          <span><strong style="color: #1e3a8a;">[P] Provenance (NOP):</strong> Author, motive, purpose, audience.</span>
          <span><strong style="color: #1e3a8a;">[U] Utility Verdict:</strong> Weigh strengths &amp; limitations.</span>
        </div>`
            : `
        <div style="background: #f8fafc; border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 5px 8px; margin-bottom: 6px; display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 8.2pt; color: #1e293b;">
          <span><strong style="color: #1e3a8a;">[P] Point:</strong> Clear sentence answering enquiry.</span>
          <span><strong style="color: #1e3a8a;">[E] Evidence:</strong> Specific facts from Page ${leftPageNum}.</span>
          <span><strong style="color: #1e3a8a;">[E] Explanation:</strong> Explain how and why this happened.</span>
          <span><strong style="color: #1e3a8a;">[L] Link:</strong> Link back to answer the question.</span>
        </div>`
        }

        <!-- Ruled Writing Lines (Dynamic Auto-Fill, 7.6mm Line Height) -->
        <div class="auto-fill-writing-lines" data-line-height="7.6" style="width: 100%; margin-bottom: 6px;">
          ${Array(20).fill('<div class="task-line" style="height: 7.6mm;"></div>').join('')}
        </div>
      </div>

      <!-- Teacher Grading & Assessment Footer (Bespoke Disciplinary Mastery) -->
      <div>
        <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 5px 8px; background: #f8fafc; display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 8.2pt; color: #334155;">
          <div>
            <strong>Teacher Assessment:</strong> &nbsp;
            Effort: [ 1 &bull; 2 &bull; 3 &bull; 4 ] &nbsp;|&nbsp; 
            Subject Knowledge: [ 1 &bull; 2 &bull; 3 &bull; 4 ] &nbsp;|&nbsp; 
            Disciplinary Analysis: [ 1 &bull; 2 &bull; 3 &bull; 4 ]
          </div>
          <div>
            ${
              cfg.genreNum === 6
                ? '<strong>Source Utility Mastery:</strong> [ &nbsp; ] C &nbsp; [ &nbsp; ] O &nbsp; [ &nbsp; ] P (NOP) &nbsp; [ &nbsp; ] U'
                : '<strong>PEEL Mastery:</strong> [ &nbsp; ] P &nbsp; [ &nbsp; ] E &nbsp; [ &nbsp; ] E &nbsp; [ &nbsp; ] L'
            }
          </div>
        </div>
        
        <div style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #94a3b8; display: flex; justify-content: space-between; border-top: 1px solid #e2e8f0; padding-top: 3px; margin-top: 3px;">
          <span>Enquiry Write-Up &bull; Historical Skill: ${cfg.skill}</span>
          <span>Page ${rightPageNum} (Facing Spread Right)</span>
        </div>
      </div>
    </div>
    `;
  });

  // ==========================================
  // PAGE 20: BACK COVER (End of Unit Reflection & Pupil Voice)
  // ==========================================
  html += `
  <div class="page page-container" id="page-20" style="padding: 14px 18px; display: flex; flex-direction: column; height: 260mm; justify-content: space-between; border: 1px solid #cbd5e1; outline: 3.5px double #0f172a; outline-offset: -8px;">
    <div>
      <div style="border-bottom: 2px solid #1e3a8a; padding-bottom: 6px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: baseline;">
        <div>
          <h2 style="margin: 0; font-family: 'Playfair Display', serif; font-size: 17pt; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px;">
            End of Unit Reflection &amp; Pupil Voice
          </h2>
          <div style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #64748b; margin-top: 2px;">
            Unit: Industrialisation, Empire &amp; Power (1750–1901) &bull; Year 8 History
          </div>
        </div>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #1e3a8a; background: #eff6ff; border: 1px solid #bfdbfe; padding: 3px 8px; border-radius: 3px;">
          Pupil Voice
        </span>
      </div>

      <p style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #334155; line-height: 1.4; margin: 0 0 10px 0; background: #f8fafc; border-left: 3px solid #1e3a8a; padding: 6px 10px; border-radius: 3px;">
        <strong>Instructions:</strong> Take 10 minutes to reflect honestly on your learning across this entire unit. Your responses provide vital <strong>Pupil Voice</strong> feedback to help your teacher evaluate progress, address misconceptions, and personalize future enquiry lessons.
      </p>

      <!-- 1. WWW -->
      <div style="margin-bottom: 10px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 3px;">
          <h3 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 9.5pt; color: #1e3a8a; text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px;">
            1. What Went Well (WWW)
          </h3>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #64748b;">Key Strengths &amp; Insights</span>
        </div>
        <p style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #475569; margin: 0 0 4px 0;">
          Which enquiry question, historical evidence, or skill (e.g. Cort's puddling process, source analysis, or extended causal writing) did you find most engaging or master most successfully?
        </p>
        <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; height: 60px; background: #f8fafc;"></div>
      </div>

      <!-- 2. EBI -->
      <div style="margin-bottom: 10px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 3px;">
          <h3 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 9.5pt; color: #1e3a8a; text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px;">
            2. Even Better If (EBI)
          </h3>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #64748b;">Areas for Growth &amp; Misconceptions</span>
        </div>
        <p style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #475569; margin: 0 0 4px 0;">
          What concept or enquiry did you find most challenging? Are there any historical debates or writing structures (e.g. weighing conflicting evidence) you still need further guidance on?
        </p>
        <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; height: 60px; background: #f8fafc;"></div>
      </div>

      <!-- 3. Effort & Target Setting -->
      <div style="margin-bottom: 10px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 3px;">
          <h3 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 9.5pt; color: #1e3a8a; text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px;">
            3. Effort Self-Assessment &amp; Next Unit Target
          </h3>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #64748b;">Linked to Inside Front Cover Tracker</span>
        </div>
        <div style="display: flex; align-items: center; justify-content: space-between; background: #ffffff; border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 6px 12px; margin-bottom: 5px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 600; color: #0f172a;">Circle your overall unit effort:</span>
          <div style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #1e3a8a; font-weight: 700; letter-spacing: 6px;">
            <span>1 (Concern)</span>&nbsp;&nbsp;
            <span>2 (Inconsistent)</span>&nbsp;&nbsp;
            <span>3 (Satisfactory)</span>&nbsp;&nbsp;
            <span>4 (Good)</span>&nbsp;&nbsp;
            <span>5 (Exemplary)</span>
          </div>
        </div>
        <p style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #475569; margin: 0 0 4px 0;">
          What is one specific, actionable historical target you are setting for yourself in the next unit?
        </p>
        <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; height: 50px; background: #f8fafc;"></div>
      </div>

      <!-- 4. Teacher Feedback & Coaching -->
      <div style="border: 1.5px solid #fcd34d; border-radius: 5px; padding: 8px 12px; background: #fffbeb;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 3px;">
          <h3 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 9.5pt; color: #92400e; text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px;">
            Teacher Feedback &amp; Coaching Dialogue
          </h3>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #b45309; font-style: italic;">To be completed during post-assessment feedback</span>
        </div>
        <p style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #78350f; margin: 0 0 5px 0;">
          Teacher comments validating pupil reflection, confirming final grade, and setting forward coaching targets:
        </p>
        <div style="height: 85px; border-radius: 3px; background: #ffffff; border: 1px solid #fde68a;"></div>
      </div>
    </div>

    <!-- Colophon at very bottom of outer cover -->
    <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #cbd5e1; padding-top: 4px; font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #94a3b8;">
      <span>Meoncross School &bull; History Department Archive</span>
      <span>Unit Reflection &bull; Page 20 (Saddle-Stitch Outer Cover)</span>
    </div>
  </div>
  `;

  html += `
  <script>
    (function() {
      function autoFillPages() {
        const leftPages = [4, 6, 8, 10, 12, 14, 16, 18];
        leftPages.forEach(function(pageNum) {
          const page = document.getElementById('page-' + pageNum);
          if (!page) return;
          const topDiv = page.firstElementChild;
          const footerDiv = page.lastElementChild;
          if (!topDiv || !footerDiv) return;

          function getGap() {
            return page.clientHeight - (topDiv.offsetHeight + footerDiv.offsetHeight);
          }

          // 1. Single column ruled lines
          const linesContainer = page.querySelector('.auto-fill-lines');
          if (linesContainer) {
            const lineH = parseFloat(linesContainer.getAttribute('data-line-height') || '6.8');
            const lineHPx = lineH * 3.7795;
            let safety = 0;
            while (getGap() > (lineHPx + 4) && safety < 35) {
              const newLine = document.createElement('div');
              newLine.className = 'task-line';
              newLine.style.height = lineH + 'mm';
              linesContainer.appendChild(newLine);
              safety++;
            }
            while (getGap() < 0 && linesContainer.children.length > 1) {
              linesContainer.removeChild(linesContainer.lastElementChild);
            }
            return;
          }

          // 2. Ledger (two-column dotted lines)
          const col1 = page.querySelector('.ledger-col-1');
          const col2 = page.querySelector('.ledger-col-2');
          if (col1 && col2) {
            const lineHPx = 5.6 * 3.7795;
            let safety = 0;
            while (getGap() > (lineHPx + 4) && safety < 35) {
              const line1 = document.createElement('div');
              line1.className = 'task-line-dotted';
              line1.style.height = '5.6mm';
              col1.appendChild(line1);

              const line2 = document.createElement('div');
              line2.className = 'task-line-dotted';
              line2.style.height = '5.6mm';
              col2.appendChild(line2);
              safety++;
            }
            while (getGap() < 0 && col1.children.length > 1 && col2.children.length > 1) {
              col1.removeChild(col1.lastElementChild);
              col2.removeChild(col2.lastElementChild);
            }
            return;
          }

          // 3. Drawing canvas (Lesson 1, Page 4)
          const drawBox = page.querySelector('.auto-fill-drawing-box');
          if (drawBox) {
            let gap = getGap();
            if (gap > 16) {
              const currentH = drawBox.offsetHeight;
              drawBox.style.height = (currentH + gap - 16) + 'px';
            }
            while (getGap() < 6 && drawBox.offsetHeight > 150) {
              drawBox.style.height = (drawBox.offsetHeight - 5) + 'px';
            }
            return;
          }
        });

        // Right-Hand Writing Spreads Auto-Fill
        const rightPages = [5, 7, 9, 11, 13, 15, 17, 19];
        rightPages.forEach(function (pageNum) {
          const page = document.getElementById('page-' + pageNum);
          if (!page) return;
          const topDiv = page.firstElementChild;
          const footerDiv = page.lastElementChild;
          if (!topDiv || !footerDiv) return;

          function getGap() {
            return (
              page.clientHeight -
              (topDiv.offsetHeight + footerDiv.offsetHeight)
            );
          }

          const writingContainer = page.querySelector(
            '.auto-fill-writing-lines',
          );
          if (writingContainer) {
            const lineH = parseFloat(
              writingContainer.getAttribute('data-line-height') || '7.6',
            );
            const lineHPx = lineH * 3.7795; // ~28.7px
            let safety = 0;
            // Append lines while there is comfortable room
            while (getGap() > lineHPx + 6 && safety < 15) {
              const newLine = document.createElement('div');
              newLine.className = 'task-line';
              newLine.style.height = lineH + 'mm';
              writingContainer.appendChild(newLine);
              safety++;
            }
            // Guard: ensure no page ever overflows (gap must be >= 4px)
            while (getGap() < 4 && writingContainer.children.length > 10) {
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

module.exports = {
  buildIndustrialisationTwoPageWorkbook,
  lessonConfigs,
};
