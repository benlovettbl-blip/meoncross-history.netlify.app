const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const dataFilePath = path.join(ROOT_DIR, 'units', 'industrialisation_and_empire', 'data.js');

// Load original data
const rawDataContent = fs.readFileSync(dataFilePath, 'utf8');
const cleanJsonMatch = rawDataContent.match(/export\s+const\s+unitData\s*=\s*(\{[\s\S]*\});\s*export\s+default\s+unitData;/);
if (!cleanJsonMatch) {
  throw new Error('Could not parse units/industrialisation_and_empire/data.js JSON structure');
}
const unitData = JSON.parse(cleanJsonMatch[1]);

const indExamPractice = [
  // Lesson 1: Iron & Steam Revolution: Henry Cort (12m Explain Why)
  {
    title: 'Key Stage 3 Disciplinary Writing: The Iron & Steam Revolution: Henry Cort',
    tariff: '12 marks (Explain Why Causal Analysis)',
    questions: [
      {
        tariff: '12 marks',
        type: 'explain_why_12m',
        question: 'Explain why Henry Cort achieved his metallurgical breakthrough in wrought iron production at Funtley in 1784. [12 marks]',
        stimulus: [
          'The urgent naval demand for tough iron from Portsmouth Royal Dockyard',
          'The innovative combination of the puddling furnace and grooved rollers'
        ],
        prompt: 'Explain three distinct causal reasons: the vital naval demand for tough, domestic wrought iron to support Royal Navy shipbuilding during the American Revolutionary War; Cort’s revolutionary technological combination of the reverberatory puddling furnace and mechanized grooved rollers; and the logistical advantages of the local Hampshire iron industry and waterways.',
        model: 'One primary reason Henry Cort achieved his breakthrough was the acute national security crisis and urgent naval demand from nearby Portsmouth Royal Dockyard. During the American Revolutionary War (1775–1783), Britain faced naval coalitions with France and Spain and was dangerously reliant upon imported Swedish and Russian "orgrounds" bar iron for anchor chains, cannon bands, and ship fittings. When Baltic supply lines were threatened by the League of Armed Neutrality, the Admiralty faced a critical shortage of high-grade wrought iron. Working as a Royal Navy victualling contractor in Portsmouth, Cort recognized that commercial fortunes and imperial survival depended upon manufacturing cheap, high-quality wrought iron domestically from low-grade British pig iron.<br><br>Furthermore, a second decisive factor was Cort’s brilliant technological synthesis of two previously separate processes: the puddling furnace and grooved rolling mills. In his 1783 and 1784 patents, Cort utilized a reverberatory furnace heated by domestic coal, where the fuel was kept separate from the molten iron to prevent sulfur contamination. By stirring ("puddling") the liquid pig iron, workers burned off excess carbon, transforming brittle cast iron into malleable wrought iron. Cort then immediately passed the red-hot iron through heavy grooved steam rollers instead of slowly hammering it by hand. This mechanical rolling squeezed out impurities and shaped uniform iron bars fifteen times faster than traditional trip-hammers, cutting production costs by half.<br><br>Finally, Cort’s success was enabled by the unique logistical and industrial infrastructure of the Meon Valley in Hampshire. Purchasing the Fontley (Funtley) ironworks in 1775, Cort utilized the fast-flowing River Meon for water power, while the nearby port of Fareham and Portsmouth Harbour provided cheap coastal shipping for coal and pig iron from Wales and the Midlands. Consequently, Cort’s "puddled iron" became the foundational material of the global Industrial Revolution, supplying the tough iron required for the Royal Navy’s warships, steam engines, and the world’s first railway networks.',
        scaffolding: {
          acronym: '3-Paragraph Causal Analysis (PEEL)',
          acronym_title: '12-Mark Explain Why Standard',
          steps: [
            { letter: 'REASON 1', name: 'Naval Demand & Baltic Import Crisis', prompt: 'Explain the American War, Baltic blockades, Portsmouth Dockyard demand, and need for domestic iron.', starter: 'One primary reason Henry Cort achieved his breakthrough was...' },
            { letter: 'REASON 2', name: 'Puddling Furnace & Grooved Rollers (Patents)', prompt: 'Explain coal reverberatory furnace, burning off carbon, and grooved rollers working 15x faster.', starter: 'Furthermore, a second decisive factor was his technological breakthrough, such as...' },
            { letter: 'REASON 3', name: 'Hampshire Logistics & Industrial Impact', prompt: 'Explain Funtley Works, River Meon water power, shipping to Portsmouth, and founding the railway age.', starter: 'Finally, Cort was aided by the logistical advantages of...' }
          ],
          sentence_starters: [
            'One primary reason was that...',
            'For example, the Royal Navy required...',
            'This led directly to the breakthrough because...',
            'Another key factor was Cort’s patent for...',
            'Consequently, this meant that...',
            'Ultimately, this resulted in...'
          ],
          connectives_bank: ['Henry Cort', 'Funtley Ironworks', 'Portsmouth Royal Dockyard', 'puddling furnace', 'grooved rollers', 'wrought iron', 'pig iron', 'Baltic iron blockade']
        }
      }
    ]
  },

  // Lesson 2: Factory Work & Child Labour (Feature Drill [4m] & Consequence [4m])
  {
    title: 'Key Stage 3 Disciplinary Writing: Factory Work & Child Labour: Progress or Punishment?',
    tariff: '8 marks (Feature Drill [4m] & Consequence Writing [4m])',
    questions: [
      {
        tariff: '4 marks',
        type: 'feature_drills_4m',
        question: 'Describe two features of working conditions for child labourers in Victorian textile mills. [4 marks]',
        prompt: 'Identify two distinct features of child labour in early textile mills. For each feature, provide a clear identification followed by supporting factual knowledge.',
        model: 'Feature 1: One key feature was the extreme physical danger from unshielded, moving machinery.<br>Detail: Small children employed as "scavengers" and "piecers" were forced to crawl beneath operating spinning mules and power looms to sweep up cotton fluff and tie broken threads, frequently suffering severed fingers, crushed limbs, or scalpings from exposed iron gears.<br><br>Feature 2: A second key feature was the grueling 14- to 16-hour working day enforced by physical violence.<br>Detail: Children were awakened at 5:00 am, denied breaks except for meager meals eaten while machines ran, and were brutally beaten with leather straps ("strapping") by overseers to keep them awake as exhaustion set in.',
        scaffolding: {
          acronym: 'F1 + D1 • F2 + D2',
          acronym_title: '4-Mark Feature Drill Formula',
          steps: [
            { letter: 'F1', name: 'Feature 1 (Lethal Machinery Dangers)', prompt: 'Identify scavengers and piecers crawling under moving spinning mules.', starter: 'One key feature was that...' },
            { letter: 'D1', name: 'Detail 1', prompt: 'Add precise details (tying threads, unshielded gears, lost fingers, scalpings).', starter: 'Specifically, this involved...' },
            { letter: 'F2', name: 'Feature 2 (Punitive Hours & Physical Beatings)', prompt: 'Identify 14–16 hour shifts and overseers using strapping.', starter: 'A second key feature was...' },
            { letter: 'D2', name: 'Detail 2', prompt: 'Add precise details (5 am starts, eating while working, leather strap discipline).', starter: 'In particular, this meant that...' }
          ],
          sentence_starters: [
            'One key feature was that...',
            'Specifically, this involved...',
            'A second key feature was...',
            'In particular, this meant that...'
          ],
          connectives_bank: ['child labour', 'scavengers', 'piecers', 'spinning mule', 'unshielded machinery', 'strapping', '14-hour workday', 'cotton dust']
        }
      },
      {
        tariff: '4 marks',
        type: 'consequence_4m',
        question: 'Explain one consequence of the 1833 Factory Act for working children in Britain. [4 marks]',
        prompt: 'Focus on how the act established legal age limits and compulsory schooling, and critically, how it created the first four professional factory inspectors to legally enforce the rules.',
        model: 'One significant consequence of the 1833 Factory Act was the legal establishment of state regulation over child labour and the introduction of mandatory workplace inspections. The act made it illegal to employ children under nine years of age in textile mills, limited children aged 9–13 to a maximum of eight hours of labour per day, and mandated that employers provide two hours of compulsory schooling daily. Crucially, recognizing that previous voluntary laws had been ignored by mill owners, the 1833 Act created Britain’s first four independent factory inspectors with legal powers to enter mills without warning and prosecute non-compliant owners. Consequently, this marked the historical turning point from unchecked laissez-faire industrial exploitation toward compulsory state child protection.',
        scaffolding: {
          acronym: 'P-F-C (Point • Fact • Consequence)',
          acronym_title: 'High-Yield Consequence Formula (1 Concise Paragraph)',
          steps: [
            { letter: 'POINT', name: 'Identify Consequence', prompt: 'State legal work limits, mandatory schooling, and professional factory inspectors.', starter: 'One significant consequence of the 1833 Factory Act was...' },
            { letter: 'FACT', name: 'Historical Evidence', prompt: 'Cite ban under 9, max 8 hours for ages 9–13, 2 hours schooling, and 4 factory inspectors.', starter: 'In particular, the legislation established that...' },
            { letter: 'CONSEQUENCE', name: 'Explain Result', prompt: 'Explain the breakthrough from laissez-faire exploitation to state child protection.', starter: 'Consequently, this directly resulted in...' }
          ],
          sentence_starters: [
            'One significant consequence of the 1833 Factory Act was that...',
            'In particular, this meant that...',
            'As a direct result...',
            'Consequently, this transformed working conditions because...'
          ],
          connectives_bank: ['1833 Factory Act', 'banned under 9', 'eight-hour limit (9–13)', 'two hours compulsory schooling', 'four factory inspectors', 'decline of laissez-faire']
        }
      }
    ]
  },

  // Lesson 3: Urban Slums & Public Health (Feature Drill [4m] & Consequence [4m])
  {
    title: 'Key Stage 3 Disciplinary Writing: Urban Slums & The Public Health Crisis',
    tariff: '8 marks (Feature Drill [4m] & Consequence Writing [4m])',
    questions: [
      {
        tariff: '4 marks',
        type: 'feature_drills_4m',
        question: 'Describe two features of back-to-back housing in 19th-century industrial towns. [4 marks]',
        prompt: 'Identify two distinct architectural features of back-to-back slum housing. For each feature, provide a clear identification followed by supporting factual knowledge.',
        model: 'Feature 1: One key feature was that houses shared three of their four walls with neighbouring properties.<br>Detail: Speculative builders constructed rows of narrow brick houses joined back-to-back and side-to-side, meaning houses had windows only on the front wall, eliminating through-ventilation and trapping stagnant, contaminated air indoors.<br><br>Feature 2: A second key feature was the total absence of internal sanitation and clean running water.<br>Detail: Entire streets of several hundred residents shared one or two outdoor earth privies (cesspits) and a single shared water standpipe that operated for only an hour each morning, causing human sewage to overflow into unpaved courtyards and seep into drinking wells.',
        scaffolding: {
          acronym: 'F1 + D1 • F2 + D2',
          acronym_title: '4-Mark Feature Drill Formula',
          steps: [
            { letter: 'F1', name: 'Feature 1 (Shared Walls & Lack of Ventilation)', prompt: 'Identify houses joined back-to-back with windows on only one side.', starter: 'One key feature was that...' },
            { letter: 'D1', name: 'Detail 1', prompt: 'Add precise details (shared 3 walls, no cross-draft, trapped damp air, cellar dwellings).', starter: 'Specifically, this involved...' },
            { letter: 'F2', name: 'Feature 2 (Shared Privies & Contaminated Water)', prompt: 'Identify shared outdoor cesspits and single intermittent water standpipes.', starter: 'A second key feature was...' },
            { letter: 'D2', name: 'Detail 2', prompt: 'Add precise details (hundreds sharing 1 privy, sewage overflowing into courts and wells).', starter: 'In particular, this meant that...' }
          ],
          sentence_starters: [
            'One key feature was that...',
            'Specifically, this involved...',
            'A second key feature was...',
            'In particular, this meant that...'
          ],
          connectives_bank: ['back-to-back housing', 'cellar dwellings', 'lack of ventilation', 'earth privies / cesspits', 'water standpipe', 'cholera', 'typhus']
        }
      },
      {
        tariff: '4 marks',
        type: 'consequence_4m',
        question: 'Explain one consequence of the 1858 Great Stink for public health in Victorian London. [4 marks]',
        prompt: 'Focus on how the unbearable stench of the sewage-filled River Thames outside Parliament forced politicians to abandon laissez-faire and pass emergency funding for Joseph Bazalgette’s 82-mile underground intercepting sewer network.',
        model: 'One significant consequence of the 1858 Great Stink was that it forced the British Parliament to abandon its traditional laissez-faire policy and finance the construction of London’s monumental underground sewer system. During the scorching summer of 1858, millions of gallons of raw sewage trapped in the River Thames fermented, creating a nauseating stench that overwhelmed the Houses of Parliament, forcing MPs to soak curtains in chloride of lime and suspend legislative business. Convinced by the miasma theory that the smell was fatal, Parliament passed an emergency bill in just eighteen days granting Chief Engineer Joseph Bazalgette three million pounds to construct 82 miles of underground brick intercepting sewers. Consequently, this engineering triumph diverted London’s waste away from the urban drinking supply, permanently eradicating epidemic water-borne cholera from the capital by 1866.',
        scaffolding: {
          acronym: 'P-F-C (Point • Fact • Consequence)',
          acronym_title: 'High-Yield Consequence Formula (1 Concise Paragraph)',
          steps: [
            { letter: 'POINT', name: 'Identify Consequence', prompt: 'State Parliament abandoning laissez-faire and funding Bazalgette’s sewer network.', starter: 'One significant consequence of the Great Stink was...' },
            { letter: 'FACT', name: 'Historical Evidence', prompt: 'Cite summer 1858, chloride of lime curtains, emergency bill in 18 days, and 82 miles of sewers.', starter: 'In particular, during the summer of 1858...' },
            { letter: 'CONSEQUENCE', name: 'Explain Result', prompt: 'Explain redirecting sewage away from Thames drinking water and eliminating cholera.', starter: 'Consequently, this directly resulted in...' }
          ],
          sentence_starters: [
            'One significant consequence of the Great Stink was that...',
            'In particular, this occurred when...',
            'As a direct result...',
            'Consequently, this transformed public health because...'
          ],
          connectives_bank: ['Great Stink (1858)', 'River Thames', 'chloride of lime', 'Sir Joseph Bazalgette', '82 miles of intercepting sewers', 'eradication of cholera', 'end of laissez-faire']
        }
      }
    ]
  },

  // Lesson 4: Radical Protest & The Swing Riots (Feature Drill [4m] & Narrative Account [8m])
  {
    title: 'Key Stage 3 Disciplinary Writing: Radical Protest & The Swing Riots',
    tariff: '12 marks (Feature Drill [4m] & Narrative Account [8m])',
    questions: [
      {
        tariff: '4 marks',
        type: 'feature_drills_4m',
        question: 'Describe two features of the 1830 Hampshire Swing Riots. [4 marks]',
        prompt: 'Identify two distinct features of the 1830 agricultural protests in Hampshire. For each feature, provide a clear identification followed by supporting factual knowledge.',
        model: 'Feature 1: One key feature was the physical destruction of steam threshing machines and hayrick burning.<br>Detail: Starving agricultural farm labourers attacked aristocratic and gentry estates across Hampshire—including at Selborne and Headley—smashing iron threshing machines with sledgehammers because the machines robbed them of essential winter wages.<br><br>Feature 2: A second key feature was the use of threatening letters signed by the mythical leader "Captain Swing".<br>Detail: Protesters delivered anonymous letters to magistrates, parsons, and wealthy farmers warning them to raise wages and dismantle machinery or face arson attacks, demanding an end to oppressive tithe taxes.',
        scaffolding: {
          acronym: 'F1 + D1 • F2 + D2',
          acronym_title: '4-Mark Feature Drill Formula',
          steps: [
            { letter: 'F1', name: 'Feature 1 (Machine Smashing & Arson)', prompt: 'Identify destroying steam threshing machines and burning hayricks.', starter: 'One key feature was that...' },
            { letter: 'D1', name: 'Detail 1', prompt: 'Add precise details (Selborne, Headley, sledgehammers, winter wage loss).', starter: 'Specifically, this involved...' },
            { letter: 'F2', name: 'Feature 2 (Captain Swing Letters)', prompt: 'Identify threatening letters demanding higher wages and lower tithes.', starter: 'A second key feature was...' },
            { letter: 'D2', name: 'Detail 2', prompt: 'Add precise details (signed "Captain Swing", sent to magistrates and parsons).', starter: 'In particular, this meant that...' }
          ],
          sentence_starters: [
            'One key feature was that...',
            'Specifically, this involved...',
            'A second key feature was...',
            'In particular, this meant that...'
          ],
          connectives_bank: ['Swing Riots (1830)', 'Captain Swing', 'threshing machines', 'Selborne and Headley', 'hayrick burning', 'tithes', 'sledgehammers']
        }
      },
      {
        tariff: '8 marks',
        type: 'narrative_account_8m',
        question: 'Write a narrative account analysing the key events leading from the Peterloo Massacre (1819) and Hampshire Swing Riots (1830) to the Tolpuddle Martyrs (1834). [8 marks]',
        stimulus: [
          'The Peterloo Massacre and the repressive Six Acts (1819)',
          'The Swing Riots and the transportation of the Tolpuddle Martyrs (1830–1834)'
        ],
        prompt: 'Write a chronological account examining the escalation of popular working-class protest and state retaliation: the 1819 demand for parliamentary reform crushed at Peterloo, rural desperation in the 1830 Swing Riots, and the legal suppression of early trade unions in the 1834 Tolpuddle Martyrs case.',
        model: 'Between 1819 and 1834, popular working-class resistance in Britain transitioned from mass political rallies to rural machine-wrecking and early trade unionism, meeting with ferocious legal and military suppression from the ruling elite.<br><br>The era of mass radical protest began on 16 August 1819 at St Peter’s Field in Manchester, where 60,000 peaceful men, women, and children gathered to hear Henry Hunt demand universal male suffrage and the repeal of the Corn Laws. Panicked magistrates ordered the local cavalry to charge the crowd with sabres drawn, killing eighteen people and injuring over 650 in the "Peterloo Massacre". Far from yielding democratic reform, Lord Liverpool’s Tory government passed the repressive Six Acts, banning public meetings over fifty people and taxing radical pamphlets to silence political dissent.<br><br>A decade later, working-class resistance shifted from northern industrial cities to the impoverished countryside during the 1830 Swing Riots. Driven by starvation wages and the enclosure of common land, agricultural labourers destroyed steam threshing machines and burned hayricks under the name "Captain Swing". The government responded with brutal judicial retribution: Special Assize courts in Winchester sentenced hundreds to transport to Australian penal colonies and hanged nineteen leaders. Although the Whig government passed the 1832 Great Reform Act in response to revolutionary fears, the act deliberately excluded working-class men by imposing a strict £10 property qualification.<br><br>Disillusioned with political parties, working men turned to trade unions to protect their livelihood. In 1834, six agricultural labourers in Dorset led by Methodist preacher George Loveless established the Friendly Society of Agricultural Labourers. Terrified of organized working-class solidarity, the Whig government revived an obscure 1797 naval mutiny statute to arrest and convict the "Tolpuddle Martyrs" for administering secret oaths, sentencing them to seven years’ penal transportation to Australia. Consequently, this outrageous injustice sparked massive protest marches across London, demonstrating that the working-class struggle for democratic rights and union recognition could no longer be eradicated by judicial terror.',
        scaffolding: {
          acronym: '3-Stage Chronological Narrative Framework',
          acronym_title: 'Narrative Account Formula (Beginning • Escalation • Climax)',
          steps: [
            { letter: 'STAGE 1', name: '1819 Peterloo & Six Acts', prompt: 'Explain 60,000 at St Peter’s Field, cavalry sabres, 18 dead, and repressive Six Acts.', starter: 'Initially, popular agitation erupted in August 1819 when...' },
            { letter: 'STAGE 2', name: '1830 Swing Riots & 1832 Betrayal', prompt: 'Explain machine wrecking, Special Assizes transportations, and 1832 £10 exclusion.', starter: 'Following this, rural desperation ignited in 1830 with...' },
            { letter: 'STAGE 3', name: '1834 Tolpuddle Martyrs & Protest', prompt: 'Explain George Loveless, secret oaths law, 7 years transport, and massive London protests.', starter: 'The struggle culminated in 1834 when six agricultural labourers...' }
          ],
          sentence_starters: [
            'Initially, radical agitation began in 1819 when...',
            'Following this state repression, rural resistance escalated in 1830 when...',
            'Although the 1832 Reform Act was passed, it excluded working men, leading in 1834 to...',
            'Consequently, this culminated in...'
          ],
          connectives_bank: ['Peterloo Massacre (1819)', 'Henry Hunt', 'Six Acts', 'Swing Riots (1830)', 'Captain Swing', '1832 Great Reform Act', 'Tolpuddle Martyrs (1834)', 'George Loveless', 'penal transportation']
        }
      }
    ]
  },

  // Lesson 5: The Road to Democracy: Rotten Boroughs to Secret Ballot (12m Evaluative Essay)
  {
    title: 'Key Stage 3 Disciplinary Writing: Rotten Boroughs, Reform & The Secret Ballot',
    tariff: '12 marks (Evaluative Statement Essay)',
    questions: [
      {
        tariff: '12 marks',
        type: 'evaluative_essay_12m',
        question: '“The 1832 Great Reform Act was passed because the ruling aristocracy feared violent revolution, rather than from a desire for democratic justice.” How far do you agree with this statement? Explain your answer. [12 marks]',
        stimulus: [
          'The burning of Bristol and the "Days of May" run on the Bank of England (1831–1832)',
          'Earl Grey’s £10 property qualification deliberately excluding the working class'
        ],
        prompt: 'Construct a balanced evaluative argument: on the one hand, evaluate how aristocratic terror of revolution—seen in the Bristol riots, the Swing Riots, and the financial strike ("Stop the Duke, go for gold!")—forced the House of Lords to pass reform; on the other hand, evaluate how Whig politicians genuinely believed moderate reform was necessary to modernize Parliament and integrate wealthy industrialists into governance. Reach a weighed conclusion.',
        model: 'To a very large extent, it is accurate to argue that the 1832 Great Reform Act was conceded by the ruling aristocracy out of intense terror of violent revolution and economic collapse, rather than any progressive commitment to democratic justice.<br><br>On the one hand, overwhelming historical evidence confirms that Britain was on the brink of armed insurrection between 1830 and 1832. When the House of Lords repeatedly rejected the Reform Bill in October 1831, violent riots erupted across Nottingham, Derby, and Bristol, where the bishop’s palace and municipal buildings were burned to the ground. During the "Days of May" in 1832, when King William IV attempted to dismiss Earl Grey and appoint the anti-reform Duke of Wellington as Prime Minister, radical leaders like Francis Place organized a crippling financial run on the banks with the slogan "To stop the Duke, go for gold!". Over £1.8 million was withdrawn in days. Fearing that a military coup would ignite a civil war matching the French Revolution of 1789, aristocratic peers in the House of Lords panicked and finally conceded the bill to preserve their property and titles.<br><br>Furthermore, the deliberate design of the legislation proves that democratic justice was the last thing the Whig aristocracy desired. Prime Minister Earl Grey explicitly stated in Parliament that his policy was to "reform in order to preserve", aiming to build an aristocratic-middle class alliance that would permanently freeze out the working-class majority. By disenfranchising 56 corrupt "rotten boroughs" (like Old Sarum) and granting 130 seats to expanding industrial cities (like Manchester and Birmingham), the act admitted wealthy factory owners and merchants into the franchise. However, by imposing a strict £10 annual property qualification, Grey deliberately excluded over 80% of adult males, ensuring that five out of six men—and all women—remained completely voteless.<br><br>In conclusion, the 1832 Great Reform Act was not a triumph of democratic idealism, but a masterclass in aristocratic self-preservation. It was passed because the threat of national revolution and economic chaos left the House of Lords with no alternative, conceding just enough representation to the middle classes to peel them away from their working-class radical allies.',
        scaffolding: {
          acronym: 'PEEL Evaluative Essay Framework',
          acronym_title: '12-Mark Evaluative Statement Essay Standard',
          steps: [
            { letter: 'THESIS', name: 'State Position', prompt: 'State clearly that aristocratic fear of revolution was the primary motive for passing reform.', starter: 'To a very large extent, it is accurate to argue that the 1832 Act was passed out of fear of revolution because...' },
            { letter: 'THEME 1', name: 'Terror of Revolution & Financial Panic', prompt: 'Explain Bristol riots, Nottingham Castle burned, Days of May ("go for gold!"), and French Revolution fears.', starter: 'On the one hand, overwhelming evidence demonstrates that fear of violent revolution compelled the Lords because...' },
            { letter: 'THEME 2', name: 'Earl Grey’s Motives: Reform to Preserve & £10 Exclusion', prompt: 'Evaluate "reform in order to preserve", rotten boroughs, but strictly excluding the working class with the £10 rule.', starter: 'Furthermore, the specific terms of the act prove that democratic justice was not the motive because...' },
            { letter: 'JUDGMENT', name: 'Weighed Verdict', prompt: 'Synthesize why concessions were an aristocratic strategy to divide middle and working classes.', starter: 'In conclusion, the 1832 Great Reform Act was a calculated concession designed to...' }
          ],
          sentence_starters: [
            'To a very large extent, it can be argued that...',
            'On the one hand, aristocratic terror was heightened by...',
            'In particular, during the Days of May in 1832...',
            'On the other hand, the design of the act itself proves that...',
            'In conclusion, the primary reason the act passed was... because...'
          ],
          connectives_bank: ['1832 Great Reform Act', 'Earl Grey', 'reform in order to preserve', 'rotten boroughs (Old Sarum)', 'burning of Bristol (1831)', 'Days of May (1832)', 'Francis Place', 'go for gold', '£10 property qualification']
        }
      }
    ]
  }
];

// Inject into unitData.lessons
unitData.lessons.forEach((lesson, idx) => {
  if (indExamPractice[idx]) {
    lesson.exam_practice = indExamPractice[idx];
  }
});

// Serialize back to units/industrialisation_and_empire/data.js
const serialized = `export const unitData = ${JSON.stringify(unitData, null, 2)};\nexport default unitData;\n`;
fs.writeFileSync(dataFilePath, serialized, 'utf8');
console.log('✅ Successfully synchronized all 5 lessons of Industrialisation and Empire with workbook examination practice!');
