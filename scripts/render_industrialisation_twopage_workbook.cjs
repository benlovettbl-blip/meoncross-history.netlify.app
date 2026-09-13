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
        col: '1. WHAT THE REPORT SAYS',
        text: 'Explain what Chadwick’s report reveals about filthy streets, overflowing cesspools, and low life expectancy in industrial towns.',
      },
      {
        col: '2. WHO WROTE IT & WHY?',
        text: 'Explain who Chadwick was and why he wrote it: he used shocking examples to force Parliament to spend money on clean water and sewers.',
      },
      {
        col: '3. HOW USEFUL IS IT?',
        text: 'Give your judgment: why is this report still useful to a historian, even if Chadwick focused only on the worst slums?',
      },
    ],
    connectives:
      'The report is useful because it shows... • This matches what I know about... • Chadwick’s main purpose was to... • Overall, this source helps a historian understand...',
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
        col: '1. WHAT THE REPORT SAYS',
        text: 'Explain what the magistrates claimed about the huge crowd of 60,000 peaceful protestors, their marching, and their political banners.',
      },
      {
        col: '2. WHY WERE THEY PANICKED?',
        text: 'Explain who the magistrates were and why they were frightened: wealthy landowners terrified that a French-style revolution would happen in Britain.',
      },
      {
        col: '3. HOW USEFUL IS IT?',
        text: 'Give your judgment: is this report useful for showing why the ruling class panicked and sent armed soldiers into a peaceful crowd?',
      },
    ],
    connectives:
      'The report tells us that the crowd was... • However, the magistrates were terrified because... • This explains why they sent in the cavalry because... • Overall, the source is useful for showing...',
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
  <div class="page page-container" id="page-1" style="justify-content: center; text-align: center; padding: 25px 20px;">
    <div>
      <div style="font-family: 'Inter', sans-serif; font-size: 9.5pt; text-transform: uppercase; letter-spacing: 2px; color: #64748b; margin-bottom: 10px; font-weight: 600;">
        Meoncross School &bull; History Department
      </div>
      <h1 style="font-family: 'Playfair Display', serif; font-size: 26pt; color: #0f172a; margin: 0 0 14px 0; text-transform: uppercase; letter-spacing: 1px; line-height: 1.2;">
        Industrialisation, Empire,<br>& Power (1750–1900)
      </h1>
      <div style="font-family: 'Inter', sans-serif; font-size: 11pt; color: #1e3a8a; font-weight: 600; margin-bottom: 22px;">
        Key Stage 3 Inquiry Workbook & Disciplinary Writing Record
      </div>
      <div style="width: 100%; max-width: 480px; margin: 0 auto 25px auto; border: 1.5px solid #cbd5e1; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
        <img src="/images/imperial_federation_map.jpg" style="width: 100%; height: auto; display: block;" alt="Imperial Federation Map">
      </div>
    </div>
    
    <div style="width: 100%; max-width: 460px; margin: 0 auto; border: 1.2px solid #cbd5e1; border-radius: 6px; padding: 14px 18px; background: #f8fafc; text-align: left;">
      <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif; font-size: 8.8pt;">
        <tr>
          <td style="padding: 5px 0; color: #64748b; width: 35%;"><strong>Scholar Name:</strong></td>
          <td style="padding: 5px 0; border-bottom: 1px solid #94a3b8;"></td>
        </tr>
        <tr>
          <td style="padding: 5px 0; color: #64748b;"><strong>History Class / Set:</strong></td>
          <td style="padding: 5px 0; border-bottom: 1px solid #94a3b8;"></td>
        </tr>
        <tr>
          <td style="padding: 5px 0; color: #64748b;"><strong>History Teacher:</strong></td>
          <td style="padding: 5px 0; border-bottom: 1px solid #94a3b8;"></td>
        </tr>
        <tr>
          <td style="padding: 5px 0; color: #64748b;"><strong>Target / Working Grade:</strong></td>
          <td style="padding: 5px 0; font-weight: 700; color: #1e3a8a;">Target: [ &nbsp; &nbsp; &nbsp; ] &nbsp;&bull;&nbsp; Working: [ &nbsp; &nbsp; &nbsp; ]</td>
        </tr>
      </table>
    </div>

    <div style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #94a3b8; margin-top: 18px;">
      EDITION 2026.1 &bull; MEONCROSS HISTORY CURRICULUM BLUEPRINT
    </div>
  </div>
  `;

  // ==========================================
  // PAGE 2: PROGRESS TRACKER (Verso, Left Page)
  // ==========================================
  html += `
  <div class="page page-container" id="page-2" style="padding: 10px 0;">
    <div>
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #0f172a; padding-bottom: 5px; margin-bottom: 12px;">
        <h2 style="margin: 0; font-size: 14pt; color: #0f172a; text-transform: uppercase;">Scholar Progress & Disciplinary Writing Record</h2>
        <span class="archival-badge">PEEL Writing Record</span>
      </div>
      <p style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #475569; margin: 0 0 10px 0; line-height: 1.35;">
        Track your progress across the 6 Disciplinary Writing Genres. After each extended enquiry write-up, record your teacher feedback, effort rating, and PEEL mastery:
      </p>
      
      <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif; font-size: 8.2pt; border: 1px solid #cbd5e1;">
        <thead>
          <tr style="background: #0f172a; color: #ffffff;">
            <th style="padding: 6px 8px; text-align: left; width: 8%;">L#</th>
            <th style="padding: 6px 8px; text-align: left; width: 40%;">Inquiry Title</th>
            <th style="padding: 6px 8px; text-align: left; width: 26%;">Disciplinary Genre</th>
            <th style="padding: 6px 8px; text-align: center; width: 14%;">PEEL Mastery</th>
            <th style="padding: 6px 8px; text-align: center; width: 12%;">Effort (1–4)</th>
          </tr>
        </thead>
        <tbody>
  `;

  unitData.lessons.forEach((l, i) => {
    const cfg = lessonConfigs[i];
    html += `
          <tr style="border-bottom: 1px solid #cbd5e1; background: ${i % 2 === 0 ? '#ffffff' : '#f8fafc'};">
            <td style="padding: 5px 8px; font-weight: 700; color: #1e3a8a;">L${i + 1}</td>
            <td style="padding: 5px 8px; color: #334155;">${formatText(l.title)
              .replace(/^What powered.*?change the world\?/i, 'Energy, Coal & Fareham Ironmaster')
              .replace(
                /^Was industrial work.*?punishment\?/i,
                'Industrial Work: Progress or Punishment?',
              )}</td>
            <td style="padding: 5px 8px; font-size: 7.8pt; color: #0f172a; font-weight: 600;">${cfg.genre.replace('Genre ', 'G')}</td>
            <td style="padding: 5px 8px; text-align: center; border-left: 1px solid #cbd5e1; border-right: 1px solid #cbd5e1; font-size: 7.5pt; color: #1e3a8a; font-weight: 600;">[ P &bull; E &bull; E &bull; L ]</td>
            <td style="padding: 5px 8px; text-align: center; font-size: 7.5pt;">[ 1 &bull; 2 &bull; 3 &bull; 4 ]</td>
          </tr>
    `;
  });

  html += `
        </tbody>
      </table>
    </div>

    <div style="border: 1.2px solid #cbd5e1; border-radius: 6px; padding: 12px 14px; background: #fafaf9; margin-top: 14px;">
      <h4 style="margin: 0 0 6px 0; font-size: 9.2pt; color: #0f172a; text-transform: uppercase;">Departmental PEEL Disciplinary Writing Standards:</h4>
      <div style="font-family: 'Inter', sans-serif; font-size: 8.2pt; color: #334155; line-height: 1.45;">
        <strong>&bull; [P] Point (Clear Enquiry Claim):</strong> An authoritative, precise opening thesis statement directly answering the historical enquiry question.<br>
        <strong>&bull; [E] Evidence (Archival Data & Corroboration):</strong> Specific, named historical evidence (figures, dates, statistics, legislation) drawn directly from the facing evidence page.<br>
        <strong>&bull; [E] Explanation (Causal & Analytical Reasoning):</strong> In-depth historical reasoning using disciplinary connectives to explain <em>how</em> and <em>why</em> this factor was significant, transformative, or consequential.<br>
        <strong>&bull; [L] Link (Evaluative Verdict):</strong> A substantiated conclusion directly linking arguments back to the enquiry question and reaching a justified historical judgement.
      </div>
    </div>
  </div>
  `;

  // ==========================================
  // PAGE 3: COURSE MAP & TIMELINE (Recto, Right Page)
  // ==========================================
  html += `
  <div class="page page-container" id="page-3" style="padding: 10px 0;">
    <div>
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #0f172a; padding-bottom: 5px; margin-bottom: 12px;">
        <h2 style="margin: 0; font-size: 14pt; color: #0f172a; text-transform: uppercase;">Curriculum Roadmap & Chronological Spine</h2>
        <span class="archival-badge">1750 – 1900</span>
      </div>
      <p style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #475569; margin: 0 0 12px 0;">
        Follow Britain's dual transformation: the domestic industrial revolution at home and the expansion of imperial power abroad.
      </p>

      <!-- Visual Chronological Spine -->
      <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 15px;">
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
        <div style="display: flex; gap: 12px; align-items: flex-start; border-left: 3px solid #1e3a8a; padding-left: 10px;">
          <div style="font-family: 'Inter', sans-serif; font-size: 8.5pt; font-weight: 700; color: #1e3a8a; width: 75px; flex-shrink: 0;">${item.year}</div>
          <div>
            <strong style="font-size: 8.5pt; color: #0f172a; display: block;">${item.title}</strong>
            <span style="font-size: 8pt; color: #475569; font-family: 'Inter', sans-serif;">${item.desc}</span>
          </div>
        </div>
    `;
  });

  html += `
      </div>

      <div style="border: 1.2px solid #bae6fd; background: #f0f9ff; border-radius: 6px; padding: 10px;">
        <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0369a1; display: block; margin-bottom: 4px;">Hampshire Local History Connection:</strong>
        <p style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #334155; margin: 0; line-height: 1.35;">
          Our curriculum directly anchors national events into our local Hampshire landscape: from <strong>Henry Cort’s surviving puddling weir and slag wall at Funtley</strong>, to <strong>Fareham Red brick clay pits</strong>, and the <strong>Portsmouth Royal Navy Dockyard</strong> industrial complex.
        </p>
      </div>
    </div>

    <div style="font-family: 'Inter', sans-serif; font-size: 8.2pt; color: #64748b; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 6px;">
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
          <div style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #334155; margin-bottom: 5px; line-height: 1.35;">
            ${cfg.bridgeTask.instruction}
          </div>
    `;

    // Render task body based on type
    if (cfg.bridgeTask.type === 'draw_label') {
      html += `
          <div style="height: 360px; border: 1.5px solid #64748b; border-radius: 4px; background: #ffffff; position: relative; margin-bottom: 5px; box-sizing: border-box;"></div>
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
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 5px;">
            <div style="border: 1px solid #cbd5e1; border-radius: 4px; padding: 6px 7px; background: #f8fafc;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0369a1; display: block; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 3px;">${cfg.bridgeTask.col1Title}</strong>
              <ul style="margin: 0 0 5px 0; padding-left: 15px; font-family: 'Inter', sans-serif; font-size: 8pt; color: #475569; line-height: 1.35;">
                ${cfg.bridgeTask.col1Prompts.map((p) => `<li>${p}</li>`).join('')}
              </ul>
              <div class="task-line-dotted" style="height: 5.8mm;"></div>
              <div class="task-line-dotted" style="height: 5.8mm;"></div>
              <div class="task-line-dotted" style="height: 5.8mm;"></div>
              <div class="task-line-dotted" style="height: 5.8mm;"></div>
              <div class="task-line-dotted" style="height: 5.8mm;"></div>
              <div class="task-line-dotted" style="height: 5.8mm;"></div>
              <div class="task-line-dotted" style="height: 5.8mm;"></div>
            </div>
            <div style="border: 1px solid #cbd5e1; border-radius: 4px; padding: 6px 7px; background: #f8fafc;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #b91c1c; display: block; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 3px;">${cfg.bridgeTask.col2Title}</strong>
              <ul style="margin: 0 0 5px 0; padding-left: 15px; font-family: 'Inter', sans-serif; font-size: 8pt; color: #475569; line-height: 1.35;">
                ${cfg.bridgeTask.col2Prompts.map((p) => `<li>${p}</li>`).join('')}
              </ul>
              <div class="task-line-dotted" style="height: 5.8mm;"></div>
              <div class="task-line-dotted" style="height: 5.8mm;"></div>
              <div class="task-line-dotted" style="height: 5.8mm;"></div>
              <div class="task-line-dotted" style="height: 5.8mm;"></div>
              <div class="task-line-dotted" style="height: 5.8mm;"></div>
              <div class="task-line-dotted" style="height: 5.8mm;"></div>
              <div class="task-line-dotted" style="height: 5.8mm;"></div>
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
          ${Array(cfg.bridgeTask.lines || 8)
            .fill('<div class="task-line" style="height: 6.8mm;"></div>')
            .join('')}
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
          ${Array(cfg.bridgeTask.lines || 8)
            .fill('<div class="task-line" style="height: 6.8mm;"></div>')
            .join('')}
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
          ${Array(cfg.bridgeTask.lines || 8)
            .fill('<div class="task-line" style="height: 6.8mm;"></div>')
            .join('')}
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

        <!-- PEEL Writing Framework Strip -->
        <div style="background: #f8fafc; border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 5px 8px; margin-bottom: 6px; display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 8.2pt; color: #1e293b;">
          <span><strong style="color: #1e3a8a;">[P] Point:</strong> Clear sentence answering enquiry.</span>
          <span><strong style="color: #1e3a8a;">[E] Evidence:</strong> Specific facts from Page ${leftPageNum}.</span>
          <span><strong style="color: #1e3a8a;">[E] Explanation:</strong> Explain how and why this happened.</span>
          <span><strong style="color: #1e3a8a;">[L] Link:</strong> Link back to answer the question.</span>
        </div>

        <!-- Ruled Writing Lines (22 Clean Full-Width Lines, 7.6mm Line Height) -->
        <div style="width: 100%; margin-bottom: 6px;">
          ${Array(22).fill('<div class="task-line" style="height: 7.6mm;"></div>').join('')}
        </div>
      </div>

      <!-- Teacher Grading & Assessment Footer (PEEL Mastery) -->
      <div>
        <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 5px 8px; background: #f8fafc; display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 8.2pt; color: #334155;">
          <div>
            <strong>Teacher Assessment:</strong> &nbsp;
            Effort: [ 1 &bull; 2 &bull; 3 &bull; 4 ] &nbsp;|&nbsp; 
            Subject Knowledge: [ 1 &bull; 2 &bull; 3 &bull; 4 ] &nbsp;|&nbsp; 
            Disciplinary Analysis: [ 1 &bull; 2 &bull; 3 &bull; 4 ]
          </div>
          <div>
            <strong>PEEL Mastery:</strong> [ &nbsp; ] P &nbsp; [ &nbsp; ] E &nbsp; [ &nbsp; ] E &nbsp; [ &nbsp; ] L
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
  // PAGE 20: BACK INSIDE COVER (Knowledge Vault)
  // ==========================================
  html += `
  <div class="page page-container" id="page-20" style="padding: 10px 0;">
    <div>
      <div style="border-bottom: 2px solid #0f172a; padding-bottom: 5px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: baseline;">
        <h2 style="margin: 0; font-size: 14pt; color: #0f172a; text-transform: uppercase;">Unit Knowledge Vault & Disciplinary Command Guide</h2>
        <span class="archival-badge">Scholar Reference</span>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 12px;">
        <div style="border: 1.2px solid #cbd5e1; border-radius: 5px; padding: 8px; background: #fafaf9;">
          <h4 style="margin: 0 0 6px 0; font-size: 8.8pt; color: #0f172a; text-transform: uppercase; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px;">Key Historical Figures</h4>
          <ul style="margin: 0; padding-left: 14px; font-family: 'Inter', sans-serif; font-size: 8pt; color: #334155; line-height: 1.4;">
            <li><strong>James Watt (1736–1819):</strong> Patented the separate condenser steam engine (1769).</li>
            <li><strong>Henry Cort (1741–1800):</strong> Fareham ironmaster who invented puddling & rolling at Funtley (1783–84).</li>
            <li><strong>Isambard Kingdom Brunel (1806–1859):</strong> Engineer of Great Western Railway & SS Great Britain.</li>
            <li><strong>Edwin Chadwick (1800–1890):</strong> Author of landmark 1842 Sanitary Report.</li>
            <li><strong>Lord Shaftesbury (1801–1885):</strong> Parliamentary champion of Ten Hours Act & Coal Mines Act.</li>
            <li><strong>Henry Hunt (1773–1835):</strong> Radical orator at the 1819 St Peter’s Field rally (Peterloo).</li>
            <li><strong>Earl Grey (1764–1845):</strong> Whig Prime Minister who steered 1832 Great Reform Act.</li>
          </ul>
        </div>

        <div style="border: 1.2px solid #cbd5e1; border-radius: 5px; padding: 8px; background: #fafaf9;">
          <h4 style="margin: 0 0 6px 0; font-size: 8.8pt; color: #0f172a; text-transform: uppercase; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px;">The 6 GCSE Disciplinary Command Words</h4>
          <div style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #334155; line-height: 1.4;">
            <p style="margin: 0 0 4px 0;"><strong>1. Causal Weighting:</strong> Prioritising multiple causes into triggers vs underlying pre-conditions.</p>
            <p style="margin: 0 0 4px 0;"><strong>2. Significance:</strong> Judging historical importance using Scale, Duration, and Transformation.</p>
            <p style="margin: 0 0 4px 0;"><strong>3. Change & Continuity:</strong> Distinguishing between radical turning points and persistent continuities.</p>
            <p style="margin: 0 0 4px 0;"><strong>4. Historiographical Debate:</strong> Weighing competing academic interpretations with evidence.</p>
            <p style="margin: 0 0 4px 0;"><strong>5. Analytical Narrative:</strong> Tracing causal links across an evolving sequence of events without story-telling.</p>
            <p style="margin: 0 0 0 0;"><strong>6. Source Utility:</strong> Interrogating Content, Context, and Provenance (NOP: Nature, Origin, Purpose).</p>
          </div>
        </div>
      </div>

      <div style="border: 1.2px solid #bfdbfe; background: #eff6ff; border-radius: 5px; padding: 8px; margin-bottom: 10px;">
        <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #1e3a8a; display: block; margin-bottom: 4px;">Scholar Revision Checklist:</strong>
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; font-family: 'Inter', sans-serif; font-size: 8pt; color: #334155;">
          <div>[ &nbsp; ] Energy & Cort</div>
          <div>[ &nbsp; ] Industrial Work</div>
          <div>[ &nbsp; ] Town Slums</div>
          <div>[ &nbsp; ] British Empire</div>
          <div>[ &nbsp; ] 1857 Rebellion</div>
          <div>[ &nbsp; ] Peterloo Protest</div>
          <div>[ &nbsp; ] 1832 Reform Act</div>
          <div>[ &nbsp; ] Standard of Living</div>
        </div>
      </div>
    </div>

    <div style="text-align: center; border-top: 1px solid #e2e8f0; padding-top: 6px; font-family: 'Inter', sans-serif; font-size: 8pt; color: #94a3b8;">
      MEONCROSS SCHOOL &bull; DEPARTMENT OF HISTORY &bull; 2026 CURRICULUM EDITION &bull; 20 PAGES SADDLE-STITCHED
    </div>
  </div>
  `;

  html += `
</body>
</html>
`;
  return html;
}

module.exports = {
  buildIndustrialisationTwoPageWorkbook,
  lessonConfigs,
};
