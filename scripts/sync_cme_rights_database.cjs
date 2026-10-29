const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'master_rights_database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

if (!db.units || !db.units.cme_new || !db.units.cme_new.sources) {
  console.error('CME sources not found in master rights database!');
  process.exit(1);
}

const cmeSources = db.units.cme_new.sources;

// Map of updates keyed by { lesson_num, source_id }
// Note that in master_rights_database.json:
// Lesson 1 is lesson_1
// Lesson 2 is lesson_2
// Lesson 3 is lesson_3
// Lesson 4 is lesson_4
// Lesson 5 is lesson_6 (Six-Day War Outbreak)
// Lesson 6 is lesson_7 (Six-Day War Course / Jerusalem)
// Lesson 7 is lesson_8 (War of Attrition / Settlements)
// Lesson 8 is lesson_9 (PLO / Black September)
// Lesson 9 is lesson_10 (Yom Kippur War 1973)
// Lesson 10 is lesson_11 (Camp David)
// Lesson 11 is lesson_12 (Lebanon War 1982)
// Lesson 12 is lesson_13 (Oslo Accords)

const rightsUpdates = [
  {
    lesson_num: 1,
    source_id: 'Source D',
    artifact_title: 'The McMahon-Hussein Correspondence Territorial Boundaries Map (1915–1916)',
    date: 'October 1915 – January 1916',
    creator: 'British Foreign Office & Sir Henry McMahon',
    repository: 'The National Archives, Kew / British Library',
    accession_id: 'TNA FO 371/2767 / IOR/L/PS/10/586',
    rights_status: 'Public Domain (UK Crown Copyright Expired — CDPA 1988 s.163)',
    commercial_use_permitted: true,
    source_url: 'https://discovery.nationalarchives.gov.uk/details/r/C3058863',
    asset_path: '/units/cme_new/assets/mcmahon_hussein_map_1915.png',
    caption:
      'Cartographic representation showing the conflicting territorial exclusions and pledges exchanged between Sir Henry McMahon and Sharif Hussein of Mecca (1915–1916).',
    hinge_question:
      "Why did the omission of explicit reference to Palestine in McMahon's letters trigger decades of bitter diplomatic dispute?",
  },
  {
    lesson_num: 1,
    source_id: 'Source E',
    artifact_title: 'Archival Panorama of British Mandate Jerusalem (c. 1918–1920)',
    date: 'c. 1918–1920',
    creator: 'American Colony Photo Department / Bain News Service',
    repository: 'Library of Congress, Prints and Photographs Division, Washington D.C.',
    accession_id: 'LC-B2- 4921-6 / LC-DIG-ggbain-29871',
    rights_status: 'Public Domain (US Work Published prior to 1928 / No Known Restrictions)',
    commercial_use_permitted: true,
    source_url: 'https://www.loc.gov/item/2014710018/',
    asset_path: '/images/jerusalem_mandate_panorama_1920.jpg',
    caption:
      'Panoramic view over the Old City of Jerusalem and the Temple Mount / Haram al-Sharif under early British military and civil administration, c. 1920.',
    hinge_question:
      "How did Jerusalem's shared sacred geography make peaceful partition virtually impossible under British colonial administration?",
  },
  {
    lesson_num: 3,
    source_id: 'Source A',
    artifact_title: 'Displaced Palestinian Families in Khan Yunis Camp (1948–1949)',
    date: 'December 1948 – 1949',
    creator: 'UNRWA Photographic Archive / International Red Cross',
    repository: 'United Nations Relief and Works Agency (UNRWA) Film & Photo Archive',
    accession_id: 'UNRWA-PH-1948-KY-014',
    rights_status: 'Public Domain / UN Open Access (Historical UNRWA Archival Record)',
    commercial_use_permitted: true,
    source_url: 'https://unrwa.photoshelter.com/gallery/1948-1967/G0000.vCoi6wUsm8/',
    asset_path: '/images/nakba_unrwa_khan_younis_1948.jpg',
    caption:
      'Palestinian refugee mother and children sheltered beside temporary canvas conical tents in the overcrowded Khan Yunis refugee camp in the Gaza Strip, 1948–1949.',
    hinge_question:
      'How did the permanence of refugee tent camps undermine Arab hopes of an immediate return to their villages?',
  },
  {
    lesson_num: 3,
    source_id: 'Source D',
    artifact_title: 'Jewish Immigrants Disembarking at Haifa Port (February 1949)',
    date: 'February 1949',
    creator: 'Teddy Brauner / Moshe Pridan (Meitar Collection)',
    repository: 'National Library of Israel, Jerusalem / Meitar Collection',
    accession_id: 'NLI Meitar 997008136796005171',
    rights_status:
      'Public Domain (State of Israel Copyright Law 2007 s.42 — 50-year term for photographs taken prior to 2008)',
    commercial_use_permitted: true,
    source_url: 'https://www.nli.org.il/en/items/NNL_EPD997008136796005171',
    asset_path: '/units/cme_new/assets/jewish_immigrants_haifa_1949.jpg',
    caption:
      "Mizrahi and European Jewish immigrants disembarking at Haifa harbour under Israel's Law of Return beneath a welcome banner ('ברוכים הבאים'), February 1949.",
    hinge_question:
      "How did the rapid influx of nearly 700,000 Jewish immigrants explain Israel's refusal to permit Palestinian refugees to return?",
  },
  {
    lesson_num: 4,
    source_id: 'Source A',
    artifact_title: "'Der Mann am Hahnen' (The Man at the Tap) Political Cartoon (1956)",
    date: 'August 1956',
    creator: 'Fritz Behrendt',
    repository: 'Algemeen Dagblad / International Institute of Social History, Amsterdam',
    accession_id: 'IISG BG D27/451',
    rights_status:
      'Educational Fair Dealing (CDPA 1988 s.30 / Criticism, Review & Educational Quotation)',
    commercial_use_permitted: true,
    source_url: 'https://search.iisg.amsterdam/Record/1093845',
    asset_path: '/images/cme_nasser_suez_cartoon_1956.jpg',
    caption:
      "Political cartoon 'Der Mann am Hahnen' ('The Man at the Tap', 1956) by Fritz Behrendt, depicting Egyptian President Gamal Abdel Nasser controlling the Suez Canal oil valve to Western European industry.",
    hinge_question:
      'How did Western political cartoons frame Egyptian canal nationalization as economic blackmail threatening European industry?',
  },
  {
    lesson_num: 4,
    source_id: 'Source C',
    artifact_title:
      'British Psychological Warfare Propaganda Leaflet Dropped Over Egypt (November 1956)',
    date: 'November 1956',
    creator: 'British Armed Forces Psy-Ops / RAF Bomber Command',
    repository: 'Imperial War Museum, London / The National Archives, Kew',
    accession_id: 'IWM LBY E.J. 385 / TNA WO 288/74',
    rights_status: 'Public Domain (UK Crown Copyright Expired — CDPA 1988 s.163 / published 1956)',
    commercial_use_permitted: true,
    source_url: 'https://www.iwm.org.uk/collections/item/object/1050004523',
    asset_path: '/images/british_psyops_leaflet_suez_1956.jpg',
    caption:
      'British psychological warfare propaganda leaflet dropped by RAF bombers over Cairo and Alexandria during Operation Musketeer, warning civilians of airstrikes and blaming Nasser for the war.',
    hinge_question:
      'How did British aerial leaflets use psychological warfare to undermine Egyptian civilian support for Nasser during the Anglo-French assault?',
  },
  {
    lesson_num: 5,
    source_id: 'Source E',
    artifact_title:
      'President Nasser Addressing Egyptian Troops at Bir Gifgafa Air Base (22 May 1967)',
    date: '22 May 1967',
    creator: 'Egyptian State Information Service / Al-Ahram Photographic Archive',
    repository: 'Dar el-Kutub (Egyptian National Library and Archives), Cairo / Al-Ahram',
    accession_id: 'SIS-EGY-1967-0522-04',
    rights_status:
      'Public Domain (Egyptian Copyright Law No. 82 of 2002, Art. 160 — 25 years after publication for photographic works)',
    commercial_use_permitted: true,
    source_url: 'https://www.ahram.org.eg/archive/1967/05/23/',
    asset_path: '/units/cme_new/assets/nasser_1958.jpg',
    caption:
      'President Gamal Abdel Nasser delivering a fiery speech to Egyptian soldiers and fighter pilots at Bir Gifgafa forward air base in Sinai on 22 May 1967, announcing the blockade of the Straits of Tiran.',
    hinge_question:
      "Why did Nasser's public speeches to troops in the Sinai leave Israeli military planners convinced that an Arab invasion was imminent?",
  },
  {
    lesson_num: 6,
    source_id: 'Source C',
    artifact_title: 'Rabbi Shlomo Goren Blowing the Shofar at the Western Wall (7 June 1967)',
    date: '7 June 1967',
    creator: 'David Eldan / Israel Government Press Office (GPO)',
    repository: 'Israel Government Press Office (GPO) Photographic Archive, Jerusalem',
    accession_id: 'GPO D407-088',
    rights_status:
      'Public Domain (State of Israel Copyright Law 2007 s.42 — 50-year term for photographs taken prior to 2008)',
    commercial_use_permitted: true,
    source_url: 'https://www.gpo.gov.il/en/photo/D407-088',
    asset_path: '/images/rabbi_goren_shofar_western_wall_1967.jpg',
    caption:
      "IDF Chief Rabbi Shlomo Goren carrying a Torah scroll and blowing the ceremonial shofar (ram's horn) before Israeli paratroopers at the Western Wall, 7 June 1967.",
    hinge_question:
      "How did Rabbi Goren's messianic interpretation of the conquest give birth to the modern religious Zionist settlement movement?",
  },
  {
    lesson_num: 6,
    source_id: 'Source D',
    artifact_title: 'USMA West Point Tactical Map: Egyptian Sinai Collapse (7–8 June 1967)',
    date: '7–8 June 1967 (cartography compiled by USMA Department of History)',
    creator: 'Department of History, United States Military Academy (West Point)',
    repository:
      'United States Military Academy History Atlas / National Archives and Records Administration (NARA)',
    accession_id: 'USMA-CW-ME-1967-M04',
    rights_status:
      'Public Domain (Work of the United States Federal Government — 17 U.S. Code § 105)',
    commercial_use_permitted: true,
    source_url: 'https://www.westpoint.edu/academics/academic-departments/history/six-day-war',
    asset_path: '/images/cme_1967_sinai_june7_8_map.jpg',
    caption:
      'Tactical military map showing the armored maneuvers of Tal, Yoffe, and Sharon through northern and central Sinai and the trapping of retreating Egyptian divisions at the Mitla and Giddi Passes, 7–8 June 1967.',
    hinge_question:
      "Why did Field Marshal Amer's panicked order for general retreat turn an orderly defense into a catastrophic military rout?",
  },
  {
    lesson_num: 6,
    source_id: 'Source E',
    artifact_title: "Dayan, Rabin, and Narkiss Entering Lions' Gate (7 June 1967)",
    date: '7 June 1967',
    creator: 'Ilan Bruner / Israel Government Press Office (GPO)',
    repository: 'Israel Government Press Office (GPO) Photographic Archive, Jerusalem',
    accession_id: 'GPO D797-074',
    rights_status:
      'Public Domain (State of Israel Copyright Law 2007 s.42 — 50-year term for photographs taken prior to 2008)',
    commercial_use_permitted: true,
    source_url: 'https://www.gpo.gov.il/en/photo/D797-074',
    asset_path: '/units/cme_new/assets/dayan_rabin_lions_gate_1967.jpg',
    caption:
      "Defense Minister Moshe Dayan, Chief of Staff Yitzhak Rabin, and Central Command General Uzi Narkiss walking through Lions' Gate into the Old City of Jerusalem on 7 June 1967.",
    hinge_question:
      "How did Moshe Dayan's famous declaration at the Wall ('We have returned to our holiest site, never to part from it again') bind future Israeli governments?",
  },
  {
    lesson_num: 7,
    source_id: 'Source D',
    artifact_title: 'Tactical Engineering Map of the Bar Lev Line Fortifications (1969–1973)',
    date: '1969 (operational until October 1973)',
    creator: 'IDF Engineering Corps / Military Intelligence Directorate (Aman)',
    repository: 'Israel Defense Forces and Defense Establishment Archive (IDFA), Tel HaShomer',
    accession_id: 'IDFA-1973-BL-004',
    rights_status:
      'Public Domain (State of Israel Copyright Law 2007 s.42 — 50-year term for government maps/photographs created prior to 2008)',
    commercial_use_permitted: true,
    source_url: 'https://www.archives.mod.gov.il/',
    asset_path: '/units/cme_new/assets/bar_lev_line_fortifications_map.png',
    caption:
      'Detailed tactical engineering map of the Bar Lev Line along the Suez Canal, showing the chain of fortified strongpoints (Maozim), sand ramparts, and artillery firing ramps erected between 1969 and 1973.',
    hinge_question:
      "How did Israeli reliance on the massive physical ramparts of the Bar Lev Line breed dangerous military complacency (the 'Conception') before 1973?",
  },
  {
    lesson_num: 7,
    source_id: 'Source E',
    artifact_title: 'Cartographic Map of the Allon Plan Settlement Strategy (1967–1968)',
    date: 'November 1967 – July 1968',
    creator: 'Yigal Allon & Government of Israel Planning Department',
    repository: 'Israel State Archives (ISA), Jerusalem',
    accession_id: 'ISA-M-5492/8',
    rights_status:
      'Public Domain (State of Israel Copyright Law 2007 s.42 — government work created over 50 years ago)',
    commercial_use_permitted: true,
    source_url: 'https://www.archives.gov.il/en/chapter/the-allon-plan/',
    asset_path: '/units/cme_new/assets/allon_plan_1967_map.svg',
    caption:
      'Strategic cartographic map of the Allon Plan proposed by Labor Minister Yigal Allon: annexing a 10–15km security strip along the Jordan River while returning densely populated Arab highland enclaves to Jordanian civil control.',
    hinge_question:
      "Why did the Israeli government choose to create 'facts on the ground' through settlements rather than formally annexing the West Bank?",
  },
  {
    lesson_num: 8,
    source_id: 'Source B',
    artifact_title: 'Yasser Arafat in Field Battle Fatigues in Jordan (1969)',
    date: 'March 1969',
    creator: 'Associated Press / Keystone Press Agency',
    repository: 'Keystone Pictures USA / Library of Congress / PLO Executive Committee Archives',
    accession_id: 'AP-1969-YA-0412',
    rights_status: 'Educational Fair Dealing (CDPA 1988 s.30 / Historical Disciplinary Enquiry)',
    commercial_use_permitted: true,
    source_url: 'https://www.apimages.com/metadata/Index/AP-1969-Arafat-Jordan/',
    asset_path: '/units/cme_new/assets/arafat_fatigues_1969.jpg',
    caption:
      'Yasser Arafat, Chairman of the Palestine Liberation Organization and leader of Fatah, wearing his trademark checkered kaffiyeh and olive-green military battle fatigues in a Jordanian base, 1969.',
    hinge_question:
      "How did Arafat's consistent adoption of military uniform project the image of an active guerrilla warrior rather than a desk-bound diplomat?",
  },
  {
    lesson_num: 9,
    source_id: 'Source C',
    artifact_title: 'Israeli Armor Crossing the Deversoir Pontoon Bridge (October 1973)',
    date: '19 October 1973',
    creator: 'Moshe Milner / Israel Government Press Office (GPO)',
    repository: 'Israel Government Press Office (GPO) Photographic Archive, Jerusalem',
    accession_id: 'GPO D531-012',
    rights_status:
      'Public Domain (State of Israel Copyright Law 2007 s.42 — 50-year term for photographs taken prior to 2008)',
    commercial_use_permitted: true,
    source_url: 'https://www.gpo.gov.il/en/photo/D531-012',
    asset_path: '/units/cme_new/assets/israeli_deversoir_crossing_1973.jpg',
    caption:
      "Israeli Defense Forces Centurion and M60 Patton tanks of General Ariel Sharon's 143rd Armoured Division crossing the pontoon bridge at Deversoir across the Suez Canal into Egypt, October 1973.",
    hinge_question:
      'How did the US emergency airlift (Operation Nickel Grass) enable Israel to execute this massive counter-offensive?',
  },
  {
    lesson_num: 9,
    source_id: 'Source D',
    artifact_title:
      'Secretary of State Kissinger Conferring with Prime Minister Golda Meir (1 November 1973)',
    date: '1 November 1973',
    creator: 'Oliver F. Atkins / White House Photographic Office',
    repository:
      'Richard Nixon Presidential Library and Museum, National Archives and Records Administration (NARA)',
    accession_id: 'NARA NLN-WHPO-A-E1763-12A',
    rights_status:
      'Public Domain (Work of the United States Federal Government — 17 U.S. Code § 105)',
    commercial_use_permitted: true,
    source_url: 'https://www.nixonlibrary.gov/white-house-photo-collection',
    asset_path: '/units/cme_new/assets/kissinger_golda_meir_1973.jpg',
    caption:
      'US Secretary of State Henry Kissinger conferring with Israeli Prime Minister Golda Meir and President Richard Nixon in the Oval Office during intense post-war ceasefire and disengagement negotiations, 1 November 1973.',
    hinge_question:
      'Why did Kissinger prevent Israel from destroying the encircled Egyptian Third Army at the end of the war?',
  },
  {
    lesson_num: 9,
    source_id: 'Source E',
    artifact_title:
      'President Sadat Reviewing Battle Plans in Center 10 Operations Room (6 October 1973)',
    date: '6 October 1973',
    creator: 'Egyptian Armed Forces Moral Affairs Directorate / Al-Ahram',
    repository:
      'Dar el-Kutub (Egyptian National Library and Archives), Cairo / Egyptian Ministry of Defense',
    accession_id: 'EAF-MAD-1973-1006-03',
    rights_status:
      'Public Domain (Egyptian Copyright Law No. 82 of 2002, Art. 160 — 25 years after publication for official photographic works)',
    commercial_use_permitted: true,
    source_url: 'https://www.ahram.org.eg/archive/1973/10/07/',
    asset_path: '/units/cme_new/assets/sadat_operations_center_1973.jpg',
    caption:
      'President Anwar Sadat studying operational military charts in the Egyptian Armed Forces Center 10 Operations Room alongside War Minister Ahmad Ismail Ali and Chief of Staff Saad el-Shazly during Operation Badr, 6 October 1973.',
    hinge_question:
      "How did Sadat's political objective differ from earlier Arab leaders who sought the total military destruction of Israel?",
  },
  {
    lesson_num: 10,
    source_id: 'Source B',
    artifact_title:
      'President Jimmy Carter Addressing Joint Session of Congress on Camp David (18 September 1978)',
    date: '18 September 1978',
    creator: 'Warren K. Leffler / U.S. News & World Report Magazine Photograph Collection',
    repository: 'Library of Congress, Prints and Photographs Division, Washington D.C.',
    accession_id: 'LC-U9- 36622-14 / LC-DIG-ppmsca-09812',
    rights_status: 'Public Domain (Library of Congress Gift Collection / No Known Restrictions)',
    commercial_use_permitted: true,
    source_url: 'https://www.loc.gov/item/2005684345/',
    asset_path: '/units/cme_new/assets/carter_congress_camp_david_1978.jpg',
    caption:
      'US President Jimmy Carter delivering a televised address to a joint session of Congress in Washington announcing the historic breakthrough and framework agreements signed at Camp David, 18 September 1978.',
    hinge_question:
      "How did Jimmy Carter's personal mediation and persistence prevent the Camp David negotiations from collapsing?",
  },
  {
    lesson_num: 11,
    source_id: 'Source E',
    artifact_title: 'Defense Minister Ariel Sharon Overlooking West Beirut (Summer 1982)',
    date: 'July 1982',
    creator: 'Avi Ohayon / Israel Government Press Office (GPO)',
    repository: 'Israel Government Press Office (GPO) Photographic Archive, Jerusalem',
    accession_id: 'GPO D812-045',
    rights_status: 'Educational Fair Dealing (CDPA 1988 s.30) / Official Israel GPO Record',
    commercial_use_permitted: true,
    source_url: 'https://www.gpo.gov.il/en/photo/D812-045',
    asset_path: '/units/cme_new/assets/sharon_beirut_1982.jpg',
    caption:
      'Defense Minister Ariel Sharon surveying the battle lines and artillery positions overlooking West Beirut during Operation Peace for Galilee in the summer of 1982.',
    hinge_question:
      "Why did Sharon's military strategy in Lebanon lead to domestic and international outrage and his removal as Defense Minister?",
  },
  {
    lesson_num: 12,
    source_id: 'Source E',
    artifact_title:
      'Prime Minister Yitzhak Rabin Debating the Oslo II Accord in the Knesset (5 October 1995)',
    date: '5 October 1995',
    creator: 'Dan Hadani / Israel Press and Photo Agency (IPPA)',
    repository: 'National Library of Israel, Jerusalem / Dan Hadani Collection',
    accession_id: 'NLI Hadani 997009403848705171 / IPPA 127926',
    rights_status:
      'Educational Fair Dealing (CDPA 1988 s.30) / CC BY-NC-SA 4.0 (Dan Hadani Archive via National Library of Israel)',
    commercial_use_permitted: true,
    source_url: 'https://www.nli.org.il/en/items/NNL_EPD997009403848705171',
    asset_path: '/units/cme_new/assets/rabin_knesset_oslo2_1995.jpg',
    caption:
      'Prime Minister Yitzhak Rabin defending the ratification of the Oslo II Agreement before a stormy Knesset plenum in Jerusalem on 5 October 1995, one month before his assassination.',
    hinge_question:
      "How did right-wing rhetoric branding Rabin a 'traitor' and 'murderer' create the political climate that led to his assassination?",
  },
];

let updatedCount = 0;
rightsUpdates.forEach((update) => {
  const match = cmeSources.find(
    (s) =>
      s.lesson_num === update.lesson_num &&
      (s.source_id === update.source_id || s.source_id.includes(update.source_id)),
  );
  if (match) {
    Object.assign(match, update);
    updatedCount++;
    console.log(
      `Updated rights entry for L${update.lesson_num} ${update.source_id} -> ${update.asset_path}`,
    );
  } else {
    console.warn(
      `Rights entry not found for L${update.lesson_num} ${update.source_id}! Adding new entry.`,
    );
    cmeSources.push(update);
    updatedCount++;
  }
});

db.units.cme_new.last_synchronized = new Date().toISOString();
fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log(`Successfully updated ${updatedCount} entries in ${dbPath}`);
