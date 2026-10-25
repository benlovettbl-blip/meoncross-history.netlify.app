const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const { coldWarVideos } = require('./cold_war_full_video_dictionary.cjs');

const ROOT_DIR = path.resolve(__dirname, '..');
const dataFile = path.join(ROOT_DIR, 'units', 'cold_war', 'data.js');
const publicDataFile = path.join(ROOT_DIR, 'public', 'units', 'cold_war', 'data.js');
const jsonFile = path.join(ROOT_DIR, 'data', 'cold_war.json');
const publicJsonFile = path.join(ROOT_DIR, 'public', 'data', 'cold_war.json');

console.log('🔄 Loading units/cold_war/data.js...');
const rawUnit = require(dataFile).unitData;

rawUnit.lessons.forEach((l, idx) => {
  const lId = l.id || `lesson_${idx + 1}`;
  l.id = lId;
  if (coldWarVideos[lId]) {
    l.video = coldWarVideos[lId];
    console.log(`✅ Injected ${l.video.length} videos into ${lId} (${l.title})`);
  } else {
    throw new Error(`Missing videos for Cold War ${lId}`);
  }
});

const fileContent = `const unitData = ${JSON.stringify(rawUnit, null, 2)};\n\nexport { unitData };\nexport default unitData;\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = unitData;\n}\n`;

fs.writeFileSync(dataFile, fileContent, 'utf8');
console.log('✅ Updated units/cold_war/data.js');

fs.writeFileSync(publicDataFile, fileContent, 'utf8');
console.log('✅ Updated public/units/cold_war/data.js');

// Sync to data/cold_war.json and public/data/cold_war.json
const payload = { id: 'cold_war', data: rawUnit };
fs.writeFileSync(jsonFile, JSON.stringify(payload, null, 2), 'utf8');
fs.writeFileSync(publicJsonFile, JSON.stringify(payload, null, 2), 'utf8');
console.log('✅ Synced data/cold_war.json and public/data/cold_war.json');

// Rebuild public/database.json
console.log('\n🔄 Rebuilding public/database.json...');
execSync('node scripts/build_database.cjs', { stdio: 'inherit', cwd: ROOT_DIR });

console.log('\n🎉 Successfully upgraded all 7 Cold War lessons with gold-standard multi-lens & proportional videos!');
