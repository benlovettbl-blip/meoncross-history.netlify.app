/**
 * History Revision Hub — Edexcel GCSE History Paper 1: Medicine Through Time Metadata
 *
 * Provides specification-accurate curriculum anchors, chronological sequences,
 * key figure dossiers, concept spotlights, and Edexcel examination strategies
 * for all 5 eras of Medicine in Britain (c1250–present) and The Western Front.
 */

const MEDICINE_ERAS = {
  medieval: {
    id: 'medieval',
    title: 'Medieval Medicine in Britain',
    period: 'c1250–c1500',
    specCode: '1HI0/11: Thematic Study &bull; Medieval Medicine',
    lessonStart: 0,
    lessonEnd: 5,
    lessonCount: 5,
    pageCount: 12,
    coverImage: 'units/edexcel_medicine/assets/authentic_medieval.jpg',
    coverTitle: 'MEDIEVAL MEDICINE IN BRITAIN (c1250–c1500)',
    coverSubtitle: 'Supernatural Orthodoxy, The Galenic Monopoly & The Black Death',
    specMatrix: [
      {
        header: 'CORE SPECIFICATION ENQUIRIES',
        items: [
          '<strong>L1:</strong> Supernatural & Religious Explanations',
          '<strong>L2:</strong> Rational Ideas: Galen & The Four Humours',
          '<strong>L3:</strong> Approaches to Treatment & Prevention',
          '<strong>L4:</strong> Medical Providers & Monastic Hospitals',
          '<strong>L5:</strong> Case Study: The Black Death (1348–49)',
        ],
      },
      {
        header: 'HISTORICAL MECHANISMS & CONCEPTS',
        items: [
          '<strong>Ecclesiastical Monopoly:</strong> Scriptoria & Papal authority',
          '<strong>Teleology:</strong> Purposeful divine bodily design',
          '<strong>Humoural Balance:</strong> Opposites, phlebotomy & purging',
          '<strong>Hospital Care:</strong> <em>Care Not Cure</em> monastic regimes',
          '<strong>Astrological Miasma:</strong> 1345 Planetary conjunction',
        ],
      },
      {
        header: 'EDEXCEL PAPER 1 EXAMINATION BLUEPRINT',
        items: [
          '<strong>Q3:</strong> Similarity / Difference across Eras [4m]',
          '<strong>Q4:</strong> Causal Analysis / Explain Why [12m]',
          '<strong>Q5/Q6:</strong> 16-Mark Synoptic Essay [+4 SPaG]',
          '<strong>Assessment Objective 1:</strong> Precise recall of detail',
          '<strong>Assessment Objective 2:</strong> Analytical historical causation',
        ],
      },
    ],
    timeline: [
      {
        year: '1123',
        event: "Rahere founds St Bartholomew's Hospital in London ('Care Not Cure').",
      },
      {
        year: 'c.1242',
        event: 'Ibn al-Nafis discovers the pulmonary transit of blood in Damascus.',
      },
      {
        year: '1277',
        event: 'Roger Bacon imprisoned by Church authorities for advocating empirical observation.',
      },
      {
        year: '1345',
        event: 'Planetary conjunction of Saturn, Jupiter, and Mars in Aquarius blamed for plague.',
      },
      {
        year: '1348',
        event: "The Black Death strikes Melcombe Regis, killing 30–45% of England's population.",
      },
      {
        year: '1376',
        event: 'Guild of Surgeons established in London, separating surgeons from barbers.',
      },
      {
        year: 'c.1380',
        event: "MS Harley 3719 illustrates the 'Zodiac Man' (Homo Signorum) for bloodletting.",
      },
      {
        year: '1400',
        event: 'Over 500 monastic hospitals operate across England under religious orders.',
      },
    ],
    keyFigures: [
      {
        name: 'Roger Bacon',
        dates: 'c.1214–1292',
        role: 'Franciscan Scholar & Natural Philosopher',
        portrait: 'images/galen_portrait.jpg',
        significance:
          'Early advocate of empirical scientific observation who was imprisoned by the Catholic Church for questioning ancient authority.',
        actions: [
          '<strong>Advocated Observation:</strong> Argued doctors should test ideas through experimentation rather than dogmatically copying ancient texts.',
          '<strong>Imprisoned in 1277:</strong> Punished by the Franciscan Order for holding "suspect novelties", deterring empirical science.',
          '<strong>Symbol of Censorship:</strong> Demonstrated the Church’s unyielding enforcement of Galenic and theological orthodoxy.',
        ],
      },
      {
        name: 'Claudius Galen',
        dates: 'c.129–c.216 AD',
        role: 'Ancient Roman Imperial Physician',
        portrait: 'images/galen_portrait.jpg',
        significance:
          'Roman doctor whose Theory of Opposites and teleological design argument formed the unquestioned foundation of medieval European medicine.',
        actions: [
          '<strong>Theory of Opposites:</strong> Developed treatments balancing the Four Humours using opposing qualities (cold phlegm treated with hot pepper).',
          '<strong>Teleological Doctrine:</strong> Argued every organ was purposefully designed by a single Creator, perfectly matching Genesis creation theology.',
          '<strong>Anatomical Dominance:</strong> Dissected apes and pigs, creating errors (e.g. 2-piece jawbone) that remained dogma for over 1,300 years.',
        ],
      },
      {
        name: 'Hippocrates of Kos',
        dates: 'c.460–c.370 BC',
        role: 'Ancient Greek Physician & Philosopher',
        portrait: 'images/hippocrates_portrait.jpg',
        significance:
          'The "Father of Medicine" who separated disease from supernatural curses and pioneered clinical bedside observation.',
        actions: [
          '<strong>Theory of the Four Humours:</strong> Identified Blood, Phlegm, Yellow Bile, and Black Bile as the determinants of physical health.',
          '<strong>Clinical Observation:</strong> Instructed physicians to examine symptoms, pulse, and urine systematically rather than relying on omens.',
          '<strong>The Hippocratic Oath:</strong> Established an ethical code of conduct mandating that doctors protect patient confidentiality and "do no harm".',
        ],
      },
      {
        name: 'John of Arderne',
        dates: '1307–1392',
        role: 'Master Surgeon of the Hundred Years War',
        portrait: 'images/medieval_barber_surgeon.jpg',
        significance:
          'Renowned English military surgeon who developed innovative surgical techniques for treating anal fistulae in knights.',
        actions: [
          '<strong>Fistula-in-ano Procedure:</strong> Devised a revolutionary surgical incision that achieved a 50% survival rate without fatal hemorrhage.',
          '<strong>Empirical Practice:</strong> Founded the Guild of Surgeons (1376) and advocated for practical battlefield experience over university theory.',
          '<strong>Bedside Demeanour:</strong> Wrote <em>Practica</em>, advising surgeons to dress soberly, soothe patient anxieties, and agree fees in advance.',
        ],
      },
      {
        name: 'Guy de Chauliac',
        dates: 'c.1300–1368',
        role: 'Papal Physician to Pope Clement VI',
        portrait: 'images/hotel_dieu_hospital.jpg',
        significance:
          'Leading French surgeon who treated victims of the Black Death at Avignon and authored the surgical textbook <em>Chirurgia Magna</em>.',
        actions: [
          '<strong>Identified Plague Types:</strong> Distinguished clinically between pneumonic plague (blood-spitting) and bubonic plague (buboes).',
          '<strong>Protected the Papacy:</strong> Advised Pope Clement VI to isolate himself between two roaring fires in Avignon, successfully saving his life.',
          '<strong>Admitted Medical Powerlessness:</strong> Openly recorded in 1348 that doctors were helpless, as "all medicines and bloodletting availed nothing".',
        ],
      },
    ],
    conceptSpotlights: [
      {
        category: 'THEOLOGICAL DOGMA',
        title: 'Teleology & The Papal Monopoly on Knowledge',
        body: 'Why did the Christian Church adopt the medical treatises of Claudius Galen, a pagan doctor from 2nd-century imperial Rome? The crucial connection was teleology. Galen repeatedly argued in his treatises that every single bone, muscle, and organ in the human body had been purposefully crafted by a supreme, singular Creator. This design argument aligned so perfectly with Genesis that church leaders declared Galen’s anatomical writings infallible sacred truth.',
        takeaway:
          'Key Causation: Questioning Galen became synonymous with heresy against God, freezing anatomical progress for over 1,300 years.',
      },
      {
        category: 'RATIONAL PATHOLOGY',
        title: 'The Humoural Axis: Balance, Phlebotomy & Opposites',
        body: 'Medieval physicians viewed the human body as an organic microcosm governed by the Four Humours: Blood (spring/air/hot & wet), Yellow Bile (summer/fire/hot & dry), Black Bile (autumn/earth/cold & dry), and Phlegm (winter/water/cold & wet). Disease occurred when one humour became excessive or corrupt. Treatment required active subtraction via phlebotomy (veinesection, cupping, or leeches) or clinical purging using emetics and laxatives.',
        takeaway:
          'Exam Distinction: Humoural medicine was rational because it sought natural biological causes rather than demonology, yet remained medically ineffective.',
      },
      {
        category: 'PREVENTIVE REGIMES',
        title: 'Regimen Sanitatis: Preventive Hygiene & The Six Non-Naturals',
        body: 'Medieval prevention centered on the Regimen Sanitatis, a set of dietary and behavioural rules originating in ancient Greek medicine. Doctors advised patients on the "Six Non-Naturals": air quality, food and drink, motion and rest, sleep and waking, excretion and retention, and passions of the soul. Wealthy citizens burned aromatic sweet woods (frankincense, lavender) to counteract miasma and bathed regularly in stewes.',
        takeaway:
          'Key Evidence: Medieval people actively cared about hygiene; sickness was prevented by keeping the internal humours and external environment pure.',
      },
      {
        category: 'INSTITUTIONAL CARE',
        title: "'Care Not Cure': The Monastic Hospital Philosophy",
        body: 'Medieval English hospitals were not medical centers designed for surgery or infectious healing. Run by monastic religious orders, their primary purpose was spiritual hospitality and palliative care. Priests and nuns provided clean bedding, warmth, simple food, and daily prayer so patients could die in a state of Christian grace. Infectious lepers, lunatics, pregnant women, and terminal sufferers were routinely turned away.',
        takeaway:
          'Core Specification Anchor: "Care Not Cure" defines the institutional purpose of all 500+ medieval English monastic hospitals.',
      },
      {
        category: 'EPIDEMIOLOGY',
        title: 'Astrology, Miasma & Contagion: The 1348 Conjunction',
        body: 'When the Black Death arrived in June 1348, medieval society deployed three concurrent causal models. Astrologers blamed the March 1345 planetary conjunction of Saturn, Jupiter, and Mars in Aquarius. Churchmen declared it God’s vengeance for England’s pride and sinful dress. Common folk suspected poisoned wells and foul miasma. Local authorities reacted with quarantine (40-day isolation in Gloucester) and cemetery bans outside city limits.',
        takeaway:
          'Historiographical Reality: Medieval authorities attempted practical public health measures, but lacked biological knowledge of flea vectors.',
      },
    ],
  },

  renaissance: {
    id: 'renaissance',
    title: 'The Medical Renaissance in Britain',
    period: 'c1500–c1700',
    specCode: '1HI0/11: Thematic Study &bull; Renaissance Medicine',
    lessonStart: 5,
    lessonEnd: 10,
    lessonCount: 5,
    pageCount: 12,
    coverImage: 'units/edexcel_medicine/assets/authentic_renaissance.jpg',
    coverTitle: 'THE MEDICAL RENAISSANCE IN BRITAIN (c1500–c1700)',
    coverSubtitle: 'Humanism, Direct Dissection & The Mechanical Revolution',
    specMatrix: [
      {
        header: 'CORE SPECIFICATION ENQUIRIES',
        items: [
          '<strong>L6:</strong> Humanism, The Printing Press & Royal Society',
          '<strong>L7:</strong> Thomas Sydenham & Bedside Observation',
          '<strong>L8:</strong> Andreas Vesalius & The Anatomical Revolution',
          '<strong>L9:</strong> William Harvey & The Circulation of Blood',
          '<strong>L10:</strong> Continuity in Treatment & The Great Plague',
        ],
      },
      {
        header: 'HISTORICAL MECHANISMS & CONCEPTS',
        items: [
          '<strong>Movable Type:</strong> Elimination of copyist manuscript drift',
          '<strong>Nullius in Verba:</strong> Rejection of unproven ancient authority',
          '<strong>Direct Human Dissection:</strong> Correcting Galenic anatomy',
          '<strong>Mechanical Physiology:</strong> The heart as a mechanical pump',
          '<strong>The Renaissance Paradox:</strong> Great discovery vs stagnant cure',
        ],
      },
      {
        header: 'EDEXCEL PAPER 1 EXAMINATION BLUEPRINT',
        items: [
          '<strong>Q3:</strong> Similarity / Difference across 1500–1700 [4m]',
          '<strong>Q4:</strong> Causal Analysis / Explain Why [12m]',
          '<strong>Q5/Q6:</strong> 16-Mark Synoptic Essay [+4 SPaG]',
          '<strong>Assessment Objective 1:</strong> Factual anatomical accuracy',
          '<strong>Assessment Objective 2:</strong> Evaluating change vs continuity',
        ],
      },
    ],
    timeline: [
      { year: '1440', event: 'Johannes Gutenberg invents the movable-type metal printing press.' },
      {
        year: '1518',
        event: 'King Henry VIII grants Royal Charter to the Royal College of Physicians.',
      },
      {
        year: '1543',
        event:
          'Andreas Vesalius publishes De Humani Corporis Fabrica, correcting 300 Galenic errors.',
      },
      {
        year: '1628',
        event: 'William Harvey publishes De Motu Cordis, proving systemic circulation of blood.',
      },
      {
        year: '1660',
        event:
          "The Royal Society is formed under the motto Nullius in Verba ('Take nobody's word for it').",
      },
      {
        year: '1662',
        event: 'King Charles II awards a Royal Charter to the Royal Society of London.',
      },
      {
        year: '1665',
        event:
          'The Great Plague kills 100,000 in London; official Plague Orders enforce house quarantine.',
      },
      {
        year: '1676',
        event: 'Thomas Sydenham publishes Observationes Medicae, advocating clinical observation.',
      },
    ],
    keyFigures: [
      {
        name: 'King Charles II',
        dates: '1630–1685',
        role: 'Monarch of England, Scotland & Ireland',
        portrait: 'images/quack_doctor_steen.jpg',
        significance:
          'Royal patron who chartered the Royal Society in 1662, transforming scientific communication and institutionalizing the empirical method.',
        actions: [
          '<strong>Royal Charter (1662):</strong> Gave official royal legitimacy to empirical scientists and natural philosophers.',
          '<strong>Philosophical Transactions:</strong> Supported the world’s first peer-reviewed scientific journal (1665), enabling rapid global dissemination.',
          '<strong>Personal Laboratory:</strong> Maintained an anatomical and chemical laboratory at Whitehall Palace, popularizing science among nobility.',
        ],
      },
      {
        name: 'Thomas Sydenham',
        dates: '1624–1689',
        role: 'The "English Hippocrates"',
        portrait: 'images/thomas_sydenham.jpg',
        significance:
          'Pioneered bedside clinical observation and treated diseases as distinct biological entities rather than individualized humoural imbalances.',
        actions: [
          '<strong>Clinical Observation:</strong> Kept exhaustive records of patient symptoms at the bedside, disregarding theoretical humoural astrology.',
          '<strong>Disease Classification:</strong> First physician to classify distinct diseases (e.g. distinguishing measles from scarlet fever).',
          '<strong>Published Observationes Medicae (1676):</strong> Established empirical observation as the standard textbook for British medical education.',
        ],
      },
      {
        name: 'Andreas Vesalius',
        dates: '1514–1564',
        role: 'Professor of Anatomy at Padua',
        portrait: 'images/vesalius_fabrica_frontispiece.jpg',
        significance:
          'Revolutionary anatomist who conducted his own human dissections, definitively proving over 300 errors in Galen’s anatomical writings.',
        actions: [
          '<strong>De Humani Corporis Fabrica (1543):</strong> Published landmark masterpiece featuring precise anatomical engravings by Renaissance artists.',
          '<strong>Disproved Galenic Errors:</strong> Proved the human lower jaw is a single bone (not two), and the septum of the heart has no invisible pores.',
          '<strong>Pedagogical Shift:</strong> Insisted professors must dissect corpses themselves with scalpels rather than lecturing from ancient Latin books.',
        ],
      },
      {
        name: 'William Harvey',
        dates: '1578–1657',
        role: 'Physician to King Charles I',
        portrait: 'images/harvey_veins.jpg',
        significance:
          'English physician who discovered the systemic circulation of the blood, disproving Galen’s theory that the liver constantly manufactured blood.',
        actions: [
          '<strong>De Motu Cordis (1628):</strong> Proved that blood circulates continuously in a closed, one-way system pumped by the heart.',
          '<strong>Mechanical Calculations:</strong> Calculated the heart pumps 540 pounds of blood per hour—far exceeding the body’s physical capacity to create new blood.',
          '<strong>Ligature Experiments:</strong> Tied tight ligatures on arms to demonstrate that venous valves permit blood to flow only inward toward the heart.',
        ],
      },
      {
        name: 'Nathaniel Hodges',
        dates: '1629–1688',
        role: 'Fellow of the Royal College of Physicians',
        portrait: 'images/plague_doctor_1665.png',
        significance:
          'Brave London physician who remained in the capital during the Great Plague of 1665, documenting symptoms and treatment outcomes.',
        actions: [
          '<strong>Remained During Plague:</strong> Unlike the majority of wealthy physicians who fled London, Hodges treated thousands of poor victims daily.',
          '<strong>Published Loimologia (1672):</strong> Documented firsthand clinical observations of plague buboes, fever cycles, and mortality rates.',
          '<strong>Exposed Quackery:</strong> Condemned quack medicines like "plague water" and smoking tobacco, advocating municipal sanitation and quarantine.',
        ],
      },
    ],
    conceptSpotlights: [
      {
        category: 'EPISTEMOLOGY',
        title: 'Nullius in Verba & The Royal Society (1660)',
        body: "In 1660, scholars in London established the Royal Society under the Latin motto Nullius in Verba—'Take nobody's word for it'. Rejecting scholastic deference to ancient authorities like Aristotle and Galen, they insisted that scientific claims must be demonstrated through repeatable laboratory experiments. Through its journal Philosophical Transactions (1665), researchers across Europe shared peer-reviewed findings rapidly without clerical censorship.",
        takeaway:
          'Key Impact: Transformed medical enquiry from passive philosophical debate into active empirical investigation.',
      },
      {
        category: 'NOSOLOGY',
        title: 'Sydenham & The Concept of Disease Species',
        body: 'Before Thomas Sydenham, physicians believed that every patient’s illness was unique to their individual humoural complexion. Sydenham revolutionized medicine by asserting that diseases had fixed, independent species—just like plants and animals. By categorizing epidemics by seasonal occurrence and clinical symptoms, Sydenham laid the groundwork for modern diagnosis, proving that scarlet fever was a specific illness requiring a specific cure.',
        takeaway:
          'Exam Distinction: Sydenham moved medicine away from individual humoural imbalance toward specific, identifiable disease entities.',
      },
      {
        category: 'ANATOMICAL REVISION',
        title: 'The Anatomical Breakthrough: Vesalius vs Galen',
        body: 'When Andreas Vesalius published De Humani Corporis Fabrica in 1543, he revolutionized European anatomy. Galen had dissected Barbary macaques and pigs because Roman law forbade desecrating human corpses, incorrectly asserting that the human breastbone had seven segments and the uterus was horn-shaped. Vesalius demonstrated on human cadavers that Galen had described animals, not human beings, urging students: "Trust not Galen, trust your own eyes."',
        takeaway:
          'Key Causation: Vesalius destroyed the myth of classical infallibility and established direct dissection as medical training.',
      },
      {
        category: 'CARDIOVASCULAR PHYSIOLOGY',
        title: 'Harvey & The Mechanical Circuit of the Blood',
        body: 'Galen taught that food was digested in the liver to create venous blood, which was consumed by bodily tissues as fuel, while arterial blood was infused with "vital spirit" in the lungs. William Harvey applied mechanical engineering to the body: measuring the volume of blood pumped per beat, he mathematically demonstrated that the body would exhaust all nourishment in minutes if blood was not recycled in a closed loop through veins and arteries.',
        takeaway:
          'Exam Anchor: Harvey proved the heart is a muscular pump, though bloodletting continued for over a century due to entrenched tradition.',
      },
      {
        category: 'PUBLIC HEALTH POLICY',
        title: 'The Great Plague of 1665: Municipal Intervention',
        body: 'The 1665 Great Plague demonstrated both striking continuity and vital administrative evolution. While people still blamed miasma, planetary conjunctions, and God’s anger, the City of London implemented systematic bureaucratic countermeasures: appointing searchers of the dead, locking infected families in their homes marked with red crosses, banning public assemblies, and slaughtering 200,000 stray cats and dogs.',
        takeaway:
          'Key Contrast: While 1348 response was disorganized, 1665 featured organized state and municipal surveillance.',
      },
    ],
  },

  '18th_19th': {
    id: '18th_19th',
    title: 'The Scientific & Industrial Medical Revolution',
    period: 'c1700–c1900',
    specCode: '1HI0/11: Thematic Study &bull; 18th & 19th Century Medicine',
    lessonStart: 10,
    lessonEnd: 15,
    lessonCount: 5,
    pageCount: 12,
    coverImage: 'units/edexcel_medicine/assets/authentic_18th_19th.jpg',
    coverTitle: '18TH & 19TH CENTURY MEDICINE IN BRITAIN (c1700–c1900)',
    coverSubtitle: 'Microbe Hunters, The Surgical Revolution & Sanitary Reform',
    specMatrix: [
      {
        header: 'CORE SPECIFICATION ENQUIRIES',
        items: [
          '<strong>L11:</strong> Germ Theory: Pasteur & Robert Koch',
          '<strong>L12:</strong> Prevention: Edward Jenner & Smallpox Vaccine',
          '<strong>L13:</strong> Hospital Care: Nightingale & Seacole',
          '<strong>L14:</strong> Surgery: Simpson, Lister & Overcoming Pain',
          '<strong>L15:</strong> Public Health & Cholera: John Snow & 1875 Act',
        ],
      },
      {
        header: 'HISTORICAL MECHANISMS & CONCEPTS',
        items: [
          '<strong>Microbiology:</strong> Specific pathogenic microbes cause decay',
          '<strong>Immunisation:</strong> Benign cowpox antibodies confer immunity',
          '<strong>Antiseptic Architecture:</strong> Pavilion hospital ventilation',
          '<strong>Anesthesia & Antisepsis:</strong> Chloroform & carbolic spray',
          '<strong>Sanitary Legislation:</strong> Compulsory 1875 Public Health Act',
        ],
      },
      {
        header: 'EDEXCEL PAPER 1 EXAMINATION BLUEPRINT',
        items: [
          '<strong>Q3:</strong> Similarity / Difference across Eras [4m]',
          '<strong>Q4:</strong> Causal Analysis / Explain Why [12m]',
          '<strong>Q5/Q6:</strong> 16-Mark Synoptic Essay [+4 SPaG]',
          '<strong>Assessment Objective 1:</strong> Precise dates, names, and statistics',
          '<strong>Assessment Objective 2:</strong> Evaluating catalysts (War, Tech, Govt)',
        ],
      },
    ],
    timeline: [
      {
        year: '1796',
        event:
          'Edward Jenner successfully inoculates James Phipps with cowpox to prevent smallpox.',
      },
      {
        year: '1842',
        event:
          'Edwin Chadwick publishes Report on the Sanitary Condition of the Labouring Population.',
      },
      {
        year: '1847',
        event:
          'James Young Simpson discovers the anesthetic properties of chloroform in Edinburgh.',
      },
      {
        year: '1848',
        event: 'First Public Health Act passed; establishes permissive General Board of Health.',
      },
      {
        year: '1854',
        event: 'John Snow removes the Broad Street pump handle, proving cholera is waterborne.',
      },
      {
        year: '1854',
        event: 'Florence Nightingale arrives at Scutari military hospital during the Crimean War.',
      },
      {
        year: '1861',
        event: 'Louis Pasteur publishes Germ Theory, disproving spontaneous generation.',
      },
      {
        year: '1865',
        event:
          'Joseph Lister uses carbolic acid spray in surgery, initiating antiseptic technique.',
      },
      {
        year: '1875',
        event:
          'Second Public Health Act passed; compulsory sanitation ends laissez-faire doctrine.',
      },
      {
        year: '1882',
        event: 'Robert Koch isolates Mycobacterium tuberculosis using chemical agar dyes.',
      },
    ],
    keyFigures: [
      {
        name: 'Louis Pasteur',
        dates: '1822–1895',
        role: 'French Chemist & Microbiologist',
        portrait: 'images/pasteur_lab.jpg',
        significance:
          'Formulated the Germ Theory of disease in 1861, proving that airborne microorganisms cause decay and destroying the ancient miasma theory.',
        actions: [
          '<strong>Swan-Neck Flask Experiments (1861):</strong> Proved that boiled broth stays sterile unless exposed to airborne dust particles.',
          '<strong>Disproved Spontaneous Generation:</strong> Proved that microbes produce disease, rather than decaying matter spontaneously generating germs.',
          '<strong>Developed Vaccines:</strong> Created attenuated live vaccines for chicken cholera, anthrax (1881), and rabies (1885).',
        ],
      },
      {
        name: 'Edward Jenner',
        dates: '1749–1823',
        role: 'Gloucestershire Country Physician',
        portrait: 'images/edward_jenner.jpg',
        significance:
          'Pioneered vaccination in 1796 by proving that infection with benign cowpox gave total immunity against deadly smallpox.',
        actions: [
          '<strong>James Phipps Experiment (1796):</strong> Scraped pus from milkmaid Sarah Nelmes’s cowpox pustule into young James Phipps, then exposed him to smallpox.',
          '<strong>Published Findings (1798):</strong> Documented 23 successful vaccination cases, replacing risky live-smallpox inoculation.',
          '<strong>Parliamentary Grants:</strong> Awarded £30,000 by Parliament (1802 & 1807), leading to free infant vaccination in 1840 and compulsory vaccination in 1853.',
        ],
      },
      {
        name: 'Florence Nightingale',
        dates: '1820–1910',
        role: 'Founder of Modern Professional Nursing',
        portrait: 'images/nightingale.jpg',
        significance:
          'Transformed military and civilian hospital sanitation, reducing mortality at Scutari from 42% to 2% and establishing nursing as a profession.',
        actions: [
          '<strong>Crimean War Reform (1854):</strong> Cleaned wards, introduced fresh linens, unblocked sewers, and ventilated rooms at Scutari Barracks Hospital.',
          '<strong>Notes on Hospitals (1859):</strong> Advocated for the "pavilion plan" hospital architecture (large windows, separate wards, cross-ventilation).',
          '<strong>Nightingale Training School (1860):</strong> Founded Britain’s first professional nurse training school at St Thomas’ Hospital in London.',
        ],
      },
      {
        name: 'Joseph Lister',
        dates: '1827–1912',
        role: 'Professor of Surgery at Glasgow University',
        portrait: 'images/lister_carbolic_spray.jpg',
        significance:
          'Father of antiseptic surgery who applied Pasteur’s Germ Theory to operating theatres using carbolic acid, slashing surgical mortality.',
        actions: [
          '<strong>Carbolic Acid Spray (1865):</strong> Used carbolic dressings on compound fracture wounds, reducing mortality from 46% to 15% in three years.',
          '<strong>Antiseptic Operating Theatres:</strong> Sprayed carbolic mist over open wounds, sterilized surgical instruments, and soaked catgut ligatures.',
          '<strong>Paved Way for Aseptic Surgery:</strong> Proved that wound sepsis was caused by living external microbes, leading to steam sterilization and rubber gloves.',
        ],
      },
      {
        name: 'John Snow',
        dates: '1813–1858',
        role: 'Pioneering Epidemiologist & Anesthetist',
        portrait: 'images/john_snow.jpg',
        significance:
          'Proved cholera was transmitted through contaminated drinking water rather than airborne miasma during the 1854 Broad Street outbreak.',
        actions: [
          '<strong>Soho Dot Map (1854):</strong> Plotted 500 cholera deaths geographically around the Broad Street pump, showing clustering of fatalities.',
          '<strong>Removed Pump Handle:</strong> Persuaded the St James Parish Board of Guardians to remove the pump handle, ending the epidemic.',
          '<strong>Water Company Comparison:</strong> Proved Southwark & Vauxhall customers died at 9x the rate of Lambeth customers due to sewage contamination.',
        ],
      },
    ],
    conceptSpotlights: [
      {
        category: 'MICROBIOLOGY',
        title: 'Germ Theory vs Spontaneous Generation (1861)',
        body: 'Until 1861, doctors believed in spontaneous generation: that rotting organic matter spontaneously created microbes as a byproduct of decay. Louis Pasteur reversed this logic entirely: microbes existed in the atmosphere, fell into decaying matter, and actively caused the decay. By boiling liquid in swan-neck flasks with bent necks that trapped airborne spores, Pasteur proved broth remained sterile indefinitely.',
        takeaway:
          'Key Scientific Shift: Microbes are the primary cause of disease, not the secondary result of decay.',
      },
      {
        category: 'IMMUNOLOGY',
        title: 'Inoculation vs Vaccination: The 1796 Breakthrough',
        body: 'In the 18th century, inoculation (variolation) involved rubbing live, virulent smallpox scabs into scratches on healthy patients. Inoculation carried severe risks: patients often developed full-blown smallpox, died, or triggered fresh epidemics. Edward Jenner observed that milkmaids who caught mild cowpox never caught smallpox. Vaccination (from Latin vacca, cow) introduced harmless cowpox, conferring lifelong immunity with zero risk of contagion.',
        takeaway:
          'Specification Anchor: Jenner transformed preventive medicine from risky variolation to safe, universal vaccination.',
      },
      {
        category: 'HOSPITAL ARCHITECTURE',
        title: "The Pavilion Plan & Florence Nightingale's Sanitation",
        body: 'When Florence Nightingale returned from the Crimea, she utilized statistical data (inventing the Polar Area Diagram, or Coxcomb chart) to prove that unhygienic hospital conditions killed more soldiers than enemy bullets. She promoted the "pavilion plan": multi-story buildings divided into long, narrow wards with high ceilings, large windows on opposite walls to ensure cross-ventilation, and wipeable tiled walls.',
        takeaway:
          'Core Pedagogical Point: Nightingale professionalized nursing and made hospitals places of recovery rather than death.',
      },
      {
        category: 'SURGICAL REVOLUTION',
        title: 'The Dual Conquest: Pain (Simpson) & Sepsis (Lister)',
        body: 'Before 1847, surgery was limited by unbearable pain, causing fatal shock; surgeons had to operate in seconds. James Young Simpson’s discovery of chloroform enabled deeper, slower, and more complex operations. However, this initially caused the "Black Period of Surgery" because deeper incisions led to catastrophic gangrene and sepsis. Joseph Lister resolved this crisis in 1865 by spraying carbolic acid, creating antiseptic surgery.',
        takeaway:
          'Exam Linkage: Overcoming pain (anesthesia) required overcoming sepsis (antisepsis) before modern surgery could succeed.',
      },
      {
        category: 'GOVERNANCE & REFORM',
        title: 'The End of Laissez-Faire: The Public Health Act of 1875',
        body: "For centuries, British governments followed laissez-faire ('leave alone'): councils believed it was tyrannical to tax property owners to clean poor streets. The 1848 Public Health Act was purely voluntary. However, the 1867 Reform Act gave working-class male town dwellers the vote, forcing politicians to act. The compulsory 1875 Public Health Act mandated clean piped water, sewage disposal, street lighting, and food inspection.",
        takeaway:
          'Constitutional Turning Point: The 1875 Act permanently transformed the British state from passive observer to guardian of public health.',
      },
    ],
  },

  modern: {
    id: 'modern',
    title: 'Modern Medicine & High-Technology Healthcare',
    period: 'c1900–present',
    specCode: '1HI0/11: Thematic Study &bull; Modern Medicine',
    lessonStart: 15,
    lessonEnd: 20,
    lessonCount: 5,
    pageCount: 12,
    coverImage: 'units/edexcel_medicine/assets/authentic_modern.jpg',
    coverTitle: 'MODERN MEDICINE IN BRITAIN (c1900–PRESENT)',
    coverSubtitle: 'Genetics, The Antibiotic Revolution & The National Health Service',
    specMatrix: [
      {
        header: 'CORE SPECIFICATION ENQUIRIES',
        items: [
          '<strong>L16:</strong> Genetics, DNA & The Human Genome Project',
          '<strong>L17:</strong> Lifestyle Factors & Diagnostic Technology',
          '<strong>L18:</strong> Magic Bullets, High-Tech Treatments & The NHS',
          '<strong>L19:</strong> Antibiotics: Fleming, Florey & Chain (Penicillin)',
          '<strong>L20:</strong> Case Study: Public Health & Lung Cancer',
        ],
      },
      {
        header: 'HISTORICAL MECHANISMS & CONCEPTS',
        items: [
          '<strong>Molecular Genetics:</strong> DNA double helix & gene therapies',
          '<strong>Non-Invasive Diagnostics:</strong> X-Rays, CT scans, MRI, Ultrasound',
          '<strong>Targeted Pharmacology:</strong> Synthetic chemical magic bullets',
          '<strong>Mass Industrial Scale:</strong> US War Production Board penicillin',
          '<strong>Universal Access:</strong> NHS free healthcare at point of delivery',
        ],
      },
      {
        header: 'EDEXCEL PAPER 1 EXAMINATION BLUEPRINT',
        items: [
          '<strong>Q3:</strong> Similarity / Difference across Eras [4m]',
          '<strong>Q4:</strong> Causal Analysis / Explain Why [12m]',
          '<strong>Q5/Q6:</strong> 16-Mark Synoptic Essay [+4 SPaG]',
          '<strong>Assessment Objective 1:</strong> Technological and legislative evidence',
          '<strong>Assessment Objective 2:</strong> Weighing institutional vs individual factors',
        ],
      },
    ],
    timeline: [
      { year: '1895', event: 'Wilhelm Röntgen accidentally discovers X-rays in Würzburg.' },
      {
        year: '1909',
        event:
          'Paul Ehrlich and Sahachiro Hata discover Salvarsan 606 for syphilis (first magic bullet).',
      },
      {
        year: '1928',
        event: 'Alexander Fleming discovers penicillin mold destroying Staphylococcus bacteria.',
      },
      {
        year: '1932',
        event: 'Gerhard Domagk discovers Prontosil, curing puerperal fever and blood poisoning.',
      },
      {
        year: '1941',
        event: 'Howard Florey and Ernst Chain successfully test penicillin on Albert Alexander.',
      },
      {
        year: '1948',
        event:
          'National Health Service (NHS) launched across Britain under Minister Aneurin Bevan.',
      },
      {
        year: '1950',
        event:
          'Doll and Hill publish epidemiological study linking cigarette smoking to lung cancer.',
      },
      {
        year: '1953',
        event: 'Francis Crick and James Watson discover the double-helix structure of DNA.',
      },
      {
        year: '1972',
        event: 'Godfrey Hounsfield develops the first clinical CT scanner at EMI Laboratories.',
      },
      {
        year: '2003',
        event: 'The Human Genome Project completes sequencing of all 3 billion DNA base pairs.',
      },
      {
        year: '2007',
        event: 'UK Government passes ban on smoking in all enclosed public work and social venues.',
      },
    ],
    keyFigures: [
      {
        name: 'Rosalind Franklin',
        dates: '1920–1958',
        role: 'Physical Chemist & X-ray Crystallographer',
        portrait: 'images/dna_structure.jpg',
        significance:
          'Captured "Photograph 51" in 1952 at King’s College London, providing the definitive experimental evidence proving the double-helix structure of DNA.',
        actions: [
          '<strong>Photograph 51 (1952):</strong> Captured iconic X-ray diffraction image demonstrating helical dimensions and phosphate backbone of DNA.',
          '<strong>Crucial Proof:</strong> Her rigorous crystallographic calculations enabled Watson and Crick to complete their 3D molecular model.',
          '<strong>Posthumous Recognition:</strong> Died of ovarian cancer at age 37, before the Nobel Prize was awarded in 1962.',
        ],
      },
      {
        name: 'Wilhelm Röntgen',
        dates: '1845–1923',
        role: 'Professor of Physics at Würzburg',
        portrait: 'images/rontgen_first_xray.jpg',
        significance:
          'Discovered X-rays in 1895, revolutionizing medical diagnosis by enabling doctors to inspect internal bone fractures and foreign objects non-invasively.',
        actions: [
          '<strong>Discovered X-Rays (1895):</strong> Noticed barium platinocyanide screens glowing while experimenting with cathode ray tubes in dark room.',
          '<strong>First Medical Radiograph:</strong> Photographed his wife Anna Bertha’s hand, clearly displaying her finger bones and wedding ring.',
          '<strong>Refused Patent:</strong> Deliberately refused to patent his discovery so the entire medical profession could build X-ray units freely.',
        ],
      },
      {
        name: 'Paul Ehrlich',
        dates: '1854–1915',
        role: 'German Physician & Immunologist',
        portrait: 'images/paul_ehrlich_lab.jpg',
        significance:
          'Pioneered targeted chemotherapy by discovering Salvarsan 606 (1909), the first "magic bullet" that destroyed specific syphilis microbes inside human tissue.',
        actions: [
          '<strong>Chemical Affinity Concept:</strong> Hypothesized that synthetic chemical dyes could seek out and kill specific microbes without harming host cells.',
          '<strong>Salvarsan 606 (1909):</strong> Screened hundreds of arsenic compounds with Sahachiro Hata, identifying compound 606 as cure for syphilis.',
          '<strong>Founded Chemotherapy:</strong> Established the principle of targeted synthetic pharmacology that led directly to Domagk’s Prontosil (1932).',
        ],
      },
      {
        name: 'Alexander Fleming',
        dates: '1881–1955',
        role: 'Scottish Bacteriologist at St Mary’s Hospital',
        portrait: 'images/fleming_petri_dish.jpg',
        significance:
          'Discovered the antibiotic properties of penicillin in 1928 when Penicillium notatum spore contaminated a Staphylococcus culture dish.',
        actions: [
          '<strong>1928 Accidental Discovery:</strong> Observed clear halo where penicillin mould spores had dissolved bacterial colonies on agar plate.',
          '<strong>Proved Non-Toxicity:</strong> Demonstrated that raw penicillin juice killed lethal bacteria without damaging human white blood cells.',
          '<strong>Published Findings (1929):</strong> Published discovery in British Journal of Experimental Pathology, but lacked chemical resources to purify it.',
        ],
      },
      {
        name: 'Aneurin Bevan',
        dates: '1897–1960',
        role: 'Minister of Health in Attlee Labour Government',
        portrait: 'images/nhs_established.jpg',
        significance:
          'Welsh statesman who founded the National Health Service in 1948, overcoming fierce BMA doctor opposition to guarantee universal healthcare.',
        actions: [
          '<strong>Founded the NHS (5 July 1948):</strong> Established healthcare free at the point of need, funded entirely by central taxation.',
          '<strong>Overcame BMA Resistance:</strong> "Stuffed their mouths with gold" by permitting senior hospital consultants to retain lucrative private patients.',
          '<strong>Nationalized Hospitals:</strong> Brought 2,688 voluntary and municipal hospitals into single unified national healthcare system.',
        ],
      },
    ],
    conceptSpotlights: [
      {
        category: 'GENOMICS',
        title: 'The DNA Revolution & The Human Genome Project',
        body: 'In 1953, James Watson and Francis Crick, building on Rosalind Franklin’s X-ray crystallography, discovered the double-helix structure of DNA. This revealed that heredity was governed by a universal chemical code of four bases (A, T, C, G). Between 1990 and 2003, the international Human Genome Project successfully mapped all 3 billion base pairs, allowing modern physicians to identify genetic predispositions to breast cancer (BRCA1/2) and develop bespoke gene therapies.',
        takeaway:
          'Exam Anchor: Modern medicine shifted from treating external bacterial invaders to correcting internal cellular and genetic flaws.',
      },
      {
        category: 'MEDICAL TECHNOLOGY',
        title: 'Non-Invasive Diagnostic Technology: From X-Rays to MRI',
        body: 'Throughout history, diagnosis depended on subjective bedside observation or surgical exploratory laparotomy. The 20th century transformed diagnosis through non-invasive physical imaging: Wilhelm Röntgen’s X-rays (1895) allowed bone visualization; Godfrey Hounsfield’s CT scanners (1972) created 3D cross-sectional tissue slices; and MRI scanners (1977) used magnetic fields and radio waves to visualize soft brain tissue and tumors without ionizing radiation.',
        takeaway:
          'Core Pedagogical Point: Diagnostic imaging eliminated exploratory surgery and allowed early disease detection before symptoms manifest.',
      },
      {
        category: 'PHARMACOLOGY',
        title: 'Magic Bullets vs Broad-Spectrum Antibiotics',
        body: 'Before 1900, antiseptic chemicals like carbolic acid killed bacteria on contact, but also destroyed living human flesh, meaning they could not be injected internally. Paul Ehrlich invented the concept of "magic bullets": synthetic chemicals targeting specific pathogens like Salvarsan 606 for syphilis. Fleming, Florey, and Chain revolutionized this by developing penicillin, a natural antibiotic produced by fungi that safely cured broad-spectrum bacterial infections.',
        takeaway:
          'Key Distinction: Magic bullets are synthetic chemical compounds; antibiotics are natural antimicrobial substances produced by microorganisms.',
      },
      {
        category: 'INDUSTRIAL PRODUCTION',
        title: 'The Industrial Scale of Penicillin: Florey, Chain & WWII',
        body: 'Fleming discovered penicillin in 1928, but could not extract enough stable liquid to treat humans. In 1938, Oxford scientists Howard Florey and Ernst Chain purified penicillin, testing it on Albert Alexander in 1941. With British factories bombed by the Luftwaffe, Florey traveled to the United States. The US War Production Board enlisted massive pharmaceutical giants (Pfizer) to brew penicillin in 14-tank corn-steep liquor vats, producing 2.3 million doses for D-Day (1944).',
        takeaway:
          'Historiographical Factor: Industrial mass-production, government wartime finance, and US chemical technology turned penicillin into a reality.',
      },
      {
        category: 'PREVENTIVE LEGISLATION',
        title: 'Public Health & Lifestyle: The Anti-Smoking Crusade',
        body: 'In the 20th century, causes of mortality shifted from infectious epidemics to chronic lifestyle diseases. In 1950, Richard Doll and Austin Bradford Hill proved scientifically that smoking tobacco was directly causal to lung cancer. British governments responded with comprehensive statutory intervention: banning cigarette advertising on television (1965), imposing heavy fiscal taxation, mandating graphic health warnings (2002), and banning smoking in enclosed public spaces (2007).',
        takeaway:
          'Modern Public Health Principle: Government action transitioned from sanitary infrastructure (sewers) to public education and behavioral regulation.',
      },
    ],
  },

  western_front: {
    id: 'western_front',
    title: 'The British Sector of the Western Front, 1914–1918',
    period: '1914–1918',
    specCode: '1HI0/11: Historic Environment &bull; Western Front Surgery & Treatment',
    lessonStart: 20,
    lessonEnd: 26,
    lessonCount: 6,
    pageCount: 14,
    coverImage: 'units/edexcel_medicine/assets/authentic_western_front.jpg',
    coverTitle: 'THE BRITISH SECTOR OF THE WESTERN FRONT (1914–1918)',
    coverSubtitle: 'Historic Environment: Trench Trauma, Evacuation & Surgical Breakthroughs',
    specMatrix: [
      {
        header: 'CORE SPECIFICATION ENQUIRIES',
        items: [
          '<strong>L21:</strong> Theatre of War: Trench Geography & Battles',
          '<strong>L22:</strong> Trench Environment: Mud, Vermin & Illnesses',
          '<strong>L23:</strong> Battlefield Trauma: Shrapnel, Gas & Infection',
          '<strong>L24:</strong> Chain of Evacuation: Bearers, RAP, Dressing & CCS',
          '<strong>L25:</strong> Surgical Breakthroughs: Thomas Splint & X-Rays',
          '<strong>L26:</strong> Lifesaving Innovations: Blood Banks & Plastic Surgery',
        ],
      },
      {
        header: 'HISTORIC ENVIRONMENT CONCEPTS',
        items: [
          '<strong>The Salient Vulnerability:</strong> Concentric artillery fire',
          '<strong>Fertilised Soil Ecology:</strong> Gas gangrene & tetanus spores',
          '<strong>Triage & Evacuation Speed:</strong> Stretcher relays to Base Hospitals',
          '<strong>Biomechanical Fixation:</strong> Hugh Owen Thomas splint traction',
          '<strong>Blood Preservation:</strong> Oswald Robertson’s 1917 Cambrai depot',
        ],
      },
      {
        header: 'EDEXCEL SECTION A EXAMINATION BLUEPRINT',
        items: [
          '<strong>Q1(a):</strong> Describe one feature of... [2 marks]',
          '<strong>Q1(b):</strong> Describe one feature of... [2 marks]',
          '<strong>Q2(a):</strong> Utility of Sources A & B [8 marks]',
          '<strong>Q2(b):</strong> 4-Prompt Follow-Up Investigation [4 marks]',
          '<em>Mandatory Follow-Up Prompts: Detail, Question, Source, Purpose</em>',
        ],
      },
    ],
    timeline: [
      {
        year: 'Oct–Nov 1914',
        event:
          'First Battle of Ypres; British establish the Ypres Salient; trench system solidifies.',
      },
      {
        year: 'Apr–May 1915',
        event: 'Second Battle of Ypres; German army deploys chlorine gas for the first time.',
      },
      {
        year: 'Dec 1915',
        event:
          'Thomas Splint introduced on Western Front, slashing compound femur mortality from 80% to 20%.',
      },
      {
        year: 'Jul–Nov 1916',
        event:
          'Battle of the Somme; 57,000 British casualties on Day 1; CCS triage tested to extremes.',
      },
      {
        year: 'Apr–May 1917',
        event:
          "Battle of Arras; British utilize subterranean limestone quarries (Thompson's Cave 700-bed hospital).",
      },
      {
        year: 'Jul–Nov 1917',
        event:
          'Third Battle of Ypres (Passchendaele); liquid mud neutralizes motor ambulances; stretcher relay teams.',
      },
      {
        year: 'Nov 1917',
        event:
          "Battle of Cambrai; Oswald Hope Robertson establishes world's first mobile blood bank with sodium citrate.",
      },
      {
        year: '1917–1918',
        event:
          "Harold Gillies pioneers facial reconstructive plastic surgery at Queen's Hospital in Sidcup.",
      },
    ],
    keyFigures: [
      {
        name: 'Field Marshal Douglas Haig',
        dates: '1861–1928',
        role: 'Commander-in-Chief of the British Expeditionary Force',
        portrait: 'images/cheshire_regiment_trench.png',
        significance:
          'British military commander whose tactical offensives (Somme 1916, Passchendaele 1917) forced the RAMC to scale medical evacuation to handle hundreds of thousands of casualties.',
        actions: [
          '<strong>Industrial Offensives:</strong> Directed the massive artillery bombardments that tore up drainage systems and created liquid mud at Ypres.',
          '<strong>RAMC Integration:</strong> Mandated dedicated railway sidings and ambulance trains for rapid transfer of wounded soldiers from CCS to Base Ports.',
          '<strong>Sanitation Directives:</strong> Enforced strict discipline regarding trench foot inspections, whale oil rubs, and dry socks across frontline battalions.',
        ],
      },
      {
        name: 'Captain John Challenor',
        dates: '1888–1962',
        role: 'RAMC Regimental Medical Officer (RMO)',
        portrait: 'images/stretcher_bearers_passchendaele.jpg',
        significance:
          'Exemplified the frontline courage of RAMC doctors managing Regimental Aid Posts (RAP) within 200 yards of the German frontline under constant shellfire.',
        actions: [
          '<strong>Firstline Triage:</strong> Patched severe shrapnel wounds, administered morphine, and sorted wounded into walking cases and stretcher cases.',
          '<strong>Coordinated Stretcher Bearers:</strong> Dispatched bearer squads into No Man’s Land under darkness to retrieve fallen comrades from crater zones.',
          '<strong>Sanitary Maintenance:</strong> Inspected latrines, chlorination of water carts, and delousing regimes to prevent non-battle attrition.',
        ],
      },
      {
        name: 'Hugh Owen Thomas',
        dates: '1834–1891',
        role: 'Pioneering Orthopedic Surgeon of Wales',
        portrait: 'images/thomas_splint_authentic.jpg',
        significance:
          'Designed the Thomas Splint; adapted for frontline use in 1915 by his nephew Sir Robert Jones, reducing compound femur fracture mortality from 80% to 20%.',
        actions: [
          '<strong>Biomechanical Traction:</strong> Designed rigid metal frame that exerted constant mechanical traction, preventing broken bone ends from grinding.',
          '<strong>Hemorrhage Prevention:</strong> Stopped jagged bone fragments from severing the femoral artery during bumpy horse-drawn ambulance transit.',
          '<strong>Universal Western Front Adoption:</strong> Distributed to all frontline stretcher bearer units by 1916, saving tens of thousands of lives.',
        ],
      },
      {
        name: 'Oswald Hope Robertson',
        dates: '1886–1966',
        role: 'US Army Medical Officer with RAMC',
        portrait: 'images/robertson_blood_depot_1917.jpg',
        significance:
          'Invented the first mobile blood bank at the Battle of Cambrai in 1917 by combining sodium citrate anticoagulant and glucose preservative in iced ammunition boxes.',
        actions: [
          '<strong>Citrated Blood Storage:</strong> Mixed collected donor blood with sodium citrate to prevent coagulation, storing it up to 26 days on ice.',
          '<strong>First Battlefield Blood Depot:</strong> Stored 22 units of universal donor blood in iced metal crates, reviving 20 of 22 severely hemorrhaging soldiers.',
          '<strong>Eliminated Person-to-Person Need:</strong> Transformed transfusion from direct vein-to-vein operation into pre-collected emergency field therapy.',
        ],
      },
      {
        name: 'Harold Gillies',
        dates: '1882–1960',
        role: 'RAMC Surgeon & Father of Modern Plastic Surgery',
        portrait: 'images/gillies_tubed_pedicle.jpg',
        significance:
          'Pioneered reconstructive facial plastic surgery for soldiers disfigured by hot shrapnel and shell fragments at Queen’s Hospital in Sidcup.',
        actions: [
          '<strong>Tubed Pedicle Technique:</strong> Kept skin flaps connected to original blood supply inside rolled tubes, reducing infection during transfer.',
          '<strong>Queen’s Hospital, Sidcup (1917):</strong> Established specialized 1,000-bed reconstructive hospital, treating over 11,000 disfigured soldiers.',
          '<strong>Restored Psychological Dignity:</strong> Designed specialized masks and facial reconstructions, reintegrating severely maimed men into civilian life.',
        ],
      },
      {
        name: 'Harvey Cushing',
        dates: '1869–1939',
        role: 'Pioneering American Neurosurgeon with BEF',
        portrait: 'images/casualty_clearing_station_ww1.jpg',
        significance:
          'Pioneered specialized frontline brain surgery using local anesthesia and electromagnets, slashing head wound mortality from 50% to 28% at the 46th CCS.',
        actions: [
          '<strong>Electromagnet Extraction:</strong> Used magnetic probes to extract deeply embedded metallic shell splinters from brain tissue.',
          '<strong>Local Anesthesia:</strong> Operated with local cocaine anesthesia instead of general anesthetic, preventing fatal brain swelling and intracranial pressure.',
          '<strong>High-Volume Casualty Care:</strong> Operated on 45 consecutive head cases during Third Ypres, documenting meticulous surgical recovery data.',
        ],
      },
    ],
    conceptSpotlights: [
      {
        category: 'TACTICAL GEOGRAPHY',
        title: 'The Ypres Salient: Concentric Artillery Vulnerability',
        body: 'A salient is a military bulge where friendly troops are surrounded on three sides by enemy territory. In the Ypres Salient, the German army held the high ground on the surrounding ridges (Passchendaele, Messines), allowing forward observers to direct concentrated, plunging artillery fire directly into British communication trenches, dressing stations, and transport roads from three directions simultaneously.',
        takeaway:
          'Historic Environment Feature: Evacuation routes in the Salient were under direct German visual and artillery surveillance day and night.',
      },
      {
        category: 'PATHOLOGY & SOIL',
        title: 'Manured Soil & The Terror of Gas Gangrene',
        body: 'The farmland of Flanders and the Somme had been intensively manured for centuries, heavily saturating the topsoil with anaerobic bacterial spores, specifically Clostridium tetani (tetanus) and Clostridium perfringens (gas gangrene). When high-explosive shrapnel slammed into soldiers, it dragged dirty muddy uniform cloth deep into mangled muscular tissue, creating dark, oxygen-free conditions where flesh-eating gas gangrene flourished within hours.',
        takeaway:
          'Key Surgical Consequence: Antiseptics failed on battlefield wounds; surgeons had to develop wound debridement and excision.',
      },
      {
        category: 'MILITARY EVACUATION',
        title: 'The Triage Hierarchy: RAP to Base Hospital',
        body: 'The RAMC Chain of Evacuation was a strict triage pipeline: (1) Regimental Aid Post (RAP) within 200m of front lines for immediate bandaging; (2) Advanced Dressing Station (ADS) for anti-tetanus injections; (3) Casualty Clearing Station (CCS) situated near railheads outside artillery range for major lifesaving surgery; and (4) Base Hospitals at coastal ports (Calais, Boulogne) for long-term recovery or evacuation to "Blighty" via hospital ships.',
        takeaway:
          'Exam Core Concept: The CCS became the most vital surgical engine of the Western Front, performing 80% of all operations.',
      },
      {
        category: 'BIOMECHANICAL INNOVATION',
        title: 'The Thomas Splint: Overcoming 80% Femur Mortality',
        body: 'In 1914, 80% of all soldiers who suffered a compound femur fracture from shell fragments died. As horse-drawn ambulances jolted over shell-cratered roads, broken bone ends ground against each other, tearing the femoral artery and causing massive internal hemorrhage and fatal hypovolemic shock. Hugh Owen Thomas’s splint held the leg in rigid continuous mechanical traction, keeping bone ends apart and reducing mortality to 20% by 1916.',
        takeaway:
          'Specification Anchor: The Thomas Splint is the definitive Edexcel example of practical biomechanical innovation on the Western Front.',
      },
      {
        category: 'HEMATOLOGY',
        title: "Oswald Robertson's Mobile Blood Depot at Cambrai (1917)",
        body: "Early in WWI, blood transfusions were impossible in frontline trenches because blood coagulated immediately outside the body, requiring dangerous person-to-person donor linkage. In 1915, Richard Lewisohn discovered that adding sodium citrate prevented clotting, while Francis Rous and J.R. Turner showed adding glucose preserved red blood cells for weeks. In 1917, US Captain Oswald Hope Robertson created the world's first mobile blood depot for the Battle of Cambrai.",
        takeaway:
          'Key Innovation: Allowed stored universal Group O blood to be stockpiled in advance of massive offensives.',
      },
      {
        category: 'RECONSTRUCTIVE SURGERY',
        title: 'The Plastic Revolution: Harold Gillies at Sidcup',
        body: "Unlike past wars where soldiers were shot with musket balls, Western Front troops faced steel shrapnel and thousands of high-velocity shell fragments. Because men peered over parapets, facial wounds were epidemic, leaving thousands horrifically mutilated. At Queen's Hospital in Sidcup (opened 1917), Dr Harold Gillies pioneered facial reconstruction using the 'tubed pedicle'—a skin flap rolled into a tube that maintained blood supply while grafting new jaws, noses, and cheeks.",
        takeaway:
          'Historiographical Significance: Established modern plastic and reconstructive surgery as a dedicated medical discipline.',
      },
    ],
  },
};

module.exports = { MEDICINE_ERAS };
