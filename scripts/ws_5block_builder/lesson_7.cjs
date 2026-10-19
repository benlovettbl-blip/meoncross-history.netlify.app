/**
 * Master 5-Block Decimal Curriculum Standard
 * Lesson 7: November Assessment Masterclass (c.1800–1900)
 *
 * Formal Assessment: "Explain why there was rapid progress in Public Health 1800–1900?" [12 marks • 30 mins]
 * Sets: 7Y (Tuesday 10th Nov P2) & 7X (Tuesday 10th Nov P4)
 */

module.exports = {
  id: 'lesson_7',
  title: 'November Assessment Masterclass: Rapid Progress in Public Health (1800–1900)',
  enquiry: 'Why was there rapid progress in Public Health between 1800 and 1900?',
  subtitle:
    'Step-by-step PEEL Planning & Revision Workshop: John Snow, Joseph Bazalgette, Louis Pasteur, and the 1875 Public Health Act',
  skill: 'Disciplinary Skill: Causal Explanation & Structured PEEL Synthesis',
  card_image: '/images/water_local_eastney_opt.jpg',
  card_position: 'center 40%',
  banner: '/images/water_local_eastney_opt.jpg',
  cover_image: '/images/water_local_eastney_opt.jpg',

  prologue:
    'Welcome to your November Assessment Masterclass! In this workshop, you will prepare for your 30-minute formal assessment: "Explain why there was rapid progress in Public Health 1800–1900?". You will write three developed PEEL paragraphs explaining how scientific investigation (Dr John Snow), civil engineering (Sir Joseph Bazalgette), laboratory microbiology (Louis Pasteur), and compulsory government legislation (the 1875 Public Health Act) transformed British public health from deadly squalor into modern sanitary safety. Over half term, you are permitted to prepare ONE single sheet of A4 lined paper containing bullet points, mind maps, statistics, and dates to bring directly into the assessment room!',

  assessment_notice: {
    title: 'Year 7 November Formal Assessment Timetable & Rules',
    groups: [
      { set: 'Set 7Y', date: 'Tuesday 10th November', period: 'Period 2 (30 mins)' },
      { set: 'Set 7X', date: 'Tuesday 10th November', period: 'Period 4 (30 mins)' },
    ],
    rules: [
      'You are permitted to bring ONE sheet of A4 lined paper with revision notes into the assessment.',
      'Notes MUST be in bullet points, timelines, or mind maps — strictly NO full sentences or pre-written paragraphs.',
      'Write 3 developed PEEL paragraphs choosing from the 4 key historical catalysts.',
      'Total assessment time: 30 minutes (12 marks).',
    ],
  },

  margin_spine: [
    { year: '1800–1850', label: 'Laissez-Faire Context' },
    { year: '1854', label: 'Reason 1: Dr John Snow' },
    { year: '1858–1865', label: 'Reason 2: Joseph Bazalgette' },
    { year: '1861', label: 'Reason 3: Louis Pasteur' },
    { year: '1875', label: 'Reason 4: 1875 Health Act' },
  ],

  causal_domino_spine: {
    title: 'The Catalysts of 19th-Century Public Health Progress (1800–1900)',
    subtitle: 'How 4 Interconnected Breakthroughs Conquered Epidemic Disease',
    stages: [
      {
        step: 1,
        para_ref: '[7.1]',
        date: '1800–1850',
        title: 'The Crisis: Slum Squalor & Laissez-Faire Inertia',
        actor: 'British Industrial Towns & Laissez-Faire Parliament',
        tag: '🏭 SLUM CRISIS',
        trigger:
          'Explosive urban migration crammed millions into unventilated back-to-back slums with overflowing cesspools and cholera epidemics.',
        connective:
          'Proved that leaving public health to private landlords and optional local boards had failed, creating an urgent crisis.',
        question: 'Why did Britain make almost no public health progress in the early 1800s?',
      },
      {
        step: 2,
        para_ref: '[7.2]',
        date: '1854',
        title: 'Reason 1: Dr John Snow & Scientific Detective Work',
        actor: 'Dr John Snow (Royal Physician & Epidemiologist)',
        tag: '🩺 SCIENCE & MAPS',
        trigger:
          'Snow investigated the Soho cholera outbreak, plotted deaths on a spot map, and proved the Broad Street pump contaminated with sewage caused cholera.',
        connective:
          'Shattered the age-old medical dogma of miasma and pinpointed clean drinking water as the true frontline of disease prevention.',
        question: 'How did John Snow prove that cholera was transmitted by drinking water?',
      },
      {
        step: 3,
        para_ref: '[7.3]',
        date: '1858–1865',
        title: 'Reason 2: Joseph Bazalgette & Massive Civil Engineering',
        actor: 'Sir Joseph Bazalgette & The Metropolitan Board of Works',
        tag: '🧱 SEWER NETWORK',
        trigger:
          'The Great Stink of 1858 terrorized Parliament into funding Bazalgette to build 82 miles of brick intercepting sewers using Portland cement.',
        connective:
          'Diverted 420 million gallons of sewage daily eastward away from London drinking supplies, eliminating water-borne epidemics.',
        question: 'Why did the Great Stink finally force the government to build London’s sewers?',
      },
      {
        step: 4,
        para_ref: '[7.4]',
        date: '1861',
        title: 'Reason 3: Louis Pasteur & The Germ Theory Revolution',
        actor: 'Louis Pasteur (French Microbiologist)',
        tag: '🔬 GERM THEORY',
        trigger:
          'Pasteur boiled broth in curved swan-neck flasks, disproving spontaneous generation and proving microscopic airborne bacteria caused decay.',
        connective:
          'Provided undeniable scientific proof that living bacteria—not bad smells—caused disease, forcing doctors to accept water sanitation.',
        question: 'How did Louis Pasteur’s Germ Theory destroy the miasma orthodoxy?',
      },
      {
        step: 5,
        para_ref: '[7.5]',
        date: '1875',
        title: 'Reason 4: Government Legislation & The 1875 Public Health Act',
        actor: 'Benjamin Disraeli’s Conservative Government & Municipal Councils',
        tag: '⚖️ COMPULSORY LAW',
        trigger:
          'Parliament passed the landmark 1875 Public Health Act, replacing permissive advice with mandatory duties for every local council.',
        connective:
          'Every town was legally forced to provide clean piped water, sewage disposal, street lighting, and Medical Officers of Health.',
        question: 'Why was the 1875 Public Health Act the decisive legal turning point?',
      },
    ],
  },

  key_terms: [
    {
      term: 'Laissez-Faire',
      definition:
        'The political belief ("leave alone") that government should not interfere in citizens’ lives, business, or public health spending.',
    },
    {
      term: 'Epidemiology',
      definition:
        'The scientific study and mapping of how diseases spread through human populations, pioneered by Dr John Snow.',
    },
    {
      term: 'Germ Theory',
      definition:
        'Louis Pasteur’s 1861 discovery that microscopic living organisms (bacteria/microbes) cause decay and infectious diseases.',
    },
    {
      term: 'Miasma',
      definition:
        'The centuries-old false medical belief that diseases were generated by poisonous clouds of bad air rising from rotting matter.',
    },
    {
      term: 'Intercepting Sewers',
      definition:
        'Bazalgette’s network of underground tunnels built parallel to the Thames to capture sewage before it could reach the river.',
    },
    {
      term: 'Compulsory Legislation',
      definition:
        'Laws that require citizens or councils to obey ("must") rather than giving optional permission ("may"), seen in the 1875 Act.',
    },
  ],

  workbook_stages: [
    {
      step: 1,
      para_ref: '[7.1]',
      paraRef: '[7.1]',
      date: '1800–1850',
      heading:
        'How did the failure of laissez-faire create the urgent need for rapid public health reform?',
      questionHeading:
        'How did the failure of laissez-faire create the urgent need for rapid public health reform?',
      bullets: [
        'Cramped Back-to-Back Slums',
        'Optional 1848 Public Health Act',
        'Laissez-Faire Ratepayer Inaction',
      ],
      focus_clue:
        'Why did towns refuse to clean streets or build sewers until lethal cholera epidemics and political panic forced action?',
      focusClue:
        'Why did towns refuse to clean streets or build sewers until lethal cholera epidemics and political panic forced action?',
    },
    {
      step: 2,
      para_ref: '[7.2]',
      paraRef: '[7.2]',
      date: '1854',
      heading: 'How did Dr John Snow’s Broad Street investigation prove cholera was water-borne?',
      questionHeading:
        'How did Dr John Snow’s Broad Street investigation prove cholera was water-borne?',
      bullets: [
        'Door-to-Door Mortality Inquiries',
        'Soho Spot Map Cartography',
        'Removal of the Pump Handle',
      ],
      focus_clue:
        'Why was Snow’s geographical mapping of pump deaths more convincing than doctors’ theories about miasma bad air?',
      focusClue:
        'Why was Snow’s geographical mapping of pump deaths more convincing than doctors’ theories about miasma bad air?',
    },
    {
      step: 3,
      para_ref: '[7.3]',
      paraRef: '[7.3]',
      date: '1858–1865',
      heading:
        'Why did the Great Stink force Parliament to fund Bazalgette’s massive sewer network?',
      questionHeading:
        'Why did the Great Stink force Parliament to fund Bazalgette’s massive sewer network?',
      bullets: [
        'Boiling Thames Outside Parliament',
        '£3 Million Emergency Legislation',
        '82 Miles of Intercepting Sewers',
      ],
      focus_clue:
        'How did Joseph Bazalgette use gravity, oval brick tunnels, and steam pumping stations to permanently clean London?',
      focusClue:
        'How did Joseph Bazalgette use gravity, oval brick tunnels, and steam pumping stations to permanently clean London?',
    },
    {
      step: 4,
      para_ref: '[7.4]',
      paraRef: '[7.4]',
      date: '1861',
      heading: 'How did Louis Pasteur’s Germ Theory provide the scientific proof for clean water?',
      questionHeading:
        'How did Louis Pasteur’s Germ Theory provide the scientific proof for clean water?',
      bullets: [
        'Boiled Broth Swan-Neck Flasks',
        'Airborne Microbes Disproved Spontaneous Generation',
        'Microbial Contamination in Water',
      ],
      focus_clue:
        'How did proving bacteria existed convince governments that filtering water was a matter of life and death?',
      focusClue:
        'How did proving bacteria existed convince governments that filtering water was a matter of life and death?',
    },
    {
      step: 5,
      para_ref: '[7.5]',
      paraRef: '[7.5]',
      date: '1875',
      heading:
        'Why was the 1875 Public Health Act the decisive legal turning point across Britain?',
      questionHeading:
        'Why was the 1875 Public Health Act the decisive legal turning point across Britain?',
      bullets: [
        'From "May" to Mandatory "Must"',
        'Compulsory Clean Water & Sewers',
        'Permanent Death of Laissez-Faire',
      ],
      focus_clue:
        'Why could individual towns no longer refuse to spend money on public health after the landmark 1875 Act?',
      focusClue:
        'Why could individual towns no longer refuse to spend money on public health after the landmark 1875 Act?',
    },
  ],

  narrative_blocks: [
    {
      act: 1,
      title: 'Deconstructing the Question: The 19th-Century Transformation (1800–1900)',
      theme_heading: 'Deconstructing the Question: The 19th-Century Transformation (1800–1900)',
      text: '<span class="para-ref">[7.1]</span> Between 1800 and 1850, the Industrial Revolution triggered rapid, chaotic urbanisation across Britain. Millions moved from rural villages into industrial cities like Manchester and Leeds to work in factories. Speculative landlords built cramped "back-to-back" terraced slums with no building codes. Up to one hundred residents shared a single outdoor privy, and shallow drinking wells were contaminated by leaking cesspools.<br><br>The British government took no action due to **laissez-faire** ("leave alone")—the belief that the state should not interfere in private life or raise taxes. Although Edwin Chadwick\'s 1842 Report proved filth caused disease, the 1848 Public Health Act was merely **permissive** (optional). Most local councils refused to spend tax money on clean water or sewers. Consequently, nationwide cholera epidemics in 1831, 1848, and 1853 killed over 130,000 Britons. Progress was impossible until three breakthroughs occurred: scientific epidemiology, civil engineering, and compulsory government legislation.<br><br><div style="margin: 16px 0; padding: 14px 18px; background: #eff6ff; border: 1.5px solid #93c5fd; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;"><div><span style="background: #1e40af; color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.72rem; font-weight: 800; text-transform: uppercase;">Revision Gateway</span><strong style="margin-left: 8px; color: #1e3a8a; font-size: 0.95rem;">Need to revise Industrial Slum Squalor & Early Cholera?</strong></div><a href="/?view=lessons&unit=water_and_sanitation&lesson=4" target="_blank" style="padding: 7px 15px; background: #2563eb; color: white; border-radius: 6px; text-decoration: none; font-size: 0.82rem; font-weight: 700; display: inline-flex; align-items: center; gap: 6px;"><i class="fa-solid fa-arrow-up-right-from-square"></i> Open Lesson 4: Boomtown Squalor & Asiatic Cholera</a></div>',
    },
    {
      act: 2,
      title: 'Reason 1: Dr John Snow & Scientific Epidemiology (1854)',
      theme_heading: 'Reason 1: Dr John Snow & Scientific Epidemiology (1854)',
      text: '<span class="para-ref">[7.2]</span> The first breakthrough came from **Dr John Snow** during the 1854 cholera outbreak in Soho, London. Most doctors believed in **miasma**—the idea that bad smells caused disease. However, Snow noticed cholera attacked the stomach and bowels, not the lungs, proving the poison had to be swallowed in food or water.<br><br>When cholera killed over five hundred people in Soho in ten days, Snow mapped every death as a black bar on a street map (Source A). His **spot map** showed deaths clustered around the Broad Street water pump. Snow proved that workers at the local Lion Brewery drank only beer and stayed healthy, while a woman in Hampstead died after having Broad Street water delivered to her. Snow convinced the parish vestry to remove the pump handle, and the outbreak stopped. Snow proved cholera was waterborne, showing that cleaning drinking water was the real key to saving lives.<br><br><div style="margin: 16px 0; padding: 14px 18px; background: #eff6ff; border: 1.5px solid #93c5fd; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;"><div><span style="background: #1e40af; color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.72rem; font-weight: 800; text-transform: uppercase;">Revision Gateway</span><strong style="margin-left: 8px; color: #1e3a8a; font-size: 0.95rem;">Need to revise John Snow’s investigation & the Spot Map?</strong></div><a href="/?view=lessons&unit=water_and_sanitation&lesson=6" target="_blank" style="padding: 7px 15px; background: #2563eb; color: white; border-radius: 6px; text-decoration: none; font-size: 0.82rem; font-weight: 700; display: inline-flex; align-items: center; gap: 6px;"><i class="fa-solid fa-arrow-up-right-from-square"></i> Open Lesson 6: Dr John Snow & Broad Street</a></div>',
      source: {
        letter: 'A',
        title: 'Source A: Dr John Snow’s Soho Cholera Spot Map (1854)',
        image: '/images/john_snow_cholera_map.jpg',
        caption:
          'Excerpt from Dr John Snow’s landmark 1854 spot map of Soho, London. Each dark bar represents a cholera death, showing a dense cluster converging upon the Broad Street water pump.',
        source_context:
          'Published in Snow’s 1855 expanded treatise On the Mode of Communication of Cholera. Snow used cartographic data to prove that cholera was transmitted through contaminated drinking water rather than miasma. Hinge Question: Why was a visual spot map showing death clusters more effective at convincing parish leaders than theoretical medical arguments?',
        how_useful_question:
          'How useful is Source A for an enquiry into the scientific methods used by Dr John Snow to investigate cholera?',
        provenance_clues: [
          'Author: Dr John Snow, royal physician, anesthetist, and pioneering epidemiologist.',
          'Audience: The medical establishment, London parish vestries, and the General Board of Health.',
          'Motive: To provide undeniable empirical proof that cholera was water-borne, forcing the removal of the pump handle.',
        ],
        hinge_question:
          'Hinge Question: Why was a visual spot map showing death clusters more effective at convincing parish leaders than theoretical medical arguments?',
        citation: 'Wellcome Library, London • Archives of Medical Cartography (1855).',
      },
    },
    {
      act: 3,
      title: 'Reason 2: Sir Joseph Bazalgette & Civil Engineering (1858–1865)',
      theme_heading: 'Reason 2: Sir Joseph Bazalgette & Civil Engineering (1858–1865)',
      text: '<span class="para-ref">[7.3]</span> While Snow showed water caused cholera, **Sir Joseph Bazalgette** engineered the permanent solution. In the 1850s, flushing toilets emptied raw sewage into street drains that flowed into the River Thames, turning London\'s drinking river into an open sewer. In June 1858, extreme summer heat created **The Great Stink**.<br><br>MPs fled the riverbank Parliament in terror, fearing miasma would kill them. In just eighteen days, Parliament dropped laissez-faire and granted £3 million for new sewers. Chief Engineer Bazalgette built **82 miles of underground intercepting brick sewers** parallel to the Thames, using 318 million bricks and waterproof Portland cement (Source B). Massive steam pumping stations (Abbey Mills and Crossness) lifted waste to flow out to the sea. Finished in 1865, Bazalgette’s sewers permanently separated drinking water from human sewage, ending cholera in London forever.<br><br><div style="margin: 16px 0; padding: 14px 18px; background: #eff6ff; border: 1.5px solid #93c5fd; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;"><div><span style="background: #1e40af; color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.72rem; font-weight: 800; text-transform: uppercase;">Revision Gateway</span><strong style="margin-left: 8px; color: #1e3a8a; font-size: 0.95rem;">Need to revise The Great Stink & Bazalgette’s Sewers?</strong></div><a href="/?view=lessons&unit=water_and_sanitation&lesson=5" target="_blank" style="padding: 7px 15px; background: #2563eb; color: white; border-radius: 6px; text-decoration: none; font-size: 0.82rem; font-weight: 700; display: inline-flex; align-items: center; gap: 6px;"><i class="fa-solid fa-arrow-up-right-from-square"></i> Open Lesson 5: The Great Stink & Bazalgette</a></div>',
      source: {
        letter: 'B',
        title: 'Source B: Construction of London’s Intercepting Sewers (1861)',
        image: '/images/bazalgette_sewer.jpg',
        caption:
          'Sir Joseph Bazalgette inspecting the construction of London’s massive brick intercepting sewer tunnels beneath the streets of the capital, c.1861.',
        source_context:
          'Contemporary photograph showing the oval, egg-shaped brick tunnels constructed by Bazalgette. The egg shape maintained high water velocity even at low volume, preventing silt and solid waste from clogging the pipes. Hinge Question: Why was Bazalgette’s choice of newly invented waterproof Portland cement critical for the longevity of London’s sewers?',
        how_useful_question:
          'How useful is Source B for an enquiry into the engineering innovations used to solve Victorian London’s sewage crisis?',
        provenance_clues: [
          'Author: Official documentary photograph commissioned by the Metropolitan Board of Works.',
          'Audience: Victorian civil engineers, taxpayers, and municipal authorities.',
          'Motive: To record the monumental scale, structural precision, and modern technology of Bazalgette’s underground drainage works.',
        ],
        hinge_question:
          'Hinge Question: Why was Bazalgette’s choice of newly invented waterproof Portland cement critical for the longevity of London’s sewers?',
        citation:
          'Institution of Civil Engineers Archive • Bazalgette Engineering Portfolio (1861).',
      },
    },
    {
      act: 4,
      title: 'Reason 3: Louis Pasteur & The Germ Theory (1861)',
      theme_heading: 'Reason 3: Louis Pasteur & The Germ Theory (1861)',
      text: '<span class="para-ref">[7.4]</span> The third catalyst was the 1861 scientific breakthrough of French chemist **Louis Pasteur**. For centuries, doctors believed in spontaneous generation—the idea that rotting matter created disease out of nothing. This allowed doctors to ignore Snow’s water theory, because nobody could see germs.<br><br>Pasteur disproved spontaneous generation with his **swan-neck flask experiments** (Source C). Boiled broth stayed clear in curved glass flasks that trapped airborne dust; only when the neck was broken did airborne microbes enter and spoil the liquid. In 1861, Pasteur published **Germ Theory**, proving living microscopic bacteria cause decay and disease. In 1884, German scientist Robert Koch isolated the exact cholera bacterium (*Vibrio cholerae*). Germ Theory destroyed miasma forever: clean water was now proven by science to be vital to stop lethal bacteria.',
      source: {
        letter: 'C',
        title: 'Source C: Louis Pasteur’s Swan-Neck Flask Experiment (1861)',
        image: '/images/pasteur_swan_neck.jpg',
        caption:
          'Reconstruction of Louis Pasteur’s famous 1861 swan-neck flask experiment demonstrating that nutrient broth only decayed when airborne microorganisms entered the vessel.',
        source_context:
          'Pasteur’s elegant experiment disproved spontaneous generation and established the Germ Theory. By proving that living microbes caused putrefaction, Pasteur gave doctors the biological explanation for why polluted water killed patients. Hinge Question: How did Pasteur’s laboratory experiments in France help British sanitation reformers defeat the miasma theory?',
        how_useful_question:
          'How useful is Source C for an enquiry into how scientific experiments transformed Victorian medical ideas about disease?',
        provenance_clues: [
          'Author: Scientific demonstration based on Louis Pasteur’s Mémoire sur les corpuscules organisés (1861).',
          'Audience: The French Academy of Sciences and the international medical community.',
          'Motive: To definitively disprove spontaneous generation through rigorous empirical laboratory methods.',
        ],
        hinge_question:
          'Hinge Question: How did Pasteur’s laboratory experiments in France help British sanitation reformers defeat the miasma theory?',
        citation: 'Science Museum Group Collection • Pasteur Laboratory Artifacts.',
      },
    },
    {
      act: 5,
      title: 'Reason 4: Government Legislation & The 1875 Public Health Act',
      theme_heading: 'Reason 4: Government Legislation & The 1875 Public Health Act',
      text: '<span class="para-ref">[7.5]</span> Scientific discoveries and engineering marvels only succeeded nationwide when backed by compulsory law. The 1848 Public Health Act failed because it was permissive (optional); selfish ratepayers refused to spend taxes on sewers.<br><br>The turning point came in 1875 under Prime Minister Benjamin Disraeli. Armed with proof from Snow, Bazalgette, and Pasteur, Parliament passed the **1875 Public Health Act**. This law was **compulsory** ("must do"): every council had to appoint a Medical Officer of Health, provide clean piped drinking water, build covered sewers, collect household rubbish, and inspect butcher shops. The 1875 Act permanently ended laissez-faire, ensuring every town in Britain gained clean water and sanitation, causing national death rates to tumble into the twentieth century.<br><br><div style="margin: 16px 0; padding: 14px 18px; background: #eff6ff; border: 1.5px solid #93c5fd; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;"><div><span style="background: #1e40af; color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.72rem; font-weight: 800; text-transform: uppercase;">Revision Gateway</span><strong style="margin-left: 8px; color: #1e3a8a; font-size: 0.95rem;">Need to revise the 1875 Public Health Act & Laissez-Faire?</strong></div><a href="/?view=lessons&unit=water_and_sanitation&lesson=5" target="_blank" style="padding: 7px 15px; background: #2563eb; color: white; border-radius: 6px; text-decoration: none; font-size: 0.82rem; font-weight: 700; display: inline-flex; align-items: center; gap: 6px;"><i class="fa-solid fa-arrow-up-right-from-square"></i> Open Lesson 5: The 1875 Act & Modern Sanitation</a></div>',
    },
  ],

  tasks: [
    {
      id: 'ws_l7_q2_explain_why',
      type: 'extended_writing',
      topic: 'November Assessment: Explain Why [12 marks • 30 mins]',
      title: 'November Assessment: Explain Why [12 marks • 30 mins]',
      question:
        'Explain why there was rapid progress in Public Health between 1800 and 1900. [12 marks • 30 mins]',
      stimulus: [
        'Dr John Snow and the Broad Street pump investigation (1854)',
        'Joseph Bazalgette and the London intercepting sewer network (1858–1865)',
        'Louis Pasteur and the Germ Theory of disease (1861)',
        'The 1875 Public Health Act and compulsory government legislation',
      ],
      scaffolding: {
        guidance:
          'Write a structured 3-paragraph PEEL response choosing 3 of the 4 factors above, followed by a sustained evaluative conclusion. Use your 1 sheet of A4 revision notes to deploy precise facts, statistics, and dates.',
        structure_strip: [
          {
            col: '1. PARAGRAPH 1 (FACTOR 1)',
            prompt:
              'Deploy your first chosen factor (e.g. Dr John Snow & the 1854 Broad Street investigation). State your point clearly, explain the evidence (spot map, pump handle), and link directly to why it caused rapid progress [7.2].',
            starter:
              'A primary catalyst explaining why there was rapid progress in public health was Dr John Snow’s scientific breakthrough during the 1854 Soho cholera outbreak...',
          },
          {
            col: '2. PARAGRAPH 2 (FACTOR 2)',
            prompt:
              'Deploy your second chosen factor (e.g. Sir Joseph Bazalgette & the Great Stink of 1858). Detail the 82 miles of brick intercepting sewers, Portland cement, and eliminating Thames pollution [7.3].',
            starter:
              'Furthermore, a decisive engineering factor explaining why rapid progress occurred was Sir Joseph Bazalgette’s construction of London’s underground sewer network...',
          },
          {
            col: '3. PARAGRAPH 3 (FACTOR 3)',
            prompt:
              'Deploy your third chosen factor (e.g. Louis Pasteur’s Germ Theory in 1861 OR the compulsory 1875 Public Health Act). Explain how biological proof or legal force destroyed laissez-faire [7.4, 7.5].',
            starter:
              'Additionally, a fundamental reason explaining why public health advanced rapidly was the passage of the landmark 1875 Public Health Act...',
          },
          {
            col: '4. CONCLUSION / EVALUATIVE LINK',
            prompt:
              'Weigh which factor was the true master catalyst. Explain how science, engineering, and government law combined to conquer water-borne disease.',
            starter:
              'In conclusion, while John Snow identified the cause and Bazalgette built the engineering solution, the most decisive factor was...',
          },
        ],
      },
      hints: [
        'Point: State your factor clearly using the exact wording from the question stem ("A primary factor explaining why there was rapid progress in public health was...").',
        'Evidence: Include specific names, dates, and numbers: 1854, Broad Street pump, Soho spot map, 1858 Great Stink, 82 miles of sewers, 318 million bricks, 1861 Germ Theory, swan-neck flasks, 1875 Public Health Act.',
        'Explain: Explain the cause-and-effect mechanism: show HOW the factor defeated miasma or forced politicians to abandon laissez-faire.',
        'Link: Always conclude the paragraph by reinforcing how this specific factor drove rapid public health progress across the century.',
      ],
      model_answer:
        'A primary catalyst explaining why there was rapid progress in public health between 1800 and 1900 was Dr John Snow’s pioneering epidemiological investigation during the 1854 Soho cholera outbreak. For decades, the medical establishment clung to the unproven miasma theory, believing disease was inhaled from foul vapours. Snow challenged this orthodoxy by reasoning that because cholera attacked the digestive tract with violent sickness and diarrhea, the poison had to be swallowed through drinking water. When cholera killed over five hundred people in Soho in August 1854, Snow plotted each fatality on a detailed spot map, proving that deaths clustered directly around the Broad Street water pump. By discovering that brewery workers drinking beer were unharmed, Snow convinced the local vestry to remove the pump handle, causing the epidemic to collapse. This was a critical reason for rapid progress because Snow provided empirical proof that cholera was a water-borne infection, directing public health away from purifying air toward the vital necessity of securing pure drinking water.<br><br>Furthermore, a decisive technological factor explaining why rapid progress occurred was Sir Joseph Bazalgette’s construction of London’s monumental underground sewer network between 1859 and 1865. The invention of flushing water closets had accidentally transformed the River Thames into a fermenting open sewer. In the sweltering heatwave of June 1858, the resulting "Great Stink" became so unbearable that MPs in the Houses of Parliament fled river committee rooms in panic. Terrified for their own lives, Parliament abandoned its traditional laissez-faire principles and passed emergency legislation in just eighteen days to grant £3 million for London’s drainage. As Chief Engineer, Bazalgette constructed 82 miles of underground brick intercepting sewers using 318 million bricks and newly invented waterproof Portland cement. Using gravity and steam pumping stations at Crossness and Abbey Mills, Bazalgette transported 420 million gallons of sewage daily eastward past the capital, safely away from drinking intakes. This engineering triumph was a fundamental reason for progress because it permanently separated clean water from human waste, eradicating cholera epidemics from London forever.<br><br>Additionally, the decisive legal factor explaining why public health improved nationwide was the passage of the landmark 1875 Public Health Act under Prime Minister Benjamin Disraeli. Earlier legislation, such as Edwin Chadwick’s 1848 Public Health Act, had largely failed because forming health boards was permissive (optional), allowing penny-pinching ratepayers to block sanitation spending. However, following Louis Pasteur’s 1861 Germ Theory—which disproved spontaneous generation and proved living microbes caused disease—the government had scientific proof that sanitation was a biological imperative. The 1875 Act made public health compulsory: for the first time, every local council in Britain was legally forced to appoint a Medical Officer of Health, inspect market food, pave streets, and guarantee clean piped water and covered sewers to all households. This legislation was essential because it forced even the poorest rural and industrial towns to implement sanitary engineering, ending laissez-faire and ensuring that scientific breakthroughs protected every citizen.<br><br>In conclusion, while John Snow provided the scientific diagnosis and Louis Pasteur proved microbial pathology, the most decisive factor driving rapid progress was the combination of Bazalgette’s civil engineering and the 1875 Public Health Act. Without Bazalgette’s sewers, Snow’s discovery would have remained an unused theory; without the compulsory 1875 Act, modern sanitation would have remained confined to wealthy districts of London. Therefore, rapid progress occurred because parliamentary law transformed engineering and medical science into a compulsory national reality.',
    },
  ],

  quick_quiz: [
    {
      question:
        'What political philosophy ("leave alone") stopped early Victorian governments from spending taxes on sewers?',
      options: ['Laissez-faire', 'Imperialism', 'Socialism', 'Feudalism'],
      answer: 'Laissez-faire',
      explanation:
        'Laissez-faire was the belief that government should not interfere in private business or citizens’ lives.',
    },
    {
      question:
        'In what year did Dr John Snow map cholera deaths around the Broad Street pump in Soho?',
      options: ['1854', '1831', '1848', '1875'],
      answer: '1854',
      explanation: 'John Snow carried out his famous Broad Street investigation in August 1854.',
    },
    {
      question: 'What famous item did Dr John Snow persuade parish vestrymen to remove in Soho?',
      options: [
        'The Broad Street pump handle',
        'The water pipes from the river',
        'The church bells',
        'The hospital curtains',
      ],
      answer: 'The Broad Street pump handle',
      explanation:
        'Removing the iron pump handle stopped residents from drinking contaminated water.',
    },
    {
      question:
        'What historic environmental crisis in June 1858 finally terrified Parliament into funding London’s sewers?',
      options: [
        'The Great Stink',
        'The Great Fire of London',
        'The Black Death',
        'The Peasants’ Revolt',
      ],
      answer: 'The Great Stink',
      explanation:
        'The unbearable stench from the boiling Thames forced MPs to fund Bazalgette’s sewers.',
    },
    {
      question:
        'How many miles of brick intercepting sewers did Sir Joseph Bazalgette build across London?',
      options: ['82 miles', '15 miles', '300 miles', '500 miles'],
      answer: '82 miles',
      explanation:
        'Bazalgette built 82 miles of underground intercepting sewers using 318 million bricks.',
    },
    {
      question:
        'What newly invented waterproof building material did Bazalgette rigorously test for his sewer tunnels?',
      options: ['Portland cement', 'Cast iron', 'Terracotta clay', 'Lead sheeting'],
      answer: 'Portland cement',
      explanation: 'Portland cement set rock-hard underwater and resisted acidic sewage corrosion.',
    },
    {
      question:
        'Which French scientist published the revolutionary Germ Theory of Disease in 1861?',
      options: ['Louis Pasteur', 'Robert Koch', 'Edward Jenner', 'Thomas Sydenham'],
      answer: 'Louis Pasteur',
      explanation:
        'Louis Pasteur proved that microscopic living organisms caused fermentation and disease.',
    },
    {
      question:
        'What shape of glass flask did Louis Pasteur use to disprove spontaneous generation in his broth experiments?',
      options: ['Swan-neck (S-shaped) flask', 'Square bottle', 'Open beaker', 'Test tube'],
      answer: 'Swan-neck (S-shaped) flask',
      explanation:
        'The downward curve trapped dust and microbes, keeping the boiled broth sterile.',
    },
    {
      question:
        'What was the crucial legal difference between the 1848 Public Health Act and the 1875 Public Health Act?',
      options: [
        'The 1848 Act was optional ("may"), while the 1875 Act was compulsory ("must")',
        'The 1875 Act banned flushing toilets',
        'The 1848 Act only applied to Scotland',
        'The 1875 Act made all medicine free',
      ],
      answer: 'The 1848 Act was optional ("may"), while the 1875 Act was compulsory ("must")',
      explanation:
        'The 1875 Act legally forced every council in Britain to provide clean water and sewers.',
    },
    {
      question:
        'What official was every local council legally required to appoint under the 1875 Public Health Act?',
      options: [
        'Medical Officer of Health',
        'Gong Farmer',
        'Sanitary Police Officer',
        'Town Crier',
      ],
      answer: 'Medical Officer of Health',
      explanation:
        'Every district had to employ a qualified Medical Officer to inspect housing and track disease.',
    },
  ],

  flashcards: [
    {
      q: 'What does PEEL stand for in GCSE and Key Stage 3 historical writing?',
      a: 'Point (topic factor), Evidence (names, dates, facts), Explain (how it caused progress), Link (answer question stem).',
    },
    {
      q: 'How did Dr John Snow disprove the miasma theory of cholera in 1854?',
      a: 'By plotting deaths on a spot map around the Broad Street pump, proving cholera was water-borne, not airborne.',
    },
    {
      q: 'How did Joseph Bazalgette’s sewers permanently protect London from cholera?',
      a: 'Built 82 miles of brick intercepting sewers using Portland cement to divert 420 million gallons of sewage daily away from drinking water.',
    },
    {
      q: 'How did Louis Pasteur’s 1861 Germ Theory support public health reform?',
      a: 'Disproved spontaneous generation using swan-neck flasks, proving living bacteria in water cause disease.',
    },
    {
      q: 'Why was the 1875 Public Health Act the death of laissez-faire?',
      a: 'Made sanitation compulsory ("must"): forced all councils to appoint Medical Officers and provide clean water and sewers.',
    },
    {
      q: 'What are the rules for your 1 sheet of A4 revision notes in the assessment?',
      a: 'Bullet points, mind maps, statistics, and dates only. NO full continuous sentences or pre-written paragraphs allowed.',
    },
  ],

  quiz: [],
};

module.exports.quiz = module.exports.quick_quiz;
