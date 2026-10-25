/**
 * scripts/apply_all_medieval_england_videos.cjs
 *
 * Applies the upgraded video dictionary to Medieval England in units/ and data/
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = path.join(__dirname, '..');
const medievalVideos = require('./medieval_england_full_video_dictionary.cjs');

async function run() {
  console.log('======================================================');
  console.log('🏰 APPLYING MEDIEVAL ENGLAND VIDEO UPGRADE');
  console.log('======================================================');

  // 1. Update units/medieval_england/data.js
  const meDataPath = path.join(ROOT_DIR, 'units', 'medieval_england', 'data.js');
  const meUrl = 'file:///' + meDataPath.replace(/\\/g, '/');
  const meMod = await import(meUrl);
  const meData = meMod.default || meMod.unitData;

  let totalUpdated = 0;
  meData.lessons.forEach((lesson) => {
    if (medievalVideos[lesson.id]) {
      lesson.video = medievalVideos[lesson.id];
      delete lesson.extra_videos;
      totalUpdated += lesson.video.length;
      console.log(`  ✅ Lesson ${lesson.id}: Injected ${lesson.video.length} scaffolded videos`);
    }
  });

  const meFileContent = `const unitData = ${JSON.stringify(meData, null, 2)};\n\nexport default unitData;\nexport { unitData };\n`;
  fs.writeFileSync(meDataPath, meFileContent, 'utf8');
  console.log(`\nWritten updated units/medieval_england/data.js (${totalUpdated} videos total)`);

  // 2. Update data/medieval_england.json and public/data/medieval_england.json
  ['data/medieval_england.json', 'public/data/medieval_england.json'].forEach((rel) => {
    const p = path.join(ROOT_DIR, rel);
    if (fs.existsSync(p)) {
      const raw = JSON.parse(fs.readFileSync(p, 'utf8'));
      if (raw.data && raw.data.lessons) {
        raw.data.lessons = meData.lessons;
      } else if (raw.lessons) {
        raw.lessons = meData.lessons;
      }
      fs.writeFileSync(p, JSON.stringify(raw, null, 2), 'utf8');
      console.log(`  ✅ Synced ${rel}`);
    }
  });

  // 3. Rebuild public/database.json
  console.log('\nRebuilding public/database.json...');
  execSync('node scripts/build_database.cjs', { cwd: ROOT_DIR, stdio: 'inherit' });
  console.log('✅ Medieval England video upgrade complete!\n');
}

run().catch((err) => {
  console.error('❌ Failed:', err);
  process.exit(1);
});
