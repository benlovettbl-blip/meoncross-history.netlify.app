const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '..', 'units', 'edexcel_medicine', 'data.js');
let content = fs.readFileSync(dataFilePath, 'utf8');

// ============================================================================
// 1. LESSON 1.1: Supernatural & Religious Ideas (c1250–c1500)
// ============================================================================
const lesson_1_1 = {
  id: 'lesson_1_1',
  title: 'KT1.1: Supernatural & Religious Explanations of Disease (c1250–c1500)',
  specification_anchor:
    'Ideas about the cause of disease and illness: supernatural and religious explanations; the influence of the Church on medicine and science.',
  enquiry_question:
    'Why did the medieval Catholic Church hold an unshakeable monopoly over beliefs about the causes of disease?',
  living_timeline_mission: {
    target_milestones: 'Milestones 1 & 2 (c. 1250 & 1277)',
    pages: 'Pages 2–3',
    instruction:
      "Turn back to Pages 2–3 (Milestones 1 & 2). In the sketchpad frame, sketch the Church scriptorium and annotate the terrifying warning: 'Dissent from Galen is Heresy!'",
  },
  timeline_anchor: [
    {
      date: 'c. 1250',
      title: 'The Church Monopoly on Medical Texts',
      desc: "Monastic scriptoria control all manuscript copying; the Catholic Church declares Galen's teleological medical treatises sacred Christian dogma.",
    },
    {
      date: '1277',
      title: 'Imprisonment of Roger Bacon',
      desc: 'Franciscan friar Roger Bacon is imprisoned for advocating firsthand empirical experimentation over unquestioned obedience to ancient books.',
    },
    {
      date: '1345',
      title: 'The Great Planetary Conjunction',
      desc: 'Astrologers and University of Paris physicians blame the conjunction of Mars, Jupiter, and Saturn in Aquarius for corrupting the atmosphere.',
    },
  ],
  delivery_plan: {
    format: '2-Lesson Enquiry Sequence (2x 50 mins) or 100-min Double Period',
    lesson_1: {
      title: 'Lesson 1: The Church Monopoly & Divine Punishment (50 mins)',
      phases: [
        {
          time: '00–10m',
          label: 'Hook & Spaced Retrieval',
          instruction:
            'Complete Do Now retrieval. Display Source A (Medieval Church Altar & Doom Painting). Contrast medieval spiritual worldviews with modern germ understanding.',
        },
        {
          time: '10–30m',
          label: 'Modelled Shared Reading & Discussion',
          instruction:
            'Read Acts 1 & 2 with paragraph signposting ([1.1] to [2.2]). Deconstruct why sickness was viewed as divine retribution for sin and examine the social banishment of lepers to Lazar houses.',
        },
        {
          time: '30–45m',
          label: 'Analytical Assessment Ledger',
          instruction:
            'Complete Disciplinary Vocabulary Distinction (Divine Retribution vs Physical Causation) and annotate the Roger Bacon case study.',
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
      title: 'Lesson 2: Astrology, Teleology & Exam Mastery (50 mins)',
      phases: [
        {
          time: '00–10m',
          label: 'Retrieval & Visual Forensic Inspection',
          instruction:
            'Inspect Source B (The Zodiac Man). Discuss how physicians reconciled astrology with Church doctrine using planetary conjunctions.',
        },
        {
          time: '10–25m',
          label: 'Deconstruct Acts 3 & 4 (Galen’s Teleology)',
          instruction:
            'Explain why the Church embraced Galen’s idea of purposeful design by a single Creator, making criticism of Galen an act of heresy.',
        },
        {
          time: '25–45m',
          label: 'Deliberate Exam Practice (12m)',
          instruction:
            'Complete Question 4 Explain Why: Explain why the Catholic Church had such a powerful influence on medical ideas (c1250–c1500) using the 3-column structure strip.',
        },
        {
          time: '45–50m',
          label: 'Self-Assessment & D.I.R.T.',
          instruction:
            'Pupils self-assess against the high-yield vocabulary bank and log their marks on the back-cover ledger.',
        },
      ],
    },
  },
  teacher_notes: {
    primer:
      'The overarching pedagogical goal of this lesson is to help pupils understand that medieval beliefs about disease were not random superstition, but a deeply cohesive and logical system anchored to Catholic theology. By exploring the Church’s monopoly on education, book copying, and university curricula, pupils understand why medical progress stalled for centuries.',
    objectives: [
      {
        objective: 'Explain supernatural and religious explanations for the cause of illness.',
        primer:
          'Focus on paragraphs [1.1] and [2.1]. Guide pupils to see that if illness is sent by God to punish sin or test faith, searching for biological causes was considered pointless or even blasphemous.',
        question:
          'If medieval people believed God directly sent illness as a punishment for sin, why did this stop doctors from investigating physical causes of disease?',
      },
      {
        objective:
          'Analyse how the Church enforced Galenic orthodoxy and suppressed scientific dissent.',
        primer:
          'Direct pupils to paragraphs [3.1] and [4.1]. Emphasise Galen’s teleological argument (purposeful design by a single Creator) and the exemplary punishment of Roger Bacon in 1277.',
        question:
          'Why did the Church declare the pagan Roman doctor Galen infallible, and what happened to anyone who questioned his writings?',
      },
    ],
  },
  do_now: {
    type: 'questions',
    title: 'Spaced Retrieval Do Now: Foundations of Medicine',
    instructions:
      'Answer the four recall questions below from memory to check your grounding in medieval medical concepts.',
    items: [
      {
        question:
          'Which ancient civilization first introduced the idea of natural, humoural balance?',
        answer: 'The Ancient Greeks',
        options: ['The Ancient Greeks', 'The Romans', 'The Anglo-Saxons', 'The Normans'],
      },
      {
        question: 'Name the ancient Roman physician who created the Theory of Opposites.',
        answer: 'Claudius Galen',
        options: ['Claudius Galen', 'Hippocrates', 'Aristotle', 'Roger Bacon'],
      },
      {
        question: 'What four bodily fluids did the humoural theory claim dictated human health?',
        answer: 'Blood, Phlegm, Yellow Bile, Black Bile',
        options: [
          'Blood, Phlegm, Yellow Bile, Black Bile',
          'Blood, Phlegm, Water, Bile',
          'Blood, Choler, Urine, Phlegm',
          'Blood, Saliva, Sweat, Bile',
        ],
      },
      {
        question: 'What term was used for corrupt, foul-smelling air believed to cause disease?',
        answer: 'Miasma',
        options: ['Miasma', 'Phlebotomy', 'Teleology', 'Articella'],
      },
    ],
  },
  narrative_blocks: [
    {
      act: 1,
      act_title: 'Context & Catalyst: The Catholic Church Monopoly',
      text:
        '<span class="para-ref">[1.1]</span> In medieval England (c1250–c1500), the Roman Catholic Church exercised near-total control over intellectual life, education, and social values. Formal education was an ecclesiastical privilege; cathedral schools and universities like Oxford and Paris were staffed entirely by clergy. Most crucially, book production was concentrated inside monastic scriptoria, where monks hand-copied manuscripts. Because every text required months of laborious transcription, the Church acted as an unyielding censor, deciding which books were preserved and which were suppressed.\n\n' +
        '<span class="para-ref">[1.2]</span> Medical teaching was strictly theoretical and anchored to Latin scripture. The Church taught that the physical world was merely a temporary, imperfect realm governed by divine will. Consequently, understanding the universe did not require physical dissection or laboratory experiments; it required studying holy scripture and classical treatises approved by the Pope. To question established teaching was not merely an academic error—it was an act of heresy against God.',
      source: {
        id: 'source_a_church',
        letter: 'A',
        title: 'Source A: Medieval Church Interior with Altar & Doom Painting (14th c.)',
        src: '/images/medieval_church_interior.jpg',
        source: '/images/medieval_church_interior.jpg',
        image: '/images/medieval_church_interior.jpg',
        caption:
          'A medieval parish church interior showing the elevated altar and the vivid Doom painting above the chancel arch depicting Heaven and Hell.',
        provenance: 'St Thomas Church, Salisbury, 14th century Doom mural and altar.',
        context:
          'The Catholic Church dominated every aspect of medieval European existence. Ordinary people attended Mass regularly and viewed illness, famine, and recovery as direct expressions of God’s divine intervention.',
        question:
          'Look at Source A above: Study the central position of the altar and the depiction of the Last Judgment (Doom painting). Why did the medieval Church teach that illness was sent directly by God as a punishment for sin, and how did this belief discourage people from searching for physical causes of disease?',
        hinge_question:
          'Look at Source A above: Study the central position of the altar and the depiction of the Last Judgment (Doom painting). Why did the medieval Church teach that illness was sent directly by God as a punishment for sin, and how did this belief discourage people from searching for physical causes of disease?',
      },
    },
    {
      act: 2,
      act_title: 'Escalation: God’s Wrath, Sin & Leprosy',
      text:
        '<span class="para-ref">[2.1]</span> Because the Church taught that God controlled every aspect of health, sickness was universally interpreted as a spiritual condition. Sudden illness was seen as divine retribution—a punishment sent by God for personal sins such as greed, gluttony, or heresy, or as a divine test of a Christian’s faith and devotion (similar to Job in the Old Testament). Recovery was regarded as a miracle granted through prayer, confession, and repentance, rather than the result of medical skill.\n\n' +
        '<span class="para-ref">[2.2]</span> The most vivid illustration of divine punishment was leprosy. Mentioned prominently in the Bible, leprosy was regarded as a physical manifestation of inner moral corruption and sin. Sufferers were socially ostracised; they underwent a symbolic funeral service before being banished to specialized Lazar houses built outside city walls. When forced to travel, lepers had to wear concealing grey cloaks, keep to the middle of the road, and continuously ring a handheld bell while crying out for alms, warning healthy citizens to avoid their breath.',
      tasks: [
        {
          type: 'written',
          text: 'Using paragraphs [2.1]–[2.2], explain how religious beliefs dictated the social treatment of leprosy sufferers.',
          model:
            'The Catholic Church taught that leprosy was a direct punishment from God for internal sin and moral corruption. Consequently, society treated lepers as spiritually dangerous outcasts, performing symbolic funeral services before banishing them to Lazar houses outside town boundaries. To protect healthy citizens from their breath, lepers were forced to wear concealing cloaks and sound a warning bell.',
        },
      ],
    },
    {
      act: 3,
      act_title: 'Forensic Evidence: Celestial Forces & Astrology',
      text:
        '<span class="para-ref">[3.1]</span> Alongside divine retribution, medieval people believed that human health was intimately governed by the alignment of the stars and planets. While early Church leaders initially condemned astrology as pagan fortune-telling, by the 14th century, astrological medicine was fully incorporated into university curricula and endorsed by European prelates. The cosmos was viewed as God’s vast clockwork creation; planets were believed to exert physical gravitational and mystical influences upon the earthly elements.\n\n' +
        '<span class="para-ref">[3.2]</span> When catastrophic epidemics struck, physicians pointed to unusual celestial configurations. Most famously, when the Black Death decimated Europe, scholars at the University of Paris officially declared that the plague was caused by the conjunction of Saturn, Jupiter, and Mars in the astrological sign of Aquarius in March 1345. This planetary alignment was believed to have drawn up poisonous vapors from deep within the earth, corrupting the air with deadly miasma.',
      source: {
        id: 'source_b_zodiac',
        letter: 'B',
        title: "Source B: The 'Zodiac Man' (Homo Signorum, c.1380)",
        src: '/images/zodiac_man.jpg',
        source: '/images/zodiac_man.jpg',
        image: '/images/zodiac_man.jpg',
        caption:
          'The Zodiac Man (Homo Signorum) showing the 12 astrological signs that medieval physicians believed governed different bodily organs.',
        provenance: 'MS Harley 3719, British Library, London, c.1380.',
        context:
          'Medieval physicians carried pocket handbooks called Vademecums containing Zodiac Man diagrams. Doctors were strictly forbidden to bleed, purge, or operate on a body part when the moon was in its governing astrological sign.',
        question:
          'Look at Source B above: Notice how each astrological constellation rules a specific part of the human body (such as Aries governing the head and Pisces governing the feet). Why did medieval physicians carry pocket almanacs and consult the position of the moon before performing bloodletting or surgery on a patient?',
        hinge_question:
          'Look at Source B above: Notice how each astrological constellation rules a specific part of the human body (such as Aries governing the head and Pisces governing the feet). Why did medieval physicians carry pocket almanacs and consult the position of the moon before performing bloodletting or surgery on a patient?',
      },
    },
    {
      act: 4,
      act_title: 'Historical Verdict: Galen’s Teleology & The Enforcement of Dogma',
      text:
        '<span class="para-ref">[4.1]</span> Why did the Christian Church adopt the medical treatises of Claudius Galen, a pagan doctor from 2nd-century imperial Rome? The crucial connection was teleology. Galen repeatedly argued in his treatises that every single bone, muscle, and organ in the human body had been purposefully crafted by a supreme, singular Creator. This design argument aligned so perfectly with Genesis and Christian creation theology that church leaders declared Galen’s anatomical writings infallible sacred truth.\n\n' +
        '<span class="para-ref">[4.2]</span> The consequence for European medicine was catastrophic stagnation. Questioning Galen became synonymous with questioning scripture. When rare university dissections of executed criminals were conducted, the physician sat high up in a raised chair reading aloud from Galen’s Latin text while an untrained barber cut the body; if a physical organ contradicted Galen, the corpse was dismissed as deformed. When the English Franciscan friar Roger Bacon argued around 1277 that scholars should stop relying on ancient authority and conduct firsthand empirical experiments, church authorities had him imprisoned. For over a millennium, medical progress was effectively criminalised.',
      tasks: [
        {
          type: 'exam_practice',
          tariff: '[12 marks]',
          question:
            'Explain why the Catholic Church had such a powerful influence on medical ideas about the causes of disease in the period c1250–c1500.',
          stimulus: ['Monastic scriptoria', 'Roger Bacon'],
          model:
            'One major reason why the Catholic Church had such a powerful influence on medical ideas was its complete control over education and book production. In the medieval period, the only places where manuscripts were copied were monastic scriptoria, where monks hand-transcribed Latin texts. This gave Church authorities an absolute monopoly over what was read and taught across European universities like Oxford and Paris. Because the Church strictly censored any new or controversial ideas, medical students were taught only texts approved by the Pope, preventing alternative scientific explanations from emerging.\n\n' +
            'Furthermore, the Church fiercely promoted the medical writings of the Roman physician Claudius Galen because of his teleological philosophy. Galen argued that every organ in the human body was purposefully designed by a single Creator. This aligned perfectly with Christian creation theology, leading Church leaders to declare Galen’s writings infallible sacred dogma. Because the Church taught that Galen was divinely inspired, questioning his anatomical errors was treated as dangerous heresy. Medical education focused on memorising Galen’s texts rather than conducting clinical research, completely freezing anatomical knowledge in classical antiquity.\n\n' +
            'Finally, the Church ruthlessly suppressed any scholar who advocated firsthand experimentation. When the Franciscan friar Roger Bacon suggested around 1277 that scientific truth should be established through observation rather than unquestioned obedience to ancient books, Church superiors had him imprisoned. This severe punishment sent a chilling message across Europe that empirical enquiry would be punished as heresy. Consequently, respect for classical authority and fear of ecclesiastical punishment ensured that medical ideas remained unchanged throughout the Middle Ages.',
        },
      ],
    },
  ],
  sources: [
    {
      id: 'source_a_church',
      letter: 'A',
      title: 'Source A: Medieval Church Interior with Altar & Doom Painting (14th c.)',
      src: '/images/medieval_church_interior.jpg',
      source: '/images/medieval_church_interior.jpg',
      image: '/images/medieval_church_interior.jpg',
      caption:
        'A medieval parish church interior showing the elevated altar and the vivid Doom painting above the chancel arch depicting Heaven and Hell.',
      provenance: 'St Thomas Church, Salisbury, 14th century Doom mural and altar.',
      context:
        'The Catholic Church dominated every aspect of medieval European existence. Ordinary people attended Mass regularly and viewed illness, famine, and recovery as direct expressions of God’s divine intervention.',
      question:
        'Look at Source A above: Study the central position of the altar and the depiction of the Last Judgment (Doom painting). Why did the medieval Church teach that illness was sent directly by God as a punishment for sin, and how did this belief discourage people from searching for physical causes of disease?',
      hinge_question:
        'Look at Source A above: Study the central position of the altar and the depiction of the Last Judgment (Doom painting). Why did the medieval Church teach that illness was sent directly by God as a punishment for sin, and how did this belief discourage people from searching for physical causes of disease?',
    },
    {
      id: 'source_b_zodiac',
      letter: 'B',
      title: "Source B: The 'Zodiac Man' (Homo Signorum, c.1380)",
      src: '/images/zodiac_man.jpg',
      source: '/images/zodiac_man.jpg',
      image: '/images/zodiac_man.jpg',
      caption:
        'The Zodiac Man (Homo Signorum) showing the 12 astrological signs that medieval physicians believed governed different bodily organs.',
      provenance: 'MS Harley 3719, British Library, London, c.1380.',
      context:
        'Medieval physicians carried pocket handbooks called Vademecums containing Zodiac Man diagrams. Doctors were strictly forbidden to bleed, purge, or operate on a body part when the moon was in its governing astrological sign.',
      question:
        'Look at Source B above: Notice how each astrological constellation rules a specific part of the human body (such as Aries governing the head and Pisces governing the feet). Why did medieval physicians carry pocket almanacs and consult the position of the moon before performing bloodletting or surgery on a patient?',
      hinge_question:
        'Look at Source B above: Notice how each astrological constellation rules a specific part of the human body (such as Aries governing the head and Pisces governing the feet). Why did medieval physicians carry pocket almanacs and consult the position of the moon before performing bloodletting or surgery on a patient?',
    },
  ],
  quick_quiz: [
    {
      question:
        'Who controlled formal medical education and the copying of books in medieval England?',
      options: [
        'The Catholic Church and monastic scriptoria.',
        'The Royal College of Physicians.',
        'Independent guild printers.',
        'The Crown and royal parliament.',
      ],
      answer: 'The Catholic Church and monastic scriptoria.',
      explanation:
        'Monasteries were the sole centers of manuscript copying, giving the Catholic Church total control over what medical texts were read and taught.',
    },
    {
      question:
        'Why was sudden illness viewed as a spiritual condition rather than a biological infection?',
      options: [
        'People believed sickness was sent by God to punish sin or test religious faith.',
        'Physicians believed germs spontaneously generated inside blood.',
        'The government legally outlawed physical medical treatments.',
        'People believed disease was caused solely by dirty drinking water.',
      ],
      answer: 'People believed sickness was sent by God to punish sin or test religious faith.',
      explanation:
        'The medieval Church taught that God was omnipotent; illness was interpreted as divine punishment or a divine test.',
    },
    {
      question: 'How did medieval society treat leprosy sufferers based on biblical scripture?',
      options: [
        'They were treated in monastic infirmary wards alongside fever patients.',
        'They were surgically cured by barber-surgeons using cauterisation.',
        'They were banished to Lazar houses outside towns, wearing cloaks and ringing warning bells.',
        'They were appointed as churchwardens to pray for the sick.',
      ],
      answer:
        'They were banished to Lazar houses outside towns, wearing cloaks and ringing warning bells.',
      explanation:
        'Viewed as morally corrupt, lepers were socially isolated in Lazar houses and had to ring bells to warn others away.',
    },
    {
      question:
        'What celestial event in March 1345 did University of Paris scholars blame for the Black Death?',
      options: [
        'A total solar eclipse over Western Europe.',
        'The appearance of Halley’s Comet in the sky.',
        'An unusual planetary conjunction of Saturn, Jupiter, and Mars in Aquarius.',
        'A meteor shower striking southern Italy.',
      ],
      answer: 'An unusual planetary conjunction of Saturn, Jupiter, and Mars in Aquarius.',
      explanation:
        'Physicians believed this planetary conjunction generated corrupt miasmatic vapors from the earth.',
    },
    {
      question:
        'What pocket manual did medieval physicians carry to consult astrological diagrams and urine charts?',
      options: [
        'A Vademecum handbook.',
        'A Pharmacopoeia.',
        'Philosophical Transactions.',
        'The Canon of Medicine.',
      ],
      answer: 'A Vademecum handbook.',
      explanation:
        'The Vademecum was a portable folding reference book containing Zodiac Man charts, calendars, and urine wheels.',
    },
    {
      question:
        'Why did the Christian Church adopt the medical writings of the Roman pagan physician Galen?',
      options: [
        'Galen converted to Christianity on his deathbed.',
        'Galen proved that God sent diseases as punishment for heresy.',
        'Galen’s teleological theory argued every organ was designed with purpose by a single Creator.',
        'Galen’s treatises were originally written in Latin by the Apostles.',
      ],
      answer:
        'Galen’s teleological theory argued every organ was designed with purpose by a single Creator.',
      explanation:
        'Galen’s belief in purposeful design by a divine Creator aligned perfectly with Christian creation doctrine.',
    },
    {
      question:
        'What happened to the English friar Roger Bacon around 1277 after he advocated firsthand scientific experiments?',
      options: [
        'He was made Archbishop of Canterbury.',
        'He was imprisoned by Church authorities for heresy.',
        'He was awarded a royal charter by King Edward I.',
        'He founded the first secular medical school in London.',
      ],
      answer: 'He was imprisoned by Church authorities for heresy.',
      explanation:
        'Bacon’s demand for empirical observation over blind reliance on ancient books was punished as heresy.',
    },
    {
      question:
        'What did university professors do during rare dissections of executed criminals in medieval universities?',
      options: [
        'They performed intricate dissections with scalpels to discover new organs.',
        'They sat high in a chair reading Galen aloud while a barber-surgeon did the cutting.',
        'They examined tissue samples under compound microscopes.',
        'They allowed medical students to debate whether Galen was wrong.',
      ],
      answer:
        'They sat high in a chair reading Galen aloud while a barber-surgeon did the cutting.',
      explanation:
        'The professor (Lector) read Galen’s text; if the corpse disagreed, the body was dismissed as malformed.',
    },
  ],
  flashcards: [
    {
      q: 'Why did the medieval Catholic Church hold a monopoly on medical knowledge?',
      a: 'The Church controlled all universities and monastic scriptoria, where monks hand-copied books and strictly censored ideas that contradicted scripture.',
    },
    {
      q: 'How did medieval people explain the religious cause of disease?',
      a: 'Illness was viewed as divine retribution sent by God to punish sin, test faith, or cleanse the soul; recovery was achieved through prayer and repentance.',
    },
    {
      q: 'What were Lazar houses?',
      a: 'Segregated quarantine colonies built outside town boundaries to isolate leprosy sufferers, who were forced to wear cloaks and ring warning bells.',
    },
    {
      q: 'Why did the Church embrace Galen’s medical ideas?',
      a: 'Galen argued that every organ had a purposeful design created by a single Creator (teleology), which matched Christian creation theology in Genesis.',
    },
    {
      q: 'Why was Roger Bacon imprisoned in 1277?',
      a: 'The Franciscan friar advocated experimental science and firsthand observation instead of blind obedience to ancient texts, which the Church deemed heresy.',
    },
  ],
  draw_tasks: [
    {
      title: 'Diagram: The Church Monopolistic Scriptorium',
      instruction:
        'Sketch a medieval monk copying an ancient Latin manuscript in a monastery scriptorium, labeling the quill, the Latin parchment, and the Church seal of approval.',
    },
  ],
};

// ============================================================================
// 2. LESSON 1.2: Rational Explanations: Hippocrates, Galen & The Four Humours
// ============================================================================
const lesson_1_2 = {
  id: 'lesson_1_2',
  title: 'KT1.2: Rational Explanations: Hippocrates, Galen & The Four Humours (c1250–c1500)',
  specification_anchor:
    'Rational explanations: the Theory of the Four Humours and the Theory of Opposites; the miasma theory; the continuing influence of Hippocrates and Galen.',
  enquiry_question:
    'How did the Theory of the Four Humours provide a logical, complete explanation for every illness in medieval England?',
  living_timeline_mission: {
    target_milestones: 'Milestone 1 (c. 1250)',
    pages: 'Pages 2–3',
    instruction:
      "Turn back to Pages 2–3 (Milestone 1). In the sketchpad frame, sketch the Four Humours wheel and annotate Galen's Theory of Opposites!",
  },
  timeline_anchor: [
    {
      date: 'c. 400 BC',
      title: 'Hippocrates & The Four Humours',
      desc: 'Hippocrates develops the natural theory that health depends upon balancing blood, phlegm, yellow bile, and black bile.',
    },
    {
      date: 'c. 160 AD',
      title: 'Galen & The Theory of Opposites',
      desc: 'Galen expands humoural medicine in Rome, introducing the Theory of Opposites to treat excess humours with contrary qualities.',
    },
    {
      date: 'c. 1300',
      title: 'Uroscopy Wheels Standardised',
      desc: 'Radial 20-shade urine charts and pear-shaped glass matulas become the primary diagnostic tool for university-trained physicians.',
    },
  ],
  delivery_plan: {
    format: '2-Lesson Enquiry Sequence (2x 50 mins) or 100-min Double Period',
    lesson_1: {
      title: 'Lesson 1: Hippocratic Humours & Galenic Opposites (50 mins)',
      phases: [
        {
          time: '00–10m',
          label: 'Hook & Spaced Retrieval',
          instruction:
            'Complete Do Now recall on Church monopoly. Display Source A (Four Humours Wheel). Explain how Greek naturalism replaced demonic superstition.',
        },
        {
          time: '10–30m',
          label: 'Modelled Shared Reading & Discussion',
          instruction:
            'Read Acts 1 & 2 with paragraph signposting ([1.1] to [2.2]). Deconstruct the 4 humours, seasons, elements, and Galen’s Theory of Opposites.',
        },
        {
          time: '30–45m',
          label: 'Analytical Assessment Ledger',
          instruction:
            'Complete Disciplinary Vocabulary Distinction (Humoural Imbalance vs External Contagion). Practice matching clinical symptoms to humours.',
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
      title: 'Lesson 2: Miasma Theory, Uroscopy & Exam Mastery (50 mins)',
      phases: [
        {
          time: '00–10m',
          label: 'Retrieval & Visual Forensic Inspection',
          instruction:
            'Inspect Source B (Medieval Urine Chart). Discuss why doctors examined colour, sediment, and taste without surgery.',
        },
        {
          time: '10–25m',
          label: 'Deconstruct Acts 3 & 4 (Miasma & Uroscopy)',
          instruction:
            'Explore how miasma linked environmental stench to bodily putrefaction, making clean air a moral and medical priority.',
        },
        {
          time: '25–45m',
          label: 'Deliberate Exam Practice (4m / 12m)',
          instruction:
            'Complete Question 3 Similarity: Explain one way in which ideas about causes in the Medieval period were similar to the Renaissance [4m].',
        },
        {
          time: '45–50m',
          label: 'Self-Assessment & D.I.R.T.',
          instruction:
            'Pupils peer-assess their 4-mark PEEL paragraph against the model answer and log marks on the back cover.',
        },
      ],
    },
  },
  teacher_notes: {
    primer:
      'The overarching pedagogical goal of this lesson is to demonstrate that humoural medicine was an exceptionally rational, coherent, and empirical system for its time. Rather than relying on magic or witchcraft, physicians used physical symptoms (vomit, phlegm, urine) to deduce internal fluid imbalances.',
    objectives: [
      {
        objective: 'Explain the Theory of the Four Humours and Galen’s Theory of Opposites.',
        primer:
          'Direct pupils to paragraphs [1.1] and [2.1]. Emphasise that health was viewed as an internal balance of blood, phlegm, yellow bile, and black bile, with opposites used to restore equilibrium.',
        question:
          'How would a medieval physician use the Theory of Opposites to treat a patient suffering from a fever with excess hot, dry yellow bile?',
      },
      {
        objective: 'Analyse miasma theory and medieval diagnostic methods (uroscopy).',
        primer:
          'Focus on paragraphs [3.1] and [4.1]. Show how uroscopy allowed doctors to diagnose internal conditions non-invasively, reinforcing Galenic dogma.',
        question:
          'Why did physicians examine urine against a 20-shade wheel instead of examining internal organs directly?',
      },
    ],
  },
  do_now: {
    type: 'questions',
    title: 'Spaced Retrieval Do Now: Religion & Authority',
    instructions:
      'Answer the four recall questions below based on your prior learning in Lesson 1.1.',
    items: [
      {
        question:
          'Why did the medieval Catholic Church actively promote the medical texts of Galen?',
        answer: 'Galen taught that the body was created with purpose by a single divine Creator.',
        options: [
          'Galen taught that the body was created with purpose by a single divine Creator.',
          'Galen was a Christian martyr in Rome.',
          'Galen proved that prayer alone could cure disease.',
          'Galen’s treatises were written in medieval English.',
        ],
      },
      {
        question:
          'What punishment did the English friar Roger Bacon receive in 1277 for advocating experiments?',
        answer: 'He was imprisoned by the Church for heresy.',
        options: [
          'He was imprisoned by the Church for heresy.',
          'He was made physician to the King.',
          'He was awarded a royal pension.',
          'He was exiled to a remote Scottish monastery.',
        ],
      },
      {
        question: 'Where were leprosy sufferers banished to in medieval society?',
        answer: 'Lazar houses outside town boundaries.',
        options: [
          'Lazar houses outside town boundaries.',
          'Monastic infirmaries in London.',
          'University medical wards.',
          'Royal palaces in Westminster.',
        ],
      },
      {
        question: 'What did people believe caused the Black Death in March 1345?',
        answer: 'A conjunction of Saturn, Jupiter, and Mars in Aquarius.',
        options: [
          'A conjunction of Saturn, Jupiter, and Mars in Aquarius.',
          'An outbreak of bacteria in Paris water wells.',
          'A severe drought across northern Europe.',
          'The arrival of Spanish explorers.',
        ],
      },
    ],
  },
  narrative_blocks: [
    {
      act: 1,
      act_title: 'Context: The Greek Foundations of Humoural Theory',
      text:
        '<span class="para-ref">[1.1]</span> While religion explained why God permitted illness, medieval doctors needed a naturalistic, physical framework to explain how disease functioned inside the body. For this, European universities relied upon the ancient Greek physician Hippocrates (c. 460–c. 370 BC). Hippocrates made a revolutionary contribution by rejecting demonic possession and witchcraft, arguing instead that health and disease were entirely natural phenomena governed by bodily fluids.\n\n' +
        '<span class="para-ref">[1.2]</span> Hippocrates posited that the human body contained four primary liquids, termed the Four Humours: Blood (produced by the liver; associated with spring, air, and being hot and wet); Phlegm (produced by the brain and lungs; associated with winter, water, and being cold and wet); Yellow Bile or Choler (produced by the gall bladder; associated with summer, fire, and being hot and dry); and Black Bile or Melancholy (produced by the spleen; associated with autumn, earth, and being cold and dry). Good health required all four humours to remain in harmonious balance. If an individual developed an excess of one humour, or if a humour became putrefied, physical illness immediately resulted.',
      source: {
        id: 'source_a_humours',
        letter: 'A',
        title: 'Source A: The Four Humours Wheel (Tacuinum Sanitatis, 14th c.)',
        src: '/images/four_humours.jpg',
        source: '/images/four_humours.jpg',
        image: '/images/four_humours.jpg',
        caption:
          'The Four Humours Wheel: Blood (air/hot & wet), Phlegm (water/cold & wet), Yellow Bile (fire/hot & dry), and Black Bile (earth/cold & dry).',
        provenance:
          'Tacuinum Sanitatis manuscript, 14th century, Österreichische Nationalbibliothek, Vienna.',
        context:
          'The Theory of the Four Humours dominated medieval clinical diagnosis. Doctors believed every person had a unique humoural balance dictated by their birth, diet, personality, and age.',
        question:
          'Look at Source A above: Study how each of the four humours (Blood, Phlegm, Yellow Bile, Black Bile) is linked to a season, an element, and specific qualities of heat and moisture. If a patient suffering from a cold and shivering was treated with hot spices and dry foods under Galen’s Theory of Opposites, why did this belief in internal fluid balance prevent medieval physicians from searching for external causes of disease?',
        hinge_question:
          'Look at Source A above: Study how each of the four humours (Blood, Phlegm, Yellow Bile, Black Bile) is linked to a season, an element, and specific qualities of heat and moisture. If a patient suffering from a cold and shivering was treated with hot spices and dry foods under Galen’s Theory of Opposites, why did this belief in internal fluid balance prevent medieval physicians from searching for external causes of disease?',
      },
    },
    {
      act: 2,
      act_title: 'Escalation: Galen & The Theory of Opposites',
      text:
        '<span class="para-ref">[2.1]</span> In the 2nd century AD, the Roman imperial physician Claudius Galen expanded Hippocrates’ humoural theory into a comprehensive clinical treatment methodology known as the Theory of Opposites (Contraria Contrariis Curantur). Galen argued that doctors should treat illnesses by counteracting the excessive qualities of the dominating humour with their direct opposites.\n\n' +
        '<span class="para-ref">[2.2]</span> Under this rational system, if a patient suffered from an excess of cold, wet phlegm (manifested as a shivering winter cold and sneezing), the physician prescribed warm, dry treatments such as eating hot chilli peppers, drinking ginger infusions, and resting by a roaring fire. Conversely, if a patient suffered from a high fever caused by an excess of hot, dry yellow bile or hot blood, the doctor prescribed cool cucumbers, cold baths, and bloodletting to lower internal heat. This system gave physicians a systematic logic for prescribing diets, herbal drinks, and purges.',
      tasks: [
        {
          type: 'written',
          text: 'Using paragraphs [2.1]–[2.2], explain how Galen’s Theory of Opposites worked in practice.',
          model:
            'Galen’s Theory of Opposites worked by treating an excess of one humour with its opposite quality. For example, if a patient had an excess of cold, wet phlegm (causing chills and runny noses), the physician prescribed hot, dry foods like peppers or ginger. If a patient had an excess of hot, dry yellow bile or blood (causing a fever), they were treated with cold cucumber, cooling baths, or bloodletting.',
        },
      ],
    },
    {
      act: 3,
      act_title: 'Forensic Evidence: Miasma Theory & Pestilential Air',
      text:
        '<span class="para-ref">[3.1]</span> Alongside internal humoural imbalance, the leading environmental explanation for epidemic disease was Miasma. Miasma was defined as corrupt, foul-smelling air filled with poisonous vapors. Medieval people believed that breathing in poisonous air directly corrupted the blood and unbalanced the humours inside the chest and heart. In medieval hospital and municipal records, this concept was described as "pestilential air," "corruption of the atmosphere," or "putrefaction."\n\n' +
        '<span class="para-ref">[3.2]</span> Miasma was believed to originate from stagnant marshes, open cesspits, unburied corpses, rotting animal carcasses, and dung heaps. Because bad smells were deeply associated with disease and sinfulness, medieval prevention heavily emphasized sweet odors. Wealthy citizens carried hollow pomanders filled with fragrant spices, held bunches of sweet herbs (posies) to their noses when walking through crowded streets, and burned aromatic incense in their homes.',
      tasks: [
        {
          type: 'written',
          text: 'Explain the connection between miasma theory and medieval attempts to prevent disease.',
          model:
            'Miasma theory claimed that breathing in foul-smelling, corrupt air poisoned the body’s humours and caused epidemics. Consequently, medieval prevention focused on eliminating bad odors and purifying the air by burning incense in homes, lighting bonfires in streets, and carrying pomanders or sweet-smelling posies of herbs to mask bad smells.',
        },
      ],
    },
    {
      act: 4,
      act_title: 'Historical Verdict: Diagnostic Tools—Uroscopy & The Vademecum',
      text:
        '<span class="para-ref">[4.1]</span> Because human dissection was forbidden, how did a university-trained medieval physician actually diagnose internal humoural imbalance? The cornerstone of clinical examination was Uroscopy (the inspection of urine). Physicians collected patient urine in a pear-shaped glass flask called a matula, designed to represent the shape of the human bladder. The doctor carefully examined the color, thickness, sediment, and smell of the sample, sometimes even tasting it, comparing it against a radial chart of 20 distinct urine shades.\n\n' +
        '<span class="para-ref">[4.2]</span> A deep red or golden urine indicated an excess of hot blood or choler; pale, watery white urine indicated an excess of cold phlegm. Doctors carried this chart inside their folding pocket Vademecum handbook alongside the Zodiac Man. While uroscopy involved empirical observation of physical bodily fluids, it completely locked doctors inside Galen’s flawed humoural framework. Because doctors assumed every symptom was caused by humours rather than bacteria or physical organ failure, patient diagnosis remained fundamentally inaccurate.',
      source: {
        id: 'source_b_urine',
        letter: 'B',
        title: 'Source B: Physician Inspecting Urine Flask (Fasciculus Medicinae, 1491)',
        src: '/images/medieval_urine_chart.jpg',
        source: '/images/medieval_urine_chart.jpg',
        image: '/images/medieval_urine_chart.jpg',
        caption:
          'The Medieval Urine Chart: a radial wheel showing twenty flasks of differing colours, which physicians examined, smelled, and sometimes tasted to diagnose humoural imbalance.',
        provenance: 'Johannes de Ketham, Fasciculus Medicinae, Venice, 1491.',
        context:
          'Uroscopy was the primary clinical diagnostic method in the Middle Ages. Physicians examined the color, cloudiness, sediment, and smell of urine in a matula to deduce which humour was corrupted.',
        question:
          'Look at Source B above: Observe the physician holding up a glass matula (urine flask) to inspect the color, sediment, and clarity of the liquid against a radial wheel. How did uroscopy allow medieval doctors to diagnose internal humoural imbalance without performing surgery or human dissection?',
        hinge_question:
          'Look at Source B above: Observe the physician holding up a glass matula (urine flask) to inspect the color, sediment, and clarity of the liquid against a radial wheel. How did uroscopy allow medieval doctors to diagnose internal humoural imbalance without performing surgery or human dissection?',
      },
      tasks: [
        {
          type: 'exam_practice',
          tariff: '[4 marks]',
          question:
            'Explain one way in which ideas about the causes of illness in the Medieval period were similar to ideas about the causes of illness in the Renaissance period.',
          model:
            'One way ideas about the causes of illness were similar was the continued widespread belief in miasma (bad air) as a leading cause of epidemic disease. In the Medieval period, people believed the Black Death of 1348 was caused by corrupt, foul-smelling vapors arising from stagnant swamps, rotting filth, and unburied corpses. Similarly, during the Great Plague of 1665 in the Renaissance, physicians and ordinary citizens still believed that foul odors transmitted the plague, prompting people to smoke tobacco and carry sweet-smelling pomanders to purify the air. Both eras completely lacked Germ Theory, leading people to believe poisonous smells directly produced disease.',
        },
      ],
    },
  ],
  sources: [
    {
      id: 'source_a_humours',
      letter: 'A',
      title: 'Source A: The Four Humours Wheel (Tacuinum Sanitatis, 14th c.)',
      src: '/images/four_humours.jpg',
      source: '/images/four_humours.jpg',
      image: '/images/four_humours.jpg',
      caption:
        'The Four Humours Wheel: Blood (air/hot & wet), Phlegm (water/cold & wet), Yellow Bile (fire/hot & dry), and Black Bile (earth/cold & dry).',
      provenance:
        'Tacuinum Sanitatis manuscript, 14th century, Österreichische Nationalbibliothek, Vienna.',
      context:
        'The Theory of the Four Humours dominated medieval clinical diagnosis. Doctors believed every person had a unique humoural balance dictated by their birth, diet, personality, and age.',
      question:
        'Look at Source A above: Study how each of the four humours (Blood, Phlegm, Yellow Bile, Black Bile) is linked to a season, an element, and specific qualities of heat and moisture. If a patient suffering from a cold and shivering was treated with hot spices and dry foods under Galen’s Theory of Opposites, why did this belief in internal fluid balance prevent medieval physicians from searching for external causes of disease?',
      hinge_question:
        'Look at Source A above: Study how each of the four humours (Blood, Phlegm, Yellow Bile, Black Bile) is linked to a season, an element, and specific qualities of heat and moisture. If a patient suffering from a cold and shivering was treated with hot spices and dry foods under Galen’s Theory of Opposites, why did this belief in internal fluid balance prevent medieval physicians from searching for external causes of disease?',
    },
    {
      id: 'source_b_urine',
      letter: 'B',
      title: 'Source B: Physician Inspecting Urine Flask (Fasciculus Medicinae, 1491)',
      src: '/images/medieval_urine_chart.jpg',
      source: '/images/medieval_urine_chart.jpg',
      image: '/images/medieval_urine_chart.jpg',
      caption:
        'The Medieval Urine Chart: a radial wheel showing twenty flasks of differing colours, which physicians examined, smelled, and sometimes tasted to diagnose humoural imbalance.',
      provenance: 'Johannes de Ketham, Fasciculus Medicinae, Venice, 1491.',
      context:
        'Uroscopy was the primary clinical diagnostic method in the Middle Ages. Physicians examined the color, cloudiness, sediment, and smell of urine in a matula to deduce which humour was corrupted.',
      question:
        'Look at Source B above: Observe the physician holding up a glass matula (urine flask) to inspect the color, sediment, and clarity of the liquid against a radial wheel. How did uroscopy allow medieval doctors to diagnose internal humoural imbalance without performing surgery or human dissection?',
      hinge_question:
        'Look at Source B above: Observe the physician holding up a glass matula (urine flask) to inspect the color, sediment, and clarity of the liquid against a radial wheel. How did uroscopy allow medieval doctors to diagnose internal humoural imbalance without performing surgery or human dissection?',
    },
  ],
  quick_quiz: [
    {
      question:
        'Which ancient Greek physician originally developed the Theory of the Four Humours?',
      options: ['Hippocrates of Kos.', 'Claudius Galen.', 'Aristotle.', 'Alexander the Great.'],
      answer: 'Hippocrates of Kos.',
      explanation:
        'Hippocrates developed the Theory of the Four Humours in ancient Greece to explain disease as natural fluid imbalance.',
    },
    {
      question: 'Which of the four humours was associated with spring, air, and being hot and wet?',
      options: ['Blood.', 'Phlegm.', 'Yellow Bile.', 'Black Bile.'],
      answer: 'Blood.',
      explanation:
        'Blood was produced by the liver and linked with air, spring, and a sanguine (optimistic) temperament.',
    },
    {
      question:
        'How did Galen’s Theory of Opposites suggest treating a patient with cold, wet phlegm?',
      options: [
        'With warm, dry foods like hot peppers or ginger.',
        'With cold cucumbers and cold baths.',
        'With extensive bloodletting.',
        'By drinking large amounts of cold water.',
      ],
      answer: 'With warm, dry foods like hot peppers or ginger.',
      explanation:
        'Under the Theory of Opposites, cold and wet symptoms were counteracted with hot, dry remedies.',
    },
    {
      question: 'What was miasma believed to be in medieval medicine?',
      options: [
        'A poisonous, foul-smelling vapor arising from decaying filth and swamps.',
        'An imbalance between red blood cells and white blood cells.',
        'A microscopic bacterium transmitted by black rat fleas.',
        'A magical curse cast by witches or heretics.',
      ],
      answer: 'A poisonous, foul-smelling vapor arising from decaying filth and swamps.',
      explanation:
        'Miasma was believed to corrupt the atmosphere and unbalance bodily humours upon inhalation.',
    },
    {
      question: 'What was a glass matula used for in medieval clinical diagnosis?',
      options: [
        'Holding patient urine for inspection against colour wheels.',
        'Collecting blood drawn during phlebotomy.',
        'Mixing complex herbal syrups like Theriac.',
        'Distilling alcohol for surgical antiseptics.',
      ],
      answer: 'Holding patient urine for inspection against colour wheels.',
      explanation:
        'The matula was a bladder-shaped glass flask used by physicians during uroscopy.',
    },
    {
      question:
        'What item did wealthy medieval people carry to protect themselves against miasma in crowded streets?',
      options: [
        'A sweet-smelling pomander or posy of herbs.',
        'A portable surgical scalpel.',
        'A bottle of carbolic acid.',
        'A pocket magnifying glass.',
      ],
      answer: 'A sweet-smelling pomander or posy of herbs.',
      explanation:
        'Pomanders and herb posies were held to the nose to mask foul miasmas and purify inspired air.',
    },
    {
      question: 'Why did the Theory of the Four Humours hinder long-term scientific progress?',
      options: [
        'Because doctors assumed disease was internal fluid imbalance, ignoring real physical bacteria and organs.',
        'Because the Theory of Opposites was strictly banned by the Catholic Church.',
        'Because it required doctors to perform thousands of illegal human dissections.',
        'Because ordinary citizens refused to take herbal remedies.',
      ],
      answer:
        'Because doctors assumed disease was internal fluid imbalance, ignoring real physical bacteria and organs.',
      explanation:
        'Humoural theory provided a false but complete explanation that prevented doctors from discovering real anatomical causes.',
    },
    {
      question:
        'What bodily organ did Galen claim was responsible for constantly producing blood from digested food?',
      options: ['The liver.', 'The heart.', 'The lungs.', 'The spleen.'],
      answer: 'The liver.',
      explanation:
        'Galen taught that the liver manufactured blood, which was then consumed as fuel by bodily tissues.',
    },
  ],
  flashcards: [
    {
      q: 'What are the Four Humours?',
      a: 'Blood (hot/wet), Phlegm (cold/wet), Yellow Bile (hot/dry), and Black Bile (cold/dry). Sickness was an internal imbalance of these fluids.',
    },
    {
      q: 'What was Galen’s Theory of Opposites?',
      a: 'A clinical method treating excess humours with contrary qualities (e.g. treating cold, wet phlegm with hot, dry peppers and spices).',
    },
    {
      q: 'What was Miasma Theory?',
      a: 'The belief that poisonous, foul-smelling air from swamps, rotting waste, and corpses poisoned the body’s humours upon inhalation.',
    },
    {
      q: 'What was Uroscopy?',
      a: 'Clinical examination of urine in a glass matula, checking colour, sediment, and smell against a 20-shade chart to diagnose humoural imbalance.',
    },
    {
      q: 'What was a Vademecum?',
      a: 'A physician’s portable handbook containing astrological Zodiac Man charts, calendars, and urine wheels used at the patient’s bedside.',
    },
  ],
  draw_tasks: [
    {
      title: 'Diagram: The Four Humours Cross',
      instruction:
        'Sketch a diagram of the Four Humours cross, labeling Blood, Phlegm, Yellow Bile, and Black Bile alongside their corresponding seasons and qualities.',
    },
  ],
};

// ============================================================================
// 3. LESSON 1.3: Approaches to Prevention & Treatment
// ============================================================================
const lesson_1_3 = {
  id: 'lesson_1_3',
  title: 'KT1.3: Approaches to Prevention & Treatment: Rituals, Bleeding & Purging (c1250–c1500)',
  specification_anchor:
    'Approaches to prevention and treatment: religious and supernatural methods (prayer, fasting, pilgrimages); rational treatments (bloodletting, purging, herbal remedies, regimen sanitatis).',
  enquiry_question:
    'Why did standard medieval medical treatments frequently endanger the lives of the patients they were meant to cure?',
  living_timeline_mission: {
    target_milestones: 'Milestones 1 & 6 (c. 1250 & 1400s)',
    pages: 'Pages 2–3',
    instruction:
      'Turn back to Pages 2–3 (Milestones 1 & 6). In the sketchpad frame, sketch a fleam and bowl used for bloodletting alongside herbal Theriac!',
  },
  timeline_anchor: [
    {
      date: 'c. 1250',
      title: 'Phlebotomy Standardised',
      desc: 'Monasteries and barber-surgeons establish regular seasonal bloodletting schedules to balance humours.',
    },
    {
      date: 'c. 1300',
      title: 'The Cult of Relics & Pilgrimage',
      desc: 'Shrines like Thomas Becket at Canterbury become major centres for religious healing and miraculous cures.',
    },
    {
      date: '1400',
      title: 'The Regimen Sanitatis',
      desc: 'Physicians prescribe personalised lifestyle treatises advising moderation in diet, sleep, and exercise to prevent illness.',
    },
  ],
  delivery_plan: {
    format: '2-Lesson Enquiry Sequence (2x 50 mins) or 100-min Double Period',
    lesson_1: {
      title: 'Lesson 1: Spiritual Healing vs Phlebotomy (50 mins)',
      phases: [
        {
          time: '00–10m',
          label: 'Hook & Spaced Retrieval',
          instruction:
            'Complete Do Now recall on Four Humours. Display Source A (Phlebotomy Manuscript). Contrast religious prayer with surgical bloodletting.',
        },
        {
          time: '10–30m',
          label: 'Modelled Shared Reading & Discussion',
          instruction:
            'Read Acts 1 & 2 with paragraph signposting ([1.1] to [2.2]). Deconstruct the 3 phlebotomy methods (fleam, cupping, leeches) and why bloodletting weakened sick patients.',
        },
        {
          time: '30–45m',
          label: 'Analytical Assessment Ledger',
          instruction:
            'Complete Disciplinary Vocabulary Distinction (Symptomatic Balancing vs Antimicrobial Cure) and annotate the phlebotomy diagram.',
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
      title: 'Lesson 2: Purging, Herbal Remedies & Exam Mastery (50 mins)',
      phases: [
        {
          time: '00–10m',
          label: 'Retrieval & Visual Forensic Inspection',
          instruction:
            'Inspect Galen’s portrait (Source B). Discuss how the Theory of Opposites drove apothecaries to compound Theriac with 60+ ingredients.',
        },
        {
          time: '10–25m',
          label: 'Deconstruct Acts 3 & 4 (Purging & Regimen Sanitatis)',
          instruction:
            'Examine violent laxatives, emetics, and the Regimen Sanitatis as daily preventative duty.',
        },
        {
          time: '25–45m',
          label: 'Deliberate Exam Practice (12m)',
          instruction:
            'Complete Question 4 Explain Why: Explain why medical treatments changed very little during the Middle Ages (c1250–c1500) [12m].',
        },
        {
          time: '45–50m',
          label: 'Self-Assessment & D.I.R.T.',
          instruction:
            'Pupils self-assess against the PEEL structure strip and vocabulary bank, logging scores on the back cover.',
        },
      ],
    },
  },
  teacher_notes: {
    primer:
      'The overarching pedagogical goal of this lesson is to help pupils understand why medieval treatments—such as bloodletting and purging—persisted for centuries despite killing patients. Because people believed humours had to be physically drained to lower heat, these debilitating treatments were viewed as medically essential.',
    objectives: [
      {
        objective: 'Analyse religious and supernatural methods of healing and prevention.',
        primer:
          'Direct pupils to paragraph [1.1]. Emphasise pilgrimages, relics, fasting, and confession as genuine frontline treatments.',
        question:
          'Why did sick medieval people travel hundreds of miles to touch holy relics at Canterbury instead of visiting a doctor?',
      },
      {
        objective: 'Explain rational humoural treatments: phlebotomy, purging, and herbal Theriac.',
        primer:
          'Focus on paragraphs [2.1] and [3.1]. Explain the three methods of bloodletting (vein cutting, cupping, leeches) and the composition of Theriac.',
        question:
          'Why did bloodletting and violent purging frequently cause the death of already weakened patients?',
      },
    ],
  },
  do_now: {
    type: 'questions',
    title: 'Spaced Retrieval Do Now: Humours & Diagnosis',
    instructions:
      'Answer the four recall questions below from memory to test your knowledge of Lesson 1.2.',
    items: [
      {
        question: 'What Greek physician originally created the Theory of the Four Humours?',
        answer: 'Hippocrates of Kos',
        options: ['Hippocrates of Kos', 'Claudius Galen', 'Roger Bacon', 'Thomas Sydenham'],
      },
      {
        question: 'Under Galen’s Theory of Opposites, how would a feverish patient be treated?',
        answer: 'With cold cucumber, cold baths, and bloodletting.',
        options: [
          'With cold cucumber, cold baths, and bloodletting.',
          'With hot chilli peppers and hot wine.',
          'With heavy wool blankets near a fire.',
          'With animalcules and microscopic antibiotics.',
        ],
      },
      {
        question: 'What did physicians examine in a glass matula to deduce humoural balance?',
        answer: 'Patient urine against a 20-shade colour wheel.',
        options: [
          'Patient urine against a 20-shade colour wheel.',
          'Tissue cells under a microscope.',
          'Blood platelets and white cells.',
          'Stomach bacteria cultures.',
        ],
      },
      {
        question: 'What did people believe corrupt miasma did upon inhalation?',
        answer: 'It directly poisoned the blood and corrupted internal humours.',
        options: [
          'It directly poisoned the blood and corrupted internal humours.',
          'It caused lungs to produce excess yellow bile.',
          'It cured smallpox and fevers.',
          'It balanced phlegm and choler naturally.',
        ],
      },
    ],
  },
  narrative_blocks: [
    {
      act: 1,
      act_title: 'Context: Spiritual Healing & Religious Penitence',
      text:
        '<span class="para-ref">[1.1]</span> Because illness was widely regarded as God’s punishment for sin, the first and most urgent response to sickness was spiritual. Sufferers were instructed to confess their sins to a parish priest and pray for divine forgiveness. The Church taught that without spiritual cleansing, physical treatments were entirely useless. Wealthy families paid for chanting monks to sing special intercessory Masses, while ordinary people fasted, gave alms to the poor, and lit votive candles before images of healing saints.\n\n' +
        '<span class="para-ref">[1.2]</span> Pilgrimages were among the most popular therapeutic actions in medieval England. Sick pilgrims walked hundreds of miles to shrines containing holy relics—such as the tomb of Saint Thomas Becket at Canterbury Cathedral, or the shrine of Our Lady at Walsingham. Sufferers touched reliquaries containing saints’ bones, drank holy water, or purchased lead pilgrim badges as talismans. Miraculous cures reported at shrines reinforced the belief that divine intervention was far more powerful than physical medicine.',
      tasks: [
        {
          type: 'written',
          text: 'Using paragraphs [1.1]–[1.2], explain why religious rituals were considered frontline medical treatments.',
          model:
            'Religious rituals were considered frontline treatments because people believed God directly sent illness as a punishment for sin. Without confessing sins, fasting, praying, or visiting holy shrines to touch saints’ relics (such as Thomas Becket at Canterbury), people believed physical treatments would fail to appease God’s wrath.',
        },
      ],
    },
    {
      act: 2,
      act_title: 'Escalation: Phlebotomy—The Universal Humoural Treatment',
      text:
        '<span class="para-ref">[2.1]</span> When physical treatments were administered, the most common and revered procedure was Phlebotomy (bloodletting). Based upon Galen’s belief that blood was the dominant, warmest humour and the primary cause of fevers, physicians ordered regular bloodletting to lower internal bodily heat and restore equilibrium. Phlebotomy was so routine that monasteries set aside specific "bleeding weeks" several times a year where all monks were bled for preventative maintenance.\n\n' +
        '<span class="para-ref">[2.2]</span> Phlebotomy was performed using three distinct surgical techniques. The most common was vein-opening using a sharp, double-edged lancet called a fleam, collecting up to a pint of blood in a marked pewter bowl. Alternatively, for localized inflammation, practitioners used Cupping: heating a glass cup over a flame and placing it over scratched skin, creating a vacuum that drew blood to the surface. Finally, Leeching was utilized for delicate areas like the face or piles; medicinal leeches were placed on the skin to engorge themselves on blood. While intended to heal, excessive bloodletting drastically lowered blood pressure, induced fainting, and frequently caused fatal hypovolemic shock in weakened patients.',
      source: {
        id: 'source_a_bleeding',
        letter: 'A',
        title: 'Source A: Phlebotomy / Bloodletting Manuscript (MS Sloane 1977, c.1300)',
        src: '/images/bloodletting.jpg',
        source: '/images/bloodletting.jpg',
        image: '/images/bloodletting.jpg',
        caption:
          'A medieval physician opening a vein in the arm using a fleam while blood drains into a bowl, supervised by an attendant.',
        provenance: 'British Library MS Sloane 1977, England, c.1300.',
        context:
          'Bloodletting was the most universal surgical intervention in medieval Europe, performed by both physicians and barber-surgeons to balance humours.',
        question:
          'Look at Source A above: Study the physician using a fleam (blade) to open a vein and collect blood in a bowl. Why did medieval people believe that releasing blood was an essential way to restore balance to the body and prevent fevers, even though it frequently weakened the patient?',
        hinge_question:
          'Look at Source A above: Study the physician using a fleam (blade) to open a vein and collect blood in a bowl. Why did medieval people believe that releasing blood was an essential way to restore balance to the body and prevent fevers, even though it frequently weakened the patient?',
      },
    },
    {
      act: 3,
      act_title: 'Forensic Evidence: Purging, Emetics & Herbal Theriac',
      text:
        '<span class="para-ref">[3.1]</span> If bloodletting failed to rebalance the humours, physicians turned to Purging to evacuate corrupted digestive fluids. The digestive system was viewed as an internal furnace; if food putrefied, it generated toxic yellow and black bile. Doctors administered powerful emetics containing antimony or dried crushed beetles to induce violent vomiting. Alternatively, strong herbal laxatives made from scammony, senna, and hellebore were given to cause explosive diarrhoea, or clysters (enemas) were pumped into the rectum using pigs’ bladders and reeds.\n\n' +
        '<span class="para-ref">[3.2]</span> Herbal medicine was the primary pharmaceutical therapy. Apothecaries mixed complex syrups, electuaries, and ointments using local herbs (mint, sage, chamomile, garlic) and expensive imported spices (cinnamon, cloves, pepper). The most famous universal cure-all was Theriac (treacle), an ancient compound containing over 60 ingredients, including crushed viper flesh, opium, and honey. Prescribed for poisons, fevers, and bites, Theriac was so trusted that physicians believed it could neutralize any humoural toxin.',
      source: {
        id: 'source_b_galen',
        letter: 'B',
        title: 'Source B: Portrait of Claudius Galen (Engraving)',
        src: '/images/galen_portrait.jpg',
        source: '/images/galen_portrait.jpg',
        image: '/images/galen_portrait.jpg',
        caption:
          'Claudius Galen (AD 129–c. 216), whose clinical treatises on the Theory of Opposites, phlebotomy, and purging dominated European medicine for 1,400 years.',
        provenance: 'Historical engraving after ancient Roman busts of Galen.',
        context:
          'Galen’s treatises on therapeutics dictated that doctors must actively expel corrupt humours through bleeding, sweating, and purging.',
        question:
          'Look at Source B above: Galen taught that the humours must be kept in constant equilibrium through balancing treatments. Why did his authoritative treatises lead doctors to prescribe violent purging (emetics and laxatives) alongside herbal compounds like Theriac, rather than searching for specific remedies for individual illnesses?',
        hinge_question:
          'Look at Source B above: Galen taught that the humours must be kept in constant equilibrium through balancing treatments. Why did his authoritative treatises lead doctors to prescribe violent purging (emetics and laxatives) alongside herbal compounds like Theriac, rather than searching for specific remedies for individual illnesses?',
      },
    },
    {
      act: 4,
      act_title: 'Historical Verdict: Prevention & The Regimen Sanitatis',
      text:
        '<span class="para-ref">[4.1]</span> Prevention was viewed as far superior to cure. In medieval thinking, maintaining personal health was a moral and physical duty. Wealthy nobles and high-ranking clerics commissioned custom copies of the Regimen Sanitatis (Rule of Health), a lifestyle guide originating from the medical school of Salerno. The guide advised daily moderation across six essential factors: air quality, exercise, diet, sleep, bowel evacuations, and emotional control.\n\n' +
        '<span class="para-ref">[4.2]</span> People were instructed to bathe regularly in warm herbal infusions, avoid damp night mists, sleep with windows shuttered against miasma, and eat foods tailored to their humoural complexion (e.g. moist fish for hot personalities). While these hygiene measures promoted general wellbeing, they provided zero protection against deadly bacterial infections like the plague. Because medieval treatments were based on balancing imaginary humours through aggressive bleeding and purging, medical care often hastened the death of the sick.',
      tasks: [
        {
          type: 'exam_practice',
          tariff: '[12 marks]',
          question:
            'Explain why approaches to medical treatment changed very little during the Middle Ages (c1250–c1500).',
          stimulus: ['The Theory of Opposites', 'Bloodletting'],
          model:
            'One major reason why medical treatments changed very little during the Middle Ages was the overwhelming authority of Galen’s Theory of Opposites. Medieval physicians were trained at universities where Galen’s treatises were taught as infallible truth. Under Galen’s system, disease was treated by applying opposite qualities to balance excess humours. Consequently, treatments were rigidly standardized: cold phlegmatic chills were treated with hot spices, and hot fevers were treated with bloodletting and cool cucumbers. Because physicians believed this system provided a complete and logical explanation for all illnesses, there was no perceived need to experiment with new treatments.\n\n' +
            'Furthermore, the practice of bloodletting (phlebotomy) was deeply entrenched in medieval culture and backed by the Catholic Church. Both university physicians and guild-trained barber-surgeons performed bloodletting using fleams, cupping glasses, and leeches. Because people observed blood draining out and patients cooling down, they genuinely believed the bad humours were being removed, even though patients were simply fainting from blood loss. Religious customaries even required regular bleeding for monks in monasteries. Because bloodletting seemed to produce a physical result that matched Galen’s teachings, it remained unchallenged throughout the period.\n\n' +
            'Finally, the lack of scientific instruments and understanding of chemistry prevented the development of new treatments. Without microscopes, doctors had no knowledge of bacteria or viruses; they could only treat visible symptoms using traditional herbal mixtures like Theriac (containing 60+ ingredients). Because the Church controlled education and banned any questioning of ancient texts, physicians focused on memorising traditional herbal recipes and classical Latin treatises rather than conducting chemical or clinical trials. Consequently, treatments remained virtually identical from 1250 to 1500.',
        },
      ],
    },
  ],
  sources: [
    {
      id: 'source_a_bleeding',
      letter: 'A',
      title: 'Source A: Phlebotomy / Bloodletting Manuscript (MS Sloane 1977, c.1300)',
      src: '/images/bloodletting.jpg',
      source: '/images/bloodletting.jpg',
      image: '/images/bloodletting.jpg',
      caption:
        'A medieval physician opening a vein in the arm using a fleam while blood drains into a bowl, supervised by an attendant.',
      provenance: 'British Library MS Sloane 1977, England, c.1300.',
      context:
        'Bloodletting was the most universal surgical intervention in medieval Europe, performed by both physicians and barber-surgeons to balance humours.',
      question:
        'Look at Source A above: Study the physician using a fleam (blade) to open a vein and collect blood in a bowl. Why did medieval people believe that releasing blood was an essential way to restore balance to the body and prevent fevers, even though it frequently weakened the patient?',
      hinge_question:
        'Look at Source A above: Study the physician using a fleam (blade) to open a vein and collect blood in a bowl. Why did medieval people believe that releasing blood was an essential way to restore balance to the body and prevent fevers, even though it frequently weakened the patient?',
    },
    {
      id: 'source_b_galen',
      letter: 'B',
      title: 'Source B: Portrait of Claudius Galen (Engraving)',
      src: '/images/galen_portrait.jpg',
      source: '/images/galen_portrait.jpg',
      image: '/images/galen_portrait.jpg',
      caption:
        'Claudius Galen (AD 129–c. 216), whose clinical treatises on the Theory of Opposites, phlebotomy, and purging dominated European medicine for 1,400 years.',
      provenance: 'Historical engraving after ancient Roman busts of Galen.',
      context:
        'Galen’s treatises on therapeutics dictated that doctors must actively expel corrupt humours through bleeding, sweating, and purging.',
      question:
        'Look at Source B above: Galen taught that the humours must be kept in constant equilibrium through balancing treatments. Why did his authoritative treatises lead doctors to prescribe violent purging (emetics and laxatives) alongside herbal compounds like Theriac, rather than searching for specific remedies for individual illnesses?',
      hinge_question:
        'Look at Source B above: Galen taught that the humours must be kept in constant equilibrium through balancing treatments. Why did his authoritative treatises lead doctors to prescribe violent purging (emetics and laxatives) alongside herbal compounds like Theriac, rather than searching for specific remedies for individual illnesses?',
    },
  ],
  quick_quiz: [
    {
      question:
        'What was the most common surgical treatment performed in medieval England to restore humoural balance?',
      options: [
        'Phlebotomy (bloodletting).',
        'Antiseptic wound washing.',
        'Appendectomy.',
        'Inoculation.',
      ],
      answer: 'Phlebotomy (bloodletting).',
      explanation:
        'Bloodletting was used to lower internal body temperature and remove excess hot blood.',
    },
    {
      question: 'Which instrument was commonly used to open a patient’s vein during bloodletting?',
      options: [
        'A fleam or lancet blade.',
        'A trephine drill.',
        'A hypodermic syringe.',
        'A cautery iron.',
      ],
      answer: 'A fleam or lancet blade.',
      explanation:
        'A fleam was a small, sharp surgical knife pressed into a surface vein to drain blood.',
    },
    {
      question: 'What method of bloodletting involved creating a warm vacuum over scratched skin?',
      options: ['Cupping.', 'Leeching.', 'Cauterisation.', 'Amputation.'],
      answer: 'Cupping.',
      explanation:
        'Heated glass cups placed over scratched skin created a vacuum suction that drew blood.',
    },
    {
      question: 'What was Theriac in medieval medicine?',
      options: [
        'A complex universal herbal remedy containing over 60 ingredients, including crushed viper flesh.',
        'An antiseptic solution made of wine and vinegar.',
        'A chemical compound of mercury and sulphur.',
        'A holy oil blessed by the Pope for dying patients.',
      ],
      answer:
        'A complex universal herbal remedy containing over 60 ingredients, including crushed viper flesh.',
      explanation:
        'Theriac was a famous ancient electuary believed to cure poisons, bites, and fevers.',
    },
    {
      question: 'Why did physicians prescribe emetics and violent laxatives to patients?',
      options: [
        'To purge and evacuate corrupt humours like yellow and black bile from the digestive system.',
        'To clean dental cavities and cure toothaches.',
        'To test whether the patient was possessed by evil spirits.',
        'To prepare the patient for immediate amputation.',
      ],
      answer:
        'To purge and evacuate corrupt humours like yellow and black bile from the digestive system.',
      explanation: 'Purging was used to clear toxic humours from the stomach and bowels.',
    },
    {
      question: 'What was the Regimen Sanitatis?',
      options: [
        'A personalized lifestyle guide advising moderation in diet, sleep, exercise, and baths.',
        'A royal statute banning foreign doctors from practicing in London.',
        'A monastic rule forbidding monks from leaving monastery grounds.',
        'A Latin text describing how to perform battlefield amputations.',
      ],
      answer:
        'A personalized lifestyle guide advising moderation in diet, sleep, exercise, and baths.',
      explanation:
        'The Regimen Sanitatis outlined the rules of daily hygiene and humoural moderation.',
    },
    {
      question: 'Why did routine bloodletting and purging often result in patient death?',
      options: [
        'They caused severe blood loss, dehydration, and weakened immune defenses in already sick patients.',
        'The instruments were secretly poisoned by barber-surgeons.',
        'Patients refused to eat any food for three weeks following treatment.',
        'Church law prohibited patients from sleeping after being bled.',
      ],
      answer:
        'They caused severe blood loss, dehydration, and weakened immune defenses in already sick patients.',
      explanation:
        'Draining blood and inducing severe diarrhoea physically exhausted weakened bodies.',
    },
    {
      question:
        'What religious practice did sick people perform at shrines like Thomas Becket at Canterbury?',
      options: [
        'Touching holy relics and praying for miraculous healing.',
        'Receiving university medical degrees.',
        'Purchasing licensed apothecary drugs.',
        'Undergoing human dissection.',
      ],
      answer: 'Touching holy relics and praying for miraculous healing.',
      explanation:
        'Pilgrims traveled to shrines to touch sacred relics and seek divine intervention.',
    },
  ],
  flashcards: [
    {
      q: 'What was Phlebotomy?',
      a: 'The practice of bloodletting using fleams, cupping glasses, or medicinal leeches to lower internal bodily heat and restore humoural balance.',
    },
    {
      q: 'What were the three methods of bloodletting?',
      a: '1. Vein-opening with a fleam; 2. Cupping (heated glass vacuum); 3. Leeching (medicinal leeches drawing blood).',
    },
    {
      q: 'What was Purging?',
      a: 'Using emetics (inducing vomiting) and strong laxatives (scammony, hellebore) or clysters (enemas) to clear corrupt humours from the digestive tract.',
    },
    {
      q: 'What was Theriac?',
      a: 'A complex, expensive herbal electuary of 60+ ingredients (including viper flesh and opium) used as a universal cure-all.',
    },
    {
      q: 'What was the Regimen Sanitatis?',
      a: 'A personalized lifestyle handbook advising moderation in diet, exercise, sleep, and bathing to maintain humoural balance.',
    },
  ],
  draw_tasks: [
    {
      title: 'Diagram: Medieval Phlebotomy Tools',
      instruction:
        'Sketch the tools used during bloodletting: a lancet fleam, a cupping glass over a flame, and a medicinal leech in a jar.',
    },
  ],
};

// ============================================================================
// 4. LESSON 1.4: Medical Care Providers & Monastic Hospitals
// ============================================================================
const lesson_1_4 = {
  id: 'lesson_1_4',
  title: 'KT1.4: Medical Care Providers & Monastic Hospitals: ‘Care Not Cure’ (c1250–c1500)',
  specification_anchor:
    'The roles of the physician, apothecary and barber surgeon; care in the home; the role of medieval hospitals.',
  enquiry_question:
    'How did social hierarchy and the Catholic Church shape who provided medical care in medieval England?',
  living_timeline_mission: {
    target_milestones: 'Milestones 6 (1400s)',
    pages: 'Pages 2–3',
    instruction:
      "Turn back to Pages 2–3 (Milestone 6). In the sketchpad frame, sketch a monastic hospital ward facing a chapel altar and annotate: 'Hospitality and prayer, not medical cure!'",
  },
  timeline_anchor: [
    {
      date: '1123',
      title: 'Foundation of St Bartholomew’s Hospital',
      desc: 'Founded in London by Rahere, providing monastic hospitality, clean beds, and daily prayer for the poor.',
    },
    {
      date: '1215',
      title: 'Fourth Lateran Council',
      desc: 'Pope Innocent III forbids Catholic priests and monks from shedding blood, forcing surgery entirely into the hands of secular barber-surgeons.',
    },
    {
      date: '1368',
      title: 'Guild of Surgeons Founded in London',
      desc: 'Master surgeons separate from barber-surgeons, establishing apprenticeships to regulate surgical standards and wound treatment.',
    },
  ],
  delivery_plan: {
    format: '2-Lesson Enquiry Sequence (2x 50 mins) or 100-min Double Period',
    lesson_1: {
      title: 'Lesson 1: The Social Hierarchy of Healers (50 mins)',
      phases: [
        {
          time: '00–10m',
          label: 'Hook & Spaced Retrieval',
          instruction:
            'Complete Do Now recall on bloodletting. Display Source A (Surgeon suturing head wound). Contrast university physicians with manual barber-surgeons.',
        },
        {
          time: '10–30m',
          label: 'Modelled Shared Reading & Discussion',
          instruction:
            'Read Acts 1 & 2 with paragraph signposting ([1.1] to [2.2]). Deconstruct the roles of physicians (theory, Latin, uroscopy) vs barber-surgeons (manual surgery, pulling teeth).',
        },
        {
          time: '30–45m',
          label: 'Analytical Assessment Ledger',
          instruction:
            'Complete Disciplinary Vocabulary Distinction (Academic Scholasticism vs Guild Apprenticeship).',
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
      title: 'Lesson 2: Monastic Hospitals & Exam Mastery (50 mins)',
      phases: [
        {
          time: '00–10m',
          label: 'Retrieval & Visual Forensic Inspection',
          instruction:
            'Inspect Source B (Hôtel-Dieu Hospital Ward). Discuss why beds faced an altar and why infectious patients were excluded.',
        },
        {
          time: '10–25m',
          label: 'Deconstruct Acts 3 & 4 (Monastic Care vs Modern Cure)',
          instruction:
            'Emphasise the golden rule: "Hospitality and prayer for the soul, not medical cure." Examine the exclusion of lepers to Lazar houses.',
        },
        {
          time: '25–45m',
          label: 'Deliberate Exam Practice (4m / 12m)',
          instruction:
            'Complete Question 3 Difference: Explain one way in which medieval hospital care differed from hospital care in the 18th or 19th century [4m].',
        },
        {
          time: '45–50m',
          label: 'Self-Assessment & D.I.R.T.',
          instruction:
            'Pupils peer-assess their 4-mark comparison against the PEEL model answer and record marks on the back cover.',
        },
      ],
    },
  },
  teacher_notes: {
    primer:
      'The overarching pedagogical goal of this lesson is to eliminate the common GCSE misconception that medieval hospitals were medical treatment centers. By exploring the religious nature of monastic care, pupils understand that hospitals provided shelter, warmth, and prayer ("care not cure"), while surgical and medical treatments were carried out by barber-surgeons, apothecaries, and wise women in the home.',
    objectives: [
      {
        objective:
          'Distinguish between the roles, training, and status of medieval healthcare providers.',
        primer:
          'Focus on paragraphs [1.1] and [2.1]. Emphasise that university physicians studied Latin theory for 7–10 years and rarely touched patients, while barber-surgeons performed physical surgery.',
        question:
          'Why were university-trained physicians regarded as higher in social status than barber-surgeons, despite barber-surgeons performing all physical operations?',
      },
      {
        objective: 'Analyse the role of medieval monastic hospitals (‘care not cure’).',
        primer:
          'Direct pupils to paragraphs [3.1] and [4.1]. Highlight that hospitals were run by monks and nuns to offer hospitality and pray for souls, excluding infectious patients.',
        question:
          'Why did medieval hospitals have chapels and altars at the end of their wards instead of surgical operating rooms?',
      },
    ],
  },
  do_now: {
    type: 'questions',
    title: 'Spaced Retrieval Do Now: Treatments & Theory',
    instructions:
      'Answer the four recall questions below based on your prior learning in Lesson 1.3.',
    items: [
      {
        question: 'What surgical treatment involved opening a vein with a fleam or using leeches?',
        answer: 'Phlebotomy (bloodletting).',
        options: ['Phlebotomy (bloodletting).', 'Uroscopy.', 'Cauterisation.', 'Inoculation.'],
      },
      {
        question:
          'What famous herbal cure-all contained over 60 ingredients including crushed viper flesh?',
        answer: 'Theriac.',
        options: ['Theriac.', 'Penicillin.', 'Cinchona bark.', 'Laudanum.'],
      },
      {
        question:
          'Under Galen’s Theory of Opposites, why were emetics administered to feverish patients?',
        answer: 'To purge excess corrupt yellow bile from the stomach.',
        options: [
          'To purge excess corrupt yellow bile from the stomach.',
          'To lower blood pressure directly in the brain.',
          'To disinfect surgical incisions.',
          'To test if the patient had asthma.',
        ],
      },
      {
        question:
          'What lifestyle handbook advised nobles on diet, sleep, and exercise to prevent illness?',
        answer: 'The Regimen Sanitatis.',
        options: ['The Regimen Sanitatis.', 'The Vademecum.', 'The Articella.', 'De Fabrica.'],
      },
    ],
  },
  narrative_blocks: [
    {
      act: 1,
      act_title: 'Context: The Elite University Physician',
      text:
        '<span class="para-ref">[1.1]</span> In medieval England, access to healthcare was strictly dictated by wealth and social status. At the pinnacle of the medical hierarchy was the university-trained Physician (Medicus). Physicians studied for 7 to 10 years at ecclesiastical universities such as Oxford, Cambridge, Paris, or Bologna. Their training was entirely theoretical and literary; students memorised classical Latin translations of Galen, Hippocrates, and Islamic scholars like Avicenna and Rhazes. Physical contact with living sick people was almost non-existent during their degrees.\n\n' +
        '<span class="para-ref">[1.2]</span> Because training was lengthy and expensive, university physicians were exceedingly rare—it is estimated there were fewer than 100 fully qualified physicians in England before 1350. They were retained almost exclusively by royalty, wealthy aristocrats, and bishoprics. When treating a patient, the physician did not dress wounds or dispense medicine; he examined the urine flask (matula), took the pulse, consulted astrological charts, and wrote a Latin prescription dictating which humours required bleeding or purging.',
      tasks: [
        {
          type: 'written',
          text: 'Using paragraphs [1.1]–[1.2], explain why ordinary medieval people rarely saw a university-trained physician.',
          model:
            'Ordinary people rarely saw a university physician because they were extremely rare (fewer than 100 in England) and charged prohibitively high fees. Their training took 7 to 10 years at elite universities studying Latin texts, meaning they were affordable only to wealthy nobles, royalty, and high-ranking clergy.',
        },
      ],
    },
    {
      act: 2,
      act_title: 'Escalation: Barber-Surgeons, Apothecaries & Domestic Healers',
      text:
        '<span class="para-ref">[2.1]</span> For the vast majority of ordinary citizens, healthcare was delivered by craftsmen rather than university scholars. Practical, manual procedures were performed by Barber-Surgeons. Barber-surgeons were guild-trained through manual apprenticeships. Armed with razors, fleams, probes, and bone-saws, they pulled teeth, stitched lacerations, set broken limbs, lanced boils, and performed bloodletting. Because they worked with their hands and shed blood, university physicians regarded them with social contempt, viewing them as uneducated tradesmen.\n\n' +
        '<span class="para-ref">[2.2]</span> Meanwhile, medicines were formulated by Apothecaries. Organized in merchant guilds, apothecaries mixed herbal compounds, ointments, and syrups, stocking both domestic English herbs and imported spices. Finally, the true frontline of medieval healthcare was Care in the Home, provided by women, mothers, and local "wise women." Women brewed herbal teas, dressed minor wounds, and served as village midwives. Wise women possessed generations of inherited folklore regarding local medicinal plants, offering cheap, accessible relief to peasant communities.',
      source: {
        id: 'source_a_surgeon',
        letter: 'A',
        title: 'Source A: Medieval Surgeon Suturing a Head Wound (14th c.)',
        src: '/images/medieval_barber_surgeon.jpg',
        source: '/images/medieval_barber_surgeon.jpg',
        image: '/images/medieval_barber_surgeon.jpg',
        caption:
          'A guild-trained surgeon physically stitching a patient’s severe head wound with needle and thread, recorded in a 14th-century Latin surgical treatise.',
        provenance: 'Wellcome Collection MS L0037333, 14th century surgical treatise.',
        context:
          'Surgeons learned their craft through apprenticeships rather than universities. They performed physical operations without anesthetics or antiseptics, relying on wine to clean wounds and cautery irons to stop bleeding.',
        question:
          'Look at Source A above: Observe the surgeon physically stitching a wound without any antiseptics or anaesthetics. Why were barber-surgeons considered socially inferior to university-trained physicians in the Middle Ages, despite being the only practitioners performing practical, hands-on treatment?',
        hinge_question:
          'Look at Source A above: Observe the surgeon physically stitching a wound without any antiseptics or anaesthetics. Why were barber-surgeons considered socially inferior to university-trained physicians in the Middle Ages, despite being the only practitioners performing practical, hands-on treatment?',
      },
    },
    {
      act: 3,
      act_title: 'Forensic Evidence: The Medieval Monastic Hospital',
      text:
        '<span class="para-ref">[3.1]</span> Between 1100 and 1500, over 1,200 hospitals were established across England. However, a medieval hospital was fundamentally different from a modern medical center. The English word "hospital" derived from the Latin hospitalitas (hospitality). Hospitals were religious charitable foundations funded by royal endowments or wealthy benefactors seeking to reduce their time in Purgatory. They were operated entirely by Catholic religious orders—monks, canons, and Augustinian nuns—not by doctors.\n\n' +
        '<span class="para-ref">[3.2]</span> Famous foundations like St Bartholomew’s (founded in London in 1123 by Rahere) and St Thomas’s housed travelers, the elderly, and the impoverished sick. The central ethos was "Care Not Cure." Patients were washed, provided with clean bedding, warmed by large open hearths, fed nourishing broths and ale, and comforted through continuous prayer. However, no medical treatment, surgery, or pharmacological cure was attempted. Wards were laid out like church chapels, with beds arranged in rows pointing toward a high altar so that bedridden patients could witness the elevation of the Host during Mass and pray for their salvation.',
      source: {
        id: 'source_b_hospital',
        letter: 'B',
        title: 'Source B: Hôtel-Dieu Hospital Ward (Livre de Vie Active, c.1482)',
        src: '/images/hotel_dieu_hospital.jpg',
        source: '/images/hotel_dieu_hospital.jpg',
        image: '/images/hotel_dieu_hospital.jpg',
        caption:
          'The main ward of the Hôtel-Dieu in Paris: Augustinian nuns tending to rows of patients sharing beds, providing spiritual comfort and rest.',
        provenance:
          "Livre de Vie Active des Religieuses de l'Hôtel-Dieu de Paris, Jean Henry, c.1482.",
        context:
          'Medieval hospitals were religious houses dedicated to Christian charity. Patients shared beds, were fed nourishing food, and received spiritual absolution.',
        question:
          'Look at Source B above: Look at the nuns tending to patients in the ward, with an altar visible in the background. Why was the primary purpose of a medieval hospital hospitality and salvation rather than medical cure, and why were infectious patients strictly excluded?',
        hinge_question:
          'Look at Source B above: Look at the nuns tending to patients in the ward, with an altar visible in the background. Why was the primary purpose of a medieval hospital hospitality and salvation rather than medical cure, and why were infectious patients strictly excluded?',
      },
    },
    {
      act: 4,
      act_title: 'Historical Verdict: Strict Exclusion & The Lazar House',
      text:
        '<span class="para-ref">[4.1]</span> Because the primary goal of monastic hospitals was peace, prayer, and hospitality, they strictly enforced entrance criteria. Hospital regulations explicitly barred patients suffering from contagious infectious illnesses, leprosy, or mental insanity, as well as pregnant women. Authorities feared that infectious sufferers would disrupt monastic prayers and contaminate the spiritual purity of the house.\n\n' +
        '<span class="para-ref">[4.2]</span> Instead, infectious diseases were segregated outside urban centers. Sufferers of leprosy were consigned to Lazar Houses (leprosaria), such as St Giles in London or Sherburn Hospital in Durham. In summary, medieval institutional care offered immense Christian charity, shelter, and spiritual solace to the poor, but contributed nothing to anatomical research or clinical cures. Effective medical treatment remained absent from the medieval hospital.',
      tasks: [
        {
          type: 'exam_practice',
          tariff: '[4 marks]',
          question:
            'Explain one way in which hospital care in the Medieval period (c1250–c1500) was different from hospital care in the 18th or 19th century.',
          model:
            'One way hospital care in the Medieval period was different was that its primary purpose was religious hospitality and spiritual comfort ("care not cure"), rather than active medical treatment or scientific cure. In the Medieval period, hospitals were run by Catholic monks and nuns who washed patients, provided warm beds, and held regular church services facing a chapel altar, but no trained doctors worked there and infectious patients were turned away. In contrast, in the 18th and 19th centuries, hospitals became medical institutions funded by voluntary donations where university-trained physicians and surgeons diagnosed illnesses, performed surgeries, and trained medical students.',
        },
      ],
    },
  ],
  sources: [
    {
      id: 'source_a_surgeon',
      letter: 'A',
      title: 'Source A: Medieval Surgeon Suturing a Head Wound (14th c.)',
      src: '/images/medieval_barber_surgeon.jpg',
      source: '/images/medieval_barber_surgeon.jpg',
      image: '/images/medieval_barber_surgeon.jpg',
      caption:
        'A guild-trained surgeon physically stitching a patient’s severe head wound with needle and thread, recorded in a 14th-century Latin surgical treatise.',
      provenance: 'Wellcome Collection MS L0037333, 14th century surgical treatise.',
      context:
        'Surgeons learned their craft through apprenticeships rather than universities. They performed physical operations without anesthetics or antiseptics, relying on wine to clean wounds and cautery irons to stop bleeding.',
      question:
        'Look at Source A above: Observe the surgeon physically stitching a wound without any antiseptics or anaesthetics. Why were barber-surgeons considered socially inferior to university-trained physicians in the Middle Ages, despite being the only practitioners performing practical, hands-on treatment?',
      hinge_question:
        'Look at Source A above: Observe the surgeon physically stitching a wound without any antiseptics or anaesthetics. Why were barber-surgeons considered socially inferior to university-trained physicians in the Middle Ages, despite being the only practitioners performing practical, hands-on treatment?',
    },
    {
      id: 'source_b_hospital',
      letter: 'B',
      title: 'Source B: Hôtel-Dieu Hospital Ward (Livre de Vie Active, c.1482)',
      src: '/images/hotel_dieu_hospital.jpg',
      source: '/images/hotel_dieu_hospital.jpg',
      image: '/images/hotel_dieu_hospital.jpg',
      caption:
        'The main ward of the Hôtel-Dieu in Paris: Augustinian nuns tending to rows of patients sharing beds, providing spiritual comfort and rest.',
      provenance:
        "Livre de Vie Active des Religieuses de l'Hôtel-Dieu de Paris, Jean Henry, c.1482.",
      context:
        'Medieval hospitals were religious houses dedicated to Christian charity. Patients shared beds, were fed nourishing food, and received spiritual absolution.',
      question:
        'Look at Source B above: Look at the nuns tending to patients in the ward, with an altar visible in the background. Why was the primary purpose of a medieval hospital hospitality and salvation rather than medical cure, and why were infectious patients strictly excluded?',
      hinge_question:
        'Look at Source B above: Look at the nuns tending to patients in the ward, with an altar visible in the background. Why was the primary purpose of a medieval hospital hospitality and salvation rather than medical cure, and why were infectious patients strictly excluded?',
    },
  ],
  quick_quiz: [
    {
      question: 'Where were university-trained physicians educated in medieval Europe?',
      options: [
        'At universities like Oxford, Paris, and Bologna studying Latin texts for 7–10 years.',
        'Through 3-year manual apprenticeships with barber guilds.',
        'Inside royal naval dockyards.',
        'At public grammar schools.',
      ],
      answer:
        'At universities like Oxford, Paris, and Bologna studying Latin texts for 7–10 years.',
      explanation:
        'Physicians studied ancient Latin treatises for nearly a decade; hands-on dissection was rare.',
    },
    {
      question: 'Why were university-trained physicians socially superior to barber-surgeons?',
      options: [
        'They were educated in Latin, studied classical theory, and did not perform manual labor.',
        'They were personally appointed by the Pope.',
        'They performed all major abdominal surgeries in hospitals.',
        'They possessed exclusive rights to compound herbal Theriac.',
      ],
      answer:
        'They were educated in Latin, studied classical theory, and did not perform manual labor.',
      explanation:
        'Medieval intellectual hierarchy valued theoretical book-learning far above manual craftsmanship.',
    },
    {
      question: 'What manual procedures did guild-trained barber-surgeons perform?',
      options: [
        'Pulling teeth, bloodletting, stitching wounds, and lancing boils.',
        'Compounding imported chemical drugs.',
        'Teaching Latin grammar at Oxford University.',
        'Preaching sermons and administering holy communion.',
      ],
      answer: 'Pulling teeth, bloodletting, stitching wounds, and lancing boils.',
      explanation:
        'Barber-surgeons performed all practical manual surgery without anesthetics or antiseptics.',
    },
    {
      question: 'What did apothecaries do in the medieval medical division of labour?',
      options: [
        'Formulated and dispensed herbal syrups, ointments, and medicines.',
        'Conducted clinical post-mortem dissections on corpses.',
        'Served as full-time hospital surgeons.',
        'Issued royal quarantine orders during epidemics.',
      ],
      answer: 'Formulated and dispensed herbal syrups, ointments, and medicines.',
      explanation:
        'Organised into merchant guilds, apothecaries mixed and sold herbal and spice remedies.',
    },
    {
      question:
        'Who provided the vast majority of day-to-day healthcare for ordinary medieval peasants?',
      options: [
        'Women, mothers, and local wise women caring for sick family members in the home.',
        'University physicians charging modest charitable fees.',
        'Hospital doctors operating specialized clinics.',
        'Traveling Italian pharmacists.',
      ],
      answer: 'Women, mothers, and local wise women caring for sick family members in the home.',
      explanation:
        'Most people could not afford professionals; domestic women brewed herbal remedies and acted as midwives.',
    },
    {
      question: 'What was the central purpose of a medieval hospital run by monks and nuns?',
      options: [
        '‘Care not cure’: providing hospitality, warmth, food, and prayer for the soul.',
        'Conducting scientific trials on new pharmacological drugs.',
        'Performing complex surgical amputations in sterile operating theatres.',
        'Quarantining victims of the bubonic plague.',
      ],
      answer: '‘Care not cure’: providing hospitality, warmth, food, and prayer for the soul.',
      explanation:
        'Hospitals provided shelter, basic nursing, and religious services; medical treatments were not attempted.',
    },
    {
      question:
        'Which of the following patient groups was strictly EXCLUDED from medieval monastic hospitals?',
      options: [
        'Infectious patients (lepers, plague victims) and pregnant women.',
        'The elderly and infirm poor.',
        'Traveling religious pilgrims.',
        'Impoverished church clerics.',
      ],
      answer: 'Infectious patients (lepers, plague victims) and pregnant women.',
      explanation:
        'Hospitals barred infectious patients to preserve peace, avoid contamination, and protect prayers.',
    },
    {
      question: 'What famous London hospital was founded in 1123 by Rahere to care for the poor?',
      options: [
        'St Bartholomew’s Hospital.',
        'The Royal Free Hospital.',
        'Guy’s Hospital.',
        'Florence Nightingale Hospital.',
      ],
      answer: 'St Bartholomew’s Hospital.',
      explanation:
        'St Bartholomew’s was founded in 1123 as an Augustinian priory hospital caring for the poor.',
    },
  ],
  flashcards: [
    {
      q: 'What was the training of a medieval university physician?',
      a: '7 to 10 years of theoretical book-learning at universities like Oxford or Paris, studying Latin translations of Galen and Hippocrates, with almost zero hands-on clinical practice.',
    },
    {
      q: 'What was the role of a barber-surgeon?',
      a: 'Guild-apprenticed craftsmen who performed manual surgery: bloodletting, pulling teeth, suturing wounds, lancing boils, and amputations without anaesthetics.',
    },
    {
      q: 'What did apothecaries do?',
      a: 'Guild merchants who mixed and sold herbal remedies, ointments, and syrups based on traditional recipes and Galen’s Theory of Opposites.',
    },
    {
      q: 'What was the primary purpose of a medieval monastic hospital?',
      a: '‘Care not cure’: providing hospitality, clean bedding, warmth, food, and continuous prayer facing a chapel altar, without medical doctors or surgery.',
    },
    {
      q: 'Who was excluded from medieval monastic hospitals?',
      a: 'Infectious patients (lepers, plague victims), the insane, and pregnant women were turned away to maintain spiritual peace and prayer.',
    },
  ],
  draw_tasks: [
    {
      title: 'Diagram: The Medieval Medical Hierarchy',
      instruction:
        'Sketch a diagram illustrating the hierarchy of healers: Physician at the top (with Latin book and matula), Barber-Surgeon (with razor and fleam), Apothecary (with mortar and pestle), and Wise Woman in the home.',
    },
  ],
};

// ============================================================================
// 5. LESSON 1.5: Case Study: The Black Death (1348–1349)
// ============================================================================
const lesson_1_5 = {
  id: 'lesson_1_5',
  title: 'KT1.5: Case Study: Dealing with the Black Death (1348–1349)',
  specification_anchor:
    'Case study: dealing with the Black Death, 1348–49; approaches to treatment and attempts to prevent its spread.',
  enquiry_question:
    'Why were medieval communities, doctors, and civic authorities completely powerless to stop the Black Death?',
  living_timeline_mission: {
    target_milestones: 'Milestones 4 & 5 (1348 & 1349)',
    pages: 'Pages 2–3',
    instruction:
      "Turn back to Pages 2–3 (Milestones 4 & 5). In the sketchpad frame, sketch the mass burial pit at East Smithfield and annotate Edward III’s mandate: 'Clean the streets of pestilential filth!'",
  },
  timeline_anchor: [
    {
      date: 'June 1348',
      title: 'Arrival at Melcombe Regis',
      desc: 'Plague-infected black rats and fleas land on trade ships from Gascony, rapidly spreading through Dorset and southern England.',
    },
    {
      date: 'Autumn 1348',
      title: 'London Engulfed by Pestilence',
      desc: 'Churchyards overflow within weeks; emergency communal trench pits are dug at East Smithfield as 30–50% of the population perishes.',
    },
    {
      date: 'April 1349',
      title: 'King Edward III’s Sanitary Order',
      desc: 'King Edward III orders the Mayor of London to clear human dung and animal filth from streets to eliminate corrupt miasma.',
    },
  ],
  delivery_plan: {
    format: '2-Lesson Enquiry Sequence (2x 50 mins) or 100-min Double Period',
    lesson_1: {
      title: 'Lesson 1: Symptoms, Transmission & Believed Causes (50 mins)',
      phases: [
        {
          time: '00–10m',
          label: 'Hook & Spaced Retrieval',
          instruction:
            'Complete Do Now retrieval on medieval hospitals. Display Source A (Tournai plague burials). Explore the sudden catastrophe of 1348.',
        },
        {
          time: '10–30m',
          label: 'Modelled Shared Reading & Discussion',
          instruction:
            'Read Acts 1 & 2 with paragraph signposting ([1.1] to [2.2]). Deconstruct the 2 strains (bubonic vs pneumonic) and believed causes (God, 1345 alignment, miasma).',
        },
        {
          time: '30–45m',
          label: 'Analytical Assessment Ledger',
          instruction:
            'Complete Disciplinary Vocabulary Distinction (Bubonic Swellings vs Pneumonic Airborne Transmission).',
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
      title: 'Lesson 2: Treatments, Civic Action & Evaluative Essay (50 mins)',
      phases: [
        {
          time: '00–10m',
          label: 'Retrieval & Visual Forensic Inspection',
          instruction:
            'Inspect Source B (Plague Victim with Buboes). Discuss why lancing buboes with hot irons failed to save infected patients.',
        },
        {
          time: '10–25m',
          label: 'Deconstruct Acts 3 & 4 (Civic Sanitation & Flagellants)',
          instruction:
            'Contrast religious panic (flagellants whipping themselves) with civic orders (Edward III ordering London cleaned of dung).',
        },
        {
          time: '25–45m',
          label: 'Deliberate Exam Practice (16+4m)',
          instruction:
            'Complete Question 5/6 Essay: ‘The main reason why people failed to prevent the spread of the Black Death in 1348–49 was belief in supernatural causes.’ How far do you agree? [16+4m].',
        },
        {
          time: '45–50m',
          label: 'Self-Assessment & D.I.R.T.',
          instruction:
            'Pupils assess their balanced criteria judgement against the Grade 9 exemplar and complete the back-cover ledger.',
        },
      ],
    },
  },
  teacher_notes: {
    primer:
      'The overarching pedagogical goal of this lesson is to examine how the Black Death exposed the total impotence of medieval medicine. Without Germ Theory or microscopes, neither religious rituals, humoural purges, nor civic street cleaning could stop the flea-borne bacterium Yersinia pestis, resulting in devastating demographic collapse.',
    objectives: [
      {
        objective: 'Explain the symptoms, real causes, and believed causes of the Black Death.',
        primer:
          'Direct pupils to paragraphs [1.1] and [2.1]. Contrast the real biological mechanism (rat fleas, Yersinia pestis) with medieval beliefs (God’s anger, 1345 astrological alignment, miasma).',
        question:
          'Why did medieval people believe the 1345 planetary conjunction and foul smells caused the Black Death instead of rats and fleas?',
      },
      {
        objective: 'Analyse treatments, attempts at prevention, and government responses.',
        primer:
          'Focus on paragraphs [3.1] and [4.1]. Examine flagellants, street fires, posies, lancing buboes, and Edward III’s 1349 order to the Mayor of London.',
        question:
          'Why did public religious processions and flagellation actually accelerate the spread of the Black Death rather than stopping it?',
      },
    ],
  },
  do_now: {
    type: 'questions',
    title: 'Spaced Retrieval Do Now: Practitioners & Hospitals',
    instructions: 'Answer the four recall questions below based on your learning in Lesson 1.4.',
    items: [
      {
        question: 'What was the primary purpose of a medieval monastic hospital?',
        answer: '‘Care not cure’: providing hospitality, warmth, food, and prayer for the soul.',
        options: [
          '‘Care not cure’: providing hospitality, warmth, food, and prayer for the soul.',
          'Performing emergency amputations and dissections.',
          'Compounding synthetic antibiotic drugs.',
          'Training medical students in human surgical anatomy.',
        ],
      },
      {
        question: 'Which of the following was strictly excluded from medieval monastic hospitals?',
        answer: 'Infectious patients (lepers, plague victims) and pregnant women.',
        options: [
          'Infectious patients (lepers, plague victims) and pregnant women.',
          'Elderly poor citizens.',
          'Traveling religious pilgrims.',
          'Catholic monks and nuns.',
        ],
      },
      {
        question:
          'What medical practitioners performed practical surgery and bloodletting in medieval England?',
        answer: 'Guild-trained barber-surgeons.',
        options: [
          'Guild-trained barber-surgeons.',
          'University-trained physicians.',
          'Monastic bishops.',
          'Royal apothecaries.',
        ],
      },
      {
        question: 'Where did university physicians receive their formal medical education?',
        answer:
          'At ecclesiastical universities like Oxford, Paris, and Bologna studying Latin texts.',
        options: [
          'At ecclesiastical universities like Oxford, Paris, and Bologna studying Latin texts.',
          'Through manual apprenticeships on pirate ships.',
          'At military field dressing stations.',
          'Inside London craft barber guilds.',
        ],
      },
    ],
  },
  narrative_blocks: [
    {
      act: 1,
      act_title: 'Context: The Arrival & Deadly Symptoms of the Pestilence',
      text:
        '<span class="para-ref">[1.1]</span> In June 1348, ships from Gascony carrying wine docked at the port of Melcombe Regis in Dorset. Unbeknownst to the sailors, their cargo harboured black rats carrying fleas infected with the deadly bacterium Yersinia pestis. Within weeks, the catastrophic epidemic known as the Black Death broke out, sweeping relentlessly across England along trade routes and engulfing London by autumn. Between 1348 and 1350, the pestilence decimated the country, killing an estimated 30% to 50% of the entire population—over 1.5 million people.\n\n' +
        '<span class="para-ref">[1.2]</span> The disease manifested in two terrifying clinical forms. The most prevalent was Bubonic Plague, transmitted by the bites of infected black rat fleas. Victims suffered from agonizing high fevers, shivering, violent vomiting, dark subcutaneous hemorrhages (causing purple blotches called "God’s tokens"), and large, painful inflammatory swellings of the lymph nodes in the groin, armpits, and neck, termed buboes. Buboes swelled to the size of apples, blackened, and oozed foul pus; untreated, victims died in agony within 3 to 5 days. The second, even deadlier form was Pneumonic Plague, which occurred when the bacterium infected the lungs. Spread directly through the air via coughs and breath, pneumonic plague caused victims to cough up black blood, killing almost 100% of sufferers within 48 hours.',
      source: {
        id: 'source_a_burial',
        letter: 'A',
        title: 'Source A: Citizens of Tournai Burying Plague Victims (1349)',
        src: '/images/plague_burial.jpg',
        source: '/images/plague_burial.jpg',
        image: '/images/plague_burial.jpg',
        caption:
          'The citizens of Tournai carrying wooden coffins to mass communal plague burial pits during the devastating Black Death epidemic of 1349.',
        provenance:
          'Illumination by Pierart dou Tielt, Gilles Li Muisis chronicle, MS 13076-77, Bibliothèque Royale de Belgique, Brussels, 1349.',
        context:
          'When the Black Death struck Europe in 1348–1349, it wiped out between 30% and 50% of the population. Churchyards overflowed within weeks, forcing city authorities to dig vast emergency trench graves outside town walls.',
        question:
          'Look at Source A above: Study the sheer number of wooden coffins being carried simultaneously to a mass burial trench outside the city walls. What does this image show about how the rapid spread and terrifying death toll of the Black Death overwhelmed traditional parish burial customs and churchyards?',
        hinge_question:
          'Look at Source A above: Study the sheer number of wooden coffins being carried simultaneously to a mass burial trench outside the city walls. What does this image show about how the rapid spread and terrifying death toll of the Black Death overwhelmed traditional parish burial customs and churchyards?',
      },
    },
    {
      act: 2,
      act_title: 'Escalation: Explaining the Apocalypse—God, Astrology & Miasma',
      text:
        '<span class="para-ref">[2.1]</span> Entirely ignorant of microscopic bacteria or flea vectors, medieval society explained the catastrophe through established religious and humoural doctrines. The primary explanation was Supernatural: the Church preached that God had sent the plague as divine retribution to punish humanity for its wickedness, pride, and greed. Many believed the end of the world had arrived. Simultaneously, astrologers pointed to the March 1345 planetary conjunction of Saturn, Jupiter, and Mars in Aquarius, claiming celestial alignment had corrupted the atmosphere.\n\n' +
        '<span class="para-ref">[2.2]</span> On an earthly level, Miasma theory was universally blamed. Physicians claimed that foul, pestilential air caused by unburied decomposing bodies, stagnant cesspits, animal dung, and poisonous vapors rising from earthquakes had entered victims’ bodies, completely corrupting their humours. In mainland Europe, panic also sparked xenophobic scapegoating; Jews were falsely accused of poisoning drinking wells, leading to horrific pogroms, though in England, the Jewish population had already been expelled by King Edward I in 1290.',
      tasks: [
        {
          type: 'written',
          text: 'Using paragraphs [2.1]–[2.2], explain the three main causes medieval people believed were responsible for the Black Death.',
          model:
            'Medieval people believed the Black Death had three main causes: 1. Supernatural: God sent the plague as divine punishment for human wickedness and sin; 2. Astrological: An unusual alignment of Mars, Jupiter, and Saturn in 1345 corrupted the cosmos; 3. Environmental: Miasma (poisonous, corrupt air from unburied bodies, filth, and marshes) poisoned bodily humours upon inhalation.',
        },
      ],
    },
    {
      act: 3,
      act_title: 'Forensic Evidence: Desperate Treatments & Religious Panic',
      text:
        '<span class="para-ref">[3.1]</span> Because people believed God was punishing them, religious responses were frenzied. The King and bishops ordered daily church services, fasting, and massive public religious processions. Most extreme were the Flagellants: sects of penitent men who marched from town to town stripped to the waist, whipping themselves with iron-tipped scourges to appease God’s anger. Tragically, these large public gatherings and bleeding flagellants actively accelerated the transmission of pneumonic plague and flea vectors between communities.\n\n' +
        '<span class="para-ref">[3.2]</span> Medical treatments were completely ineffective and frequently agonizing. Physicians and barber-surgeons applied heated cupping glasses or lanced swollen buboes with red-hot irons to drain "corrupt humours," which caused excruciating pain and deadly secondary blood infections. Other doctors strapped live, plucked chickens or toads to the buboes, believing the creatures would draw out the poison. Patients were force-fed Theriac or made to drink crushed emeralds and vinegar, while homes were sealed to prevent bad air from entering.',
      source: {
        id: 'source_b_buboes',
        letter: 'B',
        title: 'Source B: Plague Victim with Groin and Armpit Buboes (1497)',
        src: '/images/black_death.jpg',
        source: '/images/black_death.jpg',
        image: '/images/black_death.jpg',
        caption:
          'A bedridden plague victim showing painful inflamed lymph swellings (buboes) in the groin and neck, surrounded by weeping attendants.',
        provenance: 'Woodcut of St. Sebastian interceding for plague victims, Augsburg, 1497.',
        context:
          'Bubonic plague caused excruciating lymph swellings. Medieval observers had no knowledge of bacteria or fleas; they believed buboes were visible proof of humoural poisons boiling out of the blood.',
        question:
          'Look at Source B above: Observe the painful, dark swellings (buboes) in the groin, armpits, and neck of the plague victim. Why did medieval physicians believe these buboes were proof that poisonous humours were corrupting the body, and why did desperate treatments like lancing them or applying toads fail to cure the disease?',
        hinge_question:
          'Look at Source B above: Observe the painful, dark swellings (buboes) in the groin, armpits, and neck of the plague victim. Why did medieval physicians believe these buboes were proof that poisonous humours were corrupting the body, and why did desperate treatments like lancing them or applying toads fail to cure the disease?',
      },
    },
    {
      act: 4,
      act_title: 'Historical Verdict: Civic Action, Edward III & Social Collapse',
      text:
        '<span class="para-ref">[4.1]</span> To combat miasma, local authorities and ordinary people made desperate attempts at environmental prevention. Citizens lit large bonfires in public squares, burned fragrant rosemary and incense, and continuously carried sweet posies or held sponges soaked in vinegar to their faces. Some towns attempted quarantine: Gloucester shut its gates to outsiders, though travelers simply carried the disease along country lanes. In London, parish churchyards overflowed within weeks, forcing the Bishop of London to consecrate emergency communal trench pits at East Smithfield, where bodies were stacked five deep.\n\n' +
        '<span class="para-ref">[4.2]</span> In April 1349, King Edward III intervened, writing a stern mandate to the Mayor of London complaining that the streets were choked with human faeces, rotting animal dung, and putrefying entrails, generating a stench that was poisoning citizens. He ordered the streets to be thoroughly cleaned to clear the miasma. However, because authorities had no police force or civil service, and because the true vector—fleas on black rats—remained entirely unknown, street cleaning could not halt the pandemic. The Black Death wiped out up to half of England’s population, shattering feudal social structures and proving the total helplessness of medieval medicine.',
      tasks: [
        {
          type: 'exam_practice',
          tariff: '[16+4 marks]',
          question:
            '‘The main reason why people failed to prevent the spread of the Black Death in 1348–49 was belief in supernatural causes.’ How far do you agree? Explain your answer.',
          stimulus: ['Punishment from God', 'Miasma (bad air)'],
          model:
            'On the one hand, belief in supernatural causes was a primary reason why people failed to prevent the spread of the Black Death because it led communities to adopt religious reactions that actively worsened the epidemic. In 1348, the Catholic Church taught that the pestilence was sent directly by God as divine retribution to punish human wickedness. Consequently, authorities and ordinary people believed that the only effective response was spiritual appeasement. Bishops ordered daily church services, public fasting, and massive crowded religious processions, while groups like the Flagellants marched between towns whipping themselves in public squares. Tragically, gathering hundreds of people together in churches and public squares created ideal conditions for the pneumonic plague to spread rapidly through coughs and breath, while crowded streets enabled black rat fleas to jump between hosts. Because people fatalistically believed God alone controlled their fate, they failed to implement scientific hygiene measures or strict isolation.\n\n' +
            'On the other hand, failure to contain the disease was heavily driven by the universal belief in Miasma theory. Medical scholars from the University of Paris officially blamed the plague on the 1345 planetary conjunction of Mars, Jupiter, and Saturn, which they believed generated poisonous vapors from the earth. Furthermore, people believed that breathing foul air corrupted the humours. This belief led to prevention methods that were completely ineffective against bacteria and rat fleas: citizens lit fires in the streets, burned incense, shuttered windows, and carried sweet-smelling posies and pomanders. While people spent time and resources trying to mask bad smells, they did nothing to eliminate the real vectors—black rats and fleas living in thatched roofs, dirt floors, and crowded timber houses. Furthermore, medieval doctors had no understanding of contagion or bacteria; treatments like lancing buboes with hot irons caused severe blood loss and secondary infections, hastening death.\n\n' +
            'In conclusion, while belief in supernatural causes led to fatalistic religious processions that accelerated contagion, the fundamental reason why people failed to stop the Black Death was the complete absence of scientific knowledge regarding Germ Theory and flea vectors. Even when civic authorities attempted practical public health measures—such as King Edward III ordering the Mayor of London to clean dung from the streets in 1349, or Gloucester closing its gates to outsiders—they were completely powerless because neither doctors, councils, nor the King understood that microscopic Yersinia pestis bacteria carried by fleas on black rats was the true cause of the plague.',
        },
      ],
    },
  ],
  sources: [
    {
      id: 'source_a_burial',
      letter: 'A',
      title: 'Source A: Citizens of Tournai Burying Plague Victims (1349)',
      src: '/images/plague_burial.jpg',
      source: '/images/plague_burial.jpg',
      image: '/images/plague_burial.jpg',
      caption:
        'The citizens of Tournai carrying wooden coffins to mass communal plague burial pits during the devastating Black Death epidemic of 1349.',
      provenance:
        'Illumination by Pierart dou Tielt, Gilles Li Muisis chronicle, MS 13076-77, Bibliothèque Royale de Belgique, Brussels, 1349.',
      context:
        'When the Black Death struck Europe in 1348–1349, it wiped out between 30% and 50% of the population. Churchyards overflowed within weeks, forcing city authorities to dig vast emergency trench graves outside town walls.',
      question:
        'Look at Source A above: Study the sheer number of wooden coffins being carried simultaneously to a mass burial trench outside the city walls. What does this image show about how the rapid spread and terrifying death toll of the Black Death overwhelmed traditional parish burial customs and churchyards?',
      hinge_question:
        'Look at Source A above: Study the sheer number of wooden coffins being carried simultaneously to a mass burial trench outside the city walls. What does this image show about how the rapid spread and terrifying death toll of the Black Death overwhelmed traditional parish burial customs and churchyards?',
    },
    {
      id: 'source_b_buboes',
      letter: 'B',
      title: 'Source B: Plague Victim with Groin and Armpit Buboes (1497)',
      src: '/images/black_death.jpg',
      source: '/images/black_death.jpg',
      image: '/images/black_death.jpg',
      caption:
        'A bedridden plague victim showing painful inflamed lymph swellings (buboes) in the groin and neck, surrounded by weeping attendants.',
      provenance: 'Woodcut of St. Sebastian interceding for plague victims, Augsburg, 1497.',
      context:
        'Bubonic plague caused excruciating lymph swellings. Medieval observers had no knowledge of bacteria or fleas; they believed buboes were visible proof of humoural poisons boiling out of the blood.',
      question:
        'Look at Source B above: Observe the painful, dark swellings (buboes) in the groin, armpits, and neck of the plague victim. Why did medieval physicians believe these buboes were proof that poisonous humours were corrupting the body, and why did desperate treatments like lancing them or applying toads fail to cure the disease?',
      hinge_question:
        'Look at Source B above: Observe the painful, dark swellings (buboes) in the groin, armpits, and neck of the plague victim. Why did medieval physicians believe these buboes were proof that poisonous humours were corrupting the body, and why did desperate treatments like lancing them or applying toads fail to cure the disease?',
    },
  ],
  quick_quiz: [
    {
      question: 'Where did the Black Death first arrive in England in June 1348?',
      options: [
        'Melcombe Regis in Dorset.',
        'The port of Dover in Kent.',
        'Portsmouth Dockyard in Hampshire.',
        'The Tower of London.',
      ],
      answer: 'Melcombe Regis in Dorset.',
      explanation:
        'Trade ships carrying wine from Gascony landed at Melcombe Regis carrying plague-infected black rats and fleas.',
    },
    {
      question: 'What bacterium, unknown to medieval people, actually caused the Black Death?',
      options: [
        'Yersinia pestis.',
        'Mycobacterium leprae.',
        'Vibrio cholerae.',
        'Streptococcus pneumoniae.',
      ],
      answer: 'Yersinia pestis.',
      explanation:
        'Yersinia pestis was the bacterium carried in the gut of black rat fleas (Xenopsylla cheopis).',
    },
    {
      question: 'What were the agonizing, swollen lymph glands in the groin and armpits called?',
      options: ['Buboes.', 'Miasmas.', 'Vademecums.', 'Carbuncles.'],
      answer: 'Buboes.',
      explanation: 'Buboes were swollen, inflamed lymph nodes that blackened and oozed pus.',
    },
    {
      question: 'How was the pneumonic form of the plague transmitted between humans?',
      options: [
        'Through coughs, sneezes, and breath directly through the air.',
        'Through drinking infected well water.',
        'Through eating rotten meat.',
        'Through touching churchyard soil.',
      ],
      answer: 'Through coughs, sneezes, and breath directly through the air.',
      explanation:
        'Pneumonic plague infected the lungs and was highly contagious via airborne droplets.',
    },
    {
      question: 'Who were the Flagellants who appeared during the Black Death epidemic?',
      options: [
        'Religious sects who marched from town to town whipping themselves to appease God’s wrath.',
        'Guild barber-surgeons employed to lance buboes.',
        'Parish gravediggers digging emergency trench pits.',
        'Royal tax collectors sent by Edward III.',
      ],
      answer:
        'Religious sects who marched from town to town whipping themselves to appease God’s wrath.',
      explanation:
        'Flagellants believed self-inflicted punishment would convince God to forgive human sins.',
    },
    {
      question: 'What did King Edward III order the Mayor of London to do in April 1349?',
      options: [
        'Clean human faeces and animal dung from London streets to clear corrupt miasma.',
        'Execute all barber-surgeons who failed to cure patients.',
        'Burn down all infected wooden houses in the city.',
        'Close all Catholic churches and cancel Mass.',
      ],
      answer: 'Clean human faeces and animal dung from London streets to clear corrupt miasma.',
      explanation:
        'Edward III complained that filthy streets were generating foul miasma that poisoned the city.',
    },
    {
      question:
        'What proportion of England’s entire population is estimated to have died during the Black Death?',
      options: [
        'Between 30% and 50% (over 1.5 million people).',
        'Less than 5%.',
        'Roughly 10%.',
        'Over 90%.',
      ],
      answer: 'Between 30% and 50% (over 1.5 million people).',
      explanation:
        'Historians estimate between one-third and one-half of the population perished in 1348–1350.',
    },
    {
      question:
        'Why did emergency mass burial pits have to be dug outside city walls at East Smithfield in London?',
      options: [
        'Parish churchyards overflowed with corpses within weeks of the outbreak.',
        'The King passed a law requiring all deaths to be buried in the River Thames.',
        'The Catholic Church refused to bury plague victims in consecrated ground.',
        'Doctors demanded corpses be buried near hospitals for anatomical research.',
      ],
      answer: 'Parish churchyards overflowed with corpses within weeks of the outbreak.',
      explanation:
        'The sheer volume of deaths quickly overwhelmed parish churchyards, requiring mass trench graves.',
    },
  ],
  flashcards: [
    {
      q: 'When and where did the Black Death enter England?',
      a: 'June 1348 at the port of Melcombe Regis in Dorset, arriving on trade ships from Gascony carrying plague-infected black rats and fleas.',
    },
    {
      q: 'What were the two strains of the Black Death?',
      a: '1. Bubonic plague (transmitted by rat flea bites, causing agonizing groin/armpit buboes); 2. Pneumonic plague (airborne via coughs/breath, attacking lungs, nearly 100% fatal).',
    },
    {
      q: 'What were believed causes of the Black Death in 1348?',
      a: 'God’s punishment for sin, the 1345 planetary conjunction of Mars, Jupiter, and Saturn in Aquarius, and corrupt miasma from rotting filth and unburied corpses.',
    },
    {
      q: 'Who were the Flagellants?',
      a: 'Penitent religious sects who marched between towns whipping themselves with iron-tipped scourges to appease God’s wrath, unintentionally spreading the plague.',
    },
    {
      q: 'What was King Edward III’s sanitary order in 1349?',
      a: 'A royal mandate to the Mayor of London ordering streets cleared of human faeces and animal dung to eliminate the foul miasma believed to spread the pestilence.',
    },
  ],
  draw_tasks: [
    {
      title: 'Diagram: The Two Strains of the Black Death',
      instruction:
        'Sketch a comparison diagram of Bubonic plague (rat flea, bubo on groin/armpit) vs Pneumonic plague (airborne cough droplets, lungs).',
    },
  ],
};

// ============================================================================
// INJECT THE 5 LESSONS INTO units/edexcel_medicine/data.js
// ============================================================================
// Find the exact slice where medieval lessons exist (from line 534 to before lesson_2_1)
const startMarker = "      id: 'lesson_1_1',";
const endMarker = "      id: 'lesson_2_1',";

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.error('❌ Could not locate start or end markers for Medieval lessons in data.js!');
  process.exit(1);
}

// Find the opening brace '{' before lesson_1_1
const blockStart = content.lastIndexOf('{', startIndex);
// Find the opening brace '{' before lesson_2_1
const blockEnd = content.lastIndexOf('{', endIndex);

const lessonsObj = [lesson_1_1, lesson_1_2, lesson_1_3, lesson_1_4, lesson_1_5];
let newLessonsJs =
  lessonsObj.map((l) => '    ' + JSON.stringify(l, null, 2).replace(/\n/g, '\n    ')).join(',\n') +
  ',\n';

content = content.slice(0, blockStart) + newLessonsJs + content.slice(blockEnd);

fs.writeFileSync(dataFilePath, content, 'utf8');
console.log(
  '🎉 Successfully injected 5 dedicated Medieval lessons into units/edexcel_medicine/data.js!',
);
