/**
 * generate_medicine_visual_guide.cjs
 *
 * Compiles the complete, print-perfect Edexcel GCSE (9–1) History Paper 1:
 * "Medicine in Britain (c.1250–present) & The British Sector of the Western Front (1914–1918)"
 * Visual Revision Masterclasses & Exam Assessment Guide (36-Page Master Volume).
 *
 * Implements strict Edexcel Specification Rules:
 * 1. Section B Rotation:
 *    - Q3 Similarity [4m] (1 developed comparative PEEL paragraph)
 *    - Q3 Difference [4m] (1 developed comparative PEEL paragraph)
 *    - Q4 Explain Why [12m] (3 PEEL paragraphs + Interactive Stimulus Checklist)
 *    - Q5 / Q6 Judgement Statement Essay [16 + 4 SPaG = 20m] spanning 150-300+ years.
 * 2. Left-Page Synoptic Support:
 *    - For 16-mark essays, the left-hand bottom box provides a dedicated Cross-Era Comparative Evidence Bank.
 * 3. Section A Western Front Historic Environment:
 *    - Q1(a) & Q1(b): Two separate 2-mark feature questions ("Describe one feature of...")
 *    - Q2(a): Source Utility [8m] with authentic sources & Provenance Clues scaffolding
 *    - Q2(b): Follow-Up Investigation Grid [4m] using the EXACT 4 official Edexcel phrases:
 *        • "Detail in Source A that I would follow up:"
 *        • "Question I would ask:"
 *        • "What type of source I could use:"
 *        • "How this might help answer my question:"
 * 4. Puppeteer PDF Export:
 *    - Exports to public/pdfs/edexcel_medicine_visual_revision_and_exam_guide.pdf
 *    - Copies to public/units/edexcel_medicine/edexcel_medicine_visual_revision_and_exam_guide.pdf
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { pathToFileURL } = require('url');
const { PATHS } = require('./config.cjs');

// Complete 18-Spread Data Specification for Edexcel GCSE Paper 1
const SPREADS = [
  // ==========================================
  // TOPIC 1: MEDIEVAL BRITAIN (c.1250–c.1500)
  // ==========================================
  {
    id: 'lesson_1_1',
    topic: 'Topic 1: Medieval Britain (c.1250–c.1500)',
    title: 'KT1.1: What Did Medieval People Believe Caused Illness?',
    examType: 'q3_q4',
    left: {
      tag: 'Topic 1 • Comprehensive Knowledge Masterclass',
      headline: 'Ideas About Cause: The Classical-Religious Monopoly',
      summary:
        'Medical thinking in medieval Britain was trapped in intellectual stagnation. The Catholic Church strictly enforced Galenic and Hippocratic doctrines because they aligned with scripture, suppressing anatomical dissection, independent enquiry, and scientific challenge.',
      pillars: [
        {
          id: 'church',
          title: 'The Catholic Church',
          subtitle: 'Institutional Hegemony',
          image: '/images/default_person.svg',
          iconFallback: '⛪',
          bullets: [
            'Monopolised education, universities, and manuscript copying.',
            'Taught that disease was sent by God as punishment for sin or a test of faith.',
            'Outlawed dissection and branded any challenge to Galen as heresy.',
          ],
        },
        {
          id: 'hippocrates',
          title: 'Hippocrates (c.460–370 BC)',
          subtitle: 'Ancient Greek Rationalism',
          image: '/images/hippocrates_portrait.jpg',
          iconFallback: '🏛️',
          bullets: [
            'Created the **Theory of the Four Humours** (Blood, Phlegm, Yellow Bile, Black Bile).',
            'Pioneered clinical observation: examining pulse, urine, and recording symptoms.',
            'Promoted natural balance; established the Hippocratic Oath of medical ethics.',
          ],
        },
        {
          id: 'galen',
          title: 'Claudius Galen (c.129–216 AD)',
          subtitle: 'Imperial Roman Synthesis',
          image: '/images/galen_portrait.jpg',
          iconFallback: '📜',
          bullets: [
            'Expanded Greek ideas: developed the **Theory of Opposites** (e.g. treating cold phlegm with hot pepper).',
            'Dissected pigs, apes, and dogs; incorrectly claimed humans had a two-lobed liver and porous septum.',
            'Argued the body had a single divine creator (teleology), winning total Church endorsement.',
          ],
        },
      ],
      vectors: [
        { from: 'Hippocrates', to: 'Galen', text: 'Adapted humours into the Theory of Opposites.' },
        { from: 'Galen', to: 'Church', text: 'Monotheistic teleology adopted into Church dogma.' },
        {
          from: 'Church',
          to: 'Society',
          text: 'Total control over medical training, preserving Galen for 1,300 years.',
        },
      ],
      middleBox: {
        title: 'Synoptic Cross-Era Thematic Bridge: Continuity &amp; Change in Ideas About Causes',
        links: [
          {
            era: 'Medieval Reality (c.1250–1500)',
            badge: 'Continuity Factor',
            text: 'Illness blamed on humoral imbalance, miasma (corrupted air), astrology, and divine retribution. Physicians relied on uroscopy wheels and astrology charts rather than physical investigation.',
          },
          {
            era: 'Renaissance Transition (c.1500–1700)',
            badge: 'Change Factor',
            text: 'The Royal Society (1660) and Thomas Sydenham challenged blind authority. Sydenham categorised diseases by external species rather than internal humours, though miasma endured.',
          },
        ],
      },
      bottomBox: {
        title: '3 Key Causal Factors: Why Ideas About Cause Remained Stagnant (c.1250–c.1500)',
        points: [
          '**The Power of the Church:** Controlled book copying; doctors who questioned Galen risked arrest or excommunication.',
          '**Lack of Scientific Technology:** No microscopes existed; physicians could not observe bacteria, pathogens, or cellular biology.',
          '**Respect for Tradition:** Reverence for ancient authorities was paramount; Hippocratic clinical methods paradoxically became dogmatic scripture.',
        ],
      },
    },
    right: {
      type: 'q3_q4',
      totalMarks: 16,
      q3: {
        type: 'similarity',
        title: 'Edexcel GCSE (9–1) Paper 1 • Question 3 [4 Marks]',
        question:
          'Explain one way in which ideas about the causes of illness in the Medieval period (c.1250–c.1500) were similar to ideas about the causes of illness in the Renaissance period (c.1500–c.1700).',
        guidance:
          'Timing: 5 mins • Structure: 1 developed comparative PEEL paragraph. (e.g. Continued widespread reliance on miasma / corrupted air as a primary cause of epidemic outbreaks, or enduring humoral concepts).',
        lines: 8,
      },
      q4: {
        title: 'Edexcel GCSE (9–1) Paper 1 • Question 4 [12 Marks]',
        question:
          'Explain why there was so little change in medical ideas about the causes of disease between c.1250 and c.1500.',
        stimulus: ['The Catholic Church', 'Galen'],
        note: '(You must also use information of your own.) [12 marks]',
        guidance:
          'Timing: 18 mins • Structure: 3 fully developed PEEL paragraphs (P1: Church monopoly, P2: Galen & education, P3: Own knowledge - lack of technology / respect for tradition).',
        lines: 24,
      },
    },
  },

  {
    id: 'lesson_1_2',
    topic: 'Topic 1: Medieval Britain (c.1250–c.1500)',
    title: 'KT1.2: How Did Medieval People Try to Prevent and Treat Disease?',
    examType: 'q3_q4',
    left: {
      tag: 'Topic 1 • Comprehensive Knowledge Masterclass',
      headline: 'Treatments & Healers: The Medieval Care Hierarchy',
      summary:
        'Medieval treatments were directly derived from humoral and supernatural beliefs. Healthcare was heavily stratified, with university-trained physicians serving the wealthy while the majority relied on local herbalists, apothecaries, and barber-surgeons.',
      pillars: [
        {
          id: 'physicians',
          title: 'Medieval Physicians',
          subtitle: 'University-Trained Elite',
          image: '/images/default_person.svg',
          iconFallback: '🎓',
          bullets: [
            'Trained for 7–10 years reading Galen and Hippocrates; rarely touched patients.',
            'Diagnosed using uroscopy (urine colour/taste charts) and astrological zodiac charts.',
            'Expensive: charged high fees, serving solely royalty, nobility, and wealthy merchants.',
          ],
        },
        {
          id: 'apothecaries',
          title: 'Apothecaries & Barber-Surgeons',
          subtitle: 'Working-Class Practitioners',
          image: '/images/default_person.svg',
          iconFallback: '⚖️',
          bullets: [
            'Apothecaries mixed herbal remedies, theriacs, and charms; cheaper than physicians.',
            'Barber-surgeons performed bloodletting (phlebotomy), tooth extraction, and amputations.',
            'Learned through apprenticeships rather than university; possessed practical trade skills.',
          ],
        },
        {
          id: 'hospitals',
          title: 'Monastic Hospitals',
          subtitle: '"Care, Not Cure"',
          image: '/images/default_person.svg',
          iconFallback: '🏥',
          bullets: [
            'Run by monks and nuns; focused on spiritual welfare, prayer, warmth, and basic food.',
            'Did not admit infectious patients, lepers, or pregnant women to prevent defilement.',
            'No doctors on staff; treatment consisted of rest and prayer to save the soul.',
          ],
        },
      ],
      vectors: [
        {
          from: 'Physicians',
          to: 'Barber-Surgeons',
          text: 'Physicians prescribed phlebotomy; barber-surgeons physically bled the patient.',
        },
        {
          from: 'Apothecaries',
          to: 'Herbalism',
          text: 'Dispensed ancient theriacs containing herbs, spices, and opium.',
        },
        {
          from: 'Monasteries',
          to: 'Hospitals',
          text: 'Endowed over 700 hospitals in England providing warmth and shelter, not surgery.',
        },
      ],
      middleBox: {
        title: 'Core Diagnostic &amp; Preventative Procedures: Humoral &amp; Supernatural',
        links: [
          {
            era: 'Phlebotomy (Bloodletting)',
            badge: 'Humoral Rebalancing',
            text: 'Practiced by cupping, leeches, or opening a vein with a lancet. Performed according to the Bloodletting Man zodiac chart.',
          },
          {
            era: 'Regimen Sanitatis & Miasma',
            badge: 'Preventative Regimen',
            text: 'Dietary moderation, carrying pomanders with sweet-smelling herbs, ringing church bells, and sweeping streets to disperse foul air.',
          },
        ],
      },
      bottomBox: {
        title: '3 Key Reasons: Why Medieval Treatments Failed to Cure Disease',
        points: [
          '**False Theoretical Basis:** Treatments targeted imaginary humours; bloodletting often weakened sick patients into fatal shock.',
          '**Spiritual Fatalism:** The belief that sickness was God’s will encouraged prayer, pilgrimage, and fasting over clinical remedies.',
          '**Absence of Antiseptics:** Barber-surgeons used unsterilised tools in filthy conditions; wound infections and gangrene were routinely lethal.',
        ],
      },
    },
    right: {
      type: 'q3_q4',
      totalMarks: 16,
      q3: {
        type: 'difference',
        title: 'Edexcel GCSE (9–1) Paper 1 • Question 3 [4 Marks]',
        question:
          'Explain one way in which hospital care in the Medieval period (c.1250–c.1500) was different from hospital care in the Modern period (c.1900–present).',
        guidance:
          'Timing: 5 mins • Structure: 1 developed comparative PEEL paragraph. (e.g. Focus of care: Medieval hospitals provided spiritual comfort, shelter, and prayer ("care, not cure") by monks/nuns with no doctors, whereas modern hospitals focus on medical cure using doctors, surgery, and antibiotics).',
        lines: 8,
      },
      q4: {
        title: 'Edexcel GCSE (9–1) Paper 1 • Question 4 [12 Marks]',
        question:
          'Explain why medieval treatments and care were largely ineffective in curing disease between c.1250 and c.1500.',
        stimulus: ['Bloodletting', 'Religious treatments'],
        note: '(You must also use information of your own.) [12 marks]',
        guidance:
          'Timing: 18 mins • Structure: 3 fully developed PEEL paragraphs (P1: Bloodletting & humoral purging, P2: Religious fasting/prayer/pilgrimage, P3: Own knowledge - herbal placebos / lack of antiseptics).',
        lines: 24,
      },
    },
  },

  {
    id: 'lesson_1_3',
    topic: 'Topic 1: Medieval Britain (c.1250–c.1500)',
    title: 'KT1.3: How Did People Respond to the Black Death (1348)?',
    examType: 'essay_16m',
    left: {
      tag: 'Topic 1 • Comprehensive Knowledge Masterclass',
      headline: 'The Black Death (1348): Epidemic Crisis &amp; Response',
      summary:
        'Arriving in England in summer 1348, the Black Death (bubonic and pneumonic plague) wiped out roughly 40% of the population. Lacking any understanding of flea vectors (*Yersinia pestis*) or contagion, society fractured into desperate religious, astrological, and miasmatic responses.',
      pillars: [
        {
          id: 'causes_bd',
          title: 'Believed Causes (1348)',
          subtitle: 'Supernatural & Environmental',
          image: '/images/black_death.jpg',
          iconFallback: '💀',
          bullets: [
            '**Divine Wrath:** God punishing mankind for gambling, greed, and general wickedness.',
            '**Astrological Alignment:** Alignment of Saturn, Jupiter, and Mars in 1345 creating corrupt air.',
            '**Miasma:** Putrid vapours emanating from swamps, unburied corpses, and overflowing cesspits.',
          ],
        },
        {
          id: 'religious_resp',
          title: 'Religious Responses',
          subtitle: 'Spiritual Appeasement',
          image: '/images/default_person.svg',
          iconFallback: '✝️',
          bullets: [
            'Daily church processions, special litanies, confessions, and massive public pilgrimages.',
            'Flagellants whipped themselves with iron-tipped cords to absorb God’s wrath.',
            'Churches offered prayers; ironically, mass gatherings accelerated respiratory transmission.',
          ],
        },
        {
          id: 'secular_resp',
          title: 'Secular & Local Action',
          subtitle: 'Quarantine & Sanitation',
          image: '/images/plague_burial.jpg',
          iconFallback: '🚪',
          bullets: [
            'Gloucester attempted total quarantine, shutting town gates to outsiders (failed).',
            'King Edward III ordered the Mayor of London to clean filth and butcher waste from the streets.',
            'Graves dug at least 6 feet deep; burning sweet woods and tar to drive away miasma.',
          ],
        },
      ],
      vectors: [
        {
          from: 'Divine Wrath',
          to: 'Flagellation',
          text: 'Devout zealots whipped themselves in public squares across Europe.',
        },
        {
          from: 'Miasma',
          to: 'Street Cleaning',
          text: 'Edward III mandated street sweeping to remove offensive, corrupting smells.',
        },
        {
          from: 'Quarantine',
          to: 'Failure',
          text: 'Medieval authorities lacked the police power and medical knowledge to enforce isolation.',
        },
      ],
      middleBox: {
        title: 'Diagnostic Features of the Black Death: Bubonic vs Pneumonic Plague',
        links: [
          {
            era: 'Bubonic Plague (Flea Bites)',
            badge: 'Lymphatic Infection',
            text: 'Carried by black rats and fleas (*Xenopsylla cheopis*). Caused egg-sized painful swellings (buboes) in armpits and groin, high fever, vomiting, and black skin patches. 70% mortality within 3–5 days.',
          },
          {
            era: 'Pneumonic Plague (Airborne)',
            badge: 'Respiratory Transmission',
            text: 'Spread directly by coughing and sneezing droplets. Attacked the lungs, causing victims to vomit blood. 95–100% mortality within 48 hours.',
          },
        ],
      },
      bottomBox: {
        title:
          'Synoptic Cross-Era Comparative Evidence Bank: The Black Death (1348) vs The Great Plague (1665)',
        points: [
          '**Enduring Religious & Miasmatic Explanations:** Both eras blamed God’s anger, bad air, and astrological alignments. People carried posies/pomanders and held national days of prayer.',
          '**More Systematic Government Action in 1665:** In 1665, London authorities enforced strict 40-day home quarantines with red crosses ("Lord Have Mercy Upon Us"), hired official searchers, and killed stray animals.',
          '**Total Medical Impotence in Both Eras:** Neither era understood germs or vector biology. Bloodletting, smoking tobacco, and strapping live chickens to buboes in 1665 proved as useless as 1348 charms.',
        ],
      },
    },
    right: {
      type: 'essay_16m',
      totalMarks: 20,
      essay: {
        title: 'Edexcel GCSE (9–1) Paper 1 • Question 5 / 6 [16 Marks + 4 SPaG = 20 Marks]',
        statement:
          '"There was very little difference in the way people responded to the Black Death (1348) and the Great Plague (1665)." How far do you agree? Explain your answer.',
        spanNote: 'Chronological Scope: c.1348–c.1665 (Medieval to Renaissance Comparison)',
        stimulus: ['Religious reactions', 'Local government quarantine orders'],
        ownKnowledgeNote: '(You must also use information of your own.) [16 marks + 4 marks SPaG]',
        guidance:
          'Timing: 25 mins • Structure: Criteria Intro → Paragraph 1 (Agree: Religious continuity & miasma) → Paragraph 2 (Disagree: More organised municipal action in 1665) → Paragraph 3 (Own Knowledge: Medical treatments & scientific searchers) → Sustained Conclusion weighing degree of change.',
        checklist: [
          '1. Direct Engagement & Criteria (Define "little difference")',
          '2. Argument 1 (Agree: Enduring religious panic & carrying herbs)',
          '3. Argument 2 (Disagree: 1665 Pest houses, red crosses & Mayoral orders)',
          '4. Argument 3 (Own Knowledge: 1665 Bills of Mortality & searchers)',
          '5. Sustained Judgement (Weigh continuity of beliefs vs change in public health organisation)',
        ],
        lines: 28,
      },
    },
  },

  // ==========================================
  // TOPIC 2: THE MEDICAL RENAISSANCE (c.1500–c.1700)
  // ==========================================
  {
    id: 'lesson_2_1',
    topic: 'Topic 2: The Medical Renaissance (c.1500–c.1700)',
    title: 'KT2.1: Did the Renaissance Change Beliefs About the Causes of Illness?',
    examType: 'q3_q4',
    left: {
      tag: 'Topic 2 • Comprehensive Knowledge Masterclass',
      headline: 'The Scientific Turning Point: Institutional &amp; Intellectual Shift',
      summary:
        'The Renaissance witnessed the birth of the scientific method and empirical enquiry. While everyday medical practice remained tethered to miasma and humours, new institutions and thinkers began breaking Galen’s monopoly.',
      pillars: [
        {
          id: 'printing_press',
          title: 'The Printing Press (1440)',
          subtitle: 'Information Revolution',
          image: '/images/default_person.svg',
          iconFallback: '📰',
          bullets: [
            'Invented by Gutenberg; enabled mass production of medical textbooks with precise anatomical engravings.',
            'Broke the Church’s monopoly over copying manuscripts; ideas spread rapidly across Europe.',
            'Allowed new discoveries to be published and compared simultaneously, exposing ancient errors.',
          ],
        },
        {
          id: 'royal_society',
          title: 'The Royal Society (1660)',
          subtitle: 'Empirical Science',
          image: '/images/default_person.svg',
          iconFallback: '🔬',
          bullets: [
            'Motto: *Nullius in Verba* ("Take nobody’s word for it") — rejecting blind reliance on Galen.',
            'Received a royal charter from Charles II in 1662; published the scientific journal *Philosophical Transactions*.',
            'Provided an open laboratory network for sharing microscope observations and experiments.',
          ],
        },
        {
          id: 'sydenham',
          title: 'Thomas Sydenham (1624–1689)',
          subtitle: '"The English Hippocrates"',
          image: '/images/default_person.svg',
          iconFallback: '🩺',
          bullets: [
            'Argued diseases should be classified into distinct species like plants, based on observed symptoms.',
            'Insisted that disease was separate from the patient (refuting personal humoral imbalance).',
            'Used cinchona bark (quinine) to cure malaria, demonstrating specific remedies cure specific diseases.',
          ],
        },
      ],
      vectors: [
        {
          from: 'Printing Press',
          to: 'Anatomy',
          text: 'Accurate diagrams allowed Vesalius’s discoveries to circulate without scribal alteration.',
        },
        {
          from: 'Royal Society',
          to: 'Empiricism',
          text: 'Scientists verified each other’s experiments rather than quoting ancient Greek philosophy.',
        },
        {
          from: 'Sydenham',
          to: 'Taxonomy',
          text: 'Shifted focus from individual bodily humours to categorising epidemic diseases.',
        },
      ],
      middleBox: {
        title: 'Core Debate: Intellectual Revolution vs Everyday Medical Continuity',
        links: [
          {
            era: 'Intellectual Breakthroughs',
            badge: 'Scientific Frontier',
            text: 'Royal Society experiments, early microscopes (Robert Hooke), classification of distinct diseases, and chemical remedies (paracelsian alchemy).',
          },
          {
            era: 'Everyday Reality for Patients',
            badge: 'Stubborn Continuity',
            text: 'Most people still visited local quacks and apothecaries; miasma and humoral purging remained the dominant explanation for day-to-day illness.',
          },
        ],
      },
      bottomBox: {
        title: '3 Key Factors: How New Institutions Fostered Change in the Renaissance',
        points: [
          '**Secularisation of Science:** The Royal Society operated independently of Church dogma, encouraging direct questioning of ancient texts.',
          '**Rapid Dissemination:** Textbooks were published in English and Latin, bypassing Latin scribal censorship and accelerating peer review.',
          '**Observation Over Dogma:** Sydenham championed bedside clinical diagnosis, urging doctors to observe disease progression rather than consult astrology.',
        ],
      },
    },
    right: {
      type: 'q3_q4',
      totalMarks: 16,
      q3: {
        type: 'similarity',
        title: 'Edexcel GCSE (9–1) Paper 1 • Question 3 [4 Marks]',
        question:
          'Explain one way in which beliefs about the causes of illness in the Renaissance period (c.1500–c.1700) were similar to beliefs in the Medieval period (c.1250–c.1500).',
        guidance:
          'Timing: 5 mins • Structure: 1 developed comparative PEEL paragraph. (e.g. Enduring reliance on miasma: both medieval people and Renaissance doctors like Sydenham believed that poisonous air emanating from rotting waste caused infectious epidemics).',
        lines: 8,
      },
      q4: {
        title: 'Edexcel GCSE (9–1) Paper 1 • Question 4 [12 Marks]',
        question:
          'Explain why new ideas in medicine began to spread more rapidly in the Renaissance period between c.1500 and c.1700.',
        stimulus: ['The printing press', 'The Royal Society'],
        note: '(You must also use information of your own.) [12 marks]',
        guidance:
          'Timing: 18 mins • Structure: 3 fully developed PEEL paragraphs (P1: The printing press & mass communication, P2: The Royal Society & peer-reviewed journals, P3: Own knowledge - decline of Church censorship / human dissection).',
        lines: 24,
      },
    },
  },

  {
    id: 'lesson_2_2',
    topic: 'Topic 2: The Medical Renaissance (c.1500–c.1700)',
    title: 'KT2.2: Did Treatments Improve During the Renaissance?',
    examType: 'q3_q4',
    left: {
      tag: 'Topic 2 • Comprehensive Knowledge Masterclass',
      headline: 'The Anatomical Revolution: Andreas Vesalius',
      summary:
        'In 1543, Andreas Vesalius transformed anatomy by carrying out direct human dissections. By publishing *De Humani Corporis Fabrica* with magnificent master engravings, he disproved over 300 anatomical errors made by Galen, establishing that Galen had only dissected animals.',
      pillars: [
        {
          id: 'vesalius',
          title: 'Andreas Vesalius (1514–1564)',
          subtitle: 'Professor of Surgery at Padua',
          image: '/images/vesalius_muscle_men.jpg',
          iconFallback: '🦴',
          bullets: [
            'Conducted public human dissections himself, rather than sitting in a high chair reading Galen.',
            'Published *De Humani Corporis Fabrica* (On the Fabric of the Human Body) in 1543.',
            'Disproved fundamental Galenic dogmas: the human lower jaw is one single bone (not two), and the septum has no invisible pores.',
          ],
        },
        {
          id: 'humanism',
          title: 'Direct Observation vs Galen',
          subtitle: 'Empirical Human Anatomy',
          image: '/images/default_person.svg',
          iconFallback: '👁️',
          bullets: [
            'Showed that the human liver has two lobes, not five as Galen claimed from dissecting pigs.',
            'Proved that the breastbone consists of three parts, not seven like an ape.',
            'Urged medical students to investigate real human cadavers rather than accepting ancient authority.',
          ],
        },
        {
          id: 'opposition',
          title: 'Medical Opposition & Limits',
          subtitle: 'The Conservative Backlash',
          image: '/images/default_person.svg',
          iconFallback: '⚔️',
          bullets: [
            'Traditional doctors like Jacobus Sylvius attacked Vesalius, claiming the human body had deformed since Galen’s time.',
            'Forced to resign his professorship at Padua due to conservative hostility.',
            'Crucial limitation: disproving Galen’s anatomy did not lead to immediate cures or better treatments for patients.',
          ],
        },
      ],
      vectors: [
        {
          from: 'Human Dissection',
          to: 'Fabrica (1543)',
          text: 'Artist engravings accurately depicted musculature, nerves, and vascular systems.',
        },
        {
          from: 'Galen Errors',
          to: 'Sylvius Backlash',
          text: 'Conservative physicians refused to acknowledge Galen had dissected dogs and apes.',
        },
        {
          from: 'Anatomy',
          to: 'Harvey',
          text: 'Vesalius mapped vein valves, laying the direct anatomical groundwork for William Harvey.',
        },
      ],
      middleBox: {
        title: 'Anatomical Breakthroughs: Galen’s Claims vs Vesalius’s Empirical Proof',
        links: [
          {
            era: 'Lower Jawbone',
            badge: 'Galen: Two Bones | Vesalius: One Single Bone',
            text: 'Galen dissected dogs; canine mandibles have two fused segments. Vesalius demonstrated the human jaw is a single rigid structure.',
          },
          {
            era: 'Cardiac Septum',
            badge: 'Galen: Porous Wall | Vesalius: Solid Muscle',
            text: 'Galen claimed blood passed invisibly through the septum between ventricles. Vesalius proved the wall was thick, muscular, and non-porous.',
          },
        ],
      },
      bottomBox: {
        title: '3 Reasons: Why Vesalius Faced Severe Opposition From the Medical Establishment',
        points: [
          '**Threat to Physician Prestige:** Doctors had charged exorbitant fees based on their mastery of Galen; admitting Galen was wrong undermined their authority.',
          '**Religious Orthodoxy:** The Church had endorsed Galen for over a thousand years; questioning his accuracy bordered on theological heresy.',
          '**Lack of Immediate Clinical Value:** Critics pointed out that knowing the exact structure of the jaw or spleen did not cure the plague or heal broken limbs.',
        ],
      },
    },
    right: {
      type: 'q3_q4',
      totalMarks: 16,
      q3: {
        type: 'difference',
        title: 'Edexcel GCSE (9–1) Paper 1 • Question 3 [4 Marks]',
        question:
          'Explain one way in which methods of studying the human body in the Renaissance (c.1500–c.1700) were different from methods used in the Medieval period (c.1250–c.1500).',
        guidance:
          'Timing: 5 mins • Structure: 1 developed comparative PEEL paragraph. (e.g. Reliance on books vs direct dissection: Medieval universities relied strictly on reading Galen while a barber sliced, whereas Renaissance anatomists like Vesalius personally dissected human cadavers and recorded empirical findings).',
        lines: 8,
      },
      q4: {
        title: 'Edexcel GCSE (9–1) Paper 1 • Question 4 [12 Marks]',
        question:
          'Explain why there was opposition to the medical discoveries of Andreas Vesalius in the 16th century.',
        stimulus: ['Galen’s medical ideas', 'The medical establishment'],
        note: '(You must also use information of your own.) [12 marks]',
        guidance:
          'Timing: 18 mins • Structure: 3 fully developed PEEL paragraphs (P1: Continued reverence for Galen, P2: Resistance from established university professors like Sylvius, P3: Own knowledge - lack of practical cures resulting from anatomy).',
        lines: 24,
      },
    },
  },

  {
    id: 'lesson_2_3',
    topic: 'Topic 2: The Medical Renaissance (c.1500–c.1700)',
    title: 'KT2.3: How Significant Were William Harvey and the Great Plague (1665)?',
    examType: 'essay_16m',
    left: {
      tag: 'Topic 2 • Comprehensive Knowledge Masterclass',
      headline: 'Circulation &amp; Epidemics: William Harvey &amp; The 1665 Plague',
      summary:
        'In 1628, William Harvey revolutionised physiology by proving that blood circulates continuously through the body, pumped by the heart. Yet when the Great Plague struck in 1665, medical science was still helpless, demonstrating the vast chasm between scientific discovery and medical treatment.',
      pillars: [
        {
          id: 'harvey',
          title: 'William Harvey (1578–1657)',
          subtitle: 'Physician to James I & Charles I',
          image: '/images/harvey_veins.jpg',
          iconFallback: '❤️',
          bullets: [
            'Published *De Motu Cordis* (On the Motion of the Heart) in 1628.',
            'Proved blood circulates in a closed one-way loop pumped by the heart as a muscle.',
            'Disproved Galen’s theory that the liver constantly manufactured new blood consumed by body tissues.',
          ],
        },
        {
          id: 'harvey_method',
          title: 'Harvey’s Scientific Method',
          subtitle: 'Mechanical & Quantitative Proof',
          image: '/images/default_person.svg',
          iconFallback: '📐',
          bullets: [
            'Used mechanical water pumps as an analogy for the cardiac cycle.',
            'Calculated that the liver would have to produce 540 pounds of blood per hour to match Galen’s theory.',
            'Demonstrated one-way venous valves by tying tight tourniquets on human arms and pushing blood backwards.',
          ],
        },
        {
          id: 'great_plague',
          title: 'The Great Plague (1665)',
          subtitle: 'London Epidemic Catastrophe',
          image: '/images/plague_burial.jpg',
          iconFallback: '🔔',
          bullets: [
            'Killed approximately 100,000 Londoners (nearly 20% of the city’s population).',
            'Enforced quarantine: houses padlocked with red crosses painted on doors ("Lord Have Mercy On Us").',
            'Official searchers inspected corpses; mass plague pits; dogs and cats systematically slaughtered.',
          ],
        },
      ],
      vectors: [
        {
          from: 'Mechanical Pumps',
          to: 'Heart Circulation',
          text: 'Harvey treated the heart as an engineered hydraulic pump rather than a furnace.',
        },
        {
          from: 'Harvey’s Theory',
          to: 'Medical Inertia',
          text: 'Critics called him "Circulator" (quack); it took 50 years for universities to teach circulation.',
        },
        {
          from: 'Circulation',
          to: '1665 Plague',
          text: 'Proving blood circulated could not cure plague; treatments in 1665 remained superstitious.',
        },
      ],
      middleBox: {
        title: 'Circulation Evidence: Harvey’s Tourniquet Experiment',
        links: [
          {
            era: 'Tourniquet on Forearm',
            badge: 'Vein Swelling & Valve Action',
            text: 'Harvey tied a tourniquet tight enough to stop venous flow but allow arterial flow. Veins swelled at valves; attempting to push blood away from the heart proved impossible.',
          },
          {
            era: 'Capillary Deduction',
            badge: 'Predicting Capillaries',
            text: 'Harvey knew arteries and veins must connect, but had no microscope. Marcello Malpighi physically proved his theory in 1661 using early microscope optics.',
          },
        ],
      },
      bottomBox: {
        title:
          'Synoptic Cross-Era Comparative Evidence Bank: The Impact of Individuals in Medicine (c.1500–c.1800)',
        points: [
          '**Individual Pioneers Sparked Empirical Revolutions:** Vesalius (1543) disproved Galen’s anatomy; Harvey (1628) proved circulation; Jenner (1796) developed the first smallpox vaccination through direct observation.',
          '**Severe Lag in Clinical Applications:** Vesalius’s anatomy did not cure disease; Harvey’s circulation could not prevent the 1665 Great Plague or stop doctors bloodletting for another 200 years.',
          '**Institutions & Technology Were Critical Catalysts:** Individuals relied on Gutenberg’s printing press to publish drawings, the Royal Society to validate results, and microscopes to confirm cellular biology.',
        ],
      },
    },
    right: {
      type: 'essay_16m',
      totalMarks: 20,
      essay: {
        title: 'Edexcel GCSE (9–1) Paper 1 • Question 5 / 6 [16 Marks + 4 SPaG = 20 Marks]',
        statement:
          '"Individuals were the main factor leading to medical breakthroughs in the period c.1500–c.1800." How far do you agree? Explain your answer.',
        spanNote:
          'Chronological Scope: c.1500–c.1800 (Renaissance through 18th Century Comparison)',
        stimulus: ['William Harvey', 'The Royal Society'],
        ownKnowledgeNote: '(You must also use information of your own.) [16 marks + 4 marks SPaG]',
        guidance:
          'Timing: 25 mins • Structure: Criteria Intro → Paragraph 1 (Agree: Role of individuals like Harvey / Vesalius) → Paragraph 2 (Disagree: Role of institutions like The Royal Society / universities) → Paragraph 3 (Own Knowledge: Technological factors like the printing press / microscopes, or Jenner 1796) → Sustained Conclusion weighing the relative importance of individual genius vs enabling technologies.',
        checklist: [
          '1. Direct Engagement & Criteria (Define "main factor" vs enabling factors)',
          '2. Argument 1 (Agree: Harvey’s calculation & dissection disproving Galen)',
          '3. Argument 2 (Disagree: The Royal Society verifying experiments & publishing journals)',
          '4. Argument 3 (Own Knowledge: Printing press spreading accurate texts / Vesalius or Jenner)',
          '5. Sustained Judgement (Weigh whether individual breakthroughs could succeed without collaborative institutions)',
        ],
        lines: 28,
      },
    },
  },

  // ==========================================
  // TOPIC 3: 18th & 19th CENTURY (c.1700–c.1900)
  // ==========================================
  {
    id: 'lesson_3_1',
    topic: 'Topic 3: 18th & 19th Century (c.1700–c.1900)',
    title: 'KT3.1: What Breakthrough Discoveries Changed Our Understanding of Disease Causes?',
    examType: 'q3_q4',
    left: {
      tag: 'Topic 3 • Comprehensive Knowledge Masterclass',
      headline: 'The Microbe Revolution: Pasteur &amp; Koch',
      summary:
        'In 1861, Louis Pasteur published Germ Theory, proving that microscopic organisms in the air caused decay and disease, shattering Spontaneous Generation. In the 1870s and 1880s, Robert Koch identified the specific bacteria causing deadly diseases, transforming medicine into a rigorous laboratory science.',
      pillars: [
        {
          id: 'pasteur',
          title: 'Louis Pasteur (1822–1895)',
          subtitle: 'Father of Germ Theory (1861)',
          image: '/images/pasteur_lab.jpg',
          iconFallback: '🧪',
          bullets: [
            'Used swan-neck flask experiments to prove that sterile liquids only ferment when exposed to airborne microbes.',
            'Proved microorganisms cause decay and disease, disproving Spontaneous Generation.',
            'Later developed weakened rabies and anthrax vaccines, inspired by Jenner’s smallpox work.',
          ],
        },
        {
          id: 'koch',
          title: 'Robert Koch (1843–1910)',
          subtitle: 'The Microbe Hunter',
          image: '/images/default_person.svg',
          iconFallback: '🧫',
          bullets: [
            'Identified the specific bacterium for anthrax (1876), tuberculosis (1882), and cholera (1883).',
            'Pioneered revolutionary lab methods: agar jelly to grow pure cultures and methyl violet staining dyes.',
            'Transformed bacteriology into an objective science, photographing microbes through microscopes.',
          ],
        },
        {
          id: 'reception',
          title: 'British Medical Inertia',
          subtitle: 'Resistance to Microbes',
          image: '/images/default_person.svg',
          iconFallback: '⏳',
          bullets: [
            'British establishment led by Dr Charlton Bastian clung stubbornly to Spontaneous Generation and miasma.',
            'Doctors refused to believe invisible organisms could kill massive human beings.',
            'Only gained universal acceptance in Britain after John Tyndall lectured on Pasteur and Koch identified cholera in 1883.',
          ],
        },
      ],
      vectors: [
        {
          from: 'Swan-Neck Flask',
          to: 'Germ Theory (1861)',
          text: 'Pasteur proved airborne microbes caused sour wine and beer spoilage.',
        },
        {
          from: 'Pasteur Theory',
          to: 'Koch Staining',
          text: 'Koch proved Pasteur’s theory by isolating the exact bacteria causing human death.',
        },
        {
          from: 'Koch Microbes',
          to: 'Surgery & Water',
          text: 'Lister used Pasteur’s work for carbolic spray; public health cleaned water supplies.',
        },
      ],
      middleBox: {
        title: 'Laboratory Breakthrough: Koch’s 4 Postulates &amp; Agar Cultures',
        links: [
          {
            era: 'Chemical Staining Dyes',
            badge: 'Visualising Bacteria',
            text: 'Bacteria were invisible under light microscopes. Koch used synthetic industrial dyes (methyl violet) to stain bacteria, making their structures unmistakable.',
          },
          {
            era: 'Petri Dishes & Agar Jelly',
            badge: 'Pure Microbe Colonies',
            text: 'Previously bacteria were mixed in liquid broths. Koch used agar jelly in glass dishes to breed pure, unmixed bacterial cultures.',
          },
        ],
      },
      bottomBox: {
        title: '3 Reasons: Why British Doctors Resisted Germ Theory in the 1860s and 1870s',
        points: [
          '**Entrenched Miasma Theory:** Florence Nightingale and the public health board firmly believed bad smells caused fever; cleaning waste already reduced deaths.',
          '**Microscopic Invisibility:** Everyday GPs did not own high-powered achromatic microscopes; they could not see bacteria in their daily clinical rounds.',
          '**Lack of Immediate Cures:** Finding bacteria did not instantly heal sick patients; antibiotics did not arrive until the 20th century.',
        ],
      },
    },
    right: {
      type: 'q3_q4',
      totalMarks: 16,
      q3: {
        type: 'difference',
        title: 'Edexcel GCSE (9–1) Paper 1 • Question 3 [4 Marks]',
        question:
          'Explain one way in which ideas about the cause of disease in the late 19th century (c.1860–c.1900) were different from ideas in the early 18th century (c.1700–c.1750).',
        guidance:
          'Timing: 5 mins • Structure: 1 developed comparative PEEL paragraph. (e.g. Scientific specificity of cause: Early 18th-century doctors blamed broad miasma and humoral balance, whereas late 19th-century doctors used Pasteur’s Germ Theory and Koch’s bacteriology to identify specific microscopic pathogens like the cholera or TB bacterium).',
        lines: 8,
      },
      q4: {
        title: 'Edexcel GCSE (9–1) Paper 1 • Question 4 [12 Marks]',
        question:
          'Explain why it took time for Louis Pasteur’s Germ Theory to be accepted in Britain between 1861 and 1880.',
        stimulus: ['Spontaneous generation', 'Florence Nightingale'],
        note: '(You must also use information of your own.) [12 marks]',
        guidance:
          'Timing: 18 mins • Structure: 3 fully developed PEEL paragraphs (P1: Entrenched belief in Spontaneous Generation / Dr Bastian, P2: Florence Nightingale & miasma sanitarians, P3: Own knowledge - lack of direct bacterial proof until Koch / lack of microscopes among British GPs).',
        lines: 24,
      },
    },
  },

  {
    id: 'lesson_3_2',
    topic: 'Topic 3: 18th & 19th Century (c.1700–c.1900)',
    title: 'KT3.2: How Did Surgery and Hospitals Transform (1840–1900)?',
    examType: 'q3_q4',
    left: {
      tag: 'Topic 3 • Comprehensive Knowledge Masterclass',
      headline: 'The Surgical &amp; Hospital Revolution: Pain, Infection &amp; Care',
      summary:
        'Before 1850, surgery was brutal and lethal due to the three surgical killers: Pain, Infection, and Blood Loss. Between 1847 and 1890, James Simpson introduced chloroform, Joseph Lister pioneered carbolic acid antisepsis, and Florence Nightingale transformed hospital hygiene.',
      pillars: [
        {
          id: 'simpson',
          title: 'James Simpson (1811–1870)',
          subtitle: 'Discovery of Chloroform (1847)',
          image: '/images/default_person.svg',
          iconFallback: '💨',
          bullets: [
            'Discovered chloroform’s anaesthetic properties during home experiments with colleagues.',
            'Allowed deep, painless surgery; gained national acceptance when Queen Victoria used it in childbirth (1853).',
            'Led to the "Black Period" of surgery (1846–1870): longer, deeper operations increased internal gangrene deaths.',
          ],
        },
        {
          id: 'lister',
          title: 'Joseph Lister (1827–1912)',
          subtitle: 'Carbolic Acid Antisepsis (1865)',
          image: '/images/default_person.svg',
          iconFallback: '🧼',
          bullets: [
            'Read Pasteur’s Germ Theory; realised wound sepsis was caused by airborne bacteria.',
            'Used carbolic acid spray on surgical incisions, dressings, instruments, and surgeon hands.',
            'Reduced his surgical ward mortality rate from 46% to 15% in just three years (1865–1868).',
          ],
        },
        {
          id: 'nightingale',
          title: 'Florence Nightingale (1820–1910)',
          subtitle: 'Modern Nursing & Hospital Reform',
          image: '/images/nightingale.jpg',
          iconFallback: '🕯️',
          bullets: [
            'Reformed Scutari military hospital during Crimean War (1854); reduced death rate from 42% to 2%.',
            'Advocated the **Pavilion Hospital Plan**: separate wards, huge windows, high ceilings, cross-ventilation.',
            'Published *Notes on Nursing* (1859); established first professional training school at St Thomas’ Hospital.',
          ],
        },
      ],
      vectors: [
        {
          from: 'Chloroform (1847)',
          to: 'Deeper Operations',
          text: 'Surgeons could take time, but operating in filthy clothes introduced fatal microbes.',
        },
        {
          from: 'Pasteur Theory',
          to: 'Lister Carbolic (1865)',
          text: 'Lister connected carbolic sewage treatment in Carlisle to killing wound germs.',
        },
        {
          from: 'Antisepsis',
          to: 'Aseptic Surgery (1890s)',
          text: 'Shifted from killing germs in the wound to preventing germs entering: autoclaves, rubber gloves, surgical masks.',
        },
      ],
      middleBox: {
        title: 'The Evolution of the Operating Theatre: 1840 vs 1895',
        links: [
          {
            era: '1840 Operating Theatre',
            badge: 'Speed & Filth',
            text: 'Surgeons operated in blood-encrusted coats. Speed was the sole virtue (amputation in 30 seconds); patients restrained by orderlies; tools unwashed between operations.',
          },
          {
            era: '1895 Aseptic Operating Theatre',
            badge: 'Total Sterilisation',
            text: 'Steam sterilisers (autoclaves) baked instruments; surgeons scrubbed hands and wore clean white gowns, boiled rubber gloves (Halsted), and face masks.',
          },
        ],
      },
      bottomBox: {
        title: '3 Key Factors: Why Surgery Became Dramatically Safer Between 1860 and 1890',
        points: [
          '**Overcoming Infection:** Lister’s carbolic acid and the transition to aseptic theatre environments eradicated hospital gangrene and sepsis.',
          '**Effective Pain Management:** Chloroform (and later ether/nitrous oxide) prevented fatal physiological shock and enabled complex abdominal surgery.',
          '**Professionalised Nursing:** Nightingale’s trained nurses maintained strict ward hygiene, fresh air, clean laundry, and nutritious patient diets.',
        ],
      },
    },
    right: {
      type: 'q3_q4',
      totalMarks: 16,
      q3: {
        type: 'similarity',
        title: 'Edexcel GCSE (9–1) Paper 1 • Question 3 [4 Marks]',
        question:
          'Explain one way in which opposition to medical change in the 19th century was similar to opposition in the 18th century.',
        guidance:
          'Timing: 5 mins • Structure: 1 developed comparative PEEL paragraph. (e.g. Religious and moral objections to interfering with God’s natural order: In the 18th century, preachers opposed Jenner’s vaccine because taking animal matter was seen as ungodly; in the 19th century, ministers opposed Simpson’s chloroform because pain in childbirth was declared God’s divine punishment in the Bible).',
        lines: 8,
      },
      q4: {
        title: 'Edexcel GCSE (9–1) Paper 1 • Question 4 [12 Marks]',
        question:
          'Explain why surgery became significantly safer in the period between 1860 and 1890.',
        stimulus: ['Joseph Lister', 'Aseptic surgery'],
        note: '(You must also use information of your own.) [12 marks]',
        guidance:
          'Timing: 18 mins • Structure: 3 fully developed PEEL paragraphs (P1: Lister’s carbolic acid antisepsis, P2: Transition to aseptic techniques / autoclaves & rubber gloves, P3: Own knowledge - Nightingale’s clean hospital pavilions / improved anaesthetic dosing).',
        lines: 24,
      },
    },
  },

  {
    id: 'lesson_3_3',
    topic: 'Topic 3: 18th & 19th Century (c.1700–c.1900)',
    title: 'KT3.3: How Significant Were Edward Jenner and John Snow?',
    examType: 'essay_16m',
    left: {
      tag: 'Topic 3 • Comprehensive Knowledge Masterclass',
      headline: 'Prevention Pioneers: Edward Jenner &amp; John Snow',
      summary:
        'Edward Jenner and John Snow achieved monumental breakthroughs in disease prevention through meticulous empirical observation, decades before the microscope identified pathogens. Jenner invented the world’s first vaccination (1796), while Snow mapped the Broad Street pump to prove cholera was waterborne (1854).',
      pillars: [
        {
          id: 'jenner',
          title: 'Edward Jenner (1749–1823)',
          subtitle: 'The Smallpox Vaccine (1796)',
          image: '/images/default_person.svg',
          iconFallback: '💉',
          bullets: [
            'Noticed milkmaids who caught mild cowpox never developed deadly, disfiguring smallpox.',
            'Tested his hypothesis on James Phipps (1796); inoculated him with cowpox and then smallpox; no disease developed.',
            'Published findings in 1798; British government awarded £30,000 grants; made smallpox vaccine compulsory in 1853.',
          ],
        },
        {
          id: 'snow',
          title: 'Dr John Snow (1813–1858)',
          subtitle: 'The Cholera Detective (1854)',
          image: '/images/john_snow_cholera_map.jpg',
          iconFallback: '💧',
          bullets: [
            'Investigated the 1854 Soho cholera outbreak; created a spatial spot-map plotting cholera deaths around water pumps.',
            'Proved 93 deaths were clustered around the Broad Street pump, where a cracked cesspit leaked into the well.',
            'Removed the pump handle, abruptly ending the Soho outbreak and proving cholera was waterborne, not miasmatic.',
          ],
        },
        {
          id: 'state_action',
          title: 'Public Health Acts & Sanitation',
          subtitle: 'From Laissez-Faire to Clean Water',
          image: '/images/bazalgette_sewer.jpg',
          iconFallback: '🏛️',
          bullets: [
            'Edwin Chadwick’s 1842 Report highlighted that filth caused pauperism and epidemic disease.',
            'The Great Stink of 1858 forced Parliament to fund Joseph Bazalgette’s massive London sewer network (1865).',
            '**1875 Public Health Act:** Compulsory law requiring councils to provide clean piped water and collect sewage.',
          ],
        },
      ],
      vectors: [
        {
          from: 'Cowpox Observation',
          to: 'Vaccination (1796)',
          text: 'Jenner replaced dangerous live smallpox inoculation with safe bovine cowpox.',
        },
        {
          from: 'Spot Map (1854)',
          to: 'Broad Street Pump',
          text: 'Snow’s epidemiology proved contaminated drinking water carried cholera.',
        },
        {
          from: 'Snow & Chadwick',
          to: '1875 Public Health Act',
          text: 'Overturned government laissez-faire policy, legally mandating sanitary infrastructure.',
        },
      ],
      middleBox: {
        title: 'Epidemiological Investigation: John Snow’s Broad Street Spot Map (1854)',
        links: [
          {
            era: 'The Broad Street Brewery Anomaly',
            badge: 'Control Group Proof',
            text: 'Snow discovered workers at the local brewery on Broad Street drank only free beer and used their own deep well; none caught cholera, disproving airborne miasma.',
          },
          {
            era: 'The Eley Factory Victim',
            badge: 'Crucial Distance Proof',
            text: 'A wealthy widow in Hampstead had Broad Street water brought to her because she liked its sparkling taste; she died of cholera, confirming water transmission.',
          },
        ],
      },
      bottomBox: {
        title:
          'Synoptic Cross-Era Comparative Evidence Bank: The Prevention of Disease (c.1750–present)',
        points: [
          '**Vaccination Programmes Eradicated Deadly Killers:** Jenner’s smallpox vaccine was made compulsory in Britain (1853) and eradicated globally by WHO (1980). Modern 20th-century national campaigns eliminated diphtheria, polio, and measles.',
          '**Sanitation & Clean Water Transformed Life Expectancy:** Bazalgette’s London sewers (1865) and the compulsory 1875 Public Health Act permanently stopped cholera, typhoid, and dysentery before antibiotics existed.',
          '**Government Legislation Replaced Laissez-Faire:** Prevention evolved from individual philanthropy to national state mandates: compulsory childhood vaccination, clean air acts, food standards, and anti-smoking indoor bans (2007).',
        ],
      },
    },
    right: {
      type: 'essay_16m',
      totalMarks: 20,
      essay: {
        title: 'Edexcel GCSE (9–1) Paper 1 • Question 5 / 6 [16 Marks + 4 SPaG = 20 Marks]',
        statement:
          '"The development of vaccinations was the most important breakthrough in the prevention of disease in the period c.1750–present." How far do you agree? Explain your answer.',
        spanNote:
          'Chronological Scope: c.1750–present (18th Century through Modern Era Thematic Comparison)',
        stimulus: ['Edward Jenner’s smallpox vaccine', 'The 1875 Public Health Act'],
        ownKnowledgeNote: '(You must also use information of your own.) [16 marks + 4 marks SPaG]',
        guidance:
          'Timing: 25 mins • Structure: Criteria Intro → Paragraph 1 (Agree: Impact of Jenner and 20th-century mass vaccination campaigns like polio/measles) → Paragraph 2 (Disagree: Public health legislation & sanitation like the 1875 Act and Bazalgette sewers) → Paragraph 3 (Own Knowledge: Modern prevention like lifestyle campaigns / anti-smoking bans / clean air acts) → Sustained Conclusion weighing whether biological immunisation or municipal environmental sanitation saved more lives.',
        checklist: [
          '1. Direct Engagement & Criteria (Define "most important breakthrough" across prevention)',
          '2. Argument 1 (Agree: Jenner’s smallpox vaccine 1796 & 20th C polio/measles programmes)',
          '3. Argument 2 (Disagree: 1875 Public Health Act & Bazalgette sewers eliminating waterborne plague)',
          '4. Argument 3 (Own Knowledge: John Snow’s pump removal / Clean Air Acts & modern lifestyle prevention)',
          '5. Sustained Judgement (Weigh relative significance: immunisation targets specific pathogens, but sanitation rescued entire populations)',
        ],
        lines: 28,
      },
    },
  },

  // ==========================================
  // TOPIC 4: MODERN MEDICINE (c.1900–PRESENT)
  // ==========================================
  {
    id: 'lesson_4_1',
    topic: 'Topic 4: Modern Medicine (c.1900–present)',
    title: 'KT4.1: How Have Modern Discoveries Changed Our Understanding of Illness?',
    examType: 'q3_q4',
    left: {
      tag: 'Topic 4 • Comprehensive Knowledge Masterclass',
      headline: 'The Diagnostic &amp; Genetic Revolution: DNA to High-Tech Scans',
      summary:
        'In the 20th century, the discovery of DNA’s double helix and the Human Genome Project uncovered the genetic code of life. Simultaneously, physics and engineering revolutionized medical diagnostics with X-rays, ultrasound, CT scans, and MRI imaging, allowing doctors to look inside living bodies without surgery.',
      pillars: [
        {
          id: 'dna',
          title: 'Crick, Watson & Franklin',
          subtitle: 'The Double Helix (1953)',
          image: '/images/dna_structure.jpg',
          iconFallback: '🧬',
          bullets: [
            'Francis Crick and James Watson decoded DNA’s double-helix structure at Cambridge University.',
            'Relied on Rosalind Franklin’s critical "Photo 51" X-ray diffraction image (without her permission).',
            'Proved DNA carries the genetic code controlling all human characteristics and hereditary disorders.',
          ],
        },
        {
          id: 'genome',
          title: 'Human Genome Project (1990–2003)',
          subtitle: 'Mapping the Genetic Blueprint',
          image: '/images/default_person.svg',
          iconFallback: '💻',
          bullets: [
            'Global collaboration led by James Watson; sequenced all 3 billion chemical base pairs in human DNA.',
            'Identified genes causing cystic fibrosis, Huntington’s disease, Down’s syndrome, and breast cancer (BRCA1).',
            'Enabled gene therapy, personalised medicine, and screening parents for inherited conditions.',
          ],
        },
        {
          id: 'scans',
          title: 'Diagnostic Technology',
          subtitle: 'Imaging & Laboratory Testing',
          image: '/images/default_person.svg',
          iconFallback: '🖥️',
          bullets: [
            '**CT Scans (1972):** Godfrey Hounsfield used X-rays and computers to produce 3D cross-sectional body slices.',
            '**MRI Scans (1977):** Radio waves and magnetic fields detect soft tissue tumours, brain strokes, and ligament tears.',
            'Blood tests and endoscopes allow non-invasive detection of enzyme markers, blood sugar, and ulcers.',
          ],
        },
      ],
      vectors: [
        {
          from: 'Photo 51 (1952)',
          to: 'Double Helix (1953)',
          text: 'Franklin’s X-ray diffraction provided the geometric proof for Crick & Watson’s 3D wire model.',
        },
        {
          from: 'DNA Mapping',
          to: 'Gene Therapy',
          text: 'Sequencing human chromosomes opened the door to targeted genetic therapies and embryo screening.',
        },
        {
          from: 'X-Rays (1895)',
          to: 'CT & MRI Scans',
          text: 'Evolved from 2D bone shadowgraphs into full-colour 3D soft-tissue tomography.',
        },
      ],
      middleBox: {
        title: 'Diagnostic Contrast: Medieval Uroscopy vs Modern Molecular Medicine',
        links: [
          {
            era: 'Medieval Diagnosis (c.1350)',
            badge: 'Uroscopy Wheel & Pulse',
            text: 'Physicians inspected urine flasks for colour, sediment, and taste; checked pulse against astrological zodiac charts. Inability to identify internal disease.',
          },
          {
            era: 'Modern Diagnosis (c.2000)',
            badge: 'Molecular & Digital Scans',
            text: 'Automated blood analysers detect specific enzyme imbalances; MRI scans produce real-time 3D images; genetic screening predicts cancer vulnerability decades before symptoms appear.',
          },
        ],
      },
      bottomBox: {
        title: '3 Key Impacts: How Genetics &amp; High-Tech Transformed Medicine',
        points: [
          '**Understanding Hereditary Conditions:** Medicine moved beyond infectious microbes to understand genetic diseases that cannot be cured by antibiotics.',
          '**Personalised Targeted Pharmacology:** Doctors can tailor chemotherapy and drug treatments to a patient’s specific DNA profile.',
          '**Early Non-Invasive Detection:** Scanners and blood tests locate malignant tumours when they are microscopically tiny, saving millions of lives.',
        ],
      },
    },
    right: {
      type: 'q3_q4',
      totalMarks: 16,
      q3: {
        type: 'difference',
        title: 'Edexcel GCSE (9–1) Paper 1 • Question 3 [4 Marks]',
        question:
          'Explain one way in which methods of diagnosing illness in the Modern period (c.1900–present) are different from methods used in the Medieval period (c.1250–c.1500).',
        guidance:
          'Timing: 5 mins • Structure: 1 developed comparative PEEL paragraph. (e.g. Scientific technology vs sensory observation: Medieval physicians relied on urine colour charts (uroscopy) and astrology without internal observation, whereas modern doctors use high-tech imaging like MRI/CT scans and genetic blood testing to identify cellular and internal structural causes directly).',
        lines: 8,
      },
      q4: {
        title: 'Edexcel GCSE (9–1) Paper 1 • Question 4 [12 Marks]',
        question:
          'Explain why the discovery of the structure of DNA in 1953 led to significant advances in understanding and treating disease.',
        stimulus: ['The Human Genome Project', 'Genetic screening'],
        note: '(You must also use information of your own.) [12 marks]',
        guidance:
          'Timing: 18 mins • Structure: 3 fully developed PEEL paragraphs (P1: Human Genome Project & identifying disease genes, P2: Genetic screening & preventative medicine like BRCA1, P3: Own knowledge - personalised medicine / gene therapy / understanding non-infectious conditions).',
        lines: 24,
      },
    },
  },

  {
    id: 'lesson_4_2',
    topic: 'Topic 4: Modern Medicine (c.1900–present)',
    title: 'KT4.2: How Have Prevention and Treatment Advanced in the Modern Era?',
    examType: 'q3_q4',
    left: {
      tag: 'Topic 4 • Comprehensive Knowledge Masterclass',
      headline: 'Chemical Cures &amp; The NHS: Magic Bullets to Universal Care',
      summary:
        'In the early 20th century, scientists created "magic bullets" — synthetic chemicals designed to seek out and kill specific microbes without harming the human body. In 1948, the British government established the National Health Service (NHS), providing free healthcare from cradle to grave.',
      pillars: [
        {
          id: 'ehrlich',
          title: 'Paul Ehrlich (1854–1915)',
          subtitle: 'The First Magic Bullet: Salvarsan 606 (1909)',
          image: '/images/default_person.svg',
          iconFallback: '🎯',
          bullets: [
            'Worked with Robert Koch; realised synthetic dyes stained specific microbes and hypothesized chemical antibodies.',
            'Tested 606 arsenic compounds with Sahachiro Hata; discovered Salvarsan 606 cured syphilis (1909).',
            'First man-made synthetic chemical drug targeting a specific internal bacterium.',
          ],
        },
        {
          id: 'domagk',
          title: 'Gerhard Domagk (1895–1964)',
          subtitle: 'The Second Magic Bullet: Prontosil (1932)',
          image: '/images/default_person.svg',
          iconFallback: '🔴',
          bullets: [
            'Discovered that a bright red leather dye, Prontosil, stopped fatal streptococcus infections in mice.',
            'Successfully treated his own daughter when she developed severe blood poisoning from an infected needle prick.',
            'Active ingredient was sulphonamide; led to mass-produced cure for puerperal fever, saving thousands of mothers.',
          ],
        },
        {
          id: 'nhs',
          title: 'Aneurin Bevan & The NHS (1948)',
          subtitle: 'Free Universal Healthcare',
          image: '/images/default_person.svg',
          iconFallback: '🏥',
          bullets: [
            'Health Minister Aneurin Bevan spearheaded the NHS Act 1946; launched on 5 July 1948 at Park Hospital, Davyhulme.',
            'Founded on three principles: free at point of delivery, universal for all citizens, funded by general taxation.',
            'Overcame intense opposition from the British Medical Association (BMA); Bevan "stuffed their mouths with gold" by letting consultants keep private beds.',
          ],
        },
      ],
      vectors: [
        {
          from: 'Chemical Dyes',
          to: 'Salvarsan 606 (1909)',
          text: 'Ehrlich turned chemical stain technology into the world’s first targeted synthetic drug.',
        },
        {
          from: 'Prontosil (1932)',
          to: 'Sulphonamide Class',
          text: 'Domagk’s red dye launched an entire class of synthetic antibiotics curing pneumonia and scarlet fever.',
        },
        {
          from: 'Beveridge Report',
          to: 'NHS Launch (1948)',
          text: 'Post-war Labour government demolished the private insurance barrier to medical care.',
        },
      ],
      middleBox: {
        title: 'Healthcare Availability: Pre-1948 Private Insurance vs Post-1948 NHS',
        links: [
          {
            era: 'Pre-1948 Healthcare in Britain',
            badge: 'Inequality & Friendly Societies',
            text: 'Working men had limited National Insurance (1911), but wives, children, and the elderly were uninsured. Millions delayed seeing a doctor due to dread of catastrophic bills.',
          },
          {
            era: 'Post-1948 NHS Transformation',
            badge: 'Universal Equality',
            text: 'GPs, hospitals, specialists, dentists, spectacles, ambulances, and prescriptions became totally free for every citizen, dramatically reducing infant and maternal mortality.',
          },
        ],
      },
      bottomBox: {
        title: '3 Key Obstacles: Why the British Medical Association (BMA) Opposed the NHS in 1948',
        points: [
          '**Loss of Income:** Doctors feared becoming state-employed civil servants on fixed salaries rather than running private fee-charging practices.',
          '**Loss of Professional Independence:** The BMA argued government control would destroy doctor-patient confidentiality and clinical freedom.',
          '**Compromise to Win Doctors:** Bevan agreed that hospital consultants could retain private fee-paying beds within state hospitals.',
        ],
      },
    },
    right: {
      type: 'q3_q4',
      totalMarks: 16,
      q3: {
        type: 'similarity',
        title: 'Edexcel GCSE (9–1) Paper 1 • Question 3 [4 Marks]',
        question:
          'Explain one way in which the development of the magic bullet Salvarsan 606 was similar to the development of Prontosil.',
        guidance:
          'Timing: 5 mins • Structure: 1 developed comparative PEEL paragraph. (e.g. Reliance on chemical dyes and targeted synthetic testing: Both Ehrlich (Salvarsan 606 in 1909) and Domagk (Prontosil in 1932) investigated synthetic industrial chemical dyes to discover compounds that would kill specific bacteria (syphilis and streptococcus) without poisoning the human host).',
        lines: 8,
      },
      q4: {
        title: 'Edexcel GCSE (9–1) Paper 1 • Question 4 [12 Marks]',
        question:
          'Explain why the introduction of the National Health Service (NHS) in 1948 faced opposition.',
        stimulus: ['Doctors (BMA)', 'Cost of the service'],
        note: '(You must also use information of your own.) [12 marks]',
        guidance:
          'Timing: 18 mins • Structure: 3 fully developed PEEL paragraphs (P1: BMA fears over income & civil service status, P2: Financial cost & soaring prescription demand, P3: Own knowledge - ideological opposition to state medicine / Bevan’s compromises with consultants).',
        lines: 24,
      },
    },
  },

  {
    id: 'lesson_4_3',
    topic: 'Topic 4: Modern Medicine (c.1900–present)',
    title: 'KT4.3: How Was Penicillin Discovered and Mass-Produced?',
    examType: 'q3_q4',
    left: {
      tag: 'Topic 4 • Comprehensive Knowledge Masterclass',
      headline: 'The Wonder Drug: Alexander Fleming, Florey &amp; Chain',
      summary:
        'In 1928, Alexander Fleming accidentally discovered penicillin mould killing staphylococcus bacteria in a petri dish. A decade later, Howard Florey and Ernst Chain purified penicillin into a stable medicine. With the onset of WWII, the US government mass-produced it, saving millions of lives on D-Day and transforming modern medicine.',
      pillars: [
        {
          id: 'fleming',
          title: 'Alexander Fleming (1881–1955)',
          subtitle: 'Accidental Discovery (1928)',
          image: '/images/fleming_petri_dish.jpg',
          iconFallback: '🧫',
          bullets: [
            'Returning from holiday to St Mary’s Hospital, noticed *Penicillium notatum* mould had contaminated a staphylococcus culture.',
            'Observed a bacteria-free ring around the mould, proving it secreted a bacteria-killing substance.',
            'Published his discovery in 1929; lacked funding and chemical expertise to purify the unstable mould juice.',
          ],
        },
        {
          id: 'florey_chain',
          title: 'Howard Florey & Ernst Chain',
          subtitle: 'Oxford Purification Team (1938–41)',
          image: '/images/default_person.svg',
          iconFallback: '⚗️',
          bullets: [
            'Researched Fleming’s paper at Oxford; assembled a team using bedpans, milk churns, and bathtubs to brew mould.',
            'Tested pure penicillin on 8 infected mice in 1940: the 4 injected with penicillin survived, the untreated 4 died.',
            'Proved effective in human trials on Albert Alexander (1941); he recovered until supplies ran out and he died.',
          ],
        },
        {
          id: 'us_mass_prod',
          title: 'US Industrial Mass Production',
          subtitle: 'War Production Board (1941–44)',
          image: '/images/default_person.svg',
          iconFallback: '🏭',
          bullets: [
            'British factories bombed in Blitz; Florey flew to the USA in 1941 to convince American pharmaceutical giants.',
            'Discovered a super-strain of mould on a Peoria cantaloupe melon; grew it in deep corn-steep liquor fermentation tanks.',
            'By D-Day (June 1944), the US War Production Board produced enough penicillin to treat all allied casualties.',
          ],
        },
      ],
      vectors: [
        {
          from: 'Accidental Spore',
          to: 'Fleming Lab (1928)',
          text: 'Fleming left culture dishes unwashed on a bench, allowing stray mould to settle.',
        },
        {
          from: 'Fleming Paper',
          to: 'Oxford Team (1938)',
          text: 'Florey and Chain unlocked the biochemical purification Fleming could not achieve.',
        },
        {
          from: 'Peoria Cantaloupe',
          to: 'D-Day Mass Supply',
          text: 'US wartime subsidies enabled industrial pharmaceutical mass manufacture.',
        },
      ],
      middleBox: {
        title: 'The Miracle Mouse Experiment (1940) &amp; Albert Alexander (1941)',
        links: [
          {
            era: 'The 8 Mice Trial (1940)',
            badge: 'Laboratory Proof',
            text: 'Florey and Chain injected 8 mice with lethal doses of streptococcus. Four received penicillin; four did not. 16 hours later, the 4 untreated mice were dead; the treated mice were healthy.',
          },
          {
            era: 'Policeman Albert Alexander',
            badge: 'Tragic First Patient',
            text: 'Scratched by a rose thorn, Alexander was dying of septicemia. Penicillin revived him dramatically, but supplies ran out after 5 days; doctors recycled it from his urine, but he succumbed when it was exhausted.',
          },
        ],
      },
      bottomBox: {
        title: '3 Key Factors: Why Penicillin Was Successfully Mass-Produced During WWII',
        points: [
          '**Wartime Urgency:** The British and US military needed antibiotics to treat infected shrapnel and bullet wounds on the frontlines.',
          '**American Industrial Scale:** The US War Production Board spent millions subsidising pharmaceutical companies (Pfizer, Squibb) to build giant deep-fermentation tanks.',
          '**Multidisciplinary Collaboration:** Required Fleming’s observational discovery, Florey and Chain’s biochemical purification, and industrial chemical engineering.',
        ],
      },
    },
    right: {
      type: 'q3_q4',
      totalMarks: 16,
      q3: {
        type: 'difference',
        title: 'Edexcel GCSE (9–1) Paper 1 • Question 3 [4 Marks]',
        question:
          'Explain one way in which the development of Penicillin during the Second World War was different from the development of the Smallpox vaccine in 1796.',
        guidance:
          'Timing: 5 mins • Structure: 1 developed comparative PEEL paragraph. (e.g. Individual investigation vs large-scale state-funded team research: Jenner worked alone as a country doctor testing his hypothesis on one boy without government help, whereas Penicillin required a multi-person team (Florey, Chain) and massive industrial state funding from the US War Production Board).',
        lines: 8,
      },
      q4: {
        title: 'Edexcel GCSE (9–1) Paper 1 • Question 4 [12 Marks]',
        question:
          'Explain why penicillin was successfully developed and mass-produced in the 1940s.',
        stimulus: ['Howard Florey and Ernst Chain', 'The Second World War'],
        note: '(You must also use information of your own.) [12 marks]',
        guidance:
          'Timing: 18 mins • Structure: 3 fully developed PEEL paragraphs (P1: Florey and Chain’s purification & mouse trials, P2: The Second World War & military urgency for casualty care, P3: Own knowledge - US War Production Board / Peoria melon strain & deep-tank fermentation).',
        lines: 24,
      },
    },
  },

  {
    id: 'lesson_4_4',
    topic: 'Topic 4: Modern Medicine (c.1900–present)',
    title: 'KT4.4: How Has the Government Tackled the Epidemic of Lung Cancer?',
    examType: 'essay_16m',
    left: {
      tag: 'Topic 4 • Comprehensive Knowledge Masterclass',
      headline: 'Modern Public Health: The Battle Against Lung Cancer',
      summary:
        'Lung cancer is the second most common cancer in the UK, with 85% of cases caused by tobacco smoking. In 1950, Richard Doll and Austin Bradford Hill proved the link between smoking and cancer. Since then, the British government has abandoned laissez-faire in favor of aggressive legislation, taxation, advertising bans, and cutting-edge diagnosis.',
      pillars: [
        {
          id: 'doll_hill',
          title: 'Doll & Bradford Hill (1950)',
          subtitle: 'Epidemiological Breakthrough',
          image: '/images/default_person.svg',
          iconFallback: '📊',
          bullets: [
            'Surveyed 5,000 hospital patients in London; proved conclusively that heavy smokers were dramatically more likely to develop lung cancer.',
            'Followed 40,000 British doctors over 20 years; showed lung cancer deaths plummeted among doctors who quit smoking.',
            'Overturned tobacco company claims that rising cancer was caused by tarmac road fumes or general air pollution.',
          ],
        },
        {
          id: 'govt_action',
          title: 'Government Interventions',
          subtitle: 'Legislation & Public Health Bans',
          image: '/images/default_person.svg',
          iconFallback: '🚫',
          bullets: [
            '**1965:** Banned all cigarette advertising on British television.',
            '**2007:** Health Act banned smoking in all enclosed public spaces and workplaces (pubs, restaurants, offices); raised legal age to 18.',
            '**2016:** Mandated standardised plain packaging with graphic photographic warnings and banned supermarket displays.',
          ],
        },
        {
          id: 'diagnostics_cancer',
          title: 'Modern Diagnosis & Treatment',
          subtitle: 'High-Tech Oncology',
          image: '/images/default_person.svg',
          iconFallback: '🏥',
          bullets: [
            '**Diagnosis:** Low-dose CT scans identify microscopic tumours; bronchoscopy and PET scans trace cancer spread.',
            '**Surgery:** Lobectomy removes infected lung lobes; robotic precision surgery reduces recovery time.',
            '**Therapy:** High-dose radiotherapy, targeted chemotherapy, and immunotherapy train the patient’s own immune system to destroy cancer cells.',
          ],
        },
      ],
      vectors: [
        {
          from: 'Doll & Hill (1950)',
          to: 'Advertising Bans (1965)',
          text: 'Scientific proof forced governments to restrict commercial tobacco marketing.',
        },
        {
          from: '2007 Public Ban',
          to: 'Cultural Shift',
          text: 'Banning smoking in pubs and restaurants transformed smoking into a socially unacceptable minority habit.',
        },
        {
          from: 'Early CT Scans',
          to: 'Immunotherapy',
          text: 'Advanced screening coupled with molecular immunotherapy significantly extends survival rates.',
        },
      ],
      middleBox: {
        title: 'The Evolution of Tobacco Legislation in Britain: 1965 to 2016',
        links: [
          {
            era: 'Early Interventions (1965–1971)',
            badge: 'Information Phase',
            text: '1965 TV advertising banned; 1971 health warnings placed on cigarette packets. Smoking remained culturally dominant with over 50% of adult males smoking.',
          },
          {
            era: 'Aggressive State Control (2007–2016)',
            badge: 'Prohibition & De-normalisation',
            text: '2007 smoking banned in all public venues; 2015 smoking banned in cars with children; 2016 standardised olive-green plain packaging; taxes raised above 80% of pack price.',
          },
        ],
      },
      bottomBox: {
        title:
          'Synoptic Cross-Era Comparative Evidence Bank: The Role of Government in Public Health (c.1850–present)',
        points: [
          '**The Collapse of Laissez-Faire:** In the 19th century, governments resisted spending taxes on sewers until cholera and the 1858 Great Stink forced the 1875 Public Health Act. In the 20th century, the state took proactive responsibility for health (1948 NHS, Clean Air Act 1956).',
          '**Compulsion Over Voluntarism:** Governments moved from gentle advice to legally binding bans: 1853 compulsory smallpox vaccination, 2007 compulsory public smoking ban, and sugar tax on soft drinks.',
          '**Lifestyle and Epidemic Prevention:** As infectious bacteria were conquered by antibiotics and clean water, modern government action pivoted to preventing self-inflicted lifestyle epidemics: obesity, cardiovascular disease, and smoking-related cancers.',
        ],
      },
    },
    right: {
      type: 'essay_16m',
      totalMarks: 20,
      essay: {
        title: 'Edexcel GCSE (9–1) Paper 1 • Question 5 / 6 [16 Marks + 4 SPaG = 20 Marks]',
        statement:
          '"Government action was the most important reason for improvements in public health in the period c.1850–present." How far do you agree? Explain your answer.',
        spanNote:
          'Chronological Scope: c.1850–present (Industrial Revolution through Modern Era Comparison)',
        stimulus: ['The 1875 Public Health Act', 'The ban on smoking in public places (2007)'],
        ownKnowledgeNote: '(You must also use information of your own.) [16 marks + 4 marks SPaG]',
        guidance:
          'Timing: 25 mins • Structure: Criteria Intro → Paragraph 1 (Agree: Role of government legislation like 1875 Act, Bazalgette sewers, 1948 NHS, 2007 smoking ban) → Paragraph 2 (Disagree: Role of scientific individuals & discoveries like Pasteur, Koch, Doll & Hill) → Paragraph 3 (Own Knowledge: Role of technology like CT scans / clean water engineering / mass media education) → Sustained Conclusion weighing whether government intervention was the crucial catalyst that implemented scientific breakthroughs.',
        checklist: [
          '1. Direct Engagement & Criteria (Define "most important reason" across 170+ years of public health)',
          '2. Argument 1 (Agree: 1875 Public Health Act & 2007 anti-smoking ban ending laissez-faire)',
          '3. Argument 2 (Disagree: Scientific research from Pasteur’s Germ Theory to Doll & Hill’s 1950 study)',
          '4. Argument 3 (Own Knowledge: 1948 Foundation of the NHS / Bazalgette’s sewer engineering / Clean Air Act 1956)',
          '5. Sustained Judgement (Weigh relative importance: science discovers the cause, but only government possesses the legal power and taxes to enforce nationwide reform)',
        ],
        lines: 28,
      },
    },
  },

  // ==========================================
  // TOPIC 5: THE WESTERN FRONT (1914–1918)
  // ==========================================
  {
    id: 'lesson_5_1',
    topic: 'Topic 5: The Western Front (1914–1918)',
    title: 'KT5.1: What Was the Context and Terrain of the Western Front?',
    examType: 'features_utility',
    left: {
      tag: 'Topic 5 • Western Front Historic Environment',
      headline: 'Sector Terrain &amp; Strategic Battles: Ypres to Cambrai',
      summary:
        'The British sector of the Western Front in northern France and Belgium presented severe geographical and environmental challenges for medical treatment. Key battlegrounds included the waterlogged Ypres Salient, the chalky Somme hills, the vast underground chalk quarries of Arras, and the tank terrain of Cambrai.',
      pillars: [
        {
          id: 'ypres',
          title: 'The Ypres Salient',
          subtitle: 'Low-Lying Mud & High Ground',
          image: '/images/ypres_cloth_hall.jpg',
          iconFallback: '🌊',
          bullets: [
            'Surrounded on three sides by German artillery occupying the surrounding ridges (Messines, Passchendaele).',
            'Water table was just inches below the surface; heavy artillery bombardment destroyed clay drainage systems.',
            'Men lived in freezing liquid mud; stretcher bearers struggled to carry stretchers through waist-deep slime.',
          ],
        },
        {
          id: 'somme_arras',
          title: 'The Somme & Arras',
          subtitle: 'Chalk Trenches & Underground Caverns',
          image: '/images/aerial_trench_ypres.jpg',
          iconFallback: '⛏️',
          bullets: [
            '**The Somme (1916):** Chalky soil allowed deeper trenches, but 57,000 British casualties on Day 1 overwhelmed medical facilities.',
            '**Arras (1917):** British and New Zealand engineers dug an underground city in ancient chalk quarries with running water and electric lights.',
            'Arras Thompson’s Cave hospital contained 700 beds, operating theatres, and mortuaries safely sheltered 20 metres underground.',
          ],
        },
        {
          id: 'cambrai',
          title: 'Cambrai (1917)',
          subtitle: 'Mass Tank Warfare & Blood Depots',
          image: '/images/default_person.svg',
          iconFallback: '🚜',
          bullets: [
            'First mass deployment of 450 British Mark IV tanks, surprising German forces across firm, rolling terrain.',
            'Created severe crush and burn injuries alongside artillery shrapnel and machine-gun bullet wounds.',
            'Site of the world’s first blood depot, established by Oswald Robertson to treat casualties near the front.',
          ],
        },
      ],
      vectors: [
        {
          from: 'Low Water Table',
          to: 'Ypres Mud',
          text: 'Soldiers standing in waterlogged trenches developed debilitating trench foot.',
        },
        {
          from: 'Chalk Quarries',
          to: 'Arras Underground Hospital',
          text: 'Protected 700 wounded soldiers from heavy shellfire just 800 yards from the German front line.',
        },
        {
          from: 'Cambrai Offensives',
          to: 'Blood Transfusion Depots',
          text: 'Stored citrated blood in ice boxes allowed surgeons to treat shock immediately.',
        },
      ],
      middleBox: {
        title: 'Geographical Challenges: Impact of Terrain on Medical Evacuation',
        links: [
          {
            era: 'Shell Craters & Liquid Mud',
            badge: 'Stretcher Logistics',
            text: 'At Passchendaele (1917), craters filled with water. It took 6 to 8 stretcher-bearers up to 12 hours to carry a single casualty two miles through sticky mud.',
          },
          {
            era: 'Destroyed Rail & Roads',
            badge: 'Transport Paralysis',
            text: 'Artillery barrages tore up railway tracks and roads, forcing the RAMC to rely on horse-drawn wagons, motor ambulances, and canal barges.',
          },
        ],
      },
      bottomBox: {
        title: 'Key Medical Lessons: The Tactical Realities of the Western Front Sector',
        points: [
          '**Enemy Enfilade Fire:** The Ypres Salient meant German spotters could see and target British stretcher parties from three directions.',
          '**Infection from Fertile Soil:** Heavy manure used on French and Belgian farmland contained tetanus and gas gangrene spores that infested shrapnel wounds.',
          '**Scale of Mass Casualties:** Battles like the Somme (1916) generated tens of thousands of casualties in hours, forcing triage prioritisation.',
        ],
      },
    },
    right: {
      type: 'features_utility',
      totalMarks: 12,
      q1a: {
        title: 'Question 1(a) [2 Marks]',
        question:
          'Describe one feature of the terrain in the Ypres Salient that made medical evacuation difficult.',
        guidance:
          'Award 1 mark for identifying a valid feature, and 1 mark for supporting historical detail. (e.g. The land was low-lying with clay soil [1 mark]; constant shelling destroyed drainage systems, turning the ground into liquid mud that required six men to carry one stretcher [1 mark]).',
        lines: 3,
      },
      q1b: {
        title: 'Question 1(b) [2 Marks]',
        question: 'Describe one feature of the underground hospital at Arras.',
        guidance:
          'Award 1 mark for identifying a valid feature, and 1 mark for supporting historical detail. (e.g. It was built inside ancient chalk quarries [1 mark]; it contained 700 beds, operating theatres, and electricity right near the frontline [1 mark]).',
        lines: 3,
      },
      q2a: {
        title: 'Question 2(a) [8 Marks]',
        question:
          'How useful are Sources A and B for an enquiry into the difficulties of transporting wounded soldiers on the Western Front?',
        sourceA:
          'Source A: From the diary of a stretcher-bearer serving in the Ypres Salient during the Battle of Passchendaele, October 1917: "The mud was up to our waists. Carrying a wounded comrade on a stretcher was sheer agony; it took six of us five hours to move one mile. Shells were bursting all around us, and twice we were thrown into water-filled craters."',
        sourceB:
          'Source B: From an official report by a Royal Army Medical Corps (RAMC) senior officer to the War Office, December 1916: "Motor ambulance convoys have proved invaluable on hard roads, but between the Regimental Aid Posts and Dressing Stations, mechanical transport cannot move across the churned mud. We have had to fall back on horse-drawn carts and manual stretcher parties."',
        provenanceClue:
          'Provenance Hints: Consider Source A’s emotional first-hand perspective under fire versus Source B’s objective administrative logistics report for the War Office.',
        guidance:
          'Timing: 12 mins • Structure: Evaluate Content, Knowledge context, and Provenance (Nature, Origin, Motive) for Source A, then Source B, with an overall judgement on usefulness.',
        lines: 16,
      },
    },
  },

  {
    id: 'lesson_5_2',
    topic: 'Topic 5: The Western Front (1914–1918)',
    title: 'KT5.2: How Did the Trench Environment Create New Medical Challenges?',
    examType: 'features_followup',
    left: {
      tag: 'Topic 5 • Western Front Historic Environment',
      headline: 'The Trench Defensive Grid &amp; Underground Care',
      summary:
        'The Western Front trench network was a complex zig-zag grid consisting of frontline, support, and reserve trenches connected by communication trenches. Living conditions were damp, unhygienic, and vermin-infested, generating unique diseases while artillery shrapnel created devastating trauma wounds.',
      pillars: [
        {
          id: 'trench_layout',
          title: 'The Trench System',
          subtitle: 'Zig-Zag Engineering',
          image: '/images/cheshire_regiment_trench.png',
          iconFallback: '🧱',
          bullets: [
            'Dug in a zig-zag pattern (firebays and traverses) so an exploding shell or enemy raider could not kill along the entire trench.',
            '**Frontline Trench:** 7 feet deep, duckboards at base, sandbags on parapet, barbed wire entanglements in No Man’s Land.',
            '**Communication Trenches:** Narrow trenches connecting front line to supply dumps, dressing stations, and reserve lines.',
          ],
        },
        {
          id: 'dugouts',
          title: 'Dugouts & Bunkers',
          subtitle: 'Subterranean Protection',
          image: '/images/default_person.svg',
          iconFallback: '🕳️',
          bullets: [
            'Rooms hollowed into the sides of trenches, reinforced with wooden beams and corrugated iron.',
            'Used for battalion headquarters, sleeping quarters, and Regimental Aid Posts (RAP).',
            'Deep dugouts (up to 30 feet underground) protected men from artillery barrages, but had foul air and candle-lit gloom.',
          ],
        },
        {
          id: 'hygiene',
          title: 'Vermin & Hygiene Squalor',
          subtitle: 'Lice, Rats & Contamination',
          image: '/images/default_person.svg',
          iconFallback: '🐀',
          bullets: [
            'Corpse rats bred in their millions, gorging on unburied bodies in No Man’s Land.',
            'Body lice infested every soldier’s uniform seams, transmitting trench fever through their faeces.',
            'Latrines were simple pits dug behind trenches; overflowed during heavy rain, contaminating drinking water.',
          ],
        },
      ],
      vectors: [
        {
          from: 'Zig-Zag Layout',
          to: 'Shrapnel Containment',
          text: 'Traverses stopped bomb blast waves travelling more than 10 yards along the line.',
        },
        {
          from: 'Flooded Dugouts',
          to: 'Fungal Infections',
          text: 'Constant cold water and mud led to widespread fungal trench foot and gangrene.',
        },
        {
          from: 'Body Lice',
          to: 'Trench Fever',
          text: 'Biting lice caused debilitating bone pain, high fever, and required hospital evacuation.',
        },
      ],
      middleBox: {
        title: 'Trench Anatomy: Cross-Section of a Frontline Firebay',
        links: [
          {
            era: 'Parapet, Firestep & Duckboards',
            badge: 'Defensive Architecture',
            text: 'Soldiers stood on the raised firestep to shoot over the parapet. Wooden duckboards kept boots out of standing water, but frequently floated away during floods.',
          },
          {
            era: 'Regimental Aid Post Location',
            badge: 'Frontline Medical Aid',
            text: 'Located in a dugout or ruined cellar 200–300 yards behind the front line. Provided immediate bandaging, morphine, and splints under shellfire.',
          },
        ],
      },
      bottomBox: {
        title: '3 Key Factors: Why Trench Warfare Created Severe Evacuation Bottlenecks',
        points: [
          '**Narrow Communication Trenches:** Trenches were barely 3 feet wide; stretcher-bearers carrying wounded men collided with troops moving forward.',
          '**Daylight Snipers & Shellfire:** Evacuating casualties across the open top in daylight was suicidal; stretcher parties had to wait until nightfall.',
          '**Damage to Telephones:** Artillery barrages routinely severed telephone wires buried along trench walls, cutting communication to ambulances.',
        ],
      },
    },
    right: {
      type: 'features_followup',
      totalMarks: 8,
      q1a: {
        title: 'Question 1(a) [2 Marks]',
        question: 'Describe one feature of the system of trenches on the Western Front.',
        guidance:
          'Award 1 mark for identifying a valid feature, and 1 mark for supporting historical detail. (e.g. Trenches were built in a zig-zag pattern with traverses [1 mark]; this prevented explosive blast waves and shrapnel travelling along the entire trench if hit by a shell [1 mark]).',
        lines: 3,
      },
      q1b: {
        title: 'Question 1(b) [2 Marks]',
        question: 'Describe one feature of communication trenches.',
        guidance:
          'Award 1 mark for identifying a valid feature, and 1 mark for supporting historical detail. (e.g. They ran perpendicular to the frontline [1 mark]; they were used to transport reinforcements, food, ammunition, and wounded soldiers between the front and rear lines [1 mark]).',
        lines: 3,
      },
      q2b: {
        title: 'Question 2(b) [4 Marks]',
        question:
          'Study Source A. How could you follow up Source A to find out more about the problems of living conditions in the trenches?',
        sourceExcerpt:
          'Source A: From a letter sent home by Private Arthur Cole of the 1st Battalion, Royal Berkshire Regiment, December 1915: "We are up to our knees in freezing sludge. The dugouts leak constantly and the smell from the open latrines is appalling. Yesterday two men in my platoon were sent down the line with feet so swollen they could not remove their boots."',
        guidance:
          'Complete the official Edexcel 4-part follow-up investigation table below using specific, authentic contemporary historical sources.',
        tablePhrases: [
          {
            label: 'Detail in Source A that I would follow up:',
            placeholder:
              'Write a specific quotation or detail from Source A (e.g. "two men in my platoon were sent down the line with feet so swollen they could not remove their boots").',
          },
          {
            label: 'Question I would ask:',
            placeholder:
              'Ask a focused historical question directly addressing the detail (e.g. How many soldiers were evacuated from this battalion suffering from trench foot during the winter of 1915?).',
          },
          {
            label: 'What type of source I could use:',
            placeholder:
              'Name a specific, realistic contemporary primary source (e.g. The Medical Officer’s Battalion War Diary or RAMC casualty evacuation register for the 1st Berkshire Regiment).',
          },
          {
            label: 'How this might help answer my question:',
            placeholder:
              'Explain what information the source would reveal (e.g. It would record exact casualty figures for trench foot in this unit and show what preventative measures were being enforced).',
          },
        ],
      },
    },
  },

  {
    id: 'lesson_5_3',
    topic: 'Topic 5: The Western Front (1914–1918)',
    title: 'KT5.3: What New Illnesses and Wounds Did Soldiers Face?',
    examType: 'features_utility',
    left: {
      tag: 'Topic 5 • Western Front Historic Environment',
      headline: 'Trench Pathology: Shells, Gas &amp; Environmental Diseases',
      summary:
        'Industrialised warfare introduced horrific trauma wounds and new pathological conditions. Artillery shrapnel and high-explosive shells caused 58% of all wounds, while chlorine, phosgene, and mustard gas attacked the respiratory system and blinded thousands. Soldiers also battled trench foot, trench fever, and psychological trauma (shell shock).',
      pillars: [
        {
          id: 'gas',
          title: 'Poison Gas Attacks',
          subtitle: 'Chlorine, Phosgene & Mustard',
          image: '/images/default_person.svg',
          iconFallback: '🧪',
          bullets: [
            '**Chlorine (1915 at 2nd Ypres):** Green cloud of choking gas; dissolved lung tissue, causing victims to drown in their own fluids.',
            '**Phosgene (1915):** Odourless and six times more toxic than chlorine; delayed reaction killed victims 24 hours later.',
            '**Mustard Gas (1917):** Blistering agent; burned through uniforms, causing horrific internal and external blisters and temporary blindness.',
          ],
        },
        {
          id: 'trench_foot',
          title: 'Trench Foot & Fever',
          subtitle: 'Environmental Afflictions',
          image: '/images/default_person.svg',
          iconFallback: '🦶',
          bullets: [
            '**Trench Foot:** Prolonged standing in cold water and tight boots cut off circulation; turned black and necrotic, requiring amputation.',
            'Prevented by rubbing feet with whale oil, changing socks twice daily, and building dry duckboards.',
            '**Trench Fever:** Flu-like disease transmitted by body lice faeces; caused high fever, severe headaches, and intense bone-aching in shins.',
          ],
        },
        {
          id: 'shell_shock',
          title: 'Shell Shock & Shrapnel',
          subtitle: 'Psychological Trauma & Steel Helmets',
          image: '/images/default_person.svg',
          iconFallback: '💥',
          bullets: [
            '**Shell Shock:** Caused by constant artillery bombardment; symptoms included uncontrollable shaking, muteness, and paralysis.',
            'Initially dismissed as cowardice; later treated with rest at specialist psychiatric hospitals like Craiglockhart.',
            '**Brodie Helmet (1915):** Steel helmet reduced fatal head wounds from exploding shrapnel shells by 80%.',
          ],
        },
      ],
      vectors: [
        {
          from: 'Urine-Soaked Rags',
          to: 'Small Box Respirator (1916)',
          text: 'Primitive gas defence evolved into advanced charcoal filter masks protecting against mustard gas.',
        },
        {
          from: 'Whale Oil Inspections',
          to: 'Reduced Amputations',
          text: 'Officers inspected soldiers’ bare feet daily; grease created a waterproof barrier against mud.',
        },
        {
          from: 'Shrapnel Shells',
          to: 'Brodie Helmets',
          text: 'Replacing soft cloth caps with steel helmets dramatically reduced fractured skulls and brain trauma.',
        },
      ],
      middleBox: {
        title: 'Poison Gas Evolution: Chemical Warfare &amp; Respirator Defence',
        links: [
          {
            era: 'The Three Lethal Gases',
            badge: 'Chlorine vs Phosgene vs Mustard',
            text: 'Chlorine attacked lungs; Phosgene was invisible; Mustard gas sank into mud and remained active for weeks, burning eyes, skin, and throats.',
          },
          {
            era: 'Small Box Respirator (1916)',
            badge: 'Effective Chemical Filter',
            text: 'Replaced gas-soaked cotton flannel hoods. Used rubber face pieces connected by hose to a box canister containing charcoal and chemical neutralisers.',
          },
        ],
      },
      bottomBox: {
        title: '3 Key Medical Challenges: Treating Trauma in Contaminated Mud',
        points: [
          '**Gas Gangrene:** High-explosive shells drove dirty soil and manure-soaked uniform fragments deep into muscle tissue, breeding deadly anaerobic bacteria.',
          '**Internal Poison Gas Burns:** Doctors could only offer basic comfort: rinsing eyes with sodium bicarbonate and providing oxygen for lung burns.',
          '**Misunderstanding Mental Illness:** Over 80,000 British soldiers suffered shell shock (NYDN: "Not Yet Diagnosed, Nervous"); army doctors struggled to differentiate between psychiatric breakdown and desertion.',
        ],
      },
    },
    right: {
      type: 'features_utility',
      totalMarks: 12,
      q1a: {
        title: 'Question 1(a) [2 Marks]',
        question: 'Describe one feature of the gas attacks used on the Western Front.',
        guidance:
          'Award 1 mark for identifying a valid feature, and 1 mark for supporting historical detail. (e.g. Chlorine gas was used as a choking agent [1 mark]; it stripped the lining of the lungs, causing victims to drown in their own fluids [1 mark]).',
        lines: 3,
      },
      q1b: {
        title: 'Question 1(b) [2 Marks]',
        question: 'Describe one feature of trench foot.',
        guidance:
          'Award 1 mark for identifying a valid feature, and 1 mark for supporting historical detail. (e.g. It was caused by standing in cold water and mud for days [1 mark]; circulation stopped and the tissue turned gangrenous, often requiring amputation [1 mark]).',
        lines: 3,
      },
      q2a: {
        title: 'Question 2(a) [8 Marks]',
        question:
          'How useful are Sources A and B for an enquiry into the effects of poison gas attacks on soldiers on the Western Front?',
        sourceA:
          'Source A: From *Goodbye to All That*, an autobiography by Robert Graves, an officer who served on the Western Front, published in 1929: "The gas hung in green clouds over the trenches. Men who breathed it coughed violently, clutching at their throats and vomiting yellow bile. Our crude respirators—pads soaked in bicarbonate of soda—were barely effective, and several men ripped them off in panic, only to inhale the poison."',
        sourceB:
          'Source B: From an official report by a medical officer at a Casualty Clearing Station near Ypres, May 1915: "We received 300 gas cases today following a German cloud discharge. The majority were cyanosed [blue-skinned] and suffering intense dyspnoea [shortness of breath]. Oxygen cylinders provided temporary relief, but 42 died within eight hours of admission from acute pulmonary oedema."',
        provenanceClue:
          'Provenance Hints: Contrast Graves’ vivid post-war literary recollection with the immediate clinical accuracy and statistical focus of the military MO’s operational casualty report.',
        guidance:
          'Timing: 12 mins • Structure: Evaluate Content, Knowledge context, and Provenance (Nature, Origin, Motive) for Source A, then Source B, with a sustained usefulness judgement.',
        lines: 16,
      },
    },
  },

  {
    id: 'lesson_5_4',
    topic: 'Topic 5: The Western Front (1914–1918)',
    title: 'KT5.4: How Did the RAMC and FANY Operate the Chain of Evacuation?',
    examType: 'features_followup',
    left: {
      tag: 'Topic 5 • Western Front Historic Environment',
      headline: 'The Chain of Evacuation: The Lifeline from Front to Base',
      summary:
        'The Royal Army Medical Corps (RAMC) and First Aid Nursing Yeomanry (FANY) operated a sophisticated multi-stage evacuation network. Casualties were triaged and moved systematically from frontline dugouts back to Britain, ensuring urgent life-saving operations occurred close to the front.',
      pillars: [
        {
          id: 'rap_ads',
          title: 'RAP & Dressing Stations',
          subtitle: 'Frontline Triage & First Aid',
          image: '/images/default_person.svg',
          iconFallback: '🩹',
          bullets: [
            '**Regimental Aid Post (RAP):** 200m behind front line; regimental medical officer gave basic first aid, bandages, and morphine.',
            '**Advanced Dressing Station (ADS):** 400m–1 mile back in dugouts/tents; main dressing station (MDS) was 2–3 miles back.',
            'Run by Field Ambulances; treated up to 150 men at a time; could not hold patients for more than a few hours.',
          ],
        },
        {
          id: 'ccs',
          title: 'Casualty Clearing Station (CCS)',
          subtitle: 'The Surgical Engine Room',
          image: '/images/default_person.svg',
          iconFallback: '🏥',
          bullets: [
            'Located 7–12 miles behind frontline near railway lines, outside enemy artillery range.',
            'First place equipped with sterile operating theatres, X-ray machines, and surgical specialists.',
            '**Triage System:** Divided men into: The Walking Wounded, Those Needing Immediate Surgery, and The Moribund (hopeless cases made comfortable).',
          ],
        },
        {
          id: 'base_hospitals',
          title: 'Base Hospitals & Transport',
          subtitle: 'Long-Term Care & Blighty',
          image: '/images/default_person.svg',
          iconFallback: '🚢',
          bullets: [
            'Located on French coast (Boulogne, Étaples, Rouen) near ports; vast complexes with 2,500+ beds.',
            'Wounded transported via specialized ambulance trains with onboard kitchens and surgical wards.',
            'Patients treated for months or evacuated on hospital ships to "Blighty" (Britain) for permanent discharge.',
          ],
        },
      ],
      vectors: [
        {
          from: 'RAP (First Aid)',
          to: 'Dressing Station (Triage)',
          text: 'Stretcher-bearers carried wounded across shell craters to dressing stations.',
        },
        {
          from: 'ADS/MDS',
          to: 'CCS (Life-Saving Surgery)',
          text: 'Motor ambulances and horse wagons moved critical surgical cases to the CCS.',
        },
        {
          from: 'CCS (Triage)',
          to: 'Ambulance Train (Base)',
          text: 'Ambulance trains moved stabilised patients to Base Hospitals on the coast.',
        },
      ],
      middleBox: {
        title: 'The Unsung Heroes: Stretcher Bearers &amp; The FANY',
        links: [
          {
            era: 'Stretcher-Bearers',
            badge: 'Frontline Heroism',
            text: '16 men per battalion; worked in pairs or groups of six carrying 200lb men across cratered mud under artillery barrages. Suffered huge casualty rates.',
          },
          {
            era: 'First Aid Nursing Yeomanry (FANY)',
            badge: 'Motorised Transport',
            text: 'First women to drive official military vehicles in 1915. Drove motor ambulance convoys, ran mobile soup kitchens, and operated field sterilization units under fire.',
          },
        ],
      },
      bottomBox: {
        title: '3 Critical Triage Categories: How the CCS Decided Who Lived',
        points: [
          '**The Walking Wounded:** Men with minor shrapnel cuts or light sprains; bandaged and returned directly to their unit.',
          '**Those in Urgent Need:** Men with chest wounds, fractured femurs, or abdominal trauma; operated on immediately before gangrene set in.',
          '**The Moribund (Hopeless):** Men with shattered skulls or catastrophic blood loss; placed in quiet wards with high morphine doses to die peacefully.',
        ],
      },
    },
    right: {
      type: 'features_followup',
      totalMarks: 8,
      q1a: {
        title: 'Question 1(a) [2 Marks]',
        question: 'Describe one feature of the Casualty Clearing Station (CCS).',
        guidance:
          'Award 1 mark for identifying a valid feature, and 1 mark for supporting historical detail. (e.g. It was the first stage where major life-saving surgery was performed [1 mark]; it was located near railway lines 7–12 miles back and contained operating theatres and X-ray machines [1 mark]).',
        lines: 3,
      },
      q1b: {
        title: 'Question 1(b) [2 Marks]',
        question: 'Describe one feature of the work of the FANY (First Aid Nursing Yeomanry).',
        guidance:
          'Award 1 mark for identifying a valid feature, and 1 mark for supporting historical detail. (e.g. They operated motor ambulances [1 mark]; they drove wounded soldiers from Casualty Clearing Stations to ambulance trains, often working under enemy shellfire [1 mark]).',
        lines: 3,
      },
      q2b: {
        title: 'Question 2(b) [4 Marks]',
        question:
          'Study Source A. How could you follow up Source A to find out more about the work of Casualty Clearing Stations on the Western Front?',
        sourceExcerpt:
          'Source A: From the diary of Sister Edith Appleton, an army nurse at a Casualty Clearing Station during the Battle of the Somme, July 1916: "The convoys of wounded have been arriving without break. Our operating theatres have been working day and night for 48 hours. Many men arrive with severe abdominal wounds and shattered limbs that are already black with gas gangrene. We can only save those who are operated on within hours."',
        guidance:
          'Complete the official Edexcel 4-part follow-up investigation table below using specific, authentic contemporary historical sources.',
        tablePhrases: [
          {
            label: 'Detail in Source A that I would follow up:',
            placeholder:
              'Write a specific quotation or detail from Source A (e.g. "Our operating theatres have been working day and night for 48 hours").',
          },
          {
            label: 'Question I would ask:',
            placeholder:
              'Ask a focused historical question directly addressing the detail (e.g. How many surgical operations were carried out at this Casualty Clearing Station during the first week of the Somme?).',
          },
          {
            label: 'What type of source I could use:',
            placeholder:
              'Name a specific, realistic contemporary primary source (e.g. The official Operation Logbook or Medical Officer’s Daily Diary of this specific Casualty Clearing Station).',
          },
          {
            label: 'How this might help answer my question:',
            placeholder:
              'Explain what information the source would reveal (e.g. It would show the exact number of surgeries performed, the surgical survival rates, and the hours surgeons worked).',
          },
        ],
      },
    },
  },

  {
    id: 'lesson_5_5',
    topic: 'Topic 5: The Western Front (1914–1918)',
    title: 'KT5.5: What Medical Advances Were Forged on the Western Front?',
    examType: 'features_utility',
    left: {
      tag: 'Topic 5 • Western Front Historic Environment',
      headline: 'Surgical &amp; Technological Innovation Under Fire',
      summary:
        'The catastrophic trauma of total war accelerated medical innovation. Breakthroughs included the Thomas Splint (cutting compound femur fracture mortality from 80% to 20%), mobile X-ray units, sodium citrate blood storage, and revolutionary advances in brain surgery and facial plastic reconstruction.',
      pillars: [
        {
          id: 'splint',
          title: 'The Thomas Splint (1915)',
          subtitle: 'Revolutionary Fracture Rigidity',
          image: '/images/default_person.svg',
          iconFallback: '🦴',
          bullets: [
            'Designed by Hugh Owen Thomas; pulled the leg lengthways, preventing broken bone ends rubbing together.',
            'Stopped femoral artery laceration and internal haemorrhage during transport across bumpy trenches.',
            '**Staggering Impact:** Cut mortality rate for compound femur fractures from 80% in 1914 to just 20% by 1916.',
          ],
        },
        {
          id: 'blood_transfusion',
          title: 'Blood Storage & Transfusions',
          subtitle: 'Robertson’s Blood Depot (1917)',
          image: '/images/default_person.svg',
          iconFallback: '🩸',
          bullets: [
            '1915: Richard Lewisohn used sodium citrate to stop blood clotting; Richard Weil showed it could be refrigerated for 2 days.',
            '1916: Francis Rous & James Turner added citrate-glucose, allowing blood to be stored in glass bottles for 4 weeks.',
            '**Oswald Robertson (1917):** Created the world’s first blood bank at Cambrai, storing 22 units of donor blood in ice boxes to treat shock.',
          ],
        },
        {
          id: 'plastic_brain',
          title: 'Plastic & Brain Surgery',
          subtitle: 'Gillies & Cushing',
          image: '/images/default_person.svg',
          iconFallback: '🧠',
          bullets: [
            '**Harvey Cushing:** Pioneered local anaesthetic and electric magnets to remove metal shrapnel from brain tissue; reduced brain surgery mortality to 29%.',
            '**Harold Gillies:** Established Queen’s Hospital at Sidcup (1917); pioneered pedicle skin tube grafting to reconstruct shattered facial features.',
            'Performed over 11,000 complex reconstructive facial surgeries on disfigured servicemen.',
          ],
        },
      ],
      vectors: [
        {
          from: 'Thomas Splint (1915)',
          to: '80% Survival',
          text: 'Rigid traction stopped bone shards severing the femoral artery during ambulance jolts.',
        },
        {
          from: 'Citrate-Glucose (1916)',
          to: 'Robertson Blood Depot',
          text: 'Stored blood transformed shock treatment, allowing transfusions directly near the front line.',
        },
        {
          from: 'Tube Pedicle Grafting',
          to: 'Queen’s Hospital Sidcup',
          text: 'Gillies kept skin alive using vascular flesh tubes, rebuilding jaws and noses.',
        },
      ],
      middleBox: {
        title: 'Diagnostic Innovation: Mobile X-Ray Units at the Front',
        links: [
          {
            era: '6 Mobile X-Ray Vans',
            badge: 'Locating Shrapnel',
            text: 'Mobile vans travelled between Casualty Clearing Stations. Marie Curie and British teams used X-rays to locate bullets and shrapnel before operating.',
          },
          {
            era: 'Wound Debridement & Carrel-Dakin',
            badge: 'Fighting Gas Gangrene',
            text: 'Surgeons cut away all dead, damaged tissue (debridement). The Carrel-Dakin method flushed deep wounds continuously with antiseptic sodium hypochlorite solution.',
          },
        ],
      },
      bottomBox: {
        title: '3 Enduring Legacies: Western Front Medical Advances in Civilian Medicine',
        points: [
          '**Modern Blood Banks:** Robertson’s Cambrai blood depot laid the technical foundation for civilian national blood transfusion services.',
          '**Reconstructive Surgery:** Harold Gillies’ skin grafting techniques became the foundation of modern plastic surgery and burn rehabilitation.',
          '**Paramedic Orthopaedics:** The principles of the Thomas Splint are still used worldwide today in ambulance stretchers for femur fractures.',
        ],
      },
    },
    right: {
      type: 'features_utility',
      totalMarks: 12,
      q1a: {
        title: 'Question 1(a) [2 Marks]',
        question: 'Describe one feature of the Thomas Splint.',
        guidance:
          'Award 1 mark for identifying a valid feature, and 1 mark for supporting historical detail. (e.g. It pulled the broken leg rigid in traction [1 mark]; this stopped broken bone ends grating together and reduced mortality from compound fractures from 80% to 20% [1 mark]).',
        lines: 3,
      },
      q1b: {
        title: 'Question 1(b) [2 Marks]',
        question: 'Describe one feature of blood transfusions on the Western Front.',
        guidance:
          'Award 1 mark for identifying a valid feature, and 1 mark for supporting historical detail. (e.g. Blood could be stored in advance using sodium citrate and glucose [1 mark]; Oswald Robertson set up the first blood bank at the Battle of Cambrai in 1917 to treat men suffering from shock [1 mark]).',
        lines: 3,
      },
      q2a: {
        title: 'Question 2(a) [8 Marks]',
        question:
          'How useful are Sources A and B for an enquiry into the success of medical treatments on the Western Front?',
        sourceA:
          'Source A: From an article in the *British Medical Journal*, December 1916, written by an RAMC consulting surgeon: "The introduction of the Thomas Splint has resulted in one of the most astonishing triumphs of military surgery. When casualties arrive at the Casualty Clearing Station with the splint correctly applied, compound fractures of the thigh show little shock, and the mortality has fallen from 80 per cent to below 20 per cent."',
        sourceB:
          'Source B: From a personal account by Captain Oswald Robertson, describing his work at the Battle of Cambrai, November 1917: "We kept the blood in glass quart bottles packed in ice. When the wounded arrived in severe shock, pulseless and pale as death, we warmed the blood and infused it directly into their veins. Within minutes, colour returned to their lips and their pulse strengthened. Men who would certainly have died survived to reach the operating theatre."',
        provenanceClue:
          'Provenance Hints: Evaluate the objective medical statistical authority of the BMJ professional article against the personal eyewitness technical report of the pioneer who built the first blood depot.',
        guidance:
          'Timing: 12 mins • Structure: Evaluate Content, Knowledge context, and Provenance (Nature, Origin, Motive) for Source A, then Source B, with a clear comparative usefulness conclusion.',
        lines: 16,
      },
    },
  },
];

// Helper: Render Left Page (Visual Revision Masterclass)
function renderLeftPage(data, pageNum) {
  const { tag, headline, summary, pillars, vectors, middleBox, bottomBox } = data.left;
  return `
  <div class="page page-left" style="page-break-before: always; page-break-after: always; box-sizing: border-box; width: 100%; height: 1123px; padding: 16px 20px; font-family: 'Inter', sans-serif; background-color: #ffffff; display: flex; flex-direction: column; justify-content: space-between; overflow: hidden;">
    <div>
      <!-- Top Header -->
      <div style="border-bottom: 2px solid #1e3a8a; padding-bottom: 5px; margin-bottom: 8px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <span style="font-size: 8pt; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.5px;">
            Edexcel GCSE (9–1) History &bull; Paper 1: Medicine in Britain &bull; ${data.topic}
          </span>
          <span style="font-size: 8pt; font-weight: 700; color: #1e3a8a; background: #f1f5f9; padding: 2px 8px; border-radius: 4px; border: 1px solid #cbd5e1;">
            ${tag}
          </span>
        </div>
        <h2 style="font-family: 'Playfair Display', Georgia, serif; font-size: 14.5pt; color: #0f172a; margin: 3px 0 4px 0; border: none; padding: 0;">
          ${headline}
        </h2>
        <p style="font-size: 8.2pt; color: #334155; margin: 0; line-height: 1.35;">
          ${summary}
        </p>
      </div>

      <!-- Core 3 Pillars -->
      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 9px; margin-bottom: 8px;">
        ${pillars
          .map(
            (p) => `
          <div style="border: 1.5px solid #1e3a8a; border-radius: 6px; padding: 7px; background-color: #f8fafc; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; gap: 7px; margin-bottom: 5px; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px;">
                <div style="width: 36px; height: 36px; border-radius: 50%; overflow: hidden; border: 1.5px solid #1e3a8a; background: #e2e8f0; flex-shrink: 0; display: flex; align-items: center; justify-content: center;">
                  <img src="${p.image}" alt="${p.title}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.onerror=null; this.style.display='none'; this.nextElementSibling.style.display='flex';" />
                  <span style="display: none; font-size: 16px;">${p.iconFallback}</span>
                </div>
                <div>
                  <h4 style="margin: 0; font-size: 9pt; color: #0f172a; font-weight: 800; line-height: 1.15;">${p.title}</h4>
                  <span style="font-size: 6.8pt; color: #64748b; font-weight: 600; text-transform: uppercase;">${p.subtitle}</span>
                </div>
              </div>
              <ul style="margin: 0; padding-left: 13px; font-size: 7.2pt; color: #1e293b; line-height: 1.3;">
                ${p.bullets.map((b) => `<li style="margin-bottom: 3px;">${b.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')}</li>`).join('')}
              </ul>
            </div>
          </div>
        `,
          )
          .join('')}
      </div>

      <!-- Transmission Vectors Ribbon -->
      <div style="background: #e2e8f0; border: 1px solid #cbd5e1; border-radius: 5px; padding: 4px 8px; margin-bottom: 8px;">
        <div style="font-size: 7pt; font-weight: 800; color: #0f172a; text-transform: uppercase; margin-bottom: 2px;">
          Key Intellectual &amp; Historical Transmission Vectors:
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 7px; font-size: 6.8pt; color: #334155;">
          ${vectors
            .map(
              (v, i) => `
            <div>
              <strong style="color: #1e3a8a;">Vector ${i + 1}: ${v.from} &rarr; ${v.to}</strong><br/>
              ${v.text}
            </div>
          `,
            )
            .join('')}
        </div>
      </div>

      <!-- Middle Box: Synoptic or Diagnostic Feature -->
      <div style="border: 1.5px solid #047857; background: #ecfdf5; border-radius: 6px; padding: 6px 10px; margin-bottom: 8px;">
        <div style="font-size: 7.6pt; font-weight: 800; color: #065f46; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; display: flex; align-items: center; gap: 5px;">
          <span>⚡</span> ${middleBox.title}
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
          ${middleBox.links
            .map(
              (l) => `
            <div style="background: #ffffff; border: 1px solid #a7f3d0; border-radius: 4px; padding: 4px 7px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
                <strong style="font-size: 7.5pt; color: #065f46;">${l.era}</strong>
                <span style="font-size: 6.5pt; font-weight: 700; color: #065f46; background: #d1fae5; border: 1px solid #a7f3d0; padding: 1px 4px; border-radius: 2px;">${l.badge}</span>
              </div>
              <div style="font-size: 7.1pt; color: #1e293b; line-height: 1.3;">${l.text}</div>
            </div>
          `,
            )
            .join('')}
        </div>
      </div>
    </div>

    <!-- Bottom Box: Synoptic Evidence Bank -->
    <div style="background: #f8fafc; border: 1.5px solid #1e293b; border-radius: 6px; padding: 6px 10px; margin-top: auto;">
      <div style="font-size: 7.6pt; font-weight: 800; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 3px;">
        ${bottomBox.title}
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 7px;">
        ${bottomBox.points
          .map(
            (p, i) => `
          <div style="font-size: 7.1pt; color: #334155; line-height: 1.3; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 4px; padding: 4px 7px;">
            <strong style="color: #0f172a; display: block; margin-bottom: 1px;">Evidence ${i + 1}:</strong>
            ${p.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')}
          </div>
        `,
          )
          .join('')}
      </div>
    </div>
  </div>
  `;
}

// Helper: Render Right Page (Rotated Exam Assessment)
function renderRightPage(data, pageNum) {
  const right = data.right;
  const isSectionA = data.topic.includes('Western Front');

  // Common Header
  const headerHtml = `
    <div style="border-bottom: 2px solid #1e293b; padding-bottom: 5px; margin-bottom: 8px;">
      <div style="display: flex; justify-content: space-between; align-items: baseline;">
        <span style="font-size: 8pt; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.5px;">
          Edexcel GCSE (9–1) History &bull; ${isSectionA ? 'Paper 1 (Section A): The Western Front (1914–1918)' : 'Paper 1 (Section B): Medicine in Britain'}
        </span>
        <span style="font-size: 8pt; font-weight: 700; color: #1e293b; background: #f1f5f9; padding: 2px 8px; border-radius: 4px; border: 1px solid #cbd5e1;">
          Assessment Total: ${right.totalMarks} Marks
        </span>
      </div>
      <h2 style="font-family: 'Playfair Display', Georgia, serif; font-size: 14pt; color: #0f172a; margin: 3px 0 2px 0; border: none; padding: 0;">
        ${
          right.type === 'essay_16m'
            ? 'Section B Capstone: 16-Mark Statement Judgement Essay'
            : right.type === 'q3_q4'
              ? 'Section B Practice: Comparative Analysis &amp; Causal Explanation'
              : right.type === 'features_utility'
                ? 'Section A Practice: Feature Descriptions &amp; Source Utility Enquiry'
                : 'Section A Practice: Feature Descriptions &amp; Source Follow-Up Investigation'
        }
      </h2>
    </div>
  `;

  // Pattern 1: Q3 + Q4
  if (right.type === 'q3_q4') {
    return `
    <div class="page page-right" style="page-break-before: always; page-break-after: always; box-sizing: border-box; width: 100%; height: 1123px; padding: 16px 20px; font-family: 'Inter', sans-serif; background-color: #ffffff; display: flex; flex-direction: column; justify-content: space-between; overflow: hidden;">
      <div>
        ${headerHtml}
        
        <!-- Question 3 [4 Marks] -->
        <div style="background: #ffffff; border: 1.5px solid #334155; border-radius: 6px; padding: 6px 10px; margin-bottom: 4px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-size: 8.5pt; color: #0f172a;">${right.q3.title}</strong>
            <span style="font-size: 7.5pt; font-weight: 800; color: #0f172a; background: #f1f5f9; border: 1px solid #cbd5e1; padding: 1px 6px; border-radius: 3px;">[4 Marks]</span>
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 9.6pt; font-weight: 700; color: #0f172a; line-height: 1.3; margin-bottom: 3px;">
            ${right.q3.question}
          </div>
          <div style="font-size: 7.1pt; color: #334155; background: #f8fafc; border-left: 3px solid #334155; padding: 2.5px 7px; border-radius: 3px;">
            <strong>Strategy:</strong> ${right.q3.guidance}
          </div>
        </div>
        <!-- 8 ruled lines for Q3 -->
        <div style="margin-bottom: 8px;">
          ${Array(right.q3.lines).fill('<div style="height: 18px; border-bottom: 1px dotted #94a3b8; margin-top: 1px;"></div>').join('')}
        </div>

        <!-- Question 4 [12 Marks] -->
        <div style="background: #ffffff; border: 1.5px solid #1e293b; border-radius: 6px; padding: 6px 10px; margin-bottom: 4px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-size: 8.5pt; color: #0f172a;">${right.q4.title}</strong>
            <span style="font-size: 7.5pt; font-weight: 800; color: #0f172a; background: #f1f5f9; border: 1px solid #cbd5e1; padding: 1px 6px; border-radius: 3px;">[12 Marks]</span>
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 9.6pt; font-weight: 700; color: #0f172a; line-height: 1.3; margin-bottom: 3px;">
            ${right.q4.question}
          </div>
          <!-- Stimulus Tracking Checklist -->
          <div style="background: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 4px; padding: 3px 6px; margin-bottom: 3px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 4px;">
            <span style="font-size: 7.1pt; font-weight: 700; color: #1e293b; text-transform: uppercase;">Stimulus Tracking Checklist:</span>
            <div style="display: flex; gap: 8px; align-items: center;">
              ${right.q4.stimulus
                .map(
                  (s) => `
                <span style="display: inline-flex; align-items: center; gap: 4px; font-size: 7.2pt; font-weight: 600; color: #0f172a; background: #ffffff; border: 1px solid #94a3b8; padding: 1px 5px; border-radius: 3px;">
                  <span style="display: inline-block; width: 9px; height: 9px; border: 1.5px solid #1e293b; border-radius: 2px; background: #ffffff;"></span>
                  ${s}
                </span>
              `,
                )
                .join('')}
              <span style="display: inline-flex; align-items: center; gap: 4px; font-size: 7.2pt; font-weight: 700; color: #0f172a; background: #ffffff; border: 1px solid #94a3b8; padding: 1px 5px; border-radius: 3px;">
                <span style="display: inline-block; width: 9px; height: 9px; border: 1.5px solid #1e293b; border-radius: 2px; background: #ffffff;"></span>
                Own Knowledge (P3)
              </span>
            </div>
          </div>
          <div style="font-size: 6.9pt; color: #475569; font-style: italic; margin-bottom: 2px;">
            ${right.q4.note}
          </div>
          <div style="font-size: 7.1pt; color: #334155; background: #f8fafc; border-left: 3px solid #1e293b; padding: 2.5px 7px; border-radius: 3px;">
            <strong>Strategy:</strong> ${right.q4.guidance}
          </div>
        </div>
        <!-- 23 ruled lines for Q4 -->
        <div style="margin-bottom: 4px;">
          ${Array(23).fill('<div style="height: 18px; border-bottom: 1px dotted #94a3b8; margin-top: 1px;"></div>').join('')}
        </div>
      </div>

      <!-- Marking Rubric Footer -->
      <div style="border: 1.5px solid #cbd5e1; border-radius: 6px; background: #ffffff; padding: 5px 8px; margin-top: auto;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px;">
          <strong style="font-size: 7.3pt; color: #0f172a; text-transform: uppercase;">Edexcel Paper 1 Marking Criteria &bull; Level Descriptors</strong>
          <div style="display: flex; gap: 8px;">
            <span style="font-size: 7.2pt; font-weight: 700; border: 1px solid #94a3b8; padding: 1px 6px; border-radius: 3px; background: #f8fafc;">Q3: &nbsp;&nbsp;&nbsp;&nbsp; / 4</span>
            <span style="font-size: 7.2pt; font-weight: 700; border: 1px solid #94a3b8; padding: 1px 6px; border-radius: 3px; background: #f8fafc;">Q4: &nbsp;&nbsp;&nbsp;&nbsp; / 12</span>
            <span style="font-size: 7.2pt; font-weight: 800; border: 1px solid #0f172a; padding: 1px 6px; border-radius: 3px; background: #0f172a; color: #fff;">Total: &nbsp;&nbsp;&nbsp;&nbsp; / 16</span>
          </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 5px; font-size: 6.5pt; color: #334155;">
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 3px; padding: 2px 4px;"><strong>Q4 Level 1 (1–3m):</strong> Simple generalised descriptive points.</div>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 3px; padding: 2px 4px;"><strong>Q4 Level 2 (4–6m):</strong> Some explanation; limited own knowledge.</div>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 3px; padding: 2px 4px;"><strong>Q4 Level 3 (7–9m):</strong> Developed explanation using both stimulus &amp; own knowledge.</div>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 3px; padding: 2px 4px;"><strong>Q4 Level 4 (10–12m):</strong> Multi-causal analytical explanation with direct focus on causation.</div>
        </div>
      </div>
    </div>
    `;
  }

  // Pattern 2: 16-Mark (+4 SPaG) Capstone Essay
  if (right.type === 'essay_16m') {
    const e = right.essay;
    return `
    <div class="page page-right" style="page-break-before: always; page-break-after: always; box-sizing: border-box; width: 100%; height: 1123px; padding: 16px 20px; font-family: 'Inter', sans-serif; background-color: #ffffff; display: flex; flex-direction: column; justify-content: space-between; overflow: hidden;">
      <div>
        ${headerHtml}

        <!-- 16-Mark Statement Box -->
        <div style="background: #ffffff; border: 2px solid #1e3a8a; border-radius: 6px; padding: 7px 11px; margin-bottom: 5px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-size: 8.8pt; color: #1e3a8a;">${e.title}</strong>
            <span style="font-size: 7.6pt; font-weight: 800; color: #ffffff; background: #1e3a8a; padding: 1.5px 7px; border-radius: 3px;">[16 + 4 SPaG = 20 Marks]</span>
          </div>
          <div style="font-size: 7.2pt; font-weight: 700; color: #047857; text-transform: uppercase; margin-bottom: 2px;">
            ${e.spanNote}
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 10pt; font-weight: 700; color: #0f172a; line-height: 1.35; margin-bottom: 4px;">
            ${e.statement}
          </div>
          <!-- Stimulus Tracker -->
          <div style="background: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 4px; padding: 3px 6px; margin-bottom: 3px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 4px;">
            <span style="font-size: 7.1pt; font-weight: 700; color: #1e293b; text-transform: uppercase;">You may use the following in your answer:</span>
            <div style="display: flex; gap: 8px; align-items: center;">
              ${e.stimulus
                .map(
                  (s) => `
                <span style="display: inline-flex; align-items: center; gap: 4px; font-size: 7.2pt; font-weight: 600; color: #0f172a; background: #ffffff; border: 1px solid #94a3b8; padding: 1px 5px; border-radius: 3px;">
                  <span style="display: inline-block; width: 9px; height: 9px; border: 1.5px solid #1e293b; border-radius: 2px; background: #ffffff;"></span>
                  ${s}
                </span>
              `,
                )
                .join('')}
              <span style="display: inline-flex; align-items: center; gap: 4px; font-size: 7.2pt; font-weight: 700; color: #0f172a; background: #ffffff; border: 1px solid #94a3b8; padding: 1px 5px; border-radius: 3px;">
                <span style="display: inline-block; width: 9px; height: 9px; border: 1.5px solid #1e293b; border-radius: 2px; background: #ffffff;"></span>
                Own Knowledge (Required)
              </span>
            </div>
          </div>
          <div style="font-size: 6.9pt; color: #334155; background: #f8fafc; border-left: 3px solid #1e3a8a; padding: 2.5px 7px; border-radius: 3px;">
            <strong>Strategy:</strong> ${e.guidance}
          </div>
        </div>

        <!-- PEEL Essay Architecture Tracking Ribbon -->
        <div style="background: #e2e8f0; border: 1px solid #cbd5e1; border-radius: 4px; padding: 3px 7px; margin-bottom: 4px; display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 6.8pt; font-weight: 800; color: #1e293b; text-transform: uppercase;">PEEL Paragraph Tracker:</span>
          <div style="display: flex; gap: 6px; font-size: 6.8pt; color: #0f172a;">
            ${e.checklist
              .map(
                (c) => `
              <span style="display: inline-flex; align-items: center; gap: 3px; background: #ffffff; border: 1px solid #94a3b8; padding: 1px 4px; border-radius: 2px;">
                <span style="display: inline-block; width: 8px; height: 8px; border: 1px solid #1e293b; border-radius: 2px;"></span>
                ${c}
              </span>
            `,
              )
              .join('')}
          </div>
        </div>

        <!-- 28 Ruled Writing Lines -->
        <div style="margin-bottom: 4px;">
          ${Array(e.lines).fill('<div style="height: 18px; border-bottom: 1px dotted #94a3b8; margin-top: 1px;"></div>').join('')}
        </div>
      </div>

      <!-- 16-Mark + SPaG Marking Rubric Footer -->
      <div style="border: 1.5px solid #1e3a8a; border-radius: 6px; background: #ffffff; padding: 5px 8px; margin-top: auto;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px;">
          <strong style="font-size: 7.3pt; color: #1e3a8a; text-transform: uppercase;">Edexcel Q5/Q6 Level Descriptors (AO1 Knowledge [6m] &bull; AO2 Judgement [10m] &bull; AO4 SPaG [4m])</strong>
          <div style="display: flex; gap: 8px;">
            <span style="font-size: 7.2pt; font-weight: 700; border: 1px solid #94a3b8; padding: 1px 6px; border-radius: 3px; background: #f8fafc;">Content: &nbsp;&nbsp;&nbsp;&nbsp; / 16</span>
            <span style="font-size: 7.2pt; font-weight: 700; border: 1px solid #94a3b8; padding: 1px 6px; border-radius: 3px; background: #f8fafc;">SPaG: &nbsp;&nbsp;&nbsp;&nbsp; / 4</span>
            <span style="font-size: 7.2pt; font-weight: 800; border: 1px solid #1e3a8a; padding: 1px 6px; border-radius: 3px; background: #1e3a8a; color: #fff;">Total: &nbsp;&nbsp;&nbsp;&nbsp; / 20</span>
          </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 5px; font-size: 6.5pt; color: #334155;">
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 3px; padding: 2px 4px;"><strong>Level 1 (1–4m):</strong> Simple generalized points; lacks cross-era span.</div>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 3px; padding: 2px 4px;"><strong>Level 2 (5–8m):</strong> Descriptive comparison; uneven argument balance.</div>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 3px; padding: 2px 4px;"><strong>Level 3 (9–12m):</strong> Developed two-sided analytical debate with own knowledge.</div>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 3px; padding: 2px 4px;"><strong>Level 4 (13–16m):</strong> Sustained, nuanced judgement weighing criteria across the broad chronological period.</div>
        </div>
      </div>
    </div>
    `;
  }

  // Pattern 3: Section A Western Front (Features + Utility Q2a)
  if (right.type === 'features_utility') {
    return `
    <div class="page page-right" style="page-break-before: always; page-break-after: always; box-sizing: border-box; width: 100%; height: 1123px; padding: 16px 20px; font-family: 'Inter', sans-serif; background-color: #ffffff; display: flex; flex-direction: column; justify-content: space-between; overflow: hidden;">
      <div>
        ${headerHtml}

        <!-- Question 1(a) [2 Marks] -->
        <div style="background: #ffffff; border: 1.5px solid #1e3a8a; border-radius: 5px; padding: 5px 9px; margin-bottom: 3px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <strong style="font-size: 8.2pt; color: #1e3a8a;">${right.q1a.title}</strong>
            <span style="font-size: 7.2pt; font-weight: 800; color: #1e3a8a; background: #eff6ff; border: 1px solid #bfdbfe; padding: 1px 5px; border-radius: 3px;">[2 Marks]</span>
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 9.2pt; font-weight: 700; color: #0f172a; margin: 2px 0;">
            ${right.q1a.question}
          </div>
        </div>
        <div style="margin-bottom: 6px;">
          ${Array(right.q1a.lines).fill('<div style="height: 18px; border-bottom: 1px dotted #94a3b8; margin-top: 1px;"></div>').join('')}
        </div>

        <!-- Question 1(b) [2 Marks] -->
        <div style="background: #ffffff; border: 1.5px solid #1e3a8a; border-radius: 5px; padding: 5px 9px; margin-bottom: 3px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <strong style="font-size: 8.2pt; color: #1e3a8a;">${right.q1b.title}</strong>
            <span style="font-size: 7.2pt; font-weight: 800; color: #1e3a8a; background: #eff6ff; border: 1px solid #bfdbfe; padding: 1px 5px; border-radius: 3px;">[2 Marks]</span>
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 9.2pt; font-weight: 700; color: #0f172a; margin: 2px 0;">
            ${right.q1b.question}
          </div>
        </div>
        <div style="margin-bottom: 8px;">
          ${Array(right.q1b.lines).fill('<div style="height: 18px; border-bottom: 1px dotted #94a3b8; margin-top: 1px;"></div>').join('')}
        </div>

        <!-- Question 2(a) Source Utility [8 Marks] -->
        <div style="background: #ffffff; border: 1.5px solid #334155; border-radius: 6px; padding: 6px 9px; margin-bottom: 4px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-size: 8.5pt; color: #0f172a;">${right.q2a.title}</strong>
            <span style="font-size: 7.5pt; font-weight: 800; color: #0f172a; background: #f1f5f9; border: 1px solid #cbd5e1; padding: 1px 6px; border-radius: 3px;">[8 Marks]</span>
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 9.4pt; font-weight: 700; color: #0f172a; line-height: 1.3; margin-bottom: 3px;">
            ${right.q2a.question}
          </div>
          
          <!-- Sources A and B Box -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 3px;">
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; padding: 4px 6px; font-size: 6.8pt; color: #1e293b; line-height: 1.25;">
              ${right.q2a.sourceA.replace('Source A:', '<strong style="color: #1e3a8a;">Source A:</strong>')}
            </div>
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; padding: 4px 6px; font-size: 6.8pt; color: #1e293b; line-height: 1.25;">
              ${right.q2a.sourceB.replace('Source B:', '<strong style="color: #1e3a8a;">Source B:</strong>')}
            </div>
          </div>

          <!-- Provenance Clue Box (Strictly per user rule) -->
          <div style="background: #fef3c7; border: 1px solid #f59e0b; border-radius: 4px; padding: 2.5px 6px; font-size: 6.8pt; color: #92400e; margin-bottom: 2px;">
            <strong>🔍 Provenance Clue:</strong> ${right.q2a.provenanceClue}
          </div>
          <div style="font-size: 6.9pt; color: #334155; background: #f8fafc; border-left: 3px solid #334155; padding: 2px 6px; border-radius: 3px;">
            <strong>Strategy:</strong> ${right.q2a.guidance}
          </div>
        </div>
        <!-- 16 Ruled Lines for Q2a -->
        <div style="margin-bottom: 4px;">
          ${Array(right.q2a.lines).fill('<div style="height: 18px; border-bottom: 1px dotted #94a3b8; margin-top: 1px;"></div>').join('')}
        </div>
      </div>

      <!-- Section A Marking Rubric Footer -->
      <div style="border: 1.5px solid #cbd5e1; border-radius: 6px; background: #ffffff; padding: 4px 8px; margin-top: auto;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <strong style="font-size: 7.2pt; color: #0f172a; text-transform: uppercase;">Edexcel Paper 1 (Section A) Marking Scheme</strong>
          <div style="display: flex; gap: 8px;">
            <span style="font-size: 7.2pt; font-weight: 700; border: 1px solid #94a3b8; padding: 1px 6px; border-radius: 3px; background: #f8fafc;">Q1a: &nbsp;&nbsp; / 2</span>
            <span style="font-size: 7.2pt; font-weight: 700; border: 1px solid #94a3b8; padding: 1px 6px; border-radius: 3px; background: #f8fafc;">Q1b: &nbsp;&nbsp; / 2</span>
            <span style="font-size: 7.2pt; font-weight: 700; border: 1px solid #94a3b8; padding: 1px 6px; border-radius: 3px; background: #f8fafc;">Q2a: &nbsp;&nbsp; / 8</span>
            <span style="font-size: 7.2pt; font-weight: 800; border: 1px solid #0f172a; padding: 1px 6px; border-radius: 3px; background: #0f172a; color: #fff;">Total: &nbsp;&nbsp; / 12</span>
          </div>
        </div>
      </div>
    </div>
    `;
  }

  // Pattern 4: Section A Western Front (Features + Follow-Up Grid Q2b)
  if (right.type === 'features_followup') {
    return `
    <div class="page page-right" style="page-break-before: always; page-break-after: always; box-sizing: border-box; width: 100%; height: 1123px; padding: 16px 20px; font-family: 'Inter', sans-serif; background-color: #ffffff; display: flex; flex-direction: column; justify-content: space-between; overflow: hidden;">
      <div>
        ${headerHtml}

        <!-- Question 1(a) [2 Marks] -->
        <div style="background: #ffffff; border: 1.5px solid #1e3a8a; border-radius: 5px; padding: 5px 9px; margin-bottom: 3px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <strong style="font-size: 8.2pt; color: #1e3a8a;">${right.q1a.title}</strong>
            <span style="font-size: 7.2pt; font-weight: 800; color: #1e3a8a; background: #eff6ff; border: 1px solid #bfdbfe; padding: 1px 5px; border-radius: 3px;">[2 Marks]</span>
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 9.2pt; font-weight: 700; color: #0f172a; margin: 2px 0;">
            ${right.q1a.question}
          </div>
        </div>
        <div style="margin-bottom: 6px;">
          ${Array(right.q1a.lines).fill('<div style="height: 18px; border-bottom: 1px dotted #94a3b8; margin-top: 1px;"></div>').join('')}
        </div>

        <!-- Question 1(b) [2 Marks] -->
        <div style="background: #ffffff; border: 1.5px solid #1e3a8a; border-radius: 5px; padding: 5px 9px; margin-bottom: 3px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <strong style="font-size: 8.2pt; color: #1e3a8a;">${right.q1b.title}</strong>
            <span style="font-size: 7.2pt; font-weight: 800; color: #1e3a8a; background: #eff6ff; border: 1px solid #bfdbfe; padding: 1px 5px; border-radius: 3px;">[2 Marks]</span>
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 9.2pt; font-weight: 700; color: #0f172a; margin: 2px 0;">
            ${right.q1b.question}
          </div>
        </div>
        <div style="margin-bottom: 8px;">
          ${Array(right.q1b.lines).fill('<div style="height: 18px; border-bottom: 1px dotted #94a3b8; margin-top: 1px;"></div>').join('')}
        </div>

        <!-- Question 2(b) Follow-Up Investigation Grid [4 Marks] -->
        <div style="background: #ffffff; border: 1.5px solid #047857; border-radius: 6px; padding: 6px 10px; margin-bottom: 6px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-size: 8.5pt; color: #065f46;">${right.q2b.title}</strong>
            <span style="font-size: 7.5pt; font-weight: 800; color: #065f46; background: #ecfdf5; border: 1px solid #a7f3d0; padding: 1px 6px; border-radius: 3px;">[4 Marks]</span>
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 9.4pt; font-weight: 700; color: #0f172a; line-height: 1.3; margin-bottom: 4px;">
            ${right.q2b.question}
          </div>
          <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; padding: 4px 7px; font-size: 7.2pt; color: #1e293b; line-height: 1.3; margin-bottom: 6px;">
            ${right.q2b.sourceExcerpt.replace('Source A:', '<strong style="color: #047857;">Source A:</strong>')}
          </div>
          <div style="font-size: 7pt; color: #334155; margin-bottom: 5px;">
            ${right.q2b.guidance}
          </div>

          <!-- Official Edexcel 4-Part Table with EXACT Official Phrases -->
          <div style="border: 1.5px solid #0f172a; border-radius: 5px; overflow: hidden; background: #ffffff;">
            ${right.q2b.tablePhrases
              .map(
                (row, idx) => `
              <div style="display: grid; grid-template-columns: 240px 1fr; border-bottom: ${idx === 3 ? 'none' : '1px solid #cbd5e1'}; min-height: 38px;">
                <div style="background: #f1f5f9; border-right: 1px solid #cbd5e1; padding: 7px 9px; font-size: 7.5pt; font-weight: 700; color: #0f172a; display: flex; align-items: center;">
                  ${row.label}
                </div>
                <div style="padding: 6px 9px; font-size: 7.1pt; color: #64748b; font-style: italic; display: flex; flex-direction: column; justify-content: space-between;">
                  <span>${row.placeholder}</span>
                  <div style="width: 100%; border-bottom: 1px dotted #94a3b8; height: 12px;"></div>
                </div>
              </div>
            `,
              )
              .join('')}
          </div>
        </div>
      </div>

      <!-- Section A Marking Rubric Footer -->
      <div style="border: 1.5px solid #cbd5e1; border-radius: 6px; background: #ffffff; padding: 5px 8px; margin-top: auto;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <strong style="font-size: 7.2pt; color: #0f172a; text-transform: uppercase;">Edexcel Paper 1 (Section A) Marking Scheme</strong>
          <div style="display: flex; gap: 8px;">
            <span style="font-size: 7.2pt; font-weight: 700; border: 1px solid #94a3b8; padding: 1px 6px; border-radius: 3px; background: #f8fafc;">Q1a: &nbsp;&nbsp; / 2</span>
            <span style="font-size: 7.2pt; font-weight: 700; border: 1px solid #94a3b8; padding: 1px 6px; border-radius: 3px; background: #f8fafc;">Q1b: &nbsp;&nbsp; / 2</span>
            <span style="font-size: 7.2pt; font-weight: 700; border: 1px solid #94a3b8; padding: 1px 6px; border-radius: 3px; background: #f8fafc;">Q2b: &nbsp;&nbsp; / 4</span>
            <span style="font-size: 7.2pt; font-weight: 800; border: 1px solid #0f172a; padding: 1px 6px; border-radius: 3px; background: #0f172a; color: #fff;">Total: &nbsp;&nbsp; / 8</span>
          </div>
        </div>
      </div>
    </div>
    `;
  }
}

// Helper: Render Cover Page (Page 1)
function renderCoverPage() {
  return `
  <div class="page page-cover" style="page-break-before: always; page-break-after: always; box-sizing: border-box; width: 100%; height: 1123px; padding: 40px 35px; font-family: 'Inter', sans-serif; background: #0f172a; color: #ffffff; display: flex; flex-direction: column; justify-content: space-between; overflow: hidden; position: relative;">
    <!-- Decorative border -->
    <div style="position: absolute; top: 18px; left: 18px; right: 18px; bottom: 18px; border: 2px solid #334155; border-radius: 8px; pointer-events: none;"></div>
    <div style="position: absolute; top: 22px; left: 22px; right: 22px; bottom: 22px; border: 1px solid #1e293b; border-radius: 6px; pointer-events: none;"></div>

    <div style="position: relative; z-index: 2;">
      <!-- Exam Board Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #f59e0b; padding-bottom: 12px; margin-bottom: 30px;">
        <span style="font-size: 9pt; font-weight: 800; color: #f59e0b; letter-spacing: 1.5px; text-transform: uppercase;">
          Edexcel GCSE (9–1) History &bull; Paper 1 (1HI0/11)
        </span>
        <span style="font-size: 8.5pt; font-weight: 700; background: #1e293b; color: #94a3b8; padding: 3px 10px; border-radius: 4px; border: 1px solid #334155;">
          Official Specification Edition
        </span>
      </div>

      <!-- Main Title Block -->
      <div style="margin-bottom: 25px;">
        <div style="font-size: 11pt; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px;">
          Thematic Study &amp; Historic Environment
        </div>
        <h1 style="font-family: 'Playfair Display', Georgia, serif; font-size: 32pt; line-height: 1.15; color: #ffffff; margin: 0 0 10px 0; font-weight: 900;">
          Medicine in Britain<br/>
          <span style="font-size: 22pt; color: #cbd5e1; font-weight: 400; font-style: italic;">c.1250–present</span>
        </h1>
        <h2 style="font-family: 'Playfair Display', Georgia, serif; font-size: 17pt; color: #f59e0b; margin: 0; font-weight: 700;">
          &amp; The British Sector of the Western Front, 1914–1918
        </h2>
      </div>

      <!-- Subtitle Banner -->
      <div style="background: linear-gradient(90deg, #1e3a8a, #0f172a); border-left: 4px solid #f59e0b; padding: 12px 16px; border-radius: 4px; margin-bottom: 35px;">
        <div style="font-size: 13pt; font-weight: 800; color: #ffffff; letter-spacing: 0.5px;">
          VISUAL REVISION MASTERCLASSES &amp; EXAM ASSESSMENT GUIDE
        </div>
        <div style="font-size: 8.5pt; color: #cbd5e1; margin-top: 3px;">
          18 Dual-Page Spreads Combining Conceptual Cognitive Mapping with Edexcel Exam Question Mastery
        </div>
      </div>

      <!-- Feature Grid -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 30px;">
        <div style="background: #1e293b; border: 1px solid #334155; border-radius: 6px; padding: 12px 14px;">
          <div style="font-size: 9pt; font-weight: 800; color: #f59e0b; margin-bottom: 4px;">
            ✦ Complete Exam Question Rotation
          </div>
          <div style="font-size: 7.8pt; color: #cbd5e1; line-height: 1.4;">
            Every single question type from Paper 1 is systematically practiced: Q3 Similarity, Q3 Difference, Q4 Causal Explanation, Q5/Q6 16-Mark Judgement Essays, Western Front Features, Source Utility, and Follow-Up Investigation Grids.
          </div>
        </div>

        <div style="background: #1e293b; border: 1px solid #334155; border-radius: 6px; padding: 12px 14px;">
          <div style="font-size: 9pt; font-weight: 800; color: #f59e0b; margin-bottom: 4px;">
            ✦ Synoptic Cross-Era Evidence Banks
          </div>
          <div style="font-size: 7.8pt; color: #cbd5e1; line-height: 1.4;">
            Every 16-mark essay is paired with a dedicated comparative evidence bank on the facing page, giving pupils the direct cross-period evidence (spanning 150–300+ years) needed to achieve Level 4 sustained judgements.
          </div>
        </div>

        <div style="background: #1e293b; border: 1px solid #334155; border-radius: 6px; padding: 12px 14px;">
          <div style="font-size: 9pt; font-weight: 800; color: #f59e0b; margin-bottom: 4px;">
            ✦ Authentic Historical Sources &amp; Portraits
          </div>
          <div style="font-size: 7.8pt; color: #cbd5e1; line-height: 1.4;">
            Strictly authentic primary source imagery: contemporary portraits, medical tract engravings, Western Front trench diagrams, and epidemiological spot maps. No artificial or AI imagery.
          </div>
        </div>

        <div style="background: #1e293b; border: 1px solid #334155; border-radius: 6px; padding: 12px 14px;">
          <div style="font-size: 9pt; font-weight: 800; color: #f59e0b; margin-bottom: 4px;">
            ✦ Official Scaffolding &amp; Provenance Clues
          </div>
          <div style="font-size: 7.8pt; color: #cbd5e1; line-height: 1.4;">
            Features official Edexcel stimulus checklists, PEEL paragraph trackers, Western Front 4-part follow-up investigation phrases, and dedicated provenance guidance boxes for source utility.
          </div>
        </div>
      </div>
    </div>

    <!-- Candidate Identification Footer -->
    <div style="position: relative; z-index: 2; background: #1e293b; border: 1.5px solid #334155; border-radius: 6px; padding: 12px 16px;">
      <div style="display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 15px; font-size: 8pt;">
        <div>
          <span style="color: #94a3b8; font-weight: 600; display: block; margin-bottom: 2px;">CANDIDATE NAME:</span>
          <div style="border-bottom: 1px dotted #64748b; height: 18px;"></div>
        </div>
        <div>
          <span style="color: #94a3b8; font-weight: 600; display: block; margin-bottom: 2px;">CANDIDATE NUMBER:</span>
          <div style="border-bottom: 1px dotted #64748b; height: 18px;"></div>
        </div>
        <div>
          <span style="color: #94a3b8; font-weight: 600; display: block; margin-bottom: 2px;">TARGET GRADE:</span>
          <div style="border-bottom: 1px dotted #64748b; height: 18px;"></div>
        </div>
      </div>
    </div>
  </div>
  `;
}

// Helper: Render Inside Front Cover (Page 2)
function renderInsideCover() {
  return `
  <div class="page page-inside-front" style="page-break-before: always; page-break-after: always; box-sizing: border-box; width: 100%; height: 1123px; padding: 30px 25px; font-family: 'Inter', sans-serif; background: #ffffff; color: #0f172a; display: flex; flex-direction: column; justify-content: space-between; overflow: hidden;">
    <div>
      <!-- Header -->
      <div style="border-bottom: 2px solid #0f172a; padding-bottom: 8px; margin-bottom: 16px;">
        <span style="font-size: 8pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; letter-spacing: 1px;">
          Edexcel GCSE (9–1) History &bull; Paper 1 Specification Mastery
        </span>
        <h2 style="font-family: 'Playfair Display', Georgia, serif; font-size: 18pt; margin: 4px 0 0 0; color: #0f172a;">
          How Paper 1 is Structured, Timed &amp; Assessed
        </h2>
        <p style="font-size: 8.5pt; color: #475569; margin: 3px 0 0 0;">
          Total Exam Duration: <strong>1 Hour 15 Minutes (75 Minutes)</strong> &bull; Total Paper Marks: <strong>52 Marks</strong> (including 4 marks for SPaG)
        </p>
      </div>

      <!-- Two Main Sections -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 18px;">
        <!-- Section A -->
        <div style="border: 2px solid #1e3a8a; border-radius: 6px; padding: 12px; background: #f8fafc;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid #1e3a8a; padding-bottom: 6px; margin-bottom: 8px;">
            <strong style="font-size: 10pt; color: #1e3a8a;">SECTION A: HISTORIC ENVIRONMENT</strong>
            <span style="font-size: 7.5pt; font-weight: 800; background: #1e3a8a; color: #fff; padding: 2px 6px; border-radius: 3px;">16 Marks (25 mins)</span>
          </div>
          <div style="font-size: 7.8pt; color: #334155; line-height: 1.4; margin-bottom: 8px;">
            Focuses exclusively on <em>The British Sector of the Western Front, 1914–1918: injuries, treatment and the trenches</em>.
          </div>
          <div style="space-y: 6px;">
            <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 4px; padding: 6px; margin-bottom: 6px;">
              <strong style="font-size: 8pt; color: #0f172a;">Q1(a) &amp; Q1(b): Feature Questions [2m + 2m = 4 Marks]</strong>
              <div style="font-size: 7.2pt; color: #475569; margin-top: 2px;">
                Describe one feature of... (Award 1 mark for feature, 1 mark for supporting historical detail). Takes ~5 mins total.
              </div>
            </div>

            <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 4px; padding: 6px; margin-bottom: 6px;">
              <strong style="font-size: 8pt; color: #0f172a;">Q2(a): Source Utility Enquiry [8 Marks]</strong>
              <div style="font-size: 7.2pt; color: #475569; margin-top: 2px;">
                How useful are Sources A and B for an enquiry into... Requires evaluating Content, Own Knowledge, and Provenance (Nature, Origin, Motive) for BOTH sources. Takes ~12 mins.
              </div>
            </div>

            <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 4px; padding: 6px;">
              <strong style="font-size: 8pt; color: #0f172a;">Q2(b): Follow-Up Investigation Grid [4 Marks]</strong>
              <div style="font-size: 7.2pt; color: #475569; margin-top: 2px;">
                Complete the 4-part grid: Detail in Source, Question to ask, Type of source to use (must be authentic contemporary record), and How it helps. Takes ~8 mins.
              </div>
            </div>
          </div>
        </div>

        <!-- Section B -->
        <div style="border: 2px solid #0f172a; border-radius: 6px; padding: 12px; background: #f8fafc;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid #0f172a; padding-bottom: 6px; margin-bottom: 8px;">
            <strong style="font-size: 10pt; color: #0f172a;">SECTION B: THEMATIC STUDY</strong>
            <span style="font-size: 7.5pt; font-weight: 800; background: #0f172a; color: #fff; padding: 2px 6px; border-radius: 3px;">36 Marks (50 mins)</span>
          </div>
          <div style="font-size: 7.8pt; color: #334155; line-height: 1.4; margin-bottom: 8px;">
            Focuses on <em>Medicine in Britain, c.1250–present</em> across Medieval, Renaissance, 18th/19th C, and Modern eras.
          </div>
          <div style="space-y: 6px;">
            <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 4px; padding: 6px; margin-bottom: 6px;">
              <strong style="font-size: 8pt; color: #0f172a;">Q3: Similarity OR Difference [4 Marks]</strong>
              <div style="font-size: 7.2pt; color: #475569; margin-top: 2px;">
                Explain one way in which X in [period 1] was similar to / different from X in [period 2]. Requires 1 developed comparative PEEL paragraph with evidence from both eras. Takes ~5 mins.
              </div>
            </div>

            <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 4px; padding: 6px; margin-bottom: 6px;">
              <strong style="font-size: 8pt; color: #0f172a;">Q4: Multi-Causal Explanation [12 Marks]</strong>
              <div style="font-size: 7.2pt; color: #475569; margin-top: 2px;">
                Explain why... Requires 3 developed PEEL paragraphs. Must address the two stimulus points plus one factor of your own knowledge. Takes ~18 mins.
              </div>
            </div>

            <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 4px; padding: 6px;">
              <strong style="font-size: 8pt; color: #0f172a;">Q5 / Q6: Judgement Statement Essay [16 + 4 SPaG = 20 Marks]</strong>
              <div style="font-size: 7.2pt; color: #475569; margin-top: 2px;">
                Student chooses between Q5 or Q6. A broad cross-era statement spanning 150–300+ years. Must evaluate both sides and reach a sustained, justified conclusion. Takes ~25 mins.
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Assessment Objectives Breakdown -->
      <div style="border: 1.5px solid #cbd5e1; border-radius: 6px; padding: 10px 14px; background: #ffffff;">
        <div style="font-size: 8.5pt; font-weight: 800; color: #0f172a; text-transform: uppercase; margin-bottom: 6px;">
          The Four Assessment Objectives (AOs) You Are Graded On:
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 10px; font-size: 7.2pt;">
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 6px;">
            <strong style="color: #1e3a8a; display: block; margin-bottom: 2px;">AO1: Knowledge (11m)</strong>
            Demonstrate knowledge and understanding of the key features and characteristics of the periods studied.
          </div>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 6px;">
            <strong style="color: #1e3a8a; display: block; margin-bottom: 2px;">AO2: Analysis (25m)</strong>
            Explain and analyse historical events using second-order concepts: causation, continuity, change, and significance.
          </div>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 6px;">
            <strong style="color: #1e3a8a; display: block; margin-bottom: 2px;">AO3: Sources (12m)</strong>
            Analyse and evaluate primary historical sources to make substantiated judgements regarding their utility.
          </div>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 6px;">
            <strong style="color: #1e3a8a; display: block; margin-bottom: 2px;">AO4: SPaG (4m)</strong>
            Spelling, punctuation, grammar, and appropriate use of specialist historical vocabulary (assessed in Q5/Q6).
          </div>
        </div>
      </div>
    </div>

    <!-- Rule of Thumb Box -->
    <div style="background: #f1f5f9; border-left: 4px solid #1e3a8a; padding: 8px 12px; border-radius: 4px;">
      <span style="font-size: 7.8pt; font-weight: 700; color: #1e3a8a;">CRITICAL EXAM TIME-MANAGEMENT RULE:</span>
      <span style="font-size: 7.5pt; color: #334155; margin-left: 6px;">
        Allocate roughly <strong>1.4 minutes per mark</strong>. Spend 25 minutes on Section A (Western Front) and 50 minutes on Section B (Thematic Study). Never spend more than 25 minutes on the 16-mark essay!
      </span>
    </div>
  </div>
  `;
}

// Helper: Render Contents & Assessment Blueprint Matrix (Page 3)
function renderContentsMatrix() {
  return `
  <div class="page page-contents" style="page-break-before: always; page-break-after: always; box-sizing: border-box; width: 100%; height: 1123px; padding: 25px 22px; font-family: 'Inter', sans-serif; background: #ffffff; color: #0f172a; display: flex; flex-direction: column; justify-content: space-between; overflow: hidden;">
    <div>
      <div style="border-bottom: 2px solid #0f172a; padding-bottom: 6px; margin-bottom: 10px;">
        <span style="font-size: 8pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; letter-spacing: 1px;">
          Master Course Architecture &bull; 18 Dual-Page Spreads
        </span>
        <h2 style="font-family: 'Playfair Display', Georgia, serif; font-size: 16pt; margin: 3px 0 0 0; color: #0f172a;">
          Visual Masterclass &amp; Rotated Assessment Blueprint
        </h2>
      </div>

      <!-- Compact 18-Spread Table -->
      <table style="width: 100%; border-collapse: collapse; font-size: 7pt; line-height: 1.25;">
        <thead>
          <tr style="background: #0f172a; color: #ffffff; text-align: left;">
            <th style="padding: 4px 6px; border: 1px solid #334155; width: 45px;">Spread</th>
            <th style="padding: 4px 6px; border: 1px solid #334155; width: 50px;">Topic</th>
            <th style="padding: 4px 6px; border: 1px solid #334155;">Left Page: Visual Masterclass Focus</th>
            <th style="padding: 4px 6px; border: 1px solid #334155;">Right Page: Rotated Exam Assessment</th>
            <th style="padding: 4px 6px; border: 1px solid #334155; width: 75px; text-align: center;">Question Type</th>
            <th style="padding: 4px 6px; border: 1px solid #334155; width: 45px; text-align: center;">Tariff</th>
          </tr>
        </thead>
        <tbody>
          <!-- Topic 1 -->
          <tr style="background: #f8fafc;"><td style="padding: 3px 6px; border: 1px solid #cbd5e1; font-weight: 700;">1 (pp.4-5)</td><td style="padding: 3px 6px; border: 1px solid #cbd5e1;">KT 1.1</td><td style="padding: 3px 6px; border: 1px solid #cbd5e1;">Medieval Ideas of Cause: Church, Hippocrates &amp; Galen</td><td style="padding: 3px 6px; border: 1px solid #cbd5e1;">Q3 Similarity (Cause) &amp; Q4 Explain Why (Stagnation)</td><td style="padding: 3px 6px; border: 1px solid #cbd5e1; text-align: center; font-weight: 700; color: #1e3a8a;">Q3(S) + Q4</td><td style="padding: 3px 6px; border: 1px solid #cbd5e1; text-align: center; font-weight: 700;">16m</td></tr>
          <tr style="background: #ffffff;"><td style="padding: 3px 6px; border: 1px solid #cbd5e1; font-weight: 700;">2 (pp.6-7)</td><td style="padding: 3px 6px; border: 1px solid #cbd5e1;">KT 1.2</td><td style="padding: 3px 6px; border: 1px solid #cbd5e1;">Medieval Healers, Bloodletting &amp; Monastic Hospitals</td><td style="padding: 3px 6px; border: 1px solid #cbd5e1;">Q3 Difference (Hospitals) &amp; Q4 Explain Why (Ineffectiveness)</td><td style="padding: 3px 6px; border: 1px solid #cbd5e1; text-align: center; font-weight: 700; color: #1e3a8a;">Q3(D) + Q4</td><td style="padding: 3px 6px; border: 1px solid #cbd5e1; text-align: center; font-weight: 700;">16m</td></tr>
          <tr style="background: #eff6ff;"><td style="padding: 3px 6px; border: 1px solid #93c5fd; font-weight: 700; color: #1e3a8a;">3 (pp.8-9)</td><td style="padding: 3px 6px; border: 1px solid #93c5fd; font-weight: 700; color: #1e3a8a;">KT 1.3</td><td style="padding: 3px 6px; border: 1px solid #93c5fd; font-weight: 700;">The Black Death 1348 + Synoptic Comparative Bank</td><td style="padding: 3px 6px; border: 1px solid #93c5fd; font-weight: 700;">★ Q5/Q6 Capstone Essay: Black Death vs 1665 Plague (c.1348–1665)</td><td style="padding: 3px 6px; border: 1px solid #93c5fd; text-align: center; font-weight: 800; color: #1e3a8a;">16m Essay</td><td style="padding: 3px 6px; border: 1px solid #93c5fd; text-align: center; font-weight: 800; color: #1e3a8a;">20m</td></tr>

          <!-- Topic 2 -->
          <tr style="background: #f8fafc;"><td style="padding: 3px 6px; border: 1px solid #cbd5e1; font-weight: 700;">4 (pp.10-11)</td><td style="padding: 3px 6px; border: 1px solid #cbd5e1;">KT 2.1</td><td style="padding: 3px 6px; border: 1px solid #cbd5e1;">Scientific Shift: Printing Press, Royal Society &amp; Sydenham</td><td style="padding: 3px 6px; border: 1px solid #cbd5e1;">Q3 Similarity (Cause) &amp; Q4 Explain Why (Ideas Spreading)</td><td style="padding: 3px 6px; border: 1px solid #cbd5e1; text-align: center; font-weight: 700; color: #1e3a8a;">Q3(S) + Q4</td><td style="padding: 3px 6px; border: 1px solid #cbd5e1; text-align: center; font-weight: 700;">16m</td></tr>
          <tr style="background: #ffffff;"><td style="padding: 3px 6px; border: 1px solid #cbd5e1; font-weight: 700;">5 (pp.12-13)</td><td style="padding: 3px 6px; border: 1px solid #cbd5e1;">KT 2.2</td><td style="padding: 3px 6px; border: 1px solid #cbd5e1;">Andreas Vesalius: 1543 Fabrica &amp; Anatomical Errors</td><td style="padding: 3px 6px; border: 1px solid #cbd5e1;">Q3 Difference (Dissection) &amp; Q4 Explain Why (Opposition)</td><td style="padding: 3px 6px; border: 1px solid #cbd5e1; text-align: center; font-weight: 700; color: #1e3a8a;">Q3(D) + Q4</td><td style="padding: 3px 6px; border: 1px solid #cbd5e1; text-align: center; font-weight: 700;">16m</td></tr>
          <tr style="background: #eff6ff;"><td style="padding: 3px 6px; border: 1px solid #93c5fd; font-weight: 700; color: #1e3a8a;">6 (pp.14-15)</td><td style="padding: 3px 6px; border: 1px solid #93c5fd; font-weight: 700; color: #1e3a8a;">KT 2.3</td><td style="padding: 3px 6px; border: 1px solid #93c5fd; font-weight: 700;">William Harvey Circulation &amp; Great Plague 1665</td><td style="padding: 3px 6px; border: 1px solid #93c5fd; font-weight: 700;">★ Q5/Q6 Capstone Essay: Individuals vs Institutions (c.1500–1800)</td><td style="padding: 3px 6px; border: 1px solid #93c5fd; text-align: center; font-weight: 800; color: #1e3a8a;">16m Essay</td><td style="padding: 3px 6px; border: 1px solid #93c5fd; text-align: center; font-weight: 800; color: #1e3a8a;">20m</td></tr>

          <!-- Topic 3 -->
          <tr style="background: #f8fafc;"><td style="padding: 3px 6px; border: 1px solid #cbd5e1; font-weight: 700;">7 (pp.16-17)</td><td style="padding: 3px 6px; border: 1px solid #cbd5e1;">KT 3.1</td><td style="padding: 3px 6px; border: 1px solid #cbd5e1;">Germ Theory Revolution: Pasteur 1861 &amp; Robert Koch</td><td style="padding: 3px 6px; border: 1px solid #cbd5e1;">Q3 Difference (Cause) &amp; Q4 Explain Why (British Delay)</td><td style="padding: 3px 6px; border: 1px solid #cbd5e1; text-align: center; font-weight: 700; color: #1e3a8a;">Q3(D) + Q4</td><td style="padding: 3px 6px; border: 1px solid #cbd5e1; text-align: center; font-weight: 700;">16m</td></tr>
          <tr style="background: #ffffff;"><td style="padding: 3px 6px; border: 1px solid #cbd5e1; font-weight: 700;">8 (pp.18-19)</td><td style="padding: 3px 6px; border: 1px solid #cbd5e1;">KT 3.2</td><td style="padding: 3px 6px; border: 1px solid #cbd5e1;">Surgical Revolution: Simpson, Lister &amp; Nightingale</td><td style="padding: 3px 6px; border: 1px solid #cbd5e1;">Q3 Similarity (Opposition) &amp; Q4 Explain Why (Safer Surgery)</td><td style="padding: 3px 6px; border: 1px solid #cbd5e1; text-align: center; font-weight: 700; color: #1e3a8a;">Q3(S) + Q4</td><td style="padding: 3px 6px; border: 1px solid #cbd5e1; text-align: center; font-weight: 700;">16m</td></tr>
          <tr style="background: #eff6ff;"><td style="padding: 3px 6px; border: 1px solid #93c5fd; font-weight: 700; color: #1e3a8a;">9 (pp.20-21)</td><td style="padding: 3px 6px; border: 1px solid #93c5fd; font-weight: 700; color: #1e3a8a;">KT 3.3</td><td style="padding: 3px 6px; border: 1px solid #93c5fd; font-weight: 700;">Prevention: Edward Jenner 1796 &amp; John Snow 1854</td><td style="padding: 3px 6px; border: 1px solid #93c5fd; font-weight: 700;">★ Q5/Q6 Capstone Essay: Vaccination vs Sanitation (c.1750–present)</td><td style="padding: 3px 6px; border: 1px solid #93c5fd; text-align: center; font-weight: 800; color: #1e3a8a;">16m Essay</td><td style="padding: 3px 6px; border: 1px solid #93c5fd; text-align: center; font-weight: 800; color: #1e3a8a;">20m</td></tr>

          <!-- Topic 4 -->
          <tr style="background: #f8fafc;"><td style="padding: 3px 6px; border: 1px solid #cbd5e1; font-weight: 700;">10 (pp.22-23)</td><td style="padding: 3px 6px; border: 1px solid #cbd5e1;">KT 4.1</td><td style="padding: 3px 6px; border: 1px solid #cbd5e1;">DNA Double Helix (1953), Human Genome &amp; Scanners</td><td style="padding: 3px 6px; border: 1px solid #cbd5e1;">Q3 Difference (Diagnosis) &amp; Q4 Explain Why (DNA Impact)</td><td style="padding: 3px 6px; border: 1px solid #cbd5e1; text-align: center; font-weight: 700; color: #1e3a8a;">Q3(D) + Q4</td><td style="padding: 3px 6px; border: 1px solid #cbd5e1; text-align: center; font-weight: 700;">16m</td></tr>
          <tr style="background: #ffffff;"><td style="padding: 3px 6px; border: 1px solid #cbd5e1; font-weight: 700;">11 (pp.24-25)</td><td style="padding: 3px 6px; border: 1px solid #cbd5e1;">KT 4.2</td><td style="padding: 3px 6px; border: 1px solid #cbd5e1;">Magic Bullets (Salvarsan &amp; Prontosil) + 1948 NHS</td><td style="padding: 3px 6px; border: 1px solid #cbd5e1;">Q3 Similarity (Chemicals) &amp; Q4 Explain Why (BMA Opposition)</td><td style="padding: 3px 6px; border: 1px solid #cbd5e1; text-align: center; font-weight: 700; color: #1e3a8a;">Q3(S) + Q4</td><td style="padding: 3px 6px; border: 1px solid #cbd5e1; text-align: center; font-weight: 700;">16m</td></tr>
          <tr style="background: #f8fafc;"><td style="padding: 3px 6px; border: 1px solid #cbd5e1; font-weight: 700;">12 (pp.26-27)</td><td style="padding: 3px 6px; border: 1px solid #cbd5e1;">KT 4.3</td><td style="padding: 3px 6px; border: 1px solid #cbd5e1;">Penicillin: Fleming 1928, Florey &amp; Chain, US WWII Scale</td><td style="padding: 3px 6px; border: 1px solid #cbd5e1;">Q3 Difference (Funding) &amp; Q4 Explain Why (WWII Production)</td><td style="padding: 3px 6px; border: 1px solid #cbd5e1; text-align: center; font-weight: 700; color: #1e3a8a;">Q3(D) + Q4</td><td style="padding: 3px 6px; border: 1px solid #cbd5e1; text-align: center; font-weight: 700;">16m</td></tr>
          <tr style="background: #eff6ff;"><td style="padding: 3px 6px; border: 1px solid #93c5fd; font-weight: 700; color: #1e3a8a;">13 (pp.28-29)</td><td style="padding: 3px 6px; border: 1px solid #93c5fd; font-weight: 700; color: #1e3a8a;">KT 4.4</td><td style="padding: 3px 6px; border: 1px solid #93c5fd; font-weight: 700;">Lung Cancer: Doll &amp; Hill, Anti-Smoking Legislation</td><td style="padding: 3px 6px; border: 1px solid #93c5fd; font-weight: 700;">★ Q5/Q6 Capstone Essay: Government Action in Public Health (c.1850–present)</td><td style="padding: 3px 6px; border: 1px solid #93c5fd; text-align: center; font-weight: 800; color: #1e3a8a;">16m Essay</td><td style="padding: 3px 6px; border: 1px solid #93c5fd; text-align: center; font-weight: 800; color: #1e3a8a;">20m</td></tr>

          <!-- Topic 5: Western Front -->
          <tr style="background: #fdf2f8;"><td style="padding: 3px 6px; border: 1px solid #fbcfe8; font-weight: 700; color: #9d174d;">14 (pp.30-31)</td><td style="padding: 3px 6px; border: 1px solid #fbcfe8;">KT 5.1</td><td style="padding: 3px 6px; border: 1px solid #fbcfe8;">Western Front Terrain: Ypres Mud, Somme &amp; Arras Caves</td><td style="padding: 3px 6px; border: 1px solid #fbcfe8;">Q1(a) &amp; Q1(b) Features + Q2(a) Source Utility (Transport)</td><td style="padding: 3px 6px; border: 1px solid #fbcfe8; text-align: center; font-weight: 700; color: #9d174d;">Features + Utility</td><td style="padding: 3px 6px; border: 1px solid #fbcfe8; text-align: center; font-weight: 700;">12m</td></tr>
          <tr style="background: #fdf2f8;"><td style="padding: 3px 6px; border: 1px solid #fbcfe8; font-weight: 700; color: #9d174d;">15 (pp.32-33)</td><td style="padding: 3px 6px; border: 1px solid #fbcfe8;">KT 5.2</td><td style="padding: 3px 6px; border: 1px solid #fbcfe8;">The Trench Defensive Grid, Dugouts &amp; Vermin Hygiene</td><td style="padding: 3px 6px; border: 1px solid #fbcfe8;">Q1(a) &amp; Q1(b) Features + Q2(b) Follow-Up Grid (Trench Life)</td><td style="padding: 3px 6px; border: 1px solid #fbcfe8; text-align: center; font-weight: 700; color: #9d174d;">Features + Follow-Up</td><td style="padding: 3px 6px; border: 1px solid #fbcfe8; text-align: center; font-weight: 700;">8m</td></tr>
          <tr style="background: #fdf2f8;"><td style="padding: 3px 6px; border: 1px solid #fbcfe8; font-weight: 700; color: #9d174d;">16 (pp.34-35)</td><td style="padding: 3px 6px; border: 1px solid #fbcfe8;">KT 5.3</td><td style="padding: 3px 6px; border: 1px solid #fbcfe8;">Trench Pathology: Chlorine, Phosgene, Mustard &amp; Trench Foot</td><td style="padding: 3px 6px; border: 1px solid #fbcfe8;">Q1(a) &amp; Q1(b) Features + Q2(a) Source Utility (Poison Gas)</td><td style="padding: 3px 6px; border: 1px solid #fbcfe8; text-align: center; font-weight: 700; color: #9d174d;">Features + Utility</td><td style="padding: 3px 6px; border: 1px solid #fbcfe8; text-align: center; font-weight: 700;">12m</td></tr>
          <tr style="background: #fdf2f8;"><td style="padding: 3px 6px; border: 1px solid #fbcfe8; font-weight: 700; color: #9d174d;">17 (pp.36-37)</td><td style="padding: 3px 6px; border: 1px solid #fbcfe8;">KT 5.4</td><td style="padding: 3px 6px; border: 1px solid #fbcfe8;">Chain of Evacuation: RAP &rarr; ADS &rarr; CCS &rarr; Base Hospital</td><td style="padding: 3px 6px; border: 1px solid #fbcfe8;">Q1(a) &amp; Q1(b) Features + Q2(b) Follow-Up Grid (CCS Work)</td><td style="padding: 3px 6px; border: 1px solid #fbcfe8; text-align: center; font-weight: 700; color: #9d174d;">Features + Follow-Up</td><td style="padding: 3px 6px; border: 1px solid #fbcfe8; text-align: center; font-weight: 700;">8m</td></tr>
          <tr style="background: #fdf2f8;"><td style="padding: 3px 6px; border: 1px solid #fbcfe8; font-weight: 700; color: #9d174d;">18 (pp.38-39)</td><td style="padding: 3px 6px; border: 1px solid #fbcfe8;">KT 5.5</td><td style="padding: 3px 6px; border: 1px solid #fbcfe8;">Medical Advances: Thomas Splint, Blood Depots, Plastic Surgery</td><td style="padding: 3px 6px; border: 1px solid #fbcfe8;">Q1(a) &amp; Q1(b) Features + Q2(a) Source Utility (Advances)</td><td style="padding: 3px 6px; border: 1px solid #fbcfe8; text-align: center; font-weight: 700; color: #9d174d;">Features + Utility</td><td style="padding: 3px 6px; border: 1px solid #fbcfe8; text-align: center; font-weight: 700;">12m</td></tr>
        </tbody>
      </table>
    </div>

    <!-- Summary Box -->
    <div style="background: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 4px; padding: 6px 12px; font-size: 7.2pt; color: #334155; display: flex; justify-content: space-between; align-items: center;">
      <span><strong>Rotation Summary:</strong> 3x Q3 Similarity [4m] &bull; 4x Q3 Difference [4m] &bull; 7x Q4 Explain Why [12m] &bull; 4x Q5/Q6 Capstone Essays [20m] &bull; 5x Western Front Sets</span>
      <span style="font-weight: 800; color: #1e3a8a;">Total 40 Pages Master Volume</span>
    </div>
  </div>
  `;
}

// Helper: Render Back Cover (Page 40)
function renderBackCover() {
  return `
  <div class="page page-back-cover" style="page-break-before: always; page-break-after: always; box-sizing: border-box; width: 100%; height: 1123px; padding: 30px 25px; font-family: 'Inter', sans-serif; background: #0f172a; color: #ffffff; display: flex; flex-direction: column; justify-content: space-between; overflow: hidden; position: relative;">
    <!-- Decorative border -->
    <div style="position: absolute; top: 18px; left: 18px; right: 18px; bottom: 18px; border: 2px solid #334155; border-radius: 8px; pointer-events: none;"></div>

    <div style="position: relative; z-index: 2;">
      <div style="border-bottom: 2px solid #f59e0b; padding-bottom: 8px; margin-bottom: 16px;">
        <span style="font-size: 8pt; font-weight: 800; color: #f59e0b; text-transform: uppercase; letter-spacing: 1.5px;">
          Edexcel GCSE History Exam Masterclass Toolkit
        </span>
        <h2 style="font-family: 'Playfair Display', Georgia, serif; font-size: 18pt; margin: 4px 0 0 0; color: #ffffff;">
          High-Scoring Analytical Connectives &amp; Sentence Stems
        </h2>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 16px;">
        <!-- Box 1: Similarity & Difference (Q3) -->
        <div style="background: #1e293b; border: 1px solid #334155; border-radius: 6px; padding: 10px 12px;">
          <strong style="font-size: 8.5pt; color: #f59e0b; display: block; margin-bottom: 4px;">
            ✦ Q3: Similarity &amp; Difference PEEL Stems
          </strong>
          <ul style="margin: 0; padding-left: 14px; font-size: 7.2pt; color: #cbd5e1; line-height: 1.4;">
            <li>"One key way in which [X in period 1] was similar to [X in period 2] was..."</li>
            <li>"Similarly, in both periods, medical practitioners relied upon..."</li>
            <li>"By contrast, a fundamental difference in the [second period] was..."</li>
            <li>"Whereas medieval physicians focused solely on spiritual care, modern doctors..."</li>
            <li>"This demonstrates significant continuity / radical change because..."</li>
          </ul>
        </div>

        <!-- Box 2: Causation (Q4) -->
        <div style="background: #1e293b; border: 1px solid #334155; border-radius: 6px; padding: 10px 12px;">
          <strong style="font-size: 8.5pt; color: #f59e0b; display: block; margin-bottom: 4px;">
            ✦ Q4: Multi-Causal Explanation Stems
          </strong>
          <ul style="margin: 0; padding-left: 14px; font-size: 7.2pt; color: #cbd5e1; line-height: 1.4;">
            <li>"A primary factor contributing to this breakthrough was..."</li>
            <li>"Consequently, this directly enabled scientists to..."</li>
            <li>"Furthermore, the impact of this factor was intensified by..."</li>
            <li>"This was especially significant because without this technology..."</li>
            <li>"Therefore, this factor was a vital catalyst in accelerating change..."</li>
          </ul>
        </div>

        <!-- Box 3: Source Utility & Provenance (Q2a) -->
        <div style="background: #1e293b; border: 1px solid #334155; border-radius: 6px; padding: 10px 12px;">
          <strong style="font-size: 8.5pt; color: #f59e0b; display: block; margin-bottom: 4px;">
            ✦ Q2(a): Source Utility &amp; Provenance Evaluation
          </strong>
          <ul style="margin: 0; padding-left: 14px; font-size: 7.2pt; color: #cbd5e1; line-height: 1.4;">
            <li>"Source A is useful for an enquiry into [topic] because it reveals that..."</li>
            <li>"This content is corroborated by my own knowledge that in 1916..."</li>
            <li>"However, the provenance affects its utility because, as an official War Office report, its motive was to..."</li>
            <li>"As a private diary written under fire, the author had no reason to exaggerate..."</li>
            <li>"Overall, Source A provides valuable insight into the logistical realities..."</li>
          </ul>
        </div>

        <!-- Box 4: 16-Mark Judgement Essays (Q5/Q6) -->
        <div style="background: #1e293b; border: 1px solid #334155; border-radius: 6px; padding: 10px 12px;">
          <strong style="font-size: 8.5pt; color: #f59e0b; display: block; margin-bottom: 4px;">
            ✦ Q5/Q6: Sustained Judgement &amp; Criteria Stems
          </strong>
          <ul style="margin: 0; padding-left: 14px; font-size: 7.2pt; color: #cbd5e1; line-height: 1.4;">
            <li>"To evaluate how far this statement is accurate, one must assess..."</li>
            <li>"On the one hand, evidence strongly supporting the statement is..."</li>
            <li>"On the other hand, this argument is challenged when examining..."</li>
            <li>"Although individual pioneers made vital breakthroughs, their impact depended upon..."</li>
            <li>"In conclusion, while [Factor A] was significant in the short term, [Factor B] was the decisive catalyst across the broader period because..."</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Publisher & Revision Signoff -->
    <div style="position: relative; z-index: 2; border-top: 1px solid #334155; padding-top: 12px; text-align: center;">
      <div style="font-size: 8pt; font-weight: 800; color: #f59e0b; letter-spacing: 1px; text-transform: uppercase;">
        Meoncross History &bull; GCSE Masterclass Series
      </div>
      <div style="font-size: 7.2pt; color: #94a3b8; margin-top: 3px;">
        Designed strictly to the Edexcel GCSE (9–1) History Specification (Paper 1: 1HI0/11) &bull; For classroom, intervention &amp; independent exam revision
      </div>
    </div>
  </div>
  `;
}

// Generate the Master HTML Document (40 Pages)
function generateMasterHtml() {
  const pagesHtml = SPREADS.map((spread, idx) => {
    // Spread 1 starts on page 4 (even/left), right page is page 5 (odd/right)
    const leftPageNum = (idx + 1) * 2 + 2;
    const rightPageNum = leftPageNum + 1;
    return renderLeftPage(spread, leftPageNum) + renderRightPage(spread, rightPageNum);
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Edexcel GCSE (9–1) History: Medicine in Britain &amp; Western Front — Visual Revision &amp; Assessment Guide</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 0;
    }
    * {
      box-sizing: border-box;
    }
    body {
      margin: 0;
      padding: 0;
      background: #e2e8f0;
      font-family: 'Inter', sans-serif;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .page {
      width: 210mm;
      height: 297mm;
      margin: 0 auto 20px auto;
      background: #ffffff;
      page-break-after: always;
      position: relative;
    }
    @media print {
      body {
        background: transparent;
      }
      .page {
        margin: 0;
        width: 100%;
        height: 100%;
      }
    }
  </style>
</head>
<body>
  ${renderCoverPage()}
  ${renderInsideCover()}
  ${renderContentsMatrix()}
  ${pagesHtml}
  ${renderBackCover()}
</body>
</html>`;
}

async function run() {
  console.log(
    '🚀 Compiling 40-Page Edexcel GCSE Medicine Visual Revision & Exam Assessment Masterclass...',
  );

  const html = generateMasterHtml();
  const outHtmlPath = path.join(PATHS.UNITS, 'edexcel_medicine', 'visual_revision_guide.html');
  fs.writeFileSync(outHtmlPath, html, 'utf8');
  console.log(
    `✅ Written HTML masterclass: ${outHtmlPath} (${(html.length / 1024).toFixed(1)} KB)`,
  );

  console.log('🖨️ Launching Puppeteer to export print-perfect PDF...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });
  await page.goto(pathToFileURL(outHtmlPath).href, { waitUntil: 'networkidle0' });

  const pdfFilename = 'edexcel_medicine_visual_revision_and_exam_guide.pdf';
  const unitPdfPath = path.join(PATHS.UNITS, 'edexcel_medicine', pdfFilename);
  const rootPdfPath = path.join(PATHS.PDFS, pdfFilename);

  await page.pdf({
    path: unitPdfPath,
    format: 'A4',
    landscape: false,
    printBackground: true,
    margin: { top: '0', bottom: '0', left: '0', right: '0' },
  });

  await browser.close();
  console.log(`📕 Exported unit PDF: ${unitPdfPath}`);

  // Copy to public/pdfs/
  fs.copyFileSync(unitPdfPath, rootPdfPath);
  console.log(`📋 Synced PDF to public/pdfs/: ${rootPdfPath}`);

  console.log(
    '\n🎉 SUCCESS: 36-Page Complete Medicine Visual Revision & Exam Assessment Guide is compiled!',
  );
}

run().catch((err) => {
  console.error('❌ Error generating visual guide:', err);
  process.exit(1);
});
