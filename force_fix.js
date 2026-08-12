const fs = require('fs');

// 1. Fix core_app.js sidebar
let coreCode = fs.readFileSync('src/core_app.js', 'utf8');
const oldSidebar = `    if (window.currentUnitId === 'water_and_sanitation') {
      const pdfTextbookLink = document.createElement('a');
      pdfTextbookLink.className = 'lesson-link';
      pdfTextbookLink.innerHTML = '<i class="fa-solid fa-book-open"></i> PDF Textbook';
      pdfTextbookLink.href = \`/pdfs/water_and_sanitation_textbook.pdf\`;
      pdfTextbookLink.target = '_blank';
      pdfTextbookLink.style.marginTop = '15px';
      pdfTextbookLink.style.color = '#3b82f6';
      navContainer.appendChild(pdfTextbookLink);

      const pupilWorkbookLink = document.createElement('a');
      pupilWorkbookLink.className = 'lesson-link';
      pupilWorkbookLink.innerHTML = '<i class="fa-solid fa-pen-to-square"></i> Student Pupil Workbook';
      pupilWorkbookLink.href = \`/pdfs/water_and_sanitation_pupil_workbook.pdf\`;
      pupilWorkbookLink.target = '_blank';
      pupilWorkbookLink.style.marginTop = '15px';
      pupilWorkbookLink.style.color = '#8b5cf6';
      navContainer.appendChild(pupilWorkbookLink);
    }`;

const newSidebar = `    // Always show PDF Textbook and Workbook links
    const pdfTextbookLink = document.createElement('a');
    pdfTextbookLink.className = 'lesson-link';
    pdfTextbookLink.innerHTML = '<i class="fa-solid fa-book-open"></i> PDF Textbook';
    pdfTextbookLink.href = \`/pdfs/\${window.currentUnitId}_textbook.pdf\`;
    pdfTextbookLink.target = '_blank';
    pdfTextbookLink.style.marginTop = '15px';
    pdfTextbookLink.style.color = '#3b82f6';
    navContainer.appendChild(pdfTextbookLink);

    const pupilWorkbookLink = document.createElement('a');
    pupilWorkbookLink.className = 'lesson-link';
    pupilWorkbookLink.innerHTML = '<i class="fa-solid fa-pen-to-square"></i> Printable Workbook';
    pupilWorkbookLink.href = \`/pdfs/\${window.currentUnitId}_pupil_workbook.pdf\`;
    pupilWorkbookLink.target = '_blank';
    pupilWorkbookLink.style.marginTop = '15px';
    pupilWorkbookLink.style.color = '#8b5cf6';
    navContainer.appendChild(pupilWorkbookLink);`;

if (coreCode.includes(oldSidebar)) {
  coreCode = coreCode.replace(oldSidebar, newSidebar);
  fs.writeFileSync('src/core_app.js', coreCode);
  console.log('Fixed core_app.js sidebar!');
} else {
  console.log('Could not find old sidebar in core_app.js!');
}

// 2. Fix great_war/data.js properly
let gwData = fs.readFileSync('public/units/great_war/data.js', 'utf8');
let jsonStr = gwData.replace(/export const unitData = /, '');
const json = eval('(function(){ const mock_exams=[]; return ' + jsonStr + '})()');

let updated = false;
json.lessons.forEach(l => {
  if (l.primary_source) {
    if (l.primary_source.title && !l.primary_source.title.startsWith('Source A:')) {
      l.primary_source.title = 'Source A: ' + l.primary_source.title.replace(/^Source:/i, '').trim();
      updated = true;
    }
    if (l.primary_source.question) {
      let qText = l.primary_source.question.replace(/^Enquiry:\s*/, '').trim();
      // Remove it from primary_source
      delete l.primary_source.question;
      updated = true;
      
      // Inject into narrative blocks
      if (!l.narrative_blocks) l.narrative_blocks = [];
      if (l.narrative_blocks.length === 0) {
        l.narrative_blocks.push({ text: "", tasks: [] });
      }
      if (!l.narrative_blocks[0].tasks) l.narrative_blocks[0].tasks = [];
      
      // Prevent duplicates
      if (!l.narrative_blocks[0].tasks.some(t => t.type === 'think_pair_share')) {
        l.narrative_blocks[0].tasks.unshift({
          type: 'think_pair_share',
          text: qText
        });
      }
    }
  }
  
  if (l.visual_sources && l.visual_sources.length > 0) {
    let vs = l.visual_sources[0];
    if (vs.title && !vs.title.startsWith('Source A:')) {
      vs.title = 'Source A: ' + vs.title.replace(/^Source:/i, '').trim();
      updated = true;
    }
    if (vs.question) {
      let qText = vs.question.replace(/^Enquiry:\s*/, '').trim();
      delete vs.question;
      updated = true;
      
      if (!l.narrative_blocks) l.narrative_blocks = [];
      if (l.narrative_blocks.length === 0) {
        l.narrative_blocks.push({ text: "", tasks: [] });
      }
      if (!l.narrative_blocks[0].tasks) l.narrative_blocks[0].tasks = [];
      
      if (!l.narrative_blocks[0].tasks.some(t => t.type === 'think_pair_share')) {
        l.narrative_blocks[0].tasks.unshift({
          type: 'think_pair_share',
          text: qText
        });
      }
    }
  }
});

if (updated) {
  fs.writeFileSync('public/units/great_war/data.js', 'export const unitData = ' + JSON.stringify(json, null, 2) + ';\n');
  console.log('Fixed great_war/data.js!');
} else {
  console.log('No updates needed for great_war/data.js');
}
