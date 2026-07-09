const fs = require('fs');
const path = require('path');

const genJsPath = path.join(__dirname, 'great_war_v2', 'generate_worksheets.js');
let genContent = fs.readFileSync(genJsPath, 'utf8');

const targetStr = "html += `\n</body>\n</html>`;";

const quizInjection = `
// Append Quiz Pack
if (unitData.quizPack && unitData.quizPack.length > 0) {
  html += \`<h2 style="margin-bottom: 20px; page-break-before: always; font-size: 24pt;">End of Unit Quiz Pack</h2>\`;
  html += \`<p style="font-size: 11pt; margin-bottom: 20px;"><strong>Instructions:</strong> Answer the 50 quick-fire recall questions below. If you get stuck, the scrambled answers are provided in the Answer Bank on the final page.</p>\`;
  
  html += \`<div style="display: flex; flex-wrap: wrap; gap: 20px;">\`;
  
  // Format into two columns roughly
  html += \`<div style="width: 100%; column-count: 2; column-gap: 40px;">\`;
  unitData.quizPack.forEach((item, idx) => {
    html += \`<div style="margin-bottom: 12px; break-inside: avoid;">\`;
    html += \`<div style="font-weight: 500; font-size: 10.5pt;">\${idx + 1}. \${item.q}</div>\`;
    html += \`<div class="task-lines"></div>\`;
    html += \`</div>\`;
  });
  html += \`</div>\`;
  html += \`</div>\`;

  // Answer Bank
  html += \`<h2 style="margin-bottom: 20px; page-break-before: always; font-size: 20pt; text-align: center;">Quiz Pack Answer Bank</h2>\`;
  html += \`<div style="border: 2px solid #1a237e; padding: 20px; background: #f8f9fa; border-radius: 8px;">\`;
  
  // Extract and scramble answers alphabetically
  let answers = unitData.quizPack.map(item => item.a).sort((a, b) => a.localeCompare(b));
  
  html += \`<p style="text-align: center; font-size: 11pt; line-height: 1.8;">\`;
  answers.forEach((ans, idx) => {
    html += \`<strong>\${ans}</strong>\`;
    if (idx < answers.length - 1) html += \` &nbsp;&bull;&nbsp; \`;
  });
  html += \`</p>\`;
  html += \`</div>\`;
}
`;

genContent = genContent.replace(targetStr, quizInjection + "\n" + targetStr);
fs.writeFileSync(genJsPath, genContent);
console.log("Quiz pack injected into generate_worksheets.js.");
