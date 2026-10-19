const fs = require('fs');
const path = require('path');

// 1. Load edexcel_medicine data
const medPath = path.join(__dirname, '..', 'units', 'edexcel_medicine', 'data.js');
let medContent = fs.readFileSync(medPath, 'utf8');

// Replacements for edexcel_medicine
// We define the new Do Now arrays for the flagged lessons

const newDoNows = {
  lesson_3_2: [
    { q: 'In what year did Louis Pasteur publish his revolutionary Germ Theory?', a: '1861' },
    {
      q: 'What scientific experiment did Pasteur design with glass flasks to disprove spontaneous generation?',
      a: 'The swan-neck flask experiment',
    },
    {
      q: 'What liquid was Pasteur originally studying when he proved that heating it killed souring bacteria?',
      a: 'Wine and beer / milk (pasteurisation)',
    },
    {
      q: 'Which German bacteriologist identified the specific bacterium causing anthrax in 1876?',
      a: 'Robert Koch',
    },
    {
      q: 'What chemical technique did Koch introduce to make transparent microbes visible under a microscope?',
      a: 'Staining with aniline dyes / methyl violet',
    },
    {
      q: 'What solid medium did Koch use instead of liquid broth to culture pure colonies of bacteria?',
      a: 'Agar jelly in flat petri dishes',
    },
    {
      q: 'What prominent ancient medical theory claimed disease was caused by foul, poisonous vapours rising from decaying filth?',
      a: 'Miasma theory',
    },
    {
      q: 'During the 1665 Great Plague of London, what mark was painted on the doors of quarantined houses?',
      a: "A red cross and 'Lord have mercy upon us'",
    },
    {
      q: "Which 17th-century English doctor, known as the 'English Hippocrates', advocated clinical observation at the patient's bedside?",
      a: 'Thomas Sydenham',
    },
    {
      q: 'What scientific society, chartered by King Charles II in 1662, met weekly in London to promote experimental medicine?',
      a: 'The Royal Society',
    },
  ],
  lesson_3_3: [
    {
      q: 'In what year did Edward Jenner test his cowpox hypothesis on young James Phipps?',
      a: '1796',
    },
    {
      q: 'What was the traditional, dangerous practice of deliberately infecting healthy people with live smallpox scabs called?',
      a: 'Inoculation / Variolation',
    },
    {
      q: 'Why did the Royal Society initially refuse to publish Jenner’s discovery in 1797?',
      a: 'Because Jenner could not explain how or why cowpox provided immunity, before Germ Theory was discovered',
    },
    {
      q: 'In what year did the British Parliament pass legislation making smallpox vaccination compulsory for all infants?',
      a: '1853',
    },
    {
      q: 'What French chemist published the Germ Theory in 1861, proving that microorganisms caused decay and disease?',
      a: 'Louis Pasteur',
    },
    {
      q: 'What discredited ancient theory claimed that living disease microbes generated spontaneously out of rotting matter?',
      a: 'Spontaneous Generation',
    },
    {
      q: 'Name one specific disease bacterium identified by Robert Koch between 1876 and 1883.',
      a: 'Anthrax (1876), Tuberculosis (1882), or Cholera (1883)',
    },
    {
      q: 'What was the central motto and primary purpose of medieval monastic hospitals like St Bartholomew’s in London?',
      a: "'Care not cure' — providing spiritual shelter, warmth, and prayer rather than medical healing",
    },
    {
      q: 'Who staffed and operated monastic hospitals in England prior to Henry VIII’s Dissolution of the Monasteries?',
      a: 'Monks, nuns, and religious orders',
    },
    {
      q: "Why were early 19th-century voluntary hospitals before 1850 widely feared by working-class families as 'gateways to death'?",
      a: 'Because overcrowded, unventilated wards and unwashed doctors spread fatal cross-infections such as hospital gangrene, typhus, and sepsis',
    },
  ],
  lesson_3_4: [
    {
      q: 'In what war did Florence Nightingale manage military nursing at Scutari Hospital (1854–1856)?',
      a: 'The Crimean War',
    },
    {
      q: 'To what percentage did Nightingale’s sanitary reforms cut the patient mortality rate at Scutari?',
      a: 'From approximately 40% down to 2%',
    },
    {
      q: 'What architectural hospital layout did Nightingale champion, featuring long, narrow wards with high ceilings and cross-ventilation?',
      a: 'The Pavilion Plan',
    },
    {
      q: 'What landmark training institution was founded by Nightingale at St Thomas’ Hospital in 1860?',
      a: 'The Nightingale School of Nursing',
    },
    {
      q: "Which Jamaican doctress travelled to the Crimea at her own expense and opened the 'British Hotel' to nurse wounded soldiers near the front?",
      a: 'Mary Seacole',
    },
    {
      q: 'What disease did Edward Jenner successfully prevent using cowpox matter in 1796?',
      a: 'Smallpox',
    },
    {
      q: 'Whose 1861 Germ Theory proved that airborne microorganisms were the true cause of fermentation and putrefaction?',
      a: 'Louis Pasteur',
    },
    {
      q: 'Name the three great obstacles that made major surgical operations almost impossible before the mid-19th century.',
      a: 'Pain, Infection / Sepsis, and Blood Loss / Haemorrhage',
    },
    {
      q: 'What French Renaissance military surgeon used silk thread ligatures instead of boiling cautery oil to tie off bleeding arteries?',
      a: 'Ambroise Paré',
    },
    {
      q: 'Why were complex surgical operations before the 1840s strictly limited to procedures that could be completed in under three minutes?',
      a: 'Because patients went into fatal shock or cardiac arrest from unbearable agony',
    },
  ],
  lesson_3_5: [
    {
      q: 'What chemical anaesthetic liquid was discovered by James Simpson in Edinburgh in 1847?',
      a: 'Chloroform',
    },
    {
      q: 'What chemical antiseptic spray did Joseph Lister introduce in Glasgow in 1865 to prevent wound sepsis?',
      a: 'Carbolic acid',
    },
    {
      q: 'Whose 1861 Germ Theory directly inspired Lister to realize microbes caused wound gangrene?',
      a: 'Louis Pasteur',
    },
    {
      q: 'What is the fundamental difference between antiseptic surgery and aseptic surgery?',
      a: 'Antiseptic kills germs already inside the wound; aseptic creates an entirely sterile operating environment to prevent germs entering',
    },
    {
      q: 'What surgical barrier did William Halsted introduce at Johns Hopkins Hospital in 1890 to protect surgical incisions?',
      a: 'Sterilized rubber surgical gloves',
    },
    {
      q: 'What hospital architectural layout did Florence Nightingale design to ensure continuous fresh air and sunlight?',
      a: 'The Pavilion Hospital Plan',
    },
    {
      q: 'In what year did Edwin Chadwick publish his landmark Report on the Sanitary Condition of the Labouring Population?',
      a: '1842',
    },
    {
      q: "What traditional British political and economic philosophy meaning 'leave alone' opposed government spending on public sanitation?",
      a: 'Laissez-faire',
    },
    {
      q: 'What was the dominant 19th-century medical belief that blamed epidemics on toxic smells rising from open sewers and cesspools?',
      a: 'Miasma theory',
    },
    {
      q: 'During the 1665 Great Plague, what emergency measure was taken by the Lord Mayor of London to isolate infected households?',
      a: 'Quarantine of houses for 28–40 days with watchmen stationed outside',
    },
  ],
  lesson_4_3: [
    {
      q: 'What diagnostic radiation technology was discovered by Wilhelm Röntgen in 1895?',
      a: 'X-rays',
    },
    {
      q: 'Name two advanced diagnostic imaging machines developed in the 1970s that create computerized 3D cross-sections of organs.',
      a: 'CT scans and MRI scans',
    },
    {
      q: 'What handheld diagnostic instrument uses flexible optical glass fibers and cameras to view the interior of the digestive tract or lungs?',
      a: 'Endoscopes',
    },
    {
      q: 'Which two British medical researchers published a landmark epidemiological study in 1950 proving that smoking caused lung cancer?',
      a: 'Richard Doll and Austin Bradford Hill',
    },
    {
      q: 'In what year did James Watson, Francis Crick, and Rosalind Franklin determine the double-helix molecular structure of DNA?',
      a: '1953',
    },
    {
      q: 'What international scientific consortium mapped the entire sequence of human genetic code between 1990 and 2003?',
      a: 'The Human Genome Project',
    },
    {
      q: 'What German scientist identified the specific bacteria for tuberculosis (1882) and cholera (1883)?',
      a: 'Robert Koch',
    },
    {
      q: 'Why were existing 19th-century antiseptics like carbolic acid completely useless for treating internal bodily infections?',
      a: 'Because they were toxic poisons that destroyed human internal organs and red blood cells',
    },
    {
      q: 'What landmark legislation in 1875 made it compulsory for all local councils in Britain to provide clean water, sewers, and health inspectors?',
      a: 'The Public Health Act 1875',
    },
    { q: 'Who discovered the smallpox vaccine in 1796 using cowpox matter?', a: 'Edward Jenner' },
  ],
  lesson_4_4: [
    {
      q: 'What term was coined by Paul Ehrlich to describe chemical compounds designed to target and destroy specific disease microbes without harming the host?',
      a: "'Magic bullets'",
    },
    {
      q: 'What was the name of the first chemical magic bullet, discovered by Paul Ehrlich and Sahachiro Hata in 1909 to treat syphilis?',
      a: 'Salvarsan 606',
    },
    {
      q: 'What red chemical dye compound did Gerhard Domagk discover in 1932 that cured lethal streptococcal blood poisoning?',
      a: 'Prontosil',
    },
    {
      q: "What 1942 wartime government report proposed a comprehensive welfare state to slay the 'Five Giant Evils'?",
      a: 'The Beveridge Report',
    },
    {
      q: 'On what exact date did the British National Health Service (NHS) officially launch under Minister of Health Aneurin Bevan?',
      a: '5 July 1948',
    },
    {
      q: 'What principle was the NHS built upon regarding payment for hospital care, prescriptions, and physician visits?',
      a: 'Free at the point of delivery / funded through general taxation',
    },
    {
      q: 'What is the fundamental difference between a synthetic chemical drug and a biological antibiotic?',
      a: 'A synthetic drug is manufactured chemically in a laboratory; an antibiotic is naturally produced by living organisms like fungi/molds to kill bacteria',
    },
    {
      q: 'What diagnostic technology discovered by Wilhelm Röntgen in 1895 allowed physicians to see fractured bones inside the living body?',
      a: 'X-rays',
    },
    {
      q: 'Who proved in 1861 that airborne microorganisms, not spontaneous generation, caused disease and decay?',
      a: 'Louis Pasteur',
    },
    {
      q: 'What was the name of Florence Nightingale’s revolutionary hospital design that featured cross-ventilated wards?',
      a: 'The Pavilion Plan',
    },
  ],
  lesson_4_5: [
    {
      q: 'In what year did Alexander Fleming accidentally observe that Penicillium mold had dissolved staphylococcus bacteria at St Mary’s Hospital?',
      a: '1928',
    },
    {
      q: 'Which two Oxford University researchers purified penicillin into a usable medical drug and conducted clinical trials in 1940–1941?',
      a: 'Howard Florey and Ernst Chain',
    },
    {
      q: 'What was the name of the Oxford policeman who became the first human patient treated with penicillin in 1941?',
      a: 'Albert Alexander',
    },
    {
      q: 'What country provided the industrial chemical factories and deep-tank fermentation facilities to mass-produce penicillin for D-Day in 1944?',
      a: 'The United States',
    },
    {
      q: 'What growing modern medical crisis has been triggered by the widespread over-use and misuse of antibiotics in humans and agriculture?',
      a: "Antibiotic resistance / antimicrobial resistance / 'superbugs' like MRSA",
    },
    { q: 'In what year was the British National Health Service (NHS) founded?', a: '1948' },
    {
      q: "What 1909 synthetic chemical compound discovered by Paul Ehrlich was known as the first 'magic bullet'?",
      a: 'Salvarsan 606',
    },
    {
      q: 'What landmark Victorian law in 1875 marked the definitive end of laissez-faire by making clean water and sewers compulsory for all local councils?',
      a: 'The Public Health Act 1875',
    },
    {
      q: 'Which physician proved in 1854 that cholera was transmitted through contaminated drinking water from the Broad Street pump?',
      a: 'Dr John Snow',
    },
    {
      q: 'What statistical diagram did Florence Nightingale create in 1858 to convince Queen Victoria and Parliament that preventable diseases killed more soldiers than combat?',
      a: 'The Polar Area Diagram / Coxcomb chart',
    },
  ],
  lesson_5_4: [
    {
      q: 'What percentage of all battle wounds on the Western Front were caused by exploding artillery shells and jagged shrapnel?',
      a: 'Approximately 58% to 60%',
    },
    {
      q: 'What head protection was issued to British soldiers in late 1915, reducing fatal head wounds by up to 80%?',
      a: 'The steel Brodie helmet',
    },
    {
      q: 'Why was gas gangrene so widespread in wounds suffered in Flanders and the Somme?',
      a: 'Because the farmland had been heavily manured for centuries with animal feces containing anaerobic tetanus and gangrene spores',
    },
    {
      q: 'What was the first lethal poison gas deployed on the Western Front by the German army at Second Ypres in April 1915?',
      a: 'Chlorine gas',
    },
    {
      q: 'What chemical poison gas introduced in July 1917 caused agonizing skin blisters, blindness, and lingered in trench mud for days?',
      a: 'Mustard gas',
    },
    {
      q: 'What fungal infection caused by standing in cold, muddy, waterlogged trenches resulted in rotting flesh and potential amputation?',
      a: 'Trench foot',
    },
    {
      q: 'What preventative measure was made compulsory to prevent trench foot, requiring men to rub their feet twice daily?',
      a: 'Whale oil',
    },
    {
      q: 'What tiny parasitic insect was discovered in 1918 to be the vector transmitting trench fever between soldiers?',
      a: 'Body lice',
    },
    {
      q: 'On what date did the Battle of the Somme begin, resulting in 57,470 British casualties on the first day alone?',
      a: '1 July 1916',
    },
    {
      q: 'What battle in 1917 saw the British military engineer an underground hospital city within 2.5 miles of medieval chalk quarries?',
      a: 'The Battle of Arras',
    },
  ],
  lesson_5_5: [
    {
      q: 'How many trained stretcher bearers were officially assigned to each British infantry battalion of 1,000 men?',
      a: '16 stretcher bearers (4 per company)',
    },
    {
      q: 'How many stretcher bearers were often needed to carry a single stretcher through the deep mud at Passchendaele?',
      a: '6 to 8 men',
    },
    {
      q: 'What was the immediate frontline medical station located in a communications trench or dugout called?',
      a: 'Regimental Aid Post / RAP',
    },
    {
      q: 'Which medical unit within the Royal Army Medical Corps (RAMC) operated Advanced and Main Dressing Stations?',
      a: 'The Field Ambulance',
    },
    {
      q: 'What large medical station located 7 to 12 miles behind the front near railways was the primary site for urgent life-saving surgery?',
      a: 'Casualty Clearing Station / CCS',
    },
    {
      q: 'What three triage categories were wounded soldiers sorted into upon arrival at the CCS?',
      a: 'The lightly wounded / walking wounded, those requiring urgent surgery, and the moribund / hopeless cases',
    },
    {
      q: 'Where were large Base Hospitals located to provide long-term convalescent care before soldiers returned home?',
      a: 'Near French and Belgian coastal ports like Boulogne, Le Tréport, and Étaples',
    },
    {
      q: 'What weapon caused the vast majority (nearly 60%) of wounds on the Western Front?',
      a: 'Artillery shells and shrapnel',
    },
    {
      q: 'What lethal anaerobic infection caused flesh to turn green-black, bubble with foul gas, and spread rapidly through tissue?',
      a: 'Gas gangrene',
    },
    {
      q: 'What was the psychological trauma caused by prolonged artillery bombardment initially termed before being classified as NYDN?',
      a: 'Shellshock',
    },
  ],
  lesson_5_6: [
    {
      q: 'What orthopedic device, introduced to the Western Front in December 1915, reduced mortality from compound femur fractures from 80% to 20%?',
      a: 'The Thomas Splint',
    },
    {
      q: 'Which pioneering orthopedic surgeon persuaded the British War Office to mass-produce and deploy the Thomas Splint to frontline units?',
      a: 'Sir Robert Jones',
    },
    {
      q: 'What surgical procedure involved meticulously cutting away all dead, damaged tissue and contaminated soil from an open bullet wound?',
      a: 'Wound debridement / excision',
    },
    {
      q: 'What chemical wound-irrigation system, using sterilized sodium hypochlorite saline solution flushed through rubber tubes, was developed in 1915?',
      a: 'The Carrel-Dakin method',
    },
    {
      q: 'Why were mobile X-ray units crucial before surgeons attempted to operate on shrapnel wounds?',
      a: 'To locate the precise depth and position of jagged metal fragments and embedded uniform fabric before surgery',
    },
    {
      q: 'What forward medical facility was the first stage in the evacuation chain where major surgery was performed?',
      a: 'Casualty Clearing Station / CCS',
    },
    {
      q: 'What was the name of the horse-drawn or motorized vehicles used by the RAMC to transport casualties between dressing stations and the CCS?',
      a: 'Motor ambulances / ambulance wagons',
    },
    {
      q: 'Why was untreated blood loss and haemorrhage on the battlefield so rapidly fatal to wounded soldiers?',
      a: 'It induced irreversible hypovolaemic shock and organ failure',
    },
    {
      q: 'What was the primary lethal poison gas introduced at Second Ypres in 1915?',
      a: 'Chlorine gas',
    },
    {
      q: 'What landmark antiseptic spray was invented by Joseph Lister in 1865 to prevent wound sepsis in civilian surgery?',
      a: 'Carbolic acid',
    },
  ],
};

// 2. Load and parse edexcel_medicine using import/eval or AST/regex
console.log('Patching edexcel_medicine data.js...');

for (const [lessonId, doNowArray] of Object.entries(newDoNows)) {
  // Find where id: 'lessonId' occurs, then find do_now: [ ... ] within that lesson block
  const idRegex = new RegExp(`id:\\s*['"]${lessonId}['"]`, 'g');
  const match = idRegex.exec(medContent);
  if (!match) {
    console.error(`Could not find ${lessonId} in edexcel_medicine`);
    continue;
  }
  const lessonStart = match.index;
  // find next do_now: [
  const doNowIdx = medContent.indexOf('do_now:', lessonStart);
  if (doNowIdx === -1) {
    console.error(`Could not find do_now for ${lessonId}`);
    continue;
  }
  // find closing bracket for this do_now array
  // We can track brackets
  let openBracket = medContent.indexOf('[', doNowIdx);
  let closeBracket = -1;
  let depth = 0;
  for (let i = openBracket; i < medContent.length; i++) {
    if (medContent[i] === '[') depth++;
    else if (medContent[i] === ']') {
      depth--;
      if (depth === 0) {
        closeBracket = i;
        break;
      }
    }
  }

  if (closeBracket === -1) {
    console.error(`Could not find closing bracket for do_now in ${lessonId}`);
    continue;
  }

  const replacementStr =
    '[\n' +
    doNowArray
      .map((item) => {
        return `        {\n          q: ${JSON.stringify(item.q)},\n          a: ${JSON.stringify(item.a)},\n        }`;
      })
      .join(',\n') +
    '\n      ]';

  medContent =
    medContent.slice(0, openBracket) + replacementStr + medContent.slice(closeBracket + 1);
  console.log(`✅ Patched do_now for ${lessonId}`);
}

fs.writeFileSync(medPath, medContent, 'utf8');
console.log('✅ Successfully wrote updated units/edexcel_medicine/data.js');

// 3. Patch CME (cme_new) lessons 2, 3, and 4
const cmePath = path.join(__dirname, '..', 'units', 'cme_new', 'data.js');
let cmeContent = fs.readFileSync(cmePath, 'utf8');

const newCmeDoNows = {
  lesson_2: [
    {
      question:
        'What 1915–16 correspondence between the British High Commissioner in Cairo and the Sharif of Mecca promised British support for Arab independence?',
      answer: 'The McMahon–Hussein Correspondence',
    },
    {
      question:
        'What secret 1916 Anglo-French agreement partitioned the Ottoman Arab provinces into British and French spheres of influence?',
      answer: 'The Sykes–Picot Agreement',
    },
    {
      question:
        "What 1917 British policy document declared support for the establishment of a 'national home for the Jewish people' in Palestine?",
      answer: 'The Balfour Declaration',
    },
    {
      question:
        'Which international body granted Britain the Mandate to administer Palestine in 1922?',
      answer: 'The League of Nations',
    },
    {
      question:
        'What major three-year rebellion by Palestinian Arabs erupted in 1936 demanding independence and an end to Jewish immigration?',
      answer: 'The Arab Revolt (1936–1939)',
    },
    {
      question:
        'What 1937 British royal commission first proposed partitioning Palestine into separate Arab and Jewish states?',
      answer: 'The Peel Commission',
    },
    {
      question:
        'What 1939 British government policy statement severely restricted Jewish immigration to 75,000 over five years?',
      answer: 'The 1939 White Paper',
    },
    {
      question:
        'Which vital canal, opened in 1869, made the Middle East of supreme strategic importance to the British Empire?',
      answer: 'The Suez Canal',
    },
    {
      question:
        'What was the main Jewish self-defence militia founded in 1920 to protect Jewish settlements in Mandatory Palestine?',
      answer: 'The Haganah',
    },
    {
      question:
        'Which catastrophic genocide during World War Two saw 6 million European Jews murdered by Nazi Germany?',
      answer: 'The Holocaust (Shoah)',
    },
  ],
  lesson_3: [
    {
      question:
        'In which Jerusalem building was the British military and administrative headquarters located in July 1946?',
      answer: 'The King David Hotel',
    },
    {
      question:
        'Which militant Zionist paramilitary group led by Menachem Begin bombed the King David Hotel in July 1946?',
      answer: 'The Irgun (Etzel)',
    },
    {
      question:
        'How many British, Arab, and Jewish administrative personnel died in the King David Hotel bombing?',
      answer: '91 people',
    },
    {
      question:
        'Which refugee ship carrying 4,500 Holocaust survivors was turned back to Europe by the Royal Navy in July 1947?',
      answer: 'The SS Exodus',
    },
    {
      question:
        'What international body voted to approve Resolution 181 to partition Palestine into separate Arab and Jewish states in November 1947?',
      answer: 'The United Nations (UN General Assembly)',
    },
    {
      question:
        'On what date did David Ben-Gurion proclaim the Declaration of the Establishment of the State of Israel?',
      answer: '14 May 1948',
    },
    {
      question:
        "Which five Arab armies invaded the territory of former Mandatory Palestine on 15 May 1948 following Israel's independence?",
      answer: 'Egypt, Syria, Transjordan, Lebanon, and Iraq',
    },
    {
      question:
        'What was the official Jewish defence militia that became the foundation of the Israel Defense Forces (IDF) on 26 May 1948?',
      answer: 'The Haganah',
    },
    {
      question:
        'What 1917 British declaration originally promised support for a Jewish national home in Palestine?',
      answer: 'The Balfour Declaration',
    },
    {
      question:
        'What was the 1939 British White Paper’s limit on Jewish immigration over a five-year period?',
      answer: '75,000 immigrants',
    },
  ],
  lesson_4: [
    {
      question:
        'Approximately how many Palestinian Arabs were displaced from their homes during the 1948–49 War?',
      answer: 'Approximately 700,000 to 750,000 refugees',
    },
    {
      question:
        "What Arabic term, meaning 'The Catastrophe', is used by Palestinians to describe the 1948 displacement?",
      answer: 'Al-Nakba',
    },
    {
      question:
        'Which United Nations relief agency was established in December 1949 to provide emergency aid, food, and camps for Palestinian refugees?',
      answer: 'UNRWA (UN Relief and Works Agency)',
    },
    {
      question:
        'What UN General Assembly Resolution, passed in December 1948, called for refugees wishing to return to their homes to be permitted to do so?',
      answer: 'UN Resolution 194',
    },
    {
      question:
        'What armistice demarcation lines established in 1949 became known as the de facto borders of the State of Israel?',
      answer: 'The Green Line',
    },
    {
      question:
        'Which Arab country annexed the West Bank and East Jerusalem in 1950, granting citizenship to Palestinian refugees?',
      answer: 'Transjordan (Jordan)',
    },
    {
      question:
        'Which country controlled and militarily administered the Gaza Strip following the 1949 armistice?',
      answer: 'Egypt',
    },
    {
      question:
        'What landmark 1950 Israeli legislation granted every Jewish person worldwide the right to settle in Israel and claim citizenship?',
      answer: 'The Law of Return (1950)',
    },
    {
      question:
        'What term was given to armed Palestinian infiltrators and guerrillas who launched cross-border raids into Israel from Gaza and the West Bank?',
      answer: "Fedayeen ('self-sacrificers')",
    },
    {
      question:
        'On what date did David Ben-Gurion proclaim the creation of the State of Israel in Tel Aviv?',
      answer: '14 May 1948',
    },
  ],
};

console.log('Patching cme_new data.js...');
for (const [lessonId, doNowArray] of Object.entries(newCmeDoNows)) {
  const idRegex = new RegExp(`id:\\s*['"]${lessonId}['"]`, 'g');
  const match = idRegex.exec(cmeContent);
  if (!match) {
    console.error(`Could not find ${lessonId} in cme_new`);
    continue;
  }
  const lessonStart = match.index;
  const doNowIdx = cmeContent.indexOf('do_now:', lessonStart);
  if (doNowIdx === -1) {
    console.error(`Could not find do_now for ${lessonId} in cme_new`);
    continue;
  }
  // find items: [
  const itemsIdx = cmeContent.indexOf('items:', doNowIdx);
  let openBracket = cmeContent.indexOf('[', itemsIdx);
  let closeBracket = -1;
  let depth = 0;
  for (let i = openBracket; i < cmeContent.length; i++) {
    if (cmeContent[i] === '[') depth++;
    else if (cmeContent[i] === ']') {
      depth--;
      if (depth === 0) {
        closeBracket = i;
        break;
      }
    }
  }

  if (closeBracket === -1) {
    console.error(`Could not find closing bracket for items in ${lessonId}`);
    continue;
  }

  const replacementStr =
    '[\n' +
    doNowArray
      .map((item) => {
        return `        {\n          question: ${JSON.stringify(item.question)},\n          answer: ${JSON.stringify(item.answer)},\n        }`;
      })
      .join(',\n') +
    '\n      ]';

  cmeContent =
    cmeContent.slice(0, openBracket) + replacementStr + cmeContent.slice(closeBracket + 1);
  console.log(`✅ Patched do_now for cme_new ${lessonId}`);
}

fs.writeFileSync(cmePath, cmeContent, 'utf8');
console.log('✅ Successfully wrote updated units/cme_new/data.js');
