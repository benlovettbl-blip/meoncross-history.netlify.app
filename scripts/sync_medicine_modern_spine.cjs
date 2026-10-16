const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '..', 'units', 'edexcel_medicine', 'data.js');

const modernSpines = {
  lesson_4_1: {
    workbook_stages: [
      {
        step: 1,
        date: 'c1900–1940s',
        para_ref: '[1.1]',
        heading: 'Why did doctors assume proteins carried hereditary traits?',
        bullets: [
          'Growing wrinkled green garden peas',
          'Spotting dark rod shapes inside cells',
          'Assuming heavy protein chains hold secrets',
        ],
        focus_clue: 'Why did doctors assume proteins carried hereditary traits?',
      },
      {
        step: 2,
        date: '1951–1952',
        para_ref: '[1.2]',
        heading: 'How did Photograph 51 prove DNA’s helical structure?',
        bullets: [
          'Beaming invisible rays through wet DNA fibers',
          'Exposing glass photographic plates for sixty hours',
          'Revealing clear fuzzy X-shaped shadow marks',
        ],
        focus_clue: 'How did Photograph 51 prove DNA’s helical structure?',
      },
      {
        step: 3,
        date: '1953',
        para_ref: '[1.3]',
        heading: 'How did base pairing explain hereditary replication?',
        bullets: [
          'Twisting thin metal wire into spirals',
          'Locking four chemical pairs like puzzle pieces',
          'Rushing to celebratory pints at The Eagle pub',
        ],
        focus_clue: 'How did base pairing explain hereditary replication?',
      },
      {
        step: 4,
        date: '1990–2003',
        para_ref: '[1.4]',
        heading: 'Why was mapping 3 billion base pairs a medical milestone?',
        bullets: [
          'Linking laboratory supercomputers across six nations',
          'Reading three billion chemical letters in blood',
          'Publishing complete human code free online',
        ],
        focus_clue: 'Why was mapping 3 billion base pairs a medical milestone?',
      },
      {
        step: 5,
        date: '2000s–Present',
        para_ref: '[1.5]',
        heading: 'Why did understanding causes outpace finding cures?',
        bullets: [
          'Testing saliva drops for faulty breast genes',
          'Matching targeted pills to personal body code',
          'Struggling to fix broken genetic code inside bodies',
        ],
        focus_clue: 'Why did understanding causes outpace finding cures?',
      },
    ],
    causal_domino_spine: {
      title: 'Ideas on Causes: Genetics, DNA & The Human Genome Project',
      subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
      stages: [
        {
          step: 1,
          date: 'c1900–1940s',
          para_ref: '[1.1]',
          title: 'Mendel & Early Genetics',
          actor: 'Gregor Mendel & Early Cytologists',
          tag: '🌱 MENDELIAN INHERITANCE',
          trigger:
            'Early 20th-century biologists rediscovered Gregor Mendel’s laws of inheritance and observed thread-like chromosomes inside cells, but assumed complex protein chains must carry hereditary data.',
          desc: 'Early 20th-century biologists rediscovered Gregor Mendel’s laws of inheritance and observed thread-like chromosomes inside cells, but assumed complex protein chains must carry hereditary data.',
          connective:
            'Delayed recognition of DNA as the fundamental carrier of genetic information until Oswald Avery proved in 1944 that DNA transferred hereditary pneumonia traits in mice.',
          question: 'Why did doctors assume proteins carried hereditary traits?',
        },
        {
          step: 2,
          date: '1951–1952',
          para_ref: '[1.2]',
          title: 'Franklin & Photograph 51',
          actor: 'Rosalind Franklin & Maurice Wilkins',
          tag: '🔬 PHOTOGRAPH 51',
          trigger:
            "Rosalind Franklin at King's College London used X-ray crystallography to capture Photograph 51 in May 1952, exposing delicate DNA fibres to X-rays for 62 continuous hours.",
          desc: "Rosalind Franklin at King's College London used X-ray crystallography to capture Photograph 51 in May 1952, exposing delicate DNA fibres to X-rays for 62 continuous hours.",
          connective:
            'Revealed a sharp, distinctive X-shaped diffraction pattern that mathematically proved DNA possessed a double-helix helical structure with sugar-phosphate backbones on the outside.',
          question: 'How did Photograph 51 prove DNA’s helical structure?',
        },
        {
          step: 3,
          date: '1953',
          para_ref: '[1.3]',
          title: 'Watson & Crick’s Model',
          actor: 'James Watson & Francis Crick',
          tag: '🧬 THE DOUBLE HELIX',
          trigger:
            'Armed with Franklin’s experimental data, Cambridge researchers James Watson and Francis Crick constructed a three-dimensional tin-and-wire physical model of DNA at the Cavendish Laboratory.',
          desc: 'Armed with Franklin’s experimental data, Cambridge researchers James Watson and Francis Crick constructed a three-dimensional tin-and-wire physical model of DNA at the Cavendish Laboratory.',
          connective:
            'Demonstrated how complementary base pairs (Adenine-Thymine, Cytosine-Guanine) form the rungs of a twisted ladder, instantly explaining how genetic codes copy and replicate during cell division.',
          question: 'How did base pairing explain hereditary replication?',
        },
        {
          step: 4,
          date: '1990–2003',
          para_ref: '[1.4]',
          title: 'Human Genome Project',
          actor: 'International Human Genome Sequencing Consortium',
          tag: '💻 HUMAN GENOME MAPPING',
          trigger:
            'Launched in 1990, the publicly funded Human Genome Project coordinated scientists across six nations to sequence all 3 billion chemical base pairs in human DNA.',
          desc: 'Launched in 1990, the publicly funded Human Genome Project coordinated scientists across six nations to sequence all 3 billion chemical base pairs in human DNA.',
          connective:
            'Completed in 2003 with the data published free online, locating over 20,000 human genes and pinpointing specific genetic mutations responsible for hereditary disorders like cystic fibrosis.',
          question: 'Why was mapping 3 billion base pairs a medical milestone?',
        },
        {
          step: 5,
          date: '2000s–Present',
          para_ref: '[1.5]',
          title: 'Screening & Treatment Gap',
          actor: 'Modern Clinical Geneticists & Oncologists',
          tag: '🧬 GENETIC SCREENING & THERAPY',
          trigger:
            'Genetic knowledge enabled rapid predictive screening for hereditary cancer risks (such as faulty BRCA1/BRCA2 breast cancer genes) and targeted pharmacogenomics.',
          desc: 'Genetic knowledge enabled rapid predictive screening for hereditary cancer risks (such as faulty BRCA1/BRCA2 breast cancer genes) and targeted pharmacogenomics.',
          connective:
            'However, correcting defective genes inside living human bodies via gene therapy has proven notoriously complex, leaving a persistent historical gap between causal understanding and therapeutic cures.',
          question: 'Why did understanding causes outpace finding cures?',
        },
      ],
    },
  },

  lesson_4_2: {
    workbook_stages: [
      {
        step: 1,
        date: '1895–1918',
        para_ref: '[2.1]',
        heading: 'How did X-rays transform surgical trauma diagnosis in WWI?',
        bullets: [
          'Photographing wife Bertha’s hand and gold wedding ring',
          'Driving mobile medical vans to muddy trenches',
          'Finding jagged lead shrapnel without deep cuts',
        ],
        focus_clue: 'How did X-rays transform surgical trauma diagnosis in WWI?',
      },
      {
        step: 2,
        date: '1930s–1960s',
        para_ref: '[2.2]',
        heading: 'Why was fiber-optic endoscopy superior to exploratory surgery?',
        bullets: [
          'Spinning red test tubes in fast centrifuges',
          'Counting abnormal white cells on glass slides',
          'Sliding flexible glass cables down throat tubes',
        ],
        focus_clue: 'Why was fiber-optic endoscopy superior to exploratory surgery?',
      },
      {
        step: 3,
        date: '1971–1980s',
        para_ref: '[2.3]',
        heading: 'Why did CT scans transform internal soft-tissue diagnosis?',
        bullets: [
          'Spinning heavy donut scanners around hospital beds',
          'Combining computer pictures into 3D body slices',
          'Using magnetic radio waves to find brain lumps',
        ],
        focus_clue: 'Why did CT scans transform internal soft-tissue diagnosis?',
      },
      {
        step: 4,
        date: 'c1950–1980s',
        para_ref: '[2.4]',
        heading: 'What drove the shift from infectious to lifestyle diseases?',
        bullets: [
          'Banishing deadly childhood fevers with wonder drugs',
          'People living past seventy years of age',
          'Rising chest tumours and clogged heart arteries',
        ],
        focus_clue: 'What drove the shift from infectious to lifestyle diseases?',
      },
      {
        step: 5,
        date: '1980s–Present',
        para_ref: '[2.5]',
        heading: 'Why do governments favour lifestyle prevention over treatment?',
        bullets: [
          'Clicking compulsory car seatbelts across chests',
          'Extinguishing glowing cigarettes outside pub doors',
          'Taxing sugary fizzy cans and advertising fruit',
        ],
        focus_clue: 'Why do governments favour lifestyle prevention over treatment?',
      },
    ],
    causal_domino_spine: {
      title: 'Lifestyle Factors & The Technological Revolution in Diagnosis',
      subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
      stages: [
        {
          step: 1,
          date: '1895–1918',
          para_ref: '[2.1]',
          title: 'Röntgen & Early X-Rays',
          actor: 'Wilhelm Röntgen & Marie Curie',
          tag: '🩻 RADIOLOGICAL X-RAYS',
          trigger:
            'German physicist Wilhelm Röntgen discovered electromagnetic X-rays in November 1895, imaging the bones and wedding ring of his wife’s hand on a photographic plate.',
          desc: 'German physicist Wilhelm Röntgen discovered electromagnetic X-rays in November 1895, imaging the bones and wedding ring of his wife’s hand on a photographic plate.',
          connective:
            'Allowed battlefield doctors in WWI to locate buried bullets, shrapnel fragments, and broken bones non-invasively, eliminating the agonizing need for surgeons to probe deep wounds with metal fingers.',
          question: 'How did X-rays transform surgical trauma diagnosis in WWI?',
        },
        {
          step: 2,
          date: '1930s–1960s',
          para_ref: '[2.2]',
          title: 'Blood Labs & Endoscopy',
          actor: 'Pathologists & Optical Physicists',
          tag: '🩸 BIOCHEMICAL & ENDOSCOPIC LABS',
          trigger:
            'Mid-20th-century hospitals developed automated biochemical blood tests and flexible fibre-optic endoscopes using coherent glass fiber bundles.',
          desc: 'Mid-20th-century hospitals developed automated biochemical blood tests and flexible fibre-optic endoscopes using coherent glass fiber bundles.',
          connective:
            'Enabled clinicians to examine gastric ulcers and lung tumours directly through natural body orifices and detect hormone imbalances from blood drops, drastically reducing risky exploratory laparotomies.',
          question: 'Why was fiber-optic endoscopy superior to exploratory surgery?',
        },
        {
          step: 3,
          date: '1971–1980s',
          para_ref: '[2.3]',
          title: 'Hounsfield’s CT & MRI',
          actor: 'Godfrey Hounsfield & Sir Peter Mansfield',
          tag: '🖥️ 3D DIGITAL CT & MRI',
          trigger:
            'British electrical engineer Godfrey Hounsfield built the first computerized tomography (CT) scanner at EMI Laboratories in 1971, rotating X-ray beams in a circular gantry.',
          desc: 'British electrical engineer Godfrey Hounsfield built the first computerized tomography (CT) scanner at EMI Laboratories in 1971, rotating X-ray beams in a circular gantry.',
          connective:
            'Used digital computers to assemble cross-sectional 3D slices of soft internal organs, followed by Magnetic Resonance Imaging (MRI) in the 1980s that imaged soft brain and spinal tissue without ionizing radiation.',
          question: 'Why did CT scans transform internal soft-tissue diagnosis?',
        },
        {
          step: 4,
          date: 'c1950–1980s',
          para_ref: '[2.4]',
          title: 'Epidemiological Shift',
          actor: 'Epidemiologists & Modern Demographic Researchers',
          tag: '📈 THE CHRONIC DISEASE SHIFT',
          trigger:
            'With clean municipal water, mandatory vaccinations, and penicillin vanquishing lethal bacterial epidemics, average UK life expectancy surged from 46 in 1900 to over 75 by the 1980s.',
          desc: 'With clean municipal water, mandatory vaccinations, and penicillin vanquishing lethal bacterial epidemics, average UK life expectancy surged from 46 in 1900 to over 75 by the 1980s.',
          connective:
            'Shifted the primary burden of national disease away from acute bacterial fevers toward chronic, lifestyle-related conditions: cardiovascular heart disease, type 2 diabetes, and tobacco-induced cancers.',
          question: 'What drove the shift from infectious to lifestyle diseases?',
        },
        {
          step: 5,
          date: '1980s–Present',
          para_ref: '[2.5]',
          title: 'State Lifestyle Campaigns',
          actor: 'Department of Health & Public Health England',
          tag: '🚭 PREVENTIVE LIFESTYLE INITIATIVES',
          trigger:
            'Facing astronomical costs for high-tech acute treatments, the Department of Health launched national preventive lifestyle campaigns: the 2007 public indoor smoking ban, Change4Life, and sugar taxes.',
          desc: 'Facing astronomical costs for high-tech acute treatments, the Department of Health launched national preventive lifestyle campaigns: the 2007 public indoor smoking ban, Change4Life, and sugar taxes.',
          connective:
            'Demonstrated that changing individual daily behaviours through statutory regulation, taxation, and health promotion delivers far greater aggregate population health gains than high-tech hospital interventions alone.',
          question: 'Why do governments favour lifestyle prevention over treatment?',
        },
      ],
    },
  },

  lesson_4_3: {
    workbook_stages: [
      {
        step: 1,
        date: '1906–1909',
        para_ref: '[3.1]',
        heading: 'Why was Salvarsan 606 termed the first "magic bullet"?',
        bullets: [
          'Testing hundreds of toxic yellow arsenic mixtures',
          'Hunting chemical bullets that only hit germs',
          'Curing deadly human syphilis with magic bullet',
        ],
        focus_clue: 'Why was Salvarsan 606 termed the first "magic bullet"?',
      },
      {
        step: 2,
        date: '1932–1935',
        para_ref: '[3.2]',
        heading: 'How did Prontosil prove synthetic drugs could kill microbes?',
        bullets: [
          'Injecting bright red leather dye into mice',
          'Saving sick daughter from arm-amputation death',
          'Discovering active white sulfa medicine powder',
        ],
        focus_clue: 'How did Prontosil prove synthetic drugs could kill microbes?',
      },
      {
        step: 3,
        date: '1942',
        para_ref: '[3.3]',
        heading: 'How did WWII unity create momentum for state healthcare?',
        bullets: [
          'Listing Five Giants that crush poor workers',
          'Surviving Nazi air bombs with community spirit',
          'Demanding free medical care for every citizen',
        ],
        focus_clue: 'How did WWII unity create momentum for state healthcare?',
      },
      {
        step: 4,
        date: '1945–1948',
        para_ref: '[3.4]',
        heading: 'How did Bevan compromise to persuade resistant doctors?',
        bullets: [
          'Offering private bed perks to stubborn doctors',
          'Delivering free spectacles and dentures to families',
          'Abolishing terrifying doctor bills forever',
        ],
        focus_clue: 'How did Bevan compromise to persuade resistant doctors?',
      },
      {
        step: 5,
        date: '1950s–Present',
        para_ref: '[3.5]',
        heading: 'Why has modern medical success created financial strain?',
        bullets: [
          'Pumping blood through giant artificial kidney filters',
          'Replacing worn hip joints with metal balls',
          'Charging small fees for paper medicine slips',
        ],
        focus_clue: 'Why has modern medical success created financial strain?',
      },
    ],
    causal_domino_spine: {
      title: 'Magic Bullets, High-Tech Treatments & The Birth of the NHS',
      subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
      stages: [
        {
          step: 1,
          date: '1906–1909',
          para_ref: '[3.1]',
          title: 'Ehrlich & Salvarsan 606',
          actor: 'Paul Ehrlich & Sahachiro Hata',
          tag: '🎯 SALVARSAN 606 MAGIC BULLET',
          trigger:
            'German bacteriologist Paul Ehrlich reasoned that if chemical dyes stained specific bacteria selectively, synthetic chemicals could be engineered to destroy microbes without poisoning human host tissue.',
          desc: 'German bacteriologist Paul Ehrlich reasoned that if chemical dyes stained specific bacteria selectively, synthetic chemicals could be engineered to destroy microbes without poisoning human host tissue.',
          connective:
            'Tested 605 arsenic compounds before Sahachiro Hata re-tested compound 606 (Salvarsan) in 1909, curing deadly human syphilis and establishing the concept of the targeted chemical "magic bullet".',
          question: 'Why was Salvarsan 606 termed the first "magic bullet"?',
        },
        {
          step: 2,
          date: '1932–1935',
          para_ref: '[3.2]',
          title: 'Domagk & Prontosil',
          actor: 'Gerhard Domagk & Bayer Laboratories',
          tag: '🔴 PRONTOSIL SULPHONAMIDES',
          trigger:
            'In 1932, German pathologist Gerhard Domagk discovered that a bright red industrial leather dye called Prontosil neutralized lethal streptococcus bacterial infections in laboratory mice.',
          desc: 'In 1932, German pathologist Gerhard Domagk discovered that a bright red industrial leather dye called Prontosil neutralized lethal streptococcus bacterial infections in laboratory mice.',
          connective:
            'Tested it successfully on his own daughter dying of severe blood poisoning in 1935, sparking the discovery of sulphonamide "sulfa drugs" that slashed maternal puerperal fever deaths by 60%.',
          question: 'How did Prontosil prove synthetic drugs could kill microbes?',
        },
        {
          step: 3,
          date: '1942',
          para_ref: '[3.3]',
          title: 'The Beveridge Report',
          actor: 'Sir William Beveridge & Wartime Coalition',
          tag: '📜 THE BEVERIDGE REPORT',
          trigger:
            'Amid the collective sacrifice of the Second World War, Sir William Beveridge published his bestselling 1942 report proposing an all-out assault against the "Five Giant Evils": Want, Disease, Ignorance, Squalor, and Idleness.',
          desc: 'Amid the collective sacrifice of the Second World War, Sir William Beveridge published his bestselling 1942 report proposing an all-out assault against the "Five Giant Evils": Want, Disease, Ignorance, Squalor, and Idleness.',
          connective:
            'Captivated the British public by recommending a comprehensive welfare state and a universal National Health Service providing free medical treatment for every citizen regardless of wealth.',
          question: 'How did WWII unity create momentum for state healthcare?',
        },
        {
          step: 4,
          date: '1945–1948',
          para_ref: '[3.4]',
          title: 'Bevan & Launch of the NHS',
          actor: 'Aneurin Bevan (Minister of Health)',
          tag: '🏥 THE 1948 NHS REVOLUTION',
          trigger:
            'Minister of Health Aneurin Bevan overcame fierce resistance from the British Medical Association by famously "stuffing their mouths with gold"—allowing senior hospital consultants to maintain private practice beds.',
          desc: 'Minister of Health Aneurin Bevan overcame fierce resistance from the British Medical Association by famously "stuffing their mouths with gold"—allowing senior hospital consultants to maintain private practice beds.',
          connective:
            'Launched the National Health Service on 5 July 1948 at Park Hospital Manchester, nationalizing 2,688 hospitals and guaranteeing healthcare free at the point of clinical delivery funded by direct taxation.',
          question: 'How did Bevan compromise to persuade resistant doctors?',
        },
        {
          step: 5,
          date: '1950s–Present',
          para_ref: '[3.5]',
          title: 'High-Tech Care & Costs',
          actor: 'John Charnley & Modern NHS Clinicians',
          tag: '🦿 HIGH-TECH COST CRISIS',
          trigger:
            'The NHS expanded to deliver expensive high-tech surgical breakthroughs: John Charnley’s pioneering low-friction hip replacements (1962), artificial kidney dialysis, and complex organ transplants.',
          desc: 'The NHS expanded to deliver expensive high-tech surgical breakthroughs: John Charnley’s pioneering low-friction hip replacements (1962), artificial kidney dialysis, and complex organ transplants.',
          connective:
            'Paradoxically, its own clinical success in keeping an ageing population alive longer created escalating budgetary strain, forcing the government to introduce prescription charges in 1952 and rationing committees like NICE.',
          question: 'Why has modern medical success created financial strain?',
        },
      ],
    },
  },

  lesson_4_4: {
    workbook_stages: [
      {
        step: 1,
        date: '1928–1929',
        para_ref: '[4.1]',
        heading: 'Why could Fleming not turn mould into a clinical medicine?',
        bullets: [
          'Finding fluffy mould on dirty glass dish',
          'Golden germs dissolving in clear circle halos',
          'Failing to separate fragile liquid juice',
        ],
        focus_clue: 'Why could Fleming not turn mould into a clinical medicine?',
      },
      {
        step: 2,
        date: '1938–1940',
        para_ref: '[4.2]',
        heading: 'How did Norman Heatley solve the purification challenge?',
        bullets: [
          'Brewing fungus inside hospital bedpans and milk churns',
          'Winning American dollar grants during air raids',
          'Freezing brown liquid into precious yellow crystals',
        ],
        focus_clue: 'How did Norman Heatley solve the purification challenge?',
      },
      {
        step: 3,
        date: '1940–1941',
        para_ref: '[4.3]',
        heading: 'Why was Alexander’s trial both a success and a tragedy?',
        bullets: [
          'Infecting eight mice and keeping treated four alive',
          "Scraping rose thorn scratches on policeman's face",
          'Running out of drops before patient recovers',
        ],
        focus_clue: 'Why was Alexander’s trial both a success and a tragedy?',
      },
      {
        step: 4,
        date: '1941–1944',
        para_ref: '[4.4]',
        heading: 'How did US industrial fermentation enable mass production?',
        bullets: [
          'Feeding corn beer wash to rotting melon mould',
          'Pumping sterile air through giant ten-thousand-gallon vats',
          'Brewing million doses for D-Day landing craft',
        ],
        focus_clue: 'How did US industrial fermentation enable mass production?',
      },
      {
        step: 5,
        date: '1944–Present',
        para_ref: '[4.5]',
        heading: 'Why did Fleming warn that antibiotic overuse causes resistance?',
        bullets: [
          "Spraying white powder directly into torn soldiers' limbs",
          'Three scientists sharing golden Nobel prize medal',
          'Overusing capsules creating tough hospital superbugs',
        ],
        focus_clue: 'Why did Fleming warn that antibiotic overuse causes resistance?',
      },
    ],
    causal_domino_spine: {
      title: 'Case Study 1: The Antibiotic Revolution: Fleming, Florey & Chain and Penicillin',
      subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
      stages: [
        {
          step: 1,
          date: '1928–1929',
          para_ref: '[4.1]',
          title: 'Fleming’s Discovery',
          actor: "Alexander Fleming (St Mary's Hospital, London)",
          tag: '🧫 ACCIDENTAL PETRI DISH DISCOVERY',
          trigger:
            'Returning from holiday in September 1928, Scottish bacteriologist Alexander Fleming noticed a contaminated petri dish of staphylococcus bacteria where Penicillium notatum mould spores had grown.',
          desc: 'Returning from holiday in September 1928, Scottish bacteriologist Alexander Fleming noticed a contaminated petri dish of staphylococcus bacteria where Penicillium notatum mould spores had grown.',
          connective:
            'Observed a clear halo where bacterial colonies had completely dissolved; however, lacking chemical expertise to isolate the unstable active substance, he abandoned clinical trials in 1929.',
          question: 'Why could Fleming not turn mould into a clinical medicine?',
        },
        {
          step: 2,
          date: '1938–1940',
          para_ref: '[4.2]',
          title: 'Florey & Chain at Oxford',
          actor: 'Howard Florey, Ernst Chain & Norman Heatley',
          tag: '🧪 OXFORD LABORATORY PURIFICATION',
          trigger:
            'At Oxford University, Australian pharmacologist Howard Florey and German-Jewish biochemist Ernst Chain assembled a multidisciplinary research team, reading Fleming’s 1928 paper.',
          desc: 'At Oxford University, Australian pharmacologist Howard Florey and German-Jewish biochemist Ernst Chain assembled a multidisciplinary research team, reading Fleming’s 1928 paper.',
          connective:
            'Biochemist Norman Heatley improvised apparatus using hospital bedpans, milk churns, and freeze-drying ether techniques to purify tiny quantities of stable, concentrated penicillin crystals.',
          question: 'How did Norman Heatley solve the purification challenge?',
        },
        {
          step: 3,
          date: '1940–1941',
          para_ref: '[4.3]',
          title: 'Mice Trials & Albert Alexander',
          actor: 'Oxford Team & PC Albert Alexander',
          tag: '🐁 ANIMAL & CLINICAL TRIALS',
          trigger:
            'In May 1940, Florey injected eight mice with lethal streptococci, and the four mice given penicillin survived completely; in February 1941 they treated PC Albert Alexander, dying from an infected rose-thorn scratch.',
          desc: 'In May 1940, Florey injected eight mice with lethal streptococci, and the four mice given penicillin survived completely; in February 1941 they treated PC Albert Alexander, dying from an infected rose-thorn scratch.',
          connective:
            'Alexander recovered dramatically within days, but the team ran out of drug (even after recycling it from his urine), and he tragically relapsed and died, proving penicillin’s potency while exposing the acute supply crisis.',
          question: 'Why was Alexander’s trial both a success and a tragedy?',
        },
        {
          step: 4,
          date: '1941–1944',
          para_ref: '[4.4]',
          title: 'Peoria & US Mass Production',
          actor: 'US Department of Agriculture & Chemical Firms',
          tag: '🏭 PEORIA DEEP-TANK FERMENTATION',
          trigger:
            'With British factories committed to munitions during the Blitz, Florey and Heatley travelled to the USA in July 1941, collaborating with the USDA research laboratory in Peoria, Illinois.',
          desc: 'With British factories committed to munitions during the Blitz, Florey and Heatley travelled to the USA in July 1941, collaborating with the USDA research laboratory in Peoria, Illinois.',
          connective:
            'Cultivated a super-yielding cantaloupe melon mould fed on corn-steep liquor inside 10,000-gallon aerated fermentation tanks, enabling Pfizer and Merck to produce 2.3 million doses by June 1944.',
          question: 'How did US industrial fermentation enable mass production?',
        },
        {
          step: 5,
          date: '1944–Present',
          para_ref: '[4.5]',
          title: 'D-Day & Superbugs',
          actor: 'Allied Medical Corps & Modern Clinicians',
          tag: '⚠️ D-DAY TRIUMPH & ANTIMICROBIAL RESISTANCE',
          trigger:
            'Mass-produced penicillin slashed Allied amputations and fatal wound sepsis during the Normandy D-Day invasion, winning Fleming, Florey, and Chain the 1945 Nobel Prize in Medicine.',
          desc: 'Mass-produced penicillin slashed Allied amputations and fatal wound sepsis during the Normandy D-Day invasion, winning Fleming, Florey, and Chain the 1945 Nobel Prize in Medicine.',
          connective:
            'However, Fleming presciently warned in 1945 that under-dosing and over-prescription would breed resistant strains, leading directly to the modern crisis of multi-drug resistant superbugs like MRSA.',
          question: 'Why did Fleming warn that antibiotic overuse causes resistance?',
        },
      ],
    },
  },

  lesson_4_5: {
    workbook_stages: [
      {
        step: 1,
        date: '1920s–1950',
        para_ref: '[5.1]',
        heading: 'Why did early doctors fail to link smoking to lung cancer?',
        bullets: [
          'Men coughing black blood into hospital basins',
          'Blaming smelly road tarmac and lorry exhaust fumes',
          'Colourful billboards showing smiling smoking doctors',
        ],
        focus_clue: 'Why did early doctors fail to link smoking to lung cancer?',
      },
      {
        step: 2,
        date: '1950–1954',
        para_ref: '[5.2]',
        heading: 'How did statistical epidemiology prove the causal link?',
        bullets: [
          'Interviewing sick patients across twenty London wards',
          'Tracking forty thousand real family doctors over years',
          'Proving heavy smokers face fifty-times higher risk',
        ],
        focus_clue: 'How did statistical epidemiology prove the causal link?',
      },
      {
        step: 3,
        date: '1962–1971',
        para_ref: '[5.3]',
        heading: 'Why did government action encounter strong tobacco lobbying?',
        bullets: [
          'Banning glowing cigarette commercials on evening television',
          'Printing bold black warning text on cardboard cartons',
          'Sponsoring fast racing cars to keep brands famous',
        ],
        focus_clue: 'Why did government action encounter strong tobacco lobbying?',
      },
      {
        step: 4,
        date: '2000s',
        para_ref: '[5.4]',
        heading: 'Why was passive smoking crucial in banning public smoking?',
        bullets: [
          'Breathing toxic secondhand smoke in crowded rooms',
          'Padlocking pub ashtrays and stepping outside into cold',
          'Raising legal counter buying age to eighteen',
        ],
        focus_clue: 'Why was passive smoking crucial in banning public smoking?',
      },
      {
        step: 5,
        date: '2010s–Present',
        para_ref: '[5.5]',
        heading: 'Why does low cancer survival prove prevention beats cure?',
        bullets: [
          'Selling plain ugly mud-green packets with graphic photos',
          'Guiding tiny robotic camera pincers between chest ribs',
          'Boosting immune soldier cells to attack hidden tumours',
        ],
        focus_clue: 'Why does low cancer survival prove prevention beats cure?',
      },
    ],
    causal_domino_spine: {
      title: 'Case Study 2: Public Health & The Fight Against Lung Cancer',
      subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
      stages: [
        {
          step: 1,
          date: '1920s–1950',
          para_ref: '[5.1]',
          title: 'The Mysterious Epidemic',
          actor: 'Interwar Physicians & Tobacco Companies',
          tag: '🚬 UNEXPLAINED CARCINOMA RISE',
          trigger:
            'Between 1920 and 1950, UK lung cancer deaths escalated fourteen-fold, but physicians blamed industrial coal smog, new road tarmac fumes, or residual lung damage from 1918 Spanish Flu.',
          desc: 'Between 1920 and 1950, UK lung cancer deaths escalated fourteen-fold, but physicians blamed industrial coal smog, new road tarmac fumes, or residual lung damage from 1918 Spanish Flu.',
          connective:
            'Tobacco advertising depicted cigarettes as soothing throat cures endorsed by doctors, blinding medical authorities to the deadly chemical carcinogens inhaled in cigarette smoke.',
          question: 'Why did early doctors fail to link smoking to lung cancer?',
        },
        {
          step: 2,
          date: '1950–1954',
          para_ref: '[5.2]',
          title: 'Doll & Hill’s Proof',
          actor: 'Sir Richard Doll & Sir Austin Bradford Hill',
          tag: '📊 STATISTICAL EPIDEMIOLOGY',
          trigger:
            'Medical Research Council epidemiologists Richard Doll and Austin Bradford Hill surveyed 709 lung cancer patients across 20 London hospitals in 1950, finding all but two were regular smokers.',
          desc: 'Medical Research Council epidemiologists Richard Doll and Austin Bradford Hill surveyed 709 lung cancer patients across 20 London hospitals in 1950, finding all but two were regular smokers.',
          connective:
            'Followed up with the landmark British Doctors Study (tracking 40,000 physicians over decades), statistically proving that heavy smokers were 50 times more likely to die of lung carcinoma.',
          question: 'How did statistical epidemiology prove the causal link?',
        },
        {
          step: 3,
          date: '1962–1971',
          para_ref: '[5.3]',
          title: 'Royal College & Ad Bans',
          actor: 'Royal College of Physicians & British Parliament',
          tag: '📺 STATUTORY ADVERTISING RESTRICTIONS',
          trigger:
            'The Royal College of Physicians published Smoking and Health in 1962, demanding government intervention to curb cigarette marketing despite fierce lobbying from tobacco conglomerates.',
          desc: 'The Royal College of Physicians published Smoking and Health in 1962, demanding government intervention to curb cigarette marketing despite fierce lobbying from tobacco conglomerates.',
          connective:
            'Parliament banned cigarette television advertising in 1965 and mandated health warning labels on cigarette packets in 1971, initiating decades of progressive statutory tobacco control.',
          question: 'Why did government action encounter strong tobacco lobbying?',
        },
        {
          step: 4,
          date: '2000s',
          para_ref: '[5.4]',
          title: 'Public Smoking Ban',
          actor: 'Health Act 2006 & Public Health Campaigners',
          tag: '🚭 2007 PUBLIC SMOKING BAN',
          trigger:
            'Scientific evidence proving that passive secondhand smoke caused thousands of fatal lung cancers and heart attacks in hospitality workers gave the government moral and legal grounds to act.',
          desc: 'Scientific evidence proving that passive secondhand smoke caused thousands of fatal lung cancers and heart attacks in hospitality workers gave the government moral and legal grounds to act.',
          connective:
            'Parliament passed the Health Act 2006, making all enclosed public workplaces and pubs completely smoke-free from 1 July 2007 and raising the legal purchase age from 16 to 18.',
          question: 'Why was passive smoking crucial in banning public smoking?',
        },
        {
          step: 5,
          date: '2010s–Present',
          para_ref: '[5.5]',
          title: 'Plain Packs & Oncology',
          actor: 'Modern Thoracic Surgeons & Public Health Advocates',
          tag: '📦 PLAIN PACKAGING & ADVANCED ONCOLOGY',
          trigger:
            'The UK introduced standardized plain packaging in drab Pantone 448C with graphic pictorial warnings in 2016, driving adult smoking prevalence down to a record low of under 13%.',
          desc: 'The UK introduced standardized plain packaging in drab Pantone 448C with graphic pictorial warnings in 2016, driving adult smoking prevalence down to a record low of under 13%.',
          connective:
            'While advanced thoracic surgery, targeted radiotherapy, and immunotherapy have marginally improved prognosis, lung cancer’s stubbornly low 10-year survival rate (10%) proves statutory prevention remains far more effective than clinical cures.',
          question: 'Why does low cancer survival prove prevention beats cure?',
        },
      ],
    },
  },
};

function main() {
  const { unitData } = require(dataFilePath);
  console.log(`Loaded edexcel_medicine data. Total lessons: ${unitData.lessons.length}`);

  let updatedCount = 0;
  for (let i = 0; i < unitData.lessons.length; i++) {
    const lesson = unitData.lessons[i];
    if (modernSpines[lesson.id]) {
      const spine = modernSpines[lesson.id];
      lesson.workbook_stages = spine.workbook_stages;
      lesson.causal_domino_spine = spine.causal_domino_spine;
      // Also update timeline_anchor so it stays in full harmony
      lesson.timeline_anchor = spine.causal_domino_spine.stages.map((st) => ({
        date: st.date,
        title: st.title,
        desc: st.trigger,
        para_ref: st.para_ref,
      }));
      updatedCount++;
      console.log(`[OK] Injected spine & stages into ${lesson.id} (${lesson.title})`);
    }
  }

  const exportString = `export const unitData = ${JSON.stringify(unitData, null, 2)};\n`;
  fs.writeFileSync(dataFilePath, exportString, 'utf8');
  console.log(`🎉 Successfully updated ${updatedCount} Modern lessons in ${dataFilePath}`);
}

main();
