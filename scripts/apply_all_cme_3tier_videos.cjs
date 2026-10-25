const fs = require('fs');
const path = require('path');

// Load the complete upgrades from generate_cme_video_upgrades and the full dictionary
const { upgrades } = require('./cme_full_video_dictionary.cjs');

async function run() {
  const dataPath = path.join(__dirname, '..', 'units', 'cme_new', 'data.js');
  const fileUrl = 'file:///' + dataPath.replace(/\\/g, '/');
  const mod = await import(fileUrl);
  const unit = mod.default || mod.unitData;

  console.log(`Loaded CME unit: ${unit.title} (${unit.lessons.length} lessons)`);

  let totalVideosUpgraded = 0;

  unit.lessons.forEach((lesson, idx) => {
    const lessonId = lesson.id;
    if (upgrades[lessonId]) {
      const vids = upgrades[lessonId];
      lesson.video = vids;
      lesson.extra_videos = [];
      totalVideosUpgraded += vids.length;
      console.log(`✅ Upgraded ${lessonId} (Lesson ${idx + 1}): ${vids.length} videos`);
    } else {
      console.warn(`⚠️ No upgrades found for ${lessonId}`);
    }
  });

  const outputCode = `export const unitData = ${JSON.stringify(unit, null, 2)};\n\nexport default unitData;\n`;

  // Write to units/cme_new/data.js
  fs.writeFileSync(dataPath, outputCode, 'utf8');
  console.log(`💾 Saved ${dataPath}`);

  // Write to public/units/cme_new/data.js
  const publicDataJs = path.join(__dirname, '..', 'public', 'units', 'cme_new', 'data.js');
  fs.writeFileSync(publicDataJs, outputCode, 'utf8');
  console.log(`💾 Saved ${publicDataJs}`);

  // Also write to data/cme_new.json and public/data/cme_new.json
  const jsonPath = path.join(__dirname, '..', 'data', 'cme_new.json');
  fs.writeFileSync(jsonPath, JSON.stringify(unit, null, 2), 'utf8');
  console.log(`💾 Saved ${jsonPath}`);

  const publicJsonPath = path.join(__dirname, '..', 'public', 'data', 'cme_new.json');
  fs.writeFileSync(publicJsonPath, JSON.stringify(unit, null, 2), 'utf8');
  console.log(`💾 Saved ${publicJsonPath}`);

  console.log(`\n🎉 Total videos successfully upgraded across all 12 lessons: ${totalVideosUpgraded}`);
}

run().catch(console.error);
