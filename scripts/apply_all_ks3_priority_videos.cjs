const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const { greatWarVideos } = require('./great_war_full_video_dictionary.cjs');
const { greatWarPart2Videos } = require('./great_war_part2_full_video_dictionary.cjs');
const { theShoahVideos } = require('./the_shoah_full_video_dictionary.cjs');

const ROOT_DIR = path.resolve(__dirname, '..');

// Helper to ensure parent directory exists
function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// 1. UPDATE GREAT WAR (PART 1: CAUSES)
console.log('🔄 Upgrading KS3 Great War Part 1 (Causes)...');
const gwDataPath = path.join(ROOT_DIR, 'units', 'great_war', 'data.js');
const gwMod = require(gwDataPath);
const gwData = gwMod.unitData || gwMod.default || gwMod;

gwData.lessons.forEach((l, idx) => {
  const lId = l.id || `lesson_${idx + 1}`;
  l.id = lId;
  if (greatWarVideos[lId]) {
    l.video = greatWarVideos[lId];
    delete l.extra_videos; // Consolidate all videos into single source of truth
    console.log(`  ✅ Great War Part 1: ${lId} -> ${l.video.length} videos`);
  } else {
    throw new Error(`Missing videos for Great War ${lId}`);
  }
});

const gwContent = `const unitData = ${JSON.stringify(gwData, null, 2)};\n\nexport { unitData };\nexport default unitData;\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = unitData;\n}\n`;

fs.writeFileSync(gwDataPath, gwContent, 'utf8');
const gwPubDataPath = path.join(ROOT_DIR, 'public', 'units', 'great_war', 'data.js');
ensureDir(gwPubDataPath);
fs.writeFileSync(gwPubDataPath, gwContent, 'utf8');

const gwJsonPayload = { id: 'great_war', data: gwData };
fs.writeFileSync(path.join(ROOT_DIR, 'data', 'great_war.json'), JSON.stringify(gwJsonPayload, null, 2), 'utf8');
fs.writeFileSync(path.join(ROOT_DIR, 'public', 'data', 'great_war.json'), JSON.stringify(gwJsonPayload, null, 2), 'utf8');
console.log('✅ Great War Part 1 saved and synced.');

// 2. UPDATE GREAT WAR PART 2 (WESTERN FRONT & HOME FRONT)
console.log('\n🔄 Upgrading KS3 Great War Part 2 (Western Front & Home Front)...');
const gw2DataPath = path.join(ROOT_DIR, 'units', 'great_war_part2', 'data.js');
const gw2Mod = require(gw2DataPath);
const gw2Data = gw2Mod.unitData || gw2Mod.default || gw2Mod;

gw2Data.lessons.forEach((l, idx) => {
  const lId = l.id || `lesson_${idx + 1}`;
  l.id = lId;
  if (greatWarPart2Videos[lId]) {
    l.video = greatWarPart2Videos[lId];
    delete l.extra_videos;
    console.log(`  ✅ Great War Part 2: ${lId} -> ${l.video.length} videos`);
  } else {
    throw new Error(`Missing videos for Great War Part 2 ${lId}`);
  }
});

const gw2Content = `const unitData = ${JSON.stringify(gw2Data, null, 2)};\n\nexport { unitData };\nexport default unitData;\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = unitData;\n}\n`;

fs.writeFileSync(gw2DataPath, gw2Content, 'utf8');
const gw2PubDataPath = path.join(ROOT_DIR, 'public', 'units', 'great_war_part2', 'data.js');
ensureDir(gw2PubDataPath);
fs.writeFileSync(gw2PubDataPath, gw2Content, 'utf8');

const gw2JsonPayload = { id: 'great_war_part2', data: gw2Data };
fs.writeFileSync(path.join(ROOT_DIR, 'data', 'great_war_part2.json'), JSON.stringify(gw2JsonPayload, null, 2), 'utf8');
fs.writeFileSync(path.join(ROOT_DIR, 'public', 'data', 'great_war_part2.json'), JSON.stringify(gw2JsonPayload, null, 2), 'utf8');
console.log('✅ Great War Part 2 saved and synced.');

// 3. UPDATE THE SHOAH
console.log('\n🔄 Upgrading KS3 The Shoah (Holocaust Education)...');
const tsDataPath = path.join(ROOT_DIR, 'units', 'the_shoah', 'data.js');
const tsMod = require(tsDataPath);
const tsData = tsMod.unitData || tsMod.default || tsMod;

tsData.lessons.forEach((l, idx) => {
  const lId = l.id || `lesson_${idx + 1}`;
  l.id = lId;
  if (theShoahVideos[lId]) {
    l.video = theShoahVideos[lId];
    delete l.extra_videos;
    console.log(`  ✅ The Shoah: ${lId} -> ${l.video.length} videos`);
  } else {
    throw new Error(`Missing videos for The Shoah ${lId}`);
  }
});

const tsContent = `const unitData = ${JSON.stringify(tsData, null, 2)};\n\nexport { unitData };\nexport default unitData;\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = unitData;\n}\n`;

fs.writeFileSync(tsDataPath, tsContent, 'utf8');
const tsPubDataPath = path.join(ROOT_DIR, 'public', 'units', 'the_shoah', 'data.js');
ensureDir(tsPubDataPath);
fs.writeFileSync(tsPubDataPath, tsContent, 'utf8');

const tsJsonPayload = { id: 'the_shoah', data: tsData };
fs.writeFileSync(path.join(ROOT_DIR, 'data', 'the_shoah.json'), JSON.stringify(tsJsonPayload, null, 2), 'utf8');
fs.writeFileSync(path.join(ROOT_DIR, 'public', 'data', 'the_shoah.json'), JSON.stringify(tsJsonPayload, null, 2), 'utf8');
console.log('✅ The Shoah saved and synced.');

// 4. REBUILD GLOBAL DATABASE
console.log('\n🔄 Rebuilding public/database.json...');
execSync('node scripts/build_database.cjs', { stdio: 'inherit', cwd: ROOT_DIR });

console.log('\n🎉 Successfully upgraded Great War 1, Great War 2, and The Shoah with gold-standard multi-lens & proportional videos!');
