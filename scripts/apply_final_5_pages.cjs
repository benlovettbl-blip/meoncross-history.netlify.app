const fs = require('fs');
const path = require('path');

const targetData = path.resolve(__dirname, 'cme_unified_textbook_data.cjs');
const DATA = require('./cme_unified_textbook_data.cjs');
const enquiries = JSON.parse(JSON.stringify(DATA.ENQUIRIES));

// 1. Page 4: Add 6 words to Block 2
enquiries[0].block2.paras[1] += ' This dual commitment sowed profound division.';

// 2. Page 7: Add 8 words to Block 4
enquiries[1].block4.paras[1] +=
  ' This armistice partition established thirty years of confrontation.';

// 3. Page 24: Add 8 words to Block 2
enquiries[10].block2.paras[1] +=
  ' The resulting political uproar forced sweeping governmental resignations.';

// 4. Page 27: Add 8 words to Block 4
enquiries[11].block4.paras[1] +=
  ' The historic opportunity for immediate reconciliation was extinguished.';

// Save updated data
let code = fs.readFileSync(targetData, 'utf8');
const startMarker = 'const ENQUIRIES = [';
const endMarker = 'const QUIZ_QUESTIONS = {';

const startIdx = code.indexOf(startMarker);
const endIdx = code.indexOf(endMarker);

const newEnquiriesCode = 'const ENQUIRIES = ' + JSON.stringify(enquiries, null, 2) + ';\n\n';
const updated = code.slice(0, startIdx) + newEnquiriesCode + code.slice(endIdx);
fs.writeFileSync(targetData, updated, 'utf8');
console.log('Saved updated data to cme_unified_textbook_data.cjs!');

// Update Page 1 in renderer script:
const renderScript = path.resolve(__dirname, 'render_standard_textbook_cme_unified.cjs');
let rCode = fs.readFileSync(renderScript, 'utf8');
// Fix front-cover flex alignment and spacing
rCode = rCode.replace(
  'padding: 13mm 18mm 9mm 18mm;\n      justify-content: space-between;',
  'padding: 13mm 18mm 12mm 18mm;\n      justify-content: flex-start;\n      gap: 0;',
);
rCode = rCode.replace(
  'cover-footer-meta {\n      display: flex;',
  'cover-footer-meta {\n      margin-top: auto;\n      display: flex;',
);
fs.writeFileSync(renderScript, rCode, 'utf8');
console.log('Updated Page 1 in renderer!');
