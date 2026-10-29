const fs = require('fs');

const rightsDbPath = 'scripts/master_rights_database.json';
const db = JSON.parse(fs.readFileSync(rightsDbPath, 'utf8'));

if (!db.units.usa) {
  console.error('USA unit not found in rights db');
  process.exit(1);
}

const updates = [
  {
    asset_path: '/units/usa/assets/sources/stokely_carmichael_mississippi_1966.jpg',
    artifact_title:
      'Source C: SNCC Chairman Stokely Carmichael Speaking in Mississippi During the March Against Fear (June 1966)',
    date: '1966',
    creator: 'Associated Press / Unidentified Photographer',
    repository: 'Library of Congress Prints and Photographs Division',
    accession_id: 'USA-L7-C-RELIABILITY_PROVENANCE',
    rights_status: 'Public Domain (Published in the US without copyright notice, 1966)',
    commercial_use_permitted: true,
    source_url:
      'https://commons.wikimedia.org/wiki/File:Kwame_Ture_at_a_1966_Mississippi_press_conference.jpg',
  },
  {
    asset_path: '/units/usa/assets/sources/thich_quang_duc_self_immolation_1963.jpg',
    artifact_title:
      'Source C: The Self-Immolation of Buddhist Monk Thich Quang Duc in Saigon (11 June 1963)',
    date: '11 June 1963',
    creator: 'Malcolm Browne (Associated Press)',
    repository: 'World Press Photo Archive / Associated Press',
    accession_id: 'USA-L9-C-AUTHORS_PURPOSE',
    rights_status: 'Public Domain (Pre-1978 without copyright notice) / Educational Fair Dealing',
    commercial_use_permitted: true,
    source_url:
      'https://commons.wikimedia.org/wiki/File:Th%C3%ADch_Qu%E1%BA%A3ng_%C4%90%E1%BB%A9c_self-immolation.jpg',
  },
  {
    asset_path: '/units/usa/assets/sources/hugh_thompson_jr_1968.jpg',
    artifact_title:
      'Source A: Helicopter Pilot Warrant Officer Hugh Thompson Jr., Who Intervened to Halt the My Lai Killings (March 1968)',
    date: '1968',
    creator: 'US Army Aviation Center and School (Official US Army Photo)',
    repository: 'National Archives and Records Administration (Record Group 111)',
    accession_id: 'USA-L13-A-RELIABILITY_PROVENANCE',
    rights_status: 'Public Domain (Official Work of the US Federal Government)',
    commercial_use_permitted: true,
    source_url: 'https://commons.wikimedia.org/wiki/File:Hugh_Tompson_Jr.jpg',
  },
  {
    asset_path: '/units/usa/assets/sources/my_lai_soldier_hut_fire_1968.jpg',
    artifact_title:
      "Source B: US Army Combat Photographer Ronald L. Haeberle's Photograph of Soldiers Burning Dwellings in My Lai (16 March 1968)",
    date: '16 March 1968',
    creator: 'Ronald L. Haeberle (US Army Combat Photographer)',
    repository:
      'Peers Commission Inquiry Exhibits / National Archives (Record Group 111, Exhibit P-14)',
    accession_id: 'USA-L13-B-AUTHORS_PURPOSE',
    rights_status: 'Public Domain (Official US Army Investigative Exhibit / US Gov Work)',
    commercial_use_permitted: true,
    source_url: 'https://commons.wikimedia.org/wiki/File:Haeberlehutonfire.jpg',
  },
  {
    asset_path: '/units/usa/assets/sources/hard_hat_riot_cabinet_table_1970.jpg',
    artifact_title:
      'Source C: Construction Union Hard Hats on the White House Cabinet Table Following the Hard Hat Riots (26 May 1970)',
    date: '26 May 1970',
    creator: 'Oliver F. Atkins (White House Photo Office)',
    repository:
      'Richard Nixon Presidential Library and Museum, National Archives (NLN-WHPO-MPF-E3444)',
    accession_id: 'USA-L14-C-CROSS_REFERENCING',
    rights_status: 'Public Domain (Official Work of the US Federal Government)',
    commercial_use_permitted: true,
    source_url:
      'https://commons.wikimedia.org/wiki/File:Hard_hats_on_Nixon_cabinet_table_May_26,_1970.jpg',
  },
];

let updatedCount = 0;
let insertedCount = 0;

updates.forEach((u) => {
  const existing = db.units.usa.sources.find(
    (s) => s.asset_path === u.asset_path || s.accession_id === u.accession_id,
  );
  if (existing) {
    Object.assign(existing, u);
    updatedCount++;
  } else {
    db.units.usa.sources.push(u);
    insertedCount++;
  }
});

fs.writeFileSync(rightsDbPath, JSON.stringify(db, null, 2), 'utf8');
console.log(`Rights DB updated: ${updatedCount} updated, ${insertedCount} inserted.`);
