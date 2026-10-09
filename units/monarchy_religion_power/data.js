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
