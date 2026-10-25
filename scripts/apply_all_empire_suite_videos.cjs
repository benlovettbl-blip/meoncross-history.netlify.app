/**
 * scripts/apply_all_empire_suite_videos.cjs
 *
 * Applies the upgraded video dictionaries to:
 * - first_british_empire
 * - second_british_empire
 * - industrialisation_and_empire
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = path.join(__dirname, '..');
const {
  firstBritishEmpireVideos,
  secondBritishEmpireVideos,
  industrialisationAndEmpireVideos
} = require('./empire_suite_full_video_dictionary.cjs');

const unitConfigs = [
  {
    id: 'first_british_empire',
    videos: firstBritishEmpireVideos
  },
  {
    id: 'second_british_empire',
    videos: secondBritishEmpireVideos
  },
  {
    id: 'industrialisation_and_empire',
    videos: industrialisationAndEmpireVideos
  }
];

async function updateUnit(cfg) {
  console.log(`\n--- Updating ${cfg.id} ---`);
  const dataJsPath = path.join(ROOT_DIR, 'units', cfg.id, 'data.js');
  const url = 'file:///' + dataJsPath.replace(/\\/g, '/');
  const mod = await import(url);
  const unitData = mod.default || mod.unitData;

  let totalVideos = 0;
  unitData.lessons.forEach((lesson) => {
    if (cfg.videos[lesson.id]) {
      lesson.video = cfg.videos[lesson.id];
      delete lesson.extra_videos;
      totalVideos += lesson.video.length;
      console.log(`  ✅ Lesson ${lesson.id}: Injected ${lesson.video.length} scaffolded videos`);
    }
  });

  const fileContent = `const unitData = ${JSON.stringify(unitData, null, 2)};\n\nexport default unitData;\nexport { unitData };\n`;
  fs.writeFileSync(dataJsPath, fileContent, 'utf8');
  console.log(`  Written updated units/${cfg.id}/data.js (${totalVideos} videos total)`);

  [`data/${cfg.id}.json`, `public/data/${cfg.id}.json`].forEach((rel) => {
    const p = path.join(ROOT_DIR, rel);
    if (fs.existsSync(p)) {
      const raw = JSON.parse(fs.readFileSync(p, 'utf8'));
      if (raw.data && raw.data.lessons) {
        raw.data.lessons = unitData.lessons;
      } else if (raw.lessons) {
        raw.lessons = unitData.lessons;
      }
      fs.writeFileSync(p, JSON.stringify(raw, null, 2), 'utf8');
      console.log(`  ✅ Synced ${rel}`);
    }
  });
}

async function run() {
  console.log('======================================================');
  console.log('🌍 APPLYING BRITISH EMPIRE & INDUSTRIAL SUITE VIDEOS');
  console.log('======================================================');

  for (const cfg of unitConfigs) {
    await updateUnit(cfg);
  }

  console.log('\nRebuilding public/database.json...');
  execSync('node scripts/build_database.cjs', { cwd: ROOT_DIR, stdio: 'inherit' });
  console.log('✅ Empire suite video upgrade complete!\n');
}

run().catch((err) => {
  console.error('❌ Failed:', err);
  process.exit(1);
});
