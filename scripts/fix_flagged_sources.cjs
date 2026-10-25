const fs = require('fs');

console.log('Fixing great_war...');
['units/great_war/data.js', 'public/data/great_war.json'].forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    const before = content;
    // Replace great_war_cover.jpg only in the context of Dreadnought source
    content = content.replace(
      /"title": "Source A \(Primary Photograph\): The Royal Navy Battleship HMS Dreadnought at Sea \(1906\)",\s*"image": "\/images\/great_war_cover\.jpg"/g,
      '"title": "Source A (Primary Photograph): The Royal Navy Battleship HMS Dreadnought at Sea (1906)",\n            "image": "/images/hms_dreadnought_1906.jpg"'
    );
    if (content !== before) {
      fs.writeFileSync(file, content, 'utf8');
      console.log('✔ Updated ' + file);
    } else {
      // Try regex replacement
      content = content.replace(
        /(HMS Dreadnought at Sea \(1906\)"[\s\S]*?"image":\s*")\/images\/great_war_cover\.jpg(")/,
        '$1/images/hms_dreadnought_1906.jpg$2'
      );
      if (content !== before) {
        fs.writeFileSync(file, content, 'utf8');
        console.log('✔ Updated ' + file + ' via regex');
      } else {
        console.log('✖ Pattern not matched in ' + file);
      }
    }
  }
});

console.log('Fixing monarchy_religion_power...');
['units/monarchy_religion_power/data.js', 'public/data/monarchy_religion_power.json'].forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    const before = content;
    content = content.split('/images/covers/unit_crown_parliament_revolution.jpg').join('/images/battle_of_naseby_1645.jpg');
    if (content !== before) {
      fs.writeFileSync(file, content, 'utf8');
      console.log('✔ Updated ' + file);
    } else {
      console.log('✖ Pattern not matched in ' + file);
    }
  }
});

console.log('Fixing cme_new...');
['units/cme_new/data.js', 'public/units/cme_new/data.js', 'public/data/cme_new.json'].forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    const before = content;
    content = content.split('/units/cme_new/assets/rabinovich_cover.png').join('/units/cme_new/assets/rabin_peace_rally_1995.jpg');
    if (content !== before) {
      fs.writeFileSync(file, content, 'utf8');
      console.log('✔ Updated ' + file);
    } else {
      console.log('✖ Pattern not matched in ' + file);
    }
  }
});

console.log('Updating master_rights_database.json...');
const mdbPath = 'scripts/master_rights_database.json';
const mdb = JSON.parse(fs.readFileSync(mdbPath, 'utf8'));

if (mdb.units && mdb.units.cme_new && mdb.units.cme_new.sources) {
  const rabinSrc = mdb.units.cme_new.sources.find(s => s.lesson_num === 12 && s.source_id === 'Source D');
  if (rabinSrc) {
    rabinSrc.asset_path = '/units/cme_new/assets/rabin_peace_rally_1995.jpg';
    rabinSrc.creator = 'Dan Hadani Collection / Israel Press and Photo Agency (IPPA)';
    rabinSrc.repository = 'National Library of Israel (NNL_ARCHIVE_AL990040385340205171)';
    rabinSrc.rights_status = 'Creative Commons Attribution 4.0 International (CC BY 4.0)';
    rabinSrc.source_url = 'https://www.nli.org.il/he/images/NNL_ARCHIVE_AL990040385340205171/NLI';
    console.log('✔ Updated Rabin entry in master_rights_database.json');
  }
}

if (mdb.units && mdb.units.great_war && mdb.units.great_war.sources) {
  let dreadSrc = mdb.units.great_war.sources.find(s => s.artifact_title && s.artifact_title.includes('Dreadnought'));
  if (!dreadSrc) {
    mdb.units.great_war.sources.push({
      lesson_num: 3,
      lesson_title: 'The Anglo-German Naval Arms Race & HMS Dreadnought (1898–1914)',
      source_id: 'Source A',
      artifact_title: 'The Royal Navy Battleship HMS Dreadnought Underway at Sea (1906)',
      date: '1906',
      creator: 'Official US Navy / Royal Navy Photographic Record',
      repository: 'Naval History and Heritage Command (NH 61017) / Imperial War Museum',
      accession_id: 'NH 61017',
      rights_status: 'Public Domain (Official Government Record / Term Expired)',
      commercial_use_permitted: true,
      source_url: 'https://www.history.navy.mil/our-collections/photography/numerical-list-of-images/nhhc-series/nh-series/NH-61000/NH-61017.html',
      asset_path: '/images/hms_dreadnought_1906.jpg'
    });
    console.log('✔ Added HMS Dreadnought to great_war in master_rights_database.json');
  } else {
    dreadSrc.asset_path = '/images/hms_dreadnought_1906.jpg';
  }
}

if (mdb.units && mdb.units.monarchy_religion_power && mdb.units.monarchy_religion_power.sources) {
  let nasebySrc = mdb.units.monarchy_religion_power.sources.find(s => s.artifact_title && s.artifact_title.includes('Naseby'));
  if (!nasebySrc) {
    mdb.units.monarchy_religion_power.sources.push({
      lesson_num: 4,
      lesson_title: 'The Civil War, Regicide & The Bill of Rights (1642–1689)',
      source_id: 'Source B',
      artifact_title: 'The Battle of Naseby (14 June 1645) Hand-Coloured Copper Engraving',
      date: '1645',
      creator: 'John Streater / Contemporary 17th-Century Engraver',
      repository: 'National Army Museum Collection, London (NAM. 1963-09-86-1)',
      accession_id: 'NAM. 1963-09-86-1',
      rights_status: 'Public Domain (Created 1645 / Term Expired)',
      commercial_use_permitted: true,
      source_url: 'https://collection.nam.ac.uk/',
      asset_path: '/images/battle_of_naseby_1645.jpg'
    });
    console.log('✔ Added Battle of Naseby to monarchy_religion_power in master_rights_database.json');
  }
}

fs.writeFileSync(mdbPath, JSON.stringify(mdb, null, 2), 'utf8');
console.log('✔ Saved master_rights_database.json');
