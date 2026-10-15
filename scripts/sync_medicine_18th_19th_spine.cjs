const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '..', 'units', 'edexcel_medicine', 'data.js');

const eighteenthNineteenthSpines = {
  lesson_3_1: {
    workbook_stages: [
      {
        step: 1,
        date: 'c1700–1850s',
        para_ref: '[1.1]',
        heading: 'Why did doctors believe disease created germs, rather than vice versa?',
        bullets: [
          'Smelling rotting meat and open cesspools',
          'Foul airborne damp blamed for illness',
          'Microscopes seeing tiny swimming creatures',
        ],
        focus_clue: 'Why did doctors believe disease created germs, rather than vice versa?',
      },
      {
        step: 2,
        date: '1861',
        para_ref: '[1.2]',
        heading: 'How did the swan-neck flask disprove spontaneous generation?',
        bullets: [
          'Heating sour beer inside glass flasks',
          'Bent swan necks trapping airborne dust',
          'Boiled broth staying clear and fresh',
        ],
        focus_clue: 'How did the swan-neck flask disprove spontaneous generation?',
      },
      {
        step: 3,
        date: '1867–1876',
        para_ref: '[1.3]',
        heading: 'Why did British doctors refuse to believe germs caused human illness?',
        bullets: [
          'London doctors defending bad air theory',
          'Shining light beams through dusty boxes',
          'Spraying smelly carbolic acid on cut flesh',
        ],
        focus_clue: 'Why did British doctors refuse to believe germs caused human illness?',
      },
      {
        step: 4,
        date: '1876–1882',
        para_ref: '[1.4]',
        heading: 'How did Koch’s staining and culture methods prove specificity?',
        bullets: [
          'Solid seaweed agar jelly in shallow dishes',
          'Staining microbes with bright purple dyes',
          'Photographing deadly tuberculosis under glass lenses',
        ],
        focus_clue: 'How did Koch’s staining and culture methods prove specificity?',
      },
      {
        step: 5,
        date: '1883–1890',
        para_ref: '[1.5]',
        heading: 'Why was photomicrography crucial in winning British doctors over?',
        bullets: [
          'Tracking curved cholera germs in river water',
          'Taking crisp black-and-white photos of germs',
          'Injecting farm animals to test poisons',
        ],
        focus_clue: 'Why was photomicrography crucial in winning British doctors over?',
      },
    ],
    causal_domino_spine: {
      title: 'Ideas on Causes: Pasteur’s Germ Theory & Koch’s Bacteriology',
      subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
      stages: [
        {
          step: 1,
          date: 'c1700–1850s',
          para_ref: '[1.1]',
          title: 'Spontaneous Generation & Miasma Orthodoxy',
          actor: 'Anti-Contagionist Doctors & Miasma Believers',
          tag: '🌫️ SPONTANEOUS GENERATION',
          trigger:
            'Before the 1860s, orthodox medical doctrine held that disease produced microscopic organisms spontaneously from rotting matter, believing atmospheric miasma caused epidemic fevers.',
          desc: 'Before the 1860s, orthodox medical doctrine held that disease produced microscopic organisms spontaneously from rotting matter, believing atmospheric miasma caused epidemic fevers.',
          connective:
            'Prevented physicians from searching for external microbial pathogens, delaying sanitary reform and targeted antimicrobial therapies for generations.',
          question: 'Why did doctors believe disease created germs, rather than vice versa?',
        },
        {
          step: 2,
          date: '1861',
          para_ref: '[1.2]',
          title: 'Louis Pasteur & Germ Theory',
          actor: 'Louis Pasteur (French Chemist)',
          tag: '🧪 SWAN-NECK FLASKS',
          trigger:
            'Louis Pasteur conducted swan-neck flask experiments on fermenting wine and beer, demonstrating that sterile liquids only rotted when exposed to airborne dust particles.',
          desc: 'Louis Pasteur conducted swan-neck flask experiments on fermenting wine and beer, demonstrating that sterile liquids only rotted when exposed to airborne dust particles.',
          connective:
            'Disproved spontaneous generation scientifically in 1861, publishing Germ Theory to prove that microscopic living organisms cause biological decay and fermentation.',
          question: 'How did the swan-neck flask disprove spontaneous generation?',
        },
        {
          step: 3,
          date: '1867–1876',
          para_ref: '[1.3]',
          title: 'British Scepticism & John Tyndall',
          actor: 'Dr Charlton Bastian & John Tyndall',
          tag: '🔬 BRITISH SCEPTICISM',
          trigger:
            'Prominent London physicians led by Dr Charlton Bastian vehemently rejected Pasteur’s findings, dismissing him as a mere chemist and insisting germs were harmless bystanders in human tissue.',
          desc: 'Prominent London physicians led by Dr Charlton Bastian vehemently rejected Pasteur’s findings, dismissing him as a mere chemist and insisting germs were harmless bystanders in human tissue.',
          connective:
            'Delayed British acceptance until physicist John Tyndall delivered lectures demonstrating airborne bacterial dust, bridging French chemistry and British medical pathology.',
          question: 'Why did British doctors refuse to believe germs caused human illness?',
        },
        {
          step: 4,
          date: '1876–1882',
          para_ref: '[1.4]',
          title: 'Robert Koch & Specific Bacteria',
          actor: 'Robert Koch (German Doctor & Bacteriologist)',
          tag: '🧫 SOLID AGAR CULTURES',
          trigger:
            'Robert Koch pioneered revolutionary laboratory methods, cultivating pure bacterial colonies on solid seaweed agar jelly and staining transparent microbes with synthetic methyl violet aniline dyes.',
          desc: 'Robert Koch pioneered revolutionary laboratory methods, cultivating pure bacterial colonies on solid seaweed agar jelly and staining transparent microbes with synthetic methyl violet aniline dyes.',
          connective:
            'Isolated the specific bacterial pathogens for anthrax (1876) and deadly human tuberculosis (1882), establishing the scientific discipline of medical bacteriology.',
          question: 'How did Koch’s staining and culture methods prove specificity?',
        },
        {
          step: 5,
          date: '1883–1890',
          para_ref: '[1.5]',
          title: 'Postulates & Microphotography',
          actor: 'Robert Koch & Microbe Hunters',
          tag: '📷 HIGH-RESOLUTION PHOTOMICROGRAPHY',
          trigger:
            'Koch isolated the comma-shaped Vibrio cholerae bacterium in 1883, formulated his 4 Postulates for proving causal pathogen links, and took sharp, indisputable photomicrographs.',
          desc: 'Koch isolated the comma-shaped Vibrio cholerae bacterium in 1883, formulated his 4 Postulates for proving causal pathogen links, and took sharp, indisputable photomicrographs.',
          connective:
            'Provided visual, irrefutable empirical evidence that finally convinced the British medical establishment to abandon miasma theory forever and invest in municipal bacteriology laboratories.',
          question: 'Why was photomicrography crucial in winning British doctors over?',
        },
      ],
    },
  },

  lesson_3_2: {
    workbook_stages: [
      {
        step: 1,
        date: '1721–1795',
        para_ref: '[2.1]',
        heading: 'Why was inoculation dangerous for poor urban communities?',
        bullets: [
          'Scabbing sores blinding young children',
          'Scratching live pus into healthy arms',
          'Paying rich doctors high guinea fees',
        ],
        focus_clue: 'Why was inoculation dangerous for poor urban communities?',
      },
      {
        step: 2,
        date: '1796–1798',
        para_ref: '[2.2]',
        heading: 'How did Jenner use scientific experimentation to test folklore?',
        bullets: [
          'Milking cows with clear smooth skin',
          'Scraping blister liquid into boy James Phipps',
          'Dosing boy with deadly pox without illness',
        ],
        focus_clue: 'How did Jenner use scientific experimentation to test folklore?',
      },
      {
        step: 3,
        date: '1798–1810s',
        para_ref: '[2.3]',
        heading: 'Why did London doctors and church leaders resist vaccination?',
        bullets: [
          'Printing scary cartoons with sprouting cow horns',
          'Church pulpits warning against beast blood',
          'Dirty hospital needles passing deadly infections',
        ],
        focus_clue: 'Why did London doctors and church leaders resist vaccination?',
      },
      {
        step: 4,
        date: '1802–1840',
        para_ref: '[2.4]',
        heading: 'Why did the British government abandon laissez-faire for vaccination?',
        bullets: [
          'Voting thirty thousand pounds in gold coins',
          'Giving free scratches to village babies',
          'Banning old dangerous pus cuts by law',
        ],
        focus_clue: 'Why did the British government abandon laissez-faire for vaccination?',
      },
      {
        step: 5,
        date: '1852–1871',
        para_ref: '[2.5]',
        heading: 'Why did making vaccination compulsory spark fierce public protests?',
        bullets: [
          'Fining poor parents for refusing jabs',
          'Angry street protests marching with banners',
          'Plunging death rates as smallpox disappears',
        ],
        focus_clue: 'Why did making vaccination compulsory spark fierce public protests?',
      },
    ],
    causal_domino_spine: {
      title: 'Approaches to Prevention: Edward Jenner & The Smallpox Vaccine',
      subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
      stages: [
        {
          step: 1,
          date: '1721–1795',
          para_ref: '[2.1]',
          title: 'Smallpox & Inoculation (Variolation)',
          actor: 'Lady Mary Wortley Montagu & Commercial Inoculators',
          tag: '💉 RISKY VARIOLATION',
          trigger:
            'Smallpox killed thousands of infants and scarred survivors, while variolation (inoculating live smallpox pus into healthy veins) carried a high risk of triggering lethal full-blown epidemics.',
          desc: 'Smallpox killed thousands of infants and scarred survivors, while variolation (inoculating live smallpox pus into healthy veins) carried a high risk of triggering lethal full-blown epidemics.',
          connective:
            'Remained an expensive, hazardous commercial luxury reserved for wealthy elites while offering no safe, universal protection for poor urban populations.',
          question: 'Why was inoculation dangerous for poor urban communities?',
        },
        {
          step: 2,
          date: '1796–1798',
          para_ref: '[2.2]',
          title: 'Edward Jenner & The Cowpox Vaccine',
          actor: 'Dr Edward Jenner (Gloucestershire GP)',
          tag: '🐄 EMPIRICAL COWPOX TEST',
          trigger:
            'Edward Jenner tested Gloucestershire dairy folklore by scraping cowpox pustule matter from dairymaid Sarah Nelmes and inoculating 8-year-old James Phipps in May 1796.',
          desc: 'Edward Jenner tested Gloucestershire dairy folklore by scraping cowpox pustule matter from dairymaid Sarah Nelmes and inoculating 8-year-old James Phipps in May 1796.',
          connective:
            'Subsequent inoculation with virulent smallpox failed to produce disease, experimentally proving that cowpox conferred safe, lasting immunity against lethal smallpox.',
          question: 'How did Jenner use scientific experimentation to test folklore?',
        },
        {
          step: 3,
          date: '1798–1810s',
          para_ref: '[2.3]',
          title: 'Medical & Religious Opposition',
          actor: 'Royal Jennerian Society Critics & Anti-Vaccinators',
          tag: '📰 ANTI-VACCINE CARTOONS',
          trigger:
            'When Jenner published his Inquiry in 1798, London physicians (Dr Woodville) contaminated samples with smallpox, while satirists published cartoons showing vaccinated patients sprouting cow heads.',
          desc: 'When Jenner published his Inquiry in 1798, London physicians (Dr Woodville) contaminated samples with smallpox, while satirists published cartoons showing vaccinated patients sprouting cow heads.',
          connective:
            'Religious pulpits condemned injecting animal matter as an affront to God, while commercial inoculators fought to protect their lucrative £20 inoculation fees.',
          question: 'Why did London doctors and church leaders resist vaccination?',
        },
        {
          step: 4,
          date: '1802–1840',
          para_ref: '[2.4]',
          title: 'Parliamentary Funding & Adoption',
          actor: 'British Parliament & Poor Law Guardians',
          tag: '🏛️ STATE VACCINATION FUNDING',
          trigger:
            'Impressed by rapid overseas adoption and falling mortality, the British Parliament voted Jenner £10,000 in 1802 and £20,000 in 1807 to support free national vaccination.',
          desc: 'Impressed by rapid overseas adoption and falling mortality, the British Parliament voted Jenner £10,000 in 1802 and £20,000 in 1807 to support free national vaccination.',
          connective:
            'Led to the 1840 Vaccination Act, which provided free infant vaccination paid by poor-law rates and outlawed dangerous smallpox variolation entirely.',
          question: 'Why did the British government abandon laissez-faire for vaccination?',
        },
        {
          step: 5,
          date: '1852–1871',
          para_ref: '[2.5]',
          title: 'Compulsory Acts & Anti-Vaccine League',
          actor: 'Registrar General & Anti-Vaccination League',
          tag: '⚖️ COMPULSORY HEALTH MANDATE',
          trigger:
            'Parliament made infant vaccination compulsory in 1852 and introduced strict fines for non-compliance in 1867, sparking the mass Anti-Vaccination League in Leicester and London.',
          desc: 'Parliament made infant vaccination compulsory in 1852 and introduced strict fines for non-compliance in 1867, sparking the mass Anti-Vaccination League in Leicester and London.',
          connective:
            'Despite fierce civil liberties protests, enforced infant vaccination crushed national smallpox death rates from over 40,000 per decade to virtually zero, proving the power of preventive state health policy.',
          question: 'Why did making vaccination compulsory spark fierce public protests?',
        },
      ],
    },
  },

  lesson_3_3: {
    workbook_stages: [
      {
        step: 1,
        date: 'c1700–1850',
        para_ref: '[3.1]',
        heading: 'Why were early Victorian hospital wards notorious death traps?',
        bullets: [
          'Crowded dark rooms smelling of festering wounds',
          'Drunk ward women sleeping on dirty rags',
          'Sharing blood-soaked blankets between beds',
        ],
        focus_clue: 'Why were early Victorian hospital wards notorious death traps?',
      },
      {
        step: 2,
        date: '1854–1856',
        para_ref: '[3.2]',
        heading: 'How did Nightingale’s sanitary reforms drastically cut the death rate?',
        bullets: [
          'Sewers overflowing beneath wooden ward floors',
          'Scrubbing dirty walls with boiling water and soap',
          'Feeding wounded soldiers hot fresh stew',
        ],
        focus_clue: 'How did Nightingale’s sanitary reforms drastically cut the death rate?',
      },
      {
        step: 3,
        date: '1859',
        para_ref: '[3.3]',
        heading: 'Why did Nightingale’s belief in miasma still produce effective hygiene?',
        bullets: [
          'Opening high windows for fresh river breezes',
          'Drawing colourful polar pie charts for MPs',
          'Demanding clean white cotton bandages',
        ],
        focus_clue: 'Why did Nightingale’s belief in miasma still produce effective hygiene?',
      },
      {
        step: 4,
        date: '1860s',
        para_ref: '[3.4]',
        heading: 'How did the pavilion plan prevent cross-infection between wards?',
        bullets: [
          'Building long narrow brick ward pavilions',
          'Washing smooth glazed walls with water',
          'Cross-ventilation blowing stale room air away',
        ],
        focus_clue: 'How did the pavilion plan prevent cross-infection between wards?',
      },
      {
        step: 5,
        date: '1860–1890s',
        para_ref: '[3.5]',
        heading: 'How did nurse training permanently raise the standard of hospital care?',
        bullets: [
          "Uniformed women learning medical rules at St Thomas'",
          'Stern matrons inspecting spotless bedside tables',
          'Fusing clean hands with microbe science',
        ],
        focus_clue: 'How did nurse training permanently raise the standard of hospital care?',
      },
    ],
    causal_domino_spine: {
      title: 'Improvements in Hospital Care: Florence Nightingale & Professional Nursing',
      subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
      stages: [
        {
          step: 1,
          date: 'c1700–1850',
          para_ref: '[3.1]',
          title: 'Voluntary Hospitals & Pre-Modern Nursing',
          actor: 'Victorian Voluntary Hospital Governors',
          tag: '🏥 PESTILENTIAL WARDS',
          trigger:
            'Early Victorian voluntary hospitals were unventilated, cramped pesthouses staffed by untrained, illiterate domestic cleaners like Dickens’ caricature Betsy Prig.',
          desc: 'Early Victorian voluntary hospitals were unventilated, cramped pesthouses staffed by untrained, illiterate domestic cleaners like Dickens’ caricature Betsy Prig.',
          connective:
            'Allowed hospital gangrene and pyaemia to spread rapidly between unwashed beds, giving hospitals a higher mortality rate for amputations than private home surgeries.',
          question: 'Why were early Victorian hospital wards notorious death traps?',
        },
        {
          step: 2,
          date: '1854–1856',
          para_ref: '[3.2]',
          title: 'Scutari & The Crimean War',
          actor: 'Florence Nightingale & 38 Volunteer Nurses',
          tag: '🧼 SCUTARI SANITARY REFORMS',
          trigger:
            'Florence Nightingale led 38 volunteer nurses to the Barrack Hospital at Scutari in 1854, finding wounded soldiers lying in raw sewage beneath overflowing cesspools.',
          desc: 'Florence Nightingale led 38 volunteer nurses to the Barrack Hospital at Scutari in 1854, finding wounded soldiers lying in raw sewage beneath overflowing cesspools.',
          connective:
            'Scrubbed ward floors, flushed blocked drains, boiled bedsheets, and set up kitchens, dramatically slashing the hospital mortality rate from 42% down to 2% within six months.',
          question: 'How did Nightingale’s sanitary reforms drastically cut the death rate?',
        },
        {
          step: 3,
          date: '1859',
          para_ref: '[3.3]',
          title: 'Notes on Nursing & Sanitary Science',
          actor: 'Florence Nightingale (Sanitary Reformer & Statistician)',
          tag: '📊 POLAR AREA DIAGRAMS',
          trigger:
            'Nightingale published Notes on Nursing (1859) and invented the Polar Area coxcomb diagram to visually prove to Queen Victoria and Parliament that preventable filth killed more soldiers than enemy bullets.',
          desc: 'Nightingale published Notes on Nursing (1859) and invented the Polar Area coxcomb diagram to visually prove to Queen Victoria and Parliament that preventable filth killed more soldiers than enemy bullets.',
          connective:
            'Although grounded in miasma theory rather than microbes, her insistence on pure air, pure water, efficient drainage, and cleanliness revolutionized military and civil hygiene.',
          question: 'Why did Nightingale’s belief in miasma still produce effective hygiene?',
        },
        {
          step: 4,
          date: '1860s',
          para_ref: '[3.4]',
          title: 'The Pavilion Plan Hospital Design',
          actor: 'Hospital Architects & St Thomas’ Hospital',
          tag: '🏛️ PAVILION WARD ARCHITECTURE',
          trigger:
            'Nightingale’s 1859 Notes on Hospitals recommended the Pavilion Plan: separate multi-storey brick pavilions connected by covered corridors, with large opposing windows for cross-ventilation.',
          desc: 'Nightingale’s 1859 Notes on Hospitals recommended the Pavilion Plan: separate multi-storey brick pavilions connected by covered corridors, with large opposing windows for cross-ventilation.',
          connective:
            "Adopted when rebuilding St Thomas' Hospital in London (1868–1871), establishing a national architectural standard that prevented airborne cross-infection between medical specialties.",
          question: 'How did the pavilion plan prevent cross-infection between wards?',
        },
        {
          step: 5,
          date: '1860–1890s',
          para_ref: '[3.5]',
          title: 'Professional Nurse Training & Asepsis',
          actor: 'The Nightingale School of Nursing',
          tag: '👩‍⚕️ PROFESSIONAL NURSE TRAINING',
          trigger:
            'Using the £45,000 public Nightingale Fund, she established the Nightingale School of Nursing at St Thomas’ Hospital in 1860, training disciplined, educated women in sanitary protocols.',
          desc: 'Using the £45,000 public Nightingale Fund, she established the Nightingale School of Nursing at St Thomas’ Hospital in 1860, training disciplined, educated women in sanitary protocols.',
          connective:
            'Displaced the old drunken nurse stereotype with professional, respected medical practitioners, preparing hospital staff to implement aseptic surgical and antiseptic routines effortlessly by the 1890s.',
          question: 'How did nurse training permanently raise the standard of hospital care?',
        },
      ],
    },
  },

  lesson_3_4: {
    workbook_stages: [
      {
        step: 1,
        date: 'c1700–1846',
        para_ref: '[4.1]',
        heading: 'Why was surgical speed essential before the discovery of anaesthetics?',
        bullets: [
          'Holding down screaming patients with leather straps',
          'Sawing off broken legs in thirty seconds',
          'Breathing sweet laughing gas at fairgrounds',
        ],
        focus_clue: 'Why was surgical speed essential before the discovery of anaesthetics?',
      },
      {
        step: 2,
        date: '1847–1853',
        para_ref: '[4.2]',
        heading: 'Why did the death of Hannah Greener cause panic among surgeons?',
        bullets: [
          'Sniffing heavy liquid vapour under dinner table',
          'Young Hannah Greener dying from cold overdose',
          'Queen Victoria giving birth with zero pain',
        ],
        focus_clue: 'Why did the death of Hannah Greener cause panic among surgeons?',
      },
      {
        step: 3,
        date: '1846–1865',
        para_ref: '[4.3]',
        heading: 'Why did conquering surgical pain lead to higher patient death rates?',
        bullets: [
          'Wearing stiff dried blood coats as badges',
          'Cutting deeper into belly flesh for longer',
          'Black rotting gangrene killing feverish patients',
        ],
        focus_clue: 'Why did conquering surgical pain lead to higher patient death rates?',
      },
      {
        step: 4,
        date: '1865–1870s',
        para_ref: '[4.4]',
        heading: 'How did Lister apply Germ Theory to solve hospital gangrene?',
        bullets: [
          'Treating green sewage water with smelly chemicals',
          "Wrapping boy Jamie Greenlees' fractured leg",
          'Pumping fine acid mist over open surgical wounds',
        ],
        focus_clue: 'How did Lister apply Germ Theory to solve hospital gangrene?',
      },
      {
        step: 5,
        date: '1880s–1890s',
        para_ref: '[4.5]',
        heading: 'What is the crucial difference between antiseptic and aseptic surgery?',
        bullets: [
          'Boiling metal scalpels in pressurized steam kettles',
          'Pulling on thin sterile rubber gloves',
          'Tying white cotton masks over mouths and noses',
        ],
        focus_clue: 'What is the crucial difference between antiseptic and aseptic surgery?',
      },
    ],
    causal_domino_spine: {
      title: 'The Surgical Revolution: Simpson’s Chloroform & Lister’s Antiseptics',
      subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
      stages: [
        {
          step: 1,
          date: 'c1700–1846',
          para_ref: '[4.1]',
          title: 'Pre-Anaesthetic Surgery: Speed & Shock',
          actor: 'Robert Liston & Pre-Anaesthetic Surgeons',
          tag: '⏱️ 30-SECOND AMPUTATIONS',
          trigger:
            'Before anaesthesia, surgical survival depended entirely on raw knife speed, with surgeons like Robert Liston amputating limbs in under 30 seconds while burly assistants pinned screaming patients.',
          desc: 'Before anaesthesia, surgical survival depended entirely on raw knife speed, with surgeons like Robert Liston amputating limbs in under 30 seconds while burly assistants pinned screaming patients.',
          connective:
            'Severe traumatic shock and haemorrhage killed over 40% of operative patients, preventing surgeons from attempting delicate internal thoracic or abdominal procedures.',
          question: 'Why was surgical speed essential before the discovery of anaesthetics?',
        },
        {
          step: 2,
          date: '1847–1853',
          para_ref: '[4.2]',
          title: 'James Simpson & Chloroform',
          actor: 'Professor James Simpson & Dr John Snow',
          tag: '😴 CHEMICAL CHLOROFORM',
          trigger:
            'Edinburgh professor James Simpson discovered the anaesthetic properties of chloroform in 1847; however, the fatal overdose of 15-year-old Hannah Greener in 1848 exposed dangerous dosage volatility.',
          desc: 'Edinburgh professor James Simpson discovered the anaesthetic properties of chloroform in 1847; however, the fatal overdose of 15-year-old Hannah Greener in 1848 exposed dangerous dosage volatility.',
          connective:
            'Dr John Snow invented a precision inhaler mask in 1853 to safely administer chloroform to Queen Victoria during Prince Leopold’s birth, securing royal endorsement and widespread medical acceptance.',
          question: 'Why did the death of Hannah Greener cause panic among surgeons?',
        },
        {
          step: 3,
          date: '1846–1865',
          para_ref: '[4.3]',
          title: 'The "Black Period" of Surgery',
          actor: 'Victorian Operating Surgeons',
          tag: '☠️ THE BLACK PERIOD',
          trigger:
            'Anaesthesia allowed surgeons to perform longer, more invasive internal operations, but surgeons still operated in blood-caked frock coats with unwashed hands and infected catgut sutures.',
          desc: 'Anaesthesia allowed surgeons to perform longer, more invasive internal operations, but surgeons still operated in blood-caked frock coats with unwashed hands and infected catgut sutures.',
          connective:
            'Triggered the catastrophic "Black Period" of surgery, where post-operative mortality surged due to virulent hospital gangrene, pyaemia, and sepsis invading open incisions.',
          question: 'Why did conquering surgical pain lead to higher patient death rates?',
        },
        {
          step: 4,
          date: '1865–1870s',
          para_ref: '[4.4]',
          title: 'Joseph Lister & Carbolic Acid Spray',
          actor: 'Joseph Lister (Professor of Surgery, Glasgow)',
          tag: '💨 CARBOLIC ACID SPRAY',
          trigger:
            "Applying Pasteur’s Germ Theory, Joseph Lister used carbolic acid (phenol) dressings to heal Jamie Greenlees' compound fractured leg in 1865 and built a steam carbolic spray to sanitize operating theatres.",
          desc: "Applying Pasteur’s Germ Theory, Joseph Lister used carbolic acid (phenol) dressings to heal Jamie Greenlees' compound fractured leg in 1865 and built a steam carbolic spray to sanitize operating theatres.",
          connective:
            'Plunged post-operative amputation mortality from 46% to 15% at Glasgow Royal Infirmary, definitively proving that microscopic airborne pathogens caused surgical wound sepsis.',
          question: 'How did Lister apply Germ Theory to solve hospital gangrene?',
        },
        {
          step: 5,
          date: '1880s–1890s',
          para_ref: '[4.5]',
          title: 'From Antiseptic to Aseptic Surgery',
          actor: 'Ernst von Bergmann & William Halsted',
          tag: '🧼 ASEPTIC AUTOCLAVES',
          trigger:
            'Surgeons realized Lister’s carbolic spray damaged human tissue and lungs, transitioning from killing germs inside wounds (antiseptic) to excluding all microbes from the theatre entirely (aseptic).',
          desc: 'Surgeons realized Lister’s carbolic spray damaged human tissue and lungs, transitioning from killing germs inside wounds (antiseptic) to excluding all microbes from the theatre entirely (aseptic).',
          connective:
            'Ernst von Bergmann introduced pressurized steam autoclave sterilizers in 1886, while William Halsted introduced thin rubber surgical gloves in 1890, creating the modern sterile operating theatre.',
          question: 'What is the crucial difference between antiseptic and aseptic surgery?',
        },
      ],
    },
  },

  lesson_3_5: {
    workbook_stages: [
      {
        step: 1,
        date: '1831–1848',
        para_ref: '[5.1]',
        heading: 'Why did towns refuse to set up health boards under the 1848 Act?',
        bullets: [
          'Violent watery sickness turning human skin blue',
          'Piles of human excrement rotting near houses',
          'Parliament passing optional town health boards',
        ],
        focus_clue: 'Why did towns refuse to set up health boards under the 1848 Act?',
      },
      {
        step: 2,
        date: '1854',
        para_ref: '[5.2]',
        heading: 'How did Snow use epidemiological mapping to prove water transmission?',
        bullets: [
          'Plotting black death bars on street map',
          'Brewery men drinking ale staying completely healthy',
          'Unscrewing heavy iron pump handle with wrench',
        ],
        focus_clue: 'How did Snow use epidemiological mapping to prove water transmission?',
      },
      {
        step: 3,
        date: '1854–1858',
        para_ref: '[5.3]',
        heading: 'Why did the medical establishment refuse to accept Snow’s water theory?',
        bullets: [
          'Cracked brick cesspool leaking into drinking well',
          'Medical journals laughing at dirty water theory',
          'Doctors burning pitch barrels in foggy streets',
        ],
        focus_clue: 'Why did the medical establishment refuse to accept Snow’s water theory?',
      },
      {
        step: 4,
        date: '1858–1865',
        para_ref: '[5.4]',
        heading: 'Why did fear of miasma paradoxically save thousands from cholera?',
        bullets: [
          'Boiling brown river mud halting Parliament debates',
          'Soaking courtroom window curtains in lime juice',
          'Digging thousand miles of underground brick tunnels',
        ],
        focus_clue: 'Why did fear of miasma paradoxically save thousands from cholera?',
      },
      {
        step: 5,
        date: '1875',
        para_ref: '[5.5]',
        heading: 'Why was the 1875 Act the definitive death blow to laissez-faire?',
        bullets: [
          'Working factory men winning parliamentary votes',
          'Forcing town councils to pipe clean fresh water',
          'Hiring official medical inspectors for bad food',
        ],
        focus_clue: 'Why was the 1875 Act the definitive death blow to laissez-faire?',
      },
    ],
    causal_domino_spine: {
      title: 'Public Health & Cholera: John Snow & The 1875 Public Health Act',
      subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
      stages: [
        {
          step: 1,
          date: '1831–1848',
          para_ref: '[5.1]',
          title: 'Epidemic Terror & Edwin Chadwick',
          actor: 'Edwin Chadwick & General Board of Health',
          tag: "📜 CHADWICK'S 1842 REPORT",
          trigger:
            'Terrifying cholera epidemics swept British cities from 1831, prompting Edwin Chadwick’s 1842 Report on the Sanitary Condition of the Labouring Population advocating clean water pipes and sewer networks.',
          desc: 'Terrifying cholera epidemics swept British cities from 1831, prompting Edwin Chadwick’s 1842 Report on the Sanitary Condition of the Labouring Population advocating clean water pipes and sewer networks.',
          connective:
            'Parliament passed the 1848 Public Health Act; however, its permissive, optional powers were widely rejected by rate-paying ratepayers unwilling to fund expensive municipal civil engineering.',
          question: 'Why did towns refuse to set up health boards under the 1848 Act?',
        },
        {
          step: 2,
          date: '1854',
          para_ref: '[5.2]',
          title: 'John Snow & The Broad Street Pump',
          actor: 'Dr John Snow (Soho Epidemiologist)',
          tag: '🗺️ CHOLERA PIN MAP',
          trigger:
            'During the August 1854 Soho cholera outbreak, Dr John Snow mapped 500 fatal cases, demonstrating that deaths clustered tightly around the Broad Street communal public water pump.',
          desc: 'During the August 1854 Soho cholera outbreak, Dr John Snow mapped 500 fatal cases, demonstrating that deaths clustered tightly around the Broad Street communal public water pump.',
          connective:
            'Discovered brewery workers drinking malt liquor avoided infection entirely, persuading the local parish vestry to remove the pump handle and ending the local epidemic overnight.',
          question: 'How did Snow use epidemiological mapping to prove water transmission?',
        },
        {
          step: 3,
          date: '1854–1858',
          para_ref: '[5.3]',
          title: 'Board of Health & Miasma Orthodoxy',
          actor: 'William Farr & General Board of Health',
          tag: '🌫️ MIASMA ORTHODOXY',
          trigger:
            'Even after Snow proved a cracked cesspool had leaked infant cholera diarrhoea into the Broad Street well, the General Board of Health and Lancet journal rejected his waterborne theory.',
          desc: 'Even after Snow proved a cracked cesspool had leaked infant cholera diarrhoea into the Broad Street well, the General Board of Health and Lancet journal rejected his waterborne theory.',
          connective:
            'Elite physicians defended the entrenched miasma doctrine, refusing to abandon atmospheric damp and foul smells as the primary causal agents of epidemic disease.',
          question: 'Why did the medical establishment refuse to accept Snow’s water theory?',
        },
        {
          step: 4,
          date: '1858–1865',
          para_ref: '[5.4]',
          title: 'The Great Stink & Bazalgette’s Sewers',
          actor: 'Joseph Bazalgette (Metropolitan Board of Works)',
          tag: '🧱 EMBANKMENT SEWER NETWORK',
          trigger:
            'During the blistering summer heat of 1858, untreated sewage in the River Thames created the unbearable "Great Stink", forcing MPs in Parliament to soak window curtains in chloride of lime.',
          desc: 'During the blistering summer heat of 1858, untreated sewage in the River Thames created the unbearable "Great Stink", forcing MPs in Parliament to soak window curtains in chloride of lime.',
          connective:
            'Terrified MPs rapidly granted Sir Joseph Bazalgette £3 million to construct 1,100 miles of underground brick intercepting sewers, paradoxically removing waterborne cholera from London’s drinking supply.',
          question: 'Why did fear of miasma paradoxically save thousands from cholera?',
        },
        {
          step: 5,
          date: '1875',
          para_ref: '[5.5]',
          title: 'The 1875 Public Health Act: End of Laissez-Faire',
          actor: 'Benjamin Disraeli & Conservative Government',
          tag: '🏛️ COMPULSORY PUBLIC HEALTH ACT',
          trigger:
            'Following the 1867 Reform Act granting urban working men the vote, Prime Minister Benjamin Disraeli championed "Sanitas Sanitatum", passing the landmark Public Health Act of 1875.',
          desc: 'Following the 1867 Reform Act granting urban working men the vote, Prime Minister Benjamin Disraeli championed "Sanitas Sanitatum", passing the landmark Public Health Act of 1875.',
          connective:
            'Replaced optional recommendations with strict compulsory duties, mandating town councils to provide clean water, collect rubbish, inspect food, and hire Medical Officers of Health, permanently ending laissez-faire.',
          question: 'Why was the 1875 Act the definitive death blow to laissez-faire?',
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
    if (eighteenthNineteenthSpines[lesson.id]) {
      const spine = eighteenthNineteenthSpines[lesson.id];
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
  console.log(
    `🎉 Successfully updated ${updatedCount} 18th & 19th Century lessons in ${dataFilePath}`,
  );
}

main();
