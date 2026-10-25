const fs = require('fs');
const path = require('path');

const mod = require('../units/cold_war/data.js');
const unitData = mod.default || mod.cold_war_data || mod;

let syncCount = 0;
unitData.lessons.forEach((lesson, lIdx) => {
  if (Array.isArray(lesson.narrative_blocks) && Array.isArray(lesson.sources)) {
    lesson.narrative_blocks.forEach((block, bIdx) => {
      if (block.source && bIdx < lesson.sources.length) {
        const masterSource = lesson.sources[bIdx];
        block.source = JSON.parse(JSON.stringify(masterSource));
        syncCount++;
      }
    });
  }
});

console.log('Successfully synced ' + syncCount + ' narrative block sources!');

const jsonStr = JSON.stringify(unitData, null, 2);
const jsExport = 'const cold_war_data = ' + jsonStr + ';\n\nexport default cold_war_data;\nexport { cold_war_data };\nif (typeof window !== "undefined") {\n  window.cold_war_data = cold_war_data;\n}\nif (typeof module !== "undefined" && module.exports) {\n  module.exports = cold_war_data;\n}\n';

fs.writeFileSync(path.join(__dirname, '../units/cold_war/data.js'), jsExport, 'utf8');
fs.writeFileSync(path.join(__dirname, '../public/units/cold_war/data.js'), jsExport, 'utf8');
fs.writeFileSync(path.join(__dirname, '../public/data/cold_war.json'), jsonStr, 'utf8');
console.log('SUCCESSFULLY_SAVED_ALL_COLD_WAR_FILES');
