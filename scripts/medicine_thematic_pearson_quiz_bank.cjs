/**
 * medicine_thematic_pearson_quiz_bank.cjs
 *
 * Official Pearson Edexcel GCSE History Paper 1 (Section B: Thematic Study)
 * Medicine in Britain, c1250–present: Master Knowledge Retrieval Bank.
 * Exactly 20 Lessons x 10 Questions = 200 High-Yield Retrieval Questions.
 *
 * Pedagogical Standards:
 * 1. 100% Fidelity to the Pearson Edexcel Specification and Revision Guide.
 * 2. High-Yield Retrieval: Key concepts, individuals, treatments, preventions, institutions, and turning points.
 * 3. Two-Line Format: Line 1 = Key Fact (concise anchor); Line 2 = Historical Explanation (why it matters).
 * 4. Structured across the 4 core chronological eras (5 lessons each):
 *    - Medieval Britain (c1250–c1500): Lessons 1–5
 *    - The Medical Renaissance (c1500–c1700): Lessons 6–10
 *    - 18th and 19th Century Britain (c1700–c1900): Lessons 11–15
 *    - Modern Britain (c1900–present): Lessons 16–20
 */

const MEDICINE_THEMATIC_QUIZ_BANK = [
  // =========================================================================
  // ERA 1: MEDIEVAL BRITAIN (c1250–c1500)
  // =========================================================================

  // LESSON 1 (KT1.1): Supernatural & Religious Explanations of Disease
  {
    num: 1,
    id: 'lesson_1_1',
    era: 'medieval',
    eraName: 'Medieval Britain (c1250–c1500)',
    title: 'Supernatural & Religious Explanations of Disease',
    enquiry: 'Why Did Medieval Society Believe That Illness Was Sent Directly by God?',
    questions: [
      {
        q: 'What did medieval people believe was the primary supernatural cause of disease?',
        a: 'God was punishing individuals for personal sins or testing their Christian faith',
        exp: 'Illness was viewed as divine retribution, meaning recovery required repentance, prayer, and devotion.',
      },
      {
        q: 'Why did the medieval Catholic Church hold an intellectual monopoly over medical education?',
        a: 'Monks controlled scriptoria (book copying) and university faculties taught only Church-approved texts',
        exp: 'Challenging official medical dogma was treated as heresy against religious and papal authority.',
      },
      {
        q: 'Which Franciscan friar was imprisoned in 1277 for advocating empirical scientific observation?',
        a: 'Roger Bacon',
        exp: 'Imprisoned by Church leaders for promoting experimental observation rather than unquestioning acceptance of ancient texts.',
      },
      {
        q: 'What astrological event in March 1345 was widely blamed by medieval scholars for causing pestilence?',
        a: 'A conjunction of the three planets Saturn, Jupiter, and Mars in the sign of Aquarius',
        exp: 'Believed to have generated toxic celestial corruptions that descended to earth as deadly miasma.',
      },
      {
        q: 'What medical reference book containing planetary charts and calendars did physicians carry?',
        a: 'An almanac (or Vademecum)',
        exp: 'Used to calculate auspicious celestial alignments before administering bloodletting or complex herbal purges.',
      },
      {
        q: 'What was the concept of "miasma" in medieval medical thinking?',
        a: 'Foul air corrupted by rotting vegetation, swamps, corpses, or excrement that poisoned the body',
        exp: 'Prompted wealthy citizens to carry sweet-smelling posies and light aromatic fires to purify infected atmosphere.',
      },
      {
        q: 'What physical condition did medieval people believe demonstrated divine punishment for sinful pride?',
        a: 'Leprosy',
        exp: 'Lepers were forced to carry bells or wooden clappers and live in isolated lazar houses outside town walls.',
      },
      {
        q: 'What religious activity was undertaken by groups of flagellants during epidemics of pestilence?',
        a: 'Publicly whipping themselves with knotted leather scourges tipped with metal points',
        exp: 'Sought to appease God’s divine anger by voluntary bodily suffering to stop the spread of disease.',
      },
      {
        q: 'Why did medieval priests believe treating the soul was far more important than treating the physical body?',
        a: 'The immortal soul faced eternal salvation in heaven or damnation in hell, while the mortal body was temporary',
        exp: 'Confession, absolution, and the last rites took total priority over surgical or pharmaceutical cures.',
      },
      {
        q: 'What role did medieval astrology diagrams like the "Zodiac Man" (Homo Signorum) play in clinical care?',
        a: 'Illustrated which celestial zodiac constellations governed specific organs and limbs of the human body',
        exp: 'Surgeons refused to make incisions or bleed a patient when the governing zodiac sign was in ascendancy.',
      },
    ],
  },

  // LESSON 2 (KT1.2): Rational Explanations: Hippocrates, Galen & The Four Humours
  {
    num: 2,
    id: 'lesson_1_2',
    era: 'medieval',
    eraName: 'Medieval Britain (c1250–c1500)',
    title: 'Rational Explanations: Hippocrates, Galen & The Four Humours',
    enquiry: 'How Did the Ancient Theories of the Four Humours Shape Medieval Rational Medicine?',
    questions: [
      {
        q: 'Name the Four Humours identified by ancient Greek physician Hippocrates of Kos.',
        a: 'Blood, Phlegm, Yellow Bile (Choler), and Black Bile (Melancholy)',
        exp: 'Good health was maintained when all four fluids existed in perfect biological equilibrium within the body.',
      },
      {
        q: 'Which qualities and seasons were associated with the humour of Blood?',
        a: 'Hot and Wet, associated with the season of Spring and the element of Air',
        exp: 'Excess blood produced a ruddy complexion, fever, and a passionate, optimistic (sanguine) temperament.',
      },
      {
        q: 'Which 2nd-century Roman imperial doctor expanded humoural theory by introducing the "Theory of Opposites"?',
        a: 'Claudius Galen',
        exp: 'Argued that illnesses caused by an excess of one quality should be balanced by its direct opposite (e.g. cold phlegm treated with hot chilli).',
      },
      {
        q: 'Why did the medieval Christian Church enthusiastically adopt and preserve the medical writings of Galen?',
        a: 'Galen argued teleologically that every human organ had been purposefully designed by a single divine Creator',
        exp: 'His monotheistic anatomical design argument perfectly matched Christian theology and Genesis creation doctrine.',
      },
      {
        q: 'What common anatomical mistake did Galen make because Roman law forbade dissecting human cadavers?',
        a: 'He dissected pigs, dogs, and Barbary apes, assuming their anatomy was identical to humans (e.g. two-piece lower jaw)',
        exp: 'These animal-derived anatomical errors remained dogma in European medical training for over 1,300 years.',
      },
      {
        q: 'What diagnostic procedure involved inspecting the color, clarity, and taste of a patient’s urine?',
        a: 'Uroscopy (using a circular urine chart)',
        exp: 'Physicians believed the hue and sediment of urine revealed exactly which humour was unbalanced in internal organs.',
      },
      {
        q: 'What clinical method did Hippocrates pioneer that became the foundation of modern diagnosis?',
        a: 'Systematic clinical observation of symptoms at the patient’s bedside',
        exp: 'Recorded the detailed natural progression of symptoms rather than relying immediately on supernatural omens.',
      },
      {
        q: 'What ethical code established by Hippocrates required medical practitioners to protect patient welfare?',
        a: 'The Hippocratic Oath ("First, do no harm")',
        exp: 'Bound physicians to professional confidentiality, ethical practice, and dedicated patient care.',
      },
      {
        q: 'Why did Galen believe blood moved through the human septum between the ventricles of the heart?',
        a: 'He claimed blood passed through invisible microscopic pores in the muscular septum',
        exp: 'An incorrect assumption that blinded European anatomy until William Harvey proved systemic circulation in 1628.',
      },
      {
        q: 'Why was the Theory of the Four Humours considered a "rational" medical idea in the medieval period?',
        a: 'It explained disease through observable natural physical fluids rather than invisible spirits, demons, or curses',
        exp: 'Provided a logical, structured biological system for understanding sickness, even though medically incorrect.',
      },
    ],
  },

  // LESSON 3 (KT1.3): Approaches to Prevention & Treatment: Rituals, Bleeding & Purging
  {
    num: 3,
    id: 'lesson_1_3',
    era: 'medieval',
    eraName: 'Medieval Britain (c1250–c1500)',
    title: 'Approaches to Prevention & Treatment: Rituals, Bleeding & Purging',
    enquiry:
      'What Practical Treatments and Preventative Regimes Were Used to Restore Humoural Balance?',
    questions: [
      {
        q: 'What was the most widespread humoural treatment used by medieval physicians and barber-surgeons?',
        a: 'Phlebotomy (bloodletting)',
        exp: 'Aimed to evacuate excess hot, wet blood to restore humoural balance during fevers and inflammatory illnesses.',
      },
      {
        q: 'Name the three primary practical methods used by medieval practitioners to extract blood from patients.',
        a: 'Veinesection (opening a vein with a fleam), Cupping (heated glass cups), and Leeches',
        exp: 'Different methods were chosen depending on the patient’s age, social status, illness, and physical weakness.',
      },
      {
        q: 'What digestive treatment was routinely administered to purge corrupt humours from the stomach and intestines?',
        a: 'Laxatives (such as senna, rhubarb, and aloes) and Emetics (to induce vomiting)',
        exp: 'Purging was believed to physically sweep poisonous humours and corrupted bile out of the digestive tract.',
      },
      {
        q: 'What ancient health guide offered personalized advice on diet, rest, hygiene, and the "Six Non-Naturals"?',
        a: 'The Regimen Sanitatis (Rule of Health)',
        exp: 'Originated in Salerno and urged people to balance air, exercise, sleep, diet, excretion, and mental emotions.',
      },
      {
        q: 'What widely used medieval universal antidote combined over 60 crushed herbs, spices, and viper flesh?',
        a: 'Theriac (or Venice Treacle)',
        exp: 'Regarded as a powerful compound medication capable of neutralising poisons and treating deadly pestilence.',
      },
      {
        q: 'What preventative measure was taken in wealthy homes to combat miasmatic, foul-smelling air?',
        a: 'Burning aromatic herbs (lavender, rosemary) and carrying pomanders filled with fragrant spices',
        exp: 'Believed sweet scents actively purified airborne corruptions before they entered the respiratory system.',
      },
      {
        q: 'What religious actions did sick individuals perform in the hope of securing miraculous divine healing?',
        a: 'Undertaking pilgrimages to holy shrines (e.g. Canterbury) and touching relics of Christian saints',
        exp: 'Believed divine intervention by saints like Thomas Becket could cure chronic blindness, paralysis, and fever.',
      },
      {
        q: 'What surgical procedure involved drilling or scraping a hole through the patient’s skull?',
        a: 'Trephining (trepanning)',
        exp: 'Used to relieve internal pressure from head wounds or release trapped demons and evil humours causing madness.',
      },
      {
        q: 'Why was cauterisation with red-hot irons widely feared by medieval surgical patients?',
        a: 'It involved searing open flesh and amputated stumps to burn tissues and stop blood hemorrhage',
        exp: 'Extremely agonizing without anesthesia, frequently causing fatal surgical shock, infection, and tissue death.',
      },
      {
        q: 'What were medieval "herbals" and how did ordinary households utilize them?',
        a: 'Illustrated books listing the medicinal properties of plants, herbs, and roots for homemade remedies',
        exp: 'Helped women prepare traditional herbal infusions, poultices, and syrups to treat family ailments at home.',
      },
    ],
  },

  // LESSON 4 (KT1.4): Medical Care Providers & Monastic Hospitals: ‘Care Not Cure’
  {
    num: 4,
    id: 'lesson_1_4',
    era: 'medieval',
    eraName: 'Medieval Britain (c1250–c1500)',
    title: 'Medical Care Providers & Monastic Hospitals: ‘Care Not Cure’',
    enquiry:
      'Who Provided Medical Care in Medieval Britain and What Was the Purpose of Monastic Hospitals?',
    questions: [
      {
        q: 'What core phrase defines the institutional philosophy and medical purpose of medieval English hospitals?',
        a: '“Care Not Cure”',
        exp: 'Hospitals aimed to provide spiritual hospitality, warmth, and clean bedding rather than active medical cures.',
      },
      {
        q: 'Who staffed and funded the majority of the 500+ hospitals operating in England by 1400?',
        a: 'Monks, nuns, and religious orders, funded through charitable Church endowments and wealthy wills',
        exp: 'Institutions were monastic houses governed by Christian charity, prayer cycles, and monastic discipline.',
      },
      {
        q: 'Name four categories of patients who were routinely turned away from medieval monastic hospitals.',
        a: 'The infectious (plague victims), the insane (lunatics), pregnant women, and terminal sufferers',
        exp: 'Turned away to prevent contagion and maintain a quiet, prayerful environment focused on spiritual preparation for death.',
      },
      {
        q: 'What medical practitioner possessed university degrees, charged high fees, and diagnosed internal imbalances?',
        a: 'The University-Trained Physician',
        exp: 'Trained for up to 10 years in Latin reading Galen and Hippocrates; consulted only by the wealthy nobility.',
      },
      {
        q: 'What was the professional role and practical expertise of the medieval Barber-Surgeon?',
        a: 'Carried out manual surgery (bloodletting, tooth pulling, lance boils, setting fractures, amputations)',
        exp: 'Learned practical skills via apprenticeships; lacked university Latin and were viewed as socially inferior to physicians.',
      },
      {
        q: 'What was the primary function of an Apothecary in a medieval market town?',
        a: 'Mixed and dispensed herbal preparations, ointments, laxatives, and theriac prescribed by physicians or bought directly',
        exp: 'Cheaper than university physicians, giving common citizens accessible pharmaceutical treatments.',
      },
      {
        q: 'Who provided the vast majority of day-to-day healthcare for poor peasant families in rural villages?',
        a: 'Local Wise Women, herbalists, and female family members in the home',
        exp: 'Passed down practical knowledge of herbal concoctions, midwifery, and poultices across generations.',
      },
      {
        q: 'What famous London hospital was founded in 1123 by Rahere to care for poor, sick citizens?',
        a: 'St Bartholomew’s Hospital',
        exp: 'Remained an enduring charitable hospital providing shelter and basic care through the medieval and early modern eras.',
      },
      {
        q: 'What specialized medical institution was established outside town walls specifically for leprosy victims?',
        a: 'A Lazar House (or Leper Hospital)',
        exp: 'Isolated contagious lepers from healthy urban populations while providing sheltered communal living and prayer.',
      },
      {
        q: 'Why was the architectural layout of monastic hospital wards designed around an altar or chapel?',
        a: 'So bedridden patients could see and hear the daily Catholic Mass and prayers from their beds',
        exp: 'Reinforced the belief that spiritual devotion and repentance were vital to the health and salvation of the soul.',
      },
    ],
  },

  // LESSON 5 (KT1.5): Case Study: Dealing with the Black Death (1348–1349)
  {
    num: 5,
    id: 'lesson_1_5',
    era: 'medieval',
    eraName: 'Medieval Britain (c1250–c1500)',
    title: 'Case Study: Dealing with the Black Death (1348–1349)',
    enquiry: 'How Did Medieval Society React to the Catastrophe of the Black Death in 1348?',
    questions: [
      {
        q: 'In what year and at which Dorset port did the Black Death first arrive in England from continental Europe?',
        a: 'June 1348 at Melcombe Regis (Weymouth)',
        exp: 'Spread inland rapidly along trade routes, reaching London by autumn 1348 and killing 30–45% of the population.',
      },
      {
        q: 'What biological pathogen and insect vector caused the Black Death, though unknown to medieval doctors?',
        a: 'Yersinia pestis bacteria, transmitted by bites from infected fleas living on black rats (Rattus rattus)',
        exp: 'Medieval people had no knowledge of bacteria or fleas, instead blaming astrology, divine anger, and miasma.',
      },
      {
        q: 'Name the two distinct clinical forms of the plague identified by French surgeon Guy de Chauliac in 1348.',
        a: 'Bubonic plague (painful buboes in groin/armpits) and Pneumonic plague (contagious coughing of bloody sputum)',
        exp: 'Pneumonic plague attacked the respiratory system directly through airborne droplets and had a 100% fatality rate.',
      },
      {
        q: 'What supernatural explanations were universally adopted by Church authorities to explain the epidemic?',
        a: 'God’s wrath provoked by human sins, greed, blasphemy, and vanity across English society',
        exp: 'Prompted King Edward III and the Archbishop of Canterbury to order special penitential church services and fasting.',
      },
      {
        q: 'What practical public health action was taken by the civic authorities of Gloucester during the outbreak?',
        a: 'Attempted to shut town gates and enforce quarantine by refusing admission to anyone arriving from infected Bristol',
        exp: 'Demonstrated an early administrative understanding of contagion, though the cordon failed to keep out the plague.',
      },
      {
        q: 'What did the City of London authorities do to manage the overwhelming volume of corpses?',
        a: 'Dug giant mass burial trenches outside the city walls (e.g. at East Smithfield) and banned street butchery',
        exp: 'Sought to remove putrefying corpses and foul waste to eliminate miasmatic stench from urban neighborhoods.',
      },
      {
        q: 'What bizarre physical treatments did medieval healers apply directly to burst swollen plague buboes?',
        a: 'Stapping live plucked chickens or toads to buboes, or cutting them open with hot lancets and applying pigeon dung',
        exp: 'Believed these items drew out virulent poisons, but in reality increased secondary septic infection and agony.',
      },
      {
        q: 'Why did many priests and doctors abandon their duties during the peak of the epidemic in 1348–49?',
        a: 'Terror of catching the fatal disease by visiting sickrooms, leading to high mortality among frontline clergy',
        exp: 'Left thousands of dying victims without the Catholic last rites or basic care, fracturing social cohesion.',
      },
      {
        q: 'What economic consequence resulted from the massive population collapse caused by the Black Death?',
        a: 'A severe peasant labor shortage that allowed surviving farmworkers to demand much higher wages',
        exp: 'Undermined the feudal manorial system, leading Parliament to pass the Statute of Labourers (1351) to freeze wages.',
      },
      {
        q: 'Why did all medieval medical treatments prove completely ineffective against the Black Death?',
        a: 'Humoural purging and bloodletting weakened already dehydrated patients, while flea vectors were entirely uncontrolled',
        exp: 'Bleeding lowered blood volume and blood pressure, accelerating cardiac arrest and septic shock in infected patients.',
      },
    ],
  },

  // =========================================================================
  // ERA 2: THE MEDICAL RENAISSANCE IN BRITAIN (c1500–c1700)
  // =========================================================================

  // LESSON 6 (KT2.1): The New Spirit of Enquiry: Humanism, The Printing Press & The Royal Society
  {
    num: 6,
    id: 'lesson_2_1',
    era: 'renaissance',
    eraName: 'The Medical Renaissance (c1500–c1700)',
    title: 'The New Spirit of Enquiry: Humanism, The Printing Press & The Royal Society',
    enquiry:
      'How Did the Renaissance Scientific Revolution Challenge Traditional Medieval Authority?',
    questions: [
      {
        q: 'What philosophical movement encouraged scholars to question ancient dogma and conduct direct observation?',
        a: 'Renaissance Humanism',
        exp: 'Shifted intellectual inquiry from blind scholastic copying toward empirical investigation of the physical natural world.',
      },
      {
        q: 'Which technological invention around 1440 transformed the speed and accuracy of scientific communication?',
        a: 'Johannes Gutenberg’s movable-type printing press',
        exp: 'Eliminated manuscript copyist errors and allowed anatomical textbooks to be mass-produced and shared across Europe.',
      },
      {
        q: 'In what year was the Royal Society founded in London, receiving a Royal Charter from King Charles II in 1662?',
        a: 'Founded in 1660 (Royal Charter granted in 1662)',
        exp: 'Created an independent scientific institution dedicated to experimental proof rather than deference to ancient philosophy.',
      },
      {
        q: 'What official Latin motto did the Royal Society adopt, meaning "Take nobody’s word for it"?',
        a: '“Nullius in Verba”',
        exp: 'Emphasised that scientific hypotheses must be verified through repeatable physical experiments, not ancient authority.',
      },
      {
        q: 'What was the title of the world’s first peer-reviewed scientific journal, launched by the Royal Society in 1665?',
        a: 'Philosophical Transactions',
        exp: 'Allowed natural philosophers and medical pioneers to publish, critique, and replicate experimental data across Europe.',
      },
      {
        q: 'What medical institution was established in 1518 by King Henry VIII to regulate qualified doctors in London?',
        a: 'The Royal College of Physicians (RCP)',
        exp: 'Granted licenses to trained physicians, though it continued to enforce Galenic orthodoxy for over a century.',
      },
      {
        q: 'What optical instrument was invented in the 17th century, enabling scientists to observe microscopic organisms?',
        a: 'The Compound Microscope (developed by Hooke and Leeuwenhoek)',
        exp: 'Robert Hooke published Micrographia (1665), illustrating plant cells and fleas, though germs were not linked to disease.',
      },
      {
        q: 'Which Swiss doctor and alchemist challenged Galen by advocating chemical remedies (iatrochemistry) over humours?',
        a: 'Paracelsus (Theophrastus von Hohenheim)',
        exp: 'Argued disease was caused by external chemical minerals rather than internal humours, using mercury to treat syphilis.',
      },
      {
        q: 'What impact did King Henry VIII’s Dissolution of the Monasteries (1536–40) have on English hospital provision?',
        a: 'Closed over 500 church-run monastic hospitals, dramatically reducing hospital beds across England',
        exp: 'Forced major London hospitals (St Bart’s and St Thomas’) to be refounded as secular, municipal charitable institutions.',
      },
      {
        q: 'What was the "Renaissance Paradox" regarding medical knowledge and actual patient treatment c1500–c1700?',
        a: 'Vast scientific breakthroughs in anatomy and physiology took place, but day-to-day patient treatments barely changed',
        exp: 'Doctors possessed accurate anatomical maps, but still lacked effective anesthetics, antiseptics, or cures for epidemic disease.',
      },
    ],
  },

  // LESSON 7 (KT2.2): Thomas Sydenham & The Art of Bedside Observation (1676)
  {
    num: 7,
    id: 'lesson_2_2',
    era: 'renaissance',
    eraName: 'The Medical Renaissance (c1500–c1700)',
    title: 'Thomas Sydenham & The Art of Bedside Observation (1676)',
    enquiry:
      'Why Was Thomas Sydenham Known as the “English Hippocrates” and How Did He Change Diagnosis?',
    questions: [
      {
        q: 'What complimentary nickname was given to English physician Thomas Sydenham (1624–1689)?',
        a: '“The English Hippocrates”',
        exp: 'Reflected his revival of meticulous bedside clinical observation and rejection of abstract textbook speculation.',
      },
      {
        q: 'What revolutionary diagnostic concept did Sydenham introduce regarding the nature of diseases?',
        a: 'Diseases were distinct, biological species that could be classified into families, just like plants and flowers',
        exp: 'Shifted medicine away from unique, individualized humoural imbalances toward identifying specific, recurring illnesses.',
      },
      {
        q: 'What landmark medical textbook did Thomas Sydenham publish in 1676 detailing his clinical findings?',
        a: 'Observationes Medicae (Medical Observations)',
        exp: 'Became the standard clinical textbook across European medical schools for over two centuries.',
      },
      {
        q: 'Which two common infectious childhood diseases did Sydenham accurately differentiate clinically for the first time?',
        a: 'Measles and Scarlet Fever',
        exp: 'Proved that illnesses previously lumped together as generic fevers had unique symptoms, rash patterns, and clinical courses.',
      },
      {
        q: 'What innovative treatment did Sydenham advocate for treating severe smallpox fevers, defying tradition?',
        a: 'The "Cool Regimen" (fresh air, light bedcovers, cold fluids, and leaving the bedroom windows open)',
        exp: 'Directly rejected the orthodox practice of wrapping smallpox patients in hot blankets by roaring fires, dramatically improving survival.',
      },
      {
        q: 'What imported South American herbal remedy did Sydenham popularize in England to treat malarial agues (fevers)?',
        a: 'Cinchona bark (Jesuit’s bark, which contained quinine)',
        exp: 'One of the first effective specific remedies in history, proving that specific drugs cured specific diseases.',
      },
      {
        q: 'What famous pain-relieving liquid medication did Sydenham formulate using opium dissolved in sherry wine?',
        a: 'Laudanum (Tincture of Opium)',
        exp: 'Provided powerful, reliable pain relief and sedation for chronic illnesses, dysentery, and surgical recovery.',
      },
      {
        q: 'Why did Sydenham advise young doctors to discard medical theory books and "go to the bedside"?',
        a: 'He argued that true medical knowledge came only from observing patient symptoms directly at the bedside',
        exp: 'Warned that theoretical debates over humours and astrological charts distracted doctors from practical clinical care.',
      },
      {
        q: 'How did Sydenham’s nosology (disease classification) challenge the traditional Galenic humoural model?',
        a: 'Galen treated every patient’s humoural mix as totally unique; Sydenham proved diseases had uniform, predictable symptoms',
        exp: 'Laid the essential foundation for modern clinical pathology and specific targeted pharmacological cures.',
      },
      {
        q: 'Despite his empirical breakthroughs, what traditional medical practice did Sydenham continue to use occasionally?',
        a: 'Moderate bloodletting and mild purges',
        exp: 'Shows that even the most progressive Renaissance doctors remained influenced by the entrenched humoural framework.',
      },
    ],
  },

  // LESSON 8 (KT2.3): Andreas Vesalius & The Anatomical Revolution (1543)
  {
    num: 8,
    id: 'lesson_2_3',
    era: 'renaissance',
    eraName: 'The Medical Renaissance (c1500–c1700)',
    title: 'Andreas Vesalius & The Anatomical Revolution (1543)',
    enquiry: 'How Did Andreas Vesalius Overthrow 1,300 Years of Galenic Anatomical Monopoly?',
    questions: [
      {
        q: 'What university post did Andreas Vesalius hold when he revolutionized the study of human anatomy?',
        a: 'Professor of Surgery and Anatomy at the University of Padua (Italy)',
        exp: 'Padua was renowned for its intellectual freedom and progressive anatomical dissection theater.',
      },
      {
        q: 'What masterpiece anatomical textbook did Andreas Vesalius publish in 1543?',
        a: 'De Humani Corporis Fabrica (On the Fabric of the Human Body)',
        exp: 'Contained over 200 breathtakingly accurate anatomical woodcut illustrations based on direct human dissection.',
      },
      {
        q: 'How did Vesalius’s pedagogical method of teaching anatomy differ from traditional medieval professors?',
        a: 'He dissected human cadavers himself with scalpels rather than sitting on a high throne reading ancient Latin texts',
        exp: 'Medieval lecturers had barber-surgeons hack at decaying animals while reading Galen; Vesalius showed students reality.',
      },
      {
        q: 'Approximately how many anatomical errors in Galen’s writings did Vesalius definitively prove and correct?',
        a: 'Over 300 distinct anatomical errors',
        exp: 'Proved definitively that Galen had dissected Barbary apes and pigs because Roman law forbade human autopsies.',
      },
      {
        q: 'Name two specific anatomical errors made by Galen that Vesalius corrected in De Fabrica.',
        a: 'The human lower jaw is a single bone (not two); the breastbone has three segments (not seven)',
        exp: 'Also disproved that the septum of the heart had invisible pores, and showed the liver did not have five lobes.',
      },
      {
        q: 'How did Vesalius secure a steady supply of human corpses for his anatomical research at Padua?',
        a: 'Padua judges allowed him to dissect the bodies of executed criminals and he took corpses from gibbets',
        exp: 'Enabled him to examine fresh human muscular, skeletal, and vascular structures systematically.',
      },
      {
        q: 'What vital advice did Vesalius give to all medical students and fellow physicians across Europe?',
        a: '“Trust not Galen, trust your own eyes”',
        exp: 'Urged doctors to base anatomical knowledge entirely on direct dissection rather than unquestioned ancient dogma.',
      },
      {
        q: 'What technological factor allowed Vesalius’s De Fabrica to spread rapidly across Europe, including England?',
        a: 'The movable-type printing press combined with high-quality woodcut illustrations by Titian’s workshop',
        exp: 'Thomas Geminus published an English compendium of Vesalius’s illustrations in London in 1545 for barber-surgeons.',
      },
      {
        q: 'What fierce backlash did Vesalius face from orthodox European medical university faculties?',
        a: 'Traditional Galenist professors accused him of heresy, claiming human bodies had changed since Galen’s time',
        exp: 'His former teacher Jacobus Sylvius condemned him viciously, forcing Vesalius to resign his academic chair at Padua.',
      },
      {
        q: 'Why did Vesalius’s brilliant anatomical discoveries have little immediate effect on saving patients’ lives?',
        a: 'Knowing precise human anatomy did not stop surgical infections, blood loss, or deadly epidemic diseases',
        exp: 'Surgeons still lacked anesthetics, antiseptics, and effective chemical drugs to cure internal illnesses.',
      },
    ],
  },

  // LESSON 9 (KT2.4): William Harvey & The Circulation of the Blood (1628)
  {
    num: 9,
    id: 'lesson_2_4',
    era: 'renaissance',
    eraName: 'The Medical Renaissance (c1500–c1700)',
    title: 'William Harvey & The Circulation of the Blood (1628)',
    enquiry: 'How Did William Harvey Prove That the Heart Was a Muscular Pump Circulating Blood?',
    questions: [
      {
        q: 'What prestigious royal post did English physician William Harvey hold under King James I and King Charles I?',
        a: 'Royal Physician to the Stuart Monarchy',
        exp: 'His high royal status provided resources and academic credibility to carry out pioneering cardiovascular experiments.',
      },
      {
        q: 'What landmark book did William Harvey publish in Frankfurt in 1628 proving blood circulation?',
        a: 'De Motu Cordis (An Anatomical Account of the Motion of the Heart and Blood)',
        exp: 'Proved mathematically and experimentally that blood circulates continuously through a closed arterial and venous loop.',
      },
      {
        q: 'What incorrect physiological theory regarding blood production had Galen taught for over 1,400 years?',
        a: 'The liver constantly manufactured new blood from digested food, which was consumed by tissues like fuel',
        exp: 'Galen believed veins carried venous blood from the liver, while arteries carried separate "vital spirit" from the heart.',
      },
      {
        q: 'What mathematical calculation did Harvey perform to disprove Galen’s blood-manufacturing theory?',
        a: 'Calculated that the heart pumps 540 pounds of blood per hour—far exceeding the body’s weight and food intake',
        exp: 'Proved the liver could not possibly manufacture this impossible volume; the blood had to be constantly recycled.',
      },
      {
        q: 'What physical experiment did Harvey perform on human forearms using tight ligatures to prove one-way blood flow?',
        a: 'Tied a ligature around an arm, observed swollen veins, and pushed blood with a finger past venous valves',
        exp: 'Showed that blood in veins flows only toward the heart, blocked from flowing backwards by one-way pocket valves.',
      },
      {
        q: 'Which mechanical invention of the Scientific Revolution inspired Harvey to view the heart as an engine?',
        a: 'The mechanical water pump (such as firefighting and mining pumps)',
        exp: 'Harvey applied mechanical physics to human physiology, proving the heart contracts as a muscular force pump.',
      },
      {
        q: 'What microscopic blood vessels could Harvey not see, which connected arteries to veins in the capillary beds?',
        a: 'Capillaries',
        exp: 'Italian anatomist Marcello Malpighi used microscopes in 1661 to finally observe capillaries, proving Harvey completely right.',
      },
      {
        q: 'How did conservative English doctors react when Harvey first published De Motu Cordis in 1628?',
        a: 'Many called him a "crackpot" (circulator), ridiculed his ideas, and patients left his private medical practice',
        exp: 'Conservative physicians refused to accept that Galen was wrong, and it took 50 years for universities to teach circulation.',
      },
      {
        q: 'Why did Harvey’s discovery of systemic circulation logically undermine the justification for bloodletting?',
        a: 'If blood recirculates constantly in a single loop, draining blood from one arm does not balance a localized organ',
        exp: 'Yet despite Harvey’s definitive proof, bloodletting remained the most widely prescribed treatment until the late 19th century.',
      },
      {
        q: 'Why did Harvey’s breakthrough have limited immediate practical use in everyday medical treatment in the 1600s?',
        a: 'Knowing blood circulated did not cure infectious fevers and blood transfusions were deadly without blood typing',
        exp: 'Transfusions with animal or unmatched blood caused fatal clotting, meaning clinical applications took centuries to develop.',
      },
    ],
  },

  // LESSON 10 (KT2.5): Continuity in Treatment & The Great Plague of London (1665)
  {
    num: 10,
    id: 'lesson_2_5',
    era: 'renaissance',
    eraName: 'The Medical Renaissance (c1500–c1700)',
    title: 'Continuity in Treatment & The Great Plague of London (1665)',
    enquiry:
      'To What Extent Did the Response to the Great Plague of 1665 Differ from the 1348 Black Death?',
    questions: [
      {
        q: 'How many people died in London during the devastating outbreak of the Great Plague in 1665?',
        a: 'Approximately 100,000 people (around 20% of London’s total population)',
        exp: 'The deadliest epidemic in England since the 1348 Black Death, causing panic across the crowded capital.',
      },
      {
        q: 'What ancient ideas about the causes of plague persisted virtually unchanged between 1348 and 1665?',
        a: 'God’s punishment for sins, planetary alignments (comet of 1664), and foul-smelling airborne miasma',
        exp: 'Demonstrated deep conceptual continuity; Renaissance science had not yet discovered pathogenic bacteria or flea vectors.',
      },
      {
        q: 'What official municipal measures were enforced by London authorities under the Mayor’s Plague Orders?',
        a: 'Appointing Searchers of the Dead, locking infected families in homes for 28 days, and night-time burials',
        exp: 'House quarantine was enforced by armed watchmen; infected front doors were marked with red crosses and "Lord Have Mercy on Us".',
      },
      {
        q: 'What tragic, counterproductive order was issued by civic officials regarding urban stray animals in 1665?',
        a: 'Ordering the slaughter of an estimated 200,000 stray dogs and 40,000 domestic cats',
        exp: 'Disastrously allowed the true carriers—black rats and their fleas—to multiply exponentially across London.',
      },
      {
        q: 'What iconic protective outfit was worn by specialized plague doctors during the 17th-century epidemics?',
        a: 'Waxed leather overcoats, wide-brimmed hats, glass eye goggles, and a long beaked mask filled with aromatic herbs',
        exp: 'Designed to repel miasma, though the waxed leather accidentally provided protection against flea bites.',
      },
      {
        q: 'What popular preventative habit was enthusiastically encouraged, even for schoolboys, during the 1665 plague?',
        a: 'Smoking tobacco pipes',
        exp: 'Believed that the pungent, acrid smoke of burning tobacco neutralised and drove away miasmatic plague contagion.',
      },
      {
        q: 'Which courageous London physician remained in the capital during the plague, publishing Loimologia in 1672?',
        a: 'Dr Nathaniel Hodges',
        exp: 'Treated thousands of poor sufferers daily and recorded meticulous clinical observations of plague symptoms.',
      },
      {
        q: 'What weekly statistical publication monitored London death rates and causes throughout the 1665 epidemic?',
        a: 'The London Bills of Mortality',
        exp: 'Published weekly by the Parish Clerks, alerting citizens and authorities to soaring plague mortality by parish.',
      },
      {
        q: 'Why did wealthy citizens, including King Charles II and members of the Royal College of Physicians, flee London?',
        a: 'To escape the concentrated miasma and contagious infection of the crowded capital for the countryside',
        exp: 'Left the poor without experienced physicians or social support, relying on parish apothecaries and quacks.',
      },
      {
        q: 'What was the single biggest difference between the 1348 and 1665 responses to epidemic plague?',
        a: 'The 1665 response featured organized state and municipal surveillance, legislation, and systematic quarantine',
        exp: 'While causal beliefs remained unchanged (miasma and divine will), administrative public health controls were far more sophisticated.',
      },
    ],
  },

  // =========================================================================
  // ERA 3: 18TH & 19TH CENTURY BRITAIN (c1700–c1900)
  // =========================================================================

  // LESSON 11 (KT3.1): Ideas on Causes: Pasteur’s Germ Theory & Koch’s Microbe Hunters
  {
    num: 11,
    id: 'lesson_3_1',
    era: '18th_19th',
    eraName: '18th & 19th Century Britain (c1700–c1900)',
    title: 'Ideas on Causes: Pasteur’s Germ Theory & Koch’s Microbe Hunters',
    enquiry:
      'How Did Pasteur and Koch Destroy Miasma and Prove That Specific Microbes Cause Disease?',
    questions: [
      {
        q: 'What unscientific theory stated that rotting matter spontaneously created living maggots and bacteria?',
        a: 'The Theory of Spontaneous Generation',
        exp: 'Believed bacteria were the byproduct or consequence of rotting matter, rather than the primary cause of decay.',
      },
      {
        q: 'In what year did French chemist Louis Pasteur publish his revolutionary Germ Theory of disease?',
        a: '1861',
        exp: 'Proved definitively that airborne microorganisms cause decay in liquids, disproving spontaneous generation.',
      },
      {
        q: 'What famous laboratory experiment did Pasteur conduct to prove that microbes entered liquids from the air?',
        a: 'Boiled broth in swan-neck flasks with S-shaped bent necks that trapped dust and airborne microbes',
        exp: 'The broth stayed sterile until the neck was snapped, proving microbes fell from the atmosphere and caused decay.',
      },
      {
        q: 'Which German doctor developed methods to photograph, stain, and isolate specific disease-causing bacteria?',
        a: 'Robert Koch (The Father of Modern Bacteriology)',
        exp: 'Pioneered industrial aniline chemical dyes to stain transparent bacteria and cultured them on solid agar jelly.',
      },
      {
        q: 'Which two deadly human disease bacteria did Robert Koch discover and isolate in 1882 and 1883?',
        a: 'Tuberculosis (Mycobacterium tuberculosis, 1882) and Cholera (Vibrio cholerae, 1883)',
        exp: 'Proved definitively that specific microbes caused specific human illnesses, destroying the ancient miasma theory.',
      },
      {
        q: 'What scientific rules did Koch formulate to prove that a specific microbe caused a specific disease?',
        a: 'Koch’s Postulates',
        exp: 'A four-step experimental standard requiring bacteria to be isolated, grown in pure culture, and reproduce the disease in test animals.',
      },
      {
        q: 'Why did British doctors and the medical establishment take over 15 years to accept Pasteur’s Germ Theory?',
        a: 'Traditional doctors (like Dr Henry Bastian) believed germs were harmless and argued miasma caused internal decay',
        exp: 'Many surgeons could not believe microscopic invisible creatures could kill large, healthy human beings.',
      },
      {
        q: 'Which British scientist delivered public lectures in London using optical beams to champion Germ Theory in 1870?',
        a: 'John Tyndall',
        exp: 'Demonstrated that dust motes in room air carried living bacteria, helping convince the British medical establishment.',
      },
      {
        q: 'What live attenuated vaccines did Louis Pasteur develop following his work on Germ Theory?',
        a: 'Vaccines for Chicken Cholera, Anthrax (1881), and Rabies (1885)',
        exp: 'Discovered that weakened or aged pathogens stimulated protective antibodies without killing the host animal.',
      },
      {
        q: 'How did the Franco-Prussian War (1870–1871) accelerate bacteriological breakthroughs by Pasteur and Koch?',
        a: 'Intense nationalistic rivalry drove French and German governments to heavily fund rival scientific research teams',
        exp: 'Each nation poured state funding into laboratories to claim national scientific superiority and save soldier lives.',
      },
    ],
  },

  // LESSON 12 (KT3.2): Approaches to Prevention: Edward Jenner & The Smallpox Vaccine (1796–1853)
  {
    num: 12,
    id: 'lesson_3_2',
    era: '18th_19th',
    eraName: '18th & 19th Century Britain (c1700–c1900)',
    title: 'Approaches to Prevention: Edward Jenner & The Smallpox Vaccine (1796–1853)',
    enquiry:
      'How Did Edward Jenner Pioneer Vaccination and Why Did It Take Decades to Become Compulsory?',
    questions: [
      {
        q: 'What dangerous preventative practice against smallpox existed before Edward Jenner’s vaccine?',
        a: 'Inoculation (or Variolation)',
        exp: 'Involved rubbing live, virulent smallpox pus into skin scratches; patients risked dying or triggering fresh epidemics.',
      },
      {
        q: 'Who introduced the Turkish practice of smallpox inoculation to fashionable British society in 1721?',
        a: 'Lady Mary Wortley Montagu',
        exp: 'Had her own children inoculated after witnessing the procedure in Constantinople, popularizing it among the aristocracy.',
      },
      {
        q: 'What crucial folklore observation did Gloucestershire country physician Edward Jenner investigate in the 1790s?',
        a: 'Dairy milkmaids who contracted mild cowpox from cows never contracted the deadly smallpox virus',
        exp: 'Jenner realized that infection with benign cowpox conferred lifelong biological immunity against smallpox.',
      },
      {
        q: 'What famous experiment did Jenner conduct in May 1796 on eight-year-old James Phipps?',
        a: 'Inoculated him with cowpox pus from milkmaid Sarah Nelmes, then exposed him twice to deadly smallpox',
        exp: 'Young James developed mild cowpox but completely resisted smallpox infection, proving vaccination worked.',
      },
      {
        q: 'What book did Edward Jenner publish in 1798 detailing 23 case studies of successful vaccination?',
        a: 'An Enquiry into the Causes and Effects of the Variolae Vaccinae',
        exp: 'Coined the term "vaccination" (from Latin vacca, meaning cow) to distinguish it from dangerous human inoculation.',
      },
      {
        q: 'Why did the prestigious Royal Society in London initially reject Jenner’s paper on vaccination in 1797?',
        a: 'Jenner could not explain scientifically *how* or *why* cowpox prevented smallpox (microbes were unknown)',
        exp: 'Because Germ Theory was still 60 years away, conservative doctors dismissed his findings as rural superstition.',
      },
      {
        q: 'Why did professional inoculators and traditional doctors fiercely oppose Jenner’s free vaccine?',
        a: 'They stood to lose massive financial profits earned from charging wealthy families high fees for inoculation',
        exp: 'Commercial self-interest led many private medical practitioners to publish anti-vaccination pamphlets.',
      },
      {
        q: 'What financial grants did the British Parliament award Jenner in 1802 and 1807 to recognize his achievement?',
        a: 'A total of £30,000 in parliamentary grants',
        exp: 'Enabled Jenner to establish the Royal Jennerian Society in 1803 to distribute free cowpox vaccines nationwide.',
      },
      {
        q: 'In what year did the British government pass the Compulsory Vaccination Act for all newborn infants?',
        a: '1853 (strengthened with fines and penalties in 1871)',
        exp: 'Ended the era of permissive public health, marking a decisive shift from laissez-faire toward compulsory state mandates.',
      },
      {
        q: 'What was the Anti-Vaccination League formed in 1867 and why did its members protest against the government?',
        a: 'A public protest movement that opposed mandatory vaccination as a tyrannical infringement on personal liberty',
        exp: 'Feared injecting animal matter into children and argued parents had a God-given right to decide their children’s healthcare.',
      },
    ],
  },

  // LESSON 13 (KT3.3): Improvements in Hospital Care: Florence Nightingale, Mary Seacole & The Sanitary Revolution
  {
    num: 13,
    id: 'lesson_3_3',
    era: '18th_19th',
    eraName: '18th & 19th Century Britain (c1700–c1900)',
    title:
      'Improvements in Hospital Care: Florence Nightingale, Mary Seacole & The Sanitary Revolution',
    enquiry:
      'How Did Florence Nightingale and the Sanitary Revolution Transform Hospitals into Places of Recovery?',
    questions: [
      {
        q: 'What military conflict in 1854 prompted Florence Nightingale to take 38 nurses to Scutari hospital?',
        a: 'The Crimean War (1853–1856)',
        exp: 'Times newspaper reports of horrifying conditions and neglected wounded soldiers outraged the British public.',
      },
      {
        q: 'What was the shocking mortality rate at Scutari Barracks Hospital when Nightingale first arrived in November 1854?',
        a: 'Approximately 42% (or 4 in every 10 patients died)',
        exp: 'Soldiers were dying from typhus, cholera, and dysentery caused by blocked sewers beneath the hospital floors.',
      },
      {
        q: 'What practical sanitary reforms did Nightingale and the Sanitary Commission introduce at Scutari?',
        a: 'Unblocking sewers, scrubbing wards, washing bedding, boiling drinking water, and improving ward ventilation',
        exp: 'Reduced the mortality rate dramatically from 42% down to under 2% within six months of arriving.',
      },
      {
        q: 'Which Jamaican-born nurse traveled to the Crimea at her own expense and opened the "British Hotel" for soldiers?',
        a: 'Mary Seacole',
        exp: 'Provided hot meals, clean shelter, and nursing care to wounded men directly on the frontline battlefield at Balaclava.',
      },
      {
        q: 'What influential book did Florence Nightingale publish in 1859 outlining modern hospital design?',
        a: 'Notes on Hospitals',
        exp: 'Advocated the "pavilion plan" with separate wings, large cross-ventilating windows, and wipeable tiled surfaces.',
      },
      {
        q: 'What training school did Nightingale establish at St Thomas’ Hospital in London in 1860 using the Nightingale Fund?',
        a: 'The Nightingale Training School for Nurses',
        exp: 'Transformed nursing from a disreputable, unskilled domestic chore into a respected, disciplined medical profession.',
      },
      {
        q: 'What statistical diagram (polar area chart) did Nightingale invent to prove sanitary conditions saved lives?',
        a: 'The Coxcomb Diagram (or Polar Area Chart)',
        exp: 'Vividly demonstrated to MPs and military commanders that hospital filth and disease killed far more men than combat bullets.',
      },
      {
        q: 'What was the character of 18th-century "voluntary hospitals" before Nightingale’s sanitary reforms?',
        a: 'Overcrowded, filthy institutions funded by charity where surgical sepsis and cross-infection spread rapidly',
        exp: 'Known as "gateways to death" because poor sanitation and unwashed bedding turned minor cuts into fatal gangrene.',
      },
      {
        q: 'What was the role of the 19th-century "cottage hospital" introduced in rural areas from 1859?',
        a: 'Small local community hospitals run by local GPs providing clean, home-like recovery care for farmworkers',
        exp: 'Prevented poor rural patients traveling long distances to crowded county infirmaries for routine surgery.',
      },
      {
        q: 'How did the public perception of hospitals change completely between 1800 and 1900?',
        a: 'They changed from feared places where the destitute went to die into clean, scientific institutions for recovery',
        exp: 'Driven by professional nursing, antiseptic surgery, trained medical staff, and modern sanitary engineering.',
      },
    ],
  },

  // LESSON 14 (KT3.4): The Surgical Revolution: Simpson, Lister & The Conquest of Pain and Sepsis
  {
    num: 14,
    id: 'lesson_3_4',
    era: '18th_19th',
    eraName: '18th & 19th Century Britain (c1700–c1900)',
    title: 'The Surgical Revolution: Simpson, Lister & The Conquest of Pain and Sepsis',
    enquiry:
      'How Did the Dual Breakthroughs of Chloroform and Carbolic Acid Conquer Pain and Infection?',
    questions: [
      {
        q: 'What three catastrophic hazards limited surgery to rapid amputations before the mid-19th century?',
        a: 'Pain (causing fatal shock), Infection (sepsis and gangrene), and Bleeding (hemorrhage)',
        exp: 'Surgeons had to amputate limbs in under 60 seconds while patients were physically restrained by burly assistants.',
      },
      {
        q: 'Which Scottish obstetrician discovered the powerful anesthetic properties of Chloroform in Edinburgh in 1847?',
        a: 'James Young Simpson',
        exp: 'Inhaled chloroform vapors with his assistants during an after-dinner experiment, waking up under the table.',
      },
      {
        q: 'Which famous royal endorsement in 1853 eliminated public and religious opposition to chloroform in childbirth?',
        a: 'Queen Victoria used chloroform during the birth of Prince Leopold (calling it "that blessed chloroform")',
        exp: 'Royal approval silenced churchmen who claimed the Bible demanded women experience pain in childbearing.',
      },
      {
        q: 'What was the "Black Period of Surgery" that occurred immediately following the adoption of anesthetics c1846–1870?',
        a: 'Surgical death rates actually increased because surgeons operated deeper and slower in filthy, unsterilized conditions',
        exp: 'Longer operations without antiseptics allowed bacteria on surgeons’ coats and unwashed hands to trigger lethal gangrene.',
      },
      {
        q: 'Which British professor of surgery applied Pasteur’s Germ Theory to operating theaters using carbolic acid in 1865?',
        a: 'Joseph Lister',
        exp: 'Realized that wound suppuration was biological decay caused by airborne microbes, not chemical oxidation.',
      },
      {
        q: 'What clinical fracture treatment in 1865 proved to Lister that carbolic acid prevented fatal infection?',
        a: 'Treated eleven-year-old Jamie Greenlees’s compound leg fracture with carbolic-soaked dressings',
        exp: 'The broken bone and torn flesh healed cleanly without infection, gangrene, or the need for amputation.',
      },
      {
        q: 'What mechanical device did Lister invent to saturate operating theaters with an antiseptic chemical mist?',
        a: 'The Carbolic Acid Spray machine (The "Donkey Engine")',
        exp: 'Sprayed fine carbolic mist over open surgical wounds, surgeons’ hands, and instruments throughout operations.',
      },
      {
        q: 'By what dramatic percentage did Lister reduce postoperative surgical mortality at Glasgow Royal Infirmary?',
        a: 'Reduced mortality from 46% down to 15% within three years (1865–1868)',
        exp: 'Provided undeniable statistical proof that destroying living external microbes prevented surgical sepsis.',
      },
      {
        q: 'What is the crucial historical difference between "Antiseptic Surgery" and "Aseptic Surgery"?',
        a: 'Antiseptic kills microbes already in wounds with chemicals; Aseptic excludes all microbes entirely from the room',
        exp: 'By the 1890s, asepsis replaced carbolic spray with steam-sterilized instruments (autoclaves), gowns, and rubber gloves.',
      },
      {
        q: 'Which American surgeon introduced sterilized rubber surgical gloves in 1890 at Johns Hopkins Hospital?',
        a: 'William Halsted',
        exp: 'Originally invented for his scrub nurse Caroline Hampton who had dermatitis from carbolic, rubber gloves became standard aseptic practice.',
      },
    ],
  },

  // LESSON 15 (KT3.5): Public Health & Cholera: John Snow, The Broad Street Pump & The 1875 Public Health Act
  {
    num: 15,
    id: 'lesson_3_5',
    era: '18th_19th',
    eraName: '18th & 19th Century Britain (c1700–c1900)',
    title: 'Public Health & Cholera: John Snow, The Broad Street Pump & The 1875 Public Health Act',
    enquiry:
      'How Did Epidemics of Cholera and the Broad Street Pump Force the Government to End Laissez-Faire?',
    questions: [
      {
        q: 'In what year did the terrifying water-borne epidemic of Asiatic Cholera first arrive in Britain?',
        a: '1831 (striking the port of Sunderland)',
        exp: 'Caused violent diarrhea, vomiting, dehydration, cyanosis ("blue skin"), and death within hours, killing over 30,000.',
      },
      {
        q: 'What political doctrine held that governments should not interfere in the economy or lives of private citizens?',
        a: '“Laissez-faire” (leave alone)',
        exp: 'Ratepayers and local councils fiercely opposed paying taxes to build public sewer networks or pave dirty streets.',
      },
      {
        q: 'Who published the landmark 1842 Report on the Sanitary Condition of the Labouring Population of Great Britain?',
        a: 'Edwin Chadwick',
        exp: 'Proved with statistical evidence that overcrowded urban filth, uncollected excrement, and bad water caused rampant poverty and disease.',
      },
      {
        q: 'Why was the First Public Health Act of 1848 largely ineffective at improving nationwide urban sanitation?',
        a: 'It was purely permissive (voluntary), meaning local town councils were not legally forced to take action or raise taxes',
        exp: 'Fewer than 20% of towns set up local boards of health because ratepayers refused to fund expensive sanitary works.',
      },
      {
        q: 'What pioneering epidemiological investigation did Dr John Snow carry out in Soho, London, during the 1854 cholera outbreak?',
        a: 'Drew a geographic dot map plotting 500 cholera deaths around the Broad Street water pump',
        exp: 'Proved clustering of fatalities occurred exclusively among families who collected drinking water from that specific pump.',
      },
      {
        q: 'What decisive action did John Snow persuade the St James Parish Board of Guardians to take in September 1854?',
        a: 'Remove the handle from the Broad Street water pump',
        exp: 'Forced residents to use alternative water sources; the local cholera epidemic stopped almost immediately.',
      },
      {
        q: 'What physical source of contamination was discovered leaking into the Broad Street water well?',
        a: 'A cracked brick cesspool leaking sewage from a house where a baby had cholera, only three feet from the well',
        exp: 'Provided irrefutable physical proof that cholera was ingested through sewage-contaminated drinking water, not miasma.',
      },
      {
        q: 'What environmental disaster in the summer of 1858 forced Parliament to fund Joseph Bazalgette’s London sewer system?',
        a: 'The “Great Stink” of 1858',
        exp: 'The River Thames became so choked with human sewage that politicians fled the Commons, voting £3 million for modern intercepting sewers.',
      },
      {
        q: 'What political reform in 1867 gave working-class male town dwellers the vote, forcing politicians to act on health?',
        a: 'The Second Reform Act of 1867',
        exp: 'Politicians had to win working-class votes by promising social reforms, safe housing, clean water, and public health.',
      },
      {
        q: 'Why was the Second Public Health Act of 1875 the decisive constitutional turning point in British public health?',
        a: 'It made sanitary provision compulsory for all local councils nationwide, permanently ending laissez-faire',
        exp: 'Councils were legally mandated to supply clean piped water, build underground sewers, collect rubbish, inspect food, and hire Medical Officers.',
      },
    ],
  },

  // =========================================================================
  // ERA 4: MODERN BRITAIN (c1900–PRESENT)
  // =========================================================================

  // LESSON 16 (KT4.1): Ideas on Causes: Genetics, DNA & The Human Genome Project
  {
    num: 16,
    id: 'lesson_4_1',
    era: 'modern',
    eraName: 'Modern Britain (c1900–present)',
    title: 'Ideas on Causes: Genetics, DNA & The Human Genome Project',
    enquiry:
      'How Did the Discovery of the Double Helix and Genomic Sequencing Revolutionize Medical Causation?',
    questions: [
      {
        q: 'Which Austrian monk discovered the basic laws of genetic inheritance in the 1860s by breeding pea plants?',
        a: 'Gregor Mendel',
        exp: 'Proved characteristics were passed from parents to offspring as distinct physical units (now called genes).',
      },
      {
        q: 'Which two Cambridge scientists discovered the 3D double-helix molecular structure of DNA in 1953?',
        a: 'James Watson and Francis Crick',
        exp: 'Revealed that all human heredity is coded in an elegant spiral ladder of four chemical bases (A, T, C, G).',
      },
      {
        q: 'Which scientist captured the iconic X-ray crystallographic image "Photograph 51" at King’s College London in 1952?',
        a: 'Rosalind Franklin (working with Maurice Wilkins)',
        exp: 'Her precise X-ray diffraction calculations provided the crucial proof that DNA possessed a double-helical structure.',
      },
      {
        q: 'What massive international scientific collaboration was launched in 1990 to map every single human gene?',
        a: 'The Human Genome Project (completed in 2003)',
        exp: 'Sequenced all 3 billion base pairs in the human genome, mapping the exact locations of roughly 20,000–25,000 human genes.',
      },
      {
        q: 'Name two serious hereditary conditions that scientists now know are caused by specific faulty gene mutations.',
        a: 'Cystic Fibrosis and Huntington’s Disease',
        exp: 'Enables genetic screening, embryonic testing, and early monitoring before physical symptoms manifest.',
      },
      {
        q: 'What specific mutated genes (discovered in the 1990s) dramatically increase a woman’s lifetime risk of breast cancer?',
        a: 'BRCA1 and BRCA2 gene mutations',
        exp: 'Enables preventive medicine: patients with mutations can opt for regular MRI scans or preventative mastectomies.',
      },
      {
        q: 'What is "Pharmacogenomics" (personalized gene therapy) in modern cancer and disease treatment?',
        a: 'Designing bespoke drugs and therapies tailored to an individual patient’s unique genetic profile and tumor DNA',
        exp: 'Replaces generic "one-size-fits-all" chemotherapy with targeted biological therapies that attack cancer cells specifically.',
      },
      {
        q: 'What modern genome-editing technology developed in 2012 allows scientists to alter DNA sequences in living cells?',
        a: 'CRISPR-Cas9 gene editing',
        exp: 'Acts as molecular scissors to cut out and repair defective genes, offering potential cures for sickle cell disease.',
      },
      {
        q: 'How did the discovery of genetics fundamentally change the philosophical understanding of what causes illness?',
        a: 'Shifted medicine from viewing disease as external invaders (microbes) to recognizing internal cellular and genetic blueprints',
        exp: 'Proved many chronic conditions are programmed inside human cellular DNA, rather than caused solely by infections.',
      },
      {
        q: 'What ethical concerns have arisen from modern genetic screening and human gene technology?',
        a: 'Fears of genetic discrimination by insurance companies and controversial debates over creating "designer babies"',
        exp: 'Has forced governments and bioethicists to regulate embryo screening, gene editing, and genetic data privacy.',
      },
    ],
  },

  // LESSON 17 (KT4.2): Lifestyle Factors & The Technological Revolution in Diagnosis
  {
    num: 17,
    id: 'lesson_4_2',
    era: 'modern',
    eraName: 'Modern Britain (c1900–present)',
    title: 'Lifestyle Factors & The Technological Revolution in Diagnosis',
    enquiry:
      'How Did Non-Invasive Medical Technology and Understanding Lifestyle Reshape Modern Diagnosis?',
    questions: [
      {
        q: 'Which German physicist accidentally discovered X-rays in 1895 while experimenting with cathode ray tubes?',
        a: 'Wilhelm Röntgen',
        exp: 'Photographed his wife’s hand, displaying bone structure and wedding ring, revolutionizing diagnostic radiography.',
      },
      {
        q: 'What advanced 3D diagnostic scanning technology was developed in 1972 by British engineer Godfrey Hounsfield?',
        a: 'CT (Computed Tomography) Scanning (or CAT scan)',
        exp: 'Used computers to combine multiple cross-sectional X-ray slices into comprehensive 3D views of internal organs.',
      },
      {
        q: 'What diagnostic imaging technology developed in the 1970s uses magnetic fields and radio waves without radiation?',
        a: 'MRI (Magnetic Resonance Imaging) Scanning',
        exp: 'Produces extraordinary detail of soft tissues, brain tumors, torn ligaments, and spinal cord without ionizing radiation.',
      },
      {
        q: 'What miniature diagnostic tool using optical fiber cables allows doctors to view inside organs without major surgery?',
        a: 'The Endoscope (allowing Keyhole or Laparoscopic Surgery)',
        exp: 'Allows surgeons to inspect stomachs, joints, and bowels through tiny incisions, vastly reducing trauma and recovery time.',
      },
      {
        q: 'What portable diagnostic machine invented in 1903 by Willem Einthoven records the electrical activity of the heart?',
        a: 'The Electrocardiogram (ECG)',
        exp: 'Enables doctors to instantly detect arrhythmias, heart attacks, and cardiac distress at the hospital bedside.',
      },
      {
        q: 'Name four major modern lifestyle factors identified by epidemiologists as primary causes of chronic illness.',
        a: 'Cigarette smoking, poor diet/obesity, alcohol abuse, and lack of exercise',
        exp: 'Causes heart disease, type 2 diabetes, stroke, and hypertension, shifting healthcare from acute infection to chronic lifestyle care.',
      },
      {
        q: 'What diagnostic procedure involves analyzing microscopic blood samples to detect chemical biomarkers and disease?',
        a: 'Advanced Blood Testing (biochemical blood panels)',
        exp: 'Tests for glucose levels, cholesterol, liver and kidney enzymes, hormonal imbalances, and cancer tumor markers.',
      },
      {
        q: 'What safe diagnostic technique uses high-frequency sound waves to monitor fetal development in the womb?',
        a: 'Ultrasound Scanning',
        exp: 'Provides real-time non-invasive imaging of developing embryos, blood flow (Doppler), and gallstones without radiation.',
      },
      {
        q: 'How did non-invasive diagnostic machines transform the danger of patient care between 1900 and the present?',
        a: 'Eliminated the need for dangerous "exploratory laparotomy" surgeries where doctors cut open chests to diagnose illnesses',
        exp: 'Doctors can now pinpoint tumors, internal bleeds, and organ damage accurately before picking up a scalpel.',
      },
      {
        q: 'What wearable digital technologies are increasingly used by 21st-century patients to monitor physical health?',
        a: 'Smartwatches, continuous glucose monitors (CGMs), and digital blood pressure monitors',
        exp: 'Allows continuous real-time health data monitoring, empowering patients to manage diabetes and cardiac risk remotely.',
      },
    ],
  },

  // LESSON 18 (KT4.3): The Search for Magic Bullets, High-Tech Treatments & The Birth of the NHS
  {
    num: 18,
    id: 'lesson_4_3',
    era: 'modern',
    eraName: 'Modern Britain (c1900–present)',
    title: 'The Search for Magic Bullets, High-Tech Treatments & The Birth of the NHS',
    enquiry:
      'How Did Targeted Pharmacology, High-Tech Surgery, and the National Health Service Transform Care?',
    questions: [
      {
        q: 'What was the scientific concept of a "Magic Bullet" formulated by German scientist Paul Ehrlich?',
        a: 'A synthetic chemical compound designed to seek out and destroy specific bacteria without harming healthy human cells',
        exp: 'Replaced harsh non-specific antiseptics (carbolic acid) that killed human tissues with targeted chemical therapy.',
      },
      {
        q: 'What first magic bullet compound was discovered in 1909 by Paul Ehrlich and Sahachiro Hata to cure syphilis?',
        a: 'Salvarsan 606 (an arsenic-based chemical compound)',
        exp: 'Screened hundreds of compounds before proving that compound 606 destroyed the Treponema pallidum syphilis spirochete.',
      },
      {
        q: 'What second magic bullet discovered by Gerhard Domagk in 1932 cured lethal puerperal fever and pneumonia?',
        a: 'Prontosil (the first sulfonamide drug)',
        exp: 'A bright red chemical dye that destroyed streptococcus bacteria, saving Domagk’s own daughter from arm amputation.',
      },
      {
        q: 'On what historic date was the National Health Service (NHS) launched across Britain?',
        a: '5 July 1948',
        exp: 'Established universal healthcare that was completely free at the point of delivery, funded out of general taxation.',
      },
      {
        q: 'Who was the Minister of Health in Clement Attlee’s Labour government who spearheaded the creation of the NHS?',
        a: 'Aneurin (Nye) Bevan',
        exp: 'Overcame fierce resistance from the British Medical Association (BMA) by allowing hospital consultants to retain private patients.',
      },
      {
        q: 'What was the healthcare situation for poor working-class British families before the launch of the NHS in 1948?',
        a: 'They had to pay out-of-pocket for GP visits, rely on charity hospitals, or go completely untreated due to poverty',
        exp: 'The 1911 National Insurance Act covered only male wage earners, leaving wives and children without medical coverage.',
      },
      {
        q: 'What high-tech surgical procedure was successfully performed for the first time by Christiaan Barnard in 1967?',
        a: 'The first human heart transplant',
        exp: 'Paved the way for complex organ transplantation (kidneys, livers, lungs) using modern immunosuppressant drugs (cyclosporine).',
      },
      {
        q: 'What surgical technique developed in the 1980s uses tiny robotic cameras and instruments through miniature punctures?',
        a: 'Keyhole Surgery (Laparoscopic or Robotic Surgery, e.g. the da Vinci system)',
        exp: 'Reduces internal tissue trauma, blood loss, infection risk, and hospital recovery times from weeks to hours.',
      },
      {
        q: 'What was the 1942 Beveridge Report and which "Five Giant Evils" did it urge the British state to defeat?',
        a: 'A landmark wartime blueprint to slay Want, Disease, Ignorance, Squalor, and Idleness',
        exp: 'Created overwhelming public and political demand for a comprehensive welfare state and free national healthcare.',
      },
      {
        q: 'What major funding challenges does the National Health Service face in the 21st century?',
        a: 'An aging population, soaring costs of high-tech treatments, and rising rates of chronic lifestyle illnesses',
        exp: 'Modern medical success in prolonging life has created immense ongoing demand for dementia, cancer, and chronic care.',
      },
    ],
  },

  // LESSON 19 (KT4.4): Case Study 1: The Antibiotic Revolution: Fleming, Florey & Chain and Penicillin
  {
    num: 19,
    id: 'lesson_4_4',
    era: 'modern',
    eraName: 'Modern Britain (c1900–present)',
    title: 'Case Study 1: The Antibiotic Revolution: Fleming, Florey & Chain and Penicillin',
    enquiry:
      'How Did Fleming’s Accidental Discovery and Florey & Chain’s Wartime Mass Production Create Penicillin?',
    questions: [
      {
        q: 'In what year and at which London hospital did Alexander Fleming accidentally discover penicillin?',
        a: 'September 1928 at St Mary’s Hospital, London',
        exp: 'Returned from holiday to find a green mould spore (Penicillium notatum) had dissolved staphylococcus bacteria on an agar dish.',
      },
      {
        q: 'What crucial medical fact did Fleming prove about raw penicillin mould juice in 1928–29?',
        a: 'It destroyed lethal bacteria without harming living human cells or toxic to white blood cells',
        exp: 'Published his findings in 1929, but lacked the biochemical facilities and funding to isolate or purify pure penicillin.',
      },
      {
        q: 'Which two Oxford scientists assembled a biochemical research team in 1938 to isolate and purify penicillin?',
        a: 'Howard Florey (Australian pathologist) and Ernst Chain (German-Jewish biochemist)',
        exp: 'Revived Fleming’s forgotten 1928 paper and succeeded in extracting pure, stable penicillin powder in their Oxford lab.',
      },
      {
        q: 'What famous experiment on mice in May 1940 proved the curative power of purified penicillin?',
        a: 'Injected eight mice with lethal streptococci; the four treated with penicillin survived while the untreated four died',
        exp: 'Provided definitive laboratory proof that penicillin was a revolutionary systemic antibiotic drug.',
      },
      {
        q: 'Who was the first human patient treated with penicillin in February 1941, and what tragic outcome occurred?',
        a: 'Policeman Albert Alexander, who suffered severe blood poisoning from a scratch by a rose thorn',
        exp: 'Showed miraculous recovery, but died when the team’s tiny supply of penicillin ran out, proving massive quantities were needed.',
      },
      {
        q: 'Why did Howard Florey travel to the United States in July 1941 to seek mass production help?',
        a: 'British chemical and pharmaceutical factories were fully booked manufacturing munitions for World War Two',
        exp: 'The Battle of Britain and Blitz bombing meant British industry could not construct new chemical fermentation plants.',
      },
      {
        q: 'What agricultural byproduct in Peoria, Illinois, increased penicillin production yields thousand-fold?',
        a: 'Corn-steep liquor combined with deep-fermentation tanks',
        exp: 'When fermented in giant 10,000-gallon industrial vats with a new cantaloupe melon mould strain, yields skyrocketed.',
      },
      {
        q: 'Which US government agency financed American pharmaceutical companies to mass-produce penicillin for D-Day?',
        a: 'The US War Production Board',
        exp: 'Enlisted chemical giants like Pfizer to produce 2.3 million doses in time for the Allied Normandy invasion in June 1944.',
      },
      {
        q: 'What prestigious international honor was awarded jointly to Fleming, Florey, and Chain in 1945?',
        a: 'The Nobel Prize in Physiology or Medicine',
        exp: 'Recognized their combined roles in discovering, purifying, and mass-manufacturing the world’s first true antibiotic.',
      },
      {
        q: 'What serious modern medical crisis has emerged from the over-prescription of antibiotics in healthcare and farming?',
        a: 'Antibiotic Resistance and the rise of drug-resistant "superbugs" like MRSA',
        exp: 'Overuse has allowed bacteria to mutate and resist penicillin, threatening a return to an era where simple cuts can kill.',
      },
    ],
  },

  // LESSON 20 (KT4.5): Case Study 2: Public Health & The Fight Against Lung Cancer
  {
    num: 20,
    id: 'lesson_4_5',
    era: 'modern',
    eraName: 'Modern Britain (c1900–present)',
    title: 'Case Study 2: Public Health & The Fight Against Lung Cancer',
    enquiry:
      'How Did the Government Use Legislation and Diagnostic Tech to Tackle the Modern Epidemic of Lung Cancer?',
    questions: [
      {
        q: 'What dramatic trend occurred in British lung cancer mortality rates during the first half of the 20th century?',
        a: 'Lung cancer deaths skyrocketed by over 1,400% between 1910 and 1950',
        exp: 'Driven by the soaring mass popularity of manufactured cigarettes among soldiers in WWI and WWII.',
      },
      {
        q: 'Which two British epidemiologists published the landmark scientific study in 1950 proving smoking caused lung cancer?',
        a: 'Richard Doll and Austin Bradford Hill',
        exp: 'Interviewed thousands of hospital patients across London, proving that cigarette smokers were 20x more likely to develop lung cancer.',
      },
      {
        q: 'What percentage of all modern lung cancer cases are directly caused by smoking tobacco products?',
        a: 'Approximately 85% to 90% of all cases',
        exp: 'Tobacco smoke contains over 60 known toxic chemical carcinogens that trigger cellular DNA mutations in lung tissue.',
      },
      {
        q: 'Why was diagnosing lung cancer in its early stages historically so difficult for physicians?',
        a: 'Symptoms (persistent cough, breathlessness, fatigue) often mimic common respiratory colds until tumors have spread',
        exp: 'Early lung cancer tumors are often painless, meaning patients seek medical help only after malignant metastasis.',
      },
      {
        q: 'What modern non-invasive diagnostic imaging tool is used to detect early-stage lung cancer nodules?',
        a: 'Low-dose CT (Computed Tomography) Chest Scans',
        exp: 'Detects tiny malignant pulmonary nodules long before they become visible on standard 2D chest X-rays.',
      },
      {
        q: 'What microscopic diagnostic procedure extracts cell tissue from lung tumors to determine exact cancer type?',
        a: 'Bronchoscopy and Needle Biopsy',
        exp: 'Allows pathologists to classify tumors as Small-Cell or Non-Small-Cell lung cancer to design targeted therapies.',
      },
      {
        q: 'What decisive legislative ban was passed by the British Parliament in 2007 to protect public health?',
        a: 'The ban on smoking in all enclosed public places and workplaces in England (The Health Act 2006)',
        exp: 'Banned smoking in pubs, restaurants, offices, and public transport to protect workers from toxic secondhand passive smoke.',
      },
      {
        q: 'Name three statutory government interventions introduced since 1965 to curb cigarette smoking in Britain.',
        a: 'Banning TV cigarette adverts (1965), graphic pictorial health warnings on packets (2008), and plain standardized packaging (2016)',
        exp: 'Combined with heavy fiscal taxation, raising the legal smoking age to 18 (2007), and mass media campaigns like "Stoptober".',
      },
      {
        q: 'What advanced treatment methods are used by modern NHS oncology teams to combat lung cancer?',
        a: 'Robotic surgical resection, targeted radiotherapy (CyberKnife), chemotherapy, and immunotherapy drugs',
        exp: 'Immunotherapy stimulates the patient’s own immune system to recognize and attack specific cancer tumor cells.',
      },
      {
        q: 'How does modern government action against lung cancer demonstrate a fundamental shift in the definition of "Public Health"?',
        a: 'Shifted from building physical infrastructure (clean water and sewers in 1875) to regulating citizen lifestyle choices and corporate marketing',
        exp: 'Modern public health focuses on behavioral nudges, prohibitive taxation, advertising bans, and preventive education.',
      },
    ],
  },
];

module.exports = { MEDICINE_THEMATIC_QUIZ_BANK };
