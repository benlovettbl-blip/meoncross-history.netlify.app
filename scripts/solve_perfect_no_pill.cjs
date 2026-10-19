const fs = require('fs');
const path = require('path');

// 1. Update cme_unified_textbook_data.cjs
const dataPath = path.resolve(__dirname, 'cme_unified_textbook_data.cjs');
const DATA = require('./cme_unified_textbook_data.cjs');
const enquiries = JSON.parse(JSON.stringify(DATA.ENQUIRIES));

// Page 8 (Enquiry 3 Block 1 & 2): replace the 14-word addition with a 7-word addition
enquiries[2].block1.paras[1] = enquiries[2].block1.paras[1].replace(
  ' For generations of displaced families, these makeshift camps became permanent centers of national grievance.',
  ' This entrenched decades of national grievance.',
);

// Page 9 (Enquiry 3 Block 3 & 4): replace the 13-word addition with a 5-word addition
enquiries[2].block3.paras[0] = enquiries[2].block3.paras[0].replace(
  ' This unprecedented demographic influx fundamentally altered the cultural landscape of the newborn state.',
  ' This transformed the cultural landscape.',
);

// Page 19 (Enquiry 8 Block 3 & 4): add back a calibrated 10-word sentence
if (!enquiries[7].block3.paras[1].includes('The massacre altered global aviation security')) {
  enquiries[7].block3.paras[1] +=
    ' The massacre altered global aviation security, prompting international counter-terrorism measures.';
}

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

// 2. Update render_standard_textbook_cme_unified.cjs with exact p3.scrollHeight <= p3.clientHeight autoFitKeyTopicCards
const renderFile = path.resolve(__dirname, 'render_standard_textbook_cme_unified.cjs');
let renderCode = fs.readFileSync(renderFile, 'utf8');

const newAutoFitFunction = `    function autoFitKeyTopicCards() {
      const p3 = document.querySelector('#page-3');
      if (!p3) return;
      const cards = Array.from(p3.querySelectorAll('.kt-spec-card'));
      if (!cards.length) return;
      
      let bestFs = 7.0;
      for (let fs = 7.0; fs <= 10.5; fs += 0.1) {
        cards.forEach(c => {
          c.querySelectorAll('.kt-unit-desc').forEach(d => { d.style.fontSize = fs.toFixed(1) + 'pt'; d.style.lineHeight = '1.24'; });
          c.querySelectorAll('.kt-unit-code').forEach(cd => { cd.style.fontSize = (fs + 0.4).toFixed(1) + 'pt'; });
          c.querySelectorAll('.kt-spec-title').forEach(t => { t.style.fontSize = (fs + 1.8).toFixed(1) + 'pt'; });
          c.querySelectorAll('.kt-spec-geo').forEach(g => { g.style.fontSize = (fs - 0.4).toFixed(1) + 'pt'; });
          c.querySelectorAll('.kt-spec-date').forEach(dt => { dt.style.fontSize = (fs - 0.4).toFixed(1) + 'pt'; });
          c.querySelectorAll('.kt-spec-badge').forEach(b => { b.style.fontSize = (fs - 0.6).toFixed(1) + 'pt'; });
        });
        if (p3.scrollHeight <= p3.clientHeight) {
          bestFs = fs;
        } else {
          break;
        }
      }
      cards.forEach(c => {
        c.querySelectorAll('.kt-unit-desc').forEach(d => { d.style.fontSize = bestFs.toFixed(1) + 'pt'; d.style.lineHeight = '1.24'; });
        c.querySelectorAll('.kt-unit-code').forEach(cd => { cd.style.fontSize = (bestFs + 0.4).toFixed(1) + 'pt'; });
        c.querySelectorAll('.kt-spec-title').forEach(t => { t.style.fontSize = (bestFs + 1.8).toFixed(1) + 'pt'; });
        c.querySelectorAll('.kt-spec-geo').forEach(g => { g.style.fontSize = (bestFs - 0.4).toFixed(1) + 'pt'; });
        c.querySelectorAll('.kt-spec-date').forEach(dt => { dt.style.fontSize = (bestFs - 0.4).toFixed(1) + 'pt'; });
        c.querySelectorAll('.kt-spec-badge').forEach(b => { b.style.fontSize = (bestFs - 0.6).toFixed(1) + 'pt'; });
      });
      return bestFs;
    }`;

renderCode = renderCode.replace(
  /function autoFitKeyTopicCards\(\) \{[\s\S]*?return bestFs;\s*\}/,
  newAutoFitFunction.trim(),
);

fs.writeFileSync(renderFile, renderCode, 'utf8');
console.log('Updated autoFitKeyTopicCards in render_standard_textbook_cme_unified.cjs!');
