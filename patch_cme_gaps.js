const fs = require('fs');

const dataFile = 'cme_new/data.js';
let txt = fs.readFileSync(dataFile, 'utf8');

// 1. Fix missing Truman and explicitly mention "US aid to Israel"
txt = txt.replace(
  'President , driven by strong domestic sympathy for Holocaust survivors and intense political lobbying, quickly recognized Israel and authorized massive emergency loans and grants.',
  'President Harry S. Truman, driven by strong domestic sympathy for Holocaust survivors and intense political lobbying, quickly recognized Israel and authorized massive emergency loans and grants. This massive US aid to Israel became a vital economic lifeline that allowed the young nation to absorb immigrants and build its defense forces.'
);

// 2. Insert Begin's visit to Egypt in December 1977
txt = txt.replace(
  'The following day, he addressed the Israeli Knesset, offering Israel complete recognition and permanent peace in exchange for complete Israeli withdrawal from all occupied Arab lands. By mid-1978, direct talks between Egypt and Israel had once again broken down over Begin’s refusal to dismantle Jewish settlements in the Sinai.',
  'The following day, he addressed the Israeli Knesset, offering Israel complete recognition and permanent peace in exchange for complete Israeli withdrawal from all occupied Arab lands. On 25 December 1977, Menachem Begin made a reciprocal visit to Ismailia, Egypt, for a summit with Sadat. However, this historic meeting failed to produce a breakthrough, and by mid-1978, direct talks between Egypt and Israel had once again broken down over Begin’s refusal to dismantle Jewish settlements in the Sinai.'
);
txt = txt.replace(
  'The following day, he addressed the Israeli Knesset, offering Israel complete recognition and permanent peace in exchange for complete Israeli withdrawal from all occupied Arab lands. On 25 December 1977, Menachem Begin made a reciprocal visit to Ismailia, Egypt, for a summit with Sadat. However, this historic meeting failed to produce a breakthrough, and by mid-1978, direct talks between Egypt and Israel had once again broken down over Begin’s refusal to dismantle Jewish settlements in the Sinai.',
  'The following day, he addressed the Israeli Knesset, offering Israel complete recognition and permanent peace in exchange for complete Israeli withdrawal from all occupied Arab lands. On 25 December 1977, Menachem Begin made a reciprocal visit to Ismailia, Egypt, for a summit with Sadat. However, this historic meeting failed to produce a breakthrough, and by mid-1978, direct talks between Egypt and Israel had once again broken down over Begin’s refusal to dismantle Jewish settlements in the Sinai.'
);

// We need to replace it in both `text` and `level_4` properties, let's use a regex just to be safe if the block appears twice.
// Wait, the block appears in `text` and `level_4` slightly differently. 
// For Lesson 8 level_4:
txt = txt.replace(
  'However, Anwar Sadat was facing severe internal pressures, a failing economy, and food riots in Cairo. To rescue the process, US President Jimmy Carter took a massive political risk, inviting both Sadat and Begin to the presidential retreat at Camp David, Maryland, for face-to-face negotiations.',
  'However, Anwar Sadat was facing severe internal pressures, a failing economy, and food riots in Cairo. Following Sadat\'s trip to Israel and Begin\'s reciprocal visit to Egypt in 1977, direct talks stalled. To rescue the process, US President Jimmy Carter took a massive political risk, inviting both Sadat and Begin to the presidential retreat at Camp David, Maryland, for face-to-face negotiations.'
);

fs.writeFileSync(dataFile, txt);
fs.copyFileSync(dataFile, 'public/units/cme_new/data.js');

console.log('Successfully patched curriculum gaps for Edexcel alignment.');
