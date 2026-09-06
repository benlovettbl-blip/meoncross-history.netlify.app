const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const kt1 = require('./cme_bank_kt1.cjs');
const kt2 = require('./cme_bank_kt2.cjs');
const kt3 = require('./cme_bank_kt3.cjs');

const dataJsPath = path.join(__dirname, '..', 'units', 'cme_new', 'data.js');

const cmeLessonBanks = [
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

(async () => {
  try {
    const fileUrl = pathToFileURL(dataJsPath).href;
    const mod = await import(fileUrl);
    const unitData = mod.default || mod.unitData || mod.cme_new;

    if (!unitData || !unitData.lessons) {
      console.error('❌ Failed to load CME unit data from data.js');
      process.exit(1);
    }

    if (unitData.lessons.length !== 10) {
      console.error(`❌ Expected 10 lessons in CME, found ${unitData.lessons.length}`);
      process.exit(1);
    }

    let totalInjected = 0;
    unitData.lessons.forEach((lesson, idx) => {
      const bank = cmeLessonBanks[idx];
      if (!bank || bank.length !== 20) {
        throw new Error(`Bank for lesson ${idx} does not have 20 questions!`);
      }
      lesson.quiz = bank;
      totalInjected += bank.length;
      console.log(`✅ CME Lesson ${idx} ('${lesson.title}'): Injected ${bank.length} questions.`);
    });

    const updatedCode = `const cme_new = ${JSON.stringify(unitData, null, 2)};\n\nexport const unitData = cme_new;\nexport default cme_new;\n`;

    fs.writeFileSync(dataJsPath, updatedCode, 'utf8');
    console.log(
      `\n🎉 Successfully injected ${totalInjected} specification-aligned questions with historian explanations into units/cme_new/data.js!`,
    );
  } catch (err) {
    console.error('❌ Error updating CME data:', err);
    process.exit(1);
  }
})();
