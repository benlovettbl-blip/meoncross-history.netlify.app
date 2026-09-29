/**
 * inject_gcse_tracker_videos.cjs
 *
 * Restores and enriches video links across GCSE units from the master tracker:
 *  - Paper 1: Medicine Through Time with the Western Front (edexcel_medicine) - 26 enquiry lessons
 *  - Paper 2: Early Elizabethan England, 1558-88 (eee) - 12 lessons
 *  - Paper 2: Conflict in the Middle East, 1945-1995 (cme_new) - 12 enquiry lessons
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = path.join(__dirname, '..');
const UNITS_DIR = path.join(ROOT_DIR, 'units');

// ==========================================
// 1. MEDICINE VIDEO MAP (26 ENQUIRY LESSONS)
// ==========================================
const MEDICINE_VIDEOS = {
  // Key Topic 1: Medieval Medicine (c1250–c1500)
  lesson_1_1: [
    {
      url: 'https://era.org.uk/streaming-service-resource/1-medicine-and-religion-history-file/',
      title: 'History File: Medicine and Religion in the Middle Ages',
      duration: '45 mins 0 secs',
      teacher_guidance: 'Recommended for exploring how the medieval Catholic Church controlled medical ideas, training, and Galenic doctrine.'
    },
    {
      url: 'https://era.org.uk/streaming-service-resource/1-medicine-religion-and-natural-causes-history-file/',
      title: 'History File: Medicine, Religion and Natural Causes',
      duration: '45 mins 0 secs',
      teacher_guidance: 'Highlights the tension between supernatural beliefs (punishment from God) and rational natural causes (Four Humours, astrology).'
    },
    {
      url: 'https://era.org.uk/streaming-service-resource/pain-pus-and-poison-the-search-for-modern-medicine-pain-message-bbc-four/',
      title: 'Pain, Pus and Poison: The Search for Modern Medicine – Pain Message (BBC Four)',
      duration: '58 mins 0 secs',
      teacher_guidance: 'BBC documentary context on how early medicine understood pain, suffering, and spiritual trials.'
    }
  ],
  lesson_1_2: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=nVJV8iEAm88',
      title: 'Medieval Medicine | Secondary History - Medicine Through Time',
      duration: '4 mins 20 secs',
      teacher_guidance: 'Fast-paced curriculum recap of Hippocrates, Galen, the Theory of the Four Humours, and the Theory of Opposites.'
    },
    {
      url: 'https://era.org.uk/streaming-service-resource/bbc-four-the-beauty-of-anatomy-galen-and-leonardo-galenic-anatomy/',
      title: 'BBC Four: The Beauty of Anatomy – Galen and Leonardo: Galenic Anatomy',
      duration: '29 mins 0 secs',
      teacher_guidance: 'Dr. Adam Rutherford investigates Galen’s anatomical errors from dissecting apes and pigs and why his ideas dominated for 1,400 years.'
    }
  ],
  lesson_1_3: [
    {
      url: 'https://era.org.uk/streaming-service-resource/3-medicine-women-and-society-history-file/',
      title: 'History File: Medicine, Women and Society in the Middle Ages',
      duration: '45 mins 0 secs',
      teacher_guidance: 'Examines everyday medieval treatments: herbal recipes, bleeding, purging, and the crucial role of local wise women and housewives.'
    }
  ],
  lesson_1_4: [
    {
      url: 'https://era.org.uk/streaming-service-resource/4-medicine-and-long-term-change-history-file/',
      title: 'History File: Medicine and Long Term Change – Monastic Hospitals',
      duration: '45 mins 0 secs',
      teacher_guidance: 'Explores medieval monastic hospitals, showing why their primary mission was hospitality, prayer, and "care not cure".'
    }
  ],
  lesson_1_5: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=YhsPPBGtquo',
      title: 'The Black Death (1348) - Timelines.tv',
      duration: '6 mins 33 secs',
      viewing_task: 'Explain how the Black Death entered Britain in 1348, how it spread, and what medieval people believed caused the disease.',
      model_answer: 'The Black Death entered southern England through coastal ports (such as Melcombe Regis in Dorset) in the summer of 1348 aboard merchant trade ships. Carried by fleas living on black rats, it spread rapidly along river and road trade networks. Medieval people had no knowledge of bacteria or microbiology, believing the devastating pestilence was caused by divine retribution from God, astrological conjunctions, or corrupting miasma.'
    },
    {
      url: 'https://era.org.uk/streaming-service-resource/bbc-two-a-history-of-britain-by-simon-schama-series-1-king-death-the-symptoms-of-black-death-and-how-it-spread/',
      title: 'BBC Two: A History of Britain by Simon Schama – King Death: Symptoms & Spread',
      duration: '15 mins 0 secs',
      teacher_guidance: 'Vivid documentary analysis of bubonic and pneumonic plague pathology, swellings (buboes), and catastrophic societal mortality.'
    },
    {
      url: 'https://era.org.uk/streaming-service-resource/bbc-two-a-history-of-britain-by-simon-schama-series-1-king-death-medieval-treatment-and-beliefs-on-the-cause-of-the-black-death/',
      title: 'BBC Two: A History of Britain by Simon Schama – King Death: Medieval Treatment & Beliefs',
      duration: '15 mins 0 secs',
      teacher_guidance: 'Focuses on flagellants, holy processions, sweet herbs, and the total inability of medieval physicians to halt the epidemic.'
    }
  ],

  // Key Topic 2: Renaissance Medicine (c1500–c1700)
  lesson_2_1: [
    {
      url: 'https://era.org.uk/streaming-service-resource/the-scientific-revolution/',
      title: 'The Scientific Revolution: The Printing Press and The Royal Society',
      duration: '25 mins 0 secs',
      teacher_guidance: 'Covers Gutenberg’s movable-type press, humanism, and the founding of the Royal Society (1660) with its motto Nullius in verba.'
    }
  ],
  lesson_2_2: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=walfj2dpU-E',
      title: 'Vesalius and Harvey | Secondary History - Medicine Through Time',
      duration: '4 mins 30 secs',
      teacher_guidance: 'Core GCSE video detailing Thomas Sydenham’s empirical bedside observation and why new ideas took time to impact treatments.'
    }
  ],
  lesson_2_3: [
    {
      url: 'https://era.org.uk/streaming-service-resource/bbc-four-the-beauty-of-anatomy-andreas-vesalius-the-muscle-men/',
      title: 'BBC Four: The Beauty of Anatomy – Andreas Vesalius: The Muscle Men',
      duration: '29 mins 0 secs',
      teacher_guidance: 'Essential depth documentary on Andreas Vesalius, his landmark 1543 book De Humani Corporis Fabrica, and his dissection of human corpses disproving Galen.'
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=walfj2dpU-E',
      title: 'Vesalius & Human Dissection | Secondary History Recap',
      duration: '4 mins 30 secs',
      teacher_guidance: 'Focused curriculum recap highlighting Vesalius proving Galen made over 300 anatomical errors.'
    }
  ],
  lesson_2_4: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=w6q50_qNMoA',
      title: "Ceaseless Motion: William Harvey's Experiments in Blood Circulation",
      duration: '3 mins 18 secs',
      teacher_guidance: 'Royal College of Physicians visual animation demonstrating Harvey disproving Galen’s liver production theory using valves and ligatures.'
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=LoeAVaM48Y0',
      title: 'William Harvey – The Theory of Blood Circulation (1628)',
      duration: '4 mins 12 secs',
      teacher_guidance: 'Examines Harvey’s De Motu Cordis (1628), calculating blood volume and proving the heart acts as a mechanical pump.'
    }
  ],
  lesson_2_5: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=LoeAVaM48Y0',
      title: 'The Great Plague of London (1665) | Secondary History',
      duration: '4 mins 12 secs',
      teacher_guidance: 'Compares the 1665 Great Plague with the 1348 Black Death: pest houses, searchers of the dead, quarantine red crosses, and continuing belief in miasma.'
    }
  ],

  // Key Topic 3: 18th & 19th-Century Medicine (c1700–c1900)
  lesson_3_1: [
    {
      url: 'https://era.org.uk/streaming-service-resource/2-medicine-and-science-history-file/',
      title: 'History File: Medicine and Science – Germ Theory & Bacteriology',
      duration: '45 mins 0 secs',
      teacher_guidance: 'In-depth documentary tracing the transition from spontaneous generation and miasma to Pasteur’s 1861 Germ Theory and Koch’s pure cultures.'
    },
    {
      url: 'https://era.org.uk/streaming-service-resource/bbc-four-medical-mavericks-series-1-beating-infection-robert-koch-cholera/',
      title: 'BBC Four Medical Mavericks: Robert Koch & The Identification of Cholera & TB',
      duration: '29 mins 0 secs',
      teacher_guidance: 'Examines Koch’s revolutionary laboratory methodology: agar jelly in petri dishes, synthetic aniline stains, and photomicrography.'
    }
  ],
  lesson_3_2: [
    {
      url: 'https://era.org.uk/streaming-service-resource/jenners-marvellous-medicine-a-history-of-the-world/',
      title: "Jenner's Marvellous Medicine – A History of the World",
      duration: '15 mins 0 secs',
      teacher_guidance: 'Narrative account of Edward Jenner’s 1796 cowpox experiments on James Phipps, replacing dangerous variolation with vaccination.'
    },
    {
      url: 'https://era.org.uk/streaming-service-resource/bbc-two-true-stories-episode-2-the-life-and-work-of-edward-jenner/',
      title: 'BBC Two True Stories: The Life and Work of Edward Jenner',
      duration: '20 mins 0 secs',
      teacher_guidance: 'Explores the intense initial opposition to Jenner’s vaccine and the eventual 1853 Compulsory Vaccination Act.'
    }
  ],
  lesson_3_3: [
    {
      url: 'https://era.org.uk/streaming-service-resource/bbc-four-the-beauty-of-diagrams-florence-nightingale-florence-nightingales-rose-diagram/',
      title: "BBC Four: The Beauty of Diagrams – Florence Nightingale's Polar Area Rose Diagram",
      duration: '29 mins 0 secs',
      teacher_guidance: 'Mathematical and medical analysis of how Nightingale used statistical polar diagrams to prove that dirt, typhus, and cholera killed more soldiers than combat in the Crimea.'
    },
    {
      url: 'https://era.org.uk/streaming-service-resource/florence-nightingale-nursing-pioneer/',
      title: 'Florence Nightingale: Nursing Pioneer & Hospital Architecture',
      duration: '15 mins 0 secs',
      teacher_guidance: 'Covers pavilion-style hospital wards, the 1860 St Thomas’ Hospital nursing school, and Notes on Nursing.'
    }
  ],
  lesson_3_4: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=7pjAH84f-c0',
      title: '18th & 19th Century Medicine & Surgery | Secondary History',
      duration: '5 mins 40 secs',
      teacher_guidance: 'Explains James Simpson’s 1847 discovery of chloroform, the temporary "Black Period" of surgery, and Joseph Lister’s 1865 carbolic antiseptic spray.'
    }
  ],
  lesson_3_5: [
    {
      url: 'https://era.org.uk/streaming-service-resource/2-medicine-public-health-and-government-history-file/',
      title: 'History File: Medicine, Public Health and Government Intervention',
      duration: '45 mins 0 secs',
      teacher_guidance: 'Traces the collapse of laissez-faire, Edwin Chadwick’s 1842 report, the 1848 permissive Act, and the compulsory 1875 Public Health Act.'
    },
    {
      url: 'https://era.org.uk/streaming-service-resource/the-story-of-john-snow-moments-of-genius/',
      title: 'The Story of John Snow – Moments of Genius (Broad Street Pump)',
      duration: '10 mins 0 secs',
      teacher_guidance: 'Visual case study on John Snow’s 1854 spot map of Soho, identifying contaminated water as the vector for cholera.'
    },
    {
      url: 'https://era.org.uk/streaming-service-resource/the-doctor-who-discovered-how-cholera-spread-witness-history/',
      title: 'The Doctor Who Discovered How Cholera Spread – BBC Witness History',
      duration: '9 mins 0 secs',
      teacher_guidance: 'Audio-visual historical record of Snow removing the pump handle and overcoming the entrenched miasma lobby.'
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=TT4Z1Ikf36w',
      title: 'Chadwick and Snow: Public Health in the 19th Century',
      duration: '4 mins 52 secs',
      teacher_guidance: 'Core recap linking John Snow, Joseph Bazalgette’s London sewer network, and the 1858 Great Stink.'
    },
    {
      url: 'https://era.org.uk/streaming-service-resource/bbc-two-a-house-through-time-series-1-episode-2-cholera/',
      title: 'BBC Two A House Through Time: Cholera Outbreak in 19th Century Slums',
      duration: '14 mins 0 secs',
      teacher_guidance: 'Shows the human reality of cesspits, shared privies, and tainted water supply in Victorian housing.'
    }
  ],

  // Key Topic 4: Modern Medicine (c1900–Present)
  lesson_4_1: [
    {
      url: 'https://era.org.uk/streaming-service-resource/5-medicine-technology-and-the-individual-history-file/',
      title: 'History File: Medicine, Technology and the Individual in the 20th Century',
      duration: '45 mins 0 secs',
      teacher_guidance: 'Covers the transition from germ theory to genetic science, X-ray crystallography, and modern diagnosis.'
    },
    {
      url: 'https://era.org.uk/streaming-service-resource/0-goes-back-in-time-operation-ouch/',
      title: 'Operation Ouch: Goes Back in Time – Medical Technology & Diagnosis',
      duration: '28 mins 0 secs',
      teacher_guidance: 'Engaging, accessible visual demonstrations of CT scans, MRI, and DNA structures.'
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=my14ZuzjH5I',
      title: 'Modern Medicine: DNA, Genetics & Diagnosis | Secondary History',
      duration: '5 mins 15 secs',
      teacher_guidance: 'Curriculum overview of Watson, Crick, Franklin and Wilkins in 1953, the Human Genome Project (1990–2003), and genetic screening.'
    }
  ],
  lesson_4_2: [
    {
      url: 'https://era.org.uk/streaming-service-resource/5-medicine-and-surgery-history-file/',
      title: 'History File: Medicine and Surgery – Modern High-Tech Procedures',
      duration: '45 mins 0 secs',
      teacher_guidance: 'Traces modern surgical evolution: blood grouping (Landsteiner 1901), endoscopes, laparoscopy (keyhole surgery), and robotic surgery.'
    },
    {
      url: 'https://era.org.uk/streaming-service-resource/into-the-brain-blood-and-guts-a-history-of-surgery/',
      title: 'BBC Four: Into the Brain – Blood and Guts: A History of Surgery',
      duration: '58 mins 0 secs',
      teacher_guidance: 'Michael Mosley explores modern brain surgery, imaging scans, and neurological breakthroughs.'
    },
    {
      url: 'https://era.org.uk/streaming-service-resource/5-grays-anatomy-the-beauty-of-anatomy/',
      title: "BBC Four: Gray's Anatomy – The Beauty of Anatomy",
      duration: '29 mins 0 secs',
      teacher_guidance: 'Explores Henry Gray and Henry Carter’s 1858 masterpiece and modern anatomical mapping.'
    }
  ],
  lesson_4_3: [
    {
      url: 'https://era.org.uk/streaming-service-resource/3-medicine-and-government-history-file/',
      title: 'History File: Medicine and Government – The Foundation of the NHS',
      duration: '45 mins 0 secs',
      teacher_guidance: 'Covers the Beveridge Report (1942), Aneurin Bevan, and the launch of the National Health Service in July 1948.'
    },
    {
      url: 'https://era.org.uk/streaming-service-resource/s12e02-health-before-the-nhs-a-medical-revolution-timeshift/',
      title: 'Timeshift: Health Before the NHS – A Medical Revolution',
      duration: '59 mins 0 secs',
      teacher_guidance: 'Eyewitness accounts of working-class healthcare before 1948: means testing, panel doctors, and crushing medical debt.'
    },
    {
      url: 'https://era.org.uk/streaming-service-resource/bbc-two-exploring-the-past-post-war-britain-post-war-britain-the-development-of-the-national-health-service-nhs/',
      title: 'BBC Two: Development of the National Health Service (NHS)',
      duration: '18 mins 0 secs',
      teacher_guidance: 'Focuses on the political struggle between Bevan and the British Medical Association (BMA) and universal free care.'
    },
    {
      url: 'https://era.org.uk/streaming-service-resource/pain-pus-and-poison-the-search-for-modern-medicine-viruses-and-vaccines-bbc-four/',
      title: 'BBC Four: Pain, Pus and Poison – Viruses, Magic Bullets & Vaccines',
      duration: '58 mins 0 secs',
      teacher_guidance: 'Examines Paul Ehrlich’s Salvarsan 606 (1909), Domagk’s Prontosil (1932), and nationwide mass vaccination programs.'
    }
  ],
  lesson_4_4: [
    {
      url: 'https://era.org.uk/streaming-service-resource/breaking-the-mould-the-story-of-penicillin/',
      title: 'Breaking the Mould: The Story of Penicillin (BBC Drama)',
      duration: '82 mins 0 secs',
      teacher_guidance: 'Acclaimed BBC historical drama starring Dominic West as Howard Florey and Denis Lawson as Alexander Fleming, showing the Oxford lab team purifying penicillin and testing on Albert Alexander in 1941.'
    },
    {
      url: 'https://era.org.uk/streaming-service-resource/pain-pus-and-poison-the-search-for-modern-medicine-discovery-of-penicillin-bbc-four/',
      title: 'BBC Four: Pain, Pus and Poison – The Discovery and Mass Production of Penicillin',
      duration: '22 mins 0 secs',
      teacher_guidance: 'Focuses on Fleming’s 1928 discovery, Florey and Chain’s freeze-drying breakthrough, and US government wartime mass production using beer vats.'
    }
  ],
  lesson_4_5: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=tlNtakmOOho',
      title: 'GCSE History: Modern Medicine – Government & Lung Cancer',
      duration: '7 mins 10 secs',
      teacher_guidance: 'Examines Richard Doll and Austin Bradford Hill’s 1950 epidemiological study linking smoking to lung cancer, followed by government bans, graphic packaging, and the 2007 indoor smoking ban.'
    }
  ],

  // Key Topic 5: Western Front (1914–1918)
  lesson_5_1: [
    {
      url: 'https://era.org.uk/streaming-service-resource/4-medicine-and-war-history-file/',
      title: 'History File: Medicine and War – The Western Front Theatre',
      duration: '45 mins 0 secs',
      teacher_guidance: 'Comprehensive overview of the British sector: the Ypres Salient, Somme chalklands, Arras underground tunnels, and Cambrai tank battle.'
    }
  ],
  lesson_5_2: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=bSPh5Jgx_wY',
      title: 'Simple History: Average Day In The Life Of A WW1 Soldier',
      duration: '3 mins 32 secs',
      teacher_guidance: 'Animated visual breakdown of trench rotation: front line, support line, reserve line, communication trenches, mud, rats, and trench hygiene.'
    }
  ],
  lesson_5_3: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=x8OazQml0gw',
      title: 'Infections, Shrapnel & Gas – WW1 Uncut with Dan Snow (BBC)',
      duration: '4 mins 45 secs',
      teacher_guidance: 'Demonstrates the catastrophic blast effects of high-explosive artillery shrapnel, gas gangrene in fertilised soil, and chlorine/phosgene/mustard gas.'
    }
  ],
  lesson_5_4: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=4xKWnE63E8U',
      title: 'How the RAMC Worked in WW1 | Field Ambulance Organisation Explained',
      duration: '6 mins 12 secs',
      teacher_guidance: 'Essential visual walkthrough of the Chain of Evacuation: Stretcher Bearers → Regimental Aid Post (RAP) → Advanced Dressing Station (ADS) → Casualty Clearing Station (CCS) → Base Hospital.'
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=TTaoz0YVO2Y',
      title: 'Casualty Clearing Station (CCS) – Historian Andy Robertshaw',
      duration: '5 mins 20 secs',
      teacher_guidance: 'Leading battlefield historian Andy Robertshaw explores the triage system, surgical wards, and nursing sisters at the CCS.'
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=-jTZ7AwCyug',
      title: 'Women Medics on the Frontline – WW1 Uncut (BBC)',
      duration: '4 mins 10 secs',
      teacher_guidance: 'Focuses on the First Aid Nursing Yeomanry (FANY) driving motor ambulances and QAIMNS nurses working under fire.'
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=xsz0-8-qAi8',
      title: 'The Battle of the Somme: Advanced Dressing Station (1916 Archival Film)',
      duration: '3 mins 45 secs',
      teacher_guidance: 'Authentic 1916 Imperial War Museum archival footage showing wounded British soldiers receiving first aid and bandaging in Mindel Trench.'
    }
  ],
  lesson_5_5: [
    {
      url: 'https://era.org.uk/streaming-service-resource/carrel-dakin-method-the-crimson-field/',
      title: 'The Crimson Field: Carrel-Dakin Antiseptic Method & Wound Debridement',
      duration: '8 mins 0 secs',
      teacher_guidance: 'Dramatised BBC medical demonstration of sterilised sodium hypochlorite chemical irrigation (Carrel-Dakin method) and excision of infected tissue (debridement).'
    }
  ],
  lesson_5_6: [
    {
      url: 'https://era.org.uk/streaming-service-resource/fixing-faces-blood-and-guts-a-history-of-surgery/',
      title: 'Blood and Guts: A History of Surgery – Fixing Faces (Harold Gillies at Queen’s Hospital, Sidcup)',
      duration: '12 mins 0 secs',
      teacher_guidance: 'Explores Harold Gillies pioneering plastic surgery using tubed pedicles, alongside blood transfusion breakthroughs (Rous & Turner, Robertson’s 1917 Cambrai blood depot).'
    }
  ]
};

// ==========================================
// 2. EEE VIDEO MAP (12 LESSONS)
// ==========================================
const EEE_VIDEOS = {
  lesson_1_1: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=OOeal_k4bmE',
      title: 'Accession of Elizabeth I (1558): Problems Facing the New Queen',
      duration: '4 mins 15 secs',
      teacher_guidance: 'Explores Elizabeth’s legitimacy question, the £300,000 national debt, and the threat of invasion from France and Scotland.'
    }
  ],
  lesson_1_2: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=-GbkZ_Y1AeQ',
      title: 'The Religious Settlement of 1559: The "Middle Way"',
      duration: '5 mins 02 secs',
      teacher_guidance: 'Examines the Act of Supremacy, the Act of Uniformity, and the Royal Injunctions.'
    }
  ],
  lesson_1_3: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=_tD3KvqCc8g',
      title: "Puritan and Catholic Challenges to Elizabeth's Settlement",
      duration: '4 mins 48 secs',
      teacher_guidance: 'Details the Vestments Controversy, the Papal Bull of Excommunication (1570), and Catholic recusancy.'
    }
  ],
  lesson_1_4: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=LIZtyIgtVio',
      title: 'Mary, Queen of Scots: Elizabeth’s Captive Rival (1568–1587)',
      duration: '5 mins 25 secs',
      teacher_guidance: 'Explains Mary’s arrival in England in 1568, her legitimate claim to the English throne, and Elizabeth’s dilemma.'
    }
  ],
  lesson_2_1: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=vZRq1fuD4pE',
      title: 'Revolt of the Northern Earls (1569)',
      duration: '4 mins 10 secs',
      teacher_guidance: 'Covers the Earls of Northumberland and Westmorland, the capture of Durham Cathedral, and Elizabeth’s brutal retaliation.'
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=PbXbn1ppTm0',
      title: 'The Catholic Plots: Ridolfi, Throckmorton & Babington',
      duration: '6 mins 30 secs',
      teacher_guidance: 'Step-by-step examination of the three plots to assassinate Elizabeth and place Mary on the throne.'
    },
    {
      url: 'https://era.org.uk/streaming-service-resource/elizabeth-is-secret-agents/',
      title: "Elizabeth I's Secret Agents: Walsingham's Spy Network (BBC)",
      duration: '58 mins 0 secs',
      teacher_guidance: 'BBC documentary on Sir Francis Walsingham, cipher decoding, double agents, and the entrapment of Mary Queen of Scots.'
    }
  ],
  lesson_2_2: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=ldZYD51Ohjo',
      title: 'Deteriorating Relations: England, Spain and the Netherlands',
      duration: '5 mins 12 secs',
      teacher_guidance: 'Traces the trade rivalry in the New World, Spanish fury in Antwerp, and English covert support for Dutch Protestant rebels.'
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=xPAKnqCOl_Q',
      title: 'Sir Francis Drake: Circumnavigation and Spanish Silver (1577–1580)',
      duration: '4 mins 55 secs',
      teacher_guidance: 'Details Drake capturing the Cacafuego silver ship and Elizabeth knighting him on the Golden Hind.'
    }
  ],
  lesson_2_3: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=33zs4b3iyyw',
      title: 'The Outbreak of War with Spain & The Treaty of Nonsuch (1585)',
      duration: '5 mins 18 secs',
      teacher_guidance: 'Examines the assassination of William the Silent, the Treaty of Joinville, and Leicester’s ill-fated Dutch expedition.'
    }
  ],
  lesson_2_4: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=RR-XqmhV1Oc',
      title: 'The Spanish Armada (1588): Tactics, Fire Ships and Defeat',
      duration: '7 mins 40 secs',
      teacher_guidance: 'Comprehensive battle breakdown: crescent formation, the Battle of Gravelines, Hellburners (fireships), and the Protestant Wind.'
    }
  ],
  lesson_3_1: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=OOeal_k4bmE',
      title: 'Elizabethan Education and Leisure: Grammar Schools, Theatre and Bear Baiting',
      duration: '4 mins 15 secs',
      teacher_guidance: 'Explores changing education for boys and girls, Shakespeare’s Globe Theatre, and blood sports.'
    }
  ],
  lesson_3_2: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=ldZYD51Ohjo',
      title: 'The Problem of Poverty & The Elizabethan Poor Laws',
      duration: '5 mins 12 secs',
      teacher_guidance: 'Distinguishes between the "deserving" and "idle" poor, enclosure of common land, and the landmark 1601 Poor Relief Act.'
    }
  ],
  lesson_3_3: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=xPAKnqCOl_Q',
      title: 'Elizabethan Exploration & Voyages of Discovery',
      duration: '4 mins 55 secs',
      teacher_guidance: 'Covers advances in navigational science (astrolabes, magnetic compass), galleon shipbuilding, and trade monopolies.'
    }
  ],
  lesson_3_4: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=33zs4b3iyyw',
      title: 'Walter Raleigh and the Colonisation of Virginia (1585–1587)',
      duration: '5 mins 18 secs',
      teacher_guidance: 'Details the two expeditions to Roanoke Island, relations with Chief Wingina, and the mystery of the "Lost Colony".'
    }
  ]
};

// ==========================================
// 3. CME VIDEO MAP (12 ENQUIRY LESSONS)
// ==========================================
const CME_VIDEOS = {
  lesson_1: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=iRYZjOuUnlU',
      title: 'The Sykes-Picot Agreement & The Partition of the Ottoman Empire',
      duration: '5 mins 30 secs',
      teacher_guidance: 'Essential background on conflicting British promises: the McMahon-Hussein Correspondence (1915), the Sykes-Picot Agreement (1916), and the Balfour Declaration (1917).'
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=kbdvn8QHyX8',
      title: "The Balfour Declaration's Impact, 100 Years On",
      duration: '8 mins 3 secs',
      teacher_guidance: 'Analysis of Lord Balfour’s letter promising a "national home for the Jewish people" while claiming not to prejudice non-Jewish rights.'
    }
  ],
  lesson_2: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=PgnQeDoypO8',
      title: 'GCSE Revision: Creation of the State of Israel (1945–1949)',
      duration: '2 mins 0 secs',
      teacher_guidance: 'Concise specification summary: King David Hotel bombing, UN Partition Plan (Resolution 181), and the British withdrawal.'
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=2yBolHdMejM',
      title: '1947: Palestine Population & Jewish Immigration',
      duration: '7 mins 57 secs',
      teacher_guidance: 'Demographic breakdown of post-Holocaust immigration, the Exodus ship crisis, and the escalating civil war.'
    },
    {
      url: 'https://era.org.uk/streaming-service-resource/14-israel-and-the-arab-states-twentieth-century-history/',
      title: '20th Century History: Israel and the Arab States (1948 War)',
      duration: '20 mins 0 secs',
      teacher_guidance: 'BBC archival documentary on Ben-Gurion’s Declaration of Independence and the 1948–49 Arab-Israeli War.'
    }
  ],
  lesson_3: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=fXk_n_ww6GU',
      title: 'GCSE Revision: The Reshaping of the Middle East (1948–1949)',
      duration: '2 mins 0 secs',
      teacher_guidance: 'Summarises territorial consequences of the 1949 Armistice: Jordan takes West Bank, Egypt takes Gaza Strip, and Jerusalem is partitioned.'
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=eTMRMX7Pw5U',
      title: 'The 1948 Arab-Israeli War and Al-Nakba Explained',
      duration: '5 mins 29 secs',
      teacher_guidance: 'Examines the Palestinian exodus ("Al-Nakba" - The Catastrophe), 700,000 refugees, and the enduring Right of Return dispute.'
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=wjysy7ONisA',
      title: "1948: Israel's Battle for Independence",
      duration: '6 mins 58 secs',
      teacher_guidance: 'Israeli perspective on defensive mobilisation, Czech arms shipments, and the founding of the IDF.'
    }
  ],
  lesson_4: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=PnZ2tG_PYpc',
      title: 'GCSE Revision: President Nasser & The 1956 Suez Crisis',
      duration: '2 mins 0 secs',
      teacher_guidance: 'Key facts: Aswan Dam funding withdrawn, nationalisation of the Suez Canal, and the secret Protocol of Sèvres.'
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=fwRFhmcfHgg',
      title: 'The 1956 Suez Crisis Explained',
      duration: '4 mins 12 secs',
      teacher_guidance: 'Explains Anglo-French-Israeli collusion, US President Eisenhower threatening economic sanctions, and the emergence of the UN Emergency Force.'
    }
  ],
  lesson_6: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=W7KFi6ZmZdU',
      title: 'GCSE Revision: Road to the Six-Day War (1964–1967)',
      duration: '2 mins 0 secs',
      teacher_guidance: 'Summarises water disputes on the River Jordan, Syrian artillery on the Golan Heights, and fedayeen border raids.'
    },
    {
      url: 'https://era.org.uk/streaming-service-resource/s3e6-battle-for-the-holy-city-the-six-day-war-days-that-shook-the-world/',
      title: 'Days That Shook the World: The Six-Day War (BBC)',
      duration: '50 mins 0 secs',
      teacher_guidance: 'High-production BBC documentary examining the crisis: UNEF expulsion, closing the Straits of Tiran, and Israeli cabinet debates.'
    }
  ],
  lesson_7: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=B60O6Kcijso',
      title: 'Operation Focus: The Pre-emptive Airstrike (June 1967)',
      duration: '6 mins 45 secs',
      teacher_guidance: 'Military breakdown of the morning of 5 June 1967: Israeli Mirage jets destroying the Egyptian air force on runways within 3 hours.'
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=F4GGpOxJW7I',
      title: 'GCSE Revision: The Six-Day War Combat Timeline',
      duration: '2 mins 0 secs',
      teacher_guidance: 'Overview of the three fronts: Sinai captured from Egypt, West Bank & East Jerusalem captured from Jordan, Golan Heights captured from Syria.'
    }
  ],
  lesson_8: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=hMOIIdnkrDY',
      title: 'GCSE Revision: Conquered Territories & UN Resolution 242',
      duration: '2 mins 0 secs',
      teacher_guidance: 'Details UN Resolution 242: "land for peace", Israeli security borders, and the Khartoum Resolution "Three No’s".'
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=s7zFGaUPGUA',
      title: 'UN Resolution 242 and the Occupied Territories',
      duration: '5 mins 10 secs',
      teacher_guidance: 'Explains Jewish religious settlements in the West Bank and Gaza and the transformation of the Palestinian dispute.'
    }
  ],
  lesson_9: [
    {
      url: 'https://era.org.uk/streaming-service-resource/s1e8-black-september-hijackings-days-that-shook-the-world/',
      title: 'Days That Shook the World: Black September & Dawson’s Field Hijackings',
      duration: '50 mins 0 secs',
      teacher_guidance: 'BBC documentary on the 1970 Dawson’s Field plane hijackings, King Hussein expelling the PLO to Lebanon, and the emergence of Black September.'
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=SOLg_p4ScAU',
      title: 'The Munich 1972 Olympics Attack',
      duration: '8 mins 20 secs',
      teacher_guidance: 'Analysis of the massacre of 11 Israeli athletes at the Munich Olympics and global international terrorism.'
    }
  ],
  lesson_10: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=iK729p_-ZRg',
      title: 'GCSE Revision: The Yom Kippur War (October 1973)',
      duration: '2 mins 0 secs',
      teacher_guidance: 'Core specification recap: Sadat’s goals, the Bar-Lev line crossing, Soviet SAM missiles, and US/Soviet superpower tensions.'
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=1sBdLja2aVs',
      title: 'The Yom Kippur War (1973): Surprise Attack & Counter-Offensive',
      duration: '7 mins 15 secs',
      teacher_guidance: 'Detailed battle analysis of Syrian tank assaults on the Golan and Sharon’s Suez canal crossing, leading to the OPEC oil embargo.'
    }
  ],
  lesson_11: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=-XkX1UUe7HQ',
      title: 'GCSE Revision: Shuttle Diplomacy to Camp David (1974–1979)',
      duration: '2 mins 0 secs',
      teacher_guidance: 'Covers Henry Kissinger’s diplomacy, Anwar Sadat’s historic 1977 speech to the Knesset in Jerusalem, and the 1978 Camp David summit.'
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=LYhJOjv0Yc8',
      title: "Kissinger's Shuttle Diplomacy & Sadat in Jerusalem",
      duration: '6 mins 30 secs',
      teacher_guidance: 'Archival footage of Sadat breaking Arab taboos and meeting Prime Minister Menachem Begin.'
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=mbc9ElB5vfQ',
      title: 'The Camp David Accords (1978): Begin, Sadat & Carter',
      duration: '8 mins 45 secs',
      teacher_guidance: 'Examines the 1979 Washington Peace Treaty: Sinai returned to Egypt in exchange for formal recognition of Israel, and Sadat’s 1981 assassination.'
    }
  ],
  lesson_12: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=nXddsCeaCDw',
      title: 'GCSE Revision: The First Intifada & The 1982 Lebanon War',
      duration: '2 mins 0 secs',
      teacher_guidance: 'Covers Operation Peace for Galilee (1982), the siege of Beirut, Sabra and Shatila massacres, and the 1987 grassroots Intifada.'
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=try3LAQxSAE',
      title: 'The 1982 Lebanon War & Sabra-Shatila Massacres',
      duration: '9 mins 15 secs',
      teacher_guidance: 'Examines Ariel Sharon, the Christian Phalangist militias, and the Kahan Commission report in Israel.'
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=Azud40CQ3IE',
      title: 'The First Intifada (1987–1993): The Stone-Throwing Uprising',
      duration: '7 mins 40 secs',
      teacher_guidance: 'Explains civil disobedience, boycotted Israeli goods, stone-throwing youths against IDF soldiers, and the shift of moral sympathy.'
    }
  ],
  lesson_13: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=TgFWEVQTeHM',
      title: 'The 1993 Oslo Accords: Secret Talks & The White House Lawn Handshake',
      duration: '6 mins 50 secs',
      teacher_guidance: 'Examines secret negotiations in Norway, mutual recognition between Yitzhak Rabin and Yasser Arafat, and the establishment of the Palestinian Authority.'
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=5SIAW4cX62I',
      title: 'The Assassination of Yitzhak Rabin (1995) & The Fragility of Peace',
      duration: '5 mins 40 secs',
      teacher_guidance: 'Details the November 1995 assassination of Israeli Prime Minister Rabin by Jewish right-wing extremist Yigal Amir at a Tel Aviv peace rally.'
    }
  ]
};

// ==========================================
// HELPER TO UPDATE A UNIT'S DATA.JS FILE
// ==========================================
async function injectVideosToUnit(unitId, videoMap) {
  const filePath = path.join(UNITS_DIR, unitId, 'data.js');
  if (!fs.existsSync(filePath)) {
    console.warn(`[Skip] Unit data file not found: ${filePath}`);
    return;
  }

  console.log(`\nInjecting videos into ${unitId}...`);
  const fileUrl = 'file:///' + filePath.replace(/\\/g, '/');
  const mod = await import(fileUrl);
  const unitData = mod.unitData || mod.default || mod[unitId];

  if (!unitData || !Array.isArray(unitData.lessons)) {
    console.error(`❌ Could not read lessons array from ${unitId}/data.js`);
    return;
  }

  let updatedLessons = 0;
  let totalInjected = 0;

  unitData.lessons.forEach((l) => {
    if (videoMap[l.id]) {
      l.video = videoMap[l.id];
      updatedLessons++;
      totalInjected += l.video.length;
    }
  });

  // Re-serialize unitData preserving ES module syntax
  const exportPrefix = 'export const unitData = ';
  const newContent = exportPrefix + JSON.stringify(unitData, null, 2) + ';\n';

  fs.writeFileSync(filePath, newContent, 'utf8');

  // Verify syntax with node --check
  try {
    execSync(`node --input-type=module -e "import('${fileUrl}')"`);
    console.log(`✅ [${unitId}] Successfully updated ${updatedLessons} lessons with ${totalInjected} videos. Syntax verified.`);
  } catch (err) {
    console.error(`❌ [${unitId}] Syntax verification FAILED:`, err.message);
  }
}

// ==========================================
// MAIN RUNNER
// ==========================================
(async () => {
  console.log('====================================================');
  console.log('🎥 INJECTING GCSE TRACKER VIDEOS');
  console.log('====================================================');

  await injectVideosToUnit('edexcel_medicine', MEDICINE_VIDEOS);
  await injectVideosToUnit('eee', EEE_VIDEOS);
  await injectVideosToUnit('cme_new', CME_VIDEOS);

  console.log('\n====================================================');
  console.log('🔄 REBUILDING PUBLIC DATABASE (database.json)...');
  console.log('====================================================');
  execSync('node scripts/build_database.cjs', { stdio: 'inherit', cwd: ROOT_DIR });

  console.log('\n====================================================');
  console.log('🎉 GCSE VIDEO INJECTION COMPLETE');
  console.log('====================================================');
})();
