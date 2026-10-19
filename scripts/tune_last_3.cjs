const fs = require('fs');
const path = require('path');

const targetData = path.resolve(__dirname, 'cme_unified_textbook_data.cjs');
const DATA = require('./cme_unified_textbook_data.cjs');
const enquiries = JSON.parse(JSON.stringify(DATA.ENQUIRIES));

// 1. Page 4: Revert the two additions, and add just ONE concise 5-word sentence to Block 1
enquiries[0].block1.paras[1] = enquiries[0].block1.paras[1].replace(
  ' This imperial arrangement sowed deep discord.',
  '',
);
enquiries[0].block2.paras[1] = enquiries[0].block2.paras[1].replace(
  ' These contradictory pledges fueled decades of strife.',
  '',
);
// Add just 4 words to Block 2
enquiries[0].block2.paras[1] += ' This created deep resentment.';

// 2. Page 24: Add 4 words to Block 1 to close gap from 47px to ~20px without spilling
enquiries[10].block1.paras[0] += ' This provoked civilian terror.';

// Save updated data
let code = fs.readFileSync(targetData, 'utf8');
const startMarker = 'const ENQUIRIES = [';
const endMarker = 'const QUIZ_QUESTIONS = {';

const startIdx = code.indexOf(startMarker);
const endIdx = code.indexOf(endMarker);

const newEnquiriesCode = 'const ENQUIRIES = ' + JSON.stringify(enquiries, null, 2) + ';\n\n';
const updated = code.slice(0, startIdx) + newEnquiriesCode + code.slice(endIdx);
fs.writeFileSync(targetData, updated, 'utf8');
console.log('Saved Page 4 and Page 24 data updates!');

// 3. Page 1: Revert front-cover to justify-content: space-between, and set optimal hero and syllabus dimensions
const renderScript = path.resolve(__dirname, 'render_standard_textbook_cme_unified.cjs');
let rCode = fs.readFileSync(renderScript, 'utf8');

// Set front-cover padding and justify-content: space-between
rCode = rCode.replace(
  'padding: 13mm 18mm 11mm 18mm;\n      justify-content: flex-start;\n      gap: 0;',
  'padding: 13mm 18mm 11mm 18mm;\n      justify-content: space-between;',
);
rCode = rCode.replace(
  'cover-footer-meta {\n      margin-top: auto;\n      display: flex;',
  'cover-footer-meta {\n      display: flex;',
);
// Tune hero image box height and overview text to precisely balance Page 1
rCode = rCode.replace(/height:\s*73mm;/g, 'height: 68mm;');
rCode = rCode.replace(
  'cover-enquiry-list {\n      display: grid;\n      grid-template-columns: 1fr 1fr;\n      gap: 6.5px 14px;',
  'cover-enquiry-list {\n      display: grid;\n      grid-template-columns: 1fr 1fr;\n      gap: 5.2px 14px;',
);
rCode = rCode.replace(
  'cover-concept-strip {\n      background: rgba(255, 255, 255, 0.06);\n      border: 1px solid rgba(255, 255, 255, 0.15);\n      border-radius: 3px;\n      padding: 6.5px 12px;\n      margin-bottom: 3.5mm;',
  'cover-concept-strip {\n      background: rgba(255, 255, 255, 0.06);\n      border: 1px solid rgba(255, 255, 255, 0.15);\n      border-radius: 3px;\n      padding: 5px 12px;\n      margin-bottom: 2mm;',
);

fs.writeFileSync(renderScript, rCode, 'utf8');
console.log('Updated Page 1 in renderer!');
