const fs = require('fs');
let code = fs.readFileSync('cme_new/generate_worksheets.js', 'utf8');

if (!code.includes('End of Unit Quiz Pack')) {
  const qpCode = `
// Append Quiz Pack dynamically
let cmeQuizPack = [];
unitData.lessons.forEach(l => { if(l.quiz) cmeQuizPack.push(...l.quiz); });
if (cmeQuizPack.length > 0) {
  html += \`<h2 style="margin-bottom: 20px; page-break-before: always; font-size: 24pt;">End of Unit Quiz Pack</h2>\`;
  html += \`<p style="font-size: 11pt; margin-bottom: 20px;"><strong>Instructions:</strong> Answer the \${cmeQuizPack.length} quick-fire recall questions below. If you get stuck, the scrambled answers are provided in the Answer Bank on the final page.</p>\`;
  html += \`<div style="column-count: 2; column-gap: 40px;">\`;
  cmeQuizPack.forEach((item, idx) => {
    html += \`<div style="margin-bottom: 12px; break-inside: avoid;">\`;
    html += \`<div style="font-weight: 500; font-size: 10.5pt;">\${idx + 1}. \${item.question || item.q}</div>\`;
    html += \`<div class="task-lines"></div>\`;
    html += \`</div>\`;
  });
  html += \`</div>\`;
  
  // Answer Bank
  html += \`<h2 style="margin-bottom: 20px; page-break-before: always; font-size: 20pt; text-align: center;">Quiz Pack Answer Bank</h2>\`;
  html += \`<p style="text-align: center; margin-bottom: 30px;">Use these answers to help you complete the Quiz Pack if you are stuck. They are in random order.</p>\`;
  let scrambled = [...cmeQuizPack];
  scrambled.sort(() => Math.random() - 0.5);
  html += \`<div style="display: flex; flex-wrap: wrap; gap: 15px; justify-content: center;">\`;
  scrambled.forEach(item => {
    html += \`<div style="padding: 8px 12px; border: 1px solid #ccc; background: #f9f9f9; border-radius: 4px; font-size: 10pt;">\${item.answer || item.a}</div>\`;
  });
  html += \`</div>\`;
}
`;

  code = code.replace(/fs\.writeFileSync\(path\.join\(__dirname, 'workbook\.html'\), html, 'utf8'\);/, qpCode + "fs.writeFileSync(path.join(__dirname, 'workbook.html'), html, 'utf8');");
  fs.writeFileSync('cme_new/generate_worksheets.js', code);
  console.log('Injected Quiz Pack to cme_new workbook');
}
