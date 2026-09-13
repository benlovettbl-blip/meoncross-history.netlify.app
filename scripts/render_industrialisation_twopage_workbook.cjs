const fs = require('fs');
const path = require('path');

function formatText(txt) {
  if (!txt) return '';
  return txt;
}

// Bespoke Bridge Tasks and Writing Genres for each lesson
const lessonConfigs = [
  {
    // Lesson 1: Henry Cort & Energy
    genre: 'Genre 2: Historical Significance',
    genreNum: 2,
    enquiryQuestion:
      'Enquiry: How significant was Henry Cort’s puddling process to British industrial and naval supremacy?',
    structureStrip: [
      {
        col: '1. IMMEDIATE SCALE',
        text: 'Analyse how Cort’s puddling process and grooved rollers at Funtley transformed British iron output 15-fold and solved the Royal Navy’s reliance on foreign imports.',
      },
      {
        col: '2. LONG-TERM DURATION',
        text: 'Evaluate the enduring structural legacy: how cheap naval-grade wrought iron powered steam boilers, railways, and ironclad warships.',
      },
      {
        col: '3. SIGNIFICANCE VERDICT',
        text: 'Reach a substantiated verdict using Partington’s criteria (Scale, Duration, Transformation) weighing Cort against Watt and geography.',
      },
    ],
    connectives:
      'The immediate breakthrough was... • Furthermore, the enduring structural legacy... • Crucially, this transformed... • In terms of scale... • Ultimately, its significance lies in...',
    bridgeTask: {
      type: 'draw_label',
      badge: 'Technical Blueprint & Archival Anatomy',
      title:
        'Task 4: Draw & Label Henry Cort’s Reverberatory Puddling Furnace & Grooved Rollers (1784)',
      instruction:
        'Sketch Cort’s puddling process and grooved rolling mill in the canvas below. Use the faint ghost diagram as your visual anchor. You must label and annotate the 4 mandatory features.',
      ghostDiagram: `
        <div style="position: absolute; top: 12px; left: 20px; display: flex; align-items: center; gap: 10px; opacity: 0.35; pointer-events: none;">
          <div style="border: 1.2px dashed #64748b; padding: 4px 8px; border-radius: 4px; font-size: 7.5pt; text-align: center; background: #fff;">[1] Coal Hearth<br><span style="font-size: 6.5pt; color: #475569;">(Separated Fuel)</span></div>
          <div style="font-size: 10pt; color: #64748b;">➔</div>
          <div style="border: 1.2px dashed #64748b; padding: 4px 8px; border-radius: 4px; font-size: 7.5pt; text-align: center; background: #fff;">[2] Arched Roof<br><span style="font-size: 6.5pt; color: #475569;">(Bounces Heat)</span></div>
          <div style="font-size: 10pt; color: #64748b;">➔</div>
          <div style="border: 1.2px dashed #64748b; padding: 4px 8px; border-radius: 4px; font-size: 7.5pt; text-align: center; background: #fff;">[3] Puddling Basin<br><span style="font-size: 6.5pt; color: #475569;">(Stirring Molten Iron)</span></div>
          <div style="font-size: 10pt; color: #64748b;">➔</div>
          <div style="border: 1.2px dashed #64748b; padding: 4px 8px; border-radius: 4px; font-size: 7.5pt; text-align: center; background: #fff;">[4] Grooved Rollers<br><span style="font-size: 6.5pt; color: #475569;">(Squeezes Out Slag)</span></div>
        </div>
      `,
      checklist:
        '<strong>Required Annotations:</strong> ① <em>Firebox</em> (separating raw coal from metal) &bull; ② <em>Arched masonry roof</em> (reflecting heat down) &bull; ③ <em>Puddling bar</em> (worker stirring out carbon) &bull; ④ <em>Grooved rollers</em> (compressing out slag)',
      clue: '<em>Low-Floor Clue:</em> Notice how the coal fuel never touches the iron directly—only the reverberating heat melts the metal, keeping it free of brittle sulphur.',
      scholarsEdge:
        '<strong>★ Scholar’s Edge:</strong> Why did Britain’s ability to mass-produce coal-fired wrought iron give it an insurmountable naval advantage over timber-dependent France?',
    },
  },
  {
    // Lesson 2: Industrial Work
    genre: 'Genre 3: Change & Continuity',
    genreNum: 3,
    enquiryQuestion:
      'Enquiry: Was industrial work a triumph of human progress or a catastrophe of punishment for the working class?',
    structureStrip: [
      {
        col: '1. RADICAL SHIFTS',
        text: 'Analyse the profound transformation from domestic cottage autonomy to the relentless discipline of the factory clock and mechanized pacing.',
      },
      {
        col: '2. PERSISTENT CONTINUITIES',
        text: 'Examine stubborn continuities: pervasive child exploitation in Hampshire clay pits and northern mills; reliance on manual muscle.',
      },
      {
        col: '3. EXTENT OF PROGRESS',
        text: 'Reach an evaluative judgment: did higher national wealth and cheaper goods outweigh the catastrophic degradation of physical health?',
      },
    ],
    connectives:
      'A profound shift occurred in... • Yet beneath the surface... • In direct contrast to the domestic system... • Continuity persisted in... • Consequently, while material output soared...',
    bridgeTask: {
      type: 'ledger',
      badge: 'Analytical Conflict Ledger',
      title: 'Task 4: The Balance Sheet of Industrial Labour: Progress vs. Punishment',
      instruction:
        'Complete the two-column forensic ledger below, directly contrasting the factory owner’s argument for progress against the worker’s lived reality.',
      col1Title: 'The Optimist Case (Industrial Progress)',
      col1Prompts: [
        'Higher nominal cash wages compared to farm labour.',
        'Production of cheap, machine-made cotton & iron goods.',
        'Breakthroughs in steam-powered labour productivity.',
      ],
      col2Title: 'The Pessimist Case (Human Degradation)',
      col2Prompts: [
        '14-hour shifts under brutal factory clock surveillance.',
        'Child labour in Hampshire clay pits & spinning mules.',
        'Catastrophic occupational deformities & lung disease.',
      ],
      clue: '<em>Low-Floor Clue:</em> Contrast the clock tower at the mill gates against the freedom of cottage weavers taking "Saint Monday" off.',
      scholarsEdge:
        '<strong>★ Scholar’s Edge:</strong> E.P. Thompson argued that the factory system was not just an economic change, but a violent psychological assault on human nature. How far do you agree?',
    },
  },
  {
    // Lesson 3: Industrial Towns & Public Health
    genre: 'Genre 6: Source Utility & Forensic Evaluation',
    genreNum: 6,
    enquiryQuestion:
      'Enquiry: How useful is Edwin Chadwick’s 1842 Sanitary Report for investigating living conditions in Victorian industrial towns?',
    structureStrip: [
      {
        col: '1. CONTENT & KNOWLEDGE',
        text: 'Evaluate what the report accurately reveals about cesspools, typhus, and life expectancy. Corroborate with own knowledge of miasma and water pumps.',
      },
      {
        col: '2. PROVENANCE & MOTIVE (NOP)',
        text: 'Interrogate Chadwick’s nature, origin, and purpose: an official Benthamite reformer determined to shock Parliament into sanitary spending.',
      },
      {
        col: '3. UTILITY VERDICT',
        text: 'Reach a substantiated judgment: explain why deliberate exaggeration or statistical shock value actually increases its historical utility.',
      },
    ],
    connectives:
      'The source is exceptionally useful because... • This is directly corroborated by... • However, Chadwick’s motive was deliberately to... • Consequently, its utility is heightened because...',
    bridgeTask: {
      type: 'source_utility',
      badge: 'Archival Forensic Interrogation',
      title:
        'Task 4: Interrogating Chadwick’s 1842 Report on the Sanitary Condition of the Labouring Population',
      sourceText:
        '“The annual loss of life from filth and bad ventilation are greater than the loss from death or wounds in any modern war. In the cellar dwellings of Manchester and Leeds, human excrement oozes through walls, and whole families sleep upon damp dung. The average age at death of the working class in Manchester is 17 years, compared to 38 years for the rural gentry.”',
      instruction:
        '1. Underline the shocking statistical comparison Chadwick uses to provoke Parliament.<br>2. In the lines below, explain why an historian must consider Chadwick’s utilitarian motive when judging the accuracy of these figures:',
      lines: 5,
      clue: '<em>Low-Floor Clue:</em> Notice the comparison between industrial disease and military warfare—why would a government official frame it this way?',
      scholarsEdge:
        '<strong>★ Scholar’s Edge:</strong> How did the persistent belief in the "miasma theory" (bad air) both motivate sanitary reform and delay the scientific eradication of waterborne cholera?',
    },
  },
  {
    // Lesson 4: The British Empire
    genre: 'Genre 1: Causal Weighting & Prioritisation',
    genreNum: 1,
    enquiryQuestion:
      'Enquiry: Was the expansion of the British Empire primarily driven by naval military power or commercial profit?',
    structureStrip: [
      {
        col: '1. FACTOR 1: NAVAL SUPREMACY',
        text: 'Argue that the Royal Navy (dockyards at Portsmouth, global coaling stations, global blockades) provided the indispensable military backbone.',
      },
      {
        col: '2. FACTOR 2: COMMERCIAL CAPITAL',
        text: 'Argue that chartered monopolies (East India Company), transatlantic triangular trade profits, and merchant capital drove conquest.',
      },
      {
        col: '3. RELATIVE WEIGHTING',
        text: 'Reach a definitive verdict: did military might enable commercial trade, or did mercantile profit finance naval supremacy?',
      },
    ],
    connectives:
      'On one hand, naval supremacy was the primary driver because... • Crucially, this was demonstrated by... • Conversely, commercial capital acted as the true catalyst... • Ultimately, naval power was merely the instrument, whereas...',
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
      lines: 4,
      clue: '<em>Low-Floor Clue:</em> Think about what happened to British trading posts whenever the Royal Navy lost control of the English Channel or Atlantic.',
      scholarsEdge:
        '<strong>★ Scholar’s Edge:</strong> Did the British Empire acquire its global territories through a coherent grand strategy, or "in a fit of absence of mind" (Sir John Seeley)?',
    },
  },
  {
    // Lesson 5: 1857 Indian Rebellion
    genre: 'Genre 5: Analytical Narrative',
    genreNum: 5,
    enquiryQuestion:
      'Enquiry: Explain the sequence of events that transformed a military mutiny in Meerut into the 1857 Indian Rebellion.',
    structureStrip: [
      {
        col: '1. PRECONDITION & TRIGGER',
        text: 'Analyse how long-term annexation grievances (Doctrine of Lapse) and religious fears were ignited by the Enfield rifle cartridge crisis.',
      },
      {
        col: '2. ESCALATING SPREAD',
        text: 'Explain the critical pivot: the march to Delhi, the restoration of Bahadur Shah II, and the widespread civilian uprisings across Awadh.',
      },
      {
        col: '3. OUTCOME & LEGACY',
        text: 'Explain the decisive resolution: brutal British military suppression, the dismantling of the EIC, and direct Victorian Crown rule (1858).',
      },
    ],
    connectives:
      'The initial crisis was precipitated by... • This immediately escalated when... • The decisive turning point occurred with... • Consequently, this compelled the British Crown to...',
    bridgeTask: {
      type: 'source_utility',
      badge: 'Archival Forensic Interrogation',
      title: 'Task 4: Interrogating the Rebel Motivation: The 1857 Azamgarh Proclamation',
      sourceText:
        '“Both Hindus and Muslims are being ruined under the tyranny and oppression of the treacherous English. The British have subverted our religion, impoverished our artisans with foreign machine goods, and dispossessed our ancient landed nobility. Arise, then, and rally under the Imperial banner to defend your faith and ancestral lands!”',
      instruction:
        '1. Underline the economic and religious grievances listed by the rebel leadership.<br>2. In the lines below, explain what this proclamation reveals about the diverse groups uniting against British rule:',
      lines: 5,
      clue: '<em>Low-Floor Clue:</em> Look at who is addressed—is this just soldiers complaining about rifle grease, or something much broader?',
      scholarsEdge:
        '<strong>★ Scholar’s Edge:</strong> Why did British colonial authorities deliberately label the 1857 conflict a "Sepoy Mutiny" rather than a war of national independence?',
    },
  },
  {
    // Lesson 6: Working Class Protest & Peterloo
    genre: 'Genre 6: Source Utility & Forensic Evaluation',
    genreNum: 6,
    enquiryQuestion:
      'Enquiry: How useful is the Manchester Magistrates’ official report for an enquiry into the events of the Peterloo Massacre (1819)?',
    structureStrip: [
      {
        col: '1. CONTENT & KNOWLEDGE',
        text: 'Evaluate what the report claims about the size, discipline, and banners of the 60,000 crowd at St Peter’s Field. Corroborate with the Corn Laws.',
      },
      {
        col: '2. PROVENANCE & MOTIVE (NOP)',
        text: 'Interrogate the magistrates’ perspective: wealthy Tory landowners terrified of a British Jacobin revolution following the Napoleonic Wars.',
      },
      {
        col: '3. UTILITY VERDICT',
        text: 'Reach a substantiated judgment: how the magistrates’ terrified exaggerations make the report invaluable for understanding elite paranoia.',
      },
    ],
    connectives:
      'The magistrate report is highly useful because it demonstrates... • This panic was rooted in the historical reality of... • However, the magistrates’ motive was explicitly to justify... • Paradoxically, this bias increases its utility by revealing...',
    bridgeTask: {
      type: 'ledger',
      badge: 'Analytical Conflict Ledger',
      title:
        'Task 4: The Crucible of Class Conflict: Reformers vs. The Manchester Magistrates (1819)',
      instruction:
        'Contrast the stated aims of the peaceful working-class crowd against the paranoid fears of the ruling elite at St Peter’s Field.',
      col1Title: 'The Peaceful Reformers (Henry Hunt)',
      col1Prompts: [
        'Repeal of the hated 1815 Corn Laws causing starvation.',
        'Universal male suffrage & annual parliaments.',
        'Dressed in Sunday best; women & children present.',
      ],
      col2Title: 'The Manchester Magistrates (Elite Panic)',
      col2Prompts: [
        'Terror of a violent French-style Jacobin revolution.',
        'Suspicion of marching drill & revolutionary liberty caps.',
        'Immediate panic reading of the Riot Act & cavalry charge.',
      ],
      clue: '<em>Low-Floor Clue:</em> Why were British landowners so petrified of mass gatherings in 1819, just 4 years after the defeat of Napoleon?',
      scholarsEdge:
        '<strong>★ Scholar’s Edge:</strong> How did the British government’s passage of the repressive "Six Acts" in 1819 delay democracy while making future reform inevitable?',
    },
  },
  {
    // Lesson 7: The 1832 Great Reform Act
    genre: 'Genre 1: Causal Weighting & Prioritisation',
    genreNum: 1,
    enquiryQuestion:
      'Enquiry: Why was the Great Reform Act passed in 1832? Was it conceded out of fear of revolution or granted as a principled reform?',
    structureStrip: [
      {
        col: '1. FACTOR 1: FEAR OF REVOLUTION',
        text: 'Analyse popular violence from below: the Swing Riots, burning of Nottingham Castle, Bristol riots, and the "Days of May" run on the banks.',
      },
      {
        col: '2. FACTOR 2: WHIG SELF-PRESERVATION',
        text: 'Analyse elite strategy from above: Earl Grey’s goal to "reform in order to preserve", enfranchising the middle class to divide them from workers.',
      },
      {
        col: '3. RELATIVE WEIGHTING',
        text: 'Reach a definitive verdict: would Parliament ever have passed the Act without the imminent threat of violent civil war?',
      },
    ],
    connectives:
      'The overriding catalyst was the imminent threat of revolution because... • This was vividly illustrated by... • On the other hand, Whig politicians strategically sought to... • Ultimately, the Reform Act was conceded not out of democratic principle, but...',
    bridgeTask: {
      type: 'causal_pivot',
      badge: 'Causal Pivot & Catalyst Chain',
      title: 'Task 4: The 1832 Reform Crisis: From Rotten Boroughs to Compromise',
      steps: [
        {
          stage: '1. The Stagnation',
          year: '1830',
          text: 'Rotten boroughs like Old Sarum (3 houses, 2 MPs) hold power, while Birmingham has 0 MPs.',
        },
        {
          stage: '2. The Catalyst',
          year: '1831',
          text: 'The House of Lords rejects the Reform Bill, sparking mass riots in Bristol and Nottingham.',
        },
        {
          stage: '3. The Turning Point',
          year: 'May 1832',
          text: 'The "Days of May": Reformers demand "Stop the Duke, go for Gold", crashing bank reserves.',
        },
        {
          stage: '4. The Concession',
          year: 'June 1832',
          text: 'King William IV threatens to create 50 Whig peers; the Lords surrender and pass the Act.',
        },
      ],
      prompt:
        'In 3–4 sentences, explain why the threat of financial panic ("Go for Gold") and civil war forced the aristocracy to concede the vote to the middle class:',
      lines: 4,
      clue: '<em>Low-Floor Clue:</em> What would happen to the wealthy landowners if the British banking system completely collapsed?',
      scholarsEdge:
        '<strong>★ Scholar’s Edge:</strong> Did the 1832 Great Reform Act represent the birth of British democracy, or a cynical aristocratic masterstroke that entrenched property rule?',
    },
  },
  {
    // Lesson 8: Capstone Synoptic Evaluation
    genre: 'Genre 4: Historiographical Debate (Capstone Essay)',
    genreNum: 4,
    enquiryQuestion:
      'Enquiry: Who truly benefited from the Industrial Revolution? Evaluate the competing claims of the Optimists and the Pessimists.',
    structureStrip: [
      {
        col: '1. THE OPTIMIST INTERPRETATION',
        text: 'Present the argument of Hartwell & Macaulay: rising real wages, consumer goods, life-saving sanitation, and the elimination of famine.',
      },
      {
        col: '2. THE PESSIMIST INTERPRETATION',
        text: 'Present the argument of Hobsbawm & Thompson: catastrophic slum degradation, alienation of labour, colonial drain, and surging inequality.',
      },
      {
        col: '3. SUBSTANTIATED ADJUDICATION',
        text: 'Reach a mature synoptic verdict: weigh short-term generational catastrophe against long-term structural human progress.',
      },
    ],
    connectives:
      'Optimist historians contend that... • As evidenced by the dramatic expansion of... • Conversely, pessimist historians demonstrate that... • This critique is reinforced by... • In the final analysis, while the short-term reality was...',
    bridgeTask: {
      type: 'ledger',
      badge: 'Historiographical Synthesis Ledger',
      title: 'Task 4: The Great Standard of Living Debate: Optimists vs. Pessimists',
      instruction:
        'Complete the historiographical audit below, synthesizing the strongest historical evidence supporting each academic school of thought.',
      col1Title: 'The Optimist School (e.g. T.S. Ashton, R.M. Hartwell)',
      col1Prompts: [
        'Cheaper mass-produced clothing, soap, tea & railway travel.',
        'Eventual rise in real wages after 1850; Factory Act protections.',
        'Foundation of modern democratic institutions and medical science.',
      ],
      col2Title: 'The Pessimist School (e.g. E.J. Hobsbawm, E.P. Thompson)',
      col2Prompts: [
        'Brutal destruction of traditional artisan communities and dignity.',
        'Catastrophic urban squalor, stunted children, and cholera deaths.',
        'Enormous private fortunes accumulated through colonial exploitation.',
      ],
      clue: '<em>Low-Floor Clue:</em> Distinguish between what happened to the first generation of factory workers (1780–1830) versus their grandchildren (after 1860).',
      scholarsEdge:
        '<strong>★ Scholar’s Edge:</strong> Is it historically valid to justify forty years of working-class misery and colonial suffering by pointing to the modern high living standards that eventually followed?',
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
      height: 267mm;
      max-height: 267mm;
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
      height: 7.2mm;
      width: 100%;
      box-sizing: border-box;
    }
    .task-line-dotted {
      border-bottom: 1px dotted #94a3b8;
      height: 6.5mm;
      width: 100%;
      box-sizing: border-box;
    }
    .archival-badge {
      font-family: 'Inter', sans-serif;
      font-size: 7pt;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      padding: 2px 6px;
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
  <div class="page page-container" id="page-1" style="justify-content: center; text-align: center; padding: 30px 20px;">
    <div>
      <div style="font-family: 'Inter', sans-serif; font-size: 9pt; text-transform: uppercase; letter-spacing: 2px; color: #64748b; margin-bottom: 10px;">
        Meoncross School &bull; History Department
      </div>
      <h1 style="font-family: 'Playfair Display', serif; font-size: 26pt; color: #0f172a; margin: 0 0 15px 0; text-transform: uppercase; letter-spacing: 1px; line-height: 1.2;">
        Industrialisation, Empire,<br>& Power (1750–1900)
      </h1>
      <div style="font-family: 'Inter', sans-serif; font-size: 11pt; color: #1e3a8a; font-weight: 600; margin-bottom: 25px;">
        Key Stage 3 Inquiry Workbook & Disciplinary Writing Record
      </div>
      <div style="width: 100%; max-width: 480px; margin: 0 auto 30px auto; border: 1.5px solid #cbd5e1; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
        <img src="/images/imperial_federation_map.jpg" style="width: 100%; height: auto; display: block;" alt="Imperial Federation Map">
      </div>
    </div>
    
    <div style="width: 100%; max-width: 450px; margin: 0 auto; border: 1.2px solid #cbd5e1; border-radius: 6px; padding: 15px; background: #f8fafc; text-align: left;">
      <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif; font-size: 9pt;">
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
          <td style="padding: 5px 0; color: #64748b;"><strong>Academic Target Band:</strong></td>
          <td style="padding: 5px 0; font-weight: 700; color: #1e3a8a;">Bronze (4) &bull; Silver (5-6) &bull; Gold (7-9)</td>
        </tr>
      </table>
    </div>

    <div style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #94a3b8; margin-top: 20px;">
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
        <h2 style="margin: 0; font-size: 14pt; color: #0f172a; text-transform: uppercase;">Scholar Progress & Writing Tracker</h2>
        <span class="archival-badge">Mastery Milestones</span>
      </div>
      <p style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #475569; margin: 0 0 10px 0;">
        Track your progress across the 6 Disciplinary Writing Genres. After each extended essay, record your awarded milestone band (Bronze, Silver, Gold) and teacher target:
      </p>
      
      <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif; font-size: 8pt; border: 1px solid #cbd5e1;">
        <thead>
          <tr style="background: #0f172a; color: #ffffff;">
            <th style="padding: 6px 8px; text-align: left; width: 8%;">L#</th>
            <th style="padding: 6px 8px; text-align: left; width: 42%;">Inquiry Title</th>
            <th style="padding: 6px 8px; text-align: left; width: 25%;">Disciplinary Genre</th>
            <th style="padding: 6px 8px; text-align: center; width: 10%;">Milestone</th>
            <th style="padding: 6px 8px; text-align: center; width: 15%;">Effort (1–4)</th>
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
            <td style="padding: 5px 8px; font-size: 7.5pt; color: #0f172a; font-weight: 600;">${cfg.genre.replace('Genre ', 'G')}</td>
            <td style="padding: 5px 8px; text-align: center; border-left: 1px solid #cbd5e1; border-right: 1px solid #cbd5e1;">[ &nbsp; &nbsp; ]</td>
            <td style="padding: 5px 8px; text-align: center;">[ 1 &bull; 2 &bull; 3 &bull; 4 ]</td>
          </tr>
    `;
  });

  html += `
        </tbody>
      </table>
    </div>

    <div style="border: 1.2px solid #cbd5e1; border-radius: 6px; padding: 10px; background: #fafaf9; margin-top: 15px;">
      <h4 style="margin: 0 0 6px 0; font-size: 9pt; color: #0f172a; text-transform: uppercase;">The 3 Writing Milestones Explained:</h4>
      <div style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #334155; line-height: 1.4;">
        <strong>&bull; Bronze (Accessible Milestone / Grade 4–5):</strong> Complete 1 structured PEEL paragraph using the evidence gathered from Page 1. Clearly states claim, historical fact, and direct causal explanation (8–10 lines).<br>
        <strong>&bull; Silver (Standard Milestone / Grade 6–7):</strong> Complete 2 balanced paragraphs comparing competing factors using causal connectives (<em>Consequently, However, This directly triggered</em>) (14–16 lines).<br>
        <strong>&bull; Gold (Scholarship Milestone / Grade 8–9):</strong> Full multi-paragraph essay reaching a substantiated, evaluative verdict using the historical criteria (Scale, Duration, Transformation, NOP) (18–20 lines).
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
            <span style="font-size: 7.8pt; color: #475569; font-family: 'Inter', sans-serif;">${item.desc}</span>
          </div>
        </div>
    `;
  });

  html += `
      </div>

      <div style="border: 1.2px solid #bae6fd; background: #f0f9ff; border-radius: 6px; padding: 10px;">
        <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0369a1; display: block; margin-bottom: 4px;">Hampshire Local History Connection:</strong>
        <p style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #334155; margin: 0;">
          Our curriculum directly anchors national events into our local Hampshire landscape: from <strong>Henry Cort’s surviving puddling weir and slag wall at Funtley</strong>, to <strong>Fareham Red brick clay pits</strong>, and the <strong>Portsmouth Royal Navy Dockyard</strong> industrial complex.
        </p>
      </div>
    </div>

    <div style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #64748b; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 6px;">
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
        <!-- Lesson Header (Compact) -->
        <div style="border-bottom: 2px solid #1e3a8a; padding-bottom: 4px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: flex-end;">
          <div>
            <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; text-transform: uppercase; letter-spacing: 1px; color: #64748b; font-weight: 600;">
              Unit 4: Industrialisation &bull; Lesson ${lIdx + 1}
            </div>
            <h2 style="font-family: 'Playfair Display', serif; font-size: 13pt; color: #0f172a; margin: 2px 0 0 0; line-height: 1.2;">
              L${lIdx + 1}: ${formatText(lesson.title)}
            </h2>
          </div>
          <span class="archival-badge" style="background: #eff6ff; color: #1e3a8a; border-color: #bfdbfe; flex-shrink: 0;">Evidence Launch</span>
        </div>

        <!-- Learning Objectives (Compact 3-bullets) -->
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 4px 8px; margin-bottom: 8px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.5pt; text-transform: uppercase; color: #475569; letter-spacing: 0.5px; display: block; margin-bottom: 2px;">Core Learning Objectives:</strong>
          <ul style="margin: 0; padding-left: 14px; font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #334155; line-height: 1.3;">
    `;
    (lesson.learning_objectives.scaffolded || []).slice(0, 3).forEach((obj) => {
      html += `<li>${formatText(obj)}</li>`;
    });
    html += `
          </ul>
        </div>

        <!-- Do Now Retrieval Grid (2x2 Compact) -->
        <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 6px 8px; margin-bottom: 8px; background: #ffffff;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 3px; margin-bottom: 5px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.5pt; text-transform: uppercase; letter-spacing: 0.5px; color: #0f172a;">Do Now: Spaced Retrieval Grid</strong>
            <span style="font-size: 6.8pt; color: #64748b; font-family: 'Inter', sans-serif;">Prior Units & Recall</span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px;">
    `;
    const doNowItems = lesson.do_now && lesson.do_now.items ? lesson.do_now.items.slice(0, 4) : [];
    const doNowLabels = [
      '1. Last Lesson',
      '2. Two Lessons Ago',
      '3. Prior Unit (Medieval/Tudor)',
      '4. Big Picture / Chronology',
    ];
    doNowItems.forEach((dn, dnIdx) => {
      html += `
            <div style="border: 1px solid #e2e8f0; border-radius: 3px; padding: 4px 6px; background: #fafaf9;">
              <strong style="font-size: 7pt; color: #1e3a8a; display: block; font-family: 'Inter', sans-serif;">${doNowLabels[dnIdx] || `Q${dnIdx + 1}`}:</strong>
              <div style="font-size: 7.2pt; color: #1e293b; margin: 1px 0 3px 0; line-height: 1.2; font-family: 'Inter', sans-serif;">${dn.question}</div>
              <div class="task-line-dotted" style="height: 4.5mm;"></div>
              <div class="task-line-dotted" style="height: 4.5mm;"></div>
            </div>
      `;
    });
    html += `
          </div>
        </div>

        <!-- Key Vocabulary Check (2 Terms) -->
        <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 5px 8px; margin-bottom: 8px; background: #fdfbf7;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.5pt; text-transform: uppercase; color: #0f172a;">Disciplinary Vocabulary Mastery</strong>
            <span style="font-size: 6.8pt; color: #854d0e; font-family: 'Inter', sans-serif; font-weight: 600;">Dual-Term Check</span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px;">
    `;
    const vocabSlice = (lesson.vocab || []).slice(0, 2);
    vocabSlice.forEach((v) => {
      html += `
            <div style="border: 1px solid #e2e8f0; border-radius: 3px; padding: 3px 5px; background: #ffffff;">
              <strong style="font-size: 7.5pt; color: #b45309; font-family: 'Inter', sans-serif;">${v.term}:</strong>
              <span style="font-size: 7pt; color: #475569; font-family: 'Inter', sans-serif;"> ${v.definition}</span>
            </div>
      `;
    });
    html += `
          </div>
        </div>

        <!-- TASK 4: THE PREPARATION BRIDGE TASK (~85-95mm) -->
        <div style="border: 1.5px solid #0f172a; border-radius: 5px; padding: 7px 9px; background: #ffffff; margin-bottom: 4px;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.2px solid #0f172a; padding-bottom: 3px; margin-bottom: 5px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #0f172a; text-transform: uppercase;">${cfg.bridgeTask.title}</strong>
            <span class="archival-badge" style="background: #0f172a; color: #ffffff; border: none;">The Preparation Bridge</span>
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #334155; margin-bottom: 5px; line-height: 1.3;">
            ${cfg.bridgeTask.instruction}
          </div>
    `;

    // Render task body based on type
    if (cfg.bridgeTask.type === 'draw_label') {
      html += `
          <div style="height: 145px; border: 1.5px dashed #94a3b8; border-radius: 4px; background: #fafaf9; position: relative; margin-bottom: 5px; box-sizing: border-box;">
            ${cfg.bridgeTask.ghostDiagram}
            <div style="position: absolute; bottom: 4px; right: 6px; font-family: 'Inter', sans-serif; font-size: 6.5pt; text-transform: uppercase; color: #94a3b8; letter-spacing: 0.5px;">Technical Drawing & Label Canvas</div>
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 7pt; color: #1e293b; background: #f1f5f9; padding: 3px 6px; border-radius: 3px; margin-bottom: 4px;">
            ${cfg.bridgeTask.checklist}
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b; margin-bottom: 4px;">
            ${cfg.bridgeTask.clue}
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 7.2pt; color: #1e3a8a; font-style: italic; border-top: 1px dotted #cbd5e1; padding-top: 3px;">
            ${cfg.bridgeTask.scholarsEdge}
          </div>
      `;
    } else if (cfg.bridgeTask.type === 'ledger') {
      html += `
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 5px;">
            <div style="border: 1px solid #cbd5e1; border-radius: 4px; padding: 5px; background: #f8fafc;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #0369a1; display: block; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 3px;">${cfg.bridgeTask.col1Title}</strong>
              <ul style="margin: 0 0 4px 0; padding-left: 12px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #475569;">
                ${cfg.bridgeTask.col1Prompts.map((p) => `<li>${p}</li>`).join('')}
              </ul>
              <div class="task-line-dotted" style="height: 5mm;"></div>
              <div class="task-line-dotted" style="height: 5mm;"></div>
              <div class="task-line-dotted" style="height: 5mm;"></div>
            </div>
            <div style="border: 1px solid #cbd5e1; border-radius: 4px; padding: 5px; background: #f8fafc;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #b91c1c; display: block; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 3px;">${cfg.bridgeTask.col2Title}</strong>
              <ul style="margin: 0 0 4px 0; padding-left: 12px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #475569;">
                ${cfg.bridgeTask.col2Prompts.map((p) => `<li>${p}</li>`).join('')}
              </ul>
              <div class="task-line-dotted" style="height: 5mm;"></div>
              <div class="task-line-dotted" style="height: 5mm;"></div>
              <div class="task-line-dotted" style="height: 5mm;"></div>
            </div>
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b; margin-bottom: 3px;">
            ${cfg.bridgeTask.clue}
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 7.2pt; color: #1e3a8a; font-style: italic; border-top: 1px dotted #cbd5e1; padding-top: 2px;">
            ${cfg.bridgeTask.scholarsEdge}
          </div>
      `;
    } else if (cfg.bridgeTask.type === 'source_utility') {
      html += `
          <div style="border: 1px solid #cbd5e1; border-left: 3px solid #1e3a8a; background: #fdfbf7; padding: 5px 8px; font-size: 7.5pt; font-style: italic; color: #1e293b; margin-bottom: 5px; line-height: 1.35;">
            ${cfg.bridgeTask.sourceText}
          </div>
          ${Array(cfg.bridgeTask.lines || 5)
            .fill('<div class="task-line" style="height: 6.5mm;"></div>')
            .join('')}
          <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b; margin-top: 4px; margin-bottom: 2px;">
            ${cfg.bridgeTask.clue}
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 7.2pt; color: #1e3a8a; font-style: italic; border-top: 1px dotted #cbd5e1; padding-top: 2px;">
            ${cfg.bridgeTask.scholarsEdge}
          </div>
      `;
    } else if (cfg.bridgeTask.type === 'metric_table') {
      html += `
          <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif; font-size: 7pt; margin-bottom: 5px; border: 1px solid #cbd5e1;">
            <thead>
              <tr style="background: #f1f5f9; color: #0f172a;">
                ${cfg.bridgeTask.tableHeaders.map((h) => `<th style="padding: 3px 5px; text-align: left; border: 1px solid #cbd5e1;">${h}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${cfg.bridgeTask.rows
                .map(
                  (r) => `
                <tr>
                  <td style="padding: 3px 5px; font-weight: 700; border: 1px solid #cbd5e1; width: 22%;">${r[0]}</td>
                  <td style="padding: 3px 5px; border: 1px solid #cbd5e1; width: 39%;">${r[1]}</td>
                  <td style="padding: 3px 5px; border: 1px solid #cbd5e1; width: 39%;">${r[2]}</td>
                </tr>
              `,
                )
                .join('')}
            </tbody>
          </table>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #1e293b; margin-bottom: 2px;">
            <strong>Synthesis:</strong> ${cfg.bridgeTask.prompt}
          </div>
          ${Array(cfg.bridgeTask.lines || 4)
            .fill('<div class="task-line" style="height: 6.5mm;"></div>')
            .join('')}
          <div style="font-family: 'Georgia', serif; font-size: 7.2pt; color: #1e3a8a; font-style: italic; border-top: 1px dotted #cbd5e1; padding-top: 2px; margin-top: 3px;">
            ${cfg.bridgeTask.scholarsEdge}
          </div>
      `;
    } else if (cfg.bridgeTask.type === 'causal_pivot') {
      html += `
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px; margin-bottom: 5px;">
            ${cfg.bridgeTask.steps
              .map(
                (s) => `
              <div style="border: 1px solid #bae6fd; background: #f0f9ff; border-radius: 3px; padding: 3px 4px; font-family: 'Inter', sans-serif;">
                <span style="font-size: 6.5pt; font-weight: 700; color: #0369a1; display: block;">${s.stage} (${s.year})</span>
                <span style="font-size: 6.6pt; color: #1e293b; line-height: 1.2; display: block;">${s.text}</span>
              </div>
            `,
              )
              .join('')}
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #1e293b; margin-bottom: 2px;">
            <strong>Causal Analysis:</strong> ${cfg.bridgeTask.prompt}
          </div>
          ${Array(cfg.bridgeTask.lines || 4)
            .fill('<div class="task-line" style="height: 6.5mm;"></div>')
            .join('')}
          <div style="font-family: 'Georgia', serif; font-size: 7.2pt; color: #1e3a8a; font-style: italic; border-top: 1px dotted #cbd5e1; padding-top: 2px; margin-top: 3px;">
            ${cfg.bridgeTask.scholarsEdge}
          </div>
      `;
    }

    html += `
        </div>
      </div>

      <!-- Left Page Footer -->
      <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #94a3b8; display: flex; justify-content: space-between; border-top: 1px solid #e2e8f0; padding-top: 3px;">
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
        <!-- Enquiry Question Header Banner -->
        <div style="background: #0f172a; color: #ffffff; border-radius: 5px; padding: 8px 12px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="font-family: 'Inter', sans-serif; font-size: 7pt; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; font-weight: 600;">
              Independent Historical Argument &bull; ${cfg.genre}
            </div>
            <h3 style="font-family: 'Playfair Display', serif; font-size: 11pt; color: #ffffff; margin: 2px 0 0 0; line-height: 1.25;">
              ${cfg.enquiryQuestion}
            </h3>
          </div>
          <span class="archival-badge" style="background: #1e293b; color: #38bdf8; border-color: #0284c7; flex-shrink: 0;">Extended Writing</span>
        </div>

        <!-- Bespoke Disciplinary Structure Strip (3-Columns) -->
        <div style="border: 1.2px solid #cbd5e1; border-radius: 5px; padding: 6px 8px; background: #f8fafc; margin-bottom: 6px;">
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; margin-bottom: 4px;">
            ${cfg.structureStrip
              .map(
                (s) => `
              <div style="border: 1px solid #e2e8f0; border-radius: 3px; padding: 4px 6px; background: #ffffff;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #1e3a8a; display: block; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px; margin-bottom: 2px;">${s.col}</strong>
                <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #334155; line-height: 1.25; display: block;">${s.text}</span>
              </div>
            `,
              )
              .join('')}
          </div>
          
          <div style="border-top: 1px dashed #cbd5e1; padding-top: 3px; display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 6.8pt;">
            <span style="color: #475569;"><strong>Academic Connective Bank:</strong> ${cfg.connectives}</span>
          </div>
        </div>

        <!-- Writing Milestones Banner (Bronze, Silver, Gold) -->
        <div style="background: #fafaf9; border: 1px solid #d6d3d1; border-radius: 4px; padding: 3px 8px; margin-bottom: 8px; display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #44403c;">
          <span><strong>Bronze Target (8–10 lines):</strong> 1 complete PEEL paragraph using evidence from Page ${leftPageNum}.</span>
          <span><strong>Silver (14–16 lines):</strong> 2 balanced paragraphs with connectives.</span>
          <span style="color: #854d0e; font-weight: 600;"><strong>Gold (18–20 lines):</strong> Sustained evaluative verdict using criteria.</span>
        </div>

        <!-- Ruled Writing Lines (19 Clean Full-Width Lines) -->
        <div style="width: 100%; margin-bottom: 6px;">
          ${Array(19).fill('<div class="task-line" style="height: 7.6mm;"></div>').join('')}
        </div>
      </div>

      <!-- Teacher Grading & Assessment Footer -->
      <div>
        <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 4px 8px; background: #f8fafc; display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #334155;">
          <div>
            <strong>Teacher Assessment:</strong> &nbsp;
            Effort: [ 1 &bull; 2 &bull; 3 &bull; 4 ] &nbsp;|&nbsp; 
            Subject Knowledge: [ 1 &bull; 2 &bull; 3 &bull; 4 ] &nbsp;|&nbsp; 
            Disciplinary Analysis: [ 1 &bull; 2 &bull; 3 &bull; 4 ]
          </div>
          <div>
            <strong>Milestone Achieved:</strong> [ &nbsp; ] Bronze &nbsp; [ &nbsp; ] Silver &nbsp; [ &nbsp; ] Gold
          </div>
        </div>
        
        <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #94a3b8; display: flex; justify-content: space-between; border-top: 1px solid #e2e8f0; padding-top: 3px; margin-top: 3px;">
          <span>Enquiry Write-Up &bull; ${cfg.genre}</span>
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
          <h4 style="margin: 0 0 6px 0; font-size: 8.5pt; color: #0f172a; text-transform: uppercase; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px;">Key Historical Figures</h4>
          <ul style="margin: 0; padding-left: 14px; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #334155; line-height: 1.4;">
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
          <h4 style="margin: 0 0 6px 0; font-size: 8.5pt; color: #0f172a; text-transform: uppercase; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px;">The 6 GCSE Disciplinary Command Words</h4>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #334155; line-height: 1.4;">
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
        <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #1e3a8a; display: block; margin-bottom: 4px;">Scholar Revision Checklist:</strong>
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; font-family: 'Inter', sans-serif; font-size: 7pt; color: #334155;">
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

    <div style="text-align: center; border-top: 1px solid #e2e8f0; padding-top: 6px; font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #94a3b8;">
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
