const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'generate_worksheets.js');
let code = fs.readFileSync(targetPath, 'utf8');

// 1. Inject terminology data loading at the top
const termLoadCode = `
let terminologyData = [];
try {
  const termContent = fs.readFileSync(path.join(__dirname, 'terminology_data.js'), 'utf8');
  terminologyData = new Function(termContent.replace('export const terminologyData =', 'return').replace(/;$/, '') + ';')();
} catch(e) {
  console.log("Could not load terminology data");
}
`;
code = code.replace("const unitData = JSON.parse(jsonContent);", "const unitData = JSON.parse(jsonContent);\n" + termLoadCode);

// 2. Replace lesson.vocab with terminologyData logic
const vocabCheck = "if (lesson.vocab && lesson.vocab.length > 0) {";
const newVocabCheck = `
  let currentVocab = [];
  if (terminologyData && terminologyData.length > 0) {
    const termSet = terminologyData.find(t => t.id === 'lesson' + (lessonIndex + 1));
    if (termSet && termSet.terms) {
      currentVocab = termSet.terms;
    }
  }
  
  if (currentVocab.length > 0) {
`;

code = code.replace(vocabCheck, newVocabCheck);

// 3. Replace lesson.vocab references with currentVocab
// Use regex to replace 'lesson.vocab' but only inside the vocab block. 
// Safer to just replace all instances of lesson.vocab since they only appear there.
code = code.replace(/lesson\.vocab/g, "currentVocab");

// 4. Update cloze text generation since terminologyData doesn't have cloze text pre-written
const clozeLogic = `let clozeHtml = currentVocab_cloze_text || "";
      clozeHtml = clozeHtml.replace(/\\[.*?\\]/g, '______________________');`;

const newClozeLogic = `
      // Auto-generate cloze if missing
      let clozeHtml = currentVocab.map(v => \`The concept of ______________________ is best defined as \${v.definition.toLowerCase()}\`).join('. ');
`;
code = code.replace(clozeLogic, newClozeLogic);

// Replace "currentVocab_cloze_text" because of the global replace above
code = code.replace("currentVocab_cloze_text", "lesson.vocab_cloze_text");

fs.writeFileSync(targetPath, code, 'utf8');
console.log("Safely updated worksheets for Terminology Data!");
