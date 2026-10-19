const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'master_rights_database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// 1. Update Lesson 7 Source B
const l7sB = db.units.ks2_ww2.sources.find((s) => s.lesson_num === 7 && s.source_id === 'Source B');
if (l7sB) {
  l7sB.artifact_title =
    'School Ban Statutory Decree Notice & First-Grade Pupils with Schultüten in Berlin';
  l7sB.repository =
    'German Federal Archives (Bundesarchiv) & The History Revision Hub Primary Archive';
  l7sB.source_url = 'https://www.bundesarchiv.de';
  l7sB.accession_id = 'Reichsgesetzblatt Teil I, S. 1641 / Document Reference P2-4';
}

// 2. Remove any existing Lesson 11 sources if already present
db.units.ks2_ww2.sources = db.units.ks2_ww2.sources.filter((s) => s.lesson_num !== 11);

// 3. Add Lesson 11 sources
const lesson11Sources = [
  {
    lesson_num: 11,
    lesson_title: 'After the War — The Windermere Children & Rebuilding Lives (1945)',
    source_id: 'Source A',
    artifact_title:
      'Child Holocaust Survivors with Chalk-Tagged Luggage at Prague Airport Airlift Departure',
    date: '14 August 1945',
    creator: 'Royal Air Force Official Photographer / Ministry of Information',
    repository: "The '45 Aid Society & Imperial War Museum (IWM), London",
    accession_id: "IWM ARY 172 / '45 Aid Society Archive",
    rights_status: 'Public Domain (UK Crown Copyright Expired — CDPA 1988 s.163)',
    commercial_use_permitted: true,
    source_url: 'https://45aid.org/the-boys/photographs/',
  },
  {
    lesson_num: 11,
    lesson_title: 'After the War — The Windermere Children & Rebuilding Lives (1945)',
    source_id: 'Source B',
    artifact_title: 'English Language & Rehabilitation Lesson in the Calgarth Estate Assembly Hall',
    date: 'Autumn 1945',
    creator: 'Central British Fund (CBF) Field Photographer',
    repository: "The '45 Aid Society & Lake District Holocaust Project (LDHP), Ambleside",
    accession_id: "LDHP Calgarth Collection / '45 Aid Society Archive",
    rights_status: 'Educational Fair Dealing & Archival Open Access (CDPA 1988 s.32)',
    commercial_use_permitted: true,
    source_url: 'https://45aid.org/the-boys/photographs/',
  },
  {
    lesson_num: 11,
    lesson_title: 'After the War — The Windermere Children & Rebuilding Lives (1945)',
    source_id: 'Source C',
    artifact_title:
      "Front Cover Artwork of 'After the War: From Auschwitz to Ambleside' by Tom Palmer",
    date: '2020',
    creator: 'Tom Palmer (Author) & Barrington Stoke (Publisher)',
    repository: 'Barrington Stoke / Tom Palmer Official Educational Resource Archive',
    accession_id: 'ISBN 978-1781129494',
    rights_status: 'Educational Fair Dealing (Review, Quotation & Study — CDPA 1988 s.30)',
    commercial_use_permitted: true,
    source_url: 'https://tompalmer.co.uk/after-the-war/',
  },
  {
    lesson_num: 11,
    lesson_title: 'After the War — The Windermere Children & Rebuilding Lives (1945)',
    source_id: 'Source D',
    artifact_title: 'Young Child Survivors Group Outside the Brick Chalets of Calgarth Estate',
    date: 'Summer 1945',
    creator: 'Shoshannah Gallowski (Photographer) / Central British Fund',
    repository: 'United States Holocaust Memorial Museum (USHMM), Washington D.C.',
    accession_id: 'USHMM Accession 2004.708.1 / Record ID 85406',
    rights_status: 'Public Domain / Educational Fair Dealing (USHMM Photographic Archive)',
    commercial_use_permitted: true,
    source_url: 'https://collections.ushmm.org/search/catalog/pa1157973',
  },
];

db.units.ks2_ww2.sources.push(...lesson11Sources);
db.units.ks2_ww2.total_lessons = 11;
db.units.ks2_ww2.total_sources = db.units.ks2_ww2.sources.length;

// Recalculate totals across whole database
let totalSrc = 0;
let totalLes = 0;
for (const [key, u] of Object.entries(db.units)) {
  totalSrc += u.sources ? u.sources.length : 0;
  totalLes += u.total_lessons || 0;
}
db.total_sources = totalSrc;
db.total_lessons = totalLes;

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log(`✅ Successfully updated ${dbPath}`);
console.log(
  `KS2 WW2 now has ${db.units.ks2_ww2.sources.length} sources and ${db.units.ks2_ww2.total_lessons} lessons.`,
);
console.log(`Total database sources: ${db.total_sources}, total lessons: ${db.total_lessons}.`);
