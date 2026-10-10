/**
 * Crown, Church, or Parliament (1517–1689)
 * Key Stage 3 Year 8 • 5-Lesson Disciplinary Enquiry
 *
 * Storytelling: Christine Counsell 4-Act Framework
 * Pedagogical Architecture: Large-font (10.5pt) note-making, rotating disciplinary skills,
 * centre-fold living timeline, and back-of-booklet retrieval companion.
 *
 * Commercial Neutrality: 100% Institutional-neutral.
 */

export const unitData = {
  id: 'monarchy_religion_power',
  title: 'Crown, Church, or Parliament (1517–1689)',
  short_title: 'Crown, Church, or Parliament',
  period: '1517–1689',
  enquiry: 'Who had the right to rule Britain: King, Church, or Parliament?',
  description:
    'From the spark of the Protestant Reformation and Henry VIII’s Break with Rome to the execution of Charles I and the 1689 Bill of Rights, explore how 170 years of religious conflict, civil war, and constitutional struggle transformed Britain from an absolute monarchy into a parliamentary state.',
  cover_image: '/images/armada_portrait.jpg',
  is_ks3: true,
  year_group: 'Year 8',

  // Core Chronology for Living Timeline
  timeline: [
    {
      year: '1517',
      title: 'Martin Luther Sparks the Reformation',
      description:
        'Martin Luther nails his 95 Theses in Wittenberg, challenging Catholic papal authority and sparking Protestantism across Europe.',
      dual_coding_prompt: 'Draw a church door with a hammer and a paper notice.',
    },
    {
      year: '1534',
      title: 'Henry VIII: The Act of Supremacy',
      description:
        'Parliament declares King Henry VIII the Supreme Head of the Church of England, permanently breaking away from the Pope in Rome.',
      dual_coding_prompt: 'Draw a royal crown placed directly on top of a church cross.',
    },
    {
      year: '1559',
      title: 'Elizabeth I’s Religious Settlement',
      description:
        'Queen Elizabeth establishes the "Middle Way" to unite a divided nation, surviving Catholic assassination plots and excommunication.',
      dual_coding_prompt:
        'Draw a pair of balancing scales weighing a crucifix and an English Bible.',
    },
    {
      year: '1588',
      title: 'Defeat of the Spanish Armada',
      description:
        'Philip II’s invasion fleet is scattered by midnight fireships at Calais, pounded at Gravelines, and wrecked by fierce Atlantic gales.',
      dual_coding_prompt: 'Draw a blazing fireship drifting toward a crescent of Spanish galleons.',
    },
    {
      year: '1642',
      title: 'Outbreak of the English Civil War',
      description:
        'Charles I storms Parliament to arrest five MPs; the nation divides into Royalist Cavaliers and Parliamentary Roundheads.',
      dual_coding_prompt:
        'Draw two crossed swords separating a Cavalier feathered hat and a Roundhead iron helmet.',
    },
    {
      year: '1649',
      title: 'The Trial and Execution of Charles I',
      description:
        'Parliament puts the King on trial for treason against his own people and executes him outside Whitehall, creating a Republic.',
      dual_coding_prompt: 'Draw an executioner’s axe resting beside an empty, broken throne.',
    },
    {
      year: '1689',
      title: 'The 1689 Bill of Rights',
      description:
        'Following the Glorious Revolution, William and Mary agree to the Bill of Rights, establishing that Parliament rules Britain under law.',
      dual_coding_prompt: 'Draw a legal scroll with a wax seal locking a royal crown in place.',
    },
  ],

  // 12 Core Tier 3 Substantive Vocabulary Terms
  glossary: [
    {
      term: 'Reformation',
      definition:
        'A 16th-century religious movement that challenged the Catholic Church and created Protestant churches.',
    },
    {
      term: 'Indulgence',
      definition:
        'A certificate sold by the Catholic Church promising forgiveness of sins and less time in Purgatory.',
    },
    {
      term: 'Act of Supremacy',
      definition:
        'The 1534 law that made the English monarch the Supreme Head of the Church of England instead of the Pope.',
    },
    {
      term: 'Tudor Rollercoaster',
      definition:
        'The rapid, dizzying religious swings in England between Edward VI (radical Protestant) and Mary I (strict Catholic).',
    },
    {
      term: 'Middle Way',
      definition:
        'Elizabeth I’s 1559 compromise: a Protestant national church that retained traditional ceremonies to avoid religious rebellion.',
    },
    {
      term: 'Excommunication',
      definition:
        'Being officially cast out of the Catholic Church by the Pope, declaring a ruler to be a heretic.',
    },
    {
      term: 'Armada',
      definition:
        'A massive fleet of warships sent by Philip II of Spain in 1588 to invade England and restore Catholicism.',
    },
    {
      term: 'Divine Right of Kings',
      definition:
        'The belief that a monarch’s authority comes directly from God and that no parliament or court can question them.',
    },
    {
      term: 'Ship Money',
      definition:
        'An ancient coastal tax that Charles I illegally forced inland towns to pay during his 11-year Personal Rule.',
    },
    {
      term: 'New Model Army',
      definition:
        'Oliver Cromwell’s disciplined, professional Parliamentary army, promoted by military ability rather than aristocratic birth.',
    },
    {
      term: 'Regicide',
      definition:
        'The deliberate execution or murder of a reigning monarch (such as King Charles I in January 1649).',
    },
    {
      term: 'Bill of Rights',
      definition:
        'The 1689 constitutional law guaranteeing that monarchs cannot suspend laws, levy taxes, or keep an army without Parliament.',
    },
  ],

  // Knowledge Companion 25-Question Retrieval Bank (5 per lesson)
  quizzing_pack: {
    title: 'Knowledge Retrieval Companion: 25 Core Retrieval Drill Questions',
    description:
      'Use these questions for lesson Do Nows, homework practice, and self-testing. Mark using the Answer Key at the back.',
    scoreboard: [
      {
        range: '22–25',
        badge: 'Master of the King’s Council',
        desc: 'Exemplary historical recall across the entire 170-year constitutional arc.',
      },
      {
        range: '17–21',
        badge: 'Parliamentary Champion',
        desc: 'Secure core knowledge; review the missed questions using green pen.',
      },
      {
        range: '0–16',
        badge: 'Locked in the Tower of London',
        desc: 'Targeted DIRT revision required: re-read the Act narrative summaries.',
      },
    ],
    sections: [
      {
        lesson_id: 'lesson_1',
        title: 'Lesson 1 Retrieval: The Reformation & The Break with Rome',
        questions: [
          {
            id: 'q1',
            q: 'In what year did Martin Luther nail his 95 Theses in Wittenberg?',
            a: '1517',
          },
          {
            id: 'q2',
            q: 'What corrupt Catholic certificates did Martin Luther attack for promising forgiveness for money?',
            a: 'Indulgences',
          },
          {
            id: 'q3',
            q: 'Which wife of Henry VIII failed to produce a surviving male heir, leading to his "Great Matter"?',
            a: 'Catherine of Aragon',
          },
          {
            id: 'q4',
            q: 'What 1534 law made Henry VIII the Supreme Head of the Church of England?',
            a: 'The Act of Supremacy',
          },
          {
            id: 'q5',
            q: 'What religious institutions did Henry VIII close and loot between 1536 and 1540 to gain land and wealth?',
            a: 'Monasteries (abbeys/priories)',
          },
        ],
      },
      {
        lesson_id: 'lesson_2',
        title: 'Lesson 2 Retrieval: Elizabeth I & The Divided Realm',
        questions: [
          {
            id: 'q6',
            q: 'Which radical Protestant boy-king stripped altars and smashed church statues between 1547 and 1553?',
            a: 'Edward VI',
          },
          {
            id: 'q7',
            q: 'How many Protestants did Mary I burn at the stake, earning her the nickname "Bloody Mary"?',
            a: 'Nearly 300 (around 284)',
          },
          {
            id: 'q8',
            q: 'What was the nickname given to Elizabeth I’s 1559 compromise religious settlement?',
            a: 'The "Middle Way"',
          },
          {
            id: 'q9',
            q: 'What action did Pope Pius V take against Elizabeth I in 1570, declaring her an unlawful ruler?',
            a: 'Excommunication (Papal Bull)',
          },
          {
            id: 'q10',
            q: 'Which Catholic cousin of Elizabeth became the figurehead of plots to assassinate her, leading to her execution in 1587?',
            a: 'Mary Queen of Scots',
          },
        ],
      },
      {
        lesson_id: 'lesson_3',
        title: 'Lesson 3 Retrieval: Elizabeth I & The Spanish Armada',
        questions: [
          {
            id: 'q11',
            q: 'Which Catholic King of Spain launched the Armada against England in 1588?',
            a: 'King Philip II',
          },
          {
            id: 'q12',
            q: 'Which famous English privateer raided Spanish treasure ships and "singed the King of Spain’s beard" at Cadiz?',
            a: 'Sir Francis Drake',
          },
          {
            id: 'q13',
            q: 'In what defensive naval formation did the 130 Spanish ships sail up the English Channel?',
            a: 'A crescent formation',
          },
          {
            id: 'q14',
            q: 'What weapon did the English use at midnight at Calais to scatter the anchored Spanish fleet in terror?',
            a: 'Fireships (hell-burners)',
          },
          {
            id: 'q15',
            q: 'What natural event wrecked dozens of Spanish galleons off the coasts of Scotland and Ireland?',
            a: 'A fierce storm (the "Protestant Wind")',
          },
        ],
      },
      {
        lesson_id: 'lesson_4',
        title: 'Lesson 4 Retrieval: Civil War, Regicide & The Bill of Rights',
        questions: [
          {
            id: 'q16',
            q: 'What belief held that kings were appointed by God and could not be questioned by Parliament?',
            a: 'The Divine Right of Kings',
          },
          {
            id: 'q17',
            q: 'What illegal coastal tax did Charles I force inland towns to pay during his 11 Years’ Tyranny?',
            a: 'Ship Money',
          },
          {
            id: 'q18',
            q: 'What was Oliver Cromwell’s professional, disciplined Parliamentary army called?',
            a: 'The New Model Army',
          },
          {
            id: 'q19',
            q: 'On what date was King Charles I publicly beheaded outside the Banqueting House in Whitehall?',
            a: '30 January 1649',
          },
          {
            id: 'q20',
            q: 'What famous constitutional document did William and Mary sign in 1689 to make Parliament supreme?',
            a: 'The Bill of Rights',
          },
        ],
      },
      {
        lesson_id: 'lesson_5',
        title: 'Lesson 5 Retrieval: Synoptic Change & Continuity (1517–1689)',
        questions: [
          {
            id: 'q21',
            q: 'In 1517, to which foreign religious leader did the King and Church of England answer?',
            a: 'The Pope in Rome',
          },
          {
            id: 'q22',
            q: 'By 1689, which institution had the legal authority to approve taxes and create laws in Britain?',
            a: 'Parliament',
          },
          {
            id: 'q23',
            q: 'What radical group of poor peasants attempted to farm common land for all people on St George’s Hill in 1649?',
            a: 'The Diggers',
          },
          {
            id: 'q24',
            q: 'Did the legal rights and everyday lives of poor agricultural labourers and women change significantly between 1517 and 1689?',
            a: 'No (minimal change / great continuity)',
          },
          {
            id: 'q25',
            q: 'What 1689 law allowed non-conformist Protestants to worship freely, while still keeping restrictions on Catholics?',
            a: 'The Toleration Act',
          },
        ],
      },
    ],
  },

  // The 5 Core Lessons
  lessons: [
    // ------------------------------------------------------------------------
    // LESSON 1: The Reformation & The Break with Rome
    // ------------------------------------------------------------------------
    {
      id: 'lesson_1',
      title: 'The Reformation & The Break with Rome (1517–1547)',
      enquiry: 'Why did a German monk and an English King tear the Catholic Church apart?',
      subtitle: 'From Martin Luther’s Hammer to Henry VIII’s Crowned Supremacy',
      skill: 'Causation & Motivation',
      banner: {
        image: '/images/henry_viii.jpg',
        caption:
          'King Henry VIII: from papal "Defender of the Faith" to supreme head of his own national church.',
      },
      margin_spine: [
        { year: '1517', label: 'Luther’s Hammer' },
        { year: '1527', label: 'Royal Desperation' },
        { year: '1534', label: 'Firing the Pope' },
        { year: '1536', label: 'Monastery Gold' },
      ],
      did_you_know:
        'Young Henry VIII was an athletic, vain prince who wrote love letters and bad poetry to Anne Boleyn. Terrified of bad smells and the sweating sickness, he carried a hollow pomander ball filled with perfumed spices everywhere, and wore custom-padded shoes wider than they were long to look colossal!',

      // Do Now: Prior KS3 Medieval Church & Feudal Foundations
      do_now: {
        type: 'questions',
        items: [
          {
            question:
              'In medieval Catholic Europe, what wall painting inside churches warned illiterate peasants about the horrors of Hell and the Last Judgment?',
            answer: 'A Doom painting.',
          },
          {
            question:
              'In what language were church services, prayers, and the Bible spoken across Western Europe before the 1500s?',
            answer: 'Latin.',
          },
          {
            question:
              'Who was the supreme spiritual ruler of the Western Christian Church, based in Rome?',
            answer: 'The Pope.',
          },
          {
            question:
              'What 10% annual religious tax was every medieval farming family required to pay to the Church from their crops and livestock?',
            answer: 'The tithe.',
          },
          {
            question:
              'Under the medieval feudal hierarchy, from whom did European monarchs claim they received their ultimate right to rule?',
            answer: 'God Almighty (Divine right/favour).',
          },
        ],
      },

      // Tier 2 & Tier 3 Substantive Vocabulary
      vocabulary: [
        {
          term: 'Reformation',
          definition:
            'A 16th-century religious movement that challenged papal Catholic authority and created Protestant churches.',
          phonetic: 'ref-er-MAY-shun',
          syllables: 'Ref-or-ma-tion',
          tier: '3',
        },
        {
          term: 'Indulgence',
          definition:
            'A certificate sold by Catholic officials promising forgiveness of sins and reduced time in Purgatory.',
          phonetic: 'in-DUL-jens',
          syllables: 'In-dul-gence',
          tier: '3',
        },
        {
          term: 'Supremacy',
          definition:
            'The state of holding ultimate, unquestioned legal and religious authority in a kingdom.',
          phonetic: 'soo-PREM-uh-see',
          syllables: 'Su-prem-a-cy',
          tier: '3',
        },
        {
          term: 'Annulment',
          definition:
            'A legal or religious declaration that a marriage was invalid from the beginning and never truly existed.',
          phonetic: 'uh-NUL-munt',
          syllables: 'An-nul-ment',
          tier: '2',
        },
        {
          term: 'Dissolution',
          definition:
            'The official dismantling, closure, and confiscation of Catholic monasteries and abbeys by Henry VIII.',
          phonetic: 'dis-uh-LOO-shun',
          syllables: 'Dis-so-lu-tion',
          tier: '3',
        },
        {
          term: 'Heresy',
          definition:
            'Holding beliefs that contradicted the official teachings of the established Church, punishable by death.',
          phonetic: 'HAIR-uh-see',
          syllables: 'Her-e-sy',
          tier: '3',
        },
      ],

      // Academic Historical Narrative: Christine Counsell 4-Act Storytelling
      narrative_blocks: [
        {
          act: 1,
          title: 'Act I: The Spark at Wittenberg (1517)',
          text: '<span class="para-ref">[1.1]</span> In October 1517, a furious German monk named Martin Luther stormed up to the castle church in Wittenberg and nailed 95 fiery arguments to the oak door. Luther was disgusted by corrupt Catholic friars selling "indulgences"—printed certificates promising wealthy sinners less time suffering in Purgatory for cash. Thanks to the newly invented printing press, Luther’s ideas swept Europe like wildfire. He declared that ordinary people did not need priests or Latin rituals to reach God: faith and the Bible in their own language were enough. A great religious rebellion had begun: the Protestant Reformation.',
        },
        {
          act: 2,
          title: 'Act II: The King’s "Great Matter" (1527)',
          text: '<span class="para-ref">[1.2]</span> Across the English Channel, King Henry VIII initially despised Luther, writing a book defending the Pope that earned him the title <em>Defender of the Faith</em>. But by 1527, Henry faced a dynastic nightmare. His Spanish wife, Catherine of Aragon, was past forty and had produced only one living child: a girl, Princess Mary. Convinced England would collapse into bloody civil war without a male heir, Henry fell desperately in love with the clever, ambitious Anne Boleyn. He begged Pope Clement VII to annul his marriage, claiming it was cursed by God.',
        },
        {
          act: 3,
          title: 'Act III: Firing the Pope: The Act of Supremacy (1534)',
          text: '<span class="para-ref">[1.3]</span> The Pope was trapped. Rome was occupied by Catherine’s powerful nephew, the Holy Roman Emperor, so the Pope stalled for seven agonising years. Henry’s patience snapped. Guided by his ruthless advisor Thomas Cromwell, Henry decided that if the Pope would not give him a divorce, he would simply fire the Pope! In 1534, Henry forced Parliament to pass the historic <strong>Act of Supremacy</strong>. It declared King Henry VIII the sole "Supreme Head" of the Church of England. Refusing to swear an oath accepting Henry’s royal supremacy was high treason; his former friend Sir Thomas More was promptly beheaded.',
        },
        {
          act: 4,
          title: 'Act IV: Stripping the Monasteries (1536–1540)',
          text: '<span class="para-ref">[1.4]</span> Royal power was sweet, but monastery gold was sweeter. Between 1536 and 1540, Henry and Cromwell sent commissioners to inspect over 800 Catholic monasteries and abbeys across England. Accusing the monks of laziness and corruption, Henry closed them down, melted lead from their roofs, smashed precious shrines, and seized their vast estates. Henry sold the land to loyal nobles and spent the fortune on warships and French wars. England was no longer Catholic: religion now belonged completely to the Crown.',
        },
      ],

      act_questions: [
        {
          act: 1,
          q: 'Why did Martin Luther’s 95 Theses threaten the power and wealth of the Catholic Church?',
        },
        {
          act: 2,
          q: 'Why was Henry VIII so desperate to annul his marriage to Catherine of Aragon?',
        },
        {
          act: 3,
          q: 'How did the 1534 Act of Supremacy fundamentally change who controlled England?',
        },
        {
          act: 4,
          q: 'What did Henry VIII gain by closing down over 800 monasteries across England?',
        },
      ],

      // Collapsible Visual Sources with Universal "How Useful" Questions & Provenance Scaffolding
      sources: [
        {
          title: 'Source A: Lucas Cranach the Elder, Portrait of Martin Luther (1529)',
          image: '/images/martin_luther_portrait.jpg',
          caption:
            'Lucas Cranach the Elder’s official portrait of Martin Luther, depicted in an academic scholar’s gown holding the vernacular German Bible that challenged the Latin monopoly of Catholic priests.',
          source_context:
            'In October 1517, Martin Luther sparked the Protestant Reformation by nailing his 95 Theses in Wittenberg. By translating the Bible into everyday German, he argued that ordinary Christians could read the Word of God directly without needing priests or indulgences.',
          how_useful_question:
            'How useful is Source A for an enquiry into how Protestant reformers presented Martin Luther to ordinary Christians across Europe?',
          provenance_clues: [
            'Author: Lucas Cranach the Elder, a close friend and political ally of Martin Luther who ran a major printmaking workshop in Wittenberg.',
            'Audience: German townsfolk, scholars, and sympathetic princes deciding whether to break away from papal Catholic authority.',
            'Motive: To portray Luther not as a dangerous rebel or heretic, but as a courageous, dignified, and pious scholar guided solely by Holy Scripture.',
          ],
          hinge_question:
            'Hinge Question: Does Cranach present Luther as a dangerous rebel tearing the Church apart, or as a holy scholar restoring the pure word of God?',
          citation: 'Lucas Cranach Workshop • Germanisches Nationalmuseum, Nuremberg.',
        },
        {
          title:
            'Source B: Hans Holbein the Younger, Whitehall Mural Portrait of King Henry VIII (c. 1537)',
          image: '/images/henry_viii.jpg',
          caption:
            'Hans Holbein’s colossal full-length Whitehall mural portrait of Henry VIII: feet planted wide, broad shoulders, adorned with cloth of gold and pearls, gripping his dagger.',
          source_context:
            'Commissioned shortly after the 1534 Act of Supremacy made Henry the Supreme Head of the Church of England and following the execution of Sir Thomas More, this painting hung in the Privy Chamber of Whitehall Palace.',
          how_useful_question:
            'How useful is Source B for an enquiry into how Henry VIII projected supreme royal authority after breaking with the Pope?',
          provenance_clues: [
            'Author: Hans Holbein the Younger, King’s Painter on the royal payroll employed specifically to project Tudor royal power.',
            'Audience: Visiting foreign ambassadors, English nobles, and courtiers entering the King’s private audience chamber.',
            'Motive: To intimidate domestic rivals and foreign Catholic princes by projecting overwhelming masculine power, immense wealth, and unshakeable royal sovereignty.',
          ],
          hinge_question:
            'Hinge Question: Why did Holbein paint Henry VIII standing colossal and gripping a dagger rather than kneeling humbly in prayer like medieval Catholic kings?',
          citation: 'Hans Holbein the Younger • Royal Collection / Walker Art Gallery, Liverpool.',
        },
      ],

      // End-of-Narrative Extended Disciplinary Writing Task
      tasks: [
        {
          type: 'extended_writing',
          topic: 'Disciplinary Enquiry Task: Causation & Motivation [8 Marks]',
          question:
            'Explain why King Henry VIII broke with Rome in 1534. Evaluate which motive was decisive: his dynastic need for a male heir, financial greed for church wealth, or craving for absolute royal power.',
          hints: [
            'Point: State your central thesis: evaluate whether dynastic panic, financial greed, or royal power was the primary spark.',
            'Evidence: Deploy specific factual evidence: Catherine of Aragon, Anne Boleyn, the 1534 Act of Supremacy, and the Dissolution of 800 Monasteries (1536–1540).',
            'Explanation: Explain how these factors interacted: show how Henry used Protestant legal ideas purely to serve his political and dynastic needs.',
            'Link: Conclude decisively: explain why one factor was the non-negotiable catalyst that drove the Break with Rome.',
          ],
          model_answer:
            'King Henry VIII’s Break with Rome in 1534 was driven by three interconnected motives, but his dynastic desperation for a legitimate male heir was the decisive catalyst. Initially, Henry was a staunch orthodox Catholic who defended the Pope against Martin Luther, earning the papal title Defender of the Faith. However, by 1527 Catherine of Aragon had failed to produce a male heir, leaving only Princess Mary. Henry was terrified that without a male successor, England would plunge into a catastrophic civil war akin to the Wars of the Roses. When Pope Clement VII refused to annul the marriage, Henry used Parliament to pass the Act of Supremacy (1534), declaring himself Supreme Head of the Church of England. While the subsequent Dissolution of the Monasteries (1536–1540) satisfied Henry’s financial greed and funded his coastal fortresses, this financial seizure was an opportunistic consequence rather than the initial spark. Ultimately, Henry broke with Rome because dynastic survival demanded a male heir with Anne Boleyn, forcing him to seize absolute sovereign power from the Pope.',
        },
      ],

      // Backwards Compatibility for Print Workbooks
      right_page_task: {
        skill_title: 'Disciplinary Skill: Causation & Motivation',
        instructions:
          'Historians debate why Henry VIII broke with Rome. Was it driven by personal lust for Anne Boleyn, greed for monastery gold, or an obsession with royal power? Examine the evidence and weigh the causes.',
        visual_source: {
          image: '/images/martin_luther_portrait.jpg',
          title: 'Source A: Lucas Cranach, Portrait of Martin Luther (1529)',
          caption:
            'Lucas Cranach the Elder’s portrait of Martin Luther, holding the vernacular German Bible that challenged papal monopoly on Scripture.',
          question:
            'How does Source A portray Martin Luther: as an arrogant rebel or a pious scholar guided by Scripture?',
        },
        written_task_prompt:
          'Evaluate the three main motives behind Henry VIII’s Break with Rome: (1) Dynastic need for a male heir, (2) Financial greed for church wealth, (3) Craving for absolute royal power. Which motive was decisive?',
      },

      // Plenary Retrieval Quiz: 8 Multiple-Choice Retrieval Questions
      quiz: [
        {
          question:
            'In what year did Martin Luther nail his 95 Theses to the church door in Wittenberg?',
          options: ['1588', '1534', '1517', '1559'],
          answer: 2,
          explanation:
            'Martin Luther nailed his 95 Theses in October 1517, sparking the Protestant Reformation.',
        },
        {
          question:
            'What corrupt Catholic certificates did Martin Luther attack for promising forgiveness of sins for cash?',
          options: ['Indulgences', 'Papal Bulls', 'Tithes', 'Excommunications'],
          answer: 0,
          explanation:
            'Indulgences were sold by Catholic friars promising wealthy sinners less time suffering in Purgatory.',
        },
        {
          question:
            'What title did Pope Leo X award Henry VIII in 1521 for defending Catholic sacraments against Luther?',
          options: [
            'Most Christian King',
            'Supreme Head',
            'Lord Protector',
            'Defender of the Faith',
          ],
          answer: 3,
          explanation:
            'Henry wrote Assertio Septem Sacramentorum, earning him the title Defender of the Faith (Fidei Defensor).',
        },
        {
          question:
            'Which Spanish queen failed to give Henry VIII a surviving male heir, triggering his "Great Matter"?',
          options: ['Mary Tudor', 'Catherine of Aragon', 'Jane Seymour', 'Anne Boleyn'],
          answer: 1,
          explanation:
            'Catherine of Aragon produced only one surviving child (Princess Mary), prompting Henry to seek an annulment.',
        },
        {
          question:
            'What 1534 law officially made King Henry VIII the Supreme Head of the Church of England?',
          options: [
            'The Act of Supremacy',
            'The Toleration Act',
            'The Bill of Rights',
            'The Act of Uniformity',
          ],
          answer: 0,
          explanation:
            'The 1534 Act of Supremacy severed England from the Pope and established royal supremacy over the Church.',
        },
        {
          question:
            'Who served as Henry VIII’s ruthless chief advisor, organising the Break with Rome and the monastery closures?',
          options: ['Sir Francis Drake', 'Oliver Cromwell', 'Thomas Cromwell', 'Cardinal Wolsey'],
          answer: 2,
          explanation:
            'Thomas Cromwell engineered parliamentary statutes that broke with Rome and seized monastic wealth.',
        },
        {
          question:
            'Between 1536 and 1540, what wealthy religious institutions did Henry VIII dissolve and loot across England?',
          options: ['Parish churches', 'Universities', 'Cathedrals', 'Monasteries and abbeys'],
          answer: 3,
          explanation:
            'Henry dissolved over 800 monasteries, confiscating their lands, precious jewels, and roof lead.',
        },
        {
          question:
            'Which former Lord Chancellor and friend of Henry VIII was beheaded in 1535 for refusing to accept royal supremacy?',
          options: ['Thomas Cranmer', 'Sir Thomas More', 'Lucas Cranach', 'John Calvin'],
          answer: 1,
          explanation:
            'Sir Thomas More refused to swear the Oath of Supremacy on Catholic conscience and was executed for treason.',
        },
      ],

      teacher_notes: {
        primer:
          'This lesson establishes the fundamental earthquake of early modern English history. Ensure Year 8 pupils understand that Henry VIII was not a Protestant theologian like Luther; he broke with Rome for dynastic survival, money, and absolute power, while keeping Church of England doctrines largely Catholic until his death.',
        objectives: [
          {
            objective:
              'Explain the core grievances Martin Luther raised against the Catholic Church in 1517.',
            primer:
              'Focus on Act I. Emphasise that indulgences were seen as commercial fraud by reformers.',
            question:
              'Hinge Question: Why did the invention of the printing press make Martin Luther far more dangerous to the Pope than any medieval critic before him?',
          },
          {
            objective:
              'Analyse the interplay between personal desires, dynastic fears, and political power in Henry VIII’s Break with Rome.',
            primer:
              'Guide pupils through Acts II and III. Highlight that Henry used Parliament to pass the Act of Supremacy, cementing Parliament’s role in religious law.',
            question:
              'Hinge Question: Did Henry VIII break with Rome because he believed in Protestant ideas, or because he wanted absolute control over his own kingdom?',
          },
        ],
      },
    },

    // ------------------------------------------------------------------------
    // LESSON 2: Elizabeth I: A Divided Realm & The "Middle Way"
    // ------------------------------------------------------------------------
    {
      id: 'lesson_2',
      title: 'Elizabeth I: A Divided Realm & The "Middle Way" (1547–1587)',
      enquiry: 'Could a young queen heal a divided kingdom without losing her throne?',
      subtitle: 'From the Tudor Rollercoaster to Catholic Plots & Royal Propaganda',
      skill: 'Source Utility & Royal Propaganda',
      banner: {
        image: '/images/elizabeth_coronation_portrait.jpg',
        caption:
          'Queen Elizabeth I in her coronation robes: a 25-year-old woman inheriting a violently divided realm.',
      },
      margin_spine: [
        { year: '1547', label: 'Smashed Statues (Edward)' },
        { year: '1553', label: 'Smithfield Fires (Mary)' },
        { year: '1559', label: 'The "Middle Way"' },
        { year: '1570', label: 'Papal Death Mark' },
      ],
      did_you_know:
        'Queen Elizabeth I loved candied violets and sugar comfits so passionately that her teeth turned completely black from rot. Foreign ambassadors noted that they could barely understand her speech, yet wealthy Tudor courtiers blackened their own teeth with charcoal just to copy the Queen’s aristocratic look!',

      // Do Now: Strict Cyclical Recall of Lesson 1
      do_now: {
        type: 'questions',
        items: [
          {
            question:
              'In what year did Martin Luther nail his 95 Theses to the castle church door in Wittenberg?',
            answer: '1517.',
          },
          {
            question:
              'What corrupt Catholic certificates did Martin Luther attack for promising to cancel time in Purgatory for cash?',
            answer: 'Indulgences.',
          },
          {
            question:
              'What was Henry VIII’s desperate dynastic reason for seeking an annulment from Catherine of Aragon?',
            answer: 'She could not produce a surviving male heir (only Princess Mary survived).',
          },
          {
            question:
              'What landmark 1534 law made the English monarch the Supreme Head of the Church of England instead of the Pope?',
            answer: 'The Act of Supremacy.',
          },
          {
            question:
              'What wealthy religious institutions did Henry VIII and Thomas Cromwell shut down and plunder between 1536 and 1540?',
            answer: 'Monasteries (or abbeys / priories).',
          },
        ],
      },

      // Tier 2 & Tier 3 Substantive Vocabulary
      vocabulary: [
        {
          term: 'Middle Way',
          definition:
            'Elizabeth I’s 1559 compromise establishing a Protestant national church that retained traditional Catholic ceremonies.',
          phonetic: 'MID-ul way',
          syllables: 'Mid-dle Way',
          tier: '3',
        },
        {
          term: 'Compromise',
          definition:
            'An agreement in which each side gives up some demands in order to reach peace and prevent violent conflict.',
          phonetic: 'KOM-pruh-myz',
          syllables: 'Com-pro-mise',
          tier: '2',
        },
        {
          term: 'Excommunication',
          definition:
            'Being officially expelled from the Catholic Church by a papal decree, marking a ruler as an unlawful heretic.',
          phonetic: 'eks-kuh-myoo-nih-KAY-shun',
          syllables: 'Ex-com-mu-ni-ca-tion',
          tier: '3',
        },
        {
          term: 'Supreme Governor',
          definition:
            'The compromise religious title chosen by Elizabeth I in 1559 to satisfy Catholics and Puritans who opposed a female head.',
          phonetic: 'soo-PREEM GUV-er-ner',
          syllables: 'Su-preme Gov-er-nor',
          tier: '3',
        },
        {
          term: 'Treason',
          definition:
            'The crime of betraying one’s country or attempting to overthrow, kill, or usurp the monarch.',
          phonetic: 'TREE-zun',
          syllables: 'Trea-son',
          tier: '2',
        },
        {
          term: 'Martyr',
          definition:
            'A person who chooses to suffer persecution or death rather than renounce their religious beliefs.',
          phonetic: 'MAHR-ter',
          syllables: 'Mar-tyr',
          tier: '3',
        },
      ],

      // Academic Historical Narrative: Christine Counsell 4-Act Storytelling
      narrative_blocks: [
        {
          act: 1,
          title: 'Act I: The Tudor Rollercoaster (1547–1558)',
          text: '<span class="para-ref">[2.1]</span> When Henry VIII died in 1547, England plunged into religious whiplash. First, his sickly nine-year-old son, Edward VI, instituted radical Protestantism: whitewashing colourful church walls, smashing stained glass, and forcing everyone to use an English prayer book. But Edward died at fifteen, and his Catholic half-sister Mary I seized the throne. Furious at her father’s rebellion, "Bloody Mary" dragged England back to the Pope, burning nearly 300 Protestant "heretics" alive at the stake at Smithfield. When Mary died in 1558, England was traumatised, paranoid, and bitterly divided.',
        },
        {
          act: 2,
          title: 'Act II: A Young Queen Inherits a Crisis (1558)',
          text: '<span class="para-ref">[2.2]</span> Into this hornets’ nest stepped twenty-five-year-old Elizabeth Tudor. Her situation seemed impossible. In sixteenth-century Europe, people believed women were too weak and emotional to rule alone. England was deeply in debt, at war with France, and Catholic kings in Spain and France viewed Elizabeth as an illegitimate bastard who had no right to wear the crown. English MPs badgered her constantly to marry a strong man to rule for her, but Elizabeth shrewdly refused to give away her power.',
        },
        {
          act: 3,
          title: 'Act III: The "Middle Way" Religious Settlement (1559)',
          text: '<span class="para-ref">[2.3]</span> Elizabeth knew that if she chose extreme Protestantism, English Catholics would rebel; if she chose Catholicism, Protestants would riot. Her genius answer was the 1559 <strong>Religious Settlement</strong>—often called the "Middle Way". The Church of England was officially Protestant: services and Bibles were in English, and Elizabeth was Supreme Governor. But she allowed crucifixes, stained glass, and fancy priestly robes to remain. Elizabeth famously declared that she had <em>"no desire to make windows into men’s souls"</em>: as long as people attended church quietly on Sunday, she did not care what they privately believed.',
        },
        {
          act: 4,
          title: 'Act IV: Assassination Plots & The Papal Death Mark (1570–1587)',
          text: '<span class="para-ref">[2.4]</span> Compromise did not satisfy religious extremists. Strict Protestants (Puritans) demanded all "popish" decorations be destroyed. Worse, in 1570, Pope Pius V issued a papal bull excommunicating Elizabeth, declaring her a heretic and telling English Catholics it was their holy duty to depose her! Catholic plotters launched conspiracy after conspiracy (Ridolfi, Throckmorton, Babington) to assassinate Elizabeth and place her Catholic cousin, <strong>Mary Queen of Scots</strong>, on the throne. Elizabeth’s spy master Sir Francis Walsingham cracked their secret coded letters. In February 1587, Elizabeth signed Mary’s death warrant; Mary was beheaded at Fotheringhay Castle.',
        },
      ],

      act_questions: [
        {
          act: 1,
          q: 'Why was the period between 1547 and 1558 described as a "Tudor Rollercoaster"?',
        },
        {
          act: 2,
          q: 'What three major problems threatened Elizabeth I when she became queen in 1558?',
        },
        {
          act: 3,
          q: 'How was Elizabeth’s 1559 "Middle Way" designed to keep peace between Protestants and Catholics?',
        },
        {
          act: 4,
          q: 'Why did the Pope’s 1570 excommunication turn Mary Queen of Scots into a deadly threat to Elizabeth?',
        },
      ],

      // Collapsible Visual Sources with Universal "How Useful" Questions & Provenance Scaffolding
      sources: [
        {
          title: 'Source A: Official Coronation Portrait of Queen Elizabeth I (1559)',
          image: '/images/elizabeth_coronation_portrait.jpg',
          caption:
            'Queen Elizabeth I in her coronation robes of patterned gold silk, holding the royal orb and sceptre, crowned with the imperial crown.',
          source_context:
            'Elizabeth inherited the throne in 1558 following the violent swings of the Tudor Rollercoaster. Men widely believed a woman was incapable of ruling alone; Elizabeth used this portrait to demonstrate divine majesty and dynastic legitimacy.',
          how_useful_question:
            'How useful is Source A for an enquiry into how Elizabeth I projected power and legitimacy at the start of her reign?',
          provenance_clues: [
            'Author: Anonymous court painter commissioned by Elizabeth’s Privy Council to produce an official state portrait.',
            'Audience: English nobility, members of Parliament, and foreign ambassadors assessing the young queen’s ability to hold the realm.',
            'Motive: To prove that Elizabeth was God’s anointed sovereign, possessing the full majesty of an imperial ruler without needing a husband.',
          ],
          hinge_question:
            'Hinge Question: How do the orb and sceptre in Elizabeth’s hands serve as visual arguments against courtiers who claimed a woman could not govern?',
          citation: 'National Portrait Gallery, London (NPG 2632).',
        },
        {
          title:
            'Source B: Historical Record and Portrait of Queen Mary I & The Marian Persecutions (1553–1558)',
          image: '/images/queen_mary_i_mary_tudor.jpg',
          caption:
            'Queen Mary I ("Bloody Mary"), whose violent restoration of Roman Catholicism and burning of nearly 300 Protestants at Smithfield convinced Elizabeth to seek a moderate settlement.',
          source_context:
            'Mary I’s brutal persecutions traumatised the nation. When Elizabeth took power in 1558, Protestant writers like John Foxe published horrific accounts of the burnings, transforming English public opinion permanently against Catholic papal rule.',
          how_useful_question:
            'How useful is Source B for an enquiry into why Elizabeth I chose a compromise "Middle Way" rather than enforcing extreme religious policy?',
          provenance_clues: [
            'Author: Contemporary Elizabethan historical record documenting the Smithfield executions under Mary I.',
            'Audience: The English Protestant public and Elizabeth’s new government looking to stabilise the nation.',
            'Motive: To warn the country never to return to Catholic papal rule and explain why religious balance was essential for national survival.',
          ],
          hinge_question:
            'Hinge Question: Why did the burning of Protestants under Mary I make it politically impossible for Elizabeth to keep England Catholic?',
          citation: 'National Portrait Gallery, London / John Foxe Acts and Monuments Archive.',
        },
      ],

      // End-of-Narrative Extended Disciplinary Writing Task
      tasks: [
        {
          type: 'source_utility',
          topic: 'Disciplinary Enquiry Task: Source Utility & Royal Propaganda [8 Marks]',
          question:
            'How useful are Sources A and B for an enquiry into how Queen Elizabeth I maintained royal authority and managed religious division?',
          source_a: {
            title: 'Source A: Official Coronation Portrait (1559)',
            shelfmark: 'NPG 2632 • COURT PORTRAITURE',
            image: '/images/elizabeth_coronation_portrait.jpg',
            text: 'Elizabeth I crowned in gold cloth, holding the orb and sceptre with her hair loose, indicating her virgin purity and unmarried status as bride of the realm.',
            provenance: 'Official Court Painter commissioned by the Privy Council, 1559.',
            clue: 'Focus on how the orb, sceptre, and crown project divine authority and sovereign power despite her gender.',
          },
          source_b: {
            title: 'Source B: Record of Mary I & Marian Burnings (1553–1558)',
            shelfmark: 'TUDOR ARCHIVE • MARIAN EXECUTIONS',
            image: '/images/queen_mary_i_mary_tudor.jpg',
            text: 'Nearly 300 Protestants, including Archbishop Thomas Cranmer and Bishops Latimer and Ridley, were burned at the stake for heresy under Mary I.',
            provenance:
              'Elizabethan historical compilation on the religious persecutions, c. 1563.',
            clue: 'Focus on why Mary’s extreme religious violence forced Elizabeth to adopt a moderate Middle Way to avoid civil war.',
          },
          matrix: [
            {
              col: '1. SOURCE A: ROYAL IMAGE',
              text: 'Analyse how Elizabeth used imperial symbols (orb, sceptre) to prove a female monarch had divine right to rule.',
            },
            {
              col: '2. SOURCE B: RELIGIOUS TRAUMA',
              text: 'Evaluate how memories of Mary’s Smithfield fires explained Elizabeth’s pragmatic compromise ("Middle Way").',
            },
            {
              col: '3. COMPARATIVE VERDICT',
              text: 'Reach a reasoned judgment on which source is more valuable for understanding Elizabeth’s political survival.',
            },
          ],
          connectives: [
            'Source A is particularly valuable because it reveals...',
            'However, Source A’s utility is shaped by its purpose as court propaganda...',
            'In contrast, Source B provides vital context explaining why...',
            'Cross-referencing both sources demonstrates that...',
            'On balance, Source A/B is more useful for understanding...',
          ],
          model_answer:
            'Both sources are highly useful for investigating how Elizabeth I maintained royal authority. Source A is valuable because it shows official court propaganda designed to legitimise Elizabeth’s accession in 1559. By depicting her with the imperial crown, orb, and sceptre, the artist deliberately presents her as God’s anointed ruler, reassuring courtiers and foreign rivals that an unmarried 25-year-old woman possessed full sovereign authority. However, Source A is limited because it is flattering royal propaganda that conceals the immense debt and political peril facing the Crown. In contrast, Source B is valuable for understanding the political context that shaped Elizabeth’s "Middle Way". The memory of Mary I burning nearly 300 Protestants at Smithfield explains why Elizabeth refused to impose extreme religious laws that would provoke rebellion. Cross-referencing both sources proves that Elizabeth’s survival depended equally on projecting an image of divine majesty (Source A) and pursuing pragmatic religious compromise to avoid the bloody fanaticism of the Marian era (Source B).',
        },
      ],

      // Backwards Compatibility for Print Workbooks
      right_page_task: {
        skill_title: 'Disciplinary Skill: Source Utility & Royal Propaganda',
        instructions:
          'Examine Source B, painted during the dangerous years when Elizabeth faced Catholic plots. Investigate how an unmarried female monarch used visual propaganda to convince her subjects she was powerful and invincible.',
        visual_source: {
          image: '/images/elizabeth_coronation_portrait.jpg',
          title: 'Source B: Official Portrait of Queen Elizabeth I (c. 1575)',
          caption:
            'Elizabeth I depicted with broad shoulders, pearl jewels representing virgin purity, and the royal orb and sceptre symbolising sovereign majesty.',
          question:
            'What specific visual symbols does the artist include in Source B to prove Elizabeth is strong enough to rule England without a husband?',
        },
        written_task_prompt:
          'Explain two ways Source B is useful to a historian investigating how Elizabeth I projected power and authority to prevent rebellion.',
      },

      // Plenary Retrieval Quiz: 8 Multiple-Choice Retrieval Questions
      quiz: [
        {
          question:
            'Which boy-king enforced radical Protestantism by whitewashing church walls between 1547 and 1553?',
          options: ['Henry VII', 'Charles I', 'Edward VI', 'James I'],
          answer: 2,
          explanation:
            'Edward VI ruled from age 9 to 15, aggressively stripping Catholic altars, statues, and Latin rituals.',
        },
        {
          question:
            'How many Protestants did Mary I burn alive at the stake, earning her the name "Bloody Mary"?',
          options: ['Over 3,000', 'Nearly 300', 'Around 30', 'None'],
          answer: 1,
          explanation:
            'Mary I burned approximately 284 Protestant martyrs at Smithfield and across England.',
        },
        {
          question:
            'What was the nickname given to Elizabeth I’s 1559 compromise religious settlement?',
          options: [
            'The Great Bargain',
            'The Grand Remonstrance',
            'The Holy Truce',
            'The Middle Way',
          ],
          answer: 3,
          explanation:
            'The "Middle Way" balanced Protestant doctrine (English Bible) with traditional Catholic ceremonial vestments.',
        },
        {
          question:
            'What religious title did Elizabeth I adopt in 1559 to appease those who objected to a woman leading the Church?',
          options: [
            'Supreme Governor',
            'Supreme Head',
            'Defender of Faith',
            'Archbishop of Canterbury',
          ],
          answer: 0,
          explanation:
            'Elizabeth chose "Supreme Governor" instead of "Supreme Head" to placate Catholics and strict Puritans.',
        },
        {
          question:
            'What famous phrase did Elizabeth I use to show she would not interrogate her subjects’ private beliefs?',
          options: [
            '"Kill them all, God will know His own"',
            '"Kings are little gods on Earth"',
            '"I am the state and the law"',
            '"I have no desire to make windows into men’s souls"',
          ],
          answer: 3,
          explanation:
            'Elizabeth stated she had no desire to make windows into men’s souls as long as they conformed outwardly.',
        },
        {
          question:
            'What action did Pope Pius V take against Elizabeth I in 1570, declaring her an illegitimate heretic?',
          options: [
            'Excommunication (Papal Bull)',
            'Canonised her',
            'Invaded Ireland',
            'Declared war directly',
          ],
          answer: 0,
          explanation:
            'In 1570, the papal bull Regnans in Excelsis excommunicated Elizabeth and ordered Catholics to depose her.',
        },
        {
          question:
            'Which Catholic cousin of Elizabeth became the figurehead of assassination plots against her?',
          options: [
            'Lady Jane Grey',
            'Mary of Guise',
            'Mary Queen of Scots',
            'Catherine of Aragon',
          ],
          answer: 2,
          explanation:
            'Mary Queen of Scots fled to England in 1568 and became the focus of the Ridolfi, Throckmorton, and Babington plots.',
        },
        {
          question:
            'In what year was Mary Queen of Scots finally beheaded at Fotheringhay Castle after her secret letters were decoded?',
          options: ['1603', '1587', '1570', '1558'],
          answer: 1,
          explanation:
            'Mary Queen of Scots was executed in February 1587 after Walsingham intercepted the Babington conspiracy letters.',
        },
      ],

      teacher_notes: {
        primer:
          'This lesson establishes the foundational schema for GCSE Paper 2 (Early Elizabethan England). Ensure pupils understand Elizabeth’s delicate political tightrope: her "Middle Way" was a masterclass in pragmatic statecraft, but foreign papal intervention transformed domestic Catholics into potential traitors in the eyes of the Crown.',
        objectives: [
          {
            objective:
              'Explain how the 1559 Religious Settlement balanced Protestant doctrine with Catholic ceremony.',
            primer:
              'Focus on Act III. Discuss why Elizabeth chose "Supreme Governor" instead of "Supreme Head" to placate Catholics and Puritans who believed only Christ or the Pope could head the church.',
            question:
              'Hinge Question: If Elizabeth refused to "make windows into men’s souls", why did her government start executing Catholic priests by the 1580s?',
          },
          {
            objective:
              'Analyse how Mary Queen of Scots and Catholic plots pushed England toward open war with Spain.',
            primer:
              'Walk through Act IV and Walsingham’s spy network. Emphasise that executing an anointed queen set a dangerous legal precedent.',
            question:
              'Hinge Question: Was Mary Queen of Scots executed for religious belief or for political treason?',
          },
        ],
      },
    },

    // ------------------------------------------------------------------------
    // LESSON 3: Elizabeth I & Spain: The Armada and Holy War
    // ------------------------------------------------------------------------
    {
      id: 'lesson_3',
      title: 'Elizabeth I & Spain: The Armada and Holy War (1585–1588)',
      enquiry: 'Why did Philip II launch the Spanish Armada, and why did it fail?',
      subtitle: 'From Francis Drake’s Sea Dogs to the Fireships of Calais',
      skill: 'Historical Interpretations',
      banner: {
        image: '/images/spanish_armada_battle.jpg',
        caption:
          'The clash of fleets in the English Channel: Spanish floating fortresses against fast English galleons.',
      },
      margin_spine: [
        { year: '1585', label: 'Sea Dog Piracy' },
        { year: '1587', label: 'Cadiz Raid' },
        { year: '1588', label: 'Midnight Fireships' },
        { year: '1588', label: 'The Wrecking Gale' },
      ],
      did_you_know:
        'King Philip II of Spain was such an obsessive micromanager that he spent 14 hours a day in a tiny stone cell in his palace, personally writing letters about how much salt pork and vinegar the sailors should eat! Meanwhile in England, legend says Sir Francis Drake was playing a game of bowls when the Armada was spotted, calmly announcing: "There is plenty of time to win this game and thrash the Spaniards too!"',

      // Do Now: Strict Cyclical Recall of Lessons 1 & 2
      do_now: {
        type: 'questions',
        items: [
          {
            question:
              'What 1534 law made the English Crown supreme over the Church of England, severing ties with the Pope?',
            answer: 'The Act of Supremacy.',
          },
          {
            question:
              'Which radical Protestant boy-king ruled England between 1547 and 1553, destroying Catholic altars and statues?',
            answer: 'Edward VI.',
          },
          {
            question:
              'How many Protestant martyrs were burned at the stake during the reign of Queen Mary I?',
            answer: 'Nearly 300 (around 284).',
          },
          {
            question:
              'What compromise title did Elizabeth I adopt in 1559 as head of the Church of England?',
            answer: 'Supreme Governor.',
          },
          {
            question:
              'What Catholic Scottish queen was executed for treason in 1587 after plotting to assassinate Queen Elizabeth?',
            answer: 'Mary Queen of Scots.',
          },
        ],
      },

      // Tier 2 & Tier 3 Substantive Vocabulary
      vocabulary: [
        {
          term: 'Armada',
          definition:
            'A massive battle fleet of 130 warships launched by Philip II of Spain in 1588 to invade England.',
          phonetic: 'ar-MAH-duh',
          syllables: 'Ar-ma-da',
          tier: '3',
        },
        {
          term: 'Crescent',
          definition:
            'A curved, defensive naval formation adopted by the Spanish Armada to protect slow transport vessels from English attack.',
          phonetic: 'KREZ-ent',
          syllables: 'Cres-cent',
          tier: '2',
        },
        {
          term: 'Fireship',
          definition:
            'An empty wooden ship loaded with pitch, tar, and gunpowder, set ablaze and steered into an anchored enemy fleet.',
          phonetic: 'FYRE-ship',
          syllables: 'Fire-ship',
          tier: '3',
        },
        {
          term: 'Culverin',
          definition:
            'A long-range naval cannon developed by the English that could be reloaded and fired rapidly from safe distances.',
          phonetic: 'KUL-ver-in',
          syllables: 'Cul-ver-in',
          tier: '3',
        },
        {
          term: 'Privateer',
          definition:
            'An armed, privately owned ship or sea captain (like Sir Francis Drake) licensed by the Crown to plunder enemy vessels.',
          phonetic: 'pry-vuh-TEER',
          syllables: 'Pri-va-teer',
          tier: '3',
        },
        {
          term: 'Logistics',
          definition:
            'The complex practical organisation of supplies, ammunition, food, and communication required to sustain a military campaign.',
          phonetic: 'luh-JIS-tiks',
          syllables: 'Lo-gis-tics',
          tier: '2',
        },
      ],

      // Academic Historical Narrative: Christine Counsell 4-Act Storytelling
      narrative_blocks: [
        {
          act: 1,
          title: 'Act I: The Cold War Turns Hot (1585–1587)',
          text: '<span class="para-ref">[3.1]</span> By the 1580s, Catholic Spain was the undisputed superpower of the world, flooded with silver plundered from South America. But King Philip II had three bitter grudges against England: Elizabeth had rejected his marriage proposal, she was secretly financing Dutch Protestant rebels fighting against Spanish rule, and her pirate "sea dogs" (like Sir Francis Drake) kept robbing Spanish treasure galleons. When Elizabeth beheaded Catholic Mary Queen of Scots in 1587, Philip decided God had commanded him to conquer England and overthrow the heretic Queen.',
        },
        {
          act: 2,
          title: 'Act II: The "Invincible" Crescent (July 1588)',
          text: '<span class="para-ref">[3.2]</span> In May 1588, Philip launched his giant fleet: the <strong>Spanish Armada</strong>. It consisted of 130 massive, towering warships carrying 30,000 soldiers and sailors, accompanied by 180 priests to convert England back to Rome. Philip’s plan was to sail up the English Channel in a tight, impenetrable crescent formation, rendezvous in the Netherlands with the Duke of Parma’s crack army of 30,000 veteran infantry, and ferry them across the Thames Estuary to seize London. For nine days, English ships followed the Armada up the Channel, but the Spanish crescent could not be broken.',
        },
        {
          act: 3,
          title: 'Act III: Midnight Hell-Burners at Calais (7 August 1588)',
          text: '<span class="para-ref">[3.3]</span> On 7 August, the Spanish anchored off Calais, waiting for Parma’s army. But Parma was trapped by Dutch gunboats and was not ready. At midnight, English commanders Lord Howard and Sir Francis Drake enacted a terrifying plan. They took eight old merchant ships, smeared their wooden hulls with pitch, tar, and gunpowder, loaded their cannons to fire automatically when the heat reached them, set them ablaze, and sent them drifting with the tide straight into the packed Spanish fleet! Panic erupted. Believing these were "hell-burners" designed to blow them to pieces, Spanish captains severed their anchor ropes and scattered blindly into the stormy darkness.',
        },
        {
          act: 4,
          title: 'Act IV: The Battle of Gravelines & The Wrecking Gale (8 August 1588)',
          text: '<span class="para-ref">[3.4]</span> At dawn off Gravelines, the English struck. With their crescent broken and anchors lost, the Spanish were easy prey. Smaller, faster English galleons equipped with long-range culverin cannons darted circles around the clumsy Spanish giants, pounding their oak hulls from safe distances. Battered and running low on ammunition, the surviving Armada could not sail back down the Channel against the wind. They were forced to flee north around the rocky coasts of Scotland and Ireland. Savage Atlantic storms ("The Protestant Wind") smashed dozens of galleons onto the rocks. Less than half the Armada limped back to Spain. Philip wept: <em>"I sent my ships to fight the English, not the elements."</em>',
        },
      ],

      act_questions: [
        {
          act: 1,
          q: 'What three major reasons provoked King Philip II to launch an invasion of England?',
        },
        { act: 2, q: 'What was Philip’s battle plan to conquer London using Parma’s army?' },
        {
          act: 3,
          q: 'Why did the midnight fireships at Calais cause total chaos among the Spanish fleet?',
        },
        {
          act: 4,
          q: 'How did superior English naval technology and bad weather combine to destroy the Armada?',
        },
      ],

      // Collapsible Visual Sources with Universal "How Useful" Questions & Provenance Scaffolding
      sources: [
        {
          title: 'Source A: The Armada Portrait of Queen Elizabeth I (c. 1588)',
          image: '/images/armada_portrait.jpg',
          caption:
            'Queen Elizabeth I with her right hand resting over the Americas on a terrestrial globe; behind her, English fireships strike at Calais on the left, while Spanish ships are wrecked on rocks on the right.',
          source_context:
            'Painted immediately after the defeat of the Spanish Armada in 1588 to celebrate England’s miraculous Protestant victory over the superpower of Catholic Spain.',
          how_useful_question:
            'How useful is Source A for an enquiry into how Queen Elizabeth used the defeat of the Armada to project global English ambition?',
          provenance_clues: [
            'Author: Attributed to George Gower, Queen Elizabeth’s official Serjeant Painter.',
            'Audience: English courtiers, foreign ambassadors, and future generations of English subjects.',
            'Motive: To immortalise Elizabeth as an invincible Protestant heroine chosen by God to rule the oceans and challenge Spain’s American empire.',
          ],
          hinge_question:
            'Hinge Question: Why did the artist paint Elizabeth’s fingers resting directly upon the American continent on the globe?',
          citation: 'Woburn Abbey Collection / National Maritime Museum, Greenwich.',
        },
        {
          title:
            'Source B: Contemporary 16th-Century Engraving of the Naval Clash off Calais & Gravelines (1588)',
          image: '/images/spanish_armada_battle.jpg',
          caption:
            'English warships engage the Spanish fleet in the English Channel as midnight fireships disrupt the defensive crescent formation.',
          source_context:
            'On 7 August 1588, Lord Howard and Sir Francis Drake sent eight burning vessels coated in pitch and gunpowder into the anchored Armada off Calais, forcing Spanish captains to cut their anchor cables in sheer panic.',
          how_useful_question:
            'How useful is Source B for an enquiry into the tactical reasons why the Spanish Armada was broken at Calais?',
          provenance_clues: [
            'Author: Contemporary European engraver documenting the decisive naval engagement.',
            'Audience: The European public following the dramatic outcome of the Anglo-Spanish war.',
            'Motive: To illustrate the chaotic tactical collapse of the Spanish formation under the surprise fireship attack.',
          ],
          hinge_question:
            'Hinge Question: Did the English win the battle because their guns sank the Armada, or because fireships destroyed Spain’s defensive formation?',
          citation: 'British Museum Print Collection • Department of Prints and Drawings.',
        },
      ],

      // End-of-Narrative Extended Disciplinary Writing Task
      tasks: [
        {
          type: 'historical_interpretations',
          topic: 'Disciplinary Enquiry Task: Historical Interpretations [12 Marks]',
          question:
            'Interpretation 1 argues that the Spanish Armada was defeated primarily by catastrophic weather and flawed planning. Interpretation 2 argues that English ship design, culverin cannons, and fireship tactics won the victory. Which interpretation is more convincing? Support your answer with factual evidence.',
          interp1: {
            title: 'Interpretation 1: Weather & Spanish Logistical Blunders',
            author: 'Academic Historian A (Focus on Weather & Strategy)',
            quote:
              'The Armada was fundamentally doomed by Philip II’s impossible battle plan. The Duke of Parma had no deep-water port in the Netherlands, meaning communication was impossible. When fierce Atlantic storms struck, Spanish galleons were driven onto the rocks of Scotland and Ireland. It was nature, not English guns, that destroyed Philip’s fleet.',
          },
          interp2: {
            title: 'Interpretation 2: English Tactics & Cannon Superiority',
            author: 'Academic Historian B (Focus on Tactical Innovation)',
            quote:
              'The defeat was won in the Channel. Drake and Howard’s midnight fireships at Calais panicked Spanish captains into cutting their anchors, permanently destroying their impenetrable crescent. At Gravelines, faster English galleons armed with rapid-fire culverins pounded the Spanish from distance, leaving them battered, out of ammunition, and unable to turn back.',
          },
          connectives: [
            'On the one hand, Interpretation 1 is convincing because...',
            'Specifically, logistical flaws and the Protestant Wind meant that...',
            'On the other hand, Interpretation 2 rightly emphasises that...',
            'Crucially, without the midnight fireship attack at Calais...',
            'Therefore, while weather completed the destruction, Interpretation 2 is more convincing because...',
          ],
          model_answer:
            'Historians debate whether the defeat of the Spanish Armada was caused primarily by environmental misfortune or tactical superiority. Interpretation 1 is persuasive in highlighting Philip II’s severe strategic blunders. Coordinating a rendezvous between the Duke of Parma’s army and the Duke of Medina Sidonia’s fleet across hostile waters with sixteenth-century communications was virtually impossible; Parma possessed no deep-water port, rendering him trapped by Dutch flyboats. Furthermore, catastrophic Atlantic gales wrecked dozens of ships on the Scottish and Irish reefs. However, Interpretation 2 provides a more convincing explanation of why the Armada lost military cohesion. Until Calais, the Spanish crescent had remained completely unbroken despite nine days of Channel bombardment. The decisive turning point was the midnight fireship raid orchestrated by Drake and Howard on 7 August, which induced blind panic, forced captains to cut anchor cables, and shattered the crescent. At the Battle of Gravelines, faster English galleons exploited this chaos with rapid-loading culverin cannons, battering hulls from safe stand-off distances. Consequently, while the storms wrecked the fleeing fleet, English naval tactics (Interpretation 2) were the primary cause of Spain’s military defeat.',
        },
      ],

      // Backwards Compatibility for Print Workbooks
      right_page_task: {
        skill_title: 'Disciplinary Skill: Historical Interpretations',
        instructions:
          'Historians disagree about the primary reason the Spanish Armada failed. Did the English win because of superior naval tactics, or did Spain lose because of catastrophic weather and poor planning? Compare the two interpretations below.',
        visual_source: {
          image: '/images/spanish_armada.jpg',
          title: 'Source C: The Fireships at Calais (Contemporary 16th-Century Engraving)',
          caption:
            'English fireships drifting into the Calais roads at midnight, sending Spanish galleons cutting their anchors in blind panic.',
          question:
            'What details in Source C show the panic and confusion caused by the English fireship attack?',
        },
        written_task_prompt:
          'Interpretation 1 argues: "The Armada was doomed by Philip II’s flawed plan and the brutal Atlantic storms." Interpretation 2 argues: "English ship design, rapid culverin cannons, and Drake’s fireship tactics won the victory." Which interpretation is more convincing? Support your answer with factual evidence.',
      },

      // Plenary Retrieval Quiz: 8 Multiple-Choice Retrieval Questions
      quiz: [
        {
          question: 'Which Catholic King of Spain launched the Armada against England in 1588?',
          options: ['Charles V', 'Ferdinand II', 'Philip II', 'Louis XIV'],
          answer: 2,
          explanation:
            'King Philip II of Spain launched the Armada to overthrow Elizabeth and restore Catholic rule.',
        },
        {
          question:
            'What famous English privateer raided Spanish treasure and served as vice-admiral against the Armada?',
          options: ['Lord Nelson', 'Sir Francis Drake', 'Sir Walter Raleigh', 'John Hawkins'],
          answer: 1,
          explanation:
            'Sir Francis Drake raided Cadiz in 1587 and played a leading role in the fireship attack at Calais.',
        },
        {
          question:
            'In what tight defensive formation did the 130 Spanish ships sail up the English Channel?',
          options: [
            'A crescent formation',
            'A diamond square',
            'A straight battle line',
            'A wedge formation',
          ],
          answer: 0,
          explanation:
            'The crescent formation protected the vulnerable troop and supply transports in the center.',
        },
        {
          question:
            'Which Spanish general in the Netherlands was the Armada supposed to rendezvous with and ferry across to London?',
          options: [
            'The Duke of Alba',
            'Don John of Austria',
            'The Duke of Medina Sidonia',
            'The Duke of Parma',
          ],
          answer: 3,
          explanation:
            'The Duke of Parma commanded 30,000 veteran Spanish infantry in Flanders waiting to be ferried across.',
        },
        {
          question:
            'What terrifying weapon did the English unleash at midnight off Calais on 7 August 1588?',
          options: [
            'Steam-powered rams',
            'Eight blazing fireships',
            'Exploding torpedoes',
            'Poison gas clouds',
          ],
          answer: 1,
          explanation:
            'Eight empty ships soaked in pitch and gunpowder were set ablaze and drifted directly toward the anchored fleet.',
        },
        {
          question:
            'What type of long-range, fast-reloading cannon gave English galleons an artillery advantage?',
          options: ['Demi-cannons', 'Mortars', 'Catapults', 'Culverins'],
          answer: 3,
          explanation:
            'Culverins fired smaller iron balls over longer distances and could be reloaded rapidly by small gun crews.',
        },
        {
          question:
            'At what decisive dawn battle on 8 August 1588 did English warships batter the scattered Spanish galleons?',
          options: [
            'The Battle of Gravelines',
            'The Battle of Cadiz',
            'The Battle of Trafalgar',
            'The Battle of Lepanto',
          ],
          answer: 0,
          explanation:
            'At Gravelines off the coast of France, English ships closed in and battered the anchorless Spanish vessels.',
        },
        {
          question:
            'What natural phenomenon wrecked dozens of Spanish galleons off the rugged coasts of Scotland and Ireland?',
          options: [
            'A sudden frost',
            'A dense sea fog',
            'Atlantic gales ("The Protestant Wind")',
            'A tidal tsunami',
          ],
          answer: 2,
          explanation:
            'Violent North Atlantic gales drove dozens of battered Spanish ships onto rocky reefs, destroying over half the fleet.',
        },
      ],

      teacher_notes: {
        primer:
          'Directly prepares students for GCSE Edexcel Paper 2 Key Topic 3. Teach pupils to avoid the simplistic myth that "the weather did everything". The English fireships at Calais broke the Spanish crescent formation, and the culverin cannons at Gravelines inflicted lethal hull damage before the North Sea gale struck.',
        objectives: [
          {
            objective:
              'Explain why Philip II launched the Armada and evaluate his two-stage invasion plan.',
            primer:
              'Contrast Philip’s grand strategic vision with the logistical flaw: Parma had no deep-water port to load his troops.',
            question:
              'Hinge Question: Why did the lack of radio or rapid communication between the Armada and the Duke of Parma make Philip’s invasion plan almost impossible to coordinate?',
          },
          {
            objective:
              'Evaluate competing historical interpretations regarding why the Armada failed.',
            primer:
              'Scaffold pupils to balance English tactical ingenuity (fireships, culverins) against Spanish logistical mistakes and the stormy weather.',
            question:
              'Hinge Question: If the fireships had failed at Calais, could the English fleet have stopped the Spanish Armada from picking up Parma’s army?',
          },
        ],
      },
    },

    // ------------------------------------------------------------------------
    // LESSON 4: Civil War, Regicide & The 1689 Bill of Rights
    // ------------------------------------------------------------------------
    {
      id: 'lesson_4',
      title: 'Civil War, Regicide & The 1689 Bill of Rights (1625–1689)',
      enquiry:
        'From Divine Right to cutting off the King’s head: Why did Britain execute Charles I?',
      subtitle: 'The 4-Milestone Story of War, Regicide, and the Birth of Parliamentary Rule',
      skill: 'Historical Significance & Turning Points',
      banner: {
        image: '/images/charles_i_execution.jpg',
        caption:
          'The public beheading of King Charles I outside Whitehall, 30 January 1649: an unprecedented act of regicide.',
      },
      margin_spine: [
        { year: '1629', label: '11 Years’ Tyranny' },
        { year: '1642', label: 'King Invades Parliament' },
        { year: '1649', label: 'Beheading a King' },
        { year: '1689', label: 'The Bill of Rights' },
      ],
      did_you_know:
        'Oliver Cromwell was so strictly Puritan that his soldiers patrolled London streets on 25 December sniffing chimney smoke—if they smelled roast turkey or mince pies, they kicked the door down and confiscated Christmas dinner! Furthermore, Charles I wore two thick shirts to his execution on a freezing January morning so that he wouldn’t shiver, saying: "I fear not death! If I tremble with the cold, my enemies will say I tremble with fear."',

      // Do Now: Strict Cyclical Recall of Lessons 1, 2 & 3
      do_now: {
        type: 'questions',
        items: [
          {
            question:
              'In what year did Martin Luther nail his 95 Theses in Wittenberg, sparking the Protestant Reformation?',
            answer: '1517.',
          },
          {
            question:
              'What compromise title did Elizabeth I adopt in 1559 as head of the Church of England?',
            answer: 'Supreme Governor.',
          },
          {
            question:
              'What Catholic Scottish queen was executed for treason in 1587 after her secret letters were decoded?',
            answer: 'Mary Queen of Scots.',
          },
          {
            question: 'In what year was the Spanish Armada defeated off the coast of England?',
            answer: '1588.',
          },
          {
            question:
              'What tactical weapon did the English fleet use at midnight off Calais to scatter the Spanish crescent formation?',
            answer: 'Eight blazing fireships (hell-burners).',
          },
        ],
      },

      // Tier 2 & Tier 3 Substantive Vocabulary
      vocabulary: [
        {
          term: 'Divine Right of Kings',
          definition:
            'The belief that a monarch’s authority comes directly from God and that no earthly parliament or court can challenge them.',
          phonetic: 'dih-VYN ryt ov kingz',
          syllables: 'Di-vine Right of Kings',
          tier: '3',
        },
        {
          term: 'Ship Money',
          definition:
            'An ancient coastal tax that Charles I illegally forced inland English towns to pay during his 11-year Personal Rule.',
          phonetic: 'SHIP MUN-ee',
          syllables: 'Ship Mon-ey',
          tier: '3',
        },
        {
          term: 'Regicide',
          definition:
            'The deliberate public trial and execution of a reigning monarch (such as King Charles I in January 1649).',
          phonetic: 'REJ-ih-syd',
          syllables: 'Reg-i-cide',
          tier: '3',
        },
        {
          term: 'Cavalier',
          definition:
            'A supporter of King Charles I during the English Civil War, often aristocratic landowners with horses and swords.',
          phonetic: 'kav-uh-LEER',
          syllables: 'Cav-a-lier',
          tier: '2',
        },
        {
          term: 'Roundhead',
          definition:
            'A supporter of Parliament during the English Civil War, often Puritans and London merchants with close-cropped hair.',
          phonetic: 'ROWND-hed',
          syllables: 'Round-head',
          tier: '2',
        },
        {
          term: 'Bill of Rights',
          definition:
            'The landmark 1689 constitutional statute establishing that Parliament holds supreme legislative and taxation power over the Crown.',
          phonetic: 'BIL ov ryts',
          syllables: 'Bill of Rights',
          tier: '3',
        },
      ],

      // Academic Historical Narrative: Christine Counsell 4-Act Storytelling
      narrative_blocks: [
        {
          act: 1,
          title: 'Milestone 1: The Tyrant King? (1629–1640)',
          text: '<span class="para-ref">[4.1]</span> When the Stuarts took the throne, conflict exploded. King Charles I firmly believed in the <strong>Divine Right of Kings</strong>: the idea that he was chosen by God Almighty and that questioning his decisions was a sin. When MPs in Parliament refused to grant him taxes, Charles locked the doors of Westminster and ruled alone for 11 years (the "Personal Rule"). To raise cash, he revived ancient medieval fines, forcing inland towns to pay <strong>Ship Money</strong> (traditionally only paid by coastal ports in wartime). When Puritans protested, Charles had their ears sliced off in public pillories. Resentment boiled.',
        },
        {
          act: 2,
          title: 'Milestone 2: The Nation at War (1642–1648)',
          text: '<span class="para-ref">[4.2]</span> In January 1642, Charles committed the ultimate outrage: he marched 400 armed guards straight onto the floor of the House of Commons to arrest five rebel MPs for treason. The Speaker refused to help him, and the MPs escaped down the River Thames. War was unavoidable. The nation tore itself apart: aristocratic Royalists with long hair and swords (<strong>Cavaliers</strong>) supported the King, while Puritan merchants and townsfolk with short hair (<strong>Roundheads</strong>) fought for Parliament. Parliament won because a Puritan MP named Oliver Cromwell created the <strong>New Model Army</strong>: a disciplined, professional fighting force promoted on merit, not noble birth.',
        },
        {
          act: 3,
          title: 'Milestone 3: The Unthinkable Crime: Regicide (January 1649)',
          text: '<span class="para-ref">[4.3]</span> Even after Charles was captured, he secretly plotted with Scottish armies to restart the war. Cromwell and radical army officers decided there would never be peace while Charles lived. In January 1649, an event occurred that shocked the crowned heads of Europe: Parliament put King Charles I on public trial for treason against his own people! Charles refused to plead, sneering that no earthly court had the legal right to judge an anointed King. On 30 January 1649, Charles was walked out of a window of his own Whitehall Banqueting House and beheaded on a black scaffold before a gasping crowd. Britain was now a Kingless Republic.',
        },
        {
          act: 4,
          title: 'Milestone 4: The Crown Tamed: The 1689 Bill of Rights (1660–1689)',
          text: '<span class="para-ref">[4.4]</span> For eleven years, Britain was ruled by Cromwell and the Puritans, who banned Christmas, horse-racing, makeup, and theatres. Exhausted by military dictatorship, Britain welcomed back Charles’s son (Charles II) in the 1660 Restoration. But when his brother, James II, tried to restore absolute Catholic rule in 1688, Parliament acted decisively. In the <strong>Glorious Revolution</strong>, MPs invited the Dutch Protestant Prince William of Orange and his English wife Mary to take the throne. In 1689, William and Mary were forced to sign the <strong>Bill of Rights</strong>. Never again could an English monarch suspend laws, dismiss judges, levy taxes, or maintain a standing army without Parliament’s consent. Parliament had won permanent power.',
        },
      ],

      act_questions: [
        { act: 1, q: 'Why did Charles I believe he could rule without Parliament for 11 years?' },
        {
          act: 2,
          q: 'Why did the creation of the New Model Army allow Parliament to defeat the King?',
        },
        {
          act: 3,
          q: 'Why was putting King Charles I on trial for treason considered an unthinkable act in 1649?',
        },
        {
          act: 4,
          q: 'How did the 1689 Bill of Rights permanently end the Divine Right of Kings in Britain?',
        },
      ],

      // Collapsible Visual Sources with Universal "How Useful" Questions & Provenance Scaffolding
      sources: [
        {
          title: 'Source A: Anthony van Dyck, Regal Portrait of King Charles I (1636)',
          image: '/images/charles_first.jpg',
          caption:
            'King Charles I portrayed in supreme court splendour, exuding serene majesty, elegance, and divine authority under the Divine Right of Kings.',
          source_context:
            'Painted during Charles I’s 11-year Personal Rule (1629–1640) when he governed without summoning Parliament, funding his kingdom through contentious medieval taxes like Ship Money.',
          how_useful_question:
            'How useful is Source A for an enquiry into how Charles I viewed his royal authority before the outbreak of the Civil War?',
          provenance_clues: [
            'Author: Sir Anthony van Dyck, Charles I’s principal court painter, celebrated for flattering royal portraits.',
            'Audience: The English royal court, aristocratic patrons, and visiting foreign diplomats in London.',
            'Motive: To project Charles as an untouchable, God-anointed monarch whose authority was absolute and beyond the questioning of MPs.',
          ],
          hinge_question:
            'Hinge Question: How does Van Dyck’s painting reflect the ideology of the Divine Right of Kings that ultimately brought Charles into civil war with Parliament?',
          citation: 'The Royal Collection Trust (RCIN 404420).',
        },
        {
          title:
            'Source B: Contemporary Illustrated Broadside: The Execution of King Charles I at Whitehall (30 January 1649)',
          image: '/images/charles_i_execution.jpg',
          caption:
            'German news broadside depicting the masked executioner holding the severed head of King Charles I aloft from the scaffold outside the Banqueting House before an immense London crowd.',
          source_context:
            'Following two civil wars, the Parliamentary army and radical MPs put the King on trial for treason against his own people. His public beheading was an unprecedented event that stunned Europe.',
          how_useful_question:
            'How useful is Source B for an enquiry into the international shock and significance of the execution of Charles I?',
          provenance_clues: [
            'Author: Contemporary continental printmaker publishing illustrated news broadsheets.',
            'Audience: The European public and foreign monarchies who viewed regicide as a horrifying violation of divine order.',
            'Motive: To report the sensational and shocking news that an English parliament had dared to execute its own anointed king.',
          ],
          hinge_question:
            'Hinge Question: Why did the execution of King Charles I strike terror into royal palaces across the entire European continent?',
          citation: 'British Library Historical Print Archive (Thomason Tracts).',
        },
      ],

      // End-of-Narrative Extended Disciplinary Writing Task
      tasks: [
        {
          type: 'extended_writing',
          topic: 'Disciplinary Enquiry Task: Historical Significance & Turning Points [8 Marks]',
          question:
            'Explain the historical significance of the execution of King Charles I in 1649. Did cutting off the King’s head destroy royal tyranny, or did it merely replace one dictator with another?',
          hints: [
            'Point: State your judgment: identify whether the 1649 regicide was a transformative democratic breakthrough or a violent prelude to military dictatorship.',
            'Evidence: Deploy precise evidence: the Whitehall scaffold (30 January 1649), the trial for treason against his own people, Cromwell’s Major-Generals, and the 1689 Bill of Rights.',
            'Explanation: Explain short-term vs long-term significance: in the short term Cromwell ruled as a Puritan military dictator, but in the long term the divine right of kings was shattered forever.',
            'Link: Conclude by connecting the regicide of 1649 to the permanent constitutional victory of Parliament in 1689.',
          ],
          model_answer:
            'The execution of King Charles I on 30 January 1649 was a monumental constitutional turning point in British history. In the short term, regicide did not create a free democracy; instead, it replaced royal absolutism with Oliver Cromwell’s strict military dictatorship. Cromwell dismissed Parliament by force, divided England into eleven districts ruled by puritanical Major-Generals, and banned Christmas and theatres. However, in the long term, the historical significance of the execution was profound. By putting an anointed king on public trial for treason against his own people and beheading him outside his own palace, Parliament permanently shattered the sacred mystique of the Divine Right of Kings. When the monarchy was restored in 1660, future kings knew that royal power had limits. When James II attempted to reintroduce absolute rule in 1688, Parliament expelled him and enacted the 1689 Bill of Rights. Therefore, the 1649 execution was historically decisive because it established the irreversible precedent that British monarchs rule only by consent of Parliament under the law.',
        },
      ],

      // Backwards Compatibility for Print Workbooks
      right_page_task: {
        skill_title: 'Disciplinary Skill: Historical Significance & Turning Points',
        instructions:
          'Examine Source D, an authentic broadside printed in 1649 depicting the execution of Charles I. Investigate whether the execution of a reigning monarch was a criminal act of treason or a heroic defense of British liberty.',
        visual_source: {
          image: '/images/charles_i_execution.jpg',
          title: 'Source D: Contemporary German Broadside of the Execution of Charles I (1649)',
          caption:
            'The executioner holds up the severed head of King Charles I outside Whitehall before thousands of shocked Londoners.',
          question:
            'How does Source D capture the shock and horror of the crowd as the King’s head is held aloft?',
        },
        written_task_prompt:
          'Explain the historical significance of the execution of Charles I in 1649. Did cutting off the King’s head destroy tyranny, or did it merely replace one dictator with another?',
      },

      // Plenary Retrieval Quiz: 8 Multiple-Choice Retrieval Questions
      quiz: [
        {
          question:
            'What belief held that kings were appointed directly by God and could not be questioned by Parliament?',
          options: [
            'The Social Contract',
            'Feudal Tribute',
            'The Divine Right of Kings',
            'Popular Sovereignty',
          ],
          answer: 2,
          explanation:
            'The Divine Right of Kings asserted that monarchs were answerable only to God, not to earthly courts or parliaments.',
        },
        {
          question:
            'What illegal coastal tax did Charles I force inland towns to pay during his 11-year Personal Rule?',
          options: ['Tonnage and Poundage', 'Ship Money', 'Hearth Tax', 'The Tithe'],
          answer: 1,
          explanation:
            'Ship Money was an ancient tax for coastal defense in wartime, which Charles unlawfully levied on inland towns in peacetime.',
        },
        {
          question:
            'What outrage did Charles I commit in January 1642 that made the Civil War unavoidable?',
          options: [
            'He marched armed guards into the House of Commons to arrest 5 MPs',
            'He signed a treaty with Catholic France',
            'He banned the English Bible',
            'He burned Westminster Abbey',
          ],
          answer: 0,
          explanation:
            'Charles entered the Commons with 400 armed guards to arrest five leading MPs, breaching parliamentary privilege.',
        },
        {
          question:
            'What nickname was given to Royalist supporters of the King who fought with long hair and cavalry swords?',
          options: ['Diggers', 'Roundheads', 'Levellers', 'Cavaliers'],
          answer: 3,
          explanation:
            'Royalists were nicknamed Cavaliers, derived from the Spanish word for horsemen (caballeros).',
        },
        {
          question:
            'What was Oliver Cromwell’s professional, disciplined Parliamentary army called?',
          options: [
            'The Redcoats',
            'The New Model Army',
            'The Royal Fusiliers',
            'The Continental Army',
          ],
          answer: 1,
          explanation:
            'The New Model Army was established in 1645, promoting officers by military merit and religious discipline rather than noble birth.',
        },
        {
          question:
            'On what exact date was King Charles I publicly beheaded outside the Banqueting House in Whitehall?',
          options: ['30 January 1649', '5 November 1605', '23 August 1642', '14 July 1689'],
          answer: 0,
          explanation:
            'Charles I was executed on Tuesday 30 January 1649 following his trial for high treason.',
        },
        {
          question:
            'What title did Oliver Cromwell take when ruling Britain during the Republican Commonwealth from 1653?',
          options: [
            'Prime Minister',
            'President of the Republic',
            'King Oliver I',
            'Lord Protector',
          ],
          answer: 3,
          explanation:
            'Cromwell refused the crown and instead governed under the title Lord Protector of the Commonwealth.',
        },
        {
          question:
            'What landmark constitutional statute did William and Mary sign in 1689, ensuring Parliament rules Britain under law?',
          options: [
            'The Magna Carta',
            'The Act of Settlement',
            'The Bill of Rights',
            'The Petition of Right',
          ],
          answer: 2,
          explanation:
            'The 1689 Bill of Rights established that monarchs cannot suspend laws, levy taxes, or maintain standing armies without Parliament.',
        },
      ],

      teacher_notes: {
        primer:
          'Keep this lesson focused strictly on the constitutional hinge: the battle between royal absolutism (Divine Right) and parliamentary sovereignty (Rule of Law). Do not get bogged down in battlefield maneuvers. Highlight that the 1649 regicide broke the mystique of sacred kingship forever, culminating 40 years later in the 1689 Bill of Rights.',
        objectives: [
          {
            objective:
              'Explain why Charles I’s belief in the Divine Right of Kings triggered the Civil War.',
            primer: 'Focus on Milestone 1 & 2. Highlight Ship Money as taxation without consent.',
            question:
              'Hinge Question: Was Charles I executed because he was an evil tyrant, or because he genuinely believed God forbade him from surrendering his royal power to MPs?',
          },
          {
            objective:
              'Assess how the 1689 Bill of Rights established the constitutional foundations of modern British democracy.',
            primer:
              'Contrast Milestone 1 (Charles ruling alone) with Milestone 4 (monarch bound by parliamentary statute).',
            question:
              'Hinge Question: Did the 1689 Bill of Rights give power to the British people, or only to wealthy landowners in Parliament?',
          },
        ],
      },
    },

    // ------------------------------------------------------------------------
    // LESSON 5: Synoptic Disciplinary Enquiry: Extent of Change (1517–1689)
    // ------------------------------------------------------------------------
    {
      id: 'lesson_5',
      title: 'Synoptic Enquiry: "The World Turned Upside Down"? (1517–1689)',
      enquiry:
        '“The World Turned Upside Down”? How far did life and power in Britain really change between 1517 and 1689?',
      subtitle: 'A 170-Year Disciplinary Investigation into Power, Faith, and Everyday Life',
      skill: 'Change & Continuity (Evaluative Essay)',
      banner: {
        image: '/images/armada_portrait.jpg',
        caption:
          'From Tudor absolute sovereignty to parliamentary supremacy: weighing 170 years of transformation.',
      },
      margin_spine: [
        { year: '1517', label: 'Papal Rome & Kings' },
        { year: '1649', label: 'Regicide & Diggers' },
        { year: '1689', label: 'Bill of Rights' },
        { year: 'Continuity', label: 'The 90% at the Bottom' },
      ],
      did_you_know:
        'In 1649, an ordinary group of poor peasants called the Diggers marched onto St George’s Hill in Surrey and began digging up common land to plant parsnips and carrots, declaring that the Earth was a "common treasury for all". Wealthy landowners immediately sent troops to beat them off, burn their cottages, and trample their crops!',

      // Do Now: Strict Cyclical Recall of Lessons 1, 2, 3 & 4
      do_now: {
        type: 'questions',
        items: [
          {
            question:
              'What 1534 law ended the authority of the Pope over England and made the King head of the Church?',
            answer: 'The Act of Supremacy.',
          },
          {
            question:
              'What compromise title did Elizabeth I adopt in 1559 as head of the Church of England?',
            answer: 'Supreme Governor.',
          },
          {
            question: 'In what year was the Spanish Armada defeated off the English coast?',
            answer: '1588.',
          },
          {
            question:
              'What professional, disciplined army did Oliver Cromwell build to defeat the Royalists in the Civil War?',
            answer: 'The New Model Army.',
          },
          {
            question:
              'What 1689 constitutional law guaranteed that monarchs could never suspend laws or levy taxes without Parliament?',
            answer: 'The Bill of Rights.',
          },
        ],
      },

      // Tier 2 & Tier 3 Substantive Vocabulary
      vocabulary: [
        {
          term: 'Constitutional Monarchy',
          definition:
            'A political system where the powers of the monarch are strictly limited by law and an elected parliament.',
          phonetic: 'kon-stih-TOO-shun-ul MON-ar-kee',
          syllables: 'Con-sti-tu-tion-al Mon-ar-chy',
          tier: '3',
        },
        {
          term: 'Toleration Act',
          definition:
            'The 1689 law that allowed non-conformist Protestant denominations (Baptists, Quakers) to worship freely in their own chapels.',
          phonetic: 'tol-er-AY-shun akt',
          syllables: 'Tol-er-a-tion Act',
          tier: '3',
        },
        {
          term: 'Censorship',
          definition:
            'The suppression or control of books, pamphlets, newspapers, or speech by government authorities to prevent criticism.',
          phonetic: 'SEN-ser-ship',
          syllables: 'Cen-sor-ship',
          tier: '2',
        },
        {
          term: 'Leveller',
          definition:
            'A radical Civil War political movement demanding voting rights for all adult men and legal equality under the law.',
          phonetic: 'LEV-el-er',
          syllables: 'Lev-el-ler',
          tier: '3',
        },
        {
          term: 'Digger',
          definition:
            'A radical group of poor peasants in 1649 who attempted to cultivate common land and abolish private property ownership.',
          phonetic: 'DIG-er',
          syllables: 'Dig-ger',
          tier: '3',
        },
        {
          term: 'Continuity',
          definition:
            'Historical patterns, social hierarchies, or daily routines that remain unchanged over extended periods of time.',
          phonetic: 'kon-tih-NYOO-ih-tee',
          syllables: 'Con-ti-nu-i-ty',
          tier: '2',
        },
      ],

      // Academic Historical Narrative: Christine Counsell 4-Act Storytelling
      narrative_blocks: [
        {
          act: 1,
          title: 'Act I: Power & Government: Taming the Crown',
          text: '<span class="para-ref">[5.1]</span> In 1517, Henry VIII ruled as an all-powerful medieval prince. He claimed to be God’s deputy on Earth, locked opponents in the Tower, and beheaded ministers without challenge. By 1689, royal absolutism was dead. The 1689 Bill of Rights established that Parliament, not the monarch, held supreme authority over taxes, courts, and armies. A King could no longer dismiss Parliament on a whim. Power at the top had fundamentally shifted from one man’s royal will to an elected assembly of lawmakers.',
        },
        {
          act: 2,
          title: 'Act II: Faith & Religion: From Rome to Toleration',
          text: '<span class="para-ref">[5.2]</span> In 1517, every single English person was Catholic, answering to the Pope in Rome; questioning Church dogma meant burning as a heretic. By 1689, Britain was officially a Protestant kingdom anchored by the national Church of England. Furthermore, following the religious violence of the Civil War, the 1689 <strong>Toleration Act</strong> allowed Protestant dissenters (Baptists, Quakers, Presbyterians) to worship in their own chapels without arrest. While Catholics and Jews still faced discrimination, the medieval Catholic monopoly was shattered forever.',
        },
        {
          act: 3,
          title: 'Act III: Ideas & Free Speech: The Pamphlet Revolution',
          text: '<span class="para-ref">[5.3]</span> Under the Tudors, speaking against the monarch resulted in sliced ears, hanging, or public branding. But during the 1640s Civil War, strict royal censorship collapsed. An explosion of radical ideas flooded London’s streets: over 22,000 pamphlets and newspapers were printed! Radical groups emerged: the <em>Levellers</em> demanded the right to vote for all adult men, while the <em>Diggers</em> argued all private property was theft. London coffee houses became noisy public centres where ordinary merchants argued politics over hot bowls of bitter Turkish brew.',
        },
        {
          act: 4,
          title: 'Act IV: Everyday Life: The Great Continuity',
          text: '<span class="para-ref">[5.4]</span> Yet, did "the world turn upside down" for the vast majority? For 90% of the population—poor agricultural labourers, weavers, domestic servants, and women—life remained virtually unchanged. Parliament did not represent ordinary people: only wealthy landowners owning significant property could vote or sit as MPs. Women possessed zero legal rights, could not vote or own land independently, and lived under the complete authority of husbands or fathers. Disease, child mortality, and bone-crushing agricultural toil remained the harsh daily reality from 1517 to 1689.',
        },
      ],

      act_questions: [
        {
          act: 1,
          q: 'In what ways did the 1689 Bill of Rights represent a revolutionary shift in political power?',
        },
        {
          act: 2,
          q: 'How had religious freedom and tolerance expanded in Britain between 1517 and 1689?',
        },
        {
          act: 3,
          q: 'How did the collapse of royal censorship change the way ordinary people debated ideas?',
        },
        {
          act: 4,
          q: 'Why can it be argued that for 90% of ordinary people, life barely changed at all?',
        },
      ],

      // Collapsible Visual Sources with Universal "How Useful" Questions & Provenance Scaffolding
      sources: [
        {
          title: 'Source A: The 1689 Bill of Rights Parliamentary Statute Scroll',
          image: '/images/bill_of_rights.jpg',
          caption:
            'The official parliamentary roll of the 1689 Bill of Rights, establishing that the Crown cannot suspend laws, levy taxes, or raise a standing army without Parliament.',
          source_context:
            'Enacted following the Glorious Revolution when James II fled into exile. It settled the Crown on William III and Mary II, fundamentally transforming England into a constitutional monarchy.',
          how_useful_question:
            'How useful is Source A for an enquiry into how the balance of political power shifted from the Crown to Parliament in 1689?',
          provenance_clues: [
            'Author: The Convention Parliament of 1689, composed of Whig and Tory aristocrats and wealthy merchants.',
            'Audience: The English Crown, the judiciary, and all future British monarchs.',
            'Motive: To legally bind the monarchy forever to the rule of parliamentary law and prevent absolute royal rule.',
          ],
          hinge_question:
            'Hinge Question: Did the Bill of Rights grant democratic power to the British people, or only to wealthy landowners in Parliament?',
          citation: 'Parliamentary Archives, Palace of Westminster (HL/PO/PU/1/1688/1W&M2s2n1).',
        },
        {
          title:
            'Source B: Contemporary Dutch Engraving: William of Orange Landing at Torbay (5 November 1688)',
          image: '/images/william_landing_1688.jpg',
          caption:
            'Prince William of Orange lands in Devon with 40,000 troops, greeted by local gentry in the bloodless invasion known as the Glorious Revolution.',
          source_context:
            'Seven prominent English nobles secretly invited the Dutch Protestant ruler William of Orange to bring an army to overthrow Catholic King James II, leading directly to the 1689 Bill of Rights.',
          how_useful_question:
            'How useful is Source B for an enquiry into how supporters of William and Mary justified the overthrow of James II?',
          provenance_clues: [
            'Author: Contemporary Dutch/English Protestant engraver commemorating the arrival of Prince William.',
            'Audience: English Protestant merchants and European political observers.',
            'Motive: To portray William not as an armed foreign invader, but as a heroic Protestant liberator restoring English liberties.',
          ],
          hinge_question:
            'Hinge Question: Was the Glorious Revolution an authentic popular revolution, or a foreign military invasion backed by rich aristocrats?',
          citation: 'Rijksmuseum, Amsterdam (RP-P-OB-76.435).',
        },
      ],

      // End-of-Narrative Extended Disciplinary Writing Task
      tasks: [
        {
          type: 'two_sided_argument',
          topic: 'Disciplinary Enquiry Task: Change & Continuity Synoptic Essay [12 Marks]',
          question:
            '“Between 1517 and 1689, Britain was turned upside down.” How far do you agree with this statement? Support your answer with evidence of both radical change and profound continuity.',
          instruction:
            'Evaluate the evidence for radical transformation at the top of society against the stark continuities experienced by 90% of the population.',
          advancement: {
            title: 'Radical Transformation & Change (At the Summit)',
            starter:
              'Historians arguing that Britain was turned upside down point to revolutionary transformations in political power and religion...',
            points: [
              'Political Sovereignty: In 1517, Henry VIII claimed Divine Right and ruled as an absolute monarch. By 1689, the Bill of Rights established that Parliament held supreme authority over taxes, laws, and the army.',
              'Religious Monopoly Shattered: In 1517, England answered entirely to the Pope in Rome under pain of heresy; by 1689, Britain was Protestant, and the Toleration Act allowed non-conformists to worship freely.',
              'Explosion of Public Debate: Royal censorship collapsed during the Civil War, giving rise to over 22,000 pamphlets and radical political groups like the Levellers and Diggers.',
            ],
          },
          limitations: {
            title: 'Profound Continuity & Stagnation (For the 90% at the Bottom)',
            starter:
              'Conversely, examining the everyday lives of ordinary agricultural labourers and women reveals profound continuity...',
            points: [
              'No Democratic Rights: Parliament represented only wealthy male landowners owning significant property; agricultural labourers and urban poor had zero vote or political voice.',
              'Subjugation of Women: Women possessed zero independent legal existence under common law (coverture), could not vote, own property while married, or enter universities.',
              'Brutal Daily Reality: For 90% of the population, grueling manual labor, deadly epidemics, malnutrition, and high infant mortality remained unchanged from 1517 to 1689.',
            ],
          },
          synthesis_prompt:
            'Combine both perspectives into an examiner-grade 12-mark evaluative essay reaching a nuanced historical verdict.',
          synthesis_connectives: [
            'In terms of political sovereignty and religion, a revolutionary transformation occurred because...',
            'For example, the transition from Henry VIII’s Divine Right to the 1689 Bill of Rights meant that...',
            'In contrast, examining the socioeconomic lives of 90% of the population reveals remarkable continuity because...',
            'Furthermore, women and landless labourers remained completely disenfranchised, proving that...',
            'Ultimately, while the world turned upside down for the governing elites at Westminster, for the vast majority of ordinary people...',
          ],
          model_answer:
            'The claim that Britain was "turned upside down" between 1517 and 1689 is partially convincing regarding political and religious institutions at the top of society, but deeply flawed when examining the everyday lives of the vast majority. In terms of governance, a profound constitutional revolution occurred. In 1517, Henry VIII claimed Divine Right and ruled as an unchecked sovereign. By 1689, following a bloody Civil War and the execution of Charles I, the Bill of Rights firmly established that Parliament held supreme authority over taxation, lawmaking, and the military; monarchs were henceforth bound by the rule of law. Similarly, religion transformed from an absolute Catholic papal monopoly into a Protestant kingdom offering legal toleration to dissenters under the 1689 Toleration Act. However, for 90% of the population—poor agricultural labourers, weavers, and domestic servants—life showed remarkable continuity. Parliament was not a modern democracy; it was an oligarchy of wealthy aristocratic landowners. Ordinary working men had no vote, while women possessed zero legal rights under coverture and remained the legal property of fathers or husbands. Famine, plague, and relentless manual toil remained the harsh daily reality across the entire 170-year period. In conclusion, while political power shifted from the Crown to Parliament, the social and economic foundations of Britain remained right-side up: power simply transferred from one king to an elite club of wealthy landowners.',
        },
      ],

      // Backwards Compatibility for Print Workbooks
      right_page_task: {
        skill_title: 'Disciplinary Skill: Change & Continuity (Extended Evaluative Essay)',
        instructions:
          'Write a four-paragraph historical assessment answering the enquiry question: "The World Turned Upside Down? To what extent did power and life in Britain truly change between 1517 and 1689?" Use the structured matrix below.',
        visual_source: {
          image: '/images/charles_first.jpg',
          title: 'Source E: Anthony van Dyck, Portrait of King Charles I (1636)',
          caption:
            'King Charles I depicted in supreme regal splendour before the Civil War shattered the Divine Right of Kings.',
          question:
            'What message about royal power did King Charles I want this painting to project to his subjects?',
        },
        written_task_prompt:
          'Plan and write your final assessment essay. Paragraph 1: Political change (Crown vs Parliament). Paragraph 2: Religious change (Catholic monopoly vs Protestant toleration). Paragraph 3: Everyday life continuity (labourers and women). Paragraph 4: Overall Historical Verdict (Did power transform completely, or did it merely change hands among the wealthy elite?).',
      },

      // Plenary Retrieval Quiz: 8 Multiple-Choice Retrieval Questions
      quiz: [
        {
          question:
            'In 1517, to which foreign spiritual leader did the English Church and King answer?',
          options: [
            'The King of Spain',
            'The Pope in Rome',
            'The Holy Roman Emperor',
            'The Archbishop of Paris',
          ],
          answer: 1,
          explanation:
            'Before the Break with Rome, England was Catholic and owed religious obedience to the Pope.',
        },
        {
          question:
            'By 1689, which institution possessed the supreme legal authority to approve taxes and enact laws in Britain?',
          options: ['The Privy Council', 'The Church of England', 'The Royal Navy', 'Parliament'],
          answer: 3,
          explanation:
            'The 1689 Bill of Rights established that laws cannot be made or suspended without Parliament’s consent.',
        },
        {
          question:
            'What radical group of poor peasants attempted to farm common land for all people on St George’s Hill in 1649?',
          options: ['The Cavaliers', 'The Chartists', 'The Diggers', 'The Luddites'],
          answer: 2,
          explanation:
            'Led by Gerrard Winstanley, the Diggers declared that the earth was a "common treasury for all".',
        },
        {
          question:
            'What radical political movement during the Civil War demanded the right to vote for all adult men?',
          options: ['The Levellers', 'The Jacobites', 'The Roundheads', 'The Tories'],
          answer: 0,
          explanation:
            'The Levellers campaigned for an Agreement of the People, advocating universal male suffrage.',
        },
        {
          question:
            'What 1689 statute allowed non-conformist Protestants (Baptists, Quakers) to worship freely in their own chapels?',
          options: [
            'The Test Act',
            'The Five Mile Act',
            'The Toleration Act',
            'The Act of Supremacy',
          ],
          answer: 2,
          explanation:
            'The 1689 Toleration Act granted freedom of worship to non-conformist Protestants, though restrictions remained on Catholics.',
        },
        {
          question:
            'Did the legal rights and everyday lives of poor agricultural labourers and women change significantly between 1517 and 1689?',
          options: [
            'Yes, manual labor was abolished',
            'No, there was great continuity in their poverty and lack of rights',
            'Yes, all peasants became landowners',
            'Yes, women gained the right to vote in 1689',
          ],
          answer: 1,
          explanation:
            'For 90% of the population, social and economic life showed deep continuity: poor workers had no vote, and women had no legal rights.',
        },
        {
          question:
            'Approximately what percentage of the population remained disenfranchised agricultural workers, domestic servants, and women in 1689?',
          options: ['About 50%', 'About 25%', 'Less than 10%', 'About 90%'],
          answer: 3,
          explanation:
            'Over 90% of the population had no property qualifications to vote or stand for Parliament in 1689.',
        },
        {
          question:
            'What term describes a political system where a monarch’s authority is strictly limited by law and an elected assembly?',
          options: [
            'Constitutional Monarchy',
            'Military Junta',
            'Feudal Anarchy',
            'Absolute Monarchy',
          ],
          answer: 0,
          explanation:
            'A Constitutional Monarchy is a system where the Crown reigns subject to statutory law and parliamentary oversight.',
        },
      ],

      teacher_notes: {
        primer:
          'This synoptic assessment demands genuine historical judgment. Guide Year 8 pupils away from simplistic "everything changed" conclusions. Push them to make the nuanced distinction: political sovereignty transformed radically at the top (from Divine Right to Constitutional Monarchy), but economic and social hierarchies for ordinary working people and women showed remarkable continuity.',
        objectives: [
          {
            objective:
              'Synthesise evidence across 170 years to evaluate the extent of political and religious change.',
            primer:
              'Use the 4-box matrix. Contrast Henry VIII’s absolute supremacy with William and Mary’s statutory limitations.',
            question:
              'Hinge Question: Was Britain in 1689 a democracy, or was it an oligarchy ruled by wealthy landowners?',
          },
          {
            objective:
              'Formulate an independent, evaluative essay supported by precise causal evidence.',
            primer:
              'Ensure pupils deploy specific evidence: Act of Supremacy (1534), Regicide (1649), Bill of Rights (1689), Diggers, and property qualifications.',
            question:
              'Hinge Question: If an agricultural labourer fell asleep in 1517 and woke up in 1689, what would surprise him more: the King being ruled by Parliament, or how little his own daily life had improved?',
          },
        ],
      },
    },
  ],
};

export default unitData;
