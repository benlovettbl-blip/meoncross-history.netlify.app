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
      'The immediate breakthrough was... • Over time, this changed Britain because... • Crucially, this transformed... • Key Vocab: pig iron, reverberatory puddling furnace, grooved rollers, Baltic bottleneck.',
    vocabTask: {
      type: 'distinction',
      termA: 'Pig Iron',
      termB: 'Wrought Iron',
      prompt:
        'Distinguish between brittle <strong>pig iron</strong> (high carbon content) and tough naval <strong>wrought iron</strong> (refined by Cort at Funtley):',
    },
    bridgeTask: {
      type: 'source_annotation',
      badge: 'Archival Forensic Investigation',
      title: 'Task 4: Archival Interrogation & Annotation: Source C (Portsmouth Dockyard, 1787)',
      instruction:
        'Interrogate official Navy Board trial records testing Henry Cort’s Funtley iron at Portsmouth Dockyard.',
      sourceTitle: 'Source C: Admiralty Navy Board Portsmouth Dockyard Trial Records (March 1787)',
      shelfmark: 'ADMIRALTY ARCHIVES · ADM 106/2347 · PORTSMOUTH DOCKYARD',
      sourceText:
        '“Pursuant to your directions, we have caused trials to be made of Mr Henry Cort’s iron manufactured at Fontley. We find it to exceed in strength and toughness any iron manufactured in this kingdom, and fully equal to the best Swedish Orgrounds iron for ship bolts, mast hoops, and anchors for His Majesty’s Fleet.”',
      provenance:
        'Official Navy Board Report to the Admiralty, Portsmouth Royal Navy Dockyard, March 1787.',
      questionA:
        'What can an historian infer from Source C about why Cort’s iron was critical for British naval supremacy during wartime?',
      questionB:
        'Explain why official trials conducted by Admiralty master smiths make Source C exceptionally reliable evidence for an enquiry into the Industrial Revolution:',
      scholarsEdge:
        '<strong>★ Scholar’s Edge:</strong> Why did ending reliance on Baltic "Orgrounds" iron protect Britain from naval blockades during the Napoleonic Wars?',
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
        <span class="school-brand-target" data-department-name="History Department" style="font-family: 'Inter', sans-serif; font-size: 8.5pt; text-transform: uppercase; letter-spacing: 2px; color: #1e3a8a; font-weight: 700;">
          History Department
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

  // ====================================================================
  // PAGES 2 & 3: FACING DOUBLE-PAGE LIVING UNIT TIMELINE (1750–1901)
  // ====================================================================
  html += `
  <!-- PAGE 2: LIVING UNIT TIMELINE (1750–1832) · PART I (Facing Spread Left) -->
  <div class="page page-container" id="page-2" style="padding: 10px 14px; display: flex; flex-direction: column; height: 272mm; justify-content: space-between; border: 1px solid #cbd5e1; outline: 3.5px double #0f172a; outline-offset: -6px;">
    <div>
      <!-- Header -->
      <div style="border-bottom: 2px solid #1e3a8a; padding-bottom: 5px; margin-bottom: 7px; display: flex; justify-content: space-between; align-items: flex-end;">
        <div>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.8pt; text-transform: uppercase; letter-spacing: 1px; color: #1e3a8a; font-weight: 700;">
            Living Unit Timeline &bull; Part I: The Spark &amp; Rise of the Machine Age
          </div>
          <h2 style="margin: 2px 0 0 0; font-family: 'Playfair Display', serif; font-size: 14pt; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px;">
            Britain's Transformation (1750–1832)
          </h2>
        </div>
        <span class="archival-badge" style="background: #eff6ff; color: #1e3a8a; border-color: #bfdbfe;">
          Pages 2–3 Facing Spread
        </span>
      </div>

      <!-- Spread Navigation & Sketchpad Guidance Banner -->
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-left: 3px solid #1e3a8a; padding: 4px 8px; margin-bottom: 8px; border-radius: 3px; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #475569; display: flex; justify-content: space-between; align-items: center;">
        <span><strong>Living Timeline Protocol:</strong> Throughout this unit, illustrate each key milestone inside its dedicated sketchpad box. Add visual symbols, causal arrows, and forensic tags.</span>
        <span style="font-weight: 700; color: #1e3a8a; white-space: nowrap; margin-left: 8px;">Spine &bull; Facing Left</span>
      </div>

      <!-- Chronological Timeline Nodes: 1750–1832 -->
      <div style="display: flex; flex-direction: column; gap: 8px;">

        <!-- Milestone 1: 1750 -->
        <div style="display: grid; grid-template-columns: 105px 1fr; gap: 10px; align-items: stretch; border: 1px solid #cbd5e1; border-radius: 4px; padding: 5px 8px; background: #ffffff;">
          <div style="border: 1.2px dashed #94a3b8; border-radius: 3px; background: #fafaf9; display: flex; flex-direction: column; justify-content: space-between; padding: 3px 4px; min-height: 28mm;">
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌜</span><span>Milestone Sketchpad</span><span>⌝</span>
            </div>
            <div style="text-align: center; font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #64748b; font-style: italic;">
              [Sketch: Handloom / Spinning Wheel in cottage]
            </div>
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌞</span><span>1750 Baseline</span><span>⌟</span>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
                <span style="font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; background: #1e3a8a; color: #ffffff; padding: 1px 6px; border-radius: 3px;">1750</span>
                <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f172a;">Pre-Industrial Baseline: The Domestic Handcraft Economy</strong>
              </div>
              <p style="font-family: 'Georgia', serif; font-size: 7.8pt; color: #334155; line-height: 1.35; margin: 0;">
                Production shackled to the seasons, human muscle, and wooden waterwheels. In Hampshire and Cotswold cottages, families spin and weave under the domestic system. British blast furnaces produce only brittle, sulphur-contaminated "pig iron."
              </p>
            </div>
            <div style="border-top: 1px dotted #cbd5e1; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b;">
              <strong>Key Enquiry Link:</strong> Lesson 1 &bull; Domestic handcraft vs. steam-powered factories &bull; Baltic import dependency
            </div>
          </div>
        </div>

        <!-- Milestone 2: 1769 -->
        <div style="display: grid; grid-template-columns: 105px 1fr; gap: 10px; align-items: stretch; border: 1px solid #cbd5e1; border-radius: 4px; padding: 5px 8px; background: #ffffff;">
          <div style="border: 1.2px dashed #94a3b8; border-radius: 3px; background: #fafaf9; display: flex; flex-direction: column; justify-content: space-between; padding: 3px 4px; min-height: 28mm;">
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌜</span><span>Milestone Sketchpad</span><span>⌝</span>
            </div>
            <div style="text-align: center; font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #64748b; font-style: italic;">
              [Sketch: Watt's separate condenser steam engine]
            </div>
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌞</span><span>1769 Invention</span><span>⌟</span>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
                <span style="font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; background: #1e3a8a; color: #ffffff; padding: 1px 6px; border-radius: 3px;">1769</span>
                <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f172a;">Watt's Steam Engine Patent: Unlocking Fossil Power</strong>
              </div>
              <p style="font-family: 'Georgia', serif; font-size: 7.8pt; color: #334155; line-height: 1.35; margin: 0;">
                James Watt patents the separate condenser, multiplying fuel efficiency and creating smooth rotative motive power. Factories are liberated from remote river valleys: steam can roar wherever coal can be carted, birthing the concentrated industrial mill town.
              </p>
            </div>
            <div style="border-top: 1px dotted #cbd5e1; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b;">
              <strong>Key Enquiry Link:</strong> Lessons 1 &amp; 2 &bull; Transition from hydraulic to thermal fossil-fuel economy
            </div>
          </div>
        </div>

        <!-- Milestone 3: 1783–1784 -->
        <div style="display: grid; grid-template-columns: 105px 1fr; gap: 10px; align-items: stretch; border: 1.5px solid #1e3a8a; border-radius: 4px; padding: 5px 8px; background: #fffdfa;">
          <div style="border: 1.2px dashed #1e3a8a; border-radius: 3px; background: #f0f9ff; display: flex; flex-direction: column; justify-content: space-between; padding: 3px 4px; min-height: 28mm;">
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #0284c7;">
              <span>⌜</span><span>Milestone Sketchpad</span><span>⌝</span>
            </div>
            <div style="text-align: center; font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #0369a1; font-weight: 600;">
              [Sketch: Cort's puddling furnace arched roof &amp; rabble]
            </div>
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #0284c7;">
              <span>⌞</span><span>1784 Funtley</span><span>⌟</span>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
                <span style="font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; background: #0284c7; color: #ffffff; padding: 1px 6px; border-radius: 3px;">1783–84</span>
                <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f172a;">Henry Cort at Funtley: The Hampshire Metallurgical Miracle</strong>
              </div>
              <p style="font-family: 'Georgia', serif; font-size: 7.8pt; color: #334155; line-height: 1.35; margin: 0;">
                On the River Meon, Henry Cort masters the reverberatory puddling furnace and grooved rolling mill. Separating coal fire from metal decarburises brittle pig iron into naval-grade wrought iron, boosting output 15 times and freeing Britain from Baltic foreign imports.
              </p>
            </div>
            <div style="border-top: 1px dotted #cbd5e1; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #0369a1;">
              <strong>Local Forensic Site:</strong> Funtley Ironworks weir, circular waterwheel housing &amp; Hampshire slag wall
            </div>
          </div>
        </div>

        <!-- Milestone 4: 1819–1832 -->
        <div style="display: grid; grid-template-columns: 105px 1fr; gap: 10px; align-items: stretch; border: 1px solid #cbd5e1; border-radius: 4px; padding: 5px 8px; background: #ffffff;">
          <div style="border: 1.2px dashed #94a3b8; border-radius: 3px; background: #fafaf9; display: flex; flex-direction: column; justify-content: space-between; padding: 3px 4px; min-height: 28mm;">
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌜</span><span>Milestone Sketchpad</span><span>⌝</span>
            </div>
            <div style="text-align: center; font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #64748b; font-style: italic;">
              [Sketch: Peterloo banner / St Peter's Field crowd]
            </div>
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌞</span><span>1819 Protest</span><span>⌟</span>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
                <span style="font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; background: #1e3a8a; color: #ffffff; padding: 1px 6px; border-radius: 3px;">1819–32</span>
                <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f172a;">Peterloo Massacre to the Great Reform Act: The Struggle for Voice</strong>
              </div>
              <p style="font-family: 'Georgia', serif; font-size: 7.8pt; color: #334155; line-height: 1.35; margin: 0;">
                60,000 peaceful working-class reformers at St Peter's Field, Manchester are charged by sabre-wielding cavalry. The tragedy catalyses political awakening, culminating in the 1832 Great Reform Act that sweeps away rotten boroughs and enfranchises industrial cities.
              </p>
            </div>
            <div style="border-top: 1px dotted #cbd5e1; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b;">
              <strong>Key Enquiry Link:</strong> Lessons 6 &amp; 7 &bull; Parliamentary franchise expansion &bull; Rotten boroughs abolishment
            </div>
          </div>
        </div>

      </div>

      <!-- Bottom Local Anchor Box -->
      <div style="border: 1px solid #bae6fd; background: #f0f9ff; border-radius: 4px; padding: 4px 8px; margin-top: 6px;">
        <div style="display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 7pt; color: #0369a1;">
          <span><strong>🏛️ Hampshire Local Anchor:</strong> Henry Cort at Funtley &bull; Portsmouth Dockyard Hammer Trials (1787)</span>
          <span style="font-weight: 600;">Enquiry Continues Overleaf &rarr;</span>
        </div>
      </div>
    </div>

    <!-- Colophon / Page Number -->
    <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #cbd5e1; padding-top: 3px; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #94a3b8;">
      <span>Living Unit Timeline &bull; Part I: 1750–1832</span>
      <span>Page 2 (Facing Spread Left)</span>
    </div>
  </div>

  <!-- PAGE 3: LIVING UNIT TIMELINE (1840–1901) · PART II (Facing Spread Right) -->
  <div class="page page-container" id="page-3" style="padding: 10px 14px; display: flex; flex-direction: column; height: 272mm; justify-content: space-between; border: 1px solid #cbd5e1; outline: 3.5px double #0f172a; outline-offset: -6px;">
    <div>
      <!-- Header -->
      <div style="border-bottom: 2px solid #1e3a8a; padding-bottom: 5px; margin-bottom: 7px; display: flex; justify-content: space-between; align-items: flex-end;">
        <div>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.8pt; text-transform: uppercase; letter-spacing: 1px; color: #1e3a8a; font-weight: 700;">
            Living Unit Timeline &bull; Part II: Imperial Apex, Resistance &amp; Democracy
          </div>
          <h2 style="margin: 2px 0 0 0; font-family: 'Playfair Display', serif; font-size: 14pt; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px;">
            Britain's Transformation (1840–1901)
          </h2>
        </div>
        <span class="archival-badge" style="background: #eff6ff; color: #1e3a8a; border-color: #bfdbfe;">
          Pages 2–3 Facing Spread
        </span>
      </div>

      <!-- Spread Navigation & Sketchpad Guidance Banner -->
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-left: 3px solid #1e3a8a; padding: 4px 8px; margin-bottom: 8px; border-radius: 3px; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #475569; display: flex; justify-content: space-between; align-items: center;">
        <span><strong>Facing Spread Right:</strong> Complete visual annotations for late-nineteenth-century industrialisation, urban reform, and colonial clashes.</span>
        <span style="font-weight: 700; color: #1e3a8a; white-space: nowrap; margin-left: 8px;">Spine &bull; Facing Right</span>
      </div>

      <!-- Chronological Timeline Nodes: 1840–1901 -->
      <div style="display: flex; flex-direction: column; gap: 8px;">

        <!-- Milestone 5: 1840s -->
        <div style="display: grid; grid-template-columns: 1fr 105px; gap: 10px; align-items: stretch; border: 1px solid #cbd5e1; border-radius: 4px; padding: 5px 8px; background: #ffffff;">
          <div style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
                <span style="font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; background: #1e3a8a; color: #ffffff; padding: 1px 6px; border-radius: 3px;">1840s</span>
                <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f172a;">The Urban Crucible: Chadwick, Cholera &amp; Public Health</strong>
              </div>
              <p style="font-family: 'Georgia', serif; font-size: 7.8pt; color: #334155; line-height: 1.35; margin: 0;">
                Edwin Chadwick’s 1842 Sanitary Report exposes horrific slum mortality: average labourer lifespan in Manchester is just 19 years. Recurring waterborne cholera epidemics shatter laissez-faire dogma, forcing Parliament to pass the historic 1848 Public Health Act.
              </p>
            </div>
            <div style="border-top: 1px dotted #cbd5e1; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b;">
              <strong>Key Enquiry Link:</strong> Lesson 3 &bull; Miasma vs. contagion theory &bull; Clean water infrastructure
            </div>
          </div>
          <div style="border: 1.2px dashed #94a3b8; border-radius: 3px; background: #fafaf9; display: flex; flex-direction: column; justify-content: space-between; padding: 3px 4px; min-height: 28mm;">
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌜</span><span>Milestone Sketchpad</span><span>⌝</span>
            </div>
            <div style="text-align: center; font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #64748b; font-style: italic;">
              [Sketch: Chadwick's drainage pipes / Cholera pump]
            </div>
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌞</span><span>1848 Reform</span><span>⌟</span>
            </div>
          </div>
        </div>

        <!-- Milestone 6: 1857 -->
        <div style="display: grid; grid-template-columns: 1fr 105px; gap: 10px; align-items: stretch; border: 1.5px solid #b91c1c; border-radius: 4px; padding: 5px 8px; background: #fffdfd;">
          <div style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
                <span style="font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; background: #b91c1c; color: #ffffff; padding: 1px 6px; border-radius: 3px;">1857</span>
                <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f172a;">The 1857 Indian Uprising: Anti-Colonial Resistance</strong>
              </div>
              <p style="font-family: 'Georgia', serif; font-size: 7.8pt; color: #334155; line-height: 1.35; margin: 0;">
                Indian sepoys at Meerut revolt against British East India Company domination, ignited by grease on Enfield cartridges and deep economic exploitation. The fierce struggle culminates in the Siege of Cawnpore and sweeping British reprisals across northern India.
              </p>
            </div>
            <div style="border-top: 1px dotted #fca5a5; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #b91c1c;">
              <strong>Key Enquiry Link:</strong> Lesson 5 &bull; First War of Independence vs. Sepoy Mutiny &bull; Colonial trauma
            </div>
          </div>
          <div style="border: 1.2px dashed #b91c1c; border-radius: 3px; background: #fef2f2; display: flex; flex-direction: column; justify-content: space-between; padding: 3px 4px; min-height: 28mm;">
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #ef4444;">
              <span>⌜</span><span>Milestone Sketchpad</span><span>⌝</span>
            </div>
            <div style="text-align: center; font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #991b1b; font-weight: 600;">
              [Sketch: Enfield rifle cartridge / Sepoy badge]
            </div>
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #ef4444;">
              <span>⌞</span><span>1857 Uprising</span><span>⌟</span>
            </div>
          </div>
        </div>

        <!-- Milestone 7: 1858–1876 -->
        <div style="display: grid; grid-template-columns: 1fr 105px; gap: 10px; align-items: stretch; border: 1px solid #cbd5e1; border-radius: 4px; padding: 5px 8px; background: #ffffff;">
          <div style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
                <span style="font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; background: #1e3a8a; color: #ffffff; padding: 1px 6px; border-radius: 3px;">1858–76</span>
                <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f172a;">Direct Crown Rule &amp; High Imperial Hegemony (The British Raj)</strong>
              </div>
              <p style="font-family: 'Georgia', serif; font-size: 7.8pt; color: #334155; line-height: 1.35; margin: 0;">
                The British Crown dissolves the East India Company. Parliament assumes direct sovereignty over the subcontinent. In 1876, Disraeli proclaims Queen Victoria "Empress of India." India becomes the "Jewel in the Crown" supplying cotton, tea, and captive markets.
              </p>
            </div>
            <div style="border-top: 1px dotted #cbd5e1; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b;">
              <strong>Key Enquiry Link:</strong> Lessons 4 &amp; 5 &bull; Global economic circuits &bull; Imperial administrative hierarchy
            </div>
          </div>
          <div style="border: 1.2px dashed #94a3b8; border-radius: 3px; background: #fafaf9; display: flex; flex-direction: column; justify-content: space-between; padding: 3px 4px; min-height: 28mm;">
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌜</span><span>Milestone Sketchpad</span><span>⌝</span>
            </div>
            <div style="text-align: center; font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #64748b; font-style: italic;">
              [Sketch: Imperial Crown / Victoria proclamation]
            </div>
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌞</span><span>1876 Empress</span><span>⌟</span>
            </div>
          </div>
        </div>

        <!-- Milestone 8: 1880–1901 -->
        <div style="display: grid; grid-template-columns: 1fr 105px; gap: 10px; align-items: stretch; border: 1px solid #cbd5e1; border-radius: 4px; padding: 5px 8px; background: #ffffff;">
          <div style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
                <span style="font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; background: #1e3a8a; color: #ffffff; padding: 1px 6px; border-radius: 3px;">1880–01</span>
                <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f172a;">The Scramble for Africa &amp; The Victorian Balance Sheet</strong>
              </div>
              <p style="font-family: 'Georgia', serif; font-size: 7.8pt; color: #334155; line-height: 1.35; margin: 0;">
                European powers carve up the African continent; Britain secures territory from Cairo to the Cape. Victoria's Diamond Jubilee (1897) celebrates unmatched global dominion, while social investigators like Rowntree and Booth reveal deep poverty in British cities.
              </p>
            </div>
            <div style="border-top: 1px dotted #cbd5e1; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b;">
              <strong>Key Enquiry Link:</strong> Lesson 8 &bull; The Standard of Living Debate &bull; Industrial balance sheet
            </div>
          </div>
          <div style="border: 1.2px dashed #94a3b8; border-radius: 3px; background: #fafaf9; display: flex; flex-direction: column; justify-content: space-between; padding: 3px 4px; min-height: 28mm;">
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌜</span><span>Milestone Sketchpad</span><span>⌝</span>
            </div>
            <div style="text-align: center; font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #64748b; font-style: italic;">
              [Sketch: 1886 Crane Empire map / Factory silhouette]
            </div>
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌞</span><span>1901 Victorian End</span><span>⌟</span>
            </div>
          </div>
        </div>

      </div>

      <!-- Bottom Guidance Box -->
      <div style="border: 1px solid #cbd5e1; background: #f8fafc; border-radius: 4px; padding: 4px 8px; margin-top: 6px;">
        <div style="display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 7pt; color: #475569;">
          <span><strong>Living Timeline Complete:</strong> Use this chronological spine for enquiry essay cross-referencing.</span>
          <span style="font-weight: 600; color: #1e3a8a;">Turn overleaf to begin Lesson 1 (Pages 4–5) &rarr;</span>
        </div>
      </div>
    </div>

    <!-- Colophon / Page Number -->
    <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #cbd5e1; padding-top: 3px; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #94a3b8;">
      <span>Living Unit Timeline &bull; Part II: 1840–1901</span>
      <span>Page 3 (Facing Spread Right)</span>
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
            ${(lesson.do_now && lesson.do_now.items ? lesson.do_now.items.slice(0, 5) : [])
              .map(
                (item, qIdx) => `
              <div style="background: #fafaf9; border: 1px solid #e2e8f0; border-radius: 3px; padding: 4px 5px; display: flex; flex-direction: column; justify-content: space-between;">
                <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; line-height: 1.22; color: #1e293b; margin-bottom: 2px;">
                  <strong style="color: #1e3a8a;">Q${qIdx + 1}:</strong> ${formatText(item.question)}
                </div>
                <div>
                  <div class="task-line-dotted" style="height: 5.2mm;"></div>
                  <div class="task-line-dotted" style="height: 5.2mm;"></div>
                </div>
              </div>
            `,
              )
              .join('')}
          </div>
        </div>

        <!-- Core Vocabulary -->
        <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 4px 8px; margin-bottom: 5px; background: #fdfbf7;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; text-transform: uppercase; color: #0f172a; letter-spacing: 0.5px;">Core Vocabulary: Conceptual Distinction</strong>
          </div>
    `;

    if (lIdx === 0) {
      html += `
          <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 3px; padding: 3px 6px; margin-bottom: 3px; font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #1e293b; line-height: 1.25;">
            <strong style="color: #b91c1c;">Pig Iron:</strong> High-carbon, brittle iron melted in blast furnaces. &nbsp;&rarr;&nbsp; <strong style="color: #1e3a8a;">Wrought Iron:</strong> Tough, malleable low-carbon iron refined at Funtley for naval bolts and anchors.
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #334155; margin-bottom: 2px; line-height: 1.25;">
            Explain how Cort’s puddling process chemically transformed brittle pig iron into tough naval wrought iron:
          </div>
          <div class="task-line" style="height: 5.4mm;"></div>
          <div class="task-line" style="height: 5.4mm;"></div>
      `;
    } else if (cfg.vocabTask.type === 'cloze') {
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
        <div style="border: 1.5px solid #0f172a; border-radius: 5px; padding: 6px 9px; background: #ffffff; margin-bottom: 4px;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.2px solid #0f172a; padding-bottom: 3px; margin-bottom: 4px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 8.6pt; color: #0f172a; text-transform: uppercase;">${cfg.bridgeTask.title}</strong>
          </div>
          ${
            cfg.bridgeTask.instruction
              ? `
          <div style="font-family: 'Inter', sans-serif; font-size: 8.2pt; color: #334155; margin-bottom: 4px; line-height: 1.3;">
            ${cfg.bridgeTask.instruction}
          </div>`
              : ''
          }
    `;

    // Render task body based on type
    if (cfg.bridgeTask.type === 'source_annotation') {
      html += `
          <!-- Archival Source C Excerpt Box for Annotation -->
          <div style="border: 1.2px solid #cbd5e1; border-left: 4px solid #1e3a8a; background: #fffdfa; border-radius: 4px; padding: 5px 9px; margin-bottom: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px; margin-bottom: 3px;">
              <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.6px; color: #1e3a8a;">
                ${cfg.bridgeTask.sourceTitle || 'Source C: Admiralty Navy Board Portsmouth Dockyard Trial Records (March 1787)'}
              </span>
              <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; color: #475569; background: #f1f5f9; border: 1px solid #cbd5e1; padding: 1px 5px; border-radius: 3px;">
                ${cfg.bridgeTask.shelfmark || 'ADMIRALTY ARCHIVES · ADM 106/2347 · PORTSMOUTH DOCKYARD'}
              </span>
            </div>
            <div style="font-family: 'Georgia', serif; font-size: 8.4pt; font-style: italic; color: #1e293b; line-height: 1.4; margin-bottom: 2px;">
              ${cfg.bridgeTask.sourceText}
            </div>
            <div style="font-family: 'Inter', sans-serif; font-size: 7pt; color: #64748b; border-top: 1px dotted #e2e8f0; padding-top: 2px;">
              <strong>Provenance:</strong> ${cfg.bridgeTask.provenance}
            </div>
          </div>

          <!-- Active Reading Annotation Prompts -->
          <div style="background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 3px; padding: 3px 6px; margin-bottom: 4px;">
            <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; color: #0369a1; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 1px;">
              ✏️ Active Source Annotation Tasks:
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 4px; font-family: 'Inter', sans-serif; font-size: 7pt; color: #0c4a6e; line-height: 1.2;">
              <div><strong>① Underline:</strong> phrase proving Funtley iron exceeded all British iron.</div>
              <div><strong>② Circle:</strong> foreign gold standard matched (Swedish Orgrounds).</div>
              <div><strong>③ Box:</strong> 3 Royal Navy ship parts forged (bolts, hoops, anchors).</div>
            </div>
          </div>

          <!-- Disciplinary Application Questions -->
          <div style="margin-bottom: 3px;">
            <div style="font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 700; color: #0f172a; margin-bottom: 1px;">
              <span style="color: #1e3a8a;">Part A (GCSE Inference):</span> ${cfg.bridgeTask.questionA}
            </div>
            <div class="task-line" style="height: 5.4mm;"></div>
            <div class="task-line" style="height: 5.4mm;"></div>
            <div class="task-line" style="height: 5.4mm;"></div>
          </div>

          <div style="margin-bottom: 3px;">
            <div style="font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 700; color: #0f172a; margin-bottom: 1px;">
              <span style="color: #1e3a8a;">Part B (GCSE Provenance &amp; Reliability):</span> ${cfg.bridgeTask.questionB}
            </div>
            <div class="task-line" style="height: 5.4mm;"></div>
            <div class="task-line" style="height: 5.4mm;"></div>
            <div class="task-line" style="height: 5.4mm;"></div>
            <div class="task-line" style="height: 5.4mm;"></div>
          </div>

          <!-- Living Timeline Mission Box -->
          <div style="border: 1.2px dashed #0284c7; background: #f0f9ff; border-radius: 4px; padding: 4px 7px; margin-top: 3px; display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 800; background: #0284c7; color: #ffffff; padding: 1px 5px; border-radius: 2px; text-transform: uppercase;">Living Timeline Mission</span>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.3pt; color: #0369a1; line-height: 1.25;">
                Turn back to <strong>Pages 2–3 (Milestone 2: 1784)</strong>. In the sketchpad frame, sketch Cort's reverberatory furnace &amp; grooved rollers!
              </span>
            </div>
            <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 700; color: #0284c7; white-space: nowrap;">&larr; Pages 2–3</span>
          </div>
      `;
    } else if (cfg.bridgeTask.type === 'draw_label') {
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
        <span>The History Portal &bull; KS3 Industrialisation</span>
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
    `;

    if (lIdx === 0) {
      html += `
        <!-- Bespoke Disciplinary Structure Strip (Active Student Planning Matrix) -->
        <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 4px 7px; background: #f8fafc; margin-bottom: 4px;">
          <div style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 800; text-transform: uppercase; color: #1e3a8a; letter-spacing: 0.5px; margin-bottom: 3px; display: flex; justify-content: space-between;">
            <span>Enquiry Planning Matrix: Map your 3 arguments before writing</span>
            <span style="color: #64748b; font-weight: 600;">Draft notes below &darr;</span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 5px;">
            <div style="border: 1px solid #cbd5e1; border-radius: 3px; padding: 3px 5px; background: #ffffff;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #1e3a8a; display: block; border-bottom: 1px solid #e2e8f0; padding-bottom: 1px; margin-bottom: 2px;">1. IMMEDIATE IMPACT</strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #475569; line-height: 1.2; display: block; margin-bottom: 2px;">15x iron output at Funtley; ended dependence on Baltic imports.</span>
              <div class="task-line-dotted" style="height: 4.8mm;"></div>
              <div class="task-line-dotted" style="height: 4.8mm;"></div>
              <div class="task-line-dotted" style="height: 4.8mm;"></div>
            </div>
            <div style="border: 1px solid #cbd5e1; border-radius: 3px; padding: 3px 5px; background: #ffffff;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #1e3a8a; display: block; border-bottom: 1px solid #e2e8f0; padding-bottom: 1px; margin-bottom: 2px;">2. LONG-TERM CHANGES</strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #475569; line-height: 1.2; display: block; margin-bottom: 2px;">Supplied wrought iron for steam boilers, locomotives &amp; naval fleets.</span>
              <div class="task-line-dotted" style="height: 4.8mm;"></div>
              <div class="task-line-dotted" style="height: 4.8mm;"></div>
              <div class="task-line-dotted" style="height: 4.8mm;"></div>
            </div>
            <div style="border: 1px solid #cbd5e1; border-radius: 3px; padding: 3px 5px; background: #ffffff;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #1e3a8a; display: block; border-bottom: 1px solid #e2e8f0; padding-bottom: 1px; margin-bottom: 2px;">3. OVERALL JUDGMENT</strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #475569; line-height: 1.2; display: block; margin-bottom: 2px;">Was Cort the primary catalyst, or were Watt's steam &amp; coal more vital?</span>
              <div class="task-line-dotted" style="height: 4.8mm;"></div>
              <div class="task-line-dotted" style="height: 4.8mm;"></div>
              <div class="task-line-dotted" style="height: 4.8mm;"></div>
            </div>
          </div>
        </div>

        <!-- Categorized Word Bank Strip & Causal Stems -->
        <div style="border: 1px solid #cbd5e1; background: #f8fafc; border-radius: 4px; padding: 3px 7px; margin-bottom: 4px; font-family: 'Inter', sans-serif; font-size: 7.1pt; line-height: 1.3;">
          <div style="display: grid; grid-template-columns: auto 1fr; gap: 6px; align-items: center; margin-bottom: 1px;">
            <strong style="color: #1e3a8a; text-transform: uppercase; font-size: 6.8pt; letter-spacing: 0.5px;">Technical Bank:</strong>
            <span style="color: #334155;">pig iron &bull; reverberatory puddling furnace &bull; grooved rollers &bull; decarburisation &bull; slag</span>
          </div>
          <div style="display: grid; grid-template-columns: auto 1fr; gap: 6px; align-items: center; margin-bottom: 1px;">
            <strong style="color: #0369a1; text-transform: uppercase; font-size: 6.8pt; letter-spacing: 0.5px;">Naval Bank:</strong>
            <span style="color: #334155;">Baltic bottleneck &bull; Swedish Orgrounds &bull; Portsmouth Dockyard &bull; naval anchors &bull; mast hoops</span>
          </div>
          <div style="border-top: 1px dashed #cbd5e1; padding-top: 2px; display: grid; grid-template-columns: auto 1fr; gap: 6px; align-items: center;">
            <strong style="color: #b91c1c; text-transform: uppercase; font-size: 6.8pt; letter-spacing: 0.5px;">Causal Stems:</strong>
            <span style="color: #475569; font-style: italic;">The immediate catalyst was... &bull; Crucially, this transformed... &bull; Over time, this laid the foundation for... &bull; Consequently...</span>
          </div>
        </div>

        <!-- Disciplinary Writing Framework Strip (PEEL) -->
        <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 3px; padding: 3px 8px; margin-bottom: 4px; display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #1e293b;">
          <span><strong style="color: #1e3a8a;">[P] Point:</strong> State Cort's role in significance.</span>
          <span><strong style="color: #1e3a8a;">[E] Evidence:</strong> Funtley stats &amp; Source C quote.</span>
          <span><strong style="color: #1e3a8a;">[E] Explanation:</strong> Metallurgy &amp; industrial scale.</span>
          <span><strong style="color: #1e3a8a;">[L] Link:</strong> Evaluate overall historical weight.</span>
        </div>

        <!-- Ruled Writing Lines (Dynamic Auto-Fill, 7.6mm Line Height) -->
        <div class="auto-fill-writing-lines" data-line-height="7.6" style="width: 100%; margin-bottom: 5px;">
          ${Array(18).fill('<div class="task-line" style="height: 7.6mm;"></div>').join('')}
        </div>
      `;
    } else {
      html += `
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

        <!-- Disciplinary Writing Framework Strip (Source Utility C-OK-NOP vs PEEL) -->
        ${
          cfg.genreNum === 6
            ? `
        <div style="background: #f8fafc; border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 5px 10px; margin-bottom: 6px; display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 8.2pt; color: #1e293b;">
          <span><strong style="color: #1e3a8a;">[C] Content:</strong> Specific quotes &amp; extracted details.</span>
          <span><strong style="color: #1e3a8a;">[OK] Own Knowledge:</strong> Corroborating contextual facts &amp; typicality.</span>
          <span><strong style="color: #1e3a8a;">[NOP] Provenance:</strong> Interrogating Nature, Origin &amp; Purpose.</span>
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
      `;
    }

    html += `
      </div>

      <!-- Teacher Grading & Assessment Footer (Bespoke Disciplinary Mastery) -->
      <div>
        <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 5px 8px; background: #f8fafc; display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 8.2pt; color: #334155;">
          <div>
            <strong>Teacher Assessment:</strong> &nbsp;
            Effort: [ 1 &bull; 2 &bull; 3 &bull; 4 &bull; 5 ] &nbsp;|&nbsp; 
            Subject Knowledge: [ 1 &bull; 2 &bull; 3 &bull; 4 ] &nbsp;|&nbsp; 
            Disciplinary Analysis: [ 1 &bull; 2 &bull; 3 &bull; 4 ]
          </div>
          <div>
            ${
              cfg.genreNum === 6
                ? '<strong>Source Utility Mastery:</strong> &nbsp;&nbsp; C &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; OK &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; NOP'
                : '<strong>PEEL Mastery:</strong> &nbsp;&nbsp; P &nbsp;&nbsp;&nbsp;&nbsp; E &nbsp;&nbsp;&nbsp;&nbsp; E &nbsp;&nbsp;&nbsp;&nbsp; L'
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
  <div class="page page-container" id="page-20" style="padding: 10px 14px; display: flex; flex-direction: column; justify-content: space-between; border: 1px solid #cbd5e1; outline: 3.5px double #0f172a; outline-offset: -7px; background: #ffffff;">
    <div>
      <!-- Header Banner -->
      <div style="border-bottom: 2px solid #1e3a8a; padding-bottom: 4px; margin-bottom: 5px; display: flex; justify-content: space-between; align-items: flex-end;">
        <div>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-transform: uppercase; letter-spacing: 1.2px; color: #1e3a8a;">
            DEPARTMENT OF HISTORY &bull; YEAR 8 ACADEMIC RECORD
          </div>
          <h2 style="margin: 2px 0 0 0; font-family: 'Playfair Display', serif; font-size: 13.5pt; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; line-height: 1.2;">
            Progress &amp; Assessment Tracker: Industrialisation &amp; Empire (1750–1901)
          </h2>
        </div>
        <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #1e3a8a; background: #eff6ff; border: 1px solid #bfdbfe; padding: 2px 7px; border-radius: 3px; white-space: nowrap;">
          Year 8 Record
        </span>
      </div>

      <!-- Pupil Information Strip -->
      <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 3px; padding: 3px 8px; margin-bottom: 5px; font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #334155; display: flex; justify-content: space-between; align-items: center;">
        <span><strong>Pupil Name:</strong> ________________________________</span>
        <span><strong>Class / Set:</strong> ________</span>
        <span><strong>Teacher:</strong> ________________________________</span>
      </div>

      <!-- Comprehensive 8-Lesson Progress & Assessment Table -->
      <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif; font-size: 7.2pt; margin-bottom: 5px; border: 1.2px solid #0f172a;">
        <thead>
          <tr style="background: #0f172a; color: #ffffff;">
            <th style="padding: 3px 4px; text-align: center; border: 1px solid #334155; width: 24px; font-size: 7pt;">L#</th>
            <th style="padding: 3px 5px; text-align: left; border: 1px solid #334155; width: 72px; font-size: 7pt;">Date(s) Learnt</th>
            <th style="padding: 3px 6px; text-align: left; border: 1px solid #334155; font-size: 7pt;">Enquiry Question &amp; Core Historical Focus</th>
            <th style="padding: 3px 5px; text-align: left; border: 1px solid #334155; width: 135px; font-size: 7pt;">Disciplinary Focus &amp; Vocab</th>
            <th style="padding: 3px 4px; text-align: center; border: 1px solid #334155; width: 44px; font-size: 7pt;">Do Now</th>
            <th style="padding: 3px 5px; text-align: center; border: 1px solid #334155; width: 72px; font-size: 7pt;">Teacher Grade</th>
          </tr>
        </thead>
        <tbody>
          <!-- L1 -->
          <tr style="background: #ffffff; border-bottom: 1px solid #cbd5e1;">
            <td style="padding: 3px 4px; text-align: center; font-weight: 800; color: #1e3a8a; border: 1px solid #cbd5e1;">L1</td>
            <td style="padding: 2px 4px; border: 1px solid #cbd5e1; font-size: 6.6pt; color: #64748b; line-height: 1.3;">
              1: ___/___/20___<br>2: ___/___/20___
            </td>
            <td style="padding: 3px 5px; border: 1px solid #cbd5e1; line-height: 1.25;">
              <strong style="color: #0f172a;">Henry Cort, Funtley &amp; The Puddling Process:</strong> How significant was Cort’s breakthrough to British industrial and naval supremacy?
            </td>
            <td style="padding: 3px 5px; border: 1px solid #cbd5e1; color: #475569; font-size: 6.8pt; line-height: 1.2;">
              <strong style="color: #1e3a8a;">Significance</strong> &bull; Reverberatory furnace, pig iron, grooved rollers, Baltic bottleneck
            </td>
            <td style="padding: 3px 4px; text-align: center; border: 1px solid #cbd5e1; font-weight: 700; color: #1e3a8a; font-size: 7pt;">___ / 5</td>
            <td style="padding: 2px 4px; text-align: center; border: 1px solid #cbd5e1; font-size: 6.6pt; line-height: 1.25;">
              G: ______<br><span style="color: #64748b;">Effort: 1 2 3 4</span>
            </td>
          </tr>
          <!-- L2 -->
          <tr style="background: #f8fafc; border-bottom: 1px solid #cbd5e1;">
            <td style="padding: 3px 4px; text-align: center; font-weight: 800; color: #1e3a8a; border: 1px solid #cbd5e1;">L2</td>
            <td style="padding: 2px 4px; border: 1px solid #cbd5e1; font-size: 6.6pt; color: #64748b; line-height: 1.3;">
              1: ___/___/20___<br>2: ___/___/20___
            </td>
            <td style="padding: 3px 5px; border: 1px solid #cbd5e1; line-height: 1.25;">
              <strong style="color: #0f172a;">Industrial Work &amp; Fareham Reds:</strong> Triumph of human progress or catastrophe of punishment for the working class?
            </td>
            <td style="padding: 3px 5px; border: 1px solid #cbd5e1; color: #475569; font-size: 6.8pt; line-height: 1.2;">
              <strong style="color: #1e3a8a;">Change &amp; Continuity</strong> &bull; Mechanised pug mill, Fareham Reds, factory clock
            </td>
            <td style="padding: 3px 4px; text-align: center; border: 1px solid #cbd5e1; font-weight: 700; color: #1e3a8a; font-size: 7pt;">___ / 5</td>
            <td style="padding: 2px 4px; text-align: center; border: 1px solid #cbd5e1; font-size: 6.6pt; line-height: 1.25;">
              G: ______<br><span style="color: #64748b;">Effort: 1 2 3 4</span>
            </td>
          </tr>
          <!-- L3 -->
          <tr style="background: #ffffff; border-bottom: 1px solid #cbd5e1;">
            <td style="padding: 3px 4px; text-align: center; font-weight: 800; color: #1e3a8a; border: 1px solid #cbd5e1;">L3</td>
            <td style="padding: 2px 4px; border: 1px solid #cbd5e1; font-size: 6.6pt; color: #64748b; line-height: 1.3;">
              1: ___/___/20___<br>2: ___/___/20___
            </td>
            <td style="padding: 3px 5px; border: 1px solid #cbd5e1; line-height: 1.25;">
              <strong style="color: #0f172a;">The 1832 Reform Act &amp; Rotten Boroughs:</strong> Did reform cure or confirm the "Old Corruption" of Britain’s political system?
            </td>
            <td style="padding: 3px 5px; border: 1px solid #cbd5e1; color: #475569; font-size: 6.8pt; line-height: 1.2;">
              <strong style="color: #1e3a8a;">Political Causation</strong> &bull; Rotten boroughs, Old Sarum, £10 franchise, Chartism
            </td>
            <td style="padding: 3px 4px; text-align: center; border: 1px solid #cbd5e1; font-weight: 700; color: #1e3a8a; font-size: 7pt;">___ / 5</td>
            <td style="padding: 2px 4px; text-align: center; border: 1px solid #cbd5e1; font-size: 6.6pt; line-height: 1.25;">
              G: ______<br><span style="color: #64748b;">Effort: 1 2 3 4</span>
            </td>
          </tr>
          <!-- L4 -->
          <tr style="background: #f8fafc; border-bottom: 1px solid #cbd5e1;">
            <td style="padding: 3px 4px; text-align: center; font-weight: 800; color: #1e3a8a; border: 1px solid #cbd5e1;">L4</td>
            <td style="padding: 2px 4px; border: 1px solid #cbd5e1; font-size: 6.6pt; color: #64748b; line-height: 1.3;">
              1: ___/___/20___<br>2: ___/___/20___
            </td>
            <td style="padding: 3px 5px; border: 1px solid #cbd5e1; line-height: 1.25;">
              <strong style="color: #0f172a;">The Transatlantic Slave Economy &amp; Capital:</strong> How did chattel slavery and colonial extraction finance Britain's industrial take-off?
            </td>
            <td style="padding: 3px 5px; border: 1px solid #cbd5e1; color: #475569; font-size: 6.8pt; line-height: 1.2;">
              <strong style="color: #1e3a8a;">Economic Causation</strong> &bull; Triangular trade, 1833 compensation, slave capital
            </td>
            <td style="padding: 3px 4px; text-align: center; border: 1px solid #cbd5e1; font-weight: 700; color: #1e3a8a; font-size: 7pt;">___ / 5</td>
            <td style="padding: 2px 4px; text-align: center; border: 1px solid #cbd5e1; font-size: 6.6pt; line-height: 1.25;">
              G: ______<br><span style="color: #64748b;">Effort: 1 2 3 4</span>
            </td>
          </tr>
          <!-- L5 -->
          <tr style="background: #ffffff; border-bottom: 1px solid #cbd5e1;">
            <td style="padding: 3px 4px; text-align: center; font-weight: 800; color: #1e3a8a; border: 1px solid #cbd5e1;">L5</td>
            <td style="padding: 2px 4px; border: 1px solid #cbd5e1; font-size: 6.6pt; color: #64748b; line-height: 1.3;">
              1: ___/___/20___<br>2: ___/___/20___
            </td>
            <td style="padding: 3px 5px; border: 1px solid #cbd5e1; line-height: 1.25;">
              <strong style="color: #0f172a;">The 1857 Indian Uprising:</strong> Was it a mutiny of disgruntled sepoys or India’s first war of independence?
            </td>
            <td style="padding: 3px 5px; border: 1px solid #cbd5e1; color: #475569; font-size: 6.8pt; line-height: 1.2;">
              <strong style="color: #1e3a8a;">Historical Perspectives</strong> &bull; East India Company, Enfield rifle, Bahadur Shah II
            </td>
            <td style="padding: 3px 4px; text-align: center; border: 1px solid #cbd5e1; font-weight: 700; color: #1e3a8a; font-size: 7pt;">___ / 5</td>
            <td style="padding: 2px 4px; text-align: center; border: 1px solid #cbd5e1; font-size: 6.6pt; line-height: 1.25;">
              G: ______<br><span style="color: #64748b;">Effort: 1 2 3 4</span>
            </td>
          </tr>
          <!-- L6 -->
          <tr style="background: #f8fafc; border-bottom: 1px solid #cbd5e1;">
            <td style="padding: 3px 4px; text-align: center; font-weight: 800; color: #1e3a8a; border: 1px solid #cbd5e1;">L6</td>
            <td style="padding: 2px 4px; border: 1px solid #cbd5e1; font-size: 6.6pt; color: #64748b; line-height: 1.3;">
              1: ___/___/20___<br>2: ___/___/20___
            </td>
            <td style="padding: 3px 5px; border: 1px solid #cbd5e1; line-height: 1.25;">
              <strong style="color: #0f172a;">Victorian Slums &amp; Photographic Evidence:</strong> How useful are photographic archives for investigating working-class life?
            </td>
            <td style="padding: 3px 5px; border: 1px solid #cbd5e1; color: #475569; font-size: 6.8pt; line-height: 1.2;">
              <strong style="color: #1e3a8a;">Source Utility (C-OK-NOP)</strong> &bull; Dr Barnardo, staged photography, archival bias
            </td>
            <td style="padding: 3px 4px; text-align: center; border: 1px solid #cbd5e1; font-weight: 700; color: #1e3a8a; font-size: 7pt;">___ / 5</td>
            <td style="padding: 2px 4px; text-align: center; border: 1px solid #cbd5e1; font-size: 6.6pt; line-height: 1.25;">
              G: ______<br><span style="color: #64748b;">Effort: 1 2 3 4</span>
            </td>
          </tr>
          <!-- L7 -->
          <tr style="background: #ffffff; border-bottom: 1px solid #cbd5e1;">
            <td style="padding: 3px 4px; text-align: center; font-weight: 800; color: #1e3a8a; border: 1px solid #cbd5e1;">L7</td>
            <td style="padding: 2px 4px; border: 1px solid #cbd5e1; font-size: 6.6pt; color: #64748b; line-height: 1.3;">
              1: ___/___/20___<br>2: ___/___/20___
            </td>
            <td style="padding: 3px 5px; border: 1px solid #cbd5e1; line-height: 1.25;">
              <strong style="color: #0f172a;">Public Health &amp; The Cholera Crises:</strong> Why did it take terrifying epidemics to defeat laissez-faire attitudes?
            </td>
            <td style="padding: 3px 5px; border: 1px solid #cbd5e1; color: #475569; font-size: 6.8pt; line-height: 1.2;">
              <strong style="color: #1e3a8a;">Causation &amp; Reform</strong> &bull; Miasma theory, John Snow, Broad Street, 1875 Act
            </td>
            <td style="padding: 3px 4px; text-align: center; border: 1px solid #cbd5e1; font-weight: 700; color: #1e3a8a; font-size: 7pt;">___ / 5</td>
            <td style="padding: 2px 4px; text-align: center; border: 1px solid #cbd5e1; font-size: 6.6pt; line-height: 1.25;">
              G: ______<br><span style="color: #64748b;">Effort: 1 2 3 4</span>
            </td>
          </tr>
          <!-- L8 -->
          <tr style="background: #f8fafc;">
            <td style="padding: 3px 4px; text-align: center; font-weight: 800; color: #1e3a8a; border: 1px solid #cbd5e1;">L8</td>
            <td style="padding: 2px 4px; border: 1px solid #cbd5e1; font-size: 6.6pt; color: #64748b; line-height: 1.3;">
              1: ___/___/20___<br>2: ___/___/20___
            </td>
            <td style="padding: 3px 5px; border: 1px solid #cbd5e1; line-height: 1.25;">
              <strong style="color: #0f172a;">The Victorian Balance Sheet:</strong> Who paid the true human and global cost for Britain becoming the "Workshop of the World"?
            </td>
            <td style="padding: 3px 5px; border: 1px solid #cbd5e1; color: #475569; font-size: 6.8pt; line-height: 1.2;">
              <strong style="color: #1e3a8a;">Historical Judgment</strong> &bull; Optimist vs Pessimist, standard of living debate
            </td>
            <td style="padding: 3px 4px; text-align: center; border: 1px solid #cbd5e1; font-weight: 700; color: #1e3a8a; font-size: 7pt;">___ / 5</td>
            <td style="padding: 2px 4px; text-align: center; border: 1px solid #cbd5e1; font-size: 6.6pt; line-height: 1.25;">
              G: ______<br><span style="color: #64748b;">Effort: 1 2 3 4</span>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Overarching Enquiry Verdict Box -->
      <div style="border: 1.5px solid #1e3a8a; border-radius: 4px; padding: 4px 8px; background: #f0fdf4; margin-bottom: 5px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #166534; text-transform: uppercase; letter-spacing: 0.5px;">
            Overarching Unit Enquiry Verdict
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.6pt; font-weight: 700; color: #15803d; background: #dcfce7; padding: 1px 5px; border-radius: 2px;">
            Synthesis Judgement
          </span>
        </div>
        <p style="font-family: 'Georgia', serif; font-size: 7.4pt; color: #14532d; line-height: 1.25; margin: 0 0 2px 0;">
          <em>"Britain’s industrial supremacy was built entirely on domestic technical genius, not imperial exploitation." To what extent do you agree?</em>
        </p>
        <div class="task-line-dotted" style="height: 5mm;"></div>
        <div class="task-line-dotted" style="height: 5mm;"></div>
      </div>

      <!-- Pupil Reflection: WWW & EBI -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 5px;">
        <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 4px 6px; background: #f8fafc;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #1e3a8a; text-transform: uppercase; display: block; margin-bottom: 2px;">
            Pupil Reflection: What Went Well (WWW)
          </strong>
          <div class="task-line-dotted" style="height: 5mm;"></div>
          <div class="task-line-dotted" style="height: 5mm;"></div>
          <div class="task-line-dotted" style="height: 5mm;"></div>
        </div>
        <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 4px 6px; background: #f8fafc;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #b91c1c; text-transform: uppercase; display: block; margin-bottom: 2px;">
            Pupil Reflection: Even Better If (EBI)
          </strong>
          <div class="task-line-dotted" style="height: 5mm;"></div>
          <div class="task-line-dotted" style="height: 5mm;"></div>
          <div class="task-line-dotted" style="height: 5mm;"></div>
        </div>
      </div>

      <!-- Teacher Final Assessment & Coaching Sign-Off Strip -->
      <div style="border: 1.5px solid #f59e0b; border-radius: 4px; padding: 4px 8px; background: #fffbeb;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #92400e; text-transform: uppercase; letter-spacing: 0.5px;">
            Teacher Final Unit Assessment &amp; Coaching Sign-Off
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7pt; color: #b45309; font-weight: 600;">
            Overall Unit Grade: ______ &nbsp;&bull;&nbsp; Effort: [ 1 &bull; 2 &bull; 3 &bull; 4 ]
          </span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 7.1pt; color: #78350f;">
          <span style="flex: 1; margin-right: 12px;"><strong>Next Unit Target:</strong> ____________________________________________________________________</span>
          <span><strong>Signed:</strong> ____________________ &nbsp; <strong>Date:</strong> ___/___/20___</span>
        </div>
      </div>
    </div>

    <!-- Colophon at very bottom of outer cover -->
    <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #cbd5e1; padding-top: 3px; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #94a3b8;">
      <span>History Department Archive &bull; Year 8 Academic Record &bull; Progress Tracker</span>
      <span>Page 20 (Saddle-Stitch Outer Back Cover)</span>
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
            while (getGap() > (lineHPx + 28) && safety < 35) {
              const newLine = document.createElement('div');
              newLine.className = 'task-line';
              newLine.style.height = lineH + 'mm';
              linesContainer.appendChild(newLine);
              safety++;
            }
            while (getGap() < 22 && linesContainer.children.length > 1) {
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
            // Cap ledger at 7 dotted lines max (plenty for 2-3 sentences) with a 28px bottom buffer
            while (getGap() > (lineHPx + 28) && col1.children.length < 7 && safety < 15) {
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
            while (getGap() < 22 && col1.children.length > 3 && col2.children.length > 3) {
              col1.removeChild(col1.lastElementChild);
              col2.removeChild(col2.lastElementChild);
            }
            return;
          }

          // 3. Drawing canvas (Lesson 1, Page 4)
          const drawBox = page.querySelector('.auto-fill-drawing-box');
          if (drawBox) {
            let gap = getGap();
            if (gap > 32) {
              const currentH = drawBox.offsetHeight;
              drawBox.style.height = (currentH + gap - 32) + 'px';
            }
            while (getGap() < 22 && drawBox.offsetHeight > 150) {
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
            // Append lines while keeping a comfortable ~10-15px buffer above teacher assessment
            while (getGap() > lineHPx + 8 && safety < 25) {
              const newLine = document.createElement('div');
              newLine.className = 'task-line';
              newLine.style.height = lineH + 'mm';
              writingContainer.appendChild(newLine);
              safety++;
            }
            // Guard: ensure no page ever overflows (gap must be >= 6px)
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

module.exports = {
  buildIndustrialisationTwoPageWorkbook,
  lessonConfigs,
};
