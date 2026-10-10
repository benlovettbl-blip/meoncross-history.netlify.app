/**
 * Crown, Church, or Parliament (1517–1689)
 * Key Stage 3 Year 8 • 5-Lesson Disciplinary Enquiry
 *
 * Storytelling: 5-Act Decimal Standard (1.1 to 1.5) with Inline Evidential Sources
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
  cover_image_position: 'center 12%',
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
            q: 'What title was Henry VIII awarded by the Pope in 1521 for defending the Catholic sacraments?',
            a: 'Defender of the Faith (Fidei Defensor)',
          },
          {
            id: 'q4',
            q: 'Which Spanish wife failed to give Henry VIII a surviving male heir, triggering his "Great Matter"?',
            a: 'Catherine of Aragon',
          },
          {
            id: 'q5',
            q: 'What 1534 law declared Henry VIII to be the Supreme Head of the Church of England?',
            a: 'The Act of Supremacy',
          },
        ],
      },
      {
        lesson_id: 'lesson_2',
        title: 'Lesson 2 Retrieval: Elizabeth I & The Middle Way',
        questions: [
          {
            id: 'q6',
            q: 'How many Protestant martyrs were burned at the stake during the reign of Queen Mary I?',
            a: 'Over 280 (approx. 284)',
          },
          {
            id: 'q7',
            q: 'What title did Elizabeth I choose in 1559 instead of "Supreme Head" to compromise with Catholics?',
            a: 'Supreme Governor',
          },
          {
            id: 'q8',
            q: 'What was Elizabeth’s religious compromise called that balanced Protestant doctrine with traditional ceremonies?',
            a: 'The Middle Way (Via Media)',
          },
          {
            id: 'q9',
            q: 'What were Catholics called who refused to attend the compulsory Sunday Church of England services?',
            a: 'Recusants',
          },
          {
            id: 'q10',
            q: 'In what year did Pope Pius V issue the Papal Bull excommunicating Elizabeth and calling for her overthrow?',
            a: '1570',
          },
        ],
      },
      {
        lesson_id: 'lesson_3',
        title: 'Lesson 3 Retrieval: The Spanish Armada',
        questions: [
          {
            id: 'q11',
            q: 'Which Catholic King of Spain launched the Armada in 1588 to invade England?',
            a: 'King Philip II',
          },
          {
            id: 'q12',
            q: 'What harbour raid in 1587 did Francis Drake call "singeing the King of Spain’s beard"?',
            a: 'The Raid on Cadiz',
          },
          {
            id: 'q13',
            q: 'What defensive crescent-shaped formation did the 130 ships of the Armada sail in up the English Channel?',
            a: 'A crescent formation',
          },
          {
            id: 'q14',
            q: 'What terrifying weapon did Drake launch at midnight against the anchored Spanish fleet off Calais?',
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
      enquiry: 'Why did Henry VIII break with Rome, and how was Royal Supremacy established?',
      subtitle: 'From Martin Luther’s Hammer to Henry VIII’s Crowned Supremacy',
      skill: 'Causation & Motivation',
      banner: {
        image: '/images/henry_viii.jpg',
        caption:
          'King Henry VIII: from papal "Defender of the Faith" to supreme head of his own national church.',
      },
      margin_spine: [
        { year: '1517', label: '1.1 Luther’s Protest' },
        { year: '1527', label: '1.2 Dynastic Crisis' },
        { year: '1529', label: '1.3 Roman Deadlock' },
        { year: '1533', label: '1.4 Cromwell’s Siege' },
        { year: '1534', label: '1.5 Royal Supremacy' },
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
          term: 'Purgatory',
          definition:
            'In Catholic belief, a place of spiritual suffering where souls were cleansed of sins before entering Heaven.',
          phonetic: 'PER-guh-tor-ee',
          syllables: 'Pur-ga-to-ry',
          tier: '3',
        },
        {
          term: 'Heresy',
          definition:
            'Holding religious beliefs that contradicted the official teachings of the established Church, punishable by death.',
          phonetic: 'HAIR-uh-see',
          syllables: 'Her-e-sy',
          tier: '3',
        },
        {
          term: 'Dynastic',
          definition:
            'Relating to a hereditary line of rulers from the same family and the struggle to secure their unbroken succession.',
          phonetic: 'dih-NAS-tik',
          syllables: 'Dy-nas-tic',
          tier: '2',
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
          term: 'Papacy',
          definition:
            'The central authority, office, and government of the Pope as the supreme head of the Roman Catholic Church.',
          phonetic: 'PAY-puh-see',
          syllables: 'Pa-pa-cy',
          tier: '3',
        },
        {
          term: 'Sovereignty',
          definition:
            'Supreme, independent power and legal authority over a state, free from any external control or foreign ruler.',
          phonetic: 'SOV-rin-tee',
          syllables: 'Sov-er-eign-ty',
          tier: '3',
        },
        {
          term: 'Statute',
          definition:
            'A formal written law passed by Parliament and approved by the monarch, possessing supreme legal power.',
          phonetic: 'STAT-choot',
          syllables: 'Stat-ute',
          tier: '2',
        },
        {
          term: 'Supremacy',
          definition:
            'The state of holding ultimate, unquestioned legal and religious authority within a kingdom.',
          phonetic: 'soo-PREM-uh-see',
          syllables: 'Su-prem-a-cy',
          tier: '3',
        },
        {
          term: 'Treason',
          definition:
            'The crime of betraying one’s sovereign or country, punishable in Tudor England by public execution.',
          phonetic: 'TREE-zun',
          syllables: 'Trea-son',
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
      ],

      // Academic Historical Narrative: 5-Stage Decimal Standard (1.1–1.5)
      narrative_blocks: [
        {
          act: 1,
          title: '1.1 The Spark at Wittenberg (1517–1521)',
          text: '<span class="para-ref">[1.1]</span> In October 1517, a furious German monk named Martin Luther stormed up to the castle church in Wittenberg and nailed 95 fiery arguments to the oak door. Luther was disgusted by corrupt Catholic friars selling an <strong>indulgence</strong>—a printed certificate promising wealthy sinners that their deceased relatives would escape the agony of <strong>Purgatory</strong> for cash. Thanks to the newly invented printing press, Luther’s ideas swept across Europe like wildfire, triggering the Protestant <strong>Reformation</strong>. Luther boldly declared that ordinary Christians did not need priests or Latin rituals to reach God: faith and the Bible in their own language were enough. The Pope condemned Luther for wicked <strong>heresy</strong>, but German princes sheltered him, fracturing Western Christendom forever.',
          source: {
            letter: 'A',
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
        },
        {
          act: 2,
          title: '1.2 The King’s Dynastic Crisis (1525–1527)',
          text: '<span class="para-ref">[1.2]</span> Across the English Channel, King Henry VIII initially despised Luther, writing a book defending the Catholic sacraments that earned him the papal title <em>Defender of the Faith</em>. But by 1527, Henry faced an agonizing <strong>dynastic</strong> emergency. His Spanish wife, Catherine of Aragon, was past forty and had produced only one living child: a girl, Princess Mary. Convinced that England would collapse into bloody civil war without a legitimate male heir, Henry fell passionately in love with the clever, reform-minded Anne Boleyn. Believing his marriage was cursed by God because Catherine had previously been married to his deceased brother Arthur, Henry demanded an official <strong>annulment</strong> from Rome to ensure the Tudor royal <strong>succession</strong>.',
        },
        {
          act: 3,
          title: '1.3 The Roman Deadlock (1527–1529)',
          text: '<span class="para-ref">[1.3]</span> Normally, popes readily granted royal divorces for allied kings, but Pope Clement VII was hopelessly trapped. In May 1527, the mutinous imperial armies of Holy Roman Emperor Charles V—Catherine of Aragon’s powerful nephew—sacked Rome and held the Pope hostage in Castel Sant’Angelo. Charles warned the <strong>papacy</strong> that granting Henry an annulment would bring total destruction upon Italy. For two agonising years, Henry’s chief minister, Cardinal Thomas Wolsey, attempted desperate legal manoeuvres in London to prove English legal <strong>sovereignty</strong>. When Clement VII abruptly revoked the case back to Rome in 1529, Wolsey was stripped of his titles and arrested, leaving Henry’s marriage unresolved and his royal pride deeply wounded.',
        },
        {
          act: 4,
          title: '1.4 Cromwell’s Parliamentary Siege (1529–1533)',
          text: '<span class="para-ref">[1.4]</span> Following Wolsey’s downfall, a brilliant, ruthless lawyer named Thomas Cromwell showed Henry how to cut the Roman knot. Cromwell argued that Henry did not need papal permission: England was an independent "Empire," answerable to no foreign bishop. Between 1529 and 1533, Cromwell used the Reformation Parliament to pass a series of revolutionary <strong>statute</strong> laws. Parliament forced the English clergy to submit to royal control and cut off Church taxes to Rome. In 1533, the landmark Act in Restraint of Appeals banned all legal appeals to the Pope. Archbishop Thomas Cranmer immediately declared Henry’s marriage to Catherine null and void, and crowned Anne Boleyn Queen of England.',
        },
        {
          act: 5,
          title: '1.5 Royal Supremacy & Monastic Meltdown (1534–1540)',
          text: '<span class="para-ref">[1.5]</span> In November 1534, Parliament passed the historic <strong>Act of Supremacy</strong>, formally declaring King Henry VIII the sole "Supreme Head" of the Church of England. Refusing to swear the mandatory Oath of <strong>Supremacy</strong> was classified as high <strong>treason</strong>; Henry’s revered former Chancellor Sir Thomas More was promptly beheaded for remaining loyal to the Pope. Royal power was immense, but church wealth was even sweeter. Between 1536 and 1540, Cromwell orchestrated the systematic <strong>dissolution</strong> of over 800 Catholic monasteries, abbeys, and nunneries. Henry melted their lead roofs, confiscated their gold chalices, and sold their vast estates to wealthy nobles to fund national coastal defences and continental wars.',
          source: {
            letter: 'B',
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
            citation:
              'Hans Holbein the Younger • Royal Collection / Walker Art Gallery, Liverpool.',
          },
        },
      ],

      // Backwards-Compatible Sources Array
      sources: [
        {
          title: 'Source A: Lucas Cranach the Elder, Portrait of Martin Luther (1529)',
          image: '/images/martin_luther_portrait.jpg',
          caption:
            'Lucas Cranach the Elder’s official portrait of Martin Luther, depicted in an academic scholar’s gown holding the vernacular German Bible.',
          source_context:
            'In October 1517, Martin Luther sparked the Protestant Reformation by nailing his 95 Theses in Wittenberg.',
          how_useful_question:
            'How useful is Source A for an enquiry into how Protestant reformers presented Martin Luther to ordinary Christians across Europe?',
          provenance_clues: [
            'Author: Lucas Cranach the Elder, a close ally of Martin Luther in Wittenberg.',
            'Audience: German townsfolk and scholars deciding whether to break with the Pope.',
            'Motive: To portray Luther as a dignified, pious scholar guided solely by Holy Scripture.',
          ],
          hinge_question:
            'Hinge Question: Does Cranach present Luther as a dangerous rebel or as a holy scholar restoring pure faith?',
          citation: 'Lucas Cranach Workshop • Germanisches Nationalmuseum, Nuremberg.',
        },
        {
          title:
            'Source B: Hans Holbein the Younger, Whitehall Mural Portrait of King Henry VIII (c. 1537)',
          image: '/images/henry_viii.jpg',
          caption:
            'Hans Holbein’s colossal full-length Whitehall mural portrait of Henry VIII: feet planted wide, gripping his dagger.',
          source_context:
            'Commissioned shortly after the 1534 Act of Supremacy made Henry the Supreme Head of the Church of England.',
          how_useful_question:
            'How useful is Source B for an enquiry into how Henry VIII projected supreme royal authority after breaking with the Pope?',
          provenance_clues: [
            'Author: Hans Holbein the Younger, royal court painter on the Crown payroll.',
            'Audience: Visiting foreign ambassadors and English nobles entering Whitehall Palace.',
            'Motive: To project unshakeable sovereign power, immense wealth, and masculine strength.',
          ],
          hinge_question:
            'Hinge Question: Why did Holbein paint Henry VIII standing colossal and gripping a dagger rather than kneeling humbly in prayer?',
          citation: 'Hans Holbein the Younger • Royal Collection / Walker Art Gallery, Liverpool.',
        },
      ],

      // Structured Pedagogical Guidance for Teachers
      teacher_notes: {
        primer:
          'This enquiry investigates the multi-causal catalysts behind Henry VIII’s Break with Rome. Students must evaluate how religious ideology (Lutheran anti-papalism), dynastic anxiety (lack of a male heir with Catherine of Aragon), international geopolitics (the Sack of Rome by Charles V), and legislative statecraft (Thomas Cromwell’s use of Parliament) converged to create the Royal Supremacy.',
        objectives: [
          {
            objective:
              'Explain how Martin Luther’s 1517 protest shattered Catholic unity across Europe.',
            primer:
              'Guide students through Section 1.1. Draw attention to Luther’s critique of indulgences and purgatory. Use Source A to examine how Cranach visually positioned Luther as a pious scholar rather than an unruly heretic.',
            question:
              'Why did printing the Bible in everyday German threaten the institutional power of Catholic priests?',
          },
          {
            objective:
              'Analyse why the dynastic succession made an annulment an existential crisis for Henry VIII.',
            primer:
              'Examine Section 1.2. Emphasize Henry’s genuine fear of another civil war like the Wars of the Roses if he died without a male heir.',
            question:
              'Why did Henry believe that the lack of a surviving son was divine punishment rather than natural misfortune?',
          },
          {
            objective:
              'Evaluate how Thomas Cromwell used parliamentary statutes to establish Royal Supremacy.',
            primer:
              'Direct pupils to Sections 1.4 and 1.5. Contrast Wolsey’s failed papal appeals with Cromwell’s revolutionary doctrine of national empire and statute law.',
            question:
              'How did passing the Act of Supremacy through Parliament give Henry’s personal religious power greater legal legitimacy?',
          },
        ],
      },

      // End-of-Narrative Extended Disciplinary Writing Task
      tasks: [
        {
          type: 'extended_writing',
          topic: 'Disciplinary Enquiry Task: Causation & Motivation [12 Marks]',
          question:
            'Explain why King Henry VIII broke with Rome in the period 1527–1534. Evaluate which motive was decisive: his dynastic need for a male heir, financial greed for church wealth, or craving for absolute royal sovereignty.',
          hints: [
            'Point: State your central thesis: evaluate whether dynastic panic, financial greed, or royal power was the primary spark.',
            'Evidence: Deploy specific factual evidence: Catherine of Aragon, Anne Boleyn, the 1534 Act of Supremacy, and the Dissolution of 800 Monasteries (1536–1540).',
            'Explanation: Explain how these factors interacted: show how Henry used Protestant legal ideas purely to serve his political and dynastic needs.',
            'Link: Conclude decisively: explain why one factor was the non-negotiable catalyst that drove the Break with Rome.',
          ],
          model_answer:
            'King Henry VIII’s Break with Rome in 1534 was driven by three interconnected motives, but his dynastic desperation for a legitimate male heir was the decisive catalyst. Initially, Henry was a staunch orthodox Catholic who defended the Pope against Martin Luther, earning the papal title Defender of the Faith. However, by 1527 Catherine of Aragon had failed to produce a male heir, leaving only Princess Mary. Henry was terrified that without a male successor, England would plunge into a catastrophic civil war akin to the Wars of the Roses. When Pope Clement VII refused to annul the marriage due to captivity under Charles V, Thomas Cromwell used Parliament to pass the Act of Supremacy (1534), declaring Henry Supreme Head of the Church of England. While the subsequent Dissolution of the Monasteries (1536–1540) satisfied Henry’s financial greed and funded coastal fortresses, this financial seizure was an opportunistic consequence rather than the initial spark. Ultimately, Henry broke with Rome because dynastic survival demanded a male heir with Anne Boleyn, forcing him to seize absolute sovereign power from the Pope.',
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

      // Plenary Retrieval Quiz: 8 Multiple-Choice Retrieval Questions (Balanced 2A / 2B / 2C / 2D)
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
            'The 1534 Act of Supremacy established Royal Supremacy, breaking all legal ties with the Pope.',
        },
        {
          question:
            'Which former Lord Chancellor was executed in 1535 for refusing to swear the Oath of Supremacy?',
          options: ['Thomas Cromwell', 'Cardinal Wolsey', 'Sir Thomas More', 'Thomas Cranmer'],
          answer: 2,
          explanation:
            'Sir Thomas More refused to accept Henry as head of the Church and was beheaded for treason at Tower Hill.',
        },
        {
          question:
            'What happened to over 800 Catholic monasteries and abbeys across England between 1536 and 1540?',
          options: [
            'They were handed over to German Lutheran monks',
            'They were dissolved, looted, and their lands sold by the Crown',
            'They were granted full independence from Parliament',
            'They were converted into free public universities',
          ],
          answer: 1,
          explanation:
            'Through the Dissolution of the Monasteries, Henry seized vast monastic estates and gold to fund his navy and foreign wars.',
        },
        {
          question:
            'Which imperial ruler held Pope Clement VII captive in Rome in 1527, blocking Henry’s annulment?',
          options: [
            'King Francis I of France',
            'Emperor Charles V',
            'King Philip II of Spain',
            'Sultan Suleiman the Magnificent',
          ],
          answer: 1,
          explanation:
            'Charles V was Catherine of Aragon’s nephew; his army sacked Rome in 1527, preventing the Pope from granting Henry’s divorce.',
        },
      ],
    },

    // ------------------------------------------------------------------------
    // LESSON 2: Elizabeth I & The Middle Way
    // ------------------------------------------------------------------------
    {
      id: 'lesson_2',
      title: 'Elizabeth I & The Middle Way (1558–1588)',
      enquiry: 'How did Elizabeth I navigate religious divisions through the 1559 Via Media?',
      subtitle: 'From the Fires of Smithfield to the Golden Age Settlement',
      skill: 'Historical Significance & Compromise',
      banner: {
        image: '/images/elizabeth_coronation_portrait.jpg',
        caption:
          'Queen Elizabeth I in her coronation robes: forging a Protestant nation while avoiding civil war.',
      },
      margin_spine: [
        { year: '1558', label: '2.1 Fractured Kingdom' },
        { year: '1559', label: '2.2 Supreme Governor' },
        { year: '1559', label: '2.3 The Via Media' },
        { year: '1570', label: '2.4 Papal Excommunication' },
        { year: '1587', label: '2.5 Babington & Mary' },
      ],
      did_you_know:
        'Elizabeth I famously proclaimed she had "no desire to make windows into men’s souls"—meaning she did not care what her subjects secretly believed in their private hearts, so long as they outwardly attended Church of England services on Sundays and paid their 12d recusancy fines!',

      do_now: {
        type: 'questions',
        items: [
          {
            question: 'In what year did Henry VIII pass the Act of Supremacy to break with Rome?',
            answer: '1534.',
          },
          {
            question:
              'What corrupt certificates sold by the Catholic Church did Martin Luther attack in 1517?',
            answer: 'Indulgences.',
          },
          {
            question: 'Which Spanish queen did Henry VIII divorce to marry Anne Boleyn?',
            answer: 'Catherine of Aragon.',
          },
          {
            question:
              'What title did the Pope award Henry VIII in 1521 for defending the sacraments?',
            answer: 'Defender of the Faith (Fidei Defensor).',
          },
          {
            question: 'What happened to over 800 English monasteries between 1536 and 1540?',
            answer: 'They were dissolved and their wealth was confiscated by the Crown.',
          },
        ],
      },

      vocabulary: [
        {
          term: 'Persecution',
          definition:
            'Hostility and ill-treatment of a group of people, especially because of their religious beliefs.',
          phonetic: 'per-suh-KYOO-shun',
          syllables: 'Per-se-cu-tion',
          tier: '2',
        },
        {
          term: 'Martyr',
          definition:
            'A person killed or executed because of their refusal to renounce their religious faith.',
          phonetic: 'MAR-ter',
          syllables: 'Mar-tyr',
          tier: '3',
        },
        {
          term: 'Supreme Governor',
          definition:
            'The compromise legal title chosen by Elizabeth I in 1559 to appease Catholics and Puritans.',
          phonetic: 'soo-PREEM GUV-er-ner',
          syllables: 'Su-preme Gov-er-nor',
          tier: '3',
        },
        {
          term: 'Compromise',
          definition:
            'An agreement or settlement of a dispute reached by each side making mutual concessions.',
          phonetic: 'KOM-pruh-myz',
          syllables: 'Com-pro-mise',
          tier: '2',
        },
        {
          term: 'Via Media',
          definition:
            'Latin for "The Middle Way": Elizabeth I’s strategic policy of balancing Protestant and Catholic practices.',
          phonetic: 'VEE-uh MEE-dee-uh',
          syllables: 'Vi-a Me-di-a',
          tier: '3',
        },
        {
          term: 'Uniformity',
          definition:
            'The state of being identical, requiring all churches across the kingdom to follow the exact same prayer book.',
          phonetic: 'yoo-nih-FOR-mih-tee',
          syllables: 'U-ni-for-mi-ty',
          tier: '2',
        },
        {
          term: 'Recusant',
          definition:
            'A person (almost always Catholic) who refused to attend compulsory Church of England services on Sundays.',
          phonetic: 'REK-yoo-zunt',
          syllables: 'Rec-u-sant',
          tier: '3',
        },
        {
          term: 'Excommunication',
          definition:
            'An official decree by the Pope expelling someone from the Catholic Church and declaring them damned.',
          phonetic: 'eks-kuh-myoo-nih-KAY-shun',
          syllables: 'Ex-com-mu-ni-ca-tion',
          tier: '3',
        },
        {
          term: 'Papal Bull',
          definition:
            'A formal proclamation, letter, or charter issued by the Pope, bearing an authentic lead seal (bulla).',
          phonetic: 'PAY-pul BOOL',
          syllables: 'Pa-pal Bull',
          tier: '3',
        },
        {
          term: 'Espionage',
          definition:
            'The practice of spying or using secret agents to uncover government treason and foreign plots.',
          phonetic: 'ES-pee-uh-nahzh',
          syllables: 'Es-pi-o-nage',
          tier: '2',
        },
        {
          term: 'Cipher',
          definition:
            'A secret code or mathematical system of writing used to disguise the meaning of conspiratorial letters.',
          phonetic: 'SY-fer',
          syllables: 'Ci-pher',
          tier: '2',
        },
      ],

      narrative_blocks: [
        {
          act: 1,
          title: '2.1 A Fractured Kingdom (1558–1559)',
          text: '<span class="para-ref">[2.1]</span> When twenty-five-year-old Elizabeth Tudor inherited the throne in November 1558, England was exhausted by twenty-five years of terrifying religious turmoil. Under her half-brother Edward VI, radical Protestants had smashed stained-glass windows, whitewashed medieval church walls, and stripped gold altars. Then, under her strict Catholic half-sister Mary I, the Pope’s authority was restored with brutal <strong>persecution</strong>. Mary burned over 280 Protestant men, women, and bishops at the stake—creating celebrated national <strong>martyr</strong> heroes like Cranmer, Latimer, and Ridley. Elizabeth inherited a bitter, traumatised nation on the brink of civil war, surrounded by hostile Catholic superpowers in France and Spain who regarded her as an illegitimate heretic.',
        },
        {
          act: 2,
          title: '2.2 Restoring Control: Supreme Governor (1559)',
          text: '<span class="para-ref">[2.2]</span> Elizabeth was a moderate Protestant, but she was above all an exceptionally shrewd politician. In January 1559, she summoned Parliament to construct a lasting religious settlement. Her first landmark statute was the new Act of Supremacy. Instead of reclaiming Henry VIII’s provocative title of "Supreme Head," Elizabeth agreed to a diplomatic <strong>compromise</strong>, adopting the softer title of <strong>Supreme Governor</strong> of the Church of England. This clever wording defused Catholic theological objections that only Jesus Christ or the Pope could be head of the Church, while placating Puritan Protestants who fiercely opposed a woman holding spiritual supremacy over male bishops. All clergy were required to swear an oath accepting her governance or forfeit their jobs.',
        },
        {
          act: 3,
          title: '2.3 The Via Media & The Prayer Book (1559)',
          text: '<span class="para-ref">[2.3]</span> Alongside her supremacy, Elizabeth passed the 1559 Act of <strong>Uniformity</strong>, forging her famous <strong>Via Media</strong>—the "Middle Way." Church was made compulsory: every subject had to attend English Protestant services every Sunday or pay a steep 12d fine as a <strong>recusant</strong>. However, to avoid alienating Catholic subjects, the 1559 Book of Common Prayer deliberately retained traditional priestly vestments, church music, and ambiguous communion wording. A Catholic worshipper could take communion believing in the Real Presence of Christ, while a Protestant could take it as a simple remembrance. Elizabeth famously refused to "make windows into men’s souls"—demanding public loyalty rather than policing private conscience.',
          source: {
            letter: 'A',
            title: 'Source A: Title Page Woodcut of the Bishops’ Bible (1568)',
            image: '/images/queen_mary_i_mary_tudor.jpg',
            caption:
              'Contemporary portrait of Queen Mary I ("Bloody Mary"), whose systematic burning of Protestant martyrs created deep-seated anti-Catholic fear across Elizabethan England.',
            source_context:
              'Between 1553 and 1558, Mary I attempted to violently stamp out Protestantism, burning over 280 people at Smithfield. When Elizabeth came to power, she used public memory of these Marian burnings to justify her compromise Middle Way.',
            how_useful_question:
              'How useful is Source A for an enquiry into why Elizabeth I sought a compromise religious settlement in 1559?',
            provenance_clues: [
              'Author: Antonis Mor, official court portraitist to Mary I and Philip II of Spain.',
              'Audience: European royal courts, intended to project strict Catholic piety and dynastic Habsburg strength.',
              'Motive: To display Mary’s unwavering Catholic devotion and authoritative royal majesty.',
            ],
            hinge_question:
              'Hinge Question: Why did the memory of Mary I’s burnings make Elizabeth I determined to avoid extreme religious persecution in 1559?',
            citation: 'Antonis Mor • Museo del Prado, Madrid.',
          },
        },
        {
          act: 4,
          title: '2.4 The Catholic Storm Gathers (1568–1570)',
          text: '<span class="para-ref">[2.4]</span> Elizabeth’s delicate peace could not last. In 1568, her charismatic Catholic cousin Mary Queen of Scots fled a rebellion in Scotland and arrived in England seeking sanctuary. As next in line to the English throne, Mary instantly became a magnet for Catholic conspirators. In 1569, Catholic nobles in northern England launched the Northern Earls Rebellion to depose Elizabeth and crown Mary. The revolt was crushed, but in 1570, Pope Pius V dropped a theological bomb: he issued a formal <strong>papal bull</strong> named <em>Regnans in Excelsis</em>, declaring the <strong>excommunication</strong> of Elizabeth. The Pope ordered all loyal Catholics to disobey Elizabeth, effectively turning practicing English Catholics into suspected traitors.',
        },
        {
          act: 5,
          title: '2.5 Spies, Ciphers & The Scaffold (1571–1588)',
          text: '<span class="para-ref">[2.5]</span> With Elizabeth’s life under constant threat from foreign Catholic assassins and Jesuit infiltration, her brilliant spymaster Sir Francis Walsingham established an elite network of <strong>espionage</strong> across Europe. Walsingham’s cryptographers intercepted conspiratorial letters written in secret <strong>cipher</strong>, culminating in the 1586 Babington Plot. Deciphered letters proved that Mary Queen of Scots had explicitly approved Elizabeth’s assassination. In February 1587, Elizabeth reluctantly signed Mary’s death warrant; the Scottish queen was beheaded at Fotheringhay Castle. Outraged by the execution of a Catholic queen, King Philip II of Spain ordered his colossal Armada to sail for England, testing Elizabeth’s Protestant nation in total war.',
          source: {
            letter: 'B',
            title:
              'Source B: George Gower (attr.), The Armada Portrait of Queen Elizabeth I (c. 1588)',
            image: '/images/armada_portrait.jpg',
            caption:
              'The celebrated Armada Portrait of Elizabeth I: her hand resting upon the globe, pearls of purity adorning her dress, flanked by scenes of the English victory over the Spanish fleet.',
            source_context:
              'Painted immediately following the defeat of the Spanish Armada in 1588, this masterwork served as triumphant state propaganda, celebrating Elizabeth’s providential Protestant victory and global naval ambition.',
            how_useful_question:
              'How useful is Source B for an enquiry into how Elizabeth I projected her authority after surviving Catholic assassination plots and foreign invasion?',
            provenance_clues: [
              'Author: Attributed to George Gower, Serjeant Painter to Queen Elizabeth I.',
              'Audience: English nobility, courtiers, and foreign ambassadors visiting the royal court.',
              'Motive: To immortalize Elizabeth as a divine Protestant champion, protected by God Almighty, who had humbled Catholic Spain.',
            ],
            hinge_question:
              'Hinge Question: Why is Elizabeth’s hand placed deliberately over the Americas on the globe rather than on an English map?',
            citation: 'Woburn Abbey Collection / National Maritime Museum, Greenwich.',
          },
        },
      ],

      sources: [
        {
          title: 'Source A: Portrait of Queen Mary I ("Bloody Mary")',
          image: '/images/queen_mary_i_mary_tudor.jpg',
          caption:
            'Contemporary portrait of Queen Mary I, whose systematic burning of Protestant martyrs created deep anti-Catholic fear across England.',
          source_context:
            'Between 1553 and 1558, Mary I attempted to stamp out Protestantism, burning over 280 people at the stake.',
          how_useful_question:
            'How useful is Source A for an enquiry into why Elizabeth I sought a compromise religious settlement in 1559?',
          provenance_clues: [
            'Author: Antonis Mor, court painter to Mary I and Philip II.',
            'Audience: European courts and English subjects.',
            'Motive: To project severe Catholic piety and unshakeable royal authority.',
          ],
          hinge_question:
            'Hinge Question: Why did the memory of Mary I’s burnings make Elizabeth determined to avoid extreme religious persecution in 1559?',
          citation: 'Antonis Mor • Museo del Prado, Madrid.',
        },
        {
          title: 'Source B: The Armada Portrait of Queen Elizabeth I (c. 1588)',
          image: '/images/armada_portrait.jpg',
          caption:
            'The celebrated Armada Portrait of Elizabeth I: hand on the globe, pearls of purity, flanked by the defeated Spanish fleet.',
          source_context:
            'Painted following the 1588 defeat of the Spanish Armada as triumphant state propaganda.',
          how_useful_question:
            'How useful is Source B for an enquiry into how Elizabeth I projected authority after surviving foreign invasion?',
          provenance_clues: [
            'Author: George Gower (attributed), Serjeant Painter to the Queen.',
            'Audience: English nobles and foreign ambassadors.',
            'Motive: To celebrate providential Protestant triumph and global English power.',
          ],
          hinge_question:
            'Hinge Question: Why is Elizabeth’s hand placed deliberately over the Americas on the globe?',
          citation: 'Woburn Abbey / National Maritime Museum, Greenwich.',
        },
      ],

      teacher_notes: {
        primer:
          'This enquiry analyses Elizabeth I’s pragmatic statecraft in surviving the "Tudor Rollercoaster." Students must understand the mechanics of the 1559 Religious Settlement (the Via Media), how legislative compromise defused immediate civil rebellion, and how external Catholic hostility (the 1570 Papal Bull, Mary Queen of Scots, and Spanish espionage) forged a fiercely unified Protestant national identity.',
        objectives: [
          {
            objective:
              'Explain why England was religiously fractured in 1558 following Mary I’s reign.',
            primer:
              'Examine Section 2.1. Discuss the psychological impact of Foxe’s Book of Martyrs and how Mary’s 284 burnings linked Roman Catholicism in the popular mind with foreign cruelty.',
            question:
              'Why did Mary’s persecution of Protestants harden resistance rather than restore Catholic loyalty?',
          },
          {
            objective: 'Analyse the key compromises of the 1559 Elizabethan Religious Settlement.',
            primer:
              'Guide students through Sections 2.2 and 2.3. Unpack the difference between "Supreme Head" and "Supreme Governor", and examine how the 1559 Prayer Book allowed ambiguous communion beliefs.',
            question:
              'Why was Elizabeth’s decision not to "make windows into men’s souls" a political masterstroke?',
          },
          {
            objective:
              'Evaluate how foreign plots and papal excommunication transformed English Catholics into suspected traitors.',
            primer:
              'Study Sections 2.4 and 2.5. Highlight Pope Pius V’s bull Regnans in Excelsis and how Walsingham used intercepted ciphers to justify executing Mary Queen of Scots.',
            question:
              'Did the 1570 Papal Bull protect English Catholics or place their lives in mortal danger?',
          },
        ],
      },

      tasks: [
        {
          type: 'extended_writing',
          topic: 'Disciplinary Enquiry Task: Significance & Compromise [8 Marks]',
          question:
            'Explain the importance of the Elizabethan Religious Settlement (1559) for religious stability in England. Evaluate whether the Via Media succeeded because it was a genuine religious compromise or because Elizabeth enforced strict legal obedience.',
          hints: [
            'Point: State your thesis: explain how the Via Media avoided immediate civil war while securing the Protestant state.',
            'Evidence: Detail specific terms: "Supreme Governor", the 1559 Book of Common Prayer, 12d recusancy fines, and outward conformity.',
            'Explanation: Explain how allowing private ambiguity while demanding public uniformity prevented moderate Catholics from rebelling.',
            'Link: Evaluate the long-term impact: explain how papal excommunication (1570) eventually disrupted this delicate compromise.',
          ],
          model_answer:
            'The Elizabethan Religious Settlement of 1559 was of paramount importance for securing political and religious stability in sixteenth-century England. Following the bloody swings between Edward VI’s radical Protestantism and Mary I’s burning of 284 heretics, Elizabeth inherited a nation on the brink of sectarian civil war. Her settlement succeeded primarily because it was a masterclass in strategic compromise. By adopting the title "Supreme Governor" rather than Henry VIII’s "Supreme Head", Elizabeth mollified Catholic theological objections while satisfying Protestant reformers. Furthermore, the 1559 Act of Uniformity established the Via Media: church services were compulsory and conducted in English, yet traditional vestments and ambiguous communion wording were retained so moderate Catholics could attend without violating conscience. By demanding outward conformity enforced through manageable 12d recusancy fines rather than executing dissidents for their private thoughts, Elizabeth successfully neutralized domestic rebellion for over a decade. Although the 1570 Papal Bull eventually polarized religious identities, the 1559 settlement laid the permanent constitutional foundation for the modern Church of England.',
        },
      ],

      right_page_task: {
        skill_title: 'Disciplinary Skill: Significance & Compromise',
        instructions:
          'Elizabeth I famously walked a political tightrope between radical Puritans and orthodox Catholics. Analyse how her 1559 Settlement managed to keep peace for thirty years.',
        visual_source: {
          image: '/images/armada_portrait.jpg',
          title: 'Source B: The Armada Portrait of Elizabeth I (c. 1588)',
          caption:
            'The Armada Portrait depicts Elizabeth victorious over Spanish Catholic forces, her hand resting on the globe.',
          question:
            'What symbols in Source B show that Elizabeth saw Protestant England as a divinely protected world power?',
        },
        written_task_prompt:
          'Explain one way Elizabeth I’s religious policy in 1559 was different from Mary I’s policy (1553–1558). [4 marks]',
      },

      quiz: [
        {
          question:
            'What title did Elizabeth I adopt in the 1559 Act of Supremacy to appease Catholics and Puritans?',
          options: [
            'Defender of the Faith',
            'Supreme Head',
            'Supreme Governor',
            'High Protector of the Realm',
          ],
          answer: 2,
          explanation:
            'Elizabeth chose "Supreme Governor", a title that avoided claiming spiritual authority over Christ.',
        },
        {
          question:
            'Approximately how many Protestant martyrs did Queen Mary I burn at the stake during her reign?',
          options: ['Over 280', 'Fewer than 15', 'Exactly 1,200', 'None'],
          answer: 0,
          explanation:
            'Mary I burned approximately 284 Protestants, creating celebrated national martyrs.',
        },
        {
          question:
            'What fine was imposed on recusants who refused to attend Church of England services on Sundays?',
          options: [
            '£100 gold coins',
            'One shilling (12 pence)',
            'Loss of all land',
            'Two weeks in prison',
          ],
          answer: 1,
          explanation:
            'The 1559 Act of Uniformity imposed a 12d fine per missed Sunday, intended as an annoyance rather than execution.',
        },
        {
          question:
            'What was the Latin name for Elizabeth’s strategic religious compromise between Protestantism and Catholicism?',
          options: ['Magna Carta', 'Habeas Corpus', 'Pax Romana', 'Via Media'],
          answer: 3,
          explanation:
            'Via Media ("The Middle Way") balanced Protestant national doctrine with traditional ceremonies.',
        },
        {
          question:
            'Which Catholic cousin fled Scotland in 1568 and became a figurehead for plots against Elizabeth?',
          options: [
            'Mary Queen of Scots',
            'Catherine of Aragon',
            'Lady Jane Grey',
            'Princess Margaret Tudor',
          ],
          answer: 0,
          explanation:
            'Mary Queen of Scots was next in line to the throne and inspired repeated Catholic assassination conspiracies.',
        },
        {
          question:
            'In what year did Pope Pius V issue the Papal Bull Regnans in Excelsis excommunicating Elizabeth?',
          options: ['1588', '1570', '1534', '1603'],
          answer: 1,
          explanation:
            'The 1570 Papal Bull declared Elizabeth a heretic and commanded English Catholics to disobey her.',
        },
        {
          question:
            'Who served as Elizabeth I’s ruthless Principal Secretary and spymaster, uncovering the Babington Plot?',
          options: [
            'Sir Francis Drake',
            'Sir Walter Raleigh',
            'Sir Francis Walsingham',
            'Lord Burghley',
          ],
          answer: 2,
          explanation:
            'Walsingham ran an extensive European espionage network, using ciphers to catch conspirators.',
        },
        {
          question: 'Where was Mary Queen of Scots beheaded for high treason in February 1587?',
          options: ['Tower of London', 'Fotheringhay Castle', 'Edinburgh Castle', 'Windsor Castle'],
          answer: 1,
          explanation:
            'Mary was tried and executed in the Great Hall of Fotheringhay Castle in Northamptonshire.',
        },
      ],
    },

    // ------------------------------------------------------------------------
    // LESSON 3: The Spanish Armada & Naval Power
    // ------------------------------------------------------------------------
    {
      id: 'lesson_3',
      title: 'The Spanish Armada & Naval Warfare (1588)',
      enquiry: 'Why was Philip II’s Armada defeated, and how did naval strategy transform warfare?',
      subtitle: 'From Drake’s Fireships to the Protestant Wind',
      skill: 'Causation & Strategic Evaluation',
      banner: {
        image: '/images/spanish_armada_battle.jpg',
        caption:
          'The Spanish Armada shattered at Gravelines: English race-built galleons pounding Philip II’s warships.',
      },
      margin_spine: [
        { year: '1585', label: '3.1 Catholic Crusade' },
        { year: '1587', label: '3.2 Cadiz Singeing' },
        { year: '1588', label: '3.3 Channel Standoff' },
        { year: '1588', label: '3.4 Calais Fireships' },
        { year: '1588', label: '3.5 The Protestant Wind' },
      ],
      did_you_know:
        'When Francis Drake raided Cadiz in 1587, he didn’t just burn Spanish galleons—he burned thousands of seasoned wooden barrel staves! As a result, the Spanish Armada had to store food and fresh water in unseasoned green wood barrels, which rotted food, spoiled water, and gave thousands of Spanish sailors violent food poisoning before they ever reached England!',

      do_now: {
        type: 'questions',
        items: [
          {
            question: 'What title did Elizabeth I adopt in 1559 instead of "Supreme Head"?',
            answer: 'Supreme Governor.',
          },
          {
            question:
              'What Latin phrase described Elizabeth’s compromise between Protestant and Catholic practices?',
            answer: 'The Via Media (The Middle Way).',
          },
          {
            question:
              'What were English Catholics called who refused to attend compulsory Sunday services?',
            answer: 'Recusants.',
          },
          {
            question:
              'Which Scottish Catholic queen was beheaded in 1587 for plotting to assassinate Elizabeth?',
            answer: 'Mary Queen of Scots.',
          },
          {
            question: 'In what year was the Act of Supremacy passed by Henry VIII?',
            answer: '1534.',
          },
        ],
      },

      vocabulary: [
        {
          term: 'Crusade',
          definition:
            'A religious holy war sanctioned by the Church to defend or restore the faith against heretics.',
          phonetic: 'kroo-SAYD',
          syllables: 'Cru-sade',
          tier: '3',
        },
        {
          term: 'Privateer',
          definition:
            'An armed, privately owned warship commissioned by a government to raid enemy merchant shipping.',
          phonetic: 'pry-vuh-TEER',
          syllables: 'Pri-va-teer',
          tier: '3',
        },
        {
          term: 'Galleon',
          definition:
            'A large, multi-decked sailing ship used as an armed cargo carrier or warship from the 16th century.',
          phonetic: 'GAL-ee-un',
          syllables: 'Gal-le-on',
          tier: '3',
        },
        {
          term: 'Logistics',
          definition:
            'The detailed coordination and management of complex military operations, supplies, and food at sea.',
          phonetic: 'luh-JIS-tiks',
          syllables: 'Lo-gis-tics',
          tier: '2',
        },
        {
          term: 'Culverin',
          definition:
            'A long-barrelled naval cannon designed to fire heavy iron cannonballs accurately over great distances.',
          phonetic: 'KUL-ver-in',
          syllables: 'Cul-ver-in',
          tier: '3',
        },
        {
          term: 'Broadside',
          definition:
            'The simultaneous firing of all artillery guns mounted along one side of a warship.',
          phonetic: 'BRAWD-syd',
          syllables: 'Broad-side',
          tier: '3',
        },
        {
          term: 'Fireship',
          definition:
            'A wooden ship packed with gunpowder, pitch, and tar, set ablaze and steered into anchored enemy fleets.',
          phonetic: 'FYR-ship',
          syllables: 'Fire-ship',
          tier: '3',
        },
        {
          term: 'Anchorage',
          definition:
            'A sheltered area of water near the coast suitable for ships to drop their heavy iron anchors.',
          phonetic: 'ANG-ker-ij',
          syllables: 'An-chor-age',
          tier: '2',
        },
        {
          term: 'Providence',
          definition:
            'The protective care and direct intervention of God in human affairs and historical battles.',
          phonetic: 'PROV-ih-duns',
          syllables: 'Prov-i-dence',
          tier: '2',
        },
      ],

      narrative_blocks: [
        {
          act: 1,
          title: '3.1 The Catholic Crusade (1585–1587)',
          text: '<span class="para-ref">[3.1]</span> By the mid-1580s, war between Protestant England and Catholic Spain was inevitable. King Philip II ruled the mightiest empire on earth, enriched by American silver, and viewed invading England as a sacred <strong>crusade</strong> to eradicate Protestantism. Philip was outraged by English sea-captains like Francis Drake raiding Spanish treasure fleets as an authorised <strong>privateer</strong>, and infuriated that Elizabeth was sending troops to aid Dutch rebels against Spanish rule. The February 1587 execution of the Catholic Mary Queen of Scots was the final insult. Philip ordered the construction of the "Enterprise of England": a colossal fleet of 130 warships and 30,000 men designed to sail up the Channel, transport the Duke of Parma’s battle-hardened army from Flanders, and overthrow Elizabeth.',
        },
        {
          act: 2,
          title: '3.2 Singeing the King’s Beard (April 1587)',
          text: '<span class="para-ref">[3.2]</span> Before the Spanish fleet could assemble, Sir Francis Drake struck a devastating pre-emptive blow. In April 1587, Drake sailed four Royal Navy warships audaciously into Spain’s chief naval harbour at Cadiz. In a whirlwind 36-hour attack, Drake destroyed over thirty Spanish transports and captured immense supplies. He triumphantly boasted to Queen Elizabeth that he had "singed the King of Spain’s beard." Far more critically, Drake burned thousands of tons of seasoned oak barrel staves. This catastrophic blow to Spanish naval <strong>logistics</strong> delayed the invasion by a full year, forcing the Spanish to store their provisions in unseasoned green wood barrels that leaked fresh water and rotted food long before reaching England.',
          source: {
            letter: 'A',
            title: 'Source A: Contemporary Chart of Sir Francis Drake’s Raid on Cadiz (1587)',
            image: '/images/spanish_armada.jpg',
            caption:
              'Contemporary chart depicting Sir Francis Drake’s daring attack on the Spanish harbour of Cadiz in April 1587, burning thirty warships and crippling Spanish supplies.',
            source_context:
              'Drake’s raid on Cadiz destroyed vital barrel staves and delayed the Armada until 1588. Without this pre-emptive strike, England would have faced an invasion before its coastal defences were prepared.',
            how_useful_question:
              'How useful is Source A for an enquiry into the military and strategic significance of Francis Drake’s raid on Cadiz?',
            provenance_clues: [
              'Author: English cartographer working for the Admiralty / Sir Francis Drake.',
              'Audience: Queen Elizabeth I and the Privy Council, assessing Spanish naval losses.',
              'Motive: To demonstrate the supreme effectiveness of English standoff naval raids against static harbour targets.',
            ],
            hinge_question:
              'Hinge Question: Why did destroying wooden barrel wood at Cadiz prove more damaging to Spain than sinking warships?',
            citation: 'British Library Maritime Cartographic Manuscripts.',
          },
        },
        {
          act: 3,
          title: '3.3 Channel Standoff & Gun Tactics (July 1588)',
          text: '<span class="para-ref">[3.3]</span> In July 1588, the 130 ships of the Great Armada entered the English Channel, commanded by the reluctant Duke of Medina Sidonia. The Spanish sailed in a disciplined, impenetrable seven-mile-wide crescent formation, designed for traditional naval warfare: grappling enemy ships, boarding them with infantry, and fighting hand-to-hand. But England had revolutionised naval warfare. Under Sir John Hawkins, the Royal Navy had built lower, faster "race-built" galleons. Armed with long-range <strong>culverin</strong> cannons mounted on compact truck carriages, English gunners could deliver a devastating rolling <strong>broadside</strong> from standoff distances and reload three times faster than Spanish gunners, without ever coming close enough to be boarded.',
        },
        {
          act: 4,
          title: '3.4 Midnight Hellburners at Calais (7–8 August 1588)',
          text: '<span class="para-ref">[3.4]</span> On 6 August, Medina Sidonia anchored his fleet off Calais to await the Duke of Parma’s army. But Parma’s troops were blockaded in port by Dutch flyboats and not ready to embark. Sensing a golden opportunity, Drake and Lord Howard executed a terrifying tactical strike. Just after midnight on 7 August, the English steered eight blazing <strong>fireship</strong> vessels—packed with gunpowder, pitch, and ordnance—directly into the crowded Spanish <strong>anchorage</strong>. Terrified Spanish captains panicked, chopped their heavy iron anchor cables, and scattered blindly into the pitch-black night. The unbreakable crescent formation was irrevocably broken, leaving Spanish ships disordered and drifting toward shallow Flemish sandbanks.',
        },
        {
          act: 5,
          title: '3.5 Gravelines & The Protestant Wind (August–September 1588)',
          text: '<span class="para-ref">[3.5]</span> At dawn on 8 August, the English closed in for the decisive Battle of Gravelines. In an eight-hour running battle, English race-built galleons pounded the scattered, anchorless Spanish ships with over 100,000 cannonballs at point-blank range, killing thousands of soldiers and puncturing hulls. Then, divine <strong>providence</strong> intervened. Ferocious south-westerly gales—celebrated across England as the "Protestant Wind"—drove the battered Armada north into the treacherous North Sea. Lacking anchors and starving on foul rations, Spanish captains were forced to circumnavigate Scotland and Ireland. Fierce Atlantic hurricanes smashed dozens of galleons against the rocky Irish cliffs; over 50 ships and 15,000 men perished, turning the invasion into an utter catastrophe.',
          source: {
            letter: 'B',
            title: 'Source B: Nicholas Hilliard (attr.), The Armada Victory Medal (1588)',
            image: '/images/spanish_armada_battle.jpg',
            caption:
              'Contemporary Dutch painting depicting the ferocious close-range naval bombardment at the Battle of Gravelines on 8 August 1588.',
            source_context:
              'Following the fireship panic at Calais, English galleons battered the scattered Spanish fleet at Gravelines, ending Philip II’s hopes of landing an invading army on English soil.',
            how_useful_question:
              'How useful is Source B for an enquiry into the tactics that allowed the English navy to defeat the Spanish Armada?',
            provenance_clues: [
              'Author: Contemporary 16th-century marine painter (Anglo-Dutch school).',
              'Audience: European merchants and Protestant nobility celebrating the defeat of Catholic Spain.',
              'Motive: To capture the chaotic, close-range gunnery duel and dramatize English naval superiority.',
            ],
            hinge_question:
              'Hinge Question: Does the painting attribute the English victory to superior naval artillery or to Spanish panic and chaos?',
            citation: 'National Maritime Museum, Greenwich.',
          },
        },
      ],

      sources: [
        {
          title: 'Source A: Contemporary Chart of Drake’s Raid on Cadiz (1587)',
          image: '/images/spanish_armada.jpg',
          caption:
            'Contemporary chart showing Francis Drake’s raid on Cadiz harbour, burning Spanish transports and barrel supplies.',
          source_context:
            'In April 1587, Drake destroyed 30+ Spanish ships and barrel staves, delaying the invasion until 1588.',
          how_useful_question:
            'How useful is Source A for an enquiry into the strategic impact of Drake’s raid on Cadiz?',
          provenance_clues: [
            'Author: English maritime cartographer working for the Admiralty.',
            'Audience: The Queen and Privy Council assessing naval operations.',
            'Motive: To demonstrate the military value of aggressive standoff naval raids.',
          ],
          hinge_question:
            'Hinge Question: Why was burning seasoned barrel staves so devastating to Spanish sea operations?',
          citation: 'British Library Maritime Cartographic Manuscripts.',
        },
        {
          title: 'Source B: The Battle of Gravelines (8 August 1588)',
          image: '/images/spanish_armada_battle.jpg',
          caption:
            'Contemporary depiction of English galleons bombarding scattered Spanish warships at Gravelines.',
          source_context:
            'At Gravelines, English long-range gunnery and fireship tactics shattered Philip II’s invasion plan.',
          how_useful_question:
            'How useful is Source B for an enquiry into English tactics during the 1588 campaign?',
          provenance_clues: [
            'Author: Anglo-Dutch maritime painter.',
            'Audience: Protestant subjects celebrating the defeat of Catholic Spain.',
            'Motive: To illustrate English gunnery superiority and Spanish naval disarray.',
          ],
          hinge_question:
            'Hinge Question: Does Source B show a traditional boarding battle or modern artillery warfare?',
          citation: 'National Maritime Museum, Greenwich.',
        },
      ],

      teacher_notes: {
        primer:
          'This enquiry moves beyond patriotic myth to evaluate the tactical, technological, and logistical reasons behind the Spanish Armada’s defeat. Students must weigh three competing factors: English naval innovation (race-built galleons and culverins), Spanish logistical and strategic errors (unseasoned barrels, lack of a deep-water port, and fireship panic), and meteorological fortune (the "Protestant Wind").',
        objectives: [
          {
            objective:
              'Explain how Drake’s 1587 raid on Cadiz undermined the Spanish invasion plan.',
            primer:
              'Review Section 3.2. Focus on logistics: explain how burning barrel staves contaminated food and water supplies, weakening Spanish sailors before the voyage began.',
            question:
              'Why did early modern navies depend so heavily on seasoned wooden barrels for survival at sea?',
          },
          {
            objective:
              'Analyse the tactical contrast between Spanish boarding tactics and English standoff broadsides.',
            primer:
              'Contrast the crescent formation with Hawkins’ race-built galleons in Section 3.3. Discuss how truck carriages allowed rapid cannon reloads.',
            question:
              'Why did English refusal to board Spanish ships render the Armada’s 20,000 soldiers almost useless in the Channel?',
          },
          {
            objective: 'Evaluate the decisive impact of the Calais fireships and Atlantic storms.',
            primer:
              'Examine Sections 3.4 and 3.5. Emphasize that cutting anchors at Calais left the Spanish unable to shelter when the storms hit Scotland and Ireland.',
            question:
              'Would the Spanish fleet have survived the Atlantic gales if they had not cut their anchors at Calais?',
          },
        ],
      },

      tasks: [
        {
          type: 'extended_writing',
          topic: 'Disciplinary Enquiry Task: Narrative Causation [8 Marks]',
          question:
            'Write a narrative account analysing the key events of the Spanish Armada campaign in the summer of 1588. Explain why Philip II’s invasion failed, evaluating English naval tactics and the role of severe weather.',
          hints: [
            'Chronology: Structure your narrative across three phases: (1) The Channel crescent and standoff gunnery, (2) The midnight fireships at Calais and Gravelines, (3) The retreat around Scotland and the Atlantic gales.',
            'Causal Connectives: Use analytical links: "Consequently", "As a direct result", "Crucially, this forced", "Ultimately".',
            'Historical Specifics: Deploy precise evidence: race-built galleons, culverins, cutting anchor cables, and the "Protestant Wind".',
            'Analytical Judgment: State clearly whether English tactical innovation or atrocious weather was the decisive factor.',
          ],
          model_answer:
            'The defeat of the Spanish Armada in the summer of 1588 was caused by a combination of English tactical superiority and catastrophic weather. The campaign began in late July when Philip II’s 130 ships entered the English Channel in a formidable defensive crescent formation. Although the Spanish intended to close with English ships and board them with infantry, Sir John Hawkins’ faster, race-built galleons used long-range culverin cannons to deliver rolling broadsides from a standoff distance, keeping the crescent at bay. The decisive turning point occurred on 7 August off Calais. Recognizing that the Spanish fleet was anchored awaiting the Duke of Parma’s troops, Lord Howard and Francis Drake dispatched eight blazing fireships into the anchorage at midnight. Panic-stricken Spanish captains cut their anchor cables to escape the flames, permanently shattering the protective crescent formation. The following morning at the Battle of Gravelines, English galleons pounded the scattered, anchorless Spanish ships at close range. Finally, ferocious south-westerly gales—celebrated as the "Protestant Wind"—drove the damaged fleet into the treacherous North Sea. Lacking anchors, over fifty Spanish galleons were shipwrecked along the rocky coasts of Scotland and Ireland, turning an ambitious invasion into a devastating imperial catastrophe.',
        },
      ],

      right_page_task: {
        skill_title: 'Disciplinary Skill: Narrative Causation',
        instructions:
          'Construct a causal narrative explaining how English tactics and Atlantic weather combined to destroy Philip II’s invasion fleet.',
        visual_source: {
          image: '/images/spanish_armada_battle.jpg',
          title: 'Source B: The Battle of Gravelines (8 August 1588)',
          caption:
            'English galleons pounding scattered Spanish warships following the midnight fireship panic at Calais.',
          question:
            'How did cutting anchor cables at Calais leave Spanish ships helpless when the Battle of Gravelines began?',
        },
        written_task_prompt:
          'Describe one key feature of the English race-built warships designed by Sir John Hawkins. [4 marks]',
      },

      quiz: [
        {
          question:
            'In what year did Sir Francis Drake carry out his raid on Cadiz, "singeing the King of Spain’s beard"?',
          options: ['1588', '1587', '1534', '1570'],
          answer: 1,
          explanation:
            'Drake raided Cadiz in April 1587, burning ships and barrel staves, delaying the Armada by a year.',
        },
        {
          question:
            'What defensive formation did the 130 ships of the Spanish Armada sail in up the English Channel?',
          options: [
            'A wedge formation',
            'A single file line',
            'A crescent formation',
            'A hollow circle',
          ],
          answer: 2,
          explanation:
            'The Armada sailed in an impenetrable seven-mile crescent formation with heavy fighting ships on the wings.',
        },
        {
          question:
            'What weapon did Francis Drake launch at midnight on 7 August 1588 to scatter the Spanish fleet at Calais?',
          options: [
            'Submarines',
            'Greek Fire rockets',
            'Eight blazing fireships',
            'Exploding torpedoes',
          ],
          answer: 2,
          explanation:
            'Eight fireships packed with gunpowder and tar panicked Spanish captains into cutting anchor cables.',
        },
        {
          question:
            'What decisive naval battle took place on 8 August 1588 after the fireships scattered the Armada?',
          options: [
            'The Battle of Trafalgar',
            'The Battle of Gravelines',
            'The Battle of Lepanto',
            'The Battle of Plymouth',
          ],
          answer: 1,
          explanation:
            'At the Battle of Gravelines, English galleons pounded the scattered, anchorless Spanish ships at close range.',
        },
        {
          question:
            'What popular nickname was given to the violent Atlantic storms that wrecked Spanish ships around Scotland and Ireland?',
          options: [
            'The Protestant Wind',
            'Drake’s Gale',
            'The Tudor Hurricane',
            'The Northern Tempest',
          ],
          answer: 0,
          explanation:
            'English Protestants attributed the storm to God’s direct intervention: "God blew and they were scattered."',
        },
        {
          question:
            'Who designed the faster, lower "race-built" galleons that gave the English navy superior maneuverability?',
          options: [
            'Sir Walter Raleigh',
            'Sir John Hawkins',
            'Sir Francis Walsingham',
            'The Earl of Essex',
          ],
          answer: 1,
          explanation:
            'Hawkins rebuilt English warships with lower superstructures and faster lines for standoff artillery fire.',
        },
        {
          question:
            'Which Spanish general’s army in the Netherlands was the Armada supposed to transport across to invade England?',
          options: [
            'The Duke of Alba',
            'The Duke of Medina Sidonia',
            'The Duke of Parma',
            'Hernán Cortés',
          ],
          answer: 2,
          explanation:
            'The Duke of Parma commanded 30,000 veteran Spanish infantry waiting in Flanders to be ferried across.',
        },
        {
          question:
            'Approximately how many of the 130 Spanish ships were destroyed or wrecked during the 1588 campaign?',
          options: ['Fewer than 5', 'Exactly 130', 'Over 50', 'None'],
          answer: 2,
          explanation:
            'Over 50 Spanish ships and approximately 15,000 men were lost, mostly wrecked on the Scottish and Irish coasts.',
        },
      ],
    },

    // ------------------------------------------------------------------------
    // LESSON 4: Civil War, Regicide & The Bill of Rights
    // ------------------------------------------------------------------------
    {
      id: 'lesson_4',
      title: 'The Civil War, Regicide & The Bill of Rights (1642–1689)',
      enquiry:
        'Why did the collision over Divine Right lead to the trial and execution of Charles I?',
      subtitle: 'From the Battle of Naseby to Parliamentary Sovereignty',
      skill: 'Causation & Constitutional Change',
      banner: {
        image: '/images/charles_i_execution.jpg',
        caption:
          'The execution of Charles I outside Whitehall, 30 January 1649: the fall of Divine Right monarchy.',
      },
      margin_spine: [
        { year: '1629', label: '4.1 Eleven Years’ Tyranny' },
        { year: '1642', label: '4.2 Breakdown of Trust' },
        { year: '1645', label: '4.3 Naseby & New Model Army' },
        { year: '1649', label: '4.4 The King on Trial' },
        { year: '1689', label: '4.5 The Bill of Rights' },
      ],
      did_you_know:
        'On the freezing morning of his execution (30 January 1649), King Charles I wore two shirts! He explained that if he shivered from the biting winter cold, the crowd might think he was trembling with fear. He placed his own head upon the chopping block and gave the signal to the executioner himself by stretching out his hands.',

      do_now: {
        type: 'questions',
        items: [
          {
            question: 'In what year was the Spanish Armada defeated off the coast of England?',
            answer: '1588.',
          },
          {
            question:
              'What weapon did Francis Drake launch at midnight off Calais to scatter Spanish ships?',
            answer: 'Fireships.',
          },
          {
            question: 'What title did Elizabeth I adopt in 1559 instead of "Supreme Head"?',
            answer: 'Supreme Governor.',
          },
          {
            question: 'Which king broke away from the Roman Catholic Church in 1534?',
            answer: 'Henry VIII.',
          },
          {
            question: 'What Latin term meant "The Middle Way" in Elizabeth’s religious settlement?',
            answer: 'Via Media.',
          },
        ],
      },

      vocabulary: [
        {
          term: 'Divine Right',
          definition:
            'The belief that a monarch’s authority comes directly from God and that no earthly court or parliament can judge them.',
          phonetic: 'dih-VYN RYT',
          syllables: 'Di-vine Right',
          tier: '3',
        },
        {
          term: 'Personal Rule',
          definition:
            'The period from 1629 to 1640 when King Charles I ruled England without summoning Parliament (the Eleven Years’ Tyranny).',
          phonetic: 'PER-sun-ul ROOL',
          syllables: 'Per-son-al Rule',
          tier: '3',
        },
        {
          term: 'Ship Money',
          definition:
            'An ancient coastal tax that Charles I illegally extended to inland counties without parliamentary consent to raise royal funds.',
          phonetic: 'SHIP MUN-ee',
          syllables: 'Ship Mon-ey',
          tier: '3',
        },
        {
          term: 'Impeachment',
          definition:
            'A formal charge of treason or high crimes brought by Parliament against a royal official or minister.',
          phonetic: 'im-PEECH-munt',
          syllables: 'Im-peach-ment',
          tier: '2',
        },
        {
          term: 'New Model Army',
          definition:
            'Oliver Cromwell’s professional, disciplined Parliamentary force, promoted on military ability rather than aristocratic birth.',
          phonetic: 'NOO MOD-ul AR-mee',
          syllables: 'New Mod-el Ar-my',
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
          term: 'High Treason',
          definition:
            'The crime of betraying the sovereign state or attempting to overthrow its lawful government and constitution.',
          phonetic: 'HY TREE-zun',
          syllables: 'High Trea-son',
          tier: '2',
        },
        {
          term: 'Restoration',
          definition:
            'The return of the hereditary Stuart monarchy under King Charles II in 1660, ending the republican Commonwealth.',
          phonetic: 'res-tuh-RAY-shun',
          syllables: 'Res-to-ra-tion',
          tier: '3',
        },
        {
          term: 'Bill of Rights',
          definition:
            'The landmark 1689 law establishing that the Crown cannot suspend laws, levy taxes, or maintain an army without Parliament.',
          phonetic: 'BIL uv RYTS',
          syllables: 'Bill of Rights',
          tier: '3',
        },
      ],

      narrative_blocks: [
        {
          act: 1,
          title: '4.1 The Eleven Years’ Tyranny (1629–1640)',
          text: '<span class="para-ref">[4.1]</span> In 1625, Charles I inherited the English throne, holding a fanatical belief in the <strong>Divine Right</strong> of Kings. Charles believed he was appointed directly by God Almighty and that no earthly court or parliament had the right to limit his power. When MPs in Parliament challenged his royal policies, Charles dismissed them in 1629, initiating eleven years of absolute <strong>Personal Rule</strong>. To finance his royal court without parliamentary taxation, Charles revived obsolete feudal fines. Most notoriously, he imposed <strong>Ship Money</strong>—an emergency tax traditionally levied on coastal ports during war—and forced inland farming towns to pay it every year in peacetime. When inland MP John Hampden refused to pay in 1637, constitutional outrage erupted across England.',
          source: {
            letter: 'A',
            title:
              'Source A: Contemporary Satirical Broadside on Ship Money and Royal Monopolies (1640)',
            image: '/images/charles_first.jpg',
            caption:
              'Anthony van Dyck’s official court portrait of King Charles I (1636): projecting aristocratic elegance, absolute royal majesty, and the unshakeable doctrine of the Divine Right of Kings.',
            source_context:
              'Van Dyck was paid handsomely to portray Charles I as an untouchable, divinely appointed monarch during his Personal Rule (1629–1640), reinforcing the King’s belief that he answered only to God.',
            how_useful_question:
              'How useful is Source A for an enquiry into how Charles I viewed his royal authority in the decade before the Civil War?',
            provenance_clues: [
              'Author: Sir Anthony van Dyck, Principal Painter in Ordinary to King Charles I.',
              'Audience: The English royal court, noble patrons, and visiting European monarchs.',
              'Motive: To project unshakeable royal majesty, refined dignity, and divine monarchical authority.',
            ],
            hinge_question:
              'Hinge Question: How did Van Dyck’s depiction of Charles I as an untouchable divine monarch widen the political divide between Crown and Parliament?',
            citation: 'Anthony van Dyck • National Gallery, London / Royal Collection.',
          },
        },
        {
          act: 2,
          title: '4.2 The Breakdown of Trust (1640–1642)',
          text: '<span class="para-ref">[4.2]</span> Charles’s attempt to impose English prayer books on Presbyterian Scotland triggered an armed Scottish invasion, bankrupting the Crown. Desperate for war funds, Charles was forced to summon the Long Parliament in November 1640. Furious MPs, led by John Pym, seized control: they outlawed Ship Money, passed an <strong>impeachment</strong> against the King’s chief minister Strafford, and declared that Parliament could not be dissolved without its own consent. In January 1642, Charles committed an unprecedented breach of constitutional privilege: he entered the House of Commons with 400 armed soldiers to arrest five MPs for treason. Forewarned, the MPs had escaped by river. Trust was shattered; Charles fled London and raised the Royal Standard at Nottingham.',
        },
        {
          act: 3,
          title: '4.3 War & The New Model Army (1642–1648)',
          text: '<span class="para-ref">[4.3]</span> The English Civil War divided the kingdom between Royalist "Cavaliers" (nobles and traditional Anglicans) and Parliamentary "Roundheads" (merchants, yeomen, and Puritans). At first, Royalist cavalry had the upper hand. The tide turned decisively with the rise of Oliver Cromwell, who created the revolutionary <strong>New Model Army</strong> in 1645. Unlike aristocratic armies where officer commissions were bought, Cromwell promoted officers strictly on military talent and religious zeal. At the Battle of Naseby in June 1645, the disciplined Parliamentary cavalry smashed the King’s army. Charles surrendered to the Scots in 1646, but while negotiating peace terms, he secretly signed a pact with Scottish factions, igniting a bloody Second Civil War in 1648 that branded him a "man of blood."',
        },
        {
          act: 4,
          title: '4.4 The Trial & Execution of Charles I (1648–1649)',
          text: '<span class="para-ref">[4.4]</span> Furious that Charles had provoked renewed bloodshed, the New Model Army purged Parliament of moderate MPs in Pride’s Purge, leaving a radical "Rump Parliament." In January 1649, this Rump established a High Court of Justice to try King Charles I for <strong>high treason</strong> against his own people. Charles boycotted the trial, refusing to remove his hat or enter a plea, insisting that no earthly court had the legal authority to try an anointed king. Found guilty of tyranny and treason, Charles was sentenced to death. On 30 January 1649, the world watched in stunned disbelief as Charles was publicly beheaded outside the Banqueting House at Whitehall. Monarchy was abolished, and England was declared a republican Commonwealth.',
          source: {
            letter: 'B',
            title: 'Source B: Contemporary German Broadside of the Execution of Charles I (1649)',
            image: '/images/charles_i_execution.jpg',
            caption:
              'Contemporary 1649 broadside engraving depicting the public beheading of King Charles I outside the Banqueting House at Whitehall, surrounded by soldiers and a horrified crowd.',
            source_context:
              'On 30 January 1649, Charles I was publicly executed for high treason. The broadside circulated across Europe, where monarchies reacted with horror to the execution of an anointed king.',
            how_useful_question:
              'How useful is Source B for an enquiry into the public impact and military enforcement of the 1649 regicide?',
            provenance_clues: [
              'Author: Contemporary 17th-century European printmaker (German/Dutch news broadside).',
              'Audience: European public fascinated and horrified by the execution of a reigning monarch.',
              'Motive: To record the sensational, historic event and portray the solemnity and shock of regicide.',
            ],
            hinge_question:
              'Hinge Question: Why are Parliamentary cavalry and pikemen depicted forming a dense ring around the execution scaffold?',
            citation: 'British Museum Department of Prints and Drawings.',
          },
        },
        {
          act: 5,
          title: '4.5 The Glorious Revolution & The Bill of Rights (1660–1689)',
          text: '<span class="para-ref">[4.5]</span> Following eleven years of Puritan rule under Lord Protector Oliver Cromwell, the monarchy was brought back in the 1660 <strong>Restoration</strong> under Charles II. However, when his Catholic brother James II inherited the throne in 1685, he suspended anti-Catholic laws and attempted to pack Parliament with royal loyalists. In 1688, seven leading nobles invited Protestant William of Orange and his wife Mary to invade England in the "Glorious Revolution." James II fled into exile. In February 1689, William and Mary accepted the historic <strong>Bill of Rights</strong>. This landmark law banned royal suspending power, outlawed taxation without parliamentary consent, and guaranteed free elections—permanently transforming Britain into a constitutional monarchy.',
        },
      ],

      sources: [
        {
          title: 'Source A: Anthony van Dyck, Portrait of King Charles I (1636)',
          image: '/images/charles_first.jpg',
          caption:
            'Anthony van Dyck’s portrait of King Charles I: projecting aristocratic dignity and absolute divine authority.',
          source_context:
            'Van Dyck painted Charles I during his Personal Rule (1629–1640), reflecting his belief in the Divine Right of Kings.',
          how_useful_question:
            'How useful is Source A for an enquiry into how Charles I viewed his royal authority?',
          provenance_clues: [
            'Author: Sir Anthony van Dyck, Principal Painter to King Charles I.',
            'Audience: The English royal court and visiting European rulers.',
            'Motive: To project untouchable royal majesty and divine right.',
          ],
          hinge_question:
            'Hinge Question: How did this visual projection of divine kingship alienate Parliament?',
          citation: 'National Gallery, London / Royal Collection.',
        },
        {
          title: 'Source B: Contemporary Broadside of the Execution of Charles I (1649)',
          image: '/images/charles_i_execution.jpg',
          caption:
            'Contemporary broadside depicting the public execution of King Charles I outside Whitehall on 30 January 1649.',
          source_context:
            'Charles I was executed on 30 January 1649 following his conviction for high treason by the High Court of Justice.',
          how_useful_question:
            'How useful is Source B for an enquiry into the public impact of the regicide?',
          provenance_clues: [
            'Author: Contemporary European news printmaker.',
            'Audience: European public shocked by the execution of an anointed king.',
            'Motive: To record the historic spectacle of the King’s execution.',
          ],
          hinge_question:
            'Hinge Question: Why are Parliamentary cavalry shown ringing the execution scaffold?',
          citation: 'British Museum Department of Prints and Drawings.',
        },
      ],

      teacher_notes: {
        primer:
          'This enquiry examines the constitutional breakdown that culminated in the trial and public execution of Charles I. Students must trace the collision between the Stuart doctrine of the Divine Right of Kings and Parliament’s control over taxation. Emphasize that the regicide in 1649 was not inevitable, but resulted from Charles’s obstinate duplicity, the radicalization of the New Model Army, and the failure of negotiated compromises.',
        objectives: [
          {
            objective:
              'Explain why Charles I’s Personal Rule and Ship Money provoked constitutional outrage.',
            primer:
              'Review Section 4.1. Discuss why extending coastal Ship Money to inland counties like Buckinghamshire made MPs believe Charles was attempting to rule permanently without Parliament.',
            question:
              'Why did John Hampden’s refusal to pay 20 shillings in Ship Money turn into a national test case?',
          },
          {
            objective: 'Analyse how the New Model Army defeated the King and radicalized politics.',
            primer:
              'Examine Section 4.3. Highlight how meritocratic promotion and Puritan religious conviction made Cromwell’s army a revolutionary political force rather than a passive royal militia.',
            question:
              'Why did Charles I’s secret pact with the Scots in 1648 make the New Model Army demand his execution as a "man of blood"?',
          },
          {
            objective:
              'Evaluate how the 1689 Bill of Rights permanently limited royal sovereignty.',
            primer:
              'Study Section 4.5. Contrast the divine absolutism of Charles I with the statutory, conditional monarchy accepted by William and Mary in 1689.',
            question:
              'How did the Bill of Rights ensure that no future British monarch could ever rule without Parliament?',
          },
        ],
      },

      tasks: [
        {
          type: 'extended_writing',
          topic: 'Disciplinary Enquiry Task: Causation & Constitutional Change [12 Marks]',
          question:
            'Explain why Parliament put King Charles I on trial and executed him in January 1649. Evaluate whether the regicide was caused primarily by Charles I’s refusal to accept constitutional limits, or the radicalization of the New Model Army.',
          hints: [
            'Point: State your thesis: evaluate whether Charles’s unyielding belief in Divine Right or the New Model Army’s demand for justice was the decisive factor.',
            'Evidence: Deploy specific historical evidence: Personal Rule (1629–1640), Ship Money, the Second Civil War (1648), Pride’s Purge, and the High Court of Justice.',
            'Explanation: Explain how Charles’s duplicity in peace negotiations convinced soldiers that lasting peace was impossible while the King lived.',
            'Link: Conclude decisively: explain why execution became seen as a "cruel necessity" to prevent endless civil conflict.',
          ],
          model_answer:
            'Parliament put King Charles I on trial and executed him in January 1649 due to a fatal combination of his obstinate belief in Divine Right and the radicalization of the New Model Army, but the King’s persistent duplicity was the decisive factor. Throughout his reign, Charles held that monarchs were accountable to God alone. During his eleven-year Personal Rule (1629–1640), he levied non-parliamentary taxes like Ship Money, and in 1642 he attempted to arrest five MPs by armed force, demonstrating contempt for constitutional law. Although Parliament was victorious in the First Civil War, Charles refused to negotiate in good faith. Instead, he treated peace proposals as delaying tactics while secretly forging an alliance with the Scots, provoking the bloody Second Civil War in 1648. This betrayal convinced Oliver Cromwell and the New Model Army that Charles was a "man of blood" who was personally responsible for shedding his subjects’ blood. Following Pride’s Purge in December 1648, the radical Rump Parliament created a High Court of Justice. Because Charles adamantly refused to enter a plea or acknowledge the court’s authority, execution was deemed a "cruel necessity" to permanently eliminate the threat of future civil war.',
        },
      ],

      right_page_task: {
        skill_title: 'Disciplinary Skill: Causation & Constitutional Change',
        instructions:
          'Evaluate the causes of the English Civil War and the execution of Charles I. Contrast the Stuart doctrine of Divine Right with Parliament’s claim to rule by law.',
        visual_source: {
          image: '/images/charles_i_execution.jpg',
          title: 'Source B: The Execution of Charles I at Whitehall (1649)',
          caption:
            'The execution of Charles I on 30 January 1649 before a stunned crowd outside the Banqueting House.',
          question:
            'On what constitutional grounds did Charles I refuse to recognize the legal authority of the High Court of Justice?',
        },
        written_task_prompt:
          'Explain why Parliament put King Charles I on trial and executed him in January 1649. [12 marks]',
      },

      quiz: [
        {
          question:
            'What belief held that kings were appointed directly by God and could not be questioned by Parliament?',
          options: [
            'Constitutional Monarchy',
            'The Divine Right of Kings',
            'The Social Contract',
            'Feudal Homage',
          ],
          answer: 1,
          explanation:
            'Divine Right asserted that monarchs answered only to God Almighty, not to earthly laws or courts.',
        },
        {
          question:
            'What ancient coastal tax did Charles I illegally force inland towns to pay during his Personal Rule?',
          options: ['Tithe', 'Hearth Tax', 'Ship Money', 'Customs Duty'],
          answer: 2,
          explanation:
            'Ship Money was traditionally paid by ports in wartime; Charles forced inland counties to pay it in peacetime.',
        },
        {
          question:
            'In what year did Oliver Cromwell form the disciplined, merit-based New Model Army?',
          options: ['1645', '1642', '1649', '1689'],
          answer: 0,
          explanation:
            'The New Model Army was established in 1645, winning a decisive victory at the Battle of Naseby.',
        },
        {
          question:
            'On what exact date was King Charles I publicly beheaded outside Whitehall Banqueting House?',
          options: ['5 November 1605', '30 January 1649', '18 January 1871', '28 June 1645'],
          answer: 1,
          explanation:
            'Charles I was executed on 30 January 1649, wearing two shirts against the freezing weather.',
        },
        {
          question:
            'What event in December 1648 saw Colonel Pride arrest moderate MPs, leaving the "Rump Parliament"?',
          options: [
            'Pride’s Purge',
            'The Gunpowder Plot',
            'The Rye House Plot',
            'The Long Parliament Raid',
          ],
          answer: 0,
          explanation:
            'Pride’s Purge removed MPs who wished to negotiate with the King, clearing the path for his trial.',
        },
        {
          question:
            'What historic title did Oliver Cromwell assume as head of the republican Commonwealth in 1653?',
          options: ['King of England', 'Supreme Governor', 'Prime Minister', 'Lord Protector'],
          answer: 3,
          explanation:
            'Cromwell ruled Britain as Lord Protector during the Protectorate from 1653 until his death in 1658.',
        },
        {
          question:
            'Which Dutch prince invaded England in the 1688 Glorious Revolution and accepted the 1689 Bill of Rights?',
          options: [
            'Prince William of Orange',
            'Prince Rupert of the Rhine',
            'Duke of Parma',
            'King Philip II',
          ],
          answer: 0,
          explanation:
            'William of Orange landed at Brixham in 1688 and was crowned alongside his wife Queen Mary II.',
        },
        {
          question:
            'Which key constitutional principle was permanently established by the 1689 Bill of Rights?',
          options: [
            'The monarch can dissolve Parliament at will without consent',
            'Monarchs cannot suspend laws, levy taxes, or maintain an army without Parliament',
            'The King has the divine right to appoint all church bishops',
            'All male citizens over 18 receive the right to vote',
          ],
          answer: 1,
          explanation:
            'The Bill of Rights established Parliamentary Sovereignty, creating a constitutional monarchy.',
        },
      ],
    },

    // ------------------------------------------------------------------------
    // LESSON 5: Synoptic Change & Continuity: Crown, Church, or Parliament?
    // ------------------------------------------------------------------------
    {
      id: 'lesson_5',
      title: 'Crown, Church, or Parliament? (1517–1689)',
      enquiry:
        'Which turning point decisively transformed the English state between 1517 and 1689?',
      subtitle: 'The 170-Year Struggle for Sovereign Power in Britain',
      skill: 'Synoptic Evaluation & Extent of Change',
      banner: {
        image: '/images/bill_of_rights.jpg',
        caption:
          'The 1689 Bill of Rights: establishing the supreme legal supremacy of Parliament over the British Crown.',
      },
      margin_spine: [
        { year: '1534', label: '5.1 Tudor Statecraft' },
        { year: '1588', label: '5.2 Protestant Identity' },
        { year: '1640', label: '5.3 Stuart Rupture' },
        { year: '1649', label: '5.4 Radical Regicide' },
        { year: '1689', label: '5.5 Parliamentary Sovereignty' },
      ],
      did_you_know:
        'Between 1517 and 1689, the constitutional structure of Britain completely flipped upside down! In 1517, King Henry answered to the Pope in Rome, and ordinary peasants had to pay church tithes under threat of eternal damnation. By 1689, King William answered to an elected Parliament of landowners, the Pope was barred by law from ever touching English soil, and no monarch could levy a single penny of tax without parliamentary consent!',

      do_now: {
        type: 'questions',
        items: [
          {
            question: 'On what date was King Charles I publicly beheaded outside Whitehall?',
            answer: '30 January 1649.',
          },
          {
            question:
              'What belief held that monarchs were appointed by God and answered to no earthly court?',
            answer: 'The Divine Right of Kings.',
          },
          {
            question: 'What professional Parliamentary army was formed by Oliver Cromwell in 1645?',
            answer: 'The New Model Army.',
          },
          {
            question:
              'What coastal tax did Charles I force inland towns to pay during his Personal Rule?',
            answer: 'Ship Money.',
          },
          {
            question:
              'What 1689 law established that Parliament has supreme authority over laws and taxation?',
            answer: 'The Bill of Rights.',
          },
        ],
      },

      vocabulary: [
        {
          term: 'Sovereignty',
          definition:
            'The supreme, independent authority and power of a governing body to make laws and govern a state.',
          phonetic: 'SOV-rin-tee',
          syllables: 'Sov-er-eign-ty',
          tier: '3',
        },
        {
          term: 'Statute Law',
          definition:
            'Written laws formally passed by Parliament and approved by the monarch, superior to royal decrees.',
          phonetic: 'STAT-choot LAW',
          syllables: 'Stat-ute Law',
          tier: '3',
        },
        {
          term: 'Conformity',
          definition:
            'Compliance with established rules and laws, particularly attending national Church services.',
          phonetic: 'kun-FOR-mih-tee',
          syllables: 'Con-form-i-ty',
          tier: '2',
        },
        {
          term: 'Absolutism',
          definition:
            'A political system in which a monarch holds total, unrestricted power over government and subjects.',
          phonetic: 'AB-suh-loo-tiz-um',
          syllables: 'Ab-so-lu-tism',
          tier: '3',
        },
        {
          term: 'Commonwealth',
          definition:
            'The republican government of England, Scotland, and Ireland established after the execution of Charles I (1649–1660).',
          phonetic: 'KOM-un-welth',
          syllables: 'Com-mon-wealth',
          tier: '3',
        },
        {
          term: 'Precedent',
          definition:
            'An earlier event, legal action, or decision that is regarded as an authoritative guide for future cases.',
          phonetic: 'PRES-ih-dunt',
          syllables: 'Prec-e-dent',
          tier: '2',
        },
        {
          term: 'Constitutional Monarchy',
          definition:
            'A system of governance in which a monarch shares power with an elected parliament and rules strictly under the law.',
          phonetic: 'kon-stih-TOO-shun-ul MON-ar-kee',
          syllables: 'Con-sti-tu-tion-al Mon-ar-chy',
          tier: '3',
        },
        {
          term: 'Veto',
          definition:
            'The constitutional right to reject a proposed law or decision made by a law-making body.',
          phonetic: 'VEE-toh',
          syllables: 'Ve-to',
          tier: '2',
        },
      ],

      narrative_blocks: [
        {
          act: 1,
          title: '5.1 Henry VIII & Sovereign Statehood (1517–1547)',
          text: '<span class="para-ref">[5.1]</span> In 1517, England was an orthodox Roman Catholic kingdom where spiritual life and legal appeals answered to the Pope in Rome. Henry VIII’s Break with Rome transformed English <strong>sovereignty</strong> forever. By declaring England an independent "Empire" and passing the 1534 Act of Supremacy, Henry merged church and state under the royal crown. Yet paradoxically, to make his religious supremacy legally watertight, Henry was forced to use <strong>statute law</strong> passed by Parliament. By repeatedly using the House of Commons to dissolve 800 monasteries, alter the royal succession, and enact religious doctrine, Henry inadvertently elevated Parliament from an occasional tax-granting assembly into a permanent pillar of sovereign national law.',
        },
        {
          act: 2,
          title: '5.2 The Elizabethan Protestant Identity (1558–1603)',
          text: '<span class="para-ref">[5.2]</span> Under Elizabeth I, the English state forged an unshakeable national identity centered on Protestantism and parliamentary partnership. Through the 1559 Via Media, Elizabeth demonstrated political pragmatism: enforcing public <strong>conformity</strong> while avoiding the wholesale burnings of her predecessor Mary I. When Catholic assassination plots and Philip II’s 1588 Armada threatened England, Elizabeth rallied her subjects behind the Protestant Crown. Defeating the Armada convinced generations of English citizens that God Almighty had personally chosen England as a Protestant champion. Crucially, Elizabeth managed Parliament as a trusted partner, consulting MPs on trade, defense, and succession, leaving the Crown immensely popular and financially secure.',
          source: {
            letter: 'A',
            title: 'Source A: Contemporary Woodcut, Queen Elizabeth I in Parliament (c. 1580s)',
            image: '/images/bill_of_rights.jpg',
            caption:
              'The 1689 Bill of Rights: the landmark constitutional statute that finalized Parliamentary Supremacy and ended royal absolutism in Britain.',
            source_context:
              'Drafted by the Convention Parliament in February 1689, this statutory scroll banned monarchs from suspending laws, levying taxes without parliamentary consent, or maintaining a peacetime army.',
            how_useful_question:
              'How useful is Source A for an enquiry into how the balance of power shifted from the Crown to Parliament between 1517 and 1689?',
            provenance_clues: [
              'Author: The Convention Parliament of England (Lords and Commons).',
              'Audience: King William III, Queen Mary II, and all future British monarchs.',
              'Motive: To establish binding legal supremacy and prevent any return to Stuart absolutism or Catholic rule.',
            ],
            hinge_question:
              'Hinge Question: What specific clause in the 1689 Bill of Rights represents the greatest departure from Henry VIII’s Royal Supremacy?',
            citation: 'Parliamentary Archives, Palace of Westminster, London.',
          },
        },
        {
          act: 3,
          title: '5.3 The Stuart Rupture: Divine Right (1603–1640)',
          text: '<span class="para-ref">[5.3]</span> The accession of the Scottish Stuart dynasty in 1603 ruptured this delicate Tudor partnership. Both James I and his son Charles I brought rigid theories of royal <strong>absolutism</strong> to London, insisting that kings held a Divine Right to govern free from parliamentary interference. Charles I pushed this ideology to its breaking point during his eleven-year Personal Rule (1629–1640), locking out Parliament and levying illegal Ship Money on inland counties. When Charles attempted to impose English bishops on Presbyterian Scotland, his war debts forced him to recall MPs. Rather than submitting, furious MPs dismantled royal courts and impeached royal ministers, proving that absolute monarchy could not survive in a nation with an assertive tax-paying gentry.',
        },
        {
          act: 4,
          title: '5.4 The Shock of Regicide & Republic (1642–1649)',
          text: '<span class="para-ref">[5.4]</span> The Civil War of 1642–1648 shattered centuries of royal mystique. When Parliament’s New Model Army defeated the King at Naseby and Charles refused to negotiate peace, the Army executed Pride’s Purge and established a revolutionary <strong>Commonwealth</strong> republic. Putting an anointed monarch on trial for high treason and beheading Charles I on 30 January 1649 was the most radical constitutional earthquake in British history. It established the permanent legal <strong>precedent</strong> that British monarchs were not above the law: if a king ruled as a tyrant and shed his people’s blood, he could be held legally accountable and executed by the nation.',
        },
        {
          act: 5,
          title: '5.5 The 1689 Bill of Rights: Parliamentary Supremacy (1689)',
          text: '<span class="para-ref">[5.5]</span> Although the monarchy was restored in 1660, the Stuart ambition for absolute power died forever in the 1688 Glorious Revolution. When James II attempted to rule by decree and promote Catholicism, Parliament expelled him and invited William and Mary to take the throne on statutory terms. By signing the 1689 Bill of Rights, William and Mary accepted a permanent <strong>constitutional monarchy</strong>. The Crown lost its royal <strong>veto</strong> over legislation, lost the power to levy taxes without parliamentary approval, and was barred from keeping a peacetime standing army. Over 170 years of violent conflict, sovereignty had shifted irreversibly: Britain was now ruled not by the personal will of a King, but by the King-in-Parliament.',
          source: {
            letter: 'B',
            title:
              'Source B: Contemporary Painting, Prince William of Orange Landing at Brixham (1688)',
            image: '/images/william_landing_1688.jpg',
            caption:
              'The landing of Prince William of Orange at Torbay on 5 November 1688: leading a Dutch invasion fleet to overthrow James II in the Glorious Revolution.',
            source_context:
              'Invited by seven leading English nobles, William’s armed landing led to the flight of James II and the establishment of the 1689 Bill of Rights, sealing parliamentary supremacy.',
            how_useful_question:
              'How useful is Source B for an enquiry into how external intervention shaped the final constitutional settlement of 1688–1689?',
            provenance_clues: [
              'Author: Contemporary Dutch/English maritime painter (c. 1688).',
              'Audience: English and European public celebrating the Protestant succession.',
              'Motive: To portray William as a peaceful deliverer of English religion and constitutional liberty.',
            ],
            hinge_question:
              'Hinge Question: Was the Glorious Revolution of 1688 a genuine English revolution or a foreign military invasion accepted by Parliament?',
            citation: 'National Maritime Museum, Greenwich.',
          },
        },
      ],

      sources: [
        {
          title: 'Source A: The 1689 Bill of Rights (Original Statute Scroll)',
          image: '/images/bill_of_rights.jpg',
          caption:
            'The 1689 Bill of Rights: establishing Parliamentary Supremacy over the English Crown.',
          source_context:
            'Drafted by the Convention Parliament in 1689, this statute barred monarchs from taxing or suspending laws without Parliament.',
          how_useful_question:
            'How useful is Source A for an enquiry into the shifting balance of power between Crown and Parliament?',
          provenance_clues: [
            'Author: The Convention Parliament of England.',
            'Audience: King William III, Queen Mary II, and all future British monarchs.',
            'Motive: To permanently eliminate absolute royal prerogative and establish statutory limits on the Crown.',
          ],
          hinge_question:
            'Hinge Question: What clause in the Bill of Rights represents the most radical shift from Henry VIII’s Royal Supremacy?',
          citation: 'Parliamentary Archives, Palace of Westminster, London.',
        },
        {
          title: 'Source B: Prince William of Orange Landing at Brixham (5 November 1688)',
          image: '/images/william_landing_1688.jpg',
          caption:
            'William of Orange landing at Torbay in 1688 with a Dutch fleet to overthrow James II.',
          source_context:
            'Invited by English nobles, William’s invasion triggered the Glorious Revolution and the 1689 Bill of Rights.',
          how_useful_question:
            'How useful is Source B for an enquiry into how external forces shaped the 1688–1689 settlement?',
          provenance_clues: [
            'Author: Contemporary 17th-century maritime painter.',
            'Audience: European public celebrating the Protestant succession.',
            'Motive: To depict William as a liberator defending English liberty and faith.',
          ],
          hinge_question:
            'Hinge Question: Was the Glorious Revolution a popular domestic revolt or an invited foreign invasion?',
          citation: 'National Maritime Museum, Greenwich.',
        },
      ],

      teacher_notes: {
        primer:
          'This synoptic capstone enquiry brings together the entire 170-year arc from 1517 to 1689. Students must evaluate the changing balance of power across three distinct institutions: the Crown (monarchy), the Church (papal authority vs national church), and Parliament (from tax-granting assembly to supreme law-maker). Push pupils to weigh which turning point was most transformative: Henry VIII’s Break with Rome (1534), the Regicide of Charles I (1649), or the Bill of Rights (1689).',
        objectives: [
          {
            objective:
              'Analyse how Henry VIII inadvertently empowered Parliament during the Reformation.',
            primer:
              'Review Section 5.1. Emphasize that Henry needed statute law to validate his supremacy, creating a precedent that statute was superior to royal proclamation.',
            question:
              'Why could Henry VIII not simply declare himself Supreme Head by royal decree without Parliament?',
          },
          {
            objective: 'Contrast Tudor partnership with Stuart absolutism.',
            primer:
              'Compare Section 5.2 (Elizabeth) with Section 5.3 (Charles I). Contrast Elizabeth’s consultation of MPs with Charles’s eleven-year Personal Rule.',
            question:
              'Why was Elizabeth able to maintain royal power through cooperation while Charles I lost his head?',
          },
          {
            objective: 'Synthesize the synoptic extent of change between 1517 and 1689.',
            primer:
              'Guide students through Sections 5.4 and 5.5. Use Source A (Bill of Rights) to demonstrate how Britain became a constitutional monarchy ruled by the King-in-Parliament.',
            question:
              'By 1689, had power truly shifted to "the people" or merely to wealthy aristocratic landowners in Parliament?',
          },
        ],
      },

      tasks: [
        {
          type: 'extended_writing',
          topic: 'Synoptic Disciplinary Enquiry: Extent of Change [12 Marks]',
          question:
            '“Between 1517 and 1689, the balance of power shifted completely from the Crown to Parliament.” How far do you agree with this statement? Support your answer using evidence across the period (Henry VIII, Elizabeth I, the Civil War, and the 1689 Bill of Rights).',
          hints: [
            'Thesis / Argument: State your overall evaluation: agree that a profound constitutional revolution occurred, but note that the monarch retained significant executive power.',
            'Evidence for Change: Detail how Parliament went from an occasional advisory body under Henry VIII to holding supreme legal vetoes over taxes, standing armies, and royal succession in the 1689 Bill of Rights.',
            'Evidence for Continuity / Royal Power: Note that the monarch still appointed prime ministers, declared war, signed treaties, and chose ministers—power shifted to an aristocratic oligarchy, not ordinary working people.',
            'Synoptic Conclusion: Weigh the decisive turning points: explain whether 1534, 1649, or 1689 delivered the permanent constitutional breakthrough.',
          ],
          model_answer:
            'Between 1517 and 1689, the constitutional balance of power shifted decisively from personal royal monarchy to parliamentary supremacy, though the Crown retained important executive prerogatives. In 1517, England was an orthodox Catholic realm where the King answered to Rome and Parliament met only when the monarch demanded taxation. Henry VIII’s 1534 Break with Rome initially concentrated vast powers in the royal hands, establishing Royal Supremacy. However, to make this supremacy legally binding, Henry relied on parliamentary statute law, creating a vital precedent that Parliament was the supreme law-making authority in England. When the early Stuarts attempted to reverse this partnership through the Divine Right of Kings and Charles I’s eleven-year Personal Rule (1629–1640), the structural conflict exploded into Civil War. The public trial and execution of Charles I in 1649 established the radical principle that monarchs were accountable to the law and could be put to death for treason against their people. Although the monarchy was restored in 1660, James II’s attempt to revive absolute rule led to the 1688 Glorious Revolution. By accepting the 1689 Bill of Rights, William and Mary permanently conceded that the Crown could not suspend laws, levy taxes, or maintain a standing army without parliamentary consent. While the monarch still retained executive powers to appoint ministers and declare war, sovereignty had fundamentally transformed from an absolute Crown into a constitutional King-in-Parliament.',
        },
      ],

      right_page_task: {
        skill_title: 'Disciplinary Skill: Synoptic Evaluation',
        instructions:
          'Evaluate the 170-year constitutional journey from Martin Luther’s hammer to the 1689 Bill of Rights. Weigh which turning point was most decisive.',
        visual_source: {
          image: '/images/bill_of_rights.jpg',
          title: 'Source A: The 1689 Bill of Rights Original Statute Scroll',
          caption:
            'The 1689 Bill of Rights parchment scroll establishing Parliamentary Supremacy over the British Crown.',
          question:
            'What specific clause in Source A permanently prevented future monarchs from ruling without Parliament?',
        },
        written_task_prompt:
          '“Between 1517 and 1689, the balance of power shifted completely from the Crown to Parliament.” How far do you agree? [12 marks]',
      },

      quiz: [
        {
          question:
            'In 1517, to which foreign spiritual leader did the English Church and King legally answer?',
          options: [
            'The Pope in Rome',
            'The Holy Roman Emperor',
            'The King of France',
            'The Archbishop of Canterbury',
          ],
          answer: 0,
          explanation:
            'Before 1534, the English Church was Roman Catholic, answering directly to the Pope in Rome.',
        },
        {
          question:
            'Why did Henry VIII’s use of Parliament during the Reformation inadvertently increase Parliament’s power?',
          options: [
            'He made MPs permanent generals in the Royal Navy',
            'He used statute laws passed by Parliament to validate royal supremacy and seize church land',
            'He gave Parliament the royal crown jewels as collateral',
            'He allowed the House of Commons to choose his wives',
          ],
          answer: 1,
          explanation:
            'By repeatedly using parliamentary statute to legitimize his supremacy, Henry elevated Parliament into a permanent law-making body.',
        },
        {
          question:
            'What radical principle was established by the public trial and execution of King Charles I in 1649?',
          options: [
            'Monarchs are above earthly law and cannot be questioned',
            'All kings must be executed upon reaching the age of fifty',
            'Monarchs are legally accountable to the law and their people',
            'Only bishops can put a reigning king on trial',
          ],
          answer: 2,
          explanation:
            'The 1649 regicide proved that even an anointed king was subject to the law of the land.',
        },
        {
          question:
            'Which 1689 constitutional document permanently barred British monarchs from taxing without Parliament?',
          options: [
            'Magna Carta',
            'The Petition of Right',
            'The Toleration Act',
            'The Bill of Rights',
          ],
          answer: 3,
          explanation:
            'The 1689 Bill of Rights made it illegal for the Crown to suspend laws or levy taxes without parliamentary approval.',
        },
        {
          question:
            'What form of government was permanently established in Britain following the 1689 Bill of Rights?',
          options: [
            'Absolute Monarchy',
            'Constitutional Monarchy',
            'Military Dictatorship',
            'Direct Peasant Democracy',
          ],
          answer: 1,
          explanation:
            'Britain became a constitutional monarchy, where the Crown shares power with an elected Parliament under the law.',
        },
        {
          question:
            'Did the everyday legal rights and economic lives of poor agricultural labourers change significantly between 1517 and 1689?',
          options: [
            'Yes, all labourers were granted the right to vote in 1689',
            'No, power shifted primarily to wealthy landowners and gentry, leaving labourers poor',
            'Yes, all land was confiscated and shared equally among the poor',
            'Yes, all women were elected to the House of Commons in 1689',
          ],
          answer: 1,
          explanation:
            'While the constitutional system changed, the social and economic hierarchy remained largely unchanged for ordinary peasants.',
        },
        {
          question:
            'Which radical group of peasants attempted to dig common land on St George’s Hill in Surrey in 1649?',
          options: ['The Chartists', 'The Levellers', 'The Diggers', 'The Luddites'],
          answer: 2,
          explanation:
            'The Diggers (True Levellers) tried to farm common land for all people, but were quickly suppressed by landowners.',
        },
        {
          question:
            'What term describes the system where British laws are enacted jointly by the monarch, Lords, and Commons?',
          options: [
            'Royal Prerogative',
            'The King-in-Parliament',
            'Divine Absolutism',
            'Sole Papal Authority',
          ],
          answer: 1,
          explanation:
            'The "King-in-Parliament" is the foundational British constitutional concept of sovereign law-making power.',
        },
      ],
    },
  ],
};

// Also export alias for compatibility
unitData.lessons.forEach((lesson) => {
  if (!lesson.vocab && lesson.vocabulary) {
    lesson.vocab = lesson.vocabulary;
  }
});
