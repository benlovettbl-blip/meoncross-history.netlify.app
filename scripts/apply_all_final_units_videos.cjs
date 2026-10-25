/**
 * scripts/apply_all_final_units_videos.cjs
 *
 * Applies the upgraded video dictionaries to:
 * - monarchy_religion_power
 * - early_modern_world
 * - post_war_britain
 * - water_and_sanitation
 * - australia
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = path.join(__dirname, '..');
const {
  monarchyVideos,
  earlyModernWorldVideos,
  postWarBritainVideos
} = require('./political_thematic_dictionary.cjs');

const {
  waterAndSanitationVideos,
  australiaVideos
} = require('./sanitation_australia_dictionary.cjs');

const unitConfigs = [
  {
    id: 'monarchy_religion_power',
    videos: monarchyVideos
  },
  {
    id: 'early_modern_world',
    videos: earlyModernWorldVideos
  },
  {
    id: 'post_war_britain',
    videos: postWarBritainVideos
  },
  {
    id: 'water_and_sanitation',
    videos: waterAndSanitationVideos
  },
  {
    id: 'australia',
    videos: australiaVideos
  }
];

async function updateUnit(cfg) {
  console.log(`\n--- Updating ${cfg.id} ---`);
  const dataJsPath = path.join(ROOT_DIR, 'units', cfg.id, 'data.js');
  const url = 'file:///' + dataJsPath.replace(/\\/g, '/');
  const mod = await import(url);
  const unitData = mod.default || mod.unitData;

  let totalVideos = 0;
  unitData.lessons.forEach((lesson, index) => {
    // Some units have lesson.id like lesson_1, or undefined with numeric index
    const key = lesson.id || `lesson_${index + 1}`;
    if (cfg.videos[key]) {
      lesson.video = cfg.videos[key];
      delete lesson.extra_videos;
      totalVideos += lesson.video.length;
      console.log(`  ✅ Lesson ${key}: Injected ${lesson.video.length} scaffolded videos`);
    } else {
      console.log(`  ⚠️ Lesson ${key} not found in dictionary!`);
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
  console.log('🏛️ APPLYING REMAINING 5 THEMATIC & REGIONAL UNITS');
  console.log('======================================================');

  for (const cfg of unitConfigs) {
    await updateUnit(cfg);
  }

  console.log('\nRebuilding public/database.json...');
  execSync('node scripts/build_database.cjs', { cwd: ROOT_DIR, stdio: 'inherit' });
  console.log('✅ Final units video upgrade complete!\n');
}

run().catch((err) => {
  console.error('❌ Failed:', err);
  process.exit(1);
});
