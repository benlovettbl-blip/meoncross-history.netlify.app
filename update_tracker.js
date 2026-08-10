const fs = require('fs');
const files = [
  'generate_pupil_workbooks.js',
  'generate_textbooks.js',
  'generate_worksheets.js'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let txt = fs.readFileSync(file, 'utf8');

  // 1. Update table headers
  const oldHeaders = `<th style="border: 1px solid #333; padding: 6px; width: 25%;">Progress & Assessment Tracker</th>
            <th style="border: 1px solid #333; padding: 6px; width: 10%; text-align: center;">Do Now</th>
            <th style="border: 1px solid #333; padding: 6px; width: 6%; text-align: center;">RAG</th>
            <th style="border: 1px solid #333; padding: 6px; width: 8%; text-align: center;">Effort</th>
            <th style="border: 1px solid #333; padding: 6px; width: 8%; text-align: center;">Level</th>
            <th style="border: 1px solid #333; padding: 6px; width: 20%;">WWW (What Went Well)</th>
            <th style="border: 1px solid #333; padding: 6px; width: 23%;">EBI (Even Better If)</th>`;

  const newHeaders = `<th style="border: 1px solid #333; padding: 6px; width: 5%; text-align: center;">Lsn</th>
            <th style="border: 1px solid #333; padding: 6px; width: 20%;">Progress & Assessment Tracker</th>
            <th style="border: 1px solid #333; padding: 6px; width: 10%; text-align: center;">Do Now</th>
            <th style="border: 1px solid #333; padding: 6px; width: 6%; text-align: center;">RAG</th>
            <th style="border: 1px solid #333; padding: 6px; width: 8%; text-align: center;">Effort</th>
            <th style="border: 1px solid #333; padding: 6px; width: 8%; text-align: center;">Level</th>
            <th style="border: 1px solid #333; padding: 6px; width: 20%;">WWW (What Went Well)</th>
            <th style="border: 1px solid #333; padding: 6px; width: 23%;">EBI (Even Better If)</th>`;

  txt = txt.replace(oldHeaders, newHeaders);

  // 2. Update loop
  const oldLoop = `periodLessons.forEach(l => {`;
  const newLoop = `periodLessons.forEach((l, i) => {`;
  txt = txt.replace(oldLoop, newLoop);

  // 3. Update geography row
  const oldGeo = `trackerRows += \`<tr style="background-color: #f1f5f9;"><td style="border:1px solid #333; padding:6px; font-weight:bold;">\${l.title}</td><td style="border:1px solid #333; padding:6px; text-align:center; font-size: 0.9em; ">N/A</td><td style="border:1px solid #333; padding:6px; text-align:center; color:#ccc;">〇</td><td style="border:1px solid #333; padding:6px;"></td><td style="border:1px solid #333; padding:6px;"></td><td style="border:1px solid #333; padding:6px;"></td><td style="border:1px solid #333; padding:6px;"></td></tr>\`;`;
  const newGeo = `trackerRows += \`<tr style="background-color: #f1f5f9;"><td style="border:1px solid #333; padding:6px; text-align:center; font-weight:bold;">L\${i+1}</td><td style="border:1px solid #333; padding:6px; font-weight:bold;">\${l.title}</td><td style="border:1px solid #333; padding:6px; text-align:center; font-size: 0.9em; ">N/A</td><td style="border:1px solid #333; padding:6px; text-align:center; color:#ccc;">〇</td><td style="border:1px solid #333; padding:6px;"></td><td style="border:1px solid #333; padding:6px;"></td><td style="border:1px solid #333; padding:6px;"></td><td style="border:1px solid #333; padding:6px;"></td></tr>\`;`;
  txt = txt.replace(oldGeo, newGeo);

  // 4. Update normal row
  const oldNorm = `trackerRows += \`<tr style="background-color: #f1f5f9;"><td style="border:1px solid #333; padding:6px; font-weight:bold;">\${l.title}</td><td style="border:1px solid #333; padding:6px; text-align:center; font-size: 0.9em;">/ \${maxScore}</td><td style="border:1px solid #333; padding:6px; text-align:center; color:#ccc;">〇</td><td style="border:1px solid #333; padding:6px;"></td><td style="border:1px solid #333; padding:6px;"></td><td style="border:1px solid #333; padding:6px;"></td><td style="border:1px solid #333; padding:6px;"></td></tr>\`;`;
  const newNorm = `trackerRows += \`<tr style="background-color: #f1f5f9;"><td style="border:1px solid #333; padding:6px; text-align:center; font-weight:bold;">L\${i+1}</td><td style="border:1px solid #333; padding:6px; font-weight:bold;">\${l.title}</td><td style="border:1px solid #333; padding:6px; text-align:center; font-size: 0.9em;">/ \${maxScore}</td><td style="border:1px solid #333; padding:6px; text-align:center; color:#ccc;">〇</td><td style="border:1px solid #333; padding:6px;"></td><td style="border:1px solid #333; padding:6px;"></td><td style="border:1px solid #333; padding:6px;"></td><td style="border:1px solid #333; padding:6px;"></td></tr>\`;`;
  txt = txt.replace(oldNorm, newNorm);

  // 5. Update assessment row
  const oldAssess = `trackerRows += \`<tr><td style="border:1px solid #333; padding:4px;">\${a.title}</td><td style="border:1px solid #333; padding:4px; text-align:center; background:#eee;">N/A</td><td style="border:1px solid #333; padding:4px; text-align:center; color:#ccc;">〇</td><td style="border:1px solid #333; padding:4px;"></td><td style="border:1px solid #333; padding:4px;"></td><td style="border:1px solid #333; padding:4px;"></td><td style="border:1px solid #333; padding:4px;"></td></tr>\`;`;
  const newAssess = `trackerRows += \`<tr><td style="border:1px solid #333; padding:4px; text-align:center; font-weight:bold;">A</td><td style="border:1px solid #333; padding:4px;">\${a.title}</td><td style="border:1px solid #333; padding:4px; text-align:center; background:#eee;">N/A</td><td style="border:1px solid #333; padding:4px; text-align:center; color:#ccc;">〇</td><td style="border:1px solid #333; padding:4px;"></td><td style="border:1px solid #333; padding:4px;"></td><td style="border:1px solid #333; padding:4px;"></td><td style="border:1px solid #333; padding:4px;"></td></tr>\`;`;
  txt = txt.replace(oldAssess, newAssess);

  // 6. Update Final Unit Grade row
  const oldFinal = `<tr style=" font-weight: bold;">
            <td style="border: 1px solid #333; padding-top: 8px; padding-bottom: 8px; text-align: right;">Final Unit Grade:</td>`;
  const newFinal = `<tr style=" font-weight: bold;">
            <td colspan="2" style="border: 1px solid #333; padding-top: 8px; padding-bottom: 8px; text-align: right;">Final Unit Grade:</td>`;
  txt = txt.replace(oldFinal, newFinal);

  fs.writeFileSync(file, txt, 'utf8');
  console.log(`Updated ${file}`);
});
