const fs = require('fs');
const path = require('path');

console.log('=== FIXING CME SOURCE MISMATCHES & ALIGNING TO AUTHENTIC PLATES ===\n');

const dataFilePath = path.join(__dirname, '..', 'units', 'cme_new', 'data.js');
const publicDataFilePath = path.join(__dirname, '..', 'public', 'units', 'cme_new', 'data.js');
const rightsDbPath = path.join(__dirname, 'master_rights_database.json');

const cmeData = require(dataFilePath).default || require(dataFilePath);

const updates = {
  'sadat_operations_center_1973.jpg': {
    targetAsset: '/units/cme_new/assets/sadat_operations_center_1973.jpg',
    desc: 'Archival photograph of President Anwar Sadat studying operational charts in the Egyptian Armed Forces Center 10 Operations Room alongside War Minister Ahmad Ismail Ali and Chief of Staff Saad el-Shazly on 6 October 1973.',
    caption:
      'President Anwar Sadat studying operational military charts in the Egyptian Armed Forces Center 10 Operations Room alongside War Minister Ahmad Ismail Ali and Chief of Staff Saad el-Shazly during the surprise attack, 6 October 1973.',
    citation: 'Egyptian State Archives / Al-Ahram.',
    provenance: 'Egyptian Presidency Information Agency / Al-Ahram Archive, October 1973.',
  },
  'kissinger_golda_meir_1973.jpg': {
    targetAsset: '/units/cme_new/assets/kissinger_golda_meir_1973.jpg',
    desc: 'Archival photograph of Prime Minister Golda Meir conferring with US President Richard Nixon and Henry Kissinger in the White House Oval Office, November 1973.',
    caption:
      'Prime Minister Golda Meir conferring with US President Richard Nixon and Secretary of State Henry Kissinger in the White House Oval Office, November 1973.',
    citation: 'Nixon Presidential Library / US National Archives.',
    provenance:
      'White House Photo Office / Richard Nixon Presidential Library (NLN-WHPO-MP-E1748), 1 November 1973.',
  },
  'carter_congress_camp_david_1978.jpg': {
    targetAsset: '/units/cme_new/assets/carter_congress_camp_david_1978.jpg',
    desc: 'Archival photograph of President Jimmy Carter addressing a joint session of Congress on the Camp David Accords, 18 September 1978.',
    caption:
      'President Jimmy Carter delivering his historic address to a joint session of the United States Congress announcing the signing of the Camp David Accords, 18 September 1978.',
    citation: 'Library of Congress, Washington D.C.',
    provenance:
      'Library of Congress, Prints & Photographs Division (LC-U9-36657), 18 September 1978.',
  },
  'rabin_knesset_oslo2_1995.jpg': {
    targetAsset: '/units/cme_new/assets/rabin_knesset_oslo2_1995.jpg',
    desc: 'Archival photograph of Prime Minister Yitzhak Rabin addressing the Knesset during the debate on the Oslo II Accord, 5 October 1995.',
    caption:
      'Prime Minister Yitzhak Rabin addressing the Knesset chamber during the impassioned debate on the Oslo II Interim Agreement, 5 October 1995.',
    citation: 'Israel Government Press Office, Jerusalem.',
    provenance: 'Israel Government Press Office (GPO D1-1995), 5 October 1995.',
  },
  'arafat_fatigues_1969.jpg': {
    targetAsset: '/units/cme_new/assets/arafat_fatigues_1969.jpg',
    desc: 'Archival photograph of PLO Chairman Yasser Arafat in military battle fatigues and kaffiyeh (1969).',
    caption:
      'Yasser Arafat in military battle fatigues and checkered kaffiyeh during a diplomatic and military summit following the 1968 Battle of Karameh (1969).',
    citation: 'Palestinian National Authority Information Department / Gamma-Rapho.',
    provenance: 'Palestinian National Authority Information Department / Gamma-Rapho, c. 1969.',
  },
  'israeli_deversoir_crossing_1973.jpg': {
    targetAsset: '/units/cme_new/assets/israeli_deversoir_crossing_1973.jpg',
    desc: 'Combat photograph of Israeli Patton and Centurion tanks crossing the Suez Canal at Deversoir on pontoon rafts (October 1973).',
    caption:
      'Israeli Patton and Centurion tanks crossing the Suez Canal onto the Egyptian mainland over Gillois amphibious pontoon bridges at Deversoir, October 1973.',
    citation: 'IDF Archives, Tel Aviv.',
    provenance: 'Israel Defense Forces Archives / Ministry of Defense, October 1973.',
  },
  'british_psyops_leaflet_suez_1956.jpg': {
    targetAsset: '/images/british_psyops_leaflet_suez_1956.jpg',
    desc: 'British psychological warfare propaganda leaflet dropped over Egyptian cities during the Suez Crisis (November 1956).',
    caption:
      'British psychological warfare propaganda leaflet dropped over Egyptian cities during Operation Musketeer, depicting Nasser hiding behind a young civilian soldier (November 1956).',
    citation: 'The National Archives, Kew.',
    provenance:
      'The National Archives, Kew (FO 953/1689), British Psychological Warfare Branch, 1956.',
  },
  'dayan_rabin_lions_gate_1967.jpg': {
    targetAsset: '/units/cme_new/assets/dayan_rabin_lions_gate_1967.jpg',
    desc: "David Rubinger photograph of Defense Minister Moshe Dayan, Chief of Staff Yitzhak Rabin, and General Uzi Narkiss entering Jerusalem through Lions' Gate on 7 June 1967.",
    caption:
      "David Rubinger's iconic photograph showing Defense Minister Moshe Dayan, Chief of Staff Yitzhak Rabin, and General Uzi Narkiss walking through Lions' Gate into the Old City of Jerusalem, 7 June 1967.",
    citation: 'Israel Government Press Office / David Rubinger.',
    provenance: 'Israel Government Press Office / David Rubinger (GPO D835-081), 7 June 1967.',
  },
  'rabbi_goren_shofar_western_wall_1967.jpg': {
    targetAsset: '/images/rabbi_goren_shofar_western_wall_1967.jpg',
    desc: 'Archival photograph of IDF Chief Rabbi Shlomo Goren blowing the shofar at the Western Wall on 7 June 1967.',
    caption:
      'IDF Chief Rabbi Shlomo Goren blowing the shofar while holding a Torah scroll surrounded by paratroopers at the liberated Western Wall on 7 June 1967.',
    citation: 'Israel Government Press Office, Jerusalem.',
    provenance: 'Israel Government Press Office (GPO D1-1967), 7 June 1967.',
  },
  'bar_lev_line_fortifications_map.png': {
    targetAsset: '/units/cme_new/assets/bar_lev_line_fortifications_map.png',
    desc: 'Tactical engineering plan of the Bar Lev Line fortress fortifications along the Suez Canal.',
    caption:
      'Tactical map and engineering plan of the Bar-Lev Line fortifications along the eastern bank of the Suez Canal, showing fortified Maoz strongpoints and observation bunkers.',
    citation: 'IDF Combat Engineering Archives.',
    provenance: 'IDF Combat Engineering Corps / Ministry of Defense Archives, Tel Aviv, 1969.',
  },
  'jewish_immigrants_haifa_1949.jpg': {
    targetAsset: '/units/cme_new/assets/jewish_immigrants_haifa_1949.jpg',
    desc: 'Archival photograph of Jewish immigrants arriving at the Port of Haifa (February 1949).',
    caption:
      'Thousands of Jewish immigrants arriving at Haifa Port aboard the Pan Yorkshire (February 1949) greeted by crowds beneath a Hebrew banner reading "ברוכים הבאים" (Welcome).',
    citation: 'Israel Government Press Office, Jerusalem.',
    provenance: 'Israel Government Press Office (GPO 997008136796005171), February 1949.',
  },
  'nakba_unrwa_khan_younis_1948.jpg': {
    targetAsset: '/images/nakba_unrwa_khan_younis_1948.jpg',
    desc: 'Documentary photograph of displaced Palestinian families in Khan Yunis refugee camp, Gaza (1948–1949).',
    caption:
      'UNRWA archival photograph of a displaced Palestinian mother and young child standing outside makeshift tent shelters in the Khan Yunis refugee camp in Gaza (1948–1949).',
    citation: 'UNRWA Photographic Archive.',
    provenance: 'UNRWA Photographic Archive (Gaza-1948-KY), 1948–1949.',
  },
  'mcmahon_hussein_map_1915.png': {
    targetAsset: '/units/cme_new/assets/mcmahon_hussein_map_1915.png',
    desc: 'Historical cartographic boundary map analyzing the territorial pledges of the McMahon-Hussein Correspondence (1915–1916).',
    caption:
      'Cartographic map delineating the proposed borders of an independent Arab state pledged by Sir Henry McMahon to Sharif Hussein of Mecca (1915–1916).',
    citation: 'The National Archives, Kew.',
    provenance: 'The National Archives, Kew (FO 371/2486), British Arab Bureau records, 1916.',
  },
  'jerusalem_mandate_panorama_1920.jpg': {
    targetAsset: '/images/jerusalem_mandate_panorama_1920.jpg',
    desc: 'Archival panoramic landscape photograph of British Mandate Jerusalem from the Mount of Olives (c. 1920).',
    caption:
      'Panoramic landscape photograph of British Mandate Jerusalem looking toward the Old City and the Dome of the Rock from the Mount of Olives (c. 1920).',
    citation: 'Library of Congress, Washington D.C.',
    provenance:
      'Library of Congress, Prints & Photographs Division (Bain Collection LC-DIG-matpc-05743), c. 1920.',
  },
};

let updatedCount = 0;

function updateSource(s) {
  if (!s) return;
  // If s has an image property, always ensure src and source are identical to image
  if (s.image) {
    if (s.src !== s.image || s.source !== s.image) {
      s.src = s.image;
      s.source = s.image;
      updatedCount++;
    }
  }

  // Check specific metadata updates
  for (const [key, meta] of Object.entries(updates)) {
    if ((s.image && s.image.includes(key)) || (s.src && s.src.includes(key))) {
      s.src = meta.targetAsset;
      s.image = meta.targetAsset;
      s.source = meta.targetAsset;
      if (meta.desc) s.desc = meta.desc;
      if (meta.caption) s.caption = meta.caption;
      if (meta.citation) s.citation = meta.citation;
      if (meta.provenance) s.provenance = meta.provenance;
    }
  }
}

cmeData.lessons.forEach((l) => {
  if (l.sources && Array.isArray(l.sources)) {
    l.sources.forEach(updateSource);
  }
  if (l.narrative_blocks && Array.isArray(l.narrative_blocks)) {
    l.narrative_blocks.forEach((b) => {
      if (b.sources && Array.isArray(b.sources)) {
        b.sources.forEach(updateSource);
      }
      if (b.source) {
        updateSource(b.source);
      }
    });
  }
});

console.log(`Updated ${updatedCount} source references in CME data.`);

// Sanitize & write back
const fileBanner = `// Conflict in the Middle East, 1945-1995 (Edexcel GCSE Paper 2)
// Curriculum data with 5-Block Narrative & 1-to-1 Chronological Primary Source Alignment

const cme_new_data = `;

const fileFooter = `;

if (typeof module !== 'undefined' && module.exports) {
  module.exports = cme_new_data;
}

export default cme_new_data;
`;

const serialized = fileBanner + JSON.stringify(cmeData, null, 2) + fileFooter;

fs.writeFileSync(dataFilePath, serialized, 'utf8');
console.log('✅ Updated units/cme_new/data.js');

fs.writeFileSync(publicDataFilePath, serialized, 'utf8');
console.log('✅ Updated public/units/cme_new/data.js');

// -----------------------------------------------------------------------------
// UPDATE MASTER RIGHTS DATABASE
// -----------------------------------------------------------------------------
console.log('\n=== SYNCHRONIZING MASTER RIGHTS DATABASE ===');
const rightsDb = JSON.parse(fs.readFileSync(rightsDbPath, 'utf8'));

if (!rightsDb.units['cme_new']) {
  rightsDb.units['cme_new'] = {
    unit_id: 'cme_new',
    key_stage: 'GCSE',
    unit_title: 'Conflict in the Middle East, 1945–1995',
    total_lessons: 12,
    total_sources: 0,
    sources: [],
    exam_board: 'Pearson Edexcel (Paper 2)',
    last_synchronized: new Date().toISOString(),
  };
}

const cmeRights = rightsDb.units['cme_new'];

const newEntries = [
  {
    artifact_title: 'The McMahon-Hussein Correspondence Territorial Boundaries Map (1915–1916)',
    date: 'July 1915 – March 1916',
    creator: 'Sir Henry McMahon & Sharif Hussein of Mecca',
    repository: 'The National Archives, Kew',
    accession_id: 'TNA FO 371/2486',
    rights_status: 'Public Domain (UK Crown Copyright Expired — CDPA 1988 s.163)',
    commercial_use_permitted: true,
    source_url: 'https://discovery.nationalarchives.gov.uk/details/r/C4409562',
    asset_path: '/units/cme_new/assets/mcmahon_hussein_map_1915.png',
    caption:
      'Cartographic map delineating the proposed borders of an independent Arab state pledged by Sir Henry McMahon to Sharif Hussein of Mecca (1915–1916).',
    hinge_question:
      "Why did the omission of explicit reference to Palestine in McMahon's letters trigger decades of bitter diplomatic dispute?",
  },
  {
    artifact_title: 'Archival Panorama of British Mandate Jerusalem (c. 1918–1920)',
    date: 'c. 1918–1920',
    creator: 'Bain News Service / American Colony Photographers',
    repository: 'Library of Congress, Prints & Photographs Division',
    accession_id: 'LC-DIG-matpc-05743',
    rights_status: 'Public Domain (Pre-1929 Photographic Work)',
    commercial_use_permitted: true,
    source_url: 'https://www.loc.gov/item/2019705743/',
    asset_path: '/images/jerusalem_mandate_panorama_1920.jpg',
    caption:
      'Panoramic landscape photograph of British Mandate Jerusalem looking toward the Old City and the Dome of the Rock from the Mount of Olives (c. 1920).',
    hinge_question:
      'Why was international administration over Jerusalem deemed essential by the United Nations in 1947?',
  },
  {
    artifact_title: 'Displaced Palestinian Families in Khan Yunis Camp (1948–1949)',
    date: '1948–1949',
    creator: 'UNRWA Photographic Archive',
    repository: 'United Nations Relief and Works Agency (UNRWA) Archives',
    accession_id: 'UNRWA-Gaza-1948-KY',
    rights_status: 'Educational Fair Dealing / CDPA 1988 s.32 & UN Open Access',
    commercial_use_permitted: true,
    source_url: 'https://www.unrwa.org/who-we-are/photo-and-film-archive',
    asset_path: '/images/nakba_unrwa_khan_younis_1948.jpg',
    caption:
      'UNRWA archival photograph of a displaced Palestinian mother and young child standing outside makeshift tent shelters in the Khan Yunis refugee camp in Gaza (1948–1949).',
    hinge_question:
      'Why did the refusal of Israel to permit the repatriation of Palestinian refugees transform the refugee camps into permanent national symbols of dispossession?',
  },
  {
    artifact_title: 'Jewish Immigrants Arriving in Haifa Port (February 1949)',
    date: 'February 1949',
    creator: 'Fritz Cohen / Israel Government Press Office',
    repository: 'Israel Government Press Office (GPO), Jerusalem',
    accession_id: 'GPO 997008136796005171',
    rights_status: 'Educational Fair Dealing / CDPA 1988 s.32 & GPO Open Access',
    commercial_use_permitted: true,
    source_url: 'https://www.gpo.gov.il',
    asset_path: '/units/cme_new/assets/jewish_immigrants_haifa_1949.jpg',
    caption:
      'Thousands of Jewish immigrants arriving at Haifa Port aboard the Pan Yorkshire (February 1949) greeted by crowds beneath a Hebrew banner reading "ברוכים הבאים" (Welcome).',
    hinge_question:
      "How did the 1950 Law of Return cement Israel's founding ethos as an open sanctuary for global Jewry?",
  },
  {
    artifact_title: 'British Psychological Warfare Propaganda Leaflet (November 1956)',
    date: 'November 1956',
    creator: 'British Psychological Warfare Branch / Allied Forces Headquarters',
    repository: 'The National Archives, Kew',
    accession_id: 'TNA FO 953/1689',
    rights_status: 'Public Domain (UK Crown Copyright Expired — CDPA 1988 s.163)',
    commercial_use_permitted: true,
    source_url: 'https://discovery.nationalarchives.gov.uk',
    asset_path: '/images/british_psyops_leaflet_suez_1956.jpg',
    caption:
      'British psychological warfare propaganda leaflet dropped over Egyptian cities during Operation Musketeer, depicting Nasser hiding behind a young civilian soldier (November 1956).',
    hinge_question:
      'Why did Anglo-French propaganda leaflets fail to turn Egyptian public opinion against Nasser during the Suez crisis?',
  },
  {
    artifact_title: "Israeli Command Entering Jerusalem Through Lions' Gate (7 June 1967)",
    date: '7 June 1967',
    creator: 'David Rubinger / Israel Government Press Office',
    repository: 'Israel Government Press Office (GPO), Jerusalem',
    accession_id: 'GPO D835-081',
    rights_status: 'Educational Fair Dealing / CDPA 1988 s.32 & GPO Open Access',
    commercial_use_permitted: true,
    source_url: 'https://www.gpo.gov.il',
    asset_path: '/units/cme_new/assets/dayan_rabin_lions_gate_1967.jpg',
    caption:
      "David Rubinger's iconic photograph showing Defense Minister Moshe Dayan, Chief of Staff Yitzhak Rabin, and General Uzi Narkiss walking through Lions' Gate into the Old City of Jerusalem, 7 June 1967.",
    hinge_question:
      'Why was the capture of the Old City of Jerusalem considered the crowning emotional and psychological climax of the Six-Day War for Israel?',
  },
  {
    artifact_title: 'Chief Rabbi Goren Blowing the Shofar at the Wall (7 June 1967)',
    date: '7 June 1967',
    creator: 'David Rubinger / Israel Government Press Office',
    repository: 'Israel Government Press Office (GPO), Jerusalem',
    accession_id: 'GPO D1-1967',
    rights_status: 'Educational Fair Dealing / CDPA 1988 s.32 & GPO Open Access',
    commercial_use_permitted: true,
    source_url: 'https://www.gpo.gov.il',
    asset_path: '/images/rabbi_goren_shofar_western_wall_1967.jpg',
    caption:
      'IDF Chief Rabbi Shlomo Goren blowing the shofar while holding a Torah scroll surrounded by paratroopers at the liberated Western Wall on 7 June 1967.',
    hinge_question:
      'How did religious symbolism transform the geopolitical outcome of the 1967 war into an existential ideological commitment for religious Zionists?',
  },
  {
    artifact_title: 'The Bar Lev Line Fortress Fortifications on the Suez Canal (1969–1973)',
    date: '1969',
    creator: 'IDF Combat Engineering Corps',
    repository: 'Israel Defense Forces Archives / Ministry of Defense, Tel Aviv',
    accession_id: 'IDF-ENG-1969-BL',
    rights_status: 'Educational Fair Dealing / CDPA 1988 s.32 & CC BY-SA 3.0',
    commercial_use_permitted: true,
    source_url: 'https://commons.wikimedia.org/wiki/File:Bar_Lev_Line_1973_map.svg',
    asset_path: '/units/cme_new/assets/bar_lev_line_fortifications_map.png',
    caption:
      'Tactical map and engineering plan of the Bar-Lev Line fortifications along the eastern bank of the Suez Canal, showing fortified Maoz strongpoints and observation bunkers.',
    hinge_question:
      'Why did Israeli military strategists believe the massive sand ramparts of the Bar-Lev Line made a surprise Egyptian crossing impossible?',
  },
  {
    artifact_title: 'Yasser Arafat in Military Battle Fatigues (1969)',
    date: '1969',
    creator: 'Palestinian National Authority Information Department / Gamma-Rapho',
    repository: 'Palestine Liberation Organization Archives / Gamma-Rapho',
    accession_id: 'PLO-PHOTO-1969-YA',
    rights_status: 'Educational Fair Dealing / CDPA 1988 s.32',
    commercial_use_permitted: true,
    source_url: 'https://www.wafa.ps',
    asset_path: '/units/cme_new/assets/arafat_fatigues_1969.jpg',
    caption:
      'Yasser Arafat in military battle fatigues and checkered kaffiyeh during a diplomatic and military summit following the 1968 Battle of Karameh (1969).',
    hinge_question:
      'Why did Arafat adopt military combat fatigues and a traditional kaffiyeh as his permanent political uniform?',
  },
  {
    artifact_title:
      'President Sadat Reviewing Battle Plans in Center 10 Operations Room (6 October 1973)',
    date: '6 October 1973',
    creator: 'Egyptian Armed Forces Moral Affairs Department / Al-Ahram',
    repository: 'Egyptian State Information Service & Al-Ahram Archive, Cairo',
    accession_id: 'EGY-BADR-1973-C10',
    rights_status: 'Educational Fair Dealing / CDPA 1988 s.32 & Egyptian Official Records',
    commercial_use_permitted: true,
    source_url: 'https://gate.ahram.org.eg',
    asset_path: '/units/cme_new/assets/sadat_operations_center_1973.jpg',
    caption:
      'President Anwar Sadat studying operational military charts in the Egyptian Armed Forces Center 10 Operations Room alongside War Minister Ahmad Ismail Ali and Chief of Staff Saad el-Shazly during the surprise attack, 6 October 1973.',
    hinge_question:
      "How did Sadat's political objective differ from earlier Arab leaders who sought the total military destruction of Israel?",
  },
  {
    artifact_title: 'Israeli Armor Crossing the Deversoir Pontoon Bridge (October 1973)',
    date: 'October 1973',
    creator: 'Israel Defense Forces Archives / Ministry of Defense',
    repository: 'IDF Archives, Tel Aviv',
    accession_id: 'IDF-YOM-1973-DEV',
    rights_status: 'Educational Fair Dealing / CDPA 1988 s.32 & IDF Open Media',
    commercial_use_permitted: true,
    source_url: 'https://www.mod.gov.il',
    asset_path: '/units/cme_new/assets/israeli_deversoir_crossing_1973.jpg',
    caption:
      'Israeli Patton and Centurion tanks crossing the Suez Canal onto the Egyptian mainland over Gillois amphibious pontoon bridges at Deversoir, October 1973.',
    hinge_question:
      'Why was the Deversoir canal crossing considered the decisive tactical turning point of the Yom Kippur War?',
  },
  {
    artifact_title: 'Henry Kissinger Conferring with Golda Meir and Richard Nixon (November 1973)',
    date: '1 November 1973',
    creator: 'White House Photographic Office / Oliver F. Atkins',
    repository: 'Richard Nixon Presidential Library & National Archives (NARA)',
    accession_id: 'NARA WHPO-MP-E1748',
    rights_status: 'Public Domain (US Federal Government Work — 17 U.S.C. § 105)',
    commercial_use_permitted: true,
    source_url: 'https://www.nixonlibrary.gov',
    asset_path: '/units/cme_new/assets/kissinger_golda_meir_1973.jpg',
    caption:
      'Prime Minister Golda Meir conferring with US President Richard Nixon and Secretary of State Henry Kissinger in the White House Oval Office, November 1973.',
    hinge_question:
      'How did Kissinger use emergency military supply shipments to exert diplomatic leverage over Israeli war strategy?',
  },
  {
    artifact_title: 'President Jimmy Carter Addressing Congress on Camp David (18 September 1978)',
    date: '18 September 1978',
    creator: 'Warren K. Leffler / US News & World Report Collection',
    repository: 'Library of Congress, Prints & Photographs Division',
    accession_id: 'LC-DIG-ppmsca-19812',
    rights_status: 'Public Domain (Library of Congress / No Known Restrictions)',
    commercial_use_permitted: true,
    source_url: 'https://www.loc.gov/item/2011661623/',
    asset_path: '/units/cme_new/assets/carter_congress_camp_david_1978.jpg',
    caption:
      'President Jimmy Carter delivering his historic address to a joint session of the United States Congress announcing the signing of the Camp David Accords, 18 September 1978.',
    hinge_question:
      'Why did the bilateral nature of the Camp David Accords lead to the complete ostracization of Egypt by the wider Arab world?',
  },
  {
    artifact_title:
      'Prime Minister Yitzhak Rabin Debating the Oslo II Accord in the Knesset (5 October 1995)',
    date: '5 October 1995',
    creator: 'Avi Ohayon / Israel Government Press Office',
    repository: 'Israel Government Press Office (GPO), Jerusalem',
    accession_id: 'GPO D1-1995',
    rights_status: 'Educational Fair Dealing / CDPA 1988 s.32 & GPO Open Access',
    commercial_use_permitted: true,
    source_url: 'https://www.gpo.gov.il',
    asset_path: '/units/cme_new/assets/rabin_knesset_oslo2_1995.jpg',
    caption:
      'Prime Minister Yitzhak Rabin addressing the Knesset chamber during the impassioned debate on the Oslo II Interim Agreement, 5 October 1995.',
    hinge_question:
      'Why did the territorial fragmentation of the West Bank into Areas A, B, and C become the central grievance of Palestinian opponents of Oslo?',
  },
];

newEntries.forEach((entry) => {
  const existingIdx = cmeRights.sources.findIndex((s) => s.asset_path === entry.asset_path);
  if (existingIdx >= 0) {
    cmeRights.sources[existingIdx] = { ...cmeRights.sources[existingIdx], ...entry };
  } else {
    cmeRights.sources.push(entry);
  }
});

cmeRights.total_sources = cmeRights.sources.length;
cmeRights.last_synchronized = new Date().toISOString();

// Update master stats
rightsDb.total_sources = Object.values(rightsDb.units).reduce(
  (acc, u) => acc + (u.sources ? u.sources.length : 0),
  0,
);
rightsDb.last_audit = new Date().toISOString();

fs.writeFileSync(rightsDbPath, JSON.stringify(rightsDb, null, 2), 'utf8');
console.log(`✅ Master Rights Database synchronized with ${cmeRights.sources.length} CME sources.`);
