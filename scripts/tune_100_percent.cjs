const fs = require('fs');
const path = require('path');

// 1. Update cme_unified_textbook_data.cjs
const dataPath = path.resolve(__dirname, 'cme_unified_textbook_data.cjs');
const DATA = require('./cme_unified_textbook_data.cjs');
const enquiries = JSON.parse(JSON.stringify(DATA.ENQUIRIES));

// Page 5 (Enquiry 1 Block 3 & 4): was void 28px -> add 8-10 words
enquiries[0].block3.paras[1] +=
  ' This deep communal polarization entrenched bitter rivalries that resisted diplomatic mediation.';

// Page 8 (Enquiry 3 Block 1 & 2): was void 33px -> add 12-14 words
enquiries[2].block1.paras[1] +=
  ' For generations of displaced families, these makeshift camps became permanent centers of national grievance.';

// Page 9 (Enquiry 3 Block 3 & 4): was void 28px -> add 8-10 words
enquiries[2].block3.paras[0] +=
  ' This unprecedented demographic influx fundamentally altered the cultural landscape of the newborn state.';

// Page 17 (Enquiry 7 Block 3 & 4): was phantom spill (+271px) -> trim redundant sentence
enquiries[6].block3.paras[0] = enquiries[6].block3.paras[0].replace(
  ' British diplomat Lord Caradon carefully drafted the compromise text to ensure unanimous council passage.',
  '',
);

// Page 19 (Enquiry 8 Block 3 & 4): was phantom spill (+271px) -> trim redundant sentence
enquiries[7].block3.paras[1] = enquiries[7].block3.paras[1].replace(
  ' The massacre irrevocably altered international aviation and event security, inaugurating a grim era of global counter-terrorism operations.',
  '',
);

// Save updated data
let dataCode = fs.readFileSync(dataPath, 'utf8');
const startMarker = 'const ENQUIRIES = [';
const endMarker = 'const QUIZ_QUESTIONS = {';
const startIdx = dataCode.indexOf(startMarker);
const endIdx = dataCode.indexOf(endMarker);
const newEnquiriesCode = 'const ENQUIRIES = ' + JSON.stringify(enquiries, null, 2) + ';\n\n';
const updatedData = dataCode.slice(0, startIdx) + newEnquiriesCode + dataCode.slice(endIdx);
fs.writeFileSync(dataPath, updatedData, 'utf8');
console.log('Saved calibrated prose to cme_unified_textbook_data.cjs!');

// 2. Update render_standard_textbook_cme_unified.cjs for Page 3 map-plate frame and flex settings
const renderFile = path.resolve(__dirname, 'render_standard_textbook_cme_unified.cjs');
let renderCode = fs.readFileSync(renderFile, 'utf8');

renderCode = renderCode.replace(/height:\s*92mm;/g, 'height: 82mm;');
renderCode = renderCode.replace(
  /\.map-plate-frame\s*\{[^}]*\}/s,
  `.map-plate-frame {
      border: 1.2px solid #cbd5e1;
      border-radius: 4px;
      overflow: hidden;
      background: #ffffff;
      margin-bottom: 2.5mm;
      flex-shrink: 0;
    }`,
);

fs.writeFileSync(renderFile, renderCode, 'utf8');
console.log('Updated Page 3 map plate styles in render_standard_textbook_cme_unified.cjs!');
