/**
 * Master 5-Block Decimal Curriculum Standard
 * Lesson 4: Industrial Revolution Public Health (c.1780–1850)
 */

module.exports = {
  id: 'lesson_4',
  title: 'How did the Industrial Revolution lead to a public health crisis?',
  enquiry:
    "Was Victorian cholera spread by greedy factory owners building cheap slums, or by the government's refusal to interfere?",
  subtitle: 'From boomtowns and back-to-backs to Asiatic cholera and Edwin Chadwick’s 1842 Report',
  skill: 'Disciplinary Skill: Causation & Living Conditions',
  card_image: '/images/victorian_slum.jpg',
  card_position: 'center 30%',
  banner: '/images/victorian_slum.jpg',
  cover_image: '/images/victorian_slum.jpg',

  prologue:
    'Between 1780 and 1850, the Industrial Revolution catapulted Britain into the modern age as the "workshop of the world". Steam-powered factories, ironworks, and textile mills drew millions of agricultural labourers into booming northern cities like Manchester, Leeds, and Sheffield. Speculative landlords threw up shoddy, back-to-back houses and unventilated cellars where entire families lived amidst raw sewage. When Asiatic Cholera made landfall in 1831, killing thousands in hours, Victorian society blamed bad air (miasma). Even when Edwin Chadwick published his landmark 1842 report proving filth caused disease and economic ruin, the entrenched dogma of "laissez-faire" blocked compulsory reform.',

  margin_spine: [
    { year: '1780', label: '4.1 Boomtown Urbanisation' },
    { year: '1831', label: '4.2 The Blue Death' },
    { year: '1842', label: '4.3 Chadwick’s Report' },
    { year: '1848', label: '4.4 The 1848 Act' },
    { year: '1854', label: '4.5 Laissez-Faire Gridlock' },
  ],

  causal_domino_spine: {
    title: 'Industrial Urbanisation, Cholera Epidemics & Chadwick (1780–1850)',
    subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
    stages: [
      {
        step: 1,
        para_ref: '[4.1]',
        date: '1780–1830',
        title: 'The Factory Shock: Boomtowns & Back-to-Backs',
        actor: 'Mill Owners, Speculative Landlords & Factory Workers',
        tag: '🏭 BOOMTOWN SQUALOR',
        trigger:
          'The rapid rise of steam-powered cotton mills caused cities like Manchester to explode tenfold, prompting landlords to throw up unventilated back-to-back slums.',
        connective:
          'Packed up to a hundred workers per shared privy midden, leaving courtyards knee-deep in overflowing sewage and uncollected factory refuse.',
        question: 'How did industrial urbanisation create catastrophic living conditions?',
      },
      {
        step: 2,
        para_ref: '[4.2]',
        date: 'c.1830',
        title: 'Contaminated Water & Slum Squalor',
        actor: 'Slum Families & Private Water Companies',
        tag: '💧 CONTAMINATED WELLS',
        trigger:
          'Slum dwellers relied on intermittent standpipes or shallow wells contaminated by nearby leaking cesspools and industrial river waste.',
        connective:
          'Left working-class communities physically defenseless against microscopic water-borne pathogens, while water companies pumped unfiltered river water.',
        question: 'Why was drinking water in industrial towns dangerously contaminated?',
      },
      {
        step: 3,
        para_ref: '[4.3]',
        date: '1831–1832',
        title: 'The Blue Death Arrives: Asiatic Cholera & Miasma',
        actor: 'Asiatic Cholera & The General Board of Health',
        tag: '🦠 ASIATIC CHOLERA',
        trigger:
          'In October 1831, Asiatic Cholera arrived in Sunderland, killing healthy victims within hours through violent dehydration that turned their skin blue.',
        connective:
          'Terrified the nation, yet authorities wasted time lighting tar bonfires and whitewashing alleys because physicians dogmatically blamed miasma.',
        question: 'Why did the arrival of cholera in 1831 cause widespread national terror?',
      },
      {
        step: 4,
        para_ref: '[4.4]',
        date: '1842',
        title: 'Edwin Chadwick’s 1842 Sanitary Report',
        actor: 'Edwin Chadwick & Poor Law Commissioners',
        tag: '📊 1842 CHADWICK REPORT',
        trigger:
          'Edwin Chadwick published his landmark 400-page parliamentary report proving average life expectancy for Manchester labourers was just 17 years.',
        connective:
          'Persuaded MPs that filthy living conditions generated preventable poverty and widowed families, costing ratepayers far more than installing sewers.',
        question: 'How did Edwin Chadwick prove that slum filth was costing Britain a fortune?',
      },
      {
        step: 5,
        para_ref: '[4.5]',
        date: '1848–1854',
        title: 'The 1848 Act & The Bastion of Laissez-Faire',
        actor: 'Parliament, Ratepayers & General Board of Health',
        tag: '⚖️ LAISSEZ-FAIRE BASTION',
        trigger:
          'A second cholera outbreak forced Parliament to pass the 1848 Public Health Act, creating a General Board of Health with permissive, optional powers.',
        connective:
          'Allowed tight-fisted ratepayers to block sewer construction, leading to Chadwick’s sacking in 1854 and proving laissez-faire remained deeply entrenched.',
        question: 'Why did Victorian ideology fiercely resist compulsory government intervention?',
      },
    ],
  },

  workbook_stages: [
    {
      step: 1,
      paraRef: '[4.1]',
      date: '1780–1830',
      questionHeading: 'How did industrial urbanisation create catastrophic living conditions?',
      bullets: [
        'Steam-Powered Mill Towns',
        'Back-to-Back Slum Rows',
        '50 People Sharing One Privy',
      ],
      focusClue:
        'Why did speculative landlords construct unventilated back-to-back terraces without drains or water connections?',
    },
    {
      step: 2,
      paraRef: '[4.2]',
      date: 'c.1830',
      questionHeading: 'Why was drinking water in industrial towns dangerously contaminated?',
      bullets: ['Shallow Garden Wells', 'Leaking Privy Cesspools', 'Intermittent Standpipes'],
      focusClue:
        'How did untreated cesspool slurry seep directly into drinking wells and local rivers?',
    },
    {
      step: 3,
      paraRef: '[4.3]',
      date: '1831–1832',
      questionHeading: 'Why did the arrival of cholera in 1831 cause widespread national terror?',
      bullets: [
        'Sunderland Coal Port Arrival',
        'Dehydration in Hours',
        'Miasma Air Purification Fires',
      ],
      focusClue:
        'Why did burning tar barrels and spraying vinegar fail completely to stop cholera spreading?',
    },
    {
      step: 4,
      paraRef: '[4.4]',
      date: '1842',
      questionHeading:
        'How did Edwin Chadwick prove that slum filth was costing Britain a fortune?',
      bullets: [
        '400-Page Parliamentary Audit',
        'Working-Class Life Expectancy 17',
        'Filth Causes Preventable Poverty',
      ],
      focusClue:
        'How did Chadwick use economic statistics to persuade MPs that clean water would lower poor relief taxes?',
    },
    {
      step: 5,
      paraRef: '[4.5]',
      date: '1848–1854',
      questionHeading:
        'Why did Victorian ideology fiercely resist compulsory government intervention?',
      bullets: [
        "Laissez-Faire ('Leave Alone')",
        'Ratepayer Taxpayer Protests',
        'Sacking Chadwick in 1854',
      ],
      focusClue:
        "Why did ratepayers view clean water laws as 'tyrannical government bullying' rather than basic healthcare?",
    },
  ],

  did_you_know:
    'Cholera was nicknamed "The Blue Death" because as victims lost gallons of fluid through sudden, violent dehydration within just a few hours, their blood thickened into a dark sludge, causing their skin to turn a ghostly, shriveled blue-grey color before they died!',

  do_now: [
    { q: "Who invented the world's first flush toilet in 1596?", a: 'Sir John Harington.' },
    {
      q: 'What 38-mile canal brought fresh spring water from Hertfordshire into London in 1613?',
      a: 'The New River (financed by Sir Hugh Myddelton).',
    },
    {
      q: 'What happened in Samuel Pepys’ cellar on 20 October 1660?',
      a: 'His neighbour’s cesspit cracked and leaked human sewage through the cellar wall.',
    },
    {
      q: 'What proportion of Londoners died during the Great Plague of 1665?',
      a: 'Nearly 100,000 citizens (about 20% of the population).',
    },
    {
      q: 'Did 17th-century physicians know that bacteria transmitted plague and water diseases?',
      a: 'No, they dogmatically believed in miasma (bad air) and the four humours.',
    },
  ],

  vocabulary: [
    {
      term: 'Urbanisation',
      definition:
        'The rapid, massive migration of people from rural countryside villages into expanding industrial manufacturing cities.',
    },
    {
      term: 'Back-to-back housing',
      definition:
        'Cheaply constructed terraced houses built sharing party walls on three sides, with windows on only one side and no through ventilation.',
    },
    {
      term: 'Privy Midden',
      definition:
        'An outdoor toilet shed built over an open cesspit where household ash, animal manure, and human waste accumulated in heaps.',
    },
    {
      term: 'Asiatic Cholera',
      definition:
        'A lethal, acute water-borne infectious disease caused by the bacterium Vibrio cholerae, causing fatal dehydration.',
    },
    {
      term: 'Edwin Chadwick',
      definition:
        'A crusading Victorian lawyer and civil servant whose 1842 Sanitary Report exposed the catastrophic link between filth and early death.',
    },
    {
      term: 'Public Health Act 1848',
      definition:
        'Britain’s first national public health law, which created the General Board of Health with permissive (optional) municipal powers.',
    },
    {
      term: 'Laissez-Faire',
      definition:
        'The dominant Victorian political philosophy of non-intervention: the belief that government should not interfere in business or taxation.',
    },
    {
      term: 'Ratepayer',
      definition:
        'A property owner or business paying local municipal property taxes (rates), who frequently voted against public spending on sewers.',
    },
  ],

  narrative_blocks: [
    {
      act: 1,
      title: '4.1 Boomtown Squalor: Back-to-Backs & Cellar Dwellings',
      text: '<span class="para-ref">[4.1]</span> Between 1780 and 1850, the Industrial Revolution transformed Britain into the manufacturing "workshop of the world." The expansion of steam-powered cotton mills and coal mines triggered rapid urbanisation. Millions of rural labourers moved to northern boomtowns for factory work. Manchester’s population exploded from 25,000 in 1770 to over 300,000 by 1850, with Birmingham and Leeds growing equally fast.<br><br>Because towns had no building codes, speculative landlords rushed to maximize profits by building cramped "back-to-back" terraced housing. These houses shared party walls on three sides, with no through-ventilation. Rooms were dark, damp, and soot-choked. In districts like Manchester’s "Little Ireland", families lived in flooded cellar dwellings. Up to one hundred residents shared a single outdoor communal privy midden, where untreated waste piled up outside bedroom windows.',
    },
    {
      act: 2,
      title: '4.2 Slum Squalor: Contaminated Wells & Privy Middens',
      text: '<span class="para-ref">[4.2]</span> The water supply in industrial boomtowns was dangerous and scarce. Towns owned no public water pipes. Instead, private companies operated for profit, piping water only to wealthy squares. In working-class slums, companies turned on street standpipes for only twenty minutes three days a week, sparking desperate scrambles for water.<br><br>Families unable to reach standpipes relied on shallow wells or took water from polluted rivers like the Irwell in Manchester or the Aire in Leeds. These rivers were black with chemical acids and human sewage from unlined cesspits. Liquid waste seeped through the porous earth directly into drinking wells. Cartoons like "A Court for King Cholera" (Source A) mocked these filthy courtyards as royal palaces where disease ruled over helpless families.',
      source: {
        letter: 'A',
        title: 'Source A: "A Court for King Cholera" (Punch Magazine, 1852)',
        image: '/images/victorian_slum.jpg',
        caption:
          'Famous satirical cartoon published in Punch in 1852. King Cholera sits enthroned atop a squalid slum courtyard, surrounded by mountains of uncollected dung, open overflowing privies, dilapidated tenements, and playing children breathing toxic fumes.',
        source_context:
          'Punch deployed biting visual satire to attack municipal negligence and greedy landlords who refused to build proper drains, portraying slums as royal palaces where cholera ruled supreme. Hinge Question: How does Source A use visual satire to blame greedy landlords and municipal inaction for cholera epidemics?',
        how_useful_question:
          'How useful is Source A for an enquiry into public attitudes toward urban squalor and disease in mid-nineteenth-century Britain?',
        provenance_clues: [
          'Author: John Leech, leading satirical illustrator for Punch magazine.',
          'Audience: Middle-class and upper-class Victorian magazine readers.',
          'Motive: To shame local councils and slum landlords into clearing filthy urban courts.',
        ],
        hinge_question:
          'Hinge Question: How does Source A use visual satire to blame greedy landlords and municipal inaction for cholera epidemics?',
        citation: 'Punch, or the London Charivari • Volume 23 (1852).',
      },
    },
    {
      act: 3,
      title: '4.3 The Blue Death: Asiatic Cholera & the Miasma Trap (1831)',
      text: '<span class="para-ref">[4.3]</span> In October 1831, Britain was struck by a terrifying new global epidemic: **Asiatic Cholera**. Arriving through the port of Sunderland from the Baltic Sea, cholera killed with horrific speed. Victims suffered violent vomiting and severe watery diarrhea ("rice-water stools"). Severe dehydration drained gallons of bodily fluid within hours, turning the skin a shriveled blue-grey color and killing healthy adults in less than a day. The 1831–1832 epidemic killed over 32,000 Britons.<br><br>Victorian doctors were helpless because they believed in **miasma**—the false theory that disease spread through poisonous bad air from rotting matter. Local councils burned tar barrels in streets and whitewashed alleys with vinegar to clear the smell. These efforts failed completely: cholera was a waterborne bacterium (*Vibrio cholerae*) spread by drinking sewage-tainted water.',
    },
    {
      act: 4,
      title: '4.4 Edwin Chadwick’s Sanitary Report & the Miasma Dilemma (1842)',
      text: '<span class="para-ref">[4.4]</span> In 1842, civil servant **Edwin Chadwick** published a landmark parliamentary report: the *Report on the Sanitary Condition of the Labouring Population* (Source B). Using detailed medical and economic statistics, Chadwick proved that the average life expectancy for a labourer in Manchester was just **seventeen years**—compared to thirty-eight years in rural Rutland.<br><br>Chadwick cleverly appealed to Victorian taxpayers. He argued that preventable filth killed working fathers in their prime, forcing thousands of widows and orphans onto poor-relief taxes paid by middle-class ratepayers. Chadwick showed that spending money on clean water mains and underground glazed ceramic sewers would remove filth, boost worker productivity, and save taxpayers millions of pounds in poor-relief rates.',
      source: {
        letter: 'B',
        title:
          'Source B: Edwin Chadwick’s Report on the Sanitary Condition of the Labouring Population (1842)',
        image: '/images/victorian_slum.jpg',
        caption:
          'Statistical table and extract from Chadwick’s 1842 report showing average age at death across social classes: Gentry and professional persons lived to 38 in Manchester and 52 in Rutland; Tradesmen lived to 20 in Manchester; Labourers and factory workers died at an average age of just 17 in Manchester.',
        source_context:
          'Chadwick’s parliamentary audit used hard statistical evidence to demonstrate that industrial slum squalor reduced life expectancy to less than half that of rural agricultural counties. Hinge Question: Was Chadwick motivated primarily by moral compassion for the poor, or by a desire to reduce poor-rate taxes for the wealthy middle class?',
        how_useful_question:
          'How useful is Source B for an enquiry into the living conditions and life expectancy of working-class people during the Industrial Revolution?',
        provenance_clues: [
          'Author: Edwin Chadwick, civil servant and secretary to the Poor Law Commission.',
          'Audience: Members of Parliament, government ministers, and middle-class taxpayers.',
          'Motive: To persuade Parliament that investing in clean water and drainage would lower poor relief expenditure.',
        ],
        hinge_question:
          'Hinge Question: Was Chadwick motivated primarily by moral compassion for the poor, or by a desire to reduce poor-rate taxes for the wealthy middle class?',
        citation:
          'House of Commons Parliamentary Papers • Sanitary Report 1842 (W. Clowes & Sons).',
      },
    },
    {
      act: 5,
      title: '4.5 The 1848 Public Health Act & Laissez-Faire Resistance',
      text: '<span class="para-ref">[4.5]</span> Chadwick’s report prompted the **Public Health Act of 1848**, which set up Britain’s first General Board of Health. However, the law was crippled by the Victorian belief in **laissez-faire** ("leave alone")—the idea that national government should not interfere in private property or local taxation.<br><br>Parliament made the 1848 Act *permissive* (optional) rather than compulsory. Councils only had to form a health board if their death rate exceeded an extreme 23 per 1,000 residents. Wealthy landlords and property ratepayers fiercely opposed spending money on sewers, attacking Chadwick as a "sanitary dictator." Ratepayers formed associations to vote out reformist councillors. In 1854, the government gave in: Chadwick was sacked, the Board of Health was closed down, and slum squalor continued unchecked.',
    },
  ],

  tasks: [
    {
      id: 'ws_l4_q4_explain_why',
      type: 'extended_writing',
      topic: 'Question 4: Explain Why [12 marks • 15 mins]',
      title: 'Question 4: Explain Why [12 marks • 15 mins]',
      question:
        'Explain why public health in industrial towns deteriorated into a national crisis in the period 1800–1850. [12 marks]',
      stimulus: [
        'The rapid rate of urbanisation and construction of back-to-back housing',
        'The Victorian political belief in laissez-faire and opposition from ratepayers',
      ],
      scaffolding: {
        guidance:
          'Write a structured 3-paragraph PEEL response. Use the exact words from the question stem in your Point and in your Link for every paragraph.',
        structure_strip: [
          {
            col: '1. UNCONTROLLED URBANISATION & HOUSING',
            prompt:
              'Explain how rapid population migration created back-to-back housing, damp cellar dwellings, and overflowing privy middens without sewers [4.1, 4.2].',
            starter:
              'A primary catalyst explaining why public health in industrial towns deteriorated into a national crisis was the unprecedented pace of urbanisation...',
          },
          {
            col: '2. WATER CONTAMINATION & CHOLERA',
            prompt:
              'Explain how shallow wells contaminated with sewage collided with the 1831 arrival of Asiatic Cholera and miasma dogma [4.2, 4.3].',
            starter:
              'Furthermore, the crisis deepened into a national catastrophe because polluted water supplies collided with the lethal arrival of Asiatic Cholera...',
          },
          {
            col: '3. LAISSEZ-FAIRE & POLITICAL GRIDLOCK',
            prompt:
              'Explain how the ideology of laissez-faire and ratepayer resistance crippled the 1848 Public Health Act [4.4, 4.5].',
            starter:
              'Ultimately, the underlying reason why the public health crisis persisted without remedy was the entrenched Victorian ideology of laissez-faire...',
          },
        ],
      },
      hints: [
        'Point: State your factor clearly using the exact words from the question stem.',
        'Evidence: Deploy specific historical details: Manchester population surge, back-to-back houses, Asiatic Cholera (1831), Chadwick’s 1842 Report (life expectancy 17), 1848 Act, and laissez-faire [4.1–4.5].',
        'Explanation: Connect the factors causally: show how permissive legislation allowed selfish ratepayers to block essential sewer taxes [4.5].',
        'Link: Conclude with a sustained comparative judgment: evaluate whether economic greed or political ideology was the root driver [4.5].',
      ],
      model_answer:
        'A primary catalyst explaining why public health in industrial towns deteriorated into a national crisis was the unprecedented pace of urbanisation and the chaotic construction of back-to-back housing between 1800 and 1850. As steam-powered textile mills and ironworks expanded, millions of rural labourers flooded into northern boomtowns like Manchester, whose population exploded tenfold to over 300,000. Because towns possessed no building codes or town planning regulations, speculative landlords built cramped rows of back-to-back houses that shared party walls on three sides, entirely eliminating through-ventilation. Entire families were packed into damp, unpaved cellar dwellings, while up to one hundred workers shared a single outdoor privy midden. These open pits overflowed into courtyards, creating mountains of decomposing nightsoil that contaminated the soil and made urban living conditions utterly squalid.<br><br>Furthermore, the public health crisis deepened into a national catastrophe because polluted water supplies collided with the lethal arrival of Asiatic Cholera in 1831. Industrial towns lacked municipal piped water networks; private water companies operated for profit, turning on street standpipes for merely twenty minutes three days a week. As a consequence, working-class families drank from shallow wells that had absorbed liquid sewage leaking from neighbouring cesspools. When cholera arrived through Sunderland in October 1831, the pathogen spread with terrifying speed, killing over 32,000 people nationwide by inducing fatal dehydration within hours. Because the medical establishment dogmatically believed in miasma theory, local authorities wasted time lighting tar bonfires and whitewashing alleys rather than purifying drinking water. As Edwin Chadwick proved in his 1842 Sanitary Report, the average life expectancy for a factory labourer in Manchester collapsed to just seventeen years, demonstrating that water contamination had created an unprecedented humanitarian emergency.<br><br>Ultimately, the decisive underlying reason why the public health crisis persisted without remedy was the entrenched Victorian political ideology of laissez-faire and fierce resistance from middle-class ratepayers. Victorian politicians believed that the state should "leave alone" private enterprise and not interfere in property rights or impose taxes. When Parliament finally passed the 1848 Public Health Act during a second cholera panic, the law was fatally compromised by being made permissive (optional) rather than compulsory. Wealthy landlords and ratepayer associations furiously resisted paying taxes for underground sewers, denouncing health inspectors as tyrannical dictators. This taxpayer backlash culminated in the sacking of Edwin Chadwick in 1854 and the dismantling of the General Board of Health. Therefore, while urban density provided the physical conditions for disease, it was the stubborn refusal of the state to abandon laissez-faire that explains why public health deteriorated into an unresolved national crisis.',
    },
  ],

  teacher_notes: {
    primer:
      'This enquiry explores how the industrial shock overwhelmed traditional pre-modern sanitary methods. Guide pupils to understand why laissez-faire ideology prevented the Victorian state from intervening, even when Chadwick proved that filth was destroying thousands of lives.',
    objectives: [
      {
        objective:
          'Explain how industrial boomtowns created back-to-back housing and water squalor.',
        primer:
          'Direct pupils to paragraphs [4.1] and [4.2]. Emphasise lack of planning codes and the privy midden.',
        question:
          'Hinge Question: Why did speculative landlords build back-to-back houses rather than detached homes with gardens and drains?',
      },
      {
        objective: 'Evaluate why the 1848 Public Health Act failed to solve the crisis.',
        primer:
          'Focus on paragraph [4.5]. Highlight the definition of laissez-faire and the permissive nature of the law.',
        question:
          'Hinge Question: If cholera was killing thousands, why did wealthy ratepayers celebrate when Edwin Chadwick was sacked in 1854?',
      },
    ],
    source_context: [
      {
        source: 'Source A ("A Court for King Cholera")',
        context:
          '1852 Punch cartoon showing cholera enthroned amidst slum filth and privies. Hinge Question: How does Source A use visual satire to blame greedy landlords and municipal inaction for cholera epidemics?',
      },
      {
        source: 'Source B (Chadwick’s 1842 Report)',
        context:
          'Statistical life expectancy tables showing Manchester labourers dying at age 17. Hinge Question: Was Chadwick motivated primarily by moral compassion for the poor, or by a desire to reduce poor-rate taxes for the wealthy middle class?',
      },
    ],
  },

  video: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=TT4Z1Ikf36w',
      title: 'Victorian Slums and the Public Health Crisis',
      duration: '8 mins 30 secs',
      viewing_task:
        'Describe living conditions in Victorian back-to-back terraces and identify two water-borne diseases that spread through slums.',
      model_answer:
        'Back-to-backs were cramped, dark houses sharing party walls on three sides, with no through ventilation and up to 100 people sharing a single privy. Diseases included cholera and typhoid.',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=MdNXDqCGv3M',
      title: 'Edwin Chadwick and the 1848 Public Health Act',
      duration: '6 mins 15 secs',
      viewing_task:
        'Explain how Edwin Chadwick used statistics in his 1842 report to persuade Parliament to act.',
      model_answer:
        'Chadwick showed that labourers died at an average age of 17 in Manchester, and proved that preventable disease cost ratepayers more in poor relief than building sewers.',
    },
  ],

  quick_quiz: [
    {
      question:
        'What transformation turned Britain into the "workshop of the world" between 1780 and 1850?',
      options: [
        'The Norman Conquest',
        'The Industrial Revolution',
        'The Reformation',
        'The Great Plague',
      ],
      answer: 'The Industrial Revolution',
    },
    {
      question:
        'What term describes the rapid movement of populations from countryside farms into industrial cities?',
      options: ['Urbanisation', 'Enclosure', 'Colonisation', 'Reformation'],
      answer: 'Urbanisation',
    },
    {
      question: 'How much did the population of industrial Manchester grow between 1770 and 1850?',
      options: [
        'It dropped from 50,000 to zero',
        'It exploded from 25,000 to over 300,000',
        'It stayed at 10,000',
        'It reached 10 million',
      ],
      answer: 'It exploded from 25,000 to over 300,000',
    },
    {
      question: 'What were cheaply constructed houses sharing three party walls called?',
      options: ['Back-to-back houses', 'Roundhouses', 'Manor houses', 'Villas'],
      answer: 'Back-to-back houses',
    },
    {
      question: 'Why were back-to-back houses notoriously unhealthy?',
      options: [
        'They had no front doors',
        'They shared three walls and had no through-ventilation',
        'They were built of straw',
        'They were painted black',
      ],
      answer: 'They shared three walls and had no through-ventilation',
    },
    {
      question: 'What was an outdoor toilet shed built over an open refuse pit called?',
      options: ['A privy midden', 'An aqueduct', 'A thermae', 'A water closet'],
      answer: 'A privy midden',
    },
    {
      question: 'How often was piped water typically turned on at public standpipes in poor slums?',
      options: [
        '24 hours every day',
        'For 20–30 minutes a few days a week',
        'Only on Christmas Day',
        'Never',
      ],
      answer: 'For 20–30 minutes a few days a week',
    },
    {
      question: 'In what year did Asiatic Cholera first make landfall in Britain?',
      options: ['1348', '1665', '1831', '1914'],
      answer: '1831',
    },
    {
      question: 'At which northeastern coal port did cholera first enter Britain in 1831?',
      options: ['Sunderland', 'London', 'Liverpool', 'Portsmouth'],
      answer: 'Sunderland',
    },
    {
      question: 'What was the nickname given to cholera because of its terrifying symptoms?',
      options: ['"The Blue Death"', '"The Red Plague"', '"The Black Death"', '"The Yellow Fever"'],
      answer: '"The Blue Death"',
    },
    {
      question: 'What microscopic pathogen causes cholera?',
      options: ['Vibrio cholerae', 'Yersinia pestis', 'Influenza', 'Smallpox'],
      answer: 'Vibrio cholerae',
    },
    {
      question: 'What incorrect medical theory did doctors believe caused cholera in the 1830s?',
      options: ['Miasma theory (bad air)', 'Germ theory', 'Genetics', 'Virus theory'],
      answer: 'Miasma theory (bad air)',
    },
    {
      question:
        'Who published the landmark 1842 Report on the Sanitary Condition of the Labouring Population?',
      options: ['Edwin Chadwick', 'Joseph Bazalgette', 'John Snow', 'Robert Koch'],
      answer: 'Edwin Chadwick',
    },
    {
      question:
        'According to Chadwick’s 1842 report, what was the average life expectancy for a labourer in Manchester?',
      options: ['Just 17 years', '38 years', '75 years', '90 years'],
      answer: 'Just 17 years',
    },
    {
      question: 'What economic argument did Chadwick use to convince MPs to build sewers?',
      options: [
        'Sewers would produce gold',
        'Preventable disease cost taxpayers more in poor-relief than building sewers',
        'Sewers would attract French tourists',
        'Sewers would end all wars',
      ],
      answer: 'Preventable disease cost taxpayers more in poor-relief than building sewers',
    },
    {
      question: 'What national body was established by the landmark Public Health Act of 1848?',
      options: [
        'The General Board of Health',
        'The National Health Service',
        'The World Health Organization',
        'The Royal Navy',
      ],
      answer: 'The General Board of Health',
    },
    {
      question: 'Why was the 1848 Public Health Act largely ineffective in many areas?',
      options: [
        'It was banned by the Queen',
        'It was permissive (optional) rather than compulsory',
        'Sewers had not been invented yet',
        'Nobody had any bricks',
      ],
      answer: 'It was permissive (optional) rather than compulsory',
    },
    {
      question:
        'What Victorian political philosophy believed government should not interfere in business or taxes?',
      options: ['Laissez-faire', 'Socialism', 'Communism', 'Feudalism'],
      answer: 'Laissez-faire',
    },
    {
      question:
        'Who were the local property owners that campaigned fiercely against paying sanitary taxes?',
      options: ['Ratepayers', 'Gong farmers', 'Monks', 'Mill workers'],
      answer: 'Ratepayers',
    },
    {
      question: 'What happened to Edwin Chadwick in 1854 as a result of ratepayer backlash?',
      options: [
        'He was knighted by the Queen',
        'He was sacked and the General Board of Health was abolished',
        'He became Prime Minister',
        'He moved to America',
      ],
      answer: 'He was sacked and the General Board of Health was abolished',
    },
  ],
  quiz: [],
};

module.exports.quiz = module.exports.quick_quiz;
