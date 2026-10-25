const fs = require('fs');
const path = require('path');

const { kt1 } = require('./medicine_dictionary_kt1.cjs');
const { kt2 } = require('./medicine_dictionary_kt2.cjs');
const { kt3 } = require('./medicine_dictionary_kt3.cjs');
const { kt4 } = require('./medicine_dictionary_kt4.cjs');
const { kt5 } = require('./medicine_dictionary_kt5.cjs');

const allMedicineUpgrades = {
  ...kt1,
  ...kt2,
  ...kt3,
  ...kt4,
  ...kt5,
};

async function applyMedicineUpgrades() {
  console.log('🚀 Loading Medicine Through Time data...');
  const dataJsPath = path.resolve(__dirname, '../units/edexcel_medicine/data.js');
  const fileUrl = 'file:///' + dataJsPath.replace(/\\/g, '/');
  const mod = await import(fileUrl);
  const unit = mod.default || mod.unitData;

  console.log(`Loaded unit: ${unit.title} (${unit.lessons.length} lessons)`);

  let totalVideosUpgraded = 0;
  let lessonsUpdated = 0;

  unit.lessons.forEach((lesson, idx) => {
    const lessonId = lesson.id;
    if (allMedicineUpgrades[lessonId]) {
      const vids = allMedicineUpgrades[lessonId];
      lesson.video = vids;
      lesson.extra_videos = [];
      totalVideosUpgraded += vids.length;
      lessonsUpdated++;
      console.log(`✅ [${idx + 1}/26] Upgraded ${lessonId}: ${vids.length} gold 3-tier clips`);
    } else {
      console.warn(`⚠️ No upgrades found for lesson ${lessonId}`);
    }
  });

  const outputJs = `export const unitData = ${JSON.stringify(unit, null, 2)};\n\nexport default unitData;\n`;

  // 1. Write to units/edexcel_medicine/data.js
  fs.writeFileSync(dataJsPath, outputJs, 'utf8');
  console.log(`💾 Saved ${dataJsPath}`);

  // 2. Write to public/units/edexcel_medicine/data.js
  const pubDataJsPath = path.resolve(__dirname, '../public/units/edexcel_medicine/data.js');
  fs.writeFileSync(pubDataJsPath, outputJs, 'utf8');
  console.log(`💾 Saved ${pubDataJsPath}`);

  // 3. Write to data/edexcel_medicine.json
  const jsonPath = path.resolve(__dirname, '../data/edexcel_medicine.json');
  fs.writeFileSync(jsonPath, JSON.stringify(unit, null, 2), 'utf8');
  console.log(`💾 Saved ${jsonPath}`);

  // 4. Write to public/data/edexcel_medicine.json
  const pubJsonPath = path.resolve(__dirname, '../public/data/edexcel_medicine.json');
  fs.writeFileSync(pubJsonPath, JSON.stringify(unit, null, 2), 'utf8');
  console.log(`💾 Saved ${pubJsonPath}`);

  console.log(`\n🎉 Successfully upgraded ${totalVideosUpgraded} clips across ${lessonsUpdated} lessons in Medicine Through Time!`);
}

applyMedicineUpgrades().catch((err) => {
  console.error('❌ Error applying Medicine upgrades:', err);
  process.exit(1);
});
