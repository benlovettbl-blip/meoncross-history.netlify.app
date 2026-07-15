const fs = require('fs');
const path = require('path');

const units = ['cme_new', 'water_and_sanitation', 'great_war'];

units.forEach(unit => {
  const jsonPath = `./public/data/${unit}.json`;
  if (!fs.existsSync(jsonPath)) return;
  
  const unitData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  const glossary = unitData.data.glossary || [];
  const lessons = unitData.data.lessons || [];
  
  if (glossary.length === 0) {
    console.log(`No glossary for ${unit}, skipping.`);
    return;
  }

  let terminologyData = [];
  let glossaryIdx = 0;

  lessons.forEach((l, idx) => {
    let terms = [];
    // Give 2 terms per lesson
    for (let i = 0; i < 2; i++) {
      let termObj = glossary[glossaryIdx % glossary.length];
      terms.push({
        term: termObj.word,
        definition: termObj.definition
      });
      glossaryIdx++;
    }
    
    terminologyData.push({
      id: 'lesson' + (idx + 1),
      terms: terms
    });
  });

  const output = `export const terminologyData = ${JSON.stringify(terminologyData, null, 2)};`;
  const outPath = `./${unit}/terminology_data.js`;
  fs.writeFileSync(outPath, output, 'utf8');
  console.log(`Generated terminology_data.js for ${unit}`);
});
