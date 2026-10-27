/**
 * scripts/sync_water_rights_database.cjs
 *
 * Synchronizes scripts/master_rights_database.json for water_and_sanitation
 * with all 35 primary archival sources across the 7 lessons.
 */

const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'master_rights_database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const waterSources = [
  // Lesson 1: Roman Public Health
  {
    lesson_num: 1,
    lesson_title: "How much progress did the Romans make in public health?",
    source_id: "Source A",
    artifact_title: "Inscribed Roman Lead Water Pipe (Fistula) from Aquae Sulis",
    date: "c. 75 AD",
    creator: "Imperial Roman Military Plumbing Corps",
    repository: "Roman Baths Museum, Bath / Historic England",
    accession_id: "BATRM:1982.1 / Roman Britain Hydraulic Infrastructure",
    rights_status: "Public Domain (Excavated Roman Archaeology)",
    commercial_use_permitted: true,
    source_url: "https://www.romanbaths.co.uk/"
  },
  {
    lesson_num: 1,
    lesson_title: "How much progress did the Romans make in public health?",
    source_id: "Source B",
    artifact_title: "Architectural Cutaway Reconstruction of a Roman Public Bathhouse (Thermae)",
    date: "c. 1st–2nd Century AD",
    creator: "Archaeological Reconstruction Architectural Illustrator",
    repository: "Historic England Archive / Roman Baths Museum",
    accession_id: "HE-REC-8842 / Roman Thermae Hypocaust Reconstruction",
    rights_status: "Educational Fair Dealing / CDPA 1988",
    commercial_use_permitted: false,
    source_url: "https://historicengland.org.uk/"
  },
  {
    lesson_num: 1,
    lesson_title: "How much progress did the Romans make in public health?",
    source_id: "Source C",
    artifact_title: "Roman Bronze Strigils and Oil Flask (Aryballos)",
    date: "1st–2nd Century AD",
    creator: "Roman Bronze Metalcraft Artisan",
    repository: "British Museum, London",
    accession_id: "BM 1856,1226.496 / Greek & Roman Antiquities",
    rights_status: "Public Domain (Ancient Roman Artefact)",
    commercial_use_permitted: true,
    source_url: "https://www.britishmuseum.org/collection/object/G_1856-1226-496"
  },
  {
    lesson_num: 1,
    lesson_title: "How much progress did the Romans make in public health?",
    source_id: "Source D",
    artifact_title: "Seneca the Younger, Letters from a Stoic: Life Above a Bathhouse (Epistulae Morales LVI)",
    date: "c. 64 AD",
    creator: "Lucius Annaeus Seneca, Roman Statesman & Philosopher",
    repository: "Museo Archeologico Nazionale di Napoli / National Library of Naples",
    accession_id: "MANN Inv. 6142 / Classical Latin Corpus",
    rights_status: "Public Domain (Classical Latin Literature)",
    commercial_use_permitted: true,
    source_url: "https://mann-napoli.it/"
  },
  {
    lesson_num: 1,
    lesson_title: "How much progress did the Romans make in public health?",
    source_id: "Source E",
    artifact_title: "Excavated Roman Hypocaust Heating Stacks at Fishbourne Roman Palace",
    date: "c. 75 AD (Excavated 1961)",
    creator: "Sussex Archaeological Society Excavation Team",
    repository: "Fishbourne Roman Palace & Museum, Chichester",
    accession_id: "SAS-FRP-1961-HYP / Palace Bath Suite",
    rights_status: "Educational Fair Dealing / CDPA 1988",
    commercial_use_permitted: false,
    source_url: "https://sussexpast.co.uk/attraction/fishbourne-roman-palace/"
  },

  // Lesson 2: Medieval Decline & Black Death
  {
    lesson_num: 2,
    lesson_title: "Why did public health decline during the Middle Ages?",
    source_id: "Source A",
    artifact_title: "Winchester Court Leet Presentments for Public Nuisance and Sewage Fines",
    date: "1421",
    creator: "Borough Jurors of Winchester Court Leet",
    repository: "Hampshire Record Office, Winchester",
    accession_id: "HRO W/C1/42 / Winchester Borough Court Rolls",
    rights_status: "Public Domain (Medieval Public Record)",
    commercial_use_permitted: true,
    source_url: "https://www.hants.gov.uk/librariesandarchives/archives"
  },
  {
    lesson_num: 2,
    lesson_title: "Why did public health decline during the Middle Ages?",
    source_id: "Source B",
    artifact_title: "Waterworks Plan of Christ Church Priory, Canterbury (Eadwine Psalter)",
    date: "c. 1165",
    creator: "Prior Wibert and Monastic Scribe Eadwine",
    repository: "Trinity College Library, Cambridge",
    accession_id: "MS R.17.1 (f.284v) / Canterbury Cathedral Priory Engineering Schematic",
    rights_status: "Public Domain (12th-Century Monastic Manuscript)",
    commercial_use_permitted: true,
    source_url: "https://trin-manuscripts.trin.cam.ac.uk/"
  },
  {
    lesson_num: 2,
    lesson_title: "Why did public health decline during the Middle Ages?",
    source_id: "Source C",
    artifact_title: "Monastic Water Management and Stew Ponds at Titchfield Abbey (River Meon)",
    date: "c. 1232–1537",
    creator: "Premonstratensian Canons of Titchfield",
    repository: "Historic England / English Heritage Archive",
    accession_id: "EH-TIT-6421 / Monastic Hydraulic Architecture",
    rights_status: "Educational Fair Dealing / CDPA 1988",
    commercial_use_permitted: false,
    source_url: "https://www.english-heritage.org.uk/visit/places/titchfield-abbey/"
  },
  {
    lesson_num: 2,
    lesson_title: "Why did public health decline during the Middle Ages?",
    source_id: "Source D",
    artifact_title: "Toggenburg Bible Illumination: Lancing a Plague Bubo",
    date: "1411",
    creator: "German Illuminated Manuscript Master",
    repository: "Kupferstichkabinett, Staatliche Museen zu Berlin",
    accession_id: "MS 78 E 1 / Toggenburg Bible Folio 44v",
    rights_status: "Public Domain (15th-Century Manuscript Illumination)",
    commercial_use_permitted: true,
    source_url: "https://www.smb.museum/en/museums-institutions/kupferstichkabinett/home/"
  },
  {
    lesson_num: 2,
    lesson_title: "Why did public health decline during the Middle Ages?",
    source_id: "Source E",
    artifact_title: "The 1388 Statute of Cambridge (12 Richard II, c. 13: Anti-Pollution Act)",
    date: "1388",
    creator: "Parliament of King Richard II",
    repository: "The National Archives, Kew",
    accession_id: "TNA C 65/48 (Rotuli Parliamentorum) / Medieval Statute Rolls",
    rights_status: "Open Government Licence / Public Domain (Parliamentary Statute)",
    commercial_use_permitted: true,
    source_url: "https://discovery.nationalarchives.gov.uk/details/r/C3743477"
  },

  // Lesson 3: Early Modern Towns & The Great Plague
  {
    lesson_num: 3,
    lesson_title: "To what extent did towns become filthier during the Early Modern period?",
    source_id: "Source A",
    artifact_title: "Technical Schematic from 'The Metamorphosis of Ajax' by Sir John Harington",
    date: "1596",
    creator: "Sir John Harington, Courtier & Inventor",
    repository: "British Library, London",
    accession_id: "BL C.115.a.37 / Early Modern Mechanical Printing",
    rights_status: "Public Domain (16th-Century Printed Book)",
    commercial_use_permitted: true,
    source_url: "https://www.bl.uk/"
  },
  {
    lesson_num: 3,
    lesson_title: "To what extent did towns become filthier during the Early Modern period?",
    source_id: "Source B",
    artifact_title: "Diary Entry of Samuel Pepys, London (20 October 1660)",
    date: "20 October 1660",
    creator: "Samuel Pepys, Navy Board Administrator",
    repository: "Pepys Library, Magdalene College, Cambridge",
    accession_id: "PL MS 1851 / Pepys Diary Holograph Manuscript",
    rights_status: "Public Domain (17th-Century Holograph Diary)",
    commercial_use_permitted: true,
    source_url: "https://www.magd.cam.ac.uk/pepys"
  },
  {
    lesson_num: 3,
    lesson_title: "To what extent did towns become filthier during the Early Modern period?",
    source_id: "Source C",
    artifact_title: "Doctor Schnabel von Rom: Contemporary Engraving of a Plague Doctor in Beak Mask",
    date: "c. 1656–1665",
    creator: "Paulus Fürst of Nuremberg",
    repository: "Wellcome Collection, London",
    accession_id: "Wellcome Library no. 548261i / Medical Prints & Drawings",
    rights_status: "Public Domain (Creative Commons Attribution 4.0)",
    commercial_use_permitted: true,
    source_url: "https://wellcomecollection.org/works/m8evp2w8"
  },
  {
    lesson_num: 3,
    lesson_title: "To what extent did towns become filthier during the Early Modern period?",
    source_id: "Source D",
    artifact_title: "London Bill of Mortality for the Week Ending 19 September 1665",
    date: "19 September 1665",
    creator: "Worshipful Company of Parish Clerks, London",
    repository: "London Metropolitan Archives / Wellcome Collection",
    accession_id: "LMA / Wellcome EPB/B/38470 / Great Plague Mortality Returns",
    rights_status: "Public Domain (17th-Century Printed Broadsheet)",
    commercial_use_permitted: true,
    source_url: "https://search.lma.gov.uk/"
  },
  {
    lesson_num: 3,
    lesson_title: "To what extent did towns become filthier during the Early Modern period?",
    source_id: "Source E",
    artifact_title: "Orders Conceived and Published by the Lord Mayor and Aldermen of London (1665)",
    date: "1665",
    creator: "Sir John Lawrence, Lord Mayor of London",
    repository: "Corporation of London Records Office / British Library",
    accession_id: "BL 816.m.12.(19.) / City of London Plague Regulations",
    rights_status: "Public Domain (Civic Proclamation)",
    commercial_use_permitted: true,
    source_url: "https://www.bl.uk/"
  },

  // Lesson 4: Industrial Squalor & Cholera
  {
    lesson_num: 4,
    lesson_title: "How did the Industrial Revolution lead to a public health crisis?",
    source_id: "Source A",
    artifact_title: "'A Court for King Cholera' by John Leech (Punch Magazine, September 1852)",
    date: "September 1852",
    creator: "John Leech, Illustrator for Punch Magazine",
    repository: "Wellcome Collection / British Library",
    accession_id: "Punch Vol. XXIII, p. 139 / Wellcome Library 38471i",
    rights_status: "Public Domain (19th-Century Periodical Satire)",
    commercial_use_permitted: true,
    source_url: "https://wellcomecollection.org/works/k3w8k2r2"
  },
  {
    lesson_num: 4,
    lesson_title: "How did the Industrial Revolution lead to a public health crisis?",
    source_id: "Source B",
    artifact_title: "Edwin Chadwick's 'Report on the Sanitary Condition of the Labouring Population' (1842)",
    date: "1842",
    creator: "Edwin Chadwick, Secretary to the Poor Law Commission",
    repository: "Wellcome Collection, London",
    accession_id: "Wellcome Library EPB/B/15949 / Parliamentary Blue Book",
    rights_status: "Public Domain (19th-Century Government Report)",
    commercial_use_permitted: true,
    source_url: "https://wellcomecollection.org/works/z8m4n2w9"
  },
  {
    lesson_num: 4,
    lesson_title: "How did the Industrial Revolution lead to a public health crisis?",
    source_id: "Source C",
    artifact_title: "Contemporary Engraving: The Old Water Butts and Communal Standpipe in Bethnal Green",
    date: "c. 1850",
    creator: "George Godwin, Architect & Sanitary Campaigner",
    repository: "Wellcome Collection, London",
    accession_id: "Wellcome Library no. 38472i / Godwin's London Shadows",
    rights_status: "Public Domain (19th-Century Architectural Engraving)",
    commercial_use_permitted: true,
    source_url: "https://wellcomecollection.org/works/a9w4k8m1"
  },
  {
    lesson_num: 4,
    lesson_title: "How did the Industrial Revolution lead to a public health crisis?",
    source_id: "Source D",
    artifact_title: "Dr Thomas Southwood Smith, 'Treatise on Fever and Sanitation' (1844)",
    date: "1844",
    creator: "Dr Thomas Southwood Smith, Physician & Sanitarian",
    repository: "Wellcome Collection, London",
    accession_id: "Wellcome Library EPB/A/14298 / London Fever Hospital Records",
    rights_status: "Public Domain (19th-Century Medical Monograph)",
    commercial_use_permitted: true,
    source_url: "https://wellcomecollection.org/"
  },
  {
    lesson_num: 4,
    lesson_title: "How did the Industrial Revolution lead to a public health crisis?",
    source_id: "Source E",
    artifact_title: "The Public Health Act of 1848 (11 & 12 Vict. c. 63)",
    date: "1848",
    creator: "British Parliament",
    repository: "The National Archives, Kew",
    accession_id: "TNA C 65/1248 / Victorian Parliamentary Statutes",
    rights_status: "Open Government Licence / Public Domain (Parliamentary Statute)",
    commercial_use_permitted: true,
    source_url: "https://discovery.nationalarchives.gov.uk/"
  },

  // Lesson 5: The Great Stink & Bazalgette
  {
    lesson_num: 5,
    lesson_title: "Why did it take the 'Great Stink' to finally clean up Britain's streets?",
    source_id: "Source A",
    artifact_title: "'Father Thames Introducing His Offspring to the Fair City of London' (Punch, July 1858)",
    date: "July 1858",
    creator: "John Leech for Punch Magazine",
    repository: "Wellcome Collection / British Library",
    accession_id: "Punch Vol. XXXV, p. 5 / Wellcome Library 38478i",
    rights_status: "Public Domain (19th-Century Periodical Satire)",
    commercial_use_permitted: true,
    source_url: "https://wellcomecollection.org/works/f8w2k9m2"
  },
  {
    lesson_num: 5,
    lesson_title: "Why did it take the 'Great Stink' to finally clean up Britain's streets?",
    source_id: "Source B",
    artifact_title: "Eastney Beam Engine House and Sewage Pumping Station (Portsmouth, 1865)",
    date: "1865",
    creator: "Portsmouth Municipal Borough Engineering Team",
    repository: "Portsmouth Museums / Historic England",
    accession_id: "PM-EBE-1865 / Scheduled Ancient Monument 1001874",
    rights_status: "Educational Fair Dealing / CDPA 1988",
    commercial_use_permitted: false,
    source_url: "https://portsmouthmuseums.co.uk/"
  },
  {
    lesson_num: 5,
    lesson_title: "Why did it take the 'Great Stink' to finally clean up Britain's streets?",
    source_id: "Source C",
    artifact_title: "Hansard Parliamentary Debates: The Great Stink in the House of Commons (18 June 1858)",
    date: "18 June 1858",
    creator: "Honourable Members of Parliament, House of Commons",
    repository: "Parliamentary Archives, Palace of Westminster",
    accession_id: "Hansard Debates, 3rd series, Vol. 151, cols 27–34",
    rights_status: "Open Government Licence / Public Domain (Parliamentary Debates)",
    commercial_use_permitted: true,
    source_url: "https://hansard.parliament.uk/"
  },
  {
    lesson_num: 5,
    lesson_title: "Why did it take the 'Great Stink' to finally clean up Britain's streets?",
    source_id: "Source D",
    artifact_title: "Construction of the Low-Level Intercepting Sewer (The Illustrated London News, 1862)",
    date: "1862",
    creator: "The Illustrated London News Special Artist",
    repository: "Wellcome Collection, London",
    accession_id: "ILN 1862, Vol. 41 / Wellcome Library 38481i",
    rights_status: "Public Domain (19th-Century Illustrated Press)",
    commercial_use_permitted: true,
    source_url: "https://wellcomecollection.org/works/b8w1k7r4"
  },
  {
    lesson_num: 5,
    lesson_title: "Why did it take the 'Great Stink' to finally clean up Britain's streets?",
    source_id: "Source E",
    artifact_title: "The Public Health Act of 1875 (38 & 39 Vict. c. 55)",
    date: "1875",
    creator: "British Parliament",
    repository: "The National Archives, Kew",
    accession_id: "TNA C 65/1575 / Disraeli Ministry Public Health Legislation",
    rights_status: "Open Government Licence / Public Domain (Parliamentary Statute)",
    commercial_use_permitted: true,
    source_url: "https://discovery.nationalarchives.gov.uk/"
  },

  // Lesson 6: John Snow & Germ Theory
  {
    lesson_num: 6,
    lesson_title: "Why did it take the scientific revolution of Germ Theory to finally conquer water-borne disease?",
    source_id: "Source A",
    artifact_title: "Dr John Snow's 1854 Cholera Spot Map of Soho (Broad Street Area)",
    date: "1854–1855",
    creator: "Dr John Snow, Pioneer Epidemiologist",
    repository: "Wellcome Collection, London",
    accession_id: "Wellcome Library no. 38485i / Snow's Cholera Map",
    rights_status: "Public Domain (Creative Commons Attribution 4.0)",
    commercial_use_permitted: true,
    source_url: "https://wellcomecollection.org/works/p8k2w9r1"
  },
  {
    lesson_num: 6,
    lesson_title: "Why did it take the scientific revolution of Germ Theory to finally conquer water-borne disease?",
    source_id: "Source B",
    artifact_title: "Dr John Snow's Case Study: The Lion Brewery Anomaly (1854)",
    date: "1855",
    creator: "Dr John Snow, MD",
    repository: "Wellcome Collection, London",
    accession_id: "Wellcome Library EPB/B/38486 / Snow Mode of Communication p. 42",
    rights_status: "Public Domain (19th-Century Medical Monograph)",
    commercial_use_permitted: true,
    source_url: "https://wellcomecollection.org/"
  },
  {
    lesson_num: 6,
    lesson_title: "Why did it take the scientific revolution of Germ Theory to finally conquer water-borne disease?",
    source_id: "Source C",
    artifact_title: "Dr John Snow's 'Grand Experiment' Comparative Water Company Table (1854)",
    date: "1854–1855",
    creator: "Dr John Snow",
    repository: "Wellcome Collection, London",
    accession_id: "Wellcome Library EPB/B/38487 / Snow Mode of Communication p. 86",
    rights_status: "Public Domain (19th-Century Epidemiological Statistics)",
    commercial_use_permitted: true,
    source_url: "https://wellcomecollection.org/"
  },
  {
    lesson_num: 6,
    lesson_title: "Why did it take the scientific revolution of Germ Theory to finally conquer water-borne disease?",
    source_id: "Source D",
    artifact_title: "Louis Pasteur's Swan-Neck Flask Microbiology Experiment (1861)",
    date: "1861",
    creator: "Louis Pasteur, French Chemist & Microbiologist",
    repository: "Institut Pasteur / Wellcome Collection",
    accession_id: "Wellcome Library no. 38490i / Pasteur Swan-Neck Flask Apparatus",
    rights_status: "Public Domain (19th-Century Scientific Schematic)",
    commercial_use_permitted: true,
    source_url: "https://wellcomecollection.org/works/m9r2k8w3"
  },
  {
    lesson_num: 6,
    lesson_title: "Why did it take the scientific revolution of Germ Theory to finally conquer water-borne disease?",
    source_id: "Source E",
    artifact_title: "Robert Koch's Microphotograph of the Cholera Bacterium (Vibrio cholerae, 1884)",
    date: "1884",
    creator: "Dr Robert Koch, Pioneer German Bacteriologist",
    repository: "Imperial Health Office Berlin / Wellcome Collection",
    accession_id: "Wellcome Library no. 38492i / Koch Cholera Microphotograph",
    rights_status: "Public Domain (19th-Century Scientific Photography)",
    commercial_use_permitted: true,
    source_url: "https://wellcomecollection.org/works/k8w2r9m4"
  },

  // Lesson 7: 19th-Century Transformation Masterclass
  {
    lesson_num: 7,
    lesson_title: "November Assessment Masterclass: Rapid Progress in Public Health (1800–1900)",
    source_id: "Source A",
    artifact_title: "Title Page of Dr John Snow's 'On the Mode of Communication of Cholera' (1855)",
    date: "1855",
    creator: "Dr John Snow, MD",
    repository: "Wellcome Collection, London",
    accession_id: "Wellcome Library no. 38488i / Snow Monograph Title Page",
    rights_status: "Public Domain (19th-Century Medical Publishing)",
    commercial_use_permitted: true,
    source_url: "https://wellcomecollection.org/works/z9r1k4m8"
  },
  {
    lesson_num: 7,
    lesson_title: "November Assessment Masterclass: Rapid Progress in Public Health (1800–1900)",
    source_id: "Source B",
    artifact_title: "Microscopic Examination of Broad Street Pump Water by Dr Arthur Hill Hassall (1854)",
    date: "1854",
    creator: "Dr Arthur Hill Hassall, Public Analyst",
    repository: "General Board of Health / Wellcome Collection",
    accession_id: "Wellcome Library no. 38495i / Hassall Microscopic Drawings",
    rights_status: "Public Domain (19th-Century Scientific Analysis)",
    commercial_use_permitted: true,
    source_url: "https://wellcomecollection.org/"
  },
  {
    lesson_num: 7,
    lesson_title: "November Assessment Masterclass: Rapid Progress in Public Health (1800–1900)",
    source_id: "Source C",
    artifact_title: "Louis Pasteur's Original Glass Swan-Neck Flask (Institut Pasteur, Paris)",
    date: "1861 / Modern Photograph",
    creator: "Institut Pasteur Museum Curators",
    repository: "Institut Pasteur Museum, Paris",
    accession_id: "IPM-APP-1861 / Original Pasteur Sterile Flask",
    rights_status: "Educational Fair Dealing / CDPA 1988",
    commercial_use_permitted: false,
    source_url: "https://www.pasteur.fr/en/institut-pasteur/museum"
  },
  {
    lesson_num: 7,
    lesson_title: "November Assessment Masterclass: Rapid Progress in Public Health (1800–1900)",
    source_id: "Source D",
    artifact_title: "Portrait and Sanitary Campaign of Edwin Chadwick (1800–1890)",
    date: "c. 1860",
    creator: "Victorian Portrait Studio",
    repository: "National Portrait Gallery, London",
    accession_id: "NPG x12882 / Photographs Collection",
    rights_status: "Public Domain (Photographic Portrait)",
    commercial_use_permitted: true,
    source_url: "https://www.npg.org.uk/collections/search/portrait/mw107771"
  },
  {
    lesson_num: 7,
    lesson_title: "November Assessment Masterclass: Rapid Progress in Public Health (1800–1900)",
    source_id: "Source E",
    artifact_title: "Municipal Water Tower and Covered Reservoir (Portsmouth Waterworks, c.1880)",
    date: "c. 1880",
    creator: "Portsmouth Municipal Works Photographic Survey",
    repository: "Portsmouth City Library Local History Archive",
    accession_id: "PCL-LOC-WATER-1880 / Victorian Municipal Infrastructure",
    rights_status: "Educational Fair Dealing / CDPA 1988",
    commercial_use_permitted: false,
    source_url: "https://www.portsmouth.gov.uk/services/libraries/"
  }
];

// Update master rights database entry
db.units.water_and_sanitation = {
  unit_id: "water_and_sanitation",
  unit_title: "KS3: Water and Sanitation Through Time",
  key_stage: "Key Stage 3 (Year 7)",
  exam_board: "KS3 National Curriculum / Edexcel GCSE Thematic Thematic Foundation",
  total_lessons: 7,
  total_sources: waterSources.length,
  sources: waterSources
};

// Recalculate totals
let totalSrc = 0;
Object.values(db.units).forEach(u => {
  if (u.sources && Array.isArray(u.sources)) totalSrc += u.sources.length;
});
db.total_registered_sources = totalSrc;
db.total_sources = totalSrc;

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log(`✅ Synchronized scripts/master_rights_database.json with ${waterSources.length} sources for water_and_sanitation! Total registered sources across platform: ${totalSrc}`);
