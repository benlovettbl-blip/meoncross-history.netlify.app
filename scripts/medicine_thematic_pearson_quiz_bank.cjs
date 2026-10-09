/**
 * medicine_thematic_pearson_quiz_bank.cjs
 *
 * Official Pearson Edexcel GCSE History Paper 1 (Section B: Thematic Study)
 * Medicine in Britain, c1250–present: Master Knowledge Retrieval Bank.
 * Exactly 20 Lessons x 10 Questions = 200 High-Yield Retrieval Questions.
 *
 * Pedagogical Standards (SEN & GCSE Exam Optimized):
 * 1. 100% Fidelity to the Pearson Edexcel Specification and Revision Guide.
 * 2. Chronological Anchoring: Key dates, laws, and publications pre-anchored in stems to test facts/causes.
 * 3. SEN-Accessible Language: Direct, plain English Tier-2 vocabulary; 100% preserved Tier-3 terms.
 * 4. Short, Focused Questions: Single-line stems (10–18 words) for maximum handwriting room.
 * 5. Two-Line Format: Line 1 = Key Fact; Line 2 = Historical Explanation (why it matters).
 * 6. Structured across the 4 core chronological eras (5 lessons each):
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
        a: 'God was punishing people for personal sins or testing their Christian faith',
        exp: 'Illness was seen as punishment from God, meaning healing required prayer, confession, and repentance.',
      },
      {
        q: 'How did the medieval Catholic Church control medical ideas and university training?',
        a: 'Monks hand-copied books in monasteries, and universities taught only Church-approved texts',
        exp: 'Because the Church ran universities and book copying, questioning Galen was treated as a religious crime (heresy).',
      },
      {
        q: 'In 1277, which English monk was imprisoned for arguing doctors should do scientific experiments?',
        a: 'Roger Bacon',
        exp: 'Imprisoned by Church leaders for saying doctors should observe nature instead of copying ancient books.',
      },
      {
        q: 'In March 1345, what unusual alignment of planets did medieval scholars blame for causing disease?',
        a: 'A conjunction of Saturn, Jupiter, and Mars',
        exp: 'Believed to create poisonous air that descended to earth as deadly, foul-smelling miasma.',
      },
      {
        q: 'What medical reference book containing planetary charts and calendars did medieval doctors carry?',
        a: 'An almanac (or Vademecum)',
        exp: 'Used to check lucky star alignments before carrying out bloodletting or giving herbal medicine.',
      },
      {
        q: 'What was the idea of "miasma" in medieval medical thinking?',
        a: 'Bad air corrupted by rotting waste, swamps, corpses, or filth that poisoned the body',
        exp: 'Led wealthy people to carry sweet-smelling flower posies and light scented fires to clear the air.',
      },
      {
        q: 'What physical disease did medieval Christians believe was a direct punishment from God for pride?',
        a: 'Leprosy',
        exp: 'Lepers were forced to ring warning bells and live in isolated leper houses outside town walls.',
      },
      {
        q: 'What religious penance was carried out by groups of flagellants during deadly plagues?',
        a: 'Publicly whipping themselves with leather scourges tipped with iron spikes',
        exp: 'Hoped to stop God’s anger and end the plague through voluntary bodily suffering.',
      },
      {
        q: 'Why did medieval priests believe saving the soul was far more important than curing the body?',
        a: 'The soul was immortal and faced heaven or hell, while the earthly body was temporary',
        exp: 'Confession and the last rites were considered far more important than physical medicine.',
      },
      {
        q: 'What role did medieval astrology diagrams like the "Zodiac Man" play in medical care?',
        a: 'Showed which zodiac star signs ruled specific parts and organs of the human body',
        exp: 'Doctors refused to cut or bleed a patient if the moon was in the star sign ruling that body part.',
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
        q: 'Name the Four Humours identified by ancient Greek doctor Hippocrates.',
        a: 'Blood, Phlegm, Yellow Bile (Choler), and Black Bile (Melancholy)',
        exp: 'Good health was believed to exist when all four fluids were in natural balance inside the body.',
      },
      {
        q: 'Which qualities and season were linked with the humour of Blood?',
        a: 'Hot and Wet, linked with the season of Spring and the element of Air',
        exp: 'Too much blood was believed to cause fevers, red skin, and an overly optimistic (sanguine) mood.',
      },
      {
        q: 'In the 2nd century AD, what theory did Roman doctor Galen create to balance the humours?',
        a: 'The Theory of Opposites',
        exp: 'Treated an excess of one quality with its direct opposite (e.g. cold phlegm treated with hot pepper).',
      },
      {
        q: 'Why did the medieval Christian Church strictly support the medical books of ancient doctor Galen?',
        a: 'Galen believed the human body was designed by a single Creator God',
        exp: 'Matched Christian teachings in the Bible, so the Church banned anyone from questioning his books.',
      },
      {
        q: 'Because ancient Roman law banned dissecting human bodies, what mistake did Galen make?',
        a: 'Dissected animals (like apes and pigs) and assumed human bodies were identical',
        exp: 'Led to errors like a two-piece human jawbone, which doctors accepted without checking for 1,300 years.',
      },
      {
        q: 'What medical check involved inspecting the colour, smell, and taste of a patient’s urine?',
        a: 'Uroscopy (using a urine chart)',
        exp: 'Physicians believed urine colour showed exactly which humour was unbalanced inside the patient.',
      },
      {
        q: 'What clinical method did Hippocrates introduce that became the foundation of modern medicine?',
        a: 'Careful clinical observation and recording of symptoms at the patient’s bedside',
        exp: 'Tracked the natural changes of illness over days rather than relying on astrology or demons.',
      },
      {
        q: 'What ethical pledge introduced by Hippocrates promised doctors would protect patient welfare?',
        a: 'The Hippocratic Oath ("First, do no harm")',
        exp: 'Bound doctors to keep patient secrets and always act in the patient’s best interests.',
      },
      {
        q: 'How did Galen incorrectly explain blood moving between the two sides of the heart?',
        a: 'Claimed blood passed through invisible microscopic pores in the heart wall (septum)',
        exp: 'An incorrect idea that prevented doctors from discovering blood circulation until William Harvey in 1628.',
      },
      {
        q: 'Why was the Theory of the Four Humours considered a "rational" medical idea in the Middle Ages?',
        a: 'It explained disease through natural physical fluids rather than spirits or curses',
        exp: 'Gave doctors a logical, structured way to understand sickness without relying purely on miracles.',
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
        q: 'What was the most common humoural treatment used by medieval doctors to balance the body?',
        a: 'Bloodletting (phlebotomy)',
        exp: 'Aimed to remove excess hot, wet blood to cool down fevers and restore internal humoural balance.',
      },
      {
        q: 'Name the three main practical ways medieval healers took blood from patients.',
        a: 'Opening a vein (with a fleam), Cupping (heated glass cups), and Leeches',
        exp: 'Chosen depending on the patient’s age, illness, and how physically weak they were.',
      },
      {
        q: 'What treatments were given to clear bad humours out of the stomach and bowels?',
        a: 'Laxatives (to empty bowels) and Emetics (to make patients vomit)',
        exp: 'Believed to physically flush poisonous humours and corrupt bile out of the digestive tract.',
      },
      {
        q: 'What ancient health guide gave personalised advice on diet, rest, exercise, and the Six Non-Naturals?',
        a: 'The Regimen Sanitatis (Rule of Health)',
        exp: 'Originated in Salerno and urged people to balance air, exercise, sleep, diet, excretion, and emotion.',
      },
      {
        q: 'What popular medieval mixture combined over 60 crushed herbs, spices, and snake flesh to treat poison?',
        a: 'Theriac (Venice Treacle)',
        exp: 'Widely treated as a wonder-cure capable of fighting off poisons, stings, and epidemic plagues.',
      },
      {
        q: 'What preventative measure was used in wealthy homes to clear bad-smelling miasma air?',
        a: 'Burning herbs (lavender, rosemary) and carrying pomanders filled with sweet spices',
        exp: 'Believed sweet scents actively cleaned poisonous air before it could be breathed into the lungs.',
      },
      {
        q: 'What religious journeys did sick people make hoping for a miraculous cure from God?',
        a: 'Pilgrimages to holy shrines (like Canterbury) and touching relics of saints',
        exp: 'Believed prayer at the tomb of holy martyrs like Thomas Becket could cure blindness and paralysis.',
      },
      {
        q: 'What surgical operation involved drilling or scraping a hole through the patient’s skull?',
        a: 'Trephining (trepanning)',
        exp: 'Used to relieve pressure from skull fractures or let out trapped evil spirits causing madness.',
      },
      {
        q: 'Why was cauterisation with red-hot irons so terrifying for medieval surgical patients?',
        a: 'It burned open flesh and amputated stumps with white-hot metal to seal blood vessels',
        exp: 'Extremely painful without anaesthetics, often causing fatal shock, infection, and tissue death.',
      },
      {
        q: 'What were medieval "herbals" and how were they used by ordinary families?',
        a: 'Illustrated books listing the medical uses of plants, herbs, and roots',
        exp: 'Helped women prepare home remedies, teas, and poultices to treat family illnesses.',
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
        q: 'What phrase describes the main goal of medieval English hospitals, which offered shelter rather than medicine?',
        a: '“Care Not Cure”',
        exp: 'Hospitals aimed to provide prayer, warmth, rest, and clean food rather than active medical treatments.',
      },
      {
        q: 'Who staffed and funded the majority of the 500+ hospitals in England by 1400?',
        a: 'Monks and nuns, funded through Church charity and wills left by wealthy citizens',
        exp: 'Run as religious houses where daily prayer, Christian charity, and quiet rest took first place.',
      },
      {
        q: 'Name four groups of people who were turned away from medieval monastic hospitals.',
        a: 'Plague victims, people with mental illness, pregnant women, and terminal cases',
        exp: 'Turned away to prevent disease spreading and keep wards quiet for prayer and spiritual preparation for death.',
      },
      {
        q: 'Which medical practitioner had a university degree, charged high fees, and diagnosed illnesses?',
        a: 'The University-Trained Physician',
        exp: 'Studied for up to 10 years in Latin reading Galen; affordable only for the king and wealthy nobles.',
      },
      {
        q: 'What was the job and practical training of a medieval Barber-Surgeon?',
        a: 'Carried out practical surgery (bloodletting, pulling teeth, lancing boils, setting bones)',
        exp: 'Trained by serving an apprenticeship; lacked university Latin and were viewed as working-class.',
      },
      {
        q: 'What was the main job of an Apothecary in a medieval town?',
        a: 'Mixed and sold herbal medicines, ointments, and laxatives prescribed by doctors or bought directly',
        exp: 'Far cheaper than university physicians, providing everyday medicine for ordinary town citizens.',
      },
      {
        q: 'Who provided almost all everyday healthcare for poor peasant families in rural villages?',
        a: 'Local Wise Women, herbalists, and female family members in the home',
        exp: 'Passed down home remedies, plant medicines, and childbirth midwifery across generations.',
      },
      {
        q: 'In 1123, which famous hospital was founded in London to care for the poor and sick?',
        a: 'St Bartholomew’s Hospital',
        exp: 'Set up by Rahere; survived for centuries as one of London’s greatest charitable hospitals.',
      },
      {
        q: 'What special hospital was built outside town walls specifically for people with leprosy?',
        a: 'A Lazar House (Leper Hospital)',
        exp: 'Kept contagious lepers separated from healthy townsfolk while giving them food, shelter, and chapel prayers.',
      },
      {
        q: 'Why was the main ward of a monastic hospital arranged so beds faced an altar?',
        a: 'So sick patients could see and hear daily Catholic Mass and prayers from their beds',
        exp: 'Reinforced the belief that religious repentance and prayer were vital for healing and saving the soul.',
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
        q: 'In 1348, the Black Death arrived in England at Melcombe Regis. Roughly what fraction of the population died?',
        a: 'Between one-third and one-half of the population (approx. 1.5 to 2 million people)',
        exp: 'Spread inland rapidly along trade roads, reaching London by autumn 1348 and killing over a third of the country.',
      },
      {
        q: 'What biological germ and flea vector caused the Black Death, though unknown to medieval doctors?',
        a: 'Yersinia pestis bacteria, spread by bites from fleas living on black rats',
        exp: 'People had no knowledge of bacteria or fleas, instead blaming planetary alignments, sin, and bad air.',
      },
      {
        q: 'In 1348, what two different forms of plague were identified by French doctor Guy de Chauliac?',
        a: 'Bubonic plague (painful buboes in armpits/groin) and Pneumonic plague (coughing up blood)',
        exp: 'Pneumonic plague attacked the lungs directly through cough droplets and was almost 100% fatal.',
      },
      {
        q: 'What religious explanation was given by the Church to explain the Black Death epidemic?',
        a: 'God’s anger provoked by human sins, greed, and bad behaviour across England',
        exp: 'Led King Edward III and the Archbishop of Canterbury to order special church services, prayers, and fasting.',
      },
      {
        q: 'What quarantine action did the town leaders of Gloucester take during the 1348 Black Death?',
        a: 'Shut town gates and refused entry to anyone traveling from infected Bristol',
        exp: 'Showed an early practical understanding of contagion, though it failed to keep the plague out.',
      },
      {
        q: 'How did London authorities handle the overwhelming number of dead plague bodies in 1348–49?',
        a: 'Dug giant mass burial pits outside city walls (like East Smithfield) and banned butchery on streets',
        exp: 'Tried to bury bodies quickly and clear animal filth to stop foul smells poisoning the city air.',
      },
      {
        q: 'What bizarre physical treatments did medieval healers try to draw out plague buboes?',
        a: 'Strapping live shaved chickens or toads to buboes, or cutting them open with hot blades',
        exp: 'Believed these drew out the poison, but in reality caused terrible pain and spread blood poisoning.',
      },
      {
        q: 'Why did many priests and doctors run away during the height of the Black Death in 1348–49?',
        a: 'Terrified of catching the fatal disease by visiting sickrooms',
        exp: 'Left thousands of dying people without medical care or Church last rites, creating panic and disorder.',
      },
      {
        q: 'What economic change happened after the Black Death wiped out over a third of England’s workers?',
        a: 'A severe labour shortage allowed surviving peasants to demand much higher wages',
        exp: 'Damaged the old feudal system, prompting Parliament to pass the 1351 Statute of Labourers to freeze wages.',
      },
      {
        q: 'Why did all medieval medical treatments fail completely against the Black Death?',
        a: 'Bleeding and purging weakened sick patients, while rats and fleas were left uncontrolled',
        exp: 'Taking blood lowered blood pressure, speeding up death from shock and organ failure.',
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
        q: 'What Renaissance movement encouraged scholars to question ancient ideas and observe nature directly?',
        a: 'Renaissance Humanism',
        exp: 'Encouraged people to test ideas through scientific experiments rather than blindly accepting old books.',
      },
      {
        q: 'Around 1440, what invention allowed medical books and ideas to be shared quickly without copying errors?',
        a: 'The movable-type printing press (Johannes Gutenberg)',
        exp: 'Stopped monk copying mistakes and allowed anatomical books with drawings to be mass-produced across Europe.',
      },
      {
        q: 'In 1660, the Royal Society was founded in London. What was its famous motto encouraging experiments?',
        a: '“Nullius in Verba” ("Take nobody’s word for it")',
        exp: 'Stressed that scientific theories had to be proven by repeatable experiments, not ancient tradition.',
      },
      {
        q: 'In 1665, what world-first scientific journal was launched by the Royal Society to share discoveries?',
        a: 'Philosophical Transactions',
        exp: 'Allowed scientists and doctors across Europe to read, test, and share new medical experiments.',
      },
      {
        q: 'In 1518, which royal college was set up by Henry VIII to license and regulate London doctors?',
        a: 'The Royal College of Physicians (RCP)',
        exp: 'Granted licenses to qualified doctors, though it continued to teach Galen for another century.',
      },
      {
        q: 'What 17th-century magnifying instrument allowed scientists to see tiny creatures for the first time?',
        a: 'The Compound Microscope (developed by Hooke and Leeuwenhoek)',
        exp: 'Robert Hooke published Micrographia (1665), drawing cells and fleas, though germs were not yet linked to disease.',
      },
      {
        q: 'Which Swiss doctor challenged Galen by recommending chemical minerals (like mercury) instead of bleeding?',
        a: 'Paracelsus',
        exp: 'Argued illness was caused by external chemicals rather than internal humours, using mercury for syphilis.',
      },
      {
        q: 'Between 1536 and 1540, what impact did Henry VIII’s Dissolution of the Monasteries have on English hospitals?',
        a: 'Closed over 500 church-run hospitals, causing a severe shortage of hospital beds',
        exp: 'Forced London hospitals like St Bart’s and St Thomas’ to be reopened as charity hospitals run by town councils.',
      },
      {
        q: 'What was the "Renaissance Paradox" regarding medical breakthroughs and everyday patient cures?',
        a: 'Doctors made huge anatomical discoveries, but day-to-day patient treatments barely changed',
        exp: 'Physicians understood the human body much better, but still lacked anaesthetics, antiseptics, and infection cures.',
      },
      {
        q: 'Why did ordinary people in the Renaissance continue using traditional herbal remedies and bleeding?',
        a: 'New anatomical discoveries offered no immediate cures, so traditional treatments remained the only option',
        exp: 'Humoural ideas and home remedies remained the only treatments available to common citizens.',
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
        q: 'Why was 17th-century English doctor Thomas Sydenham known as the "English Hippocrates"?',
        a: 'He revived careful bedside observation of patients rather than relying on old textbooks',
        exp: 'Stressed recording patient symptoms closely at the bedside instead of debating abstract medical theories.',
      },
      {
        q: 'What new idea did Thomas Sydenham introduce about identifying and classifying diseases?',
        a: 'Argued diseases were distinct species that could be grouped into families like plants',
        exp: 'Shifted medicine away from unique humoural imbalances toward identifying specific, recurring illnesses.',
      },
      {
        q: 'In 1676, what famous clinical textbook did Thomas Sydenham publish detailing his observations?',
        a: 'Observationes Medicae (Medical Observations)',
        exp: 'Became the standard clinical textbook in medical training across Europe for two centuries.',
      },
      {
        q: 'Which two common childhood diseases did Sydenham prove were separate illnesses for the first time?',
        a: 'Measles and Scarlet Fever',
        exp: 'Showed that illnesses previously lumped together as general fevers had distinct symptoms and rashes.',
      },
      {
        q: 'What treatment did Sydenham suggest for smallpox fevers, defying the tradition of wrapping patients in hot blankets?',
        a: 'The "Cool Regimen" (fresh air, cool drinks, and light blankets)',
        exp: 'Rejected wrapping smallpox victims in thick blankets by fires, dramatically improving their survival.',
      },
      {
        q: 'What South American tree bark containing quinine did Sydenham use to treat malarial fevers?',
        a: 'Cinchona bark (Jesuit’s bark)',
        exp: 'One of the first effective medicines that targeted a specific illness, showing specific drugs cured specific diseases.',
      },
      {
        q: 'What pain-relieving medicine did Sydenham make by dissolving raw opium in wine?',
        a: 'Laudanum',
        exp: 'Gave doctors a reliable painkiller and sedative to treat bowel pain, severe coughs, and surgical shock.',
      },
      {
        q: 'Why did Thomas Sydenham tell young doctors to put away ancient books and visit the bedside?',
        a: 'He believed true medical knowledge came only from watching and listening to sick patients directly',
        exp: 'Warned that arguing over humours and star charts stopped doctors from learning practical clinical skills.',
      },
      {
        q: 'How did Sydenham’s method of grouping illnesses challenge Galen’s Four Humours?',
        a: 'Galen treated every person’s illness as totally unique; Sydenham showed diseases shared predictable symptoms',
        exp: 'Helped lay the groundwork for modern medical diagnosis and targeted pharmaceutical drugs.',
      },
      {
        q: 'Despite his new observational methods, what traditional treatment did Sydenham still prescribe?',
        a: 'Occasional mild bloodletting and purges',
        exp: 'Shows that even the most forward-thinking Renaissance doctors were still influenced by humoural ideas.',
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
        q: 'In 1543, which brilliant anatomist published De Fabrica after dissecting human bodies in Padua?',
        a: 'Andreas Vesalius',
        exp: 'Professor of Surgery at Padua; transformed anatomical science through direct human dissection.',
      },
      {
        q: 'What famous textbook did Andreas Vesalius publish in 1543 with over 200 accurate anatomical drawings?',
        a: 'De Humani Corporis Fabrica (On the Fabric of the Human Body)',
        exp: 'Contained over 200 breathtakingly accurate anatomical illustrations based on dissecting human corpses.',
      },
      {
        q: 'How did Vesalius’s teaching method differ from traditional medieval medical professors?',
        a: 'He dissected human corpses himself with a scalpel rather than sitting on a high chair reading Galen in Latin',
        exp: 'Medieval lecturers had assistants cut animals while reading ancient texts; Vesalius showed students reality.',
      },
      {
        q: 'Roughly how many anatomical errors in Galen’s ancient books did Vesalius prove and correct?',
        a: 'Over 300 anatomical errors',
        exp: 'Proved Galen had dissected apes and dogs because ancient Roman law banned dissecting human bodies.',
      },
      {
        q: 'Give two specific mistakes made by Galen that Vesalius corrected in human anatomy.',
        a: 'The lower jaw is one bone (not two); the breastbone has three parts (not seven)',
        exp: 'Also disproved that the septum of the heart had invisible pores, and showed the liver did not have five lobes.',
      },
      {
        q: 'Where did Vesalius get human bodies for his dissections at the University of Padua?',
        a: 'Padua judges gave him the bodies of executed criminals, and he took bodies from gallows',
        exp: 'Gave him fresh human bodies to dissect muscles, nerves, veins, and bones systematically.',
      },
      {
        q: 'What advice did Vesalius give to medical students about trusting ancient books?',
        a: '“Trust not Galen, trust your own eyes”',
        exp: 'Urged doctors to base medical knowledge on direct dissection rather than accepting ancient books blindly.',
      },
      {
        q: 'What invention helped Vesalius’s anatomical drawings spread quickly across Europe and into England?',
        a: 'The printing press with detailed woodcut prints',
        exp: 'Allowed copies of his anatomical drawings to be printed and used by barber-surgeons in London by 1545.',
      },
      {
        q: 'How did traditional university doctors react to Vesalius’s discoveries?',
        a: 'Many attacked him bitterly and claimed human bodies must have changed since Galen’s time',
        exp: 'Traditional professors refused to admit Galen was wrong, forcing Vesalius to resign from Padua.',
      },
      {
        q: 'Why did Vesalius’s anatomical discoveries fail to save patients’ lives immediately in the 1500s?',
        a: 'Knowing human anatomy did not stop surgical pain, blood loss, or deadly infections',
        exp: 'Surgeons still lacked anaesthetics, antiseptics, and effective chemical drugs to cure internal illnesses.',
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
        q: 'In 1628, what landmark book did William Harvey publish in Frankfurt proving blood circulation?',
        a: 'De Motu Cordis (On the Motion of the Heart and Blood)',
        exp: 'Proved mathematically and through experiments that blood circulates continuously in one closed loop.',
      },
      {
        q: 'What royal role did English doctor William Harvey hold under King James I and King Charles I?',
        a: 'Royal Physician to the King',
        exp: 'His high royal status gave him money and protection to carry out pioneering experiments on the heart.',
      },
      {
        q: 'What mistaken belief about blood production had Galen taught for over 1,400 years?',
        a: 'That the liver constantly made new blood from food, which was burned up by the body like fuel',
        exp: 'Galen taught that veins carried blood from the liver, while arteries carried separate vital spirit from the heart.',
      },
      {
        q: 'What mathematical calculation did Harvey make to prove the liver could not be making blood?',
        a: 'Calculated the heart pumped 540 pounds of blood an hour—far more than the body’s weight',
        exp: 'Proved the liver could not possibly make that much blood; the same blood had to be recycled constantly.',
      },
      {
        q: 'What experiment on a human arm did Harvey carry out using a tight band to prove one-way blood flow?',
        a: 'Pushed blood along a vein with a finger, proving one-way valves stop blood flowing backward',
        exp: 'Showed that blood in veins flows only toward the heart, blocked by tiny pocket valves from reversing.',
      },
      {
        q: 'What mechanical machine inspired Harvey to view the heart as a muscle that pumped blood?',
        a: 'The mechanical water pump (used in firefighting and mines)',
        exp: 'Applied mechanical engineering to human biology, showing the heart works as a muscular force pump.',
      },
      {
        q: 'What microscopic blood vessels could Harvey not see, which were later discovered linking arteries to veins?',
        a: 'Capillaries',
        exp: 'Italian scientist Marcello Malpighi used microscopes in 1661 to see capillaries, confirming Harvey’s theory.',
      },
      {
        q: 'How did conservative English doctors react when Harvey first published his blood circulation discovery?',
        a: 'Ridiculed him as a "crackpot" and many patients left his medical practice',
        exp: 'Traditional physicians refused to admit Galen was wrong; it took nearly 50 years for universities to teach it.',
      },
      {
        q: 'Why did Harvey’s discovery of blood circulation make bleeding patients logically pointless?',
        a: 'Because blood circulates constantly in a single loop, bleeding one arm does not balance a separate organ',
        exp: 'Despite Harvey’s proof, doctors continued bloodletting for another 200 years because they lacked other cures.',
      },
      {
        q: 'Why did Harvey’s discovery have little immediate practical use for treating sick patients in 1628?',
        a: 'Knowing blood circulated did not cure fevers, and blood transfusions were deadly without blood typing',
        exp: 'Blood transfusions with animals or unmatched human blood caused fatal clotting, so practical uses took centuries.',
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
        q: 'In 1665, roughly how many people in London died during the Great Plague?',
        a: 'Approximately 100,000 people (around 20% of London’s population)',
        exp: 'The worst epidemic in England since 1348, causing mass panic across the crowded capital city.',
      },
      {
        q: 'What ancient ideas about disease causes persisted during the Great Plague of 1665?',
        a: 'Punishment from God, bad planet alignments, and poisonous bad air (miasma)',
        exp: 'Shows deep continuity; Renaissance doctors still had not discovered bacteria or that fleas spread plague.',
      },
      {
        q: 'Under the 1665 Plague Orders, what was done to homes where a family member caught the plague?',
        a: 'Locked inside for 28 days, watched by guards, with a red cross painted on the door',
        exp: 'Doors were painted with a red cross and "Lord Have Mercy on Us", with burials done only after dark.',
      },
      {
        q: 'What mistake did London authorities make regarding domestic animals in 1665?',
        a: 'Ordered the killing of 200,000 dogs and cats, allowing plague rats and fleas to multiply',
        exp: 'Disastrously killed the natural predators of black rats, allowing plague-carrying fleas to spread unchecked.',
      },
      {
        q: 'What protective outfit was worn by 17th-century plague doctors to ward off bad air?',
        a: 'A waxed leather coat and a bird-like mask filled with sweet herbs',
        exp: 'Designed to block bad air, though the thick waxed leather accidentally stopped fleas biting doctors.',
      },
      {
        q: 'What habit was encouraged, even for schoolchildren, to ward off plague miasma in 1665?',
        a: 'Smoking tobacco pipes',
        exp: 'People believed the strong, harsh smoke of burning tobacco drove away poisonous plague air.',
      },
      {
        q: 'Which brave London doctor stayed in the city during the 1665 plague to treat thousands of sick citizens?',
        a: 'Dr Nathaniel Hodges',
        exp: 'Visited hundreds of patients daily and wrote a detailed medical record of the plague in Loimologia (1672).',
      },
      {
        q: 'What weekly paper showed death numbers and caused panic in London parishes in 1665?',
        a: 'The London Bills of Mortality',
        exp: 'Published weekly by church clerks, letting people track soaring plague deaths across different parishes.',
      },
      {
        q: 'Why did King Charles II and wealthy London doctors flee to the countryside during the 1665 plague?',
        a: 'To escape the bad air and crowded sickness of the capital city',
        exp: 'Left poor citizens with few qualified physicians, forcing them to rely on quack medicines and apothecaries.',
      },
      {
        q: 'What was the single biggest difference between the 1348 and 1665 responses to epidemic plague?',
        a: 'The 1665 outbreak featured organized government rules, police searchers, and enforced quarantine',
        exp: 'While causal beliefs stayed the same (miasma and God), government public health actions were far more organized.',
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
        q: 'What mistaken theory claimed that rotting matter created living maggots and bacteria out of nowhere?',
        a: 'The Theory of Spontaneous Generation',
        exp: 'Believed bacteria were the result of rotting matter rather than the cause of decay and disease.',
      },
      {
        q: 'In 1861, Louis Pasteur published his Germ Theory. What did he prove was the real cause of decay?',
        a: 'Microscopic living germs (microbes) in the air, disproving Spontaneous Generation',
        exp: 'Showed that airborne microbes caused liquids to spoil, laying the foundation for modern medicine.',
      },
      {
        q: 'What famous experiment with swan-neck flasks did Louis Pasteur carry out to prove germs were in the air?',
        a: 'Boiled broth in S-shaped flasks; the broth stayed sterile until the glass neck was broken',
        exp: 'Showed germs fell into open liquids from dust in the air, rather than appearing out of nothing.',
      },
      {
        q: 'Which German scientist developed methods to stain, photograph, and grow specific bacteria on agar jelly?',
        a: 'Robert Koch',
        exp: 'Used industrial chemical dyes to stain clear bacteria and grew pure colonies on solid agar jelly.',
      },
      {
        q: 'Which two deadly human disease bacteria were discovered and isolated by Robert Koch in 1882 and 1883?',
        a: 'Tuberculosis (1882) and Cholera (1883)',
        exp: 'Proved definitively that specific microbes caused specific human illnesses, finally disproving miasma.',
      },
      {
        q: 'What four-step method did Koch introduce to prove a specific microbe caused a specific disease?',
        a: 'Koch’s Postulates',
        exp: 'A strict scientific standard: isolate the microbe, grow it pure, test in an animal, and retrieve it again.',
      },
      {
        q: 'Why did British doctors take over 15 years to accept Pasteur’s Germ Theory?',
        a: 'Doctors like Henry Bastian argued that invisible microbes could not possibly kill healthy humans',
        exp: 'Many doctors still believed disease was caused by bad air (miasma) and internal bodily decay.',
      },
      {
        q: 'Which British scientist gave public lectures using light beams in 1870 to prove dust carried germs?',
        a: 'John Tyndall',
        exp: 'Showed dust motes in room air carried living bacteria, helping convince the British medical establishment.',
      },
      {
        q: 'What weakened vaccines did Louis Pasteur create after discovering how germs work?',
        a: 'Vaccines for Chicken Cholera, Anthrax (1881), and Rabies (1885)',
        exp: 'Discovered that weakened or aged pathogens stimulated protective antibodies without killing the host.',
      },
      {
        q: 'How did war between France and Germany (1870–71) speed up discoveries by Pasteur and Koch?',
        a: 'National rivalry led both governments to pour huge funding into rival medical research teams',
        exp: 'Each country competed to prove scientific superiority and discover cures to save soldiers’ lives.',
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
        q: 'Before vaccination, what dangerous method involved scratching live smallpox scab pus into the skin?',
        a: 'Inoculation (variolation)',
        exp: 'Patients caught a mild dose of real smallpox, but risked dying or triggering a full epidemic.',
      },
      {
        q: 'In 1721, who brought the Turkish practice of smallpox inoculation to Britain?',
        a: 'Lady Mary Wortley Montagu',
        exp: 'Had her children inoculated after seeing it in Turkey, popularizing it among the British aristocracy.',
      },
      {
        q: 'In the 1790s, what country observation did Edward Jenner investigate regarding dairy milkmaids?',
        a: 'Milkmaids who caught mild cowpox never caught the deadly smallpox virus',
        exp: 'Jenner realized that catching mild cowpox gave people lifelong biological protection against smallpox.',
      },
      {
        q: 'In May 1796, what famous experiment did Jenner perform on eight-year-old James Phipps?',
        a: 'Infected him with cowpox pus from a milkmaid, then exposed him to smallpox; he did not get sick',
        exp: 'James developed mild cowpox but completely resisted smallpox infection, proving vaccination worked.',
      },
      {
        q: 'In 1798, what book did Jenner publish describing his successful smallpox prevention tests?',
        a: 'An Enquiry into the Causes and Effects of the Variolae Vaccinae',
        exp: 'Coined the word "vaccination" (from Latin vacca, cow) to distinguish it from dangerous inoculation.',
      },
      {
        q: 'Why did the Royal Society initially reject Edward Jenner’s paper on smallpox vaccination in 1797?',
        a: 'Jenner could not explain how or why it worked because microbes were unknown',
        exp: 'Because Germ Theory was still 60 years away, conservative doctors dismissed his findings as folklore.',
      },
      {
        q: 'Why did professional inoculators and private doctors oppose Jenner’s free smallpox vaccine?',
        a: 'They stood to lose large profits made by charging wealthy families high fees for inoculation',
        exp: 'Money and self-interest led many private doctors to publish pamphlets attacking vaccination.',
      },
      {
        q: 'What money did Parliament award Edward Jenner in 1802 and 1807 to fund vaccination?',
        a: 'A total of £30,000 in parliamentary grants',
        exp: 'Allowed Jenner to set up the Royal Jennerian Society in 1803 to give free vaccines nationwide.',
      },
      {
        q: 'In 1853, what law did the British government pass to protect newborn babies from smallpox?',
        a: 'The Compulsory Vaccination Act (1853)',
        exp: 'Ended optional public health; marked a major shift from laissez-faire toward compulsory health laws.',
      },
      {
        q: 'Why did the Anti-Vaccination League protest against compulsory vaccines in the 1860s and 1870s?',
        a: 'Believed forcing injections took away personal liberty and feared injecting animal matter',
        exp: 'Argued parents had a God-given right to decide their children’s healthcare without government control.',
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
        q: 'In 1854, what war prompted Florence Nightingale to take 38 nurses to Scutari hospital?',
        a: 'The Crimean War (1853–1856)',
        exp: 'Newspaper reports of shocking hospital neglect and dying British soldiers caused national outrage.',
      },
      {
        q: 'When Nightingale arrived at Scutari in 1854, what was the shocking death rate among wounded soldiers?',
        a: 'Approximately 42% (over 4 in 10 patients died)',
        exp: 'Soldiers were dying from typhus, cholera, and dysentery caused by blocked sewers beneath hospital wards.',
      },
      {
        q: 'What sanitary changes did Nightingale make that cut the death rate at Scutari to under 2%?',
        a: 'Cleaned sewers, washed bedding, scrubbed wards, boiled drinking water, and opened windows',
        exp: 'Dramatic proof that cleanliness, fresh air, and proper sanitation saved lives in hospitals.',
      },
      {
        q: 'Which Jamaican nurse traveled to the Crimea at her own expense to set up the British Hotel?',
        a: 'Mary Seacole',
        exp: 'Provided hot food, clean shelter, and nursing care to wounded British soldiers near the battlefield.',
      },
      {
        q: 'In 1859, what influential book did Florence Nightingale publish on hospital design and ventilation?',
        a: 'Notes on Hospitals',
        exp: 'Promoted the "pavilion plan" with separate wings, large windows for airflow, and wipeable tiled walls.',
      },
      {
        q: 'In 1860, what training school was set up by Nightingale at St Thomas’ Hospital in London?',
        a: 'The Nightingale Training School for Nurses',
        exp: 'Turned nursing from an untrained domestic job into a respected, disciplined medical profession.',
      },
      {
        q: 'What pie chart diagram did Nightingale invent to prove filth and disease killed more soldiers than bullets?',
        a: 'The Coxcomb Diagram (Polar Area Chart)',
        exp: 'Convinced politicians and generals that poor hospital sanitation caused thousands of avoidable deaths.',
      },
      {
        q: 'What was the character of 18th-century "voluntary hospitals" before Nightingale’s reforms?',
        a: 'Filthy, crowded charity buildings where surgical infections spread rapidly',
        exp: 'Known as "gateways to death" because dirty sheets and unwashed hands turned cuts into fatal gangrene.',
      },
      {
        q: 'What was the purpose of the 19th-century "cottage hospital" opened in rural areas from 1859?',
        a: 'Small local community hospitals run by local GPs for farmworkers',
        exp: 'Saved rural patients having to travel long journeys to crowded county hospitals for routine care.',
      },
      {
        q: 'How did the public view of hospitals change completely between 1800 and 1900?',
        a: 'Changed from feared places where the poor went to die into clean, scientific places of recovery',
        exp: 'Achieved through professional nurses, antiseptic surgery, trained doctors, and clean drainage.',
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
        q: 'What three deadly problems limited early 19th-century surgery to quick amputations?',
        a: 'Pain (shock), Infection (gangrene), and Bleeding (blood loss)',
        exp: 'Surgeons had to amputate limbs in under a minute while conscious patients were held down by assistants.',
      },
      {
        q: 'In 1847, which Scottish doctor discovered the powerful anaesthetic effects of chloroform?',
        a: 'James Young Simpson',
        exp: 'Tested chloroform fumes with his assistants in Edinburgh, waking up safely under the dinner table.',
      },
      {
        q: 'In 1853, what royal event stopped religious objections to using chloroform in childbirth?',
        a: 'Queen Victoria used chloroform during the birth of Prince Leopold',
        exp: 'Silenced Church critics who claimed the Bible demanded women feel pain during childbirth.',
      },
      {
        q: 'What was the "Black Period of Surgery" that happened after anaesthetics were first used c1846–1870?',
        a: 'Death rates rose because surgeons operated deeper and slower in dirty, unsterilized conditions',
        exp: 'Surgeons wore bloodstained coats and didn’t wash hands; longer operations carried more deadly bacteria deep inside.',
      },
      {
        q: 'In 1865, which surgeon used carbolic acid on compound fractures after reading Pasteur’s Germ Theory?',
        a: 'Joseph Lister',
        exp: 'Understood that wound rotting was caused by living airborne germs, not chemical reactions.',
      },
      {
        q: 'What clinical case in 1865 proved to Joseph Lister that carbolic acid stopped wound infection?',
        a: 'Treated eleven-year-old Jamie Greenlees’s broken leg with carbolic-soaked dressings',
        exp: 'The broken bone and torn flesh healed cleanly without infection, gangrene, or amputation.',
      },
      {
        q: 'What machine did Joseph Lister invent to spray carbolic acid mist across the operating room?',
        a: 'The Carbolic Spray machine (The "Donkey Engine")',
        exp: 'Pumped carbolic mist over surgical wounds, hands, and equipment throughout operations.',
      },
      {
        q: 'By how much did Joseph Lister reduce surgical death rates at Glasgow Royal Infirmary?',
        a: 'Reduced deaths from 46% down to 15% within three years (1865–1868)',
        exp: 'Provided statistical proof that killing external bacteria stopped surgical infections and saved lives.',
      },
      {
        q: 'What is the difference between Antiseptic surgery and Aseptic surgery?',
        a: 'Antiseptic kills germs in wounds with chemicals; Aseptic keeps all germs out of the room completely',
        exp: 'By the 1890s, asepsis replaced chemical sprays with steam-sterilized tools, gowns, and rubber gloves.',
      },
      {
        q: 'In 1890, which American surgeon introduced sterilized rubber surgical gloves to operating theatres?',
        a: 'William Halsted',
        exp: 'Originally invented for his nurse Caroline Hampton whose skin was burned by carbolic acid.',
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
        q: 'In 1831, what water-borne disease first hit Britain, killing over 30,000 people?',
        a: 'Asiatic Cholera (striking the port of Sunderland)',
        exp: 'Caused violent diarrhoea, vomiting, dehydration, and blue skin, often killing people within hours.',
      },
      {
        q: 'What government policy of "leave alone" meant councils did not want to spend taxes on sewers?',
        a: '“Laissez-faire” (leave alone)',
        exp: 'Local taxpayers and councils refused to pay higher taxes to clean streets or lay water pipes.',
      },
      {
        q: 'In 1842, who published a landmark report proving dirty living conditions caused poverty and disease?',
        a: 'Edwin Chadwick',
        exp: 'Used statistics to prove overcrowding, uncollected sewage, and bad water caused widespread illness.',
      },
      {
        q: 'Why did the First Public Health Act of 1848 fail to clean up most British towns?',
        a: 'It was purely voluntary, so councils were not legally forced to take action or raise taxes',
        exp: 'Fewer than 20% of towns set up health boards because ratepayers refused to pay for clean water.',
      },
      {
        q: 'In 1854, how did Dr John Snow prove cholera was spread through contaminated water in Soho?',
        a: 'Drew a dot map of 500 deaths, showing they all centered on the Broad Street water pump',
        exp: 'Proved deaths happened only among families who collected drinking water from that specific pump.',
      },
      {
        q: 'What action did John Snow take in September 1854 to stop the Soho cholera outbreak?',
        a: 'Persuaded the local council to remove the handle from the Broad Street pump',
        exp: 'Forced people to use other water sources; the local cholera epidemic stopped almost immediately.',
      },
      {
        q: 'What source of contamination was found leaking into the Broad Street water well?',
        a: 'A cracked cesspool leaking dirty sewage from a baby with cholera, just three feet away',
        exp: 'Physical proof that cholera was swallowed through sewage-contaminated water, not bad air (miasma).',
      },
      {
        q: 'In 1858, what environmental disaster forced Parliament to fund Joseph Bazalgette’s London sewers?',
        a: 'The “Great Stink” of 1858',
        exp: 'The Thames became so clogged with sewage that politicians fled Parliament, voting £3m for new sewers.',
      },
      {
        q: 'What 1867 voting reform gave working-class men the vote, forcing politicians to improve health laws?',
        a: 'The Second Reform Act of 1867',
        exp: 'Politicians had to win working-class votes by promising clean water, better housing, and public health.',
      },
      {
        q: 'In 1875, why was the Second Public Health Act a turning point for British public health?',
        a: 'Made it compulsory for every council to provide clean water, sewers, and health inspectors',
        exp: 'Permanently ended laissez-faire, forcing councils by law to inspect food, pave streets, and build drains.',
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
        q: 'In the 1860s, which Austrian monk discovered the basic rules of inheritance by breeding pea plants?',
        a: 'Gregor Mendel',
        exp: 'Showed physical traits were passed from parents to offspring as distinct units (now called genes).',
      },
      {
        q: 'In 1953, which two Cambridge scientists discovered the double-helix structure of DNA?',
        a: 'James Watson and Francis Crick',
        exp: 'Revealed that human genetic code is carried in a spiral ladder made of four chemical bases (A, T, C, G).',
      },
      {
        q: 'In 1952, which scientist took "Photograph 51" at King\'s College London, proving DNA’s helical shape?',
        a: 'Rosalind Franklin (working with Maurice Wilkins)',
        exp: 'Her clear X-ray diffraction photograph provided the crucial proof that DNA had a double helix.',
      },
      {
        q: 'Between 1990 and 2003, what international scientific project mapped every human gene?',
        a: 'The Human Genome Project',
        exp: 'Mapped all 3 billion base pairs in human DNA, pinpointing the location of roughly 25,000 genes.',
      },
      {
        q: 'Name two hereditary conditions that doctors now know are caused by specific faulty gene mutations.',
        a: 'Cystic Fibrosis and Huntington’s Disease',
        exp: 'Allows genetic testing and screening before a baby is born or before physical symptoms appear.',
      },
      {
        q: 'What mutated genes discovered in the 1990s are known to increase the risk of breast cancer?',
        a: 'BRCA1 and BRCA2 genes',
        exp: 'Allows preventive care: women with these genes can have regular scans or preventative operations.',
      },
      {
        q: 'What is "personalised medicine" (targeted gene therapy) in modern cancer care?',
        a: 'Treatments designed specifically to match an individual patient’s DNA and tumour genetics',
        exp: 'Replaces blanket chemotherapy with biological drugs that attack specific cancer cells.',
      },
      {
        q: 'How does modern genetic screening allow preventative treatment for disease?',
        a: 'Finds faulty gene mutations early so patients can take action before symptoms appear',
        exp: 'Helps people at high genetic risk make informed lifestyle choices or undergo preventive surgery.',
      },
      {
        q: 'How did discovering genetics change our understanding of what causes disease?',
        a: 'Showed illness can be caused by internal faulty genes, not just external germs from outside',
        exp: 'Proved many chronic illnesses are written into our cellular DNA, rather than caused solely by infections.',
      },
      {
        q: 'What ethical concerns have arisen from modern genetic screening and testing?',
        a: 'Fears of genetic discrimination by insurance firms and ethical debates over screening embryos',
        exp: 'Has forced governments to pass strict privacy laws protecting personal genetic information.',
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
        q: 'In 1895, which German physicist accidentally discovered X-rays while testing cathode ray tubes?',
        a: 'Wilhelm Röntgen',
        exp: 'Photographed his wife’s hand, clearly showing her bones and ring, revolutionizing diagnostic imaging.',
      },
      {
        q: 'In 1972, what 3D scanning machine was developed by British engineer Godfrey Hounsfield?',
        a: 'The CT scan (CAT scan)',
        exp: 'Used computers to combine multiple cross-sectional X-rays into clear 3D images of internal organs.',
      },
      {
        q: 'What scan developed in the 1970s uses powerful magnets and radio waves without harmful radiation?',
        a: 'The MRI scan',
        exp: 'Provides extraordinary detail of soft tissues, brain tumours, and spinal cords without radiation.',
      },
      {
        q: 'What miniature camera tool on a thin flexible tube lets doctors look inside organs without major surgery?',
        a: 'The Endoscope (used in Keyhole Surgery)',
        exp: 'Allows doctors to examine stomachs and joints through tiny cuts, vastly reducing surgery recovery times.',
      },
      {
        q: 'In 1903, what machine was invented by Willem Einthoven to record electrical signals of the heart?',
        a: 'The Electrocardiogram (ECG)',
        exp: 'Allows doctors to immediately spot heart attacks, rhythm problems, and heart damage at the bedside.',
      },
      {
        q: 'Name four modern lifestyle factors identified by doctors as main causes of chronic disease.',
        a: 'Smoking, poor diet/obesity, alcohol abuse, and lack of exercise',
        exp: 'Cause heart disease, stroke, and diabetes, shifting modern medicine from infections to lifestyle diseases.',
      },
      {
        q: 'What diagnostic test checks microscopic blood samples to find signs of disease and organ damage?',
        a: 'Blood testing (blood panels)',
        exp: 'Tests for blood sugar, cholesterol, liver enzymes, hormone levels, and cancer markers.',
      },
      {
        q: 'What safe scan uses high-frequency sound waves to check babies developing in the womb?',
        a: 'Ultrasound scanning',
        exp: 'Gives real-time images of unborn babies and heart valves without using any harmful radiation.',
      },
      {
        q: 'How did non-invasive diagnostic scans transform patient safety after 1900?',
        a: 'Stopped doctors having to cut patients open with exploratory surgery just to find what was wrong',
        exp: 'Doctors can now find tumours, internal bleeds, and bone fractures accurately before operating.',
      },
      {
        q: 'What personal digital devices do patients use today to track their health at home?',
        a: 'Digital blood pressure cuffs, blood sugar monitors, and wearable heart-rate monitors',
        exp: 'Allows people with diabetes and heart disease to monitor their condition daily without visiting a hospital.',
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
        q: 'What was Paul Ehrlich’s idea of a "Magic Bullet" in modern medicine?',
        a: 'A chemical drug that seeks out and destroys bacteria without harming healthy human cells',
        exp: 'Replaced harsh chemicals like carbolic acid with targeted drugs that killed only specific germs.',
      },
      {
        q: 'In 1909, what first magic bullet was discovered by Paul Ehrlich and Sahachiro Hata to cure syphilis?',
        a: 'Salvarsan 606 (an arsenic compound)',
        exp: 'Tested over 600 chemical compounds before finding that number 606 killed the syphilis bacteria.',
      },
      {
        q: 'In 1932, what second magic bullet dye was discovered by Gerhard Domagk to cure blood poisoning?',
        a: 'Prontosil (the first sulpha drug)',
        exp: 'A bright red dye that killed streptococcus bacteria, saving Domagk’s daughter from an arm amputation.',
      },
      {
        q: 'On 5 July 1948, the National Health Service (NHS) was launched by Aneurin Bevan. What was its core principle?',
        a: 'Free healthcare at the point of delivery for all citizens, funded by general taxation',
        exp: 'Replaced private fees and charity hospitals with free medical treatment for every British citizen.',
      },
      {
        q: 'Who was the Minister of Health in Clement Attlee’s Labour government who created the NHS in 1948?',
        a: 'Aneurin (Nye) Bevan',
        exp: 'Overcame fierce opposition from private doctors by allowing hospital consultants to keep private beds.',
      },
      {
        q: 'How did poor working-class families pay for healthcare before the NHS was created in 1948?',
        a: 'Had to pay out of their own pocket, use charity hospitals, or go without treatment',
        exp: 'The 1911 National Insurance Act covered only working men, leaving wives and children unprotected.',
      },
      {
        q: 'In 1967, what breakthrough organ transplant was completed by surgeon Christiaan Barnard?',
        a: 'The first successful human heart transplant',
        exp: 'Opened the way for modern organ transplants (kidneys, livers, lungs) using anti-rejection drugs.',
      },
      {
        q: 'What modern surgical method uses tiny tools and cameras through small punctures to heal faster?',
        a: 'Keyhole surgery (laparoscopic surgery)',
        exp: 'Vastly reduces bleeding, muscle cutting, infection risk, and hospital recovery times from weeks to days.',
      },
      {
        q: 'In 1942, what famous wartime report urged the government to defeat the "Five Giant Evils"?',
        a: 'The Beveridge Report (slaying Want, Disease, Ignorance, Squalor, and Idleness)',
        exp: 'Built huge public support for a welfare state and free healthcare for all after World War Two.',
      },
      {
        q: 'What major financial pressure does the NHS face in Britain today?',
        a: 'An ageing population, expensive high-tech machines, and rising rates of lifestyle illnesses',
        exp: 'Longer lifespans mean more people need expensive ongoing treatment for dementia, cancer, and diabetes.',
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
        q: "In September 1928, how did Alexander Fleming accidentally discover penicillin at St Mary's Hospital?",
        a: 'Returned from holiday to find penicillium mould had dissolved staphylococcus bacteria on an agar dish',
        exp: 'Realized the green mould produced a natural chemical juice that killed dangerous bacteria.',
      },
      {
        q: 'What key discovery did Alexander Fleming make about penicillin mould juice in 1928–29?',
        a: 'It killed deadly bacteria without harming human cells or white blood cells',
        exp: 'Published his findings in 1929, but lacked the biochemical skills and money to extract pure penicillin.',
      },
      {
        q: 'In 1938, which two Oxford scientists began work to purify and extract usable penicillin powder?',
        a: 'Howard Florey and Ernst Chain',
        exp: 'Revived Fleming’s forgotten paper and extracted stable penicillin powder in their Oxford lab.',
      },
      {
        q: 'In May 1940, what experiment on mice proved penicillin was a miracle cure for bacterial infection?',
        a: 'Injected eight mice with lethal bacteria; the four given penicillin survived while the other four died',
        exp: 'Proved definitively that penicillin worked inside a living body as a powerful antibiotic.',
      },
      {
        q: 'In 1941, who was the first human patient treated with penicillin, and why did he die?',
        a: 'Policeman Albert Alexander; improved rapidly, but died when the tiny supply of penicillin ran out',
        exp: 'Showed penicillin cured fatal blood poisoning, but proved vast quantities were needed to treat people.',
      },
      {
        q: 'In July 1941, why did Howard Florey travel to the United States to get penicillin mass-produced?',
        a: 'British factories were fully busy producing bombs and weapons for World War Two',
        exp: 'Wartime bombing and supply shortages meant British firms could not build big chemical vats.',
      },
      {
        q: 'In 1941, what agricultural liquid in Peoria, Illinois, multiplied penicillin production a thousand times?',
        a: 'Corn-steep liquor in giant industrial deep-fermentation vats',
        exp: 'Brewed with a new cantaloupe melon mould strain, yields skyrocketed to supply millions of doses.',
      },
      {
        q: 'In 1944, which military invasion received 2.3 million doses of mass-produced American penicillin?',
        a: 'The D-Day Allied landings in Normandy',
        exp: 'Saved thousands of wounded Allied soldiers from dying of gangrene and infected bullet wounds.',
      },
      {
        q: 'In 1945, what international award was given to Fleming, Florey, and Chain for penicillin?',
        a: 'The Nobel Prize in Physiology or Medicine',
        exp: 'Recognized their combined work in finding, purifying, and mass-producing the world’s first true antibiotic.',
      },
      {
        q: 'What serious modern medical danger has been caused by overusing antibiotics?',
        a: 'Antibiotic resistance and drug-resistant superbugs like MRSA',
        exp: 'Overuse has allowed bacteria to adapt, threatening a return to times when simple cuts could prove fatal.',
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
        q: 'Between 1910 and 1950, by how much did British lung cancer deaths increase due to cigarettes?',
        a: 'Skyrocketed by over 1,400%',
        exp: 'Driven by the soaring mass popularity of manufactured cigarettes among soldiers in WWI and WWII.',
      },
      {
        q: 'In 1950, which British doctors proved the direct link between cigarette smoking and lung cancer?',
        a: 'Richard Doll and Austin Bradford Hill',
        exp: 'Interviewed thousands of hospital patients, proving smokers were 20 times more likely to get lung cancer.',
      },
      {
        q: 'Roughly what percentage of modern lung cancer cases are caused by smoking tobacco?',
        a: 'Approximately 85% to 90% of all cases',
        exp: 'Tobacco smoke contains over 60 chemical poisons that cause cancerous mutations in lung cells.',
      },
      {
        q: 'Why was diagnosing lung cancer early historically so difficult for doctors?',
        a: 'Early symptoms (a mild cough, breathlessness) look like common colds until tumours have already spread',
        exp: 'Early tumours are often painless, meaning patients seek medical help only after cancer has spread.',
      },
      {
        q: 'What modern non-invasive scan is used to spot tiny lung cancer tumours before they spread?',
        a: 'Low-dose CT (Computed Tomography) chest scans',
        exp: 'Spots small lung tumours long before they become visible on standard 2D chest X-rays.',
      },
      {
        q: 'What test uses a camera tube into the airways to take tissue samples from lung tumours?',
        a: 'A Bronchoscopy and biopsy',
        exp: 'Allows doctors to test cancer cells and choose targeted radiotherapy or chemotherapy drugs.',
      },
      {
        q: 'In 2007, what landmark public health law banned smoking in all enclosed public places in England?',
        a: 'The 2007 Public Smoking Ban (Health Act 2006)',
        exp: 'Banned smoking in pubs, restaurants, offices, and buses to protect people from secondhand passive smoke.',
      },
      {
        q: 'Name three government measures introduced since 1965 to discourage cigarette smoking in Britain.',
        a: 'Banning TV cigarette adverts (1965), graphic health warnings (2008), and plain packaging (2016)',
        exp: 'Combined with heavy taxes, raising the legal smoking age to 18 (2007), and campaigns like Stoptober.',
      },
      {
        q: 'What modern medical treatments do NHS teams use today to treat lung cancer?',
        a: 'Keyhole surgery, targeted radiotherapy, chemotherapy, and immunotherapy drugs',
        exp: 'Immunotherapy boosts the body’s own immune system to spot and kill specific cancer tumour cells.',
      },
      {
        q: 'How does modern government action on lung cancer show a change in the meaning of "Public Health"?',
        a: 'Shifted from building clean water and sewers to changing personal lifestyle habits and advertising',
        exp: 'Modern public health focuses on health warnings, taxes, education, and advertising bans.',
      },
    ],
  },
];

module.exports = { MEDICINE_THEMATIC_QUIZ_BANK };
