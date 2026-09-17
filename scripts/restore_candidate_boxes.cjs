const fs = require('fs');
const path = require('path');

const units = [
  { id: 'cme_new', code: '1HI0/21', dir: 'public/units/cme_new' },
  { id: 'edexcel_medicine', code: '1HI0/11', dir: 'public/units/edexcel_medicine' },
  { id: 'eee', code: '1HI0/2B', dir: 'public/units/eee' },
  { id: 'weimar_nazi_germany', code: '1HI0/31', dir: 'public/units/weimar_nazi_germany' },
  { id: 'usa', code: '1HI0/33', dir: 'public/units/usa' },
];

function getCandidateBoxHtml(paperCode) {
  return `<!-- Official Pearson Candidate Details Box (Print & Physical Exam Standard) -->
    <div class="top-warning" style="text-align: center; font-weight: 600; font-size: 13px; margin-bottom: 6px; color: #111;">
      Please check the examination details below before entering your candidate information
    </div>
    
    <div class="cover-box" style="border: 2px solid #000; border-radius: 8px; padding: 12px 18px; margin-bottom: 20px; background: #fff;">
      <div class="candidate-info" style="display: flex; gap: 15px; margin-bottom: 12px;">
        <div style="flex: 2;">
          <div class="input-label" style="font-size: 12px; margin-bottom: 4px; font-weight: 600;">Candidate surname</div>
          <div class="input-box" style="border: 1.5px solid #000; border-radius: 4px; height: 32px; background: white;"></div>
        </div>
        <div style="flex: 1.5;">
          <div class="input-label" style="font-size: 12px; margin-bottom: 4px; font-weight: 600;">Other names</div>
          <div class="input-box" style="border: 1.5px solid #000; border-radius: 4px; height: 32px; background: white;"></div>
        </div>
      </div>
      
      <div class="candidate-info" style="display: flex; gap: 15px; align-items: flex-end;">
        <div style="flex: 1;">
          <div class="input-label" style="font-size: 12px; margin-bottom: 4px; font-weight: 600;">Centre Number</div>
          <div style="display: flex; gap: 3px;">
            <div class="char-box" style="border: 1.5px solid #000; border-radius: 4px; height: 32px; width: 24px; background: white;"></div>
            <div class="char-box" style="border: 1.5px solid #000; border-radius: 4px; height: 32px; width: 24px; background: white;"></div>
            <div class="char-box" style="border: 1.5px solid #000; border-radius: 4px; height: 32px; width: 24px; background: white;"></div>
            <div class="char-box" style="border: 1.5px solid #000; border-radius: 4px; height: 32px; width: 24px; background: white;"></div>
            <div class="char-box" style="border: 1.5px solid #000; border-radius: 4px; height: 32px; width: 24px; background: white;"></div>
          </div>
        </div>
        <div style="flex: 1;">
          <div class="input-label" style="font-size: 12px; margin-bottom: 4px; font-weight: 600;">Candidate Number</div>
          <div style="display: flex; gap: 3px;">
            <div class="char-box" style="border: 1.5px solid #000; border-radius: 4px; height: 32px; width: 24px; background: white;"></div>
            <div class="char-box" style="border: 1.5px solid #000; border-radius: 4px; height: 32px; width: 24px; background: white;"></div>
            <div class="char-box" style="border: 1.5px solid #000; border-radius: 4px; height: 32px; width: 24px; background: white;"></div>
            <div class="char-box" style="border: 1.5px solid #000; border-radius: 4px; height: 32px; width: 24px; background: white;"></div>
          </div>
        </div>
        <div style="text-align: right; flex: 1;">
          <div style="font-size: 11px; font-weight: 700; color: #444; text-transform: uppercase;">Paper Reference</div>
          <div style="font-size: 20px; font-weight: 900; line-height: 1; color: #000;">${paperCode}</div>
        </div>
      </div>
    </div>`;
}

let totalProcessed = 0;

units.forEach((u) => {
  const dir = path.join('public', 'units', u.id);
  if (!fs.existsSync(dir)) return;
  const files = fs
    .readdirSync(dir)
    .filter((f) => f.includes('mock') && f.endsWith('.html') && !f.includes('mark_scheme'));

  files.forEach((f) => {
    const filePath = path.join(dir, f);
    let html = fs.readFileSync(filePath, 'utf8');

    const pageIdx = html.indexOf('<div class="page">');
    if (pageIdx === -1) return;

    // Find the title element: either <div class="edexcel-title"> or <div class="exam-header">
    let titleIdx = html.indexOf('<div class="edexcel-title">', pageIdx);
    if (titleIdx === -1) {
      titleIdx = html.indexOf('<div class="exam-header">', pageIdx);
    }

    if (titleIdx === -1) {
      console.warn(`[WARNING] No title marker found in ${u.id}/${f}`);
      return;
    }

    const startPos = pageIdx + '<div class="page">'.length;
    const candidateBox = getCandidateBoxHtml(u.code);

    // Cleanly replace everything between <div class="page"> and title marker
    html =
      html.substring(0, startPos) + '\n    ' + candidateBox + '\n    ' + html.substring(titleIdx);

    // Ensure print-safe styles hide invigilator hud
    if (!html.includes('.invigilator-hud { display: none !important; }')) {
      html = html.replace(
        '@media print {',
        '@media print {\n    .invigilator-hud { display: none !important; }\n',
      );
    }

    fs.writeFileSync(filePath, html, 'utf8');
    totalProcessed++;
    console.log(`[PERFECT REPLACEMENT] ${u.id}/${f}`);
  });
});

console.log(
  `\n🎉 Successfully restored candidate details box across all ${totalProcessed} mock exam papers!`,
);
