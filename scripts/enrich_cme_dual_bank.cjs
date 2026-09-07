const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const kt1 = require('./cme_bank_kt1.cjs');
const kt2 = require('./cme_bank_kt2.cjs');
const kt3 = require('./cme_bank_kt3.cjs');

const examBanks = [
  kt1.lesson0,
  kt1.lesson1,
  kt1.lesson2,
  kt1.lesson3,
  kt2.lesson4,
  kt2.lesson5,
  kt2.lesson6,
  kt3.lesson7,
  kt3.lesson8,
  kt3.lesson9,
];

const dataJsPath = path.join(__dirname, '..', 'units', 'cme_new', 'data.js');
const backupPath = path.join(
  __dirname,
  '..',
  'temp_backups',
  'cme_new_data_2026-09-06T21-54-41-785Z.js',
);

(async () => {
  try {
    const backupMod = await import(pathToFileURL(backupPath).href);
    const backupData = backupMod.default || backupMod.unitData || backupMod.cme_new;

    const currentMod = await import(pathToFileURL(dataJsPath).href);
    const unitData = currentMod.default || currentMod.unitData || currentMod.cme_new;

    if (!unitData || !unitData.lessons) {
      console.error('❌ Failed to load CME unit data');
      process.exit(1);
    }

    let totalRapid = 0;
    let totalExam = 0;

    unitData.lessons.forEach((lesson, idx) => {
      // Tier 1: Core rapid-fire recall questions
      const rapidBank = backupData.lessons[idx].quiz;
      if (!rapidBank || rapidBank.length !== 20) {
        throw new Error(`Rapid bank for lesson ${idx} does not have 20 questions!`);
      }
      lesson.quiz = rapidBank;
      totalRapid += rapidBank.length;

      // Tier 2: Edexcel GCSE Exam Clinic questions
      const examBank = examBanks[idx];
      if (!examBank || examBank.length !== 20) {
        throw new Error(`Exam bank for lesson ${idx} does not have 20 questions!`);
      }
      lesson.exam_clinic = examBank;
      totalExam += examBank.length;

      console.log(`✅ Lesson ${idx} ('${lesson.title}'):`);
      console.log(`   - ⚡ Rapid Recall: ${rapidBank.length} Qs`);
      console.log(`   - 🎯 GCSE Exam Clinic: ${examBank.length} Qs`);
    });

    const updatedCode = `const cme_new = ${JSON.stringify(unitData, null, 2)};\n\nexport const unitData = cme_new;\nexport default cme_new;\n`;
    fs.writeFileSync(dataJsPath, updatedCode, 'utf8');

    console.log(`\n🎉 Successfully injected Dual-Tier Bank into units/cme_new/data.js!`);
    console.log(`   Total Rapid Recall Questions: ${totalRapid}`);
    console.log(`   Total GCSE Exam Clinic Questions: ${totalExam}`);
    console.log(`   Grand Total: ${totalRapid + totalExam} Questions!`);
  } catch (err) {
    console.error('❌ Error setting up dual bank:', err);
    process.exit(1);
  }
})();
