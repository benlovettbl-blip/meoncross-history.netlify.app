const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');

function generateQrSvg(url) {
  const qr = QRCode.create(url, { margin: 1 });
  const size = qr.modules.size;
  const data = qr.modules.data;
  let pathD = '';
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (data[r * size + c]) {
        pathD += `M${c},${r}h1v1h-1z `;
      }
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" shape-rendering="crispEdges" style="width: 100%; height: 100%;"><path fill="#ffffff" d="M0,0h${size}v${size}H0z"/><path fill="#000000" d="${pathD.trim()}"/></svg>`;
}

// ============================================================================
// 5 DEDICATED 18TH & 19TH CENTURY ENQUIRY CONFIGURATIONS (100% BLACK & WHITE)
// ============================================================================
const eighteenthNineteenthConfigs = [
  {
    lessonIndex: 10, // mapped to lesson_3_1 in units/edexcel_medicine/data.js
    lessonNum: 1,
    id: 'lesson_3_1',
    title: 'KT3.1: Ideas on Causes: Pasteur’s Germ Theory & Koch’s Bacteriology',
    specAnchor:
      'Ideas about the cause of disease and illness: the influence in Britain of Pasteur’s Germ Theory (1861) and Robert Koch’s work on microbes.',
    tariff: 'Question 4: Explain Why [12 marks &bull; 15 mins]',
    examStem:
      'Explain why there was rapid progress in understanding the causes of disease in the period c1860–c1890. [12 marks]',
    stimulus: ["Louis Pasteur's Germ Theory (1861)", "Robert Koch's work on bacteria"],
    structureStrip: [
      {
        col: '1. PASTEUR & GERM THEORY (1861)',
        text: 'Explain how swan-neck flasks disproved spontaneous generation and proved airborne microbes cause decay and disease.',
      },
      {
        col: '2. KOCH’S BACTERIOLOGY (1876–83)',
        text: 'Explain how solid agar plates, aniline dyes, and microphotography isolated specific bacteria (anthrax 1876, TB 1882, cholera 1883).',
      },
      {
        col: '3. BRITISH ACCEPTANCE & MIASMA',
        text: 'Explain Tyndall’s lectures, overcoming Bastian’s skepticism, and the shift from miasma to targeting specific microbes.',
      },
    ],
    connectives:
      'A primary catalyst for change was... &bull; In particular, Pasteur proved... &bull; Building directly on this, Koch established... &bull; Consequently, British doctors transitioned from... &bull; Therefore...',
    wordBank:
      'spontaneous generation &bull; swan-neck flask &bull; Louis Pasteur &bull; Germ Theory (1861) &bull; Robert Koch &bull; agar jelly &bull; methyl violet dye &bull; microphotography &bull; anthrax (1876) &bull; tuberculosis (1882) &bull; cholera (1883) &bull; John Tyndall &bull; bacteriology',
    doNow: [
      {
        q: 'Which ancient Greek physician created the Theory of the Four Humours?',
        a: 'Hippocrates (c. 460–370 BC)',
      },
      {
        q: 'Which Roman doctor introduced the Theory of Opposites?',
        a: 'Claudius Galen (c. 129–216 AD)',
      },
      {
        q: 'In what year did Andreas Vesalius publish De Humani Corporis Fabrica?',
        a: '1543',
      },
      {
        q: 'What anatomical error of Galen did Vesalius disprove regarding the heart?',
        a: 'There are no invisible pores in the septum between the ventricles',
      },
      {
        q: 'What did William Harvey prove about blood flow in 1628?',
        a: 'Blood circulates in one continuous loop pumped by the heart',
      },
      {
        q: 'Which English doctor was nicknamed the ‘English Hippocrates’ for bedside observation?',
        a: 'Thomas Sydenham (Observationes Medicae, 1676)',
      },
      {
        q: 'What Latin term refers to poisonous, foul-smelling air blamed for epidemics?',
        a: 'Miasma',
      },
      {
        q: 'In what year did the Great Plague strike London, killing 100,000+ people?',
        a: '1665',
      },
      {
        q: 'What Latin motto meaning ‘Take nobody’s word for it’ was adopted by the Royal Society?',
        a: 'Nullius in Verba (1662 Royal Charter)',
      },
      {
        q: 'What was the primary function of medieval monastic hospitals?',
        a: '‘Care not cure’ (spiritual refuge, warmth, and prayer rather than medical treatment)',
      },
    ],
    vocabPrompt:
      'Define <strong>Spontaneous Generation</strong> and explain how Pasteur’s 1861 <strong>Germ Theory</strong> scientifically disproved it:',
    fourMarkA: {
      type: 'Similarity',
      question:
        'Explain one way in which ideas about the cause of disease in the eighteenth century (c1700–c1800) were similar to ideas in the seventeenth century (c1500–c1700). [4 marks]',
      hint: 'Focus on the universal continued belief in miasma (foul rotting air) causing epidemics like typhus and smallpox among both doctors and the public.',
      stems:
        'One way ideas about causes were similar was the continued belief in... &bull; In the seventeenth century... &bull; Similarly, in the eighteenth century...',
    },
    fourMarkB: {
      type: 'Difference',
      question:
        'Explain one way in which laboratory methods for investigating disease in the late nineteenth century (c1870–c1890) were different from the seventeenth century. [4 marks]',
      hint: 'Contrast Koch’s microscopic staining with aniline dyes, agar plates, and microphotography with Sydenham’s bedside observation of visible outward symptoms.',
      stems:
        'One way methods differed was... &bull; In the seventeenth century, doctors relied on... &bull; In contrast, in the late nineteenth century, Koch used...',
    },
    timelineMission:
      'Turn to Pages 2–3 (Key Topic 3.1). In the drawing box, sketch Pasteur’s swan-neck flask experiment and Koch’s agar plate. Annotate how identifying specific bacteria ended miasma theory forever!',
    leftPageQuip:
      'Pasteur proved that rotting soup doesn’t spontaneously create germs. It turns out germs come from other germs—mind-blowing for 1861.',
    rightPageQuip:
      'Robert Koch photographed bacteria so clearly that British doctors could no longer blame bad smells for tuberculosis.',
  },
  {
    lessonIndex: 12, // mapped to lesson_3_3 in units/edexcel_medicine/data.js (Jenner)
    lessonNum: 2,
    id: 'lesson_3_2',
    title: 'KT3.2: Approaches to Prevention: Edward Jenner & The Smallpox Vaccine',
    specAnchor:
      'The development of vaccinations: Edward Jenner and the development of the smallpox vaccination (1796); government attitudes and opposition.',
    tariff: 'Question 5/6: Evaluative Essay [16+4 marks &bull; 20 mins]',
    examStem:
      '‘Edward Jenner’s development of the smallpox vaccine was the most significant breakthrough in the prevention of disease in the period c1700–c1900.’ How far do you agree? [16+4 marks]',
    stimulus: ['Smallpox vaccination (1796)', 'The Public Health Act (1875)'],
    structureStrip: [
      {
        col: '1. JENNER’S 1796 BREAKTHROUGH',
        text: 'Explain Jenner’s empirical milkmaid observation, inoculating James Phipps with cowpox (1796), and publishing conclusive case studies (1798).',
      },
      {
        col: '2. STATE BACKING & COMPULSION',
        text: 'Explain parliamentary grants (£30,000 in 1802/1807), banning variolation (1840), the 1852 Compulsory Vaccination Act, and 1871 registration fines.',
      },
      {
        col: '3. OPPOSITION & CRITERIA EVALUATION',
        text: 'Evaluate resistance (Anti-Vaccination League, Royal Society skepticism, inoculator profits) vs other prevention milestones (clean water and sewers under the 1875 Act).',
      },
    ],
    connectives:
      'On the one hand, Jenner’s discovery was uniquely revolutionary because... &bull; In particular, the 1796 Phipps experiment... &bull; Furthermore, government intervention ensured that... &bull; On the other hand, the 1875 Public Health Act prevented wider epidemics because... &bull; In conclusion...',
    wordBank:
      'smallpox &bull; variolation / inoculation &bull; Lady Mary Wortley Montagu &bull; Edward Jenner &bull; cowpox &bull; Sarah Nelmes &bull; James Phipps &bull; Royal Jennerian Society (1803) &bull; parliamentary grants (£30,000) &bull; 1852 Compulsory Vaccination Act &bull; 1871 registration &bull; Anti-Vaccination League',
    doNow: [
      {
        q: 'In what year did Edward Jenner perform his famous cowpox test on James Phipps?',
        a: '1796 (published findings in 1798)',
      },
      {
        q: 'Who brought the dangerous practice of smallpox inoculation (variolation) to Britain in 1721?',
        a: 'Lady Mary Wortley Montagu (from the Ottoman Empire / Turkey)',
      },
      {
        q: 'What milder dairy disease gave milkmaids immunity from deadly smallpox?',
        a: 'Cowpox (vaccinia)',
      },
      {
        q: 'How much money did Parliament grant Jenner in 1802 and 1807 to support vaccination?',
        a: '£30,000 in total (£10,000 in 1802, £20,000 in 1807)',
      },
      {
        q: 'In what year was infant smallpox vaccination made legally compulsory in Britain?',
        a: '1852 (with strict enforcement and fines added in 1871)',
      },
      {
        q: 'Name the protest organisation formed by citizens who opposed mandatory vaccination.',
        a: 'The Anti-Vaccination League (formed in London in the 1860s)',
      },
      {
        q: 'Why did the Royal Society initially refuse to publish Jenner’s 1796 findings?',
        a: 'Jenner could not explain the biological mechanism of why cowpox conferred immunity',
      },
      {
        q: 'In what year did the British government formally ban dangerous smallpox inoculation?',
        a: '1840 (Vaccination Act of 1840, which also made vaccination free for poor infants)',
      },
      {
        q: 'Which French scientist discovered Germ Theory in 1861, explaining why vaccines worked?',
        a: 'Louis Pasteur',
      },
      {
        q: 'What Latin word for ‘cow’ is the root of Jenner’s term ‘vaccination’?',
        a: 'Vacca',
      },
    ],
    vocabPrompt:
      'Explain the crucial medical distinction between <strong>Smallpox Inoculation (Variolation)</strong> and Jenner’s <strong>Cowpox Vaccination</strong>:',
    fourMarkA: {
      type: 'Similarity',
      question:
        'Explain one way in which smallpox inoculation was similar to smallpox vaccination in eighteenth-century Britain. [4 marks]',
      hint: 'Focus on the shared biological objective: deliberately introducing a mild dose of pox matter into the skin to stimulate natural bodily resistance.',
      stems:
        'One way inoculation and vaccination were similar was... &bull; Inoculation involved... &bull; Similarly, Jennerian vaccination...',
    },
    fourMarkB: {
      type: 'Difference',
      question:
        'Explain one way in which smallpox vaccination was different from smallpox inoculation in eighteenth-century Britain. [4 marks]',
      hint: 'Contrast safety and contagion: cowpox vaccination was non-fatal and non-contagious, whereas smallpox inoculation risked killing the patient or starting a full epidemic.',
      stems:
        'One way vaccination differed was its superior safety... &bull; Inoculation carried the risk of... &bull; In contrast, cowpox vaccination...',
    },
    timelineMission:
      'Turn to Pages 2–3 (Key Topic 3.2). In the drawing box, sketch milkmaid Sarah Nelmes and young James Phipps. Annotate how the 1852 Compulsory Act turned Jenner’s private discovery into national policy!',
    leftPageQuip:
      'Inoculators charged fortunes to give healthy people actual smallpox. No wonder they hated Jenner for handing out free cowpox.',
    rightPageQuip:
      'Cartoons showed vaccinated people growing cow heads and horns. Historical proof that anti-vax memes existed long before social media.',
  },
  {
    lessonIndex: 11, // mapped to lesson_3_2 in units/edexcel_medicine/data.js (Nightingale)
    lessonNum: 3,
    id: 'lesson_3_3',
    title: 'KT3.3: Improvements in Hospital Care: Florence Nightingale & Professional Nursing',
    specAnchor:
      'Improvements in hospital care and nursing: the influence of Florence Nightingale; the impact on hospital organization and design.',
    tariff: 'Question 4: Explain Why [12 marks &bull; 15 mins]',
    examStem:
      'Explain why the standard of hospital care and nursing improved so significantly in the second half of the nineteenth century. [12 marks]',
    stimulus: [
      "Florence Nightingale's work in the Crimea (1854–56)",
      'Changes in hospital design and training (1859–60)',
    ],
    structureStrip: [
      {
        col: '1. THE CRIMEAN CRISIS & SCUTARI (1854–56)',
        text: 'Explain how Nightingale and 38 nurses cleaned filthy barracks, unblocked sewers, provided fresh bedding, and cut Scutari mortality from ~40% to 2%.',
      },
      {
        col: '2. SANITARY & PAVILION ARCHITECTURE',
        text: 'Explain Notes on Hospitals (1863), the pavilion plan (cross-ventilation, separate infectious wings, wipeable glazed tiles), and halting hospital gangrene.',
      },
      {
        col: '3. PROFESSIONAL NURSING & TRAINING',
        text: 'Explain Notes on Nursing (1859), the Nightingale School at St Thomas’ (1860), transforming nursing from uneducated domestic work into a respected career.',
      },
    ],
    connectives:
      'A primary catalyst for hospital reform was... &bull; In the Crimea, Nightingale demonstrated that... &bull; Furthermore, this was codified through... &bull; Consequently, civilian hospitals transformed from... &bull; This directly resulted in...',
    wordBank:
      'Scutari military hospital &bull; Crimean War (1854–56) &bull; mortality rate (40% to 2%) &bull; Notes on Nursing (1859) &bull; Notes on Hospitals (1863) &bull; pavilion plan &bull; cross-ventilation &bull; St Thomas’ Hospital (1860) &bull; professionalisation &bull; sanitation',
    doNow: [
      {
        q: 'In what war did Florence Nightingale serve as superintendent of female nursing from 1854 to 1856?',
        a: 'The Crimean War (against the Russian Empire)',
      },
      {
        q: 'Name the British military hospital near Constantinople where Nightingale was stationed.',
        a: 'Scutari Barracks Hospital',
      },
      {
        q: 'To what percentage did Nightingale’s sanitary reforms reduce the mortality rate at Scutari?',
        a: 'From approximately 40% down to 2%',
      },
      {
        q: 'What title was given to Florence Nightingale by the British press during the Crimean War?',
        a: '‘The Lady with the Lamp’',
      },
      {
        q: 'What landmark book did Nightingale publish in 1859 setting down rules for nurse training?',
        a: 'Notes on Nursing: What It Is, and What It Is Not (1859)',
      },
      {
        q: 'Which London hospital housed the first professional Nightingale Training School for Nurses in 1860?',
        a: 'St Thomas’ Hospital',
      },
      {
        q: 'What architectural hospital design featured long, narrow wards with large windows for cross-ventilation?',
        a: 'The Pavilion Hospital Plan (endorsed in Notes on Hospitals, 1863)',
      },
      {
        q: 'What fatal bacterial infection was notoriously spread in pre-1850 unwashed hospital wards?',
        a: 'Hospital gangrene / sepsis (erysipelas)',
      },
      {
        q: 'What Charles Dickens character typified the drunken, untrained, neglectful pre-reform nurse?',
        a: 'Sairey Gamp (from Martin Chuzzlewit)',
      },
      {
        q: 'What was the primary function of medieval monastic hospitals in England?',
        a: 'Providing religious hospitality, shelter, and care rather than surgical treatment (‘care not cure’)',
      },
    ],
    vocabPrompt:
      'Define the <strong>Pavilion Plan</strong> in hospital architecture and explain how it eliminated cross-infection between wards:',
    fourMarkA: {
      type: 'Similarity',
      question:
        'Explain one way in which hospital care in the early eighteenth century (c1700–c1750) was similar to hospital care in the medieval period (c1250–c1500). [4 marks]',
      hint: 'Focus on the shared reality that hospitals offered care, warmth, and palliative shelter rather than modern antiseptic cures, with high infection risks in shared beds.',
      stems:
        'One way hospital care was similar was... &bull; In the medieval period... &bull; Similarly, in the early eighteenth century, voluntary hospitals...',
    },
    fourMarkB: {
      type: 'Difference',
      question:
        'Explain one way in which hospital design in the late nineteenth century (c1860–c1890) was different from the early nineteenth century. [4 marks]',
      hint: 'Contrast Nightingale’s pavilion plan (separate isolation wings, cross-ventilation, glazed wipeable walls) with unventilated, cramped pre-1850 wards.',
      stems:
        'One way hospital design differed was... &bull; In the early nineteenth century, wards were... &bull; In contrast, under Nightingale’s pavilion design...',
    },
    timelineMission:
      'Turn to Pages 2–3 (Key Topic 3.3). In the drawing box, sketch a Nightingale pavilion ward showing large cross-ventilating windows and tidy beds. Annotate how Scutari transformed civilian hospital design!',
    leftPageQuip:
      'Before Nightingale, hospital nurses were notorious for drinking gin and stealing patients’ food. She made nursing so strict even generals were terrified.',
    rightPageQuip:
      'Nightingale believed miasma caused disease, not germs. She was technically wrong about the biology, but opening windows and scrubbing floors saved thousands anyway.',
  },
  {
    lessonIndex: 11, // mapped to lesson_3_2 in units/edexcel_medicine/data.js (Simpson & Lister)
    lessonNum: 4,
    id: 'lesson_3_4',
    title: 'KT3.4: The Surgical Revolution: Simpson’s Chloroform & Lister’s Antiseptics',
    specAnchor:
      'Improvements in surgery: James Simpson and the discovery of chloroform; Joseph Lister and the use of carbolic acid; opposition to anaesthetics and antiseptics.',
    tariff: 'Question 4: Explain Why [12 marks &bull; 15 mins]',
    examStem:
      'Explain why surgery became significantly safer in the period c1840–c1900. [12 marks]',
    stimulus: [
      "James Simpson's discovery of chloroform (1847)",
      "Joseph Lister's use of carbolic acid (1865)",
    ],
    structureStrip: [
      {
        col: '1. CONQUERING PAIN (SIMPSON 1847)',
        text: 'Explain Simpson’s discovery of chloroform, overcoming ether irritation, halting pain shock, and royal endorsement from Queen Victoria (1853).',
      },
      {
        col: '2. CONQUERING INFECTION (LISTER 1865)',
        text: 'Explain Lister’s carbolic acid spray inspired by Pasteur’s Germ Theory, dressing wounds with carbolic gauze, and cutting amputee mortality from 46% to 15%.',
      },
      {
        col: '3. SHIFT TO ASEPTIC SURGERY (c1890)',
        text: 'Explain the transition from killing germs with harsh chemicals (antiseptic) to excluding germs entirely: autoclaves (1881), boiled rubber gloves, and surgical scrubs.',
      },
    ],
    connectives:
      'The foundation of surgical transformation was... &bull; In the 1840s, Simpson solved the problem of pain by... &bull; However, this initially triggered the "Black Period" until Lister... &bull; Furthermore, by 1890 surgery transitioned into... &bull; Consequently...',
    wordBank:
      'laughing gas &bull; ether &bull; James Young Simpson &bull; chloroform (1847) &bull; Queen Victoria (1853) &bull; "Black Period" of surgery &bull; sepsis &bull; gangrene &bull; Joseph Lister &bull; carbolic acid spray (1865) &bull; antiseptic surgery &bull; aseptic surgery &bull; autoclave (1881)',
    doNow: [
      {
        q: 'What Edinburgh professor of midwifery discovered the anaesthetic properties of chloroform in 1847?',
        a: 'James Young Simpson',
      },
      {
        q: 'Which early anaesthetic gas was discovered by Humphry Davy in 1799?',
        a: 'Nitrous oxide (laughing gas)',
      },
      {
        q: 'Which monarch famously used chloroform during the birth of Prince Leopold in 1853?',
        a: 'Queen Victoria',
      },
      {
        q: 'Why did death rates from infection increase during the ‘Black Period’ of surgery (1847–1865)?',
        a: 'Pain-free patients allowed deeper, longer surgeries, but unwashed hands and coats introduced fatal sepsis',
      },
      {
        q: 'Which Scottish surgeon pioneered antiseptic surgery using carbolic acid in 1865?',
        a: 'Joseph Lister',
      },
      {
        q: 'Whose 1861 scientific discovery directly inspired Lister to investigate wound sepsis?',
        a: 'Louis Pasteur (Germ Theory)',
      },
      {
        q: 'To what percentage did Lister’s carbolic acid treatments reduce amputee mortality in Glasgow?',
        a: 'From 46% down to 15%',
      },
      {
        q: 'What steam-pressure sterilisation machine was invented by Charles Chamberland in 1881?',
        a: 'The Autoclave',
      },
      {
        q: 'What surgical innovation did William Halsted introduce at Johns Hopkins Hospital in 1890?',
        a: 'Boiled rubber surgical gloves',
      },
      {
        q: 'Which 16th-century French barber-surgeon famously replaced boiling oil with soothing rose-oil lotion?',
        a: 'Ambroise Paré (1537)',
      },
    ],
    vocabPrompt:
      'Explain the fundamental operational difference between <strong>Antiseptic Surgery</strong> (Lister) and <strong>Aseptic Surgery</strong> (c.1890):',
    fourMarkA: {
      type: 'Similarity',
      question:
        'Explain one way in which surgical conditions during the ‘Black Period’ (1847–1865) were similar to Renaissance surgery. [4 marks]',
      hint: 'Focus on the persistence of dirty operating coats, unwashed instruments, and total lack of hygiene leading to fatal gangrene and sepsis.',
      stems:
        'One way surgery was similar was the uncontrolled risk of infection... &bull; In the Renaissance period... &bull; Similarly, in the 1850s, surgeons still operated in...',
    },
    fourMarkB: {
      type: 'Difference',
      question:
        'Explain one way in which surgery in 1890 was different from surgery in 1840 in Britain. [4 marks]',
      hint: 'Contrast complete patient anaesthesia (chloroform) and germ exclusion (aseptic surgery, autoclaves, rubber gloves) with conscious patients held down in agony and sepsis.',
      stems:
        'One way surgery in 1890 differed was the conquest of both pain and infection... &bull; In 1840, patients were... &bull; In contrast, by 1890, surgery was...',
    },
    timelineMission:
      'Turn to Pages 2–3 (Key Topic 3.4). In the drawing box, sketch Lister’s donkey-engine carbolic spray and an autoclave. Annotate how anaesthetics created the ‘Black Period’ until antiseptics arrived!',
    leftPageQuip:
      'Before anaesthetics, the best surgeons amputated limbs in under 30 seconds. Robert Liston once accidentally cut off his assistant’s fingers in the rush.',
    rightPageQuip:
      'Lister sprayed carbolic acid everywhere until surgeons’ hands cracked and peeled. Harsh on the skin, but great for keeping patients alive.',
  },
  {
    lessonIndex: 12, // mapped to lesson_3_3 in units/edexcel_medicine/data.js (Snow & Public Health)
    lessonNum: 5,
    id: 'lesson_3_5',
    title: 'KT3.5: Public Health & Cholera: John Snow & The 1875 Public Health Act',
    specAnchor:
      'The role of John Snow and the Broad Street pump; public health acts (1848 and 1875); government attitudes and the end of laissez-faire.',
    tariff: 'Question 5/6: Evaluative Essay [16+4 marks &bull; 20 mins]',
    examStem:
      '‘The work of John Snow was the main reason for improvements in public health in the nineteenth century.’ How far do you agree? [16+4 marks]',
    stimulus: [
      "John Snow's Broad Street pump investigation (1854)",
      'The Public Health Act (1875)',
    ],
    structureStrip: [
      {
        col: '1. SNOW’S FORENSIC EPIDEMIOLOGY',
        text: 'Explain Snow’s 1854 Soho cholera spot map, removing the Broad Street pump handle, and providing empirical proof that cholera is water-borne, not miasma.',
      },
      {
        col: '2. MUNICIPAL INFRASTRUCTURE & SEWERS',
        text: 'Explain Edwin Chadwick’s 1842 report, the 1848 Act (permissive), the 1858 Great Stink, and Joseph Bazalgette’s 82-mile London brick sewer network.',
      },
      {
        col: '3. THE 1875 ACT & CRITERIA EVALUATION',
        text: 'Evaluate the end of laissez-faire through compulsory national regulation (clean water, sewage, housing checks, food purity) vs Snow’s localized Soho breakthrough.',
      },
    ],
    connectives:
      'On the one hand, Snow’s scientific deduction was revolutionary because... &bull; In particular, his 1854 spot map proved... &bull; On the other hand, national sanitation required state legislation such as... &bull; Consequently, while Snow identified the mechanism, the 1875 Act provided... &bull; Overall, I conclude that...',
    wordBank:
      'laissez-faire &bull; miasma theory &bull; cholera epidemics (1831, 1848, 1853–54) &bull; John Snow &bull; Broad Street pump (1854) &bull; Soho spot map &bull; cesspools &bull; Edwin Chadwick (1842) &bull; 1848 Public Health Act (permissive) &bull; Great Stink (1858) &bull; Joseph Bazalgette &bull; 1875 Public Health Act (compulsory)',
    doNow: [
      {
        q: 'In what year did the first deadly epidemic of Asiatic cholera arrive in Britain?',
        a: '1831 (killing over 31,000 people)',
      },
      {
        q: 'What government economic philosophy meaning ‘leave alone’ opposed sanitary spending?',
        a: 'Laissez-faire',
      },
      {
        q: 'Whose landmark 1842 report proved poor sanitary conditions caused disease and poverty?',
        a: 'Edwin Chadwick (Report on the Sanitary Condition of the Labouring Population)',
      },
      {
        q: 'Why was the 1848 First Public Health Act largely ineffective across Britain?',
        a: 'It was permissive (optional); local councils refused to raise taxes to build sewers',
      },
      {
        q: 'Which London doctor mapped the 1854 Soho cholera outbreak to the Broad Street water pump?',
        a: 'Dr John Snow',
      },
      {
        q: 'What physical action halted the cholera epidemic in Soho in September 1854?',
        a: 'Removing the handle from the Broad Street water pump',
      },
      {
        q: 'What environmental crisis in hot summer 1858 forced Parliament to fund London’s sewers?',
        a: 'The Great Stink (the Thames was an open sewer boiling in the summer heat)',
      },
      {
        q: 'Which civil engineer designed and built London’s revolutionary 82-mile brick sewer network?',
        a: 'Sir Joseph Bazalgette',
      },
      {
        q: 'Which political party leader passed the compulsory 1875 Second Public Health Act?',
        a: 'Benjamin Disraeli (Conservative Prime Minister)',
      },
      {
        q: 'Name one compulsory requirement placed on local town councils by the 1875 Public Health Act.',
        a: 'Providing clean water, maintaining underground sewers, appointing Medical Officers of Health, or collecting refuse',
      },
    ],
    vocabPrompt:
      'Explain the fundamental difference between the <strong>1848 Public Health Act (Permissive)</strong> and the <strong>1875 Public Health Act (Compulsory)</strong>:',
    fourMarkA: {
      type: 'Similarity',
      question:
        'Explain one way in which civic reactions to the 1848 cholera epidemic were similar to reactions during the Great Plague of 1665. [4 marks]',
      hint: 'Focus on the continued belief in miasma leading authorities to burn tar barrels, wash streets with vinegar, and rely on local quarantine without tackling water contamination.',
      stems:
        'One way civic reactions were similar was the reliance on miasma theories... &bull; In 1665, watchmen... &bull; Similarly, in 1848, local officials...',
    },
    fourMarkB: {
      type: 'Difference',
      question:
        'Explain one way in which government attitudes to public health in 1875 were different from attitudes in 1800. [4 marks]',
      hint: 'Contrast the compulsory state intervention of the 1875 Act (enforcing sewers, clean water, housing standards) with the total laissez-faire inaction of 1800.',
      stems:
        'One way attitudes differed was the total rejection of laissez-faire... &bull; In 1800, the British government believed... &bull; In contrast, by 1875, Parliament passed legislation that compelled...',
    },
    timelineMission:
      'Turn to Pages 2–3 (Key Topic 3.5). In the drawing box, sketch John Snow removing the Broad Street pump handle and Bazalgette’s brick sewer tunnels. Annotate how the 1875 Act permanently ended laissez-faire!',
    leftPageQuip:
      'John Snow proved cholera was water-borne because brewery workers in Soho drank only beer and survived. History’s most refreshing scientific discovery.',
    rightPageQuip:
      'Parliament ignored cholera for decades until the Thames smelled so bad in 1858 that MPs couldn’t breathe. Money for sewers was approved immediately.',
  },
];

// ============================================================================
// FOOTER STRIP HELPER (Page Number + Quip on the Same Line)
// Even pages (verso/left): Page number on left, quip on right.
// Odd pages (recto/right): Quip on left, page number on right.
// ============================================================================
function renderFooterStrip(pageNum, quipText, totalPages = 14) {
  const isEven = pageNum % 2 === 0;
  if (isEven) {
    return `
      <div class="page-footer-strip">
        <span class="footer-page-num" style="margin-right: 8px;">${pageNum}/${totalPages}</span>
        <span class="footer-quip" style="text-align: right; flex: 1;"><em>${quipText}</em></span>
      </div>`;
  } else {
    return `
      <div class="page-footer-strip">
        <span class="footer-quip" style="text-align: left; flex: 1; margin-right: 8px;"><em>${quipText}</em></span>
        <span class="footer-page-num">${pageNum}/${totalPages}</span>
      </div>`;
  }
}

// ============================================================================
// HTML WORKBOOK GENERATOR FUNCTION (100% Black & White / Master Template)
// ============================================================================
function build18th19thTwoPageWorkbook(unitData, period) {
  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Key Topic 3: Medicine in 18th and 19th Century Britain Workbook</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:wght@700;800;900&display=swap" rel="stylesheet">
  <style>
    *, *:before, *:after { box-sizing: border-box; }
    @page {
      size: A4 portrait;
      margin: 10mm 10mm 12mm 10mm;
    }
    body {
      font-family: 'Georgia', 'Garamond', serif;
      font-size: 8.5pt;
      line-height: 1.32;
      color: #000000;
      margin: 0;
      padding: 0;
      background: #ffffff;
    }
    h1, h2, h3, h4, h5, h6, strong, th, .sans {
      font-family: 'Inter', -apple-system, sans-serif;
    }
    /* Page Container: Zero outer border, pure flex distribution for optimal page budget */
    .page, .page-container {
      width: 100%;
      height: 272mm;
      max-height: 272mm;
      overflow: hidden;
      box-sizing: border-box;
      position: relative;
      page-break-after: always;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 3mm 4mm;
      background: #ffffff;
    }
    .page:last-child, .page-container:last-child {
      page-break-after: auto;
    }
    /* Full flex section container for interior distribution */
    .page-body-full {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    /* Clean Task Section Spacing */
    .task-section {
      margin-bottom: 5px;
      padding-bottom: 0;
    }
    .task-section-divider {
      border-bottom: 1.2px solid #000000;
      padding-bottom: 4px;
      margin-bottom: 5px;
    }
    /* Thick Black Writing Lines for Handwriting */
    .task-line {
      border-bottom: 1.5px solid #000000;
      height: 7.4mm;
      width: 100%;
      box-sizing: border-box;
    }
    .task-line-dotted {
      border-bottom: 1.2px dotted #000000;
      height: 6.2mm;
      width: 100%;
      box-sizing: border-box;
    }
    /* Clean Footer Strip */
    .page-footer-strip {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 0.5px solid #d0d0d0;
      padding-top: 1.5px;
      margin-top: 2px;
      font-family: 'Inter', sans-serif;
      font-size: 6.4pt;
      line-height: 1.15;
      color: #666666;
    }
    .footer-quip {
      font-style: italic;
      color: #666666;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .footer-page-num {
      font-family: 'Inter', sans-serif;
      font-weight: 700;
      white-space: nowrap;
      color: #000000;
      font-size: 6.8pt;
    }
  </style>
</head>
<body>
`;

  // ====================================================================
  // PAGE 1: FRONT COVER (Specification Table, Large Archival Image, No Outer Borders)
  // ====================================================================
  html += `
  <div class="page page-container" id="page-1" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Top Departmental Branding with Customizer Hook -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #000000; padding-bottom: 4px; margin-bottom: 8px;">
        <div data-department-name="The History Department">
          <span style="font-family: 'Inter', sans-serif; font-size: 11pt; font-weight: 900; color: #000000; text-transform: uppercase; letter-spacing: 1px;">
            <span class="school-brand-target">The History Department</span>
          </span>
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 8.5pt; font-weight: 700; color: #000000;">
          EDEXCEL GCSE (9–1) HISTORY &bull; PAPER 1
        </div>
      </div>

      <!-- Pupil Details Strip -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 6px 12px; background: #ffffff; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 14px; align-items: center; margin-bottom: 10px;">
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #000000; text-transform: uppercase; margin-right: 8px;">Pupil Name:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #000000; height: 14px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #000000; text-transform: uppercase; margin-right: 8px;">Class:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #000000; height: 14px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #000000; text-transform: uppercase; margin-right: 8px;">Teacher:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #000000; height: 14px;"></div>
        </div>
      </div>

      <!-- Main Title Block -->
      <div style="text-align: center; margin: 2px 0 6px 0;">
        <div style="display: inline-block; border: 1.5px solid #000000; color: #000000; font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; padding: 2px 10px; border-radius: 3px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; background: #ffffff;">
          Key Topic 3 &bull; c1700–c1900
        </div>
        <h1 style="font-family: 'Playfair Display', serif; font-size: 22pt; line-height: 1.15; color: #000000; margin: 2px 0 3px 0; font-weight: 900;">
          Medicine in 18th &amp; 19th Century Britain
        </h1>
        <div style="font-family: 'Georgia', serif; font-size: 10pt; color: #222222; font-style: italic; font-weight: 600;">
          Jenner, Nightingale, Lister, Pasteur, Koch, and Snow: The Scientific Conquest of Disease
        </div>
      </div>

      <!-- Centerpiece Primary Archival Image -->
      <div style="margin: 3px 0 5px 0; text-align: center; background: #ffffff;">
        <img src="../../units/edexcel_medicine/assets/authentic_18th_19th.jpg" alt="18th and 19th Century Medicine Primary Source" style="width: 100%; max-height: 245px; object-fit: cover; object-position: center 30%; display: block; margin: 0 auto;">
        <div style="display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #000000; padding: 3px 4px; border-top: 1px solid #000000; margin-top: 2px; background: #ffffff;">
          <span><strong>Primary Visual Source:</strong> <em>The Dawn of Bacteriology and Scientific Surgery</em> (c.1700–c.1900)</span>
          <span>Accession Shelfmark: <strong>ARCH-MED-1885</strong></span>
        </div>
      </div>

      <!-- Course Specification Curriculum Tracking Table -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; overflow: hidden; margin: 4px 0 2px 0;">
        <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif;">
          <thead>
            <tr style="border-bottom: 1.5px solid #000000; background: #ffffff;">
              <th style="padding: 6px 10px; text-align: left; font-size: 8.5pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; border-right: 1.2px solid #000000; color: #000000;">
                Course Specification &bull; Key Enquiry Sequence
              </th>
              <th style="padding: 6px 4px; width: 68px; text-align: center; font-size: 8pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; border-right: 1.2px solid #000000; color: #000000;">
                Learnt
              </th>
              <th style="padding: 6px 4px; width: 68px; text-align: center; font-size: 8pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; color: #000000;">
                Revised
              </th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 5px 10px; border-right: 1.2px solid #000000;">
                <div style="font-size: 8.8pt; font-weight: 800; color: #000000; line-height: 1.25;">
                  Key Topic 3.1: Ideas on Causes: Pasteur’s Germ Theory &amp; Koch’s Bacteriology
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 8pt; font-style: italic; color: #333333; margin-top: 1.5px; line-height: 1.25;">
                  How did swan-neck flasks, agar jelly, and chemical dyes disprove spontaneous generation and reveal microbes?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #000000;">
                <div style="width: 16px; height: 16px; border: 1.5px solid #000000; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 16px; height: 16px; border: 1.5px solid #000000; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 5px 10px; border-right: 1.2px solid #000000;">
                <div style="font-size: 8.8pt; font-weight: 800; color: #000000; line-height: 1.25;">
                  Key Topic 3.2: Approaches to Prevention: Edward Jenner &amp; The Smallpox Vaccine
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 8pt; font-style: italic; color: #333333; margin-top: 1.5px; line-height: 1.25;">
                  How did Jenner’s 1796 cowpox experiment and parliamentary compulsion eradicate the greatest killer of children?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #000000;">
                <div style="width: 16px; height: 16px; border: 1.5px solid #000000; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 16px; height: 16px; border: 1.5px solid #000000; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 5px 10px; border-right: 1.2px solid #000000;">
                <div style="font-size: 8.8pt; font-weight: 800; color: #000000; line-height: 1.25;">
                  Key Topic 3.3: Improvements in Hospital Care: Florence Nightingale &amp; Professional Nursing
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 8pt; font-style: italic; color: #333333; margin-top: 1.5px; line-height: 1.25;">
                  How did Scutari, Notes on Nursing (1859), and the Pavilion Plan transform hospital wards from death houses?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #000000;">
                <div style="width: 16px; height: 16px; border: 1.5px solid #000000; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 16px; height: 16px; border: 1.5px solid #000000; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 5px 10px; border-right: 1.2px solid #000000;">
                <div style="font-size: 8.8pt; font-weight: 800; color: #000000; line-height: 1.25;">
                  Key Topic 3.4: The Surgical Revolution: Simpson’s Chloroform &amp; Lister’s Antiseptics
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 8pt; font-style: italic; color: #333333; margin-top: 1.5px; line-height: 1.25;">
                  How did Simpson conquer pain, Lister conquer infection, and the 1890s introduce aseptic surgery?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #000000;">
                <div style="width: 16px; height: 16px; border: 1.5px solid #000000; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 16px; height: 16px; border: 1.5px solid #000000; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 5px 10px; border-right: 1.2px solid #000000;">
                <div style="font-size: 8.8pt; font-weight: 800; color: #000000; line-height: 1.25;">
                  Key Topic 3.5: Public Health &amp; Cholera: John Snow &amp; The 1875 Public Health Act
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 8pt; font-style: italic; color: #333333; margin-top: 1.5px; line-height: 1.25;">
                  How did John Snow’s Broad Street pump map (1854) and the 1875 Act permanently dismantle government laissez-faire?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #000000;">
                <div style="width: 16px; height: 16px; border: 1.5px solid #000000; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 16px; height: 16px; border: 1.5px solid #000000; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      ${renderFooterStrip(1, 'Keep this workbook complete and clean for final GCSE Paper 1 revision.')}
    </div>
  </div>
`;

  // ====================================================================
  // PAGES 2 & 3: LIVING UNIT TIMELINE SPREAD (1700–1900)
  // ====================================================================
  const timelineMilestonesLeft = [
    {
      year: '1796',
      title: 'Jenner Develops Smallpox Vaccine',
      desc: 'Edward Jenner inoculates James Phipps with cowpox pus from Sarah Nelmes, successfully protecting him from smallpox and founding immunology.',
    },
    {
      year: '1847',
      title: 'Simpson Discovers Chloroform',
      desc: 'James Young Simpson discovers the potent anaesthetic properties of chloroform in Edinburgh, eliminating operative pain shock.',
    },
    {
      year: '1848',
      title: 'First Public Health Act Passed',
      desc: 'Prompted by Edwin Chadwick’s 1842 report on sanitary conditions, Parliament establishes a General Board of Health (permissive and optional).',
    },
    {
      year: '1854',
      title: 'John Snow & Broad Street Pump',
      desc: 'Dr John Snow uses his Soho cholera spot map to identify contaminated water from the Broad Street pump, disproving the miasma theory.',
    },
  ];

  const timelineMilestonesRight = [
    {
      year: '1854–56',
      title: 'Nightingale at Scutari (Crimea)',
      desc: 'Florence Nightingale enforces hospital sanitation, clean water, and fresh bedding, reducing British soldier mortality from 40% to 2%.',
    },
    {
      year: '1861',
      title: 'Pasteur Publishes Germ Theory',
      desc: 'Louis Pasteur disproves spontaneous generation using swan-neck flasks, demonstrating that airborne microorganisms cause decay and disease.',
    },
    {
      year: '1865',
      title: 'Lister Pioneers Antiseptic Surgery',
      desc: 'Inspired by Pasteur’s Germ Theory, Joseph Lister uses carbolic acid spray during operations, reducing amputee mortality from 46% to 15%.',
    },
    {
      year: '1875',
      title: 'The Second Public Health Act',
      desc: 'Disraeli’s government legally compels all municipal councils to provide clean water, sewers, and refuse collection, ending laissez-faire.',
    },
  ];

  // PAGE 2 (Timeline Verso)
  html += `
  <div class="page page-container" id="page-2" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Section Header -->
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 6px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 11pt; color: #000000; margin: 0; font-weight: 800;">
          Living Unit Timeline: 18th &amp; 19th Century Medicine (Part I: 1700–1854)
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
          Chronological Framework &bull; Prevention &amp; Early Reform
        </span>
      </div>

      <!-- 4 Chronological Milestones -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 8px;">
        ${timelineMilestonesLeft
          .map(
            (m) => `
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 6px 8px; background: #ffffff;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
            <strong style="font-family: 'Playfair Display', serif; font-size: 10.5pt; font-weight: 900; color: #000000;">${m.year}</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 800; text-transform: uppercase; color: #000000;">${m.title}</span>
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 7.5pt; line-height: 1.25; color: #222222;">
            ${m.desc}
          </div>
        </div>
        `,
          )
          .join('')}
      </div>

      <!-- Living Timeline Drawing & Synthesis Canvas -->
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; border-top: 1px dashed #000000; padding-top: 4px; margin-bottom: 2px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; text-transform: uppercase; letter-spacing: 0.5px;">
            &bull; Living Timeline Sketchpad &amp; Causal Synthesis (1700–1854)
          </strong>
          <span style="font-size: 7pt; font-style: italic; color: #444444;">
            Sketch Jenner’s cowpox experiment, Simpson’s chloroform trials, or Snow’s Broad Street pump map.
          </span>
        </div>
        <div style="flex: 1; border: 1px solid #cccccc; border-radius: 3px; background: #ffffff; padding: 4px; display: flex; flex-direction: column; justify-content: space-around;">
          <div class="task-line" style="border-bottom-color: #e5e7eb;"></div>
          <div class="task-line" style="border-bottom-color: #e5e7eb;"></div>
          <div class="task-line" style="border-bottom-color: #e5e7eb;"></div>
          <div class="task-line" style="border-bottom-color: #e5e7eb;"></div>
          <div class="task-line" style="border-bottom-color: #e5e7eb;"></div>
        </div>
      </div>

      ${renderFooterStrip(2, 'The 18th century relied on empirical observation; the 19th century unlocked the laboratory.')}
    </div>
  </div>
`;

  // PAGE 3 (Timeline Recto)
  html += `
  <div class="page page-container" id="page-3" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Section Header -->
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 6px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 11pt; color: #000000; margin: 0; font-weight: 800;">
          Living Unit Timeline: 18th &amp; 19th Century Medicine (Part II: 1854–1900)
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
          Chronological Framework &bull; Germ Theory, Antiseptics &amp; Sanitation
        </span>
      </div>

      <!-- 4 Chronological Milestones -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 8px;">
        ${timelineMilestonesRight
          .map(
            (m) => `
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 6px 8px; background: #ffffff;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
            <strong style="font-family: 'Playfair Display', serif; font-size: 10.5pt; font-weight: 900; color: #000000;">${m.year}</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 800; text-transform: uppercase; color: #000000;">${m.title}</span>
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 7.5pt; line-height: 1.25; color: #222222;">
            ${m.desc}
          </div>
        </div>
        `,
          )
          .join('')}
      </div>

      <!-- Living Timeline Drawing & Synthesis Canvas -->
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; border-top: 1px dashed #000000; padding-top: 4px; margin-bottom: 2px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; text-transform: uppercase; letter-spacing: 0.5px;">
            &bull; Living Timeline Sketchpad &amp; Causal Synthesis (1854–1900)
          </strong>
          <span style="font-size: 7pt; font-style: italic; color: #444444;">
            Connect Pasteur’s swan-neck flask &rarr; Lister’s carbolic spray &rarr; Bazalgette’s brick sewer tunnels.
          </span>
        </div>
        <div style="flex: 1; border: 1px solid #cccccc; border-radius: 3px; background: #ffffff; padding: 4px; display: flex; flex-direction: column; justify-content: space-around;">
          <div class="task-line" style="border-bottom-color: #e5e7eb;"></div>
          <div class="task-line" style="border-bottom-color: #e5e7eb;"></div>
          <div class="task-line" style="border-bottom-color: #e5e7eb;"></div>
          <div class="task-line" style="border-bottom-color: #e5e7eb;"></div>
          <div class="task-line" style="border-bottom-color: #e5e7eb;"></div>
        </div>
      </div>

      ${renderFooterStrip(3, 'Pasteur opened the door; Lister, Koch, and Bazalgette marched through it.')}
    </div>
  </div>
`;

  // ====================================================================
  // PAGES 4–13: 5 DEDICATED TWO-PAGE SPREADS (LESSONS 3.1 TO 3.5)
  // Matching 100% the Master Medieval & Renaissance Template
  // ====================================================================
  eighteenthNineteenthConfigs.forEach((cfg) => {
    const leftPageNum = cfg.lessonNum * 2 + 2;
    const rightPageNum = cfg.lessonNum * 2 + 3;

    // ------------------------------------------------------------------
    // LEFT PAGE: 10-QUESTION DO NOW + KEY VOCAB (3 LINES) + TWO 4-MARK QUESTIONS
    // ------------------------------------------------------------------
    html += `
  <div class="page page-container" id="page-${leftPageNum}">
    <div class="page-body-full">
      <!-- Lesson Header -->
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 6px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 11pt; color: #000000; margin: 0; font-weight: 800;">
          ${cfg.title}
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
          Knowledge Retrieval &bull; Key Vocabulary &bull; Exam Practice
        </span>
      </div>

      <!-- 10-Question Do Now Retrieval Grid -->
      <div class="task-section task-section-divider">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; text-transform: uppercase; letter-spacing: 0.5px;">
            &bull; 'Do Now' Retrieval Drill (10 Recall Questions)
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 800; border: 1.2px solid #000000; padding: 1px 6px; border-radius: 3px;">
            Score: [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 10 ]
          </span>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px 14px;">
          ${cfg.doNow
            .map(
              (item, idx) => `
          <div>
            <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 700; color: #000000; line-height: 1.2;">
              ${idx + 1}. ${item.q}
            </div>
            <div class="task-line-dotted"></div>
          </div>
          `,
            )
            .join('')}
        </div>
      </div>

      <!-- Key Vocabulary Task (3 Handwriting Lines) -->
      <div class="task-section">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; text-transform: uppercase; letter-spacing: 0.5px;">
            &bull; Key Vocabulary Task
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 700; border: 1px solid #000000; padding: 0 4px; border-radius: 2px;">TERMINOLOGY</span>
        </div>
        <p style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.25;">
          ${cfg.vocabPrompt}
        </p>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
      </div>

      <!-- Exam Practice Question 3A [4 marks] -->
      <div class="task-section">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; text-transform: uppercase; letter-spacing: 0.5px;">
            &bull; Question 3(a): Explain One ${cfg.fourMarkA.type} [4 marks]
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 700; border: 1px solid #000000; padding: 0 4px; border-radius: 2px;">[4 MARKS &bull; 5 MINS]</span>
        </div>
        <p style="font-family: 'Playfair Display', serif; font-size: 8.2pt; font-weight: 800; color: #000000; margin: 0 0 2px 0;">
          ${cfg.fourMarkA.question}
        </p>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-style: italic; color: #333333; margin-bottom: 2px;">
          <strong>Hint:</strong> ${cfg.fourMarkA.hint}
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; margin-bottom: 2px;">
          <strong>Stems:</strong> ${cfg.fourMarkA.stems}
        </div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
      </div>

      <!-- Exam Practice Question 3B [4 marks] -->
      <div class="task-section">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; text-transform: uppercase; letter-spacing: 0.5px;">
            &bull; Question 3(b): Explain One ${cfg.fourMarkB.type} [4 marks]
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 700; border: 1px solid #000000; padding: 0 4px; border-radius: 2px;">[4 MARKS &bull; 5 MINS]</span>
        </div>
        <p style="font-family: 'Playfair Display', serif; font-size: 8.2pt; font-weight: 800; color: #000000; margin: 0 0 2px 0;">
          ${cfg.fourMarkB.question}
        </p>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-style: italic; color: #333333; margin-bottom: 2px;">
          <strong>Hint:</strong> ${cfg.fourMarkB.hint}
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; margin-bottom: 2px;">
          <strong>Stems:</strong> ${cfg.fourMarkB.stems}
        </div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
      </div>

      ${renderFooterStrip(leftPageNum, cfg.leftPageQuip)}
    </div>
  </div>

  <!-- ------------------------------------------------------------------ -->
  <!-- RIGHT PAGE: EXTENDED EXAM PRACTICE & RIGOROUS TIMELINE MISSION     -->
  <!-- ------------------------------------------------------------------ -->
  <div class="page page-container" id="page-${rightPageNum}">
    <div class="page-body-full">
      <!-- Exam Header -->
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 6px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 11pt; color: #000000; margin: 0; font-weight: 800;">
          ${cfg.tariff}
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
          Extended Writing Assessment
        </span>
      </div>

      <!-- Question Stem & Stimulus Box -->
      <div style="border: 1px solid #000000; border-radius: 3px; padding: 5px 8px; background: #ffffff; margin-bottom: 5px;">
        <div style="font-family: 'Playfair Display', serif; font-size: 8.8pt; font-weight: 800; color: #000000; margin-bottom: 3px; line-height: 1.25;">
          ${cfg.examStem}
        </div>
        <div style="display: flex; align-items: center; gap: 8px; font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #000000;">
          <strong>Stimulus:</strong>
          <span style="border: 1px solid #000000; padding: 1px 6px; border-radius: 2px; font-weight: 600;">${cfg.stimulus[0]}</span>
          <span style="border: 1px solid #000000; padding: 1px 6px; border-radius: 2px; font-weight: 600;">${cfg.stimulus[1]}</span>
          <span style="font-style: italic;">(You must also use information of your own)</span>
        </div>
      </div>

      <!-- 3-Column Planning Structure Strip -->
      <div style="margin-bottom: 5px;">
        <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-transform: uppercase; margin-bottom: 2px; border-bottom: 1px solid #000000; padding-bottom: 1px;">
          Structure Strip &bull; 3-Paragraph Analytical Plan
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px;">
          ${cfg.structureStrip
            .map(
              (strip) => `
          <div style="border: 1px solid #000000; border-top: 2.5px solid #000000; border-radius: 2px; padding: 3px 5px; background: #ffffff;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7pt; color: #000000; display: block; margin-bottom: 1px;">${strip.col}</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #000000; line-height: 1.2; display: block;">${strip.text}</span>
          </div>
          `,
            )
            .join('')}
        </div>
      </div>

      <!-- Connectives & Key Vocabulary Bank -->
      <div style="border: 1px solid #000000; border-radius: 3px; padding: 4px 7px; background: #ffffff; margin-bottom: 5px; display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
        <div>
          <strong style="font-family: 'Inter', sans-serif; font-size: 7pt; text-transform: uppercase; display: block;">Analytical Connectives:</strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-style: italic; line-height: 1.2; display: block;">${cfg.connectives}</span>
        </div>
        <div>
          <strong style="font-family: 'Inter', sans-serif; font-size: 7pt; text-transform: uppercase; display: block;">Key Vocabulary Bank:</strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; line-height: 1.2; display: block;">${cfg.wordBank}</span>
        </div>
      </div>

      <!-- Ruled Task Lines for Extended Writing -->
      <div style="font-family: 'Inter', sans-serif; font-size: 7.1pt; font-style: italic; color: #222222; margin-bottom: 2px;">
        <strong>Task:</strong> Using the structure strip above, write 1–2 detailed analytical paragraphs below (continue in your exercise book for full timed paper):
      </div>
      <div style="display: flex; flex-direction: column; gap: 0; margin-bottom: 5px; flex: 1; justify-content: space-between;">
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
      </div>

      <!-- Timeline Mission (Deep Historical Analytical Task) -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 5px 8px; background: #ffffff; display: flex; justify-content: space-between; align-items: center; margin-top: 2px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; background: #000000; color: #ffffff; padding: 2px 6px; border-radius: 2px; text-transform: uppercase; white-space: nowrap;">
            Timeline Mission
          </span>
          <span style="font-family: 'Georgia', serif; font-size: 7.2pt; line-height: 1.25; color: #000000;">
            ${cfg.timelineMission}
          </span>
        </div>
        <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 2px 6px; font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 800; white-space: nowrap;">
          [ &nbsp;&nbsp; ] Done
        </div>
      </div>

      ${renderFooterStrip(rightPageNum, cfg.rightPageQuip)}
    </div>
  </div>
`;
  });

  // ====================================================================
  // PAGE 14: OUTSIDE BACK COVER (96-MARK LEDGER, WWW/EBI & 5 QR CODES)
  // ====================================================================
  html += `
  <div class="page page-container" id="page-14" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Top Departmental Branding -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 6px;">
        <div data-department-name="The History Department">
          <span style="font-family: 'Inter', sans-serif; font-size: 10pt; font-weight: 900; color: #000000; text-transform: uppercase; letter-spacing: 0.8px;">
            <span class="school-brand-target">The History Department</span>
          </span>
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 700; color: #000000;">
          KEY TOPIC 3 ASSESSMENT RECORD &bull; c1700–c1900
        </div>
      </div>

      <!-- Student Target Grade Strip -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 4px 10px; background: #ffffff; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 14px; align-items: center; margin-bottom: 6px;">
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #000000; text-transform: uppercase; margin-right: 8px;">Pupil Name:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #000000; height: 12px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #000000; text-transform: uppercase; margin-right: 8px;">Target:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #000000; height: 12px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #000000; text-transform: uppercase; margin-right: 8px;">Predicted:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #000000; height: 12px;"></div>
        </div>
      </div>

      <!-- 96-Mark Progress Ledger Table -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; overflow: hidden; margin-bottom: 6px;">
        <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif; font-size: 8.2pt;">
          <thead>
            <tr style="background: #000000; color: #ffffff;">
              <th style="padding: 4px 6px; width: 14%; text-align: center; border-right: 1px solid #444444; font-size: 7.8pt;">Date Completed</th>
              <th style="padding: 4px 8px; width: 28%; text-align: left; border-right: 1px solid #444444; font-size: 7.8pt;">Lesson &bull; Specification Focus</th>
              <th style="padding: 4px 6px; width: 20%; text-align: center; border-right: 1px solid #444444; font-size: 7.8pt;">Q3 Practice [4m]</th>
              <th style="padding: 4px 6px; width: 24%; text-align: center; border-right: 1px solid #444444; font-size: 7.8pt;">Extended Response</th>
              <th style="padding: 4px 6px; width: 14%; text-align: center; font-size: 7.8pt;">Lesson Total</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 4px 6px; border-right: 1px solid #000000; text-align: center;">&nbsp;</td>
              <td style="padding: 4px 8px; border-right: 1px solid #000000;"><strong>KT3.1:</strong> Pasteur &amp; Koch</td>
              <td style="padding: 4px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Q3 Diff: <span style="font-size: 9.5pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 4</strong> ]</span></td>
              <td style="padding: 4px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Q4 Why: <span style="font-size: 9.5pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 12</strong> ]</span></td>
              <td style="padding: 4px 6px; text-align: center; font-size: 9.8pt; font-weight: 900;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 16</strong> ]</td>
            </tr>
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 4px 6px; border-right: 1px solid #000000; text-align: center;">&nbsp;</td>
              <td style="padding: 4px 8px; border-right: 1px solid #000000;"><strong>KT3.2:</strong> Edward Jenner</td>
              <td style="padding: 4px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Q3 Diff: <span style="font-size: 9.5pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 4</strong> ]</span></td>
              <td style="padding: 4px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Q5/6 Essay: <span style="font-size: 9.5pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 20</strong> ]</span></td>
              <td style="padding: 4px 6px; text-align: center; font-size: 9.8pt; font-weight: 900;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 24</strong> ]</td>
            </tr>
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 4px 6px; border-right: 1px solid #000000; text-align: center;">&nbsp;</td>
              <td style="padding: 4px 8px; border-right: 1px solid #000000;"><strong>KT3.3:</strong> Florence Nightingale</td>
              <td style="padding: 4px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Q3 Sim: <span style="font-size: 9.5pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 4</strong> ]</span></td>
              <td style="padding: 4px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Q4 Why: <span style="font-size: 9.5pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 12</strong> ]</span></td>
              <td style="padding: 4px 6px; text-align: center; font-size: 9.8pt; font-weight: 900;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 16</strong> ]</td>
            </tr>
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 4px 6px; border-right: 1px solid #000000; text-align: center;">&nbsp;</td>
              <td style="padding: 4px 8px; border-right: 1px solid #000000;"><strong>KT3.4:</strong> Simpson &amp; Lister</td>
              <td style="padding: 4px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Q3 Diff: <span style="font-size: 9.5pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 4</strong> ]</span></td>
              <td style="padding: 4px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Q4 Why: <span style="font-size: 9.5pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 12</strong> ]</span></td>
              <td style="padding: 4px 6px; text-align: center; font-size: 9.8pt; font-weight: 900;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 16</strong> ]</td>
            </tr>
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 4px 6px; border-right: 1px solid #000000; text-align: center;">&nbsp;</td>
              <td style="padding: 4px 8px; border-right: 1px solid #000000;"><strong>KT3.5:</strong> John Snow &amp; 1875 Act</td>
              <td style="padding: 4px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Q3 Diff: <span style="font-size: 9.5pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 4</strong> ]</span></td>
              <td style="padding: 4px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Q5/6 Essay: <span style="font-size: 9.5pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 20</strong> ]</span></td>
              <td style="padding: 4px 6px; text-align: center; font-size: 9.8pt; font-weight: 900;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 24</strong> ]</td>
            </tr>
            <tr style="background: #ffffff; font-weight: 900; border-top: 2px solid #000000;">
              <td colspan="2" style="padding: 4px 8px; border-right: 1px solid #000000; text-transform: uppercase; font-size: 8pt;">Cumulative Assessment Totals</td>
              <td style="padding: 4px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Q3 Total: <span style="font-size: 9.8pt; font-weight: 900;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 20</strong> ]</span></td>
              <td style="padding: 4px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Extended: <span style="font-size: 9.8pt; font-weight: 900;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 76</strong> ]</span></td>
              <td style="padding: 4px 6px; text-align: center; font-size: 10.5pt; font-weight: 900;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 96</strong> ]</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Teacher Feedback Section (WWW & EBI 4 lines each) -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 5px 10px; background: #ffffff; margin-bottom: 6px;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; text-transform: uppercase;">
            Teacher Formative Assessment &bull; Feedback
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 700;">
            Effort: [ 1 &bull; 2 &bull; 3 &bull; 4 &bull; 5 ]
          </span>
        </div>

        <div style="margin-bottom: 3px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.6pt; text-transform: uppercase; display: block; margin-bottom: 1px;">
            What Went Well (WWW):
          </strong>
          <div class="task-line"></div>
          <div class="task-line"></div>
          <div class="task-line"></div>
          <div class="task-line"></div>
        </div>

        <div style="margin-bottom: 3px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.6pt; text-transform: uppercase; display: block; margin-bottom: 1px;">
            Even Better If (EBI):
          </strong>
          <div class="task-line"></div>
          <div class="task-line"></div>
          <div class="task-line"></div>
          <div class="task-line"></div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #000000; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 7.4pt;">
          <span><strong>Teacher Signature:</strong> ____________________________</span>
          <span><strong>Date:</strong> ____________________</span>
        </div>
      </div>

      <!-- Interactive Quizzing QR Codes for Lessons 3.1–3.5 -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 5px 8px; background: #ffffff;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000000; padding-bottom: 2px; margin-bottom: 4px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; text-transform: uppercase;">
            📱 Interactive Digital Quizzing Hub &bull; Scan for Instant Retrieval Practice
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; border: 1px solid #000000; padding: 0 4px; border-radius: 2px;">
            ONLINE RECALL
          </span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; text-align: center;">
          ${eighteenthNineteenthConfigs
            .map((cfg, idx) => {
              const quizUrl = `https://the-history-revision-hub.netlify.app/?unit=edexcel_medicine&lesson=${cfg.lessonIndex}&quiz=true`;
              const qrSvg = generateQrSvg(quizUrl);
              const shortLabels = [
                'Pasteur & Koch',
                'Edward Jenner',
                'F. Nightingale',
                'Simpson & Lister',
                'Snow & 1875 Act',
              ];
              return `
          <div style="border: 1px solid #000000; border-radius: 3px; padding: 3px 2px; background: #ffffff; display: flex; flex-direction: column; align-items: center; justify-content: space-between;">
            <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; margin-bottom: 1px;">
              KT3.${cfg.lessonNum}
            </div>
            <div style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 700; color: #333333; margin-bottom: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%;">
              ${shortLabels[idx]}
            </div>
            <div style="width: 21.5mm; height: 21.5mm; margin: 0 auto 2px auto;">
              ${qrSvg}
            </div>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.2pt; font-weight: 700; text-transform: uppercase; background: #000000; color: #ffffff; padding: 1px 5px; border-radius: 2px; margin-bottom: 2px;">
              Scan to Quiz
            </span>
            <div style="font-family: 'Inter', sans-serif; font-size: 8.5pt; font-weight: 900; color: #000000; margin-top: 1px; white-space: nowrap;">
              Best Score: [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 8</strong> ]
            </div>
          </div>
          `;
            })
            .join('')}
        </div>
      </div>

      ${renderFooterStrip(14, 'Sanitation, antiseptics, and vaccinations conquered disease; retrieval practice will conquer your GCSE exam.')}
    </div>
  </div>
`;

  html += `
</body>
</html>
`;

  return html;
}

module.exports = {
  build18th19thTwoPageWorkbook,
};
