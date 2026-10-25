const fs = require('fs');
const path = require('path');

const { kt1 } = require('./eee_dictionary_kt1.cjs');
const { kt2 } = require('./eee_dictionary_kt2.cjs');
const { kt3 } = require('./eee_dictionary_kt3.cjs');

const allEeeUpgrades = {
  ...kt1,
  ...kt2,
  ...kt3,
};

async function applyEeeUpgrades() {
  console.log('🚀 Loading Early Elizabethan England data...');
  const dataJsPath = path.resolve(__dirname, '../units/eee/data.js');
  const fileUrl = 'file:///' + dataJsPath.replace(/\\/g, '/');
  const mod = await import(fileUrl);
  const unit = mod.default || mod.unitData;

  console.log(`Loaded unit: ${unit.title} (${unit.lessons.length} lessons)`);

  let totalVideosUpgraded = 0;
  let lessonsUpdated = 0;

  unit.lessons.forEach((lesson, idx) => {
    const lessonId = lesson.id;
    if (allEeeUpgrades[lessonId]) {
      const vids = allEeeUpgrades[lessonId];
      lesson.video = vids;
      lesson.extra_videos = [];
      totalVideosUpgraded += vids.length;
      lessonsUpdated++;
      console.log(`✅ [${idx + 1}/12] Upgraded ${lessonId}: ${vids.length} gold multi-lens clips`);
    } else {
      console.warn(`⚠️ No upgrades found for lesson ${lessonId}`);
    }
  });

  const outputJs = `const unitData = ${JSON.stringify(unit, null, 2)};\n\nexport default unitData;\nexport { unitData };\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = unitData;\n}\n`;

  // 1. Write to units/eee/data.js
  fs.writeFileSync(dataJsPath, outputJs, 'utf8');
  console.log(`💾 Saved ${dataJsPath}`);

  // 2. Write to public/units/eee/data.js
  const pubDataJsPath = path.resolve(__dirname, '../public/units/eee/data.js');
  fs.writeFileSync(pubDataJsPath, outputJs, 'utf8');
  console.log(`💾 Saved ${pubDataJsPath}`);

  // 3. Write to data/eee.json
  const jsonPath = path.resolve(__dirname, '../data/eee.json');
  fs.writeFileSync(jsonPath, JSON.stringify(unit, null, 2), 'utf8');
  console.log(`💾 Saved ${jsonPath}`);

  // 4. Write to public/data/eee.json
  const pubJsonPath = path.resolve(__dirname, '../public/data/eee.json');
  fs.writeFileSync(pubJsonPath, JSON.stringify(unit, null, 2), 'utf8');
  console.log(`💾 Saved ${pubJsonPath}`);

  console.log(`\n🎉 Successfully upgraded ${totalVideosUpgraded} clips across ${lessonsUpdated} lessons in Early Elizabethan England!`);
}

applyEeeUpgrades().catch((err) => {
  console.error('❌ Error applying EEE upgrades:', err);
  process.exit(1);
});
