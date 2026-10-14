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
        'To a large extent, it can be argued that... &bull; In particular, a decisive factor was... &bull; Furthermore, this created severe consequences because... &bull; On the other hand, an alternative perspective is that... &bull; In conclusion, the decisive reason why...',
      wordBank:
        'Henry Cort &bull; Funtley Ironworks &bull; River Meon &bull; puddling furnace &bull; grooved rollers &bull; wrought iron &bull; Portsmouth Dockyard &bull; Royal Navy &bull; naval self-sufficiency',
      timelineMissionTitle: 'Centrefold Sketch Challenges 1 &amp; 2',
      timelineMission:
        '<strong>Milestone 1 (Funtley Puddling Furnace &bull; 1784):</strong> Sketch ironworkers at Funtley stirring molten iron in Cort’s reverberatory furnace beside the River Meon [🔥 reverberatory furnace &bull; 🥄 puddling rod &bull; 🌊 River Meon waterwheel].<br style="display:block; margin-top:2px;"><strong>Milestone 2 (Portsmouth Dockyard Naval Trials &bull; 1787):</strong> Sketch Admiralty master smiths testing tough Funtley wrought iron anchors and mast hoops for the Royal Navy [⚓ heavy naval anchor &bull; 🔨 blacksmith anvil &bull; 🚢 warship at dockyard].',
    },
    leftPageQuip:
      'Fareham ironmaster Henry Cort produced the tough wrought iron that built the Royal Navy’s fighting ships right here along the River Meon.',
    rightPageQuip:
      'Without Henry Cort’s Funtley ironworks, Britain would have had no iron warships, no railway revolution, and no industrial supremacy.',
  },
  {
    lessonNum: 2,
    id: 'lesson_2',
    title: 'Enquiry 2: The Dark Satanic Mills: Child Labour, Slums & Public Health',
    enquiryQuestion:
      'Was industrialisation a triumph of human progress or a catastrophe of urban suffering for the working class?',
    specAnchor:
      'Factory system; factory clock & fines; child labour in textile mills & coal mines; 1832 Sadler Committee; Matthew Crabtree testimony; rapid urban growth & back-to-back housing; cholera epidemics (1831–1854); Edwin Chadwick’s 1842 Report; 1858 Great Stink & Joseph Bazalgette’s London sewer network.',
    stages: [
      {
        step: 1,
        date: '1780–1820',
        paraRef: '[2.1]',
        questionHeading:
          'How did the factory clock and machine discipline destroy traditional working rhythms?',
        bullets: ['Fourteen-Hour Work Days', 'Draconian Lateness Fines', 'Choking Fibres and Dust'],
        focusClue:
          'Why did industrial mill owners enforce rigid 14-hour working shifts under constant threat of wage deductions?',
      },
      {
        step: 2,
        date: '1832',
        paraRef: '[2.2]',
        questionHeading:
          'What shocking abuses of child labour were exposed by the parliamentary Sadler Committee?',
        bullets: [
          'Crawling Under Fast Looms',
          'Corporal Strap Punishment',
          'Physical Stunting and Deformity',
        ],
        focusClue:
          'How did 22-year-old former child worker Matthew Crabtree expose beatings, stunted growth, and exhaustion in Yorkshire mills?',
      },
      {
        step: 3,
        date: '1800–1840',
        paraRef: '[2.3]',
        questionHeading:
          'How did explosive urban growth create deadly back-to-back slums and cellar dwellings?',
        bullets: [
          'Shared Privy Contamination',
          'Accumulating Human Waste Heaps',
          'Flooded Cellar Basements',
        ],
        focusClue:
          'Why did cities like Manchester and Leeds grow tenfold without clean water pipes, drainage, or sewage disposal?',
      },
      {
        step: 4,
        date: '1831–1842',
        paraRef: '[2.4]',
        questionHeading:
          'Why did devastating cholera epidemics shatter the laissez-faire belief in minimal government?',
        bullets: [
          'Waterborne Dehydration Fatalities',
          'Sudden Twelve-Hour Collapse',
          'Chadwick Sanitary Intervention',
        ],
        focusClue:
          'How did Chadwick’s 1842 Sanitary Report prove that filth in working-class slums generated disease that threatened all classes?',
      },
      {
        step: 5,
        date: '1858–1865',
        paraRef: '[2.5]',
        questionHeading:
          'How did the 1858 Great Stink force Parliament to construct modern underground sewers?',
        bullets: [
          'Midsummer Thames Fermentation',
          'Commons Chloride Curtains',
          'Bazalgette Interceptor Tunnels',
        ],
        focusClue:
          'Why did Victorian MPs ignore cholera for thirty years until the suffocating stench of the River Thames invaded the Commons chamber?',
      },
    ],
    vocabPrompt:
      'Define <strong>Laissez-faire</strong> and explain why early Victorian governments were reluctant to regulate factories or slums:',
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
          'Explain one consequence of the 1858 Great Stink for public health in Victorian London. [4 marks]',
        hint: 'Focus on how the intolerable stench of the River Thames forced Parliament to fund Joseph Bazalgette’s monumental 1,100-mile underground interceptor sewer network.',
        stems:
          'One consequence was that... &bull; Specifically, this meant that... &bull; This affected public health because... &bull; As a result, waterborne disease...',
        connectives:
          'A significant consequence was... &bull; For instance, this meant that... &bull; This directly led to... &bull; Consequently, the overall outcome was...',
        wordBank:
          'Great Stink (1858) &bull; River Thames &bull; Joseph Bazalgette &bull; interceptor sewers &bull; cholera &bull; Edwin Chadwick &bull; public health',
      },
      timelineMissionTitle: 'Centrefold Sketch Challenge 4',
      timelineMission:
        '<strong>Milestone 4 (The Sadler Committee on Child Labour &bull; 1832):</strong> Sketch young piecers crawling beneath spinning mules while parliamentary commissioners record child testimonies [🧵 textile spinning mule &bull; 👶 child piecer crawling &bull; 📋 parliamentary report ledger].',
    },
    leftPageQuip:
      'During the 1832 cholera epidemic, life expectancy for labourers in industrial Manchester dropped to just 19 years.',
    rightPageQuip:
      'Sir Joseph Bazalgette’s 82 miles of underground brick interceptor sewers permanently banished waterborne cholera from London.',
  },
  {
    lessonNum: 3,
    id: 'lesson_3',
    title: 'Enquiry 3: Blood, Machines & Ballots: The Hampshire Swing Riots to Chartism',
    enquiryQuestion:
      'Why did British workers turn to machine-breaking and mass petitions to demand a political voice?',
    specAnchor:
      'Post-Napoleonic distress; Peterloo Massacre (1819); Six Acts; 1830 Hampshire Swing Riots (Meon Valley, Selborne, Headley, Fareham); threshing machine destruction; Winchester Special Assizes trials & penal transportation; 1832 Great Reform Act; 1834 Tolpuddle Martyrs; 1838 People’s Charter; Moral vs Physical Force Chartism; 1839 Newport Rising.',
    stages: [
      {
        step: 1,
        date: '1819',
        paraRef: '[3.1]',
        questionHeading: 'Why did the Peterloo Massacre ignite widespread working-class outrage?',
        bullets: [
          'Peaceful St Peter’s Field Crowd',
          'Magistrate Cavalry Sabre Charge',
          'Trampled Reform Protesters',
        ],
        focusClue:
          'Why did magistrates order cavalry to charge a peaceful meeting of 60,000 cotton workers calling for parliamentary reform?',
      },
      {
        step: 2,
        date: 'Nov 1830',
        paraRef: '[3.2]',
        questionHeading:
          'How did the "Captain Swing" riots sweep through Hampshire and the Meon Valley?',
        bullets: [
          'Starvation Winter Destitution',
          'Sledgehammer Threshing Destruction',
          'Nocturnal Hayrick Arson',
        ],
        focusClue:
          'Why did starving agricultural labourers target threshing machines that stole their winter wages across Hampshire villages?',
      },
      {
        step: 3,
        date: 'Dec 1830',
        paraRef: '[3.3]',
        questionHeading:
          'How brutally did the Winchester Special Assizes punish Hampshire machine-breakers?',
        bullets: [
          'Winchester Great Hall Trials',
          'Australian Penal Transportation',
          'Micheldever Ploughboy Execution',
        ],
        focusClue:
          'Why did the British state impose draconian death and transportation sentences on rural workers at Winchester Great Hall?',
      },
      {
        step: 4,
        date: '1832',
        paraRef: '[3.4]',
        questionHeading:
          'Why was the 1832 Great Reform Act condemned as a betrayal of working men?',
        bullets: [
          'Disenfranchised Rotten Boroughs',
          'Ten-Pound Property Threshold',
          'Working-Class Disenfranchisement',
        ],
        focusClue:
          'Why did industrial workers who fought for the Reform Bill find themselves completely disenfranchised by property qualifications?',
      },
      {
        step: 5,
        date: '1838–1848',
        paraRef: '[3.5]',
        questionHeading:
          'How did the Chartist movement mobilize millions to demand universal democracy?',
        bullets: [
          'Six-Point Democratic Charter',
          'Million-Signature Monster Petitions',
          'State Troops Guarding Westminster',
        ],
        focusClue:
          'How did William Lovett and Feargus O’Connor unite British workers around secret ballots, equal constituencies, and salaries for MPs?',
      },
    ],
    vocabPrompt:
      'Define <strong>Captain Swing</strong> and explain why agricultural workers in the Meon Valley turned to machine-breaking in 1830:',
    rightPage: {
      type: 'split',
      partA: {
        tariff: 'Question 2: Narrative Account [8 marks &bull; 10 mins]',
        badge: 'PART A &bull; NARRATIVE',
        question:
          'Write a narrative account analysing the key events leading from the Peterloo Massacre (1819) and Hampshire Swing Riots (1830) to the publication of the People’s Charter (1838). [8 marks]',
        stimulus: [
          'The Hampshire Swing Riots and machine-breaking (1830)',
          'The 1832 Great Reform Act and exclusion of working men',
        ],
        connectives:
          'The sequence began when... &bull; This led to increasing conflict because... &bull; A decisive turning point occurred when... &bull; This directly caused... &bull; Consequently, this culminated in...',
        wordBank:
          'Peterloo (1819) &bull; Hampshire Swing Riots (1830) &bull; threshing machines &bull; Winchester Assizes &bull; 1832 Great Reform Act &bull; People’s Charter (1838) &bull; William Lovett',
      },
      partB: {
        tariff: 'Question 3: Explain Importance [8 marks &bull; 10 mins]',
        badge: 'PART B &bull; IMPORTANCE',
        question:
          'Explain the importance of the Hampshire Swing Riots (1830) and the Chartist movement for the growth of working-class democracy in 19th-century Britain. [8 marks]',
        connectives:
          'This was of vital importance because... &bull; Prior to this development, the situation had been... &bull; As a result of this action, the response was... &bull; Consequently, the long-term impact was...',
        wordBank:
          'Captain Swing &bull; Meon Valley &bull; machine-breaking &bull; Winchester Assizes &bull; universal male suffrage &bull; secret ballot &bull; working-class solidarity',
      },
      timelineMissionTitle: 'Centrefold Sketch Challenges 3 &amp; 5',
      timelineMission:
        '<strong>Milestone 3 (The Hampshire Swing Riots &bull; 1830):</strong> Sketch farm labourers with sledgehammers breaking a wooden threshing machine beside a Hampshire barn [🔨 heavy sledgehammer &bull; 🌾 shattered threshing drum &bull; ✉️ threatening "Swing" letter].<br style="display:block; margin-top:2px;"><strong>Milestone 5 (The People’s Charter &bull; 1838):</strong> Sketch William Lovett presenting the six-point People’s Charter petition roll to a crowd of industrial workers [📜 six-point charter petition &bull; 👥 assembled crowd of factory workers &bull; 🗳️ secret ballot box].',
    },
    leftPageQuip:
      'At the 1830 Winchester Assizes, 19-year-old Henry Cook of Micheldever was hanged for striking a magistrate’s hat during the Swing Riots.',
    rightPageQuip:
      'Although Parliament rejected all three Chartist petitions, five of the Six Points eventually became British law.',
  },
  {
    lessonNum: 4,
    id: 'lesson_4',
    title: 'Enquiry 4: Steam, Steel & Empire: HMS Warrior & The 1857 Indian Rebellion',
    enquiryQuestion:
      'How did industrial technology sustain the British Empire, and why did Indian soldiers rebel in 1857?',
    specAnchor:
      'British imperial expansion; East India Company corporate rule; doctrine of lapse; 1857 Indian Rebellion (First War of Independence); greased Enfield cartridges; Meerut outbreak; Rani Lakshmibai of Jhansi; 1858 Government of India Act (The British Raj); steam power, telegraph cables & railways; 1860 HMS Warrior at Portsmouth Royal Dockyard.',
    stages: [
      {
        step: 1,
        date: '1757–1850',
        paraRef: '[4.1]',
        questionHeading:
          'How did the East India Company transform from commercial merchants into imperial rulers?',
        bullets: [
          'Chartered Corporate Monopolies',
          'Doctrine of Lapse Annexations',
          'Mercenary Sepoy Armed Subjugation',
        ],
        focusClue:
          'How did corporate rule through 200,000 Indian sepoys subjugate a subcontinent of 200 million people?',
      },
      {
        step: 2,
        date: 'May 1857',
        paraRef: '[4.2]',
        questionHeading: 'Why did greased cartridges spark the spontaneous rebellion at Meerut?',
        bullets: [
          'Animal Fat Rifle Envelopes',
          'Religious Desecration Fears',
          'Meerut Cantonment Mutiny',
        ],
        focusClue:
          'Why did Indian soldiers believe the new rifle cartridges were a deliberate British plot to destroy their Hindu and Muslim faiths?',
      },
      {
        step: 3,
        date: '1857–1858',
        paraRef: '[4.3]',
        questionHeading:
          'How did the rebellion spread and how did Rani of Jhansi resist British forces?',
        bullets: [
          'Northern Gangetic Plain Uprising',
          'Jhansi Armed Fortress Resistance',
          'Cavalry Martyrdom in Battle',
        ],
        focusClue:
          'Why did the 29-year-old Rani of Jhansi ride into battle against British forces after her kingdom was illegally annexed?',
      },
      {
        step: 4,
        date: '1858',
        paraRef: '[4.4]',
        questionHeading:
          'Why did the rebellion force Parliament to dismantle the East India Company and declare the British Raj?',
        bullets: [
          'Dissolution of Corporate Rule',
          'Government of India Act',
          'Direct Crown Imperial Governance',
        ],
        focusClue:
          'Why did the British state strip the company of power and promise religious neutrality under direct royal rule?',
      },
      {
        step: 5,
        date: '1860',
        paraRef: '[4.5]',
        questionHeading:
          'How did HMS Warrior at Portsmouth Dockyard demonstrate unbeatable British naval dominance?',
        bullets: [
          'Armoured Ironclads in the Solent',
          'High-Speed Rotary Steam Propulsion',
          'Deterrence of Foreign European Fleets',
        ],
        focusClue:
          'How did Henry Cort’s wrought iron metallurgy enable Britain to build an invincible warship that secured global empire?',
      },
    ],
    vocabPrompt:
      'Define <strong>The British Raj</strong> and explain why direct Crown control replaced East India Company rule after 1857:',
    rightPage: {
      type: 'interpretations',
      tariff: 'Question 3(b) & 3(c): Contrasting Interpretations [8 marks &bull; 10 mins]',
      interpretation1: {
        author: 'Historian Niall Ferguson, Empire: How Britain Made the Modern World (2003)',
        text: '“The British Empire was the pioneer of global modernization. By constructing railways, telegraph networks, steamship routes, and establishing common law, Britain brought governance, modern infrastructure, and global trade to a quarter of the world’s population. Without the Pax Britannica, the globalization of free markets and technology would have been delayed by generations.”',
      },
      interpretation2: {
        author: 'Historian Shashi Tharoor, Inglorious Empire: What the British Did to India (2017)',
        text: '“British rule was not a philanthropic modernization project; it was ruthless economic extraction enforced by military terror. India’s share of the global economy fell from 27% to under 3% under British rule, as indigenous textile weaving was destroyed to serve British cotton mills. The railways were built not to benefit Indians, but to rush British troops to quell rebellions and extract raw commodities to ports.”',
      },
      questionB:
        'Explain how Interpretations 1 and 2 differ on the motives and consequences of the British Empire. [4 marks]',
      stemsB:
        'Interpretations 1 and 2 differ on... &bull; Interpretation 1 portrays the British Empire as... &bull; In contrast, Interpretation 2 argues that British rule was...',
      questionC:
        'Suggest one reason why Interpretations 1 and 2 differ on British imperial rule. [4 marks]',
      stemsC:
        'One reason why Interpretations 1 and 2 differ is because of the authors’ distinct historical perspectives and selection of evidence... &bull; Specifically, the author of Interpretation 1 emphasizes... whereas the author of Interpretation 2 focuses upon... &bull; Consequently, their conclusions differ because...',
      timelineMissionTitle: 'Centrefold Sketch Challenges 7 &amp; 8',
      timelineMission:
        '<strong>Milestone 7 (The 1857 Indian Rebellion at Meerut):</strong> Sketch sepoys breaking open the ammunition depot at Meerut refusing greased rifle cartridges [🔫 Enfield rifle &amp; cartridge &bull; 🚩 sepoy rebel standard &bull; 🏛️ Meerut cantonment gates].<br style="display:block; margin-top:2px;"><strong>Milestone 8 (HMS Warrior at Portsmouth &bull; 1860):</strong> Sketch the black ironclad hull and steam-funnel of HMS Warrior sailing into the Solent off Portsmouth [🚢 iron-hulled warship HMS Warrior &bull; ☁️ steam engine smokestack &bull; 🌊 Solent waves].',
    },
    leftPageQuip:
      'HMS Warrior at Portsmouth was so heavily armoured and fast that no enemy warship in the world ever dared fire a single shot at her.',
    rightPageQuip:
      'By 1900, the British Empire encompassed 400 million subjects across five continents, protected by the Royal Navy’s iron fleet.',
  },
  {
    lessonNum: 5,
    id: 'lesson_5',
    title: 'Enquiry 5: The Victorian Verdict: Workshop of the World or Age of Exploitation?',
    enquiryQuestion:
      'Did the Industrial Revolution bring unprecedented progress or human catastrophe to the British people?',
    specAnchor:
      '1851 Great Exhibition at Crystal Palace; Prince Albert & industrial prestige; British railway boom (Brunel & Stephenson); rise of the middle class; enduring poverty & Charles Booth’s London poverty maps (1889); Factory Acts & trade unions; synoptic evaluation of industrial capitalism.',
    stages: [
      {
        step: 1,
        date: '1851',
        paraRef: '[5.1]',
        questionHeading:
          'How did the 1851 Great Exhibition proclaim Britain "Workshop of the World"?',
        bullets: [
          'Cast Iron and Glass Crystal Palace',
          'Six Million Astonished Spectators',
          'Steam Locomotives and Machine Tools',
        ],
        focusClue:
          'How did Joseph Paxton’s revolutionary glass-and-iron palace showcase British technological supremacy to the globe?',
      },
      {
        step: 2,
        date: '1840–1880',
        paraRef: '[5.2]',
        questionHeading:
          'How did the railway boom transform British commerce, landscape, and society?',
        bullets: [
          'Nationwide Permanent Iron Rails',
          'Perishable Goods Rapid Transit',
          'Greenwich Standard Railway Time',
        ],
        focusClue:
          'How did 20,000 miles of iron tracks knit Britain into a single, high-speed national economy?',
      },
      {
        step: 3,
        date: '1860–1890',
        paraRef: '[5.3]',
        questionHeading:
          'How did the rise of the Victorian middle class reshape wealth and social power?',
        bullets: [
          'Manufacturing Bourgeois Wealth',
          'Suburban Villas and Domestic Staff',
          'Displacement of Landed Aristocracy',
        ],
        focusClue:
          'Why did industrialists and merchants displace the landed aristocracy as the true rulers of Victorian Britain?',
      },
      {
        step: 4,
        date: '1889',
        paraRef: '[5.4]',
        questionHeading:
          'How did Charles Booth’s poverty maps expose persistent deprivation in Victorian London?',
        bullets: [
          'Empirical Door-to-Door Social Survey',
          'Black-Striped Chronic Poverty Maps',
          'Thirty-Percent Squalor Reality',
        ],
        focusClue:
          'How did Booth’s scientific colour-coded street maps shatter complacency by proving millions lived in chronic squalor?',
      },
      {
        step: 5,
        date: '1750–1901',
        paraRef: '[5.5]',
        questionHeading:
          'The Victorian Verdict: How do historians judge the balance of progress versus human suffering?',
        bullets: [
          'Global Mass Manufactured Goods',
          'Stunted Lifespans in Urban Smog',
          'Statutory Factory Act Protections',
        ],
        focusClue:
          'Did the long-term gains of modern medicine, technology, and democracy justify four generations of working-class sacrifice?',
      },
    ],
    vocabPrompt:
      'Define the <strong>Standard of Living Debate</strong> and contrast the "Optimist" and "Pessimist" historical perspectives:',
    rightPage: {
      type: 'single_12',
      tariff: 'Question 5: Evaluative Statement Essay [12 marks &bull; 15 mins]',
      examStem:
        '“The Industrial Revolution was a triumphant era of human progress and national prosperity for the British people.” How far do you agree with this statement? Explain your answer. [12 marks]',
      stimulus: [
        'James Watt’s steam engines, Cort’s Funtley iron & the 1851 Great Exhibition',
        'Child labour in textile mills, back-to-back slums & Charles Booth’s poverty map',
      ],
      rubricCards: [
        {
          col: '1. INDUSTRIAL PROGRESS & WEALTH',
          text: 'Explain how steam power, Cort’s Funtley iron, railways, and mechanisation transformed Britain into the ‘Workshop of the World’ with cheap goods.',
        },
        {
          col: '2. HUMAN SUFFERING & EXPLOITATION',
          text: 'Explain how factory discipline, child labour (Sadler Report), deadly slums, and cholera epidemics devastated working-class health and lives.',
        },
        {
          col: '3. COMPARATIVE VERDICT',
          text: 'Weigh whether immediate human suffering outweighed long-term societal progress, considering class divisions and government reforms.',
        },
      ],
      connectives:
        'To a large extent, it can be argued that... &bull; In particular, a decisive factor was... &bull; Furthermore, this created severe consequences because... &bull; On the other hand, an alternative perspective is that... &bull; In conclusion, the decisive reason why...',
      wordBank:
        'Henry Cort &bull; Funtley Ironworks &bull; puddling furnace &bull; steam power &bull; Sadler Committee &bull; back-to-back slums &bull; cholera &bull; Great Exhibition &bull; Charles Booth &bull; Standard of Living debate',
      timelineMissionTitle: 'Centrefold Sketch Challenge 6',
      timelineMission:
        '<strong>Milestone 6 (The Great Exhibition at Crystal Palace &bull; 1851):</strong> Sketch the towering cast-iron and glass arches of the Crystal Palace with Victorian visitors marveling at steam engines [🏛️ glass Crystal Palace transept &bull; ⚙️ giant steam engine flywheel &bull; 🎩 Victorian gentlemen &amp; ladies].',
    },
    leftPageQuip:
      'At the 1851 Great Exhibition, six million people—a third of Britain’s entire population—visited the Crystal Palace in London.',
    rightPageQuip:
      'The debate between "Optimist" and "Pessimist" historians over the Industrial Revolution remains one of the fiercest arguments in modern history.',
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
                <span style="font-family: 'Inter', sans-serif; font-size: 8.4pt; font-weight: 800; color: #000000; word-break: break-word;">${b}</span>
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
              <span style="font-family: 'Inter', sans-serif; font-size: 8.6pt; font-weight: 800; color: #ffffff; white-space: nowrap; overflow: hidden; letter-spacing: -0.1px;">
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
      
      <!-- Lesson Header with Inquiry Question Title -->
      <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 2px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 8.0pt; font-weight: 900; letter-spacing: 0.5px; text-transform: uppercase; background: #000000; color: #ffffff; border: 1.2px solid #000000; padding: 1.5px 7px; border-radius: 2px;">
            ENQUIRY ${cfg.lessonNum} &bull; LESSON NOTEBOOK
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 8.0pt; font-weight: 800; text-transform: uppercase; color: #000000;">
            YEAR 8 &bull; INDUSTRIALISATION, EMPIRE &amp; POWER (1750–1901)
          </span>
        </div>
        <h2 style="font-family: 'Playfair Display', serif; font-size: 12.2pt; color: #000000; margin: 1px 0 1px 0; font-weight: 900; line-height: 1.2;">
          ${cfg.enquiryQuestion}
        </h2>
      </div>

      <!-- Specification Focus Strip -->
      <div style="border: 1px solid #000000; border-left: 3.5px solid #000000; padding: 2.5px 7px; background: #ffffff; margin-bottom: 2px; font-family: 'Inter', sans-serif; font-size: 8.4pt; line-height: 1.26; color: #000000;">
        <strong style="color: #000000;">Core Specification Focus:</strong> ${cfg.specAnchor}
      </div>

      <!-- Chronological Inquiry Spine & Note-Taking Canvas -->
      <div style="flex: 1; display: flex; flex-direction: column; min-height: 0; margin-top: 1px;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid #000000; padding: 1px 0; margin-bottom: 2px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; color: #000000;">
            Chronological Inquiry Spine &bull; Core Causal Narrative
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-style: italic; color: #000000;">
            Construct your causal explanation for each stage incorporating the core trigger terms
          </span>
        </div>

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
        <div style="font-family: 'Playfair Display', serif; font-size: 11.0pt; font-weight: 900; color: #000000; margin-bottom: 4px; line-height: 1.3;">
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
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.6pt; font-weight: 900; text-transform: uppercase; display: block; margin-bottom: 2px; color: #000000;">Analytical Connectives:</strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 8.2pt; font-style: italic; line-height: 1.26; display: block; color: #000000;">${rp.connectives}</span>
        </div>
        <div>
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.6pt; font-weight: 900; text-transform: uppercase; display: block; margin-bottom: 2px; color: #000000;">Key Vocabulary Bank:</strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 8.2pt; line-height: 1.26; display: block; color: #000000;">${rp.wordBank}</span>
        </div>
      </div>

      <!-- Ruled Writing Lines (21 Lines for 12-Mark Extended Essay) -->
      <div style="font-family: 'Inter', sans-serif; font-size: 8.2pt; font-style: italic; color: #000000; margin-bottom: 2px;">
        <strong style="color: #000000;">Task:</strong> Using the vocabulary and connectives above, write your analytical response below:
      </div>
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0; border-top: 1.2px solid #000000; margin-bottom: 4px;">
        ${Array(21)
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
          ${Array(12)
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
          ${Array(12)
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
          <h2 style="font-family: 'Playfair Display', serif; font-size: 10.5pt; color: #000000; margin: 0; font-weight: 900;">
            ${rp.partA.tariff}
          </h2>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 800; background: #000000; color: #ffffff; padding: 1px 6px; border-radius: 2px; text-transform: uppercase;">
            ${rp.partA.badge || 'DISCIPLINARY DRILL'}
          </span>
        </div>
        <div style="font-family: 'Playfair Display', serif; font-size: 9.0pt; font-weight: 900; color: #000000; line-height: 1.24; margin-bottom: 1px;">
          ${rp.partA.question}
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-style: italic; color: #000000; line-height: 1.18; margin-bottom: 2px;">
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
          <div style="font-family: 'Playfair Display', serif; font-size: 9.0pt; font-weight: 900; color: #000000; line-height: 1.24; margin-bottom: 2px;">
            ${rp.partB.question}
          </div>
          ${
            rp.partB.stimulus
              ? `
          <div style="display: flex; align-items: center; gap: 6px; font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #000000; margin-bottom: 2px;">
            <strong style="color: #000000;">Stimulus:</strong>
            <span style="border: 1px solid #000000; padding: 1px 6px; border-radius: 2px; font-weight: 800; color: #000000; background: #ffffff;">${rp.partB.stimulus[0]}</span>
            <span style="border: 1px solid #000000; padding: 1px 6px; border-radius: 2px; font-weight: 800; color: #000000; background: #ffffff;">${rp.partB.stimulus[1]}</span>
          </div>`
              : ''
          }
          <div style="border: 1px solid #000000; border-radius: 3px; padding: 3px 6px; background: #ffffff; margin-bottom: 3px; font-family: 'Inter', sans-serif; font-size: 7.2pt; line-height: 1.22;">
            ${rp.partB.connectives ? `<div><strong style="color: #000000;">Analytical Connectives:</strong> <em style="color: #000000;">${rp.partB.connectives}</em></div>` : ''}
            ${rp.partB.stems ? `<div><strong style="color: #000000;">Sentence Stems:</strong> <span style="color: #000000;">${rp.partB.stems}</span></div>` : ''}
            ${rp.partB.wordBank ? `<div style="margin-top: 1px;"><strong style="color: #000000;">Key Terms:</strong> <span style="color: #000000;">${rp.partB.wordBank}</span></div>` : ''}
          </div>
        </div>

        <!-- Ruled Writing Lines (22 Lines • Calibrated ~8.2mm GCSE pitch) -->
        <div style="display: flex; flex-direction: column; gap: 0; margin-bottom: 3px; flex: 1; min-height: 0;">
          ${Array(22)
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

      <!-- Prominent Primary Visual Source Centerpiece (Coalbrookdale by Night Plate) -->
      <div style="margin: 2px 0 5px 0; border: 1.5px solid #0f284e; border-radius: 4px; overflow: hidden; background: #ffffff;">
        <div style="display: grid; grid-template-columns: 70mm 1fr; background: #ffffff;">
          <!-- Left: Full Visual Canvas -->
          <div style="background: #fcfbf9; border-right: 1.5px solid #0f284e; display: flex; justify-content: center; align-items: center; padding: 2px 3px;">
            <img src="${coverImgBase64}" alt="Coalbrookdale by Night 1801" style="height: 103mm; width: auto; max-width: 100%; object-fit: contain; display: block; margin: 0 auto; border: 1.2px solid #0f284e; border-radius: 2px; box-shadow: 0 2px 6px rgba(15,40,78,0.22);">
          </div>
          <!-- Right: Visual Iconography & Historical Significance for Year 8 -->
          <div style="padding: 6px 10px; display: flex; flex-direction: column; justify-content: space-between; background: #ffffff; box-sizing: border-box;">
            <!-- 1. Header -->
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.2px solid #0f284e; padding-bottom: 2px;">
              <span style="font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 900; text-transform: uppercase; color: #0f284e; letter-spacing: 0.5px;">
                Primary Visual Evidence &bull; Industrial Sublime
              </span>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; color: #64748b;">
                Philip James de Loutherbourg, RA (1801)
              </span>
            </div>

            <!-- 2. Statecraft Context -->
            <p style="font-family: 'Georgia', serif; font-size: 7.5pt; line-height: 1.3; color: #1e293b; margin: 0;">
              In 1801, Philip James de Loutherbourg captured the Madeley Wood (Bedlam) ironworks in Coalbrookdale, Shropshire. Depicting the blazing coke blast furnaces illuminating the nighttime sky, the painting stands as the definitive visual monument of Britain’s dawn as the world’s first industrial superpower:
            </p>

            <!-- 3. Four Core Analytical Features -->
            <div style="display: flex; flex-direction: column; gap: 3px;">
              <div style="border-left: 2.5px solid #0f284e; padding-left: 6px;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 7.1pt; text-transform: uppercase; color: #0f284e;">1. Blazing Coke Blast Furnaces:</strong>
                <div style="font-family: 'Georgia', serif; font-size: 7pt; line-height: 1.22; color: #222222;">
                  Violent orange and crimson flames erupt from open furnace tops, symbolising the substitution of timber by coal and coke smelting.
                </div>
              </div>
              <div style="border-left: 2.5px solid #0f284e; padding-left: 6px;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 7.1pt; text-transform: uppercase; color: #0f284e;">2. Choking Plumes &amp; Nocturnal Sky:</strong>
                <div style="font-family: 'Georgia', serif; font-size: 7pt; line-height: 1.22; color: #222222;">
                  Dense billowing black smoke obscures the moonlit sky, capturing the dramatic Sublime power and environmental reality of heavy industry.
                </div>
              </div>
              <div style="border-left: 2.5px solid #0f284e; padding-left: 6px;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 7.1pt; text-transform: uppercase; color: #0f284e;">3. Cast Engine Boilers &amp; Slag:</strong>
                <div style="font-family: 'Georgia', serif; font-size: 7pt; line-height: 1.22; color: #222222;">
                  Foreground heaps of newly cast cylindrical steam engine boilers, pipes, and cooling slag illustrate mass metallurgical production.
                </div>
              </div>
              <div style="border-left: 2.5px solid #0f284e; padding-left: 6px;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 7.1pt; text-transform: uppercase; color: #0f284e;">4. Horse Carter &amp; Muscle Power:</strong>
                <div style="font-family: 'Georgia', serif; font-size: 7pt; line-height: 1.22; color: #222222;">
                  A carter guiding workhorses hauling goods highlights the historic threshold between organic animal labor and mechanized steam power.
                </div>
              </div>
            </div>

            <!-- 4. Three-Pillar Analytical Matrix -->
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 4px; padding-top: 3px; border-top: 1px solid #cbd5e1;">
              <div style="border: 1px solid #0f284e; border-radius: 2px; padding: 2.5px 5px; background: #f0f4f9;">
                <div style="font-family: 'Inter', sans-serif; font-size: 6.4pt; font-weight: 900; text-transform: uppercase; color: #0f284e;">Fossil &amp; Steam</div>
                <div style="font-family: 'Georgia', serif; font-size: 6.4pt; line-height: 1.15; color: #1e293b; margin-top: 1px;">Coal, coke smelting &amp; Watt’s rotary steam engines.</div>
              </div>
              <div style="border: 1px solid #0f284e; border-radius: 2px; padding: 2.5px 5px; background: #f0f4f9;">
                <div style="font-family: 'Inter', sans-serif; font-size: 6.4pt; font-weight: 900; text-transform: uppercase; color: #0f284e;">Metallurgy</div>
                <div style="font-family: 'Georgia', serif; font-size: 6.4pt; line-height: 1.15; color: #1e293b; margin-top: 1px;">Cort’s puddling &amp; rolling at Funtley transforming iron.</div>
              </div>
              <div style="border: 1px solid #0f284e; border-radius: 2px; padding: 2.5px 5px; background: #f0f4f9;">
                <div style="font-family: 'Inter', sans-serif; font-size: 6.4pt; font-weight: 900; text-transform: uppercase; color: #0f284e;">Class Struggle</div>
                <div style="font-family: 'Georgia', serif; font-size: 6.4pt; line-height: 1.15; color: #1e293b; margin-top: 1px;">Swing Riots, child labour &amp; the fight for democracy.</div>
              </div>
            </div>

            <!-- 5. Disciplinary Significance Anchor -->
            <div style="font-family: 'Inter', sans-serif; font-size: 6.4pt; color: #1e293b; line-height: 1.25; background: #f0f4f9; border-left: 2.5px solid #0f284e; padding: 2px 6px;">
              <strong style="text-transform: uppercase; color: #0f284e;">Disciplinary Significance:</strong> Loutherbourg’s masterpiece captures the Industrial Sublime—a fusion of awe and terror—symbolizing the dawn of an Anthropocene era in which human technological mastery eclipsed natural biological limits.
            </div>

            <!-- 6. Targeted Disciplinary Hinge Question -->
            <div style="background: #ffffff; border: 1.2px solid #0f284e; border-radius: 3px; padding: 3px 6px;">
              <div style="display: flex; justify-content: space-between; align-items: baseline;">
                <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 900; text-transform: uppercase; color: #0f284e;">Disciplinary Hinge Question:</span>
                <span style="font-family: 'Inter', sans-serif; font-size: 6.2pt; font-weight: 700; color: #64748b; text-transform: uppercase;">Historical Evaluation</span>
              </div>
              <div style="font-family: 'Georgia', serif; font-size: 6.9pt; font-style: italic; color: #1e293b; line-height: 1.2; margin-top: 1px;">
                Does Loutherbourg depict Coalbrookdale as an apocalyptic vision of hell and human suffering, or as a heroic celebration of British technological mastery and industrial progress?
              </div>
            </div>
          </div>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #ffffff; padding: 3px 8px; border-top: 1.5px solid #0f284e; background: #0f284e;">
          <span><strong>Primary Visual Evidence:</strong> <em>Coalbrookdale by Night</em> (1801) &bull; Philip James de Loutherbourg, RA</span>
          <span style="font-weight: 700; color: #93c5fd;">SCIENCE MUSEUM, LONDON &bull; OBJECT NO. 1952-452 &bull; OIL ON CANVAS (68 &times; 107 CM)</span>
        </div>
      </div>

      <!-- Disciplinary Strategy Overview & Workbook Blueprint -->
      <div style="border: 1.2px solid #0f284e; border-radius: 4px; padding: 5px 8px; background: #f0f4f9; margin: 3px 0 6px 0; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px;">
        <div style="border-right: 1px solid #cbd5e1; padding-right: 6px;">
          <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; color: #0f284e;">
            1. Chronological Spines [Enquiries 1–5]
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 6.8pt; line-height: 1.2; color: #1e293b; margin-top: 1px;">
            Structured chronological note-taking on each left page: 5 causal stages guiding pupil understanding as the teacher narrates the history.
          </div>
        </div>
        <div style="border-right: 1px solid #cbd5e1; padding-right: 6px;">
          <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; color: #0f284e;">
            2. Disciplinary Writing Practice [4m, 8m, 12m]
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 6.8pt; line-height: 1.2; color: #1e293b; margin-top: 1px;">
            Targeted extended writing on each right page: causal explanation, narrative account, difference, and evaluative statement essay.
          </div>
        </div>
        <div>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; color: #0f284e;">
            3. Centrefold Timeline &amp; Notes Portfolio
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 6.8pt; line-height: 1.2; color: #1e293b; margin-top: 1px;">
            Centrefold Living Timeline dual-coding sketchpads (pp. 8–9) and dedicated lined notes &amp; essay planning pages (pp. 14–15).
          </div>
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
              <td style="padding: 10.5px 10px; border-right: 1.2px solid #cbd5e1;">
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
              <td style="padding: 10.5px 10px; border-right: 1.2px solid #cbd5e1;">
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
              <td style="padding: 10.5px 10px; border-right: 1.2px solid #cbd5e1;">
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
              <td style="padding: 10.5px 10px; border-right: 1.2px solid #cbd5e1;">
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
              <td style="padding: 10.5px 10px; border-right: 1.2px solid #cbd5e1;">
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
  <!-- PAGE 8: LIVING TIMELINE PART 1 (MILESTONES 1–4: 1784–1832) (MONOCHROME) -->
  <div class="page page-container verso-page" id="page-8" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div>
        <div style="border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 5px;">
          <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 11.8pt; color: #000000; text-transform: uppercase; font-weight: 900; letter-spacing: 0.5px;">
            Living Timeline &bull; Part 1: Metallurgy, Machine Power &amp; Agrarian Revolt (1784–1832)
          </h2>
        </div>

        <div style="border: 1.2px solid #000000; border-radius: 3px; background: #ffffff; padding: 3px 6px; margin-bottom: 6px; font-family: 'Inter', sans-serif; font-size: 8.2pt; color: #000000;">
          <strong style="color: #000000;">Living Timeline Dual-Coding Protocol:</strong> Complete each milestone sketchpad using dual-coding (combining visual storytelling symbols, causal arrows, and dates) to master the chronological spine across the centre-fold.
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
          <p style="font-family: 'Georgia', serif; font-size: 8.8pt; color: #000000; margin: 0; line-height: 1.3;">
            Fareham ironmaster Henry Cort invents the reverberatory puddling furnace and grooved rolling mill along the River Meon, enabling Britain to produce tough naval wrought iron from domestic coal and ending reliance on Baltic imports.
          </p>
        </div>

        <!-- Milestone 2: 1787 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 10.0pt; font-weight: 900; color: #000000;">
              1787 &bull; Portsmouth Royal Dockyard Naval Trials
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; background: #000000; color: #ffffff; border: 1px solid #000000; padding: 1px 6px; border-radius: 2px;">Enquiry 1</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.8pt; color: #000000; margin: 0; line-height: 1.3;">
            Admiralty master smiths at Portsmouth Dockyard conduct rigorous metallurgical tests on Funtley iron, proving it fully equal to Swedish Orgrounds iron for ship anchors, mast hoops, and naval fittings for the Royal Navy.
          </p>
        </div>

        <!-- Milestone 3: 1830 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 10.0pt; font-weight: 900; color: #000000;">
              1830 &bull; The Hampshire "Captain Swing" Riots
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; background: #000000; color: #ffffff; border: 1px solid #000000; padding: 1px 6px; border-radius: 2px;">Enquiry 3</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.8pt; color: #000000; margin: 0; line-height: 1.3;">
            Starving farm labourers in the Meon Valley, Selborne, and Fareham smash threshing machines and burn ricks under the mythical name "Captain Swing"; the Winchester Assizes sentences 101 men to penal transportation to Australia.
          </p>
        </div>

        <!-- Milestone 4: 1832 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 10.0pt; font-weight: 900; color: #000000;">
              1832 &bull; The Sadler Committee on Child Labour
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; background: #000000; color: #ffffff; border: 1px solid #000000; padding: 1px 6px; border-radius: 2px;">Enquiry 2</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.8pt; color: #000000; margin: 0; line-height: 1.3;">
            Michael Sadler’s parliamentary committee publishes horrifying eyewitness testimony of 14-hour days, physical beatings, and crippling injuries suffered by child piecers and scavengers in northern textile mills, spurring the Factory Acts.
          </p>
        </div>

      </div>

      ${renderFooterStrip(8, 'Centrefold timeline: Dual-coding sketches and dates turns narrative history into permanent long-term memory.', 16)}
    </div>
  </div>

  <!-- PAGE 9: LIVING TIMELINE PART 2 (MILESTONES 5–8: 1838–1860) (MONOCHROME) -->
  <div class="page page-container recto-page" id="page-9" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div>
        <div style="border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 5px;">
          <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 11.8pt; color: #000000; text-transform: uppercase; font-weight: 900; letter-spacing: 0.5px;">
            Living Timeline &bull; Part 2: Reform, Rebellion &amp; Ironclad Supremacy (1838–1860)
          </h2>
        </div>

        <div style="border: 1.2px solid #000000; border-radius: 3px; background: #ffffff; padding: 3px 6px; margin-bottom: 6px; font-family: 'Inter', sans-serif; font-size: 8.2pt; color: #000000;">
          <strong style="color: #000000;">Living Timeline Dual-Coding Protocol:</strong> Complete each milestone sketchpad using dual-coding (combining visual storytelling symbols, causal arrows, and dates) to master the chronological spine across the centre-fold.
        </div>
      </div>

      <!-- 4 Milestones with Open Drawing Area Across Full A4 Page -->
      <div style="display: flex; flex-direction: column; flex: 1; justify-content: space-between;">
        
        <!-- Milestone 5: 1838 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 10.0pt; font-weight: 900; color: #000000;">
              1838 &bull; The People’s Charter &amp; Chartist Petitions
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; background: #000000; color: #ffffff; border: 1px solid #000000; padding: 1px 6px; border-radius: 2px;">Enquiry 3</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.8pt; color: #000000; margin: 0; line-height: 1.3;">
            William Lovett and the London Working Men’s Association publish the People’s Charter demanding six points: universal male suffrage, secret ballots, equal constituencies, and salaries for MPs; uniting millions of industrial workers.
          </p>
        </div>

        <!-- Milestone 6: 1851 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 10.0pt; font-weight: 900; color: #000000;">
              1851 &bull; The Great Exhibition at Crystal Palace
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; background: #000000; color: #ffffff; border: 1px solid #000000; padding: 1px 6px; border-radius: 2px;">Enquiry 5</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.8pt; color: #000000; margin: 0; line-height: 1.3;">
            Prince Albert opens the monumental glass-and-iron Crystal Palace in Hyde Park; six million visitors marvel at steam engines, machine tools, and imperial exhibits, proclaiming Victorian Britain the "Workshop of the World".
          </p>
        </div>

        <!-- Milestone 7: 1857 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 10.0pt; font-weight: 900; color: #000000;">
              1857 &bull; The Indian Rebellion &amp; End of Company Rule
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; background: #000000; color: #ffffff; border: 1px solid #000000; padding: 1px 6px; border-radius: 2px;">Enquiry 4</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.8pt; color: #000000; margin: 0; line-height: 1.3;">
            Indian sepoys at Meerut mutiny over greased cartridges and corporate exploitation, spreading rebellion across northern India; Parliament abolishes the East India Company in 1858 and establishes direct British Crown rule (The Raj).
          </p>
        </div>

        <!-- Milestone 8: 1860 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 10.0pt; font-weight: 900; color: #000000;">
              1860 &bull; Launch of HMS Warrior at Portsmouth
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; background: #000000; color: #ffffff; border: 1px solid #000000; padding: 1px 6px; border-radius: 2px;">Enquiry 4</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.8pt; color: #000000; margin: 0; line-height: 1.3;">
            Britain launches the world’s first all-iron-hulled, armoured warship at Portsmouth Historic Dockyard; powered by steam and Cort’s wrought iron armour, HMS Warrior renders all existing wooden navies instantaneously obsolete.
          </p>
        </div>

      </div>

      ${renderFooterStrip(9, 'Between 1784 and 1860, British power was transformed by industrial metallurgy, political protest, and global imperial expansion.', 16)}
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
                <div style="font-size: 7.5pt; color: #475569; margin-top: 2px;">Inference &amp; Causation: Naval Metallurgy (1775–1787)</div>
              </td>
              <td style="padding: 18.5px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">&nbsp;</td>
              <td style="padding: 18.5px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 18.5px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 18.5px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.5pt; color: #0f284e;">Enquiry 2: Child Labour, Slums &amp; Public Health</div>
                <div style="font-size: 7.5pt; color: #475569; margin-top: 2px;">Feature Drill &amp; Consequence: Child Labour &amp; Bazalgette</div>
              </td>
              <td style="padding: 18.5px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">&nbsp;</td>
              <td style="padding: 18.5px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 18.5px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 18.5px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.5pt; color: #0f284e;">Enquiry 3: Hampshire Swing Riots to Chartism</div>
                <div style="font-size: 7.5pt; color: #475569; margin-top: 2px;">Narrative Account &amp; Importance: Swing Riots &amp; People’s Charter</div>
              </td>
              <td style="padding: 18.5px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">&nbsp;</td>
              <td style="padding: 18.5px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 18.5px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 18.5px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.5pt; color: #0f284e;">Enquiry 4: HMS Warrior &amp; 1857 Indian Rebellion</div>
                <div style="font-size: 7.5pt; color: #475569; margin-top: 2px;">Contrasting Interpretations: Pax Britannica vs Violent Extraction</div>
              </td>
              <td style="padding: 18.5px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">&nbsp;</td>
              <td style="padding: 18.5px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 18.5px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 18.5px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.5pt; color: #0f284e;">Enquiry 5: The Victorian Verdict</div>
                <div style="font-size: 7.5pt; color: #475569; margin-top: 2px;">Evaluative Statement Essay: Progress vs Exploitation (1750–1901)</div>
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
                '&quiz=true';
              const qrSvg = generateQrSvg(quizUrl);
              const shortLabels = [
                'Cort &amp; Funtley',
                'Slums &amp; Health',
                'Swing &amp; Chartism',
                'Warrior &amp; India',
                'Victorian Verdict',
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
  const outPdf16pPath = path.join(pdfDir, 'industrialisation_and_empire_16p_workbook.pdf');
  const outPdfFinalPath = path.join(
    pdfDir,
    'industrialisation_and_empire_pupil_workbook_FINAL_V17.pdf',
  );

  console.log('Launching Puppeteer to generate high-resolution print PDF...');
  const browser = await puppeteer.launch({
    headless: 'new',
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

  // Also write 16p and FINAL_V17 aliases
  fs.copyFileSync(outPdfPath, outPdf16pPath);
  fs.copyFileSync(outPdfPath, outPdfFinalPath);

  await browser.close();
  console.log(`[OK] PDF successfully compiled: ${outPdfPath}`);
  console.log(`[OK] 16P PDF alias compiled: ${outPdf16pPath}`);
  console.log(`[OK] FINAL_V17 PDF alias compiled: ${outPdfFinalPath}`);
}

if (require.main === module) {
  main().catch((err) => {
    console.error('Fatal error during workbook compilation:', err);
    process.exit(1);
  });
}

module.exports = { compileIndustrialisationWorkbook };
