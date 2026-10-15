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
          Key Topic 3 Notes &amp; Examination Strategy
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

// 5 Enquiry configs with Chronological Inquiry Spines
const eighteenthNineteenthConfigs = [
  {
    lessonNum: 1,
    lessonIndex: 10,
    id: 'lesson_3_1',
    keyTopicBadge: 'KEY TOPIC 3.1',
    title: 'KT3.1: Ideas on Causes: Pasteur’s Germ Theory & Koch’s Bacteriology',
    enquiryQuestion:
      'Why did it take 30 years for Germ Theory to transform medical understanding in Britain?',
    specAnchor:
      'Germ Theory (1861); Louis Pasteur; Robert Koch; bacteriology; agar cultures, chemical dyes, and microscopes; impact on Britain.',
    tariff: 'Question 4: Explain Why [12 marks &bull; 15 mins]',
    examStem:
      'Explain why there was rapid progress in understanding the causes of disease in the period c1860–c1890. [12 marks]',
    stimulus: ["Louis Pasteur's Germ Theory (1861)", "Robert Koch's work on bacteria"],
    connectives:
      'One main reason was that... &bull; For example, ... &bull; This was important because... &bull; Another key factor was... &bull; In particular, ... &bull; Overall, the most decisive reason was... because...',
    wordBank:
      'swan-neck flask &bull; Germ Theory (1861) &bull; spontaneous generation &bull; Robert Koch &bull; agar jelly &bull; methyl violet dye &bull; tuberculosis (1882) &bull; microphotography',
    timelineMission:
      'Turn to Pages 2–3 (Key Topic 3.1). In the drawing box, sketch Pasteur’s swan-neck flask experiment and Koch’s agar plate. Annotate how identifying specific bacteria ended miasma theory forever!',
    fourMark: {
      type: 'Difference',
      question:
        'Explain one way in which ideas about the cause of disease in the late nineteenth century (c1860–c1890) were different from ideas in the Renaissance (c1500–c1700). [4 marks]',
      hint: 'Contrast laboratory discoveries of specific microbes with earlier beliefs in miasma and spontaneous generation.',
      stems:
        'One way ideas about causes differed was... &bull; In the Renaissance period... &bull; In contrast, in the late nineteenth century...',
    },
    leftPageQuip:
      'Pasteur proved that rotting soup doesn’t spontaneously create germs; Koch proved which specific germs caused tuberculosis.',
    rightPageQuip:
      'Robert Koch photographed bacteria so clearly that British doctors could no longer blame bad smells for tuberculosis.',
    linedLeftQuip:
      'Pasteur proved microbes cause decay (1861); Koch proved specific bacteria cause specific diseases (1876–83).',
    linedRightQuip:
      'Structure your causal argument: demonstrate how Koch built directly upon Pasteur’s Germ Theory to revolutionize diagnosis.',
    stages: [
      {
        step: 1,
        dates: 'c1700–1850s',
        title: 'Spontaneous Generation & Miasma',
        questionHeading: 'Why did doctors believe disease created germs, rather than vice versa?',
        paraBadge: '[1.1]',
        bullets: [
          'Smelling rotting meat and open cesspools',
          'Foul airborne damp blamed for illness',
          'Microscopes seeing tiny swimming creatures',
        ],
      },
      {
        step: 2,
        dates: '1861',
        title: 'Louis Pasteur & Germ Theory',
        questionHeading: 'How did the swan-neck flask disprove spontaneous generation?',
        paraBadge: '[1.2]',
        bullets: [
          'Heating sour beer inside glass flasks',
          'Bent swan necks trapping airborne dust',
          'Boiled broth staying clear and fresh',
        ],
      },
      {
        step: 3,
        dates: '1867–1876',
        title: 'British Scepticism & John Tyndall',
        questionHeading: 'Why did British doctors refuse to believe germs caused human illness?',
        paraBadge: '[1.3]',
        bullets: [
          'London doctors defending bad air theory',
          'Shining light beams through dusty boxes',
          'Spraying smelly carbolic acid on cut flesh',
        ],
      },
      {
        step: 4,
        dates: '1876–1882',
        title: 'Robert Koch & Specific Bacteria',
        questionHeading: 'How did Koch’s staining and culture methods prove specificity?',
        paraBadge: '[1.4]',
        bullets: [
          'Solid seaweed agar jelly in shallow dishes',
          'Staining microbes with bright purple dyes',
          'Photographing deadly tuberculosis under glass lenses',
        ],
      },
      {
        step: 5,
        dates: '1883–1890',
        title: 'Postulates & Microphotography',
        questionHeading: 'Why was photomicrography crucial in winning British doctors over?',
        paraBadge: '[1.5]',
        bullets: [
          'Tracking curved cholera germs in river water',
          'Taking crisp black-and-white photos of germs',
          'Injecting farm animals to test poisons',
        ],
      },
    ],
  },
  {
    lessonNum: 2,
    lessonIndex: 11,
    id: 'lesson_3_2',
    keyTopicBadge: 'KEY TOPIC 3.2',
    title: 'KT3.2: Approaches to Prevention: Edward Jenner & The Smallpox Vaccine',
    enquiryQuestion:
      'Why did Edward Jenner face fierce resistance despite discovering the smallpox vaccine?',
    specAnchor:
      'Edward Jenner; development of smallpox vaccination (1796); opposition from doctors, church, and variolators; government funding and compulsory vaccination (1852).',
    tariff: 'Question 5/6: Evaluative Essay [16+4 marks &bull; 20 mins]',
    examStem:
      '‘Edward Jenner’s development of the smallpox vaccine was the most significant breakthrough in the prevention of disease in the period c1700–c1900.’ How far do you agree? [16+4 marks]',
    stimulus: ['Inoculation', 'The Public Health Act (1875)'],
    connectives:
      'On the one hand, a major breakthrough was... &bull; For example, ... &bull; This was significant because... &bull; On the other hand, an alternative factor was... &bull; In particular, ... &bull; Overall, the most decisive factor was... because...',
    wordBank:
      'Edward Jenner (1796) &bull; cowpox &bull; James Phipps &bull; smallpox &bull; variolation &bull; inoculation &bull; compulsory vaccination (1852) &bull; Anti-Vaccination League',
    timelineMission:
      'Turn to Pages 2–3 (Key Topic 3.2). In the drawing box, sketch Jenner inoculating James Phipps with cowpox. Annotate how this empirical experiment laid the foundation for modern immunology!',
    fourMark: {
      type: 'Difference',
      question:
        'Explain one way in which methods of preventing smallpox in the late eighteenth century were different from methods used in the seventeenth century. [4 marks]',
      hint: 'Contrast safe cowpox vaccination with earlier reliance on prayer, quarantine, and risky variolation.',
      stems:
        'One way prevention of smallpox differed was... &bull; In the seventeenth century... &bull; In contrast, in the late eighteenth century...',
    },
    leftPageQuip:
      'Cartoons showed vaccinated people growing cow heads and horns: proof that anti-vax memes existed long before social media.',
    rightPageQuip:
      'Jenner saved millions with cowpox, yet died before anyone could explain what a virus actually was.',
    linedLeftQuip:
      'Contrast Jenner’s empirical cowpox observation with Pasteur and Koch’s laboratory bacteriology a century later.',
    linedRightQuip:
      'Balance Jenner’s individual genius against state legislation: vaccination only conquered smallpox when made compulsory in 1852.',
    stages: [
      {
        step: 1,
        dates: '1721–1795',
        title: 'Smallpox & Inoculation',
        questionHeading: 'Why was inoculation dangerous for poor urban communities?',
        paraBadge: '[2.1]',
        bullets: [
          'Scabbing sores blinding young children',
          'Scratching live pus into healthy arms',
          'Paying rich doctors high guinea fees',
        ],
      },
      {
        step: 2,
        dates: '1796–1798',
        title: 'Edward Jenner & The Cowpox Vaccine',
        questionHeading: 'How did Jenner use scientific experimentation to test folklore?',
        paraBadge: '[2.2]',
        bullets: [
          'Milking cows with clear smooth skin',
          'Scraping blister liquid into boy James Phipps',
          'Dosing boy with deadly pox without illness',
        ],
      },
      {
        step: 3,
        dates: '1798–1810s',
        title: 'Medical & Religious Opposition',
        questionHeading: 'Why did London doctors and church leaders resist vaccination?',
        paraBadge: '[2.3]',
        bullets: [
          'Printing scary cartoons with sprouting cow horns',
          'Church pulpits warning against beast blood',
          'Dirty hospital needles passing deadly infections',
        ],
      },
      {
        step: 4,
        dates: '1802–1840',
        title: 'Parliamentary Funding & Adoption',
        questionHeading: 'Why did the British government abandon laissez-faire for vaccination?',
        paraBadge: '[2.4]',
        bullets: [
          'Voting thirty thousand pounds in gold coins',
          'Giving free scratches to village babies',
          'Banning old dangerous pus cuts by law',
        ],
      },
      {
        step: 5,
        dates: '1852–1871',
        title: 'Compulsory Acts & Anti-Vaccine League',
        questionHeading: 'Why did making vaccination compulsory spark fierce public protests?',
        paraBadge: '[2.5]',
        bullets: [
          'Fining poor parents for refusing jabs',
          'Angry street protests marching with banners',
          'Plunging death rates as smallpox disappears',
        ],
      },
    ],
  },
  {
    lessonNum: 3,
    lessonIndex: 12,
    id: 'lesson_3_3',
    keyTopicBadge: 'KEY TOPIC 3.3',
    title: 'KT3.3: Improvements in Hospital Care: Florence Nightingale & Professional Nursing',
    enquiryQuestion:
      'How did Florence Nightingale transform hospitals from death traps into places of cure?',
    specAnchor:
      'Florence Nightingale; hospital conditions at Scutari (1854–56); Notes on Hospitals and Notes on Nursing (1859); pavilion hospital plan; professional nursing training.',
    tariff: 'Question 4: Explain Why [12 marks &bull; 15 mins]',
    examStem:
      'Explain why the standard of hospital care and nursing improved so significantly in the second half of the nineteenth century. [12 marks]',
    stimulus: ["Florence Nightingale's work in the Crimea (1854–56)", 'The pavilion hospital plan'],
    connectives:
      'One main reason was that... &bull; For example, ... &bull; This was important because... &bull; Another key factor was... &bull; In particular, ... &bull; Overall, the most decisive reason was... because...',
    wordBank:
      "Florence Nightingale &bull; Scutari (1854) &bull; Notes on Nursing (1859) &bull; pavilion plan &bull; cross-ventilation &bull; St Thomas' Hospital &bull; trained nurses &bull; sanitation",
    timelineMission:
      'Turn to Pages 2–3 (Key Topic 3.3). In the drawing box, sketch the Pavilion Hospital plan with its separate, ventilated pavilions. Annotate how cross-ventilation prevented hospital gangrene!',
    fourMark: {
      type: 'Difference',
      question:
        'Explain one way in which hospital care in the late nineteenth century was different from hospital care in the Medieval period. [4 marks]',
      hint: 'Contrast modern sanitary pavilion wards and trained medical care with medieval monastic care.',
      stems:
        'One way hospital care differed was... &bull; In the Medieval period... &bull; In contrast, in the late nineteenth century...',
    },
    leftPageQuip:
      'Nightingale believed miasma caused disease, yet her obsession with fresh air, scrubbing, and clean drains saved thousands of lives.',
    rightPageQuip:
      'Florence Nightingale proved that clean sheets, fresh soup, and opening windows were deadlier to infection than any Victorian medicine.',
    linedLeftQuip:
      'Nightingale transformed nursing from low-status domestic drudgery into a disciplined, respected medical profession.',
    linedRightQuip:
      'Explain how architectural design (pavilion wards) worked in tandem with trained matrons to drive down hospital mortality.',
    stages: [
      {
        step: 1,
        dates: 'c1700–1850',
        title: 'Voluntary Hospitals & Pre-Modern Nursing',
        questionHeading: 'Why were early Victorian hospital wards notorious death traps?',
        paraBadge: '[3.1]',
        bullets: [
          'Crowded dark rooms smelling of festering wounds',
          'Drunk ward women sleeping on dirty rags',
          'Sharing blood-soaked blankets between beds',
        ],
      },
      {
        step: 2,
        dates: '1854–1856',
        title: 'Scutari & The Crimean War',
        questionHeading: 'How did Nightingale’s sanitary reforms drastically cut the death rate?',
        paraBadge: '[3.2]',
        bullets: [
          'Sewers overflowing beneath wooden ward floors',
          'Scrubbing dirty walls with boiling water and soap',
          'Feeding wounded soldiers hot fresh stew',
        ],
      },
      {
        step: 3,
        dates: '1859',
        title: 'Notes on Nursing & Sanitary Science',
        questionHeading: 'Why did Nightingale’s belief in miasma still produce effective hygiene?',
        paraBadge: '[3.3]',
        bullets: [
          'Opening high windows for fresh river breezes',
          'Drawing colourful polar pie charts for MPs',
          'Demanding clean white cotton bandages',
        ],
      },
      {
        step: 4,
        dates: '1860s',
        title: 'The Pavilion Plan Hospital Design',
        questionHeading: 'How did the pavilion plan prevent cross-infection between wards?',
        paraBadge: '[3.4]',
        bullets: [
          'Building long narrow brick ward pavilions',
          'Washing smooth glazed walls with water',
          'Cross-ventilation blowing stale room air away',
        ],
      },
      {
        step: 5,
        dates: '1860–1890s',
        title: 'Professional Nurse Training & Asepsis',
        questionHeading: 'How did nurse training permanently raise the standard of hospital care?',
        paraBadge: '[3.5]',
        bullets: [
          "Uniformed women learning medical rules at St Thomas'",
          'Stern matrons inspecting spotless bedside tables',
          'Fusing clean hands with microbe science',
        ],
      },
    ],
  },
  {
    lessonNum: 4,
    lessonIndex: 13,
    id: 'lesson_3_4',
    keyTopicBadge: 'KEY TOPIC 3.4',
    title: 'KT3.4: The Surgical Revolution: Simpson’s Chloroform & Lister’s Antiseptics',
    enquiryQuestion:
      'Why did the conquest of pain in surgery temporarily increase the patient death rate?',
    specAnchor:
      'Surgical breakthroughs: pain (anaesthetics: nitrous oxide, ether, James Simpson and chloroform); infection (Joseph Lister and carbolic acid; asepsis); bleeding.',
    tariff: 'Question 4: Explain Why [12 marks &bull; 15 mins]',
    examStem:
      'Explain why surgery became significantly safer in the period c1840–c1900. [12 marks]',
    stimulus: [
      "James Simpson's discovery of chloroform (1847)",
      "Joseph Lister's use of carbolic acid (1865)",
    ],
    connectives:
      'One main reason was that... &bull; For example, ... &bull; This was important because... &bull; Another key factor was... &bull; In particular, ... &bull; Overall, the most decisive reason was... because...',
    wordBank:
      'James Simpson &bull; chloroform (1847) &bull; Black Period &bull; Joseph Lister &bull; carbolic acid spray (1865) &bull; antiseptics &bull; steam sterilisation &bull; aseptic surgery',
    timelineMission:
      'Turn to Pages 2–3 (Key Topic 3.4). In the drawing box, sketch Lister’s carbolic donkey engine spraying mist over an open wound. Annotate the difference between antiseptic and aseptic surgery!',
    fourMark: {
      type: 'Similarity',
      question:
        'Explain one way in which surgical operations in the early nineteenth century (before 1846) were similar to surgery in the Medieval period. [4 marks]',
      hint: 'Focus on raw surgical speed and physical restraint before effective chemical anaesthetics were discovered.',
      stems:
        'One way surgical operations were similar was... &bull; In the Medieval period... &bull; Similarly, in the early nineteenth century before 1846...',
    },
    leftPageQuip:
      'Chloroform conquered pain, but Lister conquered the invisible enemy: the rotting microbes thriving on surgeons’ unwashed hands.',
    rightPageQuip:
      'Surgeons used to take pride in blood-caked frock coats; Lister forced them to wash their hands and operate in carbolic acid mist.',
    linedLeftQuip:
      'The "Black Period" of surgery proved that removing pain alone was dangerous until antisepsis solved internal infection.',
    linedRightQuip:
      'Trace the surgical progression: from Liston’s raw speed, to Simpson’s chloroform, to Lister’s carbolic spray, to Koch’s steam sterilisation.',
    stages: [
      {
        step: 1,
        dates: 'c1700–1846',
        title: 'Pre-Anaesthetic Surgery: Speed & Shock',
        questionHeading: 'Why was surgical speed essential before the discovery of anaesthetics?',
        paraBadge: '[4.1]',
        bullets: [
          'Holding down screaming patients with leather straps',
          'Sawing off broken legs in thirty seconds',
          'Breathing sweet laughing gas at fairgrounds',
        ],
      },
      {
        step: 2,
        dates: '1847–1853',
        title: 'James Simpson & Chloroform',
        questionHeading: 'Why did the death of Hannah Greener cause panic among surgeons?',
        paraBadge: '[4.2]',
        bullets: [
          'Sniffing heavy liquid vapour under dinner table',
          'Young Hannah Greener dying from cold overdose',
          'Queen Victoria giving birth with zero pain',
        ],
      },
      {
        step: 3,
        dates: '1846–1865',
        title: 'The "Black Period" of Surgery',
        questionHeading: 'Why did conquering surgical pain lead to higher patient death rates?',
        paraBadge: '[4.3]',
        bullets: [
          'Wearing stiff dried blood coats as badges',
          'Cutting deeper into belly flesh for longer',
          'Black rotting gangrene killing feverish patients',
        ],
      },
      {
        step: 4,
        dates: '1865–1870s',
        title: 'Joseph Lister & Carbolic Acid Spray',
        questionHeading: 'How did Lister apply Germ Theory to solve hospital gangrene?',
        paraBadge: '[4.4]',
        bullets: [
          'Treating green sewage water with smelly chemicals',
          "Wrapping boy Jamie Greenlees' fractured leg",
          'Pumping fine acid mist over open surgical wounds',
        ],
      },
      {
        step: 5,
        dates: '1880s–1890s',
        title: 'From Antiseptic to Aseptic Surgery',
        questionHeading: 'What is the crucial difference between antiseptic and aseptic surgery?',
        paraBadge: '[4.5]',
        bullets: [
          'Boiling metal scalpels in pressurized steam kettles',
          'Pulling on thin sterile rubber gloves',
          'Tying white cotton masks over mouths and noses',
        ],
      },
    ],
  },
  {
    lessonNum: 5,
    lessonIndex: 14,
    id: 'lesson_3_5',
    keyTopicBadge: 'KEY TOPIC 3.5',
    title: 'KT3.5: Public Health & Cholera: John Snow & The 1875 Public Health Act',
    enquiryQuestion:
      'Why did it take 20 years for John Snow’s cholera discovery to change government policy?',
    specAnchor:
      'Public health: cholera epidemics; John Snow and Broad Street pump (1854); public health acts (1848 permissive vs 1875 compulsory); Bazalgette and London sewers.',
    tariff: 'Question 5/6: Evaluative Essay [16+4 marks &bull; 20 mins]',
    examStem:
      '‘The work of John Snow was the main reason for improvements in public health in the nineteenth century.’ How far do you agree? [16+4 marks]',
    stimulus: ['Edwin Chadwick’s 1842 Report', 'The Public Health Act (1875)'],
    connectives:
      'On the one hand, a major breakthrough was... &bull; For example, ... &bull; This was significant because... &bull; On the other hand, an alternative factor was... &bull; In particular, ... &bull; Overall, the most decisive factor was... because...',
    wordBank:
      'John Snow (1854) &bull; Broad Street pump &bull; waterborne cholera &bull; Edwin Chadwick (1842) &bull; Great Stink (1858) &bull; Joseph Bazalgette &bull; Public Health Act (1875) &bull; laissez-faire',
    timelineMission:
      'Turn to Pages 2–3 (Key Topic 3.5). In the drawing box, sketch John Snow’s Broad Street pump map and Bazalgette’s sewer network. Annotate how cholera forced Parliament to abandon laissez-faire!',
    fourMark: {
      type: 'Difference',
      question:
        'Explain one way in which government action on public health in the late nineteenth century was different from government action in the Renaissance. [4 marks]',
      hint: 'Contrast compulsory public health legislation with earlier temporary emergency measures.',
      stems:
        'One way government action differed was... &bull; In the Renaissance period... &bull; In contrast, under the 1875 Public Health Act...',
    },
    leftPageQuip:
      'Snow removed the Broad Street pump handle in 1854, proving cholera was water-borne seven years before Germ Theory.',
    rightPageQuip:
      'John Snow solved cholera with a street map and a wrench, proving forensic detective work is as powerful as a microscope.',
    linedLeftQuip:
      'Snow established waterborne transmission in 1854, but it took the Great Stink of 1858 and the 1867 Reform Act to compel government action.',
    linedRightQuip:
      'Weigh Snow’s epidemiological genius against Chadwick’s sanitary report, Bazalgette’s sewers, and Disraeli’s compulsory 1875 Act.',
    stages: [
      {
        step: 1,
        dates: '1831–1848',
        title: 'Epidemic Terror & Edwin Chadwick',
        questionHeading: 'Why did towns refuse to set up health boards under the 1848 Act?',
        paraBadge: '[5.1]',
        bullets: [
          'Violent watery sickness turning human skin blue',
          'Piles of human excrement rotting near houses',
          'Parliament passing optional town health boards',
        ],
      },
      {
        step: 2,
        dates: '1854',
        title: 'John Snow & The Broad Street Pump',
        questionHeading: 'How did Snow use epidemiological mapping to prove water transmission?',
        paraBadge: '[5.2]',
        bullets: [
          'Plotting black death bars on street map',
          'Brewery men drinking ale staying completely healthy',
          'Unscrewing heavy iron pump handle with wrench',
        ],
      },
      {
        step: 3,
        dates: '1854–1858',
        title: 'Board of Health & Miasma Orthodoxy',
        questionHeading: 'Why did the medical establishment refuse to accept Snow’s water theory?',
        paraBadge: '[5.3]',
        bullets: [
          'Cracked brick cesspool leaking into drinking well',
          'Medical journals laughing at dirty water theory',
          'Doctors burning pitch barrels in foggy streets',
        ],
      },
      {
        step: 4,
        dates: '1858–1865',
        title: 'The Great Stink & Bazalgette’s Sewers',
        questionHeading: 'Why did fear of miasma paradoxically save thousands from cholera?',
        paraBadge: '[5.4]',
        bullets: [
          'Boiling brown river mud halting Parliament debates',
          'Soaking courtroom window curtains in lime juice',
          'Digging thousand miles of underground brick tunnels',
        ],
      },
      {
        step: 5,
        dates: '1875',
        title: 'The 1875 Public Health Act: End of Laissez-Faire',
        questionHeading: 'Why was the 1875 Act the definitive death blow to laissez-faire?',
        paraBadge: '[5.5]',
        bullets: [
          'Working factory men winning parliamentary votes',
          'Forcing town councils to pipe clean fresh water',
          'Hiring official medical inspectors for bad food',
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

function build18th19thTwoPageWorkbook(unitData, period) {
  const coverImgBase64 =
    getBase64Image('units/edexcel_medicine/assets/authentic_18th_19th.jpg') ||
    getBase64Image('/images/authentic_18th_19th.jpg') ||
    '';

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Key Topic 3: Medicine in 18th and 19th Century Britain Workbook</title>
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
          KEY TOPIC 3 &bull; PUPIL WORKBOOK
        </span>
        <h1 style="font-family: 'Playfair Display', serif; font-size: 20pt; font-weight: 900; color: #0f284e; margin: 4px 0 2px 0; line-height: 1.15; letter-spacing: -0.5px;">
          Medicine in 18th &amp; 19th Century Britain
        </h1>
        <p style="font-family: 'Georgia', serif; font-size: 9pt; color: #334155; margin: 0; font-style: italic; font-weight: 600;">
          c1700–c1900: Ideas on Causes, Prevention, Hospital Care, Surgery &amp; Public Health
        </p>
      </div>

      <!-- Prominent Primary Visual Source Centerpiece (Rich Authentic Colour) -->
      <div style="margin: 2px 0 5px 0; border: 1.5px solid #0f284e; border-radius: 4px; overflow: hidden; background: #ffffff;">
        <div style="background: #fcfbf9; display: flex; justify-content: center; align-items: center; padding: 2px 4px;">
          <img src="${coverImgBase64}" alt="James Gillray, The Cow-Pock (1802)" style="width: 100%; height: 93mm; object-fit: cover; object-position: center 30%; display: block; margin: 0 auto; border: 1.2px solid #0f284e; border-radius: 2px; box-shadow: 0 2px 6px rgba(15,40,78,0.22);">
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #0f284e; padding: 3px 8px; border-top: 1.5px solid #0f284e; background: #ffffff;">
          <span><strong>Primary Visual Evidence:</strong> James Gillray, <em>The Cow-Pock—or—the Wonderful Effects of the New Inoculation!</em> (1802 satire of Edward Jenner)</span>
          <span style="font-weight: 700; color: #475569; white-space: nowrap; margin-left: 8px;">HISTORICAL SATIRE ARCHIVE</span>
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
                Key Topic 3 Specification Framework (1HI0/11)
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
                  Key Topic 3.1: Ideas on Causes: Pasteur’s Germ Theory &amp; Koch’s Bacteriology
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 8pt; font-style: italic; color: #475569; margin-top: 1.5px; line-height: 1.25;">
                  How did swan-neck flasks (1861) and agar cultures (1876–83) demolish spontaneous generation?
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
                  Key Topic 3.2: Approaches to Prevention: Edward Jenner &amp; The Smallpox Vaccine
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 8pt; font-style: italic; color: #475569; margin-top: 1.5px; line-height: 1.25;">
                  How did the 1796 cowpox experiment defeat variolation, and why did opposition persist until 1852?
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
                  Key Topic 3.3: Improvements in Hospital Care: Florence Nightingale &amp; Professional Nursing
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 8pt; font-style: italic; color: #475569; margin-top: 1.5px; line-height: 1.25;">
                  How did Scutari (1854–56), Notes on Nursing (1859), and the pavilion plan transform Victorian mortality?
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
                  Key Topic 3.4: The Surgical Revolution: Simpson’s Chloroform &amp; Lister’s Antiseptics
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 8pt; font-style: italic; color: #475569; margin-top: 1.5px; line-height: 1.25;">
                  How did Simpson conquer pain, Lister conquer infection, and the 1890s introduce aseptic surgery?
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
                  Key Topic 3.5: Public Health &amp; Cholera: John Snow &amp; The 1875 Public Health Act
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 8pt; font-style: italic; color: #475569; margin-top: 1.5px; line-height: 1.25;">
                  How did John Snow’s Broad Street pump map (1854) and the 1875 Act permanently dismantle government laissez-faire?
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

      ${renderFooterStrip(1, 'The History Revision Hub &bull; GCSE History Paper 1 &bull; Key Topic 3 Pupil Workbook', 20)}
    </div>
  </div>
`;

  // ====================================================================
  // PAGES 2 & 3: LIVING UNIT TIMELINE SPREAD (1700–1900)
  // OPEN DRAWING CANVAS (ZERO ENCLOSING BOX BORDERS)
  // ====================================================================
  html += `
  <div class="page page-container verso-page" id="page-2" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div>
        <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 4px;">
          <h2 style="font-family: 'Playfair Display', serif; font-size: 11pt; color: #000000; margin: 0; font-weight: 800;">
            Living Timeline &bull; Part 1: Vaccines, Anaesthetics &amp; Early Sanitation (1700–1854)
          </h2>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
            Chronological Inquiry &bull; Milestones 1–4
          </span>
        </div>

        <div style="border: 1.2px solid #000000; border-radius: 3px; background: #ffffff; padding: 3px 6px; margin-bottom: 5px; font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #000000;">
          <strong style="color: #000000;">Living Timeline Dual-Coding Protocol:</strong> Complete each milestone sketchpad using dual-coding (combining visual storytelling symbols, causal arrows, and dates) to master the chronological spine across the centre-fold.
        </div>
      </div>

      <!-- 4 Milestones with Open Drawing Area (Zero Box Lines) -->
      <div style="display: flex; flex-direction: column; flex: 1; justify-content: space-between; min-height: 0;">
        
        <!-- Milestone 1: 1796 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 9.6pt; font-weight: 900; color: #000000;">
              1796 &bull; Edward Jenner: Smallpox Vaccination &amp; Immunology
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 800; background: #000000; color: #ffffff; border: 1px solid #000000; padding: 1px 6px; border-radius: 2px;">Key Topic 3.2</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.6pt; color: #000000; margin: 0; line-height: 1.3;">
            Jenner inoculates James Phipps with cowpox pus from Sarah Nelmes, proving cowpox confers immunity against smallpox. Publishes findings in 1798. Despite initial Royal Society scepticism, vaccination eradicates inoculator infection risks and founds immunology.
          </p>
        </div>

        <!-- Milestone 2: 1847 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 9.6pt; font-weight: 900; color: #000000;">
              1847 &bull; James Young Simpson: Chloroform &amp; Anaesthesia
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 800; background: #000000; color: #ffffff; border: 1px solid #000000; padding: 1px 6px; border-radius: 2px;">Key Topic 3.4</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.6pt; color: #000000; margin: 0; line-height: 1.3;">
            Simpson discovers the potent anaesthetic properties of chloroform in Edinburgh, ending agony during surgery. Queen Victoria’s use of chloroform during childbirth (1853) popularises it, enabling complex operations despite the initial ‘Black Period’ of surgery.
          </p>
        </div>

        <!-- Milestone 3: 1848 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 9.6pt; font-weight: 900; color: #000000;">
              1848 &bull; First Public Health Act &amp; The General Board of Health
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 800; background: #000000; color: #ffffff; border: 1px solid #000000; padding: 1px 6px; border-radius: 2px;">Key Topic 3.5</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.6pt; color: #000000; margin: 0; line-height: 1.3;">
            Spurred by Chadwick’s 1842 report and epidemic cholera, Parliament passes the permissive 1848 Act. Towns can create local boards of health to supply clean water and drainage, though lack of compulsion leaves most cities vulnerable to filth and contagion.
          </p>
        </div>

        <!-- Milestone 4: 1854 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 9.6pt; font-weight: 900; color: #000000;">
              1854 &bull; John Snow: Broad Street Pump &amp; Waterborne Cholera
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 800; background: #000000; color: #ffffff; border: 1px solid #000000; padding: 1px 6px; border-radius: 2px;">Key Topic 3.5</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.6pt; color: #000000; margin: 0; line-height: 1.3;">
            During the Soho epidemic, Snow compiles his famous spot map linking 500+ fatal cholera cases to the Broad Street pump. Removing the handle immediately halts the outbreak, mathematically disproving the miasma theory seven years before Pasteur’s Germ Theory.
          </p>
        </div>

      </div>

      ${renderFooterStrip(2, 'The 18th century relied on empirical observation; the 19th century unlocked the laboratory.', 20)}
    </div>
  </div>

  <!-- PAGE 3: LIVING TIMELINE PART 2 -->
  <div class="page page-container recto-page" id="page-3" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div>
        <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 4px;">
          <h2 style="font-family: 'Playfair Display', serif; font-size: 11pt; color: #000000; margin: 0; font-weight: 800;">
            Living Timeline &bull; Part 2: Nursing, Microbes &amp; Antiseptics (1854–1875)
          </h2>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
            Chronological Inquiry &bull; Milestones 5–8
          </span>
        </div>

        <div style="border: 1.2px solid #000000; border-radius: 3px; background: #ffffff; padding: 3px 6px; margin-bottom: 5px; font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #000000;">
          <strong style="color: #000000;">Living Timeline Dual-Coding Protocol:</strong> Draw visual symbols for Crimean hospital sanitation, swan-neck flasks, Lister carbolic sprays, and municipal sewers across the timeline below.
        </div>
      </div>

      <!-- 4 Milestones with Open Drawing Area (Zero Box Lines) -->
      <div style="display: flex; flex-direction: column; flex: 1; justify-content: space-between; min-height: 0;">
        
        <!-- Milestone 5: 1854–56 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 9.6pt; font-weight: 900; color: #000000;">
              1854–56 &bull; Florence Nightingale: Hospital Sanitation at Scutari
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 800; background: #000000; color: #ffffff; border: 1px solid #000000; padding: 1px 6px; border-radius: 2px;">Key Topic 3.3</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.6pt; color: #000000; margin: 0; line-height: 1.3;">
            During the Crimean War, Nightingale enforces rigorous cleanliness, ventilation, and fresh nutrition at Scutari hospital, slashing soldier death rates from 40% to 2%. Returns to Britain to establish the Nightingale Training School and author Notes on Nursing (1859).
          </p>
        </div>

        <!-- Milestone 6: 1861 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 9.6pt; font-weight: 900; color: #000000;">
              1861 &bull; Louis Pasteur: Germ Theory &amp; Swan-Neck Flask Experiments
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 800; background: #000000; color: #ffffff; border: 1px solid #000000; padding: 1px 6px; border-radius: 2px;">Key Topic 3.1</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.6pt; color: #000000; margin: 0; line-height: 1.3;">
            Commissioned by Lille brewers, Pasteur disproves spontaneous generation using swan-neck flasks, demonstrating that airborne microbes cause fermentation and decay. In 1861, he publishes Germ Theory, proving microscopic germs cause specific diseases in living organisms.
          </p>
        </div>

        <!-- Milestone 7: 1865–67 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 9.6pt; font-weight: 900; color: #000000;">
              1865–67 &bull; Joseph Lister: Carbolic Acid Spray &amp; Antiseptic Surgery
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 800; background: #000000; color: #ffffff; border: 1px solid #000000; padding: 1px 6px; border-radius: 2px;">Key Topic 3.4</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.6pt; color: #000000; margin: 0; line-height: 1.3;">
            Applying Pasteur’s Germ Theory to wound sepsis, Lister uses carbolic acid sprays, dressings, and hand-washing during surgery at Glasgow Infirmary. His antiseptic techniques reduce amputee mortality from 46% to 15%, paving the way for modern aseptic operating theatres.
          </p>
        </div>

        <!-- Milestone 8: 1875 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 9.6pt; font-weight: 900; color: #000000;">
              1875 &bull; The Second Public Health Act: End of Laissez-Faire
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 800; background: #000000; color: #ffffff; border: 1px solid #000000; padding: 1px 6px; border-radius: 2px;">Key Topic 3.5</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.6pt; color: #000000; margin: 0; line-height: 1.3;">
            Disraeli’s government ends laissez-faire by making public health compulsory. Municipal councils are legally required to provide clean piped water, subterranean sewer drainage, street lighting, and medical officers of health, transforming urban life expectancy.
          </p>
        </div>

      </div>

      ${renderFooterStrip(3, 'Pasteur and Koch unlocked microbiology; Joseph Bazalgette engineered the sewers that saved millions.', 20)}
    </div>
  </div>
`;

  // ====================================================================
  // PAGES 4–18: 5 DEDICATED THREE-PAGE ENQUIRY MODULES (15 PAGES TOTAL)
  // Page 1: Chronological Inquiry Spine & Exposition Notes (Left/Right)
  // Page 2: Extended Writing Part 1 (18 task lines, stimulus, writing frames & vocab @ 8.2pt)
  // Page 3: Extended Writing Part 2 (16 continuation lines + Question 3 Similarity/Difference [4 marks])
  // ====================================================================
  eighteenthNineteenthConfigs.forEach((cfg, idx) => {
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
  <div class="page page-container" id="page-${questionPart1PageNum}">
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
  <div class="page page-container" id="page-${questionPart2PageNum}">
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
          KEY TOPIC 3 ASSESSMENT RECORD &bull; c1700–c1900
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

      <!-- Expanded Key Topic 3 Assessment Record Table (10 Questions + Cumulative Total) -->
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
            <!-- KT3.1: Pasteur & Koch -->
            <tr style="border-bottom: 1px dashed #cbd5e1;">
              <td rowspan="2" style="padding: 12px 6px; text-align: center; font-weight: 900; font-size: 9.5pt; border-right: 1.2px solid #cbd5e1; background: #f0f4f9; color: #0f284e; vertical-align: middle;">
                KT3.1
              </td>
              <td style="padding: 13px 10px; font-weight: 600; line-height: 1.35; border-right: 1.2px solid #cbd5e1; font-size: 8.2pt; color: #0f284e;">
                <strong>Q4:</strong> Explain Why Rapid Progress in Causes c1860–c1890
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
                <strong>Q3:</strong> Explain One Difference (Causes: c1700 vs c1900)
              </td>
              <td style="padding: 13px 6px; text-align: center; font-weight: 800; font-size: 8.5pt; border-right: 1.2px solid #cbd5e1; white-space: nowrap; color: #0f284e;">
                p. 6
              </td>
              <td style="padding: 13px 6px; text-align: center; font-size: 10pt; font-weight: 900; border-right: 1.2px solid #cbd5e1; white-space: nowrap; color: #0f284e;">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 4
              </td>
            </tr>

            <!-- KT3.2: Edward Jenner & Smallpox -->
            <tr style="border-bottom: 1px dashed #cbd5e1;">
              <td rowspan="2" style="padding: 12px 6px; text-align: center; font-weight: 900; font-size: 9.5pt; border-right: 1.2px solid #cbd5e1; background: #f0f4f9; color: #0f284e; vertical-align: middle;">
                KT3.2
              </td>
              <td style="padding: 13px 10px; font-weight: 600; line-height: 1.35; border-right: 1.2px solid #cbd5e1; font-size: 8.2pt; color: #0f284e;">
                <strong>Q5/6:</strong> Evaluative Essay on Jenner Smallpox Vaccine c1700–c1900
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
                <strong>Q3:</strong> Explain One Difference (Smallpox Prevention Methods)
              </td>
              <td style="padding: 13px 6px; text-align: center; font-weight: 800; font-size: 8.5pt; border-right: 1.2px solid #cbd5e1; white-space: nowrap; color: #0f284e;">
                p. 9
              </td>
              <td style="padding: 13px 6px; text-align: center; font-size: 10pt; font-weight: 900; border-right: 1.2px solid #cbd5e1; white-space: nowrap; color: #0f284e;">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 4
              </td>
            </tr>

            <!-- KT3.3: Florence Nightingale & Hospitals -->
            <tr style="border-bottom: 1px dashed #cbd5e1;">
              <td rowspan="2" style="padding: 12px 6px; text-align: center; font-weight: 900; font-size: 9.5pt; border-right: 1.2px solid #cbd5e1; background: #f0f4f9; color: #0f284e; vertical-align: middle;">
                KT3.3
              </td>
              <td style="padding: 13px 10px; font-weight: 600; line-height: 1.35; border-right: 1.2px solid #cbd5e1; font-size: 8.2pt; color: #0f284e;">
                <strong>Q4:</strong> Explain Why Hospital Care &amp; Nursing Improved c1850–c1900
              </td>
              <td style="padding: 13px 6px; text-align: center; font-weight: 800; font-size: 8.5pt; border-right: 1.2px solid #cbd5e1; white-space: nowrap; color: #0f284e;">
                p. 11–12
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
                <strong>Q3:</strong> Explain One Difference (Hospital Care: Medieval vs c1900)
              </td>
              <td style="padding: 13px 6px; text-align: center; font-weight: 800; font-size: 8.5pt; border-right: 1.2px solid #cbd5e1; white-space: nowrap; color: #0f284e;">
                p. 12
              </td>
              <td style="padding: 13px 6px; text-align: center; font-size: 10pt; font-weight: 900; border-right: 1.2px solid #cbd5e1; white-space: nowrap; color: #0f284e;">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 4
              </td>
            </tr>

            <!-- KT3.4: Simpson, Lister & Surgery -->
            <tr style="border-bottom: 1px dashed #cbd5e1;">
              <td rowspan="2" style="padding: 12px 6px; text-align: center; font-weight: 900; font-size: 9.5pt; border-right: 1.2px solid #cbd5e1; background: #f0f4f9; color: #0f284e; vertical-align: middle;">
                KT3.4
              </td>
              <td style="padding: 13px 10px; font-weight: 600; line-height: 1.35; border-right: 1.2px solid #cbd5e1; font-size: 8.2pt; color: #0f284e;">
                <strong>Q4:</strong> Explain Why Surgery Became Safer c1840–c1900
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
                <strong>Q3:</strong> Explain One Similarity in Surgery (Medieval vs Pre-1846)
              </td>
              <td style="padding: 13px 6px; text-align: center; font-weight: 800; font-size: 8.5pt; border-right: 1.2px solid #cbd5e1; white-space: nowrap; color: #0f284e;">
                p. 15
              </td>
              <td style="padding: 13px 6px; text-align: center; font-size: 10pt; font-weight: 900; border-right: 1.2px solid #cbd5e1; white-space: nowrap; color: #0f284e;">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 4
              </td>
            </tr>

            <!-- KT3.5: John Snow & Public Health -->
            <tr style="border-bottom: 1px dashed #cbd5e1;">
              <td rowspan="2" style="padding: 12px 6px; text-align: center; font-weight: 900; font-size: 9.5pt; border-right: 1.2px solid #cbd5e1; background: #f0f4f9; color: #0f284e; vertical-align: middle;">
                KT3.5
              </td>
              <td style="padding: 13px 10px; font-weight: 600; line-height: 1.35; border-right: 1.2px solid #cbd5e1; font-size: 8.2pt; color: #0f284e;">
                <strong>Q5/6:</strong> Evaluative Essay on John Snow &amp; 1875 Public Health Act
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
                <strong>Q3:</strong> Explain One Difference in Public Health Action (1848 vs 1875)
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
                Key Topic 3 Cumulative Examination Assessment Portfolio (10 Tasks)
              </td>
              <td style="padding: 12px 6px; text-align: center; font-weight: 800; font-size: 8.5pt; border-right: 1.2px solid #cbd5e1; color: #0f284e;">
                p. 4–18
              </td>
              <td style="padding: 12px 6px; text-align: center; font-size: 11pt; font-weight: 900; border-right: 1.2px solid #cbd5e1; white-space: nowrap; color: #0f284e;">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 88
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
          ${eighteenthNineteenthConfigs
            .map((cfg, idx) => {
              const lessonUrl = `https://the-history-revision-hub.netlify.app/?unit=edexcel_medicine&lesson=${cfg.id}&view=lessons`;
              const quizUrl = `https://the-history-revision-hub.netlify.app/?unit=edexcel_medicine&lesson=${cfg.id}&quiz=true`;
              const lessonQrSvg = generateQrSvg(lessonUrl);
              const quizQrSvg = generateQrSvg(quizUrl);
              const shortLabels = [
                'Pasteur & Koch',
                'Edward Jenner',
                'F. Nightingale',
                'Simpson & Lister',
                'Snow & 1875 Act',
              ];
              return `
          <div style="border: 1.2px solid #0f284e; border-radius: 3px; padding: 4px 3px; background: #ffffff; display: flex; flex-direction: column; align-items: center; justify-content: space-between;">
            <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 900; text-transform: uppercase; margin-bottom: 1px; color: #0f284e;">
              KT3.${cfg.lessonNum}
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

      ${renderFooterStrip(20, 'Sanitation, antiseptics, and vaccinations conquered disease; retrieval practice will conquer your GCSE exam.', 20)}
    </div>
  </div>
</body>
</html>
`;

  return html;
}

async function main() {
  console.log(
    'Rendering 20-Page A4 Pupil Workbook (Dual QR & Assessment Portfolio): Key Topic 3: 18th & 19th Century Britain (c1700–c1900)...',
  );
  const puppeteer = require('puppeteer');
  const customHtml = build18th19thTwoPageWorkbook({}, {});

  const unitDir = path.resolve(__dirname, '../units/edexcel_medicine');
  const publicUnitDir = path.resolve(__dirname, '../public/units/edexcel_medicine');
  const pdfsDir = path.resolve(__dirname, '../public/pdfs');

  const unitHtmlPath = path.join(unitDir, 'pupil_workbook_18th_19th.html');
  const pubHtmlPath = path.join(publicUnitDir, 'pupil_workbook_18th_19th.html');
  const outPdfPath = path.join(pdfsDir, 'edexcel_medicine_pupil_workbook_18th_19th_FINAL_V17.pdf');
  const pubPdfCopy = path.join(publicUnitDir, 'pupil_workbook_18th_19th.pdf');

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

  const outPdfStandardPath = path.join(pdfsDir, 'edexcel_medicine_pupil_workbook_18th_19th.pdf');
  fs.copyFileSync(outPdfPath, outPdfStandardPath);
  console.log(`[OK] PDF standard copy written: ${outPdfStandardPath}`);
}

if (require.main === module) {
  main().catch((err) => {
    console.error('❌ Error compiling 18th-19th Century workbook:', err);
    process.exit(1);
  });
}

module.exports = {
  build18th19thTwoPageWorkbook,
  eighteenthNineteenthConfigs,
};
