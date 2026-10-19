const fs = require('fs');
const path = require('path');

const targetData = path.resolve(__dirname, 'cme_unified_textbook_data.cjs');
const DATA = require('./cme_unified_textbook_data.cjs');
const enquiries = JSON.parse(JSON.stringify(DATA.ENQUIRIES));

// 1. Trims for pages that had +271px right spill:
// Page 4 (Enquiry 1 Block 2): trim 11 words
enquiries[0].block2.paras[1] = enquiries[0].block2.paras[1].replace(
  ' Crucially, the declaration added that nothing should prejudice the civil and religious rights of existing non-Jewish communities—conspicuously ignoring the political or national rights of the 90% Arab population.',
  ' Crucially, the declaration pledged that existing non-Jewish communal rights would not be prejudiced.',
);

// Page 7 (Enquiry 2 Block 4): trim 12 words
enquiries[1].block4.paras[1] = enquiries[1].block4.paras[1].replace(
  ' The 1949 armistice lines consolidated Israeli statehood while leaving regional Arab-Israeli tensions permanently unresolved.',
  '',
);

// Page 17 (Enquiry 7 Block 4): trim 14 words
enquiries[6].block4.paras[1] = enquiries[6].block4.paras[1].replace(
  ' The Khartoum summit cemented a posture of collective defiance that obstructed diplomatic compromise for the next decade.',
  '',
);

// Page 24 (Enquiry 11 Block 1): trim 12 words
enquiries[10].block1.paras[0] = enquiries[10].block1.paras[0].replace(
  ' Sharon’s strategic objective was to dismantle PLO military infrastructure and install a friendly Christian government in Lebanon.',
  '',
);

// Page 27 (Enquiry 12 Block 4): trim 12 words
enquiries[11].block4.paras[1] = enquiries[11].block4.paras[1].replace(
  ' The tragic murder of Rabin silenced the most credible champion of peace, leaving the region vulnerable to renewed cycles of confrontation.',
  '',
);

// 2. Additions for pages with minor voids (5-15 words):
// Page 6 (Enquiry 2 Block 2): gap was 33px (needs ~8w)
enquiries[1].block2.paras[0] +=
  ' The audacity of the bombing shocked the British establishment to its core.';

// Page 8 (Enquiry 3 Block 2): gap was 33px (needs ~8w)
enquiries[2].block2.paras[0] +=
  ' The human tragedy permanently redefined the demographic landscape of the region.';

// Page 12 (Enquiry 5 Block 2): gap was 38px (needs ~10w)
enquiries[4].block2.paras[0] +=
  ' The Arab summit established the precedent that Israel’s existence would be fiercely resisted.';

// Page 13 (Enquiry 5 Block 4): gap was 31px (needs ~8w)
enquiries[4].block4.paras[0] +=
  ' The SAM missile installations provided an impenetrable aerial shield over forward positions.';

// Page 15 (Enquiry 6 Block 4): gap was 33px (needs ~8w)
enquiries[5].block4.paras[0] +=
  ' The stunning speed of victory stunned military observers and global powers alike.';

// Page 18 (Enquiry 8 Block 2): gap was 26px (needs ~4w)
enquiries[7].block2.paras[0] += ' This emboldened militant groups.';

// Page 22 (Enquiry 10 Block 2): gap was 59px (needs ~15w)
enquiries[9].block2.paras[0] +=
  ' Begin’s election signaled a hardening of Israel’s ideological posture toward territorial concession and Judea and Samaria.';

// Page 23 (Enquiry 10 Block 4): gap was 44px (needs ~12w)
enquiries[9].block4.paras[0] +=
  ' The historic peace treaty neutralized the primary military threat against Israel from the south.';

// Page 25 (Enquiry 11 Block 4): gap was 28px (needs ~5w)
enquiries[10].block4.paras[0] += ' This altered the political dynamics.';

// Save updated data
let code = fs.readFileSync(targetData, 'utf8');
const startMarker = 'const ENQUIRIES = [';
const endMarker = 'const QUIZ_QUESTIONS = {';

const startIdx = code.indexOf(startMarker);
const endIdx = code.indexOf(endMarker);

const newEnquiriesCode = 'const ENQUIRIES = ' + JSON.stringify(enquiries, null, 2) + ';\n\n';
const updated = code.slice(0, startIdx) + newEnquiriesCode + code.slice(endIdx);
fs.writeFileSync(targetData, updated, 'utf8');
console.log('Saved final fine-tuned data to cme_unified_textbook_data.cjs!');

// Update Page 1 in renderer script
const renderScript = path.resolve(__dirname, 'render_standard_textbook_cme_unified.cjs');
let rCode = fs.readFileSync(renderScript, 'utf8');
// Fix cover hero img box to 69mm and overview p margin
rCode = rCode.replace(/height:\s*66\.5mm;/g, 'height: 69mm;');
rCode = rCode.replace(
  /margin-bottom:\s*3\.5mm;\s*\/\*\s*cover-hero-row\s*\*\//g,
  'margin-bottom: 3.5mm;',
);
rCode = rCode.replace(
  /padding:\s*9\.5px\s*13px;\s*margin-bottom:\s*3mm;/g,
  'padding: 10px 13px; margin-bottom: 3.5mm;',
);
fs.writeFileSync(renderScript, rCode, 'utf8');
console.log('Updated Page 1 dimensions in renderer!');
