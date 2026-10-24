const fs = require('fs');
const path = require('path');

const metaPath = path.join(__dirname, 'components', 'medicine_textbook_metadata.cjs');
let metaContent = fs.readFileSync(metaPath, 'utf8');

const CARDS_DATA = {
  medieval: `    enquiryCards: [
      {
        num: '01',
        title: 'Supernatural & Religious Explanations of Disease',
        pages: 'pp. 3–4',
        question: 'Why did the Catholic Church hold an unshakeable monopoly over beliefs?',
        b1: '<strong>Ecclesiastical Monopoly:</strong> Catholic Church controlled education, universities, and medical licensing, enforcing doctrine that illness was divine retribution for sin.',
        b2: '<strong>Astrological Alignment:</strong> 1345 planetary conjunction of Saturn, Jupiter, and Mars in Aquarius blamed for corrupting air and bodily humours.',
        b3: '<strong>Galenic Teleology:</strong> Galen’s belief in a single divine Creator adopted as Church orthodoxy; questioning classical doctrine condemned as heresy.'
      },
      {
        num: '02',
        title: 'Rational Explanations: Galen & The Four Humours',
        pages: 'pp. 5–6',
        question: 'How did the Four Humours provide a complete explanation for illness?',
        b1: '<strong>Humoural Equilibrium:</strong> Health required balancing Blood, Phlegm, Yellow Bile, and Black Bile, linked to seasons and elemental qualities.',
        b2: '<strong>Theory of Opposites:</strong> Galen extended Hippocrates by treating humoural excess with opposing qualities (e.g. cold phlegm treated with hot peppers).',
        b3: '<strong>Miasma Theory:</strong> Rotting organic matter and swamp vapors believed to produce foul airborne miasma that disrupted internal humoural balance.'
      },
      {
        num: '03',
        title: 'Approaches to Treatment & Prevention: Bleeding & Purging',
        pages: 'pp. 7–8',
        question: 'Why did standard treatments frequently endanger the lives of patients?',
        b1: '<strong>Phlebotomy & Purging:</strong> Bloodletting via vein incision, cupping, or leeches guided by the Zodiac Man (Homo Signorum); violent emetics and laxatives.',
        b2: '<strong>Religious Penitence:</strong> Confession, pilgrimages to holy shrines, prayer to patron saints, and wearing religious amulets to appease God.',
        b3: '<strong>Miasma Countermeasures:</strong> Carrying pomanders stuffed with sweet herbs, burning aromatic incense, and ringing church bells to clear foul air.'
      },
      {
        num: '04',
        title: 'Medical Care Providers & Monastic Hospitals: Care Not Cure',
        pages: 'pp. 9–10',
        question: 'How did social hierarchy and the Church shape medical care providers?',
        b1: '<strong>Physicians & Barber-Surgeons:</strong> University-trained physicians examined urine charts for the rich; barber-surgeons performed bloodletting and minor surgery.',
        b2: '<strong>Monastic Hospitals:</strong> Run by monks and nuns offering warmth, shelter, and prayer ("care not cure"); infectious and terminal patients strictly excluded.',
        b3: '<strong>Wise Women & Apothecaries:</strong> Local herbalists provided traditional folk remedies in villages; apothecaries mixed herbal recipes and charms.'
      },
      {
        num: '05',
        title: 'Case Study: Dealing with the Black Death (1348–1349)',
        pages: 'pp. 11–12',
        question: 'Why were medieval communities and authorities powerless to stop plague?',
        b1: '<strong>Arrival & Catastrophic Toll:</strong> Plague landed at Melcombe Regis in 1348, wiping out 30% to 45% of England’s total population within eighteen months.',
        b2: '<strong>Desperate Treatments:</strong> Strapping live chickens to buboes, lancing swellings with hot irons, and public self-flagellation in city streets.',
        b3: '<strong>Civic Failure:</strong> Quarantine attempts failed; authorities dug mass plague pits, shut city gates, but lacked understanding of flea or rat vectors.'
      },
      {
        num: '06',
        title: 'Thematic Matrix: Longitudinal Factors & Synthesis',
        pages: 'pp. 2–11',
        question: 'Which historical mechanisms dominated medicine across the Middle Ages?',
        b1: '<strong>The Catholic Church:</strong> Maintained an absolute institutional monopoly on knowledge; preserved Galen’s texts while strictly forbidding human dissection.',
        b2: '<strong>Continuity & Orthodoxy:</strong> Humoural balancing and miasma theory created complete intellectual continuity, preventing any change in clinical therapy.',
        b3: '<strong>Government & War:</strong> Weak royal government played minimal public health role beyond emergency Black Death quarantines and minor town ordinances.'
      }
    ],`,

  renaissance: `    enquiryCards: [
      {
        num: '01',
        title: 'The New Spirit of Enquiry: Humanism & The Royal Society',
        pages: 'pp. 3–4',
        question: 'How did printing and empirical science challenge 1,500 years of orthodoxy?',
        b1: '<strong>Renaissance Humanism:</strong> Rediscovery of original classical Greek texts encouraged scholars to question medieval translations and observe nature directly.',
        b2: '<strong>The Printing Press (c1440):</strong> Gutenberg’s moveable metal type allowed rapid, exact copying of medical diagrams, completely bypassing Church scriptoria.',
        b3: '<strong>The Royal Society (1660):</strong> Founded in London under royal charter with the motto Nullius in Verba ("Take nobody\'s word for it"), publishing scientific papers.'
      },
      {
        num: '02',
        title: 'Thomas Sydenham & The Art of Bedside Observation (1676)',
        pages: 'pp. 5–6',
        question: 'How did Sydenham\'s focus on direct observation challenge traditional practice?',
        b1: '<strong>The English Hippocrates:</strong> Refused to rely on classical textbooks; observed patients closely at bedside and took meticulous daily clinical notes.',
        b2: '<strong>Classification of Diseases:</strong> Argued diseases were distinct species that could be classified like plants; diagnosed scarlet fever as distinct from measles.',
        b3: '<strong>Empirical Prescriptions:</strong> Prescribed cinchona bark (quinine) for malaria, iron for anaemia, and fresh air/light blankets for smallpox fevers.'
      },
      {
        num: '03',
        title: 'Andreas Vesalius & The Anatomical Revolution (1543)',
        pages: 'pp. 7–8',
        question: 'Why did Andreas Vesalius succeed in overturning Galenic authority?',
        b1: '<strong>Direct Human Dissection:</strong> Professor of Surgery at Padua who conducted human dissections himself rather than delegating cutting to barber-surgeons.',
        b2: '<strong>De Humani Corporis Fabrica (1543):</strong> Landmark text with accurate anatomical plates by Titian’s workshop, correcting over 200 of Galen’s anatomical errors.',
        b3: '<strong>Overturning Dogma:</strong> Proved Galen dissected animals; proved the human lower jaw was one single bone and the cardiac septum had no invisible pores.'
      },
      {
        num: '04',
        title: 'William Harvey & The Circulation of the Blood (1628)',
        pages: 'pp. 9–10',
        question: 'Why did Harvey\'s discovery of circulation meet fierce medical resistance?',
        b1: '<strong>Calculated Mechanical Output:</strong> Proved mathematically that the liver could not produce the immense volume of blood pumped through the heart each hour.',
        b2: '<strong>One-Way Valves & Dissection:</strong> Dissected cold-blooded animals; used arm tourniquets to prove veins have one-way valves pumping blood to the heart.',
        b3: '<strong>De Motu Cordis (1628):</strong> Disproved Galen\'s theory that blood was consumed by tissues; took over 30 years for his circulation theory to be accepted.'
      },
      {
        num: '05',
        title: 'Continuity in Treatment & The Great Plague of London (1665)',
        pages: 'pp. 11–12',
        question: 'Why did the Great Plague reveal the severe limits of Renaissance progress?',
        b1: '<strong>Urban Catastrophe:</strong> Struck London in summer 1665, killing over 100,000 people (nearly 20% of the city’s population) within seven months.',
        b2: '<strong>Persistent Superstitions:</strong> Quack doctors sold useless plague waters; people smoked tobacco to ward off miasma and bled patients, continuing medieval treatments.',
        b3: '<strong>Stricter Civic Quarantine:</strong> Mayoral watchmen locked infected houses for 28 days with red crosses ("Lord Have Mercy Upon Us"); mass burial pits outside city walls.'
      },
      {
        num: '06',
        title: 'Thematic Matrix: Longitudinal Factors & Synthesis',
        pages: 'pp. 2–11',
        question: 'How far did anatomical revolution translate into medical treatment?',
        b1: '<strong>Science & Technology:</strong> The printing press, microscopes, and Royal Society enabled rapid international dissemination of empirical discoveries.',
        b2: '<strong>The Gap Between Anatomy and Cure:</strong> Despite Vesalius and Harvey transforming anatomy and physiology, everyday bedside treatments remained medieval.',
        b3: '<strong>Weak Royal Intervention:</strong> Charles II provided royal patronage to science but national government still provided zero public health funding.'
      }
    ],`,

  '18th_19th': `    enquiryCards: [
      {
        num: '01',
        title: 'Ideas on Causes: Germ Theory & Microbe Hunters',
        pages: 'pp. 3–4',
        question: 'Why did it take two decades for British doctors to accept Germ Theory?',
        b1: '<strong>Pasteur\'s Germ Theory (1861):</strong> Louis Pasteur proved microorganisms caused alcohol fermentation, disproving spontaneous generation; published Germ Theory.',
        b2: '<strong>Robert Koch’s Staining:</strong> Developed agar jelly plates, methyl violet dyes, and photomicroscopy to identify specific bacteria: anthrax (1876) and TB (1882).',
        b3: '<strong>British Establishment Resistance:</strong> Prominent doctors like Charlton Bastian fiercely defended spontaneous generation until Tyndall and Lister proved airborne germs.'
      },
      {
        num: '02',
        title: 'Approaches to Prevention: Jenner & The Smallpox Vaccine',
        pages: 'pp. 5–6',
        question: 'Why did Edward Jenner’s vaccine face ferocious opposition?',
        b1: '<strong>Variolation Dangers:</strong> Traditional inoculation using live smallpox was expensive, dangerous, and frequently triggered secondary fatal epidemics.',
        b2: '<strong>The Cowpox Experiment (1796):</strong> Jenner inoculated James Phipps with cowpox pus from Sarah Nelmes, then exposed him to smallpox; immunity was proven.',
        b3: '<strong>Compulsory Vaccination (1853):</strong> British Parliament banned variolation (1840) and made infant smallpox vaccination compulsory in 1853, overcoming anti-vaccine riots.'
      },
      {
        num: '03',
        title: 'Hospital Care: Florence Nightingale & The Sanitary Revolution',
        pages: 'pp. 7–8',
        question: 'How did Florence Nightingale transform British hospital environments?',
        b1: '<strong>Scutari Hospital (1854):</strong> Crimean War mortality reduced from 42% to 2% through ventilation, clean water, scrubbed wards, and fresh bandages.',
        b2: '<strong>Notes on Nursing (1859):</strong> Nightingale established nursing as a professional, respectable medical career; founded the Nightingale Training School at St Thomas\'.',
        b3: '<strong>Pavilion Hospital Architecture:</strong> Designed hospitals with high ceilings, large windows, and separate pavilion wards to eliminate stale air and hospital gangrene.'
      },
      {
        num: '04',
        title: 'The Surgical Revolution: Simpson, Lister & Antiseptics',
        pages: 'pp. 9–10',
        question: 'Why did anaesthetics initially make surgical operations more dangerous?',
        b1: '<strong>Chloroform Anaesthesia (1847):</strong> James Simpson discovered chloroform; Queen Victoria used it in childbirth (1853), overcoming moral opposition to pain relief.',
        b2: '<strong>The Black Period of Surgery:</strong> Pain-free surgery encouraged deeper operations, but infection and gangrene spiked due to unsterilized coats and instruments.',
        b3: '<strong>Carbolic Acid Spray (1865):</strong> Joseph Lister applied Pasteur’s Germ Theory to surgery, spraying carbolic acid and slashing surgical mortality from 46% to 15%.'
      },
      {
        num: '05',
        title: 'Public Health & Cholera: John Snow & The 1875 Act',
        pages: 'pp. 11–12',
        question: 'Why did the British government abandon laissez-faire to pass the 1875 Act?',
        b1: '<strong>John Snow & Broad Street (1854):</strong> Mapped 500 cholera deaths around the Broad Street pump, proving waterborne transmission rather than airborne miasma.',
        b2: '<strong>Bazalgette\'s London Sewers:</strong> Following the Great Stink (1858), Sir Joseph Bazalgette built 1,300 miles of brick sewers, diverting 420 million gallons of waste daily.',
        b3: '<strong>Public Health Act (1875):</strong> Abandoned laissez-faire; compelled all local town councils to provide clean piped water, sewers, street lighting, and food inspectors.'
      },
      {
        num: '06',
        title: 'Thematic Matrix: Longitudinal Factors & Synthesis',
        pages: 'pp. 2–11',
        question: 'Why did the 19th century achieve the greatest breakthroughs in medicine?',
        b1: '<strong>Science & Industrial Microbiology:</strong> Precision microscopes, chemical dyes, and laboratory culture plates conquered spontaneous generation.',
        b2: '<strong>Democratic Reform & State Intervention:</strong> The Reform Acts gave working-class men the vote, compelling politicians to abandon laissez-faire for compulsory sanitation.',
        b3: '<strong>Key Individuals:</strong> Pasteur, Koch, Jenner, Nightingale, Simpson, Lister, Snow, and Bazalgette systematically revolutionized diagnostics, surgery, and urban hygiene.'
      }
    ],`,

  modern: `    enquiryCards: [
      {
        num: '01',
        title: 'Ideas on Causes: Genetics, DNA & The Human Genome',
        pages: 'pp. 3–4',
        question: 'How did unlocking the double helix revolutionize understanding of causes?',
        b1: '<strong>Double Helix Discovery (1953):</strong> Francis Crick, James Watson, Rosalind Franklin, and Maurice Wilkins discovered the molecular structure of DNA.',
        b2: '<strong>Human Genome Project (1990–2003):</strong> International scientific consortium that successfully mapped all 3 billion chemical base pairs in human DNA.',
        b3: '<strong>Genetic Diagnosis & Therapy:</strong> Identified hereditary root causes of cystic fibrosis, Down\'s syndrome, and breast cancer genes (BRCA1 and BRCA2).'
      },
      {
        num: '02',
        title: 'Lifestyle Factors & Advanced Diagnostic Technologies',
        pages: 'pp. 5–6',
        question: 'How did lifestyle diseases and scanning transform 20th-century medicine?',
        b1: '<strong>Lifestyle Pathology:</strong> Recognition that smoking, alcohol, poor diet, and physical inactivity cause coronary heart disease, diabetes, and cancers.',
        b2: '<strong>Advanced Medical Imaging:</strong> Diagnostic revolution via mobile X-rays, ultrasound (1950s), CT scans (Godfrey Hounsfield 1972), and MRI scanners (1970s).',
        b3: '<strong>Point-of-Care Diagnostics:</strong> Blood sugar monitors, endoscopes, and rapid genetic sequencing enabling early micro-level detection before symptoms escalate.'
      },
      {
        num: '03',
        title: 'Magic Bullets, High-Tech Treatments & The NHS (1948)',
        pages: 'pp. 7–8',
        question: 'How did synthetic magic bullets and the NHS dismantle medical inequality?',
        b1: '<strong>Chemical Magic Bullets:</strong> Paul Ehrlich synthesized Salvarsan 606 (1909) for syphilis; Gerhard Domagk discovered Prontosil (1932) for puerperal sepsis.',
        b2: '<strong>Foundation of the NHS (1948):</strong> Launched by Health Minister Aneurin Bevan, establishing free healthcare at the point of delivery based on clinical need.',
        b3: '<strong>High-Tech Surgery:</strong> Heart transplants (Christiaan Barnard 1967), hip replacements (John Charnley), keyhole laparoscopic surgery, and robotic systems.'
      },
      {
        num: '04',
        title: 'Case Study: The Antibiotic Revolution & Penicillin',
        pages: 'pp. 9–10',
        question: 'How did an accidental laboratory mould transform into a wonder drug?',
        b1: '<strong>Fleming\'s Discovery (1928):</strong> Alexander Fleming accidentally noticed penicillium notatum mould destroying staphylococcus bacteria at St Mary\'s Hospital, London.',
        b2: '<strong>Florey & Chain\'s Extraction (1938–1941):</strong> Purified unstable penicillin at Oxford University; successfully tested on policeman Albert Alexander in 1941.',
        b3: '<strong>US Mass Production (WWII):</strong> US pharmaceutical factories mass-produced penicillin for D-Day (1944), saving thousands of Allied soldiers and sparking modern antibiotics.'
      },
      {
        num: '05',
        title: 'Case Study: Public Health & The Fight Against Lung Cancer',
        pages: 'pp. 11–12',
        question: 'How did the battle against lung cancer drive modern oncology?',
        b1: '<strong>Epidemiological Proof (1950):</strong> Sir Richard Doll and Austin Bradford Hill proved the direct causal connection between cigarette smoking and lung cancer.',
        b2: '<strong>Government Public Health Laws:</strong> Banned cigarette TV advertising (1965), introduced mandatory packet warnings, and banned smoking in public indoor venues (2007).',
        b3: '<strong>Advanced Oncology:</strong> Radiotherapy (linear accelerators), chemotherapy, immunotherapy, and low-dose CT screening improving early detection and survival.'
      },
      {
        num: '06',
        title: 'Thematic Matrix: Longitudinal Factors & Synthesis',
        pages: 'pp. 2–11',
        question: 'How did universal healthcare and molecular biology redefine human life?',
        b1: '<strong>Welfare State & Government:</strong> The post-war welfare consensus made national health a central state responsibility, ending Victorian medical inequality.',
        b2: '<strong>Science, Technology & Industry:</strong> Pharmaceutical corporations, nuclear medicine, and international genome databases scaled treatments to the global population.',
        b3: '<strong>Modern Challenges:</strong> Antibiotic resistance (superbugs like MRSA), aging populations with complex chronic conditions, and astronomical costs of novel therapies.'
      }
    ],`,

  western_front: `    pageCount: 16,
    enquiryCards: [
      {
        num: '01',
        title: 'The Theatre of War: British Sector & Trench Systems',
        pages: 'pp. 3–4',
        question: 'How did terrain and trench architecture dictate surgical survival?',
        b1: '<strong>Topography & Artillery:</strong> Passchendaele ridge German observation dominance; concentric artillery bombardment of Ypres Salient; chalk tunnel networks of Arras.',
        b2: '<strong>Trench Anatomy & Blast Containment:</strong> Zigzag communications trenches, frontline firebays, traverse parapets, and duckboard drainage sumps.',
        b3: '<strong>Subterranean Care:</strong> Thompson\'s Cave at Arras: bombproof 700-bed hospital with electric lighting, piped water & operating theatres.'
      },
      {
        num: '02',
        title: 'The Trench Environment: Mud, Vermin & Illnesses',
        pages: 'pp. 5–6',
        question: 'How did physical conditions produce mass medical casualties?',
        b1: '<strong>Trench Foot & Gangrene:</strong> Freezing mud & blood constriction; prevented via mandatory daily whale oil rub inspections and buddy-system dry sock relays.',
        b2: '<strong>Vermin & Trench Fever:</strong> Body lice transmitting pyrexia managed via mobile delousing stations, fumigation wagons, and steam sterilizers.',
        b3: '<strong>Psychological Trauma:</strong> Shell Shock (NYDN) managed close to frontlines to prevent hospitalisation via the Charles Myers Salmon Protocol.'
      },
      {
        num: '03',
        title: 'Battlefield Trauma: Artillery Shrapnel, Infection & Gas',
        pages: 'pp. 7–8',
        question: 'Why did industrialised weapons and soil induce fatal sepsis?',
        b1: '<strong>High-Explosive Shrapnel:</strong> Artillery blasting jagged casing metal and soiled uniform wool deep into flesh; Brodie helmets (1915) cutting head trauma by 75%.',
        b2: '<strong>Soil Microbiology & Gas Gangrene:</strong> Manured Flanders clay harboring lethal anaerobic bacteria (clostridium perfringens); urgent tetanus antitoxin.',
        b3: '<strong>Chemical Warfare:</strong> Chlorine gas asphyxiation (1915), Phosgene lung edema, and Mustard Gas chemical burns (1917); Small Box Respirators (1916).'
      },
      {
        num: '04',
        title: 'Chain of Evacuation: Stretcher Bearers to CCS Triage',
        pages: 'pp. 9–10',
        question: 'How did the RAMC race against the 12-hour surgical window?',
        b1: '<strong>Forward Relays:</strong> Stretcher bearer relays (teams of 4–8 men) hauling casualties through waist-deep mud to Regimental Aid Posts and Dressing Stations.',
        b2: '<strong>CCS Triage & Immediate Surgery:</strong> Casualty Clearing Stations performing emergency operations within 12 hours to prevent septic peritonitis.',
        b3: '<strong>Specialised Transport:</strong> Motor ambulance convoys, heated multi-ward steam hospital trains, and smooth canal barge flotillas to coastal Base Hospitals.'
      },
      {
        num: '05',
        title: 'Surgical Breakthroughs: Thomas Splint & Antiseptics',
        pages: 'pp. 11–12',
        question: 'How did mechanical traction and wound irrigation save lives?',
        b1: '<strong>The Thomas Splint (1915):</strong> Rigid skeletal traction immobilizing compound femur fractures, slashing battlefield mortality from 80% to under 20%.',
        b2: '<strong>Carrel-Dakin Technique:</strong> Continuous sodium hypochlorite antiseptic irrigation flushing deep recesses; radical debridement of necrotic flesh.',
        b3: '<strong>Mobile Radiography:</strong> Vehicle-powered mobile X-ray vans locating shrapnel fragments and guided bullets before surgery.'
      },
      {
        num: '06',
        title: 'Lifesaving Innovations: Blood Banks & Reconstruction',
        pages: 'pp. 13–14',
        question: 'How did massive trauma compel modern surgical specialties?',
        b1: '<strong>Preserved Blood Transfusions:</strong> Sodium citrate & glucose storage allowing Oswald Robertson to build the world\'s first mobile blood depot at Cambrai (1917).',
        b2: '<strong>Brain Surgery:</strong> Harvey Cushing’s pioneered local anaesthesia techniques, silver clip haemostasis, and electromagnets extracting cranial shrapnel.',
        b3: '<strong>Plastic Reconstruction:</strong> Harold Gillies and the revolutionary "tube pedicle" vascular skin flap technique at Queen’s Hospital, Sidcup, restoring facial trauma.'
      }
    ],`,
};

// Insert enquiryCards before specMatrix in each era
metaContent = metaContent.replace(
  /(medieval:\s*\{[\s\S]*?coverSubtitle:[^\n]*\n)/,
  `$1${CARDS_DATA.medieval}\n`,
);
metaContent = metaContent.replace(
  /(renaissance:\s*\{[\s\S]*?coverSubtitle:[^\n]*\n)/,
  `$1${CARDS_DATA.renaissance}\n`,
);
metaContent = metaContent.replace(
  /('18th_19th':\s*\{[\s\S]*?coverSubtitle:[^\n]*\n)/,
  `$1${CARDS_DATA['18th_19th']}\n`,
);
metaContent = metaContent.replace(
  /(modern:\s*\{[\s\S]*?coverSubtitle:[^\n]*\n)/,
  `$1${CARDS_DATA.modern}\n`,
);
metaContent = metaContent.replace(
  /(western_front:\s*\{[\s\S]*?coverSubtitle:[^\n]*\n)([\s\S]*?pageCount:\s*14,)/,
  `$1${CARDS_DATA.western_front}`,
);

fs.writeFileSync(metaPath, metaContent, 'utf8');
console.log(
  'Successfully updated medicine_textbook_metadata.cjs with enquiryCards for all 5 eras!',
);
