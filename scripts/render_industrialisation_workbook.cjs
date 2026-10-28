const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');
const puppeteer = require('puppeteer');

const ROOT_DIR = path.resolve(__dirname, '..');

function getBase64Image(relPath) {
  if (!relPath) return null;
  const clean = relPath.replace(/^\//, '');
  const candidates = [
    path.join(ROOT_DIR, 'public', clean),
    path.join(ROOT_DIR, clean),
    path.join(ROOT_DIR, 'public', 'images', path.basename(clean)),
    path.join(ROOT_DIR, 'images', path.basename(clean)),
  ];

  for (const cand of candidates) {
    if (fs.existsSync(cand) && fs.statSync(cand).isFile()) {
      const ext = path.extname(cand).toLowerCase();
      let mime = 'image/jpeg';
      if (ext === '.png') mime = 'image/png';
      else if (ext === '.webp') mime = 'image/webp';
      else if (ext === '.svg') mime = 'image/svg+xml';
      const buf = fs.readFileSync(cand);
      return `data:${mime};base64,${buf.toString('base64')}`;
    }
  }
  return null;
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

// ============================================================================
// 5 Dedicated Industrialisation, Empire & Power Enquiry Configurations
// Gold-Standard Christine Counsell 5-Act Decimal Standard
// ============================================================================
const enquiryConfigs = [
  {
    lessonNum: 1,
    id: 'lesson_1',
    title: 'Enquiry 1: The Iron & Steam Revolution: Henry Cort & Funtley Works',
    enquiryQuestion:
      'How did Henry Cort’s breakthrough at Funtley Ironworks transform Britain into an industrial and naval superpower?',
    specAnchor:
      'Energy transition from wood and charcoal to coal; James Watt’s rotary steam engine (1769–1781); Henry Cort at Funtley Ironworks, Fareham (1775–1784); puddling furnace & grooved rolling mill; Admiralty naval trials at Portsmouth Royal Dockyard (1787); ending dependence on Baltic Orgrounds iron.',
    stages: [
      {
        step: 1,
        date: '1750–1770',
        paraRef: '[1.1]',
        questionHeading:
          'Why was Britain’s early iron industry crippled by charcoal and timber shortages?',
        bullets: [
          'Deforestation of English Oaks',
          'Brittle Impure Pig Iron',
          'Dependence on Swedish Imports',
        ],
        focusClue:
          'Why was Britain forced to import expensive wrought iron from Sweden and Russia for Royal Navy warships?',
      },
      {
        step: 2,
        date: '1769–1781',
        paraRef: '[1.2]',
        questionHeading:
          'How did James Watt’s rotary steam engine revolutionise heavy industrial manufacturing?',
        bullets: [
          'Separate Condenser Efficiency',
          'Rotary Shaft Motion',
          'Liberation from River Valleys',
        ],
        focusClue:
          'How did Watt’s steam engine enable continuous, heavy mechanical manufacturing far from seasonal river valleys?',
      },
      {
        step: 3,
        date: '1775–1784',
        paraRef: '[1.3]',
        questionHeading:
          'How did Henry Cort’s puddling furnace at Funtley chemically refine molten iron?',
        bullets: [
          'Reverberatory Furnace Chamber',
          'Stirring Molten Decarburisation',
          'Eliminating Harmful Sulphur',
        ],
        focusClue:
          'How did keeping pig iron separate from burning coal prevent sulfur contamination and burn away brittle impurities?',
      },
      {
        step: 4,
        date: '1783–1784',
        paraRef: '[1.4]',
        questionHeading:
          'Why were Cort’s patented grooved rollers fifteen times faster than traditional trip hammers?',
        bullets: [
          'Mechanical Grooved Cylinders',
          'Squeezing Out Slag Impurities',
          'Uniform Naval Bar Production',
        ],
        focusClue:
          'Why did squeezing spongy iron blooms between heavy grooved rollers produce tougher, standardized naval iron?',
      },
      {
        step: 5,
        date: '1787',
        paraRef: '[1.5]',
        questionHeading:
          'How did the Portsmouth Dockyard naval trials confirm Cort’s triumph for the Royal Navy?',
        bullets: [
          'Admiralty Smith Forge Tests',
          'Shatter-Resistant Anchors',
          'Complete Naval Independence',
        ],
        focusClue:
          'Why did Admiralty master smiths declare Funtley iron superior to the finest Swedish imports for His Majesty’s Fleet?',
      },
    ],
    vocabPrompt:
      'Define <strong>Wrought Iron</strong> and explain why Cort’s puddling process at Funtley was vital for Royal Navy warships:',
    rightPage: {
      type: 'single_12',
      tariff: 'Question 2: Explain Why [12 marks &bull; 15 mins]',
      examStem:
        'Explain why Henry Cort achieved his metallurgical breakthrough in wrought iron production at Funtley in 1784. [12 marks]',
      stimulus: [
        'The urgent naval demand for tough iron from Portsmouth Royal Dockyard',
        'The innovative combination of the puddling furnace and grooved rollers',
      ],
      connectives:
        'A decisive factor was... &bull; Furthermore, this was significant because... &bull; On the other hand, another important factor was... &bull; In conclusion, the main reason why...',
      wordBank:
        'Henry Cort &bull; Funtley Ironworks &bull; River Meon &bull; puddling furnace &bull; grooved rollers &bull; wrought iron &bull; Portsmouth Dockyard &bull; Royal Navy &bull; naval self-sufficiency',
      timelineMissionTitle: 'Timeline Task &bull; pp. 8–9',
      timelineMission:
        '<strong>Milestones 1 &amp; 2 (1784–1787):</strong> Choose <strong>(A) Creative Sketch:</strong> Funtley puddling furnace stirring molten iron beside River Meon, or Admiralty master smiths testing naval anchors at Portsmouth [🔥 reverberatory furnace &bull; 🥄 puddling rod &bull; ⚓ naval anchor] &bull; OR &bull; <strong>(B) Mind Map:</strong> "Iron Revolution at Funtley" (1784 Cort puddling furnace &amp; grooved rollers, Portsmouth Dockyard trials, domestic wrought iron self-sufficiency)',
    },
    leftPageQuip:
      'Fareham ironmaster Henry Cort produced the tough wrought iron that built the Royal Navy’s fighting ships right here along the River Meon.',
    rightPageQuip:
      'Without Henry Cort’s Funtley ironworks, Britain would have had no iron warships, no railway revolution, and no industrial supremacy.',
  },
  {
    lessonNum: 2,
    id: 'lesson_2',
    title: 'Enquiry 2: Factory Work & Child Labour: Progress or Punishment?',
    enquiryQuestion:
      'Was industrial factory work a triumph of productive progress or a system of child exploitation?',
    specAnchor:
      'The factory system; textile mills; transition from the domestic system; factory clock, overtime & draconian fines; child labour (piecers and scavengers); physical hazards and unguarded machinery; 1832 Sadler Committee; Matthew Crabtree testimony; 1833 Factory Act & four factory inspectors; limits of legislative reform.',
    stages: [
      {
        step: 1,
        date: '1780–1820',
        paraRef: '[2.1]',
        questionHeading:
          'How did the factory system displace traditional domestic craft production?',
        bullets: [
          'Domestic Home Handlooms',
          'Centralised Steam Factories',
          'Relentless Machine Speed',
        ],
        focusClue:
          'Why did steam-powered textile mills force artisan weavers to abandon home cottages for centralized urban factories?',
      },
      {
        step: 2,
        date: '1800–1830',
        paraRef: '[2.2]',
        questionHeading:
          'How did the factory clock and draconian fines enforce strict industrial discipline?',
        bullets: [
          'Rigid Fourteen-Hour Shifts',
          'Pence-Deduction Lateness Fines',
          'Choking Dust & Locked Doors',
        ],
        focusClue:
          'Why did mill owners impose strict fines for opening windows, whistling, or being two minutes late to work?',
      },
      {
        step: 3,
        date: '1810–1832',
        paraRef: '[2.3]',
        questionHeading:
          'Why were pauper apprentice children systematically exploited in northern textile mills?',
        bullets: [
          'Workhouse Apprentice Trafficking',
          'Crawling Under Spinning Mules',
          'Crushed Fingers & Hair Scalpings',
        ],
        focusClue:
          'Why did factory masters employ tiny children as piecers and scavengers beneath fast-moving, unguarded spinning mules?',
      },
      {
        step: 4,
        date: '1832',
        paraRef: '[2.4]',
        questionHeading:
          'What shocking physical abuses did Matthew Crabtree reveal to the Sadler Committee?',
        bullets: [
          'Sixteen-Hour Daily Fatigue',
          'Overlooker Leather Strap Beatings',
          'Permanent Spinal Stunting',
        ],
        focusClue:
          'How did 22-year-old former child worker Matthew Crabtree prove that mill labour caused permanent bodily deformity?',
      },
      {
        step: 5,
        date: '1833',
        paraRef: '[2.5]',
        questionHeading:
          'How did the 1833 Factory Act introduce the first legal regulation of child labour?',
        bullets: [
          'Ban on Children Under Nine',
          'Eight-Hour Workday Limits',
          'Four Statutory Factory Inspectors',
        ],
        focusClue:
          'Why did the appointment of four government inspectors establish the precedent of state intervention in private factories?',
      },
    ],
    vocabPrompt:
      'Define <strong>The Factory System</strong> and explain why mill owners enforced rigid clockwork discipline:',
    rightPage: {
      type: 'split',
      partA: {
        tariff: 'Question 1: Describe Two Features [4 marks &bull; 5 mins]',
        badge: 'FEATURE DRILL',
        question:
          'Describe two features of working conditions for child labourers in Victorian textile mills. [4 marks]',
        stems:
          'One key feature was... &bull; Specifically, this involved... &bull; A second key feature was... &bull; For example, this meant that...',
      },
      partB: {
        tariff: 'Question 2: Explain One Consequence [4 marks &bull; 5 mins]',
        badge: 'STRUCTURED WRITING',
        question:
          'Explain one consequence of the 1833 Factory Act for working children in Britain. [4 marks]',
        hint: 'Focus on how banning work for children under nine and creating government inspectors established state regulation of private factory conditions.',
        stems:
          'One consequence was that... &bull; Specifically, this meant that... &bull; This affected child workers because... &bull; As a result, factory masters...',
        connectives:
          'One key consequence was that... &bull; For example, this meant that... &bull; This directly led to... &bull; As a result...',
        wordBank:
          'Factory Act (1833) &bull; child piecers &bull; textile mills &bull; eight-hour day &bull; factory inspectors &bull; Sadler Committee &bull; state regulation',
      },
      timelineMissionTitle: 'Timeline Task &bull; pp. 8–9',
      timelineMission:
        '<strong>Milestone 5 (1832):</strong> Choose <strong>(A) Creative Sketch:</strong> Child piecer crawling beneath whirring textile spinning mules while commissioners take notes [🧵 spinning mule &bull; 👶 child piecer &bull; 📋 Sadler report] &bull; OR &bull; <strong>(B) Mind Map:</strong> "Factory Work &amp; Child Labour" (14-hour workdays &amp; mill discipline, 1832 Sadler Committee evidence, 1833 Factory Act establishing state inspection)',
    },
    leftPageQuip:
      'Child piecers in northern textile mills often walked up to thirty miles a day between spinning frames.',
    rightPageQuip:
      'The 1833 Factory Act established the revolutionary legal principle that the state has a duty to protect vulnerable children from industrial exploitation.',
  },
  {
    lessonNum: 3,
    id: 'lesson_3',
    title: 'Enquiry 3: Urban Slums & Public Health: Did Towns Become Unlivable?',
    enquiryQuestion:
      'Did rapid industrial urbanisation create an unlivable catastrophe of disease and filth for British workers?',
    specAnchor:
      'Explosive urban demographic growth (Manchester, Leeds, Birmingham); back-to-back housing & damp cellar dwellings; shared privies, nightsoil heaps & water contamination; 1831–1854 cholera epidemics; miasma theory vs contagion; Edwin Chadwick’s 1842 Sanitary Report; Dr John Snow & 1854 Broad Street water pump; 1858 Great Stink of the River Thames; Sir Joseph Bazalgette’s London interceptor sewer network.',
    stages: [
      {
        step: 1,
        date: '1800–1830',
        paraRef: '[3.1]',
        questionHeading:
          'How did explosive urban population growth create deadly back-to-back slums?',
        bullets: [
          'Unregulated Speculative Building',
          'Windowless Shared Party Walls',
          'Flooded Earthen Cellars',
        ],
        focusClue:
          'Why did cities grow tenfold without building regulations, trapping working families in airless, lightless brick courts?',
      },
      {
        step: 2,
        date: '1830–1840',
        paraRef: '[3.2]',
        questionHeading:
          'Why did primitive sanitation turn working-class courts into festering cesspools?',
        bullets: [
          'Shared Privy Overflow',
          'Towering Nightsoil Dunghills',
          'Seeping Groundwater Wells',
        ],
        focusClue:
          'How did hundreds of residents sharing a single open privy contaminate the shallow pump wells used for daily drinking water?',
      },
      {
        step: 3,
        date: '1831–1848',
        paraRef: '[3.3]',
        questionHeading:
          'Why did terrifying cholera epidemics shatter complacent beliefs in laissez-faire?',
        bullets: [
          'Waterborne Bacterial Agony',
          'Blue-Skinned Twelve-Hour Collapse',
          'Terrified Wealthy Elites',
        ],
        focusClue:
          'Why did sudden cholera outbreaks killing thousands in days force Victorian authorities to confront public squalor?',
      },
      {
        step: 4,
        date: '1842',
        paraRef: '[3.4]',
        questionHeading:
          'How did Edwin Chadwick’s 1842 Report prove that filth caused disease and premature death?',
        bullets: [
          'Statistical Lifespan Comparison',
          'Nineteen-Year Manchester Average',
          'Economic Cost of Epidemics',
        ],
        focusClue:
          'How did Chadwick use mortality statistics to prove that dirty water and rotting sewage cost taxpayers more than building sewers?',
      },
      {
        step: 5,
        date: '1858–1865',
        paraRef: '[3.5]',
        questionHeading:
          'How did the 1858 Great Stink compel Parliament to fund Joseph Bazalgette’s sewers?',
        bullets: [
          'Midsummer Thames Fermentation',
          'Commons Chloride Curtains',
          'Bazalgette Interceptor Tunnels',
        ],
        focusClue:
          'Why did Parliament pass sewer legislation in eighteen days only after toxic river stench invaded the House of Commons?',
      },
    ],
    vocabPrompt:
      'Define <strong>Back-to-Back Housing</strong> and explain why rapid urbanisation created catastrophic sanitary hazards:',
    rightPage: {
      type: 'split',
      partA: {
        tariff: 'Question 1: Describe Two Features [4 marks &bull; 5 mins]',
        badge: 'FEATURE DRILL',
        question:
          'Describe two features of back-to-back housing in 19th-century industrial towns. [4 marks]',
        stems:
          'One key feature was... &bull; Specifically, this meant that... &bull; A second key feature was... &bull; For instance, this involved...',
      },
      partB: {
        tariff: 'Question 2: Explain One Consequence [4 marks &bull; 5 mins]',
        badge: 'STRUCTURED WRITING',
        question:
          'Explain one consequence of the 1858 Great Stink for public health in Victorian London. [4 marks]',
        hint: 'Focus on how the intolerable stench of the River Thames forced Parliament to fund Joseph Bazalgette’s monumental underground interceptor sewer network.',
        stems:
          'One consequence was that... &bull; Specifically, this meant that... &bull; This affected public health because... &bull; As a result, waterborne disease...',
        connectives:
          'One key consequence was that... &bull; For example, this meant that... &bull; This directly led to... &bull; As a result...',
        wordBank:
          'Great Stink (1858) &bull; River Thames &bull; Joseph Bazalgette &bull; interceptor sewers &bull; cholera &bull; Edwin Chadwick &bull; public health',
      },
      timelineMissionTitle: 'Timeline Task &bull; pp. 8–9',
      timelineMission:
        '<strong>Milestone 7 (1858):</strong> Choose <strong>(A) Creative Sketch:</strong> Muddy steaming Thames beside Parliament with politicians holding noses, or Bazalgette’s arched brick interceptor tunnels [🏛️ Westminster &bull; 👃 soaked curtains &bull; 🧱 underground brick sewer] &bull; OR &bull; <strong>(B) Mind Map:</strong> "Slums, Cholera &amp; Sewers" (deadly back-to-back housing cesspools, Chadwick 1842 report &amp; John Snow 1854 pump, 1858 Great Stink &amp; 82 miles of Bazalgette sewers)',
    },
    leftPageQuip:
      'During the 1832 cholera epidemic, life expectancy for labourers in industrial Manchester dropped to just 19 years.',
    rightPageQuip:
      'Sir Joseph Bazalgette’s 82 miles of underground brick interceptor sewers permanently banished waterborne cholera from London.',
  },
  {
    lessonNum: 4,
    id: 'lesson_4',
    title: 'Enquiry 4: Blood, Machines & Ballots: Radical Protest & The Swing Riots',
    enquiryQuestion:
      'Why did British workers turn to machine-breaking and secret oaths to resist starvation and oppression?',
    specAnchor:
      'Post-Napoleonic economic distress & 1815 Corn Laws; Luddite machine-breaking raids (1811–1816); Peterloo Massacre at St Peter’s Field, Manchester (1819); Yeomanry cavalry sabre charge & repressive Six Acts; 1830 Hampshire Swing Riots in the Meon Valley (Selborne, Headley, Fareham); threshing machine destruction & rick-burning; Winchester Special Assizes trials & Australian penal transportation; 1834 Tolpuddle Martyrs & unlawful secret oaths.',
    stages: [
      {
        step: 1,
        date: '1811–1816',
        paraRef: '[4.1]',
        questionHeading:
          'Why did textile croppers and knitters turn to nocturnal machine-breaking under "General Ludd"?',
        bullets: [
          'Powerloom Wage Collapses',
          'Sledgehammer Midnight Raids',
          'Capital Frame-Breaking Act',
        ],
        focusClue:
          'Why did skilled handloom weavers destroy automated spinning frames that slashed their wages and made craft skills worthless?',
      },
      {
        step: 2,
        date: 'Aug 1819',
        paraRef: '[4.2]',
        questionHeading:
          'Why did the Peterloo Massacre ignite widespread working-class fury against the state?',
        bullets: [
          'Peaceful St Peter’s Field Crowd',
          'Manchester Yeomanry Sabre Charge',
          'Repressive Tory Six Acts',
        ],
        focusClue:
          'Why did magistrates order cavalry to charge 60,000 peaceful cotton workers listening to orator Henry Hunt in Manchester?',
      },
      {
        step: 3,
        date: 'Nov 1830',
        paraRef: '[4.3]',
        questionHeading:
          'How did the "Captain Swing" riots sweep through Hampshire and the Meon Valley?',
        bullets: [
          'Starvation Winter Destitution',
          'Sledgehammer Threshing Destruction',
          'Nocturnal Hayrick Arson',
        ],
        focusClue:
          'Why did starving farm labourers in Selborne and the Meon Valley smash threshing machines that stole their winter wages?',
      },
      {
        step: 4,
        date: 'Dec 1830',
        paraRef: '[4.4]',
        questionHeading:
          'How brutally did the Winchester Special Assizes punish Hampshire machine-breakers?',
        bullets: [
          'Winchester Great Hall Trials',
          'Micheldever Youth Execution',
          'Australian Penal Transportation',
        ],
        focusClue:
          'Why did the British state impose draconian death and transportation sentences on 101 Hampshire agricultural workers?',
      },
      {
        step: 5,
        date: '1834',
        paraRef: '[4.5]',
        questionHeading:
          'Why did the harsh punishment of the Tolpuddle Martyrs provoke a national outcry?',
        bullets: [
          'Friendly Society Mutual Aid',
          'Obscure Secret Oaths Law',
          'Massive London Protest Marches',
        ],
        focusClue:
          'Why did sentencing six peaceful Dorset farm labourers to Australian exile spark the first national trade union solidarity movement?',
      },
    ],
    vocabPrompt:
      'Define <strong>Captain Swing</strong> and explain why agricultural workers across Hampshire turned to machine-breaking in 1830:',
    rightPage: {
      type: 'split',
      partA: {
        tariff: 'Question 1: Describe Two Features [4 marks &bull; 5 mins]',
        badge: 'FEATURE DRILL',
        question: 'Describe two features of the 1830 Hampshire Swing Riots. [4 marks]',
        stems:
          'One key feature was... &bull; Specifically, this involved... &bull; A second key feature was... &bull; For example, this meant that...',
      },
      partB: {
        tariff: 'Question 2: Narrative Account [8 marks &bull; 10 mins]',
        badge: 'STRUCTURED WRITING',
        question:
          'Write a narrative account analysing the key events leading from the Peterloo Massacre (1819) and Hampshire Swing Riots (1830) to the Tolpuddle Martyrs (1834). [8 marks]',
        stimulus: [
          'The cavalry charge at St Peter’s Field, Manchester (1819)',
          'The destruction of threshing machines across Hampshire (1830)',
        ],
        connectives:
          'The sequence began when... &bull; This led to conflict because... &bull; A decisive turning point occurred when... &bull; As a result, this culminated in...',
        wordBank:
          'Peterloo (1819) &bull; Six Acts &bull; Hampshire Swing Riots (1830) &bull; threshing machines &bull; Winchester Assizes &bull; Tolpuddle Martyrs (1834) &bull; penal transportation &bull; trade unions',
      },
      timelineMissionTitle: 'Timeline Task &bull; pp. 8–9',
      timelineMission:
        '<strong>Milestones 3 &amp; 4 (1819 &amp; 1830):</strong> Choose <strong>(A) Creative Sketch:</strong> Yeomanry cavalry charging unarmed cotton workers at Peterloo, or Hampshire farm labourers smashing a threshing machine under Captain Swing [🏇 sabre cavalry &bull; 🔨 heavy sledgehammer &bull; 🌾 shattered threshing drum] &bull; OR &bull; <strong>(B) Mind Map:</strong> "Radical Protest &amp; Repression" (1819 Peterloo Massacre &amp; Six Acts, 1830 Hampshire Swing Riots across Meon Valley, Winchester Assizes 101 transported)',
    },
    leftPageQuip:
      'At the 1830 Winchester Assizes, 19-year-old Henry Cook of Micheldever was hanged for striking a magistrate’s hat during the Swing Riots.',
    rightPageQuip:
      'The public outrage over the Tolpuddle Martyrs forced the British government to grant full royal pardons within two years.',
  },
  {
    lessonNum: 5,
    id: 'lesson_5',
    title: 'Enquiry 5: The Road to Democracy: Rotten Boroughs to the Secret Ballot',
    enquiryQuestion:
      'How did the British people dismantle the corrupt unreformed parliament to win democratic rights?',
    specAnchor:
      'The unreformed House of Commons; rotten boroughs (Old Sarum, Dunwich, Newtown); industrial disenfranchisement (Manchester, Birmingham, Leeds); 1831–1832 Reform crisis & Bristol riots; "Days of May" run on the Bank of England; 1832 Great Reform Act (£10 borough qualification & 56 abolished rotten boroughs); working-class exclusion & betrayal; open-air hustings & landlord intimidation; 1838–1848 People’s Charter & three monster petitions; 1872 Ballot Act at Pontefract; incremental enfranchisement (1867 & 1884 Acts).',
    stages: [
      {
        step: 1,
        date: '1800–1830',
        paraRef: '[5.1]',
        questionHeading:
          'Why was Britain’s unreformed parliamentary system condemned as a corrupt oligarchy?',
        bullets: [
          'Under-Five-Percent Electorate',
          'Old Sarum & Newtown Rotten Boroughs',
          'Unrepresented Industrial Cities',
        ],
        focusClue:
          'Why did uninhabited grassy mounds send two MPs to Westminster while industrial powerhouses like Manchester had zero?',
      },
      {
        step: 2,
        date: '1831–1832',
        paraRef: '[5.2]',
        questionHeading:
          'How did public rebellion and economic panic force the passage of the 1832 Great Reform Act?',
        bullets: [
          'Bristol Reform Riots & Fires',
          '"Days of May" Bank Run Gold Panic',
          'Tory House of Lords Surrender',
        ],
        focusClue:
          'Why was the middle-class run on the Bank of England ("Stop the Duke, Go for Gold!") more terrifying than street riots?',
      },
      {
        step: 3,
        date: '1832',
        paraRef: '[5.3]',
        questionHeading:
          'Which industrial cities were granted MPs, and why did workers call the Act the "Great Betrayal"?',
        bullets: [
          'Manchester, Birmingham & Leeds MPs',
          'Ten-Pound Property Qualification',
          'Deliberate Working-Class Exclusion',
        ],
        focusClue:
          'How did Earl Grey "reform in order to preserve", enfranchising the wealthy middle class while locking out working men?',
      },
      {
        step: 4,
        date: '1838–1848',
        paraRef: '[5.4]',
        questionHeading:
          'How did the Chartist movement unite millions of workers behind the Six Points?',
        bullets: [
          'Universal Male Suffrage & Secret Ballot',
          'Abolition of Property Requirements',
          'Three Mammoth Rejected Petitions',
        ],
        focusClue:
          'How did William Lovett and Feargus O’Connor mobilize millions of signatures demanding salaries for working MPs?',
      },
      {
        step: 5,
        date: '1872',
        paraRef: '[5.5]',
        questionHeading:
          'How did the 1872 Secret Ballot Act at Pontefract destroy landlord political coercion?',
        bullets: [
          'Abolition of Public Hustings',
          'Private Booths & Liquorice Wax Seals',
          'Freedom from Landlord Eviction',
        ],
        focusClue:
          'Why did casting votes in private booths prevent factory bosses and landowners from intimidating working voters?',
      },
    ],
    vocabPrompt:
      'Define <strong>Rotten Borough</strong> and explain why the 1832 Great Reform Act was seen as a historic breakthrough by the middle class:',
    rightPage: {
      type: 'single_12',
      tariff: 'Question 3: Evaluative Statement Essay [12 marks &bull; 15 mins]',
      examStem:
        '“The 1832 Great Reform Act was passed because the ruling aristocracy feared violent revolution, rather than from a desire for democratic justice.” How far do you agree with this statement? Explain your answer. [12 marks]',
      stimulus: [
        'The burning of Bristol and the "Days of May" run on the Bank of England (1831–1832)',
        'Earl Grey’s £10 property qualification deliberately excluding the working class',
      ],
      rubricCards: [
        {
          col: '1. FEAR OF ARMED REVOLUTION',
          text: 'Explain how the Bristol riots, the burning of Nottingham Castle, and the £1.5m gold bank run terrified ruling elites into passing reform.',
        },
        {
          col: '2. ARISTOCRATIC COMPROMISE',
          text: 'Explain how Earl Grey standardized the £10 franchise to attach the wealthy middle class to the constitution while shutting out working men.',
        },
        {
          col: '3. COMPARATIVE VERDICT',
          text: 'Weigh whether the Act was a reluctant aristocratic concession to preserve oligarchy or a vital stepping stone toward democracy.',
        },
      ],
      connectives:
        'A central argument is that... &bull; In particular, this mattered because... &bull; On the other hand, an alternative perspective is... &bull; In conclusion, the decisive reason was...',
      wordBank:
        'Earl Grey &bull; Great Reform Act (1832) &bull; rotten boroughs &bull; Old Sarum &bull; Manchester &amp; Birmingham &bull; £10 property qualification &bull; Bristol riots &bull; Days of May &bull; People’s Charter &bull; Secret Ballot (1872)',
      timelineMissionTitle: 'Timeline Task &bull; pp. 8–9',
      timelineMission:
        '<strong>Milestones 6 &amp; 8 (1832 &amp; 1872):</strong> Choose <strong>(A) Creative Sketch:</strong> Earl Grey presenting the 1832 Reform roll granting Manchester seats, or voter in private wooden booth dropping wax-sealed ballot [📜 1832 Reform roll &bull; 🏭 Manchester chimney &bull; 🗳️ locked metal ballot box] &bull; OR &bull; <strong>(B) Mind Map:</strong> "Road to Democracy" (1832 Great Reform Act abolishing 56 rotten boroughs, Chartist People’s Charter petitions, 1872 Secret Ballot Act at Pontefract)',
    },
    leftPageQuip:
      'Before 1832, Old Sarum was an empty mound that sent two MPs to Parliament, while industrial Manchester had zero.',
    rightPageQuip:
      'The 1872 Secret Ballot Act at Pontefract permanently ended open-air hustings and landlord intimidation in British elections.',
  },
];

// ============================================================================
// HELPER RENDERERS
// ============================================================================
function renderFooterStrip(pageNum, quip, totalPages = 16) {
  const isEven = pageNum % 2 === 0;
  const isCover = pageNum === 1 || pageNum === totalPages;
  const borderColor = isCover ? '#0f284e' : '#000000';
  const textColor = isCover ? '#0f284e' : '#000000';

  if (isEven) {
    return `
      <div class="page-footer-strip" style="border-top: 0.8px solid ${borderColor};">
        <span class="footer-page-num" style="margin-right: 8px; color: ${textColor};">${pageNum}/${totalPages}</span>
        <span class="footer-quip" style="text-align: right; flex: 1; color: ${textColor};">${quip}</span>
      </div>`;
  } else {
    return `
      <div class="page-footer-strip" style="border-top: 0.8px solid ${borderColor};">
        <span class="footer-quip" style="text-align: left; flex: 1; margin-right: 8px; color: ${textColor};">${quip}</span>
        <span class="footer-page-num" style="color: ${textColor};">${pageNum}/${totalPages}</span>
      </div>`;
  }
}

// Helper to render a dedicated Lined Notes Page with margin (Pages 14 & 15 of 16-page workbook)
function renderNotesPage(pageNum, quip) {
  const isEven = pageNum % 2 === 0;
  const pageClass = isEven ? 'verso-page' : 'recto-page';

  // 32 ruled lines for standard ~8mm pitch filling the page perfectly
  const numLines = 32;
  let linesHtml = '';
  for (let i = 0; i < numLines; i++) {
    linesHtml += `          <div class="note-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>\n`;
  }

  return `
  <!-- PAGE ${pageNum}: NOTES PAGE (MONOCHROME REPROGRAPHICS) -->
  <div class="page page-container ${pageClass}" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Notes Header -->
      <div style="border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 5px;">
        <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 13pt; color: #000000; text-transform: uppercase; font-weight: 900; letter-spacing: 0.5px;">
          Notes &bull; Revision &amp; Assessment Planning
        </h2>
      </div>

      <!-- Ruled Lined Canvas with Left Margin (Exercise Book Standard) -->
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0; position: relative; border-top: 1.2px solid #000000; margin-bottom: 4px;">
        <!-- Vertical Margin Line (26mm from left edge of lines) - British Exercise Book Red Margin -->
        <div style="position: absolute; top: 0; bottom: 0; left: 26mm; width: 1.5px; background: #dc2626; z-index: 2;"></div>
        
        <!-- Ruled Horizontal Lines (Standard 8mm school pitch, flex-filled) -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0;">
${linesHtml}        </div>
      </div>

      ${renderFooterStrip(pageNum, quip, 16)}
    </div>
  </div>`;
}

// ============================================================================
// LEFT PAGE RENDERER: 5-STAGE CHRONOLOGICAL INQUIRY SPINE (STRICTLY MONOCHROME)
// ============================================================================
function renderSpinePage(cfg, pageNum) {
  const stagesHtml = cfg.stages
    .map((st) => {
      // 3 Spaced-out trigger terms, each aligned with pure #000000 contrast
      const bulletsHtml = st.bullets
        .map(
          (b, idx) => `
            <div style="flex: 1; display: flex; align-items: center; padding: 0 5px; ${idx < 2 ? 'border-bottom: 0.8px solid #000000;' : ''}">
              <div style="display: flex; align-items: flex-start; gap: 4px; line-height: 1.18;">
                <span style="font-weight: 900; color: #000000; font-size: 7pt; line-height: 1.3;">&bull;</span>
                <span style="font-family: 'Inter', sans-serif; font-size: 8.8pt; font-weight: 800; color: #000000; word-break: break-word;">${b}</span>
              </div>
            </div>`,
        )
        .join('');
      return `
        <div class="spine-stage-block" style="display: flex; flex-direction: column; flex: 1; min-height: 0; margin-bottom: 2.5px; border: 1.2px solid #000000; border-radius: 2px; overflow: hidden; background: #ffffff;">
          
          <!-- Full-Width Banner with Key Question Across Page (Strict Single-Line Fit) -->
          <div class="stage-banner" style="background: #000000; color: #ffffff; padding: 2px 7px; display: flex; align-items: center; border-bottom: 1.2px solid #000000; min-height: 20px; box-sizing: border-box;">
            <div style="display: flex; align-items: center; gap: 6px; min-width: 0; flex: 1; overflow: hidden;">
              <span style="background: #ffffff; color: #000000; font-family: 'Inter', sans-serif; font-size: 8.2pt; font-weight: 900; padding: 0.6px 6px; border-radius: 2px; white-space: nowrap; flex-shrink: 0;">
                ${st.step}
              </span>
              ${st.paraRef ? `<span style="background: #222222; color: #ffffff; border: 1px solid #ffffff; font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 800; padding: 0.5px 4px; border-radius: 2px; white-space: nowrap; flex-shrink: 0;">${st.paraRef}</span>` : ''}
              <span style="font-family: 'Inter', sans-serif; font-size: 8.4pt; font-weight: 800; color: #ffffff; white-space: nowrap; flex-shrink: 0;">
                ${st.date}
              </span>
              <span style="color: #ffffff; font-size: 7.5pt; flex-shrink: 0;">&bull;</span>
              <span style="font-family: 'Inter', sans-serif; font-size: 9.2pt; font-weight: 800; color: #ffffff; white-space: nowrap; overflow: hidden; letter-spacing: -0.1px;">
                ${st.questionHeading}
              </span>
            </div>
          </div>

          <!-- Content Row: Left 3-Zone Trigger Spine (44mm) & Right Ruled Writing Lines (~154mm) -->
          <div style="display: flex; flex: 1; min-height: 0; align-items: stretch;">
            
            <!-- Left Column: High-Visibility 44mm Trigger Spine (Pure White Canvas, Zero Grey Dithering) -->
            <div style="width: 44mm; flex-shrink: 0; background: #ffffff; display: flex; flex-direction: column; border-right: 1.2px solid #000000; box-sizing: border-box;">
              ${bulletsHtml}
            </div>

            <!-- Right Column: 6 Ruled Note-Taking Lines (Expanded Writing Space) -->
            <div style="flex: 1; display: flex; flex-direction: column; background: #ffffff; margin: 0; padding: 0;">
              <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
            </div>

          </div>
        </div>`;
    })
    .join('');

  const isEven = pageNum % 2 === 0;
  const pageClass = isEven ? 'verso-page' : 'recto-page';

  return `
  <!-- LESSON SPREAD: ${isEven ? 'LEFT PAGE (VERSO)' : 'RIGHT PAGE (RECTO)'} • CHRONOLOGICAL INQUIRY SPINE (MONOCHROME) -->
  <div class="page page-container ${pageClass}" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      
      <!-- Lesson Header with Inquiry Question Title (Expanded for High Legibility) -->
      <div style="border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 4px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 8.4pt; font-weight: 900; letter-spacing: 0.5px; text-transform: uppercase; background: #000000; color: #ffffff; border: 1.2px solid #000000; padding: 2px 8px; border-radius: 2px;">
            ENQUIRY ${cfg.lessonNum} &bull; LESSON NOTEBOOK
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 8.2pt; font-weight: 800; text-transform: uppercase; color: #000000;">
            YEAR 8 &bull; INDUSTRIALISATION, EMPIRE &amp; POWER (1750–1901)
          </span>
        </div>
        <h2 style="font-family: 'Playfair Display', serif; font-size: 13.0pt; color: #000000; margin: 2px 0 2px 0; font-weight: 900; line-height: 1.22;">
          ${cfg.enquiryQuestion}
        </h2>
      </div>

      <!-- Chronological Inquiry Spine & Note-Taking Canvas -->
      <div style="flex: 1; display: flex; flex-direction: column; min-height: 0; margin-top: 1px;">
        <div style="display: flex; flex-direction: column; flex: 1; min-height: 0; gap: 0;">
          ${stagesHtml}
        </div>
      </div>

      ${renderFooterStrip(pageNum, cfg.leftPageQuip, 16)}
    </div>
  </div>`;
}

// ============================================================================
// RIGHT PAGE RENDERER: ROTATING DISCIPLINARY SKILLS WRITING (STRICTLY MONOCHROME)
// ============================================================================
function renderRightPage(cfg, pageNum) {
  const rp = cfg.rightPage;
  const isEven = pageNum % 2 === 0;
  const pageClass = isEven ? 'verso-page' : 'recto-page';

  if (rp.type === 'single_12') {
    // 12-MARK EVALUATIVE ESSAY WRITING
    return `
  <!-- LESSON SPREAD: ${isEven ? 'LEFT PAGE (VERSO)' : 'RIGHT PAGE (RECTO)'} • 12-MARK EXTENDED ESSAY (MONOCHROME) -->
  <div class="page page-container ${pageClass}" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Exam Header -->
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 5px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 12.0pt; color: #000000; margin: 0; font-weight: 900;">
          ${rp.tariff}
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 8.2pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; background: #000000; color: #ffffff; padding: 2px 7px; border-radius: 2px;">
          Extended Writing Practice
        </span>
      </div>

      <!-- Question Stem & Stimulus Box -->
      <div style="border: 1px solid #000000; border-left: 3.5px solid #000000; border-radius: 3px; padding: 5px 9px; background: #ffffff; margin-bottom: 5px;">
        <div style="font-family: 'Playfair Display', serif; font-size: 11.6pt; font-weight: 900; color: #000000; margin-bottom: 4px; line-height: 1.3;">
          ${rp.examStem}
        </div>
        <div style="display: flex; align-items: center; gap: 8px; font-family: 'Inter', sans-serif; font-size: 8.2pt; color: #000000;">
          <strong style="color: #000000;">Stimulus:</strong>
          <span style="border: 1.2px solid #000000; padding: 2px 8px; border-radius: 2px; font-weight: 800; color: #000000; background: #ffffff;">${rp.stimulus[0]}</span>
          <span style="border: 1.2px solid #000000; padding: 2px 8px; border-radius: 2px; font-weight: 800; color: #000000; background: #ffffff;">${rp.stimulus[1]}</span>
          <span style="font-style: italic; color: #000000;">(You must also use information of your own)</span>
        </div>
      </div>

      <!-- Connectives & Key Vocabulary Bank -->
      <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 5px 9px; background: #ffffff; margin-bottom: 6px; display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
        <div>
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; font-weight: 900; text-transform: uppercase; display: block; margin-bottom: 2px; color: #000000;">Analytical Connectives:</strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 8.6pt; font-style: italic; line-height: 1.26; display: block; color: #000000;">${rp.connectives}</span>
        </div>
        <div>
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; font-weight: 900; text-transform: uppercase; display: block; margin-bottom: 2px; color: #000000;">Key Vocabulary Bank:</strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 8.6pt; line-height: 1.26; display: block; color: #000000;">${rp.wordBank}</span>
        </div>
      </div>

      <!-- Ruled Writing Lines (21 Lines for 12-Mark Extended Essay) -->
      <div style="font-family: 'Inter', sans-serif; font-size: 8.2pt; font-style: italic; color: #000000; margin-bottom: 2px;">
        <strong style="color: #000000;">Task:</strong> Using the vocabulary and connectives above, write your analytical response below:
      </div>
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0; border-top: 1.2px solid #000000; margin-bottom: 4px;">
        ${Array(20)
          .fill(
            '<div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>',
          )
          .join('\n        ')}
      </div>

      <!-- Centrefold Sketch Challenge Mission Box -->
      <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 3px 6px; background: #ffffff; margin-bottom: 3px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid #000000; padding-bottom: 1.5px; margin-bottom: 2px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase; color: #000000; background: #000000; color: #ffffff; padding: 1.5px 5px; border-radius: 2px;">
            🎨 ${rp.timelineMissionTitle} &bull; Living Timeline Dual-Coding
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; color: #000000; text-transform: uppercase;">
            Turn to Centrefold (Pages 8–9) &rarr;
          </span>
        </div>
        <div style="font-family: 'Georgia', serif; font-size: 7.4pt; color: #000000; line-height: 1.22; margin-top: 1px;">
          ${rp.timelineMission}
        </div>
      </div>

      <!-- Teacher Feedback Strip -->
      <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 3px 6px; background: #ffffff; display: flex; justify-content: space-between; align-items: center;">
        <span style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 900; text-transform: uppercase; color: #000000;">
          Teacher Check &bull; Disciplinary Level:
        </span>
        <div style="display: flex; gap: 10px; font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; color: #000000;">
          <span>[ ] Emerging</span>
          <span>[ ] Developing</span>
          <span>[ ] Secure</span>
          <span>[ ] Greater Depth</span>
        </div>
      </div>

      ${renderFooterStrip(pageNum, cfg.rightPageQuip, 16)}
    </div>
  </div>`;
  }

  if (rp.type === 'interpretations') {
    // INTERPRETATIONS PAGE (ENQUIRY 4 - STRICTLY MONOCHROME)
    return `
  <!-- LESSON SPREAD: ${isEven ? 'LEFT PAGE (VERSO)' : 'RIGHT PAGE (RECTO)'} • CONTRASTING INTERPRETATIONS (MONOCHROME) -->
  <div class="page page-container ${pageClass}" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Header -->
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 4px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 11.5pt; color: #000000; margin: 0; font-weight: 900;">
          ${rp.tariff}
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 8.0pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; background: #000000; color: #ffffff; padding: 1.5px 6px; border-radius: 2px;">
          HISTORIOGRAPHICAL ANALYSIS
        </span>
      </div>

      <!-- Competing Historical Interpretations Box -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 4px;">
        <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 4px 7px; background: #ffffff;">
          <div style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 900; color: #000000; text-transform: uppercase; border-bottom: 1px solid #000000; padding-bottom: 1.5px; margin-bottom: 2px;">
            Interpretation 1 &bull; ${rp.interpretation1.author}
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 7.2pt; font-style: italic; color: #000000; line-height: 1.22;">
            ${rp.interpretation1.text}
          </div>
        </div>
        <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 4px 7px; background: #ffffff;">
          <div style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 900; color: #000000; text-transform: uppercase; border-bottom: 1px solid #000000; padding-bottom: 1.5px; margin-bottom: 2px;">
            Interpretation 2 &bull; ${rp.interpretation2.author}
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 7.2pt; font-style: italic; color: #000000; line-height: 1.22;">
            ${rp.interpretation2.text}
          </div>
        </div>
      </div>

      <!-- Task B: Question 3(b) -->
      <div style="flex: 1; display: flex; flex-direction: column; min-height: 0; margin-bottom: 2px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
          <div style="font-family: 'Playfair Display', serif; font-size: 8.8pt; font-weight: 900; color: #000000;">
            ${rp.questionB}
          </div>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; background: #000000; color: #ffffff; padding: 1px 5px; border-radius: 2px; text-transform: uppercase;">
            PART B
          </span>
        </div>
        ${rp.stemsB ? `<div style="border: 1px solid #000000; border-radius: 2px; padding: 2px 5px; background: #ffffff; font-family: 'Inter', sans-serif; font-size: 7.0pt; line-height: 1.2; margin-bottom: 2px;"><strong style="color: #000000;">Sentence Stems:</strong> <span style="color: #000000;">${rp.stemsB}</span></div>` : ''}
        <div style="display: flex; flex-direction: column; gap: 0; flex: 1; min-height: 0;">
          ${Array(13)
            .fill(
              '<div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>',
            )
            .join('')}
        </div>
      </div>

      <!-- Clean Separator -->
      <div style="border-top: 1.2px solid #000000; margin: 3px 0;"></div>

      <!-- Task C: Question 3(c) -->
      <div style="flex: 1; display: flex; flex-direction: column; min-height: 0; margin-bottom: 2px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
          <div style="font-family: 'Playfair Display', serif; font-size: 8.8pt; font-weight: 900; color: #000000;">
            ${rp.questionC}
          </div>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; background: #000000; color: #ffffff; padding: 1px 5px; border-radius: 2px; text-transform: uppercase;">
            PART C
          </span>
        </div>
        ${rp.stemsC ? `<div style="border: 1px solid #000000; border-radius: 2px; padding: 2px 5px; background: #ffffff; font-family: 'Inter', sans-serif; font-size: 7.0pt; line-height: 1.2; margin-bottom: 2px;"><strong style="color: #000000;">Sentence Stems:</strong> <span style="color: #000000;">${rp.stemsC}</span></div>` : ''}
        <div style="display: flex; flex-direction: column; gap: 0; flex: 1; min-height: 0;">
          ${Array(13)
            .fill(
              '<div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>',
            )
            .join('')}
        </div>
      </div>

      <!-- Timeline Mission Box -->
      <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 3px 6px; background: #ffffff; margin-top: 2px; margin-bottom: 2px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px; border-bottom: 1px solid #000000; padding-bottom: 1.5px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; background: #000000; color: #ffffff; padding: 1.5px 5px; border-radius: 2px; text-transform: uppercase; letter-spacing: 0.3px;">
            🎨 ${rp.timelineMissionTitle || 'Timeline Mission'}
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; color: #000000;">
            Turn to Centrefold &bull; Pages 8–9 &rarr;
          </span>
        </div>
        <div style="font-family: 'Georgia', serif; font-size: 7.4pt; color: #000000; line-height: 1.22;">
          ${rp.timelineMission}
        </div>
      </div>

      <!-- Teacher Feedback Strip -->
      <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 3px 6px; background: #ffffff; display: flex; justify-content: space-between; align-items: center; margin-top: 2px;">
        <span style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 900; text-transform: uppercase; color: #000000;">
          Teacher Check &bull; Disciplinary Level:
        </span>
        <div style="display: flex; gap: 10px; font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; color: #000000;">
          <span>[ ] Emerging</span>
          <span>[ ] Developing</span>
          <span>[ ] Secure</span>
          <span>[ ] Greater Depth</span>
        </div>
      </div>

      ${renderFooterStrip(pageNum, cfg.rightPageQuip, 16)}
    </div>
  </div>`;
  }

  // SPLIT TASKS (ENQUIRIES 2 & 3 - STRICTLY MONOCHROME)
  return `
  <!-- LESSON SPREAD: ${isEven ? 'LEFT PAGE (VERSO)' : 'RIGHT PAGE (RECTO)'} • GUIDED DISCIPLINARY TASKS (MONOCHROME) -->
  <div class="page page-container ${pageClass}" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      
      <!-- PART A: SHORT-FORM DISCIPLINARY DRILL [4 OR 8 MARKS] -->
      <div style="border-bottom: 1.5px solid #000000; padding-bottom: 3px; margin-bottom: 3px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
          <h2 style="font-family: 'Playfair Display', serif; font-size: 11.0pt; color: #000000; margin: 0; font-weight: 900;">
            ${rp.partA.tariff}
          </h2>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 800; background: #000000; color: #ffffff; padding: 1px 6px; border-radius: 2px; text-transform: uppercase;">
            ${rp.partA.badge || 'DISCIPLINARY DRILL'}
          </span>
        </div>
        <div style="font-family: 'Playfair Display', serif; font-size: 9.8pt; font-weight: 900; color: #000000; line-height: 1.24; margin-bottom: 2px;">
          ${rp.partA.question}
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.8pt; font-style: italic; color: #000000; line-height: 1.2; margin-bottom: 3px;">
          ${rp.partA.stems}
        </div>
        <div class="ruled-lines-block">
          <div class="task-line" style="height: 7.8mm; border-bottom: 1.2px solid #000000;"></div>
          <div class="task-line" style="height: 7.8mm; border-bottom: 1.2px solid #000000;"></div>
          <div class="task-line" style="height: 7.8mm; border-bottom: 1.2px solid #000000;"></div>
          <div class="task-line" style="height: 7.8mm; border-bottom: 1.2px solid #000000;"></div>
        </div>
      </div>

      <!-- PART B: EXTENDED SKILL WRITING [4 OR 8 MARKS] -->
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0;">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1.5px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
            <h2 style="font-family: 'Playfair Display', serif; font-size: 10.5pt; color: #000000; margin: 0; font-weight: 900;">
              ${rp.partB.tariff}
            </h2>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 800; background: #000000; color: #ffffff; padding: 1px 6px; border-radius: 2px; text-transform: uppercase;">
              ${rp.partB.badge || 'STRUCTURED WRITING'}
            </span>
          </div>
          <div style="font-family: 'Playfair Display', serif; font-size: 9.8pt; font-weight: 900; color: #000000; line-height: 1.26; margin-bottom: 3px;">
            ${rp.partB.question}
          </div>
          ${
            rp.partB.stimulus
              ? `
          <div style="display: flex; align-items: center; gap: 6px; font-family: 'Inter', sans-serif; font-size: 8.0pt; color: #000000; margin-bottom: 3px;">
            <strong style="color: #000000;">Stimulus:</strong>
            <span style="border: 1px solid #000000; padding: 1px 6px; border-radius: 2px; font-weight: 800; color: #000000; background: #ffffff;">${rp.partB.stimulus[0]}</span>
            <span style="border: 1px solid #000000; padding: 1px 6px; border-radius: 2px; font-weight: 800; color: #000000; background: #ffffff;">${rp.partB.stimulus[1]}</span>
          </div>`
              : ''
          }
          <div style="border: 1px solid #000000; border-radius: 3px; padding: 4px 7px; background: #ffffff; margin-bottom: 4px; font-family: 'Inter', sans-serif; font-size: 8.4pt; line-height: 1.28;">
            ${rp.partB.connectives ? `<div><strong style="color: #000000;">Analytical Connectives:</strong> <em style="color: #000000;">${rp.partB.connectives}</em></div>` : ''}
            ${rp.partB.wordBank ? `<div style="margin-top: 2px;"><strong style="color: #000000;">Key Terms:</strong> <span style="color: #000000;">${rp.partB.wordBank}</span></div>` : ''}
          </div>
        </div>

        <!-- Ruled Writing Lines (Calibrated ~9.2mm GCSE pitch: 21 Lines) -->
        <div style="display: flex; flex-direction: column; gap: 0; margin-bottom: 3px; flex: 1; min-height: 0;">
          ${Array(21)
            .fill(
              '<div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>',
            )
            .join('')}
        </div>

        <!-- Centrefold Sketch Challenge Mission Box -->
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 3px 6px; background: #ffffff; margin-top: 1px; margin-bottom: 2px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5px; border-bottom: 1px solid #000000; padding-bottom: 1px;">
            <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; background: #000000; color: #ffffff; padding: 1.5px 5px; border-radius: 2px; text-transform: uppercase; letter-spacing: 0.3px;">
              🎨 ${rp.timelineMissionTitle || 'Timeline Mission'}
            </span>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; color: #000000;">
              Turn to Centrefold &bull; Pages 8–9 &rarr;
            </span>
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 7.4pt; color: #000000; line-height: 1.22;">
            ${rp.timelineMission}
          </div>
        </div>

        <!-- Teacher Feedback Strip -->
        <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 2.5px 6px; background: #ffffff; display: flex; justify-content: space-between; align-items: center;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 900; text-transform: uppercase; color: #000000;">
            Teacher Check &bull; Disciplinary Level:
          </span>
          <div style="display: flex; gap: 10px; font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; color: #000000;">
            <span>[ ] Emerging</span>
            <span>[ ] Developing</span>
            <span>[ ] Secure</span>
            <span>[ ] Greater Depth</span>
          </div>
        </div>

      </div>

      ${renderFooterStrip(pageNum, cfg.rightPageQuip, 16)}
    </div>
  </div>`;
}

// ============================================================================
// MAIN COMPILATION FUNCTION
// ============================================================================
function compileIndustrialisationWorkbook() {
  const coverImgBase64 =
    getBase64Image('/images/coalbrookdale_by_night.jpg') ||
    getBase64Image('public/images/coalbrookdale_by_night.jpg') ||
    '';

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Industrialisation, Empire &amp; Power (1750–1901) &bull; Pupil Workbook</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,600;0,6..72,700;1,6..72,400&family=Georgia:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4 portrait;
      margin: 0;
    }
    *, *:before, *:after {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    body {
      margin: 0;
      padding: 0;
      background: #eaedf2;
      color: #000000;
      font-family: 'Inter', sans-serif;
      font-size: 8.5pt;
      line-height: 1.32;
    }
    .page, .page-container {
      width: 210mm;
      height: 297mm;
      box-sizing: border-box;
      margin: 0 auto;
      overflow: hidden;
      position: relative;
      page-break-after: always;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 4mm 6mm;
      background: #ffffff;
    }
    .page:last-child, .page-container:last-child {
      page-break-after: auto;
    }
    .page-body-full {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
    }
    .task-line {
      border-bottom: 1.2px solid #000000;
      height: 7.8mm;
      width: 100%;
      box-sizing: border-box;
      margin: 0;
    }
    .note-line {
      flex: 1;
      min-height: 0;
      border-bottom: 1.2px solid #000000;
      box-sizing: border-box;
      margin: 0;
    }
    .ruled-lines-block {
      display: flex;
      flex-direction: column;
      gap: 0;
      margin: 1px 0;
    }
    .page-footer-strip {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 0.8px solid #000000;
      padding-top: 1.5px;
      margin-top: 2px;
      font-family: 'Inter', sans-serif;
      font-size: 6.2pt;
      line-height: 1.15;
      color: #000000;
    }
    .footer-quip {
      font-style: italic;
      color: #000000;
      white-space: nowrap;
    }
    .footer-page-num {
      font-family: 'Inter', sans-serif;
      font-weight: 800;
      white-space: nowrap;
      color: #000000;
      font-size: 6.8pt;
      flex-shrink: 0;
    }
  </style>
</head>
<body>
`;

  // ====================================================================
  // PAGE 1: FRONT COVER (Full Colour Oxford Navy Standard)
  // ====================================================================
  html += `
  <div class="page page-container recto-page" id="page-1" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Top Departmental Branding with Customizer Hook -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #0f284e; padding-bottom: 4px; margin-bottom: 8px;">
        <div data-department-name="The History Department">
          <span style="font-family: 'Inter', sans-serif; font-size: 11pt; font-weight: 900; color: #0f284e; text-transform: uppercase; letter-spacing: 1px;">
            <span class="school-brand-target">The History Department</span>
          </span>
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 8.5pt; font-weight: 800; color: #0f284e;">
          KEY STAGE 3 HISTORICAL STUDIES &bull; YEAR 8
        </div>
      </div>

      <!-- Pupil Details Strip -->
      <div style="border: 1.5px solid #0f284e; border-radius: 4px; padding: 6px 12px; background: #ffffff; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 14px; align-items: center; margin-bottom: 8px;">
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f284e; text-transform: uppercase; margin-right: 8px;">Pupil Name:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #0f284e; height: 14px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f284e; text-transform: uppercase; margin-right: 8px;">Class:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #0f284e; height: 14px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f284e; text-transform: uppercase; margin-right: 8px;">Teacher:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #0f284e; height: 14px;"></div>
        </div>
      </div>

      <!-- Main Title Block -->
      <div style="text-align: center; margin: 2px 0 6px 0;">
        <div style="display: inline-block; border: 1.5px solid #0f284e; color: #ffffff; background: #0f284e; font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; padding: 2px 10px; border-radius: 3px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">
          Year 8 Enquiry &bull; 1750–1901
        </div>
        <h1 style="font-family: 'Playfair Display', serif; font-size: 21pt; line-height: 1.15; color: #0f284e; margin: 2px 0 3px 0; font-weight: 900;">
          Industrialisation, Empire &amp; Power: 1750–1901
        </h1>
        <div style="font-family: 'Georgia', serif; font-size: 10pt; color: #334155; font-style: italic; font-weight: 600;">
          Energy, Exploitation, Democracy &amp; Global Supremacy
        </div>
      </div>

      <!-- Prominent Primary Visual Source Centerpiece (Landscape Showcase + Underneath Analytical Deck) -->
      <div style="margin: 2px 0 4px 0; border: 1.5px solid #0f284e; border-radius: 4px; overflow: hidden; background: #ffffff;">
        
        <!-- 1. Top Artwork Showcase (Full-Width Cinematic Landscape Banner) -->
        <div style="background: #fcfbf9; border-bottom: 1.5px solid #0f284e; display: flex; justify-content: center; align-items: center; padding: 4px 6px; height: 95mm; box-sizing: border-box;">
          <img src="${coverImgBase64}" alt="Coalbrookdale by Night 1801" style="height: 100%; width: auto; max-width: 100%; object-fit: contain; display: block; margin: 0 auto; border: 1.2px solid #0f284e; border-radius: 2px; box-shadow: 0 2px 6px rgba(15,40,78,0.22);">
        </div>

        <!-- 2. Analytical Decomposition Deck (Arranged Underneath in Clean Dual Columns) -->
        <div style="padding: 5px 8px; background: #ffffff; display: grid; grid-template-columns: 1.15fr 1fr; gap: 8px; box-sizing: border-box;">
          
          <!-- Left Column: Context & 4 Core Features -->
          <div style="display: flex; flex-direction: column; justify-content: space-between; gap: 3px;">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #0f284e; padding-bottom: 1.5px;">
              <span style="font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 900; text-transform: uppercase; color: #0f284e; letter-spacing: 0.5px;">
                Visual Decoding &bull; 4 Core Features
              </span>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; color: #64748b;">
                Philip James de Loutherbourg, RA (1801)
              </span>
            </div>
            
            <p style="font-family: 'Georgia', serif; font-size: 7.2pt; line-height: 1.2; color: #1e293b; margin: 0;">
              In 1801, Philip James de Loutherbourg captured the Madeley Wood (Bedlam) blast furnaces in Shropshire illuminating the night sky—the definitive visual monument of Britain’s industrial dawn:
            </p>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px 6px;">
              <div style="border-left: 2px solid #0f284e; padding-left: 4px;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 6.8pt; text-transform: uppercase; color: #0f284e; display: block;">1. Coke Blast Furnaces:</strong>
                <div style="font-family: 'Georgia', serif; font-size: 6.6pt; line-height: 1.15; color: #222222;">
                  Flames erupt from open furnace tops, symbolising the substitution of timber by coal smelting.
                </div>
              </div>
              <div style="border-left: 2px solid #0f284e; padding-left: 4px;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 6.8pt; text-transform: uppercase; color: #0f284e; display: block;">2. Choking Plumes &amp; Sky:</strong>
                <div style="font-family: 'Georgia', serif; font-size: 6.6pt; line-height: 1.15; color: #222222;">
                  Dense black smoke obscures the night sky, capturing the Sublime power of heavy industry.
                </div>
              </div>
              <div style="border-left: 2px solid #0f284e; padding-left: 4px;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 6.8pt; text-transform: uppercase; color: #0f284e; display: block;">3. Boilers, Pipes &amp; Slag:</strong>
                <div style="font-family: 'Georgia', serif; font-size: 6.6pt; line-height: 1.15; color: #222222;">
                  Cast cylindrical steam engine boilers and cooling slag illustrate mass metallurgical output.
                </div>
              </div>
              <div style="border-left: 2px solid #0f284e; padding-left: 4px;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 6.8pt; text-transform: uppercase; color: #0f284e; display: block;">4. Carter &amp; Workhorses:</strong>
                <div style="font-family: 'Georgia', serif; font-size: 6.6pt; line-height: 1.15; color: #222222;">
                  Workhorses hauling iron mark the historic threshold between muscle and steam power.
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column: 3-Pillar Matrix + Significance + Hinge Question -->
          <div style="display: flex; flex-direction: column; justify-content: space-between; gap: 3px;">
            <!-- Three-Pillar Visual Matrix -->
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 4px;">
              <div style="border: 1px solid #0f284e; border-radius: 2px; padding: 2px 4px; background: #f0f4f9;">
                <div style="font-family: 'Inter', sans-serif; font-size: 6.6pt; font-weight: 900; text-transform: uppercase; color: #0f284e;">Fossil &amp; Steam</div>
                <div style="font-family: 'Georgia', serif; font-size: 6.3pt; line-height: 1.12; color: #1e293b; margin-top: 1px;">Coal, coke smelting &amp; Watt engines.</div>
              </div>
              <div style="border: 1px solid #0f284e; border-radius: 2px; padding: 2px 4px; background: #f0f4f9;">
                <div style="font-family: 'Inter', sans-serif; font-size: 6.6pt; font-weight: 900; text-transform: uppercase; color: #0f284e;">Metallurgy</div>
                <div style="font-family: 'Georgia', serif; font-size: 6.3pt; line-height: 1.12; color: #1e293b; margin-top: 1px;">Cort’s puddling &amp; rolling at Funtley.</div>
              </div>
              <div style="border: 1px solid #0f284e; border-radius: 2px; padding: 2px 4px; background: #f0f4f9;">
                <div style="font-family: 'Inter', sans-serif; font-size: 6.6pt; font-weight: 900; text-transform: uppercase; color: #0f284e;">Class Struggle</div>
                <div style="font-family: 'Georgia', serif; font-size: 6.3pt; line-height: 1.12; color: #1e293b; margin-top: 1px;">Swing Riots, child labour &amp; democracy.</div>
              </div>
            </div>

            <!-- Disciplinary Significance Anchor -->
            <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #1e293b; line-height: 1.2; background: #f0f4f9; border-left: 2.5px solid #0f284e; padding: 2px 6px;">
              <strong style="text-transform: uppercase; color: #0f284e;">Disciplinary Significance:</strong> Loutherbourg’s masterpiece captures the Industrial Sublime—a fusion of awe and terror—symbolizing the dawn of an Anthropocene era where human technology eclipsed biological limits.
            </div>

            <!-- Targeted Disciplinary Hinge Question -->
            <div style="background: #ffffff; border: 1.2px solid #0f284e; border-radius: 3px; padding: 2.5px 6px;">
              <div style="display: flex; justify-content: space-between; align-items: baseline;">
                <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 900; text-transform: uppercase; color: #0f284e;">Disciplinary Hinge Question:</span>
                <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 700; color: #64748b; text-transform: uppercase;">Evaluation</span>
              </div>
              <div style="font-family: 'Georgia', serif; font-size: 6.9pt; font-style: italic; color: #1e293b; line-height: 1.18; margin-top: 1px;">
                Does Loutherbourg depict Coalbrookdale as an apocalyptic vision of hell and human suffering, or as a heroic celebration of British technological mastery and industrial progress?
              </div>
            </div>
          </div>
        </div>

        <!-- 3. Bottom Museum Provenance Banner -->
        <div style="display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 7.0pt; color: #ffffff; padding: 2.5px 8px; border-top: 1.5px solid #0f284e; background: #0f284e;">
          <span><strong>Primary Visual Evidence:</strong> <em>Coalbrookdale by Night</em> (1801) &bull; Philip James de Loutherbourg, RA</span>
          <span style="font-weight: 700; color: #93c5fd; white-space: nowrap;">SCIENCE MUSEUM, LONDON &bull; OBJECT NO. 1952-452 &bull; OIL ON CANVAS</span>
        </div>
      </div>

      <!-- Course Specification Curriculum Tracking Table -->
      <div style="border: 1.5px solid #0f284e; border-radius: 4px; overflow: hidden; margin: 2px 0 2px 0;">
        <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif;">
          <thead>
            <tr style="border-bottom: 1.5px solid #0f284e; background: #0f284e;">
              <th style="padding: 7px 10px; text-align: left; font-size: 8.2pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; border-right: 1.2px solid rgba(255,255,255,0.25); color: #ffffff;">
                Course Specification &bull; Key Enquiry Sequence
              </th>
              <th style="padding: 7px 4px; width: 64px; text-align: center; font-size: 7.8pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; border-right: 1.2px solid rgba(255,255,255,0.25); color: #ffffff;">
                Learnt
              </th>
              <th style="padding: 7px 4px; width: 64px; text-align: center; font-size: 7.8pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; color: #ffffff;">
                Revised
              </th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 10.6px 10px; border-right: 1.2px solid #cbd5e1;">
                <div style="font-size: 8.5pt; font-weight: 800; color: #0f284e; line-height: 1.25;">
                  Enquiry 1: The Iron &amp; Steam Revolution: Henry Cort &amp; Funtley Works
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.8pt; font-style: italic; color: #334155; margin-top: 1px; line-height: 1.2;">
                  How did Henry Cort’s breakthrough at Funtley Ironworks transform Britain into an industrial and naval superpower?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #cbd5e1;">
                <div style="width: 15px; height: 15px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 15px; height: 15px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 10.6px 10px; border-right: 1.2px solid #cbd5e1;">
                <div style="font-size: 8.5pt; font-weight: 800; color: #0f284e; line-height: 1.25;">
                  Enquiry 2: The Dark Satanic Mills: Child Labour, Slums &amp; Public Health
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.8pt; font-style: italic; color: #334155; margin-top: 1px; line-height: 1.2;">
                  Was industrialisation a triumph of human progress or a catastrophe of urban suffering for the working class?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #cbd5e1;">
                <div style="width: 15px; height: 15px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 15px; height: 15px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 10.6px 10px; border-right: 1.2px solid #cbd5e1;">
                <div style="font-size: 8.5pt; font-weight: 800; color: #0f284e; line-height: 1.25;">
                  Enquiry 3: Blood, Machines &amp; Ballots: The Hampshire Swing Riots to Chartism
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.8pt; font-style: italic; color: #334155; margin-top: 1px; line-height: 1.2;">
                  Why did British workers turn to machine-breaking and mass petitions to demand a political voice?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #cbd5e1;">
                <div style="width: 15px; height: 15px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 15px; height: 15px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 10.6px 10px; border-right: 1.2px solid #cbd5e1;">
                <div style="font-size: 8.5pt; font-weight: 800; color: #0f284e; line-height: 1.25;">
                  Enquiry 4: Steam, Steel &amp; Empire: HMS Warrior &amp; The 1857 Indian Rebellion
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.8pt; font-style: italic; color: #334155; margin-top: 1px; line-height: 1.2;">
                  How did industrial technology sustain the British Empire, and why did Indian soldiers rebel in 1857?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #cbd5e1;">
                <div style="width: 15px; height: 15px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 15px; height: 15px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
            <tr>
              <td style="padding: 10.6px 10px; border-right: 1.2px solid #cbd5e1;">
                <div style="font-size: 8.5pt; font-weight: 800; color: #0f284e; line-height: 1.25;">
                  Enquiry 5: The Victorian Verdict: Workshop of the World or Age of Exploitation?
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.8pt; font-style: italic; color: #334155; margin-top: 1px; line-height: 1.2;">
                  Did the Industrial Revolution bring unprecedented progress or human catastrophe to the British people?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #cbd5e1;">
                <div style="width: 15px; height: 15px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 15px; height: 15px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      ${renderFooterStrip(1, 'Fareham ironmaster Henry Cort and Portsmouth Dockyard provided the metallurgical foundation that built Britain’s industrial and naval empire.', 16)}
    </div>
  </div>
`;

  // ====================================================================
  // PAGES 2–3: ENQUIRY 1 (HENRY CORT & FUNTLEY IRONWORKS)
  // ====================================================================
  html += renderSpinePage(enquiryConfigs[0], 2);
  html += renderRightPage(enquiryConfigs[0], 3);

  // ====================================================================
  // PAGES 4–5: ENQUIRY 2 (CHILD LABOUR, SLUMS & PUBLIC HEALTH)
  // ====================================================================
  html += renderSpinePage(enquiryConfigs[1], 4);
  html += renderRightPage(enquiryConfigs[1], 5);

  // ====================================================================
  // PAGES 6–7: ENQUIRY 3 (HAMPSHIRE SWING RIOTS TO CHARTISM)
  // ====================================================================
  html += renderSpinePage(enquiryConfigs[2], 6);
  html += renderRightPage(enquiryConfigs[2], 7);

  // ====================================================================
  // PAGES 8–9: LIVING TIMELINE IN THE EXACT PHYSICAL CENTREFOLD!
  // ====================================================================
  html += `
  <!-- PAGE 8: LIVING TIMELINE PART 1 (MILESTONES 1–4: 1784–1830) (MONOCHROME) -->
  <div class="page page-container verso-page" id="page-8" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div>
        <div style="border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 5px;">
          <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 11.8pt; color: #000000; text-transform: uppercase; font-weight: 900; letter-spacing: 0.5px;">
            Living Timeline &bull; Part 1: Metallurgy, Machine Power &amp; Agrarian Revolt (1784–1830)
          </h2>
        </div>

        <div style="border: 1.2px solid #000000; border-radius: 3px; background: #ffffff; padding: 2.5px 6px; margin-bottom: 4px; font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #000000;">
          <strong style="color: #000000;">Living Timeline Choice:</strong> For each milestone, choose either <strong>(A) Creative Sketch:</strong> draw historical symbols, dramatic scenes, or visual metaphors; OR <strong>(B) Mind Map:</strong> create a central concept bubble with 3 key historical facts.
        </div>
      </div>

      <!-- 4 Milestones with Open Drawing Area Across Full A4 Page -->
      <div style="display: flex; flex-direction: column; flex: 1; justify-content: space-between;">
        
        <!-- Milestone 1: 1784 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 10.0pt; font-weight: 900; color: #000000;">
              1784 &bull; Henry Cort Patented Puddling at Funtley Ironworks
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; background: #000000; color: #ffffff; border: 1px solid #000000; padding: 1px 6px; border-radius: 2px;">Enquiry 1</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.6pt; color: #000000; margin: 0; line-height: 1.25;">
            Fareham ironmaster Henry Cort invents the reverberatory puddling furnace and grooved rolling mill along the River Meon, enabling Britain to produce tough naval wrought iron from domestic coal and ending reliance on Baltic imports.
          </p>
          <!-- Open Dual-Coding / Concept Web Drawing Canvas for Pupils -->
          <div style="flex: 1; min-height: 16mm; background: #ffffff; border-bottom: 1px solid #cbd5e1; margin-bottom: 2px; display: flex; flex-direction: column; justify-content: flex-end;">
            <div style="font-family: 'Inter', sans-serif; font-size: 6.0pt; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.3px; text-align: right; padding-right: 4px; padding-bottom: 1px;">
              [ Choice A: Creative Sketch &bull; OR &bull; Choice B: Mind Map ]
            </div>
          </div>
        </div>

        <!-- Milestone 2: 1787 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 10.0pt; font-weight: 900; color: #000000;">
              1787 &bull; Portsmouth Royal Dockyard Naval Trials
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; background: #000000; color: #ffffff; border: 1px solid #000000; padding: 1px 6px; border-radius: 2px;">Enquiry 1</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.6pt; color: #000000; margin: 0; line-height: 1.25;">
            Admiralty master smiths at Portsmouth Dockyard conduct rigorous metallurgical tests on Funtley iron, proving it fully equal to Swedish Orgrounds iron for ship anchors, mast hoops, and naval fittings for the Royal Navy.
          </p>
          <!-- Open Dual-Coding / Concept Web Drawing Canvas for Pupils -->
          <div style="flex: 1; min-height: 16mm; background: #ffffff; border-bottom: 1px solid #cbd5e1; margin-bottom: 2px; display: flex; flex-direction: column; justify-content: flex-end;">
            <div style="font-family: 'Inter', sans-serif; font-size: 6.0pt; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.3px; text-align: right; padding-right: 4px; padding-bottom: 1px;">
              [ Choice A: Creative Sketch &bull; OR &bull; Choice B: Mind Map ]
            </div>
          </div>
        </div>

        <!-- Milestone 3: 1819 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 10.0pt; font-weight: 900; color: #000000;">
              1819 &bull; The Peterloo Massacre at St Peter's Field, Manchester
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; background: #000000; color: #ffffff; border: 1px solid #000000; padding: 1px 6px; border-radius: 2px;">Enquiry 4</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.6pt; color: #000000; margin: 0; line-height: 1.25;">
            Manchester magistrates order Yeomanry cavalry to charge 60,000 peaceful cotton workers demanding universal suffrage, killing 18 and injuring 650; Parliament responds with the repressive Six Acts.
          </p>
          <!-- Open Dual-Coding / Concept Web Drawing Canvas for Pupils -->
          <div style="flex: 1; min-height: 16mm; background: #ffffff; border-bottom: 1px solid #cbd5e1; margin-bottom: 2px; display: flex; flex-direction: column; justify-content: flex-end;">
            <div style="font-family: 'Inter', sans-serif; font-size: 6.0pt; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.3px; text-align: right; padding-right: 4px; padding-bottom: 1px;">
              [ Choice A: Creative Sketch &bull; OR &bull; Choice B: Mind Map ]
            </div>
          </div>
        </div>

        <!-- Milestone 4: 1830 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 10.0pt; font-weight: 900; color: #000000;">
              1830 &bull; The Hampshire "Captain Swing" Riots Across the Meon Valley
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; background: #000000; color: #ffffff; border: 1px solid #000000; padding: 1px 6px; border-radius: 2px;">Enquiry 4</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.6pt; color: #000000; margin: 0; line-height: 1.25;">
            Starving farm labourers in the Meon Valley, Selborne, and Fareham smash threshing machines and burn ricks under the mythical name "Captain Swing"; the Winchester Assizes sentences 101 men to penal transportation to Australia.
          </p>
          <!-- Open Dual-Coding / Concept Web Drawing Canvas for Pupils -->
          <div style="flex: 1; min-height: 16mm; background: #ffffff; border-bottom: 1px solid #cbd5e1; margin-bottom: 2px; display: flex; flex-direction: column; justify-content: flex-end;">
            <div style="font-family: 'Inter', sans-serif; font-size: 6.0pt; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.3px; text-align: right; padding-right: 4px; padding-bottom: 1px;">
              [ Choice A: Creative Sketch &bull; OR &bull; Choice B: Mind Map ]
            </div>
          </div>
        </div>

      </div>

      ${renderFooterStrip(8, 'Centrefold timeline: Dual-coding sketches and dates turns narrative history into permanent long-term memory.', 16)}
    </div>
  </div>

  <!-- PAGE 9: LIVING TIMELINE PART 2 (MILESTONES 5–8: 1832–1872) (MONOCHROME) -->
  <div class="page page-container recto-page" id="page-9" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div>
        <div style="border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 5px;">
          <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 11.8pt; color: #000000; text-transform: uppercase; font-weight: 900; letter-spacing: 0.5px;">
            Living Timeline &bull; Part 2: Factory Reform, Slum Sanitation &amp; The Ballot (1832–1872)
          </h2>
        </div>

        <div style="border: 1.2px solid #000000; border-radius: 3px; background: #ffffff; padding: 2.5px 6px; margin-bottom: 4px; font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #000000;">
          <strong style="color: #000000;">Living Timeline Choice:</strong> For each milestone, choose either <strong>(A) Creative Sketch:</strong> draw historical symbols, dramatic scenes, or visual metaphors; OR <strong>(B) Mind Map:</strong> create a central concept bubble with 3 key historical facts.
        </div>
      </div>

      <!-- 4 Milestones with Open Drawing Area Across Full A4 Page -->
      <div style="display: flex; flex-direction: column; flex: 1; justify-content: space-between;">
        
        <!-- Milestone 5: 1832 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 10.0pt; font-weight: 900; color: #000000;">
              1832 &bull; The Sadler Committee Eyewitness Report on Child Labour
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; background: #000000; color: #ffffff; border: 1px solid #000000; padding: 1px 6px; border-radius: 2px;">Enquiry 2</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.6pt; color: #000000; margin: 0; line-height: 1.25;">
            Michael Sadler’s parliamentary committee publishes horrifying eyewitness testimony of 14-hour days, physical beatings, and crippling injuries suffered by child piecers in northern textile mills, forcing the passage of the 1833 Factory Act.
          </p>
          <!-- Open Dual-Coding / Concept Web Drawing Canvas for Pupils -->
          <div style="flex: 1; min-height: 16mm; background: #ffffff; border-bottom: 1px solid #cbd5e1; margin-bottom: 2px; display: flex; flex-direction: column; justify-content: flex-end;">
            <div style="font-family: 'Inter', sans-serif; font-size: 6.0pt; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.3px; text-align: right; padding-right: 4px; padding-bottom: 1px;">
              [ Choice A: Creative Sketch &bull; OR &bull; Choice B: Mind Map ]
            </div>
          </div>
        </div>

        <!-- Milestone 6: 1832 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 10.0pt; font-weight: 900; color: #000000;">
              1832 &bull; Passage of the Great Reform Act Enfranchising Manchester
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; background: #000000; color: #ffffff; border: 1px solid #000000; padding: 1px 6px; border-radius: 2px;">Enquiry 5</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.6pt; color: #000000; margin: 0; line-height: 1.25;">
            Terrified of revolution and a run on the Bank of England, Parliament abolishes 56 rotten boroughs and grants MPs to Manchester, Birmingham, and Leeds, though the £10 franchise deliberately excludes the working class.
          </p>
          <!-- Open Dual-Coding / Concept Web Drawing Canvas for Pupils -->
          <div style="flex: 1; min-height: 16mm; background: #ffffff; border-bottom: 1px solid #cbd5e1; margin-bottom: 2px; display: flex; flex-direction: column; justify-content: flex-end;">
            <div style="font-family: 'Inter', sans-serif; font-size: 6.0pt; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.3px; text-align: right; padding-right: 4px; padding-bottom: 1px;">
              [ Choice A: Creative Sketch &bull; OR &bull; Choice B: Mind Map ]
            </div>
          </div>
        </div>

        <!-- Milestone 7: 1858 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 10.0pt; font-weight: 900; color: #000000;">
              1858 &bull; The Great Stink of the Thames &amp; Bazalgette's Sewers
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; background: #000000; color: #ffffff; border: 1px solid #000000; padding: 1px 6px; border-radius: 2px;">Enquiry 3</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.6pt; color: #000000; margin: 0; line-height: 1.25;">
            A boiling heatwave turns the sewage-filled Thames into an unbearable stench that invades Parliament; MPs immediately fund Joseph Bazalgette’s 82-mile underground brick sewer network, permanently ending waterborne cholera.
          </p>
          <!-- Open Dual-Coding / Concept Web Drawing Canvas for Pupils -->
          <div style="flex: 1; min-height: 16mm; background: #ffffff; border-bottom: 1px solid #cbd5e1; margin-bottom: 2px; display: flex; flex-direction: column; justify-content: flex-end;">
            <div style="font-family: 'Inter', sans-serif; font-size: 6.0pt; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.3px; text-align: right; padding-right: 4px; padding-bottom: 1px;">
              [ Choice A: Creative Sketch &bull; OR &bull; Choice B: Mind Map ]
            </div>
          </div>
        </div>

        <!-- Milestone 8: 1872 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 10.0pt; font-weight: 900; color: #000000;">
              1872 &bull; The Secret Ballot Act First Deployed at Pontefract
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; background: #000000; color: #ffffff; border: 1px solid #000000; padding: 1px 6px; border-radius: 2px;">Enquiry 5</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.6pt; color: #000000; margin: 0; line-height: 1.25;">
            William Gladstone’s government passes the Ballot Act, abolishing corrupt open hustings and requiring private voting in wooden booths, permanently eliminating landlord coercion and employer intimidation of working voters.
          </p>
          <!-- Open Dual-Coding / Concept Web Drawing Canvas for Pupils -->
          <div style="flex: 1; min-height: 16mm; background: #ffffff; border-bottom: 1px solid #cbd5e1; margin-bottom: 2px; display: flex; flex-direction: column; justify-content: flex-end;">
            <div style="font-family: 'Inter', sans-serif; font-size: 6.0pt; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.3px; text-align: right; padding-right: 4px; padding-bottom: 1px;">
              [ Choice A: Creative Sketch &bull; OR &bull; Choice B: Mind Map ]
            </div>
          </div>
        </div>

      </div>

      ${renderFooterStrip(9, 'Between 1784 and 1872, British power was transformed by industrial metallurgy, political protest, and democratic expansion.', 16)}
    </div>
  </div>
`;

  // ====================================================================
  // PAGES 10–11: ENQUIRY 4 (HMS WARRIOR & 1857 INDIAN REBELLION)
  // ====================================================================
  html += renderSpinePage(enquiryConfigs[3], 10);
  html += renderRightPage(enquiryConfigs[3], 11);

  // ====================================================================
  // PAGES 12–13: ENQUIRY 5 (THE VICTORIAN VERDICT)
  // ====================================================================
  html += renderSpinePage(enquiryConfigs[4], 12);
  html += renderRightPage(enquiryConfigs[4], 13);

  // ====================================================================
  // PAGES 14–15: DEDICATED RULED NOTES PAGES (EXERCISE BOOK RULING WITH MARGIN)
  // ====================================================================
  html += renderNotesPage(
    14,
    'Notes: Record key causal links, essay plans, and teacher feedback for this unit.',
  );
  html += renderNotesPage(
    15,
    'Notes: Record key causal links, essay plans, and teacher feedback for this unit.',
  );

  // ====================================================================
  // PAGE 16: OUTSIDE BACK COVER (PUPIL PROGRESS & ASSESSMENT RECORD)
  // ====================================================================
  html += `
  <!-- PAGE 16: OUTSIDE BACK COVER (Full Colour Oxford Navy Standard) -->
  <div class="page page-container verso-page" id="page-16" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Back Cover Header Strip -->
      <div style="border-bottom: 2px solid #0f284e; padding-bottom: 3px; margin-bottom: 6px;">
        <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 11.5pt; color: #0f284e; text-transform: uppercase; font-weight: 900; letter-spacing: 0.5px;">
          Key Stage 3 History &bull; Pupil Progress &amp; Assessment Record
        </h2>
      </div>

      <!-- Pupil Details & Target Level Strip -->
      <div style="border: 1.5px solid #0f284e; border-radius: 4px; padding: 7px 12px; background: #ffffff; display: grid; grid-template-columns: 2fr 1fr 1.3fr; gap: 14px; align-items: center; margin-bottom: 5px;">
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f284e; text-transform: uppercase; margin-right: 8px;">Pupil Name:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #0f284e; height: 14px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f284e; text-transform: uppercase; margin-right: 8px;">Class:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #0f284e; height: 14px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f284e; text-transform: uppercase; margin-right: 8px;">Target KS3 Level:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #0f284e; height: 14px; text-align: center; font-weight: 900; color: #0f284e;"></div>
        </div>
      </div>

      <!-- KS3 History Progress Pathways & Descriptors -->
      <div style="border: 1.5px solid #0f284e; border-radius: 4px; padding: 6px 8px; background: #ffffff; margin-bottom: 5px; font-family: 'Inter', sans-serif;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.2px solid #0f284e; background: #f0f4f9; padding: 3px 6px; margin-bottom: 4px; border-radius: 2px;">
          <strong style="font-size: 8pt; text-transform: uppercase; letter-spacing: 0.5px; color: #0f284e;">
            Key Stage 3 History Assessment Pathways &bull; Level Descriptors &amp; Criteria
          </strong>
          <span style="font-size: 7.2pt; font-weight: 800; color: #0f284e;">YEAR 8 STANDARDS</span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 5px; font-size: 7pt; line-height: 1.3;">
          <div style="border: 1px solid #cbd5e1; border-radius: 3px; padding: 5px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-weight: 900; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 3px; font-size: 7.2pt; text-transform: uppercase; color: #0f284e;">
                Emerging (1–2)
              </div>
              Recalls key historical narrative facts; describes basic industrial events using guided sentence starters.
            </div>
            <div style="margin-top: 4px; font-size: 6.4pt; font-style: italic; border-top: 1px dashed #cbd5e1; padding-top: 2px; color: #475569;">
              <strong style="color: #0f284e;">Focus:</strong> Add dates &amp; key vocabulary.
            </div>
          </div>
          <div style="border: 1px solid #cbd5e1; border-radius: 3px; padding: 5px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-weight: 900; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 3px; font-size: 7.2pt; text-transform: uppercase; color: #0f284e;">
                Emerging+ (3)
              </div>
              Identifies reasons for events; begins to describe causes of industrialisation, urban slums, and democratic protest with structured paragraphs.
            </div>
            <div style="margin-top: 4px; font-size: 6.4pt; font-style: italic; border-top: 1px dashed #cbd5e1; padding-top: 2px; color: #475569;">
              <strong style="color: #0f284e;">Focus:</strong> Explain *why*, not just *what*.
            </div>
          </div>
          <div style="border: 1px solid #cbd5e1; border-radius: 3px; padding: 5px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-weight: 900; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 3px; font-size: 7.2pt; text-transform: uppercase; color: #0f284e;">
                Expected (4–5)
              </div>
              Explains multiple causes &amp; consequences; writes structured causal paragraphs using precise dates, technical terms, and primary source details.
            </div>
            <div style="margin-top: 4px; font-size: 6.4pt; font-style: italic; border-top: 1px dashed #cbd5e1; padding-top: 2px; color: #475569;">
              <strong style="color: #0f284e;">Focus:</strong> Compare relative importance.
            </div>
          </div>
          <div style="border: 1.2px solid #0f284e; border-radius: 3px; padding: 5px; background: #f0f4f9; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-weight: 900; border-bottom: 1px solid #0f284e; padding-bottom: 2px; margin-bottom: 3px; font-size: 7.2pt; text-transform: uppercase; color: #0f284e;">
                Expected+ (6–7)
              </div>
              Analyses causal significance; evaluates competing historical interpretations and weighs counter-arguments with detailed primary evidence.
            </div>
            <div style="margin-top: 4px; font-size: 6.4pt; font-style: italic; border-top: 1px dashed #93c5fd; padding-top: 2px; color: #1e293b;">
              <strong style="color: #0f284e;">Focus:</strong> Sustained historical criteria.
            </div>
          </div>
          <div style="border: 1.2px solid #0f284e; border-radius: 3px; padding: 5px; background: #f0f4f9; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-weight: 900; border-bottom: 1px solid #0f284e; padding-bottom: 2px; margin-bottom: 3px; font-size: 7.2pt; text-transform: uppercase; color: #0f284e;">
                Greater Depth (8–9)
              </div>
              Sustained, nuanced evaluative judgement; synthesises technological innovation, human exploitation, and political struggle across 1750–1901.
            </div>
            <div style="margin-top: 4px; font-size: 6.4pt; font-style: italic; border-top: 1px dashed #93c5fd; padding-top: 2px; color: #1e293b;">
              <strong style="color: #0f284e;">Focus:</strong> Nuanced historical judgement.
            </div>
          </div>
        </div>
      </div>

      <!-- Streamlined KS3 Marking Grid -->
      <div style="border: 1.5px solid #0f284e; border-radius: 4px; overflow: hidden; margin-bottom: 7px;">
        <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif; font-size: 8pt;">
          <thead>
            <tr style="background: #0f284e; color: #ffffff;">
              <th style="padding: 7px 4px; width: 10%; text-align: center; border-right: 1px solid rgba(255,255,255,0.25); font-size: 7.5pt; text-transform: uppercase; color: #ffffff;">Date</th>
              <th style="padding: 7px 8px; width: 43%; text-align: left; border-right: 1px solid rgba(255,255,255,0.25); font-size: 7.5pt; text-transform: uppercase; color: #ffffff;">Enquiry &bull; Assessment Focus</th>
              <th style="padding: 7px 6px; width: 17%; text-align: center; border-right: 1px solid rgba(255,255,255,0.25); font-size: 7.5pt; text-transform: uppercase; color: #ffffff;">KS3 Level / Effort</th>
              <th style="padding: 7px 8px; width: 30%; text-align: left; font-size: 7.5pt; text-transform: uppercase; color: #ffffff;">Teacher Comment / Spellings</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 18.5px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 18.5px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.5pt; color: #0f284e;">Enquiry 1: Henry Cort &amp; Funtley Ironworks</div>
                <div style="font-size: 7.5pt; color: #475569; margin-top: 2px;">Explain Why: Naval Metallurgy &amp; Steam Power (1775–1787)</div>
              </td>
              <td style="padding: 18.5px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">&nbsp;</td>
              <td style="padding: 18.5px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 18.5px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 18.5px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.5pt; color: #0f284e;">Enquiry 2: Factory Work &amp; Child Labour</div>
                <div style="font-size: 7.5pt; color: #475569; margin-top: 2px;">Feature Drill &amp; Consequence: Sadler Committee &amp; 1833 Factory Act</div>
              </td>
              <td style="padding: 18.5px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">&nbsp;</td>
              <td style="padding: 18.5px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 18.5px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 18.5px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.5pt; color: #0f284e;">Enquiry 3: Urban Slums &amp; Public Health</div>
                <div style="font-size: 7.5pt; color: #475569; margin-top: 2px;">Feature Drill &amp; Consequence: Back-to-Backs &amp; Bazalgette Sewers</div>
              </td>
              <td style="padding: 18.5px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">&nbsp;</td>
              <td style="padding: 18.5px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 18.5px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 18.5px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.5pt; color: #0f284e;">Enquiry 4: Radical Protest &amp; The Swing Riots</div>
                <div style="font-size: 7.5pt; color: #475569; margin-top: 2px;">Feature Drill &amp; Narrative: Peterloo, Hampshire Swing Riots &amp; Tolpuddle</div>
              </td>
              <td style="padding: 18.5px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">&nbsp;</td>
              <td style="padding: 18.5px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 18.5px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 18.5px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.5pt; color: #0f284e;">Enquiry 5: The Road to Democracy</div>
                <div style="font-size: 7.5pt; color: #475569; margin-top: 2px;">Evaluative Statement Essay: Rotten Boroughs, 1832 Reform Act &amp; Secret Ballot</div>
              </td>
              <td style="padding: 18.5px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">&nbsp;</td>
              <td style="padding: 18.5px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
            <tr style="border-bottom: 1px solid #0f284e; background: #f0f4f9;">
              <td style="padding: 18.5px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 18.5px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.5pt; color: #0f284e;">Independent Study &amp; Notes Portfolio</div>
                <div style="font-size: 7.5pt; color: #475569; margin-top: 2px;">Pages 14–15 Enquiry Notes, Reflection &amp; Revision Tasks</div>
              </td>
              <td style="padding: 18.5px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">&nbsp;</td>
              <td style="padding: 18.5px 8px; background: #f0f4f9;">&nbsp;</td>
            </tr>
            <tr style="background: #ffffff; border-top: 1.5px solid #0f284e;">
              <td style="padding: 18.5px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 18.5px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.5pt; color: #0f284e;">Teacher-Designated Assessment Task</div>
                <div style="font-size: 7.5pt; color: #475569; margin-top: 2px;">Designated Key Enquiry Assessment (Teacher Selected)</div>
              </td>
              <td style="padding: 18.5px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">&nbsp;</td>
              <td style="padding: 18.5px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Interactive Digital Quizzing Hub -->
      <div style="border: 1.5px solid #0f284e; border-radius: 4px; padding: 6px 8px; background: #ffffff;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.2px solid #0f284e; background: #f0f4f9; padding: 3px 6px; margin-bottom: 4px; border-radius: 2px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; text-transform: uppercase; color: #0f284e;">
            📱 Interactive Digital Quizzing Hub &bull; Scan for Instant Retrieval Practice
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 800; background: #0f284e; color: #ffffff; border: 1px solid #0f284e; padding: 1px 5px; border-radius: 2px;">
            ONLINE RECALL
          </span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; text-align: center;">
          ${enquiryConfigs
            .map((cfg, idx) => {
              const quizUrl =
                'https://the-history-revision-hub.netlify.app/?unit=industrialisation_and_empire&lesson=' +
                (idx + 1) +
                '&quiz=true&count=10';
              const qrSvg = generateQrSvg(quizUrl);
              const shortLabels = [
                'Cort &amp; Steam',
                'Factory &amp; Child Labour',
                'Slums &amp; Cholera',
                'Protest &amp; Swing Riots',
                'Road to Democracy',
              ];
              return `
              <div data-qr-url="${quizUrl}" style="border: 1.2px solid #0f284e; border-radius: 3px; padding: 5px 2px; background: #ffffff; display: flex; flex-direction: column; align-items: center; justify-content: space-between;">
                <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; margin-bottom: 1px; color: #0f284e;">
                  Enquiry ${cfg.lessonNum}
                </div>
                <div style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 700; color: #475569; margin-bottom: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%;">
                  ${shortLabels[idx]}
                </div>
                <div style="width: 24mm; height: 24mm; margin: 0 auto 2px auto;">
                  ${qrSvg}
                </div>
                <span style="font-family: 'Inter', sans-serif; font-size: 6.2pt; font-weight: 800; text-transform: uppercase; background: #0f284e; color: #ffffff; padding: 1px 5px; border-radius: 2px; margin-bottom: 2px;">
                  Scan to Quiz
                </span>
                <div style="font-family: 'Inter', sans-serif; font-size: 8.5pt; font-weight: 900; color: #0f284e; margin-top: 1px; white-space: nowrap;">
                  Best Score: [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 10</strong> ]
                </div>
              </div>`;
            })
            .join('')}
        </div>
      </div>

      ${renderFooterStrip(16, 'Fareham ironmaster Henry Cort and Portsmouth Dockyard provided the metallurgical foundation that built Britain’s empire.', 16)}
    </div>
  </div>
`;

  html += `
</body>
</html>`;

  return html;
}

// ============================================================================
// MAIN COMPILATION SCRIPT
// ============================================================================
async function main() {
  console.log(
    'Rendering 16-Page A4 Pupil Workbook (Christine Counsell Standard): Industrialisation, Empire & Power: 1750–1901...',
  );

  const outDir = path.join(ROOT_DIR, 'public', 'units', 'industrialisation_and_empire');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const outHtmlPath = path.join(outDir, 'pupil_workbook.html');
  const html = compileIndustrialisationWorkbook();
  fs.writeFileSync(outHtmlPath, html, 'utf8');
  console.log(`[OK] HTML written to: ${outHtmlPath}`);

  const altUnitsDir = path.join(ROOT_DIR, 'units', 'industrialisation_and_empire');
  if (fs.existsSync(altUnitsDir)) {
    fs.writeFileSync(path.join(altUnitsDir, 'pupil_workbook.html'), html, 'utf8');
    console.log(`[OK] HTML mirrored to: ${path.join(altUnitsDir, 'pupil_workbook.html')}`);
  }

  // Compile PDFs via Puppeteer
  const pdfDir = path.join(ROOT_DIR, 'public', 'pdfs');
  if (!fs.existsSync(pdfDir)) {
    fs.mkdirSync(pdfDir, { recursive: true });
  }
  const outPdfPath = path.join(pdfDir, 'industrialisation_and_empire_pupil_workbook.pdf');

  console.log('Launching Puppeteer to generate high-resolution print PDF...');
  const chromePath =
    process.env.PUPPETEER_EXECUTABLE_PATH ||
    (fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
      ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
      : undefined);

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: chromePath,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });

  // Wait for web fonts to load
  await page.evaluateHandle('document.fonts.ready');

  await page.pdf({
    path: outPdfPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0mm',
      right: '0mm',
      bottom: '0mm',
      left: '0mm',
    },
  });

  const coverElem = await page.$('#page-1');
  if (coverElem) {
    const previewPath = path.join(
      ROOT_DIR,
      'public',
      'images',
      'industrialisation_cover_redesign_preview.png',
    );
    await coverElem.screenshot({ path: previewPath });
    const artifactDest = path.join(
      'C:\\Users\\fives\\.gemini\\antigravity-ide\\brain\\3b641322-c353-4e66-858d-2203cdb22b36',
      'industrialisation_cover_redesign_preview.png',
    );
    try {
      fs.copyFileSync(previewPath, artifactDest);
    } catch (_) {}
  }

  await browser.close();
  console.log(`[OK] Single canonical PDF compiled: ${outPdfPath}`);
}

if (require.main === module) {
  main().catch((err) => {
    console.error('Fatal error during workbook compilation:', err);
    process.exit(1);
  });
}

module.exports = { compileIndustrialisationWorkbook };
