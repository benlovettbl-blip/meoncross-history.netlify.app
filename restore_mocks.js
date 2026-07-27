const fs = require('fs');

// 1. Update cme_new/data.js
let dataJsPath = './public/units/cme_new/data.js';
let data = fs.readFileSync(dataJsPath, 'utf8');

const mocks = [
  { id: "cme_mock_a", title: "Predicted Mock Paper A", url: "cme_mock_a.html" },
  { id: "cme_mock_b", title: "Predicted Mock Paper B", url: "cme_mock_b.html" },
  { id: "cme_mock_c", title: "Predicted Mock Paper C", url: "cme_mock_c.html" },
  { id: "cme_mock_d", title: "Predicted Mock Paper D", url: "cme_mock_d.html" },
  { id: "cme_mock_e", title: "Predicted Mock Paper E", url: "cme_mock_e.html" }
];

data = data.replace(/"mock_exams":\s*\{\},/, `"mock_exams": ${JSON.stringify(mocks, null, 4)},`);
fs.writeFileSync(dataJsPath, data, 'utf8');

// 2. Update core_app.js
let coreAppPath = './src/core_app.js';
let coreApp = fs.readFileSync(coreAppPath, 'utf8');

const targetStr = `      if (unitData.printable_workbooks && unitData.printable_workbooks.length > 0) {`;
const insertStr = `
      if (unitData.mock_exams && Array.isArray(unitData.mock_exams) && unitData.mock_exams.length > 0) {
        lessonsHTML += '<h2 style="margin-top: 40px; text-align: left; color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">Mock Exams</h2>';
        lessonsHTML += '<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; margin-top: 20px; text-align: left;">';
        unitData.mock_exams.forEach(mock => {
          const mockUrl = window.currentUnitId ? \`/units/\${window.currentUnitId}/\${mock.url}\` : mock.url;
          lessonsHTML += \`
            <div class="homepage-lesson-card" style="background: #fdf2f8; border: 2px dashed #db2777; border-radius: 8px; padding: 15px; text-align: center; cursor: pointer; transition: all 0.3s ease; display: flex; flex-direction: column; justify-content: center; align-items: center;" onclick="window.open('\${mockUrl}', '_blank')" onmouseover="this.style.background='white'; this.style.transform='translateY(-3px)'; this.style.boxShadow='0 8px 15px rgba(0,0,0,0.1)';" onmouseout="this.style.background='#fdf2f8'; this.style.transform='translateY(0)'; this.style.boxShadow='none';">
              <i class="fa-solid fa-file-signature fa-2x" style="color: #db2777; margin-bottom: 10px;"></i>
              <h3 style="margin: 0; color: #334155; font-size: 0.9rem;">\${mock.title}</h3>
            </div>
          \`;
        });
        lessonsHTML += '</div>';
      }
`;

if (!coreApp.includes('unitData.mock_exams.forEach')) {
  coreApp = coreApp.replace(targetStr, insertStr + '\n' + targetStr);
  fs.writeFileSync(coreAppPath, coreApp, 'utf8');
}

console.log('Restored mock exams successfully!');
