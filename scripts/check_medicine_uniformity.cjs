const path = require('path');
const fs = require('fs');

(async () => {
  const filePath = path.resolve('units/edexcel_medicine/data.js');
  const mod = await import('file:///' + filePath.replace(/\\/g, '/'));
  const unitData = mod.default || mod.unitData;
  const lessons = unitData.lessons;

  console.log('=== AUDIT OF UNITS/EDEXCEL_MEDICINE/DATA.JS (' + lessons.length + ' lessons) ===');
  lessons.forEach((l, idx) => {
    const num = idx + 1;
    const padNum = num < 10 ? '0' + num : '' + num;
    const hasSpec = !!l.specification_anchor;
    const hasObj = !!(
      l.learning_objectives &&
      (Array.isArray(l.learning_objectives)
        ? l.learning_objectives.length
        : l.learning_objectives.scaffolded?.length)
    );
    const hasHook = !!(l.hook_text || l.prologue || l.blurb);
    console.log(
      `L${padNum} [${l.id}]: spec_anchor=${hasSpec ? 'YES' : 'NO '} | objectives=${hasObj ? 'YES' : 'NO '} | hook_text=${hasHook ? 'YES' : 'NO '}`,
    );
  });

  if (fs.existsSync('public/data/edexcel_medicine.json')) {
    const jsonData = JSON.parse(fs.readFileSync('public/data/edexcel_medicine.json', 'utf8'));
    console.log(
      '\n=== AUDIT OF PUBLIC/DATA/EDEXCEL_MEDICINE.JSON (' +
        jsonData.lessons.length +
        ' lessons) ===',
    );
    jsonData.lessons.forEach((l, idx) => {
      const num = idx + 1;
      const padNum = num < 10 ? '0' + num : '' + num;
      const hasSpec = !!l.specification_anchor;
      const hasObj = !!(
        l.learning_objectives &&
        (Array.isArray(l.learning_objectives)
          ? l.learning_objectives.length
          : l.learning_objectives.scaffolded?.length)
      );
      const hasHook = !!(l.hook_text || l.prologue || l.blurb);
      console.log(
        `L${padNum} [${l.id}]: spec_anchor=${hasSpec ? 'YES' : 'NO '} | objectives=${hasObj ? 'YES' : 'NO '} | hook_text=${hasHook ? 'YES' : 'NO '}`,
      );
    });
  }
})();
