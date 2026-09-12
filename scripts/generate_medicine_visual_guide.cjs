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
          'Timing: 20 mins • Structure: 3 fully developed PEEL paragraphs (P1: BMA fears over income & civil service status, P2: Financial cost & soaring prescription demand, P3: Own knowledge - ideological opposition to state medicine / Bevan’s compromises with consultants).',
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
          'Timing: 20 mins • Structure: 3 fully developed PEEL paragraphs (P1: Florey and Chain’s purification & mouse trials, P2: The Second World War & military urgency for casualty care, P3: Own knowledge - US War Production Board / Peoria melon strain & deep-tank fermentation).',
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
          'Timing: 30 mins • Structure: Criteria Intro → Paragraph 1 (Agree: Role of government legislation like 1875 Act, Bazalgette sewers, 1948 NHS, 2007 smoking ban) → Paragraph 2 (Disagree: Role of scientific individuals & discoveries like Pasteur, Koch, Doll & Hill) → Paragraph 3 (Own Knowledge: Role of technology like CT scans / clean water engineering / mass media education) → Sustained Conclusion weighing whether government intervention was the crucial catalyst that implemented scientific breakthroughs.',
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
          'Provenance Hints: Evaluate the photographic evidence of stretcher bearers struggling in Passchendaele mud against Source B’s objective administrative logistics report for the War Office.',
        guidance:
          'Timing: 15 mins • Structure: Evaluate Content, Knowledge context, and Provenance (Nature, Origin, Motive) for Source A, then Source B, with an overall judgement on usefulness.',
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
          'Provenance Hints: Contrast the visual evidence of blinded soldiers awaiting treatment in Source A with the immediate clinical accuracy and statistical focus of the medical officer’s operational casualty report in Source B.',
        guidance:
          'Timing: 15 mins • Structure: Evaluate Content, Knowledge context, and Provenance (Nature, Origin, Motive) for Source A, then Source B, with a sustained usefulness judgement.',
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
          'Provenance Hints: Evaluate the visual, objective evidence of frontline diagnostic X-ray technology against the first-hand technical testimony of Captain Robertson pioneering stored blood transfusions at Cambrai.',
        guidance:
          'Timing: 15 mins • Structure: Evaluate Content, Knowledge context, and Provenance (Nature, Origin, Motive) for Source A, then Source B, with a clear comparative usefulness conclusion.',
        lines: 16,
      },
    },
  },
];

// Helper: Render Left Page (Visual Revision Masterclass)

// Inject Rich Textbook Deep Knowledge & Vocab Banks into SPREADS
const ENRICHMENTS_DATA = {
  lesson_1_1: {
    deepKnowledgeGrid: [
      {
        title: '1. Religious & Supernatural',
        points: [
          '<strong>God’s Retribution:</strong> Sickness was sent by God to punish individual sins or test faith (Book of Job).',
          '<strong>Divine Proof:</strong> Cures were seen as miracles proving God’s existence; questioning this was heresy.',
          '<strong>Leprosy:</strong> Viewed as an outward sign of sin; patients were segregated in <strong>Lazar houses</strong>, wore cloaks, and rang bells (“Some good, my gentle master”); breath feared contagious.',
        ],
      },
      {
        title: '2. Astrological Alignments',
        points: [
          '<strong>Planetary Movements:</strong> Physicians consulted star charts and <strong>Almanacs</strong> before diagnosing or bleeding.',
          '<strong>Zodiac Man:</strong> Illustrated which astrological constellations governed which body organs to guide surgical timing.',
          '<strong>1345 Conjunction:</strong> The alignment of Saturn, Jupiter, and Mars was blamed for corrupting air and causing the Black Death; Church fully embraced astrology post-1348.',
        ],
      },
      {
        title: '3. Rational Humours & Miasma',
        points: [
          '<strong>Four Humours:</strong> Blood (sanguine/spring), Phlegm (phlegmatic/winter), Yellow Bile (choleric/summer), Black Bile (melancholic/autumn).',
          '<strong>Clinical Observation:</strong> Physicians examined pulse and matched urine against <strong>uroscopy wheels</strong> to detect imbalances.',
          '<strong>Miasma:</strong> “Corruption of the air” from decaying organic matter, stagnant marshes, and unburied filth; linked directly to spiritual sinfulness.',
        ],
      },
      {
        title: '4. Scapegoating & Persecution',
        points: [
          '<strong>Minority Blame:</strong> In times of catastrophic epidemic, terrified communities sought human culprits to blame.',
          '<strong>Poisoning Wells:</strong> Jewish communities were falsely accused of poisoning drinking wells to destroy Christendom.',
          '<strong>1348 Strasbourg Massacre:</strong> Over 2,000 Jewish people were burned alive; demonstrates extreme hysteria and total absence of scientific comprehension.',
        ],
      },
    ],
    vocabBank: [
      {
        term: 'Miasma',
        def: 'Poisonous, foul-smelling air believed to corrupt bodily humours and transmit epidemic disease.',
      },
      {
        term: 'Humouralism',
        def: 'Ancient Greek theory that health depends on the balance of blood, phlegm, yellow bile, and black bile.',
      },
      {
        term: 'Teleology',
        def: 'The philosophical doctrine that organs were deliberately designed by God for a specific purpose.',
      },
      {
        term: 'Lazar House',
        def: 'A medieval segregation hospital established on town outskirts to isolate lepers.',
      },
      {
        term: 'Heresy',
        def: 'Holding medical or religious opinions contrary to orthodox Catholic Church dogma.',
      },
      {
        term: 'Flagellation',
        def: 'Whipping oneself publicly with iron-tipped lashes to atone for sin and ward off plague.',
      },
    ],
    causalFactors: [
      '<strong>1. Power of the Catholic Church:</strong> Controlled scriptoria, universities, and manuscript copying; Roger Bacon was imprisoned for advocating independent empirical observation.',
      '<strong>2. Absence of Scientific Technology:</strong> No microscopes, thermometers, or diagnostic instruments existed; doctors could not perceive microorganisms or cellular pathology.',
      '<strong>3. Extreme Reverence for Ancient Authority:</strong> Hippocratic and Galenic texts were treated as divine, infallible scripture; challenging ancient masters was considered absurd and sinful.',
    ],
  },
  lesson_1_2: {
    deepKnowledgeGrid: [
      {
        title: '1. Humoural Rebalancing',
        points: [
          '<strong>Bloodletting (Phlebotomy):</strong> Most common treatment; performed via vein incision, cupping with heated glass, or applying leeches.',
          '<strong>Purging:</strong> Administering emetics (to vomit) or laxatives and clysters (enemas) to evacuate corrupted humours.',
          '<strong>Theory of Opposites:</strong> Galenic treatment applying contrasting qualities (e.g. eating hot peppers/cucumber to cure cold/hot illnesses).',
        ],
      },
      {
        title: '2. Remedies & Regimen Sanitatis',
        points: [
          '<strong>Herbal Theriacs:</strong> Complex medicinal jams containing up to 64 ingredients (herbs, opium, crushed snake flesh).',
          '<strong>Regimen Sanitatis:</strong> Personalized lifestyle guide advising on diet, moderate exercise, sleep patterns, and bathing.',
          '<strong>Air Purification:</strong> Carrying pomanders filled with ambergris, burning aromatic wood (rosemary, pine), or spreading sweet rushes on floors.',
        ],
      },
      {
        title: '3. Medical Hierarchy',
        points: [
          '<strong>Physicians:</strong> Trained 7–10 years at universities (Oxford, Montpellier); diagnosed via astrology and uroscopy; costly, treating only nobility.',
          '<strong>Apothecaries:</strong> Trained via guild apprenticeships; compounded herbal remedies, poisons, and charms; far more accessible to commoners.',
          '<strong>Barber-Surgeons:</strong> Performed tooth extraction, lancing boils, bloodletting, and crude limb amputations without anaesthetic; no university education.',
        ],
      },
      {
        title: '4. Care in Home & Hospitals',
        points: [
          '<strong>Female Domestic Care:</strong> Mothers, wives, and local wise women treated 90% of sickness using family herbals and traditional lore.',
          '<strong>Monastic Hospitals:</strong> Over 800 hospitals by 1500 (e.g. St Bartholomew’s); run by monks and nuns providing warmth, shelter, and prayer.',
          '<strong>Spiritual Focus:</strong> Focused on care (hospitality) rather than cure; infectious, terminal, and pregnant patients were routinely excluded.',
        ],
      },
    ],
    vocabBank: [
      {
        term: 'Phlebotomy',
        def: 'The surgical opening of a vein to withdraw blood and rebalance excess bodily humours.',
      },
      {
        term: 'Theriac',
        def: 'A complex herbal compound containing numerous antidotes and spices used as a universal remedy.',
      },
      {
        term: 'Clyster',
        def: 'A medieval enema syringe used to inject liquids into the rectum to purge the bowels.',
      },
      {
        term: 'Regimen Sanitatis',
        def: 'A set of Latin rules offering health guidance on diet, exercise, and environmental hygiene.',
      },
      {
        term: 'Apothecary',
        def: 'A medieval tradesperson who prepared and sold medicinal drugs, ointments, and herbs.',
      },
      {
        term: 'Barber-Surgeon',
        def: 'A medical practitioner who performed minor surgeries, bloodletting, and haircuts.',
      },
    ],
    causalFactors: [
      '<strong>1. Church Focus on the Soul:</strong> Disease was viewed as spiritual; monks prayed for patient souls rather than treating physical pathology.',
      '<strong>2. Absence of Anatomical Understanding:</strong> Outlawing dissection meant surgeons had no accurate map of blood vessels, making internal surgery fatal.',
      '<strong>3. Cost Barriers:</strong> Trained physicians were an elite luxury; ordinary peasants relied entirely on oral domestic herbalism and parish charity.',
    ],
  },
  lesson_1_3: {
    deepKnowledgeGrid: [
      {
        title: '1. Pathology & Outbreak',
        points: [
          '<strong>Arrival (June 1348):</strong> Landed at Melcombe Regis (Dorset) via merchant ships; swept through England, killing 30–45% of the population.',
          '<strong>Bubonic Plague:</strong> Flea-borne <em>Yersinia pestis</em> causing agonizing egg-sized buboes in groin/armpits, black blotches, and internal haemorrhage (50% death rate).',
          '<strong>Pneumonic Plague:</strong> Airborne droplet infection attacking the lungs; violent coughing of blood; 90–100% fatal within 48 hours.',
        ],
      },
      {
        title: '2. Believed Causes',
        points: [
          '<strong>Divine Retribution:</strong> Overwhelmingly blamed on God’s wrath at English wickedness, pride, and fashionable clothing.',
          '<strong>Astrological Conjunction:</strong> The unusual 1345 planetary alignment of Saturn, Jupiter, and Mars was cited as the cosmological origin.',
          '<strong>Pestilential Miasma:</strong> Corrupted air rising from swamps, filthy ditches, and unburied rotting cadavers.',
        ],
      },
      {
        title: '3. Desperate Treatments',
        points: [
          '<strong>Lancing Buboes:</strong> Cutting open swollen lymph nodes to release black, foul-smelling pus.',
          '<strong>Animal Extraction:</strong> Plucking the feathers from a live chicken or toad and strapping it to buboes to “draw out the venom”.',
          '<strong>Chemical Ingestion:</strong> Drinking potions of mercury, crushed emeralds, vinegar, and theriac.',
        ],
      },
      {
        title: '4. Prevention & Public Action',
        points: [
          '<strong>Religious Flagellation:</strong> Cults of flagellants marched through towns whipping themselves with iron-tipped cords to appease God.',
          '<strong>Local Quarantines:</strong> Gloucester closed its gates to outsiders; King Edward III ordered London streets cleared of human excrement.',
          '<strong>Emergency Burials:</strong> Churchyards overflowed; authorities dug deep communal trenches outside city walls (e.g. East Smithfield).',
        ],
      },
    ],
    vocabBank: [
      {
        term: 'Bubo',
        def: 'A swollen, inflamed lymph node in the armpit or groin characteristic of bubonic plague.',
      },
      {
        term: 'Yersinia pestis',
        def: 'The bacterial pathogen responsible for bubonic, pneumonic, and septicaemic plague.',
      },
      {
        term: 'Flagellant',
        def: 'A medieval religious fanatic who whipped themselves publicly to atone for sin.',
      },
      {
        term: 'Quarantine',
        def: 'The isolation of people or goods from areas infected with contagious disease.',
      },
      {
        term: 'East Smithfield',
        def: 'Emergency mass burial trench established outside the walls of London in 1348.',
      },
      {
        term: 'Pneumonic',
        def: 'A virulent form of plague affecting the respiratory system, spread by airborne droplets.',
      },
    ],
    causalFactors: [
      '<strong>1. Absolute Ignorance of Microorganisms:</strong> Lacking any concept of bacteria or insect vectors (rat fleas), preventative measures were powerless.',
      '<strong>2. Ineffective Civic Governance:</strong> Town councils lacked public health budgets, police powers, or administrative systems to enforce quarantines.',
      '<strong>3. Social & Economic Upheaval:</strong> Severe labour shortages broke the feudal system, triggering the 1351 Statute of Labourers and the 1381 Peasants’ Revolt.',
    ],
  },
  lesson_2_1: {
    deepKnowledgeGrid: [
      {
        title: '1. Humanism & Church Decline',
        points: [
          '<strong>Questioning Authority:</strong> The Reformation reduced Catholic Church control; Renaissance Humanism encouraged rediscovering original Greek texts.',
          '<strong>Direct Observation:</strong> Scholars prioritized direct observation of nature over blind acceptance of established dogma.',
          '<strong>Secular University Study:</strong> Medical training slowly drifted from religious scholasticism toward anatomical enquiry.',
        ],
      },
      {
        title: '2. Thomas Sydenham',
        points: [
          '<strong>“The English Hippocrates”:</strong> Rejected learning medicine purely from books; stressed observing patients at their bedside.',
          '<strong>Disease Classification:</strong> First to argue diseases should be classified into specific species (like plants), rather than individual humoural states.',
          '<strong>Clinical Innovations:</strong> Introduced Laudanum (opium in wine) for pain, cinchona bark (quinine) for malaria, and cool air/rest for smallpox.',
        ],
      },
      {
        title: '3. The Royal Society (1660)',
        points: [
          '<strong>Royal Charter:</strong> Founded in London under King Charles II; brought together Britain’s foremost scientific minds (Newton, Hooke, Boyle).',
          '<strong>Nullius in Verba:</strong> Official motto (“Take nobody’s word for it”); demanded all scientific claims be proven through public experiments.',
          '<strong>Philosophical Transactions (1665):</strong> World’s first scientific journal; allowed medical discoveries to be peer-reviewed and spread globally.',
        ],
      },
      {
        title: '4. The Printing Press (c.1440)',
        points: [
          '<strong>Movable Type:</strong> Johannes Gutenberg’s invention took book production away from church monks, slashing publication costs.',
          '<strong>Accurate Anatomical Plates:</strong> Allowed anatomical drawings to be copied with mathematical precision across thousands of identical volumes.',
          '<strong>Bypassing Censorship:</strong> Prevented the Church from systematically burning or suppressing radical new medical ideas.',
        ],
      },
    ],
    vocabBank: [
      {
        term: 'Humanism',
        def: 'A Renaissance intellectual movement focusing on human potential, reason, and empirical observation.',
      },
      {
        term: 'Empiricism',
        def: 'The philosophical principle that all knowledge must originate from direct sensory experience and experimental evidence.',
      },
      {
        term: 'Nullius in Verba',
        def: 'Latin motto of the Royal Society meaning “Take nobody’s word for it”.',
      },
      {
        term: 'Observationes Medicae',
        def: 'Thomas Sydenham’s 1676 medical textbook advocating bedside diagnosis and disease classification.',
      },
      {
        term: 'Laudanum',
        def: 'An alcoholic tincture of opium popularized by Thomas Sydenham as a standard pain reliever.',
      },
      {
        term: 'Printing Press',
        def: 'Gutenberg’s mechanical printing machine that enabled the mass dissemination of scientific knowledge.',
      },
    ],
    causalFactors: [
      '<strong>1. Institutional Patronage:</strong> Royal backing from King Charles II gave scientific enquiry institutional legitimacy and independence from the Church.',
      '<strong>2. Print Communication:</strong> Discoveries could no longer be lost or corrupted by copyist errors; international scientific discourse accelerated.',
      '<strong>3. Enduring Miasma:</strong> Despite methodological progress, lack of microscopes meant foul air remained the primary explanation for epidemics.',
    ],
  },
  lesson_2_2: {
    deepKnowledgeGrid: [
      {
        title: '1. Andreas Vesalius & Fabrica',
        points: [
          '<strong>Padua Dissections (1543):</strong> Professor of surgery who dissected executed criminals himself, rather than reading from Galen while a barber cut.',
          '<strong>De Humani Corporis Fabrica:</strong> Masterpiece illustrated by artists from Titian’s workshop, depicting human anatomy in dynamic, lifelike poses.',
          '<strong>Encouraged Enquiry:</strong> Urged medical students to verify anatomical structures for themselves rather than trusting ancient books.',
        ],
      },
      {
        title: '2. Correcting Galen’s 300+ Errors',
        points: [
          '<strong>Animal Dissection Exposed:</strong> Proved Galen had dissected pigs, dogs, and apes because Roman law prohibited human dissection.',
          '<strong>Lower Jaw:</strong> Proved the human mandible is a single solid bone, not two bones as Galen claimed (based on dog jaws).',
          '<strong>The Heart Septum:</strong> Proved the muscular wall separating the ventricles was solid with no invisible pores for blood to filter through.',
        ],
      },
      {
        title: '3. Continuity in Treatment',
        points: [
          '<strong>Zero Immediate Cures:</strong> Vesalius proved Galen’s anatomy wrong, but did not discover any new cures or treatments for disease.',
          '<strong>Traditional Bleeding:</strong> Ordinary people still demanded bloodletting; Vesalius showed bleeding should occur near the site of infection.',
          '<strong>Medical Establishment Backlash:</strong> Traditional doctors accused Vesalius of arrogance and claimed the human body had changed since Galen’s day.',
        ],
      },
      {
        title: '4. New Remedies & Care',
        points: [
          '<strong>New World Herbs:</strong> Exploration imported Peruvian bark (quinine for malaria), tobacco (as a cure-all), ipecacuanha, and rhubarb.',
          '<strong>Iatrochemistry:</strong> Paracelsus promoted chemical remedies (using minerals like mercury, antimony, and sulfur) instead of purely herbal humours.',
          '<strong>Dissolution of Monasteries (1536):</strong> Henry VIII closed Catholic monastic hospitals; cities took over key sites (e.g. St Bartholomew’s, St Thomas’).',
        ],
      },
    ],
    vocabBank: [
      {
        term: 'Fabrica',
        def: 'Vesalius’s groundbreaking 1543 anatomical treatise “On the Fabric of the Human Body”.',
      },
      {
        term: 'Dissection',
        def: 'The surgical cutting apart of an animal or human corpse to study its anatomical structure.',
      },
      {
        term: 'Septum',
        def: 'The muscular wall dividing the left and right ventricles of the human heart.',
      },
      {
        term: 'Iatrochemistry',
        def: 'A Renaissance branch of chemistry dedicated to finding chemical and mineral cures for disease.',
      },
      {
        term: 'Quinine',
        def: 'An alkaloid extracted from the bark of the South American cinchona tree, used to treat malaria.',
      },
      {
        term: 'Dissolution',
        def: 'The confiscation and closure of Catholic monasteries by King Henry VIII between 1536 and 1541.',
      },
    ],
    causalFactors: [
      '<strong>1. Dissection Legalisation:</strong> European courts granting permission to dissect executed criminals provided authentic human cadavers.',
      '<strong>2. Artistic & Technical Synthesis:</strong> Renaissance realism and copperplate printing combined to produce the first anatomically perfect medical atlas.',
      '<strong>3. Therapeutic Gap:</strong> Understanding the body’s physical layout did not translate into clinical cures until the 19th-century discovery of germs.',
    ],
  },
  lesson_2_3: {
    deepKnowledgeGrid: [
      {
        title: '1. William Harvey’s Discovery (1628)',
        points: [
          '<strong>De Motu Cordis:</strong> Court physician to James I and Charles I who proved the heart acts as a mechanical muscular pump.',
          '<strong>Calculated Blood Volume:</strong> Calculated that the liver would have to produce 540 pints of blood per hour if blood was consumed as fuel (disproving Galen).',
          '<strong>One-Way Circulation:</strong> Proved that the same blood circulates continuously around the body through a closed network of arteries and veins.',
        ],
      },
      {
        title: '2. Scientific Experiments & Valves',
        points: [
          '<strong>Cold-Blooded Animals:</strong> Dissected live frogs and snakes whose hearts beat slowly to observe the mechanical pumping action of the chambers.',
          '<strong>Ligature Arm Experiment:</strong> Tied tight bands on human arms to show venous valves only allow blood to flow towards the heart.',
          '<strong>Predicted Capillaries:</strong> Proved blood passed from arteries to veins via microscopic connections that he could not see without a microscope (proven by Malpighi in 1661).',
        ],
      },
      {
        title: '3. Professional Backlash',
        points: [
          '<strong>The “Circulator” Slur:</strong> Conservative physicians attacked him as a charlatan; many wealthy patients deserted his practice.',
          '<strong>50-Year Teaching Delay:</strong> Cambridge and Oxford universities took nearly 50 years to replace Galen’s liver theory with Harvey’s circulation.',
          '<strong>Zero Impact on Cures:</strong> Bloodletting continued unabated because doctors still had no other rational treatments for disease.',
        ],
      },
      {
        title: '4. The Great Plague (1665)',
        points: [
          '<strong>Devastating Mortality:</strong> Swept London in summer 1665, killing ~100,000 people (20% of the city’s population); King Charles II fled to Oxford.',
          '<strong>Municipal Quarantine:</strong> Lord Mayor ordered infected houses boarded up for 28 days with a red cross and “Lord have mercy upon us” painted on the door.',
          '<strong>Public Countermeasures:</strong> Plague searchers appointed; fires burned in streets to cleanse air; over 40,000 dogs and 200,000 cats slaughtered (ironically worsening the rat flea problem).',
        ],
      },
    ],
    vocabBank: [
      {
        term: 'Circulation',
        def: 'The continuous movement of blood through the heart and blood vessels around the body.',
      },
      {
        term: 'De Motu Cordis',
        def: 'William Harvey’s 1628 book “On the Motion of the Heart and Blood in Animals”.',
      },
      {
        term: 'Venous Valve',
        def: 'Internal flap in veins preventing the backflow of blood, proving one-way circulation.',
      },
      {
        term: 'Capillaries',
        def: 'Microscopic blood vessels connecting arterioles and venules, predicted by Harvey in 1628.',
      },
      {
        term: 'Plague Searcher',
        def: 'Women appointed by London parishes to inspect corpses and certify plague as cause of death.',
      },
      {
        term: 'Bill of Mortality',
        def: 'Weekly published statistical records listing the numbers and causes of deaths in London.',
      },
    ],
    causalFactors: [
      '<strong>1. Mechanical Philosophy:</strong> Harvey viewed the human heart as a mechanical water pump, reflecting 17th-century engineering advances.',
      '<strong>2. Quantitative Mathematics:</strong> Harvey was the first medical researcher to use mathematical calculation to disprove a biological theory.',
      '<strong>3. Institutional Inertia:</strong> Even when anatomical fact was mathematically undeniable, traditional medicine clung to ancient humoral treatments.',
    ],
  },
  lesson_3_1: {
    deepKnowledgeGrid: [
      {
        title: '1. Spontaneous Generation Orthodox',
        points: [
          '<strong>Decay Creates Microbes:</strong> Orthodox belief that rotting meat or fermenting liquid spontaneously generated microorganisms.',
          '<strong>Microbes as Symptom:</strong> Microbes seen through microscopes were viewed as the *result* of disease rather than the *cause*.',
          '<strong>British Defense:</strong> Leading physician Dr Henry Bastian published extensive defenses of spontaneous generation well into the 1870s.',
        ],
      },
      {
        title: '2. Louis Pasteur’s Germ Theory (1861)',
        points: [
          '<strong>Beer & Wine Fermentation:</strong> Commissioned by French brewers to find why alcohol turned sour; discovered living yeasts and bacteria.',
          '<strong>Swan-Neck Flask Experiments:</strong> Boiled broth in S-shaped flasks; broth remained sterile until dust was allowed in, proving airborne microbes cause decay.',
          '<strong>Published 1861:</strong> Formulated Germ Theory: specific microorganisms cause fermentation and decay, and likely cause disease in animals and humans.',
        ],
      },
      {
        title: '3. Robert Koch & Bacteriology',
        points: [
          '<strong>Identifying Specific Pathogens:</strong> German doctor who linked specific bacteria to specific human diseases, winning the 1905 Nobel Prize.',
          '<strong>Solid Agar & Staining:</strong> Invented growing pure bacterial cultures on solid agar jelly in Petri dishes; used methyl violet dyes to stain transparent bacteria.',
          '<strong>Major Discoveries:</strong> Identified the anthrax spore (1876), the tuberculosis bacterium (1882), and the cholera bacterium (1883).',
        ],
      },
      {
        title: '4. British Resistance & Eventual Triumph',
        points: [
          '<strong>Miasma Adherence:</strong> Dr William Farr and the General Board of Health resisted Germ Theory, arguing filth and bad smells caused illness.',
          '<strong>John Tyndall:</strong> Physicist who championed Pasteur in London lectures, demonstrating how airborne dust carried pathogenic bacteria.',
          '<strong>Eventual Adoption:</strong> By the late 1870s and 1880s, Koch’s staining proofs forced British medicine to abandon miasma in favour of bacteriology.',
        ],
      },
    ],
    vocabBank: [
      {
        term: 'Germ Theory',
        def: 'The 1861 scientific theory proving that infectious diseases are caused by microscopic airborne pathogens.',
      },
      {
        term: 'Spontaneous Generation',
        def: 'The incorrect historical belief that living microorganisms arise spontaneously from decaying matter.',
      },
      {
        term: 'Bacteriology',
        def: 'The scientific study of bacteria and their relation to medicine and infectious disease.',
      },
      {
        term: 'Swan-Neck Flask',
        def: 'An S-curved glass flask designed by Pasteur that trapped airborne dust while allowing air in.',
      },
      {
        term: 'Agar Jelly',
        def: 'A gelatinous seaweed extract used by Robert Koch as a solid medium for culturing bacteria in Petri dishes.',
      },
      {
        term: 'Methyl Violet',
        def: 'A synthetic chemical dye developed by Koch to stain transparent bacteria so they could be photographed.',
      },
    ],
    causalFactors: [
      '<strong>1. Optical Technology:</strong> High-powered achromatic microscopes allowed researchers to resolve individual bacterial flagella and spores.',
      '<strong>2. National Rivalry:</strong> The Franco-Prussian War (1870–71) spurred fierce state-funded competition between Pasteur in Paris and Koch in Berlin.',
      '<strong>3. Shift from Miasma to Microbes:</strong> Bacteriology gave public health officials a physical, measurable target to eliminate via clean water and antiseptics.',
    ],
  },
  lesson_3_2: {
    deepKnowledgeGrid: [
      {
        title: '1. The Problem of Pain & Anaesthesia',
        points: [
          '<strong>Agony of Surgery:</strong> Before 1840, operations were excruciating; patients were strapped down, and surgeons rushed to amputate in under 60 seconds.',
          '<strong>Early Gases:</strong> Humphry Davy identified nitrous oxide (1799); William Morton used sulphuric ether in Boston (1846), but it irritated lungs and exploded.',
          '<strong>James Simpson & Chloroform (1847):</strong> Discovered chloroform after testing chemicals at home with friends; Queen Victoria took it for childbirth in 1853.',
        ],
      },
      {
        title: '2. The “Black Period” of Surgery',
        points: [
          '<strong>Rising Death Rates:</strong> Chloroform stopped pain, allowing surgeons to attempt longer, deeper internal operations (e.g. abdominal, chest).',
          '<strong>Infection Explosion:</strong> Surgeons still wore filthy frock coats stiff with dried blood and pus, operating with unwashed hands and infected sponges.',
          '<strong>Sepsis & Gangrene:</strong> Sepsis, hospital gangrene, and blood loss killed more patients in the 1850s than during the pre-anaesthetic era.',
        ],
      },
      {
        title: '3. Joseph Lister & Antiseptics (1865)',
        points: [
          '<strong>Carbolic Acid Spray:</strong> Read Pasteur’s Germ Theory; realized wound rot was caused by airborne bacteria; sprayed carbolic acid on incisions.',
          '<strong>Drastic Mortality Drop:</strong> Used carbolic dressings, catgut ligatures, and aerial spray; reduced his amputation mortality from 46% to 15%.',
          '<strong>Opposition:</strong> Doctors complained carbolic cracked their hands, slowed operations, and argued Lister was overly obsessed with invisible microbes.',
        ],
      },
      {
        title: '4. Aseptic Surgery & Nightingale',
        points: [
          '<strong>Aseptic Revolution:</strong> Shift from *killing* germs (antiseptic) to *excluding* them: autoclaves (steam sterilization), rubber gloves (Halsted), masks.',
          '<strong>Florence Nightingale:</strong> Transformed Scutari hospital during Crimean War (1854); slashed death rates from 42% to 2% through ventilation and sanitation.',
          '<strong>Pavilion Hospital Plan:</strong> Published <em>Notes on Nursing</em> (1859); designed hospitals with separate airy pavilions, large windows, and washable surfaces.',
        ],
      },
    ],
    vocabBank: [
      {
        term: 'Anaesthetic',
        def: 'A drug administered to induce a temporary loss of sensation or consciousness to eliminate surgical pain.',
      },
      {
        term: 'Chloroform',
        def: 'An inhaled anaesthetic discovered by James Simpson in 1847, popularized by Queen Victoria.',
      },
      {
        term: 'Antiseptic',
        def: 'A chemical substance (such as carbolic acid) applied to living tissue to destroy microbes.',
      },
      {
        term: 'Aseptic Surgery',
        def: 'Surgical practices designed to prevent any germs from entering the operating theatre environment.',
      },
      {
        term: 'Carbolic Acid',
        def: 'Phenol solution used by Joseph Lister as an antiseptic spray and dressing on surgical wounds.',
      },
      {
        term: 'Pavilion Plan',
        def: 'Hospital architectural layout designed by Nightingale featuring separate wards to optimize airflow.',
      },
    ],
    causalFactors: [
      '<strong>1. Dual Technological Breakthroughs:</strong> Surgery required solving both pain (Simpson’s chloroform) and infection (Lister’s carbolic) before survival rose.',
      '<strong>2. Royal & Military Endorsement:</strong> Queen Victoria’s use of chloroform in 1853 and Nightingale’s Crimean War fame dismantled conservative opposition.',
      '<strong>3. Professionalisation of Nursing:</strong> Nightingale’s St Thomas’ training school transformed nursing from drunken domestic work into a respected clinical profession.',
    ],
  },
  lesson_3_3: {
    deepKnowledgeGrid: [
      {
        title: '1. Edward Jenner & Smallpox (1796)',
        points: [
          '<strong>Lethal Threat:</strong> Smallpox was Britain’s biggest killer; inoculation using live smallpox scabs was expensive and frequently fatal.',
          '<strong>Milkmaid Observation:</strong> Noticed dairymaids who contracted mild cowpox never caught smallpox; hypothesized cowpox conferred immunity.',
          '<strong>James Phipps Experiment (1796):</strong> Injected 8-year-old James Phipps with cowpox pus, then inoculated him with lethal smallpox; Phipps remained immune.',
        ],
      },
      {
        title: '2. Opposition & Compulsory Law',
        points: [
          '<strong>Professional Backlash:</strong> Commercial inoculators feared losing lucrative fees; Anti-Vaccination League claimed people turned into cows.',
          '<strong>Religious Protest:</strong> Church traditionalists argued giving animal diseases to humans contradicted God’s natural order.',
          '<strong>Government Intervention:</strong> Parliament granted Jenner £30,000 to distribute vaccine; passed 1852 Compulsory Vaccination Act, eradicating smallpox.',
        ],
      },
      {
        title: '3. John Snow & Cholera in Soho (1854)',
        points: [
          '<strong>Broad Street Outbreak:</strong> Cholera struck Golden Square, Soho in August 1854, killing 500 people in 10 days within 250 yards.',
          '<strong>Epidemiological Spot Map:</strong> Snow marked cholera deaths as black bars on a street map; noticed fatalities clustered around Broad Street pump.',
          '<strong>Exceptions Prove Rule:</strong> Broad Street brewery workers drank malt liquor and suffered zero deaths; a woman in Hampstead who drank pump water died.',
        ],
      },
      {
        title: '4. Disproving Miasma & Waterborne Proof',
        points: [
          '<strong>Removal of Pump Handle:</strong> Snow convinced the Board of Guardians to remove the pump handle; new cholera cases ceased immediately.',
          '<strong>Leaking Cesspit Found:</strong> Inspection revealed a cracked underground cesspit 3 feet away had leaked infected baby cholera faeces into the well.',
          '<strong>Defeated Miasma:</strong> Proved cholera was not transmitted through bad air but was waterborne; paved the way for Bazalgette’s London sewer system.',
        ],
      },
    ],
    vocabBank: [
      {
        term: 'Vaccination',
        def: 'The administration of antigenic material (e.g. cowpox) to stimulate an individual’s immune system against smallpox.',
      },
      {
        term: 'Inoculation',
        def: 'The historical practice of scratching live smallpox scab matter into healthy skin, carrying severe risk of fatal infection.',
      },
      {
        term: 'Broad Street Pump',
        def: 'The Soho water pump identified by John Snow in 1854 as the source of a lethal cholera outbreak.',
      },
      {
        term: 'Spot Map',
        def: 'An epidemiological mapping technique developed by Snow to visually correlate disease cases with geographic sources.',
      },
      {
        term: 'Waterborne',
        def: 'Diseases (such as cholera and typhoid) that are transmitted through contaminated drinking water supplies.',
      },
      {
        term: 'Cesspit',
        def: 'An underground pit used for the temporary storage of human waste, often leaking into adjacent drinking wells.',
      },
    ],
    causalFactors: [
      '<strong>1. Empirical Epidemiology:</strong> Both Jenner and Snow bypassed theoretical speculation, using statistical data and geographic tracking to uncover truths.',
      '<strong>2. Transition to State Public Health:</strong> Jenner’s 1852 Act and Snow’s sewer legacy marked the end of laissez-faire, establishing compulsory public hygiene.',
      '<strong>3. Mechanism Unknown at Discovery:</strong> Neither Jenner nor Snow knew viruses or bacteria existed; their breakthroughs were founded purely on inductive observation.',
    ],
  },
  lesson_4_1: {
    deepKnowledgeGrid: [
      {
        title: '1. Discovery of DNA Structure (1953)',
        points: [
          '<strong>Franklin & Wilkins Crystallography:</strong> Rosalind Franklin and Maurice Wilkins used X-ray diffraction at King’s College to photograph DNA fibres.',
          '<strong>Watson & Crick Double Helix:</strong> Built the double-helix cardboard model at Cambridge (1953), proving genes carry hereditary biochemical code.',
          '<strong>Revolution in Causation:</strong> Proved hereditary diseases were caused by genetic errors in DNA sequences rather than environmental miasmas.',
        ],
      },
      {
        title: '2. Human Genome Project (1990–2003)',
        points: [
          '<strong>Mapping 3 Billion Base Pairs:</strong> International scientific collaboration mapped the complete human genetic sequence.',
          '<strong>Targeted Genetic Disorders:</strong> Enabled scientists to identify exact faulty genes causing cystic fibrosis, Down’s syndrome, and sickle-cell anaemia.',
          '<strong>Cancer Predisposition:</strong> Identified BRCA1 and BRCA2 gene mutations linked to hereditary breast and ovarian cancer, enabling preventative surgery.',
        ],
      },
      {
        title: '3. Lifestyle & Environmental Causes',
        points: [
          '<strong>Smoking & Lung Cancer:</strong> Epidemiological research by Doll and Hill (1950) proved smoking causes 85% of lung cancer cases.',
          '<strong>Diet, Obesity & Diabetes:</strong> High-sugar diets identified as direct causes of Type 2 diabetes, coronary heart disease, and hypertension.',
          '<strong>Alcohol & Carcinogens:</strong> Heavy alcohol intake linked to liver cirrhosis; environmental air pollution linked to asthma and cardiovascular deaths.',
        ],
      },
      {
        title: '4. High-Tech Diagnostic Revolution',
        points: [
          '<strong>Medical Scans:</strong> Wilhelm Röntgen discovered X-rays (1895); Godfrey Hounsfield developed CT scans (1972); MRI scans map soft brain tissue.',
          '<strong>Ultrasound & Endoscopy:</strong> Ultrasound uses sound waves for prenatal monitoring; fibre-optic endoscopes allow direct visual inspection inside organs.',
          '<strong>Biochemical Diagnostics:</strong> Automated blood tests and home blood-sugar monitors enable immediate, non-invasive tracking of diseases.',
        ],
      },
    ],
    vocabBank: [
      {
        term: 'DNA Double Helix',
        def: 'The spiral ladder molecular structure of deoxyribonucleic acid discovered by Crick, Watson, and Franklin in 1953.',
      },
      {
        term: 'Human Genome',
        def: 'The complete set of genetic information encoded within the DNA of a human being, mapped fully in 2003.',
      },
      {
        term: 'Gene Mutation',
        def: 'A permanent alteration in the DNA sequence that makes up a gene, causing hereditary illness.',
      },
      {
        term: 'CT Scan',
        def: 'Computed Tomography; an advanced X-ray scan using computers to create cross-sectional 3D images of internal organs.',
      },
      {
        term: 'MRI Scan',
        def: 'Magnetic Resonance Imaging; non-invasive imaging using magnetic fields and radio waves to visualize soft tissues.',
      },
      {
        term: 'Endoscopy',
        def: 'The examination of the interior of a bodily canal or hollow organ using a flexible fibre-optic camera.',
      },
    ],
    causalFactors: [
      '<strong>1. Global Scientific Collaboration:</strong> The Human Genome Project required pooling data from researchers in the UK, USA, France, Germany, Japan, and China.',
      '<strong>2. Computing & Digital Processing:</strong> Advanced diagnostic scanners (CT, MRI) and DNA sequencing machines were only made possible by modern microchips.',
      '<strong>3. Preventative Genetic Medicine:</strong> Doctors can now identify disease risks before symptoms appear, shifting medicine from reactive treatment to proactive prevention.',
    ],
  },
  lesson_4_2: {
    deepKnowledgeGrid: [
      {
        title: '1. Chemical Magic Bullets',
        points: [
          '<strong>Paul Ehrlich & Salvarsan 606 (1909):</strong> Searched for synthetic chemical dyes that targeted specific microbes without harming host tissue; cured syphilis.',
          '<strong>Gerhard Domagk & Prontosil (1932):</strong> Red dye derived from coal tar that cured streptococcal septicaemia; saved his own daughter’s arm from amputation.',
          '<strong>First Synthetic Antibacterials:</strong> Proved man-made laboratory chemicals could act as internal antimicrobials, sparking the pharmaceutical revolution.',
        ],
      },
      {
        title: '2. Creation of the NHS (1948)',
        points: [
          '<strong>Beveridge Report (1942):</strong> Identified “Disease” as one of the Five Giants; recommended a state healthcare service funded by national taxation.',
          '<strong>Aneurin Bevan:</strong> Minister for Health who overcame fierce resistance to launch the NHS on 5 July 1948, making healthcare free at the point of need.',
          '<strong>BMA Doctor Opposition:</strong> 90% of doctors initially voted against the NHS; Bevan “stuffed their mouths with gold” by allowing consultants private patients.',
        ],
      },
      {
        title: '3. Advanced Surgical Advances',
        points: [
          '<strong>Organ Transplants:</strong> First successful kidney transplant (1954); Christiaan Barnard performed first human heart transplant in Cape Town (1967).',
          '<strong>Prosthetics & Joint Replacements:</strong> Sir John Charnley developed the low-friction polyethylene hip replacement in 1962, restoring mobility to millions.',
          '<strong>Minimally Invasive Surgery:</strong> Keyhole (laparoscopic) surgery uses cameras and tiny incisions; robotic da Vinci systems perform micro-surgery.',
        ],
      },
      {
        title: '4. Mass State Immunisation',
        points: [
          '<strong>Polio & Diphtheria:</strong> Mass national immunisation programs virtually eradicated diphtheria (1940s) and polio (1950s Jonas Salk vaccine).',
          '<strong>MMR Vaccine (1988):</strong> Combined vaccine protecting against measles, mumps, and rubella distributed free across UK primary care clinics.',
          '<strong>HPV Vaccine (2008):</strong> National school vaccination programme for teenage girls, slashing cervical cancer rates by nearly 90%.',
        ],
      },
    ],
    vocabBank: [
      {
        term: 'Magic Bullet',
        def: 'A chemical compound designed to selectively target and destroy specific pathogenic bacteria without poisoning human cells.',
      },
      {
        term: 'Salvarsan 606',
        def: 'The first synthetic magic bullet, an arsenic compound discovered by Paul Ehrlich in 1909 to treat syphilis.',
      },
      {
        term: 'Prontosil',
        def: 'A red sulphonamide antibacterial discovered by Gerhard Domagk in 1932 that cured blood poisoning.',
      },
      {
        term: 'Beveridge Report',
        def: 'A 1942 government report advocating a universal welfare state to tackle the Five Giants: Want, Disease, Ignorance, Squalor, Idleness.',
      },
      {
        term: 'Aneurin Bevan',
        def: 'Labour Minister for Health who successfully established the National Health Service in 1948.',
      },
      {
        term: 'Laparoscopy',
        def: 'Keyhole surgery performed through small incisions using a camera and specialized instruments.',
      },
    ],
    causalFactors: [
      '<strong>1. Post-War Social Consensus:</strong> Shared wartime sacrifice created overwhelming public demand for equality of access to healthcare, birthing the NHS.',
      '<strong>2. Pharmaceutical Industrialisation:</strong> Large multinational chemical firms invested billions into synthesizing magic bullets and immunosuppressants.',
      '<strong>3. State Funding Power:</strong> Centralized taxation enabled universal vaccination rollouts, eliminating historic epidemics like polio and diphtheria.',
    ],
  },
  lesson_4_3: {
    deepKnowledgeGrid: [
      {
        title: '1. Alexander Fleming (1928)',
        points: [
          '<strong>Serendipitous Discovery:</strong> Returning from holiday to St Mary’s Hospital, noticed mould (<em>Penicillium notatum</em>) on a staphylococcus Petri dish.',
          '<strong>Clear Halo Zone:</strong> Observed that bacteria around the mould had dissolved; realized the mould produced an active antibacterial chemical.',
          '<strong>Published 1929:</strong> Tested it on rabbit blood; found it non-toxic; but unable to extract or purify unstable penicillin, abandoning research.',
        ],
      },
      {
        title: '2. Florey & Chain at Oxford (1938–41)',
        points: [
          '<strong>Purification Team:</strong> Pathologist Howard Florey and biochemist Ernst Chain assembled a multidisciplinary team at Oxford University.',
          '<strong>Mouse Experiment (1940):</strong> Injected eight mice with lethal streptococci; the four treated with purified penicillin survived; four untreated died.',
          '<strong>Albert Alexander (1941):</strong> Tested on a policeman dying of severe blood poisoning; made dramatic recovery until supply ran out, and he died.',
        ],
      },
      {
        title: '3. US Wartime Mass Production',
        points: [
          '<strong>Wartime Mission (1941):</strong> Florey travelled to the USA; convinced the US War Production Board to fund industrial mass production.',
          '<strong>Deep-Tank Fermentation:</strong> Discovered a strain of mould on a cantaloupe melon grew 200 times more penicillin; used corn-steep liquor in massive vats.',
          '<strong>D-Day Miracle (1944):</strong> By June 1944, US pharmaceutical companies produced 2.3 million doses, treating every Allied casualty on D-Day.',
        ],
      },
      {
        title: '4. Historical Impact & Modern Threat',
        points: [
          '<strong>Golden Age of Antibiotics:</strong> Saved an estimated 200 million lives globally; Fleming, Florey, and Chain awarded the 1945 Nobel Prize.',
          '<strong>Post-War Medicine:</strong> Enabled open-heart surgery, chemotherapy, and organ transplants by controlling deadly secondary bacterial infections.',
          '<strong>Antibiotic Resistance (MRSA):</strong> Overprescription in agriculture and hospitals led to resistant “superbugs”, presenting a critical 21st-century challenge.',
        ],
      },
    ],
    vocabBank: [
      {
        term: 'Penicillin',
        def: 'The world’s first effective antibiotic, derived from the mould Penicillium notatum, discovered in 1928.',
      },
      {
        term: 'Antibiotic',
        def: 'A medicine that inhibits the growth of or destroys microorganisms such as bacteria.',
      },
      {
        term: 'Deep-Tank Fermentation',
        def: 'An industrial process using massive aerated tanks and corn-steep liquor to mass-produce penicillin.',
      },
      {
        term: 'Albert Alexander',
        def: 'The first human patient treated with Oxford penicillin in 1941, who showed miraculous initial recovery.',
      },
      {
        term: 'Superbug',
        def: 'A strain of bacteria that has become resistant to antibiotic drugs, such as MRSA.',
      },
      {
        term: 'Corn-Steep Liquor',
        def: 'A byproduct of corn milling discovered in Illinois that accelerated the growth rate of penicillin mould.',
      },
    ],
    causalFactors: [
      '<strong>1. The Catalyst of War:</strong> WWII transformed penicillin from an academic laboratory curiosity into an international industrial priority.',
      '<strong>2. Interdisciplinary Teamwork:</strong> Florey (pathology), Chain (biochemistry), and Heatley (biochemical engineering) succeeded where Fleming alone failed.',
      '<strong>3. US Industrial Might:</strong> British factories were under heavy Blitz bombardment; US capital and chemical infrastructure made mass supply possible.',
    ],
  },
  lesson_4_4: {
    deepKnowledgeGrid: [
      {
        title: '1. Epidemic of the 20th Century',
        points: [
          '<strong>Surging Mortality:</strong> Lung cancer was rare in 1900, but deaths exploded by 1950, becoming the second most common cancer in Britain.',
          '<strong>Initial Confusion:</strong> Doctors initially attributed the surge to tarmac dust from new motorways or industrial coal air pollution.',
          '<strong>Cigarette Popularity:</strong> Mass-produced cigarettes distributed free to soldiers in WWI and WWII made smoking a universal social habit.',
        ],
      },
      {
        title: '2. Epidemiological Proof (1950)',
        points: [
          '<strong>Doll & Hill Study:</strong> Sir Richard Doll and Austin Bradford Hill investigated 40,000 British doctors to correlate habits with illness.',
          '<strong>Statistical Causation:</strong> Proved individuals smoking 25+ cigarettes a day had a 25-fold higher risk of dying from lung cancer than non-smokers.',
          '<strong>Royal College Report (1962):</strong> Conclusively confirmed smoking caused lung cancer, bronchitis, and coronary heart disease.',
        ],
      },
      {
        title: '3. Modern Diagnosis & Treatment',
        points: [
          '<strong>Advanced Diagnosis:</strong> Chest X-rays, spiral CT scans, bronchoscopy, PET-CT scans, and lung tissue biopsies pinpoint malignant tumours early.',
          '<strong>Surgical Interventions:</strong> Lobectomy (removing lung lobe) or pneumonectomy (removing entire lung) combined with targeted keyhole techniques.',
          '<strong>Oncological Care:</strong> Radiotherapy (linear accelerators), chemotherapy, and cutting-edge immunotherapy drugs that train white blood cells to destroy cancer.',
        ],
      },
      {
        title: '4. Aggressive State Legislation',
        points: [
          '<strong>Advertising Bans:</strong> TV cigarette advertising banned in 1965; all tobacco sports sponsorship banned by 2005.',
          '<strong>Public Smoking Ban (2007):</strong> The Health Act 2007 made smoking illegal in all enclosed workplaces, pubs, and public transport.',
          '<strong>Taxation & Packaging:</strong> Astronomical tobacco duty; legal age raised to 18; plain standardized olive-green packaging with graphic health warnings.',
        ],
      },
    ],
    vocabBank: [
      {
        term: 'Epidemiology',
        def: 'The branch of medicine that deals with the incidence, distribution, and control of diseases in populations.',
      },
      {
        term: 'Doll and Hill',
        def: 'British researchers who published the landmark 1950 statistical study proving the link between smoking and lung cancer.',
      },
      {
        term: 'Bronchoscopy',
        def: 'A diagnostic procedure allowing doctors to examine the inside of the lungs and take tissue biopsies.',
      },
      {
        term: 'Immunotherapy',
        def: 'Modern cancer treatment that uses the body’s own immune system to recognize and attack cancer cells.',
      },
      {
        term: 'Plain Packaging',
        def: 'Government regulation requiring tobacco products to be sold in standardized packaging with graphic health warnings.',
      },
      {
        term: 'Health Act 2007',
        def: 'UK legislation that prohibited smoking in enclosed public places and workplaces across England.',
      },
    ],
    causalFactors: [
      '<strong>1. Statistical Epidemiology:</strong> Proving the lung cancer link required large-scale population data rather than laboratory microscope tests.',
      '<strong>2. Transition from Treatment to Prevention:</strong> Because lung cancer has a low cure rate, government recognized prevention via legislation was far more effective.',
      '<strong>3. Overcoming Corporate Resistance:</strong> Tobacco companies spent billions denying the link; it required decisive state action to defeat corporate lobbying.',
    ],
  },
  lesson_5_1: {
    deepKnowledgeGrid: [
      {
        title: '1. The British Sector Context',
        points: [
          '<strong>Sector Layout:</strong> British Expeditionary Force (BEF) manned a sector running from Ypres in Flanders down to the Somme in northern France.',
          '<strong>Ypres Salient:</strong> Vulnerable outward bulge surrounded on three sides by German artillery situated on the higher Messines and Passchendaele ridges.',
          '<strong>Key Battles:</strong> 1st Ypres (1914), 2nd Ypres (1915, first chlorine gas), Somme (1916, 57,000 casualties on day one), 3rd Ypres/Passchendaele (1917, liquid mud).',
        ],
      },
      {
        title: '2. Geological & Terrain Hazards',
        points: [
          '<strong>Waterlogged Flanders Clay:</strong> Ypres had clay soil that held water; heavy artillery destroyed delicate drainage systems, creating liquid mud.',
          '<strong>Arras Underground Tunnels:</strong> Chalk terrain allowed British and New Zealand miners to dig 2.5 miles of tunnels with electric light, running water, and a 700-bed hospital.',
          '<strong>The Somme Chalk:</strong> Deep underground dugouts carved into dry chalk valleys protected troops from bombardment but complicated stretcher carrying.',
        ],
      },
      {
        title: '3. Transport Breakdown (1914)',
        points: [
          '<strong>Horse-Drawn Ambulances:</strong> BEF deployed in 1914 with zero motor ambulances; horse-drawn wagons could not navigate shell holes or mud.',
          '<strong>Trauma from Shaking:</strong> Jolting over rough roads caused compound femur fractures to sever femoral arteries, inducing fatal haemorrhagic shock.',
          '<strong>Severe Evacuation Delays:</strong> Wounded men lay stranded in No Man’s Land for days before reaching basic medical dressing stations.',
        ],
      },
      {
        title: '4. Motorised Ambulance Revolution',
        points: [
          '<strong>Times Public Appeal:</strong> In October 1914, the British Red Cross launched an appeal, raising funds for 512 motor ambulances within three weeks.',
          '<strong>Ambulance Trains & Barges:</strong> Converted hospital trains and French canal barges moved casualties smoothly to Base Hospitals on the coast without jolting.',
          '<strong>Saved Thousands:</strong> Fast motor transport ensured wounded soldiers reached surgical teams at Casualty Clearing Stations within the critical “golden hour”.',
        ],
      },
    ],
    vocabBank: [
      {
        term: 'Salient',
        def: 'A military position or battlefield zone that bulges outward into enemy-controlled territory, surrounded on three sides.',
      },
      {
        term: 'Passchendaele',
        def: 'The 1917 Third Battle of Ypres, notorious for relentless rain that turned the battlefield into deep liquid mud.',
      },
      {
        term: 'Arras Caves',
        def: 'Underground chalk quarries interconnected by British miners to house 25,000 men and a 700-bed hospital.',
      },
      {
        term: 'Motor Ambulance',
        def: 'Motorized transport introduced in late 1914 to rapidly evacuate casualties across damaged battlefield terrain.',
      },
      {
        term: 'Ambulance Train',
        def: 'Specially fitted railway carriages equipped with bunks and operating rooms to transport stable casualties to the coast.',
      },
      {
        term: 'Hospital Barge',
        def: 'Slow-moving canal boat used to transport wounded men with severe chest or head wounds smoothly without painful jolting.',
      },
    ],
    causalFactors: [
      '<strong>1. Geological Vulnerability:</strong> Ypres’ low-lying clay soil and high water table made mud the primary obstacle to casualty survival.',
      '<strong>2. Rapid Mechanisation:</strong> War forced the British military to abandon horse-drawn tradition in favour of motor vehicles and hospital trains.',
      '<strong>3. Civilian Charitable Mobilisation:</strong> The Red Cross and St John Ambulance raised voluntary funds to bridge military supply shortages.',
    ],
  },
  lesson_5_2: {
    deepKnowledgeGrid: [
      {
        title: '1. Trench Defensive Architecture',
        points: [
          '<strong>Three-Tier System:</strong> Frontline trench (fire bays), Support trench (80 yards behind), and Reserve trench (several hundred yards behind).',
          '<strong>Communication Trenches:</strong> Connected the three parallel lines in a zig-zag pattern to prevent enemy shells blasting straight down the trench.',
          '<strong>Firestep & Traverses:</strong> Raised ledge (firestep) for shooting over the parapet; right-angle bends (traverses) contained bomb blasts.',
        ],
      },
      {
        title: '2. Protective Features',
        points: [
          '<strong>Sandbags & Parapets:</strong> Reinforced trench walls to absorb shrapnel; barbed wire entanglements up to 30 yards wide in front.',
          '<strong>Duckboards & Drainage Sumps:</strong> Wooden slats placed over drainage sumps in trench bottoms to keep soldiers’ boots out of water.',
          '<strong>Deep Dugouts:</strong> Protective chambers carved into trench walls; German dugouts at the Somme were up to 30 feet underground with electric lights.',
        ],
      },
      {
        title: '3. Daily Environmental Hazards',
        points: [
          '<strong>Lice Infestation:</strong> Over 90% of soldiers had body lice, which bred in uniform seams and transmitted debilitating <strong>trench fever</strong>.',
          '<strong>Trench Rats:</strong> Black and brown rats grew to the size of cats, feeding on corpses and contaminating food rations with leptospirosis.',
          '<strong>Flooded Latrines:</strong> Latrine pits (buckets or trenches) frequently overflowed in rain or were hit by artillery, causing dysentery.',
        ],
      },
      {
        title: '4. Routine, Sentry Duty & Stand-To',
        points: [
          '<strong>Dawn & Dusk Stand-To:</strong> Troops manned the firestep with fixed bayonets at dawn and dusk when enemy raids were most frequent.',
          '<strong>Constant Maintenance:</strong> Men spent daylight repairing parapets damaged by shelling, pumping out water, and wiring.',
          '<strong>Sleep Deprivation:</strong> Prolonged sleeplessness, perpetual dampness, and artillery stress degraded men’s immune systems and mental resilience.',
        ],
      },
    ],
    vocabBank: [
      {
        term: 'Communication Trench',
        def: 'A trench connecting the frontline to support and reserve trenches, allowing troops and supplies to move under cover.',
      },
      {
        term: 'Duckboard',
        def: 'Wooden slatted walkways laid in trench floors to provide dry footing above standing water and mud.',
      },
      {
        term: 'Traverse',
        def: 'A sharp, right-angle bend built into trench walls to contain the blast and shrapnel of an exploding shell.',
      },
      {
        term: 'Parapet',
        def: 'The front wall of a trench, reinforced with sandbags to protect soldiers from rifle fire and shrapnel.',
      },
      {
        term: 'Firestep',
        def: 'A raised earthen step in the trench wall that allowed soldiers to see and fire over the parapet into No Man’s Land.',
      },
      {
        term: 'Dugout',
        def: 'An underground shelter cut into the side of a trench to provide shelter from weather and shellfire.',
      },
    ],
    causalFactors: [
      '<strong>1. Artillery Dominance:</strong> High-explosive shells forced armies into trenches, which solved the bullet problem but created a crisis of sanitation.',
      '<strong>2. Static Warfare Pathology:</strong> Months of confinement in stagnant trenches allowed body lice, trench rats, and waterborne bacteria to flourish.',
      '<strong>3. Drainage Engineering Failure:</strong> Flanders mud continually overwhelmed primitive drainage sumps, turning footwear into vectors for gangrene.',
    ],
  },
  lesson_5_3: {
    deepKnowledgeGrid: [
      {
        title: '1. Environmental Illnesses',
        points: [
          '<strong>Trench Foot:</strong> Caused by standing in cold water/mud for days; circulation failed, tissue rotted with fungal gangrene, requiring amputation.',
          '<strong>Trench Fever:</strong> Caused by <em>Bartonella quintana</em> spread by body lice; caused sudden high fever, headache, and severe aching shins.',
          '<strong>Shell Shock (NYDN):</strong> Psychological trauma from artillery bombardment; symptoms included mutism, blindness, tremors, and paralysis.',
        ],
      },
      {
        title: '2. Shrapnel & Explosive Trauma',
        points: [
          '<strong>Artillery Supremacy:</strong> High-explosive shells caused 58% of all Western Front wounds; shrapnel balls and jagged steel tore flesh and shattered bone.',
          '<strong>Compound Fractures:</strong> Jagged bone ends ruptured muscle and severed arteries; pre-1915 femur fracture mortality was 80%.',
          '<strong>Brodie Helmet (1915):</strong> Steel helmet with wide brim introduced late 1915; reduced fatal head wounds from shrapnel by 80%.',
        ],
      },
      {
        title: '3. Soil Bacteria & Severe Infection',
        points: [
          '<strong>Fertilised Flanders Farmland:</strong> Centuries of manure farming meant Flemish soil was saturated with <em>Clostridium welchii</em> and tetanus spores.',
          '<strong>Dirty Cloth Implantation:</strong> Shrapnel carried muddy uniform cloth deep into wounds; lack of oxygen caused fatal <strong>gas gangrene</strong> within hours.',
          '<strong>Tetanus Inoculation:</strong> Routine anti-tetanus serum injections given at aid posts dramatically reduced lockjaw deaths by 1915.',
        ],
      },
      {
        title: '4. Chemical Warfare: Poison Gas',
        points: [
          '<strong>Chlorine Gas (1915):</strong> Green-yellow cloud first used by Germans at 2nd Ypres; suffocated victims by causing lungs to fill with fluid.',
          '<strong>Phosgene Gas (1915):</strong> Colourless, smelled of mouldy hay; deadlier than chlorine; delayed action meant soldiers collapsed 48 hours later.',
          '<strong>Mustard Gas (1917):</strong> Blistering agent used at 3rd Ypres; burned skin, caused internal blisters, blinded eyes, and remained active in mud for weeks.',
        ],
      },
    ],
    vocabBank: [
      {
        term: 'Trench Foot',
        def: 'A medical condition caused by prolonged exposure of feet to damp, cold conditions, leading to gangrene.',
      },
      {
        term: 'Trench Fever',
        def: 'A debilitating louse-borne viral infection characterized by sudden severe fever, headache, and shin pain.',
      },
      {
        term: 'Shell Shock',
        def: 'Psychological trauma caused by prolonged exposure to artillery bombardment, initially termed NYDN.',
      },
      {
        term: 'Gas Gangrene',
        def: 'A lethal, foul-smelling bacterial wound infection caused by soil bacteria producing gas beneath the skin.',
      },
      {
        term: 'Mustard Gas',
        def: 'An oily, blistering chemical weapon introduced in 1917 that caused severe internal and external chemical burns.',
      },
      {
        term: 'Brodie Helmet',
        def: 'A British steel combat helmet introduced in 1915 to protect soldiers’ heads from aerial artillery shrapnel.',
      },
    ],
    causalFactors: [
      '<strong>1. Industrialised Weaponry:</strong> Massive artillery production generated severe polytrauma that civilian medicine had never encountered.',
      '<strong>2. Highly Fertile Farmland:</strong> Heavy manure fertilization in Flemish agriculture turned soil into a biological hazard that infected open wounds.',
      '<strong>3. Escalating Chemical Innovation:</strong> The race between toxic gases and protective respirators (urine pads to Box Respirators) saved thousands from gas deaths.',
    ],
  },
  lesson_5_4: {
    deepKnowledgeGrid: [
      {
        title: '1. Regimental Aid Post (RAP)',
        points: [
          '<strong>Immediate First Aid:</strong> Located 200 yards behind the frontline in a communication trench dugout or cellar.',
          '<strong>Staff & Mission:</strong> Staffed by one Regimental Medical Officer (RMO) and 30 stretcher bearers; applied tourniquets, morphine, and bandages.',
          '<strong>Quick Sorting:</strong> Sent lightly wounded men back to the line; stretcher bearers carried stretcher cases back to dressing stations.',
        ],
      },
      {
        title: '2. Dressing Stations (ADS & MDS)',
        points: [
          '<strong>Advanced Dressing Station:</strong> Located 400 yards behind RAP; Main Dressing Station located 1 mile behind; staffed by Field Ambulance units.',
          '<strong>Capacity & Tetanus:</strong> Handled up to 150 wounded men; administered anti-tetanus serum; dressed wounds; recorded patient details.',
          '<strong>Evacuation Links:</strong> Evacuated patients to Casualty Clearing Stations using motor ambulances, horse-drawn carts, or walking.',
        ],
      },
      {
        title: '3. Casualty Clearing Station (CCS)',
        points: [
          '<strong>Critical Surgical Hub:</strong> Located 7–12 miles behind the front, out of direct artillery range, near railway lines or canals.',
          '<strong>Triage System:</strong> Divided patients into 3 groups: (1) Walking wounded (clean up & return), (2) Immediate surgery needed, (3) Beyond help (made comfortable).',
          '<strong>Advanced Facilities:</strong> Had operating theatres, mobile X-ray vans, and wards; performed critical surgery for head wounds and compound fractures.',
        ],
      },
      {
        title: '4. Base Hospitals & Volunteer Units',
        points: [
          '<strong>French Coast Facilities:</strong> Huge general hospitals in coastal towns (Boulogne, Étaples); thousands of beds, X-ray departments, and labs.',
          '<strong>The “Blighty” Return:</strong> Treated patients until stable enough to board hospital ships back to Britain (“Blighty”) for long-term recovery.',
          '<strong>RAMC & FANY:</strong> RAMC expanded from 3,000 men in 1914 to 130,000 in 1918; FANY women drove ambulances, ran mobile canteens, and administered baths.',
        ],
      },
    ],
    vocabBank: [
      {
        term: 'Chain of Evacuation',
        def: 'The staged medical system used to move wounded soldiers from the frontline to Base Hospitals in France or Britain.',
      },
      {
        term: 'Regimental Aid Post',
        def: 'The first frontline medical station, located roughly 200 yards behind the firing line.',
      },
      {
        term: 'Casualty Clearing Station',
        def: 'The first well-equipped surgical facility on the evacuation route, located 7–12 miles behind the frontline.',
      },
      {
        term: 'Triage',
        def: 'The clinical system of sorting casualties into priority categories based on their likelihood of survival.',
      },
      {
        term: 'RAMC',
        def: 'Royal Army Medical Corps; the branch of the British Army responsible for medical treatment and casualty evacuation.',
      },
      {
        term: 'FANY',
        def: 'First Aid Nursing Yeomanry; an all-women voluntary organization that drove ambulances and provided frontline medical care.',
      },
    ],
    causalFactors: [
      '<strong>1. Systematic Staging:</strong> The staged evacuation chain ensured casualties received progressively more specialized care as they moved away from danger.',
      '<strong>2. The Triage Principle:</strong> Prioritizing soldiers who had a strong chance of survival if operated on immediately maximized the survival rate.',
      '<strong>3. Female Volunteer Integration:</strong> Organizations like FANY broke military gender barriers, taking over vital logistics and ambulance driving.',
    ],
  },
  lesson_5_5: {
    deepKnowledgeGrid: [
      {
        title: '1. The Thomas Splint (1915)',
        points: [
          '<strong>Hugh Owen Thomas:</strong> Designed by Welsh orthopaedic pioneer; rigid metal frame that pulled the broken femur in traction.',
          '<strong>Stopped Bone Grating:</strong> Prevented jagged broken bone ends rubbing together, which previously tore muscle and severed the femoral artery.',
          '<strong>Stunning 80% to 20% Drop:</strong> Mortality from compound femur fractures plummeted from 80% in 1914 to below 20% by 1916; applied right at the aid post.',
        ],
      },
      {
        title: '2. Stored Blood & Oswald Robertson',
        points: [
          '<strong>Anticoagulation Breakthrough:</strong> Albert Hustin (1914) discovered sodium citrate prevented blood clotting; Rous & Turner added glucose (1916).',
          '<strong>First Blood Depot (1917):</strong> Captain Oswald Robertson collected type O blood in glass bottles, kept on ice; treated 20 men in shock at Battle of Cambrai.',
          '<strong>Cured Fatal Shock:</strong> Allowed rapid transfusions directly at Casualty Clearing Stations, transforming treatment of haemorrhagic shock.',
        ],
      },
      {
        title: '3. Mobile X-Rays & Infection Control',
        points: [
          '<strong>Mobile X-Ray Vans:</strong> Mobile vans travelled between CCSs; located jagged shrapnel fragments and bullets inside flesh before surgeons cut.',
          '<strong>Wound Debridement:</strong> Surgeons learned to cut away all dead, dirty tissue from wounds immediately to deny bacteria food.',
          '<strong>Carrel-Dakin Method:</strong> Continuous irrigation of deep wounds with sterilized sodium hypochlorite solution; killed gas gangrene bacteria.',
        ],
      },
      {
        title: '4. Brain & Plastic Surgery Advances',
        points: [
          '<strong>Harvey Cushing (Brain Surgery):</strong> Used local anaesthetic rather than general; used magnets to draw shrapnel from brain tissue; cut mortality from 54% to 29%.',
          '<strong>Harold Gillies (Plastic Surgery):</strong> Pioneer who established specialized hospital at Queen’s Hospital, Sidcup (1917); treated horrific facial shrapnel mutilations.',
          '<strong>Tube Pedicle Graft:</strong> Kept grafted skin alive with its own blood supply via a rolled flesh tube, rebuilding noses, jaws, and cheeks for over 11,000 men.',
        ],
      },
    ],
    vocabBank: [
      {
        term: 'Thomas Splint',
        def: 'A rigid traction splint introduced in 1915 that reduced compound femur fracture mortality from 80% to 20%.',
      },
      {
        term: 'Blood Depot',
        def: 'The world’s first blood bank established by Oswald Robertson at the Battle of Cambrai in 1917.',
      },
      {
        term: 'Sodium Citrate',
        def: 'A chemical anticoagulant discovered in 1914 that prevented blood from clotting when stored.',
      },
      {
        term: 'Debridement',
        def: 'The surgical removal of dead, damaged, or infected tissue to prevent the spread of gas gangrene.',
      },
      {
        term: 'Carrel-Dakin Method',
        def: 'An antiseptic wound irrigation system using sodium hypochlorite solution to flush deep shrapnel wounds.',
      },
      {
        term: 'Tube Pedicle',
        def: 'A plastic surgery technique invented by Harold Gillies that rolled living skin into a tube to reconstruct facial injuries.',
      },
    ],
    causalFactors: [
      '<strong>1. Scale of Wounds Driving Innovation:</strong> The unprecedented severity of shrapnel trauma forced surgeons to pioneer radical new procedures.',
      '<strong>2. Chemistry & Refrigeration:</strong> Storing blood required solving chemical clotting (citrate) and bacterial growth (ice refrigeration).',
      '<strong>3. Enduring Civilian Legacy:</strong> Techniques perfected under fire—blood banks, traction splints, plastic surgery—transferred directly into peacetime healthcare.',
    ],
  },
};
const LESSON_KEYS = [
  'lesson_1_1',
  'lesson_1_2',
  'lesson_1_3',
  'lesson_2_1',
  'lesson_2_2',
  'lesson_2_3',
  'lesson_3_1',
  'lesson_3_2',
  'lesson_3_3',
  'lesson_4_1',
  'lesson_4_2',
  'lesson_4_3',
  'lesson_4_4',
  'lesson_5_1',
  'lesson_5_2',
  'lesson_5_3',
  'lesson_5_4',
  'lesson_5_5',
];

// Map authentic images to pillar IDs across spreads
const PILLAR_IMAGES = {
  church: '/images/medieval_church_interior.jpg',
  hippocrates: '/images/hippocrates_portrait.jpg',
  galen: '/images/galen_portrait.jpg',
  vesalius: '/images/vesalius_muscle_men.jpg',
  harvey: '/images/harvey_veins.jpg',
  pasteur: '/images/pasteur_lab.jpg',
  nightingale: '/images/nightingale.jpg',
  snow: '/images/john_snow_cholera_map.jpg',
  dna: '/images/dna_structure.jpg',
  fleming: '/images/fleming_petri_dish.jpg',
  florey_chain: '/images/penicillin_mould.jpg',
  mass_production: '/images/penicillin_propaganda.jpg',
  doll_hill: '/images/lung_cancer_campaign.jpg',
  somme_arras: '/images/stretcher_bearers_passchendaele_1917.jpg',
  gas_gangrene: '/images/blinded_soldiers_gas_1918.jpg',
};

const EXAMINER_TRAPS_DATA = {
  lesson_1_1: [
    {
      trap: 'Assuming medieval people had "no logic" or were unscientific fools.',
      correction:
        'Humoural theory was empirical and internally logical based on observable bodily fluids; physicians carefully studied symptoms, uroscopy charts, and pulse rates.',
    },
    {
      trap: "Confusing Hippocrates with Galen's distinct medical breakthroughs.",
      correction:
        'Hippocrates (c.460 BC, Greece) created the 4 Humours and clinical observation; Galen (c.129 AD, Rome) developed the Theory of Opposites and teleological anatomy 600 years later.',
    },
    {
      trap: 'Claiming the Catholic Church opposed classical Roman and Greek medicine.',
      correction:
        'The Church fiercely defended Galen because his teaching that the body was created with divine purpose (teleology) supported Christian scripture, banning any questioning of his texts.',
    },
    {
      trap: 'Stating medieval people blamed the Black Death on rats and fleas.',
      correction:
        "Medieval people had zero knowledge of bacteria or fleas; they blamed God's wrath for human sin, the 1345 planetary conjunction, miasma, and scapegoated religious minorities.",
    },
  ],
  lesson_1_2: [
    {
      trap: 'Believing medieval hospitals were designed to cure medical sickness.',
      correction:
        'Monastic hospitals provided spiritual care, shelter, and food ("care, not cure"); infectious patients, pregnant women, and the terminally ill were strictly turned away.',
    },
    {
      trap: 'Assuming university physicians treated the general population.',
      correction:
        'Physicians were an unaffordable elite (under 100 in England); over 90% of healthcare was delivered by female family members, wise women, and barber-surgeons.',
    },
    {
      trap: 'Treating bloodletting as random, unguided butchery.',
      correction:
        'Phlebotomy followed precise astrological charts (Vein Man) and humoural diagnoses to restore bodily balance using cupping, leeches, or vein incision.',
    },
    {
      trap: 'Overlooking the role of apothecaries in urban communities.',
      correction:
        'Apothecaries were trained through practical guilds, dispensing herbal theriacs, ointments, and charms far cheaper than university physicians.',
    },
  ],
  lesson_1_3: [
    {
      trap: 'Describing government public health action as well-coordinated and national.',
      correction:
        'The King and Parliament fled London; public health responses were local, ad-hoc, and ineffective (e.g. Gloucester shutting its gates too late).',
    },
    {
      trap: 'Omitting religious scapegoating in European context.',
      correction:
        'Across continental Europe, Jewish communities were falsely accused of poisoning wells, leading to massacres (e.g. Strasbourg 1348, where over 2,000 Jews were burned).',
    },
    {
      trap: 'Believing herbal remedies offered genuine medical protection.',
      correction:
        'Pomanders, posies, and sweet herbs were carried solely to ward off miasma (foul air), providing zero biological protection against Yersinia pestis.',
    },
    {
      trap: 'Assuming the Black Death prompted immediate scientific reform.',
      correction:
        'The catastrophe reinforced religious orthodoxy; many believed flagellation and penance were the only hope to appease an angry God.',
    },
  ],
  lesson_2_1: [
    {
      trap: 'Claiming the Renaissance brought an immediate revolution in ordinary healthcare.',
      correction:
        'Ideas changed among the educated scientific elite, but ordinary people and apothecaries continued to rely on humours and miasma for another 200 years.',
    },
    {
      trap: "Overstating Thomas Sydenham's impact on medical treatments.",
      correction:
        'Sydenham revolutionized diagnosis (classifying illnesses into specific external species), but his treatments remained traditional (bleeding, purging, cinchona bark).',
    },
    {
      trap: 'Assuming the Royal Society performed direct clinical surgeries.',
      correction:
        'The Royal Society (1660) was a scientific academy promoting experimentation (Nullius in Verba); its journal Philosophical Transactions spread empirical discoveries.',
    },
    {
      trap: 'Underestimating the significance of the printing press.',
      correction:
        'Movable type prevented copying errors, reduced book costs, and meant new ideas could not be easily suppressed or controlled by Church authorities.',
    },
  ],
  lesson_2_2: [
    {
      trap: 'Claiming Vesalius discovered medical cures for human diseases.',
      correction:
        "Vesalius revolutionized human anatomy by correcting over 300 of Galen's animal-based errors, but his work produced zero immediate cures or surgical treatments.",
    },
    {
      trap: 'Assuming Vesalius faced immediate Church arrest or execution.',
      correction:
        'Vesalius served as court physician to Holy Roman Emperor Charles V; his main opponents were conservative medical academics who refused to abandon Galen.',
    },
    {
      trap: 'Describing Renaissance surgery as safe or antiseptic.',
      correction:
        'Internal surgery remained deadly due to shock, blood loss, and infection; anaesthetics and antiseptics did not exist until the mid-19th century.',
    },
    {
      trap: 'Forgetting the visual quality of De Humani Corporis Fabrica (1543).',
      correction:
        "Vesalius employed master Renaissance artists from Titian's workshop, creating precise, layered woodcuts that became the global standard.",
    },
  ],
  lesson_2_3: [
    {
      trap: 'Crediting William Harvey with inventing successful blood transfusions.',
      correction:
        'Harvey proved the circulation of blood and that the heart acts as a mechanical pump (1628), but transfusions were impossible until blood groups (1901) were discovered.',
    },
    {
      trap: "Assuming Harvey's discovery changed medical practice overnight.",
      correction:
        "Harvey's breakthrough was initially rejected by conservative doctors as ridiculous; doctors continued bloodletting for two centuries after his work.",
    },
    {
      trap: 'Treating the 1665 Great Plague response as scientifically modern.',
      correction:
        'Although watchmen and red crosses ("Lord have mercy on us") enforced quarantine, causes were still blamed on miasma and divine wrath; 200,000 cats/dogs were uselessly slaughtered.',
    },
    {
      trap: 'Confusing the 1348 Black Death with the 1665 Great Plague.',
      correction:
        'In 1665, local government public health was far more organised (searchers of the dead, burial pits, trade bans), but medical understanding of the disease remained identical.',
    },
  ],
  lesson_3_1: [
    {
      trap: 'Crediting Louis Pasteur with identifying specific human disease bacteria.',
      correction:
        'Pasteur proved microbes caused decay (1861 Germ Theory) and developed vaccines for rabies/anthrax; Robert Koch identified specific human disease bacteria (anthrax, TB, cholera).',
    },
    {
      trap: 'Assuming British doctors immediately welcomed Germ Theory in 1861.',
      correction:
        'Prominent physicians like Charlton Bastian fiercely defended Spontaneous Generation and miasma until the late 1870s; acceptance took almost two decades.',
    },
    {
      trap: "Forgetting Robert Koch's critical technological breakthroughs.",
      correction:
        'Koch succeeded because he invented solid agar jelly cultures, methyl violet chemical dye stains, and high-resolution industrial photomicrography.',
    },
    {
      trap: 'Confusing vaccination with antimicrobial treatment.',
      correction:
        'Pasteur and Koch developed preventative vaccines, but neither discovered antibiotics or chemical cures to treat existing bacterial infections.',
    },
  ],
  lesson_3_2: [
    {
      trap: 'Assuming chloroform immediately made surgery safer and reduced deaths.',
      correction:
        'Chloroform created the "Black Period" of surgery (1846–70): painless patients allowed deeper, longer surgeries, leading to massive spikes in gangrene and fatal infection.',
    },
    {
      trap: "Conflating Joseph Lister's antiseptics with aseptic surgery.",
      correction:
        "Lister's carbolic acid (1865) killed bacteria during surgery; aseptic surgery (1890s, Neuber/von Bergmann) excluded bacteria beforehand using autoclaves and rubber gloves.",
    },
    {
      trap: "Thinking Florence Nightingale believed in Pasteur's Germ Theory.",
      correction:
        'Nightingale remained a staunch miasmatist; her pavilion hospital designs worked because fresh air, sanitation, and clean bedding accidentally eliminated lethal bacteria.',
    },
    {
      trap: 'Ignoring religious and medical opposition to anaesthetics.',
      correction:
        "Many Calvinist doctors opposed chloroform, claiming pain in childbirth was God's punishment for Eve; opposition only ended when Queen Victoria used it in 1853.",
    },
  ],
  lesson_3_3: [
    {
      trap: 'Believing Edward Jenner understood the biological mechanism of vaccination.',
      correction:
        'Jenner made an empirical observation connecting cowpox to smallpox (1796); he had zero knowledge of viruses, bacteria, or the immune system.',
    },
    {
      trap: 'Assuming John Snow proved the cholera bacterium in 1854.',
      correction:
        'Snow proved cholera was water-borne via epidemiological mapping (Broad Street pump); Robert Koch physically discovered the Vibrio cholerae bacterium 30 years later (1884).',
    },
    {
      trap: 'Confusing the permissive 1848 Public Health Act with the compulsory 1875 Act.',
      correction:
        'The 1848 Act was non-compulsory (permissive); the 1875 Public Health Act was compulsory, forcing every local authority to provide clean water, sewers, and health inspectors.',
    },
    {
      trap: "Believing the Board of Health immediately accepted Snow's water theory.",
      correction:
        "The Board of Health and William Farr rejected Snow's findings in 1854, clinging to miasma theory until the 1866 East London cholera outbreak proved Snow correct.",
    },
  ],
  lesson_4_1: [
    {
      trap: 'Crediting only James Watson and Francis Crick with the discovery of DNA.',
      correction:
        "Rosalind Franklin's Photo 51 X-ray crystallography and Maurice Wilkins were vital in proving the double-helix structure at King's College London (1953).",
    },
    {
      trap: 'Assuming the Human Genome Project immediately cured genetic diseases.',
      correction:
        'Mapping the human genome (2003) enabled precision diagnostic testing and gene mutation identification (e.g. BRCA1), but genetic gene therapy cures remain in early clinical trials.',
    },
    {
      trap: 'Overlooking the role of lifestyle and epidemiology in modern disease.',
      correction:
        'Post-1950 British epidemiological studies (e.g. Doll and Hill on smoking) proved that non-communicable diseases are overwhelmingly driven by lifestyle factors (diet, alcohol, tobacco).',
    },
    {
      trap: 'Confusing medical imaging technologies.',
      correction:
        'X-rays reveal high-density bone; CT scans create cross-sectional 3D slices; MRI scans use magnetic fields for soft tissue; PET scans track metabolic cellular activity.',
    },
  ],
  lesson_4_2: [
    {
      trap: 'Calling Salvarsan 606 or Prontosil an "antibiotic".',
      correction:
        'Salvarsan 606 (Ehrlich, 1909) and Prontosil (Domagk, 1932) are synthetic chemical magic bullets; antibiotics are natural chemical compounds produced by living microorganisms.',
    },
    {
      trap: 'Assuming the British Medical Association (BMA) welcomed the NHS in 1948.',
      correction:
        'Over 90% of doctors voted against the NHS initially; Health Minister Aneurin Bevan had to "stuff their mouths with gold" by guaranteeing GP salaries and allowing private practice.',
    },
    {
      trap: 'Believing the NHS immediately eliminated all health inequalities.',
      correction:
        'The NHS removed financial barriers to access at the point of delivery, but severe regional inequalities and prescription charges (1951) emerged within three years.',
    },
    {
      trap: 'Forgetting the foundational role of the 1942 Beveridge Report.',
      correction:
        'William Beveridge identified the "Five Giants" (Disease, Want, Ignorance, Squalor, Idleness), establishing public consensus for universal welfare healthcare.',
    },
  ],
  lesson_4_3: [
    {
      trap: 'Believing Alexander Fleming developed penicillin for medical treatment.',
      correction:
        'Fleming made an accidental laboratory discovery in 1928 but failed to purify it and abandoned it; Howard Florey and Ernst Chain isolated and purified it for systemic use in 1940.',
    },
    {
      trap: 'Assuming Britain mass-produced penicillin during World War II.',
      correction:
        'British factories were bombed and dedicated to munitions; Florey traveled to the USA (Peoria, Illinois) where US government war loans and beer brewing vats financed deep-tank fermentation.',
    },
    {
      trap: 'Forgetting the tragic Albert Alexander clinical trial (1941).',
      correction:
        "Penicillin cleared Alexander's bloodstream infection, but the Oxford team ran out of the drug and he died, conclusively proving the urgent necessity for industrial mass production.",
    },
    {
      trap: 'Ignoring the modern crisis of antibiotic resistance.',
      correction:
        'Overuse and agricultural misuse of antibiotics have led to multi-drug resistant superbugs (e.g. MRSA), threatening to return medicine to a pre-antibiotic era.',
    },
  ],
  lesson_4_4: [
    {
      trap: 'Stating that chemotherapy or radiotherapy completely prevents lung cancer.',
      correction:
        'Chemo/radiotherapy treat existing tumours (with low 5-year survival rates); prevention relies entirely on state health campaigns and smoking legislation.',
    },
    {
      trap: 'Assuming government anti-smoking legislation was implemented swiftly.',
      correction:
        'Doll and Hill proved the causal link in 1950, but tobacco tax revenue and industry lobbying delayed decisive legislation (indoor ban in 2007, plain packs in 2016) by over 50 years.',
    },
    {
      trap: 'Overlooking modern high-tech diagnostic tools.',
      correction:
        'Standard chest X-rays frequently miss early microscopic tumours; CT scans, PET-CT, and endobronchial ultrasound (EBUS) with biopsy are essential for early detection.',
    },
    {
      trap: 'Confusing targeted biological therapies with traditional chemotherapy.',
      correction:
        'Traditional chemotherapy kills all rapidly dividing cells; modern genomic immunotherapy and targeted drugs attack specific cancer cell genetic mutations.',
    },
  ],
  lesson_5_1: [
    {
      trap: 'Assuming motor ambulances were deployed effectively from August 1914.',
      correction:
        'The British Army initially banned motor ambulances and relied on horse carts; motor ambulances were funded by the British Red Cross in late 1914 because horse carts shook broken limbs terribly.',
    },
    {
      trap: 'Confusing the contrasting terrain of Ypres with Cambrai.',
      correction:
        'Ypres was waterlogged Flanders clay where artillery destroyed natural drainage, causing drowning in mud; Cambrai featured dry, undulating chalky ground suitable for mass tank warfare.',
    },
    {
      trap: 'Stating that ambulance trains evacuated casualties from frontline trenches.',
      correction:
        'Ambulance trains and canal barges operated exclusively between Casualty Clearing Stations and Base Hospitals along the coast, never at the frontline.',
    },
    {
      trap: 'Overlooking the communication challenges of destroyed telephone cables.',
      correction:
        'Constant shellfire severed telephone wires, forcing medical staff to rely on runner messengers, carrier pigeons, and visual flags under heavy artillery fire.',
    },
  ],
  lesson_5_2: [
    {
      trap: 'Believing trenches were dug in continuous, straight defensive lines.',
      correction:
        'Trenches were constructed in a zigzag (traversed) pattern to compartmentalise artillery blast damage and prevent enemy riflemen firing down the entire length of the trench.',
    },
    {
      trap: 'Assuming frontline trenches were where soldiers lived permanently.',
      correction:
        'Soldiers rotated in a strict cycle (typically 4–6 days in front line, 4 in support, 8 in reserve, followed by rest); continuous frontline duty shattered mental and physical health.',
    },
    {
      trap: 'Forgetting the critical role of communications trenches.',
      correction:
        'Communications trenches connected the front line to support and reserve lines, allowing stretcher-bearers and medical supplies to move under cover from enemy snipers.',
    },
    {
      trap: 'Confusing the functions of support and reserve trenches.',
      correction:
        'Support trenches (80 yards back) housed counter-attack troops; reserve trenches (several hundred yards back) held reserve troops and supplies if the front line was overrun.',
    },
  ],
  lesson_5_3: [
    {
      trap: 'Believing poison gas caused the majority of deaths on the Western Front.',
      correction:
        'Poison gas caused under 3% of British deaths; artillery shrapnel and high explosive shells caused over 58% of all wounds and fatalities.',
    },
    {
      trap: 'Confusing the medical effects of chlorine, phosgene, and mustard gas.',
      correction:
        'Chlorine (1915) and phosgene (1915) suffocated the lungs; mustard gas (1917) was an odourless blistering agent that burned skin, blinded eyes, and contaminated mud for weeks.',
    },
    {
      trap: 'Assuming gas gangrene was caused by poisonous weapon chemicals.',
      correction:
        'Gas gangrene was caused by soil bacteria (Clostridium perfringens) in heavily manured Belgian farmland blasted into deep tissue wounds by artillery shrapnel.',
    },
    {
      trap: 'Overlooking the Brodie steel helmet introduced in 1915.',
      correction:
        'The soft cloth cap was replaced by the steel Brodie helmet in 1915, cutting fatal head injuries from shrapnel and falling debris by over 80%.',
    },
  ],
  lesson_5_4: [
    {
      trap: 'Thinking surgeries were routinely performed at the Regimental Aid Post (RAP).',
      correction:
        'RAPs were 200 yards behind the front line providing immediate first aid (dressings, splints, morphine); life-saving surgery was performed at Casualty Clearing Stations (CCS).',
    },
    {
      trap: 'Forgetting the vital triage system at Casualty Clearing Stations.',
      correction:
        'The CCS was the most critical surgical hub, dividing casualties into three categories: walking wounded, urgent surgical cases, and moribund (too severely injured to survive).',
    },
    {
      trap: 'Overlooking the role of FANY (First Aid Nursing Yeomanry).',
      correction:
        'FANY women drove frontline ambulances, ran mobile canteens, and operated soup kitchens under fire, breaking military resistance to female front-line presence.',
    },
    {
      trap: 'Confusing Field Ambulances with motor vehicles.',
      correction:
        'A "Field Ambulance" was not a vehicle; it was a mobile medical unit of the RAMC (around 240 men) that established and staffed Dressing Stations (ADS/MDS).',
    },
  ],
  lesson_5_5: [
    {
      trap: 'Crediting Hugh Owen Thomas with inventing the Thomas Splint during WWI.',
      correction:
        'Hugh Owen Thomas designed the splint in the 19th century; his nephew Robert Jones introduced it to the Western Front in 1915, cutting compound fracture mortality from 80% to below 20%.',
    },
    {
      trap: 'Believing blood transfusions could be stored indefinitely from 1914.',
      correction:
        "Direct transfusions required donor and patient side-by-side; storage was impossible until sodium citrate (1914) and glucose (1916) enabled Oswald Robertson's 1917 Cambrai blood depot.",
    },
    {
      trap: 'Stating that Harold Gillies cured head and brain wounds.',
      correction:
        "Gillies pioneered plastic facial reconstruction (Queen's Hospital, Sidcup) for disfigured soldiers using tube pedicle skin grafts; Harvey Cushing pioneered brain surgery techniques.",
    },
    {
      trap: 'Assuming mobile X-ray units were stationed in frontline trenches.',
      correction:
        'Mobile X-ray vans operated at Casualty Clearing Stations and Base Hospitals; equipment was fragile and required electricity and darkroom facilities.',
    },
  ],
};

SPREADS.forEach((s, idx) => {
  const key = LESSON_KEYS[idx];
  if (ENRICHMENTS_DATA[key]) {
    s.left.deepKnowledgeGrid = ENRICHMENTS_DATA[key].deepKnowledgeGrid;
    s.left.vocabBank = ENRICHMENTS_DATA[key].vocabBank;
    s.left.causalFactors = ENRICHMENTS_DATA[key].causalFactors;
  }
  if (EXAMINER_TRAPS_DATA[key]) {
    s.left.examinerTraps = EXAMINER_TRAPS_DATA[key];
  }
  if (s.left && s.left.pillars) {
    s.left.pillars.forEach((p) => {
      if (PILLAR_IMAGES[p.id]) {
        p.image = PILLAR_IMAGES[p.id];
      }
    });
  }
});

// Attach authentic visual sources to Section A Q2(a)
if (SPREADS[13] && SPREADS[13].right.q2a) {
  SPREADS[13].right.q2a.visualSource = {
    image: '/images/stretcher_bearers_passchendaele_1917.jpg',
    title: 'Source A (Visual): Stretcher bearers in mud, Ypres Salient, 1917',
    caption:
      'Official British photograph showing stretcher bearers struggling through deep, waterlogged mud near Passchendaele, 1917.',
  };
}

if (SPREADS[15] && SPREADS[15].right.q2a) {
  SPREADS[15].right.q2a.visualSource = {
    image: '/images/blinded_soldiers_gas_1918.jpg',
    title: 'Source A (Visual): Blinded British soldiers after mustard gas attack, 1918',
    caption:
      'Official photograph showing a line of British soldiers blinded by mustard gas, each with eyes bandaged, holding the shoulder of the man in front.',
  };
}

if (SPREADS[17] && SPREADS[17].right.q2a) {
  SPREADS[17].right.q2a.visualSource = {
    image: '/images/mobile_xray_field_hospital_1917.jpg',
    title: 'Source A (Visual): Mobile X-ray unit locating a bullet at a field hospital, 1917',
    caption:
      'Official contemporary photograph showing military medical staff operating mobile radiographic equipment powered by a vehicle engine to locate embedded bullets in a wounded soldier.',
  };
}

function getImageDataUri(imgPath) {
  if (!imgPath) return '';
  const cleanPath = imgPath.startsWith('/') ? imgPath.slice(1) : imgPath;
  const fullPath = path.join(process.cwd(), 'public', cleanPath);
  if (fs.existsSync(fullPath)) {
    const ext = path.extname(fullPath).toLowerCase().replace('.', '');
    const mime = ext === 'svg' ? 'image/svg+xml' : ext === 'png' ? 'image/png' : 'image/jpeg';
    const b64 = fs.readFileSync(fullPath).toString('base64');
    return `data:${mime};base64,${b64}`;
  }
  return imgPath;
}

// Helper to convert markdown bold/italics in text
function formatMd(text) {
  if (!text) return '';
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>');
}

// Render Left Knowledge Page (Dense Level 4-9 Masterclass with Examiner Traps)
function renderLeftPage(data, pageNum, spreadIndex) {
  const left = data.left;
  const deepGrid = left.deepKnowledgeGrid || [];
  const vocab = left.vocabBank || [];
  const causal = left.causalFactors || [];
  const traps = left.examinerTraps || [];

  // Pillars HTML (Top Tier) - Clean, authoritative typographic cards without circular avatars
  const pillarsHtml = left.pillars
    .map((pillar) => {
      const bulletsHtml = pillar.bullets
        .map((b) => `<li style="margin-bottom: 2px;">${formatMd(b)}</li>`)
        .join('');
      return `
      <div style="background: #ffffff; border: 1.5px solid #1e3a8a; border-radius: 5px; padding: 7px 9px; flex: 1; display: flex; flex-direction: column;">
        <div style="border-bottom: 1px solid #e2e8f0; padding-bottom: 3px; margin-bottom: 4px;">
          <div style="font-size: 9.2pt; font-weight: 800; color: #0f172a; line-height: 1.2; margin-bottom: 2px;">${pillar.title}</div>
          <div style="font-size: 6.8pt; font-weight: 700; color: #1e3a8a; text-transform: uppercase; letter-spacing: 0.5px;">${pillar.subtitle || ''}</div>
        </div>
        <ul style="margin: 0; padding-left: 13px; font-size: 6.8pt; color: #334155; line-height: 1.34; flex: 1;">
          ${bulletsHtml}
        </ul>
      </div>
    `;
    })
    .join('');

  // Tier 2: Deep Knowledge Grid (4 Columns)
  let deepGridHtml = '';
  if (deepGrid && deepGrid.length > 0) {
    const colsHtml = deepGrid
      .map((col) => {
        const ptsHtml = col.points
          .map((pt) => `<li style="margin-bottom: 2px;">${formatMd(pt)}</li>`)
          .join('');
        return `
        <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 4px; padding: 5px 6px;">
          <div style="font-size: 7.2pt; font-weight: 800; color: #1e3a8a; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px; margin-bottom: 3px;">
            ${col.title}
          </div>
          <ul style="margin: 0; padding-left: 10px; font-size: 6.4pt; color: #1e293b; line-height: 1.28;">
            ${ptsHtml}
          </ul>
        </div>
      `;
      })
      .join('');

    deepGridHtml = `
      <div style="border: 1.5px solid #0f172a; border-radius: 5px; padding: 6px 8px; background: #fafafa;">
        <div style="font-size: 7.6pt; font-weight: 800; color: #0f172a; text-transform: uppercase; letter-spacing: 0.4px; margin-bottom: 4px; display: flex; justify-content: space-between;">
          <span>Core Knowledge Matrix &bull; Level 4 to Level 9 Grounded Evidence:</span>
          <span style="color: #64748b; font-weight: 700;">Textbook Grounded Evidence</span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(${deepGrid.length}, 1fr); gap: 5px;">
          ${colsHtml}
        </div>
      </div>
    `;
  }

  // Tier 3: Transmission Vectors & Synoptic Bridge
  let vectorsHtml = '';
  if (left.vectors && left.vectors.length > 0) {
    const vList = left.vectors
      .map(
        (v) =>
          `<div style="margin-bottom: 2px;"><strong style="color: #0f172a;">${v.from} &rarr; ${v.to}:</strong> ${formatMd(v.text || v.desc || '')}</div>`,
      )
      .join('');
    vectorsHtml = `
      <div style="flex: 1.2; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 5px; padding: 6px 8px; font-size: 6.6pt; line-height: 1.32; color: #334155;">
        <div style="font-size: 7pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; margin-bottom: 3px;">
          Key Transmission Vectors:
        </div>
        ${vList}
      </div>
    `;
  }

  let bridgeHtml = '';
  if (left.middleBox) {
    const mb = left.middleBox;
    let linksHtml = '';
    if (mb.links && mb.links.length > 0) {
      linksHtml = mb.links
        .map(
          (l) => `
        <div style="margin-bottom: 2px;">
          <strong style="color: #0f172a;">${l.era} (${l.badge}):</strong> ${formatMd(l.text)}
        </div>
      `,
        )
        .join('');
    } else {
      linksHtml = `
        <div style="margin-bottom: 2px;"><strong>${mb.item1Title || 'Core Concept'}:</strong> ${formatMd(mb.item1Text || '')}</div>
        <div><strong>${mb.item2Title || 'Historical Impact'}:</strong> ${formatMd(mb.item2Text || '')}</div>
      `;
    }
    bridgeHtml = `
      <div style="flex: 1.3; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 5px; padding: 6px 8px; font-size: 6.6pt; line-height: 1.32; color: #14532d;">
        <div style="font-size: 7pt; font-weight: 800; color: #15803d; text-transform: uppercase; margin-bottom: 3px;">
          ⚡ ${mb.title}
        </div>
        ${linksHtml}
      </div>
    `;
  }

  const tier3Html =
    vectorsHtml || bridgeHtml
      ? `
    <div style="display: flex; gap: 7px;">
      ${vectorsHtml}
      ${bridgeHtml}
    </div>
  `
      : '';

  // Tier 4: Vocabulary Bank & Causal Factors / Synoptic Evidence Bank
  let vocabHtml = '';
  if (vocab && vocab.length > 0) {
    const vItems = vocab
      .map(
        (v) =>
          `<div style="margin-bottom: 2px;"><strong>${v.term}:</strong> ${formatMd(v.def)}</div>`,
      )
      .join('');
    vocabHtml = `
      <div style="flex: 1; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 5px; padding: 6px 8px; font-size: 6.6pt; line-height: 1.3; color: #334155;">
        <div style="font-size: 7pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; margin-bottom: 3px; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px;">
          Key Analytical Vocabulary Bank:
        </div>
        ${vItems}
      </div>
    `;
  }

  let causalOrSynopticHtml = '';
  if (left.bottomBox && left.bottomBox.type === 'synoptic_bank') {
    // 16m essay synoptic bank
    const sb = left.bottomBox;
    const col1Items = (sb.col1Points || [])
      .map((p) => `<li style="margin-bottom: 2px;">${formatMd(p)}</li>`)
      .join('');
    const col2Items = (sb.col2Points || [])
      .map((p) => `<li style="margin-bottom: 2px;">${formatMd(p)}</li>`)
      .join('');
    causalOrSynopticHtml = `
      <div style="flex: 1.8; background: #eff6ff; border: 1.5px solid #1e3a8a; border-radius: 5px; padding: 6px 8px; font-size: 6.6pt; line-height: 1.3; color: #1e293b;">
        <div style="font-size: 7.2pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; margin-bottom: 3px; border-bottom: 1px solid #bfdbfe; padding-bottom: 2px;">
          ★ ${sb.title}
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 7px;">
          <div>
            <strong style="color: #1e3a8a; display: block; margin-bottom: 2px;">${sb.col1Title}:</strong>
            <ul style="margin: 0; padding-left: 10px;">${col1Items}</ul>
          </div>
          <div>
            <strong style="color: #1e3a8a; display: block; margin-bottom: 2px;">${sb.col2Title}:</strong>
            <ul style="margin: 0; padding-left: 10px;">${col2Items}</ul>
          </div>
        </div>
      </div>
    `;
  } else if (causal && causal.length > 0) {
    const cItems = causal
      .map((c) => `<div style="margin-bottom: 2px;">${formatMd(c)}</div>`)
      .join('');
    causalOrSynopticHtml = `
      <div style="flex: 1.4; background: #fffbeb; border: 1px solid #fde68a; border-radius: 5px; padding: 6px 8px; font-size: 6.6pt; line-height: 1.3; color: #78350f;">
        <div style="font-size: 7pt; font-weight: 800; color: #92400e; text-transform: uppercase; margin-bottom: 3px; border-bottom: 1px solid #fef3c7; padding-bottom: 2px;">
          Causal Factors &amp; Analysis:
        </div>
        ${cItems}
      </div>
    `;
  }

  const tier4Html =
    vocabHtml || causalOrSynopticHtml
      ? `
    <div style="display: flex; gap: 7px;">
      ${vocabHtml}
      ${causalOrSynopticHtml}
    </div>
  `
      : '';

  // Tier 5: Common Errors to Avoid & How to Improve (Clean Professional Styling)
  let trapsHtml = '';
  if (traps && traps.length > 0) {
    const tItems = traps
      .map(
        (t) => `
      <div style="margin-bottom: 1.5px;">
        <strong>&bull; Common Error:</strong> ${formatMd(t.trap)}<br/>
        <strong style="color: #1e3a8a;">&rarr; How to improve:</strong> ${formatMd(t.correction)}
      </div>
    `,
      )
      .join('');

    trapsHtml = `
      <div style="border: 1.5px solid #0f172a; border-radius: 5px; padding: 6px 9px; background: #fafafa;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 4px;">
          <span style="font-size: 7.4pt; font-weight: 800; color: #991b1b; text-transform: uppercase; letter-spacing: 0.4px;">
            Common Errors to Avoid:
          </span>
          <span style="font-size: 6.5pt; font-weight: 700; color: #475569;">
            Edexcel Mark Scheme Pitfalls &rarr; How to Improve
          </span>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px 10px; font-size: 6.6pt; line-height: 1.3; color: #1e293b;">
          ${tItems}
        </div>
      </div>
    `;
  }

  return `
  <div class="page page-left" id="spread-${spreadIndex}" data-spread="${spreadIndex}" data-page="${pageNum}" data-lesson="${data.id}" style="box-sizing: border-box; width: 794px; height: 1123px; padding: 18px 24px 16px 24px; font-family: 'Inter', sans-serif; background-color: #ffffff; display: flex; flex-direction: column; justify-content: space-between; overflow: hidden; scroll-margin-top: 65px; position: relative;">
    <span id="page-${pageNum}" style="position: absolute; top: 0;"></span>
    <span id="lesson-${data.id}" style="position: absolute; top: 0;"></span>
    
    <!-- Top Header -->
    <div style="border-bottom: 2px solid #0f172a; padding-bottom: 3px; margin-bottom: 6px;">
      <div style="display: flex; justify-content: space-between; align-items: baseline;">
        <span style="font-size: 8.3pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; letter-spacing: 0.5px;">
          ${left.tag}
        </span>
        <span style="font-size: 6.8pt; font-weight: 700; color: #1e3a8a; background: #eff6ff; padding: 2px 6px; border-radius: 3px; border: 1px solid #bfdbfe;">
          Specification Deep Knowledge
        </span>
      </div>
      <h1 style="font-family: 'Playfair Display', Georgia, serif; font-size: 14.5pt; color: #0f172a; margin: 2px 0 1px 0; border: none; padding: 0; font-weight: 900;">
        ${left.headline}
      </h1>
      <p style="font-size: 7.4pt; color: #475569; margin: 0; line-height: 1.32;">
        ${left.summary}
      </p>
    </div>

    <!-- Tier 1: Core 3 Pillars -->
    <div style="display: flex; gap: 7px; margin-bottom: 6px;">
      ${pillarsHtml}
    </div>

    <!-- Tier 2: Deep Knowledge Grid (4 Columns) -->
    <div style="margin-bottom: 6px;">
      ${deepGridHtml}
    </div>

    <!-- Tier 3: Transmission Vectors & Synoptic Bridge -->
    ${tier3Html ? `<div style="margin-bottom: 6px;">${tier3Html}</div>` : ''}

    <!-- Tier 4: Vocabulary Bank & Causal Factors -->
    ${tier4Html ? `<div style="margin-bottom: 6px;">${tier4Html}</div>` : ''}

    <!-- Tier 5: Common Errors to Avoid & How to Improve -->
    ${trapsHtml ? `<div style="margin-bottom: 4px;">${trapsHtml}</div>` : ''}

    <!-- Footer Signoff -->
    <div style="border-top: 1px solid #cbd5e1; padding-top: 3px; display: flex; justify-content: space-between; align-items: center; font-size: 6.6pt; color: #64748b;">
      <span>Edexcel GCSE (9–1) History &bull; Paper 1: Medicine in Britain (c.1250–present)</span>
      <span>Page ${pageNum}</span>
    </div>
  </div>
  `;
}
// Render Right Exam Page (Complete Question Coverage & Ruled Writing Lines)
function renderRightPage(data, pageNum, spreadIndex) {
  const right = data.right;
  const examType = data.examType;

  // Helper to render dotted writing lines
  const renderLines = (count) =>
    Array.from({ length: count })
      .map(() => '<div style="height: 17.5px; border-bottom: 1px dotted #94a3b8;"></div>')
      .join('');

  let examContentHtml = '';

  if (examType === 'q3_q4') {
    const stimulusList = (right.q4.stimulus || [right.q4.stimulus1, right.q4.stimulus2])
      .filter(Boolean)
      .join(' &bull; ');
    examContentHtml = `
      <!-- Q3 Container [4 Marks] -->
      <div style="background: #ffffff; border: 1.5px solid #1e3a8a; border-radius: 5px; padding: 7px 9px; margin-bottom: 8px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
          <strong style="font-size: 8.2pt; color: #1e3a8a;">${right.q3.title}</strong>
          <span style="font-size: 7pt; font-weight: 700; color: #1e3a8a; background: #eff6ff; padding: 1px 5px; border-radius: 2px;">Timing: ~5 mins</span>
        </div>
        <div style="font-size: 7.5pt; font-weight: 800; color: #0f172a; margin-bottom: 3px;">
          ${right.q3.question}
        </div>
        <div style="font-size: 6.6pt; color: #475569; font-style: italic; margin-bottom: 4px;">
          Guidance: 1 developed comparative PEEL paragraph. Link both periods directly with specific evidence.
        </div>
        ${renderLines(7)}
      </div>

      <!-- Q4 Container [12 Marks] -->
      <div style="background: #ffffff; border: 1.5px solid #0f172a; border-radius: 5px; padding: 7px 9px; margin-bottom: 6px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
          <strong style="font-size: 8.2pt; color: #0f172a;">${right.q4.title}</strong>
          <span style="font-size: 7pt; font-weight: 700; color: #0f172a; background: #f1f5f9; padding: 1px 5px; border-radius: 2px;">Timing: ~20 mins</span>
        </div>
        <div style="font-size: 7.5pt; font-weight: 800; color: #0f172a; margin-bottom: 4px;">
          ${right.q4.question}
        </div>

        <!-- Stimulus Box -->
        <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; padding: 5px 8px; margin-bottom: 5px; display: flex; justify-content: space-between; align-items: center;">
          <div style="font-size: 6.8pt; color: #1e293b;">
            <strong>You may use in your answer:</strong> &bull; ${stimulusList}
          </div>
          <div style="font-size: 6.4pt; font-weight: 800; color: #dc2626; background: #fee2e2; padding: 1px 5px; border-radius: 2px;">
            ⚠️ MUST include own knowledge beyond stimulus!
          </div>
        </div>

        ${renderLines(27)}
      </div>

      <!-- Marking Criteria Rubric -->
      <div style="border-top: 1.5px solid #0f172a; padding-top: 4px; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 8px; font-size: 6.6pt; color: #334155; align-items: center;">
        <div>
          <strong>Q3 Level 2 (3–4m):</strong> Direct comparative explanation linking both eras.<br/>
          <strong>Q4 Level 4 (10–12m):</strong> 3 fully developed analytical PEEL paragraphs including own knowledge.
        </div>
        <div style="text-align: right;">
          <strong>Target Time:</strong> ~25 Mins
        </div>
        <div style="display: flex; justify-content: flex-end; gap: 4px;">
          <div style="border: 1px solid #0f172a; border-radius: 3px; padding: 2px 5px; text-align: center;">
            <span style="display: block; font-size: 5.5pt; text-transform: uppercase;">Q3 Marks</span>
            <strong style="font-size: 7pt;">___ / 4</strong>
          </div>
          <div style="border: 1px solid #0f172a; border-radius: 3px; padding: 2px 5px; text-align: center;">
            <span style="display: block; font-size: 5.5pt; text-transform: uppercase;">Q4 Marks</span>
            <strong style="font-size: 7pt;">___ / 12</strong>
          </div>
          <div style="border: 1px solid #1e3a8a; background: #1e3a8a; color: #fff; border-radius: 3px; padding: 2px 6px; text-align: center;">
            <span style="display: block; font-size: 5.5pt; text-transform: uppercase;">Total</span>
            <strong style="font-size: 7pt;">___ / 16</strong>
          </div>
        </div>
      </div>
    `;
  } else if (examType === 'essay_16m') {
    const essayStimulus = (right.essay.stimulus || [right.essay.stimulus1, right.essay.stimulus2])
      .filter(Boolean)
      .join(' &bull; ');
    const essayQuestionText = right.essay.statement || right.essay.question || '';
    const essaySpan = right.essay.spanNote || right.essay.period || '';
    examContentHtml = `
      <div style="background: #ffffff; border: 2px solid #0f172a; border-radius: 6px; padding: 8px 10px; margin-bottom: 6px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px;">
          <strong style="font-size: 8.5pt; color: #0f172a;">${right.essay.title}</strong>
          <span style="font-size: 7pt; font-weight: 700; color: #ffffff; background: #0f172a; padding: 2px 6px; border-radius: 3px;">Timing: ~30 mins</span>
        </div>
        <div style="font-size: 8pt; font-weight: 800; color: #0f172a; line-height: 1.3; margin-bottom: 4px;">
          ${essayQuestionText}
        </div>

        <!-- Stimulus & Criteria Box -->
        <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; padding: 5px 8px; margin-bottom: 6px; display: grid; grid-template-columns: 1.5fr 1fr; gap: 8px; font-size: 6.6pt;">
          <div>
            <strong>You may use in your answer:</strong> &bull; ${essayStimulus}<br/>
            <span style="color: #dc2626; font-weight: 700;">⚠️ You MUST also use information of your own (${essaySpan}).</span>
          </div>
          <div style="border-left: 1px solid #cbd5e1; padding-left: 6px; color: #475569;">
            <strong>Essay Structure:</strong> Intro &rarr; Agree (PEEL) &rarr; Counter/Alternative (PEEL) &rarr; Third Factor &rarr; Sustained Criteria Judgement.
          </div>
        </div>

        ${renderLines(32)}
      </div>

      <!-- Essay Marking Rubric -->
      <div style="border-top: 1.5px solid #0f172a; padding-top: 4px; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 8px; font-size: 6.6pt; color: #334155; align-items: center;">
        <div>
          <strong>Level 4 (13–16m):</strong> Analytical throughout; 3 developed cross-era PEEL paragraphs; criteria-based sustained judgement.<br/>
          <strong>SPaG (1–4m):</strong> Accurate spelling of medical terms, precise punctuation, and formal academic register.
        </div>
        <div style="text-align: right;">
          <strong>Target Time:</strong> ~30 Mins
        </div>
        <div style="display: flex; justify-content: flex-end; gap: 4px;">
          <div style="border: 1px solid #0f172a; border-radius: 3px; padding: 2px 5px; text-align: center;">
            <span style="display: block; font-size: 5.5pt; text-transform: uppercase;">Essay Marks</span>
            <strong style="font-size: 7pt;">___ / 16</strong>
          </div>
          <div style="border: 1px solid #0f172a; border-radius: 3px; padding: 2px 5px; text-align: center;">
            <span style="display: block; font-size: 5.5pt; text-transform: uppercase;">SPaG Marks</span>
            <strong style="font-size: 7pt;">___ / 4</strong>
          </div>
          <div style="border: 1px solid #1e3a8a; background: #1e3a8a; color: #fff; border-radius: 3px; padding: 2px 6px; text-align: center;">
            <span style="display: block; font-size: 5.5pt; text-transform: uppercase;">Total</span>
            <strong style="font-size: 7pt;">___ / 20</strong>
          </div>
        </div>
      </div>
    `;
  } else if (examType === 'features_utility') {
    // Section A: Features + Q2(a) Utility with Side-by-Side Visual Source A + Written Source B
    let visualSourceHtml = '';
    if (right.q2a && right.q2a.visualSource) {
      const vs = right.q2a.visualSource;
      const vsDataUri = getImageDataUri(vs.image);
      visualSourceHtml = `
        <div style="display: grid; grid-template-columns: 1.1fr 1.2fr; gap: 8px; margin-bottom: 5px;">
          <!-- Visual Source A -->
          <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; padding: 5px; display: flex; flex-direction: column;">
            <strong style="font-size: 6.8pt; color: #1e3a8a; margin-bottom: 2px;">${vs.title}</strong>
            <div style="height: 85px; border-radius: 3px; overflow: hidden; border: 1px solid #94a3b8; background: #e2e8f0; margin-bottom: 3px;">
              <img src="${vsDataUri}" style="width: 100%; height: 100%; object-fit: cover;" alt="${vs.title}" />
            </div>
            <div style="font-size: 6.2pt; color: #475569; line-height: 1.25;"><em>${vs.caption}</em></div>
          </div>

          <!-- Written Source B -->
          <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; padding: 5px;">
            <strong style="font-size: 6.8pt; color: #1e3a8a; margin-bottom: 2px; display: block;">Source B (Written Contemporary Account):</strong>
            <div style="font-size: 6.5pt; color: #1e293b; font-style: italic; line-height: 1.3; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 3px; padding: 4px; margin-bottom: 3px;">
              ${right.q2a.sourceB || ''}
            </div>
          </div>
        </div>
      `;
    } else {
      visualSourceHtml = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 5px;">
          <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; padding: 5px; font-size: 6.5pt;">
            <strong style="color: #1e3a8a;">Source A:</strong> ${right.q2a.sourceA || ''}
          </div>
          <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; padding: 5px; font-size: 6.5pt;">
            <strong style="color: #1e3a8a;">Source B:</strong> ${right.q2a.sourceB || ''}
          </div>
        </div>
      `;
    }

    examContentHtml = `
      <!-- Q1(a) & Q1(b) Features -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 6px;">
        <div style="background: #f8fafc; border: 1.5px solid #1e3a8a; border-radius: 5px; padding: 6px 8px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-size: 7.8pt; color: #1e3a8a;">Question 1(a) [2 Marks]</strong>
            <span style="font-size: 6.6pt; font-weight: 700; color: #475569;">Feature 1</span>
          </div>
          <div style="font-size: 7.2pt; font-weight: 700; color: #0f172a; margin-bottom: 2px;">${right.q1a.question}</div>
          <div style="font-size: 6.3pt; color: #64748b; font-style: italic; margin-bottom: 3px;">1 mark feature + 1 mark supporting factual detail. ~2.5 mins.</div>
          ${renderLines(4)}
        </div>
        <div style="background: #f8fafc; border: 1.5px solid #1e3a8a; border-radius: 5px; padding: 6px 8px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-size: 7.8pt; color: #1e3a8a;">Question 1(b) [2 Marks]</strong>
            <span style="font-size: 6.6pt; font-weight: 700; color: #475569;">Feature 2</span>
          </div>
          <div style="font-size: 7.2pt; font-weight: 700; color: #0f172a; margin-bottom: 2px;">${right.q1b.question}</div>
          <div style="font-size: 6.3pt; color: #64748b; font-style: italic; margin-bottom: 3px;">1 mark feature + 1 mark supporting factual detail. ~2.5 mins.</div>
          ${renderLines(4)}
        </div>
      </div>

      <!-- Q2(a) Utility [8 Marks] -->
      <div style="background: #ffffff; border: 1.5px solid #1e3a8a; border-radius: 5px; padding: 6px 8px; margin-bottom: 6px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
          <strong style="font-size: 8pt; color: #1e3a8a;">${right.q2a.title}</strong>
          <span style="font-size: 6.8pt; font-weight: 700; color: #1e3a8a; background: #eff6ff; padding: 1px 5px; border-radius: 2px;">Timing: ~15 mins</span>
        </div>
        <div style="font-size: 7.4pt; font-weight: 800; color: #0f172a; margin-bottom: 4px;">${right.q2a.question}</div>

        ${visualSourceHtml}

        <!-- Provenance Clue Box -->
        <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 3px; padding: 3px 6px; margin-bottom: 4px;">
          <span style="font-size: 6.6pt; font-weight: 800; color: #92400e;">💡 ${right.q2a.provenanceClue || 'Provenance Hints: Consider Nature, Origin, and Motive for both sources and weigh utility for this specific enquiry.'}</span>
        </div>

        ${renderLines(22)}
      </div>

      <!-- Section A Rubric -->
      <div style="border-top: 1.5px solid #1e293b; padding-top: 4px; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 8px; font-size: 6.6pt; color: #334155; align-items: center;">
        <div>
          <strong>Level 3 (5–6m):</strong> Evaluates content + knowledge + provenance for both sources.<br/>
          <strong>Level 4 (7–8m):</strong> Reaches a sustained, criteria-based comparative conclusion on enquiry utility.
        </div>
        <div style="text-align: right;"><strong>Time Target:</strong> ~20 Mins</div>
        <div style="display: flex; justify-content: flex-end; gap: 4px;">
          <div style="border: 1px solid #0f172a; border-radius: 3px; padding: 2px 5px; text-align: center;">
            <span style="display: block; font-size: 5.5pt; text-transform: uppercase;">Q1 Features</span>
            <strong style="font-size: 7pt;">___ / 4</strong>
          </div>
          <div style="border: 1px solid #0f172a; border-radius: 3px; padding: 2px 5px; text-align: center;">
            <span style="display: block; font-size: 5.5pt; text-transform: uppercase;">Q2(a) Utility</span>
            <strong style="font-size: 7pt;">___ / 8</strong>
          </div>
          <div style="border: 1px solid #1e3a8a; background: #1e3a8a; color: #fff; border-radius: 3px; padding: 2px 6px; text-align: center;">
            <span style="display: block; font-size: 5.5pt; text-transform: uppercase;">Total</span>
            <strong style="font-size: 7pt;">___ / 12</strong>
          </div>
        </div>
      </div>
    `;
  } else if (examType === 'features_followup') {
    // Section A: Features + Q2(b) 4-Part Official Follow-Up Grid
    const sourceExcerptHtml = right.q2b.sourceExcerpt
      ? `
      <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; padding: 5px 8px; font-size: 6.5pt; color: #1e293b; font-style: italic; margin-bottom: 5px;">
        ${right.q2b.sourceExcerpt}
      </div>
    `
      : '';

    const tableRowsHtml = (
      right.q2b.tablePhrases || [
        { label: 'Detail in Source A that I would follow up:' },
        { label: 'Question I would ask:' },
        { label: 'What type of source I could use:' },
        { label: 'How this might help answer my question:' },
      ]
    )
      .map(
        (row) => `
      <tr>
        <td style="width: 240px; padding: 5px 8px; border: 1px solid #cbd5e1; background: #f8fafc; font-weight: 800; color: #0f172a; vertical-align: middle;">
          ${row.label}
        </td>
        <td style="padding: 5px 8px; border: 1px solid #cbd5e1; vertical-align: top;">
          <div style="height: 18px; border-bottom: 1px dotted #94a3b8;"></div>
          <div style="height: 18px; border-bottom: 1px dotted #94a3b8;"></div>
          <div style="height: 18px; border-bottom: 1px dotted #94a3b8;"></div>
        </td>
      </tr>
    `,
      )
      .join('');

    examContentHtml = `
      <!-- Q1(a) & Q1(b) Features -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 8px;">
        <div style="background: #f8fafc; border: 1.5px solid #1e3a8a; border-radius: 5px; padding: 6px 8px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-size: 7.8pt; color: #1e3a8a;">Question 1(a) [2 Marks]</strong>
            <span style="font-size: 6.6pt; font-weight: 700; color: #475569;">Feature 1</span>
          </div>
          <div style="font-size: 7.2pt; font-weight: 700; color: #0f172a; margin-bottom: 2px;">${right.q1a.question}</div>
          <div style="font-size: 6.3pt; color: #64748b; font-style: italic; margin-bottom: 3px;">1 mark feature + 1 mark supporting factual detail. ~2.5 mins.</div>
          ${renderLines(4)}
        </div>
        <div style="background: #f8fafc; border: 1.5px solid #1e3a8a; border-radius: 5px; padding: 6px 8px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-size: 7.8pt; color: #1e3a8a;">Question 1(b) [2 Marks]</strong>
            <span style="font-size: 6.6pt; font-weight: 700; color: #475569;">Feature 2</span>
          </div>
          <div style="font-size: 7.2pt; font-weight: 700; color: #0f172a; margin-bottom: 2px;">${right.q1b.question}</div>
          <div style="font-size: 6.3pt; color: #64748b; font-style: italic; margin-bottom: 3px;">1 mark feature + 1 mark supporting factual detail. ~2.5 mins.</div>
          ${renderLines(4)}
        </div>
      </div>

      <!-- Q2(b) Follow-Up Investigation Grid [4 Marks] -->
      <div style="background: #ffffff; border: 1.5px solid #1e3a8a; border-radius: 5px; padding: 8px 10px; margin-bottom: 6px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px;">
          <strong style="font-size: 8.2pt; color: #1e3a8a;">${right.q2b.title || 'Question 2(b) [4 Marks] &bull; Follow-Up Enquiry Grid'}</strong>
          <span style="font-size: 6.8pt; font-weight: 700; color: #1e3a8a; background: #eff6ff; padding: 1px 5px; border-radius: 2px;">Timing: ~5 mins</span>
        </div>
        <div style="font-size: 7.4pt; font-weight: 800; color: #0f172a; margin-bottom: 4px;">
          ${right.q2b.question || 'Study Source A. How could you follow up Source A to find out more about medical treatment on the Western Front?'}
        </div>
        ${sourceExcerptHtml}
        <div style="font-size: 6.4pt; color: #475569; margin-bottom: 6px;">
          Complete the official 4-part table below. Your question must link directly to the detail selected, and your source must be a specific contemporary historical record type.
        </div>

        <!-- Official 4-Part Edexcel Grid -->
        <table style="width: 100%; border-collapse: collapse; font-size: 6.8pt;">
          ${tableRowsHtml}
        </table>
        <div style="margin-top: 6px; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; padding: 5px 8px; font-size: 6.5pt; color: #334155; line-height: 1.35;">
          <strong style="color: #1e3a8a;">Examiner Advice for Question 2(b):</strong><br/>
          &bull; <strong>Question:</strong> Must link strictly to the detail quoted (e.g. &ldquo;What proportion of casualties suffered from...&rdquo;).<br/>
          &bull; <strong>Source Type:</strong> Must name a precise, specific contemporary record (e.g. <em>Medical Officer Unit War Diaries</em>, <em>Casualty Clearing Station Admissions Logs</em>, or <em>Army Form W3083 returns</em>). Generic answers score 0 marks!
        </div>
      </div>

      <!-- Section A Q2(b) Rubric -->
      <div style="border-top: 1.5px solid #1e293b; padding-top: 4px; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 8px; font-size: 6.6pt; color: #334155; align-items: center;">
        <div>
          <strong>Marking Rule:</strong> 1 mark per row. Question must be an analytical enquiry question; source type must be specific contemporary record (e.g. RAMC unit war diary, Casualty Clearing Station admission logs, medical officer personal journal).
        </div>
        <div style="text-align: right;"><strong>Time Target:</strong> ~10 Mins</div>
        <div style="display: flex; justify-content: flex-end; gap: 4px;">
          <div style="border: 1px solid #0f172a; border-radius: 3px; padding: 2px 5px; text-align: center;">
            <span style="display: block; font-size: 5.5pt; text-transform: uppercase;">Q1 Features</span>
            <strong style="font-size: 7pt;">___ / 4</strong>
          </div>
          <div style="border: 1px solid #0f172a; border-radius: 3px; padding: 2px 5px; text-align: center;">
            <span style="display: block; font-size: 5.5pt; text-transform: uppercase;">Q2(b) Grid</span>
            <strong style="font-size: 7pt;">___ / 4</strong>
          </div>
          <div style="border: 1px solid #1e3a8a; background: #1e3a8a; color: #fff; border-radius: 3px; padding: 2px 6px; text-align: center;">
            <span style="display: block; font-size: 5.5pt; text-transform: uppercase;">Total</span>
            <strong style="font-size: 7pt;">___ / 8</strong>
          </div>
        </div>
      </div>
    `;
  }

  return `
  <div class="page page-right" id="page-${pageNum}" data-spread="${spreadIndex}" data-page="${pageNum}" style="box-sizing: border-box; width: 794px; height: 1123px; padding: 22px 24px; font-family: 'Inter', sans-serif; background-color: #ffffff; display: flex; flex-direction: column; justify-content: space-between; overflow: hidden; scroll-margin-top: 65px; position: relative;">
    <div>
      <!-- Top Header -->
      <div style="border-bottom: 2px solid #1e293b; padding-bottom: 4px; margin-bottom: 8px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <span style="font-size: 8pt; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.5px;">
            Edexcel GCSE (9–1) History &bull; Paper 1 Assessment Practice
          </span>
          <span style="font-size: 7.5pt; font-weight: 700; color: #1e293b; background: #f1f5f9; padding: 2px 7px; border-radius: 3px; border: 1px solid #cbd5e1;">
            ${right.totalMarks ? right.totalMarks + ' Marks Total' : 'Exam Practice'}
          </span>
        </div>
        <h2 style="font-family: 'Playfair Display', Georgia, serif; font-size: 14pt; color: #0f172a; margin: 2px 0 1px 0; border: none; padding: 0; font-weight: 800;">
          ${right.title || 'Official Edexcel Exam Questions'}
        </h2>
      </div>

      ${examContentHtml}
    </div>

    <!-- Footer Signoff -->
    <div style="border-top: 1px solid #cbd5e1; padding-top: 4px; display: flex; justify-content: space-between; align-items: center; font-size: 6.8pt; color: #64748b;">
      <span>Meoncross History &bull; Edexcel GCSE (9–1) Paper 1 Exam Practice</span>
      <span>Page ${pageNum}</span>
    </div>
  </div>
  `;
}

// Render Front Cover Page (Page 1)
function renderCoverPage() {
  return `
  <div class="page page-cover" id="page-1" style="box-sizing: border-box; width: 794px; height: 1123px; padding: 24px 28px; font-family: 'Inter', sans-serif; background: #ffffff; color: #0f172a; display: flex; flex-direction: column; justify-content: space-between; overflow: hidden; position: relative; scroll-margin-top: 65px;">
    <div style="position: absolute; top: 12px; left: 12px; right: 12px; bottom: 12px; border: 2px solid #0f172a; border-radius: 8px; pointer-events: none;"></div>

    <div style="position: relative; z-index: 2; display: flex; flex-direction: column; flex: 1; justify-content: space-between;">
      <div>
        <!-- Top Bar -->
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #0f172a; padding-bottom: 5px; margin-bottom: 8px;">
          <span style="font-size: 8.8pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; letter-spacing: 0.8px;">
            Edexcel GCSE (9–1) History &bull; Paper 1 (1HI0/11)
          </span>
          <span style="font-size: 7.5pt; font-weight: 700; color: #475569; background: #f8fafc; border: 1px solid #cbd5e1; padding: 2px 7px; border-radius: 4px;">
            Thematic Study &amp; Historic Environment
          </span>
        </div>

        <!-- Header Row with Title on Left, Pupil Box on Right -->
        <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 8px; border-bottom: 1.5px solid #0f172a; padding-bottom: 8px;">
          <div>
            <h1 style="font-family: 'Playfair Display', Georgia, serif; font-size: 26pt; font-weight: 900; line-height: 1.05; margin: 0; color: #0f172a; letter-spacing: -0.5px;">
              Medicine in Britain
            </h1>
            <div style="font-family: 'Playfair Display', Georgia, serif; font-size: 13.5pt; font-style: italic; color: #475569; margin: 2px 0 3px 0;">
              c.1250–present &bull; Thematic Study
            </div>
            <div style="font-size: 8.8pt; font-weight: 700; color: #1e3a8a;">
              &amp; The British Sector of the Western Front, 1914–1918 (Historic Environment)
            </div>
          </div>
          <div style="border: 1.5px solid #0f172a; border-radius: 6px; padding: 9px 13px; background: #f8fafc; width: 315px; flex-shrink: 0;">
            <div style="font-size: 7.2pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 5px;">
              Candidate Information:
            </div>
            <div style="font-size: 8.5pt; font-weight: 700; color: #0f172a;">
              Pupil Name: <span style="display: inline-block; width: 210px; border-bottom: 1.5px solid #0f172a; margin-left: 4px;">&nbsp;</span>
            </div>
          </div>
        </div>

        <!-- Syllabus Overview Header Bar -->
        <div style="display: flex; justify-content: space-between; align-items: center; background: #0f172a; color: #ffffff; padding: 5px 12px; border-radius: 4px; margin-bottom: 8px;">
          <span style="font-size: 8.2pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px;">
            Official Pearson Edexcel Paper 1 Specification Content
          </span>
          <span style="font-size: 7.2pt; color: #cbd5e1;">
            Full Word-for-Word Syllabus Matrix &bull; Topics 1–4 &amp; Section A
          </span>
        </div>

        <!-- 2-Column Specification Grid -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 7.6pt; line-height: 1.34; color: #1e293b;">
          <!-- Left Column: Unit 1 & Unit 2 -->
          <div>
            <!-- Unit 1 -->
            <div style="border: 1.5px solid #1e3a8a; border-radius: 6px; padding: 9px 12px; margin-bottom: 8px; background: #ffffff;">
              <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1.5px solid #bfdbfe; padding-bottom: 3px; margin-bottom: 5px;">
                <strong style="color: #1e3a8a; font-size: 8.3pt; text-transform: uppercase; letter-spacing: 0.3px;">
                  Unit 1: c1250–c1500 &bull; Medieval England
                </strong>
                <span style="font-size: 6.8pt; font-weight: 800; color: #1e3a8a; background: #eff6ff; padding: 1px 5px; border-radius: 3px;">Section B</span>
              </div>
              <div style="margin-bottom: 5px;">
                <strong style="color: #0f172a; font-size: 7.8pt;">Ideas about the cause of disease and illness:</strong>
                <div style="padding-left: 8px; margin-top: 2px;">
                  &bull; Supernatural and religious explanations of the cause of disease.<br/>
                  &bull; Rational explanations: the Theory of the Four Humours and the miasma theory.<br/>
                  &bull; The continuing influence in England of Galen.
                </div>
              </div>
              <div style="margin-bottom: 5px;">
                <strong style="color: #0f172a; font-size: 7.8pt;">Approaches to prevention and treatment:</strong>
                <div style="padding-left: 8px; margin-top: 2px;">
                  &bull; Connection with ideas about disease: religious actions, bloodletting and purging, purifying the air.<br/>
                  &bull; Traditional approaches to treatment and care: the role of the physician, apothecary and barber surgeon; the role of hospitals, care within the community and at home, including the use of herbal remedies.
                </div>
              </div>
              <div>
                <strong style="color: #0f172a; font-size: 7.8pt;">Case Study:</strong>
                <div style="padding-left: 8px; margin-top: 2px;">
                  &bull; <strong>Dealing with the Black Death, 1348–49:</strong> approaches to treatment and attempts to prevent its spread.
                </div>
              </div>
            </div>

            <!-- Unit 2 -->
            <div style="border: 1.5px solid #1e3a8a; border-radius: 6px; padding: 9px 12px; background: #ffffff;">
              <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1.5px solid #bfdbfe; padding-bottom: 3px; margin-bottom: 5px;">
                <strong style="color: #1e3a8a; font-size: 8.3pt; text-transform: uppercase; letter-spacing: 0.3px;">
                  Unit 2: c1500–c1700 &bull; The Medical Renaissance
                </strong>
                <span style="font-size: 6.8pt; font-weight: 800; color: #1e3a8a; background: #eff6ff; padding: 1px 5px; border-radius: 3px;">Section B</span>
              </div>
              <div style="margin-bottom: 5px;">
                <strong style="color: #0f172a; font-size: 7.8pt;">Ideas about the cause of disease and illness:</strong>
                <div style="padding-left: 8px; margin-top: 2px;">
                  &bull; Continuity and change in explanations of the cause of disease and illness.<br/>
                  &bull; A scientific approach, including the work of Thomas Sydenham in improving diagnosis.<br/>
                  &bull; The influence of the printing press and the work of the Royal Society on the transmission of ideas.
                </div>
              </div>
              <div style="margin-bottom: 5px;">
                <strong style="color: #0f172a; font-size: 7.8pt;">Approaches to prevention and treatment:</strong>
                <div style="padding-left: 8px; margin-top: 2px;">
                  &bull; Continuity and change in approaches to prevention, treatment and care in the community and in hospitals.<br/>
                  &bull; Improvements in medical training and the influence in England of the work of Vesalius.
                </div>
              </div>
              <div>
                <strong style="color: #0f172a; font-size: 7.8pt;">Case Studies:</strong>
                <div style="padding-left: 8px; margin-top: 2px;">
                  &bull; <strong>Key individual:</strong> William Harvey and the discovery of the circulation of the blood.<br/>
                  &bull; <strong>Dealing with the Great Plague in London (1665):</strong> approaches to treatment and attempts to prevent its spread.
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column: Unit 3, Unit 4 & Section A -->
          <div>
            <!-- Unit 3 -->
            <div style="border: 1.5px solid #1e3a8a; border-radius: 6px; padding: 8px 11px; margin-bottom: 7px; background: #ffffff;">
              <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1.5px solid #bfdbfe; padding-bottom: 2px; margin-bottom: 4px;">
                <strong style="color: #1e3a8a; font-size: 8.2pt; text-transform: uppercase; letter-spacing: 0.3px;">
                  Unit 3: c1700–c1900 &bull; 18th- &amp; 19th-Century Britain
                </strong>
                <span style="font-size: 6.8pt; font-weight: 800; color: #1e3a8a; background: #eff6ff; padding: 1px 5px; border-radius: 3px;">Section B</span>
              </div>
              <div style="margin-bottom: 4px;">
                <strong style="color: #0f172a; font-size: 7.6pt;">Ideas about cause:</strong>
                <div style="padding-left: 8px; margin-top: 1px;">
                  &bull; Continuity and change in explanations of disease cause.<br/>
                  &bull; The influence of Pasteur's Germ Theory and Koch's work on microbes.
                </div>
              </div>
              <div style="margin-bottom: 4px;">
                <strong style="color: #0f172a; font-size: 7.6pt;">Care, treatment &amp; prevention:</strong>
                <div style="padding-left: 8px; margin-top: 1px;">
                  &bull; Extent of change in care and treatment in hospitals &amp; Florence Nightingale.<br/>
                  &bull; Improvements in surgery: anaesthetics (Simpson) and antiseptics (Lister).<br/>
                  &bull; Prevention: smallpox vaccination and the Public Health Act 1875.
                </div>
              </div>
              <div>
                <strong style="color: #0f172a; font-size: 7.6pt;">Case Studies:</strong>
                <div style="padding-left: 8px; margin-top: 1px;">
                  &bull; <strong>Key individual:</strong> Edward Jenner and the development of the smallpox vaccine.<br/>
                  &bull; <strong>Fighting Cholera in London (1854):</strong> Snow &amp; the Broad Street pump.
                </div>
              </div>
            </div>

            <!-- Unit 4 -->
            <div style="border: 1.5px solid #1e3a8a; border-radius: 6px; padding: 8px 11px; margin-bottom: 7px; background: #ffffff;">
              <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1.5px solid #bfdbfe; padding-bottom: 2px; margin-bottom: 4px;">
                <strong style="color: #1e3a8a; font-size: 8.2pt; text-transform: uppercase; letter-spacing: 0.3px;">
                  Unit 4: c1900–present &bull; Modern Britain
                </strong>
                <span style="font-size: 6.8pt; font-weight: 800; color: #1e3a8a; background: #eff6ff; padding: 1px 5px; border-radius: 3px;">Section B</span>
              </div>
              <div style="margin-bottom: 4px;">
                <strong style="color: #0f172a; font-size: 7.6pt;">Ideas about cause:</strong>
                <div style="padding-left: 8px; margin-top: 1px;">
                  &bull; Influence of genetic (DNA structure 1953) and lifestyle factors.<br/>
                  &bull; Improvements in diagnosis: blood tests, high-tech scans, monitors.
                </div>
              </div>
              <div style="margin-bottom: 4px;">
                <strong style="color: #0f172a; font-size: 7.6pt;">Care, treatment &amp; prevention:</strong>
                <div style="padding-left: 8px; margin-top: 1px;">
                  &bull; Magic bullets (Salvarsan/Prontosil), antibiotics, and high-tech surgery.<br/>
                  &bull; Impact of NHS (1948) on accessibility; mass vaccinations &amp; lifestyle campaigns.
                </div>
              </div>
              <div>
                <strong style="color: #0f172a; font-size: 7.6pt;">Case Studies:</strong>
                <div style="padding-left: 8px; margin-top: 1px;">
                  &bull; <strong>Key individuals:</strong> Fleming, Florey and Chain's development of penicillin.<br/>
                  &bull; <strong>Lung cancer in the 21st century:</strong> diagnosis, treatment, government prevention.
                </div>
              </div>
            </div>

            <!-- Section A: Western Front -->
            <div style="border: 1.5px solid #9d174d; background: #fdf2f8; border-radius: 6px; padding: 8px 11px;">
              <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1.5px solid #fbcfe8; padding-bottom: 2px; margin-bottom: 4px;">
                <strong style="color: #9d174d; font-size: 8.2pt; text-transform: uppercase; letter-spacing: 0.3px;">
                  Section A: British Sector of Western Front, 1914–18
                </strong>
                <span style="font-size: 6.8pt; font-weight: 800; color: #9d174d; background: #fce7f3; padding: 1px 5px; border-radius: 3px;">Historic Environment</span>
              </div>
              <div style="font-size: 7.3pt; line-height: 1.32; color: #1e293b;">
                <div style="margin-bottom: 2px;">
                  <strong>1. Context:</strong> Early 20th c. medicine (aseptic surgery, x-rays, transfusions/storage); Flanders &amp; northern France (Ypres, Somme, Arras, Cambrai); trench system, terrain &amp; transport problems.
                </div>
                <div style="margin-bottom: 2px;">
                  <strong>2. Conditions:</strong> Ill health (trench foot, trench fever, shell shock); shrapnel, bullet &amp; explosive wounds, gas gangrene; gas attacks (chlorine, phosgene, mustard).
                </div>
                <div style="margin-bottom: 2px;">
                  <strong>3. Evacuation:</strong> Chain of evacuation (RAP &rarr; ADS/MDS &rarr; CCS &rarr; Base Hospital); stretcher bearers, motor/horse ambulances, ambulance trains &amp; barges; Arras underground hospital; RAMC &amp; FANY.
                </div>
                <div>
                  <strong>4. Advances:</strong> Wound debridement, Carrel-Dakin, amputation; Thomas splint; mobile x-rays; Cambrai blood depot; brain &amp; plastic surgery (Cushing, Gillies).
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Signoff -->
      <div style="position: relative; z-index: 2; border-top: 1px solid #cbd5e1; padding-top: 6px; display: flex; justify-content: space-between; align-items: center; font-size: 7.4pt; color: #64748b;">
        <span>Meoncross History &bull; GCSE Masterclass Series</span>
        <span>Designed strictly to Pearson Edexcel Specification 1HI0/11 &bull; 40 Pages Master Volume</span>
      </div>
    </div>
  </div>
  `;
}
// Render Inside Front Cover (Page 2)
function renderInsideCover() {
  return `
  <div class="page page-inside-front" id="page-2" style="box-sizing: border-box; width: 794px; height: 1123px; padding: 28px 30px; font-family: 'Inter', sans-serif; background: #ffffff; color: #0f172a; display: flex; flex-direction: column; justify-content: space-between; overflow: hidden; position: relative; scroll-margin-top: 65px;">
    <div style="position: absolute; top: 14px; left: 14px; right: 14px; bottom: 14px; border: 1.5px solid #0f172a; border-radius: 6px; pointer-events: none;"></div>

    <div style="position: relative; z-index: 2;">
      <div style="border-bottom: 2px solid #0f172a; padding-bottom: 6px; margin-bottom: 12px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <span style="font-size: 8.5pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; letter-spacing: 1px;">
            Edexcel GCSE (9–1) History &bull; Paper 1 Specification &amp; Exam Technique
          </span>
          <span style="font-size: 7.5pt; font-weight: 700; color: #475569; background: #f8fafc; border: 1px solid #cbd5e1; padding: 2px 6px; border-radius: 3px;">
            Paper Code: 1HI0/11
          </span>
        </div>
        <h2 style="font-family: 'Playfair Display', Georgia, serif; font-size: 16pt; margin: 3px 0 0 0; color: #0f172a; font-weight: 800;">
          How Paper 1 is Structured, Timed &amp; Assessed
        </h2>
        <p style="font-size: 8pt; color: #475569; margin: 2px 0 0 0;">
          Total Exam Duration: <strong>1 Hour 20 Minutes (80 Minutes)</strong> &bull; Total Paper Marks: <strong>52 Raw Marks</strong> (including 4 marks for SPaG)
        </p>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px;">
        <!-- Section A -->
        <div style="border: 1.5px solid #1e3a8a; border-radius: 5px; padding: 10px; background: #f8fafc;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #1e3a8a; padding-bottom: 4px; margin-bottom: 6px;">
            <strong style="font-size: 9pt; color: #1e3a8a;">SECTION A: HISTORIC ENVIRONMENT</strong>
            <span style="font-size: 7pt; font-weight: 800; background: #1e3a8a; color: #fff; padding: 2px 5px; border-radius: 3px;">16 Marks &bull; 25 mins</span>
          </div>
          <div style="font-size: 7.2pt; color: #334155; line-height: 1.35; margin-bottom: 6px;">
            Focuses on <em>The British Sector of the Western Front, 1914–1918: injuries, treatment and the trenches</em>. Answer all 3 questions.
          </div>
          <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 3px; padding: 5px; margin-bottom: 5px;">
            <strong style="font-size: 7.5pt; color: #0f172a;">Q1(a) &amp; Q1(b): Feature Questions [2m + 2m = 4 Marks]</strong>
            <div style="font-size: 6.8pt; color: #475569; margin-top: 1px;">
              Describe one feature of... (1 mark for valid feature, 1 mark for supporting factual detail). Spend ~5 mins total.
            </div>
          </div>
          <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 3px; padding: 5px; margin-bottom: 5px;">
            <strong style="font-size: 7.5pt; color: #0f172a;">Q2(a): Source Utility Enquiry [8 Marks]</strong>
            <div style="font-size: 6.8pt; color: #475569; margin-top: 1px;">
              How useful are Sources A and B for an enquiry into... Evaluates Content, Contextual Knowledge, and Provenance (Nature, Origin, Purpose). Spend ~15 mins.
            </div>
          </div>
          <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 3px; padding: 5px;">
            <strong style="font-size: 7.5pt; color: #0f172a;">Q2(b): Follow-Up Investigation Grid [4 Marks]</strong>
            <div style="font-size: 6.8pt; color: #475569; margin-top: 1px;">
              Complete the official 4-part enquiry grid: Detail in Source, Question to ask, Specific Contemporary Source Type, and How it helps. Spend ~5 mins.
            </div>
          </div>
        </div>

        <!-- Section B -->
        <div style="border: 1.5px solid #0f172a; border-radius: 5px; padding: 10px; background: #f8fafc;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #0f172a; padding-bottom: 4px; margin-bottom: 6px;">
            <strong style="font-size: 9pt; color: #0f172a;">SECTION B: THEMATIC DEPTH STUDY</strong>
            <span style="font-size: 7pt; font-weight: 800; background: #0f172a; color: #fff; padding: 2px 5px; border-radius: 3px;">36 Marks &bull; 55 mins</span>
          </div>
          <div style="font-size: 7.2pt; color: #334155; line-height: 1.35; margin-bottom: 6px;">
            Focuses on <em>Medicine in Britain, c.1250–present</em> across Medieval, Renaissance, Industrial, and Modern eras. Answer 3 questions.
          </div>
          <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 3px; padding: 5px; margin-bottom: 5px;">
            <strong style="font-size: 7.5pt; color: #0f172a;">Q3: Similarity OR Difference [4 Marks]</strong>
            <div style="font-size: 6.8pt; color: #475569; margin-top: 1px;">
              Explain one similarity / difference between [Period 1] and [Period 2]. Requires 1 developed comparative PEEL paragraph. Spend ~5 mins.
            </div>
          </div>
          <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 3px; padding: 5px; margin-bottom: 5px;">
            <strong style="font-size: 7.5pt; color: #0f172a;">Q4: Multi-Causal Explanation [12 Marks]</strong>
            <div style="font-size: 6.8pt; color: #475569; margin-top: 1px;">
              Explain why... Requires 3 fully developed PEEL paragraphs. Must address the two stimulus points plus one factor of own knowledge. Spend ~20 mins.
            </div>
          </div>
          <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 3px; padding: 5px;">
            <strong style="font-size: 7.5pt; color: #0f172a;">Q5 / Q6: Judgement Statement Essay [16 + 4 SPaG = 20 Marks]</strong>
            <div style="font-size: 6.8pt; color: #475569; margin-top: 1px;">
              Choice between Q5 or Q6. A broad thematic essay spanning 150–300+ years. Must evaluate both sides and reach a sustained judgement. Spend ~30 mins.
            </div>
          </div>
        </div>
      </div>

      <div style="border: 1px solid #cbd5e1; border-radius: 5px; padding: 8px 10px; background: #ffffff; margin-bottom: 12px;">
        <div style="font-size: 7.8pt; font-weight: 800; color: #0f172a; text-transform: uppercase; margin-bottom: 5px;">
          The Four Assessment Objectives (AOs) You Are Graded On:
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 8px; font-size: 6.8pt;">
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 3px; padding: 5px;">
            <strong style="color: #1e3a8a; display: block; margin-bottom: 2px;">AO1: Knowledge (11m / 21%)</strong>
            Recall specific historical facts, dates, names, key terms, and chronological developments accurately.
          </div>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 3px; padding: 5px;">
            <strong style="color: #1e3a8a; display: block; margin-bottom: 2px;">AO2: Concepts (25m / 48%)</strong>
            Explain causation, consequence, continuity, change, similarity, and significance using structured analytical PEEL chains.
          </div>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 3px; padding: 5px;">
            <strong style="color: #1e3a8a; display: block; margin-bottom: 2px;">AO3: Sources (12m / 23%)</strong>
            Analyse and evaluate primary sources for utility, weighing content accuracy against provenance (Nature, Origin, Motive).
          </div>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 3px; padding: 5px;">
            <strong style="color: #1e3a8a; display: block; margin-bottom: 2px;">AO4: SPaG &amp; Enquiry (4m / 8%)</strong>
            Spell specialist medical terms correctly, use precise grammar, and formulate valid historical enquiry questions in Q2(b).
          </div>
        </div>
      </div>

      <div style="border: 1.5px solid #0f172a; border-radius: 5px; padding: 10px 12px; background: #fdfdfd;">
        <div style="font-size: 8.5pt; font-weight: 800; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px; border-bottom: 1px solid #cbd5e1; padding-bottom: 3px; display: flex; justify-content: space-between;">
          <span>🏆 Examiner Golden Rules: Secrets to High-Mark Responses</span>
          <span style="color: #1e3a8a; font-weight: 700;">Edexcel Paper 1 Strategy</span>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 6.9pt; line-height: 1.35; color: #1e293b;">
          <div>
            <div style="margin-bottom: 5px;">
              <strong style="color: #1e3a8a;">1. Strict Time Management (~1.5 mins per mark):</strong><br/>
              Spend strictly 25 minutes on Section A and 55 minutes on Section B. Never steal time from Section B. If you run out of time on Q5/Q6, you forfeit up to 20 marks!
            </div>
            <div style="margin-bottom: 5px;">
              <strong style="color: #1e3a8a;">2. The "Rule of Three" for Essays:</strong><br/>
              Both Q4 (12m) and Q5/Q6 (16m) require THREE distinct, fully developed PEEL paragraphs. An essay with only two paragraphs cannot score Level 4, regardless of quality.
            </div>
            <div>
              <strong style="color: #1e3a8a;">3. The Stimulus Material Rule:</strong><br/>
              In Q4 and Q5/Q6, you MUST include your own knowledge beyond the two stimulus bullet points. Relying solely on the stimulus points automatically caps your score at Level 2 (max 6/12 or 8/16).
            </div>
          </div>
          <div>
            <div style="margin-bottom: 5px;">
              <strong style="color: #1e3a8a;">4. No Generic Source Evaluations in Q2(a):</strong><br/>
              Never write "Source A is biased because it was written by the government." Instead, evaluate <em>how</em> the author's role, date, or purpose makes the specific detail useful or limited for that specific enquiry.
            </div>
            <div style="margin-bottom: 5px;">
              <strong style="color: #1e3a8a;">5. Sustained Criteria Judgement in 16m Essays:</strong><br/>
              In Q5/Q6, your conclusion must not simply summarize your paragraphs. Provide a decisive, criteria-driven judgement (e.g. comparing immediate short-term impact vs permanent long-term change).
            </div>
            <div>
              <strong style="color: #1e3a8a;">6. Rotated Q3 Precision:</strong><br/>
              For Similarity, pinpoint the identical underlying mechanism or belief across both eras; for Difference, ensure you highlight the direct contrast rather than describing two unrelated facts.
            </div>
          </div>
        </div>
      </div>
    </div>

    <div style="position: relative; z-index: 2; border-top: 1px solid #cbd5e1; padding-top: 6px; display: flex; justify-content: space-between; align-items: center; font-size: 7.2pt; color: #64748b;">
      <span>Edexcel GCSE (9–1) History &bull; Paper 1 (1HI0/11)</span>
      <span>Page 2 &bull; Specification &amp; Assessment Structure</span>
    </div>
  </div>
  `;
}

// Render Page 3: Pupil Revision Audit & RAG Tracker
function renderContentsMatrix() {
  return `
  <div class="page page-contents" id="page-3" style="box-sizing: border-box; width: 794px; height: 1123px; padding: 24px 26px; font-family: 'Inter', sans-serif; background: #ffffff; color: #0f172a; display: flex; flex-direction: column; justify-content: space-between; overflow: hidden; position: relative; scroll-margin-top: 65px;">
    <div style="position: absolute; top: 12px; left: 12px; right: 12px; bottom: 12px; border: 1.5px solid #0f172a; border-radius: 6px; pointer-events: none;"></div>

    <div style="position: relative; z-index: 2;">
      <div style="border-bottom: 2px solid #0f172a; padding-bottom: 5px; margin-bottom: 8px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <span style="font-size: 8pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; letter-spacing: 1px;">
            Edexcel GCSE History Paper 1 &bull; Personalised Progress Tracker
          </span>
          <span style="font-size: 7.2pt; font-weight: 700; color: #475569; background: #f8fafc; border: 1px solid #cbd5e1; padding: 2px 6px; border-radius: 3px;">
            18 Spreads &bull; 40 Pages
          </span>
        </div>
        <h2 style="font-family: 'Playfair Display', Georgia, serif; font-size: 15pt; margin: 2px 0 0 0; color: #0f172a; font-weight: 800;">
          Paper 1 Revision Audit &amp; Exam Mastery Tracker
        </h2>
        <p style="font-size: 7.6pt; color: #475569; margin: 1px 0 0 0;">
          Self-assess your confidence across all 18 Key Topics (🔴 Red / 🟡 Amber / 🟢 Green) and log your completed exam practice.
        </p>
      </div>

      <table style="width: 100%; border-collapse: collapse; font-size: 6.7pt; line-height: 1.25;">
        <thead>
          <tr style="background: #0f172a; color: #ffffff; text-align: left;">
            <th style="padding: 4px 6px; border: 1px solid #0f172a; width: 48px;">Spread</th>
            <th style="padding: 4px 6px; border: 1px solid #0f172a; width: 44px;">Lesson</th>
            <th style="padding: 4px 6px; border: 1px solid #0f172a;">Topic Focus &amp; Core Content</th>
            <th style="padding: 4px 6px; border: 1px solid #0f172a; width: 140px;">Exam Practice Target</th>
            <th style="padding: 4px 6px; border: 1px solid #0f172a; width: 40px; text-align: center;">Tariff</th>
            <th style="padding: 4px 6px; border: 1px solid #0f172a; width: 90px; text-align: center;">Revision RAG</th>
            <th style="padding: 4px 6px; border: 1px solid #0f172a; width: 120px; text-align: center;">Exam Completed</th>
          </tr>
        </thead>
        <tbody>
          <!-- Topic 1 -->
          <tr style="background: #f8fafc;"><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1; font-weight: 700;">1 (pp.4-5)</td><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1; font-weight: 700; color: #1e3a8a;">KT 1.1</td><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1;">Medieval Beliefs on Cause: Church, 4 Humours, Miasma, Astrology</td><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1;">Q3 Similarity + Q4 Explain Why</td><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1; text-align: center; font-weight: 700;">16m</td><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1; text-align: center;">[ ] 🔴 [ ] 🟡 [ ] 🟢</td><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1; font-size: 6pt;">Date: ____ Mark: __/16</td></tr>
          <tr style="background: #f8fafc;"><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1; font-weight: 700;">2 (pp.6-7)</td><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1; font-weight: 700; color: #1e3a8a;">KT 1.2</td><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1;">Medieval Treatments &amp; Care: Bleeding, Purging, Apothecaries, Hospitals</td><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1;">Q3 Difference + Q4 Explain Why</td><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1; text-align: center; font-weight: 700;">16m</td><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1; text-align: center;">[ ] 🔴 [ ] 🟡 [ ] 🟢</td><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1; font-size: 6pt;">Date: ____ Mark: __/16</td></tr>
          <tr style="background: #eff6ff;"><td style="padding: 2.5px 5px; border: 1px solid #bfdbfe; font-weight: 800; color: #1e3a8a;">3 (pp.8-9)</td><td style="padding: 2.5px 5px; border: 1px solid #bfdbfe; font-weight: 800; color: #1e3a8a;">KT 1.3</td><td style="padding: 2.5px 5px; border: 1px solid #bfdbfe; font-weight: 700;">The Black Death (1348) &bull; Cross-Era Comparative Evidence Bank</td><td style="padding: 2.5px 5px; border: 1px solid #bfdbfe; font-weight: 800; color: #1e3a8a;">★ 16m Judgement Essay (c.1348–c.1665)</td><td style="padding: 2.5px 5px; border: 1px solid #bfdbfe; text-align: center; font-weight: 800; color: #1e3a8a;">20m</td><td style="padding: 2.5px 5px; border: 1px solid #bfdbfe; text-align: center;">[ ] 🔴 [ ] 🟡 [ ] 🟢</td><td style="padding: 2.5px 5px; border: 1px solid #bfdbfe; font-size: 6pt;">Date: ____ Mark: __/20</td></tr>

          <!-- Topic 2 -->
          <tr style="background: #f8fafc;"><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1; font-weight: 700;">4 (pp.10-11)</td><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1; font-weight: 700; color: #1e3a8a;">KT 2.1</td><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1;">Renaissance Scientific Shift: Royal Society, Sydenham, Printing Press</td><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1;">Q3 Similarity + Q4 Explain Why</td><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1; text-align: center; font-weight: 700;">16m</td><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1; text-align: center;">[ ] 🔴 [ ] 🟡 [ ] 🟢</td><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1; font-size: 6pt;">Date: ____ Mark: __/16</td></tr>
          <tr style="background: #f8fafc;"><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1; font-weight: 700;">5 (pp.12-13)</td><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1; font-weight: 700; color: #1e3a8a;">KT 2.2</td><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1;">Renaissance Treatments &amp; Vesalius: 1543 Fabrica &amp; 300+ Galen Errors</td><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1;">Q3 Difference + Q4 Explain Why</td><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1; text-align: center; font-weight: 700;">16m</td><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1; text-align: center;">[ ] 🔴 [ ] 🟡 [ ] 🟢</td><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1; font-size: 6pt;">Date: ____ Mark: __/16</td></tr>
          <tr style="background: #eff6ff;"><td style="padding: 2.5px 5px; border: 1px solid #bfdbfe; font-weight: 800; color: #1e3a8a;">6 (pp.14-15)</td><td style="padding: 2.5px 5px; border: 1px solid #bfdbfe; font-weight: 800; color: #1e3a8a;">KT 2.3</td><td style="padding: 2.5px 5px; border: 1px solid #bfdbfe; font-weight: 700;">William Harvey (1628) &amp; Great Plague 1665 &bull; Synoptic Evidence Bank</td><td style="padding: 2.5px 5px; border: 1px solid #bfdbfe; font-weight: 800; color: #1e3a8a;">★ 16m Judgement Essay (c.1500–c.1800)</td><td style="padding: 2.5px 5px; border: 1px solid #bfdbfe; text-align: center; font-weight: 800; color: #1e3a8a;">20m</td><td style="padding: 2.5px 5px; border: 1px solid #bfdbfe; text-align: center;">[ ] 🔴 [ ] 🟡 [ ] 🟢</td><td style="padding: 2.5px 5px; border: 1px solid #bfdbfe; font-size: 6pt;">Date: ____ Mark: __/20</td></tr>

          <!-- Topic 3 -->
          <tr style="background: #f8fafc;"><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1; font-weight: 700;">7 (pp.16-17)</td><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1; font-weight: 700; color: #1e3a8a;">KT 3.1</td><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1;">Germ Theory: Pasteur 1861, Koch Bacteriology, Defeating Spontaneous Gen</td><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1;">Q3 Difference + Q4 Explain Why</td><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1; text-align: center; font-weight: 700;">16m</td><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1; text-align: center;">[ ] 🔴 [ ] 🟡 [ ] 🟢</td><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1; font-size: 6pt;">Date: ____ Mark: __/16</td></tr>
          <tr style="background: #f8fafc;"><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1; font-weight: 700;">8 (pp.18-19)</td><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1; font-weight: 700; color: #1e3a8a;">KT 3.2</td><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1;">Surgery &amp; Hospitals: Simpson Chloroform, Lister Carbolic, Nightingale</td><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1;">Q3 Similarity + Q4 Explain Why</td><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1; text-align: center; font-weight: 700;">16m</td><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1; text-align: center;">[ ] 🔴 [ ] 🟡 [ ] 🟢</td><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1; font-size: 6pt;">Date: ____ Mark: __/16</td></tr>
          <tr style="background: #eff6ff;"><td style="padding: 2.5px 5px; border: 1px solid #bfdbfe; font-weight: 800; color: #1e3a8a;">9 (pp.20-21)</td><td style="padding: 2.5px 5px; border: 1px solid #bfdbfe; font-weight: 800; color: #1e3a8a;">KT 3.3</td><td style="padding: 2.5px 5px; border: 1px solid #bfdbfe; font-weight: 700;">Prevention: Jenner Smallpox 1796 &amp; Snow Cholera 1854 &bull; Evidence Bank</td><td style="padding: 2.5px 5px; border: 1px solid #bfdbfe; font-weight: 800; color: #1e3a8a;">★ 16m Judgement Essay (c.1750–present)</td><td style="padding: 2.5px 5px; border: 1px solid #bfdbfe; text-align: center; font-weight: 800; color: #1e3a8a;">20m</td><td style="padding: 2.5px 5px; border: 1px solid #bfdbfe; text-align: center;">[ ] 🔴 [ ] 🟡 [ ] 🟢</td><td style="padding: 2.5px 5px; border: 1px solid #bfdbfe; font-size: 6pt;">Date: ____ Mark: __/20</td></tr>

          <!-- Topic 4 -->
          <tr style="background: #f8fafc;"><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1; font-weight: 700;">10 (pp.22-23)</td><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1; font-weight: 700; color: #1e3a8a;">KT 4.1</td><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1;">Modern Ideas: DNA Structure 1953, Human Genome, High-Tech Scanners</td><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1;">Q3 Difference + Q4 Explain Why</td><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1; text-align: center; font-weight: 700;">16m</td><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1; text-align: center;">[ ] 🔴 [ ] 🟡 [ ] 🟢</td><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1; font-size: 6pt;">Date: ____ Mark: __/16</td></tr>
          <tr style="background: #f8fafc;"><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1; font-weight: 700;">11 (pp.24-25)</td><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1; font-weight: 700; color: #1e3a8a;">KT 4.2</td><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1;">Modern Treatments: Magic Bullets (Salvarsan/Prontosil) &amp; 1948 NHS</td><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1;">Q3 Similarity + Q4 Explain Why</td><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1; text-align: center; font-weight: 700;">16m</td><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1; text-align: center;">[ ] 🔴 [ ] 🟡 [ ] 🟢</td><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1; font-size: 6pt;">Date: ____ Mark: __/16</td></tr>
          <tr style="background: #f8fafc;"><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1; font-weight: 700;">12 (pp.26-27)</td><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1; font-weight: 700; color: #1e3a8a;">KT 4.3</td><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1;">Penicillin: Fleming 1928, Florey &amp; Chain, US WWII Mass Production</td><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1;">Q3 Difference + Q4 Explain Why</td><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1; text-align: center; font-weight: 700;">16m</td><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1; text-align: center;">[ ] 🔴 [ ] 🟡 [ ] 🟢</td><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1; font-size: 6pt;">Date: ____ Mark: __/16</td></tr>
          <tr style="background: #eff6ff;"><td style="padding: 2.5px 5px; border: 1px solid #bfdbfe; font-weight: 800; color: #1e3a8a;">13 (pp.28-29)</td><td style="padding: 2.5px 5px; border: 1px solid #bfdbfe; font-weight: 800; color: #1e3a8a;">KT 4.4</td><td style="padding: 2.5px 5px; border: 1px solid #bfdbfe; font-weight: 700;">Lung Cancer: Doll &amp; Hill, High-Tech Care, Anti-Smoking Legislation</td><td style="padding: 2.5px 5px; border: 1px solid #bfdbfe; font-weight: 800; color: #1e3a8a;">★ 16m Judgement Essay (c.1850–present)</td><td style="padding: 2.5px 5px; border: 1px solid #bfdbfe; text-align: center; font-weight: 800; color: #1e3a8a;">20m</td><td style="padding: 2.5px 5px; border: 1px solid #bfdbfe; text-align: center;">[ ] 🔴 [ ] 🟡 [ ] 🟢</td><td style="padding: 2.5px 5px; border: 1px solid #bfdbfe; font-size: 6pt;">Date: ____ Mark: __/20</td></tr>

          <!-- Section A -->
          <tr style="background: #fdf2f8;"><td style="padding: 2.5px 5px; border: 1px solid #fbcfe8; font-weight: 700; color: #9d174d;">14 (pp.30-31)</td><td style="padding: 2.5px 5px; border: 1px solid #fbcfe8; font-weight: 700; color: #9d174d;">KT 5.1</td><td style="padding: 2.5px 5px; border: 1px solid #fbcfe8;">Western Front Terrain: Ypres Mud, Somme, Arras Caves, Motor Ambulances</td><td style="padding: 2.5px 5px; border: 1px solid #fbcfe8;">Q1(a) &amp; Q1(b) Features + Q2(a) Utility</td><td style="padding: 2.5px 5px; border: 1px solid #fbcfe8; text-align: center; font-weight: 700;">12m</td><td style="padding: 2.5px 5px; border: 1px solid #fbcfe8; text-align: center;">[ ] 🔴 [ ] 🟡 [ ] 🟢</td><td style="padding: 2.5px 5px; border: 1px solid #fbcfe8; font-size: 6pt;">Date: ____ Mark: __/12</td></tr>
          <tr style="background: #fdf2f8;"><td style="padding: 2.5px 5px; border: 1px solid #fbcfe8; font-weight: 700; color: #9d174d;">15 (pp.32-33)</td><td style="padding: 2.5px 5px; border: 1px solid #fbcfe8; font-weight: 700; color: #9d174d;">KT 5.2</td><td style="padding: 2.5px 5px; border: 1px solid #fbcfe8;">Trench System Layout: Frontline, Support, Reserve, Dugouts, Duckboards</td><td style="padding: 2.5px 5px; border: 1px solid #fbcfe8;">Q1(a) &amp; Q1(b) Features + Q2(b) Follow-Up</td><td style="padding: 2.5px 5px; border: 1px solid #fbcfe8; text-align: center; font-weight: 700;">8m</td><td style="padding: 2.5px 5px; border: 1px solid #fbcfe8; text-align: center;">[ ] 🔴 [ ] 🟡 [ ] 🟢</td><td style="padding: 2.5px 5px; border: 1px solid #fbcfe8; font-size: 6pt;">Date: ____ Mark: __/8</td></tr>
          <tr style="background: #fdf2f8;"><td style="padding: 2.5px 5px; border: 1px solid #fbcfe8; font-weight: 700; color: #9d174d;">16 (pp.34-35)</td><td style="padding: 2.5px 5px; border: 1px solid #fbcfe8; font-weight: 700; color: #9d174d;">KT 5.3</td><td style="padding: 2.5px 5px; border: 1px solid #fbcfe8;">Conditions &amp; Wounds: Trench Foot, Shell Shock, Shrapnel, Poison Gas</td><td style="padding: 2.5px 5px; border: 1px solid #fbcfe8;">Q1(a) &amp; Q1(b) Features + Q2(a) Utility</td><td style="padding: 2.5px 5px; border: 1px solid #fbcfe8; text-align: center; font-weight: 700;">12m</td><td style="padding: 2.5px 5px; border: 1px solid #fbcfe8; text-align: center;">[ ] 🔴 [ ] 🟡 [ ] 🟢</td><td style="padding: 2.5px 5px; border: 1px solid #fbcfe8; font-size: 6pt;">Date: ____ Mark: __/12</td></tr>
          <tr style="background: #fdf2f8;"><td style="padding: 2.5px 5px; border: 1px solid #fbcfe8; font-weight: 700; color: #9d174d;">17 (pp.36-37)</td><td style="padding: 2.5px 5px; border: 1px solid #fbcfe8; font-weight: 700; color: #9d174d;">KT 5.4</td><td style="padding: 2.5px 5px; border: 1px solid #fbcfe8;">Chain of Evacuation: Stretcher Bearers &rarr; RAP &rarr; ADS/MDS &rarr; CCS &rarr; Base</td><td style="padding: 2.5px 5px; border: 1px solid #fbcfe8;">Q1(a) &amp; Q1(b) Features + Q2(b) Follow-Up</td><td style="padding: 2.5px 5px; border: 1px solid #fbcfe8; text-align: center; font-weight: 700;">8m</td><td style="padding: 2.5px 5px; border: 1px solid #fbcfe8; text-align: center;">[ ] 🔴 [ ] 🟡 [ ] 🟢</td><td style="padding: 2.5px 5px; border: 1px solid #fbcfe8; font-size: 6pt;">Date: ____ Mark: __/8</td></tr>
          <tr style="background: #fdf2f8;"><td style="padding: 2.5px 5px; border: 1px solid #fbcfe8; font-weight: 700; color: #9d174d;">18 (pp.38-39)</td><td style="padding: 2.5px 5px; border: 1px solid #fbcfe8; font-weight: 700; color: #9d174d;">KT 5.5</td><td style="padding: 2.5px 5px; border: 1px solid #fbcfe8;">Medical Advances: Thomas Splint (80% &rarr; 20%), Blood Depots, Plastic Surgery</td><td style="padding: 2.5px 5px; border: 1px solid #fbcfe8;">Q1(a) &amp; Q1(b) Features + Q2(a) Utility</td><td style="padding: 2.5px 5px; border: 1px solid #fbcfe8; text-align: center; font-weight: 700;">12m</td><td style="padding: 2.5px 5px; border: 1px solid #fbcfe8; text-align: center;">[ ] 🔴 [ ] 🟡 [ ] 🟢</td><td style="padding: 2.5px 5px; border: 1px solid #fbcfe8; font-size: 6pt;">Date: ____ Mark: __/12</td></tr>
        </tbody>
      </table>

      <div style="margin-top: 10px; background: #f8fafc; border: 1.5px solid #0f172a; border-radius: 4px; padding: 8px 12px; font-size: 7pt; color: #1e293b;">
        <div style="font-weight: 800; color: #0f172a; text-transform: uppercase; margin-bottom: 4px;">
          🎯 Essential Revision Milestones:
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px;">
          <div><strong>🥉 Bronze Milestone:</strong> All 18 core knowledge left pages revised; RAG checkboxes audited.</div>
          <div><strong>🥈 Silver Milestone:</strong> All 18 exam practice pages completed in full with timed conditions.</div>
          <div><strong>🥇 Gold Milestone:</strong> All 4 capstone 16-mark essays completed and assessed at full examination standard.</div>
        </div>
      </div>
    </div>

    <div style="position: relative; z-index: 2; border-top: 1px solid #cbd5e1; padding-top: 6px; display: flex; justify-content: space-between; align-items: center; font-size: 7.2pt; color: #64748b;">
      <span>Edexcel GCSE (9–1) History &bull; Paper 1 (1HI0/11)</span>
      <span>Page 3 &bull; Personalised Progress &amp; Exam Tracker</span>
    </div>
  </div>
  `;
}

// Render Back Cover (Page 40)
function renderBackCover() {
  return `
  <div class="page page-back-cover" id="page-40" style="box-sizing: border-box; width: 794px; height: 1123px; padding: 28px 30px; font-family: 'Inter', sans-serif; background: #ffffff; color: #0f172a; display: flex; flex-direction: column; justify-content: space-between; overflow: hidden; position: relative; scroll-margin-top: 65px;">
    <div style="position: absolute; top: 14px; left: 14px; right: 14px; bottom: 14px; border: 1.5px solid #0f172a; border-radius: 6px; pointer-events: none;"></div>

    <div style="position: relative; z-index: 2;">
      <div style="border-bottom: 2px solid #0f172a; padding-bottom: 6px; margin-bottom: 10px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <span style="font-size: 8.5pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; letter-spacing: 1px;">
            Edexcel GCSE History &bull; Paper 1 Complete Exam Technique Guide
          </span>
          <span style="font-size: 7.5pt; font-weight: 700; color: #475569; background: #f8fafc; border: 1px solid #cbd5e1; padding: 2px 6px; border-radius: 3px;">
            Masterclass Playbook
          </span>
        </div>
        <h2 style="font-family: 'Playfair Display', Georgia, serif; font-size: 16pt; margin: 3px 0 0 0; color: #0f172a; font-weight: 800;">
          How to Answer Every Question Type on Paper 1
        </h2>
        <p style="font-size: 7.8pt; color: #475569; margin: 2px 0 0 0;">
          Step-by-step paragraph formulas, examiner trigger phrases, and timing rules for all six questions.
        </p>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 12px;">
        <!-- Q1(a) & Q1(b) Features -->
        <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; padding: 8px 10px;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #cbd5e1; padding-bottom: 3px; margin-bottom: 4px;">
            <strong style="font-size: 8pt; color: #1e3a8a;">Q1(a) &amp; Q1(b): Feature Questions [2m + 2m = 4m]</strong>
            <span style="font-size: 6.5pt; font-weight: 700; color: #64748b;">~5 Mins Total</span>
          </div>
          <div style="font-size: 6.8pt; color: #1e293b; line-height: 1.3;">
            &bull; <strong>Formula:</strong> Identify one valid feature [1 mark] + Add specific supporting historical detail [1 mark].<br/>
            &bull; <strong>Example:</strong> "One feature of the Thomas Splint was that it pulled the broken leg in rigid traction [1m]. This prevented bone ends grating together and reduced mortality from 80% to below 20% [1m]."<br/>
            &bull; <strong>Golden Rule:</strong> Keep it concise! Two sentences per question is all that is required.
          </div>
        </div>

        <!-- Q2(a) Source Utility -->
        <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; padding: 8px 10px;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #cbd5e1; padding-bottom: 3px; margin-bottom: 4px;">
            <strong style="font-size: 8pt; color: #1e3a8a;">Q2(a): Source Utility Enquiry [8 Marks]</strong>
            <span style="font-size: 6.5pt; font-weight: 700; color: #64748b;">~15 Mins</span>
          </div>
          <div style="font-size: 6.8pt; color: #1e293b; line-height: 1.3;">
            &bull; <strong>Formula:</strong> Evaluate Source A (Content + Knowledge + Provenance) &rarr; Evaluate Source B (Content + Knowledge + Provenance) &rarr; Comparative Conclusion on usefulness for enquiry.<br/>
            &bull; <strong>Provenance NOP:</strong> Nature (type of record), Origin (who wrote it, when), Purpose (why created).<br/>
            &bull; <strong>Trigger:</strong> "Source A is useful for an enquiry into [topic] because it reveals... This is corroborated by... However, its utility is shaped by its purpose to..."
          </div>
        </div>

        <!-- Q2(b) Follow-Up Grid -->
        <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; padding: 8px 10px;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #cbd5e1; padding-bottom: 3px; margin-bottom: 4px;">
            <strong style="font-size: 8pt; color: #1e3a8a;">Q2(b): Follow-Up Enquiry Grid [4 Marks]</strong>
            <span style="font-size: 6.5pt; font-weight: 700; color: #64748b;">~5 Mins</span>
          </div>
          <div style="font-size: 6.8pt; color: #1e293b; line-height: 1.3;">
            &bull; <strong>Row 1: Detail:</strong> Quote directly from the source.<br/>
            &bull; <strong>Row 2: Question:</strong> Ask an enquiry question linked directly to that detail.<br/>
            &bull; <strong>Row 3: Source Type:</strong> Must be a specific contemporary record (e.g. RAMC unit war diary, Casualty Clearing Station admission logs, medical officer personal journal).<br/>
            &bull; <strong>Row 4: How it Helps:</strong> Explain how this source answers your question.
          </div>
        </div>

        <!-- Q3 Similarity / Difference -->
        <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; padding: 8px 10px;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #cbd5e1; padding-bottom: 3px; margin-bottom: 4px;">
            <strong style="font-size: 8pt; color: #1e3a8a;">Q3: Similarity OR Difference [4 Marks]</strong>
            <span style="font-size: 6.5pt; font-weight: 700; color: #64748b;">~5 Mins</span>
          </div>
          <div style="font-size: 6.8pt; color: #1e293b; line-height: 1.3;">
            &bull; <strong>Formula:</strong> 1 developed comparative PEEL paragraph.<br/>
            &bull; <strong>Structure:</strong> Identify common feature/difference &rarr; Give specific evidence from Period 1 &rarr; Give specific evidence from Period 2 &rarr; Explain the comparative link.<br/>
            &bull; <strong>Trigger:</strong> "One way in which [X in period 1] was similar to [period 2] was... For example, in medieval Britain... Similarly, in the Renaissance... This shows continuity because..."
          </div>
        </div>

        <!-- Q4 Multi-Causal Explanation -->
        <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; padding: 8px 10px;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #cbd5e1; padding-bottom: 3px; margin-bottom: 4px;">
            <strong style="font-size: 8pt; color: #1e3a8a;">Q4: Multi-Causal Explanation [12 Marks]</strong>
            <span style="font-size: 6.5pt; font-weight: 700; color: #64748b;">~20 Mins</span>
          </div>
          <div style="font-size: 6.8pt; color: #1e293b; line-height: 1.3;">
            &bull; <strong>Formula:</strong> 3 fully developed PEEL paragraphs. Must address Stimulus Point 1, Stimulus Point 2, and ONE factor of Own Knowledge.<br/>
            &bull; <strong>Analytical Focus:</strong> Explain <em>why</em> the event occurred, rather than just telling the story. Connect each factor back to the question stem.<br/>
            &bull; <strong>Trigger:</strong> "A key factor explaining why [outcome] happened was... Consequently, this directly caused... Without this factor..."
          </div>
        </div>

        <!-- Q5/Q6 Judgement Essay -->
        <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; padding: 8px 10px;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #cbd5e1; padding-bottom: 3px; margin-bottom: 4px;">
            <strong style="font-size: 8pt; color: #1e3a8a;">Q5 / Q6: Judgement Essay [16 + 4 SPaG = 20 Marks]</strong>
            <span style="font-size: 6.5pt; font-weight: 700; color: #64748b;">~30 Mins</span>
          </div>
          <div style="font-size: 6.8pt; color: #1e293b; line-height: 1.3;">
            &bull; <strong>Formula:</strong> Brief Intro with criteria &rarr; P1: Agree with statement (PEEL) &rarr; P2: Disagree / Alternative Factor (PEEL) &rarr; P3: Third cross-era factor (PEEL) &rarr; Sustained Judgement Conclusion.<br/>
            &bull; <strong>Cross-Era Breadth:</strong> Must span the full period stated (150–300+ years).<br/>
            &bull; <strong>Trigger:</strong> "While [Factor A] was significant in the short term, [Factor B] was ultimately more decisive across the period because..."
          </div>
        </div>
      </div>

      <div style="border: 1.5px solid #0f172a; border-radius: 5px; padding: 8px 12px; background: #fdfdfd;">
        <div style="font-size: 7.8pt; font-weight: 800; color: #0f172a; text-transform: uppercase; margin-bottom: 5px; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px;">
          💬 Analytical Phrasing Toolkit: Examiner Sentence Starters
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; font-size: 6.6pt; line-height: 1.3; color: #334155;">
          <div>
            <strong style="color: #1e3a8a; display: block; margin-bottom: 2px;">Causation &amp; Impact:</strong>
            &bull; "A primary catalyst accelerating this shift was..."<br/>
            &bull; "Consequently, this directly enabled..."<br/>
            &bull; "The impact was intensified by..."<br/>
            &bull; "Without this breakthrough, progress would have..."
          </div>
          <div>
            <strong style="color: #1e3a8a; display: block; margin-bottom: 2px;">Continuity &amp; Stagnation:</strong>
            &bull; "This demonstrates profound continuity because..."<br/>
            &bull; "Despite this development, popular belief remained..."<br/>
            &bull; "The institutional monopoly of the Church ensured..."<br/>
            &bull; "Adherence to ancient dogma prevented..."
          </div>
          <div>
            <strong style="color: #1e3a8a; display: block; margin-bottom: 2px;">Sustained Judgement (16m):</strong>
            &bull; "To evaluate how far this is accurate, one must assess..."<br/>
            &bull; "Although [Factor A] was prominent, its success depended upon..."<br/>
            &bull; "When judged against the criteria of long-term impact..."<br/>
            &bull; "Ultimately, [Factor B] was decisive because..."
          </div>
        </div>
      </div>
    </div>

    <div style="position: relative; z-index: 2; border-top: 1px solid #cbd5e1; padding-top: 6px; display: flex; justify-content: space-between; align-items: center; font-size: 7.2pt; color: #64748b;">
      <span>Meoncross History &bull; GCSE Masterclass Series</span>
      <span>Page 40 &bull; Complete Exam Technique Guide</span>
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
    return (
      renderLeftPage(spread, leftPageNum, idx + 1) + renderRightPage(spread, rightPageNum, idx + 1)
    );
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Edexcel GCSE (9–1) History: Medicine in Britain &amp; Western Front — Visual Revision &amp; Assessment Guide</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4 portrait;
      margin: 0;
    }
    * {
      box-sizing: border-box;
    }
    html {
      scroll-behavior: smooth;
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
      scroll-margin-top: 65px;
    }

    /* Floating Navigation Topbar */
    .masterclass-topbar {
      position: sticky;
      top: 0;
      z-index: 9999;
      background: rgba(15, 23, 42, 0.94);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.15);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
      padding: 8px 16px;
      font-family: 'Inter', sans-serif;
    }
    .topbar-inner {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
    }
    .topbar-brand {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-shrink: 0;
    }
    .topbar-badge {
      background: #1d4ed8;
      color: #ffffff;
      font-size: 7.5pt;
      font-weight: 800;
      text-transform: uppercase;
      padding: 3px 8px;
      border-radius: 4px;
      letter-spacing: 0.5px;
    }
    .topbar-title {
      color: #f8fafc;
      font-size: 9pt;
      font-weight: 700;
      letter-spacing: 0.2px;
    }
    .topbar-nav {
      display: flex;
      align-items: center;
      gap: 8px;
      flex: 1;
      justify-content: center;
      max-width: 580px;
    }
    .topbar-label {
      color: #94a3b8;
      font-size: 8pt;
      font-weight: 600;
      white-space: nowrap;
    }
    .topbar-select {
      background: #1e293b;
      color: #ffffff;
      border: 1px solid #475569;
      border-radius: 5px;
      padding: 5px 10px;
      font-size: 8pt;
      font-weight: 600;
      cursor: pointer;
      outline: none;
      width: 100%;
      max-width: 380px;
    }
    .topbar-select:focus {
      border-color: #38bdf8;
    }
    .topbar-select optgroup {
      background: #0f172a;
      color: #93c5fd;
      font-weight: 700;
    }
    .topbar-select option {
      background: #1e293b;
      color: #ffffff;
      font-weight: 500;
    }
    .topbar-btn-group {
      display: flex;
      gap: 4px;
      flex-shrink: 0;
    }
    .topbar-btn {
      background: #334155;
      color: #f1f5f9;
      border: 1px solid #475569;
      border-radius: 5px;
      padding: 5px 10px;
      font-size: 8pt;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.15s ease;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      white-space: nowrap;
    }
    .topbar-btn:hover {
      background: #475569;
      color: #ffffff;
    }
    .topbar-actions {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
    }
    .topbar-btn-primary {
      background: #2563eb;
      border-color: #3b82f6;
      color: #ffffff;
    }
    .topbar-btn-primary:hover {
      background: #1d4ed8;
    }
    .topbar-btn-outline {
      background: transparent;
      border-color: #64748b;
      color: #cbd5e1;
    }
    .topbar-btn-outline:hover {
      background: rgba(255, 255, 255, 0.1);
      color: #ffffff;
    }

    @media print {
      body {
        background: transparent;
      }
      .masterclass-topbar {
        display: none !important;
      }
      .page {
        margin: 0;
        width: 100%;
        height: 100%;
        scroll-margin-top: 0 !important;
      }
    }
  </style>
</head>
<body>
  <header class="masterclass-topbar">
    <div class="topbar-inner">
      <div class="topbar-brand">
        <span class="topbar-badge">Edexcel GCSE (9–1)</span>
        <span class="topbar-title">Medicine &amp; Western Front Masterclass</span>
      </div>
      <div class="topbar-nav">
        <label for="spread-selector" class="topbar-label">Jump to:</label>
        <select id="spread-selector" class="topbar-select" onchange="window.navigateToSpread(this.value)">
          <option value="page-1">Page 1: Front Cover</option>
          <option value="page-2">Page 2: Exam Structure &amp; Timing</option>
          <option value="page-3">Page 3: Specification Matrix &amp; Tracker</option>
          <optgroup label="Medieval England (c1250–c1500)">
            <option value="spread-1">Spread 1 (pp. 4–5): KT 1.1 Medieval Ideas &amp; Causes</option>
            <option value="spread-2">Spread 2 (pp. 6–7): KT 1.2 Medieval Treatment &amp; Care</option>
            <option value="spread-3">Spread 3 (pp. 8–9): KT 1.3 Case Study: Black Death</option>
          </optgroup>
          <optgroup label="The Medical Renaissance (c1500–c1700)">
            <option value="spread-4">Spread 4 (pp. 10–11): KT 2.1 Renaissance Ideas &amp; Causes</option>
            <option value="spread-5">Spread 5 (pp. 12–13): KT 2.2 Renaissance Surgery &amp; Vesalius</option>
            <option value="spread-6">Spread 6 (pp. 14–15): KT 2.3 Harvey &amp; The Great Plague</option>
          </optgroup>
          <optgroup label="18th &amp; 19th Century Britain (c1700–c1900)">
            <option value="spread-7">Spread 7 (pp. 16–17): KT 3.1 Germ Theory &amp; Microbes</option>
            <option value="spread-8">Spread 8 (pp. 18–19): KT 3.2 Nightingale, Surgery &amp; Public Health Act</option>
            <option value="spread-9">Spread 9 (pp. 20–21): KT 3.3 Case Studies: Jenner &amp; Cholera</option>
          </optgroup>
          <optgroup label="Modern Britain (c1900–present)">
            <option value="spread-10">Spread 10 (pp. 22–23): KT 4.1 Genetics, Lifestyle &amp; Diagnosis</option>
            <option value="spread-11">Spread 11 (pp. 24–25): KT 4.2 Magic Bullets, NHS &amp; Prevention</option>
            <option value="spread-12">Spread 12 (pp. 26–27): KT 4.3 Case Study: Penicillin</option>
            <option value="spread-13">Spread 13 (pp. 28–29): KT 4.4 Case Study: Lung Cancer</option>
          </optgroup>
          <optgroup label="Western Front, 1914–1918">
            <option value="spread-14">Spread 14 (pp. 30–31): KT 5.1 Historical Context &amp; Terrain</option>
            <option value="spread-15">Spread 15 (pp. 32–33): KT 5.2 The Trench System</option>
            <option value="spread-16">Spread 16 (pp. 34–35): KT 5.3 Conditions, Illnesses &amp; Gas</option>
            <option value="spread-17">Spread 17 (pp. 36–37): KT 5.4 Evacuation Chain, RAMC &amp; FANY</option>
            <option value="spread-18">Spread 18 (pp. 38–39): KT 5.5 Medical Advances &amp; Treatments</option>
          </optgroup>
          <option value="page-40">Page 40: Exam Technique Playbook</option>
        </select>
        <div class="topbar-btn-group">
          <button class="topbar-btn" onclick="window.navPrev()" title="Previous Spread (Left Arrow)">&larr; Prev</button>
          <button class="topbar-btn" onclick="window.navNext()" title="Next Spread (Right Arrow)">Next &rarr;</button>
        </div>
      </div>
      <div class="topbar-actions">
        <button class="topbar-btn topbar-btn-primary" onclick="window.print()" title="Print or Save PDF">
          🖨️ Print / Save PDF
        </button>
        <a href="/" class="topbar-btn topbar-btn-outline" title="Return to interactive app">
          ⬅️ App Menu
        </a>
      </div>
    </div>
  </header>

  ${renderCoverPage()}
  ${renderInsideCover()}
  ${renderContentsMatrix()}
  ${pagesHtml}
  ${renderBackCover()}

  <script>
    window.navigateToSpread = function(targetId) {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', '#' + targetId);
      }
    };

    const navItems = [
      'page-1', 'page-2', 'page-3',
      'spread-1', 'spread-2', 'spread-3',
      'spread-4', 'spread-5', 'spread-6',
      'spread-7', 'spread-8', 'spread-9',
      'spread-10', 'spread-11', 'spread-12',
      'spread-13', 'spread-14', 'spread-15',
      'spread-16', 'spread-17', 'spread-18',
      'page-40'
    ];

    window.navPrev = function() {
      const sel = document.getElementById('spread-selector');
      const curIdx = navItems.indexOf(sel.value);
      if (curIdx > 0) {
        sel.value = navItems[curIdx - 1];
        window.navigateToSpread(navItems[curIdx - 1]);
      }
    };

    window.navNext = function() {
      const sel = document.getElementById('spread-selector');
      const curIdx = navItems.indexOf(sel.value);
      if (curIdx >= 0 && curIdx < navItems.length - 1) {
        sel.value = navItems[curIdx + 1];
        window.navigateToSpread(navItems[curIdx + 1]);
      }
    };

    document.addEventListener('keydown', function(e) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;
      if (e.key === 'ArrowLeft') {
        window.navPrev();
      } else if (e.key === 'ArrowRight') {
        window.navNext();
      }
    });

    // Handle URL hash on load
    window.addEventListener('DOMContentLoaded', function() {
      const hash = window.location.hash ? window.location.hash.replace('#', '') : '';
      if (hash) {
        let target = document.getElementById(hash);
        if (!target && hash.startsWith('lesson-')) {
          target = document.querySelector('[data-lesson=\"' + hash.replace('lesson-', '') + '\"]') || document.querySelector('[data-lesson-id=\"' + hash.replace('lesson-', '') + '\"]');
        }
        if (target) {
          setTimeout(function() {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            const sel = document.getElementById('spread-selector');
            if (sel) {
              const spreadId = target.id.startsWith('spread-') ? target.id : (target.getAttribute('data-spread') ? 'spread-' + target.getAttribute('data-spread') : target.id);
              if (spreadId && sel.querySelector('option[value=\"' + spreadId + '\"]')) {
                sel.value = spreadId;
              }
            }
          }, 150);
        }
      }
    });
  </script>
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
  await page.evaluateHandle('document.fonts.ready');

  // Proactive Layout Guardrail: Assert zero page overflow
  const overflowReports = await page.evaluate(() => {
    const pages = Array.from(document.querySelectorAll('.page'));
    const overflows = [];
    pages.forEach((p, idx) => {
      const pageNum = p.getAttribute('data-page') || idx + 1;
      const scrollHeight = p.scrollHeight;
      if (scrollHeight > 1124) {
        overflows.push({
          pageNum,
          id: p.id,
          scrollHeight,
          overflowBy: scrollHeight - 1123,
        });
      }
    });
    return { totalPages: pages.length, overflows };
  });

  console.log(`📐 Page layout check: Total pages = ${overflowReports.totalPages}`);
  if (overflowReports.overflows.length > 0) {
    const details = overflowReports.overflows
      .map(
        (o) =>
          `Page ${o.pageNum} (#${o.id}): ${o.scrollHeight}px (overflows by +${o.overflowBy}px)`,
      )
      .join('\n');
    throw new Error(`PDF Generation halted due to page overflow:\n${details}`);
  }
  console.log('✅ Automated Overflow Check: All pages fit cleanly within 1123px!');

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
    '\n🎉 SUCCESS: 40-Page Complete Medicine Visual Revision & Exam Assessment Guide is compiled!',
  );
}

run().catch((err) => {
  console.error('❌ Error generating visual guide:', err);
  process.exit(1);
});
