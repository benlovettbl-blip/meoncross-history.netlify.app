const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '..', 'units', 'edexcel_medicine', 'data.js');

const renaissanceSpines = {
  lesson_2_1: {
    workbook_stages: [
      {
        step: 1,
        date: 'c1440–1476',
        para_ref: '[1.1–1.2]',
        heading: 'Why did printing break the clerical monopoly on medical learning?',
        bullets: [
          'Casting lead type in Gutenberg’s German workshop',
          'Setting up William Caxton’s Westminster press',
          'Printing hundreds of identical illustrated medical books',
        ],
        focus_clue: 'Why did printing break the clerical monopoly on medical learning?',
      },
      {
        step: 2,
        date: 'c1500',
        para_ref: '[2.1]',
        heading: 'How did humanism inspire physicians to challenge Galen?',
        bullets: [
          'Translating original Greek manuscripts directly',
          'Spotting errors made by medieval monk copyists',
          'Urging independent questioning of ancient authority',
        ],
        focus_clue: 'How did humanism inspire physicians to challenge Galen?',
      },
      {
        step: 3,
        date: '1660–1662',
        para_ref: '[2.1–2.2]',
        heading: 'Why was experimental observation central to the Royal Society?',
        bullets: [
          'Meeting at Gresham College in London',
          'Receiving royal charter from King Charles II',
          'Adopting Latin motto "Nullius in Verba"',
        ],
        focus_clue: 'Why was experimental observation central to the Royal Society?',
      },
      {
        step: 4,
        date: '1665',
        para_ref: '[2.2]',
        heading: 'How did scientific journals speed up the exchange of medical knowledge?',
        bullets: [
          'Publishing Henry Oldenburg’s monthly scientific journal',
          'Distributing experimental reports across Europe',
          'Debating laboratory findings among rival scientists',
        ],
        focus_clue: 'How did scientific journals speed up the exchange of medical knowledge?',
      },
      {
        step: 5,
        date: '1665–1676',
        para_ref: '[3.1–3.2]',
        heading: 'Why did 17th-century microscopes fail to transform medical treatment?',
        bullets: [
          'Grinding curved glass lenses in brass cylinders',
          'Sketching flea legs in Hooke’s Micrographia',
          'Observing tiny swimming creatures in pond water',
        ],
        focus_clue: 'Why did 17th-century microscopes fail to transform medical treatment?',
      },
    ],
    causal_domino_spine: {
      title: 'The New Spirit of Enquiry: Printing Press & The Royal Society',
      subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
      stages: [
        {
          step: 1,
          date: 'c1440–1476',
          para_ref: '[1.1–1.2]',
          title: 'The Movable Metal Printing Press',
          actor: 'Johannes Gutenberg & William Caxton',
          tag: '🖨️ PRINTING REVOLUTION',
          trigger:
            'Johannes Gutenberg in Mainz (c.1440) and William Caxton in Westminster (1476) introduced movable metal type, allowing identical medical treatises to be produced in weeks rather than years of manual transcription.',
          desc: 'Johannes Gutenberg in Mainz (c.1440) and William Caxton in Westminster (1476) introduced movable metal type, allowing identical medical treatises to be produced in weeks rather than years of manual transcription.',
          connective:
            'Bypassed monastic scriptoria and church censorship, breaking the clerical monopoly over the reproduction and distribution of medical texts.',
          question: 'Why did printing break the clerical monopoly on medical learning?',
        },
        {
          step: 2,
          date: 'c1500',
          para_ref: '[2.1]',
          title: 'Renaissance Humanism & Ancient Texts',
          actor: 'Renaissance Humanist Scholars',
          tag: '📜 SCHOLARLY HUMANISM',
          trigger:
            'Humanist scholars translated original ancient Greek manuscripts directly, discovering that medieval monk copyists had introduced centuries of translation errors into Galen’s Latin editions.',
          desc: 'Humanist scholars translated original ancient Greek manuscripts directly, discovering that medieval monk copyists had introduced centuries of translation errors into Galen’s Latin editions.',
          connective:
            'Encouraged natural philosophers to question traditional dogma and demand empirical, observable proof from nature rather than blind textual deference.',
          question: 'How did humanism inspire physicians to challenge Galen?',
        },
        {
          step: 3,
          date: '1660–1662',
          para_ref: '[2.1–2.2]',
          title: 'Foundation of the Royal Society',
          actor: 'King Charles II & Gresham College Scholars',
          tag: '🏛️ EMPIRICAL INSTITUTION',
          trigger:
            'Twelve natural philosophers met at Gresham College in 1660 and received a Royal Charter from King Charles II in 1662, adopting the motto Nullius in Verba ("Take nobody’s word for it").',
          desc: 'Twelve natural philosophers met at Gresham College in 1660 and received a Royal Charter from King Charles II in 1662, adopting the motto Nullius in Verba ("Take nobody’s word for it").',
          connective:
            'Replaced hearsay with weekly laboratory demonstrations, institutionalizing empirical observation and experimental repeatability as the foundation of English science.',
          question: 'Why was experimental observation central to the Royal Society?',
        },
        {
          step: 4,
          date: '1665',
          para_ref: '[2.2]',
          title: 'Philosophical Transactions & Peer Review',
          actor: 'Henry Oldenburg & International Scientists',
          tag: '📖 SCIENTIFIC JOURNAL',
          trigger:
            'Royal Society secretary Henry Oldenburg published Philosophical Transactions, establishing the world’s first regular, peer-reviewed scientific journal.',
          desc: 'Royal Society secretary Henry Oldenburg published Philosophical Transactions, establishing the world’s first regular, peer-reviewed scientific journal.',
          connective:
            'Created an international communications network enabling European researchers to verify, replicate, and debate discoveries, permanently democratizing scientific inquiry.',
          question: 'How did scientific journals speed up the exchange of medical knowledge?',
        },
        {
          step: 5,
          date: '1665–1676',
          para_ref: '[3.1–3.2]',
          title: 'Early Microscopes & Animalcules',
          actor: 'Robert Hooke & Antonie van Leeuwenhoek',
          tag: '🔬 OPTICAL MICROSCOPY',
          trigger:
            'Robert Hooke published Micrographia (1665) illustrating magnified fleas, and Antonie van Leeuwenhoek used single-lens microscopes to observe living bacteria ("animalcules") in 1676.',
          desc: 'Robert Hooke published Micrographia (1665) illustrating magnified fleas, and Antonie van Leeuwenhoek used single-lens microscopes to observe living bacteria ("animalcules") in 1676.',
          connective:
            'Proved that an invisible microscopic realm existed, but produced zero immediate medical treatments because physicians did not connect microorganisms to disease until Pasteur in 1861.',
          question: 'Why did 17th-century microscopes fail to transform medical treatment?',
        },
      ],
    },
  },

  lesson_2_2: {
    workbook_stages: [
      {
        step: 1,
        date: '1660s',
        para_ref: '[1.1–1.2]',
        heading: 'Why did Sydenham believe bedside observation surpassed textbook learning?',
        bullets: [
          'Visiting sick London patients in private bedrooms',
          'Ignoring ancient scholastic university lectures',
          'Recording clinical symptoms in detailed notebooks',
        ],
        focus_clue: 'Why did Sydenham believe bedside observation surpassed textbook learning?',
      },
      {
        step: 2,
        date: '1676',
        para_ref: '[2.1–2.2]',
        heading: 'How did classifying diseases challenge traditional individual humoral theory?',
        bullets: [
          'Classifying distinct illnesses like modern botanists',
          'Distinguishing measles from scarlet fever rashes',
          'Publishing authoritative textbook used for two centuries',
        ],
        focus_clue: 'How did classifying diseases challenge traditional individual humoral theory?',
      },
      {
        step: 3,
        date: 'c1670s',
        para_ref: '[3.2]',
        heading: 'Why was the success of Peruvian bark a mortal blow to humoral balance?',
        bullets: [
          'Importing bitter Peruvian tree bark to London',
          'Dosing marshland ague fevers with powdered bark',
          'Proving specific remedies cured specific diseases',
        ],
        focus_clue: 'Why was the success of Peruvian bark a mortal blow to humoral balance?',
      },
      {
        step: 4,
        date: 'c1670s',
        para_ref: '[3.1]',
        heading: 'Why did Sydenham’s cool treatment drastically cut smallpox deaths?',
        bullets: [
          'Throwing off heavy baronial wool blankets',
          'Opening window shutters to let in cold wind',
          'Giving cool drinks instead of scalding wines',
        ],
        focus_clue: 'Why did Sydenham’s cool treatment drastically cut smallpox deaths?',
      },
      {
        step: 5,
        date: '1680s',
        para_ref: '[4.1–4.2]',
        heading: 'Why did medical treatments remain mostly medieval despite Sydenham?',
        bullets: [
          'Continuing to believe miasma caused epidemics',
          'Lacking laboratory tools to identify bacteria',
          'Leaving ordinary patient treatment largely unchanged',
        ],
        focus_clue: 'Why did medical treatments remain mostly medieval despite Sydenham?',
      },
    ],
    causal_domino_spine: {
      title: 'Thomas Sydenham: Bedside Observation & Clinical Classification',
      subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
      stages: [
        {
          step: 1,
          date: '1660s',
          para_ref: '[1.1–1.2]',
          title: 'Rejecting Book Learning at the Bedside',
          actor: 'Thomas Sydenham ("English Hippocrates")',
          tag: '🩺 CLINICAL OBSERVATION',
          trigger:
            'Practicing in Westminster after serving as a cavalry officer, Thomas Sydenham rejected university book-learning and urine-gazing, sitting beside patients to record symptoms firsthand.',
          desc: 'Practicing in Westminster after serving as a cavalry officer, Thomas Sydenham rejected university book-learning and urine-gazing, sitting beside patients to record symptoms firsthand.',
          connective:
            'Revived Hippocratic clinical observation, placing the patient’s physical symptoms rather than ancient Latin dogma at the center of medical diagnosis.',
          question: 'Why did Sydenham believe bedside observation surpassed textbook learning?',
        },
        {
          step: 2,
          date: '1676',
          para_ref: '[2.1–2.2]',
          title: 'Observationes Medicae & Disease Classification',
          actor: 'Thomas Sydenham & European Clinicians',
          tag: '📚 PATHOLOGICAL TAXONOMY',
          trigger:
            'In his 1676 masterwork Observationes Medicae, Sydenham classified diseases into botanical-style species, proving that measles and scarlet fever were two distinct biological disorders.',
          desc: 'In his 1676 masterwork Observationes Medicae, Sydenham classified diseases into botanical-style species, proving that measles and scarlet fever were two distinct biological disorders.',
          connective:
            'Demolished the ancient belief that disease was merely a unique personal humoural imbalance, proving illnesses were separate external entities that behaved predictably.',
          question: 'How did classifying diseases challenge traditional individual humoral theory?',
        },
        {
          step: 3,
          date: 'c1670s',
          para_ref: '[3.2]',
          title: 'Quinine & Cinchona Bark for Malaria',
          actor: 'Thomas Sydenham & Colonial Traders',
          tag: '🌿 TARGETED PHARMACOLOGY',
          trigger:
            'Sydenham championed Peruvian cinchona bark (containing quinine) to cure marshland ague (malaria), alongside formulating liquid laudanum (opium in alcohol) for severe pain.',
          desc: 'Sydenham championed Peruvian cinchona bark (containing quinine) to cure marshland ague (malaria), alongside formulating liquid laudanum (opium in alcohol) for severe pain.',
          connective:
            'Proved that specific chemical remedies could target specific diseases, dealing a fatal conceptual blow to universal humoural purging.',
          question: 'Why was the success of Peruvian bark a mortal blow to humoral balance?',
        },
        {
          step: 4,
          date: 'c1670s',
          para_ref: '[3.1]',
          title: 'Cool Therapy for Smallpox Fevers',
          actor: 'Thomas Sydenham & London Patients',
          tag: '🪟 EMPIRICAL REGIMEN',
          trigger:
            'Sydenham abandoned traditional suffocating heating regimes for smallpox, pioneering a cooling regimen of fresh circulating air, light bedcovers, and cool cordials.',
          desc: 'Sydenham abandoned traditional suffocating heating regimes for smallpox, pioneering a cooling regimen of fresh circulating air, light bedcovers, and cool cordials.',
          connective:
            'Dramatically reduced smallpox fatalities among his patients, proving that simple empirical common-sense treatments surpassed centuries of theoretical Galenic sweat therapies.',
          question: 'Why did Sydenham’s cool treatment drastically cut smallpox deaths?',
        },
        {
          step: 5,
          date: '1680s',
          para_ref: '[4.1–4.2]',
          title: 'The Limits of Sydenham’s Legacy',
          actor: 'Conservative London Physicians',
          tag: '⚖️ HISTORICAL PARADOX',
          trigger:
            'Without knowledge of bacteria or viruses, Sydenham still attributed epidemics to atmospheric miasma and continued to prescribe traditional bloodletting for unyielding illnesses.',
          desc: 'Without knowledge of bacteria or viruses, Sydenham still attributed epidemics to atmospheric miasma and continued to prescribe traditional bloodletting for unyielding illnesses.',
          connective:
            'Illustrated that while Renaissance observation revolutionized clinical diagnosis, everyday medical treatments remained anchored to medieval practices until germ theory.',
          question: 'Why did medical treatments remain mostly medieval despite Sydenham?',
        },
      ],
    },
  },

  lesson_2_3: {
    workbook_stages: [
      {
        step: 1,
        date: '1537',
        para_ref: '[1.1–1.2]',
        heading: 'Why was a professor dissecting human bodies revolutionary in 1537?',
        bullets: [
          'Climbing down from high lecturer chairs',
          'Picking up steel dissection scalpels directly',
          'Opening executed criminal bodies on wooden slabs',
        ],
        focus_clue: 'Why was a professor dissecting human bodies revolutionary in 1537?',
      },
      {
        step: 2,
        date: '1540',
        para_ref: '[2.1–2.2]',
        heading: 'How did Vesalius prove Galen had made anatomical mistakes?',
        bullets: [
          'Showing human jawbones consist of one piece',
          'Proving human breastbones have three segments',
          'Demonstrating Galen dissected pigs and Barbary apes',
        ],
        focus_clue: 'How did Vesalius prove Galen had made anatomical mistakes?',
      },
      {
        step: 3,
        date: '1543',
        para_ref: '[3.1–3.2]',
        heading: 'Why was The Fabrica considered a masterpiece of Renaissance science?',
        bullets: [
          'Printing seven massive anatomical volumes in Basel',
          'Engraving precise woodcut plates of human muscles',
          'Dedication presented to Holy Roman Emperor Charles V',
        ],
        focus_clue: 'Why was The Fabrica considered a masterpiece of Renaissance science?',
      },
      {
        step: 4,
        date: '1545–1553',
        para_ref: '[3.2]',
        heading: 'How did English translations spread Vesalius’s ideas to barber-surgeons?',
        bullets: [
          'Copying Vesalius’s woodcuts onto English copper plates',
          'Translating Latin descriptions into everyday English',
          'Selling anatomy manuals to London barber-surgeons',
        ],
        focus_clue: 'How did English translations spread Vesalius’s ideas to barber-surgeons?',
      },
      {
        step: 5,
        date: 'c1560',
        para_ref: '[4.1–4.2]',
        heading:
          'Why did Vesalius’s anatomical discoveries fail to save sick patients immediately?',
        bullets: [
          'Facing angry attacks from conservative university professors',
          'Resigning academic post to serve royal courts',
          'Acknowledging anatomy did not yet cure living sickness',
        ],
        focus_clue:
          'Why did Vesalius’s anatomical discoveries fail to save sick patients immediately?',
      },
    ],
    causal_domino_spine: {
      title: 'Andreas Vesalius: The Anatomical Revolution & De Fabrica',
      subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
      stages: [
        {
          step: 1,
          date: '1537',
          para_ref: '[1.1–1.2]',
          title: 'Professor of Surgery at Padua University',
          actor: 'Andreas Vesalius & Padua Medical Faculty',
          tag: '🔪 HUMAN DISSECTION',
          trigger:
            'Appointed Professor of Surgery at Padua in 1537 aged 23, Vesalius descended from the elevated academic cathedra to perform human dissections personally with his own scalpels.',
          desc: 'Appointed Professor of Surgery at Padua in 1537 aged 23, Vesalius descended from the elevated academic cathedra to perform human dissections personally with his own scalpels.',
          connective:
            'Ended centuries of passive textual chanting from Galen, establishing direct firsthand human dissection as the only trustworthy foundation of anatomical learning.',
          question: 'Why was a professor dissecting human bodies revolutionary in 1537?',
        },
        {
          step: 2,
          date: '1540',
          para_ref: '[2.1–2.2]',
          title: 'Proving Galen Wrong on Human Anatomy',
          actor: 'Andreas Vesalius',
          tag: '🦴 DISPROVING GALEN',
          trigger:
            'Through meticulous dissections, Vesalius proved Galen had dissected Barbary apes and pigs rather than humans, documenting over 300 major anatomical errors in Galen’s texts.',
          desc: 'Through meticulous dissections, Vesalius proved Galen had dissected Barbary apes and pigs rather than humans, documenting over 300 major anatomical errors in Galen’s texts.',
          connective:
            'Proved that the human lower jaw was a single bone, the breastbone had three parts, and the heart septum was solid, shattering the myth of Galen’s infallibility.',
          question: 'How did Vesalius prove Galen had made anatomical mistakes?',
        },
        {
          step: 3,
          date: '1543',
          para_ref: '[3.1–3.2]',
          title: 'Publication of De Humani Corporis Fabrica',
          actor: 'Andreas Vesalius & Titian Workshop Artists',
          tag: '📖 MASTERPIECE ATLAS',
          trigger:
            'In Basel in 1543, Vesalius published De Humani Corporis Fabrica ("On the Fabric of the Human Body"), containing over 200 breathtakingly precise anatomical woodcut plates.',
          desc: 'In Basel in 1543, Vesalius published De Humani Corporis Fabrica ("On the Fabric of the Human Body"), containing over 200 breathtakingly precise anatomical woodcut plates.',
          connective:
            'Distributed mathematically accurate visual blueprints of the human body across Europe, setting an unalterable new international standard for medical illustration.',
          question: 'Why was The Fabrica considered a masterpiece of Renaissance science?',
        },
        {
          step: 4,
          date: '1545–1553',
          para_ref: '[3.2]',
          title: 'Thomas Geminus & Dissemination in Britain',
          actor: 'Thomas Geminus & London Barber-Surgeons',
          tag: '🇬🇧 ENGLISH DISSEMINATION',
          trigger:
            'Engraver Thomas Geminus copied Vesalius’s illustrations onto copper plates in London, publishing an English-language anatomy manual titled Compendiosa in 1545.',
          desc: 'Engraver Thomas Geminus copied Vesalius’s illustrations onto copper plates in London, publishing an English-language anatomy manual titled Compendiosa in 1545.',
          connective:
            'Bypassed Latin academic elites to place accurate anatomical maps directly into the hands of English barber-surgeons and apprentices throughout London.',
          question: 'How did English translations spread Vesalius’s ideas to barber-surgeons?',
        },
        {
          step: 5,
          date: 'c1560',
          para_ref: '[4.1–4.2]',
          title: 'Fierce Opposition & Practical Limitations',
          actor: 'Jacobus Sylvius & Conservative Galenists',
          tag: '⚔️ ACADEMIC RESISTANCE',
          trigger:
            'Conservative professors like Jacobus Sylvius denounced Vesalius as a madman, while ordinary physicians continued humoural bleeding because anatomy did not yet cure internal sickness.',
          desc: 'Conservative professors like Jacobus Sylvius denounced Vesalius as a madman, while ordinary physicians continued humoural bleeding because anatomy did not yet cure internal sickness.',
          connective:
            'Demonstrated that while Vesalius permanently rebuilt human anatomy, his work could not immediately save living patients without anaesthetics, antiseptics, or germ theory.',
          question:
            'Why did Vesalius’s anatomical discoveries fail to save sick patients immediately?',
        },
      ],
    },
  },

  lesson_2_4: {
    workbook_stages: [
      {
        step: 1,
        date: 'c1615',
        para_ref: '[1.2–2.1]',
        heading: 'Why did Harvey study cold-blooded animals to understand the human heart?',
        bullets: [
          'Observing slow heartbeats in live cold frogs',
          'Dissecting human corpses at the Royal College',
          'Mapping one-way pocket valves inside veins',
        ],
        focus_clue: 'Why did Harvey study cold-blooded animals to understand the human heart?',
      },
      {
        step: 2,
        date: '1620s',
        para_ref: '[2.1–2.2]',
        heading: 'How did mathematical calculations prove Galen’s theory impossible?',
        bullets: [
          'Comparing the beating heart to mechanical water pumps',
          'Calculating liver could not produce gallons of blood daily',
          'Proving the same blood circulates continuously',
        ],
        focus_clue: 'How did mathematical calculations prove Galen’s theory impossible?',
      },
      {
        step: 3,
        date: '1628',
        para_ref: '[3.1–3.2]',
        heading: 'Why did Harvey publish his research abroad rather than in England?',
        bullets: [
          'Publishing Latin treatise on heart motion in Frankfurt',
          'Demonstrating tied forearm vein experiments',
          'Dedicating medical breakthrough to King Charles I',
        ],
        focus_clue: 'Why did Harvey publish his research abroad rather than in England?',
      },
      {
        step: 4,
        date: '1630s–1650s',
        para_ref: '[4.1]',
        heading: 'Why was Harvey’s discovery fiercely rejected by established doctors?',
        bullets: [
          'Being mocked as a madman by rival doctors',
          'Losing wealthy private London medical patients',
          'Waiting fifty years for Oxford university to teach it',
        ],
        focus_clue: 'Why was Harvey’s discovery fiercely rejected by established doctors?',
      },
      {
        step: 5,
        date: '1661',
        para_ref: '[4.1–4.2]',
        heading: 'Why was the discovery of capillaries the final proof Harvey was right?',
        bullets: [
          'Focusing microscope lenses on live frog lungs',
          'Discovering microscopic capillary vessels connecting arteries',
          'Confirming Harvey’s circulatory model beyond all doubt',
        ],
        focus_clue: 'Why was the discovery of capillaries the final proof Harvey was right?',
      },
    ],
    causal_domino_spine: {
      title: 'William Harvey: Circulation of the Blood & The Mechanical Heart',
      subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
      stages: [
        {
          step: 1,
          date: 'c1615',
          para_ref: '[1.2–2.1]',
          title: 'Dissecting Cold-Blooded Animals & Human Cadavers',
          actor: 'William Harvey (Royal Physician)',
          tag: '🫀 EXPERIMENTAL PHYSIOLOGY',
          trigger:
            'Studying Fabricius’s vein valves at Padua and dissecting cold-blooded frogs in London, royal physician William Harvey observed that cardiac muscle contracted to pump blood.',
          desc: 'Studying Fabricius’s vein valves at Padua and dissecting cold-blooded frogs in London, royal physician William Harvey observed that cardiac muscle contracted to pump blood.',
          connective:
            'Recognized that Fabricius’s vein valves were one-way mechanical gates ensuring blood flowed in only one direction—toward the heart.',
          question: 'Why did Harvey study cold-blooded animals to understand the human heart?',
        },
        {
          step: 2,
          date: '1620s',
          para_ref: '[2.1–2.2]',
          title: 'The Mechanical Pump & Quantitative Proof',
          actor: 'William Harvey',
          tag: '🔢 MATHEMATICAL PROOF',
          trigger:
            'Harvey calculated that the human heart pumped 540 pints (nearly 300 liters) of blood per hour, proving it was mathematically impossible for the liver to manufacture blood from food.',
          desc: 'Harvey calculated that the human heart pumped 540 pints (nearly 300 liters) of blood per hour, proving it was mathematically impossible for the liver to manufacture blood from food.',
          connective:
            'Concluded that the heart acted as a mechanical pump moving a fixed, finite volume of blood continuously through the body in a closed, circular loop.',
          question: 'How did mathematical calculations prove Galen’s theory impossible?',
        },
        {
          step: 3,
          date: '1628',
          para_ref: '[3.1–3.2]',
          title: 'Publication of De Motu Cordis',
          actor: 'William Harvey & Continental Publishers',
          tag: '📖 HISTORICAL MILESTONE',
          trigger:
            'Harvey published De Motu Cordis ("On the Motion of the Heart and Blood") in Frankfurt, demonstrating his famous tied-arm ligature experiment with visible one-way vein valves.',
          desc: 'Harvey published De Motu Cordis ("On the Motion of the Heart and Blood") in Frankfurt, demonstrating his famous tied-arm ligature experiment with visible one-way vein valves.',
          connective:
            'Provided visual and repeatable physical proof that blood in veins refused to flow backwards away from the heart, permanently refuting Galen’s 1,400-year-old physiology.',
          question: 'Why did Harvey publish his research abroad rather than in England?',
        },
        {
          step: 4,
          date: '1630s–1650s',
          para_ref: '[4.1]',
          title: 'Ridicule by ‘Galenists’ & Lost Patients',
          actor: 'Conservative Doctors ("Galenists")',
          tag: '🗣️ MEDICAL HOSTILITY',
          trigger:
            'Senior physicians ridiculed Harvey as a "circulator" (charlatan) and wealthy patients abandoned his practice, with Oxford University taking over fifty years to teach circulation.',
          desc: 'Senior physicians ridiculed Harvey as a "circulator" (charlatan) and wealthy patients abandoned his practice, with Oxford University taking over fifty years to teach circulation.',
          connective:
            'Demonstrated that even irrefutable mathematical and experimental evidence met decades of institutional resistance when it contradicted established ancient authority.',
          question: 'Why was Harvey’s discovery fiercely rejected by established doctors?',
        },
        {
          step: 5,
          date: '1661',
          para_ref: '[4.1–4.2]',
          title: 'Marcello Malpighi Confirms Capillaries',
          actor: 'Marcello Malpighi (Italian Anatomist)',
          tag: '🔬 MICROSCOPIC CONFIRMATION',
          trigger:
            'Using improved microscopes in 1661, Marcello Malpighi discovered microscopic capillaries connecting arteries to veins in a frog’s lung, confirming Harvey’s closed circulatory circuit.',
          desc: 'Using improved microscopes in 1661, Marcello Malpighi discovered microscopic capillaries connecting arteries to veins in a frog’s lung, confirming Harvey’s closed circulatory circuit.',
          connective:
            'Supplied the missing anatomical link Harvey could never see, confirming circulation beyond doubt though bloodletting continued for another two centuries.',
          question: 'Why was the discovery of capillaries the final proof Harvey was right?',
        },
      ],
    },
  },

  lesson_2_5: {
    workbook_stages: [
      {
        step: 1,
        date: 'Spring 1665',
        para_ref: '[1.1–1.2]',
        heading: 'Why did the rich flee London while the poor suffered catastrophic mortality?',
        bullets: [
          'Spreading through poor crowded London parishes',
          'Fleeing town by carriage: King Charles II and physicians',
          'Leaving poor weavers trapped behind city gates',
        ],
        focus_clue: 'Why did the rich flee London while the poor suffered catastrophic mortality?',
      },
      {
        step: 2,
        date: 'Summer 1665',
        para_ref: '[3.1–3.2]',
        heading: 'Why did people still use 14th-century remedies in 1665?',
        bullets: [
          'Blaming planetary alignments and wrath of God',
          'Sniffing dried sponges soaked in vinegar',
          'Strapping plucked live pigeons to hot buboes',
        ],
        focus_clue: 'Why did people still use 14th-century remedies in 1665?',
      },
      {
        step: 3,
        date: '1665',
        para_ref: '[2.1–2.2]',
        heading: 'How did local government action in 1665 show greater organization than 1348?',
        bullets: [
          'Painting red crosses on barred front doors',
          'Posting armed watchmen to enforce quarantine',
          'Building wooden pest houses outside city walls',
        ],
        focus_clue: 'How did local government action in 1665 show greater organization than 1348?',
      },
      {
        step: 4,
        date: '1665',
        para_ref: '[3.1]',
        heading: 'Why was slaughtering cats and dogs a tragic medical mistake?',
        bullets: [
          'Killing forty thousand domestic dogs and cats',
          'Burning barrels of black tar at street crossings',
          'Smoking tobacco pipes to ward off foul miasma',
        ],
        focus_clue: 'Why was slaughtering cats and dogs a tragic medical mistake?',
      },
      {
        step: 5,
        date: 'Winter 1665–1666',
        para_ref: '[1.2, 4.1–4.2]',
        heading: 'How devastating was the demographic impact of the 1665 epidemic?',
        bullets: [
          'Ringing bell carts through silent dark lanes',
          'Calling "Bring out your dead" into empty alleys',
          'Burying one hundred thousand Londoners in mass trenches',
        ],
        focus_clue: 'How devastating was the demographic impact of the 1665 epidemic?',
      },
    ],
    causal_domino_spine: {
      title: 'The Great Plague of London (1665): Continuity, Quarantine & Mortality',
      subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
      stages: [
        {
          step: 1,
          date: 'Spring 1665',
          para_ref: '[1.1–1.2]',
          title: 'The Outbreak in St Giles-in-the-Fields',
          actor: 'King Charles II & London Citizens',
          tag: '☠️ EPIDEMIC OUTBREAK',
          trigger:
            'Plague broke out in the crowded slums of St Giles-in-the-Fields in spring 1665, triggering the mass flight of King Charles II, royal courtiers, and wealthy physicians to the countryside.',
          desc: 'Plague broke out in the crowded slums of St Giles-in-the-Fields in spring 1665, triggering the mass flight of King Charles II, royal courtiers, and wealthy physicians to the countryside.',
          connective:
            'Left impoverished Londoners trapped behind city gates to face an escalating death toll that peaked at over 7,000 casualties per week in September.',
          question: 'Why did the rich flee London while the poor suffered catastrophic mortality?',
        },
        {
          step: 2,
          date: 'Summer 1665',
          para_ref: '[3.1–3.2]',
          title: 'Continuity of Humoral & Supernatural Beliefs',
          actor: 'London Physicians & Folk Healers',
          tag: '🏺 14TH-CENTURY REMEDIES',
          trigger:
            'Without knowledge of Yersinia pestis or rat fleas, doctors wore bird masks, burned street pitch, carried pomanders, and strapped live plucked chickens to buboes.',
          desc: 'Without knowledge of Yersinia pestis or rat fleas, doctors wore bird masks, burned street pitch, carried pomanders, and strapped live plucked chickens to buboes.',
          connective:
            'Proved that 150 years of Renaissance anatomical discovery had produced zero change in understanding epidemic causation or effective clinical therapy.',
          question: 'Why did people still use 14th-century remedies in 1665?',
        },
        {
          step: 3,
          date: '1665',
          para_ref: '[2.1–2.2]',
          title: 'Mayor’s Orders & Pest Houses',
          actor: 'Lord Mayor & Searchers of the Dead',
          tag: '🛡️ MUNICIPAL QUARANTINE',
          trigger:
            'The Lord Mayor issued strict Plague Orders: red crosses were painted on infected homes, armed watchmen enforced 28-day quarantine, and female Searchers checked corpses.',
          desc: 'The Lord Mayor issued strict Plague Orders: red crosses were painted on infected homes, armed watchmen enforced 28-day quarantine, and female Searchers checked corpses.',
          connective:
            'Demonstrated sophisticated civic coordination and statistical epidemiology through Bills of Mortality, marking a significant administrative advance over 1348.',
          question: 'How did local government action in 1665 show greater organization than 1348?',
        },
        {
          step: 4,
          date: '1665',
          para_ref: '[3.1]',
          title: 'Slaughter of Dogs & Smoking Tar Barrels',
          actor: 'City Magistrates & Town Constables',
          tag: '🐕 TRAGIC MISJUDGEMENT',
          trigger:
            'Believing domestic animal fur carried poisonous miasma, magistrates ordered the slaughter of 40,000 dogs and 200,000 cats, alongside burning barrels of pitch in the streets.',
          desc: 'Believing domestic animal fur carried poisonous miasma, magistrates ordered the slaughter of 40,000 dogs and 200,000 cats, alongside burning barrels of pitch in the streets.',
          connective:
            'Unintentionally wiped out the natural predators of the black rat, allowing plague-infected rodent fleas to multiply completely unchecked through crowded tenements.',
          question: 'Why was slaughtering cats and dogs a tragic medical mistake?',
        },
        {
          step: 5,
          date: 'Winter 1665–1666',
          para_ref: '[1.2, 4.1–4.2]',
          title: 'The Dead Carts & East Smithfield Pits',
          actor: 'Parish Gravediggers & Dead-Cart Orderlies',
          tag: '⚰️ DEMOGRAPHIC TOLL',
          trigger:
            'Over 100,000 Londoners (20% of the capital) died, buried at night in mass lime pits like East Smithfield, until winter frosts killed the fleas and the Great Fire of 1666 burned the slums.',
          desc: 'Over 100,000 Londoners (20% of the capital) died, buried at night in mass lime pits like East Smithfield, until winter frosts killed the fleas and the Great Fire of 1666 burned the slums.',
          connective:
            'Proved that environmental weather and physical clearance, rather than medical intervention, brought the catastrophic epidemic to a close.',
          question: 'How devastating was the demographic impact of the 1665 epidemic?',
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
    if (renaissanceSpines[lesson.id]) {
      const spine = renaissanceSpines[lesson.id];
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
  console.log(`🎉 Successfully updated ${updatedCount} Renaissance lessons in ${dataFilePath}`);
}

main();
