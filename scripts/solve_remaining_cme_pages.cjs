const fs = require('fs');
const path = require('path');

const targetData = path.resolve(__dirname, 'cme_unified_textbook_data.cjs');
const DATA = require('./cme_unified_textbook_data.cjs');
const enquiries = JSON.parse(JSON.stringify(DATA.ENQUIRIES));

// 1. TRIMS (Remove 1 line / 8-14 words):
// Page 4: Enquiry 1 Block 1
enquiries[0].block1.paras[1] = enquiries[0].block1.paras[1].replace(
  'Palestine was initially designated as an international zone due to the profound religious sensitivities surrounding the Holy City of Jerusalem. ',
  '',
);

// Page 6: Enquiry 2 Block 1 - remove the extra sentence we added
enquiries[1].block1.paras[1] = enquiries[1].block1.paras[1].replace(
  ' The resulting humanitarian crisis exposed Britain to severe international criticism and moral isolation across the globe.',
  '',
);

// Page 7: Enquiry 2 Block 3 - remove the extra sentence we added
enquiries[1].block3.paras[1] = enquiries[1].block3.paras[1].replace(
  ' Communal militias mobilized across every contested quarter as the mandate unraveled into widespread lawlessness and bloodshed.',
  '',
);

// Page 8: Enquiry 3 Block 1 - remove the extra sentence we added
enquiries[2].block1.paras[1] = enquiries[2].block1.paras[1].replace(
  ' Generations of displaced families preserved their village oral histories, maintaining the memory of their lost ancestral lands.',
  '',
);

// Page 12: Enquiry 5 Block 1 - remove the extra sentence we added
enquiries[4].block1.paras[1] = enquiries[4].block1.paras[1].replace(
  ' The water disputes demonstrated that ecological resources were inseparable from national sovereignty and military security in the arid Middle East.',
  '',
);

// Page 15: Enquiry 6 Block 3 - remove the extra sentence we added
enquiries[5].block3.paras[1] = enquiries[5].block3.paras[1].replace(
  ' Syrian defenses on the Golan plateau crumbled under combined Israeli armor and close air support, securing the northern approaches.',
  '',
);

// Page 18: Enquiry 8 Block 1 - remove the extra sentence we added
enquiries[7].block1.paras[1] = enquiries[7].block1.paras[1].replace(
  ' Fatah’s active armed resistance provided a potent symbol of independent Palestinian agency free from Arab state manipulation.',
  '',
);

// Page 22: Enquiry 10 Block 1 - remove the extra sentence we added
enquiries[9].block1.paras[1] = enquiries[9].block1.paras[1].replace(
  ' Kissinger’s pragmatic bilateral approach established the precedent that peace could be negotiated incrementally through direct American mediation.',
  '',
);

// Page 27: Enquiry 12 Block 3 - remove the extra sentence we added
enquiries[11].block3.paras[1] = enquiries[11].block3.paras[1].replace(
  ' The Jordan peace accord demonstrated that pragmatic territorial and resource agreements could foster genuine regional cooperation.',
  '',
);

// 2. ADDITIONS (Add 6-15 words to close minor voids):
// Page 10 (Enquiry 4 Block 1): needs ~8w
enquiries[3].block1.paras[0] +=
  ' This ideological vision resonated deeply across post-colonial societies.';

// Page 11 (Enquiry 4 Block 3): needs ~10w
enquiries[3].block3.paras[0] +=
  ' French military planners coordinated air and naval assets directly with Israeli commanders.';

// Page 13 (Enquiry 5 Block 3): needs ~8w
enquiries[4].block3.paras[0] +=
  ' Israeli agricultural workers operated tractors under constant threat of sniper fire.';

// Page 14 (Enquiry 6 Block 1): needs ~8w
enquiries[5].block1.paras[0] +=
  ' Israeli reconnaissance pilots had spent months mapping Egyptian radar installations.';

// Page 17 (Enquiry 7 Block 3): needs ~12w
enquiries[6].block3.paras[0] +=
  ' British diplomat Lord Caradon carefully drafted the compromise text to ensure unanimous council passage.';

// Page 20 (Enquiry 9 Block 1): needs ~12w
enquiries[8].block1.paras[0] +=
  ' Egyptian artillery barrages along the canal inflicted steady casualties on Israeli defensive bunkers.';

// Page 23 (Enquiry 10 Block 3): needs ~20w
enquiries[9].block3.paras[0] +=
  ' President Carter personally shuttled between cabins in the Maryland woods to prevent direct personal shouting matches between Sadat and Begin.';

// Page 24 (Enquiry 11 Block 1): needs ~12w
enquiries[10].block1.paras[0] +=
  ' Sharon’s strategic objective was to dismantle PLO military infrastructure and install a friendly Christian government in Lebanon.';

// Page 25 (Enquiry 11 Block 3): needs ~8w
enquiries[10].block3.paras[0] +=
  ' Palestinian commercial strikes completely shuttered economic life across East Jerusalem.';

// Save updated dataset
let code = fs.readFileSync(targetData, 'utf8');
const startMarker = 'const ENQUIRIES = [';
const endMarker = 'const QUIZ_QUESTIONS = {';

const startIdx = code.indexOf(startMarker);
const endIdx = code.indexOf(endMarker);

const newEnquiriesCode = 'const ENQUIRIES = ' + JSON.stringify(enquiries, null, 2) + ';\n\n';
const updated = code.slice(0, startIdx) + newEnquiriesCode + code.slice(endIdx);
fs.writeFileSync(targetData, updated, 'utf8');
console.log('Saved fine-tuned text to cme_unified_textbook_data.cjs!');

// Also adjust Page 1 hero height in render_standard_textbook_cme_unified.cjs
const renderScript = path.resolve(__dirname, 'render_standard_textbook_cme_unified.cjs');
let rCode = fs.readFileSync(renderScript, 'utf8');
rCode = rCode.replace(/height:\s*64mm;/g, 'height: 66.5mm;');
rCode = rCode.replace(
  /margin-bottom:\s*3\.5mm;\s*\/\*\s*cover-hero-row\s*\*\//g,
  'margin-bottom: 4mm;',
);
fs.writeFileSync(renderScript, rCode, 'utf8');
console.log('Updated Page 1 hero height to 66.5mm in renderer!');
