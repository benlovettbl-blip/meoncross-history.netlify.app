const fs = require('fs');

const db = JSON.parse(fs.readFileSync('scripts/master_rights_database.json', 'utf8'));
const sources = db.units.water_and_sanitation.sources;

// Entry 0: L1 Source A
sources[0] = {
  lesson_num: 1,
  lesson_title: "How much progress did the Romans make in public health?",
  source_id: "Source A",
  artifact_title: "Roman Lead Water Pipe (Fistula Aquaria) with Folded Seam at the Roman Baths (Aquae Sulis)",
  date: "c. AD 75–100",
  creator: "Romano-British Plumbers (Plumbarii) & Imperial Engineers",
  repository: "Roman Baths Museum, Bath / Bath & North East Somerset Heritage Collection",
  accession_id: "BATRM:1982.1 / Roman Britain Hydraulic Infrastructure",
  rights_status: "Public Domain (Excavated Roman Archaeology)",
  commercial_use_permitted: true,
  source_url: "https://www.romanbaths.co.uk/"
};

// Entry 15: L6 Source B
sources[15] = {
  lesson_num: 6,
  lesson_title: "Why did it take the scientific revolution of Germ Theory to finally conquer water-borne disease?",
  source_id: "Source B",
  artifact_title: "Dr John Snow’s Casebook on the Broad Street Brewery & Hampstead Case (Treatise on Cholera, Page 42)",
  date: "1855",
  creator: "Dr John Snow, M.D. (Printed by John Churchill, London)",
  repository: "Wellcome Collection, London",
  accession_id: "Wellcome Collection Shelfmark b28985266 (Catalogue uqa27qrt), Page 42",
  rights_status: "Public Domain Mark 1.0 (Published 1855)",
  commercial_use_permitted: true,
  source_url: "https://wellcomecollection.org/works/uqa27qrt"
};

// Entry 16: L7 Source A
sources[16] = {
  lesson_num: 7,
  lesson_title: "November Assessment Masterclass: Rapid Progress in Public Health (1800–1900)",
  source_id: "Source A",
  artifact_title: "Dr John Snow’s 'Grand Experiment' Comparative Mortality Table (Table IX, Treatise on Cholera, Page 86)",
  date: "1855",
  creator: "Dr John Snow, M.D. (Printed by John Churchill, London)",
  repository: "Wellcome Collection, London",
  accession_id: "Wellcome Collection Shelfmark b28985266 (Catalogue uqa27qrt), Table IX, Page 86",
  rights_status: "Public Domain Mark 1.0 (Published 1855)",
  commercial_use_permitted: true,
  source_url: "https://wellcomecollection.org/works/uqa27qrt"
};

// Entry 18: L7 Source C
sources[18] = {
  lesson_num: 7,
  lesson_title: "November Assessment Masterclass: Rapid Progress in Public Health (1800–1900)",
  source_id: "Source C",
  artifact_title: "Robert Koch’s Identification of the Cholera Bacillus (Bacilli Kochii) under the Microscope",
  date: "1884 (Chromolithograph c.1897)",
  creator: "W. Gummelt after Dr Robert Koch",
  repository: "Wellcome Collection, London",
  accession_id: "Wellcome Historical Medical Collections, Accession V0010305EL",
  rights_status: "Public Domain Mark 1.0 (Historical Medical Archive)",
  commercial_use_permitted: true,
  source_url: "https://wellcomecollection.org/works/ws8b2z2x"
};

fs.writeFileSync('scripts/master_rights_database.json', JSON.stringify(db, null, 2), 'utf8');
console.log('Updated scripts/master_rights_database.json successfully!');
