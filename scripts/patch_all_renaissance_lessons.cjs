const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '..', 'units', 'edexcel_medicine', 'data.js');
let content = fs.readFileSync(dataFilePath, 'utf8');

// ============================================================================
// 1. LESSON 2.1: The Printing Press & The Royal Society
// ============================================================================
const lesson_2_1 = {
  id: 'lesson_2_1',
  title:
    'KT2.1: The New Spirit of Enquiry: Humanism, The Printing Press & The Royal Society (c1500–c1700)',
  specification_anchor:
    'Ideas about the cause of disease and illness: the influence of the printing press and the work of the Royal Society on the communication of ideas.',
  enquiry_question:
    'How did the invention of printing and the scientific method challenge 1,500 years of medical orthodoxy?',
  living_timeline_mission: {
    target_milestones: 'Milestones 1 & 5 (1440 & 1662)',
    pages: 'Pages 2–3',
    instruction:
      "Turn back to Pages 2–3 (Milestones 1 & 5). In the sketchpad frame, sketch Gutenberg’s screw press producing identical anatomical plates and annotate the Royal Society's battle-cry: 'Nullius in Verba' (Take nobody's word for it)!",
  },
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
          label: 'Formative Check & Plenary',
          instruction:
            'Teacher poses Hinge Question 1 on Source A. Pupils log key takeaways on their Living Timeline.',
        },
      ],
    },
    lesson_2: {
      title: 'Lesson 2: The Royal Society & Evaluative Synthesis Extended Writing (50 mins)',
      phases: [
        {
          time: '00–10m',
          label: 'Retrieval & Visual Forensic Inspection',
          instruction:
            'Inspect Source B (Philosophical Transactions) and Source C (Hooke’s Flea). Discuss the motto Nullius in Verba.',
        },
        {
          time: '10–25m',
          label: 'Deconstruct Acts 3 & 4 (The Renaissance Paradox)',
          instruction:
            'Explore why microscopic discoveries (Hooke, Leeuwenhoek) failed to change everyday treatment or cure disease.',
        },
        {
          time: '25–45m',
          label: 'Deliberate Exam Practice (12m / 4m)',
          instruction:
            'Complete Q3 4-mark similarity question and 12-mark Explain Why question using the structured structure strip and causal connectives.',
        },
        {
          time: '45–50m',
          label: 'Self-Assessment & Living Timeline Check',
          instruction:
            'Annotate Page 2–3 Living Timeline milestones 1 & 5 with sketchpad deliverables.',
        },
      ],
    },
  },
  hook_text:
    'In 1440, Johannes Gutenberg created a machine that shattered the Catholic Church’s monopoly on knowledge: the movable-type printing press. For the first time in human history, revolutionary scientific treatises and anatomical plates could be mass-produced identically across Europe without copyist errors or clerical censorship. Over two centuries later, King Charles II granted a Royal Charter to the Royal Society, uniting empirical scholars under the motto Nullius in Verba—"Take nobody\'s word for it". Yet, while scientific communication accelerated at blinding speed, everyday patients still swallowed crushed beetle shells and bled into pewter bowls. This is the profound paradox of the Renaissance.',
  teacher_notes: {
    primer:
      'The overarching pedagogical goal of this lesson is to examine how the communications revolution of movable metal type and the institutionalization of experimental science under the Royal Society dismantled ancient dogma. Students must understand the "Renaissance Paradox": while intellectual networks and scientific communication experienced revolutionary change, practical treatments and ordinary public beliefs about the causes of disease showed deep continuity.',
    objectives: [
      {
        objective:
          'Explain how Gutenberg’s printing press transformed the communication of medical ideas across Europe.',
        primer:
          'Direct students to paragraphs [1.1]–[1.2]. Emphasize that hand-copying in monastic scriptoria was slow, expensive, and subject to Church censorship and distortion. Movable type made books mass-producible, cheaper, and identical.',
        question:
          'Why did the Catholic Church find Gutenberg’s printing press such a profound threat to traditional Galenic medical authority?',
      },
      {
        objective:
          'Assess how the Royal Society and its journal Philosophical Transactions established the empirical scientific method.',
        primer:
          'Direct students to paragraphs [2.1]–[2.2]. Focus on Charles II’s 1662 Royal Charter, the motto Nullius in Verba, and the creation of Europe’s first peer-reviewed scientific journal in 1665.',
        question:
          'How did the motto "Nullius in Verba" directly challenge the 1,400-year dominance of Galen’s writings?',
      },
      {
        objective:
          'Analyze the Renaissance Paradox: why revolutionary scientific communication failed to improve everyday treatments.',
        primer:
          'Direct students to paragraphs [3.1]–[4.2]. Contrast Hooke’s Micrographia (1665) and Leeuwenhoek’s "animalcules" (1676) with the fact that neither understood microbes caused illness, leaving bloodletting and miasma untouched.',
        question:
          'Why did Antonie van Leeuwenhoek’s discovery of microscopic bacteria fail to save a single life in the 17th century?',
      },
    ],
    source_context: {
      'Source A':
        'A 16th-century woodcut engraving depicting a bustling European printing workshop with compositors setting movable metal type and pressmen operating wooden screw presses. **Hinge Question:** How did the mechanical nature of the printing press prevent the theological censorship and copyist errors that had protected Galenic dogma for over a thousand years?',
      'Source B':
        'The frontispiece of Volume I of Philosophical Transactions (1665), the world’s first peer-reviewed scientific journal, published under the authority of the Royal Society of London. **Hinge Question:** Why was international peer review essential for establishing the credibility of new empirical discoveries over ancient classical authority?',
      'Source C':
        'Robert Hooke’s famous fold-out engraving of a magnified flea from Micrographia (1665), published by the Royal Society using the compound microscope. **Hinge Question:** What does Hooke’s detailed rendering of an everyday flea reveal about the new scientific priorities of the Royal Society, and why did this visual evidence fail to change medical treatments?',
    },
  },
  do_now: [
    { q: 'In what year did the Black Death arrive in England?', a: '1348' },
    {
      q: 'Name the ancient Roman physician who created the Theory of Opposites.',
      a: 'Claudius Galen',
    },
    {
      q: 'What four bodily fluids did the Hippocratic theory claim must remain balanced for health?',
      a: 'Blood, Phlegm, Yellow Bile, Black Bile',
    },
    {
      q: 'State one reason why the medieval Catholic Church actively protected Galen’s medical ideas.',
      a: 'Galen believed the body was designed by a single Creator, fitting Christian doctrine.',
    },
  ],
  fun_facts: [
    {
      fact: "Gutenberg's printing press allowed 3,600 pages to be printed per workday, compared to just a few pages laboriously transcribed by a medieval monastic scribe.",
      icon: 'fa-print',
    },
    {
      fact: "The Royal Society's first curator of experiments, Robert Hooke, looked at a piece of cork under his microscope and coined the word 'cell' because the tiny compartments reminded him of monks' rooms in a monastery.",
      icon: 'fa-microscope',
    },
    {
      fact: "Antonie van Leeuwenhoek discovered bacteria ('animalcules') by scraping plaque from his own teeth and examining it under his homemade single-lens microscope.",
      icon: 'fa-teeth',
    },
  ],
  guided_reading: [
    {
      q: 'How did movable metal type prevent copyist errors in anatomical diagrams?',
      a: 'Carved woodcuts and metal type produced thousands of identical copies simultaneously, guaranteeing students in different countries studied the exact same diagrams.',
    },
    {
      q: 'What does the Royal Society motto Nullius in Verba translate to in English?',
      a: "'Take nobody's word for it' — meaning scientific claims had to be demonstrated by repeatable experimental proof rather than accepted on authority.",
    },
    {
      q: 'Why did ordinary people not benefit immediately from the printing press?',
      a: 'Most scientific books were printed in Latin and were very expensive, while the majority of the population was illiterate and continued to rely on cheap astrological almanacs and traditional folklore.',
    },
  ],
  narrative_blocks: [
    {
      title: 'Act 1: Context & Catalyst (The Monastic Scribal Monopoly)',
      text: '<span class="para-ref">[1.1]</span> Throughout the Middle Ages, the communication of medical ideas was severely constricted by the physical limitations of book production and the ideological monopoly of the Catholic Church. Every medical treatise, herbal compendium, and anatomical diagram had to be hand-transcribed by monastic scribes in cathedral scriptoria. This process was exceptionally slow, immensely expensive, and fraught with cumulative human error: copyists frequently misread obscure Latin terms, omitted crucial lines, and distorted hand-drawn illustrations beyond scientific recognition. Furthermore, because monks controlled the production of books, the Church exercised strict doctrinal censorship, suppressing any writing that questioned Galenic orthodoxy or Biblical interpretation while declaring Galen’s teleological treatises infallible sacred truth.<br><br><span class="para-ref">[1.2]</span> In c.1440, the German metalworker Johannes Gutenberg perfected the movable-type printing press in Mainz, introducing individual cast-metal letters that could be arranged into pages, inked, and pressed onto paper at high speed. Brought to England by William Caxton in 1476, the printing press revolutionized European intellectual life. For the first time, hundreds of identical copies of a medical work could be produced in weeks rather than years, at a fraction of the cost. Crucially, the press bypassed monastic scriptoria, transferring publishing into the hands of secular scholars, commercial printers, and university faculties.',
    },
    {
      title: 'Act 2: Escalation & Conflict (The Royal Society & Nullius in Verba)',
      text: '<span class="para-ref">[2.1]</span> By the mid-17th century, the revival of classical Greek scholarship known as Humanism had inspired natural philosophers to demand empirical, observable proof rather than blind deference to ancient texts. In November 1660, a group of twelve scholars—including the architect Christopher Wren, the chemist Robert Boyle, and the polymath Robert Hooke—met at Gresham College in London to establish a formal scientific institution. In 1662, King Charles II granted them a prestigious Royal Charter, formally incorporating "The Royal Society of London for Improving Natural Knowledge".<br><br><span class="para-ref">[2.2]</span> The Royal Society adopted the radical Latin motto <em>Nullius in Verba</em> ("Take nobody\'s word for it"), boldly declaring their refusal to accept any scientific claim based merely on classical authority, ecclesiastical tradition, or philosophical speculation. To replace hearsay, members conducted weekly laboratory demonstrations, demanding repeatable physical evidence. In 1665, the Society’s secretary, Henry Oldenburg, launched <em>Philosophical Transactions</em>, the world’s first peer-reviewed scientific journal. This publication established an international communications network where researchers across Europe could submit experimental findings, replicate observations, and debate discoveries, permanently democratizing scientific inquiry.',
    },
    {
      title: 'Act 3: Forensic Evidence (Microscopes & Optical Frontiers)',
      source: {
        title: 'Source B: Title Page of Philosophical Transactions, Vol. I (1665–1666)',
        src: '/images/philosophical_transactions_vol1.jpg',
        source: '/images/philosophical_transactions_vol1.jpg',
        image: '/images/philosophical_transactions_vol1.jpg',
        question:
          "Look at Source B above: Notice that this journal was printed for John Martyn, 'Printer to the Royal Society'. How does the creation of Europe's first peer-reviewed scientific journal embody the Royal Society's radical motto Nullius in Verba ('Take nobody's word for it'), and why was publishing verified laboratory methods in print essential for transforming alchemy into modern scientific medicine?",
        source_context:
          'In 1665, Henry Oldenburg founded Philosophical Transactions to establish an international scientific communications network. For the first time, scholars did not keep experiments secret; methods and results were published for European natural philosophers to replicate, critique, and verify.',
        citation:
          'Frontispiece of Philosophical Transactions, Giving Some Accompt of the Present Undertakings, Studies, and Labours of the Ingenious, Vol. I, London: Royal Society, 1665–1666.',
      },
      text: '<span class="para-ref">[3.1]</span> The empirical mandate of the Royal Society was powerfully demonstrated through groundbreaking optical innovations. In 1665, Robert Hooke published <em>Micrographia</em>, an extraordinary volume illustrated with magnificent fold-out engravings of insects, feathers, and plants observed through compound microscopes. Hooke’s famous rendering of an ordinary flea (<span class="archival-meta-tag">Source C</span>), magnified to terrifying monstrous proportions, astonished the public and proved that nature contained an invisible, intricate microscopic architecture invisible to the naked human eye. While inspecting thin slices of cork, Hooke observed small box-like compartments and coined the term "cells".<br><br><span class="para-ref">[3.2]</span> A decade later, in 1676, a Dutch draper and amateur microscope-maker named Antonie van Leeuwenhoek submitted letters to the Royal Society describing tiny living creatures he had discovered swimming in pond water and dental scrapings. Using single-lens microscopes with exquisite optical magnification, Leeuwenhoek documented "animalcules"—the first recorded observation of bacteria and protozoa in human history. The Royal Society confirmed his startling findings, publishing his letters in <em>Philosophical Transactions</em> to an astonished continent.',
    },
    {
      title: 'Act 4: The Historical Verdict & The Renaissance Paradox',
      text: '<span class="para-ref">[4.1]</span> Despite these dazzling technological and communicative breakthroughs, the Renaissance witnessed a profound historical paradox: revolutionary advances in scientific communication produced virtually zero improvement in everyday medical treatment. While elite university physicians read Vesalius and debated the Royal Society’s transactions in Latin, books remained costly luxury commodities far beyond the financial reach of the general population. The overwhelming majority of citizens in Tudor and Stuart Britain were illiterate; when sickness struck, they did not consult peer-reviewed journals but relied on local wise women, itinerant barber-surgeons, and cheap printed astrological almanacs that continued to preach Galenic humoural balance and planetary alignment.<br><br><span class="para-ref">[4.2]</span> Crucially, neither Hooke nor Leeuwenhoek understood that their microscopic organisms were linked to disease. For two centuries following Leeuwenhoek’s discovery, bacteria were treated as fascinating optical curiosities rather than deadly pathogens. Without an understanding of germ transmission—which would not emerge until Louis Pasteur’s Germ Theory in 1861—physicians had no theoretical basis for creating antiseptic surgery, antibiotics, or effective public health measures. Consequently, while the printing press and the Royal Society successfully demolished the intellectual authority of Galen, they left ordinary sick patients to suffer under the same ancient remedies of bloodletting, purging, and miasmatic pomanders that had dominated the medieval world.',
    },
  ],
  tasks: [
    {
      type: 'two_sided_argument',
      topic: 'Scientific Communication vs Everyday Medical Beliefs',
      text: 'Scientific Communication vs Everyday Medical Beliefs: Advancement vs Limitations',
      instruction:
        'GCSE Evaluative Assessment: Weigh the revolutionary impact of the printing press and Royal Society against the persistent continuity in everyday medical treatment.',
      advancement: {
        title: 'Communication Revolution (Change)',
        points: [
          'Gutenberg movable-type press (1440/1476) took book production from Church scribes, eliminating copyist errors and distributing identical anatomical treatises across Europe.',
          'The Royal Society (1660 / Royal Charter 1662) established the scientific method under Nullius in Verba ("Take nobody\'s word for it").',
          'Philosophical Transactions (1665) launched Europe’s first peer-reviewed scientific journal, creating an international network for testing and validating experimental findings.',
        ],
        starter:
          'On the one hand, the communications revolution transformed Renaissance medicine because...',
      },
      limitations: {
        title: 'Entrenched Continuity & Stagnation (Limitations)',
        points: [
          'Scientific books were printed in Latin and remained expensive luxury goods; the general population was illiterate and relied on cheap astrological almanacs.',
          'Microscopic discoveries (Hooke’s cells, Leeuwenhoek’s "animalcules") were treated as optical curiosities; no one linked microbes to disease until 1861.',
          'Everyday treatments saw zero change: ordinary people and physicians still relied on bloodletting, purging, and miasma theory to explain illness.',
        ],
        starter:
          'However, the practical impact of these communication breakthroughs on ordinary patients was severely limited because...',
      },
      synthesis_prompt:
        'Write a balanced GCSE exam paragraph explaining why scientific communication accelerated while everyday medical treatment stagnated.',
      synthesis_connectives: [
        'On the one hand, the printing press transformed communication by...',
        'Crucially, the Royal Society institutionalized...',
        'However, the practical impact was limited because...',
        'Consequently, ordinary patients...',
        'Overall, while scientific networking was revolutionized...',
      ],
      model_answer:
        "On the one hand, the communications revolution fundamentally transformed Renaissance medicine by dismantling the Catholic Church's scribal monopoly on knowledge. Johannes Gutenberg's movable-type press (c.1440, introduced to England by William Caxton in 1476) allowed medical treatises and detailed anatomical woodcuts to be mass-produced identically across Europe without copyist errors or clerical censorship. This enabled works like Vesalius's De Fabrica (1543) to spread rapidly among university faculties. Furthermore, the establishment of the Royal Society in London (1660, chartered 1662) institutionalized empirical science under its motto Nullius in Verba ('Take nobody\\'s word for it'). Through Philosophical Transactions (1665), Europe's first peer-reviewed journal, discoveries like Leeuwenhoek's 'animalcules' (1676) were rapidly shared, debated, and verified across an international network of scholars.<br><br>However, the practical impact of this revolution on everyday patient care was virtually non-existent, illustrating the profound 'Renaissance Paradox'. Medical treatises were printed in Latin and priced as luxury items for wealthy scholars; the overwhelming majority of ordinary people remained illiterate and continued to buy cheap, popular astrological almanacs and traditional herbals that reinforced ancient superstitions. Crucially, although microscopes revealed cells and bacteria, scientists treated them as fascinating natural curiosities and failed to connect them to the causes of illness. Without Germ Theory, medical treatments remained medieval: physicians and barber-surgeons continued to bleed, purge, and burn herbs against miasma. Therefore, while scientific communication and intellectual debate experienced revolutionary progress, everyday clinical care for ordinary people showed almost complete continuity with the Middle Ages.",
    },
  ],
  vocab: [
    {
      term: 'Monastic Scriptoria',
      def: 'Cathedral and abbey writing rooms where medieval monks painstakingly copied manuscripts by hand under strict Church censorship.',
    },
    {
      term: 'Movable Metal Type',
      def: 'Individual cast-metal letter blocks developed by Gutenberg (c1440) that could be arranged, inked, and pressed onto paper to mass-produce identical texts.',
    },
    {
      term: 'The Royal Society',
      def: 'An elite scientific institution founded in London in 1660 and granted a Royal Charter by Charles II in 1662 to advance laboratory experimentation.',
    },
    {
      term: 'Nullius in Verba',
      def: 'The Latin motto of the Royal Society meaning "Take nobody\'s word for it", demanding physical experimental demonstration over ancient authority.',
    },
    {
      term: 'Philosophical Transactions',
      def: "The world's first peer-reviewed scientific journal, launched by the Royal Society in 1665 to publish and debate experimental findings.",
    },
    {
      term: 'Renaissance Paradox',
      def: 'The historical reality that revolutionary advances in anatomy, scientific method, and communication occurred alongside complete stagnation in medical cures.',
    },
  ],
  vocab_cloze_text:
    'Throughout the medieval period, medical books had to be hand-copied in [Monastic Scriptoria], which was slow and heavily censored. In c1440, Johannes Gutenberg invented [Movable Metal Type], which allowed identical scientific books and anatomical plates to be mass-produced cheaply across Europe. In 1660, British natural philosophers established [The Royal Society], receiving a royal charter from Charles II. Operating under their motto [Nullius in Verba], members rejected classical dogma in favor of empirical experiments. In 1665, they published [Philosophical Transactions], creating the world’s first peer-reviewed scientific journal. However, because microscopic discoveries were not linked to germs, ordinary healthcare remained trapped in the [Renaissance Paradox].',
  gcse_task: {
    title: 'Edexcel GCSE (9–1) Paper 1 Section B Practice: Q3 & Q4',
    tasks: [
      {
        type: 'written',
        tariff: 'Q3: Explain one way in which ideas were similar [4 marks]',
        text: 'Explain one way in which ideas about the cause of disease in the Renaissance period (c1500–c1700) were similar to ideas in the Medieval period (c1250–c1500). [4 marks]',
        model:
          'One way in which ideas about the causes of disease were similar in both periods was the enduring belief in **miasma** (poisonous or corrupted air). In the Medieval period, during epidemics like the Black Death (1348), people believed that foul-smelling vapors arising from decaying filth, swamps, and rotting corpses entered the body and caused sickness. Similarly, during the Renaissance, ordinary citizens and physicians continued to blame miasma for outbreaks like the Great Plague of 1665, carrying sweet-smelling pomanders and smoking tobacco to ward off bad air. **This similarity persisted because** although the Renaissance saw major breakthroughs in anatomy and scientific communication, scientists still had no understanding of germs or microorganisms as disease pathogens. Without knowledge of bacteria, bad smells remained the most rational explanation for why disease spread rapidly in crowded urban environments.',
      },
      {
        type: 'written',
        tariff: 'Q4: Explain why there were changes [12 marks]',
        text: 'Explain why there were changes in the way ideas about the causes of disease and illness were communicated in the period c1500–c1700. [12 marks]',
        stimulus: ['The printing press', 'The Royal Society'],
        model:
          "One major reason for changes in medical communication was the invention of the movable-type printing press by Johannes Gutenberg in c.1440, introduced to England by William Caxton in 1476. Prior to this, books were copied by hand in Catholic monastic scriptoria, a process that was exceptionally slow, costly, and subject to Church censorship and copyist errors. The printing press transformed this by enabling identical copies of medical treatises and detailed anatomical woodcuts to be mass-produced cheaply and rapidly. Crucially, this bypassed Church control, allowing new humanist ideas and anatomical corrections—such as Andreas Vesalius’s De Fabrica (1543)—to be distributed simultaneously to universities across Europe without the risk of transcription distortions.<br><br>Furthermore, medical communication changed fundamentally due to the founding of the Royal Society in London in 1660, which was awarded a Royal Charter by King Charles II in 1662. The Society provided state-backed institutional prestige to the empirical scientific method, operating under the motto Nullius in Verba ('Take nobody\\'s word for it'). Crucially, in 1665 the Society began publishing Philosophical Transactions, Europe’s first peer-reviewed scientific journal. This created a formal international network where natural philosophers could submit experimental data, critique observations, and replicate findings publicly. Discoveries such as Robert Hooke's microscopic cell studies in Micrographia (1665) and Antonie van Leeuwenhoek's observations of 'animalcules' (1676) were translated and disseminated directly to hundreds of scholars, replacing private isolated speculation with public collaborative science.<br><br>Finally, these communication shifts were driven by the wider intellectual movement of Humanism and the decline of the Catholic Church’s monopoly on education following the Protestant Reformation and the Dissolution of the Monasteries (1536). Humanism encouraged scholars to question ancient authority and return to original Greek texts, placing supreme value on direct human observation and reason rather than unquestioning acceptance of Galen. As respect for Church dogma declined, university medical faculties and commercial publishers actively sought and printed books detailing hands-on dissections and laboratory experiments. Consequently, medical communication shifted from preserving sacred classical tradition to debating new, empirical scientific discoveries.",
      },
    ],
  },
  learning_objectives: [
    'Explain how Gutenberg’s printing press transformed the communication of medical ideas across Europe.',
    'Assess how the Royal Society and its journal Philosophical Transactions established the empirical scientific method.',
    'Analyze the Renaissance Paradox: why revolutionary scientific communication did not lead to new cures or changing public beliefs about disease causes.',
  ],
  quiz: [
    {
      question:
        "How did Johannes Gutenberg's movable metal type printing press (c.1440) directly transform medical knowledge?",
      options: [
        'It allowed identical texts and anatomical diagrams to be mass-produced quickly without copyist errors, bypassing Church censorship.',
        'It made every peasant in Europe immediately literate in medical Latin.',
        'It forced all universities to close down and burn ancient manuscripts.',
        'It proved that the Four Humours did not exist by analyzing ink chemistry.',
      ],
      answer:
        'It allowed identical texts and anatomical diagrams to be mass-produced quickly without copyist errors, bypassing Church censorship.',
      explanation:
        "Gutenberg's press ended the Church's scribal monopoly, prevented copying distortions, and allowed new anatomical treatises to spread across Europe faster than authorities could ban them.",
    },
    {
      question:
        'What is the official Latin motto of the Royal Society, and what is its English translation?',
      options: [
        "'Nullius in Verba' ('Take nobody\\'s word for it').",
        "'In Vino Veritas' ('In wine there is truth').",
        "'Carpe Diem' ('Seize the day').",
        "'Cogito Ergo Sum' ('I think, therefore I am').",
      ],
      answer: "'Nullius in Verba' ('Take nobody\\'s word for it').",
      explanation:
        "The motto Nullius in Verba signifies the Society's refusal to accept any scientific claim based merely on ancient authority or dogma; truths had to be proven empirically.",
    },
    {
      question:
        "What was the name of the world's first peer-reviewed scientific journal, published by the Royal Society in 1665?",
      options: [
        'Philosophical Transactions',
        'De Humani Corporis Fabrica',
        'The Lancet',
        'Observationes Medicae',
      ],
      answer: 'Philosophical Transactions',
      explanation:
        'Philosophical Transactions, launched in 1665, established the standard for scientific peer review and international dissemination of experimental results.',
    },
    {
      question: "What was the 'Renaissance Paradox' in medical history?",
      options: [
        'Huge advances occurred in anatomy and scientific communication, yet everyday treatments and patient survival barely improved.',
        'The Catholic Church supported dissections while outlawing the printing press.',
        'Physicians became much poorer while university fees tripled.',
        'Fewer people died of plague even though no doctors existed.',
      ],
      answer:
        'Huge advances occurred in anatomy and scientific communication, yet everyday treatments and patient survival barely improved.',
      explanation:
        'The paradox highlights that while elite intellectual networks and anatomical science advanced rapidly, lacking Germ Theory meant clinical treatments remained fundamentally medieval.',
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
      title: "Diagram: Gutenberg's Movable Type Printing Press",
      instruction:
        "Sketch a simple diagram illustrating how Gutenberg's movable metal type press worked, labeling the compositor's type case, the metal type blocks, the ink balls, and the screw press lever.",
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

// ============================================================================
// 2. LESSON 2.2: Thomas Sydenham & Bedside Observation (1676)
// ============================================================================
const lesson_2_2 = {
  id: 'lesson_2_2',
  title: 'KT2.2: Thomas Sydenham & The Art of Bedside Observation (1676)',
  specification_anchor:
    'Continuity and change in care and treatment: Thomas Sydenham and the observation of symptoms.',
  enquiry_question:
    "How did Thomas Sydenham's focus on direct observation challenge traditional medical practice?",
  living_timeline_mission: {
    target_milestones: 'Milestone 8 (1676)',
    pages: 'Pages 2–3',
    instruction:
      "Turn back to Pages 2–3 (Milestone 8: 1676). In the sketchpad frame, sketch Sydenham recording clinical symptoms at a patient's bedside and annotate his landmark book: Observationes Medicae!",
  },
  timeline_anchor: [
    {
      date: '1624',
      title: 'Birth of Thomas Sydenham',
      desc: 'Born in Dorset; later served as a captain in Oliver Cromwell’s parliamentary army during the English Civil War before qualifying as a physician at Oxford and Montpellier.',
    },
    {
      date: '1666',
      title: 'Methodus Curandi Febres',
      desc: 'Sydenham publishes his first medical treatise on fevers, urging physicians to move beyond theoretical scholastic dogma and record patient symptoms empirically.',
    },
    {
      date: '1676',
      title: 'Observationes Medicae Published',
      desc: 'Sydenham publishes his masterwork setting out the classification of diseases as distinct species; successfully identifies measles and scarlet fever as two separate ailments.',
    },
    {
      date: '1689',
      title: 'Death of the "English Hippocrates"',
      desc: 'Dies in London; his clinical bedside methodology becomes the foundation of 18th-century British medical education and clinical epidemiology.',
    },
  ],
  delivery_plan: {
    format: '2-Lesson Enquiry Sequence (2x 50 mins) or 100-min Double Period',
    lesson_1: {
      title: 'Lesson 1: The English Hippocrates & The Art of Bedside Diagnosis (50 mins)',
      phases: [
        {
          time: '00–10m',
          label: 'Hook & Spaced Retrieval',
          instruction:
            'Complete Do Now recall on the printing press and Royal Society. Display Source A (Sydenham portrait by Mary Beale).',
        },
        {
          time: '10–30m',
          label: 'Guided Reading & Diagnostic Revolution',
          instruction:
            'Read Acts 1 & 2 ([1.1] to [2.2]). Contrast medieval urine charts and astrology with Sydenham’s detailed bedside observations.',
        },
        {
          time: '30–45m',
          label: 'Vocabulary & Diagnostic Distinction Task',
          instruction:
            'Complete Disciplinary Vocabulary task distinguishing Humoural Diagnosis from Disease Classification.',
        },
        {
          time: '45–50m',
          label: 'Formative Check & Plenary',
          instruction:
            'Teacher poses Hinge Question on Mary Beale portrait. Log Sydenham on Living Timeline.',
        },
      ],
    },
    lesson_2: {
      title: 'Lesson 2: Treatments, Continuities & 12-Mark GCSE Writing (50 mins)',
      phases: [
        {
          time: '00–10m',
          label: 'Inspect Sources B & C',
          instruction:
            'Examine Source B (quack doctor) and Source C (Renaissance hospital). Discuss the limits of Sydenham’s treatments.',
        },
        {
          time: '10–25m',
          label: 'Deconstruct Acts 3 & 4 (Treatment Paradox)',
          instruction:
            'Analyze why Sydenham prescribed cinchona bark and cooling regimes while continuing bloodletting and purging.',
        },
        {
          time: '25–45m',
          label: 'Deliberate Exam Practice',
          instruction:
            'Complete Q3 Difference question [4m] and Q4 Explain Why Sydenham was significant [12m] using structure strips.',
        },
        {
          time: '45–50m',
          label: 'Self-Assessment & Peer Feedback',
          instruction: 'Evaluate model answers and annotate Milestone 8 on Pages 2–3.',
        },
      ],
    },
  },
  hook_text:
    'While European anatomists dissected corpses in lecture theatres, one London physician stepped out of the university library and into the sickroom. Thomas Sydenham, nicknamed the "English Hippocrates", told young doctors: "You must go to the bedside; there alone you can learn disease." He rejected 1,500 years of astrological charts and complex urine wheels, arguing that illnesses were distinct biological entities with recognizable symptoms—like species of plants in a garden. Yet, even as he proved measles was separate from scarlet fever and prescribed Peruvian tree bark for malaria, Sydenham still bled patients to balance their humours. How could one man be both a revolutionary pioneer and a prisoner of ancient tradition?',
  teacher_notes: {
    primer:
      'Guide students through the diagnostic revolution led by Thomas Sydenham. Help them contrast medieval individualized humoral diagnosis (where every illness was treated as a unique internal imbalance) with Sydenham’s groundbreaking concept of diseases as external, universal "species" that produce identical symptom clusters across different patients.',
    objectives: [
      {
        objective:
          'Explain Sydenham’s revolutionary emphasis on direct bedside clinical observation.',
        primer:
          'Direct students to paragraphs [1.1]–[1.2]. Emphasize that Sydenham rejected reading Galen from elevated lecture desks, pulse charts, and astrological almanacs, insisting that physicians sit beside patients and record symptoms over time.',
        question:
          'Why did Sydenham’s bedside method represent a direct break from traditional medieval medical education?',
      },
      {
        objective: 'Analyze how Sydenham classified diseases into distinct species.',
        primer:
          'Direct students to paragraphs [2.1]–[2.2]. Explain his botanical analogy: just as botanists classify plants by their flowers, doctors should classify illnesses by symptoms. Focus on his differentiation between scarlet fever and measles in Observationes Medicae (1676).',
        question:
          'How did classifying diseases as external species challenge the Galenic theory of the Four Humours?',
      },
      {
        objective:
          'Evaluate the limits of Sydenham’s practice: rational treatments alongside traditional humoral remedies.',
        primer:
          'Direct students to paragraphs [3.1]–[4.2]. Contrast his rational innovations (cinchona bark/quinine for malaria, cool bedrooms for smallpox) with his continued use of bloodletting and purging.',
        question:
          'Why did Sydenham continue to prescribe bloodletting even after proving diseases were distinct external species?',
      },
    ],
    source_context: {
      'Source A':
        'Oil portrait of Dr Thomas Sydenham (c1688) by Mary Beale, one of England’s earliest professional female painters. Beale was a close friend of Sydenham, whose son was apprenticed to him. **Hinge Question:** How does Sydenham’s sober, plain dress reflect his practical, down-to-earth rejection of university academic pomposity and book-learning?',
      'Source B':
        'The Quack Physician (1660s) by Jan Steen, illustrating a theatrical travelling charlatan selling potions and examining a urine flask while flattering a gullible wealthy patient. **Hinge Question:** How does this contemporary satire demonstrate why Sydenham felt it was urgent to establish scientific, clinical observation in place of commercial superstition?',
      'Source C':
        'A 17th-century ward in a municipal charity hospital showing rows of narrow wooden beds cared for by matrons, following the dissolution of monastic infirmaries. **Hinge Question:** Why did the closure of medieval religious hospitals in 1536 force Renaissance doctors like Sydenham to focus more directly on community and bedside clinical care?',
    },
  },
  do_now: [
    {
      q: "What was the Latin motto of the Royal Society, meaning 'Take nobody's word for it'?",
      a: 'Nullius in Verba',
    },
    {
      q: "Name the world's first peer-reviewed scientific journal published by the Royal Society in 1665.",
      a: 'Philosophical Transactions',
    },
    {
      q: 'What name did Antonie van Leeuwenhoek give to the microscopic organisms he observed in 1676?',
      a: 'Animalcules (bacteria)',
    },
    {
      q: 'Who published Micrographia in 1665 featuring a giant fold-out engraving of a flea?',
      a: 'Robert Hooke',
    },
  ],
  fun_facts: [
    {
      fact: "When a young student asked Thomas Sydenham which medical textbooks he should read to prepare for becoming a physician, Sydenham famously replied: 'Read Don Quixote; it is a very good book. I read it myself often.'",
      icon: 'fa-book-open',
    },
    {
      fact: "Sydenham popularized 'laudanum'—a liquid mixture of opium dissolved in sherry wine—which became the standard medical painkiller across Britain for the next two centuries.",
      icon: 'fa-wine-bottle',
    },
    {
      fact: 'To treat smallpox, traditional doctors kept patients in sealed rooms with roaring fires and heavy blankets; Sydenham shocked everyone by opening the windows, taking away blankets, and giving patients cool drinks.',
      icon: 'fa-wind',
    },
  ],
  guided_reading: [
    {
      q: 'Why was Thomas Sydenham nicknamed the "English Hippocrates"?',
      a: 'Because like ancient Hippocrates, he insisted on close clinical observation of patients at the bedside and allowing nature to heal, rejecting complex book-based theories.',
    },
    {
      q: 'Which two childhood illnesses did Sydenham prove were separate diseases?',
      a: 'He proved that measles and scarlet fever were two completely distinct diseases, rather than variations of the same general fever.',
    },
    {
      q: 'What new remedy from South America did Sydenham prescribe for malaria fevers?',
      a: 'Cinchona bark (often called Jesuit’s bark or Peruvian bark), which contained natural quinine that successfully suppressed malarial fevers.',
    },
  ],
  narrative_blocks: [
    {
      title: 'Act 1: Context & Catalyst (The "English Hippocrates" at the Bedside)',
      text: '<span class="para-ref">[1.1]</span> In the mid-17th century, university medical education in England remained stubbornly detached from the reality of patient care. Wealthy physicians spent years studying Galen, Hippocrates, and Aristotle in Latin, memorizing theoretical passages and casting horoscopes to diagnose illnesses. When visiting a sick aristocrat, a physician often spent more time inspecting a glass matula filled with urine or calculating planetary alignments than examining the patient’s physical body. If a treatment failed, doctors blamed the patient’s corrupt humoural constitution rather than their own medical theories.<br><br><span class="para-ref">[1.2]</span> Thomas Sydenham (1624–1689) rebelled against this academic detachment. Having served as a cavalry officer in the English Civil War, Sydenham brought a practical, no-nonsense soldier’s mindset to medicine. Practicing in Westminster, he insisted that true medical knowledge could only be gained by sitting beside the patient’s bed, taking comprehensive clinical notes, and carefully tracking symptoms from the onset of fever to recovery or death. Because he revived the ancient Greek emphasis on natural observation, contemporaries revered him as the "English Hippocrates".',
    },
    {
      title: 'Act 2: Escalation & Conflict (Observationes Medicae & Disease Species)',
      text: '<span class="para-ref">[2.1]</span> Sydenham’s greatest conceptual breakthrough was his revolutionary theory of disease classification. For 1,400 years, Galenic orthodoxy taught that disease was entirely personal: each individual had a unique mixture of the Four Humours, meaning that two people suffering from a fever were experiencing two completely different internal imbalances. Sydenham flatly rejected this, arguing that diseases were external entities that existed independently of the patient. He compared illnesses to plants in a botanical garden, asserting that diseases could be organized into distinct families and "species" based on fixed clusters of symptoms.<br><br><span class="para-ref">[2.2]</span> In 1676, Sydenham published his masterwork, <em>Observationes Medicae</em> (Medical Observations), which quickly became the definitive clinical handbook across Europe. Applying his classification system, he demonstrated that conditions previously lumped together under the vague label of "fevers" were actually entirely separate biological disorders. Most famously, he carefully documented the distinct rashes, incubation periods, and fever patterns of measles and scarlet fever, proving conclusively that they were two independent diseases requiring different care.',
    },
    {
      title: 'Act 3: Forensic Evidence (Practical Therapies vs Quack Remedies)',
      source: {
        title: 'Source A: Portrait of Thomas Sydenham by Mary Beale (c1688)',
        src: '/images/thomas_sydenham.jpg',
        source: '/images/thomas_sydenham.jpg',
        image: '/images/thomas_sydenham.jpg',
        question:
          "Look at Source A above: Notice Sydenham's plain, sober attire and natural hair, contrasting with the extravagant powdered wigs and velvet robes of theatrical London doctors. How does his modest appearance reflect his clinical philosophy that real medicine must be practiced through rigorous observation at the patient's bedside rather than university pomp?",
        source_context:
          "Known as the 'English Hippocrates', Thomas Sydenham (1624–1689) rejected speculative university book-learning. In Observationes Medicae (1676), he argued that doctors must observe symptoms directly, record disease progressions, and classify illnesses into distinct species, pioneering the cool regime for smallpox and cinchona bark for malaria.",
        citation:
          'Oil portrait of Dr Thomas Sydenham by Mary Beale, c.1688, National Portrait Gallery, London (NPG 211).',
      },
      text: '<span class="para-ref">[3.1]</span> Sydenham’s empirical focus led him to champion innovative, common-sense treatments. For smallpox, traditional physicians sealed sickrooms, lit roaring fires, and covered shivering patients in heavy woolen blankets to "sweat out the venom". Sydenham recognized that this suffocating heat worsened the fever and killed patients. Instead, he pioneered a revolutionary "cooling regime": opening windows to circulate fresh air, removing heavy blankets, and prescribing cool fluids and mild cordials. Survival rates among his smallpox patients improved dramatically.<br><br><span class="para-ref">[3.2]</span> Sydenham also enthusiastically embraced new botanical remedies brought from the Americas. He popularized the use of Cinchona bark (Peruvian bark, containing quinine) to treat ague (malaria), showing that specific medicines could target specific diseases rather than just purging the whole body. He also developed liquid laudanum (opium dissolved in alcohol), providing the first reliable and easily dosed painkiller for chronic sufferers.',
    },
    {
      title: 'Act 4: The Historical Verdict & The Limits of Observation',
      text: '<span class="para-ref">[4.1]</span> Despite his profound contributions to clinical diagnosis, Sydenham’s practice illustrates the hard boundaries of Renaissance science. Because the Germ Theory lay nearly two centuries in the future, Sydenham had no understanding of bacteria, viruses, or the true biological causes of infection. He firmly believed that epidemics were triggered by mysterious atmospheric changes and poisonous "miasmas" rising from the earth. Consequently, while his clinical descriptions of illnesses were brilliant, his understanding of what caused them remained speculative.<br><br><span class="para-ref">[4.2]</span> Furthermore, when faced with conditions that did not respond to cinchona or cooling regimes, Sydenham fell back on traditional medieval therapies. Throughout his long career, he routinely bled and purged his patients to rebalance their humours, believing that bleeding lowered inflammatory heat. Furthermore, conservative physicians in London condemned him for undermining university tradition, and ordinary people continued to patronize quack doctors selling fake panaceas (<span class="archival-meta-tag">Source B</span>). Nonetheless, by establishing bedside empirical observation and disease classification, Sydenham laid the indispensable foundation for modern clinical epidemiology.',
    },
  ],
  tasks: [
    {
      type: 'two_sided_argument',
      topic: 'Thomas Sydenham: Bedside Clinical Observation vs Traditional Humoural Treatments',
      text: 'Thomas Sydenham: Bedside Clinical Observation vs Traditional Humoural Treatments',
      instruction:
        'GCSE Analytical Assessment: Evaluate the diagnostic advancements of Thomas Sydenham against his continued reliance on traditional humoral treatments.',
      advancement: {
        title: 'Diagnostic Advancement (Change)',
        points: [
          'Pioneered direct bedside observation, recording patient symptoms meticulously over time rather than diagnosing from books, urine wheels, or astrology.',
          'Classified diseases into distinct species (like plants in a botany manual) in Observationes Medicae (1676), successfully separating scarlet fever from measles.',
          'Introduced rational clinical therapies: cinchona bark (quinine) for malaria and cool, ventilated bedrooms for smallpox patients.',
        ],
        starter: 'On the one hand, Thomas Sydenham significantly transformed medicine because...',
      },
      limitations: {
        title: 'Enduring Continuity & Stagnation (Limitations)',
        points: [
          'Had zero knowledge of microorganisms or germs; still believed diseases were caused by atmospheric miasma and toxic environmental vapors.',
          'Classification was based entirely on visible external symptoms rather than internal biological pathogens.',
          'Continued to prescribe traditional humoral treatments, frequently bleeding, purging, and sweating patients when new treatments were unavailable.',
        ],
        starter: 'However, the practical significance of Sydenham was limited because...',
      },
      synthesis_prompt:
        'Write a balanced GCSE exam paragraph evaluating the extent to which Thomas Sydenham was significant in the development of medicine.',
      synthesis_connectives: [
        'Sydenham was significant because...',
        'By rejecting classical theory, he established...',
        'This directly led to...',
        'However, his impact on treatments was limited because...',
        'Therefore, while he revolutionized diagnosis...',
      ],
      model_answer:
        "On the one hand, Thomas Sydenham was highly significant in the development of medicine because he pioneered a scientific, empirical approach to clinical diagnosis that broke fundamentally from medieval book-learning. Nicknamed the 'English Hippocrates', Sydenham insisted on sitting at the patient's bedside, taking meticulous clinical notes, and tracking the precise progression of symptoms over time, rather than relying on ancient Galenic treatises or astrological charts. In his landmark 1676 publication Observationes Medicae, Sydenham argued that diseases were like plants or animals: separate, external species that could be systematically classified into distinct categories rather than being treated as unique, personal humoral imbalances. This enabled him to successfully distinguish scarlet fever from measles as two entirely separate diseases for the first time. Furthermore, Sydenham popularized practical, effective therapies, such as using Peruvian cinchona bark (quinine) to treat malarial fevers and advocating cool bedrooms and fresh air for smallpox victims instead of suffocating them under heavy heating blankets.<br><br>However, Sydenham’s significance was severely limited because his understanding of disease causes and treatments remained fundamentally traditional. Because microscopes were primitive and germ theory was nearly two centuries away, Sydenham still believed that illnesses were triggered by poisonous atmospheric miasmas and toxic vapors in the air. Consequently, he was unable to identify the true biological causes of infectious diseases and frequently continued to prescribe traditional bloodletting and purging when other remedies failed. Furthermore, conservative physicians in London resisted his ideas, criticizing his refusal to base diagnoses on classical Galenic texts. Therefore, while Sydenham revolutionized the philosophy of clinical diagnosis and laid the foundations for modern epidemiology, his work resulted in very little immediate improvement in curing illness or saving lives during the Renaissance.",
    },
  ],
  vocab: [
    {
      term: 'English Hippocrates',
      def: 'Honorary title given to Thomas Sydenham because of his commitment to clinical observation at the bedside and natural healing.',
    },
    {
      term: 'Observationes Medicae (1676)',
      def: 'Sydenham’s landmark medical textbook classifying diseases into separate species based on detailed symptom clusters.',
    },
    {
      term: 'Disease Classification',
      def: 'The revolutionary idea that diseases are distinct external entities that affect different people identically, rather than unique personal imbalances.',
    },
    {
      term: 'Cinchona Bark',
      def: 'Peruvian tree bark containing natural quinine, imported from South America and prescribed by Sydenham to cure malarial fevers.',
    },
    {
      term: 'Cooling Regime',
      def: 'Sydenham’s common-sense smallpox treatment replacing suffocating heating blankets with open windows, fresh air, and cool fluids.',
    },
    {
      term: 'Humoural Persistence',
      def: 'The enduring reliance of physicians (including Sydenham) on bleeding and purging due to the lack of knowledge about germs.',
    },
  ],
  vocab_cloze_text:
    'Thomas Sydenham was nicknamed the [English Hippocrates] because he rejected theoretical university book-learning in favor of close bedside observation. In his 1676 masterwork [Observationes Medicae (1676)], he pioneered [Disease Classification], arguing that illnesses were distinct external species like plants in a botany book, allowing him to separate measles from scarlet fever. For treatments, he prescribed [Cinchona Bark] containing quinine for malaria and introduced a revolutionary [Cooling Regime] for smallpox patients. However, because germs were unknown, Sydenham still practiced [Humoural Persistence], routinely bleeding and purging his patients.',
  gcse_task: {
    title: 'Edexcel GCSE (9–1) Paper 1 Section B Practice: Q3 & Q4',
    tasks: [
      {
        type: 'written',
        tariff: 'Q3: Explain one way in which diagnosis was different [4 marks]',
        text: "Explain one way in which Thomas Sydenham's approach to diagnosis was different from medieval physicians. [4 marks]",
        model:
          'One way in which Sydenham’s approach to diagnosis was different was his insistence on **direct, long-term bedside clinical observation** rather than relying on theoretical books, astrology, and urine charts. In the medieval period, university-educated physicians rarely spent time observing patients directly; instead, they examined a urine flask (uroscopy) against a colour wheel, consulted astrological calendars (almanacs) to check planetary alignments, and diagnosed illness as an internal imbalance of the Four Humours unique to that individual. In contrast, Sydenham sat directly at the patient’s bedside, carefully recorded symptoms over time, and diagnosed diseases as distinct external species that behaved identically in different patients (such as distinguishing scarlet fever from measles in Observationes Medicae, 1676). This was a fundamental difference because it moved medical diagnosis from theoretical speculation to empirical observation.',
      },
      {
        type: 'written',
        tariff: 'Q4: Explain why Thomas Sydenham was significant [12 marks]',
        text: 'Explain why Thomas Sydenham was significant in the development of medicine in Britain. [12 marks]',
        stimulus: ['Observationes Medicae (1676)', 'Classifying diseases into species'],
        model:
          "Thomas Sydenham was significant primarily because he revolutionized the methodology of medical diagnosis by shifting medicine away from ancient book-learning toward direct bedside clinical observation. During the 17th century, physicians still relied heavily on classical Galenic dogma and astrological almanacs to diagnose illnesses theoretically. Sydenham, nicknamed the 'English Hippocrates', rejected this detached academic approach, insisting that physicians must sit at the patient's bedside, take detailed clinical notes, and closely monitor the progression of symptoms over time. By doing so, he established empirical clinical observation as the cornerstone of British medical practice, encouraging doctors to treat what they observed in living patients rather than what they read in ancient manuscripts.<br><br>Furthermore, Sydenham was exceptionally significant because he pioneered the concept of classifying diseases into distinct species in his landmark publication Observationes Medicae (1676). Prior to Sydenham, Galenic humoral theory claimed that illness was completely personal: every patient had an individualized balance of humours, so two patients with fevers were believed to have two different disorders. Sydenham fundamentally overturned this by arguing that diseases were external entities that could be categorized into families and species based on fixed symptom clusters, just like plants in a botanical book. This conceptual shift enabled him to achieve major diagnostic breakthroughs, such as proving that measles and scarlet fever were two separate diseases rather than variations of the same general fever, laying the essential foundations for modern epidemiology.<br><br>Finally, Sydenham was significant because he introduced rational, effective clinical treatments that challenged dangerous medieval traditions. For smallpox, traditional doctors sealed patients in heated rooms with roaring fires and heavy blankets to 'sweat out' the poison, which frequently killed them. Sydenham pioneered a common-sense 'cooling regime', opening windows for fresh air, removing heavy blankets, and prescribing cool fluids, which dramatically improved patient survival rates. Furthermore, he popularized the use of South American cinchona bark (quinine) to treat malarial fevers, demonstrating that specific remedies could target specific diseases. While his overall impact was constrained by his continued reliance on bloodletting and lack of germ knowledge, his empirical philosophy permanently transformed British clinical education.",
      },
    ],
  },
  learning_objectives: [
    'Explain Sydenham’s revolutionary emphasis on direct bedside clinical observation.',
    'Analyze how Sydenham classified diseases into distinct species in Observationes Medicae (1676).',
    'Evaluate the limits of Sydenham’s practice: rational treatments alongside traditional humoral remedies.',
  ],
  quiz: [
    {
      question:
        'What nickname was given to Thomas Sydenham because of his emphasis on bedside observation?',
      options: [
        'The English Hippocrates',
        'The Roman Galen',
        'The Father of Surgery',
        'The London Alchemist',
      ],
      answer: 'The English Hippocrates',
      explanation:
        'Sydenham was called the English Hippocrates because he revived Hippocrates’ method of careful clinical bedside observation and letting nature take its course.',
    },
    {
      question: 'Name the 1676 book in which Sydenham set out his methods of clinical observation.',
      options: [
        'Observationes Medicae',
        'De Humani Corporis Fabrica',
        'Philosophical Transactions',
        'Micrographia',
      ],
      answer: 'Observationes Medicae',
      explanation:
        'Observationes Medicae (Medical Observations), published in 1676, became the premier textbook on clinical diagnosis across Europe for over a century.',
    },
    {
      question:
        'What treatment did Sydenham prescribe for malaria fevers, imported from South America?',
      options: [
        'Cinchona bark (quinine)',
        'Mercury ointment',
        'Boiling elderberry oil',
        'Leeches and vinegar',
      ],
      answer: 'Cinchona bark (quinine)',
      explanation:
        'Cinchona bark (Jesuit’s bark), imported from South America, contained quinine, which effectively reduced malarial fevers.',
    },
    {
      question:
        'Which two childhood illnesses did Sydenham successfully prove were separate diseases?',
      options: [
        'Measles and scarlet fever',
        'Smallpox and plague',
        'Tuberculosis and cholera',
        'Typhoid and dysentery',
      ],
      answer: 'Measles and scarlet fever',
      explanation:
        'By carefully observing symptom clusters, Sydenham proved that scarlet fever was a distinct disease from measles.',
    },
  ],
  flashcards: [
    {
      q: 'What was Thomas Sydenham’s core medical philosophy?',
      a: 'Direct clinical observation of symptoms at the patient’s bedside, rejecting book-learning, astrology, and urine charts.',
    },
    {
      q: 'What revolutionary idea about disease did Sydenham introduce in Observationes Medicae (1676)?',
      a: 'That diseases are distinct external "species" with fixed symptom patterns (like plants), rather than unique personal humoural imbalances.',
    },
    {
      q: 'What was Sydenham’s "cooling regime" for smallpox?',
      a: 'Opening bedroom windows for ventilation, removing heavy blankets, and giving cool drinks, rejecting the traditional suffocating heating method.',
    },
    {
      q: 'What botanical drug did Sydenham popularize for treating malaria fevers?',
      a: 'Cinchona bark (quinine), brought to Europe from South America.',
    },
    {
      q: 'What was the major limitation of Sydenham’s medical practice?',
      a: 'He had no knowledge of germs or bacteria, so he still believed in miasma and continued to bleed and purge patients.',
    },
  ],
  draw_tasks: [
    {
      title: 'Diagram: Sydenham at the Bedside vs Medieval Physician',
      instruction:
        "Draw a split comparison sketch: On the left, draw a medieval physician holding up a urine flask and looking at a zodiac chart; on the right, draw Thomas Sydenham sitting by the patient's bed taking clinical notes.",
    },
  ],
  sources: [
    {
      title: 'Source A: Portrait of Thomas Sydenham by Mary Beale (c1688)',
      src: '/images/thomas_sydenham.jpg',
      source: '/images/thomas_sydenham.jpg',
      caption:
        'Portrait of Dr Thomas Sydenham painted by his close friend Mary Beale, showing his sober attire and reflective demeanor.',
      desc: 'Authentic 17th-century portrait of Thomas Sydenham by Mary Beale.',
    },
    {
      title: 'Source B: The Quack Physician by Jan Steen (1660s)',
      src: '/images/quack_doctor_steen.jpg',
      source: '/images/quack_doctor_steen.jpg',
      caption:
        'A 17th-century painting depicting an itinerant quack doctor examining a urine flask and flattering a patient.',
      desc: 'Contemporary oil painting depicting the commercial superstition of 17th-century medicine.',
    },
    {
      title: 'Source C: Renaissance Municipal Hospital Ward',
      src: '/images/hotel_dieu_hospital.jpg',
      source: '/images/hotel_dieu_hospital.jpg',
      caption:
        'A 17th-century hospital ward showing rows of beds cared for by matrons following the closure of religious monastic infirmaries.',
      desc: 'Historic depiction of early modern hospital patient care.',
    },
  ],
};

// ============================================================================
// 3. LESSON 2.3: Andreas Vesalius & The Anatomical Revolution (1543)
// ============================================================================
const lesson_2_3 = {
  id: 'lesson_2_3',
  title: 'KT2.3: Andreas Vesalius & The Anatomical Revolution (1543)',
  specification_anchor:
    'Andreas Vesalius and his work on anatomy; the impact of De Humani Corporis Fabrica (1543).',
  enquiry_question:
    'Why did Andreas Vesalius succeed in overturning 1,400 years of Galenic anatomical authority?',
  living_timeline_mission: {
    target_milestones: 'Milestone 3 (1543)',
    pages: 'Pages 2–3',
    instruction:
      'Turn back to Pages 2–3 (Milestone 3: 1543). In the sketchpad frame, sketch Vesalius dissecting the human muscular system and annotate his landmark masterwork: De Humani Corporis Fabrica!',
  },
  timeline_anchor: [
    {
      date: '1514',
      title: 'Birth of Andreas Vesalius',
      desc: 'Born in Brussels into a family of imperial physicians; studied medicine at the University of Paris before moving to Padua in Italy.',
    },
    {
      date: '1537',
      title: 'Professor of Surgery at Padua',
      desc: 'Graduates and is immediately appointed Professor of Surgery at Padua University; shocks colleagues by descending from the lecturer’s pulpit to perform dissections himself.',
    },
    {
      date: '1543',
      title: 'Publication of De Fabrica',
      desc: 'Publishes De Humani Corporis Fabrica (On the Fabric of the Human Body) in Basel, correcting over 300 of Galen’s anatomical errors with magnificent woodcut illustrations.',
    },
    {
      date: '1564',
      title: 'Death of Vesalius',
      desc: 'Dies on the Greek island of Zakynthos following a pilgrimage to Jerusalem; his empirical anatomical method becomes standard across European medical schools.',
    },
  ],
  delivery_plan: {
    format: '2-Lesson Enquiry Sequence (2x 50 mins) or 100-min Double Period',
    lesson_1: {
      title: 'Lesson 1: The Padua Anatomical Theatre & Overturning Galen (50 mins)',
      phases: [
        {
          time: '00–10m',
          label: 'Hook & Spaced Retrieval',
          instruction:
            'Complete Do Now retrieval on Thomas Sydenham. Display Source A (De Fabrica frontispiece) to contrast with medieval lecture halls.',
        },
        {
          time: '10–30m',
          label: 'Guided Reading & The 300 Galenic Errors',
          instruction:
            'Read Acts 1 & 2 ([1.1] to [2.2]). Analyze how Galen dissected apes and pigs, leading to jawbone, breastbone, and heart errors.',
        },
        {
          time: '30–45m',
          label: 'Vocabulary & Disciplinary Distinction Task',
          instruction:
            'Complete Disciplinary Vocabulary task distinguishing Galenic Orthodoxy from Direct Human Dissection.',
        },
        {
          time: '45–50m',
          label: 'Formative Check & Plenary',
          instruction:
            'Teacher poses Hinge Question on Source A frontispiece. Log Vesalius on Living Timeline.',
        },
      ],
    },
    lesson_2: {
      title: 'Lesson 2: De Fabrica, Treatment Limitations & 16-Mark Evaluative Essay (50 mins)',
      phases: [
        {
          time: '00–10m',
          label: 'Inspect Sources B & C',
          instruction:
            'Examine Source B (muscle men woodcut) and Source C (Galenic phlebotomy chart). Discuss why anatomy did not cure illness.',
        },
        {
          time: '10–25m',
          label: 'Deconstruct Acts 3 & 4 (The Treatment Gap)',
          instruction:
            'Analyze why knowing body structure could not cure infection, stop surgical shock, or halt epidemics.',
        },
        {
          time: '25–45m',
          label: 'Deliberate Exam Practice (16+4m Essay)',
          instruction:
            'Complete Q3 Difference question [4m] and 16-mark essay on Vesalius using the 3-column structure strip and criteria.',
        },
        {
          time: '45–50m',
          label: 'Self-Assessment & Living Timeline Check',
          instruction: 'Annotate Page 2–3 Milestone 3 with sketchpad deliverables.',
        },
      ],
    },
  },
  hook_text:
    'In 1537, a 23-year-old professor named Andreas Vesalius shocked the University of Padua. For over a thousand years, professors of anatomy sat high above the dissection theatre in an elevated wooden throne called the cathedra, chanting ancient Latin passages from Galen while an illiterate barber-surgeon hacked away at a decaying corpse. If the body disagreed with Galen, professors insisted the body was deformed. Vesalius did the unthinkable: he climbed down from the pulpit, threw off his academic robes, took the dissecting knife into his own hands, and proved that Galen had made over 300 fundamental anatomical errors because he had never dissected a human being. Yet, as Vesalius revealed the true architecture of the human body, doctors remained completely powerless to cure diseases. Was his revolution brilliant, or practically useless?',
  teacher_notes: {
    primer:
      'Examine the shift from dogmatic medieval anatomy to direct human dissection. Students must understand that Vesalius proved Galen had only dissected animals (Barbary apes, pigs, and dogs) due to Roman burial taboos. Crucially, guide students to evaluate the essay debate: while Vesalius revolutionized anatomical science and surgical education, knowing the structure of muscles and bones could not cure infections, stop pain, or save living patients.',
    objectives: [
      {
        objective:
          'Explain how Vesalius’s hands-on dissection method overthrew medieval university traditions.',
        primer:
          'Direct students to paragraphs [1.1]–[1.2]. Emphasize the visual contrast of the frontispiece: Vesalius descending from the high cathedra to perform dissections with his own hands amidst an active crowd.',
        question:
          'Why was Vesalius stepping down from the professor’s pulpit considered an act of scientific rebellion?',
      },
      {
        objective:
          'Analyze how Vesalius identified and corrected over 300 of Galen’s anatomical errors.',
        primer:
          'Direct students to paragraphs [2.1]–[2.2]. Detail specific corrections: the human lower jaw is one bone (not two), the sternum has 3 parts (not 7), and the septum of the heart has no pores.',
        question: 'Why did Galen make so many anatomical errors regarding internal human organs?',
      },
      {
        objective:
          'Evaluate the impact of De Humani Corporis Fabrica (1543) and its critical limitations on medical treatment.',
        primer:
          'Direct students to paragraphs [3.1]–[4.2]. Contrast the visual beauty of the woodcut plates with the medical reality that anatomy could not cure internal infections, eliminate surgical pain, or halt epidemics.',
        question:
          'Why did Vesalius’s discovery that the heart septum had no pores fail to cure any sick patients during his lifetime?',
      },
    ],
    source_context: {
      'Source A':
        'The famous engraved title-page frontispiece of De Humani Corporis Fabrica (Basel, 1543), showing Vesalius personally dissecting a female cadaver at the University of Padua surrounded by students, doctors, and nobles. **Hinge Question:** How does the chaotic, crowded anatomy theatre depicted here contrast with the rigid hierarchy of medieval lecture halls where professors read Galen from a high chair?',
      'Source B':
        'One of the fourteen "Muscle Men" woodcut plates from Book II of De Fabrica (1543), attributed to Jan van Calcar, depicting the human muscular system in dynamic classical poses against an Italian landscape. **Hinge Question:** Why was it vital for Vesalius to use skilled Renaissance artists and the printing press rather than traditional medieval hand-copying to communicate his findings?',
      'Source C':
        'A 16th-century printed "Phlebotomy Man" diagram showing traditional bloodletting points based on Galenic humoural theory. **Hinge Question:** Why did physicians continue to rely on bloodletting charts even after Vesalius conclusively proved Galen’s anatomical descriptions were fundamentally wrong?',
    },
  },
  do_now: [
    {
      q: 'What nickname was given to Thomas Sydenham because of his emphasis on bedside observation?',
      a: 'The English Hippocrates',
    },
    {
      q: 'Name the 1676 book in which Sydenham set out his methods of clinical observation.',
      a: 'Observationes Medicae',
    },
    {
      q: 'What treatment did Sydenham prescribe for malaria fevers, imported from South America?',
      a: 'Cinchona bark (quinine)',
    },
    {
      q: 'Which two childhood illnesses did Sydenham successfully prove were separate diseases?',
      a: 'Measles and scarlet fever',
    },
  ],
  fun_facts: [
    {
      fact: 'As a young medical student in Paris and Louvain, Vesalius was so desperate to study human bones that he stole corpses from the gallows where executed criminals were left hanging.',
      icon: 'fa-skull',
    },
    {
      fact: "The fourteen 'Muscle Men' illustrations in De Fabrica, when lined up side-by-side in order, form a continuous panoramic landscape of the Euganean Hills outside Padua in northern Italy.",
      icon: 'fa-mountain',
    },
    {
      fact: 'Vesalius presented a deluxe hand-colored copy of De Fabrica printed on purple vellum (calfskin) bound in velvet to Holy Roman Emperor Charles V, who immediately appointed him imperial court physician.',
      icon: 'fa-crown',
    },
  ],
  guided_reading: [
    {
      q: 'Where did Andreas Vesalius serve as Professor of Surgery?',
      a: 'At the prestigious University of Padua in northern Italy.',
    },
    {
      q: 'Why did Galen make over 300 errors about human anatomy?',
      a: 'Because Roman religious taboos forbade human dissection, forcing Galen to dissect animals like Barbary apes, pigs, and dogs, falsely assuming human bodies were identical.',
    },
    {
      q: 'What were two specific Galenic errors corrected by Vesalius?',
      a: 'Vesalius proved that the human lower jaw is a single bone (not two), and that the septum dividing the heart ventricles is solid with no invisible pores.',
    },
  ],
  narrative_blocks: [
    {
      title: 'Act 1: Context & Catalyst (The Padua Anatomical Theatre)',
      text: '<span class="para-ref">[1.1]</span> In medieval European universities, the study of human anatomy was an exercise in passive textual repetition rather than scientific discovery. In rare winter dissections—permitted only a few times each year on executed criminals—the professor of anatomy sat elevated above the lecture hall in a high wooden pulpit called the <em>cathedra</em>. From this throne, he read aloud ancient Latin texts written by the Roman physician Claudius Galen. Down below on the damp stone floor, an uneducated barber-surgeon (the <em>demonstrator</em>) sliced open the body, while a junior assistant pointed out organs with a wooden wand. If a dissected organ clearly contradicted Galen’s written descriptions, professors dismissed the discrepancy by claiming the corpse was deformed, diseased, or that human bodies had physically degenerated since classical times.<br><br><span class="para-ref">[1.2]</span> This entrenched scholastic tradition was shattered when Andreas Vesalius (1514–1564) arrived at the University of Padua. Appointed Professor of Surgery in 1537 at just 23 years old, Vesalius rejected the cathedra. In front of packed audiences of students, visiting physicians, and city officials (<span class="archival-meta-tag">Source A</span>), he stepped down to the dissection table, took the scalpel into his own hands, and dissected human cadavers himself. Vesalius insisted that medical students must trust what their own eyes observed in human tissue rather than blindly revering ancient authority.',
    },
    {
      title: 'Act 2: Escalation & Conflict (Correcting 300 Galenic Errors)',
      text: '<span class="para-ref">[2.1]</span> Through meticulous, repetitive human dissections, Vesalius made a startling discovery: Galen’s revered anatomical treatises were riddled with fundamental errors. Vesalius realized that Roman law had strictly prohibited human dissection; consequently, Galen had dissected Barbary apes, dogs, sheep, and pigs, mistakenly assuming that human internal organs were anatomically identical to animals. Over several years of intensive research, Vesalius identified and documented over 300 major errors in Galen’s anatomical writings.<br><br><span class="para-ref">[2.2]</span> Among his most significant corrections, Vesalius proved that the human lower jaw (mandible) consists of a single solid bone, whereas Galen had claimed it consisted of two separate bones (which is true in dogs and apes, but not humans). He proved that the human breastbone (sternum) has three segments rather than seven, that the human liver does not have five separate lobes, and that the human uterus is a single chamber rather than multi-horned. Crucially for cardiovascular physiology, Vesalius examined the central muscular wall (septum) of the heart and proved it was thick and solid, decisively refuting Galen’s claim that invisible microscopic pores allowed blood to seep directly from the right ventricle into the left.',
    },
    {
      title: 'Act 3: Forensic Evidence (De Humani Corporis Fabrica, 1543)',
      source: {
        title: 'Source B: Vesalius Muscle Men Plate from De Fabrica (1543)',
        src: '/images/vesalius_muscle_men.jpg',
        source: '/images/vesalius_muscle_men.jpg',
        image: '/images/vesalius_muscle_men.jpg',
        question:
          "Look at Source B above: Examine the dissected human body posed dynamically against the landscape of the Italian countryside. How does this plate reflect the revolutionary collaboration between Renaissance art (Titian's workshop) and scientific dissection, and why was visual anatomical accuracy essential for moving surgery beyond medieval guesswork?",
        source_context:
          "In 1543, Andreas Vesalius published De Humani Corporis Fabrica, featuring over 200 magnificent woodcut illustrations attributed to Jan van Calcar. By peeling back successive anatomical layers from surface musculature to the skeleton, Vesalius corrected over 300 of Galen's animal-based errors.",
        citation:
          'Woodcut plate of the third muscle man from Book II of De Humani Corporis Fabrica, Basel: Johannes Oporinus, 1543.',
      },
      text: '<span class="para-ref">[3.1]</span> In 1543, at the age of twenty-eight, Vesalius published his monumental masterwork: <em>De Humani Corporis Fabrica</em> ("On the Fabric of the Human Body"). Printed in Basel by Johannes Oporinus, this massive 700-page folio represented a pinnacle of Renaissance printing technology and artistic brilliance. Vesalius collaborated with master artists from the Venetian workshop of Titian (including Jan van Calcar) to produce over 200 breathtakingly accurate woodcut illustrations (<span class="archival-meta-tag">Source B</span>). For the first time in medical history, students across Europe could examine identical, mathematically precise visual representations of human bones, muscles, veins, and internal organs.<br><br><span class="para-ref">[3.2]</span> To ensure his findings reached beyond elite Latin scholars, Vesalius also published an abridged, cheaper summary handbook called the <em>Epitome</em>, designed specifically for practicing surgeons and medical apprentices. Illustrated editions and pirated copies quickly circulated across Germany, France, and England, standardizing anatomical education throughout the continent and permanently establishing human dissection as an essential requirement in university medical training.',
    },
    {
      title: 'Act 4: The Historical Verdict & The Limits of Anatomy',
      text: '<span class="para-ref">[4.1]</span> The publication of <em>De Fabrica</em> provoked furious hostility from conservative medical establishments. Many senior professors, whose reputations were built on interpreting Galen, fiercely attacked Vesalius. His former teacher at Paris, Jacobus Sylvius, denounced him as an arrogant madman ("Vesanus"), claiming that Galen was completely correct and that the human body must have changed shape since antiquity. Disillusioned by this bitter academic resistance, Vesalius burned many of his unpublished manuscripts and resigned from Padua to serve as imperial court physician to Emperor Charles V.<br><br><span class="para-ref">[4.2]</span> Crucially, while Vesalius revolutionized anatomical science and inspired generations of researchers, his discoveries had virtually zero immediate impact on treating sick patients. Knowing the exact structure of a muscle or the shape of the liver did not explain what caused internal diseases, nor did it provide cures for infectious epidemics like the plague. Furthermore, surgery remained primitive, agonizing, and dangerous: without anaesthetics to control pain or antiseptics to prevent infection, surgeons could not perform major internal operations based on Vesalius’s maps. For the average sick patient, physicians continued to consult traditional humoural charts (<span class="archival-meta-tag">Source C</span>) and prescribe bloodletting, leaving everyday healthcare entirely untouched by the anatomical revolution.',
    },
  ],
  tasks: [
    {
      type: 'two_sided_argument',
      topic: 'Andreas Vesalius: Human Anatomical Dissection vs Lack of Medical Cures',
      text: 'Andreas Vesalius: Human Anatomical Dissection vs Lack of Medical Cures',
      instruction:
        'GCSE Evaluative Assessment: Evaluate whether Vesalius’s anatomical revolution was the most significant medical breakthrough of the Renaissance.',
      advancement: {
        title: 'Anatomical Breakthrough & Methodology (Change)',
        points: [
          'Overthrew 1,300 years of dogmatic authority by descending from the high lecturer pulpit to dissect human cadavers himself at Padua University.',
          'Corrected over 300 of Galen’s errors in De Humani Corporis Fabrica (1543), proving Galen dissected animals (lower jaw is 1 bone, sternum 3 parts, heart septum has no pores).',
          'Collaborated with Renaissance artists to publish over 200 magnificent woodcut illustrations, standardizing anatomical education across European universities.',
        ],
        starter:
          'On the one hand, Andreas Vesalius made revolutionary breakthroughs in Renaissance medicine because...',
      },
      limitations: {
        title: 'Critical Limitations on Treatment & Cures (Limitations)',
        points: [
          'Anatomical accuracy did NOT cure a single illness, heal infections, or stop deadly epidemics like the plague.',
          'Vesalius did not understand the causes of disease (microbes and bacteria remained completely unknown for another 300 years).',
          'Everyday treatments experienced zero change: without anaesthetics or antiseptics, surgery remained agonizing and doctors continued humoural bloodletting.',
        ],
        starter: 'However, the practical significance of Vesalius was severely limited because...',
      },
      synthesis_prompt:
        'Write a balanced GCSE exam paragraph evaluating how far you agree that Vesalius was the most significant breakthrough in Renaissance medicine.',
      synthesis_connectives: [
        'On the one hand, Vesalius transformed anatomy because...',
        'Crucially, De Fabrica disproved...',
        'However, knowing body structure did not...',
        'Consequently, ordinary patients...',
        'Therefore, his immediate impact was limited to...',
      ],
      model_answer:
        "On the one hand, Andreas Vesalius made revolutionary breakthroughs in Renaissance medicine by overthrowing 1,300 years of uncritical obedience to Galen. Working as Professor of Surgery at Padua University, Vesalius performed human dissections with his own hands rather than relying on uneducated barbers while lecturing from ancient texts. In his masterwork De Humani Corporis Fabrica (1543), he corrected over 300 of Galen's anatomical errors, proving conclusively that Galen had based his treatises on animal dissections (such as apes and dogs). For example, Vesalius proved that the human jawbone consists of a single bone rather than two, the sternum has three segments instead of seven, and the muscular septum of the heart is solid with no invisible pores. Furthermore, by mass-producing these findings with exceptionally precise woodcut illustrations via the printing press, Vesalius established empirical observation and human dissection as the bedrock of university medical training across Europe.<br><br>However, the practical significance of Vesalius was severely limited because his anatomical discoveries did not save a single patient's life or lead to any new medical treatments. Knowing the correct structure of muscles, bones, and organs did nothing to explain what caused disease, as microbes and bacteria were still completely unknown. Consequently, ordinary people and physicians continued to rely entirely on the Theory of the Four Humours and miasma to explain illness. Everyday medical treatments remained identical to the medieval period: patients were still bled, purged, and treated with herbal concoctions. In addition, surgery could not advance significantly because surgeons lacked effective anaesthetics to stop pain and antiseptics to prevent fatal post-operative infections. Therefore, while Vesalius sparked an indispensable revolution in anatomical science and scientific methodology, his direct impact on patient health and medical treatment was virtually non-existent during his lifetime.",
    },
  ],
  vocab: [
    {
      term: 'De Fabrica (1543)',
      def: 'De Humani Corporis Fabrica ("On the Fabric of the Human Body"), Vesalius’s masterwork featuring 200+ accurate anatomical woodcuts.',
    },
    {
      term: 'Padua Anatomical Theatre',
      def: 'The famous tiered lecture theatre at Padua University where Vesalius performed direct human dissections before crowds of students.',
    },
    {
      term: 'Cathedra',
      def: 'The elevated professor’s pulpit in medieval universities from which professors chanted Galen without touching the cadaver.',
    },
    {
      term: 'Galenic Errors',
      def: 'Over 300 anatomical mistakes made by Galen (such as the 2-part jawbone and liver lobes) caused by dissecting animals instead of humans.',
    },
    {
      term: 'Heart Septum',
      def: 'The solid central muscular wall dividing the heart ventricles, which Vesalius proved had no invisible pores, challenging Galen’s circulation theory.',
    },
    {
      term: 'Empirical Anatomy',
      def: 'The scientific method of studying human anatomy based purely on physical, visible evidence observed through personal dissection.',
    },
  ],
  vocab_cloze_text:
    'In 1537, Andreas Vesalius became professor of surgery at the [Padua Anatomical Theatre]. He shocked traditionalists by descending from the elevated [Cathedra] to perform human dissections himself. In his 1543 masterwork [De Fabrica (1543)], he corrected over 300 [Galenic Errors], proving that the ancient Roman had only dissected animals. For example, he proved that the human [Heart Septum] was solid with no invisible holes. By replacing dogma with [Empirical Anatomy], Vesalius revolutionized surgical education, even though accurate anatomy could not cure infectious disease.',
  gcse_task: {
    title: 'Edexcel GCSE (9–1) Paper 1 Section B Practice: Q3 & Q5/Q6',
    tasks: [
      {
        type: 'written',
        tariff: 'Q3: Explain one way methods were different [4 marks]',
        text: 'Explain one way in which methods of investigating the human body in the Renaissance were different from methods in the Medieval period. [4 marks]',
        model:
          'One way in which methods of investigating the human body were different was the **direct personal dissection of human cadavers** by professors rather than lecturing from ancient texts. In the Medieval period, anatomical dissections were rare demonstrations where the university professor sat high above the room in a cathedra reading aloud from Galen, while an untrained barber-surgeon cut the corpse. If the body contradicted Galen, professors claimed the corpse was deformed. In contrast, in the Renaissance, Andreas Vesalius climbed down from the cathedra, dissected the human body with his own hands, and encouraged students to trust what their own eyes observed. This was a fundamental methodological difference because it replaced dogmatic book-learning with hands-on empirical observation.',
      },
      {
        type: 'written',
        tariff: 'Q5/Q6: Evaluative Essay [16+4 marks]',
        text: "'Andreas Vesalius’s work on anatomy was the most significant breakthrough in medicine in the period c1500–c1700.' How far do you agree? Explain your answer. [16+4 marks]",
        stimulus: ['De Humani Corporis Fabrica (1543)', 'Medical treatments in the 16th century'],
        model:
          "On the one hand, Vesalius’s work on anatomy can be viewed as the most significant breakthrough in Renaissance medicine because it permanently dismantled 1,400 years of Galenic dogma and established the empirical scientific method. Prior to Vesalius, university professors sat in an elevated cathedra chanting Galen while barber-surgeons cut open cadavers. In De Humani Corporis Fabrica (1543), Vesalius stepped down to dissect human bodies himself, proving that Galen had only dissected animals like pigs and Barbary apes. Vesalius corrected over 300 of Galen’s errors, demonstrating that the human lower jaw is one bone not two, the sternum has three parts not seven, and the muscular septum of the heart has no invisible pores. Furthermore, by mass-producing over 200 meticulously illustrated woodcut plates via the printing press, Vesalius provided universities across Europe with identical, accurate anatomical reference guides, inspiring a generation of anatomists to question ancient texts.<br><br>However, a compelling counter-argument is that Vesalius’s breakthrough was severely limited because knowing the correct structure of human anatomy did not save a single patient's life or lead to any new medical treatments during the 16th century. Knowing the position of bones and muscles did nothing to explain the causes of disease, as microbes and bacteria remained completely unknown. Consequently, ordinary people and physicians continued to rely on the Four Humours and miasma. Furthermore, surgery remained agonizing and life-threatening because effective anaesthetics and antiseptics did not exist, preventing surgeons from attempting internal operations based on Vesalius’s maps. Everyday treatments for ordinary people—such as bloodletting, purging, and herbal concoctions—remained completely identical to the medieval period.<br><br>Furthermore, other breakthroughs in the period c1500–c1700 could be considered equally or more significant. William Harvey’s discovery of the circulation of the blood in De Motu Cordis (1628) was a monumental breakthrough in physiology, proving that the heart acted as a mechanical pump and disproving Galen’s theory of blood consumption. In addition, Thomas Sydenham’s Observationes Medicae (1676) revolutionized clinical diagnosis by encouraging doctors to observe symptoms directly at the bedside and classifying diseases into separate species. Moreover, the invention of the printing press and the founding of the Royal Society in 1660 created the institutional and communication framework without which neither Vesalius nor Harvey could have shared their findings.<br><br>In conclusion, I agree to a limited extent that Vesalius was the most significant breakthrough. Vesalius was undeniably the essential foundational catalyst of Renaissance medicine: by proving Galen was fallible, he gave subsequent pioneers like Harvey the intellectual permission to challenge classical dogma. However, because his discoveries were purely structural and had almost zero practical impact on curing illnesses or improving treatments for living patients, his breakthrough was theoretical and pedagogical rather than clinical. Therefore, while Vesalius sparked the anatomical revolution, his significance lay in transforming scientific methodology rather than saving patients' lives.",
      },
    ],
  },
  learning_objectives: [
    'Explain how Vesalius’s hands-on dissection method overthrew medieval university traditions.',
    'Analyze how Vesalius identified and corrected over 300 of Galen’s anatomical errors.',
    'Evaluate the impact of De Humani Corporis Fabrica (1543) and its critical limitations on medical treatment.',
  ],
  quiz: [
    {
      question: 'In what year did Andreas Vesalius publish De Humani Corporis Fabrica?',
      options: ['1543', '1628', '1476', '1665'],
      answer: '1543',
      explanation:
        'Vesalius published De Humani Corporis Fabrica in 1543, the same year Copernicus published his theory that the Earth revolved around the Sun.',
    },
    {
      question: 'At which famous Italian university did Vesalius serve as professor of surgery?',
      options: [
        'University of Padua',
        'University of Paris',
        'University of Oxford',
        'University of Bologna',
      ],
      answer: 'University of Padua',
      explanation:
        'Vesalius was appointed Professor of Surgery at the progressive University of Padua in 1537.',
    },
    {
      question: 'How many anatomical errors made by Galen did Vesalius identify and correct?',
      options: ['Over 300 errors', 'Exactly 12 errors', 'Over 2,000 errors', 'Zero errors'],
      answer: 'Over 300 errors',
      explanation:
        'Vesalius proved over 300 of Galen’s anatomical descriptions were false because Galen had dissected animals rather than humans.',
    },
    {
      question: 'State one specific anatomical error of Galen corrected by Vesalius.',
      options: [
        'The human lower jaw is one bone (not two); the breastbone has 3 segments (not 7).',
        'The human heart has 5 chambers instead of 4.',
        'The human brain is completely hollow.',
        'Human blood is purple rather than red.',
      ],
      answer: 'The human lower jaw is one bone (not two); the breastbone has 3 segments (not 7).',
      explanation:
        'Galen claimed the jaw had two bones and the sternum seven parts based on animal dissections; Vesalius proved humans have a single jawbone and a three-part sternum.',
    },
  ],
  flashcards: [
    {
      q: 'Who was Andreas Vesalius?',
      a: 'A Belgian professor of surgery at Padua University who revolutionized anatomy by dissecting human corpses himself.',
    },
    {
      q: 'What is De Humani Corporis Fabrica (1543)?',
      a: 'Vesalius’s masterwork on human anatomy containing over 200 accurate woodcut plates, printed in Basel.',
    },
    {
      q: 'Why did Galen make over 300 anatomical mistakes?',
      a: 'Roman law banned human dissection, forcing Galen to dissect apes, pigs, and dogs and assume humans were identical.',
    },
    {
      q: 'What did Vesalius discover about the septum of the heart?',
      a: 'He proved it was thick and solid with no invisible pores, disproving Galen’s claim that blood flowed through it.',
    },
    {
      q: 'What was the major limitation of Vesalius’s work?',
      a: 'Accurate anatomical knowledge did not cure disease, heal infections, or stop surgical pain, leaving everyday treatments unchanged.',
    },
  ],
  draw_tasks: [
    {
      title: 'Diagram: Vesalius vs Galen Jawbone Comparison',
      instruction:
        'Sketch a simple comparative diagram of the human lower jaw: On the left, draw Galen’s incorrect two-part dog jaw; on the right, draw Vesalius’s correct single-bone human mandible.',
    },
  ],
  sources: [
    {
      title: 'Source A: Frontispiece of De Humani Corporis Fabrica (1543)',
      src: '/images/vesalius_fabrica_frontispiece.jpg',
      source: '/images/vesalius_fabrica_frontispiece.jpg',
      caption:
        'The frontispiece of De Fabrica (1543) showing Vesalius personally dissecting a female cadaver surrounded by students and spectators.',
      desc: 'Authentic 1543 woodcut frontispiece of Vesalius’s landmark anatomical treatise.',
    },
    {
      title: 'Source B: Vesalius Muscle Men Plate (1543)',
      src: '/images/vesalius_muscle_men.jpg',
      source: '/images/vesalius_muscle_men.jpg',
      caption:
        'One of the famous "Muscle Men" woodcut plates from Book II of De Fabrica, showing the superficial muscular layer in classical posture.',
      desc: 'Masterwork anatomical woodcut plate from De Fabrica (1543).',
    },
    {
      title: 'Source C: Traditional Phlebotomy Man Diagram',
      src: '/images/renaissance_phlebotomy_man.jpg',
      source: '/images/renaissance_phlebotomy_man.jpg',
      caption:
        'A 16th-century printed bloodletting chart illustrating the enduring reliance on Galenic humoural vein points.',
      desc: 'Renaissance broadsheet showing bloodletting points on the human body.',
    },
  ],
};

// ============================================================================
// 4. LESSON 2.4: William Harvey & The Circulation of the Blood (1628)
// ============================================================================
const lesson_2_4 = {
  id: 'lesson_2_4',
  title: 'KT2.4: William Harvey & The Circulation of the Blood (1628)',
  specification_anchor:
    'William Harvey and his work on the circulation of the blood; the impact of De Motu Cordis (1628).',
  enquiry_question:
    "Why did William Harvey's discovery of blood circulation meet fierce medical resistance?",
  living_timeline_mission: {
    target_milestones: 'Milestone 4 (1628)',
    pages: 'Pages 2–3',
    instruction:
      'Turn back to Pages 2–3 (Milestone 4: 1628). In the sketchpad frame, sketch the famous arm ligature experiment showing vein valves and annotate: De Motu Cordis (1628)!',
  },
  timeline_anchor: [
    {
      date: '1578',
      title: 'Birth of William Harvey',
      desc: 'Born in Folkestone, Kent; studied arts at Cambridge before traveling to Italy to study medicine at the University of Padua under the renowned anatomist Hieronymus Fabricius.',
    },
    {
      date: '1602',
      title: 'Graduation & Return to London',
      desc: 'Graduates with honors from Padua, where Fabricius discovered one-way valves in veins; Harvey returns to London and becomes physician to King James I and later Charles I.',
    },
    {
      date: '1628',
      title: 'De Motu Cordis Published',
      desc: 'Publishes Exercitatio Anatomica de Motu Cordis et Sanguinis in Animalibus in Frankfurt, proving through mathematics and experiment that blood circulates in a closed one-way loop.',
    },
    {
      date: '1657',
      title: 'Death of William Harvey',
      desc: 'Dies in London at age 79, having lived to see his revolutionary theory of circulation gain widespread acceptance among the younger generation of European physicians.',
    },
  ],
  delivery_plan: {
    format: '2-Lesson Enquiry Sequence (2x 50 mins) or 100-min Double Period',
    lesson_1: {
      title: 'Lesson 1: The Heart as a Pump & Mathematical Proof (50 mins)',
      phases: [
        {
          time: '00–10m',
          label: 'Hook & Spaced Retrieval',
          instruction:
            'Complete Do Now retrieval on Andreas Vesalius. Introduce Harvey and the mechanical pump analogy.',
        },
        {
          time: '10–30m',
          label: 'Guided Reading & The 540 Pints Calculation',
          instruction:
            'Read Acts 1 & 2 ([1.1] to [2.2]). Deconstruct how Harvey mathematically disproved Galen’s liver theory.',
        },
        {
          time: '30–45m',
          label: 'Vocabulary & Circulatory Distinction Task',
          instruction:
            'Complete Disciplinary Vocabulary distinguishing Galenic Blood Consumption from Circular Recirculation.',
        },
        {
          time: '45–50m',
          label: 'Formative Check & Plenary',
          instruction:
            'Teacher poses Hinge Question on Galen’s liver calculation. Log Harvey on Living Timeline.',
        },
      ],
    },
    lesson_2: {
      title: 'Lesson 2: The Ligature Experiment & 12-Mark GCSE Writing (50 mins)',
      phases: [
        {
          time: '00–10m',
          label: 'Inspect Primary Plate (Source A)',
          instruction:
            'Examine Source A (Harvey’s vein valves experiment). Discuss how the tourniquet proved one-way flow.',
        },
        {
          time: '10–25m',
          label: 'Deconstruct Acts 3 & 4 (Resistance & Cures)',
          instruction:
            'Analyze why conservative doctors rejected Harvey as a "circulator/quack" and why bloodletting persisted.',
        },
        {
          time: '25–45m',
          label: 'Deliberate Exam Practice (12m Turning Point)',
          instruction:
            'Complete Q3 Difference question [4m] and 12-mark Explain Why question on Harvey using structure strips.',
        },
        {
          time: '45–50m',
          label: 'Self-Assessment & Living Timeline Check',
          instruction: 'Annotate Page 2–3 Milestone 4 with sketchpad deliverables.',
        },
      ],
    },
  },
  hook_text:
    'For 1,400 years, every physician in Europe believed that blood was created in the liver from food, pumped through the body like fuel in a furnace, and completely consumed by the muscles and organs. Then came William Harvey. Inspired by Renaissance mechanical fire pumps, Harvey did something no doctor had ever done: he used mathematics. He calculated that in just one hour, the human heart pumps 540 pints of blood—three times the weight of the entire human body! Where could all that blood possibly come from, and where could it go? Harvey’s answer shook the foundations of medicine: blood does not burn up—it travels in a continuous, one-way circular loop pumped endlessly by the heart. Yet, when he published his discovery, conservative doctors mocked him as a madman, calling him a "circulator" (quack). Why did one of the greatest scientific breakthroughs in human history meet such furious resistance?',
  teacher_notes: {
    primer:
      'Analyze William Harvey’s revolutionary mechanical model of cardiovascular physiology. Students must understand how Harvey used both empirical vivisection of cold-blooded animals and mathematical calculation (the 540 pints an hour proof) to disprove Galen. Help students evaluate the turning point: while Harvey transformed theoretical understanding of physiology, he could not see capillaries (invisible without microscopes) and his discovery did not produce any immediate medical treatments or stop the practice of bloodletting.',
    objectives: [
      {
        objective:
          'Explain how Harvey proved the heart acts as a mechanical pump driving closed blood circulation.',
        primer:
          'Direct students to paragraphs [1.1]–[1.2]. Emphasize the influence of Padua (Fabricius’s discovery of vein valves) and Renaissance mechanical water pumps.',
        question:
          'How did Harvey’s view of the heart as a muscular pump reflect the mechanical mindset of the Scientific Revolution?',
      },
      {
        objective:
          'Analyze how Harvey used mathematical calculation to disprove Galen’s liver theory.',
        primer:
          'Direct students to paragraphs [2.1]–[2.2]. Walk through the calculation: 540 pints per hour is more than body weight, proving the liver could not possibly manufacture that much blood from food.',
        question:
          'Why was mathematical calculation such a devastating weapon against Galen’s 1,400-year-old liver theory?',
      },
      {
        objective:
          'Assess why Harvey met fierce resistance and why circulation had zero immediate impact on medical cures.',
        primer:
          'Direct students to paragraphs [3.1]–[4.2]. Focus on contemporary backlash ("circulator/quack"), the missing capillaries (proved by Malpighi in 1661), and the tragic continuation of bloodletting.',
        question:
          'Why did physicians continue to prescribe bloodletting even after Harvey proved the body had a fixed volume of circulating blood?',
      },
    ],
    source_context: {
      'Source A':
        'The famous engraved plate from Chapter 13 of De Motu Cordis (Frankfurt, 1628), illustrating Harvey’s human arm ligature experiments with swollen veins and one-way valves (valvulae). **Hinge Question:** How did stroking blood away from the heart with a fingertip conclusively prove that vein valves only permit one-way flow toward the chest?',
      'Source B':
        'Title page of William Harvey’s landmark treatise Exercitatio Anatomica de Motu Cordis et Sanguinis in Animalibus (Frankfurt, 1628). **Hinge Question:** Why did Harvey publish his revolutionary work in Germany rather than London, and what does this reveal about international scientific communication in the Renaissance?',
    },
  },
  do_now: [
    { q: 'In what year did Andreas Vesalius publish De Humani Corporis Fabrica?', a: '1543' },
    {
      q: 'At which famous Italian university did Vesalius serve as professor of surgery?',
      a: 'University of Padua',
    },
    {
      q: 'How many anatomical errors made by Galen did Vesalius identify and correct?',
      a: 'Over 300 errors',
    },
    {
      q: 'State one specific anatomical error of Galen corrected by Vesalius.',
      a: 'The human lower jaw is one bone (not two); the breastbone has 3 segments (not 7).',
    },
  ],
  fun_facts: [
    {
      fact: 'William Harvey served as personal physician to King Charles I and accompanied him on royal hunts, using freshly killed deer to dissect live mammalian hearts.',
      icon: 'fa-deer',
    },
    {
      fact: 'Because mammalian hearts beat too rapidly for the naked eye to observe, Harvey slowed down his experiments by dissecting cold-blooded animals like frogs, snakes, and snails whose hearts beat very slowly.',
      icon: 'fa-frog',
    },
    {
      fact: "When Harvey published De Motu Cordis, contemporary physicians used the word 'circulator' as an insult—in Latin, it meant a traveling charlatan or quack who moves in circles!",
      icon: 'fa-circle-notch',
    },
  ],
  guided_reading: [
    {
      q: 'What ancient theory of blood did Galen teach for 1,400 years?',
      a: 'Galen taught that blood was continuously manufactured in the liver from digested food, carried by veins to organs, and burned up like fuel.',
    },
    {
      q: 'What did Harvey calculate about the volume of blood pumped by the heart?',
      a: 'He calculated that the heart pumped 540 pints of blood per hour—three times the weight of an average man—proving the body could not make that much new blood.',
    },
    {
      q: 'What tiny vessels connecting arteries and veins could Harvey not see?',
      a: 'Capillaries, which were too microscopic to be seen without powerful microscopes, later discovered by Marcello Malpighi in 1661.',
    },
  ],
  narrative_blocks: [
    {
      title: 'Act 1: Context & Catalyst (The Legacy of Galen & Padua)',
      text: '<span class="para-ref">[1.1]</span> For fourteen centuries, European medicine operated under Claudius Galen’s complex model of physiology. Galen taught that the human body contained two entirely separate circulatory systems with different functions. Dark venous blood, containing natural spirits, was continuously manufactured in the liver from digested food (chyle) and flowed outwards through veins to nourish body tissues, where it was completely consumed like fuel in a fire. Meanwhile, bright arterial blood, enriched with vital heat and air from the lungs, was pumped through arteries to provide life and movement. Galen insisted that blood seeped between these two systems through invisible pores in the central muscular wall (septum) of the heart.<br><br><span class="para-ref">[1.2]</span> William Harvey (1578–1657) dismantled this ancient dogma. After studying at Cambridge, Harvey traveled to the University of Padua, the leading center of European anatomical research. There, he studied under the master anatomist Hieronymus Fabricius, who had discovered tiny one-way flaps or "valves" inside human veins. While Fabricius believed these valves merely slowed down the outward rush of blood to prevent pooling in the feet, Harvey suspected they had a far more radical mechanical purpose: to ensure that blood could only ever flow in one direction—back toward the heart.',
    },
    {
      title: 'Act 2: Escalation & Conflict (Mathematical Calculation & Disproving Galen)',
      text: '<span class="para-ref">[2.1]</span> Returning to London, Harvey was appointed physician to St Bartholomew’s Hospital and later royal physician to King James I and King Charles I. Armed with royal patronage, he conducted intensive laboratory research, dissecting over eighty species of animals. To observe cardiac contractions clearly, he studied cold-blooded creatures—such as frogs, toads, and snakes—whose hearts beat slow enough to analyze. He proved that the heart is a muscular pump that contracts (systole) to actively expel blood into the arteries, rather than expanding like a sponge to suck blood in as Galen had claimed.<br><br><span class="para-ref">[2.2]</span> Harvey’s most devastating argument against Galen was mathematical. Measuring the internal capacity of the human left ventricle, he calculated that with every heartbeat, approximately two ounces of blood were forced into the aorta. At an average pulse of 72 beats per minute, the heart pumped 540 pints (nearly 300 liters) of blood into the body every single hour—three times the total weight of an average human being! It was physically impossible for the liver to manufacture this astronomical quantity of blood from food, nor could the body consume it. The only logical scientific conclusion was that the blood was not consumed at all: it was the same finite volume of blood circulating continuously in a closed, perpetual loop.',
    },
    {
      title: 'Act 3: Forensic Evidence (The Tourniquet Experiment & De Motu Cordis)',
      source: {
        title: 'Source A: Vein Valve Experiments from De Motu Cordis (1628)',
        src: '/images/harvey_veins.jpg',
        source: '/images/harvey_veins.jpg',
        image: '/images/harvey_veins.jpg',
        question:
          "Look at Source A above: Study Figure 2 where Harvey pushes a finger along a surface vein away from the heart. Why does the vein remain completely flat and bloodless between the valves, and how did this simple, physical demonstration conclusively demolish Galen's dogma that blood was produced by the liver and consumed as fuel by tissues?",
        source_context:
          "In 1628, William Harvey published De Motu Cordis ('On the Motion of the Heart and Blood in Animals'). Using tight ligatures on human arms, Harvey demonstrated that internal vein valves only permit blood to travel in a single direction: towards the heart.",
        citation:
          'Engraved plate demonstrating vein valves from Exercitatio Anatomica de Motu Cordis et Sanguinis in Animalibus, Frankfurt: William Fitzer, 1628.',
      },
      text: '<span class="para-ref">[3.1]</span> To prove that blood circulated in a single direction, Harvey devised a brilliant, elegant experiment using living human volunteers (<span class="archival-meta-tag">Source A</span>). He tied a tight ligature (tourniquet) around an arm until the arterial pulse in the wrist ceased and the hand grew pale and cold, proving that blood entered the arm through deep arteries. When he loosened the bandage slightly into a medium tightness, the arteries remained open, but the superficial surface veins were compressed. The veins swelled dramatically, and tiny nodules appeared along their length—the one-way valves discovered by Fabricius.<br><br><span class="para-ref">[3.2]</span> Harvey then used his finger to press and push blood down a vein away from the heart, between two valves. The vein remained completely empty and collapsed; blood refused to flow backwards. As soon as he released the lower finger, blood instantly rushed upwards toward the shoulder. This simple, repeatable physical demonstration proved conclusively that veins carry blood in only one direction: toward the heart. In 1628, Harvey published his complete findings in Frankfurt in his masterpiece, <em>Exercitatio Anatomica de Motu Cordis et Sanguinis in Animalibus</em> ("On the Motion of the Heart and Blood in Animals").',
    },
    {
      title: 'Act 4: The Historical Verdict & The Limits of Circulation',
      text: '<span class="para-ref">[4.1]</span> Harvey’s discovery met furious resistance from conservative physicians. Many senior doctors refused to believe that Galen had been mistaken for over a millennium. Critics ridiculed Harvey as a "circulator" (a Latin pun meaning an irrational quack who travels in circles), and many of his wealthy private patients abandoned him, fearing his radical ideas. Furthermore, Harvey faced a major scientific gap: he could not explain how blood passed from the smallest arteries into the veins. Because powerful compound microscopes were not yet available, he could not see capillaries. It was not until 1661—four years after Harvey’s death—that the Italian scientist Marcello Malpighi used a microscope to discover capillaries in a frog’s lung, finally providing the missing microscopic link.<br><br><span class="para-ref">[4.2]</span> Most significantly for ordinary people, Harvey’s discovery had virtually zero immediate impact on medical treatment. Knowing that blood circulated did not cure illnesses, heal surgical wounds, or prevent infectious diseases. Without knowledge of blood groups, early attempts at blood transfusion in France and England killed patients and were banned by law. Most tragically, despite Harvey conclusively proving that the human body contained a precious, finite volume of circulating blood, physicians—including Harvey himself—continued to prescribe aggressive bloodletting using leeches and lancets for another two hundred years to balance the humours. Therefore, while Harvey was a turning point in mechanical physiology, his breakthrough saved no lives during the Renaissance.',
    },
  ],
  tasks: [
    {
      type: 'two_sided_argument',
      topic: 'William Harvey: Mechanical Circulation vs Traditional Humoural Practice',
      text: 'William Harvey: Mechanical Circulation vs Traditional Humoural Practice',
      instruction:
        'GCSE Analytical Assessment: Evaluate the physiological breakthrough of William Harvey against his total lack of immediate clinical cures.',
      advancement: {
        title: 'Physiological Breakthrough & Evidence (Change)',
        points: [
          'Proved in De Motu Cordis (1628) that blood circulates continuously in a closed, one-way system pumped by the muscular heart.',
          'Used mathematical calculation (540 pints per hour) to disprove Galen’s 1,400-year theory that the liver manufactures blood from food.',
          'Demonstrated through simple tourniquet experiments on human arms that vein valves ensure blood only flows toward the heart.',
        ],
        starter:
          'On the one hand, William Harvey made a momentous breakthrough in Renaissance medicine because...',
      },
      limitations: {
        title: 'Fierce Resistance & Zero Treatment Impact (Limitations)',
        points: [
          'Harvey’s discovery did NOT lead to a single new medical treatment, cure, or successful surgical procedure during his lifetime.',
          'Could not see microscopic capillaries connecting arteries and veins; Malpighi only proved them in 1661 using microscopes.',
          'Physicians ridiculed him as a "circulator" (quack), and doctors continued bloodletting with leeches for another 200 years.',
        ],
        starter:
          'However, the practical significance of Harvey’s discovery for sick patients was limited because...',
      },
      synthesis_prompt:
        'Write a balanced GCSE exam paragraph explaining why Harvey’s discovery was a turning point yet had little immediate impact on treatments.',
      synthesis_connectives: [
        'Harvey’s discovery was a turning point because...',
        'By applying mechanical calculations, he proved...',
        'Consequently, this disproved Galen’s idea that...',
        'However, his practical impact was delayed because...',
        'Therefore, his significance was theoretical rather than clinical...',
      ],
      model_answer:
        "On the one hand, William Harvey made a momentous scientific breakthrough by discovering the true mechanics of blood circulation, completely dismantling 1,400 years of Galenic physiology. In De Motu Cordis (1628), Harvey proved that the heart acts as a muscular mechanical pump driving blood in a continuous, one-way circular loop around the body. Galen had taught that the liver perpetually manufactures new blood from digested food, which is consumed as fuel by body tissues. Harvey used mathematical calculations to prove this was physically impossible: the heart pumped approximately 540 pints of blood per hour, more than three times the weight of an average man. Through careful vivisection of cold-blooded animals and simple tourniquet experiments on living human arms, Harvey demonstrated that valves in veins only permit blood to flow toward the heart, proving that blood must be recycled continuously.<br><br>However, the practical significance of Harvey’s discovery for sick patients was virtually zero during his lifetime. Understanding that blood circulated did not give physicians the ability to cure disease or stop deadly infections. Because blood types and transfusion safety were unknown, early attempts at transfusion killed patients and were promptly banned. In fact, despite Harvey conclusively proving that the body contains a finite, precious volume of blood, doctors—and Harvey himself—continued to prescribe aggressive bloodletting as a standard treatment for the next two centuries. Furthermore, conservative physicians ridiculed Harvey as a 'circulator' (a derogatory Latin term meaning quack), and he lost many private patients who thought his theories were absurd. Therefore, while Harvey laid the indispensable foundation for modern cardiovascular physiology, his discovery was purely theoretical and saved no lives during the Renaissance.",
    },
  ],
  vocab: [
    {
      term: 'De Motu Cordis (1628)',
      def: 'Harvey’s revolutionary book proving that blood circulates continuously in a closed loop pumped by the heart.',
    },
    {
      term: 'Mechanical Pump',
      def: 'Harvey’s model of the heart as a muscle that contracts to push blood under pressure into arteries, inspired by water pumps.',
    },
    {
      term: 'Vein Valves',
      def: 'One-way internal flaps in veins discovered by Fabricius that Harvey proved only permit blood to flow toward the heart.',
    },
    {
      term: 'Circulator',
      def: 'A derogatory 17th-century insult used by conservative physicians to mock Harvey as an irrational charlatan or quack.',
    },
    {
      term: 'Capillaries',
      def: 'Microscopic blood vessels connecting arteries and veins, invisible to Harvey and discovered by Marcello Malpighi in 1661.',
    },
    {
      term: 'Blood Volume Calculation',
      def: 'Harvey’s mathematical proof showing the heart pumps 540 pints an hour, disproving Galen’s liver theory.',
    },
  ],
  vocab_cloze_text:
    'In 1628, William Harvey published [De Motu Cordis (1628)], completely disproving Galen’s theory that blood was burned as fuel. Harvey modeled the heart as a [Mechanical Pump] driving blood through arteries. Using a [Blood Volume Calculation], he showed the heart pumped 540 pints an hour, which no liver could manufacture. In arm experiments, he proved that [Vein Valves] forced blood to flow in only one direction. Although conservative critics dismissed him as a [Circulator], Harvey was correct, though he could not see microscopic [Capillaries] connecting the vessels.',
  gcse_task: {
    title: 'Edexcel GCSE (9–1) Paper 1 Section B Practice: Q3 & Q4',
    tasks: [
      {
        type: 'written',
        tariff: 'Q3: Explain one way understanding was different [4 marks]',
        text: "Explain one way in which William Harvey's understanding of the circulatory system was different from Galen's theories. [4 marks]",
        model:
          'One way in which Harvey’s understanding was different was his proof that **blood travels continuously in a closed, one-way circular loop** rather than being manufactured in the liver and consumed as fuel. Galen taught that the liver constantly created new blood from food, which was pumped through veins to bodily tissues where it was completely burned up like wood in a fire. In contrast, William Harvey proved in De Motu Cordis (1628) that the heart acts as a mechanical pump that circulates the same finite volume of blood around the body over and over again, flowing outwards through arteries and returning inwards through veins. This was a fundamental scientific difference because it overturned 1,400 years of belief in continuous blood consumption.',
      },
      {
        type: 'written',
        tariff: 'Q4: Explain why Harvey was a turning point [12 marks]',
        text: "Explain why William Harvey's discovery of the circulation of the blood was a turning point in medicine. [12 marks]",
        stimulus: ['Calculating blood volume', 'De Motu Cordis (1628)'],
        model:
          'William Harvey’s discovery of the circulation of the blood was a major turning point in medicine primarily because it used rigorous mathematical calculations to permanently disprove Galen’s 1,400-year-old physiological dogma. For centuries, physicians uncritically accepted Galen’s theory that the liver constantly manufactured new blood from food, which was burned up as fuel by bodily tissues. In De Motu Cordis (1628), Harvey applied the new scientific method by calculating the volume of blood pumped with every heartbeat. He calculated that the left ventricle pumped approximately two ounces of blood per beat, totaling 540 pints of blood per hour—three times the weight of an average human body. This mathematical proof showed that it was physically impossible for the body to produce or consume that volume of blood, forcing scholars to accept that blood must circulate in a continuous loop, fundamentally discrediting ancient Greek physiology.<br><br>Furthermore, Harvey’s discovery was a turning point because he demonstrated his findings through repeatable empirical experiments on living humans and animals rather than relying on philosophical speculation. Influenced by his studies at the University of Padua, Harvey investigated the one-way valves in veins discovered by Fabricius. Through his famous arm tourniquet experiments, Harvey demonstrated that when blood was pushed down a vein away from the heart, the vein collapsed and remained empty, proving that vein valves only permit blood to flow toward the heart. By publishing these reproducible experiments in De Motu Cordis, Harvey established experimental physiology as a scientific discipline, inspiring future researchers to test biological hypotheses through laboratory demonstration rather than textual debate.<br><br>However, while Harvey’s work marked a profound intellectual and scientific turning point, its immediate impact on clinical medical treatment was severely limited. Knowing that blood circulated did not provide doctors with new cures for infectious diseases, nor could it be used to save lives. Blood transfusions were attempted but quickly killed patients because blood groups were unknown. Crucially, despite Harvey proving that the body contained a finite volume of blood, physicians—including Harvey himself—continued to prescribe traditional bloodletting for another 200 years because they lacked alternative therapies. Therefore, Harvey’s discovery was a revolutionary turning point in scientific understanding and anatomy, but its clinical benefits were delayed until the 19th and 20th centuries.',
      },
    ],
  },
  learning_objectives: [
    'Explain how Harvey proved the heart acts as a mechanical pump driving closed blood circulation.',
    'Analyze how Harvey used mathematical calculation to disprove Galen’s liver theory.',
    'Assess why Harvey met fierce resistance and why circulation had zero immediate impact on medical cures.',
  ],
  quiz: [
    {
      question: 'In what year did William Harvey publish De Motu Cordis?',
      options: ['1628', '1543', '1665', '1676'],
      answer: '1628',
      explanation: 'Harvey published De Motu Cordis in Frankfurt in 1628.',
    },
    {
      question:
        'Which ancient theory of blood production did Harvey disprove through mathematical calculations?',
      options: [
        "Galen's theory that the liver constantly manufactures blood from food",
        "Hippocrates' theory that blood is made in the spleen",
        "Aristotle's theory that blood is created by breathing air",
        "Vesalius's theory that blood is stored in the bones",
      ],
      answer: "Galen's theory that the liver constantly manufactures blood from food",
      explanation:
        'Harvey proved the liver could not possibly manufacture 540 pints of blood per hour.',
    },
    {
      question:
        'What tiny blood vessels connecting arteries and veins could Harvey NOT see without a microscope?',
      options: ['Capillaries', 'Aortas', 'Vena cavas', 'Ligatures'],
      answer: 'Capillaries',
      explanation:
        'Capillaries were invisible to the naked eye; Marcello Malpighi discovered them in 1661 using a microscope.',
    },
    {
      question:
        "Why did Harvey's discovery of blood circulation have NO immediate effect on medical treatment?",
      options: [
        'Doctors did not know what caused infection and continued bloodletting to balance humours.',
        'The King banned the practice of medicine across England.',
        'All patients refused to let doctors touch their pulses.',
        'Harvey burned all his research papers before dying.',
      ],
      answer:
        'Doctors did not know what caused infection and continued bloodletting to balance humours.',
      explanation:
        'Knowing how blood moved did not explain the cause of disease, so doctors continued traditional bloodletting.',
    },
  ],
  flashcards: [
    {
      q: 'Who was William Harvey?',
      a: 'An English physician who proved that blood circulates continuously around the body in a closed one-way system pumped by the heart.',
    },
    {
      q: 'What is De Motu Cordis (1628)?',
      a: 'Harvey’s landmark treatise published in Frankfurt detailing his experimental and mathematical proof of blood circulation.',
    },
    {
      q: 'How did Harvey mathematically disprove Galen’s theory of blood consumption?',
      a: 'He calculated that the heart pumps 540 pints of blood per hour—far more than the body weighs—proving blood must be recycled.',
    },
    {
      q: 'How did Harvey’s arm tourniquet experiment prove one-way vein flow?',
      a: 'Tying a bandage caused vein valves to swell; pushing blood backwards left the vein empty because valves only let blood flow toward the heart.',
    },
    {
      q: 'Why did Harvey’s discovery have little immediate clinical effect?',
      a: 'It did not cure disease or explain infection; bloodletting continued for centuries and transfusions were fatal without blood typing.',
    },
  ],
  draw_tasks: [
    {
      title: 'Diagram: Harvey’s Closed Circulatory Loop',
      instruction:
        'Sketch a simple diagram of Harvey’s circulatory loop: Draw the heart in the center as a pump, show arrows flowing out through arteries to the body, and show arrows returning through veins back to the heart.',
    },
  ],
  sources: [
    {
      title: 'Source A: Vein Valve Experiments from De Motu Cordis (1628)',
      src: '/images/harvey_veins.jpg',
      source: '/images/harvey_veins.jpg',
      caption:
        'The engraved plate from Chapter 13 of De Motu Cordis (1628) showing Harvey’s arm ligature experiments with swollen veins and one-way valves.',
      desc: 'Authentic 1628 engraving from William Harvey’s De Motu Cordis.',
    },
  ],
};

// ============================================================================
// 5. LESSON 2.5: Continuity in Treatment & The Great Plague of London (1665)
// ============================================================================
const lesson_2_5 = {
  id: 'lesson_2_5',
  title: 'KT2.5: Continuity in Treatment & The Great Plague of London (1665)',
  specification_anchor:
    'Dealing with the Great Plague in London, 1665: approaches to treatment and attempts to prevent its spread.',
  enquiry_question:
    'Why did the Great Plague of 1665 reveal the severe limitations of Renaissance medical progress?',
  living_timeline_mission: {
    target_milestones: 'Milestone 6 (1665)',
    pages: 'Pages 2–3',
    instruction:
      "Turn back to Pages 2–3 (Milestone 6: 1665). In the sketchpad frame, sketch a plague doctor wearing the beak mask and annotate the red cross on a quarantined door: 'Lord have mercy upon us'!",
  },
  timeline_anchor: [
    {
      date: 'Spring 1665',
      title: 'Outbreak in St Giles-in-the-Fields',
      desc: 'First plague deaths recorded in the impoverished parish outside London’s city walls; mortality accelerates dramatically as summer heat intensifies.',
    },
    {
      date: 'June 1665',
      title: 'Civic Quarantine Orders Enforced',
      desc: 'The Lord Mayor and Aldermen enforce strict plague orders: infected houses boarded up for 28 days with red crosses, watchmen stationed, and public assemblies banned.',
    },
    {
      date: 'September 1665',
      title: 'The Peak of Mortality',
      desc: 'Over 7,000 citizens die in a single week; total deaths eventually exceed 100,000 (roughly 20% of London’s population); King Charles II flees to Oxford.',
    },
    {
      date: 'September 1666',
      title: 'The Great Fire of London',
      desc: 'The Great Fire destroys 13,200 wooden houses and contaminated thatch, effectively clearing rat-infested slums and ending the epidemic.',
    },
  ],
  delivery_plan: {
    format: '2-Lesson Enquiry Sequence (2x 50 mins) or 100-min Double Period',
    lesson_1: {
      title: 'Lesson 1: The London Catastrophe & Municipal Public Health (50 mins)',
      phases: [
        {
          time: '00–10m',
          label: 'Hook & Spaced Retrieval',
          instruction:
            'Complete Do Now retrieval on William Harvey. Introduce the 1665 epidemic and display Source A (Plague Doctor).',
        },
        {
          time: '10–30m',
          label: 'Guided Reading: Municipal Quarantine',
          instruction:
            'Read Acts 1 & 2 ([1.1] to [2.2]). Contrast organized municipal quarantine with 1348 Black Death chaos.',
        },
        {
          time: '30–45m',
          label: 'Vocabulary & Quarantine Distinction Task',
          instruction:
            'Complete Disciplinary Vocabulary distinguishing Civic Quarantine Orders from Miasmatic Pomanders.',
        },
        {
          time: '45–50m',
          label: 'Formative Check & Plenary',
          instruction:
            'Teacher poses Hinge Question on Source A. Log 1665 Plague on Living Timeline.',
        },
      ],
    },
    lesson_2: {
      title: 'Lesson 2: Medical Stagnation & 16-Mark Evaluative Essay (50 mins)',
      phases: [
        {
          time: '00–10m',
          label: 'Inspect Source B (Mass Plague Pit)',
          instruction:
            'Examine Source B (plague burial pit). Analyze the failure of medical treatments.',
        },
        {
          time: '10–25m',
          label: 'Deconstruct Acts 3 & 4 (1348 vs 1665 Continuity)',
          instruction:
            'Analyze why killing 200,000 cats/dogs worsened the flea vector and why bloodletting and miasma persisted.',
        },
        {
          time: '25–45m',
          label: 'Deliberate Exam Practice (16+4m Essay)',
          instruction:
            'Complete Q3 Difference question [4m] and 16-mark essay on 1665 Plague vs 1348 Black Death using structure strips.',
        },
        {
          time: '45–50m',
          label: 'Unit Reflection & Living Timeline Final Sign-off',
          instruction:
            'Direct pupils to Page 14 of printed workbook to complete End of Unit Reflection & Pupil Voice.',
        },
      ],
    },
  },
  hook_text:
    'In the scorching summer of 1665, London became a city of horrors. Over 100,000 people—one in every five citizens—perished as the Great Plague tore through overcrowded parishes. Dead-carts rattled through deserted streets at midnight to the cry of "Bring out your dead!", dumping bodies into mass lime pits. Yet this was the era of the Royal Society, of Vesalius’s anatomy, and of Harvey’s blood circulation. Why did all the brilliant breakthroughs of the Scientific Revolution fail so completely to save London? While civic authorities enforced strict padlocked quarantines with armed watchmen and painted red crosses, doctors remained as utterly helpless as medieval monks in 1348. They prescribed smoking tobacco, strapped plucked chickens to swollen buboes, and slaughtered 200,000 cats and dogs—tragically helping the plague rats multiply. Was the Great Plague a triumph of government organization, or the ultimate proof of Renaissance medical failure?',
  teacher_notes: {
    primer:
      'Synthesize continuity and change in early modern epidemic response. Students must weigh significant changes in municipal administration (quarantine, watchmen, red crosses, Bills of Mortality) against almost total continuity in medical understanding and treatment (miasma, Four Humours, quack remedies, bleeding, and complete ignorance of the flea-rat vector).',
    objectives: [
      {
        objective:
          'Analyze the organized civic and municipal public health response to the 1665 Great Plague.',
        primer:
          'Direct students to paragraphs [1.1]–[1.2]. Detail the Mayor’s orders: 28-day house lockup, red crosses, watchmen, mass lime pits, and Bills of Mortality.',
        question:
          'How did the municipal response in 1665 demonstrate greater civic organization than the response to the Black Death in 1348?',
      },
      {
        objective:
          'Explain the persistence of medieval medical theories and ineffective treatments in 1665.',
        primer:
          'Direct students to paragraphs [2.1]–[2.2]. Focus on the tragic mistake of slaughtering 200,000 cats and dogs (allowing flea-bearing rats to thrive) and treatments like smoking tobacco and quack plague water.',
        question:
          'Why did the slaughter of cats and dogs in 1665 make the plague epidemic worse rather than better?',
      },
      {
        objective:
          'Evaluate the historiographical debate: Did 1665 show more change or continuity compared to 1348?',
        primer:
          'Direct students to paragraphs [3.1]–[4.2]. Guide them to distinguish administrative change (public health containment) from clinical continuity (zero cure or understanding of bacteria).',
        question:
          'Why did all the anatomical discoveries of Vesalius and Harvey fail to save a single victim of the Great Plague?',
      },
    ],
    source_context: {
      'Source A':
        'A famous 17th-century copperplate engraving of a Plague Doctor (Doctor Schnabel von Rom, 1656/1665) wearing an oiled leather coat, spectacles, and a bird-like beak mask filled with sweet-smelling herbs. **Hinge Question:** What does the beak mask filled with dried flowers and camphor prove about the enduring dominance of the miasma theory in 1665?',
      'Source B':
        'A contemporary woodcut broadsheet illustration from 1665 showing London parish dead-carts collecting corpses at night and dumping them into a mass lime pit at Holywell Mount. **Hinge Question:** Why did municipal authorities order burials to take place exclusively at night, and what does this show about the government’s fear of public panic?',
    },
  },
  do_now: [
    { q: 'In what year did William Harvey publish De Motu Cordis?', a: '1628' },
    {
      q: 'Which ancient theory of blood production did Harvey disprove through mathematical calculations?',
      a: "Galen's theory that the liver constantly manufactures blood from food",
    },
    {
      q: 'What tiny blood vessels connecting arteries and veins could Harvey NOT see without a microscope?',
      a: 'Capillaries',
    },
    {
      q: "Why did Harvey's discovery of blood circulation have NO immediate effect on medical treatment?",
      a: 'Doctors did not know what caused infection and continued bloodletting to balance humours.',
    },
  ],
  fun_facts: [
    {
      fact: 'Schoolboys at Eton College were flogged with birch rods if they failed to smoke tobacco every morning in 1665, because smoke was believed to neutralize the deadly plague miasma!',
      icon: 'fa-smoking',
    },
    {
      fact: 'The famous Derbyshire village of Eyam chose to quarantine itself voluntarily when infected cloth arrived from London, cutting themselves off from the world so the disease would not spread to Sheffield.',
      icon: 'fa-house-lock',
    },
    {
      fact: 'King Charles II and his royal court fled London immediately for Oxford, taking all wealthy physicians with them, leaving poor Londoners in the care of a handful of brave apothecaries.',
      icon: 'fa-person-running',
    },
  ],
  guided_reading: [
    {
      q: 'Roughly how many Londoners died during the Great Plague of 1665?',
      a: 'Over 100,000 people, which was approximately one-fifth (20%) of London’s total population.',
    },
    {
      q: 'What was painted on the front doors of quarantined plague houses?',
      a: 'A red cross, one foot high, accompanied by the inscription: "Lord have mercy upon us."',
    },
    {
      q: 'Why was the slaughter of 200,000 cats and dogs a catastrophic mistake?',
      a: 'Because plague was carried by fleas living on black rats; killing cats and dogs removed the rats’ natural predators, causing the flea-infested rat population to surge.',
    },
  ],
  narrative_blocks: [
    {
      title: 'Act 1: Context & Catalyst (The Catastrophe of 1665)',
      text: '<span class="para-ref">[1.1]</span> In the spring of 1665, after a winter of bitter frost, bubonic plague erupted across London. Beginning in the crowded, impoverished suburban parish of St Giles-in-the-Fields, the epidemic exploded during an unusually hot, dry summer. Within weeks, the death toll escalated from dozens to thousands per week. At its catastrophic peak in September, over 7,000 people were dying every seven days. By the time the epidemic subsided in the winter frost, over 100,000 Londoners—nearly twenty percent of the city’s population—had perished.<br><br><span class="para-ref">[1.2]</span> As panic gripped the capital, King Charles II, Parliament, and wealthy aristocrats fled to the countryside. Most university-educated physicians abandoned their practices and followed the court, leaving ordinary citizens to face the nightmare alone. Commerce collapsed, shipping on the River Thames was quarantined, and London became an eerie city of silence, punctuated only by the mourning wails of families and the midnight rumble of dead-carts.',
    },
    {
      title: 'Act 2: Escalation & Conflict (Municipal Quarantine Orders: The Change)',
      text: '<span class="para-ref">[2.1]</span> Compared to the disorganized, panicked response to the Black Death in 1348, the response of London’s local government in 1665 demonstrated a major advancement in civic public health administration. The Lord Mayor and Court of Aldermen issued strict "Plague Orders". Parishes appointed two female "Searchers of the Dead" to inspect corpses and verify the cause of death. Parishes also published weekly <em>Bills of Mortality</em>, detailing deaths parish by parish to monitor the epidemic’s spread—an early form of statistical epidemiology.<br><br><span class="para-ref">[2.2]</span> The most aggressive municipal policy was compulsory household quarantine. When plague struck a family, the entire house was boarded up and locked for 28 days. A red cross, twelve inches high, was painted on the door beneath the solemn plea: "Lord have mercy upon us". Two watchmen were assigned to every locked home—one by day and one by night—to bring food and prevent anyone from escaping. All public gatherings, theatrical performances, sports, and traditional funeral ceremonies were banned. Burials were permitted only between sunset and sunrise, with bodies tipped into vast mass lime pits (<span class="archival-meta-tag">Source B</span>).',
    },
    {
      title: 'Act 3: Forensic Evidence (Medical Ignorance & Superstitious Continuity)',
      source: {
        title: 'Source A: 17th-Century Plague Doctor (Schnabel von Rom)',
        src: '/images/plague_doctor_1665.png',
        source: '/images/plague_doctor_1665.png',
        image: '/images/plague_doctor_1665.png',
        question:
          "Look at Source A above: Identify three distinct features of the plague doctor's costume (the waxed leather gown, the bronze spectacles, and the curved beak filled with sweet perfumes). How does each feature prove that physicians in 1665 still believed the primary cause of plague was corrupt miasma rather than contagion carried by rat fleas?",
        source_context:
          "Engraving of 'Doctor Schnabel von Rom' (Doctor Beak of Rome), popularised during the 17th-century European epidemics. The curved beak acted as a primitive respirator packed with sweet spices, perfumes, and dried flowers to ward off 'pestilential miasma'.",
        citation:
          'Copperplate engraving by Paul Fürst of Nuremberg, after a 1656 drawing by J. Columbina, Germanisches Nationalmuseum, Nuremberg.',
      },
      text: '<span class="para-ref">[3.1]</span> While municipal administration progressed, medical understanding in 1665 showed almost complete continuity with the medieval Black Death. Because the bacterium <em>Yersinia pestis</em> was unknown, physicians and magistrates remained completely ignorant of the true vector: rat fleas. Believing that domestic animals carried the poisonous contagion in their fur, the Lord Mayor ordered the mass extermination of domestic animals: over 40,000 dogs and an estimated 200,000 cats were slaughtered. This tragic error wiped out the natural predators of the black rat, allowing flea-carrying rodents to multiply unchecked throughout London’s timbered tenements.<br><br><span class="para-ref">[3.2]</span> Furthermore, the miasma theory remained the dominant medical explanation. Doctors wore protective leather suits and grotesque bird-like beak masks (<span class="archival-meta-tag">Source A</span>) packed with dried roses, cloves, and camphor to filter out "pestilential air". Citizens carried sweet-smelling pomanders, held sponges soaked in vinegar to their noses, and burned barrels of pitch in the streets. Schoolboys at Eton were forced to smoke tobacco every morning to ward off contagion. Quack doctors made fortunes selling useless "Plague Water", while folk healers strapped plucked, living chickens or dried toads to swollen buboes to "draw out the poison".',
    },
    {
      title: 'Act 4: The Historical Verdict & 1348 vs 1665 Historiographical Debate',
      text: '<span class="para-ref">[4.1]</span> The Great Plague of 1665 exposes the dramatic gulf between Renaissance scientific theory and everyday medical reality. Despite the brilliant anatomical achievements of Vesalius and the physiological models of Harvey, 17th-century medicine was utterly powerless to prevent or cure the plague. Bleeding and purging remained the primary therapies offered by physicians who stayed in London, further weakening dehydrated patients and hastening their deaths. The epidemic was eventually halted not by medical science, but by the bitter winter frosts of late 1665 (which killed the flea population) and the catastrophic Great Fire of London in September 1666, which incinerated thousands of flea-infested thatched slums.<br><br><span class="para-ref">[4.2]</span> Historiographically, historians evaluate the 1665 epidemic as a dual narrative of administrative progress and medical stagnation. In terms of municipal governance, London displayed impressive bureaucratic sophistication: quarantine enforcement, weekly statistical casualty mapping, and centralized food supply management marked a genuine departure from 1348. Yet in terms of clinical medicine, diagnosis, and treatment, continuity completely outweighed change. Without germ theory, 17th-century doctors were as intellectually blind to the biological cause of plague as medieval flagellants had been three centuries earlier.',
    },
  ],
  tasks: [
    {
      type: 'two_sided_argument',
      topic: 'The Great Plague of 1665: Municipal Quarantine vs Medical Stagnation',
      text: 'The Great Plague of 1665: Municipal Quarantine vs Medical Stagnation',
      instruction:
        'GCSE Analytical Assessment: Evaluate whether responses to the Great Plague showed greater change or continuity compared to the Black Death.',
      advancement: {
        title: 'Municipal Public Health Organization (Change)',
        points: [
          'The Lord Mayor and Aldermen strictly enforced systematic municipal quarantine: padlocking infected houses for 28 days with red crosses and watchmen.',
          'Weekly parish Bills of Mortality recorded exact casualties, representing early statistical epidemiology.',
          'Banned public assemblies, closed theatres, and enforced midnight burials in mass lime pits outside city walls.',
        ],
        starter: 'On the one hand, responses in 1665 showed significant change because...',
      },
      limitations: {
        title: 'Medical Ignorance & Superstition (Continuity)',
        points: [
          'Physicians and public were completely ignorant of the bacterium Yersinia pestis; killing 200,000 cats and dogs actually caused the rat flea population to explode.',
          'Enduring reliance on miasma: plague doctor beak masks, smoking tobacco, carrying pomanders, and burning pitch in streets.',
          'Treatments were completely useless: strapping plucked chickens to buboes, quack plague water, and continuing medieval bloodletting.',
        ],
        starter:
          'On the other hand, there was almost complete continuity in medical understanding because...',
      },
      synthesis_prompt:
        'Write a balanced GCSE exam paragraph evaluating whether responses to the Great Plague showed more change or continuity compared to 1348.',
      synthesis_connectives: [
        'On the one hand, municipal organization showed change because...',
        'For example, local authorities enforced...',
        'On the other hand, there was complete continuity in...',
        'Consequently, treatments remained...',
        'Overall, while civic methods progressed...',
      ],
      model_answer:
        "On the one hand, responses to the Great Plague of 1665 showed significant change compared to the 1348 Black Death in terms of organized municipal administration and public health policy. The Lord Mayor of London and Court of Aldermen enforced systematic, centralized regulations to contain the epidemic. Infected houses were padlocked and boarded up for 28 days, marked with a painted red cross and 'Lord have mercy upon us', and guarded day and night by parish watchmen to enforce quarantine. Large public assemblies, theatrical plays, and traditional funerals were banned, and mass plague pits were dug outside city walls. Furthermore, the parish-by-parish recording of deaths in weekly Bills of Mortality allowed authorities to track the geographic spread of the epidemic, representing an early form of statistical epidemiology that was entirely absent during the Black Death.<br><br>On the other hand, there was almost complete continuity in medical understanding, diagnosis, and treatment between 1348 and 1665. Because bacteria and microbes were completely unknown, physicians and magistrates still blamed atmospheric miasma (poisonous air) and divine wrath. In a catastrophic error born of the miasma theory, authorities ordered the slaughter of over 40,000 dogs and 200,000 cats, which eliminated the natural predators of black rats and allowed the flea-infested rodent population to explode. Furthermore, medical treatments remained superstitious and ineffective: doctors prescribed smoking tobacco to ward off bad air, strapped plucked chickens or dried toads to swollen buboes, and charged vast sums for useless herbal 'plague water'. Consequently, over 100,000 Londoners died in a single year, proving that while municipal governance progressed, medical science remained trapped in medieval ignorance.",
    },
  ],
  vocab: [
    {
      term: 'Bills of Mortality',
      def: 'Weekly published casualty lists in London recording deaths parish by parish, an early form of epidemiological tracking.',
    },
    {
      term: 'Municipal Quarantine',
      def: 'The compulsory 28-day boarding up of infected houses with red crosses and watchmen enforced by the Mayor of London.',
    },
    {
      term: 'Searchers of the Dead',
      def: 'Women appointed by London parishes to inspect corpses, identify plague symptoms, and report causes of death.',
    },
    {
      term: 'Plague Doctor Beak',
      def: 'Bird-like leather mask stuffed with sweet herbs and spices to filter out poisonous miasmas while treating victims.',
    },
    {
      term: 'Miasmatic Pomander',
      def: 'A hollow ball or orange studded with cloves and herbs carried to ward off bad smells believed to cause the plague.',
    },
    {
      term: 'Mass Lime Pits',
      def: 'Deep communal trenches dug outside London city walls where corpses collected by dead-carts were buried in quicklime.',
    },
  ],
  vocab_cloze_text:
    'During the 1665 epidemic, London parishes published weekly [Bills of Mortality] to monitor casualties. Parishes appointed [Searchers of the Dead] to inspect corpses for buboes. To contain the spread, the Mayor enforced strict [Municipal Quarantine], padlocking infected houses for 28 days with red crosses. Physicians wore a protective [Plague Doctor Beak] packed with dried herbs, while citizens carried a [Miasmatic Pomander] against foul air. At night, dead-carts dumped bodies into [Mass Lime Pits] outside the city walls. Yet because rat fleas were unknown, these civic efforts could not stop the epidemic.',
  gcse_task: {
    title: 'Edexcel GCSE (9–1) Paper 1 Section B Practice: Q3 & Q5/Q6',
    tasks: [
      {
        type: 'written',
        tariff: 'Q3: Explain one way approaches were different [4 marks]',
        text: 'Explain one way in which approaches to preventing the Great Plague in 1665 were different from approaches to the Black Death in 1348. [4 marks]',
        model:
          "One way in which approaches to prevention were different was the **systematic enforcement of municipal quarantine and casualty tracking** by civic authorities in 1665. In 1348, during the Black Death, the national and local government was completely overwhelmed; quarantine was sporadic and chaotic, and thousands fled without restraint. In contrast, during the 1665 Great Plague, the Lord Mayor of London enforced systematic regulations: infected houses were padlocked for 28 days, painted with a red cross and 'Lord have mercy upon us', and guarded day and night by watchmen. Furthermore, weekly Bills of Mortality tracked deaths parish by parish. This was a significant difference because prevention in 1665 was managed by centralized bureaucratic enforcement rather than individualized panic.",
      },
      {
        type: 'written',
        tariff: 'Q5/Q6: Evaluative Essay [16+4 marks]',
        text: "'Approaches to treating and preventing disease during the Great Plague of 1665 showed almost complete continuity with the Black Death of 1348.' How far do you agree? Explain your answer. [16+4 marks]",
        stimulus: ['The Four Humours and miasma', 'Quarantine and watchmen'],
        model:
          "On the one hand, there is strong evidence to agree that approaches to treating and understanding disease during the Great Plague of 1665 showed almost complete continuity with the Black Death of 1348. In terms of medical theory, physicians in 1665 remained completely ignorant of the bacterium Yersinia pestis and its transmission by rat fleas. Consequently, the primary medical explanation remained the ancient theory of miasma (bad air) combined with divine retribution for sin. People carried sweet-smelling pomanders, smoked tobacco, and burned barrels of pitch in the streets, exactly as medieval flagellants had done. Furthermore, medical treatments were identical in their complete lack of efficacy: doctors and apothecaries continued to prescribe traditional bloodletting and purging, strapped dried toads or plucked living chickens to swollen buboes, and sold expensive quack remedies like 'Plague Water'. The tragic slaughter of 200,000 cats and dogs—ordered because authorities believed animal fur absorbed miasma—further proved that medical understanding was unchanged, as killing predators allowed the flea-carrying black rat population to surge.<br><br>On the other hand, approaches to preventing the disease demonstrated significant, organized change in terms of municipal government administration and public health policy. In 1348, the government response was chaotic and uncoordinated, leading to social collapse. In 1665, the Lord Mayor of London and Court of Aldermen enforced rigorous, centralized Plague Orders. Infected houses were systematically padlocked and quarantined for 28 days, marked with a 12-inch red cross and the words 'Lord have mercy upon us', and guarded day and night by watchmen. Large public assemblies, theatrical performances, sports events, and traditional funerals were strictly banned, and mass plague pits were organized outside city walls with night-time burials. Furthermore, parishes published weekly Bills of Mortality, tracking casualties parish by parish—an early form of statistical epidemiology that represented a major administrative advance over the medieval period.<br><br>In conclusion, I agree with the statement to a significant extent regarding clinical medical treatment, but disagree regarding municipal prevention. In terms of medical knowledge, diagnosis, and therapies, there was almost total continuity with 1348: doctors were just as helpless against the plague as medieval monks because germ theory was still two centuries away. However, in terms of preventative public health and civic organization, 1665 witnessed a profound transformation from medieval helplessness to structured municipal quarantine. Therefore, while medical science stagnated, government administration showed decisive progress.",
      },
    ],
  },
  learning_objectives: [
    'Analyze the organized civic and municipal public health response to the 1665 Great Plague.',
    'Explain the persistence of medieval medical theories and ineffective treatments in 1665.',
    'Evaluate the historiographical debate: Did 1665 show more change or continuity compared to 1348?',
  ],
  quiz: [
    {
      question: 'Roughly how many Londoners died during the Great Plague of 1665?',
      options: ['Over 100,000 (roughly 20%)', 'About 5,000', 'Over 1 million', 'Less than 1,000'],
      answer: 'Over 100,000 (roughly 20%)',
      explanation:
        'Over 100,000 Londoners died in 1665, representing approximately one-fifth of the entire capital’s population.',
    },
    {
      question: 'What was painted on the doors of quarantined plague houses in London?',
      options: [
        'A red cross and "Lord have mercy upon us"',
        'A black skull and crossbones',
        'A yellow star',
        'A white flag',
      ],
      answer: 'A red cross and "Lord have mercy upon us"',
      explanation:
        'Parish watchmen padlocked infected houses and painted a 12-inch red cross with the plea "Lord have mercy upon us".',
    },
    {
      question: 'Why was the slaughter of 200,000 cats and dogs in 1665 a catastrophic mistake?',
      options: [
        'It removed the natural predators of black rats, allowing the flea-carrying rat population to explode.',
        'Cats and dogs were the only animals that could smell the plague bacteria.',
        'The meat was needed to feed citizens during quarantine.',
        'It angered the King, who punished the Lord Mayor.',
      ],
      answer:
        'It removed the natural predators of black rats, allowing the flea-carrying rat population to explode.',
      explanation:
        'Plague was carried by fleas living on black rats; killing cats and dogs allowed the rat vector to surge unchecked.',
    },
    {
      question:
        'Which event in September 1666 helped bring an end to the plague epidemic in London?',
      options: [
        'The Great Fire of London',
        'The arrival of Penicillin',
        'The coronation of a new King',
        'A severe drought that dried up the Thames',
      ],
      answer: 'The Great Fire of London',
      explanation:
        'The Great Fire burned down over 13,000 wooden, rat-infested tenements and filthy slums, eradicating the rodent habitat.',
    },
  ],
  flashcards: [
    {
      q: 'How many Londoners died in the Great Plague of 1665?',
      a: 'Over 100,000 people (around 20% of London’s population).',
    },
    {
      q: 'What were the London Bills of Mortality?',
      a: 'Weekly published casualty lists recording deaths by parish, allowing authorities to track the spread of the plague.',
    },
    {
      q: 'What municipal quarantine measures were enforced in 1665?',
      a: 'Infected houses were boarded up for 28 days with red crosses painted on doors, guarded by watchmen, and public gatherings were banned.',
    },
    {
      q: 'Why did doctors wear beak masks filled with herbs in 1665?',
      a: 'Because of the miasma theory: they believed sweet herbs in the beak would filter out poisonous, disease-carrying air.',
    },
    {
      q: 'Why did the slaughter of cats and dogs in 1665 worsen the plague?',
      a: 'It wiped out the natural predators of black rats, allowing the rat flea population carrying Yersinia pestis to multiply.',
    },
  ],
  draw_tasks: [
    {
      title: 'Diagram: Plague Quarantined Doorway',
      instruction:
        "Sketch a 17th-century wooden London doorway padlocked from the outside, showing the 12-inch red cross, the painted inscription 'Lord have mercy upon us', and a parish watchman with a lantern.",
    },
  ],
  sources: [
    {
      title: 'Source A: 17th-Century Plague Doctor (Schnabel von Rom)',
      src: '/images/plague_doctor_1665.png',
      source: '/images/plague_doctor_1665.png',
      caption:
        'A 17th-century copperplate engraving of a Plague Doctor wearing an oiled protective robe and herb-stuffed beak mask.',
      desc: 'Iconic primary engraving of an early modern plague doctor in full protective attire.',
    },
    {
      title: 'Source B: Night Burial in a Mass Plague Pit (1665)',
      src: '/images/plague_burial.jpg',
      source: '/images/plague_burial.jpg',
      caption:
        'A contemporary woodcut broadsheet showing dead-carts dumping plague victims at night into a mass lime pit.',
      desc: 'Historic woodcut broadsheet illustrating nocturnal plague burials during the 1665 epidemic.',
    },
  ],
  lesson_reflection: {
    prompt:
      'You have reached the end of this Key Topic booklet! Before you finish, please turn to the back page of your printed workbook (Page 14) and complete the End of Unit Reflection & Pupil Voice page.',
    instructions: [
      'Complete the WWW (What Went Well) section — what did you enjoy or find easiest?',
      'Complete the EBI (Even Better If) section — what did you find most challenging?',
      'Circle your effort level (1-5) and set a specific target for the next Key Topic.',
    ],
  },
};

// ============================================================================
// INJECT THE 5 LESSONS INTO units/edexcel_medicine/data.js
// ============================================================================
const newRenaissanceLessons = [lesson_2_1, lesson_2_2, lesson_2_3, lesson_2_4, lesson_2_5];

const lines = content.split('\n');
let startIndex = -1;
let endIndex = -1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes("id: 'lesson_2_1'") || lines[i].includes('id: "lesson_2_1"')) {
    for (let j = i; j >= 0; j--) {
      if (lines[j].trim() === '{') {
        startIndex = j;
        break;
      }
    }
    break;
  }
}

for (let i = startIndex; i < lines.length; i++) {
  if (lines[i].includes("id: 'lesson_3_1'") || lines[i].includes('id: "lesson_3_1"')) {
    for (let j = i; j >= startIndex; j--) {
      if (lines[j].trim() === '},') {
        endIndex = j;
        break;
      }
    }
    break;
  }
}

console.log(`Replacing lines ${startIndex} to ${endIndex} in units/edexcel_medicine/data.js...`);
if (startIndex === -1 || endIndex === -1) {
  console.error('❌ Could not locate Renaissance lesson boundaries!');
  process.exit(1);
}

function formatLesson(l) {
  return (
    '    ' +
    JSON.stringify(l, null, 2)
      .replace(/\n/g, '\n    ')
      .replace(/"([a-zA-Z_$][0-9a-zA-Z_$]*)":/g, '$1:') +
    ','
  );
}

const formattedLessonsStr = newRenaissanceLessons.map(formatLesson).join('\n');

const before = lines.slice(0, startIndex).join('\n');
const after = lines.slice(endIndex + 1).join('\n');

const newContent = before + '\n' + formattedLessonsStr + '\n' + after;

fs.writeFileSync(dataFilePath, newContent, 'utf8');
console.log('🎉 Successfully injected 5 Renaissance lessons into units/edexcel_medicine/data.js!');
