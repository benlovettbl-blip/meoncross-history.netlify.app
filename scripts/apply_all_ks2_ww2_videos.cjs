/**
 * scripts/apply_all_ks2_ww2_videos.cjs
 *
 * Applies the upgraded video dictionary to KS2 World War Two in units/ and data/
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = path.join(__dirname, '..');
const ks2Videos = require('./ks2_ww2_full_video_dictionary.cjs');

async function run() {
  console.log('======================================================');
  console.log('🪖 APPLYING KS2 WW2 HOME FRONT VIDEO UPGRADE');
  console.log('======================================================');

  // 1. Update units/ks2_ww2/data.js
  const ks2DataPath = path.join(ROOT_DIR, 'units', 'ks2_ww2', 'data.js');
  const ks2Url = 'file:///' + ks2DataPath.replace(/\\/g, '/');
  const ks2Mod = await import(ks2Url);
  const ks2Data = ks2Mod.default || ks2Mod.unitData;

  let totalUpdated = 0;
  ks2Data.lessons.forEach((lesson) => {
    if (ks2Videos[lesson.id]) {
      lesson.video = ks2Videos[lesson.id];
      delete lesson.extra_videos;
      totalUpdated += lesson.video.length;
      console.log(`  ✅ Lesson ${lesson.id}: Injected ${lesson.video.length} scaffolded videos`);
    }
  });

  const ks2FileContent = `const unitData = ${JSON.stringify(ks2Data, null, 2)};\n\nexport default unitData;\nexport { unitData };\n`;
  fs.writeFileSync(ks2DataPath, ks2FileContent, 'utf8');
  console.log(`\nWritten updated units/ks2_ww2/data.js (${totalUpdated} videos total)`);

  // 2. Update data/ks2_ww2.json and public/data/ks2_ww2.json
  ['data/ks2_ww2.json', 'public/data/ks2_ww2.json'].forEach((rel) => {
    const p = path.join(ROOT_DIR, rel);
    if (fs.existsSync(p)) {
      const raw = JSON.parse(fs.readFileSync(p, 'utf8'));
      if (raw.data && raw.data.lessons) {
        raw.data.lessons = ks2Data.lessons;
      } else if (raw.lessons) {
        raw.lessons = ks2Data.lessons;
      }
      fs.writeFileSync(p, JSON.stringify(raw, null, 2), 'utf8');
      console.log(`  ✅ Synced ${rel}`);
    }
  });

  // 3. Rebuild public/database.json
  console.log('\nRebuilding public/database.json...');
  execSync('node scripts/build_database.cjs', { cwd: ROOT_DIR, stdio: 'inherit' });
  console.log('✅ KS2 WW2 video upgrade complete!\n');
}

run().catch((err) => {
  console.error('❌ Failed:', err);
  process.exit(1);
});
