const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '..', 'units', 'edexcel_medicine', 'data.js');
let content = fs.readFileSync(dataFilePath, 'utf8');

// Build the updated lesson_2_1 object
const newLesson21 = {
  id: 'lesson_2_1',
  title:
    'KT2.1: The New Spirit of Enquiry: Humanism, The Printing Press & The Royal Society (c1500–c1700)',
  enquiry_question:
    'How did the invention of printing and the scientific method challenge 1,500 years of medical orthodoxy?',
  timeline_anchor: [
    {
      date: '1440',
      title: "Gutenberg's Printing Press",
      desc: "Johannes Gutenberg develops movable metal type in Mainz; brought to England by William Caxton in 1476, breaking the Catholic Church's scribal monopoly and eliminating hand-copying errors.",
    },
    {
      date: '1500s',
      title: 'The Humanist Renaissance',
      desc: 'Scholars rediscover original Greek medical texts without monastic distortions; Humanism promotes empirical observation, reason, and direct inquiry over blind obedience to ancient dogma.',
    },
    {
      date: '1660',
      title: 'Foundation of The Royal Society',
      desc: 'Twelve natural philosophers meet at Gresham College in London, formally establishing an institution dedicated to experimental laboratory science and empirical demonstration.',
    },
    {
      date: '1662',
      title: 'Royal Charter & Nullius in Verba',
      desc: "King Charles II grants the Royal Charter; the Society adopts the motto Nullius in Verba ('Take nobody's word for it') and launches Philosophical Transactions (1665), Europe's first peer-reviewed journal.",
    },
  ],
  delivery_plan: {
    format: '2-Lesson Enquiry Sequence (2x 50 mins) or 100-min Double Period',
    lesson_1: {
      title: 'Lesson 1: Immersion, Shared Reading & Communications Revolution (50 mins)',
      phases: [
        {
          time: '00–10m',
          label: 'Hook & Spaced Retrieval',
          instruction:
            'Complete Do Now retrieval on Medieval medicine and Black Death. Display Source A (Gutenberg Printing Press) to introduce the communication revolution.',
        },
        {
          time: '10–30m',
          label: 'Modelled Shared Reading & Discussion',
          instruction:
            'Read Acts 1 & 2 together with paragraph signposting ([1.1] to [2.2]). Contrast monastic scribal censorship with movable metal type.',
        },
        {
          time: '30–45m',
          label: 'Analytical Assessment Ledger',
          instruction:
            'Complete Disciplinary Vocabulary & Dual-Term Distinction (Empiricism vs Dogmatism) and the two-sided evaluative ledger on the printing press.',
        },
        {
          time: '45–50m',
          label: 'Formative Hinge Plenary',
          instruction:
            'Execute Hinge Question: Why was the invention of movable metal type far more dangerous to traditional medical authority than university lectures could ever be?',
        },
      ],
    },
    lesson_2: {
      title:
        'Lesson 2: Institutional Science, Microscopic Marvels & 12-Mark Exam Mastery (50 mins)',
      phases: [
        {
          time: '00–10m',
          label: 'Retrieval & Vocabulary Cloze',
          instruction: 'Complete Vocabulary Cloze passage and the deliberate error spot challenge.',
        },
        {
          time: '10–25m',
          label: 'Evidence Dissection & Optical Science',
          instruction:
            'Read Acts 3 & 4 ([3.1] to [4.2]). Analyze Source B (Philosophical Transactions Vol 1) and Source C (Hooke’s Micrographia Flea). Discuss the Renaissance Paradox.',
        },
        {
          time: '25–45m',
          label: '12-Mark Edexcel Exam Practice',
          instruction:
            'Scaffolded writing of Edexcel Question 4: Explain why there were changes in the way ideas about the causes of disease and illness were communicated in the period c1500–c1700 using stimulus points and PEEL criteria.',
        },
        {
          time: '45–50m',
          label: 'Peer Review & Self-Assessment',
          instruction:
            'Evaluate responses against the high-scoring model answer and mark scheme criteria.',
        },
      ],
    },
  },
  hook_text:
    "The Medical Renaissance was ignited by an intellectual rebellion against ancient dogma. Humanism encouraged scholars to believe their own eyes rather than blindly trusting 1,400-year-old manuscripts. When Gutenberg's printing press began churning out identical illustrated texts in the 1450s, and when the Royal Society received its royal charter in 1662 with the radical battle-cry 'Take nobody's word for it', the monopoly of the Catholic Church and Galen was permanently broken. Yet, behind this communication triumph lay a haunting historical paradox: revolutionary scientific networks did not discover a single new cure, leaving ordinary citizens clinging to the Four Humours and miasma for another two centuries.",
  teacher_notes: {
    primer:
      "The overarching pedagogical goal of this lesson is to guide students in understanding how technological and institutional revolutions—specifically Gutenberg's movable type printing press, Renaissance humanism, and the Royal Society—transformed the communication of medical knowledge between c1500 and c1700. Students must critically evaluate why these revolutionary channels of communication spread new anatomical and experimental findings rapidly across Europe, yet had remarkably little immediate impact on curing diseases or changing ordinary people's beliefs about the causes of illness (the Renaissance Paradox).",
    delivery_plan: {
      format: '2-Lesson Enquiry Sequence (2x 50 mins) or 100-min Double Period',
      lesson_1: {
        title: 'Lesson 1: Immersion, Shared Reading & Communications Revolution (50 mins)',
        phases: [
          {
            time: '00–10m',
            label: 'Hook & Spaced Retrieval',
            instruction:
              'Complete Do Now retrieval on Medieval medicine and Black Death. Display Source A (Gutenberg Printing Press) to introduce the communication revolution.',
          },
          {
            time: '10–30m',
            label: 'Modelled Shared Reading & Discussion',
            instruction:
              'Read Acts 1 & 2 together with paragraph signposting ([1.1] to [2.2]). Contrast monastic scribal censorship with movable metal type.',
          },
          {
            time: '30–45m',
            label: 'Analytical Assessment Ledger',
            instruction:
              'Complete Disciplinary Vocabulary & Dual-Term Distinction (Empiricism vs Dogmatism) and the two-sided evaluative ledger on the printing press.',
          },
          {
            time: '45–50m',
            label: 'Formative Hinge Plenary',
            instruction:
              'Execute Hinge Question: Why was the invention of movable metal type far more dangerous to traditional medical authority than university lectures could ever be?',
          },
        ],
      },
      lesson_2: {
        title:
          'Lesson 2: Institutional Science, Microscopic Marvels & 12-Mark Exam Mastery (50 mins)',
        phases: [
          {
            time: '00–10m',
            label: 'Retrieval & Vocabulary Cloze',
            instruction:
              'Complete Vocabulary Cloze passage and the deliberate error spot challenge.',
          },
          {
            time: '10–25m',
            label: 'Evidence Dissection & Optical Science',
            instruction:
              'Read Acts 3 & 4 ([3.1] to [4.2]). Analyze Source B (Philosophical Transactions Vol 1) and Source C (Hooke’s Micrographia Flea). Discuss the Renaissance Paradox.',
          },
          {
            time: '25–45m',
            label: '12-Mark Edexcel Exam Practice',
            instruction:
              'Scaffolded writing of Edexcel Question 4: Explain why there were changes in the way ideas about the causes of disease and illness were communicated in the period c1500–c1700 using stimulus points and PEEL criteria.',
          },
          {
            time: '45–50m',
            label: 'Peer Review & Self-Assessment',
            instruction:
              'Evaluate responses against the high-scoring model answer and mark scheme criteria.',
          },
        ],
      },
    },
    objectives: [
      {
        objective:
          'Explain how the invention and spread of the printing press transformed the communication of medical ideas.',
        primer:
          "Direct students to analyze paragraphs [2.1]–[2.2]. Emphasize that Gutenberg's movable type took book production out of the hands of monastic scribes, eliminating copyist errors and preventing Church censorship of avant-garde texts. Contrast this with the social limits of print: texts were printed in Latin, books were expensive luxuries, and commercial publishers still mass-produced traditional astrological almanacs and medieval herbals.",
        question:
          'Why was the invention of movable metal type far more dangerous to traditional medical authority than university lectures could ever be?',
      },
      {
        objective:
          "Assess how the founding of the Royal Society and its motto 'Nullius in Verba' fostered empirical scientific enquiry.",
        primer:
          "Guide students through paragraphs [3.1]–[3.3]. Contrast medieval scholasticism (relying on ancient texts) with the Royal Society's insistence on physical experimentation, repeatable evidence, and peer review via Philosophical Transactions (1665). Highlight Charles II's royal charter giving official state prestige to science.",
        question:
          "In what ways did the Royal Society's scientific journal, Philosophical Transactions, help to spread verified medical knowledge across Europe?",
      },
      {
        objective:
          'Evaluate why changes in communication did not immediately translate into better treatments or changing public beliefs about the causes of disease.',
        primer:
          "Focus on Act 4 ([4.1]–[4.2]). Ensure students understand that while Hooke and Leeuwenhoek observed microscopic structures and 'animalcules', they could not connect them to disease. Explain that the Four Humours and miasma persisted because Germ Theory was two centuries away, leaving everyday medical treatment (bleeding, purging, herbals) virtually unchanged.",
        question:
          'Why did revolutionary scientific communication fail to improve everyday medical treatments for sick patients in 17th-century Britain?',
      },
    ],
    source_context: {
      'Source A':
        'Contemporary woodcut depicting a Renaissance printing shop with compositors setting movable metal type and pressmen operating the wooden screw press. Invented by Johannes Gutenberg c.1440, the movable type press ended monastic monopolies on manuscripts and allowed medical discoveries to be published identically without copyist errors. **Hinge Question:** Why was the invention of movable metal type far more dangerous to traditional medical authority than individual university lectures could ever be?',
      'Source B':
        "Frontispiece of Volume I of Philosophical Transactions: Giving Some Accompt of the Present Undertakings, Studies, and Labours of the Ingenious in Many Considerable Parts of the World (1665), printed for John Martyn, printer to the Royal Society. This was the world's first peer-reviewed scientific journal, creating an international network for sharing verified empirical data. **Hinge Question:** How did publishing experimental observations in an official, peer-reviewed journal fundamentally change how scientific discoveries were validated compared to the medieval period?",
      'Source C':
        "Iconic fold-out engraving of a flea observed under the compound microscope, from Robert Hooke's masterwork Micrographia (1665), commissioned and published by the Royal Society. While Hooke's extraordinarily detailed illustrations amazed the public and proved the power of lens magnification, physicians had no idea that fleas or microorganisms carried disease. **Hinge Question:** Why did breathtaking microscopic illustrations like Hooke's flea fail to lead to any new medical treatments or cures in the 17th century?",
    },
  },
  do_now: {
    type: 'questions',
    title: 'Recall & Retrieval (Prior Knowledge: Medieval Medicine & The Black Death)',
    instructions:
      'Answer these questions in full sentences to activate your knowledge from Key Topic 1.',
    items: [
      {
        question: 'In what year did the Black Death arrive in England?',
        answer: '1348.',
        options: ['1415.', '1348.', '1665.', '1066.'],
      },
      {
        question: "Who were the 'flagellants'?",
        answer: 'People who whipped themselves to show penance to God.',
        options: [
          'Apothecaries who created herbal plague remedies.',
          'Doctors who specialized in treating buboes.',
          'People who whipped themselves to show penance to God.',
          'Foreign traders banned from entering English ports.',
        ],
      },
      {
        question: 'State one common medieval preventative measure for the Black Death.',
        answer: 'Carrying sweet-smelling herbs or lighting fires.',
        options: [
          'Using penicillin or other antibiotics.',
          'Quarantining the entire country for six months.',
          'Boiling drinking water and washing hands.',
          'Carrying sweet-smelling herbs or lighting fires.',
        ],
      },
      {
        question: 'What are the four humours?',
        answer: 'Blood, phlegm, yellow bile, black bile.',
        options: [
          'Blood, phlegm, yellow bile, black bile.',
          'Blood, water, pus, black bile.',
          'Blood, water, air, bile.',
          'Blood, phlegm, yellow bile, urine.',
        ],
      },
      {
        question: "What was 'miasma'?",
        answer: 'Bad air or noxious smells believed to cause disease.',
        options: [
          'An imbalance of the four humours.',
          'A treatment involving bleeding and purging.',
          'Bad air or noxious smells believed to cause disease.',
          'A holy water used by priests to cure illness.',
        ],
      },
      {
        question: 'Which Roman physician developed the Theory of Opposites?',
        answer: 'Galen.',
        options: ['Hippocrates.', 'Galen.', 'Harvey.', 'Vesalius.'],
      },
      {
        question: 'How did medieval hospitals differ from modern ones?',
        answer: 'They provided shelter and care, not medical treatment.',
        options: [
          'They were run by local town councils rather than the Church.',
          'They provided shelter and care, not medical treatment.',
          'They treated only plague victims during epidemics.',
          'They specialized in complex surgery and amputations.',
        ],
      },
      {
        question: "What was the purpose of 'bleeding' (phlebotomy) in medieval medicine?",
        answer: 'To restore balance to the four humours by releasing excess blood.',
        options: [
          'To restore balance to the four humours by releasing excess blood.',
          "To release evil spirits from the patient's body.",
          'To allow fresh air into the circulatory system.',
          'To test the blood for bacterial infections.',
        ],
      },
      {
        question: 'What was the role of a medieval apothecary?',
        answer: 'Preparing and selling herbal remedies and potions.',
        options: [
          'Bleeding patients using leeches or cups.',
          'Performing complex surgical operations.',
          'Preparing and selling herbal remedies and potions.',
          'Running the local hospital under Church supervision.',
        ],
      },
      {
        question: 'How did the medieval Church explain the cause of disease?',
        answer: 'God sent disease as a punishment for sin or to test faith.',
        options: [
          'Poor sanitation in large industrial cities.',
          'Disease was spread by dirty water and bacteria.',
          'Imbalances in the solar system caused organs to fail.',
          'God sent disease as a punishment for sin or to test faith.',
        ],
      },
    ],
  },
  fun_facts: [
    'c.1440: Johannes Gutenberg invents the movable metal type printing press in Mainz, revolutionizing book production across Europe.',
    "1662: King Charles II grants a Royal Charter to the Royal Society, establishing the motto Nullius in Verba ('Take nobody's word for it').",
    "1665: Henry Oldenburg publishes Philosophical Transactions, the world's first peer-reviewed scientific journal.",
  ],
  guided_reading: [],
  narrative_blocks: [
    {
      text: '### [1.1] The Medieval Stagnation: Why Ancient Dogma Refused to Die\n\n<span class="para-ref">[1.1]</span> For over a millennium, European medicine lived under the unquestioned authority of ancient Rome. Monks in Catholic monasteries painstakingly hand-copied the treatises of Galen and Hippocrates, treating their classical writings as infallible medical scripture. To challenge Galen was to risk excommunication or imprisonment. Medical students sat passively in university lecture halls while an elderly professor read aloud in Latin from an elevated pulpit (*cathedra*), while an uneducated barber-surgeon sliced an animal carcass on the floor below. No one dissected to discover anything new; dissection was merely a visual demonstration to prove that Galen was always right.\n\n### [1.2] The Humanist Awakening: Believing Your Own Eyes Over Ancient Dust\n\n<span class="para-ref">[1.2]</span> By 1500, this intellectual stagnation began to fracture under the force of the **Renaissance**—a cultural and intellectual rebirth driven by **Humanism**. Humanist scholars in Italy and northern Europe sought out original Greek and Roman manuscripts that had not been distorted by centuries of monastic transcription. More importantly, humanism championed human reason, secular inquiry, and the moral duty to directly interrogate the physical world rather than blindly accepting traditional dogma. Scholars began to argue that knowledge should be derived from what human eyes could observe and verify. Yet, in the squalid, smoke-choked streets of Tudor and Stuart London, ordinary citizens remained untouched by university philosophy. When epidemic fevers struck, they still looked to the heavens in terror, convinced that disease was God\'s punishment for sin or the result of poisonous atmospheric vapors (*miasma*).',
    },
    {
      text: '### [2.1] Smashing the Scribes: Gutenberg’s Machine Defies Church Censorship\n\n<span class="para-ref">[2.1]</span> The invention of the movable metal type printing press by **Johannes Gutenberg** in Mainz, Germany (c.1440), brought to England by **William Caxton** in 1476, transformed European communication. Prior to printing, every single medical manuscript had to be hand-copied by monastic scribes. This process took months per volume, cost vast sums of money, and routinely introduced compounding transcription errors and artistic distortions. Crucially, the Catholic Church controlled the scriptoria, enabling it to censor and suppress any text that challenged Galenic or theological orthodoxy. Gutenberg\'s press smashed this clerical bottleneck. Movable metal type allowed thousands of identical copies of a single text to be produced in days at a fraction of the cost, making censorship virtually impossible as books crossed borders faster than authorities could confiscate them. Furthermore, printers could reproduce complex, mathematically precise anatomical woodcuts identically, ensuring medical students in London, Paris, and Padua studied the exact same diagrams without error.\n\n### [2.2] The Social Limits of Print: Latin Luxury vs Popular Superstition\n\n<span class="para-ref">[2.2]</span> Yet, this communications revolution had profound social and economic limitations. The overwhelming majority of pioneering medical treatises were printed in **Latin**, the international language of scholars, rendering them completely inaccessible to ordinary, uneducated people. Books remained expensive luxury items affordable only by wealthy physicians, nobles, and university libraries. For the ordinary peasant or apprentice in Tudor England, formal medical texts were irrelevant. Commercial printshops quickly realized that printing cheap astrological almanacs, folk herbals, and traditional Galenic health guides in English was far more lucrative than publishing dense scientific treatises. Consequently, rather than eradicating medieval superstitions, early commercial printing actually helped entrench traditional beliefs in humoral balance and planetary influences among the wider public.',
      tasks: [
        {
          type: 'two_sided_argument',
          topic: 'The Printing Press and Medical Communication',
          instruction:
            'GCSE Analytical Assessment: Evaluate both the revolutionary communication impact of the printing press and its historical limitations.',
          advancement: {
            title: 'Communication Revolution (Change)',
            points: [
              "Invented by Johannes Gutenberg (c.1440), it mass-produced identical books rapidly and cheaply, ending the Catholic Church's scribal monopoly and censorship.",
              'Allowed pioneering medical texts to be distributed simultaneously to university medical faculties across Europe before conservative church authorities could suppress them.',
              'Eliminated copying errors common in hand-transcribed manuscripts and allowed precise anatomical woodcuts and diagrams to be reproduced identically.',
            ],
            starter:
              'On the one hand, the printing press transformed the communication of medical ideas because...',
          },
          limitations: {
            title: 'Practical Limitations & Continuity',
            points: [
              'Books remained expensive luxury items that only wealthy physicians, aristocrats, and universities could afford.',
              'The vast majority of ordinary people across Europe were illiterate and unable to read Latin medical treatises.',
              'Printing houses also mass-produced traditional astrological almanacs, medieval herbals, and classical Galenic texts, entrenching old superstitions among the public.',
              'Spreading ideas did not automatically lead to better healthcare, as ordinary barber-surgeons and apothecaries had no formal university training.',
            ],
            starter:
              'However, the impact of the printing press on everyday healthcare was limited because...',
          },
          synthesis_prompt:
            'Write a balanced GCSE exam paragraph explaining why the printing press changed medical communication while having limited immediate effect on public health.',
          synthesis_connectives: [
            'While the printing press enabled unprecedented spread of research...',
            'Nevertheless, for the wider population...',
            'This meant that...',
            'Ultimately...',
          ],
          model_answer:
            "On the one hand, the invention of the movable-type printing press by Johannes Gutenberg in c.1440 transformed the communication of medical ideas by shattering the Catholic Church's institutional monopoly over information. Prior to printing, books had to be laboriously copied by hand by monastic scribes, making them exceptionally rare, expensive, and strictly censored to prevent any challenge to religious or Galenic orthodoxy. The printing press allowed pioneering Renaissance texts to be mass-produced and distributed simultaneously to universities across Europe before conservative authorities could suppress them. Crucially, the press allowed complex anatomical woodcuts to be reproduced identically with zero risk of the copying errors and artistic distortions that plagued medieval manuscripts, ensuring medical students across different countries could study identical, anatomically accurate diagrams.<br><br>However, the impact of the printing press on everyday healthcare was severely limited by social inequality and widespread illiteracy. Medical treatises were printed in Latin and cost substantial sums, restricting their readership strictly to an educated, wealthy minority of university scholars. The overwhelming majority of the European population remained completely illiterate and never read a scientific text. Furthermore, commercial printer-publishers rapidly discovered that printing popular astrological almanacs, medieval folk herbals, and traditional Galenic textbooks was far more profitable than printing avant-garde scientific works, which actually served to entrench traditional superstitious beliefs among the public. Consequently, while the printing press revolutionized elite scientific networking, it had almost zero direct effect on improving the medical treatments received by the average sick person in Renaissance Britain.",
        },
      ],
      image: '/images/printing_press.jpg',
      image_alt: 'Source A: Early Gutenberg-Style Movable Type Printing Press (16th c.)',
      caption:
        'A Renaissance printing house showing compositors setting movable metal type and pressmen operating the heavy wooden screw press.',
      source_letter: 'A',
      image_context:
        'Contemporary woodcut depicting a Renaissance printing shop with compositors setting movable metal type and pressmen operating the wooden screw press. Invented by Johannes Gutenberg c.1440, the movable type press ended monastic monopolies on manuscripts and allowed medical discoveries to be published identically without copyist errors. **Hinge Question:** Why was the invention of movable metal type far more dangerous to traditional medical authority than individual university lectures could ever be?',
    },
    {
      text: "### [3.1] 'Take Nobody’s Word For It!': The Royal Charter of 1662\n\n<span class=\"para-ref\">[3.1]</span> By the mid-17th century, the humanist call for empirical enquiry had gained institutional power in Britain. In November 1660, a group of twelve natural philosophers met at Gresham College in London following a lecture by the young astronomer Christopher Wren. In 1662, King Charles II granted them an official royal charter, establishing **The Royal Society of London for Improving Natural Knowledge**. The Society adopted the radical Latin motto ***Nullius in Verba*** (\"Take nobody's word for it\"). They banned theological debate and declared that no scientific claim could be accepted as truth without physical experiment, mathematical calculation, or observable demonstration. The Royal Charter gave experimental science the official blessing and prestige of the English Crown, transforming natural philosophy from a suspicious, heretical pursuit into a prestigious national endeavor.\n\n### [3.2] Philosophical Transactions (1665): The World's First Peer-Reviewed Journal\n\n<span class=\"para-ref\">[3.2]</span> In 1665, the Royal Society's first secretary, Henry Oldenburg, created Europe's first peer-reviewed scientific journal: ***Philosophical Transactions*** (*Source B*). For the first time in medical history, scientists had an established international network for sharing verified laboratory experiments, case notes, and observations. Instead of individual scholars keeping discoveries secret or relying on private letters, physicians across Europe could read, critique, and replicate each other's experiments. Oldenburg established the practice of peer review, ensuring that submitted papers were examined and verified by other members before publication, permanently raising the standards of scientific evidence.\n\n### [3.3] The Optical Marvels: Robert Hooke & Antonie van Leeuwenhoek\n\n<span class=\"para-ref\">[3.3]</span> The power of the new scientific method was demonstrated through optical technology. In 1665, Royal Society curator **Robert Hooke** published ***Micrographia***, a breathtaking folio volume featuring intricate, copperplate engravings of everyday objects seen through the compound microscope. His giant, fold-out illustration of a common flea (*Source C*) stunned the public, revealing complex joints, bristles, and claws never before seen by human eyes. A decade later, an uneducated Dutch draper named **Antonie van Leeuwenhoek** used simple, high-power single-lens microscopes to observe scrapings from his own teeth, discovering millions of microscopic organisms swimming in water—creatures he named **'animalcules'** (bacteria and protozoa). When Leeuwenhoek submitted his observations to the Royal Society in 1676 and 1683, the Society verified his findings, confirming that a previously invisible living universe existed.",
      tasks: [
        {
          type: 'two_sided_argument',
          topic: 'The Royal Society and Scientific Progress',
          instruction:
            'GCSE Analytical Assessment: Evaluate both the institutional breakthrough of the Royal Society and its practical medical limitations.',
          advancement: {
            title: 'Institutional Breakthrough (Change)',
            points: [
              'Founded in London in 1660 and granted a Royal Charter by King Charles II (1662), giving state prestige and royal patronage to experimental science.',
              "Operated under the radical motto 'Nullius in Verba' ('Take nobody's word for it'), rejecting ancient classical authority in favor of hands-on experimental proof and demonstration.",
              "Published the world's first scientific journal, Philosophical Transactions (1665), establishing an international network for peer review and disseminating verified discoveries.",
              "Supported and verified Antonie van Leeuwenhoek’s microscopic observations of 'animalcules' (bacteria) in 1676/1683 and Robert Hooke's Micrographia (1665).",
            ],
            starter:
              'On the one hand, the Royal Society accelerated medical and scientific progress because...',
          },
          limitations: {
            title: 'Practical Limitations & Continuity',
            points: [
              'Functioned as an exclusive gentleman’s debating club for wealthy amateurs; it ran no hospitals, dispensaries, or clinics to treat sick patients.',
              'Leeuwenhoek’s microscopic "animalcules" and Hooke\'s cells were viewed as fascinating curiosities rather than recognized as the causes of disease.',
              'The Society focused heavily on physics, astronomy, mechanics, and chemistry, with everyday clinical medicine remaining largely unregulated and unscientific.',
              'Ordinary sick Londoners continued to visit quack doctors, apothecaries, and wise women, untouched by elite scientific lectures.',
            ],
            starter:
              'However, the practical contribution of the Royal Society to saving lives was limited because...',
          },
          synthesis_prompt:
            'Write a balanced GCSE exam paragraph evaluating the extent to which the Royal Society transformed medicine between 1660 and 1700.',
          synthesis_connectives: [
            'On the one hand, the Royal Society institutionalized empirical science...',
            'However, in terms of practical patient care...',
            'Because microbes were not understood as pathogens...',
            'Therefore, its immediate medical impact was...',
          ],
          model_answer:
            "On the one hand, the establishment of the Royal Society in London in 1660 accelerated scientific progress by creating the first formal, prestigious institution dedicated entirely to empirical research. Awarded a Royal Charter by King Charles II in 1662, the Society actively rejected the medieval reliance on ancient dogma under its uncompromising Latin motto *Nullius in Verba* ('Take nobody's word for it'). Instead of treating Galen as infallible, members were required to demonstrate discoveries through physical experiments and repeatable evidence. Crucially, in 1665 the Society began publishing *Philosophical Transactions*, the world's first scientific journal, which established an international peer-review network. This allowed groundbreaking observations—such as Robert Hooke's microscopic cell studies in *Micrographia* (1665) and Antonie van Leeuwenhoek's discovery of microscopic 'animalcules' in 1676—to be rapidly translated, printed, and debated across Europe, permanently encouraging a culture of scientific questioning.<br><br>However, the Royal Society had almost no immediate impact on medical treatment or saving patients' lives during the 17th century. The Society was an exclusive club for wealthy gentlemen and amateur philosophers; it did not operate hospitals, train physicians, or treat the sick. Furthermore, while the Society confirmed Leeuwenhoek's sighting of bacteria under the microscope, no one understood what these 'animalcules' actually did: they were treated as entertaining microscopic curiosities rather than recognized as the cause of infectious disease (a realization that took another 200 years until Pasteur's Germ Theory in 1861). Meanwhile, the average sick citizen continued to rely on traditional humoral bleeding, purging, and quack remedies. Therefore, while the Royal Society established the institutional foundation for the modern Scientific Revolution, its direct practical impact on curing illnesses in the 17th century was practically zero.",
        },
      ],
      image: '/images/philosophical_transactions_vol1.jpg',
      image_alt: 'Source B: Title Page of Philosophical Transactions, Vol. I (1665–1666)',
      caption:
        "Frontispiece of Volume I of Philosophical Transactions (1665), the world's first peer-reviewed scientific journal, printed for John Martyn, printer to the Royal Society.",
      source_letter: 'B',
      image_context:
        "Frontispiece of Volume I of Philosophical Transactions: Giving Some Accompt of the Present Undertakings, Studies, and Labours of the Ingenious in Many Considerable Parts of the World (1665), printed for John Martyn, printer to the Royal Society. This was the world's first peer-reviewed scientific journal, creating an international network for sharing verified empirical data. **Hinge Question:** How did publishing experimental observations in an official, peer-reviewed journal fundamentally change how scientific discoveries were validated compared to the medieval period?",
    },
    {
      text: "### [4.1] Brilliant Minds, Helpless Patients: The Great Renaissance Paradox\n\n<span class=\"para-ref\">[4.1]</span> Despite the breathtaking achievements of Gutenberg's press, the Royal Society, and microscope technology, the Renaissance revealed a tragic historical paradox: **revolutionary scientific communication did not cure disease**. While Hooke and Leeuwenhoek revealed microscopic structures and 'animalcules', no 17th-century scientist understood what these tiny organisms were or what they did. Because the chemical and biological mechanisms of infection were completely unknown, 'animalcules' were treated merely as fascinating optical curiosities and parlor tricks rather than deadly pathogens. The true cause of infectious illness—microscopic germs—remained entirely undiscovered for another two centuries until Louis Pasteur published his Germ Theory in 1861.\n\n### [4.2] Everyday Continuity at the Bedside: Leeches, Miasma and Astrological Almanacs\n\n<span class=\"para-ref\">[4.2]</span> Consequently, for the vast majority of sick patients in Britain between 1500 and 1700, medical treatment experienced almost complete continuity with the Middle Ages. Knowing that microscopes could magnify a flea (*Source C*) or that the Royal Society debated air pressure did not save a single child dying of smallpox or cholera. When fevers struck, licensed university physicians still reached for their lancets to perform phlebotomy (bleeding) or prescribed violent purges to balance the Four Humours. Ordinary families continued to rely on village wise women, local apothecaries, and herbal remedies. The scientific revolution had permanently transformed how medical ideas were investigated, verified, and communicated among the educated elite; but inside the sickroom, ancient Galenic and humoral practices held sway.",
      image: '/images/hooke_micrographia_flea.jpg',
      image_alt: "Source C: Robert Hooke's Fold-Out Engraving of a Flea from Micrographia (1665)",
      caption:
        "Robert Hooke's famous engraving of a flea seen under the compound microscope, published by the Royal Society in Micrographia (1665).",
      source_letter: 'C',
      image_context:
        "Iconic fold-out engraving of a flea observed under the compound microscope, from Robert Hooke's masterwork Micrographia (1665), commissioned and published by the Royal Society. While Hooke's extraordinarily detailed illustrations amazed the public and proved the power of lens magnification, physicians had no idea that fleas or microorganisms carried disease. **Hinge Question:** Why did breathtaking microscopic illustrations like Hooke's flea fail to lead to any new medical treatments or cures in the 17th century?",
    },
  ],
  exam_practice: [
    {
      type: '12-mark',
      marks: 12,
      question:
        'Explain why there were changes in the way ideas about the causes of disease and illness were communicated in the period c1500-c1700. (12 marks)',
      stimulus: ['The printing press', 'The Royal Society'],
      model_answer:
        '<p style=\"margin-bottom: 1.5rem;\">The Protestant Reformation and the rise of <strong>humanism</strong> removed the major institutional and cultural barriers that had previously restricted the communication of medical ideas. During the medieval period, the Catholic Church held a strict monopoly over book production, with monks hand-copying manuscripts and censoring any ideas that challenged traditional Galenic orthodoxy. However, the Reformation drastically reduced the Church\'s influence over medical training, while humanism encouraged a new cultural mindset of empirical observation, critical questioning, and the belief that humans could use reason to discover truths about the natural world. As literacy rates rose across Europe, an increasingly educated and inquisitive population sought out direct evidence rather than blindly trusting ancient religious teachings, creating a powerful social demand for new ways to share and debate medical knowledge.</p><p style=\"margin-bottom: 1.5rem;\">The invention and rapid spread of the <strong>printing press</strong> transformed this intellectual landscape by enabling medical ideas to be communicated quickly, cheaply, and with absolute accuracy. Created by Johannes Gutenberg in c.1440, the printing press took book production entirely out of the hands of the Church. Instead of relying on rare, expensive handwritten manuscripts that were highly prone to copying errors, scientists could now mass-produce identical copies of their findings. This allowed groundbreaking medical texts to be distributed rapidly to universities across Europe before the Church could censor or ban them. Furthermore, the printing press allowed books to feature highly detailed, identical woodcut illustrations of human anatomy and experiments, which served as essential visual guides for medical students and prevented the anatomical distortions common in medieval drawings.</p><p style=\"margin-bottom: 1.5rem;\">At the same time, the founding of the <strong>Royal Society</strong> in 1660 created a highly organized, prestigious institution designed specifically to communicate and validate scientific discoveries. Operating under the motto <em>Nullius in Verba</em> (\"take nobody\'s word for it\"), the Society actively rejected the medieval practice of relying on ancient books, instead promoting hands-on experimentation and observation. The Royal Society established a centralized reference library where physicians could submit and study each other\'s research. Crucially, they began publishing <em>Philosophical Transactions</em> in 1665, the world\'s first peer-reviewed scientific journal, which acted as a global hub for sharing experimental data. This allowed pioneering observations, such as Robert Hooke\'s microscopic illustrations in <em>Micrographia</em> (1665) and Antonie van Leeuwenhoek\'s discovery of microscopic \"animalcules\" (1676/1683), to be instantly communicated to and peer-reviewed by the international scientific community.</p>',
      model:
        '<p style=\"margin-bottom: 1.5rem;\">The Protestant Reformation and the rise of <strong>humanism</strong> removed the major institutional and cultural barriers that had previously restricted the communication of medical ideas. During the medieval period, the Catholic Church held a strict monopoly over book production, with monks hand-copying manuscripts and censoring any ideas that challenged traditional Galenic orthodoxy. However, the Reformation drastically reduced the Church\'s influence over medical training, while humanism encouraged a new cultural mindset of empirical observation, critical questioning, and the belief that humans could use reason to discover truths about the natural world. As literacy rates rose across Europe, an increasingly educated and inquisitive population sought out direct evidence rather than blindly trusting ancient religious teachings, creating a powerful social demand for new ways to share and debate medical knowledge.</p><p style=\"margin-bottom: 1.5rem;\">The invention and rapid spread of the <strong>printing press</strong> transformed this intellectual landscape by enabling medical ideas to be communicated quickly, cheaply, and with absolute accuracy. Created by Johannes Gutenberg in c.1440, the printing press took book production entirely out of the hands of the Church. Instead of relying on rare, expensive handwritten manuscripts that were highly prone to copying errors, scientists could now mass-produce identical copies of their findings. This allowed groundbreaking medical texts to be distributed rapidly to universities across Europe before the Church could censor or ban them. Furthermore, the printing press allowed books to feature highly detailed, identical woodcut illustrations of human anatomy and experiments, which served as essential visual guides for medical students and prevented the anatomical distortions common in medieval drawings.</p><p style=\"margin-bottom: 1.5rem;\">At the same time, the founding of the <strong>Royal Society</strong> in 1660 created a highly organized, prestigious institution designed specifically to communicate and validate scientific discoveries. Operating under the motto <em>Nullius in Verba</em> (\"take nobody\'s word for it\"), the Society actively rejected the medieval practice of relying on ancient books, instead promoting hands-on experimentation and observation. The Royal Society established a centralized reference library where physicians could submit and study each other\'s research. Crucially, they began publishing <em>Philosophical Transactions</em> in 1665, the world\'s first peer-reviewed scientific journal, which acted as a global hub for sharing experimental data. This allowed pioneering observations, such as Robert Hooke\'s microscopic illustrations in <em>Micrographia</em> (1665) and Antonie van Leeuwenhoek\'s discovery of microscopic \"animalcules\" (1676/1683), to be instantly communicated to and peer-reviewed by the international scientific community.</p>',
    },
  ],
  ai_revision_pack: {
    title: 'KT2.1: The New Spirit of Enquiry: Revision & Mastery Pack',
    enquiry:
      'How did the invention of printing and the scientific method challenge 1,500 years of medical orthodoxy?',
    summary:
      'The Medical Renaissance (c1500–c1700) witnessed revolutionary shifts in how scientific knowledge was generated and shared. Renaissance Humanism championed empirical inquiry, Gutenberg’s printing press shattered the Church’s monopoly over books, and the Royal Society (founded 1660, chartered 1662) established experimental proof and the world’s first scientific journal, Philosophical Transactions (1665). However, ordinary people’s beliefs about the causes of illness experienced profound continuity: microscopes revealed animalcules (bacteria), but no one understood they caused disease, and the Four Humours and miasma remained dominant.',
  },
  vocab: [
    {
      term: 'Humanism',
      definition:
        'A Renaissance intellectual movement emphasizing human reason, secular study, and direct observation over blind obedience to traditional religious dogma and ancient texts.',
    },
    {
      term: 'Movable Type',
      definition:
        'A printing system using individual metal letters assembled into text, invented by Johannes Gutenberg in c.1440, allowing identical books to be produced rapidly and cheaply.',
    },
    {
      term: 'The Royal Society',
      definition:
        'An elite scientific institution founded in London in 1660 and granted a Royal Charter by Charles II in 1662, dedicated to empirical laboratory research and demonstration.',
    },
    {
      term: 'Nullius in Verba',
      definition:
        "Latin motto of the Royal Society, meaning 'Take nobody\\'s word for it', signifying that scientific truth requires empirical experimental proof rather than ancient authority.",
    },
    {
      term: 'Philosophical Transactions',
      definition:
        "The world's first peer-reviewed scientific journal, published by the Royal Society from 1665 to share verified experimental observations across Europe.",
    },
    {
      term: 'Empiricism',
      definition:
        'The philosophical and scientific principle that all knowledge must originate from hands-on observation, physical experiment, and repeatable evidence.',
    },
    {
      term: 'Animalcules',
      definition:
        'The name given by Antonie van Leeuwenhoek in the 1670s to the microscopic single-celled organisms (bacteria and protozoa) he observed using single-lens microscopes.',
    },
    {
      term: 'Miasma',
      definition:
        'Poisonous, foul-smelling vapors from decaying filth or corpses, widely believed from antiquity through the 19th century to be the primary cause of epidemic disease.',
    },
  ],
  vocab_cloze_text:
    "During the Renaissance, the intellectual movement known as [humanism] encouraged scholars to challenge ancient medieval dogma. The invention of the [movable type] printing press by Johannes Gutenberg in c.1440 took book production out of the hands of monastic scribes, preventing church censorship and allowing identical scientific texts to spread across Europe. In 1660, scientists in London formed [The Royal Society], receiving a royal charter from Charles II in 1662 under the radical Latin motto [Nullius in Verba] ('Take nobody's word for it'). In 1665, they published [Philosophical Transactions], creating the world's first peer-reviewed scientific journal. Scientists embraced [empiricism], relying on hands-on observation and experiment. When Antonie van Leeuwenhoek observed [animalcules] swimming under his microscope, he proved an invisible world existed; yet because their link to disease was unknown, ordinary people still believed sickness was caused by [miasma] or the Four Humours.",
  vocab_deliberate_error: {
    sentence:
      "The Royal Society, founded in 1660 under the motto Nullius in Verba, immediately proved that microscopic 'animalcules' discovered by Antonie van Leeuwenhoek were the germs causing the Black Death, leading to the rapid discovery of antibiotic cures across London.",
    error:
      'It claims the Royal Society proved animalcules were germs causing disease and discovered antibiotics.',
    correction:
      "The Royal Society confirmed Leeuwenhoek's sighting of 'animalcules' (bacteria), but regarded them merely as fascinating optical curiosities; no one connected microorganisms to disease until Louis Pasteur's Germ Theory in 1861, and antibiotics were not discovered until 1928.",
  },
  pair_share: {
    question:
      "Why was the Royal Society's motto 'Nullius in Verba' ('Take nobody's word for it') such a radical threat to traditional 17th-century medical practice?",
    discussion_prompts: [
      'Think about how medieval physicians were trained (reading Galen from a pulpit).',
      'Consider how ordinary physicians earned their living (consulting ancient authorities and casting horoscopes).',
      "What happens to Galen's authority if you demand physical experimental proof for every medical claim?",
    ],
  },
  gcse_task: {
    title: 'Exam Analysis: Continuity in Everyday Treatment',
    question:
      'Explain why the invention of the printing press and the founding of the Royal Society had very little immediate effect on the medical treatment received by ordinary sick people in the period c1500–c1700.',
    scaffolding: [
      'Point 1: Language and literacy barriers (Latin medical treatises vs illiterate public).',
      'Point 2: Cost of books and popularity of cheap traditional herbal/astrological almanacs.',
      'Point 3: Failure to link scientific discoveries (like animalcules) to the actual causes of disease, leaving bloodletting, purging, and miasma as standard practice.',
    ],
  },
  learning_objectives: [
    'Explain how Gutenberg’s printing press transformed the communication of medical ideas across Europe.',
    'Assess how the Royal Society and its journal Philosophical Transactions established the empirical scientific method.',
    'Analyze the Renaissance Paradox: why revolutionary scientific communication did not lead to new cures or changing public beliefs about disease causes.',
  ],
  starters: [],
  quiz: [
    {
      question:
        "What does the French word 'Renaissance' translate to, and what did it represent in medical history?",
      q: "What does the French word 'Renaissance' translate to, and what did it represent in medical history?",
      options: [
        "'Rebirth', representing a revival of classical learning, human reason, and direct inquiry into nature.",
        "'Resistance', representing the peasant uprisings against Catholic monasteries across Europe.",
        "'Reformation', representing the total destruction of all Roman and Greek philosophical works.",
        "'Revolution', representing the violent overthrow of monarchies by medical university students.",
      ],
      answer:
        "'Rebirth', representing a revival of classical learning, human reason, and direct inquiry into nature.",
      a: "'Rebirth', representing a revival of classical learning, human reason, and direct inquiry into nature.",
      explanation:
        "The Renaissance ('rebirth') marked an intellectual movement where scholars recovered classical Greek texts and embraced Humanism, encouraging people to question ancient authority using empirical observation.",
    },
    {
      question:
        "How did Johannes Gutenberg's movable metal type printing press (c.1440) directly transform medical knowledge?",
      q: "How did Johannes Gutenberg's movable metal type printing press (c.1440) directly transform medical knowledge?",
      options: [
        'It allowed identical texts and anatomical diagrams to be mass-produced quickly without copyist errors, bypassing Church censorship.',
        'It made every peasant in Europe immediately literate in medical Latin.',
        'It proved that the Four Humours did not exist by analyzing ink chemistry.',
        'It forced all universities to close down and burn ancient manuscripts.',
      ],
      answer:
        'It allowed identical texts and anatomical diagrams to be mass-produced quickly without copyist errors, bypassing Church censorship.',
      a: 'It allowed identical texts and anatomical diagrams to be mass-produced quickly without copyist errors, bypassing Church censorship.',
      explanation:
        "Gutenberg's press ended the Church's scribal monopoly, prevented copying distortions, and allowed new anatomical treatises to spread across Europe faster than authorities could ban them.",
    },
    {
      question: 'In what year was the printing press introduced to England by William Caxton?',
      q: 'In what year was the printing press introduced to England by William Caxton?',
      options: ['1476', '1348', '1543', '1665'],
      answer: '1476',
      a: '1476',
      explanation:
        "William Caxton set up England's first commercial printing press at Westminster in 1476.",
    },
    {
      question:
        "Why was the impact of the printing press on ordinary people's healthcare severely limited during the Renaissance?",
      q: "Why was the impact of the printing press on ordinary people's healthcare severely limited during the Renaissance?",
      options: [
        'Most scientific books were expensive, printed in Latin, and commercial printers mass-produced traditional astrological almanacs.',
        'The King banned the printing of any book that mentioned illness or herbs.',
        'Printers refused to sell books to anyone outside the city of London.',
        'Monks burned all printing presses across England during the Civil War.',
      ],
      answer:
        'Most scientific books were expensive, printed in Latin, and commercial printers mass-produced traditional astrological almanacs.',
      a: 'Most scientific books were expensive, printed in Latin, and commercial printers mass-produced traditional astrological almanacs.',
      explanation:
        'Illiteracy, high book costs, and the Latin language restricted scientific texts to wealthy scholars, while cheap English prints focused on traditional folklore and astrology.',
    },
    {
      question: 'What was the founding year of The Royal Society in London?',
      q: 'What was the founding year of The Royal Society in London?',
      options: ['1660', '1543', '1700', '1348'],
      answer: '1660',
      a: '1660',
      explanation:
        'The Royal Society was formed in November 1660 at Gresham College by twelve natural philosophers, receiving its Royal Charter from Charles II in 1662.',
    },
    {
      question:
        'What is the official Latin motto of the Royal Society, and what is its English translation?',
      q: 'What is the official Latin motto of the Royal Society, and what is its English translation?',
      options: [
        "'Nullius in Verba' ('Take nobody\\'s word for it').",
        "'Cogito Ergo Sum' ('I think, therefore I am').",
        "'Carpe Diem' ('Seize the day').",
        "'In Vino Veritas' ('In wine there is truth').",
      ],
      answer: "'Nullius in Verba' ('Take nobody\\'s word for it').",
      a: "'Nullius in Verba' ('Take nobody\\'s word for it').",
      explanation:
        "The motto Nullius in Verba signifies the Society's refusal to accept any scientific claim based merely on ancient authority or dogma; truths had to be proven empirically.",
    },
    {
      question: 'Which monarch granted the Royal Society its official Royal Charter in 1662?',
      q: 'Which monarch granted the Royal Society its official Royal Charter in 1662?',
      options: ['King Charles II', 'King Henry VIII', 'Queen Elizabeth I', 'King George III'],
      answer: 'King Charles II',
      a: 'King Charles II',
      explanation:
        'King Charles II granted royal patronage and a charter in 1662, giving state legitimacy and prestige to experimental natural philosophy.',
    },
    {
      question:
        "What was the name of the world's first peer-reviewed scientific journal, published by the Royal Society in 1665?",
      q: "What was the name of the world's first peer-reviewed scientific journal, published by the Royal Society in 1665?",
      options: [
        'Philosophical Transactions',
        'The Lancet',
        'Observationes Medicae',
        'De Humani Corporis Fabrica',
      ],
      answer: 'Philosophical Transactions',
      a: 'Philosophical Transactions',
      explanation:
        'Created by Henry Oldenburg in 1665, Philosophical Transactions allowed researchers across Europe to share and replicate experimental results.',
    },
    {
      question:
        "Who was the Royal Society's curator of experiments who published microscopic observations in 'Micrographia' (1665)?",
      q: "Who was the Royal Society's curator of experiments who published microscopic observations in 'Micrographia' (1665)?",
      options: ['Robert Hooke', 'Thomas Sydenham', 'Andreas Vesalius', 'William Harvey'],
      answer: 'Robert Hooke',
      a: 'Robert Hooke',
      explanation:
        "Robert Hooke published Micrographia (1665), famous for its giant fold-out drawing of a flea and for coining the biological term 'cell'.",
    },
    {
      question:
        'What term did Dutch microscopist Antonie van Leeuwenhoek use to describe the microorganisms he observed in 1676?',
      q: 'What term did Dutch microscopist Antonie van Leeuwenhoek use to describe the microorganisms he observed in 1676?',
      options: ['Animalcules', 'Germs', 'Viruses', 'Miasmas'],
      answer: 'Animalcules',
      a: 'Animalcules',
      explanation:
        "Leeuwenhoek called the microscopic single-celled bacteria and protozoa he observed 'animalcules' ('little animals').",
    },
    {
      question:
        "Why did Leeuwenhoek's discovery of 'animalcules' fail to change medical treatment in the 17th century?",
      q: "Why did Leeuwenhoek's discovery of 'animalcules' fail to change medical treatment in the 17th century?",
      options: [
        'Scientists viewed them merely as fascinating optical curiosities, failing to connect them to disease.',
        'The Royal Society declared that Leeuwenhoek was an imposter and burned his microscopes.',
        'Microscopes were banned by Parliament following the Great Fire of London.',
        'Leeuwenhoek refused to publish his findings or share them with any university.',
      ],
      answer:
        'Scientists viewed them merely as fascinating optical curiosities, failing to connect them to disease.',
      a: 'Scientists viewed them merely as fascinating optical curiosities, failing to connect them to disease.',
      explanation:
        'Because microscopic organisms were not understood as pathogens, physicians continued to blame miasma and humoral imbalances for disease.',
    },
    {
      question: 'What core intellectual concept underpinned Renaissance Humanism?',
      q: 'What core intellectual concept underpinned Renaissance Humanism?',
      options: [
        'Human reason and observable evidence should be used to interrogate nature rather than relying on dogma.',
        'All scientific research must strictly adhere to the Latin translation of the Bible.',
        'Physical exercise is the only necessary cure for all bodily illnesses.',
        'Human beings are incapable of discovering new scientific truths.',
      ],
      answer:
        'Human reason and observable evidence should be used to interrogate nature rather than relying on dogma.',
      a: 'Human reason and observable evidence should be used to interrogate nature rather than relying on dogma.',
      explanation:
        'Humanism shifted intellectual life from medieval scholastic deference to active empirical inquiry, personal reasoning, and direct observation.',
    },
    {
      question: 'How did the Royal Society validate new scientific claims made by its members?',
      q: 'How did the Royal Society validate new scientific claims made by its members?',
      options: [
        'Through hands-on physical experiments, public demonstrations, and peer review.',
        'By asking the Archbishop of Canterbury to pray for guidance.',
        "By checking whether the discovery matched Galen's classical writings.",
        'By holding a vote among members of Parliament.',
      ],
      answer: 'Through hands-on physical experiments, public demonstrations, and peer review.',
      a: 'Through hands-on physical experiments, public demonstrations, and peer review.',
      explanation:
        'The Royal Society required members to demonstrate experiments publicly and submit findings for peer review before recording them as scientific facts.',
    },
    {
      question:
        "What was the 'cathedra' in a medieval medical lecture hall, and why did Renaissance reformers criticize it?",
      q: "What was the 'cathedra' in a medieval medical lecture hall, and why did Renaissance reformers criticize it?",
      options: [
        'An elevated pulpit from which the professor read ancient Galenic texts without touching the body.',
        'The stone dissection table where students performed dissections.',
        'A torture device used to punish medical students who failed exams.',
        'A sacred bell rung to ward off miasma during lectures.',
      ],
      answer:
        'An elevated pulpit from which the professor read ancient Galenic texts without touching the body.',
      a: 'An elevated pulpit from which the professor read ancient Galenic texts without touching the body.',
      explanation:
        'Reformers criticized the cathedra because it symbolized passive reverence for book learning over direct, hands-on empirical investigation.',
    },
    {
      question:
        'Which of the following remained the most widely believed explanation of epidemic disease among the ordinary public in 1665?',
      q: 'Which of the following remained the most widely believed explanation of epidemic disease among the ordinary public in 1665?',
      options: [
        "Miasma (poisonous air) and God's anger at sin.",
        'Bacterial infections carried by water pipes.',
        'Airborne virus transmission through coughing.',
        'Chemical radiation from coal burning.',
      ],
      answer: "Miasma (poisonous air) and God's anger at sin.",
      a: "Miasma (poisonous air) and God's anger at sin.",
      explanation:
        'Despite scientific developments, ordinary people still believed epidemics were caused by divine wrath, planetary alignment, and foul-smelling miasmas.',
    },
    {
      question: "What was the 'Renaissance Paradox' in medical history?",
      q: "What was the 'Renaissance Paradox' in medical history?",
      options: [
        'Huge advances occurred in anatomy and scientific communication, yet everyday treatments and patient survival barely improved.',
        'Physicians became much poorer while university fees tripled.',
        'Fewer people died of plague even though no doctors existed.',
        'The Catholic Church supported dissections while outlawing the printing press.',
      ],
      answer:
        'Huge advances occurred in anatomy and scientific communication, yet everyday treatments and patient survival barely improved.',
      a: 'Huge advances occurred in anatomy and scientific communication, yet everyday treatments and patient survival barely improved.',
      explanation:
        'The paradox was that while elite science dismantled ancient myths and revolutionized publishing, bedside treatments (bleeding, purging, herbs) remained virtually identical to 1348.',
    },
    {
      question: 'Who was Henry Oldenburg, and what was his contribution to medical history?',
      q: 'Who was Henry Oldenburg, and what was his contribution to medical history?',
      options: [
        'The first secretary of the Royal Society who founded Philosophical Transactions and established peer review.',
        "The master printer who built Gutenberg's press in Mainz.",
        'The Dutch physician who invented the first clinical thermometer.',
        'The royal doctor who treated King Charles II with leeches.',
      ],
      answer:
        'The first secretary of the Royal Society who founded Philosophical Transactions and established peer review.',
      a: 'The first secretary of the Royal Society who founded Philosophical Transactions and established peer review.',
      explanation:
        "Oldenburg created Europe's first regular scientific communications network by editing Philosophical Transactions and establishing international peer review.",
    },
    {
      question:
        'Why did commercial printers continue to print medieval herbals and astrological guides rather than new scientific treatises?',
      q: 'Why did commercial printers continue to print medieval herbals and astrological guides rather than new scientific treatises?',
      options: [
        'There was a massive, profitable mass market for cheap English folklore, whereas elite Latin treatises had few buyers.',
        'Parliament passed a law making it illegal to print books with diagrams.',
        'Printers did not know how to set movable type for scientific words.',
        'The Royal Society bought all the paper in England to print its journal.',
      ],
      answer:
        'There was a massive, profitable mass market for cheap English folklore, whereas elite Latin treatises had few buyers.',
      a: 'There was a massive, profitable mass market for cheap English folklore, whereas elite Latin treatises had few buyers.',
      explanation:
        'Printing was a commercial business; cheap almanacs and folk remedies in English were steady bestsellers compared to expensive specialist scientific folios.',
    },
    {
      question:
        'What optical instrument, refined in the 17th century, enabled Hooke and Leeuwenhoek to observe cells and microorganisms?',
      q: 'What optical instrument, refined in the 17th century, enabled Hooke and Leeuwenhoek to observe cells and microorganisms?',
      options: ['The microscope', 'The telescope', 'The stethoscope', 'The astrolabe'],
      answer: 'The microscope',
      a: 'The microscope',
      explanation:
        'Compound and single-lens microscopes allowed 17th-century researchers to observe fleas, cells, and bacteria for the first time.',
    },
    {
      question:
        "How long after the 17th-century discovery of 'animalcules' was it before scientists finally proved that microorganisms cause disease?",
      q: "How long after the 17th-century discovery of 'animalcules' was it before scientists finally proved that microorganisms cause disease?",
      options: [
        "Nearly 200 years (until Louis Pasteur's Germ Theory in 1861).",
        'Less than five years (in 1688 by Thomas Sydenham).',
        'Only 20 years (in 1700 by Isaac Newton).',
        'Over 500 years (in 2010 with DNA sequencing).',
      ],
      answer: "Nearly 200 years (until Louis Pasteur's Germ Theory in 1861).",
      a: "Nearly 200 years (until Louis Pasteur's Germ Theory in 1861).",
      explanation:
        "It took nearly two centuries after Leeuwenhoek's observations for Louis Pasteur to publish his Germ Theory in 1861, proving that specific microbes cause disease.",
    },
  ],
  flashcards: [
    {
      q: 'What was the impact of Johannes Gutenberg’s printing press (c.1440) on medicine?',
      a: 'It mass-produced identical texts and anatomical diagrams rapidly and cheaply, ending the Catholic Church’s scribal monopoly and preventing copyist errors.',
    },
    {
      q: 'What is the Royal Society, and what is its motto?',
      a: 'Founded in London in 1660 and chartered in 1662 by Charles II, it promoted empirical lab science under the motto "Nullius in Verba" ("Take nobody\'s word for it").',
    },
    {
      q: 'What was Philosophical Transactions (1665)?',
      a: "The world's first peer-reviewed scientific journal, published by the Royal Society to create an international network for sharing verified experimental data.",
    },
    {
      q: 'Why did microscopic discoveries (Hooke and Leeuwenhoek) have little immediate medical impact?',
      a: 'Cells and "animalcules" (bacteria) were treated as fascinating natural curiosities; no one connected them to the causes of disease until Pasteur in 1861.',
    },
    {
      q: 'What is the Renaissance Paradox in medical history?',
      a: 'Revolutionary advances in scientific communication, anatomy, and methodology occurred, yet everyday medical treatments and cures remained virtually unchanged.',
    },
  ],
  draw_tasks: [
    {
      instruction:
        "Sketch a simple diagram illustrating how Gutenberg's movable metal type press worked, labeling the compositor's type case, the metal type blocks, the ink balls, and the screw press lever.",
      title: "Diagram: Gutenberg's Movable Type Printing Press",
    },
  ],
  video: [
    {
      url: 'https://era.org.uk/streaming-service-resource/the-scientific-revolution/',
      title: 'The Scientific Revolution: The Printing Press and The Royal Society',
    },
  ],
  sources: [
    {
      title: 'Source A: Renaissance Printing House with Movable Type (16th c.)',
      src: '/images/printing_press.jpg',
      source: '/images/printing_press.jpg',
      caption:
        'A Renaissance printing house showing compositors setting movable metal type and pressmen operating the heavy wooden screw press.',
      desc: 'Contemporary engraving showing the mechanical process of movable type book printing.',
    },
    {
      title: 'Source B: Title Page of Philosophical Transactions, Vol. I (1665–1666)',
      src: '/images/philosophical_transactions_vol1.jpg',
      source: '/images/philosophical_transactions_vol1.jpg',
      caption:
        "Frontispiece of Volume I of Philosophical Transactions (1665), the world's first peer-reviewed scientific journal, printed for John Martyn, printer to the Royal Society.",
      desc: "Frontispiece of the Royal Society's groundbreaking peer-reviewed scientific journal.",
    },
    {
      title: "Source C: Robert Hooke's Engraving of a Flea from Micrographia (1665)",
      src: '/images/hooke_micrographia_flea.jpg',
      source: '/images/hooke_micrographia_flea.jpg',
      caption:
        "Robert Hooke's famous fold-out engraving of a flea observed under the compound microscope, published by the Royal Society in Micrographia (1665).",
      desc: "Detailed microscopic engraving from Robert Hooke's landmark 1665 work Micrographia.",
    },
  ],
};

// Now replace the object in content between line 2761 and 3520
const lines = content.split('\n');
let startIndex = -1;
let endIndex = -1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes("id: 'lesson_2_1'") || lines[i].includes('id: "lesson_2_1"')) {
    // Look backwards for the opening bracket of this lesson object
    for (let j = i; j >= 0; j--) {
      if (lines[j].trim() === '{') {
        startIndex = j;
        break;
      }
    }
  }
  if (
    startIndex !== -1 &&
    (lines[i].includes("id: 'lesson_2_2'") || lines[i].includes('id: "lesson_2_2"'))
  ) {
    // Look backwards for the closing bracket before lesson_2_2
    for (let j = i; j >= startIndex; j--) {
      if (lines[j].trim() === '},') {
        endIndex = j;
        break;
      }
    }
    break;
  }
}

console.log('Replacing lines from index', startIndex, 'to', endIndex);
if (startIndex === -1 || endIndex === -1) {
  console.error('Could not find lesson_2_1 boundaries!');
  process.exit(1);
}

// Convert newLesson21 to formatted string with proper indentation
const newLessonStr =
  '    ' +
  JSON.stringify(newLesson21, null, 2)
    .replace(/\n/g, '\n    ')
    .replace(/"([a-zA-Z_$][0-9a-zA-Z_$]*)":/g, '$1:') +
  ',';

const before = lines.slice(0, startIndex).join('\n');
const after = lines.slice(endIndex + 1).join('\n');

const newContent = before + '\n' + newLessonStr + '\n' + after;

fs.writeFileSync(dataFilePath, newContent, 'utf8');
console.log('Successfully updated lesson_2_1 in units/edexcel_medicine/data.js!');
