const fs = require('fs');
const path = require('path');

function generateGuidedReading(unitDir, unitData) {
  if (!unitData.guided_reading || unitData.guided_reading.length === 0) {
    return;
  }

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${unitData.title} - Guided Reading</title>
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 20px; max-width: 900px; margin: 0 auto; color: #333; }
    h1 { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 30px; }
    .page { page-break-after: always; display: flex; flex-direction: column; height: 100vh; padding-top: 20px;}
    .book-header { display: flex; align-items: center; gap: 20px; margin-bottom: 20px; }
    .cover-img { width: 100px; height: auto; border: 1px solid #ccc; box-shadow: 2px 2px 5px rgba(0,0,0,0.1); }
    .book-title { font-size: 24px; font-weight: bold; margin: 0 0 5px 0; }
    .author { font-size: 18px; color: #555; font-style: italic; margin: 0; }
    .extract { font-family: 'Georgia', serif; font-size: 16px; line-height: 1.8; background: #f9f9f9; padding: 20px; border-left: 4px solid #333; margin-bottom: 30px; }
    .questions-container { flex-grow: 1; display: flex; flex-direction: column; gap: 20px; }
    .question { font-weight: bold; font-size: 16px; }
    .lines { flex-grow: 1; border-bottom: 1px dashed #ccc; margin-top: 25px; }
  </style>
</head>
<body>
  <h1>${unitData.title} - Guided Reading Extract</h1>
`;

  unitData.guided_reading.forEach((reading, index) => {
    html += `
  <div class="page">
    <div class="book-header">
      <img src="${reading.cover_image}" alt="Cover" class="cover-img">
      <div>
        <h2 class="book-title">${reading.book_title}</h2>
        <p class="author">By ${reading.author}</p>
      </div>
    </div>
    
    <div class="extract">
      "${reading.extract}"
    </div>
    
    <div class="questions-container">
      <h3>Comprehension & Inference</h3>
      ${reading.questions.map((q, i) => `
        <div style="margin-bottom: 30px; flex-grow: 1; display: flex; flex-direction: column;">
          <div class="question">${i + 1}. ${q}</div>
          <div class="lines"></div>
          <div class="lines"></div>
          <div class="lines"></div>
        </div>
      `).join('')}
    </div>
  </div>
`;
  });

  html += `</body></html>`;
  
  const targetPath = path.join(unitDir, 'guided_reading_workbook.html');
  fs.writeFileSync(targetPath, html);
  console.log(`Generated Guided Reading Workbook for ${unitData.id}`);
}

const publicUnitsDir = path.join(__dirname, 'public', 'units');
const dirs = fs.readdirSync(publicUnitsDir, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name);

dirs.forEach(unitId => {
  const dataPath = path.join(publicUnitsDir, unitId, 'data.js');
  if (fs.existsSync(dataPath)) {
    const dataContent = fs.readFileSync(dataPath, 'utf8');
    const script = `
      (() => {
        ${dataContent.replace('export const unitData =', 'const unitData =')}
        return unitData;
      })();
    `;
    try {
      const unitData = eval(script);
      generateGuidedReading(path.join(publicUnitsDir, unitId), unitData);
    } catch (e) {
      console.error(`Failed to parse data.js for ${unitId}:`, e);
    }
  }
});
