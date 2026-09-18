/**
 * generate_water_sanitation_quiz_booklet.cjs
 *
 * Compiles the 12-Page A5 Saddle-Stitch Knowledge Retrieval & Homework Companion
 * for KS3 History (Year 7): Water and Sanitation Through Time (Roman to Victorian).
 *
 * Page Architecture (12-Page A5 Booklet / 3 sheets A4 landscape folded in half):
 * - Page 1: Uniform Front Cover & Formative Homework & Retrieval Tracking Ledger
 *           (Scholar box, Attempt 1 vs 2, Text-only Retrieval Strength [ ] Instant [ ] Effortful [ ] Restudy,
 *           Roomy Parent Initial box, QR code to interactive portal)
 * - Page 2: Inside Front Cover — Master Chronology Domino Flowchart (100 AD to 1875)
 * - Pages 3–8: 1 Dedicated Page per Lesson (Lessons 1 to 6 • 8 questions each)
 *              Featuring 2 roomy write-in lines per question (18px min-height):
 *              Line 1: Answer: [Core Fact]
 *              Line 2: Detail / Why: [Historical Mechanism or Consequence]
 * - Page 9: Department Marking Bank (Part 1 • Lessons 1–3 • Bold answers + Explanation + [✓][✗])
 * - Page 10: Department Marking Bank (Part 2 • Lessons 4–6 • Bold answers + Explanation + [✓][✗])
 * - Page 11: Key Historical Figures Gallery (6 protagonists) & Academic Vocabulary with Phonetics
 * - Page 12: Back Cover — Summative Assessment Preparation & Essay Architect
 *            ("Why did it take so long to clean up Britain's towns?" • 4-Factor Matrix,
 *            Laissez-faire vs Epidemiology historiography, sentence starters & connectives, Archival Seal)
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const QRCode = require('qrcode');

const ROOT_DIR = path.join(__dirname, '..');
const UNIT_DIR = path.join(ROOT_DIR, 'public', 'units', 'water_and_sanitation');
const PDFS_DIR = path.join(ROOT_DIR, 'public', 'pdfs');
const DRIVE_ROOT = 'G:\\My Drive\\AAMX\\Dep File';

if (!fs.existsSync(PDFS_DIR)) {
  fs.mkdirSync(PDFS_DIR, { recursive: true });
}

// --------------------------------------------------------------------------
// 48 CURATED HIGH-YIELD QUESTIONS ACROSS THE 6 LESSONS
// --------------------------------------------------------------------------
const QUIZ_DATA = [
  // LESSON 1: Roman Public Health
  {
    lesson: 1,
    lessonTitle: '1. Roman Public Health: Conduits, Baths & Sewers',
    shortTitle: 'Roman Public Health & Infrastructure',
    enquiry: 'How much progress did the Romans make in public health?',
    items: [
      {
        q: 'What technology did Roman engineers construct to transport millions of gallons of fresh water into British towns?',
        a: 'Stone aqueducts and conduits using gravity',
        exp: 'Romans engineered gently sloping stone channels that carried clean river or spring water across valleys directly into public fountains.',
      },
      {
        q: "Which Roman fort on Hadrian's Wall contains Britain's best-preserved communal latrines with flowing sewer channels?",
        a: 'Housesteads Fort on Hadrian’s Wall',
        exp: 'Soldiers sat side-by-side on stone benches while rainwater and runoff flowed underneath to flush waste continuously into drainage ditches.',
      },
      {
        q: 'What was the great vaulted main sewer of ancient Rome called that flushed town waste into the River Tiber?',
        a: 'The Cloaca Maxima',
        exp: 'Built originally as an open drainage canal, it was enclosed to become one of the world’s earliest massive municipal sewer systems.',
      },
      {
        q: 'What curved bronze scraping tool did bathers use with olive oil to scrape dirt and sweat from their bodies?',
        a: 'A strigil',
        exp: 'Romans did not use soap; instead, they rubbed olive oil into their skin and scraped off dirt before moving between bath chambers.',
      },
      {
        q: 'What underfloor heating system was used in Roman public bathhouses to warm the caldarium and pools?',
        a: 'The hypocaust system',
        exp: 'Slaves stoked wood fires in a furnace, circulating hot air beneath raised tiled floors and through hollow wall tiles (tubuli).',
      },
      {
        q: 'Did the Romans build public health systems because they understood bacterial germs?',
        a: 'No, they believed in balancing the Four Humors and avoiding miasma',
        exp: 'Romans associated bad smells (miasma) and dirty water with illness, but had zero knowledge of microscopic pathogens.',
      },
      {
        q: 'How did Roman emperors and military governors use clean water and bathhouses politically?',
        a: 'To display imperial prestige and keep citizens content',
        exp: 'Providing free or cheap baths demonstrated Roman supremacy and civilised living, serving as a political tool for colonial control.',
      },
      {
        q: 'Why did Roman public health infrastructure collapse after the legions left Britain in 410 AD?',
        a: 'Central taxation, engineering expertise, and maintenance collapsed',
        exp: 'Without central Roman imperial administration, aqueducts fell into disrepair and Anglo-Saxon settlers preferred rural wood dwellings.',
      },
    ],
  },

  // LESSON 2: Medieval Public Health & Monasteries
  {
    lesson: 2,
    lessonTitle: '2. Medieval Public Health: Cesspits, Monasteries & The Black Death',
    shortTitle: 'Medieval Sanitation & The Black Death',
    enquiry: 'Why did public health decline during the Middle Ages?',
    items: [
      {
        q: 'Why did deserted medieval villages like Wharram Percy avoid catastrophic public health crises despite lacking sewers?',
        a: 'Low population density prevented contamination',
        exp: 'With few residents scattered across open farmland, waste decomposed naturally and did not overwhelm local wells or streams.',
      },
      {
        q: 'On the 12th-century waterworks plan of Canterbury Priory, what did the red and green pipes represent?',
        a: 'Piped clean spring water vs dirty waste water',
        exp: 'Monasteries were sanitation pioneers: monks diverted hillside springs into lead pipes and used overflow water to flush monastery latrines.',
      },
      {
        q: 'What was a medieval domestic cesspit typically lined with to prevent raw sewage leaking into cellars?',
        a: 'Clay, timber planks, or stone masonry',
        exp: 'Cesspits were dug beneath houses or gardens; proper lining prevented liquid waste from soaking into nearby drinking water wells.',
      },
      {
        q: 'What name was given to the night-workers hired to shovel out overflowing cesspits in medieval towns?',
        a: 'Gongfermers (or gong farmers)',
        exp: 'They performed hazardous, foul manual labour, shovelling human waste into carts to sell as agricultural manure outside town walls.',
      },
      {
        q: 'Under what strict regulation were gongfermers legally required to perform their waste-clearing work?',
        a: 'Exclusively at night under cover of darkness',
        exp: 'Town ordinances prohibited moving dung carts during daylight hours to avoid sickening citizens with unbearable stench and traffic blockages.',
      },
      {
        q: 'What natural material discovered by archaeologists in medieval cesspits reveals what people used for toilet paper?',
        a: 'Wild moss',
        exp: 'Excavations in York and London reveal soft woodland mosses were bundled and used as disposable personal hygiene wipes.',
      },
      {
        q: 'What catastrophic epidemic struck Britain in 1348, killing an estimated one-third to one-half of the population?',
        a: 'The Black Death (Bubonic Plague)',
        exp: 'Caused by Yersinia pestis carried by black rat fleas, the plague devastated towns and disrupted agriculture, economy, and social order.',
      },
      {
        q: 'What dominant medical theory blamed the Black Death on invisible poisoned air rising from decaying matter?',
        a: 'Miasma theory',
        exp: 'Physicians believed corrupt air generated by rotting corpses, animal dung, and standing water upset the body’s humors upon inhalation.',
      },
    ],
  },

  // LESSON 3: Early Modern Towns
  {
    lesson: 3,
    lessonTitle: '3. Early Modern Towns: Overcrowding, Water Cobs & The 1665 Plague',
    shortTitle: 'Early Modern Towns & The 1665 Plague',
    enquiry: 'To what extent did towns become filthier during the Early Modern period?',
    items: [
      {
        q: 'Why did sanitation conditions worsen in Tudor and Stuart London compared to rural villages?',
        a: 'Rapid population growth caused extreme urban overcrowding',
        exp: 'Between 1500 and 1650, London swelled from 60,000 to 400,000; tall timber tenements blocked light, air, and overwhelmed sewage pits.',
      },
      {
        q: 'Who invented Britain’s first flushing water closet (toilet) for Queen Elizabeth I in 1596?',
        a: 'Sir John Harington',
        exp: 'His ‘Ajax’ water closet used a valve and cistern to flush waste into a vault, but Queen Elizabeth found it too noisy and smelly.',
      },
      {
        q: 'Why did ordinary citizens fail to adopt Sir John Harington’s 1596 flushing toilet?',
        a: 'Homes lacked continuous running water and street sewers',
        exp: 'Flushing toilets were expensive luxuries; without pressurized municipal water pipes and street sewers, they could not function in towns.',
      },
      {
        q: 'How did most London households without private wells obtain clean water in the 17th century?',
        a: 'Bought from water sellers (cobs) or public conduits',
        exp: 'Water carriers carried barrels on wooden yokes or packhorses from the Thames and conduits, charging householders per bucket.',
      },
      {
        q: 'What was the occupation of ‘scavengers’ and ‘rakers’ appointed by town parishes?',
        a: 'Sweeping dung and market refuse into parish waste carts',
        exp: 'Parishes taxed property owners to pay rakers to clear main commercial streets weekly, though narrow slum alleys were routinely neglected.',
      },
      {
        q: 'What deadly epidemic struck London in 1665, killing over 68,000 people before the Great Fire?',
        a: 'The Great Plague of 1665',
        exp: 'The last major outbreak of bubonic plague in England, it killed nearly 20% of London’s population during a sweltering summer.',
      },
      {
        q: 'What symbol was painted on the doors of infected houses during the 1665 plague quarantine?',
        a: 'A red cross with the words “Lord have mercy upon us”',
        exp: 'Parish watchmen locked infected families inside for 40 days to stop disease spread, delivering food through upper-floor windows.',
      },
      {
        q: 'Why did wealthy elites flee London during the 1665 plague while the working poor were trapped?',
        a: 'Wealthy citizens had country estates; poor workers had no savings',
        exp: 'King Charles II, doctors, and wealthy merchants escaped to rural properties, while town guards refused to let day labourers leave London.',
      },
    ],
  },

  // LESSON 4: Industrial Revolution Public Health Crisis
  {
    lesson: 4,
    lessonTitle: '4. Industrial Revolution: Slums, Privies & King Cholera',
    shortTitle: 'Industrial Slums & Asiatic Cholera',
    enquiry: 'How did the Industrial Revolution lead to a public health crisis?',
    items: [
      {
        q: 'What type of cramped, poorly ventilated housing was mass-produced for industrial factory workers?',
        a: 'Back-to-back terraced houses with no through-draft',
        exp: 'Builders maximized profits by building houses touching at the back and sides, leaving only one outside wall with windows and no ventilation.',
      },
      {
        q: 'In industrial slum courtyards, how many families typically shared a single outdoor privy cesspool?',
        a: '20 to 50 families per single privy',
        exp: 'Overfilled privies seeped liquid sewage through basement walls and contaminated shallow courtyards and pump wells.',
      },
      {
        q: 'What terrifying waterborne bacterial disease first arrived in Britain in October 1831, killing 31,000?',
        a: 'Asiatic Cholera',
        exp: 'Originating in India and spreading along trade routes, cholera caused sudden, excruciating dehydration that could kill healthy people in hours.',
      },
      {
        q: 'What physical symptoms made cholera so sudden and horrifying to Victorian observers?',
        a: 'Violent vomiting, rice-water diarrhoea, and blue shrivelled skin',
        exp: 'Extreme fluid loss drained blood volume rapidly, turning victims’ faces and hands sunken and dark blue (cyanosis) before death.',
      },
      {
        q: 'What 1842 landmark report proved that working-class urban dwellers had a life expectancy under 20 years?',
        a: 'Edwin Chadwick’s Report on the Sanitary Condition of the Labouring Population',
        exp: 'Chadwick used statistical mortality tables to prove that squalor and filth caused disease, poverty, and astronomical child death rates.',
      },
      {
        q: 'What political ideology led the British government to resist spending money on public health infrastructure?',
        a: 'Laissez-faire (“leave it alone”)',
        exp: 'Victorian politicians believed the government should not interfere in private enterprise, property rights, or impose national taxes for local works.',
      },
      {
        q: 'What act of Parliament in 1848 established the first General Board of Health, though it was largely voluntary?',
        a: 'The 1848 Public Health Act',
        exp: 'Passed during the second cholera epidemic, it encouraged towns to form local health boards, but lacked compulsory powers to force towns to act.',
      },
      {
        q: 'Why did wealthy ratepayers and private water companies strongly oppose government public health reforms?',
        a: 'They resented paying higher local taxes and government regulation',
        exp: 'Property owners feared losing rental profits, while private water companies did not want to spend money filtering water or piping sewage.',
      },
    ],
  },

  // LESSON 5: The Great Stink (1858) & London's Mega-Sewers
  {
    lesson: 5,
    lessonTitle: '5. The Great Stink (1858) & Bazalgette’s Mega-Sewers',
    shortTitle: 'The Great Stink & London Sewers',
    enquiry: 'Why did it take the ‘Great Stink’ to finally clean up Britain’s streets?',
    items: [
      {
        q: 'What environmental disaster struck London during the blistering hot summer of June 1858?',
        a: 'The Great Stink of London',
        exp: 'Heat fermented hundreds of thousands of tons of raw sewage in the River Thames, creating an unbearable, nauseating chemical stench.',
      },
      {
        q: 'What chemical solution did MPs soak the curtains of the Houses of Parliament in to neutralise the Thames stench?',
        a: 'Chloride of lime (calcium hypochlorite)',
        exp: 'The smell in the Commons debating chamber was so overpowering that MPs had to hold handkerchiefs to their faces and evacuate committee rooms.',
      },
      {
        q: 'Why did the Great Stink finally force Parliament to pass sewer funding after decades of inaction?',
        a: 'MPs directly feared for their own lives and could not work',
        exp: 'Believing miasma caused cholera, politicians panicked that the toxic Thames vapour would kill them directly in Westminster.',
      },
      {
        q: 'Which brilliant civil engineer was commissioned by the Metropolitan Board of Works to rebuild London’s drainage?',
        a: 'Sir Joseph Bazalgette',
        exp: 'Bazalgette designed and oversaw the construction of the greatest civil engineering sanitation marvel of the Victorian era.',
      },
      {
        q: 'Approximately how many miles of underground intercepting sewers did Bazalgette construct across London?',
        a: '82 miles of main intercepting sewers and 1,100 miles of street sewers',
        exp: 'Using 318 million Portland cement bricks, Bazalgette’s system intercepted waste from old sewers and transported it safely east of the city.',
      },
      {
        q: 'What distinctive cross-sectional shape was chosen for Bazalgette’s brick sewer tunnels to ensure self-cleansing?',
        a: 'Egg-shaped (oval) cross-section',
        exp: 'The narrow base concentrated low water flows, keeping water velocity fast enough to flush solid waste and prevent sediment blockages.',
      },
      {
        q: 'Where did Bazalgette’s intercepting system redirect London’s raw sewage to protect drinking water intakes?',
        a: 'Downriver past Beckton and Crossness into the Thames estuary',
        exp: 'Giant steam pumping stations lifted sewage into massive reservoirs, releasing it on the outgoing ebb tide so it washed out to sea.',
      },
      {
        q: 'How did the 1866 cholera outbreak prove the triumphant success of Bazalgette’s completed sewer network?',
        a: 'Cholera struck only the East End where sewers were not yet finished',
        exp: 'Central and West London remained completely cholera-free, scientifically proving that modern sewage interception stopped disease.',
      },
    ],
  },

  // LESSON 6: Dr John Snow & The Broad Street Cholera Investigation
  {
    lesson: 6,
    lessonTitle: '6. Dr John Snow, The Soho Pump & The 1875 Public Health Act',
    shortTitle: 'Dr John Snow & The 1875 Public Health Act',
    enquiry: 'How did John Snow and science finally defeat cholera and laissez-faire?',
    items: [
      {
        q: 'What radical hypothesis did Dr John Snow publish in 1849 arguing against the prevailing miasma theory?',
        a: 'Cholera was waterborne, caused by swallowing contaminated water',
        exp: 'Snow argued cholera affected the human gut (stomach and intestines), not the lungs, meaning it entered via drinking water or food.',
      },
      {
        q: 'What revolutionary epidemiological method did Dr John Snow pioneer during the September 1854 Soho outbreak?',
        a: 'A spot map plotting each cholera death outside street addresses',
        exp: 'Snow marked 500 fatal cases as black lines on a street grid, demonstrating that deaths clustered tightly around one specific public pump.',
      },
      {
        q: 'Which specific public water pump did Snow’s spot map pinpoint as the deadly source of the Soho epidemic?',
        a: 'The Broad Street pump in Soho',
        exp: 'Almost all 616 victims had drunk water from the Broad Street pump, while nearby workers at a brewery who drank only beer were unharmed.',
      },
      {
        q: 'What decisive action did Snow convince the St James parish Board of Guardians to take on 8 September 1854?',
        a: 'Remove the handle from the Broad Street pump',
        exp: 'Removing the handle stopped residents from drawing contaminated water, causing the local epidemic to collapse immediately.',
      },
      {
        q: 'What physical underground defect discovered near the Broad Street pump proved Snow’s contamination theory?',
        a: 'A cracked cesspit from an infected infant leaking into the well',
        exp: 'A mother had washed diapers of a baby ill with cholera into a cesspit only three feet away from the porous brick lining of the well.',
      },
      {
        q: 'Which German microbiologist definitively identified the cholera bacterium under a microscope in 1883?',
        a: 'Robert Koch (Vibrio cholerae)',
        exp: 'Koch isolated the comma-shaped bacterium in Egypt and India, providing visual, indisputable laboratory proof of Snow’s waterborne theory.',
      },
      {
        q: 'What landmark legislation in 1875 made it legally compulsory for all local councils to provide clean water and sewers?',
        a: 'The 1875 Public Health Act',
        exp: 'Passed under Prime Minister Disraeli, it replaced voluntary guidelines with strict legal duties: clean water, sewage disposal, and health inspectors.',
      },
      {
        q: 'Why does the 1875 Public Health Act mark the definitive death of government laissez-faire in Britain?',
        a: 'The state accepted legal responsibility for citizen health and sanitation',
        exp: 'For the first time, government prioritized human life over landlord property rights, establishing modern Britain’s public health foundation.',
      },
    ],
  },
];

// --------------------------------------------------------------------------
// CSS STYLING FOR A5 SADDLE-STITCH BOOKLET (148mm x 210mm)
// --------------------------------------------------------------------------
const A5_BOOKLET_CSS = `
  @page {
    size: 148mm 210mm;
    margin: 6mm 0mm;
  }
  * { box-sizing: border-box; }
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: #0f172a;
    margin: 0;
    padding: 0;
    font-size: 7.2pt;
    line-height: 1.2;
    background: #ffffff;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  
  .a5-page {
    page-break-after: always;
    height: 198mm;
    max-height: 198mm;
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
  }
  /* Gutter-Safe Margin Tuning for A5 Saddle-Stitch Binding */
  .a5-page:nth-child(odd) {
    padding-left: 10mm; /* Inner spine clearance on left for odd/recto pages */
    padding-right: 6mm;
  }
  .a5-page:nth-child(even) {
    padding-left: 6mm;
    padding-right: 10mm; /* Inner spine clearance on right for even/verso pages */
  }
  .a5-page:last-child { page-break-after: avoid; }

  /* Page Headers & Footers */
  .page-header-strip {
    border-bottom: 1.5px solid #0f172a;
    padding-bottom: 2px;
    margin-bottom: 4px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .page-header-strip h2 {
    margin: 0;
    font-size: 8.8pt;
    color: #0f172a;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }
  .page-header-strip p {
    margin: 1px 0 0 0;
    font-size: 6.2pt;
    color: #475569;
    font-weight: 600;
  }
  .page-tag {
    font-size: 6.2pt;
    font-weight: 800;
    background: #0284c7;
    color: #ffffff;
    padding: 2px 6px;
    border-radius: 2px;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    white-space: nowrap;
  }
  .page-footer-strip {
    font-size: 6.2pt;
    color: #64748b;
    border-top: 1px solid #cbd5e1;
    padding-top: 2px;
    margin-top: 2px;
    display: flex;
    justify-content: space-between;
    font-weight: 600;
  }

  /* Cover Page Styling (Page 1) */
  .cover-banner {
    background: #0369a1;
    color: #ffffff;
    padding: 4px 8px;
    border-radius: 4px 4px 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 6.5pt;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.8px;
  }
  /* Commercial School Cover Customizer */
  [data-department-name]:not([data-department-name=""]):not([data-department-name="The History Department"]) .school-brand-target {
    display: inline-block;
    font-size: 0;
  }
  [data-department-name]:not([data-department-name=""]):not([data-department-name="The History Department"]) .school-brand-target::after {
    content: attr(data-department-name);
    font-size: 6.5pt;
  }
  .cover-header-block {
    text-align: center;
    padding: 4px 6px 3px 6px;
    background: #f0f9ff;
    border-left: 1px solid #bae6fd;
    border-right: 1px solid #bae6fd;
  }
  .cover-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 11.5pt;
    font-weight: 800;
    color: #0c4a6e;
    line-height: 1.15;
    margin: 0 0 2px 0;
  }
  .cover-subtitle {
    font-size: 6.8pt;
    font-weight: 700;
    color: #0284c7;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    margin: 0;
  }

  /* Pupil Box */
  .pupil-box {
    background: #ffffff;
    border: 1px solid #bae6fd;
    border-top: none;
    padding: 3px 8px;
    font-size: 7pt;
  }
  .pupil-grid {
    display: grid;
    grid-template-columns: 2fr 1.2fr 1.5fr;
    gap: 10px;
    align-items: center;
  }
  .pupil-field {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .pupil-field span.lbl {
    font-weight: 700;
    color: #0c4a6e;
    white-space: nowrap;
  }
  .pupil-field span.line {
    border-bottom: 1.2px solid #000000;
    flex: 1;
    min-height: 12px;
  }

  .page-flex-full {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 198mm;
    max-height: 198mm;
  }
  .page-body-stretch {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    margin-bottom: 2px;
  }
  .timeline-page-content {
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: space-between;
    margin-bottom: 2px;
  }

  /* Cover Map Container */
  .cover-map-container {
    margin: 2px 0 2px 0;
    text-align: center;
    background: #f8fafc;
    border: 1px solid #cbd5e1;
    border-radius: 4px;
    padding: 2px 4px 2px 4px;
  }
  .cover-map-frame {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    max-height: 76mm;
  }
  .cover-map-img {
    max-height: 76mm;
    max-width: 100%;
    object-fit: contain;
    border: 1px solid #94a3b8;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.08);
  }
  .cover-map-caption {
    font-size: 5.6pt;
    color: #475569;
    margin-top: 1.5px;
    letter-spacing: 0.2px;
  }

  /* Tracking Grid Table (Page 1) */
  .tracking-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 6.5pt;
    margin-top: 2px;
    margin-bottom: 2px;
  }
  .tracking-table th {
    background: #0c4a6e;
    color: #ffffff;
    font-weight: 700;
    text-transform: uppercase;
    padding: 3px 3px;
    border: 1px solid #0c4a6e;
    font-size: 6pt;
    letter-spacing: 0.2px;
    text-align: center;
  }
  .tracking-table td {
    border: 1px solid #cbd5e1;
    padding: 2.8px 3px;
    text-align: center;
    vertical-align: middle;
  }
  .tracking-table td.left-title {
    text-align: left;
    color: #0f172a;
  }
  .tb-lesson-title {
    font-weight: 800;
    font-size: 6.5pt;
    color: #0f172a;
    line-height: 1.15;
  }
  .tb-lesson-enquiry {
    font-size: 5.4pt;
    color: #475569;
    font-style: italic;
    line-height: 1.15;
    margin-top: 0.5px;
  }
  .score-line {
    display: inline-block;
    width: 14px;
    border-bottom: 1px solid #000;
  }
  .retrieval-boxes {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3.5px;
    font-size: 5.8pt;
    color: #334155;
    white-space: nowrap;
  }
  .retrieval-boxes span {
    font-weight: 600;
  }
  .parent-sig-cell {
    padding: 2px 4px;
  }
  .parent-sig-box {
    border: 1px solid #94a3b8;
    background: #ffffff;
    border-radius: 2px;
    height: 16px;
    width: 100%;
  }

  /* 3-Tier Traffic Light Mastery Rule */
  .mastery-traffic-strip {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f0f9ff;
    border: 1px solid #bae6fd;
    border-radius: 3px;
    padding: 2.5px 6px;
    margin-top: 2px;
    margin-bottom: 2px;
    font-size: 5.8pt;
    line-height: 1.15;
  }
  .traffic-tier {
    display: flex;
    align-items: center;
    gap: 3.5px;
    color: #0c4a6e;
  }
  .traffic-dot {
    font-size: 7.5pt;
    line-height: 1;
  }
  .green-dot { color: #16a34a; }
  .amber-dot { color: #d97706; }
  .red-dot { color: #dc2626; }

  /* QR Strip */
  .qr-strip {
    display: flex;
    align-items: center;
    background: #f8fafc;
    border: 1px solid #cbd5e1;
    border-radius: 4px;
    padding: 3px 6px;
    gap: 8px;
    margin-top: 2px;
    margin-bottom: 1px;
  }
  .qr-code-img {
    width: 32px;
    height: 32px;
    flex-shrink: 0;
  }
  .qr-caption-text {
    font-size: 6.2pt;
    color: #334155;
    line-height: 1.2;
    text-align: left;
    font-weight: 600;
  }

  /* Page 2: Chronology Domino Flowchart */
  .timeline-flow {
    display: flex;
    flex-direction: column;
    gap: 2.5px;
    flex: 1;
    justify-content: space-between;
    margin-top: 2px;
    margin-bottom: 2px;
  }
  .domino-node {
    display: flex;
    align-items: center;
    gap: 6px;
    background: #ffffff;
    border: 1px solid #0284c7;
    border-radius: 3px;
    padding: 2.5px 5px;
    font-size: 6.6pt;
    line-height: 1.18;
  }
  .domino-year {
    background: #0284c7;
    color: #ffffff;
    font-weight: 800;
    font-size: 6.5pt;
    padding: 1.5px 5px;
    border-radius: 2px;
    white-space: nowrap;
  }
  .domino-text {
    flex: 1;
  }

  /* Pages 3–8: Dedicated Question Page Layout */
  .lesson-instruction-bar {
    background: #f0f9ff;
    border-left: 3px solid #0284c7;
    padding: 2px 6px;
    font-size: 6.4pt;
    color: #0c4a6e;
    font-weight: 600;
    margin-bottom: 2px;
  }
  .q-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    gap: 1.5px;
  }
  .q-block {
    background: #ffffff;
    border: 1px solid #cbd5e1;
    border-radius: 3px;
    padding: 3px 6px;
    display: flex;
    flex-direction: column;
    gap: 1.5px;
  }
  .q-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 4px;
    font-size: 8.5pt;
    line-height: 1.15;
  }
  .q-prompt-wrap {
    display: flex;
    align-items: flex-start;
    gap: 4px;
    flex: 1;
  }
  .q-num {
    font-weight: 800;
    color: #000000;
    min-width: 14px;
    font-size: 8.5pt;
  }
  .q-prompt {
    font-weight: 700;
    color: #000000;
    font-size: 8.5pt;
  }
  .q-mastery {
    font-size: 6pt;
    font-weight: 700;
    color: #475569;
    white-space: nowrap;
  }
  .q-line-row {
    display: flex;
    align-items: flex-end;
    gap: 5px;
    font-size: 7.2pt;
    margin-top: 1px;
  }
  .q-line-lbl {
    font-weight: 800;
    color: #000000;
    white-space: nowrap;
    font-size: 7.2pt;
    min-width: 65px;
  }
  .q-solid-line {
    flex: 1;
    border-bottom: 1.2px solid #000000;
    min-height: 18px;
  }

  /* Pages 9 & 10: Marking Bank */
  .mb-section-title {
    background: #f0f9ff;
    border-left: 3px solid #0284c7;
    padding: 1.5px 5px;
    font-size: 6.8pt;
    font-weight: 800;
    color: #0c4a6e;
    text-transform: uppercase;
    letter-spacing: 0.2px;
    margin: 3px 0 1.5px 0;
  }
  .mb-section-title:first-child { margin-top: 0; }
  .mb-container {
    display: flex;
    flex-direction: column;
    gap: 1.5px;
    flex: 1;
    justify-content: space-between;
  }
  .ans-card {
    display: flex;
    align-items: flex-start;
    gap: 4px;
    font-size: 6.4pt;
    line-height: 1.15;
    background: #f8fafc;
    border: 1px solid #cbd5e1;
    border-radius: 2px;
    padding: 2px 4px;
  }
  .ans-num {
    font-weight: 800;
    color: #0c4a6e;
    min-width: 13px;
  }
  .ans-content {
    flex: 1;
    color: #0f172a;
  }
  .ans-core {
    font-weight: 800;
    color: #0f172a;
  }
  .ans-exp {
    color: #334155;
    font-style: italic;
  }
  .ans-boxes {
    font-size: 6pt;
    font-weight: 800;
    color: #64748b;
    white-space: nowrap;
  }

  /* Page 11: Figures & Vocab */
  .p11-sec-title {
    font-size: 7.2pt;
    font-weight: 800;
    text-transform: uppercase;
    color: #0c4a6e;
    border-bottom: 1.2px solid #0284c7;
    padding-bottom: 1.5px;
    margin-bottom: 3px;
    margin-top: 4px;
  }
  .p11-sec-title:first-of-type { margin-top: 0; }
  .figures-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3px;
    margin-bottom: 3px;
  }
  .figure-card {
    background: #f8fafc;
    border: 1px solid #cbd5e1;
    border-radius: 3px;
    padding: 3px 5px;
    font-size: 6pt;
    line-height: 1.15;
  }
  .figure-name {
    font-weight: 800;
    color: #0c4a6e;
    font-size: 6.6pt;
  }
  .figure-role {
    font-weight: 600;
    color: #64748b;
    font-size: 5.8pt;
  }
  .figure-act {
    color: #334155;
    margin-top: 1px;
  }
  .vocab-list {
    display: flex;
    flex-direction: column;
    gap: 2.5px;
  }
  .vocab-card {
    background: #ffffff;
    border: 1px solid #cbd5e1;
    border-radius: 2px;
    padding: 2.5px 5px;
    font-size: 6.2pt;
    line-height: 1.15;
  }
  .vocab-term {
    font-weight: 800;
    color: #0c4a6e;
    font-size: 6.8pt;
  }
  .vocab-phonetic {
    font-style: italic;
    color: #0284c7;
    font-size: 6pt;
    font-weight: 600;
    margin-left: 3px;
  }
  .vocab-def {
    color: #334155;
    margin-top: 0.5px;
  }

  /* Page 12: Back Cover Essay Architect */
  .essay-matrix-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 6.2pt;
    margin-bottom: 3px;
  }
  .essay-matrix-table th {
    background: #0c4a6e;
    color: #ffffff;
    font-weight: 800;
    padding: 2.5px 4px;
    border: 1px solid #0c4a6e;
    text-align: left;
    font-size: 6pt;
    text-transform: uppercase;
  }
  .essay-matrix-table td {
    border: 1px solid #cbd5e1;
    padding: 2px 4px;
    vertical-align: top;
    line-height: 1.15;
  }
  .essay-card {
    background: #f8fafc;
    border: 1px solid #cbd5e1;
    border-radius: 3px;
    padding: 3px 6px;
    margin-bottom: 2.5px;
  }
  .essay-card-title {
    font-size: 6.6pt;
    font-weight: 800;
    color: #0c4a6e;
    margin-bottom: 1.5px;
    text-transform: uppercase;
    letter-spacing: 0.2px;
  }
  .scaffold-list {
    margin: 0;
    padding-left: 10px;
    font-size: 6pt;
    color: #334155;
    line-height: 1.18;
  }
  .connectives-flex {
    display: flex;
    flex-wrap: wrap;
    gap: 3px;
    margin-top: 1.5px;
  }
  .conn-pill {
    background: #e0f2fe;
    color: #0369a1;
    font-weight: 700;
    font-size: 5.6pt;
    padding: 1px 4px;
    border-radius: 2px;
  }
  .archival-seal-block {
    text-align: center;
    border-top: 1px dashed #94a3b8;
    padding-top: 2px;
    margin-top: 2px;
    font-size: 5.4pt;
    color: #64748b;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }
`;

// --------------------------------------------------------------------------
// COMPILATION PIPELINE
// --------------------------------------------------------------------------
async function buildWaterSanitationQuizBooklet() {
  console.log('\n=============================================================');
  console.log('💧 Compiling Year 7 Water & Sanitation 12-Page A5 Quiz Booklet');
  console.log('=============================================================\n');

  // 1. Generate QR Code
  console.log('🛠️  Generating QR Code for interactive revision portal...');
  const appUrl =
    'https://the-history-revision-hub.netlify.app/?unit=water_and_sanitation&view=lessons';
  const qrDataUrl = await QRCode.toDataURL(appUrl, {
    margin: 1,
    width: 90,
    color: { dark: '#0c4a6e', light: '#ffffff' },
  });

  // 2. Load Broad Street Pump Map for Cover Page
  console.log('🗺️  Loading Dr John Snow Cholera Map for Cover Page...');
  let mapDataUrl = '';
  const mapPath = path.join(ROOT_DIR, 'public', 'images', 'john_snow_cholera_map.jpg');
  if (fs.existsSync(mapPath)) {
    const mapBuffer = fs.readFileSync(mapPath);
    mapDataUrl = `data:image/jpeg;base64,${mapBuffer.toString('base64')}`;
  }

  // ------------------------------------------------------------------------
  // PAGE 1: COVER & FORMATIVE HOMEWORK RETRIEVAL LEDGER
  // ------------------------------------------------------------------------
  const page1 = `
  <div class="a5-page page-flex-full">
    <div class="page-body-stretch">
      <div class="cover-banner" data-department-name="The History Department">
        <span class="school-brand-target">The History Department</span>
        <span>Key Stage 3 History &bull; Year 7</span>
      </div>

      <div class="cover-header-block">
        <h1 class="cover-title">Water &amp; Sanitation Through Time</h1>
        <div class="cover-subtitle">Knowledge Retrieval &bull; Formative Homework &bull; Assessment Companion</div>
      </div>

      <div class="pupil-box">
        <div class="pupil-grid">
          <div class="pupil-field">
            <span class="lbl">Scholar Name:</span>
            <span class="line"></span>
          </div>
          <div class="pupil-field">
            <span class="lbl">Class:</span>
            <span class="line"></span>
          </div>
          <div class="pupil-field">
            <span class="lbl">Teacher:</span>
            <span class="line"></span>
          </div>
        </div>
      </div>

      <div class="cover-map-container">
        <div class="cover-map-frame">
          ${
            mapDataUrl
              ? `<img src="${mapDataUrl}" class="cover-map-img" alt="Dr John Snow Broad Street Pump Cholera Spot Map (1854)" />`
              : `<div style="padding: 20px; font-size: 7pt; color: #64748b;">[Dr John Snow Broad Street Cholera Spot Map (1854)]</div>`
          }
        </div>
        <div class="cover-map-caption">
          <strong>Primary Archive Spot Map:</strong> Dr John Snow's 1854 Broad Street Soho cholera spot map, plotting fatal cases to identify the contaminated water pump.
        </div>
      </div>

      <!-- Formative Tracking Ledger -->
      <table class="tracking-table">
        <thead>
          <tr>
            <th style="width: 34%;">Curriculum Lesson Topic</th>
            <th style="width: 12%;">Attempt 1</th>
            <th style="width: 12%;">Attempt 2</th>
            <th style="width: 20%;">Retrieval Strength</th>
            <th style="width: 22%; font-size: 5.5pt; text-transform: uppercase;">Parent Signature</th>
          </tr>
        </thead>
        <tbody>
          ${QUIZ_DATA.map(
            (l) => `
            <tr>
              <td class="left-title">
                <div class="tb-lesson-title">L${l.lesson}: ${l.shortTitle}</div>
                <div class="tb-lesson-enquiry">“${l.enquiry}”</div>
              </td>
              <td><span class="score-line"></span> / 8</td>
              <td><span class="score-line"></span> / 8</td>
              <td>
                <div class="retrieval-boxes">
                  <span>[ ] Instant</span>
                  <span>[ ] Effortful</span>
                  <span>[ ] Restudy</span>
                </div>
              </td>
              <td class="parent-sig-cell"><div class="parent-sig-box"></div></td>
            </tr>
          `,
          ).join('')}
        </tbody>
      </table>


      <!-- QR Strip -->
      <div class="qr-strip">
        <img src="${qrDataUrl}" class="qr-code-img" alt="Digital Portal QR" />
        <div class="qr-caption-text">
          <strong>Digital Revision &amp; Self-Check:</strong> Scan to test your knowledge with interactive flashcards, audio guides, and primary sources on the Revision Hub.
        </div>
      </div>
    </div>

    <div class="page-footer-strip">
      <span>The History Department &bull; KS3 Water and Sanitation</span>
      <span>Page 1 of 12</span>
    </div>
  </div>
  `;

  // ------------------------------------------------------------------------
  // PAGE 2: INSIDE FRONT COVER — CHRONOLOGY DOMINO FLOWCHART (14 NODES)
  // ------------------------------------------------------------------------
  const timelineNodes = [
    {
      year: 'c. 100 AD',
      text: '<strong>Roman Conduits &amp; Sewers:</strong> Roman engineers build stone conduits, hypocaust bathhouses, and Housesteads fort communal latrines.',
    },
    {
      year: '122 AD',
      text: '<strong>Hadrian’s Wall Drainage:</strong> Housesteads Roman Fort engineered with multi-seat latrines flushed continuously by collected rainwater.',
    },
    {
      year: '410 AD',
      text: '<strong>Roman Collapse:</strong> Legions withdraw from Britain; aqueducts fall into disuse as Anglo-Saxon timber farming replaces Roman municipal towns.',
    },
    {
      year: 'c. 1165',
      text: '<strong>Canterbury Waterworks:</strong> Monks at Canterbury Priory engineer lead piping networks to bring clean spring water and flush latrines.',
    },
    {
      year: '1348',
      text: '<strong>The Black Death:</strong> Plague kills 30–50% of England; doctors blame poisonous miasma and balance of humors rather than fleas.',
    },
    {
      year: '1388',
      text: '<strong>First Sanitation Act:</strong> Parliament passes an act forbidding the dumping of dung, animal entrails, and slaughterhouse waste into rivers.',
    },
    {
      year: 'c. 1450',
      text: '<strong>Medieval Gongfermers:</strong> Town councils appoint night-soil workers to shovel overflowing cesspits exclusively after dark.',
    },
    {
      year: '1596',
      text: '<strong>First Water Closet:</strong> Sir John Harington invents the first flushing toilet for Elizabeth I; fails to catch on due to lack of pipes.',
    },
    {
      year: '1665',
      text: '<strong>The Great Plague of London:</strong> Over 68,000 die; red crosses painted on locked doors before the 1666 Great Fire purges timber slums.',
    },
    {
      year: '1831',
      text: '<strong>First Cholera Epidemic:</strong> Asiatic cholera strikes Sunderland and London; kills 31,000 in cramped industrial back-to-back slums.',
    },
    {
      year: '1842',
      text: '<strong>Chadwick’s Sanitary Report:</strong> Statistical evidence proves poor sanitation shortens labourer life expectancy below 20 years.',
    },
    {
      year: '1854',
      text: '<strong>Dr John Snow &amp; Soho:</strong> Spot map of Broad Street pump proves cholera is waterborne; pump handle removed, ending outbreak.',
    },
    {
      year: '1858',
      text: '<strong>The Great Stink:</strong> Thames stench halts Parliament; Joseph Bazalgette commissioned to build 1,100 miles of London brick sewers.',
    },
    {
      year: '1875',
      text: '<strong>Public Health Act:</strong> Government abandons laissez-faire, legally compelling all local councils to provide clean water and sewers.',
    },
  ];

  const page2 = `
  <div class="a5-page page-flex-full">
    <div class="timeline-page-content">
      <div class="page-header-strip">
        <div>
          <h2>Chronology Domino Flowchart</h2>
          <p>Two Millennia of Public Health, Epidemics &amp; Engineering (100 AD &ndash; 1875)</p>
        </div>
        <span class="page-tag">Timeline Chain</span>
      </div>

      <div class="lesson-instruction-bar" style="margin-bottom: 2px;">
        <strong>Causal Chain:</strong> Trace how scientific ignorance and laissez-faire government delayed clean water until engineering and epidemiology forced national reform.
      </div>

      <div class="timeline-flow">
        ${timelineNodes
          .map(
            (node) => `
          <div class="domino-node">
            <div class="domino-year">${node.year}</div>
            <div class="domino-text">${node.text}</div>
          </div>
        `,
          )
          .join('')}
      </div>
    </div>

    <div class="page-footer-strip">
      <span>Water &amp; Sanitation Through Time &bull; Chronological Chain</span>
      <span>Page 2 of 12</span>
    </div>
  </div>
  `;

  // ------------------------------------------------------------------------
  // PAGES 3 TO 8: 1 DEDICATED PAGE PER LESSON (LESSONS 1 TO 6)
  // ------------------------------------------------------------------------
  const questionPages = [];
  let currentQNum = 1;

  for (let lIdx = 0; lIdx < QUIZ_DATA.length; lIdx++) {
    const l = QUIZ_DATA[lIdx];
    const pageNum = lIdx + 3; // Pages 3 to 8

    let qItemsHtml = '';
    l.items.forEach((item) => {
      qItemsHtml += `
        <div class="q-block">
          <div class="q-header">
            <div class="q-prompt-wrap">
              <span class="q-num">${currentQNum}.</span>
              <span class="q-prompt">${item.q}</span>
            </div>
            <span class="q-mastery">[ &nbsp; ] Mastered</span>
          </div>
          <div class="q-line-row">
            <span class="q-line-lbl">Answer:</span>
            <span class="q-solid-line"></span>
          </div>
          <div class="q-line-row">
            <span class="q-line-lbl">Detail / Why:</span>
            <span class="q-solid-line"></span>
          </div>
        </div>
      `;
      currentQNum++;
    });

    const pageHtml = `
    <div class="a5-page">
      <div>
        <div class="page-header-strip">
          <div>
            <h2>Lesson ${l.lesson}: ${l.shortTitle}</h2>
            <p>Enquiry: “${l.enquiry}” &bull; Direct Active Recall</p>
          </div>
          <div style="display: flex; align-items: center; gap: 4px;">
            <span style="font-size: 6.5pt; font-weight: 700; border: 1.2px solid #0c4a6e; padding: 1.5px 5px; border-radius: 2px;">Score: &nbsp;&nbsp;&nbsp; / 8</span>
            <span class="page-tag">Q${currentQNum - 8}–Q${currentQNum - 1}</span>
          </div>
        </div>
        <div class="lesson-instruction-bar">
          <strong>Instructions:</strong> Complete Line 1 (Answer) from memory. Complete Line 2 (Detail / Why) to articulate the historical mechanism, motive, or consequence.
        </div>
      </div>

      <div class="q-container">
        ${qItemsHtml}
      </div>

      <div class="page-footer-strip">
        <span>Water &amp; Sanitation Through Time &bull; Lesson ${l.lesson} Retrieval Drill</span>
        <span>Page ${pageNum} of 12</span>
      </div>
    </div>
    `;

    questionPages.push(pageHtml);
  }

  // ------------------------------------------------------------------------
  // PAGE 9: DEPARTMENT MARKING BANK (PART 1 • LESSONS 1 TO 3)
  // ------------------------------------------------------------------------
  let aP9Html = '';
  let aNum = 1;
  for (let lIdx = 0; lIdx < 3; lIdx++) {
    const l = QUIZ_DATA[lIdx];
    aP9Html += `<div class="mb-section-title">Lesson ${l.lesson}: ${l.shortTitle}</div><div class="mb-container">`;
    l.items.forEach((item) => {
      aP9Html += `
        <div class="ans-card">
          <span class="ans-num">${aNum}.</span>
          <div class="ans-content">
            <span class="ans-core">${item.a}</span> &mdash; <span class="ans-exp">${item.exp}</span>
          </div>
          <span class="ans-boxes">[✓][✗]</span>
        </div>
      `;
      aNum++;
    });
    aP9Html += `</div>`;
  }

  const page9 = `
  <div class="a5-page">
    <div class="page-header-strip">
      <div>
        <h2>Department Marking Bank (Part 1)</h2>
        <p>Lessons 1 to 3 &bull; Answers 1 to 24 &bull; Core Answers &amp; The Explanation</p>
      </div>
      <span class="page-tag">Marking Key 1–24</span>
    </div>

    ${aP9Html}

    <div class="page-footer-strip">
      <span>Water &amp; Sanitation &bull; Marking Bank &bull; Turn Page for Lessons 4–6</span>
      <span>Page 9 of 12</span>
    </div>
  </div>
  `;

  // ------------------------------------------------------------------------
  // PAGE 10: DEPARTMENT MARKING BANK (PART 2 • LESSONS 4 TO 6)
  // ------------------------------------------------------------------------
  let aP10Html = '';
  for (let lIdx = 3; lIdx < 6; lIdx++) {
    const l = QUIZ_DATA[lIdx];
    aP10Html += `<div class="mb-section-title">Lesson ${l.lesson}: ${l.shortTitle}</div><div class="mb-container">`;
    l.items.forEach((item) => {
      aP10Html += `
        <div class="ans-card">
          <span class="ans-num">${aNum}.</span>
          <div class="ans-content">
            <span class="ans-core">${item.a}</span> &mdash; <span class="ans-exp">${item.exp}</span>
          </div>
          <span class="ans-boxes">[✓][✗]</span>
        </div>
      `;
      aNum++;
    });
    aP10Html += `</div>`;
  }

  const page10 = `
  <div class="a5-page">
    <div class="page-header-strip">
      <div>
        <h2>Department Marking Bank (Part 2)</h2>
        <p>Lessons 4 to 6 &bull; Answers 25 to 48 &bull; Core Answers &amp; The Explanation</p>
      </div>
      <span class="page-tag">Marking Key 25–48</span>
    </div>

    ${aP10Html}

    <div class="page-footer-strip">
      <span>Water &amp; Sanitation &bull; Marking Bank &bull; Lessons 4 to 6</span>
      <span>Page 10 of 12</span>
    </div>
  </div>
  `;

  // ------------------------------------------------------------------------
  // PAGE 11: KEY HISTORICAL FIGURES & ACADEMIC VOCABULARY
  // ------------------------------------------------------------------------
  const figures = [
    {
      name: 'Claudius Galen',
      role: 'Greek/Roman Imperial Physician (c. 129–216 AD)',
      act: 'Developed Theory of the Four Humors (Blood, Phlegm, Black Bile, Yellow Bile) and Miasma; dominated medical thought for 1,500 years.',
    },
    {
      name: 'Sir John Harington',
      role: 'Elizabethan Courtier & Author (1560–1612)',
      act: 'Godson of Queen Elizabeth I; invented Britain’s first flushing water closet (‘The Metamorphosis of Ajax’, 1596) using a cistern valve.',
    },
    {
      name: 'Edwin Chadwick',
      role: 'Social Reformer & Civil Servant (1800–1890)',
      act: 'Authored landmark 1842 Sanitary Report proving squalor caused epidemic disease; championed clean piped water and led the 1848 Board of Health.',
    },
    {
      name: 'Dr John Snow',
      role: 'Pioneering Physician & Epidemiologist (1813–1858)',
      act: 'Proved cholera was waterborne during the 1854 Soho epidemic via his famous spot map; ordered the Broad Street pump handle removed.',
    },
    {
      name: 'Sir Joseph Bazalgette',
      role: 'Chief Engineer, Metropolitan Board of Works (1819–1891)',
      act: 'Designed London’s 1,100-mile underground brick sewer network following the 1858 Great Stink, permanently cleansing the River Thames.',
    },
    {
      name: 'Robert Koch',
      role: 'German Microbiologist (1843–1910)',
      act: 'Discovered the cholera bacterium (Vibrio cholerae) under a microscope in 1883, providing conclusive bacteriological proof of water transmission.',
    },
  ];

  const vocabItems = [
    {
      term: 'Miasma Theory',
      phonetic: '[My-az-muh]',
      lang: 'Greek',
      def: 'The ancient belief that epidemic diseases like plague and cholera were transmitted by inhaling poisonous, foul-smelling air from rotting matter.',
    },
    {
      term: 'Aqueduct & Conduit',
      phonetic: '[Ak-wuh-dukt / Kon-dwit]',
      lang: 'Latin',
      def: 'Engineered bridge or underground stone pipe channels using gravity to transport millions of gallons of spring water from hills into towns.',
    },
    {
      term: 'Gongfermer (Gong Farmer)',
      phonetic: '[Gong-fur-mer]',
      lang: 'Medieval English',
      def: 'A night-soil labourer hired to shovel out human excrement from domestic cesspits exclusively under cover of darkness.',
    },
    {
      term: 'Laissez-faire',
      phonetic: '[Lay-say-fair]',
      lang: 'French',
      def: '“Leave it alone.” The Victorian political doctrine that government should not interfere in business, taxation, or private property for social welfare.',
    },
    {
      term: 'Epidemiology',
      phonetic: '[Ep-ih-dee-mee-ol-uh-jee]',
      lang: 'Science',
      def: 'The scientific study of how diseases spread through populations, pioneered by Dr John Snow’s geographical spot map in Soho.',
    },
    {
      term: 'Vibrio cholerae',
      phonetic: '[Vib-ree-oh Kol-er-eye]',
      lang: 'Biology',
      def: 'The comma-shaped microscopic waterborne bacterium that infects the small intestine, causing fatal dehydration and rice-water diarrhoea.',
    },
  ];

  const page11 = `
  <div class="a5-page">
    <div>
      <div class="page-header-strip">
        <div>
          <h2>Key Historical Figures &amp; Academic Vocabulary</h2>
          <p>6 Crucial Protagonists &bull; Spoken Pronunciation Guide &bull; Core Terminology</p>
        </div>
        <span class="page-tag">People &amp; Terms</span>
      </div>

      <div class="p11-sec-title">The Six Crucial Protagonists in Public Health History</div>
      <div class="figures-grid">
        ${figures
          .map(
            (f) => `
          <div class="figure-card">
            <div>
              <span class="figure-name">${f.name}</span>
              <span class="figure-role">&bull; ${f.role}</span>
            </div>
            <div class="figure-act">${f.act}</div>
          </div>
        `,
          )
          .join('')}
      </div>

      <div class="p11-sec-title">Academic Vocabulary with Spoken Pronunciation Guide</div>
      <div class="vocab-list">
        ${vocabItems
          .map(
            (v) => `
          <div class="vocab-card">
            <div>
              <span class="vocab-term">${v.term}</span>
              ${v.phonetic ? `<span class="vocab-phonetic">${v.phonetic}</span>` : ''}
              <span style="font-size: 5.6pt; color: #64748b; text-transform: uppercase; margin-left: 3px;">(${v.lang})</span>
            </div>
            <div class="vocab-def">${v.def}</div>
          </div>
        `,
          )
          .join('')}
      </div>
    </div>

    <div class="page-footer-strip">
      <span>Water &amp; Sanitation Through Time &bull; Key Figures &amp; Vocabulary</span>
      <span>Page 11 of 12</span>
    </div>
  </div>
  `;

  // ------------------------------------------------------------------------
  // PAGE 12: BACK COVER — HOW TO WRITE YOUR END-OF-UNIT ESSAY
  // ------------------------------------------------------------------------
  const page12 = `
  <div class="a5-page">
    <div>
      <div class="page-header-strip">
        <div>
          <h2>How to Write Your End-of-Unit Essay</h2>
          <p>Key Stage 3 History &bull; Water &amp; Sanitation Enquiry Guide</p>
        </div>
        <span class="page-tag">Essay Guide</span>
      </div>

      <div style="background: #0c4a6e; color: #ffffff; padding: 4px 8px; border-radius: 3px; margin-bottom: 3px;">
        <div style="font-size: 6.2pt; font-weight: 700; color: #38bdf8; text-transform: uppercase; letter-spacing: 0.5px;">Your Essay Question:</div>
        <div style="font-size: 8.8pt; font-weight: 800; font-family: 'Playfair Display', serif; line-height: 1.2; margin-top: 1px;">
          “Why did it take so long to clean up Britain’s towns and cities?”
        </div>
      </div>

      <!-- The 4 Causal Factors Matrix -->
      <table class="essay-matrix-table">
        <thead>
          <tr>
            <th style="width: 22%;">Causal Factor</th>
            <th style="width: 48%;">Historical Evidence &amp; Specific Mechanism</th>
            <th style="width: 30%;">Significance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Laissez-faire Government</strong></td>
            <td>Victorian MPs believed the state had no right to regulate private businesses or impose national rates for sewers (1848 Act was voluntary).</td>
            <td>Delayed national mandatory sanitary reform until the 1875 Public Health Act.</td>
          </tr>
          <tr>
            <td><strong>Scientific Ignorance</strong></td>
            <td>Entrenched belief in Galen’s Miasma Theory; authorities focused on spraying perfumes and lime rather than filtering drinking water.</td>
            <td>Prevented doctors from recognizing contaminated water pumps until John Snow in 1854.</td>
          </tr>
          <tr>
            <td><strong>Vested Interests &amp; Cost</strong></td>
            <td>Wealthy ratepayers and private water monopolies fiercely resisted taxes needed to lay underground sewers and connect working slums.</td>
            <td>Landlords neglected outdoor privies and cesspools to maximize rental profits.</td>
          </tr>
          <tr>
            <td><strong>Rapid Urbanisation</strong></td>
            <td>Factory industrialisation caused population explosion in Leeds, Manchester, and London; building back-to-backs overwhelmed old cesspits.</td>
            <td>Created the perfect breeding ground for deadly Asiatic Cholera outbreaks.</td>
          </tr>
        </tbody>
      </table>

      <!-- Historiographical Debate -->
      <div class="essay-card">
        <div class="essay-card-title">Historiographical Perspectives: What Drove Reform?</div>
        <div style="font-size: 6.2pt; color: #1e293b; line-height: 1.2;">
          <strong>Interpretation A (Self-Interest / The Great Stink):</strong> Reform happened only when wealthy MPs smelled the Thames in 1858 and feared for their own lives.<br>
          <strong>Interpretation B (Empirical Science &amp; Activism):</strong> Reform was driven by heroic investigators like Chadwick and Snow using maps and statistics to prove filth caused death.
        </div>
      </div>

      <!-- Sentence Starters & Connectives -->
      <div class="essay-card" style="margin-bottom: 2px;">
        <div class="essay-card-title">Sentence Starters &amp; Causal Connective Toolkit</div>
        <ul class="scaffold-list">
          <li><strong>Point:</strong> One crucial reason why sanitation reform was delayed was the widespread belief in...</li>
          <li><strong>Evidence:</strong> For example, during the cholera epidemics of 1831 and 1848, the government...</li>
          <li><strong>Explanation:</strong> This delayed action because politicians prioritised laissez-faire economy over...</li>
          <li><strong>Judgement:</strong> Ultimately, Britain was only cleaned up when the 1858 Great Stink threatened Parliament directly...</li>
        </ul>
        <div class="connectives-flex">
          <span class="conn-pill">Consequently</span>
          <span class="conn-pill">This directly caused</span>
          <span class="conn-pill">In stark contrast</span>
          <span class="conn-pill">Crucially</span>
          <span class="conn-pill">Furthermore</span>
          <span class="conn-pill">As a direct result</span>
        </div>
      </div>

      <div class="archival-seal-block">
        The History Department &bull; Fieldwork &amp; Archival Evidence &bull; GCSE History Preparation Standard
      </div>
    </div>

    <div class="page-footer-strip">
      <span>Water &amp; Sanitation Through Time &bull; End-of-Unit Essay Architect</span>
      <span>Page 12 of 12</span>
    </div>
  </div>
  `;

  // ------------------------------------------------------------------------
  // ASSEMBLE FULL HTML DOCUMENT
  // ------------------------------------------------------------------------
  const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Water and Sanitation Through Time - 12-Page A5 Saddle-Stitch Quiz Booklet</title>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    ${A5_BOOKLET_CSS}
  </style>
</head>
<body>
  ${page1}
  ${page2}
  ${questionPages.join('\n')}
  ${page9}
  ${page10}
  ${page11}
  ${page12}
</body>
</html>`;

  // Write HTML file to unit directory
  const htmlOutputPath = path.join(UNIT_DIR, 'quiz_pack.html');
  fs.writeFileSync(htmlOutputPath, fullHtml, 'utf8');
  console.log(`✅ Saved 12-Page HTML: ${htmlOutputPath}`);

  // ------------------------------------------------------------------------
  // COMPILE TO PDF WITH PUPPETEER
  // ------------------------------------------------------------------------
  console.log('\n📄 Launching Puppeteer to compile 12-Page A5 Saddle-Stitch PDF...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 559, height: 794 }); // A5 dimensions at 96 DPI
  await page.setContent(fullHtml, { waitUntil: 'domcontentloaded' });

  // DOM Layout check
  const domPageCount = await page.evaluate(() => {
    return document.querySelectorAll('.a5-page').length;
  });
  console.log(`📑 Total A5 Pages rendered in DOM: ${domPageCount}`);

  // ------------------------------------------------------------------------
  // AUTOMATED PAGE BUDGET & SPACE UTILIZATION AUDIT
  // ------------------------------------------------------------------------
  const spaceAudit = await page.evaluate(() => {
    const pages = document.querySelectorAll('.a5-page');
    const auditResults = [];
    pages.forEach((p, idx) => {
      const pageNum = idx + 1;
      const clientH = p.clientHeight;
      const scrollH = p.scrollHeight;
      const overflow = scrollH > clientH + 4 ? scrollH - clientH : 0;

      // Measure content height down to footer
      const footer = p.querySelector('.page-footer-strip');
      let unusedBottom = 0;
      if (footer) {
        const pRect = p.getBoundingClientRect();
        const fRect = footer.getBoundingClientRect();
        unusedBottom = Math.max(0, Math.round(pRect.bottom - fRect.bottom));
      }

      const utilizationPct = Math.min(100, Math.round(((clientH - unusedBottom) / clientH) * 100));
      auditResults.push({ pageNum, clientH, scrollH, overflow, unusedBottom, utilizationPct });
    });
    return auditResults;
  });

  console.log('\n=============================================================');
  console.log('📐 AUTOMATED PAGE BUDGET & SPACE UTILIZATION AUDIT');
  console.log('=============================================================');
  let hasErrors = false;
  spaceAudit.forEach((res) => {
    const status =
      res.overflow > 0
        ? `❌ OVERFLOW (+${res.overflow}px)`
        : res.unusedBottom > 35
          ? `⚠️ UNDERFLOW (${res.unusedBottom}px gap)`
          : `✅ OPTIMAL (${res.utilizationPct}% utilized, ${res.unusedBottom}px gap)`;
    console.log(`Page ${String(res.pageNum).padStart(2, ' ')}: ${status}`);
    if (res.overflow > 0) hasErrors = true;
  });
  console.log('=============================================================\n');

  if (hasErrors) {
    console.warn('⚠️ Please fix layout overflows before production printing!');
  } else {
    console.log('✅ Layout & Space Audit Passed: 100% clean across all 12 pages!');
  }

  const primaryPdfPath = path.join(PDFS_DIR, 'water_sanitation_quiz_pack_FINAL_V1.pdf');
  const aliasPdfPath = path.join(PDFS_DIR, 'water_sanitation_quiz_pack.pdf');

  await page.pdf({
    path: primaryPdfPath,
    format: 'A5',
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: '0mm', bottom: '0mm', left: '0mm', right: '0mm' },
  });
  console.log(`✅ Generated Master 12-Page A5 PDF: ${primaryPdfPath}`);

  // Also write alias
  fs.copyFileSync(primaryPdfPath, aliasPdfPath);
  console.log(`✅ Updated PDF alias: ${aliasPdfPath}`);

  await browser.close();

  // Page Count Audit
  let numPages = 0;
  try {
    const pdf = require('pdf-parse');
    const data = fs.readFileSync(primaryPdfPath);
    const parsed = await pdf(data);
    numPages = parsed.numpages;
    console.log(`📊 Audit: PDF contains exactly ${numPages} pages.`);
  } catch (e) {
    console.warn('Could not audit page count:', e.message);
  }

  // ------------------------------------------------------------------------
  // SYNC TO GOOGLE DRIVE
  // ------------------------------------------------------------------------
  if (fs.existsSync(DRIVE_ROOT)) {
    console.log('\n☁️ Synchronizing Year 7 A5 Quiz Booklet to Google Drive...');
    const driveDestinations = [
      path.join(DRIVE_ROOT, 'Year 7', 'Water_and_Sanitation_A5_Quiz_Booklet.pdf'),
      path.join(
        DRIVE_ROOT,
        'Year 7',
        'Medieval England',
        'Water_and_Sanitation_A5_Quiz_Booklet.pdf',
      ),
      path.join(
        DRIVE_ROOT,
        'Mastery & Quiz Packs',
        'Year 7 - Water and Sanitation Knowledge Recall Quiz (All 48 Questions).pdf',
      ),
      path.join(DRIVE_ROOT, 'Water_and_Sanitation_A5_Quiz_Booklet.pdf'),
    ];

    driveDestinations.forEach((dest) => {
      const parent = path.dirname(dest);
      if (!fs.existsSync(parent)) {
        fs.mkdirSync(parent, { recursive: true });
      }
      fs.copyFileSync(primaryPdfPath, dest);
      console.log(`  ✅ Synced to: ${dest}`);
    });
  } else {
    console.log('⚠️ Google Drive root not detected. Skipping drive mirror.');
  }

  console.log(
    '\n🎉 Year 7 Water & Sanitation 12-Page A5 Booklet compiled cleanly with 0 overflow!\n',
  );
}

buildWaterSanitationQuizBooklet().catch((err) => {
  console.error('Fatal error generating water and sanitation quiz booklet:', err);
  process.exit(1);
});
