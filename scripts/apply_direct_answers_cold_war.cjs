/**
 * scripts/apply_direct_answers_cold_war.cjs
 *
 * Applies the 35 direct, question-answering model answers from
 * scripts/cold_war_direct_answers_dictionary.json to:
 * - units/cold_war/data.js (both lesson.sources and lesson.narrative_blocks[].source)
 * - public/units/cold_war/data.js
 * - data/cold_war.json
 * - public/data/cold_war.json
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const dictPath = path.join(ROOT_DIR, 'scripts', 'cold_war_direct_answers_dictionary.json');
const dataJsPath = path.join(ROOT_DIR, 'units', 'cold_war', 'data.js');
const pubDataJsPath = path.join(ROOT_DIR, 'public', 'units', 'cold_war', 'data.js');
const dataJsonPath = path.join(ROOT_DIR, 'data', 'cold_war.json');
const pubJsonPath = path.join(ROOT_DIR, 'public', 'data', 'cold_war.json');

const answersDict = JSON.parse(fs.readFileSync(dictPath, 'utf8'));

// Load existing cold_war_data
const mod = require(dataJsPath);
const coldWarData = mod.cold_war_data || mod.default || mod;

if (!coldWarData || !coldWarData.lessons) {
  console.error('❌ Could not load cold_war_data properly.');
  process.exit(1);
}

let totalSourcesUpdated = 0;
let totalBlocksUpdated = 0;

coldWarData.lessons.forEach((lesson, lIdx) => {
  const lessonAnswers = answersDict[lIdx];
  if (!lessonAnswers) {
    console.warn(`⚠️ No answers found for lesson index ${lIdx}`);
    return;
  }

  // 1. Update lesson.sources
  if (Array.isArray(lesson.sources)) {
    lesson.sources.forEach((source) => {
      const letter = source.letter || (source.id ? source.id.slice(-1).toUpperCase() : null);
      if (letter && lessonAnswers[letter]) {
        const rawBullets = lessonAnswers[letter];
        const formattedBullets = rawBullets.map((raw) => {
          const colonIdx = raw.indexOf(':');
          if (colonIdx !== -1) {
            return {
              label: raw.slice(0, colonIdx).trim(),
              text: raw.slice(colonIdx + 1).trim()
            };
          }
          return { label: '', text: raw.trim() };
        });

        if (!source.utility_enquiry) {
          source.utility_enquiry = {};
        }
        source.utility_enquiry.bullet_points = formattedBullets;
        totalSourcesUpdated++;
      }
    });
  }

  // 2. Update narrative_blocks[].source
  if (Array.isArray(lesson.narrative_blocks)) {
    lesson.narrative_blocks.forEach((block) => {
      if (block.source) {
        const source = block.source;
        const letter = source.letter || (source.id ? source.id.slice(-1).toUpperCase() : null);
        if (letter && lessonAnswers[letter]) {
          const rawBullets = lessonAnswers[letter];
          const formattedBullets = rawBullets.map((raw) => {
            const colonIdx = raw.indexOf(':');
            if (colonIdx !== -1) {
              return {
                label: raw.slice(0, colonIdx).trim(),
                text: raw.slice(colonIdx + 1).trim()
              };
            }
            return { label: '', text: raw.trim() };
          });

          if (!source.utility_enquiry) {
            source.utility_enquiry = {};
          }
          source.utility_enquiry.bullet_points = formattedBullets;
          totalBlocksUpdated++;
        }
      }
    });
  }
});

console.log(`✅ Formatted and updated ${totalSourcesUpdated} lesson sources and ${totalBlocksUpdated} narrative block sources.`);

// Function to generate data.js content
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

// 1. Write units/cold_war/data.js
fs.writeFileSync(dataJsPath, generateDataJsContent(coldWarData), 'utf8');
console.log(`✅ Saved ${dataJsPath}`);

// 2. Write public/units/cold_war/data.js
fs.writeFileSync(pubDataJsPath, generateDataJsContent(coldWarData), 'utf8');
console.log(`✅ Saved ${pubDataJsPath}`);

// 3. Write data/cold_war.json
fs.writeFileSync(dataJsonPath, JSON.stringify({ id: 'cold_war', data: coldWarData }, null, 2), 'utf8');
console.log(`✅ Saved ${dataJsonPath}`);

// 4. Write public/data/cold_war.json
fs.writeFileSync(pubJsonPath, JSON.stringify(coldWarData, null, 2), 'utf8');
console.log(`✅ Saved ${pubJsonPath}`);

console.log('🎉 All Cold War model answers successfully updated to direct answers across all files!');
