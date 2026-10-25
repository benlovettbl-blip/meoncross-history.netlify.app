const fs = require('fs');
const path = require('path');
const ROOT_DIR = path.join(__dirname, '..');

const publicUnitsDir = path.join(ROOT_DIR, 'public', 'units');
const dbPath = path.join(ROOT_DIR, 'public', 'database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const targetUnit = process.argv[2];

for (const [unitId, unitObj] of Object.entries(db)) {
  if (unitId === 'cme_new') continue; // Managed by dedicated generate_cme_timeline.cjs
  if (targetUnit && unitId !== targetUnit) continue;

  const unitData = unitObj.data || unitObj;
  if (!unitData.timeline || !Array.isArray(unitData.timeline) || unitData.timeline.length === 0) {
    continue;
  }

  const outDir = path.join(publicUnitsDir, unitId);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // Generate HTML
  const timelineItemsHTML = unitData.timeline
    .map(
      (item) => `
    <div style="margin-bottom: 12px; break-inside: avoid; border-left: 3px solid #3b82f6; padding-left: 10px;">
      <strong style="color: #1e3a8a; font-size: 11pt;">${item.date || item.year || ''}</strong> - 
      <strong style="color: #0f172a; font-size: 11pt;">${item.title || ''}</strong>
      <p style="margin: 4px 0 0 0; font-size: 10pt; color: #475569; line-height: 1.3;">${item.description || ''}</p>
    </div>
  `,
    )
    .join('');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${unitData.title || unitId} - Timeline</title>
  <style>
    body { font-family: 'Helvetica', 'Arial', sans-serif; margin: 0; padding: 20px; box-sizing: border-box; }
    h1 { text-align: center; color: #1a237e; margin-top: 0; font-size: 24pt; margin-bottom: 5px; }
    h2 { text-align: center; color: #475569; margin-top: 0; font-size: 14pt; margin-bottom: 20px; }
    .columns { column-count: 2; column-gap: 30px; }
  </style>
</head>
<body>
  <h1>${unitData.title || unitId}</h1>
  <h2>Key Events Timeline</h2>
  <div class="columns">
    ${timelineItemsHTML}
  </div>
</body>
</html>`;

  fs.writeFileSync(path.join(outDir, 'timeline.html'), html, 'utf8');
  console.log(`Generated timeline.html for ${unitId} (${unitData.timeline.length} events)`);
}
