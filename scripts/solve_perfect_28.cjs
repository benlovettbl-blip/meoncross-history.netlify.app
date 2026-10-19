const fs = require('fs');
const path = require('path');

const targetData = path.resolve(__dirname, 'cme_unified_textbook_data.cjs');
const DATA = require('./cme_unified_textbook_data.cjs');
const enquiries = JSON.parse(JSON.stringify(DATA.ENQUIRIES));

// 1. Revert additions on pages that spilled into column 3:
// Page 4 (Enquiry 1 Block 1)
enquiries[0].block1.paras[0] = enquiries[0].block1.paras[0].replace(
  ' Allenby’s entry into Jerusalem marked the end of four centuries of Ottoman imperial dominance.',
  '',
);

// Page 7 (Enquiry 2 Block 4)
enquiries[1].block4.paras[1] = enquiries[1].block4.paras[1].replace(
  ' UN mediator Ralph Bunche was subsequently awarded the Nobel Peace Prize for brokering the Rhodes armistice treaties.',
  '',
);

// Page 24 (Enquiry 11 Block 1)
enquiries[10].block1.paras[0] = enquiries[10].block1.paras[0].replace(
  ' Israeli armored forces encircled West Beirut, cutting off all electricity, food, and water supplies.',
  '',
);

// Page 27 (Enquiry 12 Block 4)
enquiries[11].block4.paras[1] = enquiries[11].block4.paras[1].replace(
  ' Thousands of grieving Israeli citizens lit memorial candles at the square throughout the night.',
  '',
);

// 2. Add precisely 5-6 words to pages with 30-38px gaps:
// Page 8 (Enquiry 3 Block 2): gap was 33px
enquiries[2].block2.paras[0] += ' This transformed regional security forever.';

// Page 12 (Enquiry 5 Block 2): gap was 38px
enquiries[4].block2.paras[0] += ' This heightened military tensions across borders.';

// Page 13 (Enquiry 5 Block 4): gap was 31px
enquiries[4].block4.paras[0] += ' This defensive posture invited preemptive strikes.';

// Save updated data
let code = fs.readFileSync(targetData, 'utf8');
const startMarker = 'const ENQUIRIES = [';
const endMarker = 'const QUIZ_QUESTIONS = {';

const startIdx = code.indexOf(startMarker);
const endIdx = code.indexOf(endMarker);

const newEnquiriesCode = 'const ENQUIRIES = ' + JSON.stringify(enquiries, null, 2) + ';\n\n';
const updated = code.slice(0, startIdx) + newEnquiriesCode + code.slice(endIdx);
fs.writeFileSync(targetData, updated, 'utf8');
console.log('Saved perfect data to cme_unified_textbook_data.cjs!');

// Update Page 1 in renderer script: increase hero img height to 73mm and overview p line-height
const renderScript = path.resolve(__dirname, 'render_standard_textbook_cme_unified.cjs');
let rCode = fs.readFileSync(renderScript, 'utf8');
rCode = rCode.replace(/height:\s*66\.5mm;/g, 'height: 73mm;');
rCode = rCode.replace(/height:\s*69mm;/g, 'height: 73mm;');
rCode = rCode.replace(/height:\s*64mm;/g, 'height: 73mm;');
rCode = rCode.replace(
  /cover-hero-img-box\s*\{\s*width:\s*100%;\s*height:\s*[^;]+;/g,
  'cover-hero-img-box {\n      width: 100%;\n      height: 73mm;',
);
fs.writeFileSync(renderScript, rCode, 'utf8');
console.log('Updated Page 1 hero height to 73mm in renderer!');
