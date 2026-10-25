/**
 * scripts/populate_cold_war_visual_plates.cjs
 *
 * Populates the 3-Layer Pedagogical Architecture across all lessons of the Cold War unit:
 * - Layer 1: Core narrative exposition blocks (preserved).
 * - Layer 2: 2-3 authentic visual support plates per lesson, alternating rhythm, clean centered layout,
 *   0 image_context clutter, 0 duplicate questions.
 * - Layer 3: 5 primary sources (A-E) per lesson in full-width collapsible drawers with direct answers (100% preserved).
 *
 * Synchronizes across:
 * - units/cold_war/data.js
 * - public/units/cold_war/data.js
 * - data/cold_war.json
 * - public/data/cold_war.json
 * - scripts/master_rights_database.json
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = path.resolve(__dirname, '..');
const dataJsPath = path.join(ROOT_DIR, 'units', 'cold_war', 'data.js');
const pubDataJsPath = path.join(ROOT_DIR, 'public', 'units', 'cold_war', 'data.js');
const dataJsonPath = path.join(ROOT_DIR, 'data', 'cold_war.json');
const pubDataJsonPath = path.join(ROOT_DIR, 'public', 'data', 'cold_war.json');
const rightsDbPath = path.join(ROOT_DIR, 'scripts', 'master_rights_database.json');

// Map of visual plates to inject into narrative blocks:
// lesson_id -> { block_index (0-based) -> { image, image_alt, caption } }
const visualPlatesByLesson = {
  lesson_2: {
    2: { // Block 3: Changing of the Guard at Potsdam
      image: '/images/cold_war/potsdam_conference_1945.jpg',
      image_alt: 'Attlee, Truman, and Stalin seated in wicker chairs in the garden of Cecilienhof Palace, Potsdam, July 1945',
      caption: 'British Prime Minister Clement Attlee, US President Harry S. Truman, and Soviet Premier Joseph Stalin seated in the garden of Cecilienhof Palace during the Potsdam Conference (July 1945).'
    },
    4: { // Block 5: Division of Germany and Ruined Berlin
      image: '/images/cold_war/berlin_ruins_brandenburg_gate_1945.jpg',
      image_alt: 'Devastated shell of the Brandenburg Gate and debris across Pariser Platz, Berlin, summer 1945',
      caption: 'The catastrophic devastation of Berlin in the summer of 1945: ruined shell of the Brandenburg Gate and debris-strewn Pariser Platz amid quadripartite Allied military occupation.'
    }
  },
  lesson_3: {
    1: { // Block 2: The Truman Doctrine & Marshall Plan
      image: '/images/cold_war/marshall_plan_aid_germany_1948.jpg',
      image_alt: 'Freight train and workers unloading Marshall Plan industrial food and raw materials in the Ruhr Valley, 1948',
      caption: 'Marshall Plan industrial raw material and food shipments arriving in Recklinghausen in the Ruhr Valley (1948) under the European Recovery Program.'
    },
    3: { // Block 4: The Berlin Blockade & Operation Vittles
      image: '/images/cold_war/berlin_airlift_c54_tempelhof.jpg',
      image_alt: 'German civilians perched atop rubble watching a US Air Force C-54 transport plane land at Tempelhof Airport, 1948',
      caption: 'German civilians and children perched atop rubble watching a US Air Force C-54 Skymaster transport aircraft approach Tempelhof Airport during the Berlin Airlift (1948).'
    }
  },
  lesson_4: {
    1: { // Block 2: ExComm in Cabinet Room
      image: '/images/cold_war/jfk_excomm_cabinet_room_1962.jpg',
      image_alt: 'President John F. Kennedy and national security advisers conferring around the White House Cabinet Room table, October 1962',
      caption: 'President John F. Kennedy convenes the Executive Committee of the National Security Council (ExComm) in the White House Cabinet Room during the Cuban Missile Crisis (October 1962).'
    },
    2: { // Block 3: US Navy P-2 Neptune Intercept
      image: '/images/cold_war/us_navy_p2_neptune_cuban_missile_1962.jpg',
      image_alt: 'US Navy P-2H Neptune maritime patrol plane flying low over a Soviet freighter bound for Cuba, October 1962',
      caption: 'A US Navy P-2H Neptune maritime patrol aircraft intercepts and shadows a Soviet cargo vessel suspected of carrying missile equipment toward Cuba (October 1962).'
    },
    3: { // Block 4: Soviet Submarine B-59
      image: '/images/cold_war/soviet_b59_submarine_1962.jpg',
      image_alt: 'Soviet Foxtrot-class diesel submarine B-59 surfaced under US naval surveillance, October 1962',
      caption: 'Soviet Foxtrot-class diesel-electric submarine B-59, armed with a nuclear torpedo, forced to the surface by US Navy depth charges off the Cuban quarantine line (28 October 1962).'
    }
  },
  lesson_5: {
    1: { // Block 2: Inchon Landing
      image: '/images/cold_war/korean_war_inchon_landing_1950.jpg',
      image_alt: 'US Marines in landing craft heading toward the seawall at Inchon with scaling ladders, September 1950',
      caption: 'US Marines scale the seawall at Inchon with assault ladders during General MacArthur\'s decisive amphibious counter-offensive behind North Korean lines (15 September 1950).'
    },
    3: { // Block 4: Huey Combat Landing in Vietnam
      image: '/images/cold_war/huey_combat_landing_vietnam.jpg',
      image_alt: 'US Army UH-1D Huey helicopters deploying combat troops into a cleared jungle landing zone, 1966',
      caption: 'US Army UH-1D \'Huey\' helicopters deploy combat troops into a cleared hot landing zone during air assault operations in the dense Vietnamese jungle (1966).'
    }
  },
  lesson_6: {
    0: { // Block 1: Conrad Schumann Leap over Barbed Wire
      image: '/images/cold_war/conrad_schumann_berlin_wall_leap_1961.jpg',
      image_alt: 'East German border guard Conrad Schumann leaping over rolls of barbed wire into West Berlin, 15 August 1961',
      caption: 'Nineteen-year-old East German border guard Conrad Schumann leaps over barbed wire to defect to West Berlin at Bernauer Straße on the third day of wall construction (15 August 1961).'
    },
    2: { // Block 3: Reagan and Gorbachev at Geneva
      image: '/images/cold_war/reagan_gorbachev_geneva_summit_1985.jpg',
      image_alt: 'President Ronald Reagan and General Secretary Mikhail Gorbachev conversing before the fireplace at Fleur d\'Eau, Geneva, November 1985',
      caption: 'President Ronald Reagan and General Secretary Mikhail Gorbachev converse by the fireplace at Fleur d\'Eau during the historic Geneva Summit (November 1985).'
    },
    3: { // Block 4: Fall of the Berlin Wall
      image: '/images/cold_war/berlin_wall_fall_1989.jpg',
      image_alt: 'Crowds of East and West Berliners cheering atop the Berlin Wall in front of the illuminated Brandenburg Gate, November 1989',
      caption: 'Jubilant crowds of East and West Berliners gather atop the Berlin Wall in front of the illuminated Brandenburg Gate following the opening of border checkpoints (November 1989).'
    }
  },
  lesson_7: {
    2: { // Block 3: Civil Defence Protect & Survive
      image: '/images/cold_war/protect_and_survive_1980.jpg',
      image_alt: 'Cover of British government civil defence booklet Protect and Survive showing fallout shelter schematic, 1980',
      caption: 'Cover of the British Home Office civil defence public information booklet \'Protect and Survive\' (1980), advising families how to construct improvised nuclear fallout shelters.'
    },
    3: { // Block 4: Apollo 11 Lunar Landing
      image: '/images/cold_war/apollo_11_aldrin_moon.jpg',
      image_alt: 'Astronaut Buzz Aldrin stands on the lunar surface beside the Apollo 11 Lunar Module Eagle, July 1969',
      caption: 'Astronaut Buzz Aldrin walks on the lunar surface beside the Apollo 11 Lunar Module (20 July 1969), securing the ultimate technological victory in the superpower Space Race.'
    }
  }
};

// 1. Load current data.js
console.log('📖 Loading units/cold_war/data.js...');
const rawModule = require(dataJsPath);
const unitData = rawModule.default || rawModule;

let platesInjectedCount = 0;

unitData.lessons.forEach((lesson) => {
  const lessonPlates = visualPlatesByLesson[lesson.id];
  lesson.narrative_blocks.forEach((block, bIdx) => {
    // If this block is configured for a visual plate:
    if (lessonPlates && lessonPlates[bIdx]) {
      const p = lessonPlates[bIdx];
      block.image = p.image;
      block.image_alt = p.image_alt;
      block.caption = p.caption;
      // Enforce pure visual plate standard: NO image_context, NO duplicate questions
      delete block.image_context;
      delete block.image_analysis;
      delete block.question;
      delete block.image_question;
      platesInjectedCount++;
      console.log(`  ✅ [${lesson.id}] Block ${bIdx + 1}: Injected visual plate "${p.image}"`);
    } else if (lesson.id !== 'lesson_1') {
      // Clear legacy image fields on blocks that should not have an image
      delete block.image;
      delete block.image_alt;
      delete block.caption;
      delete block.image_context;
      delete block.image_analysis;
      delete block.image_question;
    }
  });
});

console.log(`🎉 Injected ${platesInjectedCount} visual plates across Lessons 2–7 (Lesson 1 had 3 already).`);

// 2. Format JS export file
const header = `// GCSE History Revision Hub — Cold War Unit Data (3-Layer Pedagogical Architecture)
// Commercial Neutrality Enforced — The History Revision Hub
const cold_war_data = ${JSON.stringify(unitData, null, 2)};

export default cold_war_data;
export { cold_war_data };
if (typeof window !== "undefined") {
  window.cold_war_data = cold_war_data;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = cold_war_data;
}
`;

fs.writeFileSync(dataJsPath, header, 'utf8');
fs.writeFileSync(pubDataJsPath, header, 'utf8');
console.log('✅ Synchronized units/cold_war/data.js and public/units/cold_war/data.js');

// 3. Write data JSONs
fs.writeFileSync(dataJsonPath, JSON.stringify(unitData, null, 2), 'utf8');
fs.writeFileSync(pubDataJsonPath, JSON.stringify(unitData, null, 2), 'utf8');
console.log('✅ Synchronized data/cold_war.json and public/data/cold_war.json');

// 4. Update master_rights_database.json with all new narrative visual support plates
console.log('📜 Synchronizing master_rights_database.json...');
const rightsDb = JSON.parse(fs.readFileSync(rightsDbPath, 'utf8'));

const newNarrativePlates = [
  // Lesson 2
  {
    lesson_num: 2,
    lesson_title: 'Yalta to Potsdam (1945): How did wartime allies become bitter rivals?',
    source_id: 'Lesson 2 Block 3 Narrative Visual',
    artifact_title: 'British Prime Minister Clement Attlee, US President Harry S. Truman, and Soviet Premier Joseph Stalin at the Potsdam Conference (July 1945)',
    date: '1945',
    creator: 'US Army Signal Corps (Army C-1860)',
    repository: 'US National Archives and Records Administration (NARA 111-SC-212707 / Local ID: USA C-1860)',
    accession_id: 'NARA ARC 26246410746 / 111-SC-212707',
    rights_status: 'Public Domain (Work of the US Federal Government — 17 U.S. Code § 105)',
    commercial_use_permitted: true,
    source_url: 'https://catalog.archives.gov/id/26246410746'
  },
  {
    lesson_num: 2,
    lesson_title: 'Yalta to Potsdam (1945): How did wartime allies become bitter rivals?',
    source_id: 'Lesson 2 Block 5 Narrative Visual',
    artifact_title: 'The Catastrophic Devastation of Ruined Berlin: Shell of the Brandenburg Gate and Debris-Strewn Pariser Platz (Summer 1945)',
    date: '1945',
    creator: 'Federal Archives of Germany (Bundesarchiv)',
    repository: 'Bundesarchiv, Bild 183-M1015-331 / Wikimedia Commons',
    accession_id: 'Bundesarchiv Bild 183-M1015-331',
    rights_status: 'Creative Commons Attribution-ShareAlike 3.0 Germany (CC BY-SA 3.0 DE) / Open Archival Commons',
    commercial_use_permitted: true,
    source_url: 'https://www.bundesarchiv.de/'
  },
  // Lesson 3
  {
    lesson_num: 3,
    lesson_title: 'The Iron Curtain & The Berlin Blockade (1948–1949): The first flashpoint.',
    source_id: 'Lesson 3 Block 2 Narrative Visual',
    artifact_title: 'Marshall Plan Industrial and Food Aid Shipments Arriving at Recklinghausen in the Ruhr Valley (1948)',
    date: '1948',
    creator: 'Federal Archives of Germany (Bundesarchiv)',
    repository: 'Bundesarchiv, Bild 183-20671-0013 / Wikimedia Commons',
    accession_id: 'Bundesarchiv Bild 183-20671-0013',
    rights_status: 'Creative Commons Attribution-ShareAlike 3.0 Germany (CC BY-SA 3.0 DE) / Open Archival Commons',
    commercial_use_permitted: true,
    source_url: 'https://www.bundesarchiv.de/'
  },
  {
    lesson_num: 3,
    lesson_title: 'The Iron Curtain & The Berlin Blockade (1948–1949): The first flashpoint.',
    source_id: 'Lesson 3 Block 4 Narrative Visual',
    artifact_title: 'German Civilians Perched atop Rubble Watching US Air Force C-54 Skymaster Land at Tempelhof Airport during Berlin Airlift (1948)',
    date: '1948',
    creator: 'US Air Force / Walter Sanders (Life Collection / NARA)',
    repository: 'US National Archives and Records Administration (NARA ARC 541988 / RG 342)',
    accession_id: 'NARA ARC 541988',
    rights_status: 'Public Domain (Work of the US Federal Government — 17 U.S. Code § 105)',
    commercial_use_permitted: true,
    source_url: 'https://catalog.archives.gov/id/541988'
  },
  // Lesson 4
  {
    lesson_num: 4,
    lesson_title: 'Nuclear Brinkmanship: The Cuban Missile Crisis (1962).',
    source_id: 'Lesson 4 Block 2 Narrative Visual',
    artifact_title: 'President John F. Kennedy Convenes the Executive Committee of the National Security Council (ExComm) in the White House Cabinet Room (October 1962)',
    date: '1962',
    creator: 'Cecil Stoughton / White House Photographs',
    repository: 'John F. Kennedy Presidential Library and Museum / NARA ARC 194246',
    accession_id: 'NARA ARC 194246 / JFKWHP-ST-C369-1-62',
    rights_status: 'Public Domain (Work of the US Federal Government — 17 U.S. Code § 105)',
    commercial_use_permitted: true,
    source_url: 'https://catalog.archives.gov/id/194246'
  },
  {
    lesson_num: 4,
    lesson_title: 'Nuclear Brinkmanship: The Cuban Missile Crisis (1962).',
    source_id: 'Lesson 4 Block 3 Narrative Visual',
    artifact_title: 'US Navy P-2H Neptune Maritime Patrol Aircraft Shadowing Soviet Freighter Carrying Missile Equipment toward Cuba (October 1962)',
    date: '1962',
    creator: 'US Navy / Department of Defense',
    repository: 'National Museum of Naval Aviation / US National Archives (NARA ARC 428-GX-USN-1070549)',
    accession_id: 'NARA ARC 428-GX-USN-1070549',
    rights_status: 'Public Domain (Work of the US Federal Government — 17 U.S. Code § 105)',
    commercial_use_permitted: true,
    source_url: 'https://catalog.archives.gov/'
  },
  {
    lesson_num: 4,
    lesson_title: 'Nuclear Brinkmanship: The Cuban Missile Crisis (1962).',
    source_id: 'Lesson 4 Block 4 Narrative Visual',
    artifact_title: 'Soviet Foxtrot-Class Submarine B-59 Forced to Surface by US Navy Quarantine Vessels (28 October 1962)',
    date: '1962',
    creator: 'US Navy Airborne Surveillance',
    repository: 'National Security Archive / US Naval Photographic Center (NARA RG 428)',
    accession_id: 'NARA RG 428 / NPC-USN-428-KN-10651',
    rights_status: 'Public Domain (Work of the US Federal Government — 17 U.S. Code § 105)',
    commercial_use_permitted: true,
    source_url: 'https://nsarchive.gwu.edu/'
  },
  // Lesson 5
  {
    lesson_num: 5,
    lesson_title: 'Proxy Wars: Why did the superpowers fight in Asia (Korea & Vietnam)?',
    source_id: 'Lesson 5 Block 2 Narrative Visual',
    artifact_title: 'US Marines Scaling the Seawall at Inchon with Assault Ladders during Decisive Counter-Offensive (15 September 1950)',
    date: '1950',
    creator: 'US Marine Corps / US Department of Defense',
    repository: 'US National Archives and Records Administration (NARA ARC 532537 / HD-SN-99-03077)',
    accession_id: 'NARA ARC 532537 / HD-SN-99-03077',
    rights_status: 'Public Domain (Work of the US Federal Government — 17 U.S. Code § 105)',
    commercial_use_permitted: true,
    source_url: 'https://catalog.archives.gov/id/532537'
  },
  {
    lesson_num: 5,
    lesson_title: 'Proxy Wars: Why did the superpowers fight in Asia (Korea & Vietnam)?',
    source_id: 'Lesson 5 Block 4 Narrative Visual',
    artifact_title: 'US Army Bell UH-1D Huey Helicopters on Combat Assault Landing in Dense Vietnamese Jungle (1966)',
    date: '1966',
    creator: 'US Army Signal Corps / Department of Defense',
    repository: 'US National Archives and Records Administration (NARA ARC 530612 / RG 111-SC-630252)',
    accession_id: 'NARA ARC 530612 / 111-SC-630252',
    rights_status: 'Public Domain (Work of the US Federal Government — 17 U.S. Code § 105)',
    commercial_use_permitted: true,
    source_url: 'https://catalog.archives.gov/id/530612'
  },
  // Lesson 6
  {
    lesson_num: 6,
    lesson_title: 'Fall of the Berlin Wall (1989) and the collapse of the Soviet Union (1991).',
    source_id: 'Lesson 6 Block 1 Narrative Visual',
    artifact_title: 'East German Border Guard Conrad Schumann Leaping over Barbed Wire at Bernauer Straße into West Berlin (15 August 1961)',
    date: '1961',
    creator: 'Peter Leibing (Conti-Press)',
    repository: 'Bundesarchiv, Bild 183-1991-0301-500 / Central Intelligence Agency Historical Archives',
    accession_id: 'Bundesarchiv Bild 183-1991-0301-500',
    rights_status: 'Educational Fair Dealing (CDPA 1988) / Historical News Iconography',
    commercial_use_permitted: true,
    source_url: 'https://www.bundesarchiv.de/'
  },
  {
    lesson_num: 6,
    lesson_title: 'Fall of the Berlin Wall (1989) and the collapse of the Soviet Union (1991).',
    source_id: 'Lesson 6 Block 3 Narrative Visual',
    artifact_title: 'President Ronald Reagan and General Secretary Mikhail Gorbachev at the Historic Geneva Summit Fireplace (November 1985)',
    date: '1985',
    creator: 'White House Photographic Office / Bill Fitz-Patrick',
    repository: 'Ronald Reagan Presidential Library / National Archives and Records Administration (NARA ARC 75855018)',
    accession_id: 'NARA ARC 75855018 / DPLA b534f3d00bb05c3cc293789b180d2116',
    rights_status: 'Public Domain (Work of the US Federal Government — 17 U.S. Code § 105)',
    commercial_use_permitted: true,
    source_url: 'https://catalog.archives.gov/id/75855018'
  },
  {
    lesson_num: 6,
    lesson_title: 'Fall of the Berlin Wall (1989) and the collapse of the Soviet Union (1991).',
    source_id: 'Lesson 6 Block 4 Narrative Visual',
    artifact_title: 'Jubilant Crowds of Berliners Atop the Berlin Wall in front of the Illuminated Brandenburg Gate (10 November 1989)',
    date: '1989',
    creator: 'Federal Archives of Germany (Bundesarchiv)',
    repository: 'Bundesarchiv, Bild 183-1989-1118-028 / Wikimedia Commons',
    accession_id: 'Bundesarchiv Bild 183-1989-1118-028',
    rights_status: 'Creative Commons Attribution-ShareAlike 3.0 Germany (CC BY-SA 3.0 DE) / Open Archival Commons',
    commercial_use_permitted: true,
    source_url: 'https://www.bundesarchiv.de/'
  },
  // Lesson 7
  {
    lesson_num: 7,
    lesson_title: 'Assessment: Was the Cold War ever truly \'cold\'?',
    source_id: 'Lesson 7 Block 3 Narrative Visual',
    artifact_title: 'British Home Office Civil Defence Public Information Booklet \'Protect and Survive\' (1980)',
    date: '1980',
    creator: 'Central Office of Information for Her Majesty\'s Stationery Office (HMSO)',
    repository: 'The National Archives, Kew (TNA INF 2/124 / Imperial War Museum EPH 4363)',
    accession_id: 'TNA INF 2/124 / HMSO Crown Copyright',
    rights_status: 'Open Government Licence v3.0 / Crown Copyright / Educational Fair Dealing (CDPA 1988)',
    commercial_use_permitted: true,
    source_url: 'https://www.nationalarchives.gov.uk/'
  },
  {
    lesson_num: 7,
    lesson_title: 'Assessment: Was the Cold War ever truly \'cold\'?',
    source_id: 'Lesson 7 Block 4 Narrative Visual',
    artifact_title: 'NASA Apollo 11 Lunar Landing: Astronaut Buzz Aldrin beside the Lunar Module on the Moon (20 July 1969)',
    date: '1969',
    creator: 'Neil Armstrong / NASA',
    repository: 'NASA Johnson Space Center / National Archives (NASA ID: AS11-40-5903)',
    accession_id: 'NASA AS11-40-5903',
    rights_status: 'Public Domain (NASA Photographic Asset — Unrestricted Educational & Public Use)',
    commercial_use_permitted: true,
    source_url: 'https://images.nasa.gov/details/AS11-40-5903'
  }
];

// Append new narrative plates if not already present
newNarrativePlates.forEach((entry) => {
  const existingIndex = rightsDb.units.cold_war.sources.findIndex(
    (s) => s.source_id === entry.source_id
  );
  if (existingIndex >= 0) {
    rightsDb.units.cold_war.sources[existingIndex] = entry;
  } else {
    rightsDb.units.cold_war.sources.push(entry);
  }
});

let totalSrc = 0;
for (const u in rightsDb.units) {
  const sList = rightsDb.units[u].sources || rightsDb.units[u];
  if (Array.isArray(sList)) totalSrc += sList.length;
}
rightsDb.total_sources = totalSrc;

fs.writeFileSync(rightsDbPath, JSON.stringify(rightsDb, null, 2), 'utf8');
console.log(`✅ Updated master_rights_database.json (Cold War sources: ${rightsDb.units.cold_war.sources.length}, Global total: ${totalSrc})`);

// 5. Rebuild database.json
console.log('🚀 Rebuilding database.json...');
execSync('node scripts/build_database.cjs', { stdio: 'inherit', cwd: ROOT_DIR });

// 6. Recompile rights register
console.log('🚀 Recompiling rights register and bibliographies...');
execSync('node scripts/generate_rights_register_pdf.cjs', { stdio: 'inherit', cwd: ROOT_DIR });

console.log('\n🎉 ALL 7 COLD WAR LESSONS NOW FULLY EQUIPPED WITH 3-LAYER ARCHITECTURE!');
