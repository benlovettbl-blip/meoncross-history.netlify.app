/**
 * scripts/master_companion_data/medicine_companion_data.cjs
 * Universal 16-Page Master Knowledge Retrieval Companion Data
 * Unit: Medicine in Britain, c1250–present with Western Front (Paper 1, Option 11)
 */

const { MEDICINE_THEMATIC_QUIZ_BANK } = require('../medicine_thematic_pearson_quiz_bank.cjs');
const { WESTERN_FRONT_QUIZ_BANK } = require('../western_front_pearson_quiz_bank.cjs');

const ENQUIRY_DEFS = [
  // =========================================================================
  // ERA 1 & 2: MEDIEVAL & RENAISSANCE BRITAIN (c1250–c1700)
  // =========================================================================
  {
    num: 1,
    kt: 'Thematic Study',
    topicCode: 'KT 1.1',
    title: 'Medieval Ideas on Disease: Religion, Humours & Miasma (c1250–c1500)',
    focus: 'God’s punishment, astrology (1345 conjunction), Theory of Four Humours, opposites, Galen & miasma',
    warning: 'Fatal Examiner Trap: Believing medieval people only blamed God for disease. While supernatural beliefs were dominant, rational explanations (Hippocrates’ Four Humours, Galen’s Theory of Opposites, and miasma) were taught in universities and used by physicians.',
    quote: '"God sent the plague and planets aligned; physicians balanced blood, phlegm, yellow bile, and black bile."',
    questions: [
      MEDICINE_THEMATIC_QUIZ_BANK[0].questions[0], // God punishing sins
      MEDICINE_THEMATIC_QUIZ_BANK[0].questions[1], // Church controlling books/universities
      MEDICINE_THEMATIC_QUIZ_BANK[0].questions[3], // Conjunction of planets March 1345
      MEDICINE_THEMATIC_QUIZ_BANK[0].questions[4], // Miasma bad air
      MEDICINE_THEMATIC_QUIZ_BANK[0].questions[6], // Leprosy moral punishment
      MEDICINE_THEMATIC_QUIZ_BANK[1].questions[0], // Four Humours: blood, phlegm, yellow bile, black bile
      MEDICINE_THEMATIC_QUIZ_BANK[1].questions[1], // Hippocrates Clinical Observation
      MEDICINE_THEMATIC_QUIZ_BANK[1].questions[2], // Galen's Theory of Opposites
      MEDICINE_THEMATIC_QUIZ_BANK[1].questions[3], // Church promoted Galen (soul created by single God)
      MEDICINE_THEMATIC_QUIZ_BANK[1].questions[4], // Medieval Urine Wheel chart
    ]
  },
  {
    num: 2,
    kt: 'Thematic Study',
    topicCode: 'KT 1.2',
    title: 'Medieval Care, Treatments & The 1348 Black Death',
    focus: 'Phlebotomy, purging, herbal remedies, wise women, monastic hospitals, and the Black Death (1348–1349)',
    warning: 'Fatal Examiner Trap: Believing medieval hospitals cured disease. Medieval hospitals provided "care, not cure" (food, shelter, warmth, and prayer run by monks and nuns); infectious sufferers and pregnant women were turned away.',
    quote: '"Medieval hospitals offered care not cure; the Black Death wiped out half of England in 18 months."',
    questions: [
      MEDICINE_THEMATIC_QUIZ_BANK[2].questions[0], // Phlebotomy / bloodletting
      MEDICINE_THEMATIC_QUIZ_BANK[2].questions[1], // Leeches and cupping
      MEDICINE_THEMATIC_QUIZ_BANK[2].questions[2], // Purging via laxatives/emetics
      MEDICINE_THEMATIC_QUIZ_BANK[2].questions[3], // Theriac herbal remedy (60+ ingredients)
      MEDICINE_THEMATIC_QUIZ_BANK[3].questions[0], // Monastic hospitals "care not cure"
      MEDICINE_THEMATIC_QUIZ_BANK[3].questions[1], // Infectious patients turned away
      MEDICINE_THEMATIC_QUIZ_BANK[3].questions[3], // Barber-surgeons bloodletting and pulling teeth
      MEDICINE_THEMATIC_QUIZ_BANK[4].questions[0], // Black Death arrives in England summer 1348 (Melcombe Regis)
      MEDICINE_THEMATIC_QUIZ_BANK[4].questions[1], // Bubonic plague (buboes in armpits/groin)
      MEDICINE_THEMATIC_QUIZ_BANK[4].questions[3], // 30% to 50% of English population died
    ]
  },
  {
    num: 3,
    kt: 'Thematic Study',
    topicCode: 'KT 2.1',
    title: 'The Medical Renaissance: Vesalius, Sydenham & The Royal Society',
    focus: 'Humanism, movable type printing press (1440), Andreas Vesalius (1543), Thomas Sydenham (1676) & Royal Society (1660)',
    warning: 'Fatal Examiner Trap: Overstating the immediate practical impact of Vesalius. Vesalius revolutionized anatomical knowledge by proving Galen made over 300 errors, but his discoveries did not improve surgical treatments or cure disease in the 16th century.',
    quote: '"Vesalius dissected human corpses and corrected Galen; Sydenham classified diseases at the bedside."',
    questions: [
      MEDICINE_THEMATIC_QUIZ_BANK[5].questions[0], // Humanism questioning ancient authority
      MEDICINE_THEMATIC_QUIZ_BANK[5].questions[1], // Printing press Gutenberg c1440
      MEDICINE_THEMATIC_QUIZ_BANK[5].questions[2], // Royal Society founded 1660 ("Nullius in verba")
      MEDICINE_THEMATIC_QUIZ_BANK[5].questions[3], // Philosophical Transactions 1665
      MEDICINE_THEMATIC_QUIZ_BANK[6].questions[0], // Thomas Sydenham "English Hippocrates"
      MEDICINE_THEMATIC_QUIZ_BANK[6].questions[1], // Observationes Medicae 1676 (classified diseases like plants)
      MEDICINE_THEMATIC_QUIZ_BANK[6].questions[3], // Cinchona bark (quinine) for malaria
      MEDICINE_THEMATIC_QUIZ_BANK[7].questions[0], // Andreas Vesalius Fabric of the Human Body 1543
      MEDICINE_THEMATIC_QUIZ_BANK[7].questions[1], // Dissected executed criminals in person
      MEDICINE_THEMATIC_QUIZ_BANK[7].questions[2], // Corrected 300+ of Galen's errors (human jaw single bone)
    ]
  },
  {
    num: 4,
    kt: 'Thematic Study',
    topicCode: 'KT 2.2',
    title: 'William Harvey’s Circulation & The 1665 Great Plague',
    focus: 'William Harvey (1628), mechanical pump heart, one-way valves, continuity in treatments & Great Plague of London',
    warning: 'Fatal Examiner Trap: Claiming Harvey discovered blood. Harvey discovered the CIRCULATION of blood pumped around the body in a closed loop, disproving Galen\'s theory that blood was constantly produced by the liver and consumed by the body.',
    quote: '"Harvey proved the heart was a muscular pump; in 1665 red crosses marked 100,000 plague doors."',
    questions: [
      MEDICINE_THEMATIC_QUIZ_BANK[8].questions[0], // William Harvey De Motu Cordis 1628
      MEDICINE_THEMATIC_QUIZ_BANK[8].questions[1], // Heart as mechanical pump
      MEDICINE_THEMATIC_QUIZ_BANK[8].questions[2], // Disproved Galen's theory liver manufactured blood
      MEDICINE_THEMATIC_QUIZ_BANK[8].questions[3], // One-way valves in veins
      MEDICINE_THEMATIC_QUIZ_BANK[8].questions[4], // Capillaries confirmed later by Malpighi under microscope
      MEDICINE_THEMATIC_QUIZ_BANK[9].questions[0], // Great Plague of London 1665
      MEDICINE_THEMATIC_QUIZ_BANK[9].questions[1], // 100,000 Londoners died (one-fifth of city)
      MEDICINE_THEMATIC_QUIZ_BANK[9].questions[2], // Red cross and "Lord have mercy upon us" on doors
      MEDICINE_THEMATIC_QUIZ_BANK[9].questions[3], // Mayor banned public gatherings, killed dogs and cats
      MEDICINE_THEMATIC_QUIZ_BANK[9].questions[4], // Plague searchers and watchmen enforced 40-day quarantine
    ]
  },

  // =========================================================================
  // ERA 3 & 4: INDUSTRIAL & MODERN MEDICINE (c1700–PRESENT)
  // =========================================================================
  {
    num: 5,
    kt: 'Thematic Study',
    topicCode: 'KT 3.1',
    title: 'Germ Theory & Microbe Hunters (c1861–c1883)',
    focus: 'Spontaneous generation, Louis Pasteur (1861 Germ Theory), swan-neck flasks, Robert Koch, agar jelly & specific microbes',
    warning: 'Fatal Examiner Trap: Confusing Pasteur and Koch’s contributions. Pasteur discovered Germ Theory (microbes cause decay and disease) and developed rabies vaccines; Koch identified SPECIFIC bacteria (anthrax, TB, cholera) using chemical dyes and agar.',
    quote: '"Pasteur disproved spontaneous generation with swan-neck flasks; Koch tracked anthrax, TB, and cholera."',
    questions: [
      MEDICINE_THEMATIC_QUIZ_BANK[10].questions[0], // Spontaneous generation theory
      MEDICINE_THEMATIC_QUIZ_BANK[10].questions[1], // Louis Pasteur Germ Theory 1861
      MEDICINE_THEMATIC_QUIZ_BANK[10].questions[2], // Swan-neck flask experiment
      MEDICINE_THEMATIC_QUIZ_BANK[10].questions[3], // Pasteur chicken cholera vaccine 1879
      MEDICINE_THEMATIC_QUIZ_BANK[10].questions[4], // Robert Koch "Father of Bacteriology"
      MEDICINE_THEMATIC_QUIZ_BANK[10].questions[5], // Anthrax bacterium identified 1876
      MEDICINE_THEMATIC_QUIZ_BANK[10].questions[6], // Agar jelly and chemical methyl violet staining
      MEDICINE_THEMATIC_QUIZ_BANK[10].questions[7], // Tuberculosis bacterium identified 1882
      {
        q: 'In 1883, which deadly waterborne bacterium did Robert Koch identify in Egypt and India?',
        a: 'The Cholera bacterium (Vibrio cholerae)',
        exp: 'Scientifically proved John Snow’s 1854 hypothesis that cholera was spread by contaminated drinking water.'
      },
      {
        q: 'Which British doctor translated Koch’s scientific papers into English, helping convince British doctors?',
        a: 'William Cheyne',
        exp: 'Cheyne’s 1886 translations persuaded the British medical establishment to abandon miasma and adopt Germ Theory.'
      }
    ]
  },
  {
    num: 6,
    kt: 'Thematic Study',
    topicCode: 'KT 3.2',
    title: 'Prevention & Hospital Care: Smallpox Vaccine & Nightingale',
    focus: 'Inoculation, Edward Jenner (1796), cowpox, James Phipps, Florence Nightingale, pavilion hospitals & Mary Seacole',
    warning: 'Fatal Examiner Trap: Stating Jenner knew how vaccines worked. Jenner proved empirically that cowpox protected against smallpox, but he had no idea why because Germ Theory was not discovered until 65 years later in 1861.',
    quote: '"Milkmaids had clear skin; Jenner used cowpox against smallpox; Nightingale slashed Scutari death rates to 2%."',
    questions: [
      MEDICINE_THEMATIC_QUIZ_BANK[11].questions[0], // Lady Mary Wortley Montagu inoculation
      MEDICINE_THEMATIC_QUIZ_BANK[11].questions[1], // Edward Jenner rural GP in Gloucestershire
      MEDICINE_THEMATIC_QUIZ_BANK[11].questions[2], // Sarah Nelmes cowpox milkmaid
      MEDICINE_THEMATIC_QUIZ_BANK[11].questions[3], // James Phipps tested May 1796
      MEDICINE_THEMATIC_QUIZ_BANK[11].questions[5], // Compulsory vaccination in Britain 1853
      MEDICINE_THEMATIC_QUIZ_BANK[12].questions[0], // Florence Nightingale arrives at Scutari 1854
      MEDICINE_THEMATIC_QUIZ_BANK[12].questions[1], // Scutari mortality dropped from 42% to 2%
      MEDICINE_THEMATIC_QUIZ_BANK[12].questions[2], // Notes on Nursing (1859)
      MEDICINE_THEMATIC_QUIZ_BANK[12].questions[3], // Pavilion hospital design (separate ventilated wards)
      MEDICINE_THEMATIC_QUIZ_BANK[12].questions[5], // Mary Seacole "British Hotel" in Crimea
    ]
  },
  {
    num: 7,
    kt: 'Thematic Study',
    topicCode: 'KT 3.3',
    title: 'The Surgical Revolution & Public Health (1847–1875)',
    focus: 'Humphry Davy, James Simpson (1847 Chloroform), Joseph Lister (1865 Carbolic Acid), John Snow & 1875 Public Health Act',
    warning: 'Fatal Examiner Trap: Believing anaesthetics immediately made surgery safer. Chloroform created a "Black Period" of surgery (1846–1870) where surgeons attempted longer, deeper operations, increasing deaths from infection until Lister introduced antiseptics.',
    quote: '"Simpson inhaled chloroform; Lister sprayed carbolic acid; Snow removed the Broad Street pump handle."',
    questions: [
      MEDICINE_THEMATIC_QUIZ_BANK[13].questions[0], // James Simpson chloroform Nov 1847
      MEDICINE_THEMATIC_QUIZ_BANK[13].questions[1], // Queen Victoria uses chloroform for Prince Leopold birth 1853
      MEDICINE_THEMATIC_QUIZ_BANK[13].questions[2], // "Black Period" of surgery (infection deaths soared)
      MEDICINE_THEMATIC_QUIZ_BANK[13].questions[3], // Joseph Lister carbolic acid spray 1865
      MEDICINE_THEMATIC_QUIZ_BANK[13].questions[4], // Sepsis mortality fell from 46% to 15%
      MEDICINE_THEMATIC_QUIZ_BANK[14].questions[0], // Cholera epidemic arrives in Britain 1831
      MEDICINE_THEMATIC_QUIZ_BANK[14].questions[1], // Edwin Chadwick 1842 Report on Sanitary Conditions
      MEDICINE_THEMATIC_QUIZ_BANK[14].questions[2], // 1848 Public Health Act (non-compulsory failure)
      MEDICINE_THEMATIC_QUIZ_BANK[14].questions[3], // John Snow Broad Street pump Soho 1854
      MEDICINE_THEMATIC_QUIZ_BANK[14].questions[5], // 1875 Public Health Act (compulsory sewers, clean water)
    ]
  },
  {
    num: 8,
    kt: 'Thematic Study',
    topicCode: 'KT 4.1',
    title: 'Modern Medicine: Magic Bullets, Penicillin & The NHS',
    focus: 'Paul Ehrlich (Salvarsan 606), Alexander Fleming (1928), Florey & Chain (1940), US mass production & NHS (1948)',
    warning: 'Fatal Examiner Trap: Crediting Fleming alone for penicillin. Fleming accidentally discovered the mould in 1928 but could not purify it; Florey and Chain turned it into a usable drug and secured US industrial mass production during WWII.',
    quote: '"Fleming found the mould; Florey and Chain purified penicillin; Aneurin Bevan launched the free NHS in 1948."',
    questions: [
      MEDICINE_THEMATIC_QUIZ_BANK[17].questions[0], // Paul Ehrlich "Magic Bullet" concept
      MEDICINE_THEMATIC_QUIZ_BANK[17].questions[1], // Salvarsan 606 cures syphilis 1909
      MEDICINE_THEMATIC_QUIZ_BANK[17].questions[2], // Gerhard Domagk Prontosil 1932 (cures puerperal fever)
      MEDICINE_THEMATIC_QUIZ_BANK[17].questions[4], // Aneurin Bevan launches National Health Service 5 July 1948
      MEDICINE_THEMATIC_QUIZ_BANK[17].questions[5], // Free at point of use funded by taxation
      MEDICINE_THEMATIC_QUIZ_BANK[18].questions[0], // Alexander Fleming discovers Penicillin notatum Sep 1928
      MEDICINE_THEMATIC_QUIZ_BANK[18].questions[2], // Howard Florey and Ernst Chain at Oxford 1938
      MEDICINE_THEMATIC_QUIZ_BANK[18].questions[3], // Albert Alexander policeman tested May 1941
      MEDICINE_THEMATIC_QUIZ_BANK[18].questions[4], // Florey travels to USA for industrial mass fermentation 1941
      MEDICINE_THEMATIC_QUIZ_BANK[18].questions[5], // 2.3 million penicillin doses for D-Day wounded June 1944
    ]
  },

  // =========================================================================
  // ERA 5: THE HISTORIC ENVIRONMENT: BRITISH SECTOR OF WESTERN FRONT (1914–1918)
  // =========================================================================
  {
    num: 9,
    kt: 'Western Front',
    topicCode: 'KT 5.1',
    title: 'The Western Front: Trench Geography & Environmental Illness',
    focus: 'Ypres Salient, Hill 60, Somme, Arras underground tunnels, Cambrai, trench foot, trench fever & shell shock',
    warning: 'Fatal Examiner Trap: Describing trenches as simple straight ditches. Trenches were constructed in a zig-zag traverse pattern so an exploding shell or enemy machine gunner could not shoot down the entire length of the trench.',
    quote: '"Zig-zag trenches, mud of Passchendaele, and chalk caverns of Arras: soldiers battled environment and artillery."',
    questions: [
      WESTERN_FRONT_QUIZ_BANK[0].questions[0], // Ypres Salient geography
      WESTERN_FRONT_QUIZ_BANK[0].questions[1], // Hill 60 artificial hill mined April 1915
      WESTERN_FRONT_QUIZ_BANK[0].questions[2], // Battle of the Somme 1 July 1916 (57,000 casualties Day 1)
      WESTERN_FRONT_QUIZ_BANK[0].questions[3], // Arras underground chalk quarries (Thompson's Caves)
      WESTERN_FRONT_QUIZ_BANK[0].questions[4], // Battle of Cambrai Nov 1917 (mass tank assault)
      WESTERN_FRONT_QUIZ_BANK[1].questions[0], // Trench foot caused by cold mud and water
      WESTERN_FRONT_QUIZ_BANK[1].questions[1], // Whale oil rubbing and clean dry socks
      WESTERN_FRONT_QUIZ_BANK[1].questions[2], // Trench fever caused by body lice
      WESTERN_FRONT_QUIZ_BANK[1].questions[4], // Shell shock (NYDN - Not Yet Diagnosed Nervous)
      WESTERN_FRONT_QUIZ_BANK[1].questions[5], // Over 80,000 British soldiers suffered shell shock
    ]
  },
  {
    num: 10,
    kt: 'Western Front',
    topicCode: 'KT 5.2',
    title: 'Battlefield Trauma & Weapons: Shrapnel, Gas & Gangrene',
    focus: 'Artillery shrapnel (58% wounds), high explosives, gas gangrene in fertilised soil, chlorine, phosgene & mustard gas',
    warning: 'Fatal Examiner Trap: Believing poison gas caused the majority of deaths on the Western Front. Artillery shells and shrapnel caused 58% of all battlefield casualties; gas caused less than 3% of deaths, though it caused immense psychological terror.',
    quote: '"Shrapnel ripped flesh in manure-rich soil; chlorine, phosgene, and mustard gas burned lungs and blinded eyes."',
    questions: [
      WESTERN_FRONT_QUIZ_BANK[2].questions[0], // Artillery shells caused 58% of casualties
      WESTERN_FRONT_QUIZ_BANK[2].questions[1], // Shrapnel hollow shells with lead balls
      WESTERN_FRONT_QUIZ_BANK[2].questions[2], // Brodie steel helmet introduced late 1915 (reduced head wounds 80%)
      WESTERN_FRONT_QUIZ_BANK[2].questions[3], // Gas gangrene from manure-fertilised soil
      WESTERN_FRONT_QUIZ_BANK[2].questions[4], // Chlorine gas introduced at Second Battle of Ypres April 1915
      WESTERN_FRONT_QUIZ_BANK[2].questions[5], // Phosgene gas 1915 (deadlier, odorless, delayed suffocation)
      WESTERN_FRONT_QUIZ_BANK[2].questions[6], // Mustard gas introduced 1917 (blistering agent)
      WESTERN_FRONT_QUIZ_BANK[2].questions[7], // Urine-soaked cotton pads before box respirators 1916
      {
        q: 'Why did soil bacteria on the Western Front cause uniquely catastrophic wound infections compared to previous wars?',
        a: 'Centuries of intensive agricultural manure fertilization filled the mud with Clostridium bacteria',
        exp: 'When shrapnel dragged muddy uniform cloth deep into bullet wounds, anaerobic gas gangrene developed within hours.'
      },
      {
        q: 'Which weapon produced horrific facial disfigurements that prompted the development of plastic surgery?',
        a: 'High-explosive artillery shrapnel and bullet fragments',
        exp: 'Shattered facial bones and stripped tissue, leading Harold Gillies to open Queen’s Hospital in Sidcup.'
      }
    ]
  },
  {
    num: 11,
    kt: 'Western Front',
    topicCode: 'KT 5.3',
    title: 'The Chain of Evacuation: RAP to Base Hospitals',
    focus: 'Stretcher Bearers, RAP (Regimental Aid Post), ADS & MDS Dressing Stations, CCS (Casualty Clearing Station) & Base Hospital',
    warning: 'Fatal Examiner Trap: Confusing the stages of the Chain of Evacuation. The precise sequence: Stretcher Bearers -> RAP (first aid within 200m) -> Dressing Station (triage at 1 mile) -> CCS (vital life-saving surgery at 10 miles) -> Base Hospital on French coast.',
    quote: '"RAP administered first aid; CCS performed lifesaving debridement; trains carried wounded to Base Hospitals."',
    questions: [
      WESTERN_FRONT_QUIZ_BANK[3].questions[0], // RAMC (Royal Army Medical Corps)
      WESTERN_FRONT_QUIZ_BANK[3].questions[1], // FANY (First Aid Nursing Yeomanry) ambulance drivers
      WESTERN_FRONT_QUIZ_BANK[3].questions[2], // Stretcher Bearers (4 to 8 men per stretcher in mud)
      WESTERN_FRONT_QUIZ_BANK[3].questions[3], // Regimental Aid Post (RAP) within 200m of front line
      WESTERN_FRONT_QUIZ_BANK[3].questions[4], // Advanced & Main Dressing Stations (ADS / MDS)
      WESTERN_FRONT_QUIZ_BANK[3].questions[5], // Casualty Clearing Station (CCS) 7-12 miles back
      WESTERN_FRONT_QUIZ_BANK[3].questions[6], // Triage system (walking wounded, urgent surgery, beyond help)
      WESTERN_FRONT_QUIZ_BANK[3].questions[7], // Base Hospitals on French coast (Boulogne, Le Touquet)
      {
        q: 'Which dedicated transport method moved critical casualties from Casualty Clearing Stations to coastal Base Hospitals?',
        a: 'Specially fitted hospital trains and canal barges',
        exp: 'Barges provided a smooth, vibration-free journey along French canals for men with severe head and chest wounds.'
      },
      {
        q: 'Why did the Casualty Clearing Station (CCS) become the most critical surgical facility in the Chain of Evacuation?',
        a: 'Surgeons performed immediate life-saving surgery before lethal gas gangrene could take hold',
        exp: 'Contaminated wounds required rapid debridement within 12 hours of injury to prevent fatal sepsis.'
      }
    ]
  },
  {
    num: 12,
    kt: 'Western Front',
    topicCode: 'KT 5.4',
    title: 'Surgical Breakthroughs: Thomas Splint, X-Rays & Blood Storage',
    focus: 'Wound debridement, Carrel-Dakin method, Thomas Splint, mobile X-ray vans, Richard Lewisohn & 1917 Cambrai blood bank',
    warning: 'Fatal Examiner Trap: Believing blood could be stored at the start of the war. In 1914, blood clotted immediately, requiring direct donor-to-patient transfusion. Only the addition of sodium citrate (1915) and glucose (Rous & Turner, 1916) allowed Oswald Robertson to store blood at Cambrai in 1917.',
    quote: '"The Thomas Splint slashed femur mortality from 80% to 20%; Robertson created the first blood bank at Cambrai."',
    questions: [
      WESTERN_FRONT_QUIZ_BANK[4].questions[0], // Wound debridement (cutting away infected dead tissue)
      WESTERN_FRONT_QUIZ_BANK[4].questions[1], // Carrel-Dakin method (irrigating wounds with sterile saline)
      WESTERN_FRONT_QUIZ_BANK[4].questions[2], // Thomas Splint Hugh Owen Thomas
      WESTERN_FRONT_QUIZ_BANK[4].questions[3], // Slashed femur fracture mortality from 80% to 20%
      WESTERN_FRONT_QUIZ_BANK[4].questions[4], // Mobile X-ray vans (Marie Curie "Petites Curies")
      WESTERN_FRONT_QUIZ_BANK[5].questions[0], // Direct donor-to-patient blood transfusion in 1914
      WESTERN_FRONT_QUIZ_BANK[5].questions[1], // Sodium citrate (Richard Lewisohn 1915) prevents clotting
      WESTERN_FRONT_QUIZ_BANK[5].questions[2], // Rous and Turner add glucose 1916 (stored up to 4 weeks)
      WESTERN_FRONT_QUIZ_BANK[5].questions[3], // Oswald Robertson creates first blood bank at Battle of Cambrai 1917
      WESTERN_FRONT_QUIZ_BANK[5].questions[4], // Harold Gillies Queen's Hospital Sidcup (pedicle tubes plastic surgery)
    ]
  }
];

const MEDICINE_ENQUIRY_QUESTIONS = [
  "How did religious beliefs, the Four Humours, and miasma shape medieval ideas about disease (c1250–c1500)?",
  "How effective were medieval medical treatments, care, and responses to the 1348 Black Death?",
  "How did the anatomical work of Vesalius and Sydenham challenge traditional medical ideas in the Renaissance?",
  "How did William Harvey's discovery of blood circulation transform physiological understanding?",
  "How did Jenner's development of the smallpox vaccination initiate preventative medicine in the 18th century?",
  "How did the breakthroughs of Pasteur, Koch, and Ehrlich establish the Germ Theory of disease?",
  "How did Simpson's chloroform and Lister's carbolic acid overcome surgical pain and infection?",
  "How did Edwin Chadwick, John Snow, and the 1875 Public Health Act conquer cholera and unsanitary towns?",
  "How did Alexander Fleming, Florey, and Chain discover and mass-produce the wonder drug penicillin?",
  "How did high-tech medical breakthroughs, DNA discoveries, and the NHS transform modern healthcare in the 20th century?",
  "How did the terrain and trench system of the British Sector of the Western Front affect soldiers' health and wounds?",
  "How did the Chain of Evacuation, mobile X-rays, blood transfusions, and surgery transform Western Front medicine (1914–1918)?"
];

const MEDICINE_MILESTONES = [
  // 1: Medieval Ideas
  [
    { date: 'c350 BC', title: 'Hippocrates\' Four Humours' },
    { date: 'c170 AD', title: 'Galen\'s Theory of Opposites' },
    { date: 'c1250', title: 'Church Controls Universities' },
    { date: 'Mar 1345', title: 'Conjunction of 3 Planets' },
    { date: 'c1400', title: 'Urine Wheel Diagnosis Standard' }
  ],
  // 2: Medieval Care & Black Death
  [
    { date: 'c1200', title: 'Monastic Hospitals Care Not Cure' },
    { date: '1348', title: 'Plague Enters Melcombe Regis' },
    { date: '1348', title: 'Edward III Orders Street Cleansing' },
    { date: '1349', title: '50% of English Population Dies' },
    { date: '1350', title: 'Labour Shortage Transforms Feudalism' }
  ],
  // 3: Renaissance: Vesalius & Sydenham
  [
    { date: '1543', title: 'Vesalius Publishes Fabric' },
    { date: '1560', title: 'Paré\'s Soothing Wound Balm' },
    { date: '1660', title: 'Royal Society Founded' },
    { date: '1665', title: 'Great Plague Hits London' },
    { date: '1676', title: 'Sydenham\'s Medical Observations' }
  ],
  // 4: Harvey & Circulation
  [
    { date: '1616', title: 'Harvey Lectures on Heart' },
    { date: '1628', title: 'De Motu Cordis Published' },
    { date: '1649', title: 'Harvey\'s Theory Provokes Debate' },
    { date: '1661', title: 'Malpighi Observes Capillaries' },
    { date: 'c1700', title: 'Harvey\'s Circulation Taught' }
  ],
  // 5: 18th-C Hospitals & Jenner
  [
    { date: '1741', title: 'Coram\'s Foundling Hospital' },
    { date: '1750s', title: 'Specialist Voluntary Hospitals' },
    { date: '1796', title: 'Jenner Inoculates James Phipps' },
    { date: '1798', title: 'Smallpox Vaccine Inquiry' },
    { date: '1852', title: 'Compulsory Vaccination Act' }
  ],
  // 6: Germ Theory: Pasteur, Koch & Ehrlich
  [
    { date: '1861', title: 'Pasteur\'s Germ Theory' },
    { date: '1876', title: 'Koch Identifies Anthrax' },
    { date: '1882', title: 'Koch Stains Tuberculosis Microbe' },
    { date: '1883', title: 'Koch Identifies Cholera' },
    { date: '1909', title: 'Ehrlich\'s Salvarsan 606' }
  ],
  // 7: Surgery: Pain & Infection
  [
    { date: '1846', title: 'Liston Amputates with Ether' },
    { date: '1847', title: 'Simpson Discovers Chloroform' },
    { date: '1853', title: 'Queen Victoria Inhales Chloroform' },
    { date: '1867', title: 'Lister\'s Carbolic Spray' },
    { date: '1890s', title: 'Aseptic Theatre Revolution' }
  ],
  // 8: 19th-C Public Health & Cholera
  [
    { date: '1842', title: 'Chadwick\'s Sanitary Report' },
    { date: '1848', title: 'First Public Health Act' },
    { date: '1854', title: 'Snow Removes Broad St Pump Handle' },
    { date: '1858', title: 'Great Stink Spurs Bazalgette' },
    { date: '1875', title: 'Compulsory Public Health Act' }
  ],
  // 9: Penicillin Miracle
  [
    { date: '1928', title: 'Fleming Observes Penicillin' },
    { date: '1938', title: 'Florey & Chain Oxford Research' },
    { date: '1941', title: 'Albert Alexander Clinical Trial' },
    { date: '1941', title: 'Florey Solicits US Industrial Vats' },
    { date: '1944', title: 'D-Day Mass Supply Guaranteed' }
  ],
  // 10: Modern High-Tech, DNA & NHS
  [
    { date: '1948', title: 'Bevan Launches Free NHS' },
    { date: '1953', title: 'Crick & Watson Model DNA' },
    { date: '1973', title: 'Hounsfield Invents CT Scanner' },
    { date: '1978', title: 'First IVF Baby Louise Brown' },
    { date: '2003', title: 'Human Genome Mapped' }
  ],
  // 11: Western Front: Terrain & Wounds
  [
    { date: 'Oct 1914', title: 'First Ypres Creates Salient' },
    { date: 'Apr 1915', title: 'Second Ypres: Chlorine Gas' },
    { date: 'Jul 1916', title: 'Somme: 57,000 Day 1 Losses' },
    { date: 'Apr 1917', title: 'Arras Underground Quarry Wards' },
    { date: 'Jul 1917', title: 'Passchendaele Quagmire' }
  ],
  // 12: Western Front: Evacuation & Innovations
  [
    { date: '1914', title: 'RAMC Evacuation Chain Formed' },
    { date: '1915', title: 'Curie Deploys Mobile X-Ray Vans' },
    { date: '1915', title: 'Sodium Citrate Blood Storage' },
    { date: '1916', title: 'Thomas Splint Slashes Mortality' },
    { date: 'Nov 1917', title: 'Cambrai: First Blood Depot' }
  ]
];

const mappedEnquiries = ENQUIRY_DEFS.map((enq, idx) => ({
  number: enq.num,
  keyTopic: enq.kt,
  topicCode: enq.topicCode,
  title: enq.title,
  focus: enq.focus,
  enquiryQuestion: MEDICINE_ENQUIRY_QUESTIONS[idx] || enq.title,
  examinerWarning: enq.warning,
  footerQuote: enq.quote,
  milestones: MEDICINE_MILESTONES[idx] || [],
  questions: enq.questions.slice(0, 8).map((q, qIdx) => ({
    num: qIdx + 1,
    q: q.q,
    a: q.a,
    exp: q.exp
  }))
}));

module.exports = {
  unitId: 'medicine',
  unitTitle: 'Medicine in Britain, c1250–present with Western Front',
  paperCode: 'Pearson Edexcel GCSE (9–1) History • Paper 1: Thematic Study & Historic Environment (1HI0/11)',
  heroImage: 'images/stretcher_bearers_passchendaele.jpg',
  heroCaption: 'Source A: Royal Army Medical Corps stretcher-bearers carrying a wounded soldier through knee-deep mud near Boesinghe during the Third Battle of Ypres (Passchendaele, 1 August 1917). Imperial War Museum (IWM Q 5935).',
  enquiries: mappedEnquiries,
  bankPages: [
    { title: 'Enquiries 1–4: Eras 1 & 2 Medieval & Renaissance Medicine (c1250–c1700)', startQ: 1, endQ: 32, pageNum: 14 },
    { title: 'Enquiries 5–8: Era 3 18th & 19th Century Medicine & Public Health (c1700–c1900)', startQ: 33, endQ: 64, pageNum: 15 },
    { title: 'Enquiries 9–12: Era 4 Modern Medicine & The Western Front (c1900–present)', startQ: 65, endQ: 96, pageNum: 16 }
  ]
};
