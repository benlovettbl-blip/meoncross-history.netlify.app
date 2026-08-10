const fs = require('fs');

const files = [
  'generate_pupil_workbooks.js',
  'generate_textbooks.js',
  'generate_worksheets.js'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');

  // 1. Replace the Headers block
  const headerRegex = /<th style="border: 1px solid #333; padding: 6px; width: 25%;">Progress & Assessment Tracker<\/th>[\s\S]*?<th style="border: 1px solid #333; padding: 6px; width: 23%;">EBI \(Even Better If\)<\/th>/;
  const newHeaders = `<th style="border: 1px solid #333; padding: 12px 6px; width: 35%;">Progress & Assessment Tracker</th>
            <th style="border: 1px solid #333; padding: 12px 6px; width: 10%; text-align: center;">Effort</th>
            <th style="border: 1px solid #333; padding: 12px 6px; width: 10%; text-align: center;">Level</th>
            <th style="border: 1px solid #333; padding: 12px 6px; width: 45%;">Teacher Comments</th>`;
  content = content.replace(headerRegex, newHeaders);

  // 2. Replace the Geography row
  const geoRegex = /trackerRows \+= \`<tr style="background-color: #f1f5f9;"><td style="border:1px solid #333; padding:6px; font-weight:bold;">L\$\{i\+1\}: \$\{l\.title\}<\/td><td style="border:1px solid #333; padding:6px;"><\/td><td style="border:1px solid #333; padding:6px;"><\/td><td style="border:1px solid #333; padding:6px;"><\/td><td style="border:1px solid #333; padding:6px;"><\/td><\/tr>\`;/g;
  const newGeoRow = `trackerRows += \`<tr style="background-color: #f1f5f9; height: 50px;"><td style="border:1px solid #333; padding:12px 6px; font-weight:bold;">L\${i+1}: \${l.title}</td><td style="border:1px solid #333; padding:12px 6px;"></td><td style="border:1px solid #333; padding:12px 6px;"></td><td style="border:1px solid #333; padding:12px 6px;"></td></tr>\`;`;
  content = content.replace(geoRegex, newGeoRow);

  // 3. Replace the Normal row
  const normRegex = /trackerRows \+= \`<tr style="background-color: #f1f5f9;"><td style="border:1px solid #333; padding:6px; font-weight:bold;">L\$\{i\+1\}: \$\{l\.title\}<\/td><td style="border:1px solid #333; padding:6px;"><\/td><td style="border:1px solid #333; padding:6px;"><\/td><td style="border:1px solid #333; padding:6px;"><\/td><td style="border:1px solid #333; padding:6px;"><\/td><\/tr>\`;/g;
  const newNormRow = `trackerRows += \`<tr style="background-color: #f1f5f9; height: 50px;"><td style="border:1px solid #333; padding:12px 6px; font-weight:bold;">L\${i+1}: \${l.title}</td><td style="border:1px solid #333; padding:12px 6px;"></td><td style="border:1px solid #333; padding:12px 6px;"></td><td style="border:1px solid #333; padding:12px 6px;"></td></tr>\`;`;
  content = content.replace(normRegex, newNormRow);

  // 4. Replace the Assessment row
  const assessRegex = /trackerRows \+= \`<tr><td style="border:1px solid #333; padding:4px; font-weight:bold; background:#e2e8f0;">Assessment: \$\{a\.title\}<\/td><td style="border:1px solid #333; padding:4px;"><\/td><td style="border:1px solid #333; padding:4px;"><\/td><td style="border:1px solid #333; padding:4px;"><\/td><td style="border:1px solid #333; padding:4px;"><\/td><\/tr>\`;/g;
  const newAssessRow = `trackerRows += \`<tr style="height: 50px;"><td style="border:1px solid #333; padding:12px 6px; font-weight:bold; background:#e2e8f0;">Assessment: \${a.title}</td><td style="border:1px solid #333; padding:12px 6px;"></td><td style="border:1px solid #333; padding:12px 6px;"></td><td style="border:1px solid #333; padding:12px 6px;"></td></tr>\`;`;
  content = content.replace(assessRegex, newAssessRow);

  // 5. Replace the Final Unit Grade row
  const finalRegex = /<tr style=" font-weight: bold;">[\s\S]*?<td style="border: 1px solid #333; padding-top: 8px; padding-bottom: 8px; text-align: right;">Final Unit Grade:<\/td>[\s\S]*?<td style="border: 1px solid #333; padding-top: 8px; padding-bottom: 8px; background:#eee;"><\/td>[\s\S]*?<td style="border: 1px solid #333; padding-top: 8px; padding-bottom: 8px;"><\/td>[\s\S]*?<td style="border: 1px solid #333; padding-top: 8px; padding-bottom: 8px;"><\/td>[\s\S]*?<td style="border: 1px solid #333; padding-top: 8px; padding-bottom: 8px;"><\/td>[\s\S]*?<\/tr>/;
  const newFinalRow = `<tr style=" font-weight: bold; height: 50px;">
            <td style="border: 1px solid #333; padding: 12px 6px; text-align: right;">Final Unit Grade:</td>
            <td style="border: 1px solid #333; padding: 12px 6px; background:#eee;"></td>
            <td style="border: 1px solid #333; padding: 12px 6px; background:#eee;"></td>
            <td style="border: 1px solid #333; padding: 12px 6px;"></td>
          </tr>`;
  content = content.replace(finalRegex, newFinalRow);

  fs.writeFileSync(file, content, 'utf8');
  console.log(`Updated ${file}`);
});
