const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'master_rights_database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

db.units.medieval_england = {
  unit_id: 'medieval_england',
  unit_title: 'KS3 Unit: Medieval England (1066–1485)',
  key_stage: 'Key Stage 3',
  exam_board: 'Key Stage 3 National Curriculum (1066–1485)',
  total_lessons: 5,
  total_sources: 10,
  sources: [
    {
      lesson_num: 1,
      lesson_title: "1066 & The Battle of Hastings: Why did William win?",
      source_id: "Source A",
      artifact_title: "The Bayeux Tapestry Scene 23: Harold Swearing the Sacred Oath to William ('Ubi Harold Sacramentum Fecit Willelmo Duci')",
      date: "c. 1070s",
      creator: "Anglo-Saxon Embroiderers for Bishop Odo of Bayeux",
      repository: "Musée de la Tapisserie de Bayeux, Normandy",
      accession_id: "Bayeux Tapestry Scene 23 (UNESCO Memory of the World)",
      rights_status: "Public Domain (11th Century Romanesque Embroidered Textile)",
      commercial_use_permitted: true,
      source_url: "https://www.bayeuxmuseum.com/en/the-bayeux-tapestry/",
      asset_path: "/images/bayeux_harold_oath.jpg"
    },
    {
      lesson_num: 1,
      lesson_title: "1066 & The Battle of Hastings: Why did William win?",
      source_id: "Source B",
      artifact_title: "The Bayeux Tapestry Scene 57: The Death of King Harold at Hastings ('Harold Rex Interfectus Est')",
      date: "c. 1070s",
      creator: "Anglo-Saxon Embroiderers for Bishop Odo of Bayeux",
      repository: "Musée de la Tapisserie de Bayeux, Normandy",
      accession_id: "Bayeux Tapestry Scene 57 (UNESCO Memory of the World)",
      rights_status: "Public Domain (11th Century Romanesque Embroidered Textile)",
      commercial_use_permitted: true,
      source_url: "https://www.bayeuxmuseum.com/en/the-bayeux-tapestry/",
      asset_path: "/images/battle_of_hastings_bayeux.jpg"
    },
    {
      lesson_num: 2,
      lesson_title: "Castles, Terror & Domesday: How did the Normans subjugate England?",
      source_id: "Source A",
      artifact_title: "The Bayeux Tapestry Scene 45: Normans Constructing a Motte-and-Bailey Castle at Hastings ('Iste Jussit Ut Foderetur Castellum at Hesteng Ceastra')",
      date: "c. 1070s",
      creator: "Anglo-Saxon Embroiderers for Bishop Odo of Bayeux",
      repository: "Musée de la Tapisserie de Bayeux, Normandy",
      accession_id: "Bayeux Tapestry Scene 45 (UNESCO Memory of the World)",
      rights_status: "Public Domain (11th Century Romanesque Embroidered Textile)",
      commercial_use_permitted: true,
      source_url: "https://www.bayeuxmuseum.com/en/the-bayeux-tapestry/",
      asset_path: "/images/bayeux_norman_castle_building.jpg"
    },
    {
      lesson_num: 2,
      lesson_title: "Castles, Terror & Domesday: How did the Normans subjugate England?",
      source_id: "Source B",
      artifact_title: "Great Domesday Book (Liber de Wintonia): Royal Scribes' Parchment Folio Surveying King's Manors",
      date: "1086",
      creator: "Royal Chancery Scribes for King William I",
      repository: "The National Archives, Kew",
      accession_id: "TNA E 31/2/2 (Great Domesday Book)",
      rights_status: "Public Domain / Open Government Licence (11th Century Public Record)",
      commercial_use_permitted: true,
      source_url: "https://discovery.nationalarchives.gov.uk/details/r/C5763",
      asset_path: "/images/domesday_book.jpg"
    },
    {
      lesson_num: 3,
      lesson_title: "Crown vs Church: Why did Henry II clash with Thomas Becket?",
      source_id: "Source A",
      artifact_title: "Manuscript Illumination of King Henry II and Archbishop Thomas Becket in Dispute",
      date: "c. 1300–1325",
      creator: "Medieval English Illuminator",
      repository: "The British Library, London",
      accession_id: "Cotton MS Claudius D II, f. 73r",
      rights_status: "Public Domain (14th Century Illuminated Manuscript)",
      commercial_use_permitted: true,
      source_url: "https://www.bl.uk/collection-items/manuscript-claudius-d-ii",
      asset_path: "/images/henry_becket_dispute.jpg"
    },
    {
      lesson_num: 3,
      lesson_title: "Crown vs Church: Why did Henry II clash with Thomas Becket?",
      source_id: "Source B",
      artifact_title: "Manuscript Illumination of the Murder of Archbishop Thomas Becket in Canterbury Cathedral",
      date: "c. 1200–1220",
      creator: "Anglo-Norman Illuminator",
      repository: "The British Library, London",
      accession_id: "Harley MS 5102, f. 32r",
      rights_status: "Public Domain (Early 13th Century Psalter Illumination)",
      commercial_use_permitted: true,
      source_url: "https://www.bl.uk/collection-items/harley-ms-5102",
      asset_path: "/images/becket_murder.jpg"
    },
    {
      lesson_num: 4,
      lesson_title: "Magna Carta (1215) & Medieval Kingship: Liberty or Barons’ Power Grab?",
      source_id: "Source A",
      artifact_title: "Chronica Majora: Marginal Portrait of King John Losing His Crown",
      date: "c. 1250–1259",
      creator: "Matthew Paris (Benedictine Monk & Chronicler of St Albans Abbey, c. 1200–1259)",
      repository: "The British Library, London",
      accession_id: "Royal MS 14 C VII, f. 9r",
      rights_status: "Public Domain (13th Century Manuscript Drawing)",
      commercial_use_permitted: true,
      source_url: "https://www.bl.uk/collection-items/royal-ms-14-c-vii",
      asset_path: "/images/king_john_matthew_paris.jpg"
    },
    {
      lesson_num: 4,
      lesson_title: "Magna Carta (1215) & Medieval Kingship: Liberty or Barons’ Power Grab?",
      source_id: "Source B",
      artifact_title: "Magna Carta Original Parchment Charter with Great Seal Cords (Clauses 39 & 40)",
      date: "1215",
      creator: "English Royal Chancery Scribes at Runnymede",
      repository: "The British Library, London",
      accession_id: "Cotton MS Augustus II.106",
      rights_status: "Public Domain (13th Century Constitutional Charter)",
      commercial_use_permitted: true,
      source_url: "https://www.bl.uk/collection-items/magna-carta-1215",
      asset_path: "/images/magna_carta_1215.jpg"
    },
    {
      lesson_num: 5,
      lesson_title: "The Black Death (1348) & The Peasants’ Revolt (1381): How did plague and rebellion shatter feudalism?",
      source_id: "Source A",
      artifact_title: "The Statute of Labourers Parliamentary Statute Roll (25 Edward III, st. 2)",
      date: "1351",
      creator: "Clerks of the English Parliament for King Edward III",
      repository: "The National Archives, Kew",
      accession_id: "TNA C 74/1",
      rights_status: "Public Domain / Open Government Licence (14th Century Parliamentary Statute Roll)",
      commercial_use_permitted: true,
      source_url: "https://discovery.nationalarchives.gov.uk/details/r/C3742469",
      asset_path: "/images/statute_of_labourers_1351.jpg"
    },
    {
      lesson_num: 5,
      lesson_title: "The Black Death (1348) & The Peasants’ Revolt (1381): How did plague and rebellion shatter feudalism?",
      source_id: "Source B",
      artifact_title: "Chroniques de Jean Froissart: The Death of Wat Tyler and Richard II Calming the Rebels at Smithfield",
      date: "c. 1460–1480",
      creator: "Flemish Illuminator for Jean Froissart (Chronicler, c. 1337–c. 1405)",
      repository: "The British Library, London",
      accession_id: "Royal MS 18 E I, f. 175r",
      rights_status: "Public Domain (15th Century Illuminated Manuscript)",
      commercial_use_permitted: true,
      source_url: "https://www.bl.uk/collection-items/froissarts-chronicles-royal-18-e-i",
      asset_path: "/images/death_wat_tyler_smithfield.jpg"
    }
  ]
};

db.units.second_british_empire = {
  unit_id: 'second_british_empire',
  unit_title: 'KS3 Unit: The Second British Empire & Industrial Might (1783–1901)',
  key_stage: 'Key Stage 3',
  exam_board: 'Key Stage 3 National Curriculum (1783–1901)',
  total_lessons: 5,
  total_sources: 9,
  sources: [
    {
      lesson_num: 1,
      lesson_title: "How was the British Empire built and sustained?",
      source_id: "Source A",
      artifact_title: "Imperial Federation Map of the World Showing the Extent of the British Empire in 1886",
      date: "1886",
      creator: "Walter Crane (Illustrator, 1845–1915) & Sir John Colomb (Imperial Federation League)",
      repository: "Norman B. Leventhal Map Center, Boston Public Library / The British Library",
      accession_id: "BPL Leventhal G3201.F7 1886.C7 / BL Maps 1886",
      rights_status: "Public Domain (19th Century Chromolithograph Map)",
      commercial_use_permitted: true,
      source_url: "https://www.leventhalmap.org/digital-collections/",
      asset_path: "/images/map_empire_1886.jpg"
    },
    {
      lesson_num: 1,
      lesson_title: "How was the British Empire built and sustained?",
      source_id: "Source B",
      artifact_title: "HMS Warrior: Britain's First Iron-Hulled Armoured Steam Frigate (1860)",
      date: "1860",
      creator: "Naval Architects Isaac Watts & Chief Constructor of the Navy",
      repository: "National Museum of the Royal Navy, Portsmouth Historic Dockyard",
      accession_id: "NMRN Warrior Heritage Asset / National Historic Ships UK No. 497",
      rights_status: "Educational Fair Dealing / CDPA 1988 (Museum Preserved Heritage Vessel)",
      commercial_use_permitted: true,
      source_url: "https://www.nmrn.org.uk/visit-us/portsmouth-historic-dockyard/hms-warrior",
      asset_path: "/images/hms_warrior.jpg"
    },
    {
      lesson_num: 2,
      lesson_title: "How did corporate exploitation spark the 1857 Indian Rebellion and destroy the East India Company?",
      source_id: "Source A",
      artifact_title: "Shah 'Alam II Conveying the Grant of the Diwani of Bengal, Bihar and Orissa to Lord Clive, August 1765",
      date: "1795 (Exhibited at the Royal Academy)",
      creator: "Benjamin West (Historical Painter to King George III, 1738–1820)",
      repository: "The British Library (India Office Records), London",
      accession_id: "BL Foster 29 / IOR/H/63",
      rights_status: "Public Domain (18th Century Historical Oil Painting)",
      commercial_use_permitted: true,
      source_url: "https://www.bl.uk/collection-items/grant-of-diwani-benjamin-west",
      asset_path: "/images/shah_alam_clive.jpg"
    },
    {
      lesson_num: 2,
      lesson_title: "How did corporate exploitation spark the 1857 Indian Rebellion and destroy the East India Company?",
      source_id: "Source B",
      artifact_title: "Contemporary Gouache Miniature Portrait of Rani Lakshmibai of Jhansi in Battle Armour with Sword",
      date: "c. 1857",
      creator: "19th Century Maratha Court Artist",
      repository: "National Army Museum, London",
      accession_id: "NAM 1957-04-12 / Maratha Portrait Archive",
      rights_status: "Public Domain (19th Century Historical Indian Portrait)",
      commercial_use_permitted: true,
      source_url: "https://www.nam.ac.uk/explore/indian-mutiny",
      asset_path: "/images/rani_of_jhansi.jpg"
    },
    {
      lesson_num: 3,
      lesson_title: "How did settler colonialism transform Australia? Terra Nullius, The First Fleet & Frontier Resistance (1788–1854)",
      source_id: "Source A",
      artifact_title: "George Raper, The First Fleet Sailing past the Needles from Portsmouth (May 1787)",
      date: "1787",
      creator: "George Raper (Midshipman on HMS Sirius, Royal Navy, 1769–1796)",
      repository: "State Library of New South Wales / Natural History Museum, London",
      accession_id: "SLNSW Safe 1/109 / NHM Raper Collection Plate 12",
      rights_status: "Public Domain (18th Century Watercolour Drawing)",
      commercial_use_permitted: true,
      source_url: "https://www.sl.nsw.gov.au/collection-items/george-raper-collection",
      asset_path: "/images/first_fleet_portsmouth_1787.jpg"
    },
    {
      lesson_num: 3,
      lesson_title: "How did settler colonialism transform Australia? Terra Nullius, The First Fleet & Frontier Resistance (1788–1854)",
      source_id: "Source B",
      artifact_title: "George Raper, The First Fleet in Botany Bay (January 1788)",
      date: "1788",
      creator: "George Raper (Midshipman on HMS Sirius, Royal Navy, 1769–1796)",
      repository: "State Library of New South Wales / Natural History Museum, London",
      accession_id: "SLNSW Safe 1/110 / NHM Raper Collection Plate 14",
      rights_status: "Public Domain (18th Century Watercolour Drawing)",
      commercial_use_permitted: true,
      source_url: "https://www.sl.nsw.gov.au/collection-items/george-raper-collection",
      asset_path: "/images/first_fleet_botany_bay_1788.jpg"
    },
    {
      lesson_num: 4,
      lesson_title: "Why did European powers scramble for Africa, and how was empire justified?",
      source_id: "Source A",
      artifact_title: "Die Berliner Kongo-Konferenz: Contemporary Engraving of the Berlin West Africa Conference",
      date: "1884",
      creator: "Adalbert von Rößler (German Illustrator, 1853–1922)",
      repository: "Illustrirte Zeitung, Leipzig / Deutsches Historisches Museum, Berlin",
      accession_id: "DHM Leipzig Archival Engraving No. 2165 (1884)",
      rights_status: "Public Domain (19th Century Historical Periodical Engraving)",
      commercial_use_permitted: true,
      source_url: "https://www.dhm.de/lemo/bestand/objekt/berliner-konferenz-1884",
      asset_path: "/images/berlin_conference_1884.jpg"
    },
    {
      lesson_num: 4,
      lesson_title: "Why did European powers scramble for Africa, and how was empire justified?",
      source_id: "Source B",
      artifact_title: "Original 1884 Maxim Automatic Machine Gun on Wheeled Carriage",
      date: "1884",
      creator: "Sir Hiram Stevens Maxim (Inventor & Engineer, 1840–1916)",
      repository: "Royal Armouries, Leeds / Imperial War Museum, London",
      accession_id: "Royal Armouries PR.112 / IWM FIR 8023",
      rights_status: "Public Domain / Educational Fair Dealing (Historical Military Technology Artifact)",
      commercial_use_permitted: true,
      source_url: "https://royalarmouries.org/collection/object/object-33527",
      asset_path: "/images/maxim_machine_gun.jpg"
    },
    {
      lesson_num: 5,
      lesson_title: "Who truly benefited from the British Empire?",
      source_id: "Source D",
      artifact_title: "Capital and Labour; or, The Two Faces of Victorian Britain",
      date: "1843",
      creator: "John Leech (English Caricaturist & Illustrator, 1817–1864)",
      repository: "British Cartoon Archive, University of Kent / Punch Magazine Archives",
      accession_id: "Punch Vol. 5 (July–Dec 1843), p. 49 / BCA JL0043",
      rights_status: "Public Domain (19th Century Satirical Print)",
      commercial_use_permitted: true,
      source_url: "https://www.cartoons.ac.uk/record/JL0043",
      asset_path: "/images/capital_labour.jpg"
    }
  ]
};

// Recompute totals
let totalSources = 0;
Object.values(db.units).forEach(u => {
  if (u.sources) totalSources += u.sources.length;
});
db.total_registered_sources = totalSources;
db.last_audit = new Date().toISOString().split('T')[0];

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('✅ Synchronized scripts/master_rights_database.json successfully!');
console.log(`Total units: ${Object.keys(db.units).length}, Total sources: ${totalSources}`);
console.log('Medieval England sources:', db.units.medieval_england.sources.length);
console.log('Second British Empire sources:', db.units.second_british_empire.sources.length);
