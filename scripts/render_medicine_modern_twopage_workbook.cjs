const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');

const ROOT_DIR = path.resolve(__dirname, '..');

function getBase64Image(relPath) {
  if (!relPath) return null;
  const clean = relPath.replace(/^\//, '');
  const candidates = [
    path.join(ROOT_DIR, 'public', clean),
    path.join(ROOT_DIR, clean),
    path.join(ROOT_DIR, 'public', 'images', path.basename(clean)),
    path.join(ROOT_DIR, 'images', path.basename(clean)),
    path.join(ROOT_DIR, 'units', 'edexcel_medicine', 'assets', path.basename(clean)),
    path.join(ROOT_DIR, 'public', 'units', 'edexcel_medicine', 'assets', path.basename(clean)),
  ];

  for (const cand of candidates) {
    if (fs.existsSync(cand) && fs.statSync(cand).isFile()) {
      const ext = path.extname(cand).toLowerCase();
      let mime = 'image/jpeg';
      if (ext === '.png') mime = 'image/png';
      else if (ext === '.webp') mime = 'image/webp';
      else if (ext === '.svg') mime = 'image/svg+xml';
      const buf = fs.readFileSync(cand);
      return `data:${mime};base64,${buf.toString('base64')}`;
    }
  }
  return null;
}

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

function renderFooterStrip(pageNum, quip, totalPages = 20) {
  const isEven = pageNum % 2 === 0;
  if (isEven) {
    return `
      <div class="page-footer-strip">
        <span class="footer-page-num" style="margin-right: 8px;">${pageNum}/${totalPages}</span>
        <span class="footer-quip" style="text-align: right; flex: 1;">${quip}</span>
      </div>`;
  } else {
    return `
      <div class="page-footer-strip">
        <span class="footer-quip" style="text-align: left; flex: 1; margin-right: 8px;">${quip}</span>
        <span class="footer-page-num">${pageNum}/${totalPages}</span>
      </div>`;
  }
}

function renderNotesPage(pageNum, quip, totalPages = 20) {
  const isEven = pageNum % 2 === 0;
  const pageClass = isEven ? 'verso-page' : 'recto-page';
  const numLines = 32;
  let linesHtml = '';
  for (let i = 0; i < numLines; i++) {
    linesHtml += `          <div class="note-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>\n`;
  }

  return `
  <!-- PAGE ${pageNum}: DEDICATED BRITISH EXERCISE NOTES PAGE -->
  <div class="page page-container ${pageClass}" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div style="border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 5px;">
        <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 12pt; color: #000000; text-transform: uppercase; font-weight: 900; letter-spacing: 0.5px;">
          Key Topic 4 Notes &amp; Examination Strategy
        </h2>
      </div>

      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0; position: relative; border-top: 1.2px solid #000000; margin-bottom: 4px;">
        <!-- Vertical Margin Line (26mm from left edge of lines) - British Exercise Book Standard Margin -->
        <div style="position: absolute; top: 0; bottom: 0; left: 26mm; width: 1.5px; background: #000000; z-index: 2;"></div>
        
        <!-- Ruled Horizontal Lines (Standard ~8mm school pitch, flex-filled) -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0;">
${linesHtml}        </div>
      </div>

      ${renderFooterStrip(pageNum, quip, totalPages)}
    </div>
  </div>`;
}

// 5 Dedicated Modern Medicine Enquiry Configs with Chronological Inquiry Spines
const modernConfigs = [
  {
    lessonNum: 1,
    lessonIndex: 15,
    id: 'lesson_4_1',
    keyTopicBadge: 'KEY TOPIC 4.1',
    title: 'KT4.1: Ideas on Causes: Genetics, DNA & The Human Genome Project',
    enquiryQuestion:
      'Why did the discovery of DNA revolutionize understanding of disease causes, yet take decades to yield treatments?',
    specAnchor:
      'Genetics and DNA: Mendel; Rosalind Franklin (Photograph 51), Watson and Crick (double helix 1953); the Human Genome Project (1990–2003); genetic screening and hereditary disease.',
    tariff: 'Question 4: Explain Why [12 marks &bull; 15 mins]',
    examStem:
      'Explain why there was rapid progress in understanding the causes of disease in the period c1950 to the present. [12 marks]',
    stimulus: ["Rosalind Franklin's Photograph 51 (1952)", 'The Human Genome Project (1990–2003)'],
    connectives:
      'One main reason was that... &bull; For example, ... &bull; This was important because... &bull; Another key factor was... &bull; In particular, ... &bull; Overall, the most decisive reason was... because...',
    wordBank:
      'Gregor Mendel &bull; Rosalind Franklin &bull; Photograph 51 (1952) &bull; Watson & Crick &bull; double helix model &bull; Human Genome Project (1990–2003) &bull; gene screening &bull; hereditary disease',
    timelineMission:
      'Turn to Pages 2–3 (Key Topic 4.1). In the drawing box, sketch Franklin’s Photograph 51 cross pattern and Watson & Crick’s double helix model. Annotate how base pairing unlocked the causes of hereditary disease!',
    fourMark: {
      type: 'Difference',
      question:
        'Explain one way in which scientific methods for investigating disease causes in the late twentieth century (c1950–c2000) were different from methods used in the late nineteenth century (c1870–c1900). [4 marks]',
      hint: 'Contrast computerized DNA sequencing with manual microscopic staining with chemical dyes.',
      stems:
        'One way methods differed was... &bull; In the late nineteenth century... &bull; In contrast, by the late twentieth century...',
    },
    leftPageQuip:
      'Franklin’s 62-hour X-ray exposure revealed the double helix; Watson and Crick celebrated in The Eagle pub.',
    rightPageQuip:
      'Sequencing 3 billion base pairs in the human genome took 13 years; now geneticists can read our biological code.',
    linedLeftQuip:
      'X-ray crystallography transformed genetics from abstract heredity into precise molecular biology.',
    linedRightQuip:
      'Evaluate both breakthroughs: explain how Photograph 51 provided the structural foundation for the Human Genome Project.',
    stages: [
      {
        step: 1,
        dates: 'c1900–1940s',
        title: 'Mendel & Early Genetics',
        questionHeading: 'Why did doctors assume proteins carried hereditary traits?',
        paraBadge: '[1.1]',
        bullets: [
          'Growing wrinkled green garden peas',
          'Spotting dark rod shapes inside cells',
          'Assuming heavy protein chains hold secrets',
        ],
      },
      {
        step: 2,
        dates: '1951–1952',
        title: 'Franklin & Photograph 51',
        questionHeading: 'How did Photograph 51 prove DNA’s helical structure?',
        paraBadge: '[1.2]',
        bullets: [
          'Beaming invisible rays through wet DNA fibers',
          'Exposing glass photographic plates for sixty hours',
          'Revealing clear fuzzy X-shaped shadow marks',
        ],
      },
      {
        step: 3,
        dates: '1953',
        title: 'Watson & Crick’s Model',
        questionHeading: 'How did base pairing explain hereditary replication?',
        paraBadge: '[1.3]',
        bullets: [
          'Twisting thin metal wire into spirals',
          'Locking four chemical pairs like puzzle pieces',
          'Rushing to celebratory pints at The Eagle pub',
        ],
      },
      {
        step: 4,
        dates: '1990–2003',
        title: 'Human Genome Project',
        questionHeading: 'Why was mapping 3 billion base pairs a medical milestone?',
        paraBadge: '[1.4]',
        bullets: [
          'Linking laboratory supercomputers across six nations',
          'Reading three billion chemical letters in blood',
          'Publishing complete human code free online',
        ],
      },
      {
        step: 5,
        dates: '2000s–Present',
        title: 'Screening & Treatment Gap',
        questionHeading: 'Why did understanding causes outpace finding cures?',
        paraBadge: '[1.5]',
        bullets: [
          'Testing saliva drops for faulty breast genes',
          'Matching targeted pills to personal body code',
          'Struggling to fix broken genetic code inside bodies',
        ],
      },
    ],
  },
  {
    lessonNum: 2,
    lessonIndex: 16,
    id: 'lesson_4_2',
    keyTopicBadge: 'KEY TOPIC 4.2',
    title: 'KT4.2: Lifestyle Factors & The Technological Revolution in Diagnosis',
    enquiryQuestion:
      'Were high-tech diagnostic scanners more vital to modern health than state lifestyle campaigns?',
    specAnchor:
      'Lifestyle factors and diagnosis: shift from infectious to chronic disease; non-invasive diagnosis: Röntgen (X-rays), CT scanners (Hounsfield 1971), MRI; endoscopes, blood and ultrasound testing; lifestyle campaigns.',
    tariff: 'Question 5/6: Evaluative Essay [16+4 marks &bull; 20 mins]',
    examStem:
      '‘Technological innovations in medical diagnosis were more important than public health lifestyle campaigns in improving health in Britain c1900–present.’ How far do you agree? [16+4 marks]',
    stimulus: ['Wilhelm Röntgen’s X-rays (1895)', 'The 2007 smoking ban in public places'],
    connectives:
      'On the one hand, high-tech diagnosis was vital because... &bull; For example, ... &bull; This was significant because... &bull; On the other hand, lifestyle campaigns mattered because... &bull; In particular, ... &bull; Overall, the most decisive factor was... because...',
    wordBank:
      'Wilhelm Röntgen (1895) &bull; X-rays &bull; CT scanner (1971) &bull; Godfrey Hounsfield &bull; MRI &bull; non-invasive imaging &bull; 2007 smoking ban &bull; Change4Life',
    timelineMission:
      'Turn to Pages 2–3 (Key Topic 4.2). In the drawing box, sketch Bertha Röntgen’s hand X-ray and Godfrey Hounsfield’s circular CT scanner. Annotate how scanning permanently ended blind exploratory surgery!',
    fourMark: {
      type: 'Difference',
      question:
        'Explain one way in which methods of diagnosing illness in the late twentieth century (c1970–present) were different from methods used in the nineteenth century (c1800–c1900). [4 marks]',
      hint: 'Contrast non-invasive 3D internal scanning and blood labs with external observation and exploratory surgery.',
      stems:
        'One way diagnosis differed was... &bull; In the nineteenth century... &bull; In contrast, by the late twentieth century...',
    },
    leftPageQuip:
      'Bertha Röntgen cried "I have seen my death!" upon seeing her bones; doctors saw the dawn of non-invasive diagnosis.',
    rightPageQuip:
      'Hounsfield’s CT scanner combined rotating X-rays with digital computers to slice through soft body tissue.',
    linedLeftQuip:
      'From Wilhelm Röntgen’s 1895 X-ray to Godfrey Hounsfield’s 1971 CT scanner: imaging banished exploratory surgery.',
    linedRightQuip:
      'Establish clear criteria: high-tech machines detect existing illness; public health campaigns prevent illness before it occurs.',
    stages: [
      {
        step: 1,
        dates: '1895–1918',
        title: 'Röntgen & Early X-Rays',
        questionHeading: 'How did X-rays transform surgical trauma diagnosis in WWI?',
        paraBadge: '[2.1]',
        bullets: [
          'Photographing wife Bertha’s hand and gold wedding ring',
          'Driving mobile medical vans to muddy trenches',
          'Finding jagged lead shrapnel without deep cuts',
        ],
      },
      {
        step: 2,
        dates: '1930s–1960s',
        title: 'Blood Labs & Endoscopy',
        questionHeading: 'Why was fiber-optic endoscopy superior to exploratory surgery?',
        paraBadge: '[2.2]',
        bullets: [
          'Spinning red test tubes in fast centrifuges',
          'Counting abnormal white cells on glass slides',
          'Sliding flexible glass cables down throat tubes',
        ],
      },
      {
        step: 3,
        dates: '1971–1980s',
        title: 'Hounsfield’s CT & MRI',
        questionHeading: 'Why did CT scans transform internal soft-tissue diagnosis?',
        paraBadge: '[2.3]',
        bullets: [
          'Spinning heavy donut scanners around hospital beds',
          'Combining computer pictures into 3D body slices',
          'Using magnetic radio waves to find brain lumps',
        ],
      },
      {
        step: 4,
        dates: 'c1950–1980s',
        title: 'Epidemiological Shift',
        questionHeading: 'What drove the shift from infectious to lifestyle diseases?',
        paraBadge: '[2.4]',
        bullets: [
          'Banishing deadly childhood fevers with wonder drugs',
          'People living past seventy years of age',
          'Rising chest tumours and clogged heart arteries',
        ],
      },
      {
        step: 5,
        dates: '1980s–Present',
        title: 'State Lifestyle Campaigns',
        questionHeading: 'Why do governments favour lifestyle prevention over treatment?',
        paraBadge: '[2.5]',
        bullets: [
          'Clicking compulsory car seatbelts across chests',
          'Extinguishing glowing cigarettes outside pub doors',
          'Taxing sugary fizzy cans and advertising fruit',
        ],
      },
    ],
  },
  {
    lessonNum: 3,
    lessonIndex: 17,
    id: 'lesson_4_3',
    keyTopicBadge: 'KEY TOPIC 4.3',
    title: 'KT4.3: Magic Bullets, High-Tech Treatments & The Birth of the NHS',
    enquiryQuestion:
      'Was the establishment of the NHS in 1948 more transformative than the development of magic bullets?',
    specAnchor:
      'Magic bullets and healthcare: Ehrlich (Salvarsan 606), Domagk (Prontosil); high-tech treatments: dialysis, hip replacements; Beveridge Report (1942); Bevan and the foundation of the NHS (1948); universal healthcare.',
    tariff: 'Question 5/6: Evaluative Essay [16+4 marks &bull; 20 mins]',
    examStem:
      '‘The establishment of the National Health Service in 1948 was the most significant turning point in medical care in the period c1900–present.’ How far do you agree? [16+4 marks]',
    stimulus: ['The National Health Service (1948)', 'The discovery of Salvarsan 606 (1909)'],
    connectives:
      'On the one hand, the NHS was transformative because... &bull; For example, ... &bull; This was significant because... &bull; On the other hand, magic bullets were crucial because... &bull; In particular, ... &bull; Overall, the most decisive factor was... because...',
    wordBank:
      'Paul Ehrlich &bull; Salvarsan 606 (1909) &bull; Gerhard Domagk &bull; Prontosil (1932) &bull; William Beveridge (1942) &bull; Aneurin Bevan &bull; NHS (1948) &bull; free at point of delivery',
    timelineMission:
      'Turn to Pages 2–3 (Key Topic 4.3). In the drawing box, sketch Ehrlich’s test tube of Salvarsan 606 and the 1948 NHS information leaflet. Annotate how free healthcare abolished medical poverty!',
    fourMark: {
      type: 'Difference',
      question:
        'Explain one way in which healthcare access in Britain after 1948 was different from healthcare access in the 1930s. [4 marks]',
      hint: 'Contrast free universal healthcare funded by taxation with private fees and voluntary charity hospitals.',
      stems:
        'One way healthcare access differed was... &bull; In the 1930s... &bull; In contrast, after 1948...',
    },
    leftPageQuip:
      'Ehrlich tested 605 failed arsenic compounds before compound 606 finally cured syphilis in 1909.',
    rightPageQuip:
      'Bevan overcame doctor opposition by "stuffing their mouths with gold," launching the NHS on 5 July 1948.',
    linedLeftQuip:
      'Salvarsan 606 and Prontosil proved chemicals could destroy specific internal microbes without destroying the patient.',
    linedRightQuip:
      'Weigh institutional reform against pharmacology: free healthcare means little without effective drugs to prescribe.',
    stages: [
      {
        step: 1,
        dates: '1906–1909',
        title: 'Ehrlich & Salvarsan 606',
        questionHeading: 'Why was Salvarsan 606 termed the first "magic bullet"?',
        paraBadge: '[3.1]',
        bullets: [
          'Testing hundreds of toxic yellow arsenic mixtures',
          'Hunting chemical bullets that only hit germs',
          'Curing deadly human syphilis with magic bullet',
        ],
      },
      {
        step: 2,
        dates: '1932–1935',
        title: 'Domagk & Prontosil',
        questionHeading: 'How did Prontosil prove synthetic drugs could kill microbes?',
        paraBadge: '[3.2]',
        bullets: [
          'Injecting bright red leather dye into mice',
          'Saving sick daughter from arm-amputation death',
          'Discovering active white sulfa medicine powder',
        ],
      },
      {
        step: 3,
        dates: '1942',
        title: 'The Beveridge Report',
        questionHeading: 'How did WWII unity create momentum for state healthcare?',
        paraBadge: '[3.3]',
        bullets: [
          'Listing Five Giants that crush poor workers',
          'Surviving Nazi air bombs with community spirit',
          'Demanding free medical care for every citizen',
        ],
      },
      {
        step: 4,
        dates: '1945–1948',
        title: 'Bevan & Launch of the NHS',
        questionHeading: 'How did Bevan compromise to persuade resistant doctors?',
        paraBadge: '[3.4]',
        bullets: [
          'Offering private bed perks to stubborn doctors',
          'Delivering free spectacles and dentures to families',
          'Abolishing terrifying doctor bills forever',
        ],
      },
      {
        step: 5,
        dates: '1950s–Present',
        title: 'High-Tech Care & Costs',
        questionHeading: 'Why has modern medical success created financial strain?',
        paraBadge: '[3.5]',
        bullets: [
          'Pumping blood through giant artificial kidney filters',
          'Replacing worn hip joints with metal balls',
          'Charging small fees for paper medicine slips',
        ],
      },
    ],
  },
  {
    lessonNum: 4,
    lessonIndex: 18,
    id: 'lesson_4_4',
    keyTopicBadge: 'KEY TOPIC 4.4',
    title: 'KT4.4: Case Study 1: The Antibiotic Revolution: Fleming, Florey & Chain and Penicillin',
    enquiryQuestion:
      'Why did penicillin require a global war and American industrial might to become a mass-produced cure?',
    specAnchor:
      'Case study: The Antibiotic Revolution: Fleming’s discovery (1928); Florey and Chain (Oxford purification 1938–40); wartime need and US mass production (Peoria deep-tank fermentation 1941–44); D-Day supply; antibiotic resistance.',
    tariff: 'Question 4: Explain Why [12 marks &bull; 15 mins]',
    examStem:
      'Explain why penicillin was successfully developed and mass-produced in the period 1928–1945. [12 marks]',
    stimulus: ['Alexander Fleming’s discovery (1928)', 'The impact of the Second World War'],
    connectives:
      'One main reason was that... &bull; For example, ... &bull; This was important because... &bull; Another key factor was... &bull; In particular, ... &bull; Overall, the most decisive reason was... because...',
    wordBank:
      'Alexander Fleming (1928) &bull; penicillin &bull; Howard Florey &bull; Ernst Chain &bull; Norman Heatley &bull; Albert Alexander (1941) &bull; Peoria fermentation &bull; mass production (1944)',
    timelineMission:
      'Turn to Pages 2–3 (Key Topic 4.4). In the drawing box, sketch Fleming’s contaminated petri dish and an American 10,000-gallon deep-tank vat. Annotate how penicillin saved Allied troops on D-Day!',
    fourMark: {
      type: 'Similarity',
      question:
        'Explain one way in which Alexander Fleming’s discovery of penicillin in 1928 was similar to Edward Jenner’s discovery of the smallpox vaccine in 1796. [4 marks]',
      hint: 'Focus on both breakthroughs relying on accidental observations of natural organisms protecting against disease.',
      stems:
        'One way both discoveries were similar was... &bull; In 1796, Jenner... &bull; Similarly, in 1928, Fleming...',
    },
    leftPageQuip:
      'Fleming almost washed his petri dish in Lysol, but noticed a clear halo where mould destroyed golden staphylococci.',
    rightPageQuip:
      'The Oxford team grew penicillin in bedpans; American factories brewed it in 10,000-gallon fermentation vats.',
    linedLeftQuip:
      'Fleming observed penicillin in 1928; Florey and Chain purified it in 1940; US wartime industry mass-produced it in 1944.',
    linedRightQuip:
      'Show how individual observation, scientific teamwork, wartime necessity, and US capital combined to create mass antibiotics.',
    stages: [
      {
        step: 1,
        dates: '1928–1929',
        title: 'Fleming’s Discovery',
        questionHeading: 'Why could Fleming not turn mould into a clinical medicine?',
        paraBadge: '[4.1]',
        bullets: [
          'Finding fluffy mould on dirty glass dish',
          'Golden germs dissolving in clear circle halos',
          'Failing to separate fragile liquid juice',
        ],
      },
      {
        step: 2,
        dates: '1938–1940',
        title: 'Florey & Chain at Oxford',
        questionHeading: 'How did Norman Heatley solve the purification challenge?',
        paraBadge: '[4.2]',
        bullets: [
          'Brewing fungus inside hospital bedpans and milk churns',
          'Winning American dollar grants during air raids',
          'Freezing brown liquid into precious yellow crystals',
        ],
      },
      {
        step: 3,
        dates: '1940–1941',
        title: 'Mice Trials & Albert Alexander',
        questionHeading: 'Why was Alexander’s trial both a success and a tragedy?',
        paraBadge: '[4.3]',
        bullets: [
          'Infecting eight mice and keeping treated four alive',
          "Scraping rose thorn scratches on policeman's face",
          'Running out of drops before patient recovers',
        ],
      },
      {
        step: 4,
        dates: '1941–1944',
        title: 'Peoria & US Mass Production',
        questionHeading: 'How did US industrial fermentation enable mass production?',
        paraBadge: '[4.4]',
        bullets: [
          'Feeding corn beer wash to rotting melon mould',
          'Pumping sterile air through giant ten-thousand-gallon vats',
          'Brewing million doses for D-Day landing craft',
        ],
      },
      {
        step: 5,
        dates: '1944–Present',
        title: 'D-Day & Superbugs',
        questionHeading: 'Why did Fleming warn that antibiotic overuse causes resistance?',
        paraBadge: '[4.5]',
        bullets: [
          "Spraying white powder directly into torn soldiers' limbs",
          'Three scientists sharing golden Nobel prize medal',
          'Overusing capsules creating tough hospital superbugs',
        ],
      },
    ],
  },
  {
    lessonNum: 5,
    lessonIndex: 19,
    id: 'lesson_4_5',
    keyTopicBadge: 'KEY TOPIC 4.5',
    title: 'KT4.5: Case Study 2: Public Health & The Fight Against Lung Cancer',
    enquiryQuestion:
      'Why has the modern fight against lung cancer required state coercion rather than laboratory cures?',
    specAnchor:
      'Case study: Fight against lung cancer: epidemiology of Doll and Hill (1950); diagnosis: chest X-rays, CT, bronchoscopy; treatments: surgery, radiotherapy, chemotherapy, immunotherapy; government prevention: ad bans, 2007 smoking ban, plain packs (2016).',
    tariff: 'Question 5/6: Evaluative Essay [16+4 marks &bull; 20 mins]',
    examStem:
      '‘Government public health legislation was the main reason for progress in combating lung cancer in the period c1950 to the present.’ How far do you agree? [16+4 marks]',
    stimulus: [
      'Doll and Hill’s research (1950)',
      'Technological treatments (radiotherapy, surgery, immunotherapy)',
    ],
    connectives:
      'On the one hand, government legislation was decisive because... &bull; For example, ... &bull; This was significant because... &bull; On the other hand, high-tech treatments mattered because... &bull; In particular, ... &bull; Overall, the most decisive factor was... because...',
    wordBank:
      'Richard Doll &bull; Austin Bradford Hill (1950) &bull; British Doctors Study &bull; 1965 TV ad ban &bull; 2007 public smoking ban &bull; plain packaging (2016) &bull; radiotherapy &bull; immunotherapy',
    timelineMission:
      'Turn to Pages 2–3 (Key Topic 4.5). In the drawing box, sketch a 1950s doctor cigarette advert and a 2016 olive-green plain pack. Annotate how state legislation slashed smoking from 65% to under 13%!',
    fourMark: {
      type: 'Similarity',
      question:
        'Explain one way in which government intervention against lung cancer after 1965 was similar to government action in the 1875 Public Health Act. [4 marks]',
      hint: 'Focus on both representing state intervention and compulsory legislation replacing laissez-faire.',
      stems:
        'One way government action was similar was... &bull; In 1875, Parliament... &bull; Similarly, after 1965...',
    },
    leftPageQuip:
      'Doll and Hill proved smoking caused lung cancer in 1950; Doll immediately extinguished his pipe and lived to age 92.',
    rightPageQuip:
      'From TV ad bans in 1965 to plain olive-green packs in 2016: government compulsion slashed smoking from 65% to 13%.',
    linedLeftQuip:
      'Doll and Hill’s statistical epidemiology gave the British government the empirical evidence to dismantle tobacco marketing.',
    linedRightQuip:
      'Compare 1875 sewers with 2007 smoking bans: state compulsion consistently achieves greater public health impact than laissez-faire.',
    stages: [
      {
        step: 1,
        dates: '1920s–1950',
        title: 'The Mysterious Epidemic',
        questionHeading: 'Why did early doctors fail to link smoking to lung cancer?',
        paraBadge: '[5.1]',
        bullets: [
          'Men coughing black blood into hospital basins',
          'Blaming smelly road tarmac and lorry exhaust fumes',
          'Colourful billboards showing smiling smoking doctors',
        ],
      },
      {
        step: 2,
        dates: '1950–1954',
        title: 'Doll & Hill’s Proof',
        questionHeading: 'How did statistical epidemiology prove the causal link?',
        paraBadge: '[5.2]',
        bullets: [
          'Interviewing sick patients across twenty London wards',
          'Tracking forty thousand real family doctors over years',
          'Proving heavy smokers face fifty-times higher risk',
        ],
      },
      {
        step: 3,
        dates: '1962–1971',
        title: 'Royal College & Ad Bans',
        questionHeading: 'Why did government action encounter strong tobacco lobbying?',
        paraBadge: '[5.3]',
        bullets: [
          'Banning glowing cigarette commercials on evening television',
          'Printing bold black warning text on cardboard cartons',
          'Sponsoring fast racing cars to keep brands famous',
        ],
      },
      {
        step: 4,
        dates: '2000s',
        title: 'Public Smoking Ban',
        questionHeading: 'Why was passive smoking crucial in banning public smoking?',
        paraBadge: '[5.4]',
        bullets: [
          'Breathing toxic secondhand smoke in crowded rooms',
          'Padlocking pub ashtrays and stepping outside into cold',
          'Raising legal counter buying age to eighteen',
        ],
      },
      {
        step: 5,
        dates: '2010s–Present',
        title: 'Plain Packs & Oncology',
        questionHeading: 'Why does low cancer survival prove prevention beats cure?',
        paraBadge: '[5.5]',
        bullets: [
          'Selling plain ugly mud-green packets with graphic photos',
          'Guiding tiny robotic camera pincers between chest ribs',
          'Boosting immune soldier cells to attack hidden tumours',
        ],
      },
    ],
  },
];

function renderSpinePage(cfg) {
  const { pageNum, lessonNum, keyTopicBadge, enquiryQuestion, specAnchor, stages, leftPageQuip } =
    cfg;

  const stagesHtml = stages
    .map((st, sIdx) => {
      const bulletsHtml = st.bullets
        .map(
          (b, idx) => `
            <div style="flex: 1; display: flex; align-items: center; padding: 0 5px; ${idx < 2 ? 'border-bottom: 0.8px solid #000000;' : ''}">
              <div style="display: flex; align-items: flex-start; gap: 4px; line-height: 1.18;">
                <span style="font-weight: 900; color: #000000; font-size: 7pt; line-height: 1.3;">&bull;</span>
                <span style="font-family: 'Inter', sans-serif; font-size: 8.8pt; font-weight: 800; color: #000000; word-break: break-word;">${b}</span>
              </div>
            </div>`,
        )
        .join('');

      const questionText = st.questionHeading || st.focusClue || st.title;
      const paraBadge = st.paraBadge || `[${lessonNum}.${sIdx + 1}]`;

      return `
        <div class="spine-stage-block" style="display: flex; flex-direction: column; flex: 1; min-height: 0; margin-bottom: 2.5px; border: 1.2px solid #000000; border-radius: 2px; overflow: hidden; background: #ffffff;">
          
          <!-- Full-Width Banner with Key Question Across Page (Strict Single-Line Fit) -->
          <div class="stage-banner" style="background: #000000; color: #ffffff; padding: 2px 7px; display: flex; align-items: center; border-bottom: 1.2px solid #000000; min-height: 20px; box-sizing: border-box;">
            <div style="display: flex; align-items: center; gap: 6px; min-width: 0; flex: 1; overflow: hidden;">
              <span style="background: #ffffff; color: #000000; font-family: 'Inter', sans-serif; font-size: 8.2pt; font-weight: 900; padding: 0.6px 6px; border-radius: 2px; white-space: nowrap; flex-shrink: 0;">
                ${st.step || sIdx + 1}
              </span>
              <span style="font-family: 'Inter', sans-serif; font-size: 8.4pt; font-weight: 800; color: #ffffff; white-space: nowrap; flex-shrink: 0;">
                ${st.dates}
              </span>
              <span style="color: #ffffff; font-size: 7.5pt; flex-shrink: 0;">&bull;</span>
              <span style="font-family: 'Inter', sans-serif; font-size: 8.6pt; font-weight: 800; color: #ffffff; white-space: nowrap; overflow: hidden; letter-spacing: -0.1px;">
                ${questionText}
              </span>
            </div>
            <span style="background: #ffffff; color: #000000; font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 900; padding: 0.5px 5px; border-radius: 2px; margin-left: 6px; white-space: nowrap; flex-shrink: 0;">
              ${paraBadge}
            </span>
          </div>

          <!-- Content Row: Left 3-Zone Trigger Spine (44mm) & Right Ruled Writing Lines (~154mm) -->
          <div style="display: flex; flex: 1; min-height: 0; align-items: stretch;">
            
            <!-- Left Column: High-Visibility 44mm Trigger Spine (Pure White Canvas, Zero Grey Dithering) -->
            <div style="width: 44mm; flex-shrink: 0; background: #ffffff; display: flex; flex-direction: column; border-right: 1.2px solid #000000; box-sizing: border-box;">
              ${bulletsHtml}
            </div>

            <!-- Right Column: 6 Ruled Note-Taking Lines (Expanded Writing Space) -->
            <div style="flex: 1; display: flex; flex-direction: column; background: #ffffff; margin: 0; padding: 0;">
              <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
            </div>

          </div>
        </div>`;
    })
    .join('');

  return `
  <!-- ------------------------------------------------------------------ -->
  <!-- LESSON ENQUIRY NOTEBOOK WITH CHRONOLOGICAL SPINE (PAGE ${pageNum})         -->
  <!-- ------------------------------------------------------------------ -->
  <div class="page page-container verso-page" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      
      <!-- Lesson Header with Inquiry Question Title -->
      <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 2px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 8.0pt; font-weight: 900; letter-spacing: 0.5px; text-transform: uppercase; background: #000000; color: #ffffff; border: 1.2px solid #000000; padding: 1.5px 7px; border-radius: 2px;">
            ${keyTopicBadge} &bull; LESSON NOTEBOOK
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 8.0pt; font-weight: 800; text-transform: uppercase; color: #000000;">
            EDEXCEL GCSE (9–1) HISTORY &bull; PAPER 1 (1HI0/11)
          </span>
        </div>
        <h2 style="font-family: 'Playfair Display', serif; font-size: 12.2pt; color: #000000; margin: 1px 0 1px 0; font-weight: 900; line-height: 1.2;">
          ${enquiryQuestion}
        </h2>
      </div>

      <!-- Core Specification Focus Strip -->
      <div style="border: 1px solid #000000; border-left: 3.5px solid #000000; padding: 2.5px 7px; background: #ffffff; margin-bottom: 2px; font-family: 'Inter', sans-serif; font-size: 8.4pt; line-height: 1.26; color: #000000;">
        <strong style="color: #000000;">Core Specification Focus:</strong> ${specAnchor}
      </div>

      <!-- Chronological Inquiry Spine & Note-Taking Canvas -->
      <div style="flex: 1; display: flex; flex-direction: column; min-height: 0; margin-top: 2px;">
        <!-- 5 Chronological Stages with Spine on Left and Ruled Lines on Right -->
        <div style="display: flex; flex-direction: column; flex: 1; min-height: 0; gap: 0;">
          ${stagesHtml}
        </div>
      </div>

      ${renderFooterStrip(pageNum, leftPageQuip, 20)}
    </div>
  </div>`;
}

// ============================================================================
// HTML WORKBOOK GENERATOR FUNCTION (100% Black & White / Master Template)
// ============================================================================
function buildModernTwoPageWorkbook(unitData, period) {
  const coverImgBase64 =
    getBase64Image('public/images/bevan_first_day_nhs_1948.jpg') ||
    getBase64Image('/images/bevan_first_day_nhs_1948.jpg') ||
    getBase64Image('public/images/nhs_established.jpg') ||
    '';

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Key Topic 4: Medicine in Modern Britain Workbook</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:wght@700;800;900&display=swap" rel="stylesheet">
  <style>
    *, *:before, *:after {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
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
    .page-body-full {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .task-section {
      margin-bottom: 5px;
      padding-bottom: 0;
    }
    .task-section-divider {
      border-bottom: 1.2px solid #000000;
      padding-bottom: 4px;
      margin-bottom: 5px;
    }
    .task-line {
      border-bottom: 1.2px solid #000000;
      height: 7.8mm;
      min-height: 7.8mm;
      max-height: 7.8mm;
      width: 100%;
      box-sizing: border-box;
      margin: 0;
      flex-shrink: 0;
    }
    .task-line-flex {
      border-bottom: 1.2px solid #000000;
      flex: 1;
      min-height: 0;
      width: 100%;
      box-sizing: border-box;
      margin: 0;
    }
    .task-line-dotted {
      border-bottom: 1.2px dotted #000000;
      height: 7.4mm;
      width: 100%;
      box-sizing: border-box;
      margin: 0;
    }
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
  // PAGE 1: FRONT COVER
  // ====================================================================
  html += `
  <div class="page page-container recto-page" id="page-1" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Top Departmental Branding with Customizer Hook -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #0f284e; padding-bottom: 4px; margin-bottom: 8px;">
        <div data-department-name="The History Department">
          <span style="font-family: 'Inter', sans-serif; font-size: 11pt; font-weight: 900; color: #0f284e; text-transform: uppercase; letter-spacing: 1px;">
            <span class="school-brand-target">The History Department</span>
          </span>
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 8.5pt; font-weight: 800; color: #0f284e;">
          EDEXCEL GCSE (9–1) HISTORY &bull; PAPER 1
        </div>
      </div>

      <!-- Unit Title & Subtitle Banner -->
      <div style="text-align: center; margin-bottom: 8px;">
        <span style="display: inline-block; font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 900; letter-spacing: 1.5px; text-transform: uppercase; border: 1.5px solid #0f284e; background: #0f284e; color: #ffffff; padding: 2px 10px; border-radius: 3px; margin-bottom: 4px;">
          KEY TOPIC 4 &bull; PUPIL WORKBOOK
        </span>
        <h1 style="font-family: 'Playfair Display', serif; font-size: 20pt; font-weight: 900; color: #0f284e; margin: 4px 0 2px 0; line-height: 1.15; letter-spacing: -0.5px;">
          Medicine in Modern Britain
        </h1>
        <p style="font-family: 'Georgia', serif; font-size: 9pt; color: #334155; margin: 0; font-style: italic; font-weight: 600;">
          c1900–present: Ideas on Causes, Diagnostic Technology, The NHS, Penicillin &amp; Lung Cancer
        </p>
      </div>

      <!-- Prominent Primary Visual Source Centerpiece (Rich Authentic Colour) -->
      <div style="margin: 2px 0 5px 0; border: 1.5px solid #0f284e; border-radius: 4px; overflow: hidden; background: #ffffff;">
        <div style="background: #fcfbf9; display: flex; justify-content: center; align-items: center; padding: 2px 4px;">
          <img src="${coverImgBase64}" alt="Health Minister Aneurin Bevan visiting Sylvia Beckingham, the first NHS patient, Park Hospital, Davyhulme, 5 July 1948" style="width: 100%; height: 93mm; object-fit: cover; object-position: center 38%; display: block; margin: 0 auto; border: 1.2px solid #0f284e; border-radius: 2px; box-shadow: 0 2px 6px rgba(15,40,78,0.22);">
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #0f284e; padding: 3px 8px; border-top: 1.5px solid #0f284e; background: #ffffff;">
          <span><strong>Primary Visual Evidence:</strong> <em>Health Minister Aneurin Bevan visiting Sylvia Beckingham (first NHS patient), Park Hospital, Davyhulme, 5 July 1948</em></span>
          <span style="font-weight: 700; color: #475569; white-space: nowrap; margin-left: 8px;">CENTRAL OFFICE OF INFORMATION ARCHIVE</span>
        </div>
      </div>

      <!-- Pupil Identification & Target Setting Box -->
      <div style="border: 1.5px solid #0f284e; border-radius: 4px; padding: 4px 10px; background: #ffffff; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 14px; align-items: center; margin-bottom: 6px;">
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #0f284e; text-transform: uppercase; margin-right: 8px;">Pupil Name:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #0f284e; height: 12px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #0f284e; text-transform: uppercase; margin-right: 8px;">Target:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #0f284e; height: 12px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #0f284e; text-transform: uppercase; margin-right: 8px;">Class:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #0f284e; height: 12px;"></div>
        </div>
      </div>

      <!-- Course Specification Curriculum Tracking Table -->
      <div style="border: 1.5px solid #0f284e; border-radius: 4px; overflow: hidden; margin-bottom: 4px;">
        <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif; font-size: 8pt;">
          <thead>
            <tr style="background: #0f284e; color: #ffffff; text-transform: uppercase; letter-spacing: 0.5px;">
              <th style="padding: 4px 8px; text-align: left; width: 78%; font-size: 7.5pt; font-weight: 800;">
                Key Topic 4 Specification Framework (1HI0/11)
              </th>
              <th style="padding: 4px 8px; text-align: center; width: 11%; font-size: 7.5pt; font-weight: 800; border-left: 1px solid rgba(255,255,255,0.25);">
                Lesson Done
              </th>
              <th style="padding: 4px 8px; text-align: center; width: 11%; font-size: 7.5pt; font-weight: 800; border-left: 1px solid rgba(255,255,255,0.25);">
                Quiz [10]
              </th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #cbd5e1;">
              <td style="padding: 18.5px 10px; border-right: 1.2px solid #cbd5e1;">
                <div style="font-size: 8.8pt; font-weight: 800; color: #0f284e; line-height: 1.25;">
                  Key Topic 4.1: Ideas on Causes: Genetics, DNA &amp; The Human Genome Project
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 8pt; font-style: italic; color: #475569; margin-top: 1.5px; line-height: 1.25;">
                  How did Rosalind Franklin’s Photograph 51, Watson &amp; Crick, and genomic sequencing unlock hereditary disease?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #cbd5e1;">
                <div style="width: 16px; height: 16px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 16px; height: 16px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #cbd5e1;">
              <td style="padding: 18.5px 10px; border-right: 1.2px solid #cbd5e1;">
                <div style="font-size: 8.8pt; font-weight: 800; color: #0f284e; line-height: 1.25;">
                  Key Topic 4.2: Lifestyle Factors &amp; The Technological Revolution in Diagnosis
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 8pt; font-style: italic; color: #475569; margin-top: 1.5px; line-height: 1.25;">
                  How did the shift to chronic lifestyle illnesses, Röntgen’s X-rays, and Hounsfield’s CT scanner eliminate exploratory surgery?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #cbd5e1;">
                <div style="width: 16px; height: 16px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 16px; height: 16px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #cbd5e1;">
              <td style="padding: 18.5px 10px; border-right: 1.2px solid #cbd5e1;">
                <div style="font-size: 8.8pt; font-weight: 800; color: #0f284e; line-height: 1.25;">
                  Key Topic 4.3: Magic Bullets, High-Tech Treatments &amp; The Birth of the NHS
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 8pt; font-style: italic; color: #475569; margin-top: 1.5px; line-height: 1.25;">
                  How did Salvarsan 606, Prontosil, and Aneurin Bevan’s 1948 NHS create free healthcare for every British citizen?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #cbd5e1;">
                <div style="width: 16px; height: 16px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 16px; height: 16px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #cbd5e1;">
              <td style="padding: 18.5px 10px; border-right: 1.2px solid #cbd5e1;">
                <div style="font-size: 8.8pt; font-weight: 800; color: #0f284e; line-height: 1.25;">
                  Key Topic 4.4: Case Study 1: The Antibiotic Revolution: Fleming, Florey &amp; Chain
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 8pt; font-style: italic; color: #475569; margin-top: 1.5px; line-height: 1.25;">
                  How did Fleming’s 1928 discovery, the Oxford team’s purification, and American deep-tank vats deliver 2.3m doses for D-Day?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #cbd5e1;">
                <div style="width: 16px; height: 16px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 16px; height: 16px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #cbd5e1;">
              <td style="padding: 18.5px 10px; border-right: 1.2px solid #cbd5e1;">
                <div style="font-size: 8.8pt; font-weight: 800; color: #0f284e; line-height: 1.25;">
                  Key Topic 4.5: Case Study 2: Public Health &amp; The Fight Against Lung Cancer
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 8pt; font-style: italic; color: #475569; margin-top: 1.5px; line-height: 1.25;">
                  How did Doll &amp; Hill prove the tobacco link, and how did ad bans, the 2007 public smoking ban, and plain packaging end laissez-faire?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #cbd5e1;">
                <div style="width: 16px; height: 16px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 16px; height: 16px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      ${renderFooterStrip(1, 'Personal revision tracking ledger: ensure every specification bullet point is mastered.', 20)}
    </div>
  </div>
`;

  // ====================================================================
  // PAGES 2–3: LIVING UNIT TIMELINE (BORDERLESS OPEN DRAWING CANVAS)
  // ====================================================================
  const timelineMilestonesLeft = [
    {
      year: '1901',
      title: 'Karl Landsteiner: ABO Blood Groups Discovered',
      kt: 'Key Topic 4.1',
      desc: 'Landsteiner identifies A, B, and O blood groups, proving agglutination occurs when incompatible blood types mix. This discovery transforms blood transfusions from fatal gambles into safe, predictable surgical lifelines, foundational for modern trauma surgery.',
    },
    {
      year: '1909',
      title: 'Paul Ehrlich & Sahachiro Hata: Salvarsan 606',
      kt: 'Key Topic 4.3',
      desc: 'Building on dye research, Ehrlich and Hata systematically test hundreds of arsenic compounds, discovering arsphenamine (compound 606). Humanity’s first synthetic chemical ‘magic bullet’ targets syphilis bacteria without poisoning human tissue.',
    },
    {
      year: '1928',
      title: 'Alexander Fleming: Accidental Discovery of Penicillin',
      kt: 'Key Topic 4.4',
      desc: 'Returning from holiday, Fleming notices a contaminated staphylococcus culture dish with a halo of destroyed bacteria around Penicillium notatum mould. Fleming publishes in 1929, though unable to purify or extract enough active substance for clinical trials.',
    },
    {
      year: '1932',
      title: 'Gerhard Domagk: Prontosil & Sulfonamide Drugs',
      kt: 'Key Topic 4.3',
      desc: 'Domagk demonstrates that the red leather dye Prontosil cures streptococcal blood poisoning in mice (and saves his own daughter’s arm). Chemists isolate the active ingredient sulfonamide, launching the world’s first mass-prescribed class of antibacterial wonder drugs.',
    },
  ];

  const timelineMilestonesRight = [
    {
      year: '1941–44',
      title: 'Florey, Chain & Heatley: Penicillin Mass Production',
      kt: 'Key Topic 4.4',
      desc: 'Howard Florey and Ernst Chain purify penicillin at Oxford, successfully treating mice and Albert Alexander (1941). Heatley and Florey travel to Peoria, Illinois, using corn-steep liquor and deep-tank fermentation to produce 2.3 million doses for D-Day casualties.',
    },
    {
      year: '1948',
      title: 'Aneurin Bevan: Foundation of the NHS',
      kt: 'Key Topic 4.3',
      desc: 'On 5 July 1948, the National Health Service opens at Park Hospital, Manchester. Championed by Bevan and the 1942 Beveridge Report, it nationalises voluntary and municipal hospitals, providing universal healthcare free at the point of clinical delivery.',
    },
    {
      year: '1953',
      title: 'Watson, Crick & Franklin: DNA Double Helix Structure',
      kt: 'Key Topic 4.1',
      desc: 'Using Rosalind Franklin and Maurice Wilkins’s X-ray crystallography (Photograph 51), Watson and Crick deduce the double-helix structure of DNA at Cambridge, unlocking hereditary genetic code and modern molecular gene therapy.',
    },
    {
      year: '1971–2003',
      title: 'CT Scanners (1971) & The Human Genome Project (2003)',
      kt: 'Key Topic 4.2 &bull; 4.1',
      desc: 'Godfrey Hounsfield invents the EMI CT scanner, combining computer algorithms with X-rays to image internal organs without surgery. In 2003, the international Human Genome Project maps all 3 billion chemical base pairs in human DNA, founding precision medicine.',
    },
  ];

  // PAGE 2 (Timeline Verso: 1900–1940)
  html += `
  <div class="page page-container verso-page" id="page-2" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div>
        <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 4px;">
          <h2 style="font-family: 'Playfair Display', serif; font-size: 11pt; color: #000000; margin: 0; font-weight: 800;">
            Living Timeline &bull; Part 1: Magic Bullets, Blood Groups &amp; Early Antibiotics (1900–1940)
          </h2>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
            Chronological Inquiry &bull; Milestones 1–4
          </span>
        </div>

        <div style="border: 1.2px solid #000000; border-radius: 3px; background: #ffffff; padding: 3px 6px; margin-bottom: 5px; font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #000000;">
          <strong style="color: #000000;">Living Timeline Dual-Coding Protocol:</strong> Draw visual symbols for ABO agglutination, Salvarsan magic bullets, Fleming’s mould petri dish, and Prontosil sulfa dye across the timeline below.
        </div>
      </div>

      <!-- 4 Milestones with Open Drawing Area (Zero Box Lines) -->
      <div style="display: flex; flex-direction: column; flex: 1; justify-content: space-between; min-height: 0;">
        ${timelineMilestonesLeft
          .map(
            (m) => `
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 9.6pt; font-weight: 900; color: #000000;">
              ${m.year} &bull; ${m.title}
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 800; background: #000000; color: #ffffff; border: 1px solid #000000; padding: 1px 6px; border-radius: 2px;">${m.kt}</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.6pt; color: #000000; margin: 0; line-height: 1.3;">
            ${m.desc}
          </p>
        </div>
        `,
          )
          .join('')}
      </div>

      ${renderFooterStrip(2, 'The 20th century transformed pharmacology from toxic general poisons into targeted magic bullets.', 20)}
    </div>
  </div>
`;

  // PAGE 3 (Timeline Recto: 1940–present)
  html += `
  <div class="page page-container recto-page" id="page-3" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div>
        <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 4px;">
          <h2 style="font-family: 'Playfair Display', serif; font-size: 11pt; color: #000000; margin: 0; font-weight: 800;">
            Living Timeline &bull; Part 2: Mass Antibiotics, The NHS, DNA &amp; Oncology (1940–present)
          </h2>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
            Chronological Inquiry &bull; Milestones 5–8
          </span>
        </div>

        <div style="border: 1.2px solid #000000; border-radius: 3px; background: #ffffff; padding: 3px 6px; margin-bottom: 5px; font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #000000;">
          <strong style="color: #000000;">Living Timeline Dual-Coding Protocol:</strong> Draw visual symbols for Peoria deep fermentation vats, the 1948 NHS charter, Franklin’s Photograph 51 double helix, and CT scan slices across the timeline below.
        </div>
      </div>

      <!-- 4 Milestones with Open Drawing Area (Zero Box Lines) -->
      <div style="display: flex; flex-direction: column; flex: 1; justify-content: space-between; min-height: 0;">
        ${timelineMilestonesRight
          .map(
            (m) => `
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 9.6pt; font-weight: 900; color: #000000;">
              ${m.year} &bull; ${m.title}
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 800; background: #000000; color: #ffffff; border: 1px solid #000000; padding: 1px 6px; border-radius: 2px;">${m.kt}</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.6pt; color: #000000; margin: 0; line-height: 1.3;">
            ${m.desc}
          </p>
        </div>
        `,
          )
          .join('')}
      </div>

      ${renderFooterStrip(3, 'From the birth of the NHS to the sequencing of the human genome, state action and high-tech science transformed health.', 20)}
    </div>
  </div>
`;

  // ====================================================================
  // PAGES 4–18: 5 DEDICATED THREE-PAGE ENQUIRY MODULES (15 PAGES TOTAL)
  // Page 1: Chronological Inquiry Spine & Exposition Notes (Verso)
  // Page 2: Extended Writing Part 1 (18 task lines, stimulus, writing frames & vocab @ 8.2pt) (Recto)
  // Page 3: Extended Writing Part 2 (16 continuation lines + Question 3 Similarity/Difference [4 marks]) (Verso)
  // ====================================================================
  modernConfigs.forEach((cfg, idx) => {
    const spinePageNum = 4 + idx * 3; // 4, 7, 10, 13, 16
    const questionPart1PageNum = spinePageNum + 1; // 5, 8, 11, 14, 17
    const questionPart2PageNum = spinePageNum + 2; // 6, 9, 12, 15, 18

    // PAGE 1 OF ENQUIRY: CHRONOLOGICAL INQUIRY SPINE
    html += renderSpinePage({ ...cfg, pageNum: spinePageNum });

    // PAGE 2 OF ENQUIRY: EXAM QUESTION PART 1 (26 FLEX TASK LINES, TIMELINE MISSION, PROMINENT TYPOGRAPHY)
    const part1TaskLines = Array.from(
      { length: 26 },
      () => '<div class="task-line-flex"></div>',
    ).join('');

    html += `
  <div class="page page-container recto-page" id="page-${questionPart1PageNum}">
    <div class="page-body-full">
      <div>
        <!-- Exam Header -->
        <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 5px;">
          <h2 style="font-family: 'Playfair Display', serif; font-size: 11pt; color: #000000; margin: 0; font-weight: 800;">
            ${cfg.tariff}
          </h2>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
            Extended Writing Assessment
          </span>
        </div>

        <!-- Question Stem & Stimulus Box -->
        <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 5px 8px; background: #ffffff; margin-bottom: 5px;">
          <div style="font-family: 'Playfair Display', serif; font-size: 9.2pt; font-weight: 800; color: #000000; margin-bottom: 4px; line-height: 1.28;">
            ${cfg.examStem}
          </div>
          <div style="display: flex; align-items: center; gap: 8px; font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #000000;">
            <strong>Stimulus:</strong>
            <span style="border: 1px solid #000000; padding: 1px 6px; border-radius: 2px; font-weight: 700;">${cfg.stimulus[0]}</span>
            <span style="border: 1px solid #000000; padding: 1px 6px; border-radius: 2px; font-weight: 700;">${cfg.stimulus[1]}</span>
            <span style="font-style: italic; color: #333333;">(You must also use information of your own)</span>
          </div>
        </div>

        <!-- Accessible Writing Frames & Key Vocabulary Bank (High-Legibility 8.2pt Font) -->
        <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 5px 8px; background: #ffffff; margin-bottom: 4px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
          <div>
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; text-transform: uppercase; display: block; margin-bottom: 2px; color: #000000;">Accessible Writing Frames:</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 8.2pt; font-style: italic; line-height: 1.32; display: block; color: #111111;">${cfg.connectives}</span>
          </div>
          <div>
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; text-transform: uppercase; display: block; margin-bottom: 2px; color: #000000;">Key Vocabulary Bank:</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 8.2pt; line-height: 1.32; display: block; color: #111111;">${cfg.wordBank}</span>
          </div>
        </div>

        <!-- Ruled Task Lines Prompt -->
        <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-style: italic; color: #222222; margin: 2px 0 2px 0; display: flex; justify-content: space-between;">
          <span><strong>Write your response in the space provided below:</strong></span>
          <span style="font-size: 7.0pt; color: #555555; font-weight: 600;">(Response continues on facing page)</span>
        </div>
      </div>

      <!-- 26 Ruled Task Lines for Extended Writing (Full Height to Timeline Mission) -->
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0; margin: 1px 0 3px 0;">
${part1TaskLines}
      </div>

      <!-- Timeline Mission -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 4px 8px; background: #ffffff; display: flex; justify-content: space-between; align-items: center; margin-top: 2px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; background: #000000; color: #ffffff; padding: 2px 6px; border-radius: 2px; text-transform: uppercase; white-space: nowrap;">
            Timeline Mission
          </span>
          <span style="font-family: 'Georgia', serif; font-size: 7.4pt; line-height: 1.25; color: #000000;">
            ${cfg.timelineMission}
          </span>
        </div>
        <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 2px 6px; font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 800; white-space: nowrap;">
          [ &nbsp;&nbsp; ] Done
        </div>
      </div>

      ${renderFooterStrip(questionPart1PageNum, cfg.rightPageQuip, 20)}
    </div>
  </div>
`;

    // PAGE 3 OF ENQUIRY: EXAM QUESTION PART 2 (23 CONTINUATION LINES + QUESTION 3 [4 MARKS] AT BOTTOM)
    const part2ContinuationLines = Array.from(
      { length: 23 },
      () => '<div class="task-line-flex"></div>',
    ).join('');

    const q3TaskLines = Array.from(
      { length: 6 },
      () => '<div class="task-line" style="height: 7.8mm;"></div>',
    ).join('');

    html += `
  <div class="page page-container verso-page" id="page-${questionPart2PageNum}">
    <div class="page-body-full" style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
      <div>
        <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 4px;">
          <h2 style="font-family: 'Playfair Display', serif; font-size: 10.5pt; color: #000000; margin: 0; font-weight: 800;">
            ${cfg.title}
          </h2>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
            ${cfg.tariff.split(':')[0]} Continued
          </span>
        </div>

        <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-style: italic; color: #333333; margin-bottom: 2px;">
          Continue your response to ${cfg.tariff.split(':')[0]} below:
        </div>
      </div>

      <!-- 23 Continuation Lines (Full Height to Question 3) -->
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0; margin: 1px 0 4px 0;">
        ${part2ContinuationLines}
      </div>

      <!-- Question 3: Similarity / Difference [4 marks] At Bottom of Page -->
      <div style="border-top: 2px solid #000000; padding-top: 4px; margin-top: 2px; display: flex; flex-direction: column;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; text-transform: uppercase; letter-spacing: 0.5px;">
            &bull; Question 3: Explain One ${cfg.fourMark.type} [4 marks]
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px; text-transform: uppercase;">
            Score: [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 4 ] &bull; 5 Mins
          </span>
        </div>
        <p style="font-family: 'Playfair Display', serif; font-size: 8.8pt; font-weight: 800; color: #000000; margin: 0 0 2px 0; line-height: 1.25;">
          ${cfg.fourMark.question}
        </p>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-style: italic; color: #475569; margin-bottom: 2px;">
          ${cfg.fourMark.hint}
        </div>
        <div style="display: flex; flex-direction: column; margin: 1px 0 0 0;">
          ${q3TaskLines}
        </div>
      </div>

      ${renderFooterStrip(questionPart2PageNum, cfg.linedRightQuip, 20)}
    </div>
  </div>
`;
  });

  // ====================================================================
  // PAGE 19: DEDICATED BRITISH EXERCISE NOTES & REVISION STRATEGY PAGE
  // ====================================================================
  html += renderNotesPage(
    19,
    'Notes: Record key causal links, essay plans, and teacher feedback for this unit.',
    20,
  );

  // ====================================================================
  // PAGE 20: OUTSIDE BACK COVER
  // ====================================================================
  html += `
  <div class="page page-container verso-page" id="page-20" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Top Departmental Branding -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #0f284e; padding-bottom: 3px;">
        <div data-department-name="The History Department">
          <span style="font-family: 'Inter', sans-serif; font-size: 10pt; font-weight: 900; color: #0f284e; text-transform: uppercase; letter-spacing: 0.8px;">
            <span class="school-brand-target">The History Department</span>
          </span>
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 8.5pt; font-weight: 700; color: #0f284e;">
          KEY TOPIC 4 ASSESSMENT RECORD &bull; c1900–PRESENT
        </div>
      </div>

      <!-- Student Target Grade Strip -->
      <div style="border: 1.5px solid #0f284e; border-radius: 4px; padding: 6px 12px; background: #ffffff; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 16px; align-items: center; margin-bottom: 5px;">
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f284e; text-transform: uppercase; margin-right: 8px;">Pupil Name:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #0f284e; height: 14px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f284e; text-transform: uppercase; margin-right: 8px;">Target:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #0f284e; height: 14px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f284e; text-transform: uppercase; margin-right: 8px;">Current Grade:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #0f284e; height: 14px;"></div>
        </div>
      </div>

      <!-- Expanded Key Topic 4 Assessment Record Table (10 Questions + Cumulative Total) -->
      <div style="border: 1.5px solid #0f284e; border-radius: 4px; overflow: hidden; margin-bottom: 6px;">
        <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif;">
          <thead>
            <tr style="background: #0f284e; color: #ffffff; text-transform: uppercase; letter-spacing: 0.5px;">
              <th style="padding: 7px 6px; text-align: center; width: 8%; font-size: 7.8pt; font-weight: 800;">Enquiry</th>
              <th style="padding: 7px 10px; text-align: left; width: 36%; font-size: 7.8pt; font-weight: 800; border-left: 1px solid rgba(255,255,255,0.25);">Assessment Component Focus</th>
              <th style="padding: 7px 6px; text-align: center; width: 7%; font-size: 7.8pt; font-weight: 800; border-left: 1px solid rgba(255,255,255,0.25);">Page</th>
              <th style="padding: 7px 6px; text-align: center; width: 12%; font-size: 7.8pt; font-weight: 800; border-left: 1px solid rgba(255,255,255,0.25);">Score</th>
              <th style="padding: 7px 10px; text-align: left; width: 37%; font-size: 7.8pt; font-weight: 800; border-left: 1px solid rgba(255,255,255,0.25);">Teacher Comment &amp; Next Steps</th>
            </tr>
          </thead>
          <tbody>
            <!-- KT4.1: DNA & Genetics -->
            <tr style="border-bottom: 1px dashed #cbd5e1;">
              <td rowspan="2" style="padding: 12px 6px; text-align: center; font-weight: 900; font-size: 9.5pt; border-right: 1.2px solid #cbd5e1; background: #f0f4f9; color: #0f284e; vertical-align: middle;">
                KT4.1
              </td>
              <td style="padding: 13px 10px; font-weight: 600; line-height: 1.35; border-right: 1.2px solid #cbd5e1; font-size: 8.2pt; color: #0f284e;">
                <strong>Q4:</strong> Explain Why Rapid Progress in Causes c1950–Present
              </td>
              <td style="padding: 13px 6px; text-align: center; font-weight: 800; font-size: 8.5pt; border-right: 1.2px solid #cbd5e1; white-space: nowrap; color: #0f284e;">
                p. 5–6
              </td>
              <td style="padding: 13px 6px; text-align: center; font-size: 10pt; font-weight: 900; border-right: 1.2px solid #cbd5e1; white-space: nowrap; color: #0f284e;">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 12
              </td>
              <td rowspan="2" style="padding: 10px 10px; vertical-align: middle; font-size: 8pt; background: #ffffff;">
                <div style="display: flex; flex-direction: column; justify-content: space-around; height: 20.5mm;">
                  <div style="border-bottom: 1px dotted #cbd5e1; height: 6.8mm;"></div>
                  <div style="border-bottom: 1px dotted #cbd5e1; height: 6.8mm;"></div>
                  <div style="border-bottom: 1px dotted #cbd5e1; height: 6.8mm;"></div>
                </div>
              </td>
            </tr>
            <tr style="border-bottom: 1.5px solid #0f284e;">
              <td style="padding: 13px 10px; font-weight: 600; line-height: 1.35; border-right: 1.2px solid #cbd5e1; font-size: 8.2pt; color: #0f284e;">
                <strong>Q3:</strong> Explain One Difference (Investigating Causes: 1880s vs 1990s)
              </td>
              <td style="padding: 13px 6px; text-align: center; font-weight: 800; font-size: 8.5pt; border-right: 1.2px solid #cbd5e1; white-space: nowrap; color: #0f284e;">
                p. 6
              </td>
              <td style="padding: 13px 6px; text-align: center; font-size: 10pt; font-weight: 900; border-right: 1.2px solid #cbd5e1; white-space: nowrap; color: #0f284e;">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 4
              </td>
            </tr>

            <!-- KT4.2: Lifestyle & Diagnosis -->
            <tr style="border-bottom: 1px dashed #cbd5e1;">
              <td rowspan="2" style="padding: 12px 6px; text-align: center; font-weight: 900; font-size: 9.5pt; border-right: 1.2px solid #cbd5e1; background: #f0f4f9; color: #0f284e; vertical-align: middle;">
                KT4.2
              </td>
              <td style="padding: 13px 10px; font-weight: 600; line-height: 1.35; border-right: 1.2px solid #cbd5e1; font-size: 8.2pt; color: #0f284e;">
                <strong>Q5/6:</strong> Evaluative Essay on Diagnostic Scanners vs Lifestyle Campaigns
              </td>
              <td style="padding: 13px 6px; text-align: center; font-weight: 800; font-size: 8.5pt; border-right: 1.2px solid #cbd5e1; white-space: nowrap; color: #0f284e;">
                p. 8–9
              </td>
              <td style="padding: 13px 6px; text-align: center; font-size: 10pt; font-weight: 900; border-right: 1.2px solid #cbd5e1; white-space: nowrap; color: #0f284e;">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 20
              </td>
              <td rowspan="2" style="padding: 10px 10px; vertical-align: middle; font-size: 8pt; background: #ffffff;">
                <div style="display: flex; flex-direction: column; justify-content: space-around; height: 20.5mm;">
                  <div style="border-bottom: 1px dotted #cbd5e1; height: 6.8mm;"></div>
                  <div style="border-bottom: 1px dotted #cbd5e1; height: 6.8mm;"></div>
                  <div style="border-bottom: 1px dotted #cbd5e1; height: 6.8mm;"></div>
                </div>
              </td>
            </tr>
            <tr style="border-bottom: 1.5px solid #0f284e;">
              <td style="padding: 13px 10px; font-weight: 600; line-height: 1.35; border-right: 1.2px solid #cbd5e1; font-size: 8.2pt; color: #0f284e;">
                <strong>Q3:</strong> Explain One Difference (Diagnostic Methods: 19th c vs Late 20th c)
              </td>
              <td style="padding: 13px 6px; text-align: center; font-weight: 800; font-size: 8.5pt; border-right: 1.2px solid #cbd5e1; white-space: nowrap; color: #0f284e;">
                p. 9
              </td>
              <td style="padding: 13px 6px; text-align: center; font-size: 10pt; font-weight: 900; border-right: 1.2px solid #cbd5e1; white-space: nowrap; color: #0f284e;">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 4
              </td>
            </tr>

            <!-- KT4.3: Magic Bullets & The NHS -->
            <tr style="border-bottom: 1px dashed #cbd5e1;">
              <td rowspan="2" style="padding: 12px 6px; text-align: center; font-weight: 900; font-size: 9.5pt; border-right: 1.2px solid #cbd5e1; background: #f0f4f9; color: #0f284e; vertical-align: middle;">
                KT4.3
              </td>
              <td style="padding: 13px 10px; font-weight: 600; line-height: 1.35; border-right: 1.2px solid #cbd5e1; font-size: 8.2pt; color: #0f284e;">
                <strong>Q5/6:</strong> Evaluative Essay on the NHS as a Medical Turning Point (1948)
              </td>
              <td style="padding: 13px 6px; text-align: center; font-weight: 800; font-size: 8.5pt; border-right: 1.2px solid #cbd5e1; white-space: nowrap; color: #0f284e;">
                p. 11–12
              </td>
              <td style="padding: 13px 6px; text-align: center; font-size: 10pt; font-weight: 900; border-right: 1.2px solid #cbd5e1; white-space: nowrap; color: #0f284e;">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 20
              </td>
              <td rowspan="2" style="padding: 10px 10px; vertical-align: middle; font-size: 8pt; background: #ffffff;">
                <div style="display: flex; flex-direction: column; justify-content: space-around; height: 20.5mm;">
                  <div style="border-bottom: 1px dotted #cbd5e1; height: 6.8mm;"></div>
                  <div style="border-bottom: 1px dotted #cbd5e1; height: 6.8mm;"></div>
                  <div style="border-bottom: 1px dotted #cbd5e1; height: 6.8mm;"></div>
                </div>
              </td>
            </tr>
            <tr style="border-bottom: 1.5px solid #0f284e;">
              <td style="padding: 13px 10px; font-weight: 600; line-height: 1.35; border-right: 1.2px solid #cbd5e1; font-size: 8.2pt; color: #0f284e;">
                <strong>Q3:</strong> Explain One Difference (Healthcare Access: 1930s vs Post-1948)
              </td>
              <td style="padding: 13px 6px; text-align: center; font-weight: 800; font-size: 8.5pt; border-right: 1.2px solid #cbd5e1; white-space: nowrap; color: #0f284e;">
                p. 12
              </td>
              <td style="padding: 13px 6px; text-align: center; font-size: 10pt; font-weight: 900; border-right: 1.2px solid #cbd5e1; white-space: nowrap; color: #0f284e;">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 4
              </td>
            </tr>

            <!-- KT4.4: Penicillin Case Study -->
            <tr style="border-bottom: 1px dashed #cbd5e1;">
              <td rowspan="2" style="padding: 12px 6px; text-align: center; font-weight: 900; font-size: 9.5pt; border-right: 1.2px solid #cbd5e1; background: #f0f4f9; color: #0f284e; vertical-align: middle;">
                KT4.4
              </td>
              <td style="padding: 13px 10px; font-weight: 600; line-height: 1.35; border-right: 1.2px solid #cbd5e1; font-size: 8.2pt; color: #0f284e;">
                <strong>Q4:</strong> Explain Why Penicillin was Mass-Produced (1928–1945)
              </td>
              <td style="padding: 13px 6px; text-align: center; font-weight: 800; font-size: 8.5pt; border-right: 1.2px solid #cbd5e1; white-space: nowrap; color: #0f284e;">
                p. 14–15
              </td>
              <td style="padding: 13px 6px; text-align: center; font-size: 10pt; font-weight: 900; border-right: 1.2px solid #cbd5e1; white-space: nowrap; color: #0f284e;">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 12
              </td>
              <td rowspan="2" style="padding: 10px 10px; vertical-align: middle; font-size: 8pt; background: #ffffff;">
                <div style="display: flex; flex-direction: column; justify-content: space-around; height: 20.5mm;">
                  <div style="border-bottom: 1px dotted #cbd5e1; height: 6.8mm;"></div>
                  <div style="border-bottom: 1px dotted #cbd5e1; height: 6.8mm;"></div>
                  <div style="border-bottom: 1px dotted #cbd5e1; height: 6.8mm;"></div>
                </div>
              </td>
            </tr>
            <tr style="border-bottom: 1.5px solid #0f284e;">
              <td style="padding: 13px 10px; font-weight: 600; line-height: 1.35; border-right: 1.2px solid #cbd5e1; font-size: 8.2pt; color: #0f284e;">
                <strong>Q3:</strong> Explain One Similarity (Fleming 1928 vs Jenner 1796)
              </td>
              <td style="padding: 13px 6px; text-align: center; font-weight: 800; font-size: 8.5pt; border-right: 1.2px solid #cbd5e1; white-space: nowrap; color: #0f284e;">
                p. 15
              </td>
              <td style="padding: 13px 6px; text-align: center; font-size: 10pt; font-weight: 900; border-right: 1.2px solid #cbd5e1; white-space: nowrap; color: #0f284e;">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 4
              </td>
            </tr>

            <!-- KT4.5: Lung Cancer Case Study -->
            <tr style="border-bottom: 1px dashed #cbd5e1;">
              <td rowspan="2" style="padding: 12px 6px; text-align: center; font-weight: 900; font-size: 9.5pt; border-right: 1.2px solid #cbd5e1; background: #f0f4f9; color: #0f284e; vertical-align: middle;">
                KT4.5
              </td>
              <td style="padding: 13px 10px; font-weight: 600; line-height: 1.35; border-right: 1.2px solid #cbd5e1; font-size: 8.2pt; color: #0f284e;">
                <strong>Q5/6:</strong> Evaluative Essay on Government Action &amp; Lung Cancer
              </td>
              <td style="padding: 13px 6px; text-align: center; font-weight: 800; font-size: 8.5pt; border-right: 1.2px solid #cbd5e1; white-space: nowrap; color: #0f284e;">
                p. 17–18
              </td>
              <td style="padding: 13px 6px; text-align: center; font-size: 10pt; font-weight: 900; border-right: 1.2px solid #cbd5e1; white-space: nowrap; color: #0f284e;">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 20
              </td>
              <td rowspan="2" style="padding: 10px 10px; vertical-align: middle; font-size: 8pt; background: #ffffff;">
                <div style="display: flex; flex-direction: column; justify-content: space-around; height: 20.5mm;">
                  <div style="border-bottom: 1px dotted #cbd5e1; height: 6.8mm;"></div>
                  <div style="border-bottom: 1px dotted #cbd5e1; height: 6.8mm;"></div>
                  <div style="border-bottom: 1px dotted #cbd5e1; height: 6.8mm;"></div>
                </div>
              </td>
            </tr>
            <tr style="border-bottom: 1.5px solid #0f284e;">
              <td style="padding: 13px 10px; font-weight: 600; line-height: 1.35; border-right: 1.2px solid #cbd5e1; font-size: 8.2pt; color: #0f284e;">
                <strong>Q3:</strong> Explain One Similarity (Anti-Smoking Laws vs 1875 Public Health Act)
              </td>
              <td style="padding: 13px 6px; text-align: center; font-weight: 800; font-size: 8.5pt; border-right: 1.2px solid #cbd5e1; white-space: nowrap; color: #0f284e;">
                p. 18
              </td>
              <td style="padding: 13px 6px; text-align: center; font-size: 10pt; font-weight: 900; border-right: 1.2px solid #cbd5e1; white-space: nowrap; color: #0f284e;">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 4
              </td>
            </tr>

            <!-- Total Row -->
            <tr style="background: #f0f4f9; border-top: 2px solid #0f284e;">
              <td style="padding: 12px 6px; text-align: center; font-weight: 900; font-size: 8.5pt; border-right: 1.2px solid #cbd5e1; background: #0f284e; color: #ffffff;">
                TOTAL
              </td>
              <td style="padding: 12px 10px; font-weight: 800; font-size: 8.5pt; border-right: 1.2px solid #cbd5e1; color: #0f284e;">
                Key Topic 4 Cumulative Examination Assessment Portfolio (10 Tasks)
              </td>
              <td style="padding: 12px 6px; text-align: center; font-weight: 800; font-size: 8.5pt; border-right: 1.2px solid #cbd5e1; color: #0f284e;">
                p. 4–18
              </td>
              <td style="padding: 12px 6px; text-align: center; font-size: 11pt; font-weight: 900; border-right: 1.2px solid #cbd5e1; white-space: nowrap; color: #0f284e;">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 104
              </td>
              <td style="padding: 12px 10px; font-weight: 800; font-size: 8.5pt; background: #f0f4f9; color: #0f284e;">
                <div style="display: flex; justify-content: space-between; align-items: baseline;">
                  <span>Overall Grade: <span style="display: inline-block; width: 45px; border-bottom: 1.5px solid #0f284e;"></span></span>
                  <span style="font-size: 7.5pt; color: #475569;">Teacher Target: <span style="display: inline-block; width: 40px; border-bottom: 1px solid #475569;"></span></span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 5 Verified Micro-QR Codes with Dual QR (Lesson + Quiz) -->
      <div style="border: 1.5px solid #0f284e; border-radius: 4px; padding: 7px 6px; background: #f0f4f9;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.5pt; text-transform: uppercase; letter-spacing: 0.5px; color: #0f284e;">
            &bull; Digital Learning &amp; Retrieval Hub &bull; Interactive Lessons &amp; Quizzes
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; color: #475569;">
            Interactive Textbook &bull; 10 Questions Per Enquiry
          </span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px;">
          ${modernConfigs
            .map((cfg, idx) => {
              const lessonUrl = `https://the-history-revision-hub.netlify.app/?unit=edexcel_medicine&lesson=${cfg.id}&view=lessons`;
              const quizUrl = `https://the-history-revision-hub.netlify.app/?unit=edexcel_medicine&lesson=${cfg.id}&quiz=true`;
              const lessonQrSvg = generateQrSvg(lessonUrl);
              const quizQrSvg = generateQrSvg(quizUrl);
              const shortLabels = [
                'DNA & Genetics',
                'Lifestyle & Scans',
                'Magic Bullets & NHS',
                'Penicillin Study',
                'Lung Cancer Study',
              ];
              return `
          <div style="border: 1.2px solid #0f284e; border-radius: 3px; padding: 4px 3px; background: #ffffff; display: flex; flex-direction: column; align-items: center; justify-content: space-between;">
            <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 900; text-transform: uppercase; margin-bottom: 1px; color: #0f284e;">
              KT4.${cfg.lessonNum}
            </div>
            <div style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 700; color: #475569; margin-bottom: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%;">
              ${shortLabels[idx]}
            </div>

            <!-- Top QR: Interactive Lesson Hub -->
            <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 4px; width: 100%;">
              <div style="width: 17.5mm; height: 17.5mm; margin: 0 auto 1px auto;">
                ${lessonQrSvg}
              </div>
              <span style="font-family: 'Inter', sans-serif; font-size: 5.6pt; font-weight: 800; text-transform: uppercase; background: #0f284e; color: #ffffff; padding: 1.5px 4px; border-radius: 2px; letter-spacing: 0.2px; white-space: nowrap;">
                Lesson Hub
              </span>
            </div>

            <!-- Bottom QR: Practice Quiz -->
            <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 3px; width: 100%;">
              <div style="width: 17.5mm; height: 17.5mm; margin: 0 auto 1px auto;">
                ${quizQrSvg}
              </div>
              <span style="font-family: 'Inter', sans-serif; font-size: 5.6pt; font-weight: 800; text-transform: uppercase; background: #0f284e; color: #ffffff; padding: 1.5px 4px; border-radius: 2px; letter-spacing: 0.2px; white-space: nowrap;">
                Practice Quiz
              </span>
            </div>

            <div style="font-family: 'Inter', sans-serif; font-size: 8.2pt; font-weight: 900; color: #0f284e; margin-top: 2px; white-space: nowrap; border: 1px solid #0f284e; border-radius: 2px; padding: 1px 3px; background: #f0f4f9;">
              Score: [ &nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 10</strong> ]
            </div>
          </div>
          `;
            })
            .join('')}
        </div>
      </div>

      ${renderFooterStrip(20, 'From DNA to the NHS, state action and laboratory science revolutionized healthcare; revision guarantees your GCSE success.', 20)}
    </div>
  </div>
</body>
</html>
`;

  return html;
}

async function main() {
  console.log(
    'Rendering 20-Page A4 Pupil Workbook (Dual QR & Assessment Portfolio): Key Topic 4: Modern Britain (c1900–present)...',
  );
  const puppeteer = require('puppeteer');
  const customHtml = buildModernTwoPageWorkbook({}, {});

  const unitDir = path.resolve(__dirname, '../units/edexcel_medicine');
  const publicUnitDir = path.resolve(__dirname, '../public/units/edexcel_medicine');
  const pdfsDir = path.resolve(__dirname, '../public/pdfs');

  const unitHtmlPath = path.join(unitDir, 'pupil_workbook_modern.html');
  const pubHtmlPath = path.join(publicUnitDir, 'pupil_workbook_modern.html');
  const outPdfPath = path.join(pdfsDir, 'edexcel_medicine_pupil_workbook_modern_FINAL_V17.pdf');
  const pubPdfCopy = path.join(publicUnitDir, 'pupil_workbook_modern.pdf');

  fs.writeFileSync(unitHtmlPath, customHtml, 'utf8');
  fs.writeFileSync(pubHtmlPath, customHtml, 'utf8');
  console.log(`[OK] HTML written to: ${pubHtmlPath}`);

  console.log('Launching Puppeteer to generate high-resolution print PDF...');
  const chromePath =
    process.env.PUPPETEER_EXECUTABLE_PATH ||
    (fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
      ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
      : undefined);

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: chromePath,
    args: ['--allow-file-access-from-files', '--disable-web-security', '--no-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });
  await page.setContent(customHtml, { waitUntil: 'networkidle0', timeout: 60000 });

  await page.pdf({
    path: outPdfPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0mm',
      bottom: '0mm',
      left: '0mm',
      right: '0mm',
    },
  });

  await browser.close();
  console.log(`[OK] PDF successfully compiled: ${outPdfPath}`);

  fs.copyFileSync(outPdfPath, pubPdfCopy);
  console.log(`[OK] PDF copy written: ${pubPdfCopy}`);

  const outPdfStandardPath = path.join(pdfsDir, 'edexcel_medicine_pupil_workbook_modern.pdf');
  fs.copyFileSync(outPdfPath, outPdfStandardPath);
  console.log(`[OK] PDF standard copy written: ${outPdfStandardPath}`);
}

if (require.main === module) {
  main().catch((err) => {
    console.error('❌ Error compiling Modern Medicine workbook:', err);
    process.exit(1);
  });
}

module.exports = {
  buildModernTwoPageWorkbook,
  modernConfigs,
};
