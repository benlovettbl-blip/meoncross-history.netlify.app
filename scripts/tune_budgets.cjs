const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'cme_unified_textbook_data.cjs');
const fullData = require(targetFile);

// Page 11 (Enquiry 4 Recto): Calibrated to 2,680 total characters
fullData.ENQUIRIES[3].block3.paras[1] =
  'The plan was executed with mechanical precision. On 29 October, Israeli paratroopers dropped near the Mitla Pass, while armored columns swept across Sinai, routing Egyptian defenders, occupying the Gaza Strip, and capturing Sharm el-Sheikh to reopen the Straits of Tiran to Israeli shipping. The next day, London and Paris issued their ultimatum, and on 31 October, Anglo-French bombers pulverised Egyptian airfields. On 5 November, British and French paratroopers landed at Port Said in Operation Musketeer, seizing the canal zone amid bitter urban combat.';

fullData.ENQUIRIES[3].block4.paras[1] =
  "Under intense US pressure, Israel withdrew from Sinai in March 1957. In exchange, the United Nations deployed the first international peacekeeping force—the United Nations Emergency Force (UNEF)—along the armistice border and at Sharm el-Sheikh, guaranteeing Israeli maritime passage through the Straits of Tiran for the next decade. The crisis elevated Nasser into the undisputed hero of Pan-Arabism, culminating in the **formation of the United Arab Republic (UAR) in 1958**—the revolutionary political union of Egypt and Syria under Nasser's presidency. Although the UAR collapsed in 1961, it entrenched Nasser's regional hegemony and intensified Israeli fears of hostile Arab encirclement across both frontiers.";

console.log('Page 11 Block 4.3 Para 2:', fullData.ENQUIRIES[3].block3.paras[1].length);
console.log('Page 11 Block 4.4 Para 2:', fullData.ENQUIRIES[3].block4.paras[1].length);

// Write back
const outputJs =
  '/**\n * scripts/cme_unified_textbook_data.cjs\n *\n * CANONICAL 28-PAGE PURE NARRATIVE CLASSROOM TEXTBOOK DATA\n * Option P5: Conflict in the Middle East, 1945–1995 (Pearson Edexcel GCSE History)\n */\n\n' +
  'const COVER_CONFIG = ' +
  JSON.stringify(fullData.COVER_CONFIG, null, 2) +
  ';\n\n' +
  'const MILESTONE_SPINE = ' +
  JSON.stringify(fullData.MILESTONE_SPINE, null, 2) +
  ';\n\n' +
  'const THEATER_MAP_CONFIG = ' +
  JSON.stringify(fullData.THEATER_MAP_CONFIG, null, 2) +
  ';\n\n' +
  'const ENQUIRIES = ' +
  JSON.stringify(fullData.ENQUIRIES, null, 2) +
  ';\n\n' +
  'const QUIZ_QUESTIONS = ' +
  JSON.stringify(fullData.QUIZ_QUESTIONS, null, 2) +
  ';\n\n' +
  'module.exports = {\n  COVER_CONFIG,\n  MILESTONE_SPINE,\n  THEATER_MAP_CONFIG,\n  ENQUIRIES,\n  QUIZ_QUESTIONS\n};\n';

fs.writeFileSync(targetFile, outputJs, 'utf8');
console.log('Successfully saved tuned Page 11 budget in cme_unified_textbook_data.cjs!');
