const fs = require('fs');
const path = require('path');

const publicUnitsDir = path.join(__dirname, 'public', 'units');
const ignoredDirs = ['node_modules', 'public', '.git', '.agents', 'dist'];
let allDirs = fs.readdirSync(publicUnitsDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory() && !ignoredDirs.includes(dirent.name))
  .map(dirent => dirent.name);

const targetUnit = process.argv[2];
if (targetUnit && allDirs.includes(targetUnit)) {
  allDirs = [targetUnit];
}

allDirs.forEach(unitId => {
  const dataPath = path.join(publicUnitsDir, unitId, 'data.js');
  if (!fs.existsSync(dataPath)) return;

  const dataContent = fs.readFileSync(dataPath, 'utf8');
  let startIndex = dataContent.indexOf('export default {') !== -1 ? dataContent.indexOf('export default {') + 15 : -1;
  if (startIndex === -1) startIndex = dataContent.indexOf('export const unitData = {') !== -1 ? dataContent.indexOf('export const unitData = {') + 24 : -1;
  if (startIndex === -1) startIndex = dataContent.indexOf('const unitData = {') !== -1 ? dataContent.indexOf('const unitData = {') + 17 : -1;
  if (startIndex === -1) startIndex = dataContent.indexOf('export const gwData = {') !== -1 ? dataContent.indexOf('export const gwData = {') + 22 : -1;
  
  if (startIndex === -1) return;
  const endIndex = dataContent.lastIndexOf('}');
  if (endIndex === -1) return;
  
  const jsonStr = dataContent.substring(startIndex, endIndex + 1);
  let unitData;
  try {
    unitData = eval('(function(){ const mock_exams=[]; return ' + jsonStr + ';})()');
  } catch (e) {
    return;
  }

  if (!unitData.timeline || unitData.timeline.length === 0) return;

  // Generate HTML
  let timelineItemsHTML = unitData.timeline.map(item => `
    <div style="margin-bottom: 12px; break-inside: avoid; border-left: 3px solid #3b82f6; padding-left: 10px;">
      <strong style="color: #1e3a8a; font-size: 11pt;">${item.date}</strong> - 
      <strong style="color: #0f172a; font-size: 11pt;">${item.title}</strong>
      <p style="margin: 4px 0 0 0; font-size: 10pt; color: #475569; line-height: 1.3;">${item.description}</p>
    </div>
  `).join('');

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${unitData.title} - Timeline</title>
  <style>
    body { font-family: 'Helvetica', 'Arial', sans-serif; margin: 0; padding: 20px; box-sizing: border-box; }
    h1 { text-align: center; color: #1a237e; margin-top: 0; font-size: 24pt; margin-bottom: 5px; }
    h2 { text-align: center; color: #475569; margin-top: 0; font-size: 14pt; margin-bottom: 20px; }
    .columns { column-count: 2; column-gap: 30px; }
  </style>
</head>
<body>
  <h1>${unitData.title}</h1>
  <h2>Key Events Timeline</h2>
  <div class="columns">
    ${timelineItemsHTML}
  </div>
</body>
</html>`;

  fs.writeFileSync(path.join(publicUnitsDir, unitId, 'timeline.html'), html);
  console.log(`Generated timeline.html for ${unitId}`);
});
