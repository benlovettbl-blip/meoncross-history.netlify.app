const fs = require('fs');
const path = require('path');

const targetData = path.resolve(__dirname, 'cme_unified_textbook_data.cjs');
const DATA = require('./cme_unified_textbook_data.cjs');
const enquiries = JSON.parse(JSON.stringify(DATA.ENQUIRIES));

// 1. Page 4 (Enquiry 1 Block 1): Add 12 words to close 8px gap
enquiries[0].block1.paras[0] +=
  ' Allenby’s entry into Jerusalem marked the end of four centuries of Ottoman imperial dominance.';

// 2. Page 7 (Enquiry 2 Block 4): Add 14 words to close 53px gap
enquiries[1].block4.paras[1] +=
  ' UN mediator Ralph Bunche was subsequently awarded the Nobel Peace Prize for brokering the Rhodes armistice treaties.';

// 3. Page 8 (Enquiry 3 Block 2): Remove 10 words to fix spill
enquiries[2].block2.paras[0] = enquiries[2].block2.paras[0].replace(
  ' The human tragedy permanently redefined the demographic landscape of the region.',
  '',
);

// 4. Page 12 (Enquiry 5 Block 2): Remove 10 words to fix spill
enquiries[4].block2.paras[0] = enquiries[4].block2.paras[0].replace(
  ' The Arab summit established the precedent that Israel’s existence would be fiercely resisted.',
  '',
);

// 5. Page 13 (Enquiry 5 Block 4): Remove 10 words to fix spill
enquiries[4].block4.paras[0] = enquiries[4].block4.paras[0].replace(
  ' The SAM missile installations provided an impenetrable aerial shield over forward positions.',
  '',
);

// 6. Page 17 (Enquiry 7 Block 3): Add 12 words to close 42px gap
enquiries[6].block3.paras[0] +=
  ' The diplomatic compromise balanced territorial withdrawal against recognized regional sovereignty and secure boundaries.';

// 7. Page 18 (Enquiry 8 Block 1): Add 5 words to close 1px gap (26px -> 16px)
enquiries[7].block1.paras[0] += ' This inspired broad popular support.';

// 8. Page 24 (Enquiry 11 Block 1): Add 12 words to close 47px gap
enquiries[10].block1.paras[0] +=
  ' Israeli armored forces encircled West Beirut, cutting off all electricity, food, and water supplies.';

// 9. Page 27 (Enquiry 12 Block 4): Add 12 words to close 53px gap
enquiries[11].block4.paras[1] +=
  ' Thousands of grieving Israeli citizens lit memorial candles at the square throughout the night.';

// Save updated data
let code = fs.readFileSync(targetData, 'utf8');
const startMarker = 'const ENQUIRIES = [';
const endMarker = 'const QUIZ_QUESTIONS = {';

const startIdx = code.indexOf(startMarker);
const endIdx = code.indexOf(endMarker);

const newEnquiriesCode = 'const ENQUIRIES = ' + JSON.stringify(enquiries, null, 2) + ';\n\n';
const updated = code.slice(0, startIdx) + newEnquiriesCode + code.slice(endIdx);
fs.writeFileSync(targetData, updated, 'utf8');
console.log('Saved 100% optimal dataset to cme_unified_textbook_data.cjs!');

// Fix Page 1 in renderer script
const renderScript = path.resolve(__dirname, 'render_standard_textbook_cme_unified.cjs');
let rCode = fs.readFileSync(renderScript, 'utf8');
rCode = rCode.replace(/padding:\s*13mm\s*18mm\s*12mm\s*18mm;/g, 'padding: 13mm 18mm 9mm 18mm;');
rCode = rCode.replace(
  /margin-bottom:\s*3\.5mm;\s*\/\*\s*cover-enquiries-box\s*\*\//g,
  'margin-bottom: 4.5mm;',
);
if (!rCode.includes('.cover-enquiries-box { margin-bottom: 4.5mm; }')) {
  rCode = rCode.replace(
    'padding: 10px 13px; margin-bottom: 3.5mm;',
    'padding: 10px 13px; margin-bottom: 4.5mm;',
  );
}
fs.writeFileSync(renderScript, rCode, 'utf8');
console.log('Updated Page 1 padding in renderer!');
