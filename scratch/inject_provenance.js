const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../edexcel_medicine/data.js');
let dataJsStr = fs.readFileSync(dataPath, 'utf8');

const { default: unitData } = eval(`
  const exports = {};
  ${dataJsStr.replace(/export default unitData;/, 'exports.default = unitData;')}
  exports
`);

// Add a "How useful" question to KT5.3 (or first available KT5)
const kt5 = unitData.lessons.find(l => l.title.startsWith('KT5.3'));
if (kt5) {
  if (!kt5.narrative_blocks) kt5.narrative_blocks = [];
  if (kt5.narrative_blocks.length === 0) {
    kt5.narrative_blocks.push({ text: "Western Front Medical Records.", tasks: [] });
  }
  
  const targetBlock = kt5.narrative_blocks[kt5.narrative_blocks.length - 1];
  if (!targetBlock.tasks) targetBlock.tasks = [];
  
  targetBlock.tasks.push({
    type: "written",
    text: "How useful is Source A for an enquiry into the problems of treating wounds on the Western Front? (8 marks)",
    provenance_clue: "Consider: Who wrote this? (Author), Why was it created? (Motive), Who was it meant for? (Audience), and How does this affect its usefulness? (NOP)",
    model: "Source A is useful because it provides a first-hand account of the chaotic conditions from the perspective of an RAMC surgeon..."
  });
  
  // Also create a source if needed
  if (!kt5.sources) kt5.sources = [];
  kt5.sources.push({
    title: "Source A",
    caption: "A diary entry written by Captain Arthur Osburn, a medical officer in the RAMC, describing the treatment of wounded soldiers in 1916."
  });
}

// Convert back to string
const newDataStr = `const unitData = ${JSON.stringify(unitData, null, 2)};\n\nexport default unitData;`;
fs.writeFileSync(dataPath, newDataStr);
console.log("Injected How useful question and provenance_clue into KT5.3");
