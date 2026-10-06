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
    tariff: 'Question 4: Explain Why [12 marks &bull; 15 mins]',
    examStem:
      'Explain why there was rapid progress in understanding the causes of disease in the period c1860–c1890. [12 marks]',
    stimulus: ["Louis Pasteur's Germ Theory (1861)", "Robert Koch's work on bacteria"],
    timelineMission:
      'Turn to Pages 2–3 (Key Topic 3.1). In the drawing box, sketch Pasteur’s swan-neck flask experiment and Koch’s agar plate. Annotate how identifying specific bacteria ended miasma theory forever!',
    fourMark: {
      type: 'Difference',
      question:
        'Explain one way in which ideas about the cause of disease in the late nineteenth century (c1860–c1890) were different from ideas in the Renaissance (c1500–c1700). [4 marks]',
      hint: 'Contrast Pasteur and Koch’s laboratory discovery that specific microbes cause disease with the persistent Renaissance belief in miasma and spontaneous generation.',
      stems:
        'One way ideas about causes differed was... &bull; In the Renaissance period (c1500–c1700)... &bull; In contrast, in the late nineteenth century, Pasteur and Koch...',
    },
    leftPageQuip:
      '<em>Pasteur proved that rotting soup doesn’t spontaneously create germs; Koch proved which specific germs caused tuberculosis.</em>',
    rightPageQuip:
      '<em>Robert Koch photographed bacteria so clearly that British doctors could no longer blame bad smells for tuberculosis.</em>',
    linedLeftQuip:
      '<em>Pasteur proved microbes cause decay (1861); Koch proved specific bacteria cause specific diseases (1876–83).</em>',
    linedRightQuip:
      '<em>Structure your causal argument: demonstrate how Koch built directly upon Pasteur’s Germ Theory to revolutionize diagnosis.</em>',
    stages: [
      {
        dates: 'c1700–1850s',
        title: 'Spontaneous Generation & Miasma',
        bullets: [
          'Miasma: airborne decay blamed for disease',
          'Spontaneous generation: rotting creates microbes',
          'Animalcules observed without disease link',
          'Anti-contagionist medical orthodoxy',
        ],
        focusClue: 'Why did doctors believe disease created germs, rather than vice versa?',
      },
      {
        dates: '1861',
        title: 'Louis Pasteur & Germ Theory',
        bullets: [
          'Investigates beer & wine souring in Lille',
          'Swan-neck flask traps airborne dust',
          'Microbes cause decay and fermentation',
          '1861: Publishes Germ Theory of decay',
        ],
        focusClue: 'How did the swan-neck flask disprove spontaneous generation?',
      },
      {
        dates: '1867–1876',
        title: 'British Scepticism & John Tyndall',
        bullets: [
          'Dr Charlton Bastian defends miasma theory',
          'Pasteur dismissed in Britain as "mere chemist"',
          '1876: Tyndall lectures on dust and germs',
          'Joseph Lister applies theory to carbolic spray',
        ],
        focusClue: 'Why did British doctors refuse to believe germs caused human illness?',
      },
      {
        dates: '1876–1882',
        title: 'Robert Koch & Specific Bacteria',
        bullets: [
          '1876: Isolates specific anthrax bacillus',
          'Agar jelly grows pure bacterial cultures',
          'Methyl violet industrial dye stains bacteria',
          '1882: Discovers Mycobacterium tuberculosis',
        ],
        focusClue: "How did Koch's staining and culture methods prove specificity?",
      },
      {
        dates: '1883–1890',
        title: 'Postulates & Microphotography',
        bullets: [
          '1883: Identifies cholera microbe in Egypt/India',
          'High-resolution photomicrography proves facts',
          '4 Postulates: scientific gold standard',
          'Permanent scientific defeat of miasma theory',
        ],
        focusClue: 'Why was photomicrography crucial in winning British doctors over?',
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
    tariff: 'Question 5/6: Evaluative Essay [16+4 marks &bull; 20 mins]',
    examStem:
      '‘Edward Jenner’s development of the smallpox vaccine was the most significant breakthrough in the prevention of disease in the period c1700–c1900.’ How far do you agree? [16+4 marks]',
    stimulus: ['Inoculation', 'The Public Health Act (1875)'],
    timelineMission:
      'Turn to Pages 2–3 (Key Topic 3.2). In the drawing box, sketch Jenner inoculating James Phipps with cowpox. Annotate how this empirical experiment laid the foundation for modern immunology!',
    fourMark: {
      type: 'Difference',
      question:
        'Explain one way in which methods of preventing smallpox in the late eighteenth century were different from methods used in the seventeenth century. [4 marks]',
      hint: 'Contrast Edward Jenner’s safe cowpox vaccination (1796) with earlier seventeenth-century reliance on prayer, quarantine, and risky smallpox inoculation (variolation).',
      stems:
        'One way prevention of smallpox differed was... &bull; In the seventeenth century... &bull; In contrast, in the late eighteenth century, Edward Jenner...',
    },
    leftPageQuip:
      '<em>Cartoons showed vaccinated people growing cow heads and horns: proof that anti-vax memes existed long before social media.</em>',
    rightPageQuip:
      '<em>Jenner saved millions with cowpox, yet died before anyone could explain what a virus actually was.</em>',
    linedLeftQuip:
      '<em>Contrast Jenner’s empirical cowpox observation with Pasteur and Koch’s laboratory bacteriology a century later.</em>',
    linedRightQuip:
      '<em>Balance Jenner’s individual genius against the necessity of state legislation: vaccination only conquered smallpox when made compulsory in 1852.</em>',
    stages: [
      {
        dates: '1721–1795',
        title: 'Smallpox & Inoculation',
        bullets: [
          'Smallpox killed 40,000+ Britons each year',
          'Lady Montagu introduced Turkish variolation',
          'Inoculation risked triggering deadly epidemics',
          'Suttonian commercial method charged high fees',
        ],
        focusClue: 'Why was inoculation dangerous for poor urban communities?',
      },
      {
        dates: '1796–1798',
        title: 'Edward Jenner & The Cowpox Vaccine',
        bullets: [
          'Gloucestershire dairy milkmaids immune to smallpox',
          'May 1796: Inoculates James Phipps with cowpox',
          'July 1796: Variolates Phipps—no smallpox develops',
          '1798: Publishes empirical findings at own expense',
        ],
        focusClue: 'How did Jenner use scientific experimentation to test folklore?',
      },
      {
        dates: '1798–1810s',
        title: 'Medical & Religious Opposition',
        bullets: [
          'Royal Society refuses to publish Jenner’s paper',
          'Dr Woodville uses contaminated hospital needles',
          'Clergy condemn injecting beast matter into humans',
          'Anti-vaccine cartoons depict cow heads sprouting',
        ],
        focusClue: 'Why did London doctors and church leaders resist vaccination?',
      },
      {
        dates: '1802–1840',
        title: 'Parliamentary Funding & Adoption',
        bullets: [
          '1802 & 1807: Parliament grants Jenner £30,000',
          'Napoleon vaccinates entire French grand army',
          '1808: Royal Jennerian Society founded',
          '1840: Vaccination Act bans dangerous inoculation',
        ],
        focusClue: 'Why did the British government abandon laissez-faire for vaccination?',
      },
      {
        dates: '1852–1871',
        title: 'Compulsory Acts & Anti-Vaccine League',
        bullets: [
          '1852: Vaccination made compulsory for all infants',
          '1871: Vaccination officers enforce mandatory fines',
          'Anti-Vaccination League marches for civil liberty',
          'Jenner’s limit: unable to explain viral mechanism',
        ],
        focusClue: 'Why did making vaccination compulsory spark fierce public protests?',
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
    tariff: 'Question 4: Explain Why [12 marks &bull; 15 mins]',
    examStem:
      'Explain why the standard of hospital care and nursing improved so significantly in the second half of the nineteenth century. [12 marks]',
    stimulus: ["Florence Nightingale's work in the Crimea (1854–56)", 'The pavilion hospital plan'],
    timelineMission:
      'Turn to Pages 2–3 (Key Topic 3.3). In the drawing box, sketch the Pavilion Hospital plan with its separate, ventilated pavilions. Annotate how cross-ventilation prevented hospital gangrene!',
    fourMark: {
      type: 'Difference',
      question:
        'Explain one way in which hospital care in the late nineteenth century was different from hospital care in the Medieval period. [4 marks]',
      hint: 'Contrast Florence Nightingale’s sanitary pavilion hospitals staffed by trained nurses providing medical cure with medieval monastic hospitals offering spiritual care and rest (‘care not cure’).',
      stems:
        'One way hospital care differed was... &bull; In the Medieval period, hospitals... &bull; In contrast, in the late nineteenth century, Florence Nightingale...',
    },
    leftPageQuip:
      '<em>Nightingale believed miasma caused disease, yet her obsession with fresh air, scrubbing, and clean drains saved thousands of lives.</em>',
    rightPageQuip:
      '<em>Florence Nightingale proved that clean sheets, fresh soup, and opening windows were deadlier to infection than any Victorian medicine.</em>',
    linedLeftQuip:
      '<em>Nightingale transformed nursing from Dickensian drunken disrepute into a disciplined, respected medical profession.</em>',
    linedRightQuip:
      '<em>Explain how architectural design (pavilion wards) worked in tandem with trained matrons to drive down hospital mortality.</em>',
    stages: [
      {
        dates: 'c1700–1850',
        title: 'Voluntary Hospitals & Pre-Modern Nursing',
        bullets: [
          'Voluntary hospitals funded by private charity',
          'Shifted from religious rest to medical treatment',
          'Nurses untrained, illiterate, paid less than servants',
          'Dickensian "Sairey Gamp" stereotype: drunk and dirty',
        ],
        focusClue: 'Why were early Victorian hospital wards notorious death traps?',
      },
      {
        dates: '1854–1856',
        title: 'Scutari & The Crimean War',
        bullets: [
          'Sidney Herbert sends Nightingale and 38 nurses',
          'Scutari built over open sewers; filth, typhus, cholera',
          'Scrubbed wards, clean linen, nutritious food, drains',
          'Mortality rate plunged from 42% to under 2%',
        ],
        focusClue: 'How did Nightingale’s sanitary reforms drastically cut the death rate?',
      },
      {
        dates: '1859',
        title: 'Notes on Nursing & Sanitary Science',
        bullets: [
          '1859: Publishes bestselling *Notes on Nursing*',
          'Insists on light, fresh air, warmth, cleanliness, diet',
          'Believed in miasma; hygiene worked despite wrong theory',
          'Used polar area pie charts to convince MPs',
        ],
        focusClue: 'Why did Nightingale’s belief in miasma still produce effective hygiene?',
      },
      {
        dates: '1860s',
        title: 'The Pavilion Plan Hospital Design',
        bullets: [
          'Rebuilt hospitals (e.g. St Thomas’ Hospital, London)',
          'Separate ward blocks to isolate infectious diseases',
          'High ceilings, large cross-ventilating windows',
          'Glazed, washable wall tiles to prevent filth build-up',
        ],
        focusClue: 'How did the pavilion plan prevent cross-infection between wards?',
      },
      {
        dates: '1860–1890s',
        title: 'Professional Nurse Training & Asepsis',
        bullets: [
          '1860: Nightingale Training School at St Thomas’',
          'Nursing established as respected middle-class career',
          'Matrons enforced strict hygiene and moral discipline',
          'Late 19th c.: Germ Theory fused with nursing hygiene',
        ],
        focusClue: 'How did nurse training permanently raise the standard of hospital care?',
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
    tariff: 'Question 4: Explain Why [12 marks &bull; 15 mins]',
    examStem:
      'Explain why surgery became significantly safer in the period c1840–c1900. [12 marks]',
    stimulus: [
      "James Simpson's discovery of chloroform (1847)",
      "Joseph Lister's use of carbolic acid (1865)",
    ],
    timelineMission:
      'Turn to Pages 2–3 (Key Topic 3.4). In the drawing box, sketch Lister’s carbolic donkey engine spraying mist over an open wound. Annotate the difference between antiseptic and aseptic surgery!',
    fourMark: {
      type: 'Similarity',
      question:
        'Explain one way in which surgical operations in the early nineteenth century (before 1846) were similar to surgery in the Medieval period. [4 marks]',
      hint: 'Focus on the absolute necessity of raw surgical speed (e.g. Liston’s 28-second amputations) and physical restraint, as effective chemical anaesthetics had not yet been discovered.',
      stems:
        'One way surgical operations were similar was... &bull; In the Medieval period... &bull; Similarly, in the early nineteenth century before 1846...',
    },
    leftPageQuip:
      '<em>Chloroform conquered pain, but Lister conquered the invisible enemy: the rotting microbes thriving on surgeons’ unwashed hands.</em>',
    rightPageQuip:
      '<em>Surgeons used to take pride in blood-caked frock coats; Lister forced them to wash their hands and operate in carbolic acid mist.</em>',
    linedLeftQuip:
      '<em>The "Black Period" of surgery proved that removing pain alone was dangerous until antisepsis solved internal infection.</em>',
    linedRightQuip:
      '<em>Trace the surgical progression: from Liston’s raw speed, to Simpson’s chloroform, to Lister’s carbolic spray, to Koch’s steam sterilisation.</em>',
    stages: [
      {
        dates: 'c1700–1846',
        title: 'Pre-Anaesthetic Surgery: Speed & Shock',
        bullets: [
          'Patients held down; trauma and shock caused heart failure',
          'Surgeons prized raw speed (Liston: 28-second amputation)',
          '1799: Humphry Davy discovers laughing gas',
          '1846: William Morton demonstrates ether in Boston',
        ],
        focusClue: 'Why was surgical speed essential before the discovery of anaesthetics?',
      },
      {
        dates: '1847–1853',
        title: 'James Simpson & Chloroform',
        bullets: [
          'Nov 1847: Simpson discovers chloroform at dinner',
          'Relieved agony of childbirth; safer than volatile ether',
          '1848: Hannah Greener dies from fatal overdose',
          '1853: Queen Victoria uses chloroform for Prince Leopold',
        ],
        focusClue: 'Why did the death of Hannah Greener cause panic among surgeons?',
      },
      {
        dates: '1846–1865',
        title: 'The "Black Period" of Surgery',
        bullets: [
          'Anaesthetics allowed surgeons to operate deeper & longer',
          'Surgeons wore pus-stained frock coats as badges of pride',
          'Unwashed hands and catgut ligatures introduced germs',
          'Hospital gangrene and sepsis mortality surged dramatically',
        ],
        focusClue: 'Why did conquering surgical pain lead to higher patient death rates?',
      },
      {
        dates: '1865–1870s',
        title: 'Joseph Lister & Carbolic Acid Spray',
        bullets: [
          'Lister reads Pasteur; links cattle sewage treatment to wounds',
          '1865: Uses carbolic acid on Jamie Greenlees’ compound fracture',
          'Glasgow Infirmary amputee mortality drops from 46% to 15%',
          '1867: Publishes antiseptic technique in *The Lancet*',
        ],
        focusClue: 'How did Lister apply Germ Theory to solve hospital gangrene?',
      },
      {
        dates: '1880s–1890s',
        title: 'From Antiseptic to Aseptic Surgery',
        bullets: [
          'Antiseptic: kills germs present (carbolic cracked hands)',
          'Aseptic: excludes all microbes from operating theatre',
          '1881: Robert Koch invents high-pressure steam sterilizer',
          '1890s: Rubber gloves (Halsted), surgical masks, sterile gowns',
        ],
        focusClue: 'What is the crucial difference between antiseptic and aseptic surgery?',
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
    tariff: 'Question 5/6: Evaluative Essay [16+4 marks &bull; 20 mins]',
    examStem:
      '‘The work of John Snow was the main reason for improvements in public health in the nineteenth century.’ How far do you agree? [16+4 marks]',
    stimulus: ['Edwin Chadwick’s 1842 Report', 'The Public Health Act (1875)'],
    timelineMission:
      'Turn to Pages 2–3 (Key Topic 3.5). In the drawing box, sketch John Snow’s Broad Street pump map and Bazalgette’s sewer network. Annotate how cholera forced Parliament to abandon laissez-faire!',
    fourMark: {
      type: 'Difference',
      question:
        'Explain one way in which government action on public health in the late nineteenth century was different from government action in the Renaissance. [4 marks]',
      hint: 'Contrast the compulsory 1875 Public Health Act forcing local councils to provide clean water and sewers with Renaissance monarchs who only took temporary, reactive emergency measures during plague outbreaks.',
      stems:
        'One way government action differed was... &bull; In the Renaissance period... &bull; In contrast, under the 1875 Public Health Act, the government...',
    },
    leftPageQuip:
      '<em>Snow removed the Broad Street pump handle in 1854, proving cholera was water-borne seven years before Germ Theory.</em>',
    rightPageQuip:
      '<em>John Snow solved cholera with a street map and a wrench, proving forensic detective work is as powerful as a microscope.</em>',
    linedLeftQuip:
      '<em>Snow established waterborne transmission in 1854, but it took the Great Stink of 1858 and the 1867 Reform Act to compel government action.</em>',
    linedRightQuip:
      '<em>Weigh Snow’s epidemiological genius against Chadwick’s sanitary report, Bazalgette’s sewers, and Disraeli’s compulsory 1875 Act.</em>',
    stages: [
      {
        dates: '1831–1848',
        title: 'Epidemic Terror & Edwin Chadwick',
        bullets: [
          '1831: First cholera epidemic kills 50,000 Britons',
          'Violent vomiting, diarrhoea, blue skin; death within hours',
          '1842: Edwin Chadwick links filth to poverty and disease',
          '1848: Public Health Act creates local health boards (optional)',
        ],
        focusClue: 'Why did towns refuse to set up health boards under the 1848 Act?',
      },
      {
        dates: '1854',
        title: 'John Snow & The Broad Street Pump',
        bullets: [
          'August 1854: Severe cholera strikes Soho (500 die in 10 days)',
          'Snow plots deaths on spot map; clusters around Broad St pump',
          'Brewery workers drank beer, had private well—0 deaths',
          'Convinces parish vestry to remove the pump handle',
        ],
        focusClue: 'How did Snow use epidemiological mapping to prove water transmission?',
      },
      {
        dates: '1854–1858',
        title: 'Board of Health & Miasma Orthodoxy',
        bullets: [
          'General Board of Health and *The Lancet* reject Snow',
          'Orthodoxy claimed cholera arose from foul cesspool miasma',
          'Snow lacked bacteriological proof (Koch found cholera in 1883)',
          'Cesspool leaking into pump well discovered too late',
        ],
        focusClue: 'Why did the medical establishment refuse to accept Snow’s water theory?',
      },
      {
        dates: '1858–1865',
        title: 'The Great Stink & Bazalgette’s Sewers',
        bullets: [
          'Summer 1858: Unbearable Thames stench closes Parliament',
          'MPs fear miasma; fund Joseph Bazalgette’s sewer network',
          '1,300 miles of underground sewers divert waste to Thames estuary',
          '1866: East London is only area to get cholera (unconnected)',
        ],
        focusClue: 'Why did fear of miasma paradoxically save thousands from cholera?',
      },
      {
        dates: '1875',
        title: 'The 1875 Public Health Act: End of Laissez-Faire',
        bullets: [
          '1867 Reform Act gives working-class men the vote',
          'Disraeli’s government passes landmark 1875 Public Health Act',
          'Compulsory: clean piped water, sewers, street cleaning, food checks',
          'Each council required to appoint a Medical Officer of Health',
        ],
        focusClue: 'Why was the 1875 Act the definitive death blow to laissez-faire?',
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

      <!-- Unit Title & Subtitle Banner -->
      <div style="text-align: center; margin-bottom: 8px;">
        <span style="display: inline-block; font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 900; letter-spacing: 1.5px; text-transform: uppercase; border: 1.5px solid #000000; padding: 2px 10px; border-radius: 3px; margin-bottom: 4px;">
          KEY TOPIC 3 &bull; REVISION &amp; PRACTICE COMPANION
        </span>
        <h1 style="font-family: 'Playfair Display', serif; font-size: 20pt; font-weight: 900; color: #000000; margin: 4px 0 2px 0; line-height: 1.15; letter-spacing: -0.5px;">
          Medicine in 18th &amp; 19th Century Britain
        </h1>
        <p style="font-family: 'Georgia', serif; font-size: 9pt; color: #222222; margin: 0; font-style: italic;">
          c1700–c1900: Ideas on Causes, Prevention, Hospital Care, Surgery &amp; Public Health
        </p>
      </div>

      <!-- Prominent Primary Visual Source Centerpiece (Base64 Inlined, Authentic Provenance) -->
      <div style="margin: 2px 0 5px 0; border: 1.5px solid #000000; border-radius: 4px; overflow: hidden; background: #ffffff;">
        <img src="${coverImgBase64}" alt="James Gillray, The Cow-Pock—or—the Wonderful Effects of the New Inoculation! (1802)" style="width: 100%; height: 93.5mm; object-fit: cover; object-position: center 30%; display: block; margin: 0 auto; filter: grayscale(100%);">
        <div style="display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #000000; padding: 3px 8px; border-top: 1.5px solid #000000; background: #ffffff;">
          <span><strong>Primary Visual Evidence:</strong> James Gillray, <em>The Cow-Pock—or—the Wonderful Effects of the New Inoculation!</em> (1802 satirical cartoon satirising public fears of Edward Jenner's cowpox vaccine)</span>
          <span style="font-weight: 700; white-space: nowrap; margin-left: 8px;">HISTORICAL SATIRE ARCHIVE</span>
        </div>
      </div>

      <!-- Pupil Identification & Target Setting Box -->
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
          <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #000000; text-transform: uppercase; margin-right: 8px;">Class:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #000000; height: 12px;"></div>
        </div>
      </div>

      <!-- Official Edexcel Specification Structure & Retrieval Tracker Table -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; overflow: hidden; margin-bottom: 4px;">
        <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif; font-size: 8pt;">
          <thead>
            <tr style="background: #000000; color: #ffffff; text-transform: uppercase; letter-spacing: 0.5px;">
              <th style="padding: 4px 8px; text-align: left; width: 78%; font-size: 7.5pt; font-weight: 800;">
                Key Topic 3 Specification Framework (1HI0/11)
              </th>
              <th style="padding: 4px 8px; text-align: center; width: 11%; font-size: 7.5pt; font-weight: 800; border-left: 1px solid #444444;">
                Lesson Done
              </th>
              <th style="padding: 4px 8px; text-align: center; width: 11%; font-size: 7.5pt; font-weight: 800; border-left: 1px solid #444444;">
                Quiz [10]
              </th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 18.5px 10px; border-right: 1.2px solid #000000;">
                <div style="font-size: 8.8pt; font-weight: 800; color: #000000; line-height: 1.25;">
                  Key Topic 3.1: Ideas on Causes: Pasteur’s Germ Theory &amp; Koch’s Bacteriology
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 8pt; font-style: italic; color: #333333; margin-top: 1.5px; line-height: 1.25;">
                  How did swan-neck flasks (1861) and agar cultures (1876–83) demolish spontaneous generation?
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
              <td style="padding: 18.5px 10px; border-right: 1.2px solid #000000;">
                <div style="font-size: 8.8pt; font-weight: 800; color: #000000; line-height: 1.25;">
                  Key Topic 3.2: Approaches to Prevention: Edward Jenner &amp; The Smallpox Vaccine
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 8pt; font-style: italic; color: #333333; margin-top: 1.5px; line-height: 1.25;">
                  How did the 1796 cowpox experiment defeat variolation, and why did opposition persist until 1852?
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
              <td style="padding: 18.5px 10px; border-right: 1.2px solid #000000;">
                <div style="font-size: 8.8pt; font-weight: 800; color: #000000; line-height: 1.25;">
                  Key Topic 3.3: Improvements in Hospital Care: Florence Nightingale &amp; Professional Nursing
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 8pt; font-style: italic; color: #333333; margin-top: 1.5px; line-height: 1.25;">
                  How did Scutari (1854–56), Notes on Nursing (1859), and the pavilion plan transform Victorian mortality?
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
              <td style="padding: 18.5px 10px; border-right: 1.2px solid #000000;">
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
              <td style="padding: 18.5px 10px; border-right: 1.2px solid #000000;">
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
      title: 'Edward Jenner: Smallpox Vaccination & Immunology',
      kt: 'Key Topic 3.2',
      desc: 'Jenner inoculates James Phipps with cowpox pus from Sarah Nelmes, proving cowpox confers immunity against smallpox. Publishes findings in 1798. Despite initial Royal Society scepticism, vaccination eradicates inoculator infection risks and founds immunology.',
    },
    {
      year: '1847',
      title: 'James Young Simpson: Chloroform & Anesthesia',
      kt: 'Key Topic 3.4',
      desc: 'Simpson discovers the potent anaesthetic properties of chloroform in Edinburgh, ending agony during surgery. Queen Victoria’s use of chloroform during childbirth (1853) popularises it, enabling complex operations despite the initial ‘Black Period’ of surgery.',
    },
    {
      year: '1848',
      title: 'First Public Health Act & The General Board of Health',
      kt: 'Key Topic 3.5',
      desc: 'Spurred by Chadwick’s 1842 report and epidemic cholera, Parliament passes the permissive 1848 Act. Towns can create local boards of health to supply clean water and drainage, though lack of compulsion leaves most cities vulnerable to filth and contagion.',
    },
    {
      year: '1854',
      title: 'John Snow: Broad Street Pump & Waterborne Cholera',
      kt: 'Key Topic 3.5',
      desc: 'During the Soho epidemic, Snow compiles his famous spot map linking 500+ fatal cholera cases to the Broad Street pump. Removing the handle immediately halts the outbreak, mathematically disproving the miasma theory seven years before Pasteur’s Germ Theory.',
    },
  ];

  const timelineMilestonesRight = [
    {
      year: '1854–56',
      title: 'Florence Nightingale: Hospital Sanitation at Scutari',
      kt: 'Key Topic 3.3',
      desc: 'During the Crimean War, Nightingale enforces rigorous cleanliness, ventilation, and fresh nutrition at Scutari hospital, slashing soldier death rates from 40% to 2%. Returns to Britain to establish the Nightingale Training School and author Notes on Nursing (1859).',
    },
    {
      year: '1861',
      title: 'Louis Pasteur: Germ Theory & Swan-Neck Flask Experiments',
      kt: 'Key Topic 3.1',
      desc: 'Commissioned by Lille brewers, Pasteur disproves spontaneous generation using swan-neck flasks, demonstrating that airborne microbes cause fermentation and decay. In 1861, he publishes Germ Theory, proving microscopic germs cause specific diseases in living organisms.',
    },
    {
      year: '1865–67',
      title: 'Joseph Lister: Carbolic Acid Spray & Antiseptic Surgery',
      kt: 'Key Topic 3.4',
      desc: 'Applying Pasteur’s Germ Theory to wound sepsis, Lister uses carbolic acid sprays, dressings, and hand-washing during surgery at Glasgow Infirmary. His antiseptic techniques reduce amputee mortality from 46% to 15%, paving the way for modern aseptic operating theatres.',
    },
    {
      year: '1875',
      title: 'The Second Public Health Act: End of Laissez-Faire',
      kt: 'Key Topic 3.5',
      desc: 'Disraeli’s government ends laissez-faire by making public health compulsory. Municipal councils are legally required to provide clean piped water, subterranean sewer drainage, street lighting, and medical officers of health, transforming urban life expectancy.',
    },
  ];

  // PAGE 2 (Timeline Verso: 1700–1854)
  html += `
  <div class="page page-container" id="page-2" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div>
        <div style="border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 6px;">
          <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 11pt; color: #000000; text-transform: uppercase; font-weight: 800;">
            Living Timeline &bull; Part 1: Vaccines, Anaesthetics &amp; Early Sanitation (1700–1854)
          </h2>
        </div>

        <div style="border-bottom: 1px solid #000000; padding-bottom: 4px; margin-bottom: 8px; font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #000000;">
          <strong>Instructions:</strong> Complete the timeline sketches and notes as you master each enquiry lesson.
        </div>
      </div>

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

      ${renderFooterStrip(2, 'The 18th century relied on empirical observation; the 19th century unlocked the laboratory.')}
    </div>
  </div>
`;

  // PAGE 3 (Timeline Recto: 1854–1900)
  html += `
  <div class="page page-container" id="page-3" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div>
        <div style="border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 6px;">
          <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 11pt; color: #000000; text-transform: uppercase; font-weight: 800;">
            Living Timeline &bull; Part 2: Germ Theory, Antiseptics &amp; Compulsory Public Health (1854–1900)
          </h2>
        </div>

        <div style="border-bottom: 1px solid #000000; padding-bottom: 4px; margin-bottom: 8px; font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #000000;">
          <strong>Instructions:</strong> Complete the timeline sketches and notes as you master each enquiry lesson.
        </div>
      </div>

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

      ${renderFooterStrip(3, 'Pasteur opened the door; Lister, Koch, and Bazalgette marched through it.')}
    </div>
  </div>
`;

  // ====================================================================
  // PAGES 4–23: 5 DEDICATED 4-PAGE MODULES
  // Page 1: 5-Stage Chronological Inquiry Spine
  // Page 2: Exam Question + 28 flex task lines
  // Page 3: Lined Grid (28 lines)
  // Page 4: Lined Grid (28 lines)
  // ====================================================================
  eighteenthNineteenthConfigs.forEach((cfg) => {
    const leftPageNum = (cfg.lessonNum - 1) * 4 + 4;
    const rightPageNum = (cfg.lessonNum - 1) * 4 + 5;
    const linedLeftPageNum = (cfg.lessonNum - 1) * 4 + 6;
    const linedRightPageNum = (cfg.lessonNum - 1) * 4 + 7;

    // PAGE 1 OF MODULE: CHRONOLOGICAL INQUIRY SPINE
    html += renderSpinePage({ ...cfg, pageNum: leftPageNum });

    // PAGE 2 OF MODULE: EXAM QUESTION (STEM, STIMULUS, 28 FLEX TASK LINES, TIMELINE MISSION)
    const flexTaskLines = Array.from(
      { length: 28 },
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
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #000000; padding-bottom: 3px;">
        <div data-department-name="The History Department">
          <span style="font-family: 'Inter', sans-serif; font-size: 10pt; font-weight: 900; color: #000000; text-transform: uppercase; letter-spacing: 0.8px;">
            <span class="school-brand-target">The History Department</span>
          </span>
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 8.5pt; font-weight: 700; color: #000000;">
          KEY TOPIC 3 ASSESSMENT RECORD &bull; c1700–c1900
        </div>
      </div>

      <!-- Student Target Grade Strip -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 6px 12px; background: #ffffff; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 16px; align-items: center;">
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #000000; text-transform: uppercase; margin-right: 8px;">Pupil Name:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #000000; height: 14px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #000000; text-transform: uppercase; margin-right: 8px;">Target:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #000000; height: 14px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #000000; text-transform: uppercase; margin-right: 8px;">Current Grade:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #000000; height: 14px;"></div>
        </div>
      </div>

      <!-- Expanded Key Topic 3 Assessment Record Table (10 Questions + Cumulative Total) -->
      <div style="border: 2px solid #000000; border-radius: 4px; overflow: hidden; margin-bottom: 4px;">
        <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif;">
          <thead>
            <tr style="background: #000000; color: #ffffff; text-transform: uppercase; letter-spacing: 0.5px;">
              <th style="padding: 7px 6px; text-align: center; width: 8%; font-size: 7.8pt; font-weight: 800;">Enquiry</th>
              <th style="padding: 7px 10px; text-align: left; width: 36%; font-size: 7.8pt; font-weight: 800; border-left: 1px solid #444444;">Assessment Component Focus</th>
              <th style="padding: 7px 6px; text-align: center; width: 7%; font-size: 7.8pt; font-weight: 800; border-left: 1px solid #444444;">Page</th>
              <th style="padding: 7px 6px; text-align: center; width: 12%; font-size: 7.8pt; font-weight: 800; border-left: 1px solid #444444;">Score</th>
              <th style="padding: 7px 10px; text-align: left; width: 37%; font-size: 7.8pt; font-weight: 800; border-left: 1px solid #444444;">Teacher Comment &amp; Next Steps</th>
            </tr>
          </thead>
          <tbody>
            <!-- KT3.1: Pasteur & Koch -->
            <tr style="border-bottom: 1px dashed #d1d5db;">
              <td rowspan="2" style="padding: 12px 6px; text-align: center; font-weight: 900; font-size: 9.5pt; border-right: 1.5px solid #000000; background: #f8fafc; vertical-align: middle;">
                KT3.1
              </td>
              <td style="padding: 13px 10px; font-weight: 600; line-height: 1.35; border-right: 1.5px solid #000000; font-size: 8.2pt;">
                <strong>Q4:</strong> Explain Why Rapid Progress in Causes c1860–c1890
              </td>
              <td style="padding: 13px 6px; text-align: center; font-weight: 800; font-size: 8.5pt; border-right: 1.5px solid #000000; white-space: nowrap;">
                p. 5–7
              </td>
              <td style="padding: 13px 6px; text-align: center; font-size: 10pt; font-weight: 900; border-right: 1.5px solid #000000; white-space: nowrap;">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 12
              </td>
              <td rowspan="2" style="padding: 10px 10px; vertical-align: top; font-size: 8pt; background: #ffffff;">
                <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #777777; font-weight: 700; text-transform: uppercase; margin-bottom: 4px;">
                  Marking Feedback &bull; Targets:
                </div>
                <div style="display: flex; flex-direction: column; justify-content: space-around; height: 19mm;">
                  <div style="border-bottom: 1px dotted #d1d5db; height: 6mm;"></div>
                  <div style="border-bottom: 1px dotted #d1d5db; height: 6mm;"></div>
                  <div style="border-bottom: 1px dotted #d1d5db; height: 6mm;"></div>
                </div>
              </td>
            </tr>
            <tr style="border-bottom: 2px solid #000000;">
              <td style="padding: 13px 10px; font-weight: 600; line-height: 1.35; border-right: 1.5px solid #000000; font-size: 8.2pt;">
                <strong>Q3:</strong> Explain One Difference (Causes: c1700 vs c1900)
              </td>
              <td style="padding: 13px 6px; text-align: center; font-weight: 800; font-size: 8.5pt; border-right: 1.5px solid #000000; white-space: nowrap;">
                p. 7
              </td>
              <td style="padding: 13px 6px; text-align: center; font-size: 10pt; font-weight: 900; border-right: 1.5px solid #000000; white-space: nowrap;">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 4
              </td>
            </tr>

            <!-- KT3.2: Edward Jenner & Smallpox -->
            <tr style="border-bottom: 1px dashed #d1d5db;">
              <td rowspan="2" style="padding: 12px 6px; text-align: center; font-weight: 900; font-size: 9.5pt; border-right: 1.5px solid #000000; background: #f8fafc; vertical-align: middle;">
                KT3.2
              </td>
              <td style="padding: 13px 10px; font-weight: 600; line-height: 1.35; border-right: 1.5px solid #000000; font-size: 8.2pt;">
                <strong>Q5/6:</strong> Evaluative Essay on Jenner Smallpox Vaccine c1700–c1900
              </td>
              <td style="padding: 13px 6px; text-align: center; font-weight: 800; font-size: 8.5pt; border-right: 1.5px solid #000000; white-space: nowrap;">
                p. 9–11
              </td>
              <td style="padding: 13px 6px; text-align: center; font-size: 10pt; font-weight: 900; border-right: 1.5px solid #000000; white-space: nowrap;">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 20
              </td>
              <td rowspan="2" style="padding: 10px 10px; vertical-align: top; font-size: 8pt; background: #ffffff;">
                <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #777777; font-weight: 700; text-transform: uppercase; margin-bottom: 4px;">
                  Marking Feedback &bull; Targets:
                </div>
                <div style="display: flex; flex-direction: column; justify-content: space-around; height: 19mm;">
                  <div style="border-bottom: 1px dotted #d1d5db; height: 6mm;"></div>
                  <div style="border-bottom: 1px dotted #d1d5db; height: 6mm;"></div>
                  <div style="border-bottom: 1px dotted #d1d5db; height: 6mm;"></div>
                </div>
              </td>
            </tr>
            <tr style="border-bottom: 2px solid #000000;">
              <td style="padding: 13px 10px; font-weight: 600; line-height: 1.35; border-right: 1.5px solid #000000; font-size: 8.2pt;">
                <strong>Q3:</strong> Explain One Difference (Smallpox Prevention Methods)
              </td>
              <td style="padding: 13px 6px; text-align: center; font-weight: 800; font-size: 8.5pt; border-right: 1.5px solid #000000; white-space: nowrap;">
                p. 11
              </td>
              <td style="padding: 13px 6px; text-align: center; font-size: 10pt; font-weight: 900; border-right: 1.5px solid #000000; white-space: nowrap;">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 4
              </td>
            </tr>

            <!-- KT3.3: Florence Nightingale & Hospitals -->
            <tr style="border-bottom: 1px dashed #d1d5db;">
              <td rowspan="2" style="padding: 12px 6px; text-align: center; font-weight: 900; font-size: 9.5pt; border-right: 1.5px solid #000000; background: #f8fafc; vertical-align: middle;">
                KT3.3
              </td>
              <td style="padding: 13px 10px; font-weight: 600; line-height: 1.35; border-right: 1.5px solid #000000; font-size: 8.2pt;">
                <strong>Q4:</strong> Explain Why Hospital Care &amp; Nursing Improved c1850–c1900
              </td>
              <td style="padding: 13px 6px; text-align: center; font-weight: 800; font-size: 8.5pt; border-right: 1.5px solid #000000; white-space: nowrap;">
                p. 13–15
              </td>
              <td style="padding: 13px 6px; text-align: center; font-size: 10pt; font-weight: 900; border-right: 1.5px solid #000000; white-space: nowrap;">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 12
              </td>
              <td rowspan="2" style="padding: 10px 10px; vertical-align: top; font-size: 8pt; background: #ffffff;">
                <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #777777; font-weight: 700; text-transform: uppercase; margin-bottom: 4px;">
                  Marking Feedback &bull; Targets:
                </div>
                <div style="display: flex; flex-direction: column; justify-content: space-around; height: 19mm;">
                  <div style="border-bottom: 1px dotted #d1d5db; height: 6mm;"></div>
                  <div style="border-bottom: 1px dotted #d1d5db; height: 6mm;"></div>
                  <div style="border-bottom: 1px dotted #d1d5db; height: 6mm;"></div>
                </div>
              </td>
            </tr>
            <tr style="border-bottom: 2px solid #000000;">
              <td style="padding: 13px 10px; font-weight: 600; line-height: 1.35; border-right: 1.5px solid #000000; font-size: 8.2pt;">
                <strong>Q3:</strong> Explain One Difference (Hospital Care: Medieval vs c1900)
              </td>
              <td style="padding: 13px 6px; text-align: center; font-weight: 800; font-size: 8.5pt; border-right: 1.5px solid #000000; white-space: nowrap;">
                p. 15
              </td>
              <td style="padding: 13px 6px; text-align: center; font-size: 10pt; font-weight: 900; border-right: 1.5px solid #000000; white-space: nowrap;">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 4
              </td>
            </tr>

            <!-- KT3.4: Simpson, Lister & Surgery -->
            <tr style="border-bottom: 1px dashed #d1d5db;">
              <td rowspan="2" style="padding: 12px 6px; text-align: center; font-weight: 900; font-size: 9.5pt; border-right: 1.5px solid #000000; background: #f8fafc; vertical-align: middle;">
                KT3.4
              </td>
              <td style="padding: 13px 10px; font-weight: 600; line-height: 1.35; border-right: 1.5px solid #000000; font-size: 8.2pt;">
                <strong>Q4:</strong> Explain Why Surgery Became Safer c1840–c1900
              </td>
              <td style="padding: 13px 6px; text-align: center; font-weight: 800; font-size: 8.5pt; border-right: 1.5px solid #000000; white-space: nowrap;">
                p. 17–19
              </td>
              <td style="padding: 13px 6px; text-align: center; font-size: 10pt; font-weight: 900; border-right: 1.5px solid #000000; white-space: nowrap;">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 12
              </td>
              <td rowspan="2" style="padding: 10px 10px; vertical-align: top; font-size: 8pt; background: #ffffff;">
                <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #777777; font-weight: 700; text-transform: uppercase; margin-bottom: 4px;">
                  Marking Feedback &bull; Targets:
                </div>
                <div style="display: flex; flex-direction: column; justify-content: space-around; height: 19mm;">
                  <div style="border-bottom: 1px dotted #d1d5db; height: 6mm;"></div>
                  <div style="border-bottom: 1px dotted #d1d5db; height: 6mm;"></div>
                  <div style="border-bottom: 1px dotted #d1d5db; height: 6mm;"></div>
                </div>
              </td>
            </tr>
            <tr style="border-bottom: 2px solid #000000;">
              <td style="padding: 13px 10px; font-weight: 600; line-height: 1.35; border-right: 1.5px solid #000000; font-size: 8.2pt;">
                <strong>Q3:</strong> Explain One Similarity in Surgery (Medieval vs Pre-1846)
              </td>
              <td style="padding: 13px 6px; text-align: center; font-weight: 800; font-size: 8.5pt; border-right: 1.5px solid #000000; white-space: nowrap;">
                p. 19
              </td>
              <td style="padding: 13px 6px; text-align: center; font-size: 10pt; font-weight: 900; border-right: 1.5px solid #000000; white-space: nowrap;">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 4
              </td>
            </tr>

            <!-- KT3.5: John Snow & Public Health -->
            <tr style="border-bottom: 1px dashed #d1d5db;">
              <td rowspan="2" style="padding: 12px 6px; text-align: center; font-weight: 900; font-size: 9.5pt; border-right: 1.5px solid #000000; background: #f8fafc; vertical-align: middle;">
                KT3.5
              </td>
              <td style="padding: 13px 10px; font-weight: 600; line-height: 1.35; border-right: 1.5px solid #000000; font-size: 8.2pt;">
                <strong>Q5/6:</strong> Evaluative Essay on John Snow &amp; 1875 Public Health Act
              </td>
              <td style="padding: 13px 6px; text-align: center; font-weight: 800; font-size: 8.5pt; border-right: 1.5px solid #000000; white-space: nowrap;">
                p. 21–23
              </td>
              <td style="padding: 13px 6px; text-align: center; font-size: 10pt; font-weight: 900; border-right: 1.5px solid #000000; white-space: nowrap;">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 20
              </td>
              <td rowspan="2" style="padding: 10px 10px; vertical-align: top; font-size: 8pt; background: #ffffff;">
                <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #777777; font-weight: 700; text-transform: uppercase; margin-bottom: 4px;">
                  Marking Feedback &bull; Targets:
                </div>
                <div style="display: flex; flex-direction: column; justify-content: space-around; height: 19mm;">
                  <div style="border-bottom: 1px dotted #d1d5db; height: 6mm;"></div>
                  <div style="border-bottom: 1px dotted #d1d5db; height: 6mm;"></div>
                  <div style="border-bottom: 1px dotted #d1d5db; height: 6mm;"></div>
                </div>
              </td>
            </tr>
            <tr style="border-bottom: 2px solid #000000;">
              <td style="padding: 13px 10px; font-weight: 600; line-height: 1.35; border-right: 1.5px solid #000000; font-size: 8.2pt;">
                <strong>Q3:</strong> Explain One Difference in Public Health Action (1848 vs 1875)
              </td>
              <td style="padding: 13px 6px; text-align: center; font-weight: 800; font-size: 8.5pt; border-right: 1.5px solid #000000; white-space: nowrap;">
                p. 23
              </td>
              <td style="padding: 13px 6px; text-align: center; font-size: 10pt; font-weight: 900; border-right: 1.5px solid #000000; white-space: nowrap;">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 4
              </td>
            </tr>

            <!-- Total Row -->
            <tr style="background: #f8fafc; border-top: 2px solid #000000;">
              <td style="padding: 12px 6px; text-align: center; font-weight: 900; font-size: 8.5pt; border-right: 1.5px solid #000000; background: #000000; color: #ffffff;">
                TOTAL
              </td>
              <td style="padding: 12px 10px; font-weight: 800; font-size: 8.5pt; border-right: 1.5px solid #000000;">
                Key Topic 3 Cumulative Examination Assessment Portfolio (10 Tasks)
              </td>
              <td style="padding: 12px 6px; text-align: center; font-weight: 800; font-size: 8.5pt; border-right: 1.5px solid #000000;">
                p. 4–23
              </td>
              <td style="padding: 12px 6px; text-align: center; font-size: 11pt; font-weight: 900; border-right: 1.5px solid #000000; white-space: nowrap;">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 96
              </td>
              <td style="padding: 12px 10px; font-weight: 800; font-size: 8.5pt; background: #f8fafc;">
                <div style="display: flex; justify-content: space-between; align-items: baseline;">
                  <span>Overall Grade: <span style="display: inline-block; width: 45px; border-bottom: 1.5px solid #000000;"></span></span>
                  <span style="font-size: 7.5pt; color: #555555;">Teacher Target: <span style="display: inline-block; width: 40px; border-bottom: 1px solid #555555;"></span></span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 5 Verified Micro-QR Codes with Dual QR (Lesson + Quiz) -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 5px 6px; background: #f8fafc;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.5pt; text-transform: uppercase; letter-spacing: 0.5px;">
            &bull; Digital Learning &amp; Retrieval Hub &bull; Interactive Lessons &amp; Quizzes
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; color: #000000;">
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
          <div style="border: 1px solid #000000; border-radius: 3px; padding: 4px 3px; background: #ffffff; display: flex; flex-direction: column; align-items: center; justify-content: space-between;">
            <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 900; text-transform: uppercase; margin-bottom: 1px;">
              KT3.${cfg.lessonNum}
            </div>
            <div style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 700; color: #333333; margin-bottom: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%;">
              ${shortLabels[idx]}
            </div>

            <!-- Top QR: Interactive Lesson Hub -->
            <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 4px; width: 100%;">
              <div style="width: 17.5mm; height: 17.5mm; margin: 0 auto 1px auto;">
                ${lessonQrSvg}
              </div>
              <span style="font-family: 'Inter', sans-serif; font-size: 5.6pt; font-weight: 800; text-transform: uppercase; background: #000000; color: #ffffff; padding: 1.5px 4px; border-radius: 2px; letter-spacing: 0.2px; white-space: nowrap;">
                Lesson Hub
              </span>
            </div>

            <!-- Bottom QR: Mastery Quiz -->
            <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 3px; width: 100%;">
              <div style="width: 17.5mm; height: 17.5mm; margin: 0 auto 1px auto;">
                ${quizQrSvg}
              </div>
              <span style="font-family: 'Inter', sans-serif; font-size: 5.6pt; font-weight: 800; text-transform: uppercase; background: #000000; color: #ffffff; padding: 1.5px 4px; border-radius: 2px; letter-spacing: 0.2px; white-space: nowrap;">
                Mastery Quiz
              </span>
            </div>

            <div style="font-family: 'Inter', sans-serif; font-size: 8.2pt; font-weight: 900; color: #000000; margin-top: 2px; white-space: nowrap; border: 1px solid #000000; border-radius: 2px; padding: 1px 3px; background: #f8fafc;">
              Score: [ &nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 10</strong> ]
            </div>
          </div>
          `;
            })
            .join('')}
        </div>
      </div>

      ${renderFooterStrip(24, 'Sanitation, antiseptics, and vaccinations conquered disease; retrieval practice will conquer your GCSE exam.', 24)}
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
  const customHtml = build18th19thTwoPageWorkbook({}, {});
  const unitPath = path.resolve(
    __dirname,
    '../units/edexcel_medicine/pupil_workbook_18th_19th.html',
  );
  const pubPath = path.resolve(
    __dirname,
    '../public/units/edexcel_medicine/pupil_workbook_18th_19th.html',
  );
  fs.writeFileSync(unitPath, customHtml, 'utf8');
  fs.writeFileSync(pubPath, customHtml, 'utf8');
  console.log('Successfully generated pupil_workbook_18th_19th.html to:');
  console.log(' -', unitPath);
  console.log(' -', pubPath);
}

module.exports = {
  build18th19thTwoPageWorkbook,
};
