const fs = require('fs');
const path = require('path');

const targetData = path.resolve(__dirname, 'cme_unified_textbook_data.cjs');
const DATA = require('./cme_unified_textbook_data.cjs');
const enquiries = JSON.parse(JSON.stringify(DATA.ENQUIRIES));

// Page 24 (Enquiry 11): Add 10 words to BLOCK 1 (which was only 792px)
enquiries[10].block1.paras[1] +=
  ' The siege inflicted severe civilian casualties across the Lebanese capital.';

// Save updated data
let code = fs.readFileSync(targetData, 'utf8');
const startMarker = 'const ENQUIRIES = [';
const endMarker = 'const QUIZ_QUESTIONS = {';

const startIdx = code.indexOf(startMarker);
const endIdx = code.indexOf(endMarker);

const newEnquiriesCode = 'const ENQUIRIES = ' + JSON.stringify(enquiries, null, 2) + ';\n\n';
const updated = code.slice(0, startIdx) + newEnquiriesCode + code.slice(endIdx);
fs.writeFileSync(targetData, updated, 'utf8');
console.log('Saved Page 24 data update to cme_unified_textbook_data.cjs!');

// Update Page 1 in renderer script: expand enquiry list gap and concept strip padding by 4px total
const renderScript = path.resolve(__dirname, 'render_standard_textbook_cme_unified.cjs');
let rCode = fs.readFileSync(renderScript, 'utf8');

rCode = rCode.replace('gap: 5.2px 14px;', 'gap: 6px 14px;');
rCode = rCode.replace(
  'padding: 5px 12px;\n      margin-bottom: 2mm;',
  'padding: 6.5px 12px;\n      margin-bottom: 2.2mm;',
);

fs.writeFileSync(renderScript, rCode, 'utf8');
console.log('Updated Page 1 in renderer!');
