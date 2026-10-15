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
        'To a large extent, it can be argued that Henry Cort achieved his metallurgical breakthrough in wrought iron production at Funtley in 1784 because of the urgent strategic imperative to secure naval self-sufficiency for the Royal Navy [1.1, 1.5]. Prior to Cort’s innovations, British blast furnaces relied on pit coal that contaminated iron with sulfur, producing brittle pig iron that shattered under tension. Consequently, Britain was forced to import over 50,000 tons of high-grade Swedish Orgrounds iron every year to forge anchors, bolts, and cannon hoops for His Majesty’s Fleet. Situated close to Portsmouth Royal Dockyard along the River Meon, Cort directly observed this naval bottleneck and secured naval contracts from Admiralty commissioners who desperately needed domestic shatter-resistant iron during the American Revolutionary War. Therefore, the strategic demand and financial patronage of the Royal Navy provided the vital catalyst for Cort’s metallurgical experiments.\n\nIn particular, the decisive technological factor enabling Cort’s breakthrough was his revolutionary combination of the reverberatory puddling furnace and grooved rolling mill [1.3, 1.4]. Previous ironmasters had failed to purify pig iron without burning charcoal. In 1784, Cort perfected the puddling technique: he melted pig iron in an enclosed reverberatory furnace where heat reflected onto the metal while keeping it separate from the sulfurous burning coal. By stirring the molten bath with long iron rods, carbon and impurities were burned away, transforming the metal into pasty blooms of malleable wrought iron. Furthermore, instead of utilizing slow mechanical trip hammers, Cort passed the red-hot iron through heavy grooved rollers powered by a waterwheel on the River Meon. These grooved cylinders squeezed out trapped liquid slag and formed uniform bars fifteen times faster than traditional forging. As demonstrated during the 1787 Portsmouth Dockyard trials, Cort’s Funtley iron surpassed the finest Baltic imports in tensile strength. In conclusion, Cort’s breakthrough succeeded because he united chemical decarburisation with continuous mechanical rolling, emancipating Britain from foreign suppliers and laying the metallurgical foundations of global industrial supremacy.',
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
          'One key feature of working conditions for child labourers was the extreme physical danger of working around unguarded machinery [2.3]. Specifically, young children were employed as "piecers" and "scavengers" who were forced to crawl beneath fast-moving spinning mules while the heavy frames were in motion to sweep up loose cotton fibres and tie broken threads. Because spinning frames lacked safety guards, children frequently suffered catastrophic injuries, including crushed fingers, broken limbs, and horrific scalpings when their hair was caught in turning iron shafts.',
      },
      feature_2: {
        prompt:
          'Feature 2: Identify a second feature regarding working hours, fatigue, or draconian factory discipline.',
        starter: 'A second key feature was... For example, this meant that...',
        model:
          'A second key feature was the exhausting shift lengths enforced by brutal corporal punishment [2.2, 2.4]. For example, child apprentices typically worked fourteen- to sixteen-hour days, starting as early as 5:00 a.m. in stifling, lint-filled air with only forty minutes for meals. To prevent children from falling asleep or slowing production as extreme fatigue set in, overlookers routinely beat them with heavy leather straps ("strapping") and imposed harsh monetary fines for lateness, opening a window, or sitting down.',
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
        'One significant consequence of the 1833 Factory Act was the historic establishment of state regulation and statutory legal protection for child workers in British textile mills [2.5]. Prior to 1833, British governments adhered strictly to laissez-faire, allowing mill masters to employ children of any age for unlimited hours without legal oversight. In response to the horrifying evidence of crippling deformities and beatings revealed by the Sadler Committee [2.4], the 1833 Act prohibited the employment of children under the age of nine in textile mills, capped the working hours of children aged nine to thirteen at eight hours per day, and mandated two hours of compulsory schooling daily. Crucially, the legislation appointed four statutory factory inspectors with legal powers to enter mills unannounced and prosecute offending masters. Although four inspectors were insufficient to police thousands of mills across Lancashire and Yorkshire, the Act established the revolutionary legal precedent that the state had a duty to intervene in private industry to protect vulnerable workers.',
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
      'Contemporary photograph of the cavernous Abbey Mills pumping station and underground brick interceptor sewers engineered by Sir Joseph Bazalgette following the 1858 Great Stink. **Hinge Question:** How did the construction of underground interceptor sewers demonstrate a decisive shift from individual laissez-faire to collective state public health engineering?',
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
          'One key feature of back-to-back housing was the shared party walls and total lack of through-ventilation [3.1]. Specifically, speculative builders constructed rows of narrow houses touching each other on three sides—sharing rear walls and both side walls—leaving only a single exterior wall with windows facing into a narrow, sunless court. This meant that fresh air could never circulate through the rooms, trapping dampness, toxic coal soot, and stale air inside crowded family living spaces.',
      },
      feature_2: {
        prompt:
          'Feature 2: Identify a second feature concerning sanitation, privies, or water supply.',
        starter: 'A second key feature was... For instance, this involved...',
        model:
          'A second key feature was the primitive, overflowing communal sanitation [3.2]. For instance, entire courts containing upwards of a hundred working people shared a single outdoor cesspool privy or ash-pit located directly outside ground-floor doors. Because nightsoil was rarely cleared, human excrement piled into towering dunghills that seeped directly into the soil, fatally contaminating the shallow communal pump wells from which residents drew their daily drinking and cooking water.',
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
        'One decisive consequence of the 1858 Great Stink was that it compelled Parliament to overcome decades of political inertia and fully fund Sir Joseph Bazalgette’s monumental underground interceptor sewer network [3.5]. Prior to 1858, British politicians resisted municipal expenditure on sanitation, leaving over 200,000 cesspools to drain raw sewage directly into the River Thames, which also served as the capital’s primary drinking supply. During the scorching summer of June 1858, the river fermented into a toxic slough of effluvia so intolerable that MPs at Westminster soaked committee curtains in chloride of lime to stifle the stench and fled the building in terror. In just eighteen days, Parliament abandoned laissez-faire and passed the Metropolis Local Management Amendment Act, providing engineer Joseph Bazalgette with £3 million to construct 82 miles of subterranean brick interceptor sewers. Bazalgette’s system intercepted 400 million gallons of sewage daily before it could reach the central Thames, pumping it eastward to Beckton and Crossness. Consequently, by permanently separating London’s drinking water from contaminated effluent, this sewer infrastructure eradicated waterborne cholera from London and created the blueprint for modern sanitary engineering.',
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
          'Authentic threatening letter preserved in the Home Office records at The National Archives, Kew (HO 52/6). Between October and December 1830, anonymous handwritten notices signed "Captain Swing" were delivered to Hampshire squires, parsons, and magistrates, warning that barns and hayricks would be burned if wages were not raised and threshing machines destroyed. **Hinge Question:** Why did agricultural labourers invoke a mythical military commander ("Captain Swing") rather than naming real village leaders?',
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
          x: 52,
          y: 41,
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
          y: 52,
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
          x: 74,
          y: 44,
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
          x: 18,
          y: 64,
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
          x: 60,
          y: 68,
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
          'Newspaper report published in the Hampshire Chronicle during the Special Commission trials in Winchester Castle’s Great Hall. **Hinge Question:** Why did the British state choose transportation to Australia rather than imprisonment inside local English county gaols?',
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
          'One key feature of the Hampshire Swing Riots was the systematic nocturnal destruction of farm machinery accompanied by anonymous threatening letters [4.3]. Specifically, impoverished agricultural labourers in the Meon Valley, Selborne, and Headley mobilized under the mythical figurehead "Captain Swing", sending chilling handwritten notices to squires and parsons demanding an end to wage reductions and the removal of horse-powered threshing machines. When landlords refused, bands of farmworkers armed with sledgehammers raided barns at night to smash iron threshing drums and set fire to valuable hayricks and grain barns, illuminating the Hampshire downlands with fires.',
      },
      feature_2: {
        prompt:
          'Feature 2: Identify the state’s draconian judicial response at the Winchester Special Assizes.',
        starter: 'A second key feature was... For example, this meant that...',
        model:
          'A second key feature was the savage judicial retaliation imposed by the British state at the Winchester Special Assizes in December 1830 [4.4]. For example, the government appointed a special judicial commission that prosecuted over 300 Hampshire farmworkers in Winchester Castle’s Great Hall. The judges sentenced six men to death—including 19-year-old ploughboy Henry Cook of Micheldever, who was hanged for striking magistrate Bingham Baring’s hat—and transported 101 Hampshire labourers to Australian penal colonies in Van Diemen’s Land, devastating rural village communities.',
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
        'Chronological Link 1: Begin with Peterloo (1819) where cavalry charged 60,000 peaceful reformers, leading to the repressive Six Acts [4.2].',
        'Chronological Link 2: Explain how agrarian distress in 1830 triggered the Hampshire Swing Riots, crushing threshing machines and meeting brutal retribution at Winchester [4.3, 4.4].',
        'Chronological Link 3: Show how this continuous repression culminated in the 1834 prosecution of the Tolpuddle Martyrs for secret oaths, sparking national trade union mobilization [4.5].',
      ],
      scaffolding: {
        structure_strip: [
          'Phase 1 (Peterloo 1819 & Repression): Manchester Yeomanry sabre charge killing 18 peaceful protestors; Lord Liverpool’s government passes the Six Acts banning meetings [4.2].',
          'Phase 2 (Hampshire Swing Riots 1830): Rural starvation and threshing machines trigger machine-wrecking and rick-burning; 101 transported at Winchester [4.3, 4.4].',
          'Phase 3 (Tolpuddle Martyrs 1834 & National Backlash): Six Dorset farmworkers convicted under 1797 mutiny act for friendly society oaths; massive London protests force royal pardons [4.5].',
        ],
        sentence_starters: [
          'The sequence of working-class protest began in August 1819 when...',
          'Magistrates panicked and ordered the Manchester Yeomanry to charge into the unarmed crowd...',
          'In response, the Tory government passed the repressive Six Acts, which drove radical protest underground until...',
          'A decisive turning point occurred in November 1830 when the Hampshire Swing Riots erupted...',
          'Starving agricultural labourers smashed newly introduced threshing machines that stole winter wages, prompting...',
          'At the Winchester Special Assizes, the state demonstrated ruthless vengeance by sentencing 101 Hampshire men to transportation and hanging Henry Cook...',
          'Consequently, to avoid violent retribution, workers turned to peaceful mutual aid, culminating in 1834 when six Dorset labourers formed a friendly society in Tolpuddle...',
          'Landowners panicked and had them sentenced to seven years’ penal transportation under an obscure naval mutiny statute...',
          'Ultimately, this sparked the first massive national trade union mobilization, forcing the government to grant full royal pardons.',
        ],
        connective_bank: [
          'The sequence began when...',
          'This led to increasing conflict because...',
          'A decisive turning point occurred when...',
          'This directly caused...',
          'Consequently, this culminated in...',
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
          'Grand National Consolidated Trades Union',
        ],
      },
      model_answer:
        'The sequence of radical working-class protest began in August 1819 with the Peterloo Massacre at St Peter’s Field, Manchester [4.2]. A crowd of 60,000 unarmed textile workers gathered peacefully to hear orator Henry Hunt demand universal male suffrage and the repeal of the Corn Laws. Terrified local magistrates panicked and ordered the mounted Manchester Yeomanry to charge into the dense crowd with drawn sabres, killing eighteen people and maiming over 650. In the immediate aftermath, Lord Liverpool’s Tory government endorsed the massacre and passed the repressive Six Acts, banning unauthorised political meetings and heavily taxing radical newspapers. This state violence suppressed overt political agitation, but economic misery continued to fester among industrial and agricultural workers alike.\n\nA decisive escalation occurred in the winter of 1830 when agrarian rebellion erupted across southern England in the Hampshire Swing Riots [4.3]. Starving agricultural labourers in villages such as Micheldever, Selborne, and the Meon Valley saw their winter threshing wages wiped out by horse-powered threshing machines. Operating under the pseudonym "Captain Swing", workers launched nocturnal raids to smash iron threshing drums, burn grain ricks, and demand living wages. The British state responded with ruthless severity: at the December 1830 Winchester Special Assizes, special judges tried over 300 Hampshire labourers, hanging nineteen-year-old Henry Cook for striking a magistrate and sentencing 101 men to penal transportation to Australia [4.4].\n\nConsequently, this brutal suppression convinced working-class leaders to abandon violent sabotage and organize peaceful, disciplined mutual aid societies, which directly culminated in the arrest of the Tolpuddle Martyrs in 1834 [4.5]. In Dorset, Methodist lay preacher George Loveless and five fellow farmworkers formed the Friendly Society of Agricultural Labourers to resist wage cuts from nine shillings to six shillings a week. Terrified by the spectre of coordinated rural unionism following the Swing Riots, local magistrates invoked an obscure 1797 naval mutiny statute prohibiting "unlawful secret oaths", sentencing the six labourers to seven years’ penal transportation to Van Diemen’s Land. However, rather than crushing trade unionism, this transparent injustice ignited massive national solidarity protests: 100,000 marchers gathered at Copenhagen Fields in London and presented a petition of 250,000 signatures to Parliament, successfully compelling the government to grant full royal pardons within two years. Thus, the arc from Peterloo and Captain Swing to Tolpuddle transformed isolated working-class uprisings into a formidable national trade union movement.',
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
      'Contemporary daguerreotype photograph by William Edward Kilburn showing the massive Chartist assembly at Kennington Common, London, gathered to present the third Monster Petition to Parliament. **Hinge Question:** Why did the British state assemble 85,000 special constables and deploy the Duke of Wellington to confront a crowd presenting a petition?',
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
        'To a large extent, it can be argued that the 1832 Great Reform Act was passed because the ruling aristocracy feared violent revolution, rather than from any genuine desire for democratic justice [5.2]. In the early 1830s, Britain stood on the precipice of civil insurrection. When the reactionary Tory majority in the House of Lords rejected the second Reform Bill in October 1831, fury erupted across the nation. In Bristol, crowds rioted for three days, storming the Mansion House, sacking three prisons, and burning the Bishop’s Palace to ashes, requiring military cavalry charges to restore order. Similar riots erupted in Derby and Nottingham, where the historic castle belonging to the anti-reform Duke of Newcastle was incinerated. Furthermore, during the "Days of May" in 1832, when King William IV attempted to reinstall the anti-reform Duke of Wellington as Prime Minister, middle-class and working-class radicals joined forces to wage financial warfare. Organized by Francis Place under the rallying cry "Stop the Duke, Go for Gold!", reformers withdrew over £1.5 million in gold sovereigns from the Bank of England in ten days, bringing Britain’s financial system to the brink of collapse. Facing nationwide tax strikes, armed political unions drilling openly in Birmingham, and an impending run on the banks, Wellington conceded that military repression was impossible, and the King agreed to threaten the House of Lords with the creation of Whig peers to force the Bill through. Therefore, popular militancy and financial panic were the immediate, indispensable catalysts that compelled the aristocracy to yield.\n\nOn the other hand, an alternative perspective demonstrates that the specific structure and content of the Great Reform Act were dictated by a cynical aristocratic strategy to preserve oligarchic power, rather than to establish democratic fairness [5.1, 5.3]. Prime Minister Earl Grey and the Whig aristocrats had no faith in universal democracy; Grey explicitly declared to the House of Lords that his policy was to "reform in order to preserve" the constitution. Rather than enfranchising the people, the Act established a uniform £10 annual property qualification in parliamentary boroughs, which deliberately enfranchised the affluent middle class—merchants, factory owners, and professionals—while locking out the entire working class. By abolishing fifty-six depopulated rotten boroughs like Old Sarum and redistributing seats to industrial cities such as Manchester, Birmingham, and Leeds, the Whigs successfully detached the wealthy middle class from the revolutionary working class, binding commercial wealth to the aristocratic establishment. Working-class radicals who had manned the barricades in Bristol and risked starvation to pass the Bill realized they had been utterly excluded, bitterly denouncing the settlement as the "Great Betrayal" [5.3].\n\nIn conclusion, the statement is overwhelmingly accurate: fear of violent revolution and economic collapse was the decisive factor that broke the intransigence of the House of Lords in 1832. However, while existential dread of insurrection forced the ruling class to act, the Whig government drafted the legislation specifically to preserve aristocratic hegemony by dividing their opponents, granting power only to the propertied bourgeoisie while ensuring that genuine democratic justice for working people was delayed until the Chartist campaigns and the Secret Ballot Act of 1872.',
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
