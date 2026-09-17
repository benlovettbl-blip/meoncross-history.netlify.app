/**
 * scripts/enrich_medicine_visual_sources.cjs
 *
 * Enriches all 18 lessons of Edexcel GCSE Medicine Through Time & The Western Front:
 * 1. Clears top-of-lesson starters array (`starters: []`) to eliminate "Think & Wonder" dumping.
 * 2. Embeds primary visual sources directly into the relevant narrative_blocks with
 *    image, image_alt, caption, source_letter, and image_context (ending with **Hinge Question:** ...).
 * 3. Synchronizes lesson root `sources` array with lettered sources (Source A, Source B, Source C...).
 * 4. Synchronizes `teacher_notes.source_context` to include each source's context and hinge question.
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'units', 'edexcel_medicine', 'data.js');

async function run() {
  console.log('Loading edexcel_medicine data.js...');
  const fileUrl = 'file:///' + DATA_FILE.replace(/\\/g, '/');
  const mod = await import(fileUrl);
  const unitData = mod.unitData;

  if (!unitData || !unitData.lessons) {
    console.error('❌ Error: Could not find unitData.lessons in data.js');
    process.exit(1);
  }

  // The 18-Lesson Visual Sources Definitions
  const lessonSourcesMap = {
    // === KEY TOPIC 1 ===
    lesson_1_1: [
      {
        letter: 'A',
        blockIndex: 2, // Block 3: Rational Explanations: The Four Humours and Miasma
        image: '/images/four_humours.jpg',
        title: 'The Four Humours Wheel (Tacuinum Sanitatis, 14th c.)',
        provenance:
          'Tacuinum Sanitatis manuscript, 14th century, Österreichische Nationalbibliothek, Vienna.',
        caption:
          'The Four Humours Wheel: Blood (air/hot & wet), Phlegm (water/cold & wet), Yellow Bile (fire/hot & dry), and Black Bile (earth/cold & dry).',
        context:
          'The Theory of the Four Humours, first devised by Hippocrates in ancient Greece and developed by Galen in ancient Rome, dominated medieval European medicine. Medieval physicians believed that good health required all four bodily humours to remain in precise balance. Each humour corresponded to a season, an element, and specific qualities of heat and moisture. When a person fell ill, doctors assumed that one humour was in excess or putrefied.',
        hingeQuestion:
          'If a patient suffering from a cold and shivering was treated with hot spices and dry foods, which medical theory was the physician applying, and why did this belief prevent scientific progress for over a thousand years?',
      },
      {
        letter: 'B',
        blockIndex: 1, // Block 2: Supernatural and Religious Explanations
        image: '/images/zodiac_man.jpg',
        title: "The 'Zodiac Man' (Homo Signorum, c.1380)",
        provenance: 'MS Harley 3719, British Library, London, c.1380.',
        caption:
          'The Zodiac Man (Homo Signorum) showing the astrological signs that medieval physicians believed ruled over different areas and organs of the human body.',
        context:
          'Medieval doctors believed the movement of planets and stars directly influenced human physiology and health. Each part of the body was thought to be governed by a zodiac constellation—Aries ruled the head, Taurus the neck, and Pisces the feet. Before carrying out bloodletting, surgery, or administering strong medicines, university-trained physicians consulted complex astrological almanacs (calendars) to ensure the moon was not in an unfavorable zodiac sign for that body part.',
        hingeQuestion:
          "Why would a medieval university-trained physician refuse to operate on a patient's limb if the moon was in a certain astrological sign, and what does this reveal about medieval attitudes toward natural versus supernatural causes?",
      },
      {
        letter: 'C',
        blockIndex: 6, // Block 7: Medieval Diagnostic Methods
        image: '/images/medieval_urine_chart.jpg',
        title: 'Physician Inspecting Urine Flask (Fasciculus Medicinae, 1491)',
        provenance: 'Johannes de Ketham, Fasciculus Medicinae, Venice, 1491.',
        caption:
          'The Medieval Urine Chart: a radial wheel showing twenty flasks of differing colours, which physicians examined, smelled, and sometimes tasted to diagnose humoural imbalance.',
        context:
          "Uroscopy (the inspection of urine) was the cornerstone of clinical diagnosis in the Middle Ages. Physicians examined the color, cloudiness, sediment, and smell of a patient's urine in a pear-shaped glass vessel called a matula. By comparing the sample against radial urine wheels, doctors deduced which humour was dominating or corrupted inside the body.",
        hingeQuestion:
          "How did urine charts reinforce the unquestioned authority of Galen's humoural system, even though medieval physicians were examining physical, empirical bodily fluids?",
      },
    ],

    lesson_1_2: [
      {
        letter: 'A',
        blockIndex: 2, // Block 3: Rational Treatments: Balancing the Humours
        image: '/images/bloodletting.jpg',
        title: 'Phlebotomy / Bloodletting Manuscript (c.1300)',
        provenance: 'British Library MS Sloane 1977, England, c.1300.',
        caption:
          'Medieval manuscript illumination depicting a physician opening a vein in the arm to draw blood into a bowl to restore humoural equilibrium.',
        context:
          'Phlebotomy (bloodletting) was the most widely practiced medical treatment in medieval Europe. Physicians believed that an excess of blood—the warmest and wettest humour—caused fevers and pestilence. Blood was removed by opening a vein with a fleam or lancet, applying heated cupping glasses to draw blood through scratches, or using medicinal leeches.',
        hingeQuestion:
          'Why was bloodletting considered both a vital preventative measure and an active medical treatment in medieval England, and why did it frequently kill weakened patients?',
      },
      {
        letter: 'B',
        blockIndex: 4, // Block 5: Medical Professionals: Physicians, Apothecaries, and Surgeons
        image: '/images/medieval_barber_surgeon.jpg',
        title: 'Medieval Surgeon Suturing a Head Wound (14th c.)',
        provenance: 'Wellcome Collection MS L0037333, 14th century surgical treatise.',
        caption:
          "A medieval guild-trained surgeon suturing a patient's severe head wound with needle and thread, recorded in a 14th-century Latin manuscript.",
        context:
          'In medieval society, medical practice was strictly divided by class. University-trained physicians studied theory and Latin texts for years but rarely touched patients. Practical surgery—setting fractured bones, pulling teeth, lancing painful boils, and suturing wounds—was carried out by barber surgeons, who learned their trade through manual apprenticeships. Because their work involved physical manual labor and blood, barber surgeons were regarded as lower in social status than university physicians.',
        hingeQuestion:
          'Why did medieval university physicians look down on barber surgeons, despite barber surgeons performing the only practical, lifesaving procedures of the era?',
      },
      {
        letter: 'C',
        blockIndex: 5, // Block 6: Caring for the Sick: Hospitals and the Home
        image: '/images/hotel_dieu_hospital.jpg',
        title: 'Hôtel-Dieu Hospital Ward (Livre de Vie Active, c.1482)',
        provenance:
          "Livre de Vie Active des Religieuses de l'Hôtel-Dieu de Paris, Jean Henry, c.1482.",
        caption:
          'The main ward of the Hôtel-Dieu in Paris: Augustinian nuns tending to rows of patients sharing beds, providing spiritual comfort and rest.',
        context:
          'Medieval hospitals were religious foundations run by monks and nuns, not modern medical centers. Their stated purpose was hospitality, warmth, food, and spiritual care rather than scientific cure. Patients suffering from infectious diseases or mental illness were turned away. Inside, beds were placed in open wards aligned toward an altar so that bedridden patients could hear the Mass and pray for the salvation of their souls.',
        hingeQuestion:
          'Looking at the nuns providing spiritual care and prayer rather than surgery, why was the primary purpose of a medieval hospital hospitality and salvation rather than medical cure?',
      },
    ],

    lesson_1_3: [
      {
        letter: 'A',
        blockIndex: 0, // Block 1: The Black Death Arrives
        image: '/images/plague_burial.jpg',
        title: 'Citizens of Tournai Burying Plague Victims (1349)',
        provenance:
          'Illumination by Pierart dou Tielt, Gilles Li Muisis chronicle, MS 13076-77, Bibliothèque Royale de Belgique, Brussels, 1349.',
        caption:
          'The citizens of Tournai carrying wooden coffins to mass communal plague burial pits during the devastating Black Death epidemic of 1349.',
        context:
          'When the Black Death struck Europe in 1347–1349, it wiped out between 30% and 50% of the entire population. In London, parish churchyards overflowed within weeks, forcing city authorities to dig vast emergency trench graves outside the walls (such as at East Smithfield). Normal religious funeral rites collapsed because clergy died in huge numbers, and frightened grave-diggers could not keep pace with the mounds of corpses.',
        hingeQuestion:
          'What does the systematic stacking of identical wooden coffins in mass burial pits reveal about the breakdown of traditional Catholic funeral rites and social order during the Black Death?',
      },
      {
        letter: 'B',
        blockIndex: 1, // Block 2: Ideas about the Cause of the Plague
        image: '/images/black_death.jpg',
        title: 'Plague Victim with Groin and Armpit Buboes (1497)',
        provenance: 'Woodcut of St. Sebastian interceding for plague victims, Augsburg, 1497.',
        caption:
          'A bedridden plague victim showing painful inflamed lymph swellings (buboes) in the groin and neck, surrounded by weeping attendants.',
        context:
          'The bubonic plague, caused by the bacterium Yersinia pestis carried by black rat fleas, manifested in high fevers, internal bleeding (causing dark purple skin blotches), and excruciating swelling of the lymph glands in the neck, armpits, and groin. Medieval observers had no knowledge of bacteria or fleas; they believed the buboes were visible proof of humoural poisons and corrupt miasma boiling out of the blood.',
        hingeQuestion:
          'Why did the terrifying appearance of neck and groin buboes convince contemporary doctors that the four humours had completely putrefied inside the body, and why did this lead to deadly treatments like lancing buboes with heated irons?',
      },
    ],

    // === KEY TOPIC 2 ===
    lesson_2_1: [
      {
        letter: 'A',
        blockIndex: 1, // Block 2: [Key Individual: Andreas Vesalius]
        image: '/images/vesalius_fabrica_frontispiece.jpg',
        title: 'Frontispiece to De Humani Corporis Fabrica (1543)',
        provenance:
          'Woodcut title page designed by Jan van Calcar for Andreas Vesalius, published by Johannes Oporinus, Basel, 1543.',
        caption:
          'The revolutionary frontispiece to De Humani Corporis Fabrica (1543), showing Andreas Vesalius conducting a public human dissection in Padua.',
        context:
          "This title page is one of the most famous manifestos in scientific history. In medieval universities, professors of anatomy sat high up in a decorated pulpit (the cathedra) reading Galen in Latin, while an uneducated barber surgeon sliced the body below. Here, Vesalius sweeps the old hierarchy aside: he stands at the center of the crowded anatomical theatre, sleeves rolled up, dissecting a female cadaver with his own hands. Above him, a skeleton reminds the throng of mortality, while in the bottom corner a monkey and a dog mock Galen's reliance on animal dissection.",
        hingeQuestion:
          'How does Vesalius positioning himself directly at the center of the dissection table—wielding the scalpel himself rather than lecturing from Galen in an elevated chair—symbolize the entire scientific revolution of Renaissance medicine?',
      },
      {
        letter: 'B',
        blockIndex: 2, // Block 3: Continuity and Change in Explanations
        image: '/images/vesalius_muscle_men.jpg',
        title: "Vesalius' 'Muscle Men' Anatomical Woodcut (1543)",
        provenance: 'De Humani Corporis Fabrica, Book II (Musculature), Basel, 1543.',
        caption:
          'Plate from Book II of De Fabrica, depicting a flayed human figure displaying superficial musculature against an authentic Italian landscape.',
        context:
          'Through meticulous dissections of executed criminals in Padua, Vesalius corrected over 300 errors in the works of Galen. He proved that the human jawbone consists of one single bone (not two, as in dogs), that the human breastbone has three segments (not seven, as in apes), and that the septum dividing the heart is solid with no invisible pores. His lifelike, scientifically accurate illustrations set a new standard for medical publishing.',
        hingeQuestion:
          "Why did Vesalius' detailed anatomical engravings of human musculature prove conclusively that Galen had based his medical treatises on animal dissections rather than humans?",
      },
      {
        letter: 'C',
        blockIndex: 5, // Block 6: The Influence of the Printing Press
        image: '/images/printing_press.jpg',
        title: 'Early Gutenberg-Style Movable Type Printing Press (16th c.)',
        provenance:
          'Engraving of a Renaissance printing workshop, Plantin-Moretus Museum, Antwerp.',
        caption:
          'A Renaissance printing house showing compositors setting movable metal type and pressmen operating the heavy wooden screw press.',
        context:
          'Invented by Johannes Gutenberg around 1440, the movable type printing press revolutionized the spread of medical knowledge across Europe. Before printing, medical manuscripts were copied by hand by monks, which introduced errors, took months per book, and allowed the Catholic Church to censor any text challenging Galen. Printing allowed thousands of identical, illustrated anatomical textbooks to be distributed simultaneously across European universities at a fraction of the cost.',
        hingeQuestion:
          'Why was the invention of movable type printing far more dangerous to traditional Galenic medical authority than individual university lectures could ever be?',
      },
    ],

    lesson_2_2: [
      {
        letter: 'A',
        blockIndex: 1, // Block 2: Continuity and Change in Treatment
        image: '/images/pare_artificial_limbs.jpg',
        title: "Ambroise Paré's Mechanical Artificial Limbs (1575)",
        provenance:
          "Engraving from Les Oeuvres d'Ambroise Paré, Conseiller, et Premier Chirurgien du Roy, Paris, 1575.",
        caption:
          'Detailed mechanical diagrams of articulated artificial iron arms and hands with cogged gears and springs designed by French army surgeon Ambroise Paré.',
        context:
          'Ambroise Paré revolutionized battlefield surgery in 16th-century France. Rejecting the horrific practice of pouring boiling elder oil onto gunshot wounds, he substituted a soothing balm of egg yolks, rose oil, and turpentine. For amputations, he abandoned cautery irons in favor of silk ligatures to tie off arteries. Because so many wounded soldiers survived his operations, Paré collaborated with Parisian armorers and clockmakers to engineer sophisticated mechanical prosthetic limbs with articulated joint gears.',
        hingeQuestion:
          "Why did Paré's invention of mechanical prosthetic limbs with moving gears represent a decisive shift toward practical engineering and clinical experimentation over ancient medical dogma?",
      },
      {
        letter: 'B',
        blockIndex: 2, // Block 3: Continuity and Change in Prevention
        image: '/images/culpeper_herbal.jpg',
        title: "Nicholas Culpeper's English Physitian & Complete Herbal (1652)",
        provenance: 'Title page and engraved portrait, London, 1652 / Wellcome Library L0004048.',
        caption:
          "Title page of Nicholas Culpeper's The English Physitian, the first major medical guide to publish herbal remedies and medical knowledge in plain English.",
        context:
          "In 1649, apothecary Nicholas Culpeper outraged the London College of Physicians by translating their secret Latin pharmacopoeia into English. In 1652, he published 'The English Physitian' (later known as Culpeper's Complete Herbal), cataloging indigenous British wild herbs and astrological remedies so poor families could treat themselves without paying extortionate fees to university-trained Latin-speaking physicians. The College condemned him as a dangerous populist and quack.",
        hingeQuestion:
          'Why did the Royal College of Physicians furiously oppose Nicholas Culpeper publishing medical remedies in plain English rather than Latin?',
      },
      {
        letter: 'C',
        blockIndex: 3, // Block 4: Medical Care: Hospitals and the Community
        image: '/images/quack_doctor_steen.jpg',
        title: 'Jan Steen: The Quack Doctor Selling Elixirs (c.1650)',
        provenance: 'Oil painting by Jan Steen, Rijksmuseum, Amsterdam, c.1650–1660.',
        caption:
          'Jan Steen satirical painting De Kwakzalver (The Quack Doctor), depicting an itinerant charlatan peddling miracle elixirs and teeth extractions on an outdoor stage.',
        context:
          "Despite Renaissance intellectual breakthroughs, ordinary people rarely had access to university-trained physicians. Instead, medical markets were dominated by traveling 'quacks' (quacksalvers) who set up temporary stages in market squares. Quack doctors wore elaborate theatrical costumes, hired entertainers to draw crowds, and sold colorful bottled cure-alls made of alcohol, opium, and mercury that promised to cure everything from kidney stones to gout.",
        hingeQuestion:
          'Why did ordinary citizens continue to purchase untested herbal potions and elixirs from traveling quacks throughout the Renaissance, despite the anatomical discoveries of Vesalius?',
      },
    ],

    lesson_2_3: [
      {
        letter: 'A',
        blockIndex: 2, // Block 3: William Harvey and the Circulation of the Blood
        image: '/images/harvey_veins.jpg',
        title: "William Harvey's Arm Experiment with Valves in Veins (1628)",
        provenance:
          'Figures 1 & 2 from Exercitatio Anatomica de Motu Cordis et Sanguinis in Animalibus, Frankfurt, 1628.',
        caption:
          "Engravings from Harvey's De Motu Cordis demonstrating how one-way valves in the arm veins permit blood to flow only toward the heart.",
        context:
          "In 1628, English royal physician William Harvey demolished Galen's central theory of blood. Galen taught that the liver constantly manufactured new blood from digested food, which was then consumed by the organs like fuel. By tying a tight tourniquet around a man's arm and stroking blood along a vein past a valve, Harvey showed that blood could only travel toward the heart. Calculating the volume of blood pumped with every beat, Harvey proved that the liver would have to produce an impossible 540 pints of blood per day, proving the heart acted as a mechanical pump recirculating blood.",
        hingeQuestion:
          "How did Harvey's simple physical experiment with arm veins and a tourniquet mathematically prove that Galen's theory of blood being continuously manufactured by the liver was impossible?",
      },
      {
        letter: 'B',
        blockIndex: 4, // Block 5: Causes and Treatment of the Great Plague (1665)
        image: '/images/bill_of_mortality_1665.jpg',
        title: 'The London Bill of Mortality for the Great Plague (1665)',
        provenance:
          'Printed broadsheet by the Worshipful Company of Parish Clerks, London, September 1665.',
        caption:
          'General Bill of Mortality for the City of London recording 7,165 plague deaths in a single week at the height of the epidemic in September 1665.',
        context:
          'The Bills of Mortality were weekly printed broadsheets compiled by parish searchers across London to track burials and plague deaths. During the terrifying summer of 1665, the Great Plague killed nearly 100,000 Londoners (a fifth of the population). The bills recorded horrifying statistics: in one single week in September, 7,165 deaths were attributed directly to the pestilence.',
        hingeQuestion:
          'What does the staggering tally of 7,165 plague deaths in a single week reveal about the practical effectiveness of Renaissance medical treatments compared to the Black Death of 1348?',
      },
      {
        letter: 'C',
        blockIndex: 5, // Block 6: Prevention and Government Action in 1665
        image: '/images/plague_doctor_1665.png',
        title: "Engraving of 'Doktor Schnabel von Rom' (The Plague Doctor, 1656)",
        provenance:
          'Engraving by Paulus Fürst of Nuremberg, 1656, depicting the iconic beaked plague doctor costume.',
        caption:
          'The iconic plague doctor costume: heavy waxed leather coat, spectacles, a long bird-like beak filled with aromatics, and a wooden cane to examine corpses.',
        context:
          'During 17th-century plague epidemics, municipal authorities employed specialized plague physicians to inspect infected houses and certify deaths. To shield themselves from the disease, doctors wore head-to-toe suits of heavy waxed morocco leather and distinctive beaked masks. The beak was stuffed with pungent dried herbs, camphor, and cloves to filter out the poisoned air.',
        hingeQuestion:
          'Why did the glass eye-lenses and spice-packed beak of the plague doctor reflect the ongoing medical belief in Miasma theory, and why was this costume ineffective against flea bites?',
      },
    ],

    // === KEY TOPIC 3 ===
    lesson_3_1: [
      {
        letter: 'A',
        blockIndex: 4, // Block 5: Louis Pasteur and Germ Theory (1861)
        image: '/images/pasteur_swan_neck.jpg',
        title: "Pasteur's Swan-Neck Flask Experiment Diagram (1861)",
        provenance:
          'Annales des Sciences Naturelles, Paris, 1861 / Archives of the Institut Pasteur.',
        caption:
          "Diagram of Pasteur's famous swan-neck flask experiment: broth boiled in an S-shaped flask remained sterile indefinitely until the neck was snapped.",
        context:
          "In 1861, French chemist Louis Pasteur published his revolutionary Germ Theory, disproving the prevailing belief in 'Spontaneous Generation' (the idea that microbes spontaneously arose from rotting matter). Pasteur boiled nutrient broth inside glass flasks with long, curved S-shaped necks. Air could enter, but heavy airborne dust and microbes became trapped in the curve of the neck. The broth remained clear and sterile for months; only when the neck was broken and dust fell inside did bacteria multiply rapidly.",
        hingeQuestion:
          'Why did broth remain completely sterile when trapped inside the curved swan-neck, and how did this single experiment demolish the ancient doctrine of Spontaneous Generation?',
      },
      {
        letter: 'B',
        blockIndex: 5, // Block 6: Robert Koch and Microbe Hunting
        image: '/images/koch_bacteria.jpg',
        title: "Robert Koch's Microphotographs of Tuberculosis (1882)",
        provenance:
          'Die Aetiologie der Tuberkulose, Robert Koch, Berliner Klinische Wochenschrift, 1882.',
        caption:
          "Original 1882 lithographic plate from Koch's publication, showing tubercle bacilli bacteria stained bright blue with methyl violet dye.",
        context:
          'While Pasteur established the broad principle of Germ Theory, it was German doctor Robert Koch who identified the specific microbes responsible for individual human diseases. Koch pioneered the use of chemical industrial dyes (like methyl violet and methylene blue) to stain transparent bacteria so they stood out clearly under the microscope. He also invented solid culture mediums (using agar jelly in flat petri dishes) to grow pure bacterial colonies. In 1882, Koch stunned the scientific world by identifying the specific bacillus causing tuberculosis, followed by cholera in 1883.',
        hingeQuestion:
          "Why was Robert Koch's technique of using chemical dyes and agar jelly in petri dishes the breakthrough that turned Pasteur's broad Germ Theory into actionable clinical medicine?",
      },
      {
        letter: 'C',
        blockIndex: 1, // Block 2: [Key Individual: Louis Pasteur]
        image: '/images/pasteur_lab.jpg',
        title: 'Louis Pasteur in his Paris Laboratory (1885)',
        provenance: "Painting by Albert Edelfelt, Musée d'Orsay, Paris, 1885.",
        caption:
          'Louis Pasteur examining a spinal cord specimen of a rabid rabbit in his laboratory, leading to his rabies vaccine breakthrough in 1885.',
        context:
          "Albert Edelfelt's famous 1885 portrait shows Pasteur at the height of his fame in his laboratory at the École Normale Supérieure. He holds a glass flask containing the dried spinal cord of a rabid rabbit, which he used to attenuate (weaken) the deadly rabies virus. That same year, Pasteur successfully saved the life of nine-year-old Joseph Meister, who had been mauled by a rabid dog, proving vaccines could cure viral infections after exposure.",
        hingeQuestion:
          "How does Pasteur's experimental laboratory setting contrast with medieval physicians consulting urine wheels and astrological charts?",
      },
    ],

    lesson_3_2: [
      {
        letter: 'A',
        blockIndex: 1, // Block 2: [Key Individual: James Simpson]
        image: '/images/simpson_chloroform.jpg',
        title: 'James Young Simpson & Friends Testing Chloroform (1847)',
        provenance:
          'Contemporary lithograph depicting the discovery of chloroform at 52 Queen Street, Edinburgh, November 1847.',
        caption:
          'Professor James Young Simpson and his medical assistants Keith and Duncan unconscious under the dining room table after inhaling chloroform.',
        context:
          'Prior to 1847, surgery was an agonizing ordeal of speed and terror, with patients held down by muscular orderlies while surgeons amputated limbs in minutes. Ether was introduced in 1846, but it irritated the lungs and was highly explosive. In November 1847, Edinburgh obstetrician James Young Simpson and two colleagues tested various chemicals in his home dining room. Upon inhaling chloroform, they were knocked unconscious beneath the table. Simpson immediately began administering chloroform during childbirth, and its use gained royal sanction when Queen Victoria inhaled it during the birth of Prince Leopold in 1853.',
        hingeQuestion:
          "Why did the introduction of chloroform in 1847 paradoxically cause surgery mortality rates to rise during the so-called 'Black Period' of surgery?",
      },
      {
        letter: 'B',
        blockIndex: 2, // Block 3: [Key Individual: Joseph Lister]
        image: '/images/lister_carbolic_spray.jpg',
        title: 'Joseph Lister Operating with the Carbolic Acid Spray (1882)',
        provenance:
          'Illustration from Antiseptic Surgery: Its Principles, Practice, History and Results by W. Watson Cheyne, London, 1882 / Wellcome M0003436.',
        caption:
          'Surgeon Joseph Lister and his surgical team operating on a patient while a steam apparatus saturates the air with carbolic acid mist.',
        context:
          "Having read Pasteur's Germ Theory in 1865, Glasgow surgeon Joseph Lister realized that wound sepsis and gangrene were caused by airborne microbes entering open wounds. In 1867, he published his results using carbolic acid (phenol), which was already used to treat foul sewage in Carlisle. Lister sprayed carbolic mist continuously over the incision, soaked bandages in carbolic lotion, and washed his hands and instruments in it. Ward mortality from amputation plummeted from 46% down to 15%.",
        hingeQuestion:
          "Why did many British surgeons initially resist Lister's carbolic acid spray, despite it dramatically reducing patient deaths from post-operative sepsis?",
      },
      {
        letter: 'C',
        blockIndex: 3, // Block 4: Improvements in Hospital Care: Florence Nightingale
        image: '/images/nightingale_coxcomb.jpg',
        title: "Florence Nightingale's 'Coxcomb' Diagram of Military Mortality (1858)",
        provenance:
          'Diagram of the Causes of Mortality in the Army in the East, Royal Commission Report, London, 1858.',
        caption:
          "Nightingale's revolutionary Polar Area Graph ('Coxcomb') showing that the vast majority of soldier deaths in the Crimea were caused by preventable hospital infections (blue) rather than wounds (red).",
        context:
          "During the Crimean War (1854–1856), Florence Nightingale arrived at the British military hospital in Scutari to find squalor, blocked sewers, unwashed linen, and rampant typhus and cholera. Applying rigorous statistical analysis upon her return, Nightingale created her famous 'coxcomb' polar area diagram to present to the British government and Queen Victoria. The large blue wedges proved visually that preventable filth and sanitary neglect—not Russian battlefield bullets (red)—were killing British soldiers. Her campaign forced the total redesign of civilian and military hospitals into well-ventilated pavilion wards.",
        hingeQuestion:
          "What stark truth did Nightingale's statistical rose diagram expose about the true cause of death for British soldiers at Scutari Hospital in the Crimea?",
      },
    ],

    lesson_3_3: [
      {
        letter: 'A',
        blockIndex: 3, // Block 4: Opposition to Jenner's Discovery
        image: '/images/cow_pock_gillray.jpg',
        title:
          'James Gillray: The Cow-Pock or the Wonderful Effects of the New Inoculation! (1802)',
        provenance:
          'Hand-coloured satirical etching by James Gillray, published by Hannah Humphrey, London, 1802.',
        caption:
          'James Gillray famous cartoon lampooning Edward Jenner inoculating terrified patients who sprout miniature cows from their faces and limbs.',
        context:
          "In 1796, Gloucestershire country doctor Edward Jenner proved that cowpox (a mild dairy disease) protected humans against lethal smallpox. Despite saving thousands of lives, Jenner faced ferocious opposition from conservative doctors, religious preachers, and the public. Anti-vaccine groups claimed it was unchristian to inject matter from animals into human veins, and circulated rumors that vaccinated children would develop horns, hooves, and bovine faces. Gillray's brilliant satire captured these hysterical public anxieties.",
        hingeQuestion:
          "What religious objections and visceral fears does Gillray's satirical depiction of humans sprouting cows from their skin reveal about early resistance to Jenner's smallpox vaccination?",
      },
      {
        letter: 'B',
        blockIndex: 5, // Block 6: John Snow and the Broad Street Pump
        image: '/images/john_snow_cholera_map.jpg',
        title: "John Snow's Original 1854 Soho Cholera Spot Map",
        provenance:
          'On the Mode of Communication of Cholera, 2nd edition, John Snow, London, 1855.',
        caption:
          "The famous 'Ghost Map' of Soho, London, 1854: black bars represent cholera deaths clustering directly around the Broad Street public water pump.",
        context:
          'When cholera struck Soho in August 1854, killing over 600 people in ten days, prevailing medical orthodoxy blamed foul-smelling airborne miasma. Dr. John Snow, an anaesthetist, suspected cholera was a waterborne contagion. He went door-to-door recording the address of every fatal victim, drawing black tick-marks on a street map. The deaths clustered overwhelmingly around the Broad Street water pump. Snow showed that the nearby brewery, where workers drank only free beer, suffered zero cholera deaths. On 8 September 1854, Snow convinced the St James parish vestry to remove the handle of the pump, bringing the outbreak to an immediate end.',
        hingeQuestion:
          "How did John Snow's visual mapping of cholera deaths convince authorities to remove the pump handle, even though Germ Theory had not yet been established?",
      },
      {
        letter: 'C',
        blockIndex: 4, // Block 5: The Terrifying Threat of Cholera (1854)
        image: '/images/court_for_king_cholera.png',
        title: 'A Court for King Cholera (Punch, 1852)',
        provenance:
          'Cartoon by John Leech, Punch, or the London Charivari, Vol. 23, September 1852.',
        caption:
          "A slum courtyard in London depicting raw sewage, rotting refuse, and dilapidated tenements under the caption 'A Court for King Cholera'.",
        context:
          "Rapid industrialisation forced hundreds of thousands of factory workers into overcrowded urban slums without running water, sewage pipes, or refuse collection. Human waste drained into open cesspools beneath floorboards or directly into rivers like the Thames, which also provided drinking water. John Leech's haunting Punch cartoon depicted 'King Cholera' reigning over children playing on dung heaps, directly linking poverty, municipal neglect, and deadly epidemics.",
        hingeQuestion:
          'Why did public health authorities continue to blame filthy air (Miasma) rather than contaminated water for cholera outbreaks throughout the 1850s?',
      },
    ],

    // === KEY TOPIC 4 ===
    lesson_4_1: [
      {
        letter: 'A',
        blockIndex: 2, // Block 3: [Key Individual: Rosalind Franklin]
        image: '/images/photograph_51.jpg',
        title: "Rosalind Franklin's Photograph 51 (1952)",
        provenance:
          "X-ray diffraction photograph of B-DNA, taken by Rosalind Franklin and Raymond Gosling at King's College London, May 1952.",
        caption:
          'Photograph 51: the historic X-ray crystallography image that provided the critical mathematical proof of the double helix structure of DNA.',
        context:
          "In May 1952, physical chemist Rosalind Franklin and PhD student Raymond Gosling used X-ray crystallography to take a diffraction photograph of crystallized calf thymus DNA at King's College London after 62 hours of X-ray exposure. The distinct 'X' pattern of dark spots provided the definitive physical and mathematical proof that DNA had a helical structure. Franklin's colleague Maurice Wilkins showed this image to James Watson and Francis Crick at Cambridge without her knowledge or consent, enabling them to build their famous double helix wire model in 1953.",
        hingeQuestion:
          "How did the distinct 'X' pattern in Rosalind Franklin's X-ray crystallography image provide the mathematical proof that DNA was structured as a double helix?",
      },
      {
        letter: 'B',
        blockIndex: 3, // Block 4: The Discovery of DNA and Genetics
        image: '/images/dna_structure.jpg',
        title: 'Watson and Crick with the Wire DNA Model (1953)',
        provenance:
          'Photograph by Antony Barrington Brown, Cavendish Laboratory, University of Cambridge, May 1953.',
        caption:
          'James Watson and Francis Crick admiring their full-scale molecular wire model of the DNA double helix at the Cavendish Laboratory.',
        context:
          'Building on the X-ray data of Rosalind Franklin, James Watson and Francis Crick constructed a three-dimensional metal model demonstrating that DNA consists of two intertwined sugar-phosphate strands held together by complementary base pairs (adenine with thymine, cytosine with guanine). Understanding how genetic code was copied led directly to modern medical genetics, gene therapy, and the international Human Genome Project (1990–2003), which sequenced all 3 billion chemical base pairs in human DNA.',
        hingeQuestion:
          'How did mapping the human genome shift the focus of modern medicine from merely treating disease symptoms to predicting and preventing hereditary conditions?',
      },
      {
        letter: 'C',
        blockIndex: 5, // Block 6: Improvements in Diagnosis and Technology
        image: '/images/electron_microscope_virus.jpg',
        title: 'Transmission Electron Microscope (TEM) Imagery of Virus',
        provenance:
          'Transmission electron micrograph of virions, Public Health England / CDC Archives.',
        caption:
          'High-resolution transmission electron micrograph showing individual virus particles magnified over 100,000 times.',
        context:
          'Light microscopes, limited by the wavelength of light, can magnify objects up to 1,000 times—enough to see bacteria, but far too small to reveal viruses, which are 100 times smaller. The invention of the electron microscope by Ernst Ruska in 1931 used beams of electrons instead of light, allowing scientists to achieve magnifications of up to 10,000,000 times. For the first time, researchers could see viruses (such as influenza, polio, and hepatitis) and explore the internal machinery of human cells.',
        hingeQuestion:
          'Why was the invention of the electron microscope essential before scientists could finally detect and develop treatments for viral diseases?',
      },
    ],

    lesson_4_2: [
      {
        letter: 'A',
        blockIndex: 2, // Block 3: [Key Individual: Paul Ehrlich]
        image: '/images/paul_ehrlich_lab.jpg',
        title: 'Paul Ehrlich in his Frankfurt Laboratory (c.1910)',
        provenance:
          'Photograph of Paul Ehrlich examining chemical test tubes, Georg-Speyer-Haus, Frankfurt, c.1910.',
        caption:
          "German scientist Paul Ehrlich in his laboratory surrounded by hundreds of chemical compounds, seeking 'magic bullets' to destroy targeted bacteria.",
        context:
          "German scientist Paul Ehrlich believed it was possible to create chemical compounds that would act as 'magic bullets' (Zauberkugeln)—synthetic drugs that would selectively seek out and destroy specific disease-causing microbes in the human body without harming human cells. In 1909, after testing 605 unsuccessful arsenic derivatives, Ehrlich and his Japanese assistant Sahachiro Hata discovered that compound 606 (Salvarsan) cured syphilis. This was the first synthetic chemical antibiotic in history.",
        hingeQuestion:
          "Why was Salvarsan 606 hailed as a revolutionary 'magic bullet' compared to ancient chemical treatments like mercury?",
      },
      {
        letter: 'B',
        blockIndex: 7, // Block 8: Improved Access to Care: The Impact of the NHS
        image: '/images/nhs_established.jpg',
        title: '1948 Ministry of Health NHS Information Leaflet',
        provenance:
          'Central Office of Information leaflet distributed to every household in Britain, Ministry of Health, July 1948.',
        caption:
          "'The new National Health Service begins on 5th July': the official government pamphlet explaining free medical, dental, and hospital care.",
        context:
          "On 5 July 1948, Health Minister Aneurin Bevan officially launched Britain's National Health Service (NHS) at Park Hospital in Manchester. Before 1948, healthcare depended entirely on personal wealth, charitable hospitals, or private insurance; millions of working-class women and children went without doctor visits or medicines. The NHS was founded on three revolutionary principles: it met the needs of everyone, it was free at the point of delivery, and it was funded through central taxation.",
        hingeQuestion:
          'How did the founding principle of the NHS—free healthcare at the point of delivery financed through taxation—revolutionize health equality in post-war Britain?',
      },
      {
        letter: 'C',
        blockIndex: 8, // Block 9: High-Tech Medical and Surgical Treatment
        image: '/images/robotic_surgery_da_vinci.jpg',
        title: 'Modern Da Vinci Robotic Keyhole Surgery Unit',
        provenance:
          'Da Vinci Surgical System operating unit, Imperial College Healthcare NHS Trust, London.',
        caption:
          'A state-of-the-art robotic surgical console allowing surgeons to perform minimally invasive laparoscopic keyhole operations with microscopic precision.',
        context:
          "In the 21st century, surgery has moved from large open incisions to minimally invasive keyhole (laparoscopic) procedures. Using robotic systems like the Da Vinci surgical robot, surgeons sit at an ergonomic 3D high-definition console manipulating joystick controls that translate hand gestures into micro-movements of tiny robotic instruments inside the patient's body. This eliminates hand tremors, reduces blood loss, minimizes trauma to surrounding tissue, and cuts patient hospital stays from weeks to hours.",
        hingeQuestion:
          'How does robotic-assisted keyhole surgery reduce post-operative infection risks and recovery times compared to traditional open-cavity operations?',
      },
    ],

    lesson_4_3: [
      {
        letter: 'A',
        blockIndex: 1, // Block 2: Alexander Fleming's Accidental Discovery (1928)
        image: '/images/penicillin_mould.jpg',
        title: "Alexander Fleming's Contaminated Petri Dish (1928)",
        provenance:
          "Original culture plate of Penicillium notatum, St Mary's Hospital, London, September 1928 / British Museum.",
        caption:
          "The famous culture plate showing the fungal colony of Penicillium notatum surrounded by a clear 'halo' where staphylococcus bacteria were destroyed.",
        context:
          "In September 1928, Scottish bacteriologist Alexander Fleming returned from a vacation to his messy laboratory at St Mary's Hospital, London. Inspecting discarded culture plates of Staphylococcus bacteria, he noticed that a blue-green mould (Penicillium notatum) had drifted in through an open window and contaminated one dish. Crucially, Fleming observed a clear halo zone around the mould where the bacteria had been completely dissolved. Fleming published his findings in 1929, but because he could not isolate or stabilize the active juice, the discovery was largely ignored for a decade.",
        hingeQuestion:
          'What key visual detail on this petri dish proved that the Penicillium mould was actively destroying bacteria rather than simply competing for nutrient agar?',
      },
      {
        letter: 'B',
        blockIndex: 2, // Block 3: The Brilliant Teamwork of Florey and Chain (1939-1941)
        image: '/images/florey_chain_apparatus.jpg',
        title: 'Penicillin Culture Flasks at Wartime Production Plant (1943)',
        provenance: 'Imperial War Museum photograph D16958, England, 1943.',
        caption:
          'A laboratory technician checking rows of thousands of culture flasks growing penicillin mould on nutrient liquid during wartime mass production.',
        context:
          'In 1938, Oxford University pathologist Howard Florey and biochemist Ernst Chain assembled a multidisciplinary team to purify penicillin. Lacking industrial equipment during the Blitz, they improvised using milk churns, copper bath tubs, and hospital bedpans to grow the delicate mould. After proving its miraculous power in mice and testing it on dying Oxford policeman Albert Alexander in 1941, Florey traveled to the United States to persuade American chemical companies to adopt deep fermentation techniques, turning penicillin into a mass-produced wonder drug in time for D-Day 1944.',
        hingeQuestion:
          "Why did Florey and Chain's team have to rely on thousands of culture flasks and improvised containers before industrial mass-production was established?",
      },
      {
        letter: 'C',
        blockIndex: 3, // Block 4: Mass Production and the Second World War
        image: '/images/penicillin_propaganda.jpg',
        title: 'US War Production Board WWII Penicillin Poster (1944)',
        provenance: 'Wartime propaganda poster, War Production Board, Washington D.C., 1944.',
        caption:
          "'Thanks to PENICILLIN... He Will Come Home!': US wartime poster highlighting penicillin's role in slashing soldier deaths from wound infections.",
        context:
          'The mass production of penicillin transformed military survival rates in World War II. In World War I, 18% of soldiers with bacterial pneumonia or wound sepsis died; in World War II, thanks to mass-produced penicillin supplied to Allied field hospitals, mortality dropped below 1%. This poster demonstrates how scientific medicine was mobilized by governments as a decisive weapon of war.',
        hingeQuestion:
          'Why was the industrial cooperation of the US government and large pharmaceutical factories essential for turning penicillin from an Oxford laboratory experiment into a lifesaving weapon of war?',
      },
    ],

    lesson_4_4: [
      {
        letter: 'A',
        blockIndex: 1, // Block 2: The Rise of Lung Cancer and Early Diagnosis
        image: '/images/vintage_doctor_cigarette_ad.jpg',
        title: '1949 "More Doctors Smoke Camels" Print Advertisement',
        provenance:
          'Magazine print advertisement, R.J. Reynolds Tobacco Company, Winston-Salem, North Carolina, 1949/50.',
        caption:
          "'According to a Nationwide survey: MORE DOCTORS SMOKE CAMELS THAN ANY OTHER CIGARETTE': mid-century tobacco advertisement using medical endorsement.",
        context:
          "In the first half of the 20th century, cigarette smoking was heavily promoted as fashionable, sophisticated, and harmless. Cigarette companies paid doctors to endorse their products in print and radio advertisements, claiming their brand protected the 'T-Zone' (taste and throat) from irritation. Between 1910 and 1950, cigarette consumption in Britain soared tenfold, driving an unprecedented surge in lung cancer deaths.",
        hingeQuestion:
          'How does this 1949 advertisement demonstrating physician endorsement explain why public perception of smoking as a fatal health hazard was delayed for decades?',
      },
      {
        letter: 'B',
        blockIndex: 3, // Block 4: Science and Technology in Treatment
        image: '/images/lung_cancer_campaign.jpg',
        title: 'NHS Anti-Smoking Public Health Education Campaign',
        provenance: 'Health Education Council / NHS public awareness poster, London, 1970s.',
        caption:
          'Public education anti-smoking campaign illustrating the direct link between cigarette smoke inhalation, tar deposits, and cancerous lung tumors.',
        context:
          'In 1950, British epidemiologists Richard Doll and Austin Bradford Hill published a groundbreaking study in the British Medical Journal proving that heavy smokers were fifty times more likely to develop lung cancer than non-smokers. In 1962, the Royal College of Physicians confirmed smoking caused cancer and urged the government to restrict cigarette advertising. The UK government established the Health Education Council in 1968 to run hard-hitting mass media campaigns.',
        hingeQuestion:
          'Why was statistical epidemiological analysis of thousands of hospital patients required before governments accepted the causal link between smoking and lung cancer?',
      },
      {
        letter: 'C',
        blockIndex: 4, // Block 5: Government Action and Prevention
        image: '/images/plain_cigarette_packaging_uk.jpg',
        title: 'Standardised Plain Packaging Display (Children & Families Act)',
        provenance:
          'Retail tobacco display with standardized plain packaging in drab Pantone 448 C and mandatory graphic health warnings, UK/Australia.',
        caption:
          'Retail display of standardized plain cigarette packs: all brand logos and promotional fonts stripped away, replaced by graphic health warnings.',
        context:
          'Following the 2007 ban on smoking in enclosed public spaces, the UK government enacted the Children and Families Act 2014, introducing mandatory standardized plain packaging for all tobacco products from May 2016. All logos, bright colors, and glamorous branding were eliminated and replaced with a uniform drab dark olive-green (Pantone 448 C), accompanied by graphic photographs of diseased lungs and explicit warnings covering 65% of the packet.',
        hingeQuestion:
          'Why did public health policy transition from optional educational warning labels to total brand bans and mandatory graphic medical imagery on packaging?',
      },
    ],

    // === KEY TOPIC 5: THE WESTERN FRONT ===
    lesson_5_1: [
      {
        letter: 'A',
        blockIndex: 2, // Block 3: The Development of X-Rays
        image: '/images/rontgen_first_xray.jpg',
        title: "Wilhelm Röntgen's First Medical X-Ray (1895)",
        provenance:
          'Hand mit Ringen (Hand with Rings), radiograph of Anna Bertha Röntgen taken by Wilhelm Conrad Röntgen, Würzburg, 22 December 1895.',
        caption:
          "The world's first medical radiograph, revealing the bones and wedding ring of Anna Bertha Ludwig Röntgen, taken by Wilhelm Röntgen in December 1895.",
        context:
          "In November 1895, German physicist Wilhelm Conrad Röntgen was experimenting with cathode rays when he noticed that a nearby fluorescent screen glowed in the dark. He had discovered X-rays (electromagnetic radiation that passed through soft human flesh but was blocked by dense bone and metal). When his wife Bertha saw the skeletal radiograph of her own hand, she exclaimed, 'I have seen my death!' Within six months, X-rays were being used by military surgeons to locate bullets in wounded soldiers without exploratory surgery.",
        hingeQuestion:
          "Why did Röntgen's discovery of X-rays in 1895 revolutionize battlefield triage, allowing surgeons to locate buried bullets without exploratory cutting?",
      },
      {
        letter: 'B',
        blockIndex: 0, // Block 1: The Context of the Western Front
        image: '/images/aerial_trench_ypres.jpg',
        title: 'Aerial Photographic Map of Trenches at Ypres (1916)',
        provenance:
          'Royal Flying Corps aerial reconnaissance photograph, Ypres Salient, Belgium, 1916 / Imperial War Museum.',
        caption:
          'Aerial reconnaissance photograph of frontline, support, and communication trenches zigzagging through shell-cratered terrain near Ypres.',
        context:
          'The British sector of the Western Front stretched from the English Channel down through Belgian Flanders (the Ypres Salient) and northern France (the Somme, Arras, and Cambrai). Trenches were constructed in a zigzag pattern so that a blast wave or enemy machine-gunner entering a trench could not fire along its entire length. While this design protected soldiers from direct fire, the narrow, angular 90-degree corners made turning stretchers with wounded soldiers extraordinarily difficult.',
        hingeQuestion:
          'Why did the zigzag construction of frontline trenches protect soldiers from blast waves and enfilade fire, but severely hinder the rapid evacuation of stretcher casualties?',
      },
      {
        letter: 'C',
        blockIndex: 1, // Block 2: The Move Towards Aseptic Surgery
        image: '/images/gw_flooded_trench.jpg',
        title: 'British Soldiers in Waterlogged Mud Trench (1917)',
        provenance: 'Imperial War Museum photograph Q 5635, Flanders, 1917.',
        caption:
          'British soldiers standing knee-deep in liquid mud in a flooded communication trench on the Western Front.',
        context:
          "The terrain of the Western Front created catastrophic medical problems. Before the war, European surgeons had perfected 'aseptic surgery'—operating in sterile hospital theatres with sterilized gowns and boiled instruments. On the Western Front, the heavy artillery bombardment destroyed natural drainage canals, turning the rich, heavily manured agricultural fields of Flanders into deep, stagnant liquid mud. The soil was saturated with anaerobic bacteria (such as Clostridium tetani and Clostridium perfringens). When artillery shrapnel ripped through dirty uniforms into flesh, it drove lethal gas gangrene and tetanus deep into wounds.",
        hingeQuestion:
          'How did the heavily manured agricultural soil of Flanders turn minor shrapnel wounds into lethal gas gangrene and tetanus infections?',
      },
    ],

    lesson_5_2: [
      {
        letter: 'A',
        blockIndex: 0, // Block 1: Trench Environment and Illnesses
        image: '/images/trench_foot_clinical.jpg',
        title: 'RAMC Clinical Photograph of Trench Foot (c.1916)',
        provenance:
          'Medical photograph of severe trench foot, Royal Army Medical Corps Archives / Wellcome Collection.',
        caption:
          'A British soldier suffering from severe trench foot: swollen, blistered, and gangrenous tissue resulting from prolonged immersion in cold water.',
        context:
          "Trench foot was a debilitating condition caused by standing in cold water and mud for days without removing boots or socks. Constricted blood vessels starved tissue of oxygen, leading to numbness, painful swelling, open sores, and wet gangrene that frequently required amputation. In 1914–1915, the British Army treated over 20,000 cases of trench foot. The Army responded with strict preventative discipline: trenches were fitted with wooden duckboards, pumps drained water, and soldiers were paired up to inspect each other's feet and rub whale oil into their skin twice daily.",
        hingeQuestion:
          'Why was the British military order requiring soldiers to rub whale oil into their feet and change into dry socks twice daily enforced with disciplinary action?',
      },
      {
        letter: 'B',
        blockIndex: 2, // Block 3: The Trench System and its Organisation
        image: '/images/british_ph_gas_helmet.jpg',
        title: 'British Machine Gunners in PH Gas Helmets (Somme, 1916)',
        provenance:
          'Imperial War Museum photograph Q 3990, near Ovillers, Battle of the Somme, July 1916.',
        caption:
          'Vickers machine-gun crew of the Cheshire Regiment wearing Phenate-Hexamine (PH) anti-gas hoods in a chalk trench near Ovillers.',
        context:
          "Following the first German chlorine gas attack at Ypres in April 1915, British soldiers had no protective equipment, improvising by pressing socks or cotton pads soaked in urine over their faces. The British War Office quickly developed anti-gas helmets: first the 'Hypo helmet' (flannel soaked in sodium thiosulfate), then the PH (Phenate-Hexamine) hood with mica goggles and a rubber exhale valve, which neutralized both chlorine and poisonous phosgene gas. By 1916, this was replaced by the Small Box Respirator (SBR), which used charcoal and chemical filters.",
        hingeQuestion:
          'Why did early gas helmets soaked in chemicals provide only temporary protection against new chlorine and phosgene gas attacks?',
      },
      {
        letter: 'C',
        blockIndex: 3, // Block 4: Significance of the Terrain, Transport and Communications Infrastructure
        image: '/images/stretcher_bearers_passchendaele.jpg',
        title: 'Stretcher Bearers Carrying Casualty Through Deep Mud (Passchendaele, 1917)',
        provenance:
          'Photograph by John Warwick Brooke, Battle of Pilckem Ridge, Passchendaele, August 1917 / Imperial War Museum Q 5935.',
        caption:
          'Four exhausted British stretcher bearers wading waist-deep through liquid mud, struggling to carry a wounded soldier across the devastated battlefield.',
        context:
          'At the Third Battle of Ypres (Passchendaele) in 1917, relentless rainfall and millions of artillery shells reduced the landscape to a sea of liquid mud and water-filled craters. Motor ambulances and horse-drawn wagons could not travel near the front line because roads were obliterated. Stretcher bearers had to walk along narrow wooden duckboards slippery with slime. If a bearer slipped off the boards into a shell hole, he could drown under the weight of his equipment. It often required six men several hours to carry a single casualty a few hundred yards.',
        hingeQuestion:
          'Why did it routinely require 4 to 6 exhausted stretcher bearers several hours to transport a single wounded soldier over just 200 yards at Passchendaele?',
      },
    ],

    lesson_5_3: [
      {
        letter: 'A',
        blockIndex: 2, // Block 3: The Devastation of Shrapnel and Explosives
        image: '/images/ww1_shrapnel_xray.jpg',
        title: 'Diagnostic Radiograph of Lodged Bullet Localised with Lead-Wire Grid',
        provenance: 'Archives of the Roentgen Ray / Wellcome Collection M0013196.',
        caption:
          'An authentic radiograph showing a metallic bullet lodged deep in the skull, mapped precisely using an external lead-wire localization grid.',
        context:
          'Artillery shells caused over 58% of all wounds on the Western Front. High-explosive shells detonated with tremendous force, flinging jagged fragments of hot iron shrapnel that shattered bone, shredded tissue, and carried dirty muddy uniform cloth deep into the body. Bullets and shrapnel hidden deep in muscle tissue were impossible for surgeons to probe without causing catastrophic hemorrhaging. Radiographs taken with localized wire grids allowed surgeons to pinpoint the exact 3D coordinates of metallic fragments before cutting.',
        hingeQuestion:
          'Why was artillery shrapnel responsible for over half of all Western Front casualties, and how did X-ray grids allow surgeons to extract fragments without fatal exploratory cutting?',
      },
      {
        letter: 'B',
        blockIndex: 4, // Block 5: Head Injuries and the Brodie Helmet
        image: '/images/brodie_helmet_shrapnel.jpg',
        title: 'Brodie Steel Helmet with Shrapnel Dent (1916)',
        provenance: 'Imperial War Museum Artifact Collection, London, 1916.',
        caption:
          'A British Mark I Brodie steel helmet displaying a deep dent from an exploding artillery shrapnel ball that would have killed an unprotected soldier.',
        context:
          "In 1914, British soldiers went to war wearing soft cloth peaked caps, providing zero protection against descending shrapnel balls and rock splinters. Severe head trauma and fractured skulls accounted for an alarming proportion of fatal casualties. In late 1915, the British Army introduced the Mark I 'Brodie helmet' pressed from a single sheet of manganese steel with a broad brim to deflect falling shrapnel. The helmet reduced fatal head wounds by an estimated 80%. Interestingly, it led to an apparent increase in hospital admissions for head wounds, because soldiers who previously would have died were now surviving.",
        hingeQuestion:
          'Why did the introduction of the Brodie steel helmet in 1915 lead to a dramatic rise in hospital admissions for head wounds while overall fatal injuries fell?',
      },
      {
        letter: 'C',
        blockIndex: 5, // Block 6: The Terror of Poison Gas
        image: '/images/sargent_gassed_1919.jpg',
        title: 'John Singer Sargent: Gassed (1919)',
        provenance:
          'Monumental oil painting by John Singer Sargent, Imperial War Museum, London, 1919.',
        caption:
          'John Singer Sargent masterwork Gassed: a line of blinded soldiers in mustard gas bandages guided toward a casualty clearing station dressing tent.',
        context:
          'In July 1917, the German Army first deployed mustard gas at Ypres. Mustard gas was an oily, odorless liquid that soaked into the soil, uniform wool, and mud, lingering for days. It was an insidious blistering agent: hours after exposure, it burned internal airways, blinded eyes, and caused massive internal and external blisters. American artist John Singer Sargent witnessed the aftermath of a mustard gas barrage at Bailleulval in 1918, painting this monumental canvas showing lines of blinded teenage soldiers walking in single file, each resting a hand on the shoulder of the man in front.',
        hingeQuestion:
          "How does Sargent's painting of blinded soldiers walking in single file capture both the logistical burden and horrific human agony of mustard gas?",
      },
    ],

    lesson_5_4: [
      {
        letter: 'A',
        blockIndex: 0, // Block 1: The Chain of Evacuation
        image: '/images/ramc_chain_of_evacuation.jpg',
        title: 'Reception of the Wounded at 41st Casualty Clearing Station (1918)',
        provenance:
          'Oil painting by John Hodgson Lobley, Imperial War Museum ART 3800, Le Cateau, October 1918.',
        caption:
          'Wounded soldiers on stretchers filling the marquee triage reception area at the 41st Casualty Clearing Station during the final British advance.',
        context:
          'The Chain of Evacuation was the carefully choreographed system developed by the Royal Army Medical Corps (RAMC) to treat and evacuate hundreds of thousands of casualties. Soldiers moved from the Regimental Aid Post (RAP) in the frontline trench, to the Advanced Dressing Station (ADS), to the Main Dressing Station (MDS), to the Casualty Clearing Station (CCS), and finally by ambulance train or barge to large Base Hospitals on the French coast. The CCS was the most vital medical link: situated just beyond artillery range (7–12 miles behind the lines), it was the first place equipped with operating theatres, mobile X-ray trucks, and surgical specialists.',
        hingeQuestion:
          'Why was the triage sorting decision made upon arrival at the Casualty Clearing Station (CCS) the most critical medical judgment determining whether a wounded soldier lived or died?',
      },
      {
        letter: 'B',
        blockIndex: 2, // Block 3: Transport in the Chain of Evacuation
        image: '/images/casualty_clearing_station_ww1.jpg',
        title: 'Ambulance Train Wards on the Western Front (1917)',
        provenance: 'Imperial War Museum photograph Q 6328, Western Front, 1917.',
        caption:
          'British ambulance train interior fitted with tiered sprung bunks, heating, and pharmacy facilities to transport stabilized casualties to Base Hospitals.',
        context:
          'Transporting wounded men across rough, shell-blasted roads in solid-wheeled motor ambulances caused agonizing pain and aggravated bone fractures. For long journeys from the CCS to coastal Base Hospitals (such as Boulogne, Calais, and Rouen), the RAMC relied on specially converted ambulance trains. Each train could carry up to 500 bed-ridden patients, complete with sprung bunks, kitchens, and operating facilities for medical emergencies. For severe chest and spinal injuries, waterborne canal barges along the French canal network offered the smoothest, shock-free transport possible.',
        hingeQuestion:
          'Why were waterborne canal barges preferred over motor ambulances or rail transport for soldiers suffering from severe head, spinal, and chest trauma?',
      },
      {
        letter: 'C',
        blockIndex: 4, // Block 5: Stages of Treatment: CCS and Base Hospitals
        image: '/images/field_hospital_xray_1917.jpg',
        title: 'Underground Hospital Ward at Arras (1917)',
        provenance: 'Imperial War Museum photograph Q 5158, Arras, France, 1917.',
        caption:
          'The underground hospital complex in the chalk quarries of Arras: fully protected subterranean hospital beds with electric lighting and running water.',
        context:
          "During the Battle of Arras in April 1917, British and New Zealand engineers linked ancient underground chalk quarries into an immense subterranean fortress known as the Wellington Quarries. Here, the RAMC constructed a 700-bed underground field hospital (Thompson's Cave) just 800 yards from the German front lines. Completely immune to artillery bombardment, it featured operating theatres, running water, electric lights, and waiting wards, allowing surgical operations to begin within minutes of wounding.",
        hingeQuestion:
          'Why did the RAMC locate major surgical operations forward at the CCS and underground hospitals at Arras rather than waiting to transport men to coastal Base Hospitals?',
      },
    ],

    lesson_5_5: [
      {
        letter: 'A',
        blockIndex: 3, // Block 4: The Thomas Splint
        image: '/images/thomas_splint_authentic.jpg',
        title: 'The Thomas Splint Demonstrated on a Wounded Soldier (1916)',
        provenance:
          'Royal Army Medical Corps training manual / Imperial War Museum photographic collection, 1916.',
        caption:
          'Demonstration of the Thomas Splint: a metal and leather traction frame that pulled the broken femur straight, preventing severed arteries and shock.',
        context:
          'In 1914, a compound fracture of the femur (thigh bone) caused by artillery shrapnel was an 80% death sentence. As stretcher bearers carried the casualty, the jagged ends of the broken bone ground together, severing femoral blood vessels, causing massive internal hemorrhaging, muscle spasms, and fatal shock. In 1915, Welsh orthopedic surgeon Robert Jones introduced the traction splint designed by his uncle Hugh Owen Thomas. The simple metal frame and leather collar kept the leg in constant tension, pulling the bone ends apart. By 1916, when all stretcher units carried the Thomas Splint, femur fracture mortality plummeted from 80% down to under 20%.',
        hingeQuestion:
          'How did this simple metal and leather traction frame reduce soldier mortality from compound femur fractures from 80% in 1914 down to under 20% by 1916?',
      },
      {
        letter: 'B',
        blockIndex: 5, // Block 6: Blood Transfusions and the Blood Bank at Cambrai
        image: '/images/robertson_blood_depot_1917.jpg',
        title: "Geoffrey Keynes & Robertson's Portable Blood Transfusion Kit (1917)",
        provenance: 'Wellcome Collection L0058180, United Kingdom / RAMC, 1917.',
        caption:
          'A portable wooden field transfusion case designed by Lieutenant Geoffrey Keynes (RAMC) with calibrated glass bottles and anticoagulant regulators.',
        context:
          "Before 1915, blood transfusions were performed directly person-to-person using syringes, which was slow, dangerous, and impractical during mass casualties. Breakthroughs in 1915 showed that adding sodium citrate prevented blood from clotting, while glucose allowed it to be stored on ice. At the Battle of Cambrai in November 1917, American doctor Oswald Hope Robertson established the world's first blood bank: storing universal Group O blood in glass bottles packed in sawdust and ice for up to 28 days. Robertson treated 20 severely shocked soldiers who were expected to die, and 11 survived.",
        hingeQuestion:
          "Why was Robertson's discovery that adding sodium citrate allowed blood to be bottled and kept on ice essential for the mass tank offensive at the Battle of Cambrai?",
      },
      {
        letter: 'C',
        blockIndex: 8, // Block 9: The Work of Harold Gillies and Plastic Surgery
        image: '/images/gillies_tubed_pedicle.jpg',
        title: "Walter Yeo's Facial Reconstruction by Harold Gillies (1917)",
        provenance:
          "Queen's Hospital Sidcup Case Records, Harold Delf Gillies, 1917 / Wellcome Collection.",
        caption:
          "Walter Yeo before and after facial reconstruction by Harold Gillies using the 'tubed pedicle' skin flap technique at Queen's Hospital, Sidcup.",
        context:
          "New Zealand-born surgeon Harold Gillies established the Queen's Hospital in Sidcup, Kent, in 1917 as the world center for facial reconstructive surgery. Over 11,000 soldiers with horrific facial disfigurements from shrapnel were treated there. Gillies invented the revolutionary 'tubed pedicle' technique: a flap of skin was cut from the chest or neck and rolled into a living tube stitched to the face. The tube maintained its own blood supply until new capillaries grew into the facial graft, preventing the skin from dying of gangrene before healing. Walter Yeo, who lost his eyelids and upper face at the Battle of Jutland in 1916, was the first patient successfully treated with this technique.",
        hingeQuestion:
          "Why did Harold Gillies invent the 'tubed pedicle' skin roll, and how did it overcome the fatal problem of grafted tissue dying from lack of blood supply?",
      },
    ],
  };

  let totalUpdatedLessons = 0;
  let totalSourcesAdded = 0;

  unitData.lessons.forEach((lesson, lIdx) => {
    const lId = lesson.id;
    console.log(`Processing [Lesson ${lIdx + 1}] ${lId}: ${lesson.title}`);

    // 1. Clear top-of-lesson starters array
    lesson.starters = [];

    // 2. Clear old image fields from all narrative blocks in this lesson first
    if (lesson.narrative_blocks) {
      lesson.narrative_blocks.forEach((b) => {
        delete b.image;
        delete b.image_alt;
        delete b.caption;
        delete b.image_caption;
        delete b.source_letter;
        delete b.image_context;
        delete b.source;
      });
    }

    const sourcesConfig = lessonSourcesMap[lId];
    if (!sourcesConfig || sourcesConfig.length === 0) {
      console.warn(`⚠️  No sources config found for ${lId}`);
      return;
    }

    // Prepare sources array for the lesson
    const updatedSources = [];
    if (!lesson.teacher_notes) lesson.teacher_notes = {};
    if (!lesson.teacher_notes.source_context) lesson.teacher_notes.source_context = {};

    sourcesConfig.forEach((cfg) => {
      // Narrative block placement
      if (lesson.narrative_blocks && lesson.narrative_blocks[cfg.blockIndex]) {
        const targetBlock = lesson.narrative_blocks[cfg.blockIndex];
        targetBlock.image = cfg.image;
        targetBlock.image_alt = `Source ${cfg.letter}: ${cfg.title}`;
        targetBlock.caption = cfg.caption;
        targetBlock.source_letter = cfg.letter;
        targetBlock.image_context = `${cfg.context} **Hinge Question:** ${cfg.hingeQuestion}`;
      } else {
        console.warn(
          `⚠️  Block index ${cfg.blockIndex} not found in ${lId} (total blocks: ${lesson.narrative_blocks ? lesson.narrative_blocks.length : 0})`,
        );
      }

      // Root sources array
      updatedSources.push({
        id: `source_${cfg.letter.toLowerCase()}`,
        letter: cfg.letter,
        title: `Source ${cfg.letter}: ${cfg.title}`,
        src: cfg.image,
        image: cfg.image,
        caption: cfg.caption,
        provenance: cfg.provenance,
        context: cfg.context,
        hinge_question: cfg.hingeQuestion,
      });

      // Teacher notes source context (mandatory rule: must finish with Hinge Question)
      lesson.teacher_notes.source_context[`Source ${cfg.letter}`] =
        `${cfg.context} **Hinge Question:** ${cfg.hingeQuestion}`;

      totalSourcesAdded++;
    });

    lesson.sources = updatedSources;
    totalUpdatedLessons++;
  });

  console.log(`\nWriting updated data back to ${DATA_FILE}...`);
  const outputCode = `export const unitData = ${JSON.stringify(unitData, null, 2)};\n`;
  fs.writeFileSync(DATA_FILE, outputCode, 'utf8');

  console.log(
    `🎉 Successfully enriched ${totalUpdatedLessons} lessons with ${totalSourcesAdded} visual sources!`,
  );
}

run().catch((err) => {
  console.error('❌ Error executing enrichment:', err);
  process.exit(1);
});
