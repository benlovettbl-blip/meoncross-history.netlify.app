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

function renderFooterStrip(pageNum, quip, totalPages = 24) {
  return `
      <div class="page-footer-strip">
        <span class="footer-page-num" style="margin-right: 8px;">${pageNum}/${totalPages}</span>
        <span class="footer-quip" style="text-align: right; flex: 1;">${quip}</span>
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
      '<em>Franklin’s 62-hour X-ray exposure revealed the double helix; Watson and Crick celebrated in The Eagle pub.</em>',
    rightPageQuip:
      '<em>Sequencing 3 billion base pairs in the human genome took 13 years; now geneticists can read our biological code.</em>',
    linedLeftQuip:
      '<em>X-ray crystallography transformed genetics from abstract heredity into precise molecular biology.</em>',
    rightPageLinedQuip:
      '<em>Evaluate both breakthroughs: explain how Photograph 51 provided the structural foundation for the Human Genome Project.</em>',
    stages: [
      {
        dates: 'c1900–1940s',
        title: 'Mendel & Early Genetics',
        bullets: [
          'Growing wrinkled green garden peas',
          'Spotting dark rod shapes inside cells',
          'Assuming heavy protein chains hold secrets',
        ],
        focusClue: 'Why did doctors assume proteins carried hereditary traits?',
      },
      {
        dates: '1951–1952',
        title: 'Franklin & Photograph 51',
        bullets: [
          'Beaming invisible rays through wet DNA fibers',
          'Exposing glass photographic plates for sixty hours',
          'Revealing clear fuzzy X-shaped shadow marks',
        ],
        focusClue: 'How did Photograph 51 prove DNA’s helical structure?',
      },
      {
        dates: '1953',
        title: 'Watson & Crick’s Model',
        bullets: [
          'Twisting thin metal wire into spirals',
          'Locking four chemical pairs like puzzle pieces',
          'Rushing to celebratory pints at The Eagle pub',
        ],
        focusClue: 'How did base pairing explain hereditary replication?',
      },
      {
        dates: '1990–2003',
        title: 'Human Genome Project',
        bullets: [
          'Linking laboratory supercomputers across six nations',
          'Reading three billion chemical letters in blood',
          'Publishing complete human code free online',
        ],
        focusClue: 'Why was mapping 3 billion base pairs a medical milestone?',
      },
      {
        dates: '2000s–Present',
        title: 'Screening & Treatment Gap',
        bullets: [
          'Testing saliva drops for faulty breast genes',
          'Matching targeted pills to personal body code',
          'Struggling to fix broken genetic code inside bodies',
        ],
        focusClue: 'Why did understanding causes outpace finding cures?',
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
      '<em>Bertha Röntgen cried "I have seen my death!" upon seeing her bones; doctors saw the dawn of non-invasive diagnosis.</em>',
    rightPageQuip:
      '<em>Hounsfield’s CT scanner combined rotating X-rays with digital computers to slice through soft body tissue.</em>',
    linedLeftQuip:
      '<em>From Wilhelm Röntgen’s 1895 X-ray to Godfrey Hounsfield’s 1971 CT scanner: imaging banished exploratory surgery.</em>',
    rightPageLinedQuip:
      '<em>Establish clear criteria: high-tech machines detect existing illness; public health campaigns prevent illness before it occurs.</em>',
    stages: [
      {
        dates: '1895–1918',
        title: 'Röntgen & Early X-Rays',
        bullets: [
          'Photographing wife Bertha’s hand and gold wedding ring',
          'Driving mobile medical vans to muddy trenches',
          'Finding jagged lead shrapnel without deep cuts',
        ],
        focusClue: 'How did X-rays transform surgical trauma diagnosis in WWI?',
      },
      {
        dates: '1930s–1960s',
        title: 'Blood Labs & Endoscopy',
        bullets: [
          'Spinning red test tubes in fast centrifuges',
          'Counting abnormal white cells on glass slides',
          'Sliding flexible glass cables down throat tubes',
        ],
        focusClue: 'Why was fiber-optic endoscopy superior to exploratory surgery?',
      },
      {
        dates: '1971–1980s',
        title: 'Hounsfield’s CT & MRI',
        bullets: [
          'Spinning heavy donut scanners around hospital beds',
          'Combining computer pictures into 3D body slices',
          'Using magnetic radio waves to find brain lumps',
        ],
        focusClue: 'Why did CT scans transform internal soft-tissue diagnosis?',
      },
      {
        dates: 'c1950–1980s',
        title: 'Epidemiological Shift',
        bullets: [
          'Banishing deadly childhood fevers with wonder drugs',
          'People living past seventy years of age',
          'Rising chest tumours and clogged heart arteries',
        ],
        focusClue: 'What drove the shift from infectious to lifestyle diseases?',
      },
      {
        dates: '1980s–Present',
        title: 'State Lifestyle Campaigns',
        bullets: [
          'Clicking compulsory car seatbelts across chests',
          'Extinguishing glowing cigarettes outside pub doors',
          'Taxing sugary fizzy cans and advertising fruit',
        ],
        focusClue: 'Why do governments favour lifestyle prevention over treatment?',
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
      '<em>Ehrlich tested 605 failed arsenic compounds before compound 606 finally cured syphilis in 1909.</em>',
    rightPageQuip:
      '<em>Bevan overcame doctor opposition by "stuffing their mouths with gold," launching the NHS on 5 July 1948.</em>',
    linedLeftQuip:
      '<em>Salvarsan 606 and Prontosil proved chemicals could destroy specific internal microbes without destroying the patient.</em>',
    rightPageLinedQuip:
      '<em>Weigh institutional reform against pharmacology: free healthcare means little without effective drugs to prescribe.</em>',
    stages: [
      {
        dates: '1906–1909',
        title: 'Ehrlich & Salvarsan 606',
        bullets: [
          'Testing hundreds of toxic yellow arsenic mixtures',
          'Hunting chemical bullets that only hit germs',
          'Curing deadly human syphilis with magic bullet',
        ],
        focusClue: 'Why was Salvarsan 606 termed the first "magic bullet"?',
      },
      {
        dates: '1932–1935',
        title: 'Domagk & Prontosil',
        bullets: [
          'Injecting bright red leather dye into mice',
          'Saving sick daughter from arm-amputation death',
          'Discovering active white sulfa medicine powder',
        ],
        focusClue: 'How did Prontosil prove synthetic drugs could kill microbes?',
      },
      {
        dates: '1942',
        title: 'The Beveridge Report',
        bullets: [
          'Listing Five Giants that crush poor workers',
          'Surviving Nazi air bombs with community spirit',
          'Demanding free medical care for every citizen',
        ],
        focusClue: 'How did WWII unity create momentum for state healthcare?',
      },
      {
        dates: '1945–1948',
        title: 'Bevan & Launch of the NHS',
        bullets: [
          'Offering private bed perks to stubborn doctors',
          'Delivering free spectacles and dentures to families',
          'Abolishing terrifying doctor bills forever',
        ],
        focusClue: 'How did Bevan compromise to persuade resistant doctors?',
      },
      {
        dates: '1950s–Present',
        title: 'High-Tech Care & Costs',
        bullets: [
          'Pumping blood through giant artificial kidney filters',
          'Replacing worn hip joints with metal balls',
          'Charging small fees for paper medicine slips',
        ],
        focusClue: 'Why has modern medical success created financial strain?',
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
      '<em>Fleming almost washed his petri dish in Lysol, but noticed a clear halo where mould destroyed golden staphylococci.</em>',
    rightPageQuip:
      '<em>The Oxford team grew penicillin in bedpans; American factories brewed it in 10,000-gallon fermentation vats.</em>',
    linedLeftQuip:
      '<em>Fleming observed penicillin in 1928; Florey and Chain purified it in 1940; US wartime industry mass-produced it in 1944.</em>',
    rightPageLinedQuip:
      '<em>Show how individual observation, scientific teamwork, wartime necessity, and US capital combined to create mass antibiotics.</em>',
    stages: [
      {
        dates: '1928–1929',
        title: 'Fleming’s Discovery',
        bullets: [
          'Finding fluffy mould on dirty glass dish',
          'Golden germs dissolving in clear circle halos',
          'Failing to separate fragile liquid juice',
        ],
        focusClue: 'Why could Fleming not turn mould into a clinical medicine?',
      },
      {
        dates: '1938–1940',
        title: 'Florey & Chain at Oxford',
        bullets: [
          'Brewing fungus inside hospital bedpans and milk churns',
          'Winning American dollar grants during air raids',
          'Freezing brown liquid into precious yellow crystals',
        ],
        focusClue: 'How did Norman Heatley solve the purification challenge?',
      },
      {
        dates: '1940–1941',
        title: 'Mice Trials & Albert Alexander',
        bullets: [
          'Infecting eight mice and keeping treated four alive',
          "Scraping rose thorn scratches on policeman's face",
          'Running out of drops before patient recovers',
        ],
        focusClue: 'Why was Alexander’s trial both a success and a tragedy?',
      },
      {
        dates: '1941–1944',
        title: 'Peoria & US Mass Production',
        bullets: [
          'Feeding corn beer wash to rotting melon mould',
          'Pumping sterile air through giant ten-thousand-gallon vats',
          'Brewing million doses for D-Day landing craft',
        ],
        focusClue: 'How did US industrial fermentation enable mass production?',
      },
      {
        dates: '1944–Present',
        title: 'D-Day & Superbugs',
        bullets: [
          "Spraying white powder directly into torn soldiers' limbs",
          'Three scientists sharing golden Nobel prize medal',
          'Overusing capsules creating tough hospital superbugs',
        ],
        focusClue: 'Why did Fleming warn that antibiotic overuse causes resistance?',
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
      '<em>Doll and Hill proved smoking caused lung cancer in 1950; Doll immediately extinguished his pipe and lived to age 92.</em>',
    rightPageQuip:
      '<em>From TV ad bans in 1965 to plain olive-green packs in 2016: government compulsion slashed smoking from 65% to 13%.</em>',
    linedLeftQuip:
      '<em>Doll and Hill’s statistical epidemiology gave the British government the empirical evidence to dismantle tobacco marketing.</em>',
    rightPageLinedQuip:
      '<em>Compare 1875 sewers with 2007 smoking bans: state compulsion consistently achieves greater public health impact than laissez-faire.</em>',
    stages: [
      {
        dates: '1920s–1950',
        title: 'The Mysterious Epidemic',
        bullets: [
          'Men coughing black blood into hospital basins',
          'Blaming smelly road tarmac and lorry exhaust fumes',
          'Colourful billboards showing smiling smoking doctors',
        ],
        focusClue: 'Why did early doctors fail to link smoking to lung cancer?',
      },
      {
        dates: '1950–1954',
        title: 'Doll & Hill’s Proof',
        bullets: [
          'Interviewing sick patients across twenty London wards',
          'Tracking forty thousand real family doctors over years',
          'Proving heavy smokers face fifty-times higher risk',
        ],
        focusClue: 'How did statistical epidemiology prove the causal link?',
      },
      {
        dates: '1962–1971',
        title: 'Royal College & Ad Bans',
        bullets: [
          'Banning glowing cigarette commercials on evening television',
          'Printing bold black warning text on cardboard cartons',
          'Sponsoring fast racing cars to keep brands famous',
        ],
        focusClue: 'Why did government action encounter strong tobacco lobbying?',
      },
      {
        dates: '2000s',
        title: 'Public Smoking Ban',
        bullets: [
          'Breathing toxic secondhand smoke in crowded rooms',
          'Padlocking pub ashtrays and stepping outside into cold',
          'Raising legal counter buying age to eighteen',
        ],
        focusClue: 'Why was passive smoking crucial in banning public smoking?',
      },
      {
        dates: '2010s–Present',
        title: 'Plain Packs & Oncology',
        bullets: [
          'Selling plain ugly mud-green packets with graphic photos',
          'Guiding tiny robotic camera pincers between chest ribs',
          'Boosting immune soldier cells to attack hidden tumours',
        ],
        focusClue: 'Why does low cancer survival prove prevention beats cure?',
      },
    ],
  },
];

function renderSpinePage(cfg) {
  const { pageNum, keyTopicBadge, enquiryQuestion, stages, leftPageQuip } = cfg;

  let stagesHtml = '';
  stages.forEach((st, idx) => {
    let bulletsHtml = st.bullets
      .map((b) => `<div><span style="font-weight: 900; color: #000000;">&bull;</span> ${b}</div>`)
      .join('\n');
    stagesHtml += `
          <!-- Stage ${idx + 1} -->
          <div class="spine-stage-row" style="display: flex; flex: 1; min-height: 0; align-items: stretch; margin: 0;">
            <div style="width: 38mm; flex-shrink: 0; border-left: 2.5px solid #000000; padding: 0 3px 0 5px; display: flex; flex-direction: column; justify-content: center; position: relative;">
              <div style="position: absolute; left: -5.5px; top: 50%; transform: translateY(-50%); width: 8px; height: 8px; background: #000000; border-radius: 50%;"></div>
              <div style="display: flex; align-items: center; gap: 3px; margin-bottom: 1px;">
                <span style="background: #000000; color: #ffffff; font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 900; padding: 0.5px 3.5px; border-radius: 2px;">${idx + 1}</span>
                <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; color: #000000;">${st.dates}</span>
              </div>
              <div style="font-family: 'Playfair Display', serif; font-size: 7.2pt; font-weight: 800; color: #000000; line-height: 1.1; margin-bottom: 2px;">
                ${st.title}
              </div>
              <div style="margin-top: 1px;">
                <div style="display: flex; flex-direction: column; gap: 0.5px; font-family: 'Inter', sans-serif; font-size: 6.3pt; line-height: 1.15; color: #111111;">
                  ${bulletsHtml}
                </div>
              </div>
              <div style="margin-top: 2.5px; border: 1px dashed #000000; background: #f8fafc; padding: 1.5px 3px; border-radius: 2px;">
                <div style="font-family: 'Inter', sans-serif; font-size: 5.2pt; font-weight: 900; text-transform: uppercase; color: #000000; line-height: 1; margin-bottom: 1px;">
                  Focus Clue
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 5.8pt; line-height: 1.15; color: #222222; font-style: italic;">
                  ${st.focusClue}
                </div>
              </div>
            </div>

            <!-- Ruled Lines (6 Lines per stage • 30 lines total) -->
            <div style="flex: 1; display: flex; flex-direction: column; border-left: 1px solid #cbd5e1; margin: 0; padding: 0;">
              <div style="flex: 1; min-height: 0; border-bottom: 1.5px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.5px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.5px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.5px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.5px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.5px solid #000000; box-sizing: border-box;"></div>
            </div>
          </div>`;
  });

  return `
  <!-- ------------------------------------------------------------------ -->
  <!-- LESSON ENQUIRY NOTEBOOK WITH CHRONOLOGICAL SPINE (PAGE ${pageNum})         -->
  <!-- ------------------------------------------------------------------ -->
  <div class="page page-container" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Lesson Header with Inquiry Question Title -->
      <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 2px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; letter-spacing: 0.5px; text-transform: uppercase; border: 1.2px solid #000000; padding: 1px 6px; border-radius: 2px;">
            ${keyTopicBadge} &bull; ENQUIRY LESSON NOTEBOOK
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-transform: uppercase; color: #000000;">
            EDEXCEL PAPER 1 (1HI0/11) &bull; THEMATIC STUDY
          </span>
        </div>
        <h2 style="font-family: 'Playfair Display', serif; font-size: 11.5pt; color: #000000; margin: 1px 0 1px 0; font-weight: 900; line-height: 1.18;">
          ${enquiryQuestion}
        </h2>
      </div>

      <!-- Active Lesson Note-Taking Spine -->
      <div style="flex: 1; display: flex; flex-direction: column; margin-top: 1px; min-height: 0;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid #000000; padding: 1px 0; margin-bottom: 2px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px;">
            Chronological Inquiry Spine &bull; Core Causal Narrative
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-style: italic; color: #444444;">
            Take precise, structured notes alongside each milestone as your teacher narrates the history
          </span>
        </div>

        <!-- 5 Chronological Stages with Spine on Left and Ruled Lines on Right -->
        <div style="display: flex; flex-direction: column; flex: 1; min-height: 0; gap: 0;">
${stagesHtml}
        </div>
      </div>

      <div class="page-footer-strip">
        <span class="footer-page-num" style="margin-right: 8px;">${pageNum}/24</span>
        <span class="footer-quip" style="text-align: right; flex: 1;">${leftPageQuip}</span>
      </div>
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
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
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
    .ruled-lines-block {
      display: flex;
      flex-direction: column;
      gap: 0;
      margin: 1px 0;
    }
    .lined-page-grid {
      display: flex;
      flex-direction: column;
      flex: 1;
      margin: 2px 0 3px 0;
      border-top: 1.2px solid #000000;
    }
    .lined-row {
      display: flex;
      flex: 1;
      min-height: 0;
      border-bottom: 1.2px solid #000000;
      box-sizing: border-box;
    }
    .lined-margin-cell {
      width: 12mm;
      border-right: 1.2px solid #000000;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      padding-left: 1mm;
      padding-right: 0.5mm;
      box-sizing: border-box;
    }
    .lined-content-cell {
      flex: 1;
      display: flex;
      align-items: center;
      padding-left: 6px;
      box-sizing: border-box;
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
  <div class="page page-container" id="page-1" style="padding: 4mm 6mm;">
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
          KEY TOPIC 4 &bull; REVISION &amp; PRACTICE COMPANION
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
      title: 'Karl Landsteiner: ABO Blood Groups Discovered',
      kt: 'Key Topic 4.1',
      desc: 'Landsteiner identifies A, B, and O blood groups, proving agglutination occurs when incompatible blood types mix. This discovery transforms blood transfusions from fatal gambles into safe, predictable surgical lifelines, foundational for modern trauma surgery.',
    },
    {
      year: '1909',
      title: 'Paul Ehrlich & Sahachiro Hata: Salvarsan 606',
      kt: 'Key Topic 4.1',
      desc: 'Building on dye research, Ehrlich and Hata systematically test hundreds of arsenic compounds, discovering arsphenamine (compound 606). Humanity’s first synthetic chemical ‘magic bullet’ targets syphilis bacteria without poisoning human tissue.',
    },
    {
      year: '1928',
      title: 'Alexander Fleming: Accidental Discovery of Penicillin',
      kt: 'Key Topic 4.2',
      desc: 'Returning from holiday, Fleming notices a contaminated staphylococcus culture dish with a halo of destroyed bacteria around Penicillium notatum mould. Fleming publishes in 1929, though unable to purify or extract enough active substance for clinical trials.',
    },
    {
      year: '1932',
      title: 'Gerhard Domagk: Prontosil & Sulfonamide Drugs',
      kt: 'Key Topic 4.1',
      desc: 'Domagk demonstrates that the red leather dye Prontosil cures streptococcal blood poisoning in mice (and saves his own daughter’s arm). Chemists isolate the active ingredient sulfonamide, launching the world’s first mass-prescribed class of antibacterial wonder drugs.',
    },
  ];

  const timelineMilestonesRight = [
    {
      year: '1941–44',
      title: 'Florey, Chain & Heatley: Penicillin Mass Production',
      kt: 'Key Topic 4.2',
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
      kt: 'Key Topic 4.4',
      desc: 'Using Rosalind Franklin and Maurice Wilkins’s X-ray crystallography (Photograph 51), Watson and Crick deduce the double-helix structure of DNA at Cambridge, unlocking hereditary genetic code and modern molecular gene therapy.',
    },
    {
      year: '1971–2003',
      title: 'CT Scanners (1971) & The Human Genome Project (2003)',
      kt: 'Key Topic 4.4 &bull; 4.5',
      desc: 'Godfrey Hounsfield invents the EMI CT scanner, combining computer algorithms with X-rays to image internal organs without surgery. In 2003, the international Human Genome Project maps all 3 billion chemical base pairs in human DNA, founding precision medicine.',
    },
  ];

  // PAGE 2 (Timeline Verso: 1900–1940)
  html += `
  <div class="page page-container" id="page-2" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div>
        <div style="border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 6px;">
          <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 11pt; color: #000000; text-transform: uppercase; font-weight: 800;">
            Living Timeline &bull; Part 1: Magic Bullets, Blood Groups &amp; Early Antibiotics (1900–1940)
          </h2>
        </div>

        <div style="border-bottom: 1px solid #000000; padding-bottom: 4px; margin-bottom: 8px; font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #000000;">
          <strong>Instructions:</strong> Complete the timeline sketches and notes as you master each enquiry lesson.
        </div>
      </div>

      <!-- 4 Milestones with Large Blank Drawing/Notes Area (Calibrated for 0px overflow) -->
      <div style="display: flex; flex-direction: column; gap: 6px; flex: 1; justify-content: space-between;">
        ${timelineMilestonesLeft
          .map(
            (m) => `
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #000000;">
                ${m.year} &bull; ${m.title}
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">${m.kt}</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.22;">
              ${m.desc}
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 38mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>
        `,
          )
          .join('')}
      </div>

      ${renderFooterStrip(2, 'The 20th century transformed pharmacology from toxic general poisons into targeted magic bullets.')}
    </div>
  </div>
`;

  // PAGE 3 (Timeline Recto: 1940–present)
  html += `
  <div class="page page-container" id="page-3" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div>
        <div style="border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 6px;">
          <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 11pt; color: #000000; text-transform: uppercase; font-weight: 800;">
            Living Timeline &bull; Part 2: Mass Antibiotics, The NHS, DNA &amp; Oncology (1940–present)
          </h2>
        </div>

        <div style="border-bottom: 1px solid #000000; padding-bottom: 4px; margin-bottom: 8px; font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #000000;">
          <strong>Instructions:</strong> Complete the timeline sketches and notes as you master each enquiry lesson.
        </div>
      </div>

      <!-- 4 Milestones with Large Blank Drawing/Notes Area (Calibrated for 0px overflow) -->
      <div style="display: flex; flex-direction: column; gap: 6px; flex: 1; justify-content: space-between;">
        ${timelineMilestonesRight
          .map(
            (m) => `
        <div style="border: 1.2px solid #000000; border-radius: 4px; padding: 4px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #000000;">
                ${m.year} &bull; ${m.title}
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px;">${m.kt}</span>
            </div>
            <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #000000; margin: 0 0 3px 0; line-height: 1.22;">
              ${m.desc}
            </p>
          </div>
          <div style="border-top: 1px dashed #000000; min-height: 38mm; flex: 1; background: #ffffff; margin-top: 2px;"></div>
        </div>
        `,
          )
          .join('')}
      </div>

      ${renderFooterStrip(3, 'From the birth of the NHS to the sequencing of the human genome, state action and high-tech science transformed health.')}
    </div>
  </div>
`;

  // ====================================================================
  // PAGES 4–23: 5 DEDICATED 4-PAGE MODULES (LESSONS 4.1 TO 4.5)
  // Page 1: 5-Stage Chronological Inquiry Spine (renderSpinePage)
  // Page 2: Exam Question + 28 flex task lines + Timeline Mission
  // Page 3: Lined Grid (31 lines, 8.0mm pitch, full width)
  // Page 4: Lined Grid (24 lines) + Question 3 [4 marks] (6 lines)
  // ====================================================================
  modernConfigs.forEach((cfg) => {
    const leftPageNum = (cfg.lessonNum - 1) * 4 + 4;
    const rightPageNum = (cfg.lessonNum - 1) * 4 + 5;
    const linedLeftPageNum = (cfg.lessonNum - 1) * 4 + 6;
    const linedRightPageNum = (cfg.lessonNum - 1) * 4 + 7;

    // PAGE 1 OF MODULE: CHRONOLOGICAL INQUIRY SPINE
    html += renderSpinePage({ ...cfg, pageNum: leftPageNum });

    // PAGE 2 OF MODULE: EXAM QUESTION (STEM, STIMULUS, 22 FLEX TASK LINES, TIMELINE MISSION)
    const flexTaskLines = Array.from(
      { length: 22 },
      () => `
        <div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>`,
    ).join('');

    html += `
  <div class="page page-container" id="page-${rightPageNum}">
    <div class="page-body-full">
      <div>
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

        <!-- Accessible Writing Frames & Key Vocabulary Bank -->
        <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 4px 7px; background: #ffffff; margin-bottom: 4px; display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
          <div>
            <strong style="font-family: 'Inter', sans-serif; font-size: 7pt; text-transform: uppercase; display: block; margin-bottom: 1px;">Accessible Writing Frames:</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-style: italic; line-height: 1.2; display: block;">${cfg.connectives}</span>
          </div>
          <div>
            <strong style="font-family: 'Inter', sans-serif; font-size: 7pt; text-transform: uppercase; display: block; margin-bottom: 1px;">Key Vocabulary Bank:</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; line-height: 1.2; display: block;">${cfg.wordBank}</span>
          </div>
        </div>

        <!-- Ruled Task Lines Prompt -->
        <div style="font-family: 'Inter', sans-serif; font-size: 7.1pt; font-style: italic; color: #222222; margin: 2px 0 2px 0; display: flex; justify-content: space-between;">
          <span><strong>Write your response in the space provided below:</strong></span>
          <span style="font-size: 6.8pt; color: #555555;">(Response continues on facing page)</span>
        </div>
      </div>

      <!-- 28 Ruled Task Lines for Extended Writing (Authentic 8.0mm Line Budget) -->
      <div style="flex: 1; display: flex; flex-direction: column; margin: 2px 0 4px 0;">
${flexTaskLines}
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

      <div class="page-footer-strip">
        <span class="footer-quip" style="text-align: left; flex: 1; margin-right: 8px;">${cfg.rightPageQuip}</span>
        <span class="footer-page-num">${rightPageNum}/24</span>
      </div>
    </div>
  </div>
`;

    // PAGE 3 OF MODULE: LINED WRITING (VERSO) - FULL CONTINUATION PAGE FOR WHY / ESSAY (31 FULL-WIDTH LINES AT 8.0mm PITCH)
    const continuationTaskLines = Array.from(
      { length: 31 },
      () => `
        <div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>`,
    ).join('');

    html += `
  <div class="page page-container" id="page-${linedLeftPageNum}">
    <div class="page-body-full">
      <!-- Running Header -->
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 4px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 10.5pt; color: #000000; margin: 0; font-weight: 800;">
          ${cfg.title}
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
          ${cfg.tariff.split(':')[0]} Continued
        </span>
      </div>

      <!-- Continuation Prompt -->
      <div style="font-family: 'Inter', sans-serif; font-size: 7.1pt; font-style: italic; color: #333333; margin-bottom: 2px;">
        Continue your response to ${cfg.tariff.split(':')[0]} below:
      </div>

      <!-- 31 Ruled Lines (Exact 8.0mm line pitch matching Page 5) -->
      <div style="flex: 1; display: flex; flex-direction: column; margin: 2px 0 4px 0;">
        ${continuationTaskLines}
      </div>

      ${renderFooterStrip(linedLeftPageNum, cfg.linedLeftQuip)}
    </div>
  </div>
`;

    // PAGE 4 OF MODULE: LINED WRITING (RECTO) - ESSAY SYNTHESIS & HISTORICAL VERDICT (24 LINES) + QUESTION 3 [4 MARKS] (6 LINES)
    const conclusionTaskLines = Array.from(
      { length: 24 },
      () => `
        <div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>`,
    ).join('');

    const q3TaskLines = Array.from(
      { length: 6 },
      () => `
        <div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>`,
    ).join('');

    html += `
  <div class="page page-container" id="page-${linedRightPageNum}">
    <div class="page-body-full" style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
      <div>
        <!-- Running Header -->
        <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 4px;">
          <h2 style="font-family: 'Playfair Display', serif; font-size: 10.5pt; color: #000000; margin: 0; font-weight: 800;">
            ${cfg.title}
          </h2>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
            Assessment Synthesis &amp; Question 3
          </span>
        </div>

        <!-- Conclusion Prompt -->
        <div style="font-family: 'Inter', sans-serif; font-size: 7.1pt; font-style: italic; color: #333333; margin-bottom: 2px;">
          Final analytical evaluation &amp; concluding historical verdict:
        </div>
      </div>

      <!-- 24 Ruled Lines for Essay Synthesis / Conclusion (Exact 8.0mm pitch) -->
      <div style="flex: 3.6; display: flex; flex-direction: column; margin: 2px 0 6px 0;">
        ${conclusionTaskLines}
      </div>

      <!-- Question 3: Similarity / Difference [4 marks] (Authentic Cross-Era Exam Practice at end of module) -->
      <div style="border-top: 2px solid #000000; padding-top: 4px; margin-top: 2px; flex: 1.4; display: flex; flex-direction: column;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; text-transform: uppercase; letter-spacing: 0.5px;">
            &bull; Question 3: Explain One ${cfg.fourMark.type} [4 marks]
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 700; border: 1px solid #000000; padding: 0 5px; border-radius: 2px; text-transform: uppercase;">
            [4 MARKS &bull; 5 MINS]
          </span>
        </div>
        <p style="font-family: 'Playfair Display', serif; font-size: 8.3pt; font-weight: 800; color: #000000; margin: 0 0 2px 0; line-height: 1.25;">
          ${cfg.fourMark.question}
        </p>
        <!-- 6 Ruled Lines for Question 3 (Exact 8.0mm pitch) -->
        <div style="flex: 1; display: flex; flex-direction: column; margin: 1px 0 0 0;">
          ${q3TaskLines}
        </div>
      </div>

      ${renderFooterStrip(linedRightPageNum, cfg.linedRightQuip)}
    </div>
  </div>
`;
  });

  // ====================================================================
  // PAGE 24: OUTSIDE BACK COVER
  // ====================================================================
  html += `
  <div class="page page-container" id="page-24" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Top Departmental Branding -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #0f284e; padding-bottom: 3px;">
        <div data-department-name="The History Department">
          <span style="font-family: 'Inter', sans-serif; font-size: 10pt; font-weight: 900; color: #0f284e; text-transform: uppercase; letter-spacing: 0.8px;">
            <span class="school-brand-target">The History Department</span>
          </span>
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 8.5pt; font-weight: 800; color: #0f284e;">
          KEY TOPIC 4 ASSESSMENT RECORD &bull; c1900–PRESENT
        </div>
      </div>

      <!-- Student Target Grade Strip -->
      <div style="border: 1.5px solid #0f284e; border-radius: 4px; padding: 6px 12px; background: #ffffff; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 16px; align-items: center;">
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
      <div style="border: 1.5px solid #0f284e; border-radius: 4px; overflow: hidden; margin-bottom: 4px;">
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
                p. 5–7
              </td>
              <td style="padding: 13px 6px; text-align: center; font-size: 10pt; font-weight: 900; border-right: 1.2px solid #cbd5e1; white-space: nowrap; color: #0f284e;">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 12
              </td>
              <td rowspan="2" style="padding: 10px 10px; vertical-align: top; font-size: 8pt; background: #ffffff;">
                <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #475569; font-weight: 700; text-transform: uppercase; margin-bottom: 4px;">
                  Marking Feedback &bull; Targets:
                </div>
                <div style="display: flex; flex-direction: column; justify-content: space-around; height: 19mm;">
                  <div style="border-bottom: 1px dotted #cbd5e1; height: 6mm;"></div>
                  <div style="border-bottom: 1px dotted #cbd5e1; height: 6mm;"></div>
                  <div style="border-bottom: 1px dotted #cbd5e1; height: 6mm;"></div>
                </div>
              </td>
            </tr>
            <tr style="border-bottom: 1.5px solid #0f284e;">
              <td style="padding: 13px 10px; font-weight: 600; line-height: 1.35; border-right: 1.2px solid #cbd5e1; font-size: 8.2pt; color: #0f284e;">
                <strong>Q3:</strong> Explain One Difference (Investigating Causes: 1880s vs 1990s)
              </td>
              <td style="padding: 13px 6px; text-align: center; font-weight: 800; font-size: 8.5pt; border-right: 1.2px solid #cbd5e1; white-space: nowrap; color: #0f284e;">
                p. 7
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
                p. 9–11
              </td>
              <td style="padding: 13px 6px; text-align: center; font-size: 10pt; font-weight: 900; border-right: 1.2px solid #cbd5e1; white-space: nowrap; color: #0f284e;">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 20
              </td>
              <td rowspan="2" style="padding: 10px 10px; vertical-align: top; font-size: 8pt; background: #ffffff;">
                <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #475569; font-weight: 700; text-transform: uppercase; margin-bottom: 4px;">
                  Marking Feedback &bull; Targets:
                </div>
                <div style="display: flex; flex-direction: column; justify-content: space-around; height: 19mm;">
                  <div style="border-bottom: 1px dotted #cbd5e1; height: 6mm;"></div>
                  <div style="border-bottom: 1px dotted #cbd5e1; height: 6mm;"></div>
                  <div style="border-bottom: 1px dotted #cbd5e1; height: 6mm;"></div>
                </div>
              </td>
            </tr>
            <tr style="border-bottom: 1.5px solid #0f284e;">
              <td style="padding: 13px 10px; font-weight: 600; line-height: 1.35; border-right: 1.2px solid #cbd5e1; font-size: 8.2pt; color: #0f284e;">
                <strong>Q3:</strong> Explain One Difference (Diagnostic Methods: 19th c vs Late 20th c)
              </td>
              <td style="padding: 13px 6px; text-align: center; font-weight: 800; font-size: 8.5pt; border-right: 1.2px solid #cbd5e1; white-space: nowrap; color: #0f284e;">
                p. 11
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
                p. 13–15
              </td>
              <td style="padding: 13px 6px; text-align: center; font-size: 10pt; font-weight: 900; border-right: 1.2px solid #cbd5e1; white-space: nowrap; color: #0f284e;">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 20
              </td>
              <td rowspan="2" style="padding: 10px 10px; vertical-align: top; font-size: 8pt; background: #ffffff;">
                <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #475569; font-weight: 700; text-transform: uppercase; margin-bottom: 4px;">
                  Marking Feedback &bull; Targets:
                </div>
                <div style="display: flex; flex-direction: column; justify-content: space-around; height: 19mm;">
                  <div style="border-bottom: 1px dotted #cbd5e1; height: 6mm;"></div>
                  <div style="border-bottom: 1px dotted #cbd5e1; height: 6mm;"></div>
                  <div style="border-bottom: 1px dotted #cbd5e1; height: 6mm;"></div>
                </div>
              </td>
            </tr>
            <tr style="border-bottom: 1.5px solid #0f284e;">
              <td style="padding: 13px 10px; font-weight: 600; line-height: 1.35; border-right: 1.2px solid #cbd5e1; font-size: 8.2pt; color: #0f284e;">
                <strong>Q3:</strong> Explain One Difference (Healthcare Access: 1930s vs Post-1948)
              </td>
              <td style="padding: 13px 6px; text-align: center; font-weight: 800; font-size: 8.5pt; border-right: 1.2px solid #cbd5e1; white-space: nowrap; color: #0f284e;">
                p. 15
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
                p. 17–19
              </td>
              <td style="padding: 13px 6px; text-align: center; font-size: 10pt; font-weight: 900; border-right: 1.2px solid #cbd5e1; white-space: nowrap; color: #0f284e;">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 12
              </td>
              <td rowspan="2" style="padding: 10px 10px; vertical-align: top; font-size: 8pt; background: #ffffff;">
                <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #475569; font-weight: 700; text-transform: uppercase; margin-bottom: 4px;">
                  Marking Feedback &bull; Targets:
                </div>
                <div style="display: flex; flex-direction: column; justify-content: space-around; height: 19mm;">
                  <div style="border-bottom: 1px dotted #cbd5e1; height: 6mm;"></div>
                  <div style="border-bottom: 1px dotted #cbd5e1; height: 6mm;"></div>
                  <div style="border-bottom: 1px dotted #cbd5e1; height: 6mm;"></div>
                </div>
              </td>
            </tr>
            <tr style="border-bottom: 1.5px solid #0f284e;">
              <td style="padding: 13px 10px; font-weight: 600; line-height: 1.35; border-right: 1.2px solid #cbd5e1; font-size: 8.2pt; color: #0f284e;">
                <strong>Q3:</strong> Explain One Similarity (Fleming 1928 vs Jenner 1796)
              </td>
              <td style="padding: 13px 6px; text-align: center; font-weight: 800; font-size: 8.5pt; border-right: 1.2px solid #cbd5e1; white-space: nowrap; color: #0f284e;">
                p. 19
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
                p. 21–23
              </td>
              <td style="padding: 13px 6px; text-align: center; font-size: 10pt; font-weight: 900; border-right: 1.2px solid #cbd5e1; white-space: nowrap; color: #0f284e;">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 20
              </td>
              <td rowspan="2" style="padding: 10px 10px; vertical-align: top; font-size: 8pt; background: #ffffff;">
                <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #475569; font-weight: 700; text-transform: uppercase; margin-bottom: 4px;">
                  Marking Feedback &bull; Targets:
                </div>
                <div style="display: flex; flex-direction: column; justify-content: space-around; height: 19mm;">
                  <div style="border-bottom: 1px dotted #cbd5e1; height: 6mm;"></div>
                  <div style="border-bottom: 1px dotted #cbd5e1; height: 6mm;"></div>
                  <div style="border-bottom: 1px dotted #cbd5e1; height: 6mm;"></div>
                </div>
              </td>
            </tr>
            <tr style="border-bottom: 1.5px solid #0f284e;">
              <td style="padding: 13px 10px; font-weight: 600; line-height: 1.35; border-right: 1.2px solid #cbd5e1; font-size: 8.2pt; color: #0f284e;">
                <strong>Q3:</strong> Explain One Similarity (Anti-Smoking Laws vs 1875 Public Health Act)
              </td>
              <td style="padding: 13px 6px; text-align: center; font-weight: 800; font-size: 8.5pt; border-right: 1.2px solid #cbd5e1; white-space: nowrap; color: #0f284e;">
                p. 23
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
                p. 4–23
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
      <div style="border: 1.5px solid #0f284e; border-radius: 4px; padding: 5px 6px; background: #f0f4f9;">
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

      ${renderFooterStrip(24, 'From DNA to the NHS, state action and laboratory science revolutionized healthcare; revision guarantees your GCSE success.', 24)}
    </div>
  </div>
`;

  html += `
</body>
</html>
`;

  return html;
}

if (require.main === module) {
  const customHtml = buildModernTwoPageWorkbook({}, {});
  const unitPath = path.resolve(__dirname, '../units/edexcel_medicine/pupil_workbook_modern.html');
  const pubPath = path.resolve(
    __dirname,
    '../public/units/edexcel_medicine/pupil_workbook_modern.html',
  );
  fs.writeFileSync(unitPath, customHtml, 'utf8');
  fs.writeFileSync(pubPath, customHtml, 'utf8');
  console.log('Successfully generated pupil_workbook_modern.html to:');
  console.log(' -', unitPath);
  console.log(' -', pubPath);
}

module.exports = {
  buildModernTwoPageWorkbook,
};
