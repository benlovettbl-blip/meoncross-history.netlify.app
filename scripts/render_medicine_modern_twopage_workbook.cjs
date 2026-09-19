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
// 5 DEDICATED MODERN MEDICINE ENQUIRY CONFIGURATIONS (100% BLACK & WHITE)
// ============================================================================
const modernConfigs = [
  {
    lessonIndex: 15, // mapped to lesson_4_1 in units/edexcel_medicine/data.js (DNA & Genetics)
    lessonNum: 1,
    id: 'lesson_4_1',
    title: 'KT4.1: Ideas on Causes: Genetics, DNA & The Human Genome Project',
    specAnchor:
      'Ideas about the cause of disease and illness: genetic factors and the discovery of the structure of DNA; the Human Genome Project.',
    tariff: 'Question 4: Explain Why [12 marks &bull; 15 mins]',
    examStem:
      'Explain why there was rapid progress in understanding the causes of disease in the period c1950 to the present. [12 marks]',
    stimulus: ["Rosalind Franklin's Photograph 51 (1952)", 'The Human Genome Project (1990–2003)'],
    structureStrip: [
      {
        col: '1. FRANKLIN & X-RAY CRYSTALLOGRAPHY',
        text: 'Explain Photograph 51 (May 1952), 62-hour radiation exposure at King’s College, and the mathematical proof of a double-stranded helical cylinder.',
      },
      {
        col: '2. WATSON & CRICK’S DOUBLE HELIX',
        text: 'Explain the 1953 Cambridge sheet-metal model, base pairing (A-T, C-G), unzipping replication, and explaining the hereditary transmission of disease.',
      },
      {
        col: '3. THE HUMAN GENOME PROJECT (1990–2003)',
        text: 'Explain sequencing 3 billion base pairs, mapping 25,000 genes, identifying mutations (BRCA1/2, cystic fibrosis), and enabling predictive medicine.',
      },
    ],
    connectives:
      'A decisive turning point was... &bull; In particular, Photograph 51 proved... &bull; Building directly on this, Watson and Crick deduced... &bull; Furthermore, the Human Genome Project enabled... &bull; Consequently...',
    wordBank:
      'DNA &bull; Rosalind Franklin &bull; Maurice Wilkins &bull; Photograph 51 (1952) &bull; X-ray crystallography &bull; James Watson &bull; Francis Crick &bull; double helix (1953) &bull; base pairing (A-T, C-G) &bull; Human Genome Project (1990–2003) &bull; 3 billion base pairs &bull; BRCA1/2 &bull; gene therapy',
    doNow: [
      {
        q: 'Which ancient Greek physician created the Theory of the Four Humours?',
        a: 'Hippocrates (c. 460–370 BC)',
      },
      {
        q: 'Which Roman doctor introduced the Theory of Opposites?',
        a: 'Claudius Galen (c. 129–216 AD)',
      },
      { q: 'In what year did Andreas Vesalius publish De Humani Corporis Fabrica?', a: '1543' },
      {
        q: 'What did William Harvey prove about blood flow in 1628?',
        a: 'Blood circulates in one continuous closed loop pumped by the heart',
      },
      {
        q: 'Which English doctor was nicknamed the ‘English Hippocrates’ for bedside observation?',
        a: 'Thomas Sydenham (Observationes Medicae, 1676)',
      },
      {
        q: 'What vaccine did Edward Jenner develop in 1796 using cowpox matter?',
        a: 'The smallpox vaccine',
      },
      {
        q: 'Which French chemist disproved spontaneous generation and published Germ Theory in 1861?',
        a: 'Louis Pasteur',
      },
      {
        q: 'Which German bacteriologist isolated the bacteria causing anthrax (1876) and tuberculosis (1882)?',
        a: 'Robert Koch',
      },
      { q: 'What anaesthetic did James Simpson discover in Edinburgh in 1847?', a: 'Chloroform' },
      {
        q: 'What 1875 Act compelled local councils in Britain to provide clean water and sewers?',
        a: 'The Public Health Act 1875',
      },
    ],
    vocabPrompt:
      'Define <strong>DNA (Deoxyribonucleic Acid)</strong> and explain how the <strong>Human Genome Project</strong> transformed disease prediction:',
    fourMarkA: {
      type: 'Similarity',
      question:
        'Explain one way in which ideas about the cause of disease in 1900 were similar to ideas in 1880 in Britain. [4 marks]',
      hint: 'Focus on the universal acceptance of Germ Theory and the belief that all human illnesses were caused exclusively by external microscopic bacteria.',
      stems:
        'One way ideas about causes were similar was the reliance on Germ Theory... &bull; In 1880, Koch had proven that... &bull; Similarly, in 1900, doctors still assumed that all diseases...',
    },
    fourMarkB: {
      type: 'Difference',
      question:
        'Explain one way in which scientific methods for investigating disease causes in 1990 were different from methods in 1880. [4 marks]',
      hint: 'Contrast the Human Genome Project’s computerized biochemical DNA sequencing with Robert Koch’s manual microscopic staining with aniline dyes.',
      stems:
        'One way methods differed was the use of molecular genetics... &bull; In 1880, Koch relied on... &bull; In contrast, by 1990, geneticists used automated computers to...',
    },
    timelineMission:
      'Turn to Pages 2–3 (Key Topic 4.1). In the drawing box, sketch Franklin’s Photograph 51 cross pattern and Watson & Crick’s double helix model. Annotate how base pairing unlocked the causes of hereditary disease!',
    leftPageQuip:
      'Rosalind Franklin’s 62-hour X-ray photograph revealed the double helix; Watson and Crick celebrated in The Eagle pub.',
    rightPageQuip:
      'Mapping all 3 billion human DNA base pairs took 13 years; now geneticists can read our biological instruction manual.',
  },
  {
    lessonIndex: 16, // mapped to lesson_4_2 in units/edexcel_medicine/data.js (Lifestyle & Diagnosis)
    lessonNum: 2,
    id: 'lesson_4_2',
    title: 'KT4.2: Lifestyle Factors & The Technological Revolution in Diagnosis',
    specAnchor:
      'Ideas about the cause of disease and illness: lifestyle factors (smoking, diet, alcohol); improvements in diagnosis: laboratories, X-rays, scans (CT, MRI), endoscopes, monitors.',
    tariff: 'Question 5/6: Evaluative Essay [16+4 marks &bull; 20 mins]',
    examStem:
      '‘Technological innovations in medical diagnosis were more important than public health lifestyle campaigns in improving health in Britain c1900–present.’ How far do you agree? [16+4 marks]',
    stimulus: ['Wilhelm Röntgen’s X-rays (1895)', 'The 2007 smoking ban in public places'],
    structureStrip: [
      {
        col: '1. DIAGNOSTIC IMAGING (X-RAYS & CT SCANS)',
        text: 'Explain Röntgen’s 1895 X-ray, WWI mobile units, Hounsfield’s 1971 CT scanner, eliminating exploratory surgery and diagnosing soft-tissue tumors.',
      },
      {
        col: '2. MULTIMODAL DIAGNOSTICS & MRI',
        text: 'Explain MRI magnetic fields, flexible fiber-optic endoscopes, automated blood testing, and continuous ECG cardiac monitors.',
      },
      {
        col: '3. LIFESTYLE CAMPAIGNS & CRITERIA',
        text: 'Evaluate state prevention (anti-smoking, alcohol units, obesity taxes) addressing root causes vs scanners diagnosing damage after it occurs.',
      },
    ],
    connectives:
      'On the one hand, diagnostic technology was revolutionary because... &bull; In particular, Hounsfield’s CT scanner... &bull; On the other hand, lifestyle prevention tackled root causes because... &bull; Consequently, while imaging improved clinical survival, public campaigns... &bull; In conclusion...',
    wordBank:
      'Wilhelm Röntgen (1895) &bull; X-rays &bull; Marie Curie &bull; mobile radiology &bull; Godfrey Hounsfield &bull; CT scanner (1971) &bull; Atkinson Morley Hospital &bull; MRI &bull; ultrasound &bull; endoscope &bull; lifestyle factors &bull; cardiovascular disease &bull; type 2 diabetes &bull; epidemiological transition',
    doNow: [
      { q: 'In what year did Wilhelm Röntgen discover X-rays?', a: '1895' },
      {
        q: 'Who operated 20 mobile X-ray vehicles ("petites Curies") during WWI?',
        a: 'Marie Curie',
      },
      {
        q: 'What Scottish surgeon used carbolic acid spray in 1865 to prevent wound sepsis?',
        a: 'Joseph Lister',
      },
      { q: 'What fatal epidemic struck London in 1854, centered on Broad Street?', a: 'Cholera' },
      {
        q: 'What doctor used a spot map to identify the contaminated Broad Street pump in 1854?',
        a: 'Dr John Snow',
      },
      { q: 'What chemical base does Adenine pair with in the DNA double helix?', a: 'Thymine' },
      { q: 'What chemical base does Cytosine pair with in the DNA double helix?', a: 'Guanine' },
      {
        q: 'Who captured Photograph 51 in May 1952 using X-ray crystallography?',
        a: 'Rosalind Franklin (with Raymond Gosling)',
      },
      {
        q: 'What major project mapped all 3 billion base pairs in human DNA (1990–2003)?',
        a: 'The Human Genome Project',
      },
      {
        q: 'What term describes the shift from infectious diseases to chronic lifestyle conditions?',
        a: 'The Epidemiological Transition',
      },
    ],
    vocabPrompt:
      'Explain the fundamental diagnostic difference between a <strong>Standard 2D X-ray</strong> (1895) and a <strong>Computed Tomography (CT) Scan</strong> (1971):',
    fourMarkA: {
      type: 'Similarity',
      question:
        'Explain one way in which diagnosis in 1900 was similar to diagnosis in 1700 in Britain. [4 marks]',
      hint: 'Focus on doctors relying on external bedside observations (taking pulse, inspecting tongue, smelling urine) and blind exploratory surgery.',
      stems:
        'One way diagnosis was similar was the reliance on external bedside guesswork... &bull; In 1700, Sydenham taught doctors to... &bull; Similarly, in 1900, before modern scanning, physicians still had to...',
    },
    fourMarkB: {
      type: 'Difference',
      question:
        'Explain one way in which diagnosis in 2000 was different from diagnosis in 1900 in Britain. [4 marks]',
      hint: 'Contrast high-tech non-invasive imaging (CT, MRI, ultrasound) and automated blood labs with external symptom observation and exploratory surgery.',
      stems:
        'One way diagnosis differed was the use of non-invasive 3D internal imaging... &bull; In 1900, doctors had to... &bull; In contrast, by 2000, CT and MRI scanners allowed clinicians to...',
    },
    timelineMission:
      'Turn to Pages 2–3 (Key Topic 4.2). In the drawing box, sketch Bertha Röntgen’s hand X-ray and Godfrey Hounsfield’s circular CT scanner. Annotate how scanning permanently ended blind exploratory surgery!',
    leftPageQuip:
      'Bertha Röntgen cried "I have seen my death!" upon seeing her bones; doctors saw the future of medical diagnosis.',
    rightPageQuip:
      'Godfrey Hounsfield’s CT scanner at EMI combined rotating X-rays with digital computers to slice through soft tissue.',
  },
  {
    lessonIndex: 17, // mapped to lesson_4_3 in units/edexcel_medicine/data.js (Magic Bullets & The NHS)
    lessonNum: 3,
    id: 'lesson_4_3',
    title: 'KT4.3: The Search for Magic Bullets, High-Tech Treatments & The Birth of the NHS',
    specAnchor:
      'Advances in medicines: magic bullets (Salvarsan 606, Prontosil); high-tech medical and surgical treatments; public health: the National Health Service (1948).',
    tariff: 'Question 5/6: Evaluative Essay [16+4 marks &bull; 20 mins]',
    examStem:
      '‘The establishment of the National Health Service in 1948 was the most significant turning point in medical care in the period c1900–present.’ How far do you agree? [16+4 marks]',
    stimulus: ['The National Health Service (1948)', 'The discovery of Salvarsan 606 (1909)'],
    structureStrip: [
      {
        col: '1. THE NHS REVOLUTION (1948)',
        text: 'Explain the 1942 Beveridge Report, Bevan defeating BMA opposition, healthcare free at delivery funded by central taxation, and abolishing medical poverty.',
      },
      {
        col: '2. PHARMACOLOGICAL MAGIC BULLETS',
        text: 'Explain Ehrlich & Hata’s Salvarsan 606 (1909 for syphilis), Domagk’s Prontosil (1932 for blood poisoning), providing the cures that hospitals needed.',
      },
      {
        col: '3. CRITERIA & FINANCIAL STRAIN',
        text: 'Evaluate economic strain (1951 prescription charges), Bevan’s compromise with consultants, and modern high-tech therapy costs (dialysis, transplants).',
      },
    ],
    connectives:
      'On the one hand, the NHS was a unique institutional turning point because... &bull; In particular, it guaranteed... &bull; On the other hand, healthcare access relied on pharmacological breakthroughs like... &bull; Furthermore, economic limits forced... &bull; Overall, I judge that...',
    wordBank:
      'Zauberkugel (magic bullet) &bull; Paul Ehrlich &bull; Sahachiro Hata &bull; Salvarsan 606 (1909) &bull; Treponema pallidum &bull; Gerhard Domagk &bull; Prontosil (1932) &bull; sulphonamides &bull; William Beveridge (1942) &bull; Five Giants &bull; Aneurin Bevan &bull; BMA opposition &bull; Park Hospital Manchester (5 July 1948) &bull; central taxation',
    doNow: [
      {
        q: 'What term did Paul Ehrlich use for chemical compounds that destroy bacteria without harming patient cells?',
        a: 'Magic bullets (Zauberkugeln)',
      },
      { q: 'What disease was cured by Salvarsan 606 in 1909?', a: 'Syphilis' },
      {
        q: 'Which Japanese bacteriologist assisted Paul Ehrlich in discovering Salvarsan 606?',
        a: 'Sahachiro Hata',
      },
      {
        q: 'Who discovered that the red dye Prontosil cured streptococcal blood poisoning in 1932?',
        a: 'Gerhard Domagk',
      },
      {
        q: 'What active antibacterial chemical group was found inside Prontosil?',
        a: 'Sulphonamides',
      },
      {
        q: 'Who authored the 1942 social report identifying the "Five Giant Evils" in Britain?',
        a: 'William Beveridge',
      },
      {
        q: 'Who was appointed Minister of Health in 1945 to create the National Health Service?',
        a: 'Aneurin Bevan',
      },
      { q: 'On what exact date was the NHS officially launched in Britain?', a: '5 July 1948' },
      {
        q: 'Which medical organization fiercely resisted state-employed doctors under the NHS?',
        a: 'The British Medical Association (BMA)',
      },
      {
        q: 'Which British engineer invented the CT scanner at EMI laboratories in 1971?',
        a: 'Godfrey Hounsfield',
      },
    ],
    vocabPrompt:
      'Define a <strong>Magic Bullet</strong> and explain how <strong>Salvarsan 606</strong> fundamentally differed from older chemical antiseptics:',
    fourMarkA: {
      type: 'Similarity',
      question:
        'Explain one way in which healthcare access for working-class families before 1948 was similar to the nineteenth century. [4 marks]',
      hint: 'Focus on exclusion from state healthcare, reliance on private doctor fees, charity hospitals, and the dread of medical debt.',
      stems:
        'One way access was similar was the financial barrier to medical care... &bull; In the nineteenth century, poor families... &bull; Similarly, before 1948, women and children excluded from National Insurance had to...',
    },
    fourMarkB: {
      type: 'Difference',
      question:
        'Explain one way in which hospital care after 1948 was different from hospital care in the 1930s in Britain. [4 marks]',
      hint: 'Contrast complete universal care free at the point of delivery funded by taxation with bankrupt voluntary hospitals and means-tested fees.',
      stems:
        'One way hospital care differed was the abolition of fees at the point of treatment... &bull; In the 1930s, voluntary hospitals... &bull; In contrast, by 1948, the NHS provided free treatment funded by...',
    },
    timelineMission:
      'Turn to Pages 2–3 (Key Topic 4.3). In the drawing box, sketch Ehrlich’s test tube of Salvarsan 606 and the 1948 NHS information leaflet. Annotate how free healthcare abolished medical poverty!',
    leftPageQuip:
      'Ehrlich and Hata tested 605 failed arsenic compounds before compound 606 finally cured syphilis in 1909.',
    rightPageQuip:
      'Bevan overcame doctor opposition by "stuffing their mouths with gold," launching the NHS on 5 July 1948.',
  },
  {
    lessonIndex: 18, // mapped to lesson_4_4 in units/edexcel_medicine/data.js (Penicillin)
    lessonNum: 4,
    id: 'lesson_4_4',
    title: 'KT4.4: Case Study 1: The Antibiotic Revolution: Fleming, Florey & Chain and Penicillin',
    specAnchor:
      'Advances in medicines: antibiotics; the development of penicillin, the work of Fleming, Florey and Chain; mass production.',
    tariff: 'Question 4: Explain Why [12 marks &bull; 15 mins]',
    examStem:
      'Explain why penicillin was successfully developed and mass-produced in the period 1928–1945. [12 marks]',
    stimulus: ['Alexander Fleming’s discovery (1928)', 'The impact of the Second World War'],
    structureStrip: [
      {
        col: '1. FLEMING’S 1928 OBSERVATION',
        text: 'Explain St Mary’s Hospital, the contaminated staphylococcus plate, the clear halo of destroyed bacteria, and Fleming publishing in 1929.',
      },
      {
        col: '2. THE OXFORD TEAM (1938–41)',
        text: 'Explain Florey, Chain & Heatley, freeze-drying extraction, the 1940 mice trial, and the tragic 1941 Albert Alexander clinical proof.',
      },
      {
        col: '3. US WARTIME MASS PRODUCTION',
        text: 'Explain the 1941 Peoria mission, corn steep liquor, cantaloupe strain, deep-tank vats, and 2.3 million doses available for D-Day (1944).',
      },
    ],
    connectives:
      'A primary catalyst was Fleming’s acute observation in 1928... &bull; In particular, he noticed... &bull; Building directly on this, Florey and Chain solved the purification crisis by... &bull; Most decisively, the Second World War prompted US industrialization because... &bull; Therefore...',
    wordBank:
      'Alexander Fleming &bull; St Mary’s Hospital (1928) &bull; Staphylococcus &bull; Penicillium notatum &bull; Howard Florey &bull; Ernst Chain &bull; Norman Heatley &bull; freeze-drying &bull; 1940 mouse trial &bull; Albert Alexander (1941) &bull; Peoria Illinois (1941) &bull; corn steep liquor &bull; Penicillium chrysogenum &bull; deep-tank fermentation &bull; D-Day (1944) &bull; 2.3 million doses',
    doNow: [
      {
        q: 'In what year did Alexander Fleming discover penicillin at St Mary’s Hospital?',
        a: '1928',
      },
      {
        q: 'What type of bacteria was being cultured when penicillin was discovered?',
        a: 'Staphylococcus',
      },
      {
        q: 'What was the scientific name of the mold that contaminated Fleming’s dish?',
        a: 'Penicillium notatum',
      },
      {
        q: 'Which two Oxford scientists reopened penicillin research in 1938?',
        a: 'Howard Florey and Ernst Chain',
      },
      {
        q: 'What technician built improvised laboratory apparatus using bedpans at Oxford?',
        a: 'Norman Heatley',
      },
      {
        q: 'What was the name of the Oxford policeman who was the first human patient treated with penicillin in 1941?',
        a: 'Albert Alexander',
      },
      {
        q: 'Why did Albert Alexander die despite penicillin clearing his infection?',
        a: 'The Oxford team ran out of penicillin after five days',
      },
      {
        q: 'In what US city did scientists discover that corn steep liquor boosted penicillin yields?',
        a: 'Peoria, Illinois',
      },
      {
        q: 'How many doses of penicillin were manufactured in time for D-Day in June 1944?',
        a: '2.3 million doses',
      },
      {
        q: 'What dangerous consequence of overusing antibiotics did Fleming warn about in 1945?',
        a: 'Bacterial resistance (superbugs like MRSA)',
      },
    ],
    vocabPrompt:
      'Explain the fundamental chemical difference between an <strong>Antiseptic</strong> (Lister) and an <strong>Antibiotic</strong> (Fleming, Florey & Chain):',
    fourMarkA: {
      type: 'Similarity',
      question:
        'Explain one way in which Alexander Fleming’s discovery of penicillin in 1928 was similar to Edward Jenner’s discovery of the smallpox vaccine in 1796. [4 marks]',
      hint: 'Focus on both discoveries relying on serendipitous/accidental observation of natural living organisms protecting against disease.',
      stems:
        'One way both discoveries were similar was the role of serendipitous observation... &bull; In 1796, Jenner observed that... &bull; Similarly, in 1928, Fleming noticed that a stray mold...',
    },
    fourMarkB: {
      type: 'Difference',
      question:
        'Explain one way in which the mass production of penicillin in 1944 was different from early production in 1940. [4 marks]',
      hint: 'Contrast 10,000-gallon American deep-tank fermentation vats producing millions of doses with the Oxford team culturing mold in ceramic bedpans.',
      stems:
        'One way production differed was the industrial scale and technology... &bull; In 1940, the Oxford team had to... &bull; In contrast, by 1944, US chemical plants utilized...',
    },
    timelineMission:
      'Turn to Pages 2–3 (Key Topic 4.4). In the drawing box, sketch Fleming’s contaminated petri dish and an American 10,000-gallon deep-tank vat. Annotate how penicillin saved Allied troops on D-Day!',
    leftPageQuip:
      'Fleming almost washed his petri dish in lysol, but noticed a clear halo where mold destroyed golden bacteria.',
    rightPageQuip:
      'The Oxford team grew penicillin in ceramic bedpans; American factories in Peoria brewed it in 10,000-gallon deep-tank vats.',
  },
  {
    lessonIndex: 19, // mapped to lesson_4_5 in units/edexcel_medicine/data.js (Lung Cancer)
    lessonNum: 5,
    id: 'lesson_4_5',
    title: 'KT4.5: Case Study 2: Public Health & The Fight Against Lung Cancer',
    specAnchor:
      'Case study: The fight against lung cancer in the twenty-first century: the use of science and technology in diagnosis and treatment; government action.',
    tariff: 'Question 5/6: Evaluative Essay [16+4 marks &bull; 20 mins]',
    examStem:
      '‘Government public health legislation was the main reason for progress in combating lung cancer in the period c1950 to the present.’ How far do you agree? [16+4 marks]',
    stimulus: [
      'Doll and Hill’s research (1950)',
      'Technological treatments (radiotherapy, surgery, immunotherapy)',
    ],
    structureStrip: [
      {
        col: '1. GOVERNMENT PUBLIC HEALTH REGULATION',
        text: 'Explain TV ad ban (1965), packet warnings (1971), 2007 public smoking ban, 2016 plain packaging, and slashing smoking rates from 65% to 13%.',
      },
      {
        col: '2. HIGH-TECH CLINICAL ONCOLOGY',
        text: 'Explain low-dose helical CT scans, flexible bronchoscopy, robotic VATS lobectomies, chemotherapy, and immunotherapy checkpoint inhibitors.',
      },
      {
        col: '3. CRITERIA & REJECTION OF LAISSEZ-FAIRE',
        text: 'Evaluate low 5-year survival rates (16%) proving prevention vastly superior to cure; evaluate the 2024 smoke-free generation legislation.',
      },
    ],
    connectives:
      'On the one hand, government legislation was the decisive factor because... &bull; In particular, Doll and Hill provided the empirical mandate to... &bull; On the other hand, clinical treatments are essential for diagnosed patients because... &bull; Consequently, while oncologists prolong individual lives, state compulsion... &bull; Overall, I conclude that...',
    wordBank:
      'lung cancer &bull; cigarette smoking &bull; Richard Doll & Austin Bradford Hill (1950) &bull; British Doctors Study (1951) &bull; low-dose helical CT scan &bull; bronchoscopy &bull; lobectomy (VATS) &bull; stereotactic radiotherapy &bull; chemotherapy &bull; immunotherapy &bull; TV advertising ban (1965) &bull; Health Act 2007 (public ban) &bull; plain packaging (2016) &bull; smoke-free generation',
    doNow: [
      {
        q: 'Who were the two British epidemiologists who proved that smoking causes lung cancer in 1950?',
        a: 'Richard Doll and Austin Bradford Hill',
      },
      {
        q: 'What was the long-term study of over 40,000 doctors launched in 1951 called?',
        a: 'The British Doctors Study',
      },
      {
        q: 'Why is lung cancer particularly difficult to diagnose in its early stages?',
        a: 'Lung tissue has no pain nerves, so early tumors grow without symptoms',
      },
      {
        q: 'What type of diagnostic scan uses low-dose radiation to detect small lung tumors early?',
        a: 'Low-dose helical CT scan',
      },
      {
        q: 'What surgical procedure involves removing an entire cancerous lobe of a lung?',
        a: 'Lobectomy',
      },
      {
        q: 'What modern cancer treatment uses drugs to train the body’s own immune T-cells to attack tumors?',
        a: 'Immunotherapy',
      },
      {
        q: 'In what year was cigarette advertising completely banned on British television?',
        a: '1965',
      },
      {
        q: 'In what year was smoking banned in all enclosed public places and workplaces in England?',
        a: '2007 (The Health Act 2007)',
      },
      {
        q: 'What standardized color (Pantone 448 C) was mandated for UK cigarette packaging in 2016?',
        a: 'Drab dark olive-brown (plain packaging)',
      },
      {
        q: 'Approximately what percentage of adult British men smoked in 1950 compared to under 13% today?',
        a: '65%',
      },
    ],
    vocabPrompt:
      'Explain how <strong>Plain Packaging (2016)</strong> and the <strong>Health Act 2007</strong> represent the complete, permanent end of government <strong>Laissez-Faire</strong>:',
    fourMarkA: {
      type: 'Similarity',
      question:
        'Explain one way in which the government reaction to lung cancer after 1965 was similar to the Public Health Act of 1875. [4 marks]',
      hint: 'Focus on the total abandonment of laissez-faire in favor of compulsory national legislation protecting citizens from environmental health hazards.',
      stems:
        'One way government action was similar was the rejection of laissez-faire... &bull; Under the 1875 Act, Parliament compelled councils to... &bull; Similarly, after 1965, the government used compulsory laws to ban advertising and...',
    },
    fourMarkB: {
      type: 'Difference',
      question:
        'Explain one way in which treatments for lung cancer in the 2000s were different from treatments in 1950 in Britain. [4 marks]',
      hint: 'Contrast modern targeted immunotherapy, robotic keyhole lobectomy, and precision radiotherapy with rudimentary palliative care and high operative mortality.',
      stems:
        'One way treatments differed was the development of high-tech oncology... &bull; In 1950, doctors could only offer... &bull; In contrast, by the 2000s, oncologists used targeted immunotherapy and robotic lobectomies to...',
    },
    timelineMission:
      'Turn to Pages 2–3 (Key Topic 4.5). In the drawing box, sketch a 1950s doctor cigarette advert and a 2016 olive-green plain pack. Annotate how state legislation slashed smoking from 65% to under 13%!',
    leftPageQuip:
      'Doll and Hill proved smoking caused lung cancer in 1950; Doll immediately extinguished his pipe and lived to age 92.',
    rightPageQuip:
      'From TV ad bans in 1965 to plain olive-green packs in 2016: government compulsion slashed smoking from 65% to 13%.',
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
function buildModernTwoPageWorkbook(unitData, period) {
  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Key Topic 4: Medicine in Modern Britain Workbook</title>
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
          Key Topic 4 &bull; c1900–present
        </div>
        <h1 style="font-family: 'Playfair Display', serif; font-size: 22pt; line-height: 1.15; color: #000000; margin: 2px 0 3px 0; font-weight: 900;">
          Medicine in Modern Britain
        </h1>
        <div style="font-family: 'Georgia', serif; font-size: 10pt; color: #222222; font-style: italic; font-weight: 600;">
          DNA, High-Tech Diagnosis, The NHS, Penicillin, and The War on Lung Cancer
        </div>
      </div>

      <!-- Centerpiece Primary Archival Image -->
      <div style="margin: 3px 0 5px 0; text-align: center; background: #ffffff;">
        <img src="../../images/nhs_established.jpg" alt="Modern Medicine Primary Source" style="width: 100%; max-height: 245px; object-fit: cover; object-position: center 20%; display: block; margin: 0 auto;">
        <div style="display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #000000; padding: 3px 4px; border-top: 1px solid #000000; margin-top: 2px; background: #ffffff;">
          <span><strong>Primary Archival Source:</strong> <em>The Dawn of Free Healthcare: The 1948 National Health Service Leaflet</em></span>
          <span>Accession Shelfmark: <strong>ARCH-MED-1948</strong></span>
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
                  Key Topic 4.1: Ideas on Causes: Genetics, DNA &amp; The Human Genome Project
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 8pt; font-style: italic; color: #333333; margin-top: 1.5px; line-height: 1.25;">
                  How did Rosalind Franklin’s Photograph 51, Watson &amp; Crick, and genomic sequencing unlock hereditary disease?
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
                  Key Topic 4.2: Lifestyle Factors &amp; The Technological Revolution in Diagnosis
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 8pt; font-style: italic; color: #333333; margin-top: 1.5px; line-height: 1.25;">
                  How did the shift to chronic lifestyle illnesses, Röntgen’s X-rays, and Hounsfield’s CT scanner eliminate exploratory surgery?
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
                  Key Topic 4.3: Magic Bullets, High-Tech Treatments &amp; The Birth of the NHS
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 8pt; font-style: italic; color: #333333; margin-top: 1.5px; line-height: 1.25;">
                  How did Salvarsan 606, Prontosil, and Aneurin Bevan’s 1948 NHS create free healthcare for every British citizen?
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
                  Key Topic 4.4: Case Study 1: The Antibiotic Revolution: Fleming, Florey &amp; Chain
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 8pt; font-style: italic; color: #333333; margin-top: 1.5px; line-height: 1.25;">
                  How did Fleming’s 1928 discovery, the Oxford team’s purification, and American deep-tank vats deliver 2.3m doses for D-Day?
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
                  Key Topic 4.5: Case Study 2: Public Health &amp; The Fight Against Lung Cancer
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 8pt; font-style: italic; color: #333333; margin-top: 1.5px; line-height: 1.25;">
                  How did Doll &amp; Hill prove the tobacco link, and how did ad bans, the 2007 public smoking ban, and plain packaging end laissez-faire?
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

      ${renderFooterStrip(1, 'Personal revision tracking ledger: ensure every specification bullet point is mastered.')}
    </div>
  </div>
`;

  // ====================================================================
  // PAGES 2–3: LIVING UNIT TIMELINE & CHRONOLOGICAL SPINE (100% Black & White)
  // ====================================================================
  const timelineMilestonesLeft = [
    {
      year: '1901',
      title: 'Landsteiner Discovers Blood Groups',
      desc: 'Karl Landsteiner identifies A, B, and O blood groups, transforming blood transfusions from fatal gambles into predictable surgical lifelines.',
    },
    {
      year: '1909',
      title: 'Ehrlich & Hata Discover Salvarsan 606',
      desc: 'Paul Ehrlich and Sahachiro Hata discover arsphenamine (compound 606), humanity’s first synthetic chemical ‘magic bullet’ curing syphilis.',
    },
    {
      year: '1928',
      title: 'Alexander Fleming Discovers Penicillin',
      desc: 'Fleming observes a clear zone of destroyed staphylococci around Penicillium notatum mold at St Mary’s Hospital, Paddington, London.',
    },
    {
      year: '1932',
      title: 'Domagk Discovers Prontosil',
      desc: 'Gerhard Domagk proves the red dye Prontosil cures streptococcal blood poisoning, establishing the sulfonamide class of antibacterial drugs.',
    },
  ];

  const timelineMilestonesRight = [
    {
      year: '1944',
      title: 'Mass Production of Penicillin for D-Day',
      desc: 'Following Florey and Heatley’s US mission to Peoria, deep-tank fermentation yields 2.3 million doses of penicillin for the Normandy landings.',
    },
    {
      year: '1948',
      title: 'Aneurin Bevan Launches the NHS',
      desc: 'On 5 July 1948, the National Health Service opens at Park Hospital, Manchester, providing comprehensive healthcare free at the point of delivery.',
    },
    {
      year: '1953',
      title: 'Watson & Crick Discover DNA Double Helix',
      desc: 'Using Rosalind Franklin’s Photograph 51, James Watson and Francis Crick deduce complementary base pairing, unlocking the molecular secret of life.',
    },
    {
      year: '1971 / 2003',
      title: 'CT Scanner (1971) & Human Genome (2003)',
      desc: 'Hounsfield’s EMI CT scanner eliminates exploratory surgery; the Human Genome Project maps all 3 billion chemical base pairs in human DNA.',
    },
  ];

  // PAGE 2 (Timeline Verso: 1900–1940)
  html += `
  <div class="page page-container" id="page-2" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Section Header -->
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 6px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 11pt; color: #000000; margin: 0; font-weight: 800;">
          Living Unit Timeline: Modern Medicine (Part I: 1900–1940)
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
          Chronological Framework &bull; Magic Bullets &amp; Early Antibiotics
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
            &bull; Living Timeline Sketchpad &amp; Causal Synthesis (1900–1940)
          </strong>
          <span style="font-size: 7pt; font-style: italic; color: #444444;">
            Sketch Ehrlich’s Salvarsan vial, Domagk’s Prontosil, or Fleming’s contaminated staphylococcus petri dish.
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

      ${renderFooterStrip(2, 'The 20th century transformed pharmacology from toxic general poisons into targeted magic bullets.')}
    </div>
  </div>
`;

  // PAGE 3 (Timeline Recto: 1940–present)
  html += `
  <div class="page page-container" id="page-3" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Section Header -->
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 6px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 11pt; color: #000000; margin: 0; font-weight: 800;">
          Living Unit Timeline: Modern Medicine (Part II: 1940–present)
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
          Chronological Framework &bull; Mass Antibiotics, The NHS, DNA &amp; Oncology
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
            &bull; Living Timeline Sketchpad &amp; Causal Synthesis (1940–present)
          </strong>
          <span style="font-size: 7pt; font-style: italic; color: #444444;">
            Sketch the 1948 NHS leaflet, Franklin’s Photograph 51, Watson &amp; Crick’s double helix, or Hounsfield’s CT scanner.
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

      ${renderFooterStrip(3, 'From the birth of the NHS to the sequencing of the human genome, state action and high-tech science transformed health.')}
    </div>
  </div>
`;

  // ====================================================================
  // PAGES 4–13: 5 DEDICATED TWO-PAGE SPREADS (LESSONS 4.1 TO 4.5)
  // Matching 100% the Master Medieval, Renaissance & 18th/19th Template
  // ====================================================================
  modernConfigs.forEach((cfg) => {
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
          <strong style="font-family: 'Inter', sans-serif; font-size: 7pt; text-transform: uppercase; display: block;">Domain Vocabulary Bank:</strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #333333; line-height: 1.2; display: block;">${cfg.wordBank}</span>
        </div>
      </div>

      <!-- 10 Ruled Handwriting Practice Lines -->
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; margin-bottom: 5px;">
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

      <!-- Living Timeline Drawing & Synthesis Mission -->
      <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 4px 8px; background: #ffffff; margin-bottom: 2px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase;">
            &bull; Living Timeline Mission
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 700; border: 1px solid #000000; padding: 0 4px; border-radius: 2px;">SYNTHESIS</span>
        </div>
        <div style="font-family: 'Georgia', serif; font-size: 7.2pt; line-height: 1.25; color: #000000;">
          ${cfg.timelineMission}
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
      <!-- Section Header -->
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 6px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 11pt; color: #000000; margin: 0; font-weight: 800;">
          Key Topic 4: Cumulative Assessment Ledger &amp; Student Voice
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
          Formative Assessment &bull; Diagnostic Tracker
        </span>
      </div>

      <!-- Cumulative Assessment Tracking Table (96 Marks Total) -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; overflow: hidden; margin-bottom: 6px;">
        <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif; font-size: 7.5pt;">
          <thead>
            <tr style="border-bottom: 1.5px solid #000000; background: #ffffff;">
              <th style="padding: 5px 6px; width: 22px; text-align: center; border-right: 1px solid #000000;">#</th>
              <th style="padding: 5px 8px; text-align: left; border-right: 1px solid #000000;">Enquiry Lesson Title</th>
              <th style="padding: 5px 6px; text-align: center; border-right: 1px solid #000000;">4-Mark Task</th>
              <th style="padding: 5px 6px; text-align: center; border-right: 1px solid #000000;">Extended Writing</th>
              <th style="padding: 5px 6px; text-align: center; font-weight: 900;">Total Score</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 4px 6px; border-right: 1px solid #000000; text-align: center;">&nbsp;</td>
              <td style="padding: 4px 8px; border-right: 1px solid #000000;"><strong>KT4.1:</strong> DNA &amp; Human Genome</td>
              <td style="padding: 4px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Q3 Diff: <span style="font-size: 9.5pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 4</strong> ]</span></td>
              <td style="padding: 4px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Q4 Why: <span style="font-size: 9.5pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 12</strong> ]</span></td>
              <td style="padding: 4px 6px; text-align: center; font-size: 9.8pt; font-weight: 900;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 16</strong> ]</td>
            </tr>
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 4px 6px; border-right: 1px solid #000000; text-align: center;">&nbsp;</td>
              <td style="padding: 4px 8px; border-right: 1px solid #000000;"><strong>KT4.2:</strong> Lifestyle &amp; Diagnosis</td>
              <td style="padding: 4px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Q3 Sim: <span style="font-size: 9.5pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 4</strong> ]</span></td>
              <td style="padding: 4px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Q5/6 Essay: <span style="font-size: 9.5pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 20</strong> ]</span></td>
              <td style="padding: 4px 6px; text-align: center; font-size: 9.8pt; font-weight: 900;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 24</strong> ]</td>
            </tr>
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 4px 6px; border-right: 1px solid #000000; text-align: center;">&nbsp;</td>
              <td style="padding: 4px 8px; border-right: 1px solid #000000;"><strong>KT4.3:</strong> Magic Bullets &amp; The NHS</td>
              <td style="padding: 4px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Q3 Sim: <span style="font-size: 9.5pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 4</strong> ]</span></td>
              <td style="padding: 4px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Q5/6 Essay: <span style="font-size: 9.5pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 20</strong> ]</span></td>
              <td style="padding: 4px 6px; text-align: center; font-size: 9.8pt; font-weight: 900;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 24</strong> ]</td>
            </tr>
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 4px 6px; border-right: 1px solid #000000; text-align: center;">&nbsp;</td>
              <td style="padding: 4px 8px; border-right: 1px solid #000000;"><strong>KT4.4:</strong> Penicillin Case Study</td>
              <td style="padding: 4px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Q3 Diff: <span style="font-size: 9.5pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 4</strong> ]</span></td>
              <td style="padding: 4px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Q4 Why: <span style="font-size: 9.5pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 12</strong> ]</span></td>
              <td style="padding: 4px 6px; text-align: center; font-size: 9.8pt; font-weight: 900;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 16</strong> ]</td>
            </tr>
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 4px 6px; border-right: 1px solid #000000; text-align: center;">&nbsp;</td>
              <td style="padding: 4px 8px; border-right: 1px solid #000000;"><strong>KT4.5:</strong> Lung Cancer Case Study</td>
              <td style="padding: 4px 6px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;">Q3 Sim: <span style="font-size: 9.5pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 4</strong> ]</span></td>
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

      <!-- Interactive Quizzing QR Codes for Lessons 4.1–4.5 -->
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
          ${modernConfigs
            .map((cfg, idx) => {
              const quizUrl = `https://the-history-revision-hub.netlify.app/?unit=edexcel_medicine&lesson=${cfg.lessonIndex}&quiz=true`;
              const qrSvg = generateQrSvg(quizUrl);
              const shortLabels = [
                'DNA & Genetics',
                'Diagnosis & CT',
                'Magic Bullets & NHS',
                'Penicillin Study',
                'Lung Cancer Study',
              ];
              return `
          <div style="border: 1px solid #000000; border-radius: 3px; padding: 3px 2px; background: #ffffff; display: flex; flex-direction: column; align-items: center; justify-content: space-between;">
            <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; margin-bottom: 1px;">
              KT4.${cfg.lessonNum}
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

      ${renderFooterStrip(14, 'From DNA to the NHS, state action and laboratory science revolutionized healthcare; revision guarantees your GCSE success.')}
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
  buildModernTwoPageWorkbook,
};
