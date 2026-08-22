const fs = require('fs');
const path = require('path');

const publicUnitsDir = path.join(__dirname, 'public', 'units');
const dataParserSrc = fs.readFileSync(path.join(__dirname, 'src', 'data_parser.js'), 'utf8');
const dataParserCode = dataParserSrc.replace(/export /g, '');
eval(dataParserCode);

const formatText = (text) => {
  if (!text) return '';
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>');
};

const ignoredDirs = ['node_modules', 'public', '.git', '.agents', 'dist'];

fs.readdirSync(publicUnitsDir).forEach(unitDirName => {
  if (ignoredDirs.includes(unitDirName)) return;
  const unitPath = path.join(publicUnitsDir, unitDirName);
  if (fs.statSync(unitPath).isDirectory()) {
    const dataJsPath = path.join(unitPath, 'data.js');
    if (fs.existsSync(dataJsPath)) {
      try {
        const rawData = fs.readFileSync(dataJsPath, 'utf8');
        const jsCode = rawData.replace(/export const unitData = /g, 'global.unitData = ');
        eval(jsCode);
        
        if (global.unitData && global.unitData.type === 'trip') {
          console.log(`Generating Trip Journal for ${unitDirName}...`);
          let html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${global.unitData.title} Journal</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,500&display=swap');
    body { font-family: 'Outfit', sans-serif; color: #1e293b; line-height: 1.6; font-size: 14px; margin: 0; padding: 0; }
    h1, h2, h3, h4 { font-family: 'Playfair Display', serif; color: #0f172a; margin-top: 0; }
    .cover-page { height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; page-break-after: always; padding: 40px; box-sizing: border-box; }
    .cover-title { font-size: 48px; margin-bottom: 20px; color: #1e3a8a; }
    .cover-subtitle { font-size: 24px; color: #475569; margin-bottom: 40px; }
    .cover-image { max-width: 80%; max-height: 400px; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); margin-bottom: 20px; object-fit: contain; }
    .cover-caption { font-size: 14px; color: #64748b; font-style: italic; }
    .page-break { page-break-after: always; }
    .day-section { padding: 40px; box-sizing: border-box; }
    .day-header { border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; margin-bottom: 30px; }
    .day-title { font-size: 32px; color: #1e40af; margin-bottom: 5px; }
    .day-subtitle { font-size: 18px; color: #64748b; margin: 0; }
    .itinerary-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; font-size: 13px; }
    .itinerary-table th { background-color: #f1f5f9; padding: 12px; text-align: left; border-bottom: 2px solid #cbd5e1; color: #334155; }
    .itinerary-table td { padding: 12px; border-bottom: 1px solid #e2e8f0; vertical-align: top; }
    .time-col { width: 15%; font-weight: 600; color: #3b82f6; }
    .title-col { width: 30%; font-weight: 600; color: #0f172a; }
    .detail-col { width: 55%; color: #475569; }
    .narrative-box { background-color: #f8fafc; border-left: 4px solid #3b82f6; padding: 20px; border-radius: 0 8px 8px 0; margin-bottom: 30px; }
    .narrative-title { font-size: 20px; margin-bottom: 15px; color: #1e3a8a; }
    .journal-section { margin-top: 40px; border-top: 1px dashed #cbd5e1; padding-top: 30px; }
    .journal-title { font-size: 24px; color: #0f172a; margin-bottom: 20px; text-align: center; }
    .journal-lines { display: block; width: 100%; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; box-sizing: border-box; min-height: 400px; background-image: repeating-linear-gradient(transparent, transparent 29px, #e2e8f0 30px); background-size: 100% 30px; background-attachment: local; }
  </style>
</head>
<body>
`;
          
          // Cover Page
          html += `
  <div class="cover-page">
    <h1 class="cover-title">${global.unitData.title}</h1>
    <h2 class="cover-subtitle">${global.unitData.enquiry_question || ''}</h2>
    ${global.unitData.cover_image ? `<img class="cover-image" src="file://${path.join(__dirname, 'public', global.unitData.cover_image).replace(/\\/g, '/')}" />` : ''}
    ${global.unitData.cover_caption ? `<p class="cover-caption">${global.unitData.cover_caption}</p>` : ''}
    <div style="margin-top: 60px; border-top: 2px solid #e2e8f0; padding-top: 20px; width: 60%;">
      <p style="font-size: 18px; color: #334155; text-align:left;"><strong>Name:</strong> ___________________________</p>
      <p style="font-size: 18px; color: #334155; text-align:left;"><strong>Tutor Group:</strong> _____________________</p>
    </div>
  </div>
`;

          // Iterate through days
          global.unitData.lessons.forEach(lesson => {
            html += `<div class="day-section">
              <div class="day-header">
                <h1 class="day-title">${lesson.title}</h1>
                <h2 class="day-subtitle">${lesson.enquiry || lesson.enquiry_question || ''}</h2>
              </div>
            `;
            
            // Checklists / Narratives
            if (lesson.narrative_blocks && lesson.narrative_blocks.length > 0) {
              lesson.narrative_blocks.forEach(block => {
                if (block.type === 'narrative' && block.text) {
                  html += `
                    <div class="narrative-box">
                      ${block.theme_heading ? `<h3 class="narrative-title">${block.theme_heading}</h3>` : ''}
                      <div>${formatText(block.text)}</div>
                    </div>
                  `;
                }
              });
            }
            
            // Itinerary Timeline
            if (lesson.do_now && lesson.do_now.type === 'timeline' && lesson.do_now.events) {
              html += `<table class="itinerary-table">
                <thead>
                  <tr>
                    <th class="time-col">Time</th>
                    <th class="title-col">Activity / Location</th>
                    <th class="detail-col">Details</th>
                  </tr>
                </thead>
                <tbody>
              `;
              lesson.do_now.events.forEach(ev => {
                html += `
                  <tr>
                    <td class="time-col">${ev.year || ''}</td>
                    <td class="title-col">${ev.title || ''}</td>
                    <td class="detail-col">${ev.detail || ''}</td>
                  </tr>
                `;
              });
              html += `</tbody></table>`;
            }
            
            // Reflection Journal (if it's not Day 0)
            if (lesson.id !== 'day_0') {
              html += `
                <div class="journal-section">
                  <h3 class="journal-title">My Reflections: ${lesson.title}</h3>
                  <div class="journal-lines"></div>
                </div>
              `;
            }
            
            html += `</div><div class="page-break"></div>`;
          });
          
          html += `</body></html>`;
          
          const outputPath = path.join(unitPath, 'trip_journal.html');
          fs.writeFileSync(outputPath, html);
          console.log(`Generated: ${outputPath}`);
        }
      } catch (e) {
        console.error(`Error processing ${dataJsPath}: ${e.message}`);
      }
    }
  }
});
