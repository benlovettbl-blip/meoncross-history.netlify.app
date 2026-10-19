const fs = require('fs');
const path = require('path');

const targetData = path.resolve(__dirname, 'cme_unified_textbook_data.cjs');
const DATA = require('./cme_unified_textbook_data.cjs');
const enquiries = JSON.parse(JSON.stringify(DATA.ENQUIRIES));

// 1. Page 4: Add 1 line (approx 8 words) so blocks grow from 830px to 854px (gap: 33px -> 14px)
enquiries[0].block1.paras[1] += ' This imperial arrangement sowed deep discord.';
enquiries[0].block2.paras[1] += ' These contradictory pledges fueled decades of strife.';

// 2. Page 24: Trim 7 words from Block 2 to eliminate the 1-line spill into column 3
enquiries[10].block2.paras[1] = enquiries[10].block2.paras[1].replace(
  ' The resulting political uproar forced sweeping governmental resignations.',
  '',
);

// Save updated data
let code = fs.readFileSync(targetData, 'utf8');
const startMarker = 'const ENQUIRIES = [';
const endMarker = 'const QUIZ_QUESTIONS = {';

const startIdx = code.indexOf(startMarker);
const endIdx = code.indexOf(endMarker);

const newEnquiriesCode = 'const ENQUIRIES = ' + JSON.stringify(enquiries, null, 2) + ';\n\n';
const updated = code.slice(0, startIdx) + newEnquiriesCode + code.slice(endIdx);
fs.writeFileSync(targetData, updated, 'utf8');
console.log('Saved data updates to cme_unified_textbook_data.cjs!');

// 3. Page 1 adjustments in renderer script:
const renderScript = path.resolve(__dirname, 'render_standard_textbook_cme_unified.cjs');
let rCode = fs.readFileSync(renderScript, 'utf8');

// Update cover enquiry list gap and concept strip padding
rCode = rCode.replace(
  'cover-enquiry-list {\n      display: grid;\n      grid-template-columns: 1fr 1fr;\n      gap: 4px 14px;',
  'cover-enquiry-list {\n      display: grid;\n      grid-template-columns: 1fr 1fr;\n      gap: 6.5px 14px;',
);
rCode = rCode.replace(
  'cover-concept-strip {\n      background: rgba(255, 255, 255, 0.06);\n      border: 1px solid rgba(255, 255, 255, 0.15);\n      border-radius: 3px;\n      padding: 4.5px 11px;\n      margin-bottom: 2.5mm;',
  'cover-concept-strip {\n      background: rgba(255, 255, 255, 0.06);\n      border: 1px solid rgba(255, 255, 255, 0.15);\n      border-radius: 3px;\n      padding: 6.5px 12px;\n      margin-bottom: 3.5mm;',
);
// Ensure front-cover padding is 13mm 18mm 12mm 18mm
rCode = rCode.replace(
  'padding: 13mm 18mm 12mm 18mm;\n      justify-content: flex-start;\n      gap: 0;',
  'padding: 13mm 18mm 11mm 18mm;\n      justify-content: flex-start;\n      gap: 0;',
);
fs.writeFileSync(renderScript, rCode, 'utf8');
console.log('Updated Page 1 styles in renderer!');
