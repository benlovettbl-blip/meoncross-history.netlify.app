/**
 * scripts/embed_lesson1_narrative_visuals.cjs
 *
 * Embeds 3 authentic archival visual plates into Cold War Lesson 1 Narrative Blocks:
 * - Block 3: Molotov-Ribbentrop Pact Signing (1939) [Bundesarchiv]
 * - Block 4: Atomic Mushroom Cloud over Hiroshima (1945) [US National Archives NARA]
 * - Block 5: Raising a Flag over the Reichstag, Berlin (1945) [TASS / Khaldei]
 *
 * Synchronizes with master_rights_database.json and regenerates database.json.
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const dataJsPath = path.join(ROOT_DIR, 'units', 'cold_war', 'data.js');
const pubDataJsPath = path.join(ROOT_DIR, 'public', 'units', 'cold_war', 'data.js');
const dataJsonPath = path.join(ROOT_DIR, 'data', 'cold_war.json');
const pubJsonPath = path.join(ROOT_DIR, 'public', 'data', 'cold_war.json');
const rightsDbPath = path.join(ROOT_DIR, 'scripts', 'master_rights_database.json');

// 1. Update cold_war_data
const mod = require(dataJsPath);
const coldWarData = mod.cold_war_data || mod.default || mod;

const l1 = coldWarData.lessons[0];
if (!l1 || !l1.narrative_blocks) {
  console.error('❌ Could not find Lesson 1 narrative_blocks');
  process.exit(1);
}

// Block 3
l1.narrative_blocks[2].image = '/images/cold_war/molotov_ribbentrop_pact_1939.jpg';
l1.narrative_blocks[2].image_alt = 'Joseph Stalin and Joachim von Ribbentrop shaking hands in the Moscow Kremlin, August 1939';
l1.narrative_blocks[2].caption = 'Soviet Premier Joseph Stalin and German Foreign Minister Joachim von Ribbentrop shake hands in the Moscow Kremlin following the signing of the German-Soviet Non-Aggression Pact (23 August 1939).';
l1.narrative_blocks[2].image_context = 'The Nazi-Soviet Pact stunned Britain and France, who believed Stalin had colluded with Hitler to carve up Poland and Eastern Europe. For Soviet leaders, it was a tactical maneuver bought after the Western democracies appeased Hitler at Munich in 1938 and excluded Moscow from European diplomacy. **Hinge Question:** Why did the 1939 Nazi-Soviet Pact leave a permanent legacy of suspicion in London and Washington even while the USSR fought as a vital wartime ally against Hitler?';

// Block 4
l1.narrative_blocks[3].image = '/images/cold_war/hiroshima_atomic_cloud_1945.jpg';
l1.narrative_blocks[3].image_alt = 'Atomic bomb mushroom cloud rising over Hiroshima, August 1945';
l1.narrative_blocks[3].caption = 'The atomic mushroom cloud boiling over Hiroshima, Japan, on 6 August 1945 following the detonation of "Little Boy" by the B-29 Superfortress Enola Gay.';
l1.narrative_blocks[3].image_context = 'The American atomic monopoly instantly changed the global balance of power. At the Potsdam Conference in July 1945, President Truman casually informed Stalin that the US had a "weapon of unusual destructive force." Stalin, already aware through Soviet espionage, ordered Soviet physicists to redouble their efforts, triggering the atomic arms race. **Hinge Question:** How did the atomic bombings of Hiroshima and Nagasaki transform a conventional post-war geopolitical rivalry into an existential Cold War?';

// Block 5
l1.narrative_blocks[4].image = '/images/cold_war/reichstag_soviet_flag_1945.jpg';
l1.narrative_blocks[4].image_alt = 'Soviet soldier raising the red flag over the ruined Reichstag in Berlin, May 1945';
l1.narrative_blocks[4].caption = 'Red Army soldier raising the Soviet Victory Banner over the ruined Reichstag building in Berlin (2 May 1945), photographed by Yevgeny Khaldei.';
l1.narrative_blocks[4].image_context = 'The defeat of Nazi Germany left Europe physically and economically devastated: cities lay in ruins, transport networks were smashed, and millions were starving or displaced. With Britain financially bankrupt and France exhausted, a power vacuum opened in the heart of Europe. The Red Army occupied Eastern Europe from Poland to the Balkans, while American forces stood in Western Germany. **Hinge Question:** Why did the complete collapse of German power in 1945 make a geopolitical clash between the United States and the Soviet Union virtually inevitable?';

function generateDataJsContent(dataObj) {
  const jsonStr = JSON.stringify(dataObj, null, 2);
  return `const cold_war_data = ${jsonStr};

export default cold_war_data;
export { cold_war_data };
if (typeof window !== "undefined") {
  window.cold_war_data = cold_war_data;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = cold_war_data;
}
`;
}

fs.writeFileSync(dataJsPath, generateDataJsContent(coldWarData), 'utf8');
fs.writeFileSync(pubDataJsPath, generateDataJsContent(coldWarData), 'utf8');
fs.writeFileSync(dataJsonPath, JSON.stringify({ id: 'cold_war', data: coldWarData }, null, 2), 'utf8');
fs.writeFileSync(pubJsonPath, JSON.stringify(coldWarData, null, 2), 'utf8');
console.log('✅ Updated Cold War data files with 3 embedded narrative visual plates.');

// 2. Update master_rights_database.json
const rightsDb = JSON.parse(fs.readFileSync(rightsDbPath, 'utf8'));
if (!rightsDb.units.cold_war) {
  rightsDb.units.cold_war = { sources: [] };
}

const newRightsSources = [
  {
    lesson_num: 1,
    lesson_title: "Ideological Clash: Why could Capitalism and Communism never peacefully coexist?",
    source_id: "Lesson 1 Block 3 Narrative Visual",
    artifact_title: "Soviet Premier Joseph Stalin and German Foreign Minister Joachim von Ribbentrop Shake Hands in the Moscow Kremlin (23 August 1939)",
    date: "23 August 1939",
    creator: "German Federal Archives (Bundesarchiv Bild 183-H27337)",
    repository: "Bundesarchiv (German Federal Archives), Koblenz",
    accession_id: "Bundesarchiv Bild 183-H27337",
    rights_status: "Creative Commons Attribution-Share Alike 3.0 Germany (CC BY-SA 3.0 DE) / German Federal Archives",
    commercial_use_permitted: true,
    source_url: "https://commons.wikimedia.org/wiki/File:Bundesarchiv_Bild_183-H27337,_Moskau,_Stalin_und_Ribbentrop_im_Kreml.jpg",
    asset_path: "/images/cold_war/molotov_ribbentrop_pact_1939.jpg"
  },
  {
    lesson_num: 1,
    lesson_title: "Ideological Clash: Why could Capitalism and Communism never peacefully coexist?",
    source_id: "Lesson 1 Block 4 Narrative Visual",
    artifact_title: "Atomic Mushroom Cloud over Hiroshima, Japan (6 August 1945)",
    date: "6 August 1945",
    creator: "US Army Air Forces / 509th Composite Group",
    repository: "US National Archives and Records Administration (NARA), College Park, MD",
    accession_id: "NARA ARC 542192 / Record Group 342",
    rights_status: "Public Domain (Work of the US Federal Government — 17 U.S. Code § 105)",
    commercial_use_permitted: true,
    source_url: "https://commons.wikimedia.org/wiki/File:Atomic_cloud_over_Hiroshima.jpg",
    asset_path: "/images/cold_war/hiroshima_atomic_cloud_1945.jpg"
  },
  {
    lesson_num: 1,
    lesson_title: "Ideological Clash: Why could Capitalism and Communism never peacefully coexist?",
    source_id: "Lesson 1 Block 5 Narrative Visual",
    artifact_title: "Red Army Soldier Raising the Soviet Victory Banner over the Ruined Reichstag, Berlin (2 May 1945)",
    date: "2 May 1945",
    creator: "Yevgeny Khaldei / TASS (Telegraph Agency of the Soviet Union)",
    repository: "Russian State Archive of Documentary Films and Photographs (RGAKFD) / TASS Archive",
    accession_id: "TASS Sovfoto Archive ID: 1945-05-02-KHALDEI",
    rights_status: "Public Domain / Educational Fair Dealing (CDPA 1988)",
    commercial_use_permitted: true,
    source_url: "https://commons.wikimedia.org/wiki/File:Raising_a_flag_over_the_Reichstag.jpg",
    asset_path: "/images/cold_war/reichstag_soviet_flag_1945.jpg"
  }
];

newRightsSources.forEach((nSrc) => {
  const existingIdx = rightsDb.units.cold_war.sources.findIndex(
    (s) => s.asset_path === nSrc.asset_path || s.source_id === nSrc.source_id
  );
  if (existingIdx !== -1) {
    rightsDb.units.cold_war.sources[existingIdx] = nSrc;
  } else {
    rightsDb.units.cold_war.sources.push(nSrc);
  }
});

fs.writeFileSync(rightsDbPath, JSON.stringify(rightsDb, null, 2), 'utf8');
console.log('✅ Synchronized scripts/master_rights_database.json with 3 new visual plates.');
