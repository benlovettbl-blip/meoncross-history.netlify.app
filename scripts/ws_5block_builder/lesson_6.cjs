/**
 * Master 5-Block Decimal Curriculum Standard
 * Lesson 6: John Snow and the Cholera Breakthrough (c.1854–1884)
 */

module.exports = {
  id: 'lesson_6',
  title:
    'Why did it take the scientific revolution of Germ Theory to finally conquer water-borne disease?',
  enquiry:
    'Did John Snow end cholera through medical authority, or through meticulous geographical detective work?',
  subtitle: 'From the Broad Street pump and Soho spot map to Robert Koch and modern epidemiology',
  skill: 'Disciplinary Skill: Historical Investigation & Epidemiological Evidence',
  card_image: '/images/john_snow_cholera_map.jpg',
  card_position: 'center 30%',
  banner: '/images/john_snow_cholera_map.jpg',
  cover_image: '/images/john_snow_cholera_map.jpg',

  prologue:
    'In late August 1854, a sudden and devastating cholera epidemic struck the Soho district of central London, killing over five hundred people in ten days within two hundred and fifty yards of Broad Street. While the medical establishment insisted that miasma from foul sewers was poisoning the atmosphere, an anesthetist named Dr John Snow conducted a revolution in medical detective work. By plotting every death on a spot map, Snow pinpointed the Broad Street water pump as the lethal epicenter. When the pump handle was removed, the outbreak collapsed. Yet decades passed before medical authorities surrendered miasma dogma to the undeniable truth of Germ Theory.',

  margin_spine: [
    { year: '1854', label: 'Soho Epidemic Strikes' },
    { year: '1854', label: 'Snow’s Water Theory' },
    { year: '1854', label: 'Broad Street Spot Map' },
    { year: '1855', label: 'Infant Diaper Cesspool' },
    { year: '1884', label: 'Koch Isolates Cholera' },
  ],

  causal_domino_spine: {
    title: 'John Snow, The Soho Outbreak & Germ Theory (1854–1884)',
    subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
    stages: [
      {
        step: 1,
        para_ref: '[6.1]',
        date: 'August 1854',
        title: 'The Soho Outbreak: 500 Dead in 10 Days',
        actor: 'Soho Residents, General Board of Health & Miasma Doctors',
        tag: '⚡ SOHO OUTBREAK',
        trigger:
          'In late August 1854, an explosive cholera epidemic broke out in Soho, London, killing over 500 people in ten days near Broad Street.',
        connective:
          'The medical establishment blamed sewer gases, blinding doctors to the physical source of infection in local drinking water.',
        question:
          'How did the sudden cholera outbreak of August 1854 plunge Soho into catastrophe?',
      },
      {
        step: 2,
        para_ref: '[6.2]',
        date: 'September 1854',
        title: 'Dr John Snow: The Water-Borne Hypothesis',
        actor: 'Dr John Snow (Royal Anesthetist)',
        tag: '🩺 WATER-BORNE THEORY',
        trigger:
          'Dr John Snow reasoned that because cholera attacked the digestive tract rather than the lungs, the lethal poison had to be swallowed via drinking water.',
        connective:
          'Led him to investigate the popular local water pump on Broad Street, whose sparkling, cold water was praised by local residents.',
        question: 'Why did Dr John Snow suspect water rather than foul air?',
      },
      {
        step: 3,
        para_ref: '[6.3]',
        date: 'September 1854',
        title: 'The Spot Map & The Brewery Anomaly',
        actor: 'Dr John Snow & St James Parish Vestry',
        tag: '🗺️ THE SPOT MAP',
        trigger:
          'Snow plotted 616 deaths on a street map, proving a heavy cluster around the pump, while 70 brewery workers drinking malt beer suffered zero deaths.',
        connective:
          'Convinced parish authorities on 8 September 1854 to remove the pump handle, causing the lethal local epidemic to collapse immediately.',
        question: 'How did John Snow use scientific detective work and mapping to prove his case?',
      },
      {
        step: 4,
        para_ref: '[6.4]',
        date: '1854–1855',
        title: 'The Cesspool Revelation: Baby Lewis & The Well',
        actor: 'Surveyor York, Baby Lewis & St James Vestry',
        tag: '🕳️ LEAKING CESSPOOL',
        trigger:
          'Excavation of the Broad Street well revealed that at No. 40, a mother had washed the soiled diapers of her cholera-stricken infant (Baby Lewis) into a cracked cesspool.',
        connective:
          'Proved liquid sewage had seeped through two feet of porous soil directly into the pump water, providing undeniable mechanical proof of contamination.',
        question: 'What microscopic contamination was finally discovered beneath the pump?',
      },
      {
        step: 5,
        para_ref: '[6.5]',
        date: '1855–1884',
        title: 'Robert Koch & The Triumph of Epidemiology',
        actor: 'General Board of Health & Robert Koch',
        tag: '🔬 BACTERIAL VINDICATION',
        trigger:
          'Though the Board of Health rejected Snow’s findings in 1855, German scientist Robert Koch isolated the Vibrio cholerae bacterium in 1884.',
        connective:
          'Vindicated Snow’s detective work posthumously, establishing modern epidemiology and cementing clean water as a non-negotiable human right.',
        question: 'Why did medical authorities resist John Snow’s findings for decades?',
      },
    ],
  },

  workbook_stages: [
    {
      step: 1,
      paraRef: '[6.1]',
      date: 'August 1854',
      questionHeading:
        'How did the sudden cholera outbreak of August 1854 plunge Soho into catastrophe?',
      bullets: [
        'Broad Street Intersection',
        '500 Fatalities in Ten Days',
        'Medical Establishment Miasma Dogma',
      ],
      focusClue:
        'Why were doctors convinced that bad smells from unwashed gutters were causing the Soho outbreak?',
    },
    {
      step: 2,
      paraRef: '[6.2]',
      date: 'September 1854',
      questionHeading: 'Why did Dr John Snow suspect water rather than foul air?',
      bullets: [
        'Royal Anesthetist to Queen Victoria',
        'Gut-First Symptoms Rather than Lungs',
        'Drinking Supply Theory',
      ],
      focusClue:
        'Why did cholera symptoms affecting the digestive tract rather than lungs convince Snow that the poison was ingested?',
    },
    {
      step: 3,
      paraRef: '[6.3]',
      date: 'September 1854',
      questionHeading:
        'How did John Snow use scientific detective work and mapping to prove his case?',
      bullets: [
        '616 Cholera Death Bars Plotted',
        'Brewery Workers Drinking Malt Beer',
        'Removing the Broad Street Pump Handle',
      ],
      focusClue:
        'How did the 70 brewery workers who suffered zero cholera deaths provide the crucial negative proof Snow needed?',
    },
    {
      step: 4,
      paraRef: '[6.4]',
      date: '1854–1855',
      questionHeading: 'What microscopic contamination was finally discovered beneath the pump?',
      bullets: [
        "Baby Lewis's Soiled Diaper",
        'Cracked Brickwork in 40 Broad Street',
        'Cesspool Sewage Leaking into Well',
      ],
      focusClue:
        'How did surveyor inspection prove that fecal matter was seeping directly through porous soil into drinking water?',
    },
    {
      step: 5,
      paraRef: '[6.5]',
      date: '1855–1884',
      questionHeading: 'Why did medical authorities resist John Snow’s findings for decades?',
      bullets: [
        'General Board of Health Rejection',
        'Robert Koch Isolates Vibrio Cholerae (1884)',
        'Clean Water as a Human Right',
      ],
      focusClue:
        "Why did the Board of Health reject Snow's report in 1855, and what finally forced them to accept the truth?",
    },
  ],

  did_you_know:
    'When Dr John Snow investigated the 1854 Broad Street outbreak, he was baffled to discover that a wealthy widow named Susanna Eley died of cholera in healthy, elevated Hampstead—five miles away from Soho! Snow solved the mystery by interviewing her son: Mrs Eley liked the taste of Broad Street well water so much that she paid a carter to bring a large bottle up to Hampstead every single day!',

  do_now: [
    { q: 'In what year did the Great Stink overwhelm the Houses of Parliament?', a: '1858.' },
    {
      q: 'Who engineered London’s 82-mile underground intercepting sewer network?',
      a: 'Joseph Bazalgette.',
    },
    {
      q: 'What 1848 reform created the first General Board of Health, though setting up local boards was voluntary?',
      a: 'The Public Health Act 1848.',
    },
    {
      q: 'Which local Hampshire pumping station was built in 1865 using steam beam engines?',
      a: 'Eastney Beam Engine House.',
    },
    {
      q: 'What medical theory, believed since ancient times, wrongly claimed that diseases were spread by foul smells and poisonous air?',
      a: 'Miasma theory.',
    },
  ],

  vocabulary: [
    {
      term: 'Epidemiology',
      definition:
        'The branch of medical science that investigates the distribution, incidence, causes, and control of disease in populations.',
    },
    {
      term: 'Dr John Snow',
      definition:
        'The brilliant London physician and anesthetist who demonstrated through cartographic evidence that cholera was transmitted by drinking water.',
    },
    {
      term: 'Broad Street Pump',
      definition:
        'The municipal water pump in Soho, London, identified by Dr John Snow as the central point source of the lethal 1854 cholera outbreak.',
    },
    {
      term: 'Spot Map',
      definition:
        'A cartographic epidemiological technique where individual disease deaths are plotted as bars on a street plan to reveal geographic clusters.',
    },
    {
      term: 'Brewery Anomaly',
      definition:
        'The crucial negative evidence in Snow’s investigation: 70 workers at the Lion Brewery on Broad Street drank only malt liquor and suffered zero deaths.',
    },
    {
      term: 'Baby Lewis',
      definition:
        'The five-month-old infant at 40 Broad Street whose cholera-infected diapers were washed into a leaking cesspool, contaminating the pump well.',
    },
    {
      term: 'Robert Koch',
      definition:
        'The pioneering German microbiologist who isolated the Vibrio cholerae bacterium under the microscope in 1884, confirming Snow’s theory.',
    },
    {
      term: 'Point Source Epidemic',
      definition:
        'An outbreak where affected individuals are exposed to a single, common contaminated source, such as a polluted water well.',
    },
  ],

  narrative_blocks: [
    {
      act: 1,
      title: 'The Soho Cholera Outbreak & Miasma Dogma (1854)',
      theme_heading: 'The Soho Cholera Outbreak & Miasma Dogma (1854)',
      text: '<span class="para-ref">[6.1]</span> In late August 1854, a sudden cholera outbreak struck the crowded Soho district of central London. Within ten days, over five hundred people living near Broad Street died in agonizing pain. Soho was thrown into chaos as coffins lined the streets and terrified families fled the area.<br><br>The medical establishment blamed **miasma**—foul air rising from unwashed drains, cesspools, and rotting gutters. Doctors believed hot weather had caused a cloud of poisonous gas to settle over Soho. They told residents to shut their windows, light camphor lamps, and pour vinegar in the street. These measures achieved nothing because doctors looked at the air rather than the water.',
    },
    {
      act: 2,
      title: 'The Medical Detective: Dr John Snow at Broad Street',
      theme_heading: 'The Medical Detective: Dr John Snow at Broad Street',
      text: '<span class="para-ref">[6.2]</span> One London doctor rejected the miasma consensus: **Dr John Snow**, a leading physician who had administered chloroform to Queen Victoria in 1853. Snow used clinical logic: if cholera was inhaled from bad air, it would attack the lungs and throat. Instead, patients suffered violent vomiting and diarrhea, proving the disease attacked the digestive system and had to be swallowed in contaminated food or drinking water.<br><br>Snow investigated the popular public water pump at the corner of Broad Street and Cambridge Street. The pump drew water from an underground gravel well twenty-eight feet deep. Local residents praised its water as cold and sparkling, unaware it was fatally contaminated.',
    },
    {
      act: 3,
      title: 'Spot Map Evidence & the Lion Brewery Anomaly (1854)',
      theme_heading: 'Spot Map Evidence & the Lion Brewery Anomaly (1854)',
      text: '<span class="para-ref">[6.3]</span> Snow created his famous **1854 Cholera Spot Map** (Source A) to prove his water theory. By plotting 616 cholera deaths as black bars outside each victim’s house, Snow revealed that deaths clustered directly around the Broad Street pump.<br><br>Crucially, Snow investigated anomalies. At the nearby Lion Brewery, seventy workers drank only free malt beer and suffered zero cholera deaths. In contrast, a widow living miles away in Hampstead died after having Broad Street water delivered to her in a bottle. On 7 September 1854, Snow convinced local parish officials to remove the handle from the Broad Street pump. The epidemic collapsed immediately, proving cholera was waterborne.',
      source: {
        letter: 'A',
        title: 'Source A: Dr John Snow’s 1854 Cholera Spot Map of Soho',
        image: '/images/john_snow_cholera_map.jpg',
        caption:
          'Dr John Snow’s celebrated 1854 epidemiological spot map of the parish of St James, Westminster. Black bars stacked outside house frontages represent individual cholera deaths, revealing a massive cluster centered on the Broad Street water pump.',
        source_context:
          'Snow’s map is the foundational document of modern spatial epidemiology. By mapping data geographically, Snow turned complex mortality statistics into clear visual proof of a point-source water epidemic. Hinge Question: Does Snow’s map prove that water was the cause of cholera, or did it merely show correlation that miasma believers could explain away?',
        how_useful_question:
          'How useful is Source A for an enquiry into Dr John Snow’s investigation of the 1854 Broad Street cholera outbreak?',
        provenance_clues: [
          'Author: Dr John Snow, physician and medical investigator.',
          'Audience: The Epidemiological Society of London and the St James parish vestry.',
          'Motive: To prove empirically that cholera deaths clustered around the contaminated Broad Street water pump.',
        ],
        hinge_question:
          'Hinge Question: Does Snow’s map prove that water was the cause of cholera, or did it merely show correlation that miasma believers could explain away?',
        citation: 'Dr John Snow • On the Mode of Communication of Cholera (2nd edition, 1855).',
      },
    },
    {
      act: 4,
      title: 'The Cesspool Revelation: 40 Broad Street & the Leaking Well',
      theme_heading: 'The Cesspool Revelation: 40 Broad Street & the Leaking Well',
      text: '<span class="para-ref">[6.4]</span> Snow then proved how the water became poisoned. Working with Reverend Henry Whitehead, Snow traced the outbreak to its first case: five-month-old **Baby Lewis** at 40 Broad Street. His mother had washed his cholera-infected diapers and emptied the water into a basement cesspool.<br><br>When surveyor Peter York excavated the site, he found that the brick lining of the cesspool was cracked. Liquid sewage had seeped through less than three feet of soil directly into the fractured stone wall of the Broad Street drinking well. Contaminated sewage filled with cholera bacteria was being pumped directly into residents\' drinking cups.',
      source: {
        letter: 'B',
        title: 'Source B: Investigation of the Lion Brewery and Susanna Eley Case Study (1854)',
        image: '/images/john_snow_cholera_map.jpg',
        caption:
          'Extracts from Dr John Snow’s casebook: "At the brewery in Broad Street there are 70 workmen, and it appears that none of them had cholera... they are allowed a certain quantity of malt liquor... Mrs Eley of Hampstead, who had not been in Soho for months, died after drinking Broad Street water brought to her in a bottle by a carrier."',
        source_context:
          "Snow’s detailed investigation of anomalies provided crucial negative and positive controls that disproved miasma theory and confirmed water-borne transmission. Hinge Question: Why was the death of Susanna Eley in healthy, elevated Hampstead the definitive piece of evidence confirming Snow's theory?",
        how_useful_question:
          'How useful is Source B for an enquiry into how Dr John Snow used scientific detective work to disprove the miasma theory?',
        provenance_clues: [
          'Author: Dr John Snow recording detailed medical interview records.',
          'Audience: Medical professionals and public health administrators.',
          'Motive: To eliminate confounding variables and prove that only those who ingested pump water contracted cholera.',
        ],
        hinge_question:
          "Hinge Question: Why was the death of Susanna Eley in healthy, elevated Hampstead the definitive piece of evidence confirming Snow's theory?",
        citation: 'John Snow • Report on the Cholera Outbreak in the Parish of St James (1855).',
      },
    },
    {
      act: 5,
      title: 'Medical Dogma Overturned: Germ Theory & Robert Koch (1884)',
      theme_heading: 'Medical Dogma Overturned: Germ Theory & Robert Koch (1884)',
      text: '<span class="para-ref">[6.5]</span> Despite Snow’s proof, the General Board of Health rejected his findings in 1855, stubbornly clinging to miasma theory because Snow could not show bacteria under a microscope. Snow tragically died of a stroke in 1858, aged forty-five, before his genius was officially recognized.<br><br>Snow was fully vindicated thirty years later. In 1884, German scientist **Robert Koch** isolated the *Vibrio cholerae* bacterium under the microscope, proving cholera was spread through sewage-tainted water. Today, Dr John Snow is celebrated as the father of modern epidemiology, proving that clean water is a non-negotiable human right.',
    },
  ],

  tasks: [
    {
      id: 'ws_l6_q5_disciplinary_evaluation',
      type: 'extended_writing',
      topic: 'Question 5: Disciplinary Evaluation [12 marks • 15 mins]',
      title: 'Question 5: Disciplinary Evaluation [12 marks • 15 mins]',
      question:
        'Explain why Dr John Snow’s investigation of the 1854 Broad Street cholera epidemic was a decisive turning point in medicine. [12 marks]',
      stimulus: [
        'The cartographic and geographical evidence of the 1854 Cholera Spot Map',
        'The persistence of miasma theory and delayed acceptance by the Board of Health',
      ],
      scaffolding: {
        guidance:
          'Write a structured 3-paragraph PEEL response. Use the exact words from the question stem in your Point and in your Link for every paragraph.',
        structure_strip: [
          {
            col: '1. SCIENTIFIC METHODOLOGY & MAPPING',
            prompt:
              'Explain how Snow used clinical logic, the 1854 Spot Map, the brewery anomaly, and removing the pump handle to pioneer modern epidemiology [6.2, 6.3].',
            starter:
              'A decisive reason explaining why Dr John Snow’s investigation was a major turning point was his revolutionary use of scientific detective work and mapping...',
          },
          {
            col: '2. DISPROVING MIASMA & REVEALING SEWAGE',
            prompt:
              'Explain how uncovering Baby Lewis’s diaper and the leaking cesspool at No. 40 proved that water-borne bacteria, not bad air, caused cholera [6.4].',
            starter:
              'Furthermore, Snow’s investigation was a decisive turning point because it provided physical proof that cholera was caused by sewage-tainted water rather than miasma...',
          },
          {
            col: '3. COMPARATIVE VERDICT & LONG-TERM IMPACT',
            prompt:
              'Weigh the immediate rejection by the Board of Health against the ultimate vindication by Robert Koch in 1884 [6.5].',
            starter:
              'Ultimately, while the Board of Health initially resisted his findings, Snow’s work was a profound turning point because it established modern epidemiology...',
          },
        ],
      },
      hints: [
        'Point: State your factor clearly using the exact words from the question stem.',
        'Evidence: Deploy specific historical details: Broad Street pump, 1854 Spot Map (616 deaths), Lion Brewery (70 workers unharmed), Susanna Eley (Hampstead), Baby Lewis, Peter York’s excavation, and Robert Koch (1884) [6.2–6.5].',
        'Explanation: Connect the factors causally: show how Snow’s methodology proved water transmission decades before bacteria could be isolated under microscopes [6.3, 6.5].',
        'Link: Conclude with a sustained comparative judgment: evaluate the immediate short-term impact in Soho versus long-term global significance [6.5].',
      ],
      model_answer:
        'A decisive reason explaining why Dr John Snow’s investigation was a major turning point in medicine was his revolutionary use of scientific detective work, clinical logic, and geographical mapping to pioneer the discipline of epidemiology. While the medical establishment insisted that the sudden August 1854 Soho outbreak was caused by foul sewer gases, Snow deduced that because cholera caused sudden vomiting and violent diarrhea rather than respiratory failure, the poison had to be ingested through water. Snow substantiated this hypothesis by creating his famous 1854 Cholera Spot Map, plotting all 616 deaths as black bars stacked outside houses around the Broad Street pump. Furthermore, Snow tested his theory by investigating anomalies: he proved that seventy workers at the local Lion Brewery suffered zero fatalities because they drank free malt liquor instead of water, while a widow in distant Hampstead (Susanna Eley) died after having Broad Street water delivered to her home. By persuading the St James parish vestry to remove the pump handle on 8 September 1854, Snow caused the epidemic to collapse, demonstrating for the first time that spatial data could identify and halt an infectious disease.<br><br>Furthermore, Snow’s investigation was a decisive turning point because it uncovered the physical mechanism of water-borne contamination, striking a fatal blow against the ancient doctrine of miasma. In collaboration with Reverend Henry Whitehead, Snow traced the outbreak back to its index case: five-month-old Baby Lewis at No. 40 Broad Street. His mother had washed his cholera-stained diapers in warm water and dumped the waste into a basement cesspool. When surveyor Peter York excavated the ground beneath the street, he discovered that the brick lining of the cesspool was cracked, allowing liquid sewage to seep through two feet and eight inches of porous gravel directly into the drinking water well of the pump. This forensic excavation provided undeniable physical proof that cholera was transmitted by human waste contaminating drinking water, paving the way for the biological revolution of Germ Theory.<br><br>Ultimately, while the General Board of Health stubbornly rejected Snow’s findings in 1855 due to entrenched miasma dogma, Snow’s work was a decisive turning point because it laid the empirical foundation for modern public health. Although Snow died tragically in 1858 before achieving full recognition, his hypothesis was conclusively validated in 1884 when German microbiologist Robert Koch isolated the comma-shaped Vibrio cholerae bacterium under the microscope. Snow’s investigation proved that municipal authorities had to separate drinking water from human sewage, directly inspiring the compulsory regulations of the 1875 Public Health Act. Therefore, Dr John Snow’s investigation transformed medicine by replacing centuries of superstitious miasma theory with rigorous scientific epidemiology, establishing clean water as a non-negotiable human right.',
    },
  ],

  teacher_notes: {
    primer:
      'This final enquiry celebrates the birth of modern epidemiology. Guide Year 7 pupils to trace Snow’s detective process: from symptom observation (gut vs lungs) to cartographic data (the spot map) and anomaly verification (the brewery workers and the Hampstead widow).',
    objectives: [
      {
        objective:
          'Explain how Dr John Snow used scientific detective work and his 1854 spot map to locate the source of cholera.',
        primer:
          'Focus on paragraphs [6.2] and [6.3]. Emphasise the Lion Brewery anomaly and Susanna Eley in Hampstead.',
        question:
          'Hinge Question: Why was the survival of seventy brewery workers drinking malt beer the most convincing proof of Snow’s water-borne theory?',
      },
      {
        objective:
          'Assess why medical authorities resisted Snow’s findings, and how Germ Theory finally vindicated him.',
        primer:
          'Examine paragraphs [6.4] and [6.5]. Highlight Baby Lewis’s diaper, Board of Health scepticism, and Robert Koch (1884).',
        question:
          'Hinge Question: Why did the General Board of Health reject Snow’s report in 1855, and what finally forced them to accept the truth?',
      },
    ],
    source_context: [
      {
        source: 'Source A (John Snow’s Spot Map)',
        context:
          'Dr John Snow’s 1854 spot map plotting cholera deaths around the Broad Street pump. Hinge Question: Does Snow’s map prove that water was the cause of cholera, or did it merely show correlation that miasma believers could explain away?',
      },
      {
        source: 'Source B (Brewery & Susanna Eley)',
        context:
          "Case studies of Lion Brewery workers (zero deaths) and Susanna Eley in Hampstead (died after drinking bottled Soho water). Hinge Question: Why was the death of Susanna Eley in healthy, elevated Hampstead the definitive piece of evidence confirming Snow's theory?",
      },
    ],
  },

  video: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=TT4Z1Ikf36w',
      title: 'Dr John Snow and the 1854 Broad Street Cholera Outbreak',
      duration: '7 mins 20 secs',
      viewing_task:
        'Explain how John Snow identified the Broad Street pump as the cause of cholera and what action he took.',
      model_answer:
        'Snow plotted deaths on a map showing they clustered around the Broad Street pump, interviewed local families, and convinced the parish council to remove the pump handle.',
    },
  ],

  quick_quiz: [
    {
      question:
        'In what central London neighborhood did a devastating cholera epidemic break out in August 1854?',
      options: ['Soho', 'Whitechapel', 'Westminster', 'Kensington'],
      answer: 'Soho',
    },
    {
      question: 'How many people died in Soho within ten days near Broad Street in 1854?',
      options: ['Over 500 people', 'Ten people', '50,000 people', 'Nobody died'],
      answer: 'Over 500 people',
    },
    {
      question:
        'What did the medical establishment and Board of Health blame for the 1854 Soho outbreak?',
      options: [
        'Foul miasma (poisonous sewer gas)',
        'Contaminated water',
        'Poisoned bread',
        'Alien invasion',
      ],
      answer: 'Foul miasma (poisonous sewer gas)',
    },
    {
      question: 'What was Dr John Snow’s medical specialty before investigating cholera?',
      options: ['Anesthetist (administering chloroform)', 'Dentist', 'Brain surgeon', 'Eye doctor'],
      answer: 'Anesthetist (administering chloroform)',
    },
    {
      question:
        'What famous monarch did Dr John Snow administer chloroform to during childbirth in 1853?',
      options: ['Queen Victoria', 'Queen Elizabeth I', 'Queen Anne', 'Queen Mary'],
      answer: 'Queen Victoria',
    },
    {
      question:
        'Why did John Snow believe cholera was swallowed in water rather than inhaled from air?',
      options: [
        'Symptoms attacked the digestive tract and stomach first, not the lungs',
        'He had a microscope showing bacteria',
        'He saw cholera in the clouds',
        'A fortune teller told him',
      ],
      answer: 'Symptoms attacked the digestive tract and stomach first, not the lungs',
    },
    {
      question: 'What street was the contaminated municipal water pump located on in Soho?',
      options: ['Broad Street', 'Baker Street', 'Fleet Street', 'Oxford Street'],
      answer: 'Broad Street',
    },
    {
      question: 'Why did local residents love the water from the Broad Street pump?',
      options: [
        'It was cold, sparkling, and tasted fresh compared to river water',
        'It was flavored with lemon',
        'It was boiling hot',
        'It was free beer',
      ],
      answer: 'It was cold, sparkling, and tasted fresh compared to river water',
    },
    {
      question:
        'What famous visual tool did John Snow create to prove cholera clustered around the pump?',
      options: [
        'The 1854 Cholera Spot Map',
        'A painted oil portrait',
        'A pie chart',
        'A bronze statue',
      ],
      answer: 'The 1854 Cholera Spot Map',
    },
    {
      question: 'How did John Snow represent each cholera death on his 1854 spot map?',
      options: [
        'As a black bar stacked outside the victim’s address',
        'With a red circle',
        'With a yellow cross',
        'With a blue dot',
      ],
      answer: 'As a black bar stacked outside the victim’s address',
    },
    {
      question: 'Why was the Lion Brewery on Broad Street so important to Snow’s investigation?',
      options: [
        'Its 70 workers drank free malt beer and none of them died of cholera',
        'It was where cholera was invented',
        'The workers died first',
        'It was used as a hospital',
      ],
      answer: 'Its 70 workers drank free malt beer and none of them died of cholera',
    },
    {
      question: 'Who was Susanna Eley in Hampstead, and why was her death significant?',
      options: [
        'She died in healthy Hampstead because she had Broad Street water delivered in a bottle',
        'She was the Queen’s sister',
        'She invented chloroform',
        'She owned the Broad Street pump',
      ],
      answer:
        'She died in healthy Hampstead because she had Broad Street water delivered in a bottle',
    },
    {
      question:
        'What decisive action did John Snow persuade the parish vestry to take on 8 September 1854?',
      options: [
        'Remove the handle from the Broad Street pump',
        'Burn down Soho',
        'Lock all citizens inside',
        'Dump lime into the Thames',
      ],
      answer: 'Remove the handle from the Broad Street pump',
    },
    {
      question:
        'Who was the five-month-old infant identified as the "index case" of the Soho outbreak?',
      options: ['Baby Lewis', 'Baby Victoria', 'Baby John', 'Baby Charles'],
      answer: 'Baby Lewis',
    },
    {
      question: 'How did Baby Lewis’s illness contaminate the Broad Street pump well?',
      options: [
        'His mother washed his cholera diapers into a cracked cesspool that leaked into the well',
        'He fell into the well',
        'His father poisoned the water',
        'A flood washed sewage from the Thames',
      ],
      answer:
        'His mother washed his cholera diapers into a cracked cesspool that leaked into the well',
    },
    {
      question:
        'What distance separated the cracked cesspool at No. 40 Broad Street from the drinking well?',
      options: ['Just 2 feet and 8 inches', 'Ten miles', '500 yards', '50 feet'],
      answer: 'Just 2 feet and 8 inches',
    },
    {
      question: 'Did the General Board of Health immediately accept John Snow’s findings in 1855?',
      options: [
        'No, they stubbornly rejected his water theory and clung to miasma',
        'Yes, they knighted him immediately',
        'Yes, they tore down all pumps',
        'Yes, they banned all water',
      ],
      answer: 'No, they stubbornly rejected his water theory and clung to miasma',
    },
    {
      question: 'In what year did Dr John Snow die, before his theories were fully accepted?',
      options: ['1858', '1831', '1875', '1901'],
      answer: '1858',
    },
    {
      question:
        'What German scientist isolated the Vibrio cholerae bacterium under a microscope in 1884?',
      options: ['Robert Koch', 'Louis Pasteur', 'Edwin Chadwick', 'Joseph Bazalgette'],
      answer: 'Robert Koch',
    },
    {
      question: 'What branch of medicine is Dr John Snow celebrated for founding?',
      options: [
        'Modern epidemiology (tracking disease patterns)',
        'Cardiology',
        'Brain surgery',
        'Orthopedics',
      ],
      answer: 'Modern epidemiology (tracking disease patterns)',
    },
  ],
  quiz: [],
};

module.exports.quiz = module.exports.quick_quiz;
