/**
 * Master 5-Block Decimal Curriculum Standard
 * Lesson 3: Early Modern Public Health (c.1500–1700)
 */

module.exports = {
  id: 'lesson_3',
  title: 'To what extent did towns become filthier during the Early Modern period?',
  enquiry:
    'Was early modern filth caused by population explosion, or the lack of running water to make inventions work?',
  subtitle:
    'From Sir John Harington’s flush toilet to Samuel Pepys’ cellar and the Great Plague of 1665',
  skill: 'Disciplinary Skill: Extent of Change / Source Utility',
  card_image: '/images/harington_toilet.jpg',
  card_position: 'center 20%',
  banner: '/images/harington_toilet.jpg',
  cover_image: '/images/harington_toilet.jpg',

  prologue:
    "Between 1500 and 1700, England underwent a staggering demographic surge. London exploded from 60,000 residents into a bustling metropolis of over half a million souls, packing families into cantilevered wooden tenements. In 1596, Sir John Harington invented the world's first flush toilet for Queen Elizabeth I—yet without running water networks, it remained an isolated palace curiosity. When Samuel Pepys stepped into his basement in 1660 only to find his neighbour's overflowing cesspit seeping through the wall, he documented the daily reality of early modern hygiene. When the Great Plague of 1665 struck, Londoners still turned to smoking tobacco and painting red crosses on doors, trapped between Renaissance innovation and medieval squalor.",

  margin_spine: [
    { year: '1500', label: 'The Metropolis Boom' },
    { year: '1596', label: 'Harington’s Water Closet' },
    { year: '1609', label: 'The New River Project' },
    { year: '1660', label: "Pepys & London's Cellars" },
    { year: '1665', label: 'The Great Plague' },
  ],

  causal_domino_spine: {
    title: 'Early Modern Urban Explosion, Innovation & Plague (1500–1700)',
    subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
    stages: [
      {
        step: 1,
        para_ref: '[3.1]',
        date: '1500–1600',
        title: 'The Great Metropolis & Tudor Population Boom',
        actor: 'Rural Migrants & London Landlords',
        tag: '📈 POPULATION EXPLOSION',
        trigger:
          'London exploded from 60,000 to over 500,000 residents as rural migrants flooded the capital, dividing ancient houses into overcrowded multi-family tenements.',
        connective:
          'Severely overwhelmed primitive waste disposal, turning narrow unpaved alleys into sunless, foul trenches choked with nightsoil and animal refuse.',
        question: 'How did London’s rapid expansion create an unprecedented sanitation crisis?',
      },
      {
        step: 2,
        para_ref: '[3.2]',
        date: '1596',
        title: 'Sir John Harington’s Flush Toilet Innovation',
        actor: 'Sir John Harington & Queen Elizabeth I',
        tag: '🚽 THE WATER CLOSET',
        trigger:
          'Sir John Harington invented the world’s first valve-operated flushing water closet, installing working models in his country manor and at Richmond Palace.',
        connective:
          'Proved mechanical innovation existed, yet failed nationwide because towns completely lacked pressurized running water mains and sewer pipes to take waste away.',
        question:
          'Why did Sir John Harington’s revolutionary flush toilet fail to clean up Britain?',
      },
      {
        step: 3,
        para_ref: '[3.3]',
        date: '1609–1613',
        title: 'Sir Hugh Myddelton & The New River Project',
        actor: 'Sir Hugh Myddelton & London Subscribers',
        tag: '🌊 THE NEW RIVER',
        trigger:
          'Sir Hugh Myddelton financed a 38-mile man-made canal to bring clean Hertfordshire spring water into an Islington reservoir, piped through hollowed elm trunks.',
        connective:
          'Supplied clean water to wealthy subscribers who paid fees, while poor slum dwellers were left buying buckets from street water-carriers or drinking from the Thames.',
        question: 'How did private enterprise attempt to bring clean spring water into London?',
      },
      {
        step: 4,
        para_ref: '[3.4]',
        date: '1660–1665',
        title: 'Forensic Reality in the Capital: Samuel Pepys’ Cellar',
        actor: 'Samuel Pepys & Neighbour Sir Thomas Penn',
        tag: '🕳️ CELLAR SQUALOR',
        trigger:
          'Samuel Pepys documented stepping into basement filth in October 1660 when his neighbour’s cesspit cracked and seeped through the cellar wall.',
        connective:
          'Exposed that even senior Admiralty administrators living in wealthy London homes were surrounded by decaying underground cesspools and foul nightsoil.',
        question:
          'What does Samuel Pepys’ diary reveal about domestic sanitation in Stuart London?',
      },
      {
        step: 5,
        para_ref: '[3.5]',
        date: '1665',
        title: 'The Great Plague of 1665 & The Miasma Trap',
        actor: 'Plague Victims, Searchers & King Charles II',
        tag: '💀 THE GREAT PLAGUE',
        trigger:
          'In 1665, the Great Plague killed nearly 100,000 Londoners, while authorities relied on medieval measures like red crosses, locked quarantines, and smoking tobacco.',
        connective:
          'Revealed that despite the 17th-century Scientific Revolution, epidemic medicine remained trapped in medieval miasma theory and humoral dogma.',
        question:
          'Why did medical responses to the 1665 Great Plague remain fundamentally medieval?',
      },
    ],
  },

  workbook_stages: [
    {
      step: 1,
      paraRef: '[3.1]',
      date: '1500–1600',
      questionHeading:
        'How did London’s rapid expansion create an unprecedented sanitation crisis?',
      bullets: [
        'National Population Doubles',
        '500,000 London Residents',
        'Cantilevered Timber Tenements',
      ],
      focusClue:
        'Why did packing half a million people into the capital turn streets into foul, sunless trenches?',
    },
    {
      step: 2,
      paraRef: '[3.2]',
      date: '1596',
      questionHeading:
        'Why did Sir John Harington’s revolutionary flush toilet fail to clean up Britain?',
      bullets: [
        'Queen Elizabeth’s Godson',
        'Valve-Operated Cistern',
        'Absence of Running Water Mains',
      ],
      focusClue:
        'Why was a flush toilet useless for ordinary citizens who lacked pressurized running water pipes?',
    },
    {
      step: 3,
      paraRef: '[3.3]',
      date: '1609–1613',
      questionHeading:
        'How did private enterprise attempt to bring clean spring water into London?',
      bullets: ['Sir Hugh Myddelton', '38-Mile Man-Made Canal', 'Hollowed Elm Tree Trunk Pipes'],
      focusClue:
        'How did the New River bring clean Hertfordshire spring water to wealthy Londoners while slums still relied on water carriers?',
    },
    {
      step: 4,
      paraRef: '[3.4]',
      date: '1660–1665',
      questionHeading:
        'What does Samuel Pepys’ diary reveal about domestic sanitation in Stuart London?',
      bullets: [
        'Stepping into Neighbour’s Waste',
        'Fractured Brick Cesspits',
        'Nightsoil Men & Filth Carts',
      ],
      focusClue:
        'What does Pepys’ experience in October 1660 prove about the dangers of leaking cesspits beneath ordinary houses?',
    },
    {
      step: 5,
      paraRef: '[3.5]',
      date: '1665',
      questionHeading:
        'Why did medical responses to the 1665 Great Plague remain fundamentally medieval?',
      bullets: [
        '100,000 Plague Fatalities',
        'Red Crosses & Watchmen',
        'Pounding Tobacco & Pomanders',
      ],
      focusClue:
        'Why did belief in miasma and humours persist despite the Scientific Revolution of Harvey and Hooke?',
    },
  ],

  did_you_know:
    'Sir John Harington named his satirical book about his flush toilet "The Metamorphosis of Ajax". This was a cheeky Elizabethan pun: in 1596, a toilet was commonly known as a "jakes", so "a Jakes" sounded exactly like the Greek mythological hero Ajax! Queen Elizabeth was amused by the invention, but banned Harington from court for his crude jokes.',

  do_now: [
    {
      q: 'What nocturnal workers were hired to dig out cesspits in medieval towns?',
      a: 'Gong farmers (nightmen).',
    },
    {
      q: 'At which priory was a sophisticated water filtration system drawn in c.1165?',
      a: 'Christ Church Priory, Canterbury.',
    },
    { q: 'In what year did the Black Death arrive in England?', a: '1348.' },
    {
      q: 'What incorrect medical theory claimed disease was spread by foul-smelling poisonous air?',
      a: 'Miasma theory.',
    },
    {
      q: 'What 1388 law made it a crime to dump animal offal and dung into rivers?',
      a: 'The Statute of Cambridge.',
    },
  ],

  vocabulary: [
    {
      term: 'Metropolis',
      definition:
        'A very large, densely populated commercial and cultural capital city, such as seventeenth-century London.',
    },
    {
      term: 'Water Closet',
      definition:
        'An early flush toilet system that washed human excrement away through a drain pipe using water from a cistern.',
    },
    {
      term: 'Sir John Harington',
      definition:
        'Elizabethan courtier and godson to Elizabeth I who invented the first mechanical flush toilet in 1596.',
    },
    {
      term: 'New River',
      definition:
        'A 38-mile man-made fresh water aqueduct canal opened in 1613 to bring drinking water from Hertfordshire to London.',
    },
    {
      term: 'Samuel Pepys',
      definition:
        'Senior naval administrator whose celebrated 1660s diary vividly documented domestic sanitation, the Great Plague, and the Great Fire.',
    },
    {
      term: 'Searchers of the Dead',
      definition:
        'Elderly women appointed by parish authorities during plague outbreaks to inspect corpses and confirm causes of death.',
    },
    {
      term: 'Nightsoil',
      definition:
        'Human feces collected at night from household cesspits and privies, used as agricultural manure.',
    },
    {
      term: 'Bills of Mortality',
      definition:
        'Weekly published statistical mortality sheets in London recording numbers of burials and causes of death by parish.',
    },
  ],

  narrative_blocks: [
    {
      act: 1,
      title: 'The Great Metropolis: Tudor London’s Population Boom & Overhangs',
      theme_heading: 'The Great Metropolis: Tudor London’s Population Boom & Overhangs',
      text: '<span class="para-ref">[3.1]</span> Between 1500 and 1700, England underwent a dramatic demographic transformation. While national population doubled from 2.5 million to over 5 million, London exploded from 60,000 to over 500,000 citizens. Rural enclosure drove hundreds of thousands of poor labourers into the capital. Landlords subdivided old houses into cramped tenements and threw up flimsy timber dwellings down narrow alleys.<br><br>This sudden growth overwhelmed sanitation. Overhanging upper floors leaned so close across streets that neighbours could shake hands from top windows, trapping toxic coal smoke and street stench. London possessed no municipal sewer network. Citizens emptied chamber pots from upstairs windows into gutters with the cry *"Gardyloo!"* (*regardez l’eau*). Piped water was rare; most queued for hours at public conduits or paid commercial water-carriers (*cobs*) by the bucket.',
    },
    {
      act: 2,
      title: 'The Royal Novelty: Sir John Harington’s Flush Toilet (1596)',
      theme_heading: 'The Royal Novelty: Sir John Harington’s Flush Toilet (1596)',
      text: '<span class="para-ref">[3.2]</span> In 1596, Queen Elizabeth I’s godson, **Sir John Harington**, invented the world’s first valve-operated flushing water closet (Source A). In his treatise *The Metamorphosis of Ajax*, Harington designed an indoor toilet with an overhead water cistern, a brass valve, and a release lever that unleashed 7.5 gallons of water to flush waste down a lead pipe into an outdoor pit.<br><br>Harington built models at his Kelston manor and Queen Elizabeth’s palace at Richmond. However, the invention failed to transform public health. The barrier was infrastructure: flush toilets required pressurized running water mains and municipal sewer pipes. Because 99% of British homes had neither, Harington’s flush toilet remained a royal novelty, and Britons relied on privy sheds and cesspools for two more centuries.',
      source: {
        letter: 'A',
        title: 'Source A: Technical Schematic of Sir John Harington’s Water Closet (1596)',
        image: '/images/harington_toilet.jpg',
        caption:
          'Woodcut diagram from Sir John Harington’s treatise "The Metamorphosis of Ajax" (1596). The design shows an overhead water cistern (A), a release valve (D), a seat (N), and a drain pipe (P) leading to an outdoor cesspool.',
        source_context:
          'Harington’s mechanical water closet was the earliest documented valve-flush toilet in European history, demonstrating advanced mechanical understanding. Hinge Question: Does Harington’s toilet diagram prove that early modern Britain was making technological progress in sanitation, or that inventions were useless without municipal infrastructure?',
        how_useful_question:
          'How useful is Source A for an enquiry into technological innovation and sanitation in Elizabethan England?',
        provenance_clues: [
          'Author: Sir John Harington, godson to Queen Elizabeth I and mechanical inventor.',
          'Audience: Queen Elizabeth I and educated Elizabethan court aristocracy.',
          'Motive: To promote his flushing invention and satirize court politics through classical puns.',
        ],
        hinge_question:
          'Hinge Question: Does Harington’s toilet diagram prove that early modern Britain was making technological progress in sanitation, or that inventions were useless without municipal infrastructure?',
        citation: 'British Library Rare Books Collection • The Metamorphosis of Ajax (1596).',
      },
    },
    {
      act: 3,
      title: 'Private Water for the Wealthy: Sir Hugh Myddelton & The New River (1613)',
      theme_heading: 'Private Water for the Wealthy: Sir Hugh Myddelton & The New River (1613)',
      text: '<span class="para-ref">[3.3]</span> As London’s parish wells became dangerously polluted, private enterprise stepped in. In 1609, wealthy goldsmith **Sir Hugh Myddelton** launched the **New River** project: a 38-mile man-made canal bringing fresh spring water from Hertfordshire into an elevated reservoir at Islington in north London.<br><br>Completed in 1613, the New River distributed water across London through underground pipes made of hollowed-out elm tree trunks. However, this was a private commercial venture. Only wealthy nobles and merchants who paid quarterly subscription fees had branch pipes connected to their basements. Poor slum dwellers in Whitechapel and Southwark were excluded, continuing to scoop filthy, sewage-tainted water directly from the tidal Thames.',
    },
    {
      act: 4,
      title: 'Nightsoil and Leaking Cesspits: The Misery of Samuel Pepys’ Cellar (1660)',
      theme_heading: 'Nightsoil and Leaking Cesspits: The Misery of Samuel Pepys’ Cellar (1660)',
      text: '<span class="para-ref">[3.4]</span> The reality of seventeenth-century domestic sanitation is captured in the private diary of naval administrator **Samuel Pepys**. On 20 October 1660, Pepys went down to his cellar and stepped into a nightmare: *“Going down to my cellar... I put my foot into a great heap of turds, by which I find that Sir Thomas Penn’s house of office is fallen into my cellar, which do trouble me.”* (Source B). His neighbour’s brick cesspit had fractured, leaking sewage through the cellar wall.<br><br>Pepys’ diary proves that even wealthy officials lived atop sanitary hazards. London basements were honeycombed with leaking cesspools that contaminated surrounding drinking wells. The city depended entirely on nightsoil men who arrived with wooden barrels after midnight to shovel out waste, often spilling slurry on doorways.',
      source: {
        letter: 'B',
        title: 'Source B: Diary of Samuel Pepys (20 October 1660)',
        image: '/images/black_death.jpg',
        caption:
          'Extract from Samuel Pepys’ private diary: "Going down to my cellar... I put my foot into a great heap of turds, by which I find that Sir Thomas Penn’s house of office is fallen into my cellar, which do trouble me."',
        source_context:
          "Pepys’ private diary offers rare, unvarnished eyewitness evidence of the sanitary squalor underlying prosperous seventeenth-century London households. Hinge Question: How useful is Pepys' diary entry for revealing why wealthy London homes were still vulnerable to sewage contamination?",
        how_useful_question:
          'How useful is Source B for an enquiry into domestic sanitation and living conditions in seventeenth-century London?',
        provenance_clues: [
          'Author: Samuel Pepys, naval administrator and diarist writing in private shorthand.',
          'Audience: Written purely for his own personal eyes, never intended for public publication.',
          'Motive: To record daily personal, political, and household events with complete candour.',
        ],
        hinge_question:
          "Hinge Question: How useful is Pepys' diary entry for revealing why wealthy London homes were still vulnerable to sewage contamination?",
        citation: 'Magdalene College Cambridge • Pepys Library Diary Manuscripts.',
      },
    },
    {
      act: 5,
      title: 'Historical Verdict: The Great Plague of 1665 & The Limits of Science',
      theme_heading: 'Historical Verdict: The Great Plague of 1665 & The Limits of Science',
      text: '<span class="para-ref">[3.5]</span> The Early Modern era presents a striking paradox. While the Scientific Revolution made breakthroughs in physics and anatomy (William Harvey, Isaac Newton), public health in 1665 was virtually unchanged from the Black Death of 1348. When the **Great Plague of 1665** struck London, killing nearly 100,000 people (Source C), medical practice relied on ancient superstition.<br><br>Doctors prescribed burning pitch in streets, holding pomanders to noses, and smoking tobacco to ward off poisonous **miasma**. Parish watchmen padlocked infected families in their homes under forty-day quarantine, painting red crosses on doors with *"Lord Have Mercy Upon Us"*. King Charles II and wealthy doctors fled to the country, leaving poor slum dwellers to die. Despite early inventions like Harington’s toilet and the New River, rapid population growth had outpaced sanitation science, leaving ordinary Britons more vulnerable than ever.',
      source: {
        letter: 'C',
        title: 'Source C: London Plague Broadsheet and Bill of Mortality (1665)',
        image: '/images/black_death.jpg',
        caption:
          'A 1665 illustrated broadsheet titled "Lord Have Mercy Upon Us", showing dead-carts collecting bodies in the street, infected houses padlocked with red crosses, mourners fleeing, and statistical totals from the parish Bills of Mortality.',
        source_context:
          'Official broadsheet displaying parish death counts during the 1665 Great Plague, documenting the administrative measures of quarantine, watchmen, and mass burials in plague pits. Hinge Question: Why did quarantine regulations in 1665 fail to stop the spread of bubonic plague?',
        how_useful_question:
          'How useful is Source C for an enquiry into medical responses and municipal administration during the Great Plague of 1665?',
        provenance_clues: [
          'Author: London parish clerks and commercial printmakers.',
          'Audience: London public seeking statistical news and survival guidance during the epidemic.',
          'Motive: To record plague fatalities and instruct citizens on official quarantine regulations.',
        ],
        hinge_question:
          'Hinge Question: Why did quarantine regulations in 1665 fail to stop the spread of bubonic plague?',
        citation: 'Museum of London Print Archive • Great Plague Broadsheet Collection.',
      },
    },
  ],

  tasks: [
    {
      id: 'ws_l3_q3_evaluative_statement',
      type: 'extended_writing',
      topic: 'Question 3: Evaluative Statement Essay [12 marks • 15 mins]',
      title: 'Question 3: Evaluative Statement Essay [12 marks • 15 mins]',
      question:
        '‘Early Modern towns made substantial progress in water supply and sanitation between 1500 and 1700.’ How far do you agree? [12 marks]',
      stimulus: [
        'Inventions and infrastructure like Harington’s water closet (1596) and Myddelton’s New River (1613)',
        'Domestic conditions documented by Samuel Pepys and the devastating Great Plague of 1665',
      ],
      scaffolding: {
        guidance:
          'Write a structured 3-paragraph PEEL response. Use the exact words from the question stem in your Point and in your Link for every paragraph.',
        structure_strip: [
          {
            col: '1. TECHNOLOGICAL PROGRESS & INNOVATION',
            prompt:
              'Explain how Harington’s flush toilet (1596) and Myddelton’s New River (1613) demonstrated genuine engineering progress [3.2, 3.3].',
            starter:
              'On the one hand, it can be argued that early modern towns made substantial progress because groundbreaking engineering innovations emerged...',
          },
          {
            col: '2. POPULATION PRESSURE & SQUALOR',
            prompt:
              'Explain how explosive population growth, overflowing cesspits (Pepys), and the 1665 Great Plague proved ordinary conditions worsened [3.1, 3.4, 3.5].',
            starter:
              'On the other hand, it is far more accurate to argue that progress was severely limited because explosive population growth overwhelmed urban sanitation...',
          },
          {
            col: '3. SUSTAINED HISTORICAL VERDICT',
            prompt:
              'Weigh whether private elite breakthroughs or widespread public squalor defined the era [3.5].',
            starter:
              'In conclusion, I disagree that early modern towns made substantial progress; while elite engineering foundations were established, for the vast majority...',
          },
        ],
      },
      hints: [
        'Point: State clearly how far you agree using the exact wording from the question.',
        'Evidence: Deploy specific historical details: Sir John Harington (1596), Sir Hugh Myddelton, New River (38 miles), Samuel Pepys’ cellar (1660), and the Great Plague (1665) [3.2–3.5].',
        'Explanation: Contrast private technological success for the rich against the reality of unpaved, overcrowded slums for ordinary people [3.1, 3.3].',
        'Link: Provide a balanced, comparative judgment: evaluate whether innovation outweighed squalor [3.5].',
      ],
      model_answer:
        'On the one hand, it can be argued that early modern towns made substantial progress in water supply and sanitation because groundbreaking engineering innovations emerged during the Renaissance. In 1596, Sir John Harington invented the world’s first valve-operated flushing water closet, using an overhead cistern to flush waste down a lead pipe into an outdoor cesspool. Furthermore, in 1613, Sir Hugh Myddelton completed the monumental New River project, an extraordinary 38-mile man-made canal that transported pristine spring water from Hertfordshire into an Islington reservoir, distributing water across London through hollowed-out elm-tree pipes. These projects proved that early modern Britons possessed advanced hydraulic ambitions, demonstrating that technological progress occurred in this period.<br><br>On the other hand, it is far more accurate to argue that substantial progress was not achieved for the wider population, because explosive urban growth far outpaced sanitation infrastructure. Between 1500 and 1700, London’s population expanded tenfold from 60,000 to over 500,000, packing families into subdivided timber tenements with cantilevered jetties that blocked air and light. Inventions like Harington’s flush toilet were useless for 99% of citizens who lacked pressurized running water and municipal sewers. Piped water from Myddelton’s New River was an expensive luxury restricted to wealthy subscribers who paid fees, while poor slums drank from the polluted Thames. Furthermore, domestic sanitation remained squalid: as naval administrator Samuel Pepys recorded in October 1660, his neighbour’s cesspit cracked and seeped human waste directly through the cellar wall into his own basement. The complete failure of early modern sanitation was exposed during the Great Plague of 1665, when 100,000 citizens perished while authorities resorted to medieval miasma bonfires and locking families inside infected houses.<br><br>In conclusion, I disagree that early modern towns made substantial progress between 1500 and 1700. While individual visionaries like Harington and Myddelton created brilliant technological foundations, their innovations remained private, isolated luxuries for the wealthy elite. For the vast majority of ordinary townspeople, the rapid doubling of England’s population intensified urban squalor, leaving them dependent on chamber pots, nightsoil men, and disease-ridden rivers. Therefore, rather than experiencing substantial progress, early modern towns suffered a deepening public health crisis as population pressure outstripped pre-industrial engineering.',
    },
  ],

  teacher_notes: {
    primer:
      'This enquiry explores the tension between Renaissance scientific innovation and stubborn sanitary squalor. Guide Year 7 pupils to distinguish between isolated private inventions (Harington’s toilet) and universal municipal infrastructure (which did not exist).',
    objectives: [
      {
        objective:
          'Explain why Sir John Harington’s 1596 flush toilet failed to transform national sanitation.',
        primer:
          'Direct pupils to paragraph [3.2]. Emphasise that toilets cannot function without piped water mains and sewers.',
        question:
          'Hinge Question: Why was an Elizabethan flush toilet practically useless without municipal water mains and sewers?',
      },
      {
        objective:
          'Assess what Samuel Pepys’ diary reveals about domestic living conditions in Stuart London.',
        primer:
          'Examine paragraph [3.4] and Source B. Highlight that even senior officials had cesspits leaking into basements.',
        question:
          'Hinge Question: If an influential government official like Samuel Pepys had sewage in his cellar, what does that tell us about the homes of poor Londoners?',
      },
    ],
    source_context: [
      {
        source: 'Source A (Harington’s Toilet)',
        context:
          'Schematic from "The Metamorphosis of Ajax" showing overhead cistern and flush valve. Hinge Question: Does Harington’s toilet diagram prove that early modern Britain was making technological progress in sanitation, or that inventions were useless without municipal infrastructure?',
      },
      {
        source: 'Source B (Pepys’ Diary)',
        context:
          "Eyewitness account of neighbour’s cesspit seeping into Pepys’ cellar in October 1660. Hinge Question: How useful is Pepys' diary entry for revealing why wealthy London homes were still vulnerable to sewage contamination?",
      },
      {
        source: 'Source C (Plague Broadsheet)',
        context:
          '1665 illustrated broadsheet detailing parish mortality figures and quarantine measures. Hinge Question: Why did quarantine regulations in 1665 fail to stop the spread of bubonic plague?',
      },
    ],
  },

  video: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=LBvOZO1gmOE',
      title: 'Sir John Harington and the Invention of the Flush Toilet',
      duration: '4 mins 52 secs',
      viewing_task:
        'Explain how Sir John Harington’s toilet functioned, and identify the main obstacle preventing its widespread adoption.',
      model_answer:
        'Harington’s toilet used a cistern of water and a release valve to flush waste into a cesspool. It was not widely adopted because most homes lacked running water and towns had no underground sewer networks.',
    },
  ],

  quick_quiz: [
    {
      question: 'What happened to England’s national population between 1500 and 1700?',
      options: [
        'It dropped by half due to famine',
        'It doubled from 2.5 million to over 5 million',
        'It stayed exactly the same',
        'It rose to 50 million',
      ],
      answer: 'It doubled from 2.5 million to over 5 million',
    },
    {
      question: 'What was London’s approximate population by 1700?',
      options: ['About 10,000', 'About 60,000', 'Over 500,000', 'Five million'],
      answer: 'Over 500,000',
    },
    {
      question:
        'What traditional French-origin phrase did Londoners shout when emptying chamber pots into the street?',
      options: ['"Gardyloo!"', '"Sacrebleu!"', '"Bon voyage!"', '"Carpe diem!"'],
      answer: '"Gardyloo!"',
    },
    {
      question: 'Who invented the world’s first mechanical flush toilet in 1596?',
      options: ['Sir John Harington', 'Samuel Pepys', 'Sir Hugh Myddelton', 'King Charles II'],
      answer: 'Sir John Harington',
    },
    {
      question: 'What monarch was Sir John Harington godson to?',
      options: ['Queen Elizabeth I', 'Queen Victoria', 'King Henry VIII', 'King Charles I'],
      answer: 'Queen Elizabeth I',
    },
    {
      question:
        'What was the title of Harington’s 1596 satirical book describing his flush toilet?',
      options: [
        'The Metamorphosis of Ajax',
        'The Great Stink',
        'Bills of Mortality',
        'The Sanitary Condition of London',
      ],
      answer: 'The Metamorphosis of Ajax',
    },
    {
      question:
        'Why did Harington’s flush toilet fail to transform public health across Elizabethan Britain?',
      options: [
        'It was made of paper',
        'Homes lacked running water mains and sewers to take waste away',
        'The Queen banned all toilets',
        'People preferred going in fields',
      ],
      answer: 'Homes lacked running water mains and sewers to take waste away',
    },
    {
      question:
        'Who financed the 38-mile New River canal to bring clean water into London in 1613?',
      options: ['Sir Hugh Myddelton', 'Sir John Harington', 'Samuel Pepys', 'Edwin Chadwick'],
      answer: 'Sir Hugh Myddelton',
    },
    {
      question: 'Where did the New River bring clean spring water from?',
      options: [
        'Hertfordshire (Amwell and Chadwell)',
        'The River Thames at London Bridge',
        'The English Channel',
        'Scotland',
      ],
      answer: 'Hertfordshire (Amwell and Chadwell)',
    },
    {
      question:
        'What material was used to make the underground pipes distributing New River water across London?',
      options: ['Hollowed-out elm tree trunks', 'Stainless steel', 'Plastic PVC', 'Cast aluminium'],
      answer: 'Hollowed-out elm tree trunks',
    },
    {
      question: 'Why was the New River water system unfair to poor slum dwellers?',
      options: [
        'It was poisonous to poor people',
        'Only wealthy subscribers who paid quarterly fees had pipes connected',
        'It only ran on Sundays',
        'It was reserved for horses',
      ],
      answer: 'Only wealthy subscribers who paid quarterly fees had pipes connected',
    },
    {
      question:
        'What celebrated diarist recorded stepping into sewage in his cellar on 20 October 1660?',
      options: ['Samuel Pepys', 'John Evelyn', 'Daniel Defoe', 'William Shakespeare'],
      answer: 'Samuel Pepys',
    },
    {
      question: 'Why was Samuel Pepys’ cellar flooded with sewage?',
      options: [
        'The Thames overflowed its banks',
        'His neighbour’s cesspit cracked and leaked through the wall',
        'He forgot to empty his chamber pot',
        'A burst water main',
      ],
      answer: 'His neighbour’s cesspit cracked and leaked through the wall',
    },
    {
      question: 'In what year did the Great Plague kill nearly 100,000 Londoners?',
      options: ['1348', '1596', '1665', '1854'],
      answer: '1665',
    },
    {
      question: 'What sign was painted on the doors of plague-infected houses in 1665?',
      options: [
        'A red cross with "Lord Have Mercy Upon Us"',
        'A green dragon',
        'A black skull and crossbones',
        'A blue anchor',
      ],
      answer: 'A red cross with "Lord Have Mercy Upon Us"',
    },
    {
      question: 'Who were the "Searchers of the Dead" appointed during plague outbreaks?',
      options: [
        'Parish women appointed to inspect corpses and confirm cause of death',
        'French doctors testing medicines',
        'Gravediggers who stole jewelry',
        'Soldiers patrolling streets',
      ],
      answer: 'Parish women appointed to inspect corpses and confirm cause of death',
    },
    {
      question:
        'What weekly published documents recorded deaths and burial causes in seventeenth-century London?',
      options: ['Bills of Mortality', 'The London Gazette', 'The Times', 'The Parish Register'],
      answer: 'Bills of Mortality',
    },
    {
      question:
        'What plant product were schoolboys at Eton College ordered to smoke to ward off plague miasma?',
      options: ['Tobacco', 'Tea leaves', 'Lavender', 'Thyme'],
      answer: 'Tobacco',
    },
    {
      question:
        'What great disaster in September 1666 destroyed much of London’s overcrowded timber housing?',
      options: [
        'The Great Fire of London',
        'A North Sea tidal wave',
        'A major earthquake',
        'A French bombardment',
      ],
      answer: 'The Great Fire of London',
    },
    {
      question:
        'Did the Scientific Revolution of Harvey and Hooke immediately lead to better treatments for epidemic disease?',
      options: [
        'Yes, cholera was cured instantly',
        'No, epidemic medicine remained trapped in medieval miasma theory',
        'Yes, antibiotics were invented in 1670',
        'No, all science was banned',
      ],
      answer: 'No, epidemic medicine remained trapped in medieval miasma theory',
    },
  ],
  quiz: [],
};

module.exports.quiz = module.exports.quick_quiz;
