const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'scripts', 'master_rights_database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

db.units.australia.sources = [
  {
    "lesson_num": 1,
    "lesson_title": "Claiming Australia: Captain Cook, Tupaia & The Myth of Terra Nullius (1768–1770)",
    "source_id": "Source A",
    "artifact_title": "Portrait of Captain James Cook, RN",
    "date": "1775",
    "creator": "Sir Nathaniel Dance-Holland (English Painter)",
    "repository": "National Maritime Museum, Greenwich, London",
    "accession_id": "BHC2628",
    "rights_status": "Public Domain (UK Crown / 18th Century Historical Oil Painting)",
    "commercial_use_permitted": true,
    "source_url": "https://www.rmg.co.uk/collections/objects/rmgc-object-14066"
  },
  {
    "lesson_num": 1,
    "lesson_title": "Claiming Australia: Captain Cook, Tupaia & The Myth of Terra Nullius (1768–1770)",
    "source_id": "Source B",
    "artifact_title": "Manuscript Chart of Botany Bay in New South Wales",
    "date": "1770 (engraved 1773)",
    "creator": "Captain James Cook (British Royal Navy Hydrographer) & John Hawkesworth",
    "repository": "The British Library, London / Admiralty Hydrographic Office",
    "accession_id": "BL Maps *88365.(1.) / ADM 352/547",
    "rights_status": "Public Domain (UK Crown Copyright Expired — CDPA 1988 s.163)",
    "commercial_use_permitted": true,
    "source_url": "https://discovery.nationalarchives.gov.uk/details/r/C4113110"
  },
  {
    "lesson_num": 2,
    "lesson_title": "The First Fleet & The Convict Penal Colony (1783–1792)",
    "source_id": "Source A",
    "artifact_title": "Prison Hulks in Portsmouth Harbour",
    "date": "c. 1780s",
    "creator": "Louis Garneray (French Marine Painter)",
    "repository": "National Maritime Museum, Greenwich, London",
    "accession_id": "BHC1108",
    "rights_status": "Public Domain (Life of creator + 70 years)",
    "commercial_use_permitted": true,
    "source_url": "https://www.rmg.co.uk/collections/objects/rmgc-object-1108"
  },
  {
    "lesson_num": 2,
    "lesson_title": "The First Fleet & The Convict Penal Colony (1783–1792)",
    "source_id": "Source B",
    "artifact_title": "Sketch of the Settlement at Sydney Cove, Port Jackson",
    "date": "1788",
    "creator": "Francis Fowkes (Surveyor & Convict Cartographer)",
    "repository": "State Library of New South Wales, Sydney",
    "accession_id": "SLNSW Mitchell Map Collection M2/811.15/1788/1",
    "rights_status": "Public Domain (18th Century Cartographic Manuscript)",
    "commercial_use_permitted": true,
    "source_url": "https://collection.sl.nsw.gov.au/record/74VvLd5p"
  },
  {
    "lesson_num": 3,
    "lesson_title": "Frontier Warfare: Smallpox, Bennelong & Pemulwuy’s Resistance (1788–1802)",
    "source_id": "Source A",
    "artifact_title": "Portrait of Woollarawarre Bennelong in European Dress",
    "date": "c. 1798",
    "creator": "James Neagle / William Waterhouse",
    "repository": "State Library of New South Wales, Sydney",
    "accession_id": "SLNSW Call No. P1/Bennelong",
    "rights_status": "Public Domain (Late 18th Century Watercolour Profile)",
    "commercial_use_permitted": true,
    "source_url": "https://collection.sl.nsw.gov.au/record/1vZz785o"
  },
  {
    "lesson_num": 3,
    "lesson_title": "Frontier Warfare: Smallpox, Bennelong & Pemulwuy’s Resistance (1788–1802)",
    "source_id": "Source B",
    "artifact_title": "Contemporary Engraving, Bidjigal Warrior Pemulwuy",
    "date": "c. 1802",
    "creator": "Early Colonial Engraver (after Sydney Parkinson / Hawkesworth)",
    "repository": "State Library of New South Wales, Sydney",
    "accession_id": "SLNSW Mitchell Library P1/Pemulwuy",
    "rights_status": "Public Domain (Historical Engraving c. 1802)",
    "commercial_use_permitted": true,
    "source_url": "https://collection.sl.nsw.gov.au/record/9E0v5xZo"
  },
  {
    "lesson_num": 4,
    "lesson_title": "The Frontier Wars, Pastoral Expansion & The Black War (1803–1840)",
    "source_id": "Source A",
    "artifact_title": "Governor George Arthur's Proclamation to the Aborigines (Pictorial Board)",
    "date": "c. 1829–1830",
    "creator": "Attributed to Benjamin Duterrau / Surveyor General George Frankland",
    "repository": "Tasmanian Museum and Art Gallery, Hobart / State Library of NSW",
    "accession_id": "TMAG Q1988.42 / SLNSW Safe 1/14",
    "rights_status": "Public Domain (Colonial Government Proclamation Board)",
    "commercial_use_permitted": true,
    "source_url": "https://www.tmag.tas.gov.au/collections/colonial_art"
  },
  {
    "lesson_num": 4,
    "lesson_title": "The Frontier Wars, Pastoral Expansion & The Black War (1803–1840)",
    "source_id": "Source B",
    "artifact_title": "Official Report & Deposition on the Myall Creek Massacre (Letter to Magistrate E.D. Day)",
    "date": "9 July 1838",
    "creator": "William Hobbs (Station Overseer) to Police Magistrate Edward Denny Day",
    "repository": "NSW State Archives Collection / Museums of History NSW",
    "accession_id": "NRS 19437 SZ1053",
    "rights_status": "Public Domain (Official Colonial Court Record / State Archives)",
    "commercial_use_permitted": true,
    "source_url": "https://mhnsw.au/stories/convict-sydney/myall-creek-massacre/"
  },
  {
    "lesson_num": 5,
    "lesson_title": "The Gold Rush, Eureka Stockade & The Legacy of Colonisation (1851–1901)",
    "source_id": "Source A",
    "artifact_title": "Diggers Washing for Gold at Ballarat",
    "date": "1852",
    "creator": "Samuel Thomas Gill (Anglo-Australian Painter & Illustrator)",
    "repository": "National Library of Australia, Canberra",
    "accession_id": "NLA obj-135298925",
    "rights_status": "Public Domain (Published 1852 / Worldwide Public Domain)",
    "commercial_use_permitted": true,
    "source_url": "https://nla.gov.au/nla.obj-135298925"
  },
  {
    "lesson_num": 5,
    "lesson_title": "The Gold Rush, Eureka Stockade & The Legacy of Colonisation (1851–1901)",
    "source_id": "Source B",
    "artifact_title": "Swearing Allegiance to the Southern Cross, Eureka Stockade",
    "date": "1854",
    "creator": "Charles A. Doudiet (Eyewitness Canadian Gold Prospector & Artist)",
    "repository": "Art Gallery of Ballarat, Victoria",
    "accession_id": "AGB 1854.12.01",
    "rights_status": "Public Domain (Eyewitness Watercolour Sketch 1854)",
    "commercial_use_permitted": true,
    "source_url": "https://www.artgalleryofballarat.com.au/collection/"
  }
];

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('Successfully synchronized Australia sources in master_rights_database.json');
