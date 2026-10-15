const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const dataFilePath = path.join(ROOT_DIR, 'units', 'industrialisation_and_empire', 'data.js');

async function run() {
  console.log('🔄 Loading existing units/industrialisation_and_empire/data.js...');
  const fileUrl = 'file:///' + dataFilePath.replace(/\\/g, '/');
  const mod = await import(fileUrl);
  const data = JSON.parse(
    JSON.stringify(mod.default || mod.unitData || mod.industrialisation_and_empire),
  );

  console.log('🧹 Cleaning lessons: removing duplicate spines, legacy tasks, and legacy fields...');

  // 1. Clean each lesson
  data.lessons.forEach((lesson, lIdx) => {
    delete lesson.timeline_anchor;
    delete lesson.workbook_stages;
    delete lesson.pair_share;
    delete lesson.vocab_cloze_text;

    // Ensure narrative blocks have zero embedded tasks
    if (Array.isArray(lesson.narrative_blocks)) {
      lesson.narrative_blocks.forEach((b) => {
        delete b.tasks;
      });
    }
  });

  // =========================================================================
  // LESSON 1: Gold Standard Tasks (Question 2: Explain Why [12 marks])
  // =========================================================================
  data.lessons[0].tasks = [
    {
      id: 'ie_l1_explain_why_cort',
      type: 'extended_writing',
      tariff: 'Question 2: Explain Why [12 marks • 15 mins]',
      title: 'Question 2: Explain Why [12 marks • 15 mins]',
      question:
        'Explain why Henry Cort achieved his metallurgical breakthrough in wrought iron production at Funtley in 1784. [12 marks]',
      stimulus: [
        'The urgent naval demand for tough iron from Portsmouth Royal Dockyard',
        'The innovative combination of the puddling furnace and grooved rollers',
      ],
      hints: [
        'Point: State how Britain’s naval vulnerability and dependence on Swedish iron created an urgent national need for domestic wrought iron.',
        'Evidence: Cite the Admiralty naval trials at Portsmouth Royal Dockyard [1.5] and Britain importing 50,000 tons of Swedish Orgrounds iron annually [1.1].',
        'Explanation: Explain how Cort’s puddling furnace kept pig iron separate from burning coal to burn off sulfur, and how his grooved rollers were 15 times faster than trip hammers [1.3, 1.4].',
        'Link: Show how this metallurgical combination gave Britain complete naval independence and fueled the Industrial Revolution.',
      ],
      scaffolding: {
        structure_strip: [
          'Introduction: Outline Britain’s iron crisis—deforestation, brittle pig iron, and dangerous dependence on Swedish Orgrounds imports for the Royal Navy [1.1].',
          'PEEL 1 (Strategic Naval Imperative): Explain how Portsmouth Royal Dockyard needed shatter-resistant iron for anchors, bolts, and cannons, prompting Admiralty trials [1.1, 1.5].',
          'PEEL 2 (Technological Synthesis at Funtley): Explain how Cort combined the reverberatory puddling furnace with steam-powered grooved rollers to refine and roll iron 15 times faster [1.3, 1.4].',
          'Conclusion: Evaluate Cort’s lasting significance—transforming Britain from an iron importer into the "Workshop of the World" and master of the seas.',
        ],
        sentence_starters: [
          'A primary reason why Henry Cort achieved his breakthrough was the desperate naval demand from Portsmouth Dockyard...',
          'At the time, British ironmasters could only produce brittle pig iron because...',
          'Consequently, the Royal Navy was dangerously dependent on imports of...',
          'To overcome this bottleneck, Cort innovated at Funtley Ironworks by combining...',
          'In his reverberatory puddling furnace, molten iron was stirred so that...',
          'Furthermore, Cort replaced traditional trip hammers with grooved rollers, which...',
          'As proved during the 1787 Portsmouth naval trials, Funtley iron was...',
          'In conclusion, Cort’s achievement was decisive because it combined chemical refinement with mechanical speed, securing British naval supremacy.',
        ],
        connective_bank: [
          'To a large extent, it can be argued that...',
          'In particular, a decisive factor was...',
          'Furthermore, this created severe consequences because...',
          'On the other hand, an alternative perspective is that...',
          'In conclusion, the decisive reason why...',
        ],
        word_bank: [
          'Henry Cort',
          'Funtley Ironworks',
          'River Meon',
          'puddling furnace',
          'grooved rollers',
          'wrought iron',
          'pig iron',
          'Portsmouth Dockyard',
          'Royal Navy',
          'Swedish Orgrounds iron',
          'decarburisation',
        ],
      },
      model_answer:
        'One major reason why Henry Cort achieved his breakthrough was the urgent naval demand from Portsmouth Royal Dockyard [1.1, 1.5]. Prior to Cort’s work, British blast furnaces produced brittle pig iron that shattered under pressure, forcing the Royal Navy to import over 50,000 tons of tough Swedish iron every year. By setting up Funtley Ironworks near Portsmouth, Cort secured naval contracts from Admiralty commissioners who desperately needed domestic shatter-resistant iron for anchors and naval warships during wartime.\n\nAnother decisive factor was Cort’s technological combination of the puddling furnace and grooved rollers [1.3, 1.4]. In his reverberatory puddling furnace, pig iron was stirred to burn off impurities while keeping it separate from sulfurous coal. Furthermore, Cort replaced slow trip hammers with grooved rollers, which squeezed out slag and shaped iron bars fifteen times faster than traditional methods, creating high-quality malleable wrought iron.\n\nIn conclusion, Cort succeeded because strategic naval demand gave him financial backing, while his puddling and rolling process solved Britain’s technological bottleneck.',
      topic: 'Question 2: Explain Why [12 marks • 15 mins]',
    },
  ];

  // =========================================================================
  // LESSON 2: Gold Standard Tasks & Mill Rules Source
  // =========================================================================
  // Update Act 2 source to authentic Tyldesley Cotton Mill Rulebook (1823)
  data.lessons[1].narrative_blocks[1].source = {
    letter: 'B',
    title: 'Source B: Tyldesley Cotton Mill Factory Rulebook & Fines Ledger (1823)',
    context:
      'Official workplace regulations posted at the entrance of a Lancashire cotton mill in 1823. Mill masters enforced absolute obedience through monetary wage deductions and locked gates. **Hinge Question:** Why did factory owners choose monetary wage fines rather than dismissals to discipline industrial workers?',
    hinge_question:
      'Why did factory owners choose monetary wage fines rather than dismissals to discipline industrial workers?',
    text: '“1. The door of the lodge will be closed 5 minutes after the bell rings in the morning, and no person admitted till breakfast; any person absent after that time will forfeit 3d.\n2. Any person opening a window without permission of the overlooker will forfeit 1s.\n3. Any spinner found dirty at work will forfeit 1s.\n4. Any person whistling or singing at work will forfeit 1s.\n5. Any person found five minutes after the last bell rings in the evening will forfeit 1s.”',
    caption:
      'Source B: Extracts from the 1823 Rulebook posted inside Tyldesley Cotton Mill, illustrating the rigid clockwork discipline and severe monetary penalties imposed upon mill operatives.',
  };

  data.lessons[1].tasks = [
    {
      id: 'ie_l2_two_features_child_labour',
      type: 'two_features',
      tariff: 'Question 1: Describe Two Features [4 marks • 5 mins]',
      title: 'Question 1: Describe Two Features [4 marks • 5 mins]',
      question:
        'Describe two features of working conditions for child labourers in Victorian textile mills. [4 marks]',
      feature_1: {
        prompt:
          'Feature 1: Identify one dangerous physical hazard or task endured by child mill workers and provide supporting detail.',
        starter: 'One key feature of working conditions was... Specifically, this involved...',
        model:
          'One key feature was the extreme physical danger of working around unguarded machinery [2.3]. Specifically, young children employed as "scavengers" had to crawl beneath fast-moving spinning mules, risking crushed fingers and severe injuries.',
      },
      feature_2: {
        prompt:
          'Feature 2: Identify a second feature regarding working hours, fatigue, or draconian factory discipline.',
        starter: 'A second key feature was... For example, this meant that...',
        model:
          'A second key feature was the excessively long working hours enforced by corporal punishment [2.2, 2.4]. For example, child apprentices worked 14- to 16-hour shifts, and overlookers routinely beat them with leather straps if they slowed down.',
      },
      topic: 'Question 1: Describe Two Features [4 marks • 5 mins]',
    },
    {
      id: 'ie_l2_consequence_factory_act',
      type: 'extended_writing',
      tariff: 'Question 2: Explain One Consequence [4 marks • 5 mins]',
      title: 'Question 2: Explain One Consequence [4 marks • 5 mins]',
      question:
        'Explain one consequence of the 1833 Factory Act for working children in Britain. [4 marks]',
      hints: [
        'Point: State how the 1833 Factory Act established the legal principle of state regulation over private manufacturing.',
        'Evidence: Cite specific statutory terms—banning work for children under nine, limiting 9–13 year olds to eight hours, and creating four factory inspectors [2.5].',
        'Explanation: Explain why appointing independent government inspectors broke the unrestricted authority of mill owners.',
      ],
      scaffolding: {
        structure_strip: [
          'Point: State the primary consequence—the introduction of statutory age/hour limits and government inspection.',
          'Evidence: Cite the ban on under-nines, eight-hour limits for ages 9–13, and four factory inspectors [2.5].',
          'Explanation: Explain how this broke laissez-faire and established state protection as a legal right.',
        ],
        sentence_starters: [
          'One significant consequence of the 1833 Factory Act was...',
          'Specifically, following the shocking testimonies delivered to the Sadler Committee, Parliament enacted...',
          'This meant that for the first time in British history...',
          'Furthermore, the Act appointed four statutory factory inspectors to...',
          'Consequently, the long-term significance was that...',
        ],
        connective_bank: [
          'A significant consequence was...',
          'For instance, this meant that...',
          'This directly led to...',
          'Consequently, the overall outcome was...',
        ],
        word_bank: [
          '1833 Factory Act',
          'child piecers',
          'textile mills',
          'eight-hour workday',
          'factory inspectors',
          'Sadler Committee',
          'state regulation',
          'laissez-faire',
        ],
      },
      model_answer:
        'One significant consequence of the 1833 Factory Act was the introduction of statutory legal limits on child labour and independent factory inspectors [2.5]. Specifically, the Act banned the employment of children under nine and limited nine- to thirteen-year-olds to an eight-hour workday. Crucially, appointing four independent government inspectors broke laissez-faire, establishing the legal principle that the state must protect vulnerable workers.',
      topic: 'Question 2: Explain One Consequence [4 marks • 5 mins]',
    },
  ];

  // =========================================================================
  // LESSON 3: Gold Standard Tasks & Bazalgette Sewer Source
  // =========================================================================
  data.lessons[2].narrative_blocks[4].source = {
    letter: 'D',
    title:
      'Source D: Sir Joseph Bazalgette’s London Interceptor Sewer Network Under Construction (1862)',
    context:
      'Contemporary photograph of the cavernous Abbey Mills pumping station and underground brick interceptor sewers engineered by Sir Joseph Bazalgette following the 1858 Great Stink.',
    hinge_question:
      'How did the construction of underground interceptor sewers demonstrate a decisive shift from individual laissez-faire to collective state public health engineering?',
    image: '/images/bazalgette_sewer.jpg',
    caption:
      'Source D: Construction of Sir Joseph Bazalgette’s subterranean interceptor sewer system beneath London (c. 1862). Over 318 million bricks and 82 miles of enclosed interceptor tunnels diverted London’s sewage away from the Thames, permanently eliminating waterborne cholera epidemics.',
  };

  data.lessons[2].tasks = [
    {
      id: 'ie_l3_two_features_slums',
      type: 'two_features',
      tariff: 'Question 1: Describe Two Features [4 marks • 5 mins]',
      title: 'Question 1: Describe Two Features [4 marks • 5 mins]',
      question:
        'Describe two features of back-to-back housing in 19th-century industrial towns. [4 marks]',
      feature_1: {
        prompt:
          'Feature 1: Identify one structural or architectural feature of back-to-back houses and describe its impact on living conditions.',
        starter: 'One key feature of back-to-back housing was... Specifically, this meant that...',
        model:
          'One key feature of back-to-back housing was the total lack of through-ventilation [3.1]. Specifically, houses shared walls on three sides, meaning windows only opened onto a narrow court, trapping dampness and coal soot inside.',
      },
      feature_2: {
        prompt:
          'Feature 2: Identify a second feature concerning sanitation, privies, or water supply.',
        starter: 'A second key feature was... For instance, this involved...',
        model:
          'A second key feature was the primitive communal sanitation [3.2]. For instance, up to a hundred residents shared a single outdoor cesspool privy, which frequently overflowed and contaminated local drinking water pumps.',
      },
      topic: 'Question 1: Describe Two Features [4 marks • 5 mins]',
    },
    {
      id: 'ie_l3_consequence_great_stink',
      type: 'extended_writing',
      tariff: 'Question 2: Explain One Consequence [4 marks • 5 mins]',
      title: 'Question 2: Explain One Consequence [4 marks • 5 mins]',
      question:
        'Explain one consequence of the 1858 Great Stink for public health in Victorian London. [4 marks]',
      hints: [
        'Point: State how the intolerable midsummer stench of the Thames forced Parliament to abandon laissez-faire and fund Joseph Bazalgette’s sewer network.',
        'Evidence: Cite the 18-day passage of the Metropolis Local Management Amendment Act granting £3 million to build 82 miles of brick interceptor sewers [3.5].',
        'Explanation: Explain how redirecting 400 million gallons of sewage away from the Thames permanently banished waterborne cholera from the capital.',
      ],
      scaffolding: {
        structure_strip: [
          'Point: State the decisive consequence—Parliament funded Sir Joseph Bazalgette’s monumental underground interceptor sewer network.',
          'Evidence: Cite the midsummer heat of June 1858, chloride-soaked curtains at Westminster, and £3 million allocated in 18 days [3.5].',
          'Explanation: Explain how intercepting London’s waste and pumping it downriver permanently eliminated cholera epidemics.',
        ],
        sentence_starters: [
          'One decisive consequence of the 1858 Great Stink was...',
          'During the blistering summer heat of June 1858, the River Thames became so choked with human sewage that...',
          'Politicians in the House of Commons were overwhelmed by the putrid stench, prompting them to...',
          'In just eighteen days, Parliament passed emergency legislation empowering engineer Joseph Bazalgette to...',
          'As a result, London’s public health was transformed because...',
        ],
        connective_bank: [
          'A significant consequence was...',
          'For instance, this meant that...',
          'This directly led to...',
          'Consequently, the overall outcome was...',
        ],
        word_bank: [
          'Great Stink (1858)',
          'River Thames',
          'Sir Joseph Bazalgette',
          'interceptor sewers',
          'cholera epidemics',
          'Edwin Chadwick',
          'House of Commons',
          'public health',
        ],
      },
      model_answer:
        'One decisive consequence of the 1858 Great Stink was that Parliament abandoned laissez-faire and funded Sir Joseph Bazalgette’s underground interceptor sewer network [3.5]. During the blistering summer of 1858, the putrid stench of raw sewage in the Thames forced MPs to flee Westminster. In just eighteen days, Parliament granted £3 million to build 82 miles of brick interceptor sewers, redirecting London’s waste away from drinking water and permanently eliminating waterborne cholera.',
      topic: 'Question 2: Explain One Consequence [4 marks • 5 mins]',
    },
  ];

  // =========================================================================
  // LESSON 4: Gold Standard Acts, Sources & Interactive Hotspot Map
  // =========================================================================
  data.lessons[3].narrative_blocks = [
    // Act 1
    {
      act: 1,
      title: 'Act 1: The Sledgehammer of General Ludd (1811–1816)',
      theme_heading: 'Act 1: The Sledgehammer of General Ludd (1811–1816)',
      text: '<span class="para-ref">[4.1]</span> In the manufacturing valleys of Nottinghamshire, Yorkshire, and Lancashire, industrialisation threatened skilled artisan workers with wage collapse and deskilling. In 1811, textile hand-workers organized a clandestine guerilla campaign under the mythical figurehead <strong class="vocab-highlight">General Ned Ludd</strong>. Armed with heavy sledgehammers nicknamed "Great Enoch", nocturnal raiding parties blackened their faces, marched across moors, and broke into mills to smash the newly introduced wide-frame stocking looms and steam shearing frames that undercut artisan craft wages. The British ruling class reacted with existential panic: in 1812, Parliament passed the Frame Breaking Act, making machine destruction a capital crime punishable by public hanging, and deployed over 12,000 regular troops to the industrial North—a military force larger than the army the Duke of Wellington commanded against Napoleon in Spain.',
      source: {
        letter: 'A',
        title:
          'Source A: Declaration of General Ned Ludd to the Framework Knitters (Nottinghamshire, 1811)',
        context:
          'Contemporary warning handbill delivered to stocking manufacturers in Nottinghamshire during the height of the 1811 machine-breaking raids. **Hinge Question:** Why did skilled handloom weavers direct their rage at the machinery rather than solely demanding higher wages from factory owners?',
        hinge_question:
          'Why did skilled handloom weavers direct their rage at the machinery rather than solely demanding higher wages from factory owners?',
        text: '“Whereas it hath been represented to General Ludd that certain masters have introduced wide frames for making stockings, reducing prices and manufacturing deceitful goods to the ruin of the trade: We do hereby give notice to all such masters, that if they do not immediately take down such frames, General Ludd and his army will break and destroy the same without mercy. By order of the Well-Wisher to the Industrious Poor, General Ned Ludd.”',
        caption:
          'Source A: Contemporary 1811 warning broadside circulated in Nottinghamshire, threatening machine-owning mill masters with nocturnal destruction.',
      },
    },
    // Act 2
    {
      act: 2,
      title: 'Act 2: The Peterloo Massacre: Sabres at St Peter’s Field (August 1819)',
      theme_heading: 'Act 2: The Peterloo Massacre: Sabres at St Peter’s Field (August 1819)',
      text: '<span class="para-ref">[4.2]</span> With direct industrial sabotage brutally suppressed by military force, working people turned toward constitutional political reform to demand parliamentary representation. On 16 August 1819, over 60,000 unarmed men, women, and children assembled peacefully in Sunday clothes at St Peter’s Field in Manchester. Led by the celebrated orator Henry "Orator" Hunt, the disciplined crowd carried banners demanding "Universal Suffrage" and "Vote by Ballot". Panicked local magistrates, watching from a nearby window, branded the peaceful assembly treasonous and ordered the Manchester and Salford Yeomanry—an untrained volunteer cavalry composed of wealthy cotton merchants and publicans—to charge the hustings. With drawn sabres, the mounted cavalry hacked through the densely packed throng, killing eighteen peaceful citizens and wounding over 650. The government of Lord Liverpool congratulated the magistrates and passed the draconian <strong class="vocab-highlight">Six Acts</strong>, banning unauthorized political meetings and heavily taxing radical newspapers.',
      source: {
        letter: 'B',
        title:
          'Source B: George Cruikshank, The Massacre of Peterloo or Britains in Search of Liberty (1819)',
        context:
          'George Cruikshank’s scathing satirical print attacked the Manchester magistrates and Yeomanry cavalry who charged 60,000 peaceful protesters listening to Henry Hunt. **Hinge Question:** How does Cruikshank’s satirical caption connect parliamentary disenfranchisement to economic class oppression?',
        hinge_question:
          'How does Cruikshank’s satirical caption connect parliamentary disenfranchisement to economic class oppression?',
        text: '“Down with ’em! Chop ’em down, my brave boys! Give them no quarter! Remember, the more you kill, the less poor rates you will have to pay!”\n— Caption to Cruikshank’s satirical engraving, capturing the public outrage over the cavalry assault at St Peter’s Field.',
        caption:
          'Source B: George Cruikshank, satirical print published in London in September 1819, depicting the Manchester Yeomanry charging unarmed reform demonstrators.',
      },
    },
    // Act 3
    {
      act: 3,
      title: 'Act 3: Captain Swing & The Hampshire Harvest Riots (November 1830)',
      theme_heading: 'Act 3: Captain Swing & The Hampshire Harvest Riots (November 1830)',
      text: '<span class="para-ref">[4.3]</span> A decade after Peterloo, agrarian rebellion exploded across southern England under the mysterious signature of <strong class="vocab-highlight">Captain Swing</strong>. In Hampshire and the Meon Valley, rural farm labourers faced winter starvation as newly invented horse-powered threshing machines stole their only winter wage. Desperate farm workers marched from farm to farm across downland parishes, smashing cast-iron threshing drums with sledgehammers, burning hayricks and wheat ricks under cover of night, and demanding a living wage of two shillings a day. At Selborne and Headley, mobilised crowds of over 200 labourers sacked the hated parish workhouses, dismantling punitive iron cages and burning parish pauper registers. In Fordingbridge, workers attacked the machinery at East Mills. Landowners and magistrates slept with loaded pistols, terrified that agricultural revolution was engulfing the kingdom.',
      source: {
        letter: 'C',
        title: 'Source C: The Threat of Captain Swing (National Archives HO 52/6, November 1830)',
        context:
          'Authentic threatening letter preserved in the Home Office records at The National Archives, Kew (HO 52/6). Between October and December 1830, anonymous handwritten notices signed "Captain Swing" were delivered to Hampshire squires, parsons, and magistrates, warning that barns and hayricks would be burned if wages were not raised and threshing machines destroyed.',
        hinge_question:
          'Why did agricultural labourers invoke a mythical military commander ("Captain Swing") rather than naming real village leaders?',
        image: '/images/captain_swing_letter.jpg',
        text: '“Sir, This is to inform you what will happen to you if you do not instantly destroy your threshing machines and raise the wages of your poor labourers to two shillings a day. We have sworn to endure this starvation no longer. If you do not break your machines yourself, we will come by night and burn them down, along with your barns and hayricks. Your injured servant, Captain Swing.”',
        caption:
          'Source C: Authentic 1830 "Captain Swing" threatening letter from Home Office file HO 52/6 (The National Archives, Kew). Chilling warnings delivered to Hampshire landlords demanded living wages of 2s a day under threat of nocturnal arson.',
      },
    },
    // Act 3 Hotspot Map
    {
      type: 'interactive_hotspot_map',
      title: 'Interactive Primary Map: The Hampshire Swing Riots & Rural Rebellion (1830)',
      subtitle:
        'Click the glowing pins to investigate key incident sites, workhouse riots, and the Winchester Special Assizes',
      shelfmark: 'Hampshire Record Office & The National Archives HO 52/6',
      image: '/images/hampshire_antique_map_1825.jpg',
      hotspots: [
        {
          id: 'micheldever',
          label: 'Micheldever',
          title: 'Micheldever: Execution of Henry Cook',
          x: 58,
          y: 24,
          date: 'November 1830',
          badge: 'Martyr Execution',
          color: '#dc2626',
          details:
            'Nineteen-year-old ploughboy Henry Cook joined crowds demanding a living wage of 2s a day. During a confrontation, he struck the hat of magistrate William Bingham Baring. Despite causing no physical injury and Baring pleading for mercy, the Crown executed Cook at Winchester on 24 January 1831 to terrify the rural working class.',
          hinge:
            'Hinge Question: Why did the Crown insist on executing a teenage ploughboy for merely knocking off a magistrate’s hat?',
        },
        {
          id: 'winchester_assizes',
          label: 'Winchester',
          title: 'Winchester Castle: Special Assizes Trials',
          x: 48,
          y: 29.5,
          date: 'December 1830',
          badge: 'Judicial Retribution',
          color: '#b91c1c',
          details:
            'A Special Commission of three judges sat in the Great Hall beneath the Arthurian Round Table. Over 300 Hampshire agricultural labourers were tried in a fortnight. Six were condemned to the gallows, and 101 men and boys were sentenced to 7 to 14 years’ penal transportation to Van Diemen’s Land (Tasmania), tearing families apart.',
          hinge:
            'Hinge Question: How did the state use the spectacle of trials in the ancient Norman Great Hall to reassert aristocratic authority?',
        },
        {
          id: 'selborne_headley',
          label: 'Selborne & Headley',
          title: 'Selborne & Headley: Workhouse Demolition',
          x: 82,
          y: 27.5,
          date: '22–23 Nov 1830',
          badge: 'Workhouse Riot',
          color: '#ea580c',
          details:
            'A mobilised crowd of over 200 labourers marched on the parish workhouses at Selborne and Headley. They ransacked the buildings, dismantled the punitive iron cages where pauper inmates were locked, smashed the furniture, burned the parish pauper registers, and forced the local vicar to reduce tithes by half.',
          hinge:
            'Hinge Question: Why did the rioters target parish registers and iron workhouse cages rather than stealing valuables?',
        },
        {
          id: 'fordingbridge',
          label: 'Fordingbridge',
          title: 'Fordingbridge: East Mills Machine Breaking',
          x: 16.5,
          y: 36,
          date: '23 Nov 1830',
          badge: 'Machine Sabotage',
          color: '#d97706',
          details:
            'Hundreds of farmworkers and textile artisans converged on East Mills in Fordingbridge, smashing iron threshing machines and spinning machinery with heavy sledgehammers. Local magistrates panicked, enrolling 200 special constables and calling in the 3rd Dragoon Guards and local yeomanry cavalry to disperse the crowd with drawn swords.',
          hinge:
            'Hinge Question: What does the alliance between agricultural labourers and factory artisans reveal about the shared impact of mechanisation?',
        },
        {
          id: 'meon_valley',
          label: 'Meon Valley',
          title: 'Meon Valley & Fareham: Nocturnal Rick-Burning',
          x: 64,
          y: 34.5,
          date: 'October–Dec 1830',
          badge: 'Arson & Terror',
          color: '#e11d48',
          details:
            'Across the downlands and farms of the Meon Valley, mysterious nighttime fires incinerated hayricks, wheat ricks, and barns. Threatening letters signed by "Captain Swing" warned magistrates and tenant farmers that any property harbouring threshing machines would burn. Terrified landowners mounted armed night patrols and slept with pistols.',
          hinge:
            'Hinge Question: Why was arson ("the fire-fiend") such an effective weapon of intimidation for impoverished labourers?',
        },
      ],
    },
    // Act 4
    {
      act: 4,
      title: 'Act 4: The Winchester Special Assizes & State Vengeance (December 1830)',
      theme_heading: 'Act 4: The Winchester Special Assizes & State Vengeance (December 1830)',
      text: '<span class="para-ref">[4.4]</span> The ruling aristocracy reacted to the Swing Riots with pitiless vengeance. In December 1830, Home Secretary Lord Melbourne dispatched a Special Commission of judges to hold extraordinary trials in the Great Hall of Winchester Castle. Over 300 Hampshire agricultural labourers—many illiterate young men—were dragged from village lock-ups before the judges. Six men were sentenced to death; among them was nineteen-year-old ploughboy <strong class="vocab-highlight">Henry Cook</strong> of Micheldever, convicted of knocking off the hat of magistrate William Bingham Baring. Despite Baring himself begging the judges for mercy, the Crown hanged Cook at Winchester Prison on 24 January 1831 to intimidate rural labourers. A further 101 Hampshire men and boys were sentenced to transportation, torn from their families, and shipped in disease-ridden convict hulks to penal servitude in Van Diemen’s Land (Tasmania).',
      source: {
        letter: 'D',
        title:
          'Source D: Contemporary Report of the Winchester Special Assizes (Hampshire Chronicle, December 1830)',
        context:
          'Newspaper report published in the Hampshire Chronicle during the Special Commission trials in Winchester Castle’s Great Hall.',
        hinge_question:
          'Why did the British state choose transportation to Australia rather than imprisonment inside local English county gaols?',
        text: '“The Special Assizes at Winchester concluded this week. The sentences passed upon the rioters who have disturbed the peace of this county demonstrate that His Majesty’s government will tolerate no acts of insubordination or destruction of property. Six prisoners have received sentence of death, and upwards of one hundred are to be transported beyond the seas for life or for fourteen years. It is hoped that this severe example will restore tranquility to our agricultural districts.”',
        caption:
          'Source D: Report from the Hampshire Chronicle (December 1830), detailing the mass sentencing and penal transportation of over one hundred Hampshire farmworkers.',
      },
    },
    // Act 5
    {
      act: 5,
      title: 'Act 5: The Tolpuddle Martyrs & The Right to Combine (1834)',
      theme_heading: 'Act 5: The Tolpuddle Martyrs & The Right to Combine (1834)',
      text: '<span class="para-ref">[4.5]</span> Terrified by the memory of the Swing Riots, landowners and the state treated any working-class solidarity as treason. In 1833, six agricultural labourers in the Dorset village of Tolpuddle, led by Methodist lay preacher <strong class="vocab-highlight">George Loveless</strong>, founded the Friendly Society of Agricultural Labourers to resist wage cuts from nine shillings to six shillings a week. Although trade unions had been decriminalized in 1824, local magistrate James Frampton conspired with Home Secretary Melbourne to prosecute the men under an obscure 1797 statute designed to suppress naval mutinies: administering "unlawful secret oaths". At Dorchester Assizes in March 1834, the judge sentenced all six labourers to seven years’ penal transportation to Australia. Rather than crushing unionism, the injustice ignited national fury: over 100,000 trade unionists marched peacefully across London to present a mammoth petition of 250,000 signatures, compelling the government to grant full royal pardons within two years.',
      source: {
        letter: 'E',
        title:
          'Source E: George Loveless, Statement upon Sentencing at Dorchester Assizes (March 1834)',
        context:
          'George Loveless was the leader of the Tolpuddle Martyrs—six Dorset agricultural labourers prosecuted under an obscure 1797 naval mutiny statute against unlawful oaths. **Hinge Question:** Why did the British government treat the formation of a peaceful agricultural trade union as an act of treason?',
        hinge_question:
          'Why did the British government treat the formation of a peaceful agricultural trade union as an act of treason?',
        text: '“We have injured no man’s reputation, character, person, or property. We were uniting together to preserve ourselves, our wives, and our children from utter starvation, having had our wages reduced from nine shillings to six shillings a week. We have violated no just law, and if we are to be transported for seeking an honest living, we submit to our fate in the firm belief that justice will one day prevail.”',
        caption:
          'Source E: Statement written by Methodist lay preacher George Loveless on a scrap of paper before being shipped to an Australian penal colony.',
      },
    },
  ];

  data.lessons[3].tasks = [
    {
      id: 'ie_l4_two_features_swing_riots',
      type: 'two_features',
      tariff: 'Question 1: Describe Two Features [4 marks • 5 mins]',
      title: 'Question 1: Describe Two Features [4 marks • 5 mins]',
      question: 'Describe two features of the 1830 Hampshire Swing Riots. [4 marks]',
      feature_1: {
        prompt:
          'Feature 1: Identify the methods and tactics used by agricultural machine-breakers (e.g. nocturnal arson, sledgehammers, and threatening letters).',
        starter:
          'One key feature of the Hampshire Swing Riots was... Specifically, this involved...',
        model:
          'One key feature of the Hampshire Swing Riots was the nocturnal sabotage of farm machinery accompanied by threatening letters [4.3]. Specifically, labourers under the mythical name "Captain Swing" smashed iron threshing drums with sledgehammers and burned hayricks to protect winter jobs.',
      },
      feature_2: {
        prompt:
          'Feature 2: Identify the state’s draconian judicial response at the Winchester Special Assizes.',
        starter: 'A second key feature was... For example, this meant that...',
        model:
          'A second key feature was the severe judicial retribution by the state at the Winchester Special Assizes [4.4]. For example, special judges tried over 300 Hampshire farmworkers, hanging nineteen-year-old Henry Cook and transporting 101 men to penal colonies in Australia.',
      },
      topic: 'Question 1: Describe Two Features [4 marks • 5 mins]',
    },
    {
      id: 'ie_l4_narrative_account_protest',
      type: 'narrative_account',
      tariff: 'Question 2: Narrative Account [8 marks • 10 mins]',
      title: 'Question 2: Narrative Account [8 marks • 10 mins]',
      question:
        'Write a narrative account analysing the key events leading from the Peterloo Massacre (1819) and Hampshire Swing Riots (1830) to the Tolpuddle Martyrs (1834). [8 marks]',
      stimulus: [
        'The cavalry charge at St Peter’s Field, Manchester (1819)',
        'The destruction of threshing machines across Hampshire (1830)',
      ],
      hints: [
        'Beginning (1819 Peterloo): State how cavalry attacked 60,000 peaceful reformers at St Peter’s Field, leading to the repressive Six Acts [4.2].',
        'Middle (1830 Swing Riots): Explain how winter starvation and threshing machines triggered Hampshire riots, meeting brutal retribution at Winchester [4.3, 4.4].',
        'End (1834 Tolpuddle): Show how this repression convinced farmworkers to form peaceful trade unions, culminating in the Tolpuddle Martyrs [4.5].',
      ],
      scaffolding: {
        structure_strip: [
          'Beginning (Peterloo 1819): Manchester Yeomanry charge unarmed crowd; Six Acts passed to suppress political protest [4.2].',
          'Middle (Hampshire Swing Riots 1830): Threshing machine destruction; Winchester Assizes sentences 101 men to transportation [4.3, 4.4].',
          'End (Tolpuddle Martyrs 1834): Dorset farmworkers form friendly society; prosecution for secret oaths sparks national protests and pardons [4.5].',
        ],
        sentence_starters: [
          'The sequence of working-class protest began in August 1819 when...',
          'In response, the government passed the repressive Six Acts, which drove protest underground until...',
          'This state repression caused deep resentment to simmer, leading to a turning point in 1830 when...',
          'Labourers smashed newly introduced threshing machines that stole winter wages, but at Winchester Castle...',
          'Consequently, this brutal suppression convinced workers to form peaceful unions, culminating in 1834 when...',
          'Six Dorset labourers were sentenced to penal transportation for secret oaths, sparking national protests that forced full pardons.',
        ],
        connective_bank: [
          'The sequence began in...',
          'This state repression caused...',
          'A decisive turning point occurred when...',
          'This led to...',
          'Consequently, this culminated in...',
          'As a direct consequence...',
        ],
        word_bank: [
          'Peterloo Massacre (1819)',
          'St Peter’s Field',
          'Manchester Yeomanry',
          'Six Acts',
          'Captain Swing (1830)',
          'threshing machines',
          'Winchester Special Assizes',
          'Henry Cook',
          'penal transportation',
          'Tolpuddle Martyrs (1834)',
          'George Loveless',
          'unlawful secret oaths',
        ],
      },
      model_answer:
        'The sequence began in August 1819 with the Peterloo Massacre in Manchester [4.2]. Over 60,000 peaceful protestors gathered to demand parliamentary reform, but panic-stricken magistrates ordered cavalry to charge the crowd, killing 18 people. In response, the government passed the repressive Six Acts to crush political meetings, driving working-class agitation underground.\n\nThis state repression caused deep resentment to simmer, leading to a turning point in 1830 with the Hampshire Swing Riots [4.3, 4.4]. Facing winter starvation caused by new horse-powered threshing machines, labourers smashed machinery and burned hayricks under the name "Captain Swing". The government responded ruthlessly at the Winchester Assizes, hanging Henry Cook and transporting 101 men.\n\nConsequently, this brutal suppression convinced workers to abandon violent riots and form peaceful unions, culminating in 1834 with the Tolpuddle Martyrs [4.5]. Six Dorset farmworkers formed a friendly society to resist wage cuts, but were sentenced to penal transportation for secret oaths. This injustice provoked massive national protests, forcing the government to grant full pardons.',
      topic: 'Question 2: Narrative Account [8 marks • 10 mins]',
    },
  ];

  // =========================================================================
  // LESSON 5: Gold Standard Tasks, Do Now Fix, and Chartist Demo Source
  // =========================================================================
  // Fix Do Now items 4 & 5 to recall previous lesson content (Swing Riots & Tolpuddle)
  data.lessons[4].do_now.items[3] = {
    question:
      'Why were horse-powered threshing machines the primary target of Hampshire agricultural labourers during the 1830 Swing Riots?',
    answer:
      'Threshing machines destroyed the only winter employment and wages available to farm labourers, threatening their families with starvation.',
  };
  data.lessons[4].do_now.items[4] = {
    question:
      'Under what obscure 1797 statute were the Tolpuddle Martyrs prosecuted in 1834 for forming a peaceful friendly society?',
    answer:
      'Administering unlawful secret oaths (originally passed to suppress the 1797 naval mutinies at Spithead and the Nore).',
  };

  // Add Source D to Act 4 (The People’s Charter)
  data.lessons[4].narrative_blocks[3].source = {
    letter: 'D',
    title: 'Source D: The Chartist Mass Demonstration at Kennington Common (10 April 1848)',
    context:
      'Contemporary daguerreotype photograph by William Edward Kilburn showing the massive Chartist assembly at Kennington Common, London, gathered to present the third Monster Petition to Parliament.',
    hinge_question:
      'Why did the British state assemble 85,000 special constables and deploy the Duke of Wellington to confront a crowd presenting a petition?',
    image: '/images/chartist_demo.jpg',
    caption:
      'Source D: Daguerreotype photograph of the historic Chartist rally at Kennington Common on 10 April 1848. Over 25,000 working-class supporters assembled under the leadership of Feargus O’Connor to present the six million signatures of the third People’s Charter to the House of Commons.',
  };

  // Update Lesson 5 Act 4 text to cite Source D
  if (data.lessons[4].narrative_blocks[3]) {
    data.lessons[4].narrative_blocks[3].text =
      '<span class="para-ref">[5.4]</span> Outraged by exclusion, cabinetmaker William Lovett and radical reformers drafted the <strong>People’s Charter of 1838</strong>, igniting the massive <strong class="vocab-highlight">Chartist movement</strong>. Chartists demanded the famous <strong>Six Points</strong>: universal male suffrage, the secret ballot, no property qualifications for MPs, salaries for MPs, equal constituencies, and annual parliaments. In 1839, 1842, and 1848, Chartists presented colossal monster petitions to Parliament, culminating in the historic 1848 Kennington Common mass demonstration (<span class="archival-meta-tag">Source D</span>). Although Parliament contemptuously rejected every petition and arrested leaders, Chartism created Britain’s first unified mass working-class political identity.';
  }

  // Update Act 5 source to Source E and fix text citation
  if (data.lessons[4].narrative_blocks[4]) {
    if (data.lessons[4].narrative_blocks[4].text) {
      data.lessons[4].narrative_blocks[4].text = data.lessons[4].narrative_blocks[4].text.replace(
        'Source D',
        'Source E',
      );
    }
    if (data.lessons[4].narrative_blocks[4].source) {
      data.lessons[4].narrative_blocks[4].source.letter = 'E';
      data.lessons[4].narrative_blocks[4].source.title =
        data.lessons[4].narrative_blocks[4].source.title.replace(/^Source D/i, 'Source E');
      data.lessons[4].narrative_blocks[4].source.caption =
        data.lessons[4].narrative_blocks[4].source.caption.replace(/^Source D/i, 'Source E');
    }
  }

  data.lessons[4].tasks = [
    {
      id: 'ie_l5_evaluative_essay_reform_act',
      type: 'extended_writing',
      tariff: 'Question 3: Evaluative Statement Essay [12 marks • 15 mins]',
      title: 'Question 3: Evaluative Statement Essay [12 marks • 15 mins]',
      question:
        '“The 1832 Great Reform Act was passed because the ruling aristocracy feared violent revolution, rather than from a desire for democratic justice.” How far do you agree with this statement? Explain your answer. [12 marks]',
      stimulus: [
        'The burning of Bristol and the "Days of May" run on the Bank of England (1831–1832)',
        'Earl Grey’s £10 property qualification deliberately excluding the working class',
      ],
      hints: [
        'Side 1 (Fear of Violent Revolution): Explain how the Bristol riots, the burning of Nottingham Castle, and the £1.5m gold bank run terrified ruling elites into passing reform [5.2].',
        'Side 2 (Aristocratic Compromise & Preservation): Explain how Earl Grey standardized the £10 franchise to attach the wealthy middle class to the constitution while shutting out working men [5.1, 5.3].',
        'Comparative Verdict: Weigh whether the Act was a reluctant aristocratic concession to preserve oligarchy or a vital stepping stone toward democracy.',
      ],
      scaffolding: {
        structure_strip: [
          'Introduction: Contextualize the 1832 Great Reform Act. Define the debate: was reform driven by existential terror of popular insurrection, or by a calculated Whig strategy to preserve the aristocratic constitution?',
          'PEEL 1 (Fear of Insurrection & Economic Collapse): Analyze the Bristol riots, arson of Nottingham Castle, and Francis Place’s "Days of May" run on gold that paralyzed Wellington [5.2].',
          'PEEL 2 (Aristocratic Preservation & Working-Class Exclusion): Analyze Earl Grey’s conservative philosophy—"reform in order to preserve"—and how the £10 property qualification deliberately locked out working men [5.3].',
          'Conclusion & Historical Verdict: Synthesize both arguments. Conclude whether fear was the immediate trigger while aristocratic self-preservation determined the actual conservative architecture of the Act.',
        ],
        sentence_starters: [
          'To a large extent, it can be argued that the 1832 Great Reform Act was conceded primarily because the ruling aristocracy feared an armed revolution...',
          'In particular, when the Tory House of Lords rejected the Reform Bill in October 1831, widespread violence erupted across Britain...',
          'In Bristol, rioters sacked the Mansion House, burned the Bishop’s Palace, and destroyed three prisons...',
          'Furthermore, during the "Days of May" in 1832, radical leader Francis Place weaponized economic panic with the slogan "Stop the Duke, Go for Gold!", triggering...',
          'This £1.5 million run on the Bank of England convinced King William IV and the Duke of Wellington that military rule was impossible...',
          'On the other hand, an alternative perspective is that the Whig leadership under Earl Grey was motivated by aristocratic self-preservation rather than fear alone...',
          'Earl Grey famously declared that he aimed to "reform in order to preserve", enfranchising only the respectable middle class with a strict £10 borough qualification...',
          'Consequently, working-class men who had fought for the Bill found themselves completely disenfranchised, leading them to denounce the Act as the "Great Betrayal"...',
          'In conclusion, the decisive reason why the Act passed in 1832 was that imminent threat of revolution forced the Lords to yield, but the resulting legislation was designed to protect aristocratic power rather than advance democratic justice.',
        ],
        connective_bank: [
          'To a large extent, it can be argued that...',
          'In particular, a decisive factor was...',
          'Furthermore, this created severe consequences because...',
          'On the other hand, an alternative perspective is that...',
          'In conclusion, the decisive reason why...',
        ],
        word_bank: [
          'Earl Grey',
          'Great Reform Act (1832)',
          'rotten boroughs',
          'Old Sarum',
          'Bristol Reform Riots',
          'Days of May',
          'Francis Place ("Go for Gold")',
          '£10 property qualification',
          'Great Betrayal',
          'People’s Charter (1838)',
          'Secret Ballot Act (1872)',
        ],
      },
      model_answer:
        'To a large extent, I agree that the 1832 Great Reform Act was passed because the ruling aristocracy feared violent revolution [5.2]. When the House of Lords rejected the Reform Bill in 1831, widespread rioting erupted across Britain. In Bristol, crowds burned the Bishop’s Palace and three prisons, while in Nottingham the Duke’s castle was destroyed. Furthermore, during the 1832 "Days of May", radicals organized a £1.5 million run on the Bank of England, convincing the King and Wellington that refusing reform would trigger economic collapse and civil war.\n\nOn the other hand, the actual terms of the Act demonstrate that the Whig government wanted to preserve aristocratic power rather than advance democratic justice [5.1, 5.3]. Prime Minister Earl Grey explicitly stated his aim was to "reform in order to preserve". The Act introduced a strict £10 annual property qualification, deliberately enfranchising the wealthy middle class while completely locking out working-class men who had protested for it. Radicals rightly condemned this settlement as the "Great Betrayal".\n\nIn conclusion, I agree with the statement. While fear of violent revolution was the immediate catalyst that forced the Lords to pass the Act, the aristocracy designed the legislation to protect their own supremacy by dividing middle-class reformers from working people.',
      topic: 'Question 3: Evaluative Statement Essay [12 marks • 15 mins]',
    },
  ];

  console.log('✍️ Writing updated units/industrialisation_and_empire/data.js...');
  const fileContent = `const industrialisation_and_empire = ${JSON.stringify(data, null, 2)};\n\nexport default industrialisation_and_empire;\n`;
  fs.writeFileSync(dataFilePath, fileContent, 'utf8');

  console.log('✅ Successfully wrote updated data.js!');
}

run().catch((err) => {
  console.error('❌ Error executing update script:', err);
  process.exit(1);
});
